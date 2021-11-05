/**
 * Helper to perform blurring and other image manipulations
 * @module image/process.js
 */

import * as StackBlur from "stackblur-canvas";
import { choice, hypotenuse } from "utils/math_utils";
import { softEdgeEffects, preBlurEffects, effectNames } from "constants/index";
import * as effects from "image/effects";
import canvasToBlob from "async-canvas-to-blob";
import { getOutputFilename, getOutputType } from "utils/data_utils";
import saveAs from "file-saver";

/**
 * Apply effects to detection regions on an image
 * @param  {Object} detection  detection object from detect.js, { image, detection }
 * @param  {Object} settings   settings object
 * @return {Object}            response containing { url, image, detections }
 *                             NOTE: this url must be manually revoked!
 */
export async function process(detection, settings) {
  const { image, detections } = detection;
  const source = copyToCanvas(image.image);
  const dest = copyToCanvas(image.image);
  const { effect } = settings.process;
  const { confidence } = settings.detect;
  let item;
  let detectionCount = 0;

  // Emoji regions should first be blurred, then the emoji pasted
  if (preBlurEffects.has(effect)) {
    for (let index = 0; index < detections.length; index++) {
      item = detections[index];
      if (item.score < confidence) continue;
      await processDetection(source, dest, item.bbox, settings, "blur");
    }
  }

  // Apply the detection effect to each region
  for (let index = 0; index < detections.length; index++) {
    item = detections[index];
    if (item.score < confidence) continue;
    detectionCount += 1;
    await processDetection(source, dest, item.bbox, settings, effect);
  }

  // Convert to blob
  const outputBlob = await canvasToBlob(
    dest.canvas,
    getOutputType(image.filename, settings),
    0.92
  );

  // Auto-save the blob as a local file
  if (settings.process.autoDownload) {
    saveAs(outputBlob, getOutputFilename(image.filename, settings));
  }

  // Get an object URL for the blob
  const objectURL = URL.createObjectURL(outputBlob);
  return {
    url: objectURL,
    blob: outputBlob,
    image,
    detections,
    detectionCount,
  };
}

/**
 * Apply an effect to a detection
 * @param  {Object} source   the source canvas (will not be modified)
 * @param  {Object} dest     the destination canvas (will be modified)
 * @param  {Object} bbox     detection bounding box
 * @param  {Object} settings application settings
 */
async function processDetection(source, dest, bbox, settings, effect) {
  // Get the pixel-wise dimensions of the cropped region, and the blur mask around it
  const { hardCrop, softCrop } = getCropDimensions(
    source,
    bbox,
    settings,
    effect
  );

  // Extract the cropped region
  const crop = cropImage(source, softCrop);

  // Apply an effect to the crop
  await applyEffect(effect, crop, settings);

  // If this effect uses a blur mask, apply it to the crop
  if (softEdgeEffects.has(effect)) {
    const mask = makeMask(softCrop, hardCrop, settings);
    applyMask(crop, mask);
  }

  // Paste the image onto the canvas
  pasteImage(dest, crop, softCrop, effect);
}

/**
 * Draw an image to a canvas
 * @param  {Image} image  an Image object
 * @return {Object}       the canvas and 2d context
 */
function copyToCanvas(image) {
  const canvas = window.document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = image.naturalWidth;
  canvas.height = image.naturalHeight;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  return { canvas, ctx };
}

/**
 * Get the relevant dimensions for image processing
 * @param  {canvas} source    source canvas
 * @param  {Object} bbox      bounding box detection (float-percentages)
 * @param  {Object} settings  application settings
 * @param  {Object} effect    currently applied effect
 * @return {Object}           the hard and soft crop settings
 */
function getCropDimensions(source, bbox, settings, effect) {
  const { expand, softenEdges } = settings.process;

  // bbox as floats
  const { x1, y1, x2, y2 } = bbox;
  const { width: sourceWidth, height: sourceHeight } = source.canvas;

  // bbox in pixels
  let x0 = x1 * sourceWidth;
  let y0 = y1 * sourceHeight;
  let width = (x2 - x1) * sourceWidth;
  let height = (y2 - y1) * sourceHeight;

  // add padding margin
  const padding = hypotenuse(width, height) * expand;

  // the hard crop is the desired shape
  const hardCrop = roundBounds({
    x0: x0 - padding,
    y0: y0 - padding,
    width: width + padding * 2,
    height: height + padding * 2,
  });

  let softCrop;

  if (softEdgeEffects.has(effect)) {
    const softenEdgesPadding =
      settings.process.softenEdges *
      hypotenuse(hardCrop.width, hardCrop.height);

    // the soft crop is the blurred area around it
    softCrop = roundBounds({
      x0: hardCrop.x0 - softenEdgesPadding,
      y0: hardCrop.y0 - softenEdgesPadding,
      width: hardCrop.width + softenEdgesPadding * 2,
      height: hardCrop.height + softenEdgesPadding * 2,
    });
  } else {
    softCrop = hardCrop;
  }

  return { hardCrop, softCrop };
}

/**
 * Round the properties of a bounds object
 * @param  {Object} bounds a dictionary of floats
 * @return {Object}        a dictionary of ints
 */
const roundBounds = (bounds) =>
  Object.keys(bounds).reduce((copy, property) => {
    copy[property] = Math.round(bounds[property]);
    return copy;
  }, {});

/**
 * Crop an image to the specified dimensions
 * @param  {canvas} source    source canvas
 * @param  {Object} bounds    bounds to crop
 * @return {Object}           cropped { canvas, ctx }
 */
function cropImage(source, bounds) {
  const canvas = window.document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = bounds.width;
  canvas.height = bounds.height;
  ctx.fillStyle = "#000000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    source.canvas,
    // source
    bounds.x0,
    bounds.y0,
    bounds.width,
    bounds.height,
    // destination
    0,
    0,
    canvas.width,
    canvas.height
  );
  return { canvas, ctx };
}

/**
 * Apply the desired image processing effect to the crop
 * @param  {String} effect     the effect to apply
 * @param  {Object} crop     a cropped canvas
 * @param  {Object} settings application settings
 */
async function applyEffect(effect, crop, settings) {
  if (effect in effects) {
    await effects[effect](crop, settings);
  } else {
    throw new Error("Unknown effect!");
  }
}

/**
 * Generate a mask of the desired shape for the crop
 * @param  {Object} softCrop crop dimensions plus soft edges
 * @param  {Object} hardCrop crop dimensions of the desired shape
 * @param  {Object} settings application settings
 * @return {Object}          b/w mask { canvas, ctx }
 */
function makeMask(softCrop, hardCrop, settings) {
  const { width, height } = softCrop;
  const canvas = window.document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;

  // The background is opaque black
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);

  // The masked area is opaque white
  ctx.fillStyle = "white";
  const x0 = hardCrop.x0 - softCrop.x0;
  const y0 = hardCrop.y0 - softCrop.y0;

  // Generate the desired mask shape
  if (settings.process.shape === "rect") {
    ctx.fillRect(x0, y0, hardCrop.width, hardCrop.height);
  } else if (settings.process.shape === "ellipse") {
    const ellipseX = x0 + hardCrop.width / 2;
    const ellipseY = y0 + hardCrop.height / 2;
    ctx.beginPath();
    ctx.ellipse(
      // ellipse center
      ellipseX,
      ellipseY,
      // ellipse major/minor radius
      hardCrop.width / 2,
      hardCrop.height / 2,
      // ellipse rotation
      0,
      // start / end angle
      0,
      2 * Math.PI
    );
    ctx.fill();
  } else {
    throw new Error("Unknown shape!");
  }
  // Apply blur softening to the mask
  const radius = settings.process.softenEdges * hypotenuse(width, height);
  StackBlur.canvasRGB(canvas, 0, 0, width, height, radius);
  return { canvas, ctx };
}

/**
 * Apply a mask to the crop
 * @param  {Object} crop  the cropped image
 * @param  {Object} mask  mask corresponding to crop
 */
function applyMask(crop, mask) {
  const { width, height } = crop.canvas;
  const imageDataLength = height * width * 4;

  const cropImageData = crop.ctx.getImageData(0, 0, width, height);
  const maskImageData = mask.ctx.getImageData(0, 0, width, height);

  const cropData = cropImageData.data;
  const maskData = maskImageData.data;

  // Apply the mask's R channel to the crop's Alpha channel
  for (let index = 0; index < imageDataLength; index += 4) {
    cropData[index + 3] = maskData[index];
  }

  crop.ctx.putImageData(cropImageData, 0, 0);
}

/**
 * Overlay the cropped image onto the original image
 * @param  {Object} dest      The original canvas
 * @param  {Object} crop      The processed crop
 * @param  {Object} softCrop  The crop offset
 * @param  {Object} effect    currently applied effect
 */
function pasteImage(dest, crop, softCrop, effect) {
  dest.ctx.save();
  dest.ctx.translate(softCrop.x0, softCrop.y0);
  if (effect === "emoji") {
    dest.ctx.rotate((Math.random() - 0.5) * Math.PI * 0.1);
  }
  dest.ctx.drawImage(crop.canvas, 0, 0);
  dest.ctx.restore();
}

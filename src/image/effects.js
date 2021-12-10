/**
 * Image processing effects
 * @module image/effects.js
 */

import * as StackBlur from "stackblur-canvas";
import { palettes } from "constants/index";
import { choice, randint, randsign, hypotenuse, mod } from "utils/math_utils";
import { preloadImage } from "utils/image_utils";

/**
 * Apply bbox with label. This effect does NOT redact the underlying image.
 * @param  {Object} crop     a cropped canvas
 * @param  {Object} settings application settings
 */
export function bbox(crop, settings, detection) {
  const palette = palettes[settings.color.palette];
  const { width, height } = crop.canvas;
  if (!palette) {
    throw new Error("Unknown color palette");
  }

  // Comment out this line to preserve any pre-blurring
  crop.ctx.clearRect(0, 0, width, height);

  /** Stroke the bounding box */
  // crop.ctx.strokeStyle = choice(palette);
  const color = "#00ff00";
  const textColor = "#000000";
  const border = 6;
  const fontSize = 10;

  const halfBorder = border / 2;
  crop.ctx.strokeStyle = color;
  crop.ctx.lineWidth = border;
  crop.ctx.strokeRect(
    Math.ceil(halfBorder),
    Math.ceil(halfBorder),
    Math.floor(width - border),
    Math.floor(height - border)
  );

  /** Prepare the label */
  const label = `${detection.class} (${Math.round(detection.score * 100)}%)`;
  const textX = Math.ceil(halfBorder);
  const textY = Math.ceil(halfBorder);
  const textBorder = halfBorder;
  crop.ctx.textBaseline = "top";
  crop.ctx.font = `${fontSize}px Roboto`;

  /** Measure the label area */
  const textMetrics = crop.ctx.measureText(label);
  // const textWidth =
  //   Math.abs(textMetrics.actualBoundingBoxLeft) +
  //   Math.abs(textMetrics.actualBoundingBoxRight);
  // const textHeight = Math.abs(textMetrics.fontBoundingBoxDescent);

  const textWidth = textMetrics.width;
  const textHeight = fontSize;

  /** Draw the label background */
  crop.ctx.fillStyle = color;
  crop.ctx.fillRect(
    textX,
    textY,
    textWidth + textBorder,
    textHeight + textBorder
  );

  /** Draw the label text */
  crop.ctx.fillStyle = textColor;
  crop.ctx.fillText(label, textBorder, textBorder);
}

/**
 * Apply color fill processing
 * @param  {Object} crop     a cropped canvas
 * @param  {Object} settings application settings
 */
export function color(crop, settings) {
  const palette = palettes[settings.color.palette];
  const { width, height } = crop.canvas;
  if (!palette) {
    throw new Error("Unknown color palette");
  }
  crop.ctx.fillStyle = choice(palette);
  if (settings.process.shape === "rect") {
    crop.ctx.fillRect(0, 0, width, height);
  } else if (settings.process.shape === "ellipse") {
    crop.ctx.clearRect(0, 0, width, height);
    const ellipseX = width / 2;
    const ellipseY = height / 2;
    crop.ctx.beginPath();
    crop.ctx.ellipse(
      // ellipse center
      ellipseX,
      ellipseY,
      // ellipse major/minor radius
      width / 2,
      height / 2,
      // ellipse rotation
      0,
      // start / end angle
      0,
      2 * Math.PI
    );
    crop.ctx.fill();
  }
}

/**
 * Apply blur processing
 * @param  {Object} crop     a cropped canvas
 * @param  {Object} settings application settings
 */
export function blur(crop, settings) {
  const { width, height } = crop.canvas;
  const radius = settings.blur.radius * hypotenuse(width, height);
  StackBlur.canvasRGBA(crop.canvas, 0, 0, width, height, radius);
  StackBlur.canvasRGBA(crop.canvas, 0, 0, width, height, radius);
}

/**
 * Apply mosaic processing
 * @param  {Object} crop     a cropped canvas
 * @param  {Object} settings application settings
 */
export function mosaic(crop, settings) {
  const { width, height } = crop.canvas;
  const radius = Math.max(
    4,
    Math.ceil(settings.mosaic.radius * hypotenuse(width, height))
  );

  const imageData = crop.ctx.getImageData(0, 0, width, height);
  const channels = imageData.data;
  const imageDataLength = channels.length;
  // Apply the mask's R channel to the crop's Alpha channel
  let offset, x, y, mod_x, mod_y, mod_index;
  for (let index = 0; index < imageDataLength; index += 4) {
    offset = index / 4;
    x = offset % width;
    y = Math.floor(offset / width);
    mod_x = x - (x % radius);
    mod_y = y - (y % radius);
    mod_index = (mod_y * width + mod_x) * 4;
    channels[index] = channels[mod_index];
    channels[index + 1] = channels[mod_index + 1];
    channels[index + 2] = channels[mod_index + 2];
    channels[index + 3] = channels[mod_index + 3];
  }
  crop.ctx.putImageData(imageData, 0, 0);
}

/**
 * Apply fuzz processing
 * @param  {Object} crop     a cropped canvas
 * @param  {Object} settings application settings
 */
export function fuzz(crop, settings) {
  const { width, height } = crop.canvas;
  const radius = Math.ceil(
    Math.pow(settings.fuzz.radius, 3) * hypotenuse(width, height)
  );

  const sourceImageData = crop.ctx.getImageData(0, 0, width, height);
  const destImageData = crop.ctx.getImageData(0, 0, width, height);

  const source = sourceImageData.data;
  const dest = destImageData.data;
  const imageDataLength = dest.length;
  // Apply the mask's R channel to the crop's Alpha channel
  let offset, x, y, mod_x, mod_y, mod_index;
  for (let index = 0; index < imageDataLength; index += 4) {
    offset = index / 4;
    x = offset % width;
    y = Math.floor(offset / width);
    mod_x = mod(x + randsign() * randint(radius), width);
    mod_y = mod(y + randsign() * randint(radius), height);
    mod_index = (mod_y * width + mod_x) * 4;
    dest[index] = source[mod_index];
    dest[index + 1] = source[mod_index + 1];
    dest[index + 2] = source[mod_index + 2];
    dest[index + 3] = source[mod_index + 3];
  }
  crop.ctx.putImageData(destImageData, 0, 0);
}

/**
 * Apply emoji processing
 * @param  {Object} crop     a cropped canvas
 * @param  {Object} settings application settings
 */
export async function emoji(crop, settings) {
  const emojiList = Array.from(
    document.querySelectorAll(`.emoji .${settings.emoji.type} img`)
  );
  const chosen = choice(emojiList);
  const { width, height } = crop.canvas;
  crop.ctx.clearRect(0, 0, width, height);
  const side = Math.min(width, height);
  const x = (width - side) / 2;
  const y = (height - side) / 2;
  const svg = await fetchSVG(chosen.src);
  crop.ctx.translate(x, y);
  crop.ctx.drawImage(svg, 0, 0, side, side);
}

/**
 * Kludge to render an SVG on canvas with Firefox.
 * Firefox refuses to drawImage an SVG that does not have an explicit height/width.
 * See: https://bugzilla.mozilla.org/show_bug.cgi?id=700533
 * @param {String} src   URL of SVG to load (must be local)
 * @returns {Image}      the image
 */
async function fetchSVG(src) {
  if (emojiCache[src]) {
    return emojiCache[src];
  }
  const req = await fetch(src);
  const xml = await req.text();
  const svg64 = btoa(xml.replace("<svg", "<svg width='200' height='200'"));
  const b64Start = "data:image/svg+xml;base64,";
  const image64 = b64Start + svg64;
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      emojiCache[src] = image;
      image.onload = null;
      resolve(image);
    };
    image.src = image64;
  });
}
const emojiCache = {};

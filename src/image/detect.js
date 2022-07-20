/**
 * Perform face detection
 * @module image/detect.js
 */

import * as tf from "@tensorflow/tfjs";
import { clamp } from "utils/math_utils";
import { YOLO_FILL_COLOR } from "constants/index";

/**
 * Use a model to detect objects in an image
 * @param  {tf.Model} model       the tensorflow model
 * @param  {Object}   image       an object containing { image, url, filename }
 * @return {Object}               an object containing { image, detections }
 *                                detections[] = { bbox, score, class }
 */
export default async function detect(model, image) {
  const canvas = window.document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const { width, height, labels } = model.settings;
  const { naturalWidth, naturalHeight } = image.image;
  const aspectRatio = naturalWidth / naturalHeight;

  let scaleWidth, scaleHeight, x, y;
  let widthRatio, heightRatio;
  let xPercentage, yPercentage;

  /**
   * Size the working canvas
   */
  canvas.width = width;
  canvas.height = height;

  /**
   * Scale the image to the working size and center it
   */
  if (aspectRatio > 1) {
    scaleWidth = width;
    scaleHeight = width / aspectRatio;
  } else {
    scaleWidth = height * aspectRatio;
    scaleHeight = height;
  }

  /**
   * Compute the offset where to draw the image
   */
  x = (width - scaleWidth) / 2;
  y = (height - scaleHeight) / 2;

  /**
   * Compute the ratio of the drawn image to the canvas, so we can
   * scale the detection bounding boxes accordingly.
   */
  widthRatio = width / scaleWidth;
  heightRatio = height / scaleHeight;

  xPercentage = x / width;
  yPercentage = y / height;

  ctx.fillStyle = YOLO_FILL_COLOR;
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(
    image.image,
    // Copy full dimensions of source image
    0,
    0,
    naturalWidth,
    naturalHeight,
    // Set position and scale on destination image
    x,
    y,
    scaleWidth,
    scaleHeight
  );

  /**
   * Set the input on the model
   */
  const input = tf.tidy(() =>
    tf.image
      .resizeBilinear(tf.browser.fromPixels(canvas), [width, height])
      .div(255.0)
      .expandDims(0)
  );

  /**
   * Run the model
   */
  const response = await model.model.executeAsync(input);

  /**
   * Map detections
   * BBox detections are returned as floats (percentages).
   * Logic in the rest of the application assumes the coordinates are on a
   * square canvas, so we need to scale the detection coordinates to match.
   */
  const [boxData, scoreData, classData, countData] = response;
  const count = countData.dataSync()[0];
  const boxes = boxData.dataSync();
  const scores = scoreData.dataSync();
  const classes = classData.dataSync();

  /**
   * Clean up the response
   */
  tf.dispose(response);

  /**
   * Map detections to classes and labels.
   * BBox detections are returned as floats (percentages).
   * Logic in the rest of the application assumes the coordinates are on a
   * square canvas, so we need to scale the detection coordinates to match.
   */
  const detections = Array(count);
  for (let index = 0; index < count; index++) {
    let [x1, y1, x2, y2] = boxes.slice(index * 4, (index + 1) * 4);
    detections[index] = {
      bbox: {
        x1: clamp((x1 - xPercentage) * widthRatio, 0.0, 1.0),
        y1: clamp((y1 - yPercentage) * heightRatio, 0.0, 1.0),
        x2: clamp((x2 - xPercentage) * widthRatio, 0.0, 1.0),
        y2: clamp((y2 - yPercentage) * heightRatio, 0.0, 1.0),
      },
      score: scores[index],
      class: labels[classes[index]],
    };
  }

  /**
   * Sort detections by Y-depth, so "lower" detections will be drawn after "higher" ones
   */
  const sortedDetections = detections.sort((a, b) => a.bbox.y1 - b.bbox.y1);

  return { image, detections: sortedDetections };
}

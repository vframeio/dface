/**
 * Perform face detection
 * @module image/detect.js
 */

import * as tf from "@tensorflow/tfjs";
import { clamp } from "utils/math_utils";

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

  canvas.width = model.settings.width;
  canvas.height = model.settings.height;
  ctx.drawImage(image.image, 0, 0, canvas.width, canvas.height);

  const input = tf.tidy(() =>
    tf.image
      .resizeBilinear(tf.browser.fromPixels(canvas), [
        model.settings.width,
        model.settings.height,
      ])
      .div(255.0)
      .expandDims(0)
  );

  const response = await model.model.executeAsync(input);

  const [boxData, scoreData, classData, countData] = response;
  const count = countData.dataSync()[0];
  const boxes = boxData.dataSync();
  const scores = scoreData.dataSync();
  const classes = classData.dataSync();
  tf.dispose(response);

  const detections = Array(count);
  for (let index = 0; index < count; index++) {
    let [x1, y1, x2, y2] = boxes.slice(index * 4, (index + 1) * 4);
    detections[index] = {
      bbox: {
        x1: clamp(x1, 0, canvas.width),
        y1: clamp(y1, 0, canvas.height),
        x2: clamp(x2, 0, canvas.width),
        y2: clamp(y2, 0, canvas.height),
      },
      score: scores[index],
      class: model.settings.labels
        ? model.settings.labels[classes[index]]
        : classes[index],
    };
  }

  const sortedDetections = detections.sort((a, b) => a.bbox.y1 - b.bbox.y1);

  return { image, detections: sortedDetections };
}

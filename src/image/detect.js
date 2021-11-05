/**
 * Perform face detection
 * @module image/detect.js
 */

import * as tf from "@tensorflow/tfjs";

/**
 * Use a model to detect objects in an image
 * @param  {tf.Model} model       the tensorflow model
 * @param  {Object}   image       an object containing { image, url, filename }
 * @param  {Number}   threshold   a threshold (0.0 - 1.0)
 * @return {Object}               an object containing { image, detections }
 *                                detections[] = { bbox, score, class }
 */
export default async function detect(model, image, threshold) {
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
      bbox: { x1, y1, x2, y2 },
      score: scores[index],
      class: classes[index],
    };
  }

  const sortedDetections = detections.sort((a, b) => a.bbox.y1 - b.bbox.y1);

  return { image, detections: sortedDetections };
}

/**
 * Image utilities
 * @module utils/image_utils.js
 */

/**
 * Preload a set of images
 * @param  {Array} urls  array of { url } objects
 */
export const preloadImages = (urls) => batchPromise(urls, 4, preloadImage);

/**
 * Apply a function to a set of objects in batches
 * @param  {Array} list       objects to affect
 * @param  {Number} count     concurrent functions
 * @param  {Function} method  function to apply
 */
export const batchPromise = (list, count, method) => {
  // console.log(list, count, method)
  let cancelled = false;
  const promise = new Promise((resolve, reject) => {
    let index = 0;
    let len = list.length;
    let results = [];
    const worker = (workerIndex) =>
      new Promise((resolveWorker) => {
        const next = () => {
          const taskIndex = index++;
          if (cancelled || taskIndex >= len) {
            return resolveWorker();
          }
          const item = list[taskIndex];
          // console.log(['worker', j, '=>', i, item].join(' '))
          method(item)
            .then((result) => {
              results[taskIndex] = result;
              next();
            })
            .catch((err) => {
              console.error(err, item);
              results[taskIndex] = null;
              next();
            });
        };
        next();
      });
    const workers = [];
    for (let workerIndex = 0; workerIndex < count; workerIndex++) {
      workers.push(worker(workerIndex));
    }
    Promise.all(workers)
      .then(() => {
        resolve(results);
      })
      .catch(reject);
  });
  const cancel = () => (cancelled = true);
  return {
    promise,
    cancel,
  };
};

const preloadedImageCache = {};

/**
 * Preload an image
 * @param  {string}  options.url      the URL
 * @param  {string}  options.filename the URL's corresponding filename
 * @param  {Boolean} cache            whether to cache this image
 */
export const preloadImage = ({ url, filename }, cache = false) =>
  new Promise((resolve, reject) => {
    if (cache && preloadedImageCache[url]) {
      return resolve(preloadedImageCache[url]);
    }
    if (!url || (typeof url === "object" && url instanceof Image)) {
      return resolve({
        image: url,
        url,
        filename,
      });
    }
    // console.log("preload", url);
    const image = new Image();
    let loaded = false;
    image.onload = () => {
      if (loaded) return;
      loaded = true;
      image.onload = null;
      image.onerror = null;
      if (cache) {
        preloadedImageCache[url] = { url, filename, image };
      }
      resolve({ url, filename, image });
    };
    image.onerror = () => {
      if (loaded) return;
      image.onload = null;
      image.onerror = null;
      reject({ url, filename, image: null });
    };
    // console.log(img.src)
    image.src = url;
    if (image.complete) {
      image.onload();
    }
  });

/**
 * Crop an image
 * @param  {String} url.url     the URL (see preloadImage format)
 * @param  {Number} crop.x      the X coordinate of the top-left corner
 * @param  {Number} crop.y      the Y coordinate of the top-left corner
 * @param  {Number} crop.w      the width of the cropped region
 * @param  {Number} crop.h      the height of the cropped region
 * @param  {Number} maxSide     if present, the resulting crop will be scaled so neither side is larger than this value
 * @return {Canvas}             the cropped image, as a canvas
 */
export const cropImage = (url, crop, maxSide) => {
  return new Promise((resolve, reject) => {
    preloadImage(url, true).then((image) => {
      let { x, y, w, h } = crop;
      x = parseFloat(x);
      y = parseFloat(y);
      w = parseFloat(w);
      h = parseFloat(h);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const { naturalWidth, naturalHeight } = image;

      let width, height;
      let cropWidth = naturalWidth * w;
      let cropHeight = naturalHeight * h;

      if (maxSide > 0) {
        if (cropWidth > cropHeight) {
          width = Math.min(maxSide, cropWidth);
          height = (cropHeight * width) / cropWidth;
        } else {
          height = Math.min(maxSide, cropHeight);
          width = (cropWidth * height) / cropHeight;
        }
      } else {
        width = cropWidth;
        height = cropHeight;
      }

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(
        image,
        Math.round(x * naturalWidth),
        Math.round(y * naturalHeight),
        Math.round(w * naturalWidth),
        Math.round(h * naturalHeight),
        0,
        0,
        canvas.width,
        canvas.height
      );
      // console.log(x, y, w, h)
      // console.log(naturalWidth, naturalHeight)
      // console.log(width, height)
      resolve(canvas);
    });
  });
};

/**
 * Async wrapper for canvas.toBlob
 * @param  {Canvas} canvas  the canvas to be converted
 * @param  {string} type    MIME type (image/png or image/jpeg)
 * @param  {number} quality quality [0-1]
 * @return {Blob}           canvas as a blob
 */
export function canvasToBlob(canvas, type, quality) {
  return new Promise(function (resolve) {
    try {
      canvas.toBlob(resolve, type, quality);
    } catch (error) {
      reject(error);
    }
  });
}

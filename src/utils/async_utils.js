/**
 * Asynchronous utilities
 * @module utils/async_utils.js
 */

export async function wait(delay = 1000) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), delay);
  });
}

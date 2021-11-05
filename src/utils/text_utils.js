/**
 * Text procesing
 * @module utils/text_utils
 */

export const capitalizeWord = (text = "") =>
  text ? text.charAt(0).toUpperCase() + text.slice(1) : "";

export const capitalize = (text = "") =>
  String(text || "")
    .split(" ")
    .map(capitalizeWord)
    .join(" ");

export const pluralize = (count, noun, pluralNoun) => {
  if (count === 1) return `${count} ${noun}`;
  if (pluralNoun) return `${commatize(count)} ${pluralNoun}`;
  return `${commatize(count)} ${noun}s`;
};

export const commatize = (value = 0.0, root = 0.0) => {
  var nums = [],
    remainder,
    counter = 0;
  if (root && value > root) {
    value /= root;
    nums.unshift(Math.floor((value * 10) % 10));
    nums.unshift(".");
  }
  do {
    remainder = Math.floor(value % 10);
    value = Math.floor(value / 10);
    counter += 1;
    if (value && !(counter % 3)) {
      remainder = "," + Math.floor(remainder);
    }
    nums.unshift(remainder);
  } while (value);
  return nums.join("");
};

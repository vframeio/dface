/**
 * Data helpers
 * @module utils/data_utils.js
 */

import { capitalize } from "utils/text_utils";

export const optionLookup = (options) =>
  options.reduce((lookup, option) => {
    lookup[option.name] = option;
    return lookup;
  }, {});

export const objectOptions = (object) =>
  Object.keys(object).map((key) => ({ name: key, label: capitalize(key) }));

/**
 * Extract the filename from an arbitrary URL
 * @param  {String} url the URL
 * @return {String}     the filename part of the URL
 */
export const getFilename = (url) => {
  try {
    const pathname = new URL(url).pathname;
    const path = pathname.split("/");
    return path[path.length - 1];
  } catch (error) {
    return "image.jpg";
  }
};

export const getOutputFilename = (url, settings) => {
  const filename = isURL(url) ? getFilename(url) : url;
  let outputFilename;
  if (settings.process.forceJPG) {
    const [fpart, ext] = splitFilename(filename);
    outputFilename = `${fpart}.jpg`;
  } else {
    outputFilename = filename;
  }
  if (settings.process.prefixFilename) {
    outputFilename = "DFACE_" + outputFilename;
  }
  return outputFilename;
};

export const splitFilename = (filename) => {
  const parts = filename.split(".");
  const fpart = parts.slice(0, parts.length - 1).join(".");
  const ext = parts[parts.length - 1];
  return [fpart, ext];
};

export const getOutputType = (url, settings) => {
  if (settings.process.forceJPG) {
    return "image/jpeg";
  }
  const filename = getOutputFilename(url, settings);
  const [fpart, ext] = splitFilename(filename);
  if (ext === "jpg") {
    return "image/jpeg";
  }
  return `image/${ext}`;
};

export const isURL = (string) => !!string.match(/^https?:\/\//);

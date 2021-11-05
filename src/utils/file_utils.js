/**
 * File utilities
 * @module utils/file_utils.js
 */

import filesystem from "fs";
import YAML from "yaml";

/**
 * Helper function to load JSON from a file
 * @param  {string} inputFile  path to the file
 * @return {Promise} promise which will resolve with the parsed JSON
 */
export const loadFile = (inputFile) =>
  new Promise((resolve, reject) => {
    if (!filesystem.existsSync(inputFile)) {
      return reject("inputFile does not exist");
    }
    filesystem.readFile(inputFile, "utf8", (error, text) => {
      if (error) {
        return reject(`Error reading file: ${error}`);
      }
      resolve(text);
    });
  });

/**
 * Helper function to load JSON from a file
 * @param  {string} inputFile  path to the file
 * @return {Promise} promise which will resolve with the parsed JSON
 */
export const loadJSON = (inputFile) =>
  loadFile(inputFile).then((text) => JSON.parse(text));

/**
 * Helper function to load YAML from a file
 * @param  {string} inputFile  path to the file
 * @return {Promise} promise which will resolve with the parsed YAML
 */
export const loadYAML = (inputFile) =>
  loadFile(inputFile).then((text) => YAML.parse(text, { merge: true }));

/**
 * Helper to write a string to a file
 * @param {string}          outputFile the file to write to
 * @param {string|string[]} data       the data to write
 * @param {Object}          options    options, by default will overwrite the existing file
 * @return {Promise}                   promise which will resolve when the file is saved
 */
const writeFileOptions = {
  replace: true,
};

export const writeFile = (outputFile, data, options = {}) => {
  options = { ...writeFileOptions, ...options };
  return new Promise((resolve, reject) => {
    if (filesystem.existsSync(outputFile) && !options.replace) {
      return reject("outputFile exists");
    }
    if (Array.isArray(data)) {
      data = data.join("\n");
    }
    filesystem.writeFile(outputFile, data, { encoding: "utf8" }, (error) => {
      if (error) {
        return reject(`Error writing file: ${error}`);
      }
      resolve();
    });
  });
};

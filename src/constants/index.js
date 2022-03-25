/**
 * App constants
 * @module constants/index.js
 */

import { objectOptions } from "utils/data_utils";

/** Image processing modes */

export const effectOptions = [
  { name: "blur", label: "Blur (soft)" },
  { name: "mosaic", label: "Mosaic" },
  { name: "fuzz", label: "Fuzz" },
  { name: "color", label: "Color fill" },
  { name: "emoji", label: "Emoji" },
];

export const softEdgeEffects = new Set(["blur", "fuzz"]);
export const preBlurEffects = new Set(["emoji"]);

export const effectNames = effectOptions
  .map((option) => option.name)
  .filter((name) => name !== "random");

/** Shapes */

export const shapeOptions = [
  { name: "rect", label: "Rectangle" },
  { name: "ellipse", label: "Ellipse" },
];

/** Color palettes */

export const palettes = {
  red: ["#f70707"],
  green: ["#00ff00"],
  blue: ["#0f1fff"],
  green: ["#00ff00"],
  white: ["#ffffff"],
  black: ["#000000"],
  white: ["#FFFFFF"],
  grayscale: [
    "#000000",
    "#222222",
    "#444444",
    "#666666",
    "#888888",
    "#bbbbbb",
    "#dddddd",
    "#ffffff",
  ],
  primary: ["#f70707", "#f78f07", "#f7eb07", "#02c908", "#4163fc", "#a241fc"],
  neon: ["#fc53da", "#28fc20", "#fcfc20", "#20fcf5"],
};

export const paletteOptions = objectOptions(palettes);

/** Emoji */

export const emojiOptions = [
  { name: "flag_ukraine", label: "Ukraine Flag" },
  { name: "face_mask", label: "Face mask" },
  { name: "faces", label: "Faces" },
  { name: "hearts", label: "Hearts" },
  { name: "halloween", label: "Halloween" },
  { name: "fruits", label: "Fruits" },
  { name: "animals", label: "Animals" },
];

/** Paths */

export const IMAGE_BASE_HREF = "/assets/img/sample";
export const THUMBNAIL_BASE_HREF = "/assets/img/sample/t";

export const getWeightsPath = (modelName) =>
  process.env.NODE_ENV == "production"
    ? `https://ams3.digitaloceanspaces.com/vframe/dface_app/models/${modelName}/model.json`
    : `assets/models/${modelName}/model.json`;

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

/** Sample images */

export const sampleImages = [
  { filename: "face-snowden-x1.jpg" },
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
  halloween: ["#E02401", "#F78812", "#AB6D23", "#51050F", "#3D0000"],
};

export const paletteOptions = objectOptions(palettes);

/** Emoji */

export const emojiOptions = [
  { name: "faces", label: "Faces" },
  { name: "hearts", label: "Hearts" },
  { name: "halloween", label: "Halloween" },
  { name: "fruits", label: "Fruits" },
  { name: "animals", label: "Animals" },
];

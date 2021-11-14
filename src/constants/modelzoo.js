/**
 * VFRAME Model Zoo (built from modelzoo.yaml)
 * @module constants/modelzoo.js
 */

export const modelzoo = {
  "yoloface-18-nn": {
    "name": "Nano 1.18 1280px (12MB)",
    "width": 1280,
    "height": 1280,
    "iou": 0.45,
    "nms_threshold": 0.4,
    "threshold": 0.5,
    "resize_enabled": true,
    "notes": "rotated faces"
  }
};

export const modelzooOptions = [
  {
    "name": "yoloface-18-nn",
    "label": "Nano 1.18 1280px (12MB)"
  }
];
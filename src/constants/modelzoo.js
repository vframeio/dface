/**
 * VFRAME Model Zoo (built from modelzoo.yaml)
 * @module constants/modelzoo.js
 */

export const modelzoo = {
  "yoloface-nn-15": {
    "name": "Nano 1.15 (12MB)",
    "width": 1280,
    "height": 1280,
    "iou": 0.45,
    "nms_threshold": 0.4,
    "threshold": 0.5,
    "resize_enabled": true
  },
  "yoloface-nn-14": {
    "name": "Nano 1.14 (12MB)",
    "width": 1280,
    "height": 1280,
    "iou": 0.45,
    "nms_threshold": 0.4,
    "threshold": 0.5,
    "resize_enabled": true
  }
};

export const modelzooOptions = [
  {
    "name": "yoloface-nn-15",
    "label": "Nano 1.15 (12MB)"
  },
  {
    "name": "yoloface-nn-14",
    "label": "Nano 1.14 (12MB)"
  }
];
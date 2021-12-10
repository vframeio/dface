/**
 * VFRAME Model Zoo (built from modelzoo.yaml)
 * @module constants/modelzoo.js
 */

export const modelzoo = {
  "yoloface-18-nn": {
    "name": "Nano 1.18 (12MB)",
    "width": 1280,
    "height": 1280,
    "iou": 0.45,
    "nms_threshold": 0.4,
    "threshold": 0.5,
    "resize_enabled": true,
    "labels": [
      "Face"
    ]
  },
  "yoloface-18-sm": {
    "name": "Small 1.18 (50MB)",
    "width": 1280,
    "height": 1280,
    "iou": 0.45,
    "nms_threshold": 0.4,
    "threshold": 0.5,
    "resize_enabled": true,
    "labels": [
      "Face"
    ]
  }
};

export const modelzooOptions = [
  {
    "name": "yoloface-18-nn",
    "label": "Nano 1.18 (12MB)"
  },
  {
    "name": "yoloface-18-sm",
    "label": "Small 1.18 (50MB)"
  }
];
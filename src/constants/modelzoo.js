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
    "object_type": "face",
    "labels": [
      "Face"
    ],
    "license": "GNU General Public License v3.0",
    "version": 1,
    "sample_images": [
      {
        "filename": "51906231762_6fce013c41_c.jpg",
        "url": "https://www.flickr.com/photos/geolis06/51906231762/",
        "via": "Georges Lissillour",
        "license": "Public Domain"
      },
      {
        "filename": "51907203661_a090071bc1_c.jpg",
        "url": "https://www.flickr.com/photos/geolis06/51907203661/",
        "via": "Georges Lissillour",
        "license": "Public Domain"
      },
      {
        "filename": "51907203691_9e888ccc2a_c.jpg",
        "url": "https://www.flickr.com/photos/geolis06/51907203691/",
        "via": "Georges Lissillour",
        "license": "Public Domain"
      }
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
    "object_type": "face",
    "labels": [
      "Face"
    ],
    "license": "GNU General Public License v3.0",
    "version": 1,
    "sample_images": [
      {
        "filename": "51906231762_6fce013c41_c.jpg",
        "url": "https://www.flickr.com/photos/geolis06/51906231762/",
        "via": "Georges Lissillour",
        "license": "Public Domain"
      },
      {
        "filename": "51907203661_a090071bc1_c.jpg",
        "url": "https://www.flickr.com/photos/geolis06/51907203661/",
        "via": "Georges Lissillour",
        "license": "Public Domain"
      },
      {
        "filename": "51907203691_9e888ccc2a_c.jpg",
        "url": "https://www.flickr.com/photos/geolis06/51907203691/",
        "via": "Georges Lissillour",
        "license": "Public Domain"
      }
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
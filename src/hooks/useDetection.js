/**
 * Hook to perform face detection
 * @module constants/useDetection.js
 */

import { useMemo } from "react";

import useAsyncTask from "hooks/useAsyncTask";
import detect from "image/detect";

/**
 * Hook to perform asynchronous face detections
 * @param  {Object} model      model state returned from useModel
 * @param  {Array}  images     images returned from dropzone (array of Image() objects)
 */
export default function useDetection(model, images) {
  const ready = useMemo(
    () => !model?.loading && model?.model && images?.length,
    [model, images]
  );

  const method = useMemo(
    () => async (image) => await detect(model?.model, image),
    [model?.model, images]
  );

  return useAsyncTask({
    name: "detect",
    tasks: images,
    dependencies: [model?.model, images],
    ready,
    method,
  });
}

/**
 * Hook to perform face detection
 * @module constants/useDetection.js
 */

import { useMemo } from "react";
import useAsyncTask from "hooks/useAsyncTask";

import { process } from "image/process";

/**
 * Hook to apply an effect to face detections
 * @param  {Array}  detections  detections from useDetection
 * @param  {Object} settings    application settings
 */
export default function useProcess(
  model,
  detections,
  settings,
  resultsSettings
) {
  const ready = useMemo(() => detections?.results?.length, [detections]);

  const method = useMemo(
    () => async (image) => await process(image, settings, resultsSettings),
    [detections, settings, resultsSettings]
  );

  const revoke = useMemo(
    () => (results) =>
      results.forEach((result) => URL.revokeObjectURL(result.url))
  );

  return useAsyncTask({
    name: "process",
    tasks: detections?.results,
    dependencies: [model, detections, settings],
    ready,
    method,
    revoke,
  });
}

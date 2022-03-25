/**
 * Detection results
 * @module components/detect/Results.js
 */

import { useCallback } from "react";
import PropTypes from "prop-types";

import { pluralize } from "utils/text_utils";
import { getOutputFilename, splitFilename } from "utils/data_utils";
import saveAs from "file-saver";
import { modelzoo } from "constants/modelzoo";

export default function Results({
  results,
  settings,
  resultsSettings,
  onReset,
  timing,
}) {
  const modelzooModel = modelzoo[settings.detect.model];

  const downloadJSON = useCallback(
    (result) => () => {
      const data = makeJSON([result], settings);
      const blob = new Blob([JSON.stringify(data, false, 2)], {
        type: "application/json;charset=utf-8",
      });
      const [filename] = splitFilename(result.image.filename);
      saveAs(blob, `${filename}.json`);
    },
    [settings]
  );

  const handleDownloadAllImages = useCallback(() => {
    results.forEach((result) => {
      saveAs(
        result.blob,
        getOutputFilename(result.image.filename, resultsSettings)
      );
    });
  }, [results]);

  const handleDownloadAllJSON = useCallback(() => {
    const data = makeJSON(results, settings);
    const blob = new Blob([JSON.stringify(data, false, 2)], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, `dface results.json`);
  }, [results]);

  return (
    <div className="results">
      {results.length > 1 && (
        <div className="downloadAllLinks">
          <button className="downloadAll" onClick={handleDownloadAllImages}>
            Download All Images ({results.length})
          </button>
          <button className="downloadAll" onClick={handleDownloadAllJSON}>
            Download All JSON ({results.length})
          </button>
        </div>
      )}

      {results?.map((result, index) => (
        <div key={index} className="result">
          <img
            src={result.url}
            alt="Detection result"
            style={{
              maxWidth: result.image.image.naturalWidth,
              width: "100%",
              minWidth: "360px",
              aspectRatio: `${result.image.image.naturalWidth} / ${result.image.image.naturalHeight}`,
            }}
          />

          <div className="meta">
            <a
              href={result.url}
              download={getOutputFilename(
                result.image.filename,
                resultsSettings
              )}
              className="downloadLink"
            >
              Image
            </a>
            <span onClick={downloadJSON(result)} className="downloadLink">
              JSON
            </span>
            <button className="reset" onClick={onReset}>
              Reset
            </button>
            <div className="info">
              {result.detectionCount
                ? pluralize(result.detectionCount, modelzooModel?.object_type)
                : `No ${modelzooModel?.object_type}s detected`}
              {index === 0 && `, ${timing.toFixed(1)} sec. `}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function makeJSON(results, settings) {
  const { confidence, model } = settings.detect;
  const modelzooModel = modelzoo[model];
  return {
    application: {
      site_name: "DFACE: Face Redaction",
      site_url: "https://dface.app/",
      credit: "VFRAME",
      credit_url: "https://vframe.io/",
    },
    results: results.map((result) => ({
      detections: result.detections.filter(
        (detection) => detection.score > settings.detect.confidence
      ),
      filename: result.image.filename,
    })),
    model: {
      id: model,
      name: modelzooModel.name,
      license: modelzooModel.license,
      object_type: modelzooModel.object_type,
      height: modelzooModel.height,
      width: modelzooModel.width,
      iou: modelzooModel.iou,
      resize_enabled: modelzooModel.resize_enabled,
      nms_threshold: modelzooModel.nms_threshold,
      threshold: modelzooModel.threshold,
      version: modelzooModel.version,
    },
  };
}

Results.propTypes = {
  results: PropTypes.array,
  settings: PropTypes.object,
  resultsSettings: PropTypes.object,
  onReset: PropTypes.func,
  timing: PropTypes.number,
};

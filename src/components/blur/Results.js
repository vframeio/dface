/**
 * Face blurring results
 * @module components/blur/Results.js
 */

import { useCallback } from "react";
import PropTypes from "prop-types";

import { pluralize } from "utils/text_utils";
import { getOutputFilename } from "utils/data_utils";
import saveAs from "file-saver";

export default function Results({
  results,
  settings,
  resultsSettings,
  onReset,
  timing,
}) {
  const handleDownloadAll = useCallback(() => {
    results.forEach((result) => {
      saveAs(
        result.blob,
        getOutputFilename(result.image.filename, resultsSettings)
      );
    });
  }, [results]);

  return (
    <div className="results">
      {results?.map((result, index) => (
        <div key={index} className="result">
          <img
            src={result.url} alt="Detection result"
            style={{
              maxWidth: result.image.image.naturalWidth,
              width: '100%',
              minWidth: '360px',
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
              Download image
            </a>
            {results.length > 1 && (
              <button className="downloadAll" onClick={handleDownloadAll}>
                Download All ({results.length})
              </button>
            )}
            <button className="reset" onClick={onReset}>
              Reset
            </button>
            <div className="info">
              {result.detectionCount
                ? pluralize(result.detectionCount, "face")
                : "No faces detected"}
              {index === 0 && `, ${timing.toFixed(1)} sec. `}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

Results.propTypes = {
  results: PropTypes.array,
  settings: PropTypes.object,
  resultsSettings: PropTypes.object,
  onReset: PropTypes.func,
  timing: PropTypes.number,
};

/**
 * Detection results
 * @module components/blur/Results.js
 */

import PropTypes from "prop-types";

import { pluralize } from "utils/text_utils";
import { getOutputFilename } from "utils/data_utils";

export default function ResultsPlaceholder({ images, isFirstTime }) {
  return (
    <div className="results placeholder">
      {isFirstTime && (
        <div className="firstTime">
          Loading and compiling model. Please wait 5-10 seconds for first
          inference.
        </div>
      )}
      {images.map((image, index) => (
        <div key={index} className="result placeholder">
          <img
            src={image.url}
            alt="Detection result"
            style={{
              maxWidth: image.image.naturalWidth,
              width: "100%",
              minWidth: "360px",
              aspectRatio: `${image.image.naturalWidth} / ${image.image.naturalHeight}`,
            }}
          />
          <div className="meta">
            <div className="info">Processing. Please wait...</div>
          </div>
        </div>
      ))}
    </div>
  );
}

ResultsPlaceholder.propTypes = {
  results: PropTypes.array,
  isFirstTime: PropTypes.bool,
};

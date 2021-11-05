/**
 * Face blurring results
 * @module components/blur/Results.js
 */

import PropTypes from "prop-types";

import { pluralize } from "utils/text_utils";
import { getOutputFilename } from "utils/data_utils";

export default function ResultsPlaceholder({ images }) {
  return (
    <div className="results placeholder">
      {images.map((image, index) => (
        <div key={index} className="result">
          <img src={image.url} />
          <div className="meta">
            <div className="info">Processing...</div>
          </div>
        </div>
      ))}
    </div>
  );
}

ResultsPlaceholder.propTypes = {
  results: PropTypes.array,
};

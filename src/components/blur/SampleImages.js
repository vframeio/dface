/**
 * Sample images
 * @module components/blur/SampleImages.js
 */

import { sampleImages } from "constants/index";
import PropTypes from "prop-types";

export default function SampleImages({ onClick }) {
  return (
    <div className="sampleImages">
      <span className="desc">Sample images</span>
      <div>
        {sampleImages.map((sample, index) => (
          <div key={index}>
            <img
              src={`/assets/img/sample/${sample.filename}`}
              onClick={onClick}
            />
            via {sample.via && <a href={sample.url}>{sample.via}</a>}{" "}<br/>
            {`${sample.license || "sample"}`}
          </div>
        ))}
      </div>
    </div>
  );
}

SampleImages.propTypes = {
  onClick: PropTypes.func,
};

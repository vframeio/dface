/**
 * Sample images
 * @module components/detect/SampleImages.js
 */

import { useCallback } from "react";
import clsx from "clsx";
import { modelzoo } from "constants/modelzoo";
import { IMAGE_BASE_HREF, THUMBNAIL_BASE_HREF } from "constants/index";
import PropTypes from "prop-types";
import { preloadImage } from "utils/image_utils";

export default function SampleImages({ modelName, onClick, isWorking }) {
  const handleClick = useCallback(
    (sampleImage) => async (event) => {
      // Assemble the data format expected by the detection pipeline
      const { filename } = sampleImage;
      const url = `${IMAGE_BASE_HREF}/${filename}`;
      const { image } = await preloadImage({ url });
      onClick({
        filename,
        url,
        image,
      });
    },
    [onClick]
  );

  if (!(modelName in modelzoo)) {
    return null;
  }
  const { sample_images } = modelzoo[modelName];
  const model = modelzoo[modelName];
  return (
    <div className={clsx({ sampleImages: true, isWorking })}>
      <div className="sampleImagesList">
        <span className="desc">Sample images</span>
        <div className="sampleImagesContainer">
          {sample_images.map((sampleImage, index) => (
            <div className="sampleImage" key={index}>
              <img
                src={`${THUMBNAIL_BASE_HREF}/${sampleImage.filename}`}
                onClick={handleClick(sampleImage)}
              />
              via{" "}
              {sampleImage.via && (
                <a href={sampleImage.url}>{sampleImage.via}</a>
              )}{" "}
              <br />
              {`${sampleImage.license || ""}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

SampleImages.propTypes = {
  modelName: PropTypes.string,
  onClick: PropTypes.func,
  isWorking: PropTypes.bool,
};

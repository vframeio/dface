/**
 * Image loader drop zone
 * @module components/blur/DropZone
 */

import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import MagicDropZone from "components/dropzone/MagicDropZone";

import { preloadImages } from "utils/image_utils";
import {
  getFilename,
  getOutputFilename,
  getOutputType,
} from "utils/data_utils";

/**
 * Preload drag-and-dropped images
 */
export default function DropZone({
  onDrop,
  onClick,
  button,
  condensed,
  processing,
  clickable,
  settings,
  children,
}) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback(
    async (accepted, rejected, links) => {
      const urls = accepted.length
        ? accepted.map((image) => ({
            filename: image.name,
            url: image.preview,
          }))
        : links.map((link) => ({
            filename: getFilename(link),
            url: link,
          }));
      const images = await preloadImages(urls).promise;
      try {
        setDragging(false);
      } catch (error) {}
      onDrop(images);
    },
    [onDrop]
  );

  const handleDragEnter = useCallback(() => {
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  return (
    <MagicDropZone
      className={clsx({
        dropzone: true,
        button,
        condensed,
        processing,
      })}
      accept="image/jpeg, image/png, .jpg, .jpeg, .png"
      multiple={true}
      onDrop={handleDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {children}
      {!button && dragging && (
        <div className="drag-message">
          <div>Drop images to begin processing</div>
        </div>
      )}
    </MagicDropZone>
  );
}

DropZone.propTypes = {
  onDrop: PropTypes.func,
  onClick: PropTypes.func,
  clickable: PropTypes.bool,
  button: PropTypes.bool,
  condensed: PropTypes.bool,
  processing: PropTypes.bool,
  settings: PropTypes.object,
  children: PropTypes.any,
};

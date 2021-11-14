/**
 * Intro dropzone
 * components/blur/Intro.js
 */

import { useState, useCallback } from "react";
import DropZone from "components/blur/DropZone";

export default function Intro({ onDrop, settings }) {
  const [clicked, setClicked] = useState(false);

  /**
   * Workaround to avoid receiving dropped files from this element...
   * since these should be received by the top-level DropZone
   */
  const handleClick = useCallback(() => {
    setClicked(true);
    console.log("duh");
  });

  const handleDrop = useCallback(
    (files) => {
      console.log("clicked?", clicked);
      if (!clicked) {
        return;
      }
      onDrop(files);
    },
    [clicked, onDrop]
  );

  return (
    <DropZone
      onClick={handleClick}
      onDrop={handleDrop}
      settings={settings}
      clickable
    >
      <div className="dropzone">
        <div className="introText">
          <span>+</span>
          <br />
          <span>Drag-and-drop images here</span>
        </div>
      </div>
    </DropZone>
  );
}

/**
 * Face blur settings
 * @module components/blur/Settings.js
 */

import PropTypes from "prop-types";
import { useState, useCallback } from "react";
import clsx from "clsx";

import DropZone from "components/blur/DropZone";
import Select from "components/common/Select";
import Slider from "components/common/Slider";
import Checkbox from "components/common/Checkbox";

import {
  effectOptions,
  softEdgeEffects,
  paletteOptions,
  shapeOptions,
  emojiOptions,
} from "constants/index";
import { modelzooOptions } from "constants/modelzoo";

export default function Settings({
  settings,
  resultsSettings,
  processing,
  onChange,
  onResultsSettingsChange,
  onDrop,
  showDropZone,
}) {
  const [advanced, setAdvanced] = useState(false);
  const toggleAdvanced = useCallback(() => {
    setAdvanced(!advanced);
  }, [advanced]);

  return (
    <div className={clsx({ settings: true, processing })}>
      {showDropZone && (
        <DropZone
          onDrop={onDrop}
          settings={settings}
          condensed={true}
          processing={processing}
        >
          <div className="introText">
            Add Image
          </div>
        </DropZone>
      )}
      <Select
        group="process"
        name="effect"
        selected={settings.process.effect}
        options={effectOptions}
        defaultOption="color"
        title="Redaction effect"
        onChange={onChange}
      />

      {softEdgeEffects.has(settings.process.shape) && (
        <Select
          group="process"
          name="shape"
          className="small"
          selected={settings.process.shape}
          options={shapeOptions}
          defaultOption="rect"
          title="Shape"
          onChange={onChange}
        />
      )}

      {settings.process.effect === "color" && (
        <>
          <Select
            group="color"
            name="palette"
            selected={settings.color.palette}
            options={paletteOptions}
            defaultOption="primary"
            title="Color palette"
            onChange={onChange}
          />
        </>
      )}

      {settings.process.effect === "blur" && (
        <>
          <Slider
            group="blur"
            name="radius"
            value={settings.blur.radius}
            min={0.005}
            max={0.1}
            step={0.001}
            title="Blur radius"
            onChange={onChange}
          />
        </>
      )}

      {settings.process.effect === "mosaic" && (
        <>
          <Slider
            group="mosaic"
            name="radius"
            value={settings.mosaic.radius}
            min={0.01}
            max={0.3}
            step={0.01}
            title="Mosaic size"
            onChange={onChange}
          />
        </>
      )}

      {settings.process.effect === "fuzz" && (
        <>
          <Slider
            group="fuzz"
            name="radius"
            value={settings.fuzz.radius}
            min={0.25}
            max={0.5}
            step={0.01}
            title="Fuzz factor"
            onChange={onChange}
          />
        </>
      )}

      {settings.process.effect === "emoji" && (
        <>
          <Select
            group="emoji"
            name="type"
            selected={settings.emoji.type}
            options={emojiOptions}
            defaultOption="primary"
            title="Emoji theme"
            onChange={onChange}
          />
        </>
      )}

      <Slider
        group="detect"
        name="confidence"
        value={settings.detect.confidence}
        min={0.0}
        max={1.0}
        step={0.01}
        title="Minimum Confidence"
        onChange={onChange}
      />

      <div className={clsx({ checkboxes: true, advanced })}>
        <div onClick={toggleAdvanced}>Advanced Options</div>
        {advanced && (
          <>
            <Checkbox
              group="process"
              name="autoDownload"
              checked={resultsSettings.process.autoDownload}
              label="Auto download"
              onChange={onResultsSettingsChange}
            />

            <Checkbox
              group="process"
              name="forceJPG"
              checked={resultsSettings.process.forceJPG}
              label="Force JPG"
              onChange={onResultsSettingsChange}
            />

            {/*
              <Checkbox
                group="process"
                name="downloadJSON"
                checked={resultsSettings.process.downloadJSON}
                label="Download JSON"
                onChange={onResultsSettingsChange}
              />
            */}

            <Checkbox
              group="process"
              name="prefixFilename"
              checked={resultsSettings.process.prefixFilename}
              label="Prefix Filename"
              onChange={onResultsSettingsChange}
            />

            <Checkbox
              group="process"
              name="showSamples"
              checked={resultsSettings.process.showSamples}
              label="Show samples"
              onChange={onResultsSettingsChange}
            />

            {/*
            <Select
              group="detect"
              name="model"
              className="modelName"
              selected={settings.detect.model}
              options={modelzooOptions}
              defaultOption={null}
              title="Detection Model"
              onChange={onChange}
            />
            */}
          </>
        )}
      </div>
    </div>
  );
}

Settings.propTypes = {
  settings: PropTypes.object,
  resultsSettings: PropTypes.object,
  onChange: PropTypes.func,
  onResultsSettingsChange: PropTypes.func,
  onDrop: PropTypes.func,
};

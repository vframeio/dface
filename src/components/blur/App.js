/**
 * Container for face blurring application
 * @module components/blur/Container
 */

import { useState, useEffect, useCallback } from "react";
import useModel from "hooks/useModel";
import useDetection from "hooks/useDetection";
import useProcess from "hooks/useProcess";

import Sidebar from "components/common/Sidebar";
import Footer from "components/common/Footer";
import { isMobile } from "utils/mobile_utils";

import DropZone from "components/blur/DropZone";
import Intro from "components/blur/Intro";
import Loader from "components/blur/Loader";
import Settings from "components/blur/Settings";
import SampleImages from "components/blur/SampleImages";
import Results from "components/blur/Results";
import ResultsPlaceholder from "components/blur/ResultsPlaceholder";
import Emoji from "components/common/Emoji";

import { modelzoo } from "constants/modelzoo";
import {
  getFilename,
  getOutputFilename,
  getOutputType,
} from "utils/data_utils";

export default function App() {
  const [settings, setSettings] = useState({
    detect: {
      model: "yoloface-18-nn",
      confidence: 0.25,
    },
    process: {
      effect: "color",
      palette: "blue",
      shape: "rect",
      softenEdges: 0.1,
      expand: 0.1,
    },
    blur: {
      radius: 0.15,
    },
    color: {
      palette: "blue",
    },
    mosaic: {
      radius: 0.15,
    },
    emoji: {
      type: "faces",
    },
    fuzz: {
      radius: 0.5,
    },
  });
  const [resultsSettings, setResultsSettings] = useState({
    process: {
      autoDownload: false,
      downloadJSON: false,
      forceJPG: false,
      prefixFilename: true,
      showSamples: true,
    },
  });

  const [images, setImages] = useState([]);
  const model = useModel(settings.detect.model);
  const detections = useDetection(model, images);
  const processed = useProcess(model, detections, settings, resultsSettings);
  const [isWorking, setIsWorking] = useState(false);

  useEffect(() => {
    setIsWorking(
      !!images.length &&
        (model?.loading ||
          detections?.loading ||
          processed?.loading ||
          !detections?.results ||
          !processed?.results)
    );
  }, [model, detections, processed]);

  const handleDrop = useCallback(
    (newImages) => {
      setImages(newImages);
      setResultsSettings({
        ...resultsSettings,
        process: {
          ...resultsSettings.process,
          showSamples: false,
        },
      });
    },
    [resultsSettings]
  );

  const handleSample = useCallback(
    (event) => {
      setImages([
        {
          url: event.target.src,
          image: event.target,
          filename: getFilename(event.target.src),
        },
      ]);
    },
    [settings]
  );

  const handleSettingsChange = useCallback(
    (group, name, value) => {
      const newSettings = {
        ...settings,
        [group]: {
          ...settings[group],
          [name]: value,
        },
      };
      if (name === "model") {
        newSettings.detect.confidence = modelzoo[value].threshold;
      }
      setSettings(newSettings);
    },
    [settings]
  );

  const handleResultsSettingsChange = useCallback(
    (group, name, value) => {
      const newSettings = {
        ...resultsSettings,
        [group]: {
          ...resultsSettings[group],
          [name]: value,
        },
      };
      setResultsSettings(newSettings);
    },
    [resultsSettings]
  );

  const handleReset = useCallback(() => {
    setImages([]);
    setResultsSettings({
      ...resultsSettings,
      process: {
        ...resultsSettings.process,
        showSamples: true,
      },
    });
  }, [resultsSettings]);

  return (
    <>
      <Sidebar>
        <Settings
          settings={settings}
          resultsSettings={resultsSettings}
          processing={isWorking}
          onChange={handleSettingsChange}
          onResultsSettingsChange={handleResultsSettingsChange}
          onDrop={handleDrop}
          showDropZone={!!images?.length}
        />
      </Sidebar>
      <div className="content container">
        {!images?.length && (
          <DropZone
            onDrop={handleDrop}
            settings={settings}
            condensed={!!images?.length}
            processing={isWorking}
          >
            <div className="introText">
              <div className="introTextB">Choose or drop photo</div>
            </div>
          </DropZone>
        )}
        <div className="app">
          {(model.loading || model.error) && (
            <Loader
              object={model}
              message="Loading model..."
              errorMessage="Please try a different model."
            />
          )}
          {!!images?.length && isWorking && (
            <ResultsPlaceholder images={images} />
          )}
          {!!images?.length && !isWorking && !!processed?.results?.length && (
            <Results
              timing={
                (processed.endTime -
                  processed.startTime +
                  detections.endTime -
                  detections.startTime) /
                1000
              }
              settings={settings}
              resultsSettings={resultsSettings}
              results={processed.results}
              onReset={handleReset}
            />
          )}
          {resultsSettings.process.showSamples && (
            <SampleImages onClick={handleSample} isWorking={isWorking} />
          )}
          <Emoji />
        </div>
      </div>
      {isMobile && <Footer />}
    </>
  );
}

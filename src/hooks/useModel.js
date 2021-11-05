/**
 * Hook to load a Tensorflow model
 * @module constants/useModel.js
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import * as tf from "@tensorflow/tfjs";
import { modelzoo } from "constants/modelzoo";
import { wait } from "utils/async_utils";

/**
 * Hook to load a model
 * @param  {String} modelName  name of the model to load
 */
export default function useModel(modelName) {
  const [state, setState] = useState({
    model: null,
    loading: false,
    progress: 0,
    error: null,
  });

  useEffect(() => {
    if (!modelName) {
      return;
    }
    console.log(modelName, "changed");
    async function loadGraphModel() {
      setState({
        ...state,
        loading: true,
      });
      await wait(20);
      const weightsPath = `/assets/models/${modelName}/model.json`;
      console.log(`Loading ${weightsPath}`);
      try {
        const tfModel = await tf.loadGraphModel(weightsPath, {
          onProgress: (progress) => setState({ ...state, progress }),
        });
        setState({
          ...state,
          progress: 0,
          loading: false,
          model: {
            name: modelName,
            settings: modelzoo[modelName],
            model: tfModel,
          },
        });
      } catch (error) {
        console.error(error);
        setState({
          ...state,
          loading: false,
          progress: 0,
          error,
        });
      }
    }
    loadGraphModel();
  }, [modelName]);

  return state;
}

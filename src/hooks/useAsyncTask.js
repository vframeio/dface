/**
 * Hook to perform face detection
 * @module constants/useDetection.js
 */

import { useState, useEffect } from "react";
import { wait } from "utils/async_utils";

/**
 * Hook to perform an asynchronous task on multiple objets with progress
 * @param  {Array}    options.tasks        list of work items
 * @param  {Boolean}  options.ready        boolean, should be true if the task should execute
 * @param  {Function} options.method       async function to call on each work item
 * @param  {Array}    options.dependencies list of dependent objects. if this changes, reset the task
 * @param  {Function} options.revoke       function to call to cleanup when starting a new task
 * @return {Object}                        state object containing { loading, progress, error, startTime, endTime, results }
 */
export default function useAsyncTask({
  name,
  tasks,
  ready,
  method,
  dependencies,
  revoke,
}) {
  const [state, setState] = useState({
    results: null,
    loading: false,
    progress: 0,
    error: null,
    startTime: null,
    endTime: null,
  });

  useEffect(() => {
    if (dependencies.some((dependency) => dependency?.loading)) {
      setState({ ...state, progress: 0, results: null });
      return;
    }
    if (!ready || state.loading) {
      setState({
        loading: false,
        results: null,
      });
      return;
    }
    let cancelled = false;
    if (!ready && revoke && state.results?.length) {
      revoke(state.results);
    }
    async function perfomAsyncTask() {
      const newState = {
        loading: true,
        progress: 0,
        error: null,
        results: null,
        startTime: +new Date(),
        endTime: +new Date(),
      };
      setState(newState);
      await wait(100);
      try {
        const results = [];
        for (let index = 0; index < tasks.length; index++) {
          if (index) {
            newState.progress = index / tasks.length;
            setState(newState);
          }
          results[index] = await method(tasks[index]);
          if (cancelled) {
            if (revoke && results?.length) {
              revoke(results);
            }
            return;
          }
        }
        setState({
          ...newState,
          results,
          loading: false,
          endTime: +new Date(),
        });
      } catch (error) {
        console.error(error);
        setState({
          ...newState,
          error,
          loading: false,
          endTime: +new Date(),
        });
      }
    }
    perfomAsyncTask();
    return () => {
      cancelled = true;
    };
  }, dependencies);

  return state;
}

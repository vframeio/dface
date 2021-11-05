/**
 * Progress bar for loading large models
 * components/blur/Loader
 */

import PropTypes from "prop-types";
import clsx from "clsx";

export default function Loader({
  message,
  errorMessage,
  object,
  indeterminate,
}) {
  if (!object) {
    return null;
  }

  const { loading, progress, error } = object;

  if (error) {
    return (
      <div className="loaderError">
        {error.message}
        <br />
        {errorMessage}
      </div>
    );
  }

  if (!loading) {
    return null;
  }

  return (
    <div className="loader">
      <div className="inner">
        <b>{message}</b>
        <div
          className={clsx({
            progress: true,
            indeterminate,
          })}
        >
          <div
            className="bar"
            style={{ width: Math.round(100 * progress) + "%" }}
          />
        </div>
      </div>
    </div>
  );
}

Loader.propTypes = {
  message: PropTypes.string,
  indeterminate: PropTypes.bool,
  object: PropTypes.object,
};

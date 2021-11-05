/**
 * Slider
 * @module components/common/Slider.js
 */

import { useState, useCallback } from "react";
import RcSlider from "rc-slider";
import PropTypes from "prop-types";

export default function Slider({
  group,
  name,
  value,
  min,
  max,
  step,
  title,
  onChange,
}) {
  const [currentValue, setValue] = useState(value);

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
  }, []);

  const handleConfirm = useCallback(
    (event) => {
      onChange(group, name, currentValue);
    },
    [group, name, currentValue, onChange]
  );

  return (
    <div className="slider">
      <div className="desc">
        <span>{title}</span>
        <span>{percent((currentValue - min) / (max - min))}</span>
      </div>
      <RcSlider
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        value={currentValue}
        onChange={handleChange}
        onAfterChange={handleConfirm}
      />
    </div>
  );
}

const percent = (value) => Math.round(value * 100) + "%";

Slider.propTypes = {
  group: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  title: PropTypes.string,
  onChange: PropTypes.func,
};

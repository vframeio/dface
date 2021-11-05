/**
 * Select dropdown
 * components/common/Select
 */

import { useState, useCallback } from "react";
import PropTypes from "prop-types";

export default function Select({
  group,
  name,
  selected,
  options,
  defaultOption,
  title,
  onChange,
  className,
}) {
  const [focused, setFocused] = useState(false);

  const selectedOption = findOptionInGroups(options, String(selected)) || {
    label: defaultOption,
  };

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);
  const handleChange = useCallback(
    (event) => {
      onChange(group, name, event.target.value);
      // this.setState({ focused: false })
    },
    [group, name, onChange]
  );

  return (
    <label className="selectLabel">
      {title && <span>{title}</span>}
      <div
        className={
          (focused ? "select focus" : "select") + " " + (className || "")
        }
      >
        <div>{selectedOption.label}</div>
        <select
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          value={selected || "__default__"}
        >
          {!selected && defaultOption && (
            <option value="__default__">{defaultOption}</option>
          )}
          {options.map((option, i) => (
            <OptionItem key={option.name} {...option} />
          ))}
        </select>
      </div>
    </label>
  );
}

Select.propTypes = {
  group: PropTypes.string,
  name: PropTypes.string,
  selected: PropTypes.string,
  options: PropTypes.array,
  defaultOption: PropTypes.string,
  title: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
};

const findOptionInGroups = (options, selected) => {
  if (options.length && options[0].options) {
    options = options.reduce((a, b) => a.concat(b.options), []);
  }
  return options.find((opt) => String(opt.name) === String(selected));
};

export const OptionItem = ({ name, label, disabled }) => (
  <option value={name} disabled={disabled}>
    {label}
  </option>
);

OptionItem.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

/**
 * Checkbox
 * @module components/common/Checkbox.js
 */

import { useCallback } from "react";
import PropTypes from "prop-types";

export default function Checkbox({ group, name, checked, label, onChange }) {
  const handleChange = useCallback(
    (event) => onChange(group, name, event.target.checked),
    [group, name, onChange]
  );

  return (
    <label className="checkbox">
      <input
        type="checkbox"
        name={name}
        value={1}
        checked={!!checked}
        onChange={handleChange}
      />
      <span>{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  group: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

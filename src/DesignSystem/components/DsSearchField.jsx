import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";
import { DsIcons } from "../icons";
import { fieldGroupClass, fieldInnerInputClass } from "../../Utils/FieldStyles";

// Search box for v2 toolbars. Deliberately reuses SmartStay's existing input
// anatomy (Utils/FieldStyles) — user decision: keep the current field look —
// only sized down to the 36px toolbar height.
function DsSearchField({ value, onChange, placeholder, label = "Search", className = "" }) {
  return (
    <form role="search" autoComplete="off" onSubmit={(e) => e.preventDefault()} className={className}>
      <label className={`${fieldGroupClass(false)} !h-[36px]`}>
        <DsIcon src={DsIcons.magnifyingGlass} />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label={label}
          autoComplete="off"
          spellCheck={false}
          className={fieldInnerInputClass}
        />
      </label>
    </form>
  );
}

DsSearchField.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
};

export default DsSearchField;

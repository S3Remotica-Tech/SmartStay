import React from "react";
import PropTypes from "prop-types";

// 6px status dot for DsBadge's `dot` slot. Takes the badge's text colour,
// so every tone gets a matching dot without extra colours.
function DsDot({ className = "" }) {
  return (
    <span aria-hidden="true" className={`block size-[6px] shrink-0 rounded-full bg-current ${className}`} />
  );
}

DsDot.propTypes = {
  className: PropTypes.string,
};

export default DsDot;

import React from "react";
import PropTypes from "prop-types";

// Figma Skeleton loader (Mobile UI component 33:12862): ink-100 block with a
// pulse, radius-small. Size it with className, e.g. "h-[16px] w-[120px]".
function Skeleton({ className = "h-[16px] w-full", rounded = "rounded-small" }) {
  return <span aria-hidden className={`block animate-pulse bg-ink-100 ${rounded} ${className}`} />;
}

Skeleton.propTypes = {
  className: PropTypes.string,
  rounded: PropTypes.string,
};

export default Skeleton;

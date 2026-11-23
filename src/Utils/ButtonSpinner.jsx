import React from "react";
import PropTypes from "prop-types";

// Loading indicator for buttons (replaces the hand-rolled animate-spin divs).
// `tone="light"` on solid buttons, `"brand"` on soft / outline buttons.
function ButtonSpinner({ tone = "light", label = "Saving..." }) {
  const ring =
    tone === "light"
      ? "border-white border-t-transparent"
      : "border-primary-500 border-t-transparent";
  return (
    <>
      <span
        aria-hidden
        className={`h-4 w-4 shrink-0 animate-spin rounded-full border-2 ${ring}`}
      />
      {label}
    </>
  );
}

ButtonSpinner.propTypes = {
  tone: PropTypes.oneOf(["light", "brand"]),
  label: PropTypes.node,
};

export default ButtonSpinner;

import React from "react";
import PropTypes from "prop-types";

// Figma Link (45:39): inline navigation text. Hover underlines and darkens.
const TONES = {
  primary: "text-[color:var(--ds-text-link)] hover:text-[color:var(--ds-bg-primary-pressed)]",
  neutral: "text-[color:var(--ds-text-secondary)] hover:text-[color:var(--ds-text-default)]",
  danger: "text-[color:var(--ds-text-danger)] hover:text-[color:var(--ds-text-danger-hover)]",
};

function DsTextLink({ tone = "primary", onClick, disabled = false, className = "", children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={`inline-flex items-center gap-[4px] whitespace-nowrap text-[14px] font-medium leading-[20px] underline-offset-2 hover:underline disabled:cursor-not-allowed disabled:opacity-50 disabled:no-underline ${TONES[tone]} ${className}`}
    >
      {children}
    </button>
  );
}

DsTextLink.propTypes = {
  tone: PropTypes.oneOf(["primary", "neutral", "danger"]),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DsTextLink;

import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";

// Figma Icon button/Secondary (27:151): square sm 32 / md 40, radius 8.
// Always give it an aria-label (it doubles as the tooltip text).
const SIZES = { sm: "size-[32px]", md: "size-[40px]" };

function DsIconButton({ icon, label, size = "sm", disabled = false, className = "", ...rest }) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-disabled={disabled || undefined}
      aria-label={label}
      title={label}
      className={[
        "inline-flex shrink-0 items-center justify-center",
        "rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-border-strong)]",
        "bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-surface-hover)] shadow-[var(--ds-shadow-xs)]",
        "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        SIZES[size],
        className,
      ].join(" ")}
      {...rest}
    >
      <DsIcon src={icon} />
    </button>
  );
}

DsIconButton.propTypes = {
  icon: PropTypes.elementType.isRequired,
  label: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md"]),
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default DsIconButton;

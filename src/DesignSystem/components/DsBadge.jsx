import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";

// Figma Badge (15:57): read-only status pill. Soft = default, Solid for
// high attention. `dot` takes a dot icon from DsIcons (dotWarning, dotWhite).
const TONES = {
  soft: {
    neutral: "bg-[var(--ds-neutral-100)] text-[color:var(--ds-neutral-700)]",
    warning: "bg-[var(--ds-warning-50)] text-[color:var(--ds-warning-800)]",
    primary: "bg-[var(--ds-bg-primary-subtle)] text-[color:var(--ds-text-primary)]",
    success: "bg-[var(--ds-success-50)] text-[color:var(--ds-text-success)]",
    danger: "bg-[var(--ds-danger-50)] text-[color:var(--ds-text-danger)]",
  },
  solid: {
    neutral: "bg-[var(--ds-neutral-700)] text-white",
    warning: "bg-[var(--ds-warning-800)] text-white",
    primary: "bg-[var(--ds-bg-primary)] text-white",
    success: "bg-[var(--ds-success-600)] text-white",
    danger: "bg-[var(--ds-text-danger)] text-white",
  },
};

const SIZES = {
  xs: "h-[18px] px-[6px] gap-[5px] text-[10px] leading-[13px]",
  md: "h-[22px] px-[8px] gap-[6px] text-[12px] leading-[16px]",
};

function DsBadge({ tone = "neutral", variant = "soft", size = "md", dot, className = "", children }) {
  return (
    <span
      className={[
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-[var(--ds-radius-full)] font-medium",
        TONES[variant][tone],
        SIZES[size],
        className,
      ].join(" ")}
    >
      {dot && <DsIcon src={dot} />}
      {children}
    </span>
  );
}

DsBadge.propTypes = {
  tone: PropTypes.oneOf(["neutral", "warning", "primary", "success", "danger"]),
  variant: PropTypes.oneOf(["soft", "solid"]),
  size: PropTypes.oneOf(["xs", "md"]),
  dot: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DsBadge;

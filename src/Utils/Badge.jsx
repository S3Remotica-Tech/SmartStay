import React from "react";
import PropTypes from "prop-types";

// Figma Badge (Mobile UI component 18:15966): pill, variant solid / soft /
// outline × tone accent / default / success / warning / danger × size sm / md / lg,
// optional leading icon. Use for statuses (Paid, Pending, Active, Overdue …).
const TONES = {
  accent: {
    solid: "bg-primary-500 text-white",
    soft: "bg-primary-50 text-primary-500",
    outline: "border-primary-500 text-primary-500",
  },
  default: {
    solid: "bg-ink-700 text-white",
    soft: "bg-ink-100 text-ink",
    outline: "border-ink-200 text-ink",
  },
  success: {
    solid: "bg-success-600 text-white",
    soft: "bg-success-50 text-success-700",
    outline: "border-success-600 text-success-700",
  },
  warning: {
    solid: "bg-warning-500 text-ink",
    soft: "bg-warning-50 text-warning-700",
    outline: "border-warning-500 text-warning-700",
  },
  danger: {
    solid: "bg-field-error text-white",
    soft: "bg-[#FFF1F1] text-field-error",
    outline: "border-field-error text-field-error",
  },
};

const SIZES = {
  sm: "h-[20px] px-[8px] text-[11px] leading-[16px] gap-[4px]",
  md: "h-[24px] px-[10px] text-c1 gap-[4px]",
  lg: "h-[28px] px-[12px] text-b3 gap-[6px]",
};

function Badge({ children, tone = "default", variant = "soft", size = "md", icon, className = "" }) {
  const colour = (TONES[tone] || TONES.default)[variant] || TONES.default.soft;
  const outline = variant === "outline" ? "border-[1px] border-solid bg-white" : "";
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-gilroy font-medium ${SIZES[size] || SIZES.md} ${outline} ${colour} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}

Badge.propTypes = {
  children: PropTypes.node,
  tone: PropTypes.oneOf(["accent", "default", "success", "warning", "danger"]),
  variant: PropTypes.oneOf(["solid", "soft", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  icon: PropTypes.node,
  className: PropTypes.string,
};

export default Badge;

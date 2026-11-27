import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";

// Figma Button/Primary (5:114), Button/Secondary (5:228), Button/Danger
// (5:570, solid red = "destructive"; "danger" is the outlined red one).
// Sizes sm 32 / md 40 / lg 48, radius 8, Shadow/XS.
const VARIANTS = {
  primary:
    "bg-[var(--ds-bg-primary)] hover:bg-[var(--ds-bg-primary-hover)] active:bg-[var(--ds-bg-primary-pressed)] text-[color:var(--ds-text-on-primary)] border-transparent",
  secondary:
    "bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-surface-hover)] text-[color:var(--ds-text-default)] border-[color:var(--ds-border-strong)]",
  danger:
    "bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-danger-50)] text-[color:var(--ds-text-danger)] border-[color:var(--ds-border-strong)]",
  destructive:
    "bg-[var(--ds-text-danger)] hover:bg-[var(--ds-text-danger-hover)] text-[color:var(--ds-text-on-primary)] border-transparent",
};

const SIZES = {
  sm: "h-[32px] px-[12px] gap-[6px] text-[12px] leading-[16px]",
  md: "h-[40px] px-[16px] gap-[8px] text-[14px] leading-[20px]",
  lg: "h-[48px] px-[20px] gap-[8px] text-[16px] leading-[24px]",
};

function DsButton({
  variant = "secondary",
  size = "sm",
  leadingIcon,
  trailingIcon,
  className = "",
  type = "button",
  disabled = false,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={[
        "inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium",
        "rounded-[var(--ds-radius-sm)] border-[1px] border-solid shadow-[var(--ds-shadow-xs)]",
        "transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        VARIANTS[variant],
        SIZES[size],
        className,
      ].join(" ")}
      {...rest}
    >
      {leadingIcon && <DsIcon src={leadingIcon} />}
      {children}
      {trailingIcon && <DsIcon src={trailingIcon} />}
    </button>
  );
}

DsButton.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger", "destructive"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  leadingIcon: PropTypes.elementType,
  trailingIcon: PropTypes.elementType,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  disabled: PropTypes.bool,
  children: PropTypes.node,
};

export default DsButton;

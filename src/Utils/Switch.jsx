import React from "react";
import PropTypes from "prop-types";

// Figma Switch (Mobile UI component 17:8580 / control 17:8507): sm / md / lg ×
// on / off × default / hover / focus / disabled. Native checkbox with
// role="switch" underneath; on = brand primary-500 (decision D2), off = ink-200.
const SIZES = {
  sm: { track: "h-[18px] w-[32px]", knob: "h-[14px] w-[14px]", shift: "translate-x-[14px]" },
  md: { track: "h-[22px] w-[40px]", knob: "h-[18px] w-[18px]", shift: "translate-x-[18px]" },
  lg: { track: "h-[28px] w-[48px]", knob: "h-[24px] w-[24px]", shift: "translate-x-[20px]" },
};

function Switch({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  description,
  id,
  className = "",
}) {
  const s = SIZES[size] || SIZES.md;
  return (
    <label
      htmlFor={id}
      className={`group m-0 inline-flex items-center gap-[10px] ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}
    >
      <span className="relative flex shrink-0">
        <input
          id={id}
          type="checkbox"
          role="switch"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="peer absolute inset-0 m-0 h-full w-full cursor-[inherit] opacity-0"
        />
        <span
          aria-hidden
          className={`flex items-center rounded-full p-[2px] transition-colors ${s.track} ${
            checked
              ? "bg-primary-500 group-hover:bg-primary-700"
              : "bg-ink-200 group-hover:bg-[#D5D8DD]"
          } peer-focus-visible:shadow-[0_0_0_2px_#0485F7]`}
        >
          <span
            className={`rounded-full bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)] transition-transform ${s.knob} ${checked ? s.shift : "translate-x-0"}`}
          />
        </span>
      </span>
      {(label || description) && (
        <span className="flex flex-col gap-[2px]">
          {label && (
            <span className="font-gilroy text-b3 font-medium text-ink">{label}</span>
          )}
          {description && (
            <span className="font-gilroy text-c1 text-ink-muted">{description}</span>
          )}
        </span>
      )}
    </label>
  );
}

Switch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  label: PropTypes.node,
  description: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Switch;

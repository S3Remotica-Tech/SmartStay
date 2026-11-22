import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// Figma Checkbox (Mobile UI component 16:6671 / control 16:6564):
// unselected · selected · indeterminate × default / hover / focus / error /
// disabled. Native <input> underneath (keyboard + forms work); the box is drawn.
// Accent is the brand primary-500 (decision D2); focus ring #0485F7.
function Checkbox({
  checked = false,
  indeterminate = false,
  onChange,
  disabled = false,
  error = false,
  label,
  description,
  id,
  className = "",
}) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  const on = checked || indeterminate;
  const box = [
    "relative flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-[4px] border-[1px] border-solid transition-colors",
    on
      ? error
        ? "border-field-error bg-field-error"
        : "border-primary-500 bg-primary-500"
      : error
        ? "border-field-error bg-white"
        : "border-field-border bg-white group-hover:bg-ink-50",
    "peer-focus-visible:shadow-[0_0_0_2px_#0485F7]",
  ].join(" ");

  return (
    <label
      htmlFor={id}
      className={`group m-0 inline-flex items-start gap-[10px] ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}
    >
      <span className="relative mt-[2px] flex">
        <input
          ref={inputRef}
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error || undefined}
          className="peer absolute inset-0 m-0 h-full w-full cursor-[inherit] opacity-0"
        />
        <span className={box} aria-hidden>
          {indeterminate ? (
            <span className="h-[2px] w-[8px] rounded-full bg-white" />
          ) : (
            checked && (
              <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                <path
                  d="M1 4L3.8 6.5L9 1"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )
          )}
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

Checkbox.propTypes = {
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.node,
  description: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Checkbox;

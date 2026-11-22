import React from "react";
import PropTypes from "prop-types";

// Figma Radio (Mobile UI component 17:9013 / control 17:8940): selected or not
// × default / hover / focus / error / disabled. Native radio underneath; brand
// primary-500 fill with a white 6px dot when selected (decision D2).
function Radio({
  checked = false,
  onChange,
  name,
  value,
  disabled = false,
  error = false,
  label,
  description,
  id,
  className = "",
}) {
  const dot = [
    "flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border-[1px] border-solid transition-colors",
    checked
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
          id={id}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          aria-invalid={error || undefined}
          className="peer absolute inset-0 m-0 h-full w-full cursor-[inherit] opacity-0"
        />
        <span className={dot} aria-hidden>
          {checked && <span className="h-[6px] w-[6px] rounded-full bg-white" />}
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

Radio.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  label: PropTypes.node,
  description: PropTypes.node,
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Radio;

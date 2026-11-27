import React from "react";
import PropTypes from "prop-types";
import { fieldGroupClass, fieldInnerInputClass } from "./FieldStyles";

// Money field: the Figma input anatomy (FieldStyles) with a leading "₹".
// Text input with a decimal keypad, so the caller's sanitizer decides what is
// accepted (no browser "e" / "-" / scroll-to-change of type="number").
function AmountInput({
  value,
  onChange,
  placeholder = "0",
  hasError = false,
  disabled = false,
  inputRef,
  className = "",
  "data-testid": testId,
  ariaLabel,
  children,
}) {
  return (
    <div className={`${fieldGroupClass(hasError)} ${className}`}>
      <span
        aria-hidden
        className="shrink-0 font-gilroy text-[14px] font-medium text-[#71717A]"
      >
        ₹
      </span>
      <input
        data-testid={testId}
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-invalid={hasError || undefined}
        onWheel={(e) => e.target.blur()}
        className={fieldInnerInputClass}
      />
      {children}
    </div>
  );
}

AmountInput.propTypes = {
  "data-testid": PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
  inputRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  className: PropTypes.string,
  ariaLabel: PropTypes.string,
  children: PropTypes.node,
};

export default AmountInput;

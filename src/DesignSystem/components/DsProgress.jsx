import React from "react";
import PropTypes from "prop-types";

// 6px progress track, radius full. `tone="strong"` uses the pressed brand
// blue (plan usage card); default is the brand blue.
function DsProgress({ value, tone = "default", label, className = "" }) {
  const pct = Math.max(0, Math.min(100, Number(value) || 0));
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className={`relative h-[6px] w-full overflow-hidden rounded-[var(--ds-radius-full)] bg-[var(--ds-bg-surface-muted)] ${className}`}
    >
      <div
        className={`absolute left-0 top-0 h-[6px] rounded-[var(--ds-radius-full)] transition-[width] duration-500 ${
          tone === "strong" ? "bg-[var(--ds-bg-primary-pressed)]" : "bg-[var(--ds-bg-primary)]"
        }`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

DsProgress.propTypes = {
  value: PropTypes.number.isRequired,
  tone: PropTypes.oneOf(["default", "strong"]),
  label: PropTypes.string,
  className: PropTypes.string,
};

export default DsProgress;

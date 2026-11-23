import React from "react";
import PropTypes from "prop-types";

// Figma Tabs (Mobile UI component 33:13488 / TabsElement 33:13421):
// variant primary = grey pill track with a white selected pill;
// variant secondary = underline, brand primary-500 indicator (decision D2).
// behavior hug (fit content) / fill (equal widths). States: default, hover,
// selected, disabled. Controlled: pass `value` + `onChange(value)`.
function Tabs({ tabs, value, onChange, variant = "primary", fill = false, className = "" }) {
  const primary = variant === "primary";
  return (
    <div
      role="tablist"
      className={`${fill ? "flex w-full" : "inline-flex"} items-center font-gilroy ${
        primary
          ? "gap-[4px] rounded-full bg-ink-100 p-[4px]"
          : "gap-[8px] border-b-[1px] border-solid border-ink-200"
      } ${className}`}
    >
      {tabs.map((tab) => {
        const selected = tab.value === value;
        const base = `${fill ? "flex-1" : ""} flex items-center justify-center gap-[6px] whitespace-nowrap font-gilroy text-b3 font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`;
        const look = primary
          ? `h-[36px] rounded-full px-[16px] ${
              selected
                ? "bg-white text-ink shadow-[0_1px_2px_rgba(16,24,40,0.08)]"
                : "text-ink-500 hover:text-ink"
            } focus-visible:shadow-[0_0_0_2px_#0485F7]`
          : `-mb-[1px] h-[34px] border-b-[2px] border-solid px-[12px] ${
              selected
                ? "border-primary-500 text-ink"
                : "border-transparent text-ink-500 hover:text-ink"
            }`;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={selected}
            disabled={tab.disabled}
            onClick={() => onChange?.(tab.value)}
            className={`${base} ${look}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      label: PropTypes.node.isRequired,
      icon: PropTypes.node,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  variant: PropTypes.oneOf(["primary", "secondary"]),
  fill: PropTypes.bool,
  className: PropTypes.string,
};

export default Tabs;

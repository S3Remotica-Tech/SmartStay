import React from "react";
import PropTypes from "prop-types";

// Figma Tab (18:63), Line type: page-level navigation between views.
// Each item: { key, label, count? }.
function DsTabs({ items, value, onChange, className = "" }) {
  return (
    <div role="tablist" className={`flex items-start gap-[24px] overflow-x-auto pt-[4px] ${className}`}>
      {items.map((item) => {
        const selected = item.key === value;
        return (
          <button
            key={item.key}
            type="button"
            role="tab"
            id={`ds-tab-${item.key}`}
            aria-controls={`ds-tabpanel-${item.key}`}
            aria-selected={selected}
            onClick={() => onChange(item.key)}
            className="flex shrink-0 flex-col items-center"
          >
            <span className="flex items-center gap-[8px] px-[4px] py-[10px]">
              <span
                className={`whitespace-nowrap text-[14px] font-medium leading-[20px] ${
                  selected
                    ? "text-[color:var(--ds-text-primary)]"
                    : "text-[color:var(--ds-text-secondary)] hover:text-[color:var(--ds-text-default)]"
                }`}
              >
                {item.label}
              </span>
              {item.count !== undefined && item.count !== null && (
                <span className="flex items-center justify-center rounded-[var(--ds-radius-full)] bg-[var(--ds-bg-surface-muted)] px-[6px] text-[12px] font-medium leading-[16px] text-[color:var(--ds-text-secondary)]">
                  {item.count}
                </span>
              )}
            </span>
            <span
              className={`h-[2px] w-full rounded-t-[2px] ${
                selected ? "bg-[var(--ds-bg-primary)]" : "bg-transparent"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

DsTabs.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.node.isRequired,
      count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
};

export default DsTabs;

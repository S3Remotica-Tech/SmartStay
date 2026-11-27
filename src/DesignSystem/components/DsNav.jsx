import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";

// Figma Nav item (24:38): sidebar link, 40px high, radius 8,
// active = brand tint. Section labels are the uppercase group headings.

export function DsNavSection({ children }) {
  return (
    <div className="flex shrink-0 pb-[6px] pl-[12px] pt-[16px]">
      <span className="whitespace-nowrap text-[11px] font-semibold uppercase leading-[16px] tracking-[0.66px] text-[color:var(--ds-text-secondary)]">
        {children}
      </span>
    </div>
  );
}

DsNavSection.propTypes = { children: PropTypes.node };

const ITEM_TONE = {
  default:
    "text-[color:var(--ds-text-secondary)] hover:bg-[var(--ds-bg-surface-hover)] hover:text-[color:var(--ds-text-default)]",
  active: "bg-[var(--ds-bg-primary-subtle)] text-[color:var(--ds-text-primary)]",
  danger: "text-[color:var(--ds-text-danger)] hover:bg-[var(--ds-danger-50)]",
};

export function DsNavItem({ icon, label, active = false, tone = "default", onClick }) {
  const toneClass = active ? ITEM_TONE.active : ITEM_TONE[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={`flex h-[40px] w-full shrink-0 items-center gap-[12px] rounded-[var(--ds-radius-sm)] px-[12px] text-left transition-colors duration-150 ${toneClass}`}
    >
      {icon && <DsIcon src={icon} />}
      <span className="min-w-0 flex-1 truncate text-[14px] font-medium leading-[20px]">{label}</span>
    </button>
  );
}

DsNavItem.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  tone: PropTypes.oneOf(["default", "danger"]),
  onClick: PropTypes.func,
};

/** Second-level link shown under an expanded nav item. */
export function DsNavSubItem({ label, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "flex h-[34px] w-full shrink-0 items-center rounded-[var(--ds-radius-sm)] pl-[44px] pr-[12px] text-left",
        "text-[13px] leading-[18px] transition-colors duration-150",
        active
          ? "font-semibold text-[color:var(--ds-text-primary)]"
          : "font-medium text-[color:var(--ds-text-secondary)] hover:bg-[var(--ds-bg-surface-hover)] hover:text-[color:var(--ds-text-default)]",
      ].join(" ")}
    >
      <span className="truncate">{label}</span>
    </button>
  );
}

DsNavSubItem.propTypes = {
  label: PropTypes.node.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

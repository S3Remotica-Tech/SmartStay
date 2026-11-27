import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";
import { DsIcons } from "../icons";

// Figma Profile/Link row (153:2484): opens a rarely used account sub-page.
// The whole row is the click target.
function DsLinkRow({ icon, title, badge, description, onClick, last = false, disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled || undefined}
      className={[
        "group flex w-full items-center gap-[12px] py-[14px] text-left",
        last ? "" : "border-b-[1px] border-solid border-[color:var(--ds-border-default)]",
        "disabled:cursor-not-allowed disabled:opacity-50",
      ].join(" ")}
    >
      <span className="flex size-[36px] shrink-0 items-center justify-center rounded-[var(--ds-radius-sm)] bg-[var(--ds-bg-surface-subtle)] transition-colors duration-150 group-hover:bg-[var(--ds-bg-primary-subtle)]">
        <DsIcon src={icon} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-[2px]">
        <span className="flex flex-wrap items-center gap-[8px]">
          <span className="whitespace-nowrap text-[14px] font-medium leading-[20px] text-[color:var(--ds-text-default)]">
            {title}
          </span>
          {badge}
        </span>
        {description && (
          <span className="text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">{description}</span>
        )}
      </span>
      <DsIcon
        src={DsIcons.chevronRight}
        className="transition-transform duration-150 group-hover:translate-x-[2px]"
      />
    </button>
  );
}

DsLinkRow.propTypes = {
  icon: PropTypes.elementType.isRequired,
  title: PropTypes.node.isRequired,
  badge: PropTypes.node,
  description: PropTypes.node,
  onClick: PropTypes.func,
  last: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default DsLinkRow;

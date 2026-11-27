import React from "react";
import PropTypes from "prop-types";
import DsCopyButton from "./DsCopyButton";

// Figma Description item (89:264): read-only key → value, label 160 left.
// Empty value shows "—"; `muted` greys out placeholder values like "Not added".
// `copyValue`: a copy icon right after the value, shown while the row is
// hovered or focused (always on touch screens). Note: `opacity-[0]`, not
// `opacity-0` — Bootstrap's `.opacity-0` is !important and would keep it hidden.
function DsDescriptionItem({ label, value, muted = false, trailing, copyValue, copyLabel = "Copy" }) {
  const isEmpty = value === undefined || value === null || value === "";
  return (
    <div className="group flex w-full items-center gap-[16px] rounded-[6px] px-[8px] py-[12px] transition-colors duration-150 hover:bg-[var(--ds-bg-surface-subtle)]">
      <dt className="w-[120px] shrink-0 text-[12px] leading-[16px] text-[color:var(--ds-text-secondary)] sm:w-[160px]">
        {label}
      </dt>
      <dd className="m-0 flex min-w-0 flex-1 items-center gap-[8px]">
        <span
          className={`min-w-0 break-words text-[14px] font-medium leading-[20px] ${
            muted || isEmpty ? "text-[color:var(--ds-text-placeholder)]" : "text-[color:var(--ds-text-default)]"
          }`}
        >
          {isEmpty ? "—" : value}
        </span>
        {copyValue && (
          <span className="flex opacity-[0] transition-opacity duration-150 focus-within:opacity-[1] group-hover:opacity-[1] [@media(hover:none)]:opacity-[1]">
            <DsCopyButton value={copyValue} label={copyLabel} />
          </span>
        )}
        {trailing}
      </dd>
    </div>
  );
}

DsDescriptionItem.propTypes = {
  label: PropTypes.node.isRequired,
  value: PropTypes.node,
  muted: PropTypes.bool,
  trailing: PropTypes.node,
  copyValue: PropTypes.string,
  copyLabel: PropTypes.string,
};

export default DsDescriptionItem;

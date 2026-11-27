import React from "react";
import PropTypes from "prop-types";

// Figma Profile/Section header (136:70): card title, optional description
// and optional secondary action. `divider` draws the strong bottom rule.
function DsSectionHeader({ title, description, action, divider = false }) {
  return (
    <div
      className={`flex w-full shrink-0 items-start gap-[16px] ${
        divider ? "border-b-[1px] border-solid border-[color:var(--ds-border-strong)] pb-[16px]" : ""
      } ${description ? "" : "items-center"}`}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <h2 className="text-[16px] font-semibold leading-[23px] text-[color:var(--ds-text-default)]">{title}</h2>
        {description && (
          <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}

DsSectionHeader.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  action: PropTypes.node,
  divider: PropTypes.bool,
};

export default DsSectionHeader;

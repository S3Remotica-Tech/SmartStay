import React from "react";
import PropTypes from "prop-types";
import DsBadge from "./DsBadge";
import DsProgress from "./DsProgress";
import DsTextLink from "./DsTextLink";
import { DsIcons } from "../icons";

// Subscription summary card pinned to the bottom of the settings nav
// (Figma "Plan card", 153:2525).
function DsPlanCard({ planName, status = "Active", usageText, usagePercent, renewText, onManage }) {
  return (
    <div className="flex w-full flex-col gap-[8px] overflow-hidden rounded-[var(--ds-radius-md)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[image:var(--ds-gradient-plan)] p-[16px]">
      <div className="flex w-full items-center gap-[8px]">
        <span className="whitespace-nowrap text-[14px] font-semibold leading-[20px] text-[color:var(--ds-text-default)]">
          {planName}
        </span>
        <span className="flex-1" />
        <DsBadge tone="success" variant="solid" size="xs" dot={DsIcons.dotWhite}>
          {status}
        </DsBadge>
      </div>
      <p className="text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">{usageText}</p>
      <DsProgress value={usagePercent} tone="strong" label="Plan usage" />
      <div className="flex w-full items-center gap-[8px]">
        <span className="whitespace-nowrap text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
          {renewText}
        </span>
        <span className="flex-1" />
        <DsTextLink onClick={onManage}>Manage</DsTextLink>
      </div>
    </div>
  );
}

DsPlanCard.propTypes = {
  planName: PropTypes.string.isRequired,
  status: PropTypes.string,
  usageText: PropTypes.node,
  usagePercent: PropTypes.number.isRequired,
  renewText: PropTypes.node,
  onManage: PropTypes.func,
};

export default DsPlanCard;

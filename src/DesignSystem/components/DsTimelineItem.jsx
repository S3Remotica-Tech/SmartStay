import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";

// Figma Timeline item (90:342): activity / audit feed. Type sets the dot
// colour: Payment green, Stage blue, Note amber, System grey.
// Who + what + when on one line. Hide the connector on the last item.
const DOT_TONE = {
  system: "bg-[var(--ds-bg-surface-muted)]",
  stage: "bg-[var(--ds-bg-info-subtle)]",
  payment: "bg-[var(--ds-success-50)]",
  note: "bg-[var(--ds-warning-50)]",
};

function DsTimelineItem({ icon, tone = "system", who, what, when, last = false }) {
  return (
    <li className="flex w-full items-start gap-[14px]">
      <div className="flex shrink-0 flex-col items-center gap-[4px] self-stretch">
        <span
          className={`flex size-[28px] shrink-0 items-center justify-center overflow-hidden rounded-[var(--ds-radius-full)] border-[3px] border-solid border-[color:var(--ds-bg-surface)] ${DOT_TONE[tone]}`}
        >
          <DsIcon src={icon} className="size-[14px]" />
        </span>
        {!last && <span className="min-h-px w-[2px] flex-1 bg-[var(--ds-border-default)]" />}
      </div>
      <div className="flex min-w-0 flex-1 items-center gap-[6px] pb-[20px] pt-[4px] text-[12px] leading-[16px]">
        <span className="shrink-0 whitespace-nowrap font-medium text-[color:var(--ds-text-default)]">{who}</span>
        <span className="min-w-0 flex-1 truncate text-[color:var(--ds-text-secondary)]">{what}</span>
        <span className="shrink-0 whitespace-nowrap text-[color:var(--ds-text-placeholder)]">{when}</span>
      </div>
    </li>
  );
}

DsTimelineItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  tone: PropTypes.oneOf(["system", "stage", "payment", "note"]),
  who: PropTypes.node.isRequired,
  what: PropTypes.node.isRequired,
  when: PropTypes.node,
  last: PropTypes.bool,
};

export default DsTimelineItem;

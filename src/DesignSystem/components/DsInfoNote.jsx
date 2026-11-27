import React from "react";
import PropTypes from "prop-types";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import DsIcon from "./DsIcon";

/** Blue information banner ("What masters can't do", "Shared properties stay separate"). */
function DsInfoNote({ title, children }) {
  return (
    <aside className="flex w-full items-start gap-[12px] rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-border-focus)] bg-[var(--ds-bg-info-subtle)] px-[16px] py-[14px] text-[color:var(--ds-text-info)]">
      <DsIcon src={InformationCircleIcon} size={20} className="mt-[2px]" />
      <div className="flex min-w-0 flex-col gap-[2px]">
        <p className="text-[14px] font-medium leading-[20px] text-[color:var(--ds-text-default)]">{title}</p>
        <p className="text-[14px] leading-[20px] text-[color:var(--ds-text-secondary)]">{children}</p>
      </div>
    </aside>
  );
}

DsInfoNote.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DsInfoNote;

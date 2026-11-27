import React, { useId } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import DsRoot from "./DsRoot";
import DsIcon from "./DsIcon";
import useDialogFocus from "../hooks/useDialogFocus";

/**
 * Right-hand drawer (Figma 154:3715 / 155:4262): floating 560px panel with a
 * header (title or custom node + actions + close), scrolling body and a
 * footer. Escape / scrim click close it.
 */
function DsDrawer({ title, label, description, headerActions, onClose, children, footer }) {
  const titleId = useId();
  const panelRef = useDialogFocus(onClose);

  return createPortal(
    <DsRoot
      className="fixed inset-0 z-[1060] flex justify-end bg-[color-mix(in_srgb,var(--ds-text-default)_45%,transparent)] sm:p-[12px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={typeof title === "string" ? titleId : undefined}
        aria-label={typeof title === "string" ? undefined : label}
        tabIndex={-1}
        className="flex h-full w-full max-w-[560px] flex-col overflow-hidden bg-[var(--ds-bg-surface)] shadow-[var(--ds-shadow-overlay)] outline-none sm:rounded-[var(--ds-radius-md)]"
      >
        <div className="flex shrink-0 items-start gap-[12px] border-b-[1px] border-solid border-[color:var(--ds-border-default)] px-[24px] py-[20px]">
          <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
            {typeof title === "string" ? (
              <h2 id={titleId} className="text-[18px] font-semibold leading-[26px] text-[color:var(--ds-text-default)]">
                {title}
              </h2>
            ) : (
              title
            )}
            {description && (
              <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">{description}</p>
            )}
          </div>
          {headerActions}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-[32px] shrink-0 items-center justify-center rounded-[var(--ds-radius-sm)] text-[color:var(--ds-text-secondary)] hover:bg-[var(--ds-bg-surface-hover)]"
          >
            <DsIcon src={XMarkIcon} size={16} />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col gap-[20px] overflow-y-auto px-[24px] py-[20px]">{children}</div>
        {footer && (
          <div className="flex shrink-0 items-center gap-[12px] border-t-[1px] border-solid border-[color:var(--ds-border-default)] px-[24px] py-[16px]">
            {footer}
          </div>
        )}
      </div>
    </DsRoot>,
    document.body,
  );
}

DsDrawer.propTypes = {
  title: PropTypes.node.isRequired,
  label: PropTypes.string,
  description: PropTypes.node,
  headerActions: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  footer: PropTypes.node,
};

export default DsDrawer;

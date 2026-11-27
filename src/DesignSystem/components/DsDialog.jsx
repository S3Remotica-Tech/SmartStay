import React, { useId } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import ButtonSpinner from "../../Utils/ButtonSpinner";
import DsButton from "./DsButton";
import DsIcon from "./DsIcon";
import DsRoot from "./DsRoot";
import useDialogFocus from "../hooks/useDialogFocus";

const TONE_TILE = {
  danger: "bg-[var(--ds-danger-50)] text-[color:var(--ds-text-danger)]",
  warning: "bg-[var(--ds-warning-50)] text-[color:var(--ds-warning-800)]",
  primary: "bg-[var(--ds-bg-primary-subtle)] text-[color:var(--ds-text-primary)]",
};

// md = Figma 480px; lg = 560px for confirmations with more to read.
const WIDTH = { md: "max-w-[480px]", lg: "max-w-[560px]" };

/**
 * Modal dialog (Figma "Modal · Deactivate staff" 155:4937): icon tile +
 * title + description + close, optional body, footer. Portal over a scrim;
 * Escape / scrim click close it; focus is trapped inside.
 *
 * Footer: pass `footer` for custom buttons, or `confirmLabel` + `onConfirm`
 * for the standard Cancel / Confirm pair (`danger` = solid red confirm,
 * `busy` = spinner, `confirmDisabled` = can't confirm yet).
 */
function DsDialog({
  title,
  description,
  icon,
  tone = "warning",
  size = "md",
  confirmLabel,
  onConfirm,
  danger = false,
  busy = false,
  confirmDisabled = false,
  footer,
  onClose,
  children,
}) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useDialogFocus(onClose);
  const buttonSize = size === "lg" ? "lg" : "md";

  const actions = footer || (
    <>
      <DsButton size={buttonSize} onClick={onClose} disabled={busy}>
        Cancel
      </DsButton>
      <DsButton
        size={buttonSize}
        variant={danger ? "destructive" : "primary"}
        onClick={onConfirm}
        disabled={busy || confirmDisabled}
      >
        {busy ? <ButtonSpinner label={confirmLabel} /> : confirmLabel}
      </DsButton>
    </>
  );

  return createPortal(
    <DsRoot
      className="fixed inset-0 z-[1060] flex items-center justify-center bg-[color-mix(in_srgb,var(--ds-text-default)_45%,transparent)] p-[16px]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={`flex max-h-[calc(100vh-32px)] w-full ${WIDTH[size]} flex-col overflow-hidden rounded-[var(--ds-radius-md)] bg-[var(--ds-bg-surface)] shadow-[var(--ds-shadow-overlay)] outline-none`}
      >
        <div className="flex shrink-0 items-start gap-[14px] px-[24px] pb-[16px] pt-[24px]">
          {icon && (
            <span className={`flex size-[44px] shrink-0 items-center justify-center rounded-full ${TONE_TILE[tone]}`}>
              <DsIcon src={icon} size={24} />
            </span>
          )}
          <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
            <h2 id={titleId} className="text-[20px] font-semibold leading-[28px] text-[color:var(--ds-text-default)]">
              {title}
            </h2>
            {description && (
              <div id={descriptionId} className="text-[14px] leading-[21px] text-[color:var(--ds-text-secondary)]">
                {description}
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-[32px] shrink-0 items-center justify-center rounded-[var(--ds-radius-sm)] text-[color:var(--ds-text-secondary)] hover:bg-[var(--ds-bg-surface-hover)]"
          >
            <DsIcon src={XMarkIcon} size={20} />
          </button>
        </div>
        {children && (
          <div className="flex min-h-0 flex-col gap-[16px] overflow-y-auto px-[24px] pb-[24px] pt-[4px]">
            {children}
          </div>
        )}
        <div className="flex shrink-0 items-center justify-end gap-[12px] border-t-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface-subtle)] px-[24px] py-[16px]">
          {actions}
        </div>
      </div>
    </DsRoot>,
    document.body,
  );
}

DsDialog.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  icon: PropTypes.elementType,
  tone: PropTypes.oneOf(["danger", "warning", "primary"]),
  size: PropTypes.oneOf(["md", "lg"]),
  confirmLabel: PropTypes.string,
  onConfirm: PropTypes.func,
  danger: PropTypes.bool,
  busy: PropTypes.bool,
  confirmDisabled: PropTypes.bool,
  footer: PropTypes.node,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default DsDialog;

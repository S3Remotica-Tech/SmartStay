import React from "react";
import PropTypes from "prop-types";
import { Warning2, Trash } from "iconsax-react";
import { BTN_DANGER, BTN_PRIMARY, BTN_TERTIARY } from "./ButtonStyles";
import ButtonSpinner from "./ButtonSpinner";

// Standard confirm dialog (anatomy of Smartstay Ver-3 "Unsaved Changes" 3341:77569):
// icon tile, S1-sized title, B1 muted message, outline Cancel + primary/danger
// confirm. Use for delete / discard / irreversible actions.
function ConfirmDialog({
  open,
  title,
  message,
  tone = "danger",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  loading = false,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;
  const danger = tone === "danger";
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-[16px] font-gilroy">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        className="w-full max-w-[440px] rounded-[10px] bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      >
        <div className="flex items-start gap-[12px] px-[20px] pb-[16px] pt-[20px]">
          <div
            className={`flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full ${
              danger ? "bg-[#FFF1F1]" : "bg-[rgba(255,238,226,0.5)]"
            }`}
          >
            {danger ? (
              <Trash size="24" color="#FF383C" />
            ) : (
              <Warning2 size="24" color="#F5A524" />
            )}
          </div>
          <div className="flex min-w-0 flex-col gap-[4px]">
            <h2 id="confirm-title" className="m-0 font-gilroy text-[20px] font-semibold leading-[28px] text-ink">
              {title}
            </h2>
            {message && <p className="m-0 font-gilroy text-b3 text-ink-muted">{message}</p>}
          </div>
        </div>
        <div className="flex items-center justify-end gap-[12px] px-[20px] pb-[20px]">
          <button data-testid="confirm-dialog-cancel-btn" type="button" onClick={onCancel} disabled={loading} className={BTN_TERTIARY}>
            {cancelLabel}
          </button>
          <button data-testid="confirm-dialog-confirm-btn"
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={danger ? BTN_DANGER : BTN_PRIMARY}
          >
            {loading ? <ButtonSpinner label="Please wait..." /> : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

ConfirmDialog.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.node.isRequired,
  message: PropTypes.node,
  tone: PropTypes.oneOf(["danger", "warning"]),
  confirmLabel: PropTypes.node,
  cancelLabel: PropTypes.node,
  loading: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ConfirmDialog;

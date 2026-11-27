import React from "react";
import PropTypes from "prop-types";
import warningIcon from "../../Assets/Images/New_images/tenant-stepper/warning-error.svg";
import closeIcon from "../../Assets/Images/New_images/tenant-stepper/dialog-close.svg";

// "Unsaved Changes" warning shown when the Add Tenant drawer is closed midway
// (Figma 3341:77569). Save Draft keeps the data, Discard closes without saving,
// Keep Editing (or the close icon) returns to the form.
function UnsavedChangesDialog({ isBooking, saving, onSaveDraft, onDiscard, onKeepEditing }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-[16px] font-gilroy">
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="unsaved-title"
        aria-describedby="unsaved-text"
        className="relative w-full max-w-[476px] overflow-hidden rounded-[10px] border-[0.8px] border-solid border-[rgba(0,0,0,0.1)] bg-white shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]"
      >
        <button data-testid="unsaved-changes-dialog-close-btn"
          type="button"
          aria-label="Close"
          onClick={onKeepEditing}
          className="absolute right-[18px] top-[18px] flex h-[19px] w-[19px] items-center justify-center opacity-70 hover:opacity-100"
        >
          <img src={closeIcon} alt="" />
        </button>

        <div className="flex items-start gap-[12px] px-[20px] pb-[16px] pt-[20px] pr-[24px]">
          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-[30px] bg-[rgba(255,238,226,0.5)]">
            <img src={warningIcon} alt="" />
          </div>
          <div className="flex min-w-0 flex-col gap-[4px]">
            <h2
              id="unsaved-title"
              className="m-0 font-gilroy text-[22px] font-medium leading-[33px] text-[#1F2633]"
            >
              Unsaved Changes
            </h2>
            <p
              id="unsaved-text"
              className="m-0 font-gilroy text-[16px] leading-[19.5px] text-[#64748B]"
            >
              {isBooking
                ? "Tenant booking details are not completed yet ?"
                : "Tenant check-in details are not completed yet ?"}
            </p>
          </div>
        </div>

        <div className="flex h-[74px] items-center justify-between gap-[12px] px-[20px]">
          <button data-testid="unsaved-changes-dialog-save-draft-btn"
            type="button"
            disabled={saving}
            onClick={onSaveDraft}
            className="flex h-[36px] w-[150px] items-center justify-center gap-[8px] rounded-[8px] bg-[#EBEFFF] font-gilroy text-[16px] font-medium text-[#1E45E1] hover:bg-[#DDE5FF] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
                Saving...
              </>
            ) : (
              "Save Draft"
            )}
          </button>
          <div className="flex items-center gap-[12px]">
            <button data-testid="unsaved-changes-dialog-discard-btn"
              type="button"
              disabled={saving}
              onClick={onDiscard}
              className="flex h-[36px] w-[96px] items-center justify-center rounded-[6px] border-[0.8px] border-solid border-[#D1D5DC] bg-white font-gilroy text-[16px] font-medium text-[#0A0A0A] hover:bg-[#F9FAFB] disabled:opacity-60"
            >
              Discard
            </button>
            <button data-testid="unsaved-changes-dialog-keep-editing-btn"
              type="button"
              onClick={onKeepEditing}
              className="flex h-[36px] w-[123px] items-center justify-center rounded-[6px] bg-[#1E45E1] font-gilroy text-[16px] font-medium text-white outline-none hover:bg-[#1638B5] focus-visible:shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_#0485F7]"
            >
              Keep Editing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

UnsavedChangesDialog.propTypes = {
  isBooking: PropTypes.bool,
  saving: PropTypes.bool,
  onSaveDraft: PropTypes.func.isRequired,
  onDiscard: PropTypes.func.isRequired,
  onKeepEditing: PropTypes.func.isRequired,
};

export default UnsavedChangesDialog;

// Image pickers for onboarding.
// - LogoPicker: Figma "Image picker / Compact" 7252:256918
//   (Empty · Hover/drag · Uploading · Filled · Error · Disabled).
// - PhotoSlot / AddPhotoSlot: New design System "Document slot" 37:744 states
//   (Empty · Hover/drag · Uploading · Uploaded [View/Replace/Delete] · Error ·
//   Disabled) on the Media step tile size (Figma 5671:178705).
// "Uploading" = the local compression step (same as Add Paying Guest); files
// are sent to the API only on Finish Setup.
import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "react-bootstrap";
import { formatBytes } from "./onboardingUtils";
import { MAX_IMAGE_SIZE_MB } from "./onboardingConfig";
import ImagePlaceholder from "../../Assets/Images/Onboarding/image-placeholder.svg";
import ImagePlaceholderHover from "../../Assets/Images/Onboarding/image-placeholder-hover.svg";
import ImagePlaceholderDisabled from "../../Assets/Images/Onboarding/image-placeholder-disabled.svg";
import ErrorPlaceholder from "../../Assets/Images/Onboarding/error-placeholder.svg";
import UploadTray from "../../Assets/Images/Onboarding/upload-tray.svg";
import UploadTrayDisabled from "../../Assets/Images/Onboarding/upload-tray-disabled.svg";
import Spinner from "../../Assets/Images/Onboarding/spinner.svg";
import CheckIcon from "../../Assets/Images/Onboarding/check.svg";
import EyeIcon from "../../Assets/Images/Onboarding/eye.svg";
import ReplaceIcon from "../../Assets/Images/Onboarding/replace.svg";
import TrashIcon from "../../Assets/Images/Onboarding/trash.svg";
import Replace16 from "../../Assets/Images/Onboarding/replace-16.svg";
import Trash16 from "../../Assets/Images/Onboarding/trash-16.svg";
import ErrorCircle from "../../Assets/Images/Onboarding/error-circle.svg";
import AddCircle from "../../Assets/Images/Onboarding/add-circle.svg";

const ACCEPT = "image/png,image/jpeg";
const SECONDARY_SM =
  "flex h-[32px] items-center justify-center gap-[6px] whitespace-nowrap rounded-[8px] border-[1px] border-solid px-[12px] font-gilroy text-[12px] font-medium leading-[16px] transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7]";

/** Hidden file input + drag-and-drop state shared by both pickers. */
function useFileDrop({ disabled, multiple, onFiles }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const open = () => {
    if (!disabled) inputRef.current?.click();
  };
  const dropProps = {
    onDragOver: (e) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(true);
    },
    onDragLeave: () => setDragging(false),
    onDrop: (e) => {
      if (disabled) return;
      e.preventDefault();
      setDragging(false);
      const files = Array.from(e.dataTransfer?.files || []);
      if (files.length) onFiles(multiple ? files : files.slice(0, 1));
    },
  };
  const input = (
    <input data-testid="image-picker-file"
      ref={inputRef}
      type="file"
      accept={ACCEPT}
      multiple={multiple}
      tabIndex={-1}
      aria-hidden
      className="hidden"
      onChange={(e) => {
        const files = Array.from(e.target.files || []);
        e.target.value = "";
        if (files.length) onFiles(files);
      }}
    />
  );
  return { open, dragging, dropProps, input };
}

/* ------------------------------------------------------------ LogoPicker */

export function LogoPicker({ id, label, helper, value, onSelect, onCancel, onRemove, disabled }) {
  const { open, dragging, dropProps, input } = useFileDrop({
    disabled,
    multiple: false,
    onFiles: (files) => onSelect(files[0]),
  });
  // empty | hover (drag over) | processing | ready | error | disabled
  const base = disabled ? "disabled" : value?.status || "empty";
  const state = dragging && ["empty", "ready", "error"].includes(base) ? "hover" : base;
  const progress = Math.round(value?.progress || 0);

  const slotClass = {
    empty: "border-dashed border-[#D1D5DB] bg-[#F9FAFB] hover:border-primary-500 hover:bg-[#EEF2FF]",
    hover: "border-dashed border-primary-500 bg-[#EEF2FF]",
    processing: "border-solid border-[#E5E7EB] bg-[#F9FAFB]",
    ready: "border-solid border-[#E5E7EB] bg-white",
    error: "border-dashed border-[#EF4444] bg-[#FEF2F2]",
    disabled: "border-dashed border-[#E5E7EB] bg-[#F3F4F6]",
  }[state];

  return (
    <div className="flex w-full flex-wrap items-center gap-[16px] sm:flex-nowrap" {...dropProps}>
      {input}
      <button data-testid="image-picker-open-btn"
        type="button"
        id={id}
        onClick={open}
        disabled={disabled || state === "processing"}
        aria-label={value?.status === "ready" ? `Replace ${label}` : `Upload ${label}`}
        aria-describedby={`${id}-status`}
        className={`group relative flex h-[90px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-[12px] border-[1px] p-0 transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7] disabled:cursor-not-allowed ${slotClass}`}
      >
        {state === "ready" && (
          <img src={value.previewUrl} alt="" className="h-full w-full object-cover" />
        )}
        {state === "processing" && (
          <img src={Spinner} alt="" width="28" height="28" className="animate-spin" />
        )}
        {state === "error" && <img src={ErrorPlaceholder} alt="" width="32" height="32" />}
        {["empty", "hover", "disabled"].includes(state) && (
          <img
            src={
              state === "disabled"
                ? ImagePlaceholderDisabled
                : state === "hover"
                  ? ImagePlaceholderHover
                  : ImagePlaceholder
            }
            alt=""
            width="40"
            height="40"
          />
        )}
      </button>

      <div
        id={`${id}-status`}
        aria-live="polite"
        className={`flex min-w-0 flex-1 flex-col ${state === "processing" ? "gap-[6px]" : "gap-[2px]"}`}
      >
        <p
          className={`mb-0 truncate font-gilroy text-[18px] font-semibold leading-[26px] ${state === "disabled" ? "text-[#9CA3AF]" : "text-[#111827]"}`}
        >
          {state === "ready" ? value.name : label}
        </p>
        {state === "ready" && (
          <p className="mb-0 font-gilroy text-[12px] leading-[16px] text-[#4B5563]">
            {formatBytes(value.size)}
            {value.width ? ` · ${value.width} × ${value.height}` : ""}
          </p>
        )}
        {state === "processing" && (
          <>
            <p className="mb-0 font-gilroy text-[12px] leading-[16px] text-[#4B5563]">
              Uploading… {progress}%
            </p>
            <div
              className="h-[4px] w-full max-w-[220px] overflow-hidden rounded-[2px] bg-[#F3F4F6]"
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`${label} upload progress`}
            >
              <div
                className="h-full rounded-[2px] bg-primary-500 transition-[width]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
        {state === "error" && (
          <p className="mb-0 font-gilroy text-[12px] leading-[16px] text-[#DC2626]" role="alert">
            {value.error}
          </p>
        )}
        {["empty", "hover", "disabled"].includes(state) && (
          <p
            className={`mb-0 font-gilroy text-[12px] leading-[16px] ${state === "disabled" ? "text-[#9CA3AF]" : "text-[#4B5563]"}`}
          >
            {helper}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-[8px]">
        {state === "processing" && (
          <button data-testid="image-picker-cancel-btn"
            type="button"
            onClick={onCancel}
            className={`${SECONDARY_SM} border-transparent bg-transparent text-[#111827] hover:bg-ink-100`}
          >
            Cancel
          </button>
        )}
        {state === "ready" && (
          <>
            <button data-testid="image-picker-replace-btn"
              type="button"
              onClick={open}
              className={`${SECONDARY_SM} border-[#D1D5DB] bg-white text-[#111827] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:bg-[#F3F4F6]`}
            >
              Replace
            </button>
            <button data-testid="image-picker-remove-btn"
              type="button"
              onClick={onRemove}
              className={`${SECONDARY_SM} border-transparent bg-transparent text-[#DC2626] hover:bg-[#FEF2F2]`}
            >
              Remove
            </button>
          </>
        )}
        {["empty", "hover", "error", "disabled"].includes(state) && (
          <button data-testid="image-picker-open-btn-2"
            type="button"
            onClick={open}
            disabled={state === "disabled"}
            className={`${SECONDARY_SM} ${
              state === "disabled"
                ? "border-[#E5E7EB] bg-[#F3F4F6] text-[#9CA3AF]"
                : "border-[#D1D5DB] bg-white text-[#111827] shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] hover:border-[#9CA3AF] hover:bg-[#F3F4F6]"
            }`}
          >
            <img
              src={state === "disabled" ? UploadTrayDisabled : UploadTray}
              alt=""
              width="16"
              height="16"
            />
            {state === "error" ? "Try again" : "Upload"}
          </button>
        )}
      </div>
    </div>
  );
}

LogoPicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helper: PropTypes.node,
  value: PropTypes.object,
  onSelect: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

/* ------------------------------------------------------------- PhotoSlot */

const TILE = "relative h-[198px] w-full overflow-hidden rounded-[13px]";
const TOOL_BTN =
  "flex h-[26px] w-[26px] items-center justify-center rounded-[6.3px] border-[0.8px] border-solid border-[#E5E7EB] bg-white p-0 shadow-[0px_0.8px_1.6px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7]";
const TOOL_BTN_LG =
  "flex h-[32px] w-[32px] items-center justify-center rounded-[8px] border-[1px] border-solid border-[#D1D5DB] bg-white p-0 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] transition-colors hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7]";

/** One picked property photo. */
export function PhotoSlot({ index, value, onReplace, onRemove, disabled }) {
  const [viewing, setViewing] = useState(false);
  const { open, dragging, dropProps, input } = useFileDrop({
    disabled,
    multiple: false,
    onFiles: (files) => onReplace(files[0]),
  });
  const name = `Photo ${index + 1}`;
  const progress = Math.round(value.progress || 0);

  return (
    <div className="flex min-w-0 flex-col gap-[8px]" {...dropProps}>
      {input}
      <div
        className={`${TILE} ${
          value.status === "error"
            ? "border-[2px] border-solid border-[#EF4444] bg-white"
            : dragging
              ? "border-[1.5px] border-dashed border-primary-500 bg-[#EEF2FF]"
              : "border-[1px] border-solid border-[#E5E7EB] bg-[#F9FAFB]"
        } ${disabled ? "opacity-50" : ""}`}
      >
        {value.previewUrl && (
          <img
            src={value.previewUrl}
            alt={`${name}: ${value.name}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        {value.status === "processing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[8px] bg-[rgba(255,255,255,0.8)]">
            <img src={Spinner} alt="" width="28" height="28" className="animate-spin" />
            <p className="mb-0 font-gilroy text-[12px] font-medium leading-[16px] text-[#111827]">
              Uploading… {progress}%
            </p>
          </div>
        )}

        {value.status === "error" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-[6px] bg-[rgba(255,255,255,0.8)] px-[12px] text-center">
            <img src={ErrorCircle} alt="" width="28" height="28" />
            <p className="mb-0 font-gilroy text-[12px] font-medium leading-[16px] text-[#DC2626]">
              {value.error}
            </p>
          </div>
        )}

        {value.status === "ready" && (
          <span className="absolute left-[9px] top-[9px] flex h-[24px] w-[24px] items-center justify-center rounded-full border-[2px] border-solid border-white bg-[#16A34A]">
            <img src={CheckIcon} alt="" width="14" height="14" />
          </span>
        )}

        {value.status === "ready" && (
          <div className="absolute right-[9px] top-[9px] flex items-start gap-[4.7px]">
            <button data-testid="image-picker-view-btn" type="button" className={TOOL_BTN} onClick={() => setViewing(true)} aria-label={`View ${name}`} title="View">
              <img src={EyeIcon} alt="" width="12.6" height="12.6" />
            </button>
            <button data-testid="image-picker-replace-btn-2" type="button" className={TOOL_BTN} onClick={open} disabled={disabled} aria-label={`Replace ${name}`} title="Replace">
              <img src={ReplaceIcon} alt="" width="12.6" height="12.6" />
            </button>
            <button data-testid="image-picker-delete-btn" type="button" className={`${TOOL_BTN} hover:!bg-[#FEF2F2]`} onClick={onRemove} disabled={disabled} aria-label={`Delete ${name}`} title="Delete">
              <img src={TrashIcon} alt="" width="12.6" height="12.6" />
            </button>
          </div>
        )}

        {value.status === "error" && (
          <div className="absolute right-[8px] top-[8px] flex items-start gap-[6px]">
            <button data-testid="image-picker-replace-btn-3" type="button" className={TOOL_BTN_LG} onClick={open} disabled={disabled} aria-label={`Replace ${name}`} title="Replace">
              <img src={Replace16} alt="" width="16" height="16" />
            </button>
            <button data-testid="image-picker-delete-btn-2" type="button" className={`${TOOL_BTN_LG} hover:!bg-[#FEF2F2]`} onClick={onRemove} disabled={disabled} aria-label={`Delete ${name}`} title="Delete">
              <img src={Trash16} alt="" width="16" height="16" />
            </button>
          </div>
        )}
      </div>

      <p
        className={`mb-0 truncate font-gilroy text-[12px] leading-[16px] ${value.status === "error" ? "text-[#DC2626]" : "text-[#4B5563]"}`}
      >
        {value.status === "error"
          ? "Replace this photo or remove it."
          : `${value.name}${value.status === "ready" ? ` · ${formatBytes(value.size)}` : ""}`}
      </p>

      <Modal data-testid="image-picker-modal" show={viewing} onHide={() => setViewing(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="font-gilroy text-[16px] font-semibold">{value.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-[12px]">
          {value.previewUrl && (
            <img src={value.previewUrl} alt={`${name} preview`} className="max-h-[70vh] w-full rounded-[8px] object-contain" />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

PhotoSlot.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    status: PropTypes.oneOf(["processing", "ready", "error"]),
    progress: PropTypes.number,
    previewUrl: PropTypes.string,
    error: PropTypes.string,
  }).isRequired,
  onReplace: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

/** Empty "Add image" tile (Figma 5671:178722 content, Document slot states). */
export function AddPhotoSlot({ id, onFiles, disabled, remaining, describedBy }) {
  const { open, dragging, dropProps, input } = useFileDrop({
    disabled,
    multiple: true,
    onFiles,
  });
  return (
    <div className="flex min-w-0 flex-col gap-[8px]" {...dropProps}>
      {input}
      <button data-testid="image-picker-add-images-select-up-btn"
        id={id}
        type="button"
        onClick={open}
        disabled={disabled}
        aria-describedby={describedBy}
        className={`${TILE} flex flex-col items-center justify-center gap-[10px] p-0 transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7] disabled:cursor-not-allowed ${
          disabled
            ? "border-[1px] border-dashed border-[#E5E7EB] bg-[#F3F4F6]"
            : dragging
              ? "border-[1.5px] border-dashed border-primary-500 bg-[#EEF2FF]"
              : "border-[1.5px] border-dashed border-primary-500 bg-[#FAFCFF] hover:bg-[#EEF2FF]"
        }`}
      >
        <img src={AddCircle} alt="" width="30" height="30" className={disabled ? "opacity-40" : ""} />
        <span
          className={`font-gilroy text-[18px] font-medium leading-[normal] ${disabled ? "text-[#9CA3AF]" : "text-primary-500"}`}
        >
          Add images
        </span>
        <span className="px-[8px] text-center font-gilroy text-[12px] leading-[1.3] text-[#4B4B4B]">
          Select up to {remaining} at once
          <br />
          Max size {MAX_IMAGE_SIZE_MB} MB each · JPG, PNG
        </span>
      </button>
      <p className="mb-0 font-gilroy text-[12px] leading-[16px] text-[#4B5563]">
        or drag &amp; drop · {remaining} left
      </p>
    </div>
  );
}

AddPhotoSlot.propTypes = {
  id: PropTypes.string.isRequired,
  onFiles: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  remaining: PropTypes.number.isRequired,
  describedBy: PropTypes.string,
};

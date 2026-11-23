// Helpers for the Add Tenant wizard: draft save / resume, steps and amount validation.

// The backend draft APIs may not accept `addressLater` / `currentStep` yet.
// They are only sent when VITE_TENANT_DRAFT_EXTRA_FIELDS=true, so existing
// environments keep sending the exact payload they send today.
export const DRAFT_EXTRA_FIELDS_ENABLED =
  import.meta.env.VITE_TENANT_DRAFT_EXTRA_FIELDS === "true";

// Adds the optional draft fields to a draft `request` body (flag-guarded).
export function withDraftExtras(request, { addressLater, currentStep }) {
  if (!DRAFT_EXTRA_FIELDS_ENABLED) return request;
  return { ...request, addressLater: !!addressLater, currentStep };
}

// The step a saved draft should reopen on.
// Uses `currentStep` when the backend returns it, otherwise the first step
// whose required data is still missing (Step 1 needs a name and mobile number).
export function getResumeStep(draft) {
  const saved = Number(draft?.currentStep);
  if (saved >= 1 && saved <= 4) return saved;
  const hasPersonalDetails = !!(draft?.firstName && draft?.mobileNo);
  return hasPersonalDetails ? 2 : 1;
}

// Wizard step ids: 1 basic, 2 on-board, 3 documents (check-in only), 4 preview.
export const STEP_BASIC = 1;
export const STEP_ONBOARD = 2;
export const STEP_DOCUMENTS = 3;
export const STEP_PREVIEW = 4;

// Steps shown in the sidebar stepper. Booking skips Documents.
export function getTenantSteps(isBookingFlow, bookingOnly) {
  const steps = [
    { id: STEP_BASIC, title: "Basic Details", icon: "basic" },
    {
      id: STEP_ONBOARD,
      title: bookingOnly ? "Booking" : "On-board Process",
      icon: "onboard",
    },
  ];
  if (!isBookingFlow) {
    steps.push({
      id: STEP_DOCUMENTS,
      title: "Documents & Job Details",
      icon: "docs",
    });
  }
  steps.push({ id: STEP_PREVIEW, title: "Preview Details", icon: "docs" });
  return steps;
}

// The step that follows `step` in the given flow.
export function getNextStep(step, isBookingFlow) {
  if (step === STEP_BASIC) return STEP_ONBOARD;
  if (step === STEP_ONBOARD) return isBookingFlow ? STEP_PREVIEW : STEP_DOCUMENTS;
  return STEP_PREVIEW;
}

// The step that precedes `step` in the given flow.
export function getPreviousStep(step, isBookingFlow) {
  if (step === STEP_PREVIEW) return isBookingFlow ? STEP_ONBOARD : STEP_DOCUMENTS;
  if (step === STEP_DOCUMENTS) return STEP_ONBOARD;
  return STEP_BASIC;
}

// ---- Amount validation (rent, booking amount) -------------------------------

// Highest rent / booking amount accepted by the form. Not a backend rule: set
// VITE_MAX_RENT_AMOUNT to change it per environment.
export const MAX_RENT_AMOUNT =
  Number(import.meta.env.VITE_MAX_RENT_AMOUNT) > 0
    ? Number(import.meta.env.VITE_MAX_RENT_AMOUNT)
    : 100000;

// Highest advance / security deposit and non-refundable charge accepted. A
// deposit is usually a few months of rent, so it gets its own, higher limit
// (VITE_MAX_DEPOSIT_AMOUNT to change it per environment).
export const MAX_DEPOSIT_AMOUNT =
  Number(import.meta.env.VITE_MAX_DEPOSIT_AMOUNT) > 0
    ? Number(import.meta.env.VITE_MAX_DEPOSIT_AMOUNT)
    : 300000;

const formatInr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// Keeps only what a money field may contain: digits and at most 2 decimals, no
// leading zeros ("007" -> "7", "0.5" stays). Returns null for input to reject.
export function sanitizeAmountInput(raw) {
  const value = String(raw ?? "");
  if (value === "") return "";
  if (!/^\d*\.?\d{0,2}$/.test(value)) return null;
  // Pasted / typed values far beyond any realistic amount are not accepted.
  if (value.split(".")[0].length > 9) return null;
  return value.replace(/^0+(?=\d)/, "");
}

// Inline message for an amount, or "" when it is valid. `requiredMessage` keeps
// each field's existing "Please Enter ..." wording.
export function validateAmount(value, { requiredMessage, label, max = MAX_RENT_AMOUNT }) {
  const text = String(value ?? "").trim();
  if (text === "") return requiredMessage;
  const amount = Number(text);
  if (!Number.isFinite(amount)) return `Enter a valid ${label}`;
  if (amount <= 0) return `${label} must be greater than 0`;
  // Worded as a check, not a hard "wrong": staff usually mistyped an extra zero.
  if (amount > max) {
    return `This amount seems higher than usual. Please double-check it (limit ${formatInr(max)}).`;
  }
  return "";
}

// "2025-07-31" style / Date / dayjs -> "DD/MM/YYYY" for display.
export function formatDisplayDate(date) {
  if (!date) return "";
  const d = new Date(typeof date?.toDate === "function" ? date.toDate() : date);
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}/${d.getFullYear()}`;
}

export const formatMoney = (value) =>
  value === "" || value === null || value === undefined || Number.isNaN(Number(value))
    ? "-"
    : formatInr(Number(value));

// ---- Drawer chrome (Figma "Add New Tenant" drawer, 4797:127445) -------------

// Footer row: sticks to the bottom of the scrolling form, so it never scrolls
// away and never covers the last field (it takes its own space in the flow).
export const TENANT_FOOTER_CLASS =
  "sticky bottom-0 z-20 mt-[24px] flex items-center justify-between gap-[12px] bg-white pt-[16px] pb-[18px]";

// Footer buttons come from the shared design-system button styles.
export {
  BTN_PRIMARY as TENANT_BTN_PRIMARY,
  BTN_SECONDARY as TENANT_BTN_SECONDARY,
  BTN_TERTIARY as TENANT_BTN_TERTIARY,
} from "../../Utils/ButtonStyles";

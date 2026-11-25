// Shared helpers for amenity pricing plans (Add / Edit form + Settings list).
//
// BACKEND DEPENDENCY: the existing amenity API only knows
//   { amenityName, amount, proRate }.
// `description`, `plans[]` and `isActive` below are the *proposed* fields from
// the Figma designs. They are isolated in this file so that aligning them with
// the real API contract is a one-file change. See docs/Amenity-Design-System.md.

export const BILLING_UNITS = [
  { value: "MONTHLY", label: "Monthly", suffix: "month" },
  { value: "WEEKLY", label: "Weekly", suffix: "week" },
  { value: "ONE_TIME", label: "One-time", suffix: "one-time" },
];

export const DEFAULT_BILLING_UNIT = BILLING_UNITS[0].value;

// Label used when an amenity created before plans existed is shown / edited.
export const LEGACY_PLAN_NAME = "Base price";

let rowCounter = 0;

export const createEmptyPlan = () => ({
  key: `plan-row-${(rowCounter += 1)}`,
  planId: undefined,
  planName: "",
  amount: "",
  billingUnit: DEFAULT_BILLING_UNIT,
});

const isBlankPlan = (plan) => !plan.planName.trim() && plan.amount === "";

/**
 * Plans of an amenity as the API returns them. Amenities saved before plans
 * existed only carry `amenityAmount`; they are presented as one monthly
 * "Base price" plan (display only until the admin saves).
 */
export const getAmenityPlans = (amenity) => {
  if (Array.isArray(amenity?.plans) && amenity.plans.length > 0) {
    return amenity.plans.map((plan) => ({
      planId: plan.planId,
      planName: plan.planName ?? "",
      amount: plan.amount ?? "",
      billingUnit: plan.billingUnit || DEFAULT_BILLING_UNIT,
    }));
  }
  if (Number(amenity?.amenityAmount) > 0) {
    return [
      {
        planId: undefined,
        planName: LEGACY_PLAN_NAME,
        amount: amenity.amenityAmount,
        billingUnit: DEFAULT_BILLING_UNIT,
      },
    ];
  }
  return [];
};

/** Rows for the form: existing plans (with a stable key) or one empty row. */
export const toFormPlans = (amenity) => {
  const plans = getAmenityPlans(amenity).map((plan) => ({
    ...createEmptyPlan(),
    ...plan,
    amount: String(plan.amount ?? ""),
  }));
  return plans.length > 0 ? plans : [createEmptyPlan()];
};

export const isAmenityActive = (amenity) => amenity?.isActive !== false;

export const formatPlanPrice = (plan) => {
  const unit = BILLING_UNITS.find((u) => u.value === plan.billingUnit);
  const price = Number(plan.amount).toLocaleString("en-IN");
  return `₹${price}/${unit ? unit.suffix : "month"}`;
};

/**
 * Validates plan rows. Completely empty rows are ignored (plans are optional).
 * Returns { errors: { [rowKey]: { planName?, amount? } }, isValid }.
 */
export const validatePlans = (plans) => {
  const errors = {};
  const seenNames = new Set();

  plans.forEach((plan) => {
    if (isBlankPlan(plan)) return;
    const rowErrors = {};
    const name = plan.planName.trim();

    if (!name) {
      rowErrors.planName = "Enter plan name";
    } else if (seenNames.has(name.toLowerCase())) {
      rowErrors.planName = "Plan name already used";
    } else {
      seenNames.add(name.toLowerCase());
    }

    if (plan.amount === "") {
      rowErrors.amount = "Enter price";
    } else if (Number(plan.amount) <= 0) {
      rowErrors.amount = "Must be above 0";
    }

    if (Object.keys(rowErrors).length) errors[plan.key] = rowErrors;
  });

  return { errors, isValid: Object.keys(errors).length === 0 };
};

/**
 * Request body shared by add / update / duplicate / pro-rate toggle, so a
 * partial update (e.g. the list toggle) never drops description or plans.
 * `amount` keeps the legacy contract: the first plan's price (or the existing
 * amount when no plans are configured).
 */
export const buildAmenityPayload = ({
  amenityName,
  description,
  plans = [],
  proRate,
  legacyAmount = 0,
}) => {
  const cleanPlans = plans
    .filter((plan) => !isBlankPlan(plan))
    .map((plan) => ({
      ...(plan.planId ? { planId: plan.planId } : {}),
      planName: plan.planName.trim(),
      amount: Number(plan.amount),
      billingUnit: plan.billingUnit,
    }));

  return {
    amenityName,
    amount: cleanPlans.length ? cleanPlans[0].amount : legacyAmount,
    proRate,
    ...(description !== undefined ? { description: description.trim() } : {}),
    plans: cleanPlans,
  };
};

/** Snapshot used by the Edit form to detect "No Changes Detected". */
export const getFormSnapshot = ({ amenity, description, plans, isChecked }) =>
  JSON.stringify({
    amenity: amenity.trim(),
    description: (description || "").trim(),
    isChecked: !!isChecked,
    plans: plans
      .filter((plan) => !isBlankPlan(plan))
      .map((plan) => [
        plan.planName.trim(),
        Number(plan.amount),
        plan.billingUnit,
      ]),
  });

/* ---------------------------------------------------------------------------
 * Field styling — Figma "Input anatomy" states with the Gilroy brand font.
 * Tokens: radius 12, border #E5E7EB, placeholder #717182, hover bg #F9F9F9,
 * focus ring #0485F7 (2px), error border #FF383C, disabled 50% opacity.
 * `border-[1px]` is used on purpose: Bootstrap's global `.border` wins over
 * Tailwind's bare `border` class in this app.
 * ------------------------------------------------------------------------- */
const FIELD_BASE =
  "w-full font-gilroy rounded-[12px] border-[1px] outline-none transition-shadow " +
  "placeholder:text-[#717182] focus:shadow-[0_0_0_2px_#0485F7] " +
  "disabled:opacity-50 disabled:cursor-not-allowed";

/** variant "primary": white, bordered (form fields). "plan": grey filled row field. */
export const fieldClass = (variant = "primary", hasError = false) => {
  const look =
    variant === "plan"
      ? "h-[36px] text-[12px] bg-[#F3F3F5] hover:bg-[#EBEBED] focus:bg-white"
      : "h-[40px] text-[13px] bg-white hover:bg-[#F9F9F9] focus:bg-white";
  const border = hasError
    ? "border-[#FF383C]"
    : variant === "plan"
      ? "border-transparent"
      : "border-[#E5E7EB]";
  return `${FIELD_BASE} ${look} ${border} px-[13px] text-[#18181B]`;
};

export const labelClass =
  "block font-gilroy text-[14px] font-medium leading-[20px] text-[#364153]";

/** react-select styles for the 36px billing-unit dropdown (Figma "Select"). */
export const planSelectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "36px",
    height: "36px",
    borderRadius: "12px",
    border: "1px solid transparent",
    backgroundColor: state.isFocused ? "#FFFFFF" : "#F3F3F5",
    boxShadow: state.isFocused ? "0 0 0 2px #0485F7" : "none",
    fontFamily: "Gilroy, sans-serif",
    fontSize: "12px",
    cursor: "pointer",
    "&:hover": { backgroundColor: state.isFocused ? "#FFFFFF" : "#EBEBED" },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 13px" }),
  singleValue: (base) => ({ ...base, color: "#0A0A0A" }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorsContainer: (base) => ({ ...base, height: "36px" }),
  dropdownIndicator: (base) => ({ ...base, padding: "0 10px", color: "#18181B" }),
  menu: (base) => ({
    ...base,
    marginTop: "4px",
    borderRadius: "12px",
    border: "1px solid #E5E7EB",
    overflow: "hidden",
    zIndex: 10000,
    boxShadow:
      "0 14px 28px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.06)",
  }),
  menuList: (base) => ({ ...base, padding: "4px" }),
  option: (base, state) => ({
    ...base,
    borderRadius: "8px",
    fontFamily: "Gilroy, sans-serif",
    fontSize: "13px",
    cursor: "pointer",
    color: "#18181B",
    backgroundColor: state.isSelected
      ? "#EEF1FD"
      : state.isFocused
        ? "#F3F3F5"
        : "#FFFFFF",
  }),
};

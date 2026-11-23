import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { AddCircle, Trash } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  BILLING_UNITS,
  createEmptyPlan,
  fieldClass,
  planSelectStyles,
} from "./amenityPlanUtils";

const selectStyles = {
  ...planSelectStyles,
  // The drawer scrolls, so the menu is portalled to <body> above its z-index.
  menuPortal: (base) => ({ ...base, zIndex: 10001 }),
};

const columnLabel =
  "font-gilroy text-[11px] font-medium leading-[16px] text-[#99A1AF]";

/**
 * Repeating "Pricing plans" rows used by the Add / Edit Amenity drawer.
 * Controlled: the parent owns `plans` ([{ key, planName, amount, billingUnit }])
 * and the per-row `errors` ({ [key]: { planName?, amount? } }).
 */
function AmenityPlanRows({ plans, errors, onChange }) {
  const updateRow = (key, patch) =>
    onChange(plans.map((plan) => (plan.key === key ? { ...plan, ...patch } : plan)));

  const removeRow = (key) => {
    const remaining = plans.filter((plan) => plan.key !== key);
    // Plans are optional, so the last row is cleared instead of removed.
    onChange(remaining.length ? remaining : [createEmptyPlan()]);
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="hidden sm:flex items-center gap-[8px]">
        <span className={`${columnLabel} flex-1 min-w-0`}>Plan Name</span>
        <span className={`${columnLabel} w-[112px] shrink-0`}>Price</span>
        <span className={`${columnLabel} w-[128px] shrink-0`}>Billing Unit</span>
        <span className="w-[32px] shrink-0" />
      </div>

      {plans.map((plan, index) => {
        const rowErrors = errors?.[plan.key] || {};
        return (
          <div key={plan.key}>
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-[8px]">
              <input
                type="text"
                aria-label={`Plan name ${index + 1}`}
                placeholder="Plan name (e.g. Standard)"
                value={plan.planName}
                maxLength={50}
                onChange={(e) =>
                  updateRow(plan.key, {
                    planName: e.target.value.trimStart().replace(/\s+/g, " "),
                  })
                }
                className={`${fieldClass("plan", !!rowErrors.planName)} basis-full sm:basis-0 sm:flex-1 min-w-0`}
              />

              <div className="relative w-[112px] shrink-0">
                <span className="absolute left-[12px] top-1/2 -translate-y-1/2 font-gilroy text-[14px] text-[#6A7282] pointer-events-none">
                  ₹
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label={`Price ${index + 1}`}
                  placeholder="0"
                  value={plan.amount}
                  onChange={(e) => {
                    if (!/^\d*$/.test(e.target.value)) return;
                    updateRow(plan.key, { amount: e.target.value });
                  }}
                  className={`${fieldClass("plan", !!rowErrors.amount)} !pl-[29px]`}
                />
              </div>

              <div className="w-[128px] shrink-0">
                <Select
                  aria-label={`Billing unit ${index + 1}`}
                  options={BILLING_UNITS}
                  value={BILLING_UNITS.find((u) => u.value === plan.billingUnit)}
                  onChange={(option) =>
                    updateRow(plan.key, { billingUnit: option.value })
                  }
                  isSearchable={false}
                  styles={selectStyles}
                  menuPortalTarget={document.body}
                  menuPosition="fixed"
                  menuPlacement="auto"
                />
              </div>

              <button
                type="button"
                aria-label={`Remove plan ${index + 1}`}
                onClick={() => removeRow(plan.key)}
                className="group flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-[8px] transition-colors hover:bg-[rgba(255,234,234,0.7)]"
              >
                <Trash
                  size={14}
                  className="text-[#6A7282] group-hover:text-[#FF383C]"
                />
              </button>
            </div>

            {(rowErrors.planName || rowErrors.amount) && (
              <div className="flex flex-wrap gap-x-[8px]">
                <ErrorMessage message={rowErrors.planName} type="error" />
                <ErrorMessage message={rowErrors.amount} type="error" />
              </div>
            )}
          </div>
        );
      })}

      <button
        type="button"
        onClick={() => onChange([...plans, createEmptyPlan()])}
        className="flex h-[32px] w-fit items-center justify-center gap-[9px] rounded-[4px] bg-[#F4F6FF] px-[14px] font-gilroy text-[13px] font-medium text-[#1E45E1] transition-colors hover:bg-[#E8ECFF]"
      >
        <AddCircle size={17} color="#1E45E1" />
        Add New Row
      </button>
    </div>
  );
}

AmenityPlanRows.propTypes = {
  plans: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      planName: PropTypes.string,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      billingUnit: PropTypes.string,
    }),
  ).isRequired,
  errors: PropTypes.object,
  onChange: PropTypes.func.isRequired,
};

export default AmenityPlanRows;

import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  BILLING_UNITS,
  getAmenityPlans,
  isAmenityActive,
} from "../AmenitiesFile/amenityPlanUtils";

// Helpers for the tenant amenity selection (Add Tenant, Step 2).

// Stable key for a plan: its id, or its position for amenities created before
// plans existed (those expose a single "Base price" plan without an id).
export const planKeyOf = (plan, index) =>
  plan?.planId !== undefined && plan?.planId !== null
    ? String(plan.planId)
    : `idx-${index}`;

export const isRecurringUnit = (unit) => unit === "MONTHLY" || unit === "WEEKLY";

export const unitLabel = (unit) =>
  BILLING_UNITS.find((u) => u.value === unit)?.label || "Monthly";

// Settings amenities with their plans, only active ones that have a plan.
export const useHostelAmenities = () => {
  const list = useSelector((s) => s.InvoiceList?.AmenitiesList);
  return useMemo(() => {
    const raw = list?.amenities ?? list ?? [];
    return (Array.isArray(raw) ? raw : [])
        .filter(isAmenityActive)
        .map((amenity) => ({
          amenityId: amenity.amenityId,
          name: amenity.amenityName,
          description: amenity.description || "",
          plans: getAmenityPlans(amenity).map((plan, index) => ({
            ...plan,
            key: planKeyOf(plan, index),
          })),
        }))
        .filter((amenity) => amenity.plans.length > 0);
  }, [list]);
};

const round2 = (n) => Math.round(n * 100) / 100;

// ESTIMATE of the first charge for a plan, shown on Preview Details only. The
// backend calculates the real amount when the check-in is confirmed; this value
// is never sent or used for invoices.
// Same conventions as rent: a monthly plan is pro-rated for the rest of the
// joining month (unless proration is off or the hostel bills by joining date),
// a weekly plan bills its first full week, one-time plans are never pro-rated.
export const estimateFirstCharge = (plan, joiningDate, proRate, joiningDateBased) => {
  const amount = Number(plan?.amount) || 0;
  if (plan?.billingUnit !== "MONTHLY" || !proRate || joiningDateBased || !joiningDate) {
    return amount;
  }
  const d = new Date(typeof joiningDate?.toDate === "function" ? joiningDate.toDate() : joiningDate);
  if (Number.isNaN(d.getTime())) return amount;
  const daysInMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  const remaining = daysInMonth - d.getDate() + 1;
  return round2((amount * remaining) / daysInMonth);
};

// { [amenityId]: planKey } -> [{ amenityId, planId }] for the API (flag-guarded by caller).
export const toAmenityPayload = (selected, amenities) =>
  Object.entries(selected || {})
    .map(([amenityId, planKey]) => {
      const amenity = amenities.find((a) => String(a.amenityId) === String(amenityId));
      const plan = amenity?.plans.find((p) => p.key === planKey);
      return amenity && plan
        ? { amenityId: amenity.amenityId, planId: plan.planId ?? null }
        : null;
    })
    .filter(Boolean);

// Saved draft [{ amenityId, planId }] -> { [amenityId]: planKey }.
export const fromAmenityPayload = (list) =>
  Object.fromEntries(
    (Array.isArray(list) ? list : []).map((item) => [
      item.amenityId,
      item.planId !== undefined && item.planId !== null ? String(item.planId) : "idx-0",
    ]),
  );

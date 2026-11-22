/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import checkIcon from "../../Assets/Images/New_images/tenant-stepper/check-small.svg";
import { formatPlanPrice } from "../AmenitiesFile/amenityPlanUtils";
import { isRecurringUnit, useHostelAmenities } from "./tenantAmenityUtils";

// Step 2 "Amenities (Optional)" card (Figma 7145:163256).
// The list is the hostel's Settings -> Amenities configuration (AMENITIESLIST,
// state.InvoiceList.AmenitiesList); nothing is hardcoded. Each ticked amenity
// gets exactly one plan, and the plan decides the billing frequency.

function Checkbox({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={`relative flex h-[17px] w-[17px] shrink-0 items-center justify-center rounded-[4px] ${
        checked
          ? "bg-[#00A32E]"
          : "border-[1.3px] border-solid border-[#49454F] bg-white"
      }`}
    >
      {checked && <img src={checkIcon} alt="" className="absolute" />}
    </button>
  );
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function Radio({ selected }) {
  return (
    <span
      aria-hidden
      className={`relative flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.04),0px_1px_2px_rgba(0,0,0,0.06),0px_0px_1px_rgba(0,0,0,0.06)] ${
        selected ? "bg-[#0485F7]" : "bg-white"
      }`}
    >
      {selected && (
        <span className="h-[6px] w-[6px] rounded-[4px] bg-[#FCFCFC] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]" />
      )}
    </span>
  );
}

Radio.propTypes = { selected: PropTypes.bool };

function TenantAmenitiesSection({ selected, onChange, proRate, onProRateChange }) {
  const dispatch = useDispatch();
  const state = useSelector((s) => s);
  const hostelId = state.login?.selectedHostel_Id;
  const amenities = useHostelAmenities();
  const [loading, setLoading] = useState(false);

  // Load the hostel's amenities once (same saga Settings -> Amenities uses).
  useEffect(() => {
    if (!hostelId) return undefined;
    setLoading(true);
    dispatch({ type: "AMENITIESLIST", payload: hostelId });
    // The "no amenities" response (201) is not stored by the reducer, so stop
    // waiting after a while and show the empty state.
    const timer = setTimeout(() => setLoading(false), 6000);
    return () => clearTimeout(timer);
  }, [hostelId]);

  useEffect(() => {
    if (state.InvoiceList?.StatusCodeAmenitiesGet === 200) setLoading(false);
  }, [state.InvoiceList?.StatusCodeAmenitiesGet, state.InvoiceList?.AmenitiesList]);

  const failed = !!state.InvoiceList?.errorAmenities;

  const toggleAmenity = (amenity) => {
    const next = { ...selected };
    if (next[amenity.amenityId]) {
      delete next[amenity.amenityId];
    } else {
      // Do not assume a plan when there is a choice; preselect the only one.
      next[amenity.amenityId] =
        amenity.plans.length === 1 ? amenity.plans[0].key : "";
    }
    onChange(next);
  };

  const choosePlan = (amenityId, planKey) =>
    onChange({ ...selected, [amenityId]: planKey });

  const hasRecurring = amenities.some((amenity) => {
    const plan = amenity.plans.find((p) => p.key === selected[amenity.amenityId]);
    return plan && isRecurringUnit(plan.billingUnit);
  });

  // Figma: "Starts ₹500/month" = the amenity's first configured plan.
  const startsAt = (amenity) => `Starts ${formatPlanPrice(amenity.plans[0])}`;

  return (
    <section className="mt-[14px] flex flex-col gap-[10px] rounded-[8px] border-[1px] border-solid border-[rgba(216,216,216,0.5)] bg-white p-[14px] font-gilroy">
      <div className="flex items-center gap-[10px]">
        <span className="h-[26px] w-[3px] rounded-[12px] bg-[#0038AC]" />
        <h5 className="m-0 text-[18px] font-medium leading-[24px] text-[#222222]">
          Amenities
        </h5>
        <span className="text-[10px] tracking-[0.6px] text-[#99A1AF]">
          (Optional)
        </span>
      </div>
      <p className="m-0 text-[12px] text-[#6A7282]">
        Assign additional amenities applicable to this tenant.
      </p>

      {loading && amenities.length === 0 ? (
        <div className="flex items-center gap-[8px] py-[12px] text-[13px] text-[#64748B]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
          Loading amenities...
        </div>
      ) : failed && amenities.length === 0 ? (
        <p className="m-0 rounded-[8px] bg-[#FFF5F5] px-[12px] py-[10px] text-[13px] text-[#FF383C]">
          Amenities could not be loaded. You can continue without them.
        </p>
      ) : amenities.length === 0 ? (
        <p className="m-0 rounded-[8px] bg-[#F9FAFB] px-[12px] py-[10px] text-[13px] text-[#64748B]">
          No amenities are configured for this property. Add them in Settings →
          Amenities.
        </p>
      ) : (
        <div className="flex flex-col gap-[10px] p-[2px]">
          {amenities.map((amenity) => {
            const isOn = selected[amenity.amenityId] !== undefined;
            const planKey = selected[amenity.amenityId];
            return (
              <div
                key={amenity.amenityId}
                className="flex flex-col gap-[10px] rounded-[8px] bg-white px-[16px] py-[14px] shadow-[0px_1px_2px_rgba(12,12,13,0.1),0px_1px_2px_rgba(12,12,13,0.05)]"
              >
                <div className="flex items-start justify-between gap-[12px]">
                  <div className="flex min-w-0 flex-col gap-[6px]">
                    <span className="break-words text-[15px] font-medium leading-[20px] text-[#0A0A0A]">
                      {amenity.name}
                    </span>
                    <span className="text-[12px] leading-[18px] text-[#6A7282]">
                      {startsAt(amenity)}
                    </span>
                  </div>
                  <Checkbox
                    checked={isOn}
                    onChange={() => toggleAmenity(amenity)}
                    label={`Assign ${amenity.name}`}
                  />
                </div>

                {isOn && (
                  <>
                    <div className="h-px w-full bg-[#EDEDED]" />
                    <span className="text-[12px] italic leading-[16px] text-[#64748B]">
                      Select Plan
                    </span>
                    <div role="radiogroup" aria-label={`${amenity.name} plan`} className="flex flex-col gap-[6px]">
                      {amenity.plans.map((plan) => {
                        const active = plan.key === planKey;
                        return (
                          <button
                            key={plan.key}
                            type="button"
                            role="radio"
                            aria-checked={active}
                            onClick={() => choosePlan(amenity.amenityId, plan.key)}
                            className={`flex h-[40px] w-full items-center gap-[10px] rounded-[6px] border-solid bg-white px-[7px] text-left ${
                              active
                                ? "border-[1px] border-[#0485F7] shadow-[0px_0px_6px_rgba(4,133,247,0.1)]"
                                : "border-[1px] border-[#E5E7EB]"
                            }`}
                          >
                            <span className="flex flex-1 items-center justify-between pr-[10px]">
                              <span
                                className={`text-[13px] leading-[16px] text-[#222222] ${active ? "font-semibold" : "font-medium"}`}
                              >
                                {plan.planName}
                              </span>
                              <span className="text-[12px] font-medium leading-[16px] text-[#222222]">
                                {formatPlanPrice(plan)}
                              </span>
                            </span>
                            <Radio selected={active} />
                          </button>
                        );
                      })}
                    </div>
                    {!planKey && (
                      <span className="text-[12px] text-[#FF383C]">
                        Select a plan for {amenity.name}
                      </span>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {hasRecurring && (
        <label className="m-0 mt-[4px] flex cursor-pointer items-center gap-[8px] text-[14px] font-medium text-[#222222]">
          <input
            type="checkbox"
            checked={proRate}
            onChange={(e) => onProRateChange(e.target.checked)}
            className="h-4 w-4 cursor-pointer accent-[#1E45E1]"
          />
          Prorate charges
          <span className="text-[12px] font-normal text-[#6A7282]">
            (first monthly / weekly cycle from the joining date; one-time plans
            are never prorated)
          </span>
        </label>
      )}
    </section>
  );
}

TenantAmenitiesSection.propTypes = {
  // { [amenityId]: planKey } — "" while the plan is not chosen yet
  selected: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  proRate: PropTypes.bool.isRequired,
  onProRateChange: PropTypes.func.isRequired,
};

export default TenantAmenitiesSection;

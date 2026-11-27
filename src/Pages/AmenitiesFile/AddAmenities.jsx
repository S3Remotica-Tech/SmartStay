/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import { IoCloseOutline } from "react-icons/io5";

import PropTypes from "prop-types";
import ErrorMessage from "../../Components/ErrorMessage";
import AmenityPlanRows from "./AmenityPlanRows";
import {
  buildAmenityPayload,
  createEmptyPlan,
  fieldClass,
  getFormSnapshot,
  labelClass,
  toFormPlans,
  validatePlans,
} from "./amenityPlanUtils";

// Used for both "Add Amenity" and "Edit Amenity" (editDetails present = edit).
function AddAmenities({ handleClose, hostelid, editDetails }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [amenity, setAmenity] = useState("");
  const [description, setDescription] = useState("");
  const [plans, setPlans] = useState(() => [createEmptyPlan()]);
  const [planErrors, setPlanErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const [isChangedError, setIsChangedError] = useState("");
  const [initialSnapshot, setInitialSnapshot] = useState(null);
  const [hostelError, setHostelError] = useState("");
  const [errorAmenity, setErrorAmenity] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    if (editDetails) {
      const initial = {
        amenity: editDetails.amenityName || "",
        description: editDetails.description || "",
        plans: toFormPlans(editDetails),
        isChecked: !!editDetails.proRate,
      };

      setAmenity(initial.amenity);
      setDescription(initial.description);
      setPlans(initial.plans);
      setIsChecked(initial.isChecked);
      setInitialSnapshot(getFormSnapshot(initial));
    }
  }, [editDetails]);

  const clearFeedback = () => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_ERROR_AMENITIES_SETTINGS" });
  };

  const handleAmenityChange = (e) => {
    let value = e.target.value;

    value = value.trimStart();
    value = value.replace(/\s+/g, " ");

    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }

    setAmenity(value);
    setErrorAmenity("");
    clearFeedback();
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value.trimStart());
    clearFeedback();
  };

  const handlePlansChange = (nextPlans) => {
    setPlans(nextPlans);
    setPlanErrors({});
    setIsChangedError("");
  };

  const handleCloseForm = () => {
    handleClose();

    dispatch({ type: "REMOVE_ERROR_AMENITIES_SETTINGS" });
  };

  useEffect(() => {
    if (state.InvoiceList.amnitiessAddError) {
      setFormLoading(false);
    }
  }, [state.InvoiceList.amnitiessAddError]);

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_ERROR_AMENITIES_SETTINGS" });
    let isValid = true;

    if (!hostelid) {
      setHostelError("Pleae Select a Hostel");
    }

    if (!amenity?.trim()) {
      setErrorAmenity("Please Enter Amenity");
      isValid = false;
    }

    const planValidation = validatePlans(plans);
    setPlanErrors(planValidation.errors);
    if (!planValidation.isValid) {
      isValid = false;
    }

    if (isValid && initialSnapshot) {
      const current = getFormSnapshot({
        amenity,
        description,
        plans,
        isChecked,
      });
      if (current === initialSnapshot) {
        setIsChangedError("No Changes Detected");
        isValid = false;
      }
    }

    if (isValid) {
      const data = buildAmenityPayload({
        amenityName: amenity.trim(),
        description,
        plans,
        proRate: isChecked,
        legacyAmount: Number(editDetails?.amenityAmount) || 0,
      });

      if (editDetails) {
        dispatch({
          type: "AMENITIESUPDATE",
          payload: {
            hostelId: state.login.selectedHostel_Id,
            amenityId: editDetails.amenityId,
            data,
          },
        });
      } else {
        dispatch({
          type: "ADD_AMENITIY",
          payload: {
            hostelId: state.login.selectedHostel_Id,
            data,
          },
        });
      }
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50" />

      <div
        role="dialog"
        aria-modal="true"
        aria-label={editDetails ? "Edit Amenity" : "Add Amenity"}
        className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-[589px] bg-white rounded-[10px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden"
      >
        <div className="px-[24px] pt-[16px] pb-[17px] shrink-0 border-b-[1px] border-[#F3F4F6] flex items-start justify-between gap-[8px]">
          <div className="flex flex-col gap-[10px]">
            <h2 className="m-0 font-gilroy text-[20px] font-semibold leading-[24px] text-[#101828]">
              {editDetails ? "Edit Amenity" : "Add Amenity"}
            </h2>
            <p className="m-0 font-gilroy text-[14px] leading-[16px] text-[#6A7282]">
              {editDetails
                ? "Update this amenity and its pricing plans"
                : "Create a new amenity with optional pricing plans"}
            </p>
          </div>

          <IoCloseOutline data-testid="add-amenities-close-icon"
            aria-label="Close"
            onClick={handleCloseForm}
            className="text-[#FF383C] text-[24px] cursor-pointer shrink-0"
          />
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto px-[24px] py-[20px] show-scrolls flex flex-col gap-[20px]">
          {hostelError && <ErrorMessage message={hostelError} type="error" />}

          <section className="flex flex-col gap-[16px]">
            <h3 className="m-0 font-gilroy text-[12px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[#99A1AF]">
              Basic Information
            </h3>

            <div className="flex flex-col gap-[10px]">
              <label htmlFor="amenity-name" className={labelClass}>
                Amenity Name <span className="text-[#FB2C36]">*</span>
              </label>
              <input data-testid="add-amenities-amenity-name-input"
                id="amenity-name"
                type="text"
                placeholder="E.g. Laundry Service, Gym Access"
                value={amenity}
                onChange={handleAmenityChange}
                className={fieldClass("primary", !!errorAmenity)}
              />
              {errorAmenity && (
                <ErrorMessage message={errorAmenity} type="error" />
              )}
            </div>

            <div className="flex flex-col gap-[10px]">
              <label htmlFor="amenity-description" className={labelClass}>
                Description
              </label>
              <textarea data-testid="add-amenities-description-textarea"
                id="amenity-description"
                rows={2}
                placeholder="Short description of this amenity (1–2 lines)"
                value={description}
                onChange={handleDescriptionChange}
                className={`${fieldClass("primary")} !h-[58px] py-[9px] resize-none leading-[20px] placeholder:text-[#99A1AF]`}
              />
            </div>
          </section>

          <section className="flex flex-col gap-[16px]">
            <div className="flex flex-col gap-[4px]">
              <div className="flex items-center gap-[10px]">
                <h3 className="m-0 font-gilroy text-[16px] font-semibold uppercase leading-[16px] tracking-[0.6px] text-[#222222]">
                  Pricing Plans
                </h3>
                <span className="font-gilroy text-[10px] text-[#99A1AF]">
                  (Optional)
                </span>
              </div>
              <p className="m-0 font-gilroy text-[12px] leading-[16px] text-[#6A7282]">
                Create one or multiple plans for this amenity. Leave empty if no
                pricing plans are required.
              </p>
            </div>

            <AmenityPlanRows data-testid="add-amenities-plans-change-input"
              plans={plans}
              errors={planErrors}
              onChange={handlePlansChange}
            />
          </section>
        </div>

        {state.InvoiceList.amnitiessAddError && (
          <div className="flex justify-center items-center">
            <ErrorMessage
              message={state.InvoiceList.amnitiessAddError}
              type="error"
            />
          </div>
        )}
        {isChangedError && (
          <div className="flex justify-center items-center mt-1 mb-2">
            <ErrorMessage message={isChangedError} type="error" />
          </div>
        )}

        <div className="shrink-0 border-t-[1px] border-[#F3F4F6] bg-white px-[24px] pt-[17px] pb-[16px] flex items-center justify-end gap-[12px]">
          <button data-testid="add-amenities-cancel-btn"
            type="button"
            onClick={handleCloseForm}
            className="h-[36px] rounded-[12px] border-[1px] border-[rgba(0,0,0,0.1)] bg-white px-[17px] font-gilroy text-[14px] font-medium text-[#0A0A0A] transition-colors hover:bg-[#F9F9F9]"
          >
            Cancel
          </button>
          <button data-testid="add-amenities-submit-btn"
            type="button"
            disabled={formLoading}
            onClick={handleSubmit}
            className="h-[36px] rounded-[12px] bg-[#1E45E1] px-[20px] font-gilroy text-[14px] font-medium text-white flex items-center justify-center gap-[8px] transition-colors hover:bg-[#1638B5] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {formLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : editDetails ? (
              "Save Changes"
            ) : (
              "Add Amenity"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

AddAmenities.propTypes = {
  handleClose: PropTypes.func.isRequired,
  hostelid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editDetails: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};

export default AddAmenities;

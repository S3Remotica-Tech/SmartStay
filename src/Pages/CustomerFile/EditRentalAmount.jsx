/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle, MessageQuestion } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import {
  datePickerClass,
  fieldClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";

function EditRentalAmount({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [monthlyRent, setMonthlyRent] = useState("");
  const [monthlyRentError, setMonthlyRentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveFromError, setEffectiveFromError] = useState("");
  const [reason, setReason] = useState(null);
  const [types, setTypes] = useState(null);
  const rentInputRef = useRef(null);
  const dateRef = useRef(null);
  const typeRef = useRef(null);
  const [IsChangedError, setIsChangedError] = useState("");

  const [typeError, setTypeError] = useState("");

  const CustomerOverView = state.UsersList.customerdetails;

  const type = [
    { value: "Edit-Rent", label: "Edit Rent" },
    { value: "Rent-Revision", label: "Rent Revision" },
  ];

  const handleReasonChange = (e) => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setReason(e.target.value);
  };

  const handleTypeChange = (selectedOption) => {
    setIsChangedError("");
    setMonthlyRentError("");
    setEffectiveFromError("");
    setTypeError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });

    setTypes(selectedOption.value);
  };

  const handleMonthlyRentChange = (e) => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    const value = e.target.value;

    if (/^[0-9\b]*$/.test(value)) {
      if (value === "" || Number(value) > 0) {
        setMonthlyRent(value);
        setMonthlyRentError("");
      }
    }
  };

  useEffect(() => {
    dispatch({
      type: "SETTINGS_GET_RECURRING",
      payload: { hostelId: state.login.selectedHostel_Id },
    });
  }, []);

  const handleEffectiveFromChange = (date, dateString) => {
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    setEffectiveFrom(dateString);
    setEffectiveFromError("");
  };

  useEffect(() => {
    if (state.UsersList?.updateTenantError) {
      setLoading(false);
    }
  }, [state.UsersList?.updateTenantError]);

  const handleSubmit = () => {
    setIsChangedError("");
    dispatch({ type: "REMOVE_TENANT_UPDATE_ERROR" });
    let isValid = true;

    if (!monthlyRent || Number(monthlyRent) <= 0) {
      setMonthlyRentError("Please Enter Monthly Rent");
      rentInputRef.current?.focus();
      isValid = false;
    }

    if (types === "Rent-Revision" && !effectiveFrom) {
      setEffectiveFromError("Please Select Date");
      dateRef.current?.focus();
      isValid = false;
    }

    if (!types) {
      setTypeError("Please Select an Type");
      typeRef.current?.focus();
      isValid = false;
    }

    if (!isValid) return;
    let formattedDate = "";

    if (effectiveFrom && dayjs(effectiveFrom, "MM/YYYY").isValid()) {
      formattedDate = dayjs(effectiveFrom, "MM/YYYY").format("MM-YYYY");
      //   formattedDate = dayjs(effectiveFrom, "MM/YYYY").format("DD-MM-YYYY");
    }

    const oldAmount = Number(CustomerOverView.hostelInfo.monthlyRent);

    const newAmount = Number(monthlyRent);

    if (oldAmount === newAmount) {
      setIsChangedError("No changes detected in Rent Amount");
      return;
    }

    dispatch({
      type: "EDITAMOUNTDETAILS",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bookingId: CustomerOverView?.bookingId,
        updateInfo: {
          effectiveDate: formattedDate,
          reason: reason || "",
          newRent: monthlyRent,
        },
      },
    });

    setLoading(true);
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 100);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state?.UsersList.editAmountSuccessStatusCode === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_EDIT_AMOUNT_DETAILS" });
      }, 100);
    }
  }, [state?.UsersList.editAmountSuccessStatusCode]);

  // const billStartDate =
  //   state?.Settings?.SettingsBillsGetRecurring?.billStartDate;

  // const billDueDate = state?.Settings?.SettingsBillsGetRecurring?.billDueDate;

  // const typeOfBilling =
  //   state?.Settings?.SettingsBillsGetRecurring?.typeOfBilling;

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "SETTINGS_GET_RECURRING",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  const allowedMonths =
    CustomerOverView?.effectiveFromMonth?.map((item) =>
      dayjs(item.type, "MM-YYYY").format("MM-YYYY"),
    ) || [];

  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="  px-4 py-3 shrink-0 flex justify-between mb-2 border-b">
          <div className="!text-[20px] text-[#222] !font-gilroy !font-semibold">
            Edit Rental Amount
          </div>

          <CloseCircle data-testid="edit-rental-amount-close-icon"
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 show-scrolls max-h-[500px]">
          <div className="flex flex-col gap-1">
            {types === "Rent-Revision" && (
              <div>
                <div className="flex items-center gap-1 p-2 rounded-lg border border-[#C6D1FF] bg-[#B7C2F0]">
                  <MessageQuestion size="18" color="#222" />
                  <label className="text-[11px] font-gilroy text-[#222]">
                    Rent changes will apply from next billing cycle and are
                    fully audit-logged
                  </label>
                </div>
              </div>
            )}

            {/* TYPE */}
            <div>
              <Form.Group>
                <Form.Label className={fieldLabelClass}>
                  Type <span className={fieldRequiredClass}>*</span>
                </Form.Label>

                <div data-testid="edit-rental-amount-type-select" className="contents"><Select
                  value={type.find((opt) => opt.value === types) || null}
                  onChange={handleTypeChange}
                  options={type}
                  placeholder="Select Type"
                  noOptionsMessage={() => "No Type available"}
                  styles={{
                    ...fieldSelectStyles(!!typeError),
                    menuList: (base) => ({ ...base, padding: 0, maxHeight: "150px" }),
                  }}
                /></div>

                {typeError && <ErrorMessage className="mt-[6px]" message={typeError} type="error" />}
              </Form.Group>
            </div>

            {/* RENT */}
            {types && (
              <div>
                <Form.Group>
                  <Form.Label className={fieldLabelClass}>
                    New Monthly Rent{" "}
                    <span className={fieldRequiredClass}>*</span>
                  </Form.Label>

                  <FormControl data-testid="edit-rental-amount-new-monthly-rent-input"
                    type="text"
                    ref={rentInputRef}
                    value={monthlyRent}
                    onChange={handleMonthlyRentChange}
                    placeholder="Enter New Rent"
                    className={fieldClass(!!monthlyRentError)}
                  />

                  {monthlyRentError && (
                    <ErrorMessage className="mt-[6px]" message={monthlyRentError} type="error" />
                  )}
                </Form.Group>
              </div>
            )}

            {/* DATE */}
            {types === "Rent-Revision" && (
              <div>
                <Form.Group>
                  <Form.Label className={fieldLabelClass}>
                    Effective From{" "}
                    <span className={fieldRequiredClass}>*</span>
                  </Form.Label>

                  <div className="relative w-full">
                    <DatePicker data-testid="edit-rental-amount-effective-from-date" className={datePickerClass(!!effectiveFromError)}
                      ref={dateRef}
                      picker="month"
                      format="MM/YYYY"
                      placeholder="MM/YYYY"
                      value={
                        effectiveFrom ? dayjs(effectiveFrom, "MM/YYYY") : null
                      }
                      onChange={handleEffectiveFromChange}
                      disabledDate={(current) => {
                        if (!current) return false;

                        const currentMonth = current.format("MM-YYYY");

                        return !allowedMonths.includes(currentMonth);
                      }}
                     
                    />
                  </div>

                  {effectiveFromError && (
                    <ErrorMessage className="mt-[6px]" message={effectiveFromError} type="error" />
                  )}
                </Form.Group>
              </div>
            )}

            {/* REASON */}
            {types && (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label className={fieldLabelClass}>
                    Reason
                  </Form.Label>

                  <FormControl data-testid="edit-rental-amount-reason-input"
                    type="text"
                    placeholder="Enter your reason"
                    value={reason}
                    onChange={handleReasonChange}
                    className={fieldClass()}
                  />
                </Form.Group>
              </div>
            )}
          </div>

          {state.UsersList?.updateTenantError && (
            <ErrorMessage className="mt-[6px]"
              message={state.UsersList.updateTenantError}
              type="error"
            />
          )}
        </div>

        {loading && (
          <div className="absolute inset-x-0 top-[100px] bottom-0 flex items-center justify-center opacity-75 z-10">
            <div
              className="w-10 h-10 rounded-full animate-spin"
              style={{
                borderTop: "4px solid #1E45E1",
                borderRight: "4px solid transparent",
              }}
            />
          </div>
        )}

        {IsChangedError && (
          <div className="flex justify-center">
            <ErrorMessage className="mt-[6px]" message={IsChangedError} type="error" />
          </div>
        )}

        <div className="flex justify-end gap-3 p-4">
          <Button data-testid="edit-rental-amount-cancel-btn"
            onClick={handleClose}
            className="mt-1 w-full bg-white !text-[#1E45E1] !font-gilroy !font-semibold rounded-xl px-10 py-2 !border-none"
          >
            Cancel
          </Button>

          <Button data-testid="edit-rental-amount-update-btn"
            disabled={loading}
            onClick={handleSubmit}
            className="mt-1 w-full !bg-[#1E45E1] text-white !font-gilroy !font-semibold rounded-xl px-10 py-2"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}
EditRentalAmount.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default EditRentalAmount;

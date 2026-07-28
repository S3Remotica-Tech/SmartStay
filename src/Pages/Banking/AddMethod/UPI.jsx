/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CloseCircle, Add } from "iconsax-react";
import ErrorMessage from "../../../Components/ErrorMessage";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled
      ? "#F3F4F6"
      : state.hasValue
        ? "#FFF"
        : "#fff",
    opacity: state.isDisabled ? 0.7 : 1,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 600,
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#6B7280",
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 14,
      padding: "6px 12px",
      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#fff",
      color: "#111827",
      cursor: "pointer",

      whiteSpace: "nowrap",
      overflow: "visible",

      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #1E45E1",
        fontWeight: 500,
      }),
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isDisabled ? "#D1D5DB" : "#6B7280",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function UPI({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  // const getUpiCardTypes   state?.bankingDetails?.getUpiCardTypes

  const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;

  const bankOptions = [
    { value: "canara", label: "Canara Bank (Navalur Branch)" },
    { value: "hdfc", label: "HDFC Bank" },
  ];

  const upiOptions = [
    { value: "GOOGLEPAY", label: "Google Pay" },
    { value: "PHONEPE", label: "PhonePe" },
    { value: "PAYTM", label: "Paytm" },
    { value: "BHIM", label: "BHIM UPI" },
    { value: "AMAZONPAY", label: "Amazon Pay" },
    { value: "CRED", label: "CRED" },
    { value: "SUPERMONEY", label: "Super.money" },
    { value: "MOBIKWIK", label: "MobiKwik" },
  ];

  const [linkedBank, setLinkedBank] = useState(null);
  const [linkedBankError, setLinkedBankError] = useState("");

  const [upiApp, setUpiApp] = useState(null);
  const [upiAppError, setUpiAppError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [upiIdError, setUpiIdError] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");

  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleLinkedBankChange = (selected) => {
    setLinkedBank(selected);
    setLinkedBankError("");
  };

  const handleUpiAppChange = (selected) => {
    setUpiApp(selected);
    setUpiAppError("");
  };

  const handleUpiIdChange = (e) => {
    const value = e.target.value.trim();

    setUpiId(value);

    const upiRegex = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/;

    if (!value) {
      setUpiIdError("Please Enter UPI ID");
    } else if (!upiRegex.test(value)) {
      setUpiIdError("Enter a valid UPI ID");
    } else {
      setUpiIdError("");
    }
  };

  const handleDisplayNameChange = (e) => {
    const value = e.target.value;

    if (!/^[A-Za-z\s]*$/.test(value)) {
      return;
    }

    setDisplayName(value);

    if (!value.trim()) {
      setDisplayNameError("Please Enter Display Name");
    } else {
      setDisplayNameError("");
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    setDescription(value);

    if (!value.trim()) {
      setDescriptionError("");
    } else {
      setDescriptionError("");
    }
  };

  const handleSaveUPI = () => {
    dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
    let isValid = true;

    // if (!linkedBank) {
    //   setLinkedBankError("Please select linked bank");
    //   isValid = false;
    // }

    if (!upiApp) {
      setUpiAppError("Please select UPI app");
      isValid = false;
    }

    const upiRegex = /^[a-zA-Z0-9._-]{2,}@[a-zA-Z0-9]{2,}$/;

    if (!upiId.trim()) {
      setUpiIdError("Please Enter UPI ID");
      isValid = false;
    } else if (!upiRegex.test(upiId.trim())) {
      setUpiIdError("Please Enter a Valid UPI ID");
      isValid = false;
    } else {
      setUpiIdError("");
    }

    const displayNameRegex = /^[A-Za-z\s]+$/;

    if (!displayName.trim()) {
      setDisplayNameError("Please Enter Display Name");
      isValid = false;
    } else if (!displayNameRegex.test(displayName.trim())) {
      setDisplayNameError("Display Name should contain only letters");
      isValid = false;
    } else {
      setDisplayNameError("");
    }

    if (!isValid) return;

    dispatch({
      type: "ADD_PAYMENT_METHOD_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bankId: OverviewDetails?.bankId,
        paymentMethod: "UPI",
        upiId: upiId.trim(),
        upiApp: upiApp.value,
        displayName: displayName.trim(),
        description: description.trim(),
        // qrImage: qrImage || null,

        // cardNumber: null,
        // cardNetwork: null,
        // cardHolderName: null,
        // creditLimit: null,
        // billingCycle: null,
        // linkedUpiId: null,
      },
    });
    setIsSaving(true);
  };

  useEffect(() => {
    if (state.bankingDetails.addPaymentMethodSuccessCode === 200) {
      setIsSaving(false);
      handleClose();
    }
  }, [state.bankingDetails.addPaymentMethodSuccessCode]);

  useEffect(() => {
    if (state.bankingDetails.addPaymentError) {
      setIsSaving(false);
    }
  }, [state.bankingDetails.addPaymentError]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
    };
  }, []);

  return (
    <div className="">
      <div className="">
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Linked Bank
            </label>

            <input
              value={linkedBank}
              disabled
              // onChange={handleLinkedBankChange}
              placeholder=""
              className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
            />

            {linkedBankError && (
              <ErrorMessage message={linkedBankError} type="error" />
            )}
          </div>

          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              UPI APP <span className="text-red-500">*</span>
            </label>

            <Select
              options={upiOptions}
              value={upiApp}
              onChange={handleUpiAppChange}
              placeholder="Select UPI App"
              className="mt-2"
              styles={CustomStyles}
            />

            {upiAppError && <ErrorMessage message={upiAppError} type="error" />}
          </div>
        </div>

        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            UPI ID <span className="text-red-500">*</span>
          </label>

          <input
            value={upiId}
            onChange={handleUpiIdChange}
            placeholder="Ex : smartstay@oksbi"
            className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />
          {upiIdError && <ErrorMessage message={upiIdError} type="error" />}
        </div>

        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            Display Name <span className="text-red-500">*</span>
          </label>

          <input
            value={displayName}
            onChange={handleDisplayNameChange}
            placeholder="Gpay UPI"
            className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />

          {displayNameError && (
            <ErrorMessage message={displayNameError} type="error" />
          )}
        </div>

        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            Description
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Describe the notes..."
            className="w-full mt-2 p-4 border border-[#E5E7EB] rounded-lg text-sm resize-none outline-none focus:border-[#2952CC]"
          />
          {/* {descriptionError && (
            <ErrorMessage message={descriptionError} type="error" />
          )} */}
        </div>
      </div>

      {state.bankingDetails.addPaymentError && (
        <ErrorMessage
          message={state.bankingDetails.addPaymentError}
          type="error"
        />
      )}

      <div className="flex justify-end gap-4 px-6 py-2 ">
        <button
          onClick={handleClose}
          className="px-6 py-2 text-[#6B7280] text-sm font-medium"
        >
          Cancel
        </button>

        <button
          disabled={isSaving}
          onClick={handleSaveUPI}
          className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSaving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving ....{" "}
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </div>
  );
}

export default UPI;

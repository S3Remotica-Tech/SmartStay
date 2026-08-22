/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ErrorMessage from "../../../Components/ErrorMessage";

import "react-datepicker/dist/react-datepicker.css";

import PropTypes from "prop-types";

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

function Debit({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;

  const upiOptions =
    state?.bankingDetails?.getUpiCardTypes?.map((view) => ({
      value: view.id,
      label: view.name,
    })) || [];
  // const [linkedBank, setLinkedBank] = useState(null);
  // const [linkedBankError, setLinkedBankError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [cardNetwork, setCardNetwork] = useState(null);
  const [cardNetworkError, setCardNetworkError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardHolderNameError, setCardHolderNameError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");

  const cardNetworkRef = useRef(null);
  const cardHolderNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const displayNameRef = useRef(null);

  // const handleLinkedBankChange = (selected) => {
  //   setLinkedBank(selected);
  //   setLinkedBankError("");
  // };

  const handleDisplayNameChange = (e) => {
    const value = e.target.value;
    if (!/^[A-Za-z\s]*$/.test(value)) {
      return;
    }

    setDisplayName(value);

    if (!value.trim()) {
      setDisplayNameError("Please Enter Display name");
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

  const handleCardNetworkChange = (selected) => {
    setCardNetwork(selected);
    setCardNetworkError("");
  };

  const handleCardHolderNameChange = (e) => {
    let value = e.target.value;

    if (!/^[A-Za-z\s]*$/.test(value)) {
      return;
    }

    value = value.replace(/^\s+/, "").replace(/\s{2,}/g, " ");

    setCardHolderName(value);

    if (!value.trim()) {
      setCardHolderNameError("Please Enter Card holder name ");
    } else {
      setCardHolderNameError("");
    }
  };

  const handleCardNumberChange = (e) => {
    dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);

    setCardNumber(value);

    if (!value) {
      setCardNumberError("Please Enter Last 4 digits");
    } else if (value.length !== 4) {
      setCardNumberError("Enter exactly 4 digits");
    } else {
      setCardNumberError("");
    }
  };

  const handleSaveDebit = () => {
    dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
    setCardNetworkError("");
    setCardHolderNameError("");
    setCardNumberError("");
    setDisplayNameError("");
    let isValid = true;
    let hasFocused = false;

    const focusField = (ref) => {
      if (!hasFocused) {
        ref.current?.focus();
        hasFocused = true;
      }
    };
    const nameRegex = /^[A-Za-z\s]+$/;

    if (!cardNetwork) {
      setCardNetworkError("Please select card network");
      focusField(cardNetworkRef);
      isValid = false;
    } else {
      setCardNetworkError("");
    }

    if (!cardHolderName.trim()) {
      setCardHolderNameError("Please Enter Card Holder Name");
      focusField(cardHolderNameRef);
      isValid = false;
    } else if (!nameRegex.test(cardHolderName.trim())) {
      setCardHolderNameError("Card holder name should contain only letters");
      focusField(cardHolderNameRef);
      isValid = false;
    } else {
      setCardHolderNameError("");
    }

    if (!cardNumber.trim()) {
      setCardNumberError("Please Enter Last 4 Digits");
      focusField(cardNumberRef);
      isValid = false;
    } else if (!/^\d{4}$/.test(cardNumber)) {
      setCardNumberError("Enter exactly 4 digits");
      focusField(cardNumberRef);
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (!displayName.trim()) {
      setDisplayNameError("Please Enter Display Name");
      focusField(displayNameRef);
      isValid = false;
    } else if (!nameRegex.test(displayName.trim())) {
      setDisplayNameError("Display name should contain only letters");
      focusField(displayNameRef);
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
        paymentMethod: "Debit Card",
        displayName: displayName.trim(),
        description: description.trim(),
        cardNumber: cardNumber,
        cardNetwork: cardNetwork?.value,
        cardHolderName: cardHolderName,
      },
    });
    setIsSaving(true);
  };

  useEffect(() => {
    if (state.bankingDetails.addPaymentMethodSuccessCode === 201) {
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
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto show-scrolls pr-1">
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Linked Bank <span className="text-red-500">*</span>
            </label>

            <input
              value={OverviewDetails?.bankName}
              disabled
              // onChange={handleLinkedBankChange}
              placeholder=""
              className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
            />
          </div>

          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Card Network <span className="text-red-500">*</span>
            </label>

            <Select
              ref={cardNetworkRef}
              options={upiOptions}
              value={cardNetwork}
              onChange={handleCardNetworkChange}
              placeholder="Ex : Visa, Master"
              className="mt-2"
              styles={CustomStyles}
            />
            {cardNetworkError && (
              <ErrorMessage message={cardNetworkError} type="error" />
            )}
          </div>
        </div>

        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            Card Holder Name <span className="text-red-500">*</span>
          </label>

          <input
            ref={cardHolderNameRef}
            value={cardHolderName}
            onChange={handleCardHolderNameChange}
            placeholder="Enter Holder name"
            className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />
          {cardHolderNameError && (
            <ErrorMessage message={cardHolderNameError} type="error" />
          )}
        </div>

        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            Card Number (Last 4 Digits ) <span className="text-red-500">*</span>
          </label>

          <input
            ref={cardNumberRef}
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="**** **** **** 1234"
            maxLength={4}
            className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />
          {cardNumberError && (
            <ErrorMessage message={cardNumberError} type="error" />
          )}
        </div>
        <div className="mt-3">
          <label className="text-[13px] text-[#222222] font-gilroy font-medium">
            Display Name <span className="text-red-500">*</span>
          </label>

          <input
            ref={displayNameRef}
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
          {descriptionError && (
            <ErrorMessage message={descriptionError} type="error" />
          )}
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
          onClick={handleSaveDebit}
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
Debit.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default Debit;

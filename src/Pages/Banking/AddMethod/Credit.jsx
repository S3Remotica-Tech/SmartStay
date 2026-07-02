/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CloseCircle, Add } from "iconsax-react";
import ErrorMessage from "../../../Components/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";

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

function Credit() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const bankOptions = [
    { value: "canara", label: "Canara Bank (Navalur Branch)" },
    { value: "hdfc", label: "HDFC Bank" },
  ];

  const [linkedBank, setLinkedBank] = useState(null);
  const [linkedBankError, setLinkedBankError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [cardNetwork, setCardNetwork] = useState(null);
  const [cardNetworkError, setCardNetworkError] = useState("");

  const [cardHolderName, setCardHolderName] = useState("");
  const [cardHolderNameError, setCardHolderNameError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");

  const [creditLimit, setCreditLimit] = useState("");
  const [creditLimitError, setCreditLimitError] = useState("");

  const [billingCycle, setBillingCycle] = useState(null);
  const [billingCycleError, setBillingCycleError] = useState("");

  const handleLinkedBankChange = (selected) => {
    setLinkedBank(selected);
    setLinkedBankError("");
  };

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
    const value = e.target.value;
    if (!/^[A-Za-z\s]*$/.test(value)) {
      return;
    }
    setCardHolderName(value);

    if (!value.trim()) {
      setCardHolderNameError("Card holder name is required");
    } else {
      setCardHolderNameError("");
    }
  };

  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);

    setCardNumber(value);

    if (!value.trim()) {
      setCardNumberError("Please Enter Last 4 digits");
    } else if (!/^\d{4}$/.test(value)) {
      setCardNumberError("Enter exactly 4 digits");
    } else {
      setCardNumberError("");
    }
  };

  const handleCreditLimitChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    setCreditLimit(value);

    if (!value) {
      setCreditLimitError("Please Enter Credit limit");
    } else if (Number(value) <= 0) {
      setCreditLimitError("Credit limit must be greater than 0");
    } else {
      setCreditLimitError("");
    }
  };

  const handleBillingCycleChange = (date) => {
    setBillingCycle(date);
    setBillingCycleError("");
  };

  const handleSaveCredit = () => {
    let isValid = true;

    const nameRegex = /^[A-Za-z\s]+$/;

    if (!linkedBank) {
      setLinkedBankError("Please select linked bank");
      isValid = false;
    } else {
      setLinkedBankError("");
    }

    if (!cardNetwork) {
      setCardNetworkError("Please select card network");
      isValid = false;
    } else {
      setCardNetworkError("");
    }

    if (!cardHolderName.trim()) {
      setCardHolderNameError("Please enter card holder name");
      isValid = false;
    } else if (!nameRegex.test(cardHolderName.trim())) {
      setCardHolderNameError("Card holder name should contain only letters");
      isValid = false;
    } else {
      setCardHolderNameError("");
    }

    if (!cardNumber.trim()) {
      setCardNumberError("Please enter last 4 digits");
      isValid = false;
    } else if (!/^\d{4}$/.test(cardNumber)) {
      setCardNumberError("Last 4 digits must contain exactly 4 numbers");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (!displayName.trim()) {
      setDisplayNameError("Please enter display name");
      isValid = false;
    } else if (!nameRegex.test(displayName.trim())) {
      setDisplayNameError("Display name should contain only letters");
      isValid = false;
    } else {
      setDisplayNameError("");
    }

    if (!billingCycle) {
      setBillingCycleError("Please select billing cycle");
      isValid = false;
    } else {
      setBillingCycleError("");
    }

    if (creditLimit && Number(creditLimit) <= 0) {
      setCreditLimitError("Credit limit must be greater than 0");
      isValid = false;
    } else {
      setCreditLimitError("");
    }

    if (!isValid) return;
  };

  return (
    <div className="">
      <div className="h-[500px] overflow-y-auto  show-scrolls">
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Linked Bank <span className="text-red-500">*</span>
            </label>

            <Select
              options={bankOptions}
              value={linkedBank}
              onChange={handleLinkedBankChange}
              placeholder="Select Bank"
              className="mt-2"
              styles={CustomStyles}
            />
            {linkedBankError && (
              <ErrorMessage message={linkedBankError} type="error" />
            )}
          </div>

          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Card Network <span className="text-red-500">*</span>
            </label>

            <Select
              options={[
                { value: "visa", label: "Visa" },
                { value: "master", label: "Master Card" },
                { value: "rupay", label: "RuPay" },
                { value: "amex", label: "American Express" },
              ]}
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
            value={displayName}
            onChange={handleDisplayNameChange}
            placeholder="Gpay UPI"
            className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
          />

          {displayNameError && (
            <ErrorMessage message={displayNameError} type="error" />
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="mt-3">
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Credit Limit
            </label>

            <input
              value={creditLimit}
              onChange={handleCreditLimitChange}
              placeholder="Ex : ₹ 50,000"
              className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
            />
            {creditLimitError && (
              <ErrorMessage message={creditLimitError} type="error" />
            )}
          </div>

          <div className="mt-3">
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Billing Cycle
            </label>

            <div className="relative">
              <DatePicker
                selected={billingCycle}
                onChange={handleBillingCycleChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                className={`w-full h-[50px] rounded-[8px] border px-3 pr-10 text-[14px]
                  focus:outline-none`}
              />

              <Calendar
                size="20"
                color="#1E45E1"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
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
      <div className="flex justify-end gap-4 px-6 py-2 ">
        <button className="px-6 py-2 text-[#6B7280] text-sm font-medium">
          Cancel
        </button>

        <button
          onClick={handleSaveCredit}
          className="px-8 py-2 bg-[#2952CC] text-white rounded-lg text-sm font-medium hover:bg-[#1E40AF]"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Credit;

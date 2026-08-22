/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ErrorMessage from "../../../Components/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";
import dayjs from "dayjs";
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

function Credit({ handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;

  const upiOptions =
    state?.bankingDetails?.getUpiCardTypes?.map((view) => ({
      value: view.id,
      label: view.name,
    })) || [];


  const [description, setDescription] = useState("");

  const [displayName, setDisplayName] = useState("");
  const [displayNameError, setDisplayNameError] = useState("");
  const [cardNetwork, setCardNetwork] = useState(null);
  const [cardNetworkError, setCardNetworkError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [cardHolderName, setCardHolderName] = useState("");
  const [cardHolderNameError, setCardHolderNameError] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");

  const [creditLimit, setCreditLimit] = useState("");
  const [creditLimitError, setCreditLimitError] = useState("");

  const [billingCycle, setBillingCycle] = useState(null);
  

  const billingPickerRef = useRef(null);


  const cardNetworkRef = useRef(null);
  const cardHolderNameRef = useRef(null);
  const cardNumberRef = useRef(null);
  const displayNameRef = useRef(null);
  const creditLimitRef = useRef(null);


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
    dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
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

    if (value && Number(value) <= 0) {
      setCreditLimitError("Credit limit must be greater than 0");
    } else {
      setCreditLimitError("");
    }
  };

  const handleBillingCycleChange = (date) => {
    setBillingCycle(date);
    
  };

  const handleSaveCredit = () => {
    dispatch({ type: "REMOVE_ADD_PAYEMNT_METHOD_BANKING_ERROR" });
    setCardNetworkError("");
    setCardHolderNameError("");
    setCardNumberError("");
    setDisplayNameError("");
    setCreditLimitError("");
    let isValid = true;

    const nameRegex = /^[A-Za-z\s]+$/;

    let hasFocused = false;

    const focusField = (ref) => {
      if (!hasFocused) {
        ref.current?.focus();
        hasFocused = true;
      }
    };

    if (!cardNetwork) {
      setCardNetworkError("Please select card network");
      focusField(cardNetworkRef);
      isValid = false;
    } else {
      setCardNetworkError("");
    }

    if (!cardHolderName.trim()) {
      setCardHolderNameError("Please enter card holder name");
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
      setCardNumberError("Please enter last 4 digits");
      focusField(cardNumberRef);
      isValid = false;
    } else if (!/^\d{4}$/.test(cardNumber)) {
      setCardNumberError("Last 4 digits must contain exactly 4 numbers");
      focusField(cardNumberRef);
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (!displayName.trim()) {
      setDisplayNameError("Please enter display name");
      focusField(displayNameRef);
      isValid = false;
    } else if (!nameRegex.test(displayName.trim())) {
      setDisplayNameError("Display name should contain only letters");
      focusField(displayNameRef);
      isValid = false;
    } else {
      setDisplayNameError("");
    }

    if (creditLimit && Number(creditLimit) <= 0) {
      setCreditLimitError("Credit limit must be greater than 0");
      creditLimitRef.current?.focus();
      isValid = false;
    } else {
      setCreditLimitError("");
    }

    if (!isValid) return;

    dispatch({
      type: "ADD_PAYMENT_METHOD_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bankId: OverviewDetails?.bankId,
        paymentMethod: "Credit Card",
        displayName: displayName.trim(),
        description: description.trim(),
        cardNumber: cardNumber,
        cardNetwork: cardNetwork?.value,
        cardHolderName: cardHolderName,
        creditLimit: creditLimit,
               billingCycle: billingCycle
          ? dayjs(billingCycle).format("DD/MM/YYYY")
          : null,
      },
    });
    setIsSaving(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        billingPickerRef.current &&
        !billingPickerRef.current.contains(event.target)
      ) {
       
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    <div className="flex flex-col h-full ">
      <div className="flex-1 overflow-y-auto show-scrolls pr-1">
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Linked Bank
            </label>

            <input
              value={OverviewDetails?.bankName}
              disabled
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
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div className="">
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Credit Limit
            </label>

            <input
              ref={creditLimitRef}
              value={creditLimit}
              onChange={handleCreditLimitChange}
              placeholder="Ex : ₹ 50,000"
              className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
            />
            {creditLimitError && (
              <ErrorMessage message={creditLimitError} type="error" />
            )}
          </div>

          <div className="">
            <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-2">
              Billing Cycle
            </label>

            <div className="relative">
              <DatePicker
                selected={billingCycle}
                onChange={handleBillingCycleChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                className={`w-full h-11 rounded-[8px] border px-3 pr-10 text-[13px]
                  focus:outline-none`}
              />

              <Calendar
                size="20"
                color="#1E45E1"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          {/* <div className="relative">
            <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
              Billing Cycle
            </label>

            <div
              onClick={() => setOpenBillingPicker(!openBillingPicker)}
              className="w-full border border-gray-300 rounded-md min-h-[44px] px-3 py-2.5 text-sm flex justify-between items-center cursor-pointer bg-white"
            >
              <span
                className={billingCycle ? "text-gray-900" : "text-gray-400"}
              >
                {billingCycle
                  ? `${billingCycle.toString().padStart(2, "0")} Days`
                  : "Select Billing Cycle"}
              </span>

              {openBillingPicker ? (
                <ArrowUp2 size="18" color="#1E45E1" />
              ) : (
                <ArrowDown2 size="18" color="#1E45E1" />
              )}
            </div>

            {openBillingPicker && (
              <div
                ref={billingPickerRef}
                className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-3"
              >
                <div className="grid grid-cols-5 gap-3">
                  {billingDaysOptions.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        setBillingCycle(day);
                        setOpenBillingPicker(false);
                      }}
                      className={`w-10 h-10 rounded-full text-xs flex items-center justify-center transition
              ${
                billingCycle === day
                  ? "bg-[#1E45E1] text-white"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
                    >
                      {day.toString().padStart(2, "0")}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div> */}
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
          onClick={handleSaveCredit}
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
Credit.propTypes = {
  handleClose: PropTypes.func.isRequired,
};
export default Credit;

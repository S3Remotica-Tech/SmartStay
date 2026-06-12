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

function UPI() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const bankOptions = [
    { value: "canara", label: "Canara Bank (Navalur Branch)" },
    { value: "hdfc", label: "HDFC Bank" },
  ];

  const upiOptions = [
    { value: "gpay", label: "Gpay" },
    { value: "phonepe", label: "PhonePe" },
  ];

  const [linkedBank, setLinkedBank] = useState(null);
  const [linkedBankError, setLinkedBankError] = useState("");

  const [upiApp, setUpiApp] = useState(null);
  const [upiAppError, setUpiAppError] = useState("");

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
    const value = e.target.value;

    setUpiId(value);

    if (!value.trim()) {
      setUpiIdError("UPI ID is required");
    } else {
      setUpiIdError("");
    }
  };

  const handleDisplayNameChange = (e) => {
    const value = e.target.value;

    setDisplayName(value);

    if (!value.trim()) {
      setDisplayNameError("Display name is required");
    } else {
      setDisplayNameError("");
    }
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;

    setDescription(value);

    if (!value.trim()) {
      setDescriptionError("Description is required");
    } else {
      setDescriptionError("");
    }
  };

  const handleSaveUPI = () => {
    let isValid = true;

    if (!linkedBank) {
      setLinkedBankError("Please select linked bank");
      isValid = false;
    }

    if (!upiApp) {
      setUpiAppError("Please select UPI app");
      isValid = false;
    }

    if (!upiId.trim()) {
      setUpiIdError("UPI ID is required");
      isValid = false;
    }

    if (!displayName.trim()) {
      setDisplayNameError("Display name is required");
      isValid = false;
    }

    if (!description.trim()) {
      setDescriptionError("Description is required");
      isValid = false;
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
            Description <span className="text-red-500">*</span>
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
      <div className="flex justify-end gap-4 px-6 py-2 ">
        <button className="px-6 py-2 text-[#6B7280] text-sm font-medium">
          Cancel
        </button>

        <button
          onClick={handleSaveUPI}
          className="px-8 py-2 bg-[#2952CC] text-white rounded-lg text-sm font-medium hover:bg-[#1E40AF]"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default UPI;

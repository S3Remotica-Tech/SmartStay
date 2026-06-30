/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import { CloseCircle, Add } from "iconsax-react";
import Select, { components } from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "40px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
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

function AddNewAccount({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const [accountMode, setAccountMode] = useState("bank");

  // Bank Fields
  const [displayName, setDisplayName] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountType, setAccountType] = useState(null);

  // Cash Fields
  const [cashType, setCashType] = useState(null);
  const [responsiblePerson, setResponsiblePerson] = useState(null);

  // Common
  const [openingBalance, setOpeningBalance] = useState("");
  const [description, setDescription] = useState("");

  const [errors, setErrors] = useState({});

  const accountTypeOptions = [
    { label: "Savings", value: "Savings" },
    { label: "Current", value: "Current" },
  ];

  const cashOptions = [
    { label: "Petty Cash", value: "Petty Cash" },
    { label: "Office Cash", value: "Office Cash" },
  ];

  const userOptions = [
    { label: "Admin", value: 1 },
    { label: "Manager", value: 2 },
  ];

  // ===========================
  // Handle Functions
  // ===========================

  const handleDisplayName = (e) => {
    const value = e.target.value;
    setDisplayName(value);
  };

  const handleBankName = (e) => {
    const value = e.target.value;
    setBankName(value);
  };

  const handleHolderName = (e) => {
    const value = e.target.value;
    setHolderName(value);
  };

  const handleAccountNumber = (e) => {
    const value = e.target.value;
    setAccountNumber(value);
  };

  const handleBranchName = (e) => {
    const value = e.target.value;
    setBranchName(value);
  };

  const handleIfscCode = (e) => {
    const value = e.target.value.toUpperCase();
    setIfscCode(value);
  };

  const handleOpeningBalance = (e) => {
    const value = e.target.value;
    setOpeningBalance(value);
  };

  const handleDescription = (e) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleSubmitBank = () => {};

  const handleSubmitCash = () => {};

  if (!show) return null;

  return (
    <>
      {" "}
      <div className="fixed inset-0 bg-black/40 z-[40]" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-[600px] bg-white rounded-lg shadow-xl z-50 flex flex-col font-gilroy
         border border-gray-50"
      >
        {" "}
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
                rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Add New Account
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-2">
          <label className="text-[13px] font-medium text-[#222]">
            Select Type
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex gap-14 mt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={accountMode === "bank"}
                onChange={() => setAccountMode("bank")}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-[15px]">Bank Account</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={accountMode === "cash"}
                onChange={() => setAccountMode("cash")}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-[15px]">Cash Account</span>
            </label>
          </div>

          {accountMode === "bank" && (
            <>
              <div className="mt-4 space-y-6">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Name / Display Name{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={displayName}
                      onChange={handleDisplayName}
                      placeholder="Enter Account Name"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                  </div>

                  {/* Bank Name */}
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Bank Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={bankName}
                      onChange={handleBankName}
                      placeholder="Enter Bank Name"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 my-2">
                <label className="block text-[14px] font-medium text-[#222] mb-2">
                  Acc Holder Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  value={holderName}
                  onChange={handleHolderName}
                  placeholder="Enter Holder Name"
                  className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                />
              </div>
              <div className="">
                <div className="grid grid-cols-2 gap-5 my-2">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={accountNumber}
                      onChange={handleAccountNumber}
                      placeholder="Enter Account Number"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Bank Branch name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={branchName}
                      onChange={handleBranchName}
                      placeholder="Enter Branch Name"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 my-2">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      IFSC Code <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={ifscCode}
                      onChange={handleIfscCode}
                      placeholder="Enter IFSC Code"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 uppercase text-[14px] focus:border-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Type <span className="text-red-500">*</span>
                    </label>

                    <Select
                      value={accountType}
                      onChange={setAccountType}
                      options={accountTypeOptions}
                      placeholder="Select Account Type"
                      styles={CustomStyles}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#222] mb-2">
                    Current Opening Balance
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]">
                      ₹
                    </span>

                    <input
                      type="number"
                      value={openingBalance}
                      onChange={handleOpeningBalance}
                      placeholder="0.00"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] pl-9 pr-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                  </div>
                  <div className="text-xs text-[#505F76] my-1">
                    Important: This amount sets your current opening balance.
                    Double-check this figure, as an incorrect balance will
                    miscalculate the final total.
                  </div>
                </div>

                <div className="my-2">
                  <label className="block text-[14px] font-medium text-[#222] mb-2">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={description}
                    onChange={handleDescription}
                    placeholder="Write here..."
                    className="w-full rounded-lg border border-[#D9D9D9] p-4 resize-none text-[14px] focus:border-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 my-2 mr-4">
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-[#4B4B4B] text-sm font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formLoading}
                  onClick={handleSubmitBank}
                  className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${
                    formLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {formLoading ? (
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </div>
                    </>
                  ) : (
                    <span>Create</span>
                  )}
                </button>
              </div>
            </>
          )}

          {accountMode === "cash" && (
            <>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Name / Display Name{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      value={displayName}
                      onChange={handleDisplayName}
                      placeholder="Enter Account Name"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] outline-none focus:border-[#2F54EB]"
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Cash Account Type <span className="text-red-500">*</span>
                    </label>

                    <Select
                      value={cashType}
                      onChange={setCashType}
                      options={cashOptions}
                      placeholder="Select Cash Type"
                      styles={CustomStyles}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Responsible Person <span className="text-red-500">*</span>
                    </label>

                    <Select
                      value={responsiblePerson}
                      onChange={setResponsiblePerson}
                      options={userOptions}
                      placeholder="Select Responsible Person"
                      styles={CustomStyles}
                    />
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Current Opening Balance (Cash){" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        value={openingBalance}
                        onChange={handleOpeningBalance}
                        placeholder="0.00"
                        className="w-full h-11 rounded-lg border border-[#D9D9D9] pl-9 pr-4 text-[14px] outline-none focus:border-[#2F54EB]"
                      />
                    </div>
                    <div className="text-xs text-[#505F76] my-1">
                      Important: This amount sets your current opening balance.
                      Double-check this figure, as an incorrect balance will
                      miscalculate the final total.
                    </div>
                  </div>
                </div>

                <div className="my-2">
                  <label className="block text-[14px] font-medium text-[#222] mb-2">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={description}
                    onChange={handleDescription}
                    placeholder="Write here..."
                    className="w-full rounded-lg border border-[#D9D9D9] p-4 text-[14px] resize-none outline-none focus:border-[#2F54EB]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 my-2 mr-4">
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-[#4B4B4B] text-sm font-medium"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={formLoading}
                  onClick={handleSubmitCash}
                  className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${
                    formLoading ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {formLoading ? (
                    <>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving...
                      </div>
                    </>
                  ) : (
                    <span>Create</span>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AddNewAccount;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CloseCircle, Add } from "iconsax-react";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "45px",
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
    fontWeight: 500,
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

function AddPaymentMethod({ show, handleClose }) {
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

  if (!show) return null;

  return (
    <div className="font-gilroy">
      <div className="fixed inset-0 bg-black/40 z-40" />

      <div className="fixed top-2 right-2 bottom-2 w-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#E5E7EB]">
          <h2 className="text-[18px] font-semibold text-[#1A1C21]">
            Add Payment Method
          </h2>

          <button
            onClick={handleClose}
            className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 items-center px-2 py-1 font-gilroy "
          >
            <Add
              size="24"
              color="#FF0000"
              className="cursor-pointer rotate-45"
            />{" "}
            Close
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-2 show-scrolls">
          <div>
            <label className="text-[12px] font-medium text-[#1A1C21]">
              Select Type <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-6 mt-3">
              {["UPI", "Credit Card", "Debit Card", "QR Code"].map(
                (item, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 text-[13px] text-[#4B5563]"
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      defaultChecked={index === 0}
                      className="accent-blue-600"
                    />
                    {item}
                  </label>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <label className="text-[12px] font-medium">
                Linked Bank <span className="text-red-500">*</span>
              </label>

              <Select
                options={bankOptions}
                placeholder="Select Bank"
                className="mt-2"
                styles={CustomStyles}
              />
            </div>

            <div>
              <label className="text-[12px] font-medium">
                UPI APP <span className="text-red-500">*</span>
              </label>

              <Select
                options={upiOptions}
                placeholder="Select UPI App"
                className="mt-2"
                styles={CustomStyles}
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="text-[12px] font-medium">
              UPI ID <span className="text-red-500">*</span>
            </label>

            <input
              placeholder="Ex : smartstay@oksbi"
              className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
            />
          </div>

          <div className="mt-5">
            <label className="text-[12px] font-medium">
              Display Name <span className="text-red-500">*</span>
            </label>

            <input
              placeholder="Gpay UPI"
              className="w-full mt-2 h-11 px-4 border border-[#E5E7EB] rounded-lg text-sm outline-none focus:border-[#2952CC]"
            />
          </div>

          <div className="mt-5">
            <label className="text-[12px] font-medium">
              Description <span className="text-red-500">*</span>
            </label>

            <textarea
              rows={4}
              placeholder="Describe the notes..."
              className="w-full mt-2 p-4 border border-[#E5E7EB] rounded-lg text-sm resize-none outline-none focus:border-[#2952CC]"
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 px-6 py-4 border-t border-[#E5E7EB]">
          <button
            onClick={handleClose}
            className="px-6 py-2 text-[#6B7280] text-sm font-medium"
          >
            Cancel
          </button>

          <button className="px-8 py-2 bg-[#2952CC] text-white rounded-lg text-sm font-medium hover:bg-[#1E40AF]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPaymentMethod;

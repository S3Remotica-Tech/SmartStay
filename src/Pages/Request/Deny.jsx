/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ErrorMessage from "../../Components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "iconsax-react";

import Select from "react-select";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
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

function Deny({ show, handleClose, heading }) {
  if (!show) return null;

  const statusOptions = [
    {
      label: "On Hold",
      value: "onHold",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[9999]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-[600px] bg-white rounded-lg shadow-xl z-[9999] flex flex-col font-gilroy border border-gray-50"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
                  rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            {heading}
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>

        <div className="px-4 flex-1 show-scrolls overflow-y-auto">
          <div>
            <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
              Status <span className="text-red-600 text-[20px]">*</span>
            </label>

            <Select
              placeholder="Select Status"
              classNamePrefix="custom"
              styles={CustomStyles}
              options={statusOptions}
            />
          </div>

          <div>
            <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
              Commands
            </label>
            <textarea
              placeholder="Enter Commands"
              rows={4}
              className={`w-full text-[15px] text-[#4B4B4B] font-gilroy   border border-[#D9D9D9] rounded-[8px] px-3 py-3 resize-none focus:outline-none focus:ring-0`}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 m-4">
          <button
            onClick={handleClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>

          <button className="flex-1 bg-[#1E45E1] text-white rounded-lg py-2">
            Notify{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Deny;

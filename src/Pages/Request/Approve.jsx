/* eslint-disable react-hooks/exhaustive-deps */
// import React, { useState, useEffect, useRef } from "react";
import React from "react";
// import ErrorMessage from "../../Components/ErrorMessage";
// import { useDispatch, useSelector } from "react-redux";
import { Add, Building4, Calendar, Wifi } from "iconsax-react";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { IoBedOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";

// const CustomStyles = {
//   control: (base, state) => ({
//     ...base,
//     minHeight: "50px",
//     height: "45px",
//     border: "1px solid #D9D9D9",
//     borderRadius: "8px",
//     fontSize: "15px",
//     fontFamily: "Gilroy, sans-serif",
//     fontWeight: 500,
//     boxShadow: "none",
//     alignItems: "center",

//     cursor: state.isDisabled ? "not-allowed" : "pointer",
//     backgroundColor: state.isDisabled
//       ? "#F3F4F6"
//       : state.hasValue
//         ? "#FFF"
//         : "#fff",
//     opacity: state.isDisabled ? 0.7 : 1,
//   }),

//   singleValue: (base, state) => ({
//     ...base,
//     color: state.isDisabled ? "#9CA3AF" : "#333",
//     fontWeight: 600,
//   }),

//   placeholder: (base, state) => ({
//     ...base,
//     color: state.isDisabled ? "#9CA3AF" : "#6B7280",
//   }),

//   option: (base, state) => {
//     const isSelected = state.isSelected;

//     return {
//       ...base,
//       position: "relative",
//       fontSize: 14,
//       padding: "6px 12px",
//       backgroundColor: isSelected
//         ? "#EEF2FF"
//         : state.isFocused
//           ? "#F3F4F6"
//           : "#fff",
//       color: "#111827",
//       cursor: "pointer",

//       whiteSpace: "nowrap",
//       overflow: "visible",

//       paddingLeft: isSelected ? "9px" : "12px",

//       ...(isSelected && {
//         borderLeft: "3px solid #1E45E1",
//         fontWeight: 500,
//       }),
//     };
//   },

//   menu: (base) => ({
//     ...base,
//     backgroundColor: "#fff",
//     border: "1px solid #E5E7EB",
//     borderRadius: "8px",
//     padding: "6px 0",
//     zIndex: 9999,
//     width: "max-content",
//     minWidth: "100%",
//   }),

//   menuList: (base) => ({
//     ...base,
//     maxHeight: "100px",
//     padding: 0,
//     overflowY: "auto",
//   }),

//   valueContainer: (base) => ({
//     ...base,
//     padding: "0 8px",
//   }),

//   indicatorsContainer: (base) => ({
//     ...base,
//     height: "45px",
//   }),

//   dropdownIndicator: (base, state) => ({
//     ...base,
//     padding: "4px",
//     color: state.isDisabled ? "#D1D5DB" : "#6B7280",
//     cursor: state.isDisabled ? "not-allowed" : "pointer",
//   }),

//   indicatorSeparator: () => ({
//     display: "none",
//   }),
// };

function Approve({ show, handleClose }) {
  if (!show) return null;
  // const recurringOptions = [
  //   { value: "nextRecurring", label: "Next Recurring" },
  // ];
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
            Assign Amenity
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>

        <div className="px-4 flex-1 show-scrolls overflow-y-auto">
          <label className="text-xs text-[#7F7F7F] mb-0">Raised by</label>

          <div className="flex items-center gap-3 my-3">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
              JS
            </div>

            <div>
              <label className="font-medium text-[#222222] text-[18px]">
                Jon Snow
              </label>

              <div className="flex gap-2 mt-1">
                <span className=" text-[#4B4B4B] text-[12px] px-2 py-0.5 rounded flex items-center gap-2">
                  <Building4 size="16" color="#1E45E1" /> Ground Floor
                </span>

                <span className=" text-[#4B4B4B] text-[12px] px-2 py-0.5 rounded flex items-center gap-2">
                  <MdOutlineMeetingRoom size="16" color="#1E45E1" /> G005
                </span>

                <span className=" text-[#4B4B4B] text-[12px] px-2 py-0.5 rounded flex items-center gap-2">
                  <IoBedOutline size="16" color="#1E45E1" /> B0006
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-between my-4">
            <label className="text-xs text-[#7F7F7F] mb-2">
              Outstanding Amount{" "}
            </label>
            <div>₹ 2,200</div>
          </div>

          <label className="text-xs text-[#7F7F7F] mb-1">
            Amenity Requested
          </label>
          <div className="flex items-center gap-3  p-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Wifi size="32" color="#1E45E1" />
            </div>

            <div>
              <p className="font-medium mb-1">Wifi</p>
              <p className="text-sm text-[#667085] mb-1">₹399 / Month</p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">
              Activate from <span className="text-red-600 text-[20px]">*</span>
            </label>

            <div
              className="relative"
              //  ref={dateRef}
            >
              <DatePicker
                // selected={date}
                // onChange={(value) => {
                //   setDate(value);
                //   setDateError("");
                // }}
                dateFormat="dd/MM/yyyy"
                placeholder="DD/MM/YYYY"
                minDate={new Date()}
                placeholderText="Select Date"
                className={`w-full h-[50px] rounded-lg px-3 pr-10 text-sm outline-none border `}
              />

              <Calendar
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                color="#1E45E1"
              />
            </div>
            {/* {dateError && <ErrorMessage message={dateError} type="error" />} */}
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
            Approve{" "}
          </button>
        </div>
      </div>
    </>
  );
}
Approve.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default Approve;

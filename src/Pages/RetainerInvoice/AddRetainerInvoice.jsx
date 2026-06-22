/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl } from "react-bootstrap";
import { CloseCircle, Add } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  SearchNormal,
  Setting3,
  Filter,
  ArrowDown,
  AddCircle,
  Calendar,
} from "iconsax-react";

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
function AddRetainerInvoice() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState(false);

  const handleSearch = () => {
    if (!state.login.selectedHostel_Id || search.trim() === "") return;

    // dispatch({
    //   type: "TENANT_SEARCH_LIST_SAGA",
    //   payload: {
    //     hostelId: state.login.selectedHostel_Id,
    //     search,
    //   },
    // });
    setSearchLoading(true);
  };

  const handleClose = () => {
    navigate(`/retainer-invoice/${state.login.selectedHostel_Id}`);
  };

  return (
    <div className="block relative font-gilroy ">
      <div className="relative w-full  bg-white  ">
        <div className="flex items-center justify-between  p-2 sticky top-0  bg-white">
          <h2 className="text-[18px] text-[#222222] font-gilroy font-semibold">
            New Retainer Invoice
          </h2>

          <button
            onClick={handleClose}
            className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 
              items-center px-2 py-1 font-gilroy "
          >
            <Add
              size="24"
              color="#FF0000"
              className="cursor-pointer rotate-45"
            />{" "}
            Close
          </button>
        </div>
        <div className="max-h-[570px] overflow-y-scroll pt-2 mt-2 mr-3 show-scrolls">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-8">
              <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                Tenant Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <div className="flex items-center overflow-hidden rounded-lg  bg-white shadow-sm focus-within:border-[#1E45E1] focus-within:ring-2 focus-within:ring-[#1E45E1]/10 transition-all">
                  <div className="flex-1">
                    <Select
                      placeholder="Search tenant..."
                      classNamePrefix="custom"
                      styles={CustomStyles}
                    />
                  </div>

                  {/* <button
                    type="button"
                    onClick={!searchLoading ? handleSearch : undefined}
                    disabled={searchLoading}
                    className={`h-[48px] w-14 flex items-center justify-center rounded-r-lg bg-[#1E45E1] transition-colors ${
                      searchLoading
                        ? "cursor-not-allowed opacity-80"
                        : "hover:bg-[#1738BB]"
                    }`}
                  >
                    {searchLoading ? (
                      <div className="w-4 h-4 border-2 border-white rounded-lg border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <SearchNormal size="20" color="#FFF" />
                    )}
                  </button> */}
                </div>

                <p className="mt-2 text-xs text-[#6B7280] leading-5">
                  Search existing tenants in the Property Flow ecosystem to
                  auto-fill tenant details.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-8">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Received from{" "}
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <Select
                placeholder="Select Received from"
                classNamePrefix="custom"
                styles={CustomStyles}
              />
              {/* {vendorCategoryError && (
                <ErrorMessage message={vendorCategoryError} type="error" />
              )} */}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Invoice Date
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <div className="relative">
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  placeholderText="Select Date"
                  className={`w-full h-[50px] rounded-[8px] border px-3 pr-10 text-[15px] border-[#D9D9D9]
     focus:outline-none`}
                />

                <Calendar
                  size="20"
                  color="#1E45E1"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>

              {/* {purchaseDateError && (
                <ErrorMessage message={purchaseDateError} type="error" />
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRetainerInvoice;

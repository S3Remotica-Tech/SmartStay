/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Filter, SearchNormal1 } from "iconsax-react";
import { IoCloseOutline } from "react-icons/io5";
import ErrorMessage from "../../Components/ErrorMessage";

const DATE_FORMAT = "DD-MM-YYYY";
const isAll = (opt) => !opt || opt.value === "ALL";


export const EMPTY_VENDOR_EXPENSE_FILTERS = {
  search: "",
  startDate: "",
  endDate: "",
  paymentStatus: "",
  paymentStatusLabel: "",
  categoryId: "",
  categoryName: "",
  minAmount: "",
  maxAmount: "",
};

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "48px",
    height: "48px",
    border: "1px solid #ECEDF0",
    borderRadius: "12px",
    fontSize: "14px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    cursor: "pointer",
    backgroundColor: "#fff",
    "&:hover": { borderColor: state.isFocused ? "#1E45E1" : "#ECEDF0" },
    borderColor: state.isFocused ? "#1E45E1" : "#ECEDF0",
  }),
  valueContainer: (base) => ({ ...base, padding: "0 13px" }),
  singleValue: (base) => ({ ...base, color: "#222222" }),
  placeholder: (base) => ({ ...base, color: "#9C9C9C" }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "#222222", padding: "12px" }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    border: "1px solid #ECEDF0",
    overflow: "hidden",
    zIndex: 9999,
  }),
  menuList: (base) => ({ ...base, maxHeight: "160px", padding: 0 }),
  option: (base, state) => ({
    ...base,
    fontSize: "14px",
    fontFamily: "Gilroy, sans-serif",
    cursor: "pointer",
    color: "#222222",
    padding: "10px 14px",
    backgroundColor: state.isSelected
      ? "#EFF2FF"
      : state.isFocused
        ? "#F3F4F6"
        : "#fff",
  }),
};

const labelClass = "block mb-[10px] text-[14px] font-medium text-[#31373D] font-gilroy";
const inputClass =
  "w-full h-[48px] rounded-[12px] border-[1px] border-[#ECEDF0] px-[12px] text-[16px] font-gilroy " +
  "placeholder:text-[rgba(16,24,40,0.5)] focus:border-[#1E45E1] focus:outline-none";
const datePickerClass =
  "w-full !h-[48px] !rounded-[12px] !border-[#ECEDF0] cursor-pointer font-gilroy text-[14px]";

function VendorExpenseFilter({ show, handleClose, size, selectedVendorId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [errors, setErrors] = useState({});

  const filterOptions =
    state.ComplianceList?.vendorOverviewExpenseList?.filterOptions || {};

  const mapOptions = (list = []) =>
    list.map((item) => ({ value: item.type, label: item.name }));

  const savedFilters =
    state.ComplianceList?.vendorExpenseFilters || EMPTY_VENDOR_EXPENSE_FILTERS;
  const categoryOptions = [
    { value: "ALL", label: "All" },
    ...mapOptions(filterOptions.category),
  ];

  const apiStatus = mapOptions(filterOptions.status);
  const paymentStatusOptions = [
    { value: "ALL", label: "All" },
    ...(apiStatus.length ? apiStatus : ""),
  ];


  console.log("savedFilters", savedFilters)

  useEffect(() => {
    if (!show) return;
    const f = savedFilters;
    setSearch(f.search || "");
    setStartDate(f.startDate ? dayjs(f.startDate, DATE_FORMAT) : null);
    setEndDate(f.endDate ? dayjs(f.endDate, DATE_FORMAT) : null);
    setCategory(
      categoryOptions.find((o) => String(o.value) === String(f.categoryId)) || null
    );
    setStatus(
      paymentStatusOptions.find((o) => o.value === f.paymentStatus) || null
    );
    setMinAmount(f.minAmount ?? "");
    setMaxAmount(f.maxAmount ?? "");
    setErrors({});
  }, [show]);

  const handleReset = () => {
    setSearch("");
    setStartDate(null);
    setEndDate(null);
    setCategory(null);
    setStatus(null);
    setMinAmount("");
    setMaxAmount("");
    setErrors({});
    onApply({ ...EMPTY_VENDOR_EXPENSE_FILTERS });
    dispatch({
      type: "SET_VENDOR_EXPENSE_FILTERS",
      payload: { ...EMPTY_VENDOR_EXPENSE_FILTERS },
    });
  };

  const validate = () => {
    const next = {};
    if (startDate && !endDate) next.endDate = "Please select end date";
    if (endDate && !startDate) next.startDate = "Please select start date";
    if (minAmount !== "" && Number(minAmount) <= 0)
      next.minAmount = "Enter valid amount";
    if (maxAmount !== "" && Number(maxAmount) <= 0)
      next.maxAmount = "Enter valid amount";
    if (
      !next.minAmount &&
      !next.maxAmount &&
      minAmount !== "" &&
      maxAmount !== "" &&
      Number(maxAmount) < Number(minAmount)
    )
      next.maxAmount = "Max must be greater than min";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleApply = () => {
    if (!validate()) return;

    const payload = {
      vendorId: selectedVendorId,
      search: search.trim(),
      startDate: startDate ? dayjs(startDate).format(DATE_FORMAT) : "",
      endDate: endDate ? dayjs(endDate).format(DATE_FORMAT) : "",
      paymentStatus: isAll(status) ? "" : status.value,
      paymentStatusLabel: isAll(status) ? "" : status.label,
      categoryId: isAll(category) ? "" : category.value,
      categoryName: isAll(category) ? "" : category.label,
      minAmount: minAmount !== "" ? Number(minAmount) : "",
      maxAmount: maxAmount !== "" ? Number(maxAmount) : "",
      page: 1,
      size: size
    };

    dispatch({
      type: "SET_VENDOR_EXPENSE_FILTERS", payload: {
        search: search.trim(),
        startDate: startDate ? dayjs(startDate).format(DATE_FORMAT) : "",
        endDate: endDate ? dayjs(endDate).format(DATE_FORMAT) : "",
        paymentStatus: isAll(status) ? "" : status.value,
        paymentStatusLabel: isAll(status) ? "" : status.label,
        categoryId: isAll(category) ? "" : category.value,
        categoryName: isAll(category) ? "" : category.label,
        minAmount: minAmount !== "" ? Number(minAmount) : "",
        maxAmount: maxAmount !== "" ? Number(maxAmount) : "",

      }
    });
    dispatch({
      type: "VENDOR_OVERVIEW_EXPENSE_SAGA",
      payload: payload,
    });
    handleClose()
  };

  return (
    <div>
      {show && (
        <div
          className="fixed inset-0 bg-black/30 z-[1040]"
          onClick={handleClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-screen w-[400px] max-w-[90vw] bg-white shadow-xl z-[1050] flex flex-col transition-transform duration-300 ease-in-out ${show ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between px-[20px] pt-[20px] pb-[16px] flex-shrink-0">
          <div className="flex items-center gap-[16px] text-[#222222] text-[20px] font-semibold font-gilroy">
            <Filter size="24" color="#222222" />
            Filter by
          </div>
          <IoCloseOutline
            onClick={handleClose}
            className="text-[#FF0000] text-[22px] cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-[20px] py-[8px] show-scrolls font-gilroy">
          <div className="mb-[16px]">
            <label className={labelClass}>Search</label>
            <div className="relative">
              <SearchNormal1
                size="18"
                color="#9CA3AF"
                className="absolute left-[8px] top-[15px]"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search expense title"
                className={`${inputClass} !pl-[34px]`}
              />
            </div>
          </div>

          <div className="flex gap-[16px] mb-[16px]">
            <div className="flex-1 min-w-0">
              <label className={labelClass}>From</label>
              <DatePicker
                className={datePickerClass}
                format={DATE_FORMAT}
                placeholder="DD-MM-YYYY"
                value={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setEndDate(null);
                  setErrors((e) => ({ ...e, startDate: "" }));
                }}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
                getPopupContainer={(node) => node.parentElement}
              />
              {errors.startDate && (
                <ErrorMessage message={errors.startDate} type="error" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <label className={labelClass}>To</label>
              <DatePicker
                className={datePickerClass}
                format={DATE_FORMAT}
                placeholder="DD-MM-YYYY"
                value={endDate}
                onChange={(date) => {
                  setEndDate(date);
                  setErrors((e) => ({ ...e, endDate: "" }));
                }}
                disabledDate={(current) =>
                  current &&
                  (current > dayjs().endOf("day") ||
                    (startDate && current < dayjs(startDate).startOf("day")))
                }
                getPopupContainer={(node) => node.parentElement}
              />
              {errors.endDate && (
                <ErrorMessage message={errors.endDate} type="error" />
              )}
            </div>
          </div>

          <div className="mb-[16px]">
            <label className={labelClass}>Payment Status</label>
            <Select
              options={paymentStatusOptions}
              value={status}
              onChange={setStatus}
              styles={selectStyles}
              placeholder="Select"
              isClearable
              menuPlacement="auto"
            />
          </div>

          <div className="mb-[16px]">
            <label className={labelClass}>Expense Category</label>
            <Select
              options={categoryOptions}
              value={category}
              onChange={setCategory}
              styles={selectStyles}
              placeholder="Select"
              isClearable
              menuPlacement="auto"
              noOptionsMessage={() => "No categories"}
            />
          </div>

          <div className="mb-[16px]">
            <label className={labelClass}>Amount Range</label>
            <div className="flex gap-[10px]">
              <div className="flex-1 min-w-0">
                <input
                  type="number"
                  min="0"
                  placeholder="Min"
                  value={minAmount}
                  onChange={(e) => {
                    setMinAmount(e.target.value);
                    setErrors((er) => ({ ...er, minAmount: "" }));
                  }}
                  className={inputClass}
                />
                {errors.minAmount && (
                  <ErrorMessage message={errors.minAmount} type="error" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="number"
                  min={minAmount || "0"}
                  placeholder="Max"
                  value={maxAmount}
                  onChange={(e) => {
                    setMaxAmount(e.target.value);
                    setErrors((er) => ({ ...er, maxAmount: "" }));
                  }}
                  className={inputClass}
                />
                {errors.maxAmount && (
                  <ErrorMessage message={errors.maxAmount} type="error" />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex-shrink-0 flex gap-[16px] px-[20px] py-[20px] bg-white">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 h-[50px] rounded-[7px] bg-[#EFF2FF] text-[#1E45E1] font-gilroy text-[14px] font-medium"
          >
            Reset All
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 h-[50px] rounded-[7px] bg-[#1E45E1] text-white font-gilroy text-[14px] font-medium hover:bg-[#1638B5] transition-colors"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}

VendorExpenseFilter.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  appliedFilters: PropTypes.object,
  onApply: PropTypes.func.isRequired,
};

export default VendorExpenseFilter;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Add, Filter } from "iconsax-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";
import dayjs from "dayjs";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "40px",
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
      fontSize: 13,
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

function LedgerFilter({ show, handleClose, size }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [period, setPeriod] = useState(null);
  const [source, setSource] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const handlePeriodChange = (selected) => {
    setPeriod(selected);
  };

  const handleSourceChange = (selected) => {
    setSource(selected);
  };

  const handleFromDateChange = (date) => {
    setFromDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  const filterOptionsData = useSelector(
    (state) => state.bankingDetails?.allTransactionList?.filterOptions,
  );

  const periodOptions =
    filterOptionsData?.dateFilter?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const sourceOptions =
    filterOptionsData?.source?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];

  const handleReset = () => {
    setPeriod(null);
    setSource(null);
    setFromDate("");
    setToDate("");
  };

  const handleFilterBills = () => {
    const ledgerFilter = {
      startDate: fromDate ? dayjs(fromDate).format("DD/MM/YYYY") : "",
      endDate: toDate ? dayjs(toDate).format("DD/MM/YYYY") : "",
      period: period?.value,
      source: source?.value,
    };

    dispatch({
      type: "SET_BANK_LEDGER_FILTERS",
      payload: ledgerFilter,
    });

    dispatch({
      type: "GET_ALL_TRANSACTION_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        page: 1,
        size: size,
        dateFilter: period?.value,
        fromDate: fromDate ? dayjs(fromDate).format("DD/MM/YYYY") : "",
        toDate: toDate ? dayjs(toDate).format("DD/MM/YYYY") : "",
        source: source?.value,
      },
    });
    setFormLoading(true);
  };

  useEffect(() => {
    if (state.bankingDetails.allTransactionSuccess === 200) {
      setFormLoading(false);
      handleClose();

      dispatch({ type: "REMOVE_GET_ALL_TRANSACTION_REDUCER" });
    }
  }, [state.bankingDetails.allTransactionSuccess]);
  if (!show) return null;
  return (
    <div>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={handleClose} />

      <div className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-xl z-50 flex flex-col">
        <div className="flex items-center justify-between p-2 border-b">
          <h2 className="flex items-center text-[20px] font-semibold text-[#222222] font-gilroy">
            <Filter className="mr-2" size="20" color="#364153" />
            Filter
          </h2>

          <Add
            onClick={handleClose}
            size="22"
            className="rotate-45 text-red-500 cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto m-4">
          <div className="mb-3">
            <label className="block text-xs font-medium text-[#6B7280] mb-2">
              Period
            </label>

            <Select
              styles={CustomStyles}
              placeholder="Select Period"
              options={periodOptions}
              value={period}
              onChange={handlePeriodChange}
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-[#6B7280] mb-2">
              Source
            </label>

            <Select
              styles={CustomStyles}
              placeholder="Select Source"
              options={sourceOptions}
              value={source}
              onChange={handleSourceChange}
            />
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-[#6B7280] mb-2">
              From Date
            </label>

            <div className="relative">
              <DatePicker
                selected={fromDate}
                onChange={handleFromDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                className="w-full h-[45px] text-sm rounded-lg border border-[#D9D9D9] pl-3 pr-10 focus:outline-none focus:ring-0 "
              />

              <Calendar
                size="18"
                color="#1E45E1"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-[#6B7280] mb-2">
              To Date
            </label>

            <div className="relative">
              <DatePicker
                selected={toDate}
                onChange={handleToDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select Date"
                className="w-full h-[45px] text-sm rounded-lg border border-[#D9D9D9] pl-3 pr-10 focus:outline-none focus:ring-0"
              />

              <Calendar
                size="18"
                color="#1E45E1"
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 m-4">
          <button
            type="button"
            onClick={() => handleReset()}
            className="w-1/2 h-10 rounded-lg border border-[#D9D9D9] bg-transparent text-[#222222] font-gilroy font-medium hover:bg-gray-50 transition-colors"
          >
            Reset
          </button>

          <button
            type="submit"
            disabled={formLoading}
            onClick={handleFilterBills}
            className={`bg-[#1E45E1] text-white w-1/2 h-10  px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${
              formLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {formLoading ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  applying...
                </div>
              </>
            ) : (
              <span>Apply</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
LedgerFilter.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  size: PropTypes.any,
};
export default LedgerFilter;

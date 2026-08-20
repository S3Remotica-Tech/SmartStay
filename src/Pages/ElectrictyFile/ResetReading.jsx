import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Warning2,
  Calendar,
  CloseCircle,
  Add,
  ArrowRight2,
} from "iconsax-react";
import CreatableSelect from "react-select/creatable";
import ErrorMessage from "../../Components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const reasonOptions = [
  { value: "meter_replaced", label: "Meter Replaced" },
  { value: "meter_reset", label: "Meter Reset" },
  { value: "other", label: "Other" },
];

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

function ResetReading({ show, handleClose, resetDetails }) {
  const [continueExisting, setContinueExisting] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [reason, setReason] = useState(null);
  const [reasonInput, setReasonInput] = useState("");
  const [date, setDate] = useState(null);
  const [reading, setReading] = useState("");
  const [loading, setLoading] = useState(false);

  const [reasonError, setReasonError] = useState("");
  const [dateError, setDateError] = useState("");
  const [readingError, setReadingError] = useState("");

  const reasonRef = useRef(null);
  const dateRef = useRef(null);
  const readingRef = useRef(null);

  if (!show) return null;

  // const validateForm = () => {
  //   let isValid = true;
  //   let firstErrorRef = null;

  //   setReasonError("");
  //   setDateError("");
  //   setReadingError("");

  //   if (!reason && !reasonInput.trim()) {
  //     setReasonError("Please select or enter a reason");
  //     isValid = false;

  //     if (!firstErrorRef) {
  //       firstErrorRef = reasonRef;
  //     }
  //   }

  //   if (!date) {
  //     setDateError("Please select a starting date");
  //     isValid = false;

  //     if (!firstErrorRef) {
  //       firstErrorRef = dateRef;
  //     }
  //   }

  //   if (!reading?.trim()) {
  //     setReadingError("Please enter meter reading");
  //     isValid = false;

  //     if (!firstErrorRef) {
  //       firstErrorRef = readingRef;
  //     }
  //   }

  //   if (firstErrorRef?.current) {
  //     if (firstErrorRef === dateRef) {
  //       firstErrorRef.current.setFocus?.();
  //     } else {
  //       firstErrorRef.current.focus?.();
  //     }
  //   }

  //   return isValid;
  // };

  const handleSubmit = async () => {
    dispatch({ type: "REMOVE_RESET_EB_METER_READING_ERROR" });
    // if (!validateForm()) return;

    dispatch({
      type: "RESET_EB",
      payload: {
        resetOn: date ? dayjs(date).format("DD-MM-YYYY") : "",
        startReading: Number(reading),
      },
    });

    dispatch({
      type: "RESET_EB_METER_READING_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        roomId: resetDetails?.roomId,
        resetOn: date ? dayjs(date).format("DD-MM-YYYY") : "",
        startReading: reading ? Number(reading) : "",
        resetReason: reason?.label || reasonInput,
      },
    });
    setLoading(true);
  };

  useEffect(() => {
    if (state.UsersList.resetReadingSuccess === 200) {
      setLoading(false);
      handleClose();
    }
  }, [state.UsersList.resetReadingSuccess]);

  useEffect(() => {
    if (state.UsersList.resetEbError) {
      setLoading(false);
    }
  }, [state.UsersList.resetEbError]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_RESET_EB_METER_READING_ERROR" });
    };
  }, []);
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
          <div className="mt-1">
            <Warning2 size="22" color="#F59E0B" variant="Bold" />
          </div>

          <div>
            <h2 className="text-[20px] font-semibold text-[#1F2633]">
              Reset EB Meter Reading
            </h2>

            <p className="text-sm text-[#3C3C4399] mt-1">
              These files will be Reset the meter when the EB meter is replaced
              or its reading starts again from zero.
            </p>
          </div>

          <button onClick={handleClose}>
            <Add size={22} color="#D92D20" className="rotate-45" />
          </button>
        </div>

        <div className="px-4 flex-1 show-scrolls overflow-y-auto space-y-5">
          <div>
            <label className="text-sm font-medium text-[#344054]">
              Reset Reason
            </label>
            <div ref={reasonRef}>
              <CreatableSelect
                value={reason}
                inputValue={reasonInput}
                onInputChange={(value) => {
                  setReasonInput(value);
                  setReasonError("");
                }}
                onChange={(option) => {
                  setReason(option);
                  setReasonInput("");
                  setReasonError("");
                  dispatch({ type: "REMOVE_RESET_EB_METER_READING_ERROR" });
                }}
                onCreateOption={(value) => {
                  const option = {
                    label: value,
                    value,
                  };

                  setReason(option);
                  setReasonInput("");
                  setReasonError("");
                  dispatch({ type: "REMOVE_RESET_EB_METER_READING_ERROR" });
                }}
                options={reasonOptions}
                styles={CustomStyles}
                placeholder="Select or type reason"
              />
            </div>

            {reasonError && <ErrorMessage message={reasonError} type="error" />}
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">
              Starting Date
            </label>

            <div className="relative" ref={dateRef}>
              <DatePicker
                selected={date}
                onChange={(value) => {
                  setDate(value);
                  setDateError("");
                  dispatch({ type: "REMOVE_RESET_EB_METER_READING_ERROR" });
                }}
                dateFormat="dd/MM/yyyy"
                placeholder="DD/MM/YYYY"
                placeholderText="Select Date"
                maxDate={new Date()}
                className={`w-full h-[50px] rounded-lg px-3 pr-10 text-sm outline-none border ${
                  dateError ? "border-red-500" : "border-[#D9D9D9]"
                }`}
              />

              <Calendar
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                color="#1E45E1"
              />
            </div>
            {dateError && <ErrorMessage message={dateError} type="error" />}
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-[#344054]">
                New Meter Reading{" "}
              </label>

              {/* <label className="flex items-center gap-2 text-xs text-[#667085] cursor-pointer">
                <input
                  type="checkbox"
                  checked={continueExisting}
                  className="cursor-pointer"
                  onChange={(e) => {
                    setContinueExisting(e.target.checked);
                  }}
                />
                Continue from existing calculation
              </label> */}
            </div>

            <div className="relative">
              <input
                ref={readingRef}
                value={reading}
                onChange={(e) => {
                  setReading(e.target.value);
                  setReadingError("");
                  dispatch({ type: "REMOVE_RESET_EB_METER_READING_ERROR" });
                }}
                placeholder="00000"
                type="number"
                onWheel={(e) => e.target.blur()}
                className={`w-full h-12 rounded-lg focus:outline-none px-3 border ${
                  readingError ? "border-red-500" : "border-[#D9D9D9]"
                }`}
              />

              <span className="absolute right-3 top-3 text-sm text-[#666]">
                kWh
              </span>
            </div>
            {readingError && (
              <ErrorMessage message={readingError} type="error" />
            )}
          </div>
        </div>
        {state.UsersList.resetEbError && (
          <div className="m-2 text-center flex justify-center">
            <ErrorMessage message={state.UsersList.resetEbError} type="error" />
          </div>
        )}
        <div className="border-t px-5 py-4 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="border border-[#D0D5DD] px-6 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1E45E1] text-white px-6 py-2 rounded-lg text-sm flex items-center gap-2 disabled:opacity-70"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {loading ? "Resetting..." : "Reset Meter"}

            {!loading && <ArrowRight2 size={16} color="#fff" />}
          </button>
        </div>
      </div>
    </>
  );
}

export default ResetReading;

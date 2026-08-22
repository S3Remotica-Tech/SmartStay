/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { CloseCircle } from "iconsax-react";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "Gilroy",
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
function RefundAmount({ show, handleClose, refundDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [refundAmount, setRefundAmount] = useState("");
  const [refundDate, setRefundDate] = useState(null);
  const [refundFrom, setRefundFrom] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [refundAmountError, setRefundAmountError] = useState("");
  const [refundDateError, setRefundDateError] = useState("");
  const [refundFromError, setRefundFromError] = useState("");
  const [formRecordLoading, setFormRecordLoading] = useState(false);

  const InvoiceId =
    refundDetails?.invoiceId || refundDetails?.invoiceInfo?.invoiceId;

  useEffect(() => {
    if (InvoiceId && state?.login?.selectedHostel_Id) {
      dispatch({
        type: "GETINITIALIZEREFUNDDETAILS",
        payload: {
          hostelId: state?.login?.selectedHostel_Id,
          invoiceId: InvoiceId,
        },
      });
    }
  }, []);

  const bankOptions =
    state.InvoiceList?.refundDetails?.listBanks?.map((bank) => ({
      value: bank.bankId,
      label: `${bank.bankName}`,
    })) || [];

  const handleRefundAmount = (e) => {
    const value = e.target.value.trim();
    const maxRefund = Math.abs(
      Number(state.InvoiceList?.refundDetails?.pendingRefund || 0),
    );

    // if (!/^\d*$/.test(value)) return;
    if (!/^\d*\.?\d*$/.test(value)) return;
    if (value.startsWith(".")) return;
    const numValue = Number(value);

    if (value === "") {
      setRefundAmount("");
      setRefundAmountError("Please enter amount");
    } else if (numValue > maxRefund) {
      setRefundAmountError(`Amount cannot exceed ₹${maxRefund}`);
    } else {
      setRefundAmount(value);
      setRefundAmountError("");
    }
  };

  const handleRefundDate = (date) => {
    setRefundAmountError("");
    setRefundDate(date);
    if (!date) setRefundDateError("Please select a date");
    else setRefundDateError("");
  };

  const handleRefundFrom = (selectedOption) => {
    setRefundAmountError("");
    setRefundFrom(selectedOption);
    if (!selectedOption) setRefundFromError("Please select a refund source");
    else setRefundFromError("");
  };

  const handleTransactionId = (e) => {
    setRefundAmountError("");
    setTransactionId(e.target.value);
  };

  const handleSaveInvoiceList = () => {
    dispatch({ type: "REMOVE_REFUNDABLE_ERROR" });
    let valid = true;

    if (!refundAmount || refundAmount <= 0) {
      setRefundAmountError("Please enter refund amount");
      valid = false;
    }
    if (!refundDate) {
      setRefundDateError("Please select  refund date");
      valid = false;
    }
    if (!refundFrom) {
      setRefundFromError("Please select  refund account");
      valid = false;
    }

    if (!valid) return;

    const payload = {
      refundAmount: refundAmount,
      refundDate: dayjs(refundDate).format("DD-MM-YYYY"),
      bankId: refundFrom.value,
      referenceNumber: transactionId,
      invoiceId: InvoiceId,
      hostelId: state?.login?.selectedHostel_Id,
    };

    dispatch({ type: "CREATEREFUND", payload });
    setFormRecordLoading(true);
  };

  useEffect(() => {
    if (state.InvoiceList?.createRefundStatusCode === 200) {
      setFormRecordLoading(false);
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.InvoiceList?.createRefundStatusCode]);

  useEffect(() => {
    if (
      state.createAccount?.networkError ||
      state.InvoiceList.refundableError
    ) {
      setFormRecordLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
        dispatch({ type: "REMOVE_REFUNDABLE_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError, state.InvoiceList.refundableError]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col font-gilroy">
        <div className="relative flex justify-between mb-2 pt-0 border-0 m-4">
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Gilroy",
              textAlign: "start",
            }}
          >
            {`Refund Amount `}
            {(refundDetails?.fullName ||
              refundDetails?.customerInfo?.fullName ||
              state?.UsersList?.customerdetails?.fullName) && (
              <span>
                -
                <span style={{ color: "#1E45E1" }}>
                  {" "}
                  {refundDetails?.fullName ||
                    refundDetails?.customerInfo?.fullName ||
                    state?.UsersList?.customerdetails?.fullName}
                </span>
              </span>
            )}
            {refundDetails?.invoiceNumber && (
              <span>
                -
                <span style={{ color: "#1E45E1" }}>
                  {" "}
                  {refundDetails?.invoiceNumber}
                </span>{" "}
              </span>
            )}
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="flex-1 overflow-y-auto mx-2 my-2 show-scrolls max-h-[500px]">
          <div className="flex items-center gap-2 rounded bg-[#F7F9FF] px-4 py-2">
            {refundDetails?.profilePic ? (
              <img
                src={refundDetails.profilePic}
                alt="profile"
                className="h-[55px] w-[55px] rounded-full object-cover cursor-pointer"
              />
            ) : (
              <div className="flex h-[55px] w-[55px] cursor-pointer items-center justify-center rounded-full bg-[#1E45E1] font-gilroy text-[20px] font-semibold text-white">
                {refundDetails?.initials ||
                  refundDetails?.customerInfo?.initials ||
                  state?.UsersList?.customerdetails?.initials}
              </div>
            )}

            <div>
              <p className="mb-0 font-gilroy text-xl font-semibold">
                {refundDetails?.fullName ||
                  refundDetails?.customerInfo?.fullName ||
                  state?.UsersList?.customerdetails?.fullName}
              </p>

              <div className="mb-2 flex flex-wrap gap-2">
                <span className="rounded-full bg-yellow-400 px-3 py-1 font-gilroy text-xs font-normal text-gray-900">
                  {state.InvoiceList?.refundDetails?.floorName}
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 font-gilroy text-xs font-normal text-gray-900">
                  {state.InvoiceList?.refundDetails?.roomName}
                </span>

                <span className="rounded-full bg-red-100 px-3 py-1 font-gilroy text-xs font-normal text-gray-900">
                  {state.InvoiceList?.refundDetails?.bedName}
                </span>
              </div>
            </div>

            <div className="ml-auto mt-2 text-right">
              <p className="m-0 p-0 font-gilroy text-[14px] font-normal text-[#4B4B4B]">
                Refund Amount
              </p>

              <p className="font-gilroy text-[16px] font-semibold">
                {state.InvoiceList?.refundDetails?.pendingRefund}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2 my-2">
            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Refund Amount{" "}
                <span className="text-[20px] text-red-500">*</span>
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter Amount"
                value={refundAmount}
                onChange={handleRefundAmount}
                onKeyDown={(e) => {
                  if (e.key === "-") e.preventDefault();
                }}
                className="no-spinner h-[50px] w-full rounded-lg border border-[#D9D9D9] px-3 font-gilroy text-[16px] font-medium text-[#4B4B4B] outline-none focus:border-[#D9D9D9] focus:ring-0"
              />

              {refundAmountError.trim() !== "" && (
                <ErrorMessage message={refundAmountError} type="error" />
              )}
            </div>

            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Balance Due <span className="text-[20px] text-red-500">*</span>
              </label>

              <input
                disabled
                type="number"
                min="0"
                step="1"
                placeholder="Enter Amount"
                value={
                  Math.abs(
                    Number(state.InvoiceList?.refundDetails?.pendingRefund) ||
                      0,
                  ) - (Number(refundAmount) || 0)
                }
                className="no-spinner h-[50px] w-full rounded-lg border border-[#D9D9D9] bg-gray-100 px-3 font-gilroy text-[16px] font-medium text-[#4B4B4B] outline-none focus:border-[#D9D9D9] focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Refund Date <span className="text-[20px] text-red-500">*</span>
              </label>

              <div className="relative w-full">
                <div className="datepicker-wrapper relative w-full">
                  <DatePicker
                    className="w-full font-gilroy"
                    style={{ height: 48 }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={refundDate ? dayjs(refundDate) : null}
                    onChange={handleRefundDate}
                    disabledDate={(current) => {
                      const today = dayjs().endOf("day");

                      if (
                        !refundDetails?.invoiceDate &&
                        !refundDetails?.invoiceGeneratedDate
                      ) {
                        return current && current > today;
                      }

                      const baseDate =
                        refundDetails?.invoiceDate ||
                        refundDetails?.invoiceGeneratedDate;

                      const invoiceDate = dayjs(baseDate, "DD/MM/YYYY").startOf(
                        "day",
                      );

                      return (
                        current && (current < invoiceDate || current > today)
                      );
                    }}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".show-scroll") || document.body
                    }
                  />
                </div>
              </div>

              {refundDateError.trim() !== "" && (
                <ErrorMessage message={refundDateError} type="error" />
              )}
            </div>

            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Refund From <span className="text-[20px] text-red-500">*</span>
              </label>

              <Select
                options={bankOptions}
                onChange={handleRefundFrom}
                value={refundFrom}
                placeholder="Please Select"
                className="w-full"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No options available"}
                styles={CustomStyles}
              />

              {refundFromError.trim() !== "" && (
                <ErrorMessage message={refundFromError} type="error" />
              )}
            </div>

            <div className="md:col-span-2">
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Transaction ID
              </label>

              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={handleTransactionId}
                className="h-[50px] w-full rounded-lg border border-[#D9D9D9] px-3 font-gilroy text-[16px] font-medium text-[#4B4B4B] outline-none focus:border-[#D9D9D9] focus:ring-0"
              />
            </div>
          </div>
        </div>
        {state.InvoiceList.refundableError ? (
          <div className="d-flex justify-content-center mt-1 mb-1">
            <ErrorMessage
              message={state.InvoiceList.refundableError}
              type="error"
            />
          </div>
        ) : null}
        `
        <div className="m-4 flex justify-end">
          <div className="mt-4 flex gap-2 text-end">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-gilroy text-[16px] font-normal text-gray-700 transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={formRecordLoading}
              onClick={handleSaveInvoiceList}
              className="flex min-w-[100px] items-center justify-center rounded-lg bg-[#1E45E1] px-4 py-2 font-gilroy text-[16px] font-normal text-white transition hover:bg-[#1838c4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {formRecordLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Refunding...
                </>
              ) : (
                "Refund"
              )}
            </button>
          </div>
        </div>
        `
      </div>
    </div>
  );
}
RefundAmount.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,

  refundDetails: PropTypes.shape({
    invoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    invoiceNumber: PropTypes.string,
    fullName: PropTypes.string,
    profilePic: PropTypes.string,
    initials: PropTypes.string,

    invoiceDate: PropTypes.string,
    invoiceGeneratedDate: PropTypes.string,

    invoiceInfo: PropTypes.shape({
      invoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),

    customerInfo: PropTypes.shape({
      fullName: PropTypes.string,
      initials: PropTypes.string,
    }),
  }).isRequired,
};

export default RefundAmount;

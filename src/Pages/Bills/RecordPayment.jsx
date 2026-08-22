/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";

import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
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
      fontFamily: "Gilroy",
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
function RecordPayment({ show, handleClose, selectedUserId, invoiceList }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [initials, setInitials] = useState("");
  const [formRecordLoading, setFormRecordLoading] = useState(false);

  const calendarRef = useRef(null);
  const [paymodeerrormsg, setPaymodeErrmsg] = useState("");
  const [amounterrormsg, setAmountErrmsg] = useState("");
  const [dateerrmsg, setDateErrmsg] = useState("");
  const [totalErrormsg, setTotalErrmsg] = useState("");
  // const [account, setAccount] = useState("");
  // const [accountError, setAccountError] = useState("");
  const [name, setName] = useState("");
  const [floor_name, setFloorName] = useState("");
  const [room_name, setRoomName] = useState("");
  const [bed_name, setBedName] = useState("");
  const [profile_pic, setProfilePic] = useState(null);

  const [balance, setBalance] = useState(0);
  const [payableAmount, setPayableAmount] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [transactionId, setTransactionId] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");

  useEffect(() => {
    if (state.login.selectedHostel_Id && invoiceList?.invoiceId) {
      dispatch({
        type: "GET_INITIALIZE_RECORD_PAYMENT_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: invoiceList?.invoiceId,
        },
      });
    }
  }, []);

  const TenantDetails = state.InvoiceList?.initializeRecordPayment;

  useEffect(() => {
    if (!selectedUserId) return;

    if (TenantDetails) {
      setName(TenantDetails.customerInfo?.fullName);
      setFloorName(TenantDetails.stayInfo?.floorName);
      setRoomName(TenantDetails.stayInfo?.roomName);
      setBedName(TenantDetails.stayInfo?.bedName);
      setProfilePic(TenantDetails.customerInfo?.profilePic);
      setInitials(TenantDetails?.customerInfo?.initials);
    }
  }, [selectedUserId, TenantDetails]);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    minDate: null,
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (state.InvoiceList.payapleAmountError) {
      setFormRecordLoading(false);
    }
  }, [state.InvoiceList.payapleAmountError]);

  // const handleAccount = (selectedOption) => {
  //   setAccount(selectedOption?.value || "");
  //   setAccountError("");
  //   dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  // };

  const handleTransaction = (selectedOption) => {
    setModeOfPayment(selectedOption);
    // setAccountError("");
    setPaymodeErrmsg("");
    // setAccount("");
  };

  const handleChange = (e) => {
    setTransactionId(e.target.value);
  };

  const bankingOptions = Array.isArray(TenantDetails?.accountInfo)
    ? TenantDetails?.accountInfo?.map((item) => {
        return {
          value: item?.bankId,
          label: `${item?.bankName}`,
        };
      })
    : [];

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormRecordLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const handleAmount = (e) => {
    setAmountErrmsg("");
    let value = e.target.value;
    if (!/^\d*\.?\d{0,2}$/.test(value)) return;
    if (value.startsWith(".")) return;
    if (value !== "") {
      let numValue = parseFloat(value);

      if (numValue > (invoiceList?.balanceDue || 0)) {
        numValue = invoiceList?.balanceDue || 0;
      }

      value = numValue;
      setBalance((invoiceList?.balanceDue || 0) - numValue);
    } else {
      setBalance(invoiceList?.balanceDue || 0);
    }

    setPayableAmount(value);
    dispatch({ type: "CLEAR_PAYABLE_AMOUNT" });
  };

  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
      setPayableAmount("");
      setBalance("");
      setTransactionId("");
      setSelectedDate(null);
      setFormRecordLoading(false);
      handleClose();

      setTimeout(() => {
        dispatch({ type: "CLEAR_RECORD_PAYMENT" });
      }, 3000);
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);

  const convertToYMD = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  const handleSaveRecordPayment = () => {
    dispatch({ type: "CLEAR_PAYABLE_AMOUNT" });
    const formatpaiddate = formatDateForPayload(selectedDate);

    const billDate = convertToYMD(invoiceList?.invoiceDate);
    const paidDate = formatpaiddate;

    if (!payableAmount) {
      setAmountErrmsg("Please Enter Amount");
    } else {
      setAmountErrmsg("");
    }

    if (!formatpaiddate) {
      setDateErrmsg("Please Select Date");
    } else if (paidDate < billDate) {
      setDateErrmsg("Paid date should not be before Bill date");
      return;
    } else {
      setDateErrmsg("");
    }

    if (!modeOfPayment || modeOfPayment === "select") {
      setPaymodeErrmsg("Please Select Transaction Type");
      return;
    }

    // if (modeOfPayment === "Net Banking" && !account) {
    //   // setAccountError("Please Choose Bank Account");
    //   return;
    // }

    if (!payableAmount || !formatpaiddate || !modeOfPayment) {
      setTimeout(() => {
        setTotalErrmsg("");
      }, 1000);
      return;
    }

    if (
      TenantDetails?.invoiceId &&
      payableAmount &&
      modeOfPayment &&
      formatpaiddate &&
      state.login.selectedHostel_Id
    ) {
      dispatch({
        type: "RECORD_PAYMENT",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: TenantDetails?.invoiceId,
          data: {
            bankId: modeOfPayment,
            paymentDate: convertYMDToDMY(formatpaiddate),
            referenceId: transactionId,
            amount: payableAmount,
          },
        },
      });
    }
    setFormRecordLoading(true);
  };

  const convertYMDToDMY = (ymd) => {
    if (!ymd) return null;
    const [year, month, day] = ymd.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60 * 1000);

    const day = String(localDate.getDate()).padStart(2, "0");
    const month = String(localDate.getMonth() + 1).padStart(2, "0");
    const year = localDate.getFullYear();

    return `${year}-${month}-${day}`;
  };
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="relative flex justify-between mb-2 pt-0 border-0 m-4">
          <div className="text-[18px] font-semibold font-gilroy text-left">
            Record Payment
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto mx-2 my-2 show-scrolls max-h-[500px]">
          <div className="mx-2">
            <div className="flex items-center gap-2  rounded-md bg-[#F7F9FF] px-4 py-2">
              {profile_pic ? (
                <img
                  src={profile_pic !== "0" ? profile_pic : ""}
                  alt="profile"
                  className="h-[55px] w-[55px] rounded-full cursor-pointer"
                />
              ) : (
                <div className="flex h-[50px] w-[50px] items-center justify-center rounded-full bg-[#E2E8F0] font-gilroy text-[20px] font-semibold text-[#44536A]">
                  {initials || "-"}
                </div>
              )}

              <div>
                <p className="mb-0 font-gilroy text-xl font-semibold">{name}</p>

                <div className="mb-2 flex gap-2">
                  <span className="rounded-full bg-yellow-400 px-3 py-1 font-gilroy text-xs font-normal text-gray-900">
                    {floor_name}
                  </span>

                  <span className="rounded-full bg-red-100 px-3 py-1 font-gilroy text-xs font-normal text-gray-900">
                    {room_name} - {bed_name}
                  </span>
                </div>
              </div>

              <div className="ml-auto mt-2 text-right">
                <p className="m-0 p-0 font-gilroy text-[14px] font-normal text-[#4B4B4B]">
                  Due Pending
                </p>

                <p className="font-gilroy text-[16px] font-semibold">
                  {TenantDetails?.pendingAmount}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-2 my-2">
            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Paid Amount <span className="text-[20px] text-red-500">*</span>
              </label>

              <input
                type="number"
                min="0"
                step="1"
                placeholder="Enter Amount"
                className="no-spinner h-[50px] w-full rounded-lg border border-[#D9D9D9] px-3 font-gilroy text-[16px] font-medium text-[#4B4B4B] outline-none focus:border-[#D9D9D9] focus:ring-0"
                value={payableAmount}
                onChange={handleAmount}
                // onKeyDown={(e) => {
                //   if (e.key === "-" || e.key === "e") {
                //     e.preventDefault();
                //   }
                // }}
              />

              {amounterrormsg && (
                <ErrorMessage message={amounterrormsg} type="error" />
              )}
            </div>

            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Balance Amount{" "}
                <span className="text-[20px] text-red-500">*</span>
              </label>

              <input
                disabled
                type="number"
                min="0"
                step="1"
                placeholder="Enter Amount"
                value={balance}
                className="no-spinner h-[50px] w-full rounded-lg border border-[#D9D9D9] bg-gray-100 px-3 font-gilroy text-[16px] font-medium text-[#4B4B4B] outline-none focus:border-[#D9D9D9] focus:ring-0 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Paid Date <span className="text-[20px] text-red-500">*</span>
              </label>

              <div className="relative w-full">
                <div className="datepicker-wrapper relative w-full">
                  <DatePicker
                    className="h-12 w-full font-gilroy"
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date) => {
                      setDateErrmsg("");
                      // setAccountError("");
                      setSelectedDate(date ? date.toDate() : null);
                    }}
                    disabledDate={(current) => {
                      const invoiceDate = invoiceList?.invoiceDate
                        ? dayjs(invoiceList.invoiceDate, "DD/MM/YYYY").startOf(
                            "day",
                          )
                        : null;

                      return (
                        (invoiceDate && current.isBefore(invoiceDate, "day")) ||
                        current.isAfter(dayjs().endOf("day"))
                      );
                    }}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".show-scroll") || document.body
                    }
                  />
                </div>
              </div>

              {dateerrmsg.trim() !== "" && (
                <ErrorMessage message={dateerrmsg} type="error" />
              )}
            </div>

            <div>
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Mode of Transaction{" "}
                <span className="text-[20px] text-red-500">*</span>
              </label>

              <Select
                options={bankingOptions}
                onChange={(selectedOption) =>
                  handleTransaction(selectedOption?.value)
                }
                value={
                  modeOfPayment
                    ? bankingOptions.find(
                        (option) => option.value === modeOfPayment,
                      )
                    : null
                }
                placeholder="Please Select"
                className="w-full"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No options available"}
                styles={CustomStyles}
              />

              {paymodeerrormsg.trim() !== "" && (
                <ErrorMessage message={paymodeerrormsg} type="error" />
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <label className="mb-[2px] block font-gilroy text-[14px] font-medium text-[#222222]">
                Transaction ID
              </label>

              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={handleChange}
                className="h-[50px] w-full rounded-lg border border-[#D9D9D9] px-3 font-gilroy text-[16px] font-medium text-[#4B4B4B] outline-none focus:border-[#D9D9D9] focus:ring-0"
              />
            </div>
          </div>

          {totalErrormsg.trim() !== "" && (
            <ErrorMessage message={totalErrormsg} type="error" />
          )}
        </div>

        {state.InvoiceList.payapleAmountError ? (
          <div className="d-flex justify-content-center">
            <ErrorMessage
              message={state.InvoiceList.payapleAmountError}
              type="error"
            />
          </div>
        ) : null}

        <div className="flex justify-end gap-2 m-4">
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
            onClick={handleSaveRecordPayment}
            className="flex min-w-[100px] items-center justify-center rounded-lg bg-[#1E45E1] px-4 py-2 font-gilroy text-[16px] font-normal text-white transition hover:bg-[#1838c4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formRecordLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Recording...
              </>
            ) : (
              "Record"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
RecordPayment.propTypes = {
  show: PropTypes.bool.isRequired,

  handleClose: PropTypes.func.isRequired,

  selectedUserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  invoiceList: PropTypes.shape({
    balanceDue: PropTypes.number,

    invoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    invoiceDate: PropTypes.string,
  }),
};

export default RecordPayment;

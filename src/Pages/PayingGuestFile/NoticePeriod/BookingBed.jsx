/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormControl } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select, { components } from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle, ArrowDown2, Bank, Wallet2, Card } from "iconsax-react";
import ErrorMessage from "../../../Components/ErrorMessage";
import FormComingSoon from "../../../Utils/FormComingSoon";





const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "Gilroy",
    fontWeight: 500,
    boxShadow: "none",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled ? "#F3F4F6" : "#FFF",
    opacity: state.isDisabled ? 0.7 : 1,
    minWidth: 0,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 600,
    maxWidth: "100%",
    overflow: "hidden",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#6B7280",
  }),

  option: (base, state) => ({
    ...base,
    fontSize: 14,
    padding: "6px 12px",
    backgroundColor: state.isSelected
      ? "#EEF2FF"
      : state.isFocused
        ? "#F3F4F6"
        : "#fff",
    color: "#111827",
    cursor: "pointer",
    width: "100%",
    minWidth: 0,
    maxWidth: "100%",
    boxSizing: "border-box",
    fontFamily: "Gilroy",
    overflow: "hidden",
    borderLeft: state.isSelected
      ? "3px solid #1E45E1"
      : "3px solid transparent",
    fontWeight: state.isSelected ? 500 : 400,
  }),

  menu: (base) => ({
    ...base,
    width: "100%",
    minWidth: 0,
    maxWidth: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    overflow: "hidden",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "150px",
    padding: 0,
    overflowY: "auto",
    overflowX: "hidden",
    width: "100%",
    boxSizing: "border-box",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
    minWidth: 0,
    overflow: "hidden",
    flex: 1,
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
    flexShrink: 0,
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



const Option = (props) => {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between gap-2 py-1 w-full min-w-0 overflow-hidden">
        {console.log("data", data)}
        <div className="flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
          <div
            className={`w-9 h-9 shrink-0 rounded-full ${data?.isUpi
              ? "bg-gray-200" : data?.type === "BANK"
                ? "bg-blue-100"
                : data?.type === "CASH"
                  ? "bg-green-100"
                  : "bg-orange-100 text-orange-700"
              } flex items-center justify-center`}
          >
            {data.icon}
          </div>

          <div className="flex-1 min-w-0 overflow-hidden">
            <span className="block text-sm font-semibold text-[#222222] truncate">
              {data.label}
            </span>
            {data.subLabel && (
              <span className="text-xs text-[#6B7280]">{data.subLabel}</span>
            )}          </div>
        </div>

        {data.type && (
          <span
            className={`shrink-0 px-2 py-1 rounded-full text-[10px] font-semibold ${data.type === "BANK"
              ? "bg-blue-100 text-blue-700"
              : data.type === "CASH"
                ? "bg-green-100 text-green-700"
                : "bg-orange-100 text-orange-700"
              }`}
          >
            {data.type}
          </span>
        )}
      </div>
    </components.Option>
  );
};
Option.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    subLabel: PropTypes.string,
    icon: PropTypes.node,
  }).isRequired,
};

const SingleValue = (props) => {
  const { data } = props;

  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2 w-full min-w-0 overflow-hidden">
        <div
          className={`w-7 h-7 shrink-0 rounded-md flex items-center justify-center ${data?.isUpi
            ? "bg-gray-200" : data.type === "BANK"
              ? "bg-blue-100"
              : data.type === "CASH"
                ? "bg-green-100"
                : "bg-orange-100"
            }`}
        >
          {data.icon}
        </div>

        <div className="flex-1 min-w-0 overflow-hidden">
          <span className="block text-sm font-medium truncate capitalize">
            {data.label}
          </span>
          <span className="text-xs text-[#6B7280]">{data.subLabel}</span>
        </div>
      </div>
    </components.SingleValue>
  );
};
SingleValue.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.node,
    subLabel: PropTypes.string,
  }).isRequired,
};
const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <ArrowDown2 size={16} color="#6B7280" />
  </components.DropdownIndicator>
);
DropdownIndicator.propTypes = {
  innerProps: PropTypes.object,
  selectProps: PropTypes.object,
};
const GroupHeading = (props) => (
  <components.GroupHeading {...props}>
    <div className="px-2 py-1 text-xs font-medium text-[#6B7280]">
      {props.data.label}
    </div>
  </components.GroupHeading>
);
GroupHeading.propTypes = {
  data: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};





function BookingBed({ show, handleClose, currentItem, }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const bookingcustomerRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const bookingDateRef = useRef();
  const modeOfPaymentRef = useRef();

  const [amount, setAmount] = useState("");
  const [amountError, setamountError] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState("");
  const [bookingDateErrmsg, setBookingDateErrmsg] = useState("");
  const [dateError, setDateError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [booking_customername, setBookingCustomerName] = useState("");
  const [booking_customererrmsg, setBookingCustomerErrmsg] = useState("");
  // const [customer_details, setCustomerDetails] = useState({})
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      // dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });
    }
  }, []);

  // useEffect(() => {
  //   if (selectedTenant?.tenetId) {
  //     dispatch({
  //       type: "CUSTOMERDETAILS",
  //       payload: { customerId: selectedTenant?.tenetId },
  //     });
  //   }
  // }, [selectedTenant?.tenetId]);

  const CustomerOverView =
    state.UsersList?.customerdetails?.checkoutInfo?.noticeDate;

  const startDate = CustomerOverView
    ? dayjs(CustomerOverView, "DD/MM/YYYY").startOf("day")
    : null;

  const today = dayjs().endOf("day");

  const handleBookingCustomerName = (selectedOption) => {
    setBookingCustomerName(selectedOption?.value || "");
    if (!selectedOption) {
      setBookingCustomerErrmsg("Please Select Name");
    } else {
      setBookingCustomerErrmsg("");
    }
  };

  const handleAmount = (e) => {
    const newAmount = e.target.value;

    if (!/^\d*$/.test(newAmount)) {
      return;
    }

    if (/^0+$/.test(newAmount)) {
      return;
    }

    if (/^0\d+/.test(newAmount)) {
      return;
    }

    setAmount(newAmount);
    setamountError("");
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
  };

  const handleTransactionId = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };

  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    setPaymentError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  // const labelMap = {
  //   CARD: "Card",
  //   CASH: "Cash",
  //   UPI: "UPI",
  //   BANK: "Bank",
  // };



  // const paymentOptionsV1 =
  //   state.UsersList?.availableBedList?.bankDetails?.map((bank) => {
  //     if (bank?.isBank) {
  //       let label = bank?.accountHolderName +
  //         (bank?.bankName != null ? "-" + bank.bankName : "") +
  //         "-" + bank?.accountType;
  //       return {
  //         value: bank.bankId,
  //         label: label,
  //         type: bank.accountType,
  //         icon:
  //           bank.accountType === "BANK" || bank.bankName === "BANK" ? (
  //             <Bank color="#1E45E1" size="16" />
  //           ) : bank.bankName === "CASH" || bank.accountType === "CASH" ? (
  //             <Wallet2 color="#038C3D" size="16" />
  //           ) : (
  //             <Card color="#F59E0B" size="16" />
  //           ),
  //         data: bank,
  //       }
  //     }

  //     let label = bank?.accountHolderName + "-" + (bank?.bankName != null ? "-" + bank.bankName : "") + bank?.accountType
  //     return {
  //       value: bank.bankId,
  //       label: label,
  //       type: bank.type,
  //       icon:
  //         bank.type === "BANK" || bank.bankName === "BANK" ? (
  //           <Bank color="#1E45E1" size="16" />
  //         ) : bank.bankName === "CASH" || bank.type === "CASH" ? (
  //           <Wallet2 color="#038C3D" size="16" />
  //         ) : (
  //           <Card color="#F59E0B" size="16" />
  //         ),
  //       data: bank,
  //     }
  //   }) || [];



  const paymentOptionsV1 =
    state.UsersList?.availableBedList?.bankDetails?.map((bank) => {
      const label = bank?.isBank
        ? `${bank?.displayName || ""}`
        : `${bank?.displayName || ""}`;

      const subLabel = bank?.isBank
        ? `${bank?.bankName || ""}`
        : `${bank?.accountType || ""}`;

      const accountType = bank?.accountType;

      return {
        value: bank?.bankId,
        label: label,
        subLabel: subLabel,
        type: accountType || bank?.bankName,
        isUpi: bank?.isUpi,
        icon: bank?.isUpi && bank?.upiIcon ? (
          <img
            src={bank.upiIcon}
            alt="UPI"
            className="w-5 h-5 object-contain"
          />
        ) : accountType === "BANK" ? (
          <Bank color="#1E45E1" size="16" />
        ) : accountType === "CASH" ? (
          <Wallet2 color="#038C3D" size="16" />
        ) : (
          <Card color="#F59E0B" size="16" />
        ),
        data: bank,
      };
    }) || [];












  const validateAssignField = (value, fieldName, ref, setError, focusedRef) => {
    if (!value || value === "Select a PG") {
      switch (fieldName) {
        case "bookingcustomername":
          setError("Please Select Tenant");
          break;
        case "joiningDate":
          setError("Please Select Joining Date");
          break;
        case "bookingDate":
          setError("Please Select Booking Date");
          break;
        case "amount":
          setError("Please Enter Amount");
          break;
        case "modeOfPayment":
          setError("Please Select Mode of Payment");
          break;
        default:
          break;
      }

      if (ref?.current && !focusedRef.current) {
        ref.current.focus();
        focusedRef.current = true;
      }
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const handleSubmitBooking = () => {
    let hasError = false;
    const focusedRef = { current: false };

    const isCustomerValid = validateAssignField(
      booking_customername,
      "bookingcustomername",
      bookingcustomerRef,
      setBookingCustomerErrmsg,
      focusedRef,
    );

    const isBookingDateValid = validateAssignField(
      bookingDate,
      "bookingDate",
      bookingDateRef,
      setBookingDateErrmsg,
      focusedRef,
    );

    const isAmountValid = validateAssignField(
      amount,
      "amount",
      amountRef,
      setamountError,
      focusedRef,
    );

    const isJoiningDateValid = validateAssignField(
      joiningDate,
      "joiningDate",
      dateRef,
      setJoingDateErrmsg,
      focusedRef,
    );

    const isModeOfPaymentValid = validateAssignField(
      modeOfPayment,
      "modeOfPayment",
      modeOfPaymentRef,
      setPaymentError,
      focusedRef,
    );

    if (
      !isCustomerValid ||
      !isJoiningDateValid ||
      !isBookingDateValid ||
      !isAmountValid ||
      !isModeOfPaymentValid
    ) {
      hasError = true;
    }

    if (Number(amount) <= 0) {
      setamountError("Please Enter Booking Amount");
      if (!focusedRef.current) {
        bookingcustomerRef.current?.focus();
        focusedRef.current = true;
      }
      hasError = true;
    }

    if (hasError) return;

    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(joiningDate);
    const bookingDateForFormatted = formatDate(bookingDate);

    dispatch({
      type: "ADD_BOOKING",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        joiningDate: joiningDateForFormatted,
        bookingDate: bookingDateForFormatted,
        bookingAmount: amount,
        floorId: currentItem?.floorId,
        roomId: currentItem?.roomId,
        bedId: currentItem?.bedId,
        customerId: booking_customername,
        bankId: modeOfPayment,
        referenceNumber: transactionId,
      },
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false);

      setJoingDateErrmsg("");

      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (joiningDate) {
      const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const joiningDateForFormatted = formatDate(joiningDate);
      dispatch({
        type: "AVAILBALEBEDDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          joiningDate: joiningDateForFormatted,
        },
      });
    }
  }, [joiningDate]);

  useEffect(() => {
    if (state.Booking.bookingBedError) {
      setFormLoading(false);

      setTimeout(() => {
        dispatch({ type: "ERROR_BOOKING_REMOVE" });
      }, 1000);
    }
  }, [state.Booking.bookingBedError]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const tenantOptions =
    state.UsersList?.TenantList?.map((u) => ({
      value: u.customerId,
      label: u.fullName,
    })) || [];
  const isComingSoon = false;

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col ">
        <div className="px-4 py-3 shrink-0 relative ">
          <div className="w-100 flex justify-between items-center">
            <div className="!text-lg !font-semibold !font-gilroy">Booking   </div>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer mt-2"
            />
          </div>

          <span className="text-sm text-blue-600 font-semibold !font-gilroy">
            {currentItem.floorName} &nbsp; | &nbsp; {currentItem?.roomName}{" "}
            &nbsp; | &nbsp; {currentItem?.bedName}
          </span>
        </div>
        {isComingSoon ? (
          <FormComingSoon />
        ) : (
          <>
            <div className="px-4 py-1  flex-1 overflow-y-auto show-scrolls">
              <div className="grid grid-cols-12 gap-x-3 gap-y-0">
                <div className="col-span-12 mb-1 -mt-3">
                  <Form.Label className="text-sm font-medium font-gilroy">
                    Select Tenant{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </Form.Label>

                  <Select
                    ref={bookingcustomerRef}
                    options={tenantOptions}
                    onChange={handleBookingCustomerName}
                    value={
                      booking_customername
                        ? (() => {
                          const user = state.UsersList?.TenantList?.find(
                            (u) => u.customerId === booking_customername,
                          );

                          return user
                            ? {
                              value: user.customerId,
                              label: user.fullName,
                            }
                            : null;
                        })()
                        : null
                    }
                    placeholder="Select Tenant"
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    noOptionsMessage={() => "No customers available"}
                    styles={CustomStyles}
                  />
                  {booking_customererrmsg.trim() !== "" && (
                    <ErrorMessage
                      message={booking_customererrmsg}
                      type="error"
                    />
                  )}
                </div>

                <div className="col-span-12 mb-1">
                  <Form.Group controlId="bookingDate">
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Booking Date{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <div className="datepicker-wrapper relative w-full">
                      <DatePicker
                        ref={bookingDateRef}
                        className="w-full h-12 cursor-pointer font-gilroy"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={bookingDate ? dayjs(bookingDate) : null}
                        onChange={(date) => {
                          setDateError("");
                          setBookingDate(date ? date.toDate() : null);
                          setBookingDateErrmsg("");
                          setJoiningDate("");
                        }}
                        disabledDate={(current) => {
                          if (!startDate) return false;

                          return (
                            current.isBefore(startDate) ||
                            current.isAfter(today)
                          );
                        }}
                        getPopupContainer={() => document.body}
                      />
                    </div>

                    {dateError && (
                      <ErrorMessage message={dateError} type="error" />
                    )}

                    {bookingDateErrmsg.trim() !== "" && (
                      <ErrorMessage message={bookingDateErrmsg} type="error" />
                    )}
                  </Form.Group>
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-6 mb-1">
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Booking Amount{" "}
                      <span className="text-red-500 text-xl"> *</span>
                    </Form.Label>

                    <div className="relative">
                      <FormControl
                        type="text"
                        ref={amountRef}
                        id="form-controls"
                        placeholder="Enter Booking Amount"
                        value={amount}
                        onChange={(e) => handleAmount(e)}
                        className={`w-full h-12 text-base font-gilroy text-gray-800 
                        ${amount ? "font-semibold" : "font-medium"} 
                         border border-gray-300 rounded-md shadow-none`}
                      />
                    </div>
                  </Form.Group>
                  {amountError && (
                    <ErrorMessage message={amountError} type="error" />
                  )}
                </div>

                <div className="col-span-12 sm:col-span-6 md:col-span-6 mb-1">
                  <Form.Group className="mb-0">
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Joining Date (Tentative){" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <div className="datepicker-wrapper relative w-full">
                      <DatePicker
                        ref={dateRef}
                        className="w-full h-12 cursor-pointer font-gilroy px-3 py-1.5"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={joiningDate ? dayjs(joiningDate) : null}
                        onChange={(date) => {
                          setDateError("");
                          setJoiningDate(date ? date.toDate() : null);
                          dispatch({ type: "REMOVE_ERROR_BOOKING_DATE" });
                          setJoingDateErrmsg("");
                        }}
                        getPopupContainer={() => document.body}
                        disabledDate={(current) => {
                          if (bookingDate) {
                            return (
                              current &&
                              current.isBefore(dayjs(bookingDate), "day")
                            );
                          }

                          return false;
                        }}
                      />
                    </div>
                  </Form.Group>
                  {dateError && (
                    <ErrorMessage message={dateError} type="error" />
                  )}

                  {joiningDateErrmsg.trim() !== "" && (
                    <ErrorMessage message={joiningDateErrmsg} type="error" />
                  )}
                </div>

                <div className="col-span-12 mb-1">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Mode Of Transaction{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>
                    <Select
                      ref={modeOfPaymentRef}
                      options={paymentOptionsV1}
                      onChange={(selectedOption) =>
                        handleModeOfPaymentChange(selectedOption?.value)
                      }
                      value={
                        modeOfPayment
                          ? paymentOptionsV1?.find(
                            (opt) => opt.value === String(modeOfPayment),
                          ) || null
                          : null
                      }
                      placeholder="Select Payment"
                      noOptionsMessage={() => "No mode available"}
                      styles={CustomStyles}
                      components={{
                        Option,
                        SingleValue,
                        DropdownIndicator,
                        GroupHeading,
                        IndicatorSeparator: () => null,
                      }}
                    />
                  </Form.Group>
                  {paymentError && (
                    <ErrorMessage message={paymentError} type="error" />
                  )}
                </div>

                <div className="col-span-12 mb-1">
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Transaction ID{" "}
                      <span className="invisible text-xl">*</span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      placeholder="Enter Transaction ID"
                      value={transactionId}
                      onChange={(e) => handleTransactionId(e)}
                      className={`w-full h-12 text-base font-gilroy text-gray-800 
  ${transactionId ? "font-semibold" : "font-medium"} 
  border border-gray-300 rounded-md shadow-none`}
                    />
                  </Form.Group>
                </div>
              </div>
            </div>

            {state.Booking.bookingBedError && (
              <div className="d-flex justify-content-center">
                <ErrorMessage
                  message={state.Booking.bookingBedError}
                  type="error"
                />{" "}
              </div>
            )}

            {/* {state.createAccount?.networkError ?
                         <div className="d-flex justify-content-center mt-1 mb-1">
                          <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
                          : null} */}

            {formLoading && (
              <div
                style={{
                  position: "absolute",
                  top: 100,
                  right: 0,
                  bottom: 0,
                  left: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  opacity: 0.75,
                  zIndex: 10,
                }}
              >
                <div
                  style={{
                    borderTop: "4px solid #1E45E1",
                    borderRight: "4px solid transparent",
                    borderRadius: "50%",
                    width: "40px",
                    height: "40px",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              </div>
            )}
            <div className="flex items-center justify-end gap-4 mt-2 !border-t-0 m-4">
              <button
                type="button"
                className="bg-transparent border-none text-gray-800 text-sm font-semibold font-gilroy cursor-pointer"
                onClick={handleClose}
              >
                Cancel
              </button>

              <button
                type="button"
                className="bg-blue-700 text-white font-semibold h-10 rounded-md text-sm font-gilroy px-6 border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmitBooking}
                disabled={formLoading}
              >
                Book
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

BookingBed.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  customerID: PropTypes.func.isRequired,
  selectedTenant: PropTypes.func.isRequired,
};

export default BookingBed;

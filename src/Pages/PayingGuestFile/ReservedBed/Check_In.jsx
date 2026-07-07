/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/AssetFile/addAsset.css";
import {
  Add,
  ArrowDown2,
  ArrowUp2,
  InfoCircle,
  ArrowRight2,
  Edit2,
  CloseCircle,
  AddCircle,
  Trash,
} from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ErrorMessage from "../../../Components/ErrorMessage";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    minWidth: "100%",
    minHeight: "45px",
    height: "45px",
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
    width: "100%",
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

function CheckIn({ show, handleClose, currentItem, pgDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const bookingDateRef = useRef("");

  const [joiningDate, setJoiningDate] = useState(dayjs());
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState([]);
  // const [customer_name, setCustomerName] = useState("")
  const [bookingDate, setBookingDate] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [placeHolderRoomRent, setPlaceHolderRoomRent] = useState("");

  const [isAdvanceRefused, setIsAdvanceRefused] = useState(false);

  const [collectFullRent, setCollectFullRent] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [customRentEnable, setCustomRentEnable] = useState(false);
  const [customRent, setCustomRent] = useState("");
  const [customRentEditMode, setCustomRentEditMode] = useState(true);
  const [oneTimePayments, setOneTimePayments] = useState([]);

  const [oneTimePaymentErrors, setOneTimePaymentErrors] = useState([]);
  const handleCustomRentChange = (e) => {
    setCustomRent(e.target.value);
  };
  const handleAddOneTimePayment = () => {
    setOneTimePayments([
      ...oneTimePayments,
      {
        reason: "",
        reason_name: "",
        customReason: "",
        amount: "",
        showInput: false,
      },
    ]);
  };
  const handleCheckboxChange = (e) => {
    setCollectFullRent(e.target.checked);
  };

  const handleAccordionToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handleInputChangeOneTime = (index, field, value) => {
    const updatedFields = [...oneTimePayments];
    const updatedErrors = [...errors];

    if (field === "reason" || field === "customReason") {
      const cleanedValue = value.replace(/[^A-Za-z ]/g, "");

      if (field === "reason") {
        if (cleanedValue.toLowerCase() === "others") {
          updatedFields[index].showInput = true;
          updatedFields[index].reason_name = "others";
          updatedFields[index].customReason = "";
        } else {
          updatedFields[index].showInput = false;
          updatedFields[index].reason = cleanedValue;
          updatedFields[index].reason_name = cleanedValue;
          updatedFields[index].customReason = "";
        }
      } else if (field === "customReason") {
        updatedFields[index].customReason = cleanedValue;
      }

      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
      let numericValue = value.replace(/[^0-9.]/g, "");

      if (numericValue.startsWith("0")) {
        numericValue = numericValue.replace(/^0+/, "");
      }

      if (numericValue === "") {
        numericValue = "";
      }

      updatedFields[index].amount = numericValue;

      if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setOneTimePayments(updatedFields);
    // setErrorsOneTime(updatedErrors);
  };

  const handleRemoveFieldOneTime = (index) => {
    const updatedFields = [...oneTimePayments];
    updatedFields.splice(index, 1);
    setOneTimePayments(updatedFields);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
  };

  useEffect(() => {
    if (currentItem?.tenetId) {
      dispatch({
        type: "BOOKEDDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customerId: currentItem?.tenetId,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state.UsersList?.bookedDetails) {
      const bookedDateString = state.UsersList.bookedDetails?.bookedDate;

      setBookingDate(
        bookedDateString ? dayjs(bookedDateString, "DD/MM/YYYY") : null,
      );
      setBookingAmount(state.UsersList.bookedDetails?.bookingAmount);
      setPlaceHolderRoomRent(state.UsersList.bookedDetails?.rent);
    }
  }, [state.UsersList?.bookedDetails]);

  const handleRoomRent = (e) => {
    dispatch({ type: "REMOVE_ERROR_INITIALIZE_BED" });
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setRoomRent(newAmount);
    setRoomRentError("");
  };

  const handleAdvanceAmount = (e) => {
    dispatch({ type: "REMOVE_ERROR_INITIALIZE_BED" });
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return;
    }
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
  };

  const [stay_typename, setStayTypeName] = useState("");
  const [stay_typenameErrmsg, setStayTypeNameErrMsg] = useState("");

  const stayTypes = [
    { value: "SHORT", label: "Short Stay" },
    { value: "LONG", label: "Long Stay" },
  ];

  const longStayOnly = stayTypes.filter((s) => s.value === "LONG");

  const handleStayTypeChange = (selectedOption) => {
    dispatch({ type: "REMOVE_ERROR_INITIALIZE_BED" });
    setStayTypeName(selectedOption?.value || "");
    if (!selectedOption) {
      setStayTypeNameErrMsg("Please Select Staytype");
    } else {
      setStayTypeNameErrMsg("");
    }
  };

  // const formatOptions = () => {
  //     return state.UsersList?.Users
  //         ?.filter(user => user.customerId === currentItem.newTenantInfo?.tenetId)
  //         .map(user => ({
  //             value: user.customerId,
  //             label: (
  //                 <div className="d-flex align-items-center">
  //                     <span>{user.firstName}</span>
  //                 </div>
  //             ),
  //         }));
  // };

  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];

  const handleAddField = () => {
    dispatch({ type: "REMOVE_ERROR_INITIALIZE_BED" });
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);

    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  };

  const handleInputChange = (index, field, value) => {
    dispatch({ type: "REMOVE_ERROR_INITIALIZE_BED" });
    const updatedFields = [...fields];
    const updatedErrors = [...errors];

    if (field === "reason" || field === "customReason") {
      const cleanedValue = value.replace(/[^A-Za-z ]/g, "");

      if (field === "reason") {
        if (cleanedValue.toLowerCase() === "others") {
          updatedFields[index].showInput = true;
          updatedFields[index].reason_name = "others";
          updatedFields[index].customReason = "";
        } else {
          updatedFields[index].showInput = false;
          updatedFields[index].reason = cleanedValue;
          updatedFields[index].reason_name = cleanedValue;
          updatedFields[index].customReason = "";
        }
      } else if (field === "customReason") {
        updatedFields[index].customReason = cleanedValue;
      }

      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
      let numericValue = value.replace(/[^0-9.]/g, "");

      if (numericValue.startsWith("0")) {
        numericValue = numericValue.replace(/^0+/, "");
      }

      if (numericValue === "") {
        numericValue = "";
      }

      updatedFields[index].amount = numericValue;

      if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setFields(updatedFields);
    setErrors(updatedErrors);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
    dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
  };

  const handleCheckin = async () => {
    dispatch({ type: "REMOVE_ERROR_INITIALIZE_BED" });
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR_BOOKED" });
    let hasReasonAmountError = false;
    let newErrors = [];
    let hasError = false;

    if (!stay_typename) {
      setStayTypeNameErrMsg("Please Select Staytype");
      hasError = true;
    }

    if (!joiningDate) {
      setJoingDateErrmsg("Please Select Joining Date");
      hasError = true;
    }

    if (!isAdvanceRefused && !AdvanceAmount) {
      setAdvanceAmountError("Please Enter Advance Amount");
      hasError = true;
    }

    if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
      setRoomRentError("Please Enter Rental Amount");
      hasError = true;
    }
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      hasError = true;
    }

    setErrors(newErrors);

    if (!RoomRent && RoomRent !== 0) {
      setRoomRentError("Please Enter Rental Amount");
      hasError = true;
    }
    if (RoomRent <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      hasError = true;
    }
    if (!AdvanceAmount && AdvanceAmount !== 0) {
      setAdvanceAmountError("Please Enter Advance Amount");
      hasError = true;
    }

    // if (AdvanceAmount <= 0) {
    //     setAdvanceAmountError("Please Enter  Advance Amount");
    //     hasError = true;
    // }

    if (hasError) {
      return;
    }

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = joiningDate
      ? incrementDateAndFormat(joiningDate)
      : "";

    setErrors(newErrors);

    const formattedReasons = fields
      .map((item) => {
        let reason_name = "";

        if (
          item.reason?.toLowerCase() === "others" ||
          item.reason_name?.toLowerCase() === "others"
        ) {
          reason_name = item.customReason || item["custom Reason"] || "";
        } else {
          reason_name = item.reason || item.reason_name || "";
        }

        const error = { reason: "", amount: "" };

        if (
          reason_name &&
          (!item.amount || item.amount.toString().trim() === "")
        ) {
          error.amount = "Please enter amount";
          hasReasonAmountError = true;
        }

        if ((!reason_name || reason_name.trim() === "") && item.amount) {
          error.reason = "Please enter reason";
          hasReasonAmountError = true;
        }

        newErrors.push(error);

        return {
          type: reason_name?.trim() || "",
          amount: item.amount || "",
        };
      })
      .filter((item) => item.type !== "" || item.amount !== "");

    if (hasReasonAmountError) return;

    if (
      formattedDate &&
      stay_typename &&
      AdvanceAmount &&
      Number(RoomRent) > 0 &&
      state.UsersList?.bookedDetails?.canCheckIn
    ) {
      dispatch({
        type: "BOOKINGTOCHECKIN",
        payload: {
          customerId: currentItem?.tenetId,
          bookingId: state.UsersList?.bookedDetails?.bookingId,
          joiningDate: formattedDate,
          advanceAmount: Number(AdvanceAmount),
          rentalAmount: Number(RoomRent),
          stayType: stay_typename,
          deductions: formattedReasons,
          isAdvanceIncludedInBooking: true,
        },
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (
      state.UsersList?.statusCodeForAddUser === 201 ||
      state.UsersList?.statusCodeForAddCustomerSaveInfo === 201
    ) {
      setFormLoading(false);
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      handleClose();
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    state.UsersList?.statusCodeForAddCustomerSaveInfo,
  ]);

  useEffect(() => {
    if (
      state.UsersList?.bookingToCheckinStatusCode === 200 ||
      state.UsersList?.bookingToCheckinStatusCode === 201
    ) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_BOOKING_TO_CHECKIN" });
      }, 100);
    }
  }, [state.UsersList?.bookingToCheckinStatusCode]);

  useEffect(() => {
    if (state.UsersList.bedError) {
      setFormLoading(false);
    }
  }, [state.UsersList.bedError]);

  return (
    <>
      <div className="modal show block relative font-gilroy">
        <Modal
          show={show}
          onHide={handleClose}
          centered
          backdrop="static"
          dialogClassName="custom-modals-style"
        >
          <Modal.Dialog className="m-0 p-0 w-full max-w-full rounded-lg">
            <Modal.Header className="pb-3 border-none">
              <div className="flex justify-between w-full p-0">
                <div>
                  <Modal.Title className="!text-lg text-gray-800 !font-gilroy !font-semibold">
                    Check-In Tenant
                  </Modal.Title>
                </div>

                <CloseCircle
                  size={24}
                  color="#000"
                  onClick={handleClose}
                  className="cursor-pointer"
                />
              </div>
            </Modal.Header>

            <Modal.Body className="show-scrolls pt-0 mt-1 mr-3 max-h-96 overflow-y-scroll p-6 font-gilroy">
              <div className="flex items-center gap-3 mb-3 mt-1">
                {currentItem?.profilePic && currentItem?.profilePic !== "0" ? (
                  <Image
                    src={currentItem?.profilePic}
                    roundedCircle
                    className="h-14 w-14"
                    alt="image"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-[#1E45E1] flex items-center justify-center text-white font-gilroy font-semibold text-xl">
                    {currentItem?.tenantInitials || "-"}
                  </div>
                )}
                <div>
                  <div>
                    <p
                      className="block max-w-[120px] truncate text-base font-gilroy font-semibold text-blue-700 cursor-pointer underline mb-1"
                      title={currentItem?.tenantFullName}
                    >
                      {currentItem?.tenantFullName}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-gilroy font-medium">
                      {pgDetails?.floorName}
                    </span>
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full font-gilroy font-medium">
                      {pgDetails?.roomName} - {pgDetails?.bedName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm text-gray-800 font-gilroy">
                    Booking Date
                  </label>
                  <label className="text-sm font-semibold text-gray-900 font-gilroy">
                    {bookingDate ? dayjs(bookingDate).format("DD/MM/YYYY") : ""}
                  </label>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm text-gray-800 font-gilroy">
                    Booking Amount
                  </label>
                  <label className="text-sm font-semibold text-gray-900 font-gilroy">
                    {bookingAmount}
                  </label>
                </div>
                <hr className="border-t border-gray-300 my-2" />
              </div>

              <div className="mb-2 w-full">
                <label className="block text-sm font-medium text-gray-900 font-gilroy mb-1">
                  Stay Type <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={longStayOnly}
                  onChange={handleStayTypeChange}
                  placeholder="Select a Type"
                  classNamePrefix="custom"
                  menuPlacement="auto"
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "50px",
                      border: "1px solid #D9D9D9",
                      borderRadius: "8px",
                      fontSize: "16px",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ced4da",
                      fontFamily: "Gilroy",
                    }),
                    menuList: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      maxHeight: "120px",
                      padding: 0,
                      scrollbarWidth: "thin",
                      overflowY: "auto",
                      fontFamily: "Gilroy",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#9aa0a6",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      display: "inline-block",
                      fill: "currentColor",
                      lineHeight: 1,
                      stroke: "currentColor",
                      strokeWidth: 0,
                      cursor: "pointer",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    option: (base, state) => ({
                      ...base,
                      cursor: state.isDisabled ? "not-allowed" : "pointer",
                      backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                      color: state.isDisabled ? "#aaa" : "#000",
                    }),
                  }}
                />
                {stay_typenameErrmsg.trim() !== "" && (
                  <ErrorMessage message={stay_typenameErrmsg} type="error" />
                )}
              </div>

              <div className="w-full mt-2">
                <label className="block text-sm font-medium text-gray-900 font-gilroy mb-1">
                  Joining Date <span className="text-red-500 text-xl">*</span>
                </label>
                <div className="relative w-full">
                  <DatePicker
                    style={{ width: "100%", height: 48, fontFamily: "Gilroy" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={joiningDate ? dayjs(joiningDate) : null}
                    onChange={(date) => {
                      setJoiningDate(date);
                      setJoingDateErrmsg("");
                      dispatch({ type: "REMOVE_ERROR_INITIALIZE_BED" });
                    }}
                    getPopupContainer={() => document.body}
                    disabledDate={(current) => {
                      if (!current) return false;
                      const bookedAtDayjs = bookingDate
                        ? dayjs(bookingDate, "DD/MM/YYYY")
                        : null;
                      return (
                        (bookedAtDayjs &&
                          current.isBefore(bookedAtDayjs.startOf("day"))) ||
                        current.isAfter(dayjs().endOf("day"))
                      );
                    }}
                  />
                </div>
                {joiningDateErrmsg.trim() !== "" && (
                  <ErrorMessage message={joiningDateErrmsg} type="error" />
                )}
              </div>

              <div className="flex-1 min-w-[200px] mt-2">
                <div className="flex items-start justify-between mb-2">
                  <label className="flex items-center text-sm font-medium text-gray-900 font-gilroy">
                    Advance Amount
                    {!isAdvanceRefused && (
                      <span className="ml-1 text-red-500 text-xl leading-none">
                        *
                      </span>
                    )}
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-700 whitespace-nowrap">
                      Do you want to refuse advance amount?
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAdvanceRefused(!isAdvanceRefused);
                        if (!isAdvanceRefused) {
                          setAdvanceAmount("");
                        }
                      }}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                        isAdvanceRefused ? "bg-[#1E45E1]" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 rounded-full bg-white transition-transform duration-300 ${
                          isAdvanceRefused ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <input
                  type="text"
                  value={AdvanceAmount}
                  onChange={handleAdvanceAmount}
                  disabled={isAdvanceRefused}
                  placeholder="Enter Advance Amount"
                  className={`w-full h-12 rounded-md border px-3 text-sm font-gilroy focus:outline-none focus:ring-0 focus:border-gray-300  ${
                    isAdvanceRefused
                      ? "bg-gray-100 border-gray-200 cursor-not-allowed text-gray-500"
                      : "border-gray-300 text-gray-700"
                  } ${AdvanceAmount ? "font-semibold" : "font-medium"}`}
                />

                {advanceAmountError && (
                  <ErrorMessage message={advanceAmountError} type="error" />
                )}
              </div>

              <div className="bg-[#F7F9FF] pb-4 rounded-lg mt-3 mb-2 p-2">
                <div className="flex justify-between items-center pt-3">
                  <label className="text-sm font-medium text-gray-700 font-gilroy whitespace-nowrap">
                    Non Refundable Amount
                  </label>
                  <button
                    disabled={isAdvanceRefused}
                    onClick={handleAddField}
                    className="flex items-center  justify-center w-fit gap-1.5 bg-[#EAEEFF]  
                                         disabled:bg-gray-100 disabled:text-gray-500
                                         disabled:cursor-not-allowed 
                                         text-[#1E45E1] font-gilroy font-semibold text-sm rounded-lg px-4 py-1.5 mb-2.5"
                  >
                    <AddCircle
                      color={`${isAdvanceRefused ? "#4a4948" : "#1E45E1"}`}
                      size="14"
                    />
                    Add
                  </button>
                </div>

                {fields.map((item, index) => {
                  const isMaintenanceSelected = fields.some(
                    (field) => field.reason === "maintenance",
                  );
                  const filteredOptions = reasonOptions.map((opt) => {
                    if (opt.value === "maintenance") {
                      return {
                        ...opt,
                        isDisabled:
                          isMaintenanceSelected &&
                          item.reason !== "maintenance",
                      };
                    }
                    return opt;
                  });

                  return (
                    <div key={index} className="flex flex-wrap gap-2 mt-2">
                      <div className="flex-1 min-w-[200px]">
                        {!item.showInput ? (
                          <Select
                            options={filteredOptions}
                            value={
                              filteredOptions.find(
                                (opt) => opt.value === item.reason_name,
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.value;
                              handleInputChange(
                                index,
                                "reason",
                                selectedValue === "others"
                                  ? "others"
                                  : selectedValue,
                              );
                            }}
                            isDisabled={item.reason === "maintenance"}
                            menuPlacement="auto"
                            styles={{
                              control: (base) => ({
                                ...base,
                                height: 50,
                                borderRadius: 8,
                                fontSize: 16,
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                              }),
                              menuList: (base) => ({
                                ...base,
                                maxHeight: 120,
                                overflowY: "auto",
                                padding: 0,
                                fontFamily: "Gilroy",
                              }),
                              indicatorSeparator: () => ({ display: "none" }),
                            }}
                          />
                        ) : (
                          <input
                            type="text"
                            placeholder="Enter custom reason"
                            value={item.customReason}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "customReason",
                                e.target.value,
                              )
                            }
                            className="w-full h-12 px-3 border border-gray-300 rounded-lg text-gray-900 font-gilroy font-medium"
                          />
                        )}
                        {errors[index]?.reason && (
                          <ErrorMessage
                            message={errors[index]?.reason}
                            type="error"
                          />
                        )}
                      </div>

                      <div className="flex-1 min-w-[150px]">
                        <input
                          type="text"
                          placeholder="Enter amount"
                          value={item.amount}
                          // onKeyDown={(e) => {
                          //   if (
                          //     e.key === "." ||
                          //     e.key === "e" ||
                          //     e.key === "-"
                          //   ) {
                          //     e.preventDefault();
                          //   }
                          // }}
                          onChange={(e) =>
                            handleInputChange(index, "amount", e.target.value)
                          }
                          className="w-full h-12 px-3 border border-gray-300 rounded-lg text-gray-900 font-gilroy font-medium"
                        />
                        {errors[index]?.amount && (
                          <ErrorMessage
                            message={errors[index]?.amount}
                            type="error"
                          />
                        )}
                      </div>

                      <div className="flex items-center justify-center w-10">
                        <Trash
                          size={20}
                          color="red"
                          className="cursor-pointer"
                          onClick={() => handleRemoveField(index)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap gap-4 ">
                <div className="flex-1 min-w-[200px]">
                  <label className="block text-sm font-medium text-gray-900 font-gilroy mb-1">
                    Rental Amount{" "}
                    <span className="text-red-500 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    value={RoomRent}
                    onChange={handleRoomRent}
                    placeholder={
                      placeHolderRoomRent
                        ? `Selected Bed Rent is ${placeHolderRoomRent}`
                        : "Enter Amount"
                    }
                    className={`w-full h-12 px-3 text-base text-gray-700 font-gilroy 
              rounded-lg border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 
              ${RoomRent ? "font-semibold" : "font-medium"}`}
                  />
                  {roomrentError && (
                    <ErrorMessage message={roomrentError} type="error" />
                  )}
                </div>
              </div>

              <div className="max-w-5xl bg-white">
                <div className="flex items-center gap-2 px-1 py-3">
                  <div className="flex items-center gap-2 ">
                    <input
                      type="checkbox"
                      checked={collectFullRent}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 rounded border border-[#D1D5DB] accent-[#4F46E5] cursor-pointer"
                    />

                    <label className="text-[14px] text-[#222222] font-medium flex items-center gap-2 whitespace-nowrap">
                      Do you want to collect Full Rent for current month?
                      <InfoCircle
                        size="16"
                        color="#9CA3AF"
                        variant="Linear"
                        className="cursor-pointer"
                      />
                    </label>
                  </div>
                  {collectFullRent && (
                    <div>
                      <button
                        onClick={() => setCustomRentEnable(!customRentEnable)}
                        className={`text-sm  whitespace-nowrap rounded-md px-6 py-2 flex items-center gap-2 font-medium transition-all ${
                          customRentEnable
                            ? "bg-[#0D1B8E] text-white"
                            : "bg-[#EAEEFF] text-[#1E45E1]"
                        }`}
                      >
                        {customRentEnable ? (
                          <>
                            Remove Custom Rent
                            <CloseCircle size="18" variant="Bold" />
                          </>
                        ) : (
                          <>
                            Add Custom Rent
                            <ArrowRight2 size="16" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {customRentEnable && (
                  <div className="flex justify-between mt-2 mb-4 border-y border-[#C6D1FF] px-2 py-2">
                    <div>
                      <div className="text-sm font-medium text-[#222222] mb-1">
                        Custom Rent Amount
                      </div>
                      <div className="text-[#64748B] text-[12px] font-medium">
                        This amount is reflects to First month Rent only.
                      </div>
                    </div>
                    <div className="relative min-w-[220px]">
                      {customRentEditMode ? (
                        <>
                          <input
                            type="number"
                            value={customRent}
                            onChange={handleCustomRentChange}
                            onWheel={(e) => e.target.blur()}
                            className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                              customRent ? "font-semibold" : "font-medium"
                            } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 pr-16 focus:outline-none`}
                          />

                          <button
                            onClick={() => setCustomRentEditMode(false)}
                            className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
                          >
                            Set
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center justify-end gap-2 min-w-[220px]  rounded-[8px] h-[50px] px-4">
                          <span className="font-semibold text-[#222222] text-base">
                            ₹ {customRent || 0}
                          </span>

                          <button
                            onClick={() => setCustomRentEditMode(true)}
                            className="text-[#1E45E1]"
                          >
                            <Edit2 size="18" color="#64748B" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="border-1 border-[#F7FAFF] rounded-xl overflow-hidden mb-2">
                  <div
                    onClick={handleAccordionToggle}
                    className="flex items-center justify-between px-4 py-3 bg-[#F7FAFF] cursor-pointer"
                  >
                    <h3 className="text-[14px] font-medium text-[#222222]">
                      Add Onetime Payment
                    </h3>

                    {isOpen ? (
                      <ArrowUp2 size="20" color="#4B5563" variant="Linear" />
                    ) : (
                      <ArrowDown2 size="20" color="#4B5563" variant="Linear" />
                    )}
                  </div>

                  <div className=" bg-[#F7FAFF] rounded-lg p-2 ">
                    {oneTimePayments.map((item, index) => {
                      const isMaintenanceSelected = oneTimePayments.some(
                        (field) => field.reason === "maintenance",
                      );

                      const filteredOptions = reasonOptions.map((opt) => {
                        if (opt.value === "maintenance") {
                          return {
                            ...opt,
                            isDisabled:
                              isMaintenanceSelected &&
                              item.reason !== "maintenance",
                          };
                        }
                        return opt;
                      });

                      return (
                        <div className="row px-4 mb-3" key={index}>
                          <div className="col-md-6">
                            {!item.showInput ? (
                              <Select
                                menuPlacement="bottom"
                                // menuPosition="fixed"
                                options={filteredOptions}
                                value={
                                  filteredOptions.find(
                                    (opt) => opt.value === item.reason_name,
                                  ) || null
                                }
                                onChange={(selectedOption) => {
                                  const selectedValue = selectedOption.value;

                                  if (selectedValue === "others") {
                                    handleInputChangeOneTime(
                                      index,
                                      "reason",
                                      "others",
                                    );
                                  } else {
                                    handleInputChangeOneTime(
                                      index,
                                      "reason",
                                      selectedValue,
                                    );
                                  }
                                }}
                                isDisabled={item.reason === "maintenance"}
                                styles={CustomStyles}
                              />
                            ) : (
                              <>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter custom reason"
                                  value={item.customReason}
                                  onChange={(e) =>
                                    handleInputChangeOneTime(
                                      index,
                                      "customReason",
                                      e.target.value,
                                    )
                                  }
                                  style={{
                                    fontSize: 16,
                                    color: "#4B4B4B",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                    boxShadow: "none",
                                    border: "1px solid #D9D9D9",
                                    height: 45,
                                    borderRadius: 8,
                                  }}
                                />
                              </>
                            )}
                            {oneTimePaymentErrors[index]?.reason && (
                              <ErrorMessage
                                message={oneTimePaymentErrors[index]?.reason}
                                type="error"
                              />
                            )}
                          </div>

                          <div className="col-md-5 relative">
                            <input
                              type="text"
                              placeholder="Enter amount"
                              value={item.amount}
                              //                                  onKeyDown={(e) => {
                              // if (e.key === "." || e.key === "e" || e.key === "-") {
                              //   e.preventDefault();
                              // }
                              // }}
                              onChange={(e) =>
                                handleInputChangeOneTime(
                                  index,
                                  "amount",
                                  e.target.value,
                                )
                              }
                              className="form-control"
                              style={{
                                fontSize: 16,
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                                height: 45,
                                borderRadius: 8,
                              }}
                            />
                            {oneTimePaymentErrors[index]?.amount && (
                              <ErrorMessage
                                message={oneTimePaymentErrors[index]?.amount}
                                type="error"
                              />
                            )}
                            <CloseCircle
                              variant="Bold"
                              size="20"
                              className="absolute right-2 top-0 -translate-y-1/2 text-gray-400 cursor-pointer"
                              onClick={() => handleRemoveFieldOneTime(index)}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {isOpen && (
                    <div className="p-4 bg-[#F7FAFF]">
                      <button
                        onClick={handleAddOneTimePayment}
                        className="w-full h-[32px] rounded-md bg-[#EAEEFF] hover:bg-[#E0E7FF] transition-all duration-200 flex items-center justify-center gap-2 text-[#4F46E5] text-[15px] font-medium"
                      >
                        <Add size="16" color="#4F46E5" variant="Linear" />
                        Add
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>

            {formLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-75 z-10">
                <div className="w-10 h-10 border-4 border-t-blue-700 border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {state.UsersList.bedError ? (
              <ErrorMessage message={state.UsersList.bedError} type="error" />
            ) : null}

            {state.UsersList.bedInitiaLizeError && (
              <div className="d-flex justify-center">
                <ErrorMessage
                  message={state.UsersList.bedInitiaLizeError}
                  type="error"
                />
              </div>
            )}

            <Modal.Footer className="border-0 pt-0">
              <div className="flex justify-end gap-2.5">
                <button
                  onClick={handleClose}
                  className="w-full mt-1 bg-white text-[#1E45E1] font-semibold rounded-[12px] text-sm px-10 py-2.5 font-gilroy border-none"
                >
                  Cancel
                </button>

                <button
                  onClick={handleCheckin}
                  disabled={state.UsersList.bedError || formLoading}
                  className={`w-full mt-1 text-sm font-semibold rounded-[12px] px-10 py-2.5 font-gilroy whitespace-nowrap
        ${state.UsersList.bedError || formLoading ? "bg-blue-300 cursor-not-allowed" : "bg-[#1E45E1] text-white"}`}
                >
                  Check-In
                </button>
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>
    </>
  );
}
CheckIn.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  pgDetails: PropTypes.func.isRequired,
};
export default CheckIn;

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Offcanvas } from "react-bootstrap";
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
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

import addcircle from "../../Assets/Images/New_images/add-circle.png";
import { Row, Col } from "react-bootstrap";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import FormComingSoon from "../../Utils/FormComingSoon";

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

const PGAssignTenant = ({ show, handleClose, currentItem }) => {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const modeofRef = useRef();
  const [activeTab, setActiveTab] = useState("SHORT");
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState([]);
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [checkin_joiningDate, setCheckinJoiningDate] = useState(new Date());
  const [Checkin_joiningDateErrmsg, setCheckinJoingDateErrmsg] = useState("");
  const [isTrigger, setIsTrigger] = useState(false);
  const [placeHolderRoomRent, setPlaceHolderRoomRent] = useState("");

  const [isAdvanceRefused, setIsAdvanceRefused] = useState(false);

  const [collectFullRent, setCollectFullRent] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [customRentEnable, setCustomRentEnable] = useState(false);
  const [customRent, setCustomRent] = useState("");
  const [customRentEditMode, setCustomRentEditMode] = useState(true);
  const [oneTimePayments, setOneTimePayments] = useState([]);

  const hasGracePeriod =
    state?.Settings?.SettingsBillsGetRecurring?.hasGracePeriod;

  const gracePeriodDays = Number(
    state?.Settings?.SettingsBillsGetRecurring?.gracePeriod || 0,
  );
  const joiningDay = dayjs(checkin_joiningDate).date();

  const isGracePeriodApplicable =
    hasGracePeriod && joiningDay <= gracePeriodDays;

  const isjoiningBased =
    state?.Settings?.SettingsBillsGetRecurring?.typeOfBilling ===
    "Joining Date Based";

  const [proRateRent, setProRateRent] = useState(0);

  const [oneTimePaymentErrors, setOneTimePaymentErrors] = useState([]);

  const handleCustomRentChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setCustomRent("");
      return;
    }
    const amount = Number(value);
    if (amount > 0) {
      setCustomRent(amount);
    }
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
    setOneTimePaymentErrors(updatedErrors);
  };

  const handleRemoveFieldOneTime = (index) => {
    const updatedFields = [...oneTimePayments];
    updatedFields.splice(index, 1);
    setOneTimePayments(updatedFields);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setOneTimePaymentErrors(updatedErrors);
  };

  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];

  useEffect(() => {
    if (currentItem) {
      setPlaceHolderRoomRent(currentItem?.rentAmount);
    }
  }, [currentItem]);

  const handleRoomRent = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setRoomRent(newAmount);
    setRoomRentError("");
  };

  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return;
    }
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
  };

  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
  };

  const handleInputChange = (index, field, value) => {
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
  };

  const { canWriteModule: canWriteBooking } = useHasPermission("Booking");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
      // dispatch({
      //   type: "UNASSIGNCUSTOMER",
      //   payload: { hostel_id: state.login.selectedHostel_Id, type: "inactive" },
      // });
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });
      setIsTrigger(true);
    }
  }, []);

  var toastStyle = {
    fontFamily: "Gilroy",
    fontWeight: 600,
    fontSize: 14,
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    padding: "10px",
  };
  useEffect(() => {
    if (state.bankingDetails.bankingList.listBanks) {
      if (
        state.bankingDetails?.bankingList?.listBanks.length === 0 &&
        isTrigger
      ) {
        toast.error(
          <div className="flex items-center gap-2">
            <span style={{ fontFamily: "Gilroy" }}>
              Please Create Banking before adding booking
            </span>
          </div>,
        );
        setIsTrigger(false);
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.bankingList.listBanks]);

  useEffect(() => {
    if (state.UsersList?.TenantList?.length === 0 && isTrigger) {
      toast.error("Please create a new tenant", {
        hideProgressBar: true,
        closeButton: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: toastStyle,
      });
      setIsTrigger(false);
    }
  }, [state.UsersList?.TenantList]);

  const bookingcustomerRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const bookingDateRef = useRef();

  const [dateError, setDateError] = useState("");
  const [booking_customername, setBookingCustomerName] = useState("");
  const [booking_customererrmsg, setBookingCustomerErrmsg] = useState("");
  const [checkin_customername, setCheckinCustomerName] = useState("");
  const [checkin_customererrmsg, setCheckinCustomerErrmsg] = useState("");

  const handleBookingCustomerName = (value) => {
    setBookingCustomerName(value || "");

    if (!value) {
      setBookingCustomerErrmsg("Please Select Name");
    } else {
      setBookingCustomerErrmsg("");
    }
  };

  const handleCheckinCustomerName = (selectedOption) => {
    setCheckinCustomerName(selectedOption?.value || "");
    if (!selectedOption) {
      setCheckinCustomerErrmsg("Please Select Tenant");
    } else {
      setCheckinCustomerErrmsg("");
    }
  };

  const [amount, setAmount] = useState("");
  const [amountError, setamountError] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState("");
  const [bookingDateErrmsg, setBookingDateErrmsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const handleAmount = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) return;

    if (value.startsWith("0")) return;

    setAmount(value);
    setamountError("");
  };

  const [paymentError, setPaymentError] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");

  const [transactionId, setTransactionId] = useState("");
  const handleTransactionId = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };

  const labelMap = {
    CARD: "Card",
    CASH: "Cash",
    UPI: "UPI",
    BANK: "Bank",
  };

  const paymentOptions = Array.isArray(
    state.bankingDetails.bankingList.listBanks,
  )
    ? state.bankingDetails?.bankingList?.listBanks.map((item) => ({
        value: String(item.bankingId),
        label: `${item.accountHolderName} - ${labelMap[item.accountType] || ""}`,
      }))
    : [];

  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    setPaymentError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

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
        case "modeofpayment":
          setError("Please Select Payment Mode");
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

  const validateField = (value, fieldName) => {
    const trimmedValue = String(value ?? "").trim();
    if (!trimmedValue) {
      switch (fieldName) {
        case "checkin_customername":
          setCheckinCustomerErrmsg("Please Select Tenant");
          break;
        case "stay_typename":
          setStayTypeNameErrMsg("Please Select Staytype");
          break;
        case "checkin_joiningDate":
          setCheckinJoingDateErrmsg("Please Select Joining Date");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Please Enter Advance Amount");
          break;
        case "RoomRent":
          setRoomRentError("Please Enter Rental Amount");
          break;
        default:
          break;
      }
      return false;
    }
    return true;
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
    const isJoiningDateValid = validateAssignField(
      joiningDate,
      "joiningDate",
      dateRef,
      setJoingDateErrmsg,
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
    const ismodeofpayment = validateAssignField(
      modeOfPayment,
      "modeofpayment",
      modeofRef,
      setPaymentError,
      focusedRef,
    );

    if (!bookingDate) {
      if (!focusedRef.current && bookingDateRef?.current) {
        bookingDateRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    }

    if (hasError) return;
    if (
      !isCustomerValid ||
      !isJoiningDateValid ||
      !isAmountValid ||
      !isBookingDateValid ||
      !ismodeofpayment
    ) {
      return;
    }

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
        hostelId: currentItem.hostelId,
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
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false);
      setJoingDateErrmsg("");
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (
      state.UsersList?.statusCodeForAddUser === 201 ||
      state.UsersList?.statusCodeForAddCustomerSaveInfo === 201
    ) {
      setFormLoading(false);
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
        dispatch({ type: "REMOVE_STATUS_CODE_FOR_CREATE_CUSTOMER_SAVE_INFO" });
      }, 2000);
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    state.UsersList?.statusCodeForAddCustomerSaveInfo,
  ]);

  const [stay_typename, setStayTypeName] = useState("");
  const [stay_typenameErrmsg, setStayTypeNameErrMsg] = useState("");

  const stayTypes = [
    { value: "SHORT", label: "Short Stay" },
    { value: "LONG", label: "Long Stay" },
    { value: "DAY", label: "Day Stay" },
  ];

  const longStayOnly = stayTypes.filter((s) => s.value === "LONG");

  // onChange handler
  const handleStayTypeChange = (selectedOption) => {
    setStayTypeName(selectedOption?.value || "");
    if (!selectedOption) {
      setStayTypeNameErrMsg("Please Select Staytype");
    } else {
      setStayTypeNameErrMsg("");
    }
  };

  const handleSaveCheckin = () => {
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR" });
    let hasReasonAmountError = false;
    let isHasError = false;
    let hasError = false;

    let newErrors = [];
    let oneTimePaymentErrors = [];

    if (!validateField(checkin_customername, "checkin_customername"))
      hasError = true;
    if (!validateField(stay_typename, "stay_typename")) hasError = true;
    if (!validateField(checkin_joiningDate, "checkin_joiningDate"))
      hasError = true;
    if (!isAdvanceRefused && !validateField(AdvanceAmount, "AdvanceAmount")) {
      hasError = true;
    }

    if (!validateField(RoomRent, "RoomRent")) hasError = true;

    if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
      setRoomRentError("Please Enter Rental Amount");
      return;
    }
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      return;
    }

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

        if (
          (!reason_name || reason_name.toString().trim() === "") &&
          item.amount
        ) {
          error.reason = "Please enter reason";
          hasReasonAmountError = true;
        }

        newErrors.push(error);

        return {
          type: reason_name,
          amount: item.amount || "",
          showInput: !!item.showInput,
        };
      })
      .filter((item) => item.type !== "" || item.amount !== "");

    setErrors(newErrors);

    const formattedReasonsOneTimePayments = oneTimePayments
      ?.map((item) => {
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
          isHasError = true;
        }

        if (
          (!reason_name || reason_name.toString().trim() === "") &&
          item.amount
        ) {
          error.reason = "Please enter reason";
          isHasError = true;
        }

        oneTimePaymentErrors.push(error);

        return {
          type: reason_name,
          amount: Number(item.amount) || "",
        };
      })
      .filter((item) => item.type !== "" || item.amount !== "");

    setOneTimePaymentErrors(oneTimePaymentErrors);

    if (hasReasonAmountError) return;

    if (isHasError) return;

    if (hasError) return;

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = checkin_joiningDate
      ? incrementDateAndFormat(checkin_joiningDate)
      : "";

    const invoiceDateObj = new Date(formattedDate);

    const dueDateObj = new Date(invoiceDateObj);
    dueDateObj.setDate(
      dueDateObj.getDate() +
        (state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth || 0),
    );

    if (
      checkin_customername &&
      stay_typename &&
      currentItem?.floorId &&
      currentItem?.roomId &&
      currentItem?.bedId &&
      checkin_joiningDate &&
      RoomRent > 0
    ) {
      dispatch({
        type: "DIRECT_CHECK_IN_SAGA",
        payload: {
          customerId: checkin_customername,
          hostelId: currentItem?.hostelId,
          floorId: currentItem?.floorId,
          bedId: currentItem?.bedId,
          roomId: currentItem?.roomId,
          joiningDate: formattedDate,
          refundableAmount: Number(!isAdvanceRefused ? AdvanceAmount : 0),
          rentalAmount: RoomRent,
          stayType: activeTab,
          deductions: !isAdvanceRefused ? formattedReasons : null,
          shouldCollectFullRent: collectFullRent,
          customRent: Number(customRent),
          oneTimeDeduction: isAdvanceRefused
            ? formattedReasonsOneTimePayments
            : null,
        },
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList.statusCodeForCheckInCustomer === 201) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES_CHECK_IN" });
      }, 2000);
    }
  }, [state.UsersList.statusCodeForCheckInCustomer]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForDirectCheckInCustomer === 201) {
      setFormLoading(false);
    }
  }, [state.UsersList?.statusCodeForDirectCheckInCustomer]);

  useEffect(() => {
    if (state.UsersList?.bedAvailableError || state.Booking?.bookingBedError) {
      setFormLoading(false);
    }
  }, [state.UsersList?.bedAvailableError, state.Booking?.bookingBedError]);

  const tenantOptions =
    state.UsersList?.TenantList?.map((u) => ({
      value: u.customerId,
      label: u.fullName,
    })) || [];

  const isComingSoon = false;

  const isPastMonth = checkin_joiningDate
    ? dayjs(checkin_joiningDate).isBefore(dayjs(), "month")
    : false;

  const deductionsTotal = fields.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const oneTimeDeductionTotal = oneTimePayments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "SETTINGS_GET_RECURRING",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (!checkin_joiningDate || !RoomRent) {
      setProRateRent(0);
      return;
    }
    const date = dayjs(checkin_joiningDate);
    const totalDays = date.daysInMonth();
    const remainingDays = totalDays - date.date() + 1;
    const amount = Math.round((Number(RoomRent) / totalDays) * remainingDays);
    setProRateRent(amount);
  }, [checkin_joiningDate, RoomRent, customRentEnable]);

  const summaryRent =
    customRentEnable && Number(customRent) > 0
      ? Number(customRent)
      : isGracePeriodApplicable
        ? Number(RoomRent || 0)
        : collectFullRent
          ? Number(RoomRent || 0)
          : isjoiningBased
            ? Number(RoomRent || 0)
            : Number(proRateRent || 0);

  // console.log("summaryRent", summaryRent);

  const totalSummary =
    Number(AdvanceAmount || 0) +
    deductionsTotal +
    oneTimeDeductionTotal +
    summaryRent;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40">
        <div className="h-[calc(100vh-16px)] w-full max-w-[700px] bg-white rounded-[20px] shadow-lg flex flex-col m-2">
          <div className="px-4 py-3 shrink-0 font-gilroy">
            <div className="pt-0 relative border-0 mb-0 flex items-center justify-between">
              <div className="text-xl font-semibold font-gilroy">
                Assign Tenant
                <div>
                  <span className="text-sm font-normal font-gilroy text-blue-700">
                    {currentItem?.floorName}{" "}
                    <span className="text-sm text-blue-700 font-medium font-gilroy">
                      |
                    </span>{" "}
                    {currentItem?.roomName}{" "}
                    <span className="text-sm text-blue-700 font-medium font-gilroy">
                      |
                    </span>{" "}
                    {currentItem?.bedName}
                  </span>
                </div>
              </div>

              <CloseCircle
                size={24}
                color="#000"
                onClick={handleClose}
                className="cursor-pointer -mt-6"
              />
            </div>

            <div className="bg-blue-50 rounded-md w-full p-1 mt-2">
              <div className="flex justify-between gap-2 w-full">
                <button
                  onClick={() => setActiveTab("SHORT")}
                  className={`flex-1 py-2.5 rounded-md font-gilroy font-semibold ${
                    activeTab === "SHORT"
                      ? "bg-blue-700 text-white"
                      : "bg-blue-50 text-black"
                  }`}
                >
                  Check-In
                </button>

                <button
                  onClick={() => setActiveTab("LONG")}
                  className={`flex-1 py-2.5 rounded-md font-gilroy font-semibold ${
                    activeTab === "LONG"
                      ? "bg-blue-700 text-white"
                      : "bg-blue-50 text-black"
                  }`}
                >
                  Booking
                </button>
              </div>
            </div>
          </div>

          {activeTab === "LONG" ? (
            !isComingSoon ? (
              <>
                <div className="flex-1 overflow-y-auto  show-scrolls max-h-[500px]">
                  <div className="grid grid-cols-12 gap-x-4 gap-y-2 items-stretch px-4">
                    <div className="col-span-12">
                      <Form.Group
                        className="mb-1"
                        controlId="exampleForm.ControlInput5"
                      >
                        <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                          Tenant <span className="text-red-600 text-xl">*</span>
                        </Form.Label>
                        <Select
                          options={tenantOptions}
                          onChange={(selected) =>
                            handleBookingCustomerName(selected?.value)
                          }
                          value={
                            tenantOptions.find(
                              (opt) => opt.value === booking_customername,
                            ) || null
                          }
                          placeholder="Select Tenant"
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          noOptionsMessage={() => "No Tenants available"}
                          styles={CustomStyles}
                        />
                        {booking_customererrmsg.trim() !== "" && (
                          <ErrorMessage
                            message={booking_customererrmsg}
                            type="error"
                          />
                        )}
                      </Form.Group>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Form.Group controlId="">
                        <Form.Label className="text-sm font-gilroy font-medium text-[#222222]">
                          Booking Date{" "}
                          <span className="text-red-600 text-xl">*</span>
                        </Form.Label>
                        <div className="datepicker-wrapper relative w-full">
                          <DatePicker
                            ref={bookingDateRef}
                            className={`w-full h-12 cursor-pointer font-gilroy ${bookingDate ? "font-semibold" : "font-medium"}`}
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
                              return current && current > dayjs().endOf("day");
                            }}
                            // getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                            getPopupContainer={() => document.body}
                          />
                        </div>
                        {dateError && (
                          <ErrorMessage message={dateError} type="error" />
                        )}
                        {bookingDateErrmsg.trim() !== "" && (
                          <ErrorMessage
                            message={bookingDateErrmsg}
                            type="error"
                          />
                        )}
                      </Form.Group>
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Form.Group className="">
                        <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                          Booking Amount{" "}
                          <span className="text-red-600 text-xl"> * </span>
                        </Form.Label>
                        <FormControl
                          type="text"
                          ref={amountRef}
                          id="form-controls"
                          placeholder="Enter Booking Amount"
                          value={amount}
                          onChange={(e) => handleAmount(e)}
                          className={`text-base text-[#4B4B4B] font-gilroy border border-[#D9D9D9] shadow-none rounded-md h-12 ${amount ? "font-semibold" : "font-medium"}`}
                        />
                      </Form.Group>
                      {amountError && (
                        <ErrorMessage message={amountError} type="error" />
                      )}
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                          Mode Of Transaction{" "}
                          <span className="text-red-600 text-xl">*</span>
                        </Form.Label>
                        <Select
                          options={paymentOptions}
                          onChange={(selectedOption) =>
                            handleModeOfPaymentChange(selectedOption?.value)
                          }
                          value={
                            modeOfPayment
                              ? paymentOptions.find(
                                  (opt) => opt.value === String(modeOfPayment),
                                ) || null
                              : null
                          }
                          placeholder="Select Payment"
                          menuPlacement="bottom"
                          menuPosition="fixed"
                          // isDisabled={currentItem}
                          noOptionsMessage={() => "No mode available"}
                          styles={{
                            control: (base) => ({
                              ...base,
                              fontSize: 16,
                              color: "rgba(75, 75, 75, 1)",
                              fontFamily: "Gilroy",
                              fontWeight: modeOfPayment ? 600 : 500,
                              border: "1px solid #D9D9D9",
                              borderRadius: "8px",
                              boxShadow: "none",
                              height: 48,
                              cursor: "pointer",
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
                              color: "#9AA0A6",
                            }),
                            dropdownIndicator: (base) => ({
                              ...base,
                              color: "#555",
                              cursor: "pointer",
                            }),
                            option: (base, state) => ({
                              ...base,
                              cursor: "pointer",
                              backgroundColor: state.isFocused
                                ? "lightblue"
                                : "white",
                              color: "#000",
                              fontFamily: "Gilroy",
                            }),
                            indicatorSeparator: () => ({
                              display: "none",
                            }),
                          }}
                        />
                      </Form.Group>
                      {paymentError && (
                        <ErrorMessage message={paymentError} type="error" />
                      )}
                    </div>

                    <div className="col-span-12 md:col-span-6">
                      <Form.Group>
                        <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                          Transaction ID{" "}
                          <span className="text-red-600 text-xl"></span>
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          placeholder="Enter Transaction ID"
                          value={transactionId}
                          onChange={(e) => handleTransactionId(e)}
                          className={`text-base text-[#4B4B4B] font-gilroy border border-[#D9D9D9] shadow-none rounded-md h-12 ${transactionId ? "font-semibold" : "font-medium"}`}
                        />
                      </Form.Group>
                    </div>

                    <div className="col-span-12">
                      <Form.Group controlId="joiningDate">
                        <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                          Joining Date (Tentative){" "}
                          <span className="text-red-600 text-xl">*</span>
                        </Form.Label>

                        <div className="datepicker-wrapper relative w-full mt-2">
                          <DatePicker
                            className="w-full h-12 cursor-pointer font-gilroy"
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            value={joiningDate ? dayjs(joiningDate) : null}
                            onChange={(date) => {
                              setDateError("");
                              setJoiningDate(date ? date.toDate() : null);
                              dispatch({
                                type: "REMOVE_ERROR_BOOKING_DATE",
                              });
                              setJoingDateErrmsg("");
                            }}
                            disabledDate={(current) => {
                              if (!bookingDate) {
                                return true;
                              }
                              return (
                                current &&
                                current.isBefore(dayjs(bookingDate), "day")
                              );
                            }}
                            getPopupContainer={() => document.body}
                          />
                        </div>
                      </Form.Group>
                      {dateError && (
                        <ErrorMessage message={dateError} type="error" />
                      )}

                      {joiningDateErrmsg.trim() !== "" && (
                        <ErrorMessage
                          message={joiningDateErrmsg}
                          type="error"
                        />
                      )}
                    </div>

                    {state.Booking?.bookingBedError ? (
                      <div className="d-flex justify-content-center">
                        <ErrorMessage
                          message={state.Booking?.bookingBedError}
                          type="error"
                        />
                      </div>
                    ) : null}
                  </div>
                </div>

                {formLoading && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
                    <div className="w-10 h-10 rounded-full border-t-4 border-[#1E45E1] border-r-4 border-r-transparent animate-spin"></div>
                  </div>
                )}

                <div className="flex justify-end p-4 ">
                  <Button
                    className="bg-white !font-normal !px-10 !py-1.5 !rounded-lg !text-base !font-gilroy !text-gray-700 border border-white"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>

                  <Button
                    disabled={formLoading || !canWriteBooking}
                    className="!bg-blue-700 !font-medium !rounded-lg !text-base !px-10 !py-1.5 !font-gilroy !text-white"
                    onClick={handleSubmitBooking}
                  >
                    Book
                  </Button>
                </div>
              </>
            ) : (
              <FormComingSoon />
            )
          ) : activeTab === "SHORT" ? (
            <>
              <div className="max-h-[500px] overflow-y-auto px-4 me-1 show-scrolls">
                <div className="grid grid-cols-12 gap-x-4 gap-y-2 items-stretch">
                  <div className="col-span-12">
                    <Form.Group controlId="exampleForm.ControlInput5">
                      <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                        Tenant <span className="text-red-600 text-xl">*</span>
                      </Form.Label>
                      <Select
                        options={
                          state.UsersList?.TenantList?.length > 0
                            ? state.UsersList.TenantList.map((u) => ({
                                value: u.customerId,
                                label: u.fullName,
                              }))
                            : []
                        }
                        onChange={handleCheckinCustomerName}
                        value={
                          checkin_customername
                            ? (() => {
                                const selectedUser =
                                  state.UsersList?.TenantList?.find(
                                    (u) =>
                                      u.customerId === checkin_customername,
                                  );

                                return selectedUser
                                  ? {
                                      value: selectedUser.customerId,
                                      label: selectedUser.fullName,
                                    }
                                  : null;
                              })()
                            : null
                        }
                        placeholder="Select Tenant"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        noOptionsMessage={() => "No Tenants available"}
                        styles={CustomStyles}
                      />
                      {checkin_customererrmsg.trim() !== "" && (
                        <ErrorMessage
                          message={checkin_customererrmsg}
                          type="error"
                        />
                      )}
                    </Form.Group>
                  </div>

                  <div className="col-span-12">
                    <label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal mb-1">
                      Stay Type <span className="text-red-600 text-xl">*</span>
                    </label>

                    <Select
                      options={longStayOnly}
                      onChange={handleStayTypeChange}
                      placeholder="Select a type"
                      classNamePrefix="custom"
                      menuPlacement="auto"
                      noOptionsMessage={() => "No stay types available"}
                      styles={CustomStyles}
                    />

                    {stay_typenameErrmsg.trim() !== "" && (
                      <ErrorMessage
                        message={stay_typenameErrmsg}
                        type="error"
                      />
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-12">
                    <Form.Group controlId="joiningDate">
                      <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                        Joining Date{" "}
                        <span className="text-red-600 text-xl">*</span>
                      </Form.Label>

                      <div className="datepicker-wrapper relative w-full mt-2">
                        <DatePicker
                          className={`w-full h-12 cursor-pointer font-gilroy 
  ${checkin_joiningDate ? "font-semibold text-gray-700" : "font-medium text-gray-400"}
`}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={
                            checkin_joiningDate
                              ? dayjs(checkin_joiningDate)
                              : null
                          }
                          onChange={(date) => {
                            setCheckinJoingDateErrmsg("");
                            setCheckinJoiningDate(date ? date.toDate() : null);
                          }}
                          disabledDate={(current) =>
                            current && current > dayjs().endOf("day")
                          }
                          //  getPopupContainer={(triggerNode) =>
                          //    triggerNode.closest(".datepicker-wrapper")
                          //  }
                          getPopupContainer={() => document.body}
                        />
                      </div>
                    </Form.Group>
                    {Checkin_joiningDateErrmsg && (
                      <ErrorMessage
                        message={Checkin_joiningDateErrmsg}
                        type="error"
                      />
                    )}
                  </div>

                  <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 mb-2">
                    <Form.Group>
                      <div className="flex items-center justify-between ">
                        <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                          Advance amount ₹ (INR)
                          {!isAdvanceRefused && (
                            <span className="text-red-500 text-xl">*</span>
                          )}
                        </Form.Label>

                        <div className="flex items-center justify-between mt-1 gap-2  mb-2">
                          <span className="text-xs text-gray-700 font-medium">
                            Do you want to refuse advance amount?
                          </span>

                          <button
                            type="button"
                            onClick={() => {
                              setIsAdvanceRefused(!isAdvanceRefused);

                              if (!isAdvanceRefused) {
                                setAdvanceAmount("");
                                setFields([]);
                              }

                              setAdvanceAmountError("");
                            }}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                              isAdvanceRefused ? "bg-blue-600" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                                isAdvanceRefused
                                  ? "translate-x-6"
                                  : "translate-x-1"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                      {!isAdvanceRefused && (
                        <FormControl
                          type="text"
                          placeholder="Enter Amount"
                          value={AdvanceAmount}
                          disabled={isAdvanceRefused}
                          onChange={handleAdvanceAmount}
                          className={`text-[14px] text-gray-700 font-gilroy ${
                            AdvanceAmount ? "font-semibold" : "font-medium"
                          } shadow-none border h-12 rounded-md ${
                            isAdvanceRefused
                              ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                              : "border-gray-300"
                          }`}
                        />
                      )}
                    </Form.Group>
                    {advanceAmountError && (
                      <ErrorMessage message={advanceAmountError} type="error" />
                    )}
                  </div>
                </div>

                {!isAdvanceRefused && (
                  <div>
                    <div className="bg-[#F7F9FF] rounded-lg pb-1 mt-2 mb-2">
                      <div className="flex justify-between items-center p-4">
                        <div>
                          <label className="text-sm font-gilroy font-semibold">
                            Non Refundable Amount
                          </label>
                        </div>
                        <div>
                          <Button
                            onClick={handleAddField}
                            className="!flex !items-center !gap-1.5 !bg-blue-700 !text-white !font-semibold !text-sm !rounded-lg !px-6 !py-1.5 !mb-2 !font-gilroy"
                          >
                            <img
                              src={addcircle}
                              alt="Assign Bed"
                              style={{
                                height: 16,
                                width: 16,
                                filter: "brightness(0) invert(1)",
                              }}
                            />
                            Add
                          </Button>
                        </div>
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
                          <div className="row px-4 mb-3" key={index}>
                            <div className="col-md-6">
                              {!item.showInput ? (
                                <Select
                                  menuPlacement="top"
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
                                      handleInputChange(
                                        index,
                                        "reason",
                                        "others",
                                      );
                                    } else {
                                      handleInputChange(
                                        index,
                                        "reason",
                                        selectedValue,
                                      );
                                    }
                                  }}
                                  isDisabled={item.reason === "maintenance"}
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
                                      color: "#555",
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
                                      cursor: state.isDisabled
                                        ? "not-allowed"
                                        : "pointer",
                                      backgroundColor: state.isFocused
                                        ? "#E7F1FF"
                                        : state.isDisabled
                                          ? "#f0f0f0"
                                          : "#fff",
                                      color: state.isDisabled ? "#aaa" : "#000",
                                    }),
                                  }}
                                />
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom reason"
                                    value={item.customReason}
                                    onChange={(e) =>
                                      handleInputChange(
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
                                      height: 50,
                                      borderRadius: 8,
                                    }}
                                  />
                                </>
                              )}
                              {errors[index]?.reason && (
                                <ErrorMessage
                                  message={errors[index]?.reason}
                                  type="error"
                                />
                              )}
                            </div>

                            <div className="col-md-5">
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
                                  handleInputChange(
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
                                  height: 50,
                                  borderRadius: 8,
                                }}
                              />
                              {errors[index]?.amount && (
                                <ErrorMessage
                                  message={errors[index]?.amount}
                                  type="error"
                                />
                              )}
                            </div>

                            <div className="col-md-1 d-flex justify-content-center align-items-center p-0">
                              <Trash
                                size="20"
                                color="red"
                                variant="Bold"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemoveField(index)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <p className="text-[11px] text-gray-500 mt-2">
                      Note: These charges are deducted from the initial security
                      deposit or collected at the time of check-in and are not
                      refundable in any cost.
                    </p>
                  </div>
                )}

                <div className="col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-12 mb-2">
                  <Form.Group>
                    <Form.Label className="font-gilroy text-sm font-medium text-[#222222] not-italic leading-normal">
                      Rental Amount{" "}
                      <span className="text-red-600 text-xl">*</span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      placeholder={
                        placeHolderRoomRent
                          ? `Selected Bed Rent is ${placeHolderRoomRent}`
                          : "Enter Amount"
                      }
                      value={RoomRent}
                      onChange={handleRoomRent}
                      className={`w-full h-[50px] text-base text-[#4B4B4B] font-gilroy 
  ${RoomRent ? "font-semibold" : "font-medium"} 
  shadow-none border border-[#D9D9D9] rounded-lg`}
                    />
                  </Form.Group>
                  {roomrentError && (
                    <ErrorMessage message={roomrentError} type="error" />
                  )}
                </div>
                {!isjoiningBased && (
                  <div className="max-w-5xl bg-white">
                    {!isPastMonth && (
                      <div>
                        <div className="flex items-center gap-2 px-1 py-3">
                          <div className="flex items-center gap-2 ">
                            <input
                              type="checkbox"
                              checked={collectFullRent}
                              onChange={handleCheckboxChange}
                              className="w-4 h-4 rounded border border-[#D1D5DB] accent-[#4F46E5] cursor-pointer"
                            />

                            <label className="text-[14px] text-[#222222] font-medium flex items-center gap-2 whitespace-nowrap">
                              Do you want to collect Full Rent for current
                              month?
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
                                onClick={() => {
                                  setCustomRentEnable(!customRentEnable);
                                  setCustomRent("");
                                }}
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
                                This amount is reflects to First month Rent
                                only.
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
                                      customRent
                                        ? "font-semibold"
                                        : "font-medium"
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
                      </div>
                    )}

                    {/* {isAdvanceRefused && (
                          <div className="border-1 border-[#F7FAFF] rounded-xl overflow-hidden mb-2">
                            <div
                              onClick={handleAccordionToggle}
                              className="flex items-center justify-between px-4 py-3 bg-[#F7FAFF] cursor-pointer"
                            >
                              <h3 className="text-[14px] font-medium text-[#222222]">
                                Add Onetime Payment
                              </h3>

                              {isOpen ? (
                                <ArrowUp2
                                  size="20"
                                  color="#4B5563"
                                  variant="Linear"
                                />
                              ) : (
                                <ArrowDown2
                                  size="20"
                                  color="#4B5563"
                                  variant="Linear"
                                />
                              )}
                            </div>

                            <div className=" bg-[#F7FAFF] rounded-lg p-2 ">
                              {oneTimePayments.map((item, index) => {
                                const isMaintenanceSelected =
                                  oneTimePayments.some(
                                    (field) => field.reason === "maintenance",
                                  );

                                const filteredOptions = reasonOptions.map(
                                  (opt) => {
                                    if (opt.value === "maintenance") {
                                      return {
                                        ...opt,
                                        isDisabled:
                                          isMaintenanceSelected &&
                                          item.reason !== "maintenance",
                                      };
                                    }
                                    return opt;
                                  },
                                );

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
                                              (opt) =>
                                                opt.value === item.reason_name,
                                            ) || null
                                          }
                                          onChange={(selectedOption) => {
                                            const selectedValue =
                                              selectedOption.value;

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
                                          isDisabled={
                                            item.reason === "maintenance"
                                          }
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
                                          message={
                                            oneTimePaymentErrors[index]?.reason
                                          }
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
                                          message={
                                            oneTimePaymentErrors[index]?.amount
                                          }
                                          type="error"
                                        />
                                      )}
                                      <CloseCircle
                                        variant="Bold"
                                        size="20"
                                        className="absolute right-2 top-0 -translate-y-1/2 text-gray-400 cursor-pointer"
                                        onClick={() =>
                                          handleRemoveFieldOneTime(index)
                                        }
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
                                  <Add
                                    size="16"
                                    color="#4F46E5"
                                    variant="Linear"
                                  />
                                  Add
                                </button>
                              </div>
                            )}
                          </div>
                        )} */}
                  </div>
                )}

                {/* <div>
                      <div
                        className="rounded-xl p-4 text-white shadow-md
       bg-[#132197]"
                      >
                        <p className="text-xs uppercase tracking-wide opacity-80 mb-1">
                          Summary
                        </p>

                        <h2 className="text-2xl font-semibold mb-3">
                          ₹ {totalSummary}
                        </h2>

                        <div className="border-t border-white/20 mb-3"></div>

                        <div className="text-xs space-y-2">
                          <div className="flex justify-between">
                            <span>1. Advance Amount</span>
                            <span>₹ {AdvanceAmount || 0}</span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              2. Non Refundable Amount
                              <span className="opacity-70">
                                {" "}
                                (Deducted from Advance 1)
                              </span>
                            </span>
                            <span> ₹ {deductionsTotal || 0}</span>
                          </div>

                          <div className="flex justify-between">
                            <span>
                              {customRentEnable
                                ? "3. Base Rent (Custom Rent)"
                                : isGracePeriodApplicable ||
                                    collectFullRent ||
                                    isjoiningBased
                                  ? "3. Base Rent (Full Rent)"
                                  : "3. Base Rent (Pro-rate for Current Month)"}
                            </span>

                            <span>₹ {summaryRent}</span>
                          </div>
                          {hasGracePeriod && !customRentEnable && (
                            <div className="mt-2 mx-1 w-fit rounded px-1">
                              <p className="mb-0 text-xs italic text-white opacity-70">
                                <span className="font-semibold">Note:</span> 1–
                                {
                                  state?.Settings?.SettingsBillsGetRecurring
                                    ?.gracePeriod
                                }
                                : Full Rent •{" "}
                                {Number(
                                  state?.Settings?.SettingsBillsGetRecurring
                                    ?.gracePeriod,
                                ) + 1}{" "}
                                {""}
                                onwards: Prorated Rent
                              </p>
                            </div>
                          )}

                          <div className="flex justify-between">
                            <span>
                              4. One Time payment
                              <span className="opacity-70"></span>
                            </span>
                            <span>₹ {oneTimeDeductionTotal || 0}</span>
                          </div>
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-500 mt-2">
                        Note: System automatically generates a separate invoices
                        for Advance & Base Rent
                      </p>
                    </div> */}
              </div>
              {formLoading && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-75 z-10">
                  <div className="w-10 h-10 border-4 border-t-blue-600 border-r-transparent rounded-full animate-spin"></div>
                </div>
              )}
              {state.UsersList?.bedAvailableError ? (
                <div className="flex justify-center">
                  <ErrorMessage
                    message={state.UsersList?.bedAvailableError}
                    type="error"
                  />
                </div>
              ) : null}

              <div className="flex justify-end p-4">
                <Button
                  className="!bg-white !font-normal !px-10 !py-1.5 !rounded-lg !text-base !font-gilroy !text-gray-600 !border !border-white"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  disabled={formLoading}
                  className="!bg-blue-700 !font-medium !rounded-lg !text-base !px-10 !py-1.5 !font-gilroy !text-white"
                  onClick={handleSaveCheckin}
                >
                  Check-In
                </Button>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};
PGAssignTenant.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
};

export default PGAssignTenant;

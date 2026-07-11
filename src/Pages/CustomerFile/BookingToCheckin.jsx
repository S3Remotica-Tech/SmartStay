/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl, Image } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { AddCircle, CloseCircle } from "iconsax-react";
import { JoininDatecustomer } from "../../Redux/Action/LoginAction";
import { Trash } from "iconsax-react";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import ErrorMessage from "../../Components/ErrorMessage";
import FormComingSoon from "../../Utils/FormComingSoon";
import { IoBedOutline } from "react-icons/io5";
import PgLayoutView from "../PayingGuestFile/PgLayoutView";
import {
  Add,
  ArrowDown2,
  ArrowUp2,
  InfoCircle,
  ArrowRight2,
  Edit2,
} from "iconsax-react";

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
function BookingToCheckin({ tenantDetails, show, handleClose }) {
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [pgLayout, setPgLatyout] = useState(false);
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [Bed, setBed] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  const [placeHolderRoomRent, setPlaceHolderRoomRent] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [isAdvanceRefused, setIsAdvanceRefused] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
  const [oneTimePayments, setOneTimePayments] = useState([]);
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [dateError, setDateError] = useState("");
  if (!show) return null;

  const canCheckIn = state.UsersList?.bookedDetails?.canCheckIn || false;
  console.log("tenantDetails", tenantDetails);

  console.log("pgLayout", pgLayout);

  const [errors, setErrors] = useState([]);
  const [oneTimePaymentErrors, setOneTimePaymentErrors] = useState([]);
  // const [errorsOneTime, setErrorsOneTime] = useState([]);

  const [activeTab, setActiveTab] = useState("LONG");

  const [availableBed, setAvailableBed] = useState("");
  const [bedWarning, setBedWarning] = useState("");

  const [fields, setFields] = useState([]);
  const [collectFullRent, setCollectFullRent] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [customRentEnable, setCustomRentEnable] = useState(false);
  const [customRent, setCustomRent] = useState("");
  const [customRentEditMode, setCustomRentEditMode] = useState(true);
  const [proRateRent, setProRateRent] = useState(0);

  const hasGracePeriod =
    state?.Settings?.SettingsBillsGetRecurring?.hasGracePeriod;

  const gracePeriodDays = Number(
    state?.Settings?.SettingsBillsGetRecurring?.gracePeriod || 0,
  );
  const joiningDay = dayjs(selectedDate).date();

  const isGracePeriodApplicable =
    hasGracePeriod && joiningDay <= gracePeriodDays;

  const isjoiningBased =
    state?.Settings?.SettingsBillsGetRecurring?.typeOfBilling ===
    "Joining Date Based";

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

  const handleAdd = () => {
    console.log("Add clicked");
  };

  const roomOptions =
    state.PgList?.roomsList?.map((item) => ({
      value: item.id,
      label: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <span style={{ fontWeight: 600 }}>{item.name}</span>

          <span
            style={{
              backgroundColor: "#E9F2FF",
              color: "#2563EB",
              padding: "2px 8px",
              borderRadius: "12px",
              fontSize: "12px",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {item?.sharingType || 0}
          </span>
        </div>
      ),
    })) || [];

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setErrors(updatedErrors);
  };

  const handleRemoveFieldOneTime = (index) => {
    const updatedFields = [...oneTimePayments];
    updatedFields.splice(index, 1);
    setOneTimePayments(updatedFields);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setOneTimePaymentErrors(updatedErrors);
  };

  const options = {
    dateFormat: "Y/m/d",
    maxDate: null,
    minDate: new Date(),
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "ALLFLOORLIST",
  //       payload: { hostel_id: state.login.selectedHostel_Id },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (Floor) {
      dispatch({ type: "GETALLROOMSLIST", payload: { floor_Id: Floor } });
    }
  }, [Floor]);

  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_ALL_ROOMS_STATUS_CODE" });
      }, 100);
    }
  }, [state?.PgList?.getAllRoomSuccessStatus]);

  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_ALL_FLOOR_LIST" });
      }, 500);
    }
  }, [state.UsersList.floorListStatusCode]);

  const handleFloor = (selectedOption) => {
    setFloor(selectedOption?.value || "");
    setRooms("");
    setBed("");
    setRoomRent("");
    setfloorError("");
  };

  const handleRooms = (selectedValue) => {
    setRooms(selectedValue);
    setBed("");

    setRoomRent("");
    setRoomError("");
  };

  useEffect(() => {
    if (Rooms) {
      const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter(
        (view) => {
          return view.roomId === Rooms;
        },
      );
      setAvailableBed(filteredBed);

      const isBedAvailable = filteredBed?.some((bed) => bed.bedId === Bed);

      if (!isBedAvailable) {
        setBedWarning("booked bed is unavailable");
      } else {
      }
    }
  }, [Rooms, selectedDate, state.UsersList?.availableBedList?.listBeds]);

  useEffect(() => {
    if (state.UsersList.bedInitiaLizeError) {
      setBedWarning(state.UsersList.bedInitiaLizeError);
    }
  }, [state.UsersList.bedInitiaLizeError]);

  const handleBed = (selectedOption) => {
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR" });
    setBedWarning("");
    const selectedBedId = selectedOption?.value || "";
    setBed(selectedBedId);

    setBedError("");
  };

  useEffect(() => {
    if (Bed) {
      const selectedBed = state.UsersList?.availableBedList?.listBeds?.find(
        (bed) => String(bed.bedId) === String(Bed),
      );
      if (selectedBed) {
        setPlaceHolderRoomRent(selectedBed.rentmount);
        if (selectedBed.showWarning) {
          setBedWarning(selectedBed.warningMessage);
        } else {
          setBedWarning("");
        }
      }

      setBedError("");
    }
  }, [Bed]);

  const handleRoomRent = (e) => {
    const value = e.target.value;

    if (value === "" || /^[1-9]\d*$/.test(value)) {
      setRoomRent(value);
      setRoomRentError("");
    }
  };

  const handleAdvanceAmount = (e) => {
    const value = e.target.value;

    if (value === "" || /^(0|[1-9]\d*)$/.test(value)) {
      setAdvanceAmount(value);
      setAdvanceAmountError("");
    }
  };

  const handleCloseAssign = () => {
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR" });
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  // console.log("tenantDetails", tenantDetails);

  const CustomerOverView = state?.UsersList?.customerdetails;

  useEffect(() => {
    if (CustomerOverView) {
      setId(CustomerOverView?.customerId);

      const profilePic = CustomerOverView?.profilePic;

      if (
        !profilePic ||
        profilePic === "0" ||
        !String(profilePic).startsWith("http")
      ) {
        setFile(null);
      } else {
        setFile(profilePic);
      }

      setFirstname(CustomerOverView?.fullName);
      if (canCheckIn) {
        setRooms(CustomerOverView.hostelInfo?.roomId);
        setFloor(CustomerOverView.hostelInfo?.floorId);
        setBed(CustomerOverView?.hostelInfo?.bedId);
      }
    }
  }, [CustomerOverView]);

  const tenantId =
    tenantDetails?.customerId ||
    tenantDetails?.apiCall?.customerId ||
    tenantDetails?.tenetId;

  useEffect(() => {
    if (tenantId) {
      dispatch({
        type: "BOOKEDDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customerId: tenantId,
        },
      });

      dispatch({
        type: "CUSTOMERDETAILS",
        payload: {
          customerId:
            tenantDetails?.customerId ||
            tenantDetails?.apiCall?.customerId ||
            tenantDetails?.tenetId,
        },
      });
    }
  }, [tenantId]);

  const handleSaveUserlistAddUser = async () => {
    dispatch({ type: "REMOVE_BED_AVAILABLE_ERROR" });
    setAdvanceAmountError("");
    let newErrors = [];
    let oneTimePaymentErrors = [];
    let isHasError = false;

    if (!Floor) {
      setfloorError("Please Select Floor");
      isHasError = true;
    }
    if (!Rooms) {
      setRoomError("Please Select Room");
      isHasError = true;
    }
    if (!Bed) {
      setBedError("Please Select Bed");
      isHasError = true;
    }
    if (!selectedDate) {
      setDateError("Please Select Date");
      isHasError = true;
    }
    if (!isAdvanceRefused && !AdvanceAmount) {
      setAdvanceAmountError("Please Enter Advance Amount");
      isHasError = true;
    }

    if (!RoomRent) {
      setRoomRentError("Please Enter Room Rent");
      isHasError = true;
    }

    if (Floor === "Selected Floor" || floorError) {
      setfloorError("Please Select Floor");
      isHasError = true;
    }
    if (Rooms === "Selected Room" || roomError) {
      setRoomError("Please Select Room");
      isHasError = true;
    }

    if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
      setRoomRentError("Please Enter Rental Amount");
      isHasError = true;
    }
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter  Rental Amount");
      isHasError = true;
    }

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
          isHasError = true;
        }

        if (
          (!reason_name || reason_name.toString().trim() === "") &&
          item.amount
        ) {
          error.reason = "Please enter reason";
          isHasError = true;
        }

        newErrors.push(error);
        return {
          type: reason_name,
          amount: Number(item.amount) || "",
        };
      })
      .filter((item) => item.type !== "" || item.amount !== "");

    setErrors(newErrors);
    setOneTimePaymentErrors(oneTimePaymentErrors);

    if (isHasError) return;

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = selectedDate
      ? incrementDateAndFormat(selectedDate)
      : "";

    const invoiceDateObj = new Date(formattedDate);

    const dueDateObj = new Date(invoiceDateObj);
    dueDateObj.setDate(
      dueDateObj.getDate() +
        (state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth || 0),
    );

    if (Floor && Rooms && Bed && selectedDate && Number(RoomRent) > 0) {
      dispatch({
        type: "BOOKING_TO_CHECK_IN_SAGA",
        payload: {
          customerId: id,
          hostelId: state.login.selectedHostel_Id,
          floorId: Floor,
          bedId: Bed,
          roomId: Rooms,
          joiningDate: formattedDate,
          refundableAmount: AdvanceAmount,
          rentalAmount: RoomRent,
          stayType: activeTab,
          deductions: formattedReasons,
          shouldCollectFullRent: collectFullRent,
          customRent: Number(customRent),
          oneTimeDeduction: formattedReasonsOneTimePayments,
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
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    state.UsersList?.statusCodeForAddCustomerSaveInfo,
  ]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForDirectCheckInCustomer === 201) {
      setFormLoading(false);
    }
  }, [state.UsersList?.statusCodeForDirectCheckInCustomer]);

  useEffect(() => {
    if (
      state.createAccount?.networkError ||
      state.UsersList?.bedAvailableError
    ) {
      setFormLoading(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError, state.UsersList?.bedAvailableError]);

  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];

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

  const handleJoiningDateChange = (date) => {
    setDateError("");
    setSelectedDate(date ? date.toDate() : null);
    setJoingDateErrmsg("");
    dispatch(JoininDatecustomer(date ? date.toDate() : null));
  };

  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(dayjs());
    }
  }, []);

  // console.log("state.UsersList?.bookedDetails", state.UsersList?.bookedDetails);

  useEffect(() => {
    if (selectedDate) {
      const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const joiningDateForFormatted = formatDate(selectedDate);
      dispatch({
        type: "AVAILBALEBEDDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          joiningDate: joiningDateForFormatted,
        },
      });
    }
  }, [selectedDate]);

  const isPastMonth = selectedDate
    ? dayjs(selectedDate).isBefore(dayjs(), "month")
    : false;

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "SETTINGS_GET_RECURRING",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
      setFormLoading(false);
      // handleCloseBacktoCheckin();
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 500);
    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);

  const handleBedLayoutPreview = () => {
    setfloorError("");
    setRoomError("");
    setBedError("");
    setPgLatyout(true);
  };

  const handleClosePgLayOut = () => {
    setPgLatyout(false);
  };

  const handleSelectedBedDetails = (details) => {
    setRooms(details?.roomId);
    setBed(details?.bedId);

    setFloor(details?.floorId);
  };

  const deductionsTotal = fields.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const oneTimeDeductionTotal = oneTimePayments.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  // console.log("selectedDate", selectedDate);

  useEffect(() => {
    if (!selectedDate || !RoomRent) {
      setProRateRent(0);
      return;
    }

    const date = dayjs(selectedDate);
    const totalDays = date.daysInMonth();
    const remainingDays = totalDays - date.date() + 1;
    const amount = Math.round((Number(RoomRent) / totalDays) * remainingDays);
    setProRateRent(amount);
  }, [selectedDate, RoomRent, customRentEnable]);

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

  const floorOptions = [
    ...new Map(
      (state.UsersList?.availableBedList?.listBeds || []).map((item) => [
        item.floorId,
        {
          value: item.floorId,
          label: item.floorName,
        },
      ]),
    ).values(),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="fixed top-2 right-2 bottom-2 w-full max-w-[700px]  bg-white rounded-[20px]  shadow-lg">
        <div className="px-4 py-3">
          <div className="pt-0 relative border-0 flex justify-between mb-2">
            <div className="text-xl font-semibold font-gilroy">
              Tenant Check-In
            </div>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-3 mb-3  bg-[#F7F9FF] px-3 py-2 rounded">
            {file ? (
              <Image
                src={file}
                roundedCircle
                className="h-14 w-14 object-cover"
                alt="image"
              />
            ) : (
              <div className="h-14 w-14 rounded-full bg-[#E2E8F0] text-[#44536A] flex items-center justify-center text-xl font-semibold font-gilroy">
                {CustomerOverView?.initials || "-"}
              </div>
            )}
            <div className="">
              <div>
                <p className="mb-1 mt-2 text-lg font-gilroy font-semibold  truncate max-w-[150px]">
                  {firstname}
                </p>
              </div>
              <div className="text-xs text-[#4B4B4B]">
                {tenantDetails?.mobile}
              </div>
            </div>
          </div>

          <div className="mt-1 p-1 w-full bg-[#F7F9FF] rounded-lg">
            <div className="flex gap-2 w-full">
              <button
                onClick={() => setActiveTab("LONG")}
                className={`flex-1 py-2 text-center rounded-md font-gilroy font-semibold ${
                  activeTab === "LONG"
                    ? "!bg-[#1E45E1] text-white"
                    : "!bg-[#F7F9FF] text-black"
                }`}
              >
                Long Stay
              </button>

              <button
                onClick={() => setActiveTab("SHORT")}
                className={`flex-1 py-2 text-center rounded font-gilroy font-semibold ${
                  activeTab === "SHORT"
                    ? "!bg-[#1E45E1] text-white"
                    : "!bg-[#F7F9FF] text-black"
                }`}
              >
                Short Stay
              </button>
            </div>
          </div>

          {activeTab === "LONG" ? (
            <>
              <div className="show-scroll p-2 mt-2 me-1 max-h-[400px] overflow-y-scroll">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium font-gilroy">
                    Booking Date
                  </label>
                  <label className="text-sm font-semibold text-gray-900 font-gilroy">
                    {CustomerOverView?.bookingInfo?.bookingDate}
                  </label>
                </div>

                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium font-gilroy">
                    Booking Amount
                  </label>
                  <label className="text-sm font-semibold text-gray-900 font-gilroy">
                    {CustomerOverView?.bookingInfo?.bookingAmount}
                  </label>
                </div>

                <div className="grid grid-cols-12 gap-x-4 mb-2">
                  <div className="col-span-12 mb-2">
                    <Form.Group controlId="purchaseDate">
                      <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                        Joining Date{" "}
                        <span className="text-red-500 text-xl">*</span>
                      </Form.Label>

                      <div className="datepicker-wrapper relative w-full">
                        <DatePicker
                          className="w-full h-12 cursor-pointer font-gilroy"
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={selectedDate ? dayjs(selectedDate) : null}
                          onChange={(date) => handleJoiningDateChange(date)}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".show-scroll") || document.body
                          }
                          disabledDate={(current) =>
                            current && current > dayjs().endOf("day")
                          }
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
                </div>
                <div className="mb-2">
                  <div className="flex justify-between mb-2 ">
                    <div>
                      <label className="text-sm font-medium text-[#222222] mb-2 block">
                        Select Stay Details
                      </label>
                    </div>

                    <div className="relative inline-block group">
                      <button
                        onClick={(e) => {
                          if (selectedDate && !canCheckIn) {
                            e.stopPropagation();
                            handleBedLayoutPreview();
                          }
                        }}
                        className={`px-2 py-1 text-[10px] rounded flex gap-2 items-center ${
                          selectedDate
                            ? "bg-[#EDF3FF] text-[#1E45E1]"
                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        <IoBedOutline className="text-[12px]" />
                        Bed Layout View
                      </button>

                      {!selectedDate && (
                        <div className="absolute right-full top-1/2 z-20 mr-2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-gray-500 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
                          Please select the joining date first.
                          <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-500"></div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="mb-2 w-full ">
                      <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                        Floor <span className="text-red-500 text-xl">*</span>
                      </Form.Label>

                      <Select
                        isDisabled={!selectedDate || canCheckIn}
                        options={
                          floorOptions
                          // state.UsersList.floorList?.map((u) => ({
                          //   value: u.id,
                          //   label: u.name,
                          // })) || []
                        }
                        onChange={handleFloor}
                        value={
                          floorOptions.find(
                            (option) => option.value === Floor,
                          ) || null
                        }
                        placeholder="Select a Floor"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={CustomStyles}
                      />

                      {floorError && (
                        <ErrorMessage message={floorError} type="error" />
                      )}
                    </div>
                    <div className="mb-2  w-full ">
                      <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                        Room <span className="text-red-500 text-xl">*</span>
                      </Form.Label>

                      <Select
                        isDisabled={!selectedDate || !Floor || canCheckIn}
                        options={roomOptions}
                        onChange={(selectedOption) =>
                          handleRooms(selectedOption?.value)
                        }
                        value={
                          state.PgList?.roomsList?.find(
                            (option) => option.id === Rooms,
                          )
                            ? {
                                value: Rooms,
                                label: state.PgList?.roomsList.find(
                                  (option) => option.id === Rooms,
                                )?.name,
                              }
                            : null
                        }
                        placeholder="Select a Room"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={CustomStyles}
                      />

                      {roomError && (
                        <ErrorMessage message={roomError} type="error" />
                      )}
                    </div>
                    <div className="mb-2  w-full ">
                      <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                        Bed <span className="text-red-500 text-xl">*</span>
                      </Form.Label>

                      <Select
                        isDisabled={!selectedDate || canCheckIn}
                        options={
                          availableBed
                            ? availableBed
                                .filter(
                                  (item) =>
                                    item &&
                                    item?.bedName !== "0" &&
                                    item?.bedName !== "undefined" &&
                                    item?.bedName !== "" &&
                                    item?.bedName !== "null",
                                )
                                .map((item) => ({
                                  value: item?.bedId,
                                  label: item?.bedName,
                                }))
                            : []
                        }
                        onChange={handleBed}
                        value={
                          availableBed
                            ? (() => {
                                const selected = availableBed?.find(
                                  (option) => option?.bedId === Bed,
                                );
                                return selected
                                  ? {
                                      value: selected.bedId,
                                      label: selected.bedName,
                                    }
                                  : null;
                              })()
                            : null
                        }
                        placeholder="Select a Bed"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={CustomStyles}
                      />

                      {state.UsersList?.bedAvailableError ? (
                        <ErrorMessage
                          message={state.UsersList?.bedAvailableError}
                          type="error"
                        />
                      ) : null}
                      {bedWarning ? (
                        <ErrorMessage message={bedWarning} type="error" />
                      ) : null}

                      {bedError && (
                        <ErrorMessage message={bedError} type="error" />
                      )}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-x-4">
                  <div className="col-span-12">
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
                          onChange={handleAdvanceAmount}
                          disabled={isAdvanceRefused}
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

                    {!isAdvanceRefused && advanceAmountError && (
                      <ErrorMessage message={advanceAmountError} type="error" />
                    )}
                  </div>
                </div>
                {!isAdvanceRefused && (
                  <>
                    <div className="mt-3 mb-3 bg-[#F7F9FF] rounded pb-1">
                      <div className="flex justify-between items-center p-4">
                        <div>
                          <label className="text-sm font-medium font-gilroy">
                            Non Refundable Amount
                          </label>
                        </div>
                        <div className="">
                          <button
                            disabled={isAdvanceRefused}
                            onClick={handleAddField}
                            className="flex items-center justify-center w-full gap-1.5 bg-[#EAEEFF]  
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
                          <div className="flex gap-3 mb-3 px-4" key={index}>
                            <div className="flex-1">
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
                                    placeholder="Enter custom reason"
                                    value={item.customReason}
                                    onChange={(e) =>
                                      handleInputChange(
                                        index,
                                        "customReason",
                                        e.target.value,
                                      )
                                    }
                                    className="form-control text-base text-gray-700 font-gilroy font-medium shadow-none border border-gray-300 h-12 rounded"
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

                            <div className="flex-1 relative">
                              <input
                                type="text"
                                placeholder="Enter amount"
                                value={item.amount}
                                //                               onKeyDown={(e) => {
                                //   if (e.key === "." || e.key === "e" || e.key === "-") {
                                //     e.preventDefault();
                                //   }
                                // }}
                                onChange={(e) =>
                                  handleInputChange(
                                    index,
                                    "amount",
                                    e.target.value,
                                  )
                                }
                                className="form-control text-[16px] text-[#4B4B4B] font-gilroy font-medium shadow-none border border-[#D9D9D9] h-[50px] rounded-[8px]"
                              />
                              {errors[index]?.amount && (
                                <ErrorMessage
                                  message={errors[index]?.amount}
                                  type="error"
                                />
                              )}
                              <CloseCircle
                                variant="Bold"
                                size="20"
                                className="absolute right-0 top-0 -translate-y-1/2 text-gray-400 cursor-pointer"
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
                  </>
                )}
                <div className="mb-2">
                  <Form.Group>
                    <Form.Label className="text-sm text-gray-800 font-gilroy font-medium">
                      Rental amount-Base ₹(INR){" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      value={RoomRent}
                      placeholder={
                        placeHolderRoomRent
                          ? `Selected Bed Rent is ${placeHolderRoomRent}`
                          : "Enter Amount"
                      }
                      onChange={handleRoomRent}
                      className={`text-base text-gray-700 font-gilroy ${RoomRent ? "font-semibold" : "font-medium"} shadow-none border border-gray-300 h-12 rounded-md`}
                    />
                  </Form.Group>
                  {roomrentError && (
                    <ErrorMessage message={roomrentError} type="error" />
                  )}
                </div>
                {!isjoiningBased && (
                  <div className="w-full max-w-[680px] bg-white">
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

                            <label className="text-[15px] text-[#222222] font-medium flex items-center gap-2 whitespace-nowrap">
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
                    {isAdvanceRefused && (
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
                              <Add size="16" color="#4F46E5" variant="Linear" />
                              Add
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                <div className="">
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
                    Note: System automatically generates a separate invoices for
                    Advance & Base Rent
                  </p>

                  <div className="flex items-center gap-2 my-4">
                    <input
                      type="checkbox"
                      checked={isConfirmed}
                      onChange={(e) => setIsConfirmed(e.target.checked)}
                      className="cursor-pointer accent-green-600 w-4 h-4 "
                    />
                    <span className="text-[#0A090B] text-sm ">
                      Everything is Correct – Proceed to Check-in
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  disabled={formLoading || !isConfirmed}
                  onClick={handleSaveUserlistAddUser}
                  className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {formLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving ....{" "}
                    </>
                  ) : (
                    "Check in"
                  )}
                </button>
              </div>
            </>
          ) : (
            activeTab === "SHORT" && <FormComingSoon />
          )}
        </div>
      </div>

      {pgLayout && (
        <PgLayoutView
          show={pgLayout}
          handleClosePgLayOut={handleClosePgLayOut}
          selectedBedDetails={handleSelectedBedDetails}
        />
      )}
    </div>
  );
}

BookingToCheckin.propTypes = {
  tenantDetails: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.bool.isRequired,
};
export default BookingToCheckin;

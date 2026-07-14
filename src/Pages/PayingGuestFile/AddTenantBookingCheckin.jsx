import React, { useEffect, useState, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  Add,
  AddCircle,
  CloseCircle,
  Trash,
  Edit,
  Setting3,
  MessageQuestion,
  Edit2,
  ArrowRight,
  InfoCircle,
  ArrowUp2,
  ArrowDown2,
  ArrowRight2,
} from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import { IoBedOutline } from "react-icons/io5";
import PgLayoutView from "./PgLayoutView";
import FormComingSoon from "../../Utils/FormComingSoon";

const reasonOptions = [
  { value: "maintenance", label: "Maintenance" },
  { value: "others", label: "Others" },
];

const options = [
  { label: "Groundfloor", value: "ground" },
  { label: "First Floor", value: "first" },
];

const CustomStyles = {
  control: (base, state) => ({
    ...base,
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

function AddTenantBookingCheckin({
  handleClose,
  handleNextStep,
  mobile,
  firstname,
  draftTenantId,
  newTenant,
}) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("checkin");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [bookingDate, setBookingDate] = useState("");
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [checkInLoading, setCheckInLoading] = useState(false);
  const [bookingJoiningDate, setBookingJoiningDate] = useState(null);
  const [bookingAmount, setBookingAmount] = useState("");
  const [bookingFloor, setBookingFloor] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [availableBed, setAvailableBed] = useState("");
  const [availableCheckinBed, setAvailableCheckinBed] = useState("");
  const [bookingBed, setBookingBed] = useState(null);
  const [totalRent, setTotalRent] = useState("");
  const [errors, setErrors] = useState([]);
  const [oneTimePaymentErrors, setOneTimePaymentErrors] = useState([]);
  const [fields, setFields] = useState([]);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [pgLayout, setPgLatyout] = useState(false);
  const [isWay, setIsWay] = useState(null);
  const [joiningDate, setJoiningDate] = useState(dayjs());
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [checkinFloor, setCheckinFloor] = useState(null);
  const [checkinRoom, setCheckinRoom] = useState(null);
  const [checkinBed, setCheckinBed] = useState(null);
  const [bedWarning, setBedWarning] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [placeHolderRoomRent, setPlaceHolderRoomRent] = useState("");
  const [ebReading, setEbReading] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [reading, setReading] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [rentAmountError, setRentAmountError] = useState("");
  const [isAdvanceRefused, setIsAdvanceRefused] = useState(false);
  const [stayType, setStayType] = useState("long");

  // console.log("activeTab", activeTab);

  // booking

  const [joiningDateError, setJoiningDateError] = useState("");
  const [bookingDateError, setBookingDateError] = useState("");
  const [bookingAmountError, setBookingAmountError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [rentError, setRentError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [transactionError, setTransactionError] = useState("");

  //  check in

  const [checkInJoiningDateError, setCheckInJoiningDateError] = useState("");
  const [checkInFloorError, setCheckInFloorError] = useState("");
  const [checkInRoomError, setCheckInRoomError] = useState("");
  const [checkInBedError, setCheckInBedError] = useState("");
  const [checkInAdvanceAmountError, setCheckInAdvanceAmountError] =
    useState("");
  const [checkInRentAmountError, setCheckInRentAmountError] = useState("");

  const joiningDateRef = useRef(null);
  const bookingDateRef = useRef(null);
  const bookingAmountRef = useRef(null);
  const floorRef = useRef(null);
  const roomRef = useRef(null);
  const bedRef = useRef(null);
  const rentRef = useRef(null);
  const paymentRef = useRef(null);
  const transactionRef = useRef(null);
  const rentAmountRef = useRef(null);
  const advanceAmountRef = useRef(null);
  const CheckinJoiningDateRef = useRef(null);
  const checkinFloorRef = useRef(null);
  const checkinRoomRef = useRef(null);
  const checkinBedRef = useRef(null);

  const [collectFullRent, setCollectFullRent] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [customRentEnable, setCustomRentEnable] = useState(false);
  const [oneTimePayments, setOneTimePayments] = useState([]);
  const [customRent, setCustomRent] = useState("");
  const [customRentEditMode, setCustomRentEditMode] = useState(true);

  // const [errorsOneTime, setErrorsOneTime] = useState([]);
  const hasGracePeriod =
    state?.Settings?.SettingsBillsGetRecurring?.hasGracePeriod;

  const gracePeriodDays = Number(
    state?.Settings?.SettingsBillsGetRecurring?.gracePeriod || 0,
  );
  const joiningDay = dayjs(joiningDate).date();

  const isGracePeriodApplicable =
    hasGracePeriod && joiningDay <= gracePeriodDays;

  const isjoiningBased =
    state?.Settings?.SettingsBillsGetRecurring?.typeOfBilling ===
    "Joining Date Based";

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "SETTINGS_GET_RECURRING",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  const DarftCustomerId =
    state?.UsersList?.draftTenantDetails?.customerId ||
    state?.UsersList?.UpdateDraftTenantDetails?.customerId ||
    state?.UsersList?.alreadyAvailableDraftTenantGetList?.customerId;

  const stayTypes = [
    { value: "SHORT", label: "Short Stay" },
    { value: "LONG", label: "Long Stay" },
    { value: "DAY", label: "Day Stay" },
  ];
  const longStayOnly = stayTypes.filter((s) => s.value === "LONG");

  const [selectedStayType, setSelectedStayType] = useState(null);
  const [stay_typenameErrmsg, setStay_typenameErrmsg] = useState("");

  const handleStayTypeChange = (selectedOption) => {
    setSelectedStayType(selectedOption);

    if (!selectedOption) {
      setStay_typenameErrmsg("Please select stay type");
      return;
    }

    setStay_typenameErrmsg("");
  };

  const total = fields?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const handleAdvanceAmount = (e) => {
    const value = e.target.value;

    if (value === "" || /^(0|[1-9]\d*)$/.test(value)) {
      setAdvanceAmount(value);
      setCheckInAdvanceAmountError("");
    }
  };

  const handleJoiningDateChange = (date) => {
    setJoiningDate(date ? date.toDate() : null);
    setCheckInJoiningDateError("");
  };

  // const handleAdvanceAmountChange = (e) => {
  //   setAdvanceAmount(e.target.value);
  //   setCheckInAdvanceAmountError("");
  // };

  const handleRentAmountChange = (e) => {
    setRentAmount(e.target.value);
    setCheckInRentAmountError("");
  };

  const validateCheckInDraft = () => {
    let isValid = true;
    let firstInvalidRef = null;

    setCheckInJoiningDateError("");
    setCheckInFloorError("");
    setCheckInRoomError("");
    setCheckInBedError("");
    setCheckInAdvanceAmountError("");
    setCheckInRentAmountError("");

    if (!joiningDate) {
      setCheckInJoiningDateError("Please Select Joining Date");
      firstInvalidRef ??= CheckinJoiningDateRef;
      isValid = false;
    }

    if (!checkinFloor) {
      setCheckInFloorError("Please Select Floor");
      firstInvalidRef ??= checkinFloorRef;
      isValid = false;
    }

    if (!checkinRoom) {
      setCheckInRoomError("Please Select Room");
      firstInvalidRef ??= checkinRoomRef;
      isValid = false;
    }

    if (!checkinBed) {
      setCheckInBedError("Please Select Bed");
      firstInvalidRef ??= checkinBedRef;
      isValid = false;
    }

    if (!isAdvanceRefused && !advanceAmount) {
      setCheckInAdvanceAmountError("Please Enter Advance Amount");
      firstInvalidRef ??= advanceAmountRef;
      isValid = false;
    }

    if (!rentAmount) {
      setCheckInRentAmountError("Please Enter Rental Amount");
      firstInvalidRef ??= rentAmountRef;
      isValid = false;
    }

    if (firstInvalidRef?.current) {
      firstInvalidRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        firstInvalidRef.current?.focus?.();
      }, 300);
    }

    return isValid;
  };

  const handleCheckin = () => {
    const isValid = validateCheckInDraft();
    if (!isValid) return;

    let isHasError = false;
    const fieldErrors = [];
    const oneTimePaymentErrors = [];

    const formattedReasons = fields
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

        fieldErrors.push(error);

        return {
          type: reason_name,
          amount: Number(item.amount) || "",
        };
      })
      .filter((item) => item.type !== "" || item.amount !== "");

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

    setErrors(fieldErrors);
    setOneTimePaymentErrors(oneTimePaymentErrors);

    if (isHasError) {
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

    dispatch({
      type: "DIRECT_CHECK_IN_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        customerId: DarftCustomerId,
        floorId: Number(checkinFloor),
        bedId: Number(checkinBed),
        roomId: Number(checkinRoom),
        joiningDate: formattedDate,
        refundableAmount: Number(!isAdvanceRefused ? advanceAmount : 0),
        rentalAmount: Number(rentAmount),
        stayType: stayType,
        deductions: !isAdvanceRefused ? formattedReasons : null,
        shouldCollectFullRent: collectFullRent,
        customRent: Number(customRent),
        oneTimeDeduction: isAdvanceRefused
          ? formattedReasonsOneTimePayments
          : null,
      },
    });
    setCheckInLoading(true);
  };

  const handleNextStepCheckinDraft = () => {
    handleCheckInDraft();
    handleNextStep();
  };

  const handleCheckInDraft = () => {
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

    dispatch({
      type: "UPDATE_SAVE_DRAFT_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        customerId: DarftCustomerId,
        profilePic: DraftTenantDetails?.profilePic || "",
        aadharPic: DraftTenantDetails?.aadharPic || "",
        panPic: DraftTenantDetails?.panPic || "",

        request: {
          firstName: DraftTenantDetails?.firstName,
          lastName: DraftTenantDetails?.lastName || "",
          mobile: DraftTenantDetails?.mobileNo || "",
          emailId: DraftTenantDetails?.emailId || "",

          joiningDate: formattedDate,
          bookingDate: DraftTenantDetails?.bookingInfo?.bookingDate,
          bookingAmount: DraftTenantDetails?.bookingInfo?.bookingAmount || "",

          bedId: checkinBed ? Number(checkinBed) : "",
          roomId: checkinRoom ? Number(checkinRoom) : "",
          floorId: checkinFloor ? Number(checkinFloor) : "",
          bankId: DraftTenantDetails?.bankId || "",
          referenceNumber: DraftTenantDetails?.referenceNumber || "",
          advanceAmount: Number(isAdvanceRefused ? 0 : advanceAmount || 0),
          rentalAmount: Number(rentAmount || 0),
          stayType: stayType,

          deductions: fields
            ?.filter(
              (item) => (item.reason || item.customReason) && item.amount,
            )
            .map((item) => ({
              type: item.reason === "others" ? item.customReason : item.reason,
              amount: Number(item.amount),
            })),

          proRate: true,

          idProof: {
            type: DraftTenantDetails?.idProof?.type,
            number: DraftTenantDetails?.idProof?.number || "",
          },

          address: {
            flat: DraftTenantDetails?.address?.flat || "",
            house: DraftTenantDetails?.address?.house || "",
            building: DraftTenantDetails?.address?.building || "",
            company: DraftTenantDetails?.address?.company || "",
            apartment: DraftTenantDetails?.address?.apartment || "",
            area: DraftTenantDetails?.address?.area || "",
            street: DraftTenantDetails?.address?.street || "",
            sector: DraftTenantDetails?.address?.sector || "",
            village: DraftTenantDetails?.address?.village || "",
            landmark: DraftTenantDetails?.address?.landmark || "",
            pincode: DraftTenantDetails?.address?.pincode || "",
            city: DraftTenantDetails?.address?.city || "",
            state: DraftTenantDetails?.address?.state || "",
          },
          booking: {
            joiningDateTentative:
              DraftTenantDetails?.booking?.joiningDateTentative || "",
            refuseAdvanceAmount: isAdvanceRefused,
          },

          jobDetails: {
            employmentStatus:
              DraftTenantDetails?.jobDetails?.employmentStatus || "",
            companyName: DraftTenantDetails?.jobDetails?.companyName || "",
            collegeName: DraftTenantDetails?.jobDetails?.collegeName || "",
            jobRole: DraftTenantDetails?.jobDetails?.jobRole || "",
            workLocation: DraftTenantDetails?.jobDetails?.workLocation || "",
            shiftType: DraftTenantDetails?.jobDetails?.shiftType || "",
            shiftFrom: DraftTenantDetails?.jobDetails?.shiftFrom || "",
            shiftTo: DraftTenantDetails?.jobDetails?.shiftTo || "",
          },

          guardians: (DraftTenantDetails?.guardians || []).map((g) => ({
            guardianFullName: g?.guardianFullName || "",
            relationshipToTenant: g?.relationshipToTenant || "",
            guardianOccupation: g?.guardianOccupation || "",
            mobileNo: g?.mobileNo || "",
          })),
          shouldCollectFullRent: collectFullRent,
          customRent: Number(customRent),
          oneTimeDeduction: oneTimePayments
            ?.filter(
              (item) => (item.reason || item.customReason) && item.amount,
            )
            .map((item) => ({
              type: item.reason === "others" ? item.customReason : item.reason,
              amount: Number(item.amount),
            })),
        },
      },
    });
  };
  // Booking Onchanges

  const handleBookingDateChange = (date) => {
    setBookingDate(date ? date.toDate() : null);
    setBookingDateError("");
  };

  const handleBookingJoiningDateChange = (date) => {
    setBookingJoiningDate(date ? date.toDate() : null);
    setJoiningDateError("");
  };
  const handleBookingFloorChange = (val) => {
    setBookingFloor(val.value);
    setFloorError("");
  };

  const handleBookingRoomChange = (val) => {
    setBookingRoom(val.value);
    setRoomError("");
  };

  const handleBookingBedChange = (val) => {
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
    setBedError("");
    const selectedBedId = val?.value || "";
    setBookingBed(selectedBedId);
  };

  useEffect(() => {
    if (bookingBed) {
      const selectedBed = state.UsersList?.availableBedList?.listBeds?.find(
        (bed) => String(bed.bedId) === String(bookingBed),
      );
      if (selectedBed) {
        if (selectedBed.shouldShowError) {
          setBedWarning(selectedBed.errorMessage);
        } else {
          setBedWarning("");
        }
      }
    }
  }, [bookingBed]);

  const handleBookingAmountChange = (e) => {
    setBookingAmount(e.target.value);
    setBookingAmountError("");
  };

  const handleTotalRentChange = (e) => {
    setTotalRent(e.target.value);
    setRentError("");
  };
  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;
    setModeOfPayment(selectedOption);
    setPaymentError("");
  };
  const handleTransactionId = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };

  const validateBookingDraft = () => {
    let isValid = true;

    setJoiningDateError("");
    setBookingDateError("");
    setBookingAmountError("");
    setFloorError("");
    setRoomError("");
    setBedError("");
    setRentError("");
    setPaymentError("");
    setTransactionError("");

    let firstInvalidRef = null;

    if (!bookingDate) {
      setBookingDateError("Please Select Booking Date");

      if (!firstInvalidRef) {
        firstInvalidRef = bookingDateRef;
      }

      isValid = false;
    }

    if (!bookingAmount) {
      setBookingAmountError("Please Enter Booking Amount");

      if (!firstInvalidRef) {
        firstInvalidRef = bookingAmountRef;
      }

      isValid = false;
    }

    if (!bookingJoiningDate) {
      setJoiningDateError("Please Select Joining Date");

      if (!firstInvalidRef) {
        firstInvalidRef = joiningDateRef;
      }

      isValid = false;
    }

    if (!bookingFloor) {
      setFloorError("Please Select Floor");

      if (!firstInvalidRef) {
        firstInvalidRef = floorRef;
      }

      isValid = false;
    }

    if (!bookingRoom) {
      setRoomError("Please Select Room");

      if (!firstInvalidRef) {
        firstInvalidRef = roomRef;
      }

      isValid = false;
    }

    if (!bookingBed) {
      setBedError("Please Select Bed");

      if (!firstInvalidRef) {
        firstInvalidRef = bedRef;
      }

      isValid = false;
    }

    // if (!totalRent) {
    //   setRentError("Please Enter Total Rent");

    //   if (!firstInvalidRef) {
    //     firstInvalidRef = rentRef;
    //   }

    //   isValid = false;
    // }

    if (!modeOfPayment) {
      setPaymentError("Please Select Mode Of Transaction");

      if (!firstInvalidRef) {
        firstInvalidRef = paymentRef;
      }

      isValid = false;
    }

    if (firstInvalidRef?.current) {
      firstInvalidRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        firstInvalidRef.current?.focus?.();
      }, 300);
    }

    return isValid;
  };

  useEffect(() => {
    if (DarftCustomerId) {
      if (DarftCustomerId) {
        dispatch({
          type: "DRAFT_TENANT_LIST_SAGA",
          payload: DarftCustomerId,
        });
      }
    }
  }, [DarftCustomerId]);

  const DraftTenantDetails =
    state?.UsersList?.alreadyAvailableDraftTenantGetList;

  // console.log("DraftTenantDetails", DraftTenantDetails);

  useEffect(() => {
    if (DraftTenantDetails && !newTenant) {
      setBookingDate(
        DraftTenantDetails?.bookingInfo?.bookingDate
          ? dayjs(DraftTenantDetails.bookingInfo.bookingDate, "DD/MM/YYYY")
          : null,
      );
      setBookingAmount(DraftTenantDetails?.bookingInfo?.bookingAmount || "");

      setBookingJoiningDate(
        DraftTenantDetails?.booking?.joiningDateTentative
          ? dayjs(DraftTenantDetails.booking.joiningDateTentative, "DD-MM-YYYY")
          : null,
      );

      setBookingFloor(DraftTenantDetails?.hostelInfo?.floorId || "");
      setBookingRoom(DraftTenantDetails?.hostelInfo?.roomId || "");
      setBookingBed(DraftTenantDetails?.hostelInfo?.bedId || "");

      setTotalRent(DraftTenantDetails?.hostelInfo?.monthlyRent || "");
      setAdvanceAmount(DraftTenantDetails?.hostelInfo?.advanceAmount || "");

      setModeOfPayment(DraftTenantDetails?.bankId || "");
      setTransactionId(DraftTenantDetails?.referenceNumber || "");

      setIsConfirmChecked(
        DraftTenantDetails?.booking?.refuseAdvanceAmount || false,
      );

      setCheckinFloor(DraftTenantDetails?.hostelInfo?.floorId);
      setCheckinRoom(DraftTenantDetails?.hostelInfo?.roomId);
      setCheckinBed(DraftTenantDetails?.hostelInfo?.bedId);
      setJoiningDate(
        DraftTenantDetails?.hostelInfo?.joiningDate
          ? dayjs(DraftTenantDetails?.hostelInfo?.joiningDate, "DD-MM-YYYY")
          : null,
      );
      setStayType(DraftTenantDetails?.stayType || "long");

      setAdvanceAmount(DraftTenantDetails?.hostelInfo?.advanceAmount);
      setRentAmount(DraftTenantDetails?.hostelInfo?.monthlyRent);
      setFields(
        DraftTenantDetails?.deductions?.map((item) => ({
          reason_name: item.type || "",
          reason: item.type || "",
          amount: item.amount || "",
          paidAmount: item.paidAmount || 0,
          showInput: false,
          customReason: "",
        })) || [],
      );

      setCollectFullRent(DraftTenantDetails?.shouldCollectFullRent);
      setCustomRent(DraftTenantDetails?.customRent);
      setOneTimePayments(
        DraftTenantDetails?.oneTimeDeduction?.map((item) => ({
          reason_name: item.type || "",
          reason: item.type || "",
          amount: item.amount || "",
          paidAmount: item.paidAmount || 0,
          showInput: false,
          customReason: "",
        })) || [],
      );
    } else {
      setBookingDate(null);
      setBookingAmount("");
      setBookingJoiningDate(null);
      setBookingFloor("");
      setBookingRoom("");
      setBookingBed("");
      setTotalRent("");
      setAdvanceAmount("");
      setModeOfPayment("");
      setTransactionId("");
      setIsConfirmChecked(false);
      setCheckinFloor("");
      setCheckinRoom("");
      setCheckinBed("");
      setJoiningDate("");

      setAdvanceAmount("");
      setRentAmount("");

      setFields([
        {
          reason_name: "",
          reason: "",
          amount: "",
          paidAmount: 0,
          showInput: false,
          customReason: "",
        },
      ]);
    }
  }, [DraftTenantDetails, newTenant]);

  const handleBookingSaveDraft = () => {
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(bookingJoiningDate);
    const bookingDateForFormatted = formatDate(bookingDate);

    dispatch({
      type: "UPDATE_SAVE_DRAFT_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        customerId: DarftCustomerId,
        profilePic: DraftTenantDetails?.profilePic || "",
        aadharPic: DraftTenantDetails?.aadharPic || "",
        panPic: DraftTenantDetails?.panPic || "",

        request: {
          firstName: DraftTenantDetails?.firstName,
          lastName: DraftTenantDetails?.lastName || "",
          mobile: DraftTenantDetails?.mobileNo || "",
          emailId: DraftTenantDetails?.emailId || "",

          joiningDate: DraftTenantDetails?.hostelInfo?.joiningDate,
          bookingDate: bookingDateForFormatted,
          bookingAmount: bookingAmount ? Number(bookingAmount) : "",
          bedId: bookingBed ? Number(bookingBed) : "",
          roomId: bookingRoom ? Number(bookingRoom) : "",
          floorId: bookingFloor ? Number(bookingFloor) : "",
          bankId: modeOfPayment || "",
          referenceNumber: transactionId || "",
          advanceAmount: DraftTenantDetails?.hostelInfo?.advanceAmount
            ? Number(DraftTenantDetails.hostelInfo.advanceAmount)
            : "",
          rentalAmount: DraftTenantDetails?.hostelInfo?.monthlyRent
            ? Number(DraftTenantDetails.hostelInfo.monthlyRent)
            : "",
          // rentalAmount: totalRent ? Number(totalRent) : "",
          stayType: stayType,

          deductions: DraftTenantDetails?.deductions || [],

          proRate: true,

          idProof: {
            type: DraftTenantDetails?.idProof?.type,
            number: DraftTenantDetails?.idProof?.number || "",
          },

          address: {
            flat: DraftTenantDetails?.address?.flat || "",
            house: DraftTenantDetails?.address?.house || "",
            building: DraftTenantDetails?.address?.building || "",
            company: DraftTenantDetails?.address?.company || "",
            apartment: DraftTenantDetails?.address?.apartment || "",
            area: DraftTenantDetails?.address?.area || "",
            street: DraftTenantDetails?.address?.street || "",
            sector: DraftTenantDetails?.address?.sector || "",
            village: DraftTenantDetails?.address?.village || "",
            landmark: DraftTenantDetails?.address?.landmark || "",
            pincode: DraftTenantDetails?.address?.pincode || "",
            city: DraftTenantDetails?.address?.city || "",
            state: DraftTenantDetails?.address?.state || "",
          },
          booking: {
            joiningDateTentative: joiningDateForFormatted || "",
            refuseAdvanceAmount:
              DraftTenantDetails?.booking?.refuseAdvanceAmount ?? true,
          },

          jobDetails: {
            employmentStatus:
              DraftTenantDetails?.jobDetails?.employmentStatus || "",
            companyName: DraftTenantDetails?.jobDetails?.companyName || "",
            collegeName: DraftTenantDetails?.jobDetails?.collegeName || "",
            jobRole: DraftTenantDetails?.jobDetails?.jobRole || "",
            workLocation: DraftTenantDetails?.jobDetails?.workLocation || "",
            shiftType: DraftTenantDetails?.jobDetails?.shiftType || "",
            shiftFrom: DraftTenantDetails?.jobDetails?.shiftFrom || "",
            shiftTo: DraftTenantDetails?.jobDetails?.shiftTo || "",
          },

          guardians: (DraftTenantDetails?.guardians || []).map((g) => ({
            guardianFullName: g?.guardianFullName || "",
            relationshipToTenant: g?.relationshipToTenant || "",
            guardianOccupation: g?.guardianOccupation || "",
            mobileNo: g?.mobileNo || "",
          })),
          shouldCollectFullRent: collectFullRent,
          customRent: Number(customRent),
          oneTimeDeduction: oneTimePayments
            ?.filter(
              (item) => (item.reason || item.customReason) && item.amount,
            )
            .map((item) => ({
              type: item.reason === "others" ? item.customReason : item.reason,
              amount: Number(item.amount),
            })),
        },
      },
    });

    // setFormLoading(true);
  };

  const handleAddBooking = () => {
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
    const isValid = validateBookingDraft();

    if (!isValid) return;

    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(bookingJoiningDate);
    const bookingDateForFormatted = formatDate(bookingDate);

    dispatch({
      type: "ADD_BOOKING",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        joiningDate: joiningDateForFormatted,
        bookingDate: bookingDateForFormatted,
        bookingAmount: bookingAmount,
        floorId: bookingFloor,
        roomId: bookingRoom,
        bedId: bookingBed,
        customerId: DarftCustomerId,
        bankId: modeOfPayment,
        referenceNumber: transactionId,
      },
    });
    setBookingLoading(true);
  };

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setBookingLoading(false);
      dispatch({ type: "ERROR_BOOKING_REMOVE" });
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      dispatch({ type: "CLEAR_PHONE_ERROR" });

      // resetBookingForm();
      handleClose();
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForDirectCheckInCustomer === 201) {
      setCheckInLoading(false);
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: 1,
          size: 10,
        },
      });
      handleClose();

      dispatch({ type: "REMOVE_DIRECT_CHECK_IN_REDUCER" });
    }
  }, [state.UsersList?.statusCodeForDirectCheckInCustomer]);

  const resetBookingForm = () => {
    setBookingDate(null);
    setBookingAmount("");
    setBookingJoiningDate(null);
    setBookingFloor("");
    setBookingRoom("");
    setBookingBed("");
    setTotalRent("");
    setModeOfPayment("");
    setTransactionId("");
    setIsConfirmChecked(false);
    setBookingDateError("");
    setBookingAmountError("");
    setJoiningDateError("");
    setFloorError("");
    setRoomError("");
    setBedError("");
    setRentError("");
    setPaymentError("");
    setBedWarning("");
  };

  useEffect(() => {
    if (state.UsersList?.updateSaveDreaftTenantStatus === 200) {
      setFormLoading(false);
      // resetBookingForm();
      // handleClose();
      dispatch({
        type: "DRAFT_TENANT_LIST_SAGA",
        payload: DarftCustomerId,
      });
      dispatch({ type: "REMOVE_UPDATE_SAVE_DRAFT_REDUCER" });
    }
  }, [state.UsersList?.updateSaveDreaftTenantStatus]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setBookingLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.Booking?.bookingBedError) {
      setFormLoading(false);
      setBookingLoading(false);
    }
  }, [state.Booking?.bookingBedError]);

  // Checkin

  const handleCheckinFloorChange = (val) => {
    setCheckinFloor(val.value);
    setCheckInFloorError("");
  };
  const handleCheckinRoomChange = (val) => {
    setCheckinRoom(val.value);
    setCheckInRoomError("");
  };

  const handleCheckinBedChange = (val) => {
    setCheckInBedError("");
    const selectedBedId = val?.value || "";
    setCheckinBed(selectedBedId);
  };

  useEffect(() => {
    if (checkinBed) {
      const selectedBed = state.UsersList?.availableBedList?.listBeds?.find(
        (bed) => String(bed.bedId) === String(checkinBed),
      );

      if (selectedBed) {
        setPlaceHolderRoomRent(selectedBed.rentAmount);
        if (selectedBed.shouldShowError) {
          setBedWarning(selectedBed.errorMessage);
        } else {
          setBedWarning("");
        }
      }
    }
  }, [checkinBed]);

  useEffect(() => {
    if (checkinRoom) {
      const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter(
        (view) => {
          return view.roomId === checkinRoom;
        },
      );
      setAvailableCheckinBed(filteredBed);
    }
  }, [checkinRoom, joiningDate, state.UsersList?.availableBedList?.listBeds]);

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

  const labelMap = {
    CARD: "Card",
    CASH: "Cash",
    UPI: "UPI",
    BANK: "Bank",
  };

  const paymentOptions = Array.isArray(
    state.UsersList?.availableBedList.bankDetails,
  )
    ? state.UsersList?.availableBedList?.bankDetails.map((item) => ({
        value: String(item.bankId),
        label: `${item.holderName} - ${labelMap[item.type] || ""}`,
      }))
    : [];

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

  const handleCheckboxChange = (e) => {
    setCollectFullRent(e.target.checked);
  };

  const handleAddCustomRent = () => {
    setCustomRentEnable(!customRentEnable);
    if (!customRentEnable) {
      setCustomRent("");
    }
  };

  const handleAccordionToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleAdd = () => {
    console.log("Add clicked");
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

  const handleRemoveFieldOneTime = (index) => {
    const updatedFields = [...oneTimePayments];
    updatedFields.splice(index, 1);
    setOneTimePayments(updatedFields);

    const updatedErrors = [...errors];
    updatedErrors.splice(index, 1);
    setOneTimePaymentErrors(updatedErrors);
  };

  // useEffect(() => {
  //   if (bookingFloor || checkinFloor) {
  //     dispatch({
  //       type: "GETALLROOMSLIST",
  //       payload: { floor_Id: bookingFloor || checkinFloor },
  //     });
  //   }
  // }, [bookingFloor, checkinFloor]);

  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_ALL_FLOOR_LIST" });
      }, 500);
    }
  }, [state.UsersList.floorListStatusCode]);

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

  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_ALL_ROOMS_STATUS_CODE" });
      }, 100);
    }
  }, [state?.PgList?.getAllRoomSuccessStatus]);

  // const roomOptions =
  //   state.PgList?.roomsList?.map((item) => ({
  //     value: item.id,
  //     label: (
  //       <div
  //         style={{
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "space-between",
  //           width: "100%",
  //         }}
  //       >
  //         <span style={{ fontWeight: 600 }}>{item.name}</span>

  //         <span
  //           style={{
  //             backgroundColor: "#E9F2FF",
  //             color: "#2563EB",
  //             padding: "2px 8px",
  //             borderRadius: "12px",
  //             fontSize: "12px",
  //             fontWeight: 600,
  //             whiteSpace: "nowrap",
  //           }}
  //         >
  //           {item?.sharingType || 0}
  //         </span>
  //       </div>
  //     ),
  //   })) || [];

  const bookingRoomOptions = [
    ...new Map(
      (state.UsersList?.availableBedList?.listBeds || [])
        .filter((item) => String(item.floorId) === String(bookingFloor))
        .map((item) => [
          item.roomId,
          {
            value: item.roomId,
            label: item.roomName,
          },
        ]),
    ).values(),
  ];

  const checkinRoomOptions = [
    ...new Map(
      (state.UsersList?.availableBedList?.listBeds || [])
        .filter((item) => String(item.floorId) === String(checkinFloor))
        .map((item) => [
          item.roomId,
          {
            value: item.roomId,
            label: item.roomName,
          },
        ]),
    ).values(),
  ];

  useEffect(() => {
    if (bookingRoom) {
      const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter(
        (view) => {
          return view.roomId === bookingRoom;
        },
      );
      setAvailableBed(filteredBed);
    }
  }, [bookingRoom, joiningDate, state.UsersList?.availableBedList?.listBeds]);

  useEffect(() => {
    if (bookingJoiningDate || joiningDate) {
      const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const joiningDateForFormatted = formatDate(
        bookingJoiningDate || joiningDate,
      );
      dispatch({
        type: "AVAILBALEBEDDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          joiningDate: joiningDateForFormatted,
        },
      });
    }
  }, [bookingJoiningDate, joiningDate]);

  const handleBedLayoutPreview = (way) => {
    setCheckInFloorError("");
    setCheckInRoomError("");
    setCheckInBedError("");
    setFloorError("");
    setRoomError("");
    setBedError("");
    setPgLatyout(true);
    if (way === "booking-way") {
      setIsWay(true);
    } else {
      setIsWay(false);
    }
  };

  const handleClosePgLayOut = () => {
    setPgLatyout(false);
  };

  const handleSelectedBedDetails = (details, isWay) => {
    if (isWay) {
      setBookingFloor(details?.floorId || "");
      setBookingRoom(details?.roomId || "");
      setBookingBed(details?.bedId || "");
    } else {
      setCheckinRoom(details?.roomId || "");
      setCheckinBed(details?.bedId || "");
      setCheckinFloor(details?.floorId || "");
    }
  };

  const isPastMonth = joiningDate
    ? dayjs(joiningDate).isBefore(dayjs(), "month")
    : false;

  // console.log("isPastMonth, ", isPastMonth);
  // console.log("isCurrentOrPastMonth", isCurrentOrPastMonth);

  const deductionsTotal = fields?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const oneTimeDeductionTotal = oneTimePayments?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );
  const [proRateRent, setProRateRent] = useState(0);

  useEffect(() => {
    if (!joiningDate || !rentAmount) {
      setProRateRent(0);
      return;
    }

    const date = dayjs(joiningDate);
    const totalDays = date.daysInMonth();
    const remainingDays = totalDays - date.date() + 1;

    const amount = Math.round((Number(rentAmount) / totalDays) * remainingDays);

    setProRateRent(amount);
  }, [joiningDate, rentAmount, customRentEnable]);

  const summaryRent =
    customRentEnable && Number(customRent) > 0
      ? Number(customRent)
      : isGracePeriodApplicable
        ? Number(rentAmount || 0)
        : collectFullRent
          ? Number(rentAmount || 0)
          : isjoiningBased
            ? Number(rentAmount || 0)
            : Number(proRateRent || 0);

  // console.log("summaryRent", summaryRent);

  const totalSummary =
    Number(advanceAmount || 0) +
    deductionsTotal +
    oneTimeDeductionTotal +
    summaryRent;

  return (
    <div className="bg-white w-full">
      <div className="flex justify-between">
        <div className="flex bg-[#ECEEF0] p-1 rounded-lg w-fit mb-6">
          <button
            onClick={() => {
              setActiveTab("checkin");
              dispatch({ type: "ERROR_BOOKING_REMOVE" });
            }}
            className={`px-4 py-1.5 text-sm rounded-md ${
              activeTab === "checkin"
                ? "bg-white shadow text-[#1E45E1]"
                : "text-gray-500"
            }`}
          >
            Check-In
          </button>
          <button
            onClick={() => setActiveTab("booking")}
            className={`px-4 py-1.5 text-sm rounded-md ${
              activeTab === "booking"
                ? "bg-white shadow text-[#1E45E1]"
                : "text-gray-500"
            }`}
          >
            Booking
          </button>
        </div>

        <Add
          size="24"
          color="#FF0000"
          onClick={handleClose}
          className="cursor-pointer rotate-45"
        />
      </div>

      {activeTab === "booking" ? (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="mb-2 text-sm font-medium text-[#222222]  block">
                Booking Date <span className="text-red-500 text-xl">*</span>
              </label>
              <div
                className="datepicker-wrapper relative w-full"
                ref={bookingDateRef}
              >
                <DatePicker
                  className={`w-full h-[45px] cursor-pointer text-[14px] font-gilroy ${
                    bookingDate ? "font-semibold" : "font-medium"
                  }`}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={bookingDate ? dayjs(bookingDate) : null}
                  onChange={handleBookingDateChange}
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                  getPopupContainer={() => document.body}
                />
              </div>
              {bookingDateError && (
                <ErrorMessage message={bookingDateError} type="error" />
              )}
            </div>

            <div className="mb-3">
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Booking Amount <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                ref={bookingAmountRef}
                value={bookingAmount}
                type="number"
                onWheel={(e) => e.target.blur()}
                onChange={handleBookingAmountChange}
                placeholder="Enter Booking Amount"
                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
              />
              {bookingAmountError && (
                <ErrorMessage message={bookingAmountError} type="error" />
              )}
            </div>
          </div>
          <div className="mb-2" ref={joiningDateRef}>
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Joining Date (Tentative){" "}
              <span className="text-red-500 text-xl">*</span>
            </label>

            <div className="datepicker-wrapper relative w-full mt-1 ">
              <div className="datepicker-wrapper relative w-full">
                <DatePicker
                  // ref={joiningDateRef}
                  className="w-full h-12 cursor-pointer text-[14px] font-gilroy"
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={bookingJoiningDate ? dayjs(bookingJoiningDate) : null}
                  onChange={handleBookingJoiningDateChange}
                  disabledDate={(current) => {
                    if (!bookingDate) {
                      return true;
                    }
                    return (
                      current && current.isBefore(dayjs(bookingDate), "day")
                    );
                  }}
                  getPopupContainer={() => document.body}
                  placement="top"
                />
              </div>
              {joiningDateError && (
                <ErrorMessage message={joiningDateError} type="error" />
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
                  onClick={() => {
                    if (bookingJoiningDate) {
                      handleBedLayoutPreview("booking-way");
                    }
                  }}
                  className={`px-2 py-1 text-[10px] rounded flex gap-2 items-center ${
                    bookingJoiningDate
                      ? "bg-[#EDF3FF] text-[#1E45E1]"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <IoBedOutline className="text-[12px]" />
                  Bed Layout View
                </button>

                {!bookingJoiningDate && (
                  <div className="absolute right-full top-1/2 z-20 mr-2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-gray-500 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
                    Please select the joining date first.
                    <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-500"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div ref={floorRef}>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Floor <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={floorOptions}
                  value={
                    floorOptions.find(
                      (option) => option.value === bookingFloor,
                    ) || null
                  }
                  onChange={handleBookingFloorChange}
                  styles={CustomStyles}
                />
                {floorError && (
                  <ErrorMessage message={floorError} type="error" />
                )}
              </div>
              <div ref={roomRef}>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Room <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  isDisabled={!bookingJoiningDate || !bookingFloor}
                  options={bookingRoomOptions}
                  value={
                    bookingRoomOptions.find(
                      (option) => String(option.value) === String(bookingRoom),
                    ) || null
                  }
                  onChange={handleBookingRoomChange}
                  styles={CustomStyles}
                />
                {roomError && <ErrorMessage message={roomError} type="error" />}
              </div>
              <div ref={bedRef}>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Bed <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  isDisabled={!bookingRoom}
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
                  value={
                    availableBed
                      ? (() => {
                          const selected = availableBed?.find(
                            (option) => option?.bedId === bookingBed,
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
                  onChange={handleBookingBedChange}
                  styles={CustomStyles}
                />
                {state.Booking?.bookingBedError ? (
                  <ErrorMessage
                    message={state.Booking?.bookingBedError}
                    type="error"
                  />
                ) : null}
                {bedError && <ErrorMessage message={bedError} type="error" />}
                {bedWarning ? (
                  <div className="">
                    <ErrorMessage message={bedWarning} type="error" />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* <div className="mb-2">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Total Rent <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              type="number"
              ref={rentRef}
              placeholder={
                placeHolderRoomRent
                  ? `Selected Bed Rent is ${placeHolderRoomRent}`
                  : "Enter Amount"
              }
              value={totalRent}
              onWheel={(e) => e.target.blur()}
              onChange={handleTotalRentChange}
              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
            />
            {rentError && <ErrorMessage message={rentError} type="error" />}
          </div> */}

          <div className="grid grid-cols-2 gap-4 items-stretch ">
            <div className="mb-2" ref={paymentRef}>
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Mode Of Transaction{" "}
                <span className="text-red-500 text-xl">*</span>
              </label>

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
                styles={CustomStyles}
              />
              {paymentError && (
                <ErrorMessage message={paymentError} type="error" />
              )}
            </div>
            <div className="mb-2">
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Transaction ID{" "}
                <span className="text-transparent text-xl opacity-0 select-none">
                  *
                </span>
              </label>

              <input
                value={transactionId}
                onChange={(e) => handleTransactionId(e)}
                placeholder="Enter Transaction ID"
                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
              />
            </div>
            {/* <div className="mb-2">
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Transferring Account{" "}
                <span className="text-red-500 text-xl">*</span>
              </label>

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
                styles={CustomStyles}
              />
            </div> */}
          </div>

          <div className="flex items-center gap-2 my-4">
            <input
              type="checkbox"
              checked={isConfirmChecked}
              onChange={(e) => setIsConfirmChecked(e.target.checked)}
              className="cursor-pointer accent-green-600 w-4 h-4 "
            />
            <span className="text-[#0A090B] text-sm ">
              Everything is Correct – Proceed to Book
            </span>
          </div>

          <div className="flex justify-between mt-3">
            {!modeOfPayment && (
              <button
                disabled={formLoading}
                onClick={handleBookingSaveDraft}
                className={`!font-gilroy text-sm border-1 !font-semibold !rounded-md 
  !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap 
  flex items-center justify-center gap-2
  ${
    formLoading
      ? "!bg-[#EBEFFF] text-[#A0A0A0] border-[#D6DEFF] cursor-not-allowed opacity-70"
      : "!bg-[#EBEFFF] text-[#1E45E1] border-[#D6DEFF] cursor-pointer"
  }`}
              >
                {formLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  "Save Draft"
                )}
              </button>
            )}
            <div className="flex gap-2">
              <button
                disabled={!isConfirmChecked || bookingLoading}
                onClick={handleAddBooking}
                className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {bookingLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Booking...
                  </>
                ) : (
                  "Book"
                )}
              </button>
              {/* <button
                className="!font-gilroy text-sm flex items-center justify-center gap-1 !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                onClick={handleNextStep}
              >
                Next <ArrowRight color="#FFFFFF" size="18" />
              </button> */}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="w-full rounded-lg bg-[#F5F7FA] p-1 flex items-center mb-2">
            <button
              type="button"
              onClick={() => setStayType("long")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all w-full ${
                stayType === "long"
                  ? "bg-[#1E45E1] text-white shadow-sm"
                  : "text-[#222222]"
              }`}
            >
              Long Stay
            </button>

            <button
              type="button"
              onClick={() => setStayType("short")}
              className={`px-6 py-2 text-sm font-medium rounded-md transition-all  w-full  ${
                stayType === "short"
                  ? "bg-[#1E45E1] text-white shadow-sm"
                  : "text-[#222222]"
              }`}
            >
              Short Stay
            </button>
          </div>

          {stayType === "long" ? (
            <div>
              <div className="grid grid-cols-1 gap-4 mb-2">
                <div className="mb-2" ref={CheckinJoiningDateRef}>
                  <label className="text-sm font-medium text-[#222222] mb-2 block">
                    Joining Date <span className="text-red-500 text-xl">*</span>
                  </label>
                  <div className="datepicker-wrapper relative w-full">
                    <DatePicker
                      className={`w-full h-[42px] cursor-pointer font-gilroy ${
                        joiningDate ? "font-semibold" : "font-medium"
                      }`}
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={joiningDate ? dayjs(joiningDate) : null}
                      onChange={handleJoiningDateChange}
                      getPopupContainer={() => document.body}
                      style={{ fontSize: 10 }}
                      disabledDate={(current) =>
                        current && current > dayjs().endOf("day")
                      }
                    />
                    {checkInJoiningDateError && (
                      <ErrorMessage
                        message={checkInJoiningDateError}
                        type="error"
                      />
                    )}
                  </div>
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
                      onClick={() => {
                        if (joiningDate) {
                          handleBedLayoutPreview("checkin-way");
                        }
                      }}
                      className={`px-2 py-1 text-[10px] rounded flex gap-2 items-center ${
                        joiningDate
                          ? "bg-[#EDF3FF] text-[#1E45E1]"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      <IoBedOutline className="text-[12px]" />
                      Bed Layout View
                    </button>

                    {!joiningDate && (
                      <div className="absolute right-full top-1/2 z-20 mr-2 hidden -translate-y-1/2 whitespace-nowrap rounded bg-gray-500 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
                        Please select the joining date first.
                        <div className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-500"></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div ref={checkinFloorRef}>
                    <label className="text-sm font-medium text-[#222222] mb-2 block">
                      Floor <span className="text-red-500 text-xl">*</span>
                    </label>
                    <Select
                      disabled={!joiningDate}
                      options={floorOptions}
                      value={
                        floorOptions.find(
                          (option) => option.value === checkinFloor,
                        ) || null
                      }
                      onChange={handleCheckinFloorChange}
                      styles={CustomStyles}
                    />
                    {checkInFloorError && (
                      <ErrorMessage message={checkInFloorError} type="error" />
                    )}
                  </div>
                  <div ref={checkinRoomRef}>
                    <label className="text-sm font-medium text-[#222222] mb-2 block">
                      Room <span className="text-red-500 text-xl">*</span>
                    </label>
                    <Select
                      isDisabled={!joiningDate || !checkinFloor}
                      options={checkinRoomOptions}
                      value={
                        checkinRoomOptions.find(
                          (option) =>
                            String(option.value) === String(checkinRoom),
                        ) || null
                      }
                      onChange={handleCheckinRoomChange}
                      styles={CustomStyles}
                    />
                    {checkInRoomError && (
                      <ErrorMessage message={checkInRoomError} type="error" />
                    )}
                  </div>
                  <div ref={checkinBedRef}>
                    <label className="text-sm font-medium text-[#222222] mb-2 block">
                      Bed <span className="text-red-500 text-xl">*</span>
                    </label>
                    <Select
                      disabled={!joiningDate}
                      options={
                        availableCheckinBed
                          ? availableCheckinBed
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
                      value={
                        availableCheckinBed
                          ? (() => {
                              const selected = availableCheckinBed?.find(
                                (option) => option?.bedId === checkinBed,
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
                      onChange={handleCheckinBedChange}
                      styles={CustomStyles}
                    />
                    {checkInBedError && (
                      <ErrorMessage message={checkInBedError} type="error" />
                    )}
                  </div>
                </div>
                {bedWarning ? (
                  <div className="flex justify-end">
                    <ErrorMessage message={bedWarning} type="error" />
                  </div>
                ) : null}
              </div>

              <div className="grid grid-cols-12 gap-x-4">
                <div className="col-span-12">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-800 font-gilroy font-medium">
                      Advance amount ₹ (INR)
                      {!isAdvanceRefused && (
                        <span className="text-red-500 text-xl">*</span>
                      )}
                    </label>

                    <div className="flex items-center justify-between mt-1 gap-2 mb-2">
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
                            isAdvanceRefused ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                  {!isAdvanceRefused && (
                    <input
                      type="number"
                      ref={advanceAmountRef}
                      placeholder="Enter Amount"
                      value={advanceAmount}
                      onChange={handleAdvanceAmount}
                      disabled={isAdvanceRefused}
                      onWheel={(e) => e.target.blur()}
                      className={`w-full text-[14px] text-gray-700 font-gilroy ${
                        advanceAmount ? "font-semibold" : "font-medium"
                      } shadow-none border h-12 rounded-md px-3 outline-none ${
                        isAdvanceRefused
                          ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                          : "border-gray-300"
                      }`}
                    />
                  )}

                  {!isAdvanceRefused && checkInAdvanceAmountError && (
                    <ErrorMessage
                      message={checkInAdvanceAmountError}
                      type="error"
                    />
                  )}
                </div>
              </div>
              {!isAdvanceRefused && (
                <>
                  <div className="border-1 rounded-lg border-[#F2F4F6]  bg-[#F7FAFF] my-3">
                    <div className="p-2">
                      <label className="text-sm font-gilroy font-medium  text-[#222222]">
                        Non Refundable Amount
                      </label>
                    </div>

                    <div className=" bg-[#F7FAFF] rounded-lg p-2 ">
                      {fields?.map((item, index) => {
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
                                      height: 45,
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
                                  height: 45,
                                  borderRadius: 8,
                                }}
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
                                className="absolute right-2 top-0 -translate-y-1/2 text-gray-400 cursor-pointer"
                                onClick={() => handleRemoveField(index)}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="flex w-full px-4">
                      <button
                        disabled={isAdvanceRefused}
                        onClick={handleAddField}
                        className="!flex !items-center justify-center !w-full !gap-1.5 !bg-[#EAEEFF] !text-[#1E45E1]   disabled:bg-gray-100 disabled:text-gray-500
                        disabled:cursor-not-allowed  !font-semibold !text-sm !rounded-lg !px-6 !py-1.5 !mb-2 !font-gilroy"
                      >
                        <AddCircle color="#1E45E1" size="16" />
                        Add
                      </button>
                    </div>
                    {/* <div className="mt-2 bg-[#F2F4F6] p-2  flex justify-between font-semibold rounded-b-lg">
              <span className="text-[#505F76] text-xs ">
                TOTAL FIXED CHARGES
              </span>
              <span className="text-[#191C1E] text-base">
                ₹ {total.toLocaleString()}
              </span>
            </div> */}
                  </div>

                  <div className="text-[#505F76] text-xs font-medium text-justify flex flex-wrap my-2 pe-16">
                    Note: These charges are deducted from the initial security
                    deposit or collected at the time of check-in and are
                    non-adjustable.
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 gap-4 mb-2">
                <div className="mb-2">
                  <label className="text-sm font-medium text-[#222222] mb-2 block">
                    Rental amount-Base ₹(INR){" "}
                    <span className="text-red-500 text-xl">*</span>
                  </label>
                  <input
                    ref={rentAmountRef}
                    type="number"
                    placeholder={
                      placeHolderRoomRent
                        ? `Selected Bed Rent is ${placeHolderRoomRent}`
                        : "Enter Amount"
                    }
                    value={rentAmount}
                    onWheel={(e) => e.target.blur()}
                    onChange={handleRentAmountChange}
                    className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                  />
                  {checkInRentAmountError && (
                    <ErrorMessage
                      message={checkInRentAmountError}
                      type="error"
                    />
                  )}
                </div>
              </div>
              {!isjoiningBased && (
                <div className="w-full max-w-[680px] bg-white">
                  {!isPastMonth && (
                    <div>
                      <div className="flex items-center  justify-between px-1 py-3">
                        <div className="flex items-center gap-2 ">
                          <input
                            type="checkbox"
                            checked={collectFullRent}
                            onChange={handleCheckboxChange}
                            className="w-4 h-4 rounded border border-[#D1D5DB] accent-[#4F46E5] cursor-pointer"
                          />

                          <label className="text-[14px] text-[#222222] font-medium flex items-center gap-2">
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
                              onClick={() => {
                                handleAddCustomRent();
                              }}
                              className={`text-sm rounded-md px-6 py-2 flex items-center gap-2 font-medium transition-all ${
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
                        {oneTimePayments?.map((item, index) => {
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
                  )} */}
                </div>
              )}

              {/* <div className="">
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
                      <span>₹ {advanceAmount || 0}</span>
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
              </div> */}

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

              <div className="flex justify-between mt-3">
                {!rentAmount && (
                  <button
                    className="!font-gilroy text-sm !bg-[#EBEFFF] text-[#1E45E1] border-[#D6DEFF] border-1 !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                    onClick={handleCheckInDraft}
                  >
                    Save Draft
                  </button>
                )}
                <div className="flex gap-2">
                  <button
                    disabled={!isConfirmed}
                    onClick={handleCheckin}
                    className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {checkInLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Saving ....{" "}
                      </>
                    ) : (
                      "Check in"
                    )}
                  </button>

                  <button
                    className="!font-gilroy text-sm flex items-center justify-center gap-1 !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                    onClick={handleNextStepCheckinDraft}
                  >
                    Next <ArrowRight color="#FFFFFF" size="18" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <FormComingSoon />
          )}
        </div>
      )}

      {pgLayout && (
        <PgLayoutView
          show={pgLayout}
          handleClose={handleClosePgLayOut}
          selectedBedDetails={handleSelectedBedDetails}
          isWay={isWay}
        />
      )}
    </div>
  );
}

export default AddTenantBookingCheckin;

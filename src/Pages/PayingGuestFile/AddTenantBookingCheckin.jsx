/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  Add,
  AddCircle,
  CloseCircle,
  Edit2,
  ArrowRight,
  InfoCircle,
  ArrowRight2, Bank, Wallet2, Card
} from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  fieldClass,
  fieldSelectStyles,
  datePickerClass,
} from "../../Utils/FieldStyles";

import { IoBedOutline } from "react-icons/io5";
import PgLayoutView from "./PgLayoutView";
import FormComingSoon from "../../Utils/FormComingSoon";
import PropTypes from "prop-types";
import { useHasPermission } from "../../Utils/Permission";
import TenantAmenitiesSection from "./TenantAmenitiesSection";
import AmountInput from "../../Utils/AmountInput";
import removeIcon from "../../Assets/Images/New_images/tenant-stepper/remove.svg";
import {
  estimateFirstCharge,
  fromAmenityPayload,
  toAmenityPayload,
  unitLabel,
  useHostelAmenities,
} from "./tenantAmenityUtils";
import { formatPlanPrice } from "../AmenitiesFile/amenityPlanUtils";
import {
  DRAFT_EXTRA_FIELDS_ENABLED,
  MAX_DEPOSIT_AMOUNT,
  TENANT_BTN_PRIMARY,
  TENANT_BTN_SECONDARY,
  TENANT_FOOTER_CLASS,
  formatDisplayDate,
  sanitizeAmountInput,
  validateAmount,
} from "./tenantDraftUtils";
import {
  Option,
  SingleValue,
  DropdownIndicator,
  GroupHeading,

} from "../../Utils/CustomSelectComponents";
const reasonOptions = [
  { value: "maintenance", label: "Maintenance" },
  { value: "others", label: "Others" },
];



// Card used by every Step 2 section (Figma 7145:163151 / 163181 / 163250):
// white, 8px radius, faint border, 14px padding, title with the blue bar.
function StepCard({ title, children }) {
  return (
    <section className="mt-[14px] flex flex-col gap-[10px] rounded-[8px] border-[1px] border-solid border-[rgba(216,216,216,0.5)] bg-white p-[14px] font-gilroy">
      <div className="flex items-center gap-[10px]">
        <span className="h-[26px] w-[3px] rounded-[12px] bg-[#0038AC]" />
        <h5 className="m-0 font-gilroy text-[18px] font-medium leading-[24px] text-[#222222]">
          {title}
        </h5>
      </div>
      {children}
    </section>
  );
}

StepCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Step 2 of the Add Tenant wizard. It only collects and validates the form: the
// parent drives navigation, saves drafts and makes the final booking / check-in
// call through the imperative API exposed at the bottom (validate, getDraftFields,
// getSummary, submitCheckin, submitBooking).
const AddTenantBookingCheckin = forwardRef(function AddTenantBookingCheckin(
  {
    handleClose,
    newTenant,
    bookingOnly,
    onFlowChange,
    restoredDraftId,
    onNext,
    onSaveDraft,
    draftSaving,
    onSubmitSuccess,
    onSubmitError,
    initialFlow,
  },
  ref,
) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(initialFlow || "checkin");

  // Lets the wizard stepper follow the Booking / Check-in tab.
  useEffect(() => {
    onFlowChange?.(activeTab);
  }, [activeTab]);
  const [bookingDate, setBookingDate] = useState("");

  const [bookingJoiningDate, setBookingJoiningDate] = useState(null);
  const [bookingAmount, setBookingAmount] = useState("");
  const [bookingFloor, setBookingFloor] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [availableBed, setAvailableBed] = useState("");
  const [availableCheckinBed, setAvailableCheckinBed] = useState("");
  const [bookingBed, setBookingBed] = useState(null);
  // const [totalRent, setTotalRent] = useState("");
  const [errors, setErrors] = useState([]);
  // const [oneTimePaymentErrors, setOneTimePaymentErrors] = useState([]);
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
  // const [ebReading, setEbReading] = useState("");
  const [transactionId, setTransactionId] = useState("");
  // const [isEditing, setIsEditing] = useState(false);
  // const [reading, setReading] = useState("");
  // const [advanceAmountError, setAdvanceAmountError] = useState("");
  // const [rentAmountError, setRentAmountError] = useState("");
  const [isAdvanceRefused, setIsAdvanceRefused] = useState(false);
  const [stayType, setStayType] = useState("LONG");

  // booking

  const [joiningDateError, setJoiningDateError] = useState("");
  const [bookingDateError, setBookingDateError] = useState("");
  const [bookingAmountError, setBookingAmountError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  // const [rentError, setRentError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  // const [transactionError, setTransactionError] = useState("");

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
  // const rentRef = useRef(null);
  const paymentRef = useRef(null);
  // const transactionRef = useRef(null);
  const rentAmountRef = useRef(null);
  const advanceAmountRef = useRef(null);
  const CheckinJoiningDateRef = useRef(null);
  const checkinFloorRef = useRef(null);
  const checkinRoomRef = useRef(null);
  const checkinBedRef = useRef(null);

  const [collectFullRent, setCollectFullRent] = useState(false);
  // const [isOpen, setIsOpen] = useState(true);
  const [customRentEnable, setCustomRentEnable] = useState(false);
  const [oneTimePayments, setOneTimePayments] = useState([]);
  const [customRent, setCustomRent] = useState("");
  const [customRentEditMode, setCustomRentEditMode] = useState(true);
  // Amenities: { [amenityId]: planKey } ("" until a plan is picked).
  const [selectedAmenities, setSelectedAmenities] = useState({});
  const [amenityProRate, setAmenityProRate] = useState(true);
  const hostelAmenities = useHostelAmenities();

  const isDev = import.meta.env.MODE === "development";
  const { canWriteModule: canWriteBooking } = useHasPermission("Booking");
  const {
    canWriteModule: canWriteCustomers,

  } = useHasPermission("Customers");

  // const [errorsOneTime, setErrorsOneTime] = useState([]);
  // const hasGracePeriod =
  //   state?.Settings?.SettingsBillsGetRecurring?.hasGracePeriod;

  // const gracePeriodDays = Number(
  //   state?.Settings?.SettingsBillsGetRecurring?.gracePeriod || 0,
  // );
  // const joiningDay = dayjs(joiningDate).date();

  // const isGracePeriodApplicable =
  //   hasGracePeriod && joiningDay <= gracePeriodDays;

  const isjoiningBased =
    state?.Settings?.SettingsBillsGetRecurring?.typeOfBilling ===
    "Joining Date Based";

  const isPastMonth = joiningDate
    ? dayjs(joiningDate).isBefore(dayjs().subtract(1, "month"), "month")
    : false;

  const isPastMonthPrePaid = joiningDate
    ? dayjs(joiningDate).isBefore(dayjs(), "month")
    : false;

  const IsPostPaid =
    state?.Settings?.SettingsBillsGetRecurring?.billingModel === "POSTPAID";
  const IsPrePaid =
    state?.Settings?.SettingsBillsGetRecurring?.billingModel === "PREPAID";

  const hideByPostPaidHostel =
    (IsPostPaid && isPastMonth) || (IsPrePaid && isPastMonthPrePaid);

  const recurringRequestRef = useRef(null);

  useEffect(() => {
    const hostelId = state.login.selectedHostel_Id;

    if (!hostelId) return;

    const requestKey = { hostelId };

    if (
      JSON.stringify(recurringRequestRef.current) ===
      JSON.stringify(requestKey)
    ) return;

    recurringRequestRef.current = requestKey;

    dispatch({
      type: "SETTINGS_GET_RECURRING",
      payload: requestKey,
    });
  }, [state.login.selectedHostel_Id]);

  // const stayTypes = [
  //       { value: "SHORT", label: "Short Stay" },
  //     { value: "LONG", label: "Long Stay" },
  //     { value: "DAY", label: "Day Stay" },
  //   ];
  // const longStayOnly = stayTypes.filter((s) => s.value === "LONG");

  // const [selectedStayType, setSelectedStayType] = useState(null);
  // const [stay_typenameErrmsg, setStay_typenameErrmsg] = useState("");

  // const handleStayTypeChange = (selectedOption) => {
  //   setSelectedStayType(selectedOption);

  //   if (!selectedOption) {
  //     setStay_typenameErrmsg("Please select stay type");
  //     return;
  //   }

  //   setStay_typenameErrmsg("");
  // };

  // const total = fields?.reduce(
  //   (sum, item) => sum + Number(item.amount || 0),
  //   0,
  // );

  const handleAdvanceAmount = (e) => {
    const value = sanitizeAmountInput(e.target.value);
    if (value === null) return;
    setAdvanceAmount(value);
    // Range problems show while typing; "required" is only reported on Next.
    setCheckInAdvanceAmountError(
      value
        ? validateAmount(value, {
          requiredMessage: "",
          label: "Advance amount",
          max: MAX_DEPOSIT_AMOUNT,
        })
        : "",
    );
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
    const value = sanitizeAmountInput(e.target.value);
    if (value === null) return;
    setRentAmount(value);
    // Range problems show while typing; "required" is only reported on Next.
    setCheckInRentAmountError(
      value
        ? validateAmount(value, { requiredMessage: "", label: "Rental amount" })
        : "",
    );
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

    const advanceError = isAdvanceRefused
      ? ""
      : validateAmount(advanceAmount, {
        requiredMessage: "Please Enter Advance Amount",
        label: "Advance amount",
        max: MAX_DEPOSIT_AMOUNT,
      });
    if (advanceError) {
      setCheckInAdvanceAmountError(advanceError);
      firstInvalidRef ??= advanceAmountRef;
      isValid = false;
    }

    const rentError = validateAmount(rentAmount, {
      requiredMessage: "Please Enter Rental Amount",
      label: "Rental amount",
    });
    if (rentError) {
      setCheckInRentAmountError(rentError);
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

  // Validates the check-in form and returns the DIRECT_CHECK_IN payload (without
  // the customerId, which the parent adds), or null when something is invalid.
  const prepareCheckin = () => {
    const isValid = validateCheckInDraft();

    if (!isValid) return null;

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
        } else if (item.amount) {
          const rangeError = validateAmount(item.amount, {
            requiredMessage: "",
            label: "Amount",
            max: MAX_DEPOSIT_AMOUNT,
          });
          if (rangeError) {
            error.amount = rangeError;
            isHasError = true;
          }
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
        } else if (item.amount) {
          const rangeError = validateAmount(item.amount, {
            requiredMessage: "",
            label: "Amount",
            max: MAX_DEPOSIT_AMOUNT,
          });
          if (rangeError) {
            error.amount = rangeError;
            isHasError = true;
          }
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
    // setOneTimePaymentErrors(oneTimePaymentErrors);

    if (isHasError) {
      return null;
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
    return {
      hostelId: state.login.selectedHostel_Id,
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
    };
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
    const value = sanitizeAmountInput(e.target.value);
    if (value === null) return;

    setBookingAmount(value);
    // Show range problems while typing; "required" is only reported on Next.
    setBookingAmountError(
      value
        ? validateAmount(value, {
          requiredMessage: "",
          label: "Booking Amount",
        })
        : "",
    );
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
    setBedWarning("");
    setJoiningDateError("");
    setBookingDateError("");
    setBookingAmountError("");
    setFloorError("");
    setRoomError("");
    setBedError("");
    // setRentError("");
    setPaymentError("");
    // setTransactionError("");

    let firstInvalidRef = null;

    if (!bookingDate) {
      setBookingDateError("Please Select Booking Date");

      if (!firstInvalidRef) {
        firstInvalidRef = bookingDateRef;
      }

      isValid = false;
    }

    const bookingAmountMessage = validateAmount(bookingAmount, {
      requiredMessage: "Please Enter Booking Amount",
      label: "Booking Amount",
    });
    if (bookingAmountMessage) {
      setBookingAmountError(bookingAmountMessage);

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

  const DraftTenantDetails =
    state?.UsersList?.alreadyAvailableDraftTenantGetList;

  // Restore a saved draft into the form once, when the wizard was opened on an
  // existing draft. Later draft refreshes never overwrite what the user typed.

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

      // setTotalRent(DraftTenantDetails?.hostelInfo?.monthlyRent || "");
      setAdvanceAmount(DraftTenantDetails?.hostelInfo?.advanceAmount || "");

      setModeOfPayment(DraftTenantDetails?.bankId || "");
      setTransactionId(DraftTenantDetails?.referenceNumber || "");

      setCheckinFloor(DraftTenantDetails?.hostelInfo?.floorId);
      setCheckinRoom(DraftTenantDetails?.hostelInfo?.roomId);
      setCheckinBed(DraftTenantDetails?.hostelInfo?.bedId);
      setJoiningDate(
        DraftTenantDetails?.hostelInfo?.joiningDate
          ? dayjs(DraftTenantDetails?.hostelInfo?.joiningDate, "DD-MM-YYYY")
          : null,
      );
      setStayType(DraftTenantDetails?.stayType || "LONG");

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
      setSelectedAmenities(fromAmenityPayload(DraftTenantDetails?.amenities));
      setAmenityProRate(DraftTenantDetails?.amenityProRate ?? true);
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
      // setTotalRent("");
      setAdvanceAmount("");
      setModeOfPayment("");
      setTransactionId("");
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











  const formatApiDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${day}-${month}-${d.getFullYear()}`;
  };

  // Validates the booking form and returns the ADD_BOOKING payload (without the
  // customerId, which the parent adds), or null when something is invalid.
  const prepareBooking = () => {
    setBedWarning("");
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
    if (!validateBookingDraft()) return null;

    return {
      hostelId: state.login.selectedHostel_Id,
      joiningDate: formatApiDate(bookingJoiningDate),
      bookingDate: formatApiDate(bookingDate),
      bookingAmount: bookingAmount,
      floorId: bookingFloor,
      roomId: bookingRoom,
      bedId: bookingBed,
      bankId: modeOfPayment,
      referenceNumber: transactionId,
    };
  };

  // Final submissions. Only the parent's Preview Details confirmation calls these,
  // after the draft customer exists.
  const submitCheckin = (customerId) => {
    const payload = prepareCheckin();
    if (!payload) return false;
    dispatch({
      type: "DIRECT_CHECK_IN_SAGA",
      payload: { ...payload, customerId, ...amenityApiFields() },
    });
    return true;
  };

  const submitBooking = (customerId) => {
    const payload = prepareBooking();
    if (!payload) return false;
    dispatch({ type: "ADD_BOOKING", payload: { ...payload, customerId } });
    return true;
  };

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      dispatch({ type: "ERROR_BOOKING_REMOVE" });
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      dispatch({ type: "CLEAR_PHONE_ERROR" });
      dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      onSubmitSuccess?.("booking");
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForDirectCheckInCustomer === 201) {
      dispatch({ type: "REMOVE_DIRECT_CHECK_IN_REDUCER" });
      onSubmitSuccess?.("checkin");
    }
  }, [state.UsersList?.statusCodeForDirectCheckInCustomer]);

  useEffect(() => {
    if (state.UsersList?.bedError) {
      onSubmitError?.();
    }
  }, [state.UsersList?.bedError]);

  // const resetBookingForm = () => {
  //   setBookingDate(null);
  //   setBookingAmount("");
  //   setBookingJoiningDate(null);
  //   setBookingFloor("");
  //   setBookingRoom("");
  //   setBookingBed("");
  //   // setTotalRent("");
  //   setModeOfPayment("");
  //   setTransactionId("");
  //   setIsConfirmChecked(false);
  //   setBookingDateError("");
  //   setBookingAmountError("");
  //   setJoiningDateError("");
  //   setFloorError("");
  //   setRoomError("");
  //   setBedError("");
  //   setRentError("");
  //   setPaymentError("");
  //   setBedWarning("");
  // };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      onSubmitError?.();
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.Booking?.bookingBedError) {
      onSubmitError?.();
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
      const numericValue = sanitizeAmountInput(value);
      if (numericValue === null) return;
      if (!updatedErrors[index]) updatedErrors[index] = { reason: "", amount: "" };
      updatedErrors[index].amount = numericValue
        ? validateAmount(numericValue, {
          requiredMessage: "",
          label: "Amount",
          max: MAX_DEPOSIT_AMOUNT,
        })
        : "";

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



  const paymentOptionsV1 =
    state.UsersList?.availableBedList?.bankDetails?.map((bank) => {
      const label = bank?.accountHolderName || "";

      const subLabel = [
        bank?.isBank ? bank?.bankName : bank?.accountType,
        bank?.displayName,
      ]
        .filter(Boolean)
        .join(" - ");

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


  // const handleInputChangeOneTime = (index, field, value) => {
  //   const updatedFields = [...oneTimePayments];
  //   const updatedErrors = [...errors];

  //   if (field === "reason" || field === "customReason") {
  //     const cleanedValue = value.replace(/[^A-Za-z ]/g, "");

  //     if (field === "reason") {
  //       if (cleanedValue.toLowerCase() === "others") {
  //         updatedFields[index].showInput = true;
  //         updatedFields[index].reason_name = "others";
  //         updatedFields[index].customReason = "";
  //       } else {
  //         updatedFields[index].showInput = false;
  //         updatedFields[index].reason = cleanedValue;
  //         updatedFields[index].reason_name = cleanedValue;
  //         updatedFields[index].customReason = "";
  //       }
  //     } else if (field === "customReason") {
  //       updatedFields[index].customReason = cleanedValue;
  //     }

  //     if (updatedErrors[index]) updatedErrors[index].reason = "";
  //   } else if (field === "amount") {
  //     let numericValue = value.replace(/[^0-9.]/g, "");

  //     if (numericValue.startsWith("0")) {
  //       numericValue = numericValue.replace(/^0+/, "");
  //     }

  //     if (numericValue === "") {
  //       numericValue = "";
  //     }

  //     updatedFields[index].amount = numericValue;

  //     if (updatedErrors[index]) updatedErrors[index].amount = "";
  //   }

  //   setOneTimePayments(updatedFields);
  //   // setOneTimePaymentErrors(updatedErrors);
  // };

  const handleCustomRentChange = (e) => {
    const value = sanitizeAmountInput(e.target.value);
    if (value === null) return;
    setCustomRent(value);
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

  // const handleAccordionToggle = () => {
  //   setIsOpen((prev) => !prev);
  // };

  // const handleAddOneTimePayment = () => {
  //   setOneTimePayments([
  //     ...oneTimePayments,
  //     {
  //       reason: "",
  //       reason_name: "",
  //       customReason: "",
  //       amount: "",
  //       showInput: false,
  //     },
  //   ]);
  // };

  // const handleRemoveFieldOneTime = (index) => {
  //   const updatedFields = [...oneTimePayments];
  //   updatedFields.splice(index, 1);
  //   setOneTimePayments(updatedFields);

  //   const updatedErrors = [...errors];
  //   updatedErrors.splice(index, 1);
  //   setOneTimePaymentErrors(updatedErrors);
  // };

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
    if (bookingOnly) {
      setActiveTab("booking");
    } else {
      setActiveTab("checkin");
    }
  }, [bookingOnly]);

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

  // useEffect(() => {
  //   if (bookingJoiningDate || joiningDate) {
  //     const formatDate = (date) => {
  //       if (!date) return "";
  //       const d = new Date(date);
  //       const day = String(d.getDate()).padStart(2, "0");
  //       const month = String(d.getMonth() + 1).padStart(2, "0");
  //       const year = d.getFullYear();
  //       return `${day}-${month}-${year}`;
  //     };

  //     const joiningDateForFormatted = formatDate(
  //       bookingJoiningDate || joiningDate,
  //     );
  //     dispatch({
  //       type: "AVAILBALEBEDDETAILS",
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         joiningDate: joiningDateForFormatted,
  //       },
  //     });
  //   }
  // }, [bookingJoiningDate, joiningDate]);




  const availableBedRequestRef = useRef(null);

  useEffect(() => {
    const hostelId = state.login.selectedHostel_Id;
    const selectedDate = bookingJoiningDate || joiningDate;

    if (!hostelId || !selectedDate) return;

    const formatDate = (date) => {
      if (!date) return "";

      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(selectedDate);

    const requestKey = {
      hostelId,
      joiningDate: joiningDateForFormatted,
    };

    if (
      JSON.stringify(availableBedRequestRef.current) ===
      JSON.stringify(requestKey)
    ) return;

    availableBedRequestRef.current = requestKey;

    dispatch({
      type: "AVAILBALEBEDDETAILS",
      payload: requestKey,
    });
  }, [
    state.login.selectedHostel_Id,
    bookingJoiningDate,
    joiningDate,
  ]);


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

  // const isPastMonth = joiningDate
  //   ? dayjs(joiningDate).isBefore(dayjs(), "month")
  //   : false;

  // const deductionsTotal = fields?.reduce(
  //   (sum, item) => sum + Number(item.amount || 0),
  //   0,
  // );

  // const oneTimeDeductionTotal = oneTimePayments?.reduce(
  //   (sum, item) => sum + Number(item.amount || 0),
  //   0,
  // );
  // const [proRateRent, setProRateRent] = useState(0);

  // useEffect(() => {
  //   if (!joiningDate || !rentAmount) {
  //     setProRateRent(0);
  //     return;
  //   }

  //   const date = dayjs(joiningDate);
  //   const totalDays = date.daysInMonth();
  //   const remainingDays = totalDays - date.date() + 1;

  //   const amount = Math.round((Number(rentAmount) / totalDays) * remainingDays);

  //   setProRateRent(amount);
  // }, [joiningDate, rentAmount, customRentEnable]);

  // const summaryRent =
  //   customRentEnable && Number(customRent) > 0
  //     ? Number(customRent)
  //     : isGracePeriodApplicable
  //       ? Number(rentAmount || 0)
  //       : collectFullRent
  //         ? Number(rentAmount || 0)
  //         : isjoiningBased
  //           ? Number(rentAmount || 0)
  //           : Number(proRateRent || 0);

  // const totalSummary =
  //   Number(advanceAmount || 0) +
  //   deductionsTotal +
  //   oneTimeDeductionTotal +
  //   summaryRent;

  const isBookingTab = activeTab === "booking";

  const labelOf = (options, value) =>
    options?.find((option) => String(option.value) === String(value))?.label ||
    "";

  const bedLabel = (beds, bedId) =>
    (beds || []).find((bed) => String(bed?.bedId) === String(bedId))?.bedName ||
    "";

  const formatPayload = (list) =>
    (list || [])
      .map((item) => ({
        type:
          item.reason === "others"
            ? item.customReason
            : item.reason || item.reason_name || "",
        amount: Number(item.amount) || 0,
      }))
      .filter((item) => item.type && item.amount);

  // Every ticked amenity needs a plan (the card shows the inline message).
  const amenityPlansMissing = () =>
    Object.values(selectedAmenities).some((planKey) => !planKey);

  // New amenity fields: only sent once the backend accepts them (same flag as
  // the other new draft fields), so today's requests stay unchanged.
  const amenityApiFields = () =>
    DRAFT_EXTRA_FIELDS_ENABLED
      ? {
        amenities: toAmenityPayload(selectedAmenities, hostelAmenities),
        amenityProRate,
      }
      : {};

  const validateCheckinStep = () =>
    prepareCheckin() !== null && !amenityPlansMissing();

  // Step 2 values that belong in a saved draft (merged with the personal details
  // by the parent). Booking and Check-in share the floor / room / bed columns.
  const getDraftFields = () => {
    const bed = isBookingTab ? bookingBed : checkinBed;
    const room = isBookingTab ? bookingRoom : checkinRoom;
    const floor = isBookingTab ? bookingFloor : checkinFloor;

    return {
      joiningDate: isBookingTab
        ? DraftTenantDetails?.hostelInfo?.joiningDate || ""
        : formatApiDate(joiningDate),
      bookingDate: formatApiDate(bookingDate),
      bookingAmount: bookingAmount ? Number(bookingAmount) : "",
      bedId: bed ? Number(bed) : "",
      roomId: room ? Number(room) : "",
      floorId: floor ? Number(floor) : "",
      bankId: modeOfPayment || "",
      referenceNumber: transactionId || "",
      advanceAmount: Number(isAdvanceRefused ? 0 : advanceAmount || 0),
      rentalAmount: Number(rentAmount || 0),
      stayType: stayType,
      deductions: formatPayload(fields),
      booking: {
        joiningDateTentative: formatApiDate(bookingJoiningDate),
        refuseAdvanceAmount: isAdvanceRefused,
      },
      shouldCollectFullRent: collectFullRent,
      customRent: Number(customRent),
      oneTimeDeduction: formatPayload(oneTimePayments),
      ...amenityApiFields(),
    };
  };

  // Read-only view of the form for the Preview Details step.
  const getSummary = () => {
    const floor = isBookingTab ? bookingFloor : checkinFloor;
    const room = isBookingTab ? bookingRoom : checkinRoom;
    const bed = isBookingTab ? bookingBed : checkinBed;

    return {
      flow: activeTab,
      floor: labelOf(floorOptions, floor),
      room: labelOf(isBookingTab ? bookingRoomOptions : checkinRoomOptions, room),
      bed: bedLabel(isBookingTab ? availableBed : availableCheckinBed, bed),
      stayType: isBookingTab ? "" : stayType,
      joiningDate: formatDisplayDate(isBookingTab ? bookingJoiningDate : joiningDate),
      bookingDate: formatDisplayDate(bookingDate),
      bookingAmount,
      modeOfPayment: labelOf(paymentOptionsV1, modeOfPayment),
      transactionId,
      rentAmount,
      advanceAmount: isAdvanceRefused ? "" : advanceAmount,
      isAdvanceRefused,
      nonRefundable: formatPayload(fields),
      oneTime: formatPayload(oneTimePayments),
      collectFullRent,
      customRent: customRentEnable ? customRent : "",
      // First-month rent, same rules the form shows (estimate for Preview only).
      rentMode:
        customRentEnable && Number(customRent) > 0
          ? "custom"
          : collectFullRent || isjoiningBased
            ? "full"
            : "prorated",
      rentFirst:
        customRentEnable && Number(customRent) > 0
          ? Number(customRent)
          : collectFullRent || isjoiningBased
            ? Number(rentAmount) || 0
            : estimateFirstCharge(
              { billingUnit: "MONTHLY", amount: rentAmount },
              joiningDate,
              true,
              false,
            ),
      amenityProRate,
      amenities: isBookingTab
        ? []
        : Object.entries(selectedAmenities)
          .map(([amenityId, planKey]) => {
            const amenity = hostelAmenities.find(
              (a) => String(a.amenityId) === String(amenityId),
            );
            const plan = amenity?.plans.find((p) => p.key === planKey);
            if (!amenity || !plan) return null;
            return {
              key: `${amenityId}-${planKey}`,
              name: amenity.name,
              planName: plan.planName,
              frequency: unitLabel(plan.billingUnit),
              price: formatPlanPrice(plan),
              oneTime: plan.billingUnit === "ONE_TIME",
              prorated:
                plan.billingUnit === "MONTHLY" && amenityProRate && !isjoiningBased,
              estimate: estimateFirstCharge(
                plan,
                joiningDate,
                amenityProRate,
                isjoiningBased,
              ),
            };
          })
          .filter(Boolean),
    };
  };

  useImperativeHandle(ref, () => ({
    // Shows inline errors and returns true when the current tab is complete.
    validate: () => (isBookingTab ? validateBookingDraft() : validateCheckinStep()),
    getDraftFields,
    getSummary,
    getFlow: () => activeTab,
    canSubmit: () => (isBookingTab ? canWriteBooking : canWriteCustomers),
    submitCheckin,
    submitBooking,
    hasSubmitError: () => !!bedWarning,
  }));

  const handleNext = () => {
    if (isBookingTab ? validateBookingDraft() : validateCheckinStep()) {
      onNext?.();
    }
  };

  const footer = (
    <div className={TENANT_FOOTER_CLASS}>
      <button
        type="button"
        disabled={draftSaving}
        onClick={onSaveDraft}
        className={TENANT_BTN_SECONDARY}
      >
        {draftSaving ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
            Saving...
          </>
        ) : (
          "Save Draft"
        )}
      </button>
      <button type="button" onClick={handleNext} className={TENANT_BTN_PRIMARY}>
        Next <ArrowRight color="#FFFFFF" size="16" />
      </button>
    </div>
  );

  return (
    <div className="bg-white w-full">
      <div className="flex justify-between">
        <div className="flex bg-[#ECEEF0] p-1 rounded-lg w-fit mb-6">
          {!bookingOnly && (
            <button
              onClick={() => {
                setActiveTab("checkin");
                dispatch({ type: "ERROR_BOOKING_REMOVE" });
              }}
              className={`px-4 py-1.5 text-sm rounded-md ${activeTab === "checkin"
                ? "bg-white shadow text-[#1E45E1]"
                : "text-gray-500"
                }`}
            >
              Check-In
            </button>
          )}
          <button
            onClick={() => setActiveTab("booking")}
            className={`px-4 py-1.5 text-sm rounded-md ${activeTab === "booking"
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
                  className={datePickerClass(!!bookingDateError)}
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
              <AmountInput
                inputRef={bookingAmountRef}
                value={bookingAmount}
                onChange={handleBookingAmountChange}
                placeholder="Enter Booking Amount"
                hasError={!!bookingAmountError}
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
                  className={datePickerClass(!!joiningDateError)}
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
                  className={`px-2 py-1 text-[10px] rounded flex gap-2 items-center ${bookingJoiningDate
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
                  styles={fieldSelectStyles(!!floorError)}
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
                  styles={fieldSelectStyles(!!roomError)}
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
                  styles={fieldSelectStyles(!!state.Booking?.bookingBedError)}
                />

                <div className="flex justify-end">
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
              className={fieldClass(!!rentError)}
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
                menuPlacement="bottom"
                menuPosition="fixed"
                isDisabled={!bookingJoiningDate}
                noOptionsMessage={() => "No mode available"}
                styles={fieldSelectStyles(!!paymentError)}
                components={{
                  Option,
                  SingleValue,
                  DropdownIndicator,
                  GroupHeading,
                  IndicatorSeparator: () => null,
                }}
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
                className={fieldClass()}
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
                styles={fieldSelectStyles()}
              />
            </div> */}
          </div>

          {footer}
        </div>
      ) : (
        <div>
          <div className="mb-[14px] grid grid-cols-2 gap-[20px]">
            {[
              { value: "LONG", label: "Long stay" },
              { value: "SHORT", label: "Short stay" },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => setStayType(option.value)}
                className={`flex h-[46px] items-center justify-center rounded-[5px] font-gilroy text-[15px] transition-colors ${stayType === option.value
                  ? "border-[1px] border-solid border-[#1E45E1] bg-[#1E45E1] font-semibold text-white"
                  : "bg-[#F5F5F5] font-medium text-[#222222] hover:bg-[#EBEBEC]"
                  }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {stayType === "LONG" ? (
            <div>
              <div className="grid grid-cols-1 gap-4 mb-2">
                <div className="mb-2" ref={CheckinJoiningDateRef}>
                  <label className="text-sm font-medium text-[#222222] mb-2 block">
                    Joining Date <span className="text-red-500 text-xl">*</span>
                  </label>
                  <div className="datepicker-wrapper relative w-full">
                    <DatePicker
                      className={datePickerClass(!!checkInJoiningDateError)}
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

              <StepCard title="Stay details">
                <div>
                  <div className="flex justify-between mb-2 ">
                    <div>
                      <label className="text-sm font-medium text-[#222222] mb-2 block">
                        Select Stay Details <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <div className="relative inline-block group">
                      <button
                        onClick={() => {
                          if (joiningDate) {
                            handleBedLayoutPreview("checkin-way");
                          }
                        }}
                        className={`px-2 py-1 text-[10px] rounded flex gap-2 items-center ${joiningDate
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
                        styles={fieldSelectStyles(!!checkInFloorError)}
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
                        styles={fieldSelectStyles(!!checkInRoomError)}
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
                        styles={fieldSelectStyles(!!checkInBedError)}
                      />
                      {checkInBedError && (
                        <ErrorMessage message={checkInBedError} type="error" />
                      )}
                    </div>
                  </div>
                  {bedWarning ? (
                    <div className="flex justify-end me-2">
                      <ErrorMessage message={bedWarning} type="error" />
                    </div>
                  ) : null}
                </div>

              </StepCard>

              <StepCard title="Advance/ Deposit details">
                <div className="flex items-center justify-between">
                  <label className="m-0 text-sm text-[#222222] font-gilroy font-medium">
                    Total advance/security deposit amount ₹(INR)
                    {!isAdvanceRefused && (
                      <span className="text-red-500 text-xl">*</span>
                    )}
                  </label>

                  <div className="flex items-center justify-between mt-1 gap-2 ">
                    <span className="font-gilroy text-[12px] text-[#222222]">
                      Refuse this amount
                    </span>

                    <button
                      type="button"
                      onClick={() => {
                        setIsAdvanceRefused(!isAdvanceRefused);

                        if (!isAdvanceRefused) {
                          setAdvanceAmount("");
                          setFields([]);
                        }

                        // setAdvanceAmountError("");
                      }}
                      role="switch"
                      aria-checked={isAdvanceRefused}
                      aria-label="Refuse this amount"
                      className={`relative inline-flex h-[17px] w-[31px] items-center rounded-full p-[2px] transition-colors duration-300 ${isAdvanceRefused ? "bg-[#1E45E1]" : "bg-[#C0C4CA]"
                        }`}
                    >
                      <span
                        className={`inline-block h-[13.6px] w-[13.6px] transform rounded-full bg-[#FCFCFD] shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)] transition-transform duration-300 ${isAdvanceRefused ? "translate-x-[14px]" : "translate-x-0"
                          }`}
                      />
                    </button>
                  </div>
                </div>
                {!isAdvanceRefused && (
                  <>
                    <div className="grid grid-cols-12 gap-x-4 rounded-[8px] border-[1px] border-solid border-[#F2F4F6] bg-[#FBFCFF] px-[14px] py-[16px]">
                      <div className="col-span-12">
                        <div className="">
                          <label className="text-sm font-gilroy font-medium mb-2 text-[#222222]">
                            Refundable Amount
                          </label>
                        </div>
                        <AmountInput
                          inputRef={advanceAmountRef}
                          value={advanceAmount}
                          onChange={handleAdvanceAmount}
                          placeholder="0.00"
                          disabled={isAdvanceRefused}
                          hasError={!!checkInAdvanceAmountError}
                          className="mt-[8px]"
                        />

                        {!isAdvanceRefused && checkInAdvanceAmountError && (
                          <ErrorMessage
                            message={checkInAdvanceAmountError}
                            type="error"
                          />
                        )}

                        <div className="">
                          <label className="mb-[12px] mt-[16px] block font-gilroy text-sm font-medium text-[#222222]">
                            Non Refundable Amount
                          </label>
                          {fields?.length > 0 && (
                            <div className="mb-[12px] flex flex-col gap-[12px]">
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

                                // Figma 7145:163214: reason | ₹ amount side by side,
                                // round remove button on the row's top-right corner.
                                return (
                                  <div className="relative" key={index}>
                                    <div className="flex items-start gap-[14px]">
                                      <div className="min-w-0 flex-1">
                                        {!item.showInput ? (
                                          <Select
                                            menuPlacement="top"
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
                                            styles={fieldSelectStyles()}
                                          />
                                        ) : (
                                          <>
                                            <input
                                              type="text"
                                              className={fieldClass(!!errors[index]?.reason)}
                                              placeholder="Enter custom reason"
                                              value={item.customReason}
                                              onChange={(e) =>
                                                handleInputChange(
                                                  index,
                                                  "customReason",
                                                  e.target.value,
                                                )
                                              }

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

                                      <div className="min-w-0 flex-1">
                                        <AmountInput
                                          value={item.amount}
                                          placeholder="Enter amount"
                                          ariaLabel={`Non refundable amount ${index + 1}`}
                                          onChange={(e) =>
                                            handleInputChange(
                                              index,
                                              "amount",
                                              e.target.value,
                                            )
                                          }
                                          hasError={!!errors[index]?.amount}
                                        />
                                        {errors[index]?.amount && (
                                          <ErrorMessage
                                            message={errors[index]?.amount}
                                            type="error"
                                          />
                                        )}
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      aria-label={`Remove charge ${index + 1}`}
                                      onClick={() => handleRemoveField(index)}
                                      className="absolute -right-[8px] -top-[8px] z-[2] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#DCDCDC] hover:bg-[#C8C8C8]"
                                    >
                                      <img src={removeIcon} alt="" />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                          <button
                            type="button"
                            disabled={isAdvanceRefused}
                            onClick={handleAddField}
                            className="flex h-[36px] w-full items-center justify-center gap-[10px] rounded-[5px] bg-[#EAEEFF] font-gilroy text-[13.5px] font-semibold text-[#1E45E1] hover:bg-[#DFE5FF] disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500"
                          >
                            <AddCircle color="#1E45E1" size="17" />
                            Add
                          </button>

                          {/* <div className="mt-2 bg-[#F2F4F6] p-2  flex justify-between font-semibold rounded-b-lg">
              <span className="text-[#505F76] text-xs ">
                TOTAL FIXED CHARGES
              </span>
              <span className="text-[#191C1E] text-base">
                ₹ {total.toLocaleString()}
              </span>
            </div> */}
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {!isAdvanceRefused && (
                  <p className="m-0 px-[4px] font-gilroy text-[12px] leading-[18px] text-[#505F76]">
                    Note: The total check-in advance / security deposit collected
                    upfront under this single invoice only.
                  </p>
                )}
              </StepCard>

              <StepCard title="Rent details">
                <div className="grid grid-cols-1 gap-4">
                  <div className="mb-2">
                    <label className="text-sm font-medium text-[#222222] mb-2 block">
                      Rental amount-Base ₹(INR){" "}
                      <span className="text-red-500 text-xl">*</span>
                    </label>
                    <AmountInput
                      inputRef={rentAmountRef}
                      value={rentAmount}
                      onChange={handleRentAmountChange}
                      placeholder={
                        placeHolderRoomRent
                          ? `Selected Bed Rent is ${placeHolderRoomRent}`
                          : "Enter Amount"
                      }
                      hasError={!!checkInRentAmountError}
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
                    {!hideByPostPaidHostel && (
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
                                className={`text-sm rounded-md px-6 py-2 flex items-center gap-2 font-medium transition-all ${customRentEnable
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
                                  <AmountInput
                                    value={customRent}
                                    onChange={handleCustomRentChange}
                                    className="!pr-[64px]"
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
                                    styles={fieldSelectStyles()}
                                  />
                                ) : (
                                  <>
                                    <input
                                      type="text"
                                      className={fieldClass(!!oneTimePaymentErrors[index]?.reason)}
                                      placeholder="Enter custom reason"
                                      value={item.customReason}
                                      onChange={(e) =>
                                        handleInputChangeOneTime(
                                          index,
                                          "customReason",
                                          e.target.value,
                                        )
                                      }
                                     
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
                                  className={fieldClass(!!oneTimePaymentErrors[index]?.amount)}
                                 
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

              </StepCard>
              {
                isDev &&

                <TenantAmenitiesSection
                  selected={selectedAmenities}
                  onChange={setSelectedAmenities}
                  proRate={amenityProRate}
                  onProRateChange={setAmenityProRate}
                />
              }

              {footer}
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
});

AddTenantBookingCheckin.propTypes = {
  handleClose: PropTypes.func.isRequired,
  newTenant: PropTypes.bool,
  bookingOnly: PropTypes.bool,
  onFlowChange: PropTypes.func,
  restoredDraftId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onNext: PropTypes.func,
  onSaveDraft: PropTypes.func,
  draftSaving: PropTypes.bool,
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
  initialFlow: PropTypes.string,
};

export default AddTenantBookingCheckin;

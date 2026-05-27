import React, { useEffect, useState, useRef } from "react";
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
} from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import { IoBedOutline } from "react-icons/io5";
import PgLayoutView from "./PgLayoutView";
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

function AddTenantBookingCheckin({ handleClose, handleNextStep }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("booking");
  const [bookingDate, setBookingDate] = useState("");
  const [isConfirmChecked, setIsConfirmChecked] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [bookingJoiningDate, setBookingJoiningDate] = useState(null);
  const [bookingAmount, setBookingAmount] = useState("");
  const [bookingFloor, setBookingFloor] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [availableBed, setAvailableBed] = useState("");
  const [bookingBed, setBookingBed] = useState(null);
  const [totalRent, setTotalRent] = useState("");
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState([]);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [pgLayout, setPgLatyout] = useState(false);
  const [joiningDate, setJoiningDate] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [checkinFloor, setCheckinFloor] = useState(null);
  const [checkinRoom, setCheckinRoom] = useState(null);
  const [checkinBed, setCheckinBed] = useState(null);
  const [bedWarning, setBedWarning] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [ebReading, setEbReading] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [reading, setReading] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [isAdvanceRefused, setIsAdvanceRefused] = useState(false);

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

  const joiningDateRef = useRef(null);
  const bookingDateRef = useRef(null);
  const bookingAmountRef = useRef(null);
  const floorRef = useRef(null);
  const roomRef = useRef(null);
  const bedRef = useRef(null);
  const rentRef = useRef(null);
  const paymentRef = useRef(null);
  const transactionRef = useRef(null);

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

  const total = fields.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handleAdvanceAmount = (e) => {
    const value = e.target.value;

    if (value === "" || /^(0|[1-9]\d*)$/.test(value)) {
      setAdvanceAmount(value);
      setAdvanceAmountError("");
    }
  };

  const handleJoiningDateChange = (date) => {
    setJoiningDate(date ? date.toDate() : null);
  };

  const handleAdvanceAmountChange = (e) => {
    setAdvanceAmount(e.target.value);
  };

  const handleRentAmountChange = (e) => {
    setRentAmount(e.target.value);
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
    setBookingBed(val.value);
    setBedError("");
  };
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
    setModeOfPayment(selectedOption.value);
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

    if (!totalRent) {
      setRentError("Please Enter Total Rent");

      if (!firstInvalidRef) {
        firstInvalidRef = rentRef;
      }

      isValid = false;
    }

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

  const handleBookingSaveDraft = () => {
    const isValid = validateBookingDraft();

    if (!isValid) return;

    dispatch({
      type: "SAVE_DRAFT_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        joiningDate: bookingJoiningDate
          ? dayjs(bookingJoiningDate).format("YYYY-MM-DD")
          : "",
        bookingDate: bookingDate ? dayjs(bookingDate).format("YYYY-MM-DD") : "",
        bookingAmount: Number(bookingAmount || 0),
        floorId: bookingFloor || 0,
        roomId: bookingRoom || 0,
        bedId: bookingBed || 0,
        bankId: modeOfPayment || "",
        referenceNumber: transactionId,
        advanceAmount: Number(bookingAmount || 0),
        rentalAmount: Number(totalRent || 0),
      },
    });
    setFormLoading(true);
  };

  useEffect(() => {
    if (state.UsersList?.saveDreaftTenant === 201) {
      setFormLoading(false);

      dispatch({ type: "REMOVE_SAVE_DRAFT_REDUCER" });
    }
  }, [state.UsersList?.saveDreaftTenant]);

  // Checkin

  const handleCheckinFloorChange = (val) => setCheckinFloor(val.value);
  const handleCheckinRoomChange = (val) => setCheckinRoom(val.value);

  const handleCheckinBedChange = (val) => {
    const selectedBedId = val?.value || "";
    setCheckinBed(selectedBedId);
    const selectedBed = state.UsersList?.availableBedList?.listBeds?.find(
      (bed) => String(bed.bedId) === String(selectedBedId),
    );

    if (selectedBed) {
      if (selectedBed.shouldShowError) {
        setBedWarning(selectedBed.errorMessage);
      } else {
        setBedWarning("");
      }
    }
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

  useEffect(() => {
    dispatch({
      type: "ALLFLOORLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);

  useEffect(() => {
    if (bookingFloor) {
      dispatch({
        type: "GETALLROOMSLIST",
        payload: { floor_Id: bookingFloor },
      });
    }
  }, [bookingFloor]);

  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_ALL_FLOOR_LIST" });
      }, 500);
    }
  }, [state.UsersList.floorListStatusCode]);

  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_ALL_ROOMS_STATUS_CODE" });
      }, 100);
    }
  }, [state?.PgList?.getAllRoomSuccessStatus]);

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
    if (bookingJoiningDate) {
      const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, "0");
        const month = String(d.getMonth() + 1).padStart(2, "0");
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
      };

      const joiningDateForFormatted = formatDate(bookingJoiningDate);
      dispatch({
        type: "AVAILBALEBEDDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          joiningDate: joiningDateForFormatted,
        },
      });
    }
  }, [bookingJoiningDate]);

  const handleBedLayoutPreview = () => {
    setPgLatyout(true);
  };

  const handleClosePgLayOut = () => {
    setPgLatyout(false);
  };

  return (
    <div className="bg-white w-full">
      <div className="flex bg-[#ECEEF0] p-1 rounded-lg w-fit mb-6">
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

        <button
          onClick={() => setActiveTab("checkin")}
          className={`px-4 py-1.5 text-sm rounded-md ${
            activeTab === "checkin"
              ? "bg-white shadow text-[#1E45E1]"
              : "text-gray-500"
          }`}
        >
          Check-In
        </button>
      </div>

      {activeTab === "booking" ? (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-3">
              <label className="mb-2 text-sm font-medium text-[#222222]  block">
                Booking Date
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
                Booking Amount
              </label>
              <input
                ref={bookingAmountRef}
                value={bookingAmount}
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

            <div className="datepicker-wrapper relative w-full mt-1">
              <div className="datepicker-wrapper relative w-full">
                <DatePicker
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
                  popupStyle={{
                    zIndex: 2000,
                    top: "10px",
                    left: "435px",
                  }}
                  placement="top"
                />
              </div>
              {joiningDateError && (
                <ErrorMessage message={joiningDateError} type="error" />
              )}
            </div>
          </div>
          <div className="mb-2">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Select Stay Details
            </label>

            <div className="grid grid-cols-3 gap-3">
              <div ref={floorRef}>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Floor <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={
                    state.UsersList.floorList?.map((u) => ({
                      value: u.id,
                      label: u.name,
                    })) || []
                  }
                  value={
                    state.UsersList.floorList?.find(
                      (option) => option.id === bookingFloor,
                    )
                      ? {
                          value: bookingFloor,
                          label: state.UsersList.floorList.find(
                            (option) => option.id === bookingFloor,
                          )?.name,
                        }
                      : null
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
                  options={roomOptions}
                  value={
                    state.PgList?.roomsList?.find(
                      (option) => option.id === bookingRoom,
                    )
                      ? {
                          value: bookingRoom,
                          label: state.PgList?.roomsList.find(
                            (option) => option.id === bookingRoom,
                          )?.name,
                        }
                      : null
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
                {bedError && <ErrorMessage message={bedError} type="error" />}
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Total Rent <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              ref={rentRef}
              value={totalRent}
              onChange={handleTotalRentChange}
              placeholder="Enter  Total Rent"
              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
            />
            {rentError && <ErrorMessage message={rentError} type="error" />}
          </div>

          <div className="grid grid-cols-2 gap-4">
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
            </div>
          </div>
          <div className="mb-2">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Transaction ID
            </label>

            <input
              value={transactionId}
              onChange={(e) => handleTransactionId(e)}
              placeholder="Enter Transaction ID"
              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
            />
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
            <button
              disabled={formLoading || !isConfirmChecked}
              onClick={handleBookingSaveDraft}
              className={`!font-gilroy text-sm border-1 !font-semibold !rounded-md 
  !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap 
  flex items-center justify-center gap-2
  ${
    formLoading || !isConfirmChecked
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
            <div className="flex gap-2">
              <button
                // disabled={isAlredayTenant}
                className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
              >
                Book
              </button>
              <button
                className="!font-gilroy text-sm flex items-center justify-center gap-1 !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                onClick={handleNextStep}
              >
                Next <ArrowRight color="#FFFFFF" size="18" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-2">
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
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-2">
            <div className="mb-2">
              <label className="mb-2 block font-gilroy text-sm font-medium leading-normal text-[#222222]">
                Stay Type <span className="text-xl text-red-600">*</span>
              </label>

              <Select
                options={longStayOnly}
                value={selectedStayType}
                onChange={(selectedOption) => {
                  setSelectedStayType(selectedOption);
                  handleStayTypeChange(selectedOption);

                  setStay_typenameErrmsg("");
                }}
                placeholder="Select a type"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No stay types available"}
                styles={CustomStyles}
              />

              {stay_typenameErrmsg?.trim() !== "" && (
                <ErrorMessage message={stay_typenameErrmsg} type="error" />
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
              <button
                onClick={handleBedLayoutPreview}
                className="bg-[#EDF3FF] text-[#1E45E1] px-2 py-1 text-[10px] rounded flex gap-2 items-center"
              >
                <IoBedOutline className="text-[12px]" /> Bed Layout View
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Floor <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={options}
                  value={checkinFloor}
                  onChange={handleCheckinFloorChange}
                  styles={CustomStyles}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Room <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={options}
                  value={checkinRoom}
                  onChange={handleCheckinRoomChange}
                  styles={CustomStyles}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Bed <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={options}
                  value={checkinBed}
                  onChange={handleCheckinBedChange}
                  styles={CustomStyles}
                />
              </div>
              {bedWarning ? (
                <div className="">
                  <ErrorMessage message={bedWarning} type="error" />
                </div>
              ) : null}
            </div>
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
                      if (!isAdvanceRefused) setAdvanceAmount("");
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

              <input
                type="text"
                placeholder="Enter Amount"
                value={advanceAmount}
                onChange={handleAdvanceAmount}
                disabled={isAdvanceRefused}
                className={`w-full text-[14px] text-gray-700 font-gilroy ${
                  advanceAmount ? "font-semibold" : "font-medium"
                } shadow-none border h-12 rounded-md px-3 outline-none ${
                  isAdvanceRefused
                    ? "bg-gray-100 border-gray-200 cursor-not-allowed"
                    : "border-gray-300"
                }`}
              />

              {!isAdvanceRefused && advanceAmountError && (
                <ErrorMessage message={advanceAmountError} type="error" />
              )}
            </div>
          </div>

          <div className="border-1 rounded-lg border-[#F2F4F6]  bg-[#F7FAFF] my-3">
            <div className="p-2">
              <label className="text-sm font-gilroy font-medium  text-[#222222]">
                Non Refundable Amount
              </label>
            </div>

            <div className=" bg-[#F7FAFF] rounded-lg p-2 ">
              {fields.map((item, index) => {
                const isMaintenanceSelected = fields.some(
                  (field) => field.reason === "maintenance",
                );

                const filteredOptions = reasonOptions.map((opt) => {
                  if (opt.value === "maintenance") {
                    return {
                      ...opt,
                      isDisabled:
                        isMaintenanceSelected && item.reason !== "maintenance",
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
                              handleInputChange(index, "reason", "others");
                            } else {
                              handleInputChange(index, "reason", selectedValue);
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
                          handleInputChange(index, "amount", e.target.value)
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
                onClick={handleAddField}
                className="!flex !items-center justify-center !w-full !gap-1.5 !bg-[#EAEEFF] !text-[#1E45E1] !font-semibold !text-sm !rounded-lg !px-6 !py-1.5 !mb-2 !font-gilroy"
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
            Note: These charges are deducted from the initial security deposit
            or collected at the time of check-in and are non-adjustable.
          </div>

          <div className="grid grid-cols-1 gap-4 mb-2">
            <div className="mb-2">
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Rental amount-Base ₹(INR){" "}
                <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                placeholder="Enter Rental Amount"
                value={rentAmount}
                onChange={handleRentAmountChange}
                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
              />
            </div>
          </div>

          <div className="flex items-center gap-2 my-4">
            <input
              type="checkbox"
              className="cursor-pointer accent-green-600 w-4 h-4 "
            />
            <span className="text-[#0A090B] text-sm ">
              Everything is Correct – Proceed to Check-in
            </span>
          </div>

          {/* <div className="flex justify-between mt-3">
            <button
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div> */}
          <div className="flex justify-between mt-3">
            <button
              // disabled={formLoading || isAlredayTenant}
              className="!font-gilroy text-sm !bg-[#EBEFFF] text-[#1E45E1] border-[#D6DEFF] border-1 !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
              // onClick={handleSaveUserlist}
            >
              Save Draft
            </button>
            <div className="flex gap-2">
              <button
                // disabled={isAlredayTenant}
                className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
              >
                Check in
              </button>
              <button
                className="!font-gilroy text-sm flex items-center justify-center gap-1 !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                onClick={handleNextStep}
              >
                Next <ArrowRight color="#FFFFFF" size="18" />
              </button>
            </div>
          </div>
        </div>
      )}

      {pgLayout && (
        <PgLayoutView show={pgLayout} handleClose={handleClosePgLayOut} />
      )}
    </div>
  );
}

export default AddTenantBookingCheckin;

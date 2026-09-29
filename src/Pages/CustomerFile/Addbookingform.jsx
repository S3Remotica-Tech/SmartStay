/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import { Image } from "react-bootstrap";
import "flatpickr/dist/themes/material_blue.css";
import { CloseCircle, ArrowDown2, Bank, Wallet2 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Select, { components } from "react-select";
import { toast } from "react-toastify";
import ErrorMessage from "../../Components/ErrorMessage";
import FormComingSoon from "../../Utils/FormComingSoon";

const Option = (props) => {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full ${data?.type === "BANK" ? "bg-blue-100" : "bg-green-100"} flex items-center justify-center`}
          >
            {data.icon}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#222222]">
              {data.label}
            </span>

            {data.subLabel && (
              <span className="text-xs text-[#6B7280]">{data.subLabel}</span>
            )}
          </div>
        </div>

        <span
          className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
            data.type === "BANK"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {data.type}
        </span>
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
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-[#EEF4FF] flex items-center justify-center">
          {data.icon}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium">{data.label}</span>
          <span className="text-xs text-[#6B7280]">{data.type}</span>
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

function BookingModal(props) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [joiningDate, setJoiningDate] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [room, setRoom] = useState("");
  const [Floor, setFloor] = useState("");
  const [bed, setBed] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [availableBed, setAvailableBed] = useState("");
  const [bedWarning, setBedWarning] = useState("");
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [dateError, setDateError] = useState("");
  const [bookingAmount, setBookingAmount] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [joiningDateError, setJoiningDateError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const errorRef = useRef(null);

  // const [file, setFile] = useState(null);

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "BEDNUMBERDETAILS", payload: { hostelId: state.login.selectedHostel_Id }
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (bedWarning && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      errorRef.current.focus?.();
    }
  }, [bedWarning]);
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [joiningDate]);

  useEffect(() => {
    if (state.Booking.bookingPhoneError) {
      setFormLoading(false);
      if (phoneInputRef.current) {
        phoneInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_PHONE_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingPhoneError]);

  useEffect(() => {
    if (state.Booking.bookingEmailError || state.Booking?.bookingBedError) {
      setFormLoading(false);
      if (EmailInputRef.current) {
        EmailInputRef.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingEmailError, state.Booking?.bookingBedError]);

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
  //   }
  // }, []);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false);

      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      dispatch({ type: "CLEAR_PHONE_ERROR" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  const calendarRef = useRef(null);
  const phoneInputRef = useRef(null);
  const EmailInputRef = useRef(null);

  const options = {
    dateFormat: "Y/m/d",

    defaultDate: joiningDate,
    minDate: new Date(),
  };

  const handleTransactionId = (e) => {
    setBedWarning("");
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };

  // const labelMap = {
  //   CARD: "Card",
  //   CASH: "Cash",
  //   UPI: "UPI",
  //   BANK: "Bank",
  // };

  const paymentOptions =
    state.UsersList?.availableBedList?.allPaymentMethods?.map((bank) => ({
      value: bank.bankId,
      label: bank.displayName,
      subLabel:
        bank.accountType === "BANK"
          ? `${bank.bankName} - ${bank.paymentMethod}`
          : `${bank.cashAccountType} `,
      type: bank.accountType,
      icon:
        bank.accountType === "BANK" ? (
          <Bank color="#1E45E1" size="16" />
        ) : (
          <Wallet2 color="#038C3D" size="16" />
        ),
      data: bank,
    })) || [];

  const handleModeOfPaymentChange = (selectedOption) => {
    setBedWarning("");
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    setPaymentError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  useEffect(() => {
    dispatch({
      type: "ALLFLOORLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);

  useEffect(() => {
    if (Floor) {
      dispatch({ type: "GETALLROOMSLIST", payload: { floor_Id: Floor } });
    }
  }, [Floor]);
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

  const handleRooms = (selectedOption) => {
    setBedWarning("");
    const selectedRoomId = selectedOption;

    setRoom(selectedRoomId);
    setBed("");

    if (selectedRoomId) {
      setRoomError("");
    } else {
      setRoomError("Please select a valid room.");
    }
  };
  useEffect(() => {
    if (room) {
      const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter(
        (view) => {
          return view.roomId === room;
        },
      );
      setAvailableBed(filteredBed);
    }
  }, [room, joiningDate, state.UsersList?.availableBedList?.listBeds]);

  //  view.floorId === Floor &&

  const handleCloseBooking = () => {
    setBedWarning("");
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
    props.handleCloseAddBooking();
  };

  const handleBookingDateChange = (date) => {
    setBedWarning("");
    setDateError("");
    setBookingDate(date ? date.toDate() : null);
    setJoiningDate("");
  };

  // const handleBookingAmountChange = (e) => {
  //   setAmountError("");
  //   setBookingAmount(e.target.value);
  // };
  const handleBookingAmountChange = (e) => {
    setBedWarning("");
    const value = e.target.value;

    if (/^\d*$/.test(value)) {
      setAmountError("");
      setBookingAmount(value);
    }
  };

  const handleJoiningDateChange = (date) => {
    setBedWarning("");
    if (bookingDate && dayjs(date).isBefore(dayjs(bookingDate), "day")) {
      setJoiningDateError("Joining Date cannot be before Booking Date");
      setJoiningDate(null);
    } else {
      setJoiningDateError("");
      setJoiningDate(date);
    }
  };

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

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (
      state.UsersList?.availableBedList?.bankDetails?.length === 0 &&
      !toastShownRef.current &&
      joiningDate
    ) {
      toastShownRef.current = true;
      toast.error(
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: "Gilroy" }}>
            Please Create Banking before adding booking
          </span>
        </div>,
      );
    }

    if (
      state.UsersList?.availableBedList?.bankDetails?.length > 0 &&
      toastShownRef.current
    ) {
      toastShownRef.current = false;
    }
  }, [state.UsersList?.availableBedList?.bankDetails]);

  const handleBed = (selectedOption) => {
    dispatch({ type: "ERROR_BOOKING_REMOVE" });

    setBedError("");

    const selectedBedId = selectedOption?.value || "";
    setBed(selectedBedId);

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

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const handleBookingSubmit = () => {
    setBedWarning("");
    dispatch({ type: "ERROR_BOOKING_REMOVE" });
    let isValid = true;

    if (!bookingDate) {
      setDateError("Please Select Booking Date");
      isValid = false;
    } else {
      setDateError("");
    }

    if (!bookingAmount) {
      setAmountError("Please Enter Booking Amount");
      isValid = false;
    } else if (isNaN(bookingAmount)) {
      setAmountError("Booking Amount must be a number");
      isValid = false;
    } else if (Number(bookingAmount) <= 0) {
      setAmountError("Booking Amount must be greater than 0");
      isValid = false;
    } else {
      setAmountError("");
    }

    if (!modeOfPayment) {
      setPaymentError("Please Select Mode Of Transaction");
      isValid = false;
    } else {
      setPaymentError("");
    }

    if (!joiningDate) {
      setJoiningDateError("Please Select Joining Date");
      isValid = false;
    } else {
      setJoiningDateError("");
    }

    if (!Floor) {
      setFloorError("Please Select Floor");
      isValid = false;
    } else {
      setFloorError("");
    }

    if (!room) {
      setRoomError("Please Select Room");
      isValid = false;
    } else {
      setRoomError("");
    }

    if (!bed) {
      setBedError("Please Select Bed");
      isValid = false;
    } else {
      setBedError("");
    }

    if (!isValid) return;

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
        bookingAmount: bookingAmount,
        floorId: Floor,
        roomId: room,
        bedId: bed,
        customerId: props.userDetail?.customerId,
        bankId: modeOfPayment,
        referenceNumber: transactionId,
      },
    });

    setFormLoading(true);
  };

  const handleFloor = (selectedOption) => {
    setBedWarning("");
    if (!selectedOption) {
      setFloorError("");
      setBed("");
      return;
    }
    setFloor(selectedOption.value);
    setRoom("");
    setBed("");
    setFloorError("");
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const isComingSoon = false;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="flex justify-between  px-4 py-3 shrink-0">
          <div className="!text-[20px] !font-semibold text-gray-900 font-gilroy">
            Tenant Booking
          </div>

          <CloseCircle
            size="24"
            color="#222222"
            onClick={handleCloseBooking}
            className="cursor-pointer"
          />
        </div>

        {state.Booking?.ErrorAssignBookingMobile && (
          <ErrorMessage
            message={state.Booking?.ErrorAssignBookingMobile}
            type="error"
          />
        )}
        {isComingSoon ? (
          <div className="">
            <FormComingSoon />
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-2 px-4 py-1 shrink-0">
              <div className="h-16 w-16 relative flex-shrink-0">
                {props.userDetail?.profilePic &&
                props.userDetail?.profilePic !== "0" ? (
                  <Image
                    src={props.userDetail?.profilePic}
                    roundedCircle
                    className="h-14 w-14"
                    alt="image"
                  />
                ) : (
                  <div
                    className="h-14 w-14 rounded-full bg-[#E2E8F0] text-[#44536A] flex justify-center items-center text-xl font-semibold font-gilroy truncate"
                    title={props.userDetail?.initials || "-"}
                  >
                    {props.userDetail?.initials || "-"}
                  </div>
                )}
              </div>
              <div className="">
                <div className="max-w-xs">
                  <label
                    className="pt-2 text-lg font-semibold text-gray-900 font-gilroy truncate"
                    title={props?.userDetail?.fullName}
                  >
                    {props?.userDetail?.fullName || "-"}
                  </label>
                </div>
                <div>
                  <label className=" text-sm font-gilroy text-gray-500 font-medium  truncate max-w-[150px]">
                    {props?.userDetail?.mobile}
                  </label>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 show-scrolls ">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <div>
                  <Form.Group controlId="bookingDate">
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Booking Date{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <div className="datepicker-wrapper relative w-full mt-px">
                      <DatePicker
                        className="w-full h-12 cursor-pointer font-gilroy"
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={bookingDate ? dayjs(bookingDate) : null}
                        onChange={handleBookingDateChange}
                        disabledDate={(current) =>
                          current && current > dayjs().endOf("day")
                        }
                        getPopupContainer={() => document.body}
                        popupStyle={{
                          zIndex: 2000,
                        }}
                        placement="topLeft"
                      />
                    </div>
                  </Form.Group>
                  {dateError && (
                    <ErrorMessage message={dateError} type="error" />
                  )}

                  {state.Booking?.ErrorAssignBookingDate && (
                    <ErrorMessage
                      message={state.Booking?.ErrorAssignBookingDate}
                      type="error"
                    />
                  )}
                </div>

                <div>
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Booking Amount{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <FormControl
                      type="text"
                      id="form-controls"
                      placeholder="Enter Booking Amount"
                      value={bookingAmount}
                      onChange={(e) => handleBookingAmountChange(e)}
                      onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className="text-base font-medium text-[#4B4B4B] font-gilroy border border-gray-300 h-[50px] rounded-lg focus:outline-none focus:ring-0"
                    />
                  </Form.Group>

                  {amountError && (
                    <ErrorMessage message={amountError} type="error" />
                  )}
                </div>

                <div>
                  <Form.Group controlId="joiningDate">
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Joining Date (Tentative){" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <div className="datepicker-wrapper relative w-full mt-1">
                      <div className="datepicker-wrapper relative w-full">
                        <DatePicker
                          className="w-full h-12 cursor-pointer font-gilroy"
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={joiningDate ? dayjs(joiningDate) : null}
                          onChange={handleJoiningDateChange}
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
                          popupStyle={{
                            zIndex: 2000,
                          }}
                          placement="topLeft"
                        />
                      </div>
                    </div>
                  </Form.Group>

                  {joiningDateError && (
                    <ErrorMessage message={joiningDateError} type="error" />
                  )}

                  {state.Booking?.ErrorAssignBookingDate && (
                    <ErrorMessage
                      message={state.Booking?.ErrorAssignBookingDate}
                      type="error"
                    />
                  )}
                </div>

                <div>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy mt-1">
                      Mode Of Transaction{" "}
                      <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <Select
                      options={paymentOptions}
                      menuPlacement="bottom"
                      menuPosition="fixed"
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
                      // isDisabled={currentItem}
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

                <div className="mt-1">
                  <Form.Group>
                    <Form.Label className="text-sm font-medium font-gilroy">
                      Transaction ID{" "}
                    </Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      placeholder="Enter Transaction ID"
                      value={transactionId}
                      onChange={(e) => handleTransactionId(e)}
                      className="w-full h-12 rounded-lg border border-gray-300 text-base font-medium text-[#4B4B4B] font-gilroy focus:outline-none focus:ring-0"
                    />
                  </Form.Group>
                </div>

                <div>
                  <Form.Group controlId="formFloor">
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Floor <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <Select
                      isDisabled={!joiningDate}
                      options={
                        state.UsersList.floorList?.map((u) => ({
                          value: u.id,
                          label: u.name,
                        })) || []
                      }
                      onChange={handleFloor}
                      value={
                        state.UsersList.floorList?.find(
                          (option) => option.id === Floor,
                        )
                          ? {
                              value: Floor,
                              label: state.UsersList.floorList.find(
                                (option) => option.id === Floor,
                              )?.name,
                            }
                          : null
                      }
                      placeholder="Select a Floor"
                      classNamePrefix="custom"
                      menuPlacement="auto"
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: "48px",
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
                          cursor: "pointer",
                          backgroundColor: state.isFocused
                            ? "#f0f0f0"
                            : "white",
                          color: "#000",
                        }),
                      }}
                    />
                  </Form.Group>

                  {floorError && (
                    <ErrorMessage message={floorError} type="error" />
                  )}
                </div>

                <div>
                  <Form.Group controlId="formRoom">
                    <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                      Room <span className="text-red-500 text-xl">*</span>
                    </Form.Label>

                    <Select
                      isDisabled={!joiningDate || !Floor}
                      options={roomOptions}
                      onChange={(selectedOption) =>
                        handleRooms(selectedOption?.value)
                      }
                      value={
                        state.PgList?.roomsList?.find(
                          (option) => option.id === room,
                        )
                          ? {
                              value: room,
                              label: state.PgList?.roomsList.find(
                                (option) => option.id === room,
                              )?.name,
                            }
                          : null
                      }
                      placeholder="Select a Room"
                      classNamePrefix="custom"
                      menuPlacement="top"
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
                          cursor: "pointer",
                          backgroundColor: state.isFocused
                            ? "#f0f0f0"
                            : "white",
                          color: "#000",
                        }),
                      }}
                    />
                  </Form.Group>
                  {roomError && (
                    <ErrorMessage message={roomError} type="error" />
                  )}
                </div>

                <div>
                  <Form.Label className="text-sm font-medium text-[#222222] font-gilroy">
                    Bed <span className="text-red-500 text-xl">*</span>
                  </Form.Label>

                  <Select
                    isDisabled={!joiningDate}
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
                              (option) => option?.bedId === bed,
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
                    menuPlacement="top"
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
                        cursor: "pointer",
                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                        color: "#000",
                      }),
                    }}
                  />

                  {state.Booking?.bookingBedError ? (
                    <ErrorMessage
                      message={state.Booking?.bookingBedError}
                      type="error"
                    />
                  ) : null}

                  {bedWarning ? (
                    <div ref={errorRef} tabIndex={-1} className="">
                      <ErrorMessage message={bedWarning} type="error" />
                    </div>
                  ) : null}
                  {bedError && <ErrorMessage message={bedError} type="error" />}
                </div>
              </div>
            </div>

            {formLoading && (
              <div className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-75">
                <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent"></div>
              </div>
            )}

            <div className="px-4 py-1">
              <div className="flex justify-end">
                <Button
                  onClick={handleCloseBooking}
                  className="bg-white !px-10 !py-1 !text-base font-normal !font-gilroy !text-[#4B4B4B] !border !border-white !rounded-lg"
                >
                  Cancel
                </Button>

                <Button
                  disabled={formLoading}
                  onClick={handleBookingSubmit}
                  className="!bg-[#1E45E1] !px-10 !py-1 !text-base !font-medium !font-gilroy !text-white !rounded-lg !disabled:opacity-60"
                >
                  Book
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

BookingModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleCloseAddBooking: PropTypes.func.isRequired,

  assignBooking: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,

  userDetail: PropTypes.shape({
    mobile: PropTypes.string,
    customerId: PropTypes.string,
    profilePic: PropTypes.string,
    firstName: PropTypes.string,
    initials: PropTypes.string,
    fullName: PropTypes.string,
  }).isRequired,
};

export default BookingModal;

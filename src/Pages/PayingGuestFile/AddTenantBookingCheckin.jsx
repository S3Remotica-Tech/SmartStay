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
} from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";

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

function AddTenantBookingCheckin({ handleClose }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("booking");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingJoiningDate, setBookingJoiningDate] = useState(null);
  const [bookingAmount, setBookingAmount] = useState("");
  const [bookingFloor, setBookingFloor] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [bookingBed, setBookingBed] = useState(null);
  const [totalRent, setTotalRent] = useState("");
  const [errors, setErrors] = useState([]);
  const [fields, setFields] = useState([
    { reason_name: "", amount: "", showInput: false },
  ]);
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [checkinFloor, setCheckinFloor] = useState(null);
  const [checkinRoom, setCheckinRoom] = useState(null);
  const [checkinBed, setCheckinBed] = useState(null);
  const [rentAmount, setRentAmount] = useState("");
  const [ebReading, setEbReading] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [reading, setReading] = useState("");

  const handleTransactionId = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z0-9_.-]*$/;

    if (regex.test(value)) {
      setTransactionId(value);
    }
  };

  const total = fields.reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const handleBookingDateChange = (date) => {
    setBookingDate(date ? date.toDate() : null);
  };

  const handleBookingAmountChange = (e) => {
    setBookingAmount(e.target.value);
  };

  const handleTotalRentChange = (e) => {
    setTotalRent(e.target.value);
  };

  const handleJoiningDateChange = (date) => {
    setJoiningDate(date ? date.toDate() : null);
  };

  const handleBookingJoiningDateChange = (date) => {
    setBookingJoiningDate(date ? date.toDate() : null);
  };

  const handleAdvanceAmountChange = (e) => {
    setAdvanceAmount(e.target.value);
  };

  const handleRentAmountChange = (e) => {
    setRentAmount(e.target.value);
  };

  const handleEbReadingChange = (e) => {
    setEbReading(e.target.value);
  };
  const handleBookingFloorChange = (val) => setBookingFloor(val);
  const handleBookingRoomChange = (val) => setBookingRoom(val);
  const handleBookingBedChange = (val) => setBookingBed(val);

  const handleCheckinFloorChange = (val) => setCheckinFloor(val);
  const handleCheckinRoomChange = (val) => setCheckinRoom(val);
  const handleCheckinBedChange = (val) => setCheckinBed(val);

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
              <div className="datepicker-wrapper relative w-full">
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
            </div>

            <div className="mb-3">
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Booking Amount
              </label>
              <input
                value={bookingAmount}
                onChange={handleBookingAmountChange}
                placeholder="Enter Booking Amount"
                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Select Stay Details
            </label>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Floor <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={options}
                  value={bookingFloor}
                  onChange={handleBookingFloorChange}
                  styles={CustomStyles}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Room <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={options}
                  value={bookingRoom}
                  onChange={handleBookingRoomChange}
                  styles={CustomStyles}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#222222] mb-2 block">
                  Bed <span className="text-red-500 text-xl">*</span>
                </label>
                <Select
                  options={options}
                  value={bookingBed}
                  onChange={handleBookingBedChange}
                  styles={CustomStyles}
                />
              </div>
            </div>
          </div>

          <div className="mb-2">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Total Rent <span className="text-red-500 text-xl">*</span>
            </label>
            <input
              value={totalRent}
              onChange={handleTotalRentChange}
              placeholder="Enter  Total Rent"
              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
            />
          </div>

          <div className="mb-2">
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
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-2">
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
              Transaction ID <span className="text-red-500 text-xl">*</span>
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
              className="cursor-pointer accent-green-600 w-4 h-4 "
            />
            <span className="text-[#0A090B] text-sm ">
              Everything is Correct – Proceed to Book
            </span>
          </div>

          <div className="flex justify-between mt-3">
            <button
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
              onClick={handleClose}
            >
              Cancel
            </button>
            <div className="flex gap-2">
              <button
                // disabled={formLoading || isAlredayTenant}
                className="!font-gilroy text-sm !bg-[#1E45E1] text-white !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                // onClick={handleSaveUserlist}
              >
                Save Draft
              </button>
              <button
                // disabled={isAlredayTenant}
                className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
              >
                Book
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

          <div className="mb-2">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Select Stay Details{" "}
            </label>

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
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-2">
            <div className="mb-2">
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Advance Amount <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                placeholder="Enter Advance Amount"
                value={advanceAmount}
                onChange={handleAdvanceAmountChange}
                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
              />
            </div>
            <div className="mb-2">
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Rental Amount <span className="text-red-500 text-xl">*</span>
              </label>
              <input
                placeholder="Enter Rental Amount"
                value={rentAmount}
                onChange={handleRentAmountChange}
                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
              />
            </div>
          </div>

          <div className="mb-2">
            <label className="text-xs text-gray-600 font-medium mb-1 block">
              EB Reading
            </label>

            <div className="flex items-center justify-between border border-[#C8D3FF]  rounded-lg px-3 h-[44px]">
              {isEditing ? (
                <input
                  type="number"
                  value={reading}
                  onChange={(e) => setReading(e.target.value)}
                  onBlur={() => setIsEditing(false)}
                  autoFocus
                  className="w-full bg-transparent outline-none text-[14px] text-gray-800 font-medium"
                />
              ) : (
                <span className="text-[14px] text-gray-800 font-medium">
                  {reading || "Enter reading"}
                </span>
              )}

              <Edit2
                size={16}
                className="text-gray-500 cursor-pointer ml-2"
                onClick={() => setIsEditing(true)}
              />
            </div>

            <div className="flex items-center gap-2 mt-2 bg-[#FEF3C7] text-[#92400E] text-[12px] px-3 py-2 rounded-md">
              <MessageQuestion size="18" />
              <label>
                This reading was calculated using the room's last entry. Edit if
                the Reading is Wrong.
              </label>
            </div>
          </div>

          <div className="my-2">
            <label className="text-sm font-gilroy font-medium  text-[#222222]">
              Non Refundable Amount
            </label>
          </div>
          <div className="border rounded-lg border-[#F3F3F3]">
            <div className="bg-[#FFFFFF] rounded-lg pb-1 mt-3 mb-3">
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
                        variant="Bulk"
                        size="20"
                        className="absolute right-2 top-0 -translate-y-1/2 text-gray-400 cursor-pointer"
                        onClick={() => handleRemoveField(index)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleAddField}
                className="!flex !items-center !gap-1.5 !bg-[#EAEEFF] !text-[#1E45E1] !font-semibold !text-sm !rounded-lg !px-6 !py-1.5 !mb-2 !font-gilroy"
              >
                <AddCircle color="#1E45E1" size="16" />
                Add
              </button>
            </div>
            <div className="mt-2 bg-[#F2F4F6] p-2  flex justify-between font-semibold rounded-b-lg">
              <span className="text-[#505F76] text-xs ">
                TOTAL FIXED CHARGES
              </span>
              <span className="text-[#191C1E] text-base">
                ₹ {total.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="text-[#505F76] text-xs font-medium text-justify flex flex-wrap my-2 pe-16">
            Note: These charges are deducted from the initial security deposit
            or collected at the time of check-in and are non-adjustable.
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

          <div className="flex justify-between mt-3">
            <button
              className="bg-gray-200 text-gray-600 px-4 py-2 rounded !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
              onClick={handleClose}
            >
              Cancel
            </button>
            <div className="flex gap-2">
              <button
                // disabled={formLoading || isAlredayTenant}
                className="!font-gilroy text-sm !bg-[#1E45E1] text-white !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                // onClick={handleSaveUserlist}
              >
                Save Draft
              </button>
              <button
                // disabled={isAlredayTenant}
                className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
              >
                Check-In
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTenantBookingCheckin;

import React, { useState } from "react";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
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
    fontSize: "15px",
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

function AddTenantBookingCheckin() {
  const [activeTab, setActiveTab] = useState("booking");

  const [bookingDate, setBookingDate] = useState("");
  const [bookingAmount, setBookingAmount] = useState("");
  const [bookingFloor, setBookingFloor] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(null);
  const [bookingBed, setBookingBed] = useState(null);
  const [totalRent, setTotalRent] = useState("");

  const [joiningDate, setJoiningDate] = useState("");
  const [advanceAmount, setAdvanceAmount] = useState("");
  const [checkinFloor, setCheckinFloor] = useState(null);
  const [checkinRoom, setCheckinRoom] = useState(null);
  const [checkinBed, setCheckinBed] = useState(null);
  const [rentAmount, setRentAmount] = useState("");
  const [ebReading, setEbReading] = useState("");

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
  return (
    <div className="bg-white w-full">
      <div className="flex bg-gray-100 p-1 rounded-lg w-fit mb-6">
        <button
          onClick={() => setActiveTab("booking")}
          className={`px-4 py-1.5 text-sm rounded-md ${
            activeTab === "booking"
              ? "bg-white shadow text-blue-600"
              : "text-gray-500"
          }`}
        >
          Booking
        </button>

        <button
          onClick={() => setActiveTab("checkin")}
          className={`px-4 py-1.5 text-sm rounded-md ${
            activeTab === "checkin"
              ? "bg-white shadow text-blue-600"
              : "text-gray-500"
          }`}
        >
          Check-in
        </button>
      </div>

      {activeTab === "booking" ? (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] mb-2 block">
                Booking Date
              </label>
              <div className="datepicker-wrapper relative w-full">
                <DatePicker
                  className={`w-full h-[45px] cursor-pointer ${
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

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] mb-2 block">
                Booking Amount
              </label>
              <input
                value={bookingAmount}
                onChange={handleBookingAmountChange}
                className="w-full border rounded-lg h-[45px] px-3"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Select Stay Details
            </label>

            <div className="grid grid-cols-3 gap-3">
              <Select
                options={options}
                value={bookingFloor}
                onChange={handleBookingFloorChange}
                styles={CustomStyles}
              />
              <Select
                options={options}
                value={bookingRoom}
                onChange={handleBookingRoomChange}
                styles={CustomStyles}
              />
              <Select
                options={options}
                value={bookingBed}
                onChange={handleBookingBedChange}
                styles={CustomStyles}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Total Rent
            </label>
            <input
              value={totalRent}
              onChange={handleTotalRentChange}
              className="w-full border rounded-lg h-[45px] px-3"
            />
          </div>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] mb-2 block">
                Joining Date
              </label>
              <div className="datepicker-wrapper relative w-full">
                <DatePicker
                  className={`w-full h-[45px] cursor-pointer ${
                    joiningDate ? "font-semibold" : "font-medium"
                  }`}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={joiningDate ? dayjs(joiningDate) : null}
                  onChange={handleJoiningDateChange}
                  getPopupContainer={() => document.body}
                />
              </div>
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] mb-2 block">
                Advance Amount
              </label>
              <input
                value={advanceAmount}
                onChange={handleAdvanceAmountChange}
                className="w-full border rounded-lg h-[45px] px-3"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-[#222222] mb-2 block">
              Select Stay Details
            </label>

            <div className="grid grid-cols-3 gap-3">
              <Select
                options={options}
                value={checkinFloor}
                onChange={handleCheckinFloorChange}
                styles={CustomStyles}
              />
              <Select
                options={options}
                value={checkinRoom}
                onChange={handleCheckinRoomChange}
                styles={CustomStyles}
              />
              <Select
                options={options}
                value={checkinBed}
                onChange={handleCheckinBedChange}
                styles={CustomStyles}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                Rental Amount
              </label>
              <input
                value={rentAmount}
                onChange={handleRentAmountChange}
                className="w-full border rounded-lg h-[45px] px-3"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#222222] mb-2 block">
                EB Reading
              </label>
              <input
                value={ebReading}
                onChange={handleEbReadingChange}
                className="w-full border rounded-lg h-[45px] px-3"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTenantBookingCheckin;

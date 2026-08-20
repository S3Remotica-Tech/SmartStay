/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FiRepeat } from "react-icons/fi";
import building from "/src/Assets/Images/New_images/building1.svg";
import Frame from "/src/Assets/Images/New_images/Frame.svg";
// import Group from "/src/Assets/Images/New_images/Group.png";
import repeatOne from "/src/Assets/Images/New_images/repeate-one.svg";
import { FormControl } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import minMax from "dayjs/plugin/minMax";
import { CloseCircle } from "iconsax-react";

import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(minMax);
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../../Components/ErrorMessage";
import { LiaBedSolid } from "react-icons/lia";

function ConfirmChangeBed({ show, handleClose, currentBed }) {
  ConfirmChangeBed.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    previousBed: PropTypes.func.isRequired,
    currentBed: PropTypes.func.isRequired,
  };

  // const selectedDateRef = useRef(null);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [formLoading, setFormLoading] = useState(false);
  const isPreviousBed = state.PgList?.isClickedBed;
  const errorRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [newRoomRent, setNewRoomRent] = useState("");
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [errors, setErrors] = useState({ date: "", rent: "" });
  const CustomerOverView = state.UsersList?.customerdetails;
  const currentRoomRent = currentBed?.rentAmount || 0;
  const handleDateChange = (date) => {
    setSelectedDate(date ? date.toDate() : null);
    setErrors((prev) => ({ ...prev, date: "" }));
  };

  const handleRentChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");

    if (/^0+$/.test(value)) {
      value = "";
    } else if (value.length > 1 && value.startsWith("0")) {
      value = value.replace(/^0+/, "");
    }

    setNewRoomRent(value);
    setErrors((prev) => ({ ...prev, rent: "" }));
  };

  const handleSameAsCurrent = (e) => {
    const checked = e.target.checked;
    setSameAsCurrent(checked);
    if (checked) {
      setNewRoomRent(currentRoomRent);
      setErrors((prev) => ({ ...prev, rent: "" }));
    } else {
      setNewRoomRent("");
    }
  };

  

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_CHANGE_BED_ERROR" });
    let hasError = false;
    const newErrors = { date: "", rent: "" };

    if (!selectedDate) {
      newErrors.date = "Please Select a  Date";
      hasError = true;
    }

    if (isPreviousBed?.isOccupied && !newRoomRent) {
      newErrors.rent = "Please Enter Rent Amount";
      hasError = true;
    }

    setErrors(newErrors);

    if (hasError) return;

    const formatToCustomDate = (date) => {
      const d = new Date(date);
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");
      return `${dd}-${mm}-${yyyy}`;
    };
    const formattedDate = selectedDate ? formatToCustomDate(selectedDate) : "";

    const datum = {
      bedId: currentBed?.id,
      rentAmount: Number(newRoomRent) || 0,
      joiningDate: formattedDate,
    };

    if (state.login.selectedHostel_Id && datum) {
      const payload = {
        hostelId: state.login.selectedHostel_Id,
        customerId: CustomerOverView?.customerId,
        datum,
      };
      dispatch({
        type: "CUSTOMERREASSINBED",
        payload,
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList?.changeBedError && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      setFormLoading(false);
      errorRef.current.focus();
    }
  }, [state.UsersList?.changeBedError]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_CHANGE_BED_ERROR" });
    };
  }, []);

  // const invoices = CustomerOverView?.invoiceResponseList || [];
  // const lastBillDate = invoices.length > 0
  //   ? dayjs(invoices[invoices.length - 1].invoiceGeneratedDate, "DD/MM/YYYY")
  //   : null;

  const disabledDate = (current) => {
    const today = dayjs().endOf("day");
    const joiningDate = dayjs(
      CustomerOverView?.hostelInfo?.joiningDate,
      "DD/MM/YYYY",
    );
    const invoices = CustomerOverView?.invoiceResponseList || [];
    const bedHistory = CustomerOverView?.bedHistory || [];

    const lastBillDate =
      invoices.length > 0
        ? dayjs(
            invoices[invoices.length - 1].invoiceGeneratedDate,
            "DD/MM/YYYY",
          )
        : null;

    let latestBedChangeDate = null;
    if (bedHistory.length > 0) {
      const lastRecord = bedHistory[bedHistory.length - 1];
      if (lastRecord.endDate === "Till date") {
        latestBedChangeDate = dayjs(lastRecord.startDate, "DD/MM/YYYY");
      } else {
        const validDates = bedHistory
          .filter((b) => b.startDate)
          .map((b) => dayjs(b.startDate, "DD/MM/YYYY"));
        if (validDates.length > 0) {
          latestBedChangeDate = dayjs.max(validDates);
        }
      }
    }

    if (current.isAfter(today, "day")) {
      return true;
    }

    const joinedThisMonth =
      joiningDate.month() === dayjs().month() &&
      joiningDate.year() === dayjs().year();

    if (joinedThisMonth) {
      const compareDate =
        bedHistory.length > 0 ? latestBedChangeDate : joiningDate;
      return (
        current.isBefore(compareDate, "day") || current.isAfter(today, "day")
      );
    }

    const compareDate = latestBedChangeDate || lastBillDate || joiningDate;
    return (
      current.isBefore(compareDate, "day") || current.isAfter(today, "day")
    );
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col ">
        <div className="relative px-4 py-3  flex justify-between items-center">
          <div className="text-[20px] font-semibold font-gilroy">
            Confirm Change Bed
          </div>
          <CloseCircle
            size={24}
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="px-4 py-1  flex-1 overflow-y-auto show-scrolls relative ">
          <div className="flex justify-between items-start mb-1">
            <div>
              <p className="mb-2 font-gilroy">Current Bed</p>

              <p className="mb-3 flex items-center font-gilroy text-base">
                <img
                  src={building}
                  alt="building"
                  className="me-2 w-5 h-5 align-middle"
                />
                <span className="relative top-1 left-1">
                  {isPreviousBed?.floorName || "N/A"}
                </span>
              </p>

              <p className="mb-3 flex items-center font-gilroy text-base">
                <img
                  src={Frame}
                  alt="Frame"
                  className="me-2 w-6 h-6 align-middle"
                />
                <span className="relative top-0.5">
                  {isPreviousBed?.roomName || "N/A"}
                </span>
              </p>

              <p className="mb-3 flex items-center font-gilroy text-base">
                <LiaBedSolid className="w-5 h-5 text-[#1E45E1] align-middle" />
                <span className="ms-2 relative top-1 left-1">
                  {isPreviousBed?.bedName || "N/A"}
                </span>
              </p>
            </div>

            <div className="flex items-center justify-center w-8 h-8 rounded-[10px] p-1.5 bg-[#EEF1FF] gap-2 mt-[80px]">
              <FiRepeat size={20} color="#1E45E1" />
            </div>

            <div>
              <h6 className="mb-3 font-gilroy">New Bed</h6>

              <p className="mb-3 flex items-center font-gilroy text-base">
                <img
                  src={building}
                  alt="building"
                  className="me-2 w-5 h-5 align-middle"
                />
                <span className="relative top-1 left-1">
                  {currentBed?.floorName || "N/A"}
                </span>
              </p>

              <p className="mb-3 flex items-center font-gilroy text-base">
                <img
                  src={Frame}
                  alt="Frame"
                  className="me-2 w-6 h-6 align-middle"
                />
                <span className="relative top-0.5">
                  {currentBed?.roomName || "N/A"}
                </span>
              </p>

              <p className="mb-3 flex items-center font-gilroy text-base">
                <LiaBedSolid className="w-5 h-5 text-[#1E45E1] align-middle" />
                <span className="ms-2 relative top-1 left-1">
                  {currentBed?.bedName || "N/A"}
                </span>
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 text-sm">
            <div>
              <Form.Group className="mb-1">
                <Form.Label className="mb-1 text-sm font-gilroy flex items-center">
                  Date <span className="text-red-500 text-xl ml-1">*</span>
                </Form.Label>
                <DatePicker
                  className="w-full h-12 border border-gray-300 cursor-pointer font-gilroy px-2"
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={selectedDate ? dayjs(selectedDate) : null}
                  onChange={handleDateChange}
                  disabledDate={disabledDate}
                  getPopupContainer={(triggerNode) =>
                    triggerNode.closest(".datepicker-wrapper")
                  }
                />
              </Form.Group>
              {errors.date && (
                <ErrorMessage message={errors.date} type="error" />
              )}
            </div>

            <div>
              <Form.Group className="mb-3">
                <div className="flex items-center">
                  <Form.Label className="flex items-center font-gilroy font-medium text-sm whitespace-nowrap mb-0">
                    New Rent Amount{" "}
                    <span className="text-red-500 text-xl ml-1">*</span>
                  </Form.Label>
                  <div className="flex items-center ms-3">
                    <Form.Check.Input
                      type="checkbox"
                      checked={sameAsCurrent}
                      onChange={handleSameAsCurrent}
                      className="cursor-pointer"
                    />
                    <span className="mt-1 ml-1 text-[#1E45E1] font-medium text-xs font-gilroy whitespace-nowrap">
                      Same as Current
                    </span>
                  </div>
                </div>

                <FormControl
                  value={newRoomRent}
                  onChange={handleRentChange}
                  type="text"
                  id="form-controls"
                  placeholder="Enter Amount"
                  className="w-full h-12 mt-2 px-3 border border-gray-300 rounded-md shadow-none font-gilroy font-medium text-base text-gray-700"
                />
                {errors.rent && (
                  <ErrorMessage message={errors.rent} type="error" />
                )}
              </Form.Group>
            </div>
          </div>

          {state.UsersList?.changeBedError && (
            <div ref={errorRef} tabIndex={-1} className="flex justify-center">
              <ErrorMessage
                message={state.UsersList?.changeBedError}
                type="error"
              />
            </div>
          )}

          {formLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 border-t-4 border-[#1E45E1] border-r-4 border-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-1 mx-3 mb-3">
          <button
            onClick={handleClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-base font-gilroy"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={formLoading}
            // className={`w-full px-4 py-2 flex items-center gap-2 rounded-md text-base font-gilroy
            //   ${formLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-[#1E45E1] text-white'}`}
            className={`w-full h-12 flex justify-center items-center gap-2 rounded-md text-base font-gilroy
    ${formLoading ? "bg-blue-300 cursor-not-allowed" : "bg-[#1E45E1] text-white"}`}
          >
            <img src={repeatOne} alt="icon" />
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmChangeBed;

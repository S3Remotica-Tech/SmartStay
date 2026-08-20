/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import electricity from "../../Assets/Images/New_images/electricity.svg";
import building from "/src/Assets/Images/New_images/building1.svg";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import PropTypes from "prop-types";

function AddRoomReading({
  show,
  handleClose,
  selectedRowDetails,
  editRoomReading,
  finalSettlementWay,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const readingDateRef = useRef(null);

  const [changesError, setChangesError] = useState("");
  const [readingError, setReadingError] = useState("");
  const [dateError, setDateError] = useState("");
  const [currentReading, setCurrentReading] = useState("");
  const [readingDate, setReadingDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    reading: "",
    date: "",
  });

  useEffect(() => {
    readingDateRef.current?.focus();
  }, []);

  const disabledDate = (current) => {
    if (!current) return false;

    if (finalSettlementWay) {
      const minDate = dayjs(
        selectedRowDetails?.lastEntryDate,
        "DD/MM/YYYY",
      ).add(1, "day");

      const today = dayjs().endOf("day");

      return current.isBefore(minDate, "day") || current.isAfter(today, "day");
    }

    return current.isAfter(dayjs().endOf("day"));
  };

  const handleCurrentReadingChange = (e) => {
    setChangesError("");
    dispatch({ type: "REMOVE_ROOM_READING_ERROR" });
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setCurrentReading(value);
      setReadingError("");
    }
  };

  const handleReadingDateChange = (date) => {
    setChangesError("");
    dispatch({ type: "REMOVE_ROOM_READING_ERROR" });
    setReadingDate(date ? date : null);
    setDateError("");
  };

  const formatToInputDate = (dateStr) => {
    if (!dateStr) return "";
    const [dd, mm, yyyy] = dateStr.split("/");
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    if (editRoomReading) {
      setReadingDate(formatToInputDate(editRoomReading.entryDate));
      setCurrentReading(editRoomReading?.currentReading);
      const formattedInputDate = formatToInputDate(editRoomReading.entryDate);
      setInitialValues({
        reading: Number(editRoomReading?.currentReading),
        date: formattedInputDate,
      });
    }
  }, [editRoomReading]);

  const handleSubmit = () => {
    setChangesError("");
    dispatch({ type: "REMOVE_ROOM_READING_ERROR" });
    let hasError = false;

    if (!currentReading) {
      setReadingError("Please enter  reading");
      hasError = true;
    } else {
      setReadingError("");
    }

    if (!readingDate) {
      setDateError("Please select reading date");
      hasError = true;
    } else {
      setDateError("");
    }

    if (hasError) return;
    const formattedDate = readingDate
      ? dayjs(readingDate).format("DD-MM-YYYY")
      : "";
    if (editRoomReading && currentReading) {
      const isReadingChanged =
        Number(currentReading) !== Number(initialValues.reading);

      const isDateChanged = !dayjs(readingDate).isSame(
        dayjs(initialValues.date),
        "day",
      );

      if (!isReadingChanged && !isDateChanged) {
        setChangesError("No changes detected");
        return;
      }

      dispatch({
        type: "EDITHOSTELREADING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          readingId: editRoomReading?.readingId,
          reading: Number(currentReading),
          entryDate: formattedDate,
        },
      });
      setLoading(true);
    } else if (currentReading) {
      dispatch({
        type: "ADDROOMREADING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          reading: currentReading,
          readingDate: formattedDate,
          roomId: selectedRowDetails?.roomId,
          floorId: selectedRowDetails?.floorId,
        },
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (
      state.UsersList?.addRoomReadingStatusCode === 201 ||
      state.UsersList?.addRoomReadingStatusCode === 200 ||
      state.UsersList?.editHostelStatusCode === 200
    ) {
      setLoading(false);
    }
  }, [
    state.UsersList?.addRoomReadingStatusCode,
    state.UsersList?.editHostelStatusCode,
  ]);

  useEffect(() => {
    if (state.UsersList?.roomReadingError) {
      setLoading(false);
    }
  }, [state.UsersList?.roomReadingError]);

  const modalBodyRef = useRef(null);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="flex justify-between items-center px-4 py-3 border-b ">
          <div className="!font-gilroy !font-semibold !text-xl !mb-0">
            {editRoomReading ? "Edit Room Reading" : "Add Room Reading"}
          </div>

          <CloseCircle
            size={26}
            color="black"
            className="cursor-pointer"
            onClick={handleClose}
          />
        </div>
        <div
          ref={modalBodyRef}
          className="flex-1 overflow-y-auto p-4 show-scrolls "
        >
          <div className="flex justify-between items-center w-full  border-gray-300 pb-2.5">
            <div className="d-flex align-items-center">
              <span className="flex items-center justify-center bg-blue-100 rounded-full w-12 h-12 mr-2.5">
                <img src={electricity} alt="electricity" className="h-6 w-6" />
              </span>
              <span className="font-gilroy font-semibold text-black text-base mt-2">
                {selectedRowDetails?.roomName || editRoomReading?.roomName}
                <div className="flex justify-start items-center gap-2">
                  <img
                    src={building}
                    height="14"
                    width="14"
                    alt="Ground Floor"
                  />
                  <div className="text-[#4B4B4B] text-xs mt-1 font-gilroy">
                    {selectedRowDetails?.floorName ||
                      editRoomReading?.floorName}
                  </div>
                </div>
              </span>
            </div>
          </div>

          <Form.Group className="mt-3">
            <Form.Label className="font-gilroy font-medium text-sm leading-none tracking-normal m-0 p-0">
              Reading Date <span className="text-red-500 text-xl">*</span>
            </Form.Label>

            <div className="datepicker-wrapper relarive w-full mt-1">
              <div className="datepicker-wrapper relative w-full">
                <DatePicker
                  ref={readingDateRef}
                  className="w-full h-12 cursor-pointer font-gilroy"
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={readingDate ? dayjs(readingDate) : null}
                  onChange={handleReadingDateChange}
                  getPopupContainer={() => modalBodyRef.current}
                  disabledDate={disabledDate}
                />
              </div>
            </div>

            {dateError && <ErrorMessage message={dateError} type="error" />}
          </Form.Group>

          <Form.Group className="mt-3">
            <div className="flex items-center justify-between w-full mb-1">
              <Form.Label className="font-gilroy font-medium text-sm leading-none tracking-normal mb-0 p-0">
                Reading <span className="text-red-500 text-xl">*</span>
              </Form.Label>

              {selectedRowDetails?.currentReading ||
              selectedRowDetails?.lastReading ? (
                <span className="font-gilroy font-normal text-sm leading-none text-gray-500">
                  Last Reading:{" "}
                  <span className="text-[#1E45E1] font-gilroy">
                    {selectedRowDetails?.currentReading ||
                      selectedRowDetails?.lastReading}
                  </span>
                </span>
              ) : (
                ""
              )}
            </div>

            <Form.Control
              className={`mt-2 text-sm ${currentReading ? "font-semibold" : "font-medium"} px-3 py-3 font-gilroy`}
              type="number"
              placeholder="Enter Reading"
              value={currentReading}
              onChange={handleCurrentReadingChange}
            />
            {readingError && (
              <ErrorMessage message={readingError} type="error" />
            )}
          </Form.Group>

          {changesError && (
            <div className="flex justify-center">
              <ErrorMessage message={changesError} type="error" />
            </div>
          )}

          {state.UsersList?.roomReadingError && (
            <div className="flex justify-center">
              <ErrorMessage
                message={state.UsersList?.roomReadingError}
                type="error"
              />
            </div>
          )}
        </div>
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 border-4 border-t-blue-600 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="p-4 flex justify-end">
          <Button
            className="bg-transparent !text-black !font-gilroy !border-none"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            disabled={loading}
            className="!bg-[#1E45E1] !font-gilroy !w-32"
            onClick={handleSubmit}
          >
            {editRoomReading ? "Update" : "Add"}
          </Button>
        </div>
      </div>
    </div>
  );
}
AddRoomReading.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  selectedRowDetails: PropTypes.object.isRequired,
  editRoomReading: PropTypes.object.isRequired,
  finalSettlementWay: PropTypes.bool.isRequired,
};

export default AddRoomReading;

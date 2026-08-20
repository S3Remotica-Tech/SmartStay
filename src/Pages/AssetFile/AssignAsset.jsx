/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import "flatpickr/dist/themes/material_blue.css";
// import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ErrorMessage from "../../Components/ErrorMessage";

function StaticExample({ show, handleClose, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [pglist, setPgList] = useState(state.login.selectedHostel_Id);
  const [room, setRoom] = useState("");
  const [Floor, setFloor] = useState("");

  const [roomError, setRoomError] = useState("");
  const [dateError, setDateError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [noChangeError, setNoChangeError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);

 
  const [initialState, setInitialState] = useState({
    pglist: "",
    room: "",
    selectedDate: "",
    floor_id: "",
  });

  useEffect(() => {
    dispatch({
      type: "ALLFLOORLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, []);

  useEffect(() => {
    setPgList(state.login.selectedHostel_Id);
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    setPgList(state.login.selectedHostel_Id);
  }, []);

  useEffect(() => {
    if (currentItem) {
      setPgList(currentItem.hostelId);
      setRoom(currentItem.roomId);
      setSelectedDate(
        currentItem.assignedAt
          ? dayjs(currentItem.assignedAt, "DD-MM-YYYY").toDate()
          : null,
      );

      setFloor(currentItem.floorId);
      setInitialState({
        pglist: currentItem.hostelId || "",
        room: currentItem.roomId || "",
        selectedDate: currentItem.assignedAt
          ? dayjs(currentItem.assignedAt, "DD/MM/YYYY").toDate()
          : null,
        floor_id: currentItem.floorId || "",
      });
    }
  }, [currentItem]);

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]',
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #222222";
      closeButton.style.padding = "9px";
    }
  }, []);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: selectedDate || new Date(),
    maxDate: "today",
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

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
    setRoom(selectedOption || "");
    setGeneralError("");
    setRoomError("");
    setNoChangeError("");
  };

  const handleFloor = (selectedOption) => {
    setFloor(selectedOption?.value || "");
    setGeneralError("");
    setFloorError("");
    setNoChangeError("");
  };

  useEffect(() => {
    if (Floor) {
      dispatch({ type: "GETALLROOMSLIST", payload: { floor_Id: Floor } });
    }
  }, [Floor]);

  const handleAddAssignAsset = () => {
    dispatch({ type: "CLEAR_NETWORK_ERROR" });
    dispatch({ type: "CLEAR_ASSET_ERROR" });
    setRoomError("");
    setDateError("");
    setFloorError("");
    setNoChangeError("");

    if (!pglist && !room && !selectedDate && !Floor) {
      setGeneralError("Please Enter All Required Fields");
      return;
    }

    if (!Floor) {
      setFloorError("Please Select a Floor");
    }

    if (!room) {
      setRoomError("Please Select a Room");
    }

    if (!selectedDate) {
      setDateError("Please Select a Date");
    }

    let formattedSelectedDate;
    let formattedInitialDate;

    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      formattedSelectedDate = `${day}/${month}/${year}`;
    } else {
      setDateError("Please select a Date");
      return;
    }

    if (currentItem?.purchaseDate) {
      const purchaseDate = dayjs(currentItem.purchaseDate, "DD/MM/YYYY");
      const assignDate = dayjs(selectedDate);

      if (assignDate.isBefore(purchaseDate, "day")) {
        setDateError("Before purchase date not allowed");
        return;
      }
    }

    if (
      initialState.selectedDate instanceof Date &&
      !isNaN(initialState.selectedDate)
    ) {
      const day = initialState.selectedDate
        .getDate()
        .toString()
        .padStart(2, "0");
      const month = (initialState.selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const year = initialState.selectedDate.getFullYear();
      formattedInitialDate = `${day}/${month}/${year}`;
    } else {
      formattedInitialDate = "";
    }

    const normalize = (val) => {
      if (val === null || val === "" || val === undefined) return null;
      return isNaN(val) ? String(val).trim() : Number(val);
    };

    const isChanged =
      normalize(initialState.pglist) !== normalize(pglist) ||
      normalize(initialState.room) !== normalize(room) ||
      normalize(formattedInitialDate) !== normalize(formattedSelectedDate) ||
      normalize(initialState.floor_id) !== normalize(Floor);

    if (!isChanged && currentItem?.assignmentStatus === "Assigned") {
      setNoChangeError("No Changes Detected");
      return;
    }

    if (pglist && room && selectedDate && currentItem.assetId && Floor) {
      dispatch({
        type: "ASSIGNASSET",
        payload: {
          assetId: currentItem.assetId,
          hostelId: pglist,
          roomId: room,
          assignedAt: formattedSelectedDate,
          floorId: Floor,
        },
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.AssetList.addAssignAssetStatusCode === 200) {
      setFormLoading(false);
      setPgList("");
      setRoom("");
      setSelectedDate("");
      setFloor("");
      handleClose();
    }
  }, [state.AssetList.addAssignAssetStatusCode]);

  useEffect(() => {
    if (state.createAccount?.networkError || state.AssetList.assetError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
        dispatch({ type: "CLEAR_ASSET_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError, state.AssetList.assetError]);

  return (
    <div className="modal show block static font-gilroy">
      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Dialog className="w-full max-w-full m-0 p-0">
          <Modal.Header>
            <Modal.Title className="!text-lg text-neutral-800 !font-gilroy !font-semibold">
              {currentItem?.assignmentStatus === "Assigned"
                ? "Reassign asset "
                : "Assign asset"}
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor pointer"
            />
          </Modal.Header>
          <Modal.Body className="py-2.5 px-4 mb-3">
            {generalError && (
              <ErrorMessage message={generalError} type="error" />
            )}

            {state.AssetList.assetError ? (
              <ErrorMessage message={state.AssetList.assetError} type="error" />
            ) : null}

            <div className="grid grid-cols-12 gap-x-4 gap-y-3">
              <div className="col-span-12">
                <Form.Label className="text-sm font-medium font-gilroy">
                  Floor <span className="text-red-500 text-xl">*</span>
                </Form.Label>

                <Select
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
                      overflowY: "auto",
                      fontFamily: "Gilroy",
                    }),
                    indicatorSeparator: () => ({ display: "none" }),

                    option: (base, state) => ({
                      ...base,
                      cursor: "pointer",
                      backgroundColor: state.isSelected
                        ? "#1E45E1"
                        : state.isFocused
                          ? "#E8EEFF"
                          : "white",

                      color: state.isSelected ? "#fff" : "#000",
                    }),
                  }}
                />

                {floorError && (
                  <ErrorMessage message={floorError} type="error" />
                )}
              </div>

              <div className="col-span-12 lg:col-span-6 mt-1">
                <Form.Label className="text-sm font-medium text-[#222] font-gilroy">
                  Select a Room <span className="text-red-500 text-xl">*</span>
                </Form.Label>

                <Select
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
                          label: state.PgList.roomsList.find(
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
                      minHeight: "50px",
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
                      borderRadius: "8px",
                      overflow: "hidden",
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "130px",
                      overflowY: "auto",
                      scrollBehavior: "smooth",
                    }),
                    option: (base, state) => ({
                      ...base,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "16px",
                      backgroundColor: state.isSelected
                        ? "#1E45E1"
                        : state.isFocused
                          ? "#E8EEFF"
                          : "white",
                      cursor: "pointer",
                      color: state.isSelected ? "#fff" : "#000",
                    }),
                    indicatorSeparator: () => ({ display: "none" }),
                  }}
                />

                {roomError && <ErrorMessage message={roomError} type="error" />}
              </div>

              <div className="col-span-12 lg:col-span-6 mt-1">
                <Form.Label className="text-sm font-medium text-[#222] font-gilroy">
                  Date <span className="text-red-500 text-xl">*</span>
                </Form.Label>

                <div className="relative w-full cursor-pointer">
                  <DatePicker
                    style={{
                      width: "100%",
                      height: 48,
                      fontFamily: "Gilroy",
                    }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date) => {
                      setGeneralError("");
                      setDateError("");
                      setNoChangeError("");
                      setSelectedDate(date ? date.toDate() : null);
                    }}
                    disabledDate={(current) => {
                      const today = dayjs().endOf("day");

                      const minDate =
                        currentItem?.assignmentStatus === "Assigned"
                          ? dayjs(currentItem?.assignedAt, "DD/MM/YYYY")
                          : dayjs(currentItem?.purchaseDate, "DD/MM/YYYY");

                      if (!minDate.isValid()) {
                        return current && current > today;
                      }

                      return (
                        current &&
                        (current < minDate.startOf("day") || current > today)
                      );
                    }}
                    getPopupContainer={(node) => node.closest(".relative")}
                  />
                </div>

                {dateError && <ErrorMessage message={dateError} type="error" />}
              </div>
            </div>
          </Modal.Body>
          {formLoading && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
           flex items-center justify-center 
           bg-transparent opacity-75 z-10"
            >
              <div
                className="w-10 h-10 rounded-full 
           border-t-4 border-r-4 border-r-transparent 
           border-t-[#1E45E1] 
           animate-spin"
              ></div>
            </div>
          )}

          {noChangeError && (
            <div className="flex justify-center mt-1 mb-1">
              <ErrorMessage message={noChangeError} type="error" />
            </div>
          )}
          <Modal.Footer className="mt-1 pt-1 border-0">
            <Button
              onClick={handleAddAssignAsset}
              className="w-100 !bg-[#1E45E1] !font-semibold rounded-[12px] !text-[16px] !font-gilroy p-3"
            >
              {currentItem?.assignmentStatus === "Assigned"
                ? "Save Changes "
                : "Assign asset"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
StaticExample.propTypes = {
  show: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default StaticExample;

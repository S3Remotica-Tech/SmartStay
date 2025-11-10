/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import ErrorMessage from '../../Components/ErrorMessage'

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
  const [formLoading, setFormLoading] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  

  const [initialState, setInitialState] = useState({
    pglist: "",
    room: "",
    selectedDate: "",
    floor_id: "",
  });

  useEffect(() => {
    dispatch({ type: "ALLFLOORLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
  }, [])


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
        : null
    );

    setFloor(currentItem.floorId);
    setInitialState({
      pglist: currentItem.hostelId || "",
      room: currentItem.roomId || "",
      selectedDate: currentItem.assignedAt,
      floor_id: currentItem.floorId || "",
    });
  }
}, [currentItem]);



  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #222222";
      closeButton.style.padding = "9px";
    }
  }, [])


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
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: Floor } })

    }
  }, [Floor]);


 
  const handleAddAssignAsset = () => {

    dispatch({ type: 'CLEAR_NETWORK_ERROR' })
    dispatch({ type: 'CLEAR_ASSET_ERROR' })
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

    const isChanged =
      Number(initialState.pglist) !== Number(pglist) ||
      Number(initialState.room) !== Number(room) ||
      formattedInitialDate !== formattedSelectedDate ||
      Number(initialState.floor_id) !== Number(Floor);

    if (!isChanged) {
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
      setFormLoading(true)
    }
  };

  useEffect(() => {
    if (state.AssetList.addAssignAssetStatusCode === 200) {
      setFormLoading(false)
      setPgList("");
      setRoom("");
      setSelectedDate("");
      setFloor("");
      handleClose();
    }
  }, [state.AssetList.addAssignAssetStatusCode]);


  useEffect(() => {
    if (state.createAccount?.networkError || state.AssetList.assetError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        dispatch({ type: 'CLEAR_ASSET_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError, state.AssetList.assetError])


console.log("currentItem",currentItem?.purchaseDate)


  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{ maxWidth: "100%", width: "100%" }}
          className="m-0 p-0"
        >
          <Modal.Header>
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {currentItem?.assignmentStatus  === "Assigned"  ? "Reassign asset " : "Assign asset"}
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>
          <Modal.Body style={{ padding: "10px 15px" }}>

            {generalError && (
              <ErrorMessage message={generalError} type="error"/>
            )}




            {state.AssetList.assetError ?
              <ErrorMessage message={state.AssetList.assetError} type="error"/>

              : null}


            <div className="row ">
              <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Floor{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                      (option) => option.id === Floor
                    )
                      ? {
                        value: Floor,
                        label: state.UsersList.floorList.find(
                          (option) => option.id === Floor
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

                {floorError && (
                               <ErrorMessage message={floorError} type="error"/>

                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2">
                <Form.Group controlId="exampleForm.ControlInput1">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Select a Room{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>


                  <Select
                    options={
                      state.PgList?.roomsList?.map((item) => ({
                        value: item.id,
                        label: item.name,
                      })) || []
                    }
                    onChange={(selectedOption) =>
                      handleRooms(selectedOption?.value)
                    }
                    value={
                      state.PgList?.roomsList?.find(
                        (option) => option.id === room
                      )
                        ? {
                          value: room,
                          label: state.PgList?.roomsList.find(
                            (option) => option.id === room
                          )?.name,
                        }
                        : null
                    }
                    placeholder="Select a Room"
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

                </Form.Group>
                {roomError && (
                                                 <ErrorMessage message={roomError} type="error"/>

                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2">
                <Form.Group controlId="purchaseDate">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Date{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>


                  <div
                    className="datepicker-wrapper"
                    style={{ position: "relative", width: "100%", cursor: "pointer" }}
                  >
                   <DatePicker
  style={{ width: "100%", height: 48, fontFamily: "Gilroy" }}
  format="DD/MM/YYYY"
  placeholder="DD/MM/YYYY"
  value={selectedDate ? dayjs(selectedDate) : null}
  onChange={(date) => {
    setGeneralError("");
    setDateError("");
    setNoChangeError("");
    setSelectedDate(date ? date.toDate() : null);
  }}
  // ✅ Disable dates before purchaseDate and after today
  disabledDate={(current) => {
    if (!currentItem?.purchaseDate) return current && current > dayjs().endOf("day");
    
    const purchaseDate = dayjs(currentItem.purchaseDate, "DD/MM/YYYY");
    const today = dayjs().endOf("day");

    // disable if date < purchaseDate OR date > today
    return current && (current < purchaseDate.startOf("day") || current > today);
  }}
  getPopupContainer={(triggerNode) =>
    triggerNode.closest(".datepicker-wrapper")
  }
/>

                  </div>
                </Form.Group>
                {dateError && (
                  <ErrorMessage message={dateError} type="error"/>
                )}
              </div>
            </div>
          </Modal.Body>
          {formLoading &&
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'transparent',
                opacity: 0.75,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  borderTop: '4px solid #1E45E1',
                  borderRight: '4px solid transparent',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            </div>}
         
          {noChangeError && (
            <div
              className="d-flex align-items-center mt-1 mb-1"
                          >
             <ErrorMessage message={noChangeError} type="error"/>
            </div>
          )}
          <Modal.Footer style={{ border: "none" }} className="mt-1 pt-1">
            <Button
              className="w-100"
              onClick={handleAddAssignAsset}
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 12,
              }}
            >
               {currentItem?.assignmentStatus  === "Assigned"  ? "Save Changes " : "Assign asset"}
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

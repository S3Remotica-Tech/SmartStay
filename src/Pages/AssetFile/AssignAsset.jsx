/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import "../../Pages/AssetFile/addAsset.css";
import moment from "moment";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";

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
  const [roomList, setRoomList] = useState([]);

  const [initialState, setInitialState] = useState({
    pglist: "",
    room: "",
    selectedDate: "",
    floor_id: "",
  });

  useEffect(() => {
    setPgList(state.login.selectedHostel_Id);
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    setPgList(state.login.selectedHostel_Id);
  }, []);

  useEffect(() => {
    if (currentItem.hostel_id !== "null" && currentItem.hostel_id !== null) {
      setPgList(currentItem.hostel_id);
      setRoom(currentItem.room_id);
      setSelectedDate(moment(currentItem.assigned_date).toDate());
      setFloor(currentItem.floor_id);
      setInitialState({
        pglist: currentItem.hostel_id || "",
        room: currentItem.room_id || "",
        selectedDate: currentItem.assigned_date
          ? moment(currentItem.assigned_date).toDate()
          : null,
        floor_id: currentItem.floor_id || "",
      });
    }

  }, [currentItem]);


console.log("currentItem",currentItem.purchase_date)

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



  const handleRoomChange = (selectedOption) => {
    setRoom(selectedOption?.value || "");
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
      dispatch({
        type: "GETROOMS",
        payload: { hostel_Id: pglist, floor_Id: Floor },
      });
    }
  }, [Floor]);

  useEffect(() => {
    dispatch({ type: "HOSTELDETAILLIST", payload: { hostel_Id: pglist } });
  }, []);

  useEffect(() => {
    if (state.AssetList.getRoomStatusCode === 200) {
      setRoomList(state.AssetList?.GetRoomList);

      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_ROOMS" });
      }, 1000);
    }
  }, [state.AssetList.getRoomStatusCode]);

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
      formattedSelectedDate = `${year}/${month}/${day}`;
    } else {
      setDateError("Please select a Date");
      return;
    }


if (currentItem?.purchase_date) {
  const purchaseDate = new Date(currentItem.purchase_date);
  const assignDate = new Date(selectedDate);

 
  purchaseDate.setHours(0, 0, 0, 0);
  assignDate.setHours(0, 0, 0, 0);

  if (assignDate < purchaseDate) {
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
      formattedInitialDate = `${year}/${month}/${day}`;
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

    if (pglist && room && selectedDate && currentItem.id && Floor) {
      dispatch({
        type: "ASSIGNASSET",
        payload: {
          asset_id: currentItem.id,
          hostel_id: pglist,
          room_id: room,
          asseign_date: formattedSelectedDate,
          floor_id: Floor,
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
              {currentItem.hostel_id ? "Reassign asset " : "Assign asset"}
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
              <div className="d-flex align-items-center p-1 mb-2">
                <MdError style={{ color: "red", marginRight: "5px", fontSize: 14 }} />
                <label
                  className="mb-0"
                  style={{
                    color: "red",
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {generalError}
                </label>
              </div>
            )}

          


            {state.AssetList.assetError ?
              <div className='d-flex align-items-center p-1 mb-1'>
              <MdError style={{ color: "red", marginRight: "5px", fontSize: 14 }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.AssetList.assetError}</label>
              </div>

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
                    state.UsersList?.hosteldetailslist?.length > 0
                      ? state.UsersList.hosteldetailslist.map((u) => ({
                        value: u.floor_id,
                        label: u.floor_name,
                      }))
                      : []
                  }
                  onChange={handleFloor}
                  value={
                    state.UsersList?.hosteldetailslist?.find(
                      (f) => f.floor_id === Floor
                    )
                      ? {
                        value: Floor,
                        label: state.UsersList.hosteldetailslist.find(
                          (f) => f.floor_id === Floor
                        )?.floor_name,
                      }
                      : null
                  }
                  placeholder="Select a Floor"
                  classNamePrefix="custom"
                  menuPlacement="auto"
                  noOptionsMessage={() => "No floors available"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "50px",
                      border: "1px solid #D9D9D9",
                      borderRadius: "8px",
                      fontSize: "16px",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: Floor ? 600 : 500,
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
                      fontFamily: "Gilroy",
                      padding: 0,
                      scrollbarWidth: "thin",
                      overflowY: "auto",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#555",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      cursor: "pointer",
                    }),
                    option: (base, state) => ({
                      ...base,
                      cursor: "pointer",
                      backgroundColor: state.isFocused ? "lightblue" : "white",
                      color: "#000",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />

                {floorError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: 14 }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {floorError}
                    </label>
                  </div>
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
                      roomList?.length > 0
                        ? roomList.map((item) => ({
                          value: item.id,
                          label: item.Room_Id,
                        }))
                        : []
                    }
                    onChange={handleRoomChange}
                    value={
                      roomList?.find((r) => r.id === room)
                        ? {
                          value: room,
                          label: roomList.find((r) => r.id === room)?.Room_Id,
                        }
                        : null
                    }
                    placeholder="Select a Room"
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    noOptionsMessage={() => "No Rooms Available"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "50px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: room ? 600 : 500,
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
                        cursor: "pointer",
                      }),
                      option: (base, state) => ({
                        ...base,
                        cursor: "pointer",
                        backgroundColor: state.isFocused ? "lightblue" : "white",
                        color: "#000",
                      }),
                      indicatorSeparator: () => ({
                        display: "none",
                      }),
                    }}
                  />
                </Form.Group>
                {roomError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                  <MdError style={{ color: "red", marginRight: "5px", fontSize: 14 }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {roomError}
                    </label>
                  </div>
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
                      style={{ width: "100%", height: 48, fontFamily: "Gilroy", }}
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={selectedDate ? dayjs(selectedDate) : null}
                      onChange={(date) => {
                        setGeneralError('')
                        setDateError('')
                        setNoChangeError('')
                        setSelectedDate(date ? date.toDate() : null);
                      }}
                      disabledDate={(current) => current && current > dayjs().endOf("day")}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".datepicker-wrapper")
                      }
                    />
                  </div>
                </Form.Group>
                {dateError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                   <MdError style={{ color: "red", marginRight: "5px", fontSize: 14 }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {dateError}
                    </label>
                  </div>
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
            {state.createAccount?.networkError ? 
                      <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                                            <MdError style={{ color: "red", marginRight: "5px", fontSize: 14 }} />
                                              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                                            </div>
                                              : null}
          {noChangeError && (
            <div
              className="d-flex align-items-center p-1 mb-2 mt-2"
              style={{ width: "100%", marginLeft: 170, textAlign: "center" }}
            >
              <MdError style={{ color: "red", marginRight: "5px", fontSize: 14 }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {noChangeError}
              </label>
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
              {currentItem.hostel_id ? "Save Changes" : "Assign Asset"}
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

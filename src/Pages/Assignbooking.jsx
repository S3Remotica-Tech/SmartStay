/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, FormControl } from "react-bootstrap";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
function AssignBooking(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [rentamount, setRentAmount] = useState("");
  const [Advanceamount, setAdvanceamount] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [rentError, setRentError] = useState("");
  const [advanceError, setAdavanceError] = useState("");
  const [hostalId, setHostalId] = useState(null);
  const [formLoading, setFormLoading] = useState(false)


  useEffect(() => {
    dispatch({ type: "REMOVE_ERROR_ASSIGN_BOOKING" });
  }, []);
  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: state.login.selectedHostel_Id },
    });
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    setHostalId(props.HostelID);
  }, [props.HostelID]);

  const handleAssignClose = () => {
    setFormLoading(false)
    props.setModalType(false);
    dispatch({ type: "REMOVE_ERROR_ASSIGN_BOOKING" });
    setFloor("");
    setRoom("");
    setBed("");
    setJoiningDate("");
    setDateError("");
    setRentAmount("");
    setfloorError("");
    setRoomError("");
    setBedError("");
    setRentError("");
    setAdavanceError("");
    setAdvanceamount(props.assignBooking.amount);
  };

  useEffect(() => {
    if (props.assignBooking) {
      setAdvanceamount(props.assignBooking.amount);
      setRentAmount(props.assignBooking.room_rent);
    }
  }, [props.assignBooking]);

  const validateAssignField = (value, fieldName) => {
    if (
      value === 0 ||
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      switch (fieldName) {
        case "floor":
          setfloorError("Floor is Required");
          break;
        case "room":
          setRoomError("Room is Required");
          break;
        case "bed":
          setBedError("Bed is Required");
          break;
        case "joiningDate":
          setDateError("Joining Date is Required");
          break;
        case "advanceAmount":
          setAdavanceError("Advance Amount is Required");
          break;
        case "rentAmount":
          setRentError("Rent Amount is Required");
          break;

        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "floor":
          setfloorError("");
          break;
        case "room":
          setRoomError("");
          break;
        case "bed":
          setBedError("");
          break;
        case "joiningDate":
          setDateError("");
          break;
        case "advanceAmount":
          setAdavanceError("");
          break;
        case "rentAmount":
          setRentError("");
          break;

        default:
          break;
      }
      return true;
    }
  };

  const handleSubmit = (event) => {
    dispatch({ type: "REMOVE_ERROR_ASSIGN_BOOKING" });
    event.preventDefault();

    const isFloorvalid = validateAssignField(floor, "floor");
    const isRoomValid = validateAssignField(room, "room");
    const isbedvalid = validateAssignField(bed, "bed");
    const isjoiningDatevalid = validateAssignField(joiningDate, "joiningDate");
    const isrentAdvanceAmountvalid = validateAssignField(
      Advanceamount,
      "advanceAmount"
    );
    const isrentAmountvalid = validateAssignField(rentamount, "rentAmount");

    if (
      !isFloorvalid ||
      !isRoomValid ||
      !isbedvalid ||
      !isjoiningDatevalid ||
      !isrentAdvanceAmountvalid ||
      !isrentAmountvalid
    ) {
      return;
    }

    let formattedDate = null;
    try {
      let date = new Date(joiningDate);
      date.setDate(date.getDate() + 1);
      formattedDate = date.toISOString().split("T")[0];
    } catch {
      setDateError("Date is Required");
      return;
    }

    const bookingDate = props.assignBooking.createdat;
    const formattedBookingDate = dayjs(bookingDate).format("YYYY-MM-DD");


    if (dayjs(formattedDate).isBefore(formattedBookingDate)) {
      setDateError("Before booking date not allowed");
      return;
    }








    const payload = {
      floor: floor,
      room: room,
      bed: bed,
      hostel_id: state.login.selectedHostel_Id,

      join_date: formattedDate,
      ad_amount: Advanceamount,
      rent_amount: rentamount,
      id: props.assignBooking.id,
      whatsappId: state.InvoiceList.whatsappSettings?.[3]
    };
    dispatch({
      type: "ASSIGN_BOOKING",
      payload: payload,
    });
    setFormLoading(true)
  };

  useEffect(() => {
    if (state.Booking.statusCodeForAssignBooking === 200) {
      setFormLoading(false)
      handleAssignClose();

      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ASSIGN_USER_BOOKING" });
      }, 300);
    }
  }, [state.Booking.statusCodeForAssignBooking]);

  const handleFloor = (floorId) => {
    if (!floorId) {
      setfloorError("Please select a valid floor.");
      setBed("");
      return;
    }
    setFloor(floorId);
    setRoom("")
    setBed("");
    setRentAmount("");
    setfloorError("");
    dispatch({
      type: "ROOMDETAILS",
      payload: { floor_Id: floorId, hostel_Id: hostalId },
    });
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id && floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: state.login.selectedHostel_Id, floor_Id: floor },
      });
    }
  }, [floor]);

  const handleRoom = (selectedOption) => {
    const selectedRoomId = selectedOption?.value;
    setRoom(selectedRoomId);
    setBed("");
    setRentAmount("");

    if (selectedRoomId) {
      const payload = {
        hostel_id: hostalId,
        floor_id: floor,
        room_id: selectedRoomId,
      };

      dispatch({
        type: "BEDNUMBERDETAILS",
        payload: payload,
      });

      setRoomError("");
    } else {
      setRoomError("Please select a valid room.");
    }
  };

  const handleBed = (selectedOption) => {
    setBed(selectedOption?.value || "");

    const Bedfilter =
      state?.UsersList?.roomdetails &&
      state.UsersList.roomdetails.filter(
        (u) =>
          String(u.Hostel_Id) === String(hostalId) &&
          String(u.Floor_Id) === String(floor) &&
          String(u.Room_Id) === String(room)
      );
    const Roomamountfilter =
      Bedfilter &&
      Bedfilter.length > 0 &&
      Bedfilter[0]?.bed_details.filter(
        (amount) => String(amount.id) === String(selectedOption?.value)
      );

    if (Roomamountfilter.length !== 0) {
      setRentAmount(Roomamountfilter[0]?.bed_amount);
    }

    setBedError("");
    setRentError("");
  };
  const handleRentAmount = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    setRentAmount(e.target.value);
    setRentError("");
  };
  const handleAdvanceAmount = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
    setAdvanceamount(value);
    setAdavanceError("");
  };


  useEffect(()=>{
    if(state.Booking?.ErrorAssignBooking){
      setFormLoading(false)
    }

  },[state.Booking?.ErrorAssignBooking])





  return (
    <>
      <Modal
        show={props.modalType}
        onHide={handleAssignClose}
        centered
        backdrop="static"
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title
            style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}
          >
            Move to Check-In
          </Modal.Title>

          <label
            style={{
              color: "#1E45E1",
              fontSize: 18,
              fontFamily: "Gilroy",
              fontWeight: 600,
              textTransform: "capitalize",
            }}
          >
            {props?.assignBooking.first_name}
          </label>

          <CloseCircle
            size="24"
            color="#222222"
            onClick={handleAssignClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>

        {state.Booking?.ErrorAssignBooking && (
          <div style={{ color: "#D32F2F" }} className="ps-3 pt-3">
            <MdError />
            <span
              style={{
                color: "#D32F2F",
                fontSize: 12,
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              This email{" "}
              <span style={{ color: "#1E45E1" }}>
                {props?.assignBooking.email_id}
              </span>{" "}
              already exists. Please change email ID and move to check in
            </span>
          </div>
        )}

        <Modal.Body>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="formFloor">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Floor
                  <span
                    style={{
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>

                <Select
                  options={
                    state?.UsersList?.hosteldetailslist?.map((item) => ({
                      value: item.floor_id,
                      label: item.floor_name,
                    })) || []
                  }
                  onChange={(selectedOption) =>
                    handleFloor(selectedOption?.value)
                  }
                  value={
                    state?.UsersList?.hosteldetailslist
                      ?.map((item) => ({
                        value: item.floor_id,
                        label: item.floor_name,
                      }))
                      .find((option) => option.value === floor) || null
                  }
                  placeholder="Select Floor"
                  classNamePrefix="custom-select"
                  menuPlacement="auto"
                  styles={{
                    control: (base) => ({
                      ...base,
                      fontSize: "16px",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: "50px",
                      borderRadius: "8px",
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #D9D9D9",
                      zIndex: 1000,
                      scrollbarWidth: "thin",
                      fontFamily: "Gilroy",
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      padding: 0,
                      overflowY: "auto",
                      fontFamily: "Gilroy",
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                      ...base,
                      height: "auto",
                      padding: "3px 10px",
                      fontSize: "16px",
                      backgroundColor: isSelected
                        ? "#007bff"
                        : isFocused
                          ? "#e9ecef"
                          : "white",
                      color: isSelected ? "white" : "#000",
                      cursor: "pointer",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      display: "inline-block",
                      fill: "currentColor",
                      lineHeight: 1,
                      stroke: "currentColor",
                      strokeWidth: 0,
                      cursor: "pointer"
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </Form.Group>

              {floorError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      marginRight: "5px",
                      fontSize: 13,
                      marginBottom: "2px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {floorError}
                  </span>
                </div>
              )}
            </Col>

            <Col md={6}>
              <Form.Group controlId="formRoom">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Room
                  <span
                    style={{
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>

                <Select
                  options={
                    state.UsersList?.roomdetails?.map((item) => ({
                      value: item.Room_Id,
                      label: item.Room_Name,
                    })) || []
                  }
                  onChange={handleRoom}
                  value={
                    state.UsersList?.roomdetails
                      ?.map((item) => ({
                        value: item.Room_Id,
                        label: item.Room_Name,
                      }))
                      .find((option) => option.value === room) || null
                  }
                  placeholder="Select a Room"
                  styles={{
                    control: (base) => ({
                      ...base,
                      fontSize: "16px",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: "50px",
                      borderRadius: "8px",
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #D9D9D9",
                      zIndex: 1000,
                      scrollbarWidth: "thin",
                      fontFamily: "Gilroy",
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      padding: 0,
                      overflowY: "auto",
                      fontFamily: "Gilroy",
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                      ...base,
                      height: "auto",
                      padding: "3px 10px",
                      fontSize: "16px",
                      backgroundColor: isSelected
                        ? "#007bff"
                        : isFocused
                          ? "#e9ecef"
                          : "white",
                      color: isSelected ? "white" : "#000",
                      cursor: "pointer",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      display: "inline-block",
                      fill: "currentColor",
                      lineHeight: 1,
                      stroke: "currentColor",
                      strokeWidth: 0,
                      cursor: "pointer"
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </Form.Group>
              {roomError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      marginRight: "5px",
                      fontSize: 13,
                      marginBottom: "2px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: 13,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {roomError}
                  </span>
                </div>
              )}
            </Col>
          </Row>

          <Row className="mb-3">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
              <Form.Label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Bed <span style={{ color: "red", fontSize: "20px" }}> * </span>
              </Form.Label>

              <Select
                options={
                  state.UsersList?.bednumberdetails?.bed_details?.length > 0
                    ? state.UsersList.bednumberdetails.bed_details
                      .filter(
                        (item) =>
                          item.bed_no !== "0" &&
                          item.bed_no !== "undefined" &&
                          item.bed_no !== "" &&
                          item.bed_no !== "null"
                      )
                      .map((item) => ({
                        value: item.id,
                        label: item.bed_no,
                      }))
                    : []
                }
                onChange={handleBed}
                value={
                  bed
                    ? {
                      value: bed,
                      label:
                        state.UsersList?.bednumberdetails?.bed_details?.find(
                          (bedItem) => bedItem.id === bed
                        )?.bed_no || "Selected Bed",
                    }
                    : null
                }
                placeholder="Selected Bed"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No beds available"}
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
                    cursor: "pointer"
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                }}
              />

              {bedError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      color: "red",
                      fontSize: 13,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "13px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {bedError}
                  </label>
                </div>
              )}
            </div>

            <Col md={6}>
              <Form.Group controlId="joiningDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Joining Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

                <div
                  className="datepicker-wrapper"
                  style={{ position: "relative", width: "100%", marginTop: 6 }}
                >
                  <DatePicker
                    style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={joiningDate ? dayjs(joiningDate) : null}
                    onChange={(date) => {
                      setDateError("");
                      setJoiningDate(date ? date.toDate() : null);
                    }}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                  />
                </div>
              </Form.Group>
              {dateError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      marginRight: "5px",
                      fontSize: 13,
                      marginBottom: "1px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: 13,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {dateError}
                  </span>
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Advance Amount{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Advance Amount"
                  value={Advanceamount}
                  onChange={(e) => handleAdvanceAmount(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>
              {advanceError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginBottom: "3px" }} />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {advanceError}
                  </span>
                </div>
              )}
            </Col>
            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Rent Amount{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Rent Amount"
                  value={rentamount}
                  onChange={(e) => handleRentAmount(e)}
                  onKeyDown={(e) => {
                    const allowedKeys = [
                      "Backspace",
                      "Tab",
                      "ArrowLeft",
                      "ArrowRight",
                      "Delete",
                    ];
                    if (!/[0-9]/.test(e.key) && !allowedKeys.includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
              </Form.Group>
              {rentError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "5px", fontSize: 13 }} />
                  <span
                    style={{
                      color: "red",
                      fontSize: 13,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {rentError}
                  </span>
                </div>
              )}
            </Col>
          </Row>

          <Row></Row>
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
          </div>
        }



        <Modal.Footer style={{ borderTop: "none" }}>
          <Button
            onClick={handleSubmit}
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              borderRadius: 12,
              padding: "12px",
              border: "1px solid rgba(36, 0, 255, 1)",
              backgroundColor: "rgba(36, 0, 255, 1)",
              color: "#fff",
              fontSize: 16,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Move Check-In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

AssignBooking.propTypes = {
  assignBooking: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  modalType: PropTypes.func.isRequired,
  HostelID: PropTypes.func.isRequired,
  setModalType: PropTypes.func.isRequired,
};
export default AssignBooking;

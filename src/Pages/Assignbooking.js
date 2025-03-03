/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Row, Col, FormControl } from "react-bootstrap";
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calendars from "../Assets/Images/New_images/calendar.png";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";
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
    props.setModalType(false);
    dispatch({ type: "REMOVE_ERROR_ASSIGN_BOOKING" });
    setFloor("");
    setRoom("");
    setBed("");
    setJoiningDate("");
    setDateError("");
    // setAdvanceamount('')
    setRentAmount("");
    setfloorError("");
    setRoomError("");
    setBedError("");
    setRentError("");
    setAdavanceError("");
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
          setfloorError("Floor is required");
          break;
        case "room":
          setRoomError("Room is required");
          break;
        case "bed":
          setBedError("Bed is required");
          break;
        case "joiningDate":
          setDateError("Joining Date is required");
          break;
        case "advanceAmount":
          setAdavanceError("Advance Amount is required");
          break;
        case "rentAmount":
          setRentError("Rent Amount is required");
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
    event.preventDefault(); // Prevent default form submission behavior

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
      setDateError("Date is required.");
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
    };

    dispatch({
      type: "ASSIGN_BOOKING",
      payload: payload,
    });
  };

  useEffect(() => {
    if (state.Booking.statusCodeForAssignBooking === 200) {
      handleAssignClose();
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.Booking.statusCodeForAssignBooking]);

  const handleFloor = (floorId) => {
    if (!floorId) {
      setfloorError("Please select a valid floor.");
      return;
    }
    setFloor(floorId);
    setfloorError("");
    dispatch({
      type: "ROOMCOUNT",
      payload: { floor_Id: floorId, hostel_Id: hostalId },
    });
  };

  const handleRoom = (selectedOption) => {
    const selectedRoomId = selectedOption?.value;
    setRoom(selectedRoomId);
    setBed("");

    if (selectedRoomId) {
      const payload = {
        hostel_id: hostalId,
        floor_id: floor,
        room_id: selectedRoomId,
        // joining_date: joiningDate,
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

  const handleBed = (e) => {
    setBed(e.target.value);

    const Bedfilter =
      state?.UsersList?.roomdetails &&
      state.UsersList.roomdetails.filter(
        (u) =>
          u.Hostel_Id === hostalId && u.Floor_Id === floor && u.Room_Id === room
      );

    const Roomamountfilter =
      Bedfilter &&
      Bedfilter.length > 0 &&
      Bedfilter[0]?.bed_details.filter((amount) => amount.id === e.target.value);

    if (Roomamountfilter.length !== 0) {
      setRentAmount(Roomamountfilter[0]?.bed_amount);
    }

    setBedError("");
    setRentError("");
  };

  const handleRentAmount = (e) => {
    setRentAmount(e.target.value);
    setRentError("");
  };
  const handleAdvanceAmount = (e) => {
    setAdvanceamount(e.target.value);
    setAdavanceError("");
  };

  const customDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          // disabled={edit}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
          }}
        />
        <img
          src={Calendars}
          style={{
            height: 24,
            width: 24,
            marginLeft: 10,
            cursor: "pointer",
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };

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
            size="32"
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
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      padding: 0,
                      overflowY: "auto",
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
                    state?.PgList?.roomCount?.map((item) => ({
                      value: item.Room_Id,
                      label: item.Room_Name,
                    })) || []
                  }
                  onChange={handleRoom}
                  value={
                    state?.PgList?.roomCount
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
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      padding: 0,
                      overflowY: "auto",
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

              <Form.Select
                aria-label="Default select example"
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
                value={bed}
                className="border"
                placeholder="Select a bed"
                id="form-selects"
                onChange={(e) => handleBed(e)}
              >
                <option value="" selected>
                  Selected Bed
                </option>

                {state.UsersList?.bednumberdetails?.bed_details &&
                  state.UsersList?.bednumberdetails?.bed_details
                    .filter(
                      (item) =>
                        item.bed_no !== "0" &&
                        item.bed_no !== "undefined" &&
                        item.bed_no !== "" &&
                        item.bed_no !== "null"
                    )
                    .map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.bed_no}
                      </option>
                    ))}
              </Form.Select>

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
                  Joining_Date
                </Form.Label>
                <div
                  style={{ position: "relative", width: "100%", marginTop: 7 }}
                >
                  <DatePicker
                    selected={joiningDate}
                    onChange={(date) => {
                      setDateError("");
                      setJoiningDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    minDate={null}
                    // disabled={edit}
                    customInput={customDateInput({
                      value: joiningDate
                        ? joiningDate.toLocaleDateString("en-GB")
                        : "",
                    })}
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
                  Advance Amount
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter amount"
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
                  Rent Amount
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter amount"
                  value={rentamount}
                  onChange={(e) => handleRentAmount(e)}
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

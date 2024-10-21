import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Row, Col, Button,FormControl } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { CloseCircle } from "iconsax-react";
import Calendars from "../Assets/Images/New_images/calendar.png";
import { Room, RoomOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import Booking from "./UserlistBookings";

// const BookingModal = ({

//   show,
//   handleClose,
//   mode, // 'add' or 'edit'
//   customer, // customer object for edit mode
//   handleSave,
// }) => {

function BookingModal(props) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");
  const [paying, setPaying] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [endMeterError, setendMeterError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  // const [startMeterError, setstartMeterError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setamountError] = useState("");
  const [formError, setFormError] = useState("");
  const [HostelName, setHostelName] = useState("");
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formEdit, setFormEdit] = useState({});


  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: paying },
    });
  }, [paying]);
  // useEffect(()=>{
  //   dispatch({ type: "GET_BOOKING_LIST"});
  // },[])

  useEffect(() => {
    if (paying && floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: paying, floor_Id: floor },
      });
    }
  }, [floor]);
  useEffect(() => {
    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: { hostel_id: paying, floor_id: floor, room_id: room },
    });
  }, [room]);

  const calendarRef = useRef(null);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setfirstNameError("");
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    setamountError("");
  };
  // const handlePayingguest =(e)=>{
  //   setPaying(e.target.value)
  //   setHostelIdError('')
  // }
  const handlePayingguest = (e) => {
    const selectedHostelId = e.target.value;
    // handleInputChange()
    const selectedHostel =
      state.UsersList.hostelList &&
      state.UsersList.hostelList.filter((item) => item.id == e.target.value);
    setPaying(selectedHostelId);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    if (selectedHostelId === "Select a PG") {
      setHostelIdError("Please select a valid PG");
    } else {
      setHostelIdError("");
    }
    setFloor("");
    setRoom("");
    setBed("");
    setHostelIdError("");
    setFormError("");
  };
  const handleFloor = (e) => {
    setFloor(e.target.value);
    setfloorError("");
  };

  const handleRoom = (e) => {
    setRoom(e.target.value);
    setRoomError("");
  };

  const handleBed = (e) => {
    setBed(e.target.value);
    setBedError("");
  };

  const handleComments = (e) => {
    setComments(e.target.value);
  };
  const options = {
    dateFormat: "Y/m/d",

    // defaultDate: selectedDate ,
    maxDate: new Date(),
    minDate: new Date(),

  };
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [joiningDate]);

  const handleDate =(selectedDates)=>{
    setJoiningDate(selectedDates[0])
    setDateError('')
  }
 

  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Select a PG" ||
      value === "Select a floor" ||
      value === "Select a room" ||
      value === "Select a bed"
    ) {
      switch (fieldName) {
        case "firstName":
          setfirstNameError("FirstName ID is required");
          break;
        case "joiningDate":
          setDateError("joiningDate ID is required");
          break;
        case "amount":
          setamountError("Amount is required");
          break;
        case "paying":
          setHostelIdError("Hostel ID is required");
          break;
        case "floor":
          setfloorError("Floor is required");
          break;
        case "room":
          setRoomError("Room is required");
          break;
        case "bed":
          setBedError("Bed is required");
          break;

        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "firstName":
          setfirstNameError("");
          break;
        case "joiningDate":
          setDateError("");
          break;
        case "amount":
          setamountError("");
          break;
        case "paying":
          setHostelIdError("");
          break;
        case "floor":
          setfloorError("");
          break;
        case "room":
          setRoomError("");
          break;
        case "bed":
          setBedError("");
          break;

        default:
          break;
      }
      return true;
    }
  };

  const handleSubmit = () => {
    const isFirstnameValid = validateAssignField(firstName, "firstName");
    const isjoiningDateValid = validateAssignField(joiningDate, "joiningDate");
    const isamountValid = validateAssignField(amount, "amount");

    const isHostelValid = validateAssignField(paying, "paying");
    const isFloorvalid = validateAssignField(floor, "floor");
    const isRoomValid = validateAssignField(room, "room");
    const isbedvalid = validateAssignField(bed, "bed");

    if (paying === "Select a PG" || !isHostelValid) {
      setHostelIdError("Please select a valid Hostel");
      return; // Prevent save
    } else {
      setfloorError(""); // Clear the error if valid
    }
    if (floor === "Select a floor" || !isFloorvalid) {
      setfloorError("Please select a valid Floor");
      return; // Prevent save
    } else {
      setfloorError(""); // Clear the error if valid
    }

    // Validate Room field
    if (room === "Select a room" || !isRoomValid) {
      setRoomError("Please select a valid Room");
      return; // Prevent save
    } else {
      setRoomError("");
    }
    if (bed === "Select a bed" || !isbedvalid) {
      setBedError("Please select a valid Room");
      return; // Prevent save
    } else {
      setBedError(""); // Clear the error if valid
    }

    if (
      !isFirstnameValid ||
      !isjoiningDateValid ||
      (!isamountValid &&
        !isHostelValid &&
        !isFloorvalid &&
        !isRoomValid &&
        !isbedvalid)
    ) {
      return;
    }
    let formattedDate = null;
    try {
      formattedDate = new Date(joiningDate).toISOString().split("T")[0];
    } catch (error) {
      setDateError("date is required.");
      console.error(error);
      return;
    }
    dispatch({
      type: "ADD_BOOKING",
      payload: {
        first_name: firstName,
        last_name: lastName,
        joining_date: formattedDate,
        amount: amount,
        hostel_id: paying,
        floor_id: floor,
        room_id: room,
        bed_id: bed,
        comments: comments,
      },
    });
   
    

  };
  const handleAddClose=()=>{
    props.setShowbookingForm(false)

    setFirstName('')
    setLastName('')
    setAmount('')
    setJoiningDate('')
    setPaying('')
    setFloor('')
    setRoom('')
    setBed('')
    setComments('')
    setBedError('')
  }
  useEffect(()=>{
    if(state.Booking.bookingError){
      setBedError(state.Booking.bookingError)

    }
  },[state.Booking.bookingError])
  
  console.log("stateghjhsjdhjs",state)

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      props.handleClose()
    
      dispatch({ type:"GET_BOOKING_LIST" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  return (
    <Modal
      show={props.show}
      onHide={handleAddClose}
      centered
      backdrop="static"
    >
      {/* <Form noValidate validated={validated} > */}
      <Modal.Header className="d-flex justify-content-between">
        <Modal.Title>New Booking</Modal.Title>
        <CloseCircle
          size="32"
          color="#222222"
          onClick={handleAddClose}
          style={{ cursor: "pointer" }}
        />
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                First Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                style={{
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                  fontFamily: "Gilroy",
                  height: "50px",
                }}
                value={firstName}
                className={formErrors.firstName ? "is-invalid" : ""}
                onChange={(e) => handleFirstName(e)}
              />
            </Form.Group>
            {firstNameError && (
              <div style={{ color: "red" }}>
                <MdError />
                {firstNameError}
              </div>
            )}
          </Col>
          <Col md={6}>
            <Form.Group controlId="formLastName" className="mb-3">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Last Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                style={{
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                  fontFamily: "Gilroy",
                  height: "50px",
                }}
                value={lastName}
                isInvalid={!!formErrors.lastName}
                onChange={(e) => handleLastName(e)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-2" controlId="formJoiningDate">
            <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222",
                  fontFamily: "'Gilroy'",
                  fontWeight: 500,
                }}
              >
                Joining_Date  <span style={{ color: "red", fontSize: "20px" }}> * </span>
              </Form.Label>

              <div style={{ position: "relative" }}>
                <label
                  htmlFor="date-input"
                  style={{
                    border: "1px solid #D9D9D9",
                    borderRadius: 8,
                    padding: 11,
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    color: "#222222",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // Ensure space between text and icon
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (calendarRef.current) {
                      calendarRef.current.flatpickr.open();
                    }
                  }}
                >
                  {joiningDate
                    ? joiningDate.toLocaleDateString("en-GB")
                    : "YYYY/MM/DD"}
                  <img
                    src={Calendars}
                    style={{ height: 24, width: 24, marginLeft: 10 }}
                    alt="Calendar"
                  />
                </label>
                <Flatpickr
                  ref={calendarRef}
                  options={options}
                  value={joiningDate}
                  onChange={(selectedDates)=> handleDate(selectedDates)}
                    
                  
                  style={{
                    padding: 10,
                    fontSize: 16,
                    width: "100%",
                    borderRadius: 8,
                    border: "1px solid #D9D9D9",
                    position: "absolute",
                    top: 100,
                    left: 100,
                    zIndex: 1000,
                    display: "none",
                  }}
                />
              </div>
            </Form.Group>
            {dateError && (
              <div style={{ color: "red" }}>
                <MdError />
                {dateError}
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
                                        Amount{" "}
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
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter amount"
                                        value={amount}
                                        onChange={(e) => handleAmount(e)}
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
            {amountError && (
              <div style={{ color: "red" }}>
                <MdError />
                {amountError}
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="formPaying">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Paying Guest <span style={{ color: "#FF0000" }}>*</span>
              </Form.Label>
              {/* <Form.Select
        aria-label="Paying Guest"
        value={paying}
        isInvalid={!!formErrors.paying}
         className='' id="vendor-select"
        onChange={(e) => handlePayingguest(e)}
        style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
      >
        <option value="">Select a PG</option>
        <option value="UPI/BHIM">Paying guest 1</option>
        <option value="CASH">Paying guest 2</option>
        <option value="Net Banking">Paying guest 3</option>
      </Form.Select> */}

              <Form.Select
                aria-label="Default select example"
                className="border"
                value={paying}
                onChange={(e) => handlePayingguest(e)}
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  lineHeight: "18.83px",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: 8,
                }}
              >
                <option
                  style={{ fontSize: 14, fontWeight: 600 }}
                  selected
                  value=""
                >
                  Select a PG
                </option>
                {state.UsersList?.hostelList &&
                  state.UsersList?.hostelList.map((item) => (
                    <>
                      <option key={item.id} value={item.id}>
                        {item.Name}
                      </option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
            {hostelIdError && (
              <div style={{ color: "red" }}>
                <MdError />
                {hostelIdError}
              </div>
            )}
          </Col>
          <Col>
            <Form.Group className="mb-2" controlId="formFloor">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Floor <span style={{ color: "#FF0000" }}>*</span>
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                className="border"
                value={floor}
                onChange={(e) => handleFloor(e)}
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
              >
                <option
                  style={{ fontSize: 14, fontWeight: 600 }}
                  selected
                  value=""
                >
                  Select Floor
                </option>
                {state?.UsersList?.hosteldetailslist &&
                  state?.UsersList?.hosteldetailslist.map((item) => (
                    <>
                      <option key={item.floor_id} value={item.floor_id}>
                        {item.floor_name}
                      </option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
            {floorError && (
              <div style={{ color: "red" }}>
                <MdError />
                {floorError}
              </div>
            )}
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-2" controlId="formRoom">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Room <span style={{ color: "#FF0000" }}>*</span>
              </Form.Label>

              <Form.Select
                aria-label="Default select example"
                className="border"
                value={room}
                onChange={(e) => handleRoom(e)}
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
              >
                <option>Select a Room</option>
                {state.UsersList?.roomdetails &&
                  state.UsersList?.roomdetails.map((item) => (
                    <>
                      <option key={item.Room_Id} value={item.Room_Id}>
                        {item.Room_Name}
                      </option>
                    </>
                  ))}
              </Form.Select>
            </Form.Group>
            {roomError && (
              <div style={{ color: "red" }}>
                <MdError />
                {roomError}
              </div>
            )}
          </Col>
          <Col>
            <Form.Group className="mb-2" controlId="formBed">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Bed <span style={{ color: "#FF0000" }}>*</span>
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

                {/* {props.edit === "Edit" &&
    Bednum &&
    Bednum.Bed &&
    Bednum.Bed !== "undefined" &&  Bednum.Bed !== "" &&  Bednum.Bed !== "null" &&  Bednum.Bed !== "0" && (
      <option value={Bednum.Bed} selected>
        {Bednum.Bed}
      </option>
    )} */}

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
            </Form.Group>
            {bedError && (
              <div style={{ color: "red" }}>
                <MdError />
                {bedError}
              </div>
            )}
          </Col>
        </Row>

        <Form.Group controlId="formComments" className="mb-3">
          <Form.Label
            style={{
              fontSize: 14,
              color: "#222222",
              fontFamily: "Gilroy",
              fontWeight: 500,
            }}
          >
            Comments
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter comments"
            value={comments}
            onChange={(e) => handleComments(e)}
            style={{
              fontSize: 14,
              color: "rgba(75, 75, 75, 1)",
              fontFamily: "Gilroy",
            }}
          />
        </Form.Group>

        <Modal.Footer>
          <Button
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
            onClick={handleSubmit}
          >
            Saved
          </Button>
        </Modal.Footer>
      </Modal.Body>
      {/* </Form> */}
    </Modal>
  );
}

export default BookingModal;

import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendars from "../Assets/Images/New_images/calendar.png";
import { CloseCircle } from "iconsax-react";

function AssignBooking(props) {

  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [payingguest, setPayingGuest] = useState('');
  const [aadharno, setAadharno] = useState('');
  const [address, setAddress] = useState('');
  const [phoneError, setPhoneError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [addressError, setAddressError] = useState("");
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [dateError, setDateError] = useState("");
  const [rentamount, setRentAmount] = useState("");
  const [Advanceamount, setAdvanceamount] = useState("")
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [rentError, setRentError] = useState("");
  const [advanceError, setAdavanceError] = useState("")
  const [hostalId, setHostalId] = useState(null);
  const [hostelIdError, setHostelIdError] = useState("");

  const [bedDetails, setBedDetails] = useState([]);


  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, [])


  useEffect(() => {
    dispatch({ type: "HOSTELDETAILLIST", payload: { hostel_Id: hostalId } })
  }, [])

  useEffect(() => {

    setHostalId(props.HostelID);


  }, [props.HostelID]);

  const handleAssignClose = () => {
    props.setModalType(false)
dispatch({ type: 'REMOVE_ERROR_ASSIGN_BOOKING'})
    setFloor('')
    setRoom('')
    setBed('')
    setJoiningDate('')
    setDateError('')
    setAdvanceamount('')
    setRentAmount('')
    setfloorError('')
    setRoomError('')
    setBedError('')
    setRentError('')
    setAdavanceError('')
  }



  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };

  const handleMobile = (e) => {
    setMobileNo(e.target.value)
    const pattern = /^\d{1,10}$/;
    const isValidMobileNo = pattern.test(e.target.value);

    if (isValidMobileNo && e.target.value.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid mobile number *");
    }
    setPhoneError("");

  }
  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);


    const hasUpperCase = /[A-Z]/.test(emailValue);
    const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;


    const isValidEmail = emailRegex.test(emailValue);


    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");
    } else if (hasUpperCase) {
      setEmailErrorMessage("Email should be in lowercase *");
      setEmailError("Invalid Email Id *");
    } else if (!isValidEmail) {
      setEmailErrorMessage("");
      setEmailError("Invalid Email Id *");
    } else {
      setEmailError("");
      setEmailErrorMessage("");


    }

    // Clear email error on input change
    // dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };
  const handleAddress = (e) => {
    setAddress(e.target.value)
    setAddressError('')
  }
  const MobileNumber = `${countryCode}${mobileno}`;
  // useEffect(()=>{
  //   if(props.assignBooking){
  //     const phoneNumber = String(props.assignBooking.phone_number || "");
  //     const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
  //     const mobileNumber = phoneNumber.slice(-10);
  //     setFirstName(props.assignBooking.first_name)
  //     setLastName(props.assignBooking.last_name)
  //     setPayingGuest(props.assignBooking.hostel_name)
  //     setMobileNo(mobileNumber)
  //     setAddress(props.assignBooking.address)
  //     setEmail(props.assignBooking.email_id)
  //     setCountryCode(countryCode)


  //   }
  // })
  // useEffect(()=>{
  //   if(props.assignBooking){

  //     setFloor(props.assignBooking.floor_id)
  //     setRoom(props.assignBooking.room_id)
  //     setBed(props.assignBooking.bed_id)
  //     setAdvanceamount(props.assignBooking.amount)
  //     setRentAmount(props.assignBooking.room_rent
  //     )

  //   //   const newdate = props.assignBooking.joining_date
  //   //  const joiningdate =  newdate.toLocaleDateString('en-GB') 
  //   const newdate = props.assignBooking.joining_date;

  // if (newdate) {
  //     // Convert to Date object if `newdate` is a valid date string
  //     const dateObject = new Date(newdate);

  //     if (!isNaN(dateObject)) {
  //         const joiningdate = dateObject.toLocaleDateString('en-GB');
  //         setJoiningDate (joiningdate)

  //     } else {
  //     }
  // } else {
  // }


  //     // setJoiningDate (props.assignBooking.joining_date
  //     // )


  //   }
  // })
  useEffect(() => {
    if (props.assignBooking) {
      // setFloor(props.assignBooking.floor_id);
      // setRoom(props.assignBooking.room_id);
      // setBed(props.assignBooking.bed_id);
      setAdvanceamount(props.assignBooking.amount);
      setRentAmount(props.assignBooking.room_rent);
      // setJoiningDate (props.assignBooking.joining_date);


      // const newdate = props.assignBooking.joining_date;

      // if (newdate) {
      //   const dateObject = new Date(newdate); // Convert the date string to a Date object
      //   if (!isNaN(dateObject)) {
      //     const formattedDate = dateObject.toLocaleDateString('en-GB'); // Format the date
      //     setJoiningDate(formattedDate); // Update the state
      //   } else {
      //   }
      // } else {
      // }
    }
  }, [props.assignBooking]);



  // const validateAssignField = (value, fieldName) => {
  //   const stringValue = String(value).trim();
  //   if (!stringValue) {
  //     switch (fieldName) {
  //       case "mobileno":
  //         setPhoneError("mobileno is required");
  //         break;
  //       case "address":
  //         setAddressError("address is required");
  //         break;

  //       default:
  //         break;
  //     }
  //     return false;
  //   } else {
  //     switch (fieldName) {
  //       case "mobileno":
  //         setPhoneError("");
  //       case "address":
  //         setAddressError("");
  //         break;
  //       default:
  //         break;
  //     }
  //     return true;
  //   }
  // };

  const validateAssignField = (value, fieldName) => {
    const stringValue = String(value).trim();
    if (!stringValue) {
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
          setDateError("Joining Date  is required");
          break;
        case "advanceAmount":
          setAdvanceamount("AdvanceAmount is required");
          break;
        case "rentAmount":
          setRentError("RentAmount is required");
          break;
        case "hostalId":
          setHostelIdError("Hostel ID is required");
          break;
        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "floor":
          setfloorError("");
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
          setAdvanceamount("");
          break;
        case "rentAmount":
          setRentError("");
          break;
        case "hostalId":
          setHostelIdError("");
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
    const isrentAmountvalid = validateAssignField(rentamount, "rentAmount");


    if (
      !isFloorvalid ||
      !isRoomValid ||
      !isbedvalid ||
      !isjoiningDatevalid ||
      !isrentAmountvalid



    ) {
      return;
    }

    let formattedDate = null;
    try {
      let date = new Date(joiningDate);
      date.setDate(date.getDate() + 1);
      formattedDate = date.toISOString().split("T")[0];
    } catch (error) {
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
      handleAssignClose()
      dispatch({ type: "USERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      dispatch({ type: "GET_BOOKING_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });

    }

  }, [state.Booking.statusCodeForAssignBooking])

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNo(value);
      if (formErrors.mobileno) {
        setFormErrors((prev) => ({ ...prev, mobileno: '' }));
      }
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 12) {
      setAadharno(value);
      if (formErrors.aadharno) {
        setFormErrors((prev) => ({ ...prev, aadharno: '' }));
      }
    }
  };
  const handleFloor = (e) => {
    const selectedFloor = e.target.value; // Get the selected floor ID
    setFloor(selectedFloor);

    if (selectedFloor) {

      // Dispatch the action to fetch room details based on floor ID and hostel ID
      // dispatch({
      //   type: 'ROOMDETAILS',
      //   payload: { floor_Id: selectedFloor, hostel_Id: hostalId },
      // });
      dispatch({
        type: "ROOMCOUNT",
        payload: { floor_Id: selectedFloor, hostel_Id: hostalId },
      });
      setfloorError(""); // Clear any existing floor error
    } else {
      setfloorError("Please select a valid floor."); // Set an error if no floor is selected
    }
    setfloorError("")
  };

  // const handleRoom = (e) => {
  //   setRoom(e.target.value);
  //   setRoomError("")


  // };
  const handleRoom = (e) => {
    const selectedRoomId = e.target.value; // Get selected Room ID
    setRoom(selectedRoomId); // Update the room state
    setBed(""); // Reset the selected bed when a new room is chosen

    let formattedDate = null;
    try {
      let date = new Date(joiningDate);
      date.setDate(date.getDate() + 1);
      formattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      setDateError("Date is required.");
      return;
    }

    if (selectedRoomId) {
      const payload = {
        hostel_id: hostalId,
        floor_id: floor,
        room_id: selectedRoomId,
        joining_date: formattedDate,
      };


      dispatch({
        type: "BOOKINGBEDDETAILS",
        payload: payload,
      });

      setRoomError(""); // Clear any existing room error
    } else {
      setRoomError("Please select a valid room."); // Set error for invalid room
      setBedDetails([]); // Clear bed details if no room is selected
    }
  };

  //  useEffect(() => {
  //     dispatch({
  //       type: "BOOKINGBEDDETAILS",
  //       payload: { hostel_id: hostalId, floor_id: selectedFloor, room_id: room ,joining_date:joiningDate},
  //     });
  //   }, [room]);
  const handleBed = (e) => {
    setBed(e.target.value);
    setBedError("")
  };

  // const handleBed = (e) => {
  //   setBed(e.target.value);
  //   const Bedfilter =state?.UsersList?.roomdetails && state.UsersList.roomdetails.filter ((u)=>  u.Hostel_Id == paying && u.Floor_Id == floor  && u.Room_Id == room  )

  //   const Roomamountfilter = Bedfilter&& Bedfilter.length > 0 && Bedfilter[0].bed_details.filter (amount => amount.id == e.target.value)

  //   if (Roomamountfilter.length !=0) {
  //     setAdvanceamount(Roomamountfilter[0].bed_amount)
  //   }
  //   setBedError("");
  //   setamountError('')


  // };

  const handleRentAmount = (e) => {
    setRentAmount(e.target.value);
    setRentError("")

  };
  const handleAdvanceAmount = (e) => {
    setAdvanceamount(e.target.value);
    setAdavanceError("")
  };

  const customDateInput = (props) => {
    return (
      <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
        <FormControl
          type="text"
          className='date_input'
          value={props.value || 'DD/MM/YYYY'}
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
            boxShadow: "none"
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
            transform: 'translateY(-50%)'
          }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };

  return (
    <>
      <Modal show={props.modalType} onHide={handleAssignClose} centered backdrop="static">

        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}>Move to Check-In</Modal.Title>
          <CloseCircle
            size="32"
            color="#222222"
            onClick={handleAssignClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>

       
        {state.Booking?.ErrorAssignBooking && (
                <div style={{ color: "red" }} className='ps-3 pt-3'>
                  <MdError />
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>Email already exists. Please use a different email address before proceeding with check-in.</span>
                </div>
              )}

        <Modal.Body>
          <Row>

            <Col md={6}>
              <Form.Group className="mb-2" controlId="formFloor">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Floor
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
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{floorError}</span>
                </div>
              )}
            </Col>


            <Col md={6}>
              <Form.Group className="mb-2" controlId="formRoom">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Room
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
                  {state.PgList?.roomCount &&
                    state.PgList?.roomCount.map((item) => (
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
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{roomError}</span>
                </div>
              )}

            </Col>
          </Row>

          <Row>

            <Col md={6}>
              <Form.Group className="mb-2" controlId="formBed">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Bed
                </Form.Label>

                {/* <Form.Select
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

    

                {state.Booking?.availableBedBooking?.bed_details &&
                 state.Booking?.availableBedBooking?.bed_details
                    .filter(
                      (item) =>
                        item.bed_no !== "0" &&
                        item.bed_no !== "undefined" &&
                        item.bed_no !== "" &&
                        item.bed_no !== "null"
                    )
                    .map((item) => (
                      <option key={item.bed_id} value={item.bed_id}>
                        {item.bed_no}
                      </option>
                    ))}
              </Form.Select> */}
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
                  onChange={(e) => handleBed(e)}
                >
                  <option value="" disabled>
                    Select a Bed
                  </option>
                  {/* {bedDetails.length > 0 ? (
    bedDetails.map((item) => (
      <option key={item.id} value={item.bed_no}>
        {item.bed_no} 
      </option>
    ))
  ) : (
    <option disabled>No beds available</option>
  )} */}

                  {state.Booking?.availableBedBooking?.bed_details &&
                    state.Booking?.availableBedBooking?.bed_details
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
                    <MdError />
                    <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{bedError}</span>
                  </div>
                )}

              </Form.Group>


            </Col>


            <Col md={6}>

              <Form.Group className="mb-2" controlId="joiningDate">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Joining_Date
                </Form.Label>
                <div style={{ position: 'relative', width: "100%" }}>
                  <DatePicker
                    selected={joiningDate}
                    onChange={(date) => {
                      setDateError('');
                      setJoiningDate(date);
                    }}
                    dateFormat="dd/MM/yyyy"
                    minDate={null}
                    // disabled={edit}
                    customInput={customDateInput({
                      value: joiningDate ? joiningDate.toLocaleDateString('en-GB') : '',
                    })}
                  />
                </div>

              </Form.Group>
              {dateError && (
                <div style={{ color: "red" }}>
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}><MdError /></span>
                  {dateError}
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
                  <MdError />
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{advanceError}</span>
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
                  <MdError />
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{rentError}</span>
                </div>
              )}
            </Col>


          </Row>

          <Row>


          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={handleSubmit}
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              borderRadius: 12,
              padding: '12px',
              border: '1px solid rgba(36, 0, 255, 1)',
              backgroundColor: 'rgba(36, 0, 255, 1)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'Gilroy',


            }}
          >
            Move Check-In
          </Button>
        </Modal.Footer>

      </Modal>
    </>
    //     <Modal show={props.modalType} onHide={handleAssignClose} centered backdrop="static">

    //         <Modal.Header closeButton>
    //           <Modal.Title>Assign Booking</Modal.Title>
    //         </Modal.Header>
    //         <Modal.Body>
    //           <Row>

    //             <Col md={6}>
    //               <Form.Group controlId="formFirstName" className="mb-3">
    //                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
    //                   First Name 
    //                 </Form.Label>
    //                 <Form.Control
    //                   type="text"
    //                   placeholder="Enter first name"
    //                   style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
    //                   value={firstName}
    //                   // onChange={}
    //                   isInvalid={!!formErrors.firstName}
    //                 />
    //                 <Form.Control.Feedback type="invalid">
    //                   {formErrors.firstName}
    //                 </Form.Control.Feedback>
    //               </Form.Group>
    //             </Col>


    //             <Col md={6}>
    //               <Form.Group controlId="formLastName" className="mb-3">
    //                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
    //                   Last Name 
    //                 </Form.Label>
    //                 <Form.Control
    //                   type="text"
    //                   placeholder="Enter last name"
    //                   style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
    //                   value={lastName}
    //                   onChange={(e) => {
    //                     setLastName(e.target.value);
    //                     if (e.target.value.trim() !== '') {
    //                       setFormErrors((prev) => ({ ...prev, lastName: '' }));
    //                     }
    //                   }}
    //                   isInvalid={!!formErrors.lastName}
    //                 />
    //                 <Form.Control.Feedback type="invalid">
    //                   {formErrors.lastName}
    //                 </Form.Control.Feedback>
    //               </Form.Group>
    //             </Col>
    //           </Row>

    //           <Row>

    //             <Col md={6}>
    //             <Form.Group>
    //                                       <Form.Label
    //                                         style={{
    //                                           fontSize: 14,
    //                                           color: "#222222",
    //                                           fontFamily: "Gilroy",
    //                                           fontWeight: 500,
    //                                         }}
    //                                       >
    //                                         Mobile number{" "}
    //                                         <span
    //                                           style={{
    //                                             color: "red",
    //                                             fontSize: "20px",
    //                                           }}
    //                                         >
    //                                           {" "}
    //                                           *{" "}
    //                                         </span>
    //                                       </Form.Label>

    //                                       <InputGroup>
    //                                         <Form.Select
    //                                           value={countryCode}
    //                                           id="vendor-select-pg"
    //                                           onChange={handleCountryCodeChange}
    //                                           style={{
    //                                             border: "1px solid #D9D9D9",
    //                                             borderRadius: "8px 0 0 8px",
    //                                             height: 50,
    //                                             fontSize: 16,
    //                                             color: "#4B4B4B",
    //                                             fontFamily: "Gilroy",
    //                                             fontWeight: countryCode ? 600 : 500,
    //                                             boxShadow: "none",
    //                                             backgroundColor: "#fff",
    //                                             maxWidth: 90,
    //                                             paddingRight: 10,
    //                                           }}
    //                                         >
    //                                           {state.UsersList?.countrycode?.country_codes?.map(
    //                                             (item) => {

    //                                               return (
    //                                                ,
    //                                                 (
    //                                                   <>
    //                                                     <option
    //                                                       value={item.country_code}
    //                                                     >
    //                                                       +{item.country_code}
    //                                                     </option>
    //                                                   </>
    //                                                 )
    //                                               );
    //                                             }
    //                                           )}
    //                                         </Form.Select>
    //                                         <Form.Control
    //                                           value={mobileno}
    //                                           onChange={handleMobile}
    //                                           type="text"
    //                                           placeholder="9876543210"
    //                                           maxLength={10}
    //                                           style={{
    //                                             fontSize: 16,
    //                                             color: "#4B4B4B",
    //                                             fontFamily: "Gilroy",
    //                                             fontWeight: mobileno ? 600 : 500,
    //                                             boxShadow: "none",
    //                                             borderLeft: "unset",
    //                                             borderRight: "1px solid #D9D9D9",
    //                                             borderTop: "1px solid #D9D9D9",
    //                                             borderBottom: "1px solid #D9D9D9",
    //                                             height: 50,
    //                                             borderRadius: "0 8px 8px 0",
    //                                           }}
    //                                         />
    //                                       </InputGroup>
    //                                       <p
    //                                         id="MobileNumberError"
    //                                         style={{
    //                                           color: "red",
    //                                           fontSize: 11,
    //                                           marginTop: 5,
    //                                         }}
    //                                       ></p>
    //                                       {phoneError && (
    //                                         <div style={{ color: "red" }}>
    //                                           <MdError />
    //                                           {phoneError}
    //                                         </div>
    //                                       )}
    //                                       {phonenumError && (
    //                                         <div style={{ color: "red" }}>
    //                                           <MdError />
    //                                           {phonenumError}
    //                                         </div>
    //                                       )}
    //                                       {phoneErrorMessage && (
    //                                         <div style={{ color: "red" }}>
    //                                           <MdError />
    //                                           {phoneErrorMessage}
    //                                         </div>
    //                                       )}
    //                                     </Form.Group>
    //             </Col>


    //             <Col md={6}>

    // <Form.Group className="mb-3">
    //                                       <Form.Label
    //                                         style={{
    //                                           fontSize: 14,
    //                                           color: "#222222",
    //                                           fontFamily: "Gilroy",
    //                                           fontWeight: 500,
    //                                         }}
    //                                       >
    //                                         Email Id
    //                                       </Form.Label>
    //                                       <FormControl
    //                                         type="text"
    //                                         id="form-controls"
    //                                         placeholder="Enter email address"
    //                                         value={email}
    //                                         onChange={(e) => handleEmail(e)}
    //                                         // style={bottomBorderStyle}
    //                                         style={{
    //                                           fontSize: 16,
    //                                           color: "#4B4B4B",
    //                                           fontFamily: "Gilroy",
    //                                           fontWeight: 500,
    //                                           boxShadow: "none",
    //                                           border: "1px solid #D9D9D9",
    //                                           height: 50,
    //                                           borderRadius: 8,
    //                                         }}
    //                                       />

    //                                       {emailError && (
    //                                         <div style={{ color: "red" }}>
    //                                           <MdError />
    //                                           {emailError}
    //                                         </div>
    //                                       )}

    //                                       {emailErrorMessage && (
    //                                         <div style={{ color: "red" }}>
    //                                           <MdError />
    //                                           {emailErrorMessage}
    //                                         </div>
    //                                       )}
    //                                     </Form.Group>
    //             </Col>
    //           </Row>

    //           <Row>

    //             <Col md={6}>
    //               <Form.Group controlId="formPayingGuest" className="mb-3">
    //                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
    //                   Paying Guest 
    //                 </Form.Label>
    //                 <Form.Control
    //                   type="text"
    //                   placeholder="Enter paying guest info"
    //                   style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
    //                   value={payingguest}
    //                   onChange={(e) => {
    //                     setPayingGuest(e.target.value);
    //                     if (e.target.value.trim() !== '') {
    //                       setFormErrors((prev) => ({ ...prev, payingguest: '' }));
    //                     }
    //                   }}
    //                   isInvalid={!!formErrors.payingguest}
    //                 />
    //                 <Form.Control.Feedback type="invalid">
    //                   {formErrors.payingguest}
    //                 </Form.Control.Feedback>
    //               </Form.Group>
    //             </Col>
    //             <Col md={6}>
    //               <Form.Group controlId="formAddress" className="mb-3">
    //                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
    //                   Address 
    //                 </Form.Label>
    //                 <Form.Control
    //                   as="textarea"
    //                   rows={3}
    //                   placeholder="Enter address"
    //                   style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
    //                   value={address}
    //                  onChange={(e)=>handleAddress(e)}
    //                 />

    //               </Form.Group>
    //               {addressError && (
    //                                       <div style={{ color: "red" }}>
    //                                         <MdError />
    //                                         {addressError}
    //                                       </div>
    //                                     )}
    //             </Col>

    //             {/* <Col md={6}>
    //               <Form.Group controlId="formAadharNo" className="mb-3">
    //                 <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
    //                   Aadhar Number 
    //                 </Form.Label>
    //                 <Form.Control
    //                   type="text"
    //                   placeholder="Enter Aadhar number"
    //                   style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
    //                   value={aadharno}
    //                   onChange={handleAadharChange}
    //                   isInvalid={!!formErrors.aadharno}
    //                 />
    //                 <Form.Control.Feedback type="invalid">
    //                   {formErrors.aadharno}
    //                 </Form.Control.Feedback>
    //               </Form.Group>
    //             </Col> */}
    //           </Row>

    //           <Row>


    //           </Row>
    //         </Modal.Body>
    //         <Modal.Footer>
    //           <Button
    //           onClick={handleSubmit}
    //             variant="primary"
    //             type="submit"
    //             className="w-100"
    //             style={{
    //               borderRadius: 12,
    //               padding: '12px',
    //               border: '1px solid rgba(36, 0, 255, 1)',
    //               backgroundColor: 'rgba(36, 0, 255, 1)',
    //               color: '#fff',
    //               fontSize: 16,
    //               fontWeight: 600,
    //               fontFamily: 'Gilroy',


    //             }} 
    //           >
    //             Assign Booking
    //           </Button>
    //         </Modal.Footer>

    //     </Modal>
  );
};

export default AssignBooking;



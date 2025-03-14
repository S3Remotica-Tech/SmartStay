/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "flatpickr/dist/themes/material_blue.css";
import { CloseCircle } from "iconsax-react";
import Calendars from "../Assets/Images/New_images/calendar.png";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Plus from "../Assets/Images/New_images/addplus-circle.svg";
import Profile2 from "../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";
import PropTypes from "prop-types";
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
  // const [paying, setPaying] = useState("");
  // const [floor, setFloor] = useState("");
  // const [room, setRoom] = useState("");
  // const [bed, setBed] = useState("");
  // const [hostelIdError, setHostelIdError] = useState("");
  // const [floorError, setfloorError] = useState("");
  // const [roomError, setRoomError] = useState("");
  // const [bedError, setBedError] = useState("");
  // const [endMeterError, setendMeterError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  // const [startMeterError, setstartMeterError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setamountError] = useState("");
  // const [formError, setFormError] = useState("");
  // const [HostelName, setHostelName] = useState("");
  // const [validated, setValidated] = useState(false);
  // const [formErrors, setFormErrors] = useState({});
  // const [formEdit, setFormEdit] = useState({});
  const [Phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [Address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [Email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  // const [emailIdError, setemailIdError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  // const [errorInPhone, seterrorInPhone] = useState("");
  // const [errorInEmail, seterrorInEmail] = useState("");
  // const [hostalId, setHostalId] = useState(null);
  const [file, setFile] = useState(null);
  const countryCode = '91';
 

  // useEffect(() => {
  //   dispatch({ type: "HOSTELLIST" });
  // }, []);

  // useEffect(() => {
  //   dispatch({
  //     type: "HOSTELDETAILLIST",
  //     payload: { hostel_Id: paying },
  //   });
  // }, [paying]);
  // useEffect(()=>{
  //   dispatch({ type: "GET_BOOKING_LIST"});
  // },[])

  // useEffect(() => {
  //   if (paying && floor) {
  //     dispatch({
  //       type: "ROOMDETAILS",
  //       payload: { hostel_Id: paying, floor_Id: floor },
  //     });
  //   }
  // }, [floor]);
  // useEffect(() => {
  //   dispatch({
  //     type: "BOOKINGBEDDETAILS",
  //     payload: {
  //       hostel_id: paying,
  //       floor_id: floor,
  //       room_id: room,
  //       joining_date: joiningDate,
  //     },
  //   });
  // }, [room]);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [joiningDate]);

  useEffect(() => {
    if (state.Booking.bookingPhoneError) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_PHONE_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingPhoneError]);

  useEffect(() => {
    if (state.Booking.bookingEmailError) {
      // seterrorInEmail(state.Booking.bookingEmailError)
      setTimeout(() => {
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingEmailError]);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      handleAddClose();
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      dispatch({ type: "CLEAR_PHONE_ERROR" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);


  const calendarRef = useRef(null);

  const handleFirstName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstName(value);
    setfirstNameError("");
  };
  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setLastName(value);
  };
  const handleAmount = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return; 
    }
    setAmount(newAmount);
    setamountError("");
  };

  // const handlePayingguest =(e)=>{
  //   setPaying(e.target.value)
  //   setHostelIdError('')
  // }
  // const handlePayingguest = (e) => {
  //   const selectedHostelId = e.target.value;
  //   // handleInputChange()
  //   const selectedHostel =
  //     state.UsersList.hostelList &&
  //     state.UsersList.hostelList.filter((item) => item.id == e.target.value);

  //   setPaying(selectedHostelId);
  //   setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
  //   if (selectedHostelId === "Select a PG") {
  //     setHostelIdError("Please select a valid PG");
  //   } else {
  //     setHostelIdError("");
  //   }
  //   setFloor("");
  //   setRoom("");
  //   // setBed("");
  //   setHostelIdError("");
  //   setFormError("");
  // };
  // const handleFloor = (e) => {
  //   setFloor(e.target.value);
  //   setfloorError("");
  // };

  // const handleRoom = (e) => {
  //   setRoom(e.target.value);
  //   setRoomError("");
  // };

  // const handleBed = (e) => {
  //   setBed(e.target.value);
  //   const Bedfilter =
  //     state?.UsersList?.roomdetails &&
  //     state.UsersList.roomdetails.filter(
  //       (u) => u.Hostel_Id == paying && u.Floor_Id == floor && u.Room_Id == room
  //     );

  //   const Roomamountfilter =
  //     Bedfilter &&
  //     Bedfilter.length > 0 &&
  //     Bedfilter[0].bed_details.filter((amount) => amount.id == e.target.value);

  //   if (Roomamountfilter.length != 0) {
  //     setAmount(Roomamountfilter[0].bed_amount);
  //   }
  //   setBedError("");
  //   setamountError("");
  // };



  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, ""); 
    setPhone(input);
  
    if (input.length === 0) {
      setPhoneError(""); 
    } else if (input.length < 10) {
      setPhoneError("Invalid mobile number");
    } else if (input.length === 10) {
      setPhoneError(""); 
    }
  
    setPhoneErrorMessage("")
    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };
  
  const options = {
    dateFormat: "Y/m/d",

    defaultDate: joiningDate,
    minDate: new Date(),
  };
 

  // const handleDate = (selectedDates) => {
  //   setJoiningDate(selectedDates[0]);
  //   setDateError("");
  // };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setAddressError("");
  };
  const handleEmail = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);   
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");
    } else if (!isValidEmail) {
      setEmailErrorMessage("");
      setEmailError("Invalid Email Id");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Select a PG"
      // value === "Select a floor" ||
      // value === "Select a room" ||
      // value === "Select a bed"
    ) {
      switch (fieldName) {
        case "firstName":
          setfirstNameError("First Name is Required");
          break;
        case "Phone":
          setPhoneError("Phone  is Required");
          break;
        case "joiningDate":
          setDateError("Joining Date is Required");
          break;
        case "amount":
          setamountError("Amount is Required");
          break;
        // case "paying":
        //   setHostelIdError("Hostel ID is required");
        //   break;
        // case "floor":
        //   setfloorError("Floor is required");
        //   break;
        // case "room":
        //   setRoomError("Room is required");
        //   break;
        // case "bed":
        //   setBedError("Bed is required");
        //   break;
        case "Address":
          setAddressError("Address is Required");
          break;
        case "Email":
          setEmailError("Email is Required");
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
        case "Phone":
          setPhoneError("");
          break;
        case "joiningDate":
          setDateError("");
          break;
        case "amount":
          setamountError("");
          break;
        // case "paying":
        //   setHostelIdError("");
        //   break;
        // case "floor":
        //   setfloorError("");
        //   break;
        // case "room":
        //   setRoomError("");
        //   break;
        // case "bed":
        //   setBedError("");
        //   break;
        case "Address":
          setAddressError("");
          break;
        case "Email":
          setEmailError("");
          break;

        default:
          break;
      }
      return true;
    }
  };
  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };
  const MobileNumber = `${countryCode}${Phone}`;

  const handleSubmit = () => {
    // Validate fields
    const isFirstnameValid = validateAssignField(firstName, "firstName");
    const isPhoneValid = validateAssignField(Phone, "Phone");
    const isJoiningDateValid = validateAssignField(joiningDate, "joiningDate");
    const isAmountValid = validateAssignField(amount, "amount");
    // const isHostelValid = validateAssignField(paying, "paying");
    const isAddressValid = validateAssignField(Address, "Address");

    // If any validation fails, return early
    if (
      !isFirstnameValid ||
      !isPhoneValid ||
      !isJoiningDateValid ||
      !isAddressValid ||
      !isAmountValid
    ) {
      return;
    }

    // Format the joining date
    let formattedDate = null;
try {
  const date = new Date(joiningDate);
  date.setDate(date.getDate() + 1); 
  formattedDate = date.toISOString().split("T")[0];
} catch (error) {
  console.error("Error formatting date:", error);
  setDateError("Date is required.");
  return;
}
    // Ensure all required fields are present before dispatching

    dispatch({
      type: "ADD_BOOKING",
      payload: {
        f_name: firstName,
        l_name: lastName,
        joining_date: formattedDate,
        amount: amount,
        hostel_id: state.login.selectedHostel_Id,
        mob_no: MobileNumber,
        email_id: Email,
        address: Address,
        profile: file,
      },
    });
  };

  const handleAddClose = () => {
    setFirstName("");
    setLastName("");
    setAmount("");
    setJoiningDate("");
    setPhone("");
    setPhoneError("");
    setAddress("");
    setAddressError("");
    setfirstNameError("");
    // setfloorError("");
    // setHostelIdError("");
    setDateError("");
    setamountError("");
    setEmail("");
    setEmailError("");
    setEmailErrorMessage("");
    // seterrorInPhone("");
    // seterrorInEmail("");
    props.handleClose();
  };
 

  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setFile(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
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
    <div>
      <Modal
        show={props.show}
        onHide={handleAddClose}
        centered
        backdrop="static"
      >
        {" "}
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title
            style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}
          >
            Add Booking form
          </Modal.Title>
          <CloseCircle
            size="24"
            color="#222222"
            onClick={handleAddClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center" >
            <div
              className=""
              style={{ height: 100, width: 100, position: "relative" }}
            >
              <Image
                src={
                  file
                    ? typeof file === "string"
                      ? file // Handle case if file is an existing URL
                      : URL.createObjectURL(file) // Handle file object preview
                    : Profile2 // Default placeholder
                }
                roundedCircle
                style={{ height: 100, width: 100 }}
              />

              <label htmlFor="imageInput" className="">
                <Image
                  src={Plus}
                  roundedCircle
                  style={{
                    height: 20,
                    width: 20,
                    position: "absolute",
                    top: 90,
                    left: 80,
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  id="imageInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="ps-3">
              <div>
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#222222",
                    fontFamily: "Gilroy",
                  }}
                >
                  Profile Photo
                </label>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                  }}
                >
                  Max size of image 10MB
                </label>
              </div>
            </div>
          </div>

          <Row>
            <Col md={6} className="">
              <Form.Group controlId="formFirstName" >
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  First Name
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                  }}
                  value={firstName}
                  // className={formErrors.firstName ? "is-invalid" : ""}
                  onChange={(e) => handleFirstName(e)}
                />
              </Form.Group>
              {firstNameError && (
                <div style={{ color: "red" }}>
                  <MdError style={{marginRight:"3px",fontSize:"15px",marginBottom:"1px"}}/>
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {" "}
                    {firstNameError}
                  </span>
                </div>
              )}
            </Col>
            <Col md={6} className="">
              <Form.Group controlId="formLastName" >
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Last Name{" "}
                  {/* <span style={{ color: "transparent", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span> */}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                    marginTop:5
                  }}
                  value={lastName}
                  // isInvalid={!!formErrors.lastName}
                  onChange={(e) => handleLastName(e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Mobile Number
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>

                <InputGroup>
                  <Form.Select
                    value={countryCode}
                    id="vendor-select-pg"
                    // onChange={handleCountryCodeChange}
                    style={{
                      border: "1px solid #D9D9D9",

                      borderRadius: "8px 0 0 8px",
                      height: 50,
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: countryCode ? 600 : 500,
                      boxShadow: "none",
                      backgroundColor: "#fff",
                      maxWidth: 90,
                      paddingRight: 10,
                    }}
                  >
                    {/* {state.UsersList?.countrycode?.country_codes?.map(
                      (item) => {
                        return (
                          <>
                            <option value={item.country_code}>
                              +{item.country_code}
                            </option>
                          </>
                        );
                      }
                    )} */}
                     <option >
                              +{countryCode}
                            </option>

                  </Form.Select>
                  <Form.Control
                    value={Phone}
                    onChange={handlePhone}
                    type="text"
                    placeholder="9876543210"
                    maxLength={10}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: Phone ? 600 : 500,
                      boxShadow: "none",
                      borderLeft: "unset",
                      borderRight: "1px solid #D9D9D9",
                      borderTop: "1px solid #D9D9D9",
                      borderBottom: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: "0 8px 8px 0",
                    }}
                  />
                </InputGroup>
                <p
                  id="MobileNumberError"
                  style={{ color: "red", fontSize: 11, marginTop: "-13px" }}
                ></p>
                {phoneError && (
                  <div style={{ color: "red" }}>
                    <MdError style={{marginRight:"5px",fontSize:"15px",marginBottom:"1px"}}/>
                    <span
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                       
                      }}
                    >
                      {phoneError}
                    </span>
                  </div>
                )}

                {phoneErrorMessage && (
                  <div style={{ color: "red" }}>
                    <MdError style={{marginRight:"5px",fontSize:"15px",marginTop:"1px"}}/>
                    <span
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {phoneErrorMessage}
                    </span>
                  </div>
                )}
                {state.Booking.bookingPhoneError && (
                  <div style={{ color: "red" }}>
                    <MdError style={{marginRight:"5px",fontSize:"15px",marginBottom:"1px"}}/>
                    <span
                      style={{
                        color: "red",
                        fontSize: 12,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {state.Booking.bookingPhoneError}
                    </span>
                  </div>
                )}
              </Form.Group>
            </Col>

            <Col md={6} >
              <Form.Group controlId="formLastName" >
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Email ID
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please Enter Email ID"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                    marginTop:5
                  }}
                  value={Email}
                  // isInvalid={!!formErrors.lastName}
                  onChange={(e) => handleEmail(e)}
                />
              </Form.Group>
              {emailError && (
                <div style={{ color: "red" }}>
                  <MdError style={{marginRight:"3px",fontSize:"15px",marginBottom:"1px"}}/>
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {emailError}
                  </span>
                </div>
              )}
              {/* {emailIdError && (
                <div style={{ color: "red" }}>
                  <MdError style={{marginRight:"3px",fontSize:"15px",marginBottom:"1px"}} />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {emailIdError}
                  </span>
                </div>
              )} */}
              {emailErrorMessage && (
                <div style={{ color: "red" }}>
                  <MdError style={{marginRight:"3px",fontSize:"15px",marginBottom:"1px"}}/>
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {emailErrorMessage}
                  </span>
                </div>
              )}
              {state?.Booking?.bookingEmailError && (
                <div style={{ color: "red" }}>
                  <MdError style={{marginRight:"3px",fontSize:"15px",marginBottom:"1px"}}/>
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {state?.Booking?.bookingEmailError}
                  </span>
                </div>
              )}
            </Col>
          </Row>
          <Col md={12} className="mb-3">
            <Form.Group controlId="formFirstName">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Address
                <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                style={{
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                  fontFamily: "Gilroy",
                  height: "50px",
                }}
                value={Address}
                // className={formErrors.firstName ? "is-invalid" : ""}
                onChange={(e) => handleAddress(e)}
              />
            </Form.Group>
            {addressError && (
              <div style={{ color: "red" }}>
                <MdError style={{marginRight:"5px",fontSize:"15px",marginBottom:"1px"}}/>
                <span
                  style={{
                    color: "red",
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {addressError}
                </span>
              </div>
            )}
          </Col>

          <Row className="">
            <Col md={6}>
              <Form.Group  controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Joining_Date
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <div style={{ position: "relative", width: "100%" }}>
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
                  <MdError style={{marginRight:"5px",fontSize:"15px",marginBottom:"1px"}}/>
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {dateError}
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
                  Booking Amount
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Booking Amount"
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
                  <MdError style={{marginRight:"5px",fontSize:"15px",marginBottom:"1px"}}/>
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {amountError}
                  </span>
                </div>
              )}
            </Col>
          </Row>

          <Modal.Footer style={{ borderTop: "none" }}>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                borderRadius: 12,
                padding: "12px",
                border: "1px solid rgba(36, 0, 255, 1)",
                backgroundColor: "#1E45E1",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Gilroy",marginTop:10
              }}
              onClick={handleSubmit}
            >
              Add Booking
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </div>
  );
}

BookingModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired 
};

export default BookingModal;

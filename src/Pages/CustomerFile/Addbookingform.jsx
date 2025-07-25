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
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import imageCompression from "browser-image-compression";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from "react-select";


function BookingModal(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joiningDate, setJoiningDate] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [amount, setAmount] = useState("");
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("")
  const [state_name, setStateName] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setamountError] = useState("");
  const [Phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [Email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false)
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('')
  const [bookingDateErrmsg, setBookingDateErrmsg] = useState('')

  const firstnameRef = useRef();
  const phoneRef = useRef();
  const cityRef = useRef();
  const pincodeRef = useRef();
  const stateRef = useRef();
  const dateRef = useRef();
  const amountRef = useRef();
  const bookingDateRef = useRef();







  const [file, setFile] = useState(null);
  const countryCode = '91';

  const indianStates = [
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
  ];




  useEffect(() => {
    dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } })
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [joiningDate]);

  useEffect(() => {
    if (state.Booking.bookingPhoneError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_PHONE_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingPhoneError]);

  useEffect(() => {
    if (state.Booking.bookingEmailError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingEmailError]);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false)
      handleAddClose();
      setJoingDateErrmsg('');
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





  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setPhone(input);

    if (input.length === 0) {
      setPhoneError("");
    } else if (input.length < 10) {
      setPhoneError("Please Enter Valid Mobile Number");
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



  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("")
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
  }



  const handlePinCodeChange = (e) => {
    const value = e.target.value;
    if (!/^\d{0,6}$/.test(value)) {
      return;
    }

    setPincode(value);
    if (value.length > 0 && value.length < 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
    } else {
      setPincodeError("");
    }

  };

  const handleCity = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
    }
  }



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
      setEmailError("Please Enter Valid Email Id");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const validateAssignField = (value, fieldName, ref, setError, focusedRef) => {
    if (!value || value === "Select a PG") {

      switch (fieldName) {
        case "firstName":
          setError("Please Enter First Name");
          break;
        case "Phone":
          setError("Please Enter Mobile Number");
          break;
        case "joiningDate":
          setError("Please Select Joining Date");
          break;
        case "bookingDate":
          setError("Please Select Booking Date");
          break;
        case "amount":
          setError("Please Enter Amount");
          break;
        case "City":
          setError("Please Enter City");
          break;
        case "Pincode":
          setError("Please Enter Pincode");
          break;
        case "Statename":
          setError("Please Select State");
          break;
        case "Email":
          setError("Please Enter Email");
          break;
        default:
          break;
      }


      if (ref?.current && !focusedRef.current) {
        ref.current.focus();
        focusedRef.current = true;
      }
      return false;
    } else {
      setError("");
      return true;
    }
  };


  const MobileNumber = `${countryCode}${Phone}`;

  const handleSubmit = () => {

    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    dispatch({ type: "CLEAR_PHONE_ERROR" });

    let hasError = false;
    const focusedRef = { current: false };

    const isFirstnameValid = validateAssignField(firstName, "firstName", firstnameRef, setfirstNameError, focusedRef);
    const isPhoneValid = validateAssignField(Phone, "Phone", phoneRef, setPhoneError, focusedRef);
    const isPincodeValid = validateAssignField(pincode, "Pincode", pincodeRef, setPincodeError, focusedRef);
    const isCityValid = validateAssignField(city, "City", cityRef, setCityError, focusedRef);
    const isStatenameValid = validateAssignField(state_name, "Statename", stateRef, setStateNameError, focusedRef);
    const isJoiningDateValid = validateAssignField(joiningDate, "joiningDate", dateRef, setJoingDateErrmsg, focusedRef);
    const isBookingDateValid = validateAssignField(bookingDate, "bookingDate", bookingDateRef, setBookingDateErrmsg, focusedRef);
    const isAmountValid = validateAssignField(amount, "amount", amountRef, setamountError, focusedRef);



    if (!Phone) {
      setPhoneError("Please Enter Mobile Number");
      if (!focusedRef.current && phoneRef?.current) {
        phoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else if (Phone.length !== 10) {
      setPhoneError("Please Enter Valid Mobile Number");
      if (!focusedRef.current && phoneRef?.current) {
        phoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else {
      setPhoneError("");
    }





    if (pincode && pincode.length !== 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
      if (!focusedRef.current && pincodeRef?.current) {
        pincodeRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    }
    if (Email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(Email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter a Valid Email ID");
        if (!focusedRef.current) {
          focusedRef.current = true;
        }
        hasError = true;
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }

    if (!bookingDate) {

      if (!focusedRef.current && bookingDateRef?.current) {
        bookingDateRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    }
   
    if (hasError) return;
    if (
      !isFirstnameValid ||
      !isPhoneValid ||
      !isJoiningDateValid ||
      !isAmountValid ||
      !isCityValid ||
      !isPincodeValid ||
      !isStatenameValid ||
      !isBookingDateValid
    ) {
      return;
    }



    let formattedDate = null;
     let bookingFormattedDate = null;
    try {
      const date = new Date(joiningDate);
      date.setDate(date.getDate() + 1);
      formattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      setDateError("Please Select Date");
      return;
    }


    try {
      const date = new Date(bookingDate);
      date.setDate(date.getDate() + 1);
      bookingFormattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      setDateError("Please Select Date");
      return;
    }

   


    dispatch({
      type: "ADD_BOOKING",
      payload: {
        f_name: firstName,
        l_name: lastName,
        joining_date: formattedDate,
        booking_date:  bookingFormattedDate,
        amount: amount,
        hostel_id: state.login.selectedHostel_Id,
        mob_no: MobileNumber,
        email_id: Email,
        address: house_no,
        pin_code: pincode,
        area: street,
        landmark: landmark,
        city: city,
        state: state_name,
        profile: file,
      },
    });
    setFormLoading(true)
  };

  const handleAddClose = () => {
    setFormLoading(false)
    setFirstName("");
    setLastName("");
    setAmount("");
    setJoiningDate("");
    setBookingDate("")
    setPhone("");
    setHouseNo("")
    setStreet("")
    setCity("")
    setLandmark("")
    setPincode("")
    setStateName("")
    setPhoneError("");
    setfirstNameError("");
    setDateError("");
    setamountError("");
    setStateNameError("");
    setPincodeError("");
    setCityError("");
    setLandmarkError("");
    setStreetError("");
    setHouse_NoError("");
    setJoingDateErrmsg('');
    setEmail("");
    setEmailError("");
    setEmailErrorMessage("");
    props.handleClose();
    setFile("")
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


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

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
            Add Booking
          </Modal.Title>
          <CloseCircle
            size="24"
            color="#222222"
            onClick={handleAddClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll mt-2 me-3 pt-2">
          <div className="d-flex align-items-center" >
            <div
              className=""
              style={{ height: 100, width: 100, position: "relative" }}
            >
              <Image
                src={
                  file
                    ? typeof file === "string"
                      ? file
                      : URL.createObjectURL(file)
                    : Profile2
                }
                roundedCircle
                style={{ height: 100, width: 100, cursor: "pointer" }}
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
                    cursor: "pointer"
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

          <Row >
            <Col md={6} className="">
              <Form.Group controlId="formFirstName">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  First Name {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  ref={firstnameRef}
                  placeholder="Enter First Name"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                  }}
                  value={firstName}
                  onChange={(e) => handleFirstName(e)}
                />
              </Form.Group>
              {firstNameError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "3px", fontSize: "13px", marginBottom: "1px" }} />
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
                  Last Name {" "}

                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Last Name"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                    marginTop: 5
                  }}
                  value={lastName}
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
                  Mobile Number {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>

                <InputGroup>
                  <Form.Select
                    value={countryCode}
                    id="vendor-select-pg"
                    style={{
                      border: "1px solid #D9D9D9",
                      cursor: "pointer",
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

                    <option >
                      +{countryCode}
                    </option>

                  </Form.Select>
                  <Form.Control
                    value={Phone}
                    ref={phoneRef}
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
                    <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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
                    <MdError style={{ marginRight: "5px", fontSize: "13px", marginTop: "1px" }} />
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
                    <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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
                  Email ID {" "}
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Please Enter Email ID"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                    marginTop: 5
                  }}
                  value={Email}
                  onChange={(e) => handleEmail(e)}
                />
              </Form.Group>
              {emailError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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

              {emailErrorMessage && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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
                  <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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


          <Col md={12}>

            <Form.Group className="">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Flat , House no , Building , Company , Apartment {" "}
              </Form.Label>
              <FormControl
                type="text"
                id="form-controls"
                placeholder="Enter House No"
                value={house_no}
                onChange={(e) => handleHouseNo(e)}
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
            {house_noError && (
              <div style={{ color: "red" }}>
                <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
              </div>
            )}

          </Col>


          <Row>
            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Area , Street , Sector , Village {" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Street"
                  value={street}
                  onChange={(e) => handleStreetName(e)}
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
              {streetError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
                </div>
              )}
            </Col>

            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Landmark {" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="E.g , near appollo hospital"
                  value={landmark}
                  onChange={(e) => handleLandmark(e)}
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
              {landmarkError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group
                className=""
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Pincode {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Form.Control
                  value={pincode}
                  ref={pincodeRef}
                  onChange={(e) => handlePinCodeChange(e)}
                  type="tel"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter Pincode"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: pincode ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
                {pincodeError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {pincodeError}
                    </label>
                  </div>
                )}


              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Town/City {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter City"
                  value={city}
                  ref={cityRef}
                  onChange={(e) => handleCity(e)}
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
              {cityError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: '13px', marginRight: "5px", marginBottom: "2px" }} />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                </div>
              )}
            </Col>
          </Row>

          <Col md={12}>
            <Form.Group className="" controlId="exampleForm.ControlInput5">
              <Form.Label
                style={{
                  fontFamily: "Gilroy",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#222",
                  fontStyle: "normal",
                  lineHeight: "normal",
                }}
              >
                State {" "} <span style={{ color: "red", fontSize: "20px" }}> * </span>
              </Form.Label>

              <Select
                ref={stateRef}
                options={indianStates}
                onChange={(selectedOption) => {
                  setStateName(selectedOption?.value);
                }}
                onInputChange={(inputValue, { action }) => {
                  if (action === "input-change") {
                    const lettersOnly = inputValue.replace(
                      /[^a-zA-Z\s]/g,
                      ""
                    );
                    return lettersOnly;
                  }
                  return inputValue;
                }}
                value={
                  state_name ? { value: state_name, label: state_name } : null
                }
                placeholder="Select State"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No state available"}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "50px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: state_name ? 600 : 500,
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

            {!state_name && state_nameError && (
              <div style={{ color: "red" }}>
                <MdError style={{ fontSize: "13px", marginRight: "5px", marginBottom: "2px" }} />
                <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                  {state_nameError}
                </span>
              </div>
            )}
          </Col>



          <Row className="pt-1">
            <Col md={6}>
              <Form.Group controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Expected Joining Date {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>


                <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                  <DatePicker
                    ref={dateRef}
                    style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={joiningDate ? dayjs(joiningDate) : null}
                    onChange={(date) => {
                      setDateError("");
                      setJoiningDate(date ? date.toDate() : null);
                      setJoingDateErrmsg('');
                    }}
                  
                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}

                  />
                </div>
              </Form.Group>
              {dateError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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

              {joiningDateErrmsg.trim() !== "" && (
                <div className="d-flex align-items-center">
                  <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                  <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                    {joiningDateErrmsg}
                  </label>
                </div>
              )}
            </Col>

            <Col md={6}>
              <Form.Group controlId="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Booking Date {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>


                <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                  <DatePicker
                    ref={bookingDateRef}
                    style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={bookingDate ? dayjs(bookingDate) : null}
                    onChange={(date) => {
                      setDateError("");
                      setBookingDate(date ? date.toDate() : null);
                      setBookingDateErrmsg('');
                    }}
                    disabledDate={(current) => {
                      return current && current > dayjs().endOf('day');
                    }}
                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}

                  />
                </div>
              </Form.Group>
              {dateError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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

              {bookingDateErrmsg.trim() !== "" && (
                <div className="d-flex align-items-center">
                  <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                  <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                    {bookingDateErrmsg}
                  </label>
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
                  Booking Amount {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <FormControl
                  type="text"
                  ref={amountRef}
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
                  <MdError style={{ marginRight: "5px", fontSize: "13px", marginBottom: "1px" }} />
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




        </Modal.Body>



        {state.createAccount?.networkError ?
          <div className='d-flex  align-items-center justify-content-center mt-2 mb-0'>
            <MdError style={{ color: "red", marginRight: '5px' }} />
            <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
          </div>
          : null}

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


        <Modal.Footer
          className="d-flex align-items-center justify-content-center"
          style={{ border: "none" }}
        >
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
              fontFamily: "Gilroy", marginTop: 20
            }}
            onClick={handleSubmit}
          >
            Add Booking
          </Button>
        </Modal.Footer>
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

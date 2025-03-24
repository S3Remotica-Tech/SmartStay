/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import imageCompression from "browser-image-compression";
import Image from "react-bootstrap/Image";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import {CloseCircle} from "iconsax-react";
import "flatpickr/dist/themes/material_blue.css";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import { DatePicker } from "antd";
import dayjs from "dayjs";

function AddCustomer({ show, handleClosing, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [RoomRent, setRoomRent] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomRentError, setRoomRentError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [dateError, setDateError] = useState("");
  const countryCode = "91"
  const [emailError, setEmailError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      handleClosing();
      setFirstname("");
      setLastname("");
      setAddress("");
      setPhone("");
      setEmail("");
      setFile("");
    }
  }, [state.UsersList?.statusCodeForAddUser]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      setFirstname("");
      setLastname("");
      setAddress("");
      setPhone("");
      setEmail("");
      setFile(null);
      setRoomRent("");
      setAdvanceAmount("");
      handleClosing();
    }
  }, [state.UsersList?.statusCodeForAddUser]);

  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);

  const handleFirstName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(value)) {
      return;
    }
    setFirstNameError("");
    if (value === "") {
      setFirstname(value);
     
      return;
    }

    if (value.trim() !== "") {
      setFirstname(value);
     
    }
  };

  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }

    if (value === "") {
      setLastname(value);
     
      return;
    }

    if (value.trim() !== "") {
      setLastname(value);
    }
  };

  // const handlePhone = (e) => {
  //   setPhoneError("");
  //   dispatch({ type: "CLEAR_PHONE_ERROR" });
  //   const value = e.target.value;
  //   if (/^\d*$/.test(value) && value.length <= 10) {
  //     setPhone(value);
  //   }
  // };
  // const handlePhone = (e) => {
  //   const input = e.target.value.replace(/\D/g, ""); 
  //   setPhone(input);
  
  //   if (input.length === 0) {
  //     setPhoneError("Phone Number is Required");
  //   } else if (input.length < 10) {
  //     setPhoneError("Invalid Mobile Number");
  //   } else if (input.length === 10) {
  //     setPhoneError(""); // Valid input
  //   }
  
  //   dispatch({ type: "CLEAR_PHONE_ERROR" });
  // };
  
  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Only digits
    setPhone(input);
  
    if (input.length === 0) {
      setPhoneError("Phone Number is Required");
    } else if (input.length < 10) {
      setPhoneError("Invalid Mobile Number");
    } else {
      setPhoneError(""); // Clear error on valid input
    }
  
    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };
  
  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  //   setGeneralError("");
  //   setCountryCodeError("");
  // };

  // const handleEmail = (e) => {
  //   const email = e.target.value;
  //   setEmail(email);
  //   dispatch({ type: "CLEAR_EMAIL_ERROR" });
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   const isValidEmail = emailRegex.test(email);

  //   if (isValidEmail) {
  //     setEmailError("");
  //   } else {
  //     setEmailError("Invalid Email Id *");
  //   }

  //   if (!email) {
  //     setEmailError("");
  //   }
  // };


  const handleEmail = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setEmailError("");
    } 
    else if (!isValidEmail) {
      setEmailError("Invalid Email ID");
    } else {
      setEmailError("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const calendarRef = useRef(null);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: selectedDate || new Date(),
    maxDate: "today",
  };

  // const handleDateChange = (selectedDates) => {
  //   setSelectedDate(selectedDates[0]);
  //   setGeneralError("");
  //   setDateError("");
  // };

  const handleAddress = (e) => {
    const value = e.target.value;
    setAddressError("");
    if (value === "") {
      setAddress(value);
      return;
    }
    if (value.trim() !== "") {
      setAddress(value);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
      };
      imageCompression(file, options)
        .then((compressedFile) => {
          setFile(compressedFile);
        })
       .catch(() => {});
    }
  };

  const handleAddCustomerDetails = () => {
    let hasError = false;
    const Hostel_Id = currentItem.room.Hostel_Id;
    const Floor_Id = currentItem.room.Floor_Id;
    const Room_Id = currentItem.room.Room_Id;
    const Bed_Id = currentItem.bed.id;

    const filterData_Hostel_Name = state.UsersList?.hostelListNewDetails?.data?.filter((view) => {
      return view.id === Hostel_Id;
    });

    // if (
    //   !firstname &&
    //   !phone &&
    //   !AdvanceAmount &&
    //   !RoomRent &&
    //   !address &&
    //   !selectedDate
    // ) {
    //   setGeneralError("Please fill in all the required fields.");
    //   return;
    // }

    if (!firstname) {
      setFirstNameError("Please Enter First Name");
      // return;
      hasError = true;
    
    }

    if (!countryCode) {
      setCountryCodeError("Please Enter Country Code");
      // return;
      hasError = true;
    }

    if (!phone) {
      setPhoneError("Please Enter Phone Number");
      hasError = true;
    } else if (phone.length < 10) {
      setPhoneError("Phone Enter Valid Mobile No");
      hasError = true;
    } else {
      setPhoneError(""); // Clear if valid
    }
    if (!address) {
      setAddressError("Please Enter Address");
      // return;
      hasError = true;
    }

    if (!selectedDate) {
      setDateError("Please Select a Date");
      // return;
      hasError = true;
    }

    if (!AdvanceAmount) {
      setAdvanceAmountError("Please Enter Advance Amount");
      // return;
      hasError = true;
    }

    if (!RoomRent) {
      setRoomRentError("Please Enter a Valid Rental Amount");
      // return;
      hasError = true;
    }

    

    
    if (email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter Valid Email ID");
        hasError = true;
      } else {
        setEmailError("");
      }
    } else {
      setEmailError(""); 
    }
    if (hasError) return;

    if (isNaN(AdvanceAmount) || AdvanceAmount <= 0) {
      setAdvanceAmountError("Please enter a Valid Advance Amount");
      return;
    }

    if (isNaN(RoomRent) || RoomRent <= 0) {
      setRoomRentError("Please enter a valid Rental Amount");
      return;
    }
    const mobileNumber = `${countryCode}${phone}`;

    let formattedSelectedDate;

    if (selectedDate instanceof Date && !isNaN(selectedDate)) {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      formattedSelectedDate = `${year}/${month}/${day}`;
    } else {
      setDateError("Invalid date");
      return;
    }

    if (
      firstname &&
      phone &&
      AdvanceAmount &&
      RoomRent &&
      address &&
      countryCode &&
      selectedDate
    ) {
      dispatch({
        type: "ADDUSER",
        payload: {
          profile: file,
          firstname: firstname,
          lastname: lastname,
          Phone: mobileNumber,
          Email: email,
          hostel_Id: Hostel_Id,
          Floor: Floor_Id,
          Rooms: Room_Id,
          Bed: Bed_Id,
          Address: address,
          HostelName: filterData_Hostel_Name[0]?.Name,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          joining_date: formattedSelectedDate,
        },
      });
    } 
  };

  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    if (!/^\d*$/.test(roomRentValue)) {
      return; 
    }
    // handleInputChange()
    setRoomRent(roomRentValue);
    setRoomRentError("");
  };

  const handleAdvanceAmount = (e) => {
    // handleInputChange()
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return; 
    }
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
  };


  const customDateInput = (props) => {
    return (
        <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
            <FormControl
                type="text"
                className='date_input'
                value={props.value || 'DD/MM/YYYY'}
                readOnly
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
                style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }} 
                alt="Calendar" 
                onClick={props.onClick} 
            />
        </div>
    );
};

  return (
    <div>
      <Modal show={show} onHide={handleClosing} centered backdrop="static">
        <Modal.Dialog
          style={{
            maxWidth: 950,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body>
            <div className="d-flex align-items-center">
              <div>
                <Modal.Header
                  style={{ marginBottom: "30px", position: "relative" }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Add an customer
                  </div>
                  <CloseCircle size="24" color="#000" onClick={handleClosing} style={{cursor:"pointer"}}/>
                </Modal.Header>

                <div className="d-flex align-items-center">
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
                          : Profile
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

                <div className="row mt-4">
                  {/* {generalError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px" }} />
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
                  )} */}

                  {state.UsersList.phoneError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {state.UsersList.phoneError}
                      </label>
                    </div>
                  )}

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group>
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        First Name{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>
                      <FormControl
                        id="form-controls"
                        placeholder="Enter First Name"
                        type="text"
                        value={firstname}
                        onChange={(e) => handleFirstName(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: firstname ? 600 : 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>
                    {firstNameError && (
                      <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px" }} />
                        <label
                          className="mb-6"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginTop: "2px"
                          }}
                        >
                          {firstNameError}
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Last Name{" "}
                        
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Last Name"
                        value={lastname}
                        onChange={(e) => handleLastName(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: lastname ? 600 : 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop:6
                        }}
                      />
                    </Form.Group>
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group
                      className="mb-3"
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
                        Mobile No{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
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
                          }}
                        >
                        <option>+{countryCode}</option>
                        </Form.Select>
                        <Form.Control
                          value={phone}
                          onChange={(e) => handlePhone(e)}
                          type="text"
                          placeholder="9876543210"
                          maxLength={10}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: phone ? 600 : 500,
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
                    </Form.Group>

                    {phoneError && (
                      <div className="d-flex align-items-center p-1">
                        <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px",marginTop:"-12px" }} />
                        <label
                          className=""
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginTop:"-13px"
                          }}
                        >
                          {phoneError}
                        </label>
                      </div>
                    )}

                    {countryCodeError && (
                      <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: "5px",marginTop:"-32px",fontSize:"13px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                             marginTop:"-13px"
                          }}
                        >
                          {countryCodeError}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Email ID{" "}
                       
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Email ID"
                        value={email}
                        onChange={(e) => handleEmail(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: email ? 600 : 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop:6
                        }}
                      />
                    </Form.Group>

                    {emailError && (
                      <div className="d-flex align-items-center p-1" style={{marginTop:"-15px"}}>
                        <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {emailError}
                        </label>
                      </div>
                    )}
                    {state.UsersList.emailError && (
                      <div className="d-flex align-items-center p-1">
                        <MdError style={{ color: "red", marginRight: "5px",fontSize:"13px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {state.UsersList.emailError}
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-1">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Address{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={address}
                        placeholder="Enter Address"
                        onChange={(e) => handleAddress(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: address ? 600 : 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>

                    {addressError && (
                      <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize:"13px",marginBottom:"2px" }} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {addressError}
                        </label>
                      </div>
                    )}
                  </div>

                 
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-1" controlId="purchaseDate">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                    Joining Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </Form.Label>
                {/* <div style={{ position: 'relative', width: "100%" }}>
                    <DatePicker
                        selected={selectedDate}
                        onChange={(date) => {
                            setDateError('');
                            setSelectedDate(date);
                        }}
                        dateFormat="dd/MM/yyyy"
                        minDate={null}
                        maxDate={null} 
                        customInput={customDateInput({
                            value: selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                                ? selectedDate.toLocaleDateString('en-GB')
                                : '', 
                        })}
                    />
                </div> */}

                 <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                  <DatePicker
                    style={{ width: "100%", height: 48 }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date) => {
                      setDateError('');
                      setSelectedDate(date ? date.toDate() : null);
                    }}
                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                  />
                </div>
            </Form.Group>

            {dateError && (
                <div>
                   <MdError style={{ color: "red", marginRight: "5px", fontSize:"13px",marginBottom:"2px"}} />
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

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-1">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Advance Amount{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Amount"
                        value={AdvanceAmount}
                        onChange={(e) => handleAdvanceAmount(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: AdvanceAmount ? 600 : 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>

                    {advanceAmountError && (
                      <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize:"13px",marginBottom:"2px"}} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {advanceAmountError}
                        </label>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-1">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Rental Amount{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Amount"
                        value={RoomRent}
                        onChange={(e) => handleRoomRent(e)}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: RoomRent ? 600 : 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                        }}
                      />
                    </Form.Group>
                    {roomRentError && (
                      <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: "5px", fontSize:"13px",marginBottom:"2px"}} />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {roomRentError}
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleAddCustomerDetails}
                  className=" col-lg-12 col-md-12 col-sm-12 col-xs-12"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 600,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    marginTop: 20,
                    padding: 12,
                  }}
                >
                  Add an customer
                </Button>
              </div>
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

AddCustomer.propTypes = {
  currentItem: PropTypes.func.isRequired,
  handleClosing: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  
};
export default AddCustomer;

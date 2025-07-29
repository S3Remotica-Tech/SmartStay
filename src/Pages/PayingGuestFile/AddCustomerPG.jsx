/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import imageCompression from "browser-image-compression";
import Image from "react-bootstrap/Image";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import { CloseCircle } from "iconsax-react";
import "flatpickr/dist/themes/material_blue.css";
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Select from "react-select";

import addcircle from "../../Assets/Images/New_images/add-circle.png";
import { Trash } from 'iconsax-react';

function AddCustomer({ setShowAddCustomer, show, currentItem, onclickdata }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("")
  const [state_name, setStateName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [file, setFile] = useState(null);
  const [RoomRent, setRoomRent] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomRentError, setRoomRentError] = useState("");
  const [dateError, setDateError] = useState("");
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const countryCode = "91"
  const [emailError, setEmailError] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
  const [formLoading, setFormLoading] = useState(false)


  const firstnameRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);
  const dateRef = useRef(null);
  const advanceAmountRef = useRef(null);
  const roomRentRef = useRef(null);
  const emailRef = useRef(null);

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
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      handleCloseAddCustomer();
      setFormLoading(false);
      setFirstname("");
      setLastname("");
      setPhone("");
      setEmail("");
      setFile(null);
      setRoomRent("");
      setAdvanceAmount("");
      setJoingDateErrmsg("")
    }
  }, [state.UsersList?.statusCodeForAddUser]);


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


  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setPhone(input);

    if (input.length === 0) {
      setPhoneError("Please Enter Mobile No");
    } else if (input.length < 10) {
      setPhoneError("Please Enter Valid Mobile No");
    } else {
      setPhoneError("");
    }

    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };



  const handleEmail = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setEmailError("");
    }
    else if (!isValidEmail) {
      setEmailError("Please Enter Valid Email ID");
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
      return;
    } else {
      setPincodeError("");
    }

  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setCityError("");

  }


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
        .catch(() => { });
    }
  };

  const handleCloseAddCustomer = () => {
    setShowAddCustomer(false)
  }







  const handleAddCustomerDetails = () => {
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    let hasError = false;
    let firstInvalidRef = null;
    const Hostel_Id = currentItem.room.Hostel_Id;
    const Floor_Id = currentItem.room.Floor_Id;
    const Room_Id = currentItem.room.Room_Id;
    const Bed_Id = currentItem.bed.id;

    const filterData_Hostel_Name = state.UsersList?.hostelListNewDetails?.data?.filter((view) => {
      return view.id === Hostel_Id;
    });

    if (!firstname) {
      setFirstNameError("Please Enter First Name");
      hasError = true;
      if (!firstInvalidRef) firstInvalidRef = firstnameRef;
    }


    if (!phone) {
      setPhoneError("Please Enter Phone Number");
      hasError = true;
      if (!firstInvalidRef) firstInvalidRef = phoneRef;
    } else if (phone.length < 10) {
      setPhoneError("Please Enter Valid Mobile No");
      hasError = true;
      if (!firstInvalidRef) firstInvalidRef = phoneRef;
    } else {
      setPhoneError("");
    }
    if (pincode && pincode.length < 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
      hasError = true;
      if (!firstInvalidRef) firstInvalidRef = pincodeRef;
    } else {
      setPincodeError("");
    }


    if (!selectedDate) {
      setDateError("Please Select a Date");
      hasError = true;
      if (!firstInvalidRef) firstInvalidRef = dateRef;
    }



    if (!AdvanceAmount) {
      setAdvanceAmountError("Please Enter Advance Amount");
      hasError = true;
      if (!firstInvalidRef) firstInvalidRef = advanceAmountRef;
    }

    if (!RoomRent) {
      setRoomRentError("Please Enter  Valid Rental Amount");
      hasError = true;
      if (!firstInvalidRef) firstInvalidRef = roomRentRef;
    }




    if (email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter Valid Email ID");
        hasError = true;
        if (!firstInvalidRef) firstInvalidRef = emailRef;
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
    if (firstInvalidRef && firstInvalidRef.current) {
      firstInvalidRef.current.focus();
    }

    if (isNaN(AdvanceAmount) || AdvanceAmount <= 0) {
      setAdvanceAmountError("Please Enter  Valid Advance Amount");
      return;
    }

    if (isNaN(RoomRent) || RoomRent <= 0) {
      setRoomRentError("Please Enter  Valid Rental Amount");
      return;
    }

    if (hasError) return;



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

     const formattedReasons = fields.map((item) => {
        let reason_name = "";

        if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
          reason_name = item.customReason || item["custom Reason"] || "";
        } else {
          reason_name = item.reason || item.reason_name || "";
        }

        return {
          reason_name,
          amount: item.amount || "",
          showInput: !!item.showInput
        };
      });







    if (
      firstname &&
      phone &&
      AdvanceAmount &&
      RoomRent &&
      countryCode &&
      selectedDate
    ) {


      const data = {
        profile: file,
        firstname: firstname,
        lastname: lastname,
        phone: mobileNumber,
        countryCode: countryCode,
        Email: email,
        Hostel_Id: Hostel_Id,
        Floor: Floor_Id,
        Rooms: Room_Id,
        Bed: Bed_Id,
        HostelName: filterData_Hostel_Name[0]?.Name,
        Address: house_no,
        area: street,
        landmark: landmark,
        city: city,
        pincode: pincode,
        state: state_name,
        selectedDate: selectedDate,
        AdvanceAmount: AdvanceAmount,
        RoomRent: RoomRent,
        joining_date: formattedSelectedDate,
        reason: formattedReasons
      }





      onclickdata(data)
      setShowAddCustomer(false)




    }
  };
  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    if (!/^\d*$/.test(roomRentValue)) {
      return;
    }
    setRoomRent(roomRentValue);
    setRoomRentError("");
  };

  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return;
    }
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
  };


  useEffect(() => {
    if (state.UsersList.phoneError || state.UsersList.emailError) {
      setFormLoading(false)
    }

  }, [state.UsersList.phoneError, state.UsersList.emailError])

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])
  
  const [fields, setFields] = useState([]);
 


  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];



  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...fields];

    if (field === "reason") {
      if (value === "others") {
        updatedFields[index].showInput = true;
        updatedFields[index].reason_name = "others";
        updatedFields[index].customReason = "";
      } else {
        updatedFields[index].showInput = false;
        updatedFields[index].reason = value;
        updatedFields[index].customReason = "";
      }
    } else if (field === "customReason") {
      updatedFields[index].customReason = value;
    } else {
      updatedFields[index][field] = value;
    }

    setFields(updatedFields);
  };


 const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };






  return (
    <>
      <div
        className="modal show"
        style={{
          display: "block",
          position: "initial",
          fontFamily: "Gilroy,sans-serif",
        }}
      >
        <Modal show={show} onHide={handleCloseAddCustomer} centered backdrop="static" dialogClassName="custom-modals-style" >

          <Modal.Dialog
            style={{
              minWidth: 550,

              borderRadius: "30px",
            }}
            className="m-0 p-0"
          >
            <Modal.Header
              style={{ marginBottom: "10px", position: "relative" }}
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
              <CloseCircle size="24" color="#000" onClick={handleCloseAddCustomer} style={{ cursor: "pointer" }} />
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "380px", overflowY: "scroll" }} className="show-scroll pt-1 me-3">
              <div className="d-flex align-items-center">
                <div>


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

                    {state.UsersList.phoneError && (
                      <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: 5, fontSize: "14px" }} />
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
                      <Form.Group className="mb-0">
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
                          ref={firstnameRef}
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
                          <MdError style={{ color: "red", marginRight: 5, fontSize: "14px" }} />
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
                      <Form.Group className="mb-0">
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
                            marginTop: 6
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
                            ref={phoneRef}
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
                          <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px", marginTop: "-12px" }} />
                          <label
                            className=""
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              marginTop: "-13px"
                            }}
                          >
                            {phoneError}
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
                          ref={emailRef}
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
                            marginTop: 6
                          }}
                        />
                      </Form.Group>

                      {emailError && (
                        <div className="d-flex align-items-center p-1" style={{ marginTop: "-15px" }}>
                          <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
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
                          <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
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



                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                      <Form.Group className="mb-1">
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
                          <MdError style={{ fontFamily: "Gilroy", fontSize: '14px', marginRight: "5px", marginBottom: "1px" }} />
                          <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                      <Form.Group className="mb-1">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Area , Street , Sector , Village{" "}
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
                          <MdError style={{ fontFamily: "Gilroy", fontSize: '14px', marginRight: "5px", marginBottom: "1px" }} />
                          <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                      <Form.Group className="mb-1">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Landmark{" "}
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
                          <MdError style={{ fontFamily: "Gilroy", fontSize: '14px', marginRight: "5px", marginBottom: "1px" }} />
                          <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
                        </div>
                      )}
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <Form.Group

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
                          Pincode{" "}

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
                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px", marginBottom: "2px" }} />
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
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                      <Form.Group>
                        <Form.Label
                          style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          Town/City{" "}

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
                          <MdError style={{ fontSize: '14px', marginRight: "5px" }} />
                          <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                        </div>
                      )}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <Form.Group controlId="exampleForm.ControlInput5">
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
                          State{" "}

                        </Form.Label>

                        <Select
                          ref={stateRef}
                          options={indianStates}
                          onChange={(selectedOption) => {
                            setStateName(selectedOption?.value);
                            setStateNameError("")
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
                          <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
                          <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state_nameError}
                          </span>
                        </div>
                      )}
                    </div>


                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                      <Form.Group controlId="purchaseDate">
                        <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                          Joining Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>


                        <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                          {/* <DatePicker
                          ref={dateRef}
                          style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={selectedDate ? dayjs(selectedDate) : null}
                          onChange={(date) => {
                            setDateError('');
                            setSelectedDate(date ? date.toDate() : null);
                            setJoingDateErrmsg("")
                          }}
                          getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}

                        /> */}

                          <DatePicker
                            ref={dateRef}
                            style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy" }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            value={selectedDate ? dayjs(selectedDate) : null}
                            onChange={(date) => {
                              setDateError('');
                              setSelectedDate(date ? date.toDate() : null);
                              setJoingDateErrmsg("");
                            }}
                            disabledDate={(current) => {
                              return current && current > dayjs().endOf('day');
                            }}
                            getPopupContainer={(triggerNode) =>
                              triggerNode.closest('.datepicker-wrapper')
                            }
                          />
                        </div>
                      </Form.Group>

                      {dateError && (
                        <div>
                          <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px", marginBottom: "2px" }} />
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

                      {joiningDateErrmsg.trim() !== "" && (
                        <div className="d-flex align-items-center">
                          <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                          <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {joiningDateErrmsg}
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="row align-items-end ms-1 me-1" style={{ paddingRight: 5, paddingLeft: 0 }}>
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group >
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
                            ref={advanceAmountRef}
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
                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px", marginBottom: "2px" }} />
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
                        <Form.Group >
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
                            ref={roomRentRef}
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
                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px", marginBottom: "2px" }} />
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



                    <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5, }} className="mt-3 mb-3 me-5 ms-2">

                      <div className="d-flex justify-content-between align-items-center p-4">
                        <div>
                          <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                        </div>
                        <div>
                          <Button
                            onClick={handleAddField}
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "14px",
                              backgroundColor: "#1E45E1",
                              color: "white",
                              fontWeight: 600,
                              borderRadius: "10px",
                              padding: "6px 15px",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <img
                              src={addcircle}
                              alt="Assign Bed"
                              style={{
                                height: 16,
                                width: 16,
                                filter: "brightness(0) invert(1)",
                              }}
                            />
                            Add
                          </Button>

                        </div>
                      </div>


                      {fields.map((item, index) => {


                        return (
                          <div className="row px-4 mb-3" key={index}>
                            <div className="col-md-5">


                              {!item.showInput ? (
                                <Select
                                  options={reasonOptions}
                                  value={reasonOptions.find((opt) => opt.value === item.reason) || null}
                                  onChange={(selectedOption) => {
                                    const selectedValue = selectedOption.value;

                                    if (selectedValue === "others") {
                                      handleInputChange(index, "reason", "others");
                                    } else {
                                      handleInputChange(index, "reason", selectedValue);
                                    }
                                  }}
                                  isDisabled={item.reason === "maintenance"}
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
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom reason"
                                    value={item.customReason}
                                    onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
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
                                </>
                              )}
                            </div>


                            <div className="col-md-5">

                              <input
                                type="text"
                                placeholder="Enter amount"
                                value={item.amount}
                                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                className="form-control"
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
                            </div>


                            <div className="col-md-2 d-flex justify-content-center align-items-center">

                              {index !== 0 && (
                                <Trash
                                  size="20"
                                  color="red"
                                  variant="Bold"
                                  style={{ cursor: "pointer" }}
                                  onClick={() => handleRemoveField(index)}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}




                    </div>












                  </div>









                </div>
              </div>
            </Modal.Body>

            {state.createAccount?.networkError ? <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
              <MdError style={{ color: "red", marginRight: '5px', fontPalette: 14 }} />
              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
            </div>
              : null}


            {formLoading && <div
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
            <Modal.Footer style={{ border: "none" }}>
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
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>



    </>
  );
}

AddCustomer.propTypes = {
  currentItem: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setShowAddCustomer: PropTypes.func.isRequired,
  onclickdata: PropTypes.func.isRequired,

};
export default AddCustomer;

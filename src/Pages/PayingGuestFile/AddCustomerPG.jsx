/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
// import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import imageCompression from "browser-image-compression";
import Image from "react-bootstrap/Image";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { CloseCircle } from "iconsax-react";
import Flipbackward from "../../Assets/Images/flip-backward.png";
import FlipbackwardBlue from "../../Assets/Images/flip-backwardblue.png";
import Store_Icon from "../../Assets/Images/store_icon.png";

function AddCustomer({  show, handleClose   }) {
    const [file, setFile] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [Phone, setPhone] = useState("");
    const [hostel_Id, setHostel_Id] = useState("");
    const [HostelName, setHostelName] = useState("");

    const [Email, setEmail] = useState("");
    const [house_no, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("");
    const [state_name, setStateName] = useState("");
    const [firstnameError, setFirstnameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [phonenumError, setphonenumError] = useState("");
    const [emailIdError, setemailIdError] = useState("");
    const [house_noError, setHouse_NoError] = useState("");
    const [streetError, setStreetError] = useState("");
    const [landmarkError, setLandmarkError] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [cityError, setCityError] = useState("");
    const [state_nameError, setStateNameError] = useState("");
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const countryCode = "91";
    const firstnameRef = useRef(null);
    const phoneRef = useRef(null);
    const cityRef = useRef(null);
    const pincodeRef = useRef(null);
    const stateRef = useRef(null);
  
  
    
  
  
  
  
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
      { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands",},
      { value: "Chandigarh", label: "Chandigarh" },
      { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu"},
      { value: "Delhi", label: "Delhi" },
      { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
      { value: "Ladakh", label: "Ladakh" },
      { value: "Lakshadweep", label: "Lakshadweep" },
      { value: "Puducherry", label: "Puducherry" },
    ];
  
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
  
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
      dispatch({
        type: "HOSTELDETAILLIST",
        payload: { hostel_Id: state.login.selectedHostel_Id },
      });
    }, [hostel_Id]);

  
    const handleFirstName = (e) => {
      const value = e.target.value;
      const pattern = /^[a-zA-Z\s]*$/;
      if (!pattern.test(value)) {
        return;
      }
      setFirstname(value);
      setFirstnameError("");
    };
  
    useEffect(() => {
      if (state.UsersList.phoneError) {
        setphonenumError(state.UsersList.phoneError);
      }
    }, [state.UsersList.phoneError]);
  
    useEffect(() => {
      if (state.UsersList.emailError) {
        setemailIdError(state.UsersList.emailError);
      }
    }, [state.UsersList.emailError]);
  
  
  
  
    const handleLastName = (e) => {
      const value = e.target.value;
      const pattern = /^[a-zA-Z\s]*$/;
  
      if (!pattern.test(value)) {
        return;
      }
      setLastname(value);
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
  
      setPhoneErrorMessage("");
      dispatch({ type: "CLEAR_PHONE_ERROR" });
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
        setEmailError("Please Enter  Valid Email Id");
      } else {
        setEmailError("");
        setEmailErrorMessage("");
      }
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
    };
  
    useEffect(() => {
      const selectedHostel =
        state.UsersList.hostelListNewDetails.data &&
        state.UsersList.hostelListNewDetails.data?.filter(
          (item) => item.id === state.login.selectedHostel_Id
        );
      setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
      setHostel_Id(state.login.selectedHostel_Id);
    }, []);
  
  
  
  

  
    const handleHouseNo = (e) => {
      setHouseNo(e.target.value);
      setHouse_NoError("");
    };
  
    const handleStreetName = (e) => {
      setStreet(e.target.value);
      setStreetError("");
    };
  
    const handleLandmark = (e) => {
      setLandmark(e.target.value);
      setLandmarkError("");
    };
  
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
    };
  
 
    
  
    const MobileNumber = `${countryCode}${Phone}`;
  
    const validateField = (value, fieldName, ref, setError, focusedRef) => {
      const trimmedValue = String(value).trim();
      if (!trimmedValue) {
        switch (fieldName) {
          case "First Name":
            setError("Please Enter First Name");
            break;
          case "Phone Number":
            setError("Please Enter Phone Number");
            break;
          case "Email":
            setError("Please Enter Email Id");
            break;
          case "Hostel ID":
            setError("Please Select PG");
            break;
  
          default:
            break;
        }
  
        if (!focusedRef.current && ref?.current) {
          ref.current.focus();
          focusedRef.current = true;
        }
        return false;
      }
  
      setError("");
      return true;
    };
  
  
  
  
    const handleSaveUserlist = () => {
      dispatch({ type: "CLEAR_PHONE_ERROR" });
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      let hasError = false;
      const focusedRef = { current: false };
  
      if (!validateField(firstname, "First Name", firstnameRef, setFirstnameError, focusedRef)) hasError = true;
      if (!validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)) hasError = true;
  
  
      
      if (Phone && Phone.length !== 10) {
        setPhoneError("Please Enter Valid Mobile Number");
        if (!focusedRef.current && phoneRef?.current) {
          phoneRef.current.focus();
          focusedRef.current = true;
        }
        hasError = true;
      } else if (Phone) {
        setPhoneError("");
        setPhoneErrorMessage("");
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
          setEmailError("Please Enter Valid Email ID");
          if (!focusedRef.current) {
            focusedRef.current = true;
          }
          hasError = true;
        }
        else {
          setEmailError("");
        }
      } else {
        setEmailError("");
      }
  
      if (hasError) return;
      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };
  
      const capitalizedFirstname = capitalizeFirstLetter(firstname);
      const capitalizedLastname = capitalizeFirstLetter(lastname);
    
      const payload = {
        profile: file,
        firstname: capitalizedFirstname,
        lastname: capitalizedLastname,
        Phone: MobileNumber,
        Email: Email,
        HostelName: HostelName,
        hostel_Id: hostel_Id,
        Address: house_no,
        area: street,
        landmark: landmark,
        city: city,
        pincode: pincode,
        state: state_name,
      };
  
      
  
      dispatch({
        type: "ADDUSER",
        payload: payload,
      });
    
    };
  

  
  
  
  
    useEffect(() => {
      if (state.UsersList?.statusCodeForAddUser === 200) {
        handleClose(); 
      }
    }, [state.UsersList?.statusCodeForAddUser]);
  

  
    useEffect(() => {
      if (state.createAccount?.networkError) {
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        }, 3000)
      }
  
    }, [state.createAccount?.networkError])
     
  
 
  
  
      const [step, setStep] = useState(1);
   
   
  
    const handleNext = () => {
          let hasError = false;
      const focusedRef = { current: false };
         if (!validateField(firstname, "First Name", firstnameRef, setFirstnameError, focusedRef)) hasError = true;
         if (!validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)) hasError = true;
          if (Phone && Phone.length !== 10) {
        setPhoneError("Please Enter Valid Mobile Number");
        if (!focusedRef.current && phoneRef?.current) {
          phoneRef.current.focus();
          focusedRef.current = true;
        }
        hasError = true;
      } else if (Phone) {
        setPhoneError("");
        setPhoneErrorMessage("");
      }
  
      if (Email) {
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
        const isValidEmail = emailRegex.test(Email.toLowerCase());
        if (!isValidEmail) {
          setEmailError("Please Enter Valid Email ID");
          if (!focusedRef.current) {
            focusedRef.current = true;
          }
          hasError = true;
        }
        else {
          setEmailError("");
        }
      } else {
        setEmailError("");
      }
        if(hasError){
       return
        }
       setStep(2);
      
    };
  
  
  
    const handlePrevious = () => {
      setStep(1);
    };
  
    const handleCreateCustomer = () => {
     
    
      dispatch({ type: "CLEAR_PHONE_ERROR" });
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      let hasError = false;
      const focusedRef = { current: false };
  
     
  
      if (pincode && pincode.length !== 6) {
        setPincodeError("Pin Code Must Be Exactly 6 Digits");
        if (!focusedRef.current && pincodeRef?.current) {
          pincodeRef.current.focus();
          focusedRef.current = true;
        }
        hasError = true;
      }
  
      
  
      if (hasError) return;
      const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      };
  
      const capitalizedFirstname = capitalizeFirstLetter(firstname);
      const capitalizedLastname = capitalizeFirstLetter(lastname);
      const payload = {
        profile: file,
        firstname: capitalizedFirstname,
        lastname: capitalizedLastname,
        Phone: MobileNumber,
        Email: Email,
        HostelName: HostelName,
        hostel_Id: hostel_Id,
        Address: house_no,
        area: street,
        landmark: landmark,
        city: city,
        pincode: pincode,
        state: state_name,
      };
  
  
      dispatch({
        type: "ADDUSER",
        payload: payload,
      });
      
    
    };



  return (
    <>
      <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      dialogClassName="custom-modal custom-modal-width"
    >
      <Modal.Dialog
         style={{
                maxWidth: 1100,
                paddingRight: "10px",
                borderRadius: "30px",
                marginTop:'-40px',
                marginBottom:'100px'
              }}
              className="m-0 p-0"
      >
        <Modal.Body className="p-0 " >
          <div  style={{  overflowY: "auto" ,   }} className="d-flex justify-content-center  show-scroll-user p-2 mt-2 me-3">
            <div
              className="p-4"
              style={{
                width: '280px',
                minWidth:'240px',
                backgroundColor: '#f4f8ff',
                borderTopLeftRadius: '20px',
                borderBottomLeftRadius: '20px',
              }}
            >
              <h5 className="mb-4">Add New Customer</h5>
              <div className="d-flex align-items-center mb-3">
                <div className=" text-white rounded-circle d-flex justify-content-center align-items-center" style={{ width: '30px', height: '30px' , backgroundColor:'rgba(30, 69, 225, 1)' }}><img src={Store_Icon} alt="storeicon" height={15} width={15}/> </div>
                <span className="ms-2" style={{fontFamily: "Gilroy",fontSize: "14px"}}>Step 1<br /><small>Basic Details</small></span>
              </div>
    <div className="d-flex align-items-center">
      <div
        className="rounded-circle d-flex justify-content-center align-items-center"
        style={{
          width: '30px',
          height: '30px',
          backgroundColor: step === 2 ? 'rgba(30, 69, 225, 1)' : '#ffffff',
          border:  '1px solid rgba(30, 69, 225, 1) ' ,
        }}
      >
        <img src={step === 2 ? Flipbackward: FlipbackwardBlue } alt="Flipbackwardicon" height={15} width={15} />
      </div>
      <span className="ms-2" style={{ fontFamily: 'Gilroy', fontSize: '14px' }}>
        Step 2<br />
        <small>Address Details</small>
      </span>
    </div>
    
    
            </div>
    
            <div
              className="flex-grow-1 position-relative"
              style={{
                backgroundColor: '#fff',
                borderTopRightRadius: '20px',
                borderBottomRightRadius: '20px',
                overflowY: 'auto',
                padding: '24px',
              }}
            >
          
    
               <div
            className="d-flex justify-content-between align-items-start px-4 py-3"
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 10,
              backgroundColor: '#fff',
              borderBottom: '1px solid #eee',
            }}
          >
            <h5 style={{ fontFamily: 'Gilroy', fontWeight: 600 }}>
              {step === 1 ? "Basic Details" : "Address Details"}
            </h5>
            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: 'pointer' }} />
          </div>
                  <div className="" style={{overflowY:'auto' , maxHeight: "440px",overflowX:'hidden'}}>
                  {step === 1 && (
                    <>
                      <div className="row">
                         <div className="d-flex flex-column">
    
          <div className="d-flex align-items-center mt-1">
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
    
                        <div className="row mt-4">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                            <Form.Group className="mb-1">
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
                                  {" "}
                                  *{" "}
                                </span>
                              </Form.Label>
                              <FormControl
                                id="form-controls"
                                placeholder="Enter First Name"
                                type="text"
                                ref={firstnameRef}
                                value={firstname}
                                onChange={(e) => handleFirstName(e)}
                                style={{
                                  fontSize: 16,
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {firstnameError && (
                              <div style={{ color: "red", marginTop: "-5px" }}>
                                {" "}
                                <MdError
                                  style={{ fontSize: "13px", marginBottom: "2px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                    marginRight: "3px"
                                  }}
                                >
                                  {" "}
                                  {firstnameError}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Form.Group className="mb-1">
                              <Form.Label
                                style={{
                                  marginTop: "10px",
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
                                  fontWeight: 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                          </div>
    
                          <Form.Group
                            className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1"
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
                              Mobile Number{" "}
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
    
                                  borderRadius: "8px 0 0 8px",
                                  height: 40,
                                  fontSize: 16,
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: countryCode ? 600 : 500,
                                  boxShadow: "none",
                                  backgroundColor: "#fff",
                                  maxWidth: 90,
                                  paddingRight: 10,
                                  cursor: "pointer"
                                }}
                              >
                                <option>{countryCode}</option>
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
                                  height: 40,
                                  borderRadius: "0 8px 8px 0",
                                }}
                              />
                            </InputGroup>
                            <p
                              id="MobileNumberError"
                              style={{
                                color: "red",
                                fontSize: 11,
                                marginTop: "-15px",
                              }}
                            ></p>
                            {phoneError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{ fontSize: "13px", marginBottom: "2px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                    marginRight: "3px"
                                  }}
                                >
                                  {" "}
                                  {phoneError}
                                </span>
                              </div>
                            )}
                            {phonenumError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{ marginRight: "4px", fontSize: "13px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {" "}
                                  {phonenumError}
                                </span>
                              </div>
                            )}
                            {phoneErrorMessage && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{ marginRight: "4px", fontSize: "13px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {" "}
                                  {phoneErrorMessage}
                                </span>
                              </div>
                            )}
                          </Form.Group>
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Form.Group className="mb-1">
                              <Form.Label
                                style={{
                                  fontSize: 14,
                                  color: "#222222",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  marginTop: "10px",
                                }}
                              >
                                Email ID{" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter Email ID"
                                value={Email}
                                onChange={(e) => handleEmail(e)}
                                style={{
                                  fontSize: 16,
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                              {emailError && (
                                <div style={{ color: "red" }}>
                                  <MdError />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {" "}
                                    {emailError}
                                  </span>
                                </div>
                              )}
                              {emailIdError && (
                                <div style={{ color: "red" }}>
                                  <MdError />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {emailIdError}
                                  </span>
                                </div>
                              )}
                              {emailErrorMessage && (
                                <div style={{ color: "red" }}>
                                  <MdError />
                                  <span
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {emailErrorMessage}
                                  </span>
                                </div>
                              )}
                            </Form.Group>
                          </div>
    </div>
    
                        </div>
                          {state.createAccount?.networkError ?
                        <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                          <MdError style={{ color: "red", marginRight: '5px' }} />
                          <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                        </div>
                        : null}
                      </div>
                   
                       <div className="d-flex justify-content-end mt-3">
                        <Button style={{  fontFamily: "Gilroy",
        fontSize: "14px",
        backgroundColor: "#1E45E1",
        color: "white",
        fontWeight: 600,
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
        maxHeight: 45,
        width: "146px",
        whiteSpace: "nowrap",}} onClick={handleSaveUserlist}>Save Info</Button>
                          <Button style={{  fontFamily: "Gilroy",
        fontSize: "14px",
        backgroundColor: "white",
        color: "#1E45E1",
        fontWeight: 600,
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
        maxHeight: 45,
        width: "146px",
        whiteSpace: "nowrap",marginLeft:10 ,marginRight:10}} onClick={handleNext}>Next</Button>
                   
                      </div>
                    </>
                  )}
    
                  <div style={{overflowY:'auto' , maxHeight: "440px", overflowX:'hidden'}}>
    
                  {step === 2 && (
                    <>
                      <div className="row mt-2">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                            <Form.Group className="">
                              <Form.Label
                                style={{
                                  fontSize: 14,
                                  color: "#222222",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                }}
                              >
                                Flat , House no , Building , Company , Apartment{" "}
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {house_noError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{
                                    fontFamily: "Gilroy",
                                    fontSize: "13px",
                                    marginRight: "5px",
                                    marginBottom: "1px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {house_noError}
                                </span>
                              </div>
                            )}
                          </div>
    
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                            <Form.Group className="">
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {streetError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{
                                    fontFamily: "Gilroy",
                                    fontSize: "13px",
                                    marginRight: "5px",
                                    marginBottom: "1px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {streetError}
                                </span>
                              </div>
                            )}
                          </div>
    
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                            <Form.Group className="">
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {landmarkError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{
                                    fontFamily: "Gilroy",
                                    fontSize: "13px",
                                    marginRight: "5px",
                                    marginBottom: "1px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {landmarkError}
                                </span>
                              </div>
                            )}
                          </div>
    
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                Pincode
    
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
    
                              {pincodeError && (
                                <div className="d-flex align-items-start gap-1 mb-2" style={{ marginTop: "5px" }}>
                                  <MdError
                                    style={{
                                      color: "red",
                                      fontSize: "13px",
                                      marginTop: "1px",
                                    }}
                                  />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      lineHeight: "16px",
                                    }}
                                  >
                                    {pincodeError}
                                  </label>
                                </div>
                              )}
    
                            </Form.Group>
                          </div>
    
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                            <Form.Group className="">
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {cityError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{ fontSize: "13px", marginRight: "5px", marginBottom: "1px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {cityError}{" "}
                                </span>
                              </div>
                            )}
                          </div>
    
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput5"
                            >
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
                                State
    
                              </Form.Label>
    
                              <Select
                                options={indianStates}
                                ref={stateRef}
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
                                  state_name
                                    ? { value: state_name, label: state_name }
                                    : null
                                }
                                placeholder="Select State"
                                classNamePrefix="custom"
                                menuPlacement="auto"
                                noOptionsMessage={() => "No state available"}
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    height: "40px",
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
                                    backgroundColor: state.isFocused
                                      ? "#f0f0f0"
                                      : "white",
                                    color: "#000",
                                  }),
                                }}
                              />
                            </Form.Group>
    
                            {!state_name && state_nameError && (
                              <div style={{ color: "red", marginTop: "-16px" }}>
                                <MdError
                                  style={{ fontSize: "13px", marginRight: "5px", marginBottom: "1px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {state_nameError}
                                </span>
                              </div>
                            )}
                          </div>
                     
       
    
                      {state.createAccount?.networkError ?
                        <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                          <MdError style={{ color: "red", marginRight: '5px' }} />
                          <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                        </div>
                        : null}
    
                      </div>
                      <div className="d-flex justify-content-end mt-3">
                        <Button style={{  fontFamily: "Gilroy",
        fontSize: "14px",
        backgroundColor: "white",
        color: "#1E45E1",
        fontWeight: 600,
        borderRadius: "8px",
        padding: "12px",
        marginBottom: "10px",
        maxHeight: 45,
        width: "146px",
        whiteSpace: "nowrap",}} onClick={handlePrevious}>Previous
        </Button>

        <Button style={{  fontFamily: "Gilroy",
                fontSize: "14px",
                backgroundColor: "#1E45E1",
                color: "white",
                fontWeight: 600,
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "10px",
                maxHeight: 45,
                width: "146px",
                whiteSpace: "nowrap",marginLeft:10 ,marginRight:10}}
                onClick={handleCreateCustomer} >
          Create Customer
          </Button>
                   
                      </div>
                    </>
                  )}
                
    </div>
       
          
          </div>
            </div>
             </div>
        </Modal.Body>
      </Modal.Dialog>
    </Modal>



    </>
  );
}

AddCustomer.propTypes = {
  currentItem: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setShowAddCustomer: PropTypes.func.isRequired,
  onclickdata: PropTypes.func.isRequired,

};
export default AddCustomer;

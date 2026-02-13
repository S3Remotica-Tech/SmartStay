/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
// import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../../Assets/Images/New_images/add-circle.png";
// import imageCompression from "browser-image-compression";
import Image from "react-bootstrap/Image";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { ArrowDown2, CloseCircle } from "iconsax-react";
import Flipbackward from "../../Assets/Images/flip-backward.png";
import FlipbackwardBlue from "../../Assets/Images/flip-backwardblue.png";
import Store_Icon from "../../Assets/Images/store_icon.png";
import { RiShoppingBag3Line } from "react-icons/ri";
import ErrorMessage from '../../Components/ErrorMessage'

function AddCustomer({ showMenu, handleClose }) {
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
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

  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  // const [state_nameError, setStateNameError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const countryCode = "91";
  const firstnameRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);

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
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands", },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
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
      setFile(fileImage);
    }
  };








  // useEffect(() => {
  //   dispatch({
  //     type: "HOSTELDETAILLIST",
  //     payload: { hostel_Id: state.login.selectedHostel_Id },
  //   });
  // }, [hostel_Id]);


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

    if (firstnameRef.current) {
      firstnameRef.current.focus();
    }
  }, []);


  useEffect(() => {
    if (state.UsersList.phoneError) {

      setStep(1)
      phoneRef.current?.focus();
      setFormLoading(false)
    }

  }, [state.UsersList.phoneError]);

  useEffect(() => {
    if (state.UsersList.emailError) {
      setStep(1)
      setFormLoading(false)
    }

  }, [state.UsersList.emailError]);



  useEffect(() => {
    if (step === 1 && state.UsersList.emailError) {
      emailRef.current?.focus();
    }
  }, [step, state.UsersList.emailError]);


  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(value)) {
      return;
    }
    setLastname(value);
  };

  const handlePhone = (e) => {
    dispatch({ type: "CLEAR_PHONE_ERROR" });
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

  };

  const handleEmail = (e) => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
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
  };

  // useEffect(() => {
  //   const selectedHostel =
  //      state.UsersList.hostelList &&
  //      state.UsersList.hostelList?.filter(
  //       (item) => item.id === state.login.selectedHostel_Id
  //     );
  //   setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
  //   setHostel_Id(state.login.selectedHostel_Id);
  // }, []);






  const handleHouseNo = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9 .,'/\\#()&:-]*$/;

    if (regex.test(value)) {
      setHouseNo(value);
      setHouse_NoError("");
    }
  };


  const handleStreetName = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9 .,'/\\#()&:-]*$/;


    if (regex.test(value)) {
      setStreet(value);
      setStreetError("");
    } else {
      setStreetError("Please Enter Valid Street Name");
    }
  };

  const handleLandmark = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z0-9 .,'/\\#()&:-]*$/;

    if (regex.test(value)) {
      setLandmark(value);
      setLandmarkError("");
    } else {
      setLandmarkError("Please Enter Valid Landmark");
    }
  };



  const handlePinCodeChange = (e) => {
    const value = e.target.value;

    if (!/^\d{0,6}$/.test(value)) {
      return;
    }

    setPincode(value);

    if (value.length === 0) {
      setPincodeError("");
      return;
    }

    if (value.length < 6) {
      setPincodeError("Pin Code must be exactly 6 digits");
      return;
    }

    if (value === "000000") {
      setPincodeError("Pin Code cannot be all zeros");
      return;
    }

    if (value[0] === "0") {
      setPincodeError("Pin Code cannot start with 0");
      return;
    }

    if (value.slice(-3) === "000") {
      setPincodeError("Last 3 digits cannot be 000");
      return;
    }
    setPincodeError("");
  };







  const handleCity = (e) => {

    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
    }
  };




  const MobileNumber = `${Phone}`;

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



    if (!Phone || Phone.length !== 10) {
      setPhoneError("Please enter a valid mobile number");
      if (!focusedRef.current && phoneRef?.current) {
        phoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else if (Phone === "0000000000") {
      setPhoneError("All digits cannot be zero");
      if (!focusedRef.current && phoneRef?.current) {
        phoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else if (Phone[0] === "0") {
      setPhoneError("Mobile number cannot start with 0");
      if (!focusedRef.current && phoneRef?.current) {
        phoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else {
      setPhoneError("");
      setPhoneErrorMessage("");
    }


    if (pincode) {
      if (pincode.length !== 6) {
        setPincodeError("Pin Code must be exactly 6 digits");
        if (!focusedRef.current && pincodeRef?.current) {
          pincodeRef.current.focus();
          focusedRef.current = true;
        }
        hasError = true;
      } else if (pincode === "000000") {
        setPincodeError("Pin Code cannot be all zeros");
        if (!focusedRef.current && pincodeRef?.current) {
          pincodeRef.current.focus();
          focusedRef.current = true;
        }
        hasError = true;
      } else if (pincode[0] === "0") {
        setPincodeError("Pin Code cannot start with 0");
        if (!focusedRef.current && pincodeRef?.current) {
          pincodeRef.current.focus();
          focusedRef.current = true;
        }
        hasError = true;
      } else if (pincode.slice(-3) === "000") {
        setPincodeError("Last 3 digits cannot be 000");
        if (!focusedRef.current && pincodeRef?.current) {
          pincodeRef.current.focus();
          focusedRef.current = true;
        }
        hasError = true;
      } else {
        setPincodeError("");
      }
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

    const basicAndAddressPayload = {
      profilePic: file,
      hostelId: state.login.selectedHostel_Id,
      customerInfo: {
        firstName: capitalizedFirstname,
        lastName: capitalizedLastname,
        mobileNumber: MobileNumber,
        emailId: Email,
        type: 1,
        address: {
          houseNo: house_no,
          street: street,
          landmark: landmark,
          city: city,
          pincode: pincode,
          state: state_name,
        },


      }
    };


    const basicPayload = {
      profilePic: file,
      hostelId: state.login.selectedHostel_Id,
      payloads: {
        firstName: capitalizedFirstname,
        lastName: capitalizedLastname,
        mobile: MobileNumber,
        emailId: Email,


      }
    };

    const hasAddress =
      house_no?.trim() ||
      street?.trim() ||
      landmark?.trim() ||
      city?.trim() ||
      pincode?.trim() ||
      state_name?.trim();

    if (hasAddress) {
      dispatch({ type: "ADDUSER", payload: basicAndAddressPayload });
      setFormLoading(true)
    } else {
      dispatch({ type: 'CREATECUSTOMERSAVEINFO', payload: basicPayload })
      setFormLoading(true)
    }

  };






  useEffect(() => {
    if (state.UsersList?.phoneError === 202) {
      setFormLoading(false)

    }
  }, [state.UsersList?.phoneError]);



  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])









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
    if (hasError) {
      return
    }
    setStep(2);

  };



  const handlePrevious = () => {
    setStep(1);
  };



  return (
    <>
      <Modal
        show={showMenu}
        onHide={handleClose}
        backdrop="static"
        dialogClassName="custom-modal custom-modal-width"
      >
        <Modal.Dialog
          style={{
            maxWidth: 800,
            paddingRight: "10px",
            borderRadius: "30px",
            marginTop: '-40px',
            marginBottom: '100px'
          }}
          className="m-0 p-0"
        >
          <Modal.Body className="p-0 " >
            <div style={{ overflowY: "auto", }} className="d-flex justify-content-center  p-2">
              {/* Sidebar */}
              <div
                className="p-4"
                style={{
                  width: '250px',
                  minWidth: '240px',
                  backgroundColor: '#f4f8ff',
                  borderTopLeftRadius: '20px',
                  borderBottomLeftRadius: '20px',
                }}
              >
                <h5 className="mb-4" style={{ fontFamily: "Gilroy" }}>Add New Tenant</h5>
                {/* Step 1 */}
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: step === 1 ? "#1E45E1" : "#ffffff",
                      border: "1px solid #1E45E1",
                    }}
                  >
                    {step === 1 ?
                      <img
                        src={Store_Icon}
                        alt="storeicon"
                        height={15}
                        width={15}
                      />
                      :
                      <RiShoppingBag3Line
                        style={{ color: "#1E45E1" }}
                      />}
                  </div>
                  <span className="ms-2" style={{ fontFamily: "Gilroy", fontSize: "14px" }}>
                    Step 1
                    <br />
                    <small>Basic Details</small>
                  </span>
                </div>

                {/* Step 2 */}
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: step === 2 ? "#1E45E1" : "#ffffff",
                      border: "1px solid #1E45E1",
                    }}
                  >
                    <img
                      src={step === 2 ? Flipbackward : FlipbackwardBlue}
                      alt="Flipbackwardicon"
                      height={15}
                      width={15}
                    />
                  </div>
                  <span className="ms-2" style={{ fontFamily: "Gilroy", fontSize: "14px" }}>
                    Step 2
                    <br />
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
                  padding: '15px',
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-start px-2 py-1"
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
                <div className="show-scrolls ms-2 mt-1" style={{ overflowY: 'auto', maxHeight: "440px", overflowX: 'hidden', backgroundColor: "" }}>

                  <div className="m-2">
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
                                      fontWeight: firstname ? 600 : 500,
                                      boxShadow: "none",
                                      border: "1px solid #D9D9D9",
                                      height: 40,
                                      borderRadius: 8,
                                    }}
                                  />
                                </Form.Group>
                                {firstnameError && (

                                  <ErrorMessage message={firstnameError} type="error" />

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
                                      fontWeight: lastname ? 600 : 500,
                                      boxShadow: "none",
                                      border: "1px solid #D9D9D9",
                                      height: 40,
                                      borderRadius: 8,
                                    }}
                                  />
                                </Form.Group>
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group
                                  className="mb-1" >
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
                                    {/* <Form.Select
                                      value={countryCode}
                                      id="vendor-select-pg"
                                      onMouseDown={(e) => e.preventDefault()}
                                      style={{
                                        border: "1px solid #D9D9D9",

                                        borderRadius: "8px 0 0 8px",
                                        height: 40,
                                        fontSize: 16,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy",
                                        fontWeight: countryCode ? 600 : 300,
                                        boxShadow: "none",
                                        backgroundColor: "#fff",
                                        maxWidth: 90,
                                        paddingRight: 10,
                                         cursor: "default",
    pointerEvents: "none"
                                      }}
                                    >
                                      <option>{countryCode}</option>
                                    </Form.Select> */}

                                    <div
                                      className="d-flex align-items-center justify-content-between gap-2"
                                      style={{
                                        border: "1px solid #D9D9D9",
                                        borderRadius: "8px 0 0 8px",
                                        height: 40,
                                        maxWidth: 150,
                                        padding: "0 10px",
                                        backgroundColor: "#fff",
                                        fontFamily: "Gilroy",
                                        fontSize: 16,
                                        fontWeight: countryCode ? 600 : 300,
                                        color: "#4B4B4B",
                                        cursor: "default",
                                        userSelect: "none"
                                      }}
                                    >
                                     
                                      <span>+{countryCode}</span>

<ArrowDown2 size="18" />
                                    </div>

                                    <Form.Control
                                      value={Phone}
                                      ref={phoneRef}
                                      onChange={handlePhone}
                                      type="text"
                                      placeholder="Enter Mobile Number"
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

                                  {phoneError && (
                                    <ErrorMessage message={phoneError} type="error" />
                                  )}
                                  {state.UsersList.phoneError && (
                                    <ErrorMessage message={state.UsersList.phoneError} type="error" />
                                  )}
                                  {phoneErrorMessage && (
                                    <ErrorMessage message={phoneErrorMessage} type="error" />
                                  )}
                                </Form.Group>
                              </div>
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
                                    ref={emailRef}
                                    onChange={(e) => handleEmail(e)}
                                    style={{
                                      fontSize: 16,
                                      color: "#4B4B4B",
                                      fontFamily: "Gilroy",
                                      fontWeight: Email ? 600 : 500,
                                      boxShadow: "none",
                                      border: "1px solid #D9D9D9",
                                      height: 40,
                                      borderRadius: 8,
                                    }}
                                  />
                                  {emailError && (
                                    <ErrorMessage message={emailError} type="error" />
                                  )}
                                  {state.UsersList.emailError && (
                                    <ErrorMessage message={state.UsersList.emailError} type="error" />
                                  )}
                                  {emailErrorMessage && (
                                    <ErrorMessage message={emailErrorMessage} type="error" />
                                  )}
                                </Form.Group>
                              </div>
                            </div>

                          </div>
                          {state.createAccount?.networkError &&
                            <ErrorMessage message={state.createAccount?.networkError} type="error" />
                          }
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                          <Button disabled={formLoading} style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "#1E45E1",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "10px",
                            maxHeight: 45,
                            width: "146px",
                            whiteSpace: "nowrap",
                          }} onClick={handleSaveUserlist}>Save Info</Button>
                          <Button style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "white",
                            color: "#1E45E1",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "10px",
                            maxHeight: 45,
                            width: "146px",
                            whiteSpace: "nowrap", marginLeft: 10, marginRight: 10
                          }} onClick={handleNext}>Next</Button>

                        </div>
                      </>
                    )}



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
                                  fontWeight: house_no ? 600 : 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {house_noError && (
                              <ErrorMessage message={house_noError} type="error" />
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
                                  fontWeight: street ? 600 : 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {streetError && (
                              <ErrorMessage message={streetError} type="error" />
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
                                  fontWeight: landmark ? 600 : 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {landmarkError && (
                              <ErrorMessage message={landmarkError} type="error" />
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
                                <ErrorMessage message={pincodeError} type="error" />
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
                                  fontWeight: city ? 600 : 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {cityError && (
                              <ErrorMessage message={cityError} type="error" />
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
                                    color: "#9AA0A6",
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

                          </div>





                        </div>


                        <div className="d-flex justify-content-end mt-3">
                          <Button style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "white",
                            color: "#1E45E1",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "10px",
                            maxHeight: 45,
                            width: "146px",
                            whiteSpace: "nowrap",
                          }} onClick={handlePrevious}>Previous</Button>
                          <Button disabled={formLoading} style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "#1E45E1",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "10px",
                            maxHeight: 45,
                            width: "146px",
                            whiteSpace: "nowrap", marginLeft: 10, marginRight: 10
                          }} onClick={handleSaveUserlist}>Create Tenant</Button>

                        </div>
                      </>
                    )}




                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          {formLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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

        </Modal.Dialog>
      </Modal>
    </>
  );
}

AddCustomer.propTypes = {
  currentItem: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setShowAddCustomer: PropTypes.func.isRequired,
  onclickdata: PropTypes.func.isRequired,

};
export default AddCustomer;

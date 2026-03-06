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
      className="2xl:mt-24 mt-0 h-auto flex items-center justify-center"
      >
        <Modal.Dialog
          className="w-full !max-w-[800px] !w-[800px] pr-2 rounded-[30px] m-0 p-0 font-gilroy"
        >
          <Modal.Body className="p-0">
            <div className="flex justify-center overflow-auto p-2">
              <div className="p-4 w-[250px] min-w-[240px] bg-[#f4f8ff] rounded-tl-[20px] rounded-bl-[20px]" >
                <h5 className="mb-4 font-gilroy">Add New Tenant</h5>
                <div className="flex items-center mb-4">
                  <div
                    className={`rounded-full flex items-center justify-center w-8 h-8 border ${step === 1 ? "bg-[#1E45E1]" : "bg-white"} border-[#1E45E1]`}
                  >
                    {step === 1 ?
                      <img
                        src={Store_Icon}
                        alt="storeicon"
                        height={15}
                        width={15}
                      />
                      :
                      <RiShoppingBag3Line className="text-[#1E45E1]" />}
                  </div>
                  <span className="ml-2 font-gilroy text-sm">
                    Step 1
                    <br />
                    <small>Basic Details</small>
                  </span>
                </div>

                {/* Step 2 */}
                <div className="flex items-center mb-4">
                  <div className={`rounded-full flex items-center justify-center w-8 h-8 border border-[#1E45E1] ${step === 2 ? "bg-[#1E45E1]" : "bg-white"}`}
                  >
                    <img
                      src={step === 2 ? Flipbackward : FlipbackwardBlue}
                      alt="Flipbackwardicon"
                      height={15}
                      width={15}
                    />
                  </div>
                  <span className="ml-2 font-gilroy text-sm">
                    Step 2
                    <br />
                    <small>Address Details</small>
                  </span>
                </div>


              </div>

              <div
                className="flex-1 relative bg-white rounded-tr-[20px] rounded-br-[20px] overflow-y-auto p-2.5">
                <div className="flex justify-between items-start px-2 py-1 sticky top-0 z-10 bg-white border-b border-[#eee]">
                  <h5 className="font-giroy font-semibold">
                    {step === 1 ? "Basic Details" : "Address Details"}
                  </h5>
                  <CloseCircle size="24" color="#000" onClick={handleClose} className="cursor-pointer" />
                </div>
                <div className="show-scrolls ml-2 mt-1 overflow-y-auto overflow-x-hidden max-h-[440px] bg-transparent">

                  <div className="m-2">
                    {step === 1 && (
                      <>

                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-12 flex flex-col">

                            <div className="flex items-center mt-1">
                              <div className="relative h-[100px] w-[100px]">
                                <Image
                                  src={
                                    file
                                      ? typeof file === "string"
                                        ? file
                                        : URL.createObjectURL(file)
                                      : Profile
                                  }
                                  className="rounded-full h-[100px] w-[100px] cursor-pointer"
                                />

                                <label htmlFor="imageInput">
                                  <Image
                                    src={Plus}
                                    className="absolute h-[20px] w-[20px] top-[90px] left-[80px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
                                  />
                                  <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    id="imageInput"
                                    onChange={handleImageChange}
                                    className="sr-only"
                                  />
                                </label>
                              </div>

                              <div className="pl-5">
                                <div>
                                  <label className="text-base font-medium text-[#222222] font-gilroy">
                                    Profile Photo
                                  </label>
                                </div>
                                <div>
                                  <label className="text-sm font-medium text-[#4B4B4B] font-gilroy">
                                    Max size of image 10MB
                                  </label>
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 col-span-12">

                              <Form.Group className="mb-1">
                                <Form.Label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                                  First Name{" "}
                                  <span className="text-red-500 text-[20px]">*</span>
                                </Form.Label>
                                <FormControl
                                  id="form-controls"
                                  placeholder="Enter First Name"
                                  type="text"
                                  ref={firstnameRef}
                                  value={firstname}
                                  onChange={(e) => handleFirstName(e)}
                                  className={`text-base text-[#4B4B4B] font-gilroy ${firstname ? "font-semibold" : "font-medium"
                                    } shadow-none border border-[#D9D9D9] h-11 rounded-lg`}
                                />
                                {firstnameError && (
                                  <ErrorMessage message={firstnameError} type="error" />
                                )}
                              </Form.Group>

                              <Form.Group className="mb-1">
                                <Form.Label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                                  Last Name
                                </Form.Label>
                                <FormControl
                                  type="text"
                                  id="form-controls"
                                  placeholder="Enter Last Name"
                                  value={lastname}
                                  onChange={(e) => handleLastName(e)}
                                  className={`text-base text-[#4B4B4B] font-gilroy ${lastname ? "font-semibold" : "font-medium"
                                    } shadow-none border border-[#D9D9D9] h-11 rounded-lg`}
                                />
                              </Form.Group>

                              <div className="col-span-12">
                                <Form.Group
                                  className="mb-1" >
                                  <Form.Label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                                    Mobile Number{" "}
                                    <span className="text-red-500 text-[20px]">
                                      {" "}
                                      *{" "}
                                    </span>
                                  </Form.Label>

                                  <InputGroup>

                                    <div
                                      className={`flex items-center justify-between gap-2 border border-gray-300 rounded-l-md h-11 max-w-xs px-3 bg-white font-gilroy text-base text-gray-700 cursor-default select-none ${countryCode ? "font-semibold" : "font-light"
                                        }`} >
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
                                      className={`text-base text-[#4B4B4B] font-gilroy ${Phone ? "font-semibold" : "font-medium"
                                        } shadow-none border border-[#D9D9D9] border-l-0 h-11 rounded-r-[8px]`}
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

                              <Form.Group className="mb-1">
                                <Form.Label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                                  Email ID
                                </Form.Label>
                                <FormControl
                                  type="text"
                                  id="form-controls"
                                  placeholder="Enter Email ID"
                                  value={Email}
                                  ref={emailRef}
                                  onChange={(e) => handleEmail(e)}
                                  className={`text-base text-[#4B4B4B] font-gilroy ${Email ? "font-semibold" : "font-medium"
                                    } shadow-none border border-[#D9D9D9] h-11 rounded-lg`}
                                />
                                {emailError && <ErrorMessage message={emailError} type="error" />}
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


                        <div className="d-flex justify-content-end mt-3">
                          <Button disabled={formLoading}
                            className="!font-gilroy text-sm !bg-[#1E45E1] text-white !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                            onClick={handleSaveUserlist}>
                            Save Info
                          </Button>
                          <Button
                            className="!font-gilroy text-sm bg-white !text-[#1E45E1] !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                            onClick={handleNext}>Next</Button>

                        </div>
                      </>
                    )}



                    {step === 2 && (
                      <>

                        <div className="grid grid-cols-1 gap-2 mt-2">
                          <div className="col-span-1 mb-1">
                            <Form.Group>
                              <Form.Label className="text-sm text-gray-900 font-gilroy font-medium" >
                                Flat , House no , Building , Company , Apartment{" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter House No"
                                value={house_no}
                                onChange={(e) => handleHouseNo(e)}
                                className={`text-base text-gray-700 font-gilroy ${house_no ? "font-semibold" : "font-medium"
                                  } shadow-none border border-gray-300 h-10 rounded-md`}
                              />
                            </Form.Group>
                            {house_noError && (
                              <ErrorMessage message={house_noError} type="error" />
                            )}
                          </div>

                          <div className="col-span-1 mb-1">
                            <Form.Group>
                              <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
                                Area , Street , Sector , Village{" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter Street"
                                value={street}
                                onChange={(e) => handleStreetName(e)}
                                className={`text-base text-gray-700 font-gilroy ${street ? "font-semibold" : "font-medium"
                                  } shadow-none border border-gray-300 h-10 rounded-md`}

                              />
                            </Form.Group>
                            {streetError && (
                              <ErrorMessage message={streetError} type="error" />
                            )}
                          </div>

                          <div className="col-span-1 mb-1">
                            <Form.Group className="">
                              <Form.Label
                                className="text-sm text-gray-900 font-gilroy font-medium"
                              >
                                Landmark{" "}
                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="E.g , near appollo hospital"
                                value={landmark}
                                onChange={(e) => handleLandmark(e)}
                                className={`text-base text-gray-700 font-gilroy ${landmark ? "font-semibold" : "font-medium"
                                  } shadow-none border border-gray-300 h-10 rounded-md`}

                              />
                            </Form.Group>
                            {landmarkError && (
                              <ErrorMessage message={landmarkError} type="error" />
                            )}
                          </div>

                          <div className="col-span-1">
                            <Form.Group
                              controlId="exampleForm.ControlInput1"
                            >
                              <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
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
                                className={`text-base text-gray-700 font-gilroy ${pincode ? "font-semibold" : "font-medium"
                                  } shadow-none border border-gray-300 h-10 rounded-md`}

                              />

                              {pincodeError && (
                                <ErrorMessage message={pincodeError} type="error" />
                              )}

                            </Form.Group>
                          </div>

                          <div className="col-span-1 mb-1">
                            <Form.Group>
                              <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">Town/City{" "}</Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter City"
                                value={city}
                                ref={cityRef}
                                onChange={(e) => handleCity(e)}
                                className={`text-base text-gray-700 font-gilroy ${city ? "font-semibold" : "font-medium"
                                  } shadow-none border border-gray-300 h-10 rounded-md`}

                              />
                            </Form.Group>
                            {cityError && (
                              <ErrorMessage message={cityError} type="error" />
                            )}
                          </div>

                          <div className="col-span-1">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput5"
                            >
                              <Form.Label className="font-gilroy text-sm font-medium text-gray-900 not-italic leading-normal">
                                State </Form.Label>

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

                        <div className="flex justify-end mt-3">
                          <Button className="!font-gilroy !text-sm bg-white !text-blue-700 !font-semibold !rounded-md mb-2 h-11 w-36 whitespace-nowrap"
                            onClick={handlePrevious}>
                            Previous
                          </Button>
                          <Button disabled={formLoading}
                            className="!font-gilroy !text-sm !bg-blue-700 !text-white !font-semibold rounded-md px-4 mb-2 mx-2 h-11 w-36 whitespace-nowrap"
                            onClick={handleSaveUserlist}>
                            Create Tenant
                          </Button>

                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>

          {formLoading && (
            <div className="absolute inset-x-0 top-24 bottom-0 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
            </div>
          )}


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

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import Image from "react-bootstrap/Image";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import { ArrowDown2, CloseCircle } from "iconsax-react";
import Flipbackward from "../../Assets/Images/flip-backward.png";
import FlipbackwardBlue from "../../Assets/Images/flip-backwardblue.png";
import Store_Icon from "../../Assets/Images/store_icon.png";
import { RiShoppingBag3Line } from "react-icons/ri";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  fieldClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";

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
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Chandigarh", label: "Chandigarh" },
    {
      value: "Dadra and Nagar Haveli and Daman and Diu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
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
    const pattern = /^[a-zA-Z0-9\s]*$/;

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
      setStep(1);
      phoneRef.current?.focus();
      setFormLoading(false);
    }
  }, [state.UsersList.phoneError]);

  useEffect(() => {
    if (state.UsersList.emailError) {
      setStep(1);
      setFormLoading(false);
    }
  }, [state.UsersList.emailError]);

  useEffect(() => {
    if (step === 1 && state.UsersList.emailError) {
      emailRef.current?.focus();
    }
  }, [step, state.UsersList.emailError]);

  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z0-9\s]*$/;

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

    if (
      !validateField(
        firstname,
        "First Name",
        firstnameRef,
        setFirstnameError,
        focusedRef,
      )
    )
      hasError = true;
    if (
      !validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)
    )
      hasError = true;

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
      } else {
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
      },
    };

    const basicPayload = {
      profilePic: file,
      hostelId: state.login.selectedHostel_Id,
      payloads: {
        firstName: capitalizedFirstname,
        lastName: capitalizedLastname,
        mobile: MobileNumber,
        emailId: Email,
      },
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
      setFormLoading(true);
    } else {
      dispatch({ type: "CREATECUSTOMERSAVEINFO", payload: basicPayload });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList?.phoneError === 202) {
      setFormLoading(false);
    }
  }, [state.UsersList?.phoneError]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const handleNext = () => {
    let hasError = false;
    const focusedRef = { current: false };
    if (
      !validateField(
        firstname,
        "First Name",
        firstnameRef,
        setFirstnameError,
        focusedRef,
      )
    )
      hasError = true;
    if (
      !validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)
    )
      hasError = true;
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
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
    if (hasError) {
      return;
    }
    setStep(2);
  };

  const handlePrevious = () => {
    setStep(1);
  };

  return (
    <div className="font-gilroy">
      <div
        className={`fixed  inset-0 bg-black/40 z-50 transition-opacity duration-300 ${showMenu ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
      // onClick={onClose}
      />

      <div className="fixed top-2 right-2 bottom-2 w-[800px]   bg-white z-50 rounded-md flex flex-col p-2.5">
        <div className="flex justify-center h-full p-2 rounded-md ">
          <div className="p-4 w-[250px] min-w-[240px] bg-[#f4f8ff] rounded-tl-[20px] rounded-bl-[20px]">
            <h5 className="mb-4 font-gilroy">Add New Tenant</h5>
            <div className="flex items-center mb-4">
              <div
                className={`rounded-full flex items-center justify-center w-8 h-8 border ${step === 1 ? "bg-[#1E45E1]" : "bg-white"} border-[#1E45E1]`}
              >
                {step === 1 ? (
                  <img
                    src={Store_Icon}
                    alt="storeicon"
                    height={15}
                    width={15}
                  />
                ) : (
                  <RiShoppingBag3Line className="text-[#1E45E1]" />
                )}
              </div>
              <span className="ml-2 font-gilroy text-sm">
                Step 1
                <br />
                <small>Basic Details</small>
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div
                className={`rounded-full flex items-center justify-center w-8 h-8 border border-[#1E45E1] ${step === 2 ? "bg-[#1E45E1]" : "bg-white"}`}
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

          <div className="flex-1 relative bg-white rounded-tr-[20px] rounded-br-[20px]  overflow-y-auto max-h-[800px]">
            <div className="flex justify-between items-start px-2   bg-white sticky top-0 z-10 bg-white border-b border-[#eee]">
              <h5 className="font-giroy font-semibold  bg-white">
                {step === 1 ? "Basic Details" : "Address Details"}
              </h5>
              <CloseCircle
                data-testid="pg-tenant-close"
                size="24"
                color="#000"
                onClick={handleClose}
                className="cursor-pointer"
              />
            </div>
            <div className="show-scrolls ml-2 mt-1 overflow-y-auto overflow-x-hidden max-h-[800px]  bg-transparent">
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
                                data-testid="pg-tenant-photo-input"
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
                            <Form.Label className={fieldLabelClass}>
                              First Name{" "}
                              <span className={fieldRequiredClass}>
                                *
                              </span>
                            </Form.Label>
                            <FormControl
                              id="form-controls"
                              data-testid="pg-tenant-first-name"
                              placeholder="Enter First Name"
                              type="text"
                              ref={firstnameRef}
                              value={firstname}
                              onChange={(e) => handleFirstName(e)}
                              className={fieldClass(!!firstnameError)}
                            />
                            {firstnameError && (
                              <ErrorMessage className="mt-[6px]"
                                message={firstnameError}
                                type="error"
                              />
                            )}
                          </Form.Group>

                          <Form.Group className="mb-1">
                            <Form.Label className={fieldLabelClass}>
                              Last Name
                            </Form.Label>
                            <FormControl
                              type="text"
                              id="form-controls"
                              data-testid="pg-tenant-last-name"
                              placeholder="Enter Last Name"
                              value={lastname}
                              onChange={(e) => handleLastName(e)}
                              className={fieldClass()}
                            />
                          </Form.Group>

                          <div className="col-span-12">
                            <Form.Group className="mb-1">
                              <Form.Label className={fieldLabelClass}>
                                Mobile Number{" "}
                                <span className={fieldRequiredClass}>
                                  {" "}
                                  *{" "}
                                </span>
                              </Form.Label>

                              <InputGroup>
                                <div
                          className={`${fieldClass()} !flex !w-[88px] !flex-none items-center justify-between gap-[6px] !rounded-r-none cursor-default select-none`}
                                >
                                  <span>+{countryCode}</span>

                                  <ArrowDown2 size="18" />
                                </div>

                                <Form.Control
                                  value={Phone}
                                  ref={phoneRef}
                                  onChange={handlePhone}
                                  type="text"
                                  data-testid="pg-tenant-mobile"
                                  placeholder="Enter Mobile Number"
                                  maxLength={10}
                                  className={`${fieldClass(!!phoneError)} !rounded-l-none`}
                                />
                              </InputGroup>

                              {phoneError && (
                                <ErrorMessage className="mt-[6px]"
                                  message={phoneError}
                                  type="error"
                                />
                              )}
                              {state.UsersList.phoneError && (
                                <ErrorMessage className="mt-[6px]"
                                  message={state.UsersList.phoneError}
                                  type="error"
                                />
                              )}
                              {phoneErrorMessage && (
                                <ErrorMessage className="mt-[6px]"
                                  message={phoneErrorMessage}
                                  type="error"
                                />
                              )}
                            </Form.Group>
                          </div>

                          <Form.Group className="mb-1">
                            <Form.Label className={fieldLabelClass}>
                              Email ID
                            </Form.Label>
                            <FormControl
                              type="text"
                              id="form-controls"
                              data-testid="pg-tenant-email"
                              placeholder="Enter Email ID"
                              value={Email}
                              ref={emailRef}
                              onChange={(e) => handleEmail(e)}
                              className={fieldClass(!!emailError)}
                            />
                            {emailError && (
                              <ErrorMessage className="mt-[6px]" message={emailError} type="error" />
                            )}
                            {state.UsersList.emailError && (
                              <ErrorMessage className="mt-[6px]"
                                message={state.UsersList.emailError}
                                type="error"
                              />
                            )}
                            {emailErrorMessage && (
                              <ErrorMessage className="mt-[6px]"
                                message={emailErrorMessage}
                                type="error"
                              />
                            )}
                          </Form.Group>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        data-testid="pg-tenant-save-info"
                        disabled={formLoading}
                        className="!font-gilroy text-sm !bg-[#1E45E1] text-white !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                        onClick={handleSaveUserlist}
                      >
                        Save Info
                      </Button>
                      <Button
                        data-testid="pg-tenant-next"
                        className="!font-gilroy text-sm bg-white !text-[#1E45E1] !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                        onClick={handleNext}
                      >
                        Next
                      </Button>
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 gap-2 mt-2">
                      <div className="col-span-1 mb-1">
                        <Form.Group>
                          <Form.Label className={fieldLabelClass}>
                            Flat , House no , Building , Company ,
                            Apartment{" "}
                          </Form.Label>
                          <FormControl
                            type="text"
                            id="form-controls"
                            data-testid="pg-tenant-house-no"
                            placeholder="Enter House No"
                            value={house_no}
                            onChange={(e) => handleHouseNo(e)}
                            className={fieldClass(!!house_noError)}
                          />
                        </Form.Group>
                        {house_noError && (
                          <ErrorMessage className="mt-[6px]" message={house_noError} type="error" />
                        )}
                      </div>

                      <div className="col-span-1 mb-1">
                        <Form.Group>
                          <Form.Label className={fieldLabelClass}>
                            Area , Street , Sector , Village{" "}
                          </Form.Label>
                          <FormControl
                            type="text"
                            id="form-controls"
                            data-testid="pg-tenant-street"
                            placeholder="Enter Street"
                            value={street}
                            onChange={(e) => handleStreetName(e)}
                            className={fieldClass(!!streetError)}
                          />
                        </Form.Group>
                        {streetError && (
                          <ErrorMessage className="mt-[6px]" message={streetError} type="error" />
                        )}
                      </div>

                      <div className="col-span-1 mb-1">
                        <Form.Group className="">
                          <Form.Label className={fieldLabelClass}>
                            Landmark{" "}
                          </Form.Label>
                          <FormControl
                            type="text"
                            id="form-controls"
                            data-testid="pg-tenant-landmark"
                            placeholder="E.g , near appollo hospital"
                            value={landmark}
                            onChange={(e) => handleLandmark(e)}
                            className={fieldClass(!!landmarkError)}
                          />
                        </Form.Group>
                        {landmarkError && (
                          <ErrorMessage className="mt-[6px]" message={landmarkError} type="error" />
                        )}
                      </div>

                      <div className="col-span-1">
                        <Form.Group controlId="exampleForm.ControlInput1">
                          <Form.Label className={fieldLabelClass}>
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
                            data-testid="pg-tenant-pincode"
                            placeholder="Enter Pincode"
                            className={fieldClass(!!pincodeError)}
                          />

                          {pincodeError && (
                            <ErrorMessage className="mt-[6px]" message={pincodeError} type="error" />
                          )}
                        </Form.Group>
                      </div>

                      <div className="col-span-1 mb-1">
                        <Form.Group>
                          <Form.Label className={fieldLabelClass}>
                            Town/City{" "}
                          </Form.Label>
                          <FormControl
                            type="text"
                            id="form-controls"
                            data-testid="pg-tenant-city"
                            placeholder="Enter City"
                            value={city}
                            ref={cityRef}
                            onChange={(e) => handleCity(e)}
                            className={fieldClass(!!cityError)}
                          />
                        </Form.Group>
                        {cityError && (
                          <ErrorMessage className="mt-[6px]" message={cityError} type="error" />
                        )}
                      </div>

                      <div className="col-span-1">
                        <Form.Group
                          className="mb-3"
                          controlId="exampleForm.ControlInput5"
                        >
                          <Form.Label className={fieldLabelClass}>
                            State{" "}
                          </Form.Label>

                          <div data-testid="pg-tenant-state-select">
                          <div data-testid="add-customer-pg-state-select" className="contents"><Select
                            options={indianStates}
                            ref={stateRef}
                            onChange={(selectedOption) => {
                              setStateName(selectedOption?.value);
                            }}
                            onInputChange={(inputValue, { action }) => {
                              if (action === "input-change") {
                                const lettersOnly = inputValue.replace(
                                  /[^a-zA-Z\s]/g,
                                  "",
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
                            menuPlacement="auto"
                            noOptionsMessage={() => "No state available"}
                            styles={{
                              ...fieldSelectStyles(),
                              menuList: (base) => ({ ...base, padding: 0, maxHeight: "120px" }),
                            }}
                          /></div>
                          </div>
                        </Form.Group>
                      </div>
                    </div>

                    <div className="flex justify-end mt-3">
                      <Button
                        data-testid="pg-tenant-previous"
                        className="!font-gilroy !text-sm bg-white !text-blue-700 !font-semibold !rounded-md mb-2 h-11 w-36 whitespace-nowrap"
                        onClick={handlePrevious}
                      >
                        Previous
                      </Button>
                      <Button
                        data-testid="pg-tenant-create"
                        disabled={formLoading}
                        className="!font-gilroy !text-sm !bg-blue-700 !text-white !font-semibold rounded-md px-4 mb-2 mx-2 h-11 w-36 whitespace-nowrap"
                        onClick={handleSaveUserlist}
                      >
                        Create Tenant
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {formLoading && (
          <div className="absolute inset-x-0 top-24 bottom-0 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
          </div>
        )}
      </div>
    </div>
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

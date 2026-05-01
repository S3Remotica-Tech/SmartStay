/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import Image from "react-bootstrap/Image";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  Add,
  ArrowDown2,
  CloseCircle,
  Mobile,
  Sms,
  AddCircle,
  DocumentUpload,
  Trash,
} from "iconsax-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import Flipbackward from "../../Assets/Images/flip-backward.png";
import FlipbackwardBlue from "../../Assets/Images/flip-backwardblue.png";
import Store_Icon from "../../Assets/Images/store_icon.png";
import { RiShoppingBag3Line } from "react-icons/ri";
import ErrorMessage from "../../Components/ErrorMessage";
import AddTenantBookingCheckin from "./AddTenantBookingCheckin";

function AddTenant({ showMenu, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("Mathu");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("9965003581");
  const [step, setStep] = useState(1);
  const [hovered, setHovered] = useState(null);
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
  const [isAlredayTenant, setIsAlreadyTenant] = useState(true);
  const scrollRef = useRef(null);
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  // const [state_nameError, setStateNameError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [guardianName, setGuardianName] = useState("");
  const [relationship, setRelationship] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [mobile, setMobile] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);
  const [employmentStatus, setEmploymentStatus] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobRole, setJobRole] = useState(null);
  const [workLocation, setWorkLocation] = useState("");
  const [shiftType, setShiftType] = useState(null);
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const countryCode = "91";
  const firstnameRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);
  const [idProofType, setIdProofType] = useState(null);
  const [idProofNo, setIdProofNo] = useState("");
  const emailRef = useRef(null);
  const [search, setSearch] = useState("");

  const aadhaarRef = useRef(null);
  const panRef = useRef(null);
  const isImage = (file) => file && file.type.startsWith("image/");

  const handleDeleteAadhaar = () => setAadhaarFile(null);
  const handleDeletePan = () => setPanFile(null);

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

  const usersData = [
    {
      id: 1,
      name: "Charles C",
      phone: "+91 76049 21098",
      email: "charles@example.com",
      avatar: "",
    },
    {
      id: 2,
      name: "Rajesh K",
      phone: "+91 98765 47604",
      email: "",
      avatar: "",
    },
  ];
  const handleAadhaarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAadhaarFile(file);
  };

  const handlePanChange = (e) => {
    const file = e.target.files[0];
    if (file) setPanFile(file);
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = usersData.filter((user) =>
    user.phone.replace(/\s/g, "").includes(search.replace(/\s/g, "")),
  );

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="text-green-600 font-semibold ">
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      setFile(fileImage);
    }
  };

  const handleFirstName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstname(value);
    setFirstnameError("");
  };

  const idProofOptions = [
    { value: "aadhar", label: "Aadhar Card" },
    { value: "pan", label: "PAN Card" },
    { value: "passport", label: "Passport" },
    { value: "driving", label: "Driving License" },
  ];

  const relationOptions = [
    { value: "father", label: "Father" },
    { value: "mother", label: "Mother" },
  ];

  const jobOptions = [
    { value: "employed", label: "Employed" },
    { value: "self", label: "Self Employed" },
  ];

  const handleSelectChange = (selectedOption) => {
    setIdProofType(selectedOption);
  };

  const handleInputChange = (e) => {
    setIdProofNo(e.target.value);
  };

  const CustomStyles = {
    control: (base, state) => ({
      ...base,
      minHeight: "45px",
      height: "45px",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "15px",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",
      alignItems: "center",

      cursor: state.isDisabled ? "not-allowed" : "pointer",
      backgroundColor: state.isDisabled
        ? "#F3F4F6"
        : state.hasValue
          ? "#FFF"
          : "#fff",
      opacity: state.isDisabled ? 0.7 : 1,
    }),

    singleValue: (base, state) => ({
      ...base,
      color: state.isDisabled ? "#9CA3AF" : "#333",
      fontWeight: 500,
    }),

    placeholder: (base, state) => ({
      ...base,
      color: state.isDisabled ? "#9CA3AF" : "#6B7280",
    }),

    option: (base, state) => {
      const isSelected = state.isSelected;

      return {
        ...base,
        position: "relative",
        fontSize: 14,
        padding: "6px 12px",
        backgroundColor: isSelected
          ? "#EEF2FF"
          : state.isFocused
            ? "#F3F4F6"
            : "#fff",
        color: "#111827",
        cursor: "pointer",

        whiteSpace: "nowrap",
        overflow: "visible",

        paddingLeft: isSelected ? "9px" : "12px",

        ...(isSelected && {
          borderLeft: "3px solid #1E45E1",
          fontWeight: 500,
        }),
      };
    },

    menu: (base) => ({
      ...base,
      backgroundColor: "#fff",
      border: "1px solid #E5E7EB",
      borderRadius: "8px",
      padding: "6px 0",
      zIndex: 9999,
      width: "max-content",
      minWidth: "100%",
    }),

    menuList: (base) => ({
      ...base,
      maxHeight: "100px",
      padding: 0,
      overflowY: "auto",
    }),

    valueContainer: (base) => ({
      ...base,
      padding: "0 8px",
    }),

    indicatorsContainer: (base) => ({
      ...base,
      height: "45px",
    }),

    dropdownIndicator: (base, state) => ({
      ...base,
      padding: "4px",
      color: state.isDisabled ? "#D1D5DB" : "#6B7280",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
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

  const handleAddManually = () => {
    setIsAlreadyTenant(false);
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

    scrollRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handlePrevious = () => {
    setStep(1);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full h-full flex items-center justify-center p-2">
          <div className="w-full max-w-[900px] h-[95vh] bg-white rounded-[20px] flex overflow-hidden shadow-lg">
            <div className="w-[250px] min-w-[240px] bg-[#f4f8ff] p-4">
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
                  <label className=" font-gilroy text-base">
                    Basic Details
                  </label>
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
                  <label className=" font-gilroy text-base">
                    Documents & Job Details
                  </label>
                </span>
              </div>

              <div className="flex items-center mb-4">
                <div
                  className={`rounded-full flex items-center justify-center w-8 h-8 border border-[#1E45E1] ${step === 3 ? "bg-[#1E45E1]" : "bg-white"}`}
                >
                  <img
                    src={step === 3 ? Flipbackward : FlipbackwardBlue}
                    alt="Flipbackwardicon"
                    height={15}
                    width={15}
                  />
                </div>
                <span className="ml-2 font-gilroy text-sm">
                  Step 3
                  <br />
                  <label className=" font-gilroy text-base">Finalize</label>
                </span>
              </div>
            </div>

            <div className="flex-1 relative bg-white rounded-tr-[20px] rounded-br-[20px] overflow-y-auto my-2 mx-1">
              {step === 1 && (
                <div className="flex justify-between items-start px-2 py-1 sticky top-0 z-10 bg-white  border-[#eee]">
                  {isAlredayTenant ? (
                    <h5 className="font-giroy font-semibold text-[18px]">
                      Tenant Information
                    </h5>
                  ) : (
                    step === 1 && (
                      <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                        <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                        Tenant Information
                      </h5>
                    )
                  )}

                  <Add
                    size="24"
                    color="#FF0000"
                    onClick={handleClose}
                    className="cursor-pointer rotate-45"
                  />
                </div>
              )}
              <div className="show-scrolls ml-2 mt-1 overflow-y-auto overflow-x-hidden h-[600px] bg-transparent">
                <div className="m-2">
                  {step === 1 && (
                    <div className="grid grid-cols-12 gap-3">
                      <div className="col-span-12 flex flex-col">
                        {isAlredayTenant ? (
                          <div className="w-full">
                            <div className="mb-4">
                              <p className="text-sm text-[#505F76] mb-1 font-medium">
                                Search Mobile Number
                              </p>
                              <div className="flex items-center border rounded-lg px-3 py-2 bg-white mb-2">
                                <span className="text-gray-600 mr-4 ">+91</span>
                                <input
                                  type="text"
                                  value={search}
                                  onChange={handleChange}
                                  placeholder="Search"
                                  className="bg-transparent outline-none w-full"
                                />
                              </div>
                              <span className="text-xs text-[#747686] mb-1 font-medium whitespace-nowrap">
                                Search existing tenants in the Property flow
                                ecosystem to auto-fill details.
                              </span>

                              <div className="flex items-center my-4">
                                <div className="flex-1 h-px bg-gray-300"></div>

                                <span className="px-3 text-gray-500 text-sm font-medium">
                                  OR
                                </span>

                                <div className="flex-1 h-px bg-gray-300"></div>
                              </div>
                              <div className="flex justify-center w-full ">
                                <Button
                                  className="!font-gilroy text-sm !border !border-[#F4F8FF] !bg-[#F4F8FF]
                                       !text-[#1E45E1]
                                       !font-semibold !rounded-md !py-2.5 !px-4 !mb-2   w-full
                                       !whitespace-nowrap"
                                  onClick={handleAddManually}
                                >
                                  Add Manually
                                </Button>
                              </div>
                            </div>
                            {/* <div className="bg-white border border-[#FFFFFF] rounded-lg shadow-sm overflow-hidden">
                                  {search ? (
                                    filteredUsers.map((user, index) => (
                                      <div
                                        key={user.id}
                                        className={`flex items-center gap-3 p-3 ${
                                          index !== filteredUsers.length - 1
                                            ? "border-b"
                                            : ""
                                        }`}
                                      >
                                        {user.avatar ? (
                                          <img
                                            src={user.avatar}
                                            alt="avatar"
                                            className="w-10 h-10 rounded-full"
                                          />
                                        ) : (
                                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                                            {user.name.charAt(0)}
                                          </div>
                                        )}

                                        <div className="flex flex-col">
                                          <p className="font-medium">
                                            {user.name}
                                          </p>

                                          <div className="flex items-center text-sm text-gray-500 gap-2 flex-wrap">
                                            <Mobile size="18" color="#1E45E1" />
                                            <span>
                                              {highlightText(
                                                user.phone,
                                                search,
                                              )}
                                            </span>

                                            {user.email && (
                                              <>
                                                <span className="bg-[#D9D9D9] h-4 w-[1px]" />
                                                <Sms
                                                  size="18"
                                                  color="#1E45E1"
                                                />
                                                <span>{user.email}</span>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  ) : (
                                    <p className="text-center text-gray-400 text-sm p-4">
                                      No users found
                                    </p>
                                  )}
                                </div> */}
                          </div>
                        ) : (
                          <div className="flex flex-col justify-between">
                            <div className="flex justify-between items-start gap-4 !bg-[#F4F8FF] px-2 py-4 rounded-md">
                              <div className="text-sm text-[#64748B] font-medium pr-[20px]">
                                Press the button to Search existing tenants in
                                the Property flow ecosystem to auto-fill
                                details.
                              </div>
                              <div>
                                <Button
                                  className="!font-gilroy text-xs !border !border-[#1E45E1] !bg-[#1E45E1]
                                       !text-white
                                       !font-semibold !rounded-md !py-2 !px-10 !mb-2   w-full
                                       !whitespace-nowrap"
                                  onClick={() => setIsAlreadyTenant(true)}
                                >
                                  Existing User
                                </Button>
                              </div>
                            </div>

                            <div className="flex items-center mt-1">
                              <div className="relative h-[100px] w-[100px]">
                                <img
                                  src={
                                    file
                                      ? typeof file === "string"
                                        ? file
                                        : URL.createObjectURL(file)
                                      : Profile
                                  }
                                  alt="profile"
                                  className="rounded-full h-[100px] w-[100px] object-cover"
                                />

                                <label htmlFor="imageInput">
                                  <div
                                    className="absolute bottom-2 right-2 translate-x-1/4 translate-y-1/4 
                      bg-white rounded-full p-1.5 shadow-md cursor-pointer"
                                  >
                                    <AddCircle
                                      size="20"
                                      color="#1E45E1"
                                      variant="Bold"
                                    />
                                  </div>

                                  <input
                                    type="file"
                                    accept="image/*"
                                    id="imageInput"
                                    onChange={handleImageChange}
                                    className="hidden"
                                  />
                                </label>
                              </div>

                              <div className="pl-5">
                                <p className="text-base font-medium text-[#222222] mb-1">
                                  Upload Tenant Photo
                                </p>
                                <p className="text-sm text-[#4B4B4B]">
                                  Recommended size 400x400px. JPG or PNG
                                  allowed.
                                </p>
                              </div>
                            </div>

                            <div className="mt-4 col-span-12">
                              <Form.Group className="mb-1">
                                <Form.Label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                                  First Name{" "}
                                  <span className="text-red-500 text-[20px]">
                                    *
                                  </span>
                                </Form.Label>
                                <FormControl
                                  id="form-controls"
                                  placeholder="Enter First Name"
                                  type="text"
                                  ref={firstnameRef}
                                  value={firstname}
                                  onChange={(e) => handleFirstName(e)}
                                  className={`text-base text-[#4B4B4B] font-gilroy ${
                                    firstname ? "font-semibold" : "font-medium"
                                  } shadow-none border border-[#D9D9D9] h-11 rounded-lg`}
                                />
                                {firstnameError && (
                                  <ErrorMessage
                                    message={firstnameError}
                                    type="error"
                                  />
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
                                  className={`text-base text-[#4B4B4B] font-gilroy ${
                                    lastname ? "font-semibold" : "font-medium"
                                  } shadow-none border border-[#D9D9D9] h-11 rounded-lg`}
                                />
                              </Form.Group>

                              <div className="col-span-12">
                                <Form.Group className="mb-1">
                                  <Form.Label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                                    Mobile Number{" "}
                                    <span className="text-red-500 text-[20px]">
                                      {" "}
                                      *{" "}
                                    </span>
                                  </Form.Label>

                                  <InputGroup>
                                    <div
                                      className={`flex items-center justify-between gap-2 border border-gray-300 rounded-l-md h-11 max-w-xs px-3 bg-white font-gilroy text-base text-gray-700 cursor-default select-none ${
                                        countryCode
                                          ? "font-semibold"
                                          : "font-light"
                                      }`}
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
                                      className={`text-base text-[#4B4B4B] font-gilroy ${
                                        Phone ? "font-semibold" : "font-medium"
                                      } shadow-none border border-[#D9D9D9] border-l-0 h-11 rounded-r-[8px]`}
                                    />
                                  </InputGroup>

                                  {phoneError && (
                                    <ErrorMessage
                                      message={phoneError}
                                      type="error"
                                    />
                                  )}
                                  {state.UsersList.phoneError && (
                                    <ErrorMessage
                                      message={state.UsersList.phoneError}
                                      type="error"
                                    />
                                  )}
                                  {phoneErrorMessage && (
                                    <ErrorMessage
                                      message={phoneErrorMessage}
                                      type="error"
                                    />
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
                                  className={`text-base text-[#4B4B4B] font-gilroy ${
                                    Email ? "font-semibold" : "font-medium"
                                  } shadow-none border border-[#D9D9D9] h-11 rounded-lg`}
                                />
                                {emailError && (
                                  <ErrorMessage
                                    message={emailError}
                                    type="error"
                                  />
                                )}
                                {state.UsersList.emailError && (
                                  <ErrorMessage
                                    message={state.UsersList.emailError}
                                    type="error"
                                  />
                                )}
                                {emailErrorMessage && (
                                  <ErrorMessage
                                    message={emailErrorMessage}
                                    type="error"
                                  />
                                )}
                              </Form.Group>
                            </div>

                            <div className="grid grid-cols-12 gap-4 mb-1">
                              <div className="col-span-12 md:col-span-6">
                                <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                  ID Proof type
                                </label>

                                <Select
                                  options={idProofOptions}
                                  value={idProofType}
                                  onChange={handleSelectChange}
                                  placeholder="Select"
                                  classNamePrefix="custom"
                                  styles={CustomStyles}
                                />
                              </div>

                              <div className="col-span-12 md:col-span-6">
                                <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                  ID Proof no
                                </label>

                                <input
                                  type="text"
                                  value={idProofNo}
                                  onChange={handleInputChange}
                                  placeholder="Enter no"
                                  className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                                />
                              </div>
                            </div>

                            {/* Address details  */}
                            <div className="flex justify-between my-3 gap-1">
                              <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                                <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                                Address Details
                              </h5>

                              <div className="text-[#64748B]">
                                <input
                                  type="checkbox"
                                  className="cursor-pointer "
                                />{" "}
                                Do it later
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2 mt-2">
                              <div className="col-span-1 mb-1">
                                <Form.Group>
                                  <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
                                    Flat , House no , Building , Company ,
                                    Apartment{" "}
                                  </Form.Label>
                                  <FormControl
                                    type="text"
                                    id="form-controls"
                                    placeholder="Enter House No"
                                    value={house_no}
                                    onChange={(e) => handleHouseNo(e)}
                                    className={`text-base text-gray-700 font-gilroy ${
                                      house_no ? "font-semibold" : "font-medium"
                                    } shadow-none border border-gray-300 h-10 rounded-md`}
                                  />
                                </Form.Group>
                                {house_noError && (
                                  <ErrorMessage
                                    message={house_noError}
                                    type="error"
                                  />
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                              <div className=" mb-1">
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
                                    className={`text-base text-gray-700 font-gilroy ${
                                      street ? "font-semibold" : "font-medium"
                                    } shadow-none border border-gray-300 h-10 rounded-md`}
                                  />
                                </Form.Group>
                                {streetError && (
                                  <ErrorMessage
                                    message={streetError}
                                    type="error"
                                  />
                                )}
                              </div>

                              <div className=" mb-1">
                                <Form.Group className="">
                                  <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
                                    Landmark{" "}
                                  </Form.Label>
                                  <FormControl
                                    type="text"
                                    id="form-controls"
                                    placeholder="E.g , near appollo hospital"
                                    value={landmark}
                                    onChange={(e) => handleLandmark(e)}
                                    className={`text-base text-gray-700 font-gilroy ${
                                      landmark ? "font-semibold" : "font-medium"
                                    } shadow-none border border-gray-300 h-10 rounded-md`}
                                  />
                                </Form.Group>
                                {landmarkError && (
                                  <ErrorMessage
                                    message={landmarkError}
                                    type="error"
                                  />
                                )}
                              </div>

                              <div className="mb-1">
                                <Form.Group controlId="exampleForm.ControlInput1">
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
                                    className={`text-base text-gray-700 font-gilroy ${
                                      pincode ? "font-semibold" : "font-medium"
                                    } shadow-none border border-gray-300 h-10 rounded-md`}
                                  />

                                  {pincodeError && (
                                    <ErrorMessage
                                      message={pincodeError}
                                      type="error"
                                    />
                                  )}
                                </Form.Group>
                              </div>

                              <div className=" mb-1">
                                <Form.Group>
                                  <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
                                    Town/City{" "}
                                  </Form.Label>
                                  <FormControl
                                    type="text"
                                    id="form-controls"
                                    placeholder="Enter City"
                                    value={city}
                                    ref={cityRef}
                                    onChange={(e) => handleCity(e)}
                                    className={`text-base text-gray-700 font-gilroy ${
                                      city ? "font-semibold" : "font-medium"
                                    } shadow-none border border-gray-300 h-10 rounded-md`}
                                  />
                                </Form.Group>
                                {cityError && (
                                  <ErrorMessage
                                    message={cityError}
                                    type="error"
                                  />
                                )}
                              </div>
                            </div>

                            <div className="mb-1">
                              <Form.Group
                                className="mb-3"
                                controlId="exampleForm.ControlInput5"
                              >
                                <Form.Label className="font-gilroy text-sm font-medium text-gray-900 not-italic leading-normal">
                                  State{" "}
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
                                        "",
                                      );
                                      return lettersOnly;
                                    }
                                    return inputValue;
                                  }}
                                  value={
                                    state_name
                                      ? {
                                          value: state_name,
                                          label: state_name,
                                        }
                                      : null
                                  }
                                  placeholder="Select State"
                                  classNamePrefix="custom"
                                  menuPlacement="auto"
                                  noOptionsMessage={() => "No state available"}
                                  styles={CustomStyles}
                                />
                              </Form.Group>
                            </div>
                            <div className="d-flex justify-content-end mt-3">
                              <Button
                                disabled={formLoading || isAlredayTenant}
                                className="!font-gilroy text-sm !bg-[#1E45E1] text-white !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                                onClick={handleSaveUserlist}
                              >
                                Save Draft
                              </Button>
                              <Button
                                disabled={isAlredayTenant}
                                className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                                onClick={handleNext}
                              >
                                Next
                              </Button>
                            </div>

                            {/* <div className="flex justify-end mt-3">
                        <Button
                          className="!font-gilroy !text-sm bg-white !text-blue-700 !font-semibold !rounded-md mb-2 h-11 w-36 whitespace-nowrap"
                          onClick={handlePrevious}
                        >
                          Previous
                        </Button>
                        <Button
                          disabled={formLoading}
                          className="!font-gilroy !text-sm !bg-blue-700 !text-white !font-semibold rounded-md px-4 mb-2 mx-2 h-11 w-36 whitespace-nowrap"
                          onClick={handleSaveUserlist}
                        >
                          Create Tenant
                        </Button>
                      </div> */}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6" ref={scrollRef}>
                      <div>
                        <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                          <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                          Upload Document
                        </h5>

                        <div className="grid grid-cols-2 gap-4">
                          <div
                            onMouseEnter={() => setHovered("aadhaar")}
                            onMouseLeave={() => setHovered(null)}
                            className="relative   border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                          >
                            {aadhaarFile && isImage(aadhaarFile) ? (
                              <img
                                src={URL.createObjectURL(aadhaarFile)}
                                className="h-24 mx-auto rounded object-cover"
                              />
                            ) : (
                              <DocumentUpload
                                size="24"
                                className="mx-auto text-gray-500 mb-2"
                              />
                            )}

                            <p className="text-sm font-medium mt-2 truncate">
                              {aadhaarFile ? aadhaarFile.name : "Aadhaar Card"}
                            </p>

                            <p className="text-xs text-gray-400">
                              JPG, PNG up to 10MB
                            </p>

                            <label className="absolute inset-0 cursor-pointer">
                              <input
                                type="file"
                                accept="image/png, image/jpeg"
                                onChange={(e) =>
                                  setAadhaarFile(e.target.files[0])
                                }
                                className="hidden"
                              />
                            </label>

                            {aadhaarFile && hovered === "aadhaar" && (
                              <div
                                onClick={handleDeleteAadhaar}
                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md cursor-pointer"
                              >
                                <Trash size="16" color="#EF4444" />
                              </div>
                            )}
                          </div>

                          <div
                            onMouseEnter={() => setHovered("pan")}
                            onMouseLeave={() => setHovered(null)}
                            className="relative group border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                          >
                            {panFile && isImage(panFile) ? (
                              <img
                                src={URL.createObjectURL(panFile)}
                                className="h-24 mx-auto rounded object-cover"
                              />
                            ) : (
                              <DocumentUpload
                                size="24"
                                className="mx-auto text-gray-500 mb-2"
                              />
                            )}

                            <p className="text-sm font-medium mt-2 truncate">
                              {panFile ? panFile.name : "Pan Card Copy"}
                            </p>

                            <p className="text-xs text-gray-400">
                              PDF, JPG up to 10MB
                            </p>

                            <label className="absolute inset-0 cursor-pointer">
                              <input
                                type="file"
                                accept="image/png, image/jpeg, application/pdf"
                                onChange={(e) => setPanFile(e.target.files[0])}
                                className="hidden"
                              />
                            </label>

                            {panFile && hovered === "pan" && (
                              <div
                                onClick={handleDeletePan}
                                className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md cursor-pointer"
                              >
                                <Trash size="16" color="#EF4444" />
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="mt-2 text-xs text-[#623C00] bg-yellow-50 p-2 rounded  flex items-center  gap-1">
                          <AiOutlineExclamationCircle
                            color="#795216"
                            size="16"
                            className=" flex-shrink-0"
                          />
                          Identity documents are encrypted and stored securely.
                          Verification typically takes 2-4hours after
                          submission.
                        </div>
                      </div>

                      <div>
                        <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                          <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                          Guardian Details
                        </h5>
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-12">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Guardian Full Name
                            </label>
                            <input
                              value={guardianName}
                              onChange={(e) => setGuardianName(e.target.value)}
                              placeholder="Guardian Full Name"
                              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Relationship to Tenant
                            </label>
                            <Select
                              options={relationOptions}
                              value={relationship}
                              onChange={setRelationship}
                              placeholder="Select Relationship"
                              styles={CustomStyles}
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Guardian Occupation
                            </label>
                            <Select
                              options={relationOptions}
                              value={occupation}
                              onChange={setOccupation}
                              placeholder="Select Occupation"
                              styles={CustomStyles}
                            />
                          </div>

                          <div className="col-span-12">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Mobile No
                            </label>
                            <input
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              placeholder="Mobile No"
                              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                            />
                          </div>
                        </div>

                        <div className="flex justify-end mt-2">
                          <button
                            disabled
                            className="!font-gilroy text-sm !bg-[#1E45E1] text-white !font-semibold !rounded-md !py-2.5 
                          px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap flex items-center gap-2 disabled:opacity-50"
                          >
                            <AddCircle size="16" color="#FFFFFF" /> Additional
                          </button>
                        </div>
                      </div>

                      <div>
                        <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                          <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                          Job Details
                        </h5>
                        <div className="grid grid-cols-12 gap-3">
                          <div className="col-span-12">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Employment Status
                            </label>
                            <Select
                              options={jobOptions}
                              value={employmentStatus}
                              onChange={setEmploymentStatus}
                              placeholder="Employment Status"
                              styles={CustomStyles}
                            />
                          </div>

                          <div className="col-span-12">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Company/College Name
                            </label>
                            <input
                              value={companyName}
                              onChange={(e) => setCompanyName(e.target.value)}
                              placeholder="Company / College Name"
                              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Job Role
                            </label>
                            <Select
                              options={jobOptions}
                              value={jobRole}
                              onChange={setJobRole}
                              placeholder="Job Role"
                              styles={CustomStyles}
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Work Location
                            </label>
                            <input
                              value={workLocation}
                              onChange={(e) => setWorkLocation(e.target.value)}
                              placeholder="Work Location"
                              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                            />
                          </div>

                          <div className="col-span-12">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Shift Type
                            </label>
                            <Select
                              options={jobOptions}
                              value={shiftType}
                              onChange={setShiftType}
                              placeholder="Shift Type"
                              styles={CustomStyles}
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              Shift From
                            </label>
                            <input
                              type="time"
                              value={fromTime}
                              onChange={(e) => setFromTime(e.target.value)}
                              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                            />
                          </div>

                          <div className="col-span-6">
                            <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                              To
                            </label>
                            <input
                              type="time"
                              value={toTime}
                              onChange={(e) => setToTime(e.target.value)}
                              className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-4">
                        <button
                          className="bg-gray-200 text-gray-600 px-4 py-2 rounded !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                          onClick={handlePrevious}
                        >
                          Previous
                        </button>

                        <div className="flex gap-2">
                          <button
                            disabled={formLoading || isAlredayTenant}
                            className="!font-gilroy text-sm !bg-[#1E45E1] text-white !font-semibold !rounded-md !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                            onClick={handleSaveUserlist}
                          >
                            Save Draft
                          </button>
                          <button
                            className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                            onClick={() => setStep(3)}
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && <AddTenantBookingCheckin />}
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
    </>
  );
}

AddTenant.propTypes = {
  currentItem: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  setShowAddCustomer: PropTypes.func.isRequired,
  onclickdata: PropTypes.func.isRequired,
};
export default AddTenant;

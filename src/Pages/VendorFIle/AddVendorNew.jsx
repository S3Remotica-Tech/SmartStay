/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl } from "react-bootstrap";
import { CloseCircle, Add } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
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
    fontWeight: 600,
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

const CustomStylesCode = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "50px",
    border: "1px solid #D9D9D9",
    borderRight: "none",

    borderTopLeftRadius: "8px",
    borderBottomLeftRadius: "8px",
    borderTopRightRadius: "0",
    borderBottomRightRadius: "0",

    fontSize: "15px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: "#FFF",

    "&:hover": {
      border: "1px solid #D9D9D9",
      borderRight: "none",
    },
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 600,
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

function AddVendorNew() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [vendor_Mobile, setVendor_Mobile] = useState("");
  const [vendorCategory, setVendorCategory] = useState(null);
  // const [address, setAddress] = useState("");
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state_name, setStateName] = useState("");
  const [email_Id, setEmail_Id] = useState("");
  const [business_Name, setBusiness_Name] = useState("");
  // const [id, setId] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const location = useLocation();
  const [check, setCheck] = useState(null);
  const [generalError, setGeneralError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const countryList = [{ value: 1, label: "India" }];
  const countryCodeOptions = [{ value: "91", label: "+91" }];
  const [isChangedError, setIsChangedError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");
  const [countryCode, setCountryCode] = useState(countryCodeOptions[0]);
  const [businessCountryCode, setBusinessCountryCode] = useState(
    countryCodeOptions[0],
  );
  const [businessMobile, setBusinessMobile] = useState("");
  const [vendorPhoneError, setVendorPhoneError] = useState("");
  const [vendorEmailError, setVendorEmailError] = useState("");

  const [streetError, setStreetError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonNameError, setContactPersonNameError] = useState("");
  const contactPersonNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const mobileRef = useRef(null);
  const businessNameRef = useRef(null);
  const cityRef = useRef(null);
  const pinCodeRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [vendorCode, setVendorCode] = useState("VEN 006");
  const [allowCreditPurchase, setAllowCreditPurchase] = useState(true);
  const [creditLimit, setCreditLimit] = useState("");
  const [creditPeriod, setCreditPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const countryCodeRef = useRef(null);
  const emailRef = useRef(null);
  const houseNoRef = useRef(null);
  const landmarkRef = useRef(null);
  const streetRef = useRef(null);
  const vendorCategoryRef = useRef(null);
  const businessCountryCodeRef = useRef(null);
  const businessMobileRef = useRef(null);
  const contactPersonRef = useRef(null);
  const descriptionRef = useRef(null);

  const [vendorCategoryError, setVendorCategoryError] = useState("");

  const [businessNameError, setBusinessNameError] = useState("");
  const [businessCountryCodeError, setBusinessCountryCodeError] = useState("");
  const [businessMobileError, setBusinessMobileError] = useState("");

  console.log("businessCountryCodeError", businessCountryCodeError);
  console.log("countryCode:", countryCode);
  console.log("businessCountryCode:", businessCountryCode);
  const [houseNoError, setHouseNoError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");

  const focusFirstError = (() => {
    let focused = false;

    return (ref) => {
      if (!focused && ref?.current) {
        ref.current.focus();
        focused = true;
      }
    };
  })();

  const currentItem = location.state?.currentItem || "";

  useEffect(() => {
    return () => {
      setGeneralError("");

      setFirstNameError("");
      // setLastNameError("");

      setVendorCategoryError("");

      setBusinessNameError("");
      setBusinessCountryCodeError("");
      setBusinessMobileError("");

      setContactPersonNameError("");

      setCountryCodeError("");
      setMobileError("");
      setEmailError("");

      setHouseNoError("");
      setLandmarkError("");
      setStreetError("");

      setCityError("");
      setStateNameError("");
      setCountryError("");
      setPinCodeError("");

      setDescriptionError("");
    };
  }, []);

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };
  useEffect(() => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);

  // const handleCountryChange = (e) => {
  //   const value = e.target.value
  //   const pattern = /^[a-zA-Z\s]*$/;
  //   if (!pattern.test(value)) {
  //     return;
  //   }
  //   setCountry(value);

  // };

  const handleGstNumberChange = (e) => {
    setGstNumber(e.target.value);
  };

  const handlePanNumberChange = (e) => {
    setPanNumber(e.target.value);
  };

  const handleStateChange = (selectedOption) => {
    setStateName(selectedOption);
  };

  const handleCreditLimitChange = (e) => {
    setCreditLimit(e.target.value);
  };

  const handleCreditPeriodChange = (e) => {
    setCreditPeriod(e.target.value);
  };

  const handleCreditPurchaseToggle = () => {
    setAllowCreditPurchase((prev) => !prev);
  };

  const handleVendorCategoryChange = (selectedOption) => {
    setVendorCategory(selectedOption);
    setVendorCategoryError("");
  };

  const handleContactPersonNameChange = (e) => {
    setContactPersonName(e.target.value);
    setContactPersonNameError("");
  };

  const handleBusinessMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setBusinessMobile(value);
    setBusinessMobileError("");
  };

  const handleBusinessCountryCodeChange = (e) => {
    setBusinessCountryCode(e.target.value);
    setBusinessCountryCodeError("");
  };

  const handlePinCodeChange = (e) => {
    const value = e.target.value;

    if (!/^\d{0,6}$/.test(value)) {
      return;
    }

    setPinCode(value);

    if (value.length > 0 && value.length < 6) {
      setPinCodeError("Pin Code Must Be Exactly 6 Digits");
    } else {
      setPinCodeError("");
    }

    setGeneralError("");
    setIsChangedError("");
  };

  // const regex = /^[a-zA-Z0-9 .,'\-\/\\#()&:]*$/;

  const regex = /^[a-zA-Z0-9 .,'/\\#()&:-]*$/;

  const handleHouseNo = (e) => {
    const value = e.target.value;

    if (!regex.test(value)) {
      return;
    }

    setHouseNo(value);
    setHouseNoError("");
    setGeneralError("");
    setIsChangedError("");
  };

  const handleStreetName = (e) => {
    const value = e.target.value;

    if (!regex.test(value)) {
      return;
    }
    setStreet(value);
    setStreetError("");
    setGeneralError("");
    setIsChangedError("");
  };

  const handleLandmark = (e) => {
    const value = e.target.value;

    if (!regex.test(value)) {
      return;
    }
    setLandmark(value);
    setLandmarkError("");
    setGeneralError("");
    setIsChangedError("");
  };

  const handleCity = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
      setGeneralError("");
      setIsChangedError("");
    }
  };

  const handleClose = () => {
    // setShow(false);
    navigate(`/vendor/new/${state.login.selectedHostel_Id}`);

    setVendorPhoneError("");
    setVendorEmailError("");
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
  };

  const handleBusinessChange = (e) => {
    const value = e.target.value;

    setGeneralError("");
    setIsChangedError("");
    setBusinessNameError("");

    setBusiness_Name(value);
  };

  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];

    if (fileImage) {
      setFile(fileImage);
    }
  };

  const handleFirstNameChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstNameError("");
    setGeneralError("");
    setIsChangedError("");

    if (value === "") {
      setFirst_Name(value);

      return;
    }

    if (value.trim() !== "") {
      setFirst_Name(value);
    }
  };

  const handleLastNameChange = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    if (value === "") {
      setLast_Name(value);

      return;
    }
    if (value.trim() !== "") {
      setLast_Name(value);
    }
    setIsChangedError("");
  };

  const handleMobileChange = (e) => {
    const input = e.target.value;
    const numericInput = input.replace(/\D/g, "");
    setVendor_Mobile(numericInput);

    if (input.length === 0) {
      setMobileError("");
    } else if (!/^\d{10}$/.test(numericInput)) {
      setMobileError("Please Enter valid Mobile No");
    } else {
      setMobileError("");
    }

    setVendorPhoneError("");
    setGeneralError("");
    setCountryCodeError("");
    setIsChangedError("");
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
  };

  const handleEmailChange = (e) => {
    const email = e.target.value.toLowerCase();
    setEmail_Id(email);
    setGeneralError("");
    setIsChangedError("");
    setEmailError("");
    setVendorEmailError("");
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });

    if (email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(email);
      if (isValidEmail) {
        setEmailError("");
      } else {
        setEmailError("Please Enter valid Email Id");
      }
    }
  };

  const handleAddVendor = () => {
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
    setFirstNameError("");
    setVendorCategoryError("");
    setBusinessMobileError("");
    setBusinessCountryCodeError("");
    setContactPersonNameError("");
    setMobileError("");
    setCountryCodeError("");
    setEmailError("");
    setHouseNoError("");
    setLandmarkError("");
    setCityError("");
    setStateNameError("");
    setPinCodeError("");
    setDescriptionError("");
    setBusinessNameError("");
    setStreetError("");
    setCountryError("");
    setGeneralError("");

    let isValid = true;
    const focusedRef = { current: false };

    if (
      !first_Name &&
      !vendor_Mobile &&
      !business_Name &&
      !countryCode &&
      !city &&
      !state_name &&
      !country &&
      !pinCode
    ) {
      setGeneralError("Please fill in all the Required Fields");
      isValid = false;
    }

    if (!first_Name) {
      setFirstNameError("Please Enter First Name/ Business Name");
      if (!focusedRef.current && firstNameRef.current) {
        firstNameRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!countryCode) {
      setCountryCodeError("Please Select Country Code");
      if (!focusedRef.current) {
        focusedRef.current = true;
      }
      isValid = false;
    }

    const phonePattern = /^(?!0{10})[1-9][0-9]{9}$/;

    if (!vendor_Mobile) {
      setMobileError("Please Enter Mobile Number");
      if (!focusedRef.current && mobileRef.current) {
        mobileRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (!phonePattern.test(vendor_Mobile)) {
      setMobileError("Enter Valid Mobile Number");
      if (!focusedRef.current && mobileRef.current) {
        mobileRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else {
      setMobileError("");
    }

    if (!business_Name) {
      setBusinessNameError("Please Enter Business Name");
      if (!focusedRef.current && businessNameRef.current) {
        businessNameRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!vendorCategory) {
      setVendorCategoryError("Please Select Vendor Category");
      if (!focusedRef.current && vendorCategoryRef.current) {
        vendorCategoryRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!businessCountryCode) {
      setBusinessCountryCodeError("Please Select Business Country Code");
      if (!focusedRef.current && businessCountryCodeRef.current) {
        businessCountryCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!businessMobile) {
      setBusinessMobileError("Please Enter Business Mobile Number");
      if (!focusedRef.current && businessMobileRef.current) {
        businessMobileRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (!phonePattern.test(businessMobile)) {
      setBusinessMobileError("Enter Valid Business Mobile Number");
      if (!focusedRef.current && businessMobileRef.current) {
        businessMobileRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!contactPersonName?.trim()) {
      setContactPersonNameError("Please Enter Contact Person Name");
      if (!focusedRef.current && contactPersonNameRef.current) {
        contactPersonNameRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!email_Id) {
      setEmailError("Please Enter  Email Id");
      if (!focusedRef.current) {
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!house_no?.trim()) {
      setHouseNoError("Please Enter House No");
      if (!focusedRef.current && houseNoRef.current) {
        houseNoRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!landmark?.trim()) {
      setLandmarkError("Please Enter Landmark");
      if (!focusedRef.current && landmarkRef.current) {
        landmarkRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!street?.trim()) {
      setStreetError("Please Enter Street");
      if (!focusedRef.current && streetRef.current) {
        streetRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!city) {
      setCityError("Please Enter City");
      if (!focusedRef.current && cityRef.current) {
        cityRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!pinCode) {
      setPinCodeError("Please Enter Pincode");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (!/^\d+$/.test(String(pinCode))) {
      setPinCodeError("Pin Code Must Be Numeric");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (String(pinCode).length !== 6) {
      setPinCodeError("Pin Code Must Be Exactly 6 Digits");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (pinCode === "000000") {
      setPinCodeError("Pin Code cannot be all zeros");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (String(pinCode)[0] === "0") {
      setPinCodeError("Pin Code cannot start with 0");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (String(pinCode).slice(-3) === "000") {
      setPinCodeError("Last 3 digits cannot be 000");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else {
      setPinCodeError("");
    }

    if (!state_name) {
      setStateNameError("Please Select State");
      if (!focusedRef.current && stateRef.current) {
        stateRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!country) {
      setCountryError("Please Enter Country");
      if (!focusedRef.current && countryRef.current) {
        countryRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    const normalize = (value) => {
      const val = (value ?? "").toString().trim().toLowerCase();
      return val === "null" || val === "undefined" ? "" : val;
    };
    if (!isValid) {
      return;
    }

    dispatch({
      type: "ADDVENDOR",
      payload: {
        profilePic: file,
        payLoads: {
          firstName: first_Name,
          lastName: last_Name,
          countryCode:
            typeof countryCode === "object" ? countryCode.value : countryCode,

          mobile: vendor_Mobile,
          mailId: email_Id,

          houseNo: house_no,
          landmark: landmark,
          area: street,
          pinCode: Number(pinCode),
          city: city,
          state: state_name,

          businessName: business_Name,
          hostelId: state.login.selectedHostel_Id,

          vendorCategory: vendorCategory?.value ?? null,

          contactPerson: contactPersonName,
          description: description,

          vendorCode: vendorCode,
          gst: gstNumber,
          pan: panNumber,

          allowCredit: allowCreditPurchase,
          creditLimit: Number(creditLimit || 0),
          creditPeriod: Number(creditPeriod || 0),
        },
      },
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (
      state.ComplianceList.addVendorSuccessStatusCode === 201 ||
      state.ComplianceList.updateVendorSuccessStatusCode === 201
    ) {
      setFormLoading(false);
      setFile("");
      setFirst_Name("");
      setLast_Name("");
      setVendor_Mobile("");
      setEmail_Id("");
      setBusiness_Name("");
      setHouseNo("");
      setStreet("");
      setLandmark("");
      setCity("");
      setPinCode("");
      setStateName("");
    }
  }, [
    state.ComplianceList.addVendorSuccessStatusCode,
    state.ComplianceList.updateVendorSuccessStatusCode,
  ]);

  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]',
    );
    if (closeButton) {
      closeButton.style.backgroundColor = "white";
      closeButton.style.borderRadius = "50%";
      closeButton.style.width = "10px";
      closeButton.style.height = "10px";
      closeButton.style.border = "1.5px solid #000000";
      closeButton.style.padding = "9px";
    }
  }, []);

  // useEffect(() => {
  //   if (currentItem) {
  //     // const phoneNumber = String(currentItem.mobile || "");
  //     // const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);

  //     // const mobileNumber = phoneNumber.slice(-10);

  //     const emailValue = currentItem.emailId;
  //     const normalizedEmail =
  //       emailValue === "undefined" ||
  //       emailValue === null ||
  //       emailValue === undefined
  //         ? ""
  //         : emailValue;

  //     const sanitize = (value) => {
  //       return value === null ||
  //         value === undefined ||
  //         value === "null" ||
  //         value === "undefined"
  //         ? ""
  //         : value;
  //     };

  //     setCheck("EDIT");
  //     setFirst_Name(currentItem.firstName);
  //     setLast_Name(currentItem.lastName);
  //     const mobile = currentItem?.mobile || "";
  //     const countryCode =
  //       currentItem?.countryCode ||
  //       (mobile.length > 10 ? `${mobile.slice(0, -10)}` : "+91");

  //     const phoneNumber = mobile.length > 10 ? mobile.slice(-10) : mobile;

  //     setCountryCode(countryCode);
  //     setVendor_Mobile(phoneNumber);

  //     setEmail_Id(normalizedEmail);

  //     setBusiness_Name(currentItem.businessName);

  //     setFile(currentItem.profilePic ? currentItem.profilePic : null);
  //     setCountry(currentItem.countryId);
  //     setPinCode(currentItem.pinCode);

  //     setHouseNo(sanitize(currentItem.houseNo));
  //     setStreet(sanitize(currentItem.area));
  //     setLandmark(sanitize(currentItem.landMark));
  //     setCity(currentItem.city);
  //     setStateName(currentItem.state);

  //     setInitialState({
  //       first_Name: currentItem.firstName || "",
  //       last_Name: currentItem.lastName || "",
  //       vendor_Mobile: currentItem?.mobile || "",
  //       countryCode: currentItem?.countryCode || "",

  //       house_no: sanitize(currentItem.houseNo),
  //       street: sanitize(currentItem.area),
  //       city: sanitize(currentItem.city),
  //       landmark: sanitize(currentItem.landMark),
  //       state: sanitize(currentItem.state),

  //       email_Id: normalizedEmail,
  //       business_Name: sanitize(currentItem.businessName),

  //       file: currentItem.profilePic ? currentItem.profilePic : null,
  //       country: currentItem.countryId || "",
  //       pinCode: currentItem.pinCode || "",
  //     });
  //   }
  // }, [currentItem]);

  useEffect(() => {
    if (state.ComplianceList?.alreadyVendorHere) {
      setFormLoading(false);
      setVendorPhoneError(state.ComplianceList?.alreadyVendorHere);
    }
  }, [state.ComplianceList?.alreadyVendorHere]);

  useEffect(() => {
    if (state.ComplianceList.alreadyVendorEmailError) {
      setFormLoading(false);
      setVendorEmailError(state.ComplianceList.alreadyVendorEmailError);
    }
  }, [state.ComplianceList.alreadyVendorEmailError]);

  const [initialState, setInitialState] = useState({
    first_Name: "",
    last_Name: "",
    vendor_Mobile: "",
    address: "",
    house_no: "",
    street: "",
    city: "",
    landmark: "",
    state: "",
    email_Id: "",
    business_Name: "",
    file: null,
    country: "",
    pinCode: "",
  });

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div className="block relative font-gilroy ">
      <div className="relative w-full  bg-white  ">
        <div className="flex items-center justify-between  p-2">
          <h2 className="text-[18px] text-[#222222] font-gilroy font-semibold">
            {check === "EDIT" ? "Edit a vendor" : "Add new Vendor"}
          </h2>

          <button
            onClick={handleClose}
            className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 items-center px-2 py-1 font-gilroy "
          >
            <Add
              size="24"
              color="#FF0000"
              className="cursor-pointer rotate-45"
            />{" "}
            Close
          </button>
        </div>
        <div className="max-h-[570px] overflow-y-scroll pt-2 mt-2 mr-3 show-scrolls">
          <h5 className="flex items-center text-[18px] font-semibold text-[#222222]">
            <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
            Vendor Information
          </h5>

          <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-4">
            <div className=" lg:col-span-8">
              <div>
                <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                  Vendor / Business Name{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <input
                  onChange={handleFirstNameChange}
                  value={first_Name}
                  ref={firstNameRef}
                  type="text"
                  placeholder="Enter First Name"
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    first_Name ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />
                <span className="text-xs py-2 text-[#64748B]">
                  Note : Max 50 Characters
                </span>
              </div>

              {firstNameError && (
                <ErrorMessage message={firstNameError} type="error" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-4 gap-y-3">
            <div className="lg:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Vendor Category{" "}
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <Select
                ref={vendorCategoryRef}
                // options={vendorCategoryOptions}
                value={vendorCategory}
                onChange={handleVendorCategoryChange}
                placeholder="Select"
                classNamePrefix="custom"
                styles={CustomStyles}
              />
              {vendorCategoryError && (
                <ErrorMessage message={vendorCategoryError} type="error" />
              )}
            </div>
            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Business Mobile No
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <div className="flex mt-1">
                  <Select
                    ref={businessCountryCodeRef}
                    options={countryCodeOptions}
                    value={businessCountryCode}
                    onChange={(selectedOption) =>
                      setBusinessCountryCode(selectedOption)
                    }
                    isSearchable={false}
                    styles={CustomStylesCode}
                  />

                  <input
                    value={businessMobile}
                    onChange={handleBusinessMobileChange}
                    type="text"
                    ref={businessMobileRef}
                    placeholder="9876543210"
                    maxLength={10}
                    className={`flex-1 h-[50px] px-3 border border-l-0 border-[#D9D9D9] rounded-r-[8px] text-[15px] text-[#4B4B4B] font-gilroy ${
                      businessMobile ? "font-semibold" : "font-medium"
                    } focus:outline-none focus:ring-0`}
                  />
                </div>

                {businessMobileError && (
                  <ErrorMessage message={businessMobileError} type="error" />
                )}

                {businessCountryCodeError && (
                  <ErrorMessage
                    message={businessCountryCodeError}
                    type="error"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-3">
            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Proprietor / Contact Person Name
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <input
                  value={contactPersonName}
                  onChange={handleContactPersonNameChange}
                  type="text"
                  ref={contactPersonNameRef}
                  placeholder="Enter Proprietor / Contact Person Name"
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    contactPersonName ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />

                {contactPersonNameError && (
                  <ErrorMessage message={contactPersonNameError} type="error" />
                )}
              </div>
            </div>
            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Mobile Number{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <div className="flex mt-1">
                  <Select
                    ref={countryCodeRef}
                    options={countryCodeOptions}
                    value={countryCode}
                    onChange={(selectedOption) =>
                      setCountryCode(selectedOption)
                    }
                    isSearchable={false}
                    styles={CustomStylesCode}
                  />

                  <input
                    value={vendor_Mobile}
                    ref={mobileRef}
                    onChange={handleMobileChange}
                    type="text"
                    placeholder="9876543210"
                    maxLength={10}
                    className={`flex-1 h-[50px] px-3 border border-l-0 border-[#D9D9D9] rounded-r-[8px] text-[15px] text-[#4B4B4B] font-gilroy ${
                      vendor_Mobile ? "font-semibold" : "font-medium"
                    } focus:outline-none focus:ring-0`}
                  />
                </div>

                {mobileError && (
                  <ErrorMessage message={mobileError} type="error" />
                )}

                {countryCodeError && (
                  <ErrorMessage message={countryCodeError} type="error" />
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-4 gap-y-3 mb-3">
            <div className="lg:col-span-8">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Email Address{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <input
                  ref={emailRef}
                  value={email_Id}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="Enter Email ID"
                  className={`w-full h-[50px] px-3 border border-[#D9D9D9] rounded-[8px] text-[15px] text-[#4B4B4B] font-gilroy ${
                    email_Id ? "font-semibold" : "font-medium"
                  } focus:outline-none focus:ring-0`}
                />

                {emailError && (
                  <ErrorMessage message={emailError} type="error" />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-3">
            <div className="lg:col-span-8">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Commercial Address (No, Area/Street, Sector){" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <textarea
                  ref={houseNoRef}
                  value={house_no}
                  onChange={handleHouseNo}
                  placeholder="Enter Commercial Address"
                  rows={4}
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    house_no ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] rounded-[8px] px-3 py-3 resize-none focus:outline-none focus:ring-0`}
                />
              </div>

              {houseNoError && (
                <ErrorMessage message={houseNoError} type="error" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-4 gap-y-3 ">
            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Landmark{" "}
                  <span className="text-transparent text-[20px] select-none ">
                    *
                  </span>
                </label>

                <input
                  ref={landmarkRef}
                  type="text"
                  placeholder="E.g, near Apollo Hospital"
                  value={landmark}
                  onChange={handleLandmark}
                  className={`w-full h-[50px] rounded-[8px] border border-[#D9D9D9] px-3 text-[15px] text-[#4B4B4B] font-gilroy ${
                    landmark ? "font-semibold" : "font-medium"
                  } focus:outline-none focus:ring-0`}
                />
              </div>

              {landmarkError && (
                <ErrorMessage message={landmarkError} type="error" />
              )}
            </div>

            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Town/City <span className="text-red-600 text-[20px]">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Enter City"
                  value={city}
                  ref={cityRef}
                  onChange={handleCity}
                  className={`w-full h-[50px] rounded-[8px] border border-[#D9D9D9] px-3 text-[16px] text-[#4B4B4B] font-gilroy ${
                    city ? "font-semibold" : "font-medium"
                  } focus:outline-none focus:ring-0`}
                />
              </div>

              {cityError && <ErrorMessage message={cityError} type="error" />}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-4 gap-y-3 ">
            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  State
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <Select
                  options={indianStates}
                  ref={stateRef}
                  value={
                    state_name ? { value: state_name, label: state_name } : null
                  }
                  onChange={(selectedOption) =>
                    setStateName(selectedOption?.value)
                  }
                  placeholder="Select State"
                  classNamePrefix="custom"
                  styles={CustomStyles}
                />
              </div>

              {!state_name && state_nameError && (
                <ErrorMessage message={state_nameError} type="error" />
              )}
            </div>
            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Pincode
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <input
                  value={pinCode}
                  ref={pinCodeRef}
                  onChange={handlePinCodeChange}
                  type="tel"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter Pincode"
                  className={`w-full h-[50px] rounded-[8px] border border-[#D9D9D9] px-3 text-[15px] text-[#4B4B4B] font-gilroy ${
                    pinCode ? "font-semibold" : "font-medium"
                  } focus:outline-none focus:ring-0`}
                />

                {pinCodeError && (
                  <ErrorMessage message={pinCodeError} type="error" />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-3">
            <div className="lg:col-span-8">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Description
              </label>

              <textarea
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Ex : Wifi Bill Paid for May"
                rows={3}
                className={`w-full rounded-[8px] border border-[#D9D9D9] px-3 py-3 text-[15px] text-[#4B4B4B] font-gilroy ${
                  description ? "font-semibold" : "font-medium"
                } resize-none focus:outline-none focus:ring-0`}
              />

              {descriptionError && (
                <ErrorMessage message={descriptionError} type="error" />
              )}
            </div>
          </div>

          <div className="mt-6">
            <h5 className="flex items-center text-[18px] font-semibold text-[#222222]">
              <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
              Business Details
            </h5>

            <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-3 ">
              <div className="lg:col-span-4">
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  GST Number (Optional)
                </label>

                <input
                  type="text"
                  value={gstNumber}
                  onChange={handleGstNumberChange}
                  placeholder="Enter GST Number"
                  className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3  text-[15px] focus:outline-none"
                />
              </div>

              <div className="lg:col-span-4">
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  PAN Number (Optional)
                </label>

                <input
                  type="text"
                  value={panNumber}
                  onChange={handlePanNumberChange}
                  placeholder="Enter PAN Number"
                  className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3  text-[15px] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-3">
              <div className="lg:col-span-8">
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Vendor Code
                </label>

                <input
                  value={vendorCode}
                  readOnly
                  className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3 bg-[#F8F8F8]  text-[15px]"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={allowCreditPurchase}
                  onChange={handleCreditPurchaseToggle}
                  className="mt-1 accent-[#1E45E1]"
                />
                <div>
                  <div>
                    <label className="text-[13px] font-medium text-[#222222]">
                      Allow Credit Purchases
                    </label>
                  </div>
                  <div>
                    <label className="text-[11px] text-[#8A8A8A]">
                      It's like similar to debt purchase and will pay later
                    </label>
                  </div>
                </div>
              </label>
            </div>

            {allowCreditPurchase && (
              <>
                <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-3">
                  <div className="lg:col-span-4">
                    <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                      Credit Limit ₹ INR (Optional)
                    </label>

                    <input
                      type="number"
                      value={creditLimit}
                      onChange={handleCreditLimitChange}
                      placeholder="Enter the amount limit"
                      className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3  text-[15px] focus:outline-none"
                    />
                  </div>

                  <div className="lg:col-span-4">
                    <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                      Credit Period (Optional)
                    </label>

                    <input
                      type="number"
                      value={creditPeriod}
                      onChange={handleCreditPeriodChange}
                      placeholder="Enter the days"
                      className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3  text-[15px] focus:outline-none"
                    />
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-[#7B7B7B]">
                  Note: Create the Credit Limit for the Vendor which avoids the
                  exemption of the Credit Balance.
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 my-10 mr-4">
          <button
            onClick={handleClose}
            type="button"
            className="text-[#4B4B4B] text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={formLoading}
            onClick={handleAddVendor}
            className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${
              formLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {formLoading ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              </>
            ) : (
              <span>{check === "EDIT" ? "Save Changes" : "Save Vendor"}</span>
            )}
          </button>
        </div>
        {formLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-[40px] h-[40px] rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddVendorNew;

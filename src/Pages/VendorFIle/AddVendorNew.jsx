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
import VendorOverView from "./VendorOverView";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  // const [first_Name, setFirst_Name] = useState("");
  const [vendorName, setVendorName] = useState("");
  const [vendorNameError, setVendorNameError] = useState("");
  const vendorNameRef = useRef(null);
  const [last_Name, setLast_Name] = useState("");
  const [vendor_Mobile, setVendor_Mobile] = useState("");
  const [vendorCategory, setVendorCategory] = useState(null);
  // console.log("vendorCategory", vendorCategory);
  // const [address, setAddress] = useState("");
  const [house_no, setHouseNo] = useState("");
  // const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state_name, setStateName] = useState("");
  const [email_Id, setEmail_Id] = useState("");
  const [businessName, setBusinessName] = useState("");
  // const [id, setId] = useState("");
  // const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");
  const location = useLocation();
  const [initialVendorData, setInitialVendorData] = useState(null);
  const [check, setCheck] = useState(null);
  const [generalError, setGeneralError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [gstError, setGstError] = useState("");
  const [panError, setPanError] = useState("");
  const countryCodeOptions = [{ value: "91", label: "+91" }];

  const [countryCode, setCountryCode] = useState();
  const [businessCountryCode, setBusinessCountryCode] = useState();

  console.log(
    "countryCode",
    countryCode,
    "businessCountryCode",
    businessCountryCode,
  );

  const [isChangedError, setIsChangedError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [pinCodeError, setPinCodeError] = useState("");

  const [businessMobile, setBusinessMobile] = useState("");
  // const [vendorPhoneError, setVendorPhoneError] = useState("");
  const [vendorEmailError, setVendorEmailError] = useState("");

  // const [streetError, setStreetError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [contactPersonName, setContactPersonName] = useState("");
  const [contactPersonNameError, setContactPersonNameError] = useState("");
  const contactPersonNameRef = useRef(null);
  // const firstNameRef = useRef(null);
  const mobileRef = useRef(null);
  const businessNameRef = useRef(null);
  const cityRef = useRef(null);
  const pinCodeRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");
  // const [vendorCode, setVendorCode] = useState("");
  const [allowCreditPurchase, setAllowCreditPurchase] = useState(false);
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
  const [noChanges, setNochanges] = useState("");
  const [vendorCategoryError, setVendorCategoryError] = useState("");

  const [businessNameError, setBusinessNameError] = useState("");
  const [businessCountryCodeError, setBusinessCountryCodeError] = useState("");
  const [businessMobileError, setBusinessMobileError] = useState("");

  const [houseNoError, setHouseNoError] = useState("");
  // const [landmarkError, setLandmarkError] = useState("");

  useEffect(() => {
    if (state?.Settings?.vendorCategorySuccessCode === 200) {
      const category = state?.Settings?.vendorCategoryList;

      if (!category) return;

      if (category.length === 0) {
        toast.error(
          "Please add a Category option in Settings, accessible after adding an vendor",
          {
            style: {
              fontFamily: "Gilroy, sans-serif",
            },
          },
        );
      }
      setTimeout(() => {
        dispatch({ type: "REMOVE_VENDOR_CATEGORY_LIST_REDUCER" });
      }, 100);
    }
  }, [state?.Settings?.vendorCategorySuccessCode]);

  const vendorCategoryOptions =
    state?.Settings?.vendorCategoryList?.map((item) => ({
      value: item.id,
      label: item.categoryName,
    })) || [];

  const handleVendorNameChange = (e) => {
    setNochanges("");
    const value = e.target.value;

    if (value.length <= 50) {
      setVendorName(value);
      setVendorNameError("");
    }
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "VENDOR_CATEGORY_LIST_SAGA",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, [state.login.selectedHostel_Id]);

  const focusFirstError = (() => {
    let focused = false;

    return (ref) => {
      if (!focused && ref?.current) {
        ref.current.focus();
        focused = true;
      }
    };
  })();

  const currentItem = location.state?.currentItem || {};
  const checkMode = location.state?.check;

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

      // setStreetError("");

      setCityError("");
      setStateNameError("");
      setCountryError("");
      setPinCodeError("");

      setDescriptionError("");
    };
  }, []);

  const handleDescriptionChange = (e) => {
    setNochanges("");
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (businessNameRef.current) {
      businessNameRef.current.focus();
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
    setNochanges("");
    let value = e.target.value.toUpperCase();

    value = value.replace(/[^A-Z0-9]/g, "");

    if (value.length > 15) {
      value = value.slice(0, 15);
    }

    setGstNumber(value);

    const gstRegex =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;

    if (!value) {
      setGstError("");
    } else if (value.length < 15) {
      setGstError("GST Number must be 15 characters.");
    } else if (!gstRegex.test(value)) {
      setGstError("Enter a valid GST Number.");
    } else {
      setGstError("");
    }
  };

  const handlePanNumberChange = (e) => {
    setNochanges("");
    let value = e.target.value.toUpperCase();

    value = value.replace(/[^A-Z0-9]/g, "");

    if (value.length > 10) {
      value = value.slice(0, 10);
    }

    setPanNumber(value);

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

    if (!value) {
      setPanError("");
    } else if (value.length < 10) {
      setPanError("PAN Number must be 10 characters.");
    } else if (!panRegex.test(value)) {
      setPanError("Enter a valid PAN Number.");
    } else {
      setPanError("");
    }
  };
  const handleStateChange = (selectedOption) => {
    setNochanges("");
    setStateName(selectedOption);
  };

  const handleCreditLimitChange = (e) => {
    setNochanges("");
    setCreditLimit(e.target.value);
  };

  const handleCreditPeriodChange = (e) => {
    setNochanges("");
    setCreditPeriod(e.target.value);
  };

  const handleCreditPurchaseToggle = () => {
    setNochanges("");
    setAllowCreditPurchase((prev) => !prev);
  };

  const handleVendorCategoryChange = (selectedOption) => {
    setNochanges("");
    setVendorCategory(selectedOption?.value);
    setVendorCategoryError("");
  };

  const handleContactPersonNameChange = (e) => {
    setNochanges("");
    setContactPersonName(e.target.value);
    setContactPersonNameError("");
  };

  const handleBusinessMobileChange = (e) => {
    dispatch({ type: "CLEAR_VENDOR_MOBILE_ERROR" });
    setNochanges("");
    const value = e.target.value.replace(/\D/g, "");
    setBusinessMobile(value);
    setBusinessMobileError("");
  };

  const handlePinCodeChange = (e) => {
    setNochanges("");
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
    setNochanges("");
    const value = e.target.value;

    if (!regex.test(value)) {
      return;
    }

    setHouseNo(value);
    setHouseNoError("");
    setGeneralError("");
    setIsChangedError("");
  };

  const handleLandmark = (e) => {
    setNochanges("");
    const value = e.target.value;

    if (!regex.test(value)) {
      return;
    }
    setLandmark(value);

    setGeneralError("");
    setIsChangedError("");
  };

  const handleCity = (e) => {
    setNochanges("");
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
    setNochanges("");
    // setShow(false);
    navigate(`/vendor/${state.login.selectedHostel_Id}`);

    // setVendorPhoneError("");
    setVendorEmailError("");
    dispatch({ type: "CLEAR_VENDOR_EMAIL_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
  };

  const handleBusinessChange = (e) => {
    setNochanges("");
    const value = e.target.value;
    setGeneralError("");
    setIsChangedError("");
    setBusinessNameError("");
    setBusinessName(value);
  };

  const handleMobileChange = (e) => {
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
    setNochanges("");

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

    // setVendorPhoneError("");
    setGeneralError("");
    setCountryCodeError("");
    setIsChangedError("");
  };

  const handleEmailChange = (e) => {
    setNochanges("");
    const email = e.target.value.toLowerCase();
    setEmail_Id(email);
    setGeneralError("");
    setIsChangedError("");
    setEmailError("");
    setVendorEmailError("");
    dispatch({ type: "CLEAR_VENDOR_EMAIL_ERROR" });

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

  // console.log("vendorCategory", vendorCategory);

  const handleAddVendor = () => {
    setNochanges("");
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });

    setFirstNameError("");
    setVendorCategoryError("");
    setBusinessMobileError("");
    setBusinessCountryCodeError("");
    setContactPersonNameError("");
    setMobileError("");
    setCountryCodeError("");
    setEmailError("");
    setHouseNoError("");
    setCityError("");
    setStateNameError("");
    setPinCodeError("");
    setDescriptionError("");
    setBusinessNameError("");
    setVendorNameError("");
    setCountryError("");
    setGeneralError("");

    let isValid = true;
    const focusedRef = { current: false };
    if (!vendorName?.trim()) {
      setVendorNameError("Please Enter Vendor Name");
      if (!focusedRef.current && vendorNameRef.current) {
        vendorNameRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }
    if (!businessName) {
      setBusinessNameError("Please Enter  Business Name");
      if (!focusedRef.current && businessNameRef.current) {
        businessNameRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    // if (!countryCode?.value) {
    //   setCountryCodeError("Please Select Country Code");
    //   if (!focusedRef.current) {
    //     focusedRef.current = true;
    //   }
    //   isValid = false;
    // }

    const phonePattern = /^(?!0{10})[1-9][0-9]{9}$/;

    if (!vendorCategory) {
      setVendorCategoryError("Please Select Vendor Category");
      if (!focusedRef.current && vendorCategoryRef.current) {
        vendorCategoryRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (!businessCountryCode?.value) {
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

    if (!house_no?.trim()) {
      setHouseNoError("Please Enter House No/Area/Street, Sector");
      if (!focusedRef.current && houseNoRef.current) {
        houseNoRef.current.focus();
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

    if (gstNumber && panNumber) {
      const gstPan = gstNumber.substring(2, 12);

      if (gstPan !== panNumber) {
        setGstError("GST PAN does not match the entered PAN Number.");
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    if (checkMode === "EDIT") {
      const currentData = {
        vendorName: vendorName || "",
        businessName: businessName || "",
        businessMobile: businessMobile || "",
        businessMobileCode: businessCountryCode?.value || "",
        email: email_Id || "",
        houseNo: house_no || "",
        landmark: landmark || "",
        city: city || "",
        state: state_name || "",
        pinCode: pinCode || "",
        contactPerson: contactPersonName || "",
        contactPersonMobile: vendor_Mobile || "",
        contactPersonMobileCode: countryCode?.value || "",
        description: description || "",
        gst: gstNumber || "",
        pan: panNumber || "",
        allowCredit: allowCreditPurchase,
        creditLimit: creditLimit || "",
        creditPeriod: creditPeriod || "",
        vendorCategory: vendorCategory || null,
      };
      const normalize = (obj) =>
        Object.fromEntries(
          Object.entries(obj).map(([key, value]) => [
            key,
            value === null || value === undefined ? "" : String(value).trim(),
          ]),
        );

      const hasChanges =
        JSON.stringify(currentData) !== JSON.stringify(initialVendorData);

      // if (!hasChanges) {
      //   setNochanges("No changes detected");
      //   return;
      // }

      dispatch({
        type: "UPDATEVENDOR",
        payload: {
          profilePic: file,
          updateVendor: {
            vendorId: currentItem?.apiCall?.vendorId,
            firstName: vendorName,
            lastName: last_Name,
            mobile: businessMobile,
            businessMobileCode: businessCountryCode?.value || "",
            contactPersonMobile: vendor_Mobile,
            contactPersonMobileCode: countryCode.value || "",
            mailId: email_Id,
            houseNo: house_no,
            landmark: landmark,
            pinCode: Number(pinCode),
            city: city,
            state: state_name,
            businessName: businessName,
            hostelId: state.login.selectedHostel_Id,
            vendorCategory: vendorCategory ?? null,
            contactPerson: contactPersonName,
            description: description,
            // vendorCode: vendorCode,
            gst: gstNumber,
            pan: panNumber,
            allowCredit: allowCreditPurchase,
            creditLimit: Number(creditLimit || 0),
            creditPeriod: Number(creditPeriod || 0),
          },
        },
      });
    } else {
      dispatch({
        type: "ADDVENDOR",
        payload: {
          profilePic: file,
          payLoads: {
            firstName: vendorName,
            lastName: last_Name,
            mobile: businessMobile,
            businessMobileCode: businessCountryCode?.value || "",
            contactPersonMobileCode: countryCode?.value || "",
            contactPersonMobile: vendor_Mobile,
            mailId: email_Id,
            houseNo: house_no,
            landmark: landmark,
            pinCode: Number(pinCode),
            city: city,
            state: state_name,
            businessName: businessName,
            hostelId: state.login.selectedHostel_Id,
            vendorCategory: vendorCategory ?? null,
            contactPerson: contactPersonName,
            description: description,
            // vendorCode: vendorCode,
            gst: gstNumber,
            pan: panNumber,
            allowCredit: allowCreditPurchase,
            creditLimit: Number(creditLimit || 0),
            creditPeriod: Number(creditPeriod || 0),
          },
        },
      });
    }
    setFormLoading(true);
  };

  useEffect(() => {
    if (
      state.ComplianceList.addVendorSuccessStatusCode === 201 ||
      state.ComplianceList.updateVendorSuccessStatusCode === 200
    ) {
      setFormLoading(false);
      navigate(`/vendor/${state.login.selectedHostel_Id}`);
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

  useEffect(() => {
    if (checkMode === "EDIT") {
      const vendorOverView = state.ComplianceList?.vendorOverview;

      if (!vendorOverView) return;

      setVendorName(vendorOverView.fullName || "");
      setBusinessMobile(vendorOverView.mobile || "");
      setBusinessName(vendorOverView.businessName || "");
      setEmail_Id(vendorOverView.emailId || "");

      setHouseNo(vendorOverView.houseNo || "");
      setLandmark(vendorOverView.landMark || "");
      setCity(vendorOverView.city || "");
      setStateName(vendorOverView.state || "");
      setPinCode(vendorOverView.pinCode ? String(vendorOverView.pinCode) : "");

      setContactPersonName(vendorOverView.contactPerson || "");
      setCountryCode();
      setVendor_Mobile(vendorOverView.contactPersonMobile);

      setDescription(vendorOverView.description || "");
      setGstNumber(vendorOverView.gst || "");
      setPanNumber(vendorOverView.pan || "");

      setAllowCreditPurchase(vendorOverView.allowCredit ?? false);

      setCreditLimit(
        vendorOverView.creditLimit != null
          ? String(vendorOverView.creditLimit)
          : "",
      );

      setCreditPeriod(
        vendorOverView.creditPeriod != null
          ? String(vendorOverView.creditPeriod)
          : "",
      );

      setCountryCode({
        value: vendorOverView.contactPersonMobileCode || "91",
        label: `+${vendorOverView.contactPersonMobileCode || "91"}`,
      });

      setBusinessCountryCode({
        value: vendorOverView.businessMobileCode || "91",
        label: `+${vendorOverView.businessMobileCode || "91"}`,
      });

      if (vendorOverView.vendorCategoryId) {
        setVendorCategory(vendorOverView.vendorCategoryId);
      } else {
        setVendorCategory(null);
      }

      const initialData = {
        vendorName: vendorOverView.fullName || "",
        businessName: vendorOverView.businessName || "",
        businessMobile: vendorOverView.mobile || "",
        businessMobileCode: vendorOverView.businessMobileCode || "91",

        email: vendorOverView.emailId || "",

        houseNo: vendorOverView.houseNo || "",
        landmark: vendorOverView.landMark || "",
        city: vendorOverView.city || "",
        state: vendorOverView.state || "",
        pinCode: vendorOverView.pinCode ? String(vendorOverView.pinCode) : "",

        contactPerson: vendorOverView.contactPerson || "",
        contactPersonMobile: vendorOverView.contactPersonMobile || "",
        contactPersonMobileCode: vendorOverView.contactPersonMobileCode || "91",

        description: vendorOverView.description || "",
        gst: vendorOverView.gst || "",
        pan: vendorOverView.pan || "",

        allowCredit: vendorOverView.allowCredit ?? false,

        creditLimit:
          vendorOverView.creditLimit != null
            ? String(vendorOverView.creditLimit)
            : "",

        creditPeriod:
          vendorOverView.creditPeriod != null
            ? String(vendorOverView.creditPeriod)
            : "",

        vendorCategory: vendorOverView.vendorCategoryId ?? null,
      };

      setInitialVendorData(initialData);
    }
  }, [checkMode, state.ComplianceList?.vendorOverview]);

  useEffect(() => {
    if (checkMode === "EDIT" && currentItem) {
      dispatch({
        type: "PARTICULAR_VENDOR_OVERVIEW_SAGA",
        payload: {
          vendorId: currentItem?.apiCall?.vendorId,
          period: "",
        },
      });
    }
  }, [currentItem]);

  useEffect(() => {
    if (
      state.ComplianceList.vendorEmailError ||
      state.ComplianceList.vendorMobileError
    ) {
      setFormLoading(false);

      if (state.ComplianceList.vendorMobileError) {
        businessMobileRef.current?.focus();
      } else if (state.ComplianceList.vendorEmailError) {
        emailRef.current?.focus();
      }
    }
  }, [
    state.ComplianceList.vendorEmailError,
    state.ComplianceList.vendorMobileError,
  ]);

  // console.log("alreadyVendorHere", state.ComplianceList?.alreadyVendorHere);

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
        <div className="flex items-center justify-between  p-2 sticky top-0  bg-white">
          <h2 className="text-[18px] text-[#222222] font-gilroy font-semibold">
            {checkMode === "EDIT" ? "Edit Vendor" : " Add new Vendor"}
          </h2>

          <button
            onClick={handleClose}
            className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 
            items-center px-2 py-1 font-gilroy "
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
            <div className="col-span-1 xl:col-span-8">
              <div>
                <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                  Vendor Name{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <input
                  value={vendorName}
                  onChange={handleVendorNameChange}
                  ref={vendorNameRef}
                  type="text"
                  placeholder="Enter First Name"
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    vendorName ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />
              </div>

              {vendorNameError && (
                <ErrorMessage message={vendorNameError} type="error" />
              )}
            </div>
            <div className=" col-span-1 xl:col-span-8">
              <div>
                <label className="text-[13px] text-[#222222] font-gilroy font-medium">
                  Business Name{" "}
                  <span className="text-red-600 text-[20px]">*</span>
                </label>

                <input
                  onChange={handleBusinessChange}
                  value={businessName}
                  ref={businessNameRef}
                  type="text"
                  placeholder="Enter Business Name"
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    businessName ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />
                <span className="text-xs py-2 text-[#64748B]">
                  Note : Max 50 Characters
                </span>
              </div>

              {businessNameError && (
                <ErrorMessage message={businessNameError} type="error" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Vendor Category{" "}
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <Select
                ref={vendorCategoryRef}
                options={vendorCategoryOptions}
                value={vendorCategoryOptions.find(
                  (option) => option.value === vendorCategory,
                )}
                onChange={handleVendorCategoryChange}
                placeholder="Select Category"
                classNamePrefix="custom"
                styles={CustomStyles}
              />
              {vendorCategoryError && (
                <ErrorMessage message={vendorCategoryError} type="error" />
              )}
            </div>
            <div className="col-span-1 xl:col-span-4">
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
                    onChange={(selectedOption) => {
                      setBusinessCountryCode(selectedOption);
                      setBusinessCountryCodeError("");
                    }}
                    isSearchable={false}
                    styles={CustomStylesCode}
                    placeholder="Select"
                  />

                  <input
                    value={businessMobile}
                    onChange={handleBusinessMobileChange}
                    type="text"
                    ref={businessMobileRef}
                    placeholder="Enter Mobile Number"
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
                {state.ComplianceList?.vendorMobileError && (
                  <ErrorMessage
                    message={state.ComplianceList.vendorMobileError}
                    type="error"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Contact Person Name
                  {/* <span className="text-red-600 text-[20px]">*</span> */}
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

                {/* {contactPersonNameError && (
                  <ErrorMessage message={contactPersonNameError} type="error" />
                )} */}
              </div>
            </div>
            <div className="col-span-1 xl:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Contact Person Mobile Number{" "}
                  {/* <span className="text-red-600 text-[20px]">*</span> */}
                </label>

                <div className="flex mt-1">
                  <Select
                    ref={countryCodeRef}
                    options={countryCodeOptions}
                    value={countryCode}
                    onChange={(selectedOption) => {
                      setCountryCode(selectedOption);
                      setCountryCodeError("");
                    }}
                    isSearchable={false}
                    styles={CustomStylesCode}
                    placeholder="Select"
                  />

                  <input
                    value={vendor_Mobile}
                    ref={mobileRef}
                    onChange={handleMobileChange}
                    type="text"
                    placeholder="Enter Mobile Number"
                    maxLength={10}
                    className={`flex-1 h-[50px] px-3 border border-l-0 border-[#D9D9D9] rounded-r-[8px] text-[15px] text-[#4B4B4B] font-gilroy ${
                      vendor_Mobile ? "font-semibold" : "font-medium"
                    } focus:outline-none focus:ring-0`}
                  />
                </div>

                {/* {mobileError && (
                  <ErrorMessage message={mobileError} type="error" />
                )}

                {countryCodeError && (
                  <ErrorMessage message={countryCodeError} type="error" />
                )} */}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-8">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Email Address{" "}
                  {/* <span className="text-red-600 text-[20px]">*</span> */}
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

                {state.ComplianceList?.vendorEmailError && (
                  <ErrorMessage
                    message={state.ComplianceList.vendorEmailError}
                    type="error"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-4">
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
            </div>

            <div className="col-span-1 xl:col-span-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-4">
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
            <div className="col-span-1 xl:col-span-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-8">
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

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
              <div className="col-span-1 xl:col-span-4">
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  GST Number (Optional)
                </label>

                <input
                  type="text"
                  value={gstNumber}
                  maxLength={15}
                  onChange={handleGstNumberChange}
                  placeholder="Enter GST Number"
                  className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3  text-[15px] focus:outline-none"
                />
                {gstError && <ErrorMessage message={gstError} type="error" />}
              </div>

              <div className="lg:col-span-4">
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  PAN Number (Optional)
                </label>

                <input
                  type="text"
                  value={panNumber}
                  maxLength={10}
                  onChange={handlePanNumberChange}
                  placeholder="Enter PAN Number"
                  className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3  text-[15px] focus:outline-none"
                />
                {panError && <ErrorMessage message={panError} type="error" />}
              </div>
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
              <div className="col-span-1 xl:col-span-8">
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Vendor Code
                </label>

                <input
                  value={vendorCode}
                  readOnly
                  className="w-full h-[44px] border border-[#D9D9D9] rounded-[8px] px-3 bg-[#F8F8F8]  text-[15px]"
                />
              </div>
            </div> */}

            <div className="my-3">
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
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
                  <div className="col-span-1 xl:col-span-4">
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

                  <div className="col-span-1 xl:col-span-4">
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

        {noChanges && <ErrorMessage message={noChanges} type="error" />}

        <div className="flex justify-end gap-4 my-2 mr-4">
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
              <span>
                {checkMode === "EDIT" ? "Save Changes" : "Save Vendor"}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVendorNew;

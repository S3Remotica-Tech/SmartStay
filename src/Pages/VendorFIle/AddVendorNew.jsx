/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Add } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import AmountInput from "../../Utils/AmountInput";
import ButtonSpinner from "../../Utils/ButtonSpinner";
import Checkbox from "../../Utils/Checkbox";
import FormSection from "../../Utils/FormSection";
import { BTN_PRIMARY, BTN_TERTIARY } from "../../Utils/ButtonStyles";
import {
  fieldClass,
  fieldEmbeddedSelectStyles,
  fieldGroupClass,
  fieldHelperClass,
  fieldInnerInputClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
  fieldTextareaClass,
} from "../../Utils/FieldStyles";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [vendorName, setVendorName] = useState("");
  const [vendorNameError, setVendorNameError] = useState("");
  const vendorNameRef = useRef(null);

  const [vendor_Mobile, setVendor_Mobile] = useState("");
  const [vendorCategory, setVendorCategory] = useState(null);

  const [house_no, setHouseNo] = useState("");

  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("");
  const [state_name, setStateName] = useState("");
  const [email_Id, setEmail_Id] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const location = useLocation();
  const [countryCodeError, setCountryCodeError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [gstError, setGstError] = useState("");
  const [panError, setPanError] = useState("");
  const countryCodeOptions = [{ value: "91", label: "+91" }];

  const [countryCode, setCountryCode] = useState();
  const [businessCountryCode, setBusinessCountryCode] = useState();

  const [pinCodeError, setPinCodeError] = useState("");

  const [businessMobile, setBusinessMobile] = useState("");

  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [contactPersonName, setContactPersonName] = useState("");

  const contactPersonNameRef = useRef(null);

  const mobileRef = useRef(null);
  const businessNameRef = useRef(null);
  const cityRef = useRef(null);
  const pinCodeRef = useRef(null);
  const stateRef = useRef(null);

  const [gstNumber, setGstNumber] = useState("");
  const [panNumber, setPanNumber] = useState("");

  const [allowCreditPurchase, setAllowCreditPurchase] = useState(false);
  const [creditLimit, setCreditLimit] = useState("");
  const [creditPeriod, setCreditPeriod] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const countryCodeRef = useRef(null);
  const emailRef = useRef(null);
  const houseNoRef = useRef(null);
  const landmarkRef = useRef(null);

  const vendorCategoryRef = useRef(null);
  const businessCountryCodeRef = useRef(null);
  const businessMobileRef = useRef(null);

  const [noChanges, setNochanges] = useState("");
  const [vendorCategoryError, setVendorCategoryError] = useState("");

  const [businessNameError, setBusinessNameError] = useState("");
  const [businessCountryCodeError, setBusinessCountryCodeError] = useState("");
  const [businessMobileError, setBusinessMobileError] = useState("");

  const [houseNoError, setHouseNoError] = useState("");

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

    const value = e.target.value.replace(/[^A-Za-z ]/g, "");

    setVendorName(value);

    if (value.trim()) {
      setVendorNameError("");
    }
  };

  const previousHostelIdRef = useRef(null);

  useEffect(() => {
    const hostelId = state.login.selectedHostel_Id;

    if (!hostelId || previousHostelIdRef.current === hostelId) return;

    previousHostelIdRef.current = hostelId;

    dispatch({
      type: "VENDOR_CATEGORY_LIST_SAGA",
      payload: hostelId,
    });
  }, [state.login.selectedHostel_Id]);

  // const focusFirstError = (() => {
  //   let focused = false;

  //   return (ref) => {
  //     if (!focused && ref?.current) {
  //       ref.current.focus();
  //       focused = true;
  //     }
  //   };
  // })();

  const currentItem = location.state?.currentItem || {};
  const checkMode = location.state?.check;

  useEffect(() => {
    return () => {
      // setGeneralError("");

      // setFirstNameError("");
      // setLastNameError("");

      setVendorCategoryError("");

      setBusinessNameError("");
      setBusinessCountryCodeError("");
      setBusinessMobileError("");

      // setContactPersonNameError("");

      setCountryCodeError("");
      setMobileError("");
      setEmailError("");

      setHouseNoError("");

      // setStreetError("");

      setCityError("");
      setStateNameError("");
      // setCountryError("");
      setPinCodeError("");

      setDescriptionError("");
    };
  }, []);

  const handleDescriptionChange = (e) => {
    setNochanges("");
    setDescription(e.target.value);
  };

  // useEffect(() => {
  //   if (businessNameRef.current) {
  //     businessNameRef.current.focus();
  //   }
  // }, []);

  useEffect(() => {
    vendorNameRef.current?.focus();
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
  // const handleStateChange = (selectedOption) => {
  //   setNochanges("");
  //   setStateName(selectedOption);
  // };

  const handleCreditLimitChange = (e) => {
    setNochanges("");
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^0+/, "");
    setCreditLimit(value);
  };

  const handleCreditPeriodChange = (e) => {
    setNochanges("");
    let value = e.target.value.replace(/\D/g, "");

    value = value.replace(/^0+/, "");
    setCreditPeriod(value);
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

    const value = e.target.value.replace(/[^A-Za-z ]/g, "");

    setContactPersonName(value);
    // setContactPersonNameError("");
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

    // setGeneralError("");
    // setIsChangedError("");
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
    // setGeneralError("");
    // setIsChangedError("");
  };

  const handleLandmark = (e) => {
    setNochanges("");
    const value = e.target.value;

    if (!regex.test(value)) {
      return;
    }
    setLandmark(value);

    // setGeneralError("");
    // setIsChangedError("");
  };

  const handleCity = (e) => {
    setNochanges("");
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
      // setGeneralError("");
      // setIsChangedError("");
    }
  };

  const handleClose = () => {
    setNochanges("");
    // setShow(false);
    navigate(`/vendor/${state.login.selectedHostel_Id}`);

    // setVendorPhoneError("");
    // setVendorEmailError("");
    dispatch({ type: "CLEAR_VENDOR_EMAIL_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
  };

  const handleBusinessChange = (e) => {
    setNochanges("");
    const value = e.target.value;
    // setGeneralError("");
    // setIsChangedError("");
    setBusinessNameError("");
    setBusinessName(value);
  };

  const handleMobileChange = (e) => {
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
    setNochanges("");

    const numericInput = e.target.value.replace(/\D/g, "").slice(0, 10);
    setVendor_Mobile(numericInput);

    if (numericInput.length === 0) {
      setMobileError("");
    } else if (/^0+$/.test(numericInput)) {
      setMobileError("Mobile Number cannot contain all zeros");
    } else if (!/^\d{10}$/.test(numericInput)) {
      setMobileError("Please Enter valid Mobile No");
    } else {
      setMobileError("");
    }
    // setGeneralError("");
    setCountryCodeError("");
    // setIsChangedError("");
  };

  const handleEmailChange = (e) => {
    setNochanges("");
    const email = e.target.value.toLowerCase();
    setEmail_Id(email);
    // setGeneralError("");
    // setIsChangedError("");
    setEmailError("");
    // setVendorEmailError("");
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

  const handleAddVendor = () => {
    setNochanges("");
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });

    setVendorCategoryError("");
    setBusinessMobileError("");
    setBusinessCountryCodeError("");

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
    // setCountryError("");
    // setGeneralError("");

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

    if (vendor_Mobile) {
      if (/^0{10}$/.test(vendor_Mobile)) {
        setMobileError("Mobile Number cannot be all zeros");
        isValid = false;
      } else if (!/^[1-9]\d{9}$/.test(vendor_Mobile)) {
        setMobileError("Please Enter a valid 10-digit Mobile Number");
        isValid = false;
      } else {
        setMobileError("");
      }
    }

    if (vendor_Mobile && !countryCode) {
      setCountryCodeError("Please Select  Country Code");
      if (!focusedRef.current && countryCodeRef.current) {
        countryCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }

    if (email_Id) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email_Id.trim())) {
        setEmailError("Please Enter  Valid Email Id");
        isValid = false;
      } else {
        setEmailError("");
      }
    }

    const phonePattern = /^(?!0{10})[1-9]\d{9}$/;

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
      setBusinessMobileError("Please enter  valid 10-digit mobile number");
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
      dispatch({
        type: "UPDATEVENDOR",
        payload: {
          profilePic: "",
          updateVendor: {
            vendorId: currentItem?.apiCall?.vendorId,
            firstName: vendorName,
            lastName: "",
            mobile: businessMobile,
            businessMobileCode: businessCountryCode?.value || "",
            contactPersonMobile: vendor_Mobile,
            contactPersonMobileCode: countryCode?.value || "",
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
            creditLimit: allowCreditPurchase ? Number(creditLimit) : 0,
            creditPeriod: allowCreditPurchase ? Number(creditPeriod) : 0,
          },
        },
      });
    } else {
      dispatch({
        type: "ADDVENDOR",
        payload: {
          profilePic: "",
          payLoads: {
            firstName: vendorName,
            lastName: "",
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
            creditLimit: allowCreditPurchase ? Number(creditLimit) : 0,
            creditPeriod: allowCreditPurchase ? Number(creditPeriod) : 0,
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
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

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
        vendorOverView.creditLimit !== null
          ? String(vendorOverView.creditLimit)
          : "",
      );

      setCreditPeriod(
        vendorOverView.creditPeriod !== null
          ? String(vendorOverView.creditPeriod)
          : "",
      );

      setCountryCode(
        vendorOverView.contactPersonMobile
          ? {
            value: vendorOverView.contactPersonMobileCode || "91",
            label: vendorOverView.contactPersonMobileCode || "91",
          }
          : null,
      );

      setBusinessCountryCode({
        value: vendorOverView.businessMobileCode || "91",
        label: `${vendorOverView.businessMobileCode || "91"}`,
      });

      if (vendorOverView.vendorCategoryId) {
        setVendorCategory(vendorOverView.vendorCategoryId);
      } else {
        setVendorCategory(null);
      }
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

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const isEdit = checkMode === "EDIT";
  const vendorMobileError =
    businessMobileError ||
    businessCountryCodeError ||
    state.ComplianceList?.vendorMobileError;
  const contactMobileError = mobileError || countryCodeError;
  const vendorEmailError = emailError || state.ComplianceList?.vendorEmailError;

  const requiredMark = <span className={fieldRequiredClass}>*</span>;

  return (
    <div className="relative flex min-h-full flex-col bg-white font-gilroy">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-start justify-between gap-[16px] border-b-[1px] border-solid border-[#F2F4F7] bg-white px-[24px] py-[16px]">
        <div className="flex flex-col gap-[4px]">
          <h2 className="m-0 font-gilroy text-h5 font-semibold text-ink">
            {isEdit ? "Edit Vendor" : "Add New Vendor"}
          </h2>
          <p className="m-0 font-gilroy text-b3 text-ink-muted">
            {isEdit
              ? "Update the vendor's contact, address and business details"
              : "Add a vendor you purchase goods or services from"}
          </p>
        </div>

        <button data-testid="add-vendor-new-close-btn"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          className="flex h-[36px] items-center gap-[4px] rounded-[8px] bg-[#F2F4F7] px-[10px] font-gilroy text-[14px] font-medium text-[#222222] hover:bg-[#E4E7EC]"
        >
          <Add size="20" color="#FF383C" className="rotate-45" />
          Close
        </button>
      </div>

      {/* Body */}
      <div className="flex-1 px-[24px] py-[20px]">
        <div className="flex w-full max-w-[920px] flex-col gap-[16px]">
          <FormSection title="Vendor Information">
            <div className="grid grid-cols-1 gap-x-[16px] gap-y-[16px] md:grid-cols-2">
              <div>
                <label htmlFor="vendor-name" className={fieldLabelClass}>
                  Vendor Name {requiredMark}
                </label>
                <input data-testid="add-vendor-new-vendor-name-input"
                  id="vendor-name"
                  value={vendorName}
                  onChange={handleVendorNameChange}
                  ref={vendorNameRef}
                  type="text"
                  placeholder="Enter vendor name"
                  className={fieldClass(!!vendorNameError)}
                />
                {vendorNameError && (
                  <ErrorMessage message={vendorNameError} type="error" className="mt-[6px]" />
                )}
              </div>

              <div>
                <label htmlFor="vendor-business-name" className={fieldLabelClass}>
                  Business Name {requiredMark}
                </label>
                <input data-testid="add-vendor-new-business-name-input"
                  id="vendor-business-name"
                  onChange={handleBusinessChange}
                  value={businessName}
                  ref={businessNameRef}
                  type="text"
                  placeholder="Enter business name"
                  className={fieldClass(!!businessNameError)}
                />
                {businessNameError ? (
                  <ErrorMessage message={businessNameError} type="error" className="mt-[6px]" />
                ) : (
                  <span className={fieldHelperClass}>Max 50 characters</span>
                )}
              </div>

              <div>
                <label className={fieldLabelClass}>
                  Vendor Category {requiredMark}
                </label>
                <div data-testid="add-vendor-new-vendor-category-select" className="contents"><Select
                  ref={vendorCategoryRef}
                  options={vendorCategoryOptions}
                  value={
                    vendorCategoryOptions.find(
                      (option) => option.value === vendorCategory,
                    ) || null
                  }
                  onChange={handleVendorCategoryChange}
                  placeholder="Select category"
                  styles={fieldSelectStyles(!!vendorCategoryError)}
                /></div>
                {vendorCategoryError && (
                  <ErrorMessage message={vendorCategoryError} type="error" className="mt-[6px]" />
                )}
              </div>

              <div>
                <label className={fieldLabelClass}>
                  Business Mobile No {requiredMark}
                </label>
                <div className={`${fieldGroupClass(!!vendorMobileError)} !pl-[8px]`}>
                  <div className="w-[76px] shrink-0">
                    <div data-testid="add-vendor-new-business-country-code-select" className="contents"><Select
                      ref={businessCountryCodeRef}
                      options={countryCodeOptions}
                      value={businessCountryCode}
                      onChange={(selectedOption) => {
                        setBusinessCountryCode(selectedOption);
                        setBusinessCountryCodeError("");
                      }}
                      isSearchable={false}
                      styles={fieldEmbeddedSelectStyles()}
                      placeholder="Code"
                      aria-label="Business country code"
                    /></div>
                  </div>
                  <span className="h-[20px] w-[1px] shrink-0 bg-[#E4E4E7]" aria-hidden />
                  <input data-testid="add-vendor-new-business-mobile-number-input"
                    value={businessMobile}
                    onChange={handleBusinessMobileChange}
                    type="text"
                    inputMode="numeric"
                    ref={businessMobileRef}
                    placeholder="Enter mobile number"
                    maxLength={10}
                    aria-label="Business mobile number"
                    className={fieldInnerInputClass}
                  />
                </div>
                {businessMobileError && (
                  <ErrorMessage message={businessMobileError} type="error" className="mt-[6px]" />
                )}
                {businessCountryCodeError && (
                  <ErrorMessage message={businessCountryCodeError} type="error" className="mt-[6px]" />
                )}
                {state.ComplianceList?.vendorMobileError && (
                  <ErrorMessage
                    message={state.ComplianceList.vendorMobileError}
                    type="error" className="mt-[6px]"
                  />
                )}
              </div>

              <div>
                <label htmlFor="vendor-contact-name" className={fieldLabelClass}>
                  Contact Person Name
                </label>
                <input data-testid="add-vendor-new-contact-person-name-input"
                  id="vendor-contact-name"
                  value={contactPersonName}
                  onChange={handleContactPersonNameChange}
                  type="text"
                  ref={contactPersonNameRef}
                  placeholder="Proprietor / contact person name"
                  className={fieldClass()}
                />
              </div>

              <div>
                <label className={fieldLabelClass}>
                  Contact Person Mobile Number
                </label>
                <div className={`${fieldGroupClass(!!contactMobileError)} !pl-[8px]`}>
                  <div className="w-[76px] shrink-0">
                    <div data-testid="add-vendor-new-contact-person-country-code-select" className="contents"><Select
                      ref={countryCodeRef}
                      options={countryCodeOptions}
                      value={countryCode}
                      onChange={(selectedOption) => {
                        setCountryCode(selectedOption);
                        setCountryCodeError("");
                      }}
                      isSearchable={false}
                      styles={fieldEmbeddedSelectStyles()}
                      placeholder="Code"
                      aria-label="Contact person country code"
                    /></div>
                  </div>
                  <span className="h-[20px] w-[1px] shrink-0 bg-[#E4E4E7]" aria-hidden />
                  <input data-testid="add-vendor-new-contact-person-mobile-number-input"
                    value={vendor_Mobile}
                    ref={mobileRef}
                    onChange={handleMobileChange}
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter mobile number"
                    maxLength={10}
                    aria-label="Contact person mobile number"
                    className={fieldInnerInputClass}
                  />
                </div>
                {mobileError && <ErrorMessage message={mobileError} type="error" className="mt-[6px]" />}
                {countryCodeError && (
                  <ErrorMessage message={countryCodeError} type="error" className="mt-[6px]" />
                )}
              </div>

              <div>
                <label htmlFor="vendor-email" className={fieldLabelClass}>
                  Email Address
                </label>
                <input data-testid="add-vendor-new-email-address-input"
                  id="vendor-email"
                  ref={emailRef}
                  value={email_Id}
                  onChange={handleEmailChange}
                  type="email"
                  placeholder="name@company.com"
                  className={fieldClass(!!vendorEmailError)}
                />
                {emailError && <ErrorMessage message={emailError} type="error" className="mt-[6px]" />}
                {state.ComplianceList?.vendorEmailError && (
                  <ErrorMessage
                    message={state.ComplianceList.vendorEmailError}
                    type="error" className="mt-[6px]"
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label htmlFor="vendor-description" className={fieldLabelClass}>
                  Description
                </label>
                <textarea data-testid="add-vendor-new-description-textarea"
                  id="vendor-description"
                  value={description}
                  onChange={handleDescriptionChange}
                  placeholder="E.g. Wi-Fi bill paid for May"
                  rows={3}
                  className={fieldTextareaClass(!!descriptionError)}
                />
                {descriptionError && (
                  <ErrorMessage message={descriptionError} type="error" className="mt-[6px]" />
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Commercial Address">
            <div className="grid grid-cols-1 gap-x-[16px] gap-y-[16px] md:grid-cols-2">
              <div className="md:col-span-2">
                <label htmlFor="vendor-address" className={fieldLabelClass}>
                  Address (No, Area / Street, Sector) {requiredMark}
                </label>
                <textarea data-testid="add-vendor-new-address-no-area-street-sector-textarea"
                  id="vendor-address"
                  ref={houseNoRef}
                  value={house_no}
                  onChange={handleHouseNo}
                  placeholder="Enter commercial address"
                  rows={3}
                  className={fieldTextareaClass(!!houseNoError)}
                />
                {houseNoError && (
                  <ErrorMessage message={houseNoError} type="error" className="mt-[6px]" />
                )}
              </div>

              <div>
                <label htmlFor="vendor-landmark" className={fieldLabelClass}>
                  Landmark
                </label>
                <input data-testid="add-vendor-new-landmark-input"
                  id="vendor-landmark"
                  ref={landmarkRef}
                  type="text"
                  placeholder="E.g. near Apollo Hospital"
                  value={landmark}
                  onChange={handleLandmark}
                  className={fieldClass()}
                />
              </div>

              <div>
                <label htmlFor="vendor-city" className={fieldLabelClass}>
                  Town / City {requiredMark}
                </label>
                <input data-testid="add-vendor-new-town-city-input"
                  id="vendor-city"
                  type="text"
                  placeholder="Enter city"
                  value={city}
                  ref={cityRef}
                  onChange={handleCity}
                  className={fieldClass(!!cityError)}
                />
                {cityError && <ErrorMessage message={cityError} type="error" className="mt-[6px]" />}
              </div>

              <div>
                <label className={fieldLabelClass}>State {requiredMark}</label>
                <div data-testid="add-vendor-new-state-select" className="contents"><Select
                  options={indianStates}
                  ref={stateRef}
                  value={
                    state_name ? { value: state_name, label: state_name } : null
                  }
                  onChange={(selectedOption) =>
                    setStateName(selectedOption?.value)
                  }
                  placeholder="Select state"
                  styles={fieldSelectStyles(!state_name && !!state_nameError)}
                /></div>
                {!state_name && state_nameError && (
                  <ErrorMessage message={state_nameError} type="error" className="mt-[6px]" />
                )}
              </div>

              <div>
                <label htmlFor="vendor-pincode" className={fieldLabelClass}>
                  Pincode {requiredMark}
                </label>
                <input data-testid="add-vendor-new-pincode-input"
                  id="vendor-pincode"
                  value={pinCode}
                  ref={pinCodeRef}
                  onChange={handlePinCodeChange}
                  type="tel"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter 6-digit pincode"
                  className={fieldClass(!!pinCodeError)}
                />
                {pinCodeError && (
                  <ErrorMessage message={pinCodeError} type="error" className="mt-[6px]" />
                )}
              </div>
            </div>
          </FormSection>

          <FormSection
            title="Business Details"
            description="Optional tax details and credit terms"
          >
            <div className="grid grid-cols-1 gap-x-[16px] gap-y-[16px] md:grid-cols-2">
              <div>
                <label htmlFor="vendor-gst" className={fieldLabelClass}>
                  GST Number
                </label>
                <input data-testid="add-vendor-new-gst-number-input"
                  id="vendor-gst"
                  type="text"
                  value={gstNumber}
                  maxLength={15}
                  onChange={handleGstNumberChange}
                  placeholder="E.g. 22AAAAA0000A1Z5"
                  className={fieldClass(!!gstError)}
                />
                {gstError && <ErrorMessage message={gstError} type="error" className="mt-[6px]" />}
              </div>

              <div>
                <label htmlFor="vendor-pan" className={fieldLabelClass}>
                  PAN Number
                </label>
                <input data-testid="add-vendor-new-pan-number-input"
                  id="vendor-pan"
                  type="text"
                  value={panNumber}
                  maxLength={10}
                  onChange={handlePanNumberChange}
                  placeholder="E.g. ABCDE1234F"
                  className={fieldClass(!!panError)}
                />
                {panError && <ErrorMessage message={panError} type="error" className="mt-[6px]" />}
              </div>
            </div>

            <div className="rounded-small bg-ink-50 px-[14px] py-[12px]">
              <Checkbox data-testid="add-vendor-new-vendor-allow-credit-checkbox"
                id="vendor-allow-credit"
                checked={allowCreditPurchase}
                onChange={handleCreditPurchaseToggle}
                label="Allow credit purchases"
                description="Buy now and pay this vendor later"
              />
            </div>

            {allowCreditPurchase && (
              <div className="flex flex-col gap-[8px]">
                <div className="grid grid-cols-1 gap-x-[16px] gap-y-[16px] md:grid-cols-2">
                  <div>
                    <label className={fieldLabelClass}>Credit Limit</label>
                    <AmountInput data-testid="add-vendor-new-credit-limit-input"
                      value={creditLimit}
                      onChange={handleCreditLimitChange}
                      placeholder="Enter credit limit"
                      ariaLabel="Credit limit"
                    />
                  </div>

                  <div>
                    <label htmlFor="vendor-credit-period" className={fieldLabelClass}>
                      Credit Period
                    </label>
                    <div className={fieldGroupClass(false)}>
                      <input data-testid="add-vendor-new-credit-period-input"
                        id="vendor-credit-period"
                        type="text"
                        inputMode="numeric"
                        value={creditPeriod}
                        onChange={handleCreditPeriodChange}
                        placeholder="E.g. 30"
                        className={fieldInnerInputClass}
                      />
                      <span className="shrink-0 font-gilroy text-[14px] font-medium text-[#71717A]">
                        days
                      </span>
                    </div>
                  </div>
                </div>
                <p className={fieldHelperClass}>
                  A credit limit keeps the vendor&apos;s credit balance within
                  the amount you set.
                </p>
              </div>
            )}
          </FormSection>
        </div>
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 z-20 flex flex-col gap-[8px] border-t-[1px] border-solid border-[#F2F4F7] bg-white px-[24px] py-[16px]">
        {noChanges && <ErrorMessage message={noChanges} type="error" className="mt-[6px]" />}
        <div className="flex w-full max-w-[920px] items-center justify-end gap-[12px]">
          <button data-testid="add-vendor-new-cancel-btn" type="button" onClick={handleClose} className={BTN_TERTIARY}>
            Cancel
          </button>
          <button data-testid="add-vendor-new-add-vendor-btn"
            type="submit"
            disabled={formLoading}
            onClick={handleAddVendor}
            className={BTN_PRIMARY}
          >
            {formLoading ? (
              <ButtonSpinner />
            ) : isEdit ? (
              "Save Changes"
            ) : (
              "Save Vendor"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddVendorNew;

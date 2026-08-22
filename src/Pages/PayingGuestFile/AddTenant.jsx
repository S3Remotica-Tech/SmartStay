/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import NoDataMessage from "../../Utils/NoDataMessage";
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
  
  DocumentText,
  TableDocument,
 
  SearchNormal,
} from "iconsax-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import ErrorMessage from "../../Components/ErrorMessage";
import AddTenantBookingCheckin from "./AddTenantBookingCheckin";

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
function AddTenant({
  showMenu,
  handleClose,
  alreadySaveDraftTenantDetails,
  bookingOnly,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  // const [isDisabled, setIsDisabled] = useState(false);
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
  const [saveLoading, setSaveLoading] = useState(false);
  const [newTenant, setNewTenant] = useState(true);

  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  // const [state_nameError, setStateNameError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  // const [hasVehicle, setHasVehicle] = useState(true);
  const [guardians, setGuardians] = useState([
    {
      guardianFullName: "",
      relationshipToTenant: null,
      guardianOccupation: null,
      mobileNo: "",
    },
  ]);
  // const [relationship, setRelationship] = useState(null);
  // const [occupation, setOccupation] = useState(null);
  // const [mobile, setMobile] = useState("");
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
  const dropdownRef = useRef(null);
  // const aadhaarRef = useRef(null);
  // const panRef = useRef(null);
  const [draftTenantId, setDraftTenantId] = useState("");
  // const [vehicleType, setVehicleType] = useState(null);
  // const [vehicleNumber, setVehicleNumber] = useState("");
  // const [parkingSpace, setParkingSpace] = useState("");

  // const [vehicleTypeError, setVehicleTypeError] = useState("");
  // const [vehicleNumberError, setVehicleNumberError] = useState("");
  // const [parkingSpaceError, setParkingSpaceError] = useState("");

  // const vehicleTypeRef = useRef(null);
  // const vehicleNumberRef = useRef(null);
  // const parkingSpaceRef = useRef(null);

  // const vehicleTypeOptions = [
  //   {
  //     value: "2_WHEELER",
  //     label: "2-Wheeler",
  //   },
  //   {
  //     value: "4_WHEELER",
  //     label: "4-Wheeler",
  //   },
  // ];

  useEffect(() => {
    const customerId =
      state?.UsersList?.draftTenantDetails?.customerId ||
      state?.UsersList?.UpdateDraftTenantDetails?.customerId ||
      state?.UsersList?.alreadyAvailableDraftTenantGetList?.customerId ||
      "";

    setDraftTenantId(customerId);
  }, [
    state?.UsersList?.draftTenantDetails?.customerId,
    state?.UsersList?.UpdateDraftTenantDetails?.customerId,
    state?.UsersList?.alreadyAvailableDraftTenantGetList?.customerId,
  ]);

  const getFilePreview = (file) => {
    if (!file) return null;

    if (typeof file === "string") {
      return file;
    }

    return URL.createObjectURL(file);
  };

  const getFileName = (file, defaultName) => {
    if (!file) return defaultName;

    if (typeof file === "string") {
      return file.split("/").pop();
    }

    return file.name;
  };

  const isImageFile = (file) => {
    if (!file) return false;

    if (typeof file === "string") {
      return /\.(jpg|jpeg|png|webp)$/i.test(file);
    }

    return file.type.startsWith("image/");
  };

  // const isImage = (file) => file && file?.type?.startsWith("image/");
  const [searchLoading, setSearchLoading] = useState(false);
  const handleDeleteAadhaar = () => setAadhaarFile(null);
  const handleDeletePan = () => setPanFile(null);
  const [guardianErrors, setGuardianErrors] = useState([]);
  const guardianNameRefs = useRef([]);
  const guardianMobileRefs = useRef([]);

  const handleGuardianChange = (index, field, value) => {
    const updated = [...guardians];
    updated[index][field] = value;
    setGuardians(updated);

    setGuardianErrors((prev) => {
      const errors = [...prev];
      if (errors[index]) {
        errors[index] = {
          ...errors[index],
          mobileNo: "",
        };
      }
      return errors;
    });
  };

  const handleAddGuardian = () => {
    setGuardians((prev) => [
      ...(Array.isArray(prev) ? prev : []),
      {
        guardianFullName: "",
        relationshipToTenant: null,
        guardianOccupation: null,
        mobileNo: "",
      },
    ]);
  };

  // const handleVehicleNumberChange = (e) => {
  //   const value = e.target.value.toUpperCase();
  //   setVehicleNumberError("");
  //   if (/^[A-Z0-9]*$/.test(value)) {
  //     setVehicleNumber(value);

  //     if (value.trim()) {
  //       setVehicleNumberError("");
  //     }
  //   }
  // };

  // const handleParkingSpaceChange = (e) => {
  //   const value = e.target.value;

  //   if (/^[A-Za-z0-9 ]*$/.test(value)) {
  //     setParkingSpace(value);
  //     setParkingSpaceError("");
  //   }
  // };

  // const handleVehicleTypeChange = (value) => {
  //   setVehicleType(value);

  //   if (value) {
  //     setVehicleTypeError("");
  //   }
  // };

  const handleRemoveGuardian = (index) => {
    setGuardians(guardians.filter((_, i) => i !== index));
  };

  // const handleAadhaarChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setAadhaarFile(file);
  // };

  // const handlePanChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) setPanFile(file);
  // };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setSearch(value);
    dispatch({ type: "REMOVE_TENANT_SEARCH_LIST_REDUCER" });
    dispatch({ type: "REMOVE_MOBILENUMBER_ERROR" });
    dispatch({ type: "REMOVE_NO_TENANT_DRAFT" });
  };

  const handleSearch = () => {
    dispatch({ type: "REMOVE_MOBILENUMBER_ERROR" });
    if (!state.login.selectedHostel_Id || search.trim() === "") return;

    dispatch({
      type: "TENANT_SEARCH_LIST_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        search,
      },
    });
    setSearchLoading(true);
  };

  useEffect(() => {
    if (alreadySaveDraftTenantDetails) {
      if (alreadySaveDraftTenantDetails?.apiCall?.customerId) {
        dispatch({
          type: "DRAFT_TENANT_LIST_SAGA",
          payload: alreadySaveDraftTenantDetails?.apiCall?.customerId,
        });
        setNewTenant(false);
      }
    }
  }, [alreadySaveDraftTenantDetails]);

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={i} className="text-black  bg-[#F8FFAC] font-semibold ">
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
    // setNewTenant(true);
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstname(value);
    setFirstnameError("");
  };

  const idProofOptions = [
    { value: "Aadhar Card", label: "Aadhar Card" },
    { value: "PAN Card", label: "PAN Card" },
    { value: "Passport", label: "Passport" },
    { value: "Driving License", label: "Driving License" },
  ];

  const relationOptions = [
    { value: "Father", label: "Father" },
    { value: "Mother", label: "Mother" },
    { value: "Brother", label: "Brother" },
    { value: "Sister", label: "Sister" },
    { value: "Husband", label: "Husband" },
    { value: "Son", label: "Son" },
    { value: "Daughter", label: "Daughter" },
    { value: "Grandfather", label: "Grandfather" },
    { value: "Uncle", label: "Uncle" },
    { value: "Aunt", label: "Aunt" },
    { value: "Cousin", label: "Cousin" },
    { value: "Guardian", label: "Guardian" },
    { value: "Friend", label: "Friend" },
    { value: "Relative", label: "Relative" },
    { value: "Other", label: "Other" },
  ];

  const shiftTypeOptions = [
    { value: "Day Shift", label: "Day Shift" },
    { value: "Night Shift", label: "Night Shift" },
    { value: "Rotational Shift", label: "Rotational Shift" },
    { value: "Flexible Shift", label: "Flexible Shift" },
    { value: "General Shift", label: "General Shift" },
  ];

  const jobRoleOptions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
    { value: "Designer", label: "Designer" },
    { value: "Manager", label: "Manager" },
    { value: "Accountant", label: "Accountant" },
    { value: "Teacher", label: "Teacher" },
    { value: "Doctor", label: "Doctor" },
    { value: "Nurse", label: "Nurse" },
    { value: "Lawyer", label: "Lawyer" },
    { value: "Sales Executive", label: "Sales Executive" },
    { value: "Marketing Executive", label: "Marketing Executive" },
    { value: "Student", label: "Student" },
    { value: "Other", label: "Other" },
  ];

  const jobOptions = [
    { value: "Employed", label: "Employed" },
    { value: "Self Employed", label: "Self Employed" },
    { value: "Student", label: "Student" },
    { value: "Business Owner", label: "Business Owner" },
    { value: "Freelancer", label: "Freelancer" },
    { value: "Government Employee", label: "Government Employee" },
    { value: "Private Employee", label: "Private Employee" },
    { value: "Intern", label: "Intern" },
    { value: "Retired", label: "Retired" },
    { value: "Unemployed", label: "Unemployed" },
    { value: "Other", label: "Other" },
  ];

  const handleSelectChange = (selectedOption) => {
    setIdProofType(selectedOption);
  };

  const handleInputChange = (e) => {
    setIdProofNo(e.target.value);
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

  // const handleAddManually = () => {
  //   setNewTenant(true);
  // };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const capitalizedFirstname = capitalizeFirstLetter(firstname);
  const capitalizedLastname = capitalizeFirstLetter(lastname);

  const handleSaveStepOne = () => {
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

    dispatch({
      type: "SAVE_DRAFT_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        profilePic: file || "",
        aadharPic: aadhaarFile || "",
        panPic: panFile || "",

        request: {
          firstName: capitalizedFirstname || "",
          lastName: capitalizedLastname || "",
          mobile: Phone || "",
          emailId: Email || "",

          proRate: true,

          idProof: {
            type: idProofType?.value || idProofType || "",
            number: idProofNo || "",
          },

          address: {
            flat: "",
            house: house_no || "",
            building: "",
            company: "",
            apartment: "",
            area: "",
            street: street || "",
            sector: "",
            village: "",
            landmark: landmark || "",
            pincode: pincode || "",
            city: city || "",
            state: state_name || "",
          },
        },
      },
    });

    setFormLoading(true);
  };

  const handleSaveUpdateStepOne = () => {
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

    const isChanged =
      capitalizedFirstname !== (DraftTenantDetails?.firstName || "") ||
      capitalizedLastname !== (DraftTenantDetails?.lastName || "") ||
      Phone !== (DraftTenantDetails?.mobileNo || "") ||
      Email !== (DraftTenantDetails?.emailId || "") ||
      (idProofType?.value || idProofType || "") !==
        (DraftTenantDetails?.idProof?.type || "") ||
      idProofNo !== (DraftTenantDetails?.idProof?.number || "") ||
      house_no !== (DraftTenantDetails?.address?.house || "") ||
      street !== (DraftTenantDetails?.address?.street || "") ||
      landmark !== (DraftTenantDetails?.address?.landmark || "") ||
      pincode !== (DraftTenantDetails?.address?.pincode || "") ||
      city !== (DraftTenantDetails?.address?.city || "") ||
      state_name !== (DraftTenantDetails?.address?.state || "") ||
      !!file ||
      !!aadhaarFile ||
      !!panFile;

    if (!isChanged) {
      setStep(2);
      return;
    } else {
      dispatch({
        type: "UPDATE_SAVE_DRAFT_SAGA",
        payload: {
          hostelId: state?.login?.selectedHostel_Id,
          customerId: draftTenantId,
          profilePic: file || "",
          aadharPic: aadhaarFile || "",
          panPic: panFile || "",

          request: {
            firstName: capitalizedFirstname || "",
            lastName: capitalizedLastname || "",
            mobile: Phone || "",
            emailId: Email || "",
            joiningDate: DraftTenantDetails?.hostelInfo?.joiningDate || "",
            bookingDate: DraftTenantDetails?.bookingInfo?.bookingDate || "",
            bookingAmount: DraftTenantDetails?.bookingAmount ?? "",
            bedId: DraftTenantDetails?.bedDetails?.bedId ?? "",
            roomId: DraftTenantDetails?.bedDetails?.roomId ?? "",
            floorId: DraftTenantDetails?.bedDetails?.floorId ?? "",
            bankId: DraftTenantDetails?.bankId || "",
            referenceNumber: DraftTenantDetails?.referenceNumber || "",

            advanceAmount: DraftTenantDetails?.hostelInfo?.advanceAmount ?? "",
            rentalAmount: DraftTenantDetails?.hostelInfo?.monthlyRent ?? "",
            stayType: DraftTenantDetails?.stayType || "",
            deductions: DraftTenantDetails?.deductions || [],
            proRate: DraftTenantDetails?.proRate ?? true,

            idProof: {
              type:
                idProofType?.value ||
                idProofType ||
                DraftTenantDetails?.idProof?.type ||
                "",
              number: idProofNo || DraftTenantDetails?.idProof?.number || "",
            },

            address: {
              flat: DraftTenantDetails?.address?.flat || "",
              house: house_no || DraftTenantDetails?.address?.house || "",
              building: DraftTenantDetails?.address?.building || "",
              company: DraftTenantDetails?.address?.company || "",
              apartment: DraftTenantDetails?.address?.apartment || "",
              area: DraftTenantDetails?.address?.area || "",
              street: street || DraftTenantDetails?.address?.street || "",
              sector: DraftTenantDetails?.address?.sector || "",
              village: DraftTenantDetails?.address?.village || "",
              landmark: landmark || DraftTenantDetails?.address?.landmark || "",
              pincode: pincode || DraftTenantDetails?.address?.pincode || "",
              city: city || DraftTenantDetails?.address?.city || "",
              state: state_name || DraftTenantDetails?.address?.state || "",
            },

            booking: {
              joiningDateTentative:
                DraftTenantDetails?.booking?.joiningDateTentative || "",
              refuseAdvanceAmount:
                DraftTenantDetails?.booking?.refuseAdvanceAmount ?? true,
            },

            jobDetails: {
              employmentStatus:
                DraftTenantDetails?.jobDetails?.employmentStatus || "",
              companyName: DraftTenantDetails?.jobDetails?.companyName || "",
              collegeName: DraftTenantDetails?.jobDetails?.collegeName || "",
              jobRole: DraftTenantDetails?.jobDetails?.jobRole || "",
              workLocation: DraftTenantDetails?.jobDetails?.workLocation || "",
              shiftType: DraftTenantDetails?.jobDetails?.shiftType || "",
              shiftFrom: DraftTenantDetails?.jobDetails?.shiftFrom || "",
              shiftTo: DraftTenantDetails?.jobDetails?.shiftTo || "",
            },

            guardians: (DraftTenantDetails?.guardians || []).map((g) => ({
              guardianFullName: g?.guardianFullName || "",
              relationshipToTenant: g?.relationshipToTenant || "",
              guardianOccupation: g?.guardianOccupation || "",
              mobileNo: g?.mobileNo || "",
            })),
            shouldCollectFullRent: DraftTenantDetails?.shouldCollectFullRent,
            customRent: DraftTenantDetails?.customRent,
            oneTimeDeduction: DraftTenantDetails?.oneTimeDeduction || [],
          },
        },
      });
      setStep(2);
      setFormLoading(true);
    }
  };

  // const validateVehicle = () => {
  //   setVehicleTypeError("");
  //   setVehicleNumberError("");
  //   let isValid = true;

  //   if (!hasVehicle) {
  //     return true;
  //   }

  //   if (!vehicleType) {
  //     setVehicleTypeError("Please Select Vehicle type");

  //     if (vehicleTypeRef.current) {
  //       vehicleTypeRef.current.focus();
  //     }

  //     return false;
  //   }

  //   const vehicleRegex = /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,3}[0-9]{1,4}$/;

  //   if (vehicleNumber && !vehicleRegex.test(vehicleNumber.replace(/\s/g, ""))) {
  //     setVehicleNumberError("Enter a valid vehicle number.");
  //     vehicleNumberRef.current?.focus();
  //     return false;
  //   }

  //   return isValid;
  // };

  const validateGuardianMobile = (mobile) => {
    if (!mobile) return "";

    if (!/^\d+$/.test(mobile)) return "Mobile number must contain only digits";

    if (mobile.length !== 10) return "Mobile number must be 10 digits";

    if (mobile[0] === "0") return "Mobile number cannot start with 0";

    if (/^0+$/.test(mobile)) return "Mobile number cannot be all zeros";

    return "";
  };

  const validateGuardianName = (name) => {
    if (!name) return "";

    if (!/^[A-Za-z\s]+$/.test(name))
      return "Name can contain only letters and spaces";

    return "";
  };

  const handleSaveStep3 = () => {
    const errors = [];
    let hasError = false;
    let firstInvalidRef = null;
    guardians?.forEach((guardian, index) => {
      const guardianError = {
        guardianFullName: validateGuardianName(guardian.guardianFullName),
        mobileNo: validateGuardianMobile(guardian.mobileNo),
      };

      if (guardianError.guardianFullName && !firstInvalidRef) {
        firstInvalidRef = guardianNameRefs.current[index];
      }

      if (guardianError.mobileNo && !firstInvalidRef) {
        firstInvalidRef = guardianMobileRefs.current[index];
      }

      if (guardianError.guardianFullName || guardianError.mobileNo) {
        hasError = true;
      }

      errors.push(guardianError);
    });

    setGuardianErrors(errors);

    if (hasError) {
      firstInvalidRef?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => {
        firstInvalidRef?.focus();
      }, 300);

      return;
    }

    dispatch({
      type: "ADDITIONAL_DETAILS_TENANT_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        customerId: draftTenantId,
        aadhaarPic: aadhaarFile || "",
        panPic: panFile || "",
        additionalData: {
          jobDetails: {
            employmentStatus: employmentStatus?.value || "",
            companyName: companyName || "",
            collegeName: companyName || " ",
            jobRole: jobRole?.value || "",
            workLocation: workLocation || "",
            shiftType: shiftType?.value || "",
            shiftFrom: fromTime || "",
            shiftTo: toTime || "",
          },
          guardians: guardians?.map((g) => ({
            guardianFullName: g.guardianFullName || "",
            relationshipToTenant:
              g.relationshipToTenant?.value || g.relationshipToTenant || "",
            guardianOccupation:
              g.guardianOccupation?.value || g.guardianOccupation || "",
            mobileNo: g.mobileNo || "",
          })),
        },
      },
    });
    setSaveLoading(true);
  };

  useEffect(() => {
    if (state.UsersList?.phoneError === 202) {
      setFormLoading(false);
    }
  }, [state.UsersList?.phoneError]);

  useEffect(() => {
    if (state.UsersList?.saveDreaftTenantSuccessCode === 201) {
      // setDraftTenantId(state?.UsersList?.draftTenantDetails?.customerId);
      setStep(2);
      dispatch({
        type: "DRAFT_TENANT_LIST_SAGA",
        payload: state?.UsersList?.draftTenantDetails?.customerId,
      });
      setNewTenant(false);
      setFormLoading(false);
      dispatch({ type: "REMOVE_SAVE_DRAFT_REDUCER" });
    }
  }, [state.UsersList?.saveDreaftTenantSuccessCode]);

  useEffect(() => {
    if (state.UsersList?.addtionalDetailsSuccessCode === 201) {
      setSaveLoading(false);
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: 1,
          size: 10,
        },
      });
      handleClose();
      dispatch({ type: "REMOVE_ADDITIONAL_DETAILS_TENANT_REDUCER" });
    }
  }, [state.UsersList?.addtionalDetailsSuccessCode]);

  useEffect(() => {
    if (state.UsersList?.updateSaveDreaftTenantStatus === 200) {
      setFormLoading(false);
      if (step === 1) {
        setStep(2);
      }
      // else if (step === 1) {
      //   handleClose();
      // }

      dispatch({
        type: "DRAFT_TENANT_LIST_SAGA",
        payload: draftTenantId,
      });

      dispatch({ type: "REMOVE_UPDATE_SAVE_DRAFT_REDUCER" });
    }
  }, [state.UsersList?.updateSaveDreaftTenantStatus]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  // const handleNext = () => {
  //   dispatch({ type: "CLEAR_PHONE_ERROR" });
  //   dispatch({ type: "CLEAR_EMAIL_ERROR" });
  //   let hasError = false;
  //   const focusedRef = { current: false };
  //   if (
  //     !validateField(
  //       firstname,
  //       "First Name",
  //       firstnameRef,
  //       setFirstnameError,
  //       focusedRef,
  //     )
  //   )
  //     hasError = true;
  //   if (
  //     !validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)
  //   )
  //     hasError = true;
  //   if (Phone && Phone.length !== 10) {
  //     setPhoneError("Please Enter Valid Mobile Number");
  //     if (!focusedRef.current && phoneRef?.current) {
  //       phoneRef.current.focus();
  //       focusedRef.current = true;
  //     }
  //     hasError = true;
  //   } else if (Phone) {
  //     setPhoneError("");
  //     setPhoneErrorMessage("");
  //   }

  //   if (Email) {
  //     const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
  //     const isValidEmail = emailRegex.test(Email.toLowerCase());
  //     if (!isValidEmail) {
  //       setEmailError("Please Enter Valid Email ID");
  //       if (!focusedRef.current) {
  //         focusedRef.current = true;
  //       }
  //       hasError = true;
  //     } else {
  //       setEmailError("");
  //     }
  //   } else {
  //     setEmailError("");
  //   }
  //   if (hasError) {
  //     return;
  //   }
  //   const capitalizeFirstLetter = (str) => {
  //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  //   };

  //   const capitalizedFirstname = capitalizeFirstLetter(firstname);
  //   const capitalizedLastname = capitalizeFirstLetter(lastname);

  //   const basicAndAddressPayload = {
  //     profilePic: file,
  //     hostelId: state.login.selectedHostel_Id,
  //     customerInfo: {
  //       firstName: capitalizedFirstname,
  //       lastName: capitalizedLastname,
  //       mobileNumber: Phone,
  //       emailId: Email,
  //       idProofType: idProofType?.value || idProofType || "",
  //       idProofNo: idProofNo,
  //       type: 1,
  //       address: {
  //         houseNo: house_no,
  //         street: street,
  //         landmark: landmark,
  //         city: city,
  //         pincode: pincode,
  //         state: state_name,
  //       },
  //     },
  //   };
  //   dispatch({ type: "ADDUSER", payload: basicAndAddressPayload });

  //   setStep(2);
  // };

  const handleNextStep = () => {
    setStep(3);
  };
  // const handlePrevious = () => {
  //   setStep(1);
  // };

  const handleDraftTenant = (customerId) => {
    if (customerId) {
      dispatch({ type: "DRAFT_TENANT_LIST_SAGA", payload: customerId });
      setNewTenant(false);
      dispatch({ type: "REMOVE_TENANT_SEARCH_LIST_REDUCER" });
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_MOBILENUMBER_ERROR" });
      dispatch({ type: "REMOVE_TENANT_SEARCH_LIST_REDUCER" });
      dispatch({ type: "REMOVE_DRAFT_TENANT_LIST_REDUCER" });
      dispatch({ type: "CLEAR_PHONE_ERROR" });
      dispatch({ type: "REMOVE_NO_TENANT_DRAFT" });
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          page: 1,
          size: 10,
        },
      });
    };
  }, []);

  useEffect(() => {
    if (state.UsersList?.draftTenantGetStatusCode === 200) {
      setSearch("");

      dispatch({ type: "REMOVE_TENANT_SEARCH_LIST_REDUCER" });
      dispatch({ type: "REMOVE_DRAFT_TENANT_LIST_REDUCER" });
    }
  }, [state.UsersList?.draftTenantGetStatusCode]);

  const DraftTenantDetails =
    state?.UsersList?.alreadyAvailableDraftTenantGetList;

  useEffect(() => {
    if (DraftTenantDetails && !newTenant && !state.UsersList?.draftClickError) {
      setFirstname(DraftTenantDetails?.firstName || "");
      setLastname(DraftTenantDetails?.lastName || "");
      setPhone(DraftTenantDetails?.mobileNo || "");
      setEmail(DraftTenantDetails?.emailId || "");
      setFile(DraftTenantDetails?.profilePic || "");
      // setDraftTenantId(DraftTenantDetails?.customerId || "");

      setIdProofType(
        DraftTenantDetails?.idProof?.type
          ? {
              value: DraftTenantDetails.idProof.type,
              label:
                DraftTenantDetails.idProof.type.charAt(0).toUpperCase() +
                DraftTenantDetails.idProof.type.slice(1),
            }
          : null,
      );
      setIdProofNo(DraftTenantDetails?.idProof?.number || "");

      setHouseNo(DraftTenantDetails?.address?.house || "");
      setStreet(DraftTenantDetails?.address?.street || "");
      setLandmark(DraftTenantDetails?.address?.landmark || "");
      setPincode(DraftTenantDetails?.address?.pincode || "");
      setCity(DraftTenantDetails?.address?.city || "");
      setStateName(DraftTenantDetails?.address?.state || "");

      setAadhaarFile(DraftTenantDetails?.aadharPic || "");
      setPanFile(DraftTenantDetails?.panPic || "");

      setEmploymentStatus(
        DraftTenantDetails?.jobDetails?.employmentStatus
          ? jobOptions.find(
              (item) =>
                item.value === DraftTenantDetails.jobDetails.employmentStatus,
            ) || null
          : null,
      );

      setCompanyName(DraftTenantDetails?.jobDetails?.companyName || "");
      // setCollegeName(DraftTenantDetails?.jobDetails?.collegeName || "");

      setJobRole(
        DraftTenantDetails?.jobDetails?.jobRole
          ? jobRoleOptions.find(
              (item) => item.value === DraftTenantDetails.jobDetails.jobRole,
            ) || null
          : null,
      );

      setWorkLocation(DraftTenantDetails?.jobDetails?.workLocation || "");

      setShiftType(
        DraftTenantDetails?.jobDetails?.shiftType
          ? shiftTypeOptions.find(
              (item) => item.value === DraftTenantDetails.jobDetails.shiftType,
            ) || null
          : null,
      );

      setFromTime(DraftTenantDetails?.jobDetails?.shiftFrom || "");
      setToTime(DraftTenantDetails?.jobDetails?.shiftTo || "");

      const mappedGuardians = (DraftTenantDetails?.guardians || [])
        .filter((g) => {
          return (
            g.guardianFullName?.trim() ||
            g.relationshipToTenant ||
            g.guardianOccupation ||
            g.mobileNo?.trim()
          );
        })
        .map((g) => ({
          guardianFullName: g.guardianFullName || "",
          relationshipToTenant:
            relationOptions.find(
              (option) => option.value === g.relationshipToTenant,
            ) || null,
          guardianOccupation:
            jobOptions.find(
              (option) => option.value === g.guardianOccupation,
            ) || null,
          mobileNo: g.mobileNo || "",
        }));

      setGuardians(
        mappedGuardians.length
          ? mappedGuardians
          : [
              {
                guardianFullName: "",
                relationshipToTenant: null,
                guardianOccupation: null,
                mobileNo: "",
              },
            ],
      );
      setPanFile(DraftTenantDetails?.panPic);
      setAadhaarFile(DraftTenantDetails?.aadharPic);
    } else {
      resetForm();
    }
  }, [DraftTenantDetails, newTenant, state.UsersList?.draftClickError]);

  const resetForm = () => {
    setFirstname("");
    setLastname("");
    setPhone("");
    setEmail("");
    setFile("");

    setIdProofType(null);
    setIdProofNo("");

    setHouseNo("");
    setStreet("");
    setLandmark("");
    setPincode("");
    setCity("");
    setStateName("");

    setAadhaarFile("");
    setPanFile("");

    setEmploymentStatus(null);
    setCompanyName("");
    setJobRole(null);
    setWorkLocation("");
    setShiftType(null);
    setFromTime("");
    setToTime("");

    setGuardians([
      {
        guardianFullName: "",
        relationshipToTenant: null,
        guardianOccupation: null,
        mobileNo: "",
      },
    ]);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        dispatch({ type: "REMOVE_TENANT_SEARCH_LIST_REDUCER" });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.UsersList?.minimumFourDigitError) {
      setSearchLoading(false);
    }
  }, [state.UsersList?.minimumFourDigitError]);

  useEffect(() => {
    if (state.UsersList?.isTenantSearching) {
      setSearchLoading(false);
    }
  }, [state.UsersList?.isTenantSearching]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201) {
      // setDraftTenantId(state.UsersList?.addUserResponse);
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
      }, 200);
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    state.UsersList?.statusCodeForAddCustomerSaveInfo,
  ]);

  // useEffect(() => {
  //   if (state.UsersList?.draftClickError) {
  //      setNewTenant(true);
  //   }
  // }, [state.UsersList?.draftClickError]);

  useEffect(() => {
    if (state.UsersList?.additionalUpdateError) {
      setSaveLoading(false);
      dispatch({ type: "REMOVE_ADDITIONAL_UPDATE_ERROR" });
    }
  }, [state.UsersList?.additionalUpdateError]);

  const step2Ref = useRef(null);

  useEffect(() => {
    if (step) {
      step2Ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [step]);

  if (!showMenu) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full h-full flex items-center justify-end p-2 ">
          <div className="w-full max-w-[900px] h-[95vh] bg-white rounded-[20px] flex overflow-hidden shadow-lg">
            <div className="w-[250px] min-w-[240px] bg-[#f4f8ff] p-4">
              <h5 className="mb-4 font-gilroy">
                {bookingOnly ? "Booking Tenant" : "Add New Tenant "}
              </h5>
              <div
                // onClick={() => {
                //   // if (isDisabled) return;
                //   setStep(1);
                // }}
                className="flex items-start  mb-4 cursor-pointer"
              >
                <div
                  className={`rounded-full flex items-center justify-center w-8 h-8 border ${step === 1 ? "bg-[#1E45E1]" : "bg-white"} border-[#1E45E1]`}
                >
                  <TableDocument
                    size="16"
                    color={step === 1 ? "#FFFFFF" : "#1E45E1"}
                  />
                </div>
                <span className="ml-2 font-gilroy text-sm cursor-pointer">
                  Step 1
                  <br />
                  <label className=" font-gilroy text-base cursor-pointer break-words">
                    Basic Details
                  </label>
                </span>
              </div>
              <div
                // onClick={() => {
                //   // if (isDisabled) return;
                //   if (newTenant && !handleSaveStepOne()) return;

                //   setStep(2);
                // }}
                className="flex items-start  mb-4 cursor-pointer"
              >
                <div
                  className={`rounded-full flex items-center justify-center w-8 h-8 border border-[#1E45E1] ${step === 2 ? "bg-[#1E45E1]" : "bg-white"}`}
                >
                  <DocumentText
                    size="16"
                    color={step === 2 ? "#FFFFFF" : "#1E45E1"}
                    className=" flex-shrink-0"
                  />
                </div>
                <span className="ml-2 font-gilroy text-sm cursor-pointer">
                  Step 2
                  <br />
                  <label className=" font-gilroy text-base cursor-pointer">
                    {bookingOnly ? "Booking " : "On-board Process "}
                  </label>
                </span>
              </div>
              {!bookingOnly && (
                <div
                  // onClick={() => {
                  //   if (newTenant && !handleSaveStepOne()) return;
                  //   setStep(3);
                  // }}
                  className="flex items-start  mb-4 cursor-pointer"
                >
                  <div
                    className={`rounded-full flex items-center  justify-center w-8 h-8 min-w-[32px] border border-[#1E45E1] ${step === 3 ? "bg-[#1E45E1]" : "bg-white"}`}
                  >
                    <DocumentText
                      size="16"
                      color={step === 3 ? "#FFFFFF" : "#1E45E1"}
                      className=" flex-shrink-0"
                    />
                  </div>
                  <span className="ml-2 font-gilroy text-sm cursor-pointer">
                    Step 3
                    <br />
                    <label className=" font-gilroy text-base cursor-pointer break-words">
                      Documents & Job Details
                    </label>
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 relative bg-white rounded-tr-[20px] rounded-br-[20px] overflow-y-auto my-2 mx-1">
              {step === 1 && (
                <div className="flex justify-between items-start px-2 py-1 sticky top-0 z-10 bg-white  border-[#eee]">
                  {step === 1 && (
                    <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                      <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                      Tenant Information
                    </h5>
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
                        <div className="w-full">
                          <div className="mb-4">
                            <p className="text-sm text-[#505F76] mb-1 font-medium">
                              Search or Add by Mobile Number
                            </p>
                            <div className="relative w-full">
                              <div
                                className={`flex items-center border rounded-lg mb-2 ${
                                  bookingOnly
                                    ? "bg-gray-100 opacity-60 cursor-not-allowed"
                                    : "bg-white"
                                }`}
                              >
                                <span className="text-gray-600 mr-4 px-2">
                                  +91
                                </span>

                                <input
                                  disabled={bookingOnly}
                                  type="text"
                                  inputMode="numeric"
                                  maxLength={10}
                                  value={search}
                                  onChange={handleChange}
                                  placeholder="Search"
                                  onWheel={(e) => e.target.blur()}
                                  className="bg-transparent outline-none w-full disabled:cursor-not-allowed"
                                />

                                <div
                                  onClick={
                                    !bookingOnly && !searchLoading
                                      ? handleSearch
                                      : undefined
                                  }
                                  className={`px-3 py-2 rounded-r-lg flex items-center justify-center min-w-[90px] ${
                                    bookingOnly
                                      ? "bg-gray-400 cursor-not-allowed"
                                      : searchLoading
                                        ? "bg-[#1E45E1] opacity-80 cursor-not-allowed"
                                        : "bg-[#1E45E1] cursor-pointer"
                                  }`}
                                >
                                  {searchLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  ) : (
                                    <SearchNormal color="#FFF" />
                                  )}
                                </div>
                              </div>
                              {state.UsersList?.isTenantSearching && (
                                <div
                                  ref={dropdownRef}
                                  className="absolute top-full left-0 w-full z-50 mt-1"
                                >
                                  {state?.UsersList?.searchTenant?.length >
                                  0 ? (
                                    <div className="bg-white border-1 border-[#46464640] shadow rounded-lg  max-h-[300px] overflow-y-auto show-scrolls">
                                      {state?.UsersList?.searchTenant?.map(
                                        (user, index) => (
                                          <div
                                            onClick={() =>
                                              handleDraftTenant(
                                                user?.customerId,
                                              )
                                            }
                                            key={user.id}
                                            className={`flex items-center gap-3 p-3 hover:bg-[#F7FAFF] cursor-pointer ${
                                              index !==
                                              state?.UsersList?.searchTenant
                                                ?.length -
                                                1
                                                ? "border-b border-[#F1F1F1]"
                                                : ""
                                            }`}
                                          >
                                            {user.profilePic ? (
                                              <img
                                                src={user.profilePic}
                                                alt="avatar"
                                                className="w-10 h-10 rounded-full"
                                              />
                                            ) : (
                                              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 text-gray-600">
                                                {user.initials?.charAt(0)}
                                              </div>
                                            )}

                                            <div className="flex flex-col">
                                              <p className="font-medium mb-1">
                                                {user.fullName}
                                              </p>

                                              <div className="flex items-center text-sm text-gray-500 gap-2 flex-wrap">
                                                <Mobile
                                                  size="18"
                                                  color="#1E45E1"
                                                />

                                                <span>
                                                  {highlightText(
                                                    user.mobile,
                                                    search,
                                                  )}
                                                </span>

                                                {user.emailId && (
                                                  <>
                                                    <span className="bg-[#D9D9D9] h-4 w-[1px]" />

                                                    <Sms
                                                      size="18"
                                                      color="#1E45E1"
                                                    />

                                                    <span>{user.emailId}</span>
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        ),
                                      )}
                                    </div>
                                  ) : (
                                    <div className="absolute w-full bg-white  rounded-lg shadow-lg p-3">
                                      <NoDataMessage
                                        label="Tenant"
                                        isHeightChanged={true}
                                        isSearching={true}
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>

                            {state.UsersList?.minimumFourDigitError && (
                              <ErrorMessage
                                message={state.UsersList?.minimumFourDigitError}
                                type="error"
                              />
                            )}

                            {state.UsersList?.draftClickError && (
                              <ErrorMessage
                                message={state.UsersList?.draftClickError}
                                type="error"
                              />
                            )}

                            <span className="text-xs text-[#747686] mb-1 font-medium whitespace-nowrap">
                              Search existing tenants in the Property flow
                              ecosystem to auto-fill details.
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-col justify-between">
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
                                Recommended size 400x400px. JPG or PNG allowed.
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
                                className={`text-base text-black  font-gilroy ${
                                  firstname ? "font-extrabold" : "font-medium"
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
                                className={`text-base text-black font-gilroy ${
                                  lastname ? "font-extrabold" : "font-medium"
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
                                onWheel={(e) => e.target.blur()}
                                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                              />
                            </div>
                          </div>

                          <div className="flex justify-between my-3 gap-1">
                            <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                              <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                              Address Details
                            </h5>

                            {/* <div className="text-[#64748B]">
                              <input
                                type="checkbox"
                                className="cursor-pointer "
                              />{" "}
                              Do it later
                            </div> */}
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
                            <button
                              disabled={
                                formLoading || state.UsersList?.draftClickError
                              }
                              className={`font-gilroy text-sm bg-[#EBEFFF] text-[#1E45E1]
                                 border-1 border-[#D6DEFF] font-semibold rounded-md py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap flex items-center justify-center gap-2 ${
                                   formLoading ||
                                   state.UsersList?.draftClickError
                                     ? "bg-gray-200 border-gray-200 text-gray-400 cursor-not-allowed opacity-70"
                                     : "bg-[#EBEFFF] border-[#D6DEFF] text-[#1E45E1] hover:bg-[#DDE5FF] cursor-pointer"
                                 }`}
                              onClick={
                                newTenant
                                  ? handleSaveStepOne
                                  : handleSaveUpdateStepOne
                              }
                            >
                              {formLoading ? (
                                <>
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
                                  Saving...
                                </>
                              ) : newTenant ? (
                                "Save &  Next"
                              ) : (
                                "Update &  Next"
                              )}
                            </button>
                            {/* <button
                              className="!font-gilroy text-sm flex items-center justify-center gap-1 !bg-[#1E45E1] !text-white !font-semibold !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap"
                              onClick={handleNext}
                            >
                              Next <ArrowRight color="#FFFFFF" size="18" />
                            </button> */}
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
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div ref={step2Ref}>
                      <AddTenantBookingCheckin
                        handleClose={handleClose}
                        handleNextStep={handleNextStep}
                        mobile={Phone}
                        firstname={firstname}
                        draftTenantId={draftTenantId}
                        newTenant={newTenant}
                        bookingOnly={bookingOnly}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6" ref={step2Ref}>
                      <div>
                        <div className="flex justify-between">
                          <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                            <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                            Upload Document
                          </h5>

                          <Add
                            size="24"
                            color="#FF0000"
                            onClick={handleClose}
                            className="cursor-pointer rotate-45"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div
                            onMouseEnter={() => setHovered("aadhaar")}
                            onMouseLeave={() => setHovered(null)}
                            className="relative   border border-dashed rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50"
                          >
                            {aadhaarFile && isImageFile(aadhaarFile) ? (
                              <img
                                src={getFilePreview(aadhaarFile)}
                                className="h-24 mx-auto rounded object-cover"
                                alt="Aadhaar"
                              />
                            ) : (
                              <DocumentUpload
                                size="24"
                                className="mx-auto text-gray-500 mb-2"
                              />
                            )}

                            <p className="text-sm font-medium mt-2 truncate">
                              {getFileName(aadhaarFile, "Aadhaar Card")}
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
                            {panFile && isImageFile(panFile) ? (
                              <img
                                src={getFilePreview(panFile)}
                                className="h-24 mx-auto rounded object-cover"
                                alt="PAN"
                              />
                            ) : (
                              <DocumentUpload
                                size="24"
                                className="mx-auto text-gray-500 mb-2"
                              />
                            )}

                            <p className="text-sm font-medium mt-2 truncate">
                              {getFileName(panFile, "Pan Card Copy")}
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
                        <h5 className="flex items-center text-[18px] font-semibold text-gray-800 mb-4">
                          <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                          Guardian Details
                        </h5>
                        {guardians?.map((guardian, index) => (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-lg p-2 mb-4"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <h6 className="font-semibold">
                                Guardian {index + 1}
                              </h6>

                              {guardians?.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => handleRemoveGuardian(index)}
                                  className="text-red-500 text-sm"
                                >
                                  <CloseCircle />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-12 gap-3">
                              <div className="col-span-12">
                                <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                  Guardian Full Name
                                </label>

                                <input
                                  ref={(el) =>
                                    (guardianNameRefs.current[index] = el)
                                  }
                                  value={guardian.guardianFullName}
                                  onChange={(e) => {
                                    const value = e.target.value;

                                    if (/^[A-Za-z\s]*$/.test(value)) {
                                      handleGuardianChange(
                                        index,
                                        "guardianFullName",
                                        value,
                                      );
                                    }
                                  }}
                                  placeholder="Guardian Full Name"
                                  className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none"
                                />
                              </div>

                              <div className="col-span-6">
                                <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                  Relationship to Tenant
                                </label>

                                <Select
                                  options={relationOptions}
                                  value={guardian.relationshipToTenant}
                                  onChange={(value) =>
                                    handleGuardianChange(
                                      index,
                                      "relationshipToTenant",
                                      value,
                                    )
                                  }
                                  placeholder="Select Relationship"
                                  styles={CustomStyles}
                                />
                              </div>

                              <div className="col-span-6">
                                <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                  Guardian Occupation
                                </label>

                                <Select
                                  options={jobOptions}
                                  value={guardian.guardianOccupation}
                                  onChange={(value) =>
                                    handleGuardianChange(
                                      index,
                                      "guardianOccupation",
                                      value,
                                    )
                                  }
                                  placeholder="Select Occupation"
                                  styles={CustomStyles}
                                />
                              </div>

                              <div className="col-span-12">
                                <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                  Mobile No
                                </label>

                                <input
                                  ref={(el) =>
                                    (guardianMobileRefs.current[index] = el)
                                  }
                                  type="number"
                                  value={guardian.mobileNo}
                                  onChange={(e) => {
                                    const value = e.target.value.replace(
                                      /\D/g,
                                      "",
                                    );

                                    if (value.length <= 10) {
                                      handleGuardianChange(
                                        index,
                                        "mobileNo",
                                        value,
                                      );
                                    }
                                  }}
                                  onWheel={(e) => e.target.blur()}
                                  maxLength={10}
                                  placeholder="Mobile No"
                                  className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none"
                                />
                                {guardianErrors[index]?.mobileNo && (
                                  <ErrorMessage
                                    message={guardianErrors[index]?.mobileNo}
                                    type="error"
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}

                        <div className="flex justify-end mt-2">
                          <button
                            onClick={handleAddGuardian}
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
                              options={jobRoleOptions}
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
                              options={shiftTypeOptions}
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

                      {/* <div>
                        <h5 className="flex items-center text-[18px] font-semibold text-gray-800 my-4">
                          <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                          Vehicle Details
                        </h5>

                        <div className="flex items-start justify-between">
                          <div>
                            <h2 className="text-[14px] font-semibold text-gray-800">
                              Have a Vehicle ?
                            </h2>
                            <p className="mt-1 text-xs text-[#8B8B8B]">
                              For a Parking Allocation Purpose
                            </p>
                          </div>

                          <button
                            type="button"
                            onClick={() => setHasVehicle(!hasVehicle)}
                            className={`relative h-7 w-12 rounded-full transition ${
                              hasVehicle ? "bg-[#4C5EFF]" : "bg-gray-300"
                            }`}
                          >
                            <span
                              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                                hasVehicle ? "right-1" : "left-1"
                              }`}
                            />
                          </button>
                        </div>
                        {hasVehicle && (
                          <div className="grid grid-cols-12 gap-3">
                            <div className="col-span-12">
                              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                Vehicle Type{" "}
                                <span className="text-red-500 text-[20px]">
                                  *
                                </span>
                              </label>
                              <Select
                                ref={vehicleTypeRef}
                                value={vehicleType}
                                onChange={handleVehicleTypeChange}
                                options={vehicleTypeOptions}
                                placeholder="Vehicle Type"
                                styles={CustomStyles}
                              />

                              {vehicleTypeError && (
                                <ErrorMessage
                                  message={vehicleTypeError}
                                  type="error"
                                />
                              )}
                            </div>

                            <div className="col-span-6">
                              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                Vehicle Number
                              </label>
                              <input
                                type="text"
                                ref={vehicleNumberRef}
                                value={vehicleNumber}
                                onChange={handleVehicleNumberChange}
                                placeholder="Help us to Identify on the parking..."
                                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                              />
                              {vehicleNumberError && (
                                <ErrorMessage
                                  message={vehicleNumberError}
                                  type="error"
                                />
                              )}
                            </div>

                            <div className="col-span-6">
                              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                Parking Space if
                              </label>
                              <input
                                ref={parkingSpaceRef}
                                value={parkingSpace}
                                onChange={handleParkingSpaceChange}
                                placeholder="Enter the Block or Space No"
                                className="w-full h-[44px] px-3 border border-gray-200 rounded-lg text-sm outline-none "
                              />
                            </div>
                          </div>
                        )}
                      </div> */}

                      <div className="flex justify-end mt-4">
                        <button
                          className="bg-gray-200 text-gray-600 px-4 py-2 rounded !py-2.5 px-4 mb-2 max-h-[45px] w-[146px] whitespace-nowrap"
                          onClick={handleClose}
                        >
                          Do it later
                        </button>

                        <button
                          onClick={handleSaveStep3}
                          disabled={saveLoading}
                          className={`font-gilroy text-sm bg-[#038C3D] text-white font-semibold rounded-md py-2.5 px-4 mb-2 mx-2 h-11 w-36 whitespace-nowrap flex items-center justify-center gap-2 ${
                            saveLoading ? "opacity-70 cursor-not-allowed" : ""
                          }`}
                        >
                          {saveLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              Saving...
                            </>
                          ) : (
                            "Save"
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
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
  alreadySaveDraftTenantDetails: PropTypes?.object,
  bookingOnly: PropTypes?.bool,
};
export default AddTenant;

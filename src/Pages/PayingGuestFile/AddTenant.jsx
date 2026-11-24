/* eslint-disable react-hooks/exhaustive-deps */
import { Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  ArrowRight,
  DocumentUpload,
  Trash,
  SearchNormal,
} from "iconsax-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  fieldClass,
  fieldGroupClass,
  fieldInnerInputClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";

import AddTenantBookingCheckin from "./AddTenantBookingCheckin";
import TenantStepper from "./TenantStepper";
import stepperIllustration from "../../Assets/Images/New_images/tenant-stepper/stepper-illustration.png";
import TenantPreview from "./TenantPreview";
import TenantAddedSuccess from "./TenantAddedSuccess";
import UnsavedChangesDialog from "./UnsavedChangesDialog";
import { toast } from "react-toastify";
import {
  DRAFT_EXTRA_FIELDS_ENABLED,
  STEP_BASIC,
  STEP_DOCUMENTS,
  STEP_ONBOARD,
  STEP_PREVIEW,
  TENANT_BTN_PRIMARY,
  TENANT_BTN_SECONDARY,
  TENANT_BTN_TERTIARY,
  TENANT_FOOTER_CLASS,
  getNextStep,
  getPreviousStep,
  getResumeStep,
  getTenantSteps,
  withDraftExtras,
} from "./tenantDraftUtils";

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

function AddTenant({
  showMenu,
  handleClose,
  alreadySaveDraftTenantDetails,
  bookingOnly,
  onTenantCreated,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [step, setStep] = useState(1);
  // "checkin" | "booking": follows the tab chosen on Step 2 and drives the stepper.
  const [flow, setFlow] = useState(bookingOnly ? "booking" : "checkin");
  const [addressLater, setAddressLater] = useState(false);
  // Step 2 form (imperative API: validate, getDraftFields, getSummary, submit...).
  const step2Api = useRef(null);
  // What the draft save in flight is for: "exit" (Save Draft) or "submit" (final
  // confirmation, which saves the draft first because the booking / check-in
  // endpoints work on the draft customer). null when idle.
  const pendingActionRef = useRef(null);
  const pendingStep2Ref = useRef(null);
  const submittingRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  // After an Edit from Preview Details, Next returns straight to the preview.
  const [returnToPreview, setReturnToPreview] = useState(false);
  const [step2Summary, setStep2Summary] = useState(null);


  const [successInfo, setSuccessInfo] = useState(null);
  const [showUnsaved, setShowUnsaved] = useState(false);
  const [restoredDraftId, setRestoredDraftId] = useState("");
  const awaitingAdditionalRef = useRef(false);
  const resumeAppliedRef = useRef(false);
  // Step 2 stays mounted once opened, so going back and forth keeps unsaved edits.
  const [step2Opened, setStep2Opened] = useState(false);
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
  const [newTenant, setNewTenant] = useState(true);
  const DraftTenantDetails =
    state?.UsersList?.alreadyAvailableDraftTenantGetList;
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

  const [jobDetails, setJobDetails] = useState([
    {
      employmentStatus: null,
      organizationName: "",
      role: null,
      workLocation: "",
      shiftType: null,
      fromTime: "",
      toTime: "",
    },
  ]);
  // const [relationship, setRelationship] = useState(null);
  // const [occupation, setOccupation] = useState(null);
  // const [mobile, setMobile] = useState("");
  const [aadhaarFile, setAadhaarFile] = useState(null);
  const [panFile, setPanFile] = useState(null);

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

  // DraftTenantDetails

  // useEffect(() => {
  //   if (!newTenant) {
  //     const customerId =
  //       state?.UsersList?.customerdetails?.customerId ||
  //       DraftTenantDetails?.customerId ||
  //       state?.UsersList?.draftTenantDetails?.customerId ||
  //       state?.UsersList?.UpdateDraftTenantDetails?.customerId;


  //     const fromCustomerDetails = state?.UsersList?.customerdetails?.customerId;
  //     const fromDraftGet = DraftTenantDetails?.customerId;
  //     const fromSaveDraft = state?.UsersList?.draftTenantDetails?.customerId;
  //     const fromUpdateDraft = state?.UsersList?.UpdateDraftTenantDetails?.customerId;

  //     console.log("1. customerdetails      :", fromCustomerDetails);
  //     console.log("2. DraftTenantDetails   :", fromDraftGet);
  //     console.log("3. draftTenantDetails   :", fromSaveDraft);
  //     console.log("4. UpdateDraftTenantDetails:", fromUpdateDraft);

  //     setDraftTenantId(customerId || "");
  //   } else {
  //     setDraftTenantId("");
  //   }
  // }, [
  //   newTenant,
  //   state?.UsersList?.draftTenantDetails?.customerId,
  //   state?.UsersList?.UpdateDraftTenantDetails?.customerId,
  //   DraftTenantDetails?.customerId,
  //   state?.UsersList?.customerdetails?.customerId,
  // ]);

  useEffect(() => {
    if (!newTenant && DraftTenantDetails?.customerId) {
      setDraftTenantId(DraftTenantDetails.customerId);
    }
  }, [newTenant, DraftTenantDetails?.customerId]);




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

  const handleJobChange = (index, field, value) => {
    setJobDetails((prev) =>
      prev.map((job, i) =>
        i === index
          ? {
            ...job,
            [field]: value,
          }
          : job,
      ),
    );
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
      if (
        alreadySaveDraftTenantDetails?.apiCall?.customerId ||
        alreadySaveDraftTenantDetails?.customerId
      ) {
        dispatch({
          type: "DRAFT_TENANT_LIST_SAGA",
          payload:
            alreadySaveDraftTenantDetails?.apiCall?.customerId ||
            alreadySaveDraftTenantDetails?.customerId,
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
    const value = e.target.value;
    const pattern = /^[a-zA-Z0-9\s]*$/;

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
      failSubmit();
      setStep(1);
      phoneRef.current?.focus();
      setFormLoading(false);
    }
  }, [state.UsersList.phoneError]);

  useEffect(() => {
    if (state.UsersList.emailError) {
      failSubmit();
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

  // ---- Step 1 ---------------------------------------------------------------

  // Name, mobile, email and (unless "Do it Later") pincode validation.
  const validateStepOne = () => {
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

    // "Do it Later" skips address validation entirely.
    if (pincode && !addressLater) {
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

    return !hasError;
  };

  const buildPersonalRequest = () => ({
    firstName: capitalizedFirstname || "",
    lastName: capitalizedLastname || "",
    mobile: Phone || "",
    emailId: Email || "",
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
    guardians: (guardians || [])
      .filter(
        (g) =>
          g.guardianFullName?.trim() ||
          g.relationshipToTenant ||
          g.guardianOccupation ||
          g.mobileNo?.trim(),
      )
      .map((g) => ({
        guardianFullName: g.guardianFullName || "",
        relationshipToTenant:
          g.relationshipToTenant?.value || g.relationshipToTenant || "",
        guardianOccupation:
          g.guardianOccupation?.value || g.guardianOccupation || "",
        mobileNo: g.mobileNo || "",
      })),
  });

  // Step 2 columns of the draft request. Step 2's own values (when its form is
  // open) win; anything else falls back to what the saved draft already holds.
  const existingStep2Fields = (customerId) => {
    const saved =
      DraftTenantDetails &&
        String(DraftTenantDetails.customerId) === String(customerId)
        ? DraftTenantDetails
        : null;
    return {
      joiningDate: saved?.hostelInfo?.joiningDate || "",
      bookingDate: saved?.bookingInfo?.bookingDate || "",
      bookingAmount: saved?.bookingAmount ?? "",
      bedId: saved?.bedDetails?.bedId ?? "",
      roomId: saved?.bedDetails?.roomId ?? "",
      floorId: saved?.bedDetails?.floorId ?? "",
      bankId: saved?.bankId || "",
      referenceNumber: saved?.referenceNumber || "",
      advanceAmount: saved?.hostelInfo?.advanceAmount ?? "",
      rentalAmount: saved?.hostelInfo?.monthlyRent ?? "",
      stayType: saved?.stayType || "",
      deductions: saved?.deductions || [],
      proRate: saved?.proRate ?? true,
      booking: {
        joiningDateTentative: saved?.booking?.joiningDateTentative || "",
        refuseAdvanceAmount: saved?.booking?.refuseAdvanceAmount ?? true,
      },
      jobDetails: {
        employmentStatus: saved?.jobDetails?.employmentStatus || "",
        companyName: saved?.jobDetails?.companyName || "",
        collegeName: saved?.jobDetails?.collegeName || "",
        jobRole: saved?.jobDetails?.jobRole || "",
        workLocation: saved?.jobDetails?.workLocation || "",
        shiftType: saved?.jobDetails?.shiftType || "",
        shiftFrom: saved?.jobDetails?.shiftFrom || "",
        shiftTo: saved?.jobDetails?.shiftTo || "",
      },
      shouldCollectFullRent: saved?.shouldCollectFullRent,
      customRent: saved?.customRent,
      oneTimeDeduction: saved?.oneTimeDeduction || [],
    };
  };

  // Creates the draft customer (SAVE_DRAFT) or updates it (UPDATE_SAVE_DRAFT).
  // A draft is never a tenant, booking or check-in.
  const dispatchDraftSave = (customerId, step2Fields, action) => {
    const base = {
      hostelId: state?.login?.selectedHostel_Id,
      profilePic: file || "",
      // Proof images travel with a Save Draft; on final confirmation they are
      // uploaded with the additional details instead (see dispatchAdditionalDetails).
      aadharPic: action === "submit" ? "" : aadhaarFile || "",
      panPic: action === "submit" ? "" : panFile || "",
    };
    const meta = { addressLater, currentStep: step };

    if (!customerId) {
      dispatch({
        type: "SAVE_DRAFT_SAGA",
        payload: {
          ...base,
          request: withDraftExtras(
            { ...buildPersonalRequest(), proRate: true },
            meta,
          ),
        },
      });
      return;
    }

    dispatch({
      type: "UPDATE_SAVE_DRAFT_SAGA",
      payload: {
        ...base,
        customerId,
        request: withDraftExtras(
          {
            ...existingStep2Fields(customerId),
            ...buildPersonalRequest(),
            ...(step2Fields || {}),
          },
          meta,
        ),
      },
    });
  };

  const persistDraft = (action) => {
    pendingActionRef.current = action;
    const step2Fields = step2Api.current?.getDraftFields?.() || null;
    pendingStep2Ref.current = step2Fields;
    dispatchDraftSave(draftTenantId, step2Fields, action);
  };




  // ---- Step navigation --------------------------------------------------------

  const isBookingFlow = flow === "booking";

  const goToStep = (target) => {
    if (target === STEP_PREVIEW) {
      setStep2Summary(step2Api.current?.getSummary?.() || null);
      setConfirmed(false);
      setSubmitError("");
    }
    setStep(target);
  };

  // Continue to the next step (or straight back to Preview after an Edit).
  const goNext = () => {
    if (returnToPreview) {
      setReturnToPreview(false);
      goToStep(STEP_PREVIEW);
      return;
    }
    goToStep(getNextStep(step, isBookingFlow));
  };

  const handleNextFromStepOne = () => {
    if (validateStepOne()) goNext();
  };

  const handleNextFromStepThree = () => {
    if (validateStepThree()) goNext();
  };

  // "Skip for now": documents and job details are optional, nothing is validated here.
  const handleSkipStepThree = () => goNext();

  const handleEdit = (target) => {
    setReturnToPreview(true);
    setSubmitError("");
    setStep(target);
  };

  const handleStepperSelect = (target) => {
    if (target >= step) return;
    setReturnToPreview(step === STEP_PREVIEW);
    setSubmitError("");
    setStep(target);
  };

  // ---- Closing midway ------------------------------------------------------------

  // Anything typed or a step beyond the first means there is work to lose.
  const isDirty = () =>
    step > STEP_BASIC ||
    !!(firstname || lastname || Phone || Email || idProofNo || house_no || street || city || pincode);

  // Every close (X) goes through here: warn before throwing work away.
  const requestClose = () => {
    if (!submitting && isDirty()) {
      setShowUnsaved(true);
      return;
    }
    handleClose();
  };

  const handleUnsavedSaveDraft = () => {
    setShowUnsaved(false);
    handleSaveDraft();
  };

  // ---- Save Draft (every step) ---------------------------------------------------

  const handleSaveDraft = () => {
    if (!validateStepOne()) {
      setStep(STEP_BASIC);
      return;
    }
    setFormLoading(true);
    persistDraft("exit");
  };

  // ---- Final confirmation (Preview Details) --------------------------------------

  const failSubmit = (message) => {
    pendingActionRef.current = null;
    submittingRef.current = false;
    setSubmitting(false);
    setFormLoading(false);
    if (message) setSubmitError(message);
  };

  const handleConfirm = () => {
    if (submittingRef.current) return; // double-click guard
    setSubmitError("");

    if (!validateStepOne()) {
      setStep(STEP_BASIC);
      return;
    }
    if (!step2Api.current?.validate?.()) {
      setStep(STEP_ONBOARD);
      return;
    }
    if (!isBookingFlow && !validateStepThree()) {
      setStep(STEP_DOCUMENTS);
      return;
    }

    submittingRef.current = true;
    setSubmitting(true);
    persistDraft("submit");
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

  // Guardian validation for Step 3 (everything on this step is optional).
  const validateStepThree = () => {
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

      return false;
    }
    return true;
  };

  // Guardians, job details or newly chosen proof images entered on Step 3.
  const hasAdditionalDetails = () =>
    aadhaarFile instanceof File ||
    panFile instanceof File ||
    guardians?.some(
      (g) =>
        g.guardianFullName?.trim() ||
        g.relationshipToTenant ||
        g.guardianOccupation ||
        g.mobileNo?.trim(),
    ) ||
    jobDetails?.some(
      (job) =>
        job.employmentStatus ||
        job.organizationName?.trim() ||
        job.role ||
        job.workLocation?.trim() ||
        job.shiftType,
    );

  const dispatchAdditionalDetails = (customerId) => {
    dispatch({
      type: "ADDITIONAL_DETAILS_TENANT_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        customerId,
        aadhaarPic: aadhaarFile instanceof File ? aadhaarFile : "",
        panPic: panFile instanceof File ? panFile : "",
        additionalData: {
          guardians: guardians?.map((g) => ({
            guardianFullName: g.guardianFullName || "",
            relationshipToTenant:
              g.relationshipToTenant?.value || g.relationshipToTenant || "",
            guardianOccupation:
              g.guardianOccupation?.value || g.guardianOccupation || "",
            mobileNo: g.mobileNo || "",
          })),
          customerJobs: jobDetails?.map((job) => ({
            hostelId: state?.login?.selectedHostel_Id,
            customerId,
            employmentStatus:
              job.employmentStatus?.value || job.employmentStatus || "",
            organizationName: job.organizationName?.trim() || "",
            role: job.role?.value || job.role || "",
            workLocation: job.workLocation?.trim() || "",
            shiftType: job.shiftType?.value || job.shiftType || "",
            shiftStartsFrom: job.fromTime || "",
            shiftEndsAt: job.toTime || "",
          })),
        },
      },
    });
  };


  useEffect(() => {
    if (state.UsersList?.phoneError) {
      setFormLoading(false);
      dispatch({ type: 'CLEAR_PHONE_ERROR' })
    }
  }, [state.UsersList?.phoneError]);

  // ---- Draft save results ---------------------------------------------------------

  // Called once the draft customer is stored (created or updated).
  const afterDraftPersisted = (customerId) => {
    const action = pendingActionRef.current;
    pendingActionRef.current = null;

    if (action === "exit") {
      setFormLoading(false);
      toast.success("Draft saved");
      handleClose();
      return;
    }

    if (action === "submit") {
      const ok = isBookingFlow
        ? step2Api.current?.submitBooking?.(customerId)
        : step2Api.current?.submitCheckin?.(customerId);
      if (!ok) failSubmit("Please review the highlighted details and try again.");
    }
  };

  // console.log("state.UsersList?.saveDreaftTenantSuccessCode", state.UsersList?.saveDreaftTenantSuccessCode)

  useEffect(() => {
    if (state.UsersList?.saveDreaftTenantSuccessCode === 201) {
      dispatch({ type: "REMOVE_SAVE_DRAFT_REDUCER" });
      const newId = state?.UsersList?.draftTenantDetails?.customerId;
      if (newId) setDraftTenantId(newId);
      // A brand new draft only holds the personal details; store Step 2 next.
      if (pendingStep2Ref.current && newId) {
        const step2Fields = pendingStep2Ref.current;
        pendingStep2Ref.current = null;
        dispatchDraftSave(newId, step2Fields, pendingActionRef.current);
        return;
      }
      afterDraftPersisted(newId);
    }
  }, [state.UsersList?.saveDreaftTenantSuccessCode]);

  useEffect(() => {
    if (state.UsersList?.updateSaveDreaftTenantStatus === 200) {
      dispatch({ type: "REMOVE_UPDATE_SAVE_DRAFT_REDUCER" });
      const updatedId =
        state?.UsersList?.UpdateDraftTenantDetails?.customerId || draftTenantId;

      if (updatedId) setDraftTenantId(updatedId);
      afterDraftPersisted(
        draftTenantId ||
        state?.UsersList?.UpdateDraftTenantDetails?.customerId,
      );
    }
  }, [state.UsersList?.updateSaveDreaftTenantStatus]);

  // ---- Final success ---------------------------------------------------------------

  const completeSuccess = (type) => {
    pendingActionRef.current = null;
    submittingRef.current = false;
    setSubmitting(false);
    dispatch({
      type: "USERLIST",
      payload: { hostel_id: state.login.selectedHostel_Id, page: 1, size: 10 },
    });
    setSuccessInfo({
      flow: type,
      customerId: draftTenantId,
      // The create endpoints only return a message, so the name is the one the
      // draft customer was stored with.
      name: `${capitalizedFirstname} ${capitalizedLastname}`.trim(),
    });
  };

  // Called by Step 2 once the backend confirmed the booking / check-in.
  const handleSubmitSuccess = (type) => {
    if (type === "checkin" && hasAdditionalDetails()) {
      awaitingAdditionalRef.current = true;
      dispatchAdditionalDetails(draftTenantId);
      return;
    }
    completeSuccess(type);
  };

  useEffect(() => {
    if (state.UsersList?.addtionalDetailsSuccessCode === 201) {
      dispatch({ type: "REMOVE_ADDITIONAL_DETAILS_TENANT_REDUCER" });
      if (awaitingAdditionalRef.current) {
        awaitingAdditionalRef.current = false;
        completeSuccess("checkin");
      }
    }
  }, [state.UsersList?.addtionalDetailsSuccessCode]);

  // The check-in already succeeded; only the optional extras failed to save.
  useEffect(() => {
    if (state.UsersList?.additionalUpdateError && awaitingAdditionalRef.current) {
      awaitingAdditionalRef.current = false;
      toast.warning(
        "Checked in, but guardian / job / document details were not saved. Add them from the tenant profile.",
      );
      completeSuccess("checkin");
    }
  }, [state.UsersList?.additionalUpdateError]);

  const handleSuccessClose = () => {
    const created = successInfo;
    setSuccessInfo(null);
    onTenantCreated?.(created?.customerId);
    handleClose();
  };

  // ---- Failures --------------------------------------------------------------------

  const apiErrorText = (value) => (typeof value === "string" ? value : "");

  const handleSubmitFailed = () => {
    failSubmit(
      apiErrorText(state.UsersList?.bedError) ||
      apiErrorText(state.Booking?.bookingBedError) ||
      "Could not complete the request. Please try again.",
    );
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      failSubmit(
        submittingRef.current
          ? "Network error. Your details are kept, please try again."
          : "",
      );
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

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



  useEffect(() => {
    if (DraftTenantDetails && !newTenant && !state.UsersList?.draftClickError) {
      setFirstname(DraftTenantDetails?.firstName || "");
      setLastname(DraftTenantDetails?.lastName || "");
      setPhone(DraftTenantDetails?.mobileNo || "");
      setEmail(DraftTenantDetails?.emailId || "");
      setFile(DraftTenantDetails?.profilePic || "");
      // Without backend support the choice is kept in the form only.
      if (DRAFT_EXTRA_FIELDS_ENABLED) {
        setAddressLater(!!DraftTenantDetails?.addressLater);
      }
      setDraftTenantId(DraftTenantDetails?.customerId || "");

      // Reopen a saved draft on the right step (once, not on every refresh).
      const resumeCustomerId =
        alreadySaveDraftTenantDetails?.apiCall?.customerId ||
        alreadySaveDraftTenantDetails?.customerId;
      if (
        resumeCustomerId &&
        !resumeAppliedRef.current &&
        String(DraftTenantDetails?.customerId) === String(resumeCustomerId)
      ) {
        resumeAppliedRef.current = true;
        setStep(getResumeStep(DraftTenantDetails));
      }
      if (DraftTenantDetails?.customerId) {
        setRestoredDraftId(DraftTenantDetails.customerId);
      }

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

      // setEmploymentStatus(
      //   DraftTenantDetails?.jobDetails?.employmentStatus
      //     ? jobOptions.find(
      //         (item) =>
      //           item.value === DraftTenantDetails.jobDetails.employmentStatus,
      //       ) || null
      //     : null,
      // );

      // setCompanyName(DraftTenantDetails?.jobDetails?.companyName || "");
      // setCollegeName(DraftTenantDetails?.jobDetails?.collegeName || "");

      // setJobRole(
      //   DraftTenantDetails?.jobDetails?.jobRole
      //     ? jobRoleOptions.find(
      //         (item) => item.value === DraftTenantDetails.jobDetails.jobRole,
      //       ) || null
      //     : null,
      // );

      // setWorkLocation(DraftTenantDetails?.jobDetails?.workLocation || "");

      // setShiftType(
      //   DraftTenantDetails?.jobDetails?.shiftType
      //     ? shiftTypeOptions.find(
      //         (item) => item.value === DraftTenantDetails.jobDetails.shiftType,
      //       ) || null
      //     : null,
      // );

      // setFromTime(DraftTenantDetails?.jobDetails?.shiftFrom || "");
      // setToTime(DraftTenantDetails?.jobDetails?.shiftTo || "");

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
    setAddressLater(false);
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
      dispatch({ type: "REMOVE_ADDITIONAL_UPDATE_ERROR" });
    }
  }, [state.UsersList?.additionalUpdateError]);

  const step2Ref = useRef(null);

  useEffect(() => {
    if (step === 2) setStep2Opened(true);
  }, [step]);

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
      {/* <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 ${successInfo ? "invisible" : ""}`}> */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="w-full h-full flex items-center justify-end p-[9px] font-gilroy">
          <div className="w-full max-w-[1008px] h-full bg-white rounded-[20px] flex gap-[30px] p-[16px] pr-[26px] overflow-hidden shadow-lg">
            <div className="relative flex w-[271px] min-w-[271px] flex-col gap-[51px] overflow-hidden rounded-[10px] bg-[#f4f8ff] px-[24px] py-[40px]">
              <h5 className="m-0 font-gilroy text-[24px] font-semibold text-[#222222]">
                {bookingOnly ? "Booking Tenant" : "Add New Tenant"}
              </h5>
              <TenantStepper
                steps={getTenantSteps(isBookingFlow, !!bookingOnly)}
                current={step}
                onSelect={handleStepperSelect}
              />
              <img
                src={stepperIllustration}
                alt=""
                aria-hidden
                className="pointer-events-none absolute bottom-0 left-[-15px] w-[291px] max-w-none opacity-50"
              />
            </div>

            <div className="flex-1 min-w-0 min-h-0 flex flex-col bg-white">
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
                    onClick={requestClose}
                    className="cursor-pointer rotate-45"
                  />
                </div>
              )}
              {/* The only scroll area; footers inside it are sticky. */}
              <div className="show-scrolls flex-1 min-h-0 overflow-y-auto overflow-x-hidden -mx-[4px] px-[4px] pt-[4px]">
                <div>
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
                                className={`${fieldGroupClass(false, "secondary")} !pr-0 mb-2 overflow-hidden ${bookingOnly ? "opacity-60 cursor-not-allowed" : ""}`}
                              >
                                <span className="font-gilroy text-[14px] font-medium text-[#18181B]">
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
                                  className={fieldInnerInputClass}
                                />

                                <div
                                  onClick={
                                    !bookingOnly && !searchLoading
                                      ? handleSearch
                                      : undefined
                                  }
                                  className={`h-full w-[52px] shrink-0 flex items-center justify-center ${bookingOnly
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
                                            className={`flex items-center gap-3 p-3 hover:bg-[#F7FAFF] cursor-pointer ${index !==
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
                                className={fieldClass(!!firstnameError)}
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
                                className={fieldClass()}
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

                                <div className={fieldGroupClass(!!phoneError)}>
                                  <span className="flex shrink-0 items-center gap-1 font-gilroy text-[14px] font-medium text-[#18181B] select-none">
                                    +{countryCode}
                                    <ArrowDown2 size="14" color="#18181B" />
                                  </span>
                                  <input
                                    value={Phone}
                                    ref={phoneRef}
                                    onChange={handlePhone}
                                    type="text"
                                    inputMode="numeric"
                                    placeholder="Enter Mobile Number"
                                    maxLength={10}
                                    className={fieldInnerInputClass}
                                  />
                                </div>

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
                                className={fieldClass(!!emailError)}
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
                                styles={fieldSelectStyles()}
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
                                className={fieldClass()}
                              />
                            </div>
                          </div>

                          <div className="flex justify-between my-3 gap-1">
                            <h5 className="flex items-center text-[18px] font-semibold text-gray-800">
                              <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                              Address Details
                            </h5>

                            <label className="flex items-center gap-2 text-sm text-[#64748B] font-gilroy font-medium cursor-pointer m-0">
                              <input
                                type="checkbox"
                                checked={addressLater}
                                onChange={(e) => {
                                  setAddressLater(e.target.checked);
                                  if (e.target.checked) setPincodeError("");
                                }}
                                className="cursor-pointer w-4 h-4 accent-[#1E45E1]"
                              />
                              Do it Later
                            </label>
                          </div>

                          {!addressLater && (
                            <>
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
                                      className={fieldClass(!!house_noError)}
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
                                      className={fieldClass(!!streetError)}
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
                                      className={fieldClass(!!landmarkError)}
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
                                      className={fieldClass(!!pincodeError)}
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
                                      className={fieldClass(!!cityError)}
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
                                    menuPlacement="auto"
                                    noOptionsMessage={() => "No state available"}
                                    styles={fieldSelectStyles()}
                                  />
                                </Form.Group>
                              </div>
                            </>
                          )}
                          <div className={TENANT_FOOTER_CLASS}>
                            <button
                              type="button"
                              disabled={formLoading}
                              className={TENANT_BTN_SECONDARY}
                              onClick={handleSaveDraft}
                            >
                              {formLoading ? (
                                <>
                                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
                                  Saving...
                                </>
                              ) : (
                                "Save Draft"
                              )}
                            </button>
                            <button
                              type="button"
                              disabled={formLoading || state.UsersList?.draftClickError}
                              className={TENANT_BTN_PRIMARY}
                              onClick={handleNextFromStepOne}
                            >
                              Next <ArrowRight color="#FFFFFF" size="16" />
                            </button>
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

                  {step2Opened && (
                    <div
                      ref={step === 2 ? step2Ref : null}
                      className={step === 2 ? "" : "hidden"}
                    >
                      <AddTenantBookingCheckin
                        ref={step2Api}
                        handleClose={requestClose}
                        newTenant={newTenant}
                        bookingOnly={bookingOnly}
                        initialFlow={flow}
                        restoredDraftId={restoredDraftId}
                        onFlowChange={setFlow}
                        onNext={goNext}
                        onSaveDraft={handleSaveDraft}
                        draftSaving={formLoading}
                        onSubmitSuccess={handleSubmitSuccess}
                        onSubmitError={handleSubmitFailed}
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
                            onClick={requestClose}
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
                                  className={fieldClass()}
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
                                  styles={fieldSelectStyles()}
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
                                  styles={fieldSelectStyles()}
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
                                  className={fieldClass(!!guardianErrors[index]?.mobileNo)}
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

                        <div className="space-y-5">
                          {jobDetails.map((job, index) => (
                            <div
                              key={index}
                              className="border border-gray-200 rounded-xl p-4"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h6 className="text-sm font-semibold text-[#222222] mb-0">
                                  Job Details {index + 1}
                                </h6>

                                {jobDetails.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setJobDetails((prev) =>
                                        prev.filter((_, i) => i !== index),
                                      )
                                    }
                                    className="text-red-500 text-sm font-medium"
                                  >
                                    <Add className="rotate-45" />
                                  </button>
                                )}
                              </div>

                              <div className="grid grid-cols-12 gap-3">
                                <div className="col-span-12">
                                  <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                    Employment Status
                                  </label>

                                  <Select
                                    options={jobOptions}
                                    value={job.employmentStatus}
                                    onChange={(value) =>
                                      handleJobChange(
                                        index,
                                        "employmentStatus",
                                        value,
                                      )
                                    }
                                    placeholder="Employment Status"
                                    styles={fieldSelectStyles()}
                                  />
                                </div>

                                <div className="col-span-12">
                                  <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                    Company/College Name
                                  </label>

                                  <input
                                    value={job.organizationName}
                                    onChange={(e) =>
                                      handleJobChange(
                                        index,
                                        "organizationName",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Company / College Name"
                                    className={fieldClass()}
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                    Job Role
                                  </label>

                                  <Select
                                    options={jobRoleOptions}
                                    value={job.role}
                                    onChange={(value) =>
                                      handleJobChange(index, "role", value)
                                    }
                                    placeholder="Job Role"
                                    styles={fieldSelectStyles()}
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                    Work Location
                                  </label>

                                  <input
                                    value={job.workLocation}
                                    onChange={(e) =>
                                      handleJobChange(
                                        index,
                                        "workLocation",
                                        e.target.value,
                                      )
                                    }
                                    placeholder="Work Location"
                                    className={fieldClass()}
                                  />
                                </div>

                                <div className="col-span-12">
                                  <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                    Shift Type
                                  </label>

                                  <Select
                                    options={shiftTypeOptions}
                                    value={job.shiftType}
                                    onChange={(value) =>
                                      handleJobChange(index, "shiftType", value)
                                    }
                                    placeholder="Shift Type"
                                    styles={fieldSelectStyles()}
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                    Shift From
                                  </label>

                                  <input
                                    type="time"
                                    value={job.fromTime}
                                    onChange={(e) =>
                                      handleJobChange(
                                        index,
                                        "fromTime",
                                        e.target.value,
                                      )
                                    }
                                    className={fieldClass()}
                                  />
                                </div>

                                <div className="col-span-6">
                                  <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy mb-2">
                                    To
                                  </label>

                                  <input
                                    type="time"
                                    value={job.toTime}
                                    onChange={(e) =>
                                      handleJobChange(
                                        index,
                                        "toTime",
                                        e.target.value,
                                      )
                                    }
                                    className={fieldClass()}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}

                          <div className="flex justify-end mt-2">
                            <button
                              type="button"
                              onClick={() =>
                                setJobDetails((prev) => [
                                  ...prev,
                                  {
                                    employmentStatus: null,
                                    organizationName: "",
                                    role: null,
                                    workLocation: "",
                                    shiftType: null,
                                    fromTime: "",
                                    toTime: "",
                                  },
                                ])
                              }
                              className="font-gilroy text-sm bg-[#1E45E1] text-white font-semibold rounded-md px-2 py-2 mb-2 max-h-[45px] w-[146px] whitespace-nowrap flex items-center gap-2 disabled:opacity-50"
                            >
                              <AddCircle size="16" color="#FFFFFF" />
                              <span>Additional Job</span>
                            </button>
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
                                styles={fieldSelectStyles(!!vehicleTypeError)}
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
                                className={fieldClass(!!vehicleNumberError)}
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
                                className={fieldClass()}
                              />
                            </div>
                          </div>
                        )}
                      </div> */}

                      <div className={TENANT_FOOTER_CLASS}>
                        <button
                          type="button"
                          disabled={formLoading}
                          onClick={handleSaveDraft}
                          className={TENANT_BTN_SECONDARY}
                        >
                          {formLoading ? (
                            <>
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
                              Saving...
                            </>
                          ) : (
                            "Save Draft"
                          )}
                        </button>
                        <div className="flex items-center gap-[12px]">
                          <button
                            type="button"
                            onClick={handleSkipStepThree}
                            className={TENANT_BTN_TERTIARY}
                          >
                            Skip for now
                          </button>
                          <button
                            type="button"
                            onClick={handleNextFromStepThree}
                            className={TENANT_BTN_PRIMARY}
                          >
                            Next <ArrowRight color="#FFFFFF" size="16" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === STEP_PREVIEW && step2Summary && (
                    <div ref={step2Ref}>
                      <h5 className="mb-3 flex items-center text-[18px] font-semibold text-gray-800">
                        <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
                        Preview Details
                      </h5>
                      <TenantPreview
                        flow={isBookingFlow ? "booking" : "checkin"}
                        property={
                          (state.UsersList?.hostelList || []).find(
                            (h) =>
                              String(h.hostelId) ===
                              String(state.login?.selectedHostel_Id),
                          )?.name || ""
                        }
                        personal={{
                          name: `${capitalizedFirstname} ${capitalizedLastname}`.trim(),
                          mobile: Phone ? `+${countryCode} ${Phone}` : "",
                          email: Email,
                          idProof: idProofNo
                            ? `${idProofType?.label || idProofType?.value || idProofType || "ID"} · ${idProofNo}`
                            : "",
                          address: [house_no, street, landmark, city, state_name, pincode]
                            .filter(Boolean)
                            .join(", "),
                          addressLater,
                          guardians: (guardians || [])
                            .filter((g) => g.guardianFullName?.trim())
                            .map((g) => ({
                              name: g.guardianFullName,
                              mobile: g.mobileNo,
                            })),
                        }}
                        stay={step2Summary}
                        docs={{ aadhaar: aadhaarFile, pan: panFile }}
                        confirmed={confirmed}
                        onConfirmChange={setConfirmed}
                        onEdit={handleEdit}
                        onBack={() => handleStepperSelect(getPreviousStep(STEP_PREVIEW, isBookingFlow))}
                        onSaveDraft={handleSaveDraft}
                        onConfirm={handleConfirm}
                        draftSaving={formLoading}
                        submitting={submitting}
                        canSubmit={step2Api.current?.canSubmit?.() ?? true}
                        error={submitError}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showUnsaved && (
        <UnsavedChangesDialog
          isBooking={isBookingFlow}
          saving={formLoading}
          onSaveDraft={handleUnsavedSaveDraft}
          onDiscard={() => {
            setShowUnsaved(false);
            handleClose();
          }}
          onKeepEditing={() => setShowUnsaved(false)}
        />
      )}
      {successInfo && (
        <TenantAddedSuccess
          name={successInfo.name}
          flow={successInfo.flow}
          onClose={handleSuccessClose}
        />
      )}
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
  onTenantCreated: PropTypes?.func,
};
export default AddTenant;

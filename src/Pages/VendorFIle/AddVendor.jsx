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
// import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage'

function AddVendor({ show, setShow, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [vendor_Mobile, setVendor_Mobile] = useState("");
  // const [address, setAddress] = useState("");
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("")
  const [state_name, setStateName] = useState("");
  const [email_Id, setEmail_Id] = useState("");
  const [business_Name, setBusiness_Name] = useState("");
  // const [id, setId] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [check, setCheck] = useState(null);
  const [generalError, setGeneralError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [pinCodeError, setPinCodeError] = useState("");
  const [vendorPhoneError, setVendorPhoneError] = useState("")
  const [vendorEmailError, setVendorEmailError] = useState("")
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [formLoading, setFormLoading] = useState(false)

  const firstNameRef = useRef(null);
  const mobileRef = useRef(null);
  const businessNameRef = useRef(null);
  const cityRef = useRef(null);
  const pinCodeRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);


  useEffect(() => {

    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  }, []);


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
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
  ];



  const countryList = [
    { value: 1, label: "India" },
  ];

  // const handleCountryChange = (e) => {
  //   const value = e.target.value
  //   const pattern = /^[a-zA-Z\s]*$/;
  //   if (!pattern.test(value)) {
  //     return;
  //   }
  //   setCountry(value);

  // };

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
    setHouse_NoError("");
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
  }

  const handleLandmark = (e) => {
    const value = e.target.value;

    if (!regex.test(value)) {
      return;
    }
    setLandmark(value);
    setLandmarkError("");
    setGeneralError("");
    setIsChangedError("");
  }



  const handleCity = (e) => {

    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
      setGeneralError("");
      setIsChangedError("");
    }
  }



  const handleClose = () => {
    setShow(false)
    setVendorPhoneError("")
    setVendorEmailError("")
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
  }

  const handleBusinessChange = (e) => {
    const value = e.target.value;

    setGeneralError("");
    setIsChangedError("");
    setBusinessNameError("");

    setBusiness_Name(value);
  };


  // const handleBusinessChange = (e) => {
  //   const value = e.target.value;
  //   const pattern = /^[a-zA-Z\s]*$/;
  //   if (!pattern.test(value)) {
  //     return;
  //   }
  //   setGeneralError("");
  //   setIsChangedError("");
  //   setBusinessNameError("");
  //   if (value === "") {
  //     setBusiness_Name(value);

  //     return;
  //   }

  //   if (value.trim() !== "") {
  //     setBusiness_Name(value);
  //   }
  // };



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
    setIsChangedError("")
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
    setVendorEmailError("")
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

    let isValid = true;
    const focusedRef = { current: false };

    const emailInvalid = emailError !== "";
    // const mobileInvalid = mobileError !== "";

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
      setFirstNameError("Please Enter First Name");
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

    if (emailInvalid) {
      setEmailError("Please Enter valid Email Id");
      if (!focusedRef.current) {
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
    }
    else if (!/^\d+$/.test(String(pinCode))) {
      setPinCodeError("Pin Code Must Be Numeric");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }
    else if (String(pinCode).length !== 6) {
      setPinCodeError("Pin Code Must Be Exactly 6 Digits");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }
    else if (pinCode === "000000") {
      setPinCodeError("Pin Code cannot be all zeros");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }
    else if (String(pinCode)[0] === "0") {
      setPinCodeError("Pin Code cannot start with 0");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }
    else if (String(pinCode).slice(-3) === "000") {
      setPinCodeError("Last 3 digits cannot be 000");
      if (!focusedRef.current && pinCodeRef.current) {
        pinCodeRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    }
    else {
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



    const isChanged =
      first_Name.trim() !== (initialState.first_Name || "").trim() ||
      last_Name.trim() !== (initialState.last_Name || "").trim() ||
      Number(vendor_Mobile) !== Number(initialState.vendor_Mobile || 0) ||
      email_Id.trim() !== (initialState.email_Id || "").trim() ||
      business_Name.trim() !== (initialState.business_Name || "").trim() ||
      file !== initialState.file ||
      countryCode !== (initialState.countryCode || "") ||
      country !== (initialState.country || "") ||
      String(pinCode).trim() !== String(initialState.pinCode || "").trim() ||
      normalize(house_no) !== normalize(initialState.house_no) ||
      normalize(street) !== normalize(initialState.street) ||
      normalize(landmark) !== normalize(initialState.landmark) ||
      city !== initialState.city ||
      state_name?.trim() !== (initialState.state || "").trim()





    if (!isChanged) {
      setIsChangedError("No Changes Detected");
      isValid = false;
    }

    const MobileNumber = `${countryCode}${vendor_Mobile}`;

    if (isValid) {
      if (check === "EDIT") {
        dispatch({
          type: "UPDATEVENDOR",
          payload: {
            profilePic: file,
            updateVendor: {
              // hostelId: state.login.selectedHostel_Id,
              firstName: first_Name,
              lastName: last_Name,
              mobile: MobileNumber,
              mailId: email_Id,
              businessName: business_Name,
              country: country,
              houseNo: house_no,
              pinCode: pinCode,
              area: street,
              landmark: landmark,
              city: city,
              state: state_name,
              vendorId: Number(currentItem.id)
            },
          },
        });
        setFormLoading(true)
      } else {
        dispatch({
          type: "ADDVENDOR",
          payload: {
            profilePic: file,
            payLoads: {
              hostelId: state.login.selectedHostel_Id,
              firstName: first_Name,
              lastName: last_Name,
              mobile: MobileNumber,
              mailId: email_Id,
              businessName: business_Name,
              country: country,
              houseNo: house_no,
              pinCode: pinCode,
              area: street,
              landmark: landmark,
              city: city,
              state: state_name,
            },
          },
        });

        setFormLoading(true)
      }


    }

  };





  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 201 || state.ComplianceList.updateVendorSuccessStatusCode === 201) {
      setFormLoading(false)
      setFile("");
      setFirst_Name("");
      setLast_Name("");
      setVendor_Mobile("");
      setEmail_Id("");
      setBusiness_Name("");
      setHouseNo("")
      setStreet("")
      setLandmark("")
      setCity("")
      setPinCode("")
      setStateName("")
    }
  }, [state.ComplianceList.addVendorSuccessStatusCode, state.ComplianceList.updateVendorSuccessStatusCode]);


  useEffect(() => {
    const closeButton = document.querySelector(
      'button[aria-label="close-button"]'
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
    if (currentItem) {
      const phoneNumber = String(currentItem.mobile || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);

      const mobileNumber = phoneNumber.slice(-10);

      const emailValue = currentItem.emailId;
      const normalizedEmail =
        emailValue === "undefined" ||
          emailValue === null ||
          emailValue === undefined
          ? ""
          : emailValue;

      const sanitize = (value) => {
        return value === null || value === undefined || value === "null" || value === "undefined"
          ? ""
          : value;
      };


      setCheck("EDIT");
      setFirst_Name(currentItem.firstName);
      setLast_Name(currentItem.lastName);
      setVendor_Mobile(mobileNumber);
      setCountryCode(countryCode);

      setEmail_Id(normalizedEmail);

      setBusiness_Name(currentItem.businessName);

      setFile(currentItem.profilePic ? currentItem.profilePic : null);
      setCountry(currentItem.countryId);
      setPinCode(currentItem.pinCode);

      setHouseNo(sanitize(currentItem.houseNo))
      setStreet(sanitize(currentItem.area))
      setLandmark(sanitize(currentItem.landMark))
      setCity(currentItem.city)
      setStateName(currentItem.state)

      setInitialState({
        first_Name: currentItem.firstName || "",
        last_Name: currentItem.lastName || "",
        vendor_Mobile: mobileNumber || "",
        countryCode: countryCode || "",

        house_no: sanitize(currentItem.houseNo),
        street: sanitize(currentItem.area),
        city: sanitize(currentItem.city),
        landmark: sanitize(currentItem.landMark),
        state: sanitize(currentItem.state),

        email_Id: normalizedEmail,
        business_Name: sanitize(currentItem.businessName),

        file: currentItem.profilePic ? currentItem.profilePic : null,
        country: currentItem.countryId || "",
        pinCode: currentItem.pinCode || "",
      });
    }
  }, [currentItem]);





  useEffect(() => {
    if (state.ComplianceList?.alreadyVendorHere) {
      setFormLoading(false)
      setVendorPhoneError(state.ComplianceList?.alreadyVendorHere)
    }

  }, [state.ComplianceList?.alreadyVendorHere])

  useEffect(() => {
    if (state.ComplianceList.alreadyVendorEmailError) {
      setFormLoading(false)
      setVendorEmailError(state.ComplianceList.alreadyVendorEmailError)
    }
  }, [state.ComplianceList.alreadyVendorEmailError])


  const [initialState, setInitialState] = useState({
    first_Name: "",
    last_Name: "",
    vendor_Mobile: "",
    address: "",
    house_no: '',
    street: '',
    city: '',
    landmark: '',
    state: '',
    email_Id: "",
    business_Name: "",
    file: null,
    country: "",
    pinCode: "",
  });

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])




  return (
    <div
      className="block relative"   >
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        className="custom-modal-width-vendor"

      >
      
        <Modal.Dialog className="m-0 p-0">
          <Modal.Header className="border border-[#E7E7E7]">
            <Modal.Title className="!text-[18px] !text-[#222222] !font-gilroy !font-semibold">
              {check === "EDIT" ? "Edit a vendor" : "Add a vendor"}
            </Modal.Title>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </Modal.Header>


          <Modal.Body className="max-h-[380px] overflow-y-scroll pt-2 mt-2 mr-3 show-scroll">
            <div className="flex items-center">
              <div className="h-[100px] w-[100px] relative">
                <Image
                  src={
                    file
                      ? typeof file === "string"
                        ? file
                        : URL.createObjectURL(file)
                      : Profile2
                  }
                  roundedCircle
                  className="h-[100px] w-[100px]"
                  onChange={handleImageChange}
                />
                <label htmlFor="imageInput">
                  <Image
                    src={Plus}
                    roundedCircle
                    className="h-[20px] w-[20px] absolute top-[90px] left-[80px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    id="imageInput"
                    onChange={handleImageChange}
                    className="hidden sr-only"
                  />
                </label>
              </div>
              <div className="pl-3">
                <div>
                  <label className="text-[16px] font-medium text-[#222222] font-gilroy" >
                    Profile Photo
                  </label>
                </div>
                <div>
                  <label className="text-[14px] font-medium text-[#4B4B4B] font-gilroy">
                    Max size of image 10MB
                  </label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-4">

              <div className="col-span-12 lg:col-span-6">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    First Name{" "}
                    <span className="text-red-600 text-[20px]">*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => handleFirstNameChange(e)}
                    value={first_Name}
                    ref={firstNameRef}
                    type="text"
                    placeholder="Enter First Name"
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${first_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none`}

                  />
                </Form.Group>
                {firstNameError && (
                  <ErrorMessage message={firstNameError} type="error" />
                )}
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Form.Group


                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Last Name{" "}

                  </Form.Label>
                  <Form.Control
                    value={last_Name}
                    onChange={(e) => handleLastNameChange(e)}
                    type="text"
                    placeholder="Enter Last Name"
                    className={`mt-1.5 text-[16px] text-[#4B4B4B] font-gilroy ${first_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:shadow-none shadow-none focus:ring-0`}

                  />
                </Form.Group>
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Mobile No{" "}

                    <span className="text-red-600 text-[20px]">*</span>

                  </Form.Label>

                  <InputGroup>
                    <Form.Select
                      value={countryCode}
                      // id="vendor-select-pg"

                      className={`border border-[#D9D9D9] rounded-l-[8px] h-[50px] text-[16px] text-[#4B4B4B] font-gilroy ${countryCode ? "font-semibold" : "font-medium"
                        } bg-white max-w-[90px] px-3 focus:outline-none`}

                    >
                      <option>+{countryCode}</option>
                    </Form.Select>
                    <Form.Control
                      value={vendor_Mobile}
                      ref={mobileRef}
                      onChange={handleMobileChange}
                      type="text"
                      placeholder="9876543210"
                      maxLength={10}
                      className={`text-[16px] text-[#4B4B4B] font-gilroy ${vendor_Mobile ? "font-semibold" : "font-medium"
                        } h-[50px] border border-r-[#D9D9D9] border-t-[#D9D9D9] border-b-[#D9D9D9] border-l-0 rounded-r-[8px] px-3 focus:outline-none`}

                    />
                  </InputGroup>

                  {mobileError && (
                    <ErrorMessage message={mobileError} type="error" />
                  )}

                  {countryCodeError && (
                    <ErrorMessage message={countryCodeError} type="error" />
                  )}


                </Form.Group>

                {vendorPhoneError && (
                  <ErrorMessage message={vendorPhoneError} type="error" />
                )}
              </div>
              <div className="col-span-12 lg:col-span-6">
                <Form.Group
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium mt-2">
                    Email ID{" "}

                  </Form.Label>
                  <Form.Control
                    value={email_Id}
                    onChange={(e) => handleEmailChange(e)}
                    type="email"
                    placeholder="Enter Email ID"
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${vendor_Mobile ? "font-semibold" : "font-medium"
                      } h-[50px] border border-r-[#D9D9D9] border-t-[#D9D9D9] border-b-[#D9D9D9] border-l-0 rounded-r-[8px] px-3 focus:outline-none`}
                  />
                  {emailError && (
                    <ErrorMessage message={emailError} type="error" />
                  )}
                </Form.Group>

                {vendorEmailError && (
                  <ErrorMessage message={vendorEmailError} type="error" />
                )}
              </div>
              <div className="col-span-12 ">
                <Form.Group



                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Business Name{" "}
                    <span className="text-red-600 text-[20px]">*</span>
                  </Form.Label>
                  <Form.Control
                    value={business_Name}
                    onChange={(e) => handleBusinessChange(e)}
                    type="text"
                    ref={businessNameRef}
                    placeholder="Enter Business Name"
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${business_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none`}

                  />
                  {businessNameError && (
                    <ErrorMessage message={businessNameError} type="error" />
                  )}
                </Form.Group>
              </div>




              <div className="col-span-12 mb-1">
                <Form.Group
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Flat , House no , Building , Company , Apartment {" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter House No"
                    value={house_no}
                    onChange={(e) => handleHouseNo(e)}
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${business_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none`}

                  />
                </Form.Group>
                {house_noError && (
                  <ErrorMessage message={house_noError} type="error" />
                )}
              </div>

              <div className="col-span-12 lg:col-span-6 mb-1">
                <Form.Group
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Area , Street , Sector , Village{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter Street"
                    value={street}
                    onChange={(e) => handleStreetName(e)}
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${business_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none`}

                  />
                </Form.Group>
                {streetError && (
                  <ErrorMessage message={streetError} type="error" />
                )}
              </div>

              <div className="col-span-12 lg:col-span-6 mb-1">
                <Form.Group >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Landmark{" "}
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="E.g , near appollo hospital"
                    value={landmark}
                    onChange={(e) => handleLandmark(e)}
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${business_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none`}

                  />
                </Form.Group>
                {landmarkError && (
                  <ErrorMessage message={landmarkError} type="error" />
                )}
              </div>



              <div className="col-span-12 lg:col-span-6 mb-1">
                <Form.Group>
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Town/City {" "}
                    <span className="text-red-600 text-[20px]"> * </span>
                  </Form.Label>
                  <FormControl
                    type="text"
                    id="form-controls"
                    placeholder="Enter City"
                    value={city}
                    ref={cityRef}
                    onChange={(e) => handleCity(e)}
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${business_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none`}

                  />
                </Form.Group>
                {cityError && (
                  <ErrorMessage message={cityError} type="error" />
                )}
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Form.Group

                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Pincode {" "}
                    <span className="text-red-600 text-[20px]">*</span>
                  </Form.Label>
                  <Form.Control
                    value={pinCode}
                    ref={pinCodeRef}
                    onChange={(e) => handlePinCodeChange(e)}
                    type="tel"
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter Pincode"
                    className={`text-[16px] text-[#4B4B4B] font-gilroy ${business_Name ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none`}

                  />
                  {pinCodeError && (
                    <ErrorMessage message={pinCodeError} type="error" />
                  )}


                </Form.Group>
              </div>

              <div className="col-span-12 lg:col-span-6">
                <Form.Group controlId="exampleForm.ControlInput5">
                  <Form.Label className="font-gilroy text-[14px] font-medium text-[#222] not-italic leading-normal"
                  >
                    State {" "}  <span className="text-red-600 text-[20px]">*</span>
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
                      state_name ? { value: state_name, label: state_name } : null
                    }
                    placeholder="Select State"
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    noOptionsMessage={() => "No state available"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "50px",
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
                        color: "#9aa0a6",
                        fontSize: 16,
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
                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                        color: "#000",
                      }),
                    }}
                  />
                </Form.Group>

                {!state_name && state_nameError && (
                  <ErrorMessage message={state_nameError} type="error" />
                )}

              </div>


              <div className="col-span-12 lg:col-span-6">
                <Form.Group
                  className="mb-0"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label className="text-[14px] text-[#222222] font-gilroy font-medium" >
                    Country {" "}
                    <span className="text-red-600 text-[20px]">*</span>
                  </Form.Label>

                  <Select
                    options={countryList}
                    ref={countryRef}
                    onChange={(selectedOption) => {
                      setCountry(selectedOption?.value);
                      setGeneralError("");
                      setIsChangedError("");
                      setCountryError("");
                    }}
                    onInputChange={(inputValue, { action }) => {
                      if (action === "input-change") {
                        const lettersOnly = inputValue.replace(/[^a-zA-Z\s]/g, "");
                        return lettersOnly;
                      }
                      return inputValue;
                    }}
                    value={countryList.find((c) => c.value === country) || null}
                    placeholder="Select Country"
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    noOptionsMessage={() => "No country available"}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "50px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        fontSize: "16px",
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: country ? 600 : 500,
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
                        color: "#9aa0a6",
                        fontSize: 16,
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
                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                        color: "#000",
                      }),
                    }}
                  />

                  {countryError && (
                    <ErrorMessage message={countryError} type="error" />
                  )}


                </Form.Group>
              </div>


            </div>
          </Modal.Body>

          {formLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-[40px] h-[40px] rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
            </div>
          )}

          {generalError && (
            <ErrorMessage message={generalError} type="error" />
          )}

          {/* {state.createAccount?.networkError ?
            <ErrorMessage message={state.createAccount?.networkError}  type="error"/>
            : null} */}
          {isChangedError && (
            <div className="d-flex align-items-center justify-content-center" >
              <ErrorMessage message={isChangedError} />
            </div>
          )}


          <Modal.Footer className="border-0">
            <Button
            className="w-100 !bg-[#1E45E1] !rounded-[12px] !text-[16px] !font-gilroy !font-bold p-3"
              onClick={handleAddVendor}
            >
              {check === "EDIT" ? "Save Changes" : "Add  vendor"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

AddVendor.propTypes = {
  show: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,

};

export default AddVendor;

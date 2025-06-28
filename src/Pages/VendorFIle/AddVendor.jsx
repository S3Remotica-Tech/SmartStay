import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Form from "react-bootstrap/Form";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl } from "react-bootstrap";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";

function AddVendor({ show, setShow, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [vendor_Mobile, setVendor_Mobile] = useState("");
  const [address, setAddress] = useState("");
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [city, setCity] = useState("")
  const [state_name, setStateName] = useState("");
  const [email_Id, setEmail_Id] = useState("");
  const [business_Name, setBusiness_Name] = useState("");
  const [id, setId] = useState("");
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

  const handleCountryChange = (e) => {
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setCountry(value);
    setGeneralError("");
    setIsChangedError("");
    setCountryError("");
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


  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("")
    setGeneralError("");
    setIsChangedError("");
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");
    setGeneralError("");
    setIsChangedError("");
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
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
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setGeneralError("");
    setIsChangedError("");
    setBusinessNameError("");
    if (value === "") {
      setBusiness_Name(value);

      return;
    }

    if (value.trim() !== "") {
      setBusiness_Name(value);
    }
  };



  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setFile(compressedFile);
      } catch (error) {
        console.error("Image compression error:", error);
      }
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
      setMobileError("Invalid Mobile Number");
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
        setEmailError("Invalid Email Id *");
      }
    }
  };



  const handleAddVendor = () => {
    dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
    dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });

    let isValid = true;
    const focusedRef = { current: false };

    const emailInvalid = emailError !== "";
    const mobileInvalid = mobileError !== "";

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

    if (!vendor_Mobile) {
      setMobileError("Please Enter Mobile Number");
      if (!focusedRef.current && mobileRef.current) {
        mobileRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
    } else if (mobileInvalid) {
      setMobileError("Enter Valid Mobile Number");
      if (!focusedRef.current && mobileRef.current) {
        mobileRef.current.focus();
        focusedRef.current = true;
      }
      isValid = false;
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
      setEmailError("Enter Valid Email ID");
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

    const isChanged =
      first_Name.trim() !== (initialState.first_Name || "").trim() ||
      last_Name.trim() !== (initialState.last_Name || "").trim() ||
      Number(vendor_Mobile) !== Number(initialState.vendor_Mobile || 0) ||
      email_Id.trim() !== (initialState.email_Id || "").trim() ||
      business_Name.trim() !== (initialState.business_Name || "").trim() ||
      file !== initialState.file ||
      countryCode !== (initialState.countryCode || "") ||
      country.trim() !== (initialState.country || "").trim() ||
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
          type: "ADDVENDOR",
          payload: {
            hostel_id: state.login.selectedHostel_Id,
            profile: file,
            first_Name: first_Name,
            Last_Name: last_Name,
            Vendor_Mobile: MobileNumber,
            Vendor_Email: email_Id,
            Business_Name: business_Name,
            id: id,
            Country: country,
            Vendor_Address: house_no,
            Pincode: pinCode,
            area: street,
            landmark: landmark,
            city: city,
            state: state_name,
          },
        });
        setFormLoading(true)
      } else {
        dispatch({
          type: "ADDVENDOR",
          payload: {
            hostel_id: state.login.selectedHostel_Id,
            profile: file,
            first_Name: first_Name,
            Last_Name: last_Name,
            Vendor_Mobile: MobileNumber,
            Vendor_Email: email_Id,
            Business_Name: business_Name,
            Country: country,
            Vendor_Address: house_no,
            Pincode: pinCode,
            area: street,
            landmark: landmark,
            city: city,
            state: state_name,
          },
        });
        setFormLoading(true)
      }


    }

  };


  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 200) {
      setFormLoading(false)
      setFile("");
      setFirst_Name("");
      setLast_Name("");
      setVendor_Mobile("");
      setAddress("");
      setEmail_Id("");
      setBusiness_Name("");
      setHouseNo("")
      setStreet("")
      setLandmark("")
      setCity("")
      setPinCode("")
      setStateName("")
    }
  }, [state.ComplianceList.addVendorSuccessStatusCode]);


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
      const nameParts = currentItem.Vendor_Name.split(" ");
      const firstName = nameParts[0];
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const phoneNumber = String(currentItem.Vendor_Mobile || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);

      const emailValue = currentItem.Vendor_Email;
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
      setFirst_Name(firstName);
      setLast_Name(lastName);
      setVendor_Mobile(mobileNumber);
      setCountryCode(countryCode);
      setAddress(currentItem.Vendor_Address);

      setEmail_Id(normalizedEmail);

      setBusiness_Name(currentItem.Business_Name);
      setId(currentItem.id);

      setFile(currentItem.Vendor_profile ? currentItem.Vendor_profile : null);
      setCountry(currentItem.Country);
      setPinCode(currentItem.Pincode);

      setHouseNo(sanitize(currentItem.Vendor_Address))
      setStreet(sanitize(currentItem.area))
      setLandmark(sanitize(currentItem.landmark))
      setCity(currentItem.city)
      setStateName(currentItem.state)

      setInitialState({
        first_Name: firstName,
        last_Name: lastName,
        vendor_Mobile: mobileNumber,
        countryCode: countryCode,

        house_no: sanitize(currentItem.Vendor_Address) || '',
        street: sanitize(currentItem.area) || '',
        city: sanitize(currentItem.city) || '',

        landmark: sanitize(currentItem.landmark) || '',
        state: currentItem.state || '',
        email_Id: normalizedEmail,
        business_Name: currentItem.Business_Name,
        file: currentItem.Vendor_profile ? currentItem.Vendor_profile : null,
        country: currentItem.Country,
        pinCode: currentItem.Pincode,
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





  return (
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy",
      }}
    >
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        className="custom-modal-width-vendor"

      >
        <Modal.Dialog className="m-0 p-0">
          <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
            <Modal.Title
              style={{
                fontSize: 18,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 600,
              }}
            >
              {check === "EDIT" ? "Edit a vendor" : "Add a vendor"}
            </Modal.Title>

            <CloseCircle size="24" color="#000" onClick={handleClose}
              style={{ cursor: 'pointer' }} />
          </Modal.Header>




          <Modal.Body style={{ maxHeight: "380px", overflowY: "scroll" }} className="show-scroll pt-2 mt-2 me-3">
            <div className="d-flex align-items-center">
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
                      : Profile2
                  }
                  roundedCircle
                  style={{ height: 100, width: 100 }}
                  onChange={handleImageChange}
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
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
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
                    First Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => handleFirstNameChange(e)}
                    value={first_Name}
                    ref={firstNameRef}
                    type="text"
                    placeholder="Enter First Name"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: first_Name ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {firstNameError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {firstNameError}
                    </label>
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
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
                    Last Name{" "}

                  </Form.Label>
                  <Form.Control
                    value={last_Name}
                    onChange={(e) => handleLastNameChange(e)}
                    type="text"
                    placeholder="Enter Last Name"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: last_Name ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                      marginTop: 5
                    }}
                  />
                </Form.Group>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">

                <Form.Group
                  className="mb-3"
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
                    Mobile No{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>

                  <InputGroup>
                    <Form.Select
                      value={countryCode}
                      id="vendor-select-pg"
                      style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px 0 0 8px",
                        height: 50,
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: countryCode ? 600 : 500,
                        boxShadow: "none",
                        backgroundColor: "#fff",
                        maxWidth: 90,
                      }}
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
                      style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        fontWeight: vendor_Mobile ? 600 : 500,
                        boxShadow: "none",
                        borderLeft: "unset",
                        borderRight: "1px solid #D9D9D9",
                        borderTop: "1px solid #D9D9D9",
                        borderBottom: "1px solid #D9D9D9",
                        height: 50,
                        borderRadius: "0 8px 8px 0",
                      }}
                    />
                  </InputGroup>

                  {mobileError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {mobileError}
                      </label>
                    </div>
                  )}

                  {countryCodeError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {countryCodeError}
                      </label>
                    </div>
                  )}


                </Form.Group>

                {vendorPhoneError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {vendorPhoneError}
                    </label>
                  </div>
                )}
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
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
                    Email ID{" "}

                  </Form.Label>
                  <Form.Control
                    value={email_Id}
                    onChange={(e) => handleEmailChange(e)}
                    type="email"
                    placeholder="Enter Email ID"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: email_Id ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                      marginTop: 5
                    }}
                  />
                  {emailError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {emailError}
                      </label>
                    </div>
                  )}
                </Form.Group>

                {vendorEmailError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {vendorEmailError}
                    </label>
                  </div>
                )}
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
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
                    Business Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={business_Name}
                    onChange={(e) => handleBusinessChange(e)}
                    type="text"
                    ref={businessNameRef}
                    placeholder="Enter Business Name"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: business_Name ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                  {businessNameError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {businessNameError}
                      </label>
                    </div>
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
                    Flat , House no , Building , Company , Apartment {" "}
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
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {house_noError && (
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                    <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
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
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {streetError && (
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                    <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
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
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {landmarkError && (
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                    <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
                  </div>
                )}
              </div>



              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
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
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
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
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                </Form.Group>
                {cityError && (
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: '13px', marginRight: "5px" }} />
                    <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                  </div>
                )}
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-3"
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
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: pinCode ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                  {pinCodeError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {pinCodeError}
                      </label>
                    </div>
                  )}


                </Form.Group>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <Form.Group className="" controlId="exampleForm.ControlInput5">
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
                    State    <span style={{ color: "red", fontSize: "20px" }}>*</span>
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
                        color: "#555",
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
                  <div style={{ color: "red" }}>
                    <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                    <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                      {state_nameError}
                    </span>
                  </div>
                )}

              </div>


              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                      marginBottom: '0px'
                    }}
                  >
                    Country
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={country}
                    ref={countryRef}
                    onChange={(e) => handleCountryChange(e)}
                    type="text"
                    placeholder="Enter Country"
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: address ? 600 : 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: 8,
                    }}
                  />
                  {countryError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                      <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                      <label
                        className="mb-0"
                        style={{
                          color: "red",
                          fontSize: "12px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {countryError}
                      </label>
                    </div>
                  )}


                </Form.Group>
              </div>


            </div>
          </Modal.Body>
          {formLoading && <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
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
          {generalError && (
            <div className="d-flex align-items-center p-1 mb-2">
              <MdError style={{ color: "red", marginRight: "5px" }} />
              <label
                className="mb-0"
                style={{
                  color: "red",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {generalError}
              </label>
            </div>
          )}


          {isChangedError && (
            <div className="d-flex align-items-center justify-content-center" style={{ color: "red" }}>
              <MdError style={{ fontSize: "13px", marginRight: "7px", marginBottom: "15px" }} />
              <span style={{ fontSize: "14px", fontFamily: "Gilroy", marginBottom: "15px" }}>
                {isChangedError}
              </span>
            </div>
          )}


          <Modal.Footer style={{ border: "none" }}>
            <Button
              className="w-100"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 600,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                padding: 12,
              }}
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

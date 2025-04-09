import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Form from "react-bootstrap/Form";
import imageCompression from "browser-image-compression";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { InputGroup } from "react-bootstrap";
import { MdError } from "react-icons/md";
import {CloseCircle} from "iconsax-react";
import PropTypes from "prop-types";


function AddVendor({ show, setShow, currentItem }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [first_Name, setFirst_Name] = useState("");
  const [last_Name, setLast_Name] = useState("");
  const [vendor_Mobile, setVendor_Mobile] = useState("");
  const [address, setAddress] = useState("");
  const [email_Id, setEmail_Id] = useState("");
  // const [errors, setErrors] = useState({});
  const [business_Name, setBusiness_Name] = useState("");
  const [id, setId] = useState("");
  // const [vendor_Id, setVendor_Id] = useState("");
  const [country, setCountry] = useState("");
  const [pinCode, setPinCode] = useState("");

  const [check, setCheck] = useState(null);
  const [generalError, setGeneralError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [countryCodeError, setCountryCodeError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [businessNameError, setBusinessNameError] = useState("");
  const [isChangedError, setIsChangedError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [pinCodeError, setPinCodeError] = useState("");
  const [vendorPhoneError,setVendorPhoneError] = useState("")
  const [vendorEmailError,setVendorEmailError]= useState("")

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
  
    // Remove this from here (let validation handle error on submit)
    // setPinCodeError("");
  
    // Optional: Live validation (if you want it)
    if (value.length > 0 && value.length < 6) {
      setPinCodeError("Pin Code Must Be Exactly 6 Digits");
    } else {
      setPinCodeError("");
    }
  
    setGeneralError("");
    setIsChangedError("");
  };
  

  // const handlePinCodeChange = (e) => {
  //   const value = e.target.value;
  //   if (!/^\d{0,6}$/.test(value)) {
  //     return; // Stop input if it's not a number or exceeds 6 digits
  //   }
  //   setPinCode(value);
  //   setGeneralError("");
  //   setIsChangedError("");
  //   setPinCodeError("");
  // };

const handleClose =()=>{
  setShow(false)
  setVendorPhoneError("")
  setVendorEmailError("")
  dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
  dispatch({ type: "CLEAR_ALREADY_VENDOR_EMAIL_ERROR" });
}

  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  //   setGeneralError("");
  //   setIsChangedError("");
  //   setCountryCodeError("");
  // };

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
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   businessName: "Business name cannot be empty or spaces only",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setBusiness_Name(value);
      // setErrors((prevErrors) => ({ ...prevErrors, businessName: "" }));
    }
  };

  // const handleImageChange = (event) => {
  //   const fileimgage = event.target.files[0];
  //   if (fileimgage) {
  //     setFile(fileimgage);
  //   }
  // };

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
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   firstName: "First name cannot be empty or spaces only",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setFirst_Name(value);
      // setErrors((prevErrors) => ({ ...prevErrors, firstName: "" }));
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
  
  // const handleMobileChange = (e) => {
  //   const value = e.target.value;
  
  //   const pattern = /^\d*$/;
  //   if (pattern.test(value)) {
  //     setVendor_Mobile(value);
  //     setGeneralError("");
  //     setIsChangedError("");
  //     setCountryCodeError("");
  //     setMobileError("");
  //     setVendorPhoneError("");
  //     dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
  
  //     // Show error while typing if length is less than 10
  //     if (value.length === 0) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         setMobileError: "Mobile Number is required",
  //       }));
  //     } else if (value.length < 10) {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         setMobileError: "Please Enter Valid Mobile Number",
  //       }));
  //     } else {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         setMobileError: "",
  //       }));
  //     }
  
  //   } else {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       mobileError: "Mobile number can only contain digits",
  //     }));
  //   }
  // };
  
  // const handleMobileChange = (e) => {
  //   const value = e.target.value;

  //   const pattern = /^\d*$/;

  //   if (pattern.test(value)) {
  //     setVendor_Mobile(value);
  //     setGeneralError("");
  //     setIsChangedError("");
  //     setCountryCodeError("");
  //     setMobileError("");
  //     setVendorPhoneError("")
  //     dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });

  //     if (value.length === 10) {
  //       setErrors((prevErrors) => ({ ...prevErrors, vendor_Mobile: "" }));
  //     } else {
  //       setErrors((prevErrors) => ({
  //         ...prevErrors,
  //         vendor_Mobile: "Invalid mobile number *",
  //       }));
  //     }
  //   } else {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       vendor_Mobile: "Mobile number can only contain digits *",
  //     }));
  //   }
  // };

  const handleAddressChange = (e) => {
    const value = e.target.value;
    setGeneralError("");
    setAddressError("");
    setIsChangedError("");
    if (value === "") {
      setAddress(value);
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   address: "Address cannot be empty or spaces only",
      // }));
      return;
    }

    if (value.trim() !== "") {
      setAddress(value);
      // setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
    }
  };

  // const handleEmailChange = (e) => {
  //   const email = e.target.value;
  //   setEmail_Id(email);
  //   setGeneralError('');
  //   setIsChangedError('');
  //   setEmailError('');
  //   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  //   const isValidEmail = emailRegex.test(email);
  //   if (isValidEmail) {
  //     setErrors(prevErrors => ({ ...prevErrors, email_Id: '' }));
  //   } else {
  //     setErrors(prevErrors => ({ ...prevErrors, email_Id: 'Invalid Email Id *' }));
  //   }
  // }

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

  console.log("file", file);

  const handleAddVendor = () => {
    let isValid = true;

    const emailInvalid = emailError !== "";
    const mobileInvalid = mobileError !== "";

    if (
      !first_Name &&
      !vendor_Mobile &&
      !address &&
      !business_Name &&
      !countryCode &&
      !country &&
      !pinCode
    ) {
      setGeneralError("Please fill in all the Required Fields");
      isValid = false;
    }

    if (!first_Name) {
      setFirstNameError("Please Enter First Name");
      isValid = false;
    }

    if (!countryCode) {
      setCountryCodeError("Please Select Country Code");
      isValid = false;
    }

    if (!vendor_Mobile) {
      setMobileError("Please Enter Mobile Number");
      isValid = false;
    }
    if (mobileInvalid) {
      setMobileError("Enter Valid Mobile Number");
      isValid = false;
    }

    if (!business_Name) {
      setBusinessNameError("Please Enter Business Name");
      isValid = false;
    }

    if (!address) {
      setAddressError("Please Enter Address");
      isValid = false;
    }

    if (!country) {
      setCountryError("Please Enter Country");
      isValid = false;
    }

    // Pin Code Validation - Only if it's been changed
    if (pinCode !== initialState.pinCode) {
      if (!pinCode) {
        setPinCodeError("Please Enter Pincode");
        isValid = false;
      } else if (!/^\d+$/.test(pinCode)) {
        setPinCodeError("Pin Code Must Be Numeric");
        isValid = false;
      } else if (pinCode.length !== 6) {
        setPinCodeError("Pin Code Must Be Exactly 6 Digits");
        isValid = false;
      }
    }

    if (emailInvalid || mobileInvalid) {
      if (emailInvalid) {
        setEmailError("Enter Valid Email ID");
      }
      if (mobileInvalid) {
        setMobileError("Enter Valid Mobile Number");
      }
      isValid = false;
    }

    const isChanged =
    first_Name.trim() !== (initialState.first_Name || "").trim() ||
    last_Name.trim() !== (initialState.last_Name || "").trim() ||
    Number(vendor_Mobile) !== Number(initialState.vendor_Mobile || 0) ||
    address.trim() !== (initialState.address || "").trim() ||
    email_Id.trim() !== (initialState.email_Id || "").trim() ||
    business_Name.trim() !== (initialState.business_Name || "").trim() ||
    file !== initialState.file ||
    countryCode !== (initialState.countryCode || "") ||
    country.trim() !== (initialState.country || "").trim() ||
    String(pinCode).trim() !== String(initialState.pinCode || "").trim();


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
            Vendor_Address: address,
            Business_Name: business_Name,
            id: id,
            Country: country,
            Pincode: pinCode,
          },
        });
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
            Vendor_Address: address,
            Business_Name: business_Name,
            Country: country,
            Pincode: pinCode,
          },
        });
      }

      // setFile('')
      // // handleClose()
      // setFirst_Name('')
      // setLast_Name('')
      // setVendor_Mobile('')
      // setAddress('')
      // setEmail_Id('')
      // setBusiness_Name('')
    } 
   
  };

 
  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 200) {
      setFile("");
      setFirst_Name("");
      setLast_Name("");
      setVendor_Mobile("");
      setAddress("");
      setEmail_Id("");
      setBusiness_Name("");
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

  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);

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

      setCheck("EDIT");
      setFirst_Name(firstName);
      setLast_Name(lastName);
      setVendor_Mobile(mobileNumber);
      setCountryCode(countryCode);
      setAddress(currentItem.Vendor_Address);

      setEmail_Id(normalizedEmail);
      // setEmail_Id(currentItem.Vendor_Email ? currentItem.Vendor_Email : '');
      setBusiness_Name(currentItem.Business_Name);
      setId(currentItem.id);
      // setVendor_Id(currentItem.Vendor_Id);
      setFile(currentItem.Vendor_profile ? currentItem.Vendor_profile : null);
      setCountry(currentItem.Country);
      setPinCode(currentItem.Pincode);

      setInitialState({
        first_Name: firstName,
        last_Name: lastName,
        vendor_Mobile: mobileNumber,
        countryCode: countryCode,
        address: currentItem.Vendor_Address,
        email_Id: normalizedEmail,
        business_Name: currentItem.Business_Name,
        file: currentItem.Vendor_profile ? currentItem.Vendor_profile : null,
        country: currentItem.Country,
        pinCode: currentItem.Pincode,
      });
    }
  }, [currentItem]);


 
  useEffect(()=>{
    setVendorPhoneError(state.ComplianceList?.alreadyVendorHere)
  },[state.ComplianceList?.alreadyVendorHere])

  useEffect(()=>{
setVendorEmailError(state.ComplianceList.alreadyVendorEmailError)
  },[state.ComplianceList.alreadyVendorEmailError])

  // useEffect(() => {
  //   if (state.ComplianceList?.alreadyVendorHere) {
  //     setVendorPhoneError(state.ComplianceList?.alreadyVendorHere)
  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_ALREADY_VENDOR_ERROR" });
  //     }, 3000);
  //   }
  // }, [state.ComplianceList?.alreadyVendorHere]);
  const [initialState, setInitialState] = useState({
    first_Name: "",
    last_Name: "",
    vendor_Mobile: "",
    address: "",
    email_Id: "",
    business_Name: "",
    file: null,
    country: "",
    pinCode: "",
  });


  //     useEffect(()=>{
  // if(currentItem){
  //     const nameParts = currentItem.Vendor_Name.split(' ');
  //     const firstName = nameParts[0];
  //     const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  //         setCheck('EDIT')
  //       setFirst_Name(firstName)
  //       setLast_Name(lastName)
  //       setVendor_Mobile(currentItem.Vendor_Mobile)
  //       setAddress(currentItem.Vendor_Address)
  //       setEmail_Id(currentItem.Vendor_Email)
  //       setBusiness_Name(currentItem.Business_Name)
  //       setId(currentItem.id)
  //       setVendor_Id(currentItem.Vendor_Id)
  //       if (currentItem.Vendor_profile) {
  //         const profile = currentItem.Vendor_profile;
  //                if (typeof profile === 'string') {
  //                     setFile(profile);
  //         } else if (profile instanceof Blob) {
  //                   setFile(profile);
  //         } else {
  //                 setFile(null);
  //           console.warn('Invalid profile format');
  //         }
  //       }

  // }
  //     },[currentItem])

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
        style={{
          maxWidth: '90%', 
          margin: 'auto',
        }}
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

         


          <Modal.Body>
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
                      cursor:"pointer"
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
                      // onChange={handleCountryCodeChange}
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
                    {/* <span style={{ color: "red", fontSize: "20px" }}>*</span> */}
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
                    Business Name{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={business_Name}
                    onChange={(e) => handleBusinessChange(e)}
                    type="text"
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
                    Address{" "}
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={address}
                    onChange={(e) => handleAddressChange(e)}
                    type="text"
                    placeholder="Enter Address"
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
                  {addressError && (
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
                        {addressError}
                      </label>
                    </div>
                  )}
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
                    Country
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={country}
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
                {/* {isChangedError && (
            <div style={{color: "red", marginTop: "15px"}}>
              <MdError  />
              <span
               
                style={{
                  // marginTop: "10px",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                 
                }}
              >
                {isChangedError}
              </span>
            </div>
          )}  */}

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
                    Pincode
                    <span style={{ color: "red", fontSize: "20px" }}>*</span>
                  </Form.Label>
                  <Form.Control
                    value={pinCode}
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
            </div>
          </Modal.Body>
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

          {/* {isChangedError && (
            <div style={{ color: "red", marginTop: "30px" }}>
              <MdError />
              <span

                style={{
                  marginTop: "10px",
                  fontSize: "12px",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {isChangedError}
              </span>
            </div>
          )} */}
{isChangedError && (
    <div className="d-flex align-items-center justify-content-center" style={{color:"red"}}>
        <MdError style={{fontSize: "13px",marginRight:"7px",marginBottom:"15px"}}/>
        <span style={{ fontSize: "14px", fontFamily: "Gilroy",marginBottom:"15px"}}>
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
                marginTop: "-20px"
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

  // value: PropTypes.func.isRequired,
  // onClick: PropTypes.func.isRequired,
};

export default AddVendor;

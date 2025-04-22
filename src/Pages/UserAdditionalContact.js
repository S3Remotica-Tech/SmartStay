/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button,Form, FormControl } from "react-bootstrap";
import "./UserList.css";
import { InputGroup} from "react-bootstrap";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import {CloseCircle} from "iconsax-react";
import Select from "react-select";


function UserAdditionalContact(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [guardian, setGuardian] = useState("");
  const [Phone, setPhone] = useState("");
  // const [address, setAddress] = useState("");
   const [house_no, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("")
    const [state_name, setStateName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  const [contactId, setContactId] = useState("");
  const [formError, setFormError] = useState("");
  // const [addressError, setAddressError] = useState("");
  const [userNameError, setUserNameError] = useState("");
  const [guardianError, setGuardianError] = useState("");
  const [guardianAlreadyError, setGuardianAlreadyError] = useState("");
    const [house_noError, setHouse_NoError] = useState("");
    const [streetError, setStreetError] = useState("");
    const [landmarkError, setLandmarkError] = useState("");
    const [pincodeError, setPincodeError] = useState("");
    const [cityError, setCityError] = useState("");
    const [state_nameError, setStateNameError] = useState("");
  const MobileNumber = `${countryCode}${Phone}`;

  const [initialState, setInitialState] = useState({
    userName: "",
    guardiaz: "",
    Phone: "",
    address: "",
    house_no:"",
    street:"",
    city:"",
    landmark:"",
    state:"",
    pinCode: "",
  });


  const indianStates = [
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
    { value: "Tamil Nadu", label: "Tamil Nadu" },
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

  useEffect(() => {
    if (props.contactEdit && props.editAdditional) {
      const phoneNumber = String(props.contactEdit.mob_no || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);
      setUserName(props.contactEdit.user_name);
      setGuardian(props.contactEdit.guardian);
      setPhone(mobileNumber);
      // setAddress(props.contactEdit.address);
      // setUserId(props.contactEdit.user_id);
      setContactId(props.contactEdit.id);
      setCountryCode(countryCode);
      setPincode(props.contactEdit.pin_code);
      setHouseNo(props.contactEdit.address)
      setStreet(props.contactEdit.area)
      setLandmark(props.contactEdit.landmark)
      setCity(props.contactEdit.city)
      setStateName(props.contactEdit.state)

      setInitialState({
        userName: props.contactEdit.user_name || "",
        guardian: props.contactEdit.guardian || "",
        Phone: props.contactEdit.mob_no || "",
        // address: props.contactEdit.address || "",
        house_no: props.contactEdit.address || "",
        street: props.contactEdit.area || "",
        city: props.contactEdit.city || "",
        landmark: props.contactEdit.landmark || "",
        state: props.contactEdit.state || "",
        pinCode:props.contactEdit.pin_code || "",
      });
    }
  }, [props.contactEdit && props.editAdditional]);

  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);

  const handleUserName = (e) => {
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setUserName(value);
    setFormError("");
    setUserNameError("");
  };
  const handleGuardian = (e) => {
    const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setGuardian(value);
    setFormError("");
    setGuardianError("");
  };
  // const handleAddress = (e) => {
  //   setAddress(e.target.value);
  //   setFormError("");
  //   setAddressError("");
  // };

  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("")
    // setFormError("");
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");

    
    // setFormError("");
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
    // setFormError("");
  }

  

  const handlePinCodeChange = (e) => {
    const value = e.target.value;
    if (!/^\d{0,6}$/.test(value)) {
      return;
    }
  
    setPincode(value);
    if (value.length > 0 && value.length < 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
    } else {
      setPincodeError("");
    }
  
    // setGeneralError("");
    // setIsChangedError("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setCityError("");
    // setFormError("");
  }

  const validateAssignField = (value, fieldName) => {
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === undefined ||
      value === null ||
      value === "0";
    if (isValueEmpty) {
      switch (fieldName) {
        case "gurardian":
          setGuardianError("Guardian is Required");
          break;
        case "userName":
          setUserNameError("User Name is Required");
          break;
        case "Phone":
          setPhoneError("Phone Number is Required");
          break;
        // case "address":
        //   setAddressError("Address is Required");
        //   break;
          // case "Houseno":
          //   setHouse_NoError("Please Enter House No/Flat");
          //   break;
          // case "Street":
          //   setStreetError("Please Enter Street");
          //   break;
          // case "Landmark":
          //   setLandmarkError("Please Enter Landmark");
          //   break;
          case "City":
            setCityError("Please Enter City");
            break;
          case "Pincode":
            setPincodeError("Please Enter Pincode");
            break;
          case "Statename":
            setStateNameError("Please Select State");
            break;

        default:
          break;
      }
      return false;
    }

    switch (fieldName) {
      case "gurardian":
        setGuardianError("");
        break;
      case "userName":
        setUserNameError("");
        break;
      case "Phone":
        setPhoneError("");
        break;
      // case "address":
      //   setAddressError("");
      //   break;
        // case "Houseno":
        //   setHouse_NoError("");
        //   break;
        // case "Street":
        //   setStreetError("");
        //   break;
        // case "Landmark":
        //   setLandmarkError("");
        //   break;
        case "City":
          setCityError("");
          break;
        case "Pincode":
          setPincodeError("");
          break;
        case "Statename":
          setStateNameError("");
          break;
      default:
        break;
    }

    return true;
  };

  const handleSubmitContact = () => {
    const isUserValid = validateAssignField(userName, "userName");
    const isGuardianValid = validateAssignField(guardian, "gurardian");
    const isPhoneValid = validateAssignField(Phone, "Phone");
    // const isAddressValid = validateAssignField(address, "address");
    // const isHousenoValid = validateAssignField(house_no, "Houseno");
    // const isStreetValid = validateAssignField(street, "Street");
    // const isLandmarkValid = validateAssignField(landmark, "Landmark");
    const isCityValid = validateAssignField(city, "City");
    const isPincodeValid = validateAssignField(pincode, "Pincode");
    const isStatenameValid = validateAssignField(state_name, "Statename");

    if (!isUserValid || !isGuardianValid || !isPhoneValid || 
      !isCityValid  || 
      !isPincodeValid ||
      !isStatenameValid
    ) {
      return;
    }

    if (props.editAdditional && props.contactEdit.id) {
      // const isChanged = (
      //   userName !== initialState.userName ||
      //   guardian !== initialState.guardian ||
      //   Number(countryCode + Phone) !== Number(initialState.Phone) ||
      //   house_no !== initialState.house_no ||
      //   street !== initialState.street ||
      //   landmark !== initialState.landmark ||
      //   city !== initialState.city ||
      //   String(pincode).trim() !== String(initialState.pinCode || "").trim() ||
      //   state_name !== initialState.state
      // );

      const normalize = (value) => {
        const val = (value ?? "").toString().trim().toLowerCase();
        return val === "null" || val === "undefined" ? "" : val;
      };
      

const isChanged = (
  userName !== initialState.userName ||
  guardian !== initialState.guardian ||
  Number(countryCode + Phone) !== Number(initialState.Phone) ||
  normalize(house_no) !== normalize(initialState.house_no) ||
  normalize(street) !== normalize(initialState.street) ||
  normalize(landmark) !== normalize(initialState.landmark) ||
  city !== initialState.city ||
  String(pincode).trim() !== String(initialState.pinCode || "").trim() ||
  state_name !== initialState.state
);

      if (!isChanged) {
        setFormError("No Changes Detected");
        return;
      } else {
        setFormError("");
      }

      dispatch({
        type: "CUSTOMERADDCONTACT",
        payload: {
          user_name: userName,
          guardian: guardian,
          mob_no: MobileNumber,
          // address: address,
          address: house_no,
          area : street,
          landmark : landmark,
          city : city,
          pin_code : pincode,
          state:state_name,
          user_id: props.id,
          id: contactId,
        },
      });
    } else {
      dispatch({
        type: "CUSTOMERADDCONTACT",
        payload: {
          user_name: userName,
          guardian: guardian,
          mob_no: MobileNumber,
          address: house_no,
          area : street,
          landmark : landmark,
          city : city,
          pin_code : pincode,
          state:state_name,
          user_id: props.id,
        },
      });
    }
  };

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerCoatact === 200) {
      handleCloseAdditionalForm();
      dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);

  

  const handlePhone = (e) => {
    const value = e.target.value;
  
    // Allow only numbers and up to 10 digits
    if (!/^\d{0,10}$/.test(value)) {
      return;
    }
  
    setPhone(value);
  
    // Clear error if empty (no error on blank input)
    if (value === "") {
      setPhoneError("");
    } else if (value.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid Mobile Number");
    }
  
    setFormError("");
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
  };
  
  
  useEffect(() => {
    if (state.UsersList.contactError) {
      setGuardianAlreadyError(state.UsersList.contactError);
    }
  }, [state.UsersList.contactError]);

  const handleCloseAdditionalForm = () => {
    props.setAdditionalForm(false);
    setUserName("");
    setPhone("");
    // setAddress("");
    setGuardian("");
    setUserNameError("");
    setGuardianError("");
    setPhoneError("");
    // setAddressError("");
    setHouseNo("")
    setStreet("")
    setLandmark("")
    setCity("")
    setPincode("")
    setStateName("")
    setFormError("");
    setGuardianAlreadyError("")
    dispatch({ type: "CLEAR_CONTACT_ERROR" });
  };

  return (
    <div>
      <Modal
        show={props.additionalForm}
        onHide={handleCloseAdditionalForm}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: "666px",

            paddingRight: "10px",

            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body>
            <div className="d-flex align-items-center">
              <div className="container">
                {/* <div className="row mb-3"></div> */}

                <Modal.Header
                  style={{ position: "relative" ,paddingTop:"-0px"}}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    + Add Contact
                  </div>
                  {/* <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={handleCloseAdditionalForm}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "16px",
                      border: "1px solid black",
                      background: "transparent",
                      cursor: "pointer",
                      padding: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "25px",
                      height: "25px",
                      borderRadius: "50%",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        fontSize: "30px",
                        paddingBottom: "6px",
                      }}
                    >
                      &times;
                    </span>
                  </button> */}
                  <CloseCircle size="24" color="#000" onClick={handleCloseAdditionalForm} 
            style={{ cursor: 'pointer' }}/>
                </Modal.Header>

                <div className="row mt-1">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        User Name{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter User Name"
                        onChange={(e) => handleUserName(e)}
                        value={userName}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                      />
                    </Form.Group>

                    {userNameError && (
                      <div style={{ marginTop: "-15px", color: "red" }}>
                        <MdError
                          style={{
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {userNameError}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Guardian{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Guardian Name"
                        onChange={(e) => handleGuardian(e)}
                        value={guardian}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                      />
                    </Form.Group>

                    {guardianError && (
                      <div style={{ marginTop: "-15px", color: "red" }}>
                        <MdError
                          style={{
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {guardianError}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group controlId="exampleForm.ControlInput1">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Mobile Number{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
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
                            paddingRight: 10,
                          }}
                        >
                          <option>+{countryCode}</option>
                        </Form.Select>
                        <Form.Control
                          value={Phone}
                          onChange={handlePhone}
                          type="text"
                          placeholder="9876543210"
                          maxLength={10}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: Phone ? 600 : 500,
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
                      <p
                        id="MobileNumberError"
                        style={{ color: "red", fontSize: 11, marginTop: 5 }}
                      ></p>

                      {phoneError && (
                        <div style={{ marginTop: "-15px", color: "red" }}>
                          <MdError
                            style={{
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              marginRight: "5px",
                            }}
                          />
                          <span
                            style={{
                              fontSize: "13px",
                              color: "red",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            {phoneError}
                          </span>
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
                                                                      <div style={{ color: "red"}}>
                                                                        <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                                                        <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
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
                                                                      <div style={{ color: "red"}}>
                                                                        <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                                                        <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
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
                                                                      <div style={{ color: "red"}}>
                                                                        <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                                                        <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
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
                                                                                                                                              value={pincode}
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
                                                                                                                                                fontWeight: pincode ? 600 : 500,
                                                                                                                                                boxShadow: "none",
                                                                                                                                                border: "1px solid #D9D9D9",
                                                                                                                                                height: 50,
                                                                                                                                                borderRadius: 8,
                                                                                                                                              }}
                                                                                                                                            />
                                                                                                                                            {pincodeError && (
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
                                                                                                                                                  {pincodeError}
                                                                                                                                                </label>
                                                                                                                                              </div>
                                                                                                                                            )}
                                                                                                                          
                                                                                                                          
                                                                                                                                          </Form.Group>
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
                                                                        <MdError style={{fontSize: '13px',marginRight:"5px"}} />
                                                                        <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                                                                      </div>
                                                                    )}
                                                                  </div>
                                                      
                                                               <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                                 <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
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
                                                                     State
                                                                     <span style={{ color: "red", fontSize: "20px" }}> * </span>
                                                                   </Form.Label>
                                                               
                                                                   <Select
                                                                     options={indianStates}
                                                                     onChange={(selectedOption) => {
                                                                       setStateName(selectedOption?.value);
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
                                                                       }),
                                                                       menuList: (base) => ({
                                                                         ...base,
                                                                         backgroundColor: "#f8f9fa",
                                                                         maxHeight: "120px",
                                                                         padding: 0,
                                                                         scrollbarWidth: "thin",
                                                                         overflowY: "auto",
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
                                                               
                                                                 {state_nameError && (
                                                                   <div style={{ color: "red" }}>
                                                                     <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                                                                     <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                                                                       {state_nameError}
                                                                     </span>
                                                                   </div>
                                                                 )}
                                                               </div>


                  {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        Address{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Address"
                        onChange={(e) => handleAddress(e)}
                        value={address}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          boxShadow: "none",
                          border: "1px solid #D9D9D9",
                          height: 50,
                          borderRadius: 8,
                          marginTop: 8,
                        }}
                      />
                    </Form.Group>
                  

                    {addressError && (
                      <div style={{ marginTop: "-15px", color: "red" }}>
                        <MdError
                          style={{
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {addressError}
                        </span>
                      </div>
                    )}
                  </div> */}


                </div>
                  {formError && (
                          <div className=" " style={{ color: "red" ,textAlign:"center",marginTop:"-13px"}}>
                            <MdError style={{fontSize: '14px',marginRight:"6px"}}/>
                            <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500}}>{formError}</span>
                          </div>
                        )}
                        {guardianAlreadyError && (
                          <div className=" " style={{ color: "red" ,textAlign:"center",marginTop:"-13px"}}>
                            <MdError style={{fontSize: '14px',marginRight:"6px"}}/>
                            <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500}}>{guardianAlreadyError}</span>
                          </div>
                        )}
                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 600,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                    marginTop:"8px"
                  }}
                  onClick={handleSubmitContact}
                >
                  Add Contact
                </Button>
              </div>
              {/* )} */}
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}

UserAdditionalContact.propTypes = {
  contactEdit: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
  setAdditionalForm: PropTypes.func.isRequired,
  additionalForm: PropTypes.func.isRequired,
  editAdditional: PropTypes.func.isRequired,
};

export default UserAdditionalContact;

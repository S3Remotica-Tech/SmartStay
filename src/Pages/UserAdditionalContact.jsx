/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, FormControl } from "react-bootstrap";
import "./UserList.css";
import { InputGroup } from "react-bootstrap";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";


function UserAdditionalContact(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [userName, setUserName] = useState("");
  const [guardian, setGuardian] = useState("");
  const [Phone, setPhone] = useState("");

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
  const [formLoading, setFormLoading] = useState(false)

  const [initialState, setInitialState] = useState({
    userName: "",
    guardiaz: "",
    Phone: "",
    address: "",
    house_no: "",
    street: "",
    city: "",
    landmark: "",
    state: "",
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
      
        house_no: props.contactEdit.address || "",
        street: props.contactEdit.area || "",
        city: props.contactEdit.city || "",
        landmark: props.contactEdit.landmark || "",
        state: props.contactEdit.state || "",
        pinCode: props.contactEdit.pin_code || "",
      });
    }
  }, [props.contactEdit && props.editAdditional]);

 

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
 

  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("")
    
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");

    
    
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
    
  }


  const handlePinCodeChange = (e) => {
  const value = e.target.value;

  if (!/^\d{0,6}$/.test(value)) return; 

  setPincode(value);

  if (value.length === 6) {
    setPincodeError("");
  } else {
    setPincodeError("Pin Code Must Be Exactly 6 Digits");
  }
  setFormError("")
};




  const handleCity = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
      setFormError("");
    }
  }
const validateAssignField = (value, fieldName, ref, setError, focusedRef) => {
  const trimmedValue = (value ?? "").toString().trim();

  const isValueEmpty =
    trimmedValue === "" || trimmedValue === "null" || trimmedValue === "undefined" || trimmedValue === "0";

  if (isValueEmpty) {
    switch (fieldName) {
      case "gurardian":
        setError("Please Enter Guardian Name");
        break;
      case "userName":
        setError("Please Enter User Name");
        break;
      case "Phone":
        setError("Please Enter your Phone No");
        break;
      case "City":
        setError("Please Enter City");
        break;
      case "Pincode":
        setError("Please Enter Pincode");
        break;
      case "Statename":
        setError("Please Select State");
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

 
  if (fieldName === "Pincode" && trimmedValue.length !== 6) {
    setError("Pin Code Must Be Exactly 6 Digits");

    if (!focusedRef.current && ref?.current) {
      ref.current.focus();
      focusedRef.current = true;
    }

    return false;
  }

  setError("");
  return true;
};



  const usernameRef = useRef(null)
   const guardianRef = useRef(null)
   const PhoneRef = useRef(null)
   const cityRef = useRef(null)
   const pincodeRef = useRef(null)
   const stateRef = useRef(null)
const nochangeRef =useRef(null)


const handleSubmitContact = () => {
  dispatch({ type: "CLEAR_CONTACT_ERROR" });
  let hasError = false;
  const focusedRef = { current: false };


  if (!validateAssignField(userName, "userName", usernameRef, setUserNameError, focusedRef)) hasError = true;
  if (!validateAssignField(guardian, "gurardian", guardianRef, setGuardianError, focusedRef)) hasError = true;
  if (!validateAssignField(Phone, "Phone", PhoneRef, setPhoneError, focusedRef)) hasError = true;
  if (!validateAssignField(city, "City", cityRef, setCityError, focusedRef)) hasError = true;
  if (!validateAssignField(pincode, "Pincode", pincodeRef, setPincodeError, focusedRef)) hasError = true;
  if (!validateAssignField(state_name, "Statename", stateRef, setStateNameError, focusedRef)) hasError = true;


    if (Phone && Phone.length !== 10) {
      setPhoneError("Please Enter Valid Mobile Number");
      if (!focusedRef.current && PhoneRef?.current) {
        PhoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else if (Phone) {
      setPhoneError("");
      setPhoneError("");
    }

  if (hasError) return;

  
  const normalize = (val) => {
    const str = (val ?? "").toString().trim().toLowerCase();
    return str === "null" || str === "undefined" ? "" : str;
  };

 
  if (props.editAdditional && props.contactEdit.id) {
    const isChanged =
      userName !== initialState.userName ||
      guardian !== initialState.guardian ||
      Number(countryCode + Phone) !== Number(initialState.Phone) ||
      normalize(house_no) !== normalize(initialState.house_no) ||
      normalize(street) !== normalize(initialState.street) ||
      normalize(landmark) !== normalize(initialState.landmark) ||
      city !== initialState.city ||
      normalize(pincode) !== normalize(initialState.pinCode?.toString()) ||
      state_name !== initialState.state;

    if (!isChanged) {
      setFormError("No Changes Detected");

      setTimeout(() => {
        if (nochangeRef.current) {
          nochangeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          nochangeRef.current.focus();
        }
      }, 100);

      return;
    } else {
      setFormError("");
    }

    
    dispatch({
      type: "CUSTOMERADDCONTACT",
      payload: {
        user_name: userName,
        guardian,
        mob_no: MobileNumber,
        address: house_no,
        area: street,
        landmark,
        city,
        pin_code: pincode,
        state: state_name,
        user_id: props.id,
        id: contactId,
      },
    });

    setFormLoading(true);
  } else {
    
    dispatch({
      type: "CUSTOMERADDCONTACT",
      payload: {
        user_name: userName,
        guardian,
        mob_no: MobileNumber,
        address: house_no,
        area: street,
        landmark,
        city,
        pin_code: pincode,
        state: state_name,
        user_id: props.id,
      },
    });

    setFormLoading(true);
  }
};




  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerCoatact === 200) {
      setFormLoading(false)
      handleCloseAdditionalForm();
      dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);



  const handlePhone = (e) => {
    const value = e.target.value;
  
    if (!/^\d{0,10}$/.test(value)) {
      return;
    }

    setPhone(value);
  
  
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
  
    setGuardian("");
    setUserNameError("");
    setGuardianError("");
    setPhoneError("");
   
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


  useEffect(()=>{
    if(state.UsersList.contactError){
      setFormLoading(false)
    }

  },[state.UsersList.contactError])



useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])




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
                   <Modal.Header
                  style={{ position: "relative", paddingTop: "-0px" }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Add Contact
                  </div>
                 
                  <CloseCircle size="24" color="#000" onClick={handleCloseAdditionalForm} 
            style={{ cursor: 'pointer' }}/>
                </Modal.Header>
 <div style={{ maxHeight: "400px", overflowY: "scroll",overflowX:"hidden" }} className="show-scroll p-2 mt-1 me-0">
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
                        User Names{" "}
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
                        ref={usernameRef}
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
                            fontSize: "12px",
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
                        ref={guardianRef}
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
                            fontSize: "12px",
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
                            ref={PhoneRef}
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
                        style={{ color: "red", fontSize: 12, marginTop: 5 }}
                      ></p>

                      {phoneError && (
                        <div style={{ marginTop: "-15px", color: "red", marginBottom: "15px" }}>
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
                              fontSize: "12px",
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
                      <div style={{ color: "red" }}>
                        <MdError style={{ fontFamily: "Gilroy", fontSize: '12px', marginRight: "5px", marginBottom: "1px" }} />
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
                                                                                                                                              ref={pincodeRef}
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
                          <MdError style={{ color: "red", marginRight: "5px", fontSize: "12px", marginBottom: "2px" }} />
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
                        <MdError style={{ fontSize: '12px', marginRight: "5px" }} />
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
                                                                     ref={stateRef}
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

                      {!state_name && state_nameError && (
                        <div style={{ color: "red" }}>
                          <MdError style={{ fontSize: "12px", marginRight: "5px" }} />
                          <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state_nameError}
                          </span>
                        </div>
                      )}
                    </Form.Group>

                  </div>





                </div>
                 
</div>
 {formError && (
                          <div ref={nochangeRef} className=" " style={{ color: "red" ,textAlign:"center",marginTop:"-13px"}}>
                            <MdError style={{fontSize: '12px',marginRight:"6px"}}/>
                            <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500}}>{formError}</span>
                          </div>
                        )}
                        {guardianAlreadyError && (
                          <div className=" " style={{ color: "red" ,textAlign:"center",marginTop:"-13px"}}>
                            <MdError style={{fontSize: '12px',marginRight:"6px"}}/>
                            <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500}}>{guardianAlreadyError}</span>
                          </div>
                        )}
                        {state.createAccount?.networkError ?
              <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
              </div>
              : null}

                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 600,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                    marginTop: "8px"
                  }}
                  onClick={handleSubmitContact}
                >
                  Add Contact
                </Button>
              </div>
            </div>
          </Modal.Body>

          

                                {formLoading && <div
                                  style={{
                                    position: 'absolute',
                                    top: 100,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
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

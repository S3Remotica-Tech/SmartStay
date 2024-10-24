import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, FormControl,InputGroup } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { MdError } from "react-icons/md";
import { useDispatch, useSelector} from "react-redux";

function AssignBooking (props){

  const state = useSelector((state) => state);
  console.log("state...",state)
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  console.log("firstName",firstName)
  const [lastName, setLastName] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [payingguest, setPayingGuest] = useState('');
  const [aadharno, setAadharno] = useState('');
  const [address, setAddress] = useState('');
  const [phoneError, setPhoneError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [addressError, setAddressError] = useState("");
  console.log(props.assignBooking,"?????????");


  useEffect(() => {
    dispatch({ type: "COUNTRYLIST" });
  }, [])
  

const handleAssignClose =()=>{
  props.setModalType(false)
  setMobileNo('')
  setEmail('')
  setAddress('')
  setEmailError('')
  setPhoneError('')
  setAddressError('')
  setEmailErrorMessage('')
}



const handleCountryCodeChange = (e) => {
  setCountryCode(e.target.value);
};

const handleMobile=(e)=>{
  setMobileNo(e.target.value)
  const pattern = /^\d{1,10}$/;
  const isValidMobileNo = pattern.test(e.target.value);

  if (isValidMobileNo && e.target.value.length === 10) {
    setPhoneError("");
  } else {
    setPhoneError("Invalid mobile number *");
  }
  setPhoneError("");
  
}
const handleEmail = (e) => {
  const emailValue = e.target.value;
  setEmail(emailValue);

  
  const hasUpperCase = /[A-Z]/.test(emailValue);
  const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  
  const isValidEmail = emailRegex.test(emailValue);

  
  if (!emailValue) {
    setEmailError("");
    setEmailErrorMessage("");
  } else if (hasUpperCase) {
    setEmailErrorMessage("Email should be in lowercase *");
    setEmailError("Invalid Email Id *");
  } else if (!isValidEmail) {
    setEmailErrorMessage("");
    setEmailError("Invalid Email Id *");
  } else {
    setEmailError("");
    setEmailErrorMessage("");

    
  }

  // Clear email error on input change
  // dispatch({ type: "CLEAR_EMAIL_ERROR" });
};
const handleAddress=(e)=>{
  setAddress(e.target.value)
  setAddressError('')
}
const MobileNumber = `${countryCode}${mobileno}`;
useEffect(()=>{
  if(props.assignBooking){
    const phoneNumber = String(props.assignBooking.phone_number || "");
    const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
    const mobileNumber = phoneNumber.slice(-10);
    setFirstName(props.assignBooking.first_name)
    setLastName(props.assignBooking.last_name)
    setPayingGuest(props.assignBooking.hostel_name)
    setMobileNo(mobileNumber)
    setAddress(props.assignBooking.address)
    setEmail(props.assignBooking.email_id)
    setCountryCode(countryCode)
    

  }
})

console.log("props.assignBooking",props.assignBooking)

const validateAssignField = (value, fieldName) => {
  const stringValue = String(value).trim();
  if (!stringValue) {
    switch (fieldName) {
      case "mobileno":
        setPhoneError("mobileno is required");
        break;
      case "address":
        setAddressError("address is required");
        break;
      
      default:
        break;
    }
    return false;
  } else {
    switch (fieldName) {
      case "mobileno":
        setPhoneError("");
      case "address":
        setAddressError("");
        break;
      default:
        break;
    }
    return true;
  }
};






  
  const handleSubmit = (event) => {
    // if (!validateAssignField(mobileno, "mobileno")) return;
    // if (!validateAssignField(address, "address")) return;
   
    // if (phoneError === "Invalid mobile number *") {
    //   setPhoneError("Please enter a valid 10-digit phone number");
    //   return;
    // } else {
    //   setPhoneError("");
    // }
    const payload = {
      
      firstname: firstName,
      lastname: lastName,
      Phone: mobileno,
      Email: email,
      Address: address,
      HostelName: props.assignBooking.hostel_name,
      Hostel_Id:  props.assignBooking.hostel_id,
      Floor_Id: props.assignBooking.floor_id,
      Room_Id: props.assignBooking.room_id,
      Bed_Id: props.assignBooking.bed_id,
      joining_Date: props.assignBooking.joining_date,
      // AdvanceAmount,
      RoomRent: props.assignBooking.amount,
      country_code:countryCode, 
      id: props.assignBooking.id,
    };
    dispatch({
      type: "ASSIGN_BOOKING",
      payload: payload,
    });

   
  };

  useEffect(()=>{
    if(state.Booking.statusCodeForAssignBooking === 200){
      handleAssignClose()
      dispatch({ type: "USERLIST"});
      dispatch({ type: "GET_BOOKING_LIST" });

    }

  },[state.Booking.statusCodeForAssignBooking])

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNo(value);
      if (formErrors.mobileno) {
        setFormErrors((prev) => ({ ...prev, mobileno: '' }));
      }
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 12) {
      setAadharno(value);
      if (formErrors.aadharno) {
        setFormErrors((prev) => ({ ...prev, aadharno: '' }));
      }
    }
  };


 

  return (
    <Modal show={props.modalType} onHide={handleAssignClose} centered backdrop="static">
      
        <Modal.Header closeButton>
          <Modal.Title>Assign Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          
            <Col md={6}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  First Name 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={firstName}
                  // onChange={}
                  isInvalid={!!formErrors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            
            <Col md={6}>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Last Name 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setFormErrors((prev) => ({ ...prev, lastName: '' }));
                    }
                  }}
                  isInvalid={!!formErrors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
           
            <Col md={6}>
            <Form.Group>
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Mobile number{" "}
                                        <span
                                          style={{
                                            color: "red",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {" "}
                                          *{" "}
                                        </span>
                                      </Form.Label>

                                      <InputGroup>
                                        <Form.Select
                                          value={countryCode}
                                          id="vendor-select-pg"
                                          onChange={handleCountryCodeChange}
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
                                          {state.UsersList?.countrycode?.country_codes?.map(
                                            (item) => {
                                              console.log("itemImage", item);

                                              return (
                                                console.log(
                                                  "item.country_flag",
                                                  item.country_flag
                                                ),
                                                (
                                                  <>
                                                    <option
                                                      value={item.country_code}
                                                    >
                                                      +{item.country_code}
                                                    </option>
                                                  </>
                                                )
                                              );
                                            }
                                          )}
                                        </Form.Select>
                                        <Form.Control
                                          value={mobileno}
                                          onChange={handleMobile}
                                          type="text"
                                          placeholder="9876543210"
                                          maxLength={10}
                                          style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: mobileno ? 600 : 500,
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
                                        style={{
                                          color: "red",
                                          fontSize: 11,
                                          marginTop: 5,
                                        }}
                                      ></p>
                                      {phoneError && (
                                        <div style={{ color: "red" }}>
                                          <MdError />
                                          {phoneError}
                                        </div>
                                      )}
                                      {phonenumError && (
                                        <div style={{ color: "red" }}>
                                          <MdError />
                                          {phonenumError}
                                        </div>
                                      )}
                                      {phoneErrorMessage && (
                                        <div style={{ color: "red" }}>
                                          <MdError />
                                          {phoneErrorMessage}
                                        </div>
                                      )}
                                    </Form.Group>
            </Col>

            
            <Col md={6}>
           
<Form.Group className="mb-3">
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Email Id
                                      </Form.Label>
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter email address"
                                        value={email}
                                        onChange={(e) => handleEmail(e)}
                                        // style={bottomBorderStyle}
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

                                      {emailError && (
                                        <div style={{ color: "red" }}>
                                          <MdError />
                                          {emailError}
                                        </div>
                                      )}
                                    
                                      {emailErrorMessage && (
                                        <div style={{ color: "red" }}>
                                          <MdError />
                                          {emailErrorMessage}
                                        </div>
                                      )}
                                    </Form.Group>
            </Col>
          </Row>

          <Row>
            
            <Col md={6}>
              <Form.Group controlId="formPayingGuest" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Paying Guest 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter paying guest info"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={payingguest}
                  onChange={(e) => {
                    setPayingGuest(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setFormErrors((prev) => ({ ...prev, payingguest: '' }));
                    }
                  }}
                  isInvalid={!!formErrors.payingguest}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.payingguest}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Address 
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter address"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={address}
                 onChange={(e)=>handleAddress(e)}
                />
                
              </Form.Group>
              {addressError && (
                                      <div style={{ color: "red" }}>
                                        <MdError />
                                        {addressError}
                                      </div>
                                    )}
            </Col>

            {/* <Col md={6}>
              <Form.Group controlId="formAadharNo" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Aadhar Number 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Aadhar number"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={aadharno}
                  onChange={handleAadharChange}
                  isInvalid={!!formErrors.aadharno}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.aadharno}
                </Form.Control.Feedback>
              </Form.Group>
            </Col> */}
          </Row>

          <Row>
            
          
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
          onClick={handleSubmit}
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              borderRadius: 12,
              padding: '12px',
              border: '1px solid rgba(36, 0, 255, 1)',
              backgroundColor: 'rgba(36, 0, 255, 1)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 600,
              fontFamily: 'Gilroy',
              
              
            }} 
          >
            Assign Booking
          </Button>
        </Modal.Footer>
     
    </Modal>
  );
};

export default AssignBooking;



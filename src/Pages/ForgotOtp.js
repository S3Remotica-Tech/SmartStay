import { Email } from '@material-ui/icons';
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CryptoJS from "crypto-js";

import Cookies from 'universal-cookie';


const OtpVerificationModal = ({ show, handleClose , Email_Id}) => {
  
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [otpValue, setOtpValue] = useState('');


console.log("state for opt verification",state)


  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];


  const handleOtpInputChange = (e, index) => {
    if (e.target.value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    const updatedOtpValue = inputRefs.map(ref => ref.current.value).join('');
     setOtpValue(updatedOtpValue);
  };






  const handleOtpVerify = () => {

    if(otpValue){
      dispatch({ type: 'OTPVERIFYFORGOTPASSWORD', payload: {Email_Id:  Email_Id, OTP: otpValue} })
    }else{
         Swal.fire({
          icon: 'warning',
          title: 'Error',
          text: 'Enter Valid Otp',
        });
    }
    inputRefs && inputRefs.forEach(ref => {
      ref.current.value = null;
    });
     };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-start mb-3'>
          <p id="Text-Mobile" style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500}}>Enter 6 Digit OTP Number</p>
        </div>
        <div className='d-flex justify-content-evenly mt-2'>
        {inputRefs.map((ref, index) => (
                          <div key={index}>
                            <input
                            style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500}}
                              id="Bottom-border"
                              type="text"
                              aria-label=".form-control-lg example"
                              maxLength={1}
                              onChange={(e) => handleOtpInputChange(e, index)}
                              ref={ref}
                              autoFocus={index === 0}
                            />
                          </div>
                        ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button  onClick={handleOtpVerify} style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }}>
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OtpVerificationModal;

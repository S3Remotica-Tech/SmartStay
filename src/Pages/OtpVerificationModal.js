import { Email } from '@material-ui/icons';
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CryptoJS from "crypto-js";

import Cookies from 'universal-cookie';


const OtpVerificationModal = ({ show, handleClose , Email_Id, checked}) => {
  
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

// i am command this line step :1


  // useEffect(()=>{
  //   dispatch({ type: 'ACCOUNTDETAILS' });
  // },[])

useEffect(()=>{
  if(state.login.OtpVerifyStatusCode == 200){
    console.log("executed mathu")
    dispatch({ type: 'LOGIN-SUCCESS' })

    const token = state.login.JWTtoken
    const cookies = new Cookies()
    cookies.set('token', token, { path: '/' });

    console.log("tokenverification",token)

    // dispatch({ type: 'ACCOUNTDETAILS'})
    //   console.log("executed account details")
    //   setTimeout(()=>{
    //     dispatch({ type: 'CLEAR_ACCOUNT_STATUS_CODE'})
    //     },2000)


        setTimeout(()=>{
          dispatch({ type: 'CLEAR_OTP_VERIFIED'})
          },1000)

      } else {
  console.error("Login information not available.");
}
 },[state.login.OtpVerifyStatusCode])

  const otpResponse = state.NewPass?.OTP?.response;
  const otp = otpResponse?.otp



  const handleOtpVerify = () => {

    if(otpValue){
      dispatch({ type: 'OTPVERIFY', payload: {Email_Id:  Email_Id, OTP: otpValue} })
    }
    inputRefs && inputRefs.forEach(ref => {
      ref.current.value = null;
    });
    // if (otp == otpValue) {
    //     dispatch({ type: 'LOGIN-SUCCESS' })
    //   }
    //   else {
        // Swal.fire({
        //   icon: 'warning',
        //   title: 'Error',
        //   text: 'Enter Valid Otp',
        // });
      
      // }

  //  dispatch({type:'CLEAR_OTP_STATUS_CODE'})
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>OTP Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-start mb-3'>
          <p id="Text-Mobile" style={{ color: "gray", fontSize: "12px", fontWeight: 600 }}>Enter 6 Digit OTP Number</p>
        </div>
        <div className='d-flex justify-content-evenly mt-2'>
        {inputRefs.map((ref, index) => (
                          <div key={index}>
                            <input
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
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleOtpVerify}>
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default OtpVerificationModal;

import { Email } from '@material-ui/icons';
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import CryptoJS from "crypto-js";


const OtpVerificationModal = ({ show, handleClose , Email_Id, checked}) => {
  
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [otpValue, setOtpValue] = useState('');


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
    dispatch({ type: 'LOGIN-SUCCESS' })




const LoginDetails = state.login && state.login.sendOtpValue ? state.login.sendOtpValue[0] : undefined;

if (LoginDetails) {
  const LoginId = LoginDetails.id;
  const NameId = LoginDetails.Name;
  const phoneId = LoginDetails.mobileNo;
  const emilidd = LoginDetails.email_Id;
  const Is_Enable = LoginDetails.isEnable;
  const Pass_word = LoginDetails.password;


//   const IsEnableCheckState = state.createAccount.accountList.filter((view => view.id == LoginId ))


// let is_Enable = IsEnableCheckState[0].isEnable

  const encryptedLoginId = CryptoJS.AES.encrypt(LoginId.toString(), 'abcd').toString();
  const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
  const encryptedphone = CryptoJS.AES.encrypt(phoneId.toString(), 'abcd').toString();
  const encryptedemail = CryptoJS.AES.encrypt(emilidd.toString(), 'abcd').toString();
  const encryptIsEnable = CryptoJS.AES.encrypt(Is_Enable.toString(), 'abcd').toString();
  const encryptPassword = CryptoJS.AES.encrypt(Pass_word.toString(), 'abcd').toString();
  localStorage.setItem("loginId", encryptedLoginId);
      localStorage.setItem("NameId", encryptedname);
      localStorage.setItem("phoneId", encryptedphone);
      localStorage.setItem("emilidd", encryptedemail);
      localStorage.setItem("IsEnable", encryptIsEnable);
      localStorage.setItem("Password", encryptPassword);

  // if (is_Enable === 0) {
  //     const encryptData = CryptoJS.AES.encrypt(JSON.stringify(true), 'abcd');
  //     localStorage.setItem("login", encryptData.toString());
      // localStorage.setItem("loginId", encryptedLoginId);
      // localStorage.setItem("NameId", encryptedname);
      // localStorage.setItem("phoneId", encryptedphone);
      // localStorage.setItem("emilidd", encryptedemail);
      // localStorage.setItem("IsEnable", encryptIsEnable);
      // localStorage.setItem("Password", encryptPassword);
  // } else {
      // const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd');
      // localStorage.setItem("login", encryptData.toString());
      // localStorage.setItem("loginId", encryptedLoginId);
      // localStorage.setItem("NameId", encryptedname);
      // localStorage.setItem("phoneId", encryptedphone);
      // localStorage.setItem("emilidd", encryptedemail);
      // localStorage.setItem("IsEnable", encryptIsEnable);
      // localStorage.setItem("Password", encryptPassword);
  // }
} else {
  console.error("Login information not available.");
}

  }
setTimeout(()=>{
dispatch({ type: 'CLEAR_OTP_VERIFIED'})
},100)


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

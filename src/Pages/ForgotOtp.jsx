
import React, { useState, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {  CloseCircle} from 'iconsax-react';
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";

const OtpVerificationModal = ({ show, handleClose , Email_Id}) => {
  
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

    setOtpErrors('')
    dispatch({ type: 'CLEAR_OTP_INVALID_ERROR'})

    if (e.target.value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    const updatedOtpValue = inputRefs.map(ref => ref.current.value).join('');
     setOtpValue(updatedOtpValue);
  };



const[ otpErrors, setOtpErrors] = useState('')



  // const handleOtpVerify = () => {

  //   if(!otpValue){
  //     setOtpErrors('Please enter valid otp')
  //   }

  //   if(otpValue){
  //     dispatch({ type: 'OTPVERIFYFORGOTPASSWORD', payload: {Email_Id:  Email_Id, OTP: otpValue} })
  //   }
  //   inputRefs && inputRefs.forEach(ref => {
  //     ref.current.value = null;
  //   });
  //    };


  const handleOtpVerify = () => {
    if (!otpValue) {
      setOtpErrors("Please enter valid otp");
      return; 
    }
  
    dispatch({
      type: "OTPVERIFYFORGOTPASSWORD",
      payload: { Email_Id: Email_Id, OTP: otpValue },
    });
  
    if (inputRefs) {
      inputRefs.forEach((ref) => {
        if (ref.current) ref.current.value = null; 
      });
    }
  };
  

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header >
        <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>OTP Verification</Modal.Title>
     
        <CloseCircle size="24" color="#000"  onClick={handleClose}/>
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
      
       {otpErrors ? <div className='d-flex align-items-center p-1'>
  <MdError style={{ color: "red" , marginRight: '5px'}} />
  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{otpErrors}</label>
</div>
  : null}



{state.NewPass?.otpInvalidError ? <div className='d-flex align-items-center p-1'>
  <MdError style={{ color: "red" , marginRight: '5px'}} />
  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.NewPass?.otpInvalidError}</label>
</div>
  : null}




      <Modal.Footer>
        {/* <Button variant="secondary" onClick={handleClose}>
          Close
        </Button> */}
        <Button  onClick={handleOtpVerify} style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy" }}>
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
OtpVerificationModal.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  Email_Id: PropTypes.func.isRequired,
};
export default OtpVerificationModal;

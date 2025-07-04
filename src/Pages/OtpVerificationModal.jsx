/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import { CloseCircle } from 'iconsax-react';
import PropTypes from "prop-types";


import Cookies from 'universal-cookie';


const OtpVerificationModal = ({ show, handleClose, Email_Id }) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState('');
  const [formLoading, setFormLoading] = useState(false)
  const [otpErrors, setOtpErrors] = useState('')



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
    setOtpErrors('')
    dispatch({ type: 'CLEAR_ERROR_OTP_CODE' })

  };



  useEffect(() => {
    if (state.login.OtpVerifyStatusCode === 200) {
      setFormLoading(false)
      dispatch({ type: 'LOGIN-SUCCESS' })
      const token = state.login.JWTtoken
      const cookies = new Cookies()
      cookies.set('token', token, { path: '/' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_OTP_VERIFIED' })
      }, 1000)

    }
  }, [state.login.OtpVerifyStatusCode])




  const handleOtpVerify = () => {
    dispatch({ type: 'CLEAR_ERROR_OTP_CODE' })
    if (!otpValue) {
      setOtpErrors('Please enter a valid OTP');
      return;
    }

    dispatch({ type: 'OTPVERIFY', payload: { Email_Id: Email_Id, OTP: otpValue } });
    setFormLoading(true)
    if (inputRefs) {
      inputRefs.forEach(ref => {
        if (ref.current) ref.current.value = null;
      });
    }
  };

  const handleSendOtp = () => {
    if (Email_Id) {
      dispatch({ type: 'OTPSEND', payload: { email: Email_Id } });
      setFormLoading(true)
    }
  }


  const handleKeyDown = (e, index) => {
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      e.target.value === '' &&
      index > 0
    ) {
      inputRefs[index - 1].current.focus();
    }
  };








  useEffect(() => {
    if (state.login?.twoStepOtpError) {
      setFormLoading(false)
    }
  }, [state.login?.twoStepOtpError])


  useEffect(() => {
    if (state.NewPass?.statusCode === 200) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_OTP_STATUS_CODE' })
      }, 1000)

    }

  }, [state.NewPass?.statusCode])

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header >
        <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>OTP Verification</Modal.Title>

        <CloseCircle size="24" color="#000" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <div className='d-flex justify-content-start mb-3'>
          <p id="Text-Mobile" style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Enter 6 Digit OTP Number</p>
        </div>
        <div className='d-flex justify-content-evenly mt-2'>
          {inputRefs.map((ref, index) => (
            <div key={index}>
              <input
                style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}
                id="Bottom-border"
                type="text"
                aria-label=".form-control-lg example"
                maxLength={1}
                onChange={(e) => handleOtpInputChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                ref={ref}
                autoFocus={index === 0}
              />
            </div>
          ))}
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
      {otpErrors ? <div className='d-flex align-items-center p-1'>
        <MdError style={{ color: "red", marginRight: '5px' }} />
        <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{otpErrors}</label>
      </div>
        : null}

      {state.login?.twoStepOtpError ? <div className='d-flex align-items-center p-1'>
        <MdError style={{ color: "red", marginRight: '5px' }} />
        <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.login?.twoStepOtpError}</label>
      </div>
        : null}

      <Modal.Footer>
        <Button onClick={handleSendOtp} style={{ padding:"10px 15px",width:130,backgroundColor: "#DCDCDC", fontWeight: 600,  borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", border: "1px solid  #DCDCDC", color: "#222" }}>
          Resend Otp
        </Button>
        <Button onClick={handleOtpVerify} style={{  padding:"10px 15px",width:130 ,backgroundColor: "#1E45E1", fontWeight: 600,  borderRadius: 12, fontSize: 16, fontFamily: "Gilroy" }}>
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

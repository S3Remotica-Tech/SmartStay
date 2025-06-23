
import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { CloseCircle } from 'iconsax-react';
import PropTypes from "prop-types";
import { MdError } from "react-icons/md";



const OtpVerificationModal = ({ show, handleModalClose, Email_Id }) => {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState('');

  const [loading, setLoading] = useState(false)



  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  const [otpErrors, setOtpErrors] = useState('')

  const handleOtpInputChange = (e, index) => {

    setOtpErrors('')
    dispatch({ type: 'CLEAR_OTP_INVALID_ERROR' })

    if (e.target.value.length === 1 && index < inputRefs.length - 1) {
      inputRefs[index + 1].current.focus();
    }
    const updatedOtpValue = inputRefs.map(ref => ref.current.value).join('');
    setOtpValue(updatedOtpValue);
  };


const handleInternalClose = () => {
  setOtpErrors('');
  dispatch({ type: 'CLEAR_OTP_INVALID_ERROR' }); 
  setOtpValue('');
  inputRefs.forEach(ref => {
    if (ref.current) ref.current.value = '';
  });
  handleModalClose(); 
};





  const handleOtpVerify = () => {
    dispatch({ type: 'CLEAR_OTP_INVALID_ERROR'})
    if (!otpValue) {
      setOtpErrors("Please enter valid otp");
      return;
    }
    if (otpValue) {
      dispatch({
        type: "OTPVERIFYFORGOTPASSWORD",
        payload: { Email_Id: Email_Id, OTP: otpValue },
      });
      setLoading(true)
       if (inputRefs) {
      inputRefs.forEach((ref) => {
        if (ref.current) ref.current.value = null;
      });
    }
    }
   
  };


  useEffect(() => {
    if (state.NewPass?.otpInvalidError) {
      setLoading(false)
    }

  }, [state.NewPass?.otpInvalidError])

  return (
    <Modal show={show} onHide={handleInternalClose} backdrop="static">
      <Modal.Header >
        <Modal.Title style={{ fontSize: 18, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>OTP Verification</Modal.Title>

        <CloseCircle size="24" color="#000" onClick={handleModalClose} />
      </Modal.Header>
      <Modal.Body style={{ position: "relative" }}>





        <div className='d-flex justify-content-start mb-3'>
          <p id="Text-Mobile" style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Enter 6 Digit OTP Number</p>
        </div>
        <div className='d-flex justify-content-evenly mt-2 ' style={{ position: "relative" }}>

          {loading && <div
            style={{
              position: 'absolute',
              top: -100,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
              height: "50vh",
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
          {inputRefs.map((ref, index) => (
            <div key={index}>
              <input
                style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}
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
        <MdError style={{ color: "red", marginRight: '5px' }} />
        <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{otpErrors}</label>
      </div>
        : null}



      {state.NewPass?.otpInvalidError ? <div className='d-flex align-items-center p-1'>
        <MdError style={{ color: "red", marginRight: '5px' }} />
        <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.NewPass?.otpInvalidError}</label>
      </div>
        : null}




      <Modal.Footer>

        <Button onClick={handleOtpVerify} style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy" }}>
          Verify
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
OtpVerificationModal.propTypes = {
  show: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  Email_Id: PropTypes.func.isRequired,
};
export default OtpVerificationModal;

import React, { useState } from 'react';
import axios from 'axios'; 
import { useDispatch, useSelector } from 'react-redux';



function OTPSend() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();


  console.log("state for otp",state)

  const [email, setEmail] = useState('');
  const [otpSent, setOTPSent] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const sendOTP = async () => {
   dispatch({ type: 'FORGETPAGE',payload :{ email:email}})
  };

  return (
    <div>
      
        <div className='mb-5'>
          <h2>Enter your email to receive OTP</h2>
          <input  className="form-control w-50" type="email" value={email} onChange={handleEmailChange} />
          <button className='mt-5' onClick={sendOTP}>Send OTP</button>
        </div>
       
        
    </div>
  );
};

export default OTPSend;

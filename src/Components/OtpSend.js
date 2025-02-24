import React, { useState } from 'react';
import { useDispatch} from 'react-redux';



function OTPSend() {

 
  const dispatch = useDispatch();


  const [email, setEmail] = useState('');

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

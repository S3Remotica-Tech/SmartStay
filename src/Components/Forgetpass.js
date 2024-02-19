import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forgetpass.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Hand from "../Assets/Images/hand.png";
import Key from "../Assets/Images/new icon/key.png";
import Eye from "../Assets/Images/new icon/eye.png";
import HomeSideComponent from "./HomeSideContent";
import Swal from 'sweetalert2'


function ForgetPasswordPage() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  console.log("state for forgot", state)
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowpassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [newPassword, setNewPassword] = useState(false)
  const [otpValue, setOtpValue] = useState('');

  let navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  const handleEmailid = (e) => {
    dispatch({ type: 'CLEAR_ERROR' })
    setEmail(e.target.value);
  };



  const handlePassword = (e) => {
    setPassword(e.target.value);
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    const isValidpasswordNo = pattern.test(e.target.value);

    if (isValidpasswordNo) {
      document.getElementById('passwordError').innerHTML = '';
    } else {
      document.getElementById('passwordError').innerHTML = 'Invalid password *';
    }
  };

  console.log("state.NewPass.Pass.statusCode", state.NewPass.Pass.statusCode)
  console.log("state.NewPass.Pass.statusCode", state.NewPass.status_Code)

  useEffect(() => {
    if (state.NewPass?.Pass.statusCode === 200) {
      setEmail("");
      setPassword("");
      setOtpValue("");
      if (inputRefs) {
        inputRefs.forEach(ref => {
          if (ref.current) {
            ref.current.value = null;
          }
        });
      }

      setShowOtpVerification(false);
      setNewPassword(false);
    }
  }, [state.NewPass?.Pass]);



  const handlePasswordReset = () => {
    setShowOtpVerification(true)
    const isValidPassword = validatePassword();
    if (isValidPassword && otpValue && password) {
      dispatch({ type: 'FORGETPAGE', payload: { NewPassword: password, email: email, otp: otpValue } });
      inputRefs && inputRefs.forEach(ref => {
        if(ref.current){
        ref.current.value = null;
        }

      });

    } else {

      setShowOtpVerification(false);
      let errorMessage = "";
      if (email === '') {
        errorMessage = "Please Enter Email";
      } else if (!isValidPassword) {
        errorMessage = "Invalid Password";
      } else {
        errorMessage = "Please Enter Email and Valid Password";
      }

      Swal.fire({
        icon: 'error',
        title: 'Please Enter All Fields',
        text: errorMessage,
      });

      dispatch({ type: 'ERROR', payload: errorMessage });
    }
  };


  console.log("state.NewPass?.OTP.statusCode", state.NewPass?.OTP.statusCode)




  useEffect(() => {

    if (state.NewPass?.OTP.statusCode == 200) {
      setShowOtpVerification(true);
    } else {
      setShowOtpVerification(false);
    }

  }, [state.NewPass?.OTP])

  const handleAccountVerification = () => {
    if (email) {
      dispatch({ type: 'OTPSEND', payload: { email: email } });


    }
    else {
      let errorMessage = "";
      if (email === '') {
        errorMessage = "Please Enter Email";
      }
      else {
        errorMessage = "Please Enter Email and Valid Password";
      }
      Swal.fire({
        icon: 'error',
        title: 'Please Enter All Fields',
        text: errorMessage,
      });

      dispatch({ type: 'ERROR', payload: errorMessage });
    }

  };

  const validatePassword = () => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
    return pattern.test(password);
  }

  const handleLogin = () => {
    navigate('/login-Page')
  }
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

  const otpResponse = state.NewPass?.OTP?.response;
  const otp = otpResponse?.otp

  console.log("otp for get backend", otp)

  const handleOtpVerify = () => {
       console.log("otp", otp);
    console.log("otpValue:", otpValue);
    console.log("otp === otpValue", otp == otpValue)

    if (otp == otpValue) {
      setNewPassword(true);
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: 'Enter Valid Otp',
      });
      inputRefs && inputRefs.forEach(ref => {
        ref.current.value = null;
      });
    }
  }

  useEffect(() => {

  }, [email, state.NewPass?.otpVerify?.response])




  return (
    <div className="m-0 p-0" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
      <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white", overflowX: "hidden" }}>
          <HomeSideComponent />
        </div>

        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#F6F7FB", overflowX: "hidden" }}>
          <div className="text-end m-2" >
            <span className="right-content lh-1" style={{ fontSize: "13px" }}>Return to your</span>
            <button style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleLogin()}>Login</button>
          </div>
          <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Forgot your password</strong><img src={Hand} width="30" height="30" alt='Hand' /></div>
          <div className="d-flex justify-content-center pt-1"><p style={{ fontSize: "13px", color: "gray" }}>We need a few basic details to consider your profile</p></div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-sm-7 col-xs-7 right-side-form">
              {/* <div>{state.NewPass.errorMessage?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.NewPass.errorMessage}</label> : null}</div> */}
              <div className="Form">
                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Reset Key From Your Email</b></Form.Label>
                <InputGroup className="mb-3" size="lg" style={{ color: "#D9D9D9" }} >
                  <Form.Control
                    placeholder="Enter Reset Key From Your Email"
                    aria-label="Recipient's username"
                    className='border border-0 custom-input'
                    aria-describedby="basic-addon2"
                    autoFocus
                    value={email} onChange={(e) => handleEmailid(e)}
                    disabled={showOtpVerification}
                    style={{
                      fontSize: "12px",
                      fontWeight: "530",
                      opacity: 1,
                      borderRadius: "2px",
                      color: "gray",
                      '::placeholder': { color: "gray", fontSize: "12px" }
                    }}

                  />
                  <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none', borderRadius: "2px" }} >
                    <img src={Key} height="25" width="24" alt='key' />
                  </InputGroup.Text>
                </InputGroup>
                <div className="d-flex justify-content-end">
                  <Button type="" className="btn"

                    disabled={showOtpVerification}
                    style={{ borderRadius: 50, fontWeight: 700, width: "100px", fontSize: "12px", backgroundColor: "#5290fa", color: "white", borderColor: "#2F74EB99" }} onClick={handleAccountVerification}>
                    Send Otp
                  </Button>

                </div>

                {showOtpVerification && <>
                  <div className='row'>

                    <div className='col-lg-12'>
                      <div className='d-flex justify-content-start mb-3'>
                        <p id="Text-Mobile" style={{ color: "black", fontSize: "12px", fontWeight: 700 }}>Enter 6 Digit OTP Number</p>
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
                    </div>
                    <div class="d-flex justify-content-end w-100 gap-5 p-3">
                      <div>
                        <label onClick={handleAccountVerification} className="button-hover " style={{ fontSize: 12, backgroundColor: "", color: "#5290fa", borderColor: "#34A853" }}>
                          Resend OTP
                        </label>
                      </div>
                      <div class="d-flex">
                        <div><Button onClick={handleOtpVerify} className="button-hover" style={{ fontSize: 12, backgroundColor: "#34A853", color: "white", borderColor: "#34A853" }}>
                          Verify
                        </Button>
                        </div>

                      </div>
                    </div>



                  </div>
                </>}



                {newPassword && <>


                  <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>New Password</b></Form.Label>
                  <InputGroup className="mb-3" size="lg">
                    <Form.Control type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      aria-label="Recipient's username"
                      className='border border-0 custom-input'
                      aria-describedby="basic-addon2" style={{
                        borderRadius: "2px", fontSize: "12px", fontWeight: "530", color: "gray",
                        '::placeholder': { color: "gray", fontSize: 12 }

                      }}
                      value={password} onChange={(e) => handlePassword(e)}
                    />

                    <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none', borderRadius: "2px" }}>
                      <img src={showPassword ? Eye : eyeClosed} height="13" width="13" alt='Eye' onClick={togglePasswordVisibility} />
                    </InputGroup.Text>
                  </InputGroup>

                  <p id="passwordError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>


                  <div className="lists d-flex " style={{ fontSize: "13px", justifyContent: "space-between", textAlign: "left", width: "100%" }} >
                    <ul className="hoverList">
                      <li className="one" style={{ textAlign: "left" }}>One Upper Case Character</li>
                      <li style={{ textAlign: "left" }}>One Special Character</li>
                    </ul>
                    <div >

                      <ul className="hoverList">
                        <li className="mb-0" style={{ textAlign: "left" }}>8 Characters Minimum</li>
                        <li className="mt-0 pt-1" style={{ textAlign: "left" }}>One number</li>
                      </ul>
                    </div>
                  </div>

                </>}

              </div>
              <div className="d-flex justify-content-center mt-5">
                <Button type="" className="btn" style={{ fontWeight: 600, width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} onClick={handlePasswordReset}>
                  PASSWORD RESET
                </Button>
              </div>
              <div className="d-flex justify-content-center pt-3">
                <p style={{ color: 'gray', fontSize: "11px", fontFamily: "sans-serif", fontWeight: "bold", marginBottom: "0px" }}>By Clicking 'Sign in for free' I accept the</p>
              </div>
              <div className="d-flex justify-content-center">
                <p style={{ color: '#007FFF', fontSize: "11px", fontWeight: "bold" }}>Terms of Use <span style={{ color: 'gray', fontSize: "13px", fontFamily: "sans-serif", fontWeight: "bold" }}>  & </span> Privacy Policy <span style={{ color: 'gray', fontSize: "11px", fontFamily: "sans-serif", fontWeight: "bold" }}> of SmartStay.</span></p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;



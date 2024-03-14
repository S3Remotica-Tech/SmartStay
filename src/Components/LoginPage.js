import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Hai from "../Assets/Images/hand.png";
import Login from "../Assets/Images/new icon/login-user.png";
import Eye from "../Assets/Images/new icon/eye.png";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';
import eyeClosed from '../Assets/Images/pngaaa.com-6514750.png';
import HomeSideComponent from "./HomeSideContent";
import CryptoJS from "crypto-js";
import OtpVerificationModal from '../Pages/OtpVerificationModal';


const MyComponent = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  console.log("state", state)
  let navigate = useNavigate();

  const [email_Id, setemail_Id] = useState('')
  const [password, setpassword] = useState('')

  const [showPassword, setShowpassword] = useState(false)


  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  const handleCreateAccount = () => {
    navigate('/create-account')
  }
  const handleForgetPassword = () => {
    navigate('/forget-password')
  }

  const handleEmailChange = (e) => {
    dispatch({ type: 'CLEAR_EMAIL_ERROR' });
    setemail_Id(e.target.value)
  }

  const handlePasswordChange = (e) => {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' })
    setpassword(e.target.value)
  }

  const [checked, setChecked] = useState(false)


  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  }


  const [showOtpVerification, setShowOtpVerification] = useState(false)



  useEffect(() => {
    if (state.login.statusCode === 200) {
      const IsEnable = state.login?.loginInformation[0]?.isEnable
      console.log("IsEnable", IsEnable)
      if (IsEnable === 1) {
        dispatch({ type: 'OTPSEND', payload: { email: email_Id } });
        setTimeout(() => {
        setShowOtpVerification(true)
        },1000)
      }
      else {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You have been logged in successfully!',
          timer: 1000,
          showConfirmButton: false,
        });
        dispatch({ type: 'LOGIN-SUCCESS' })
        setShowOtpVerification(false)
      }


      const LoginId = state.login?.loginInformation[0]?.id;
      const NameId = state.login?.loginInformation[0]?.Name
      const phoneId = state.login?.loginInformation[0]?.mobileNo
      const emilidd = state.login?.loginInformation[0]?.email_Id
      console.log("state.login.statusCode", state.login.statusCode);

      const encryptedLoginId = CryptoJS.AES.encrypt(LoginId.toString(), 'abcd').toString();
      const encryptedname = CryptoJS.AES.encrypt(NameId.toString(), 'abcd').toString();
      const encryptedphone = CryptoJS.AES.encrypt(phoneId.toString(), 'abcd').toString();
      const encryptedemail = CryptoJS.AES.encrypt(emilidd.toString(), 'abcd').toString();

      console.log("encryptedLoginId", encryptedLoginId)

      if (checked == true) {
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(true), 'abcd')
        console.log("encryptData", encryptData.toString());

        localStorage.setItem("login", encryptData.toString())
        localStorage.setItem("loginId", encryptedLoginId)
        localStorage.setItem("NameId", encryptedname)
        localStorage.setItem("phoneId", encryptedphone)
        localStorage.setItem("emilidd", encryptedemail)
      }
      else {
        const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), 'abcd')
        console.log("encryptData.....jjjjjjjj", encryptData.toString());
        localStorage.setItem("login", encryptData.toString())
        localStorage.setItem("loginId", '')
        localStorage.setItem("NameId", '')
        localStorage.setItem("phoneId", '')
        localStorage.setItem("emilidd", '')
      }


      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUSCODE' })
      }, 100);
    }
  }, [state.login.statusCode])


  const handleCloseModal = () => {
    setShowOtpVerification(false);
  };

  const handleLogin = () => {
    if (email_Id && password) {
      dispatch({ type: 'LOGININFO', payload: { email_Id: email_Id, password: password } });
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: 'Error',
        text: email_Id ? 'Enter Password' : 'Enter Email id and Password',
        timer: 3000,
        showConfirmButton: false,
      });
    }
  };



  return (
    <div className="m-0 p-0" style={{ height: "100vh", width: "100%", fontFamily: "Poppins,sans-serif" }} >
      <div className="row g-0" style={{ height: "100vh", width: "100%" }} >
        <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12" style={{ backgroundColor: "#2F74EB", color: "white", overflowX: "hidden" }}>
          <HomeSideComponent />
        </div>
        <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12 " style={{ backgroundColor: "#F6F7FB", overflowX: "hidden" }}>
          <div className="text-end m-2" >
            <span className="right-content lh-1" style={{ fontSize: "13px" }}>New to Smartstay account?</span>
            <button style={{ fontSize: "13px", padding: "2px", backgroundColor: "white", color: "#007FFF", borderRadius: "30px", fontWeight: "bold", borderColor: "#2C77EC", width: "150px", height: "30px" }} type="button" class="btn btn-outline-primary createbutton ms-2" onClick={() => handleCreateAccount()}>Create an Account</button>
          </div>
          <div className="d-flex justify-content-center" id="Welcome" style={{ fontSize: "18px", paddingTop: "100px", fontWeight: "600" }}><strong>Welcome at Smartstay</strong><img src={Hai} width="30" height="30" alt='Hai' /></div>
          <div className="d-flex justify-content-center pt-1"><p style={{ fontSize: "13px", color: "gray" }}>We need a few basic details to consider your profile</p></div>
          <div className="row d-flex justify-content-center">
            <div className="col-md-7 col-sm-7 col-xs-7 right-side-form">
              <div>{state.login.errorMessage?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorMessage}</label> : null}</div>
              <Form className="Form">
                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Email</b></Form.Label>
                <InputGroup className="mb-3" size="lg" style={{ color: "#D9D9D9" }} >
                  <Form.Control
                    placeholder="Enter Email"
                    aria-label="Recipient's username"
                    className='border border-0 custom-input'
                    aria-describedby="basic-addon2"
                    autoFocus
                    disabled={showOtpVerification}
                    value={email_Id} onChange={(e) => handleEmailChange(e)}
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
                    <img src={Login} height="13" width="13" alt='Login' />
                  </InputGroup.Text>
                </InputGroup>

                <div>{state.login.errorEmail?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorEmail}</label> : null}</div>


                <Form.Label style={{ color: "black", fontSize: "12px", fontWeight: "530" }}><b>Password</b></Form.Label>
                <InputGroup className="mb-3" size="lg">
                  <Form.Control type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Password"
                    aria-label="Recipient's username"
                    className='border border-0 custom-input'
                    disabled={showOtpVerification}
                    aria-describedby="basic-addon2" style={{
                      borderRadius: "2px", fontSize: "12px", fontWeight: "530", color: "gray",
                      '::placeholder': { color: "gray", fontSize: 12 }

                    }}
                    value={password} onChange={(e) => handlePasswordChange(e)}
                  />

                  <InputGroup.Text id="basic-addon2" style={{ backgroundColor: "white", border: 'none', borderRadius: "2px" }}>
                    <img src={showPassword ? Eye : eyeClosed} height="13" width="13" alt='Eye' onClick={togglePasswordVisibility} />
                  </InputGroup.Text>
                </InputGroup>

                <div>{state.login.errorPassword?.length > 0 ? <label style={{ color: "red", fontSize: 12 }}>{state.login.errorPassword}</label> : null}</div>


                <div className="mb-3 d-flex justify-content-between" >
                  <Form.Group controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Remember me"
                      value={checked}
                      onChange={(e) => handleCheckboxChange(e)}
                      style={{ fontSize: "11px", fontWeight: 700 }} />
                  </Form.Group>
                  <Form.Label style={{ color: "#007FFF", fontSize: "11px", cursor: "pointer" }} onClick={() => handleForgetPassword()} ><b>Forgot Password?</b></Form.Label>
                </div>
              </Form>
              <div className="d-flex justify-content-center pt-2">
                <Button type="" className="btn" style={{ fontWeight: 600, width: "200px", fontSize: "12px", backgroundColor: "#2F74EB", color: "white" }} onClick={() => handleLogin()}>
                  LOGIN
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

          {/* {showOtpVerification && <>
          <div className='row d-flex justify-content-center'>

                    <div className='col-lg-7'>
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
                   
                    <div class="d-flex justify-content-end w-100 gap-5 p-3">
                      <div>
                        <label  className="button-hover " style={{ fontSize: 12, backgroundColor: "", color: "#5290fa", borderColor: "#34A853" }}>
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


                  </div>
                          </>}
         */}
          <OtpVerificationModal show={showOtpVerification} handleClose={handleCloseModal} />

        </div>
      </div>
    </div>
  );
};

export default MyComponent;


/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';
import OtpVerificationModal from '../Pages/OtpVerificationModal';
import Cookies from 'universal-cookie';
import Loginimage from '../Assets/Images/new_login.png';
import Logo from '../Assets/Images/New_images/Group.png';
import { Eye, EyeSlash } from 'iconsax-react';
import { MdError } from "react-icons/md";


const MyComponent = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let navigate = useNavigate();
  const LandingNavigates = useNavigate();
  const [email_Id, setemail_Id] = useState('')
  const [password, setpassword] = useState('')
  const [showPassword, setShowpassword] = useState(false)
  const [checked, setChecked] = useState(false)
  const [showOtpVerification, setShowOtpVerification] = useState(false)
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false)

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
    setemail_Id(e.target.value.toLowerCase())
    setEmailError('')
  }

  const handlePasswordChange = (e) => {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' })
    setpassword(e.target.value)
    setPasswordError('')
  }



  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  }



  const handleLogoClicks = () => {
    LandingNavigates("/All_Landing_pages");
  };





  const handleCloseModal = () => {
    dispatch({ type: 'CLEAR_ERROR_OTP_CODE' })
    setShowOtpVerification(false);
  };





  const handleLogin = () => {
    dispatch({ type: 'CLEAR_EMAIL_ERROR' });
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' })
    setEmailError('');
    setPasswordError('');

    if (!email_Id && !password) {
      setEmailError('Please Enter Email ID');
      setPasswordError('Please Enter Password');
      return
    } else if (!email_Id) {
      setEmailError('Please Enter Email ID');
      return
    } else if (!password) {
      setPasswordError('Please Enter Password');
      return
    }
    if (email_Id && password) {
      dispatch({ type: 'LOGININFO', payload: { email_Id: email_Id, password: password } });
      setLoading(true)
    }
  };


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });

  useEffect(() => {
    if (state.login?.otpSuccessStatusCode === 203) {
      setShowOtpVerification(true)
      setLoading(false)
    }
    setTimeout(() => {
      dispatch({ type: 'CLEAR_OTP_STATUSCODE' })
    }, 100)

  }, [state.login.otpSuccessStatusCode])




  useEffect(() => {
    if (state.login.statusCode === 200) {
      setLoading(false)
      dispatch({ type: 'LOGIN-SUCCESS' });
      const token = state.login.JWTtoken
      const cookies = new Cookies()
      cookies.set('token', token, { path: '/' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUSCODE' });
      }, 100);
    }

  }, [state.login.statusCode]);

  useEffect(() => {
    if (state.login.errorEmail || state.login.errorPassword) {
      setLoading(false)
    }
  }
    , [state.login.errorEmail, state.login.errorPassword])


  return (

    <div className='container login_page1 h-100'>
      <div className='row h-100 align-items-center p-3 mt-md-4 pt-md-4 w-100 fade-in'>
        <div className='col-lg-6 col-md-6 col-sm-12' style={{ position: "relative" }}>
          <div className="d-flex gap-1 mb-1" >

            <img src={Logo} alt='logo' style={{ height: 25, width: 25, cursor: "pointer" }} onClick={handleLogoClicks} />
            <div><label style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 800, fontFamily: "Gilroy", cursor: "pointer" }} onClick={handleLogoClicks} >
              Smartstay</label></div>
          </div>
          <div className='mb-3 mt-2' >
            <h1 style={{ fontFamily: "Gilroy", fontWeight: 600, color: 'rgba(34, 34, 34, 1)', fontSize: '32px' }}>Welcome back!</h1>
          </div>
          <div>
            <p className='p_font'>Enter your details below to get onto your SmartStay account.</p>
          </div>
          <div className='mt-5'>
            <Form className="Form p-0">
              <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Email ID</Form.Label>
              <Form.Control
                placeholder="Enter Email ID"
                aria-label="Recipient's username"
                className='mb-1'
                aria-describedby="basic-addon2"
                style={{ boxShadow: "none", border: "1px solid rgba(217, 217, 217, 1)", fontSize: 16, fontWeight: email_Id ? 600 : 500, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
                autoFocus
                size="lg"
                disabled={showOtpVerification}
                value={email_Id} onChange={(e) => handleEmailChange(e)}

              />

              {emailError && <div className='d-flex p-1'>
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <div style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>{emailError}</div>
              </div>
              }


              <div className="mb-1 p-1" >{state.login.errorEmail ?
                <div className='d-flex p-1 '>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.login.errorEmail}</label> </div> : null}</div>



              <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  size="lg"
                  className='mb-1'
                  value={password} onChange={(e) => handlePasswordChange(e)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  disabled={showOtpVerification}
                  style={{
                    position: "relative",
                    boxShadow: "none",
                    border: "1px solid rgba(217, 217, 217, 1)",
                    fontSize: 16,
                    fontWeight: password ? 600 : 500,
                    color: "rgba(34, 34, 34, 1)",
                    fontFamily: "Gilroy",
                    borderRight: "none"
                  }}
                />
                <InputGroup.Text className='mb-1' onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(217, 217, 217, 1)", cursor: "pointer", borderLeft: "none" }}>
                  {showPassword ? (
                    <Eye size="20" color="rgba(30, 69, 225, 1)" />
                  ) : (

                    <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                  )}
                </InputGroup.Text>

              </InputGroup>



              {passwordError && (
                <div className="d-flex align-items-center p-1">
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                    {passwordError}
                  </label>
                </div>
              )}

              <div className="mb-1 p-1"> {state.login.errorPassword ? <div className='d-flex align-items-center p-1'>
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.login.errorPassword}</label>
              </div>
                : null}</div>


              <div className="mb-3 d-flex justify-content-between mt-3" >
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Stay signed in"
                    value={checked}
                    onChange={(e) => handleCheckboxChange(e)}
                    style={{ fontSize: "14px", fontWeight: 500, fontFamily: 'Gilroy' }} />
                </Form.Group>
                <Form.Label className='forgot_button create-account-hover' onClick={() => handleForgetPassword()} >Forgot Password?</Form.Label>
              </div>
            </Form>

            <div className="d-flex justify-content-center pt-2">
              <Button type="button" className="btn w-100" style={{ height: '42px', fontWeight: 600, fontSize: "16px", borderRadius: '10px', backgroundColor: "rgba(30, 69, 225, 1)", color: "rgba(255, 255, 255, 1)", fontFamily: "Montserrat" }} onClick={() => handleLogin()}>
                Sign in
              </Button>
            </div>
          </div>


          {loading && <div
            style={{
              position: 'absolute',
              top: 120,
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




        </div>
        <div className='col-lg-6 col-md-6 col-sm-12 mt-md-3'>
          <div className='image_div mt-5'>
            <img src={Loginimage} className='responsive-image' alt='Hai' />
          </div>
        </div>
        <div className='d-flex mt-3 gap-1'>
          <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 16 }}>
            Don&apos;t have an account?
          </p><span className="create-account-hover" style={{ color: 'rgba(30, 69, 225, 1)', fontWeight: 600, fontSize: '16px', fontFamily: 'Montserrat', cursor: "pointer" }} onClick={handleCreateAccount}>Create an account</span>
        </div>

      </div>


      <OtpVerificationModal show={showOtpVerification} handleClose={handleCloseModal} Email_Id={email_Id} checked={checked} />

    </div>


  );
};

export default MyComponent;


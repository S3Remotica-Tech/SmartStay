import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Appicon from "../Assets/Images/Logo-color.png";
import Login from "../Assets/Images/new icon/login-user.png";
// import Eye from "../Assets/Images/new icon/eye.png";
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';
import eyeClosed from '../Assets/Images/Show_password.png';
import HomeSideComponent from "./HomeSideContent";
import CryptoJS from "crypto-js";
import OtpVerificationModal from '../Pages/OtpVerificationModal';
import Cookies from 'universal-cookie';
import Loginimage from '../Assets/Images/new_login.png';
import Logo from '../Assets/Images/New_images/Group.png';
import { Eye, EyeSlash } from 'iconsax-react';
import { Alert } from 'react-bootstrap';
import { MdError } from "react-icons/md";


const MyComponent = () => {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let navigate = useNavigate();

  const [email_Id, setemail_Id] = useState('')
  const [password, setpassword] = useState('')
  const [rolePermission,setRolePermission]=useState("")
  const [permissionError,setPermissionError]=useState("")

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
    setemail_Id(e.target.value.toLowerCase())
    setEmailError('')
  }

  const handlePasswordChange = (e) => {
    dispatch({ type: 'CLEAR_PASSWORD_ERROR' })
    setpassword(e.target.value)
    setPasswordError('')
  }

  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = (e) => {
    setChecked(e.target.checked);
  }


  const [showOtpVerification, setShowOtpVerification] = useState(false)



  useEffect(() => {
    if (state.login?.otpSuccessStatusCode == 203) {
      setShowOtpVerification(true)
    }
    setTimeout(() => {
      dispatch({ type: 'CLEAR_OTP_STATUSCODE' })
    }, 100)

  }, [state.login.otpSuccessStatusCode])


useEffect(()=>{
  setRolePermission(state.createAccount.accountList)
},[state.createAccount.accountList])

useEffect(()=>{
if(rolePermission.is_owner != 1){
  setPermissionError('')
}
else{
  setPermissionError('Permission Denied')
}
},[])




  useEffect(() => {
    if (state.login.statusCode === 200) {


        dispatch({ type: 'LOGIN-SUCCESS' });

      const token = state.login.JWTtoken
      const cookies = new Cookies()
      cookies.set('token', token, { path: '/' });
      const tokenCookies = cookies.get('token');


      //  dispatch({ type: 'ACCOUNTDETAILS'})



      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUSCODE' });
      }, 100);

    }

  }, [state.login.statusCode]);










  const handleCloseModal = () => {
    setShowOtpVerification(false);
  };


  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  const handleLogin = () => {


    let hasError = false;

    setEmailError('');
    setPasswordError('');

    if (!email_Id && !password) {
      setEmailError('Please enter email id');
      setPasswordError('Please enter password');
      return
      hasError = true;
    } else if (!email_Id) {
      setEmailError('Please enter email id');
      hasError = true;
      return
    } else if (!password) {
      setPasswordError('Please enter password');
      hasError = true;
      return
    }


    if (email_Id && password) {
      dispatch({ type: 'LOGININFO', payload: { email_Id: email_Id, password: password } });
    }






    // if (!email_Id && !password) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Error',
    //         text: 'Enter Email id and Password',
    //                });
    // } else if (!email_Id) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Error',
    //         text: 'Enter Email id',
    //                });
    // } else if (!password) {
    //     Swal.fire({
    //         icon: 'warning',
    //         title: 'Error',
    //         text: 'Enter Password',
    //             });
    // } else {
    //     dispatch({ type: 'LOGININFO', payload: { email_Id: email_Id, password: password } });
    // }
  };


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries, appearOnScrool) {
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


  const LandingNavigates = useNavigate();

  const handleLogoClicks = () => {
    LandingNavigates("/All_Landing_pages");
  };
  return (

    <div className='container login_page1 h-100'>
      <div className='row h-100 align-items-center p-3 mt-md-4 pt-md-4 w-100 fade-in'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <div className="d-flex gap-1 mb-1" >

            <img src={Logo} style={{ height: 25, width: 25 ,cursor:"pointer"}}  onClick={handleLogoClicks}  />
            <div><label style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 800, fontFamily: "Gilroy",cursor:"pointer" }}  onClick={handleLogoClicks} >
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
              {/* <InputGroup className="mb-3" size="lg" style={{ color: "#D9D9D9" }} > */}
              <Form.Control
                placeholder="Enter Email"
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
                <MdError style={{ color: "red", marginRight: '5px'}} />
                <div style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>{emailError}</div>
              </div>
              }


              <div className="mb-1 p-1" >{state.login.errorEmail ? 
                <div className='d-flex p-1 '>
                <MdError style={{ color: "red",marginRight: '5px' }} />
                <label style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.login.errorEmail}</label> </div> : null}</div>



              <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  size="lg"
                  className='mb-1'
                  value={password} onChange={(e) => handlePasswordChange(e)}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
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
                <InputGroup.Text  className='mb-1' onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(217, 217, 217, 1)", cursor: "pointer", borderLeft: "none" }}>
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
                <MdError style={{ color: "red" , marginRight: '5px'}} />
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
        </div>
        <div className='col-lg-6 col-md-6 col-sm-12 mt-md-3'>
          <div className='image_div mt-5'>
            <img src={Loginimage} className='responsive-image' alt='Hai' />
          </div>
        </div>
        <div className=' d-flex mt-3 gap-1'>
          <p style={{ fontFamily: 'Montserrat', fontWeight: 400, fontSize: 16 }}>Don't have an account? </p><span className="create-account-hover" style={{ color: 'rgba(30, 69, 225, 1)', fontWeight: 600, fontSize: '16px', fontFamily: 'Montserrat', cursor: "pointer" }} onClick={handleCreateAccount}>Create an account</span>
        </div>

      </div>


      <OtpVerificationModal show={showOtpVerification} handleClose={handleCloseModal} Email_Id={email_Id} checked={checked} />

    </div>


  );
};

export default MyComponent;


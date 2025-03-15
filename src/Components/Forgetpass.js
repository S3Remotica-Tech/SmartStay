/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Forgetpass.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Spinner from 'react-bootstrap/Spinner';
import Forgot from '../Assets/Images/New_images/forgot.png'
import Logo from '../Assets/Images/New_images/Group.png'
import { Eye, EyeSlash } from 'iconsax-react';
import ForgotOtp from '../Pages/ForgotOtp'
import { IoIosCheckmark } from "react-icons/io";
// import { ClipLoader } from 'react-spinners';
import { MdError } from "react-icons/md";


function ForgetPasswordPage() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  // const [password, setPassword] = useState();
  // const [showPassword, setShowpassword] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [newPassword, setNewPassword] = useState(false)
  const [showLoader, setShowLoader] = useState('')
  const [showEmailSend, setShowEmailSend] = useState(true)


  let navigate = useNavigate();

  // const togglePasswordVisibility = () => {
  //   setShowpassword(!showPassword);
  // };

  // const handleEmailid = (e) => {
  //   dispatch({ type: 'CLEAR_ERROR' })
  //   setGeneralError('')
  //   setEmail(e.target.value);
  //   setEmailError('')
  //   setSendMailError('')
  // };


  const handleEmailid = (e) => {
    const email = e.target.value.toLowerCase();
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  
    dispatch({ type: 'CLEAR_ERROR' });
    setGeneralError('');
    setEmail(email);
    setSendMailError('');
  
   
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address'); 
    } else {
      setEmailError('');
    }
  };
  
  

  // const handlePassword = (e) => {
  //   setPassword(e.target.value);
  //   const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,100}$/;
  //   const isValidpasswordNo = pattern.test(e.target.value);

  //   if (isValidpasswordNo) {
  //     document.getElementById('passwordError').innerHTML = '';
  //   } else {
  //     document.getElementById('passwordError').innerHTML = 'Invalid password *';
  //   }
  // };




  useEffect(() => {
    if (state.NewPass?.status_codes === 200) {
      navigate("/login-Page")
      setEmail("");
      setPassword("");
      setConfirmPassword('')
      setIsPasswordLongEnough(false)
      setLowerCaseEnough(false)
      setNumericEnough(false)





      if (inputRefs) {
        inputRefs.forEach(ref => {
          if (ref.current) {
            ref.current.value = null;
          }
        });
      }
      // setTimeout(() => {
      //   dispatch({ type: 'REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE' })
      // }, 1000)

      // setTimeout(() => {
      //   dispatch({ type: 'CLEAR_OTP_STATUS_CODE' })
      // }, 2000)

      setShowOtpVerification(false);
      setNewPassword(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NEW_PASSWORD_STATUS_CODE' })
      }, 2000)



    }
  }, [state.NewPass?.status_codes]);


  const [allError, setAllError] = useState('')

  const [confirmationError, setConfirmationError] = useState('')

  // const handlePasswordReset = () => {
  //   // setShowOtpVerification(true)


  //   // if (passwordError) {
  //   //   Swal.fire({
  //   //     icon: 'warning',
  //   //     title: 'Invalid Password',
  //   //     text: passwordError,
  //   //     confirmButtonText: 'Ok'
  //   //   });
  //   //   return;
  //   // }


  //   if (!password && !confirmpassword) {
  //     setAllError('Please Enter  password  and confirm password ')
  //   }



  //   if (password !== confirmpassword) {

  //     setConfirmationError('Please Enter Confirm Password Same as Password')
  //     // Swal.fire({
  //     //   icon: 'warning',
  //     //   title: 'Please Enter Confirm Password Same as Password',
  //     //   confirmButtonText: 'Ok'
  //     // });
  //     // return;
  //   }


  //   if (password && confirmpassword && email) {
  //     dispatch({ type: 'FORGETPAGE', payload: { NewPassword: password, email: email, confirm_password: confirmpassword } });
  //     inputRefs && inputRefs.forEach(ref => {
  //       if (ref.current) {
  //         ref.current.value = null;
  //       }

  //     });

  //   } 
  //   // else {

  //     //   Swal.fire({
  //     //   icon: 'error',
  //     //   title: 'Please Enter All Fields',

  //     // });

  //   // }
  // };


  // useEffect(()=>{
  //   if(!showOtpVerification){
  //     setDisabledButton(false)
  //   }

  // },[showOtpVerification])

  const handlePasswordReset = () => {
    if (!password && !confirmpassword) {
      setAllError('Please Enter password and confirm password ');
      return; 
    }
  
    if (password !== confirmpassword) {
      setConfirmationError('Please Enter Confirm Password Same as Password');
      return;
    }
  
    if (password && confirmpassword && email) {
      dispatch({ 
        type: 'FORGETPAGE', 
        payload: { NewPassword: password, email: email, confirm_password: confirmpassword } 
      });
  
      if (inputRefs) {
        inputRefs.forEach(ref => {
          if (ref.current) {
            ref.current.value = null;
          }
        });
      }
    }
  };
  



  useEffect(() => {
    if (state.NewPass?.statusCode === 200) {
      setShowLoader(false)
      setShowOtpVerification(true);
      // setDisabledButton(true)

      setTimeout(()=>{
        dispatch({ type: 'CLEAR_OTP_STATUS_CODE' })
      },1000)
     
    } 
    // else {
    //   setShowLoader(false)
    //   setShowOtpVerification(false);
    //   setDisabledButton(false)
    // }

  }, [state.NewPass?.statusCode])

  useEffect(() => {
    if (state.NewPass.statusCodeForgotOtp === 200) {
      setNewPassword(true)
      setShowEmailSend(false)
      setShowOtpVerification(false)

      setTimeout(() => {
        dispatch({ type: 'REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE' })
      }, 1000)

    }
    // } else {
    //   setNewPassword(false)
    //   setShowEmailSend(true)

    //   if (inputRefs) {
    //     inputRefs.forEach(ref => {
    //       if (ref.current) {
    //         ref.current.value = null;
    //       }
    //     });
    //   }



    // }
  }, [state.NewPass.statusCodeForgotOtp])

  useEffect(() => {
    if (state.NewPass?.sendEmailStatusCode === 203 || state.NewPass?.EmailErrorStatusCode === 201) {
      setShowLoader(false)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_EMAIL_ERROR' })
        dispatch({ type: 'CLEAR_SEND_EMAIL_ERROR' })
      }, 1000)
    }

  }, [state.NewPass?.sendEmailStatusCode, state.NewPass?.EmailErrorStatusCode])

  const [emailError, setEmailError] = useState('')
  const [generalError, setGeneralError] = useState('')
  const [sendEmailError, setSendMailError] = useState('')

  useEffect(() => {
    if (state.NewPass?.sendEmailStatusCode === 203 || state.NewPass?.EmailErrorStatusCode === 201) {

      setEmailError(state.NewPass?.emailError)
      setSendMailError(state.NewPass?.sendEmailError)


    }
  }, [state.NewPass?.sendEmailStatusCode, state.NewPass?.EmailErrorStatusCode])



  const handleAccountVerification = () => {
    if (!email) {
      setGeneralError('Please Enter Email Address');
      return;
    }
  
    
    if (emailError) {
      // setEmailValidationError('Please fix the email error before proceeding');
      return;
    }
  
  
    dispatch({ type: 'OTPSEND', payload: { email: email } });
    // setShowLoader(true);
  };
  


  const handleLogin = () => {
    setTimeout(() => {
      navigate('/login-Page')
    }, 1000)
  }
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];
  // const handleOtpInputChange = (e, index) => {
  //   if (e.target.value.length === 1 && index < inputRefs.length - 1) {
  //     inputRefs[index + 1].current.focus();
  //   }
  //   const updatedOtpValue = inputRefs.map(ref => ref.current.value).join('');
  //   setOtpValue(updatedOtpValue);
  // };

  // const otpResponse = state.NewPass?.OTP?.response;
  // const otp = otpResponse?.otp


  // const handleOtpVerify = () => {
  //   if (otpValue) {
  //     dispatch({ type: 'OTPVERIFYFORGOTPASSWORD', payload: { Email_Id: email, OTP: otpValue } })
  //   }

  // }

 

  const [password, setPassword] = useState('')
  const [showPassword, setShowpassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };


  // const [passwordError, setPasswordError] = useState([]);
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(null);
  const [isLowerCaseEnough, setLowerCaseEnough] = useState(null);
  const [isNumericEnough, setNumericEnough] = useState(null);

  const [passwordChanged, setPasswordChanged] = useState(false);

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setAllError('')
    setPasswordChanged(true);
    const password = e.target.value;
    let errorMessages = [];


    if (password.length >= 8) {
      setIsPasswordLongEnough(true);
    } else {
      setIsPasswordLongEnough(false);
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
      setLowerCaseEnough(true);
    } else {
      setLowerCaseEnough(false);
    }

    if (/\d/.test(password) && /[@$!%*?&]/.test(password)) {
      setNumericEnough(true);
    } else {
      setNumericEnough(false);
    }


    if (/\s/.test(password)) {
      errorMessages.push('Password cannot contain spaces.');
    } else if (password.length < 8) {
      errorMessages.push('8 characters minimum');
    } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errorMessages.push('One uppercase and lowercase');
    } else if (!/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
      errorMessages.push('Numeric and Special symbols');

    } 
    // setPasswordError(errorMessages);
  };


  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    setAllError('')
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  const handleCloseModal = () => {
    setShowOtpVerification(false);
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
  

  const hanldeBackToLogin = () =>{
    setShowEmailSend(true)
    setNewPassword(false)
    navigate("/All_Landing_pages"); 
    
  }

  const hanldeBackToLoginPassword = () =>{
       setTimeout(()=>{
           setShowEmailSend(true)
      setNewPassword(false)
    },100)
    navigate("/All_Landing_pages"); 
  }
 

  return (

    <div style={{ width: "100%", height: "100vh", fontFamily: "Gilroy", backgroundColor: "" }}>

      {
        showEmailSend && <>
          <div className="ms-5 mb-5">

            <div className="row g-0 coumn-gap-1 row-gap-4 fade-in">
              <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12" style={{ padding: 80 }}>
                <div className="d-flex gap-1 mb-1" style={{curser:"pointer"}} onClick={hanldeBackToLogin}>

                  <img src={Logo} alt='logo' style={{ height: 25, width: 25, cursor:"pointer" }}  />
                  {/* <img src={Icon} style={{width:"100%"}} /> */}
                  <div><label style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 800, fontFamily: "Gilroy", cursor:"pointer" }}>Smartstay</label></div>
                </div>

                <div className="mt-3 mb-1 "><label style={{ fontSize: 32, fontWeight: 600, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}> Forgot Password?</label></div>
                <div className="mt-1 mb-1 "><label style={{ fontSize: 16, fontWeight: 400, color: "rgba(75, 75, 75, 1)", fontFamily: "Montserrat" }}>Enter your email address to recover your account.</label></div>

                <div className="row row-gap-3 ">

                  <div className="col-lg-11 col-md-12 col-xs-12 col-sm-12 " >
                    <Form.Group controlId="formGridEmail" className='mt-4 mb-3'>
                      <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Email ID <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                      <Form.Control size="lg"
                        
                        data-testid='input-email'
                        value={email} onChange={(e) => handleEmailid(e)}
                        type="email" placeholder="Email address" style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: email ? 600 : 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />

                      {/* <div id="emailIDError" style={{ color: "red", fontSize: 12 }}></div> */}
                    </Form.Group>


                    <div className="mb-1 p-1"> {generalError ? <div className='d-flex align-items-center p-1'>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>eneral {generalError}</label>
                    </div>
                      : null}</div>

                    <div className="mb-1 p-1"> {emailError ? <div className='d-flex align-items-center p-1'>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>email {emailError}</label>
                    </div>
                      : null}</div>


                    <div className="mb-1 p-1"> {sendEmailError ? <div className='d-flex align-items-center p-1'>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>send email {sendEmailError}</label>
                    </div>
                      : null}</div>

                  </div>




                  <div className="col-lg-11 col-md-12 col-xs-12 col-sm-12 mt-4 mb-1 d-flex gap-5" >
                    <Button
                      onClick={handleAccountVerification}
                    
                      className="w-100" style={{ border:  "rgba(30, 69, 225, 1)", backgroundColor: "rgba(30, 69, 225, 1)", borderRadius: 12, padding: 10, fontFamily: "Montserrat", height: 50, fontWeight: 600, fontSize: 16 }}>Continue</Button>
                    <div>
                      {showLoader && <Spinner animation="grow" variant="primary" />}


                    </div>
                  </div>

                </div>
                <div className="mt-3 mb-2">
                  <label style={{ fontSize: 14, fontWeight: 400, fontFamily: "Montserrat" }}>Return to your account?<span
                    onClick={() => handleLogin()}
                    className="ms-2 create-account-hover" style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", color: "rgba(30, 69, 225, 1)", cursor: "pointer" }}>Sign in</span> </label>
                </div>

              </div>

              <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 d-flex justify-content-center mt-4" style={{ backgroundColor: "", padding: "60px 80px" }}>
                <div>
                  <img src={Forgot} alt='forget' style={{ height: 460, width: 460 }} />
                </div>

              </div>


            </div>


          </div>
        </>
      }




      {showOtpVerification && <>
        <ForgotOtp show={showOtpVerification} handleClose={handleCloseModal} Email_Id={email} />
      </>}



      {newPassword && <>


        <div className="ms-5 mb-5">

          <div className="row g-0 coumn-gap-1 row-gap-4">
            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12" style={{ padding: 80 }}>
              <div className="d-flex gap-1 mb-1" onClick={hanldeBackToLoginPassword}>

                <img src={Logo} alt='logo' style={{ height: 25, width: 25, cursor: "pointer" }} />
                {/* <img src={Icon} style={{width:"100%"}} /> */}
                <div><label style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 800, fontFamily: "Gilroy" , cursor:"pointer"}}>Smartstay</label></div>
              </div>

              <div className="mt-3 mb-1 "><label style={{ fontSize: 32, fontWeight: 600, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}> Setup your password  </label></div>
              <div className="mt-1 mb-1 "><label style={{ fontSize: 16, fontWeight: 400, color: "rgba(75, 75, 75, 1)", fontFamily: "Montserrat" }}>Fill in the details below to create your publisher account</label></div>

              <div className="row row-gap-3 mt-4">

                <div className="col-lg-11 col-md-12 col-xs-12 col-sm-12">
                  <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Password <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      size="lg"
                      value={password}
                      onChange={handlePassword}
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      style={{
                        position: "relative",
                        boxShadow: "none",
                        border: "1px solid rgba(224, 236, 255, 1)",
                        fontSize: 16,
                        fontWeight: password ? 600 : 500,
                        color: "rgba(34, 34, 34, 1)",
                        fontFamily: "Gilroy",
                        borderRight: "none"
                      }}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(224, 236, 255, 1)", cursor: "pointer" }}>
                      {showPassword ? (
                        <Eye size="20" color="rgba(30, 69, 225, 1)" />
                      ) : (

                        <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                      )}
                    </InputGroup.Text>

                  </InputGroup>
                </div>

                <div className="col-lg-11 col-md-12 col-xs-12 col-sm-12">
                  <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Confirm Password <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      size="lg"
                      value={confirmpassword}
                      onChange={handleConfirmPassword}
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Password"
                      style={{
                        position: "relative",
                        boxShadow: "none",
                        border: "1px solid rgba(224, 236, 255, 1)",
                        fontSize: 16,
                        fontWeight: confirmpassword ? 600 : 500,
                        color: "rgba(34, 34, 34, 1)",
                        fontFamily: "Gilroy",
                        borderRight: "none"
                      }}
                    />
                    <InputGroup.Text onClick={toggleConfirmPasswordVisibility} style={{ background: "transparent", border: "1px solid rgba(224, 236, 255, 1)", cursor: "pointer" }}>
                      {showConfirmPassword ? (
                        <Eye size="20" color="rgba(30, 69, 225, 1)" />
                      ) : (

                        <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                      )}
                    </InputGroup.Text>

                  </InputGroup>
                </div>
                {/* <div>
                  {isPasswordLongEnough ?
                      <div>

                        <IoIosCheckmark style={{ color: "rgba(3, 160, 0, 1)", height: 30, width: 30 }} />
                        <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)" }}>8 characters minimum</label>

                      </div>
                    
                    :
                    
                    <div>

<MdError style={{ color: "red",  }} />
                    <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "red" }}>8 characters minimum</label>

                  </div>
                    
                    
                    }

                  {isLowerCaseEnough &&
                    <div>
                      <IoIosCheckmark style={{ color: "rgba(3, 160, 0, 1)", height: 30, width: 30 }} />
                      <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)" }}>One uppercase and lowercase</label>

                    </div>}
                  {

                    isNumericEnough &&
                    <div>
                      <IoIosCheckmark style={{ color: "rgba(3, 160, 0, 1)", height: 30, width: 30 }} />
                      <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)" }}>Numeric and Special symbols</label>
                    </div>
                  }
                </div> */}

{passwordChanged && (
                <div>

                  {isPasswordLongEnough ? (
                    <div className="d-flex align-items-center gap-2">
                      <IoIosCheckmark
                        style={{ color: "rgba(3, 160, 0, 1)", height: 30, width: 30 }}
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          color: "rgba(34, 34, 34, 1)"
                        }}
                      >
                        8 characters minimum
                      </label>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2">
                      <MdError style={{ color: "red" }} />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          color: "red"
                        }}
                      >
                        8 characters minimum
                      </label>
                    </div>
                  )}


                  {isLowerCaseEnough ? (
                    <div className="d-flex align-items-center gap-2">
                      <IoIosCheckmark
                        style={{ color: "rgba(3, 160, 0, 1)", height: 30, width: 30 }}
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          color: "rgba(34, 34, 34, 1)"
                        }}
                      >
                        One uppercase and lowercase
                      </label>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2">
                      <MdError style={{ color: "red", }} />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          color: "red"
                        }}
                      >
                        One uppercase and lowercase
                      </label>
                    </div>
                  )}


                  {isNumericEnough ? (
                    <div className="d-flex align-items-center gap-2">
                      <IoIosCheckmark
                        style={{ color: "rgba(3, 160, 0, 1)", height: 30, width: 30 }}
                      />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          color: "rgba(34, 34, 34, 1)"
                        }}
                      >
                        Numeric and Special symbols
                      </label>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2">
                      <MdError style={{ color: "red" }} />
                      <label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          color: "red"
                        }}
                      >
                        Numeric and Special symbols
                      </label>
                    </div>
                  )}
                </div>

                )}



                {/* {passwordError && passwordError.length > 0 && (
                    <div className="d-flex flex-column  pt-2">
                      {passwordError.map((error, index) => (
                        <div key={index} className="d-flex align-items-center gap-2">
                          <div>

                          <MdError style={{ color: "red",  }} />
                          </div>
                          <div>
                          <label
                            className="mb-0"
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              listStyleType:"none"
                            }}
                          >
                            {error}
                          </label>
                          </div>
                        </div>
                      ))}
                    </div>
)} */}





                {allError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: '5px' }} />
                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                      {allError}
                    </label>
                  </div>
                )}

                {confirmationError ? <div className='d-flex align-items-center p-1'>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{confirmationError}</label>
                </div>
                  : null}

                <div className="col-lg-11 col-md-12 col-xs-12 col-sm-12 mt-2 mb-1" >
                  <Button
                    onClick={handlePasswordReset}
                    className="w-100" style={{ backgroundColor: "rgba(30, 69, 225, 1)", borderRadius: 12, padding: 10, fontFamily: "Montserrat", height: 50, fontWeight: 600, fontSize: 16 }}>Continue</Button>
                </div>

              </div>

            </div>
            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 d-flex justify-content-center mt-4" style={{ backgroundColor: "", padding: "60px 80px" }}>
              <div>
                <img src={Forgot} alt='forget' style={{ height: 460, width: 460 }} />
              </div>

            </div>


          </div>
        </div>

      </>
      }


    </div>




  );
};

export default ForgetPasswordPage;



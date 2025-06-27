/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './CreateAccount.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Logo from '../Assets/Images/New_images/Group.png'
import CreateAccount from '../Assets/Images/New_images/createAccount.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'iconsax-react';
import { MdError } from "react-icons/md";




function CreateAccountPage() {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  let navigate = useNavigate();
  const [phoneNo, setPhoneNo] = useState('');
  const [emailID, setEmailID] = useState('');
  const [password, setPassword] = useState('')
  const [showPassword, setShowpassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState('')
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)

  const [passwordError, setPasswordError] = useState([]);

  const countryCode = '91';






  const handleFirstName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(value)) {
      return;
    }

    setFirstNameError('')

    if (value === "") {
      setFirstName(value);
      return;
    }


    if (value.trim() !== "") {
      setFirstName(value);
    }
  };


  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(value)) {
      return;
    }
    if (value === "") {
      setLastName(value);
      return;
    }


    if (value.trim() !== "") {
      setLastName(value);
    }
  };



  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };



  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value)
    setConfirmPasswordError('');
    dispatch({ type: 'CLEAR_PASSWORD_DOESNT_ERROR' })
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }




  useEffect(() => {
    if (state.createAccount.statusCodeCreateAccount === 200) {

      setFirstName('')
      setLastName('')
      setPhoneNo('');
      setEmailID('');
      setPassword('');
      setConfirmPassword('')



      setTimeout(() => {
        setLoading(false)
        navigate('/login-Page');
      }, 1000);

      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_CREATE_ACCOUNT' })
      }, 2000)

    }
  }, [state.createAccount.statusCodeCreateAccount]);


  const handlePhoneNo = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhoneNo(input);
    setPhoneError('');

    dispatch({ type: 'CLEAR_MOBILE_ERROR' });
    dispatch({ type: 'CLEAR_EMAIL_MOBILE_ERROR' });


    const pattern = /^\d{10}$/;
    if (input.length > 0 && !pattern.test(input)) {
      setPhoneError('Invalid Mobile Number');
    } else {
      setPhoneError('');
    }
  };


  const handleEmailID = (e) => {
    const emailInput = e.target.value.toLowerCase();
    setEmailID(emailInput);

    dispatch({ type: 'CLEAR_EMAIL_ERROR' });
    dispatch({ type: 'CLEAR_EMAIL_MOBILE_ERROR' });

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isValidEmail = emailRegex.test(emailInput);

    if (emailInput && !isValidEmail) {
      setEmailError('Invalid Email ID');
    } else {
      setEmailError('');
    }
  };





  const handlePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
    setPasswordErrors('');
    dispatch({ type: 'CLEAR_PASSWORD_DOESNT_ERROR' });

    let errorMessages = [];

    if (/\s/.test(password)) {
      errorMessages.push('Password cannot contain spaces.');
    }
    if (password.length < 8) {
      errorMessages.push('8 characters minimum');
    }
    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errorMessages.push('One uppercase and lowercase');
    }
    if (!/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
      errorMessages.push('Numeric and Special symbols');
    }

    setPasswordError(errorMessages);
  };


  const handleLoginPage = () => {
    navigate('/login-Page')
  }

  const [firstNameError, setFirstNameError] = useState();
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('')
  const [passwordErrors, setPasswordErrors] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [allError, setAllError] = useState('')
  const [countryCodeError, setCountryCodeError] = useState('')
  const [bothPasswordError, setBothPasswordError] = useState('')






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

  const navigates = useNavigate();

  const handleLogoClick = () => {
    navigates("/All_Landing_pages");
  };
  const handleCreateAccount = async () => {
    dispatch({ type: 'CLEAR_PASSWORD_DOESNT_ERROR' });
    dispatch({ type: 'CLEAR_MOBILE_ERROR' });
    dispatch({ type: 'CLEAR_EMAIL_MOBILE_ERROR' });
    dispatch({ type: 'CLEAR_EMAIL_ERROR' });


    let hasError = false;

    if (!firstName && !phoneNo && !emailID && !password && !confirmpassword && !countryCode) {
      setAllError('Please enter all mandatory fields');
      hasError = true;
    }

    if (!firstName) {
      setFirstNameError('Please Enter First Name');
      hasError = true;
    }

    if (!emailID) {
      setEmailError('Please Enter Email ID');
      hasError = true;
    } else {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
      if (!emailRegex.test(emailID)) {
        setEmailError('Please Enter Valid Email ID');
        hasError = true;
      }
    }

    if (!countryCode) {
      setCountryCodeError('Please Select Country Code');
      hasError = true;
    }

    if (!phoneNo) {
      setPhoneError('Please Enter Mobile No');
      hasError = true;
    } else {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phoneNo)) {
        setPhoneError('Please Enter Valid Mobile Number');
        hasError = true;
      }
    }


    if (!password) {
      setPasswordErrors('Please Enter Password');
      hasError = true;
    } else if (Array.isArray(passwordError) && passwordError.length > 0) {
      hasError = true;
    }

    if (!confirmpassword) {
      setConfirmPasswordError('Please Enter Confirm Password');
      hasError = true;
    }

    if (password && confirmpassword && password !== confirmpassword) {
      setBothPasswordError('Password and Confirm Password do Not Match');
      hasError = true;
    }

    if (hasError) return;

    const mobileNumber = `${countryCode}${phoneNo}`;

    dispatch({
      type: 'CREATE_ACCOUNT_PAGE',
      payload: {
        first_name: firstName,
        last_name: lastName,
        mobileNo: mobileNumber,
        emailId: emailID,
        password: password,
        confirm_password: confirmpassword
      }
    });
    setLoading(true)
  };


  useEffect(() => {
    if (state.createAccount?.emailError || state.createAccount?.mobileError || state.createAccount?.passwordDoesnotMatchError || state.createAccount?.email_mobile_Error) {
      setLoading(false)
    }

  }, [state.createAccount?.emailError, state.createAccount?.mobileError, state.createAccount?.passwordDoesnotMatchError, state.createAccount?.email_mobile_Error])







  return (
    <>

      <div data-testid='create-account' style={{ width: "100%", fontFamily: "Gilroy", backgroundColor: "" }}>

        <div className=" ms-5">

          <div className="row g-0 coumn-gap-1 row-gap-4 fade-in">
            <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12 mt-4 " style={{ position: "relative" }}>



              {loading && (
                <div
                  style={{
                    position: 'absolute',
                    top: "50%",
                    left: "50%",
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
                </div>
              )}






              <div className="d-flex gap-1 mb-1" style={{ curser: "pointer" }}>

                <img src={Logo} alt="Company Logo" style={{ height: 25, width: 25, cursor: "pointer" }} onClick={handleLogoClick} />

                <div><label style={{ color: "rgba(30, 69, 225, 1)", fontWeight: 800, fontFamily: "Gilroy" }} onClick={handleLogoClick}>
                  Smartstay</label></div>
              </div>

              <div className="mt-3 mb-1 "><label style={{ fontSize: 32, fontWeight: 600, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}> Create your free account</label></div>
              <div className="mt-1 mb-1 "><label style={{ fontSize: 16, fontWeight: 400, color: "rgba(75, 75, 75, 1)", fontFamily: "Montserrat" }}>Enter your details below to find your stay smartly</label></div>

              <div className="row row-gap-3 mt-5 me-2">
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12" data-testid='fname-container'>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>First Name <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                    <Form.Control
                      value={firstName}
                      data-testid='first-name'
                      onChange={(e) => { handleFirstName(e) }}
                      size="lg" type="text" placeholder="Enter First Name" style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: firstName ? 600 : 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />
                  </Form.Group>

                  {firstNameError && (
                    <div className="d-flex align-items-center p-1" data-testid='first-name-error'>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {firstNameError}
                      </label>
                    </div>
                  )}




                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Last Name <span style={{ color: 'transparent', fontSize: '20px' }}>*</span></Form.Label>
                    <Form.Control
                      data-testid='last-name'
                      value={lastName}
                      onChange={(e) => { handleLastName(e) }}
                      size="lg" type="text" placeholder="Enter Last Name" style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: lastName ? 600 : 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />
                  </Form.Group>
                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Email ID <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                    <Form.Control size="lg"
                      data-testid='emailid'
                      autoComplete="new-mail"
                      autoCorrect="off"
                      value={emailID} onChange={(e) => { handleEmailID(e) }}
                      type="email" placeholder="Enter Email ID" style={{ boxShadow: "none", border: "1px solid rgba(224, 236, 255, 1)", fontSize: 16, fontWeight: emailID ? 600 : 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }} />

                  </Form.Group>

                  {emailError && (
                    <div className="d-flex align-items-center p-1">
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {emailError}
                      </label>
                    </div>
                  )}


                  {state.createAccount?.emailError ? <div className='d-flex align-items-center p-1'>
                    <MdError style={{ color: "red", marginRight: '5px' }} />
                    <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount.emailError}</label>
                  </div>
                    : null}
                </div>

                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500
                    }}>
                      Mobile Number <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                    </Form.Label>

                    <InputGroup >
                      <Form.Select
                        value={countryCode}
                        id="vendor-select-create_account"
                        style={{
                          border: "1px solid rgba(224, 236, 255, 1)",
                          borderRadius: "8px 0 0 8px",
                          height: 43,
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: countryCode ? 600 : 500,
                          boxShadow: "none",
                          backgroundColor: "#fff",
                          maxWidth: 90
                        }}
                      >
                        <option>+{countryCode}</option>


                      </Form.Select>
                      <Form.Control
                        data-testid='mobile'
                        value={phoneNo}
                        onChange={(e) => { handlePhoneNo(e) }}
                        type="text"
                        placeholder="9876543210"
                        maxLength={10}
                        style={{
                          fontSize: 16,
                          color: "#4B4B4B",
                          fontFamily: "Gilroy",
                          fontWeight: phoneNo ? 600 : 500,
                          boxShadow: "none",
                          borderLeft: "unset",
                          borderRight: "1px solid rgba(224, 236, 255, 1)",
                          borderTop: "1px solid rgba(224, 236, 255, 1)",
                          borderBottom: "1px solid rgba(224, 236, 255, 1)",
                          borderRadius: "0 8px 8px 0",
                        }}
                      />
                    </InputGroup>
                  </Form.Group>

                  {phoneError && (
                    <div className="d-flex align-items-center p-1">
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {phoneError}
                      </label>
                    </div>
                  )}



                  {countryCodeError && (
                    <div className="d-flex align-items-center p-1">
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {countryCodeError}
                      </label>
                    </div>
                  )}


                  {state.createAccount?.mobileError ? <div className='d-flex align-items-center p-1'>
                    <MdError style={{ color: "red", marginRight: '5px' }} />
                    <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount.mobileError}</label>
                  </div>
                    : null}




                </div>
                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Password <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                  <InputGroup >
                    <Form.Control
                      data-testid='password'
                      size="lg"
                      autoComplete="new-password"
                      autoCorrect="off"
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


                  {passwordErrors && (
                    <div data-testid='password-error' className="d-flex align-items-center p-1">
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {passwordErrors}
                      </label>
                    </div>
                  )}








                  {passwordError && passwordError.length > 0 && (
                    <div data-testid='password-error-container' className="d-flex flex-column  pt-2">
                      {passwordError.map((error, index) => (
                        <div key={index} className="d-flex align-items-center gap-2">
                          <div>

                            <MdError style={{ color: "red", }} />
                          </div>
                          <div>
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                listStyleType: "none"
                              }}
                            >
                              {error}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}




                </div>

                <div className="col-lg-6 col-md-6 col-xs-12 col-sm-12">
                  <Form.Label style={{ fontSize: 14, fontWeight: 500, color: "rgba(34, 34, 34, 1)", fontFamily: "Gilroy" }}>Confirm Password <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                  <InputGroup>
                    <Form.Control
                      data-testid='confirm-password'
                      size="lg"
                      autoComplete="new-password"
                      autoCorrect="off"
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

                  {confirmPasswordError && (
                    <div className="d-flex align-items-center p-1">
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {confirmPasswordError}
                      </label>
                    </div>
                  )}

                </div>




                {allError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: '5px' }} />
                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                      {allError}
                    </label>
                  </div>
                )}



                {bothPasswordError && (
                  <div className="d-flex align-items-center p-1">
                    <MdError style={{ color: "red", marginRight: '5px' }} />
                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                      {bothPasswordError}
                    </label>
                  </div>
                )}






                {state.createAccount?.passwordDoesnotMatchError ? <div className='d-flex align-items-center p-1'>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount.passwordDoesnotMatchError}</label>
                </div>
                  : null}


                {state.createAccount?.email_mobile_Error ? <div className='d-flex align-items-center p-1'>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount.email_mobile_Error}</label>
                </div>
                  : null}


                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 mt-4 mb-1" >
                  <Button data-testid='create-account-btn' onClick={handleCreateAccount} className="w-100" style={{ backgroundColor: "rgba(30, 69, 225, 1)", borderRadius: 12, padding: 10, fontFamily: "Montserrat", height: 50, fontWeight: 600 }}>Create account</Button>
                </div>

              </div>
              <div className="mt-3 mb-2">
                <label style={{ fontSize: 14, fontWeight: 400, fontFamily: "Montserrat" }}>Already have an account?<span onClick={() => handleLoginPage()} className="ms-2 create-account-hover" style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", color: "rgba(30, 69, 225, 1)", cursor: "pointer" }}>Sign in</span> </label>
              </div>

            </div>


            <div className='col-lg-6 col-md-6 col-sm-12 '>
              <div className='image_div mt-5'>
                <img src={CreateAccount} alt="create" className='responsive-image' />
              </div>

            </div>



          </div>








        </div>








      </div>




    </>
  )
}

export default CreateAccountPage;
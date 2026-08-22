/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import Logo from '../Assets/Images/New_images/Group.png'
import CreateAccount from '../Assets/Images/New_images/createAccount.png'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { InputGroup } from 'react-bootstrap';
import { Eye, EyeSlash } from 'iconsax-react';

import ErrorMessage from '../Components/ErrorMessage'
import Cookies from 'universal-cookie';


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
    setBothPasswordError("")
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }




  useEffect(() => {
    if (state.createAccount.statusCodeCreateAccount === 201) {

      setFirstName('')
      setLastName('')
      setPhoneNo('');
      setEmailID('');
      setPassword('');
      setConfirmPassword('')



      setTimeout(() => {
        setLoading(false)
        navigate('/hostel-management-login');
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
      setPhoneError('Please Enter Valid Mobile Number');
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
      setEmailError('Please Enter Valid Email ID');
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
    setBothPasswordError("")
  };


  const handleLoginPage = () => {
    navigate('/hostel-management-login')
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
    const cookies = new Cookies()
    cookies.remove('v2-token', { path: '/' });
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
      setPhoneError("Please Enter Mobile No");
      hasError = true;
    } else {
      const phonePattern = /^(?!0{10})[1-9][0-9]{9}$/;
      if (!phonePattern.test(phoneNo)) {
        setPhoneError("Please Enter Valid Mobile Number");
        hasError = true;
      } else {
        setPhoneError("");
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

    // const mobileNumber = `${countryCode}${phoneNo}`;

    dispatch({
      type: 'CREATE_ACCOUNT_PAGE',
      payload: {
        firstName: firstName,
        lastName: lastName,
        mobile: phoneNo,
        mailId: emailID,
        password: password,
        confirmPassword: confirmpassword
      }
    });
    setLoading(true)
  };


  useEffect(() => {
    if (state.createAccount?.networkError || state.createAccount?.emailError || state.createAccount?.mobileError || state.createAccount?.passwordDoesnotMatchError || state.createAccount?.email_mobile_Error) {
      setLoading(false)
    }

  }, [state.createAccount?.networkError || state.createAccount?.emailError, state.createAccount?.mobileError, state.createAccount?.passwordDoesnotMatchError, state.createAccount?.email_mobile_Error])

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


  return (
    <>
      <div data-testid='create-account' className="w-full font-gilroy">
        <div className="mx-auto max-w-[650px] md:max-w-[700px] lg:max-w-none lg:pl-20 2xl:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-2 gap-x-6 fade-in">
            <div className="mt-4 relative">
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                  <div className="w-10 h-10 border-4 border-t-blue-700 border-r-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="flex gap-1 mb-1 cursor-pointer justify-center lg:justify-start 2xl:ml-[75px]">
                <img
                  src={Logo}
                  alt="Company Logo"
                  onClick={handleLogoClick}
                  className="h-6 w-6 cursor-pointer"
                />

                <div>
                  <label
                    onClick={handleLogoClick}
                    className="text-blue-700 font-extrabold font-gilroy cursor-pointer"
                  >
                    Smartstay
                  </label>
                </div>
              </div>

              <div className="mt-3 mb-1 flex justify-center lg:justify-start 2xl:ml-[75px]">
                <label className="text-3xl font-semibold text-[#222222] font-gilroy">
                  Create your free account
                </label>
              </div>

              <div className="mt-1 mb-1 flex justify-center lg:justify-start 2xl:ml-[75px]">
                <label className="text-base font-normal text-[#4B4B4B] font-montserrat">
                  Enter your details below to find your stay smartly
                </label>
              </div>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6 max-w-[650px] md:max-w-[750px] mx-auto lg:mx-0 2xl:-ml-12
                max-h-[300px] overflow-y-auto pr-2 show-scroll">
                <div className="w-full" data-testid="fname-container">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                      First Name <span className="text-red-500 text-lg">*</span>
                    </Form.Label>
                    <Form.Control
                      value={firstName}
                      data-testid='first-name'
                      onChange={(e) => { handleFirstName(e) }}
                      size="lg" type="text"
                      placeholder="Enter First Name"
                      className={`shadow-none !border !border-[#E0ECFF] !text-base ${firstName ? "font-semibold" : "font-medium"} text-[#222222] font-gilroy`}
                    />
                  </Form.Group>

                  {firstNameError && (
                    <ErrorMessage message={firstNameError} type="error" />
                  )}
                </div>

                <div className="w-full">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">Last Name <span className="invisible text-lg">*</span></Form.Label>
                    <Form.Control
                      data-testid='last-name'
                      value={lastName}
                      onChange={(e) => { handleLastName(e) }}
                      size="lg"
                      type="text"
                      placeholder="Enter Last Name"
                      className={`shadow-none !border !border-[#E0ECFF] !text-base ${lastName ? "font-semibold" : "font-medium"} text-[#222222] font-gilroy`}
                    />
                  </Form.Group>
                </div>

                <div className="w-full">
                  <Form.Group controlId="formGridEmail">
                    <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                      Email ID {" "}<span className="text-red-500 text-lg">*</span>
                    </Form.Label>
                    <Form.Control size="lg"
                      data-testid='emailid'
                      autoComplete="new-mail"
                      autoCorrect="off"
                      value={emailID}
                      onChange={(e) => { handleEmailID(e) }}
                      type="email"
                      placeholder="Enter Email ID"
                      className={`shadow-none !border !border-[#E0ECFF] !text-base ${emailID ? "font-semibold" : "font-medium"} text-[#222222] font-gilroy`}
                    />

                  </Form.Group>

                  {emailError && (
                    <ErrorMessage message={emailError} type="error" />
                  )}


                  {state.createAccount?.emailError ?
                    <ErrorMessage message={state.createAccount?.emailError} type="error" />
                    : null}
                </div>

                <div className="w-full">
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                      Mobile Number {" "}<span className="text-red-500 text-lg">*</span>
                    </Form.Label>

                    <InputGroup >
                      <Form.Select
                        value={countryCode}
                        id="vendor-select-create_account"
                        className={`!border !border-[#E0ECFF] !rounded-l-lg !h-[43px] !text-[16px] !text-[#4B4B4B] !font-gilroy ${countryCode ? "!font-semibold" : "!font-medium"} !shadow-none !bg-white !max-w-[90px] !rounded-none`}

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
                        className={`!text-[16px] !text-[#4B4B4B] !font-gilroy ${phoneNo ? "!font-semibold" : "!font-medium"} !shadow-none !border-l-0 !border-r !border-t !border-b !border-[#E0ECFF] !rounded-r-lg`}
                      />
                    </InputGroup>
                  </Form.Group>

                  {phoneError && (
                    <ErrorMessage message={phoneError} type="error" />
                  )}

                  {countryCodeError && (
                    <ErrorMessage message={countryCodeError} type="error" />

                  )}

                  {state.createAccount?.mobileError &&
                    <ErrorMessage message={state.createAccount?.mobileError} type="error" />
                  }
                </div>

                <div className="w-full">
                  <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                    Password {" "}<span className="text-red-500 text-lg">*</span>
                  </Form.Label>
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

                      className={`relative shadow-none !border !border-[#E0ECFF] !text-base text-[#222222] font-gilroy ${password ? "font-semibold" : "font-medium"} border-r-0`}
                    />
                    <InputGroup.Text onClick={togglePasswordVisibility}
                      className="bg-transparent !border !border-[#E0ECFF] cursor-pointer"
                    >
                      {showPassword ? (
                        <Eye size="20" color="rgba(30, 69, 225, 1)" />
                      ) : (

                        <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                      )}
                    </InputGroup.Text>

                  </InputGroup>

                  {passwordErrors && (
                    <ErrorMessage message={passwordErrors} type="error" />

                  )}

                  {passwordError && passwordError.length > 0 && (
                    <ErrorMessage message={passwordError} type="error" />

                  )}
                </div>

                <div className="w-full">
                  <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                    Confirm Password {" "}<span className="text-red-500 text-lg">*</span>
                  </Form.Label>
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
                      className={`relative shadow-none !border !border-[#E0ECFF] !text-base text-[#222222] font-gilroy ${confirmpassword ? "font-semibold" : "font-medium"} border-r-0`}
                    />
                    <InputGroup.Text onClick={toggleConfirmPasswordVisibility}
                      className="bg-transparent border border-[#E0ECFF] cursor-pointer" >
                      {showConfirmPassword ? (
                        <Eye size="20" color="rgba(30, 69, 225, 1)" />
                      ) : (

                        <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                      )}
                    </InputGroup.Text>

                  </InputGroup>

                  {confirmPasswordError && (
                    <ErrorMessage message={confirmPasswordError} type="error" />
                  )}

                </div>
                {allError && (
                  <ErrorMessage message={allError} type="error" />
                )}

                {bothPasswordError && (
                  <ErrorMessage message={bothPasswordError} type="error" />
                )}

                {state.createAccount?.passwordDoesnotMatchError ?
                  <ErrorMessage message={state.createAccount?.passwordDoesnotMatchError} type="error" />
                  : null}


                {state.createAccount?.email_mobile_Error ?
                  <ErrorMessage message={state.createAccount?.email_mobile_Error} type="error" />
                  : null}

                {/* {state.createAccount?.networkError ? 
                  <ErrorMessage message={state.createAccount?.networkError}  type="error"/>
                  : null} */}
              </div>

              <div className="mt-4 mb-1 mr-5 2xl:ml-[75px]">
                <Button
                  data-testid="create-account-btn"
                  disabled={loading}
                  onClick={handleCreateAccount}
                  className="!w-full 2xl:!w-[750px] xl:!w-[630px] !bg-[#1E45E1] !rounded-[12px] !h-[50px] !font-semibold !font-montserrat"
                >
                  Create account
                </Button>
              </div>

              <div className="mt-3 mb-2 2xl:ml-[75px]">
                <label className="text-[14px] font-normal font-montserrat">
                  Already have an account?
                  <span
                    onClick={handleLoginPage}
                    className="ml-2 text-[16px] font-semibold font-gilroy text-[#1E45E1] cursor-pointer create-account-hover"
                  >
                    Sign in
                  </span>
                </label>
              </div>

            </div>

            <div className="w-full">
              <div className="mt-5 flex justify-center w-full lg:w-[450px] lg:ml-[100px]">
                <img
                  src={CreateAccount}
                  alt="create"
                  className="w-full max-w-[480px] h-auto md:-mt-16 lg:-mt-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateAccountPage;
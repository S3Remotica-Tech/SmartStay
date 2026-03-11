/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from "react-router-dom";
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch, useSelector } from 'react-redux';
import OtpVerificationModal from '../Pages/OthersComponent/OtpVerificationModal';
import Cookies from 'universal-cookie';
import Loginimage from '../Assets/Images/new_login.png';
import Logo from '../Assets/Images/New_images/Group.png';
import { Eye, EyeSlash } from 'iconsax-react';
import ErrorMessage from '../Components/ErrorMessage'
import CryptoJS from "crypto-js";
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
    navigate('/hostel-management-signup')
  }
  const handleForgetPassword = () => {
    navigate('/forget-password')
  }

  const handleEmailChange = (e) => {
    dispatch({ type: 'REMOVE_INVALID_CREDENTIALS' })
    dispatch({ type: 'CLEAR_EMAIL_ERROR' });
    setemail_Id(e.target.value.toLowerCase())
    setEmailError('')
  }

  const handlePasswordChange = (e) => {
    dispatch({ type: 'REMOVE_INVALID_CREDENTIALS' })
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
    dispatch({ type: 'REMOVE_INVALID_CREDENTIALS' })
    dispatch({ type: 'RESET_ALL' });
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

      dispatch({ type: 'LOGINVERSION2', payload: { emailId: email_Id, password: password } });
      // dispatch({ type: 'LOGININFO', payload: { email_Id: 'shree@gmail.com', password: 'Shree@2025' } });
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
    if (state.login.statusCode === 200) {
      // setLoading(false)
      // dispatch({ type: 'LOGIN-SUCCESS' });
      const token = state.login.JWTtoken
      const cookies = new Cookies()
      cookies.set('token', token, { path: '/' });
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUSCODE' });
      }, 100);
    }

  }, [state.login.statusCode]);



  useEffect(() => {
    if (state.login.statusCodeForV2Login) {
      if (state.login?.isOtpRequired === true) {

        setShowOtpVerification(true)
        setLoading(false)
      }
      else {
        setLoading(false)
        dispatch({ type: 'LOGIN-SUCCESS' });
        const token = state.login?.JWTtokenV2



        const cookies = new Cookies()
        cookies.set('v2-token', token, { path: '/' });

        if (checked) {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(true),
            "abcd"
          );
          localStorage.setItem("login", encryptData.toString());
        }



        if (token) {
          setTimeout(() => {
            dispatch({ type: 'CLEAR_STATUSCODE_VERSION_2' });
          }, 100);
        }
      }



    }

  }, [state.login.statusCodeForV2Login]);





  useEffect(() => {
    if (state.login.errorEmail || state.login.errorPassword || state.login.invalidCredential) {
      setLoading(false)

      setTimeout(() => {
        dispatch({ type: 'REMOVE_INVALID_CREDENTIALS' })
      }, 2000)

    }
  }
    , [state.login.errorEmail, state.login.errorPassword, state.login.invalidCredential])

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])



  return (

    <div className="container mx-auto h-full mt-12">
      <div className="flex flex-wrap h-full items-center 2xl:mt-36 w-full fade-in">
        <div className="w-full md:w-1/2 relative md:-ml-20 lg:ml-0">
          <div className="flex gap-1 mb-1 mt-6 items-center">
            <img
              src={Logo}
              alt="logo"
              className="h-6 w-6 cursor-pointer"
              onClick={handleLogoClicks}
            />

            <label
              className="#1E45E1 font-extrabold font-gilroy cursor-pointer pt-1"
              onClick={handleLogoClicks}
            >
              Smartstay
            </label>
          </div>
          <div className="mb-3 mt-2">
            <h1 className="font-gilroy font-semibold text-gray-800 text-[32px]">
              Welcome back!
            </h1>
          </div>
          <div>
            <p className="font-montserrat font-normal text-base text-gray-900 leading-5 text-left">
              Enter your details below to get onto your SmartStay account.
            </p>
          </div>

          {/* {state.createAccount?.networkError ?
            <ErrorMessage message={state.createAccount?.networkError} type="error" />
            : null} */}

          {state.login.invalidCredential ?
            <ErrorMessage message={state.login.invalidCredential} type="error" />
            : null}

          <div className='mt-4'>
            <div className="p-0 font-gilroy">

              <label className="text-[14px] font-medium text-[#222222]">
                Email ID
              </label>

              <input
                type="text"
                placeholder="Enter Email ID"
                autoFocus
                disabled={showOtpVerification}
                value={email_Id}
                onChange={(e) => handleEmailChange(e)}
                className={`w-full h-[50px] mt-1 mb-1 px-3 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-0 text-[16px] text-[#4B4B4B] ${email_Id ? "font-semibold" : "font-medium"}`}
              />

              {emailError && (
                <ErrorMessage message={emailError} type="error" />
              )}

              {state.login.errorEmail && (
                <div className="mb-1 p-1">
                  <ErrorMessage message={state.login.errorEmail} type="error" />
                </div>
              )}

              <label className="text-[14px] font-medium text-[#222222] mt-2 block mb-1">
                Password
              </label>

              <div className="flex items-center mb-1">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  disabled={showOtpVerification}
                  value={password}
                  onChange={(e) => handlePasswordChange(e)}
                  className={`w-full h-[50px] px-3 rounded-l-lg border border-[#D9D9D9] border-r-0 focus:outline-none focus:ring-0 text-[16px] text-[#222222] ${password ? "font-semibold" : "font-medium"}`}
                />

                <div
                  onClick={togglePasswordVisibility}
                  className="h-[50px] px-3 flex items-center justify-center
      border border-[#D9D9D9] border-l-0
      rounded-r-lg cursor-pointer bg-transparent"
                >
                  {showPassword ? (
                    <Eye size={20} color="rgba(30, 69, 225, 1)" />
                  ) : (
                    <EyeSlash size={20} color="rgba(30, 69, 225, 1)" />
                  )}
                </div>
              </div>

              {passwordError && (
                <ErrorMessage message={passwordError} type="error" />
              )}

              {state.login.errorPassword && (
                <ErrorMessage message={state.login.errorPassword} type="error" />
              )}

              <div className="flex justify-between items-center mt-3 mb-3">
                <label className="flex items-center gap-2 text-[14px] font-medium mt-0.5">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => handleCheckboxChange(e)}
                    className="w-4 h-4 shadow-2xl align-middle"
                  />
                  <span className="leading-none">Stay signed in</span>
                </label>

                <span
                  onClick={() => handleForgetPassword()}
                  className="font-montserrat text-[14px] font-semibold leading-[17.07px] text-left text-[#1E45E1] cursor-pointer hover:underline"> Forgot Password?
                </span>
              </div>

            </div>

            <div className="flex justify-center pt-2">
              <button
                onClick={() => handleLogin()}
                className="w-full h-[42px] rounded-[10px] bg-[#1E45E1] text-white text-[16px] font-semibold font-montserrat cursor-pointer">
                Sign in
              </button>
            </div>
          </div>

          {loading && <div className="absolute top-[120px] inset-x-0 bottom-0 flex items-center justify-center h-[50vh] opacity-75 z-10"><div className="w-10 h-10 border-4 border-[#1E45E1] border-t-transparent rounded-full animate-spin"></div></div>}
        </div>

        <div className="w-full md:w-1/2 mt-0 md:mt-3">
         <div className='w-[450px] h-[200px] ml-[120px] md:ml-[60px] lg:ml-[120px] 2xl:ml-[120px]'>
            <img src={Loginimage} alt='LoginImg' />
          </div>
        </div>
        <div className='flex mt-3 gap-1'>
          <p className="font-montserrat font-normal text-[16px] md:-ml-20 lg:ml-0 2xl:ml-0">
            Don&apos;t have an account?
          </p><span className="font-montserrat font-semibold text-[16px] text-[#1E45E1] cursor-pointer hover:underline" onClick={handleCreateAccount}>Create an account</span>
        </div>

      </div>


      <OtpVerificationModal show={showOtpVerification} handleClose={handleCloseModal} Email_Id={email_Id} checked={checked} />

    </div>

    // <div className="max-w-[1100px] mx-auto h-full px-4">
    //   <div className="flex flex-wrap items-center justify-center p-3 md:mt-4 2xl:mt-36 w-full fade-in">

    //     <div className="w-full lg:w-1/2 relative">
    //       <div className="flex gap-1 mb-1 mt-6 items-center">
    //         <img
    //           src={Logo}
    //           alt="logo"
    //           className="h-6 w-6 cursor-pointer"
    //           onClick={handleLogoClicks}
    //         />

    //         <label
    //           className="#1E45E1 font-extrabold font-gilroy cursor-pointer pt-1"
    //           onClick={handleLogoClicks}
    //         >
    //           Smartstay
    //         </label>
    //       </div>

    //       <div className="mb-3 mt-2">
    //         <h1 className="font-gilroy font-semibold text-gray-800 text-[32px]">
    //           Welcome back!
    //         </h1>
    //       </div>

    //       <div>
    //         <p className="font-montserrat font-normal text-base text-gray-900 leading-5 text-left">
    //           Enter your details below to get onto your SmartStay account.
    //         </p>
    //       </div>

    //       {/* {state.createAccount?.networkError ?
    //         <ErrorMessage message={state.createAccount?.networkError} type="error" />
    //         : null} */}

    //       {state.login.invalidCredential ?
    //         <ErrorMessage message={state.login.invalidCredential} type="error" />
    //         : null}

    //       <div className='mt-4'>
    //         <div className="p-0 font-gilroy">

    //           <label className="text-[14px] font-medium text-[#222222]">
    //             Email ID
    //           </label>

    //           <input
    //             type="text"
    //             placeholder="Enter Email ID"
    //             autoFocus
    //             disabled={showOtpVerification}
    //             value={email_Id}
    //             onChange={(e) => handleEmailChange(e)}
    //             className={`w-full h-[50px] mt-1 mb-1 px-3 rounded-lg border border-[#D9D9D9] focus:outline-none focus:ring-0 text-[16px] text-[#4B4B4B] ${email_Id ? "font-semibold" : "font-medium"}`}
    //           />

    //           {emailError && (
    //             <ErrorMessage message={emailError} type="error" />
    //           )}

    //           {state.login.errorEmail && (
    //             <div className="mb-1 p-1">
    //               <ErrorMessage message={state.login.errorEmail} type="error" />
    //             </div>
    //           )}

    //           <label className="text-[14px] font-medium text-[#222222] mt-2 block mb-1">
    //             Password
    //           </label>

    //           <div className="flex items-center mb-1">
    //             <input
    //               type={showPassword ? "text" : "password"}
    //               placeholder="Enter Password"
    //               disabled={showOtpVerification}
    //               value={password}
    //               onChange={(e) => handlePasswordChange(e)}
    //               className={`w-full h-[50px] px-3 rounded-l-lg border border-[#D9D9D9] border-r-0 focus:outline-none focus:ring-0 text-[16px] text-[#222222] ${password ? "font-semibold" : "font-medium"}`}
    //             />

    //             <div
    //               onClick={togglePasswordVisibility}
    //               className="h-[50px] px-3 flex items-center justify-center
    //   border border-[#D9D9D9] border-l-0
    //   rounded-r-lg cursor-pointer bg-transparent"
    //             >
    //               {showPassword ? (
    //                 <Eye size={20} color="rgba(30, 69, 225, 1)" />
    //               ) : (
    //                 <EyeSlash size={20} color="rgba(30, 69, 225, 1)" />
    //               )}
    //             </div>
    //           </div>

    //           {passwordError && (
    //             <ErrorMessage message={passwordError} type="error" />
    //           )}

    //           {state.login.errorPassword && (
    //             <ErrorMessage message={state.login.errorPassword} type="error" />
    //           )}

    //           <div className="flex justify-between items-center mt-3 mb-3">
    //             <label className="flex items-center gap-2 text-[14px] font-medium mt-0.5">
    //               <input
    //                 type="checkbox"
    //                 checked={checked}
    //                 onChange={(e) => handleCheckboxChange(e)}
    //                 className="w-4 h-4 shadow-2xl align-middle"
    //               />
    //               <span className="leading-none">Stay signed in</span>
    //             </label>

    //             <span
    //               onClick={() => handleForgetPassword()}
    //               className="font-montserrat text-[14px] font-semibold leading-[17.07px] text-left text-[#1E45E1] cursor-pointer hover:underline">
    //               Forgot Password?
    //             </span>
    //           </div>

    //         </div>

    //         <div className="flex justify-center pt-2">
    //           <button
    //             onClick={() => handleLogin()}
    //             className="w-full h-[42px] rounded-[10px] bg-[#1E45E1] text-white text-[16px] font-semibold font-montserrat cursor-pointer">
    //             Sign in
    //           </button>
    //         </div>
    //       </div>

    //       {loading && <div className="absolute top-[120px] inset-x-0 bottom-0 flex items-center justify-center h-[50vh] opacity-75 z-10"><div className="w-10 h-10 border-4 border-[#1E45E1] border-t-transparent rounded-full animate-spin"></div></div>}
    //     </div>


    //     <div className="w-full lg:w-1/2 mt-8 lg:mt-3 flex justify-center">
    //       <div className="w-full flex justify-center">
    //         <img
    //           src={Loginimage}
    //           alt="LoginImg"
    //           className="w-full h-auto md:max-h-[260px] lg:max-h-none object-contain"
    //         />
    //       </div>
    //     </div>

    //     <div className='flex mt-6 gap-1 w-full justify-center lg:justify-start'>
    //       <p className="font-montserrat font-normal text-[16px]">
    //         Don&apos;t have an account?
    //       </p>
    //       <span className="font-montserrat font-semibold text-[16px] text-[#1E45E1] cursor-pointer hover:underline" onClick={handleCreateAccount}>
    //         Create an account
    //       </span>
    //     </div>

    //   </div>

    //   <OtpVerificationModal show={showOtpVerification} handleClose={handleCloseModal} Email_Id={email_Id} checked={checked} />

    // </div>


  );
};

export default MyComponent;

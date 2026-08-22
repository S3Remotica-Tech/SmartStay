/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forgetpass.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Forgot from "../Assets/Images/New_images/forgot.png";
import Logo from "../Assets/Images/New_images/Group.png";
import { Eye, EyeSlash } from "iconsax-react";
import ForgotOtp from "../Pages/OthersComponent/ForgotOtp";
import LoaderComponent from "../Pages/OthersComponent/LoaderComponent";
import ErrorMessage from "../Components/ErrorMessage";

function ForgetPasswordPage() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [email, setEmail] = useState();
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [showEmailSend, setShowEmailSend] = useState(true);
  const [isPasswordLongEnough, setIsPasswordLongEnough] = useState(null);
  const [isLowerCaseEnough, setLowerCaseEnough] = useState(null);
  const [isNumericEnough, setNumericEnough] = useState(null);
  const [allError, setAllError] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [generalError, setGeneralError] = useState("");
  // const [sendEmailError, setSendMailError] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  let navigate = useNavigate();

  const handleEmailid = (e) => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    const email = e.target.value.toLowerCase();
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    dispatch({ type: "CLEAR_ERROR" });
    setGeneralError("");
    setEmail(email);
    // setSendMailError("");

    if (!emailRegex.test(email)) {
      setEmailError("Please Enter  Valid Email ID");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordReset = () => {
    if (!password && !confirmpassword) {
      setAllError("Please Enter password and confirm password ");
      return;
    }

    if (password !== confirmpassword) {
      setConfirmationError("Please Enter Confirm Password Same as Password");
      return;
    }

    if (password && confirmpassword && email) {
      dispatch({
        type: "FORGETPAGE",
        payload: {
          password: password,
          userId: state.NewPass?.userId,
          otp: state.NewPass?.Otp,
          // confirm_password: confirmpassword,
        },
      });
      setLoading(true);

      if (inputRefs) {
        inputRefs.forEach((ref) => {
          if (ref.current) {
            ref.current.value = null;
          }
        });
      }
    }
  };

  useEffect(() => {
    return () => {
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
    };
  }, []);

  const handleAccountVerification = () => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    if (!email) {
      setGeneralError("Please Enter Email Id");

      return;
    }

    dispatch({ type: "OTPSEND", payload: email });
    setShowLoader(true);
  };

  const handleLogin = () => {
    setTimeout(() => {
      navigate("/hostel-management-login");
    }, 1000);
  };

  const togglePasswordVisibility = () => {
    setShowpassword(!showPassword);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setAllError("");
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
      errorMessages.push("Password cannot contain spaces.");
    } else if (password.length < 8) {
      errorMessages.push("8 characters minimum");
    } else if (!/[a-z]/.test(password) || !/[A-Z]/.test(password)) {
      errorMessages.push("One uppercase and lowercase");
    } else if (!/\d/.test(password) || !/[@$!%*?&]/.test(password)) {
      errorMessages.push("Numeric and Special symbols");
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setAllError("");
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLEAR_ERROR_OTP_CODE" });
    dispatch({ type: "CLEAR_OTP_INVALID_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    setShowOtpVerification(false);
  };
  const hanldeBackToLogin = () => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    setShowEmailSend(true);
    setNewPassword(false);
    navigate("/All_Landing_pages");
  };

  const hanldeBackToLoginPassword = () => {
    setTimeout(() => {
      setShowEmailSend(true);
      setNewPassword(false);
    }, 100);
    navigate("/All_Landing_pages");
  };

  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    }, appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  useEffect(() => {
    if (state.NewPass?.statusCode === 200) {
      setShowLoader(false);
      setShowOtpVerification(true);
      setTimeout(() => {
        dispatch({ type: "CLEAR_OTP_STATUS_CODE" });
      }, 1000);
    }
  }, [state.NewPass?.statusCode]);

  useEffect(() => {
    if (state.NewPass.statusCodeForgotOtp === 200) {
      setNewPassword(true);
      setShowEmailSend(false);
      setShowOtpVerification(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE" });
      }, 1000);
    }
  }, [state.NewPass.statusCodeForgotOtp]);

  useEffect(() => {
    if (state.NewPass?.emailError) {
      setShowLoader(false);
    }
  }, [state.NewPass?.emailError]);

  useEffect(() => {
    if (state.NewPass?.status_codes === 200) {
      setShowLoader(false);
      navigate("/hostel-management-login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setIsPasswordLongEnough(false);
      setLowerCaseEnough(false);
      setNumericEnough(false);

      if (inputRefs) {
        inputRefs.forEach((ref) => {
          if (ref.current) {
            ref.current.value = null;
          }
        });
      }

      setShowOtpVerification(false);
      setNewPassword(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEW_PASSWORD_STATUS_CODE" });
      }, 2000);
    }
  }, [state.NewPass?.status_codes]);

  return (
    <div className="w-full h-screen font-gilroy">
      {showEmailSend && (
        <>
          <div className="ml-5 mb-5">
            <div className="grid grid-cols-2 gap-x-1 gap-y-4">
              <div className="p-20 relative">
                <div
                  className="flex items-center gap-1 mb-1 cursor-pointer"
                  onClick={hanldeBackToLogin}
                >
                  <img src={Logo} alt="logo" className="w-[25px] h-[25px]" />

                  <span className="text-[#1E45E1] font-extrabold font-gilroy">
                    Smartstay
                  </span>
                </div>

                <div className="mt-3 mb-1">
                  <h1 className="text-[32px] font-semibold text-[#222222] font-gilroy">
                    Forgot Password?
                  </h1>
                </div>

                <div className="mt-1 mb-1">
                  <p className="text-[16px] font-normal text-[#4B4B4B] font-montserrat">
                    Enter your email address to recover your account.
                  </p>
                </div>

                <div className="grid">
                  <div className="w-full lg:w-[91.666667%] md:w-full">
                    <div className="mt-4 mb-3">
                      <label className="text-[14px] font-medium text-[#222222] font-gilroy">
                        Email ID{" "}
                        <span className="text-red-500 text-[20px]">*</span>
                      </label>

                      <input
                        data-testid="input-email"
                        value={email}
                        onChange={(e) => handleEmailid(e)}
                        type="email"
                        placeholder="Enter Email ID"
                        className={`w-full  mt-1 h-[48px] px-3 
  !border !border-[#E0ECFF] 
  rounded-lg
  text-[16px] text-[#222222] font-gilroy
  ${email ? "font-semibold" : "font-medium"}
  focus:outline-none focus:ring-0 focus:border-[#1E45E1]`}
                      />

                      {generalError && (
                        <ErrorMessage message={generalError} type="error" />
                      )}

                      {emailError ? (
                        <div className="mb-1 p-1">
                          <ErrorMessage message={emailError} type="error" />
                        </div>
                      ) : null}

                      {state.NewPass?.emailError ? (
                        <div className="mb-1 p-1">
                          <ErrorMessage
                            message={state.NewPass?.emailError}
                            type="error"
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="w-full px-0 md:w-full mb-1 flex gap-5 items-center">
                    <button
                      onClick={handleAccountVerification}
                      className="w-full h-[50px] rounded-[12px] px-4 py-[10px] 
      bg-[#1E45E1] text-white font-montserrat 
      font-semibold text-[16px]"
                    >
                      Continue
                    </button>

                    <div>{showLoader && <LoaderComponent />}</div>
                  </div>
                </div>

                <div className="mt-3 mb-2 text-[14px] font-normal font-montserrat">
                  <label>
                    Return to your account?
                    <span
                      onClick={() => handleLogin()}
                      className="ms-2 text-[16px] font-semibold font-gilroy text-[#1E45E1] cursor-pointer hover:underline"
                    >
                      Sign in
                    </span>
                  </label>
                </div>
              </div>

              <div className="w-full flex justify-center mt-24">
                <div className="w-[80%] max-w-[480px]">
                  <img
                    src={Forgot}
                    alt="forget"
                    className="w-full max-h-[440px] h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {showOtpVerification && (
        <>
          <ForgotOtp
            show={showOtpVerification}
            handleModalClose={handleCloseModal}
            Email_Id={email}
          />
        </>
      )}

      {newPassword && (
        <>
          <div className="ml-5 mb-5 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-1">
              <div className="p-6 md:p-12 lg:p-[80px]">
                <div
                  className="flex items-center gap-1 mb-1 cursor-pointer"
                  onClick={hanldeBackToLoginPassword}
                >
                  <img src={Logo} alt="logo" className="h-[25px] w-[25px]" />

                  <label className="text-[#1E45E1] font-extrabold font-gilroy">
                    Smartstay
                  </label>
                </div>

                <div className="mt-3 mb-1">
                  <label className="text-[32px] font-semibold text-[#222222] font-gilroy">
                    Setup your password
                  </label>
                </div>

                <div className="mt-1 mb-1">
                  <label className="text-[16px] font-normal text-[#4B4B4B] font-montserrat">
                    Fill in the details below to create your publisher account
                  </label>
                </div>

                <div className="relative mt-4 grid gap-y-3">
                  <div className="w-full lg:w-[91.666667%]">
                    <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                      Password
                      <span className="text-red-500 text-[22px]">*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        size="lg"
                        value={password}
                        onChange={handlePassword}
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`relative shadow-none !border !border-[#E0ECFF]
  text-[16px] text-[#222222] font-gilroy
  ${password ? "font-semibold" : "font-medium"}
  focus:outline-none`}
                      />

                      <InputGroup.Text
                        className="bg-transparent !border !border-[#E0ECFF] border-l-0 cursor-pointer flex items-center px-3"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <Eye size="20" color="rgba(30, 69, 225, 1)" />
                        ) : (
                          <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </div>

                  <div className="w-full lg:w-[91.666667%]">
                    <Form.Label className="text-[14px] font-medium text-[#222222] font-gilroy">
                      Confirm Password
                      <span className="text-red-500 text-[22px]">*</span>
                    </Form.Label>
                    <InputGroup>
                      <Form.Control
                        size="lg"
                        value={confirmpassword}
                        onChange={handleConfirmPassword}
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Password"
                        className={`relative shadow-none !border !border-[#E0ECFF]
  text-[16px] text-[#222222] font-gilroy
  ${password ? "font-semibold" : "font-medium"}
  focus:outline-none`}
                      />
                      <InputGroup.Text
                        className="bg-transparent !border !border-[#E0ECFF] border-l-0 cursor-pointer flex items-center px-3"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
                          <Eye size="20" color="rgba(30, 69, 225, 1)" />
                        ) : (
                          <EyeSlash size="20" color="rgba(30, 69, 225, 1)" />
                        )}
                      </InputGroup.Text>
                    </InputGroup>
                  </div>

                  {passwordChanged && (
                    <div>
                      {isPasswordLongEnough ? (
                        <ErrorMessage
                          message={["8 characters minimum"]}
                          type="success"
                        />
                      ) : (
                        <ErrorMessage
                          message={["8 characters minimum"]}
                          type="error"
                        />
                      )}

                      {isLowerCaseEnough ? (
                        <ErrorMessage
                          message={["One uppercase and lowercase"]}
                          type="success"
                        />
                      ) : (
                        <ErrorMessage
                          message={["One uppercase and lowercase"]}
                          type="error"
                        />
                      )}

                      {isNumericEnough ? (
                        <ErrorMessage
                          message={["Numeric and Special symbols"]}
                          type="success"
                        />
                      ) : (
                        <ErrorMessage
                          message={["Numeric and Special symbols"]}
                          type="error"
                        />
                      )}
                    </div>
                  )}

                  {loading && (
                    <div className="absolute inset-0 flex items-center justify-center h-1/2 bg-transparent opacity-75 z-10">
                      <div className="w-10 h-10 border-4 border-t-blue-700 border-r-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {allError && <ErrorMessage message={allError} type="error" />}

                  {confirmationError ? (
                    <ErrorMessage message={confirmationError} type="error" />
                  ) : null}

                  <div className="w-full lg:w-[91.666667%] mt-2 mb-1">
                    <button
                      onClick={handlePasswordReset}
                      className="w-full bg-blue-700 rounded-xl py-2.5 h-12 font-montserrat font-semibold text-base text-white"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6 md:p-12 lg:p-[80px]">
                <div>
                  <img
                    src={Forgot}
                    alt="forget"
                    className="w-[460px] h-[460px]"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ForgetPasswordPage;

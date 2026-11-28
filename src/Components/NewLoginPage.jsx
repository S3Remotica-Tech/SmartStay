/* eslint-disable react-hooks/exhaustive-deps */
// New login screen — Figma "Smartstay Ver-3" Login frame 5352:152029
// (section 5352:153217). Auth screens follow the "New design System" file
// (iYflViMrr1kQSivg9hlBsy) and use the TASA Orbiter font.
//
// Login behaviour mirrors the current LoginPage.jsx exactly (same LOGINVERSION2
// saga -> loginV2 API, same v2-token cookie / "login" localStorage writes, same
// OTP modal, same error + loading handling). LoginPage.jsx is left untouched.
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import OtpVerificationModal from "../Pages/OthersComponent/OtpVerificationModal";
import ErrorMessage from "./ErrorMessage";
import Checkbox from "../Utils/Checkbox";
import {
  AuthField,
  AuthLayout,
  AuthLogo,
  AuthSubmitButton,
  GoogleAuthButton,
  PasswordToggle,
  StoreBadges,
  useAuthLaptopDensity,
} from "./NewAuth/AuthParts";
import { LoginPromoCard } from "./NewAuth/AuthPromoCards";
import { authFieldInput, authInlineLink } from "./NewAuth/authStyles";
import WaveEmoji from "../Assets/Images/NewLogin/wave.svg";

// Google sign-in is shown only in development until the API is ready.
const isDev = import.meta.env.MODE === "development";

const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

function NewLoginPage() {
  useAuthLaptopDensity();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  // Set by NewSignupPage after an account is created: prefill the email so
  // the user only types the password.
  const prefilledEmail = location.state?.email || "";

  const [email_Id, setemail_Id] = useState(prefilledEmail);
  const [password, setpassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const [checked, setChecked] = useState(false);
  const [showOtpVerification, setShowOtpVerification] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    dispatch({ type: "REMOVE_INVALID_CREDENTIALS" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    setemail_Id(e.target.value.toLowerCase());
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: "REMOVE_INVALID_CREDENTIALS" });
    dispatch({ type: "CLEAR_PASSWORD_ERROR" });
    setpassword(e.target.value);
    setPasswordError("");
  };

  const handleCloseModal = () => {
    dispatch({ type: "CLEAR_ERROR_OTP_CODE" });
    setShowOtpVerification(false);
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    if (loading) return;
    dispatch({ type: "REMOVE_INVALID_CREDENTIALS" });
    dispatch({ type: "RESET_ALL" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    dispatch({ type: "CLEAR_PASSWORD_ERROR" });
    setEmailError("");
    setPasswordError("");

    if (!email_Id && !password) {
      setEmailError("Please Enter Email ID");
      setPasswordError("Please Enter Password");
      return;
    } else if (!email_Id) {
      setEmailError("Please Enter Email ID");
      return;
    } else if (!EMAIL_REGEX.test(email_Id)) {
      setEmailError("Please Enter Valid Email ID");
      return;
    } else if (!password) {
      setPasswordError("Please Enter Password");
      return;
    }
    // Email only: the login API takes emailId (no mobile-number login).
    dispatch({
      type: "LOGINVERSION2",
      payload: { emailId: email_Id, password: password },
    });
    setLoading(true);
  };

  // Same success / OTP handling as LoginPage.jsx.
  useEffect(() => {
    if (state.login.statusCodeForV2Login) {
      if (state.login?.isOtpRequired === true) {
        setShowOtpVerification(true);
        setLoading(false);
      } else {
        setLoading(false);
        dispatch({ type: "LOGIN-SUCCESS" });
        const token = state.login?.JWTtokenV2;

        const cookies = new Cookies();
        cookies.set("v2-token", token, { path: "/" });

        if (checked) {
          const encryptData = CryptoJS.AES.encrypt(
            JSON.stringify(true),
            "abcd",
          );
          localStorage.setItem("login", encryptData.toString());
        }

        if (token) {
          setTimeout(() => {
            dispatch({ type: "CLEAR_STATUSCODE_VERSION_2" });
          }, 100);
        }
      }
    }
  }, [state.login.statusCodeForV2Login]);

  useEffect(() => {
    if (
      state.login.errorEmail ||
      state.login.errorPassword ||
      state.login.invalidCredential
    ) {
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_INVALID_CREDENTIALS" });
      }, 2000);
    }
  }, [
    state.login.errorEmail,
    state.login.errorPassword,
    state.login.invalidCredential,
  ]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const emailHasError = Boolean(emailError || state.login.errorEmail);
  const passwordHasError = Boolean(passwordError || state.login.errorPassword);
  const isFilled = Boolean(email_Id && password);

  return (
    <AuthLayout
      card={<LoginPromoCard />}
      header={
        <div className="flex flex-col gap-[clamp(6px,1.4vh,20px)]">
          <AuthLogo />
          <div className="flex flex-col gap-[clamp(4px,1vh,12px)]">
            <div className="flex items-center gap-[10px]">
              <h1 className="mb-0 font-tasa text-[26px] font-semibold leading-[32px] tracking-[0.15px] text-[#49475A] sm:text-[30px]">
                Welcome Back
              </h1>
              <img src={WaveEmoji} alt="" width="25" height="25" />
            </div>
            <p className="mb-0 font-tasa text-[16px] font-normal leading-[22px] tracking-[0.1px] text-[#686677] sm:text-[18px]">
              Sign in to your SmartStay account
            </p>
          </div>
        </div>
      }
    >

      <form data-testid="new-login-page-sign-in-form"
        noValidate
        onSubmit={handleLogin}
        className="flex w-full flex-col gap-[clamp(12px,2.4vh,23px)]"
      >

        {state.login.invalidCredential ? (
          <ErrorMessage
            message={state.login.invalidCredential}
            type="error"
            className="mt-0"
          />
        ) : null}

        <div className="flex w-full flex-col gap-[clamp(10px,2vh,20px)]">
          <AuthField
            id="new-login-email"
            label="Email Address"
            heightClass="h-[clamp(44px,6.5vh,54px)]"
            hasError={emailHasError}
            errors={[emailError, state.login.errorEmail]}
          >
            <input data-testid="new-login-page-email-input"
              id="new-login-email"
              type="email"
              inputMode="email"
              autoComplete="username"
              placeholder="Enter your email"
              autoFocus={!prefilledEmail}
              disabled={showOtpVerification}
              value={email_Id}
              onChange={handleEmailChange}
              aria-invalid={emailHasError || undefined}
              className={authFieldInput}
            />
          </AuthField>

          <div className="flex w-full flex-col gap-[clamp(8px,1.4vh,12px)]">
            <AuthField
              id="new-login-password"
              label="Password"
              heightClass="h-[clamp(44px,6.5vh,54px)]"
              hasError={passwordHasError}
              errors={[passwordError, state.login.errorPassword]}
              action={
                <button data-testid="new-login-page-forgot-password-btn"
                  type="button"
                  onClick={() => navigate("/forget-password")}
                  className="border-0 bg-transparent p-0 font-tasa text-[14px] font-medium leading-[24px] text-primary-500 hover:underline"
                >
                  Forgot Password?
                </button>
              }
            >
              <input data-testid="new-login-page-password-input"
                id="new-login-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter password"
                autoFocus={Boolean(prefilledEmail)}
                disabled={showOtpVerification}
                value={password}
                onChange={handlePasswordChange}
                aria-invalid={passwordHasError || undefined}
                className={authFieldInput}
              />
              {password && (
                <PasswordToggle
                  shown={showPassword}
                  onToggle={() => setShowpassword(!showPassword)}
                />
              )}
            </AuthField>

            <Checkbox data-testid="new-login-page-new-login-remember-checkbox"
              id="new-login-remember"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="!items-center !gap-[6px]"
              label={
                <span className="font-tasa text-[16px] font-normal leading-[20px] tracking-[0.08px] text-[#49475A]">
                  Remember me
                </span>
              }
            />
          </div>
        </div>

        <div className="flex w-full flex-col items-center gap-[clamp(8px,1.6vh,16px)]">
          <AuthSubmitButton
            data-testid="login-sign-in-btn"
            loading={loading}
            dimmed={!isFilled}
            loadingText="Signing in..."
          >
            Sign in
          </AuthSubmitButton>

          {isDev && (
            <>
              <span className="font-tasa text-[16px] font-medium leading-[20px] text-[#686677]">
                OR
              </span>

              <GoogleAuthButton data-testid="login-google-btn" label="Continue with Google" />
            </>
          )}
        </div>
      </form>

      <div className="flex w-full flex-col items-center gap-[clamp(2px,0.8vh,10px)] text-center">
        <p className="mb-0 font-tasa text-[16px] leading-[25px] tracking-[0.08px] text-[#49475A]">
          Don&apos;t Have an Account?{"  "}
          <button data-testid="new-login-page-create-account-btn"
            type="button"
            onClick={() => navigate("/hostel-management-signup")}
            className={authInlineLink}
          >
            Create Account
          </button>
        </p>
        <p className="mb-0 font-tasa text-[12px] leading-[20px] tracking-[-0.02px] text-[#222222]">
          By continuing, you agree to SmartStay&apos;s Terms and Privacy Policy.
        </p>
      </div>

      {/* Badges shrink on short screens so the whole login fits without scroll. */}
      <div className="[&>div]:!min-h-0 [&_img]:h-[clamp(32px,5vh,47px)] [&_img]:w-auto">
        <StoreBadges />
      </div>

      <OtpVerificationModal
        show={showOtpVerification}
        handleClose={handleCloseModal}
        Email_Id={email_Id}
        checked={checked}
      />
    </AuthLayout>
  );
}

export default NewLoginPage;

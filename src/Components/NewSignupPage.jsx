/* eslint-disable react-hooks/exhaustive-deps */
// New signup screen — Figma "Smartstay Ver-3" Sign up frame 5657:172092
// (section 5352:153217), "New design System" (iYflViMrr1kQSivg9hlBsy), TASA
// Orbiter font.
//
// Uses the SAME create-account flow as CreateAccount.jsx: CREATE_ACCOUNT_PAGE
// saga -> Addaccount API (POST /v2/users), same validation messages, same
// server errors, same success toast + redirect to login. CreateAccount.jsx is
// left untouched. Fields with no backend yet are shown but disabled.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import ErrorMessage from "./ErrorMessage";
import Checkbox from "../Utils/Checkbox";
import {
  AuthField,
  AuthLayout,
  AuthLogo,
  AuthSubmitButton,
  GoogleAuthButton,
  PasswordToggle,
} from "./NewAuth/AuthParts";
import { SignupPromoCard } from "./NewAuth/AuthPromoCards";
import Select from "react-select";
import {
  authFieldInput,
  authFieldShell,
  authInlineLink,
  authLabelText,
  authSelectStyles,
} from "./NewAuth/authStyles";
import { indianStates } from "../Utils/indianStates";
import ChevronDown from "../Assets/Images/NewLogin/chevron-down.svg";
import GlobeIcon from "../Assets/Images/NewLogin/globe.svg";
import LocationIcon from "../Assets/Images/NewLogin/location.svg";

const FIELD_H = "h-[50px]";
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
const PHONE_REGEX = /^(?!0{10})[1-9][0-9]{9}$/;

// Same rules and wording as CreateAccount.jsx.
const passwordRuleErrors = (value) => {
  const messages = [];
  if (/\s/.test(value)) messages.push("Password cannot contain spaces.");
  if (value.length < 8) messages.push("8 characters minimum");
  if (!/[a-z]/.test(value) || !/[A-Z]/.test(value))
    messages.push("One uppercase and lowercase");
  if (!/\d/.test(value) || !/[@$!%*?&]/.test(value))
    messages.push("Numeric and Special symbols");
  return messages;
};

// "Full Name" maps onto the API's firstName / lastName (first word / rest).
const splitFullName = (fullName) => {
  const [firstName = "", ...rest] = fullName.trim().split(/\s+/);
  return { firstName, lastName: rest.join(" ") };
};

const chevron = (
  <img
    src={ChevronDown}
    alt=""
    aria-hidden="true"
    width="11.5001"
    height="5.50003"
    className="mx-[6px]"
  />
);

function NewSignupPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [emailID, setEmailID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [stateName, setStateName] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fullNameError, setFullNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordEmptyError, setPasswordEmptyError] = useState("");
  const [passwordRules, setPasswordRules] = useState([]);

  const handleFullName = (e) => {
    const value = e.target.value;
    if (!/^[a-zA-Z\s]*$/.test(value)) return;
    setFullNameError("");
    if (value === "" || value.trim() !== "") setFullName(value);
  };

  const handlePhoneNo = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setPhoneNo(input);
    dispatch({ type: "CLEAR_MOBILE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_MOBILE_ERROR" });
    if (input.length > 0 && !/^\d{10}$/.test(input)) {
      setPhoneError("Please Enter Valid Mobile Number");
    } else {
      setPhoneError("");
    }
  };

  const handleEmailID = (e) => {
    const value = e.target.value.toLowerCase();
    setEmailID(value);
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_MOBILE_ERROR" });
    setEmailError(
      value && !EMAIL_REGEX.test(value) ? "Please Enter Valid Email ID" : "",
    );
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordEmptyError("");
    dispatch({ type: "CLEAR_PASSWORD_DOESNT_ERROR" });
    setPasswordRules(passwordRuleErrors(value));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (loading || !agreed) return;
    const cookies = new Cookies();
    cookies.remove("v2-token", { path: "/" });
    dispatch({ type: "CLEAR_PASSWORD_DOESNT_ERROR" });
    dispatch({ type: "CLEAR_MOBILE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_MOBILE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });

    let hasError = false;
    if (!fullName.trim()) {
      setFullNameError("Please Enter Full Name");
      hasError = true;
    }
    if (!emailID) {
      setEmailError("Please Enter Email ID");
      hasError = true;
    } else if (!EMAIL_REGEX.test(emailID)) {
      setEmailError("Please Enter Valid Email ID");
      hasError = true;
    }
    if (!phoneNo) {
      setPhoneError("Please Enter Mobile No");
      hasError = true;
    } else if (!PHONE_REGEX.test(phoneNo)) {
      setPhoneError("Please Enter Valid Mobile Number");
      hasError = true;
    }
    if (!password) {
      setPasswordEmptyError("Please Enter Password");
      hasError = true;
    } else if (passwordRules.length > 0) {
      hasError = true;
    }
    if (hasError) return;

    const { firstName, lastName } = splitFullName(fullName);
    dispatch({
      type: "CREATE_ACCOUNT_PAGE",
      payload: {
        firstName,
        lastName,
        mobile: phoneNo,
        mailId: emailID,
        password,
        // The new design has no confirm field; the API still expects it.
        confirmPassword: password,
        // TODO(auth): send region (country "India" + stateName) once the
        // create-account API accepts it. Optional field, never validated.
      },
    });
    setLoading(true);
  };

  // Same success handling as CreateAccount.jsx (toast comes from the saga).
  useEffect(() => {
    if (state.createAccount.statusCodeCreateAccount === 201) {
      setFullName("");
      setPhoneNo("");
      setEmailID("");
      setPassword("");
      setStateName("");
      setTimeout(() => {
        setLoading(false);
        navigate("/hostel-management-login");
      }, 1000);
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODE_CREATE_ACCOUNT" });
      }, 2000);
    }
  }, [state.createAccount.statusCodeCreateAccount]);

  useEffect(() => {
    if (
      state.createAccount?.networkError ||
      state.createAccount?.emailError ||
      state.createAccount?.mobileError ||
      state.createAccount?.passwordDoesnotMatchError ||
      state.createAccount?.email_mobile_Error
    ) {
      setLoading(false);
    }
  }, [
    state.createAccount?.networkError,
    state.createAccount?.emailError,
    state.createAccount?.mobileError,
    state.createAccount?.passwordDoesnotMatchError,
    state.createAccount?.email_mobile_Error,
  ]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const serverEmailError = state.createAccount?.emailError;
  const serverMobileError = state.createAccount?.mobileError;
  const passwordHasError = Boolean(passwordEmptyError || passwordRules.length);

  return (
    <AuthLayout
      card={<SignupPromoCard />}
      header={
        <div className="flex flex-col gap-[20px]">
          <AuthLogo />
          <div className="flex flex-col gap-[18px] py-[6px]">
            <h1 className="mb-0 font-tasa text-[28px] font-medium leading-[25px] tracking-[0.16px] text-[#222222] sm:text-[32px]">
              Let&apos;s get started
            </h1>
            <p className="mb-0 font-tasa text-[18px] font-normal leading-[25px] tracking-[0.09px] text-[#64748B]">
              Start your 30-Day free trial
            </p>
          </div>
        </div>
      }
      footer={
        <div className="flex w-full flex-col items-center gap-[14px]">
          {state.createAccount?.passwordDoesnotMatchError ? (
            <ErrorMessage
              message={state.createAccount.passwordDoesnotMatchError}
              type="error"
              className="mt-0 self-start"
            />
          ) : null}
          {state.createAccount?.email_mobile_Error ? (
            <ErrorMessage
              message={state.createAccount.email_mobile_Error}
              type="error"
              className="mt-0 self-start"
            />
          ) : null}

          <AuthSubmitButton
            form="signup-form"
            loading={loading}
            disabled={!agreed}
            loadingText="Creating account..."
          >
            Create Account
          </AuthSubmitButton>

          <p className="mb-0 text-center font-tasa text-[16px] leading-[25px] tracking-[0.08px] text-[#49475A]">
            Already Have an Account?{"  "}
            <button
              type="button"
              onClick={() => navigate("/hostel-management-login")}
              className={authInlineLink}
            >
              Sign in
            </button>
          </p>
        </div>
      }
    >
      <GoogleAuthButton label="Sign up with Google" />

      <p className="mb-0 text-center font-tasa text-[16px] leading-[18px] tracking-[0.08px] text-[#222222]">
        or
      </p>

      <form
        id="signup-form"
        noValidate
        onSubmit={handleCreateAccount}
        className="flex w-full flex-col"
      >
        <div className="flex w-full flex-col gap-[16px]">
          <AuthField
            id="signup-full-name"
            label="Full Name"
            required
            heightClass={FIELD_H}
            hasError={Boolean(fullNameError)}
            errors={[fullNameError]}
          >
            <input
              id="signup-full-name"
              type="text"
              autoComplete="name"
              autoFocus
              placeholder="Your name"
              value={fullName}
              onChange={handleFullName}
              aria-invalid={Boolean(fullNameError) || undefined}
              className={authFieldInput}
            />
          </AuthField>

          <AuthField
            id="signup-mobile"
            label="Mob No"
            required
            heightClass={FIELD_H}
            hasError={Boolean(phoneError || serverMobileError)}
            errors={[phoneError, serverMobileError]}
          >
            {/* TODO(auth): enable when other country codes are supported by the API (+91 only today) */}
            <span title="Coming soon" className="flex shrink-0">
              <button
                type="button"
                disabled
                aria-disabled="true"
                tabIndex={-1}
                aria-label="Country code +91"
                className="flex w-[70px] cursor-not-allowed items-center border-0 bg-transparent p-0 font-tasa text-[16px] font-semibold text-[#222222]"
              >
                +91
                {chevron}
              </button>
            </span>
            <input
              id="signup-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              placeholder="78654 98732"
              value={phoneNo}
              onChange={handlePhoneNo}
              aria-invalid={
                Boolean(phoneError || serverMobileError) || undefined
              }
              className={authFieldInput}
            />
          </AuthField>

          <div className="flex w-full flex-col gap-[10px]">
            <AuthField
              id="signup-email"
              label="Email"
              required
              heightClass={FIELD_H}
              hasError={Boolean(emailError || serverEmailError)}
              errors={[emailError, serverEmailError]}
            >
              <input
                id="signup-email"
                type="email"
                autoComplete="email"
                placeholder="Enter your Email"
                value={emailID}
                onChange={handleEmailID}
                aria-invalid={
                  Boolean(emailError || serverEmailError) || undefined
                }
                className={authFieldInput}
              />
            </AuthField>

            {/* TODO(auth): enable when the organization-name API field is ready */}
            <div title="Coming soon">
              <AuthField
                id="signup-organization"
                label="Organization Name"
                heightClass={FIELD_H}
              >
                <input
                  id="signup-organization"
                  type="text"
                  disabled
                  aria-disabled="true"
                  placeholder="Property/Organization Name"
                  className={`${authFieldInput} !text-[15px]`}
                />
              </AuthField>
            </div>
          </div>

          <AuthField
            id="signup-password"
            label="Password"
            required
            heightClass={FIELD_H}
            hasError={passwordHasError}
            errors={[passwordEmptyError, passwordRules.length ? passwordRules : ""]}
          >
            <input
              id="signup-password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Minimum 8 characters..."
              value={password}
              onChange={handlePassword}
              aria-invalid={passwordHasError || undefined}
              className={authFieldInput}
            />
            {password && (
              <PasswordToggle
                shown={showPassword}
                onToggle={() => setShowPassword(!showPassword)}
              />
            )}
          </AuthField>

          {/* Region (optional): country is India only; state uses the Add
              Tenant address list. Leaving it empty is fine. */}
          <div className="flex w-full flex-col gap-[12px]">
            <label htmlFor="signup-state" className={authLabelText}>
              Region
            </label>
            <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
              <div
                aria-label="Country: India"
                className={`${authFieldShell(false, FIELD_H)} cursor-default hover:bg-white`}
              >
                <img src={GlobeIcon} alt="" width="21" height="21" />
                <span className="font-tasa text-[16px] text-[#222222]">India</span>
              </div>
              <div className="relative">
                <img
                  src={LocationIcon}
                  alt=""
                  width="21"
                  height="21"
                  className="pointer-events-none absolute left-[16px] top-1/2 z-[1] -translate-y-1/2"
                />
                <Select
                  inputId="signup-state"
                  options={indianStates}
                  value={stateName ? { value: stateName, label: stateName } : null}
                  onChange={(option) => setStateName(option?.value || "")}
                  onInputChange={(inputValue, { action }) =>
                    action === "input-change"
                      ? inputValue.replace(/[^a-zA-Z\s]/g, "")
                      : inputValue
                  }
                  placeholder="Select state"
                  isClearable
                  styles={authSelectStyles(false, 47)}
                />
              </div>
            </div>
          </div>

          <Checkbox
            id="signup-agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="!items-center !gap-[7px]"
            label={
              <span className="font-tasa text-[16px] font-normal leading-[20px] tracking-[-0.02px] text-[#0A090B]">
                I Agree all the{" "}
                {/* TODO(auth): enable when a Terms of Service page exists */}
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  tabIndex={-1}
                  title="Coming soon"
                  className="cursor-not-allowed border-0 bg-transparent p-0 text-primary-500 underline opacity-50"
                >
                  Terms of Service
                </button>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-500 underline"
                >
                  Privacy Policy
                </a>
              </span>
            }
          />
        </div>
      </form>
    </AuthLayout>
  );
}

export default NewSignupPage;

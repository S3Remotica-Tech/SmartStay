/* eslint-disable react-hooks/exhaustive-deps */
// New forgot-password screen — Figma "Smartstay Ver-3": Forgot password
// 7097:178066, Verification code 7243:255397 (OTP input 7243:255873), Create
// new password 7097:178417 / 7097:178657. Auth screens use TASA Orbiter.
//
// Same API flow as Forgetpass.jsx (left untouched), via the existing sagas:
//   1. OTPSEND {contact}            -> GET  /v2/users/request-otp/:emailId
//   2. OTPVERIFYFORGOTPASSWORD      -> POST /v2/users/verify-otp {userId, otp}
//   3. FORGETPAGE                   -> POST /v2/users/reset-password
//                                      {password, userId, otp}
// The three steps live on one route so state.NewPass (userId, Otp) carries
// through; the left card follows the step.
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "./ErrorMessage";
import {
  AuthField,
  AuthLayout,
  AuthLogo,
  AuthSubmitButton,
  PasswordToggle,
} from "./NewAuth/AuthParts";
import { ForgotPromoCard } from "./NewAuth/AuthPromoCards";
import { authFieldInput } from "./NewAuth/authStyles";
import {
  OtpVerifyPanel,
  PASSWORD_SYMBOLS,
  PasswordRequirement,
  SentToText,
  isPasswordValid,
  passwordChecks,
} from "./NewAuth/OtpParts";

// Email only: the request-otp API takes a registered email (no mobile).
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

const STEP_REQUEST = 0;
const STEP_VERIFY = 1;
const STEP_RESET = 2;

// Saga error payloads are the raw response body: a string or { message }.
const errorText = (error, fallback) => {
  if (!error) return "";
  if (typeof error === "string") return error;
  return error.message || error.error || fallback;
};

const titleClass =
  "mb-0 font-tasa text-[24px] font-medium leading-[25px] tracking-[0.12px] text-[#222222]";
const subtitleClass =
  "mb-0 font-tasa text-[15px] font-normal leading-[25px] tracking-[0.075px] text-[#49475A]";

function NewForgotPasswordPage() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();

  const [step, setStep] = useState(STEP_REQUEST);

  // Step 1 — request a code
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [sending, setSending] = useState(false);

  // Step 2 — verify the code
  const [otpResetKey, setOtpResetKey] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [otpStatus, setOtpStatus] = useState("default");
  const [otpMessage, setOtpMessage] = useState("");
  const [verifiedCode, setVerifiedCode] = useState("");

  // Step 3 — new password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");
  const [saving, setSaving] = useState(false);

  const checks = passwordChecks(newPassword);
  const canReset = isPasswordValid(newPassword) && Boolean(confirmPassword);

  useEffect(
    () => () => {
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      dispatch({ type: "CLEAR_OTP_INVALID_ERROR" });
      dispatch({ type: "REMOVE_FORGOT_CHANGE_ERROR" });
    },
    [],
  );

  // ---- Step 1 -------------------------------------------------------------
  const handleContact = (e) => {
    setContact(e.target.value.trim().toLowerCase());
    setContactError("");
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const requestCode = () => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    dispatch({ type: "OTPSEND", payload: contact });
    setSending(true);
  };

  const handleSendCode = (e) => {
    e.preventDefault();
    if (sending) return;
    if (!contact) {
      setContactError("Please Enter Email ID");
      return;
    }
    if (!EMAIL_REGEX.test(contact)) {
      setContactError("Please Enter Valid Email ID");
      return;
    }
    requestCode();
  };

  // OTP sent (first time or resend).
  useEffect(() => {
    if (state.NewPass?.statusCode === 200) {
      setSending(false);
      setOtpStatus("default");
      setOtpMessage("");
      if (step === STEP_REQUEST) setStep(STEP_VERIFY);
      else setOtpResetKey((k) => k + 1);
      dispatch({ type: "CLEAR_OTP_STATUS_CODE" });
    }
  }, [state.NewPass?.statusCode]);

  useEffect(() => {
    if (state.NewPass?.emailError) {
      setSending(false);
      if (step === STEP_VERIFY) {
        setOtpStatus("error");
        setOtpMessage(errorText(state.NewPass.emailError, "Could not resend the code"));
      }
    }
  }, [state.NewPass?.emailError]);

  // ---- Step 2 -------------------------------------------------------------
  const handleVerify = (code) => {
    dispatch({ type: "CLEAR_OTP_INVALID_ERROR" });
    setOtpStatus("default");
    setOtpMessage("");
    setVerifiedCode(code);
    dispatch({
      type: "OTPVERIFYFORGOTPASSWORD",
      payload: { userId: state.NewPass?.userId, otp: code },
    });
    setVerifying(true);
  };

  const handleOtpEdit = () => {
    if (otpStatus === "error") {
      setOtpStatus("default");
      setOtpMessage("");
      dispatch({ type: "CLEAR_OTP_INVALID_ERROR" });
    }
  };

  useEffect(() => {
    if (state.NewPass?.statusCodeForgotOtp === 200) {
      setVerifying(false);
      setOtpStatus("success");
      setOtpMessage("Code verified");
      dispatch({ type: "REMOVE_OTPVERIFY_FORGOT_PASSWORD_STATUSCODE" });
    }
  }, [state.NewPass?.statusCodeForgotOtp]);

  // Let the green "Code verified" state show briefly, then move on. Keyed on
  // otpStatus (not the status code, which is cleared right away and would
  // cancel this timer).
  useEffect(() => {
    if (step !== STEP_VERIFY || otpStatus !== "success") return undefined;
    const id = setTimeout(() => setStep(STEP_RESET), 700);
    return () => clearTimeout(id);
  }, [otpStatus, step]);

  useEffect(() => {
    if (state.NewPass?.otpInvalidError) {
      setVerifying(false);
      setOtpStatus("error");
      setOtpMessage(
        errorText(state.NewPass.otpInvalidError, "Incorrect code. Please try again."),
      );
    }
  }, [state.NewPass?.otpInvalidError]);

  const changeContact = () => {
    dispatch({ type: "CLEAR_OTP_INVALID_ERROR" });
    setOtpStatus("default");
    setOtpMessage("");
    setStep(STEP_REQUEST);
  };

  // ---- Step 3 -------------------------------------------------------------
  const handleReset = (e) => {
    e.preventDefault();
    if (saving) return;
    dispatch({ type: "REMOVE_FORGOT_CHANGE_ERROR" });
    let hasError = false;
    if (!checks.noSpaces) {
      setPasswordError("Password cannot contain spaces.");
      hasError = true;
    } else if (!isPasswordValid(newPassword)) {
      setPasswordError("Password must meet the requirements below");
      hasError = true;
    }
    if (!confirmPassword) {
      setConfirmError("Please re-enter your new password");
      hasError = true;
    } else if (confirmPassword !== newPassword) {
      setConfirmError("Passwords don't match");
      hasError = true;
    }
    if (hasError) return;

    dispatch({
      type: "FORGETPAGE",
      payload: {
        password: newPassword,
        userId: state.NewPass?.userId,
        otp: state.NewPass?.Otp || verifiedCode,
      },
    });
    setSaving(true);
  };

  // Success toast comes from the saga; then back to sign in.
  useEffect(() => {
    if (state.NewPass?.status_codes === 200) {
      const id = setTimeout(() => {
        setSaving(false);
        dispatch({ type: "CLEAR_NEW_PASSWORD_STATUS_CODE" });
        navigate("/hostel-management-login");
      }, 1000);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [state.NewPass?.status_codes]);

  useEffect(() => {
    if (state.NewPass?.forgotPasswordError) setSaving(false);
  }, [state.NewPass?.forgotPasswordError]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setSending(false);
      setVerifying(false);
      setSaving(false);
    }
  }, [state.createAccount?.networkError]);

  // ---- View ---------------------------------------------------------------
  const serverContactError = errorText(state.NewPass?.emailError, "");
  const serverResetError = errorText(state.NewPass?.forgotPasswordError, "");

  let heading;
  if (step === STEP_REQUEST) {
    heading = (
      <div className="flex flex-col gap-[10px]">
        <h1 className={titleClass}>Forgot password?</h1>
        <p className={subtitleClass}>
          Enter your registered email to reset your password.
        </p>
      </div>
    );
  } else if (step === STEP_VERIFY) {
    heading = (
      <div className="flex flex-col gap-[4px]">
        <h1 className={titleClass}>Verification code</h1>
        <p className={`${subtitleClass} !text-[14px] tracking-[0.07px]`}>
          <SentToText contact={contact} />
        </p>
      </div>
    );
  } else {
    heading = (
      <div className="flex flex-col gap-[10px]">
        <h1 className={titleClass}>Create new password</h1>
        <p className={subtitleClass}>Choose a strong password for your account.</p>
      </div>
    );
  }

  return (
    <AuthLayout
      card={<ForgotPromoCard step={step} />}
      header={
        <div className="flex flex-col gap-[20px]">
          <AuthLogo />
          {heading}
        </div>
      }
    >
      {state.createAccount?.networkError ? (
        <ErrorMessage
          message={state.createAccount.networkError}
          type="error"
          className="mt-0"
        />
      ) : null}

      {step === STEP_REQUEST && (
        <>
          <form data-testid="new-forgot-password-page-send-verification-code-form"
            noValidate
            onSubmit={handleSendCode}
            className="flex w-full flex-col gap-[23px]"
          >
            <AuthField
              id="forgot-contact"
              label="Email Address"
              hasError={Boolean(contactError || serverContactError)}
              errors={[contactError, serverContactError]}
            >
              <input data-testid="new-forgot-password-page-registered-email-input"
                id="forgot-contact"
                type="email"
                inputMode="email"
                autoComplete="email"
                autoFocus
                placeholder="Enter your registered email"
                value={contact}
                onChange={handleContact}
                aria-invalid={Boolean(contactError || serverContactError) || undefined}
                className={authFieldInput}
              />
            </AuthField>
            <AuthSubmitButton
              loading={sending}
              dimmed={!contact}
              loadingText="Sending code..."
            >
              Send verification code
            </AuthSubmitButton>
          </form>

          <p className="mb-0 text-center font-tasa text-[16px] leading-[25px] tracking-[0.08px] text-[#49475A]">
            Remember your password?{" "}
            <button data-testid="new-forgot-password-page-back-to-sign-in-btn"
              type="button"
              onClick={() => navigate("/hostel-management-login")}
              className="border-0 bg-transparent p-0 font-bold text-primary-500 hover:underline"
            >
              Back to sign in
            </button>
          </p>
        </>
      )}

      {step === STEP_VERIFY && (
        <OtpVerifyPanel data-testid="new-forgot-password-page-forgot-otp-icon"
          id="forgot-otp"
          label="Enter the 6-digit code"
          submitText="Verify & Create new password"
          loadingText="Verifying..."
          loading={verifying}
          status={otpStatus}
          message={otpMessage}
          onSubmit={handleVerify}
          onEdit={handleOtpEdit}
          onResend={requestCode}
          resendBusy={sending}
          onChangeContact={changeContact}
          resetKey={otpResetKey}
        />
      )}

      {step === STEP_RESET && (
        <form data-testid="new-forgot-password-page-password-requirements-at-least-form"
          noValidate
          onSubmit={handleReset}
          className="flex w-full flex-col gap-[23px]"
        >
          <AuthField
            id="forgot-new-password"
            label="New password"
            hasError={Boolean(passwordError)}
            errors={[passwordError]}
          >
            <input data-testid="new-forgot-password-page-new-password-input"
              id="forgot-new-password"
              type={showNew ? "text" : "password"}
              autoComplete="new-password"
              autoFocus
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError("");
                dispatch({ type: "REMOVE_FORGOT_CHANGE_ERROR" });
              }}
              aria-invalid={Boolean(passwordError) || undefined}
              aria-describedby="forgot-password-rules"
              className={authFieldInput}
            />
            {newPassword && (
              <PasswordToggle shown={showNew} onToggle={() => setShowNew(!showNew)} />
            )}
          </AuthField>

          <AuthField
            id="forgot-confirm-password"
            label="Confirm new password"
            hasError={Boolean(confirmError)}
            errors={[confirmError]}
          >
            <input data-testid="new-forgot-password-page-re-enter-new-password-input"
              id="forgot-confirm-password"
              type={showConfirm ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmError("");
              }}
              aria-invalid={Boolean(confirmError) || undefined}
              className={authFieldInput}
            />
            {confirmPassword && (
              <PasswordToggle
                shown={showConfirm}
                onToggle={() => setShowConfirm(!showConfirm)}
              />
            )}
          </AuthField>

          <div id="forgot-password-rules" className="flex flex-col gap-[4px]">
            <p className="mb-0 font-tasa text-[13px] leading-[normal] text-[#64748B]">
              Password requirements
            </p>
            <ul className="mb-0 flex list-none flex-col gap-[4px] p-0">
              <PasswordRequirement met={checks.length}>At least 8 characters</PasswordRequirement>
              <PasswordRequirement met={checks.upperLower}>
                One uppercase and one lowercase letter
              </PasswordRequirement>
              <PasswordRequirement met={checks.numberSymbol}>
                One number and one symbol ({PASSWORD_SYMBOLS})
              </PasswordRequirement>
            </ul>
          </div>

          {serverResetError ? (
            <ErrorMessage message={serverResetError} type="error" className="mt-0" />
          ) : null}

          <AuthSubmitButton loading={saving} dimmed={!canReset} loadingText="Saving...">
            Reset password
          </AuthSubmitButton>
        </form>
      )}
    </AuthLayout>
  );
}

export default NewForgotPasswordPage;

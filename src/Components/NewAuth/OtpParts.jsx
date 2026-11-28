// OTP building blocks for the new auth screens (forgot password, signup).
// Figma "Smartstay Ver-3": OTP input 7243:255873 (6 boxes, 3-dash-3, states
// empty / typing / filled / error / success), Verify OTP 7225:255121,
// Verification code 7243:255397. TASA Orbiter like the rest of the auth flow.
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { AuthSubmitButton } from "./AuthParts";
import { authInlineLink } from "./authStyles";
import TickIcon from "../../Assets/Images/NewLogin/tick.svg";
import ErrorIcon from "../../Assets/Images/NewLogin/exclamation-circle.svg";
import SuccessIcon from "../../Assets/Images/NewLogin/check-circle.svg";

export const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

/** Seconds left on a countdown that restarts whenever `resetKey` changes. */
export function useCountdown(seconds, resetKey) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    setLeft(seconds);
  }, [resetKey, seconds]);
  useEffect(() => {
    if (left <= 0) return undefined;
    const id = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [left]);
  return left;
}

/**
 * "sriram@gmail.com" -> { strong: "sri", rest: "***@gmail.com" };
 * "9876543210" -> { strong: "", rest: "+91 ******3210" }.
 */
export const maskContact = (contact = "") => {
  if (contact.includes("@")) {
    const [user, domain] = contact.split("@");
    return {
      strong: user.slice(0, 3),
      rest: `${"*".repeat(Math.max(2, user.length - 3))}@${domain}`,
    };
  }
  return { strong: "", rest: `+91 ******${contact.slice(-4)}` };
};

/** "We've sent a 6-digit verification code to sri***@gmail.com" */
export function SentToText({ contact }) {
  const { strong, rest } = maskContact(contact);
  return (
    <>
      We&apos;ve sent a 6-digit verification code to{" "}
      <span className="text-[16px]">
        <strong className="font-bold">{strong}</strong>
        {rest}
      </span>
    </>
  );
}

SentToText.propTypes = { contact: PropTypes.string.isRequired };

const boxState = (status, focused, filled) => {
  if (status === "success") return "border-[1px] border-[#16A34A] bg-[#F0FDF4] text-[#111827]";
  if (status === "error") return "border-[1px] border-[#EF4444] bg-[#FEF2F2] text-[#DC2626]";
  if (focused)
    return "border-[1.5px] border-primary-500 bg-white text-[#111827] shadow-[0_0_0_3px_rgba(30,69,225,0.2)]";
  if (filled) return "border-[1px] border-[#9CA3AF] bg-white text-[#111827]";
  return "border-[1px] border-[#D1D5DB] bg-white text-[#111827]";
};

/**
 * Six one-digit boxes. Auto-advance, paste / SMS autofill fills all,
 * Backspace goes back, arrows move. `value` is a contiguous digit string.
 * size "md" = 44×52 grouped 3-3 (OTP input component); "lg" = 54×54 with
 * wide gaps (signup Verify OTP frame).
 */
export function OtpInput({
  id,
  value,
  onChange,
  size = "md",
  status = "default",
  autoFocus = false,
  disabled = false,
  describedBy,
  "data-testid": testId = "otp-parts-change-input",
}) {
  const refs = useRef([]);
  const [focused, setFocused] = useState(-1);
  const digits = Array.from({ length: OTP_LENGTH }, (_, i) => value[i] || "");

  // Latest code, updated before focus moves. Fast typing can fire the next
  // keystroke before the parent re-renders, so the `value` prop may be one
  // keystroke behind: reading it would drop digits and the left-to-right
  // guard in handleFocus would bounce focus back.
  const latest = useRef(value);
  useEffect(() => {
    latest.current = value;
  }, [value]);

  const commit = (next) => {
    latest.current = next;
    onChange(next);
  };

  const focusBox = (i) => {
    const target = refs.current[Math.max(0, Math.min(OTP_LENGTH - 1, i))];
    if (target) target.focus();
  };

  const fill = (i, text) => {
    const next = (latest.current.slice(0, i) + text).slice(0, OTP_LENGTH);
    commit(next);
    focusBox(next.length);
  };

  const handleChange = (e, i) => {
    const cur = latest.current;
    let typed = e.target.value.replace(/\D/g, "");
    if (!typed) return;
    // Typing over a filled box gives two characters: keep the new one.
    if (typed.length === 2 && cur[i]) {
      typed = typed[0] === cur[i] ? typed[1] : typed[0];
    }
    if (typed.length > 1) {
      fill(i, typed);
      return;
    }
    const next =
      i < cur.length ? cur.slice(0, i) + typed + cur.slice(i + 1) : cur + typed;
    commit(next.slice(0, OTP_LENGTH));
    focusBox(i + 1);
  };

  const handleKeyDown = (e, i) => {
    const cur = latest.current;
    if (e.key === "Backspace") {
      e.preventDefault();
      if (cur[i]) {
        commit(cur.slice(0, i) + cur.slice(i + 1));
      } else if (i > 0) {
        commit(cur.slice(0, i - 1) + cur.slice(i));
        focusBox(i - 1);
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      focusBox(i - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      focusBox(Math.min(i + 1, cur.length));
    }
  };

  const handlePaste = (e, i) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pasted) fill(i, pasted);
  };

  const handleFocus = (e, i) => {
    // Boxes fill left to right: jump to the first empty one.
    if (i > latest.current.length) {
      focusBox(latest.current.length);
      return;
    }
    setFocused(i);
    e.target.select();
  };

  const lg = size === "lg";
  return (
    <div
      role="group"
      aria-label="One-time code"
      aria-describedby={describedBy}
      className={`flex items-center ${lg ? "gap-[clamp(8px,3.2vw,23px)]" : "gap-[8px]"}`}
    >
      {digits.map((digit, i) => (
        <React.Fragment key={i}>
          {!lg && i === OTP_LENGTH / 2 && (
            <span aria-hidden="true" className="h-[2px] w-[8px] shrink-0 bg-[#D1D5DB]" />
          )}
          <input data-testid={`${testId}-${i}`}
            ref={(el) => {
              refs.current[i] = el;
            }}
            id={`${id}-${i}`}
            type="text"
            inputMode="numeric"
            autoComplete={i === 0 ? "one-time-code" : "off"}
            aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
            aria-invalid={status === "error" || undefined}
            autoFocus={autoFocus && i === 0}
            disabled={disabled}
            value={digit}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            onPaste={(e) => handlePaste(e, i)}
            onFocus={(e) => handleFocus(e, i)}
            onBlur={() => setFocused(-1)}
            className={`shrink-0 rounded-[8px] border-solid p-0 text-center font-tasa text-[20px] font-semibold leading-[28px] caret-primary-500 outline-none transition-[border-color,box-shadow,background-color] duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${
              lg ? "h-[54px] w-[clamp(40px,11vw,54px)]" : "h-[52px] w-[44px]"
            } ${boxState(status, focused === i, Boolean(digit))}`}
          />
        </React.Fragment>
      ))}
    </div>
  );
}

OtpInput.propTypes = {
  "data-testid": PropTypes.string,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["md", "lg"]),
  status: PropTypes.oneOf(["default", "error", "success"]),
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  describedBy: PropTypes.string,
};

/** Icon + 12px message under the boxes (error / success footer). */
export function OtpStatusLine({ id, status, message }) {
  const success = status === "success";
  return (
    <p
      id={id}
      role={success ? "status" : "alert"}
      className={`mb-0 flex items-center gap-[6px] font-tasa text-[12px] leading-[16px] ${
        success ? "text-[#15803D]" : "text-[#DC2626]"
      }`}
    >
      <img src={success ? SuccessIcon : ErrorIcon} alt="" width="16" height="16" />
      {message}
    </p>
  );
}

OtpStatusLine.propTypes = {
  id: PropTypes.string,
  status: PropTypes.oneOf(["error", "success"]).isRequired,
  message: PropTypes.node.isRequired,
};

/**
 * Whole OTP step: label + boxes + status, resend timer, submit button,
 * "Didn't receive the code? Resend OTP" (after the timer) and
 * "Wrong email? Change email address". Holds the typed code; the parent bumps
 * `resetKey` to clear it and restart the timer (after a resend).
 */
export function OtpVerifyPanel({
  id,
  label,
  size = "md",
  submitText,
  loadingText,
  loading = false,
  status = "default",
  message,
  onSubmit,
  onEdit,
  onResend,
  resendBusy = false,
  onChangeContact,
  changeText = "Change email address",
  wrongText = "Wrong email?",
  resetKey,
  hint,
}) {
  const [code, setCode] = useState("");
  const left = useCountdown(RESEND_SECONDS, resetKey);

  useEffect(() => {
    setCode("");
  }, [resetKey]);

  const complete = code.length === OTP_LENGTH;
  const statusId = `${id}-status`;

  return (
    <form data-testid="otp-parts-resend-code-in-00-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (complete && !loading) onSubmit(code);
      }}
      className="flex w-full flex-col gap-[23px]"
    >
      {hint}

      <div className="flex flex-col gap-[10px]">
        <label
          htmlFor={`${id}-0`}
          className="mb-0 font-tasa text-[14px] font-medium leading-[20px] text-[#111827]"
        >
          {label}
        </label>
        <OtpInput data-testid="otp-parts-code-input"
          id={id}
          size={size}
          value={code}
          status={status}
          autoFocus
          disabled={loading}
          describedBy={message ? statusId : undefined}
          onChange={(next) => {
            setCode(next);
            if (onEdit) onEdit();
          }}
        />
        {message && status !== "default" && (
          <OtpStatusLine id={statusId} status={status} message={message} />
        )}
      </div>

      <p className="mb-0 font-tasa text-[15px] leading-[24px] text-[#64748B]" aria-live="polite">
        Resend code in 00:{String(left).padStart(2, "0")}
      </p>

      <AuthSubmitButton data-testid="otp-verify-btn" loading={loading} dimmed={!complete} loadingText={loadingText}>
        {submitText}
      </AuthSubmitButton>

      <div className="flex flex-col gap-[10px] text-center font-tasa text-[#49475A]">
        {left === 0 && (
          <p className="mb-0 text-[16px] leading-[25px] tracking-[0.08px]">
            Didn&apos;t receive the code?{"  "}
            <button data-testid="otp-parts-resend-otp-btn"
              type="button"
              onClick={onResend}
              disabled={resendBusy || loading}
              className={`${authInlineLink} disabled:cursor-not-allowed disabled:opacity-50`}
            >
              Resend OTP
            </button>
          </p>
        )}
        <p className="mb-0 text-[15px] leading-[24px]">
          {wrongText}{" "}
          <button data-testid="otp-parts-change-contact-btn"
            type="button"
            onClick={onChangeContact}
            disabled={loading}
            className="border-0 bg-transparent p-0 font-semibold text-primary-500 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            {changeText}
          </button>
        </p>
      </div>
    </form>
  );
}

OtpVerifyPanel.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  size: PropTypes.oneOf(["md", "lg"]),
  submitText: PropTypes.node.isRequired,
  loadingText: PropTypes.node,
  loading: PropTypes.bool,
  status: PropTypes.oneOf(["default", "error", "success"]),
  message: PropTypes.node,
  onSubmit: PropTypes.func.isRequired,
  onEdit: PropTypes.func,
  onResend: PropTypes.func.isRequired,
  resendBusy: PropTypes.bool,
  onChangeContact: PropTypes.func.isRequired,
  changeText: PropTypes.node,
  wrongText: PropTypes.node,
  resetKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  hint: PropTypes.node,
};

/**
 * Backend password rules (same as CreateAccount.jsx / signup): no spaces,
 * 8+ characters, upper + lower case, a number and a symbol from @$!%*?&.
 * Shared by signup and reset password so both validate the same way.
 */
export const PASSWORD_SYMBOLS = "@$!%*?&";

export const passwordChecks = (value = "") => ({
  noSpaces: !/\s/.test(value),
  length: value.length >= 8,
  upperLower: /[a-z]/.test(value) && /[A-Z]/.test(value),
  numberSymbol: /\d/.test(value) && /[@$!%*?&]/.test(value),
});

export const isPasswordValid = (value) =>
  Object.values(passwordChecks(value)).every(Boolean);

// Signup's inline messages (unchanged wording).
export const passwordRuleErrors = (value) => {
  const c = passwordChecks(value);
  const messages = [];
  if (!c.noSpaces) messages.push("Password cannot contain spaces.");
  if (!c.length) messages.push("8 characters minimum");
  if (!c.upperLower) messages.push("One uppercase and lowercase");
  if (!c.numberSymbol) messages.push("Numeric and Special symbols");
  return messages;
};

/** One "Password requirements" row: green tick when met, grey when not. */
export function PasswordRequirement({ met, children }) {
  return (
    <li className="flex items-center gap-[10px]">
      <img
        src={TickIcon}
        alt=""
        width="24"
        height="24"
        className={`transition-[filter,opacity] duration-200 ${met ? "" : "opacity-40 grayscale"}`}
      />
      <span
        className={`font-tasa text-[16px] leading-[normal] transition-colors duration-200 ${
          met ? "text-[#222222]" : "text-[#64748B]"
        }`}
      >
        {children}
        <span className="sr-only">{met ? " (done)" : " (not yet)"}</span>
      </span>
    </li>
  );
}

PasswordRequirement.propTypes = {
  met: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

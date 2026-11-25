// Building blocks shared by the new auth screens (NewLoginPage, NewSignupPage).
// Composition only — no API logic lives here; each page owns its own flow.
import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Eye, EyeSlash } from "iconsax-react";
import ErrorMessage from "../ErrorMessage";
import {
  authComingSoon,
  authFieldShell,
  authInlineLink,
  authLabelText,
} from "./authStyles";
import LogoMark from "../../Assets/Images/NewLogin/logo-mark.svg";
import LogoWordmark from "../../Assets/Images/NewLogin/logo-wordmark.svg";
import GoogleIcon from "../../Assets/Images/NewLogin/google-g.png";
import GooglePlayBadge from "../../Assets/Images/NewLogin/google-play.svg";
import AppStoreBadge from "../../Assets/Images/NewLogin/app-store.svg";

/**
 * Page shell.
 * - lg+: one screen, no page scroll. The promo card (≤40% wide) and the form
 *   column are centred side by side and share the same height (--auth-h), so
 *   their top and bottom lines match. `header` (logo + title) and `footer`
 *   (primary action) stay fixed; only `children` (the fields) scroll, and they
 *   clip exactly at the card's top / bottom line. Short content (login) is
 *   centred as one block.
 * - below lg: no card, normal page scroll.
 * "New to Smartstay? Book Demo" is pinned to the top-right on every size
 * (fixed, because global CSS gives <body> overflow-x:hidden, which breaks
 * position:sticky).
 */
export function AuthLayout({ card, header, footer, children }) {
  const navigate = useNavigate();
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-white font-tasa [--auth-h:min(880px,calc(100vh-112px))] lg:h-screen lg:flex-row lg:items-center lg:justify-center lg:gap-[clamp(40px,6vw,117px)] lg:overflow-hidden lg:px-[clamp(24px,4.3vw,66px)]">
      {/* top-[0px], not top-0: Bootstrap's .top-0 is !important and would
          beat the lg:top value. */}
      <p className="fixed inset-x-0 top-[0px] z-20 mb-0 bg-white/95 px-[16px] py-[12px] text-right font-tasa text-[16px] leading-[25px] tracking-[0.08px] text-[#49475A] sm:px-[32px] lg:absolute lg:left-auto lg:right-[clamp(24px,6.5vw,99px)] lg:top-[clamp(12px,3.5vh,46px)] lg:bg-transparent lg:p-0">
        New to Smartstay?{"  "}
        <button
          type="button"
          onClick={() => navigate("/demo")}
          className={authInlineLink}
        >
          Book Demo
        </button>
      </p>

      {card}

      {/* mx-[auto] / lg:mx-[0px], not mx-auto / lg:mx-0: Bootstrap's .mx-auto
          is !important and would keep auto margins on lg, pushing the column
          off-centre. */}
      <main className="mx-[auto] flex w-full max-w-[580px] flex-col px-[16px] pb-[32px] pt-[64px] lg:mx-[0px] lg:h-[var(--auth-h)] lg:min-w-0 lg:max-w-[548px] lg:flex-[0_1_548px] lg:justify-center lg:p-0">
        {header && <div className="shrink-0 pb-[20px]">{header}</div>}
        {/* 4px inset so focus rings are not clipped by the scroll box. The
            scrollbar is hidden (it narrowed the fields vs. the footer button);
            12px fade edges show there is more to scroll. */}
        <div className="-mx-[4px] flex min-h-0 flex-col gap-[20px] p-[4px] lg:overflow-y-auto lg:py-[12px] lg:[mask-image:linear-gradient(to_bottom,transparent,#000_12px,#000_calc(100%-12px),transparent)] lg:[scrollbar-width:none] lg:[&::-webkit-scrollbar]:hidden">
          {children}
        </div>
        {footer && <div className="shrink-0 pt-[20px]">{footer}</div>}
      </main>

      {/* lg: pinned in the bottom gutter under the card + form; below lg: end of page. */}
      <p className="mb-0 px-[16px] pb-[16px] text-center font-tasa text-[12px] leading-[18px] text-[#686677] lg:absolute lg:inset-x-0 lg:bottom-[clamp(10px,2.2vh,20px)] lg:p-0">
        © 2026, S3 Remotica Technologies Pvt. Ltd. All Rights Reserved.
      </p>
    </div>
  );
}

AuthLayout.propTypes = {
  card: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.node,
};

/** Smartstay mark + wordmark (Figma "Container" 55px row); links home. */
export function AuthLogo() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      aria-label="Smartstay home"
      className="relative h-[55px] w-[268px] shrink-0 border-0 bg-transparent p-0"
    >
      <img
        src={LogoMark}
        alt=""
        width="62"
        height="61.4676"
        className="absolute left-[-8px] top-[-4px]"
      />
      <img
        src={LogoWordmark}
        alt="Smartstay"
        width="196.233"
        height="29.96"
        className="absolute left-[53px] top-[19px]"
      />
    </button>
  );
}

/**
 * Label (+ optional red "*" and right-side action) → field box → messages.
 * `errors` is a list of strings; empty values are skipped.
 */
export function AuthField({
  id,
  label,
  required = false,
  action,
  hasError = false,
  heightClass = "h-[54px]",
  errors = [],
  children,
}) {
  const shown = errors.filter(Boolean);
  return (
    <div className="flex w-full flex-col gap-[12px]">
      <div className="flex items-center justify-between">
        <label htmlFor={id} className={`flex items-center gap-[10px] ${authLabelText}`}>
          {label}
          {required && (
            <span aria-hidden="true" className="text-[16px] text-field-error">
              *
            </span>
          )}
        </label>
        {action}
      </div>
      <div className={authFieldShell(hasError, heightClass)}>{children}</div>
      {shown.map((msg) => (
        <ErrorMessage
          key={Array.isArray(msg) ? msg.join("|") : msg}
          message={msg}
          type="error"
          className="-mt-[6px]"
        />
      ))}
    </div>
  );
}

AuthField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  required: PropTypes.bool,
  action: PropTypes.node,
  hasError: PropTypes.bool,
  heightClass: PropTypes.string,
  errors: PropTypes.array,
  children: PropTypes.node,
};

/** Eye / eye-slash toggle shown inside a password field. */
export function PasswordToggle({ shown, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={shown ? "Hide password" : "Show password"}
      className="flex shrink-0 items-center border-0 bg-transparent p-0"
    >
      {shown ? (
        <Eye size={22} color="#49475A" />
      ) : (
        <EyeSlash size={22} color="#49475A" />
      )}
    </button>
  );
}

PasswordToggle.propTypes = {
  shown: PropTypes.bool,
  onToggle: PropTypes.func.isRequired,
};

/** Brand primary button (Sign in / Create Account) with loading spinner. */
export function AuthSubmitButton({
  loading = false,
  dimmed = false,
  disabled = false,
  loadingText,
  form,
  children,
}) {
  let state = "hover:bg-primary-700";
  if (loading || disabled) state = "cursor-not-allowed opacity-40";
  else if (dimmed) state = "opacity-40";
  if (loading) state = "cursor-not-allowed opacity-70";
  return (
    <button
      type="submit"
      form={form}
      disabled={loading || disabled}
      className={`flex h-[50px] w-full items-center justify-center gap-[8px] rounded-[8px] border-0 bg-primary-500 font-tasa text-[20px] font-medium text-white transition-opacity focus-visible:shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_#0485F7] ${state}`}
    >
      {loading ? (
        <>
          <span className="h-[16px] w-[16px] animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

AuthSubmitButton.propTypes = {
  loading: PropTypes.bool,
  dimmed: PropTypes.bool,
  disabled: PropTypes.bool,
  loadingText: PropTypes.node,
  // id of the <form> when the button sits outside it (fixed footer).
  form: PropTypes.string,
  children: PropTypes.node,
};

/**
 * Google button — visible as designed, disabled until the Google auth API
 * exists. No SDK, no client id, no handler.
 */
export function GoogleAuthButton({ label }) {
  return (
    // TODO(auth): enable when Google sign-in API is ready
    <span title="Coming soon" className="block w-full">
      <button
        type="button"
        disabled
        aria-disabled="true"
        tabIndex={-1}
        className={`flex h-[50px] w-full items-center justify-center gap-[17px] rounded-[8px] border-[1px] border-solid border-[#DDDDDD] bg-white ${authComingSoon}`}
      >
        <img src={GoogleIcon} alt="" className="h-[23px] w-[23px] object-cover" />
        <span className="font-tasa text-[18px] font-medium text-[#222222] sm:text-[20px]">
          {label}
        </span>
      </button>
    </span>
  );
}

GoogleAuthButton.propTypes = {
  label: PropTypes.node.isRequired,
};

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.qbatz.smartstay&hl=en_IN";

/** Google Play badge (live link) / App Store badge (disabled until its link exists). */
export function StoreBadges() {
  return (
    <div className="flex min-h-[92px] w-full flex-wrap items-center justify-center gap-[10px]">
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-[8px] transition-opacity hover:opacity-80 focus-visible:shadow-[0_0_0_2px_#0485F7] focus-visible:outline-none"
      >
        <img
          src={GooglePlayBadge}
          alt="Get it on Google Play"
          width="148.004"
          height="47.3612"
        />
      </a>
      {/* TODO(auth): enable when the App Store app link is ready */}
      <span title="Coming soon">
        <button
          type="button"
          disabled
          aria-disabled="true"
          tabIndex={-1}
          className={`border-0 bg-transparent p-0 ${authComingSoon}`}
        >
          <img
            src={AppStoreBadge}
            alt="Download on the App Store"
            width="160"
            height="47"
          />
        </button>
      </span>
    </div>
  );
}

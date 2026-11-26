// Shared class strings for the new auth screens (login, signup, ...).
// Source: Figma "Smartstay Ver-3" auth section 5352:153217 + the
// "New design System" Input page (iYflViMrr1kQSivg9hlBsy). Auth screens use
// TASA Orbiter (not Gilroy) and sit outside the app-wide FieldStyles.js rollout.
//
// Tailwind only generates classes that appear literally in source, so callers
// pass whole literals (e.g. "h-[50px]"), never built-up strings.
import { fieldSelectStyles } from "../../Utils/FieldStyles";

// Field box: 1px #D9D9D9 stroke, 8px radius, hover rgba(249,249,249,0.92),
// 2px #0485F7 focus ring, #FF383C error stroke, 50% opacity when disabled.
export const authFieldShell = (hasError = false, heightClass = "h-[54px]") =>
  [
    "flex w-full items-center gap-[10px] rounded-[8px] border-[1px] border-solid bg-white px-[16px]",
    heightClass,
    hasError ? "border-field-error" : "border-[#D9D9D9]",
    "hover:bg-field-hover focus-within:bg-white focus-within:shadow-[0_0_0_2px_#0485F7]",
    "transition-[background-color,box-shadow] duration-150",
    // Only a disabled <input> dims the whole field (not e.g. the +91 button).
    "has-[input:disabled]:cursor-not-allowed has-[input:disabled]:opacity-50 has-[input:disabled]:hover:bg-white",
  ].join(" ");

// Browser autofill paints its own blue background on the <input> only, which
// left the field's padding white (two-tone field). The long background
// transition keeps the autofill colour from ever painting, so the whole field
// keeps the normal / hover colour; the text-fill keeps the text #222.
export const authFieldInput =
  "h-full min-w-0 flex-1 border-0 bg-transparent p-0 font-tasa text-[16px] text-[#222222] outline-none placeholder:text-[#9C9C9C] placeholder:opacity-100 disabled:cursor-not-allowed [&:-webkit-autofill]:[transition:background-color_600000s_0s,color_600000s_0s] [&:-webkit-autofill]:[-webkit-text-fill-color:#222222] [&:autofill]:[transition:background-color_600000s_0s,color_600000s_0s]";

export const authLabelText =
  "mb-0 font-tasa text-[14px] font-normal leading-[normal] text-[#222222]";

// Underlined brand link inside running text ("Book Demo", "Create Account").
export const authInlineLink =
  "border-0 bg-transparent p-0 font-semibold text-primary-500 underline";

// Disabled "coming soon" controls: visible as designed, never actionable.
export const authComingSoon = "cursor-not-allowed opacity-50";

// react-select styles for auth fields: the shared Figma Select anatomy
// (FieldStyles.fieldSelectStyles: menu, options, focus ring) resized to the auth
// field (50px, #D9D9D9 stroke, TASA 16px). `leftPad` leaves room for an icon.
export const authSelectStyles = (hasError = false, leftPad = 16) => {
  const base = fieldSelectStyles(hasError);
  const font = { fontFamily: '"TASA Orbiter", sans-serif', fontSize: "16px" };
  return {
    ...base,
    control: (b, s) => ({
      ...base.control(b, s),
      ...font,
      fontWeight: 400,
      minHeight: "var(--auth-field-h, 50px)",
      height: "var(--auth-field-h, 50px)",
      border: `1px solid ${hasError ? "#FF383C" : "#D9D9D9"}`,
      "&:hover": {
        borderColor: hasError ? "#FF383C" : "#D9D9D9",
        backgroundColor: s.isFocused ? "#FFFFFF" : "rgba(249,249,249,0.92)",
      },
    }),
    valueContainer: (b) => ({ ...b, padding: `0 8px 0 ${leftPad}px`, minWidth: 0 }),
    placeholder: (b) => ({ ...b, color: "#9C9C9C", fontWeight: 400 }),
    singleValue: (b) => ({ ...b, color: "#222222", fontWeight: 400 }),
    input: (b) => ({ ...b, margin: 0, padding: 0, color: "#222222" }),
    indicatorsContainer: (b) => ({ ...b, height: "calc(var(--auth-field-h, 50px) - 2px)" }),
    option: (b, s) => ({ ...base.option(b, s), ...font, fontSize: "15px", fontWeight: 400 }),
    noOptionsMessage: (b) => ({ ...base.noOptionsMessage(b), ...font, fontSize: "14px" }),
  };
};

// Card wrapper shared by the left promo cards (desktop only). Width scales
// with the screen up to 40%; height is the shared --auth-h set by AuthLayout,
// so the card and the form column always share the same top / bottom line.
export const authCardBase =
  "relative hidden shrink-0 overflow-hidden rounded-[16px] lg:block lg:h-[var(--auth-h)] lg:w-[40%] lg:max-w-[640px]";

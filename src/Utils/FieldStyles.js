// Shared form-field styles following the Figma input anatomy
// (Smartstay Ver-3: "Input anatomy" 7135:154955, Input variants 7135:154966,
// Select 7137:159937):
//   default / filled : white, 1px #DEDEE0 stroke, no shadow (SmartStay decision)
//   hover            : background rgba(249,249,249,0.92)
//   focus            : white, 2px #0485F7 focus ring (no field shadow)
//   error            : 1px #FF383C border (message below via <ErrorMessage>)
//   disabled         : 50% opacity
//   placeholder      : #71717A
// SmartStay keeps Gilroy, 14px text and the existing 8px radius (the HeroUI kit
// uses Inter / 12px). Heights follow the anatomy: 44px.
//
// Tailwind "!" is used because react-bootstrap's .form-control and antd's
// .ant-picker ship their own border / focus styles.

const FIELD_BORDER = "#DEDEE0";
const FOCUS_RING = "0 0 0 2px #0485F7";

const TEXT =
  "font-gilroy !text-[14px] !font-medium !leading-[20px] !text-field-text placeholder:!text-field-placeholder placeholder:!font-normal placeholder:!opacity-100";

// App.css styles every `.form-control::placeholder` (grey, 50% opacity,
// !important); these doubled-class variants win over it for our fields only.
const FORM_CONTROL_PLACEHOLDER =
  "[&.form-control::placeholder]:!text-field-placeholder [&.form-control::placeholder]:!opacity-100 [&.form-control::placeholder]:!font-normal";

const border = (hasError) =>
  hasError ? "!border-field-error" : "!border-field-border";

/** Single <input> / react-bootstrap <FormControl> / <textarea>. */
export const fieldClass = (hasError = false) =>
  [
    "block w-full !h-[44px] !px-[12px] !rounded-[8px] !border-[1px] !border-solid !outline-none",
    TEXT,
    FORM_CONTROL_PLACEHOLDER,
    border(hasError),
    `!bg-white hover:!bg-[rgba(249,249,249,0.92)] focus:!bg-white !shadow-none focus:!shadow-[0_0_0_2px_#0485F7]`,
    "transition-[background-color,box-shadow] duration-150",
    "disabled:!opacity-50 disabled:cursor-not-allowed",
  ].join(" ");

/**
 * A field made of several parts (e.g. "+91 ⌄ | number", "₹ | amount"): the
 * wrapper carries the anatomy, the inner <input> uses `fieldInnerInputClass`.
 * `variant="secondary"` is the filled grey field (Figma secondary input).
 */
export const fieldGroupClass = (hasError = false, variant = "primary") =>
  [
    "flex w-full items-center gap-[6px] !rounded-[8px] !border-[1px] !border-solid px-[12px]",
    border(hasError),
    variant === "secondary"
      ? "h-[48px] bg-[#EBEBEC] focus-within:bg-white"
      : "h-[44px] bg-white hover:bg-[rgba(249,249,249,0.92)] focus-within:!bg-white",
    "focus-within:!shadow-[0_0_0_2px_#0485F7] transition-[background-color,box-shadow] duration-150",
    "has-[:disabled]:opacity-50",
  ].join(" ");

export const fieldInnerInputClass = [
  "h-full min-w-0 flex-1 border-0 bg-transparent p-0 outline-none",
  TEXT,
  "disabled:cursor-not-allowed",
].join(" ");

/** antd <DatePicker className={...}> */
// App.css forces `.ant-picker` / `.ant-picker-focused` borders and shadows with
// !important, so the picker states use doubled-class variants.
export const datePickerClass = (hasError = false) =>
  [
    "!w-full !h-[44px] !px-[12px] !rounded-[8px] !border-[1px] !border-solid",
    hasError
      ? "[&.ant-picker]:!border-field-error [&.ant-picker-focused]:!border-field-error"
      : "[&.ant-picker]:!border-field-border [&.ant-picker-focused]:!border-field-border",
    "!bg-white hover:!bg-[rgba(249,249,249,0.92)]",
    "[&.ant-picker]:!shadow-none",
    "[&.ant-picker-focused]:!bg-white [&.ant-picker-focused]:!shadow-[0_0_0_2px_#0485F7]",
    "[&_input]:!font-gilroy [&_input]:!text-[14px] [&_input]:!font-medium",
    "[&.ant-picker_.ant-picker-input>input::placeholder]:!text-field-placeholder [&.ant-picker_.ant-picker-input>input::placeholder]:!opacity-100 [&.ant-picker_.ant-picker-input>input::placeholder]:!font-normal",
  ].join(" ");

/**
 * react-datepicker <DatePicker className={...}>: its className lands on the
 * <input> itself, so it gets the plain field anatomy plus room on the right
 * for the overlaid Calendar icon. (datePickerClass is for antd only.)
 */
export const datePickerInputClass = (hasError = false) =>
  `${fieldClass(hasError)} !pr-[40px]`;

/** react-select `styles` for the Figma Select (closed + open states). */
export const fieldSelectStyles = (hasError = false) => ({
  control: (base, state) => ({
    ...base,
    minHeight: "44px",
    height: "44px",
    borderRadius: "8px",
    border: `1px solid ${hasError ? "#FF383C" : FIELD_BORDER}`,
    boxShadow: state.isFocused ? FOCUS_RING : "none",
    backgroundColor: "#FFFFFF",
    opacity: state.isDisabled ? 0.5 : 1,
    fontFamily: "Gilroy, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    transition: "background-color 150ms, box-shadow 150ms",
    "&:hover": {
      borderColor: hasError ? "#FF383C" : FIELD_BORDER,
      backgroundColor: state.isFocused ? "#FFFFFF" : "rgba(249,249,249,0.92)",
    },
  }),
  valueContainer: (base) => ({ ...base, padding: "0 12px", minWidth: 0 }),
  placeholder: (base) => ({ ...base, color: "#71717A", fontWeight: 400 }),
  singleValue: (base) => ({ ...base, color: "#18181B", fontWeight: 500 }),
  input: (base) => ({ ...base, margin: 0, padding: 0, color: "#18181B" }),
  indicatorSeparator: () => ({ display: "none" }),
  indicatorsContainer: (base) => ({ ...base, height: "42px" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "0 12px",
    color: "#18181B",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
    transition: "transform 150ms",
  }),
  menu: (base) => ({
    ...base,
    marginTop: "8px",
    borderRadius: "12px",
    border: "none",
    padding: "4px",
    boxShadow:
      "0px 14px 28px rgba(0,0,0,0.08), 0px -6px 12px rgba(0,0,0,0.03), 0px 2px 8px rgba(0,0,0,0.06)",
    backgroundColor: "#FFFFFF",
    zIndex: 9999,
    overflow: "hidden",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 10001 }),
  menuList: (base) => ({ ...base, padding: 0, maxHeight: "220px" }),
  option: (base, state) => ({
    ...base,
    minHeight: "36px",
    padding: "6px 12px",
    borderRadius: "10px",
    fontFamily: "Gilroy, sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: state.isDisabled ? "#A1A1AA" : "#18181B",
    backgroundColor: state.isSelected
      ? "#EBEFFF"
      : state.isFocused
        ? "#F4F4F5"
        : "transparent",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    "&:active": { backgroundColor: "#EBEFFF" },
  }),
  noOptionsMessage: (base) => ({
    ...base,
    fontFamily: "Gilroy, sans-serif",
    fontSize: "14px",
    color: "#71717A",
  }),
});

/** Multi-line <textarea>: same anatomy as fieldClass, auto height. */
export const fieldTextareaClass = (hasError = false) =>
  [
    "block w-full min-h-[96px] !px-[12px] !py-[10px] !rounded-[8px] !border-[1px] !border-solid !outline-none resize-none",
    TEXT,
    FORM_CONTROL_PLACEHOLDER,
    border(hasError),
    `!bg-white hover:!bg-[rgba(249,249,249,0.92)] focus:!bg-white !shadow-none focus:!shadow-[0_0_0_2px_#0485F7]`,
    "transition-[background-color,box-shadow] duration-150",
    "disabled:!opacity-50 disabled:cursor-not-allowed",
  ].join(" ");

/**
 * react-select placed INSIDE a `fieldGroupClass` wrapper (e.g. the "+91" country
 * code before a mobile number): no own border/shadow/ring, the wrapper owns them.
 */
export const fieldEmbeddedSelectStyles = () => {
  const base = fieldSelectStyles();
  return {
    ...base,
    control: (b, state) => ({
      ...b,
      minHeight: "40px",
      height: "40px",
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      fontFamily: "Gilroy, sans-serif",
      fontSize: "14px",
      fontWeight: 500,
      cursor: state.isDisabled ? "not-allowed" : "pointer",
      "&:hover": { border: "none", backgroundColor: "transparent" },
    }),
    valueContainer: (b) => ({ ...b, padding: 0 }),
    indicatorsContainer: (b) => ({ ...b, height: "40px" }),
    dropdownIndicator: (b, state) => ({
      ...base.dropdownIndicator(b, state),
      padding: "0 4px",
    }),
    menu: (b) => ({ ...base.menu(b), minWidth: "96px" }),
  };
};

// Text around fields (labels keep SmartStay's 14px #222; helper = Figma muted).
// Smartstay Ver-3 field frame 3497:142969: label -> field 10px, "*" 10px after
// the label text, field -> note 10px. Never use `m-0` here: Bootstrap's
// `.m-0 { margin: 0 !important }` would wipe the 10px gap.
export const fieldLabelClass =
  "mx-0 mt-0 !mb-[10px] block font-gilroy text-b3 font-medium text-ink";
export const fieldRequiredClass = "ml-[10px] text-field-error";
export const fieldHelperClass =
  "mx-0 mb-0 mt-[10px] block font-gilroy text-c1 text-ink-muted";

// Small building blocks shared by the onboarding steps (Figma "property
// Setup" 5671:181084). Fields reuse Utils/FieldStyles; chips, property-type
// cards and panels follow the step frames.
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Select, { components } from "react-select";
import ButtonSpinner from "../../Utils/ButtonSpinner";
import ArrowRight from "../../Assets/Images/Onboarding/arrow-right.svg";
import TickWhite from "../../Assets/Images/Onboarding/tick-white.svg";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";
import { BTN_PRIMARY, BTN_TERTIARY } from "../../Utils/ButtonStyles";
import ChipCheck from "../../Assets/Images/Onboarding/chip-check.svg";
import TimerIcon from "../../Assets/Images/Onboarding/timer.svg";

// Figma "Save & Continue" / "Finish Setup": brand, 40px, radius 8 (not pill),
// 60% opacity while the step is incomplete.
export const STEP_PRIMARY_BTN = `${BTN_PRIMARY} !rounded-[8px] !px-[16px] min-w-[160px] aria-disabled:opacity-60 aria-disabled:hover:bg-primary-500 aria-disabled:cursor-not-allowed`;
export const STEP_BACK_BTN = `${BTN_TERTIARY} !rounded-[8px]`;

export const errorId = (id) => `${id}-error`;

/**
 * Per-step form behaviour: errors show after a field is touched or after a
 * submit attempt; submitting an invalid step focuses the first invalid field;
 * the first field gets focus when the step opens.
 * `fieldIds` maps error keys to DOM ids, in visual order.
 */
export function useStepForm(errors, fieldIds) {
  const [touched, setTouched] = useState({});
  const [showAll, setShowAll] = useState(false);
  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    const first = Object.values(fieldIds)[0];
    const el = first && document.getElementById(first);
    if (el) el.focus({ preventScroll: false });
    // Run once when the step mounts.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const touch = useCallback((field) => {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }, []);

  const errorFor = (field) => (showAll || touched[field] ? errors[field] || "" : "");

  const handleSubmit = (onValid) => (e) => {
    e?.preventDefault();
    if (isValid) {
      onValid();
      return;
    }
    setShowAll(true);
    const firstKey = Object.keys(fieldIds).find((key) => errors[key]);
    const el = firstKey && document.getElementById(fieldIds[firstKey]);
    if (el) el.focus();
  };

  return { touch, errorFor, handleSubmit, isValid };
}

/** Footer: optional Back + primary (Save & Continue / Finish Setup). */
export function StepActions({ onBack, label, icon, invalid, loading, loadingLabel }) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-[12px] pt-[10px]">
      {onBack && (
        <button type="button" onClick={onBack} disabled={loading} className={STEP_BACK_BTN}>
          Back
        </button>
      )}
      <button
        type="submit"
        aria-disabled={invalid || loading || undefined}
        aria-busy={loading || undefined}
        className={STEP_PRIMARY_BTN}
      >
        {loading ? (
          <ButtonSpinner label={loadingLabel} />
        ) : (
          <>
            {icon === "check" && <img src={TickWhite} alt="" width="21" height="21" />}
            {label}
            {icon === "arrow" && <img src={ArrowRight} alt="" width="17" height="17" />}
          </>
        )}
      </button>
    </div>
  );
}

StepActions.propTypes = {
  onBack: PropTypes.func,
  label: PropTypes.node.isRequired,
  icon: PropTypes.oneOf(["arrow", "check"]),
  invalid: PropTypes.bool,
  loading: PropTypes.bool,
  loadingLabel: PropTypes.string,
};

/** Label + control + inline error (aria-live) using the field anatomy. */
export function FormField({ id, label, required, error, action, children, className = "" }) {
  return (
    <div className={`flex min-w-0 flex-col ${className}`}>
      <div className="flex items-start justify-between gap-[12px]">
        <label htmlFor={id} className={fieldLabelClass}>
          {label}
          {required && (
            <span className={fieldRequiredClass} aria-hidden>
              *
            </span>
          )}
          {required && <span className="sr-only"> (required)</span>}
        </label>
        {action}
      </div>
      {children}
      <div id={errorId(id)} aria-live="polite">
        {error ? (
          <ErrorMessage className="mt-[6px]" message={error} type="error" />
        ) : null}
      </div>
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  required: PropTypes.bool,
  error: PropTypes.string,
  action: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
};

/** Inline error for a group (chips, cards, photo grid). */
export function GroupError({ id, error }) {
  return (
    <div id={errorId(id)} aria-live="polite">
      {error ? <ErrorMessage className="mt-[6px]" message={error} type="error" /> : null}
    </div>
  );
}

GroupError.propTypes = { id: PropTypes.string.isRequired, error: PropTypes.string };

/** Figma chip: 32px pill; selected = #EEF2FF + brand border + check icon. */
export function ChoiceChips({
  name,
  legend,
  options,
  value,
  multiple = false,
  onChange,
  disabled = false,
  legendClassName = "",
  error,
}) {
  const selected = multiple ? value || [] : [value];
  const toggle = (optionValue) => {
    if (!multiple) {
      onChange(optionValue);
      return;
    }
    const next = selected.includes(optionValue)
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue];
    onChange(next);
  };

  return (
    <fieldset
      className="m-0 flex min-w-0 flex-col gap-[8px] border-0 p-0"
      aria-describedby={error ? errorId(name) : undefined}
      disabled={disabled}
    >
      {legend && (
        <legend
          // A <legend> is not a flex item, so the fieldset gap skips it:
          // the 10px label → chips space is its own margin.
          className={`float-none mb-[10px] w-auto p-0 font-gilroy text-[12px] font-medium uppercase leading-[normal] text-[#64748B] ${legendClassName}`}
        >
          {legend}
        </legend>
      )}
      <div className="flex flex-wrap items-center gap-[10px]">
        {options.map((opt) => {
          const on = selected.includes(opt.value);
          const inputId = `${name}-${opt.value}`;
          return (
            <label
              key={opt.value}
              htmlFor={inputId}
              className={`group relative m-0 flex h-[32px] cursor-pointer items-center gap-[8px] rounded-[31px] border-[0.8px] border-solid px-[12.8px] font-gilroy text-[12px] leading-[24px] transition-colors ${
                on
                  ? "border-primary-500 bg-[#EEF2FF] font-semibold text-primary-500"
                  : "border-[#E4E4E7] bg-white font-normal text-[#6F767E] hover:bg-ink-50"
              } ${disabled ? "cursor-not-allowed opacity-50" : ""} has-[:focus-visible]:shadow-[0_0_0_2px_#0485F7]`}
            >
              <input
                id={inputId}
                type={multiple ? "checkbox" : "radio"}
                name={name}
                value={opt.value}
                checked={on}
                onChange={() => toggle(opt.value)}
                className="peer absolute inset-0 m-0 h-full w-full cursor-[inherit] opacity-0"
              />
              {on && <img src={ChipCheck} alt="" width="20" height="20" />}
              <span className="whitespace-nowrap">{opt.label}</span>
            </label>
          );
        })}
      </div>
      {error !== undefined && <GroupError id={name} error={error} />}
    </fieldset>
  );
}

ChoiceChips.propTypes = {
  name: PropTypes.string.isRequired,
  legend: PropTypes.node,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.node }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  legendClassName: PropTypes.string,
  error: PropTypes.string,
};

/** Property type cards (Figma 5671:175866): single select. */
export function OptionCards({ name, options, value, onChange, error, labelledBy }) {
  return (
    <div
      role="radiogroup"
      aria-labelledby={labelledBy}
      aria-describedby={error ? errorId(name) : undefined}
      className="grid grid-cols-2 gap-[10px] sm:grid-cols-4"
    >
      {options.map((opt) => {
        const on = value === opt.value;
        const inputId = `${name}-${opt.value}`;
        return (
          <label
            key={opt.value}
            htmlFor={inputId}
            className={`relative m-0 flex cursor-pointer items-start justify-between gap-[8px] rounded-[6px] border-[1px] border-solid px-[10px] py-[6px] transition-colors has-[:focus-visible]:shadow-[0_0_0_2px_#0485F7] ${
              on
                ? "border-primary-500 bg-[#F5F9FF]"
                : error
                  ? "border-field-error bg-white hover:bg-ink-50"
                  : "border-[#DCDCDC] bg-white hover:bg-ink-50"
            }`}
          >
            <input
              id={inputId}
              type="radio"
              name={name}
              value={opt.value}
              checked={on}
              onChange={() => onChange(opt.value)}
              className="absolute inset-0 m-0 h-full w-full cursor-pointer opacity-0"
            />
            <span className="flex min-w-0 flex-col gap-[4px]">
              <span
                className={`font-gilroy text-[14px] font-semibold leading-[20px] ${on ? "text-primary-500" : "text-[#101828]"}`}
              >
                {opt.label}
              </span>
              <span
                className={`font-gilroy text-[11px] leading-[16px] ${on ? "text-primary-500" : "text-[#6A7282]"}`}
              >
                {opt.description}
              </span>
            </span>
            {on && <img src={ChipCheck} alt="" width="20" height="20" className="shrink-0" />}
          </label>
        );
      })}
    </div>
  );
}

OptionCards.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.node,
      description: PropTypes.node,
    }),
  ).isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  labelledBy: PropTypes.string,
};

/** "Address/Location", "Property Rules", "Services": 3px bar + 18px title. */
export function SectionTitle({ children, as: Tag = "h2" }) {
  return (
    <div className="flex items-center gap-[10px] py-[11px]">
      <span aria-hidden className="h-[26px] w-[3px] shrink-0 rounded-[12px] bg-[#0038AC]" />
      <Tag className="mb-0 font-gilroy text-[18px] font-semibold leading-[23.5px] text-[#222222]">
        {children}
      </Tag>
    </div>
  );
}

SectionTitle.propTypes = { children: PropTypes.node, as: PropTypes.string };

/** Bordered sub-card used across Services & Rules. */
export function Panel({ title, description, icon, trailing, children, titleId }) {
  return (
    <section
      aria-labelledby={titleId}
      className="flex w-full flex-col gap-[12px] rounded-[10px] border-[1px] border-solid border-[#DCDCDC] bg-white p-[12px]"
    >
      <div className="flex items-start justify-between gap-[12px]">
        <div className="flex min-w-0 items-center gap-[12px]">
          {icon && (
            <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[#EEF2FF]">
              {icon}
            </span>
          )}
          <div className="flex min-w-0 flex-col gap-[4px]">
            <h3
              id={titleId}
              className="mb-0 font-gilroy text-[16px] font-medium leading-[20px] text-[#101828]"
            >
              {title}
            </h3>
            {description && (
              <p className="mb-0 font-gilroy text-[12px] leading-[16px] text-[#6A7282]">
                {description}
              </p>
            )}
          </div>
        </div>
        {trailing}
      </div>
      {children}
    </section>
  );
}

Panel.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  icon: PropTypes.node,
  trailing: PropTypes.node,
  children: PropTypes.node,
  titleId: PropTypes.string.isRequired,
};

const timeSelectStyles = (hasError) => {
  const base = fieldSelectStyles(hasError);
  return {
    ...base,
    control: (b, s) => ({ ...base.control(b, s), minHeight: "40px", height: "40px" }),
    indicatorsContainer: (b) => ({ ...b, height: "38px" }),
    menuPortal: base.menuPortal,
  };
};

/** Nearest 30-minute slot to now, as "HH:mm". */
const currentTimeSlot = () => {
  const now = new Date();
  const h = now.getHours();
  return `${String(h).padStart(2, "0")}:${now.getMinutes() < 30 ? "00" : "30"}`;
};

// Options carry their value so the menu can find them in the DOM.
function TimeOption(props) {
  return (
    <components.Option
      {...props}
      innerProps={{ ...props.innerProps, "data-time": props.data.value }}
    />
  );
}
TimeOption.propTypes = { innerProps: PropTypes.object, data: PropTypes.object };

// On open, scroll so the target slot sits mid-list instead of starting at 12 AM.
function TimeMenuList(props) {
  const listRef = useRef(null);
  const { scrollToValue } = props.selectProps;
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list || !scrollToValue) return;
    const el = list.querySelector(`[data-time="${scrollToValue}"]`);
    if (el) list.scrollTop = el.offsetTop - list.clientHeight / 2 + el.clientHeight / 2;
  }, [scrollToValue]); // runs when the menu opens (the list mounts per open)
  return (
    <components.MenuList
      {...props}
      innerRef={(node) => {
        listRef.current = node;
        if (typeof props.innerRef === "function") props.innerRef(node);
      }}
    />
  );
}
TimeMenuList.propTypes = { selectProps: PropTypes.object, innerRef: PropTypes.func };

const TIME_COMPONENTS = { Option: TimeOption, MenuList: TimeMenuList };

/**
 * Time select with the Figma timer icon (visiting / gate hours).
 * The menu opens at the selected time, else at `anchor` (e.g. the "From"
 * time for a "to" field), else at the current time.
 */
export function TimeSelect({
  id,
  placeholder,
  options,
  value,
  anchor,
  onChange,
  hasError,
  disabled,
  ariaLabel,
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <img
        src={TimerIcon}
        alt=""
        width="17"
        height="17"
        className="pointer-events-none absolute left-[12px] top-[11px] z-[1]"
      />
      <Select
        inputId={id}
        aria-label={ariaLabel}
        options={options}
        value={options.find((o) => o.value === value) || null}
        onChange={(opt) => onChange(opt ? opt.value : "")}
        placeholder={placeholder}
        isDisabled={disabled}
        isClearable
        components={TIME_COMPONENTS}
        scrollToValue={value || anchor || currentTimeSlot()}
        menuPortalTarget={typeof document !== "undefined" ? document.body : null}
        styles={{
          ...timeSelectStyles(hasError),
          valueContainer: (b) => ({ ...b, padding: "0 8px 0 38px" }),
        }}
      />
    </div>
  );
}

TimeSelect.propTypes = {
  id: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  value: PropTypes.string,
  anchor: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  hasError: PropTypes.bool,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

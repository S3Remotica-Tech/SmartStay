import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  fieldClass,
  fieldGroupClass,
  fieldHelperClass,
  fieldInnerInputClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
} from "../../../../../Utils/FieldStyles";

const ERROR_CLASS = "mt-[6px] text-[12px] leading-[17px] text-[color:var(--ds-text-danger)]";

const selectStyles = (hasError) => ({
  ...fieldSelectStyles(hasError),
  menuPortal: (base) => ({ ...base, zIndex: 1080 }),
});

/**
 * Name / mobile / email (+ role) fields shared by the invite drawer and Edit
 * details (Figma "Invite a master" 154:3715). Field anatomy is the app's
 * FieldStyles. values: { name, mobile, email, role }; role is a select option.
 */
function PersonDetailsFields({ idPrefix, values, errors, onChange, disabled = false, roleOptions }) {
  const id = (field) => `${idPrefix}-${field}`;
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={id("name")} className={fieldLabelClass}>
          Full name<span className={fieldRequiredClass}>*</span>
        </label>
        <input
          id={id("name")}
          data-autofocus
          type="text"
          autoComplete="off"
          value={values.name}
          onChange={(event) => onChange("name", event.target.value)}
          disabled={disabled}
          aria-invalid={Boolean(errors.name) || undefined}
          className={fieldClass(Boolean(errors.name))}
          placeholder="Enter full name"
        />
        {errors.name && <p className={ERROR_CLASS}>{errors.name}</p>}
      </div>

      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
        <div className="flex flex-col">
          <label htmlFor={id("mobile")} className={fieldLabelClass}>
            Mobile number
          </label>
          <div className={fieldGroupClass(Boolean(errors.mobile))}>
            <span className="shrink-0 text-[14px] text-[color:var(--ds-text-default)]">+91</span>
            <input
              id={id("mobile")}
              type="tel"
              inputMode="numeric"
              autoComplete="off"
              maxLength={10}
              value={values.mobile}
              onChange={(event) => onChange("mobile", event.target.value.replace(/\D/g, ""))}
              disabled={disabled}
              aria-invalid={Boolean(errors.mobile) || undefined}
              className={fieldInnerInputClass}
              placeholder="98765 43210"
            />
          </div>
          {errors.mobile ? (
            <p className={ERROR_CLASS}>{errors.mobile}</p>
          ) : (
            <p className={fieldHelperClass}>We&apos;ll send booking updates on WhatsApp</p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor={id("email")} className={fieldLabelClass}>
            Email<span className={fieldRequiredClass}>*</span>
          </label>
          <input
            id={id("email")}
            type="email"
            autoComplete="off"
            value={values.email}
            onChange={(event) => onChange("email", event.target.value.toLowerCase())}
            disabled={disabled}
            aria-invalid={Boolean(errors.email) || undefined}
            className={fieldClass(Boolean(errors.email))}
            placeholder="name@example.com"
          />
          {errors.email && <p className={ERROR_CLASS}>{errors.email}</p>}
        </div>
      </div>

      {roleOptions && (
        <div className="flex flex-col">
          <label htmlFor={id("role")} className={fieldLabelClass}>
            Role<span className={fieldRequiredClass}>*</span>
          </label>
          <Select
            inputId={id("role")}
            options={roleOptions}
            value={values.role}
            onChange={(option) => onChange("role", option)}
            isDisabled={disabled}
            placeholder="Select role"
            styles={selectStyles(Boolean(errors.role))}
            menuPortalTarget={document.body}
            menuPosition="fixed"
          />
          {errors.role && <p className={ERROR_CLASS}>{errors.role}</p>}
        </div>
      )}
    </>
  );
}

PersonDetailsFields.propTypes = {
  idPrefix: PropTypes.string.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    mobile: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.object,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  roleOptions: PropTypes.arrayOf(PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })),
};

export default PersonDetailsFields;

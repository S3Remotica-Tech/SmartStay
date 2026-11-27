// Step 1 — Basic Details (Figma 5661:173139; logo picker 7252:256918).
import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { useOnboarding } from "./OnboardingContext";
import {
  ChoiceChips,
  FormField,
  GroupError,
  OptionCards,
  SectionTitle,
  StepActions,
  errorId,
  useStepForm,
} from "./OnboardingParts";
import { LogoPicker } from "./ImagePicker";
import {
  AUDIENCE_BY_TYPE,
  FLAT_CUSTOM,
  LOGO_MIN_DIMENSION,
  PROPERTY_TYPES,
  isDev,
} from "./onboardingConfig";
import {
  fieldClass,
  fieldGroupClass,
  fieldInnerInputClass,
  fieldLabelClass,
  fieldSelectStyles,
  fieldTextareaClass,
} from "../../Utils/FieldStyles";
import { indianStates } from "../../Utils/indianStates";
import LocationIcon from "../../Assets/Images/Onboarding/location.svg";
import MapImage from "../../Assets/Images/Onboarding/map.png";
import MarkerShadow from "../../Assets/Images/Onboarding/marker-shadow.svg";
import MarkerBody from "../../Assets/Images/Onboarding/marker-body.svg";
import MarkerBody2 from "../../Assets/Images/Onboarding/marker-body-2.svg";
import MarkerDot from "../../Assets/Images/Onboarding/marker-dot.svg";
import MapArrow from "../../Assets/Images/Onboarding/map-arrow.svg";

const FIELD_IDS = {
  propertyName: "ob-name",
  propertyType: `ob-type-${PROPERTY_TYPES[0].value}`,
  flatBhk: "ob-flat-bhk",
  contactNumber: "ob-contact",
  email: "ob-email",
  addressLine: "ob-address",
  city: "ob-city",
  state: "ob-state",
  pincode: "ob-pincode",
};

const digitsOnly = (value, max) => value.replace(/\D/g, "").slice(0, max);

const stateSelectStyles = (hasError) => {
  const base = fieldSelectStyles(hasError);
  return { ...base, valueContainer: (b) => ({ ...b, padding: "0 8px 0 40px" }) };
};

/** Static map preview with the Figma pin (TODO(api): real geocoded map). */
function MapPreview({ basic }) {
  const place = [basic.city, basic.state].map((s) => String(s || "").trim()).filter(Boolean).join(", ");
  return (
    <figure className="relative m-0 h-[224px] w-full overflow-hidden rounded-[8px] border-[1px] border-solid border-[#E5E7EB]">
      {/* TODO(api): replace this static image with a map centred on the geocoded address. */}
      <img
        src={MapImage}
        alt=""
        aria-hidden
        className="absolute left-[-0.07%] top-[-109%] h-[318%] w-[122.7%] max-w-none select-none"
      />
      <div className="absolute left-1/2 top-[38px] flex w-[227px] max-w-[90%] -translate-x-1/2 flex-col items-center">
        <div className="w-full rounded-[8px] bg-[rgba(15,15,20,0.88)] px-[10px] py-[6px] text-center">
          <p className="mb-0 truncate font-gilroy text-[11px] font-medium text-white">
            {place || "Your property location"}
          </p>
        </div>
        <img src={MapArrow} alt="" width="12" height="6" />
      </div>
      <div className="absolute left-1/2 top-[82px] h-[41px] w-[27px] -translate-x-1/2" aria-hidden>
        <img src={MarkerShadow} alt="" className="absolute inset-[72.08%_11.11%_2.32%_11.11%] block h-[26%] w-[78%]" />
        <img src={MarkerBody} alt="" className="absolute inset-[0_0_14.02%_0] block h-[86%] w-full" />
        <img src={MarkerBody2} alt="" className="absolute inset-[0_0_14%_0] block h-[86%] w-full" />
        <img src={MarkerDot} alt="" className="absolute inset-[19.51%_29.63%_53.66%_29.63%] block h-[27%] w-[41%]" />
      </div>
      <figcaption className="sr-only">Map preview of {place || "the property location"}</figcaption>
    </figure>
  );
}

MapPreview.propTypes = { basic: PropTypes.object.isRequired };

function Step1BasicDetails({ onNext }) {
  const { draft, updateSection, errorsByStep, logo, setLogoFile, cancelLogo, removeLogo } =
    useOnboarding();
  const basic = draft.basic;
  const { touch, errorFor, handleSubmit, isValid } = useStepForm(errorsByStep.basic, FIELD_IDS);
  const set = (patch) => updateSection("basic", patch);
  const audience = AUDIENCE_BY_TYPE[basic.propertyType];

  const inputProps = (field, extra = {}) => ({
    id: FIELD_IDS[field],
    value: basic[field],
    onBlur: () => touch(field),
    "aria-invalid": errorFor(field) ? true : undefined,
    "aria-describedby": errorFor(field) ? errorId(FIELD_IDS[field]) : undefined,
    ...extra,
  });

  return (
    <form data-testid="step1-basic-details-91-address-location-form" noValidate onSubmit={handleSubmit(onNext)} className="flex flex-col gap-[16px] sm:px-[4px]">
      <LogoPicker
        id="ob-logo"
        label="Property logo"
        helper={`Square PNG or JPG, at least ${LOGO_MIN_DIMENSION} × ${LOGO_MIN_DIMENSION} px`}
        value={logo}
        onSelect={setLogoFile}
        onCancel={cancelLogo}
        onRemove={removeLogo}
      />

      <FormField id={FIELD_IDS.propertyName} label="Name" required error={errorFor("propertyName")}>
        <input data-testid="step1-basic-details-property-name-input"
          type="text"
          autoComplete="organization"
          placeholder="Enter your property name"
          maxLength={100}
          className={fieldClass(Boolean(errorFor("propertyName")))}
          onChange={(e) => set({ propertyName: e.target.value })}
          {...inputProps("propertyName")}
        />
      </FormField>

      {/* Property type / audience / flat size: no API field yet, dev only. */}
      {isDev && (
      <div className="flex flex-col">
        <span id="ob-type-label" className={fieldLabelClass}>
          Property Type<span className="ml-[10px] text-field-error" aria-hidden>*</span>
          <span className="sr-only"> (required)</span>
        </span>
        <OptionCards data-testid="step1-basic-details-ob-type-input"
          name="ob-type"
          labelledBy="ob-type-label"
          options={PROPERTY_TYPES}
          value={basic.propertyType}
          error={errorFor("propertyType")}
          onChange={(value) => {
            touch("propertyType");
            if (value !== basic.propertyType) set({ propertyType: value, audience: "", flatBhk: "" });
          }}
        />
        <GroupError id="ob-type" error={errorFor("propertyType")} />
      </div>
      )}

      {isDev && audience && (
        <ChoiceChips data-testid="step1-basic-details-ob-audience-input"
          name="ob-audience"
          legend={audience.label}
          options={audience.options}
          value={basic.audience}
          onChange={(value) => set({ audience: value })}
        />
      )}

      {isDev && basic.propertyType === "FLAT" && basic.audience === FLAT_CUSTOM && (
        <FormField id={FIELD_IDS.flatBhk} label="Number of BHK" required error={errorFor("flatBhk")}>
          <div className={`${fieldGroupClass(Boolean(errorFor("flatBhk")))} max-w-[220px]`}>
            <input data-testid="step1-basic-details-e-g-6-input"
              type="text"
              inputMode="numeric"
              placeholder="e.g. 6"
              className={fieldInnerInputClass}
              onChange={(e) => set({ flatBhk: digitsOnly(e.target.value, 2) })}
              {...inputProps("flatBhk")}
            />
            <span className="font-gilroy text-[14px] font-medium text-[#71717A]" aria-hidden>
              BHK
            </span>
          </div>
        </FormField>
      )}

      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
        <FormField id={FIELD_IDS.contactNumber} label="Contact Number" required error={errorFor("contactNumber")}>
          <div className={fieldGroupClass(Boolean(errorFor("contactNumber")))}>
            <span className="font-gilroy text-[14px] font-medium text-[#18181B]" aria-hidden>
              +91
            </span>
            <span className="h-[20px] w-[1px] bg-[#DEDEE0]" aria-hidden />
            <input data-testid="step1-basic-details-mobile-number-input"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              placeholder="Enter mobile number"
              className={fieldInnerInputClass}
              onChange={(e) => set({ contactNumber: digitsOnly(e.target.value, 10) })}
              {...inputProps("contactNumber")}
            />
          </div>
        </FormField>
        <FormField id={FIELD_IDS.email} label="Email (optional)" error={errorFor("email")}>
          <input data-testid="step1-basic-details-email-address-input"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter email address"
            className={fieldClass(Boolean(errorFor("email")))}
            onChange={(e) => set({ email: e.target.value.toLowerCase() })}
            {...inputProps("email")}
          />
        </FormField>
      </div>

      <SectionTitle>Address/Location</SectionTitle>

      <FormField id={FIELD_IDS.addressLine} label="Address Line" required error={errorFor("addressLine")}>
        <textarea data-testid="step1-basic-details-e-g-flat-no-10-eden-homes-omr-textarea"
          rows={3}
          autoComplete="street-address"
          placeholder="e.g. Flat No 10, Eden homes, OMR Road"
          maxLength={250}
          className={fieldTextareaClass(Boolean(errorFor("addressLine")))}
          onChange={(e) => set({ addressLine: e.target.value })}
          {...inputProps("addressLine")}
        />
      </FormField>

      <FormField id="ob-landmark" label="Landmark">
        <input data-testid="step1-basic-details-for-easy-identification-input"
          id="ob-landmark"
          type="text"
          placeholder="For easy identification"
          maxLength={100}
          value={basic.landmark}
          onChange={(e) => set({ landmark: e.target.value })}
          className={fieldClass(false)}
        />
      </FormField>

      <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-3 sm:gap-[8px]">
        <FormField id={FIELD_IDS.city} label="City" required error={errorFor("city")}>
          <input data-testid="step1-basic-details-e-g-solinganallur-chennai-input"
            type="text"
            autoComplete="address-level2"
            placeholder="e.g. Solinganallur, Chennai"
            maxLength={60}
            className={fieldClass(Boolean(errorFor("city")))}
            onChange={(e) => set({ city: e.target.value })}
            {...inputProps("city")}
          />
        </FormField>
        <FormField id={FIELD_IDS.state} label="Select state" required error={errorFor("state")}>
          <div className="relative">
            <img
              src={LocationIcon}
              alt=""
              width="21"
              height="21"
              className="pointer-events-none absolute left-[12px] top-[11.5px] z-[1]"
            />
            <div data-testid="step1-basic-details-state-select" className="contents"><Select
              inputId={FIELD_IDS.state}
              options={indianStates}
              value={indianStates.find((o) => o.value === basic.state) || null}
              onChange={(opt) => {
                touch("state");
                set({ state: opt ? opt.value : "" });
              }}
              onBlur={() => touch("state")}
              placeholder="Select state"
              aria-invalid={errorFor("state") ? true : undefined}
              aria-describedby={errorFor("state") ? errorId(FIELD_IDS.state) : undefined}
              styles={stateSelectStyles(Boolean(errorFor("state")))}
              menuPortalTarget={document.body}
            /></div>
          </div>
        </FormField>
        <FormField id={FIELD_IDS.pincode} label="Pin code" required error={errorFor("pincode")}>
          <input data-testid="step1-basic-details-pin-input"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="Enter pin"
            className={fieldClass(Boolean(errorFor("pincode")))}
            onChange={(e) => set({ pincode: digitsOnly(e.target.value, 6) })}
            {...inputProps("pincode")}
          />
        </FormField>
      </div>

      {/* Static placeholder until the real map API is wired: dev only. */}
      {isDev && <MapPreview basic={basic} />}

      <StepActions label="Save & Continue" icon="arrow" invalid={!isValid} />
    </form>
  );
}

Step1BasicDetails.propTypes = { onNext: PropTypes.func.isRequired };

export default Step1BasicDetails;

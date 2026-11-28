// Step 2 — Tax Information (Figma 5671:177034).
// "No tax" skips the GST fields and Save & Continue goes straight to Media.
// The Figma frame repeats "Trade name (Optional)"; the existing APIs have no
// separate legal-name field, so the duplicate was dropped (designer to fix).
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useOnboarding } from "./OnboardingContext";
import { FormField, GroupError, StepActions, errorId, useStepForm } from "./OnboardingParts";
import { TAX_TYPES } from "./onboardingConfig";
import { formatPropertyAddress } from "./onboardingUtils";
import Radio from "../../Utils/Radio";
import Checkbox from "../../Utils/Checkbox";
import {
  fieldClass,
  fieldGroupClass,
  fieldInnerInputClass,
  fieldTextareaClass,
} from "../../Utils/FieldStyles";

const FIELD_IDS = {
  taxType: "ob-tax-none",
  gstin: "ob-gstin",
  legalBusinessName: "ob-legal-name",
  taxPercent: "ob-tax-percent",
  principalPlace: "ob-principal-place",
};

function Step2TaxInformation({ onNext, onBack }) {
  const { draft, updateSection, errorsByStep } = useOnboarding();
  const tax = draft.tax;
  const { touch, errorFor, handleSubmit, isValid } = useStepForm(errorsByStep.tax, FIELD_IDS);
  const set = (patch) => updateSection("tax", patch);
  const isGst = tax.taxType === TAX_TYPES.GST;
  const propertyAddress = formatPropertyAddress(draft.basic);

  // Keep "Same as PG Address" in sync if Step 1's address changed since.
  useEffect(() => {
    if (tax.sameAsPropertyAddress && tax.principalPlace !== propertyAddress) {
      updateSection("tax", { principalPlace: propertyAddress });
    }
  }, [tax.sameAsPropertyAddress, tax.principalPlace, propertyAddress, updateSection]);

  const inputProps = (field) => ({
    id: FIELD_IDS[field],
    value: tax[field],
    onBlur: () => touch(field),
    "aria-invalid": errorFor(field) ? true : undefined,
    "aria-describedby": errorFor(field) ? errorId(FIELD_IDS[field]) : undefined,
  });

  return (
    <form data-testid="step2-tax-information-does-this-property-collect-form" noValidate onSubmit={handleSubmit(onNext)} className="flex flex-col gap-[16px] sm:px-[4px]">
      <fieldset
        className="m-0 flex flex-col gap-[16px] border-0 p-0"
        aria-describedby={errorFor("taxType") ? errorId("ob-tax") : undefined}
      >
        <legend className="float-none mb-0 w-auto p-0 font-gilroy text-b3 font-medium text-ink">
          Does this property collect tax on rent?
          <span className="ml-[3px] text-field-error" aria-hidden>*</span>
          <span className="sr-only"> (required)</span>
        </legend>
        <div className="flex flex-wrap items-center gap-[17px]">
          <Radio data-testid="step2-tax-information-ob-tax-type-radio"
            id={FIELD_IDS.taxType}
            name="ob-tax-type"
            value={TAX_TYPES.NONE}
            checked={tax.taxType === TAX_TYPES.NONE}
            error={Boolean(errorFor("taxType"))}
            onChange={() => {
              touch("taxType");
              set({ taxType: TAX_TYPES.NONE });
            }}
            label="No tax"
            className="min-w-[110px]"
          />
          <Radio data-testid="step2-tax-information-ob-tax-type-radio-2"
            id="ob-tax-gst"
            name="ob-tax-type"
            value={TAX_TYPES.GST}
            checked={isGst}
            error={Boolean(errorFor("taxType"))}
            onChange={() => {
              touch("taxType");
              set({ taxType: TAX_TYPES.GST });
            }}
            label="GST applicable"
          />
        </div>
        <GroupError id="ob-tax" error={errorFor("taxType")} />
      </fieldset>

      {isGst && (
        <>
          <FormField id={FIELD_IDS.gstin} label="GSTIN" required error={errorFor("gstin")}>
            <input data-testid="step2-tax-information-property-gst-no-input"
              type="text"
              autoComplete="off"
              placeholder="Enter your property GST No"
              maxLength={15}
              className={`${fieldClass(Boolean(errorFor("gstin")))} uppercase`}
              onChange={(e) =>
                set({ gstin: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 15) })
              }
              {...inputProps("gstin")}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
            <FormField
              id={FIELD_IDS.legalBusinessName}
              label="Legal Business Name"
              required
              error={errorFor("legalBusinessName")}
            >
              <input data-testid="step2-tax-information-property-name-as-per-the-proof-input"
                type="text"
                autoComplete="organization"
                placeholder="Enter your property Name as per the proof"
                maxLength={120}
                className={fieldClass(Boolean(errorFor("legalBusinessName")))}
                onChange={(e) => set({ legalBusinessName: e.target.value })}
                {...inputProps("legalBusinessName")}
              />
            </FormField>
            <FormField id="ob-trade-name" label="Trade name (Optional)">
              <input data-testid="step2-tax-information-trade-name-input"
                id="ob-trade-name"
                type="text"
                placeholder="Enter trade name"
                maxLength={120}
                value={tax.tradeName}
                onChange={(e) => set({ tradeName: e.target.value })}
                className={fieldClass(false)}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
            <FormField id={FIELD_IDS.taxPercent} label="TAX percent you collected" error={errorFor("taxPercent")}>
              <div className={fieldGroupClass(Boolean(errorFor("taxPercent")))}>
                <input data-testid="step2-tax-information-tax-percent-input"
                  type="text"
                  inputMode="decimal"
                  placeholder="Enter the tax percent"
                  className={fieldInnerInputClass}
                  onChange={(e) => {
                    const v = e.target.value.replace(/[^\d.]/g, "");
                    if (/^\d{0,2}(\.\d{0,2})?$/.test(v)) set({ taxPercent: v });
                  }}
                  {...inputProps("taxPercent")}
                />
                <span className="font-gilroy text-[18px] text-[#222222]" aria-hidden>
                  %
                </span>
              </div>
            </FormField>
          </div>

          <FormField
            id={FIELD_IDS.principalPlace}
            label="Principal Place of Business"
            required
            error={errorFor("principalPlace")}
            action={
              <Checkbox data-testid="step2-tax-information-ob-same-address-checkbox"
                id="ob-same-address"
                checked={tax.sameAsPropertyAddress}
                disabled={!propertyAddress}
                onChange={(e) => {
                  const checked = e.target.checked;
                  set(
                    checked
                      ? { sameAsPropertyAddress: true, principalPlace: propertyAddress }
                      : { sameAsPropertyAddress: false },
                  );
                  if (checked) touch("principalPlace");
                }}
                label={
                  <span className="font-gilroy text-[14px] font-medium text-[#4B4B4B]">
                    Same as PG Address
                  </span>
                }
                className="!mb-[10px] !items-center"
              />
            }
          >
            <textarea data-testid="step2-tax-information-e-g-flat-no-10-eden-homes-omr-textarea"
              rows={3}
              placeholder="e.g. Flat No 10, Eden homes, OMR Road"
              maxLength={300}
              readOnly={tax.sameAsPropertyAddress}
              className={fieldTextareaClass(Boolean(errorFor("principalPlace")))}
              onChange={(e) => set({ principalPlace: e.target.value })}
              {...inputProps("principalPlace")}
            />
          </FormField>
        </>
      )}

      <StepActions label="Save & Continue" icon="arrow" invalid={!isValid} onBack={onBack} />
    </form>
  );
}

Step2TaxInformation.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step2TaxInformation;

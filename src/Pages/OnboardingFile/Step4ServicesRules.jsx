// Step 4 — Services & Rules (Figma 5671:178747). Everything here is
// optional; Finish Setup is the only place the onboarding submits.
import React, { useState } from "react";
import PropTypes from "prop-types";
import { useOnboarding } from "./OnboardingContext";
import {
  ChoiceChips,
  GroupError,
  Panel,
  SectionTitle,
  StepActions,
  TimeSelect,
  useStepForm,
} from "./OnboardingParts";
import {
  CLEANING_FREQUENCIES,
  ESSENTIAL_RULES,
  FOOD_ADDITIONAL,
  GUEST_POLICIES,
  MAX_CUSTOM_ITEMS,
  MAX_CUSTOM_ITEM_LENGTH,
  MEALS,
  NOTICE_PERIODS,
  TIME_OPTIONS,
  TOGGLE_SERVICES,
} from "./onboardingConfig";
import Switch from "../../Utils/Switch";
import { fieldClass } from "../../Utils/FieldStyles";
import AddWhite from "../../Assets/Images/Onboarding/add-white.svg";
// Heroicons v2.1.5 outline 24px (MIT), recoloured to brand primary-500.
import RoomIcon from "../../Assets/Images/Onboarding/heroicons/home-modern.svg";
import FoodIcon from "../../Assets/Images/Onboarding/heroicons/cake.svg";
import WifiIcon from "../../Assets/Images/Onboarding/heroicons/wifi.svg";
import LaundryIcon from "../../Assets/Images/Onboarding/heroicons/sparkles.svg";
import LiftIcon from "../../Assets/Images/Onboarding/heroicons/arrows-up-down.svg";
import MaintenanceIcon from "../../Assets/Images/Onboarding/heroicons/wrench-screwdriver.svg";
import PowerIcon from "../../Assets/Images/Onboarding/heroicons/bolt.svg";
import HotWaterIcon from "../../Assets/Images/Onboarding/heroicons/fire.svg";
import WaterIcon from "../../Assets/Images/Onboarding/heroicons/beaker.svg";
import SecurityIcon from "../../Assets/Images/Onboarding/heroicons/shield-check.svg";
import ParkingIcon from "../../Assets/Images/Onboarding/heroicons/truck.svg";

const TOGGLE_ICONS = {
  wifi: WifiIcon,
  laundry: LaundryIcon,
  lift: LiftIcon,
  maintenance: MaintenanceIcon,
  powerBackup: PowerIcon,
  hotWater: HotWaterIcon,
  drinkingWater: WaterIcon,
  security: SecurityIcon,
  parking: ParkingIcon,
};

const FIELD_IDS = {
  essentialRules: `ob-essential-${ESSENTIAL_RULES[0].value}`, // first field (focus on open)
  visitingHours: "ob-visit-from",
  gateHours: "ob-gate-from",
  roomCleaning: "ob-cleaning-DAILY",
};

const ADD_BTN =
  "flex h-[40px] w-[101px] shrink-0 items-center justify-center gap-[2px] rounded-[8px] border-0 bg-primary-500 px-[8px] font-gilroy text-[16px] font-medium text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_#0485F7] disabled:cursor-not-allowed disabled:opacity-60";

/** "Add Custom rule / services": input + Add, items as removable chips. */
function CustomItems({ id, title, items, onChange }) {
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const full = items.length >= MAX_CUSTOM_ITEMS;

  const add = () => {
    const value = text.trim();
    if (!value) return;
    if (items.some((item) => item.toLowerCase() === value.toLowerCase())) {
      setError("Already added");
      return;
    }
    onChange([...items, value]);
    setText("");
    setError("");
  };

  return (
    <Panel title={title} titleId={`${id}-title`}>
      <div className="flex w-full gap-[12px]">
        <input
          id={id}
          type="text"
          aria-labelledby={`${id}-title`}
          placeholder="Eg : "
          maxLength={MAX_CUSTOM_ITEM_LENGTH}
          value={text}
          disabled={full}
          onChange={(e) => {
            setText(e.target.value);
            setError("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Enter adds the item, it does not submit the step.
              add();
            }
          }}
          className={`${fieldClass(Boolean(error))} !h-[40px]`}
        />
        <button type="button" onClick={add} disabled={full || !text.trim()} className={ADD_BTN}>
          Add
          <img src={AddWhite} alt="" width="17" height="17" />
        </button>
      </div>
      <GroupError id={id} error={full ? `You can add up to ${MAX_CUSTOM_ITEMS} items` : error} />
      {items.length > 0 && (
        <ul className="m-0 flex list-none flex-wrap gap-[8px] p-0" aria-label={`${title} added`}>
          {items.map((item) => (
            <li
              key={item}
              className="flex h-[32px] items-center gap-[6px] rounded-[31px] border-[0.8px] border-solid border-primary-500 bg-[#EEF2FF] pl-[12.8px] pr-[6px] font-gilroy text-[12px] font-semibold text-primary-500"
            >
              <span className="max-w-[220px] truncate">{item}</span>
              <button
                type="button"
                onClick={() => onChange(items.filter((i) => i !== item))}
                aria-label={`Remove ${item}`}
                className="flex h-[20px] w-[20px] items-center justify-center rounded-full border-0 bg-transparent p-0 text-[16px] leading-none text-primary-500 hover:bg-[#DFE4FD] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7]"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </Panel>
  );
}

CustomItems.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

const ServiceIcon = ({ src }) => <img src={src} alt="" width="22" height="22" />;
ServiceIcon.propTypes = { src: PropTypes.string.isRequired };

function ServiceToggle({ title, checked, onChange }) {
  return (
    <Switch
      size="sm"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      label={<span className="sr-only">{title}</span>}
    />
  );
}

ServiceToggle.propTypes = {
  title: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

function Step4ServicesRules({ onFinish, onBack }) {
  const { draft, updateSection, errorsByStep, submitting, submitError } = useOnboarding();
  const s = draft.services;
  const { touch, errorFor, handleSubmit, isValid } = useStepForm(errorsByStep.services, FIELD_IDS);
  const set = (patch) => updateSection("services", patch);
  const noGuests = s.guestPolicy === "NO_GUESTS";

  return (
    <form
      noValidate
      onSubmit={handleSubmit(() => {
        if (!submitting) onFinish();
      })}
      aria-busy={submitting || undefined}
      className="flex flex-col gap-[16px] sm:px-[4px]"
    >
      <fieldset disabled={submitting} className="m-0 flex min-w-0 flex-col gap-[16px] border-0 p-0">
        <SectionTitle>Property Rules</SectionTitle>

        <Panel title="Essential rules" titleId="ob-essential-title">
          <ChoiceChips
            name="ob-essential"
            options={ESSENTIAL_RULES}
            value={s.essentialRules}
            multiple
            onChange={(value) => set({ essentialRules: value })}
          />
        </Panel>

        <Panel title="Guest Policy" titleId="ob-guest-title">
          <ChoiceChips
            name="ob-guest"
            options={GUEST_POLICIES}
            value={s.guestPolicy}
            onChange={(value) => set({ guestPolicy: value })}
          />
          <div className="flex flex-col gap-[8px]">
            <p id="ob-visit-label" className="mb-0 font-gilroy text-[12px] font-medium uppercase text-[#64748B]">
              Visiting hours until
            </p>
            <div className="flex flex-col gap-[8px] sm:flex-row">
              <TimeSelect
                id="ob-visit-from"
                ariaLabel="Visiting hours from"
                placeholder="From"
                options={TIME_OPTIONS}
                value={s.visitingFrom}
                disabled={noGuests}
                hasError={Boolean(errorFor("visitingHours"))}
                onChange={(value) => {
                  touch("visitingHours");
                  set({ visitingFrom: value });
                }}
              />
              <TimeSelect
                id="ob-visit-to"
                ariaLabel="Visiting hours to"
                placeholder="to"
                options={TIME_OPTIONS}
                value={s.visitingTo}
                anchor={s.visitingFrom}
                disabled={noGuests}
                hasError={Boolean(errorFor("visitingHours"))}
                onChange={(value) => {
                  touch("visitingHours");
                  set({ visitingTo: value });
                }}
              />
            </div>
            <GroupError id="ob-visit-from" error={errorFor("visitingHours")} />
          </div>
        </Panel>

        <Panel title="Gate Opening Hours" titleId="ob-gate-title">
          <div className="flex flex-col gap-[12px] sm:flex-row">
            <TimeSelect
              id="ob-gate-from"
              ariaLabel="Gate opens at"
              placeholder="From"
              options={TIME_OPTIONS}
              value={s.gateFrom}
              hasError={Boolean(errorFor("gateHours"))}
              onChange={(value) => {
                touch("gateHours");
                set({ gateFrom: value });
              }}
            />
            <TimeSelect
              id="ob-gate-to"
              ariaLabel="Gate closes at"
              placeholder="to"
              options={TIME_OPTIONS}
              value={s.gateTo}
              anchor={s.gateFrom}
              hasError={Boolean(errorFor("gateHours"))}
              onChange={(value) => {
                touch("gateHours");
                set({ gateTo: value });
              }}
            />
          </div>
          <GroupError id="ob-gate-from" error={errorFor("gateHours")} />
        </Panel>

        <Panel title="Notice Period" description="Before a tenant vacates" titleId="ob-notice-title">
          <ChoiceChips
            name="ob-notice"
            options={NOTICE_PERIODS}
            value={s.noticePeriod}
            onChange={(value) => set({ noticePeriod: value })}
          />
        </Panel>

        <CustomItems
          id="ob-custom-rule"
          title="Add Custom rule"
          items={s.customRules}
          onChange={(items) => set({ customRules: items })}
        />

        <SectionTitle>Services</SectionTitle>

        <Panel
          title="Room Cleaning"
          description="House Keeping Services"
          titleId="ob-cleaning-title"
          icon={<ServiceIcon src={RoomIcon} />}
          trailing={
            <ServiceToggle
              title="Room Cleaning"
              checked={s.roomCleaning.enabled}
              onChange={(enabled) =>
                set({ roomCleaning: { ...s.roomCleaning, enabled, frequency: enabled ? s.roomCleaning.frequency : "" } })
              }
            />
          }
        >
          {s.roomCleaning.enabled && (
            <ChoiceChips
              name="ob-cleaning"
              legend="Frequency"
              options={CLEANING_FREQUENCIES}
              value={s.roomCleaning.frequency}
              error={errorFor("roomCleaning")}
              onChange={(value) => {
                touch("roomCleaning");
                set({ roomCleaning: { ...s.roomCleaning, frequency: value } });
              }}
            />
          )}
        </Panel>

        <Panel
          title="Food"
          description="Food Services"
          titleId="ob-food-title"
          icon={<ServiceIcon src={FoodIcon} />}
          trailing={
            <ServiceToggle
              title="Food"
              checked={s.food.enabled}
              onChange={(enabled) =>
                set({
                  food: enabled
                    ? { ...s.food, enabled: true }
                    : { enabled: false, includedMeals: [], additional: [] },
                })
              }
            />
          }
        >
          {s.food.enabled && (
            <div className="flex flex-col gap-[16px] sm:flex-row sm:gap-[56px]">
              <ChoiceChips
                name="ob-food-included"
                legend="Includes in Rent"
                options={MEALS}
                value={s.food.includedMeals}
                multiple
                onChange={(value) => set({ food: { ...s.food, includedMeals: value } })}
              />
              <ChoiceChips
                name="ob-food-additional"
                legend="Additional"
                options={FOOD_ADDITIONAL}
                value={s.food.additional}
                multiple
                onChange={(value) => set({ food: { ...s.food, additional: value } })}
              />
            </div>
          )}
        </Panel>

        {TOGGLE_SERVICES.map((svc) => (
          <Panel
            key={svc.key}
            title={svc.label}
            description={svc.description}
            titleId={`ob-${svc.key}-title`}
            icon={<ServiceIcon src={TOGGLE_ICONS[svc.key]} />}
            trailing={
              <ServiceToggle
                title={svc.label}
                checked={s[svc.key]}
                onChange={(on) => set({ [svc.key]: on })}
              />
            }
          />
        ))}

        <CustomItems
          id="ob-custom-service"
          title="Add Custom services"
          items={s.customServices}
          onChange={(items) => set({ customServices: items })}
        />
      </fieldset>

      <div role="alert" aria-live="assertive">
        {submitError ? (
          <div className="rounded-[8px] border-[1px] border-solid border-field-error bg-[#FFF1F1] px-[12px] py-[10px] font-gilroy text-[14px] font-medium text-field-error">
            {submitError} Your details are kept — press Finish Setup to try again.
          </div>
        ) : null}
      </div>

      <StepActions
        label="Finish Setup"
        icon="check"
        invalid={!isValid}
        loading={submitting}
        loadingLabel="Setting up…"
        onBack={onBack}
      />
    </form>
  );
}

Step4ServicesRules.propTypes = {
  onFinish: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
};

export default Step4ServicesRules;

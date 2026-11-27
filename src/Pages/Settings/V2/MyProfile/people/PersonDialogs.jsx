import React, { useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  ShieldCheckIcon,
  ArchiveBoxIcon,
  ArrowRightStartOnRectangleIcon,
  ExclamationTriangleIcon,
  LockClosedIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { fieldLabelClass, fieldSelectStyles, fieldClass } from "../../../../../Utils/FieldStyles";
import { DsDialog, DsIcon } from "../../../../../DesignSystem";
import Checkbox from "../../../../../Utils/Checkbox";

const selectStyles = {
  ...fieldSelectStyles(false),
  menuPortal: (base) => ({ ...base, zIndex: 1080 }),
};

/** Change role: pick a role (only ones the viewer may give), confirm with the effect stated. */
function ChangeRoleModal({ person, roleOptions, busy, onConfirm, onClose }) {
  const choices = roleOptions.filter((option) => option.label !== person.roleName);
  const [role, setRole] = useState(choices[0] || null);
  const isMaster = person.kind === "master";

  return (
    <DsDialog
      title={`Change ${person.name}'s role?`}
      description={
        isMaster
          ? `${person.name} keeps the same properties. The new role changes what they can manage in them.`
          : `${person.name} gets the new role's module access right away, in every property they work in. Past entries stay as they are.`
      }
      icon={ShieldCheckIcon}
      tone="primary"
      confirmLabel="Change role"
      busy={busy}
      confirmDisabled={!role}
      onConfirm={() => role && onConfirm({ roleId: role.value, roleName: role.label })}
      onClose={onClose}
    >
      <div className="flex flex-col">
        <label htmlFor="change-role-select" className={fieldLabelClass}>
          New role
        </label>
        <Select
          inputId="change-role-select"
          options={choices}
          value={role}
          onChange={setRole}
          isDisabled={busy || choices.length === 0}
          placeholder={choices.length ? "Select role" : "No other role you can assign"}
          styles={selectStyles}
          menuPortalTarget={document.body}
          menuPosition="fixed"
        />
        <p className="mt-[10px] text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
          Current role: {person.roleName}
        </p>
      </div>
    </DsDialog>
  );
}

ChangeRoleModal.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    roleName: PropTypes.string,
  }).isRequired,
  roleOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired }),
  ).isRequired,
  busy: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

function openItemsText(bookings, complaints) {
  const parts = [];
  if (bookings) parts.push(`${bookings} open booking${bookings === 1 ? "" : "s"}`);
  if (complaints) parts.push(`${complaints} complaint${complaints === 1 ? "" : "s"}`);
  return parts.join(" and ");
}

/**
 * Deactivate (Figma 155:4937), in the larger modal size: states the effect
 * (signed out everywhere, access removed, history kept) and, when the person
 * has open bookings / complaints, a reassign step. Deactivating a Master
 * keeps their staff active under the Admin until reassigned.
 */
function DeactivateModal({ person, propertyNames, reassignOptions, busy, onConfirm, onClose }) {
  const openItems = openItemsText(person.openBookings, person.openComplaints);
  const [reassign, setReassign] = useState(Boolean(openItems));
  const [reassignTo, setReassignTo] = useState(reassignOptions[0] || null);
  const isMaster = person.kind === "master";
  const where = propertyNames.length ? propertyNames.join(", ") : "their properties";
  const firstName = person.name.split(" ")[0];
  // Reassigning needs a target; with nobody to pick, the open items can't move.
  const missingTarget = Boolean(openItems) && reassign && !reassignTo;

  const effects = [
    { icon: ArrowRightStartOnRectangleIcon, text: "Signed out of the web and mobile app right away." },
    { icon: LockClosedIcon, text: `Loses access to ${where}.` },
    { icon: ArchiveBoxIcon, text: "Past entries and history stay in the records. You can reactivate later." },
  ];

  return (
    <DsDialog
      title={`Deactivate ${person.name}?`}
      description={`${firstName} won't be able to sign in until you reactivate them.`}
      icon={ExclamationTriangleIcon}
      tone="danger"
      size="lg"
      confirmLabel="Deactivate"
      danger
      busy={busy}
      confirmDisabled={missingTarget}
      onConfirm={() => onConfirm({ reassignToId: reassign ? reassignTo?.value : null })}
      onClose={onClose}
    >
      <ul className="m-0 flex list-none flex-col gap-[10px] rounded-[var(--ds-radius-md)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface-subtle)] p-[16px]">
        {effects.map((effect) => (
          <li key={effect.text} className="flex items-start gap-[10px] text-[14px] leading-[20px] text-[color:var(--ds-text-default)]">
            <span className="mt-[2px] shrink-0 text-[color:var(--ds-text-secondary)]">
              <DsIcon src={effect.icon} size={16} />
            </span>
            {effect.text}
          </li>
        ))}
      </ul>
      {isMaster && (
        <p className="rounded-[var(--ds-radius-sm)] bg-[var(--ds-bg-info-subtle)] px-[14px] py-[12px] text-[14px] leading-[20px] text-[color:var(--ds-text-info)]">
          {firstName}&apos;s staff stay active. They stay under you (Admin) until you reassign
          them to another Master.
        </p>
      )}
      {openItems && (
        <>
          <Checkbox
            id="deactivate-reassign"
            checked={reassign}
            onChange={(event) => setReassign(event.target.checked)}
            disabled={busy}
            label={`Reassign ${openItems}`}
          />
          {reassign && (
            <div className="flex flex-col">
              <label htmlFor="deactivate-reassign-to" className={fieldLabelClass}>
                Reassign to
              </label>
              <Select
                inputId="deactivate-reassign-to"
                options={reassignOptions}
                value={reassignTo}
                onChange={setReassignTo}
                isDisabled={busy || reassignOptions.length === 0}
                placeholder={reassignOptions.length ? "Select person" : "Nobody available"}
                styles={selectStyles}
                menuPortalTarget={document.body}
                menuPosition="fixed"
                aria-describedby={missingTarget ? "deactivate-reassign-error" : undefined}
              />
              {missingTarget && (
                <p
                  id="deactivate-reassign-error"
                  className="mt-[6px] text-[12px] leading-[17px] text-[color:var(--ds-text-danger)]"
                >
                  {reassignOptions.length
                    ? "Select who takes over the open items, or untick Reassign."
                    : "Nobody else is active in these properties. Untick Reassign to deactivate without moving the open items."}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </DsDialog>
  );
}

DeactivateModal.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
    openBookings: PropTypes.number,
    openComplaints: PropTypes.number,
  }).isRequired,
  propertyNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  reassignOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired }),
  ).isRequired,
  busy: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

const normalise = (value) => value.trim().replace(/\s+/g, " ").toLowerCase();

/**
 * Remove (soft): the person leaves every list and can no longer sign in;
 * their name stays on old records. Confirmed by typing the person's name.
 */
function RemoveModal({ person, busy, onConfirm, onClose }) {
  const [typed, setTyped] = useState("");
  const matches = normalise(typed) === normalise(person.name);
  const isMaster = person.kind === "master";

  return (
    <DsDialog
      title={`Remove ${person.name}?`}
      description={`${person.name} is removed from your team lists and can't sign in again. Their name stays on bills, bookings and other past records.`}
      icon={TrashIcon}
      tone="danger"
      confirmLabel="Remove"
      onConfirm={onConfirm}
      danger
      busy={busy}
      confirmDisabled={!matches}
      onClose={onClose}
    >
      {isMaster && (
        <p className="rounded-[var(--ds-radius-sm)] bg-[var(--ds-bg-info-subtle)] px-[12px] py-[10px] text-[12px] leading-[17px] text-[color:var(--ds-text-info)]">
          Their staff stay active. They stay under you (Super Admin) until you reassign them to
          another Master.
        </p>
      )}
      <form
        className="flex flex-col"
        onSubmit={(event) => {
          event.preventDefault();
          if (matches && !busy) onConfirm();
        }}
      >
        <label htmlFor="remove-confirm-name" className={fieldLabelClass}>
          Type <span className="font-semibold">{person.name}</span> to confirm
        </label>
        <input
          id="remove-confirm-name"
          data-autofocus
          type="text"
          autoComplete="off"
          value={typed}
          onChange={(event) => setTyped(event.target.value)}
          disabled={busy}
          className={fieldClass(false)}
        />
      </form>
    </DsDialog>
  );
}

RemoveModal.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    kind: PropTypes.string.isRequired,
  }).isRequired,
  busy: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export { ChangeRoleModal, DeactivateModal, RemoveModal };

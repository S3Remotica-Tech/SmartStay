import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  DsAvatar,
  DsBadge,
  DsButton,
  DsDescriptionItem,
  DsSectionHeader,
  DsTextLink,
  DsDrawer,
  DsActionMenu,
} from "../../../../../DesignSystem";
import ButtonSpinner from "../../../../../Utils/ButtonSpinner";
import { AssignedPropertyList } from "../properties/PropertyList";
import ManageAccessForm from "./ManageAccessForm";
import PersonDetailsFields from "./PersonDetailsFields";
import StatusBadge from "./StatusBadge";
import { ACTION, groupActions } from "../lib/myProfilePermissions";
import { ACTION_META } from "../lib/myProfileActionMeta";
import { formatDate, localMobile, rolesOf, timeAgo, validatePersonForm } from "../lib/myProfileUtils";

const FORM_ID = {
  [ACTION.EDIT_DETAILS]: "person-details-form",
  [ACTION.MANAGE_ACCESS]: "manage-access-form",
};

const TITLE = {
  [ACTION.EDIT_DETAILS]: "Edit details",
  [ACTION.MANAGE_ACCESS]: "Manage access",
};

/**
 * Person drawer (Figma 155:4262), opened by clicking a row. `mode`:
 * - view: read-only profile; the allowed actions sit in the header "⋯" menu
 *   and as section links.
 * - editDetails: contact details only — name, mobile, email.
 * - manageAccess: assigned properties; for staff also the role in each
 *   property (ManageAccessForm).
 * Module access is not part of this drawer.
 */
function PersonDrawer({
  person,
  mode,
  viewer,
  allowed,
  propertiesById,
  assignableProperties,
  busy,
  onSaveDetails,
  onSaveAccess,
  onAction,
  onClose,
}) {
  const [values, setValues] = useState({
    name: person.name === "—" ? "" : person.name,
    mobile: localMobile(person.raw?.mobileNo),
    email: person.email,
  });
  const [errors, setErrors] = useState({});
  const isStaff = person.kind === "staff";
  const editing = mode === ACTION.EDIT_DETAILS || mode === ACTION.MANAGE_ACCESS;
  const roles = rolesOf(person);
  const can = (action) => allowed.includes(action);
  const menuGroups = groupActions(allowed, [ACTION.VIEW, mode]).map((group) =>
    group.map((action) => ({ key: action, ...ACTION_META[action] })),
  );

  const update = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const saveDetails = (event) => {
    event.preventDefault();
    const found = validatePersonForm(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSaveDetails({ name: values.name.trim(), mobile: values.mobile, email: values.email.trim() });
  };

  const header = (
    <div className="flex min-w-0 items-center gap-[12px]">
      <DsAvatar size={48} src={person.avatar || undefined} initials={person.initials} alt={person.name} />
      <div className="flex min-w-0 flex-col gap-[4px]">
        <div className="flex min-w-0 flex-wrap items-center gap-[8px]">
          <h2 className="truncate text-[18px] font-semibold capitalize leading-[26px] text-[color:var(--ds-text-default)]">
            {person.name}
          </h2>
          {roles.map((roleName) => (
            <DsBadge key={roleName} tone={person.kind === "master" ? "primary" : "neutral"}>
              {roleName}
            </DsBadge>
          ))}
          <StatusBadge status={person.status} />
        </div>
        <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
          {[
            person.phone || person.email,
            person.joinedAt && `joined ${formatDate(person.joinedAt)}`,
            person.lastActiveAt && `last active ${timeAgo(person.lastActiveAt)}`,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>
    </div>
  );

  const deactivateLink = can(ACTION.DEACTIVATE) && (
    <DsTextLink tone="danger" onClick={() => onAction(ACTION.DEACTIVATE)} disabled={busy}>
      Deactivate
    </DsTextLink>
  );

  const link = (action, label) =>
    can(action) && <DsTextLink onClick={() => onAction(action)}>{label}</DsTextLink>;

  const footer = editing ? (
    <>
      <span className="flex-1" />
      <DsButton size="md" onClick={onClose} disabled={busy}>
        Cancel
      </DsButton>
      <DsButton size="md" variant="primary" type="submit" form={FORM_ID[mode]} disabled={busy}>
        {busy ? <ButtonSpinner label="Saving..." /> : "Save changes"}
      </DsButton>
    </>
  ) : (
    <>
      {deactivateLink}
      <span className="flex-1" />
      <DsButton size="md" onClick={onClose}>
        Close
      </DsButton>
    </>
  );

  return (
    <DsDrawer
      title={editing ? `${TITLE[mode]} · ${person.name}` : header}
      label={`${editing ? TITLE[mode] : "Profile"} · ${person.name}`}
      onClose={() => !busy && onClose()}
      headerActions={
        !editing &&
        menuGroups.length > 0 && (
          <DsActionMenu groups={menuGroups} onSelect={onAction} label={`More actions for ${person.name}`} />
        )
      }
      footer={footer}
    >
      {!editing && (
        <>
          <section className="flex flex-col gap-[8px]">
            <DsSectionHeader title="Contact" action={link(ACTION.EDIT_DETAILS, "Edit details")} />
            <dl className="m-0 flex flex-col">
              <DsDescriptionItem
                label="Mobile number"
                value={person.phone || "Not added"}
                muted={!person.phone}
                copyValue={person.phone.replace(/\s/g, "")}
                copyLabel="Copy mobile number"
              />
              <DsDescriptionItem
                label="Email"
                value={person.email || "Not added"}
                muted={!person.email}
                copyValue={person.email}
                copyLabel="Copy email"
              />
              {person.userCode && <DsDescriptionItem label="User ID" value={person.userCode} />}
            </dl>
          </section>

          <section className="flex flex-col gap-[8px]">
            <DsSectionHeader
              title={isStaff ? "Access" : "Role"}
              action={isStaff ? link(ACTION.MANAGE_ACCESS, "Manage access") : link(ACTION.CHANGE_ROLE, "Change")}
            />
            {isStaff ? (
              // One card per property, with the role in that property.
              <AssignedPropertyList
                propertyIds={person.propertyIds}
                propertiesById={propertiesById}
                renderAside={(id) => (
                  <DsBadge tone="neutral">{person.roleNameByProperty?.[id] || person.roleName}</DsBadge>
                )}
              />
            ) : (
              <p className="rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-border-default)] px-[16px] py-[10px] text-[14px] font-medium leading-[20px] text-[color:var(--ds-text-default)]">
                {person.roleName}
                {person.accessSummary && (
                  <span className="block text-[12px] font-normal leading-[17px] text-[color:var(--ds-text-secondary)]">
                    {person.accessSummary}
                    {person.accessLevel ? ` · ${person.accessLevel}` : ""}
                  </span>
                )}
              </p>
            )}
          </section>

          {!isStaff && (
            <section className="flex flex-col gap-[8px]">
              <DsSectionHeader title="Assigned properties" action={link(ACTION.MANAGE_ACCESS, "Manage access")} />
              <AssignedPropertyList propertyIds={person.propertyIds} propertiesById={propertiesById} />
            </section>
          )}
        </>
      )}

      {mode === ACTION.EDIT_DETAILS && (
        <form id={FORM_ID[mode]} noValidate onSubmit={saveDetails} className="flex flex-col gap-[20px]">
          <PersonDetailsFields
            idPrefix="edit-person"
            values={values}
            errors={errors}
            onChange={update}
            disabled={busy}
          />
        </form>
      )}

      {mode === ACTION.MANAGE_ACCESS && (
        <ManageAccessForm
          person={person}
          viewer={viewer}
          properties={assignableProperties}
          disabled={busy}
          onSave={onSaveAccess}
        />
      )}
    </DsDrawer>
  );
}

PersonDrawer.propTypes = {
  person: PropTypes.object.isRequired,
  mode: PropTypes.oneOf([ACTION.VIEW, ACTION.EDIT_DETAILS, ACTION.MANAGE_ACCESS]).isRequired,
  viewer: PropTypes.object.isRequired,
  allowed: PropTypes.arrayOf(PropTypes.string).isRequired,
  propertiesById: PropTypes.object.isRequired,
  assignableProperties: PropTypes.array.isRequired,
  busy: PropTypes.bool,
  onSaveDetails: PropTypes.func.isRequired,
  onSaveAccess: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PersonDrawer;

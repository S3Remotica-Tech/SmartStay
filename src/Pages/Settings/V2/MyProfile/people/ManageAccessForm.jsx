import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { DsTextLink } from "../../../../../DesignSystem";
import { fieldLabelClass, fieldSelectStyles } from "../../../../../Utils/FieldStyles";
import { PropertyPicker } from "../properties/PropertyList";
import { listRoles, reportApiError } from "../lib/myProfileService";
import { canAssignRole } from "../lib/myProfilePermissions";

const ERROR_CLASS = "mt-[6px] text-[12px] leading-[17px] text-[color:var(--ds-text-danger)]";

const selectStyles = (hasError) => ({
  ...fieldSelectStyles(hasError),
  menuPortal: (base) => ({ ...base, zIndex: 1080 }),
});

/** The person's current role in each of their properties. */
function initialRoles(person) {
  return Object.fromEntries(
    person.propertyIds
      .filter((id) => person.roleIdByProperty?.[id] !== null && person.roleIdByProperty?.[id] !== undefined)
      .map((id) => [
        id,
        { roleId: String(person.roleIdByProperty[id]), roleName: person.roleNameByProperty?.[id] || "" },
      ]),
  );
}

/**
 * Manage access (opened from "Manage access"): which properties the person
 * works in. Staff also get a role per property, because roles are defined
 * per property — e.g. Warden in one property and Co Admin in another.
 * Masters run every module, so they only pick properties.
 * Submits { propertyIds, roles } through onSave; the form id is
 * "manage-access-form" (the drawer footer's Save button targets it).
 */
function ManageAccessForm({ person, viewer, properties, disabled = false, onSave }) {
  const dispatch = useDispatch();
  const isStaff = person.kind === "staff";
  const [propertyIds, setPropertyIds] = useState(person.propertyIds);
  const [roles, setRoles] = useState(() => (isStaff ? initialRoles(person) : {}));
  const [roleOptions, setRoleOptions] = useState({}); // propertyId → options | "error"
  const [errors, setErrors] = useState({});

  // Loads one property's role list. isActive() guards updates after unmount.
  const loadRoles = useCallback(
    (propertyId, isActive = () => true) => {
      listRoles(propertyId)
        .then((options) => {
          if (!isActive()) return;
          const allowed = options.filter((option) => canAssignRole(viewer, option.label));
          setRoleOptions((prev) => ({ ...prev, [propertyId]: allowed }));
        })
        .catch((err) => {
          if (!isActive()) return;
          reportApiError(err, dispatch); // 401 signs out, 403 / offline reported
          setRoleOptions((prev) => ({ ...prev, [propertyId]: "error" }));
        });
    },
    [viewer, dispatch],
  );

  // Each property has its own role list.
  useEffect(() => {
    if (!isStaff) return undefined;
    let active = true;
    properties.forEach((property) => loadRoles(property.id, () => active));
    return () => {
      active = false;
    };
  }, [isStaff, properties, loadRoles]);

  const changeProperties = (ids) => {
    setPropertyIds(ids);
    setErrors((prev) => ({ ...prev, propertyIds: undefined }));
  };

  const changeRole = (propertyId, option) => {
    setRoles((prev) => ({ ...prev, [propertyId]: { roleId: option.value, roleName: option.label } }));
    setErrors((prev) => ({ ...prev, [`role-${propertyId}`]: undefined }));
  };

  const submit = (event) => {
    event.preventDefault();
    const found = {};
    if (propertyIds.length === 0) found.propertyIds = "Select at least one property";
    if (isStaff) {
      propertyIds.forEach((id) => {
        if (!roles[id]) found[`role-${id}`] = "Select a role for this property";
      });
    }
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    onSave({
      propertyIds,
      roles: isStaff ? Object.fromEntries(propertyIds.map((id) => [id, roles[id]])) : {},
    });
  };

  const renderRole = (property) => {
    const options = roleOptions[property.id];
    const current = roles[property.id];
    const error = errors[`role-${property.id}`];
    const inputId = `access-role-${property.id}`;
    const value = current
      ? (Array.isArray(options) && options.find((option) => option.value === current.roleId)) || {
          value: current.roleId,
          label: current.roleName,
        }
      : null;
    return (
      <div className="flex flex-col pl-[58px]">
        <label htmlFor={inputId} className={fieldLabelClass}>
          Role in {property.name}
        </label>
        {options === "error" ? (
          <p className={`${ERROR_CLASS} flex flex-wrap items-center gap-[8px]`} role="alert">
            Couldn&apos;t load this property&apos;s roles.
            <DsTextLink
              onClick={() => {
                // Show "Loading roles..." only on Retry (not on every re-render).
                setRoleOptions((prev) => ({ ...prev, [property.id]: undefined }));
                loadRoles(property.id);
              }}
            >
              Retry
            </DsTextLink>
          </p>
        ) : (
          <Select
            inputId={inputId}
            options={Array.isArray(options) ? options : []}
            value={value}
            onChange={(option) => changeRole(property.id, option)}
            isDisabled={disabled}
            isLoading={!options}
            placeholder={options ? "Select role" : "Loading roles..."}
            styles={selectStyles(Boolean(error))}
            menuPortalTarget={document.body}
            menuPosition="fixed"
            aria-invalid={Boolean(error) || undefined}
          />
        )}
        {error && <p className={ERROR_CLASS}>{error}</p>}
      </div>
    );
  };

  return (
    <form id="manage-access-form" noValidate onSubmit={submit} className="flex flex-col gap-[10px]">
      <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
        {isStaff
          ? "Pick the properties and the role in each one. A person can have a different role in each property."
          : "Masters run every module in the properties you pick."}
      </p>
      <fieldset className="m-0 flex flex-col border-0 p-0">
        <legend className={fieldLabelClass}>Assigned properties</legend>
        <PropertyPicker
          properties={properties}
          selected={propertyIds}
          onChange={changeProperties}
          disabled={disabled}
          assignedIds={person.propertyIds}
          renderExtra={isStaff ? renderRole : undefined}
        />
        {errors.propertyIds && <p className={ERROR_CLASS}>{errors.propertyIds}</p>}
      </fieldset>
    </form>
  );
}

ManageAccessForm.propTypes = {
  person: PropTypes.shape({
    kind: PropTypes.oneOf(["master", "staff"]).isRequired,
    propertyIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    roleIdByProperty: PropTypes.object,
    roleNameByProperty: PropTypes.object,
  }).isRequired,
  viewer: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  onSave: PropTypes.func.isRequired,
};

export default ManageAccessForm;

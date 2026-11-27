import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { BuildingOfficeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { DsBadge, DsDot, DsIcon } from "../../../../../DesignSystem";
import Checkbox from "../../../../../Utils/Checkbox";

/**
 * Property photo + name + city, with a "Current" tag on the property the app
 * is switched to. Shared by the Manage access / invite picker (with a
 * checkbox) and the profile's assigned-property list (read-only), so both
 * look the same. `tags`: extra badges after the city.
 */
function PropertySummary({ property, tags }) {
  const currentId = useSelector((state) => state.login?.selectedHostel_Id);
  const isCurrent = Boolean(currentId) && String(currentId) === property.id;
  return (
    <span className="flex min-w-0 flex-1 items-center gap-[10px]">
      {property.image ? (
        <img src={property.image} alt="" className="size-[48px] shrink-0 rounded-full object-cover" />
      ) : (
        <span className="flex size-[48px] shrink-0 items-center justify-center rounded-full bg-[var(--ds-bg-primary-subtle)] text-[color:var(--ds-text-primary)]">
          <DsIcon src={BuildingOfficeIcon} size={20} />
        </span>
      )}
      <span className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <span className="flex min-w-0 flex-wrap items-center gap-[6px]">
          <span className="truncate text-[14px] font-medium leading-[20px] text-[color:var(--ds-text-default)]">
            {property.name}
          </span>
          {isCurrent && (
            <DsBadge tone="success" variant="solid" size="xs" dot={DsDot}>
              Current
            </DsBadge>
          )}
        </span>
        {(property.city || tags) && (
          <span className="flex min-w-0 flex-wrap items-center gap-[6px] text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
            {property.city && (
              <span className="flex min-w-0 items-center gap-[4px]">
                <DsIcon src={MapPinIcon} size={16} />
                <span className="truncate">{property.city}</span>
              </span>
            )}
            {tags}
          </span>
        )}
      </span>
    </span>
  );
}

PropertySummary.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    city: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  tags: PropTypes.node,
};

/**
 * Assignment tag when editing someone's access (`assignedIds` = what they
 * have now): Assigned / Not assigned, or what Save will change.
 */
function assignmentTag(wasAssigned, isSelected) {
  if (wasAssigned && isSelected) return { tone: "primary", label: "Assigned" };
  if (wasAssigned) return { tone: "danger", label: "Will be removed" };
  if (isSelected) return { tone: "success", label: "Will be added" };
  return { tone: "neutral", label: "Not assigned" };
}

/**
 * "Assign Properties" checklist (Figma invite / staff drawers): one card per
 * property — PropertySummary (photo, name, area, tags) — with a checkbox.
 * Selected cards get the brand tint.
 * - "Current" marks the property the app is switched to (PropertySummary).
 * - assignedIds (Manage access): Assigned / Not assigned / Will be added /
 *   Will be removed.
 * - showMasterHint (Invite a master): "Not Assigned" when it has no Master yet.
 * - renderExtra(property): shown under a selected card (e.g. the staff role
 *   for that property).
 */
function PropertyPicker({
  properties,
  selected,
  onChange,
  disabled = false,
  showMasterHint = false,
  assignedIds,
  renderExtra,
}) {
  const toggle = (id) =>
    onChange(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);

  if (properties.length === 0) {
    return (
      <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
        No properties you can assign.
      </p>
    );
  }

  return (
    <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
      {properties.map((property) => {
        const isSelected = selected.includes(property.id);
        const tag = assignedIds ? assignmentTag(assignedIds.includes(property.id), isSelected) : null;
        const extra = isSelected && renderExtra ? renderExtra(property) : null;
        return (
          <li
            key={property.id}
            className={`flex flex-col gap-[10px] rounded-[var(--ds-radius-sm)] border-[1px] border-solid px-[14px] py-[10px] transition-colors ${
              isSelected
                ? "border-[color:var(--ds-border-focus)] bg-[var(--ds-bg-info-subtle)]"
                : "border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] hover:bg-[var(--ds-bg-surface-subtle)]"
            }`}
          >
            <div className="flex items-center gap-[10px]">
              {/* Second label for the same checkbox: the whole card text toggles it. */}
              <label
                htmlFor={`assign-property-${property.id}`}
                className="m-0 flex min-w-0 flex-1 cursor-pointer items-center gap-[10px]"
              >
                <PropertySummary
                  property={property}
                  tags={
                    <>
                      {tag && (
                        <DsBadge tone={tag.tone} size="xs">
                          {tag.label}
                        </DsBadge>
                      )}
                      {showMasterHint && property.masterCount === 0 && (
                        <DsBadge tone="neutral">Not Assigned</DsBadge>
                      )}
                    </>
                  }
                />
              </label>
              <Checkbox
                id={`assign-property-${property.id}`}
                checked={isSelected}
                onChange={() => toggle(property.id)}
                disabled={disabled}
              />
            </div>
            {extra}
          </li>
        );
      })}
    </ul>
  );
}

PropertyPicker.propTypes = {
  properties: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      city: PropTypes.string,
      image: PropTypes.string,
      masterCount: PropTypes.number,
    }),
  ).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  showMasterHint: PropTypes.bool,
  assignedIds: PropTypes.arrayOf(PropTypes.string),
  renderExtra: PropTypes.func,
};

/**
 * Read-only list of a person's assigned properties on their profile: the same
 * cards as the Manage access picker, without the checkbox. `renderAside`
 * adds something on the right (e.g. the staff role in that property).
 */
function AssignedPropertyList({ propertyIds, propertiesById, renderAside }) {
  if (propertyIds.length === 0) {
    return (
      <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-placeholder)]">No property assigned</p>
    );
  }
  return (
    <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
      {propertyIds.map((id) => (
        <li
          key={id}
          className="flex items-center gap-[10px] rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-[14px] py-[10px]"
        >
          <PropertySummary property={propertiesById[id] || { id, name: "Property" }} />
          {renderAside && renderAside(id)}
        </li>
      ))}
    </ul>
  );
}

AssignedPropertyList.propTypes = {
  propertyIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  propertiesById: PropTypes.object.isRequired,
  renderAside: PropTypes.func,
};

export { PropertySummary, PropertyPicker, AssignedPropertyList };

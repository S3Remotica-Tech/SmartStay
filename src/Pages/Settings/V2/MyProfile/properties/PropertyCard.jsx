import React from "react";
import PropTypes from "prop-types";
import { BuildingOfficeIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import {
  DsBadge,
  DsCard,
  DsProgress,
  DsTextLink,
  DsActionMenu,
  DsDot,
  DsIcon,
} from "../../../../../DesignSystem";
import { PROPERTY_ACTION } from "../lib/myProfilePermissions";
import { PROPERTY_ACTION_META } from "../lib/myProfileActionMeta";
import { countLabel } from "../lib/myProfileUtils";

function teamLine(property) {
  const known = (value) => value !== null && value !== undefined;
  if (!known(property.masterCount) && !known(property.staffCount)) return "";
  const staff = `${property.staffCount || 0} staff`;
  if (property.ownership === "shared") return `You + ${staff}`;
  return `${countLabel(property.masterCount || 0, "master")} · ${staff}`;
}

/**
 * Property card (Figma 156:4706): name, address, Owner / Master badge, bed
 * occupancy, team size, and the primary "Switch to property" ("Open as
 * master" when shared). The other allowed actions sit in the "⋯" menu.
 * isCurrent: the property the app is switched to — brand ring, "Current"
 * tag, and no switch link.
 */
function PropertyCard({ property, actions, onAction, isCurrent = false }) {
  const shared = property.ownership === "shared";
  const menuItems = actions
    .filter((action) => action !== PROPERTY_ACTION.SWITCH)
    .map((action) => ({ key: action, ...PROPERTY_ACTION_META[action] }));
  // Leave workspace is the destructive one: keep it last, after a divider.
  const leave = menuItems.filter((item) => item.key === PROPERTY_ACTION.LEAVE_WORKSPACE);
  const others = menuItems.filter((item) => item.key !== PROPERTY_ACTION.LEAVE_WORKSPACE);
  const groups = [others, leave].filter((group) => group.length > 0);
  const subtitle = shared
    ? [property.ownerName && `Owned by ${property.ownerName}`, property.address].filter(Boolean).join(" · ")
    : property.address;

  return (
    <DsCard
      as="article"
      aria-current={isCurrent || undefined}
      className={`flex flex-col gap-[16px] p-[20px] ${
        isCurrent ? "ring-1 ring-[color:var(--ds-border-focus)]" : ""
      }`}
    >
      <div className="flex items-start gap-[12px]">
        <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[var(--ds-radius-sm)] bg-[var(--ds-bg-primary-subtle)] text-[color:var(--ds-text-primary)]">
          <DsIcon src={BuildingOfficeIcon} size={20} />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-[2px]">
          <div className="flex min-w-0 flex-wrap items-center gap-[6px]">
            <h3 className="truncate text-[16px] font-semibold leading-[23px] text-[color:var(--ds-text-default)]">
              {property.name}
            </h3>
            {isCurrent && (
              <DsBadge tone="success" variant="solid" size="xs" dot={DsDot}>
                Current
              </DsBadge>
            )}
          </div>
          {subtitle && (
            <p className="line-clamp-2 text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
              {subtitle}
            </p>
          )}
        </div>
        <DsBadge tone={shared ? "primary" : "warning"}>{shared ? "Master" : "Owner"}</DsBadge>
        {groups.length > 0 && (
          <DsActionMenu groups={groups} onSelect={onAction} label={`More actions for ${property.name}`} />
        )}
      </div>

      {property.beds ? (
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center text-[14px] font-medium leading-[20px] text-[color:var(--ds-text-default)]">
            <span>
              {property.beds.filled} of {property.beds.total} beds filled
            </span>
            <span className="flex-1" />
            <span>{property.beds.percent}%</span>
          </div>
          <DsProgress value={property.beds.percent} label={`${property.name} occupancy`} />
        </div>
      ) : (
        <p className="text-[13px] leading-[19px] text-[color:var(--ds-text-placeholder)]">
          Occupancy not available
        </p>
      )}

      <div className="flex items-center gap-[8px] border-t-[1px] border-solid border-[color:var(--ds-border-default)] pt-[16px]">
        <span className="text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
          {teamLine(property)}
        </span>
        <span className="flex-1" />
        {isCurrent && (
          <span className="flex items-center gap-[4px] text-[13px] font-medium leading-[19px] text-[color:var(--ds-text-success)]">
            <DsIcon src={CheckCircleIcon} size={16} />
            You&apos;re viewing this property
          </span>
        )}
        {!isCurrent && actions.includes(PROPERTY_ACTION.SWITCH) && (
          <DsTextLink onClick={() => onAction(PROPERTY_ACTION.SWITCH)}>
            {shared ? "Open as master" : "Switch to property"}
          </DsTextLink>
        )}
      </div>
    </DsCard>
  );
}

PropertyCard.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    ownership: PropTypes.string,
    ownerName: PropTypes.string,
    beds: PropTypes.shape({
      filled: PropTypes.number,
      total: PropTypes.number,
      percent: PropTypes.number,
    }),
    masterCount: PropTypes.number,
    staffCount: PropTypes.number,
  }).isRequired,
  actions: PropTypes.arrayOf(PropTypes.string).isRequired,
  onAction: PropTypes.func.isRequired,
  isCurrent: PropTypes.bool,
};

export default PropertyCard;

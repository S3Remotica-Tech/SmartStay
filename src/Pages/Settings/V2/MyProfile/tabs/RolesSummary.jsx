import React from "react";
import PropTypes from "prop-types";
import { DsCard, DsTextLink } from "../../../../../DesignSystem";
import { rolesOf } from "../lib/myProfileUtils";

/**
 * "Roles in use" (Figma 155:4925): one stat tile per role with its head
 * count. Someone who is Warden in one property and Co Admin in another counts
 * once under each.
 */
function RolesSummary({ people, onManageRoles }) {
  const counts = people.reduce((acc, person) => {
    rolesOf(person).forEach((roleName) => {
      acc[roleName] = (acc[roleName] || 0) + 1;
    });
    return acc;
  }, {});
  const roles = Object.entries(counts);
  if (roles.length === 0) return null;

  return (
    <DsCard className="flex w-full flex-col gap-[12px] px-[24px] py-[20px]">
      <div className="flex w-full items-center gap-[8px]">
        <h3 className="text-[16px] font-semibold leading-[23px] text-[color:var(--ds-text-default)]">
          Roles in use
        </h3>
        <span className="flex-1" />
        {onManageRoles && <DsTextLink onClick={onManageRoles}>Manage roles &amp; permissions</DsTextLink>}
      </div>
      <ul className="m-0 grid list-none grid-cols-2 gap-[12px] p-0 md:grid-cols-3 xl:grid-cols-5">
        {roles.map(([role, count]) => (
          <li
            key={role}
            className="flex flex-col gap-[8px] rounded-[var(--ds-radius-md)] bg-[var(--ds-bg-surface-subtle)] p-[16px]"
          >
            <span className="text-[24px] font-semibold leading-[35px] text-[color:var(--ds-text-default)]">
              {count}
            </span>
            <span className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">{role}</span>
          </li>
        ))}
      </ul>
    </DsCard>
  );
}

RolesSummary.propTypes = {
  people: PropTypes.arrayOf(PropTypes.shape({ roleName: PropTypes.string })).isRequired,
  onManageRoles: PropTypes.func,
};

export default RolesSummary;

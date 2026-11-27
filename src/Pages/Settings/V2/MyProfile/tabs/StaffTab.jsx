import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BuildingOfficeIcon, FunnelIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import {
  DsBadge,
  DsButton,
  DsCard,
  DsSearchField,
  DsActionMenu,
  DsFilterDropdown,
  DsDataTable,
  DsIcon,
} from "../../../../../DesignSystem";
import InviteDrawer from "../people/InviteDrawer";
import PersonActionsHost from "../people/PersonActionsHost";
import PersonCell from "../people/PersonCell";
import PropertyTags from "../properties/PropertyTags";
import RolesSummary from "./RolesSummary";
import StatusBadge from "../people/StatusBadge";
import useProfileTable from "../hooks/useProfileTable";
import usePersonActions from "../hooks/usePersonActions";
import { listRoles, listStaff, reportApiError } from "../lib/myProfileService";
import {
  ACTION,
  ROLE,
  STATUS,
  canAssignRole,
  canInviteStaff,
  getAllowedActions,
  groupActions,
  isVisibleToViewer,
  roleKeyFromName,
  scopedProperties,
} from "../lib/myProfilePermissions";
import { ACTION_META } from "../lib/myProfileActionMeta";
import { propertyNames, rolesOf } from "../lib/myProfileUtils";

const TOOLBAR_BUTTON = "!h-[36px]";

/**
 * Managed staffs tab (Figma 155:3785). One component for every viewer: the
 * Admin sees all staff in all properties, a Master only the staff in their
 * own properties. Filter: Roles only. "View team" on a property card opens
 * this tab narrowed to that property (removable chip). Click a row to open
 * the profile; the "⋯" menu holds the other allowed actions.
 */
function StaffTab({ viewer, properties, initialPropertyId, onChanged }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inviting, setInviting] = useState(false);
  const [roleOptions, setRoleOptions] = useState([]);
  const ownProperties = useMemo(() => scopedProperties(viewer, properties), [viewer, properties]);

  const load = useCallback(() => listStaff(ownProperties), [ownProperties]);
  const visible = useCallback((person) => isVisibleToViewer(viewer, person), [viewer]);
  const table = useProfileTable({
    load,
    visible,
    initialFilters: initialPropertyId ? { properties: [initialPropertyId] } : undefined,
  });
  const { reload } = table;

  const refresh = useCallback(() => {
    reload();
    onChanged();
  }, [reload, onChanged]);
  const controller = usePersonActions({ onChanged: refresh });

  // Roles are defined per property; the workspace shares one role list.
  const roleSourceId = ownProperties[0]?.id;
  useEffect(() => {
    if (!roleSourceId) return;
    listRoles(roleSourceId)
      .then(setRoleOptions)
      .catch((err) => {
        setRoleOptions([]);
        toast.error(`Couldn't load roles, so Invite staff has no roles. ${reportApiError(err, dispatch)}`);
      });
  }, [roleSourceId, dispatch]);

  const propertiesById = useMemo(
    () => Object.fromEntries(properties.map((property) => [property.id, property])),
    [properties],
  );
  const roleFilterOptions = useMemo(
    () =>
      [...new Set(table.all.flatMap(rolesOf))]
        .sort()
        .map((name) => ({ value: name, label: name })),
    [table.all],
  );
  const propertyFilter = table.filters.properties;
  const activeCount = table.all.filter((person) => person.status === STATUS.ACTIVE).length;
  // "All N properties" compares against the workspace's own properties.
  const ownedCount = properties.filter((property) => property.ownership === "owned").length;

  const columns = [
    {
      key: "staff",
      header: "Staff",
      headerClassName: "w-[260px]",
      render: (person) => <PersonCell person={person} />,
    },
    {
      key: "role",
      header: "Role",
      headerClassName: "w-[160px]",
      // Roles are per property: list each distinct one (Warden, Co Admin).
      render: (person) => (
        <div className="flex flex-wrap gap-[4px]">
          {rolesOf(person).map((roleName) => (
            <DsBadge key={roleName} tone={roleKeyFromName(roleName) === ROLE.STAFF ? "neutral" : "primary"}>
              {roleName}
            </DsBadge>
          ))}
        </div>
      ),
    },
    {
      key: "properties",
      header: "Properties",
      render: (person) => (
        <PropertyTags
          names={propertyNames(person.propertyIds, propertiesById)}
          totalProperties={ownedCount}
        />
      ),
    },
    {
      key: "access",
      header: "Can access",
      headerClassName: "w-[230px]",
      render: (person) => (
        <div className="flex flex-col gap-[2px]">
          <span className="text-[13px] leading-[19px] text-[color:var(--ds-text-default)]">
            {person.accessSummary || "—"}
          </span>
          {person.accessLevel && (
            <span className="text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
              {person.accessLevel}
            </span>
          )}
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      headerClassName: "w-[150px]",
      render: (person) => <StatusBadge status={person.status} />,
    },
    {
      key: "actions",
      srHeader: "Actions",
      headerClassName: "w-[64px]",
      render: (person) => (
        <DsActionMenu
          label={`Actions for ${person.name}`}
          groups={groupActions(getAllowedActions(viewer, person)).map((group) =>
            group.map((action) => ({ key: action, ...ACTION_META[action] })),
          )}
          onSelect={(action) => controller.start(action, person)}
        />
      ),
    },
  ];

  return (
    <>
      <DsCard className="flex w-full flex-col gap-[16px] p-[16px]">
        <div className="flex w-full flex-wrap items-center gap-[12px]">
          <DsFilterDropdown
            label="All roles"
            icon={FunnelIcon}
            options={roleFilterOptions}
            value={table.filters.roles}
            onChange={(value) => table.setFilter("roles", value)}
            multiple
            disabled={table.status !== "ready" || roleFilterOptions.length === 0}
          />
          {propertyFilter.length > 0 && (
            <span className="inline-flex h-[36px] items-center gap-[6px] rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-bg-primary)] bg-[var(--ds-bg-primary-subtle)] pl-[10px] pr-[4px] text-[14px] font-medium leading-[20px] text-[color:var(--ds-text-primary)]">
              <DsIcon src={BuildingOfficeIcon} size={16} />
              {propertyNames(propertyFilter, propertiesById).join(", ") || "Property"}
              <button
                type="button"
                onClick={() => table.setFilter("properties", [])}
                aria-label="Show staff of every property"
                title="Show all properties"
                className="flex size-[28px] items-center justify-center rounded-[var(--ds-radius-sm)] hover:bg-[var(--ds-bg-surface)]"
              >
                <DsIcon src={XMarkIcon} size={16} />
              </button>
            </span>
          )}
          <div className="ml-auto flex w-full flex-wrap items-center gap-[12px] sm:w-auto">
            {table.status === "ready" && (
              <span className="whitespace-nowrap text-[14px] leading-[20px] text-[color:var(--ds-text-secondary)]">
                {table.all.length} staff · {activeCount} active
              </span>
            )}
            <DsSearchField
              value={table.search}
              onChange={table.setSearch}
              placeholder="Search staff"
              label="Search staff"
              className="w-full sm:w-[280px]"
            />
            {canInviteStaff(viewer) && (
              <DsButton variant="primary" className={TOOLBAR_BUTTON} onClick={() => setInviting(true)}>
                <DsIcon src={PlusIcon} size={16} />
                Invite staff
              </DsButton>
            )}
          </div>
        </div>

        <DsDataTable
          caption="Managed staffs"
          columns={columns}
          rows={table.pageRows}
          rowKey={(person) => person.id}
          status={table.status}
          error={table.error}
          onRetry={table.reload}
          hasQuery={table.hasQuery}
          onClearQuery={table.clearAll}
          emptyTitle="No staff yet"
          emptyMessage="Invite staff to give them access to your properties."
          pagination={table.pagination}
          onRowClick={(person) => controller.start(ACTION.VIEW, person)}
          rowLabel={(person) => `Open ${person.name}'s profile`}
        />
      </DsCard>

      {table.status === "ready" && (
        <RolesSummary
          people={table.all.filter((person) => person.status === STATUS.ACTIVE)}
          onManageRoles={() => navigate("../role")}
        />
      )}

      <PersonActionsHost
        controller={controller}
        viewer={viewer}
        people={table.all}
        properties={properties}
      />

      {inviting && (
        <InviteDrawer
          kind="staff"
          properties={ownProperties}
          roleOptions={roleOptions.filter((option) => canAssignRole(viewer, option.label))}
          onClose={() => setInviting(false)}
          onInvited={() => {
            setInviting(false);
            refresh();
          }}
        />
      )}
    </>
  );
}

StaffTab.propTypes = {
  viewer: PropTypes.shape({
    role: PropTypes.string.isRequired,
    propertyIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  properties: PropTypes.array.isRequired,
  initialPropertyId: PropTypes.string,
  onChanged: PropTypes.func.isRequired,
};

export default StaffTab;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  DsBadge,
  DsButton,
  DsCard,
  DsSearchField,
  DsActionMenu,
  DsDataTable,
  DsInfoNote,
  DsIcon,
} from "../../../../../DesignSystem";
import InviteDrawer from "../people/InviteDrawer";
import PersonActionsHost from "../people/PersonActionsHost";
import PersonCell from "../people/PersonCell";
import PropertyTags from "../properties/PropertyTags";
import StatusBadge from "../people/StatusBadge";
import useProfileTable from "../hooks/useProfileTable";
import usePersonActions from "../hooks/usePersonActions";
import { getMasterSeats, listMasters, reportApiError } from "../lib/myProfileService";
import {
  ACTION,
  ROLE,
  STATUS,
  canInviteMaster,
  getAllowedActions,
  groupActions,
  isVisibleToViewer,
  scopedProperties,
} from "../lib/myProfilePermissions";
import { ACTION_META } from "../lib/myProfileActionMeta";
import { normaliseMaster, propertyNames, timeAgo } from "../lib/myProfileUtils";

const TOOLBAR_BUTTON = "!h-[36px]";

/**
 * Masters tab (Figma 154:3086): who co-runs the workspace's properties.
 * Your own Admin entry is pinned first. Click a row to open the profile;
 * the "⋯" menu holds the other allowed actions.
 */
function MastersTab({ viewer, properties, onChanged }) {
  const dispatch = useDispatch();
  const [inviting, setInviting] = useState(false);
  const [seats, setSeats] = useState(null);
  const canInvite = canInviteMaster(viewer);

  // Your own entry comes first. When admin-list doesn't include you, it is
  // built from your account (the Admin has every property).
  const load = useCallback(
    () =>
      listMasters({ selfId: viewer.id, properties }).then((list) => {
        const self = list.find((person) => person.isSelf);
        const others = list.filter((person) => !person.isSelf);
        const hasAccount = viewer.id !== null && viewer.id !== undefined && viewer.account;
        const ownRow =
          self ||
          (hasAccount
            ? normaliseMaster(
                { ...viewer.account, hostelIds: viewer.propertyIds, lastActiveAt: new Date().toISOString() },
                viewer.id,
              )
            : null);
        if (!ownRow) return others;
        // The Admin's entry always reads as Admin with full access.
        const own =
          viewer.role === ROLE.SUPER_ADMIN
            ? { ...ownRow, role: ROLE.SUPER_ADMIN, roleName: viewer.account?.roleName || "Admin" }
            : ownRow;
        return [own, ...others];
      }),
    [viewer.id, viewer.role, viewer.account, viewer.propertyIds, properties],
  );
  const visible = useCallback(
    (person) => person.isSelf || isVisibleToViewer(viewer, person),
    [viewer],
  );
  const table = useProfileTable({ load, visible });
  const { reload } = table;

  const refresh = useCallback(() => {
    reload();
    onChanged();
  }, [reload, onChanged]);
  const controller = usePersonActions({ onChanged: refresh });

  useEffect(() => {
    if (!canInvite) return;
    getMasterSeats()
      .then(setSeats)
      .catch((err) => {
        setSeats(null);
        toast.error(`Couldn't load master seats. ${reportApiError(err, dispatch)}`);
      });
  }, [canInvite, dispatch]);

  const propertiesById = useMemo(
    () => Object.fromEntries(properties.map((property) => [property.id, property])),
    [properties],
  );

  const columns = [
    {
      key: "master",
      header: "Master",
      headerClassName: "w-[300px]",
      render: (person) => <PersonCell person={person} />,
    },
    {
      key: "role",
      header: "Role",
      headerClassName: "w-[150px]",
      render: (person) => (
        <DsBadge tone={person.role === ROLE.SUPER_ADMIN ? "warning" : "primary"}>{person.roleName}</DsBadge>
      ),
    },
    {
      key: "properties",
      header: "Properties",
      render: (person) => (
        <PropertyTags names={propertyNames(person.propertyIds, propertiesById)} moreLabel />
      ),
    },
    {
      key: "lastActive",
      header: "Last active",
      headerClassName: "w-[150px]",
      render: (person) => (
        <span className="whitespace-nowrap text-[14px] leading-[20px] text-[color:var(--ds-text-default)]">
          {person.status === STATUS.ACTIVE || person.status === STATUS.DEACTIVATED
            ? timeAgo(person.lastActiveAt)
            : "—"}
        </span>
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
          <DsSearchField
            value={table.search}
            onChange={table.setSearch}
            placeholder="Search name, phone or ID"
            label="Search masters"
            className="w-full sm:w-[320px]"
          />
          <div className="ml-auto flex flex-wrap items-center gap-[12px]">
            {canInvite && seats && (
              <span className="whitespace-nowrap text-[14px] leading-[20px] text-[color:var(--ds-text-secondary)]">
                {seats.used} of {seats.total} master seats used
              </span>
            )}
            {canInvite && (
              <DsButton variant="primary" className={TOOLBAR_BUTTON} onClick={() => setInviting(true)}>
                <DsIcon src={PlusIcon} size={16} />
                Invite master
              </DsButton>
            )}
          </div>
        </div>

        <DsDataTable
          caption="Masters"
          columns={columns}
          rows={table.pageRows}
          rowKey={(person) => person.id}
          status={table.status}
          error={table.error}
          onRetry={table.reload}
          hasQuery={table.hasQuery}
          onClearQuery={table.clearAll}
          emptyTitle="No masters yet"
          emptyMessage={
            canInvite
              ? "Invite a master to run properties with you."
              : "Masters who share your properties show up here."
          }
          pagination={table.pagination}
          onRowClick={(person) => controller.start(ACTION.VIEW, person)}
          rowLabel={(person) => `Open ${person.name}'s profile`}
        />
      </DsCard>

      <DsInfoNote title="What masters can't do">
        Only the Admin can transfer ownership, change the plan or delete the workspace.
        Everything else is shared.
      </DsInfoNote>

      <PersonActionsHost
        controller={controller}
        viewer={viewer}
        people={table.all}
        properties={properties}
      />

      {inviting && (
        <InviteDrawer
          kind="master"
          properties={scopedProperties(viewer, properties).filter(
            (property) => property.ownership === "owned",
          )}
          seats={seats}
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

MastersTab.propTypes = {
  viewer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string.isRequired,
    propertyIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    account: PropTypes.shape({ roleName: PropTypes.string }),
  }).isRequired,
  properties: PropTypes.array.isRequired,
  onChanged: PropTypes.func.isRequired,
};

export default MastersTab;

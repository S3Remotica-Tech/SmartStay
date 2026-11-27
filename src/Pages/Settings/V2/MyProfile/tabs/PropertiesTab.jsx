import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowRightStartOnRectangleIcon, ArrowsRightLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import { DsButton, DsCard, DsDialog, DsInfoNote, DsIcon } from "../../../../../DesignSystem";
import Skeleton from "../../../../../Utils/Skeleton";
import InviteDrawer from "../people/InviteDrawer";
import PropertyCard from "../properties/PropertyCard";
import {
  leaveWorkspace,
  listMasters,
  listRoles,
  listStaff,
  reportApiError,
  switchProperty,
} from "../lib/myProfileService";
import {
  PROPERTY_ACTION,
  canAddProperty,
  canAssignRole,
  getPropertyActions,
} from "../lib/myProfilePermissions";

const GRID = "grid grid-cols-1 gap-[16px] md:grid-cols-2 xl:grid-cols-3";

function ownedSummary(owned) {
  const withBeds = owned.filter((property) => property.beds);
  const parts = [`${owned.length} propert${owned.length === 1 ? "y" : "ies"}`];
  if (withBeds.length === owned.length && owned.length > 0) {
    const total = withBeds.reduce((sum, property) => sum + property.beds.total, 0);
    const filled = withBeds.reduce((sum, property) => sum + property.beds.filled, 0);
    parts.push(`${total} beds`, `${Math.round((filled / total) * 100)}% occupied`);
  }
  return parts.join(" · ");
}

/**
 * Properties tab (Figma 156:4706): "Owned by you" and "Shared with you".
 * Card actions: Switch to property, View team, Invite staff to this
 * property, and Leave workspace on a property shared into another owner's
 * workspace. Only the Super Admin sees Add property.
 */
function PropertiesTab({ viewer, properties, status, error, onRetry, onViewTeam, onChanged }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [invite, setInvite] = useState(null); // { property, roleOptions }
  const [leaving, setLeaving] = useState(null);
  const [switching, setSwitching] = useState(null);
  const [busy, setBusy] = useState(false);
  const currentId = useSelector((state) => state.login?.selectedHostel_Id);
  const isCurrent = (property) => Boolean(currentId) && String(currentId) === property.id;
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [team, setTeam] = useState({}); // propertyId → { staffCount, masterCount }

  // Team size per property from the same lists the Masters / staff tabs use.
  useEffect(() => {
    if (properties.length === 0) return undefined;
    let cancelled = false;
    Promise.allSettled([listStaff(properties), listMasters({ selfId: viewer.id, properties })]).then(
      ([staff, masters]) => {
        if (cancelled) return;
        const counts = {};
        const add = (people, key) =>
          people.forEach((person) =>
            person.propertyIds.forEach((id) => {
              counts[id] = { staffCount: 0, masterCount: 0, ...counts[id] };
              counts[id][key] += 1;
            }),
          );
        if (staff.status === "fulfilled") add(staff.value, "staffCount");
        if (masters.status === "fulfilled") add(masters.value.filter((person) => !person.isSelf), "masterCount");
        setTeam(counts);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [properties, viewer.id]);

  const withTeam = useMemo(
    () =>
      properties.map((property) => ({
        ...property,
        staffCount: property.staffCount ?? team[property.id]?.staffCount ?? 0,
        masterCount: property.masterCount ?? team[property.id]?.masterCount ?? 0,
      })),
    [properties, team],
  );
  const owned = withTeam.filter((property) => property.ownership === "owned");
  const shared = withTeam.filter((property) => property.ownership === "shared");

  const onAction = (property, action) => {
    if (action === PROPERTY_ACTION.SWITCH) {
      if (!isCurrent(property)) setSwitching(property);
    } else if (action === PROPERTY_ACTION.VIEW_TEAM) {
      onViewTeam(property.id);
    } else if (action === PROPERTY_ACTION.INVITE_STAFF) {
      if (loadingRoles) return;
      setLoadingRoles(true);
      listRoles(property.id)
        .then((roles) =>
          setInvite({ property, roleOptions: roles.filter((role) => canAssignRole(viewer, role.label)) }),
        )
        .catch((err) => toast.error(reportApiError(err, dispatch)))
        .finally(() => setLoadingRoles(false));
    } else if (action === PROPERTY_ACTION.LEAVE_WORKSPACE) {
      setLeaving(property);
    }
  };

  const confirmLeave = async () => {
    setBusy(true);
    try {
      await leaveWorkspace(leaving);
      toast.success(`You left ${leaving.name}`);
      setLeaving(null);
      onChanged();
    } catch (err) {
      toast.error(reportApiError(err, dispatch));
    } finally {
      setBusy(false);
    }
  };

  const confirmSwitch = () => {
    switchProperty(dispatch, switching);
    toast.success(`Switched to ${switching.name}`);
    setSwitching(null);
  };

  const currentName = withTeam.find(isCurrent)?.name;

  // The current property comes first.
  const renderCards = (list) => (
    <div className={GRID}>
      {[...list.filter(isCurrent), ...list.filter((property) => !isCurrent(property))].map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
          actions={getPropertyActions(viewer, property)}
          onAction={(action) => onAction(property, action)}
          isCurrent={isCurrent(property)}
        />
      ))}
    </div>
  );

  if (status === "loading") {
    return (
      <div className={GRID} aria-busy="true">
        {[0, 1, 2].map((key) => (
          <DsCard key={key} className="flex flex-col gap-[16px] p-[20px]">
            <Skeleton className="h-[20px] w-[60%]" />
            <Skeleton className="h-[14px] w-[80%]" />
            <Skeleton className="h-[6px] w-full" />
          </DsCard>
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <DsCard role="alert" className="flex flex-col items-center gap-[4px] px-[24px] py-[48px] text-center">
        <span className="text-[16px] font-semibold leading-[23px] text-[color:var(--ds-text-default)]">
          Couldn&apos;t load properties
        </span>
        <span className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">{error}</span>
        <DsButton className="mt-[8px]" onClick={onRetry}>
          Retry
        </DsButton>
      </DsCard>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-[12px]">
        <div className="flex flex-wrap items-center gap-[8px]">
          <h3 className="text-[18px] font-semibold leading-[26px] text-[color:var(--ds-text-default)]">
            Owned by You
          </h3>
          <span className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
            {ownedSummary(owned)}
          </span>
          <span className="flex-1" />
          {canAddProperty(viewer) && (
            <DsButton variant="primary" onClick={() => navigate("../manage-pg")}>
              <DsIcon src={PlusIcon} size={16} />
              Add property
            </DsButton>
          )}
        </div>
        {owned.length > 0 ? (
          renderCards(owned)
        ) : (
          <DsCard className="px-[24px] py-[32px] text-center text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
            You don&apos;t own any properties yet.
          </DsCard>
        )}
      </section>

      {shared.length > 0 && (
        <section className="flex flex-col gap-[12px]">
          <div className="flex flex-wrap items-center gap-[8px]">
            <h3 className="text-[18px] font-semibold leading-[26px] text-[color:var(--ds-text-default)]">
              Shared with you
            </h3>
            <span className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
              You work here as a master for another owner
            </span>
          </div>
          {renderCards(shared)}
          <DsInfoNote title="Shared properties stay separate">
            Bills, tenants and staff of {shared.map((property) => property.name).join(", ")} are never
            mixed with your own properties. Your access there is controlled by its owner.
          </DsInfoNote>
        </section>
      )}

      {invite && (
        <InviteDrawer
          kind="staff"
          properties={[invite.property]}
          roleOptions={invite.roleOptions}
          initialPropertyIds={[invite.property.id]}
          onClose={() => setInvite(null)}
          onInvited={() => {
            setInvite(null);
            onChanged();
          }}
        />
      )}

      {switching && (
        <DsDialog
          title={`Switch to ${switching.name}?`}
          description={`Tenants, bills, rooms and reports across the app will show ${switching.name}${
            currentName ? ` instead of ${currentName}` : ""
          }. You can switch back any time.`}
          icon={ArrowsRightLeftIcon}
          tone="primary"
          confirmLabel="Switch property"
          onClose={() => setSwitching(null)}
          onConfirm={confirmSwitch}
        />
      )}

      {leaving && (
        <DsDialog
          title={`Leave ${leaving.name}?`}
          description={`You lose access to ${leaving.name} right away. ${
            leaving.ownerName || "The owner"
          } keeps all its data and can invite you again.`}
          icon={ArrowRightStartOnRectangleIcon}
          tone="danger"
          confirmLabel="Leave workspace"
          danger
          busy={busy}
          onClose={() => !busy && setLeaving(null)}
          onConfirm={confirmLeave}
        />
      )}
    </>
  );
}

PropertiesTab.propTypes = {
  viewer: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    role: PropTypes.string.isRequired,
  }).isRequired,
  properties: PropTypes.array.isRequired,
  status: PropTypes.oneOf(["loading", "error", "ready"]).isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
  onViewTeam: PropTypes.func.isRequired,
  onChanged: PropTypes.func.isRequired,
};

export default PropertiesTab;

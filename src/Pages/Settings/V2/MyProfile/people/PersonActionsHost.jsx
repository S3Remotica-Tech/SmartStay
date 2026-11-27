import React from "react";
import PropTypes from "prop-types";
import { ArrowPathIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { DsDialog } from "../../../../../DesignSystem";
import ActivityDrawer from "../profile/ActivityDrawer";
import { ChangeRoleModal, DeactivateModal, RemoveModal } from "./PersonDialogs";
import PersonDrawer from "./PersonDrawer";
import {
  changeRole,
  deactivate,
  editAccess,
  editDetails,
  reactivate,
  remove,
  revokeInvite,
} from "../lib/myProfileService";
import { ACTION, STATUS, getAllowedActions, scopedProperties } from "../lib/myProfilePermissions";
import { propertyNames } from "../lib/myProfileUtils";

// Master ↔ Co-admin are the only roles a Master row can switch between.
const MASTER_ROLE_OPTIONS = [
  { value: "master", label: "Master" },
  { value: "co_admin", label: "Co Admin" },
];

/**
 * Renders the drawer / modal for the open row action (usePersonActions) and
 * runs it through the service. Shared by the Masters and Managed users tabs,
 * so both use the same flows; the permission helper decides what is shown.
 */
function PersonActionsHost({ controller, viewer, people, properties }) {
  const { current, start, close, run, busy } = controller;
  if (!current) return null;
  const { action, person } = current;
  const allowed = getAllowedActions(viewer, person);
  if (!allowed.includes(action)) return null;

  const propertiesById = Object.fromEntries(properties.map((property) => [property.id, property]));
  const names = propertyNames(person.propertyIds, propertiesById);
  const firstName = person.name.split(" ")[0];

  switch (action) {
    case ACTION.VIEW:
    case ACTION.EDIT_DETAILS:
    case ACTION.MANAGE_ACCESS:
      return (
        <PersonDrawer
          key={`${person.id}-${action}`}
          person={person}
          mode={action}
          viewer={viewer}
          allowed={allowed}
          propertiesById={propertiesById}
          assignableProperties={scopedProperties(viewer, properties)}
          busy={busy}
          onAction={(next) => start(next, person)}
          onClose={close}
          onSaveDetails={(details) =>
            run(() => editDetails(person, details), `${details.name}'s details are saved`)
          }
          onSaveAccess={(access) => run(() => editAccess(person, access), `${person.name}'s access is saved`)}
        />
      );
    case ACTION.VIEW_ACTIVITY:
      return <ActivityDrawer person={person} onClose={close} />;
    case ACTION.CHANGE_ROLE:
      // Masters only: staff roles are per property, in Manage access.
      return (
        <ChangeRoleModal
          person={person}
          roleOptions={MASTER_ROLE_OPTIONS}
          busy={busy}
          onClose={close}
          onConfirm={(role) => run(() => changeRole(person, role), `${person.name} is now ${role.roleName}`)}
        />
      );
    case ACTION.REVOKE_INVITE:
      return (
        <DsDialog
          title={`Revoke ${person.name}'s invite?`}
          description="The invite link stops working right away. You can invite them again later."
          icon={XCircleIcon}
          tone="danger"
          confirmLabel="Revoke invite"
          danger
          busy={busy}
          onClose={close}
          onConfirm={() => run(() => revokeInvite(person), `Invite to ${person.name} revoked`)}
        />
      );
    case ACTION.REACTIVATE:
      return (
        <DsDialog
          title={`Reactivate ${person.name}?`}
          description={`${firstName} can sign in again and gets back access to ${
            names.length ? names.join(", ") : "their properties"
          } with the role ${person.roleName}.`}
          icon={ArrowPathIcon}
          tone="primary"
          confirmLabel="Reactivate"
          busy={busy}
          onClose={close}
          onConfirm={() => run(() => reactivate(person), `${person.name} is active again`)}
        />
      );
    case ACTION.DEACTIVATE:
      return (
        <DeactivateModal
          person={person}
          propertyNames={names}
          reassignOptions={people
            .filter(
              (other) =>
                other.kind === person.kind && other.id !== person.id && other.status === STATUS.ACTIVE,
            )
            .map((other) => ({ value: other.id, label: `${other.name} · ${other.roleName}` }))}
          busy={busy}
          onClose={close}
          onConfirm={(options) => run(() => deactivate(person, options), `${person.name} is deactivated`)}
        />
      );
    case ACTION.REMOVE:
      return (
        <RemoveModal
          person={person}
          busy={busy}
          onClose={close}
          onConfirm={() => run(() => remove(person), `${person.name} is removed`)}
        />
      );
    default:
      return null;
  }
}

PersonActionsHost.propTypes = {
  controller: PropTypes.shape({
    current: PropTypes.object,
    start: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    run: PropTypes.func.isRequired,
    busy: PropTypes.bool,
  }).isRequired,
  viewer: PropTypes.object.isRequired,
  people: PropTypes.array.isRequired,
  properties: PropTypes.array.isRequired,
};

export default PersonActionsHost;

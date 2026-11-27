// My profile · team permissions. Every "who may do what" rule for the
// Masters, Managed staffs and Properties tabs lives here, nowhere else.
//
// The Admin (account roleId 1 or 2, the same check Sidebar.jsx uses for
// RoleAccess) is the Super Admin here and can do everything: every master,
// every staff, every property, every action.
//
// DISPLAY ONLY: this decides which menu items the UI shows. The server must
// enforce exactly the same rules on every endpoint.

export const ROLE = {
  SUPER_ADMIN: "super_admin",
  MASTER: "master",
  CO_ADMIN: "co_admin",
  STAFF: "staff",
};

export const STATUS = {
  ACTIVE: "active",
  INVITED: "invited",
  EXPIRED: "expired",
  REVOKED: "revoked",
  DEACTIVATED: "deactivated",
};

export const ACTION = {
  // Opened by clicking the row; not listed in the row menu.
  VIEW: "view",
  // Contact details only: name, mobile, email.
  EDIT_DETAILS: "editDetails",
  // Assigned properties; for staff also the role in each property.
  MANAGE_ACCESS: "manageAccess",
  // Masters only (Master ↔ Co-admin). Staff roles are per property, in Manage access.
  CHANGE_ROLE: "changeRole",
  RESEND_INVITE: "resendInvite",
  REVOKE_INVITE: "revokeInvite",
  VIEW_ACTIVITY: "viewActivity",
  DEACTIVATE: "deactivate",
  REACTIVATE: "reactivate",
  REMOVE: "remove",
};

export const PROPERTY_ACTION = {
  SWITCH: "switchProperty",
  VIEW_TEAM: "viewTeam",
  INVITE_STAFF: "inviteStaff",
  LEAVE_WORKSPACE: "leaveWorkspace",
};

// Higher number = more authority. Custom staff roles (Warden, Accountant…)
// all rank as STAFF.
const RANK = {
  [ROLE.SUPER_ADMIN]: 4,
  [ROLE.MASTER]: 3,
  [ROLE.CO_ADMIN]: 2,
  [ROLE.STAFF]: 1,
};

/** Maps a role name from the API ("Super Admin", "Co Admin", "Warden") to a ROLE key. */
export function roleKeyFromName(name = "") {
  const value = String(name).toLowerCase().replace(/[^a-z]/g, "");
  if (value === "superadmin" || value === "owner" || value === "admin") return ROLE.SUPER_ADMIN;
  if (value === "master") return ROLE.MASTER;
  if (value === "coadmin") return ROLE.CO_ADMIN;
  return ROLE.STAFF;
}

// Account role ids with full access (Sidebar.jsx RoleAccess uses the same ids).
const ADMIN_ROLE_IDS = [1, 2];

/** Signed-in account → ROLE key. Admin role ids win over the role name. */
export function roleKeyFromAccount(account = {}) {
  if (ADMIN_ROLE_IDS.includes(Number(account.roleId))) return ROLE.SUPER_ADMIN;
  return account.roleName ? roleKeyFromName(account.roleName) : ROLE.STAFF;
}

const rank = (role) => RANK[role] || RANK[ROLE.STAFF];

/**
 * The highest-ranked of several role names (a staff member's roles across
 * properties). Permission checks use it, so a person who is Co Admin in any
 * property is treated as Co Admin everywhere.
 */
export function highestRoleName(names = []) {
  return names.reduce(
    (best, name) => (best === null || rank(roleKeyFromName(name)) > rank(roleKeyFromName(best)) ? name : best),
    null,
  );
}

export const isSuperAdmin = (viewer) => viewer?.role === ROLE.SUPER_ADMIN;
// A Co-admin runs properties like a Master does.
export const isMasterLevel = (viewer) =>
  viewer?.role === ROLE.MASTER || viewer?.role === ROLE.CO_ADMIN;

/** True when every property of the target is inside the viewer's scope. */
function inScope(viewer, target) {
  if (isSuperAdmin(viewer)) return true;
  const scope = new Set(viewer?.propertyIds || []);
  const ids = target?.propertyIds || [];
  return ids.length > 0 && ids.every((id) => scope.has(id));
}

/** True when the target works in at least one of the viewer's properties (list visibility). */
export function isVisibleToViewer(viewer, target) {
  if (isSuperAdmin(viewer)) return true;
  const scope = new Set(viewer?.propertyIds || []);
  return (target?.propertyIds || []).some((id) => scope.has(id));
}

/** Which properties the viewer may pick in filters and property pickers. */
export function scopedProperties(viewer, properties = []) {
  if (isSuperAdmin(viewer)) return properties;
  const scope = new Set(viewer?.propertyIds || []);
  return properties.filter((property) => scope.has(property.id));
}

/** Nobody can give a role above their own; the Super Admin can assign any role. */
export function canAssignRole(viewer, roleName) {
  if (isSuperAdmin(viewer)) return true;
  return rank(roleKeyFromName(roleName)) <= rank(viewer?.role);
}

// Status → actions, before the viewer checks.
const MASTER_STATUS_ACTIONS = {
  [STATUS.ACTIVE]: [
    ACTION.EDIT_DETAILS,
    ACTION.MANAGE_ACCESS,
    ACTION.CHANGE_ROLE,
    ACTION.VIEW_ACTIVITY,
    ACTION.DEACTIVATE,
  ],
  [STATUS.INVITED]: [
    ACTION.EDIT_DETAILS,
    ACTION.MANAGE_ACCESS,
    ACTION.RESEND_INVITE,
    ACTION.REVOKE_INVITE,
  ],
  [STATUS.EXPIRED]: [ACTION.RESEND_INVITE, ACTION.REMOVE],
  [STATUS.REVOKED]: [ACTION.REMOVE],
  [STATUS.DEACTIVATED]: [ACTION.VIEW_ACTIVITY, ACTION.REACTIVATE, ACTION.REMOVE],
};

const STAFF_STATUS_ACTIONS = {
  [STATUS.ACTIVE]: [ACTION.EDIT_DETAILS, ACTION.MANAGE_ACCESS, ACTION.DEACTIVATE],
  [STATUS.INVITED]: [
    ACTION.EDIT_DETAILS,
    ACTION.MANAGE_ACCESS,
    ACTION.RESEND_INVITE,
    ACTION.REVOKE_INVITE,
  ],
  [STATUS.EXPIRED]: [ACTION.RESEND_INVITE, ACTION.REMOVE],
  [STATUS.REVOKED]: [ACTION.REMOVE],
  [STATUS.DEACTIVATED]: [ACTION.REACTIVATE, ACTION.REMOVE],
};

/**
 * Allowed row actions.
 * @param viewer {role, propertyIds} — who is looking
 * @param target {kind: "master"|"staff", role, propertyIds, status, isSelf}
 * @returns ACTION[] (View first; order the menu with groupActions)
 */
export function getAllowedActions(viewer, target) {
  if (!viewer || !target) return [];
  const actions = [ACTION.VIEW];
  if (target.isSelf || target.role === ROLE.SUPER_ADMIN) return actions;

  let byStatus;
  if (target.kind === "master") {
    // Only the Super Admin acts on Masters (incl. editing a Master's properties).
    if (!isSuperAdmin(viewer)) return actions;
    byStatus = MASTER_STATUS_ACTIONS[target.status] || [];
    // Change role only toggles Master ↔ Co-admin.
    if (target.role !== ROLE.MASTER && target.role !== ROLE.CO_ADMIN) {
      byStatus = byStatus.filter((action) => action !== ACTION.CHANGE_ROLE);
    }
  } else {
    if (!isSuperAdmin(viewer)) {
      // A Master acts only on staff below them, inside their own properties.
      const targetIsMasterLevel = rank(target.role) >= RANK[ROLE.CO_ADMIN];
      if (!isMasterLevel(viewer) || targetIsMasterLevel || !inScope(viewer, target)) {
        return actions;
      }
    }
    byStatus = STAFF_STATUS_ACTIONS[target.status] || [];
  }
  return [...actions, ...byStatus];
}

// Menu groups in display order; a divider is drawn before the last group.
// View is the row click, so it is never a menu item.
const MENU_GROUPS = [
  [ACTION.EDIT_DETAILS, ACTION.MANAGE_ACCESS, ACTION.VIEW_ACTIVITY],
  [ACTION.CHANGE_ROLE],
  [ACTION.RESEND_INVITE, ACTION.REVOKE_INVITE],
  [ACTION.DEACTIVATE, ACTION.REACTIVATE],
  [ACTION.REMOVE],
];

/** Orders allowed actions into non-empty menu groups. */
export function groupActions(allowed = [], exclude = []) {
  const set = new Set(allowed.filter((action) => !exclude.includes(action)));
  return MENU_GROUPS.map((group) => group.filter((action) => set.has(action))).filter(
    (group) => group.length > 0,
  );
}

/**
 * Card actions on the Properties tab. `property.viewerRole` is the viewer's
 * role in that property ("owner" | "master"). No Add / Delete / Transfer here.
 */
export function getPropertyActions(viewer, property) {
  if (!viewer || !property) return [];
  const actions = [PROPERTY_ACTION.SWITCH, PROPERTY_ACTION.VIEW_TEAM];
  if (isSuperAdmin(viewer) || isMasterLevel(viewer) || property.viewerRole === "master") {
    actions.push(PROPERTY_ACTION.INVITE_STAFF);
  }
  // Leave workspace: only for a Master shared into another owner's workspace.
  if (property.ownership === "shared" && property.viewerRole === "master") {
    actions.push(PROPERTY_ACTION.LEAVE_WORKSPACE);
  }
  return actions;
}

/** Only the Super Admin adds properties or invites Masters. */
export const canAddProperty = (viewer) => isSuperAdmin(viewer);
export const canInviteMaster = (viewer) => isSuperAdmin(viewer);
export const canInviteStaff = (viewer) => isSuperAdmin(viewer) || isMasterLevel(viewer);

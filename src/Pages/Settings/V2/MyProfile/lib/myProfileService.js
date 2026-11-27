// My profile team tabs — the ONLY place these screens talk to the server.
// Components call these functions and nothing else. Each call goes to the
// existing API function (Redux/Action/*, same axios client, auth cookie and
// interceptors as the rest of the app) or, while no endpoint exists, to a
// dummy that returns the same response shape. To move an action to a real
// endpoint: set it to false in DUMMY_ACTIONS and fill in its `real` branch.
import Cookies from "universal-cookie";
import {
  EditGeneral,
  EditStaffUser,
  GetAllGeneral,
  GetAllRoles,
  GetAllStaff,
  generalDelete,
} from "../../../../../Redux/Action/SettingsAction";
import { DeleteUser } from "../../../../../Redux/Action/InvoiceAction";
import { StoreSelectedHostelAction } from "../../../../../Redux/Action/LoginAction";
import {
  ACTIVITY_MOCK,
  MASTERS_MOCK,
  MASTER_SEATS_MOCK,
  ROLES_MOCK,
  ROW_EXTRAS_MOCK,
  STAFF_MOCK,
} from "./myProfileMock";
import {
  formatPhone,
  initialsOf,
  mergeStaff,
  normaliseMaster,
  normaliseRole,
  normaliseStaff,
  toArray,
} from "./myProfileUtils";
import { STATUS, highestRoleName, roleKeyFromName } from "./myProfilePermissions";

// true = dummy (myProfileMock.js), false = real API. Lists default to the
// real endpoints; flip a list to true to review the screens with dummy data.
// Properties are not listed here: they come from the HOSTELLIST saga
// (GET /v2/hostel) through useMyProfileViewer.
export const DUMMY_ACTIONS = {
  listMasters: false, // GET /v2/profile/admin-list
  listStaff: false, // GET /v2/profile/users-list/:hostelId (per property)
  listRoles: false, // GET /v2/role/hostel/:hostelId
  editMasterDetails: false, // PUT /v2/profile/admin/:adminId
  editStaffDetails: false, // PUT /v2/profile/users/:hostelId/:userId
  changeStaffRole: false, // PUT /v2/profile/users/:hostelId/:userId (role, per property; Manage access)
  removeMaster: false, // DELETE /v2/profile/delete-admin/:userId
  removeStaff: false, // DELETE /v2/profile/delete-user/:hostelId/:userId
  masterSeats: true,
  activity: true,
  inviteMaster: true,
  inviteStaff: true,
  editProperties: true, // assign / unassign properties (Manage access)
  changeMasterRole: true,
  resendInvite: true,
  revokeInvite: true,
  deactivate: true,
  reactivate: true,
  leaveWorkspace: true,
  // Edit profile: name / mobile / email / photo go through the existing
  // PROFILE-UPDATE saga (PUT /v2/profile). Alternate mobile and address have
  // no field in that API yet.
  profileExtras: true,
};

// ---------------------------------------------------------------- dummies
const DUMMY_LATENCY_MS = 450;
// 0–1. Raise it to see every error state with dummy calls.
const DUMMY_FAIL_RATE = 0;

function dummyResponse(data, status = 200) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < DUMMY_FAIL_RATE) {
        const error = new Error("Something went wrong. Please try again.");
        error.response = { status: 400, data: { message: error.message } };
        reject(error);
        return;
      }
      resolve({ status, data });
    }, DUMMY_LATENCY_MS);
  });
}

// Dummy writes are kept in memory and layered over every list (real or
// dummy) so the screens reflect them until the page reloads.
const patches = new Map(); // "kind:id" → partial view-model
const removedKeys = new Set();
const invited = { master: [], staff: [] }; // raw rows created by dummy invites
let dummyIdSeq = 1;

const keyOf = (person) => `${person.kind}:${person.id}`;
const patch = (person, changes) => {
  patches.set(keyOf(person), { ...(patches.get(keyOf(person)) || {}), ...changes });
};
const withPatches = (people) =>
  people
    .filter((person) => !removedKeys.has(keyOf(person)))
    .map((person) => ({ ...person, ...(patches.get(keyOf(person)) || {}) }));

// ------------------------------------------------------------------ cache
// Tabs and tab counts share one request per list until a write invalidates it.
const cache = new Map();
const cached = (key, load) => {
  if (!cache.has(key)) {
    cache.set(
      key,
      load().catch((error) => {
        cache.delete(key);
        throw error;
      }),
    );
  }
  return cache.get(key);
};
export const invalidateTeamCache = () => cache.clear();

const ok = (response) => response?.status >= 200 && response?.status < 300;
const unwrap = (response) => {
  if (!ok(response)) {
    const error = new Error(response?.data?.message || "Request failed");
    error.response = response;
    throw error;
  }
  return response;
};

// ------------------------------------------------------------------ lists
// DUMMY: replace with API — fills fields the real lists don't return yet
// (see ROW_EXTRAS_MOCK). Values the API does send are never overwritten.
const ago = (ms) => new Date(Date.now() - ms).toISOString();
function withRowExtras(raw, index) {
  const pick = (list) => list[index % list.length];
  return {
    ...raw,
    lastActiveAt: raw.lastActiveAt ?? ago(pick(ROW_EXTRAS_MOCK.lastActiveAgo)),
    joinedAt: raw.joinedAt ?? ago(pick(ROW_EXTRAS_MOCK.joinedAgo)),
    accessSummary: raw.accessSummary || raw.description || ROW_EXTRAS_MOCK.accessSummary,
    accessLevel: raw.accessLevel || ROW_EXTRAS_MOCK.accessLevel,
  };
}

const idsKey = (properties) => properties.map((property) => property.id).join(",");

/** properties: the viewer's properties (useMyProfileViewer). */
export function listMasters({ selfId, properties = [] } = {}) {
  return cached(`masters:${selfId ?? ""}:${idsKey(properties)}`, async () => {
    const response = DUMMY_ACTIONS.listMasters
      ? await dummyResponse(MASTERS_MOCK)
      : await GetAllGeneral();
    const ownedIds = properties
      .filter((property) => property.ownership === "owned")
      .map((property) => property.id);
    const realRows = toArray(unwrap(response).data).map((raw, index) => ({
      ...withRowExtras(raw, index),
      // DUMMY: admin-list has no hostelIds yet; show every owned property.
      hostelIds: raw.hostelIds || (ROW_EXTRAS_MOCK.masterPropertiesAll ? ownedIds : []),
    }));
    const rows = [...invited.master, ...realRows];
    return withPatches(rows.map((raw) => normaliseMaster(raw, selfId)));
  });
}

/** Staff of every given property, one row per person (propertyIds merged). */
export function listStaff(properties = []) {
  return cached(`staff:${idsKey(properties)}`, async () => {
    const perProperty = await Promise.all(
      properties.map(async (property) => {
        const response = DUMMY_ACTIONS.listStaff
          ? await dummyResponse(
              // Real rows carry no hostelIds: the property comes from the URL.
              STAFF_MOCK.filter((raw) => raw.hostelIds.map(String).includes(property.id)).map(
                (raw) => ({ ...raw, hostelIds: undefined }),
              ),
            )
          : await GetAllStaff(property.id);
        if (response?.status === 204) return [];
        return toArray(unwrap(response).data).map((raw, index) =>
          normaliseStaff(withRowExtras(raw, index), property.id),
        );
      }),
    );
    const invitedRows = invited.staff.map((raw) => normaliseStaff(raw));
    return withPatches([...invitedRows, ...mergeStaff(perProperty.flat())]);
  });
}

export function listRoles(propertyId) {
  return cached(`roles:${propertyId}`, async () => {
    const response = DUMMY_ACTIONS.listRoles
      ? await dummyResponse(ROLES_MOCK)
      : await GetAllRoles(propertyId);
    return toArray(unwrap(response).data).map(normaliseRole);
  });
}

export async function getMasterSeats() {
  // DUMMY: no endpoint yet.
  const response = await dummyResponse(MASTER_SEATS_MOCK);
  return response.data;
}

export async function getActivity(person) {
  // DUMMY: no activity endpoint yet.
  const response = await dummyResponse(ACTIVITY_MOCK);
  const who = person?.isSelf || !person ? "You" : person.name.split(" ")[0];
  return toArray(response.data).map((item) => ({ ...item, who }));
}

// ---------------------------------------------------------------- invites
/** "Asha Rani Kumar" → { firstName: "Asha Rani", lastName: "Kumar" }. */
export function splitName(name) {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) return { firstName: parts[0] || "", lastName: "" };
  return { firstName: parts.slice(0, -1).join(" "), lastName: parts[parts.length - 1] };
}

// Rows created by the dummy invites only exist in this browser session: the
// real edit / role / remove endpoints don't know their ids.
const isDummyRow = (person) => Boolean(person.raw?.isDummy);

/** form: { name, mobile, email, propertyIds } */
export async function inviteMaster(form) {
  // DUMMY: no invite endpoint (POST /v2/profile/add-admin creates an account with a password).
  const raw = {
    userId: `dummy-m${dummyIdSeq++}`,
    isDummy: true,
    ...splitName(form.name),
    countryCode: form.mobile ? "91" : "",
    mobileNo: form.mobile,
    mailId: form.email,
    roleName: "Master",
    status: STATUS.INVITED,
    hostelIds: form.propertyIds,
    invitedAt: new Date().toISOString(),
  };
  const response = await dummyResponse({ statusCode: 200, data: raw });
  invited.master.unshift(raw);
  invalidateTeamCache();
  return response.data;
}

/** form: { name, mobile, email, roleId, roleName, propertyIds } */
export async function inviteStaff(form) {
  // DUMMY: no invite endpoint (POST /v2/profile/add-user/:hostelId needs a password set by the admin).
  const raw = {
    userId: `dummy-s${dummyIdSeq++}`,
    isDummy: true,
    ...splitName(form.name),
    countryCode: form.mobile ? "91" : "",
    mobileNo: form.mobile,
    mailId: form.email,
    roleId: form.roleId,
    roleName: form.roleName,
    status: STATUS.INVITED,
    hostelIds: form.propertyIds,
    invitedAt: new Date().toISOString(),
  };
  const response = await dummyResponse({ statusCode: 200, data: raw });
  invited.staff.unshift(raw);
  invalidateTeamCache();
  return response.data;
}

// ---------------------------------------------------------------- edits
/** details: { name, mobile, email } */
export async function editDetails(person, details) {
  const changes = {
    raw: { ...person.raw, mobileNo: details.mobile, mailId: details.email },
    name: details.name,
    initials: initialsOf(details.name),
    email: details.email,
    phone: formatPhone(details.mobile ? person.raw?.countryCode || "91" : "", details.mobile),
  };
  const isMaster = person.kind === "master";
  if (isDummyRow(person) || (isMaster ? DUMMY_ACTIONS.editMasterDetails : DUMMY_ACTIONS.editStaffDetails)) {
    await dummyResponse({ statusCode: 200 });
    patch(person, changes);
  } else if (isMaster) {
    const raw = person.raw || {};
    const { firstName, lastName } = splitName(details.name);
    unwrap(
      await EditGeneral({
        adminId: person.id,
        payload: {
          firstName,
          lastName,
          mobile: details.mobile ? `${raw.countryCode || "91"}${details.mobile}` : "",
          mailId: details.email,
          houseNo: raw.houseNo,
          street: raw.street,
          landmark: raw.landmark,
          city: raw.city,
          pincode: raw.pincode ? Number(raw.pincode) : raw.pincode,
          state: raw.state,
        },
        profilePic: null,
      }),
    );
  } else {
    // The endpoint is per property: update each one, keeping that property's role.
    await Promise.all(
      person.propertyIds.map(async (hostelId) =>
        unwrap(
          await EditStaffUser(hostelId, person.id, {
            name: details.name,
            mobile: details.mobile,
            emailId: details.email,
            role: person.roleIdByProperty?.[hostelId] ?? person.roleId,
            description: person.raw?.description || "",
          }),
        ),
      ),
    );
  }
  invalidateTeamCache();
}

/**
 * Manage access. access: { propertyIds, roles } — roles (staff only) maps each
 * selected property id to { roleId, roleName }, so one person can be Warden
 * in property A and Co Admin in property B.
 * - Role changes in properties the person keeps: PUT
 *   /v2/profile/users/:hostelId/:userId, one call per property.
 * - Adding / removing properties: DUMMY (no endpoint to assign an existing
 *   person to a property yet).
 */
export async function editAccess(person, { propertyIds, roles = {} }) {
  const isStaff = person.kind === "staff";
  const before = new Set(person.propertyIds);
  const kept = propertyIds.filter((id) => before.has(id));
  const propertiesChanged =
    propertyIds.length !== before.size || propertyIds.some((id) => !before.has(id));
  const roleChanged = isStaff
    ? kept.filter((id) => roles[id] && String(roles[id].roleId) !== String(person.roleIdByProperty?.[id]))
    : [];
  // Checked before any call, so nothing is half-saved. Real branch not built
  // yet: fail loudly instead of a fake success.
  if (propertiesChanged && !DUMMY_ACTIONS.editProperties) {
    throw new Error("Changing a person's properties isn't available yet.");
  }

  if (roleChanged.length > 0 && !isDummyRow(person) && !DUMMY_ACTIONS.changeStaffRole) {
    const raw = person.raw || {};
    await Promise.all(
      roleChanged.map(async (hostelId) =>
        unwrap(
          await EditStaffUser(hostelId, person.id, {
            name: person.name,
            mobile: raw.mobileNo,
            emailId: person.email,
            role: roles[hostelId].roleId,
            description: raw.description || "",
          }),
        ),
      ),
    );
  } else if (roleChanged.length > 0) {
    await dummyResponse({ statusCode: 200 });
  }
  if (propertiesChanged) {
    // DUMMY: replace with API — assign / unassign properties.
    await dummyResponse({ statusCode: 200 });
  }

  const changes = { propertyIds };
  if (isStaff) {
    const pick = (key) => Object.fromEntries(propertyIds.map((id) => [id, roles[id]?.[key] ?? null]));
    changes.roleIdByProperty = pick("roleId");
    changes.roleNameByProperty = pick("roleName");
    // Highest role across the properties, same as mergeStaff.
    const topName = highestRoleName(propertyIds.map((id) => roles[id]?.roleName).filter(Boolean));
    const top = propertyIds.map((id) => roles[id]).find((role) => role?.roleName === topName);
    if (top) {
      changes.roleId = top.roleId;
      changes.roleName = top.roleName;
      changes.role = roleKeyFromName(top.roleName);
    }
  }
  patch(person, changes);
  invalidateTeamCache();
}

/** Masters only: Master ↔ Co-admin. role: { roleId, roleName } */
export async function changeRole(person, role) {
  // DUMMY: replace with API — no endpoint to switch Master ↔ Co-admin yet.
  await dummyResponse({ statusCode: 200 });
  patch(person, {
    roleId: role.roleId,
    roleName: role.roleName,
    role: roleKeyFromName(role.roleName),
  });
  invalidateTeamCache();
}

// ---------------------------------------------------------- invite status
export async function resendInvite(person) {
  // DUMMY: no endpoint yet.
  await dummyResponse({ statusCode: 200 });
  patch(person, { status: STATUS.INVITED, invitedAt: new Date().toISOString() });
  invalidateTeamCache();
}

export async function revokeInvite(person) {
  // DUMMY: no endpoint yet.
  await dummyResponse({ statusCode: 200 });
  patch(person, { status: STATUS.REVOKED });
  invalidateTeamCache();
}

// ------------------------------------------------------------ lifecycle
/** options: { reassignToId } — open bookings / complaints go to this person. */
export async function deactivate(person, options = {}) {
  // DUMMY: no endpoint yet. Must end sessions, keep history and reassign open items.
  await dummyResponse({ statusCode: 200, reassignToId: options.reassignToId || null });
  patch(person, { status: STATUS.DEACTIVATED, openBookings: 0, openComplaints: 0 });
  invalidateTeamCache();
}

export async function reactivate(person) {
  // DUMMY: no endpoint yet.
  await dummyResponse({ statusCode: 200 });
  patch(person, { status: STATUS.ACTIVE });
  invalidateTeamCache();
}

/** Soft remove: the person leaves the lists and cannot sign in; history stays. */
export async function remove(person) {
  const isMaster = person.kind === "master";
  if (isDummyRow(person) || (isMaster ? DUMMY_ACTIONS.removeMaster : DUMMY_ACTIONS.removeStaff)) {
    await dummyResponse({ statusCode: 200 });
  } else if (isMaster) {
    unwrap(await generalDelete(person.id));
  } else {
    // The endpoint is per property: remove the person from each of them.
    await Promise.all(
      person.propertyIds.map(async (hostelId) =>
        unwrap(await DeleteUser({ hostelId, userId: person.id })),
      ),
    );
  }
  removedKeys.add(keyOf(person));
  invalidateTeamCache();
}

// ------------------------------------------------------------ properties
export async function leaveWorkspace(property) {
  // DUMMY: no endpoint yet.
  await dummyResponse({ statusCode: 200, hostelId: property.id });
  invalidateTeamCache();
}

/** extras: { alternateMobile, address } — returns what was saved. */
export async function saveProfileExtras(extras) {
  // DUMMY: no API field for alternate mobile / residential address yet.
  const response = await dummyResponse({ statusCode: 200, data: extras });
  return response.data.data;
}

/** Same switch the Manage PG "Switch property" flow performs (Redux + cookie). */
export function switchProperty(dispatch, property) {
  dispatch(StoreSelectedHostelAction(property.id));
  new Cookies().set("selected_hostelId", property.id, { path: "/" });
  dispatch({ type: "PARTICULAR_HOSTEL_DETAILS", payload: { hostel_id: property.id } });
}

// ---------------------------------------------------------------- errors
/**
 * Same handling as the sagas' handleApiError (401 → sign out, 403 → access
 * restriction, 500 / offline → network error), plus a message for the UI.
 */
export function reportApiError(error, dispatch) {
  const status = error?.response?.status || error?.status;
  if (status === 401) dispatch({ type: "UN-AUTHORIZED", payload: "Access Denied" });
  else if (status === 403) dispatch({ type: "ACCESS_RESTRICTION_ERROR", payload: "Access Restricted" });
  else if (status === 500 || error?.code === "ERR_NETWORK") {
    dispatch({ type: "NETWORK_ERROR", payload: "Network error occurred" });
  }
  return error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
}

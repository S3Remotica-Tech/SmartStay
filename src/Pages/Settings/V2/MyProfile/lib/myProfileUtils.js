// Pure helpers for the My profile team tabs: API → view-model normalisers,
// search / filter / pagination, and display formatting.
import { ROLE, STATUS, highestRoleName, roleKeyFromName } from "./myProfilePermissions";

export const PAGE_SIZE = 10;

/** Accepts `[]`, `{ data: [] }` or `{ content: [] }` — list endpoints differ. */
export function toArray(data) {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.content)) return data.content;
  return [];
}

export function initialsOf(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const fullName = (raw) => [raw.firstName, raw.lastName].filter(Boolean).join(" ").trim();

export function formatPhone(countryCode, mobileNo) {
  if (!mobileNo) return "";
  const digits = String(mobileNo).replace(/\D/g, "");
  const local = digits.length === 10 ? `${digits.slice(0, 5)} ${digits.slice(5)}` : digits;
  return countryCode ? `+${countryCode} ${local}` : local;
}

const KNOWN_STATUSES = Object.values(STATUS);
const toStatus = (value) => {
  const status = String(value || "").toLowerCase();
  // Real list endpoints have no status yet: a listed person is active.
  return KNOWN_STATUSES.includes(status) ? status : STATUS.ACTIVE;
};

/** admin-list item → Master view-model. */
export function normaliseMaster(raw, selfId) {
  const name = fullName(raw) || raw.mailId || "—";
  return {
    id: String(raw.userId ?? raw.id),
    kind: "master",
    raw,
    name,
    initials: initialsOf(name),
    userCode: raw.userCode || "",
    phone: formatPhone(raw.countryCode, raw.mobileNo),
    email: raw.mailId || "",
    avatar: raw.profilePic && raw.profilePic !== "0" ? raw.profilePic : "",
    roleName: raw.roleName || "Master",
    role: raw.roleName ? roleKeyFromName(raw.roleName) : ROLE.MASTER,
    status: toStatus(raw.status),
    propertyIds: (raw.hostelIds || []).map(String),
    lastActiveAt: raw.lastActiveAt || null,
    invitedAt: raw.invitedAt || null,
    joinedAt: raw.joinedAt || null,
    isSelf: selfId !== null && selfId !== undefined && String(raw.userId) === String(selfId),
    openBookings: Number(raw.openBookings) || 0,
    openComplaints: Number(raw.openComplaints) || 0,
  };
}

/** users-list item (one hostel) → Staff view-model. Merge per-hostel rows with mergeStaff. */
export function normaliseStaff(raw, hostelId) {
  const name = fullName(raw) || raw.mailId || "—";
  const hostelIds = raw.hostelIds || (hostelId !== null && hostelId !== undefined ? [hostelId] : []);
  return {
    id: String(raw.userId ?? raw.id),
    kind: "staff",
    raw,
    name,
    initials: initialsOf(name),
    userCode: raw.userCode || "",
    phone: formatPhone(raw.countryCode, raw.mobileNo),
    email: raw.mailId || "",
    avatar: raw.profilePic && raw.profilePic !== "0" ? raw.profilePic : "",
    roleId: raw.roleId ?? raw.role ?? null,
    roleName: raw.roleName || "—",
    role: roleKeyFromName(raw.roleName),
    status: toStatus(raw.status),
    propertyIds: hostelIds.map(String),
    // Roles are defined per property, so the role id differs per property.
    roleIdByProperty: Object.fromEntries(hostelIds.map((id) => [String(id), raw.roleId ?? raw.role ?? null])),
    roleNameByProperty: Object.fromEntries(hostelIds.map((id) => [String(id), raw.roleName || "—"])),
    accessSummary: raw.accessSummary || raw.description || "",
    accessLevel: raw.accessLevel || "",
    lastActiveAt: raw.lastActiveAt || null,
    invitedAt: raw.invitedAt || null,
    joinedAt: raw.joinedAt || null,
    isSelf: false,
    openBookings: Number(raw.openBookings) || 0,
    openComplaints: Number(raw.openComplaints) || 0,
  };
}

/** The same person is listed once per hostel; merge into one row. */
export function mergeStaff(people) {
  const byId = new Map();
  people.forEach((person) => {
    const existing = byId.get(person.id);
    if (!existing) {
      byId.set(person.id, person);
      return;
    }
    const ids = new Set([...existing.propertyIds, ...person.propertyIds]);
    const roleNameByProperty = { ...existing.roleNameByProperty, ...person.roleNameByProperty };
    // Permission checks read `role`: use the highest role across properties,
    // so a Master can't act on someone who is Co Admin in another property.
    const top = highestRoleName([existing.roleName, person.roleName]);
    byId.set(person.id, {
      ...existing,
      propertyIds: [...ids],
      roleIdByProperty: { ...existing.roleIdByProperty, ...person.roleIdByProperty },
      roleNameByProperty,
      roleName: top,
      role: roleKeyFromName(top),
    });
  });
  return [...byId.values()];
}

/**
 * A staff member's distinct roles across their properties (Warden in one,
 * Co Admin in another → ["Warden", "Co Admin"]). Masters have one role.
 */
export function rolesOf(person) {
  const names = Object.values(person.roleNameByProperty || {}).filter((name) => name && name !== "—");
  const distinct = [...new Set(names)];
  return distinct.length > 0 ? distinct : [person.roleName];
}

/** GET /v2/hostel item → Property view-model. Occupancy is null when unknown. */
export function normaliseProperty(raw) {
  const filled = Number(raw.noOfOccupiedBeds ?? raw.occupiedBeds ?? raw.occupiedBedCount);
  const available = Number(raw.noOfAvailableBeds);
  const total = Number(raw.totalBeds ?? raw.noOfBeds ?? filled + available);
  const hasBeds = Number.isFinite(total) && total > 0 && Number.isFinite(filled);
  return {
    id: String(raw.hostelId ?? raw.id),
    raw,
    name: raw.name || raw.hostelName || "—",
    city: raw.city || raw.area || "",
    address:
      raw.address ||
      [raw.houseNo, raw.street, raw.area, raw.city, raw.pincode && String(raw.pincode)]
        .filter(Boolean)
        .join(", "),
    image: raw.mainImage || "",
    ownership: raw.ownership === "shared" ? "shared" : "owned",
    ownerName: raw.ownerName || "",
    viewerRole: raw.viewerRole || (raw.ownership === "shared" ? "master" : "owner"),
    beds: hasBeds ? { total, filled, percent: Math.round((filled / total) * 100) } : null,
    masterCount: raw.masterCount ?? null,
    staffCount: raw.staffCount ?? null,
  };
}

/** GET /v2/role/hostel/:id item → { value, label }. */
export const normaliseRole = (raw) => ({
  value: String(raw.id ?? raw.roleId),
  label: raw.name || raw.roleName || "—",
});

/** Search over name, phone, email and user ID. */
export function matchesSearch(person, query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  const digits = needle.replace(/\D/g, "");
  const haystack = [person.name, person.email, person.userCode, ...rolesOf(person)]
    .join(" ")
    .toLowerCase();
  if (haystack.includes(needle)) return true;
  return digits.length > 2 && person.phone.replace(/\D/g, "").includes(digits);
}

/** filters: { roles: [], properties: [], statuses: [] } — empty array = all. */
export function matchesFilters(person, filters) {
  const { roles = [], properties = [], statuses = [] } = filters;
  if (roles.length && !rolesOf(person).some((name) => roles.includes(name))) return false;
  if (statuses.length && !statuses.includes(person.status)) return false;
  if (properties.length && !person.propertyIds.some((id) => properties.includes(id))) {
    return false;
  }
  return true;
}

export const paginate = (rows, page, size = PAGE_SIZE) =>
  rows.slice((page - 1) * size, page * size);

export const STATUS_META = {
  [STATUS.ACTIVE]: { label: "Active", tone: "success" },
  [STATUS.INVITED]: { label: "Invite pending", tone: "warning" },
  [STATUS.EXPIRED]: { label: "Invite expired", tone: "danger" },
  [STATUS.REVOKED]: { label: "Invite revoked", tone: "neutral" },
  [STATUS.DEACTIVATED]: { label: "Deactivated", tone: "neutral" },
};

export const STATUS_OPTIONS = Object.entries(STATUS_META).map(([value, meta]) => ({
  value,
  label: meta.label,
}));

/** "2 hours ago", "5 days ago", "—". */
export function timeAgo(iso) {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  if (!Number.isFinite(diff)) return "—";
  const minutes = Math.round(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  if (days < 30) return `${days} day${days === 1 ? "" : "s"} ago`;
  return formatDate(iso);
}

export function formatDate(iso) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** Second line under a person's name: "SMPG11002 · +91 98411 20567". */
export function personSubtitle(person) {
  if (person.status === STATUS.INVITED || person.status === STATUS.EXPIRED) {
    const contact = person.email || person.phone;
    const when = person.invitedAt ? `invited ${formatDate(person.invitedAt)}` : "invited";
    return [contact, when].filter(Boolean).join(" · ");
  }
  return [person.userCode, person.phone || person.email].filter(Boolean).join(" · ");
}

export const propertyNames = (ids, propertiesById) =>
  ids.map((id) => propertiesById[id]?.name).filter(Boolean);

export const countLabel = (count, word) => `${count} ${word}${count === 1 ? "" : "s"}`;

export const isValidEmail = (value) =>
  /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(String(value).trim());

/** Local 10-digit mobile number from a stored "9876543210" / "919876543210". */
export const localMobile = (mobileNo) => String(mobileNo || "").replace(/\D/g, "").slice(-10);

/**
 * Invite / edit form checks. values: { name, mobile, email, role, propertyIds }.
 * Returns { field: message } — empty object when valid.
 */
export function validatePersonForm(values, { needRole = false, needProperties = false } = {}) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter the full name";
  if (!values.email.trim()) errors.email = "Enter the email address";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email address";
  if (values.mobile && !/^[6-9]\d{9}$/.test(values.mobile)) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }
  if (needRole && !values.role) errors.role = "Select a role";
  if (needProperties && values.propertyIds.length === 0) {
    errors.propertyIds = "Select at least one property";
  }
  return errors;
}

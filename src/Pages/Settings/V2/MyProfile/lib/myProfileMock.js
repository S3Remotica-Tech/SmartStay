// Dummy data for the My profile team tabs. Each export mirrors the raw shape
// of the API it stands in for, so myProfileService.js runs it through the
// same normalisers as real responses. Only myProfileService.js imports this.

const ago = (ms) => new Date(Date.now() - ms).toISOString();
const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

// DUMMY: replace with API — the real list endpoints (admin-list, users-list)
// don't return these fields yet. myProfileService.js fills them into real rows,
// only where the API has no value, so the tables show complete rows.
export const ROW_EXTRAS_MOCK = {
  // Cycled by row index.
  lastActiveAgo: [40 * MINUTE, 3 * HOUR, 1 * DAY, 5 * DAY],
  joinedAgo: [300 * DAY, 180 * DAY, 120 * DAY, 60 * DAY],
  accessSummary: "As per role permissions",
  accessLevel: "Edit",
  // A master's properties: admin-list has no hostelIds, so every owned property.
  masterPropertiesAll: true,
};

// DUMMY: replace with API — GET /v2/profile/admin-list. status, userCode,
// hostelIds, lastActiveAt and invitedAt are not in that response yet.
export const MASTERS_MOCK = [
  {
    userId: 9002,
    userCode: "SMPG11002",
    firstName: "Vinoth Kumar",
    lastName: "R",
    countryCode: "91",
    mobileNo: "9841120567",
    mailId: "vinoth.r@gmail.com",
    roleName: "Master",
    status: "active",
    hostelIds: [101, 102, 103, 104],
    lastActiveAt: ago(2 * HOUR),
    joinedAt: ago(220 * DAY),
  },
  {
    userId: 9003,
    userCode: "SMPG11003",
    firstName: "Anitha",
    lastName: "P",
    countryCode: "91",
    mobileNo: "9003011542",
    mailId: "anitha.p@gmail.com",
    roleName: "Master",
    status: "active",
    hostelIds: [104],
    lastActiveAt: ago(5 * DAY),
    joinedAt: ago(140 * DAY),
  },
  {
    userId: 9004,
    userCode: "",
    firstName: "Karthik",
    lastName: "S",
    countryCode: "91",
    mobileNo: "",
    mailId: "karthik.s@gmail.com",
    roleName: "Master",
    status: "invited",
    hostelIds: [105],
    lastActiveAt: null,
    invitedAt: ago(3 * DAY),
  },
];

// DUMMY: replace with API — no endpoint for master seats yet.
export const MASTER_SEATS_MOCK = { used: 3, total: 4 };

// DUMMY: replace with API — GET /v2/profile/users-list/:hostelId returns one
// hostel's staff; hostelIds here says which hostels list each person.
// status, accessSummary, accessLevel, open items and dates are not in that
// response yet.
export const STAFF_MOCK = [
  {
    userId: 7001,
    firstName: "Raja",
    lastName: "",
    countryCode: "91",
    mobileNo: "7856498322",
    mailId: "raja@gmail.com",
    roleId: 11,
    roleName: "Co Admin",
    status: "active",
    hostelIds: [101, 102, 103, 104, 105],
    accessSummary: "Everything except Banking",
    accessLevel: "Edit",
    openBookings: 0,
    openComplaints: 0,
    joinedAt: ago(300 * DAY),
    lastActiveAt: ago(40 * MINUTE),
  },
  {
    userId: 7002,
    firstName: "Priya",
    lastName: "M",
    countryCode: "91",
    mobileNo: "7856498323",
    mailId: "priya.m@gmail.com",
    roleId: 12,
    roleName: "Warden",
    status: "active",
    hostelIds: [102],
    accessSummary: "Tenants, complaints",
    accessLevel: "View only",
    openBookings: 0,
    openComplaints: 2,
    joinedAt: ago(180 * DAY),
    lastActiveAt: ago(3 * HOUR),
  },
  {
    userId: 7003,
    firstName: "Gowtham",
    lastName: "",
    countryCode: "91",
    mobileNo: "7856498324",
    mailId: "gowtham@gmail.com",
    roleId: 13,
    roleName: "Receptionist",
    status: "active",
    hostelIds: [102, 103],
    accessSummary: "Bookings, check-in / out",
    accessLevel: "Edit",
    openBookings: 3,
    openComplaints: 1,
    joinedAt: ago(168 * DAY),
    lastActiveAt: ago(20 * MINUTE),
  },
  {
    userId: 7004,
    firstName: "Sanjay",
    lastName: "L",
    countryCode: "91",
    mobileNo: "7856498325",
    mailId: "sanjay.l@gmail.com",
    roleId: 14,
    roleName: "Accountant",
    status: "active",
    hostelIds: [102, 103, 101, 104, 105],
    accessSummary: "Bills, expenses, banking",
    accessLevel: "Edit",
    openBookings: 0,
    openComplaints: 0,
    joinedAt: ago(150 * DAY),
    lastActiveAt: ago(1 * DAY),
  },
  {
    userId: 7005,
    firstName: "Nithin",
    lastName: "S.",
    countryCode: "91",
    mobileNo: "9003144120",
    mailId: "nithin.s@gmail.com",
    roleId: 15,
    roleName: "Support Executive",
    status: "invited",
    hostelIds: [103],
    accessSummary: "Complaints",
    accessLevel: "Edit",
    openBookings: 0,
    openComplaints: 0,
    invitedAt: ago(2 * DAY),
  },
  {
    userId: 7006,
    firstName: "Meena",
    lastName: "R",
    countryCode: "",
    mobileNo: "",
    mailId: "meena.r@gmail.com",
    roleId: 12,
    roleName: "Warden",
    status: "deactivated",
    hostelIds: [104],
    accessSummary: "Tenants, complaints",
    accessLevel: "View only",
    openBookings: 0,
    openComplaints: 0,
    joinedAt: ago(400 * DAY),
    lastActiveAt: ago(60 * DAY),
  },
  {
    userId: 7007,
    firstName: "Arun",
    lastName: "V",
    countryCode: "91",
    mobileNo: "9884012345",
    mailId: "arun.v@gmail.com",
    roleId: 13,
    roleName: "Receptionist",
    status: "expired",
    hostelIds: [101],
    accessSummary: "Bookings, check-in / out",
    accessLevel: "Edit",
    openBookings: 0,
    openComplaints: 0,
    invitedAt: ago(12 * DAY),
  },
];

// DUMMY: replace with API — GET /v2/role/hostel/:hostelId returns [{ id, name }].
export const ROLES_MOCK = [
  { id: 11, name: "Co Admin" },
  { id: 12, name: "Warden" },
  { id: 13, name: "Receptionist" },
  { id: 14, name: "Accountant" },
  { id: 15, name: "Support Executive" },
];

// DUMMY: replace with API — no activity endpoint yet. tone: system | stage.
export const ACTIVITY_MOCK = [
  { id: 1, tone: "system", what: "signed in · Chennai", when: ago(20 * MINUTE) },
  { id: 2, tone: "stage", what: "updated complaint #CMP112", when: ago(2 * HOUR) },
  { id: 3, tone: "system", what: "recorded ₹6,000 rent for Room 204", when: ago(5 * HOUR) },
  { id: 4, tone: "stage", what: "confirmed booking #BK102", when: ago(1 * DAY) },
  { id: 5, tone: "system", what: "checked out tenant in Room 112", when: ago(3 * DAY) },
];

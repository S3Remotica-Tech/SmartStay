// Property / Organization Setup onboarding: static configuration.
// Figma "Smartstay Ver-3" section "property Setup" 5671:181084
// (Basic Details 5661:173139, Tax 5671:177034, Media 5671:178007,
// Services & Rules 5671:178747).

/** Feature flag. Off (default) = the app behaves exactly as before. */
export const isOnboardingEnabled = () =>
  String(import.meta.env.VITE_ENABLE_ONBOARDING || "").toLowerCase() === "true";

export const ONBOARDING_BASE_PATH = "/onboarding";

// Dev / prod separation for fields the backend does not map yet.
// Development (`npm start`, build:dev) shows everything; any other mode
// (qa, production) hides the unmapped fields/steps and never calls the mocks.
// Remove a `devOnly` flag once its API is live.
export const isDev = import.meta.env.MODE === "development";

const ALL_STEPS = [
  { key: "basic", slug: "basic-details", label: "Basic Details" },
  // Tax: no API yet (mocked POST /v2/hostel/:hostelId/tax).
  { key: "tax", slug: "tax-information", label: "Tax Information", devOnly: true },
  { key: "media", slug: "media", label: "Media" },
  // Services & Rules: no API yet (mocked POST /v2/hostel/:hostelId/services-rules).
  { key: "services", slug: "services-rules", label: "Services & Rules", devOnly: true },
];

export const STEPS = ALL_STEPS.filter((step) => isDev || !step.devOnly);

export const stepPath = (index) =>
  `${ONBOARDING_BASE_PATH}/${STEPS[index]?.slug || STEPS[0].slug}`;

/* ------------------------------------------------------------------ images */

// Limits follow what the existing "Add Paying Guest" API (createPgList ->
// POST /v2/hostel) accepts today: one `mainImage` (here: the property logo)
// plus up to 4 `additionalImages`, all optional. The Figma copy says "at least
// 6"; that is NOT what the API takes, so the copy is built from these values.
// TODO(api): confirm the real min/max with the backend team.
export const MIN_PROPERTY_IMAGES = 0;
export const MAX_PROPERTY_IMAGES = 4;

// Add Paying Guest accepts files up to 10 MB and compresses them to ~1 MB /
// 800px before upload; the same options are reused here.
export const MAX_IMAGE_SIZE_MB = 10;
export const IMAGE_COMPRESSION_OPTIONS = {
  maxSizeMB: 1,
  maxWidthOrHeight: 800,
  useWebWorker: true,
};
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];
export const LOGO_MIN_DIMENSION = 200;

/* ----------------------------------------------------------- basic details */

export const PROPERTY_TYPES = [
  { value: "HOSTEL", label: "Hostel", description: "Students/ Womens" },
  { value: "PG", label: "PG", description: "Working professionals" },
  { value: "CO_LIVING", label: "Co-Living", description: "Men’s & Women’s" },
  { value: "FLAT", label: "Flat", description: "Separate prop" },
];

export const FLAT_CUSTOM = "CUSTOM";

// "FOR" row changes with the property type (single select). The existing
// create-hostel API has no such field, so these enum values are proposals
// sent only through the mocked profile call (see onboardingService.js).
export const AUDIENCE_BY_TYPE = {
  HOSTEL: {
    label: "For",
    options: [
      { value: "BOYS", label: "Boys" },
      { value: "GIRLS", label: "Girls" },
    ],
  },
  PG: {
    label: "For",
    options: [
      { value: "MENS", label: "Mens" },
      { value: "WOMENS", label: "Womens" },
    ],
  },
  CO_LIVING: {
    label: "For",
    options: [
      { value: "MENS", label: "Mens" },
      { value: "WOMENS", label: "Womens" },
    ],
  },
  FLAT: {
    label: "Flat size",
    options: [
      { value: "2BHK", label: "2 BHK" },
      { value: "3BHK", label: "3 BHK" },
      { value: "4BHK", label: "4 BHK" },
      { value: FLAT_CUSTOM, label: "Other" },
    ],
  },
};

// Flat "Other": the owner types the number of bedrooms (sent as e.g. "6BHK").
export const FLAT_BHK_MIN = 1;
export const FLAT_BHK_MAX = 20;

/* --------------------------------------------------------------------- tax */

export const TAX_TYPES = { NONE: "NONE", GST: "GST" };
export const GSTIN_REGEX =
  /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/; // same as AddVendorNew

/* ---------------------------------------------------------- services/rules */

// Common house rules across PG / hostel / co-living listings (multi select).
export const ESSENTIAL_RULES = [
  { value: "NO_SMOKING", label: "No Smoking" },
  { value: "NO_DRINKING", label: "No Drinking" },
  { value: "NON_VEG_ALLOWED", label: "Non- Veg Allowed" },
  { value: "NO_PETS", label: "No pets" },
  { value: "QUIET_HOURS", label: "Quiet hours after 10 PM" },
  { value: "NO_COOKING_IN_ROOM", label: "No cooking in rooms" },
  { value: "NO_OUTSIDE_FOOD", label: "No outside food" },
  { value: "ID_PROOF_MANDATORY", label: "ID proof mandatory" },
  { value: "NO_LOUD_MUSIC", label: "No loud music" },
  { value: "SAVE_ELECTRICITY", label: "Switch off appliances when out" },
  { value: "NO_SUBLETTING", label: "No subletting" },
];

// Single select: what visitors may do.
export const GUEST_POLICIES = [
  { value: "NO_GUESTS", label: "No Guests" },
  { value: "GUESTS_ALLOWED", label: "Guests allowed" },
  { value: "NO_OVERNIGHT_STAY", label: "No overnight stay" },
  { value: "SAME_GENDER_ONLY", label: "Same gender only" },
  { value: "FAMILY_ONLY", label: "Family members only" },
  { value: "OVERNIGHT_WITH_APPROVAL", label: "Overnight with prior approval" },
  { value: "OVERNIGHT_CHARGEABLE", label: "Overnight stay (chargeable)" },
];

// Single select: notice a tenant must give before vacating.
export const NOTICE_PERIODS = [
  { value: "NONE", label: "No notice" },
  { value: "7_DAYS", label: "7 days" },
  { value: "15_DAYS", label: "15 days" },
  { value: "30_DAYS", label: "30 days" },
  { value: "60_DAYS", label: "60 days" },
];

export const CLEANING_FREQUENCIES = [
  { value: "DAILY", label: "Daily" },
  { value: "WEEKLY", label: "Weekly" },
  { value: "WEEKLY_TWICE", label: "Weekly-twice" },
  { value: "MONTHLY", label: "Monthly" },
  { value: "ON_REQUEST", label: "On request" },
];

export const MEALS = [
  { value: "BREAKFAST", label: "Breakfast" },
  { value: "LUNCH", label: "Lunch" },
  { value: "DINNER", label: "Dinner" },
];

export const FOOD_ADDITIONAL = [
  { value: "ON_REQUEST_PAID", label: "On request/paid" },
];

// Simple on/off services (icon is chosen in Step4ServicesRules).
export const TOGGLE_SERVICES = [
  { key: "wifi", label: "Wi-Fi / Internet", description: "Always available" },
  { key: "laundry", label: "Laundry", description: "Always available" },
  { key: "lift", label: "Lift", description: "Always available" },
  { key: "maintenance", label: "Maintenance", description: "On request" },
  { key: "powerBackup", label: "Power backup", description: "During power cuts" },
  { key: "hotWater", label: "Hot water", description: "Geyser / solar heater" },
  { key: "drinkingWater", label: "Drinking water", description: "RO / purified water" },
  { key: "security", label: "Security & CCTV", description: "Guard or cameras on premises" },
  { key: "parking", label: "Parking", description: "Two-wheeler / car parking" },
];

export const MAX_CUSTOM_ITEMS = 10;
export const MAX_CUSTOM_ITEM_LENGTH = 60;

// 30-minute slots for the visiting / gate hour selects ("06:30" -> "6:30 AM").
export const TIME_OPTIONS = Array.from({ length: 48 }, (_, i) => {
  const h = Math.floor(i / 2);
  const m = i % 2 === 0 ? "00" : "30";
  const value = `${String(h).padStart(2, "0")}:${m}`;
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return { value, label: `${hour12}:${m} ${h < 12 ? "AM" : "PM"}` };
});

/* ------------------------------------------------------------------- draft */

export const DRAFT_STORAGE_KEY = "smartstay.onboarding.draft.v1";
export const LAST_STEP_STORAGE_KEY = "smartstay.onboarding.step.v1";

export const EMPTY_DRAFT = {
  basic: {
    propertyName: "",
    propertyType: "",
    audience: "",
    flatBhk: "",
    contactNumber: "",
    email: "",
    addressLine: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
  },
  tax: {
    taxType: "",
    gstin: "",
    legalBusinessName: "",
    tradeName: "",
    taxPercent: "",
    principalPlace: "",
    sameAsPropertyAddress: false,
  },
  services: {
    essentialRules: [],
    guestPolicy: "",
    visitingFrom: "",
    visitingTo: "",
    gateFrom: "",
    gateTo: "",
    noticePeriod: "",
    customRules: [],
    roomCleaning: { enabled: false, frequency: "" },
    food: { enabled: false, includedMeals: [], additional: [] },
    wifi: false,
    laundry: false,
    lift: false,
    maintenance: false,
    powerBackup: false,
    hotWater: false,
    drinkingWater: false,
    security: false,
    parking: false,
    customServices: [],
  },
  // Set after POST /v2/hostel succeeds so a retry never creates a 2nd hostel.
  hostelCreated: false,
  createdHostelId: null,
};

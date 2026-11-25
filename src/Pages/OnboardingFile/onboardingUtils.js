// Pure helpers for the onboarding flow: completion check, per-step validation,
// API payload builders and draft (sessionStorage) persistence.
// No React and no network here, so everything is easy to unit test / rewire.
import {
  ACCEPTED_IMAGE_TYPES,
  DRAFT_STORAGE_KEY,
  EMPTY_DRAFT,
  FLAT_BHK_MAX,
  FLAT_BHK_MIN,
  FLAT_CUSTOM,
  LAST_STEP_STORAGE_KEY,
  isDev,
  TOGGLE_SERVICES,
  STEPS,
  GSTIN_REGEX,
  MAX_IMAGE_SIZE_MB,
  MIN_PROPERTY_IMAGES,
  TAX_TYPES,
} from "./onboardingConfig";

/* ------------------------------------------------------------- completion */

/**
 * Has this account finished property setup?
 * - Uses `user.onboardingCompleted` when the backend sends it (proposed flag).
 * - Until then: complete when the account already has at least one property
 *   (existing HOSTELLIST API). Existing owners are never forced in.
 * Returns `null` while the answer is unknown (data still loading).
 */
export function isOnboardingComplete(user, { hostelList } = {}) {
  // TODO(api): replace with the backend flag once login / account details
  // return `onboardingCompleted` (see onboardingService.js).
  if (typeof user?.onboardingCompleted === "boolean") {
    return user.onboardingCompleted;
  }
  if (Array.isArray(hostelList)) return hostelList.length > 0;
  return null;
}

/* ------------------------------------------------------------- validation */

// Same rules as Pages/PayingGuestFile/AddPg.jsx so both forms agree.
const MOBILE_REGEX = /^(?!0{10})[1-9][0-9]{9}$/;
const EMAIL_REGEX = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;

export function pincodeError(value) {
  const pin = String(value || "").trim();
  if (!pin) return "Please Enter Pincode";
  if (!/^\d+$/.test(pin)) return "Pin Code Must Be Numeric";
  if (pin.length !== 6) return "Pin Code Must Be Exactly 6 Digits";
  if (pin === "000000") return "Pin Code cannot be all zeros";
  if (pin[0] === "0") return "Pin Code cannot start with 0";
  if (pin.slice(-3) === "000") return "Last 3 digits cannot be 000";
  return "";
}

const clean = (errors) =>
  Object.fromEntries(Object.entries(errors).filter(([, msg]) => Boolean(msg)));

/** Flat "Other": a whole number of bedrooms in range. */
function flatBhkError(basic) {
  if (basic.propertyType !== "FLAT" || basic.audience !== FLAT_CUSTOM) return "";
  const raw = String(basic.flatBhk || "").trim();
  if (!raw) return "Please Enter Number of BHK";
  const n = Number(raw);
  return Number.isInteger(n) && n >= FLAT_BHK_MIN && n <= FLAT_BHK_MAX
    ? ""
    : `Enter a number from ${FLAT_BHK_MIN} to ${FLAT_BHK_MAX}`;
}

/** Audience value sent to the API: Flat "Other" becomes e.g. "6BHK". */
export const resolveAudience = (basic) => {
  if (!basic.audience) return null;
  if (basic.propertyType === "FLAT" && basic.audience === FLAT_CUSTOM) {
    const n = Number(String(basic.flatBhk || "").trim());
    return n ? `${n}BHK` : null;
  }
  return basic.audience;
};

export function validateBasic(basic) {
  const mobile = String(basic.contactNumber || "").trim();
  const email = String(basic.email || "").trim();
  return clean({
    propertyName: basic.propertyName.trim() ? "" : "Please Enter Property Name",
    // Property type / flat size have no API field yet: dev only (see isDev).
    propertyType: !isDev || basic.propertyType ? "" : "Please Select Property Type",
    flatBhk: isDev ? flatBhkError(basic) : "",
    contactNumber: !mobile
      ? "Please Enter Mobile No"
      : MOBILE_REGEX.test(mobile)
        ? ""
        : "Please Enter Valid Mobile No",
    email: email && !EMAIL_REGEX.test(email) ? "Please Enter Valid Email Id" : "",
    addressLine: basic.addressLine.trim() ? "" : "Please Enter Address",
    city: basic.city.trim() ? "" : "Please Enter City",
    state: basic.state ? "" : "Please Select State",
    pincode: pincodeError(basic.pincode),
  });
}

export function validateTax(tax) {
  if (!tax.taxType) {
    return { taxType: "Please choose whether this property collects tax" };
  }
  if (tax.taxType === TAX_TYPES.NONE) return {};

  const gstin = String(tax.gstin || "").trim();
  const percent = String(tax.taxPercent || "").trim();
  const percentNum = Number(percent);
  return clean({
    gstin: !gstin
      ? "Please Enter GSTIN"
      : gstin.length !== 15
        ? "GSTIN must be 15 characters"
        : GSTIN_REGEX.test(gstin)
          ? ""
          : "Please Enter a valid GSTIN",
    legalBusinessName: tax.legalBusinessName.trim()
      ? ""
      : "Please Enter Legal Business Name",
    taxPercent:
      percent && (Number.isNaN(percentNum) || percentNum <= 0 || percentNum > 28)
        ? "Enter a tax percent between 0 and 28"
        : "",
    principalPlace: tax.principalPlace.trim()
      ? ""
      : "Please Enter Principal Place of Business",
  });
}

/** `images`: in-memory list from OnboardingContext ({ status, ... }). */
export function validateMedia(images) {
  if (images.some((img) => img.status === "processing")) {
    return { images: "Please wait until every image has finished processing" };
  }
  if (images.some((img) => img.status === "error")) {
    return { images: "Replace or remove the images that could not be added" };
  }
  const ready = images.filter((img) => img.status === "ready").length;
  if (ready < MIN_PROPERTY_IMAGES) {
    return { images: `Add at least ${MIN_PROPERTY_IMAGES} photos` };
  }
  return {};
}

export function validateServices(services) {
  const pairError = (from, to) => {
    if (!from && !to) return "";
    if (!from || !to) return "Select both From and To";
    if (from === to) return "From and To cannot be the same time";
    return "";
  };
  return clean({
    visitingHours:
      services.guestPolicy === "NO_GUESTS"
        ? ""
        : pairError(services.visitingFrom, services.visitingTo),
    gateHours: pairError(services.gateFrom, services.gateTo),
    roomCleaning:
      services.roomCleaning.enabled && !services.roomCleaning.frequency
        ? "Select how often rooms are cleaned"
        : "",
  });
}

/* ------------------------------------------------------------ image files */

export const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/** Reads the pixel size of an image file. Resolves null if it can't. */
export function readImageSize(file) {
  return new Promise((resolve) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url);
    };
    img.onerror = () => {
      resolve(null);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  });
}

/** Type / size check shared by the logo picker and the photo slots. */
export function imageFileError(file) {
  if (!file) return "No file selected";
  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    return "Only JPG or PNG images are allowed";
  }
  const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
  if (file.size > maxBytes) {
    return `File is ${formatBytes(file.size)} — max ${MAX_IMAGE_SIZE_MB} MB`;
  }
  return "";
}

/* --------------------------------------------------------------- payloads */

/**
 * Existing create-hostel API (Redux/Action/PgListAction.js createPgList ->
 * POST /v2/hostel, multipart). Same keys Add Paying Guest sends today.
 */
export function buildCreateHostelPayload(draft, { logoFile, imageFiles }) {
  const { basic } = draft;
  return {
    mainImage: logoFile || null,
    additionalImages: (imageFiles || []).filter(Boolean),
    payloads: {
      hostelName: basic.propertyName.trim(),
      mobile: `${basic.contactNumber.trim()}`,
      pincode: Number(basic.pincode),
      city: basic.city.trim(),
      state: basic.state,
      emailId: basic.email.trim(),
      houseNo: "", // TODO(api): houseNo not in new design
      street: basic.addressLine.trim(),
      landmark: basic.landmark.trim(),
    },
  };
}

// Fields the existing API has no place for (mocked, see onboardingService.js).
export const buildProfilePayload = (draft) => ({
  hostelId: draft.createdHostelId,
  propertyType: draft.basic.propertyType,
  audience: resolveAudience(draft.basic),
});

export const buildTaxPayload = (draft) => {
  const { tax } = draft;
  if (tax.taxType !== TAX_TYPES.GST) {
    return { hostelId: draft.createdHostelId, taxType: TAX_TYPES.NONE };
  }
  return {
    hostelId: draft.createdHostelId,
    taxType: TAX_TYPES.GST,
    gstin: tax.gstin.trim(),
    legalBusinessName: tax.legalBusinessName.trim(),
    tradeName: tax.tradeName.trim() || null,
    taxPercent: tax.taxPercent === "" ? null : Number(tax.taxPercent),
    principalPlaceOfBusiness: tax.principalPlace.trim(),
    sameAsPropertyAddress: tax.sameAsPropertyAddress,
  };
};

export const buildServicesPayload = (draft) => {
  const s = draft.services;
  const noGuests = s.guestPolicy === "NO_GUESTS";
  return {
    hostelId: draft.createdHostelId,
    rules: {
      essential: s.essentialRules,
      guestPolicy: s.guestPolicy || null,
      visitingHours:
        !noGuests && s.visitingFrom ? { from: s.visitingFrom, to: s.visitingTo } : null,
      gateHours: s.gateFrom ? { from: s.gateFrom, to: s.gateTo } : null,
      noticePeriod: s.noticePeriod || null,
      custom: s.customRules,
    },
    services: {
      roomCleaning: s.roomCleaning.enabled
        ? { enabled: true, frequency: s.roomCleaning.frequency }
        : { enabled: false },
      food: s.food.enabled
        ? {
            enabled: true,
            includedInRent: s.food.includedMeals,
            additional: s.food.additional,
          }
        : { enabled: false },
      // wifi, laundry, lift, maintenance, powerBackup, hotWater,
      // drinkingWater, security, parking: boolean
      ...Object.fromEntries(TOGGLE_SERVICES.map(({ key }) => [key, Boolean(s[key])])),
      custom: s.customServices,
    },
  };
};

/** One-line address used by Tax "Same as PG Address". */
export const formatPropertyAddress = (basic) =>
  [basic.addressLine, basic.landmark, basic.city, basic.state, basic.pincode]
    .map((part) => String(part || "").trim())
    .filter(Boolean)
    .join(", ");

/* ------------------------------------------------------------------ draft */
// Only plain form values are stored (never files, passwords or tokens).

const mergeDraft = (saved) => ({
  ...EMPTY_DRAFT,
  ...saved,
  basic: { ...EMPTY_DRAFT.basic, ...(saved?.basic || {}) },
  tax: { ...EMPTY_DRAFT.tax, ...(saved?.tax || {}) },
  services: {
    ...EMPTY_DRAFT.services,
    ...(saved?.services || {}),
    roomCleaning: {
      ...EMPTY_DRAFT.services.roomCleaning,
      ...(saved?.services?.roomCleaning || {}),
    },
    food: { ...EMPTY_DRAFT.services.food, ...(saved?.services?.food || {}) },
  },
});

export function loadDraft() {
  try {
    const raw = sessionStorage.getItem(DRAFT_STORAGE_KEY);
    return raw ? mergeDraft(JSON.parse(raw)) : mergeDraft(null);
  } catch {
    return mergeDraft(null);
  }
}

export function saveDraft(draft) {
  try {
    sessionStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Storage full / blocked: the flow still works, only refresh-restore is lost.
  }
}

export function clearDraft() {
  try {
    sessionStorage.removeItem(DRAFT_STORAGE_KEY);
    sessionStorage.removeItem(LAST_STEP_STORAGE_KEY);
  } catch {
    // ignore
  }
}

// Last opened step, so a page refresh returns to it. App.jsx briefly renders
// the logged-out routes on load (which drops the URL), then the gate sends the
// user here; OnboardingPage still clamps it to the furthest valid step.
export function saveLastStep(index) {
  try {
    sessionStorage.setItem(LAST_STEP_STORAGE_KEY, String(index));
  } catch {
    // ignore
  }
}

export function loadLastStep() {
  try {
    const n = Number(sessionStorage.getItem(LAST_STEP_STORAGE_KEY));
    return Number.isInteger(n) && n >= 0 && n < STEPS.length ? n : 0;
  } catch {
    return 0;
  }
}

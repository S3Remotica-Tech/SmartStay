// API layer for the onboarding flow.
//
// Real:  the existing Add Paying Guest create call (createPgList ->
//        POST /v2/hostel, multipart) is reused as-is — same function, same
//        payload keys (see buildCreateHostelPayload in onboardingUtils.js).
// Mocked: everything the existing API has no field for. Each mock documents
//        the proposed endpoint + payload and resolves after a short delay, so
//        swapping in the real call is a one-function change.
//
// Proposed backend flag: `onboardingCompleted: boolean` on the login /
// account-details response (state.createAccount.accountList). When present,
// isOnboardingComplete() uses it instead of "has at least one hostel".
import Cookies from "universal-cookie";
import { createPgList } from "../../Redux/Action/PgListAction";
import { isDev } from "./onboardingConfig";
import {
  buildCreateHostelPayload,
  buildProfilePayload,
  buildServicesPayload,
  buildTaxPayload,
} from "./onboardingUtils";

const MOCK_DELAY_MS = 600;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function mockRequest(endpoint, payload) {
  await wait(MOCK_DELAY_MS);
  return { status: 200, data: { mocked: true, endpoint, payload } };
}

/** Error carrying the failed stage, the HTTP status and a user-facing text. */
export class OnboardingSubmitError extends Error {
  constructor(stage, message, status) {
    super(message);
    this.name = "OnboardingSubmitError";
    this.stage = stage;
    this.status = status;
  }
}

// Same token-refresh handling the Redux sagas apply after every V2 call.
function applyRefreshToken(response) {
  const cookies = new Cookies();
  if (response?.data?.refresh_token) {
    cookies.set("token", response.data.refresh_token, { path: "/" });
  } else if (response?.status === 206) {
    cookies.set("access-denied", response.status, { path: "/" });
  }
}

const apiMessage = (error, fallback) => {
  const data = error?.response?.data;
  if (typeof data === "string" && data.trim()) return data;
  return data?.message || data?.error || fallback;
};

/* --------------------------------------------------------------- real API */

/** Existing endpoint, unchanged. Returns `{ hostelId }` (null if not sent). */
export async function createHostel(draft, files) {
  const response = await createPgList(buildCreateHostelPayload(draft, files));
  applyRefreshToken(response);
  // Same rule as the Add PG saga (PgListSaga handlePgList): only 201 means the
  // hostel was created. Any other answer (e.g. 200/202 carrying a validation
  // message) is shown to the user instead of being treated as success.
  if (response?.status !== 201) {
    const data = response?.data;
    const message =
      (typeof data === "string" && data.trim()) ||
      data?.message ||
      data?.error ||
      "We couldn't create your property. Please try again.";
    if (import.meta.env.DEV) {
      console.warn("[onboarding] POST /v2/hostel was not 201", response?.status, data);
    }
    throw new OnboardingSubmitError("createHostel", message, response?.status);
  }
  // The current API answers with a message string; an id is used if the
  // backend starts returning one.
  const data = response.data;
  return { hostelId: data?.hostelId ?? data?.id ?? null };
}

/* ------------------------------------------------------------------ mocks */

// TODO(api): replace mock when PATCH /v2/hostel/:hostelId/profile is ready
// Payload: { hostelId, propertyType: "HOSTEL"|"PG"|"CO_LIVING"|"FLAT",
//            audience: "BOYS"|"GIRLS"|"MENS"|"WOMENS"|"2BHK"|"3BHK"|"4BHK"|null }
export function saveHostelProfile(payload) {
  return mockRequest("PATCH /v2/hostel/:hostelId/profile", payload);
}

// TODO(api): replace mock when POST /v2/hostel/:hostelId/tax is ready
// Payload: { hostelId, taxType: "NONE" } or
//          { hostelId, taxType: "GST", gstin, legalBusinessName, tradeName,
//            taxPercent: number|null, principalPlaceOfBusiness,
//            sameAsPropertyAddress: boolean }
export function saveTaxDetails(payload) {
  return mockRequest("POST /v2/hostel/:hostelId/tax", payload);
}

// TODO(api): replace mock when POST /v2/hostel/:hostelId/services-rules is ready
// Payload: { hostelId,
//   rules: { essential: string[], guestPolicy: string|null,
//            visitingHours: {from:"HH:mm", to:"HH:mm"}|null,
//            gateHours: {from, to}|null, custom: string[] },
//   services: { roomCleaning: {enabled, frequency?}, food: {enabled,
//               includedInRent?: string[], additional?: string[]},
//               wifi, laundry, lift, maintenance: boolean, custom: string[] } }
export function saveServicesAndRules(payload) {
  return mockRequest("POST /v2/hostel/:hostelId/services-rules", payload);
}

// TODO(api): replace mock when PATCH /v2/user/onboarding is ready
// Payload: { onboardingCompleted: true }
export function markOnboardingComplete() {
  return mockRequest("PATCH /v2/user/onboarding", { onboardingCompleted: true });
}

/* ------------------------------------------------------------ orchestrator */

/**
 * Final submit. Creates the hostel once (skipped when the draft says it was
 * already created, so a retry never duplicates it), then saves the extra data.
 * `onHostelCreated({ hostelId })` lets the caller persist that fact at once.
 */
export async function submitOnboarding(draft, files, { onHostelCreated } = {}) {
  let current = draft;

  if (!current.hostelCreated) {
    try {
      const { hostelId } = await createHostel(current, files);
      current = { ...current, hostelCreated: true, createdHostelId: hostelId };
      onHostelCreated?.({ hostelId });
    } catch (error) {
      if (error instanceof OnboardingSubmitError) throw error;
      throw new OnboardingSubmitError(
        "createHostel",
        apiMessage(error, "We couldn't create your property. Please try again."),
        error?.response?.status || error?.status,
      );
    }
  }

  // Mocked calls for unmapped fields run in development only; outside dev
  // those fields are hidden, so only the real create call is made.
  const steps = isDev
    ? [
        ["profile", () => saveHostelProfile(buildProfilePayload(current))],
        ["tax", () => saveTaxDetails(buildTaxPayload(current))],
        ["services", () => saveServicesAndRules(buildServicesPayload(current))],
        ["complete", () => markOnboardingComplete()],
      ]
    : [];
  for (const [stage, run] of steps) {
    try {
      await run();
    } catch (error) {
      throw new OnboardingSubmitError(
        stage,
        apiMessage(error, "Your property was created, but some details didn't save. Please try again."),
        error?.response?.status || error?.status,
      );
    }
  }
  return current;
}

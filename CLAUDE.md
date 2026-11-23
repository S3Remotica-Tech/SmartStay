# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

SmartStay is a hostel/PG management SaaS frontend: React 18 + Vite, plain JavaScript (TypeScript is installed but unused; there are no `.ts`/`.tsx` files). The README is unmodified Create React App boilerplate and does not describe this project.

## Commands

- `npm start` — Vite dev server. Env comes from `.env.development` (`VITE_API_URL`, `VITE_V2_API_URL`, Firebase ids).
- `npm run lint` — `eslint . --max-warnings 0` (this is what CI runs; it must stay clean).
- `npm run build:dev|qa|prod` — **rewrites the tracked `build.json`** (build counter) before building, and the `set NODE_OPTIONS=…` syntax is Windows-only. To verify a build without touching it: `npx vite build --mode development --outDir <some temp dir>`. Never commit `build.json` changes from a local build.
- Tests: `npm test` runs `jest --coverage`, but the existing tests (`src/__test__/Reducers/*.test.js`, `src/setupTests.jsx`) are written for **Vitest** (`vi`, `jsdom`). Run one with `npx vitest run src/__test__/Reducers/InvoiceReducer.test.js --coverage.enabled=false`. On Node 26 prefix `NODE_OPTIONS=--no-experimental-webstorage` or reducers that read `localStorage` at import time crash. Only reducers are tested; there are no component tests.
- CI (`.github/workflows`): `node.js.yml` runs `npm install --force`, lint, `build:dev` on PRs to `dev` / pushes to `master`; `deploy.yml` builds on push to `main` (its deploy step is commented out).

## Git

The active integration branch is **`version_2`** (recent PRs merge there as merge commits); `origin/main` is stale. Files are CRLF in the working tree (`core.autocrlf=true`), so a whole-file diff usually means line endings were changed.

## Architecture

**Startup and routing.** `src/index.jsx` mounts Redux `Provider` → `HelmetProvider` → Apollo (used only by an experimental `Pages/Dashboard/GraphQL.jsx`) → `App.jsx`. `App.jsx` decides auth from an AES-encrypted `login` value in localStorage plus the `v2-token` cookie: logged out → public landing/login routes; logged in → renders `src/Components/Sidebar.jsx`. **`Sidebar.jsx` is both the layout and the router for the whole authenticated app** (~45 `<Route>`s, mostly `/module/:hostelId?`); settings has its own nested routes via `Pages/Settings/SettingAllPages.jsx`. Adding a screen means a component file, an import + `<Route>` in `Sidebar.jsx`, and a navigation entry. Sidebar, App and the Redux root files are shared by every module — keep edits to them minimal.

**Data flow (Redux + Saga + Axios).** Despite the name, `src/Redux/Action/*Action.js` files hold the **axios API functions** (not action creators). A page dispatches an inline string action (`'X_SAGA'`) → a saga in `Redux/SagaMiddleware` (`takeEvery`) calls the API function → `put`s `'X_REDUCER'` with `{ response, statusCode }` → the reducer stores it under a key registered in `RootReducer.js` → the page's `useEffect` watches the status code, copies the data to local state, then dispatches `REMOVE_X_REDUCER` to reset it. Action types are inline string literals (no constants file). Sagas funnel errors through `handleApiError`, which dispatches `UN-AUTHORIZED` (App.jsx then logs out), `NETWORK_ERROR` or `ACCESS_RESTRICTION_ERROR`. Components never call axios directly. Two clients in `src/WebService/`: `AxiosConfig` (V1, cookie `token`) and `AxiosConfigV2` (V2, cookie `v2-token`, cancels the request if the token is missing); newer modules such as Reports use V2.

**Module layout.** Feature screens live in `src/Pages/<Module>File/` (folder names are inconsistently spelled, e.g. `Compliants`, `ElectrictyFile`, `VendorFIle`, `FianlSettlementRegister` — imports depend on them, don't rename). Reports live in `src/Reports/<Name>Register/`. Shared pieces: `Components/` (`ApiPagination` for server pagination, `ErrorMessage`), `Utils/` (`NoDataMessage`, `CustomTooltip`, `Permission.jsx`'s `useHasPermission`, `SelectStyles`), `Hoc/WithErrorBountry.jsx`.

**Conventions to follow.** `function Name() {…}` + `export default Name` (screens: `export default withErrorBoundary(Name)`); props destructured with `Name.propTypes` at the bottom; `const state = useSelector((state) => state)` is the norm; files often start with `/* eslint-disable react-hooks/exhaustive-deps */`; gate UI with `useHasPermission("ModuleName")`; hostel scoping via `state.login.selectedHostel_Id` in URLs. Core UI libs actually in use: react-bootstrap (Modal/Offcanvas/Form), iconsax-react, react-select, antd `DatePicker` only, dayjs, react-toastify, recharts. About 30 installed packages are unused (MUI, rsuite, formik, chart.js, RTK…); don't adopt them or add new dependencies without asking.

## Styling pitfalls

- **Bootstrap CSS is loaded globally and its `!important` utilities beat Tailwind's same-named classes.** Tailwind `p/m/gap-3|4|5` (all `px/py/pt/pb/ps/pe/mx/my/mt/mb/ms/me/gap-x/gap-y` variants) render at Bootstrap's 16/24/48px, and a bare `border` class forces Bootstrap's border colour. For design-exact spacing use arbitrary values (`p-[20px]`, `gap-[12px]`, `border-[1px]`). Scales 0–2 and 6+ are safe. Existing screens were tuned under the Bootstrap values; don't mass-fix them.
- `App.css` declares `@font-face Inter` pointing at `src/Assets/Fonts/Inter-*.otf`, which don't exist, so `font-inter` silently falls back. Use `font-gilroy` (brand font) and the brand blue `#1E45E1`.
- `App.css` (loaded after Tailwind) forces `.form-control::placeholder` (grey, 50% opacity), `.ant-picker` / `.ant-picker-focused` (border, `box-shadow: none`) and react-select `.custom__placeholder` with `!important`. A Tailwind `!` class ties and loses on order; win with a doubled-class arbitrary variant (`[&.form-control::placeholder]:!text-…`, `[&.ant-picker-focused]:!shadow-…`) or drop `classNamePrefix="custom"`. Don't edit `App.css` — every screen depends on it.
- Tailwind classes must appear literally in source (`content: ./src/**`); a template like `` `!${SHADOW}` `` is never generated.
- The running dev server's Tailwind keeps an in-memory list of files under `src/`. Creating then deleting a temporary file there makes it fail with `[postcss] ENOENT … <deleted file>` until restarted — put scratch/harness files outside `src/` (only `./index.html` and `src/**` are scanned).

## Form field anatomy (Figma input anatomy — use for all new/updated forms)

Tokens live in `tailwind.config.js` (`primary-*`, `ink-*`, `success|warning|danger-*`, `field-*`, `rounded-small|medium|large`, `text-h1…c3`) — use them instead of hex for new code. Full token/component reference and decisions: **`docs/SmartStay-Design-System.md`** (Figma "Mobile UI component" `MeZzgNAFFUwdfEEjh0y0dB`).

Source: Figma *Smartstay Ver-3* "Input anatomy" `7135:154955`, Input variants `7135:154966`, Select `7137:159937`. Implemented once in **`src/Utils/FieldStyles.js`** (+ `src/Utils/AmountInput.jsx`); reuse these, don't restyle fields ad hoc or with global CSS.

| State | Look |
|---|---|
| default / filled | white bg, **1px `#DEDEE0` stroke, no shadow** (user decision, replaces the kit's field shadow); text `#18181B` |
| placeholder | `#71717A`, regular weight |
| hover | bg `rgba(249,249,249,0.92)` |
| focus | white bg, **2px `#0485F7` ring** (`0 0 0 2px`) around the stroke |
| spacing | per Smartstay Ver-3 field frame `3497:142969`: label → field **10px** (`fieldLabelClass`), `*` **10px** after the label text (`fieldRequiredClass`), field → helper note **10px** (`fieldHelperClass`), field → validation **6px** (`<ErrorMessage className="mt-[6px]">`; ErrorMessage defaults to `mt-1` so untouched screens keep 4px). Never put `m-0` in these classes: Bootstrap `.m-0{margin:0!important}` silently erases the gap |
| error | 1px `#FF383C` border; message below via `<ErrorMessage>` |
| disabled | 50% opacity |
| secondary variant | filled `#EBEBEC`, 48px, no shadow (e.g. mobile search box) |
| select menu | white, radius 12, padding 4, overlay shadow; options 36px, radius 10, focus `#F4F4F5`, selected `#EBEFFF` |

SmartStay deviations from the HeroUI kit (user decision): **Gilroy only** (never Inter), **8px radius** (kit says 12), **44px height**, 14px medium text, labels keep the existing 14px `#222`. Page/section layout: `src/Utils/FormSection.jsx` cards (20px padding, 16px gaps, 2-col grid), buttons from `src/Utils/ButtonStyles.js`. Reference implementation: `Pages/VendorFIle/AddVendorNew.jsx` (approved pilot). Buttons: `Utils/ButtonStyles.js` (`BTN_PRIMARY|SECONDARY|TERTIARY|NEUTRAL|GHOST|DANGER`, modifiers `BTN_SM`, `BTN_ICON`; pill, Gilroy Medium 16) + `Utils/ButtonSpinner.jsx`; Add Tenant's `TENANT_BTN_*` re-export these. Controls: `Utils/Checkbox.jsx` (checked/indeterminate/error/disabled), `Utils/Radio.jsx`, `Utils/Switch.jsx` (sm/md/lg) — native inputs underneath, brand `primary-500` accent. Also: `Utils/Badge.jsx` (solid/soft/outline × accent/default/success/warning/danger × sm/md/lg), `Utils/Tabs.jsx` (primary pill track / secondary underline, hug/fill), `Utils/Skeleton.jsx`, `Utils/MenuStyles.js` (`MENU_PANEL_CLASS`, `menuItemClass`), `Utils/ConfirmDialog.jsx` (danger/warning). Field rollout to the rest of the app is done **module by module** (app screens only — not login/landing in `Components/`, `NewV2LandingPage/`), each batch verified and reviewed before the next. Helpers: `fieldClass(hasError)` for `<input>`/react-bootstrap `FormControl`; `fieldGroupClass(hasError, variant)` + `fieldInnerInputClass` for compound fields (`+91 | number`); `fieldSelectStyles(hasError)` for react-select `styles`; `datePickerClass(hasError)` for antd `DatePicker`, `datePickerInputClass(hasError)` for react-datepicker (its `className` lands on the `<input>`; adds right padding for the overlaid Calendar icon); `<AmountInput>` for every money field (leading `₹`, text + `inputMode="decimal"`, pair with `sanitizeAmountInput`/`validateAmount` from `tenantDraftUtils.js`). Wire `hasError` to the same state that drives the field's `ErrorMessage`.

## Add Tenant wizard (`src/Pages/PayingGuestFile/`)

`AddTenant.jsx` owns the drawer, Step 1 (personal), Step 3 (documents/guardians/jobs), navigation and all draft/submit orchestration; Step 2 is `AddTenantBookingCheckin.jsx` (`forwardRef`, imperative API: `validate`, `getDraftFields`, `getSummary`, `submitCheckin`, `submitBooking`, `canSubmit`) and stays mounted (hidden) once opened so state survives navigation. Steps: Check-in 1→2→3→4, Booking 1→2→4 (`getTenantSteps`/`getNextStep` in `tenantDraftUtils.js`); Step 4 is `TenantPreview.jsx`, the **only** place that submits.
- Next never calls the API. Save Draft (and the Unsaved Changes dialog's Save Draft) = `SAVE_DRAFT_SAGA` (new customer) then `UPDATE_SAVE_DRAFT_SAGA` with Step 2 fields, then closes. A draft is never a tenant/booking/check-in.
- Confirm = save/update the draft first (booking/check-in endpoints take the draft `customerId`), then `ADD_BOOKING` or `DIRECT_CHECK_IN_SAGA`, then for check-in `ADDITIONAL_DETAILS_TENANT_SAGA` if guardians/jobs/new proof images exist. Success popup → `onTenantCreated(customerId)` → `UserList` shadows that row for 5s.
- Step 2 restores from a draft only once (`restoredDraftId`); later draft refreshes must not overwrite typed values.
- New backend fields (`addressLater`, `currentStep`, `amenities[{amenityId, planId}]`, `amenityProRate`) are sent only when `VITE_TENANT_DRAFT_EXTRA_FIELDS=true`. Limits: rent/booking `VITE_MAX_RENT_AMOUNT` (default ₹1,00,000), deposit/non-refundable `VITE_MAX_DEPOSIT_AMOUNT` (₹3,00,000).
- Amenities come from Settings (`AMENITIESLIST` → `state.InvoiceList.AmenitiesList`, plans via `AmenitiesFile/amenityPlanUtils.js`); one plan per amenity, the plan sets the frequency. Amounts shown on Preview are labelled estimates; the backend computes real charges.

## Invoice Register consolidated view (feature on `reports_invoice_reg`)

`src/Reports/InvoiceRegister/InvoiceRegister.jsx` hosts a List/Consolidated view switch; the **List View is the original code path and must remain byte-for-byte unchanged in behaviour** (list export is a direct server PDF). The Consolidated View is entirely client-side on static mock data (`consolidatedMockData.js`) — no Redux/saga/API. All maths live in `consolidatedHelpers.js` so the table, stat cards, export and PDF agree: per-charge pending is always `amount − paid` (Rent/EB/Advance/Non-refundable only), Total Pending is their sum, Actual Rent is informational and never added, vacant beds never count in totals, "Overdue" is an invoice-level filter (not a status). PDF export flow: `ConsolidatedExportSettings` → `consolidatedExportLayout.js` (pagination) → `ConsolidatedReportPage` (printable A4 page) → `ConsolidatedExportPreview` → `src/Utils/ExportPdf.js`, the only file that imports html2canvas/jsPDF (swap it to move PDF generation to the backend). html2canvas draws Gilroy text too low; `PDF_TEXT_SHIFT` compensates — re-check it if html2canvas or the font changes.

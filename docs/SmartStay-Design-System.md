# SmartStay Design System — Figma vs Code (Stage 3)

Source of truth for visuals: Figma **"Mobile UI component"** (`MeZzgNAFFUwdfEEjh0y0dB`), pages Foundation `4:15`, Buttons `11:1378`, Forms & input `12:88590`, Tabs `33:13352`, Cards/badge/Lists `17:9531`, Navigation `17:9530`, Skeleton `33:12862`, Spin loader `33:14598`, Scroll shadow `33:16313`. Input anatomy also from *Smartstay Ver-3* `7135:154955`.

Code is the foundation: enhance existing pieces, add shared ones only for real gaps. Pilot (approved): `src/Pages/VendorFIle/AddVendorNew.jsx`.

---

## 1. Locked SmartStay decisions (override the kit)

| Topic | Decision |
|---|---|
| Font | **Gilroy only** everywhere (kit sheets use Inter in places — ignore) |
| Primary | **`#1E45E1`** (= `primary-500`) for every primary action and brand accent |
| Form field | 44px, **8px radius**, white, **1px `#DEDEE0` stroke, no shadow**, focus 2px `#0485F7` ring, error `#FF383C`, disabled 50%, placeholder `#71717A` |
| Field spacing | label → field **10px**, field → helper/validation **6px** |
| Labels | 14px Medium `#222` (= B4) |

## 2. Foundations (Figma values)

### Colour (`colors/base/*`)

| Scale | 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 |
|---|---|---|---|---|---|---|---|---|---|---|
| primary | #EDEFFE | #97ABFE | #7590FA | #5072F9 | #2C53F2 | **#1E45E1** | #2C3ED3 | #2031BB | #132197 | #0D1B8E |
| default | #FAFAFA | #F4F4F5 | #E5E7EA | #131927¹ | #9EA2AE | **#6D717F** | #4D5461 | #394050 | #212936 | #131927 |
| success | #E8FAF0 | #D1F4E0 | #A2E9C1 | #74DFA2 | #45D483 | **#17C964** | #12A150 | #038C46 | #095028 | #095028 |
| warning | #FEFCE8 | #FDEDD3 | #FBDBA7 | #F9C97C | #F7B750 | **#F5A524** | #C4841D | #936316 | #62420E | #312107 |
| danger | #FEE7EF | #FDD0DF | #FAA0BF | #F871A0 | #F54180 | **#F31260** | #C20E4D | #920B3A | #610726 | #310413 |
| secondary | #F2EAFA | #E4D4F4 | #C9A9E9 | #AE7EDE | #9353D3 | **#7828C8** | #6020A0 | #481878 | #301050 | #180828 |

Text: foreground `#222` (`default-foreground`, `common/black`), title `#131927`, content2 `#F4F4F5`. Divider `rgba(17,17,17,0.15)`.
¹ `default-300 = #131927` looks like a Figma variable error.

Semantic hierarchy for screens: page bg white · surface `#F9FAFB`/`#F4F4F5` · border `#DEDEE0` (fields) / `#E5E7EA` (dividers) · text `#222` → secondary `#4D5461` → muted `#71717A` → disabled `#9EA2AE`.

### Typography (Gilroy)

| Token | Size / line | Weight | Use |
|---|---|---|---|
| H1–H5 | 48/58 · 40/48 · 32/38 · 28/34 · 24/28 | Semibold | page/hero titles (H5 = page title) |
| S1 | 18/28 | Semibold | section / card title |
| S2 | 16/24 | Semibold | sub-section title |
| B1 / B2 | 16/24 | Regular / Medium | body, button text |
| B3 / B4 | 14/20 | Regular / Medium | body, **field labels (B4)**, field text |
| C1 / C2 | 12/16 | Regular / Medium | helper text, captions, badges |
| C3 | 10/14 | Medium | tiny meta |
| Label | 12/16 uppercase | Medium | overlines, table heads |
| Button | 18/24 · 16/20 · 14/16 · 12/16 · 10/12 | Semibold | giant · large · medium · small · tiny |

### Spacing (4px base, `unit-*`)

0, 4, 8, 12, **14**, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 68, 72, 80, 96, 112, 128 … 384.
Aliases: xs 8 · sm 12 · md 16 · lg 22 · xl 36 · 2xl 48 · 3xl 80 · 4xl 120 · 5xl 224 · 6xl 288 · 7xl 384.
Use Tailwind arbitrary values (`gap-[16px]`) — Bootstrap overrides `p/m/gap-3|4|5` (see CLAUDE.md).

### Radius / shadow / icons

Radius: small **8** · medium **12** · large **14** · full **999**.
Shadow: Tailwind scale `sm, base, md, lg, xl, 2xl, inner` (+ tinted variants). Fields use none.
Icons: vuesax/Huge-icon outline + solid sets → `iconsax-react` (already used), 16px in buttons, 20px in headers.

## 3. Component comparison

Status: **1** matches · **2** partial (restyle) · **3** missing states/anatomy (enhance) · **4** missing shared component (create only if needed).

| Component | Existing implementation | Figma reference | Status | Required action |
|---|---|---|---|---|
| Text input | `Utils/FieldStyles.js` `fieldClass` (Add Tenant, Add Vendor); elsewhere inline Tailwind / react-bootstrap `FormControl` | Input `12:88638` (6 states × 3 types) | 1 (where used) / 2 elsewhere | Roll `fieldClass` out form by form; add `password` eye-toggle only when a form needs it |
| Textarea | `fieldTextareaClass` | Input anatomy | 1 | — |
| Compound field (+91, ₹, suffix) | `fieldGroupClass` + `fieldInnerInputClass`, `fieldEmbeddedSelectStyles`, `AmountInput.jsx` | Input / InputGroup | 1 | — |
| Search field | inline per list page; secondary variant in Add Tenant | SearchField `14:2489` | 2 | Use `fieldGroupClass(…, "secondary")` + search icon in list pages |
| Select / dropdown | `fieldSelectStyles` (2 forms); `Utils/SelectStyles.jsx` (32px filter) + 53 local style objects | Select `33:16841`, DropdownItem `16:6270` | 2 | Replace local style objects with `fieldSelectStyles`; keep `SelectStyles.jsx` only for 32px filter bars until filters are migrated |
| Multi-select | react-select `isMulti`, ad hoc | (no dedicated set) | 2 | Same styles + chip styling from Badge |
| Date picker | antd `DatePicker` + `datePickerClass`; **react-datepicker** in 16 Banking files | DateField `16:7367`, DateRangePicker `33:19318` | 2 | Standardise on antd + `datePickerClass`; migrate Banking later (separate approval) |
| Time picker | raw `type="time"` (3 files) | — | 2 | `fieldClass` on the input |
| Number field / OTP | raw inputs | NumberField `21:21669`, InputOTP `33:17522` | 2 | `fieldClass`; OTP only if login screens are in scope |
| Checkbox | native `accent-*` (40 files) | Checkbox `16:6671`, control `16:6564` (unselected/selected/indeterminate × 5 states) | 3 | Shared `Checkbox` (native input + styled box): 16px, radius 4, checked fill brand, focus ring, error, disabled |
| Radio | native (9 files) | Radio `17:9013` | 3 | Shared `Radio` alongside Checkbox |
| Toggle / switch | 7 hand-rolled + 4 `Form.Check switch` | Switch `17:8580` (sm/md/lg × on/off × 4 states) | 3 | Shared `Switch` (sm/md/lg) |
| File upload | per-screen hidden input + tile (21 files) | — (no Figma set) | 2 | Keep; align tile to dashed `#DEDEE0` + C1 helper |
| Buttons | `Utils/ButtonStyles.js` (Vendor), `TENANT_BTN_*` (Add Tenant), ~217 files hand-styled | App buttons `12:8021` (40px, **pill r24**, px16, gap8, Gilroy Medium 16, icon 16): primary, soft-primary, neutral, outline, ghost, danger, cancel. Kit sizes sm/default/lg `11:5075` | 2 | Extend `ButtonStyles.js` to the 7 Figma variants + sizes + icon-only; then point `TENANT_BTN_*` at it; radius per decision D1 |
| Loading button | hand-rolled `animate-spin` (154 files) | Spin loader page | 3 | `ButtonSpinner` snippet in ButtonStyles (one markup) |
| Tabs | inline `activeTab` buttons per screen | Tabs `33:13488` (primary pill track / secondary underline × hug/fill) + TabsElement `33:13421` | 4 | Shared `Tabs` (primary/secondary) — genuine gap |
| Sidebar navigation | `Components/Sidebar.jsx` (layout + router) | Mobile bottom nav only (`17:9530`) | — | No desktop spec → leave as is |
| Breadcrumbs | ad hoc (2 files) | — | — | Leave |
| Pagination | `ApiPagination.jsx` (server) + `PaginationList.jsx` (client) | — | 2 | Restyle both to tokens; merge later behind a `mode` prop (not now) |
| Dropdown / action menu | custom popups per screen | DropdownItem `16:6270` | 3 | Shared menu item styles (default/hover/focus/selected/disabled, danger) |
| Status badge | inline pills (~22 files); `BedStatus`, `OccupiedBedStatus` | Badge `18:15966` (solid/soft/outline × accent/default/success/warning/danger × sm/md/lg) | 4 | Shared `Badge` — genuine gap |
| Alert / inline error | `Components/ErrorMessage.jsx` (`className` prop added) | Input error description | 2 | Colour → danger decision (D3); keep component |
| Toast | react-toastify, inline styles in sagas | — | 2 | One toast style object in Utils, used by sagas (later) |
| Tooltip | `Utils/CustomTooltip.jsx` + react-bootstrap `OverlayTrigger` | — | 2 | Keep CustomTooltip as the standard |
| Progress / skeleton | inline; `react-loading-skeleton` imported but unused | Skeleton `33:12862`, Spin `33:14598` | 3 | Shared skeleton block (Tailwind pulse, radius 8) when tables are migrated |
| Empty / error / permission state | `NoDataMessage`, `NoData`, `PermissionDeniedMessage` | — | 2 | Restyle to tokens (S2 title, B3 body, muted) |
| Tables | raw `<table>` (61 files) | — (mobile kit) | 2 | Token pass only: head = Label style, row border `#E5E7EA`, B3 cells |
| Cards / stats | inline | Card footer `18:11121`; `Utils/FormSection.jsx` | 2 | `FormSection` for forms; stat cards use radius-medium + S2/H5 numbers |
| Avatar | inline (28 files) | Avatar `18:14833` (Tiny…XXXL × icon/image/letter) | 4 | Shared `Avatar` when a screen needs it |
| Filters | 14 module `*Filter.jsx` drawers | — | 2 | Restyle with field/button tokens per module |
| Modal / confirm dialog | react-bootstrap `Modal` (59), ~38 delete modals, `UnsavedChangesDialog.jsx` | (dialog seen in Smartstay Ver-3 `3341:77569`) | 2 | `UnsavedChangesDialog` anatomy as the confirm-dialog standard |
| Drawer | `Offcanvas` (14) + custom fixed drawers | Smartstay Ver-3 Add Tenant drawer | 2 | Keep; tokens only |
| Bottom sheet / popover | none | — | — | Not needed (desktop app) |

## 4. Decisions — resolved in Stage 4 (bold option applied)

| # | Question | Options |
|---|---|---|
| D1 | Button radius | **Figma pill r24 (app buttons)** · keep 8px (current pilot) |
| D2 | Accent for checkbox / radio / switch / tabs indicator | **`#1E45E1` brand** (keep `#0485F7` only for focus ring) · Figma `#0485F7` |
| D3 | Single danger / error red | **`#FF383C`** (input anatomy, already live) · `#F31260` palette · `#EF4444` app button |
| D4 | Muted text | **`#71717A`** (live) · `#6D717F` (`default-500`) |
| D5 | Section title | **S1 18/28 Semibold** (currently 18/24 Medium in `FormSection`) |
| D6 | Page title | **H5 24/28 Semibold** (currently 20px) |
| D7 | Card radius | **12 (radius-medium)** · keep 8 |

## 4b. Tokens in code (Stage 4)

`tailwind.config.js` `theme.extend`: colours `primary-50…900`, `ink-50…900` (+ `ink` = #222, `ink-muted` = #71717A), `success|warning|danger-50…900` (numeric only — no DEFAULT, so Bootstrap `bg-primary` etc. are unaffected), `field-border|placeholder|text|hover|focus|error`; radius `rounded-small|medium|large`; type `text-h1…h5, s1, s2, b1, b3, c1, c3` (pair with `font-semibold` / `font-medium`). Applied in `Utils/FieldStyles.js`, `Utils/ButtonStyles.js` (pill, Gilroy Medium 16/24), `Utils/FormSection.jsx` (radius-medium, S1 Semibold), `Components/ErrorMessage.jsx` (`field-error`, app-wide), Add Vendor title (H5).

## 5. Enhancement plan (after decisions)

1. **Stage 4 – tokens:** add the colour/radius tokens to `tailwind.config.js` `theme.extend` (`primary`, `neutral`, `success`, `warning`, `danger`, `rounded-small/medium/large`) — no new token system, Tailwind only; apply D1–D7 to `FieldStyles.js`, `ButtonStyles.js`, `FormSection.jsx`, `ErrorMessage.jsx`.
2. **Stage 5 – buttons & form controls:** extend `ButtonStyles.js` (7 variants, sm/md, icon-only, loading); add `Checkbox`, `Radio`, `Switch` (Utils, native inputs underneath).
3. **Stage 6 – Badge, Tabs, menu item, skeleton, empty states, confirm dialog** (shared, small).
4. **Stage 7 – playground:** dev-only route rendering the real components (not registered in production nav).
5. **Rollout:** one form/module per PR, Add Vendor pattern; each verified on localhost.

## 6. Duplicates (documented, not merged)

| Pair | Same job? | Note |
|---|---|---|
| `ApiPagination` / `PaginationList` | No | server-driven vs client-computed pages |
| `NoData` / `NoDataMessage` | Mostly | `NoData` is a superset (`subLabel`, add floor/room) |
| `CustomTooltip` / `OverlayTrigger` | Yes | standardise on CustomTooltip |
| antd `DatePicker` / `react-datepicker` | Yes | standardise on antd |
| `TENANT_BTN_*` / `ButtonStyles.js` | Yes | point Add Tenant at ButtonStyles in Stage 5 |

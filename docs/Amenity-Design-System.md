# Amenity — Design System & Implementation Notes

Settings → Lists & Categories → **Amenities**. This documents the enhancement that adds
**pricing plans** to the existing Amenity module (Add, List, Edit) and how each part maps
to Figma (`Smartstay Ver 3`: list `5137:197182`, add `5137:198022`, input `7135:154955`,
select `7137:159937`; brand variables `Mobile UI component` `33:17442`).

> Typography is **Gilroy** (`font-gilroy`) everywhere. The Figma frames render Inter
> (HeroUI defaults); that font is intentionally not used.

---

## 1. Existing implementation (verified)

| Concern | Where |
|---|---|
| Route / entry | `src/Pages/Settings/SettingAllPages.jsx` → `SettingAmenities` (`Components/Sidebar.jsx` holds the route) |
| List + card UI, delete modal, pro-rate toggle, assign | `src/Pages/Settings/SettingAmenities.jsx` |
| Add **and** Edit form (one component, edit when `editDetails` is set) | `src/Pages/AmenitiesFile/AddAmenities.jsx` |
| Assign to tenants / recurring | `AssignAmenities.jsx`, `RecurringEnable.jsx` (untouched) |
| API (V2 axios) | `Redux/Action/InvoiceAction.js`: `GetAmenities` `GET /v2/amenity/:hostelId`, `AddAmenity` `POST /v2/amenity/:hostelId`, `UpdateAmenities` `PUT /v2/amenity/:hostelId/:amenityId`, `DeleteAmenities` |
| Sagas / reducer | `AMENITIESLIST`, `ADD_AMENITIY`, `AMENITIESUPDATE`, `DELETEAMENITIES` → `InvoiceReducer` (`state.InvoiceList`) |
| Permissions | `useHasPermission("Amenities")` → write / read / update / delete |
| Data fields today | `amenityId`, `amenityName`, `amenityAmount`, `proRate` — **no** description, plans or status |

Existing form rules kept: name letters/spaces only (single spaces), "Please Enter Amenity",
hostel guard, "No Changes Detected" on unchanged edit, backend error banner
(`amnitiessAddError`), saving spinner, same dispatch action types.

## 2. Existing vs Figma vs action

| Element | Existing implementation | Figma reference | Recommended action |
|---|---|---|---|
| Amenity form | `AddAmenities.jsx`: Name + Amount, right drawer (`max-w-xl`) | Add Amenity: Basic Information (name, description) + Pricing Plans + Cancel/Add | **Extend** same file (Amount becomes plan price) |
| Amenity list | `SettingAmenities.jsx`: 2-col cards, name, one `₹amount/Month`, pro-rate switch, assign icon, ⋮ Edit/Delete | Cards with status chip, description, plan count, View Details, plan rows, ⋮ Edit/Duplicate/Disable/Delete | **Extend** card in place; keep assign icon + pro-rate switch |
| Edit form | Same `AddAmenities.jsx` | Same drawer as Add, title "Edit" | **Reuse** (extended) |
| Pricing plan | Missing | Plan Name / Price / Billing Unit rows, delete row, Add New Row | **New component** `AmenityPlanRows.jsx` |
| Input field | Tailwind `h-12 border-gray-300 rounded-md` | Input anatomy: 12px radius, hover / focus ring / error / disabled | **Extend** via shared `fieldClass()` |
| Dropdown | none in form | Select (react-select style) | **New styles** `planSelectStyles` (`Utils/SelectStyles` `CustomStyles` is a 32px filter style that fills blue when selected — can't express a form field) |
| Error message | `Components/ErrorMessage` | red caption 12px | **Reuse** as-is |
| Buttons | inline Tailwind | Cancel (outline) / primary `#1E45E1` | **Reuse** pattern, restyle per Figma (radius 12, h 36) |

## 3. Component anatomy

### 3.1 Add / Edit drawer — `AddAmenities`
Props: `handleClose` (fn), `hostelid`, `editDetails` (amenity object, `""` for add).
```
Overlay (bg-black/50, z-[9999])  — not click-to-close (unchanged, protects typed data)
└─ Panel  w-full max-w-[589px] radius 10, shadow 0 25 50 -12 rgba(0,0,0,.25)
   ├─ Header   px 24, border-b #F3F4F6: Title 20/600 #101828 · Subtitle 14 #6A7282 · Close ✕ #FF383C
   ├─ Body     px 24 py 20, gap 20, scrolls
   │   ├─ BASIC INFORMATION (12/600 uppercase #99A1AF, tracking 0.6)
   │   │    Amenity Name * (primary field 40px) · Description (textarea 58px)
   │   └─ PRICING PLANS (16/600 uppercase #222) "(Optional)" 10 #99A1AF + helper 12 #6A7282
   │        <AmenityPlanRows/>
   ├─ Error banners (backend error, "No Changes Detected")
   └─ Footer   border-t #F3F4F6: Cancel (outline) · Add Amenity / Save Changes (#1E45E1)
```
States: default, field error (red border + `ErrorMessage`), saving (spinner, button disabled).

### 3.2 Plan rows — `AmenityPlanRows` (new)
Props: `plans` `[{key, planId?, planName, amount, billingUnit}]`, `errors` `{[key]:{planName?,amount?}}`, `onChange(plans)`.
Row = `Plan name` (flex, grey filled 36px) · `₹ Price` (112px, digits only) · `Billing Unit`
react-select (128px; **Monthly / Weekly / One-time**) · trash (32px, red tint on hover).
- "Add New Row" button (`#F4F6FF`, `#1E45E1` text).
- Plans are optional: blank rows are ignored; deleting the last row clears it instead of removing it.
- Mobile (<640px): column labels hide; plan name takes a full row.
- Billing menu is portalled to `<body>` (z 10001) so the scrolling drawer doesn't clip it.

### 3.3 Amenity card — in `SettingAmenities`
```
Card  white, border gray-300, radius 16 (existing)
├─ Name + status chip (Active = #ECFDF5 / dot #00BC7D / text #007A55; Disabled = #F3F4F6 / #6A7282)
│   Description 12 #6A7282 (only when present)
│                                 [assign link icon] [⋮ menu]
├─ "N Plans" pill (#EEF1FD / #1E45E1)                 View Details ⌄ / Hide Details ⌃
├─ Plan panel #F9FAFB radius 7 p 8 — rows white, border #E5E7EB, h 40, radius 6;
│   name 13/500 #222 · price 12/500 `₹2,500/month`; list scrolls past ~3 rows
├─ No plans → "No pricing plans"
└─ Pro-Rate switch (existing, kept)
```
Menu: Edit · Duplicate · Disable (disabled, see §7) · Delete — permissions as before
(Edit = update, Duplicate = write, Delete = delete).

## 4. Tokens

| Token | Value | Source |
|---|---|---|
| Brand / primary | `#1E45E1` (hover `#1638B5`) | Figma primary-color, existing app |
| Brand soft fills | `#EEF1FD`, `#F4F6FF` | Figma |
| Text strong / label / muted | `#222222` / `#364153` / `#6A7282` | Figma |
| Placeholder | `#717182` (plan rows), `#99A1AF` (textarea) | Figma |
| Field border / grey fill | `#E5E7EB` / `#F3F3F5` | Figma |
| Field hover bg | `#F9F9F9` (primary), `#EBEBED` (plan) | Anatomy (hover) |
| Focus ring | 2px `#0485F7` | Anatomy `focus-ring` variable |
| Error border | `#FF383C` | Anatomy `danger/danger` |
| Disabled | 50% opacity | Anatomy `disabled-opacity` |
| Radius | field 12 · button 12 · card 16 (existing) · row 6 · panel 7 · drawer 10 | Figma |
| Heights | primary field 40 · plan field/select 36 · button 36 · row 40 | Figma |
| Spacing | 4 / 8 / 10 / 12 / 16 / 20 / 24 | Figma |
| Font | Gilroy: Regular 400, Medium 500, SemiBold 600 | brand font |

Styling pitfall honoured: Bootstrap's `!important` utilities beat Tailwind's `p/m/gap-3|4|5` and bare
`border`, so these use arbitrary values (`p-[16px]`, `gap-[12px]`, `border-[1px]`).

## 5. Validation behaviour
| Field | Rule | Message |
|---|---|---|
| Amenity name | required; letters/spaces only (input filtered) | Please Enter Amenity |
| Description | optional | — |
| Plan row (non-blank) | name required | Enter plan name |
| | name unique within amenity (case-insensitive) | Plan name already used |
| | price required, digits only, > 0 | Enter price / Must be above 0 |
| Plans overall | optional; blank rows ignored | — |
| Edit | unchanged form | No Changes Detected |

## 6. Reusability
`amenityPlanUtils.js` is the single shared module for Add, Edit and List:
`BILLING_UNITS`, `getAmenityPlans`, `toFormPlans`, `validatePlans`, `buildAmenityPayload`,
`getFormSnapshot`, `formatPlanPrice`, `isAmenityActive`, plus `fieldClass` / `labelClass` /
`planSelectStyles`. The pro-rate toggle and Duplicate use `buildAmenityPayload` so a partial
update can never drop description or plans.

## 7. Backend dependencies (not invented — assumed shape, isolated in `amenityPlanUtils.js`)
Chosen approach: send the new fields **in addition to** the existing ones.
```jsonc
// POST/PUT /v2/amenity/:hostelId[/:amenityId]
{ "amenityName": "Laundry", "amount": 2500, "proRate": false,   // existing contract
  "description": "Weekly service",                               // NEW (assumed)
  "plans": [ { "planId": "…", "planName": "Standard",            // NEW (assumed)
               "amount": 2500, "billingUnit": "MONTHLY|WEEKLY|ONE_TIME" } ] }
```
To confirm with the backend developer:
1. Does the API accept/persist `description` and `plans[]`, and what are the real field names and `billingUnit` values?
2. `amount` is sent as the **first plan's price** (or the old amount if no plans; `0` for a brand-new amenity with no plans). Is `0` accepted, and what should `amount` mean with mixed Monthly/Weekly plans?
3. Does `PUT` replace or merge `plans`? (The UI always sends the full list.)
4. Does `GET /v2/amenity/:hostelId` return `description`, `plans[]`, `isActive`?
5. **Disable** needs a status field (`isActive` assumed). The menu item is shown disabled until it exists.
6. Duplicate uses the existing add API with the name suffixed "Copy" (no new endpoint).
7. Tenant-side screens (`AssignAmenities`, `UserListAmenities`, invoices) still read `amenityAmount`; how a tenant is billed against a specific plan is an open business decision.

Backward compatibility: amenities without `plans` render a single display-only **"Base price"**
plan from `amenityAmount` and are edited as one prefilled row; nothing changes until the admin saves.

## 8. Figma → code map
| Figma | Code |
|---|---|
| `5137:197182` Amenities list / `5137:197273` card | `SettingAmenities.jsx` card block |
| `5137:198022` / `5137:198836` Add Amenity drawer | `AddAmenities.jsx` |
| Plan row (`5137:198934`) + Add New Row (`5137:198973`) | `AmenityPlanRows.jsx` |
| `7135:154955` Input anatomy | `fieldClass()` in `amenityPlanUtils.js` |
| `7137:159937` Select | `planSelectStyles` + react-select in `AmenityPlanRows.jsx` |
| Edit Amenity | no separate frame; reuses the Add drawer |

## 9. Brand colorography (reference only — NOT applied to components yet)

> Superseded for app-wide use by `docs/SmartStay-Design-System.md` (full palette, type scale, spacing, components).

Saved from Figma `Mobile UI component` → variables (`33:17442`), exactly as exported. Components keep
their current colours until the team says to apply these everywhere.

> That file is a HeroUI-based kit (font variable `Inter`). Per project rule the font stays **Gilroy**;
> only colour / size / radius / shadow values are recorded here. Hex values with 8 digits are `RRGGBBAA`.

### Colour variables
| Variable | Value | Use |
|---|---|---|
| `foreground/foreground` | `#18181B` | Default text |
| `default/default-foreground` | `#18181B` | Text on default surfaces |
| `foreground/muted` | `#71717A` | Secondary text |
| `field/foreground` | `#18181B` | Filled input text |
| `field/placeholder` | `#71717A` | Input placeholder |
| `field/background` | `#FFFFFF` | Input background |
| `field/border` | `#DEDEE000` (transparent) | Input border (default) |
| `field/shadow` | `#0000000A` | Input shadow (outer) |
| `field/shadow-2` | `#0000000F` | Input shadow (inner layers) |
| `danger/danger` | `#FF383C` | Error border / text |
| `overlay` | `#FFFFFF` | Dropdown / popover surface |
| `overlay-shadow` | `#00000000` | Overlay inner shadow |
| Observed in Anatomy frame (not variables) | `#F5F5F5` page bg · `#DEDEE0` border · `#0485F7` focus ring · `rgba(235,235,236,.5)` chip bg | Input anatomy |

### Dimension variables
| Variable | px |
|---|---|
| `dimensions/spacing/0.5 · 1 · 1.5 · 2 · 3 · 4 · 9 · 16` | 2 · 4 · 6 · 8 · 12 · 16 · 36 · 64 |
| `dimensions/font/text-sm · text-base` | 14 · 16 |
| `dimensions/leading/text-sm · text-base · text-lg` | 20 · 24 · 28 |
| `field/radius` · `border/radius/xl` · `dimensions/radius/rounded-2_5xl` | 12 · 12 · 20 |
| `field/border-width` · `border-width` | 1 · 1 |
| `letter-spacing` · `blur` · `depth` | 0 · 0 · 0 |

### Effects
- `shadow-field`: drop `0 0 1 field/shadow-2`, `0 1 2 field/shadow-2`, `0 2 4 field/shadow`; inner `0 depth depth #FFFFFF1A`.
- `shadow-overlay`: drop `0 14 28 #00000014`, `0 -6 12 #00000008`, `0 2 8 #0000000F`.
- Focus ring: `0 0 0 2px focus-ring` (`#0485F7`).

### Not in this variable set
The SmartStay brand blue `#1E45E1` (and its soft fills `#EEF1FD` / `#F4F6FF`), success green, and
the neutral greys used by the amenity screens are **not** defined here; they come from the app and the
amenity Figma frames. A full SmartStay palette is still to be provided, so nothing below is a final mapping.

### Current amenity colours vs these variables (for the later roll-out)
| Used today | Variable it would map to |
|---|---|
| `#FF383C` (error border, close ✕) | `danger/danger` ✔ already matches |
| `#0485F7` focus ring | anatomy focus ring ✔ already matches |
| `#717182` placeholder | differs from `field/placeholder` `#71717A` |
| `#E5E7EB` field border | differs from anatomy border `#DEDEE0` |
| `#222222` / `#364153` text | differs from `foreground` `#18181B` |
| `#FF0000` in shared `ErrorMessage` | differs from `danger/danger` `#FF383C` |

Design notes / decisions: the status chip follows the soft-pill variant seen in the Add screen backdrop
(the list frame also contains a solid green variant); the focus ring uses the anatomy's `#0485F7`
rather than brand blue — one constant to change if the design system says otherwise.

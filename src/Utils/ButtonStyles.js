// Shared button classes — Figma app buttons (Mobile UI component 12:8021):
// 40px high, pill radius, 16px side padding, 8px gap, Gilroy Medium 16/24,
// 16px icons. Primary is always the brand #1E45E1 (primary-500).
// Colour/radius/type classes come from the tokens in tailwind.config.js.

const BASE =
  "flex h-[40px] min-w-[40px] items-center justify-center gap-[8px] whitespace-nowrap rounded-full px-[16px] font-gilroy text-b1 font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60";

// Solid brand action (Save, Confirm, Next).
export const BTN_PRIMARY = `${BASE} min-w-[120px] bg-primary-500 text-white hover:bg-primary-700 focus-visible:shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_#0485F7]`;

// Soft brand action (Save Draft, Add …).
export const BTN_SECONDARY = `${BASE} min-w-[120px] bg-primary-50 text-primary-500 hover:bg-[#DFE4FD] focus-visible:shadow-[0_0_0_2px_#0485F7]`;

// Neutral outline action (Cancel, Back, Discard).
export const BTN_TERTIARY = `${BASE} border-[1px] border-solid border-field-border bg-white text-ink hover:bg-ink-50 focus-visible:shadow-[0_0_0_2px_#0485F7]`;

// Neutral filled action (Email, toolbar Cancel): Figma neutral/100.
export const BTN_NEUTRAL = `${BASE} bg-ink-100 text-ink hover:bg-ink-200 focus-visible:shadow-[0_0_0_2px_#0485F7]`;

// Text-only action (Go back, inline links).
export const BTN_GHOST = `${BASE} bg-transparent text-ink hover:bg-ink-100 focus-visible:shadow-[0_0_0_2px_#0485F7]`;

// Destructive action (Delete): the single SmartStay error red (decision D3).
export const BTN_DANGER = `${BASE} bg-field-error text-white hover:bg-[#E52E32] focus-visible:shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_#FF383C]`;

// Size modifiers, appended to a variant: `${BTN_PRIMARY} ${BTN_SM}`.
// sm = 32px / 14px text (tables, toolbars); icon = square icon-only button.
export const BTN_SM = "!h-[32px] !min-w-[32px] !px-[12px] !text-b3 !gap-[6px]";
export const BTN_ICON = "!w-[40px] !min-w-[40px] !px-0";

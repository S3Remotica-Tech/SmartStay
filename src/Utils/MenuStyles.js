// Figma DropdownItem (Mobile UI component 16:6270): type initial / danger ×
// default / hover / focus / selected / disabled. For 3-dot action menus and
// custom dropdown lists. Menu panel matches the Figma select menu.

export const MENU_PANEL_CLASS =
  "flex min-w-[160px] flex-col gap-[2px] rounded-medium bg-white p-[4px] font-gilroy shadow-[0px_14px_28px_rgba(0,0,0,0.08),0px_-6px_12px_rgba(0,0,0,0.03),0px_2px_8px_rgba(0,0,0,0.06)]";

export const menuItemClass = ({ selected = false, danger = false } = {}) =>
  [
    "flex min-h-[36px] w-full items-center gap-[10px] rounded-[10px] px-[12px] py-[6px] text-left font-gilroy text-b3 font-medium transition-colors focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
    danger
      ? "text-field-error hover:bg-[#FFF1F1] focus-visible:bg-[#FFF1F1]"
      : selected
        ? "bg-primary-50 text-primary-500"
        : "text-ink hover:bg-ink-100 focus-visible:bg-ink-100",
  ].join(" ");

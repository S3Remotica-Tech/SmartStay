import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import DsRoot from "./DsRoot";
import DsIcon from "./DsIcon";

const MENU_WIDTH = 220;

/**
 * "⋯" menu (Figma Icon button/Ghost 27:247 + menu). Renders in a portal so
 * the table's horizontal scroll does not clip it. `groups` is an array of
 * item arrays; a divider is drawn before the last group. Keyboard: ↑/↓,
 * Home/End move, Enter activates, Escape closes back to the trigger.
 */
function DsActionMenu({ groups, onSelect, label }) {
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const close = (focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  useLayoutEffect(() => {
    if (!open || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const menuHeight = menuRef.current?.offsetHeight || 0;
    const fitsBelow = rect.bottom + 4 + menuHeight <= window.innerHeight - 8;
    setPosition({
      top: fitsBelow ? rect.bottom + 4 : Math.max(8, rect.top - 4 - menuHeight),
      left: Math.max(8, Math.min(rect.right - MENU_WIDTH, window.innerWidth - MENU_WIDTH - 8)),
    });
    menuRef.current?.querySelector('[role="menuitem"]')?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (
        !menuRef.current?.contains(event.target) &&
        !triggerRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    const onViewportChange = () => setOpen(false);
    document.addEventListener("mousedown", onPointer);
    window.addEventListener("resize", onViewportChange);
    window.addEventListener("scroll", onViewportChange, true);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      window.removeEventListener("resize", onViewportChange);
      window.removeEventListener("scroll", onViewportChange, true);
    };
  }, [open]);

  const onMenuKeyDown = (event) => {
    const items = [...(menuRef.current?.querySelectorAll('[role="menuitem"]') || [])];
    const index = items.indexOf(document.activeElement);
    const moves = {
      ArrowDown: (index + 1) % items.length,
      ArrowUp: (index - 1 + items.length) % items.length,
      Home: 0,
      End: items.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      items[moves[event.key]]?.focus();
    } else if (event.key === "Escape" || event.key === "Tab") {
      event.preventDefault();
      close();
    }
  };

  if (groups.length === 0) return null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={label}
        title={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => (open ? close(false) : setOpen(true))}
        className="flex size-[32px] shrink-0 items-center justify-center rounded-[var(--ds-radius-sm)] text-[color:var(--ds-text-secondary)] hover:bg-[var(--ds-bg-surface-hover)]"
      >
        <DsIcon src={EllipsisHorizontalIcon} size={16} />
      </button>
      {open &&
        createPortal(
          <DsRoot>
            <div
              ref={menuRef}
              role="menu"
              aria-label={label}
              onKeyDown={onMenuKeyDown}
              style={{ top: position.top, left: position.left, width: MENU_WIDTH }}
              className="fixed z-[1070] flex flex-col rounded-[var(--ds-radius-md)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-[4px] shadow-[var(--ds-shadow-overlay)]"
            >
              {groups.map((group, groupIndex) => (
                <div
                  key={group.map((item) => item.key).join("|")}
                  role="group"
                  className={`flex flex-col gap-[2px] ${
                    groupIndex > 0 && groupIndex === groups.length - 1
                      ? "mt-[4px] border-t-[1px] border-solid border-[color:var(--ds-border-default)] pt-[4px]"
                      : ""
                  }`}
                >
                  {group.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      role="menuitem"
                      onClick={() => {
                        close(false);
                        onSelect(item.key);
                      }}
                      className={`flex min-h-[36px] w-full items-center gap-[10px] rounded-[var(--ds-radius-sm)] px-[10px] text-left text-[14px] leading-[20px] ${
                        item.danger
                          ? "text-[color:var(--ds-text-danger)] hover:bg-[var(--ds-danger-50)] focus-visible:bg-[var(--ds-danger-50)]"
                          : "text-[color:var(--ds-text-default)] hover:bg-[var(--ds-bg-surface-hover)] focus-visible:bg-[var(--ds-bg-surface-hover)]"
                      }`}
                    >
                      {item.icon && <DsIcon src={item.icon} size={16} />}
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </DsRoot>,
          document.body,
        )}
    </>
  );
}

DsActionMenu.propTypes = {
  groups: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        icon: PropTypes.elementType,
        danger: PropTypes.bool,
      }),
    ),
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default DsActionMenu;

import React, { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";
import DsIcon from "./DsIcon";

// Table filter (Figma "Saved view trigger" 187:14636 states, adapted to a
// filter): default · hover · open · active (value chosen: brand border +
// tint, value or "+N", clear ×) · disabled. The menu lists the options with
// a check on the selected ones and a "Clear filter" action at the bottom.
// Keyboard: ↓/↑/Enter/Space open; ↑/↓/Home/End move; Enter/Space pick;
// Escape closes and returns focus to the trigger.

const SHELL =
  "relative inline-flex h-[36px] min-w-[160px] max-w-[240px] items-center rounded-[var(--ds-radius-sm)] border-[1px] border-solid transition-colors duration-150";

function shellTone({ active, open, disabled }) {
  if (disabled) return "cursor-not-allowed opacity-50 border-[color:var(--ds-border-strong)] bg-[var(--ds-bg-surface)]";
  if (active) {
    return "border-[color:var(--ds-bg-primary)] bg-[var(--ds-bg-primary-subtle)] text-[color:var(--ds-text-primary)]";
  }
  if (open) return "border-[color:var(--ds-border-strong)] bg-[var(--ds-bg-surface-muted)]";
  return "border-[color:var(--ds-border-strong)] bg-[var(--ds-bg-surface)] text-[color:var(--ds-text-default)] hover:bg-[var(--ds-bg-surface-hover)]";
}

function DsFilterDropdown({
  label,
  icon,
  options,
  value,
  onChange,
  multiple = false,
  disabled = false,
}) {
  const listId = useId();
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = multiple ? value || [] : value ? [value] : [];
  const isActive = selected.length > 0;
  const firstLabel = options.find((option) => option.value === selected[0])?.label;

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [open]);

  useEffect(() => {
    if (open) listRef.current?.focus();
  }, [open]);

  const openMenu = () => {
    if (disabled || options.length === 0) return;
    const firstSelected = options.findIndex((option) => selected.includes(option.value));
    setActiveIndex(Math.max(0, firstSelected));
    setOpen(true);
  };

  const closeMenu = (focusTrigger = true) => {
    setOpen(false);
    if (focusTrigger) triggerRef.current?.focus();
  };

  const pick = (optionValue) => {
    if (multiple) {
      const next = selected.includes(optionValue)
        ? selected.filter((item) => item !== optionValue)
        : [...selected, optionValue];
      onChange(next);
      return;
    }
    onChange(optionValue === value ? "" : optionValue);
    closeMenu();
  };

  const clear = () => {
    onChange(multiple ? [] : "");
    if (open) closeMenu();
    else triggerRef.current?.focus();
  };

  const onTriggerKeyDown = (event) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(event.key)) {
      event.preventDefault();
      openMenu();
    }
  };

  const onListKeyDown = (event) => {
    const last = options.length - 1;
    const moves = {
      ArrowDown: Math.min(last, activeIndex + 1),
      ArrowUp: Math.max(0, activeIndex - 1),
      Home: 0,
      End: last,
    };
    if (event.key in moves) {
      event.preventDefault();
      setActiveIndex(moves[event.key]);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (options[activeIndex]) pick(options[activeIndex].value);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  };

  // Close when focus leaves the whole control (Tab out of the menu).
  const onBlur = (event) => {
    if (open && rootRef.current && !rootRef.current.contains(event.relatedTarget)) setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative" onBlur={onBlur}>
      <div className={`${SHELL} ${shellTone({ active: isActive, open, disabled })}`}>
        <button
          ref={triggerRef}
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-label={isActive ? `${label}: ${selected.length} selected` : label}
          onClick={() => (open ? closeMenu() : openMenu())}
          onKeyDown={onTriggerKeyDown}
          className={`flex h-full min-w-0 flex-1 items-center gap-[6px] rounded-[var(--ds-radius-sm)] pl-[10px] text-[14px] font-medium leading-[20px] disabled:cursor-not-allowed ${
            isActive ? "pr-[4px]" : "pr-[8px]"
          }`}
        >
          {icon && <DsIcon src={icon} size={16} />}
          <span className="min-w-0 flex-1 truncate text-left">{isActive ? firstLabel || label : label}</span>
          {isActive && selected.length > 1 && (
            <span className="shrink-0 rounded-[var(--ds-radius-full)] bg-[var(--ds-bg-primary)] px-[6px] text-[12px] leading-[16px] text-[color:var(--ds-text-on-primary)]">
              +{selected.length - 1}
            </span>
          )}
          {!isActive && <DsIcon src={open ? ChevronUpIcon : ChevronDownIcon} size={16} />}
        </button>
        {isActive && (
          <button
            type="button"
            onClick={clear}
            disabled={disabled}
            aria-label={`Clear ${label} filter`}
            title="Clear filter"
            className="mr-[4px] flex size-[24px] shrink-0 items-center justify-center rounded-[var(--ds-radius-sm)] hover:bg-[var(--ds-bg-surface)]"
          >
            <DsIcon src={XMarkIcon} size={16} />
          </button>
        )}
      </div>

      {open && (
        <div className="absolute left-0 top-[calc(100%+4px)] z-50 flex w-max min-w-[220px] max-w-[320px] flex-col rounded-[var(--ds-radius-md)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] shadow-[var(--ds-shadow-overlay)]">
          <ul
            ref={listRef}
            id={listId}
            role="listbox"
            tabIndex={-1}
            aria-label={label}
            aria-multiselectable={multiple || undefined}
            aria-activedescendant={`${listId}-${activeIndex}`}
            onKeyDown={onListKeyDown}
            className="m-0 flex max-h-[280px] list-none flex-col gap-[2px] overflow-y-auto p-[4px] outline-none"
          >
            {options.map((option, index) => {
              const isSelected = selected.includes(option.value);
              const isHighlighted = index === activeIndex;
              return (
                <li
                  key={option.value}
                  id={`${listId}-${index}`}
                  role="option"
                  aria-selected={isSelected}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => pick(option.value)}
                  className={`flex min-h-[36px] cursor-pointer items-center gap-[8px] rounded-[var(--ds-radius-sm)] px-[10px] text-[14px] leading-[20px] ${
                    isHighlighted ? "bg-[var(--ds-bg-surface-hover)]" : ""
                  } ${
                    isSelected
                      ? "font-medium text-[color:var(--ds-text-primary)]"
                      : "text-[color:var(--ds-text-default)]"
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate">{option.label}</span>
                  {isSelected && <DsIcon src={CheckIcon} size={16} />}
                </li>
              );
            })}
          </ul>
          <div className="border-t-[1px] border-solid border-[color:var(--ds-border-default)] p-[4px]">
            <button
              type="button"
              onClick={clear}
              disabled={!isActive}
              className="flex min-h-[36px] w-full items-center rounded-[var(--ds-radius-sm)] px-[10px] text-left text-[14px] font-medium leading-[20px] text-[color:var(--ds-text-link)] hover:bg-[var(--ds-bg-surface-hover)] disabled:cursor-not-allowed disabled:text-[color:var(--ds-text-placeholder)] disabled:hover:bg-transparent"
            >
              Clear filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

DsFilterDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
  options: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string.isRequired, label: PropTypes.string.isRequired }),
  ).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
  onChange: PropTypes.func.isRequired,
  multiple: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default DsFilterDropdown;

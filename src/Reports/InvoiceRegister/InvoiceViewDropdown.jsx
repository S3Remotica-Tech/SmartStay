import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { ArrowDown2 } from "iconsax-react";

export const INVOICE_VIEW_MODES = {
  LIST: "list",
  CONSOLIDATED: "consolidated",
};

const viewOptions = [
  { value: INVOICE_VIEW_MODES.LIST, label: "List View" },
  { value: INVOICE_VIEW_MODES.CONSOLIDATED, label: "Consolidated View" },
];

function InvoiceViewDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected =
    viewOptions.find((option) => option.value === value) || viewOptions[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option) => {
    setIsOpen(false);
    if (option.value !== value) {
      onChange(option.value);
    }
  };

  return (
    <div ref={dropdownRef} className="relative min-w-[190px] font-gilroy">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="w-full h-[42px] flex items-center justify-between gap-[10px] px-[12px] bg-white border-[1px] border-[#F2F2F2] rounded-[5px] text-[14px] font-medium text-[#1D293D]"
      >
        <span className="whitespace-nowrap">{selected.label}</span>
        <ArrowDown2
          size="16"
          color="#1D293D"
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 z-40 mt-1 w-full bg-white rounded-2xl shadow-lg overflow-hidden border-[1px] border-[#E5E7EB] p-0 m-0 list-none"
        >
          {viewOptions.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              onClick={() => handleSelect(option)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(option);
              }}
              tabIndex={0}
              className={`px-[16px] py-2 text-sm cursor-pointer hover:bg-[#F1F5FF] ${
                option.value === value
                  ? "text-[#1E45E1] font-semibold"
                  : "text-[#222]"
              } ${index < viewOptions.length - 1 ? "border-b border-[#E5E7EB]" : ""}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

InvoiceViewDropdown.propTypes = {
  value: PropTypes.oneOf(Object.values(INVOICE_VIEW_MODES)).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InvoiceViewDropdown;

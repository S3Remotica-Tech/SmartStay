import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Lock1, SearchNormal1, Setting4 } from "iconsax-react";
import CustomTooltip from "../../Utils/CustomTooltip";
import {
  CONSOLIDATED_COLUMNS,
  DEFAULT_VISIBLE_COLUMN_KEYS,
  normaliseVisibleColumnKeys,
} from "./consolidatedColumns";

// Show/hide columns for the Consolidated View table only.
// Panel layout follows the unfinished column checklist in InvoiceRegister.jsx
// (search, checkbox list, Reset / Apply). Changes apply on "Apply".
function ConsolidatedColumnCustomizer({ visibleKeys, onApply }) {
  const [isOpen, setIsOpen] = useState(false);
  const [draftKeys, setDraftKeys] = useState(visibleKeys);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
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

  const handleToggleOpen = () => {
    if (!isOpen) {
      setDraftKeys(visibleKeys);
      setSearch("");
    }
    setIsOpen((prev) => !prev);
  };

  const handleCheck = (key) => {
    setDraftKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const handleReset = () => {
    setDraftKeys(DEFAULT_VISIBLE_COLUMN_KEYS);
  };

  const handleApply = () => {
    onApply(normaliseVisibleColumnKeys(draftKeys));
    setIsOpen(false);
  };

  const query = search.trim().toLowerCase();
  const listedColumns = CONSOLIDATED_COLUMNS.filter((column) =>
    column.label.toLowerCase().includes(query),
  );

  const hiddenCount = DEFAULT_VISIBLE_COLUMN_KEYS.length - visibleKeys.length;

  return (
    <div ref={wrapperRef} className="relative">
      <CustomTooltip text="Customize columns" direction="top-full" usePortal={true}>
        <button
          type="button"
          onClick={handleToggleOpen}
          aria-label="Customize columns"
          aria-expanded={isOpen}
          className={`relative w-[42px] h-[42px] flex items-center justify-center rounded-[5px] bg-white border-[1px] ${
            isOpen ? "border-[#1E45E1]" : "border-[#F2F2F2]"
          }`}
        >
          <Setting4 size="22" color={isOpen ? "#1E45E1" : "#4B4B4B"} />
          {hiddenCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1E45E1] text-white text-[10px] font-semibold flex items-center justify-center">
              {hiddenCount}
            </span>
          )}
        </button>
      </CustomTooltip>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Customize columns"
          className="absolute left-0 top-full mt-2 z-50 w-[280px] max-sm:fixed max-sm:top-auto max-sm:left-[16px] max-sm:right-[16px] max-sm:w-auto bg-white border-[1px] border-[#E5E7EB] rounded-xl shadow-xl font-gilroy"
        >
          <div className="p-[12px] border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2 px-[12px] py-2 border-[1px] border-[#E5E7EB] rounded-lg">
              <SearchNormal1 size={16} color="#98A2B3" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                aria-label="Search columns"
                className="w-full text-sm outline-none placeholder:text-[#98A2B3]"
              />
            </div>
          </div>

          <div className="max-h-[260px] overflow-y-auto px-[12px] py-2 space-y-2 show-scrolls">
            {listedColumns.length === 0 && (
              <p className="text-sm text-[#6B7280] text-center py-2 mb-0">
                No matching columns
              </p>
            )}
            {listedColumns.map((column) => (
              <label
                key={column.key}
                className={`flex items-center gap-[12px] text-sm mb-0 ${
                  column.locked ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  checked={column.locked || draftKeys.includes(column.key)}
                  disabled={column.locked}
                  onChange={() => handleCheck(column.key)}
                  className="w-4 h-4 accent-[#1E45E1] rounded"
                />
                <span
                  className={`flex-1 ${column.locked ? "text-[#6B7280]" : "text-[#101828]"}`}
                >
                  {column.label}
                </span>
                {column.locked && (
                  <span title="Always shown" className="inline-flex">
                    <Lock1 size="14" color="#98A2B3" aria-hidden="true" />
                  </span>
                )}
              </label>
            ))}
            <div className="flex items-center gap-[12px] text-sm text-[#6B7280] cursor-not-allowed">
              <input
                type="checkbox"
                checked
                disabled
                readOnly
                aria-label="Details"
                className="w-4 h-4 accent-[#1E45E1] rounded"
              />
              <span className="flex-1">Details</span>
              <span title="Always shown" className="inline-flex">
                <Lock1 size="14" color="#98A2B3" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="p-[12px] border-t border-[#E5E7EB] flex gap-2">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 py-2 text-sm border-[1px] border-[#D1D5DC] rounded-lg text-[#344054] bg-white"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ConsolidatedColumnCustomizer.propTypes = {
  visibleKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  onApply: PropTypes.func.isRequired,
};

export default ConsolidatedColumnCustomizer;


import React, { useState } from "react";
import { CloseCircle } from "iconsax-react";

const filterOptions = {
    bedStatus: [
        "All",
        "Available",
        "Occupied",
        "Reserved",
        "Overdue",
        "Notice Period",
        "Maintenance",
        "Blocked",
        "Move-out Scheduled",
    ],
    roomType: [
        "All",
        "2 Sharing",
        "4 Sharing",
        "6 Sharing",
        "8 Sharing",
        "10 Sharing",
    ],
    tenantStatus: [
        "All",
        "Active",
        "Notice Period",
        "Overdue",
        "Reserved",
        "Settlement generated",
    ],
    paymentStatus: [
        "All",
        "Paid",
        "Partially Paid",
        "Overdue",
    ],
};

const initialFilters = {
    bedStatus: ["All"],
    roomType: ["All"],
    tenantStatus: ["All"],
    paymentStatus: ["All"],
};

const FilterPanel = ({ isOpen, onClose }) => {
    const [filters, setFilters] = useState(initialFilters);

    const handleFilterChange = (key, option) => {
        setFilters((prev) => {
            const current = prev[key];

            if (option === "All") {
                return { ...prev, [key]: ["All"] };
            }

            const updated = current.includes(option)
                ? current.filter((item) => item !== option && item !== "All")
                : [...current.filter((item) => item !== "All"), option];

            return {
                ...prev,
                [key]: updated.length ? updated : ["All"],
            };
        });
    };

    const handleClearAll = () => {
        setFilters({
            bedStatus: ["All"],
            roomType: ["All"],
            tenantStatus: ["All"],
            paymentStatus: ["All"],
        });
    };

    const handleApply = () => {
        onApply?.(filters);
    };

    const renderFilterSection = (title, filterKey) => (
        <div className="mb-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                {title}
            </p>

            <div className="flex flex-wrap gap-2">
                {filterOptions[filterKey].map((option) => {
                    const isSelected = filters[filterKey].includes(option);

                    return (
                        <button
                            key={option}
                            type="button"
                            onClick={() => handleFilterChange(filterKey, option)}
                            className={`rounded-full border px-3 py-1.5 text-[10px] font-medium transition-all duration-150 ${isSelected
                                ? "border-[#1E45E1] bg-[#F0F4FF] text-[#1E45E1]"
                                : "border-gray-200 bg-white text-gray-700 hover:border-[#1E45E1]"
                                }`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-[9999]">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col">
                <div className=" px-4 py-3 shrink-0 border-b flex items-center justify-between gap-2 mb-2">
                    <h3 className="text-sm font-semibold text-gray-900">
                        Filters
                    </h3>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={handleClearAll}
                            className="text-[10px] font-medium text-gray-500 hover:text-[#1E45E1]"
                        >
                            Clear All
                        </button>

                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center justify-center text-red-500 hover:text-red-600"
                        >
                            <CloseCircle size={18} color="currentColor" />
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3">
                    {renderFilterSection("Bed Status", "bedStatus")}
                    {renderFilterSection("Room Type", "roomType")}
                    {renderFilterSection("Tenant Status", "tenantStatus")}
                    {renderFilterSection("Payment Status", "paymentStatus")}
                </div>


                <div className="flex shrink-0 justify-end border-t border-gray-100 px-5 py-3">
                    <button
                        type="button"
                        onClick={handleApply}
                        className="h-[36px] w-[133px] rounded-xl bg-[#1E45E1] text-xs font-medium text-white transition hover:bg-blue-700 active:scale-95"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>

        </div >
    );
};

export default FilterPanel;

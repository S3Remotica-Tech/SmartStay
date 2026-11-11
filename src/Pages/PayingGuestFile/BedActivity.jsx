import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Message2, Calendar, ArrowDown2 } from "iconsax-react"

function BedActivity({ }) {



    const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

    const [selectedPeriod, setSelectedPeriod] = useState({
        type: "",
        name: "All",
    });

    const periodOptions = [
        { id: "", label: "All" },
        { id: "THIS_MONTH", label: "This Month" },
        { id: "LAST_MONTH", label: "Last Month" },
        { id: "LAST_3_MONTHS", label: "Last 3 Months" },
        { id: "LAST_6_MONTHS", label: "Last 6 Months" },

    ];

    const periodDropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                periodDropdownRef.current &&
                !periodDropdownRef.current.contains(event.target)
            ) {
                setShowPeriodDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const StepItem = ({ children, isLast }) => {
        return (
            <div className="flex mb-3">
                <div className="flex flex-col items-center mr-3">
                    <div className="w-10 h-10 rounded-full bg-[#EFF4FB] flex items-center justify-center">
                        <Message2
                            size="16"
                            color="#73839B"
                        />
                    </div>

                    {!isLast && (
                        <div className="w-[2px] flex-1 bg-[#D1D5DB] mt-1" />
                    )}
                </div>

                <div className="pb-3 w-full">
                    {children}
                </div>
            </div>
        );
    };

    StepItem.propTypes = {
        children: PropTypes.node.isRequired,
        isLast: PropTypes.bool,
    };

    StepItem.defaultProps = {
        isLast: false,
    };

    const recentActivities = [
        {
            update: "Bed Status Changed",
            description:
                "Reserved → Occupied. Karthik Raj checked in and Bed B-204 was marked as occupied.",
            updatedAt: "03 Sep 2026",
            updatedTime: "01:15 PM",
            updatedBy: "Priya",
            comments: [
                {
                    comment:
                        "₹8,000 received through UPI against September rent invoice INV-10245",
                },
            ],
        },
        {
            update: "New Tenant Checked In",
            description: "Karthik Raj checked in to Room G2 · Bed B-204.",
            updatedAt: "03 Sep 2026",
            updatedTime: "01:15 PM",
            updatedBy: "Priya",
            comments: [],
        },
        {
            update: "Bed Booked",
            description: "Bed B-204 was booked for Karthik Raj.",
            updatedAt: "01 Sep 2026",
            updatedTime: "03:40 PM",
            updatedBy: "Priya",
            comments: [
                {
                    comment:
                        "Tenant requested change from B-204 → B-301.",
                },
            ],
        },
        {
            update: "Tenant Vacated",
            description: "Rahul Sharma checked out from Bed B-204.",
            updatedAt: "31 Aug 2026",
            updatedTime: "11:20 AM",
            updatedBy: "Admin",
            comments: [],
        },
        {
            update: "Bed Reassigned from Booking",
            description:
                "Chandren bed was changed from Bed B-204 to Bed B-205.",
            updatedAt: "27 Aug 2026",
            updatedTime: "11:25 AM",
            updatedBy: "Priya",
            comments: [],
        },
        {
            update: "Bed Booked",
            description: "Bed B-204 was booked for Chandren.",
            updatedAt: "21 Aug 2026",
            updatedTime: "03:40 PM",
            updatedBy: "Priya",
            comments: [],
        },
        {
            update: "Notice Period Started",
            description: "Rahul Sharma submitted notice period.",
            updatedAt: "18 Aug 2026",
            updatedTime: "06:45 PM",
            updatedBy: "Admin",
            comments: [],
        },
        {
            update: "Rent Updated",
            description: "Monthly rent set to ₹8,000.",
            updatedAt: "16 Jun 2026",
            updatedTime: "06:45 PM",
            updatedBy: "Admin",
            comments: [],
        },
        {
            update: "New Tenant Checked In",
            description: "Rahul Sharma checked in to B-204.",
            updatedAt: "16 Aug 2025",
            updatedTime: "10:24 AM",
            updatedBy: "Admin",
            comments: [],
        },
        {
            update: "Bed Booked",
            description: "Bed B-204 was booked for Rahul Sharma.",
            updatedAt: "01 Aug 2026",
            updatedTime: "03:40 PM",
            updatedBy: "Priya",
            comments: [],
        },
        {
            update: "Tenant Vacated",
            description: "Dinesh checked out from Bed B-204.",
            updatedAt: "11 July 2026",
            updatedTime: "11:36 AM",
            updatedBy: "Admin",
            comments: [],
        },
    ];

    return (

        <div className="w-full max-w-md bg-white  flex flex-col ">
            <div className=" px-4 py-1 shrink-0  flex items-center justify-between gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">
                    Activity History
                </h3>

                <div className="flex items-center gap-4">


                    <div className="relative flex justify-end" >
                        <button
                            onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                            className="flex items-center gap-2 px-3 py-2 border border-[#E5E7EB] rounded-lg text-[12px] text-[#374151]"
                        >
                            <Calendar size="16" />
                            {selectedPeriod?.label || "All"}
                            <ArrowDown2 size="16" />
                        </button>

                        {showPeriodDropdown && (
                            <div ref={periodDropdownRef} className="absolute right-0 top-10 mt-2 w-48 bg-white border-1 border-[#E5E7EB] rounded-lg shadow-lg z-20">
                                {periodOptions.map((period) => (
                                    <button
                                        key={period.id}
                                        onClick={() => {
                                            setSelectedPeriod(period);
                                            setShowPeriodDropdown(false);
                                            handleSelected(period);
                                        }}
                                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedPeriod?.id === period.id
                                            ? "bg-blue-50 text-blue-600 font-medium"
                                            : ""
                                            }`}
                                    >
                                        {period.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto px-3 show-scrolls">


                {recentActivities.map((item, index) => (
                    <StepItem
                        key={index}
                        isLast={index === recentActivities.length - 1}
                    >
                        <div className="text-[14px]   font-semibold text-[#222222]">
                            {item.update}
                        </div>

                        <div className="text-sm text-[#1E293B] mt-1">
                            {item.description}
                        </div>

                        <div className="text-[11px] md:text-[10px] lg:text-xs text-[#64748B] mt-1">
                            {item.updatedAt} · {item.updatedTime}
                        </div>


                    </StepItem>
                ))}
            </div>
        </div>

    );
}
BedActivity.propTypes = {
    handleClose: PropTypes.func.isRequired,
}
export default BedActivity;
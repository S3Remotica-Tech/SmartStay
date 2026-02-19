import React, { useState, useRef, useEffect } from "react";
import { Calendar, ArrowDown2, MessageQuestion, Warning2, ArrowRight, Messages2 } from "iconsax-react";

function DashRequestAndComplaints() {
    // date dropdown states
    const [showRequestFilter, setShowRequestFilter] = useState(false);
    // const [showComplaintFilter, setShowComplaintFilter] = useState(false);
    const [requestDate, setRequestDate] = useState("This Week");
    // const [complaintDate, setComplaintDate] = useState("This Week");
    const dropdownRef = useRef(null);
    const dateOptions = [
        "Today",
        "This Week",
        "This Month",
        "Last Month",
        "Last 3 Months",
    ];

    const requestStats = [
        { count: 2, label: "Pending", bg: "bg-[#FFF7ED]", text: "text-[#CA3500]" },
        { count: 1, label: "In Progress", bg: "bg-[#EFF6FF]", text: "text-[#1447E6]" },
        { count: 1, label: "Resolved", bg: "bg-[#F0FDF4]", text: "text-[#008236]" },
    ];

    const requestList = [
        {
            name: "Rajesh Kumar",
            room: "A-204",
            title: "AC not working",
            type: "Maintenance",
            status: "Pending",
            time: "2 hours ago",
        },
        {
            name: "Priya Sharma",
            room: "B-101",
            title: "WiFi password reset",
            type: "Amenity",
            status: "In Progress",
            time: "5 hours ago",
        },
    ];

    const complaintStats = [
        { count: 2, label: "Pending", bg: "bg-[#FFF7ED]", text: "text-[#CA3500]" },
        { count: 1, label: "In Progress", bg: "bg-[#EFF6FF]", text: "text-[#1447E6]" },
        { count: 1, label: "Resolved", bg: "bg-[#F0FDF4]", text: "text-[#008236]" }
    ];

    const complaintList = [
        {
            name: "Karthik Kumar",
            room: "A-204",
            title: "Water leakage near washbasin",
            type: "Maintenance",
            status: "Open",
            time: "2 hours ago",
        },
        {
            name: "Divyanathan",
            room: "B-101",
            title: "WiFi password reset",
            type: "Amenity",
            status: "In Progress",
            time: "5 hours ago",
        },
    ];

    const statusStyle = {
        Pending: "bg-orange-50 text-orange-500",
        "In Progress": "bg-blue-50 text-blue-500",
        Resolved: "bg-green-50 text-green-600",
        Open: "bg-purple-50 text-purple-600",
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="space-y-2 my-4">

            <div className="flex justify-between items-center mb-4">


                <h2 className="text-[18px] font-semibold text-[#0F172A] font-[Gilroy] mb-4">
                    Tenant Requests & Complaints
                </h2>

                <div className="relative">
                    <button
                        onClick={() => setShowRequestFilter(!showRequestFilter)}
                        className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm font-[Gilroy] bg-white"
                    >
                        <Calendar size="16" color="#1E45E1" />
                        {requestDate}
                        <ArrowDown2 size="14" />
                    </button>

                    {showRequestFilter && (
                        <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow">
                            {dateOptions.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => {
                                        setRequestDate(item);
                                        setShowRequestFilter(false);
                                    }}
                                    className="
            w-full text-left px-3 py-2 text-sm font-[Gilroy]
            hover:bg-gray-100
          "
                                >
                                    {item}
                                </button>
                            ))}

                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-[Gilroy]">

                <div className="border rounded-xl p-4 bg-white">

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#F5F9FF] px-2 py-2 rounded-lg">
                                <MessageQuestion size="18" className="text-[#1E45E1]" />
                            </div>

                            <label className="font-semibold text-sm font-[Gilroy] text-[#101828]">
                                Tenant Requests (2)
                            </label>
                        </div>



                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {requestStats.map((item, index) => (
                            <div
                                key={index}
                                className={`text-center p-3  rounded-lg ${item.bg}`}
                            >
                                <div>
                                    <label className={`font-semibold  text-xl ${item.text}`}>{item.count}</label>
                                </div>
                                <div>
                                    <label className="text-xs text-[#4A5565] font-semibold">{item.label}</label>
                                </div>
                            </div>
                        ))}
                    </div>


                    <div className="flex-1 overflow-y-auto max-h-64 ">
                        {requestList.map((item, index) => (
                            <div
                                key={index}
                                className="flex  py-3 border-b last:border-none w-full overflow-y-auto max-h-64"
                            >
                                <div className="w-full ">
                                    <div className="flex justify-between w-full ">
                                        <p className="text-base font-semibold text-[#101828]">
                                            {item.name}{" "}
                                            <span className="text-xs text-[#6A7282]  font-semibold ">• {item.room}</span>
                                        </p>

                                        <span
                                            className={`text-xs px-2 rounded  font-semibold${statusStyle[item.status]}`}
                                        >
                                            {item.status}
                                        </span>

                                    </div>


                                    <p className="text-sm text-[#4A5565] font-semibold ">{item.title}</p>
                                    <div className="flex justify-between w-full ">
                                        <p className="text-xs text-[#6A7282] font-semibold ">{item.type}</p>
                                        <p className="text-[10px] text-[#6A7282] font-semibold">{item.time}</p>
                                    </div>

                                </div>


                            </div>
                        ))}

                    </div>


                    <button
                        className="
    mt-3
    w-full
    flex
    items-center
    justify-center
    gap-2
    border
    border-[#D1D5DC]
    rounded-lg
    py-2
    text-sm
    font-semibold
    text-[#364153]
    hover:bg-gray-50
  "
                    >
                        View All Requests
                        <ArrowRight size="16" color="#1E45E1" />
                    </button>

                </div>


                <div className="border rounded-xl p-4 bg-white">

                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <div className="bg-[#FEF2F2] px-2 py-2 rounded-lg">
                                <Messages2 size="18" className="text-[#E7000B]" />
                            </div>

                            <label className="font-semibold text-sm font-[Gilroy] text-[#101828]">
                                Tenant Complaints (5)
                            </label>
                        </div>


                        {/* <div className="relative">
                            <button
                                onClick={() => setShowComplaintFilter(!showComplaintFilter)}
                                className="flex items-center gap-2 border px-3 py-1.5 rounded-lg text-sm font-[Gilroy]"
                            >
                                <Calendar size="16" />
                                {complaintDate}
                                <ArrowDown2 size="14" />
                            </button>

                            {showComplaintFilter && (
                                <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow">
                                    {dateOptions.map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => {
                                                setComplaintDate(item);
                                                setShowComplaintFilter(false);
                                            }}
                                            className="
            w-full text-left px-3 py-2 text-sm font-[Gilroy]
            hover:bg-gray-100
          "
                                        >
                                            {item}
                                        </button>
                                    ))}

                                </div>
                            )}
                        </div> */}
                    </div>


                    <div className="grid grid-cols-3 gap-3 mb-4">
                        {complaintStats.map((item, index) => (
                            <div
                                key={index}
                                className={`text-center p-3  rounded-lg ${item.bg}`}
                            >
                                <div>
                                    <label className={`font-semibold  text-xl ${item.text}`}>{item.count}</label>
                                </div>
                                <div>
                                    <label className="text-xs text-[#4A5565] font-semibold">{item.label}</label>
                                </div>
                            </div>

                        ))}
                    </div>


                    <div className="flex-1 overflow-y-auto max-h-64 ">
                        {complaintList.map((item, index) => (
                            <div
                                key={index}
                                className="flex  py-3 border-b last:border-none w-full "
                            >
                                <div className="w-full ">
                                    <div className="flex justify-between w-full ">
                                        <p className="text-base font-semibold text-[#101828]">
                                            {item.name}{" "}
                                            <span className="text-xs text-[#6A7282]  font-semibold ">• {item.room}</span>
                                        </p>

                                        <span
                                            className={`text-xs px-2 rounded  font-semibold${statusStyle[item.status]}`}
                                        >
                                            {item.status}
                                        </span>

                                    </div>


                                    <p className="text-sm text-[#4A5565] font-semibold ">{item.title}</p>
                                    <div className="flex justify-between w-full ">
                                        <p className="text-xs text-[#6A7282] font-semibold ">{item.type}</p>
                                        <p className="text-[10px] text-[#6A7282] font-semibold">{item.time}</p>
                                    </div>

                                </div>


                            </div>
                        ))}
                    </div>

                    <button
                        className="
    mt-3
    w-full
    flex
    items-center
    justify-center
    gap-2
    border
    border-[#D1D5DC]
    rounded-lg
    py-2
    text-sm
    font-semibold
    text-[#364153]
    hover:bg-gray-50
  "
                    >
                        View All Complaints
                        <ArrowRight size="16" color="#1E45E1" />
                    </button>



                </div>
            </div>
        </div>
    );
}
export default DashRequestAndComplaints
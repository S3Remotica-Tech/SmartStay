import React, { useState, useRef, useEffect } from "react";
import { Calendar, ArrowDown2, MessageQuestion, ArrowRight, Messages2 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";


function DashRequestAndComplaints() {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [showRequestFilter, setShowRequestFilter] = useState(false);
    // const [showComplaintFilter, setShowComplaintFilter] = useState(false);
    const [requestDate, setRequestDate] = useState("This Month");
    // const [complaintDate, setComplaintDate] = useState("This Week");
    const dropdownRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const RequestComplaints = state.PgList?.dashboardList

    const requestStats = [
        { count: `${RequestComplaints?.tenantRequests?.pending}`, label: "Pending", bg: "bg-[#FFF7ED]", text: "text-[#CA3500]" },
        { count: `N/A`, label: "In Progress", bg: "bg-[#EFF6FF]", text: "text-[#1447E6]" },
        { count: `${RequestComplaints?.tenantRequests?.resolved}`, label: "Resolved", bg: "bg-[#F0FDF4]", text: "text-[#008236]" },
    ];

    // const requestList = [
    //     {
    //         name: "Rajesh Kumar",
    //         room: "A-204",
    //         title: "AC not working",
    //         type: "Maintenance",
    //         status: "Pending",
    //         time: "2 hours ago",
    //     },
    //     {
    //         name: "Priya Sharma",
    //         room: "B-101",
    //         title: "WiFi password reset",
    //         type: "Amenity",
    //         status: "In Progress",
    //         time: "5 hours ago",
    //     },
    // ];

    const requestList =
        RequestComplaints?.request?.map((item) => ({
            id: item.requestId,
            name: item.customerName || "-",
            room: "N/A",
            type: item.type,
            status: item.status,
            time: item.date
        })) || [];




    const complaintStats = [
        { count: `${RequestComplaints?.tenantComplaints?.pending}`, label: "Pending", bg: "bg-[#FFF7ED]", text: "text-[#CA3500]" },
        { count: `N/A`, label: "In Progress", bg: "bg-[#EFF6FF]", text: "text-[#1447E6]" },
        { count: `${RequestComplaints?.tenantComplaints?.resolved}`, label: "Resolved", bg: "bg-[#F0FDF4]", text: "text-[#008236]" }
    ];

    const complaintList =
        RequestComplaints?.complaints?.map((item) => ({
            id: item.complaintId,
            name: item.customerName || "-",
            room: "N/A",
            title: "Complaints description needed",
            type: item.type,
            status: item.status,
            time: item.date
        })) || [];

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


 const dateOptions =
    state.PgList?.dashboardList?.filters?.map((item) => ({
      label: item,
      value: item
    })) || [];

useEffect(() => {
    if (state.login.selectedHostel_Id) {

      dispatch({
        type: "GET_DASHBOARD_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
          complaintRequestFilter: requestDate
          }
        }
      });

      setLoading(true);
    }
  }, [requestDate]);

useEffect(() => {
    if (state.PgList?.dashboardList) {
      setLoading(false)
      
    }
  }, [state.PgList?.dashboardList]);


 useState(() => {
    if (state.PgList.getDashboardSuccessStatus === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_DASHBOARD_REDUCER" });
      }, 200);
    }
  }, [state.PgList.getDashboardSuccessStatus]);






    return (
        <div className="space-y-2 my-4">

            <div className="flex justify-between items-center mb-4">

{loading && (
        <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
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
                                    key={item.value}
                                    onClick={() => {
                                        setRequestDate(item.value);
                                        setShowRequestFilter(false);
                                    }}
                                    className="
            w-full text-left px-3 py-2 text-sm font-[Gilroy]
            hover:bg-gray-100
          "
                                >
                                    {item.label}
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
                                Tenant Requests ({`${RequestComplaints?.tenantRequests?.total}`})
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
                                Tenant Complaints ({`${RequestComplaints?.tenantComplaints?.total}`})
                            </label>
                        </div>



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
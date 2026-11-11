/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { AddCircle, LogoutCurve } from "iconsax-react";
// import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import { useHasPermission } from "../../../Utils/Permission";
import { Edit2, Add } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BedActivity from '../BedActivity';
import FormComingSoon from '../../../Utils/FormComingSoon';
import BedOverview from "../BedOverview";

function BookedBed({
    // show,
    handleCloseBed,
    handleShowCheck_In,
    currentItem,
    handleShowInActiveForm,
    showEditBed,
}) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const isDev = import.meta.env.MODE === "development";
    const [expandedReserved, setExpandedReserved] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");

    const toggleReserved = (id) => {
        setExpandedReserved((prev) => prev === id ? null : id);
    };

    const {
        canWriteModule: canWriteCustomers,
        // canReadModule: canReadPayingGuests,
        // canUpdateModule: canUpdatePayingGuests,
        // canDeleteModule: canDeletePayingGuests,
    } = useHasPermission("Customers");
    const bedDetails = state?.PgList?.OccupiedCustomer;
    const {
        // canWriteModule: canWriteBooking, 
        canUpdateModule: canUpdateBooking } = useHasPermission("Booking");

    const {
        canUpdateModule: canUpdatePayingGuests,
        // canDeleteModule: canDeletePayingGuests,
    } = useHasPermission("Paying Guests");

    const handleEditBed = () => {
        showEditBed(true);
    };

    // const [showDots, setShowDots] = useState("");
    // const [activeRoomId, setActiveRoomId] = useState(null);
    const popupRef = useRef(null);

    useEffect(() => {
        if (state.Booking.StatusCodeInactiveCode === 200) {
            setTimeout(() => {
                dispatch({ type: "CLEAR_BOOKING_InActive" });
            }, 1000);
        }
    }, [state.Booking.StatusCodeInactiveCode]);

    // const handleShowDots = (roomId) => {
    //     setShowDots(!showDots);
    //     setActiveRoomId(activeRoomId === roomId ? null : roomId);
    // };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            // setActiveRoomId(null);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCheckin = (tenant) => {
        handleShowCheck_In(true, tenant);
    };

    // const [customer_details, setCustomerDetails] = useState({})

    const handleMakeInActive = (tenant) => {
        handleShowInActiveForm(true, tenant);
    };

    const handleNavigateTenantProfile = (tenantDetails) => {
        dispatch({
            type: "CUSTOMERDETAILS",
            payload: { customerId: tenantDetails?.tenetId },
        });
        navigate(`/tenant/details/${tenantDetails?.tenetId}`, {
            state: {
                customerId: tenantDetails?.tenetId,
                hostelId: state.login?.selectedHostel_Id,
                name: tenantDetails?.tenantFullName,
                isPgWay: true,
            },
        });
        dispatch({ type: "UPDATE_USERSLIST_FALSE" });
    };

    return (

        <div className="fixed inset-0 z-[9999]">
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col">
                <div className=" px-4 py-3 shrink-0  flex items-center justify-between">
                    <div>
                        <div className=" text-center !text-[18px] !text-gray-900 !font-semibold !font-gilroy flex items-center gap-2" >
                            Bed Status
                            <button
                                type="button"
                                disabled={!canUpdatePayingGuests}
                                onClick={handleEditBed}
                                className={`flex items-center justify-center ${canUpdatePayingGuests ? "cursor-pointer" : "cursor-not-allowed opacity-60"
                                    }`}
                            >
                                <Edit2
                                    size="20"
                                    color={canUpdatePayingGuests ? "#64748B" : "#888888"}
                                />
                            </button>
                        </div>
                        <div className="text-sm text-[#1E45E1] flex items-center gap-2">
                            {bedDetails?.floorName}
                            <span className="h-4 w-px bg-gray-300" />
                            {bedDetails?.roomName}
                            <span className="h-4 w-px bg-gray-300" />
                            {bedDetails?.bedName}
                        </div>
                    </div>

                    <div className=" z-10">
                        <Add
                            size="24"
                            color="#99A1AF"
                            onClick={handleCloseBed}
                            className="cursor-pointer rotate-45"
                        />
                    </div>

                </div>
                <div className="flex-1 min-h-0 overflow-y-auto mx-2 show-scrolls ">
                    <div className=" my-2 mx-2">
                        {currentItem?.newTenantInfo?.map((tenant, index) => {
                            const tenantId = tenant.tenetId || index;
                            const isExpanded = expandedReserved === tenantId;

                            return (
                                <div key={tenantId}>
                                    <div onClick={() => toggleReserved(tenantId)}
                                        className={`flex justify-between items-center px-2 py-2 cursor-pointer rounded transition-all duration-200 ${isExpanded
                                            ? "border border-[#ADBDFF] bg-white shadow-[0_2px_8px_rgba(30,69,225,0.12)]"
                                            : "border border-[#F2F2F2] hover:bg-[#F7FAFF]"
                                            }`}>
                                        <div className="flex gap-3 items-center">
                                            <div>
                                                {tenant?.profilePic &&
                                                    tenant?.profilePic !== "0" ? (
                                                    <Image
                                                        src={tenant?.profilePic}
                                                        roundedCircle
                                                        className="w-[40px] h-[40px] object-cover rounded-full"
                                                        alt="image"
                                                    />
                                                ) : (
                                                    <div className="h-[40px] w-[40px] rounded-full bg-[#D2D6DE] flex items-center justify-center text-[17px] font-normal text-[#3E4F68]">
                                                        {tenant?.tenantInitials || "-"}
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-2">
                                                <div>
                                                    <label
                                                        className="block max-w-[180px] truncate text-[14px] text-[#222222] font-semibold"
                                                        title={tenant?.tenantFullName || "N/A"}
                                                    // onClick={() =>
                                                    //     handleNavigateTenantProfile(tenant)
                                                    // }
                                                    >
                                                        {tenant?.tenantFullName || "N/A"}
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="text-[12px] text-[#4B4B4B] font-gilroy font-medium">
                                                        {tenant?.mobile
                                                            ? `+ ${tenant?.countryCode} ${String(tenant?.mobile)}`
                                                            : "No phone"}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div >
                                            <button className='my-1 px-2 py-1 bg-[#1E45E1] text-white font-gilroy rounded text-xs '>Reserved</button>
                                            <div className="flex my-1 gap-1 items-center text-[#1E45E1] text-xs" onClick={(e) => {
                                                e.stopPropagation();
                                                handleNavigateTenantProfile(tenant);
                                            }
                                            }>View Tenant <MdKeyboardDoubleArrowRight /></div>
                                        </div>


                                    </div>
                                    {isExpanded && (
                                        <>
                                            {/* Tabs */}
                                            <div className="w-full my-3 shrink-0 px-3 mt-4">
                                                <div className="flex items-center justify-around gap-6 border-b border-[#E5E7EB] w-full">
                                                    {["overview", "activity"].map((tab) => (
                                                        <button
                                                            key={tab}
                                                            type="button"
                                                            onClick={() => setActiveTab(tab)}
                                                            className={`flex-1 pb-3 text-sm font-medium capitalize transition-all duration-200 border-b-2 ${activeTab === tab
                                                                ? "text-[#1E45E1] border-[#1E45E1] drop-shadow-[0_2px_4px_rgba(30,69,225,0.25)]"
                                                                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                                                                }`}
                                                        >
                                                            {tab === "overview" ? "Overview" : "Activity"}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>


                                            <div className="mx-2">
                                                {activeTab === "overview" && (
                                                    <BedOverview isBed="RESERVED" tenant={tenant} />
                                                )}

                                                {(activeTab === "activity" && isDev) ? (
                                                    <BedActivity />
                                                ) : activeTab === "activity" && (

                                                    <FormComingSoon />
                                                )}
                                            </div>


                                            {activeTab === "overview" && (
                                                <div className="flex items-center gap-2 mb-10 mt-2">
                                                    <button
                                                        type="button"
                                                        disabled={!canWriteCustomers}
                                                        onClick={() => handleCheckin(tenant)}
                                                        className={`flex flex-1 gap-2 items-center justify-center p-2 text-left border rounded transition-all duration-200 ${canWriteCustomers
                                                            ? "cursor-pointer border-[#E5E7EB] bg-white hover:bg-[#F0F4FF]"
                                                            : "cursor-not-allowed border-[#E5E7EB] bg-white opacity-60"
                                                            }`}
                                                    >
                                                        <AddCircle
                                                            size={18}
                                                            color={canWriteCustomers ? "#1E45E1" : "#A0A0A0"}
                                                        />
                                                        <span className={`text-[13px] font-medium whitespace-nowrap ${canWriteCustomers ? "text-[#222222]" : "text-gray-300"
                                                            }`}>
                                                            Check-In
                                                        </span>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={!canUpdateBooking}
                                                        onClick={() => handleMakeInActive(tenant)}
                                                        className={`flex flex-1 gap-2 items-center justify-center p-2 text-left border rounded transition-all duration-200 ${canUpdateBooking
                                                            ? "cursor-pointer border-[#1E45E1] bg-[#1E45E1] hover:bg-blue-700"
                                                            : "cursor-not-allowed border-[#E5E7EB] bg-gray-100 opacity-60"
                                                            }`}
                                                    >
                                                        <LogoutCurve
                                                            size={18}
                                                            color={canUpdateBooking ? "#FFFFFF" : "#A0A0A0"}
                                                        />
                                                        <span className={`text-[13px] font-medium whitespace-nowrap ${canUpdateBooking ? "text-white" : "text-gray-300"
                                                            }`}>
                                                            Make as Inactive
                                                        </span>
                                                    </button>
                                                </div>
                                            )}



                                        </>
                                    )}
                                </div>)
                        })}
                    </div>

                </div>
            </div>
        </div>

    );
}
BookedBed.propTypes = {
    handleCloseBed: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    handleShowCheck_In: PropTypes.func.isRequired,
    handleShowInActiveForm: PropTypes.func.isRequired,
    currentItem: PropTypes.func.isRequired,
    showEditBed: PropTypes.func.isRequired,
};
export default BookedBed;

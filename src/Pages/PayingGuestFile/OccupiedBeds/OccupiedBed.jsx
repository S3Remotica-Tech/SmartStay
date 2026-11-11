/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
// import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import { LogoutCurve, AddCircle, Edit2, ArrowSwapHorizontal, Verify } from "iconsax-react";
// import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Image from "react-bootstrap/Image";
// import { FiCalendar } from "react-icons/fi";
import { useHasPermission } from "../../../Utils/Permission";
import { Add } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BedActivity from '../BedActivity';
import FormComingSoon from '../../../Utils/FormComingSoon';
import BedOverview from "../BedOverview";

function OccupiedBed({
    // show,
    handleCloseBed,
    currentItem,
    handleShowReassignBed,
    handleShowNoticePeriod,
    showEditBed,
    handleShowInActiveForm,
    handleShowCheck_In,
}) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    // const [showDots, setShowDots] = useState("");
    // const [activeRoomId, setActiveRoomId] = useState(null);
    const [expandedOccupied, setExpandedOccupied] = useState(null);
    const [expandedReserved, setExpandedReserved] = useState(null);
    // const [activeRoomIdReserved, setActiveRoomIdReserved] = useState(null);
    const bedDetails = state?.PgList?.OccupiedCustomer;
    const [activeTab, setActiveTab] = useState("overview");
    const isDev = import.meta.env.MODE === "development";
    const navigate = useNavigate();
    const popupRef = useRef(null);


    const {
        canWriteModule: canWriteCustomers,
    } = useHasPermission("Customers");

    const {
        canUpdateModule: canUpdatePayingGuests,
    } = useHasPermission("Paying Guests");

    const {
        canUpdateModule: canUpdateCheckout,
    } = useHasPermission("Checkout");

    const { canUpdateModule: canUpdateBooking } =
        useHasPermission("Booking");

    const handleEditBed = () => {
        showEditBed(true);
    };

    const handleReAssignBed = (currentItem) => {
        handleShowReassignBed(true, currentItem);
    };

    const handleMoveToNoticePeriod = (currentItem) => {
        handleShowNoticePeriod(true, currentItem);
    };

    // const handleShowDots = (roomId) => {
    //     setShowDots(!showDots);
    //     setActiveRoomId(activeRoomId === roomId ? null : roomId);
    // };

    // const handleShowDotsRerved = (roomId) => {
    //     setActiveRoomIdReserved(activeRoomIdReserved === roomId ? null : roomId);
    // };

    const handleCheckin = (tenant) => {
        handleShowCheck_In(true, tenant);
    };

    const handleMakeInActive = (tenant) => {
        handleShowInActiveForm(true, tenant);
    };

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

    const handleNavigateTenantProfile = (tenantDetails) => {

        navigate(`/tenant/details/${tenantDetails?.tenetId}`, {
            state: {
                customerId: tenantDetails?.tenetId,
                hostelId: state.login.selectedHostel_Id,
                name: tenantDetails?.tenantFullName,
                isPgWay: true,
                navigationSource: "PG"
            },
        });
        dispatch({ type: "UPDATE_USERSLIST_FALSE" });
    };



    const toggleOccupied = (id) => {
        setExpandedOccupied((prev) => prev === id ? null : id);
    };

    const toggleReserved = (id) => {
        setExpandedReserved((prev) => prev === id ? null : id);
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
                        {currentItem?.currentTenantInfo?.map((tenant, index) => {

                            const tenantId = tenant.tenetId || index;
                            const isExpanded = expandedOccupied === tenantId;

                            return (<div key={tenant.tenetId}>
                                <div
                                    onClick={() => toggleOccupied(tenant.tenetId)}
                                    className={`flex justify-between items-center px-2 py-1 cursor-pointer rounded transition-all duration-200 ${isExpanded
                                        ? "border-1 border-[#ADBDFF] bg-white shadow-[0_2px_8px_rgba(30,69,225,0.12)]"
                                        : "border-1 border-[#F2F2F2] hover:bg-[#F7FAFF]"
                                        }`}
                                >
                                    <div className="flex gap-3 items-center">
                                        <div>
                                            {tenant?.profilePic &&
                                                tenant?.profilePic !== "0" ? (
                                                <Image
                                                    src={tenant?.profilePic}
                                                    roundedCircle
                                                    className="h-[40px] w-[40px]"
                                                    alt="image"
                                                />
                                            ) : (
                                                <div className="h-[40px] w-[40px] rounded-full bg-[#D2D6DE]
                                                     flex items-center justify-center text-[17px]
                                                     font-normal text-[#3E4F68] font-gilroy">
                                                    {tenant?.tenantInitials || "-"}
                                                </div>
                                            )}
                                        </div>

                                        <div className="">
                                            <div>
                                                <label

                                                    className="block max-w-[200px] truncate text-[14px] flex gap-1 items-center text-[#222222] font-gilroy font-semibold cursor-pointer "
                                                    title={tenant?.tenantFullName || "N/A"}
                                                >
                                                    {tenant?.tenantFullName || "N/A"}
                                                    <Verify
                                                        size="14" variant="Bold"
                                                        color="#038C3D" />
                                                </label>
                                            </div>

                                            <div>
                                                <label className="text-[12px] text-[#4B4B4B] font-normal font-gilroy">
                                                    {tenant?.mobile
                                                        ? `+ ${tenant?.countryCode} ${String(tenant?.mobile)}`
                                                        : "No phone"}
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div >
                                        <button className='my-1 px-2 py-1 bg-[#038C3D] text-white font-gilroy rounded text-xs '>Occupied</button>
                                        <div className="flex my-1 gap-1 items-center text-[#1E45E1] text-xs" onClick={(e) => {
                                            e.stopPropagation();
                                            handleNavigateTenantProfile(tenant);
                                        }
                                        }>View Tenant <MdKeyboardDoubleArrowRight /></div>
                                    </div>

                                </div>

                                {
                                    isExpanded && (
                                        <>

                                            <div className="w-full my-3 shrink-0 px-3 mt-4">
                                                <div className="flex items-center justify-around gap-6 border-b border-[#E5E7EB] w-full">
                                                    {["overview", "activity"].map((tab) => (
                                                        <button
                                                            key={tab}
                                                            type="button"
                                                            onClick={() => setActiveTab(tab)}
                                                            className={`flex-1 pb-3 text-sm font-medium capitalize transition-all duration-200 border-b-2
                    ${activeTab === tab
                                                                    ? "text-[#1E45E1] border-[#1E45E1] drop-shadow-[0_2px_4px_rgba(30,69,225,0.25)]"
                                                                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                                                                }`}
                                                        >
                                                            {tab === "overview" ? "Overview" : "Activity"}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-h-0 overflow-y-auto mx-2 show-scrolls ">
                                                {activeTab === "overview" &&
                                                    <BedOverview isBed="OCCUPIED" tenant={tenant} />


                                                }

                                                {(activeTab === "activity" && isDev) ? (
                                                    <BedActivity />
                                                ) : activeTab === "activity" && (

                                                    <FormComingSoon />
                                                )}
                                            </div>


                                            {activeTab === "overview" &&
                                                <div className="flex items-center gap-2 mb-10 mt-2">

                                                    <button
                                                        type="button"
                                                        disabled={!canUpdateCheckout}
                                                        onClick={() => handleMoveToNoticePeriod(tenant)}
                                                        className={`flex flex-1 gap-2 items-center justify-center p-2 text-left border rounded transition-all duration-200
            ${canUpdateCheckout
                                                                ? "cursor-pointer border-[#E5E7EB] bg-white hover:bg-[#FFF3F3]"
                                                                : "cursor-not-allowed border-[#E5E7EB] bg-white opacity-60"
                                                            }`}
                                                    >
                                                        <LogoutCurve
                                                            size="18"
                                                            color={canUpdateCheckout ? "#FF9500" : "#A9A9A9"}
                                                            className="ml-1 shrink-0"
                                                        />
                                                        <span className={`text-[13px] font-medium font-gilroy whitespace-nowrap
            ${canUpdateCheckout ? "text-[#222222]" : "text-[#A9A9A9]"}
        `}>
                                                            Move To Notice Period
                                                        </span>
                                                    </button>


                                                    <button
                                                        type="button"
                                                        disabled={!canUpdateBooking}
                                                        onClick={() => handleReAssignBed(tenant)}
                                                        className={`flex flex-1 gap-2 items-center justify-center p-2 text-left border rounded transition-all duration-200
            ${canUpdateBooking
                                                                ? "cursor-pointer border-[#1E45E1] bg-[#1E45E1] hover:bg-blue-700"
                                                                : "cursor-not-allowed border-[#E5E7EB] bg-gray-100 opacity-60"
                                                            }`}
                                                    >
                                                        <ArrowSwapHorizontal
                                                            size={16}
                                                            color={canUpdateBooking ? "#FFFFFF" : "#A9A9A9"}
                                                            className="ml-1 shrink-0"
                                                        />
                                                        <span className={`text-[13px] font-medium font-gilroy whitespace-nowrap
            ${canUpdateBooking ? "text-white" : "text-[#A9A9A9]"}
        `}>
                                                            Change Bed
                                                        </span>
                                                    </button>
                                                </div>
                                            }
                                        </>

                                    )
                                }
                            </div>
                            )
                        })}
                    </div>

                    <div className="my-2 mx-2 font-gilroy">

                        {currentItem?.newTenantInfo?.map((tenant, index) => {
                            const tenantId = tenant.tenetId || index;
                            const isExpanded = expandedReserved === tenantId;

                            return <div key={tenantId} className="mb-2">
                                <div
                                    onClick={() => toggleReserved(tenantId)}
                                    className={`flex justify-between items-center px-2 py-1 cursor-pointer rounded transition-all duration-200 ${isExpanded
                                        ? "border-1 border-[#ADBDFF] bg-white shadow-[0_2px_8px_rgba(30,69,225,0.12)]"
                                        : "border-1 border-[#F2F2F2] hover:bg-[#F7FAFF]"
                                        }`}
                                >
                                    <div className="flex gap-3 items-center">
                                        <div>
                                            {tenant?.profilePic && tenant?.profilePic !== "0" ? (
                                                <Image
                                                    src={tenant.profilePic}
                                                    roundedCircle
                                                    alt="image"
                                                    className="w-[40px] h-[40px] object-cover rounded-full"
                                                />
                                            ) : (
                                                <div className="h-[40px] w-[40px] rounded-full bg-[#D2D6DE]
                                                     flex items-center justify-center text-[17px]
                                                     font-normal text-[#3E4F68] font-gilroy">
                                                    {tenant?.tenantInitials || "-"}
                                                </div>
                                            )}
                                        </div>

                                        <div className="">
                                            <label

                                                className="block max-w-[200px] truncate flex gap-1 items-center text-[14px] text-[#222222] font-gilroy font-semibold cursor-pointer "
                                                title={tenant?.tenantFullName || "N/A"}
                                            >
                                                {tenant?.tenantFullName || "N/A"}  <Verify
                                                    size="14" variant="Bold"
                                                    color="#038C3D" />
                                            </label>

                                            <label className="text-[12px] font-gilroy font-medium text-[#4B4B4B]">
                                                {tenant?.mobile
                                                    ? `+ ${tenant?.countryCode} ${tenant?.mobile}`
                                                    : "No phone"}
                                            </label>
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

                                {
                                    isExpanded && (
                                        <>

                                            <div className="w-full my-3 shrink-0 px-3 mt-4">
                                                <div className="flex items-center justify-around gap-6 border-b border-[#E5E7EB] w-full">
                                                    {["overview", "activity"].map((tab) => (
                                                        <button
                                                            key={tab}
                                                            type="button"
                                                            onClick={() => setActiveTab(tab)}
                                                            className={`flex-1 pb-3 text-sm font-medium capitalize transition-all duration-200 border-b-2
                    ${activeTab === tab
                                                                    ? "text-[#1E45E1] border-[#1E45E1] drop-shadow-[0_2px_4px_rgba(30,69,225,0.25)]"
                                                                    : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                                                                }`}
                                                        >
                                                            {tab === "overview" ? "Overview" : "Activity"}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-h-0 overflow-y-auto mx-2 show-scrolls ">
                                                {activeTab === "overview" &&
                                                    <BedOverview isBed="RESERVED" tenant={tenant} />
                                                }

                                                {(activeTab === "activity" && isDev) ? (
                                                    <BedActivity />
                                                ) : activeTab === "activity" && (

                                                    <FormComingSoon />
                                                )}
                                            </div>


                                            {activeTab === "overview" &&
                                                <div className="flex items-center gap-2 mb-10 mt-2">


                                                    <button
                                                        type="button"
                                                        disabled={!canWriteCustomers}
                                                        onClick={() => handleCheckin(tenant)}
                                                        className={`flex flex-1 gap-2 items-center justify-center p-2 text-left border rounded transition-all duration-200
            ${canWriteCustomers
                                                                ? "cursor-pointer border-[#E5E7EB] bg-white hover:bg-[#F0F4FF]"
                                                                : "cursor-not-allowed border-[#E5E7EB] bg-white opacity-60"
                                                            }`}
                                                    >
                                                        <AddCircle
                                                            size={18}
                                                            color={canWriteCustomers ? "#1E45E1" : "#A0A0A0"}
                                                            className="shrink-0"
                                                        />
                                                        <span className={`text-[13px] font-gilroy font-medium whitespace-nowrap
            ${canWriteCustomers ? "text-[#222222]" : "text-gray-300"}`}
                                                        >
                                                            Check-In
                                                        </span>
                                                    </button>


                                                    <button
                                                        type="button"
                                                        disabled={!canUpdateBooking}
                                                        onClick={() => handleMakeInActive(tenant)}
                                                        className={`flex flex-1 gap-2 items-center justify-center p-2 text-left border rounded transition-all duration-200
            ${canUpdateBooking
                                                                ? "cursor-pointer border-[#1E45E1] bg-[#1E45E1] hover:bg-blue-700"
                                                                : "cursor-not-allowed border-[#E5E7EB] bg-gray-100 opacity-60"
                                                            }`}
                                                    >
                                                        <LogoutCurve
                                                            size={18}
                                                            color={canUpdateBooking ? "#FFFFFF" : "#A0A0A0"}
                                                            className="shrink-0"
                                                        />
                                                        <span className={`text-[13px] font-gilroy font-medium whitespace-nowrap
            ${canUpdateBooking ? "text-white" : "text-gray-300"}`}
                                                        >
                                                            Make as Inactive
                                                        </span>
                                                    </button>

                                                </div>
                                            }
                                        </>

                                    )
                                }


                            </div>
                        })}
                    </div>
                </div>
            </div>
        </div >


    );
}
OccupiedBed.propTypes = {
    handleCloseBed: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    currentItem: PropTypes.object.isRequired,
    handleShowReassignBed: PropTypes.func.isRequired,
    handleShowNoticePeriod: PropTypes.func.isRequired,
    showEditBed: PropTypes.func.isRequired,
    handleShowCheck_In: PropTypes.func.isRequired,
    handleShowInActiveForm: PropTypes.func.isRequired,
};
export default OccupiedBed;





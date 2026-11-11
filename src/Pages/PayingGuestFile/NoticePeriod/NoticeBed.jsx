/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import "../../../Pages/AssetFile/addAsset.css";
import TimerPause from "../../../Assets/Images/New_images/timer-pause.svg";
import logout from "../../../Assets/Images/New_images/logout.svg";
import AddPlus from "../../../Assets/Images/New_images/add-circle.png";
import Exchange from "../../../Assets/v2Images/exchange.svg";
import MakeAsInAcive from "../../../Assets/v2Images/Inactive.svg";
import { FiCalendar } from "react-icons/fi";
import Settings from "../../../Assets/v2Images/info-circle.svg";
import { useHasPermission } from "../../../Utils/Permission";
import { Calendar, Edit } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { LogoutCurve, Edit2, Verify, Add } from "iconsax-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BedActivity from '../BedActivity';
import FormComingSoon from '../../../Utils/FormComingSoon';
import BedOverview from "../BedOverview";



function NoticeBed({
    show,
    handleCloseBed,
    currentItem,
    showBooking,
    showNoticeperiodCheckout,
    showfinalsettelemnet,
    // handleOpenChangeBed,
    handleShowInActiveForm,
    handleOpenCancelCheckout,
    // handleDisplayCheckInForm,
    showEditBed,
    handleShowReassignBed,
    handleShowNoticePeriod,
}) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showTooltip, setShowTooltip] = useState(false);
    // const canWriteCustomers = useHasPermission("Customers", "canWrite")

    const {
        canWriteModule: canWriteCustomers,
        // canReadModule: canReadPayingGuests,
        // canUpdateModule: canUpdatePayingGuests,
        // canDeleteModule: canDeletePayingGuests,
    } = useHasPermission("Customers");

    const {
        canWriteModule: canWriteCheckout,
        canUpdateModule: canUpdateCheckout,
    } = useHasPermission("Checkout");


    const { canWriteModule: canWriteBooking, canUpdateModule: canUpdateBooking } =
        useHasPermission("Booking");
    const {
        canUpdateModule: canUpdatePayingGuests,
        // canDeleteModule: canDeletePayingGuests,
    } = useHasPermission("Paying Guests");

    // const [recheckin, setRecheckin] = useState(false)
    const [activeMenu, setActiveMenu] = useState(null);
    const [activeMenuForReserved, setActiveMenuForReserved] = useState(null);
    const [selectedTenant, setSelectedTenant] = useState("");
    const popupRef = useRef(null);
    const isNoticeAndBooked = currentItem?.newTenantInfo?.length > 0;
    const bedDetails = state?.PgList?.OccupiedCustomer;
    const [expandedOccupied, setExpandedOccupied] = useState(null);
    const [expandedReserved, setExpandedReserved] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const isDev = import.meta.env.MODE === "development";
    const toggleOccupied = (id) => {
        setExpandedOccupied((prev) => prev === id ? null : id);
    };

    const toggleReserved = (id) => {
        setExpandedReserved((prev) => prev === id ? null : id);
    };

    useEffect(() => {
        if (!selectedTenant?.tenetId) return;
        dispatch({
            type: "CUSTOMERDETAILS",
            payload: { customerId: selectedTenant?.tenetId },
        });
    }, [selectedTenant?.tenetId]);

    const handleEditBed = () => {
        showEditBed(true);
    };

    const handleShowDots = (type, tenant) => {
        setActiveMenu((prev) => (prev === type ? null : type));

        setSelectedTenant(tenant);
    };

    const handleShowDotsForReserved = (type, tenant) => {
        setActiveMenuForReserved((prev) => (prev === type ? null : type));
        setSelectedTenant(tenant);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActiveMenu(null);
            setActiveMenuForReserved(null);
        }
    };

    const handleMakeAsInActive = (tenant) => {
        handleShowInActiveForm(true, tenant);
    };

    const handleRecheckInBed = (tenant) => {
        handleOpenCancelCheckout(true, tenant);
    };

    const handleNewBooking = (tenant) => {
        showBooking(true, tenant);
    };

    const handleCheckout = (tenantDetails) => {
        showNoticeperiodCheckout(true, tenantDetails);
    };

    const matchedDataStatus =
        state.UsersList.customerdetails?.customerCurrentStatus;

    const handleFinalsettelmentGenerate = (tenant) => {
        showfinalsettelemnet(tenant);
        dispatch({
            type: "GETCONFIRMCHECKOUTCUSTOMER",
            // payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
        });
    };

    // const handleCheckInforBookingTenant = () => {
    //   handleDisplayCheckInForm(true)
    // }

    useEffect(() => {
        if (state.Booking.StatusCodeInactiveCode === 200) {
            setTimeout(() => {
                dispatch({ type: "CLEAR_BOOKING_InActive" });
            }, 1000);
        }
    }, [state.Booking.StatusCodeInactiveCode]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (state.UsersList.statusCodeForFinalSettlement === 201) {
            handleCloseBed();
            // dispatch({
            //   type: "USERLIST",
            //   payload: { hostel_id: state.login.selectedHostel_Id },
            // })
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: currentItem.roomId },
            });
            setTimeout(() => {
                dispatch({ type: "CLEAR_FINAL_GENERATE" });
            }, 500);
        }
    }, [state.UsersList.statusCodeForFinalSettlement]);

    useEffect(() => {
        if (state.UsersList.statuscodeForConformCheckout === 200) {
            handleCloseBed();
            // dispatch({
            //   type: "USERLIST",
            //   payload: { hostel_id: state.login.selectedHostel_Id },
            // });
            dispatch({
                type: "GETALLBEDSLIST",
                payload: { roomId: currentItem.roomId },
            });
            setTimeout(() => {
                dispatch({ type: "REMOVE_CONFORM_CHECKOUT" });
            }, 500);
        }
    }, [state.UsersList.statuscodeForConformCheckout]);



    useEffect(() => {
        if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
            handleCloseBed();

            setTimeout(() => {
                dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
            }, 500);
        }
    }, [state.UsersList?.StatusCodeBacktoCheckin]);

    const handleReAssignBed = (currentItem) => {
        handleShowReassignBed(true, currentItem);
    };

    const handleMoveToNoticePeriod = (currentItem) => {
        handleShowNoticePeriod(true, currentItem);
    };

    const handleNavigateTenantProfile = (tenantDetails) => {
        if (tenantDetails) {
            dispatch({
                type: "CUSTOMERDETAILS",
                payload: {
                    customerId:
                        tenantDetails.currentTenantInfo?.tenetId || tenantDetails?.tenetId,
                },
            });
            navigate(
                `/tenant/details/${tenantDetails.currentTenantInfo?.tenetId || tenantDetails?.tenetId}`,
                {
                    state: {
                        customerId:
                            tenantDetails.currentTenantInfo?.tenetId ||
                            tenantDetails?.tenetId,
                        hostelId: state.login.selectedHostel_Id,
                        name:
                            tenantDetails.currentTenantInfo?.tenantFullName ||
                            tenantDetails?.tenantFullName,
                        isPgWay: true,
                    },
                },
            );
            dispatch({ type: "UPDATE_USERSLIST_FALSE" });
        }
    };

    const handleNavigateReservedTenantProfile = (tenantDetails) => {
        if (tenantDetails) {
            dispatch({
                type: "CUSTOMERDETAILS",
                payload: { customerId: tenantDetails?.tenetId },
            });
            navigate(`/tenant/details/${tenantDetails?.tenetId}`, {
                state: {
                    customerId: tenantDetails?.tenetId,
                    hostelId: state.login.selectedHostel_Id,
                    name: tenantDetails?.tenantFullName,
                    isPgWay: true,
                },
            });
            dispatch({ type: "UPDATE_USERSLIST_FALSE" });
        }
    };

    const hasCheckinAndNotice =
        currentItem?.currentTenantInfo?.some(
            (t) => t.currentStatus === "CHECKIN",
        ) &&
        currentItem?.currentTenantInfo?.some((t) => t.currentStatus === "NOTICE");

    return (
        <>

            <div className="fixed inset-0 z-[9999]">
                <div
                    className="absolute inset-0 bg-black/50"
                    onClick={handleCloseBed}
                />

                <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col">


                    <div className="px-4 py-3 shrink-0 flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 text-[18px] text-gray-900 font-semibold">
                                Bed Status

                                <button
                                    type="button"
                                    disabled={!canUpdatePayingGuests}
                                    onClick={handleEditBed}
                                    className={!canUpdatePayingGuests ? "cursor-not-allowed opacity-60" : ""}
                                >
                                    <Edit2
                                        size="20"
                                        color={canUpdatePayingGuests ? "#64748B" : "#888888"}
                                    />
                                </button>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-[#1E45E1]">
                                {currentItem?.floorName}
                                <span className="h-4 w-px bg-gray-300" />
                                {currentItem?.roomName}
                                <span className="h-4 w-px bg-gray-300" />
                                {currentItem?.bedName}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">


                            <Add
                                size="24"
                                color="#99A1AF"
                                onClick={handleCloseBed}
                                className="cursor-pointer rotate-45"
                            />
                        </div>
                    </div>


                    <div className="flex-1 min-h-0 overflow-y-auto mx-2 show-scrolls">


                        <div className="my-2 mx-2">
                            {currentItem?.currentTenantInfo?.map((tenant, index) => {
                                const tenantId = tenant.tenetId || index;
                                const isExpanded = expandedOccupied === tenantId;

                                return (
                                    <div key={tenantId} className="mb-2">


                                        <div
                                            onClick={() => toggleOccupied(tenantId)}
                                            className={`flex justify-between items-center px-2 py-1 cursor-pointer rounded transition-all duration-200 ${isExpanded
                                                ? "border border-[#ADBDFF] bg-white shadow-[0_2px_8px_rgba(30,69,225,0.12)]"
                                                : "border border-[#F2F2F2] hover:bg-[#F7FAFF]"
                                                }`}
                                        >
                                            <div className="flex gap-3 items-center min-w-0">
                                                {tenant?.profilePic && tenant?.profilePic !== "0" ? (
                                                    <Image
                                                        src={tenant.profilePic}
                                                        roundedCircle
                                                        className="h-[40px] w-[40px]"
                                                        alt="image"
                                                    />
                                                ) : (
                                                    <div className="h-[40px] w-[40px] shrink-0 rounded-full bg-[#D2D6DE] flex items-center justify-center text-[17px] text-[#3E4F68]">
                                                        {tenant?.tenantInitials || "-"}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1">
                                                        <label className="max-w-[200px] truncate text-[14px] text-[#222222] font-semibold cursor-pointer">
                                                            {tenant?.tenantFullName || "N/A"}
                                                        </label>
                                                        <Verify size="14" variant="Bold" color="#038C3D" />
                                                    </div>

                                                    <p className="text-[12px] text-[#4B4B4B]  mb-0">
                                                        {tenant?.mobile
                                                            ? `+ ${tenant?.countryCode} ${String(tenant.mobile)}`
                                                            : "No phone"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <span className="my-1 inline-block px-2 py-1 bg-[#DE0202] text-white rounded text-xs">
                                                    Notice Period
                                                </span>

                                                <div
                                                    className="flex items-center gap-1 text-[#1E45E1] text-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNavigateTenantProfile(tenant);
                                                    }}
                                                >
                                                    View Tenant <MdKeyboardDoubleArrowRight />
                                                </div>
                                            </div>
                                        </div>

                                        {isExpanded && (
                                            <>

                                                <div className="w-full my-3 shrink-0 px-3 mt-4">
                                                    <div className="flex items-center justify-around gap-6 border-b border-[#E5E7EB]">
                                                        {["overview", "activity"].map((tab) => (
                                                            <button
                                                                key={tab}
                                                                type="button"
                                                                onClick={() => setActiveTab(tab)}
                                                                className={`flex-1 pb-3 text-sm font-medium capitalize border-b-2 transition-all ${activeTab === tab
                                                                    ? "text-[#1E45E1] border-[#1E45E1] drop-shadow-[0_2px_4px_rgba(30,69,225,0.25)]"
                                                                    : "text-gray-500 border-transparent hover:text-gray-700"
                                                                    }`}
                                                            >
                                                                {tab}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                {/* Overview / Activity */}
                                                <div className="mx-2">
                                                    {activeTab === "overview" && (
                                                        <BedOverview
                                                            isBed="NOTICE"
                                                            tenant={tenant}
                                                        />
                                                    )}

                                                    {activeTab === "activity" && (
                                                        isDev ? <BedActivity /> : activeTab === "activity" && <FormComingSoon />
                                                    )}
                                                </div>


                                                {activeTab === "overview" && (
                                                    <div className="flex flex-wrap items-center gap-2 mb-6 mt-3">

                                                        {/* New Booking */}
                                                        <button
                                                            type="button"
                                                            disabled={!canWriteBooking}
                                                            onClick={() => handleNewBooking(tenant)}
                                                            className={`flex flex-1 min-w-[120px] gap-2 items-center justify-center p-2 border rounded transition-all ${canWriteBooking
                                                                ? "border-[#E5E7EB] bg-white hover:bg-[#F7FAFF]"
                                                                : "border-[#E5E7EB] opacity-50 cursor-not-allowed"
                                                                }`}
                                                        >
                                                            <img
                                                                src={TimerPause}
                                                                alt="booking"
                                                                className={`h-[17px] w-[17px] ${!canWriteBooking ? "grayscale opacity-50" : ""
                                                                    }`}
                                                            />
                                                            <span className="text-[13px] font-medium whitespace-nowrap">
                                                                New Booking
                                                            </span>
                                                        </button>

                                                        {/* Cancel Checkout */}
                                                        <button
                                                            type="button"
                                                            disabled={!canWriteCustomers || hasCheckinAndNotice}
                                                            onClick={() => {
                                                                if (!hasCheckinAndNotice) {
                                                                    handleRecheckInBed(tenant);
                                                                }
                                                            }}
                                                            className={`flex flex-1  gap-2 items-center justify-center p-2 border rounded transition-all ${canWriteCustomers && !hasCheckinAndNotice
                                                                ? "border-[#E5E7EB] bg-white hover:bg-[#F0F4FF]"
                                                                : "border-[#E5E7EB] opacity-50 cursor-not-allowed"
                                                                }`}
                                                        >
                                                            <Calendar
                                                                size="16"
                                                                color={
                                                                    canWriteCustomers && !hasCheckinAndNotice
                                                                        ? "#1E45E1"
                                                                        : "#A9A9A9"
                                                                }
                                                            />
                                                            <span className="text-[13px] font-medium whitespace-nowrap">
                                                                Cancel Checkout
                                                            </span>
                                                        </button>

                                                        {/* Generate Settlement */}
                                                        <button
                                                            type="button"
                                                            disabled={!canWriteCheckout}
                                                            onClick={() =>
                                                                canWriteCheckout &&
                                                                handleFinalsettelmentGenerate(tenant)
                                                            }
                                                            className={`flex flex-1 min-w-[120px] gap-2 items-center justify-center p-2 border rounded transition-all ${canWriteCheckout
                                                                ? "border-[#1E45E1] bg-[#1E45E1] hover:bg-blue-700"
                                                                : "border-[#E5E7EB] bg-gray-100 opacity-60 cursor-not-allowed"
                                                                }`}
                                                        >
                                                            <LogoutCurve
                                                                size="17"
                                                                color={canWriteCheckout ? "#FFFFFF" : "#A9A9A9"}
                                                            />
                                                            <span className={`text-[13px] font-medium whitespace-nowrap ${canWriteCheckout ? "text-white" : "text-gray-400"
                                                                }`}>
                                                                Generate
                                                            </span>
                                                        </button>

                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        {/* Reserved Tenants */}
                        <div className="my-2 mx-2">
                            {currentItem?.newTenantInfo?.map((tenant, index) => {
                                const tenantId = tenant.tenetId || index;
                                const isExpanded = expandedReserved === tenantId;

                                return (
                                    <div key={tenantId} className="mb-2">


                                        <div
                                            onClick={() => toggleReserved(tenantId)}
                                            className={`flex justify-between items-center px-2 py-1 cursor-pointer rounded transition-all ${isExpanded
                                                ? "border border-[#ADBDFF] bg-white shadow-[0_2px_8px_rgba(30,69,225,0.12)]"
                                                : "border border-[#F2F2F2] hover:bg-[#F7FAFF]"
                                                }`}
                                        >
                                            <div className="flex gap-3 items-center min-w-0">
                                                {tenant?.profilePic && tenant.profilePic !== "0" ? (
                                                    <Image
                                                        src={tenant.profilePic}
                                                        roundedCircle
                                                        alt="image"
                                                        className="h-[40px] w-[40px] object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-[40px] w-[40px] shrink-0 rounded-full bg-[#D2D6DE] flex items-center justify-center text-[17px] text-[#3E4F68]">
                                                        {tenant?.tenantInitials || "-"}
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <div className="flex items-center gap-1">
                                                        <label className="max-w-[200px] truncate text-[14px] text-[#222222] font-semibold">
                                                            {tenant?.tenantFullName || "N/A"}
                                                        </label>
                                                        <Verify size="14" variant="Bold" color="#038C3D" />
                                                    </div>

                                                    <p className="text-[12px] text-[#4B4B4B]">
                                                        {tenant?.mobile
                                                            ? `+ ${tenant?.countryCode} ${tenant.mobile}`
                                                            : "No phone"}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <span className="my-1 inline-block px-2 py-1 bg-[#1E45E1] text-white rounded text-xs">
                                                    Reserved
                                                </span>

                                                <div
                                                    className="flex items-center gap-1 text-[#1E45E1] text-xs"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleNavigateReservedTenantProfile(tenant);
                                                    }}
                                                >
                                                    View Tenant <MdKeyboardDoubleArrowRight />
                                                </div>
                                            </div>
                                        </div>


                                        {isExpanded && (
                                            <>
                                                <div className="w-full my-3 shrink-0 px-3 mt-4">
                                                    <div className="flex items-center justify-around gap-6 border-b border-[#E5E7EB]">
                                                        {["overview", "activity"].map((tab) => (
                                                            <button
                                                                key={tab}
                                                                type="button"
                                                                onClick={() => setActiveTab(tab)}
                                                                className={`flex-1 pb-3 text-sm font-medium capitalize border-b-2 transition-all ${activeTab === tab
                                                                    ? "text-[#1E45E1] border-[#1E45E1]"
                                                                    : "text-gray-500 border-transparent hover:text-gray-700"
                                                                    }`}
                                                            >
                                                                {tab}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mx-2">
                                                    {activeTab === "overview" && (
                                                        <BedOverview
                                                            isBed="RESERVED"
                                                            tenant={tenant}
                                                        />
                                                    )}

                                                    {activeTab === "activity" && (
                                                        isDev ? <BedActivity /> : <FormComingSoon />
                                                    )}
                                                </div>

                                                {/* Reserved Actions */}
                                                {activeTab === "overview" && (
                                                    <div className="flex items-center gap-2 mb-6 mt-3">

                                                        <button
                                                            type="button"
                                                            disabled={!canWriteCustomers}
                                                            onClick={() => handleCheckIn(tenant)}
                                                            className={`flex flex-1 gap-2 items-center justify-center p-2 border rounded transition-all ${canWriteCustomers
                                                                ? "border-[#E5E7EB] bg-white hover:bg-[#F0F4FF]"
                                                                : "border-[#E5E7EB] opacity-60 cursor-not-allowed"
                                                                }`}
                                                        >
                                                            <AddCircle
                                                                size="18"
                                                                color={canWriteCustomers ? "#1E45E1" : "#A0A0A0"}
                                                            />
                                                            <span className="text-[13px] font-medium whitespace-nowrap">
                                                                Check-In
                                                            </span>
                                                        </button>

                                                        <button
                                                            type="button"
                                                            disabled={!canUpdateBooking}
                                                            onClick={() => handleMakeAsInActive(tenant)}
                                                            className={`flex flex-1 gap-2 items-center justify-center p-2 border rounded transition-all ${canUpdateBooking
                                                                ? "border-[#1E45E1] bg-[#1E45E1] hover:bg-blue-700"
                                                                : "border-[#E5E7EB] bg-gray-100 opacity-60 cursor-not-allowed"
                                                                }`}
                                                        >
                                                            <LogoutCurve
                                                                size="18"
                                                                color={canUpdateBooking ? "#FFFFFF" : "#A0A0A0"}
                                                            />
                                                            <span className={`text-[13px] font-medium whitespace-nowrap ${canUpdateBooking ? "text-white" : "text-gray-400"
                                                                }`}>
                                                                Make as Inactive
                                                            </span>
                                                        </button>

                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
NoticeBed.propTypes = {
    handleCloseBed: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    currentItem: PropTypes.func.isRequired,
    showNoticeperiodCheckout: PropTypes.func.isRequired,
    showBooking: PropTypes.func.isRequired,
    showfinalsettelemnet: PropTypes.func.isRequired,
    handleShowInActiveForm: PropTypes.func.isRequired,
    handleOpenCancelCheckout: PropTypes.func.isRequired,
    showEditBed: PropTypes.func.isRequired,
    handleShowReassignBed: PropTypes.func.isRequired,
    handleShowNoticePeriod: PropTypes.func.isRequired,
};
export default NoticeBed;



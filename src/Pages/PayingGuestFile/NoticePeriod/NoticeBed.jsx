/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import Image from "react-bootstrap/Image";
import "../../../Pages/AssetFile/addAsset.css";
import TimerPause from "../../../Assets/Images/New_images/timer-pause.svg";
import { useHasPermission } from "../../../Utils/Permission";
import { Calendar } from "iconsax-react";
import { useNavigate } from "react-router-dom";
import { LogoutCurve, Edit2, Verify, Add, AddCircle } from "iconsax-react";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import BedActivity from '../BedActivity';
import FormComingSoon from '../../../Utils/FormComingSoon';
import BedOverview from "../BedOverview";



function NoticeBed({

    handleCloseBed,
    currentItem,
    showBooking,

    showfinalsettelemnet,

    handleShowInActiveForm,
    handleOpenCancelCheckout,

    showEditBed,

}) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const {
        canWriteModule: canWriteCustomers,

    } = useHasPermission("Customers");

    const {
        canWriteModule: canWriteCheckout,

    } = useHasPermission("Checkout");


    const { canWriteModule: canWriteBooking, canUpdateModule: canUpdateBooking } =
        useHasPermission("Booking");
    const {
        canUpdateModule: canUpdatePayingGuests,

    } = useHasPermission("Paying Guests");


    // const popupRef = useRef(null);

    const [selectedOccupiedTenant, setSelectedOccupiedTenant] = useState(null);
    const [selectedReservedTenant, setSelectedReservedTenant] = useState(null);
    const [activeTab, setActiveTab] = useState("overview");
    const isDev = import.meta.env.MODE === "development";


    const toggleOccupied = (tenant) => {
        setSelectedOccupiedTenant((prev) =>
            prev?.tenetId === tenant.tenetId ? null : tenant
        );

        setSelectedReservedTenant(null);
        setActiveTab("overview");
    };

    const toggleReserved = (tenant) => {
        setSelectedReservedTenant((prev) =>
            prev?.tenetId === tenant.tenetId ? null : tenant
        );

        setSelectedOccupiedTenant(null);
        setActiveTab("overview");
    };





    const handleEditBed = () => {
        showEditBed(true);
    };



    const handleClickOutside = () => {
        // if (popupRef.current && !popupRef.current.contains(event.target)) {
        // }
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



    const handleFinalsettelmentGenerate = (tenant) => {
        showfinalsettelemnet(tenant);
        dispatch({
            type: "GETCONFIRMCHECKOUTCUSTOMER",
            // payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
        });
    };



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
        const firstOccupied = currentItem?.currentTenantInfo?.[0] || null;

        setSelectedOccupiedTenant(firstOccupied);
    }, [currentItem?.currentTenantInfo]);

    useEffect(() => {
        if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
            handleCloseBed();

            setTimeout(() => {
                dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
            }, 500);
        }
    }, [state.UsersList?.StatusCodeBacktoCheckin]);



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


                        <div className="my-2 mx-2 gap-3 flex flex-col">
                            {currentItem?.currentTenantInfo?.map((tenant, index) => {
                                const tenantId = tenant.tenetId || index;
                                const isExpanded = selectedOccupiedTenant?.tenetId === tenantId;

                                return (
                                    <div key={tenantId} className="mb-2">


                                        <div
                                            onClick={() => toggleOccupied(tenant)}
                                            className={`flex justify-between items-center px-2 py-1 cursor-pointer rounded transition-all duration-200 ${isExpanded
                                                ? "border-1 border-[#ADBDFF] bg-white shadow-[0_2px_8px_rgba(30,69,225,0.12)]"
                                                : "border-1 border-[#F2F2F2] hover:bg-[#F7FAFF]"
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


                                    </div>
                                );
                            })}
                        </div>

                        {/* Reserved Tenants */}
                        <div className="my-2 mx-2">
                            {currentItem?.newTenantInfo?.map((tenant, index) => {
                                const tenantId = tenant.tenetId || index;
                                const isExpanded = selectedReservedTenant?.tenetId === tenantId;
                                return (
                                    <div key={tenantId} className="mb-2">


                                        <div
                                            onClick={() => toggleReserved(tenant)}
                                            className={`flex justify-between items-center px-2 py-1 cursor-pointer rounded transition-all ${isExpanded
                                                ? "border-1 border-[#ADBDFF] bg-white shadow-[0_2px_8px_rgba(30,69,225,0.12)]"
                                                : "border-1 border-[#F2F2F2] hover:bg-[#F7FAFF]"
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



                                    </div>
                                );
                            })}
                        </div>

                        {selectedOccupiedTenant && (
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
                                            tenant={selectedOccupiedTenant}
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
                                            onClick={() => handleNewBooking(selectedOccupiedTenant)}
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
                                                    handleRecheckInBed(selectedOccupiedTenant);
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
                                                handleFinalsettelmentGenerate(selectedOccupiedTenant)
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


                        {selectedReservedTenant && (
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
                                            tenant={selectedReservedTenant}
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
                                            disabled
                                            // disabled={!canWriteCustomers}
                                            // onClick={() => handleCheckIn(selectedReservedTenant)}
                                            className={`disabled:opacity-50 flex flex-1 gap-2 items-center justify-center p-2 border rounded transition-all ${canWriteCustomers
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
                                            onClick={() => handleMakeAsInActive(selectedReservedTenant)}
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



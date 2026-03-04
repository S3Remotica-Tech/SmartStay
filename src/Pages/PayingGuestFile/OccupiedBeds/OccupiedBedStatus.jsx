/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
// import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
// import Profile from '../../../Assets/Images/New_images/profile-picture.png'
import { LogoutCurve, AddCircle } from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Image from 'react-bootstrap/Image';
import { FiCalendar, } from "react-icons/fi";
import { useHasPermission } from '../../../Utils/Permission';
import { Edit } from 'iconsax-react';
import { useNavigate } from "react-router-dom";


function OccupiedBedStatus({
    show,
    handleCloseBed,
    currentItem,
    handleShowReassignBed,
    handleShowNoticePeriod,
    showEditBed,
    // handleShowCheck_In,
    handleShowInActiveForm
}) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    // const [customer, setCustomer] = useState([])
    const [showDots, setShowDots] = useState('')
    const [activeRoomId, setActiveRoomId] = useState(null);

    const [activeRoomIdReserved, setActiveRoomIdReserved] = useState(null);

    const navigate = useNavigate();
    const popupRef = useRef(null);
    // const canWriteCustomers = useHasPermission("Customers", "canWrite");


    const {
        canWriteModule: canWriteCustomers,
        // canReadModule: canReadPayingGuests,
        // canUpdateModule: canUpdatePayingGuests,
        // canDeleteModule: canDeletePayingGuests,
    } = useHasPermission("Customers");

    const {
        canUpdateModule: canUpdatePayingGuests,
        // canDeleteModule: canDeletePayingGuests,

    } = useHasPermission("Paying Guests");

  const {
        canWriteModule: canWriteCheckout

  } = useHasPermission("Checkout");

 const {
        canReadModule: canReadBooking,

    } = useHasPermission("Booking");













    const handleEditBed = () => {
        showEditBed(true)
    }


    const handleReAssignBed = (currentItem) => {
        handleShowReassignBed(true, currentItem)
    };

    const handleMoveToNoticePeriod = (currentItem) => {
        handleShowNoticePeriod(true, currentItem)
    }

    const handleShowDots = (roomId) => {
        setShowDots(!showDots)
        setActiveRoomId(activeRoomId === roomId ? null : roomId);
    }


    const handleShowDotsRerved = (roomId) => {
        setActiveRoomIdReserved(activeRoomIdReserved === roomId ? null : roomId);
    }

    //  const handleCheckin = (tenant) => {

    //         handleShowCheck_In(true, tenant)

    //     }

    const handleMakeInActive = (tenant) => {
        handleShowInActiveForm(true, tenant)
    }


    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActiveRoomId(null);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleNavigateTenantProfile = (tenantDetails) => {

        dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: tenantDetails?.tenetId } });
        navigate(`/tenant/details/${tenantDetails?.tenetId}`, {
            state: {
                customerId: tenantDetails?.tenetId,
                hostelId: state.login.selectedHostel_Id,
                name: tenantDetails?.tenantFullName,
                isPgWay: true
            },
        });
        dispatch({ type: "UPDATE_USERSLIST_FALSE" });
    }




    return (
        <>



            <div className="modal show block static font-gilroy">
                <Modal show={show} onHide={handleCloseBed} centered
                >
                    <Modal.Dialog className="m-0 p-0 w-full max-w-full rounded-2xl">
                        <Modal.Header className="pb-0 border border-gray-200">
                            <div className="flex justify-between w-full p-2 pr-3">
                                <div>
                                    <Modal.Title className="!text-lg !font-semibold !text-gray-900 !font-gilroy">
                                        Bed Status
                                    </Modal.Title>

                                    <div className="flex items-center gap-3 mt-1">
                                        <label className="text-sm font-semibold text-blue-700 !font-gilroy">
                                            {currentItem?.floorName}
                                        </label>
                                        <span className="text-sm font-medium text-blue-700 font-gilroy">|</span>
                                        <label className="text-sm font-semibold text-blue-700 !font-gilroy">
                                            {currentItem?.roomName}
                                        </label>
                                        <span className="text-sm font-medium text-blue-700 font-gilroy">|</span>
                                        <span className="text-sm font-semibold text-blue-700 !font-gilroy">
                                            {currentItem?.bedName}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center text-green-700 bg-green-100 mt-1 font-semibold rounded-full text-sm font-gilroy px-2 h-7">
                                    Occupied
                                </div>
                            </div>
                        </Modal.Header>

                        <Modal.Body className="pt-1 pb-0">
                            <div className="grid grid-cols-1 mt-1">
                                <div className="col-span-1">
                                    <label className="mt-0 mb-1 text-base text-[#222222] font-gilroy font-medium">
                                        Occupied by
                                    </label>

                                    {currentItem?.currentTenantInfo?.map((tenant, index) => (
                                        <div key={tenant.tenetId}>

                                            <div className="flex justify-between">

                                                <div className="flex gap-3 items-center">
                                                    <div>
                                                        {tenant?.profilePic && tenant?.profilePic !== "0" ? (
                                                            <Image
                                                                src={tenant?.profilePic}
                                                                roundedCircle
                                                                className="h-[50px] w-[50px]"
                                                                alt="image"
                                                            />
                                                        ) : (
                                                            <div className="h-[50px] w-[50px] rounded-full bg-[#1E45E1] flex items-center justify-center text-[20px] font-semibold text-white font-gilroy">
                                                                {tenant?.tenantInitials || "-"}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mt-2">
                                                        <div>
                                                            <label
                                                                onClick={() => handleNavigateTenantProfile(tenant)}
                                                                className="block max-w-[200px] truncate text-[18px] text-[#1E45E1] font-gilroy font-semibold cursor-pointer underline"
                                                                title={tenant?.tenantFullName || "N/A"}
                                                            >
                                                                {tenant?.tenantFullName || "N/A"}
                                                            </label>
                                                        </div>

                                                        <div>
                                                            <label className="text-[16px] text-[#4B4B4B] font-medium font-gilroy">
                                                                {tenant?.mobile
                                                                    ? `+ ${tenant?.countryCode} ${String(tenant?.mobile)}`
                                                                    : "No phone"}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div
                                                    onClick={() => handleShowDots(index)}
                                                    className={`cursor-pointer h-[40px] w-[40px] rounded-full border border-[#EFEFEF] flex items-center justify-center relative
      ${activeRoomId === index ? "bg-[#E0ECFF]" : "bg-white"}
    `}
                                                    style={{ zIndex: showDots ? 1000 : "auto" }}
                                                >
                                                    <PiDotsThreeOutlineVerticalFill className="h-[20px] w-[20px]" />

                                                    {activeRoomId === index && (
                                                        <div
                                                            ref={popupRef}
                                                            className="absolute right-0 top-[50px] w-[220px] border border-[#EBEBEB] rounded-[10px] bg-[#f9f9f9] flex flex-col z-[1000] shadow-md"
                                                        >
                                                            <div
                                                                onClick={() => canWriteCustomers && handleReAssignBed(tenant)}
                                                                className={`flex gap-2 items-center p-2 rounded-t-[10px]
            ${canWriteCustomers ? "cursor-pointer hover:bg-[#F0F4FF]" : "cursor-not-allowed opacity-60"}
          `}
                                                            >
                                                                <FiCalendar
                                                                    size={16}
                                                                    color={canWriteCustomers ? "#1E45E1" : "#A9A9A9"}
                                                                    className="ml-1"
                                                                />
                                                                <label className={`text-[13px] font-medium font-gilroy mb-0
            ${canWriteCustomers ? "text-[#222222]" : "text-[#A9A9A9]"}
          `}>
                                                                    Change Bed
                                                                </label>
                                                            </div>

                                                            <div className="h-[1px] bg-[#E0E0E0]" />


                                                            <div
                                                                onClick={() => canWriteCheckout && handleMoveToNoticePeriod(tenant)}
                                                                className={`flex gap-2 items-center p-2 -ml-[3px]
            ${canWriteCheckout ? "cursor-pointer hover:bg-[#FFF3F3]" : "cursor-not-allowed opacity-60"}
          `}
                                                            >
                                                                <LogoutCurve
                                                                    size="18"
                                                                    color={canWriteCheckout ? "#FF9500" : "#A9A9A9"}
                                                                    className="ml-1"
                                                                />
                                                                <label className={`text-[13px] font-medium font-gilroy mb-0
            ${canWriteCheckout ? "text-[#222222]" : "text-[#A9A9A9]"}
          `}>
                                                                    Move To Notice Period
                                                                </label>
                                                            </div>







                                                            <div className="h-[1px] bg-[#E0E0E0]" />
                                                            <div
                                                                onClick={() => canUpdatePayingGuests && handleEditBed()}
                                                                className={`flex gap-2 items-center p-2 rounded-b-[10px]
            ${canUpdatePayingGuests ? "cursor-pointer hover:bg-[#FFF3F3]" : "cursor-not-allowed opacity-60"}
          `}
                                                            >
                                                                <Edit
                                                                    size="16"
                                                                    color={canUpdatePayingGuests ? "#1E45E1" : "#888888"}
                                                                    className="ml-1"
                                                                />
                                                                <label className={`text-[13px] font-medium font-gilroy mb-0
            ${canUpdatePayingGuests ? "text-[#222222]" : "text-[#A9A9A9]"}
          `}>
                                                                    Edit
                                                                </label>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>


                                            <div className="flex justify-between mb-2 mt-1">
                                                <div>
                                                    <label className="font-gilroy text-sm text-gray-800">
                                                        Rental Amount
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="font-gilroy text-sm text-gray-800 font-semibold">
                                                        {tenant?.rentAmount || "N/A"}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex justify-between mb-2">
                                                <div>
                                                    <label className="font-gilroy text-sm text-gray-800">
                                                        Check-In Date
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="font-gilroy text-sm text-gray-800 font-semibold">
                                                        {tenant?.joiningDate || "N/A"}
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="flex justify-between mb-2">
                                                <div>
                                                    <label className="font-gilroy text-sm text-gray-800">
                                                        Last Invoice
                                                    </label>
                                                </div>
                                                <div>
                                                    <label className="font-gilroy text-sm text-blue-700 font-semibold">
                                                        {tenant?.lastInvoiceNumber} & {tenant?.totalInvoices}
                                                        {tenant?.totalInvoices > 2 && (
                                                            <span className="ml-1">more</span>
                                                        )}
                                                    </label>
                                                </div>
                                            </div>
                                        </div>

                                    ))}
                                </div>
                            </div>


                            <div className="mt-1 font-gilroy">
                                {currentItem?.newTenantInfo?.length > 0 && (
                                    <label className="mt-0 mb-1 text-base text-[#222222] font-gilroy font-medium">
                                        Reserved by
                                    </label>
                                )}

                                {currentItem?.newTenantInfo?.map((tenant, index) => (
                                    <div key={index} className="mb-2">

                                        <div className="flex justify-between items-start">

                                            <div className="flex gap-3 items-center">

                                                <div>
                                                    {tenant?.profilePic && tenant?.profilePic !== "0" ? (
                                                        <Image
                                                            src={tenant.profilePic}
                                                            roundedCircle
                                                            alt="image"
                                                            className="w-12 h-12 object-cover rounded-full"
                                                        />
                                                    ) : (
                                                        <div className="w-12 h-12 rounded-full bg-[#1E45E1] flex items-center justify-center text-white font-gilroy font-semibold text-xl">
                                                            {tenant?.tenantInitials || "-"}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-2">
                                                    <label
                                                        onClick={() => handleNavigateTenantProfile(tenant)}
                                                        className="block max-w-[200px] truncate text-[18px] font-gilroy font-semibold text-[#1E45E1] cursor-pointer underline"
                                                        title={tenant?.tenantFullName || "N/A"}
                                                    >
                                                        {tenant?.tenantFullName || "N/A"}
                                                    </label>

                                                    <label className="text-[16px] font-gilroy font-medium text-[#4B4B4B]">
                                                        {tenant?.mobile ? `+ ${tenant?.countryCode} ${tenant?.mobile}` : "No phone"}
                                                    </label>
                                                </div>
                                            </div>

                                            <div
                                                onClick={() => handleShowDotsRerved(index)}
                                                className={`relative w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center cursor-pointer ${activeRoomIdReserved === index ? "bg-[#E0ECFF]" : "bg-white"
                                                    }`}
                                            >
                                                <PiDotsThreeOutlineVerticalFill className="w-5 h-5" />

                                                {activeRoomIdReserved === index && (
                                                    <div
                                                        ref={popupRef}
                                                        className="absolute right-0 top-[25px] w-[220px] border border-[#EBEBEB] rounded-[10px] bg-[#f9f9f9] flex flex-col z-[1000] shadow-md"
                                                    >
                                                        <div
                                                            className={`flex gap-2 items-center p-2 rounded-t-lg ${canWriteCustomers ? "cursor-pointer opacity-100 hover:bg-[#F0F4FF]" : "cursor-not-allowed opacity-50"
                                                                }`}
                                                        >
                                                            <AddCircle size={18} color={canWriteCustomers ? "#1E45E1" : "#A0A0A0"}
                                                                className="ml-1" />
                                                            <label className={`text-[14px] font-gilroy font-medium mb-0 ${canWriteCustomers ? "text-[#222222]" : "text-gray-300"}`}>
                                                                Check-In
                                                            </label>
                                                        </div>

                                                        <div className="h-px bg-gray-300" />

                                                        <div
                                                            className={`flex gap-2 items-center p-2 rounded-b-lg ${canReadBooking ? "cursor-pointer opacity-100 hover:bg-[#FFF3F3]" : "cursor-not-allowed opacity-50"
                                                                }`}
                                                            onClick={() => canReadBooking && handleMakeInActive(tenant)}
                                                        >
                                                            <LogoutCurve size={18} color={canReadBooking ? "#FF9500" : "#A0A0A0"}
                                                                className="ml-1" />
                                                            <label className={`text-[14px] font-gilroy font-medium mb-0 ${canReadBooking ? "text-[#222222]" : "text-gray-300"}`}>
                                                                Make as Inactive
                                                            </label>
                                                        </div>

                                                        <div className="h-px bg-gray-300" />

                                                        <div
                                                            className={`flex gap-2 items-center p-2 rounded-b-lg ${canUpdatePayingGuests ? "cursor-pointer opacity-100 hover:bg-[#FFF3F3]" : "cursor-not-allowed opacity-60"
                                                                }`}
                                                            onClick={() => canUpdatePayingGuests && handleEditBed()}
                                                        >
                                                            <Edit
                                                                size={16}
                                                                color={canUpdatePayingGuests ? "#1E45E1" : "#888888"}
                                                                className="ml-1.5"
                                                            />
                                                            <label className={`text-[14px] font-gilroy font-medium mb-0 ${canUpdatePayingGuests ? "text-[#222222]" : "text-gray-400"}`}>
                                                                Edit
                                                            </label>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                        </div>

                                        <div className="flex justify-between mt-2 mb-2">
                                            <label className="font-gilroy text-sm text-gray-800">Booking Amount</label>
                                            <label className="font-gilroy text-sm text-gray-800 font-bold">{tenant?.bookingAmount || "N/A"}</label>
                                        </div>

                                        <div className="flex justify-between mb-2">
                                            <label className="font-gilroy text-sm text-gray-800">Booking Date</label>
                                            <label className="font-gilroy text-sm text-gray-800 font-bold">{tenant?.bookingDate || "N/A"}</label>
                                        </div>

                                        <hr className="border border-white" />

                                    </div>
                                ))}
                            </div>

                        </Modal.Body>



                    </Modal.Dialog>
                </Modal>
            </div>






        </>
    );
}
OccupiedBedStatus.propTypes = {
    handleCloseBed: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    currentItem: PropTypes.object.isRequired,
    handleShowReassignBed: PropTypes.func.isRequired,
    handleShowNoticePeriod: PropTypes.func.isRequired,
    showEditBed: PropTypes.func.isRequired,
    // handleShowCheck_In: PropTypes.func.isRequired,
    handleShowInActiveForm: PropTypes.func.isRequired,

};
export default OccupiedBedStatus;
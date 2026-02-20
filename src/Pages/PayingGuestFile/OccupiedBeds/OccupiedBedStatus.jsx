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
                                                                className="text-[18px] text-[#1E45E1] font-gilroy font-semibold cursor-pointer underline"
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
                                                                className={`flex gap-2 items-center p-[15px] rounded-t-[10px]
            ${canWriteCustomers ? "cursor-pointer hover:bg-[#F0F4FF]" : "cursor-not-allowed opacity-60"}
          `}
                                                            >
                                                                <FiCalendar
                                                                    size={16}
                                                                    color={canWriteCustomers ? "#1E45E1" : "#A9A9A9"}
                                                                />
                                                                <label className={`text-[13px] font-medium font-gilroy mb-0
            ${canWriteCustomers ? "text-[#222222]" : "text-[#A9A9A9]"}
          `}>
                                                                    Change Bed
                                                                </label>
                                                            </div>

                                                            <div className="h-[1px] bg-[#E0E0E0]" />
                                                            <div
                                                                onClick={() => canWriteCustomers && handleMoveToNoticePeriod(tenant)}
                                                                className={`flex gap-2 items-center p-[15px] -ml-[3px]
            ${canWriteCustomers ? "cursor-pointer hover:bg-[#FFF3F3]" : "cursor-not-allowed opacity-60"}
          `}
                                                            >
                                                                <LogoutCurve
                                                                    size="18"
                                                                    color={canWriteCustomers ? "#FF9500" : "#A9A9A9"}
                                                                />
                                                                <label className={`text-[13px] font-medium font-gilroy mb-0
            ${canWriteCustomers ? "text-[#222222]" : "text-[#A9A9A9]"}
          `}>
                                                                    Move To Notice Period
                                                                </label>
                                                            </div>

                                                            <div className="h-[1px] bg-[#E0E0E0]" />
                                                            <div
                                                                onClick={() => canUpdatePayingGuests && handleEditBed()}
                                                                className={`flex gap-2 items-center p-[10px] rounded-b-[10px]
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

                            <div className="row mt-1">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    {
                                        currentItem?.newTenantInfo?.length > 0 &&

                                        <label style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }} className="mt-0 mb-1">Reserved by</label>
                                    }
                                    {currentItem?.newTenantInfo?.map((tenant, index) => (
                                        <div key={index} >
                                            <div className="d-flex justify-content-between">


                                                <div className="d-flex gap-3 align-items-center">

                                                    <div>
                                                        {tenant?.profilePic &&
                                                            tenant?.profilePic !== "0" ? (
                                                            <Image
                                                                src={tenant?.profilePic}
                                                                roundedCircle
                                                                style={{ height: 50, width: 50 }}
                                                                alt="image"
                                                            />
                                                        ) : (
                                                            <div
                                                                style={{
                                                                    height: 50,
                                                                    width: 50,
                                                                    borderRadius: "50%",
                                                                    backgroundColor: "#1E45E1",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    fontSize: 20,
                                                                    fontWeight: "600",
                                                                    color: "white", fontFamily: "Gilroy"
                                                                }}
                                                            >
                                                                {tenant?.tenantInitials || "-"}
                                                            </div>
                                                        )}

                                                    </div>
                                                    <div className="mt-2">
                                                        <div>
                                                            <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }} onClick={() => handleNavigateTenantProfile(tenant)}>{tenant?.tenantFullName || "N/A"}</label>
                                                        </div>
                                                        <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>
                                                            {tenant?.mobile ? `+ ${tenant?.countryCode} ${String(tenant?.mobile)}` : 'No phone'}

                                                        </label></div>
                                                    </div>

                                                </div>

                                                <div onClick={() => handleShowDotsRerved(index)}
                                                    style={{
                                                        cursor: "pointer",
                                                        height: 40,
                                                        width: 40,
                                                        borderRadius: 100,
                                                        border: "1px solid #EFEFEF",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        position: "relative",

                                                        backgroundColor: activeRoomIdReserved === index ? "#E0ECFF" : "white",
                                                    }}>
                                                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                                    {activeRoomIdReserved === index && (
                                                        <div
                                                            ref={popupRef}
                                                            className="position-absolute"
                                                            style={{
                                                                right: 50,
                                                                top: 10,
                                                                width: 160,
                                                                border: "1px solid #EBEBEB",
                                                                borderRadius: 10,
                                                                backgroundColor: "#f9f9f9",
                                                                display: "flex",
                                                                flexDirection: "column",
                                                                zIndex: 1000 + index,
                                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                                            }}
                                                        >

                                                            <div
                                                                className="d-flex gap-2 align-items-center"
                                                                // onClick={() => canWriteCustomers && handleCheckin(tenant)}


                                                                style={{
                                                                    padding: "10px",
                                                                    borderTopLeftRadius: 10,
                                                                    borderTopRightRadius: 10,
                                                                    cursor: canWriteCustomers ? "pointer" : "not-allowed",
                                                                    opacity: canWriteCustomers ? 1 : 0.5,
                                                                }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                            >
                                                                <AddCircle
                                                                    size="18"
                                                                    color={canWriteCustomers ? "#1E45E1" : "#A0A0A0"}
                                                                />
                                                                <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#dcdcdc", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed" }}>
                                                                    Check-In
                                                                </label>
                                                            </div>

                                                            <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />


                                                            <div
                                                                className="d-flex gap-2 align-items-center"
                                                                onClick={() => handleMakeInActive(tenant)}

                                                                style={{
                                                                    padding: "10px",
                                                                    borderBottomLeftRadius: 10,
                                                                    borderBottomRightRadius: 10,

                                                                    cursor: canWriteCustomers ? "pointer" : "not-allowed",
                                                                    opacity: canWriteCustomers ? 1 : 0.5,
                                                                }}
                                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                                            >
                                                                <LogoutCurve
                                                                    size="18"
                                                                    color={canWriteCustomers ? "#FF9500" : "#A0A0A0"}

                                                                />                                            <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#dcdcdc", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed" }}>Make as Inactive</label>
                                                            </div>

                                                            <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />
                                                            <div
                                                                className="d-flex gap-2 align-items-center"

                                                                onClick={() => canUpdatePayingGuests ? handleEditBed() : undefined}

                                                                style={{
                                                                    padding: "10px",
                                                                    borderBottomLeftRadius: 10,
                                                                    borderBottomRightRadius: 10,
                                                                    cursor: canUpdatePayingGuests ? "pointer" : "not-allowed",
                                                                    opacity: canUpdatePayingGuests ? 1 : 0.6,
                                                                }}
                                                                onMouseEnter={(e) => {
                                                                    e.currentTarget.style.backgroundColor = "#FFF3F3";
                                                                }}
                                                                onMouseLeave={(e) => {
                                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                                }}
                                                            >
                                                                <Edit size="16" color={!canUpdatePayingGuests ? "#888888" : "#1E45E1"} className="ms-0" />

                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 500,
                                                                        color: canUpdatePayingGuests ? "#222222" : "#A9A9A9",
                                                                        marginBottom: 0,
                                                                        fontFamily: "Gilroy",
                                                                        cursor: canUpdatePayingGuests ? "pointer" : "not-allowed",
                                                                    }}
                                                                >
                                                                    Edit
                                                                </label>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                            </div>

                                            


                                            <div className="d-flex justify-content-between mb-2 mt-1">
                                                <div>
                                                    <label style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222" }}>Booking Amount</label>
                                                </div>
                                                <div>
                                                    <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222222", fontWeight: 600 }}>{tenant?.bookingAmount || "N/A"}</label>
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between mb-2">
                                                <div>
                                                    <label style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222" }}>Booking Date</label>
                                                </div>
                                                <div>
                                                    <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222222", fontWeight: 600 }}>{tenant?.bookingDate || "N/A"}</label>
                                                </div>
                                            </div>

                                            <hr style={{ border: "1px solid #EDEDED" }} />

                                        </div>
                                    ))}
                                </div>


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
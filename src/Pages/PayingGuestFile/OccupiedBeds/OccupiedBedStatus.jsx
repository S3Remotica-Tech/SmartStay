/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import Profile from '../../../Assets/Images/New_images/profile-picture.png'
import { LogoutCurve } from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Image from 'react-bootstrap/Image';
import { FiCalendar, } from "react-icons/fi";
import { useHasPermission } from '../../../Utils/Permission';
import {  Edit } from 'iconsax-react';



function OccupiedBedStatus({
    show,
    handleCloseBed,
    currentItem,
    handleShowReassignBed,
    handleShowNoticePeriod,
    showEditBed
}) {



    // const state = useSelector(state => state)
    // const dispatch = useDispatch();

    // const [customer, setCustomer] = useState([])
    const [showDots, setShowDots] = useState('')
    const [activeRoomId, setActiveRoomId] = useState(null);


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
        canDeleteModule: canDeletePayingGuests,

    } = useHasPermission("Paying Guests");



    const handleEditBed = () => {
        showEditBed(true)
    }


    const handleReAssignBed = () => {
        handleShowReassignBed(true, currentItem)
    };

    const handleMoveToNoticePeriod = () => {
        handleShowNoticePeriod(true, currentItem)
    }

    const handleShowDots = (roomId) => {
        setShowDots(!showDots)
        setActiveRoomId(activeRoomId === roomId ? null : roomId);
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




    return (
        <>



            <div
                className="modal show"
                style={{
                    display: "block",
                    position: "initial",
                    fontFamily: "Gilroy,sans-serif",
                }}
            >
                <Modal show={show} onHide={handleCloseBed} centered
                >
                    <Modal.Dialog
                        style={{ maxWidth: "100%", width: "100%", borderRadius: 16 }}
                        className="m-0 p-0"
                    >

                        <Modal.Header className="pb-0"
                            style={{ border: "1px solid #E7E7E7" }}
                        >

                            <div className="d-flex justify-content-between w-100" style={{ padding: "5px  10px 5px 5px" }}>
                                <div>
                                    <div>
                                        <Modal.Title
                                            style={{
                                                fontSize: 18,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Bed Status
                                        </Modal.Title>
                                    </div>
                                    <div className="d-flex align-items-center gap-3">
                                        <label style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>
                                            {currentItem?.floorName}
                                        </label>
                                        <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>|</span>
                                        <label style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>
                                            {currentItem?.roomName}
                                        </label> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>|</span> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>
                                            {currentItem?.bedName}
                                        </span>
                                    </div>
                                </div>

                                <div onClick={() => handleShowDots(1)}
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
                                        zIndex: showDots ? 1000 : "auto",
                                        backgroundColor: String(activeRoomId) === String(1) ? "#E0ECFF" : "white",
                                    }}>
                                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                                    {String(activeRoomId) === String(1) && (
                                        <div
                                            ref={popupRef}
                                            className="position-absolute"
                                            style={{
                                                right: 0,
                                                top: 50,
                                                width: 220,
                                                border: "1px solid #EBEBEB",
                                                borderRadius: 10,
                                                backgroundColor: "#f9f9f9",
                                                display: "flex",
                                                flexDirection: "column",
                                                zIndex: 1000,
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                            }}
                                        >

                                            <div
                                                className="d-flex gap-2 align-items-center"
                                                onClick={() => canWriteCustomers && handleReAssignBed()}


                                                style={{
                                                    padding: "15px",
                                                    borderTopLeftRadius: 10,
                                                    borderTopRightRadius: 10,
                                                    cursor: canWriteCustomers ? "pointer" : "not-allowed",
                                                    opacity: canWriteCustomers ? 1 : 0.6,
                                                }}
                                                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                                                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                            >

                                                <FiCalendar size={16} color={canWriteCustomers ? "#1E45E1" : "#A9A9A9"} />
                                                <label style={{ fontSize: 13, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed", }}>Change Bed</label>
                                            </div>

                                            <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />


                                            <div
                                                className="d-flex gap-2 align-items-center"
                                                onClick={() => canWriteCustomers && handleMoveToNoticePeriod()}
                                                style={{
                                                    padding: "15px",
                                                    borderBottomLeftRadius: 10,
                                                    borderBottomRightRadius: 10,
                                                    cursor: canWriteCustomers ? "pointer" : "not-allowed",
                                                    opacity: canWriteCustomers ? 1 : 0.6,
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#FFF3F3";
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "transparent";
                                                }}
                                            >
                                                <LogoutCurve
                                                    size="18"
                                                    color={canWriteCustomers ? "#FF9500" : "#A9A9A9"}
                                                />
                                                <label
                                                    style={{
                                                        fontSize: 13,
                                                        fontWeight: 500,
                                                        color: canWriteCustomers ? "#222222" : "#A9A9A9",
                                                        marginBottom: 0,
                                                        fontFamily: "Gilroy",
                                                        cursor: canWriteCustomers ? "pointer" : "not-allowed",
                                                    }}
                                                >
                                                    Move To Notice Period
                                                </label>
                                            </div>
                                            <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />

                                            <div
                                                className="d-flex gap-2 align-items-center"
                                               
                                                onClick={() => canUpdatePayingGuests ? handleEditBed() : undefined}

                                                 style={{
                                                    padding: "15px",
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
                                 <Edit size="16" color={!canUpdatePayingGuests ? "#888888" : "#1E45E1"}  className="ms-1"/>

                                                <label
                                                    style={{
                                                        fontSize: 13,
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
                        </Modal.Header>

                        <Modal.Body style={{ padding: "5px 20px" }}>
                            <div className="row mt-1">
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <label style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }} className="mt-0 mb-1">Occupied by</label>

                                    <div className="d-flex gap-3 align-items-center">
                                        <div>
                                            <Image src={currentItem?.currentTenantProfilePic && currentItem?.currentTenantProfilePic !== "0" ? currentItem?.currentTenantProfilePic : Profile} roundedCircle style={{ height: 50, width: 50 }} alt="image" />
                                        </div>
                                        <div className="mt-2">
                                            <div>
                                                <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600 }} > {currentItem.currentTenantFullName || "N/A"}</label>
                                            </div>
                                            <div>
                                                <label style={{ fontSize: 16, color: "#4B4B4B", fontWeight: 500, fontFamily: "Gilroy" }}>
                                                    {currentItem?.currentTenantMobile ? `+ ${currentItem?.countryCode} ${String(currentItem?.currentTenantMobile)}` : 'No phone'}

                                                </label>

                                            </div>
                                        </div>
                                    </div>




                                </div>


                            </div>
                        </Modal.Body>


                        <Modal.Footer style={{ border: "none", padding: 15 }} className="mt-1">
                            <Button

                                className="w-100 m-0"
                                style={{
                                    color: "#00A32E",
                                    border: "1px solid #00A32E",
                                    fontWeight: 600,
                                    borderRadius: 60,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: 10,
                                    backgroundColor: "#fff"

                                }}
                            >
                                Occupied
                            </Button>
                        </Modal.Footer>
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
};
export default OccupiedBedStatus;
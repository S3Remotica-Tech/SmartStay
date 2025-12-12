/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import Profile from '../../../Assets/Images/New_images/profile-picture.png'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import "../../../Pages/AssetFile/addAsset.css";
import CalenderTick from "../../../Assets/Images/New_images/calendar-tick.svg";
import TimerPause from "../../../Assets/Images/New_images/timer-pause.svg";
import logout from "../../../Assets/Images/New_images/logout.svg";
import UserlistForm from "../../CustomerFile/UserlistForm";
import AddPlus from "../../../Assets/Images/New_images/add-circle.png";
import Exchange from "../../../Assets/v2Images/exchange.svg"
import MakeAsInAcive from "../../../Assets/v2Images/Inactive.svg"
import Checkouts from '../../../Assets/v2Images/calendar-tick.svg'
import Settings from '../../../Assets/v2Images/info-circle.svg'
import { useHasPermission } from '../../../Utils/Permission';
import { Edit } from 'iconsax-react';
import { useNavigate } from "react-router-dom";
function NoticeBedStatusDetails({
  show,
  handleCloseBed,
  currentItem,
  showBooking,
  showNoticeperiodCheckout,
  showfinalsettelemnet,
  handleOpenChangeBed,
  handleShowInActiveForm,
  handleOpenCancelCheckout,
  handleDisplayCheckInForm,
  showEditBed
}) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const canWriteCustomers = useHasPermission("Customers", "canWrite")

  console.log("currentItem", currentItem)

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


  // const [recheckin, setRecheckin] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null);
  const [activeMenuForReserved, setActiveMenuForReserved] = useState(null);
  // const [bactocheckinForm, setBacktoCheckInForm] = useState(false)
  const popupRef = useRef(null);
  const isNoticeAndBooked = currentItem?.newTenantInfo?.length > 0


  const handleEditBed = () => {
    showEditBed(true)
  }

  const handleShowDots = (type) => {
    setActiveMenu((prev) => (prev === type ? null : type));
  }


  const handleShowDotsForReserved = (type) => {
    setActiveMenuForReserved((prev) => (prev === type ? null : type));
  }

  const handleChangeBed = () => {
    handleOpenChangeBed(true)
  }
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveMenu(null);
      setActiveMenuForReserved(null)

    }
  };



  const handleMakeAsInActive = (tenant) => {
    handleShowInActiveForm(true, tenant)
  }


  const handleRecheckInBed = () => {
    handleOpenCancelCheckout(true)
    // setBacktoCheckInForm(true)
    // setRecheckin(true)
  }





  const handleNewBooking = () => {
    showBooking(true)
  }

  const handleCheckout = (currentItem) => {


    showNoticeperiodCheckout(true)
    dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      // payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
    });


  }
  const matchedData = state?.UsersList?.Users?.filter(
    (user) => user.customerId === currentItem.currentTenantInfo?.tenetId
  );


  const handleFinalsettelmentGenerate = () => {
    showfinalsettelemnet(true)
    dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      // payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
    });
  }


  // const handleCheckInforBookingTenant = () => {
  //   handleDisplayCheckInForm(true)
  // }


  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {

      setTimeout(() => {
        dispatch({ type: 'CLEAR_BOOKING_InActive' })
      }, 1000)

    }

  }, [state.Booking.StatusCodeInactiveCode])





  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    if (state.UsersList.statusCodeForFinalSettlement === 201) {
      handleCloseBed()
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      })
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: currentItem.roomId }
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_FINAL_GENERATE" });
      }, 500);

    }
  }, [state.UsersList.statusCodeForFinalSettlement])



  useEffect(() => {
    if (state.UsersList.statuscodeForConformCheckout === 200) {
      handleCloseBed()
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: currentItem.roomId }
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFORM_CHECKOUT" });
      }, 500);
    }
  }, [state.UsersList.statuscodeForConformCheckout])
  useEffect(() => {
    dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  }, [state.login.selectedHostel_Id])

  useEffect(() => {
    if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
      handleCloseBed()
      dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 500);
    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);




  const handleNavigateTenantProfile = (tenantDetails) => {
    if (tenantDetails) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: tenantDetails.currentTenantInfo?.tenetId || tenantDetails?.tenetId } });
      navigate(`/tenant/details/${tenantDetails.currentTenantInfo?.tenetId || tenantDetails?.tenetId}`, {
        state: {
          customerId: tenantDetails.currentTenantInfo?.tenetId || tenantDetails?.tenetId,
          hostelId: state.login.selectedHostel_Id,
          name: tenantDetails.currentTenantInfo?.tenantFullName || tenantDetails?.tenantFullName,
          isPgWay: true
        },
      });
      dispatch({ type: "UPDATE_USERSLIST_FALSE" });
    }
  }

  const handleNavigateReservedTenantProfile = (tenantDetails) => {
    if (tenantDetails) {
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
  }

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
                    </label>
                    <span style={{
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

                <div

                  className=" m-0"
                  style={{
                    color: "#DE0202",
                    border: "1px solid #FFF0F0",
                    fontWeight: 600,
                    borderRadius: 60,
                    fontFamily: "Gilroy",
                    padding: 10,
                    fontSize: 14,
                    backgroundColor: "#FFF0F0",
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                    height: "fit-content"
                  }}
                >
                  Notice Period
                </div>

              </div>
            </Modal.Header>

            <Modal.Body style={{ padding: "5px 20px", maxHeight: "370px", overflowY: "scroll" }} className="show-scrolls pe-4">
              <div className="row mt-1">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                  <div className="d-flex justify-content-between align-items-center">

                    <label style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }} className="mt-0 mb-1">{isNoticeAndBooked ? 'Currently Occupied by' : ' Occupied by'}</label>

                    <div onClick={() => handleShowDots('occupied')}
                      style={{
                        cursor: "pointer",
                        height: 40,
                        width: 40,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        // zIndex: activeMenu === 'occupied' ? 0 : "auto",
                        backgroundColor: activeMenu === 'occupied' ? "#E0ECFF" : "white",
                        borderRadius: activeMenu === 'occupied' && 100,
                      }}


                    >
                      <PiDotsThreeOutlineFill style={{ height: 20, width: 20 }} />
                      {activeMenu === 'occupied' && (
                        <div
                          ref={popupRef}
                          className="position-absolute"
                          style={{
                                                       right: 0,
                            top: 50,
                            width: 160,
                            border: "1px solid #EBEBEB",
                            borderRadius: 10,
                            backgroundColor: "#f9f9f9",
                            display: "flex",
                            flexDirection: "column",
                            zIndex: 100,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                          }}
                        >





                          {
                            matchedData[0]?.currentStatus === "Notice Period" &&
                            <div>

                              {/* cancel checkout */}
                              <div
                                className="d-flex gap-2 align-items-center"
                                onClick={() => handleRecheckInBed()}


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

                                <img src={CalenderTick} alt="Re-Assign Bed" style={{ filter: canWriteCustomers ? "none" : "grayscale(100%)" }} />
                                <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#A0A0A0", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed", }}>Cancel Checkout</label>
                              </div>

                              <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />
                              {/* new booking */}
                              {/* {currentItem?.newTenantInfo[0]?.tenetId && */}

                                <div
                                  className="d-flex gap-2 align-items-center"
                                  onClick={canWriteCustomers ? () => handleNewBooking() : undefined}
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
                                  <img src={TimerPause} alt="booking" style={{ filter: canWriteCustomers ? "none" : "grayscale(100%)" }} />
                                  <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#A0A0A0", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed", }}>
                                    New Booking
                                  </label>
                                </div>
                              {/* } */}
                              <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />
                              {/* Generate */}
                              <div
                                className="d-flex gap-2 align-items-center"
                                onClick={() => canWriteCustomers && handleFinalsettelmentGenerate(currentItem)}

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
                                <img src={logout} alt="Checkout" style={{ filter: canWriteCustomers ? "none" : "grayscale(100%)" }} />
                                <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#A0A0A0", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed" }}>Generate</label>
                              </div>
                            </div>
                          }
                          {/* Checkout */}
                          {
                            matchedData[0]?.currentStatus === "Settlement Generated" &&
                            <div
                              className="d-flex gap-2 align-items-center"
                              onClick={canWriteCustomers ? () => handleCheckout(currentItem) : undefined}

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
                              <img src={logout} alt="Checkout" style={{ filter: canWriteCustomers ? "none" : "grayscale(100%)" }} />
                              <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#A0A0A0", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed" }}>Checkout</label>
                            </div>
                          }

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

                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex gap-3 align-items-center">
                      <div>
                        {currentItem?.currentTenantInfo?.profilePic &&
                          currentItem?.currentTenantInfo?.profilePic !== "0" ? (
                          <Image
                            src={currentItem.currentTenantInfo?.profilePic}
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
                            {currentItem?.currentTenantInfo?.tenantInitials || "-"}
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <div>
                          <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }} onClick={() => handleNavigateTenantProfile(currentItem)} >{currentItem?.currentTenantInfo?.tenantFullName || "N/A"}</label>
                        </div>
                        <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>

                          {currentItem?.currentTenantInfo?.mobile ? `+ ${currentItem?.currentTenantInfo?.countryCode} ${String(currentItem?.currentTenantInfo?.mobile)}` : 'No phone'}


                        </label></div>
                      </div>
                    </div>

                  </div>

                  <div className="d-flex justify-content-between mb-2 mt-1">
                    <div>
                      <label style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222" }}>Rental Amount</label>
                    </div>
                    <div>
                      <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222222", fontWeight: 600 }}>₹{currentItem?.currentTenantInfo?.rentAmount}</label>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <label style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222" }}>Check-In Date</label>
                    </div>
                    <div>
                      <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222222", fontWeight: 600 }}>{currentItem?.currentTenantInfo?.joiningDate}</label>
                    </div>
                  </div>


                  <div className="d-flex justify-content-between mb-2">
                    <div>
                      <label style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222" }}>Last Invoice</label>
                    </div>
                    <div>
                      <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#1E45E1", fontWeight: 600 }}>
                        {currentItem?.currentTenantInfo?.lastInvoiceNumber}
                        & {currentItem?.currentTenantInfo?.totalInvoices}
                        {currentItem?.currentTenantInfo?.totalInvoices > 2 && (
                          <span>  more</span>
                        )}
                      </label>
                    </div>
                  </div>




                </div>


              </div>

              {
                isNoticeAndBooked &&


                <div className="row mt-1">
                  <hr style={{ border: "1px solid #E0ECFF" }} />
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    <div className="d-flex justify-content-between align-items-center">

                      <label style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }} className="mt-0 mb-1">Reserved by</label>



                    </div>
                    {currentItem?.newTenantInfo?.map((tenant, index) => (
                      <div key={index}>
                        <div className="d-flex gap-3 align-items-center justify-content-between">
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
                                <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600, cursor: "pointer", textDecoration: "underline" }} onClick={() => handleNavigateReservedTenantProfile(tenant)}  >{tenant?.tenantFullName || "N/A"}</label>
                              </div>
                              <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>

                                {tenant?.mobile ? `+ ${tenant?.countryCode} ${String(tenant?.mobile)}` : 'No phone'}


                              </label></div>
                            </div>
                          </div>
                          <div onClick={() => handleShowDotsForReserved(index)}
                            style={{
                              cursor: "pointer",
                              height: 40,
                              width: 40,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              // zIndex: activeMenuForReserved === index ? 1000 : "auto",
                              backgroundColor: activeMenuForReserved === index ? "#E0ECFF" : "white",
                              borderRadius: activeMenuForReserved === index && 100,
                            }}


                          >
                            <PiDotsThreeOutlineFill style={{ height: 20, width: 20 }} />
                            {activeMenuForReserved === index && (
                              <div
                                ref={popupRef}
                                className="position-absolute"
                                style={{
                                  right: 0,
                                  top: 50,
                                  width: 160,
                                  border: "1px solid #EBEBEB",
                                  borderRadius: 10,
                                  backgroundColor: "#f9f9f9",
                                  display: "flex",
                                  flexDirection: "column",
                                  zIndex: 300,
                                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                }}
                              >


                                <div
                                  // onClick={
                                  //   canWriteCustomers && !currentItem.isOccupied
                                  //     ? () => handleCheckIn(currentItem)
                                  //     : undefined
                                  // }
                                  className="d-flex gap-2 align-items-center"
                                  style={{
                                    position: "relative", zIndex: 2000,
                                    padding: "10px",
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                    cursor:
                                      canWriteCustomers && !currentItem.isOccupied ? "pointer" : "not-allowed",
                                    opacity: canWriteCustomers && !currentItem.isOccupied ? 1 : 0.6,
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!currentItem.isOccupied) e.currentTarget.style.backgroundColor = "#FFF3F3";
                                    else {
                                      const tooltip = e.currentTarget.querySelector(".tooltip-msg");
                                      tooltip.style.display = "block";
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!currentItem.isOccupied) e.currentTarget.style.backgroundColor = "transparent";
                                    else {
                                      const tooltip = e.currentTarget.querySelector(".tooltip-msg");
                                      tooltip.style.display = "none";
                                    }
                                  }}
                                >
                                  <img src={AddPlus} alt="booking"
                                    style={{
                                      filter:
                                        canWriteCustomers && !currentItem.isOccupied
                                          ? "none"
                                          : "grayscale(100%) brightness(60%)",
                                      cursor:
                                        canWriteCustomers && !currentItem.isOccupied
                                          ? "pointer"
                                          : "not-allowed",
                                    }} />
                                  <label
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      color:
                                        canWriteCustomers && !currentItem.isOccupied ? "#222222" : "#dcdcdc",
                                      marginBottom: 0,
                                      fontFamily: "Gilroy",
                                      cursor:
                                        canWriteCustomers && !currentItem.isOccupied
                                          ? "pointer"
                                          : "not-allowed",
                                    }}
                                  >
                                    Check-In
                                  </label>
<div>

                                  <div
                                    className="tooltip-msg"
                                    style={{
                                      display: "none",
                                      position: "absolute",
                                      top: "-100px",
                                      left: 0,
                                      backgroundColor: "#f9f9f9",
                                      padding: "5px 10px",
                                      borderRadius: "6px",
                                      color: "#222",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      boxShadow: "0px 2px 6px rgba(99, 94, 94, 0.2)",
                                      zIndex: 1000,

                                    }}
                                  >
                                    <div
                                    style={{}}
                                    >

                                    <img src={Settings} alt="alt" /> Complete the Checkout Process for the Occupied tenant, then the button will appear
                                 
                                 </div>
                                 
                                 
                                 
                                  </div>
                                </div>
</div>

                                <div
                                  className="d-flex gap-2 align-items-center"

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
                                  <img src={Exchange} alt="Checkout" style={{
                                    filter: canWriteCustomers ? "none" : "grayscale(100%) brightness(60%)",
                                    cursor: canWriteCustomers ? "pointer" : "not-allowed",
                                  }} />
                                  <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#dcdcdc", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed", }}>Change Bed</label>
                                </div>

                                <div
                                  className="d-flex gap-2 align-items-center"
                                  onClick={canWriteCustomers ? () => handleMakeAsInActive(tenant) : undefined}

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
                                  <img src={MakeAsInAcive} alt="Checkout" style={{
                                    filter: canWriteCustomers ? "none" : "grayscale(100%) brightness(60%)",
                                    cursor: canWriteCustomers ? "pointer" : "not-allowed",
                                  }} />
                                  <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#dcdcdc", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed" }}>Make as Inactive</label>
                                </div>

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
                            <label style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222" }}>Check-In Date</label>
                          </div>
                          <div>
                            <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222222", fontWeight: 600 }}>{tenant?.joiningDate || "N/A"}</label>
                          </div>
                        </div>


                        <div className="d-flex justify-content-between mb-2">
                          <div>
                            <label style={{ fontFamily: "Gilroy", fontSize: 14, color: "#222222" }}>Last Invoice</label>
                          </div>
                          <div>
                            <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222222", fontWeight: 600 }}> {tenant?.lastInvoiceNumber}
                              & {tenant?.totalInvoices}
                              {tenant?.totalInvoices > 2 && (
                                <span>  more</span>
                              )}</label>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </div>

              }





            </Modal.Body>

          </Modal.Dialog>
        </Modal>
      </div>



    </>
  );
}
NoticeBedStatusDetails.propTypes = {
  handleCloseBed: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  showNoticeperiodCheckout: PropTypes.func.isRequired,
  showBooking: PropTypes.func.isRequired,
  showfinalsettelemnet: PropTypes.func.isRequired

};
export default NoticeBedStatusDetails;

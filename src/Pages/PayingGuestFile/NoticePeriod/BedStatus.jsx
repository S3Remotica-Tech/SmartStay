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
function NoticeBedStatusDetails({
  show,
  handleCloseBed,
  currentItem,
  showBooking,
  showNoticeperiodCheckout,
  showfinalsettelemnet,
  handleOpenChangeBed,
  handleShowInActiveForm,
  handleOpenCancelCheckout
}) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  
  const canWriteCustomers = useHasPermission("Customers", "canWrite")
  const [recheckin, setRecheckin] = useState(false)
  const [activeMenu, setActiveMenu] = useState(null);
  const [bactocheckinForm, setBacktoCheckInForm] = useState(false)
  const popupRef = useRef(null);
  const isNoticeAndBooked = currentItem?.newTenantCustomerId !== null
  const handleShowDots = (type) => {
    setActiveMenu((prev) => (prev === type ? null : type));
  }


  const handleChangeBed = () => {
    handleOpenChangeBed(true)
  }
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  };



const handleMakeAsInActive = () =>{
   handleShowInActiveForm(true)
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
  (user) => user.customerId === currentItem.currentTenantCustomerId
);
console.log("matchedData",matchedData)

  const handleFinalsettelmentGenerate = () => {
    showfinalsettelemnet(true)
    dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      // payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
    });
  }




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
    if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
      handleCloseBed()
      dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 500);
    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);

  // useEffect(() => {
  //   const usersList = state?.UsersList?.Users;
  //   const userDetails = customer;


  //   const ParticularcustomerDetails = userDetails.filter((user) => user.RoomRent > 0)

  //   setCustomerId(ParticularcustomerDetails[0]?.id)


  //   if (
  //     Array.isArray(usersList) &&
  //     Array.isArray(ParticularcustomerDetails) &&
  //     usersList.length > 0 &&
  //     ParticularcustomerDetails.length > 0
  //   ) {
  //     const targetUserId = ParticularcustomerDetails[0]?.User_Id?.trim()?.toLowerCase();

  //     const foundCustomer = usersList.find(
  //       (user) => user.User_Id?.trim()?.toLowerCase() === targetUserId
  //     );

  //     setCustomerDetails(foundCustomer || null);
  //   }
  // }, [state?.UsersList?.Users, customer]);




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



              </div>
            </Modal.Header>

            <Modal.Body style={{ padding: "5px 20px" }}>
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
                        zIndex: activeMenu === 'reserved' ? 1000 : "auto",
                        backgroundColor: "white",
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
                            zIndex: 1000,
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                          }}
                        >



                          {
                            currentItem?.newTenantCustomerId &&

                              <div>
                                <div
                                  className="d-flex gap-2 align-items-center"
                                  // onClick={() => canWriteCustomers && handleCheckout(currentItem)}

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
                                  <img src={Checkouts} alt="Checkout" style={{ filter: canWriteCustomers ? "none" : "grayscale(100%)" }} />
                                  <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#A0A0A0", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed" }}>Cancel Checkout</label>
                                </div>


                              


                              </div>



                                }
                            


                          {
                            matchedData[0]?.currentStatus === "Notice Period" &&
                              <div>


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
                                  <label style={{ fontSize: 14, fontWeight: 500, color: canWriteCustomers ? "#222222" : "#A0A0A0", marginBottom: 0, fontFamily: "Gilroy", cursor: canWriteCustomers ? "pointer" : "not-allowed", }}>Cancal Checkout</label>
                                </div>

                                <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />

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
                                <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />

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
                           

                        </div>
                      )}
                    </div>

                  </div>

                  <div className="d-flex gap-3 align-items-center justify-content-between">
                    <div className="d-flex gap-3 align-items-center">
                      <div>
                        <Image src={currentItem?.currentTenantProfilePic && currentItem?.currentTenantProfilePic !== "0" ? currentItem?.currentTenantProfilePic : Profile} roundedCircle style={{ height: 50, width: 50 }} alt="image" />
                      </div>
                      <div className="mt-2">
                        <div>
                          <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600 }} >{currentItem?.currentTenantFullName || "N/A"}</label>
                        </div>
                        <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>
                          {/* {currentItem?.customerMobile
                          ? `+${String(currentItem?.customerMobile).slice(0, -10)} ${String(currentItem?.customerMobile).slice(-10)}`
                          : "No phone"} */}

                          {currentItem?.currentTenantMobile ? `+ ${currentItem?.countryCode} ${String(currentItem?.currentTenantMobile)}` : 'No phone'}


                        </label></div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <label style={{ fontSize: 16, color: "#000", fontFamily: "Gilroy", fontWeight: 500 }}>₹{currentItem?.rentAmount}</label>
                      </div>
                      <div>
                        <label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 400 }}>{currentItem?.currentTenantLeavingOn}</label>
                      </div>
                    </div>
                  </div>




                </div>


              </div>

              {
                isNoticeAndBooked &&
                <div className="row mt-1">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                    <div className="d-flex justify-content-between align-items-center">

                      <label style={{ fontSize: 16, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }} className="mt-0 mb-1">Reserved by</label>

                      <div onClick={() => handleShowDots('reserved')}
                        style={{
                          cursor: "pointer",
                          height: 40,
                          width: 40,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          zIndex: activeMenu === 'reserved' ? 1000 : "auto",
                          backgroundColor: "white",
                        }}


                      >
                        <PiDotsThreeOutlineFill style={{ height: 20, width: 20 }} />
                        {activeMenu === 'reserved' && (
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
                              zIndex: 1000,
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                            }}
                          >




                            <div
                              //                           onClick={
                              //   canWriteCustomers && !currentItem.isOccupied
                              //     ? () => handleCheckIn(currentItem)
                              //     : undefined
                              // }
                              className="d-flex gap-2 align-items-center"
                              style={{
                                position: "relative",
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

                              <div
                                className="tooltip-msg"
                                style={{
                                  display: "none",
                                  position: "absolute",
                                  top: "-100px",
                                  left: 0,
                                  backgroundColor: "#FFF3F3",
                                  padding: "5px 10px",
                                  borderRadius: "6px",
                                  color: "#222",
                                  fontSize: "12px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
                                  zIndex: 100,
                                }}
                              >
                                <img src={Settings} alt="alt" /> Complete the Checkout Process for the Occupied tenant, then the button will appear
                              </div>
                            </div>


                            <div
                              className="d-flex gap-2 align-items-center"
                              onClick={canWriteCustomers ? () => handleChangeBed(currentItem) : undefined}

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
                               onClick={canWriteCustomers ? () => handleMakeAsInActive() : undefined}

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





                          </div>
                        )}
                      </div>

                    </div>

                    <div className="d-flex gap-3 align-items-center justify-content-between">
                      <div className="d-flex gap-3 align-items-center">
                        <div>
                          <Image src={currentItem?.newTenantProfilePic && currentItem?.newTenantProfilePic !== "0" ? currentItem?.newTenantProfilePic : Profile} roundedCircle style={{ height: 50, width: 50 }} alt="image" />
                        </div>
                        <div className="mt-2">
                          <div>
                            <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600 }} >{currentItem?.newTenantFullName || "N/A"}</label>
                          </div>
                          <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>

                            {currentItem?.newTenantMobile ? `+ ${currentItem?.countryCode} ${String(currentItem?.newTenantMobile)}` : 'No phone'}


                          </label></div>
                        </div>
                      </div>
                      <div>
                        <div>
                          <label style={{ fontSize: 16, color: "#000", fontFamily: "Gilroy", fontWeight: 500 }}>₹{5500}</label>
                        </div>
                        <div>
                          <label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 400 }}>{currentItem?.newTenantJoiningDate}</label>
                        </div>
                      </div>
                    </div>





                  </div>


                </div>

              }





            </Modal.Body>
            <Modal.Footer style={{ border: "none", padding: 15 }} className="mt-1">

              <div className="d-flex w-100 gap-2">


                <Button

                  className="w-100 m-0"
                  style={{
                    color: "red",
                    border: "1px solid red",
                    fontWeight: 600,
                    borderRadius: 60,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    padding: 10,
                    backgroundColor: "#fff"

                  }}
                >
                  Notice Period
                </Button>
                {
                  isNoticeAndBooked &&
                  <Button

                    className="w-100 m-0"
                    style={{
                      color: "#1E45E1",
                      border: "1px solid #1E45E1",
                      fontWeight: 600,
                      borderRadius: 60,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      padding: 10,
                      backgroundColor: "#fff"

                    }}
                  >
                    Reserved
                  </Button>
                }
              </div>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>

      {/* {
        bactocheckinForm && <UserlistForm setBacktoCheckInForm={setBacktoCheckInForm} bactocheckinForm={bactocheckinForm}
          // customer_details={customer_details}
          handleCloseBed={handleCloseBed} recheckin={recheckin}
        />
      } */}

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

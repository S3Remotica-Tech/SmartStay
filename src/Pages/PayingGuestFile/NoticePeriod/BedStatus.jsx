/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import Profile from '../../../Assets/Images/New_images/profile-picture.png';
import { HiDotsHorizontal } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import "../../../Pages/AssetFile/addAsset.css";
import CalenderTick from "../../../Assets/Images/New_images/calendar-tick.svg";
import logout from "../../../Assets/Images/New_images/logout.svg";
import UserlistForm from "../../CustomerFile/UserlistForm";
import { AddCircle, LogoutCurve, InfoCircle } from "iconsax-react";
import exchange from '../../../Assets/Images/New_images/exchange.svg';
import TimerPause from '../../../Assets/Images/New_images/calendar-tick.png';
import dayjs from 'dayjs';
import UserList from "../../CustomerFile/UserList";

function NoticeBedStatusDetails({
  show,
  handleCloseBed,
  currentItem,
  showBooking,
  showNoticeperiodCheckout,
  showchangeBed,
  showfinalsettelemnet,
  floorName
  // handleShowCheck_In,
}) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [customer, setCustomer] = useState([])
  const [customerId, setCustomerId] = useState("")

  const [activeMenu, setActiveMenu] = useState(null);
  const [recheckin, setRecheckin] = useState(false)
  const [bactocheckinForm, setBacktoCheckInForm] = useState(false)
  const [makeasinactive , setMakeasInactive] = useState(false)

  const [customer_details, setCustomerDetails] = useState({})
  const [noticePeriodCustomer, setNoticePeriodCustomer] = useState([])
  const [reservedCustomer, setReservedCustomer] = useState([])
   const [reserve_customer_details, setReserveCustomerDetails] = useState({})


  console.log("noticeperiodcustomer", noticePeriodCustomer);
  
  const popupRef = useRef(null);

  const handleShowDots = (type) => {
    setActiveMenu((prev) => (prev === type ? null : type));
  }

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveMenu(null);
    }
  }

  const handleRecheckInBed = () => {
    setBacktoCheckInForm(true)
    setRecheckin(true)
  }

  const handleCheckout = () => {
    showNoticeperiodCheckout(true, customerId)
    dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
    })
  }

  const handlechangeBed = () => {
      showchangeBed(true , reservedCustomer[0]?.id)
  }

  const handleMakeAsInactive = () => {
    console.log("bookinginactive");
      setMakeasInactive(true)

  }


const handleNewBooking = () => {
    showBooking(true)
  }
  console.log("customerId",customerId)

const handleFinalsettelmentGenerate = () => {
 
    showfinalsettelemnet(true, customerId)
    console.log("customerId",customerId)

    if(customerId && currentItem?.room.Hostel_Id){
   dispatch({
      type: "GETCONFIRMCHECKOUTCUSTOMER",
      payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
    });
    }
 
  }

  // const [detuction, setDetuction] = useState("")

  // useEffect(() => {
  //   if (state?.UsersList?.Deduction) {
  //     setDetuction(state?.UsersList?.Deduction)
  //   }

  //   setTimeout(() => {
  //     dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
  //   }, 500);
  // }, [state?.UsersList?.Deduction]);

  useEffect(() => {

    const Hostel_Id = currentItem?.room.Hostel_Id;
    const Floor_Id = currentItem?.room.Floor_Id;
    const Bed_Id = currentItem?.bed.id;
    const Room_Id = currentItem?.room.Room_Id;


    if (Hostel_Id && Floor_Id && Bed_Id && Room_Id) {

      dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { hostel_id: Hostel_Id, floor_id: Floor_Id, room_id: Room_Id, bed: Bed_Id } })
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: Hostel_Id },
      });
    }
  }, [currentItem])

 

    const matchingUser = state.UsersList?.Users?.find(
  (user) => user.ID === noticePeriodCustomer[0]?.id
);

console.log("Matching User Details:", matchingUser);
 const matchingUserreserved = state.UsersList?.Users?.find(
  (user) => user.ID === reservedCustomer[0]?.id
);

console.log("Matching User Details:", matchingUser);

  useEffect(() => {
    if (state.Booking.StatusCodeInactiveCode === 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: currentItem?.room.Floor_Id, hostel_Id: currentItem?.room.Hostel_Id } })
      dispatch({ type: 'HOSTELLIST' })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_BOOKING_InActive' })
      }, 1000)

    }

  }, [state.Booking.StatusCodeInactiveCode])



  useEffect(() => {
    if (state.PgList.OccupiedCustomerGetStatusCode === 200) {

      setCustomer(state.PgList.OccupiedCustomer)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE' })
      }, 2000)
    }

  }, [state.PgList.OccupiedCustomerGetStatusCode])


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
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: currentItem?.room.Floor_Id, hostel_Id: currentItem?.room.Hostel_Id } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 500);
    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);

  useEffect(() => {
    const usersList = state?.UsersList?.Users
    const userDetails = customer

    const ParticularcustomerDetails = userDetails.filter((user) => user.user_status === "NoticePeriod")
    const ReservedcustomerDetails = userDetails.filter((user) => user.user_status === "Booking")
    setNoticePeriodCustomer(ParticularcustomerDetails || {})
    setReservedCustomer(ReservedcustomerDetails || {})
    setCustomerId(userDetails[0]?.id)


    if (
      Array.isArray(usersList) &&
      Array.isArray(ParticularcustomerDetails) &&
      usersList.length > 0 &&
      ParticularcustomerDetails.length > 0
    ) {
      const targetUserId = ParticularcustomerDetails[0]?.User_Id?.trim()?.toLowerCase();

      const foundCustomer = usersList.find(
        (user) => user.User_Id?.trim()?.toLowerCase() === targetUserId
      );

      setCustomerDetails(foundCustomer || null);
    }
        if (
      Array.isArray(usersList) &&
      Array.isArray(ReservedcustomerDetails) &&
      usersList.length > 0 &&
      ReservedcustomerDetails.length > 0
    ) {
      const targetUserId = ReservedcustomerDetails[0]?.User_Id?.trim()?.toLowerCase();

      const foundCustomer = usersList.find(
        (user) => user.User_Id?.trim()?.toLowerCase() === targetUserId
      );

      setReserveCustomerDetails(foundCustomer || null);
    }
  }, [state?.UsersList?.Users, customer]);

  const JoiningDate = dayjs(noticePeriodCustomer?.[0]?.Date).format("DD MMM YYYY");
  const BookingDate = dayjs(reservedCustomer?.[0]?.Date).format("DD MMM YYYY");
  console.log("reserve", reservedCustomer);
  

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
                  {/* <div className="d-flex align-items-center gap-3">
                    <label style={{
                      fontSize: 14,
                      color: "#1E45E1",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}>Room No {currentItem?.room.Room_Name} </label> <span style={{
                      fontSize: 14,
                      color: "#1E45E1",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}>|</span> <span style={{
                      fontSize: 14,
                      color: "#1E45E1",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}> Bed  {currentItem?.bed.bed_no}</span>
                  </div> */}



                             <div className="d-flex flex-wrap gap-2 ">

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#FFEFCF",
                                padding: "6px 12px",
                                borderRadius: "60px",
                                fontFamily: "Gilroy",
                                fontSize: 12,
                                color: "#222",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                              }}
                            >
                             {floorName} 
                            </div>

                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#FFE0D9",
                                padding: "6px 12px",
                                borderRadius: "60px",
                                fontFamily: "Gilroy",
                                fontSize: 12,
                                color: "#222",
                                fontWeight: 500,
                                whiteSpace: "nowrap",
                              }}
                            >
                             {currentItem?.room.Room_Name} - {currentItem?.bed.bed_no}
                            </div>


                          </div>
                </div>

                {/* <div onClick={() => handleShowDots(1)}
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
                    backgroundColor: "white",
                  }}>
                  <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                  {String(activeRoomId) === String(1) && (
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
                        className="d-flex gap-2 align-items-center"
                        onClick={() => handleRecheckInBed()}


                        style={{
                          padding: "10px",
                          borderTopLeftRadius: 10,
                          borderTopRightRadius: 10,
                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >

                        <img src={CalenderTick} alt="Re-Assign Bed" />
                        <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>Re-Check-in Bed</label>
                      </div>

                      <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />


                      <div
                        className="d-flex gap-2 align-items-center"
                        onClick={() => handleNewBooking()}

                        style={{
                          padding: "10px",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,

                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <img src={TimerPause} alt="booking"></img>
                        <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>New Booking</label>
                      </div>

                      <div
                        className="d-flex gap-2 align-items-center"
                        onClick={() => handleCheckout(currentItem)}

                        style={{
                          padding: "10px",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,

                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <img src={logout} alt="Checkout" />
                        <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}> {detuction.DueAmount ? "Write-Off" : "Check-Out"}</label>
                      </div>
                      <div
                        className="d-flex gap-2 align-items-center"
                        onClick={() => handleFinalsettelmentGenerate(currentItem)}

                        style={{
                          padding: "10px",
                          borderBottomLeftRadius: 10,
                          borderBottomRightRadius: 10,

                          cursor: "pointer"
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                      >
                        <img src={logout} alt="Checkout" />
                        <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>Generate</label>
                      </div>
                    </div>
                  )}
                </div> */}

              </div>
            </Modal.Header>

            <Modal.Body style={{ padding: "5px 20px" }}>

              {/* <div className="row mt-1">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">

                  <label
                    style={{
                      fontSize: 16,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                    className="mt-0 mb-1"
                  >
                    {noticePeriodCustomer && noticePeriodCustomer.length > 0 &&
                      reservedCustomer && reservedCustomer.length > 0
                      ? "Currently Occupied by"
                      : "Occupied by"}
                  </label>


                  <div className="d-flex gap-3 align-items-center">
                    <div>
                      <Image src={noticePeriodCustomer[0]?.profile && noticePeriodCustomer[0]?.profile !== "0" ? noticePeriodCustomer[0]?.profile : Profile} roundedCircle style={{ height: 50, width: 50 }} alt="image" />
                    </div>
                    <div className="mt-2">
                      <div>
                        <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600 }} >{noticePeriodCustomer?.[0]?.Name || "N/A"}</label>
                      </div>
                      <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {noticePeriodCustomer?.[0]?.Phone
                          ? `+${String(noticePeriodCustomer[0].Phone).slice(0, -10)} ${String(noticePeriodCustomer[0].Phone).slice(-10)}`
                          : "No phone"}
                      </label></div>
                    </div>
                  </div>




                </div>


              </div> */}

              <div className="row mt-1">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">


                  <div className="d-flex justify-content-between align-items-center">
                    <label
                      style={{
                        fontSize: 16,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                      className="mt-0 mb-1"
                    >
                      {noticePeriodCustomer && noticePeriodCustomer.length > 0 &&
                        reservedCustomer && reservedCustomer.length > 0
                        ? "Currently Occupied by"
                        : "Occupied by"}
                    </label>

                    <div onClick={() => handleShowDots('occupied')} style={{
                      cursor: "pointer",
                      height: 40,
                      width: 40,
                      borderRadius: 100,
                      border: "1px solid #EFEFEF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "relative",
                      zIndex: activeMenu === 'occupied' ? 1000 : "auto",
                      // backgroundColor: "white",
                       backgroundColor: activeMenu === 'occupied'? "#E7F1FF" : "white",
                    }}>
                      <HiDotsHorizontal style={{ height: 20, width: 20, cursor: "pointer" }} />
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
                          {/* Re-Check-in */}
                          <div
                            className="d-flex gap-2 align-items-center"
                            onClick={() => handleRecheckInBed()}
                            style={{
                              padding: "10px",
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <img src={CalenderTick} alt="Re-Assign Bed" />
                            <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>
                              Cancel checkout
                            </label>
                          </div>

                          <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />
                          {reservedCustomer && reservedCustomer?.length === 0 && 
                         
                          <div
              className="d-flex gap-2 align-items-center"
              onClick={() => handleNewBooking()}
              style={{
                padding: "10px",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <img src={TimerPause} alt="booking" />
              <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>
                New Booking
              </label>
            </div>
             }
 
                       { customer_details.bed_status === "Generated" && 
                          <div
                            className="d-flex gap-2 align-items-center"
                            onClick={() => handleCheckout(currentItem)}
                            style={{
                              padding: "10px",
                              borderBottomLeftRadius: 10,
                              borderBottomRightRadius: 10,
                              cursor: "pointer",
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <img src={logout} alt="Checkout" />
                            <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>
                              {/* {detuction.DueAmount ? "Write-Off" : "Check-Out"} */}
                              Check-Out
                            </label>
                          </div>
}

      { customer_details.bed_status === "Notice period" && 
               <div
              className="d-flex gap-2 align-items-center"
              onClick={() => handleFinalsettelmentGenerate(currentItem)}
              style={{
                padding: "10px",
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
            >
              <img src={logout} alt="Generate" />
              <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>
                Generate
              </label>
            </div>
      }
                 

                        </div>
                      )}
                    </div>
                  </div>

                  {/* Customer info */}
                    <div className="d-flex flex-row justify-content-between">
                  <div className="d-flex gap-3 align-items-center mt-2">
                    <div>
                      <Image
                        // src={
                        //   noticePeriodCustomer[0]?.profile && noticePeriodCustomer[0]?.profile !== "0"
                        //     ? noticePeriodCustomer[0]?.profile
                        //     : Profile
                        // }
                        // roundedCircle
                        // style={{ height: 50, width: 50 }}
                        // alt="image"
                          src={
                                                                      matchingUser  && matchingUser?.profile &&matchingUser.profile !== ""
                                                                        ? typeof matchingUser?.profile === "string"
                                                                          ? matchingUser.profile.startsWith("/9j/") 
                                                                            ? `data:image/jpeg;base64,${matchingUser.profile}`
                                                                            : matchingUser?.profile 
                                                                          : URL.createObjectURL(matchingUser?.profile) 
                                                                        : Profile
                                                                    }
                                                                    alt="Profile"
                                                                    roundedCircle
                                                                    style={{ height: 60, width: 60 }}
                                                                    onError={(e) => {
                                                                      e.target.onerror = null;
                                                                      e.target.src = Profile;
                                                                    }}
                      />
                    </div>
                    <div className="mt-2">
                      <div>
                        <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600 }}>
                          {noticePeriodCustomer?.[0]?.Name || "N/A"}
                        </label>
                      </div>
                      <div>
                        <label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>
                          {noticePeriodCustomer?.[0]?.Phone
                            ? `+${String(noticePeriodCustomer[0].Phone).slice(0, -10)} ${String(noticePeriodCustomer[0].Phone).slice(-10)}`
                            : "No phone"}
                        </label>
                      </div>
                    </div>
                  </div>
                   <div className="mt-2">
                            <div>
                              <label
                                style={{
                                  fontSize: 18,
                                  color: "rgba(34, 34, 34, 1)",
                                  fontFamily: "Gilroy",
                                  fontWeight: 400,
                                }}
                              >
                                 ₹ {noticePeriodCustomer?.[0]?.RoomRent}
                              </label>
                            </div>
                            <div>
                              <label
                                style={{
                                  fontSize: 16,
                                  color: "rgba(75, 75, 75, 1)",
                                  fontFamily: "Gilroy",
                                  fontWeight: 400,
                                }}
                              >
                                
                                {JoiningDate || "N/A"}
                              </label>
                            </div>
                          
                          </div>
                          </div>
                </div>
              </div>


              {
                reservedCustomer && reservedCustomer.length > 0 && (
                  <>
                    <div className="row mt-1">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <div className="d-flex justify-content-between align-items-center">
                          <label
                            style={{
                              fontSize: 16,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                            className="mt-0 mb-1"
                          >
                            Reserved by
                          </label>



                          <div onClick={() => handleShowDots('reserved')}
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
                              zIndex: activeMenu === 'reserved' ? 1000 : "auto",
                              backgroundColor: activeMenu === 'reserved'? "#E7F1FF" : "white",
                            }}>
                            <HiDotsHorizontal style={{ height: 20, width: 20 }} />
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

                                {/* <div
                                className="d-flex gap-2 align-items-center"
                                style={{
                                  padding: "10px",
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  cursor: noticePeriodCustomer && noticePeriodCustomer.length > 0 ? "not-allowed" : "pointer",
                                  opacity: noticePeriodCustomer && noticePeriodCustomer.length > 0 ? 0.5 : 1,
                                  position: "relative"
                                }}
                                onClick={noticePeriodCustomer && noticePeriodCustomer.length > 0 ? undefined : () => handleCheckin()}
                                onMouseEnter={e => {
                                  if (noticePeriodCustomer && noticePeriodCustomer.length > 0) {
                                    const tooltip = e.currentTarget.querySelector('.checkin-tooltip');
                                    if (tooltip) tooltip.style.display = 'flex';
                                  } else {
                                    e.currentTarget.style.backgroundColor = "#F0F4FF";
                                  }
                                }}
                                onMouseLeave={e => {
                                  if (noticePeriodCustomer && noticePeriodCustomer.length > 0) {
                                    const tooltip = e.currentTarget.querySelector('.checkin-tooltip');
                                    if (tooltip) tooltip.style.display = 'none';
                                  } else {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                  }
                                }}
                              >
                                <AddCircle size="18" color="#1E45E1" />
                                <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: noticePeriodCustomer && noticePeriodCustomer.length > 0 ? "not-allowed" : "pointer" }}>Check-In</label>
                             
                                {noticePeriodCustomer && noticePeriodCustomer.length > 0 && (
                                

                                  <span
                                    className="checkin-tooltip"
                                    style={{
                                      display: 'none',
                                      position: 'absolute',
                                      right: '45px',
                                      top: '-100px',
                                      background: '#FFFFFF',
                                      border: '1px solid #E0E0E0',
                                      borderRadius: 8,
                                      padding: '8px 12px',
                                      color: '#222222',
                                      fontSize: 13,
                                      fontWeight: 500,
                                      lineHeight: '18px',
                                      letterSpacing: '0.2px',
                                      minWidth: 200,
                                      maxWidth: 220,
                                      whiteSpace: 'normal',
                                      zIndex: 2000,
                                      display: 'flex',
                                      alignItems: 'flex-start',
                                      gap: 6,
                                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                                    }}
                                  >
                                    <InfoCircle
                                      size="16"
                                      color="#1E45E1"
                                      style={{ marginTop: 2, flexShrink: 0 }}
                                    />
                                    <span>
                                      Complete the Checkout Process for the Occupied tenant, then the button will appear
                                    </span>
                                  </span>
                                )}
                              </div> */}

                                <div
                                  className="d-flex gap-2 align-items-center"
                                  style={{
                                    padding: "10px",
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    cursor: noticePeriodCustomer && noticePeriodCustomer.length > 0 ? "not-allowed" : "pointer",
                                    opacity: noticePeriodCustomer && noticePeriodCustomer.length > 0 ? 0.5 : 1,
                                    position: "relative"
                                  }}
                                  // onClick={noticePeriodCustomer && noticePeriodCustomer.length > 0 ? undefined : () => handleCheckin()}
                                  onMouseEnter={e => {
                                    if (noticePeriodCustomer && noticePeriodCustomer.length > 0) {
                                      const tooltip = e.currentTarget.querySelector('.checkin-tooltip');
                                      if (tooltip) tooltip.style.display = 'flex'; 
                                    } else {
                                      e.currentTarget.style.backgroundColor = "#F0F4FF";
                                    }
                                  }}
                                  onMouseLeave={e => {
                                    if (noticePeriodCustomer && noticePeriodCustomer.length > 0) {
                                      const tooltip = e.currentTarget.querySelector('.checkin-tooltip');
                                      if (tooltip) tooltip.style.display = 'none'; 
                                    } else {
                                      e.currentTarget.style.backgroundColor = "transparent";
                                    }
                                  }}
                                >
                                  <AddCircle size="18" color="#1E45E1" />
                                  <label
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 500,
                                      color: "#222222",
                                      marginBottom: 0,
                                      fontFamily: "Gilroy",
                                      cursor: noticePeriodCustomer && noticePeriodCustomer.length > 0 ? "not-allowed" : "pointer"
                                    }}
                                  >
                                    Check-In
                                  </label>

                                  {noticePeriodCustomer && noticePeriodCustomer.length > 0 && (
                                    <span
                                      className="checkin-tooltip"
                                      style={{
                                        display: 'none', 
                                        position: 'absolute',
                                        right: '45px',
                                        top: '-100px',
                                        background: '#FFFFFF',
                                        border: '1px solid #E0E0E0',
                                        borderRadius: 8,
                                        padding: '8px 12px',
                                        color: '#222222',
                                        fontSize: 13,
                                        fontWeight: 500,
                                        lineHeight: '18px',
                                        letterSpacing: '0.2px',
                                        minWidth: 200,
                                        maxWidth: 220,
                                        whiteSpace: 'normal',
                                        zIndex: 2000,
                                        alignItems: 'flex-start',
                                        gap: 6,
                                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.12)',
                                      }}
                                    >
                                      <InfoCircle
                                        size="16"
                                        color="#1E45E1"
                                        style={{ marginTop: 2, flexShrink: 0 }}
                                      />
                                      <span>
                                        Complete the Checkout Process for the Occupied tenant, then the button will appear
                                      </span>
                                    </span>
                                  )}
                                </div>


                                <div
                                  className="d-flex gap-2 align-items-center"
                                  onClick={() => handlechangeBed()}

                                  style={{
                                    padding: "10px",
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    cursor: "pointer"
                                  }}
                                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                >

                                  <img src={exchange} alt="Re-Assign Bed" />
                                  <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>Change Bed</label>
                                </div>

                                <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />


                                <div
                                  className="d-flex gap-2 align-items-center"
                                  
                                  onClick={()=> handleMakeAsInactive ()}
                                  style={{
                                    padding: "10px",
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,

                                    cursor: "pointer"
                                  }}
                                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                                >
                                  <LogoutCurve
                                    size="18"
                                    color="#FF9500"
                                  />                                        
                                      <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>Make as Inactive</label>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                       <div className="d-flex flex-row justify-content-between">
                        <div className="d-flex gap-3 align-items-center">
                          <div>
                            <Image
                              // src={
                              //   reservedCustomer[0]?.profile &&
                              //     reservedCustomer[0]?.profile !== "0"
                              //     ? reservedCustomer[0]?.profile
                              //     : Profile
                              // }
                              // roundedCircle
                              // style={{ height: 50, width: 50 }}
                              // alt="image"

                                src={
                                                                      matchingUserreserved  && matchingUserreserved?.profile &&matchingUserreserved.profile !== ""
                                                                        ? typeof matchingUserreserved?.profile === "string"
                                                                          ? matchingUserreserved.profile.startsWith("/9j/") 
                                                                            ? `data:image/jpeg;base64,${matchingUserreserved.profile}`
                                                                            : matchingUserreserved?.profile 
                                                                          : URL.createObjectURL(matchingUserreserved?.profile) 
                                                                        : Profile
                                                                    }
                                                                    alt="Profile"
                                                                    roundedCircle
                                                                    style={{ height: 60, width: 60 }}
                                                                    onError={(e) => {
                                                                      e.target.onerror = null;
                                                                      e.target.src = Profile;
                                                                    }}

                            />
                          </div>
                          <div className="mt-2">
                            <div>
                              <label
                                style={{
                                  fontSize: 18,
                                  color: "#1E45E1",
                                  fontFamily: "Gilroy",
                                  fontWeight: 600,
                                }}
                              >
                                {reservedCustomer?.[0]?.Name || "N/A"}
                              </label>
                            </div>
                            <div>
                              <label
                                style={{
                                  fontSize: 16,
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                }}
                              >
                                {reservedCustomer?.[0]?.Phone
                                  ? `+${String(reservedCustomer[0].Phone).slice(0, -10)} ${String(
                                    reservedCustomer[0].Phone
                                  ).slice(-10)}`
                                  : "No phone"}
                              </label>
                            </div>
                          </div>
                        </div>

                         <div className="mt-2">
                            <div>
                              <label
                                style={{
                                  fontSize: 18,
                                  color: "rgba(34, 34, 34, 1)",
                                  fontFamily: "Gilroy",
                                  fontWeight: 400,
                                }}
                              >
                                 ₹ {reservedCustomer?.[0]?.Booking_Amount}
                              </label>
                            </div>
                            <div>
                              <label
                                style={{
                                  fontSize: 16,
                                  color: "rgba(75, 75, 75, 1)",
                                  fontFamily: "Gilroy",
                                  fontWeight: 400,
                                }}
                              >
                                
                                {BookingDate || "N/A"}
                              </label>
                            </div>
                          
                          </div>
                          </div>

                      </div>
                    </div>
                  </>

                )}
            </Modal.Body>
            {/* <Modal.Footer style={{ border: "none", padding: 15 }} className="mt-1">
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
            </Modal.Footer> */}
            <Modal.Footer style={{ border: "none", padding: 15 }} className="mt-1">
              {(() => {
                const baseBtnStyle = {
                  fontWeight: 600,
                  borderRadius: 60,
                  fontSize: 16,
                  fontFamily: "Gilroy",
                  padding: 10,
                  backgroundColor: "#fff",
                };

                const noticeBtn = (
                  <Button
                    className="flex-fill m-0"
                    style={{
                      ...baseBtnStyle,
                      color: "red",
                      border: "1px solid red",
                    }}
                  >
                    Notice Period
                  </Button>
                );

                const reservedBtn = (
                  <Button
                    className="flex-fill m-0"
                    style={{
                      ...baseBtnStyle,
                      color: "#1E45E1",
                      border: "1px solid #1E45E1",
                    }}
                  >
                    Reserved
                  </Button>
                );

                if (noticePeriodCustomer?.length > 0 && reservedCustomer?.length > 0) {

                  return <div className="d-flex w-100 gap-2">{noticeBtn}{reservedBtn}</div>;
                } else if (noticePeriodCustomer?.length > 0) {

                  return <div className=" d-flex w-100">{noticeBtn}</div>;
                } else if (reservedCustomer?.length > 0) {

                  return <div className="w-100">{reservedBtn}</div>;
                }
                return null;
              })()}
            </Modal.Footer>

          </Modal.Dialog>
        </Modal>
      </div>

      {
        bactocheckinForm && <UserlistForm setBacktoCheckInForm={setBacktoCheckInForm} bactocheckinForm={bactocheckinForm}
          customer_details={customer_details}
          handleCloseBed={handleCloseBed} recheckin={recheckin}
        />
      }

       {
                      makeasinactive && <UserList  setMakeasInactive={setMakeasInactive} makeasinactive={makeasinactive}
                       customer_details = {reserve_customer_details}
                       customer={customer}
                      handleCloseBed = {handleCloseBed}
                      />
                  }

    </>
  );
}
NoticeBedStatusDetails.propTypes = {
  handleCloseBed: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  showNoticeperiodCheckout: PropTypes.func.isRequired,
  showBooking: PropTypes.func.isRequired,
  showfinalsettelemnet: PropTypes.func.isRequired,
  showchangeBed:PropTypes.func.isRequired,
   floorName:PropTypes.func.isRequired,

};
export default NoticeBedStatusDetails;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "../../../Pages/AssetFile/addAsset.css";
import PropTypes from "prop-types";
import Profile from '../../../Assets/Images/New_images/profile-picture.png'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from 'react-redux';
import Image from 'react-bootstrap/Image';
import "../../../Pages/AssetFile/addAsset.css";
import CalenderTick from "../../../Assets/Images/New_images/calendar-tick.svg";
import TimerPause from "../../../Assets/Images/New_images/timer-pause.svg";
import logout from "../../../Assets/Images/New_images/logout.svg";
import UserlistForm from "../../CustomerFile/UserlistForm";


function NoticeBedStatusDetails({
    show,
    handleCloseBed,
    currentItem,
    showBooking,
    showNoticeperiodCheckout
}) {


           const state = useSelector(state => state)
          const dispatch = useDispatch();

          const [customer, setCustomer] = useState([])
          const [customerId, setCustomerId] = useState("")
          
    const [showDots, setShowDots] = useState('')
    const [activeRoomId, setActiveRoomId] = useState(null);
     const [recheckin , setRecheckin] = useState(false)
    const [bactocheckinForm,setBacktoCheckInForm] = useState(false)

      const [customer_details , setCustomerDetails] = useState({})
      
    const popupRef = useRef(null);
    
            

     console.log(currentItem,"currentItem")



    const handleShowDots = (roomId) => {
        setShowDots(!showDots)
        setActiveRoomId(activeRoomId === roomId ? null : roomId);
    }




    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setActiveRoomId(null);
        }
    };

  


   

    const handleRecheckInBed = () => {
         setBacktoCheckInForm(true)
         setRecheckin(true)
    }

 



  const handleNewBooking = () => {
       showBooking(true)    
  }
 
  const handleCheckout = () => {
  
      showNoticeperiodCheckout(true, customerId )
      dispatch({
        type: "GETCONFIRMCHECKOUTCUSTOMER",
        payload: { id: customerId, hostel_id: currentItem?.room.Hostel_Id },
      });
    
     
  }

     
        //     useEffect(() => {
        
        //         const Hostel_Id = currentItem?.room.Hostel_Id;
        //         const Floor_Id = currentItem?.room.Floor_Id;
        //         const Bed_Id = currentItem?.bed.id;
        //         const Room_Id = currentItem?.room.Room_Id;
        
        
        //         if (Hostel_Id && Floor_Id && Bed_Id && Room_Id) {
                  
        //             dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { hostel_id: Hostel_Id, floor_id: Floor_Id, room_id: Room_Id, bed: Bed_Id } })
        //              dispatch({
        //   type: "USERLIST",
        //   payload: { hostel_id: Hostel_Id },
        // });
        //         }
        //     }, [currentItem])

 

              useEffect(()=>{
                if(state.Booking.StatusCodeInactiveCode === 200){
                  // dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: currentItem?.room.Floor_Id, hostel_Id: currentItem?.room.Hostel_Id } })
                  // dispatch({ type: 'HOSTELLIST' })
               
                   setTimeout(() => {
                        dispatch({ type: 'CLEAR_BOOKING_InActive' })
                      }, 1000)
              
                }
              
              },[state.Booking.StatusCodeInactiveCode])



            // useEffect(() => {
            //     if (state.PgList.OccupiedCustomerGetStatusCode === 200) {
                   
            //         setCustomer(state.PgList.OccupiedCustomer)
            //         setCustomerId(state.PgList.OccupiedCustomer[0]?.id)
            //         setTimeout(() => {
            //             dispatch({ type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE' })
            //         }, 2000)
            //     }
        
            // }, [state.PgList.OccupiedCustomerGetStatusCode])

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

      useEffect(() => {
    const usersList = state?.UsersList?.Users;
    const userDetails = customer; 
    

     const ParticularcustomerDetails = userDetails.filter((user)=> user.RoomRent > 0)
       
        setCustomerId(ParticularcustomerDetails[0]?.id)
       
    
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
}, [state?.UsersList?.Users, customer]);
  



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
                    }}>Room No : {""}
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
                    }}> Bed : {""} 
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
                        <label style={{ fontSize: 14, fontWeight: 500, color: "#222222", marginBottom: 0, fontFamily: "Gilroy", cursor: "pointer" }}>Checkout</label>
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
                      <Image src={currentItem?.profilePic && currentItem?.profilePic !== "0" ? currentItem?.profilePic : Profile} roundedCircle style={{ height: 50, width: 50 }} alt="image" />
                    </div>
                    <div className="mt-2">
                      <div>
                        <label style={{ fontSize: 18, color: "#1E45E1", fontFamily: "Gilroy", fontWeight: 600 }} >{currentItem?.fullName || "N/A"}</label>
                      </div>
                      <div><label style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}>
                                                       {currentItem?.customerMobile
                    ? `+${String(currentItem?.customerMobile).slice(0, -10)} ${String(currentItem?.customerMobile).slice(-10)}`
                    : "No phone"}
                        </label></div>
                    </div>
                  </div>




                </div>


              </div>
            </Modal.Body>
                   <Modal.Footer style={{ border: "none", padding: 15 }} className="mt-1">
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
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </div>

            {
             bactocheckinForm && <UserlistForm  setBacktoCheckInForm={setBacktoCheckInForm} bactocheckinForm={bactocheckinForm}
             customer_details = {customer_details}
             handleCloseBed = {handleCloseBed} recheckin={recheckin}
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
    showBooking: PropTypes.func.isRequired

};
export default NoticeBedStatusDetails;

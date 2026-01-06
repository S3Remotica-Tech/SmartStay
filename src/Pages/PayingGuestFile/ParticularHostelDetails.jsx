/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import AddRoom from './AddRoom';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteRoom from './DeleteRoom';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { Edit, Trash } from 'iconsax-react';
import PropTypes from "prop-types"
// import Select from "react-select";
import "./ParticularHostelDetails.css";
import BedDetailsMap from './BedDetailsMap';
import { useHasPermission } from '../../Utils/Permission';

function ParticularHostelDetails(props) {




  const dispatch = useDispatch();
  const state = useSelector((state) => state);




  const [showDots, setShowDots] = useState('')
  const [roomList, setRoomList] = useState([])
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [loader, setLoader] = useState(false)
  const [loaderTrigger, setLoaderTrigger] = useState(true);
  const [showRoom, setShowRoom] = useState(false)
  const [hostelDetails, setHostelDetails] = useState({ room: null, selectedFloor: null });
  const [showDeleteRoom, setShowDeleteRoom] = useState(false)
  const [deleteRoomDetails, setDeleteRoomDetails] = useState({ hostel_Id: null, floor_Id: null, room_Id: null })
  const [editRoom, setEditRoom] = useState({ hostel_Id: null, floor_Id: null, room_Id: null, Room_Name: null })
const [selectedBed, setSelectedBed] = useState(null);






  // const canWritePayingGuests = useHasPermission("Paying Guests", "canWrite");
  // const canUpdatePayingGuests = useHasPermission("Paying Guests", "canUpdate");
  // const canDeletePayingGuests = useHasPermission("Paying Guests", "canDelete");


  const {
    canWriteModule: canWritePayingGuests,
    // canReadModule: canReadExpense,
    canUpdateModule: canUpdatePayingGuests,
    canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");









  const handleShowDots = (roomId) => {
    setShowDots(!showDots)
    setActiveRoomId(activeRoomId === roomId ? null : roomId);
  }




  const popupRef = useRef(null);


  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveRoomId(null);
    }
  };









  const handleShowAddRoom = (floor_Id, hostel_Id) => {
    setShowRoom(true)
    setHostelDetails({ hostel_Id, floor_Id });
    setEditRoom({ hostel_Id: null, floor_Id: null, room_Id: null, Room_Name: null })

  }
  const handlecloseRoom = () => {
    setShowRoom(false)
  }



  const handleDeleteRoom = (Hostel_Id, Floor_Id, Room_Id) => {
    setShowDeleteRoom(true)
    setDeleteRoomDetails({ Hostel_Id, Floor_Id, Room_Id })
  }


  const handleCloseDeleteRoom = () => {
    setShowDeleteRoom(false)
  }





  const handleEditRoom = (Hostel_Id, Floor_Id, Room_Id, Room_Name) => {
    setShowRoom(true)
    setEditRoom({ hostel_Id: Hostel_Id, floor_Id: Floor_Id, room_Id: Room_Id, Room_Name: Room_Name })
    setHostelDetails({ room: null, selectedFloor: null })
  }







  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 2000);
    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);



  useEffect(() => {
    if (props.floorID && props.hostel_Id) {
      setLoader(true)
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
    }
   
  }, [props.hostel_Id, props.floorID, state?.login?.selectedHostel_Id])


  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setRoomList(state.PgList?.roomsList);
      setLoaderTrigger(false)
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_ALL_ROOMS_STATUS_CODE' })
      }, 100)
    }

  }, [state?.PgList?.getAllRoomSuccessStatus])

  useEffect(() => {
    setLoaderTrigger(false)
    setLoader(false)
  }, [state.PgList?.roomsList])


  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
      if (props.floorID) {
        dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      }
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES' })
        dispatch({ type: 'REMOVE_STATUS_CODE_FOR_CREATE_CUSTOMER_SAVE_INFO' })
      }, 2000)
      dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

    }
  }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);


  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom === 200) {

      if (props.floorID) {
        dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      }


      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ROOM" });
      }, 100);
    }
  }, [state.PgList.statusCodeForDeleteRoom]);

  useEffect(() => {

    if (state.PgList.statusCodeCreateRoom === 201 || state.PgList.statusCodeUpdateRoom === 200) {
      if (props.floorID) {
        dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      }
      setShowRoom(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_ROOM_STATUS_CODE' })
        dispatch({ type: 'REMOVE_UPDATE_ROOM'})
      }, 100)
    }
  }, [state.PgList.statusCodeCreateRoom, state.PgList.statusCodeUpdateRoom])

  useEffect(() => {
    if (state.PgList.createBedStatusCode === 201 || state.PgList.updateBedStatusCode === 201) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_BED_STATUS_CODE' })
      }, 100)
    }
  }, [state.PgList.createBedStatusCode, state.PgList.updateBedStatusCode])

  useEffect(() => {
    dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  }, [])



  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 201) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 3000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);



  useEffect(() => {
    if (state.UsersList.statusCodeForReassinBed === 200) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_REASSIGN_BED" });
      }, 3000);

    }
  }, [state.UsersList.statusCodeForReassinBed]);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200 || state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
        dispatch({ type: 'REMOVE_STATUS_CODE_FOR_CREATE_CUSTOMER_SAVE_INFO' })
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBookin, state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo])

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBookin])



  useEffect(() => {
    if (state.PgList.statusCodeDeleteBed === 200) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_BED_STATUS_CODE' })
      }, 2000)
    }

  }, [state.PgList.statusCodeDeleteBed])



  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          return;
        }
        else {
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader => {
      appearOnScro1l.observe(fader);
    })
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);



  useEffect(() => {
    if (state.UsersList.statusCodeForFinalSettlement === 201) {
      // handleCloseBed()
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      })
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_FINAL_GENERATE" });
      }, 500);

    }
  }, [state.UsersList.statusCodeForFinalSettlement])



  useEffect(() => {
    if (state.UsersList.statuscodeForConformCheckout === 200) {
      //  handleCloseBed()
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFORM_CHECKOUT" });
      }, 500);
    }
  }, [state.UsersList.statuscodeForConformCheckout])

  return (
    <>


      <div >

        <div className='mt-2 mb-2 d-flex  w-100 ' style={{ position: "relative" }}>
          {loader &&
            <div
               style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              left: '200px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
            >
              <div
                style={{
                  borderTop: '4px solid #1E45E1',
                  borderRight: '4px solid transparent',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  animation: 'spin 1s linear infinite',
                }}
              ></div>
            </div>}
        </div>

        <div className='container-fluid show-scroll' style={{ maxHeight: "480px", overflowY: "auto", marginTop: "-25px" }}>
          <div className='row mt-4 mb-2 row-gap-3' style={{ fontFamily: "Gilroy" }}>
            {roomList?.length > 0 && roomList?.map((room) => (
              <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center' key={room.id}>
                <Card className="w-100 h-100 fade-in" style={{ border: "1px solid #E6E6E6", borderRadius: 16, minHeight: 120 }}>
                  <Card.Header className="d-flex justify-content-between align-items-start" style={{ backgroundColor: "#E0ECFF", border: "1px solid #E6E6E6", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>


                    <div style={{ width: "110px" }}>
                      <div title={`Room No ${room.name}`} style={{ fontSize: 14, fontWeight: 600, color: "rgba(34, 34, 34, 1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {room.name}
                      </div>
                      <div style={{ fontSize: 12, fontWeight: 400, color: "#7C7C7C", marginTop: "-2px" }}>
                        {Array.isArray(state.PgList?.bedList?.[room.id])
                          ? `${state.PgList.bedList[room.id].length} sharing`
                          : "0 sharing"}
                      </div>
                    </div>






                    <div onClick={() => {
                      if (!state.login.isTrigger) handleShowDots(room.id)
                    }}
                      style={{ position: "relative", zIndex: showDots ? 1000 : 'auto', cursor: "pointer" }}>
                      <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                      {String(activeRoomId) === String(room.id) && (
                        <div
                          ref={popupRef}
                          className="position-absolute"
                          style={{
                            right: 0,
                            top: 30,
                            width: 140,
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
                            onClick={() => {
                              if (canUpdatePayingGuests) {
                                handleEditRoom(room.hostelId, room.floorId, room.id, room.name);
                              }
                            }}
                            style={{
                              padding: "10px",
                              borderTopLeftRadius: 10,
                              borderTopRightRadius: 10,
                              // pointerEvents: !canUpdatePayingGuests ? "none" : "auto",
                              opacity: !canUpdatePayingGuests ? 0.5 : 1,
                              cursor: !canUpdatePayingGuests ? "not-allowed" : "pointer"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <Edit size="16" color={!canUpdatePayingGuests ? "#888888" : "#1E45E1"} />
                            <label style={{ cursor: !canUpdatePayingGuests ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 500, color: !canUpdatePayingGuests ? "#888888" : "#222222", marginBottom: 0 }}>Edit</label>
                          </div>

                          <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />


                          <div
                            className="d-flex gap-2 align-items-center"
                            onClick={() => {
                              if (canDeletePayingGuests) {
                                handleDeleteRoom(room.hostelId, room.floorId, room.id);
                              }
                            }}
                            style={{
                              padding: "10px",
                              borderBottomLeftRadius: 10,
                              borderBottomRightRadius: 10,
                              opacity: !canDeletePayingGuests ? 0.5 : 1,
                              cursor: !canDeletePayingGuests ? "not-allowed" : "pointer"
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                          >
                            <Trash size="16" color={!canDeletePayingGuests ? "#888888" : "red"} />
                            <label style={{ cursor: !canDeletePayingGuests ? "not-allowed" : "pointer", fontSize: 14, fontWeight: 500, color: !canDeletePayingGuests ? "#888888" : "#FF0000", marginBottom: 0 }}>Delete</label>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card.Header>

                  <Card.Body>
                    <BedDetailsMap room={room} propsValue={props} 
                    selectedBed={selectedBed}
  setSelectedBed={setSelectedBed}/>
                  </Card.Body>


                </Card>
              </div>
            ))}

            {!loader && !loaderTrigger && roomList?.length === 0 && (
              <div className='d-flex flex-column align-items-center justify-content-center text-center w-100 px-3 fade-in'>
                <div>
                  <img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" />
                </div>
                <div className="pb-1 mt-1" style={{ fontWeight: 600, fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No rooms available</div>
                <div className="pb-1 mt-1" style={{ fontWeight: 500, fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There is no room added in this floor.</div>
                <div className='d-flex justify-content-center pb-1 mt-3'>
                  <Button
                    style={{
                      fontSize: 16,
                      backgroundColor: "#1E45E1",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: 12,
                      padding: "10px 20px",
                      fontFamily: "Gilroy"
                    }}
                    disabled={!canWritePayingGuests}
                    onClick={() => handleShowAddRoom(props.floorID, props.hostel_Id)}
                  >
                    + Add Room
                  </Button>
                </div>
              </div>
            )}

          </div>
        </div>


        {roomList.length > 0 && !state.login.isTrigger && <>
          <div className='row mt-4 ms-2'>
            <div>
              <label
                style={{
                  fontSize: 16,
                  color: !canWritePayingGuests ? "#A0A0A0" : "#1E45E1",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  cursor: !canWritePayingGuests ? "not-allowed" : "pointer",
                  opacity: !canWritePayingGuests ? 0.7 : 1,
                }}
                onClick={
                  canWritePayingGuests
                    ? () => handleShowAddRoom(props.floorID, props.hostel_Id)
                    : undefined
                }
              >
                + Add Rooms
              </label>

            </div>
          </div>
        </>


        }





        {showRoom && <AddRoom show={showRoom}
          handleClose={handlecloseRoom} hostelDetails={hostelDetails} editRoom={editRoom}
        />}

        {
          showDeleteRoom && <DeleteRoom show={showDeleteRoom} handleClose={handleCloseDeleteRoom} deleteRoomDetails={deleteRoomDetails} />
        }





      </div>


    </>
  )
}
ParticularHostelDetails.propTypes = {
  floorID: PropTypes.func.isRequired,
  hostel_Id: PropTypes.func.isRequired,
  deletePermissionError: PropTypes.func.isRequired,
  addPermissionError: PropTypes.func.isRequired,
  editPermissionError: PropTypes.func.isRequired,
};
export default ParticularHostelDetails




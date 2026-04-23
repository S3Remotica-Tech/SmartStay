/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddRoom from './AddRoom';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteRoom from './DeleteRoom';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { Edit, Trash } from 'iconsax-react';
import PropTypes from "prop-types"
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
  // const [loaderTrigger, setLoaderTrigger] = useState(true);
  const [showRoom, setShowRoom] = useState(false)
  const [hostelDetails, setHostelDetails] = useState({ room: null, selectedFloor: null });
  const [showDeleteRoom, setShowDeleteRoom] = useState(false)
  const [deleteRoomDetails, setDeleteRoomDetails] = useState({ hostel_Id: null, floor_Id: null, room_Id: null })
  const [editRoom, setEditRoom] = useState({ hostel_Id: null, floor_Id: null, room_Id: null, Room_Name: null })
  const [selectedBed, setSelectedBed] = useState(null);



  const {
    canWriteModule: canWritePayingGuests,
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

  console.log("roomList", roomList)



  const handleEditRoom = (Hostel_Id, Floor_Id, Room_Id, Room_Name) => {
    setShowRoom(true)
    setEditRoom({ hostel_Id: Hostel_Id, floor_Id: Floor_Id, room_Id: Room_Id, Room_Name: Room_Name })
    setHostelDetails({ room: null, selectedFloor: null })
  }

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
      dispatch({ type: 'REMOVE_GET_ALL_ROOMS_STATUS_CODE' })
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
    }

  }, [props.hostel_Id, props.floorID, state?.login?.selectedHostel_Id])

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      // setLoaderTrigger(false)
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setRoomList(state.PgList?.roomsList);
      // setLoaderTrigger(false)
      setLoader(false)
      dispatch({ type: 'REMOVE_GET_ALL_ROOMS_STATUS_CODE' })

    }

  }, [state?.PgList?.getAllRoomSuccessStatus])








  useEffect(() => {
    // setLoaderTrigger(false)
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
    if (state.UsersList.deleteFloorSuccessStatusCode === 200) {
      dispatch({ type: 'REMOVE_GET_ALL_ROOMS_STATUS_CODE' })
      if (props.floorID) {

        dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      }

      dispatch({ type: "CLEAR_DELETE_FLOOR" });

    }
  }, [state.UsersList.deleteFloorSuccessStatusCode]);







  console.log("state", state.PgList?.roomsList)


  useEffect(() => {

    if (state.PgList.statusCodeCreateRoom === 201 || state.PgList.statusCodeUpdateRoom === 200) {
      if (props.floorID) {
        dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      }
      setShowRoom(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_ROOM_STATUS_CODE' })
        dispatch({ type: 'REMOVE_UPDATE_ROOM' })
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
    if (state.PgList.statusCodeDeleteBed === 200 || state.PgList.statusCodeDeleteBed === 204) {
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
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: "CLEAR_FINAL_GENERATE" });
      }, 500);

    }
  }, [state.UsersList.statusCodeForFinalSettlement])



  useEffect(() => {
    if (state.UsersList.statuscodeForConformCheckout === 200) {
      dispatch({
        type: "USERLIST",
        payload: {
          hostel_id: state.login.selectedHostel_Id,
          size: 10,
          page: 1,
        },
      });
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: props.floorID } })
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFORM_CHECKOUT" });
      }, 500);
    }
  }, [state.UsersList.statuscodeForConformCheckout])

  return (
    <>

      <div>
        <div className="mt-2 mb-2 flex w-full h-full relative">
          {loader && (
            <div className="fixed inset-y-0 right-0 left-52 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-blue-700 border-r-4 border-transparent animate-spin"></div>
            </div>
          )}
        </div>

        <div className="lg:px-4 -mt-8">
        {/* <div className="lg:px-4 -mt-8 bg-white h-[400px] overflow-y-auto"> */}
          {roomList?.length > 0 ? (
            <>
              <div
                className="grid gap-3 mt-4 mb-2 font-gilroy grid-cols-1 md:grid-cols-2 2xl:grid-cols-4"
                style={{ maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}
              >
                {roomList.map((room) => (
                  <div key={room.id} className="flex justify-center">
                    <div className="w-full h-full fade-in border border-[#E6E6E6] rounded-xl min-h-[120px]">
                      <div
                        className="flex justify-between items-start bg-[#E0ECFF] border border-[#E6E6E6] rounded-t-xl p-2.5"
                      >
                        <div className="w-[110px]">
                          <div
                            title={`Room No ${room.name}`}
                            className="text-[14px] font-semibold text-[#222222] truncate"
                          >
                            {room.name}
                          </div>
                          <div className="text-[12px] font-normal text-[#7C7C7C] -mt-0.5">
                            {Array.isArray(state.PgList?.bedList?.[room.id])
                              ? `${state.PgList.bedList[room.id].length} sharing`
                              : "0 sharing"}
                          </div>
                        </div>

                        <div
                          onClick={() => {
                            if (!state.login.isTrigger) handleShowDots(room.id);
                          }}
                          className={`relative z-[${showDots ? 1000 : "auto"}] cursor-pointer`}
                        >
                          <PiDotsThreeOutlineVerticalFill className="h-5 w-5" />
                          {String(activeRoomId) === String(room.id) && (
                            <div
                              ref={popupRef}
                              className="absolute right-0 top-7 w-[140px] flex flex-col rounded-lg bg-[#f9f9f9] border border-[#EBEBEB] shadow-md z-50"
                            >
                              <div
                                onClick={() => {
                                  if (canUpdatePayingGuests) {
                                    handleEditRoom(
                                      room.hostelId,
                                      room.floorId,
                                      room.id,
                                      room.name
                                    );
                                  }
                                }}
                                className={`flex gap-2 items-center px-2.5 py-2.5 rounded-t-lg ${!canUpdatePayingGuests
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                                  }`}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor = "#F0F4FF")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor = "transparent")
                                }
                              >
                                <Edit
                                  size={16}
                                  color={!canUpdatePayingGuests ? "#888888" : "#1E45E1"}
                                />
                                <label
                                  className={`text-[14px] font-medium mb-0 ${!canUpdatePayingGuests
                                    ? "text-[#888888] cursor-not-allowed"
                                    : "text-[#222222] cursor-pointer"
                                    }`}
                                >
                                  Edit
                                </label>
                              </div>

                              <div className="h-px bg-[#E0E0E0]" />
                              <div
                                onClick={() => {
                                  if (canDeletePayingGuests) {
                                    handleDeleteRoom(room.hostelId, room.floorId, room.id);
                                  }
                                }}
                                className={`flex gap-2 items-center px-2.5 py-2.5 rounded-b-lg ${!canDeletePayingGuests
                                  ? "opacity-50 cursor-not-allowed"
                                  : "cursor-pointer"
                                  }`}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor = "#FFF3F3")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor = "transparent")
                                }
                              >
                                <Trash
                                  size={16}
                                  color={!canDeletePayingGuests ? "#888888" : "red"}
                                />
                                <label
                                  className={`text-[14px] font-medium mb-0 ${!canDeletePayingGuests
                                    ? "text-[#888888] cursor-not-allowed"
                                    : "text-[#FF0000] cursor-pointer"
                                    }`}
                                >
                                  Delete
                                </label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="p-2.5">
                        <BedDetailsMap
                          room={room}
                          propsValue={props}
                          selectedBed={selectedBed}
                          setSelectedBed={setSelectedBed}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {!state.login.isTrigger && (
                <div className="row mt-4 ms-2">
                  <div>
                    <label
                      className={`text-[16px] font-semibold font-montserrat ${!canWritePayingGuests
                        ? "text-gray-400 cursor-not-allowed opacity-70"
                        : "text-[#1E45E1] cursor-pointer"
                        }`}
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
              )}
            </>
          ) : (
            <div className="flex items-center justify-center text-center w-full font-gilroy px-3 fade-in bg-white overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
              <div className="flex flex-col items-center">
                <img
                  src={EmptyState}
                  alt="Empty state"
                  className="h-[240px] w-[240px] max-h-[240px] max-w-[240px] object-contain"

                />
                <div className="mt-2 text-[20px] font-semibold text-[#4B4B4B]">
                  No rooms available
                </div>
                <div className="mt-1 text-[16px] font-medium text-[#4B4B4B]">
                  There is no room added in this floor.
                </div>
                <button
                  disabled={!canWritePayingGuests}
                  onClick={() =>
                    handleShowAddRoom(props.floorID, props.hostel_Id)
                  }
                  className="mt-4 bg-[#1E45E1] text-white font-semibold rounded-xl px-6 py-2.5 text-[16px] font-gilroy disabled:opacity-70"
                >
                  + Add Room
                </button>
              </div>
            </div>
          )}
        </div>

        {showRoom && <AddRoom show={showRoom}
          handleClose={handlecloseRoom} hostelDetails={hostelDetails} editRoom={editRoom}
        />}

        {showDeleteRoom && <DeleteRoom show={showDeleteRoom} handleClose={handleCloseDeleteRoom} deleteRoomDetails={deleteRoomDetails} />}
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








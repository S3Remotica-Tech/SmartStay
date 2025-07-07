/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Green from '../../Assets/Images/New_images/Frame.png'
import White from '../../Assets/Images/New_images/empty_bed.png'
import AddRoom from './AddRoom';
import AddBedUI from './AddBed';
import { FaSquarePlus } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteRoom from './DeleteRoom';
import DeleteBed from './DeleteBed';
import OccupiedCustomer from './OccupiedCustomer'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { ArrowLeft2, ArrowRight2, Edit, Trash } from 'iconsax-react';
import PropTypes from "prop-types"





function ParticularHostelDetails(props) {



  const dispatch = useDispatch();
  const state = useSelector((state) => state);

 
  const [showBed, setShowBed] = useState(false)
  const [details, setDetails] = useState('')




  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);






  const handleAddBed = (item, Room_Id) => {
    setShowBed(true)
    setDetails({ item, Room_Id });
  }

  







  const [showDots, setShowDots] = useState('')
  const [roomCountData, setRoomCountData] = useState([])

  const [activeRoomId, setActiveRoomId] = useState(null);
  const [loader, setLoader] = useState(false)
  const [loaderTrigger, setLoaderTrigger] = useState(true)

  const handleShowDots = (roomId) => {
    setShowDots(!showDots)
    setActiveRoomId(activeRoomId === roomId ? null : roomId);
  }

  useEffect(() => {
    if (props.floorID && props.hostel_Id) {
      setLoader(true)
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
    } else {
      setLoader(false)
    }
  }, [props.hostel_Id, props.floorID])











  useEffect(() => {
    if (state.PgList.roomCountStatusCode === 200) {
      setLoader(false)
      setTimeout(() => {
        setLoaderTrigger(false)
      }, 100)
      setRoomCountData(state.PgList?.roomCount);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_ROOM_COUNT' })
      }, 500);
    }
  }, [state.PgList?.roomCountStatusCode])




  useEffect(() => {
    if (state.PgList?.noRoomsInFloorStatusCode === 201) {
      setLoader(false)
      setTimeout(() => {
        setLoaderTrigger(false)
      }, 100)
      setRoomCountData([])
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NO_ROOM_STATUS_CODE' })
      }, 100);
    }

  }, [state.PgList?.noRoomsInFloorStatusCode])

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      dispatch({ type: 'HOSTELLIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES' })
      }, 2000)
      setShowDeleteBed(false)
      dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

    }
  }, [state.UsersList?.statusCodeForAddUser]);




  useEffect(() => {

    if (state.PgList.statusCodeCreateRoom === 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      setShowRoom(false)
      dispatch({ type: 'HOSTELLIST' })


      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_ROOM_STATUS_CODE' })
      }, 100)
    }
  }, [state.PgList.statusCodeCreateRoom])







  useEffect(() => {
    if (state.PgList.createBedStatusCode === 200) {
      dispatch({ type: 'HOSTELLIST' })
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      setShowBed(false)


      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_BED_STATUS_CODE' })
      }, 4000)
    }
  }, [state.PgList.createBedStatusCode])




  useEffect(() => {
    dispatch({ type: 'USERLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  }, [])




  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4)

 


  useEffect(() => {
    if (props.floorID) {
      setCurrentPage(1)
    }
  }, [props.floorID])



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = roomCountData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(roomCountData.length / itemsPerPage);
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };






  const [showRoom, setShowRoom] = useState(false)
  const [hostelDetails, setHostelDetails] = useState({ room: null, selectedFloor: null });

  const handleShowAddRoom = (floor_Id, hostel_Id) => {
    setShowRoom(true)
    setHostelDetails({ hostel_Id, floor_Id });
    setEditRoom({ hostel_Id: null, floor_Id: null, room_Id: null, Room_Name: null })

  }
  const handlecloseRoom = () => {
    setShowRoom(false)
  }

  const [showDeleteRoom, setShowDeleteRoom] = useState(false)
  const [deleteRoomDetails, setDeleteRoomDetails] = useState({ hostel_Id: null, floor_Id: null, room_Id: null })

  const handleDeleteRoom = (Hostel_Id, Floor_Id, Room_Id) => {
    setShowDeleteRoom(true)
    setDeleteRoomDetails({ Hostel_Id, Floor_Id, Room_Id })
  }


  const handleCloseDeleteRoom = () => {
    setShowDeleteRoom(false)
  }


  const [editRoom, setEditRoom] = useState({ hostel_Id: null, floor_Id: null, room_Id: null, Room_Name: null })


  const handleEditRoom = (Hostel_Id, Floor_Id, Room_Id, Room_Name) => {
    setShowRoom(true)
    setEditRoom({ hostel_Id: Hostel_Id, floor_Id: Floor_Id, room_Id: Room_Id, Room_Name: Room_Name })
    setHostelDetails({ room: null, selectedFloor: null })
  }







  const [showDeleteBed, setShowDeleteBed] = useState(false)
  const [deleteBedDetails, setDeleteBedDetails] = useState({ bed: null, room: null })



  const handleCloseDeleteBed = () => {
    setShowDeleteBed(false)
  }

  const [occupiedCustomer, setOccupiedCustomer] = useState(false)
  const [OccupiedCustomerDetails, setOccupiedCustomerDetails] = useState({ bed: null, room: null })



  const handleCloseOccupiedCustomer = () => {
    setOccupiedCustomer(false)
  }


  const handleDeleteBedConfirmation = (bed, room) => {


    if (bed.isfilled === 0) {
      setShowDeleteBed(true)
      setDeleteBedDetails({ bed, room })
    } else {
      setOccupiedCustomer(true)
      setOccupiedCustomerDetails({ bed: bed, room: room })
    }

  }



  useEffect(() => {
    if (state.PgList.statusCodeDeleteBed === 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      dispatch({ type: 'HOSTELLIST' })
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



  const popupRef = useRef(null);


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

      <div className=''>

        <div className='mt-2 mb-2 d-flex justify-content-center w-100 ' style={{ position: "relative" }}>
          {loader && <div
            style={{
              position: 'absolute',
              top: 200,
              right: 0,
              bottom: 0,
              left: 0,
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

        <div className='container'
          style={{ maxHeight: "400px", overflowY: "auto" }}>
          <div className='row mt-4 mb-2  row-gap-4' style={{ backgroundColor: "", fontFamily: "Gilroy" }}>
            {currentItems.length > 0 && currentItems.map((room) => (
              <>


                <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12 d-flex justify-content-center'>

                  <Card className="h-100 fade-in" key={room.Room_Id} style={{ width: "100%", margin: 0, border: "1px solid #E6E6E6", borderRadius: 16, height: "auto", minHeight: 100 }}>
                    <Card.Header style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#E0ECFF", border: "1px solid #E6E6E6", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                      <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)" }}>
                        Room No {room.Room_Name}
                      </div>
                      <div onClick={() => handleShowDots(room.Room_Id)} style={{ position: "relative", zIndex: showDots ? 1000 : 'auto', cursor: "pointer" }}>
                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                        {String(activeRoomId) === String(room.Room_Id) && (
                          <div
                            ref={popupRef}
                            style={{
                              cursor: "pointer",
                              backgroundColor: "#f9f9f9",
                              position: "absolute",
                              right: 0,
                              top: 30,
                              width: 140,
                              border: "1px solid #EBEBEB",
                              borderRadius: 10,

                              display: "flex",
                              flexDirection: "column",
                              zIndex: 1000,
                              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                            }}
                          >

                            <div
                              className="d-flex gap-2 align-items-center"
                              onClick={() => {
                                if (!props.editPermissionError) {
                                  handleEditRoom(room.Hostel_Id, room.Floor_Id, room.Room_Id, room.Room_Name);
                                }
                              }}
                              style={{
                                padding: "10px 10px",
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                pointerEvents: props.editPermissionError ? "none" : "auto",
                                opacity: props.editPermissionError ? 0.5 : 1,
                                cursor: props.editPermissionError ? "not-allowed" : "pointer",
                                transition: "background 0.2s ease-in-out",
                              }}
                              onMouseEnter={(e) => {
                                if (!props.editPermissionError) e.currentTarget.style.backgroundColor = "#F0F4FF";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              <Edit size="16" color={props.editPermissionError ? "#888888" : "#1E45E1"} />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  color: props.editPermissionError ? "#888888" : "#222222",
                                  marginBottom: 0,
                                  cursor: "pointer",
                                }}
                              >
                                Edit
                              </label>
                            </div>


                            <div style={{ height: 1, backgroundColor: "#E0E0E0", margin: "0px 0" }} />

                            <div
                              className="d-flex gap-2 align-items-center"
                              onClick={() => {
                                if (!props.deletePermissionError) {
                                  handleDeleteRoom(room.Hostel_Id, room.Floor_Id, room.Room_Id);
                                }
                              }}
                              style={{
                                padding: "10px 10px",
                                borderBottomLeftRadius: 10,
                                borderBottomRightRadius: 10,
                                pointerEvents: props.deletePermissionError ? "none" : "auto",
                                opacity: props.deletePermissionError ? 0.5 : 1,
                                cursor: props.deletePermissionError ? "not-allowed" : "pointer",
                                transition: "background 0.2s ease-in-out",
                              }}
                              onMouseEnter={(e) => {
                                if (!props.deletePermissionError) e.currentTarget.style.backgroundColor = "#FFF3F3";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                              }}
                            >
                              <Trash size="16" color={props.deletePermissionError ? "#888888" : "red"} />
                              <label
                                style={{
                                  fontSize: 14,
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  color: props.deletePermissionError ? "#888888" : "#FF0000",
                                  marginBottom: 0,
                                  cursor: "pointer",
                                }}
                              >
                                Delete
                              </label>
                            </div>
                          </div>

                        )}
                      </div>
                    </Card.Header>
                    <Card.Body className=''>
                      <div className='row row-gap-3 g-0 show-scroll' style={{maxHeight: 240, overflowY:"scroll"}}>
                        {Array.isArray(room.bed_details) && room.bed_details.length > 0 && room.bed_details && room.bed_details.map((bed) => (
                          <div key={bed.id} className='col-lg-3 col-md-3 col-xs-12 col-sm-6 col-12 d-flex justify-content-center' >
                            <div className='d-flex flex-column align-items-center' style={{ width: "100%",  }}>

                              <OverlayTrigger variant="secondary"
                                placement="top"
                                overlay={
                                  <Tooltip variant="secondary"
                                    id={`tooltip-top`}
                                  >
                                    {bed.isfilled ? "Occupied - Customer info" : "Available - Add or delete"}
                                  </Tooltip>
                                }
                              >
                                <img src={bed.isfilled ? Green : White} alt='bedd' style={{ height: 41, width: 34, cursor: "pointer" }}

                                  onClick={() => handleDeleteBedConfirmation(bed, room)}
                              

                                />
                              </OverlayTrigger>

                              <div className="pt-2" style={{ color: "#000", fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }} >{bed.bed_no}</div>
                            </div>
                          </div>
                        ))}

                        <div
                          className={`col-lg-3 col-md-6 col-xs-12 col-sm-12 col-12 d-flex justify-content-center ${props.addPermissionError ? 'disabled' : ''}`}
                          onClick={() => {
                            if (!props.addPermissionError) {
                              handleAddBed(props, room.Room_Id);
                            }
                          }}
                          style={{ cursor: props.addPermissionError ? 'not-allowed' : 'pointer' }}
                        >
                          <div
                            className='d-flex flex-column align-items-center'
                            style={{ width: "100%" }}
                          >
                            <div>
                              <FaSquarePlus
                                style={{
                                  height: 41,
                                  width: 34,
                                  color: props.addPermissionError ? "#888888" : "#1E45E1"
                                }}
                              />
                            </div>
                            <div
                              className="pt-2"
                              style={{
                                color: props.addPermissionError ? "#888888" : "#1E45E1",
                                fontSize: 12,
                                fontWeight: 600,
                                fontFamily: "Montserrat"
                              }}
                            >
                              Add bed
                            </div>
                          </div>
                        </div>

                      </div>
                    </Card.Body>
                  </Card>

                </div>


              </>
            ))





            }
            {

              !loader && !loaderTrigger && currentItems.length === 0 &&
              <div className='d-flex align-items-center justify-content-center fade-in' style={{ width: "100%", margin: "0px auto" }}>

                <div>
                  <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                  <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No rooms available</div>
                  <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There is no room added in this floor.</div>
                    <div className='d-flex justify-content-center pb-1 mt-3'>
                    <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", fontWeight: 600, borderRadius: 12, padding: "10px 20px", fontFamily: "Gilroy" }} disabled={props.addPermissionError} onClick={() => handleShowAddRoom(props.floorID, props.hostel_Id)}> + Add Room</Button>


                  </div>
                </div>
                <div>

                </div>
              </div>
            }



          </div>
        </div>

        {currentItems.length > 0 && <>
          <div className='row mt-4 ms-2'>
            <div>
              <label
                style={{
                  fontSize: 16,
                  color: props.addPermissionError ? "#A0A0A0" : "#1E45E1",
                  fontWeight: 600,
                  fontFamily: "Montserrat",
                  cursor: props.addPermissionError ? "not-allowed" : "pointer",
                  opacity: props.addPermissionError ? 0.7 : 1,
                }}
                onClick={
                  !props.addPermissionError
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


        {
          roomCountData.length >= 4 &&



           <nav
           
            className="pagination-container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              padding: "10px",
              position: "fixed",
              bottom: "0px",
              right: "0px",
              backgroundColor: "#fff",
              borderRadius: "5px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              zIndex: 1000,
            }}
          >
            <div>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                style={{
                  padding: "5px",
                  border: "1px solid #1E45E1",
                  borderRadius: "5px",
                  color: "#1E45E1",
                  fontWeight: "bold",
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: "none",

                }}
              >

                <option value={4}>4</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

          
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >
            
              <li style={{ margin: "0 10px" }}>
                <button
                  style={{
                    padding: "5px",
                    textDecoration: "none",
                    color: currentPage === 1 ? "#ccc" : "#1E45E1",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    borderRadius: "50%",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                </button>
              </li>

            
              <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                {currentPage} of {totalPages}
              </li>

             
              <li style={{ margin: "0 10px" }}>
                <button
                  style={{
                    padding: "5px",
                    textDecoration: "none",
                    color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    borderRadius: "50%",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight2
                    size="16"
                    color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                  />
                </button>
              </li>
            </ul>
          </nav>
        }

        {showBed && <AddBedUI show={showBed} setShowBed={setShowBed} currentItem={details} />}
        {showRoom && <AddRoom show={showRoom}
          handleClose={handlecloseRoom} hostelDetails={hostelDetails} editRoom={editRoom}
        />}

        {
          showDeleteRoom && <DeleteRoom show={showDeleteRoom} handleClose={handleCloseDeleteRoom} deleteRoomDetails={deleteRoomDetails} />
        }


        {
          showDeleteBed && <DeleteBed show={showDeleteBed} handleClose={handleCloseDeleteBed} deleteBedDetails={deleteBedDetails} />
        }
        {
          occupiedCustomer && <OccupiedCustomer show={occupiedCustomer} handleClose={handleCloseOccupiedCustomer} currentItem={OccupiedCustomerDetails} />
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




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
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { ArrowLeft2, ArrowRight2, Edit, Trash } from 'iconsax-react';
import PropTypes from "prop-types"
import Select from "react-select";
// import overdueimg from "../../Assets/Images/New_images/overdueimg.png";
import orangedot from "../../Assets/Images/New_images/orangedot.png";
import reddot from "../../Assets/Images/New_images/reddot.png";
import bluedot from "../../Assets/Images/New_images/bluedot.png";
import EmptyBed from './EmptyBed';
import BedDetails from './ReservedBed/BedDetails';
import Check_In from "../PayingGuestFile/ReservedBed/Check_In"
import MakeAsInactive from '../PayingGuestFile/ReservedBed/MakeAsInactive';




function ParticularHostelDetails(props) {



  const dispatch = useDispatch();
  const state = useSelector((state) => state);


  const [showBed, setShowBed] = useState(false)
  const [details, setDetails] = useState('')

  const [emptybed, setEmptyBed] = useState(false)


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
  }, [props.hostel_Id, props.floorID, state?.login?.selectedHostel_Id])











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
  const handleItemsPerPageChange = (selectedOption) => {
    setItemsPerPage(Number(selectedOption.value));
    setCurrentPage(1);
  };
  const pageSizeOptions = [
    { value: 4, label: "4" },
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];


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




  const handleclickBed = (bed, room) => {
       if (bed.isfilled === 0) {
      setEmptyBed(true)
      setDeleteBedDetails({ bed, room })
      setOccupiedCustomerDetails({ bed: bed, room: room })
       }
  }

  const handlecloseBed = () => {
    setEmptyBed(false)
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

  const [showReservedBed, setShowReservedBed] = useState(false)
  const [showCheckIn, setShowCheckIn] = useState(false)
  const [showInactive, setShowInActive] = useState(false)

  const handleShowReservedBed = () => {
    setShowReservedBed(true)
  }

  const handleCloseReservedBed = () => {
    setShowReservedBed(false)
  }



  const handleShowCheck_In = () => {
    setShowCheckIn(true)
    setShowReservedBed(false)

  }

  const handleCloseCheck_In = () => {
    setShowCheckIn(false)
  }


  const handleShowMakeAsInActive = () => {
    setShowInActive(true)
    setShowReservedBed(false)
  }

  const handleCloseMakeAsInActive = () => {
    setShowInActive(false)
  }


  return (
    <>


   

      <div >
        <button className='btn btn-primary' onClick={handleShowReservedBed}>Reserved bed</button>



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

        <div className='container-fluid show-scroll' style={{ maxHeight: "400px", overflowY: "auto", marginTop: "-25px" }}>
  <div className='row mt-4 mb-2 row-gap-3' style={{ fontFamily: "Gilroy" }}>
    {currentItems.length > 0 && currentItems.map((room) => (
      <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center' key={room.Room_Id}>
        <Card className="w-100 h-100 fade-in" style={{ border: "1px solid #E6E6E6", borderRadius: 16, minHeight: 120 }}>
          <Card.Header className="d-flex justify-content-between align-items-start" style={{ backgroundColor: "#E0ECFF", border: "1px solid #E6E6E6", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
            
          
            <div style={{ width: "110px" }}>
              <div title={`Room No ${room.Room_Name}`} style={{ fontSize: 14, fontWeight: 600, color: "rgba(34, 34, 34, 1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {room.Room_Name}
              </div>
              <div style={{ fontSize: 12, fontWeight: 400, color: "#7C7C7C", marginTop: "-2px" }}>
                {Array.isArray(room.bed_details) ? `${room.bed_details.length} sharing` : "0 sharing"}
              </div>
            </div>

          
            <div className="d-flex flex-wrap   mt-1 bg-white rounded " style={{whiteSpace:"nowrap",paddingLeft:4,paddingRight:4}}>
              <p className="mb-1 me-2 d-flex align-items-center" style={{ fontSize: 10, fontWeight: 500 }}>
                <img className="me-1 mb-1" src={orangedot} alt="available" /> No Overview
              </p>
                 <p className="mb-1 d-flex align-items-center" style={{ fontSize: 10, fontWeight: 500 }}>
                <img className="me-1 mb-1" src={bluedot} alt="reserved" /> No Reserved
              </p>
              <p className="mb-1 me-2 d-flex align-items-center" style={{ fontSize: 10, fontWeight: 500 }}>
                <img className="me-1 mb-1" src={reddot} alt="notice" /> No Notice Period
              </p>
           
            </div>

         
            <div onClick={() => handleShowDots(room.Room_Id)} style={{ position: "relative", zIndex: showDots ? 1000 : 'auto', cursor: "pointer" }}>
              <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
              {String(activeRoomId) === String(room.Room_Id) && (
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
                      if (!props.editPermissionError) {
                        handleEditRoom(room.Hostel_Id, room.Floor_Id, room.Room_Id, room.Room_Name);
                      }
                    }}
                    style={{
                      padding: "10px",
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      pointerEvents: props.editPermissionError ? "none" : "auto",
                      opacity: props.editPermissionError ? 0.5 : 1,
                      cursor: props.editPermissionError ? "not-allowed" : "pointer"
                    }}
                    onMouseEnter={(e) => { if (!props.editPermissionError) e.currentTarget.style.backgroundColor = "#F0F4FF"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <Edit size="16" color={props.editPermissionError ? "#888888" : "#1E45E1"} />
                    <label style={{ fontSize: 14, fontWeight: 500, color: props.editPermissionError ? "#888888" : "#222222", marginBottom: 0 }}>Edit</label>
                  </div>

                  <div style={{ height: 1, backgroundColor: "#E0E0E0" }} />

                 
                  <div
                    className="d-flex gap-2 align-items-center"
                    onClick={() => {
                      if (!props.deletePermissionError) {
                        handleDeleteRoom(room.Hostel_Id, room.Floor_Id, room.Room_Id);
                      }
                    }}
                    style={{
                      padding: "10px",
                      borderBottomLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      pointerEvents: props.deletePermissionError ? "none" : "auto",
                      opacity: props.deletePermissionError ? 0.5 : 1,
                      cursor: props.deletePermissionError ? "not-allowed" : "pointer"
                    }}
                    onMouseEnter={(e) => { if (!props.deletePermissionError) e.currentTarget.style.backgroundColor = "#FFF3F3"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <Trash size="16" color={props.deletePermissionError ? "#888888" : "red"} />
                    <label style={{ fontSize: 14, fontWeight: 500, color: props.deletePermissionError ? "#888888" : "#FF0000", marginBottom: 0 }}>Delete</label>
                  </div>
                </div>
              )}
            </div>
          </Card.Header>

          <Card.Body>
            <div className='row g-2 overflow-auto' style={{ maxHeight: 240 }}>
              {Array.isArray(room.bed_details) && room.bed_details.length > 0 && room.bed_details.map((bed) => (
                <div key={bed.id} className='col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center'>
                  <div className='d-flex flex-column align-items-center w-100'>
                    <div style={{ position: "relative", width: 34, height: 41 }}>
                      
                        <img className='mt-1'
                          src={bed.isfilled ? Green : White}
                          alt='bedd'
                          style={{ height: 41, width: 34, cursor: "pointer" }}
                          onClick={() => handleclickBed(bed, room)}
                        />
                     
                    </div>
                    <div className="pt-2" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }}>
                      {bed.bed_no}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Bed */}
              <div
                className={`col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center ${props.addPermissionError ? 'disabled' : ''}`}
                onClick={() => {
                  if (!props.addPermissionError) {
                    handleAddBed(props, room.Room_Id);
                  }
                }}
                style={{ cursor: props.addPermissionError ? 'not-allowed' : 'pointer' }}
              >
                <div className='d-flex flex-column align-items-center w-100'>
                  <div>
                    <FaSquarePlus style={{ height: 41, width: 34, color: props.addPermissionError ? "#888888" : "#1E45E1" }} />
                  </div>
                  <div className="pt-2" style={{ fontSize: 12, fontWeight: 600, fontFamily: "Montserrat", color: props.addPermissionError ? "#888888" : "#1E45E1" }}>
                    Add bed
                  </div>
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    ))}

    {/* Empty State */}
    {!loader && !loaderTrigger && currentItems.length === 0 && (
      <div className='d-flex flex-column align-items-center justify-content-center text-center w-100 px-3 fade-in'>
        <div><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
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
            disabled={props.addPermissionError}
            onClick={() => handleShowAddRoom(props.floorID, props.hostel_Id)}
          >
            + Add Room
          </Button>
        </div>
      </div>
    )}
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
          roomCountData.length > 4 &&

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
                <Select
                  options={pageSizeOptions}
                  value={
                    itemsPerPage ? { value: itemsPerPage, label: `${itemsPerPage}` } : null
                  }
                  onChange={handleItemsPerPageChange}
                  placeholder="Items per page"
                  classNamePrefix="custom"
                   menuPlacement="auto"
                      noOptionsMessage={() => "No options"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      padding: "0 5px",
                      height: "40px",
                      borderRadius: "5px",
                      fontSize: "14px",
                      color: "#1E45E1",
                      fontWeight: "bold",
                      fontFamily: "Gilroy",
                      border: "1px solid #1E45E1",
                      boxShadow: "0 0 0 1px #1E45E1",
                      cursor: "pointer",
                      width: 90,
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ced4da",
                      fontFamily: "Gilroy",
                    }),
                    menuList: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      maxHeight: "200px",
                      padding: 0,
                      overflowY: "auto",
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#555",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#1E45E1",
                      cursor: "pointer",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#1E45E1" : "white",
                      color: state.isFocused ? "#fff" : "#000",
                      cursor: "pointer",
                    }),
                  }}
                />
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

        {
          emptybed && <EmptyBed  show= {emptybed} handleClose={handlecloseBed} currentItem={OccupiedCustomerDetails} deleteBedDetails={deleteBedDetails} />
        }

      </div>

      {/* Reserved Bed */}
      {
        showReservedBed && <BedDetails show={handleShowReservedBed} handleCloseBed={handleCloseReservedBed} handleShowCheck_In={handleShowCheck_In} MakeAsInActive={handleShowMakeAsInActive} />
      }

      {
        showCheckIn && <Check_In show={showCheckIn} handleClose={handleCloseCheck_In} />
      }

      {
        showInactive && <MakeAsInactive show={showInactive} handleClose={handleCloseMakeAsInActive} />
      }


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




import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Filter from '../Assets/Images/New_images/Group 13.png';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';
import Green from '../Assets/Images/New_images/Frame.png'
import White from '../Assets/Images/New_images/Frame (1).png'
import AddBed from '../Assets/Images/New_images/add.png';
import AddRoom from './AddRoom';
import AddBedUI from './AddBed';
import AddFloor from './AddFloor';
import { FaSquarePlus } from "react-icons/fa6";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../Assets/Images/New_images/trash.png';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { FormControl, InputGroup, Pagination, Dropdown } from 'react-bootstrap';
import Edit from '../Assets/Images/New_images/edit.png';
import DeleteRoom from './DeleteRoom';
import DeleteBed from './DeleteBed';
import OccupiedCustomer from './OccupiedCustomer'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function getFormattedRoomId(floor_Id, room_Id) {
  const roomIdString = String(room_Id);
  switch (floor_Id) {
    case 1:
      return `G${roomIdString}`;
    case 2:
      return `F${roomIdString}`;
    case 3:
      return `S${roomIdString}`;
    case 4:
      return `T${roomIdString}`;
    default:
      const floorAbbreviation = getFloorAbbreviation(floor_Id - 1);
      console.log("floorAbbreviation", floorAbbreviation, floor_Id);
      return `${floorAbbreviation}${roomIdString.padStart(3, '0')}`;
  }
}

function getFloorAbbreviation(floor_Id) {

  switch (floor_Id) {
    case 5:
      return 'F';
    case 6:
      return 'S';
    case 8:
      return 'E';
    case 9:
      return 'N';
    case 10:
      return 'T';

    default:
      return `${floor_Id}`;
  }
}


function ParticularHostelDetails(props) {



  console.log("Props", props)
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  // const [showRoom, setShowRoom] = useState(false)
  const [showBed, setShowBed] = useState(false)
  const [showFloor, setShowFloor] = useState(false)
  const [details, setDetails] = useState('')

  const toastStyle = {
    background: '#28a745',
    color: '#fff',
    fontSize: '14px'
  };



  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handleShowAddRoom = () => {
  //   setShowRoom(true)
  // }

  const handleClose = () => {
    setShowRoom(false)
  }


  const handleAddBed = (item, Room_Id) => {
    setShowBed(true)
    setDetails({ item, Room_Id });
  }

  const handleCloseBed = () => {
    setShowBed(false)

  }

  const handleAddFloor = () => {
    setShowFloor(true)
  }

  const handleCloseFloor = () => {
    setShowFloor(false)
  }





  const [showDots, setShowDots] = useState('')
  const [roomCountData, setRoomCountData] = useState('')

  const [activeRoomId, setActiveRoomId] = useState(null);


  const handleShowDots = (roomId) => {
    setShowDots(!showDots)
    setActiveRoomId(activeRoomId === roomId ? null : roomId);
  }

  useEffect(() => {

    if (props.floorID && props.hostel_Id) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      setLoader(true)
    }
  }, [props.hostel_Id, props.floorID])

  const getRooms = (count) => {
    return [...Array(count).keys()].map(index => `Bed ${index + 1}`)
  }


  const [loader, setLoader] = useState(true)


console.log("roomCountData",roomCountData)


  useEffect(() => {
    if (state.PgList.roomCountStatusCode == 200) {
      setTimeout(()=>{
        setRoomCountData(state.PgList?.roomCount);  
      },100)
                                  
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_ROOM_COUNT' })
      }, 1000);
    }
  }, [state.PgList.roomCountStatusCode])





  useEffect(() => {
    if (state.PgList.noRoomsInFloorStatusCode === 201) {
      setRoomCountData('')
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NO_ROOM_STATUS_CODE' })
      }, 2000);
    }

  }, [state.PgList.noRoomsInFloorStatusCode])

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      dispatch({ type: 'HOSTELLIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES' })
      }, 2000)
      setShowDeleteBed(false)
      dispatch({ type: 'USERLIST' })

    }
  }, [state.UsersList?.statusCodeForAddUser]);




  useEffect(() => {

    if (state.PgList.statusCodeCreateRoom === 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      setShowRoom(false)
      dispatch({ type: 'HOSTELLIST' })


      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_ROOM_STATUS_CODE' })
      }, 4000)
    }
  }, [state.PgList.statusCodeCreateRoom])







  useEffect(() => {
    if (state.PgList.createBedStatusCode == 200) {
      dispatch({ type: 'HOSTELLIST' })
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      setShowBed(false)
   

      setTimeout(() => {
        dispatch({ type: 'CLEAR_CREATE_BED_STATUS_CODE' })
      }, 4000)
    }
  }, [state.PgList.createBedStatusCode])



  console.log("roomCountData", roomCountData)

  useEffect(() => {
    dispatch({ type: 'USERLIST' })
  }, [])




  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  // const [currentItems, setCurrentItems] = useState([]); 

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = roomCountData.slice(indexOfFirstItem, indexOfLastItem);


  useEffect(()=>{
    if(roomCountData.length > 0 ){
      setLoader(false)
      // const slicedItems = roomCountData.slice(indexOfFirstItem, indexOfLastItem);
      // setCurrentItems(slicedItems);
      }else{
        setLoader(false);
    // setCurrentItems([]); 
      }
  
  },[roomCountData])


console.log("currentItems Room", currentItems);



  const totalPages = Math.ceil(roomCountData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      pageNumbers.push(
        <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => paginate(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };

  const [showRoom, setShowRoom] = useState(false)
  const [hostelDetails, setHostelDetails] = useState({ room: null, selectedFloor: null });

  const handleShowAddRoom = (floor_Id, hostel_Id) => {
    setShowRoom(true)
    console.log("add room", floor_Id, hostel_Id)
    setHostelDetails({ hostel_Id, floor_Id });
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


  const [editRoom, setEditRoom] = useState({ hostel_Id: null, floor_Id: null, room_Id: null })


  const handleEditRoom = (Hostel_Id, Floor_Id, Room_Id) => {
    setShowRoom(true)
    setEditRoom({ hostel_Id: Hostel_Id, floor_Id: Floor_Id, room_Id: Room_Id })
  }






  // console.log("currentItems",currentItems)

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


  console.log("state", state)

  useEffect(() => {
    if (state.PgList.statusCodeDeleteBed == 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })
      dispatch({ type: 'HOSTELLIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_BED_STATUS_CODE' })
      }, 2000)
    }

  }, [state.PgList.statusCodeDeleteBed])

  

  useEffect(() => {
    const appearOptions = {
      threshold : 0.5
    };
    const faders = document.querySelectorAll('.fade-in'); 
    const appearOnScro1l = new IntersectionObserver(function(entries,appearOnScrool){
      entries.forEach(entry =>{
        if(!entry.isIntersecting){
          return;
        }
        else{
          entry.target.classList.add('appear');
          appearOnScro1l.unobserve(entry.target);
        }
      })
    }, appearOptions)
    faders.forEach(fader =>{
      appearOnScro1l.observe(fader);
    })
  });
 
console.log("loader",loader)

  return (
    <> 
 
    <div className=''>
 
      <div className='mt-2 mb-2 d-flex justify-content-center w-100'>
        { loader &&  <Spinner animation="grow" variant="primary" size="sm" />}
      </div>


      <div className='row mt-4 mb-2  row-gap-4' style={{ backgroundColor: "", fontFamily: "Gilroy" }}>
        {currentItems.length > 0 && currentItems.map((room, index) => (
          <>

            <div className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12 d-flex justify-content-center'>

              <Card className="h-100 fade-in" key={room.Room_Id} style={{ width: "100%", margin: 0, border: "1px solid #E6E6E6", borderRadius: 16, height: "auto", minHeight: 200 }}>
                <Card.Header style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#E0ECFF", border: "1px solid #E6E6E6", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)" }}>
                    Room no. {room.Room_Id}
                    {/* <span>{getFormattedRoomId(room.Floor_Id, room.Room_Id)}</span> */}
                  </div>
                  <div onClick={() => handleShowDots(room.Room_Id)} style={{ position: "relative", zIndex: showDots ? 1000 : 'auto', cursor: "pointer" }}>
                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                    {activeRoomId === room.Room_Id && (
                      <div style={{ cursor: "pointer", backgroundColor: "#fff", position: "absolute", right: 0, top: 30, width: 163, height: 92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                        <div>
                          <div className='mb-2'
                          // onClick={()=> handleEditRoom(room.Hostel_Id,room.Floor_Id, room.Room_Id)}
                          >
                            <img src={Edit} style={{ height: 16, width: 16 }} alt="Delete Icon" /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Outfit, sans-serif", color: "#222222" }}>Edit</label>
                          </div>
                          <div
                            onClick={() => { handleDeleteRoom(room.Hostel_Id, room.Floor_Id, room.Room_Id) }}
                          >
                            <img src={Delete} style={{ height: 16, width: 16 }} alt="Delete Icon" /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "rgba(255, 0, 0, 1)" }}>Delete</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <div className='row row-gap-3 g-0'>
                    {room.bed_details && room.bed_details.map((bed, index) => (
                      <div className='col-lg-3 col-md-3 col-xs-12 col-sm-6 col-12 d-flex justify-content-center' >
                        <div className='d-flex flex-column align-items-center' style={{ width: "100%", }}>

                          <OverlayTrigger
                            placement="top"
                            overlay={
                              <Tooltip variant="secondary" 
                               id={`tooltip-top`} 
                                                             >
                                {bed.isfilled ? "Occupied - Customer info" : "Available - Add or delete"}
                              </Tooltip>
                            }
                          >
                            <img src={bed.isfilled ? Green : White} style={{ height: 41, width: 34, cursor: "pointer" }}

                              onClick={() => handleDeleteBedConfirmation(bed, room)}
                            // onClick={()=>handleDeleteBed(bed, room)}

                            />
                          </OverlayTrigger>

                          <div className="pt-2" style={{ color: "#000", fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }} >{bed.bed_no}</div>
                        </div>
                      </div>
                    ))}
                    <div className='col-lg-3 col-md-6 col-xs-12 col-sm-12 col-12 d-flex justify-content-center' onClick={() => handleAddBed(props, room.Room_Id)}>
                      <div className='d-flex flex-column align-items-center' style={{ width: "100%", cursor: "pointer" }}>
                        <div><FaSquarePlus style={{ height: 41, width: 34, color: "#1E45E1" }} /></div>
                        <div className="pt-2" style={{ color: "#1E45E1", fontSize: 12, fontWeight: 600, fontFamily: "Montserrat" }}>Add bed</div>
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
 
(!loader && currentItems.length === 0) && 
          <div className='d-flex align-items-center justify-content-center fade-in' style={{ width: "100%", height: 350, margin: "0px auto" }}>
            {/* <Alert variant="warning" >
          Currently, no rooms are available.
        </Alert> */}
            <div>

              <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No rooms available</div>
              <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There is no room added in this floor.</div>
              <div className='d-flex justify-content-center pb-1'>                   <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 155, padding: "18px, 20px, 18px, 20px", fontFamily: "Montserrat" }} onClick={() => handleShowAddRoom(props.floorID, props.hostel_Id)}> + Add room</Button>
              </div>
            </div>
            <div>

            </div>
          </div>





        }



      </div>


      {currentItems.length > 0 && <>
        <div className='row mt-2'>
          <div>
            <label style={{ fontSize: 16, color: "#1E45E1", fontWeight: 600, fontFamily: 'Montserrat' }} onClick={() => handleShowAddRoom(props.floorID, props.hostel_Id)}>+ Add room</label>
          </div>
        </div>
      </>


      }



      {
        currentItems.length > 0 &&
        <Pagination className="mt-4 d-flex justify-content-end align-items-center">
          <Pagination.Prev style={{ visibility: "visible" }}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {renderPagination()}
          <Pagination.Next style={{ visibility: "visible" }}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      }

      {showBed && <AddBedUI show={showBed} handleClose={handleCloseBed} currentItem={details} />}
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

export default ParticularHostelDetails




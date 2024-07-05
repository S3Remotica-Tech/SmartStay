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





function getFormattedRoomId(floor_Id, room_Id) {
  const roomIdString = String(room_Id);
  switch (floor_Id) {
    case 1:
      return `G${roomIdString.padStart(3, '0')}`;
    case 2:
      return `F${roomIdString.padStart(3, '0')}`;
    case 3:
      return `S${roomIdString.padStart(3, '0')}`;
    case 4:
      return `T${roomIdString.padStart(3, '0')}`;
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

  const [showRoom, setShowRoom] = useState(false)
  const [showBed, setShowBed] = useState(false)
  const [showFloor, setShowFloor] = useState(false)


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleShowAddRoom = () => {
    setShowRoom(true)
  }

  const handleClose = () => {
    setShowRoom(false)
  }


  const handleAddBed = () => {
    setShowBed(true)
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


  const handleShowDots = () => {
    setShowDots(!showDots)
  }

  useEffect(() => {

    if (props.floorID && props.hostel_Id) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })

    }
  }, [props.hostel_Id, props.floorID])

  const getRooms = (count) => {
    return [...Array(count).keys()].map(index => `Bed ${index + 1}`)
  }

  useEffect(() => {
    if (state.PgList.roomCountStatusCode == 200) {
      setRoomCountData(state.PgList.roomCount)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODE_ROOM_COUNT' })
      }, 100);
    }
  }, [state.PgList.roomCountStatusCode])

useEffect(()=>{
if(state.PgList.noRoomsInFloorStatusCode === 201){
  setRoomCountData('')
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NO_ROOM_STATUS_CODE' })
  }, 2000);
}
  
},[state.PgList.noRoomsInFloorStatusCode])





  console.log("roomCountData", roomCountData)

  useEffect(() => {
    dispatch({ type: 'USERLIST' })
  }, [])











  return (
    <div className=''>




      <div className='row mt-4 mb-2  row-gap-4' style={{ backgroundColor: "", fontFamily: "Gilroy, sans-serif" }}>
        {roomCountData.length > 0 ? roomCountData.map((room, index) => (
          <>

            <div className='col-lg-4 col-md-6 col-xs-12 col-sm-12 col-12 d-flex justify-content-center'>

              <Card className="h-100" key={room.Room_Id} style={{ width: "100%", margin: 0, border: "1px solid #E6E6E6", borderRadius: 16 ,height: "auto", minHeight: 200}}>
                <Card.Header style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#E0ECFF", border: "1px solid #E6E6E6", borderTopLeftRadius: 16, borderTopRightRadius: 16 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "Gilroy, sans-serif" }}>
                    Room no. <span>{getFormattedRoomId(room.Floor_Id, room.Room_Id)}</span>
                  </div>
                  <div onClick={handleShowDots} style={{ position: "relative", zIndex: showDots ? 1000 : 'auto' }}>
                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                    {showDots && (
                      <div style={{ cursor: "pointer", backgroundColor: "#fff", position: "absolute", right: 0, top: 30, width: 163, height: 92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                        <div>
                          <div className='mb-2'>
                            <img src={Delete} style={{ height: 16, width: 16 }} alt="Delete Icon" /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#FF0000" }}>Delete Room</label>
                          </div>


                          <div>
                            <img src={Delete} style={{ height: 16, width: 16 }} alt="Delete Icon" /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#FF0000" }}>Delete Bed</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Header>
                <Card.Body className=''>
                  <div className='row row-gap-3 g-0'>
                    {getRooms(room.Number_Of_Beds).map((bed, index) => (
                      <div className='col-lg-3 col-md-3 col-xs-12 col-sm-6 col-12 d-flex justify-content-center'>
                        <div  className='d-flex flex-column align-items-center' style={{ width: "100%", }}>
                         

                            <img src={state.UsersList?.Users && state.UsersList?.Users.some(user => {
                              const isSameFloor = Number(user.Floor) === Number(room.Floor_Id);
                              const isSameHostel = Number(user.Hostel_Id) === Number(room.Hostel_Id);
                              const isSameRoom = Number(user.Rooms) === Number(room.Room_Id);
                              const isSameBed = Number(user.Bed) === index + 1;
                              return isSameFloor && isSameHostel && isSameRoom && isSameBed;

                              //  return user.Floor == room.Floor_Id && user.Hostel_Id == room.Hostel_Id && user.Rooms == room.Room_Id && user.Bed === bed
                            }) ? Green : White} style={{ height: 41, width: 34 }} />

                      
                          <div className="pt-2" style={{ color: "#000", fontSize: 10, fontWeight: 600 }}>{bed}</div>
                        </div>
                      </div>
                    ))}
                    <div className='col-lg-3 col-md-6 col-xs-12 col-sm-12 col-12 d-flex justify-content-center' onClick={handleAddBed}>
                      <div className='d-flex flex-column align-items-center' style={{ width: "100%" }}>
                        <div><FaSquarePlus style={{ height: 41, width: 34, color: "#1E45E1" }} /></div>
                        <div className="pt-2" style={{ color: "#1E45E1", fontSize: 10, fontWeight: 600 }}>Add bed</div>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>

            </div>


          </>
        ))
        :

        <div style={{ width: 400 }}>
        <Alert variant="warning" >
          Currently, no rooms are available.
        </Alert>

      </div>
      
      }
      </div>


      {showBed && <AddBedUI show={showBed} handleClose={handleCloseBed} />}

    </div>
  )
}

export default ParticularHostelDetails




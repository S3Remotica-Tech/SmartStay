import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';

function AddRoom( {show, handleClose ,hostelDetails,editRoom}) {
  
    const state = useSelector(state => state)
    const dispatch = useDispatch();

    console.log("hostelDetails",hostelDetails, editRoom)
console.log("state add room",state)

const[room, setRoom] = useState('')
const [alreadyRoom,setAlreadyRoom] = useState(false)
const [errorMessage, setErrorMessage] = useState('');

const [initialState, setInitialState] = useState({});

const handleRoomChange = (e) => {
  const Room_Id = e.target.value


  if (!/^\d*$/.test(Room_Id)) {
    setErrorMessage('Please enter a valid  number.');
  } else {
    setErrorMessage('');
  }
  



  setRoom(Room_Id)
  const floorId = hostelDetails.floor_Id.toString();
      const hostel_Id = hostelDetails.hostel_Id.toString();


   setAlreadyRoom(state.PgList.roomCount.some((item)=>{
    return item.Room_Id == Room_Id && item.Floor_Id == floorId && item.Hostel_Id == hostel_Id

  }))

}


useEffect(()=>{
if(editRoom){
  setRoom(editRoom.room_Id ? editRoom.room_Id : '')
  setInitialState({
    room:editRoom.room_Id
  })
}
},[editRoom])



    const handleCreateRoom = () => {
      const floorId = hostelDetails.floor_Id.toString();
      const hostel_Id = hostelDetails.hostel_Id.toString();

      if (!room || !/^\d+$/.test(room)) {
        Swal.fire({
          icon: 'warning',
          title: 'Please enter a valid Room no.',
        });
        return;
      }

    if (alreadyRoom) {
        Swal.fire({
            icon: 'error',
            title: 'This room already exists in the hostel.',
        });
        return;
    }
    const isChanged = 
    room !== initialState.room 

  if (!isChanged) {
    Swal.fire({
      icon: 'warning',
      title: 'No changes detected',
      timer: 2000,
    });
    return;
  }
      if(floorId && hostel_Id ){
              dispatch({
                  type: 'CREATEROOM',
                  payload: {
                      id: hostel_Id,
                      floorDetails: [{
                          floorId: floorId,
                          roomId: room,
                             }]
                  },
              });

             
             
              handleClose();
             
          }
       else {
          Swal.fire({
              icon: 'warning',
              title: 'Please enter Room no.',
          });
      }
      
  };

  const isEditing = !!editRoom && !!editRoom.room_Id;
  const modalTitle = isEditing ? 'Edit Room' : 'Add Room';


  return (
    <div
    className="modal show"
    style={{
      display: 'block', position: 'initial', fontFamily: "Gilroy",
    }}
  >
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
        <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
          <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>
          {modalTitle}
            </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          

          <div className='row mt-2'>
          {alreadyRoom && 
            <div>
             <label style={{color:"red", fontSize:16}}>This room already exists in the hostel.</label>
            </div>}
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500}}>Room</Form.Label>
                <Form.Control 
                value={room}
                onChange={handleRoomChange}
                 type="text" placeholder="Enter Room no." style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight:room ? 600 :  500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>

            </div>
            
          </div>

        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>

          <Button onClick={handleCreateRoom} className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }}>
          {modalTitle}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  </div>
  )
}

export default AddRoom

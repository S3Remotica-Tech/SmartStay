import React,{ useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';




function DeleteFloor({ show, handleClose, deleteRoomDetails}) {

  
  const state = useSelector(state => state)
  const dispatch = useDispatch();

console.log("state for delete room",state)
console.log("deleteRoomDetails",deleteRoomDetails)

const [numberOfBeds, setNumberOfBeds] =useState([])

useEffect(() => {
  if (state.PgList.roomCount && deleteRoomDetails) {
    const filteredBeds = state.PgList.roomCount.filter(item => 
      item.Hostel_Id === deleteRoomDetails.Hostel_Id &&
      item.Floor_Id === deleteRoomDetails.Floor_Id &&
      Number(item.Room_Id) === Number(deleteRoomDetails.Room_Id)
    );
    setNumberOfBeds(filteredBeds);
  }
}, [state.PgList.roomCount, deleteRoomDetails]);



  const handleDeleteRoomConfirm = () => {
 
       dispatch({
            type: 'DELETEROOM',
            payload: {
              hostelId: deleteRoomDetails.Hostel_Id,
              floorId: deleteRoomDetails.Floor_Id,
              roomNo: deleteRoomDetails.Room_Id,
            },
          });
          Swal.fire({
            icon: 'success',
            title: 'Room deleted Successfully',
          })
          handleClose()
  
  }



  return (
    <div>  
        <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>Delete room ?</Modal.Title>
    </Modal.Header>

      <Modal.Body style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>{numberOfBeds[0]?.bed_details.length > 0 && numberOfBeds[0]?.bed_details.length > 0
        ? 'Please delete the bed before deleting the room.'
        : 'Are you sure you want to delete the room?'}</Modal.Body>

  
    <Modal.Footer className='d-flex justify-content-center' style={{border:"none"}}>
    <Button  onClick={handleClose} style={{width:160,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"#FFF",color:"rgba(36, 0, 255, 1)",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}}>
            Cancel
          </Button>
          {numberOfBeds[0]?.bed_details.length > 0 && numberOfBeds[0]?.bed_details.length > 0? 

          ""
          :

          <Button style={{width:160,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"rgba(36, 0, 255, 1)",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} onClick={handleDeleteRoomConfirm}>
            Delete
          </Button>
}
    </Modal.Footer>
  </Modal>
  
  </div>
  )
}

export default DeleteFloor

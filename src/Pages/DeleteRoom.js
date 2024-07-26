import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';






function DeleteFloor({ show, handleClose, currentItem}) {

  

    const handleDelete = () => {

    }




  return (
    <div>  
        <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>Delete room ?</Modal.Title>
    </Modal.Header>
    <Modal.Body style={{fontSize:18,fontWeight:600, fontFamily:"Gilroy"}}>Are you sure you want to delete the room ?</Modal.Body>
    <Modal.Footer className='d-flex justify-content-center' style={{border:"none"}}>
    <Button  onClick={handleClose} style={{width:160,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"#FFF",color:"rgba(36, 0, 255, 1)",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}}>
            Cancel
          </Button>
          <Button style={{width:160,height:52,borderRadius:8, padding:"16px, 45px, 16px, 45px",border:"1px solid rgba(36, 0, 255, 1)",backgroundColor:"rgba(36, 0, 255, 1)",color:"#fff",fontSize:14,fontWeight:600,fontFamily:"Gilroy"}} onClick={handleDelete}>
            Delete
          </Button>
    </Modal.Footer>
  </Modal>
  
  </div>
  )
}

export default DeleteFloor

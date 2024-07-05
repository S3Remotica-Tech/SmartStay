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

function AddBed( {show, handleClose ,currentItem}) {
  
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [file, setFile] = useState(null)
   

   
    
    
    
    
    
    
    
    
      
    
      useEffect(() => {
        const closeButton = document.querySelector('button[aria-label="close-button"]');
        if (closeButton) {
          closeButton.style.backgroundColor = 'white';
          closeButton.style.borderRadius = '50%';
          closeButton.style.width = '10px';
          closeButton.style.height = '10px';
          closeButton.style.border = '1.5px solid #000000';
          closeButton.style.padding = '9px';
        }
      }, []);
    
    useEffect(()=>{
if(currentItem){
}
    },[currentItem])
    
console.log("currentItem for add vendor",currentItem)

  return (
    <div
    className="modal show"
    style={{
      display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
    }}
  >
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
        <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
          <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Add bed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          

          <div className='row mt-2'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500}}>Bed no.</Form.Label>
                <Form.Control 
                 type="text" placeholder="Enter Room no." style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>

            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500}}>Amount</Form.Label>
                <Form.Control 
                 type="text" placeholder="Enter Room no." style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>

            </div>
            
          </div>

        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>

          <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }}>
          Add bed
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  </div>
  )
}

export default AddBed

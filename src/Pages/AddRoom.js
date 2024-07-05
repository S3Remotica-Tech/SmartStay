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

function AddRoom( {show, handleClose ,currentItem}) {
  
    const state = useSelector(state => state)
    const dispatch = useDispatch();
    const [file, setFile] = useState(null)
   

   
    
     const handleImageChange = async (event) => {
      const fileImage = event.target.files[0];
      if (fileImage) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true
      };
      try {
          const compressedFile = await imageCompression(fileImage, options);
          setFile(compressedFile);
      } catch (error) {
          console.error('Image compression error:', error);
      }
      }
    };
    
    
    
      const handleMobileChange = (e) => {
        // const value = e.target.value;
        // setVendor_Mobile(value);
        // const pattern = new RegExp(/^\d{1,10}$/);
        // const isValidMobileNo = pattern.test(value);
        // if (isValidMobileNo && value.length === 10) {
        //   setErrors(prevErrors => ({ ...prevErrors, vendor_Mobile: '' }));
        // } else {
        //   setErrors(prevErrors => ({ ...prevErrors, vendor_Mobile: 'Invalid mobile number *' }));
        // }
      }
    
    
     
    
      const handleEmailChange = (e) => {
        const email = e.target.value;
        // setEmail_Id(email);
        // const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        // const isValidEmail = emailRegex.test(email);
        // if (isValidEmail) {
        //   setErrors(prevErrors => ({ ...prevErrors, email_Id: '' }));
        // } else {
        //   setErrors(prevErrors => ({ ...prevErrors, email_Id: 'Invalid Email Id *' }));
        // }
      }
    
      console.log("file",file)
    
    
      
    
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
          <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Add room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          

          <div className='row mt-2'>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500}}>Room</Form.Label>
                <Form.Control 
                 type="text" placeholder="Enter Room no." style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy,sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>

            </div>
            
          </div>

        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>

          <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }}>
          Add room
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  </div>
  )
}

export default AddRoom

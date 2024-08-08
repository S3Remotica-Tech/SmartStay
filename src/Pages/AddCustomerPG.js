import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from "react";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle } from "react-icons/fa";
import {  InputGroup, Pagination } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Plus from '../Assets/Images/New_images/add-circle.png'
import imageCompression from 'browser-image-compression';
import Image from 'react-bootstrap/Image';
import Profile from '../Assets/Images/New_images/profile-picture.png';



function AddCustomer({show, handleClosing, currentItem}) {
    const state = useSelector(state => state)
    const dispatch = useDispatch();
  
  console.log("state ",state)
console.log("add custom",currentItem)

  useEffect(() => {

    if (state.UsersList?.statusCodeForAddUser === 200) {
      handleClosing()
      setFirstname('');
      setLastname('');
      setAddress('');
        setPhone('');
      setEmail('');
      setFile('')
     
    }
  }, [state.UsersList?.statusCodeForAddUser])

const [firstname, setFirstname] = useState('');
const [lastname, setLastname] = useState('');
const [address, setAddress] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [file, setFile] = useState(null);

const handleFirstName = (e) => setFirstname(e.target.value);
  const handleLastName = (e) => setLastname(e.target.value);
  const handlePhone = (e) => setPhone(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true
      };
      imageCompression(file, options).then((compressedFile) => {
        setFile(compressedFile);
      }).catch((error) => {
        console.error('Error compressing image:', error);
      });
    }
  };

const handleAddCustomerDetails = () =>{

const Hostel_Id = currentItem.room.Hostel_Id
const Floor_Id = currentItem.room.Floor_Id
const Room_Id = currentItem.room.Room_Id
const Bed_Id = currentItem.bed.bed_no
if(firstname && lastname && phone && email){
  dispatch({ type: 'ADDUSER',
    payload: {
      profile: file,
      firstname: firstname,
      lastname: lastname,
      Phone: phone,
      Email: email,
      hostel_Id: Hostel_Id,
      Floor: Floor_Id,
      Rooms: Room_Id,
      Bed: Bed_Id,
    //   HostelName: HostelName
            }
    })
    handleClosing()
}else{
  Swal.fire({
    icon: 'warning',
    title: 'Please Enter All Fields',
    timer: 1000
  
  });
}
   
}

  return (
    <div>
   <Modal show={show} onHide={handleClosing} centered>
   <Modal.Dialog style={{ maxWidth: 950,paddingRight:"10px",paddingRight:"10px" ,borderRadius:"30px"}} className='m-0 p-0'>
  
<Modal.Body>
 
  <div className='d-flex align-items-center'>
    
 
 
    <div>
    
<Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
        <div style={{ fontSize: 20, fontWeight: 600,fontFamily:"Gilroy" }}>Add an customer</div>
        <button
          type="button"
          className="close"
          aria-label="Close"
          onClick={handleClosing}
          style={{
            position: 'absolute',
            right: '10px',
            top: '16px',
            border: '1px solid black',
            background: 'transparent',
            cursor: 'pointer',
            padding: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
           
          }}
        >
          <span aria-hidden="true" style={{
              fontSize: '30px',
              paddingBottom:"6px"
             
            }}>&times;</span>
        </button>
      </Modal.Header>

<div className='d-flex align-items-center'>


<div className="" style={{ height: 100, width: 100, position: "relative" }}>

  <Image src={file ? (typeof file == 'string' ? file : URL.createObjectURL(file)) : Profile} roundedCircle style={{ height: 100, width: 100 }} />
 
  <label htmlFor="imageInput" className='' >
    <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 90, left: 80, transform: 'translate(-50%, -50%)' }} />
    <input
      type="file"
      accept="image/*"
      multiple
      className="sr-only"
      id="imageInput"
      onChange={handleImageChange}
      style={{ display: "none" }} />
  </label>


</div>
<div className='ps-3'>
  <div>
    <label style={{ fontSize: 16, fontWeight: 500, color: "#222222", fontFamily: "Gilroy" }}>Profile Photo</label>
  </div>
  <div>
    <label style={{ fontSize: 14, fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>Max size of image 10MB</label>
  </div>
</div>
</div>

      <div  className='row mt-4'>
      
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>First Name</Form.Label>
              <FormControl
                id="form-controls"
                placeholder='Enter name'
                type="text"
                value={firstname}
                onChange={(e) => handleFirstName(e)}
                style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
              />
            </Form.Group>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Last Name</Form.Label>
              <FormControl
                type="text"
                id="form-controls"
                placeholder='Enter name'
                value={lastname}
                onChange={(e) => handleLastName(e)}
                style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
              />
            </Form.Group>
          </div>
       
       
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Phone Number</Form.Label>
              <FormControl
                type="phone"
                id="form-controls"
                placeholder='Enter mobile Number'
                maxLength={10}
                value={phone}
                onChange={(e) => handlePhone(e)}
                style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
              />
              <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
            </Form.Group>
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Email Id</Form.Label>
              <FormControl
                type="text"
                id="form-controls"
                placeholder='Enter email address'
                value={email}
                onChange={(e) => handleEmail(e)}
              
                style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
              />
              <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
            </Form.Group>
          </div>
        
      
          <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
            <Form.Group className="mb-3">
              <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Address</Form.Label>
              <FormControl
                type="text"
                id="form-controls"
                value={address}
                placeholder='Enter address'
                onChange={(e) => handleAddress(e)}
                            style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
              />
            </Form.Group>
            </div>
            </div>
     
      
      <Button onClick={handleAddCustomerDetails} className=' col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" ,marginTop:20}} >
      Add an customer
</Button>
    </div>
  


  </div>
</Modal.Body>

<Modal.Footer style={{ border: "none" }}>
</Modal.Footer>
</Modal.Dialog>
</Modal>

    </div>
  )
}
export default AddCustomer;
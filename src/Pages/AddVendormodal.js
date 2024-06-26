import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/Create-button.png'
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';



function StaticExample({ show, handleClose }) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();





  const [file, setFile] = useState(null)
  const [first_Name, setFirst_Name] = useState('')
  const [last_Name, setLast_Name] = useState('')
  const [vendor_Mobile, setVendor_Mobile] = useState('')
  const [address, setAddress] = useState('')
  const [email_Id, setEmail_Id] = useState('')

  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];
    if (fileimgage) {
      setFile(fileimgage);
    }
  };

  const handleFirstNameChange = (e) => {
    setFirst_Name(e.target.value)
  }

  const handleLastNameChange = (e) => {
    setLast_Name(e.target.value)
  }

  const handleMobileChange = (e) => {
    setVendor_Mobile(e.target.value)
  }

  const handleAddressChange = (e) => {
    setAddress(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail_Id(e.target.value)
  }

const handleAddVendor = () =>{
if(first_Name &&  last_Name && vendor_Mobile && email_Id && address ){
  dispatch({ type : 'ADDVENDOR' ,
     payload :  
     {profile : file, first_Name: first_Name, Last_Name: last_Name ,Vendor_Mobile: vendor_Mobile, Vendor_Email: email_Id, Vendor_Address: address   }})
     setFile('')
     handleClose()
     setFirst_Name('')
     setLast_Name('')
     setVendor_Mobile('')
     setAddress('')
     setEmail_Id('')
    }
else{
  Swal.fire({
    icon: 'warning',
    title: 'Please Enter All Fields',
    timer:1000
     });
}
}





  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial', fontFamily: "sans-serif" }}
    >
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontSize: 18, color: "#000000", fontFamily: "sans-serif", fontWeight: 600 }}>Add a vendor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className='d-flex align-items-center'>


            <div className="" style={{ height: 70, width: 70, position: "relative" }}>

              <Image src={file ? URL.createObjectURL(file) : Profile} roundedCircle style={{ height: 70, width: 70 }} />
              <label htmlFor="imageInput" className=''>
                <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 60, left: 60, transform: 'translate(-50%, -50%)' }} />
              </label>



              <input
                type="file"
                accept="image/*"
                multiple
                className="sr-only"
                id="imageInput"
                onChange={handleImageChange}
                style={{ display: "none" }} />

            </div>
            <div className='ps-2'>
              <div>
                <label style={{ fontSize: 18, fontWeight: 400 }}>Profile Photo</label>
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 400 }}>Max size of image 10MB</label>
              </div>
            </div>
          </div>

          <div className='row mt-3'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 15, color: "#000000", fontFamily: "sans-serif", fontWeight: 500 }}>First Name</Form.Label>
                <Form.Control onChange={(e)=> handleFirstNameChange(e)} value={first_Name} type="text" placeholder="Enter name" style={{ fontSize: 14, color: "#000000", fontFamily: "sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid lightgray" }} />
              </Form.Group>

            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 15, color: "#000000", fontFamily: "sans-serif", fontWeight: 500 }}>Last Name</Form.Label>
                <Form.Control value={last_Name} onChange={(e)=> handleLastNameChange(e)} type="text" placeholder="Enter name" style={{ fontSize: 14, color: "#000000", fontFamily: "sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid lightgray" }} />
              </Form.Group>

            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 15, color: "#000000", fontFamily: "sans-serif", fontWeight: 500 }}>Mobile number</Form.Label>
                <Form.Control value={vendor_Mobile} onChange={(e)=>  handleMobileChange(e)} type="text" placeholder="Enter Mobile Number" maxLength={10} style={{ fontSize: 14, color: "#000000", fontFamily: "sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid lightgray" }} />
              </Form.Group>

            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 15, color: "#000000", fontFamily: "sans-serif", fontWeight: 500 }}>Email ID</Form.Label>
                <Form.Control value={email_Id} onChange={(e)=> handleEmailChange(e)} type="email" placeholder="Enter email address" style={{ fontSize: 14, color: "#000000", fontFamily: "sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid lightgray" }} />
              </Form.Group>

            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 15, color: "#000000", fontFamily: "sans-serif", fontWeight: 500 }}>Address</Form.Label>
                <Form.Control value={address} onChange={(e)=>  handleAddressChange(e)} type="text" placeholder="Enter Address" style={{ fontSize: 14, color: "#000000", fontFamily: "sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid lightgray" }} />
              </Form.Group>

            </div>
          </div>

        </Modal.Body>
        <Modal.Footer style={{ border: "none" }}>

          <Button  className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 500 }} onClick={handleAddVendor}>
            Add vendor
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StaticExample;
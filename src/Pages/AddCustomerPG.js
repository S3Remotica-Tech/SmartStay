import { Button, Offcanvas, Form, FormControl } from 'react-bootstrap';
import moment from 'moment';
import React, { useState, useEffect, useCallback } from "react";
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { FaPlusCircle } from "react-icons/fa";
import { InputGroup, Pagination } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Plus from '../Assets/Images/New_images/add-circle.png'
import imageCompression from 'browser-image-compression';
import Image from 'react-bootstrap/Image';
import Profile from '../Assets/Images/New_images/profile-picture.png';

import { MdError } from 'react-icons/md';

function AddCustomer({ show, handleClosing, currentItem }) {
  const state = useSelector(state => state)
  const dispatch = useDispatch();

  console.log("state ", state)
  console.log("add custom", currentItem)

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
  const [RoomRent, setRoomRent] = useState('')
  const [AdvanceAmount, setAdvanceAmount] = useState('')
  const [errors, setErrors] = useState({});

  // const handleFirstName = (e) => setFirstname(e.target.value);
  // const handleLastName = (e) => setLastname(e.target.value);
  const [generalError, setGeneralError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [countryCodeError, setCountryCodeError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [advanceAmountError, setAdvanceAmountError] = useState('');
  const [roomRentError, setRoomRentError] = useState('');
  const [addressError, setAddressError] = useState('');
  

  const handleFirstName = (e) => {
    const value = e.target.value;
    setGeneralError('')
    setFirstNameError('')
    // Allow empty value (e.g., when clearing the field)
    if (value === "") {
      setFirstname(value);
      setErrors(prevErrors => ({ ...prevErrors, first_Name: "First name cannot be empty or spaces only" }));
      return;
    }

    // If not empty and contains text, update the value and clear errors
    if (value.trim() !== "") {
      setFirstname(value);
      setErrors(prevErrors => ({ ...prevErrors, first_Name: "" }));
    }
  };


  const handleLastName = (e) => {
    const value = e.target.value;
    setGeneralError('')

    if (value === "") {
      setLastname(value);
      setErrors(prevErrors => ({ ...prevErrors, last_Name: "Last name cannot be empty or spaces only" }));
      return;
    }


    if (value.trim() !== "") {
      setLastname(value);
      setErrors(prevErrors => ({ ...prevErrors, last_Name: "" }));
    }
  };




  const handlePhone = (e) => {
    setGeneralError('')
    setPhoneError('')
    dispatch({ type: 'CLEAR_PHONE_ERROR'})
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setPhone(value);
    }
  };



  const [countryCode, setCountryCode] = useState('91');


  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
    setGeneralError('')
    setCountryCodeError('')
  };


  const [emailError, setEmailError] = useState('');

  const handleEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
    setGeneralError('')
dispatch({ type: 'CLEAR_EMAIL_ERROR'})
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const isValidEmail = emailRegex.test(email);

    if (isValidEmail) {
      setEmailError('');
    } else {
      setEmailError('Invalid Email Id *');
    }

    if(!email){
      setEmailError('');
    }
  };




  const handleAddress = (e) => {

    const value = e.target.value;
    setGeneralError('')
setAddressError('')
    if (value === "") {
      setAddress(value);
      setErrors(prevErrors => ({ ...prevErrors, last_Name: "Last name cannot be empty or spaces only" }));
      return;
    }


    if (value.trim() !== "") {
      setAddress(value);
      setErrors(prevErrors => ({ ...prevErrors, last_Name: "" }));
    }




  }
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

  const handleAddCustomerDetails = () => {

    const Hostel_Id = currentItem.room.Hostel_Id
    const Floor_Id = currentItem.room.Floor_Id
    const Room_Id = currentItem.room.Room_Id
    const Bed_Id = currentItem.bed.bed_no

    const filterData_Hostel_Name = state.UsersList.hostelList.filter((view) => {
      return view.id == Hostel_Id
    })
    // console.log("filterData_Hostel_Name[0]?.Name", filterData_Hostel_Name[0]?.Name)

    if (!firstname && !phone && !AdvanceAmount && !RoomRent && !address ) {
      setGeneralError('Please fill in all the required fields.');
      return;
    }

    if (!firstname) {
      setFirstNameError('Please enter First Name');
      return;
    }

    if (!countryCode) {
      setCountryCodeError('Please enter Country Code');
      return;
    }

    if (!phone) {
      setPhoneError('Please enter Phone Number');
      return;
    }

    if (phone.length < 10) {
      setPhoneError('Phone number must be 10 digits long');
      return;
    }

    // if (!email) {
    //   setEmailError('Please enter Email');
    //   return;
    // }

    if (emailError) {
      setEmailError(emailError);
      return;
    }

   

    if (!address) {
      setAddressError('Please enter Address');
      return;
    }
    if (!AdvanceAmount || isNaN(AdvanceAmount) || AdvanceAmount <= 0) {
      setAdvanceAmountError('Please enter a valid Advance Amount');
      return;
    }

    if (!RoomRent || isNaN(RoomRent) || RoomRent <= 0) {
      setRoomRentError('Please enter a valid Room Rent');
      return;
    }
    const mobileNumber = `${countryCode}${phone}`

    if (firstname && phone && AdvanceAmount && RoomRent && address && countryCode) {
      dispatch({
        type: 'ADDUSER',
        payload: {
          profile: file,
          firstname: firstname,
          lastname: lastname,
          Phone: mobileNumber,
          Email: email,
          hostel_Id: Hostel_Id,
          Floor: Floor_Id,
          Rooms: Room_Id,
          Bed: Bed_Id,
          Address: address,
          HostelName: filterData_Hostel_Name[0]?.Name,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
        }
      })

    } else {

    }

  }






  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      setFirstname('');
      setLastname('');
      setAddress('');
      setPhone('');
      setEmail('');
      setFile(null);
      setRoomRent('')
      setAdvanceAmount('')
      handleClosing()
    }
  }, [state.UsersList?.statusCodeForAddUser]);

















  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    // handleInputChange()
    setRoomRent(roomRentValue);
    setGeneralError('')
    setRoomRentError('')
  }


  const handleAdvanceAmount = (e) => {
    // handleInputChange()
    const advanceAmount = e.target.value;
    setAdvanceAmount(advanceAmount)
    setAdvanceAmountError('')
      setGeneralError('')
    

  }

  useEffect(() => {
    dispatch({ type: 'COUNTRYLIST' })
  }, [])




  return (
    <div>
      <Modal show={show} onHide={handleClosing} centered backdrop="static">
        <Modal.Dialog style={{ maxWidth: 950, paddingRight: "10px", paddingRight: "10px", borderRadius: "30px" }} className='m-0 p-0'>

      
      
      
          <Modal.Body>

            <div className='d-flex align-items-center'>



              <div>

                <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
                  <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>Add an customer</div>
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
                      paddingBottom: "6px"

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

                <div className='row mt-4'>
                {generalError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {generalError}
    </label>
  </div>
)}

{state.UsersList.phoneError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {state.UsersList.phoneError
      }
    </label>
  </div>
)}

                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>First Name <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                      <FormControl
                        id="form-controls"
                        placeholder='Enter name'
                        type="text"
                        value={firstname}
                        onChange={(e) => handleFirstName(e)}
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: firstname ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                    </Form.Group>
                    {firstNameError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {firstNameError}
    </label>
  </div>
)}

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
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: lastname ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                    </Form.Group>
                  </div>


                  {/* <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Phone Number</Form.Label>
                      <FormControl
                        type="phone"
                        id="form-controls"
                        placeholder='Enter mobile Number'
                        maxLength={10}
                        value={phone}
                        onChange={(e) => handlePhone(e)}
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: phone ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                      <p id="MobileNumberError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p>
                    </Form.Group>
                  </div> */}


                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500
                      }}>
                        Mobile no. <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </Form.Label>

                      <InputGroup>
                        <Form.Select
                          value={countryCode}
                          id="vendor-select-pg"
                          onChange={handleCountryCodeChange}
                          style={{
                            border: "1px solid #D9D9D9",
                            borderRadius: "8px 0 0 8px",
                            height: 50,
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: countryCode ? 600 : 500,
                            boxShadow: "none",
                            backgroundColor: "#fff",
                            maxWidth: 90
                          }}
                        >
                          {
                            state.UsersList?.countrycode && state.UsersList?.countrycode?.country_codes?.map((view) => {
                              return <option key={view.country_code} value={view.country_code}>+{view.country_code}</option>
                            })


                          }


                        </Form.Select>
                        <Form.Control
                          value={phone}
                          onChange={(e) => handlePhone(e)}
                          type="text"
                          placeholder="9876543210"
                          maxLength={10}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: phone ? 600 : 500,
                            boxShadow: "none",
                            borderLeft: "unset",
                            borderRight: "1px solid #D9D9D9",
                            borderTop: "1px solid #D9D9D9",
                            borderBottom: "1px solid #D9D9D9",
                            height: 50,
                            borderRadius: "0 8px 8px 0",
                          }}
                        />
                      </InputGroup>
                    </Form.Group>

                    {phoneError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {phoneError}
    </label>
  </div>
)}

{countryCodeError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {countryCodeError}
    </label>
  </div>
)}

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

                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: email ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                      {/* <p id="emailIDError" style={{ color: 'red', fontSize: 11, marginTop: 5 }}></p> */}
                    </Form.Group>

                   

                    {emailError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {emailError}
    </label>
  </div>
)}
{state.UsersList.emailError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {state.UsersList.emailError}
    </label>
  </div>
)}

                  </div>


                  <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Address  <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        value={address}
                        placeholder='Enter address'
                        onChange={(e) => handleAddress(e)}
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: address ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                    </Form.Group>

                   
                    {addressError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {addressError}
    </label>
  </div>
)}



                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="">
                      <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Advance Amount <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder='Enter amount'
                        value={AdvanceAmount}
                        onChange={(e) => handleAdvanceAmount(e)}
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: AdvanceAmount ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                    </Form.Group>
                    

                    {advanceAmountError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {advanceAmountError}
    </label>
  </div>
)}


                  </div>
                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Rental Amount  <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder='Enter amount'
                        value={RoomRent}
                        onChange={(e) => handleRoomRent(e)}
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: RoomRent ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                      />
                    </Form.Group>
                                        {roomRentError && (
  <div className="d-flex align-items-center p-1 mb-2">
    <MdError style={{ color: "red", marginRight: '5px' }} />
    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
      {roomRentError}
    </label>
  </div>
)}

                  </div>
                </div>


                <Button onClick={handleAddCustomerDetails} className=' col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat", marginTop: 20 }} >
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
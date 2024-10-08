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
import { MdError } from "react-icons/md";

function AddBed( {show, handleClose ,currentItem}) {
  
    const state = useSelector(state => state)
    const dispatch = useDispatch();
   

    console.log("currentItem",currentItem)
    
    const [bedNo, setBedNo] = useState('');
  const [amount, setAmount] = useState('');

  const handleBedNoChange = (e) => {
    setBedNo(e.target.value);
    setGeneralError('');
    setBedError('');
    dispatch({ type: 'CLEAR_ALREADY_BED'})
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setGeneralError('');
    setAmountError(''); 
  };


  console.log("add bed state", state)
  
  useEffect(()=>{
    dispatch({ type: 'CLEAR_ALREADY_BED'})
  },[])    
    
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
    
  



// useEffect(() => {

//   if (state.PgList.statusCodeCreateRoom == 200) {
//     setTimeout(() => {
//       dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: floorId, hostel_Id: Hostel_Id } })
//     }, 2000)

//     setTimeout(() => {
//       dispatch({ type: 'CLEAR_CREATE_ROOM_STATUS_CODE' });
//     }, 2500);

//   }
// }, [state.PgList.statusCodeCreateRoom])

const [bedError, setBedError] = useState('');
const [amountError, setAmountError] = useState('');
const [generalError, setGeneralError] = useState('');




const handleSubmit =() =>{

  if (!bedNo && !amount) {
    setGeneralError('Please enter all required fields.');
    return;
  } else {
    setGeneralError('');
  }


  if (!bedNo) {
    setBedError('Please enter a valid bed number.');
    return;
  } else {
    setBedError(''); 
  }
  

  if (!amount || isNaN(amount) || amount <= 0) {
    setAmountError('Please enter a valid amount.');
    return;
  } else {
    setAmountError(''); 
  }


  if(currentItem.item.hostel_Id && currentItem.item.floorID && currentItem.Room_Id && bedNo && amount){
    dispatch({ type: 'CREATEBED', payload:{ hostel_id: currentItem.item.hostel_Id,floor_id:currentItem.item.floorID,room_id: currentItem.Room_Id, bed_no:bedNo, amount: amount}})
 
    
    setGeneralError('');
   
  }else{
    setGeneralError('Please enter all required fields.');
  }
}

useEffect(() => {
  if (state.PgList.createBedStatusCode == 200) {
    setBedNo('')
    setAmount('')
  }
}, [state.PgList.createBedStatusCode]) 



  return (
    <div
    className="modal show"
    style={{
      display: 'block', position: 'initial'
    }}
  >
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Dialog style={{ maxWidth: 850, width: '100%' }} className='m-0 p-0'>
        <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
          <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy", fontWeight: 600 }}>Add bed</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          

          <div className='row mt-2'>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500}}>Bed name or no. <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                <Form.Control 
 value={bedNo}
 onChange={handleBedNoChange}
                 type="text" placeholder="Enter bed name or no." style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight:bedNo ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>

            </div>
            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500}}>Amount <span style={{ color: 'red', fontSize: '20px' }}>*</span></Form.Label>
                <Form.Control 
                 value={amount}
                 onChange={handleAmountChange}
                 type="text" placeholder="Enter amount" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight:amount ? 600 : 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>

            </div>
            
          </div>

        </Modal.Body>


        {bedError && (
    <div className="d-flex align-items-center p-1 mb-2">
      <MdError style={{ color: "red", marginRight: '5px' }} />
      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
        {bedError}
      </label>
    </div>
  )}


  {amountError && (
    <div className="d-flex align-items-center p-1 mb-2">
      <MdError style={{ color: "red", marginRight: '5px' }} />
      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
        {amountError}
      </label>
    </div>
  )}


  {generalError && (
    <div className="d-flex align-items-center p-1 mb-2">
      <MdError style={{ color: "red", marginRight: '5px' }} />
      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
        {generalError}
      </label>
    </div>
  )}



{state.PgList && state.PgList?.alreadyBedAvailable && (
    <div className="d-flex align-items-center p-1 mb-2">
      <MdError style={{ color: "red", marginRight: '5px' }} />
      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
        {state.PgList?.alreadyBedAvailable}
      </label>
    </div>
  )}
        <Modal.Footer style={{ border: "none" }}>

          <Button 
          onClick={handleSubmit}
           className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat" }}>
          Add bed
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  </div>
  )
}

export default AddBed

import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'flatpickr/dist/flatpickr.css';
import Closecircle from '../Assets/Images/close-circle.svg';
import Calender from '../Assets/Images/calendar.svg';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import moment from 'moment';




const CheckOutForm = ({ show, handleClose ,currentItem}) => {



  const state = useSelector(state => state)
  const dispatch = useDispatch();



  console.log("state for cHECKoUT", state)
  console.log("currentItem",currentItem)


  const initialDate = new Date();
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [checkOutDate, setCheckOutDate] = useState('');
  const [selectedHostel, setSelectedHostel] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [noticeDays, setNoticeDays] = useState('');
  const [comments, setComments] = useState('');
  const calendarRef = useRef(null);

  const handleHostelChange = (event) => {
    setSelectedHostel(event.target.value);
    setGeneralError('')
    setHostelError('')
    dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR'})
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
    setGeneralError('')
    setCustomerError('')
  };

  const handleNoticeDaysChange = (event) => {
    setNoticeDays(event.target.value);
  };

  const handleCommentsChange = (event) => {
    setGeneralError('')
    setComments(event.target.value);
  };

  const handleDateChange = (date) => {
    console.log("Selected date from calendar:", date);
    setCheckOutDateError('')
    setGeneralError('')
    const formattedDate = moment(date[0]).format('DD-MM-YYYY');
    setCheckOutDate(formattedDate);
    calendarRef.current.flatpickr.close();
  
    const current_date = new Date();
    const notice_period = Math.ceil((new Date(date[0]) - current_date) / (1000 * 60 * 60 * 24));
    setNoticeDays(notice_period);
  };





console.log("checkOutDate",checkOutDate,)



const [generalError, setGeneralError] = useState('')
const [customerWError, setCustomerError] = useState('')
const [hostelError, setHostelError] = useState('')
const [checkoUtDateError, setCheckOutDateError] = useState('')
const [isChangedError, setIsChangedError] = useState('')

const handleCheckOutCustomer = () => {

  

  const formattedDate = moment(checkOutDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
console.log("formattedDate",formattedDate, "checkOutDate",checkOutDate);







if (!selectedCustomer && !selectedHostel && !checkOutDate) {
  setGeneralError('Please select all mandatory fields');
  return;
}


if (!selectedCustomer) {
  setCustomerError('Please select a customer.');
  return;
}

if (!selectedHostel) {
  setHostelError('Please select a hostel.');
  return;
}

if (!checkOutDate) {
  setCheckOutDateError('Please enter a checkout date.');
  return;
}



const hasChanges = checkOutDate !== currentItem?.CheckoutDate ||
selectedHostel !== currentItem?.Hostel_Id ||
selectedCustomer !== currentItem?.ID ||
noticeDays !== currentItem?.notice_period ||
comments !== currentItem?.checkout_comment;


if (!hasChanges) {
  setIsChangedError('No Changes detected');
  return;
}












if(selectedCustomer && selectedHostel &&  checkOutDate){
  dispatch({ type: 'ADDCHECKOUTCUSTOMER',payload: {checkout_date:formattedDate,
     user_id: selectedCustomer,
     hostel_id :selectedHostel, 
    comments: comments, 
    action : currentItem ? 2 : 1} })
  }

}




useEffect(()=>{
if(currentItem){

 setCheckOutDate(currentItem.CheckoutDate);
  setSelectedHostel(currentItem.Hostel_Id);
  setSelectedCustomer(currentItem.ID);
 setNoticeDays(currentItem.notice_period);
  setComments(currentItem.checkout_comment);

}else{
  setCheckOutDate('');
  setSelectedHostel('');
  setSelectedCustomer('');
 setNoticeDays('');
  setComments('');
  dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR'})
}
},[currentItem, show])









  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title style={{ fontWeight: '600', fontSize: '16px', fontFamily:"Gilroy" }}>{currentItem ?  'Edit Check-out' :  'Add Check-out'}</Modal.Title>
        <img
          src={Closecircle}
          alt="Close"
          style={{ cursor: 'pointer', width: '24px', height: '24px' }}
          onClick={handleClose}
        />
      </Modal.Header>

      

      {state.UsersList.errorMessageAddCheckOut && (
                    <div className="d-flex align-items-center p-1 mb-2 mt-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {state.UsersList.errorMessageAddCheckOut}
                        </label>
                    </div>
                )}


{isChangedError && (
                    <div className="d-flex align-items-center p-1 mb-2 mt-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {isChangedError}
                        </label>
                    </div>
                )}
{generalError && (
                    <div className="d-flex align-items-center p-1 mb-2 mt-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {generalError}
                        </label>
                    </div>
                )}

      <Modal.Body>
        {/* <form className="space-y-4"> */}
        <div className="form-group">
          <label style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Paying Guest <span style={{ color: 'red', fontSize: '20px' }}>*</span></label>
          <Form.Group controlId="category" style={{ border: "1px solid rgb(217, 217, 217)", borderRadius: '8px', marginTop: '10px' }}>
            <Form.Select aria-label="Default select example"
               value={selectedHostel}
               onChange={handleHostelChange}

              className='' id="vendor-select" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 600 }}>
              <option value="" >Select an hostel</option>
              {state.UsersList.hostelList && state.UsersList.hostelList.map((view) => (
                <>

                  <option key={view.id} value={view.id}>{view.Name}</option>

                </>
              ))}
            </Form.Select>
          </Form.Group>
          {hostelError && (
                    <div className="d-flex align-items-center p-1 mb-2 mt-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {hostelError}
                        </label>
                    </div>
                )}
        </div>

        <div className="form-group">
          <label className='mt-2' style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Customer <span style={{ color: 'red', fontSize: '20px' }}>*</span></label>
          <Form.Group controlId="customer" style={{ border: "1px solid rgb(217, 217, 217)", borderRadius: '8px', marginTop: '10px' }}>
            <Form.Select className="" style={{ borderRadius: '8px' }} id="vendor-select"
            
            value={selectedCustomer}
            onChange={handleCustomerChange}
            >

              <option value="">Select an customer</option>

             
              { state.UsersList.Users &&  state.UsersList.Users.map((view) => (
                <>

                  <option key={view.ID} value={view.ID}>{view.Name}</option>

                </>
              ))}
              
            </Form.Select>
          </Form.Group>
         

          {customerWError && (
                    <div className="d-flex align-items-center p-1 mb-2 mt-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {customerWError}
                        </label>
                    </div>
                )}


        </div>

        <div className='d-flex mt-2'>
          <div className="form-row d-flex">
            <div className="form-group col-md-6 position-relative">
              <label htmlFor="check-out-date" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Check-out Date <span style={{ color: 'red', fontSize: '20px' }}>*</span></label>
              <div className='position-relative'>
                <input
                  type="text"
                  readOnly

                  className="form-control mt-2"
                  placeholder="DD-MM-YYYY"
                  value={checkOutDate}
                  onClick={() => calendarRef.current.flatpickr.open()}
                  style={{ height: '50px', borderRadius: '8px', width: '220px' }}
                />
                <img
                  src={Calender}
                  onClick={() => calendarRef.current.flatpickr.open()}
                  style={{
                    position: 'absolute',
                    right: '20px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer'
                  }}
                  alt="Calendar Icon"
                />
                <Flatpickr
                  ref={calendarRef}
                  onChange={handleDateChange}
                  options={{
                    dateFormat: "Y-m-d",
                    
                  }}
                  style={{
                    display: 'none',
                    padding: 15,
                    fontSize: 16,
                    width: "100%",
                    borderRadius: 8,
                    border: "1px solid #D9D9D9",
                    position: 'absolute',
                    top: 100,
                    left: 100,
                    zIndex: 1000,
                  }}
                />
              </div>
              {checkoUtDateError && (
                    <div className="d-flex align-items-center p-1 mb-2 mt-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {checkoUtDateError}
                        </label>
                    </div>
                )}
            </div>




            <div className="form-group col-md-6 position-relative" style={{ marginLeft: '12px' }}>
              <label htmlFor="notice-days" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Notice Days</label>
              <Form.Group controlId="notice-days" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
                <Form.Control
                  disabled
                  value={noticeDays}
                  type="text" placeholder="" style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 600, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }} />
              </Form.Group>
            </div>
          </div>
        </div>

        <div className="form-group col-md-12">
          <label htmlFor="comments" className='mt-2' style={{ fontSize: '14px', fontWeight: '500' }}>Comments</label>
          <input
            type="text"
            name="comments"
            id="comments"
            value={comments}
            onChange={handleCommentsChange}
            className="form-control mt-2"
            placeholder="Add Comments"
            required
            style={{ height: '50px', borderRadius: '8px' }}
          />
        </div>

        <Button className="btn btn-primary mt-4" style={{
          borderRadius: '8px',
          fontFamily: "Gilroy",
          fontWeight: '600',
          fontSize: '14px',
          padding: '16px 24px', width: '100%'
        }}   onClick={handleCheckOutCustomer}>{currentItem ?  'Save Changes' :  'Add Check-out'}</Button>

      </Modal.Body>
    </Modal>
  );
};

export default CheckOutForm;

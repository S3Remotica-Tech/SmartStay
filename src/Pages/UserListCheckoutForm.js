import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'flatpickr/dist/flatpickr.css';
import Closecircle from '../Assets/Images/close-circle.svg';
import Calender from '../Assets/Images/calendar.svg';
import Flatpickr from 'react-flatpickr';
import { useDispatch, useSelector } from 'react-redux';





const CheckOutForm = ({ show, handleClose }) => {



  const state = useSelector(state => state)
  const dispatch = useDispatch();



  console.log("state for cHECKoUT", state)


  const initialDate = new Date();
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [checkOutDate, setCheckOutDate] = useState(formatDate(initialDate));
  const [selectedCustomer, setSelectedCustomer] = useState("Customer 1");
  const [noticeDays, setNoticeDays] = useState("");
  const calendarRef = useRef(null);

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.value);
  };

  const handleNoticeDaysChange = (event) => {
    setNoticeDays(event.target.value);
  };

  const handleDateChange = (date) => {
    setCheckOutDate(formatDate(date[0]));
    calendarRef.current.flatpickr.close();
  };

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header className="d-flex justify-content-between align-items-center">
        <Modal.Title style={{ fontWeight: '600', fontSize: '16px' }}>Add Check-out</Modal.Title>
        <img
          src={Closecircle}
          alt="Close"
          style={{ cursor: 'pointer', width: '24px', height: '24px' }}
          onClick={handleClose}
        />
      </Modal.Header>
      <Modal.Body>
        {/* <form className="space-y-4"> */}
        <div className="form-group">
          <label style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Paying Guest</label>
          <Form.Group controlId="category" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
            <Form.Select aria-label="Default select example"
              // value={hostelName} onChange={handleHostelNameChange}

              className='' id="vendor-select" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 600 }}>
              <option value="" >Select an hostel</option>
              {state.UsersList.hostelList && state.UsersList.hostelList.map((view) => (
                <>

                  <option key={view.id} value={view.id}>{view.Name}</option>

                </>
              ))}
            </Form.Select>
          </Form.Group>
        </div>

        <div className="form-group">
          <label className='mt-2' style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Customer</label>
          <Form.Group controlId="customer" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
            <Form.Select className="" style={{ borderRadius: '8px' }}>

              <option value="">Select an customer</option>

             
              { state.UsersList.Users &&  state.UsersList.Users.map((view) => (
                <>

                  <option key={view.ID} value={view.ID}>{view.Name}</option>

                </>
              ))}
              
            </Form.Select>
          </Form.Group>
        </div>

        <div className='d-flex mt-2'>
          <div className="form-row d-flex">
            <div className="form-group col-md-6 position-relative">
              <label htmlFor="check-out-date" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Check-out Date</label>
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
            </div>




            <div className="form-group col-md-6 position-relative" style={{ marginLeft: '12px' }}>
              <label htmlFor="notice-days" style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Notice Days</label>
              <Form.Group controlId="notice-days" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
                <Form.Control
                  disabled
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
        }}>Add Check-Out</Button>

      </Modal.Body>
    </Modal>
  );
};

export default CheckOutForm;

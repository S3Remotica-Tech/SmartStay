import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import 'flatpickr/dist/flatpickr.css';
import Closecircle from '../Assets/Images/close-circle.svg';
import Calender from '../Assets/Images/calendar.svg';
import Flatpickr from 'react-flatpickr';

const CheckOutForm = ({ show, handleClose }) => {
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
    <Modal show={show} onHide={handleClose} centered>
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
        <form className="space-y-4">
          <div className="form-group">
            <label style={{ fontSize: '14px', fontWeight: '500' }}>Paying Guest</label>
            <Form.Group controlId="category" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
              <Form.Select className="mt-2" style={{ borderRadius: '8px' }}>
                <option value="Royal Grand Hostel">Select a PG</option>
                <option value="1">Product 1</option>
                <option value="2">Product 2</option>
                <option value="3">Product 3</option>
                <option value="4">Product 4</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className="form-group">
            <label className='mt-2' style={{ fontSize: '14px', fontWeight: '500' }}>Customer</label>
            <Form.Group controlId="customer" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
            <Form.Select className="mt-2" style={{ borderRadius: '8px' }}>
                <option value="Royal Grand Hostel">Customer 1</option>
                <option value="1">Customer 2</option>
                <option value="2">Customer 3</option>
                <option value="3">Customer 4</option>
                <option value="4">Customer 5</option>
              </Form.Select>
            </Form.Group>
          </div>

          <div className='d-flex mt-2'>
            <div className="form-row d-flex">
              <div className="form-group col-md-6 position-relative">
                <label htmlFor="check-out-date" style={{ fontSize: '14px', fontWeight: '500' }}>Check-out Date</label>
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
                <label htmlFor="notice-days" style={{ fontSize: '14px', fontWeight: '500' }}>Notice Days</label>
                <Form.Group controlId="notice-days" style={{ border: "1px solid #D9D9D9", borderRadius: '8px', marginTop: '10px' }}>
                  <Form.Select className="mt-2" value={noticeDays} onChange={handleNoticeDaysChange}
                    style={{ borderRadius: '8px', width: '220px' }}>
                    <option value="">Select days</option>
                    <option value="1">1 Day</option>
                    <option value="2">2 Days</option>
                    <option value="3">3 Days</option>
                    <option value="4">4 Days</option>
                    <option value="5">5 Days</option>
                  </Form.Select>
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

          <Button type="submit" className="btn btn-primary mt-4" style={{
            borderRadius: '8px',
            fontFamily: "Gilroy",
            fontWeight: '600',
            fontSize: '14px',
            padding: '16px 24px', width: '100%'
          }}>Add Check-out</Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default CheckOutForm;

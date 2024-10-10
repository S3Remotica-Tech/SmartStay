import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap'; 
import 'react-datepicker/dist/react-datepicker.css';
import Closecircle from '../Assets/Images/close-circle.svg'; 
import ArrowDown from '../Assets/Images/arrow-down.svg';
import Calender from '../Assets/Images/calendar.svg';
import DatePicker from 'react-datepicker';
import People from '../Assets/Images/People (2).svg';

const CheckOutForm = ({ show, handleClose }) => {
  const [checkOutDate, setCheckOutDate] = useState(new Date());
  const [selectedCustomer, setSelectedCustomer] = useState("Customer 1");

  const datePickerRef = useRef(null);

  const handleCalendarClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  const handleCustomerChange = (event) => {
    setSelectedCustomer(event.target.getAttribute("data-value"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="mt-2" style={{ fontSize: '14px', fontWeight: '500' }}>Paying Guest</label>
            <div className="input-group d-flex position-relative">
              <select id="category" className="form-control mt-2" style={{ borderRadius: '8px' }}>
                <option value="Royal Grand Hostel">Royal Grand Hostel</option>
                <option value="1">Product 1</option>
                <option value="2">Product 2</option>
                <option value="3">Product 3</option>
                <option value="4">Product 4</option>
              </select>
              <img src={ArrowDown} style={{
                position: 'absolute',
                right: '10px',
                top: '59%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }} alt="Arrow Down" />
            </div>
          </div>

          <div className="form-group">
            <label className="mt-2" style={{ fontSize: '14px', fontWeight: '500' }}>Customer</label>
            <div className="input-group d-flex position-relative">
              <div className="form-control d-flex align-items-center mt-2" style={{ borderRadius: '8px' }}>
                <img src={People} alt="Customer Icon" style={{ marginRight: '8px' }} />
                {selectedCustomer}
              </div>
              <img src={ArrowDown} style={{
                position: 'absolute',
                right: '10px',
                top: '59%',
                transform: 'translateY(-50%)',
                cursor: 'pointer'
              }} alt="Arrow Down" />
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  data-value="Customer 1"
                  onClick={handleCustomerChange}
                >
                  <img src={People} alt="Customer Icon" style={{ marginRight: '8px' }} />
                  Customer 1
                </a>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  data-value="Customer 2"
                  onClick={handleCustomerChange}
                >
                  <img src={People} alt="Customer Icon" style={{ marginRight: '8px' }} />
                  Customer 2
                </a>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  data-value="Customer 3"
                  onClick={handleCustomerChange}
                >
                  <img src={People} alt="Customer Icon" style={{ marginRight: '8px' }} />
                  Customer 3
                </a>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="#"
                  data-value="Customer 4"
                  onClick={handleCustomerChange}
                >
                  <img src={People} alt="Customer Icon" style={{ marginRight: '8px' }} />
                  Customer 4
                </a>
              </div>
            </div>
          </div>

          <div className="d-flex mt-2">
            <div className="form-row d-flex">
              <div className="form-group col-md-6 position-relative">
                <label htmlFor="payment-mode" style={{ fontSize: '14px', fontWeight: '500' }}>Check-out Date</label>
                <div className="position-relative">
                  <DatePicker
                    selected={checkOutDate}
                    onChange={(date) => setCheckOutDate(date)}
                    dateFormat="dd-MM-yyyy"
                    className="form-control mt-2"
                    ref={datePickerRef}
                  />
                  <img
                    src={Calender}
                    onClick={handleCalendarClick}
                    style={{
                      position: 'absolute',
                      right: '20px',
                      top: '59%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                    }}
                    alt="Calendar Icon"
                  />
                </div>
              </div>

              <div className="form-group col-md-6" style={{ marginLeft: '25px' }}>
                <label htmlFor="notice-days" style={{ fontSize: '14px', fontWeight: '500' }}>Notice Days</label>
                <input
                  type="text"
                  name="notice-days"
                  id="notice-days"
                  className="form-control mt-2"
                  placeholder="Select days"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group col-md-12">
            <label htmlFor="expense-amount" className="mt-2" style={{ fontSize: '14px', fontWeight: '500' }}>Comments</label>
            <input
              type="text"
              name="expense-amount"
              id="expense-amount"
              className="form-control mt-2"
              placeholder="anfankfjafbjkafajnfja"
              required
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

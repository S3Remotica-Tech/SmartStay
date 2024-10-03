import React, { useState, useRef } from 'react';
import { Modal, Button, Form, Row, Col, Alert } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import Calendars from '../Assets/Images/New_images/calendar.png';
import { CloseCircle } from 'iconsax-react';

function Addbooking({ show, handleClose }) {
  const calendarRef = useRef(null);

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [joiningDate, setJoiningDate] = useState(null);
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');

 
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    joiningDate: '',
    amount: '',
  });

  const validateForm = () => {
    const newErrors = {
      firstName: '',
      lastName: '',
      joiningDate: '',
      amount: '',
    };

    let isValid = true;

    // Validate first name
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    // Validate last name
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    // Validate joining date
    if (!joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
      isValid = false;
    }

    // Validate amount
    if (!amount.trim()) {
      newErrors.amount = 'Amount is required';
      isValid = false;
    } else if (isNaN(amount) || parseFloat(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (validateForm()) {
    
      setFirstName('');
      setLastName('');
      setJoiningDate(null);
      setAmount('');
      setComments('');
      setErrors({
        firstName: '',
        lastName: '',
        joiningDate: '',
        amount: '',
      });
      handleClose();
    }
  };

  return (
    <Modal show={show} centered backdrop="static">
      <Modal.Header className="d-flex justify-content-between" style={{ marginBottom: '10px' }}>
        <Modal.Title>New Booking</Modal.Title>
        <CloseCircle size="32" color="#222222" onClick={handleClose} />
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formNewFirstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  style={{ height: "50px" }}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  isInvalid={!!errors.firstName}
                />
                <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formNewLastName" className="mb-3">
                <Form.Label>Last Name </Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  style={{ height: "50px" }}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  isInvalid={!!errors.lastName}
                />
                <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-2" controlId="formNewJoiningDate">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Joining Date 
                </Form.Label>

                <div style={{ position: 'relative' }}>
                  <label
                    htmlFor="new-joining-date-input"
                    style={{
                      border: "1px solid #D9D9D9",
                      borderRadius: 8,
                      padding: 12,
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      color: "#222222",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: "pointer"
                    }}
                    onClick={() => {
                      if (calendarRef.current) {
                        calendarRef.current.flatpickr.open();
                      }
                    }}
                  >
                    {joiningDate instanceof Date && !isNaN(joiningDate)
                      ? joiningDate.toLocaleDateString('en-GB') 
                      : 'DD/MM/YYYY'}
                    <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                  </label>

                  <Flatpickr
                    ref={calendarRef}
                    value={joiningDate}
                    onChange={([date]) => setJoiningDate(date)}
                    style={{
                      padding: 15,
                      fontSize: 16,
                      width: "100%",
                      borderRadius: 8,
                      border: "1px solid #D9D9D9",
                      position: 'absolute',
                      top: 50,
                      left: 0,
                      zIndex: 1000,
                      display: "none",  
                    }}
                  />
                  {errors.joiningDate && <div className="text-danger mt-1">{errors.joiningDate}</div>}
                </div>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formNewAmount" className="mb-3">
                <Form.Label>Amount </Form.Label>
                <Form.Control
                  type="text"
                  value={amount}
                  style={{ height: "50px" }}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  isInvalid={!!errors.amount}
                />
                <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="formNewComments" className="mb-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  type="text"
                  value={comments}
                  style={{ height: "50px" }}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Enter comments"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          className="w-100"
          onClick={handleSave}
        >
          New Booking
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Addbooking;

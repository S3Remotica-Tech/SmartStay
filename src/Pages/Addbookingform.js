import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { CloseCircle } from 'iconsax-react';
import Calendars from '../Assets/Images/New_images/calendar.png';

const BookingModal = ({
  show,
  handleClose,
  mode, // 'add' or 'edit'
  customer, // customer object for edit mode
  handleSave, 
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [joiningDate, setJoiningDate] = useState(null);
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');
  const [paying,setPaying] = useState('');
  const [floor,setFloor] = useState('');
  const [room, setRoom] = useState('');
  const [bed, setBed] = useState('');

  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const calendarRef = useRef(null);

  useEffect(() => {
    if (mode === 'edit' && customer) {
      const nameParts = customer.name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setJoiningDate(new Date(customer.joiningDate));
      setAmount(customer.amount.replace('$', '')); 
      setComments(customer.comments || '');
    } else if (mode === 'add') {
      setFirstName('');
      setLastName('');
      setJoiningDate(null);
      setAmount('');
      setComments('');
    }
    setValidated(false);
    setFormErrors({});
  }, [mode, customer, show]);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const errors = {};

    // Validation Rules
    if (!firstName || firstName.trim() === '') {
        errors.firstName = 'First name is required.';
    }

    if (!lastName || lastName.trim() === '') {
        errors.lastName = 'Last name is required.';
    }

    if (!paying || paying.trim() === '') {
        errors.paying = 'Paying guest option is required.';
    }

    if (!floor || floor.trim() === '') {
        errors.floor = 'Floor selection is required.';
    }

    if (!room || room.trim() === '') {
        errors.room = 'Room selection is required.';
    }

    if (!bed || bed.trim() === '') {
        errors.bed = 'Bed selection is required.';
    }

    if (!joiningDate) {
        errors.joiningDate = 'Joining date is required.';
    }

    if (!amount || amount.trim() === '') {
        errors.amount = 'Amount is required.';
    } else {
        const amountNumber = parseFloat(amount);
        if (isNaN(amountNumber) || amountNumber <= 0) {
            errors.amount = 'Amount must be a positive number.';
        }
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
        const fullName = `${firstName.trim()} ${lastName.trim()}`;
        const updatedCustomer = {
            ...customer,
            name: fullName,
            joiningDate: joiningDate.toLocaleDateString('en-GB'),
            amount: `$${parseFloat(amount).toFixed(2)}`,
            comments: comments.trim(),
            paying,  
            floor,   
            room,    
            bed      
        };

        if (mode === 'add') {
            updatedCustomer.id = Date.now(); 
        }

        handleSave(updatedCustomer);
        handleClose();
    } else {
        setValidated(true);
    }
  };

  const isFormValid = () => {
    return (
        firstName &&
        lastName &&
       joiningDate &&
       amount &&
        paying &&
        floor &&
     room &&
     bed &&
     comments
    );
};

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title>{mode === 'edit' ? 'Edit Booking' : 'New Booking'}</Modal.Title>
          <CloseCircle size="32" color="#222222" onClick={handleClose} style={{ cursor: 'pointer' }} />
        </Modal.Header>
        <Modal.Body>
        <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={firstName}
                  className={formErrors.firstName ? 'is-invalid' : ''}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={lastName}
                  isInvalid={!!formErrors.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-2" controlId="formJoiningDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Joining Date
                </Form.Label>

                <div style={{ position: 'relative' }}>
                  <label
                    htmlFor="date-input"
                    style={{
                      border: "1px solid #D9D9D9",
                      borderRadius: 8,
                      padding: 12,
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: joiningDate ? 500 : 500,
                      color: "#222222",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (calendarRef.current && calendarRef.current.flatpickr) {
                        calendarRef.current.flatpickr.open();
                      }
                    }}
                  >
                    {joiningDate instanceof Date &&
                      !isNaN(joiningDate)
                      ? joiningDate.toLocaleDateString('en-GB')
                      : 'DD/MM/YYYY'}
                    <img
                      src={Calendars}
                      style={{ height: 24, width: 24, marginLeft: 10 }}
                      alt="Calendar"
                    />
                  </label>

                  <Flatpickr
                    ref={calendarRef}
                    value={joiningDate}
                    onChange={(date) => setJoiningDate(date[0])}
                    options={{
                      dateFormat: "d/m/Y",
                      allowInput: true,
                    }}
                    style={{
                      display: "none",
                    }}
                  />
                  {formErrors.joiningDate && (
                    <div className="invalid-feedback">{formErrors.joiningDate}</div>
                  )}
                </div>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formAmount" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Amount</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter amount"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={amount}
                  isInvalid={!!formErrors.amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.amount}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
  <Col>
    <Form.Group className="mb-2" controlId="formPaying">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Paying Guest <span style={{ color: "#FF0000" }}>*</span>
      </Form.Label>
      <Form.Select
        aria-label="Paying Guest"
        value={paying}
        isInvalid={!!formErrors.paying}
         className='' id="vendor-select"
        onChange={(e) => setPaying(e.target.value)}
        style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
      >
        <option value="">Select a PG</option>
        <option value="UPI/BHIM">Paying guest 1</option>
        <option value="CASH">Paying guest 2</option>
        <option value="Net Banking">Paying guest 3</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">{formErrors.paying}</Form.Control.Feedback>
    </Form.Group>

    
  </Col>
  <Col>
    <Form.Group className="mb-2" controlId="formFloor">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Floor <span style={{ color: "#FF0000" }}>*</span>
      </Form.Label>
      <Form.Select
        aria-label="Floor"
        value={floor}
        isInvalid={!!formErrors.floor}
        onChange={(e) => setFloor(e.target.value)}
            className='' id="vendor-select"
        style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
      >
        <option value="">Select a floor</option>
        <option value="Ground">Room no.201</option>
        <option value="First">Room no.202</option>
        <option value="Second">Room no.203</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">{formErrors.floor}</Form.Control.Feedback>
    </Form.Group>
  </Col>
</Row>

<Row>
  <Col>
    <Form.Group className="mb-2" controlId="formRoom">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Room <span style={{ color: "#FF0000" }}>*</span>
      </Form.Label>
      <Form.Select
        aria-label="Room"
        value={room}
        isInvalid={!!formErrors.room}
        onChange={(e) => setRoom(e.target.value)}
            className='' id="vendor-select"
        style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
      >
        <option value="">Select a room</option>
        <option value="Room 1">201</option>
        <option value="Room 2">202</option>
        <option value="Room 3">203</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">{formErrors.room}</Form.Control.Feedback>
    </Form.Group>
  </Col>
  <Col>
    <Form.Group className="mb-2" controlId="formBed">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Bed <span style={{ color: "#FF0000" }}>*</span>
      </Form.Label>
      <Form.Select
        aria-label="Bed"
        value={bed}
        isInvalid={!!formErrors.bed}
            className='' id="vendor-select"
        onChange={(e) => setBed(e.target.value)}
        style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
      >
        <option value="">Select a bed</option>
        <option value="Bed 1">01</option>
        <option value="Bed 2">02</option>
      </Form.Select>
      <Form.Control.Feedback type="invalid">{formErrors.bed}</Form.Control.Feedback>
    </Form.Group>
  </Col>
</Row>


          <Form.Group controlId="formComments" className="mb-3">
            <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Comments</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
            />
          </Form.Group>
       
          <Modal.Footer>
            <Button variant="primary" type="submit" className="w-100"
            
            style={{
               opacity: isFormValid() ? 1 : 0.5,
              cursor: isFormValid() ? 'pointer' : 'not-allowed',
              
              }} disabled={!isFormValid()}>
                   
              {mode === 'edit' ? 'Save Changes' : 'New Booking'}
             
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Form>
    </Modal>
  );
};

export default BookingModal;

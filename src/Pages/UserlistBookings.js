import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Image, Modal, Form, Row, Col } from 'react-bootstrap';
import './Userlistbooking.css';
import minus from '../Assets/Images/New_images/minus-square.png';
import Ellipse1 from '../Assets/Images/Ellipse 1.png';
import Ellipse2 from '../Assets/Images/Group 1 (2).png';
import Ellipse3 from '../Assets/Images/Ellipse 1 (1).png';
import Ellipse4 from '../Assets/Images/Group 1 (1).png';
import Ellipse5 from '../Assets/Images/Group 1.png';
import Ellipse6 from '../Assets/Images/New_images/Ellipse 1.png';
import Ellipse7 from '../Assets/Images/Ellipse 1 (5).png';
import Ellipse8 from '../Assets/Images/Ellipse 1 (6).png';
import Ellipse9 from '../Assets/Images/Ellipse 1 (7).png';
import Ellipse10 from '../Assets/Images/Ellipse 1 (8).png';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../Assets/Images/New_images/trash.png';
import Edit from '../Assets/Images/New_images/edit.png';
import Calendars from '../Assets/Images/New_images/calendar.png';
import { CloseCircle } from 'iconsax-react';

const initialCustomers = [
  { id: 1, name: "Kellie Turcotte", email: "kellie@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse1 },
  { id: 2, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse2 },
  { id: 3, name: "Esther Williamson", email: "esther@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse3 },
  { id: 4, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse4 },
  { id: 5, name: "Sabrina Gleason", email: "sabrina@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse5 },
  { id: 6, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse6 },
  { id: 7, name: "Homer Renner", email: "homer@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse7 },
  { id: 8, name: "Kaylynn Kenter", email: "kaylynn@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse8 },
  { id: 9, name: "Emmett Cormier III", email: "emmett@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse9 },
  { id: 10, name: "Tatiana Rosser", email: "tatiana@gmail.com", mobile: "+91 9876543210", bookingDate: "20 Mar 2024", joiningDate: "20 Mar 2024", amount: '$2500', avatar: Ellipse10 },
];

function Booking() {
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState(initialCustomers);

  // Separate state variables for the edit form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [joiningDate, setJoiningDate] = useState(null);
  const [amount, setAmount] = useState('');
  const [comments, setComments] = useState('');

  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const popupRef = useRef(null);
  const calendarRef = useRef(null);

  const toggleForm = () => {
    setShowBookingForm(!showBookingForm);
  };

  const closeModal = () => {
    setShowBookingForm(false);
  };

  const handleDotsClick = (id) => {
    setActiveDotsId(prevId => (prevId === id ? null : id));
  };

  const handleEdit = (id) => {
    const customer = customers.find(c => c.id === id);
    setSelectedCustomer(customer);
    setModalType('edit');
    setActiveDotsId(null);

    // Initialize form fields by splitting the name
    const nameParts = customer.name.split(' ');
    setFirstName(nameParts[0] || '');
    setLastName(nameParts.slice(1).join(' ') || '');
    setJoiningDate(new Date(customer.joiningDate));
    setAmount(customer.amount.replace('$', '')); // Remove '$' for input
    setComments(customer.comments || '');
    setValidated(false);
    setFormErrors({});
  };

  const handleDelete = (id) => {
    const customer = customers.find(c => c.id === id);
    setSelectedCustomer(customer);
    setModalType('delete');
    setActiveDotsId(null);
  };

  const handleModalClose = () => {
    setModalType(null);
    setSelectedCustomer(null);
    // Reset form fields
    setFirstName('');
    setLastName('');
    setJoiningDate(null);
    setAmount('');
    setComments('');
    setValidated(false);
    setFormErrors({});
  };

  const handleEditSave = (event) => {
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

    if (!selectedCustomer.email || selectedCustomer.email.trim() === '') {
      errors.email = 'Email is required.';
    } else {
      // Simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(selectedCustomer.email)) {
        errors.email = 'Invalid email format.';
      }
    }

    if (!selectedCustomer.mobile || selectedCustomer.mobile.trim() === '') {
      errors.mobile = 'Mobile number is required.';
    } else {
      // Simple mobile number regex (India)
      const mobileRegex = /^\+91\s?\d{10}$/;
      if (!mobileRegex.test(selectedCustomer.mobile)) {
        errors.mobile = 'Invalid mobile number format. Use +91 XXXXXXXXXX.';
      }
    }

    if (!joiningDate) {
      errors.joiningDate = 'Joining date is required.';
    }

    if (!amount || amount.trim() === '') {
      errors.amount = 'Amount is required.';
    } else {
      // Check if amount is a valid number
      const amountNumber = parseFloat(amount);
      if (isNaN(amountNumber) || amountNumber <= 0) {
        errors.amount = 'Amount must be a positive number.';
      }
    }

    // Update formErrors state
    setFormErrors(errors);

    // If no errors, proceed to save
    if (Object.keys(errors).length === 0) {
      // Combine firstName and lastName
      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      // Update the customer data
      const updatedCustomer = {
        ...selectedCustomer,
        name: fullName,
        joiningDate: joiningDate.toLocaleDateString('en-GB'),
        amount: `$${parseFloat(amount).toFixed(2)}`,
        comments: comments.trim(),
      };

      setCustomers(prevCustomers => prevCustomers.map(c => c.id === updatedCustomer.id ? updatedCustomer : c));
      handleModalClose();
    } else {
      setValidated(true);
    }
  };

  const confirmDelete = () => {
    console.log(`Deleting customer with id: ${selectedCustomer.id}`);
    setCustomers(prevCustomers => prevCustomers.filter(c => c.id !== selectedCustomer.id));
    handleModalClose();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveDotsId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className='p-10'>
        <div className='p-10' style={{ paddingBottom: "20px" }}>
          <Table className="table" responsive>
            <thead style={{ border: "none" }}>
              <tr>
                <th style={{ textAlign: "center", padding: "10px", background: "#E7F1FF", border: "none" }}>
                  <img src={minus} height={20} width={20} alt="minus icon" />
                </th>
                <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Name</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Email ID</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Mobile No</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Booking Date</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Joining Date</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}>Amount</th>
                <th style={{ textAlign: "start", padding: "10px", color: "#4B4B4B", fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy", background: "#E7F1FF", border: "none" }}></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="customer-row">
                  <td style={{ textAlign: "center", padding: "10px", border: "none" }}>
                    <img src={minus} height={20} width={20} alt="minus icon" />
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" />
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          color: "#222222",
                          paddingLeft: "4px"
                        }}
                        className="ms-2 customer-name"
                      >
                        {customer.name}
                      </span>
                    </div>
                  </td>
                  <td style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    color: "#000000",
                    textAlign: "start"
                  }}>{customer.email}</td>
                  <td style={{
                    fontSize: "16px",
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    color: "#000000",
                    textAlign: "start"
                  }}>{customer.mobile}</td>

                  <td style={{
                    padding: "10px",
                    border: "none",
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: 600,
                    fontFamily: "Gilroy"
                  }}>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: "60px",
                      backgroundColor: "#EBEBEB",
                      textAlign: "start",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily: "Gilroy"
                    }}>
                      {customer.bookingDate}
                    </span>
                  </td>

                  <td style={{
                    padding: "10px",
                    border: "none",
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: 600,
                    fontFamily: "Gilroy"
                  }}>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: "60px",
                      backgroundColor: "#EBEBEB",
                      textAlign: "start",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily: "Gilroy"
                    }}>
                      {customer.joiningDate}
                    </span>
                  </td>
                  <td style={{
                    padding: "10px",
                    border: "none",
                    textAlign: "start",
                    fontSize: "16px",
                    fontWeight: 600,
                    fontFamily: "Gilroy"
                  }}>
                    <span style={{
                      padding: "3px 10px",
                      borderRadius: "60px",
                      backgroundColor: "#EBEBEB",
                      textAlign: "start",
                      fontSize: "14px",
                      fontWeight: 500,
                      fontFamily: "Gilroy"
                    }}>
                      {customer.amount}
                    </span>
                  </td>

                  <td>
                    <div
                      style={{
                        cursor: "pointer",
                        height: 40,
                        width: 40,
                        borderRadius: "50%",
                        border: "1px solid #EFEFEF",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        zIndex: activeDotsId === customer.id ? 1000 : 'auto'
                      }}
                      onClick={() => handleDotsClick(customer.id)}
                    >
                      <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                      {activeDotsId === customer.id && (
                        <div
                          ref={popupRef}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#fff",
                            position: "absolute",
                            right: 0,
                            top: 50,
                            width: 163,
                            height: 92,
                            border: "1px solid #EBEBEB",
                            borderRadius: 10,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            padding: 15,
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)"
                          }}
                        >
                          <div
                            className="mb-2 d-flex align-items-center"
                            onClick={() => handleEdit(customer.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <img src={Edit} style={{ height: 16, width: 16, marginRight: "8px" }} alt="Edit icon" />
                            <label style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#222222"
                            }}>
                              Edit
                            </label>
                          </div>
                          <div
                            className="d-flex align-items-center"
                            onClick={() => handleDelete(customer.id)}
                            style={{ cursor: "pointer" }}
                          >
                            <img src={Delete} style={{ height: 16, width: 16, marginRight: "8px" }} alt="Delete icon" />
                            <label style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#FF0000"
                            }}>
                              Delete
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={modalType === 'edit'} onHide={handleModalClose} centered backdrop="static">
        <Form noValidate validated={validated} onSubmit={handleEditSave}>
          <Modal.Header className="d-flex justify-content-between">
            <Modal.Title>Edit Booking</Modal.Title>
            <CloseCircle size="32" color="#222222" onClick={handleModalClose} style={{ cursor: 'pointer' }} />
          </Modal.Header>
          {selectedCustomer && (
            <Modal.Body>
              <Row>
              <Col md={6}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  style={{ height: "50px" }}
                  value={firstName}
                  isInvalid={!!formErrors.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
</Col>
<Col>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  style={{ height: "50px" }}
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
                  {/* <Form.Group controlId="formJoiningDate" className="mb-3">
                    <Form.Label>Joining Date</Form.Label>
                    <Flatpickr
                      data-enable-time={false}
                      value={joiningDate}
                      onChange={date => setJoiningDate(date[0])}
                      options={{
                        dateFormat: "d M Y",
                      }}
                      className={`form-control ${formErrors.joiningDate ? 'is-invalid' : ''}`}
                    />
                    {formErrors.joiningDate && (
                      <div className="invalid-feedback">
                        {formErrors.joiningDate}
                      </div>
                    )}
                  </Form.Group> */}
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
                          if (calendarRef.current) {
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
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter amount"
                      style={{ height: "50px" }}
                      value={amount}
                      isInvalid={!!formErrors.amount}
                      onChange={(e) => setAmount(e.target.value)}
                     
                    />
                    <Form.Control.Feedback type="invalid">
                      {formErrors.amount}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group controlId="formComments" className="mb-3">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
          )}
          <Modal.Footer>
            <Button variant="primary" type="submit" className="w-100">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Delete Modal */}
      <Modal show={modalType === 'delete'} onHide={handleModalClose} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Delete Booking?</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>
          Are you sure you want to delete this booking for <strong>{selectedCustomer ? selectedCustomer.name : ''}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "16px 45px",
              border: "1px solid rgba(36, 0, 255, 1)",
              backgroundColor: "#FFF",
              color: "rgba(36, 0, 255, 1)",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Gilroy"
            }}
            onClick={handleModalClose}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: "16px 45px",
              border: "1px solid rgba(36, 0, 255, 1)",
              backgroundColor: "rgba(36, 0, 255, 1)",
              color: "#fff",
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Gilroy"
            }}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Booking;

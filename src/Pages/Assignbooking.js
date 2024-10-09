import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { FaCheckCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AssignBooking = ({
  show,
  handleClose,
  mode, 
  customer, 
  handleSave, 
}) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileno, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [payingguest, setPayingGuest] = useState('');
  const [aadharno, setAadharno] = useState('');
  const [address, setAddress] = useState('');

 
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  
  useEffect(() => {
    if (mode === 'checkin' && customer) {
      setFirstName(customer.firstName || '');
      setLastName(customer.lastName || '');
      setMobileNo(customer.mobileno || '');
      setEmail(customer.email || '');
      setPayingGuest(customer.payingguest || '');
      setAadharno(customer.aadharno || '');
      setAddress(customer.address || '');
    } else {
    
      setFirstName('');
      setLastName('');
      setMobileNo('');
      setEmail('');
      setPayingGuest('');
      setAadharno('');
      setAddress('');
    }

    setValidated(false);
    setFormErrors({});
  }, [mode, customer, show]);

  
  const validateForm = () => {
    const errors = {};

    
    if (!firstName || firstName.trim() === '') {
      errors.firstName = 'First name is required.';
    }

   
    if (!lastName || lastName.trim() === '') {
      errors.lastName = 'Last name is required.';
    }

   
    const mobileRegex = /^\d{10}$/;
    if (!mobileno || mobileno.trim() === '') {
      errors.mobileno = 'Mobile number is required.';
    } else if (!mobileRegex.test(mobileno)) {
      errors.mobileno = 'Mobile number must be 10 digits.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '') {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Invalid email format.';
    }

  
    if (!payingguest || payingguest.trim() === '') {
      errors.payingguest = 'Paying Guest information is required.';
    }

   
    const aadharRegex = /^\d{12}$/;
    if (!aadharno || aadharno.trim() === '') {
      errors.aadharno = 'Aadhar number is required.';
    } else if (!aadharRegex.test(aadharno)) {
      errors.aadharno = 'Aadhar number must be 12 digits.';
    }

    
    if (!address || address.trim() === '') {
      errors.address = 'Address is required.';
    }

    setFormErrors(errors);

   
    return Object.keys(errors).length === 0;
  };

  
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (validateForm()) {
    
      const updatedCustomer = {
        ...customer,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        mobileno: mobileno.trim(),
        email: email.trim(),
        payingguest: payingguest.trim(),
        aadharno: aadharno.trim(),
        address: address.trim(),
        status: 'Checked In', 
      };

      
      handleSave(updatedCustomer);

      // Show Success Toast
      toast.success('Check-in assigned successfully!', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        icon: <FaCheckCircle color="white" />,
      });

      handleClose();
    } else {
      setValidated(true);
      toast.error('Please fix the errors in the form.', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    }
  };


  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setMobileNo(value);
      if (formErrors.mobileno) {
        setFormErrors((prev) => ({ ...prev, mobileno: '' }));
      }
    }
  };

  const handleAadharChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 12) {
      setAadharno(value);
      if (formErrors.aadharno) {
        setFormErrors((prev) => ({ ...prev, aadharno: '' }));
      }
    }
  };
  const isFormValid = () => {
    return (
        firstName &&
        lastName &&
       mobileno &&
       email &&
        payingguest &&
        aadharno &&
     address 
    
    );
};

  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
          
            <Col md={6}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  First Name 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setFormErrors((prev) => ({ ...prev, firstName: '' }));
                    }
                  }}
                  isInvalid={!!formErrors.firstName}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.firstName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            
            <Col md={6}>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Last Name 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setFormErrors((prev) => ({ ...prev, lastName: '' }));
                    }
                  }}
                  isInvalid={!!formErrors.lastName}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.lastName}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
           
            <Col md={6}>
              <Form.Group controlId="formMobileNo" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Mobile Number 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter mobile number"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={mobileno}
                  onChange={handleMobileChange}
                  isInvalid={!!formErrors.mobileno}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.mobileno}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            
            <Col md={6}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (e.target.value.trim() === '') {
                      setFormErrors((prev) => ({ ...prev, email: 'Email is required.' }));
                    } else if (!emailRegex.test(e.target.value)) {
                      setFormErrors((prev) => ({ ...prev, email: 'Invalid email format.' }));
                    } else {
                      setFormErrors((prev) => ({ ...prev, email: '' }));
                    }
                  }}
                  isInvalid={!!formErrors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            
            <Col md={6}>
              <Form.Group controlId="formPayingGuest" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Paying Guest 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter paying guest info"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={payingguest}
                  onChange={(e) => {
                    setPayingGuest(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setFormErrors((prev) => ({ ...prev, payingguest: '' }));
                    }
                  }}
                  isInvalid={!!formErrors.payingguest}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.payingguest}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formAadharNo" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Aadhar Number 
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Aadhar number"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={aadharno}
                  onChange={handleAadharChange}
                  isInvalid={!!formErrors.aadharno}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.aadharno}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            
            <Col md={12}>
              <Form.Group controlId="formAddress" className="mb-3">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                  Address 
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter address"
                  style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", height:"50px"}}
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (e.target.value.trim() !== '') {
                      setFormErrors((prev) => ({ ...prev, address: '' }));
                    }
                  }}
                  isInvalid={!!formErrors.address}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.address}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            type="submit"
            className="w-100"
            style={{
              borderRadius: 8,
              padding: '16px 45px',
              border: '1px solid rgba(36, 0, 255, 1)',
              backgroundColor: 'rgba(36, 0, 255, 1)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'Gilroy',
              opacity: isFormValid() ? 1 : 0.5,
              cursor: isFormValid() ? 'pointer' : 'not-allowed',
              
            }} disabled={!isFormValid()}
          >
            Assign Booking
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AssignBooking;



import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css'; // You can choose any theme you prefer
import Calendars from '../Assets/Images/New_images/calendar.png'; // Ensure the path is correct
import { toast } from 'react-toastify';
import { CloseCircle } from 'iconsax-react';

function CustomerForm({ show, handleClose, initialData, modalType }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [countryCode, setCountryCode] = useState('91');
    const [walkInDate, setWalkInDate] = useState(null);
    const [comments, setComments] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    const datePickerRef = useRef(null);

    const handlePhone = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobile(value);
        }
    };

    useEffect(() => {
        if (initialData) {
            setName(initialData.name || '');
            setEmail(initialData.email || '');
           
            const mobileParts = initialData.mobile.split(' ');
            setCountryCode(mobileParts[0].replace('+', '') || '91');
            setMobile(mobileParts[1] || '');
          
            setWalkInDate(initialData.walkInDate ? new Date(initialData.walkInDate) : null);
            setComments(initialData.comments || '');
        } else {
            
            setName('');
            setEmail('');
            setCountryCode('91');
            setMobile('');
            setWalkInDate(null);
            setComments('');
        }
    }, [initialData, show]);

    useEffect(() => {
        // Check if all required fields are filled and valid
        const isNameValid = name.trim() !== '';
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const isMobileValid = /^\d{10}$/.test(mobile);
        const isDateValid = walkInDate instanceof Date && !isNaN(walkInDate);
        const isCommentsValid = comments.trim() !== '';

        setIsFormValid(isNameValid && isEmailValid && isMobileValid && isDateValid && isCommentsValid);
    }, [name, email, mobile, walkInDate, comments]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Final validation before submission
        if (!isFormValid) {
            toast.error('Please ensure all fields are correctly filled.', {
                position: "bottom-center",
            });
            return;
        }

        // Prepare updated customer data
        const updatedCustomer = {
            ...initialData,
            name,
            email,
            mobile: `+${countryCode} ${mobile}`,
            walkInDate: walkInDate.toLocaleDateString('en-GB'),
            comments
        };

        // Submit the updated data
        onSubmit(updatedCustomer);

        // Optionally, reset form fields if adding a new walk-in
        if (modalType === 'add') {
            setName('');
            setEmail('');
            setCountryCode('91');
            setMobile('');
            setWalkInDate(null);
            setComments('');
        }
    };

    return (
        <>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header className="d-flex justify-content-between align-items-center" style={{ marginBottom: '30px', borderBottom: 'none' }}>
                    <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'Gilroy', color: '#222222' }}>
                        {modalType === 'edit' ? 'Edit Walk-in' : 'Add Walk-in'}
                    </div>
                    <CloseCircle size="32" color="#222222" onClick={handleClose} style={{ cursor: 'pointer' }} />
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formCustomerName" className="mb-3">
                                    <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                        Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        style={{
                                            height: "50px",
                                            borderRadius: "8px",
                                            fontSize: '16px',
                                            fontFamily: 'Gilroy',
                                            color: '#4B4B4B',
                                            fontWeight: 500,
                                            boxShadow: 'none',
                                            border: '1px solid #D9D9D9'
                                        }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formCustomerEmail" className="mb-3">
                                    <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                        Email ID
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{
                                            height: "50px",
                                            borderRadius: "8px",
                                            fontSize: '16px',
                                            fontFamily: 'Gilroy',
                                            color: '#4B4B4B',
                                            fontWeight: 500,
                                            boxShadow: 'none',
                                            border: '1px solid #D9D9D9'
                                        }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formCustomerMobile" className="mb-3">
                                    <Form.Label style={{
                                        fontSize: '14px',
                                        color: '#222222',
                                        fontFamily: 'Gilroy',
                                        fontWeight: 500
                                    }}>
                                        Mobile number
                                    </Form.Label>

                                    <InputGroup>
                                        <Form.Select
                                            value={countryCode}
                                            id="vendor-select-pg"
                                            onChange={(e) => setCountryCode(e.target.value)}
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
                                                maxWidth: 90,
                                                paddingRight: 10
                                            }}
                                            required
                                        >
                                            <option value="91">+91</option>
                                            <option value="1">+1</option>
                                            <option value="44">+44</option>
                                        </Form.Select>
                                        <Form.Control
                                            value={mobile}
                                            onChange={handlePhone}
                                            type="text"
                                            placeholder="9876543210"
                                            maxLength={10}
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: mobile ? 600 : 500,
                                                boxShadow: "none",
                                                borderLeft: "unset",
                                                borderRight: "1px solid #D9D9D9",
                                                borderTop: "1px solid #D9D9D9",
                                                borderBottom: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: "0 8px 8px 0",
                                            }}
                                            required
                                        />
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formWalkInDate" className="mb-3">
                                    <Form.Label style={{
                                        fontSize: '14px',
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500
                                    }}>
                                        Walk-In Date
                                    </Form.Label>
                                    <InputGroup>
                                        <div style={{ position: 'relative', width: '100%' }}>
                                            <label
                                                htmlFor="walk-in-date-input"
                                                style={{
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: "8px",
                                                    padding: "12px",
                                                    fontSize: "14px",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: walkInDate ? 500 : 500,
                                                    color: "#222222",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "space-between",
                                                    cursor: "pointer",
                                                    height: "50px"
                                                }}
                                                onClick={() => {
                                                    if (datePickerRef.current) {
                                                        datePickerRef.current.flatpickr.open();
                                                    }
                                                }}
                                            >
                                                {walkInDate instanceof Date && !isNaN(walkInDate)
                                                    ? walkInDate.toLocaleDateString('en-GB')
                                                    : 'DD/MM/YYYY'}
                                                <img src={Calendars} style={{ height: "24px", width: "24px" }} alt="Calendar" />
                                            </label>

                                            <Flatpickr
                                                ref={datePickerRef}
                                                value={walkInDate}
                                                onChange={(selectedDates) => {
                                                    if (selectedDates.length > 0) {
                                                        setWalkInDate(selectedDates[0]);
                                                    }
                                                }}
                                                options={{
                                                    dateFormat: "d/m/Y",
                                                    maxDate: "today"
                                                }}
                                                style={{
                                                    display: "none",
                                                }}
                                            />
                                        </div>
                                    </InputGroup>
                                </Form.Group>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={12}>
                                <Form.Group controlId="formComments" className="mb-3">
                                    <Form.Label style={{
                                        fontSize: '14px',
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500
                                    }}>
                                        Comments
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter comments"
                                        value={comments}
                                        onChange={(e) => setComments(e.target.value)}
                                        style={{
                                            height: "50px",
                                            borderRadius: "8px",
                                            fontSize: '16px',
                                            fontFamily: 'Gilroy',
                                            color: '#4B4B4B',
                                            fontWeight: 500,
                                            boxShadow: 'none',
                                            border: '1px solid #D9D9D9'
                                        }}
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>

                        <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>
                            <Button
                                type="submit"
                                className='w-100'
                                disabled={!isFormValid}
                                style={{
                                    opacity: isFormValid ? 1 : 0.5,
                                    backgroundColor: isFormValid ? '#1E45E1' : '#6C757D', // Change color based on validity
                                    borderColor: isFormValid ? '#1E45E1' : '#6C757D',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 600,
                                    cursor: isFormValid ? 'pointer' : 'not-allowed'
                                }}
                            >
                                {modalType === 'edit' ? 'Save Changes' : 'Add Walk-in'}
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );

}

export default CustomerForm;

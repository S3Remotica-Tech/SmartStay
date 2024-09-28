import React, { useState, useRef } from 'react';
import { Modal, Form, InputGroup, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Calendar from '../Photos/calendar.svg';
import { CloseCircle } from 'iconsax-react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast

function CustomerForm({ show, handleClose }) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [phone, setPhone] = useState('');
    const [countryCode, setCountryCode] = useState('91');
    const [date, setDate] = useState(null);
    const [comments, setComments] = useState('');

    const datePickerRef = useRef(null);

    const handleFirstName = (e) => setFirstname(e.target.value);
    const handleLastName = (e) => setLastname(e.target.value);
    const handleCountryCodeChange = (e) => setCountryCode(e.target.value);
    const handlePhone = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setPhone(value);
        }
    };

    const handleDate = (date) => setDate(date);
    const handleComments = (e) => setComments(e.target.value);

    const isFormValid = () => {
        return (
            firstname &&
            lastname &&
            phone.length === 10 &&
            date &&
            comments
        );
    };

    const handleWalkIn = () => {
        if (isFormValid()) {
            console.log('Form submitted:', { firstname, lastname, phone, countryCode, date, comments });

            // Show toast notification
            toast.success('Walk-in added successfully!', {
                position: 'bottom-center',

            });

            resetForm();
        }
    };

    const resetForm = () => {
        setFirstname('');
        setLastname('');
        setPhone('');
        setCountryCode('91');
        setDate(null);
        setComments('');
    };

    return (
        <div>
            <Modal show={show} centered>
                <Modal.Body>
                    <Modal.Header className="d-flex justify-content-between" style={{ marginBottom: '30px' }}>
                        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: 'Gilroy', color: '#222222' }}>Add Walk-in</div>
                        <CloseCircle size="32" color="#222222" onClick={handleClose} />
                    </Modal.Header>

                    <div className="row mt-4">
                        {/* First Name */}
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={firstname}
                                    onChange={handleFirstName}
                                    style={{ fontSize: 16, color: '#4B4B4B', fontFamily: 'Gilroy', fontWeight: 500, boxShadow: 'none', border: '1px solid #D9D9D9', height: 50, borderRadius: 8 }}
                                />
                            </Form.Group>
                        </div>

                        {/* Last Name */}
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={lastname}
                                    onChange={handleLastName}
                                    style={{ fontSize: 16, color: '#4B4B4B', fontFamily: 'Gilroy', fontWeight: 500, boxShadow: 'none', border: '1px solid #D9D9D9', height: 50, borderRadius: 8 }}
                                />
                            </Form.Group>
                        </div>

                        <Form.Group className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                Mobile Number
                            </Form.Label>
                            <InputGroup>
                                <Form.Select
                                    value={countryCode}
                                    onChange={handleCountryCodeChange}
                                    style={{
                                        border: '1px solid #D9D9D9',
                                        borderRadius: '8px 0 0 8px',
                                        height: 50,
                                        fontSize: 16,
                                        color: '#4B4B4B',
                                        fontFamily: 'Gilroy',
                                        fontWeight: 600,
                                        boxShadow: 'none',
                                        maxWidth: 90,
                                    }}
                                >
                                    <option value="91">+91</option>
                                    <option value="1">+1</option>
                                    <option value="44">+44</option>
                                    {/* Add more country codes as needed */}
                                </Form.Select>
                                <Form.Control
                                    type="text"
                                    placeholder="9876543210"
                                    value={phone}
                                    onChange={handlePhone}
                                    maxLength={10}
                                    style={{
                                        fontSize: 16,
                                        color: '#4B4B4B',
                                        fontFamily: 'Gilroy',
                                        fontWeight: 600,
                                        boxShadow: 'none',
                                        borderLeft: 'unset',
                                        borderRight: '1px solid #D9D9D9',
                                        height: 50,
                                        borderRadius: '0 8px 8px 0',
                                    }}
                                />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                           
                                <Form.Label style={{ fontSize: 14, color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                    Joining Date
                                    
                                </Form.Label>
                                <InputGroup>
                                <div className="position-relative">
                                    <DatePicker
                                        selected={date}
                                        onChange={handleDate}
                                        placeholderText="Select a date"
                                        ref={datePickerRef}
                                    />
                                    
                                    <img
                                        src={Calendar}
                                        alt="Calendar" 
                                        className="position-absolute h-6 w-6 cursor-pointer"
                                        style={{ top: '50%', right: '10px', transform: 'translateY(-50%)' }}
                                        onClick={() => datePickerRef.current.setFocus()}
                                    />
                                </div>
                                </InputGroup>
                               
                        </Form.Group>
                        
                       

                        <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3">
                                <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>Comments</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter comments"
                                    value={comments}
                                    onChange={handleComments}
                                    style={{ fontSize: 16, color: '#4B4B4B', fontFamily: 'Gilroy', fontWeight: 500, boxShadow: 'none', border: '1px solid #D9D9D9', height: 50, borderRadius: 8 }}
                                />

                            </Form.Group>
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer style={{ border: "none" }} className='mt-1 pt-1'>
                    <Button
                        onClick={handleWalkIn}
                        className='w-100'
                        style={{
                            backgroundColor: "#1E45E1",
                            fontWeight: 600,
                            height: 50,
                            borderRadius: 12,
                            fontSize: 16,
                            fontFamily: "Gilroy",
                            opacity: isFormValid() ? 1 : 0.5,
                            cursor: isFormValid() ? 'pointer' : 'not-allowed',
                        }}
                        disabled={!isFormValid()}
                    >
                        Add Walk-in
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ToastContainer to display toast notifications */}
            <ToastContainer />
        </div>
    );
}

export default CustomerForm;



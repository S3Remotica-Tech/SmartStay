import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_green.css';
import Calendars from '../Assets/Images/New_images/calendar.png';
import { toast, ToastContainer } from 'react-toastify';
import { CloseCircle } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FormControl } from 'react-bootstrap';
import Plus from '../Assets/Images/New_images/addplus-circle.svg';
import Image from 'react-bootstrap/Image';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import imageCompression from 'browser-image-compression';

function CustomerForm({ show, handleClose, initialData, modalType }) {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [countryCode, setCountryCode] = useState('91');
    const [walkInDate, setWalkInDate] = useState(null);
    const [comments, setComments] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        lastname: '',
        email: '',
        mobile: '',
        walkInDate: '',
        comments: '',
    });


    const state = useSelector(state => state)
    const dispatch = useDispatch();











    const [generalError, setGeneralError] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [countryCodeError, setCountryCodeError] = useState('');
    const [walkInDateError, setWalkInDateError] = useState('');
    const [isChangedError, setIsChangedError] = useState('')
    const [emailError, setEmailError] = useState('')

    const datePickerRef = useRef(null);

    const handlePhone = (e) => {
        setGeneralError('');
        setMobileError('');
        setIsChangedError('');
        dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' })
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobile(value);
            if (value.length === 10) {
                setErrors(prev => ({ ...prev, mobile: '' }));
            } else {
                setErrors(prev => ({ ...prev, mobile: 'Mobile number must be 10 digits.' }));
            }
        }
    };

    useEffect(() => {
        if (initialData) {
            setName(initialData.first_name || '');
            setLastName(initialData.last_name || '');
            setEmail(initialData.email_Id || '');


            const phoneNumber = String(initialData.mobile_Number || '');
            const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
            const mobileNumber = phoneNumber.slice(-10);


            setCountryCode(countryCode);
            setMobile(mobileNumber);


            setWalkInDate(initialData.walk_In_Date ? moment(initialData.walk_In_Date).toDate('') : null);
            setComments(initialData.comments || '');
        } else {
            setName('');
            setLastName('');
            setEmail('');
            setCountryCode('91');
            setMobile('');
            setWalkInDate(null);
            setComments('');
            setErrors({
                name: '',
                lastname: '',
                email: '',
                mobile: '',
                walkInDate: '',
                comments: '',
            });
        }
    }, [initialData, show]);


    const validateForm = () => {
        const newErrors = {};

        // Name Validation
        if (name.trim() === '') {
            newErrors.name = 'Name is required.';
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            newErrors.email = 'Email is required.';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Invalid email format.';
        }

        // Mobile Validation
        const mobileRegex = /^\d{10}$/;
        if (mobile.trim() === '') {
            newErrors.mobile = 'Mobile number is required.';
        } else if (!mobileRegex.test(mobile)) {
            newErrors.mobile = 'Mobile number must be 10 digits.';
        }

        // Walk-In Date Validation
        if (!walkInDate) {
            newErrors.walkInDate = 'Walk-In Date is required.';
        }

        // Comments Validation
        if (comments.trim() === '') {
            newErrors.comments = 'Comments are required.';
        }

        setErrors(newErrors);

        // Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     if (validateForm()) {
    //         const updatedCustomer = {
    //             ...initialData,
    //             name,
    //             email,
    //             mobile: `+${countryCode} ${mobile}`,
    //             walkInDate: walkInDate.toLocaleDateString('en-GB'),
    //             comments
    //         };


    //         if (onSubmit) {
    //             onSubmit(updatedCustomer);
    //         } else {
    //         }

    //         if (modalType === 'add') {
    //             setName('');
    //             setEmail('');
    //             setCountryCode('91');
    //             setMobile('');
    //             setWalkInDate(null);
    //             setComments('');
    //             setErrors({
    //                 name: '',
    //                 email: '',
    //                 mobile: '',
    //                 walkInDate: '',
    //                 comments: '',
    //             });
    //         }


    //     }
    // };



    const handleSubmitWalkIn = () => {


        if (!name && !mobile && !countryCode && !walkInDate) {
            setGeneralError('Please fill in all the required fields.');
            return;
        }

        const isChanged = initialData && (
            name.trim() !== (initialData.first_name || '').trim() ||
            lastname.trim() !== (initialData.last_name || '').trim() ||
            email.trim() !== (initialData.email_Id || '').trim() ||
            `${countryCode}${mobile}` !== String(initialData.mobile_Number || '').trim() ||
            (walkInDate && initialData.walk_In_Date) && moment(walkInDate).format('YYYY-MM-DD') !== moment(initialData.walk_In_Date).format('YYYY-MM-DD') ||
            comments.trim() !== (initialData.comments || '').trim()
        );



        if (initialData && !isChanged) {
            setIsChangedError('No changes detected in the form.');
            return;
        }



        if (!name) {
            setNameError('Please enter Name');
            // return;
        }

        if (!mobile) {
            setMobileError('Please enter Mobile Number');
            // return;
        }

        if (!countryCode) {
            setCountryCodeError('Please select Country Code');
            // return;
        }

        if (!walkInDate) {
            setWalkInDateError('Please select Walk-In Date');
            // return;
        }

        if (emailError) {
            // setWalkInDateError('Please select Walk-In Date');
            return;
        }
        
        if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
            setMobileError('Mobile Number must be exactly 10 digits');
            return;
        }





        const Mobile_Number = `${countryCode}${mobile}`
        const formattedDate = moment(walkInDate).format('YYYY-MM-DD');


        if (name && mobile && walkInDate && countryCode) {
            dispatch({
                type: 'ADDWALKINCUSTOMER',
                payload: {
                    first_name: name,
                    last_name: lastname,
                    email_Id: email,
                    hostel_id: state.login.selectedHostel_Id,
                    mobile_Number: Mobile_Number,
                    walk_In_Date: formattedDate,
                    comments: comments,
                    id: initialData ? initialData.id : ''
                }
            });
        }


    };


    const handleNameChange = (e) => {
        const value = e.target.value;
        setGeneralError('');
        setNameError('');
        setIsChangedError('');
        setName(value);
        if (value.trim() !== '') {
            setErrors(prev => ({ ...prev, name: '' }));
        } else {
            setErrors(prev => ({ ...prev, name: 'Name is required.' }));
        }
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        setLastName(value);
        setIsChangedError("")
    }



    const handleEmailChange = (e) => {
        const value = e.target.value.toLowerCase();
        const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        setEmailError('')

        setGeneralError('');
        setIsChangedError('');
        dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' });
        setEmail(value);


        if (!emailRegex.test(value)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };



    const handleMobileChange = (e) => {
        const value = e.target.value;
        setGeneralError('');
        setMobile(value);
        setIsChangedError('');
        if (value.trim() !== '' && value.length === 10) {
            setErrors(prev => ({ ...prev, mobile: '' }));
        } else {
            setErrors(prev => ({ ...prev, mobile: 'Invalid mobile number.' }));
        }
    };



    // const handleCountryCodeChange = (e) => {
    //     const value = e.target.value;
    //     setIsChangedError('');
    //     setCountryCode(value);
    //     setGeneralError('');
    //     setCountryCodeError('');
    // };


    const handleWalkInDateChange = (selectedDates) => {
        setGeneralError('');
        setWalkInDateError('');
        setIsChangedError('');
        if (selectedDates.length > 0) {
            setWalkInDate(selectedDates[0]);
            setErrors(prev => ({ ...prev, walkInDate: '' }));
        }
    };

    const handleCommentsChange = (e) => {
        const value = e.target.value;
        setGeneralError('');
        setComments(value);
        setIsChangedError('');

    };

    const [file, setFile] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            imageCompression(file, options).then((compressedFile) => {
                setFile(compressedFile);
            }).catch((error) => {
                console.error('Error compressing image:', error);
            });
        }
    };


    const customDateInput = (props) => {
        return (
            <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
                <FormControl
                    type="text"
                    className='date_input'
                    value={props.value || 'DD/MM/YYYY'}
                    readOnly
                    style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 9,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: props.value ? 600 : 500,
                        width: "100%",
                        height: 50,
                        boxSizing: "border-box",
                        boxShadow: "none"
                    }}
                />
                <img
                    src={Calendars}
                    style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }}
                    alt="Calendar"
                    onClick={props.onClick}
                />
            </div>
        );
    };












    return (
        <>
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header className="d-flex justify-content-between align-items-center" style={{ marginLeft: '18px', marginRight: '18px', }}>
                    <div style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Gilroy', color: '#222222' }}>
                        {initialData ? 'Edit Walk-in' : 'Add Walk-in'}
                    </div>
                    <CloseCircle size="24" color="#222222" onClick={handleClose} style={{ cursor: 'pointer' }} />
                </Modal.Header>



                {/* {state.UsersList.alreadyHere && (
                    <div className="d-flex align-items-center p-1 mb-2 mt-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state.UsersList.alreadyHere}
                        </label>
                    </div>
                )} */}

                <Modal.Body>

                    <div className='d-flex align-items-center'>


                        <div className="" style={{ height: 100, width: 100, position: "relative" }}>

                            <Image src={file ? (typeof file == 'string' ? file : URL.createObjectURL(file)) : Profile} roundedCircle style={{ height: 100, width: 100 }} />

                            <label htmlFor="imageInput" className='' >
                                <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 90, left: 80, transform: 'translate(-50%, -50%)' }} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    className="sr-only"
                                    id="imageInput"
                                    onChange={handleImageChange}
                                    style={{ display: "none" }} />
                            </label>


                        </div>
                        <div className='ps-3'>
                            <div>
                                <label style={{ fontSize: 16, fontWeight: 500, color: "#222222", fontFamily: "Gilroy" }}>Profile Photo</label>
                            </div>
                            <div>
                                <label style={{ fontSize: 14, fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>Max size of image 10MB</label>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                            <Form.Group controlId="formCustomerName" className="mb-3">
                                <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                    First Name
                                    <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    onChange={handleNameChange}
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
                                />
                                {/* {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>} */}
                            </Form.Group>
                            {nameError && (
                                <div className="d-flex align-items-center p-1" style={{ marginTop: "-13px" }}>
                                    <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px", marginBottom: "1px" }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {nameError}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group controlId="formCustomerName" className="mb-3">
                                <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                    Last Name

                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={lastname}
                                    onChange={handleLastNameChange}
                                    style={{
                                        height: "50px",
                                        borderRadius: "8px",
                                        fontSize: '16px',
                                        fontFamily: 'Gilroy',
                                        color: '#4B4B4B',
                                        fontWeight: 500,
                                        boxShadow: 'none',
                                        border: '1px solid #D9D9D9',
                                        marginTop: 6
                                    }}
                                />
                                {/* {errors.name && <small style={{ color: 'red' }}>{errors.name}</small>} */}
                            </Form.Group>
                            {/* {nameError && (
                                <div className="d-flex align-items-center p-1 mb-2 mt-2">
                                    <MdError style={{ color: "red", marginRight: '5px' }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {nameError}
                                    </label>
                                </div>
                            )} */}
                        </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                            <Form.Group controlId="formCustomerMobile" className="mb-3">
                                <Form.Label style={{
                                    fontSize: '14px',
                                    color: '#222222',
                                    fontFamily: 'Gilroy',
                                    fontWeight: 500
                                }}>
                                    Mobile number
                                    <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                </Form.Label>

                                <InputGroup>
                                    <Form.Select
                                        value={countryCode}
                                        id="vendor-select-pg"
                                        // onChange={handleCountryCodeChange}
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
                                    >
                                        <option>+{countryCode}</option>
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
                                    />
                                </InputGroup>
                                {/* {errors.mobile && <small style={{ color: 'red' }}>{errors.mobile}</small>} */}
                            </Form.Group>

                            {mobileError && (
                                <div className="d-flex align-items-center p-1" style={{ marginTop: "-12px" }}>
                                    <MdError style={{ color: "red", marginRight: '5px', marginTop: "-20px", fontSize: "13px" }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {mobileError}
                                    </label>
                                </div>
                            )}
                            {countryCodeError && (
                                <div className="d-flex align-items-center mb-2">
                                    <MdError style={{ color: "red", marginRight: '5px' }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {countryCodeError}
                                    </label>
                                </div>
                            )}
                            {state.UsersList.alreadyHere && (
                                <div className="d-flex align-items-center" style={{ marginTop: "-12px" }}>
                                    <MdError style={{ color: "red", marginRight: '5px',fontSize: "14px" }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {state.UsersList.alreadyHere}
                                    </label>
                                </div>
                            )}
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group controlId="formCustomerEmail" className="mb-3">
                                <Form.Label style={{ fontSize: '14px', color: '#222222', fontFamily: 'Gilroy', fontWeight: 500 }}>
                                    Email ID
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    style={{
                                        height: "50px",
                                        borderRadius: "8px",
                                        fontSize: '16px',
                                        fontFamily: 'Gilroy',
                                        color: '#4B4B4B',
                                        fontWeight: 500,
                                        boxShadow: 'none',
                                        border: '1px solid #D9D9D9',
                                        marginTop: 6
                                    }}
                                />
                                {/* {errors.email && <small style={{ color: 'red' }}>{errors.email}</small>} */}
                            </Form.Group>

                            {emailError && (
                                <div className="d-flex align-items-center p-1 mb-2 mt-2">
                                    <MdError style={{ color: "red", marginRight: '5px' }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {emailError}
                                    </label>
                                </div>
                            )}


                        </div>


                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Form.Group controlId="formComments" className="mb-3">
                                <Form.Label style={{
                                    fontSize: '14px',
                                    color: "#222222",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500
                                }}>
                                    Address
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Address"
                                    value={comments}
                                    onChange={handleCommentsChange}
                                    style={{
                                        height: "50px",
                                        borderRadius: "8px",
                                        fontSize: '16px',
                                        fontFamily: 'Gilroy',
                                        color: '#4B4B4B',
                                        fontWeight: 500,
                                        boxShadow: 'none',
                                        border: errors.comments ? '1px solid red' : '1px solid #D9D9D9'
                                    }}
                                />
                                {/* {errors.comments && <small style={{ color: 'red' }}>{errors.comments}</small>} */}
                            </Form.Group>
                        </div>

                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <Form.Group controlId="purchaseDate">
                                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    Walk-In Date
                                    <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                </Form.Label>
                                <div style={{ position: 'relative', width: "100%", marginBottom: "3px" }}>
                                    <DatePicker
                                        selected={walkInDate}
                                        onChange={(date) => {
                                            setGeneralError('')
                                            setIsChangedError('')
                                            setWalkInDateError('')
                                            setWalkInDate(date);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={null}
                                        minDate={null}
                                        customInput={customDateInput({
                                            value: walkInDate ? walkInDate.toLocaleDateString('en-GB') : '',
                                        })}
                                    />
                                </div>
                            </Form.Group>
                            {walkInDateError && (
                                <div className="d-flex align-items-center p-1">
                                    <MdError style={{ color: "red", marginRight: '5px', fontSize: "12px" }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {walkInDateError}
                                    </label>
                                </div>
                            )}

                        </div>

                        {isChangedError && (
                            <div className="d-flex align-items-center justify-content-center p-1 mb-2 mt-2">
                                <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px" }} />
                                <label className="mb-0" style={{ color: "red", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    {isChangedError}
                                </label>
                            </div>
                        )}

                        <Modal.Footer style={{ border: "none", paddingBottom: 0, }} className='mt-1 pt-1' >
                            {generalError && (
                                <div className="d-flex align-items-center p-1 mb-2 mt-2">
                                    <MdError style={{ color: "red", marginRight: '5px' }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                        {generalError}
                                    </label>
                                </div>
                            )}


                            <Button onClick={handleSubmitWalkIn} className='w-100' type="submit" style={{ backgroundColor: "#1E45E1", fontWeight: 600, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", padding: 12 }} >
                                {initialData ? 'Save Changes' : 'Add Walk-in'}
                            </Button>
                        </Modal.Footer>
                    </div>

                </Modal.Body>
            </Modal>

        </>
    );
}

export default CustomerForm;



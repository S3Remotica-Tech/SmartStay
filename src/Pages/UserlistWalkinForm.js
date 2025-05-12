/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, InputGroup ,FormControl} from 'react-bootstrap';
import 'flatpickr/dist/themes/material_green.css';
import { CloseCircle } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Plus from '../Assets/Images/New_images/addplus-circle.svg';
import Image from 'react-bootstrap/Image';
import Profile from '../Assets/Images/New_images/profile-picture.png';
import imageCompression from 'browser-image-compression';
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from "react-select";

function CustomerForm({ show, handleClose, initialData }) {
    const [name, setName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [countryCode, setCountryCode] = useState('91');
    const [walkInDate, setWalkInDate] = useState(null);
    // const [comments, setComments] = useState('');
     const [house_no, setHouseNo] = useState("");
      const [street, setStreet] = useState("");
      const [landmark, setLandmark] = useState("");
      const [pincode, setPincode] = useState("");
      const [city, setCity] = useState("")
      const [state_name, setStateName] = useState("");
    // const [errors, setErrors] = useState({
    //     name: '',
    //     lastname: '',
    //     email: '',
    //     mobile: '',
    //     walkInDate: '',
    //     comments: '',
    // });


    const state = useSelector(state => state)
    const dispatch = useDispatch();











    const [generalError, setGeneralError] = useState('');
    const [nameError, setNameError] = useState('');
    const [mobileError, setMobileError] = useState('');
    const [countryCodeError, setCountryCodeError] = useState('');
    const [walkInDateError, setWalkInDateError] = useState('');
    const [isChangedError, setIsChangedError] = useState('')
    const [emailError, setEmailError] = useState('')
      const [house_noError, setHouse_NoError] = useState("");
      const [streetError, setStreetError] = useState("");
      const [landmarkError, setLandmarkError] = useState("");
      const [pincodeError, setPincodeError] = useState("");
      const [cityError, setCityError] = useState("");
      const [state_nameError, setStateNameError] = useState("");

    // const datePickerRef = useRef(null);

    // const handlePhone = (e) => {
    //     setGeneralError('');
    //     setMobileError('');
    //     setIsChangedError('');
    //     dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' })
    //     const value = e.target.value;
    //     if (/^\d*$/.test(value) && value.length <= 10) {
    //         setMobile(value);
    //         if (value.length === 10) {
    //             setErrors(prev => ({ ...prev, mobile: '' }));
    //         } else {
    //             setErrors(prev => ({ ...prev, mobile: 'Mobile number must be 10 digits.' }));
    //         }
    //     }
    // };
    const handlePhone = (e) => {
        const input = e.target.value.replace(/\D/g, ""); 
        setMobile(input);
      
        if (input.length === 0) {
            setMobileError(""); 
        } else if (input.length < 10) {
            setMobileError("Invalid Mobile Number");
        } else if (input.length === 10) {
            setMobileError(""); 
        }
      
        setIsChangedError("")
        dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' });
      };
    // const handlePhone = (e) => {
    //     setGeneralError('');
    //     setMobileError('');
    //     setIsChangedError('');
    //     dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' });
      
    //     const value = e.target.value;
      
    //     if (/^\d*$/.test(value) && value.length <= 10) {
    //       setMobile(value);
      
    //       // Show error immediately if less than 10 digits
    //       if (value.length < 10) {
    //         setErrors((prev) => ({
    //           ...prev,
    //           mobile: 'Mobile number must be 10 digits.'
    //         }));
    //       } else {
    //         setErrors((prev) => ({
    //           ...prev,
    //           mobile: ''
    //         }));
    //       }
    //     }
    //   };
      
      

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
            setHouseNo(initialData.comments || '');
            setStreet(initialData.area || '');
            setLandmark(initialData.landmark || '')
            setPincode(initialData.pin_code || '');
            setCity(initialData.city || '');
            setStateName(initialData.state || '')
            if (initialData.profile === 0) {
              setFile(null);
            } else {
              setFile(initialData.profile);
            }



            setWalkInDate(initialData.walk_In_Date ? moment(initialData.walk_In_Date).toDate('') : null);
            // setComments(initialData.comments || '');
        } else {
            setName('');
            setLastName('');
            setEmail('');
            setCountryCode('91');
            setMobile('');
            setWalkInDate(null);
            // setComments('');
            setHouseNo("");
            setStreet("");
            setLandmark("")
            setPincode("");
            setCity("");
            setStateName("")
            // setErrors({
            //     name: '',
            //     lastname: '',
            //     email: '',
            //     mobile: '',
            //     walkInDate: '',
            //     comments: '',
            // });
        }
    }, [initialData, show]);


   

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


        if (!name && !mobile && !countryCode && !walkInDate  ) {
            setGeneralError('Please Fill in All The Required Fields');
            return;
        }

        const normalize = (val) => {
          if (val === null || val === undefined || val === 'null') return '';
          return String(val).trim();
        };

        const isChanged = initialData && (
            name.trim() !== (initialData.first_name || '').trim() ||
            lastname.trim() !== (initialData.last_name || '').trim() ||
            email.trim() !== (initialData.email_Id || '').trim() ||
            (`${countryCode}${mobile}` !== String(initialData.mobile_Number || '').trim()) ||
            ((walkInDate && initialData.walk_In_Date) && moment(walkInDate).format('YYYY-MM-DD') !== moment(initialData.walk_In_Date).format('YYYY-MM-DD')) ||
            house_no.trim() !== normalize(initialData.comments) ||
            street.trim() !== normalize(initialData.area) ||
            landmark.trim() !== normalize(initialData.landmark) ||
            city.trim() !== normalize(initialData.city) ||
            String(pincode).trim() !== String(initialData.pin_code || "").trim() ||
            state_name.trim() !== normalize(initialData.state)

        );



        if (initialData && !isChanged) {
            setIsChangedError('No Changes Detected');
            return;
        }



        if (!name) {
            setNameError('Please Enter First Name');
            // return;
        }

        if (!mobile) {
            setMobileError('Please Enter Mobile Number');
            // return;
        }

        if (!countryCode) {
            setCountryCodeError('Please select Country Code');
            // return;
        }

        if (!walkInDate) {
            setWalkInDateError('Please Select Walk-In Date');
            // return;
        }

        if (emailError) {
            // setWalkInDateError('Please select Walk-In Date');
            return;
        }
        
        if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
            setMobileError('Mobile Number is Required');
            return;
        }

     
    
       
    
       





        const Mobile_Number = `${countryCode}${mobile}`
        const formattedDate = moment(walkInDate).format('YYYY-MM-DD');


        if (name && mobile && walkInDate && countryCode) {
            dispatch({
                type: 'ADDWALKINCUSTOMER',
                payload: {
                  profile:file,
                    first_name: name,
                    last_name: lastname,
                    email_Id: email,
                    hostel_id: state.login.selectedHostel_Id,
                    mobile_Number: Mobile_Number,
                    walk_In_Date: formattedDate,
                    comments:house_no ,
                    area : street,
                    landmark : landmark,
                    city : city,
                    pin_code : pincode,
                    state:state_name,
                    id: initialData ? initialData.id : ''
                }
            });
        }


    };


    const handleNameChange = (e) => {
        const value = e.target.value;
        const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
        setGeneralError('');
        setNameError('');
        setIsChangedError('');
        setName(value);
        // if (value.trim() !== '') {
        //     setErrors(prev => ({ ...prev, name: '' }));
        // } else {
        //     setErrors(prev => ({ ...prev, name: 'Name is Required' }));
        // }
    };

    const handleLastNameChange = (e) => {
        const value = e.target.value;
        const pattern = /^[a-zA-Z\s]*$/;
        if (!pattern.test(value)) {
          return;
        }
        setLastName(value);
        setIsChangedError("")
    }



   const handleEmailChange = (e) => {
  const value = e.target.value.toLowerCase();
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;

  setEmail(value);
  setEmailError('');
  setGeneralError('');
  setIsChangedError('');
  dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' });

  if (value && !emailRegex.test(value)) {
    setEmailError('Please Enter Valid Email ID');
  } else {
    setEmailError('');
  }
};




    



    // const handleCountryCodeChange = (e) => {
    //     const value = e.target.value;
    //     setIsChangedError('');
    //     setCountryCode(value);
    //     setGeneralError('');
    //     setCountryCodeError('');
    // };


    const indianStates = [
        { value: "Andhra Pradesh", label: "Andhra Pradesh" },
        { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
        { value: "Assam", label: "Assam" },
        { value: "Bihar", label: "Bihar" },
        { value: "Chhattisgarh", label: "Chhattisgarh" },
        { value: "Goa", label: "Goa" },
        { value: "Gujarat", label: "Gujarat" },
        { value: "Haryana", label: "Haryana" },
        { value: "Himachal Pradesh", label: "Himachal Pradesh" },
        { value: "Jharkhand", label: "Jharkhand" },
        { value: "Karnataka", label: "Karnataka" },
        { value: "Kerala", label: "Kerala" },
        { value: "Madhya Pradesh", label: "Madhya Pradesh" },
        { value: "Maharashtra", label: "Maharashtra" },
        { value: "Manipur", label: "Manipur" },
        { value: "Meghalaya", label: "Meghalaya" },
        { value: "Mizoram", label: "Mizoram" },
        { value: "Nagaland", label: "Nagaland" },
        { value: "Odisha", label: "Odisha" },
        { value: "Punjab", label: "Punjab" },
        { value: "Rajasthan", label: "Rajasthan" },
        { value: "Sikkim", label: "Sikkim" },
        { value: "Tamil Nadu", label: "Tamil Nadu" },
        { value: "Telangana", label: "Telangana" },
        { value: "Tripura", label: "Tripura" },
        { value: "Uttar Pradesh", label: "Uttar Pradesh" },
        { value: "Uttarakhand", label: "Uttarakhand" },
        { value: "West Bengal", label: "West Bengal" },
        { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
        { value: "Chandigarh", label: "Chandigarh" },
        { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
        { value: "Delhi", label: "Delhi" },
        { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
        { value: "Ladakh", label: "Ladakh" },
        { value: "Lakshadweep", label: "Lakshadweep" },
        { value: "Puducherry", label: "Puducherry" },
      ];


    const handleHouseNo = (e) => {
        setHouseNo(e.target.value);
        setHouse_NoError("")
        // setFormError("");
      };
    
      const handleStreetName = (e) => {
        setStreet(e.target.value);
        setStreetError("");
        // setFormError("");
      }
    
      const handleLandmark = (e) => {
        setLandmark(e.target.value);
        setLandmarkError("");
        // setFormError("");
      }
    
      // const handlePincode = (e) => {
      //   setPincode(e.target.value);
      //   setPincodeError("");
      //   // setFormError("");
      // }

      const handlePinCodeChange = (e) => {
        const value = e.target.value;
        if (!/^\d{0,6}$/.test(value)) {
          return;
        }
      
        setPincode(value);
        if (value.length > 0 && value.length < 6) {
          setPincodeError("Pin Code Must Be Exactly 6 Digits");
        } else {
          setPincodeError("");
        }
      
        // setGeneralError("");
        // setIsChangedError("");
      };
    
      const handleCity = (e) => {
        setCity(e.target.value);
        setCityError("");
        // setFormError("");
      }
    
      // const handleStateChange = (e) => {
      //   setStateName(e.target.value);
      //   setStateNameError("");
      //   // setFormError("");
      // }



    // const handleCommentsChange = (e) => {
    //     const value = e.target.value;
    //     setGeneralError('');
    //     setComments(value);
    //     setIsChangedError('');

    // };

    const [file, setFile] = useState(null);

     const handleImageChange = async (event) => {
        const fileImage = event.target.files[0];
        if (fileImage) {
          const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 800,
            useWebWorker: true,
          };
          try {
            const compressedFile = await imageCompression(fileImage, options);
            setFile(compressedFile);
          } catch (error) {
            console.error("Image compression error:", error);
          }
        }
      };
      useEffect(() => {
          if (
            state.UsersList.addWalkInCustomerStatusCode === 200 
          ) {
            dispatch({
              type: "WALKINCUSTOMERLIST",
              payload: { hostel_id: state.login.selectedHostel_Id },
            });
      
            // setShowForm(false);
      
            setTimeout(() => {
              dispatch({ type: "CLEAR_ADD_WALK_IN_CUSTOMER" });
            }, 1000);
           
            // setShowDeleteModal(false);
          }
        }, [
          state.UsersList.addWalkInCustomerStatusCode
         
        ]);

    // const handleImageChange = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const options = {
    //             maxSizeMB: 1,
    //             maxWidthOrHeight: 1920,
    //             useWebWorker: true
    //         };
    //         imageCompression(file, options).then((compressedFile) => {
    //             setFile(compressedFile);
    //         }).catch((error) => {
    //             console.error('Error compressing image:', error);
    //         });
    //     }
    // };
    const handleFormClose = () => {
        // setErrors('');
        setEmailError("")
        setNameError("")
        setMobileError("")
        handleClose();
        setWalkInDateError("")
        setHouseNo("");
        setStreet("");
        setLandmark("")
        setPincode("");
        setCity("");
        setStateName("")
        setHouse_NoError("")
        setStreetError("")
        setCityError("")
        setLandmarkError("")
        setPincodeError("")
        setStateNameError("")
      }

  


    return (
        <>
            <Modal show={show} onHide={handleFormClose} centered backdrop="static">
                <Modal.Header className="d-flex justify-content-between align-items-center" style={{ marginLeft: '5px', marginRight: '5px', }}>
                    <div style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Gilroy', color: '#222222' }}>
                        {initialData ? 'Edit Walk-In' : 'Add Walk-In'}
                    </div>
                    <CloseCircle size="24" color="#222222" onClick={handleFormClose} style={{ cursor: 'pointer' }} />
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

                            <Image src={file ? (typeof file === 'string' ? file : URL.createObjectURL(file)) : Profile} roundedCircle style={{ height: 100, width: 100 }} />

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
                                    placeholder="Enter First Name"
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
                                    placeholder="Enter Last Name"
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
                                    Mobile Number
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
                                    <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px" }} />
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
                                    placeholder="Enter Email ID"
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

                          
                          
                                                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                                                                      <Form.Group className="">
                                                                        <Form.Label
                                                                          style={{
                                                                            fontSize: 14,
                                                                            color: "#222222",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                          }}
                                                                        >
                                                                          Flat , House no , Building , Company , Apartment {" "}
                                                                          <span style={{ color: "red", fontSize: "20px" }}>  </span>
                                                                        </Form.Label>
                                                                        <FormControl
                                                                          type="text"
                                                                          id="form-controls"
                                                                          placeholder="Enter House No"
                                                                          value={house_no}
                                                                          onChange={(e) => handleHouseNo(e)}
                                                                          style={{
                                                                            fontSize: 16,
                                                                            color: "#4B4B4B",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                            boxShadow: "none",
                                                                            border: "1px solid #D9D9D9",
                                                                            height: 50,
                                                                            borderRadius: 8,
                                                                          }}
                                                                        />
                                                                      </Form.Group>
                                                                      {house_noError && (
                                                                        <div style={{ color: "red"}}>
                                                                          <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                                                          <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
                                                                        </div>
                                                                      )}
                                                                    </div>
                                                        
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                                                                      <Form.Group className="">
                                                                        <Form.Label
                                                                          style={{
                                                                            fontSize: 14,
                                                                            color: "#222222",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                          }}
                                                                        >
                                                                          Area , Street , Sector , Village{" "}
                                                                          <span style={{ color: "red", fontSize: "20px" }}>  </span>
                                                                        </Form.Label>
                                                                        <FormControl
                                                                          type="text"
                                                                          id="form-controls"
                                                                          placeholder="Enter Street"
                                                                          value={street}
                                                                          onChange={(e) => handleStreetName(e)}
                                                                          style={{
                                                                            fontSize: 16,
                                                                            color: "#4B4B4B",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                            boxShadow: "none",
                                                                            border: "1px solid #D9D9D9",
                                                                            height: 50,
                                                                            borderRadius: 8,
                                                                          }}
                                                                        />
                                                                      </Form.Group>
                                                                      {streetError && (
                                                                        <div style={{ color: "red"}}>
                                                                          <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                                                          <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
                                                                        </div>
                                                                      )}
                                                                    </div>
                                                        
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                                                                      <Form.Group className="">
                                                                        <Form.Label
                                                                          style={{
                                                                            fontSize: 14,
                                                                            color: "#222222",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                          }}
                                                                        >
                                                                          Landmark{" "}
                                                                          <span style={{ color: "red", fontSize: "20px" }}>  </span>
                                                                        </Form.Label>
                                                                        <FormControl
                                                                          type="text"
                                                                          id="form-controls"
                                                                          placeholder="E.g , near appollo hospital"
                                                                          value={landmark}
                                                                          onChange={(e) => handleLandmark(e)}
                                                                          style={{
                                                                            fontSize: 16,
                                                                            color: "#4B4B4B",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                            boxShadow: "none",
                                                                            border: "1px solid #D9D9D9",
                                                                            height: 50,
                                                                            borderRadius: 8,
                                                                          }}
                                                                        />
                                                                      </Form.Group>
                                                                      {landmarkError && (
                                                                        <div style={{ color: "red"}}>
                                                                          <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                                                          <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
                                                                        </div>
                                                                      )}
                                                                    </div>
                                                        
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                           <Form.Group
                                                                              className="mb-3"
                                                                                   controlId="exampleForm.ControlInput1">
                                                                                        <Form.Label
                                                                                                   style={{
                                                                                                    fontSize: 14,
                                                                                                    color: "#222222",
                                                                                                    fontFamily: "Gilroy",
                                                                                                    fontWeight: 500   }}
                                                                                                             >
                                                                                                 Pincode
                                                                                   <span style={{ color: "red", fontSize: "20px" }}></span>
                                                                                </Form.Label>
                                                                         <Form.Control
                                                                              value={pincode}
                                                                               onChange={(e) => handlePinCodeChange(e)}
                                                                               type="tel"
                                                                               maxLength={6}
                                                                              inputMode="numeric" 
                                                                              pattern="[0-9]*" 
                                                                              placeholder="Enter Pincode"
                                                                               style={{
                                                                                    fontSize: 16,
                                                                                    color: "#4B4B4B",
                                                                                    fontFamily: "Gilroy",
                                                                                    fontWeight: pincode ? 600 : 500,
                                                                                    boxShadow: "none",
                                                                                    border: "1px solid #D9D9D9",
                                                                                    height: 50,
                                                                                    borderRadius: 8,
                                                                                    }}
                                                                                                                                            />
                                                                                                                                            {pincodeError && (
                                                                                                                                              <div className="d-flex align-items-center p-1 mb-2">
                                                                                                                                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                                                                                                                                                <label
                                                                                                                                                  className="mb-0"
                                                                                                                                                  style={{
                                                                                                                                                    color: "red",
                                                                                                                                                    fontSize: "12px",
                                                                                                                                                    fontFamily: "Gilroy",
                                                                                                                                                    fontWeight: 500,
                                                                                                                                                  }}
                                                                                                                                                >
                                                                                                                                                  {pincodeError}
                                                                                                                                                </label>
                                                                                                                                              </div>
                                                                                                                                            )}
                                                                                                                          
                                                                                                                          
                                                                                                                                          </Form.Group>
                                                                                                                                        </div>
                                                        
                                                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                                                                      <Form.Group className="">
                                                                        <Form.Label
                                                                          style={{
                                                                            fontSize: 14,
                                                                            color: "#222222",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                          }}
                                                                        >
                                                                          Town/City{" "}
                                                                          <span style={{ color: "red", fontSize: "20px" }}>  </span>
                                                                        </Form.Label>
                                                                        <FormControl
                                                                          type="text"
                                                                          id="form-controls"
                                                                          placeholder="Enter City"
                                                                          value={city}
                                                                          onChange={(e) => handleCity(e)}
                                                                          style={{
                                                                            fontSize: 16,
                                                                            color: "#4B4B4B",
                                                                            fontFamily: "Gilroy",
                                                                            fontWeight: 500,
                                                                            boxShadow: "none",
                                                                            border: "1px solid #D9D9D9",
                                                                            height: 50,
                                                                            borderRadius: 8,
                                                                          }}
                                                                        />
                                                                      </Form.Group>
                                                                      {cityError && (
                                                                        <div style={{ color: "red" }}>
                                                                          <MdError style={{fontSize: '13px',marginRight:"5px"}} />
                                                                          <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                                                                        </div>
                                                                      )}
                                                                    </div>
                                                        
                                                                                                                   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                                                   <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                                                     <Form.Label
                                                                       style={{
                                                                         fontFamily: "Gilroy",
                                                                         fontSize: 14,
                                                                         fontWeight: 500,
                                                                         color: "#222",
                                                                         fontStyle: "normal",
                                                                         lineHeight: "normal",
                                                                       }}
                                                                     >
                                                                       State
                                                                     </Form.Label>
                                                                 
                                                                     <Select
                                                                       options={indianStates}
                                                                       onChange={(selectedOption) => {
                                                                         setStateName(selectedOption?.value);
                                                                       }}
                                                                       value={
                                                                         state_name ? { value: state_name, label: state_name } : null
                                                                       }
                                                                       placeholder="Select State"
                                                                       classNamePrefix="custom"
                                                                       menuPlacement="auto"
                                                                       noOptionsMessage={() => "No state available"}
                                                                       styles={{
                                                                         control: (base) => ({
                                                                           ...base,
                                                                           height: "50px",
                                                                           border: "1px solid #D9D9D9",
                                                                           borderRadius: "8px",
                                                                           fontSize: "16px",
                                                                           color: "#4B4B4B",
                                                                           fontFamily: "Gilroy",
                                                                           fontWeight: state_name ? 600 : 500,
                                                                           boxShadow: "none",
                                                                         }),
                                                                         menu: (base) => ({
                                                                           ...base,
                                                                           backgroundColor: "#f8f9fa",
                                                                           border: "1px solid #ced4da",
                                                                         }),
                                                                         menuList: (base) => ({
                                                                           ...base,
                                                                           backgroundColor: "#f8f9fa",
                                                                           maxHeight: "120px",
                                                                           padding: 0,
                                                                           scrollbarWidth: "thin",
                                                                           overflowY: "auto",
                                                                         }),
                                                                         placeholder: (base) => ({
                                                                           ...base,
                                                                           color: "#555",
                                                                         }),
                                                                         dropdownIndicator: (base) => ({
                                                                           ...base,
                                                                           color: "#555",
                                                                           cursor: "pointer",
                                                                         }),
                                                                         indicatorSeparator: () => ({
                                                                           display: "none",
                                                                         }),
                                                                         option: (base, state) => ({
                                                                           ...base,
                                                                           cursor: "pointer",
                                                                           backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                                                           color: "#000",
                                                                         }),
                                                                       }}
                                                                     />
                                                                   </Form.Group>
                                                                 
                                                                   {state_nameError && (
                                                                     <div style={{ color: "red" }}>
                                                                       <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                                                                       <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                                                                         {state_nameError}
                                                                       </span>
                                                                     </div>
                                                                   )}
                                                                 </div>
                      

                        {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                {errors.comments && <small style={{ color: 'red' }}>{errors.comments}</small>}
                            </Form.Group>
                        </div> */}

                        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                            <Form.Group controlId="purchaseDate">
                                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    Walk-In Date
                                    <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                </Form.Label>
                                

                                 <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                  <DatePicker
                                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                                    format="DD/MM/YYYY"
                                    placeholder="DD/MM/YYYY"
                                    value={walkInDate ? dayjs(walkInDate) : null}
                                    onChange={(date) => {
                                        setGeneralError('')
                                        setIsChangedError('')
                                        setWalkInDateError('')
                                        setWalkInDate(date ? date.toDate() : null);
                                    }}
                                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
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
                                {initialData ? 'Save Changes' : 'Add Walk-In'}
                            </Button>
                        </Modal.Footer>
                    </div>

                </Modal.Body>
            </Modal>

        </>
    );
}
CustomerForm.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    initialData: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    value: PropTypes.func.isRequired,
  };
  
export default CustomerForm;



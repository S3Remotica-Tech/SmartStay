/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import { Modal, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'flatpickr/dist/themes/material_green.css';
import { CloseCircle } from 'iconsax-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Plus from '../../Assets/Images/New_images/addplus-circle.svg';
import Image from 'react-bootstrap/Image';
import Profile from '../../Assets/Images/New_images/profile-picture.png';
import imageCompression from 'browser-image-compression';
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from "react-select";
import ErrorMessage from '../../Components/ErrorMessage';
import {
  datePickerClass,
  fieldClass,
  fieldLabelClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";

function CustomerForm({ show, handleClose, initialData }) {
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('91');
  const [walkInDate, setWalkInDate] = useState(null);
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("")
  const [state_name, setStateName] = useState("");
  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);

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
  const [formLoading, setFormLoading] = useState(false)
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('')


  const nameRef = useRef();
  const mobileRef = useRef();
  const countryCodeRef = useRef();
  const walkInDateRef = useRef();





  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setMobile(input);

    if (input.length === 0) {
      setMobileError("");
    } else if (input.length < 10) {
      setMobileError("Please Enter Valid Mobile Number");
    } else if (input.length === 10) {
      setMobileError("");
    }

    setIsChangedError("")
    dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' });
  };





  useEffect(() => {
    if (initialData) {
      setName(initialData.first_name || '');
      setLastName(initialData.last_name || '');
      setEmail(initialData.email_Id || '');


      const phoneNumber = String(initialData.mobile_Number || '');
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);


      setCountryCode(countryCode || 91);
      setMobile(mobileNumber);
      setHouseNo(initialData.comments || '');
      setStreet(initialData.area || '');
      setLandmark(initialData.landmark || '')
      setPincode(initialData.pin_code || '');
      setCity(initialData.city || '');
      setStateName(initialData.state || '')
      if (initialData?.profile === "0" || !initialData?.profile) {
        setFile(null);
      } else {
        setFile(initialData.profile);
      }


      setWalkInDate(initialData.walk_In_Date ? moment(initialData.walk_In_Date).toDate('') : null);
    } else {
      setName('');
      setLastName('');
      setEmail('');
      setCountryCode('91');
      setMobile('');
      setWalkInDate(null);
      setHouseNo("");
      setStreet("");
      setLandmark("")
      setPincode("");
      setCity("");
      setStateName("")

    }
  }, [initialData, show]);


  const isFileChanged = (() => {
    if (initialData?.profile === "0" || !initialData?.profile) {
      return file !== null;
    } else {
      return typeof file !== 'string' || file !== initialData.profile;
    }
  })();


  const noChangesRef = useRef(null)



  const handleSubmitWalkIn = () => {
    dispatch({ type: 'CLEAR_ALREADY_EXIST_ERROR' });

    if (!name && !mobile && !countryCode && !walkInDate) {
      setGeneralError('Please Fill in All The Required Fields');
      return;
    }



    const normalize = (val) => {
      if (val === null || val === undefined || val === 'null') return '';
      return String(val).trim();
    };




    const focusedRef = { current: false };

    if (!name) {
      setNameError('Please Enter First Name');
      if (!focusedRef.current && nameRef.current) {
        nameRef.current.focus();
        focusedRef.current = true;
      }
    }

    if (!mobile) {
      setMobileError('Please Enter Mobile Number');
      if (!focusedRef.current && mobileRef.current) {
        mobileRef.current.focus();
        focusedRef.current = true;
      }
    } else if (mobile.length !== 10 || !/^\d{10}$/.test(mobile)) {
      setMobileError('Please Enter  Valid  Mobile Number');
      if (!focusedRef.current && mobileRef.current) {
        mobileRef.current.focus();
        focusedRef.current = true;
      }
    } else {
      setMobileError('');
    }

    if (pincode.length > 0 && pincode.length !== 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
      return
    }



    if (!countryCode) {
      setCountryCodeError('Please select Country Code');

      if (!focusedRef.current && countryCodeRef.current) {
        countryCodeRef.current.focus();
        focusedRef.current = true;
      }
      return
    }

    if (!walkInDate) {
      setWalkInDateError('Please Select Walk-In Date');
      if (!focusedRef.current && walkInDateRef.current) {
        walkInDateRef.current.focus();
        focusedRef.current = true;
      }
      return
    }
    //  if (walkInDate ) {
    //   const selectedHostel = state?.UsersList?.hotelDetailsinPg[0]
    //   if (selectedHostel) {
    //     const HostelCreateDate = new Date(selectedHostel.create_At);
    //     const WalkinDate = new Date(walkInDate);
    //     const HostelCreateDateOnly = new Date(HostelCreateDate.toDateString());
    //     const WalkinDateOnly = new Date(WalkinDate.toDateString());
    //     if (WalkinDateOnly < HostelCreateDateOnly) {
    //       setJoingDateErrmsg('Before Hostel Create date not allowed');
    //       if (!focusedRef.current && walkInDateRef.current) {
    //     walkInDateRef.current.focus();
    //     focusedRef.current = true;

    //     return
    //   }
    //     } else {
    //       setJoingDateErrmsg('');
    //     }
    //   }
    // }


    if (emailError) {
      return;
    }

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
      state_name.trim() !== normalize(initialData.state) ||
      isFileChanged

    );

    if (initialData && !isChanged) {
      setIsChangedError("No Changes Detected");


      setTimeout(() => {
        if (noChangesRef.current) {
          noChangesRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          noChangesRef.current.focus();
        }
      }, 100);

      return;
    } else {
      setIsChangedError("");
    }







    const Mobile_Number = `${countryCode}${mobile}`
    const formattedDate = moment(walkInDate).format('YYYY-MM-DD');


    if (name && mobile && walkInDate && countryCode) {
      dispatch({
        type: 'ADDWALKINCUSTOMER',
        payload: {
          profile: file,
          first_name: name,
          last_name: lastname,
          email_Id: email,
          hostel_id: state.login.selectedHostel_Id,
          mobile_Number: Mobile_Number,
          walk_In_Date: formattedDate,
          comments: house_no,
          area: street,
          landmark: landmark,
          city: city,
          pin_code: pincode,
          state: state_name,
          id: initialData ? initialData.id : ''
        }
      });
      setFormLoading(true)
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







  const indianStates = [
    { value: "Tamil Nadu", label: "Tamil Nadu" },
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
    setIsChangedError("")
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");
    setIsChangedError("")
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
    setIsChangedError("")
  }



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
    setIsChangedError("")

  };

  const handleCity = (e) => {
    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
    }
    setIsChangedError("")
  }





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
    setIsChangedError("")
  };

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (
      state.UsersList.addWalkInCustomerStatusCode === 200 &&
      !hasFetchedRef.current
    ) {
      hasFetchedRef.current = true;



      setFormLoading(false);
      handleFormClose();
      setJoingDateErrmsg("");
      setPincodeError("");

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_WALK_IN_CUSTOMER" });
        hasFetchedRef.current = false;
      }, 1000);
    }
  }, [state.UsersList.addWalkInCustomerStatusCode]);


  // useEffect(() => {
  //   if (!show) {
  //     dispatch({
  //       type: "WALKINCUSTOMERLIST",
  //       payload: { hostel_id: state.login.selectedHostel_Id },
  //     });
  //   }

  // }, [])




  const handleFormClose = () => {
    setFormLoading(false)
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
    setJoingDateErrmsg("")
  }


  useEffect(() => {
    if (state.UsersList.alreadyHere) {
      setFormLoading(false)
    }
  }, [state.UsersList.alreadyHere])

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


  return (
    <>
      <Modal show={show} onHide={handleFormClose} centered backdrop="static" dialogClassName='custom-modals-style'>
        <Modal.Header className="d-flex justify-content-between align-items-center" style={{ marginLeft: '5px', marginRight: '5px', }}>
          <div style={{ fontSize: 18, fontWeight: 600, fontFamily: 'Gilroy', color: '#222222' }}>
            {initialData ? 'Edit Walk-In' : 'Add Walk-In'}
          </div>
          <CloseCircle size="24" color="#222222" onClick={handleFormClose} style={{ cursor: 'pointer' }} />
        </Modal.Header>




        <Modal.Body style={{ maxHeight: "420px", overflowY: "scroll" }} className="show-scroll pt-3 mt-2 me-3">

          <div className='d-flex align-items-center'>


            <div className="" style={{ height: 100, width: 100, position: "relative" }}>

              <Image src={file ? typeof file === 'string' ? file : URL.createObjectURL(file) : Profile}
                roundedCircle style={{ height: 100, width: 100, cursor: "pointer" }} />

              <label htmlFor="imageInput" className='' >
                <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 90, left: 80, transform: 'translate(-50%, -50%)', cursor: "pointer" }} />
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
          <div className="row mt-2">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
              <Form.Group controlId="formCustomerName" className="mb-3">
                <Form.Label className={fieldLabelClass}>
                  First Name
                  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </Form.Label>
                <Form.Control className={fieldClass(!!nameError)}
                  type="text"
                  placeholder="Enter First Name"
                  value={name}
                  ref={nameRef}
                  onChange={handleNameChange}
                 
                />
              </Form.Group>
              {nameError && (
                <ErrorMessage className="mt-[6px]" message={nameError} type="error" />
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group controlId="formCustomerName" className="mb-3">
                <Form.Label className={fieldLabelClass}>
                  Last Name

                </Form.Label>
                <Form.Control className={fieldClass()}
                  type="text"
                  placeholder="Enter Last Name"
                  value={lastname}
                  onChange={handleLastNameChange}
                 
                />
              </Form.Group>

            </div>


            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
              <Form.Group controlId="formCustomerMobile" className="mb-3">
                <Form.Label className={fieldLabelClass}>
                  Mobile Number
                  <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </Form.Label>

                <InputGroup>
                  <Form.Select className={fieldClass()}
                    value={countryCode}
                    ref={countryCodeRef}
                    id="vendor-select-pg"
                   
                  >
                    <option>+{countryCode}</option>
                  </Form.Select>
                  <Form.Control className={fieldClass(!!mobileError)}
                    value={mobile}
                    ref={mobileRef}
                    onChange={handlePhone}
                    type="text"
                    placeholder="9876543210"
                    maxLength={10}
                   
                  />
                </InputGroup>
              </Form.Group>

              {mobileError && (
                <ErrorMessage className="mt-[6px]" message={mobileError} type="error" />

              )}
              {countryCodeError && (
                <ErrorMessage className="mt-[6px]" message={countryCodeError} type="error" />
              )}
              {state.UsersList.alreadyHere && (
                <ErrorMessage className="mt-[6px]" message={state.UsersList.alreadyHere} type="error" />
              )}
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group controlId="formCustomerEmail" className="mb-3">
                <Form.Label className={fieldLabelClass}>
                  Email ID
                </Form.Label>
                <Form.Control className={fieldClass(!!emailError)}
                  type="email"
                  placeholder="Enter Email ID"
                  value={email}
                  onChange={handleEmailChange}
                 
                />
                {emailError && (
                  <ErrorMessage className="mt-[6px]" message={emailError} type="error" />
                )}
              </Form.Group>




            </div>



            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label className={fieldLabelClass}
                 
                >
                  Flat , House no , Building , Company , Apartment {" "}
                  <span style={{ color: "red", fontSize: "20px" }}>  </span>
                </Form.Label>
                <FormControl className={fieldClass(!!house_noError)}
                  type="text"
                  id="form-controls"
                  placeholder="Enter House No"
                  value={house_no}
                  onChange={(e) => handleHouseNo(e)}
                 
                />
              </Form.Group>
              {house_noError && (
                <ErrorMessage className="mt-[6px]" message={house_noError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label className={fieldLabelClass}
                 
                >
                  Area , Street , Sector , Village{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>  </span>
                </Form.Label>
                <FormControl className={fieldClass(!!streetError)}
                  type="text"
                  id="form-controls"
                  placeholder="Enter Street"
                  value={street}
                  onChange={(e) => handleStreetName(e)}
                 
                />
              </Form.Group>
              {streetError && (
                <ErrorMessage className="mt-[6px]" message={streetError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
              <Form.Group className="">
                <Form.Label className={fieldLabelClass}
                 
                >
                  Landmark{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>  </span>
                </Form.Label>
                <FormControl className={fieldClass(!!landmarkError)}
                  type="text"
                  id="form-controls"
                  placeholder="E.g , near appollo hospital"
                  value={landmark}
                  onChange={(e) => handleLandmark(e)}
                 
                />
              </Form.Group>
              {landmarkError && (
                <ErrorMessage className="mt-[6px]" message={landmarkError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1">
                <Form.Label className={fieldLabelClass}
                 
                >
                  Pincode
                  <span style={{ color: "red", fontSize: "20px" }}></span>
                </Form.Label>
                <Form.Control className={fieldClass(!!pincodeError)}
                  value={pincode}
                  onChange={(e) => handlePinCodeChange(e)}
                  type="tel"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter Pincode"
                 
                />
                {pincodeError && (
                  <ErrorMessage className="mt-[6px]" message={pincodeError} type="error" />
                )}


              </Form.Group>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="">
                <Form.Label className={fieldLabelClass}
                 
                >
                  Town/City{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>  </span>
                </Form.Label>
                <FormControl className={fieldClass(!!cityError)}
                  type="text"
                  id="form-controls"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => handleCity(e)}
                 
                />
              </Form.Group>
              {cityError && (
                <ErrorMessage className="mt-[6px]" message={cityError} type="error" />
              )}
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                <Form.Label className={fieldLabelClass}
                 
                >
                  State
                </Form.Label>

                <Select
                  options={indianStates}
                  onChange={(selectedOption) => {
                    setStateName(selectedOption?.value);
                    setIsChangedError("")
                  }}
                  value={
                    state_name ? { value: state_name, label: state_name } : null
                  }
                  onInputChange={(inputValue, { action }) => {
                    if (action === "input-change") {
                      const lettersOnly = inputValue.replace(
                        /[^a-zA-Z\s]/g,
                        ""
                      );
                      return lettersOnly;
                    }
                    return inputValue;
                  }}
                  placeholder="Select State"
                  menuPlacement="auto"
                  noOptionsMessage={() => "No state available"}
                  styles={{
                    ...fieldSelectStyles(),
                    menuList: (base) => ({ ...base, padding: 0, maxHeight: "120px" }),
                  }}
                />
              </Form.Group>

              {state_nameError && (
                <ErrorMessage className="mt-[6px]" message={state_nameError} type="error" />
              )}
            </div>

            <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{ marginTop: "-5px" }}>
              <Form.Group controlId="purchaseDate">
                <Form.Label className={fieldLabelClass}>
                  Walk-In Date
                  <span style={{ color: 'red', fontSize: '20px', }}>*</span>
                </Form.Label>


                <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%", marginTop: "-2px" }}>
                  <DatePicker className={datePickerClass(!!walkInDateError)}
                    ref={walkInDateRef}
                   
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={walkInDate ? dayjs(walkInDate) : null}
                    onChange={(date) => {
                      setGeneralError('')
                      setIsChangedError('')
                      setWalkInDateError('')
                      setJoingDateErrmsg("")
                      setWalkInDate(date ? date.toDate() : null);
                    }}

                    disabledDate={(current) => current && current > dayjs().endOf("day")}
                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                  />
                </div>
              </Form.Group>
              {walkInDateError && (
                <ErrorMessage className="mt-[6px]" message={walkInDateError} type="error" />
              )}
              {joiningDateErrmsg.trim() !== "" && (
                <ErrorMessage className="mt-[6px]" message={joiningDateErrmsg} type="error" />
              )}

            </div>

            {isChangedError && (
              <div ref={noChangesRef} className="d-flex align-items-center justify-content-center p-1 mb-2 mt-2">
               <ErrorMessage className="mt-[6px]" message={isChangedError} type="error" />
              </div>
            )}
          </div>

        </Modal.Body>
       

        {formLoading &&
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>
        }
        <Modal.Footer style={{ border: "none", paddingBottom: 0, }} className='pt-1' >
          {generalError && (
             <ErrorMessage className="mt-[6px]" message={generalError} type="error" />
          )}



          <Button onClick={handleSubmitWalkIn} className='w-100' type="submit" style={{ backgroundColor: "#1E45E1", fontWeight: 600, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", padding: 12, marginBottom: "10px" }} >
            {initialData ? 'Save Changes' : 'Add Walk-In'}
          </Button>
        </Modal.Footer>

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



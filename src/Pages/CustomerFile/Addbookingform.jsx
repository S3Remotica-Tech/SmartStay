/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
  FormControl,
} from "react-bootstrap";
import { Image } from "react-bootstrap";
import "flatpickr/dist/themes/material_blue.css";
import { CloseCircle } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from "react-select";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";

function BookingModal(props) {

  const state = useSelector((state) => state);


  const dispatch = useDispatch();

  const [joiningDate, setJoiningDate] = useState(null);
  const [bookingDate, setBookingDate] = useState(null);
  const [room, setRoom] = useState('');
  const [floor, setFloor] = useState('');
  const [bed, setBed] = useState('');
  const [formLoading, setFormLoading] = useState(false)




  useEffect(() => {
    dispatch({ type: "ALL_HOSTEL_DETAILS", payload: { hostel_id: state.login.selectedHostel_Id } })
  }, []);

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [joiningDate]);

  useEffect(() => {
    if (state.Booking.bookingPhoneError) {
      setFormLoading(false)
      if (phoneInputRef.current) {
        phoneInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_PHONE_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingPhoneError]);

  useEffect(() => {
    if (state.Booking.bookingEmailError) {
      setFormLoading(false)
      if (EmailInputRef.current) {
        EmailInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
      }, 2000);
    }
  }, [state.Booking.bookingEmailError]);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false)

      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      dispatch({ type: "CLEAR_PHONE_ERROR" });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);


  const calendarRef = useRef(null);
  const phoneInputRef = useRef(null);
  const EmailInputRef = useRef(null);

  const options = {
    dateFormat: "Y/m/d",

    defaultDate: joiningDate,
    minDate: new Date(),
  };




  // const handleFloor = (floorId) => {
  //   if (!floorId) {
  //     setfloorError("Please select a valid floor.");
  //     setBed("");
  //     return;
  //   }
  //   setFloor(floorId);
  //   setRoom("")
  //   setBed("");
  //   setfloorError("");
  //   dispatch({
  //     type: "ROOMDETAILS",
  //     payload: { floor_Id: floorId, hostel_Id: state.login.selectedHostel_Id },
  //   });
  // };

  useEffect(() => {
    if (state.login.selectedHostel_Id && floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: state.login.selectedHostel_Id, floor_Id: floor },
      });
    }
  }, [floor]);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: state.login.selectedHostel_Id },
    });
  }, [state.login.selectedHostel_Id]);



  const handleRoomChange = (selectedOption) => {
    const selectedRoomId = selectedOption?.value;
    setRoom(selectedRoomId);
    setBed("");

    if (selectedRoomId) {
      const payload = {
        hostel_id: state.login.selectedHostel_Id,
        floor_id: floor,
        room_id: selectedRoomId,
      };

      dispatch({
        type: "BEDNUMBERDETAILS",
        payload: payload,
      });

      setRoomError("");
    } else {
      setRoomError("Please select a valid room.");
    }
  };


  const handleCloseBooking = () => {
    props.handleCloseAddBooking();
  }


  const [dateError, setDateError] = useState("");
  const [bookingAmount, setBookingAmount] = useState(null);
  const [amountError, setAmountError] = useState("");
  const [joiningDateError, setJoiningDateError] = useState("");
  const [floorError, setFloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };




  const handleBookingDateChange = (date) => {
    setDateError("");
    setBookingDate(date ? date.toDate() : null);
  };

  const handleBookingAmountChange = (e) => {
    setAmountError("");
    setBookingAmount(e.target.value);
  };

  const handleJoiningDateChange = (date) => {
    setJoiningDateError("");
    setJoiningDate(date ? date.toDate() : null);
  };


  const handleBedChange = (selectedOption) => {
    setBedError("");
    setBed(selectedOption?.value || "");
  };


  const handleBookingSubmit = () => {

    let isValid = true;



    // Booking Date
    if (!bookingDate) {
      setDateError("Please select Booking Date");
      isValid = false;
    } else {
      setDateError("");
    }

    // Booking Amount
    if (!bookingAmount) {
      setAmountError("Please enter Booking Amount");
      isValid = false;
    } else if (isNaN(bookingAmount)) {
      setAmountError("Booking Amount must be a number");
      isValid = false;
    } else {
      setAmountError("");
    }

    // Joining Date
    if (!joiningDate) {
      setJoiningDateError("Please select Joining Date");
      isValid = false;
    } else {
      setJoiningDateError("");
    }

    // Floor
    if (!floor) {
      setFloorError("Please select Floor");
      isValid = false;
    } else {
      setFloorError("");
    }

    // Room
    if (!room) {
      setRoomError("Please select Room");
      isValid = false;
    } else {
      setRoomError("");
    }

    // Bed
    if (!bed) {
      setBedError("Please select Bed");
      isValid = false;
    } else {
      setBedError("");
    }

    if (!isValid) return;

    let formattedDate = null;
    let bookingFormattedDate = null;
    try {
      const date = new Date(joiningDate);
      date.setDate(date.getDate() + 1);
      formattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      setDateError("Please Select Date");
      return;
    }


    try {
      const date = new Date(bookingDate);
      date.setDate(date.getDate() + 1);
      bookingFormattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      console.error("Error formatting date:", error);
      setDateError("Please Select Date");
      return;
    }



    dispatch({
      type: "ADD_BOOKING",
      payload: {

        joining_date: formattedDate,
        booking_date: bookingFormattedDate,
        amount: bookingAmount,
        hostel_id: state.login.selectedHostel_Id,
        floor_id: floor,
        room_id: room,
        bed_id: bed,
        customer_Id: props.userDetail.ID,
        mob_no: props.userDetail.Phone,
        email: props.userDetail.Email,
        profile: props.userDetail.profile
      },
    });
    setFormLoading(true)
  };


  const handleFloor = (selectedOption) => {
    if (!selectedOption) {
      setFloorError("");
      setBed("");
      return;
    }
    setFloor(selectedOption.value);
    setRoom("");
    setBed("");
    setFloorError("");
    dispatch({
      type: "ROOMDETAILS",
      payload: {
        floor_Id: selectedOption.value,
        hostel_Id: state.login.selectedHostel_Id
      },
    });
  };


  return (
    <>


      <Modal
        show={props.add_bookingshow}
        onHide={handleCloseBooking}
        centered
        backdrop="static"
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title
            style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}
          >
            Tenant Booking
          </Modal.Title>

          <CloseCircle
            size="24"
            color="#222222"
            onClick={handleCloseBooking}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>

        {state.Booking?.ErrorAssignBooking && (
          <div style={{ color: "red" }} className="ps-3 pt-3">
            <MdError style={{ fontSize: 14, color: "red" }} />
            <span
              style={{
                color: "red",
                fontSize: 12,
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              This email{" "}
              <span style={{ color: "#1E45E1" }}>
                {props?.assignBooking.email_id}
              </span>{" "}
              already exists. Please change email ID and move to check in
            </span>
          </div>
        )}


        {state.Booking?.ErrorAssignBookingMobile && (
          <div style={{ color: "red" }} className="ps-3 pt-3">
            <MdError style={{ fontSize: 14, color: "red" }} />
            <span
              style={{
                color: "red",
                fontSize: 12,
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              {state.Booking?.ErrorAssignBookingMobile}
            </span>
          </div>
        )}

        <Modal.Body className="pt-2 show-scroll" style={{ maxHeight: 440, overflowY: 'auto' }} >

          <div className="d-flex align-items-center">
            <div
              className=""
              style={{
                height: 60,
                width: 60,
                position: "relative",
              }}
            >
          

               <input type="file" onChange={handleFileChange} />
      <Image
        src={file ? URL.createObjectURL(file) : Profiles}
        alt="Profile"
        roundedCircle
        style={{ height: 60, width: 60 }}
      />



            </div>
            <div className="ps-3">
              <div>
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#222222",
                    fontFamily: "Gilroy",
                  }}
                >
                  {props?.userDetail?.Name || "Name"}{" "}
                </label>
              </div>

            </div>
          </div>

          <Row>
            <Col md={6}>
              <Form.Group controlId="bookingDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Booking Date {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

                <div
                  className="datepicker-wrapper"
                  style={{ position: "relative", width: "100%", marginTop: 1 }}
                >

                  <DatePicker
                    style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={bookingDate ? dayjs(bookingDate) : null}
                    onChange={handleBookingDateChange}
                    disabledDate={(current) => current && current > dayjs().endOf("day")}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                  />

                </div>
              </Form.Group>
              {dateError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      marginRight: "5px",
                      fontSize: 14,
                      marginBottom: "1px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {dateError}
                  </span>
                </div>
              )}

              {state.Booking?.ErrorAssignBookingDate && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      marginRight: "5px",
                      fontSize: 14,
                      marginBottom: "1px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {state.Booking?.ErrorAssignBookingDate}
                  </span>
                </div>
              )}



            </Col>

            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Booking Amount {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Booking Amount"
                  value={bookingAmount}
                  onChange={(e) => handleBookingAmountChange(e)}
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

              {amountError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginBottom: "3px", fontSize: 14, marginRight: "5px" }} />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {amountError}
                  </span>
                </div>
              )}

            </Col>
          </Row>

          <Row>
            <Col md={12}>
              <Form.Group controlId="joiningDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Joining Date (Tentative) {" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

                <div
                  className="datepicker-wrapper"
                  style={{ position: "relative", width: "100%", marginTop: 6 }}
                >


                  <DatePicker
                    style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={joiningDate ? dayjs(joiningDate) : null}
                    onChange={handleJoiningDateChange}
                    disabledDate={(current) => current && current > dayjs().endOf("day")}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                  />

                </div>
              </Form.Group>

              {joiningDateError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "5px", fontSize: 14, marginBottom: "1px" }} />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {joiningDateError}
                  </span>
                </div>
              )}

              {/* {state.Booking?.ErrorAssignBookingDate && (
                    <div style={{ color: "red" }}>
                      <MdError
                        style={{
                          marginRight: "5px",
                          fontSize: 14,
                          marginBottom: "1px",
                        }}
                      />
                      <span
                        style={{
                          color: "red",
                          fontSize: 12,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {state.Booking?.ErrorAssignBookingDate}
                      </span>
                    </div>
                  )} */}



            </Col>
          </Row>

          <Row className="">
            <Col md={12}>
              <Form.Group controlId="formFloor">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Floor {" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>



                <Select
                  options={
                    state?.UsersList?.hosteldetailslist?.map((item) => ({
                      value: item.floor_id,
                      label: item.floor_name,
                    })) || []
                  }
                  onChange={handleFloor}
                  // value={
                  //   state?.UsersList?.hosteldetailslist
                  //     ?.map((item) => ({
                  //       value: item.floor_id,
                  //       label: item.floor_name,
                  //     }))
                  //     .find((option) => option.value === floor) || null
                  // }

                  value={
                    state?.UsersList?.hosteldetailslist
                      ?.map((item) => ({
                        value: item.floor_id,
                        label: item.floor_name,
                      }))
                      .find((option) => option.value === floor) || null
                  }

                  placeholder="Select Floor"
                  classNamePrefix="custom-select"
                  menuPlacement="auto"
                  styles={{
                    control: (base) => ({
                      ...base,
                      fontSize: "16px",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: "50px",
                      borderRadius: "8px",
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #D9D9D9",
                      zIndex: 1000,
                      scrollbarWidth: "thin",
                      fontFamily: "Gilroy",
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      padding: 0,
                      overflowY: "auto",
                      fontFamily: "Gilroy",
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                      ...base,
                      height: "auto",
                      padding: "3px 10px",
                      fontSize: "16px",
                      backgroundColor: isSelected
                        ? "#007bff"
                        : isFocused
                          ? "#e9ecef"
                          : "white",
                      color: isSelected ? "white" : "#000",
                      cursor: "pointer",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      display: "inline-block",
                      fill: "currentColor",
                      lineHeight: 1,
                      stroke: "currentColor",
                      strokeWidth: 0,
                      cursor: "pointer",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />

              </Form.Group>

              {floorError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      marginRight: "5px",
                      fontSize: 14,
                      marginBottom: "2px",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {floorError}
                  </span>
                </div>
              )}
            </Col>
          </Row>

          <Row className="">


            <Col md={6}>
              <Form.Group controlId="formRoom">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Room {" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>

                <Select
                  options={
                    state.UsersList?.roomdetails?.map((item) => ({
                      value: item.Room_Id,
                      label: item.Room_Name,
                    })) || []
                  }
                  onChange={handleRoomChange}
                  value={
                    state.UsersList?.roomdetails
                      ?.map((item) => ({
                        value: item.Room_Id,
                        label: item.Room_Name,
                      }))
                      .find((option) => option.value === room) || null
                  }
                  placeholder="Select a Room"
                  styles={{
                    control: (base) => ({
                      ...base,
                      fontSize: "16px",
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      boxShadow: "none",
                      border: "1px solid #D9D9D9",
                      height: "50px",
                      borderRadius: "8px",
                    }),
                    menu: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      overflowY: "auto",
                      border: "1px solid #D9D9D9",
                      zIndex: 1000,
                      scrollbarWidth: "thin",
                      fontFamily: "Gilroy",
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "150px",
                      padding: 0,
                      overflowY: "auto",
                      fontFamily: "Gilroy",
                    }),
                    option: (base, { isFocused, isSelected }) => ({
                      ...base,
                      height: "auto",
                      padding: "3px 10px",
                      fontSize: "16px",
                      backgroundColor: isSelected
                        ? "#007bff"
                        : isFocused
                          ? "#e9ecef"
                          : "white",
                      color: isSelected ? "white" : "#000",
                      cursor: "pointer",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#555",
                      display: "inline-block",
                      fill: "currentColor",
                      lineHeight: 1,
                      stroke: "currentColor",
                      strokeWidth: 0,
                      cursor: "pointer",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                  }}
                />
              </Form.Group>
              {roomError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      marginRight: "5px",
                      fontSize: 14,
                      marginBottom: "2px",
                    }}
                  />
                  <span
                    style={{
                      color: "red",
                      fontSize: 12,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {roomError}
                  </span>
                </div>
              )}
            </Col>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <Form.Label
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Bed  {" "} <span style={{ color: "red", fontSize: "20px" }}> * </span>
              </Form.Label>


              <Select
                options={
                  state.UsersList?.bednumberdetails?.bed_details?.length > 0
                    ? state.UsersList.bednumberdetails.bed_details
                      .filter(
                        (item) =>
                          item.bed_no !== "0" &&
                          item.bed_no !== "undefined" &&
                          item.bed_no !== "" &&
                          item.bed_no !== "null"
                      )
                      .map((item) => ({
                        value: item.id,
                        label: item.bed_no,
                      }))
                    : []
                }
                onChange={handleBedChange}
                value={
                  bed
                    ? {
                      value: bed,
                      label:
                        state.UsersList?.bednumberdetails?.bed_details?.find(
                          (bedItem) => bedItem.id === bed
                        )?.bed_no || "Selected Bed",
                    }
                    : null
                }
                placeholder="Selected Bed"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No beds available"}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "50px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    boxShadow: "none",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#f8f9fa",
                    border: "1px solid #ced4da",
                    fontFamily: "Gilroy",
                  }),
                  menuList: (base) => ({
                    ...base,
                    backgroundColor: "#f8f9fa",
                    maxHeight: "120px",
                    padding: 0,
                    scrollbarWidth: "thin",
                    overflowY: "auto",
                    fontFamily: "Gilroy",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#555",
                  }),
                  dropdownIndicator: (base) => ({
                    ...base,
                    color: "#555",
                    cursor: "pointer"
                  }),
                  indicatorSeparator: () => ({
                    display: "none",
                  }),
                }}
              />

              {bedError && (
                <div style={{ color: "red" }}>
                  <MdError
                    style={{
                      color: "red",
                      fontSize: 14,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      marginRight: "5px",
                    }}
                  />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {bedError}
                  </label>
                </div>
              )}
            </div>

          </Row>



        </Modal.Body>

        {state.createAccount?.networkError ?
          <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
            <MdError style={{ color: "red", marginRight: '5px', fontSize: 14 }} />
            <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
          </div>
          : null}

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



        <Modal.Footer style={{ borderTop: "none" }}>

          <div className="d-flex justify-content-end">
            <Button
              style={{
                backgroundColor: "white",
                fontWeight: 400,
                padding: '5px 40px',
                borderRadius: 10,
                fontSize: 16,
                fontFamily: "Gilroy",
                color: 'rgba(75, 75, 75, 1)',
                border: '1px solid white'
              }}
              onClick={handleCloseBooking}
            >
              Cancel
            </Button>

            <Button
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 500,
                // height: 40,
                borderRadius: 10,
                fontSize: 16,
                padding: '5px 40px',
                fontFamily: "Gilroy",
              }}
              onClick={handleBookingSubmit}
            >
              Book
            </Button>
          </div>

        </Modal.Footer>
      </Modal>
    </>



  );
}

BookingModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  handleCloseAddBooking: PropTypes.func.isRequired,
  add_bookingshow: PropTypes.func.isRequired,
  assignBooking: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  ID: PropTypes.string,
  Phone: PropTypes.string,
  Email: PropTypes.string,
  profile: PropTypes.string,
  Name: PropTypes.string,

  userDetail: PropTypes.shape({
    ID: PropTypes.string,
    Phone: PropTypes.string,
    Email: PropTypes.string,
    profile: PropTypes.string,
    Name: PropTypes.string
  }).isRequired
};

export default BookingModal;





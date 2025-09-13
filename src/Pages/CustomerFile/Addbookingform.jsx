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
  const [Floor, setFloor] = useState('');
  const [bed, setBed] = useState('');
  const [formLoading, setFormLoading] = useState(false)
  const [availableBed, setAvailableBed] = useState('')
  const [bedWarning, setBedWarning] = useState('')
  const [modeOfPayment, setModeOfPayment] = useState("");
  const [transactionId, setTransactionId] = useState("")
  const [paymentError, setPaymentError] = useState("");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "BEDNUMBERDETAILS", payload: { hostelId: state.login.selectedHostel_Id }
      });
    }
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
    if (state.Booking.bookingEmailError || state.Booking?.bookingBedError) {
      setFormLoading(false)
      if (EmailInputRef.current) {
        EmailInputRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setTimeout(() => {
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
        // dispatch({ type: "ERROR_BOOKING_REMOVE" })
      }, 2000);
    }
  }, [state.Booking.bookingEmailError, state.Booking?.bookingBedError]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
    }
  }, []);


  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setFormLoading(false)

      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "USERLIST",
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



  const handleTransactionId = (e) => {
    const value = e.target.value;
    setTransactionId(value);
  };



const labelMap = {
    CARD: "Card",
    CASH: "Cash",
    UPI: "UPI",
    BANK: "Bank",
  };

  const paymentOptions = Array.isArray(state.bankingDetails.bankingList)
    ? state.bankingDetails?.bankingList?.map((item) => ({
      value: String(item.bankingId),
      label: `${item.accountHolderName} - ${labelMap[item.accountType] || ""}`,
    }))
    : [];
useEffect(() => {
    if (state.bankingDetails.bankingList) {

      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.bankingList]);
  const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    setPaymentError("")
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };





  useEffect(() => {
    dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  }, [])


  useEffect(() => {
    if (Floor) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: Floor } })
    }
  }, [Floor]);
  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ALL_FLOOR_LIST' })
      }, 500)
    }

  }, [state.UsersList.floorListStatusCode])


  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_ALL_ROOMS_STATUS_CODE' })
      }, 100)
    }

  }, [state?.PgList?.getAllRoomSuccessStatus])





  const handleRooms = (selectedOption) => {
    const selectedRoomId = selectedOption;

    setRoom(selectedRoomId);
    setBed("");

    if (selectedRoomId) {
      setRoomError("");
    } else {
      setRoomError("Please select a valid room.");
    }
  };
  useEffect(() => {
    if (room) {
      const filteredBed = state.UsersList?.bednumberdetails.filter((view) => {
        return view.floorId === Floor && view.roomId === room
      });
      setAvailableBed(filteredBed)
    }

  }, [room])

  const handleCloseBooking = () => {
    dispatch({ type: "ERROR_BOOKING_REMOVE" })
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


  const handleBookingDateChange = (date) => {
    setDateError("");
    setBookingDate(date ? date.toDate() : null);
    setJoiningDate("")
  };

  // const handleBookingAmountChange = (e) => {
  //   setAmountError("");
  //   setBookingAmount(e.target.value);
  // };
  const handleBookingAmountChange = (e) => {
    const value = e.target.value;

    // only allow numbers
    if (/^\d*$/.test(value)) {
      setAmountError("");
      setBookingAmount(value);
    }
  };


  const handleJoiningDateChange = (date) => {
    if (bookingDate && dayjs(date).isBefore(dayjs(bookingDate), "day")) {
      setJoiningDateError("Joining Date cannot be before Booking Date");
      setJoiningDate(null);
    } else {
      setJoiningDateError("");
      setJoiningDate(date);
    }
  };


  const handleBed = (selectedOption) => {
    dispatch({ type: "ERROR_BOOKING_REMOVE" });

    setBedError("");

    const selectedBedId = selectedOption?.value || "";
    setBed(selectedBedId);

    const selectedBed = state.UsersList?.bednumberdetails?.find(
      (bed) => String(bed.bedId) === String(selectedBedId)
    );

    if (selectedBed) {
      if (selectedBed.showWarning) {
        setBedWarning(selectedBed.warningMessage);
      } else {
        setBedWarning("");
      }
    }
  };



  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };



  const handleBookingSubmit = () => {

    let isValid = true;

    if (!bookingDate) {
      setDateError("Please select Booking Date");
      isValid = false;
    } else {
      setDateError("");
    }


    if (!bookingAmount) {
      setAmountError("Please enter Booking Amount");
      isValid = false;
    } else if (isNaN(bookingAmount)) {
      setAmountError("Booking Amount must be a number");
      isValid = false;
    } else if (Number(bookingAmount) <= 0) {
      setAmountError("Booking Amount must be greater than 0");
      isValid = false;
    } else {
      setAmountError("");
    }

// if(!modeOfPayment){
//        setPaymentError("Please Select Mode Of Transaction");
//         isValid = false;
//     }
//     else {
//       setPaymentError("");
//     }

    if (!joiningDate) {
      setJoiningDateError("Please select Joining Date");
      isValid = false;
    } else {
      setJoiningDateError("");
    }

    if (!Floor) {
      setFloorError("Please select Floor");
      isValid = false;
    } else {
      setFloorError("");
    }

    if (!room) {
      setRoomError("Please select Room");
      isValid = false;
    } else {
      setRoomError("");
    }


    if (!bed) {
      setBedError("Please select Bed");
      isValid = false;
    } else {
      setBedError("");
    }

    if (!isValid) return;


    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(joiningDate);
    const bookingDateForFormatted = formatDate(bookingDate);

    dispatch({
      type: "ADD_BOOKING",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        joiningDate: joiningDateForFormatted,
        bookingDate: bookingDateForFormatted,
        bookingAmount: bookingAmount,
        floorId: Floor,
        roomId: room,
        bedId: bed,
        customerId: props.userDetail?.customerId,

      },
    });

    // dispatch({
    //   type: "ADD_BOOKING",
    //   payload: {
    //     joining_date: formattedDate,
    //     booking_date: bookingFormattedDate,
    //     amount: bookingAmount,
    //     hostel_id: state.login.selectedHostel_Id,
    //     floor_id: Floor,
    //     room_id: room,
    //     bed_id: bed,
    //     customer_Id: props.userDetail.ID,
    //     mob_no: props.userDetail.Phone,
    //     email: props.userDetail.Email,
    //     profile: props.userDetail.profile
    //   },
    // });
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

              <Image onChange={handleFileChange}
                src={
                  file
                    ? (typeof file === "string" ? file : URL.createObjectURL(file))
                    : (props.userDetail?.profilePic && props.userDetail.profilePic !== ""
                      ? props.userDetail.profilePic
                      : Profiles)
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = Profiles;
                }}
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
                  {props?.userDetail?.firstName || "Name"}{" "}
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
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
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
                    {amountError}
                  </span>
                </div>
              )}

            </Col>


<Col md={6} >
                             <Form.Group
                               
                               controlId="exampleForm.ControlInput1"
                             >
                               <Form.Label
                                 style={{
                                   fontSize: 14,
                                   color: "#222222",
                                   fontFamily: "Gilroy",
                                   fontWeight: 500,
                                   marginTop: "5px",
                                 }}
                               >
                                 Mode Of Transaction {" "}
                                 <span
                                   style={{
                                     color: "#FF0000",
                                     fontSize: "20px",
                                   }}
                                 >
                                   *
                                 </span>
                               </Form.Label>
             
             
                              
                          <Select
                            options={paymentOptions}
                            onChange={(selectedOption) =>
                              handleModeOfPaymentChange(selectedOption?.value)
                            }
                            value={
                              modeOfPayment
                                ? paymentOptions.find((opt) => opt.value === String(modeOfPayment)) || null
                                : null
                            }
                            placeholder="Select Payment"
                            // isDisabled={currentItem}
                            noOptionsMessage={() => "No mode available"}
                            styles={{
                              control: (base) => ({
                                ...base,
                                fontSize: 16,
                                color: "rgba(75, 75, 75, 1)",
                                fontFamily: "Gilroy",
                                fontWeight: modeOfPayment ? 600 : 500,
                                border: "1px solid #D9D9D9",
                                borderRadius: "8px",
                                boxShadow: "none",
                                height: 48,
                                cursor: "pointer",
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
                                cursor: "pointer",
                              }),
                              option: (base, state) => ({
                                ...base,
                                cursor: "pointer",
                                backgroundColor: state.isFocused ? "lightblue" : "white",
                                color: "#000",
                                fontFamily: "Gilroy",
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                            }}
                          />
             
                             </Form.Group>
                             {paymentError && (
                               <div className="d-flex align-items-center p-1 mb-2">
                                 <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px",  }} />
                                 <label
                                   className="mb-0"
                                   style={{
                                     color: "red",
                                     fontSize: "12px",
                                     fontFamily: "Gilroy",
                                     fontWeight: 500,
                                     whiteSpace: "nowrap"
                                   }}
                                 >
                                   {paymentError}
                                 </label>
                               </div>
                             )}
                           </Col>



                              <Col md={6} style={{marginTop:10}}>
              <Form.Group >
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                 Transaction ID{" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Transaction ID"
                 value={transactionId} 
                 onChange={(e)=>handleTransactionId(e)} 
                
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

                  <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                    <DatePicker
                      style={{
                        width: "100%",
                        height: 48,
                        cursor: "pointer",
                        fontFamily: "Gilroy",
                      }}
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={joiningDate ? dayjs(joiningDate) : null}
                      onChange={handleJoiningDateChange}
                      // disabledDate={(current) =>
                      //   bookingDate && current && current.isBefore(dayjs(bookingDate), "day")
                      // }
                      disabledDate={(current) => {
                        if (!bookingDate) {
                          return true;
                        }
                        return current && current.isBefore(dayjs(bookingDate), "day");
                      }}
                      getPopupContainer={() => document.body}

                    />
                  </div>



                </div>
              </Form.Group>

              {joiningDateError && (
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
                    {joiningDateError}
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
                    state.UsersList.floorList?.map((u) => ({
                      value: u.id,
                      label: u.name,
                    })) || []
                  }
                  onChange={handleFloor}
                  value={
                    state.UsersList.floorList?.find(
                      (option) => option.id === Floor
                    )
                      ? {
                        value: Floor,
                        label: state.UsersList.floorList.find(
                          (option) => option.id === Floor
                        )?.name,
                      }
                      : null
                  }
                  placeholder="Select a Floor"
                  classNamePrefix="custom"
                  menuPlacement="auto"
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
                    option: (base, state) => ({
                      ...base,
                      cursor: "pointer",
                      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                      color: "#000",
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
                    state.PgList?.roomsList?.map((item) => ({
                      value: item.id,
                      label: item.name,
                    })) || []
                  }
                  onChange={(selectedOption) =>
                    handleRooms(selectedOption?.value)
                  }
                  value={
                    state.PgList?.roomsList?.find(
                      (option) => option.id === room
                    )
                      ? {
                        value: room,
                        label: state.PgList?.roomsList.find(
                          (option) => option.id === room
                        )?.name,
                      }
                      : null
                  }
                  placeholder="Select a Room"
                  classNamePrefix="custom"
                  menuPlacement="auto"
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
                    option: (base, state) => ({
                      ...base,
                      cursor: "pointer",
                      backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                      color: "#000",
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
                  availableBed
                    ? availableBed
                      .filter(
                        (item) => item &&
                          item?.bedName !== "0" &&
                          item?.bedName !== "undefined" &&
                          item?.bedName !== "" &&
                          item?.bedName !== "null"
                      )
                      .map((item) => ({
                        value: item?.bedId,
                        label: item?.bedName,
                      }))
                    : []
                }
                onChange={handleBed}
                value={
                  availableBed
                    ? (() => {
                      const selected = availableBed?.find(
                        (option) => option?.bedId === bed
                      );
                      return selected
                        ? { value: selected.bedId, label: selected.bedName }
                        : null;
                    })()
                    : null
                }
                placeholder="Select a Bed"
                classNamePrefix="custom"
                menuPlacement="auto"
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
                  option: (base, state) => ({
                    ...base,
                    cursor: "pointer",
                    backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                    color: "#000",
                  }),
                }}
              />

              {bedWarning ?
                <div className='d-flex  align-items-center  mt-1 mb-1'>
                  <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px", }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{bedWarning}</label>
                </div>
                : null}
              {state.Booking?.bookingBedError ?
                <div className='d-flex  align-items-center  mt-1 mb-1'>
                  <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px", }} />
                  <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.Booking?.bookingBedError}</label>
                </div>
                : null}

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
    Name: PropTypes.string,
    customerId: PropTypes.string,
    profilePic:PropTypes.string,
    firstName:PropTypes.string,

  }).isRequired
};

export default BookingModal;





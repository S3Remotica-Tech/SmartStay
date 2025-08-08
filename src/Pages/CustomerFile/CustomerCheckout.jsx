/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, ModalBody } from "react-bootstrap";
import { MdError } from "react-icons/md";
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { CloseCircle } from "iconsax-react";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";

function CustomerCheckout(props) {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false)

  const [selectedDate, setSelectedDate] = useState(null);
  const [requestDate, setRequestDate] = useState(null);
  const [dateDifference, setDateDifference] = useState(null);
  const [comments, setComments] = useState('');
  const [checkoUtDateError, setCheckOutDateError] = useState('')
  const [joiningError, setJoiningError] = useState('')
  const [checkoUtrequestDateError, setCheckOutRequestDateError] = useState('')
  const [file, setFile] = useState(null);

  const handleCloseCheckout = () => {
    dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR' })
    props.setCustomerCheckoutpage(false)
  }

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 200) {
      setFormLoading(false)
      props.setCustomerCheckoutpage(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 2000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.data.ID } });
      }, 200);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode])


  const calculateDateDifference = (checkoutDate, reqDate) => {
    if (checkoutDate && reqDate) {
      const diffInMs = checkoutDate - reqDate;
      const diffInDays = Math.ceil(Math.abs(diffInMs) / (1000 * 60 * 60 * 24)) + 1;
      setDateDifference(diffInDays);
    } else {
      setDateDifference(null);
    }
  };


  const handleCheckOutCustomer = () => {
    dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR' })



    const formattedDate = dayjs(selectedDate).isValid()
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : null;

    const formattedrequestDate = dayjs(requestDate).isValid()
      ? dayjs(requestDate).format("YYYY-MM-DD")
      : null;


    if (!selectedDate || !requestDate) {
      if (!selectedDate) {
        setCheckOutDateError('Please Select  Check-Out Date');
      }

      if (!requestDate) {
        setCheckOutRequestDateError('Please Select  Request Date');
      }
      return
    }

    
 if (dayjs(formattedDate).isBefore(dayjs(formattedrequestDate))) {
    setCheckOutDateError('Before Request Date not allowed');
    return;
  }
    if (props.uniqueostel_Id && formattedDate && formattedrequestDate) {
      dispatch({
        type: 'ADDCHECKOUTCUSTOMER', payload: {
          checkout_date: formattedDate,
          user_id: props.data.ID,
          hostel_id: props.uniqueostel_Id,
          comments: comments,
          action: 1,
          req_date: formattedrequestDate
        }
      })
      setFormLoading(true)
    }

  }


  useEffect(() => {
    if (state.UsersList.errorMessageAddCheckOut) {
      setFormLoading(false)
    }
  }, [state.UsersList.errorMessageAddCheckOut])
  
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
      <div>
        <Modal
          show={props.customerCheckoutpage}
          onHide={handleCloseCheckout}
          backdrop="static"
          centered
         
        >
          <Modal.Dialog
            style={{
             
              paddingRight: "10px",
              borderRadius: "30px",
            }}
            className="m-0 p-0"
          >
            <Modal.Body style={{ marginTop: -30 }}>
              <div className="d-flex align-items-center">

                <div className="container">
                  <div className="row mb-3"></div>

                  <Modal.Header
                    style={{ marginBottom: "10px", position: "relative", paddingRight: 1, paddingLeft: 1 }}
                  >
                    <div style={{display:'flex', flexDirection:'column'}}>
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                   Move to Notice Period
                    </div>
                           {dateDifference !== null && (
                        <div className="col-12 mt-1">
                          <p
                            style={{
                              fontSize: 15,
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              color: "#1E45E1",
                            }}
                          >
                             Notice Days* : {dateDifference}  
                          </p>
                        </div>
                      )}
</div>
                    <CloseCircle size="24" color="#000" onClick={handleCloseCheckout}
                      style={{ cursor: 'pointer' }} />
                  </Modal.Header>


                  <ModalBody className="p-0">

                    <div className="row mb-3">

                      <div className="d-flex align-items-center">
                                                                    <div
                                                                      className=""
                                                                      style={{
                                                                        height: 60,
                                                                        width: 60,
                                                                        position: "relative",
                                                                      }}
                                                                    >
                                                                      <Image
                                                                        src={
                                                                          file
                                                                            ? typeof file === "string"
                                                                              ? file
                                                                              : URL.createObjectURL(file)
                                                                            : Profiles
                                                                        }
                                                                        alt="filee"
                                                                        roundedCircle
                                                                        style={{ height: 60, width: 60 }}
                                                                      />
                                
                                                                      {/* <label htmlFor="imageInput" className="">
                                                                        <Image
                                                                          src={Plus}
                                                                          roundedCircle
                                                                          style={{
                                                                            height: 20,
                                                                            width: 20,
                                                                            position: "absolute",
                                                                            top: 90,
                                                                            left: 80,
                                                                            transform: "translate(-50%, -50%)",
                                                                          }}
                                                                        />
                                                                        <input
                                                                          type="file"
                                                                          accept="image/*"
                                                                          multiple
                                                                          className="sr-only"
                                                                          id="imageInput"
                                                                          onChange={handleImageChange}
                                                                          style={{ display: "none" }}
                                                                        />
                                                                      </label> */}
                                                                    </div>
                                                                    <div style={{display:'flex', flexDirection:'column'}}>
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
                                                                          Suresh
                                                                        </label>
                                                                      </div>
                                                                     
                                                                    </div>

                                                                       <div className="d-flex flex-wrap gap-2 ms-2">
                                                                        
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#FFEFCF",
                            padding: "6px 12px",
                            borderRadius: "60px",
                            fontFamily: "Gilroy",
                            fontSize: 12,
                            color: "#222",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {/* {props.complaints?.floor_name} */}Ground Floor
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#FFE0D9",
                            padding: "6px 12px",
                            borderRadius: "60px",
                            fontFamily: "Gilroy",
                            fontSize: 12,
                            color: "#222",
                            fontWeight: 500,
                            whiteSpace: "nowrap",
                          }}
                        >
                          {/* {props.complaints?.room_name} - B{props.complaints?.bedName} */}G005 - B03
                        </div>


                      </div>
                      </div>
                                                                  </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group className="mb-2" controlId="requestDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Request Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </Form.Label>

                          <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                            <DatePicker
                              style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={requestDate ? dayjs(requestDate) : null}
                              onChange={(date) => {
                                setRequestDate(date);
                                calculateDateDifference(selectedDate, date);
                                setCheckOutRequestDateError('')
                              }}
                                disabledDate={(current) => current && current > dayjs().endOf("day")}
                              getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                            />
                          </div>
                        </Form.Group>
                        {checkoUtrequestDateError && (
                          <div className="d-flex align-items-center  mb-1">
                            <MdError style={{ color: "red", marginRight: '5px' }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                              {checkoUtrequestDateError}
                            </label>
                          </div>
                        )}
                      </div>


                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group className="mb-2" controlId="checkoutDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Check-Out Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
                          </Form.Label>

                          <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                            <DatePicker
                              style={{ width: "100%", height: 48, cursor: "pointer", fontFamily: "Gilroy", }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={selectedDate ? dayjs(selectedDate) : null}
                              onChange={(date) => {
                                setSelectedDate(date);
                                calculateDateDifference(date, requestDate);
                                setCheckOutDateError('');
                                setJoiningError('')
                              }}
                              
                              getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                            />
                          </div>

                        </Form.Group>
                        {checkoUtDateError && (
                          <div className="d-flex align-items-center  mb-1">
                            <MdError style={{ color: "red", marginRight: '5px' }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500, whiteSpace: "nowrap" }}>
                              {checkoUtDateError}
                            </label>
                          </div>
                        )}


                        {joiningError && (
                          <div className="d-flex align-items-center  mb-2">
                            <MdError style={{ color: "red", marginRight: '5px' }} />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                whiteSpace: "normal",
                                lineHeight: "1.2"
                              }}
                            >
                              {joiningError}
                            </label>
                          </div>
                        )}



                      </div>


                      <div className='col-lg-12 col-md-12 col-sm-12 colxs-12'>
                        <label htmlFor="comments" className='mt-2' style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Reason(Comments)</label>
                        <input
                          type="text"
                          name="comments"
                          id="comments"
                          value={comments}
                          onChange={handleCommentsChange}
                          className="form-control mt-2"
                          placeholder="Enter Comments"
                          required
                          style={{ height: '50px', borderRadius: '8px', fontSize: 16, color: comments ? "#222" : "#4b4b4b", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9" }}
                        />
                      </div>


               

                    </div>

                  </ModalBody>


{state.createAccount?.networkError ?
              <div className='d-flex  align-items-center justify-content-center mt-1 mb-2'>
                <MdError style={{ color: "red", marginRight: '5px' }} />
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





                  {state.UsersList.errorMessageAddCheckOut && (
                    <div className="d-flex align-items-center mb-3" style={{ paddingBottom: 5 }}>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                        {state.UsersList.errorMessageAddCheckOut}
                      </label>
                    </div>
                  )}


                <div className="d-flex justify-content-end">
                  <Button
                    style={{
                      backgroundColor: "white",
                      fontWeight: 400,
                      height: 40,
                      borderRadius: 10,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      color:'rgba(75, 75, 75, 1)',
                      border:'1px solid white'
                    }}
                    onClick={handleCloseCheckout}
                  >
                   Cancel
                  </Button>

                  <Button
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 500,
                      height: 40,
                      borderRadius: 10,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                    }}
                    onClick={handleCheckOutCustomer}
                  >
                     CheckOut
                  </Button>
                  </div>

                </div>

              </div>
            </Modal.Body>

                     </Modal.Dialog>
        </Modal>
      </div>
    </>
  )
}

CustomerCheckout.propTypes = {
  setCustomerCheckoutpage: PropTypes.func.isRequired,
  data: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  customerCheckoutpage: PropTypes.func.isRequired,
  uniqueostel_Id: PropTypes.func.isRequired,
};
export default CustomerCheckout
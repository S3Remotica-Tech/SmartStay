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
import ErrorMessage from '../../Components/ErrorMessage'

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
  const [lastDate, setLastDate] = useState("");
  const [joiningdate, setJoiningDate] = useState("")

  // useEffect(() => {
  //   if(props?.data?.ID || props?.data[0]?.id ){
  //   dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props?.data?.ID || props?.data[0]?.id } });
  //      }

  //   }, [props]);


  // useEffect(() => {

  //   if (props.data.ID || props.data) {
  //     dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.data.ID || props.data } });
  //   }
  // }, [props.data]);







  useEffect(() => {
    if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
      const customerData = state.UsersList.customerdetails?.data?.[0]
      const invoiceDetails = state.UsersList.customerdetails?.invoice_details;


      if (customerData?.joining_Date) {
        const joining = new Date(customerData.joining_Date);
        const formattedJoining = `${String(joining.getDate()).padStart(2, "0")}-${String(
          joining.getMonth() + 1
        ).padStart(2, "0")}-${joining.getFullYear()}`;
        setJoiningDate(formattedJoining);
      } else {
        setJoiningDate("");
      }


      if (invoiceDetails && invoiceDetails.length > 0) {
        const dates = invoiceDetails.map((item) => item.Date).filter(Boolean);
        if (dates.length > 0) {
          const maxDate = new Date(Math.max(...dates.map((d) => new Date(d))));
          const formatted = `${String(maxDate.getDate()).padStart(2, "0")}-${String(
            maxDate.getMonth() + 1
          ).padStart(2, "0")}-${maxDate.getFullYear()}`;
          setLastDate(formatted);
        } else {
          setLastDate("");
        }
      } else {
        setLastDate("");
      }

      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 1000);
    }
  }, [state.UsersList.CustomerdetailsgetStatuscode]);



  useEffect(() => {
    if (props.bedData.actualJoining || props.bedData.currentTenantJoiningDate) {
      setJoiningDate(props.bedData.actualJoining || props.bedData.currentTenantJoiningDate)
    }

  }, [props.bedData.actualJoining,props.bedData.currentTenantJoiningDate])




  const handleCloseCheckout = () => {
    dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR' })
    props.setCustomerCheckoutpage(false)
  }

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };



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



    dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR' });

    if (!selectedDate || !requestDate) {
      if (!selectedDate) {
        setCheckOutDateError('Please Select Check-Out Date');
      }
      if (!requestDate) {
        setCheckOutRequestDateError('Please Select Request Date');
      }
      return;
    }


    if (dayjs(selectedDate).isBefore(dayjs(requestDate))) {
      setCheckOutDateError('Before Request Date not allowed');
      return;
    }

    const formattedDate = dayjs(selectedDate).isValid()
      ? dayjs(selectedDate).format("DD-MM-YYYY")
      : null;

    const formattedrequestDate = dayjs(requestDate).isValid()
      ? dayjs(requestDate).format("DD-MM-YYYY")
      : null;
    const customerId = props.bedData?.currentTenantCustomerId || props.bedData?.customerId;
    if (customerId && formattedDate && formattedrequestDate) {

      dispatch({
        type: 'ADDCHECKOUTCUSTOMER',
        payload: {
          customerId: customerId,
          hostelId: props.bedData?.hostelId || state.login.selectedHostel_Id,
          requestDate: formattedrequestDate,
          checkoutDate: formattedDate,
          reason: comments
        }
      });





      setFormLoading(true);
    }
  };


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

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 201) {
      handleCloseCheckout()
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode])


console.log("props",props)


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
            <Modal.Header
              style={{ marginBottom: "8px", position: "relative", }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                        marginBottom: 0
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
            <Modal.Body style={{ marginTop: -30 }}>
              <div className="d-flex align-items-center">

                <div className="container">
                  <div className="row mb-3"></div>




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
                              props.bedData
                                ? props.bedData.currentTenantProfilePic && props.bedData.currentTenantProfilePic !== ""
                                  ? typeof props.bedData.currentTenantProfilePic === "string"
                                    ? props.bedData.currentTenantProfilePic
                                    : URL.createObjectURL(props.bedData.currentTenantProfilePic)
                                  : props.bedData.profilePic && props.bedData.profilePic !== ""
                                    ? typeof props.bedData.profilePic === "string"
                                      ? props.bedData.profilePic
                                      : URL.createObjectURL(props.bedData.profilePic)
                                    : Profiles
                                : Profiles
                            }

                            alt="Profile"
                            roundedCircle
                            style={{ height: 60, width: 60 }}
                            onError={(e) => {

                              e.target.onerror = null;
                              e.target.src = Profiles;
                            }}
                          />


                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
                                {props.data?.Name || state.UsersList.customerdetails?.data?.[0].Name || props.bedData?.currentTenantFullName || props.bedData?.firstName}
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
                              {state.UsersList.customerdetails?.data?.[0].floor_name || props.bedData?.floorName}
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
                              {props.bedData?.room?.Room_Name || props.bedData?.roomName}  - {props.bedData?.bed?.bed_no || props.bedData?.bedName}
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
                              style={{
                                width: "100%",
                                height: 48,
                                border: "1px solid lightgrey",
                                cursor: "pointer",
                                fontFamily: "Gilroy",
                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={requestDate ? dayjs(requestDate) : null}
                              onChange={(date) => {
                                setCheckOutRequestDateError("");
                                dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });

                                setRequestDate(date ? date.toDate() : null);
                                calculateDateDifference(selectedDate, date);
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".datepicker-wrapper")
                              }
                              disabledDate={(current) => {
                                if (!current) return false;
                                const joining = joiningdate ? dayjs(joiningdate, "DD/MM/YYYY") : null;
                                if (joining && current.isBefore(joining.startOf("day"))) {
                                  return true;
                                }
                                 if (current.isAfter(dayjs().endOf("day"))) {
    return true;
  }
                               return false;
                              }}
                            />

                          </div>
                        </Form.Group>
                        {checkoUtrequestDateError && (
                          <ErrorMessage message={checkoUtrequestDateError} type="error" />
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
                              style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy",
                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={selectedDate ? dayjs(selectedDate) : null}
                              onChange={(date) => {
                                setSelectedDate(date);
                                calculateDateDifference(date, requestDate);
                                setCheckOutDateError('');
                                setJoiningError('');
                                dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR" });

                              }}
                              disabledDate={(current) => {
                                if (!requestDate) {
                                  return true;
                                }
                                return current && current.isBefore(dayjs(requestDate), "day");
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".datepicker-wrapper")
                              }
                            />

                          </div>

                        </Form.Group>
                        {checkoUtDateError && (
                          <ErrorMessage message={checkoUtDateError} type="error" />
                        )}


                        {joiningError && (
                          <ErrorMessage message={joiningError} type="error" />
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
                    <ErrorMessage message={state.UsersList.errorMessageAddCheckOut} type="error" />
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
                        color: 'rgba(75, 75, 75, 1)',
                        border: '1px solid white'
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
  data: PropTypes.object.isRequired,
  customerCheckoutpage: PropTypes.bool.isRequired,
  uniqueostel_Id: PropTypes.string.isRequired,
  Hostel_Id: PropTypes.number,
  Floor_Id: PropTypes.number,
  Room_Name: PropTypes.string,
  bed_no: PropTypes.string,
  bed_amount: PropTypes.number,
  bedData: PropTypes.shape({
    customerId: PropTypes.string.isRequired,
    hostelId: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    floorName: PropTypes.string.isRequired,
    roomName: PropTypes.string.isRequired,
    bedName: PropTypes.string.isRequired,
    room: PropTypes.shape({
      Hostel_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Floor_Id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      Room_Name: PropTypes.string,
    }),
    bed: PropTypes.shape({
      bed_no: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
};

export default CustomerCheckout
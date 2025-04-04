/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Form} from "react-bootstrap";
import { MdError } from "react-icons/md";
import 'react-datepicker/dist/react-datepicker.css';
// import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

function CustomerCheckout(props){

  
    
  
    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [selectedDate, setSelectedDate] = useState(null);
    const [requestDate, setRequestDate] = useState(null);
    const [dateDifference, setDateDifference] = useState(null);
    const [comments, setComments] = useState('');
    const [checkoUtDateError, setCheckOutDateError] = useState('')
    const [checkoUtrequestDateError, setCheckOutRequestDateError] = useState('')

    const handleCloseCheckout=()=>{
      dispatch({ type: 'CLEAR_ADD_CHECKOUT_CUSTOMER_LIST_ERROR'})
        props.setCustomerCheckoutpage(false)
    }

    const handleCommentsChange = (event) => {
      setComments(event.target.value);
    };

      useEffect(() => {
          if ( state.UsersList.addCheckoutCustomerStatusCode === 200 ) {
            props.setCustomerCheckoutpage(false)
            setTimeout(() => {
              dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
            }, 2000);
          }
        }, [state.UsersList.addCheckoutCustomerStatusCode]);

        useEffect(()=> {
           if (state.UsersList.addCheckoutCustomerStatusCode === 200){
            setTimeout(() => {
              dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.data.ID } });
            }, 200);
           }
          },[state.UsersList.addCheckoutCustomerStatusCode])
    

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

       
        const formattedDate = dayjs(selectedDate).isValid()
        ? dayjs(selectedDate).format("YYYY-MM-DD")
        : null;
      
      const formattedrequestDate = dayjs(requestDate).isValid()
        ? dayjs(requestDate).format("YYYY-MM-DD")
        : null;
      

        if(!selectedDate || !requestDate){
          if (!selectedDate) {
            setCheckOutDateError('Please Select a Check-Out Date');
          }
      
          if (!requestDate) {
            setCheckOutRequestDateError('Please Select a Request Date');
          }
          return
        }
    
      
       
        if (props.uniqueostel_Id && formattedDate  && formattedrequestDate ) {
          dispatch({
            type: 'ADDCHECKOUTCUSTOMER', payload: {
              checkout_date: formattedDate,
              user_id: props.data.ID, 
              hostel_id: props.uniqueostel_Id,
              comments: comments,
              action:  1,
              req_date:formattedrequestDate
            }
          })
        }
    
      }
  

   
    return(
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
            maxWidth: 666,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body  style={{marginTop:-30}}>
            <div className="d-flex align-items-center">
              
                <div className="container">
                  <div className="row mb-3"></div>

                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Add Check-Out
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseCheckout}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "16px",
                        border: "1px solid black",
                        background: "transparent",
                        cursor: "pointer",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          fontSize: "30px",
                          paddingBottom: "6px",
                        }}
                      >
                        &times;
                      </span>
                    </button>
                  </Modal.Header>




                  <div className="row mb-3">
                    
        
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
  style={{ width: "100%", height: 48,cursor:"pointer" }}
  format="DD/MM/YYYY"
  placeholder="DD/MM/YYYY" 
  value={selectedDate ? dayjs(selectedDate) : null}
    onChange={(date) => {
      setSelectedDate(date);
      calculateDateDifference(date, requestDate);
      setCheckOutDateError('');
    }}
    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
  />
</div>

        </Form.Group>
        {checkoUtDateError && (
              <div className="d-flex align-items-center p-1 mb-2">
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                  {checkoUtDateError}
                </label>
              </div>
            )}
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
  style={{ width: "100%", height: 48,cursor:"pointer" }} 
   format="DD/MM/YYYY"
    placeholder="DD/MM/YYYY"
  value={requestDate ? dayjs(requestDate) : null}
    onChange={(date) => {
      setRequestDate(date);
      calculateDateDifference(selectedDate, date);
      setCheckOutRequestDateError('')
    }}
    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
  />
</div>
        </Form.Group>
        {checkoUtrequestDateError && (
              <div className="d-flex align-items-center p-1 mb-2">
                <MdError style={{ color: "red", marginRight: '5px' }} />
                <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                  {checkoUtrequestDateError}
                </label>
              </div>
            )}
      </div>

     
   

                    
      <div className='col-lg-12 col-md-12 col-sm-12 colxs-12'>
            <label htmlFor="comments" className='mt-2' style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy", fontWeight: 500 }}>Comments</label>
            <input
              type="text"
              name="comments"
              id="comments"
              value={comments}
              onChange={handleCommentsChange}
              className="form-control mt-2"
              placeholder="Enter Comments"
              required
              style={{ height: '50px', borderRadius: '8px', fontSize: 16, color: comments ? "#222" : "#4b4b4b", fontFamily: "Gilroy", fontWeight:  500, boxShadow: "none", border: "1px solid #D9D9D9" }}
            />
          </div>


{dateDifference !== null && (
        <div className="col-12 mt-3">
          <p
            style={{
              fontSize: 15,
              fontFamily: "Gilroy",
              fontWeight: 500,
              color: "#1E45E1",
            }}
          >
           ( Notice Days* - {dateDifference} days )
          </p>
        </div>
      )}

                  </div>
                  {state.UsersList.errorMessageAddCheckOut && (
                <div className="d-flex align-items-center p-1" style={{paddingBottom:5}}>
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                    {state.UsersList.errorMessageAddCheckOut}
                  </label>
                </div>
              )}

                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 600,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Montserrat",
                    }}
                    onClick={handleCheckOutCustomer}
                  >
                  Move Check-Out
                  </Button>
                </div>
              {/* )} */}
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
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
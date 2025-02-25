import React, { useState, useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, FormControl } from "react-bootstrap";
import Calendars from "../Assets/Images/New_images/calendar.png";
import { MdError } from "react-icons/md";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from "prop-types"

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
          if ( state.UsersList.addCheckoutCustomerStatusCode == 200 ) {
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

        const formattedDate = moment(selectedDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const formattedrequestDate = moment(requestDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
    
        // if ( !setUniqostel_Id && !checkOutDate && !requestDate) {
        //   setGeneralError('Please select all mandatory fields');
        //   return;
        // }
       
    
        // if (!setUniqostel_Id) {
        //   setHostelError('Please select a hostel.');
        //   return;
        // }

        if(!selectedDate || !requestDate){
          if (!selectedDate) {
            setCheckOutDateError('Please select a checkout date.');
          }
      
          if (!requestDate) {
            setCheckOutRequestDateError('Please select a request date.');
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
                      Add Check-out
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


{state.UsersList.errorMessageAddCheckOut && (
                <div className="d-flex align-items-center p-1">
                  <MdError style={{ color: "red", marginRight: '5px' }} />
                  <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                    {state.UsersList.errorMessageAddCheckOut}
                  </label>
                </div>
              )}

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
            Check-out Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
          </Form.Label>
          <div style={{ position: "relative", width: "100%" }}>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                calculateDateDifference(date, requestDate);
                setCheckOutDateError('');
              }}
              dateFormat="dd/MM/yyyy"
              customInput={customDateInput({
                value:
                  selectedDate instanceof Date && !isNaN(selectedDate.getTime())
                    ? selectedDate.toLocaleDateString("en-GB")
                    : "",
              })}
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
          <div style={{ position: "relative", width: "100%" }}>
            <DatePicker
              selected={requestDate}
              onChange={(date) => {
                setRequestDate(date);
                calculateDateDifference(selectedDate, date);
                setCheckOutRequestDateError('')
              }}
              dateFormat="dd/MM/yyyy"
              customInput={customDateInput({
                value:
                  requestDate instanceof Date && !isNaN(requestDate.getTime())
                    ? requestDate.toLocaleDateString("en-GB")
                    : "",
              })}
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
                  Move Check-out
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
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import Calendars from "../Assets/Images/New_images/calendar.png";
import imageCompression from "browser-image-compression";
import { MdError } from "react-icons/md";
import Plus from "../Assets/Images/New_images/add-circle.png";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


function CustomerCheckout(props){
    const [selectedDate, setSelectedDate] = useState(null);
    const [requestDate, setRequestDate] = useState(null);
    const [dateError, setDateError] = useState("");
    const [dateDifference, setDateDifference] = useState(null);
    console.log("dateDifference",dateDifference)

    const handleCloseCheckout=()=>{
        props.setCustomerCheckoutpage(false)
    }
    const calculateDateDifference = (checkoutDate, reqDate) => {
        if (checkoutDate && reqDate) {
          const diffInMs = checkoutDate - reqDate; 
          const diffInDays = Math.ceil(Math.abs(diffInMs) / (1000 * 60 * 60 * 24)) + 1;
          setDateDifference(diffInDays);
        } else {
          setDateDifference(null);
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
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body>
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
      </div>

     
   

                    
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
  <Form.Label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy",
      display: "flex",
      alignItems: "center",
     
    }}
  >
    Comments
    
  </Form.Label>
  <FormControl
    type="text"
    id="form-controls"
    placeholder="Enter amount"
    style={{
      fontSize: 16,
      color: "#4B4B4B",
      fontFamily: "Gilroy",
      fontWeight: 500,
      boxShadow: "none",
      border: "1px solid #D9D9D9",
      height: 50,
      borderRadius: 8,
      marginTop: 8,
    }}
  />
</Form.Group>
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
                    // onClick={handleSaveUserlistAddUser}
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
export default CustomerCheckout
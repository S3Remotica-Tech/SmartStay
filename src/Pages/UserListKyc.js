import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import "./UserList.css";

function UserListKyc(props){
    const handleCloseyc=()=>{
        props.setKycDetailForm(false)
    }
    return(
        <div>
             <Modal
        show={props.kycdetailsForm}
        onHide={handleCloseyc}
        backdrop="static"
        centered
     className="modal-dialog-centered"
     style={{width:400}}
      >
        <Modal.Dialog
          style={{
            maxWidth: "400px",
           
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
                     KYC Verify
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseyc}
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
    Aadhar Number
    
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
              Enter OTP
            </Form.Label>
            <div style={{ display: "flex", gap: "8px" }}>
              {[...Array(6)].map((_, index) => (
                <FormControl
                  key={index}
                  type="text"
                  maxLength={1}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    width: 50,
                    textAlign: "center",
                    borderRadius: 8,
                  }}
                />
              ))}
            </div>
          </Form.Group>
</div>


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
                  Submit
                  </Button>
                </div>
              {/* )} */}
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
        </Modal.Dialog>
      </Modal>
        </div>
    )
}
export default UserListKyc;
/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux"
import { Button, Form, FormControl } from "react-bootstrap";
import "./UserList.css";
import PropTypes from "prop-types";
import {CloseCircle} from "iconsax-react";
import { MdError } from "react-icons/md";
function UserListKyc(props) {

  const dispatch = useDispatch()
  const state = useSelector(state => state)
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [refId, setRefId] = useState('');
  const [aadhaarErr, setaadhaarErr] = useState('')
  const [otpErr, setOtpErr] = useState('')
  const handleCloseyc = () => {
    props.setKycDetailForm(false);
    setAadhaarNo('')
    setOtp('')
  }

  const handleValidate = () => {
    if (aadhaarNo) {
      if (validateAadharNumber(aadhaarNo)) {
        dispatch({
          type: 'KYCVALIDATE',
          payload: { aadhar_number: aadhaarNo, user_id: props.kycuserDetails.ID }
        });
        setaadhaarErr('');
      } else {
        setaadhaarErr('Invalid Aadhaar Number');
      }
    } else {
      setaadhaarErr('Please Enter Aadhar Number');
    }
  };
  
  function validateAadharNumber(aadhar) {
    const aadharStr = aadhar.toString(); // always convert to string
    const regex = /^[2-9]{1}[0-9]{11}$/; // Aadhaar must start with 2-9 and be 12 digits
    return regex.test(aadharStr);
  }
  
  
  const handleAadharNumber = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      return;
    }
  
    if (value.length > 12) {
      return;
    }
  
    setAadhaarNo(value);
    setaadhaarErr("");
  };

const handleSubmit = () => {
   
 dispatch({ type: 'KYCVERIFYINGNEW', payload: { customer_id:props.kycuserDetails.ID } })

  }
  console.log("props.kycuserDetails.ID",props.kycuserDetails.ID)
  // const handleSubmit = () => {
  //   const otpString = otp.join("");
  //   const otpRegex = /^\d{6}$/;
  //   if (otp) {
  //     if (otpRegex.test(otpString)) {
  //       dispatch({ type: 'KYCVALIDATEOTPVERIFY', payload: { aadhar_number: aadhaarNo, user_id: props.kycuserDetails.ID, otp: otpString, ref_id: refId } })
  //     } else {
  //       setOtpErr('Enter valid OTP')
  //     }
  //   }
  //   else {
  //     setOtpErr('Enter OTP')
  //   }


  // }
  // state.UsersList.kycValidateSendOtpSuccess
  useEffect(() => {
    if (state.UsersList.kycValidateSendOtpSuccess === 200) {

      setRefId(state.UsersList.Kyc_Ref_Id)
      // setTimeout(() => {
      //   dispatch({type:'CLEAR_KYC_VALIDATE_SATUS_CODE'})
      // }, 500);
    }
  }, [state.UsersList.kycValidateSendOtpSuccess])

  useEffect(() => {
    if (state.UsersList.kycValidateOtpVerifySuccess === 200) {
      setRefId("")
      handleCloseyc()

    }
  }, [state.UsersList.kycValidateOtpVerifySuccess])

 

  
  return (
    <div style={{borderRadius:24}}>
      <Modal
        show={props.kycdetailsForm}
        onHide={handleCloseyc}
        backdrop="static"
        centered
        className="modal-dialog-centered"
        style={{ width: 411,height:390,borderRadius:24 }}
      >
      
          <Modal.Body>
            <div className="d-flex align-items-center" style={{borderRadius:24,padding:0,margin:0,width: "100%",}}>

              <div className="container" style={{borderRadius:24}}>

                <Modal.Header
                  style={{  position: "relative",
                    // marginBottom: "10px",
                    paddingTop: "2px",paddingBottom:6 }}
                >
                  
                  <div
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      cursor: 'pointer',
                      marginLeft:-15
                    }}
                  >
                    KYC Verify
                  </div>
                  {/* <button
                    type="button"
                    className="close"
                    aria-label="Close"
                    onClick={handleCloseyc}
                    style={{
                      position: "absolute",
                      right: "10px",
                      marginTop: "-15px",
                      border: "1px solid black",
                      background: "transparent",
                      cursor: "pointer",
                      padding: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      width: "25px",
                      height: "25px",
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
                  </button> */}
                  <CloseCircle size="24" color="#000" onClick={handleCloseyc} 
            style={{ cursor: 'pointer' }}/>
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
                          gap: "5px", // Add gap between icon and text
                        }}
                      >
                        Aadhar Number

                        <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                      </Form.Label>
   
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Enter Aadhar Number"
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
                        value={aadhaarNo}
                        onChange={(e) =>{handleAadharNumber(e)}}
                      />
                    </Form.Group>
                    {/* {aadhaarErr && <p style={{ color: 'red',fontSize:12,fontFamily:"Gilroy",fontWeight:500 }}>{aadhaarErr}</p>} */}
                     {aadhaarErr && (
                                <div className="d-flex align-items-center p-1 mt-6">
                                  <MdError style={{ color: "red", marginRight: "5px", }} />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                     
                                    }}
                                  >
                                    {aadhaarErr}
                                  </label>
                                </div>
                              )}
                  </div>




                  {
                    refId &&

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
                          {otp.map((value, index) => (
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
                              value={value}
                              onChange={(e) => {
                                const newOtp = [...otp];
                                newOtp[index] = e.target.value;
                                setOtp(newOtp);
                                if (e.target.value && index < otp.length - 1) {
                                  e.target.nextSibling.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === "Backspace") {
                                  if (otp[index]) {
                                    const newOtp = [...otp];
                                    newOtp[index] = "";
                                    setOtp(newOtp);
                                  } else if (index > 0) {
                                    e.target.previousSibling.focus();
                                  }
                                }
                              }}
                            />
                          ))}
                        </div>
                        {/* otpErr */}
                        {otpErr && <p style={{ color: 'red' }}>{otpErr}</p>}
                      </Form.Group>

                    </div>
                  }


                </div>

                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 600,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 14,
                    fontFamily: "Montserrat",
                  }}
                  onClick={handleSubmit}
                  // onClick={refId ? handleSubmit : handleValidate}
                >
                  submit
                </Button>
              </div>
              {/* )} */}
            </div>
          </Modal.Body>

       
      </Modal>
    </div>
  )
}
UserListKyc.propTypes = {
  kycuserDetails: PropTypes.func.isRequired,
  kycdetailsForm: PropTypes.func.isRequired,
  setKycDetailForm: PropTypes.func.isRequired,
};
export default UserListKyc;
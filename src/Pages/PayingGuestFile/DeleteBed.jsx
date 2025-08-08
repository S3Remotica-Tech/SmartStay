/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Nav from 'react-bootstrap/Nav';
import AddCustomer from './AddCustomerPG';
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import { DatePicker } from "antd";
import {  Form } from "react-bootstrap";
import dayjs from "dayjs";
import moment from "moment";



function DeleteBed({ show, handleClose, deleteBedDetails }) {


  const state = useSelector(state => state)
  const dispatch = useDispatch();

  const [actionType, setActionType] = useState('addCustomer');
  const [showAddCustomer, setShowAddCustomer] = useState(false)
  const [rolePermission, setRolePermission] = useState("");
  const [customerAddPermission, setCustomerAddPermission] = useState("")
  const [customerDeletePermission, setCustomerDeletePermission] = useState("")
   const [advanceForm,setAdvanceForm] = useState(false)
   const [user_details , setUserDetails] = useState('')
  const { bed, room } = deleteBedDetails




  const [advanceDate, setAdvanceDate] = useState(null);
    const [advanceDueDate, setAdvanceDueDate] = useState(null);
    const [advanceDateError, setAdvanceDateError] = useState("");
    const [advanceDueDateError, setAdvanceDueDateError] = useState("");  


  useEffect(() => {
    setRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);


  useEffect(() => {
    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[4]?.per_create === 1
    ) {
      setCustomerAddPermission("");
    } else {
      setCustomerAddPermission("Permission Denied");
    }
  }, [rolePermission]);

  useEffect(() => {
    if (
      rolePermission[0]?.is_owner === 1 ||
      rolePermission[0]?.role_permissions[4]?.per_delete === 1
    ) {
      setCustomerDeletePermission("");
    } else {
      setCustomerDeletePermission("Permission Denied");
    }
  }, [rolePermission]);


  const handleAddCustomer = () => {
    setShowAddCustomer(true);
  };




  const handleDeleteBed = () => {

    if (deleteBedDetails.room.Hostel_Id && deleteBedDetails.room.Floor_Id && deleteBedDetails.room.Room_Id && deleteBedDetails.bed.bed_no) {
      dispatch({ type: 'DELETEBED', payload: { hostelId: room.Hostel_Id, floorId: room.Floor_Id, roomNo: room.Room_Id, bed_id: bed.bed_no } })

    }


  }


  const handleshowAdvanceForm = (data) => {
   setUserDetails(data)
  } 

   const handleCloseAdvanceForm =()=>{
setAdvanceForm(false)
  }

  useEffect(()=> {
     if(user_details){
         setAdvanceForm(true)

     }
  },[user_details])

  

  const handleShow = (type) => {
    setActionType(type);   
  };


  const handleSaveCustomer = () => {
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
 
  
   const joining = moment(user_details.joining_date);
const invoice = moment(advanceDate);
const due = moment(advanceDueDate);

if (invoice.isBefore(joining, 'day')) {
  setAdvanceDateError("Before joining date not allowed");
  hasError = true;
}

if (due.isBefore(invoice, 'day')) {
  setAdvanceDueDateError("Due date cannot be before invoice date");
  hasError = true;
}
   
  
    const filterData_Hostel_Name = state.UsersList?.hostelListNewDetails?.data?.filter(view => view.id === user_details.Hostel_Id);
  
    let hasError = false;
  
    if (!advanceDate) {
      setAdvanceDateError("Please Select Invoice Date");
      hasError = true;
    } else {
      setAdvanceDateError("");
    }
  
    if (!advanceDueDate) {
      setAdvanceDueDateError("Please Select Due Date");
      hasError = true;
    } else {
      setAdvanceDueDateError("");
    }
  
    
  
    if (!filterData_Hostel_Name || filterData_Hostel_Name.length === 0) {
     
      hasError = true;
    }
  
    if (hasError) {
      return;
    }
    const incrementDateAndFormat = (date) => {
    return moment(date).add(1, "day").format("YYYY-MM-DD");
  };
  
    const mobileNumber = `${user_details.countryCode}${user_details.phone}`;
    const formattedSelectedDate = incrementDateAndFormat(user_details.joining_date);
    const formattedAdvanceDate = incrementDateAndFormat(advanceDate);
    const formattedAdvanceDateDue = incrementDateAndFormat(advanceDueDate);

   
  
    dispatch({
      type: "ADDUSER",
      payload: {
        profile: user_details.profile,
        firstname: user_details.firstname.trim(),
        lastname: user_details.lastname.trim(),
        Phone: mobileNumber,
        Email: user_details.Email,
        hostel_Id: user_details.Hostel_Id,
        Floor: user_details.Floor,
        Rooms: user_details.Rooms,
        Bed: user_details.Bed,
        Address: user_details.Address,
        area: user_details.area,
        landmark: user_details.landmark,
        city: user_details.city,
        pincode:user_details.pincode,
        state: user_details.state,
        HostelName: filterData_Hostel_Name[0]?.Name,
        AdvanceAmount: user_details.AdvanceAmount,
        RoomRent: user_details.RoomRent,
        joining_date: formattedSelectedDate,
        isadvance: 1,
        invoice_date: formattedAdvanceDate,
        due_date: formattedAdvanceDateDue,
        reasons:user_details.reasons
      },
    });
  };

  const handleCancelCustomer =()=>{


     const filterData_Hostel_Name = state.UsersList?.hostelListNewDetails?.data?.filter(view => view.id === user_details.Hostel_Id);
       const incrementDateAndFormat = (date) => {
    return moment(date).add(1, "day").format("YYYY-MM-DD");
  };
  
    const mobileNumber = `${user_details.countryCode}${user_details.phone}`;
    const formattedSelectedDate = incrementDateAndFormat(user_details.joining_date);
    
   
  
    dispatch({
      type: "ADDUSER",
      payload: {
        profile: user_details.profile,
        firstname: user_details.firstname.trim(),
        lastname: user_details.lastname.trim(),
        Phone: mobileNumber,
        Email: user_details.Email,
        hostel_Id: user_details.Hostel_Id,
        Floor: user_details.Floor,
        Rooms: user_details.Rooms,
        Bed: user_details.Bed,
        Address: user_details.Address,
        area: user_details.area,
        landmark: user_details.landmark,
        city: user_details.city,
        pincode:user_details.pincode,
        state: user_details.state,
        HostelName: filterData_Hostel_Name[0]?.Name,
        AdvanceAmount: user_details.AdvanceAmount,
        RoomRent: user_details.RoomRent,
        joining_date: formattedSelectedDate,
        isadvance: 0,
        reasons:user_details.reasons
      },
    });
  }
 

  useEffect(() => {
    if (state.PgList?.deleteBedError) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_BED_ERROR' });
      }, 3000);
    }
  }, [state.PgList?.deleteBedError]);


  useEffect(() => {
    if (state.PgList.statusCodeDeleteBed === 200) {
      handleClose()

    }

  }, [state.PgList.statusCodeDeleteBed])

  return (
    <div>



      <Modal show={show} onHide={handleClose} centered backdrop="static">
        <div>
          <Nav fill variant="tabs">
            {/* <Nav.Item onClick={() => handleShow('addCustomer')}>
              <Nav.Link style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy", borderColor: '#e0ecff', borderTopRightRadius: '0px', color: actionType === 'addCustomer' ? "black" : "black", backgroundColor: actionType === 'addCustomer' ? "#e0ecff" : "#FFF" }}>Add Customer</Nav.Link>
            </Nav.Item> */}
            <Nav.Item onClick={() => handleShow('deleteBed')}>
              <Nav.Link style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy", borderColor: '#e0ecff', borderTopLeftRadius: '0px', color: actionType === 'deleteBed' ? "black" : "black", backgroundColor: actionType === 'deleteBed' ? "#e0ecff" : "#FFF" }}>Delete Bed ?</Nav.Link>
            </Nav.Item>

          </Nav>
        </div>



        {state.PgList?.deleteBedError && (
          <div className="d-flex align-items-center p-1 mb-2">
            <MdError style={{ color: "red", marginRight: '5px' }} />
            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
              {state.PgList?.deleteBedError}
            </label>
          </div>
        )}


        <Modal.Body
          style={{
            fontSize: 16,
            fontWeight: 600,
            fontFamily: "Gilroy",
            textAlign: "center",
            paddingTop: 20,
            paddingBottom: 10,
          }}
        > 
        Are you sure you want to delete the bed?
         
             {/* {`Are you sure you want to delete the bed ${deleteBedDetails.bed.bed_no}?`} */}
        </Modal.Body>



        <Modal.Footer className='d-flex justify-content-center mb-2' style={{ border: "none" }}>
          <Button onClick={handleClose} style={{ width: 130, height: 52, borderRadius: 8, padding: "16px, 45px, 16px, 45px", border: "1px solid #1E45E1", backgroundColor: "#FFF", color: "#1E45E1", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
            Cancel
          </Button>

          {/* {actionType === 'addCustomer' && (
            <Button style={{ width: 130, height: 52, borderRadius: 8, border: "1px solid #1E45E1", backgroundColor: "#1E45E1", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
              disabled={customerAddPermission} onClick={handleAddCustomer}
            >
              Add Customer
            </Button>
          )} */}
          
            <Button style={{ width: 130, height: 52, borderRadius: 8, border: "1px solid #1E45E1", backgroundColor: "#1E45E1", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
              disabled={customerDeletePermission} onClick={handleDeleteBed}>
              Delete
            </Button>
        

        </Modal.Footer>
      </Modal>

<Modal
            show={advanceForm}
            onHide={handleCloseAdvanceForm}
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
              
                    <Modal.Header style={{ position: "relative" }}>
                      <div
                        style={{
                          fontSize: 20,
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Generate Advance
                      </div>
    
                      <CloseCircle
                        size="24"
                        color="#000"
                        onClick={handleCloseAdvanceForm}
                        style={{ cursor: "pointer" }}
                      />
                    </Modal.Header>
              <Modal.Body style={{ paddingTop:2 }}>
                <div className="d-flex align-items-center">
                  <div className="container">
                   
    
    
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
                            Invoice Date{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </Form.Label>
    
                          <div
                            className="datepicker-wrapper"
                            style={{ position: "relative", width: "100%" }}
                          >
                            <DatePicker
                              style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy"
                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={advanceDate ? dayjs(advanceDate) : null}
                              onChange={(date) => {
                                setAdvanceDateError("");
                                setAdvanceDate(date ? date.toDate() : null);
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".datepicker-wrapper")
                              }
                              dropdownClassName="custom-datepicker-popup"
                               disabledDate={(current) => current && current > dayjs().endOf("day")}
                            />
                          </div>
                        </Form.Group>
                        {advanceDateError && (
                          <div style={{ color: "red", marginTop: "-7px" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {advanceDateError}
                            </span>
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
                            Due Date{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </Form.Label>
    
                          <div
                            className="datepicker-wrapper"
                            style={{ position: "relative", width: "100%" }}
                          >
                            <DatePicker
                              style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy"
                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={advanceDueDate ? dayjs(advanceDueDate) : null}
                              onChange={(date) => {
                                setAdvanceDueDateError("");
                                setAdvanceDueDate(date ? date.toDate() : null);
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".datepicker-wrapper")
                              }
                              dropdownClassName="custom-datepicker-popup"
                            />
                          </div>
                        </Form.Group>
                        {advanceDueDateError && (
                          <div style={{ color: "red", marginTop: "-7px" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {advanceDueDateError}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
    
                    <div className="row col-md-12 col-lg-12">
                      <div className="col-md-6 col-lg-6">
                        <Button
                          variant="secondary"
                          className="w-100"
                          style={{
                            height: 45,
                            borderRadius: 12,
                            fontSize: 15,
                            fontWeight: 500,
                            fontFamily: "Montserrat",
                            paddingLeft: 20,
                            paddingRight: 20,
                          }}
                        onClick={handleCancelCustomer}
                        >
                          Cancel
                        </Button>
                      </div>
    
                      <div className="col-md-6 col-lg-6 mb-2">
                        <Button
                          variant="primary"
                          className="w-100"
                          style={{
                            backgroundColor: "#1E45E1",
                            height: 45,
                            borderRadius: 12,
                            fontSize: 15,
                            fontWeight: 600,
                            fontFamily: "Montserrat",
                            paddingLeft: 25,
                            paddingRight: 25,
                          }}
                          onClick={handleSaveCustomer}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
    
                </div>
              </Modal.Body>
             
    
             
            </Modal.Dialog>
          </Modal>

{showAddCustomer && (
  <AddCustomer
    show={showAddCustomer}
    setShowAddCustomer={setShowAddCustomer}
    currentItem={deleteBedDetails}
    advanceForm={advanceForm}
    setAdvanceForm={setAdvanceForm} 
   onclickdata = {handleshowAdvanceForm}
  />
)}
     
    </div>
  )
}
DeleteBed.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteBedDetails: PropTypes.func.isRequired
}
export default DeleteBed;

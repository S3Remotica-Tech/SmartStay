/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form  } from "react-bootstrap";
import { CloseCircle } from "iconsax-react";
import Profile2 from "../Assets/Images/New_images/profile-picture.png";
import homearrow from "../Assets/Images/New_images/home-arrow-up.png";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types"


function WriteOffForm(props){
   const state = useSelector((state) => state);
    const dispatch = useDispatch();
  console.log("wraitofDetails",props.wraitofDetails)

const [matchedDet,setMatchedDetails] = useState("")
const [comments,setComments] = useState("")
const [payableAmount, setPayableAmount] = useState("");
 const [selectedDate, setSelectedDate] = useState(null);

     const [modeOfPayment, setModeOfPayment] = useState("");
console.log("payableAmount",payableAmount)
const handleCommentsChange = (e)=>{
  setComments(e.target.value)
}

useEffect(()=>{
  if(props.WriteoffForm || props.payapleform){
const matchedDetails = state.UsersList.Users?.filter(
  (user) => user.ID === props.wraitofDetails.ID
);
setMatchedDetails(matchedDetails)
console.log("matchedDetails",matchedDetails)


  }
},[props.WriteoffForm ,props.payapleform])
 const [balance, setBalance] = useState(0);
  useEffect(() => {
    
   console.log("BANKINGLIST")
        if (state.login.selectedHostel_Id &&props.payapleform) {
            dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
        }
    }, [state.login.selectedHostel_Id && props.payapleform]);

  // const handleAmount = (e) => {
  //   let value = e.target.value;

    
   

  //   setPayableAmount(value);
  
  // };
 const handleAmount = (e) => {
  let value = e.target.value;
  setPayableAmount(value);

  let balanceDue = props.wraitofDetails.BalanceDue || 0;

  
  let newBalance = balanceDue + Number(value || 0);


  setBalance(Math.abs(newBalance));
};
 const handleModeOfPaymentChange = (selectedOption) => {
    if (!selectedOption) return;

    setModeOfPayment(selectedOption);
    // setPaymentError("")
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };
   // if (value !== "") {
    //   let numValue = Number(value);
    //   if (numValue > (props.wraitofDetails.BalanceDue || 0)) {
    //     numValue = props.wraitofDetails.BalanceDue || 0;
    //   }
      
    //   value = numValue;
    //   setBalance((props.wraitofDetails.BalanceDue || 0) - numValue);
    // } else {

    //   setBalance(props.wraitofDetails.BalanceDue || 0);
    // }


const handleSaveWriteOff=()=>{


const payload ={
       formal_checkout: 1,
      reason_note:comments,
      id :props.wraitofDetails.ID,
      hostel_id:props.wraitofDetails.Hostel_Id
  }
  dispatch({
      type: "CONFIRMCHECKOUTDUECUSTOMER",
      payload: payload
    });
}





const handleSaveRefund=()=>{
console.log("payableAmount",payableAmount)
    dispatch({
      type: "REFUNDABLEDETAILS",
      ID: props.wraitofDetails.ID,                 
  invoice_id:props.wraitofDetails.Invoices,  
  amount:  Number(payableAmount),             
  balance_due: balance,        
  payment_by: modeOfPayment,            
  payment_date: selectedDate
    });
}

  useEffect(() => {
        if (state.UsersList.statusCodeForDueCustomer === 200 ) {
          props.handleCloseWriteOffForm()
            dispatch({
                      type: "USERLIST",
                      payload: { hostel_id: state.login.selectedHostel_Id },
                    })
                    //  dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: dataBed[0]?.Floor, hostel_Id: state.login.selectedHostel_Id } })
            setTimeout(() => {
                dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
            }, 500);
        }

    }, [state.UsersList.statusCodeForDueCustomer])


console.log("matchedDet",matchedDet)

    return(
        <>
       <Modal show={props.WriteoffForm} onHide={props.handleCloseWriteOffForm} centered >
     
     <Modal.Header
  style={{ marginBottom: "10px", position: "relative", borderBottom: "none" }}
>
  <div style={{ display: "flex", flexDirection: "column" }}>
    <div
      style={{
        fontSize: 20,
        fontWeight: 600,
        fontFamily: "Gilroy",
      }}
    >
      Write-off
    </div>

    {/* Subtext description */}
    <div
      style={{
        fontSize: 12,
        fontWeight: 400,
        color: "#555",
        marginTop: 2,
        fontFamily: "Gilroy",
      }}
    >
      Use when tenant has absconded and all pending dues must be written off.
    </div>
  </div>

  <CloseCircle
    size="24"
    color="#000"
    onClick={props.handleCloseWriteOffForm}
    style={{ cursor: "pointer",marginTop:"-10px" }}
  />
</Modal.Header>

      <Modal.Body>
       
     
        <div className="d-flex align-items-center " style={{marginTop:"-30px"}}>
           <img
//    src={
//   data?.user_profile && data?.user_profile !== "0"
//     ? data?.user_profile
//     : dataBed[0]?.profile && dataBed[0]?.profile !== "0"
//     ? dataBed[0].profile
//     : Profile2
// }
// src={Profile2}
  src={matchedDet?.[0]?.profile && matchedDet?.[0]?.profile !== "0"
  ? matchedDet[0].profile
  : Profile2
}

    style={{ height: 55, width: 55, cursor: "pointer" }}
    alt="profile"
    className="rounded-circle me-3"
  />
         <div>
      <p style={{fontSize:"1.25rem",fontFamily:"Gilroy",fontWeight:600}} className="mb-0">
        {/* {data?.Name || dataBed[0]?.Name} */}{matchedDet[0]?.Name}
        </p>
  <div className="d-flex mb-2">
    <span className="badge rounded-pill bg-warning text-dark me-2" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
      {/* {hostelData.floor_name} */}{matchedDet[0]?.floor_name}
    </span>
    <span className="badge rounded-pill bg-danger-subtle text-dark" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
      {/* {hostelData["Room Name"]} - {hostelData["Bed Name"]} */} {matchedDet[0]?.Rooms} - {matchedDet[0]?.Bed}
    </span>
  </div>
  </div>
          <div className="ms-auto text-end mt-2">
            <p   style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,padding:0 , margin:0,color:"blue"}}><img src={homearrow} alt="homearrow" width={16} height={16}/> Due Pending</p>
            <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600,}}>
                {/* {checkOutDate} */}{props?.wraitofDetails?.BalanceDue}
                </p>
          </div>
        </div>

       
   

<>
     
                                    </>
                                
                                    <Form.Group >
          <Form.Label style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400}}>Reason/Write-off Note</Form.Label>
          <Form.Control
          style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,height:52}}
            as="textarea"
            placeholder="Please Enter Comments"
            rows={3}
            value={comments}
          onChange={handleCommentsChange}
          />
        </Form.Group>
      

      </Modal.Body>
      <Modal.Footer style={{borderTop:"none",marginTop:"-10px"}}>
        <Button style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:400}} className="btn btn-light"
        //  onClick={handleClose}
         >
          Cancel
        </Button>
        <Button style={{fontFamily:"Gilroy",fontSize:"1rem",fontWeight:400}} variant="primary" onClick={handleSaveWriteOff}>Conform</Button>
      </Modal.Footer>
    </Modal>






        <Modal
                              show={props.payapleform}
                              onHide={props.handleCloseRefundAmount}
                              backdrop="static"
                              centered
                              // dialogClassName="custom-modals-record-payment-style"
    
                            >
                              <Modal.Dialog
    
                                className="m-0 p-0"
                              >
    
    
    
                                <Modal.Header
                                  style={{ paddingTop: 10, position: "relative" }}
                                >
                                  <div
                                    style={{
                                      fontSize: 18,
                                      fontWeight: 600,
                                      fontFamily: "Gilroy", textAlign: "start",
    
                                    }}
                                  >
                                    {`Refund Amount `}
                                    {/* {invoiceValue?.Name && (
                                      <span>
                                        -
                                        <span style={{ color: "#1E45E1" }}>
                                          {" "}
                                          {invoiceValue.Name}
                                        </span>{" "}
                                      </span>
                                    )} */}
                                    {/* {invoiceValue?.Invoices && (
                                      <span>
                                        -
                                        <span style={{ color: "#1E45E1" }}>
                                          {" "}
                                          {invoiceValue.Invoices}
                                        </span>{" "}
                                      </span>
                                    )} */}
                                  </div>
    
                                  <CloseCircle size="24" color="#000" onClick={props.handleCloseRefundAmount}
                                    style={{ cursor: 'pointer' }} />
                                </Modal.Header>
    
    
                               
    
                                <Modal.Body>
                                  <>
                                     <div className="d-flex align-items-center " >
                                           <img
                                //    src={
                                //   matchedDet && matchedDet[0]?.profile !== "0"
                                //     ? matchedDet[0]?.profile
                                //     : matchedDet[0]?.profile && matchedDet[0]?.profile !== "0"
                                //     ? matchedDet[0]?.profile
                                //     : Profile
                                // }
    //                             src={matchedDet?.[0]?.profile && matchedDet?.[0]?.profile !== "0"
    //   ? matchedDet[0].profile
    //   : Profile
    // }
     src={matchedDet?.[0]?.profile && matchedDet?.[0]?.profile !== "0"
  ? matchedDet[0].profile
  : Profile2
}
    
                                    style={{ height: 55, width: 55, cursor: "pointer" }}
                                    alt="profile"
                                    className="rounded-circle me-3"
                                  />
                                  {/* <img src={Profile}  style={{ height: 55, width: 55, cursor: "pointer" }}
                                    alt="profile"
                                    className="rounded-circle me-3"/> */}
                                         <div>
                                      <p style={{fontSize:"1.25rem",fontFamily:"Gilroy",fontWeight:600}} className="mb-0"> 
                                        {/* {invoiceValue.Name} */}
                                        {matchedDet[0]?.Name}
                                        </p>
                                  <div className="d-flex mb-2">
                                    <span className="badge rounded-pill bg-warning text-dark me-2" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
                                   {matchedDet[0]?.floor_name}
                                    </span>
                                    <span className="badge rounded-pill bg-danger-subtle text-dark" style={{fontSize:"0.75rem",fontFamily:"Gilroy",fontWeight:400}}>
                                      {/* {hostelData["Room Name"]} - {hostelData["Bed Name"]} */}
                                     {matchedDet[0]?.Room_Id} - {matchedDet[0]?.Bed}
                                  
                                    </span>
                                  </div>
                                  </div>
                                          <div className="ms-auto text-end mt-2">
                                            <p   style={{fontSize:14,fontFamily:"Gilroy",fontWeight:400,color:"#4B4B4B",padding:0 , margin:0}}>Refund Amount</p>
                                            <p style={{fontSize:16,fontFamily:"Gilroy",fontWeight:600,}}>
                                              {/* {checkOutDate} */} 
                                              {props?.wraitofDetails?.BalanceDue}
                                              </p>
                                          </div>
                                        </div>
                                  <div className="row">
                                    {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      <Form.Group
    
                                        controlId="exampleForm.ControlInput1"
                                      >
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Due Amount
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
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
                                          placeholder="Enter Amount"
                                          value={invoiceList.balanceDue}
                                          disabled
                                        />
                                      </Form.Group>
                                    </div> */}
    
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      <Form.Group
    
                                        controlId="exampleForm.ControlInput3"
                                      >
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            marginBottom: 2
    
    
                                          }}
                                        >
                                          Refund Amount {" "}
                                          <span
                                            style={{
                                              color: "red",
                                              fontSize: "20px",
                                            }}
                                          >
                                            *
                                          </span>
                                        </Form.Label>
    
                                        <Form.Control
                                          type="number"
                                          min="0"
                                          step="1"
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
                                          placeholder="Enter Amount"
                                          className="no-spinner"
                                          value={payableAmount}
                                          onChange={handleAmount}
                                       onKeyDown={(e) => {
        if (e.key === "-" || e.key === "e") {
          e.preventDefault();
        }
      }}
                                        />
    
    
    
                                        {/* {amounterrormsg.trim() !== "" && ( */}
                                          <div>
                                            <p
                                              style={{
                                                marginBottom: 0,
                                                fontSize: "12px",
                                                color: "red",
                                                marginTop: "3px",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                              }}
                                            >
                                              {/* {amounterrormsg !== " " && (
                                                <MdError
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "red",
                                                    marginBottom: "3px",
                                                  }}
                                                />
                                              )}{" "}
                                              {amounterrormsg} */}
                                            </p>
                                          </div>
                                        {/* )} */}
                                      </Form.Group>
                                    </div>
    
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      <Form.Group
    
                                        controlId="exampleForm.ControlInput3"
                                      >
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            marginBottom: 2
    
    
                                          }}
                                        >
                                          Balance Due {" "}
                                          <span
                                            style={{
                                              color: "red",
                                              fontSize: "20px",
                                            }}
                                          >
                                            *
                                          </span>
                                        </Form.Label>
    
                                        <Form.Control
                                          disabled
                                          type="number"
                                          min="0"
                                          step="1"
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
                                          placeholder="Enter Amount"
                                          className="no-spinner"
                                          value={balance}
    
                                        />
    
    
    
    
                                      </Form.Group>
                                    </div>
    
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      <Form.Group
                                        controlId="purchaseDate"
                                      >
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Refund Date {" "}
                                          <span
                                            style={{
                                              color: "red",
                                              fontSize: "20px",
                                            }}
                                          >
                                            *
                                          </span>
                                        </Form.Label>
                                        <div
                                          style={{
                                            position: "relative",
                                            width: "100%",
                                          }}
                                        >
    
                                          <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
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
                                                // setDateErrmsg("");
                                                // setAccountError("");
                                                setSelectedDate(date ? date.toDate() : null);
                                              }}
                                              disabledDate={(current) => current && current > dayjs().endOf("day")}
                                              getPopupContainer={(triggerNode) =>
                                                triggerNode.closest(".show-scroll") || document.body
                                              }
                                            />
    
    
                                          </div>
                                        </div>
                                        {/* {dateerrmsg.trim() !== "" && ( */}
                                          <div>
                                            <p
                                              style={{
                                                fontSize: "12px",
                                                color: "red",
                                                marginTop: "3px",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                marginBottom: 0,
                                              }}
                                            >
                                              {/* {dateerrmsg !== "" && (
                                                <MdError
                                                  style={{
                                                    fontSize: "14px",
                                                    color: "red",
                                                    marginBottom: "2px",
                                                  }}
                                                />
                                              )} {" "}
                                              {dateerrmsg} */}
                                            </p>
                                          </div>
                                        {/* )} */}
                                      </Form.Group>
    
    
    
    
                                    </div>
    
    
    
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                                 options={
                                   Array.isArray(state.bankingDetails?.bankingList?.banks)
                                     ? state.bankingDetails.bankingList.banks.map((item) => {
                                       let label = "";
                                       if (item.type === "bank") label = "Bank";
                                       else if (item.type === "upi") label = "UPI";
                                       else if (item.type === "card") label = "Card";
                                       else if (item.type === "cash") label = "Cash";
             
                                       return {
                                         value: item.id,
                                         label: `${item.benificiary_name} - ${label}`,
                                       };
                                     })
                                     : []
                                 }
                                 onChange={(selectedOption) =>
                                   handleModeOfPaymentChange(selectedOption?.value)
                                 }
                                 value={
                                   modeOfPayment
                                     ? (() => {
                                       const selected = state.bankingDetails?.bankingList?.banks.find(
                                         (item) => item.id === modeOfPayment
             
                                       );
                                       if (!selected) return null;
             
                                       const labelMap = {
                                         bank: "Bank",
                                         upi: "UPI",
                                         card: "Card",
                                         cash: "Cash",
                                       };
                                       return {
                                         value: selected.id,
                                         label: `${selected.benificiary_name} - ${labelMap[selected.type]}`,
                                       };
                                     })()
                                     : null
                                 }
             
                                 placeholder="Select Payment"
                                 classNamePrefix="custom"
                                //  isDisabled={currentItem}
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
                                 noOptionsMessage={() => "No mode available"}
                               />
             
                             </Form.Group>
                           
                              {/* {paymentError && (
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
                    {paymentError}
                  </span>
                </div>
              )} */}
                           </div>
    
    
                                     <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <Form.Group
    
                                        controlId="exampleForm.ControlInput1"
                                      >
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Transaction ID
                                        </Form.Label>
                                        <Form.Control
                                          type="text"
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
                                          placeholder="Enter Transaction ID"
                                          // value={invoiceList.balanceDue}
                                          // disabled
                                        />
                                      </Form.Group>
                                    </div>
    
    
                                 
                                    
                                    {/* )} */}
    
                                  </div>
                                  </>
                                  {/* {totalErrormsg.trim() !== "" && (
                                    <div>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                          marginTop: "3px",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {totalErrormsg !== " " && (
                                          <MdError
                                            style={{
                                              fontSize: "14px",
                                              color: "red",
    
                                            }}
                                          />
                                        )}{" "}
                                        {totalErrormsg}
                                      </p>
                                    </div>
                                   
                                  )} */}
                                </Modal.Body>
    
                                {/* {state.createAccount?.networkError ?
                                  <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                                    <MdError style={{ color: "red", marginRight: '5px', fontSize: 14 }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                                  </div>
                                  : null}
                                {payableamountError ?
                                  <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                                    <MdError style={{ color: "red", marginRight: '5px', fontSize: 14 }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{payableamountError}</label>
                                  </div>
                                  : null} */}
    
{/*     
                                {formRecordLoading && <div
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
                                </div>} */}
    
    
    
                                <Modal.Footer style={{ border: "none" }}>
                                  {/* <Button
                                    className="w-100"
                                    style={{
                                      backgroundColor: "#1E45E1",
                                      fontWeight: 600,
                                      height: 50,
                                      borderRadius: 12,
                                      fontSize: 16,
                                      fontFamily: "Montserrat, sans-serif",
                                    }}
                                    onClick={handleSaveInvoiceList}
                                  >
                                    Record payment
                                  </Button> */}
    
    
                                     <div className="text-end mt-4">
                                                                      <Button variant="" className="me-2" onClick={props.handleCloseRefundAmount} style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }}>
                                                                          Cancel
                                                                      </Button>
                                                                      <Button
                                                                          // disabled={activeTab !== "writeoff" && ReturnAmount < 0}
                                                                          style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400, backgroundColor: "#1E45E1" }} 
                                                                          onClick={handleSaveRefund}
                                                                          >Record</Button>
                                                                  </div>
                                </Modal.Footer>
                              </Modal.Dialog>
                            </Modal>
        </>
    )
}
WriteOffForm.propTypes = {
  WriteoffForm: PropTypes.func.isRequired,
  wraitofDetails:PropTypes.func.isRequired,
  handleCloseRefundAmount:PropTypes.func.isRequired,
  payapleform:PropTypes.func.isRequired,
  handleCloseWriteOffForm:PropTypes.func.isRequired,
 
};

export default WriteOffForm;
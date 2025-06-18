/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState ,useEffect, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Invoices.css";
import {Button } from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import 'flatpickr/dist/themes/material_blue.css';
import { MdError } from "react-icons/md";
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const AddReceiptForm = (props) => {


      const state = useSelector(state => state)
      const dispatch = useDispatch()
     
      const [customerinvoicefilter , setCustomerInvoiceFilter] = useState([])

      const [customername , setCustomerName] =  useState ('');
      const [reference_id , setReferenceId] =  useState ('')
      const [invoicenumber , setInvoiceNumber] =  useState ('')
      const [due_amount , setDueAmount] =  useState ('')
      const [initial_due_amount , setInitial_DueAmount] =  useState ('')
      const [received_amount , setReceivedAmount] =  useState ('')
      const [payment_date , setPaymentDate] =  useState (null);
      const [notes , setNotes] =  useState ('')
        const [modeOfPayment, setModeOfPayment] = useState("");
        const [account, setAccount] = useState("")


      const [formatpaymentdate, setFormatPaymentDate] = useState(null)
      const [customererrmsg , setCustomerErrmsg] = useState('')
      const [invoicenumbererrmsg , setInvoicenumberErrmsg] = useState('')
      const [receivedamounterrmsg , setReceivedAmountErrmsg] = useState('')
      const [payment_dateerrmsg , setPaymentDateErrmsg] = useState('')
      const [notes_errmsg , setNotes_Errmsg] = useState('')
        const [paymentError, setPaymentError] = useState("");
      
      const [allfielderrmsg , setAllFieldErrmsg] = useState('')


      const receiptRef = useRef(null);
      
      const [edit_Id , setEdit_Id] = useState(null)
      const [edit, setEdit] = useState(false)
    
    
     useEffect(() => {
        if (props.editvalue && props.receiptedit) {
          setEdit(true)
          setEdit_Id(props.editvalue.user_id)
          setCustomerName(props.editvalue.user_id);
          setInvoiceNumber(props.editvalue.invoice_number || '');
    
          if (props.editvalue.payment_date) {
            const parsedDate = new Date(props.editvalue.payment_date); 
            if (!isNaN(parsedDate.getTime())) {
              setPaymentDate(parsedDate); 
              const formattedDate = formatDateForReceipt(parsedDate);
          setFormatPaymentDate(formattedDate)
            } 
           
          }

          
    
          setReferenceId(props.editvalue.reference_id || '');
          setDueAmount(props.editvalue.BalanceDue || 0);
          setInitial_DueAmount(props.editvalue.BalanceDue)
          setReceivedAmount(props.editvalue.amount_received || '')
          setAccount(props.editvalue.bank_id || '') ;
          setModeOfPayment(props.editvalue.payment_mode || '') 
          setNotes(props.editvalue.notes? props.editvalue.notes : '');
        }
      }, [props.editvalue , props.receiptedit]);
   
    
     
     
   
    
      const handleCustomerName = (selectedOption) => {
        if (!selectedOption) {
          setCustomerErrmsg("Please Select Name");
          return;
        }
      
        const Value = selectedOption.value;  
        setCustomerName(Value);
        setAllFieldErrmsg("");
        setDueAmount(0);
      
        const CustomerinvoicedetailsFilter =
          state?.InvoiceList?.ManualInvoices?.length > 0
            ? state.InvoiceList.ManualInvoices.filter(
                (u) => String(u.hos_user_id) === String(Value) && u.BalanceDue > 0
              )
            : [];
      
        setCustomerInvoiceFilter(CustomerinvoicedetailsFilter);
      
        if (CustomerinvoicedetailsFilter.length > 0 && CustomerinvoicedetailsFilter[0]?.BalanceDue === 0) {
          setInvoicenumberErrmsg("This customer has no due amounts");
        } else {
          setInvoicenumberErrmsg("");
        }
      
    
      
        if (!Value) {
          setCustomerErrmsg("Please Select Name");
        } else {
          setCustomerErrmsg("");
        }
      };
      

   
      
      


      const handleInvoiceNumber = (e) => {
        const selectedValue =(e.target.value);
        
        setInvoiceNumber(selectedValue);
        setAllFieldErrmsg("");
      
        const DueAmountFilter =
          customerinvoicefilter && !edit &&
          customerinvoicefilter.filter((u) => u.Invoices === selectedValue);
          setInitial_DueAmount(DueAmountFilter[0]?.BalanceDue)
        setDueAmount(DueAmountFilter[0]?.BalanceDue);

      
        if (!selectedValue) {
          setInvoicenumberErrmsg("Please Enter Invoice");
        } else {
          setInvoicenumberErrmsg("");
        }
      };


    


const handleReceivedAmount = (e) => {
  const value = e.target.value;

  const validInput = /^[0-9]*\.?[0-9]*$/;
  if (!validInput.test(value)) return;

  setReceivedAmountErrmsg("")

  const receivedValue = parseFloat(value);
  const baseAmount = props.editvalue ? props.editvalue.amount_received : initial_due_amount;

  if (receivedValue > baseAmount) return;

  setReceivedAmount(value);

  if (value === '') {
    setDueAmount(baseAmount);
  } else if (!isNaN(receivedValue)) {
    setDueAmount(baseAmount - receivedValue);
  } else {
    setDueAmount(baseAmount);
  }

  setAllFieldErrmsg("");
};


      

    
      
    
      
      

      
      
      
      
      
  
    

    


      const handleModeOfPaymentChange = (e) => {
        setModeOfPayment(e.target.value);
         setAllFieldErrmsg("")
        if(!e.target.value){
          setPaymentError("Please Select Payment Method")
        }
        else{
          setPaymentError('')
         
        }

      };

    

      const handleNotes = (e) => {
        setNotes(e.target.value)
        setAllFieldErrmsg('')
        if(!e.target.value){
          setNotes_Errmsg("Please Enter Notes")
        }
        else{
            setNotes_Errmsg('')
        }  
      }


      const handleBackBill = () => {
        props.onhandleback()
        setCustomerName('');
        setInvoiceNumber('');
        setReferenceId('')
        setPaymentDate('')
        setReceivedAmount('')     
    
        setNotes('')
   }
 
 
  const formatDateForReceipt = (date) => {
    return dayjs(date).format("YYYY-MM-DD"); 
  };
 
   
 
   const handlePayemntDate = (selectedDates) => {
  
        const date = selectedDates;

        setPaymentDate(date);
        setAllFieldErrmsg('')
        if(!selectedDates){
            setPaymentDateErrmsg("Please select Date")
        }
        else{
            setPaymentDateErrmsg('')
        }
 
        const formattedDate = formatDateForReceipt(date);
        setFormatPaymentDate(formattedDate)
   }
 
 
  


  
   






     const handleCreateReceipt = () => {
    

          if(!customername){
           setCustomerErrmsg('Please Select  Customer')
          }
        
          if(!formatpaymentdate){
            setPaymentDateErrmsg('Please Select  Date')
          }

         
          if (!invoicenumber && props.editvalue.type !== "checkout") {
  setInvoicenumberErrmsg("Please Select Invoice");
  return;
}
          

          if(!received_amount){
            setReceivedAmountErrmsg("Please Enter Amount")
          }

          if(!modeOfPayment || modeOfPayment === "select"){
            setPaymentError("Please Select Payment Method")
            return;
          }

          
          if(!customername && !invoicenumber &&  !formatpaymentdate && !reference_id && !modeOfPayment && !received_amount  ){
           setAllFieldErrmsg('Please Enter All Field')
           return;
          }
          const formatDateToLocal = (date) => {
            if (!date) return ""; 
            const d = new Date(date);
            return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
          };
          
          const isChanged =
          (() => {
            return (
              Number(props.editvalue.user_id) !== Number(customername) ||
              formatDateToLocal(props.editvalue.payment_date) !== formatDateToLocal(formatpaymentdate) || 
              String(props.editvalue.reference_id) !== String(reference_id) ||
              Number(props.editvalue.amount_received) !== Number(received_amount) ||
              String(props.editvalue.invoice_number) !== String(invoicenumber) ||
              String(props.editvalue.payment_mode) !== String(modeOfPayment) ||
              String(props.editvalue.bank_id) !== String(account) ||
              (props.editvalue.notes ? String(props.editvalue.notes) !== String(notes) : notes !== "")
            );
          })();
        
        
        
        
        if (!isChanged) {
          setAllFieldErrmsg("No Changes Detected");
          return;
        }
        

         
          if( !edit && customername && invoicenumber  && formatpaymentdate && reference_id && received_amount && modeOfPayment ){
           dispatch({
             type: 'ADD_RECEIPT',
             payload: { user_id: customername, payment_date: formatpaymentdate , reference_id: reference_id ,
 amount : received_amount , invoice_number: invoicenumber, payment_mode: modeOfPayment ,notes : notes , bank_id: account
           
             }
             });

         
          }

          else if(edit && isChanged && props.editvalue && props.receiptedit && edit_Id && customername && invoicenumber  && formatpaymentdate && reference_id && received_amount && modeOfPayment && account ){
            dispatch({
              type: 'EDIT_RECEIPTS',
              payload: {id:props.editvalue.id, user_id: customername, payment_date: formatpaymentdate ,reference_id: reference_id ,
     amount : received_amount , invoice_number: invoicenumber, payment_mode: modeOfPayment ,notes : notes , bank_id: account
            
              }
              });

              setCustomerName('');
              setInvoiceNumber('');
              setReferenceId('')
              setPaymentDate('')
              setReceivedAmount('')     
              setNotes('')
          }

     
     }

     

    useEffect(()=> {
      dispatch({type: "USERLIST",payload:{hostel_id:state.login.selectedHostel_Id}})
    },[])

    
    
  

      const options = {
        dateFormat: 'd/m/Y',
        defaultDate: null,
        minDate: null,
      };
    
      useEffect(() => {
        if (receiptRef.current) {
            receiptRef.current.flatpickr.set(options);
        }   
    }, [ payment_date ])

     


     useEffect(() => {
        if (state.InvoiceList.ReceiptAddErrorStatuscode === 201) {
    
          setAllFieldErrmsg(state.InvoiceList.ReceiptErrmsg);
          setTimeout(() => {
            dispatch({ type: 'REMOVE_STATUS_ERROR_RECEIPTS_ADD' });
          }, 100);
        }
      }, [state.InvoiceList.ReceiptAddErrorStatuscode]); 
      
  
       
      
     
      useEffect(() => {
        if (state.InvoiceList.ReferenceIdgetsuccessStatuscode === 200) {
    
          setReferenceId(state.InvoiceList.Reference_Id);
          setTimeout(() => {
            dispatch({ type: 'REMOVE_STATUS_CODE_REFERENCEID_GET' });
          }, 100);
        }
      }, [state.InvoiceList.Reference_Id, state.InvoiceList.ReferenceIdgetsuccessStatuscode]); 
            
    
    
    
        
         

         
   

        
    
  

    
 


    return(
        <>
            <div className='container px-5'>

            <div style={{display:'flex',flexDirection:'row',marginTop:'20px'}} >
  <svg onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px', cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg>
  <p className='mt-1'>{edit? "Edit Receipt":"New Receipt"} </p>
  </div>




<div className='col-lg-7 col-md-6 col-sm-12 col-xs-12'>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
  <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}>
    Customer
  </Form.Label>

  
  <Select
  className="show-scroll"
  classNamePrefix="custom"
  menuPlacement="auto"
  options={[...new Map(state?.InvoiceList?.ManualInvoices?.map(u => [u.hos_user_id, {
    value: u.hos_user_id,
    label: u.Name
  }])).values()]} 
  onChange={handleCustomerName}
  value={state?.InvoiceList?.ManualInvoices?.find(u => u.hos_user_id === customername) 
    ? { value: customername, label: state.InvoiceList.ManualInvoices.find(u => u.hos_user_id === customername)?.Name }
    : null
  }
  isDisabled={edit}
  styles={{
    menu: (base) => ({
      ...base,
      maxHeight: "200px",
      overflowY: "auto",
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "200px", 
      overflowY: "auto", 
      scrollbarWidth: "thin",  
      msOverflowStyle: "none",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#555",
      cursor:"pointer"
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer", 
      backgroundColor: state.isFocused ? "lightblue" : "white", 
      color: "#000",
    }),
    control: (base) => ({
      ...base,
      fontSize: 16,
      borderRadius: 8,
      border: "1px solid #D9D9D9",
    }),
  }}
/>



{customererrmsg && (
                  <div className="d-flex align-items-center  mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {customererrmsg}
                    </label>
                  </div>
                )}

 
</Form.Group>



</div>

<div className="row mb-1">
<div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Reference ID</Form.Label>
        <Form.Control
          style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 ,   backgroundColor: "#E7F1FF",}}
          type="text"
          placeholder="Enter Invoice Number"
          value={reference_id || ''} 
          readOnly
        />

  
      </Form.Group>
    </div>

   {!(edit && (!invoicenumber || invoicenumber === "0" || invoicenumber === 0)) && (
  <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
      <Form.Label
        style={{
          fontFamily: "Gilroy",
          fontSize: 14,
          fontWeight: 500,
          color: "#222",
          fontStyle: "normal",
          lineHeight: "normal",
        }}
      >
        Invoice Number
      </Form.Label>

      {edit ? (
        <Form.Control
          type="text"
          value={invoicenumber}
          readOnly
          className="border"
          style={{
            fontSize: 16,
            color: "#4B4B4B",
            fontFamily: "Gilroy",
            lineHeight: "18.83px",
            fontWeight: 500,
            boxShadow: "none",
            border: "1px solid #D9D9D9",
            height: 38,
            borderRadius: 8,
            backgroundColor: "#E7F1FF",
          }}
        />
      ) : (
        <Select
          className="custom-dropdown"
          options={customerinvoicefilter.map((u) => ({
            value: u.Invoices,
            label: u.Invoices,
          }))}
          onChange={(selectedOption) =>
            handleInvoiceNumber({ target: { value: selectedOption?.value } })
          }
          value={
            customerinvoicefilter.find((u) => u.Invoices === invoicenumber)
              ? { value: invoicenumber, label: invoicenumber }
              : null
          }
          isDisabled={edit}
          styles={{
            menu: (base) => ({
              ...base,
              maxHeight: "150px",
              overflowY: "auto",
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: "150px",
              overflowY: "auto",
              scrollbarWidth: "thin",
              msOverflowStyle: "none",
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
            }),
            control: (base) => ({
              ...base,
              fontSize: 16,
              borderRadius: 8,
              border: "1px solid #D9D9D9",
            }),
          }}
        />
      )}

      {invoicenumbererrmsg && (
        <div className="d-flex align-items-center mb-2">
          <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
          <label
            className="mb-0"
            style={{
              color: "red",
              fontSize: "12px",
              fontFamily: "Gilroy",
              fontWeight: 500,
            }}
          >
            {invoicenumbererrmsg}
          </label>
        </div>
      )}
    </Form.Group>
  </div>
)}

    



    </div>

<div className="row mb-1">



    {!(edit && (!invoicenumber || invoicenumber === "0" || invoicenumber === 0)) && (
  <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
    <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
      <Form.Label
        style={{
          fontFamily: 'Gilroy',
          fontSize: 14,
          fontWeight: 500,
          color: "#222",
          fontStyle: 'normal',
          lineHeight: 'normal',
        }}
      >
        Due Amount
      </Form.Label>
      <Form.Control
        style={{
          padding: '10px',
          fontSize: 16,
          color: "#4B4B4B",
          fontFamily: "Gilroy",
          lineHeight: '18.83px',
          fontWeight: 500,
          backgroundColor: "#E7F1FF",
        }}
        type="text"
        placeholder="Enter Due Amount"
        value={due_amount}
        readOnly
      />
    </Form.Group>
  </div>
)}


    <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Amount Received</Form.Label>
        <Form.Control
          style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500}}
          type="text"
          placeholder="Enter Received Amount"
          value={received_amount} 
          onChange={(e)=>handleReceivedAmount(e)} 
           onPaste={(e) => {
    const pasted = e.clipboardData.getData("text");
    const num = parseFloat(pasted);
    const baseAmount = props.editvalue ? props.editvalue.amount_received : initial_due_amount;

    if (!/^[0-9]*\.?[0-9]*$/.test(pasted) || isNaN(num) || num > baseAmount) {
      e.preventDefault(); 
    }
  }}
        />
 {receivedamounterrmsg && (
                  <div className="d-flex align-items-center  mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {receivedamounterrmsg}
                    </label>
                  </div>
                )}
  
      </Form.Group>
    </div>

    </div>


<div className="row ">
  <div className="col-lg-3 col-md-5 col-sm-12 ">
    <Form.Group controlId="invoiceDate" className="mb-1">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Payment Date 
      </Form.Label>
      <div style={{ position: 'relative', width: "100%" ,height: 48, }}>
       


          <DatePicker
                                                            style={{ width: "100%", height: 48,cursor:"pointer" }}
                                                            format="DD/MM/YYYY"
                                                            placeholder="DD/MM/YYYY"
                                                            value={payment_date ? dayjs(payment_date) : null}
                                                            onChange={(date) => handlePayemntDate(date)}
                                                            getPopupContainer={(triggerNode) =>
                                                              triggerNode.closest(".datepicker-wrapper")
                                                            }
                                                          />
      </div>
    </Form.Group>
    {payment_dateerrmsg && (
                  <div className="d-flex align-items-center  mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {payment_dateerrmsg}
                    </label>
                  </div>
                )}
  </div>

  <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
                <Form.Group
                  className="mb-1"
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
                    Mode of Transaction{" "}
                    <span
                      style={{
                        color: "#FF0000",
                        display: modeOfPayment ? "none" : "inline-block",
                      }}
                    >
                      *
                    </span>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={modeOfPayment}
                    onChange={handleModeOfPaymentChange}
                    className=""
                    id="vendor-select"
                    style={{
                      fontSize: 16,
                      color: "rgba(75, 75, 75, 1)",
                      fontFamily: "Gilroy",
                      fontWeight: modeOfPayment ? 600 : 500,
                      cursor:"pointer"
                    }}
                  >
            
                   <option value="">Select Mode Of Payment</option>
                    {Array.isArray(state.bankingDetails?.bankingList?.banks) &&
                    state.bankingDetails?.bankingList?.banks.map((item) => {
                      let label = "";
                      if (item.type === "bank") label = 'Bank';
                      else if (item.type === "upi") label = "UPI";
                      else if (item.type === "card") label = "Card";
                      else if (item.type === "cash") label = "Cash";
                  
                      return (
                        <option key={item.id} value={item.id}>
                        {`${item.benificiary_name} - ${label}`}
                      </option>                      
                      );
                    })}
                  
                  </Form.Select>
                 



                </Form.Group>
                {paymentError && (
                  <div className="d-flex align-items-center  mb-2">
                    <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {paymentError}
                    </label>
                  </div>
                )}
              </div>

          


  
</div>



<div className="row mb-1">

<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Notes</Form.Label>
        <Form.Control
          style={{ padding: 'px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 , height:80}}
          type="text"
          placeholder="Enter Notes"
          value={notes || ''} 
          onChange={handleNotes} 
        />
                 {notes_errmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '12px', color: 'red', marginTop: '3px' }}>
    {notes_errmsg !== " " && <MdError style={{ fontSize: '14px', color: 'red' }} />} {notes_errmsg}
  </p>
</div>
)}
  
      </Form.Group>
    </div>
   <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
   <Button 
      onClick={handleCreateReceipt}
       className='w-80 mt-5 me-5' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 40,
       borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }} >
     {edit ? "Update Receipte" : "Create Receipt"}    
      </Button>
   </div>
  
    </div>


{allfielderrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '12px', color: 'red', marginTop: '3px', textAlign: "center" }}>
      {allfielderrmsg !== " " && <MdError style={{ fontSize: '14px', color: 'red',marginBottom:2 }} />} {allfielderrmsg}
    </p>
  </div>
)}



       

    

<div  style={{ display: "flex",flexDirection:"row", justifyContent:'end' }}>
   

   
      
    
   

      <div style={{marginBottom:30}}></div>
    
    </div>
  </div>




 
        </>
    )
}

AddReceiptForm.propTypes = {
  editvalue: PropTypes.func.isRequired,
  receiptedit: PropTypes.func.isRequired,
  onhandleback: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired 
};
export default AddReceiptForm;
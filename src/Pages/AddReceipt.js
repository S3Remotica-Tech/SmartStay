import React , {useState ,useEffect, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Invoices.css";
import { Container, Row, Col } from 'react-bootstrap';
import { Modal, Button ,FormControl} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { Offcanvas, Form, Dropdown } from 'react-bootstrap';
import moment from 'moment';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import squre from '../Assets/Images/New_images/minus-square.png';
import Calendars from '../Assets/Images/New_images/calendar.png'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { MdError } from "react-icons/md";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Emptystate from '../Assets/Images/Empty-State.jpg'
import BillPdfModal from '../Pages/BillPdfModal'
import Closebtn from '../Assets/Images/CloseCircle.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Notes } from "@material-ui/icons";


const AddReceiptForm = (props) => {


      const state = useSelector(state => state)
      const dispatch = useDispatch()
     
      const [customerinvoicefilter , setCustomerInvoiceFilter] = useState([])

      //receipt
      const [customername , setCustomerName] =  useState ('');
      const [reference_id , setReferenceId] =  useState ('')
      const [invoicenumber , setInvoiceNumber] =  useState ('')
      const [due_amount , setDueAmount] =  useState ('')
      const [received_amount , setReceivedAmount] =  useState ('')
      const [payment_date , setPaymentDate] =  useState (null);
      const [payment_mode , setPaymentMode] =  useState ('')
      const [bank_id , setBank_Id] =  useState ('')
      const [notes , setNotes] =  useState ('')

      const [formatpaymentdate, setFormatPaymentDate] = useState(null)
      const [customererrmsg , setCustomerErrmsg] = useState('')
      const [invoicenumbererrmsg , setInvoicenumberErrmsg] = useState('')
      const [referencideerrmsg , setReferenceIdErrmsg] = useState('')
      const [receivedamounterrmsg , setReceivedAmountErrmsg] = useState('')
      const [payment_dateerrmsg , setPaymentDateErrmsg] = useState('')
      const [paymentmode_errmsg , setPaymentmode_Errmsg] = useState('')
      const [notes_errmsg , setNotes_Errmsg] = useState('')
      const [bank_errmsg , setBank_Errmsg] = useState('')
      const [allfielderrmsg , setAllFieldErrmsg] = useState('')


      const receiptRef = useRef(null);
      
      const [edit_Id , setEdit_Id] = useState(null)
      const [edit, setEdit] = useState(false)
    
    
     useEffect(() => {
        if (props.editvalue && props.receiptedit) {
          setEdit(true)
          console.log("receiptedit",props.editvalue);
          setEdit_Id(props.editvalue.hos_user_id)
          setCustomerName(props.editvalue.hos_user_id);
          setInvoiceNumber(props.editvalue.invoice_number || '');
    
          if (props.editvalue.payment_date) {
            const parsedDate = new Date(props.editvalue.payment_date); 
            if (!isNaN(parsedDate.getTime())) {
              setPaymentDate(parsedDate); 
              const formattedDate = formatDateForReceipt(parsedDate);
          setFormatPaymentDate(formattedDate)
            } else {
              console.error("Invalid Date:", props.editvalue.payment_date);
            }
          }

          
    
          setReferenceId(props.editvalue.reference_id || '');
          setDueAmount(props.editvalue.BalanceDue || '');
          setReceivedAmount(props.editvalue.amount_received || '')
          setBank_Id(props.editvalue.bank_id || '') ;
          setPaymentMode(props.editvalue.payment_mode || '') 
          setNotes(props.editvalue.notes? props.editvalue.notes : '');
        }
      }, [props.editvalue , props.receiptedit]);
   
    
    
     
     
    
    
      const handleCustomerName = (e) => {
        const Value = e.target.value;
        setCustomerName(Value);
        setAllFieldErrmsg("");
      
        // Proper filter logic
        const CustomerinvoicedetailsFilter =
          state?.InvoiceList?.ManualInvoices?.length > 0
            ? state.InvoiceList.ManualInvoices.filter(
                (u) => u.hos_user_id == e.target.value && u.BalanceDue > 0
              )
            : [];
      
        setCustomerInvoiceFilter(CustomerinvoicedetailsFilter);


      
        console.log("customerfilter", state?.InvoiceList?.ManualInvoices);
        console.log("customerfilter", CustomerinvoicedetailsFilter);
      
        if (!Value) {
          setCustomerErrmsg("Please Select Name");
        } else {
          setCustomerErrmsg("");
        }
      };

   
      
      

      const [dropdownClicked, setDropdownClicked] = useState(false);

      const handleInvoiceNumber = (e) => {
        const selectedValue = e.target.value;
      
        setInvoiceNumber(selectedValue);
        setDropdownClicked(true);
        setAllFieldErrmsg("");
      
        const DueAmountFilter =
          customerinvoicefilter &&
          !edit &&
          customerinvoicefilter.filter((u) => u.Invoices == selectedValue);
      
        setDueAmount(DueAmountFilter[0]?.BalanceDue);
      
        // Handle validation
        if (!selectedValue) {
          setInvoicenumberErrmsg("Please Enter Invoice");
        } else {
          setInvoicenumberErrmsg("");
        }
      };
      

      const handleReceivedAmount = (e) => {
        setReceivedAmount(e.target.value)
        setAllFieldErrmsg('')
        if(!e.target.value){
          setReceivedAmountErrmsg("Please Enter Amount")
        }
        else{
            setReceivedAmountErrmsg('')
        }
    
      }

      const handlePaymentMode = (e) => {
        setPaymentMode(e.target.value)
        setAllFieldErrmsg('')
        if(!e.target.value){
          setPaymentmode_Errmsg("Please Select payment method")
        }
        else{
            setPaymentmode_Errmsg('')
        }
      }

      
      const handleBanking = (e) => {
        setBank_Id(e.target.value)
        setAllFieldErrmsg('')
        if(!e.target.value){
          setBank_Errmsg("Please Select Bank")
        }
        else{
            setBank_Errmsg('')
        }
      }

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
        setPaymentMode('')
        setBank_Id('')
        setNotes('')
   }
 
   const formatDateForReceipt = (date) => {
     if (!date) return null;
     const offset = date.getTimezoneOffset();
     date.setMinutes(date.getMinutes() - offset);
     return date.toISOString().split('T')[0]; 
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
 
 
  


  
   



   console.log("editedname",props.editvalue.user_id,customername)
   console.log("editedreferebc",props.editvalue.reference_id,reference_id)
   console.log("editedamount_received",props.editvalue.amount_received,received_amount)
   console.log("editedinvoice_numberc",props.editvalue.invoice_number,invoicenumber)
   console.log("editedpayment_mode",props.editvalue.payment_mode,payment_mode)
   console.log("editednotes",props.editvalue.notes,notes)
   console.log("editedbank_id",props.editvalue.bank_id,bank_id)


     const handleCreateReceipt = () => {
    

          if(!customername){
           setCustomerErrmsg('Please Select  Customer')
          }
        
          if(!formatpaymentdate){
            setPaymentDateErrmsg('Please Select  Date')
          }

          if(!invoicenumber){
            setInvoicenumberErrmsg("please Select Invoice")
          }

          if(!received_amount){
            setReceivedAmountErrmsg("Please Enter Amount")
          }

          if(!payment_mode){
            setPaymentmode_Errmsg("Please Enter Amount")
          }

          if(!bank_id){
            setBank_Errmsg("Please Select Bank")
          }

          
          if(!customername && !invoicenumber &&  !formatpaymentdate && !reference_id && !payment_mode && !received_amount  && !bank_id){
           setAllFieldErrmsg('Please Enter All Field')
           return;
          }
          const formatDateToLocal = (date) => {
            if (!date) return ""; // Handle null/undefined cases
            const d = new Date(date);
            return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
          };
          
          const isChanged =
          (() => {
            return (
              Number(props.editvalue.user_id) !== Number(customername) ||
              // String(props.editvalue.payment_date) !== String(formatpaymentdate) ||
              formatDateToLocal(props.editvalue.payment_date) !== formatDateToLocal(formatpaymentdate) || 
              String(props.editvalue.reference_id) !== String(reference_id) ||
              Number(props.editvalue.amount_received) !== Number(received_amount) ||
              String(props.editvalue.invoice_number) !== String(invoicenumber) ||
              String(props.editvalue.payment_mode) !== String(payment_mode) ||
              String(props.editvalue.bank_id) !== String(bank_id)
            );
          })();
        
        console.log("Final isChanged Value:", isChanged);
        
          // (props.editvalue.notes ? String(props.editvalue.notes) !== String(notes) : notes !== ""); 
        
        if (!isChanged) {
          setAllFieldErrmsg("No changes detected!");
          return;
        }
        

         
          if( !edit && customername && invoicenumber  && formatpaymentdate && reference_id && received_amount && payment_mode && bank_id){
           dispatch({
             type: 'ADD_RECEIPT',
             payload: { user_id: customername, payment_date: formatpaymentdate , reference_id: reference_id ,
 amount : received_amount , invoice_number: invoicenumber, payment_mode: payment_mode ,notes : notes , bank_id: bank_id
           
             }
             });

             props.onhandleback()
             setCustomerName('');
             setInvoiceNumber('');
             setReferenceId('')
             setPaymentDate('')
             setReceivedAmount('')     
             setPaymentMode('')
             setBank_Id('')
             setNotes('')
          }

          else if(edit && isChanged && props.editvalue && props.receiptedit && edit_Id && customername && invoicenumber  && formatpaymentdate && reference_id && received_amount && payment_mode && bank_id ){
            dispatch({
              type: 'EDIT_RECEIPTS',
              payload: {id:props.editvalue.id, user_id: customername, payment_date: formatpaymentdate ,reference_id: reference_id ,
  amount : received_amount , invoice_number: invoicenumber, payment_mode: payment_mode ,notes : notes , bank_id: bank_id
            
              }
              });

        
 
              props.onhandleback()
              setCustomerName('');
              setInvoiceNumber('');
              setReferenceId('')
              setPaymentDate('')
              setReceivedAmount('')     
              setPaymentMode('')
              setBank_Id('')
              setNotes('')
          }

     
     }


  
     const customDateInputPaymentDate = (props) => {
      return (
          <div className="date-input-container w-100" onClick={props.onClick} style={{ position:"relative"}}>
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
                                             height: 48,
                      boxSizing: "border-box",
                      boxShadow:"none" 
                  }}
              />
              <img 
                  src={Calendars} 
              style={{ height: 22, width: 22, marginLeft: 10, cursor: "pointer", position:"absolute" ,right:10, top:"50%",transform:'translateY(-50%)' }} 
                  alt="Calendar" 
                  onClick={props.onClick} 
              />
          </div>
      );
  };





     

    useEffect(()=> {
      dispatch({type: "USERLIST",payload:{hostel_id:state.login.selectedHostel_Id}})
    },[])

    
    
   
      
    


      const options = {
        dateFormat: 'd/m/Y',
        defaultDate: null,
        // defaultDate: selectedDate,
        // maxDate: new Date(),
        minDate: null,
      };
    
      useEffect(() => {
        if (receiptRef.current) {
            receiptRef.current.flatpickr.set(options);
        }   
    }, [ payment_date ])

      
    
     
      
     
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
            <div className='container ms-5 me-5'>

            <div style={{display:'flex',flexDirection:'row',marginTop:'20px'}} >
  <svg onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg>
  <p className='mt-1'>{edit? "Edit Receipt":"New Receipt"} </p>
  </div>




<div className='col-lg-7 col-md-6 col-sm-12 col-xs-12'>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
  <Form.Label 
    style={{ 
      fontFamily: 'Gilroy', 
      fontSize: 14, 
      fontWeight: 500, 
      color: "#222", 
      fontStyle: 'normal', 
      lineHeight: 'normal' 
    }}>
    Customer
  </Form.Label>
  <Form.Select 
    aria-label="Default select example" 
    value={customername} 
    onChange={handleCustomerName} 
    disabled={edit}
    className='border' 
    style={{ 
      fontSize: 16, 
      color: "#4B4B4B", 
      fontFamily: "Gilroy", 
      lineHeight: '18.83px', 
      fontWeight: 500, 
      boxShadow: "none", 
      border: "1px solid #D9D9D9", 
      height: 38, 
      borderRadius: 8 ,
      backgroundColor:edit? "#E7F1FF": "white"
    }}>
      <option value=''>Select Customer</option>
      {state?.UsersList?.Users && state?.UsersList?.Users.length > 0 && state?.UsersList?.Users.filter(u => 
       u.Bed !== 'undefined' && 
       u.Bed !== '0' && 
       typeof u.Bed === 'string' && 
       u.Bed.trim() !== '' && 
       u.Rooms !== 'undefined' && 
       u.Rooms !== '0' && 
       typeof u.Rooms === 'string' && 
       u.Rooms.trim() !== '')
      .map(u => (
    <option value={u.ID} key={u.ID}>{u.Name}</option>
  ))
}
  </Form.Select>
  {customererrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '13px', color: 'red', marginTop: '3px' }}>
    {customererrmsg !== " " && <MdError style={{ fontSize: '14px', color: 'red',marginBottom:"5px" }} />} {customererrmsg}
  </p>
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
          placeholder="Enter invoice number"
          value={reference_id || ''} 
          readOnly
        />
                 {referencideerrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {referencideerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {referencideerrmsg}
  </p>
</div>
)}
  
      </Form.Group>
    </div>

   
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
      <Form.Select
        aria-label="Default select example"
        value={invoicenumber}
        onChange={handleInvoiceNumber}
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
          backgroundColor: "white",
        }}
      >
        <option value="">Select Invoice number</option>
        {customerinvoicefilter &&
          customerinvoicefilter.map((u) => (
            <option key={u.id} value={u.Invoices}>
              {u.Invoices}
            </option>
          ))}
      </Form.Select>
    )}

    {invoicenumbererrmsg.trim() !== "" && (
      <div>
        <p style={{ fontSize: "15px", color: "red", marginTop: "3px" }}>
          {invoicenumbererrmsg !== " " && (
            <MdError style={{ fontSize: "15px", color: "red" }} />
          )}{" "}
          {invoicenumbererrmsg}
        </p>
      </div>
    )}
  </Form.Group>
</div>



    </div>

<div className="row mb-1">

<div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Due Amount</Form.Label>
        <Form.Control
          style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 ,   backgroundColor: "#E7F1FF",}}
          type="text"
          placeholder="Enter Due Amount"
          value={due_amount || ''} 
          readOnly
        />

  
      </Form.Group>
    </div>

    <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Amount Received</Form.Label>
        <Form.Control
          style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
          type="text"
          placeholder="Enter received amount"
          value={received_amount || ''} 
          onChange={handleReceivedAmount} 
        />
                 {receivedamounterrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {receivedamounterrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {receivedamounterrmsg}
  </p>
</div>
)}
  
      </Form.Group>
    </div>

    </div>


<div className="row ">
  <div className="col-lg-3 col-md-5 col-sm-12 ">
    <Form.Group controlId="invoiceDate" className="mb-3">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Payment Date 
        {/* <span style={{ color: 'red', fontSize: '20px' }}>*</span> */}
      </Form.Label>
      <div style={{ position: 'relative', width: "100%" ,height: 48, }}>
        <DatePicker
          selected={payment_date}
          onChange={(date) => handlePayemntDate(date)}
          dateFormat="dd/MM/yyyy"
          popperPlacement="bottom-start"
          popperModifiers={[
            {
              name: "offset",
              options: {
                offset: [0, -300],
              },
            },
          ]}
          customInput={customDateInputPaymentDate({
            value: payment_date ? payment_date.toLocaleDateString('en-GB') : '',
          })}
        />
      </div>
    </Form.Group>
    {payment_dateerrmsg.trim() !== "" && (
      <div className="d-flex align-items-center p-1">
        <MdError style={{ color: "red", marginRight: '5px',fontSize: "14px",marginBottom:"3px" }} />
        <label className="mb-0" style={{ color: "red", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500 }}>
          {payment_dateerrmsg}
        </label>
      </div>
    )}
  </div>

  {/* Due Date */}
  <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
  <Form.Label 
    style={{ 
      fontFamily: 'Gilroy', 
      fontSize: 14, 
      fontWeight: 500, 
      color: "#222", 
      fontStyle: 'normal', 
      lineHeight: 'normal' 
    }}>
    Payment Mode
  </Form.Label>
  <Form.Select 
    aria-label="Default select example" 
    value={payment_mode} 
    onChange={handlePaymentMode} 
    className='border' 
    style={{ 
      fontSize: 16, 
      color: "#4B4B4B", 
      fontFamily: "Gilroy", 
      lineHeight: '18.83px', 
      fontWeight: 500, 
      boxShadow: "none", 
      border: "1px solid #D9D9D9", 
      height: 48, 
      borderRadius: 8 
    }}>
      <option value=''>Select Payment</option>
      <option value="Cash" >Cash</option>
      <option value="upi" >UPI</option>
      <option value="Credit Card" >Credit Card</option>
      <option value="Debit Card" >Debit Card</option>
  </Form.Select>
  {paymentmode_errmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '13px', color: 'red', marginTop: '3px' }}>
    {paymentmode_errmsg !== " " && <MdError style={{ fontSize: '14px', color: 'red',marginBottom:"5px" }} />} {paymentmode_errmsg}
  </p>
</div>
)}
</Form.Group>
</div>
</div>

<div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
  <Form.Label 
    style={{ 
      fontFamily: 'Gilroy', 
      fontSize: 14, 
      fontWeight: 500, 
      color: "#222", 
      fontStyle: 'normal', 
      lineHeight: 'normal' 
    }}>
    Banking
  </Form.Label>
  <Form.Select 
    aria-label="Default select example" 
    value={bank_id} 
    onChange={handleBanking} 
    className='border' 
    style={{ 
      fontSize: 16, 
      color: "#4B4B4B", 
      fontFamily: "Gilroy", 
      lineHeight: '18.83px', 
      fontWeight: 500, 
      boxShadow: "none", 
      border: "1px solid #D9D9D9", 
      height: 38, 
      borderRadius: 8 
    }}>
      <option value=''>Select Banking</option>
      {state?.bankingDetails?.bankingList?.banks && state?.bankingDetails?.bankingList?.banks.length > 0 
     && state.bankingDetails.bankingList.banks.map(u => (
    <option value={u.id} key={u.id}>{u.bank_name}</option>
  ))
}
  </Form.Select>
  {bank_errmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '13px', color: 'red', marginTop: '3px' }}>
    {bank_errmsg !== " " && <MdError style={{ fontSize: '14px', color: 'red',marginBottom:"5px" }} />} {bank_errmsg}
  </p>
</div>
)}
</Form.Group>
</div>

<div className="row mb-1">

<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Notes</Form.Label>
        <Form.Control
          style={{ padding: 'px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 , height:80}}
          type="text"
          placeholder="Enter notes"
          value={notes || ''} 
          onChange={handleNotes} 
        />
                 {notes_errmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {notes_errmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {notes_errmsg}
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
     {edit ? "Update Receipt" : "Create Receipt"}    
      </Button>
   </div>
  
    </div>


{allfielderrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '14px', color: 'red', marginTop: '3px' }}>
      {allfielderrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red',marginBottom:2 }} />} {allfielderrmsg}
    </p>
  </div>
)}



       

    

<div  style={{ display: "flex",flexDirection:"row", justifyContent:'end' }}>
   

   
      
    
   

      <div style={{marginBottom:30}}></div>
    
    </div>
  {/* </div> */}
  </div>




 
        </>
    )
}
export default AddReceiptForm;
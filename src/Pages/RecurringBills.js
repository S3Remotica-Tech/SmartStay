/* eslint-disable react-hooks/exhaustive-deps */
import React , {useState ,useEffect, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import "./Invoices.css";
import {Button} from 'react-bootstrap';
import { Table } from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import 'flatpickr/dist/themes/material_blue.css';
import { MdError } from "react-icons/md";
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from "prop-types";


const RecurringBills = (props) => {


      const state = useSelector(state => state)
      const dispatch = useDispatch()

    
      const [customername , setCustomerName] =  useState ('');
      const [customernamefilter , setCustomerFilter] = useState([])
      const [invoicenumber , setInvoiceNumber] =  useState ('')
      const [invoicedate , setInvoiceDate] =  useState (null);
      const [invoiceduedate , setInvoiceDueDate] =  useState (null);
      const [invoicetotalamounts,setInvoiceTotalAmount] = useState([])
      const [billamounts, setBillAmounts] = useState([])
      const [customererrmsg , setCustomerErrmsg] = useState('')
      const [allfielderrmsg , setAllFieldErrmsg] = useState('')
      const [totalAmount , setTotalAmount] = useState('')
      const [newRows, setNewRows] = useState([]);
      const [allFieldErrmsg] = useState('');
      const [recurdisable, setRecurDisable] = useState('')

     
    
      const invoiceRef = useRef(null);
      const dueRef = useRef(null);
    
    


    
      const handleCustomerName = (e) => {
        setCustomerName(e.target.value)
        setAllFieldErrmsg('')
        if(!e.target.value){
          setCustomerErrmsg("Please Select Name")
        }
        else{
          setCustomerErrmsg('')
        }
      
        setBillAmounts('')
        setTotalAmount('')
      }


      const handleBackBill = () => {
        props.onhandleback()
        setAllFieldErrmsg('')
   }
 

 



     const handleCreateBill = () => {
    
      // const allRows = [...billamounts, ...newRows];
      // const incompleteRow = allRows.find(row => !row.description || !row.amount);

      // const amenityArray = amenityDetail.map(detail => ({
      //    am_name: detail.am_name,
      //    amount: detail.amount
      //     })).filter(detail => detail.am_name && detail.amount);


          if(!customername){
           setCustomerErrmsg('Please Select  Customer')
           return;
          }
        
        
        

        
         
          if(customername && invoicenumber   ){
           dispatch({
             type: 'RECURRING-BILLS-ADD',
             payload: { user_id: customername,
             invoice_id: invoicenumber, 
               amenity: [{key:"total_amount",amount:totalAmount}]
             }
             });

             props.onhandleback()
             setCustomerName('');
             setInvoiceNumber('');
             setInvoiceDate('')
             setInvoiceDueDate('')
            //  setAvailableOptions('');
             setTotalAmount('')
             setBillAmounts([]);
             setNewRows([]);
          }

       // setShowManualInvoice(true)
     
     }


  
   





     

    // useEffect(()=> {
    //   dispatch({type: "USERLIST",payload:{hostel_id:state.login.selectedHostel_Id}})
    // },[])

    useEffect(()=> {
      dispatch({type: "RECURRING-BILLS-LIST"})
    },[])
    
    useEffect(() => {
        if (state.InvoiceList.RecurringbillsgetStatuscode === 200 ) {
          // setRecurringBills(state.InvoiceList.RecurringBills);
      
          setTimeout(() => {
            dispatch({ type: 'REMOVE_STATUS_CODE_RECURRING_BILLS_LIST' });
          }, 100);
        }
      }, [state.InvoiceList.RecurringbillsgetStatuscode]); 
      

      useEffect(() => {
        if (state.InvoiceList.RecurringBillAddStatusCode === 200 ) {
          dispatch({ type: 'RECURRING-BILLS-LIST' });
          // setRecurringBills(state.InvoiceList.RecurringBills);
      
          setTimeout(() => {
            dispatch({ type: 'REMOVE_STATUS_CODE_RECURRING_BILLS_ADD' });
          }, 1000);
        }
      }, [state.InvoiceList.RecurringBillAddStatusCode]); 
      
    


      const options = {
        dateFormat: 'd/m/Y',
        defaultDate: null,
        // defaultDate: selectedDate,
        // maxDate: new Date(),
        minDate: null,
      };
    
      useEffect(() => {
        if (invoiceRef.current) {
          invoiceRef.current.flatpickr.set(options);
        }
        if (dueRef.current) {
          dueRef.current.flatpickr.set(options);
        }
    }, [ invoicedate, invoiceduedate ])

  
    useEffect(() => { 
      if(state.login.selectedHostel_Id){
        dispatch({ type: 'FILTERRECURRCUSTOMERS', payload: { hostel_id: state.login.selectedHostel_Id } });  
      }
    }, []);
    
      useEffect(() => {
        if (customername) {
          dispatch({ type: 'MANUAL-INVOICE-NUMBER-GET', payload: { user_id: customername } });
          dispatch({ type: 'GET-RECURRING-BILL-AMOUNTS',payload: {user_id: customername , hostel_id: state.login.selectedHostel_Id} });
        }
      }, [customername]); 
      
     
      useEffect(() => {
        if (state.InvoiceList.Manulainvoicenumberstatuscode === 200) {
    
          setInvoiceNumber(state.InvoiceList.ManualInvoiceNUmber.invoice_number);
          setTimeout(() => {
            dispatch({ type: 'REMOVE_MANUAL_INVOICE_NUMBER_GET' });
          }, 100);
        }
      }, [state.InvoiceList.ManualInvoiceNUmber.invoice_number, state.InvoiceList.Manulainvoicenumberstatuscode]); 
            
    
    
      useEffect(() => {
        
          if (state.InvoiceList.recurrbillamountgetStatuscode === 200) {
            const totalArray = state?.InvoiceList?.Recurringbillamounts;
            
            if (totalArray) {
              setInvoiceTotalAmount(totalArray); 
            }
            setTimeout(() => {
              dispatch({ type: 'REMOVE_STATUS_CODE_RECURRING_INVOICE_AMOUNT' });
            }, 1000);
          }
        
      }, [ state.InvoiceList.recurrbillamountgetStatuscode ]);
    
        
    
      useEffect(() => {
             if (invoicetotalamounts && invoicetotalamounts.length > 0) {
                setBillAmounts(invoicetotalamounts);
                }      
           }, [invoicetotalamounts]);


           useEffect(() => {
            if (state.InvoiceList.getstatusCodeForfilterrecurrcustomers === 200) {
        
              setCustomerFilter(state.InvoiceList.FilterRecurrCustomers);
              setTimeout(() => {
                dispatch({ type: 'CLEAR_FILTER_ADD_RECURR_CUSTOMERSF_STATUS_CODE' });
              }, 100);
            }
          }, [ state.InvoiceList.getstatusCodeForfilterrecurrcustomers]); 

          useEffect(() => {
            if (state.InvoiceList.RecurenotenableStatusCode === 202) {
              setRecurDisable(state.InvoiceList.RecurenotEnable)
              setAllFieldErrmsg(state.InvoiceList.Errmessage)
    
              setTimeout(() => {
                dispatch({ type: 'REMOVE_STATUS_CODE_FAIL_ADD_RECURRING_BILL' });
              }, 100);
            }
          }, [ state.InvoiceList.RecurenotenableStatusCode]);
        
         

           useEffect(()=> {
    
              if(billamounts && billamounts.length > 0){

               
                
        
              // const  RoomRentItem = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 1); // Room Rent with id 1
              // const  AdvanceAmount = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 2); // Adavance amount with id 2
              // const  EbAmount = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 3); // EB Amount with id 3 

              // setRentAmount(RoomRentItem)
              // setAdvanceAmount(AdvanceAmount)
              // setEBAmount(EbAmount)
    
              // var  amenities = billamounts && billamounts.length > 0 && billamounts.filter(item => item.id != 1 && item.id != 2 && item.id != 3);
    
              // const AmenityDetails = amenities.map(item => ({
              //   am_name: item.name,   
              //   amount : item.amount
              //   }));
                // setAmenityDetails(AmenityDetails)
      
    
                // const allRows = newRows.map(detail => ({
                //   am_name: detail.description, 
                //   amount: Number(detail.amount)
                // })).filter(detail => detail.am_name && detail.amount); 
                
                // const amenityArray = AmenityDetails.map(detail => ({
                //   am_name: detail.am_name, 
                //   amount: detail.amount
                // })).filter(detail => detail.am_name && detail.amount); 
                
                
                // const combinedRows = [...amenityArray, ...allRows];
              
                // setamenityArray(combinedRows)


    
                const totalAmount = billamounts.reduce((acc, item) => acc + item.amount, 0);
                   setTotalAmount(totalAmount)
    
                      }
    
        },[billamounts,newRows])
    
   
        console.log("billamount", billamounts);



    return(
        <>
            <div className='container ' style={{paddingLeft:25}}>

            <div style={{display:'flex',flexDirection:'row',marginTop:'40px'}} >
  <svg onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px', cursor:'pointer'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg>
  <p className='mt-1'>Create Recurring Bill</p>
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
      <option value=''>Select Customer</option>
      {customernamefilter && customernamefilter.length > 0 && customernamefilter.map(u => (
    <option value={u.id} key={u.id}>{u.Name}</option>
  ))
}
  </Form.Select>
  {customererrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '13px', color: 'red', marginTop: '3px' }}>
    {customererrmsg !== " " && <MdError style={{ fontSize: '13px', color: 'red',marginBottom:"5px" }} />} {customererrmsg}
  </p>
</div>
)}
</Form.Group>
</div>



            <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12'>
      <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Invoice Number</Form.Label>
        <Form.Control
          style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
          type="text"
          placeholder="Enter invoice number"
          value={invoicenumber || ''} 
        />
                 {/* {invoicenumbererrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {invoicenumbererrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoicenumbererrmsg}
  </p>
</div>
)} */}
  
      </Form.Group>
    </div>

    



{/* <div className="row mb-3">
  
  <div className="col-lg-3 col-md-5 col-sm-12 mb-3 me-4">
    <Form.Group controlId="invoiceDate">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Invoice Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
      </Form.Label>
      <div style={{ position: 'relative', width: "100%" }}>
        <DatePicker
          selected={invoicedate}
          onChange={(date) => handleInvoiceDate(date)}
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
          customInput={customDateInputInvoiceDate({
            value: invoicedate ? invoicedate.toLocaleDateString('en-GB') : '',
          })}
        />
      </div>
    </Form.Group>
    {invoicedateerrmsg.trim() !== "" && (
      <div className="d-flex align-items-center p-1">
        <MdError style={{ color: "red", marginRight: '5px',fontSize: "13px",marginBottom:"3px" }} />
        <label className="mb-0" style={{ color: "red", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500 }}>
          {invoicedateerrmsg}
        </label>
      </div>
    )}
  </div>

  
  <div className="col-lg-3 col-md-5 col-sm-12 mb-3 me-4">
    <Form.Group controlId="dueDate">
      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
        Due Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
      </Form.Label>
      <div style={{ position: 'relative', width: "100%" }}>
        <DatePicker
          selected={invoiceduedate}
          onChange={(date) => handleDueDate(date)}
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
          customInput={customDateInputDueDate({
            value: invoiceduedate ? invoiceduedate.toLocaleDateString('en-GB') : '',
          })}
        />
      </div>
    </Form.Group>
    {invoiceduedateerrmsg.trim() !== "" && (
      <div className="d-flex align-items-center p-1">
        <MdError style={{ color: "red", marginRight: "5px",fontSize: "13px",marginBottom:"3px"  }} />
        <label className="mb-0" style={{ color: "red", fontSize: "14px", fontFamily: "Gilroy", fontWeight: 500 }}>
          {invoiceduedateerrmsg}
        </label>
      </div>
    )}
  </div>
</div> */}

{allfielderrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '14px', color: 'red', marginTop: '3px' }}>
      {allfielderrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red',marginBottom:2 }} />} {allfielderrmsg}
    </p>
  </div>
)}



       

    

<div className="col-lg-7 col-md-12 col-sm-12 col-xs-12 mt-2">
  <Table
    responsive
    className="Table_Design"
    style={{
      height: "auto",
      overflow: "visible",
      tableLayout: "auto",
      borderRadius: "24px",
      border: "1px solid #DCDCDC",
    }}
  >
    <thead
      style={{
        backgroundColor: "#E7F1FF",
        position: "sticky",
        top: 0,
        zIndex: 1,
      }}
    >
      <tr>
        <th
          style={{
            paddingLeft: 10,
            borderTopLeftRadius: 24,
            color: "rgb(147, 147, 147)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          S.No
        </th>
        <th style={{ color: "rgb(147, 147, 147)", fontSize: 14, fontWeight: 500 }}>
          Description
        </th>
        <th
          style={{
            color: "rgb(147, 147, 147)",
            fontSize: 14,
            fontWeight: 500,
            textAlign: "center",
            borderTopRightRadius: 24,
          }}
        >
          As on Date
        </th>
      </tr>
    </thead>
    <tbody>
      {billamounts && billamounts.length > 0 ? (
        billamounts.map((u, index) => (
          <tr key={`bill-${index}`}>
            <td style={{ paddingLeft: 10 }}>{index + 1}</td>
            <td style={{ whiteSpace: "nowrap" }}>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <p>{u.key}</p>
              </div>
            </td>

            <td style={{ verticalAlign: "middle", paddingTop: 0, paddingBottom: 0 }}>
              <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ margin: "0 auto" }}>
                <Form.Group controlId={`amount-${index}`} style={{ margin: 0 }}>
                  <Form.Control
                    style={{
                      padding: "8px",
                      fontSize: 14,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}

                    type="text"
                    placeholder="Enter amount"
                    value={u.amount !== undefined ? Math.floor(u.amount) : 0}
                    // onChange={(e) => handleAmountChange(index, e.target.value)}
                  />
                </Form.Group>
              </div>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="3" style={{ textAlign: "center", padding: "20px", fontSize: 14, fontWeight: 500, color: "#888" }}>
            No data available
          </td>
        </tr>
      )}
    </tbody>
  </Table>
</div>


<div className='col-lg-7 col-md-12 col-sm-12 col-xs-12 mt-2' 
 style={{ display: "flex",flexDirection:"row", justifyContent:'space-between' }}>
    <div>
      {/* <p style={{color:'#1E45E1',fontSize:'14px',fontWeight:600}}
     onClick={handleAddColumn}
     > + Add new column</p> */}
     </div>

    <div className="totalamount" >
      <h5> As on Date ₹ {totalAmount} </h5>
      <Button 
      onClick={handleCreateBill}
      disabled={recurdisable === 0}
       className='w-80 mt-3 ' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 40,
       borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }} >
        Set As Recure
      </Button>
      {allFieldErrmsg && (
  <p style={{ color: 'red', fontSize: '14px', marginTop: '10px' }}>
    {allFieldErrmsg}
  </p>
)}

      <div style={{marginBottom:30}}></div>
    </div>
    </div>
  {/* </div> */}
  </div>




 
        </>
    )
}


RecurringBills.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onhandleback: PropTypes.func.isRequired,
};

export default RecurringBills;
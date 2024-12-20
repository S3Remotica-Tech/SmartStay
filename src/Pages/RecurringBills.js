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
import Closebtn from '../Assets/Images/CloseCircle-Linear-32px.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const RecurringBills = (props) => {


    const state = useSelector(state => state)
    console.log("state",state);
    
    console.log("props",props);
    
    const dispatch = useDispatch()

      useEffect(()=> {
        dispatch({type: "USERLIST"})
      },[])

      useEffect(()=> {
        dispatch({type: "RECURRING-BILLS-LIST"})
      },[])
    
      const [selectedHostel, setSelectedHostel] = useState('');
      const [customername , setCustomerName] =  useState ('');
      console.log("customername",customername);

      const [customernamefilter , setCustomerFilter] = useState([])
      
      const [invoicenumber , setInvoiceNumber] =  useState ('');
    
      const [invoicedate , setInvoiceDate] =  useState (null);
      const [invoiceduedate , setInvoiceDueDate] =  useState (null);
    
      const [formatinvoicedate, setFormatInvoiceDate] = useState(null)
      const [formatduedate, setFormatDueDate] = useState(null)
      console.log("formatinvoicedate",formatduedate);
    
      const [invoicetotalamounts,setInvoiceTotalAmount] = useState([])
      const [billamounts, setBillAmounts] = useState([])
      const [deleteShow,setDeleteShow] = useState(false)
      console.log("billamounts",billamounts);
      console.log("invoicetotalamounts",invoicetotalamounts);
    
      
    const [ebamount, setEBAmount] = useState('')
    const [rentamount , setRentAmount] = useState('')
    const [advanceAmount,setAdvanceAmount] = useState('')
    const [amenityDetail , setAmenityDetails] = useState([])
    console.log("amenityDetail",amenityDetail);
    
    const [totalAmount , setTotalAmount] = useState('')
    
    
    
      const startRef = useRef(null);
      const endRef = useRef(null);
      const invoiceRef = useRef(null);
      const dueRef = useRef(null);
    
    
      const [recurringbills , setRecurringBills] = useState([])
      const [availableOptions, setAvailableOptions] = useState(invoicetotalamounts);
      console.log("availableOptions",availableOptions);
      
    
      const [newRows, setNewRows] = useState([]);
    
    const handleAddColumn = () => {
      const newRow = {
        description: '',
        // used_unit: '',
        // per_unit_amount: '',
        // total_amount: '',
        amount: ''
      };
      setNewRows([...newRows, newRow]);
    };
    
    console.log("newRows",newRows);
    
        const [hostelerrormsg, setHostelErrmsg] = useState('');
        const [customererrmsg , setCustomerErrmsg] = useState('')
        const [invoicenumbererrmsg , setInvoicenumberErrmsg] = useState('')
        const [startdateerrmsg , setStartdateErrmsg] = useState('')
        const [enddateerrmsg , setEnddateErrmsg] = useState('')
        const [invoicedateerrmsg , setInvoiceDateErrmsg] = useState('')
        const [invoiceduedateerrmsg , setInvoiceDueDateErrmsg] = useState('')
        const [allfielderrmsg , setAllFieldErrmsg] = useState('')


      
    
      useEffect(() => {
        if (state.InvoiceList.RecurringbillsgetStatuscode === 200 ) {
          setRecurringBills(state.InvoiceList.RecurringBills);
      
          setTimeout(() => {
            dispatch({ type: 'REMOVE_STATUS_CODE_RECURRING_BILLS_LIST' });
          }, 100);
        }
      }, [state.InvoiceList.RecurringbillsgetStatuscode]); 
      

      useEffect(() => {
        if (state.InvoiceList.RecurringBillAddStatusCode === 200 ) {
          dispatch({ type: 'RECURRING-BILLS-LIST' });
          setRecurringBills(state.InvoiceList.RecurringBills);
      
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

    const handleHostelChange = (e) => {
      console.log("hostel",e.target.value);
      
      setSelectedHostel(e.target.value)
      setAllFieldErrmsg('')
 
      const HostelBasedCustomerNameFilter = state?.UsersList?.Users && state?.UsersList?.Users.length > 0 && 
      state.UsersList?.Users.filter((u)=> u.Hostel_Id == e.target.value)
      setCustomerFilter(HostelBasedCustomerNameFilter)

      if (!e.target.value) {
        setHostelErrmsg("Please Select Hostel");
      } else {
        setHostelErrmsg("");
      }
    };
    
    
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
    
    
    
    
     
      
    
      useEffect(() => {
        if (customername) {
          dispatch({ type: 'MANUAL-INVOICE-NUMBER-GET', payload: { user_id: customername } });
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
            
    
      const [dataFetched, setDataFetched] = useState(false);

    
      useEffect(() => {
        console.log("getamountuseffect");
        
        if (  !dataFetched ) {
          // dispatch({ type: 'MANUAL-INVOICE-NUMBER-GET', payload: {user_id: customername } });
          dispatch({ type: 'GET-RECURRING-BILL-AMOUNTS',payload: {user_id: customername} });
    
          if (state.InvoiceList.recurrbillamountgetStatuscode === 200) {
            const totalArray = state?.InvoiceList?.Recurringbillamounts;
            console.log("state?.InvoiceList?.Recurringbillamounts",state?.InvoiceList?.Recurringbillamounts);
            
            
            if (totalArray) {
              setInvoiceTotalAmount(totalArray); 
            }
            setDataFetched(true); 
            setTimeout(() => {
              dispatch({ type: 'REMOVE_STATUS_CODE_RECURRING_INVOICE_AMOUNT' });
            }, 1000);
          }
        }
      }, [customername, dataFetched, state.InvoiceList.recurrbillamountgetStatuscode , state.InvoiceList.Recurringbillamounts]);
    
        
    

      const handleBackBill = () => {
           props.onhandleback()
      }
    
      const formatDateForPayloadmanualinvoice = (date) => {
        if (!date) return null;
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().split('T')[0]; 
      };
    
    
      
    
      const handleInvoiceDate = (selectedDates) => {
     
           const date = selectedDates;

           console.log("Mathubala",date)
           setInvoiceDate(date);
           setAllFieldErrmsg('')
           if(!selectedDates){
            setInvoiceDateErrmsg("Please Select Date")
           }
           else{
            setInvoiceDateErrmsg('')
           }
    
           const formattedDate = formatDateForPayloadmanualinvoice(date);
           setFormatInvoiceDate(formattedDate)
      }
    
    
      const handleDueDate = (selectedDates) => {
            const date = selectedDates;
            setInvoiceDueDate(date);
            setAllFieldErrmsg('')
            if(!selectedDates){
              setInvoiceDueDateErrmsg("Please Select Date")
             }
             else{
              setInvoiceDueDateErrmsg('')
             }
    
            const formattedDate = formatDateForPayloadmanualinvoice(date);
            setFormatDueDate(formattedDate)
      }
    
      
      
    
     
    
    
               useEffect(() => {
                     if (invoicetotalamounts && invoicetotalamounts.length > 0) {
                     setBillAmounts(invoicetotalamounts);
                     } 
                     else {
                     console.error("No data from API or empty array");
                          }
           }, [invoicetotalamounts]);
    
     
    
    
    
    
             const handleSelectChange = (e) => {
                   const selectedDescription = e.target.value;  
                   const selectedOption = invoicetotalamounts.find(opt => opt.name === selectedDescription);
      
                   if (selectedOption) {
                     setBillAmounts([...billamounts, selectedOption]);
                     setAvailableOptions(availableOptions.filter(opt => opt.name !== selectedDescription));
                       }
                  };
      
    
    
    
             const handleAmountChange = (index, value) => {
                  const updatedData = [...billamounts];
                  updatedData[index] = { ...updatedData[index], amount: value }; 
                  setBillAmounts(updatedData);                                  
                  };
    
    
    
              const handleDelete = (item) => {
                 setBillAmounts(billamounts.filter(bill => bill.name !== item.name));
                 setAvailableOptions([...availableOptions, item]);
                  };
    
    
                  const [amenityArray,setamenityArray] = useState([])
                  console.log("amenityArray",amenityArray);

                  const handleNewRowChange = (index, field, value) => {
                    const updatedRows = [...newRows];
                    updatedRows[index][field] = value;
                     setNewRows(updatedRows);
                    };
         
         
                const handleDeleteNewRow = (index) => {
                      const updatedRows = newRows.filter((_, i) => i !== index);
                      setNewRows(updatedRows);
                     };
         

           useEffect(()=> {
    
              if(billamounts && billamounts.length > 0){
                  console.log("billamounts",billamounts);
        
              const  RoomRentItem = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 1); // Room Rent with id 1
              const  AdvanceAmount = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 2); // Adavance amount with id 2
              const  EbAmount = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 3); // EB Amount with id 3 

              setRentAmount(RoomRentItem)
              setAdvanceAmount(AdvanceAmount)
              setEBAmount(EbAmount)
    
              var  amenities = billamounts && billamounts.length > 0 && billamounts.filter(item => item.id != 1 && item.id != 2 && item.id != 3);
              console.log("amenities",amenities);
    
              const AmenityDetails = amenities.map(item => ({
                am_name: item.name,   
                amount : item.amount
                }));
                setAmenityDetails(AmenityDetails)
      
    
                const allRows = newRows.map(detail => ({
                  am_name: detail.description, 
                  amount: Number(detail.amount)
                })).filter(detail => detail.am_name && detail.amount); 
                console.log("allRows", allRows);
                
                const amenityArray = AmenityDetails.map(detail => ({
                  am_name: detail.am_name, 
                  amount: detail.amount
                })).filter(detail => detail.am_name && detail.amount); 
                console.log("amenityArray", amenityArray);
                
                
                // Combine allRows and amenityArray
                const combinedRows = [...amenityArray, ...allRows];
                console.log("combinedRows", combinedRows);
              
                setamenityArray(combinedRows)
    
             const  totalAmount = (
                parseFloat(EbAmount?.amount || 0) +
                parseFloat(RoomRentItem?.amount || 0) +
                parseFloat(AdvanceAmount?.amount || 0) +
                combinedRows.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0) );
                setTotalAmount(totalAmount)
    
                      }
    
        },[billamounts,newRows])
    
    
          
    
    
    
        const [allFieldErrmsg] = useState('');

    
    
          const handleCreateBill = () => {
    
               const allRows = [...billamounts, ...newRows];
    
                
  // Validate each row to ensure all fields are filled
  const incompleteRow = allRows.find(row => !row.description || !row.amount);

  if (incompleteRow) {
    setAllFieldErrmsg('Please fill all the details in the table.');
    return;
  }



               const amenityArray = amenityDetail.map(detail => ({
                  am_name: detail.am_name,
                  amount: detail.amount
                   })).filter(detail => detail.am_name && detail.amount);

    
                   if(!customername){
                    setCustomerErrmsg('Please Select  Customer')
                   }
                  //  if(!invoicenumber){
                  //     setInvoicenumberErrmsg("Please Update customer name")
                  //     return;
                  //   }
                   
    
                   if(!formatinvoicedate){
                    setInvoiceDateErrmsg('Please Select Invoice Date')
                   }
    
                   if(!formatduedate){
                    setInvoiceDueDateErrmsg('Please Select DueDate')
                   }
                 
    
                   if(!customername && !invoicenumber &&  !formatinvoicedate && !formatduedate){
                    setAllFieldErrmsg('Please Enter All Field')
                    return;
                   }
                  
                   if(customername && invoicenumber  && formatinvoicedate && formatduedate){
                    dispatch({
                      type: 'RECURRING-BILLS-ADD',
                      payload: { user_id: customername, date: formatinvoicedate , due_date :formatduedate ,
                      invoice_id: invoicenumber, room_rent : rentamount?.amount || 0 , eb_amount :ebamount?.amount || 0, total_amount : totalAmount , 
                      advance_amount:advanceAmount?.amount || 0,    amenity: amenityArray.length > 0 ? amenityArray : []
                      }
                      });

                      props.onhandleback()
                      setCustomerName('');
                      setInvoiceNumber('');
                      setInvoiceDate('')
                      setInvoiceDueDate('')
                      setAvailableOptions('');
                      setTotalAmount('')
                      setBillAmounts([]);
                      setNewRows([]);
                   }
    
                // setShowManualInvoice(true)
              
              }
    
    
    
    
                // const invoicerowsPerPage = 15;
                // const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
                // const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
              
                // const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
                // const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
                // const currentRowinvoice = bills?.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice);
              
              
              
              
                // const handleInvoicePageChange = (InvoicepageNumber) => {
                //   setinvoicecurrentPage(InvoicepageNumber);
                // };
              
                // const totalPagesinvoice = Math.ceil(bills?.length / invoicerowsPerPage);
                // console.log("invoicedetails", bills);
              
              
                // const renderPageNumbersInvoice = () => {
                //   const pageNumbersInvoice = [];
                //   let startPageInvoice = invoicecurrentPage - 1;
                //   let endPageInvoice = invoicecurrentPage + 1;
              
                //   if (invoicecurrentPage === 1) {
                //     startPageInvoice = 1;
                //     endPageInvoice = 3;
                //   }
              
                //   if (invoicecurrentPage === totalPagesinvoice) {
                //     startPageInvoice = totalPagesinvoice - 2;
                //     endPageInvoice = totalPagesinvoice;
                //   }
              
                //   if (invoicecurrentPage === 2) {
                //     startPageInvoice = 1;
                //     endPageInvoice = 3;
                //   }
              
                //   if (invoicecurrentPage === totalPagesinvoice - 1) {
                //     startPageInvoice = totalPagesinvoice - 2;
                //     endPageInvoice = totalPagesinvoice;
                //   }
              
                //   for (let i = startPageInvoice; i <= endPageInvoice; i++) {
                //     if (i > 0 && i <= totalPagesinvoice) {
                //       pageNumbersInvoice.push(
                //         <li key={i} style={{ margin: '0 5px' }}>
                //           <button
                //             style={{
                //               padding: '5px 10px',
                //               textDecoration: 'none',
                //               color: i === invoicecurrentPage ? '#007bff' : '#000000',
                //               cursor: 'pointer',
                //               borderRadius: '5px',
                //               display: 'inline-block',
                //               minWidth: '30px',
                //               textAlign: 'center',
                //               backgroundColor: i === invoicecurrentPage ? 'transparent' : 'transparent',
                //               border: i === invoicecurrentPage ? '1px solid #ddd' : 'none'
                //             }}
                //             onClick={() => handleInvoicePageChange(i)}
                //           >
                //             {i}
                //           </button>
                //         </li>
                //       );
                //     }
                //   }
              
                //   return pageNumbersInvoice;
                // };
    
    
      // const rowsPerPage = 20;
      // const [currentPage, setCurrentPage] = useState(1);
    
      // const indexOfLastRow = currentPage * rowsPerPage;
      // const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      // const currentRows = bills.slice(indexOfFirstRow, indexOfLastRow);
    
      // const handlePageChange = (pageNumber) => {
      //   setCurrentPage(pageNumber);
      // };
    
      // const totalPages = Math.ceil(bills.length / rowsPerPage);
    
      // const renderPageNumbers = () => {
      //   const pageNumbers = [];
      //   let startPage = currentPage - 1;
      //   let endPage = currentPage + 1;
    
      //   if (currentPage === 1) {
      //     startPage = 1;
      //     endPage = 3;
      //   }
    
      //   if (currentPage === totalPages) {
      //     startPage = totalPages - 2;
      //     endPage = totalPages;
      //   }
    
      //   if (currentPage === 2) {
      //     startPage = 1;
      //     endPage = 3;
      //   }
    
      //   if (currentPage === totalPages - 1) {
      //     startPage = totalPages - 2;
      //     endPage = totalPages;
      //   }
    
      //   for (let i = startPage; i <= endPage; i++) {
      //     if (i > 0 && i <= totalPages) {
      //       pageNumbers.push(
      //         <li key={i} style={{ margin: '0 5px' }}>
      //           <button
      //             style={{
      //               padding: '5px 10px',
      //               textDecoration: 'none',
      //               color: i === currentPage ? '#007bff' : '#000000',
      //               cursor: 'pointer',
      //               borderRadius: '5px',
      //               display: 'inline-block',
      //               minWidth: '30px',
      //               textAlign: 'center',
      //               backgroundColor: i === currentPage ? 'transparent' : 'transparent',
      //               border: i === currentPage ? '1px solid #ddd' : 'none'
      //             }}
      //             onClick={() => handlePageChange(i)}
      //           >
      //             {i}
      //           </button>
      //         </li>
      //       );
      //     }
      //   }
    
      //   return pageNumbers;
      // };
    
      // const itemsPerPage = 5;
      // const indexOfLastItem = currentPage * itemsPerPage;
      // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      // const currentItems = bills.slice(indexOfFirstItem, indexOfLastItem);
    
    
      const customDateInputInvoiceDate = (props) => {
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
                                               height: 50,
                        boxSizing: "border-box",
                        boxShadow:"none" 
                    }}
                />
                <img 
                    src={Calendars} 
                style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position:"absolute" ,right:10, top:"50%",transform:'translateY(-50%)' }} 
                    alt="Calendar" 
                    onClick={props.onClick} 
                />
            </div>
        );
    };


    const customDateInputDueDate = (props) => {
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
                                             height: 50,
                      boxSizing: "border-box",
                      boxShadow:"none" 
                  }}
              />
              <img 
                  src={Calendars} 
              style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position:"absolute" ,right:10, top:"50%",transform:'translateY(-50%)' }} 
                  alt="Calendar" 
                  onClick={props.onClick} 
              />
          </div>
      );
  };

    
  let serialNumber = 1;


    return(
        <>
            <div className='container ms-5 me-5'>

            <div style={{display:'flex',flexDirection:'row',marginTop:'40px'}} >
  <svg onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg>
  <p className='mt-1'>New Bill</p>
  </div>


  <div className='col-lg-7 col-md-6 col-sm-12 col-xs-12'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                  <Form.Label 
                    style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >
                    Select Hostel
                  </Form.Label>
                  <Form.Select aria-label="Default select example"
                    className='border' value={selectedHostel} onChange={(e) => handleHostelChange(e)} 
                    style={{fontSize: 16, color: "#4B4B4B",fontFamily: "Gilroy",lineHeight: '18.83px', fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9",  height: 38, borderRadius: 8}}>
                    
                    <option style={{ fontSize: 14, fontWeight: 600, }} selected value=''>Select PG</option>
                    {state.UsersList.hostelList && state.UsersList.hostelList.map((item) => (
                      <option key={item.id} value={item.id}> {item.Name} </option>
  ))}


                  </Form.Select>
    
            {hostelerrormsg.trim() !== "" && (
              <div>
         <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {hostelerrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {hostelerrormsg}
    </p>
  </div>
)}
                </Form.Group>

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
      {customernamefilter && customernamefilter.length > 0 && customernamefilter?.filter(u => 
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
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {customererrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {customererrmsg}
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
                 {invoicenumbererrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {invoicenumbererrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoicenumbererrmsg}
  </p>
</div>
)}
  
      </Form.Group>
    </div>

    


{/* <div style={{display:'flex',flexDirection:'row'}}> */}
<div className="row mb-3">
  {/* Invoice Date */}
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
          customInput={customDateInputInvoiceDate({
            value: invoicedate ? invoicedate.toLocaleDateString('en-GB') : '',
          })}
        />
      </div>
    </Form.Group>
    {invoicedateerrmsg.trim() !== "" && (
      <div className="d-flex align-items-center p-1">
        <MdError style={{ color: "red", marginRight: '5px' }} />
        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
          {invoicedateerrmsg}
        </label>
      </div>
    )}
  </div>

  {/* Due Date */}
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
          customInput={customDateInputDueDate({
            value: invoiceduedate ? invoiceduedate.toLocaleDateString('en-GB') : '',
          })}
        />
      </div>
    </Form.Group>
    {invoiceduedateerrmsg.trim() !== "" && (
      <div className="d-flex align-items-center p-1">
        <MdError style={{ color: "red", marginRight: '5px' }} />
        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
          {invoiceduedateerrmsg}
        </label>
      </div>
    )}
  </div>
</div>

{/* Global Error Message */}
{allfielderrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {allfielderrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {allfielderrmsg}
    </p>
  </div>
)}



       

    

    {/* Table */}
    <div className='col-lg-7 col-md-12 col-sm-12 col-xs-12 mt-2'>
      <Table responsive
className="Table_Design"
style={{
  height: "auto",
  overflow: "visible",
  tableLayout: "auto",
  borderRadius: "24px",
  border: "1px solid #DCDCDC",
}}>

        <thead style={{ backgroundColor: "#E7F1FF" }}>
          <tr>
            <th style={{paddingLeft:10,borderTopLeftRadius:24}}>S.No</th>
            <th>Description</th>
            <th>Total Amount</th>
            <th style={{borderTopRightRadius:24}}>Action</th>
          </tr>
        </thead>
        <tbody>

{billamounts && billamounts.length > 0 && billamounts.map((u, index) => (
<tr key={`bill-${index}`}>
<td style={{paddingLeft:10}}>{serialNumber++}</td>
<td style={{whiteSpace: "nowrap"}}>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
<p>{u.name}</p>
</div>
</td>
{/* <td style={{paddingTop:'35px',paddingLeft:'10px'}}>{u.used_unit ? u.used_unit : '-' }</td> */}
{/* <td style={{paddingTop:'35px',paddingLeft:'10px'}}>-</td> */}


<td style={{ verticalAlign: "middle", paddingTop: 0, paddingBottom: 0 }}>
  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ margin: "0 auto" }}>
    <Form.Group controlId={`amount-${index}`} style={{ margin: 0 }}>
      <Form.Label
        style={{
          fontFamily: "Gilroy",
          fontSize: 14,
          fontWeight: 500,
          color: "#222",
          display: "none", // Hidden if not used
        }}
      ></Form.Label>
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
        onChange={(e) => handleAmountChange(index, e.target.value)}
      />
    </Form.Group>
  </div>
</td>


      <td >
        <span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDelete(u)}>
        <img src={Closebtn} height={15} width={15} alt="delete" />
        </span>
      </td>
           </tr>
                 ))}


          {newRows && newRows.length > 0 && newRows.map((u, index) => (
             <tr key={`new-${index}`}>
              <td style={{paddingLeft:10}}>{serialNumber++}</td>
        <td style={{whiteSpace: "nowrap"}}>
              <div style={{alignItems:'center'}}>
                 <Form.Control
                 type="text"
                 placeholder="Enter description"
                 value={u.description}
                onChange={(e) => handleNewRowChange(index, 'description', e.target.value)}/>
             </div>
       </td>
       
    {/* <td style={{alignItems:'center'}}>
      <Form.Control
        type="text"
        placeholder="EB Unit"
        value={u.used_unit}
        onChange={(e) => handleNewRowChange(index, 'used_unit', e.target.value)}
      />
    </td>
    <td style={{alignItems:'center'}}>
      <Form.Control
        type="text"
        placeholder="Unit Price"
        value={u.per_unit_amount}
        onChange={(e) => handleNewRowChange(index, 'per_unit_amount', e.target.value)}
      />
    </td>
    <td style={{alignItems:'center'}}>
      <Form.Control
        type="text"
        placeholder="Enter actual amount"
        value={u.total_amount}
        onChange={(e) => handleNewRowChange(index, 'total_amount', e.target.value)}
      />
    </td> */}
   <td style={{ verticalAlign: "middle", textAlign: "center", padding: "8px" }}>
  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ margin: "0 auto" }}>
    <Form.Control
      type="text"
      placeholder="Enter amount"
      value={u.amount || ""}
      onChange={(e) => handleNewRowChange(index, "amount", e.target.value)}
      style={{
        padding: "8px",
        fontSize: "14px",
        fontFamily: "Gilroy",
        fontWeight: 500,
        color: "#4B4B4B",
        textAlign: "center",
      }}
    />
  </div>
</td>

    <td style={{alignItems:'center'}}>
      <span style={{cursor: 'pointer', color: 'red', marginLeft: '10px'}}
       onClick={() => handleDeleteNewRow(index)}
       >
        <img src={Closebtn} height={15} width={15} alt="delete" />
      </span>
    </td>
  </tr>
))}

{/* {selectedData && selectedData.length > 0 && selectedData.map((u, index) => (
<tr key={index}>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{paddingTop:'35px',paddingLeft:'10px'}}>
<p>{u.description}</p>
</div>
</td>
<td style={{paddingTop:'35px',paddingLeft:'10px'}}>{u.used_unit ? u.used_unit : '-' }</td>
<td style={{paddingTop:'35px',paddingLeft:'10px'}}>{u.per_unit_amount != null && u.per_unit_amount != '' && u.per_unit_amount != undefined ? u.per_unit_amount : '-' }</td>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
<Form.Group controlId={`actualAmount-${index}`}>
<Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}></Form.Label>
<Form.Control
style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}
type="text"
placeholder="Enter actual amount"
value={u.total_amount ?? 0}  // using nullish coalescing for safer default value
// onChange={(e) => handleActualAmountChange(index, e.target.value)} 
/>
</Form.Group>
</div>
</td>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
<Form.Group controlId={`amount-${index}`}>
<Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}></Form.Label>
<Form.Control
style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}
type="text"
placeholder="Enter total amount"
value={u.amount !== undefined ? Math.floor(u.amount) : 0} 
onChange={(e) => handleAmountChange(index, e.target.value)} 
/>
</Form.Group>
</div>
</td>

<td style={{ paddingTop: '35px' }}>
<span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDeletebilldata(u)}>
<img src={Closebtn} height={15} width={15} alt="delete" />
</span>
</td>
</tr>
))} */}


<tr>

<div className='col-lg-12 col-md-5 col-sm-12 col-xs-12 mt-1'>
    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
      <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
      
      </Form.Label>
      <Form.Select aria-label="Default select example" 
      onChange={handleSelectChange}
       className='border'>
<option value='' selected>Select</option>
{availableOptions && availableOptions.length > 0 && availableOptions.map((option, index) => (
  <option key={index} value={option.name}>
    {option.name}
  </option>
))}
</Form.Select>


    </Form.Group>

  </div>
  </tr>
</tbody>
     
      </Table>
    </div>
<div  style={{ display: "flex",flexDirection:"row" }}>
    <div><p style={{color:'#1E45E1',fontSize:'14px',fontWeight:600}}
     onClick={handleAddColumn}
     > + Add new column</p></div>

    <div className="totalamount" style={{alignItems:"center"}}>
      <h5>Total Amount ₹
        {totalAmount}
        </h5>
      <Button 
      onClick={handleCreateBill}
       className='w-80 mt-3 ' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 40,
       borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }} >
        Create Bill
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
export default RecurringBills;
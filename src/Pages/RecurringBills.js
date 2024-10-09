import React , {useState ,useEffect, useRef} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
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



const RecurringBills = () => {


    const state = useSelector(state => state)
   
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch({type: "USERLIST"})
      },[])
    
      const [customername , setCustomerName] =  useState ('');
      const [invoicenumber , setInvoiceNumber] =  useState ('');
      const [startdate , setStartDate] =  useState (null);
      const [enddate , setEndDate] =  useState (null);
      const [invoicedate , setInvoiceDate] =  useState (null);
      const [invoiceduedate , setInvoiceDueDate] =  useState (null);
    
      const [formatstartdate, setFormatStartDate] = useState(null)
      const [formatenddate, setFormatEndDate] = useState(null)
      const [formatinvoicedate, setFormatInvoiceDate] = useState(null)
      
      
      const [formatduedate, setFormatDueDate] = useState(null)
      console.log("formatinvoicedate",formatduedate);
    
      const [invoicetotalamounts,setInvoiceTotalAmount] = useState([])
      const [billamounts, setBillAmounts] = useState([])
      console.log("billamounts",billamounts);
      console.log("invoicetotalamounts",invoicetotalamounts);
    
      
    const [ebamount, setEBAmount] = useState('')
    const [rentamount , setRentAmount] = useState('')
    const [amenityDetail , setAmenityDetails] = useState([])
    console.log("amenityDetail",amenityDetail);
    
    const [totalAmount , setTotalAmount] = useState('')
    
    const [selectedData, setSelectedData] = useState([]);
    console.log("selectedData",selectedData)
    
      const startRef = useRef(null);
      const endRef = useRef(null);
      const invoiceRef = useRef(null);
      const dueRef = useRef(null);
    
    
      const [bills , setBills] = useState([])
      console.log("bills",bills);
      const [availableOptions, setAvailableOptions] = useState(invoicetotalamounts);
      
    
      const [newRows, setNewRows] = useState([]);
    
    const handleAddColumn = () => {
      const newRow = {
        description: '',
        used_unit: '',
        per_unit_amount: '',
        total_amount: '',
        amount: ''
      };
      setNewRows([...newRows, newRow]);
    };
    
    console.log("newRows",newRows);
    
    
        const [customererrmsg , setCustomerErrmsg] = useState('')
        const [invoicenumbererrmsg , setInvoicenumberErrmsg] = useState('')
        const [startdateerrmsg , setStartdateErrmsg] = useState('')
        const [enddateerrmsg , setEnddateErrmsg] = useState('')
        const [invoicedateerrmsg , setInvoiceDateErrmsg] = useState('')
        const [invoiceduedateerrmsg , setInvoiceDueDateErrmsg] = useState('')
        const [allfielderrmsg , setAllFieldErrmsg] = useState('')
      // useEffect(()=> {
      //  dispatch({type:'MANUAL-INVOICES-LIST'})
      //  },[])
    
      useEffect(() => {
        if (state.InvoiceList.ManualInvoicesgetstatuscode === 200 ) {
          // dispatch({ type: 'MANUAL-INVOICES-LIST' });
          setBills(state.InvoiceList.ManualInvoices);
        //   setLoading(true); 
      
          setTimeout(() => {
            dispatch({ type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST' });
            // setLoading(false); 
          }, 100);
        }
      }, [state.InvoiceList.ManualInvoicesgetstatuscode]); 
      
      useEffect(() => {
        if (state.InvoiceList.manualInvoiceAddStatusCode === 200 ) {
          dispatch({ type: 'MANUAL-INVOICES-LIST' });
          setBills(state.InvoiceList.ManualInvoices);
        //   setLoading(true); 
      
          setTimeout(() => {
            dispatch({ type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD' });
            // setLoading(false); 
          }, 1000);
        }
      }, [state.InvoiceList.manualInvoiceAddStatusCode]); // Add `loading` to the dependency array
      
    
    
      useEffect(() => {
        console.log("invoice added executed");
        if (state.InvoiceList?.InvoiceListStatusCode == 200) {
         
          dispatch({type:'MANUAL-INVOICES-LIST'})
          setBills(state.InvoiceList.ManualInvoices)
          // setLoading(true);
          setTimeout(() => {
            dispatch({ type: 'CLEAR_INVOICE_LIST' });
          }, 1000);
        }
      }, [state.InvoiceList?.InvoiceListStatusCode])
    
    
    
    
    
    
    
      // console.log("InvoiceList", state.InvoiceList);
     
    
      useEffect(() => {
        console.log("statuscode", state.InvoiceList.message);
        if (state.InvoiceList.message != "" && state.InvoiceList.message != null) {
          console.log("statuscode_number", state.InvoiceList.UpdateInvoiceStatusCode);
          dispatch({type:'MANUAL-INVOICES-LIST'})
          setBills(state.InvoiceList.ManualInvoices)
          // setLoading(true)
          setTimeout(() => {
            dispatch({ type: 'CLEAR_INVOICE_UPDATE_LIST' });
          }, 100);
    
    
        }
      }, [state.InvoiceList])


      const options = {
        dateFormat: 'd/m/Y',
        defaultDate: null,
        // defaultDate: selectedDate,
        maxDate: new Date(),
        minDate: null,
      };
    
      useEffect(() => {
        if (startRef.current) {
          startRef.current.flatpickr.set(options);
        }
        if (endRef.current) {
          endRef.current.flatpickr.set(options);
        }
        if (invoiceRef.current) {
          invoiceRef.current.flatpickr.set(options);
        }
        if (dueRef.current) {
          dueRef.current.flatpickr.set(options);
        }
    }, [startdate, enddate , invoicedate, invoiceduedate ])
    
    
      const handleCustomerName = (e) => {
        setCustomerName(e.target.value)
        if(!e.target.value){
          setCustomerErrmsg("Please Select Name")
        }
        else{
          setCustomerErrmsg('')
        }
        setStartDate('');
        setEndDate('');
        setSelectedData('');
        // setAvailableOptions('');
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
        if (!dataFetched) {
          dispatch({
            type: 'GET-MANUAL-INVOICE-AMOUNTS',
            payload: {
              user_id: customername,
              start_date: formatstartdate,
              end_date: formatenddate
            }
          });
    
        
    
          if (state.InvoiceList.manualInvoiceStatusCode === 200) {
            const totalArray = state?.InvoiceList?.ManualInvoice?.total_array;
            
            if (totalArray) {
              setInvoiceTotalAmount(totalArray); 
            }
            setDataFetched(true); 
            setTimeout(() => {
              dispatch({ type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_AMOUNT_GET' });
            }, 1000);
          }
        }
      }, [customername, formatstartdate, formatenddate, dataFetched, state.InvoiceList.manualInvoiceStatusCode , state.InvoiceList.ManualInvoice.total_array]);
    
        
    
    
      const formatDateForPayloadmanualinvoice = (date) => {
        if (!date) return null;
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().split('T')[0]; 
      };
    
    
      const handlestartDate = (selectedDates) => {
            const date = selectedDates[0];
            setStartDate(date);
    
               if(!selectedDates){
                setStartdateErrmsg("Please Select Date")
               }
               else{
                setStartdateErrmsg('')
               }
           
           const formattedDate = formatDateForPayloadmanualinvoice(date);    
           setFormatStartDate(formattedDate)
    
      }
    
      const handleEndDate = (selectedDates) => {
           const date = selectedDates[0];
           setEndDate(date);
           if(!selectedDates){
            setEnddateErrmsg("Please Select Date")
           }
           else{
            setEnddateErrmsg('')
           }
    
          const formattedDate = formatDateForPayloadmanualinvoice(date);
          setFormatEndDate(formattedDate)
      }
    
      const handleInvoiceDate = (selectedDates) => {
           const date = selectedDates[0];
           setInvoiceDate(date);
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
            const date = selectedDates[0];
            setInvoiceDueDate(date);
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
                   const selectedOption = invoicetotalamounts.find(opt => opt.description === selectedDescription);
      
                   if (selectedOption) {
                     setBillAmounts([...billamounts, selectedOption]);
                     setAvailableOptions(availableOptions.filter(opt => opt.description !== selectedDescription));
                       }
                  };
      
    
    
    
             const handleAmountChange = (index, value) => {
                  const updatedData = [...billamounts];
                  updatedData[index] = { ...updatedData[index], amount: value }; 
                  setBillAmounts(updatedData);                                  
                  };
    
    
    
              const handleDelete = (item) => {
                 setBillAmounts(billamounts.filter(bill => bill.description !== item.description));
                 setAvailableOptions([...availableOptions, item]);
                  };
    
    
    
           useEffect(()=> {
    
              if(billamounts && billamounts.length > 0){
                  console.log("billamounts",billamounts);
        
              const  EbAmount = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 10);// EB Amount with id 10 
              const  RoomRentItem = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 50); // Room Rent with id 50
               console.log("RoomRentItem",RoomRentItem);
      
      
              setEBAmount(EbAmount)
              setRentAmount(RoomRentItem)
    
              var  amenities = billamounts && billamounts.length > 0 && billamounts.filter(item => item.id != 10 && item.id != 50);
              console.log("amenities",amenities);
    
             const AmenityDetails = amenities.map(item => ({
                am_name: item.description,   
                amount: item.amount
                }));
                setAmenityDetails(AmenityDetails)
      
    
    
             const  totalAmount = (
                parseFloat(EbAmount?.amount || 0) +
                parseFloat(RoomRentItem?.amount || 0) +
                AmenityDetails.reduce((sum, amenity) => sum + parseFloat(amenity.amount || 0), 0) );
                setTotalAmount(totalAmount)
    
                      }
    
        },[billamounts])
    
    
           const handleNewRowChange = (index, field, value) => {
               const updatedRows = [...newRows];
               updatedRows[index][field] = value;
                setNewRows(updatedRows);
               };
    
    
           const handleDeleteNewRow = (index) => {
                 const updatedRows = newRows.filter((_, i) => i !== index);
                 setNewRows(updatedRows);
                };
    
    
    
    
    
    
    
          const handleCreateBill = () => {
    
               const allRows = [...billamounts, ...newRows];
    
               const amenityArray = amenityDetail.map(detail => ({
                  am_name: detail.am_name,
                  amount: detail.amount
                   })).filter(detail => detail.am_name && detail.amount);
    
                   if(!customername){
                    setCustomerErrmsg('Please Select  Customer')
                    return;
                   }
                   if(!invoicenumber){
                      setInvoicenumberErrmsg("Please Update customer name")
                      return;
                    }
                   
    
                   if(!startdate){
                    setStartdateErrmsg('Please Select  Date')
                    return;
                   }
    
                   if(!enddate){
                    setEnddateErrmsg('Please Select  Date')
                    return;
                   }
    
                   if(!formatinvoicedate){
                    setInvoiceDateErrmsg('Please Select  Date')
                    return;
                   }
    
                   if(!formatduedate){
                    setInvoiceDueDateErrmsg('Please Select  Date')
                    return;
                   }
                   if(!customername || !invoicenumber || !startdate || !enddate || !formatinvoicedate || !formatduedate){
                    setAllFieldErrmsg('Please Enter All Field')
                    setTimeout(()=> {
                      setAllFieldErrmsg('')
                    },2000)
                    return;
                   }
    
                  
                   if(customername && invoicenumber && formatstartdate && formatenddate && formatinvoicedate && formatduedate){
                    dispatch({
                      type: 'MANUAL-INVOICE-ADD',
                      payload: { user_id: customername, date: formatinvoicedate , due_date :formatduedate ,
                      invoice_id: invoicenumber, room_rent : rentamount?.amount , eb_amount :ebamount?.amount || 0, total_amount : totalAmount , 
                      amenity: amenityArray.length > 0 ? amenityArray : []
                      }
                      });
                   }
    
                // setShowManualInvoice(true)
                setCustomerName('');
                setInvoiceNumber('');
                setStartDate('');
                setEndDate('');
                setInvoiceDate('')
                setInvoiceDueDate('')
                setSelectedData('')
                setAvailableOptions('');
                setTotalAmount('')
                setBillAmounts([]);
                setNewRows([]);
                }
    
    
    
    
                const invoicerowsPerPage = 15;
                const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
                const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
              
                const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
                const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
                const currentRowinvoice = bills?.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice);
              
              
              
              
                const handleInvoicePageChange = (InvoicepageNumber) => {
                  setinvoicecurrentPage(InvoicepageNumber);
                };
              
                const totalPagesinvoice = Math.ceil(bills?.length / invoicerowsPerPage);
                console.log("invoicedetails", bills);
              
              
                const renderPageNumbersInvoice = () => {
                  const pageNumbersInvoice = [];
                  let startPageInvoice = invoicecurrentPage - 1;
                  let endPageInvoice = invoicecurrentPage + 1;
              
                  if (invoicecurrentPage === 1) {
                    startPageInvoice = 1;
                    endPageInvoice = 3;
                  }
              
                  if (invoicecurrentPage === totalPagesinvoice) {
                    startPageInvoice = totalPagesinvoice - 2;
                    endPageInvoice = totalPagesinvoice;
                  }
              
                  if (invoicecurrentPage === 2) {
                    startPageInvoice = 1;
                    endPageInvoice = 3;
                  }
              
                  if (invoicecurrentPage === totalPagesinvoice - 1) {
                    startPageInvoice = totalPagesinvoice - 2;
                    endPageInvoice = totalPagesinvoice;
                  }
              
                  for (let i = startPageInvoice; i <= endPageInvoice; i++) {
                    if (i > 0 && i <= totalPagesinvoice) {
                      pageNumbersInvoice.push(
                        <li key={i} style={{ margin: '0 5px' }}>
                          <button
                            style={{
                              padding: '5px 10px',
                              textDecoration: 'none',
                              color: i === invoicecurrentPage ? '#007bff' : '#000000',
                              cursor: 'pointer',
                              borderRadius: '5px',
                              display: 'inline-block',
                              minWidth: '30px',
                              textAlign: 'center',
                              backgroundColor: i === invoicecurrentPage ? 'transparent' : 'transparent',
                              border: i === invoicecurrentPage ? '1px solid #ddd' : 'none'
                            }}
                            onClick={() => handleInvoicePageChange(i)}
                          >
                            {i}
                          </button>
                        </li>
                      );
                    }
                  }
              
                  return pageNumbersInvoice;
                };
    
    
      const rowsPerPage = 20;
      const [currentPage, setCurrentPage] = useState(1);
    
      const indexOfLastRow = currentPage * rowsPerPage;
      const indexOfFirstRow = indexOfLastRow - rowsPerPage;
      const currentRows = bills.slice(indexOfFirstRow, indexOfLastRow);
    
      const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
      };
    
      const totalPages = Math.ceil(bills.length / rowsPerPage);
    
      const renderPageNumbers = () => {
        const pageNumbers = [];
        let startPage = currentPage - 1;
        let endPage = currentPage + 1;
    
        if (currentPage === 1) {
          startPage = 1;
          endPage = 3;
        }
    
        if (currentPage === totalPages) {
          startPage = totalPages - 2;
          endPage = totalPages;
        }
    
        if (currentPage === 2) {
          startPage = 1;
          endPage = 3;
        }
    
        if (currentPage === totalPages - 1) {
          startPage = totalPages - 2;
          endPage = totalPages;
        }
    
        for (let i = startPage; i <= endPage; i++) {
          if (i > 0 && i <= totalPages) {
            pageNumbers.push(
              <li key={i} style={{ margin: '0 5px' }}>
                <button
                  style={{
                    padding: '5px 10px',
                    textDecoration: 'none',
                    color: i === currentPage ? '#007bff' : '#000000',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    display: 'inline-block',
                    minWidth: '30px',
                    textAlign: 'center',
                    backgroundColor: i === currentPage ? 'transparent' : 'transparent',
                    border: i === currentPage ? '1px solid #ddd' : 'none'
                  }}
                  onClick={() => handlePageChange(i)}
                >
                  {i}
                </button>
              </li>
            );
          }
        }
    
        return pageNumbers;
      };
    
      const itemsPerPage = 5;
      const indexOfLastItem = currentPage * itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      const currentItems = bills.slice(indexOfFirstItem, indexOfLastItem);
    
    
    
    
    


    return(
        <>
            <div className='container ms-5 me-5'>

{/* <div style={{display:'flex',flexDirection:'row'}}> */}
{/* <MdOutlineKeyboardDoubleArrowLeft onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}}  /> */}
{/* <svg onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg> */}
{/* <p className='mt-1'>New Bill</p> */}


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
       {state.UsersList?.Users.filter(u => u.Bed !== 'undefined' && u.Bed !== '0' && u.Bed.trim() !== '' && u.Rooms !== 'undefined' && u.Rooms !== '0' && u.Rooms.trim() !== '') 
        .map((u) => (
        <option  value={u.ID}>{u.Name}</option>
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



            <div className='col-lg-3 col-md-4 col-sm-12 col-xs-12'>
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

    <div style={{display:'flex',flexDirection:'row'}}>
    <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12 me-4'>
                  <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Start Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                  <div style={{ position: 'relative' }}>
                    <label
                      htmlFor="date-input"
                      style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 7,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "#222222",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Ensure space between text and icon
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        if (startRef.current) {
                          startRef.current.flatpickr.open();
                        }
                      }}
                    >
                      {startdate ? startdate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                      <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                    </label>
                    <Flatpickr
                      ref={startRef}
                      options={options}
                      value={startdate}
                      onChange={handlestartDate}
                      style={{
                        padding: 10,
                        fontSize: 16,
                        width: "100%",
                        borderRadius: 8,
                        border: "1px solid #D9D9D9",
                        position: 'absolute',
                        top: 100,
                        left: 100,
                        zIndex: 1000,
                        display: "none"
                      }}
                    />
                  </div>
                  {startdateerrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {startdateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {startdateerrmsg}
  </p>
</div>
)}
  
                </div>

                <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
                  <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>End Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                  <div style={{ position: 'relative' }}>
                    <label
                      htmlFor="date-input"
                      style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 7,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "#222222",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Ensure space between text and icon
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        if (endRef.current) {
                          endRef.current.flatpickr.open();
                        }
                      }}
                    >
                      {enddate ? enddate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                      <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                    </label>
                    <Flatpickr
                      ref={endRef}
                      options={options}
                      value={enddate}
                      onChange={handleEndDate}
                      style={{
                        padding: 10,
                        fontSize: 16,
                        width: "100%",
                        borderRadius: 8,
                        border: "1px solid #D9D9D9",
                        position: 'absolute',
                        top: 100,
                        left: 100,
                        zIndex: 1000,
                        display: "none"
                      }}
                    />
                  </div>

                  {enddateerrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {enddateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {enddateerrmsg}
  </p>
</div>
)}
                </div>
                </div>


<div style={{display:'flex',flexDirection:'row'}}>
    <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12 me-4'>
                  <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Invoice Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                  <div style={{ position: 'relative' }}>
                    <label
                      htmlFor="date-input"
                      style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 7,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "#222222",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between", // Ensure space between text and icon
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        if (invoiceRef.current) {
                          invoiceRef.current.flatpickr.open();
                        }
                      }}
                    >
                      {invoicedate ? invoicedate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                      <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                    </label>
                    <Flatpickr
                      ref={invoiceRef}
                      options={options}
                      value={invoicedate}
                      onChange={handleInvoiceDate}
                      style={{
                        padding: 10,
                        fontSize: 16,
                        width: "100%",
                        borderRadius: 8,
                        border: "1px solid #D9D9D9",
                        position: 'absolute',
                        top: 100,
                        left: 100,
                        zIndex: 1000,
                        display: "none"
                      }}
                    />
                  </div>
                  {invoicedateerrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {invoicedateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoicedateerrmsg}
  </p>
</div>
)}
  
                </div>

                 <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
                  <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Due Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                  <div style={{ position: 'relative' }}>
                    <label
                      htmlFor="date-input"
                      style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 7,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "#222222",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        if (dueRef.current) {
                          dueRef.current.flatpickr.open();
                        }
                      }}
                    >
                      {invoiceduedate ? invoiceduedate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                      <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                    </label>
                    <Flatpickr
                      ref={dueRef}
                      options={options}
                      value={invoiceduedate}
                      onChange={handleDueDate}
                      style={{
                        padding: 10,
                        fontSize: 16,
                        width: "100%",
                        borderRadius: 8,
                        border: "1px solid #D9D9D9",
                        position: 'absolute',
                        top: 100,
                        left: 100,
                        zIndex: 1000,
                        display: "none"
                      }}
                    />
                  </div>
                  {invoiceduedateerrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {invoiceduedateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoiceduedateerrmsg}
  </p>
</div>
)}
  
                </div> 
                {allfielderrmsg.trim() !== "" && (
<div>
  <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
    {allfielderrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {allfielderrmsg}
  </p>
</div>
)}
                </div>


       

    

    {/* Table */}
    <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
      <Table className="ebtable mt-2" responsive>

        <thead style={{ backgroundColor: "#E7F1FF" }}>
          <tr>
            <th>Description</th>
            <th>EB Unit </th>
            <th>Unit Price </th>
            <th>Actual Amount</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

{billamounts && billamounts.length > 0 && billamounts.map((u, index) => (
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
<span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDelete(u)}>
<img src={Closebtn} height={15} width={15} alt="delete" />
</span>
</td>
</tr>
))}


{newRows && newRows.length > 0 && newRows.map((u, index) => (
  <tr key={`new-${index}`}>
    <td>
      <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{alignItems:'center'}}>
        <Form.Control
          type="text"
          placeholder="Enter description"
          value={u.description}
          onChange={(e) => handleNewRowChange(index, 'description', e.target.value)}
        />
      </div>
    </td>
    <td style={{alignItems:'center'}}>
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
    </td>
    <td style={{alignItems:'center'}}>
      <Form.Control
        type="text"
        placeholder="Enter total amount"
        value={u.amount}
        onChange={(e) => handleNewRowChange(index, 'amount', e.target.value)}
      />
    </td>
    <td style={{alignItems:'center'}}>
      <span style={{cursor: 'pointer', color: 'red', marginLeft: '10px'}}
    //    onClick={() => handleDeleteNewRow(index)}
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
    //   onChange={handleSelectChange}
       className='border'>
<option value=''>Select</option>
{/* {availableOptions && availableOptions.length > 0 && availableOptions.map((option, index) => (
  <option key={index} value={option.description}>
    {option.description}
  </option>
))} */}
</Form.Select>


    </Form.Group>

  </div>
  </tr>
</tbody>
     
      </Table>
    </div>

    <div><p style={{color:'#1E45E1',fontSize:'14px',fontWeight:600}}
    //  onClick={handleAddColumn}
     > + Add new column</p></div>

    <div style={{ float: 'right', marginRight: '130px' }}>
      <h5>Total Amount ₹
        {/* {totalAmount} */}
        </h5>
      <Button 
    //   onClick={handleCreateBill}
       className='w-80 mt-3' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 40, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }} >
        Create Bill
      </Button>
    </div>
  {/* </div> */}
  </div>
        </>
    )
}
export default RecurringBills;
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from "react-bootstrap";
import { MdError } from "react-icons/md";
import DatePicker from 'react-datepicker';
import Closebtn from '../Assets/Images/CloseCircle.png';
import { useDispatch, useSelector } from "react-redux";
import Calendars from '../Assets/Images/New_images/calendar.png'
import {
  Autobrightness,
  Call,
  Sms,
  House,
  Buildings,
  ArrowLeft2,
  ArrowRight2,
  MoreCircle,
} from "iconsax-react";
import {
  Modal,
  Form,
  Row,
  Col,
  Button,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { CloseCircle } from "iconsax-react";
import Edit from '../Assets/Images/Edit-blue.png';
import Delete from '../Assets/Images/Delete_red.png';
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { PinDropSharp } from "@material-ui/icons";
import { propsToClassKey } from "@mui/styles";

function UserListInvoice(props) {
  const state = useSelector((state) => state);
  console.log(state,"statuss");
  
  const dispatch = useDispatch();
console.log("propss",props);

  const popupRef = useRef(null);
  const [invoicerowsPerPage, setInvoicerowsPerPage] = useState(10);
  const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
 
  const [activeId, setActiveId] = useState(null);
  const [roomDetails, setRoomDetails] = useState(props.roomDetails || false);
 
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
   const [currentView, setCurrentView] = useState(null);
   const [customererrmsg , setCustomerErrmsg] = useState('')
    const [billamounts, setBillAmounts] = useState([])
     
     const [totalAmount , setTotalAmount] = useState('')
     const [selectedData, setSelectedData] = useState([]);
     const [tableErrmsg, setTableErrmsg] = useState('');
     const [newRows, setNewRows] = useState([{"S.NO": 1,"am_name":'', "amount" : "0"}]);
     
     const [invoicenumbererrmsg , setInvoicenumberErrmsg] = useState('')
     const [startdateerrmsg , setStartdateErrmsg] = useState('')
     const [enddateerrmsg , setEnddateErrmsg] = useState('')
     const [invoicedateerrmsg , setInvoiceDateErrmsg] = useState('')
     const [invoiceduedateerrmsg , setInvoiceDueDateErrmsg] = useState('')
     const [allfielderrmsg , setAllFieldErrmsg] = useState('')
    
     let serialNumber = 1;
  const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
  const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
  const currentRowinvoice = invoiceFilterddata?.slice(
    indexOfFirstRowinvoice,
    indexOfLastRowinvoice
  );

  const handleInvoicePageChange = (InvoicepageNumber) => {
    setinvoicecurrentPage(InvoicepageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setInvoicerowsPerPage(Number(event.target.value));
  };

  const totalPagesinvoice = Math.ceil(
    invoiceFilterddata?.length / invoicerowsPerPage
  );

  const formatDateForPayloadmanualinvoice = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split('T')[0]; 
  };

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
  //         <li key={i} style={{ margin: "0 5px" }}>
  //           <button
  //             style={{
  //               padding: "5px 10px",
  //               textDecoration: "none",
  //               color: i === invoicecurrentPage ? "#007bff" : "#000000",
  //               cursor: "pointer",
  //               borderRadius: "5px",
  //               display: "inline-block",
  //               minWidth: "30px",
  //               textAlign: "center",
  //               backgroundColor:
  //                 i === invoicecurrentPage ? "transparent" : "transparent",
  //               border: i === invoicecurrentPage ? "1px solid #ddd" : "none",
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
  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoice_details);
  }, [state.UsersList.customerdetails.invoice_details]);

  const handleAddColumn = () => {
    const newRow = {
      am_name: '',
      used_unit: '',
      per_unit_amount: '',
      total_amount: '',
      amount: ''
    };
    setNewRows([...newRows, newRow]);
    console.log("Updated Rows:", [...newRows, newRow]);
  };
  // const handleAddColumn = () => {
  //   const newRow = {
  //     "S.NO": newRows.length + 1, // Auto-increment S.NO
  //     am_name: "",
  //     amount: "0"
  //   };

  //   // Update newRows state with a new row added
  //   setNewRows([...newRows, newRow]);
  //   console.log("Updated Rows:", [...newRows, newRow]);
  // };
  const handleCustomerName = (e) => {
    setCustomerName(e.target.value)
    setAllFieldErrmsg('')
    if(!e.target.value){
      setCustomerErrmsg("Please Select Name")
    }
    else{
      setCustomerErrmsg('')
    }
    setStartDate('');
    setEndDate('');
    setSelectedData('');
    setBillAmounts('')
    setTotalAmount('')
  }

  const handlestartDate = (selectedDates) => {
    setAllFieldErrmsg('')
    const date = selectedDates
    setStartDate(date);

       if(!selectedDates){
        setStartdateErrmsg("Please Select Date")
       }
       else{
        setStartdateErrmsg('')
        setEnddateErrmsg('')
       }
   
   const formattedDate = formatDateForPayloadmanualinvoice(date);    
   setFormatStartDate(formattedDate)

}

const handleEndDate = (selectedDates) => {
  setAllFieldErrmsg('')
  const date = selectedDates
  setEndDate(date);
  if(!selectedDates){
   setEnddateErrmsg("Please Select Date")
  }
  else{
   setEnddateErrmsg('')
   setStartdateErrmsg('')
  }

 const formattedDate = formatDateForPayloadmanualinvoice(date);
 setFormatEndDate(formattedDate)
}

const handleInvoiceDate = (selectedDates) => {
  setAllFieldErrmsg('')
  const date = selectedDates
  setInvoiceDate(date);
  if(!selectedDates){
   setInvoiceDateErrmsg("Please Select Date")
  }
  else{
   setInvoiceDateErrmsg('')
   setEnddateErrmsg('')
   setStartdateErrmsg('')
  }

  const formattedDate = formatDateForPayloadmanualinvoice(date);
  setFormatInvoiceDate(formattedDate)
}

 
const handleDueDate = (selectedDates) => {
  setAllFieldErrmsg('')
  const date = selectedDates
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

const handleNewRowChange = (index, field, value) => {
  const updatedRows = [...newRows];
  updatedRows[index][field] = value;
   setNewRows(updatedRows);
  };

  const handleDeleteNewRow = (index) => {
    const updatedRows = newRows.filter((_, i) => i !== index);
    setNewRows(updatedRows);
   };

  const handleShowDots = (item) => {
    console.log("ClickedID:", item); // Debugging
    setActiveId((prevId) => (prevId === item.id ? null : item.id)); // Toggle logic
    
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveId(null);
    }
  };
   useEffect(() => {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
  const handleEditBill = (item) => {
    console.log(item,"items");
    
    setIsEditing(true);
    console.log("editpropsing",isEditing);
    console.log("editprops",props)
    setCurrentView(item);
    
    
    dispatch({ type: 'USERROOMAVAILABLEFALSE' });
  
  
  
    // props.setRoomDetail(false)
  };
  useEffect(() => {
    if (currentView) {
     
      setCustomerName (currentView.hos_user_id);
      setInvoiceNumber(currentView.Invoices)
      if (currentView.DueDate) {
        const parsedDate = new Date(currentView.DueDate); // Convert to Date object
        if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
          setInvoiceDueDate(parsedDate); // Set the date object in state
        } else {
          console.error('Invalid DueDate:', currentView.DueDate);
        }
      }
     
      if (currentView.Date) {
        const parsedDate = new Date(currentView.Date); // Convert to Date object
        if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
          setInvoiceDate(parsedDate); // Set the date object in state
        } else {
          console.error('Invalid DueDate:', currentView.Date);
        }
      }
      if (currentView.start_date ) {
        console.log("StartDate", currentView.start_date);
        const parsedDate = new Date(currentView.start_date); // Convert to Date object
        if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
          setStartDate(parsedDate); // Set the date object in state
        } else {
          console.error('Invalid startDate:', currentView.start_date);
        }
      }
      if (currentView.end_date ) {
        console.log("Enddate", currentView.end_date);
        const parsedDate = new Date(currentView.end_date); // Convert to Date object
        if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
          setEndDate(parsedDate); // Set the date object in state
        } else {
          console.error('Invalid endDate:', currentView.end_date);
        }
      }
      
    setTotalAmount(currentView.Amount)
  setNewRows(currentView.amenity)
    
    }
  }, [currentView]);

  useEffect(() => {
    console.log("After", isEditing);
  }, [isEditing]);

  console.log("props",props)

    // useEffect(() =>{
    //     if(state.UsersList.userRoomfor){
         
    //       console.log("state.UsersList.userRoomfor",state.UsersList.userRoomfor);
    //       // setIsEditing(true);
    //         // props.setRoomDetail(false)
             
    //     }
    //   },[state.UsersList.userRoomfor])
 



  // useEffect(() =>{
  //   if(state.UsersList.userRoomfor){
     
  //     setRoomDetails(false);
  //   }
   

  // },[state.UsersList.userRoomfor])

  const handleDeleteBill = (id) => {
   
  };
  const handleClose = () => {
  }
  const customStartDateInput = (props) => {
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

const customEndDateInput = (props) => {
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
  
const customInvoiceDateInput = (props) => {
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


const customInvoiceDueDateInput = (props) => {
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
  return (
    <>

      <div style={{
                            // height: "400px",
                            height: currentRowinvoice?.length >= 3 ? "250px" : "auto",
                            overflowY: "auto",
                            borderRadius: "24px",
                            border: "1px solid #DCDCDC",
                            // borderBottom:"none"
                          }}>
                           
        <Table  responsive="md"
                            className="Table_Design"
                            style={{ border: "1px solid #DCDCDC",borderBottom:"1px solid transparent",borderEndStartRadius:0,borderEndEndRadius:0}} >
          <thead
            style={{
              color: "gray",
              fontSize: "11px",
              marginLeft: 10,
              backgroundColor: "#E7F1FF",
              position:"sticky",
              top:0,
              zIndex:1,
            }}
          >
            <tr className="" style={{ height: "30px" }}>
              <th
                style={{
                  textAlign: "center",
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Invoice number
              </th>
              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Dated
              </th>
              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Due Date
              </th>

              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Due
              </th>

              <th
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Status
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody
            style={{
              height: "50px",
              fontSize: "11px",
              verticalAlign: "middle",
            }}
          >
            {currentRowinvoice?.map((view) => {
              let Dated = new Date(view.Date);

              let day = Dated.getDate();
              let month = Dated.getMonth() + 1; // Months are zero-based
              let year = Dated.getFullYear();

              let formattedDate = `${day}/${month}/${year}`;

              let dueDated = new Date(view.DueDate);

              let daydue = dueDated.getDate();
              let monthdue = dueDated.getMonth() + 1; // Months are zero-based
              let yeardue = dueDated.getFullYear();

              let DueformattedDate = `${daydue}/${monthdue}/${yeardue}`;

              return (
                <tr key={view.id} style={{ marginTop: "20px" }}>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight: 500,
                      fontSize: "16px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    {view.Invoices}
                  </td>

                  <td>
                    <span
                      style={{
                        backgroundColor: "#EBEBEB",
                        paddingTop: "3px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingBottom: "3px",
                        borderRadius: "10px",
                        lineHeight: "1.5em",
                        margin: "0",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                      {formattedDate}
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        backgroundColor: "#EBEBEB",
                        paddingTop: "3px",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        paddingBottom: "3px",
                        borderRadius: "10px",
                        lineHeight: "1.5em",
                        margin: "0",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                      }}
                    >
                      {DueformattedDate}
                    </span>
                  </td>
                  <td
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    ₹{view.Amount}
                  </td>
                  <td
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      fontFamily: "Gilroy",
                    }}
                  >
                    ₹{view.BalanceDue}
                  </td>
                  <td>
                    <span
                      style={{
                        color: "black",
                        backgroundColor:
                          view.Status === "Success" ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        fontSize: "14px",
                        fontWeight: 500,
                        borderRadius: "10px",
                      }}
                    >
                      {view.Status === "Success" ? "Paid" : "UnPaid"}
                    </span>
                  </td>
                  {/* <td style={view.Status === "Paid" ? { color: "green", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"} : { color: "red", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"}}>{view.Status == Paid ? 'Paid' : 'UnPaid'}</td> */}
                  <td style={{ textAlign: 'center', verticalAlign: 'middle', border: "none" }} className=''>
                  <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        cursor: "pointer",
                        height: 40,
                        width: 40,
                        borderRadius: 100,
                        border: "1px solid #EFEFEF",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        position: "relative",
                        zIndex: 1000,
                      }}
                      onClick={() =>
                        handleShowDots(view)
                      }
                    >
                      <PiDotsThreeOutlineVerticalFill
                        style={{ height: 20, width: 20 }}
                      />
                    {activeId === view.id && (
              <div
                ref={popupRef}
                style={{
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  position: "absolute",
                  right: 50,
                  top: 20,
                  width: 163,
                  border: "1px solid #EBEBEB",
                  borderRadius: 10,
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  zIndex: 1000,
                }}
              >
                <div style={{ padding: 10 }}>
                  <div
                    className={`mb-3 d-flex justify-content-start align-items-center gap-2 ${
                      props.billEditPermission ? "disabled" : ""
                    }`}
                    style={{
                      cursor: props.billEditPermission ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!props.billEditPermission) {
                        handleEditBill(view);
                      }
                    }}
                  >
                    <img
                      src={Edit}
                      style={{
                        height: 16,
                        width: 16,
                        filter: props.billEditPermission ? "grayscale(100%)" : "none",
                      }}
                      alt="Edit"
                    />
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy, sans-serif",
                        color: props.billEditPermission ? "#ccc" : "#222222",
                      }}
                    >
                      Edit
                    </label>
                  </div>
                  <div
                    className={`mb-2 d-flex justify-content-start align-items-center gap-2 ${
                      props.billDeletePermission ? "disabled" : ""
                    }`}
                    style={{
                      cursor: props.billDeletePermission ? "not-allowed" : "pointer",
                    }}
                    onClick={() => {
                      if (!props.billDeletePermission) {
                        handleDeleteBill(view)
                      }
                    }}
                  >
                    <img
                      src={Delete}
                      style={{
                        height: 16,
                        width: 16,
                        filter: props.billDeletePermission ? "grayscale(100%)" : "none",
                      }}
                      alt="Delete"
                    />
                    <label
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy, sans-serif",
                        color: props.billDeletePermission ? "#ccc" : "#FF0000",
                      }}
                    >
                      Delete
                    </label>
                  </div>
                </div>
              </div>
            )}


              
                    </div>
</div>
      
                    {/* <img src={dottt} style={{ height: 40, width: 40, cursor:"pointer" }} /> */}
                  </td>
                </tr>
              );
            })}
            {currentRowinvoice?.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    

      {currentRowinvoice?.length > 0 && (
      
                 <nav
                                     style={{
                                       display: "flex",
                                       alignItems: "center",
                                       justifyContent: "end", // Align dropdown and pagination
                                       padding: "10px",
                                       // borderTop: "1px solid #ddd",
                                     }}
                                   >
                                     {/* Dropdown for Items Per Page */}
                                     <div>
                                       <select
                                         value={invoicerowsPerPage}
                                         onChange={handleItemsPerPageChange}
                                         style={{
                                           padding: "5px",
                                           border: "1px solid #1E45E1",
                                           borderRadius: "5px",
                                           color: "#1E45E1",
                                           fontWeight: "bold",
                                           cursor: "pointer",
                                           outline: "none",
                                           boxShadow: "none",
                                           
                                         }}
                                       >
                                          <option value={5}>5</option>
                                         <option value={10}>10</option>
                                         <option value={50}>50</option>
                                         <option value={100}>100</option>
                                       </select>
                                     </div>
                                   
                                     {/* Pagination Controls */}
                                     <ul
                                       style={{
                                         display: "flex",
                                         alignItems: "center",
                                         listStyleType: "none",
                                         margin: 0,
                                         padding: 0,
                                       }}
                                     >
                                       {/* Previous Button */}
                                       <li style={{ margin: "0 10px" }}>
                                         <button
                                           style={{
                                             padding: "5px",
                                             textDecoration: "none",
                                             color: invoicecurrentPage === 1 ? "#ccc" : "#1E45E1",
                                             cursor: invoicecurrentPage === 1 ? "not-allowed" : "pointer",
                                             borderRadius: "50%",
                                             display: "inline-block",
                                             minWidth: "30px",
                                             textAlign: "center",
                                             backgroundColor: "transparent",
                                             border: "none",
                                           }}
                                           onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
                                           disabled={invoicecurrentPage === 1}
                                         >
                                           <ArrowLeft2 size="16" color={invoicecurrentPage === 1 ? "#ccc" : "#1E45E1"} />
                                         </button>
                                       </li>
                                   
                                       {/* Current Page Indicator */}
                                       <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                                         {invoicecurrentPage} of {totalPagesinvoice}
                                       </li>
                                   
                                       {/* Next Button */}
                                       <li style={{ margin: "0 10px" }}>
                                         <button
                                           style={{
                                             padding: "5px",
                                             textDecoration: "none",
                                             color: invoicecurrentPage === totalPagesinvoice ? "#ccc" : "#1E45E1",
                                             cursor: invoicecurrentPage === totalPagesinvoice ? "not-allowed" : "pointer",
                                             borderRadius: "50%",
                                             display: "inline-block",
                                             minWidth: "30px",
                                             textAlign: "center",
                                             backgroundColor: "transparent",
                                             border: "none",
                                           }}
                                           onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
                                           disabled={invoicecurrentPage === totalPagesinvoice}
                                         >
                                           <ArrowRight2
                                             size="16"
                                             color={invoicecurrentPage === totalPagesinvoice ? "#ccc" : "#1E45E1"}
                                           />
                                         </button>
                                       </li>
                                     </ul>
                                   </nav>
      )}
  

{isEditing && 

<div className='container ms-5 me-5 mt-4'>

  <div style={{display:'flex',flexDirection:'row'}}>
  {/* <MdOutlineKeyboardDoubleArrowLeft onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}}  /> */}
  <svg   style={{ fontSize: '22px' ,marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg>
  <p className="mt-1">Edit Bill</p>
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
        {state.UsersList?.Users && state.UsersList?.Users?.length > 0 && state?.UsersList?.Users?.filter(u => 
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



              <div className='col-lg-3 col-md-4 col-sm-12 col-xs-12'>
        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Invoice Number</Form.Label>
          <Form.Control
            style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
            type="text"
            placeholder="Enter invoice number"
            value={invoicenumber || ''} 
            readOnly
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
      <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4'>
                   
      <Form.Group className="mb-2" controlId="purchaseDate">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    Start Date <span style={{  color: 'red', fontSize: '20px'}}>*</span>
                                    </Form.Label>
                                    <div style={{ position: 'relative' ,width:"100%"}}>
                                        <DatePicker
                                            selected={startdate}
                                            onChange={(date)=>handlestartDate(date)}
                                        popperPlacement="bottom-start"
                                        popperModifiers={[
                                          {
                                            name: 'offset',
                                            options: {
                                              offset: [0, -200],                                             },
                                          },
                                        ]}
                                            dateFormat="dd/MM/yyyy"
                                            // minDate={new Date()}
                                           
                                            customInput={customStartDateInput({
                                                value: startdate ? startdate.toLocaleDateString('en-GB') : '',
                                            })}
                                        />
                                    </div>
                                </Form.Group>


                  


                    {startdateerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {startdateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {startdateerrmsg}
    </p>
  </div>
)}
    
                  </div>

                  <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12'>
                  <Form.Group className="mb-2" controlId="purchaseDate">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    End Date <span style={{  color: 'red', fontSize: '20px'}}>*</span>
                                    </Form.Label>
                                    <div style={{ position: 'relative' ,width:"100%"}}>
                                        <DatePicker
                                            selected={enddate}
                                            onChange={(date)=>handleEndDate(date)}
                                        popperPlacement="bottom-start"
                                        popperModifiers={[
                                          {
                                            name: 'offset',
                                            options: {
                                              offset: [0, -200],                                             },
                                          },
                                        ]}
                                            dateFormat="dd/MM/yyyy"
                                            // minDate={new Date()}
                                           
                                            customInput={customEndDateInput({
                                                value: enddate ? enddate.toLocaleDateString('en-GB') : '',
                                            })}
                                        />
                                    </div>
                                </Form.Group>


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
      <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4'>


      <Form.Group className="mb-2" controlId="purchaseDate">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    Invoice Date <span style={{  color: 'red', fontSize: '20px'}}>*</span>
                                    </Form.Label>
                                    <div style={{ position: 'relative' ,width:"100%"}}>
                                        <DatePicker
                                            selected={invoicedate}
                                            onChange={(date)=>handleInvoiceDate(date)}
                                       
                                            dateFormat="dd/MM/yyyy"
                                            // minDate={new Date()}
                                           
                                            customInput={customInvoiceDateInput({
                                                value: invoicedate ? invoicedate.toLocaleDateString('en-GB') : '',
                                            })}
                                        />
                                    </div>
                                </Form.Group>

                  
                    {invoicedateerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {invoicedateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoicedateerrmsg}
    </p>
  </div>
)}
    
                  </div>

                   <div className='col-lg-3 col-md-3 col-sm-6 col-xs-12'>

                   <Form.Group className="mb-2" controlId="purchaseDate">
                                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                                    Due Date <span style={{  color: 'red', fontSize: '20px'}}>*</span>
                                    </Form.Label>
                                    <div style={{ position: 'relative' ,width:"100%"}}>
                                        <DatePicker
                                            selected={invoiceduedate}
                                            onChange={(date)=>handleDueDate(date)}
                                       
                                            dateFormat="dd/MM/yyyy"
                                            minDate={null}
                                           
                                            customInput={customInvoiceDueDateInput({
                                                value: invoiceduedate ? invoiceduedate.toLocaleDateString('en-GB') : '',
                                            })}
                                        />
                                    </div>
                                </Form.Group>


                   
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

          <thead style={{ backgroundColor: "#E7F1FF",
             position:"sticky",
             top:0,
             zIndex:1,
           }}>
            <tr>
              <th>S.NO</th>  
              <th>Description</th>
              {/* <th>EB Unit </th>
              <th>Unit Price </th>
              <th>Actual Amount</th> */}
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            

{/* {billamounts && billamounts.length > 0 && billamounts.map((u, index) => (
<tr key={`bill-${index}`}>
<td>{serialNumber++}</td>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{paddingTop:'35px',paddingLeft:'10px'}}>
<p>{u.description}</p>
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
))} */}


{newRows && newRows.length > 0 && newRows.map((u, index) => (
    <tr key={`new-${index}`}>

      <td>{serialNumber++}</td>
      <td>
        <div className='col-lg-8 col-md-8 col-sm-4 col-xs-4' style={{alignItems:'center'}}>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={u.am_name}
            onChange={(e) => handleNewRowChange(index, 'am_name', e.target.value)}
          />
        </div>
      </td>
    
    
      <td className='col-lg-3 col-md-3 col-sm-4 col-xs-4' style={{alignItems:'center'}}>
        <Form.Control
          type="text"
          placeholder="Enter total amount"
          value={u.amount}
          onChange={(e) => handleNewRowChange(index, 'amount', e.target.value)}
        />
      </td>
      <td style={{alignItems:'center'}}>
        <span style={{cursor: 'pointer', color: 'red', marginLeft: '10px'}} onClick={() => handleDeleteNewRow(index)}>
          <img src={Closebtn} height={15} width={15} alt="delete" />
        </span>
      </td>
    </tr>
  ))}

</tbody>
       
        </Table>
      </div>

      <div><p style={{color:'#1E45E1',fontSize:'14px',fontWeight:600, cursor:'pointer'}} onClick={handleAddColumn}> + Add new column</p></div>

      <div style={{ float: 'right', marginRight: '130px' }}>
        <h5>Total Amount ₹{totalAmount}</h5>
        <Button 
         onClick={handleEditBill}
        className='w-80 mt-3' style={{ backgroundColor: "#1E45E1", 
          fontWeight: 500, height: 40, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy",
           fontStyle: 'normal', lineHeight: 'normal' }} >
           {isEditing ? "Save Changes" : "Create Bill"}
        </Button>
        {tableErrmsg && <div style={{ color: 'red', marginTop: '10px' }}>{tableErrmsg}</div>}


        <div className='mb-3'></div>
      
      </div>
    </div>
  
}

    </>
  );
}
export default UserListInvoice;

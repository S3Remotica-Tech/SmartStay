import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from "react-bootstrap";
import { MdError } from "react-icons/md";
import DatePicker from 'react-datepicker';
import Closebtn from '../Assets/Images/CloseCircle.png';
import { useDispatch, useSelector } from "react-redux";
import Calendars from '../Assets/Images/New_images/calendar.png';
import UserList from "./UserList";
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
  const [showDots, setShowDots] = useState("");
  const [activeId, setActiveId] = useState(null);
 const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
 
   
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

 
 

  const handleShowDots = (item,event) => {
    console.log("ClickedID:", item); // Debugging
    setActiveId((prevId) => (prevId === item.id ? null : item.id)); // Toggle logic
    const { top, left, width, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;
    setPopupPosition({ top: popupTop, left: popupLeft });
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
    
  props.handleEditItem(item)
    
    
    
    dispatch({ type: 'USERROOMAVAILABLETRUE' });
  
  
  
    // props.setRoomDetail(false)
  };

 
  // useEffect(() => {
  //   if (currentView) {
  //    console.log(currentView,"current");
     
  //     setCustomerName (currentView.hos_user_id);
  //     setInvoiceNumber(currentView.Invoices)
  //     if (currentView.DueDate) {
  //       const parsedDate = new Date(currentView.DueDate); // Convert to Date object
  //       if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
  //         setInvoiceDueDate(parsedDate); // Set the date object in state
  //       } else {
  //         console.error('Invalid DueDate:', currentView.DueDate);
  //       }
  //     }
     
  //     if (currentView.Date) {
  //       const parsedDate = new Date(currentView.Date); // Convert to Date object
  //       if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
  //         setInvoiceDate(parsedDate); // Set the date object in state
  //       } else {
  //         console.error('Invalid DueDate:', currentView.Date);
  //       }
  //     }
  //     if (currentView.start_date ) {
  //       console.log("StartDate", currentView.start_date);
  //       const parsedDate = new Date(currentView.start_date); // Convert to Date object
  //       if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
  //         setStartDate(parsedDate); // Set the date object in state
  //       } else {
  //         console.error('Invalid startDate:', currentView.start_date);
  //       }
  //     }
  //     if (currentView.end_date ) {
  //       console.log("Enddate", currentView.end_date);
  //       const parsedDate = new Date(currentView.end_date); // Convert to Date object
  //       if (!isNaN(parsedDate.getTime())) { // Check if it's a valid date
  //         setEndDate(parsedDate); // Set the date object in state
  //       } else {
  //         console.error('Invalid endDate:', currentView.end_date);
  //       }
  //     }
      
  //   setTotalAmount(currentView.Amount)
  // setNewRows(currentView.amenity)
    
  //   }
  // }, [currentView]);

  useEffect(() => {
    console.log("After", isEditing);
  }, [isEditing]);

  console.log("props",props)

    
 
const handleDeleteBill = (user) => {
  
    console.log(user,'users');
    props.handleDeleteItem(user.id)
    
    
    
    dispatch({ type: 'USERPROFILEBILLTRUE' });
    
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
                  textAlign: "start",
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  paddingLeft:"20px"
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
                  textAlign: "start",
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
                  textAlign: "start",
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
                  textAlign: "start",
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
                  textAlign: "start",
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
                  textAlign: "start",
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
                      textAlign: "start",
                      fontWeight: 500,
                      fontSize: "16px",
                      fontFamily: "Gilroy",
                      paddingLeft:"20px"
                    }}
                  >
                    {view.Invoices}
                  </td>

                  <td style={{textAlign:"start"}}>
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
                        textAlign:"start"
                      }}
                    >
                      {formattedDate}
                    </span>
                  </td>
                  <td style={{textAlign:"start"}}>
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
                        textAlign:"start"
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
                      textAlign:"start"
                    }}
                  >
                    ₹{view.Amount}
                  </td>
                  <td
                    style={{
                      fontWeight: 500,
                      fontSize: "16px",
                      fontFamily: "Gilroy",
                      textAlign:"start"
                    }}
                  >
                    ₹{view.BalanceDue}
                  </td>
                  <td style={{textAlign:"start"}}>
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
                      {view.Status === "Success" ? "Paid" : "Unpaid"}
                    </span>
                  </td>
                  {/* <td style={view.Status === "Paid" ? { color: "green", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"} : { color: "red", fontWeight: 700 ,fontWeight:500,fontSize:"16px",font:"Gilroy"}}>{view.Status == Paid ? 'Paid' : 'UnPaid'}</td> */}
                  <td style={{ textAlign: 'start', verticalAlign: 'middle', border: "none" }} className=''>
                  <div style={{ width: "100%", display: "flex", justifyContent: "start" }}>
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
                      onClick={(e) =>
                        handleShowDots(view,e)
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
                                          position: "fixed",
                                          top: popupPosition.top,
                                          left: popupPosition.left,
                                          // position: "absolute",
                                          // right: 50,
                                          // top: 20,
                                          width: 163,
                                          height: "auto",
                                          border: "1px solid #EBEBEB",
                                          borderRadius: 10,
                                          display: "flex",
                                          justifyContent: "start",
                                          padding: 10,
                                          alignItems: "center",
                                          zIndex: showDots ? 1000 : "auto",

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
    

      {invoiceFilterddata?.length > invoicerowsPerPage && (
      
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
  

{/* {
  viewdata == true ?(
<UserList setCurrentView={setCurrentView} currentView={currentView}/>
  ):null
} */}

    </>
  );
}
export default UserListInvoice;

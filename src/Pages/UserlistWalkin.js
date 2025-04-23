/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal, Button } from "react-bootstrap";
import "./UserlistWalkin.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from "../Assets/Images/New_images/trash.png";
import Edit from "../Assets/Images/Edit-blue.png";
import CustomerForm from "./UserlistWalkinForm";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import "react-toastify/dist/ReactToastify.css";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MdError } from "react-icons/md";
import { ArrowUp2, ArrowDown2 } from 'iconsax-react';
import PropTypes from "prop-types";

function UserlistWalkin(props) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  // const [customers, setCustomers] = useState(initialCustomers);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dotsButton, setDotsButton] = useState(null);
  const [walkInPermissionError, setWalkInPermissionError] = useState("");
  const [walkInEditPermissionError, setWalkInEditPermissionError] = useState("");
  const [walkInDeletePermissionError, setWalkInDeletePermissionError] = useState("");
 

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[7]?.per_view === 1
    ) {
      setWalkInPermissionError("");
    } else {
      setWalkInPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[7]?.per_edit === 1
    ) {
      setWalkInEditPermissionError("");
    } else {
      setWalkInEditPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[7]?.per_delete === 1
    ) {
      setWalkInDeletePermissionError("");
    } else {
      setWalkInDeletePermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  const popupRef = useRef(null);
  // const itemsPerPage = 7;
  // delete
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [walkInCustomer, setWalkInCustomer] = useState([]);
  const [walkinLoader,setWalkingLoader] = useState(true)

  useEffect(() => {
    if(state.login.selectedHostel_Id){
      setWalkingLoader(true)
      dispatch({
        type: "WALKINCUSTOMERLIST",
        payload: { hostel_id:state.login.selectedHostel_Id},
      });
    }

  }, [state.login.selectedHostel_Id]);



//  useEffect(() => {
//   setLoader(true)
//   }, [state.login.selectedHostel_Id]);
// //  useEffect(() => {
//     if (state.UsersList?.getWalkInStatusCode == 200) {
//       setLoader(false)
//     }
//   }, [state.UsersList?.getWalkInStatusCode]);

  // useEffect(() => {
  //   if (state.UsersList?.NoDataWalkInCustomerStatusCode == 201) {
  //     setLoader(false)
  //   }
  // }, [state.UsersList?.NoDataWalkInCustomerStatusCode]);



  useEffect(() => {
    if (state.UsersList.getWalkInStatusCode === 200) {
      setWalkingLoader(false)
      setWalkInCustomer(state.UsersList.WalkInCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 1000);
    }
  }, [state.UsersList.getWalkInStatusCode]);

  useEffect(() => {
    if (state.UsersList.NoDataWalkInCustomerStatusCode === 201) {
      setWalkingLoader(false)
      setWalkInCustomer([]);
      
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE" });
      }, 2000);
    }
  }, [state.UsersList.NoDataWalkInCustomerStatusCode]);

  useEffect(() => {
    if (
      state.UsersList.addWalkInCustomerStatusCode === 200 ||
      state.UsersList.deleteWalkInCustomerStatusCode === 200
    ) {
      dispatch({
        type: "WALKINCUSTOMERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

      setShowForm(false);

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_WALK_IN_CUSTOMER" });
      }, 4000);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_WALK_IN_CUSTOMER" });
      }, 4000);
      setShowDeleteModal(false);
    }
  }, [
    state.UsersList.addWalkInCustomerStatusCode,
    state.UsersList.deleteWalkInCustomerStatusCode,
  ]);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });


  const handleDotsClick = (id, event) => {
    // setDotsButton((prevId) => (prevId === id ? null : id));
    // setCheckOutConfirm(checkout)
    if (dotsButton === id) {
      setDotsButton(null);
    } else {
      setDotsButton(id);
    }

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;


    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleDelete = (customer) => {
    setCustomerToDelete(customer);
    setShowDeleteModal(true);
    setDotsButton(null);
  };

  const confirmDelete = () => {
    if (customerToDelete.id) {
      dispatch({
        type: "DELETEWALKINCUSTOMER",
        payload: { id: customerToDelete.id },
      });
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCustomerToDelete(null);
  };

  const handleEdit = (customer) => {
    setDotsButton(null);
    setSelectedCustomer(customer);
    setShowForm(true);
    
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCustomer(null);
  };

 

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setDotsButton(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers =
  props.search || props.filterStatus || props.walkinDateRange?.length === 2
    ? props.filteredUsers?.slice(indexOfFirstCustomer, indexOfLastCustomer)
    : walkInCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(
    (props.search || props.filterStatus ? props.filteredUsers?.length : walkInCustomer?.length) / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   useEffect(() => {
      if (props.resetPage) {
        setCurrentPage(1);
        props.setResetPage(false); 
      }
    }, [props.resetPage]);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };
  // useEffect(() => {
  //     if (currentPage > totalPages && totalPages > 0) {
  //         setCurrentPage(totalPages);
  //     }
  // }, [walkInCustomer, currentPage, totalPages]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
   
     const sortedData = React.useMemo(() => {
       if (!sortConfig.key) return currentCustomers;
   
       const sorted = [...currentCustomers].sort((a, b) => {
         const valueA = a[sortConfig.key];
         const valueB = b[sortConfig.key];
   
   
         if (!isNaN(valueA) && !isNaN(valueB)) {
           return sortConfig.direction === 'asc'
             ? valueA - valueB
             : valueB - valueA;
         }
   
         if (typeof valueA === 'string' && typeof valueB === 'string') {
           return sortConfig.direction === 'asc'
             ? valueA.localeCompare(valueB)
             : valueB.localeCompare(valueA);
         }
   
         return 0;
       });
   
       return sorted;
     }, [currentCustomers, sortConfig]);
   
     const handleSort = (key, direction) => {
       setSortConfig({ key, direction });
     };

  return (
    <>
    
      {walkInPermissionError ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // height: "100vh",
            }}
          >
            {/* Image */}
            <img
              src={Emptystate}
              alt="Empty State"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            {/* Permission Error */}
            {walkInPermissionError && (
              <div
                style={{
                  color: "red",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                <MdError />
                <span
                  style={{
                    fontSize: "12px",
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {walkInPermissionError}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div style={{ marginLeft: "-20px" }}>
           
          {walkinLoader ? (
            <div
 style={{
   position: "absolute",
   top: 0,
   right: 0,
   bottom: 0,
   left: "200px",
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   backgroundColor: "transparent",
   opacity: 0.75,
   zIndex: 10,
 }}
>
 <div
   style={{
     borderTop: "4px solid #1E45E1",
     borderRight: "4px solid transparent",
     borderRadius: "50%",
     width: "40px",
     height: "40px",
     animation: "spin 1s linear infinite",
   }}
 ></div>
</div>
) : 

   sortedData.length > 0 && (
          
    <div
    className="p-10 booking-table-userlist  booking-table"
    style={{ paddingBottom: "20px",marginLeft:"-15px" }}
  >
          
                        <div
                          className='show-scrolls'
                          style={{
                            // height: "400px",
                            // height: currentItems.length >= 6 ? "380px" : "auto",
                            // overflowY: currentItems.length >= 6 ? "auto" : "visible",
                            // borderRadius: "24px",
                            // border: "1px solid #DCDCDC",
                            // borderBottom:"none"
                            height: sortedData.length >= 5 || sortedData.length >= 5 ? "350px" : "auto",
                            overflow: "auto",
                            borderTop: "1px solid #E8E8E8",
                            marginBottom: 20,
                            marginTop: "20px"
                            //  borderBottom:"1px solid #DCDCDC"
                          }}>
          
                          <Table
                            responsive="md"
                          >
          
                            <thead style={{
                              fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                              top: 0,
                              zIndex: 1
                            }}>
                              <tr>
                                <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500 }}> <div className='d-flex gap-1 align-items-center justify-content-start'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("first_name", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("first_name", 'desc')} style={{ cursor: "pointer" }} />
                                </div> Name</div>  </th>
          
                                <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500,whiteSpace:"nowrap" }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("email_Id", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("email_Id", 'desc')} style={{ cursor: "pointer" }} />
                                </div>  Email ID </div></th>
          
                                <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500,whiteSpace:"nowrap" }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("mobile_Number", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("mobile_Number", 'desc')} style={{ cursor: "pointer" }} />
                                </div>   Mobile No </div></th>
          
                                <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500,whiteSpace:"nowrap" }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("walk_In_Date", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("walk_In_Date", 'desc')} style={{ cursor: "pointer" }} />
                                </div>  Walk-In Date</div></th>
          
                                <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                  <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("comments", 'asc')} style={{ cursor: "pointer" }} />
                                  <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("comments", 'desc')} style={{ cursor: "pointer" }} />
                                </div>  Address </div></th>
          
                                <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, }}>Action</th>
                              </tr>
                            </thead>
          
          
                            <tbody>
                              {   sortedData && sortedData.length > 0 && (
                                      <>
                                        {sortedData.map((v) => {


                  return (
                    <tr key={v.id}>

                      <td
                        style={{
                          border: "none",
                          padding: "10px",
                          textAlign: "start",
                          verticalAlign: "middle",
                          paddingLeft:"25px",borderBottom: "1px solid #E8E8E8"
                        }}
                      >
                        <div
                         
                        >
                          {/* <Image
                            src={imageUrl}
                            alt={v.hoatel_Name || "Default Profile"}
                            roundedCircle
                            style={{
                              height: "40px",
                              width: "40px",
                              marginRight: "10px",
                            }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = Profile;
                            }}
                          /> */}
                          <span
                            style={{
                              fontSize: 13, 
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                            }}
                          >
                             {v.first_name} {v.last_name}
                          </span>
                        </div>
                      </td>
                      <td
                        style={{
                          fontSize: 13, 
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          textAlign: "start",
                          verticalAlign: "middle",
                        borderBottom: "1px solid #E8E8E8"
                        }}
                      >
                        {v.email_Id || "N/A"}
                      </td>
                      <td
                        style={{
                          textAlign: "start",
                          verticalAlign: "middle",
                          fontSize: 13, 
                          fontWeight: 500,
                          fontFamily: "Gilroy",borderBottom: "1px solid #E8E8E8"
                        }}
                      >
                      
                      +
                              {v &&
                                String(v.mobile_Number).slice(
                                  0,
                                  String(v.mobile_Number).length - 10
                                )}{" "}
                              {v && String(v.mobile_Number).slice(-10)}
                          
                        {/* </span> */}
                      </td>
                      <td
                        style={{
                          fontSize: 13, 
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                          textAlign: "start",
                          verticalAlign: "middle",
                          borderBottom: "1px solid #E8E8E8"
                        }}
                      >
                        {moment(v.walk_In_Date).format(
                                "DD/MMM/YYYY"
                              )}
                      </td>
                      <td
                        style={{
                          fontSize: 13, 
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          textAlign: "start",
                          verticalAlign: "middle",
                         borderBottom: "1px solid #E8E8E8"
                        }}
                      >
                        {v.total_amount}
                        {v.comments || ""}
                            {v.area ? v.area :''} {""} {v.city ? v.city :''} {""}<br></br>
                             {v?.state ? v.state : ''}  {v.pin_code ? -  v.pin_code : ''}
                      </td>
                      <td style={{borderBottom: "1px solid #E8E8E8"}}>
                            <div
                              style={{
                                cursor: "pointer",
                                height: 40,
                                width: 40,
                                borderRadius: "50%",
                                border: "1px solid #EFEFEF",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                position: "relative",borderBottom: "1px solid #E8E8E8",
                                backgroundColor: dotsButton === v.id ? "#E7F1FF" : "white",
                                // zIndex:
                                //   dotsButton === customer.id ? 1000 : "auto",
                              }}
                              onClick={(e) => handleDotsClick(v.id, e)}
                            >
                              <PiDotsThreeOutlineVerticalFill
                                style={{ height: 20, width: 20 }}
                              />
                              {dotsButton === v.id && (
                                <div
                                  ref={popupRef}
                                  style={{
                                    cursor: "pointer",
                                    backgroundColor: "#F9F9F9",
                                    position: "fixed",
                                    top: popupPosition.top -15,
                                    left: popupPosition.left,
                                    overflow: "visible ! important",
                                    marginButtom: "30px",
                                    width: 120,
                                    height: 92,
                                    border: "1px solid #EBEBEB",
                                    borderRadius: 10,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    padding: '8px',
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                  }}
                                >
                                  <div
                                    className="mb-2 d-flex align-items-center"
                                    onClick={() => {
                                      if (!walkInEditPermissionError) {
                                        handleEdit(v);
                                      }
                                    }}
                                    style={{
                                      cursor: walkInEditPermissionError
                                        ? "not-allowed"
                                        : "pointer",
                                      pointerEvents: walkInEditPermissionError
                                        ? "none"
                                        : "auto",
                                      opacity: walkInEditPermissionError
                                        ? 0.5
                                        : 1,
                                    }}
                                  >
                                    <img
                                      src={Edit}
                                      style={{
                                        height: 16,
                                        width: 16,
                                        marginRight: "8px",
                                      }}
                                      alt="Edit icon"
                                    />
                                    <label
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        color: "#222222",
                                        cursor: "pointer"
                                      }}
                                    >
                                      Edit
                                    </label>
                                  </div>

                                  <div
                                    className="d-flex align-items-center"
                                    onClick={() => {
                                      if (!walkInDeletePermissionError) {
                                        handleDelete(v);
                                      }
                                    }}
                                    style={{
                                      cursor: walkInDeletePermissionError
                                        ? "not-allowed"
                                        : "pointer",
                                      pointerEvents: walkInDeletePermissionError
                                        ? "none"
                                        : "auto",
                                      opacity: walkInDeletePermissionError
                                        ? 0.5
                                        : 1,
                                    }}
                                  >
                                    <img
                                      src={Delete}
                                      style={{
                                        height: 16,
                                        width: 16,
                                        marginRight: "8px",
                                      }}
                                      alt="Delete icon"
                                    />
                                    <label
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        color: "#FF0000",
                                        cursor: "pointer"
                                      }}
                                    >
                                      Delete
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                    </tr>
                  );
                
          })}
                                      </>
                                    
          
                                  )
                              }
                            </tbody>
          
          
                          </Table>
                        </div>
          </div>
          
                      )}










{
   !walkinLoader && currentCustomers?.length === 0 && 

   <div style={{ marginTop: 30 }}>
   <div style={{ textAlign: "center" }}>
     <img src={Emptystate} alt="emptystate" />
   </div>
   <div
     className="pb-1"
     style={{
       textAlign: "center",
       fontWeight: 600,
       fontFamily: "Gilroy",
       fontSize: 20,
       color: "rgba(75, 75, 75, 1)",
     }}
   >
     No Walk-in available
   </div>
   <div
     className="pb-1"
     style={{
       textAlign: "center",
       fontWeight: 500,
       fontFamily: "Gilroy",
       fontSize: 16,
       color: "rgba(75, 75, 75, 1)",
     }}
   >
     There are no Walk-in added.
   </div>
 </div>
}
                 
          </div>
          {/* {(props.search ? props.filteredUsers?.length : walkInCustomer?.length) >= 5 && ( */}
          {((props.search || props.filterStatus) ? props.filteredUsers?.length : walkInCustomer?.length) >= 5 && (
                  <nav
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      padding: "10px",
                      position: "fixed", // Keeps the nav fixed on the screen
                      bottom: "10px", // Positions it 10px from the bottom
                      right: "10px", // Positions it 10px from the right
                      backgroundColor: "#fff", // Optional: Adds background for better visibility
                      borderRadius: "5px", // Optional: Rounded corners
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Optional: Adds a subtle shadow
                      zIndex: 1000, // Ensures it stays above other elements
                    }}
                  >
                    <div>
                      <select
                        value={itemsPerPage}
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

                    <ul
                      style={{
                        display: "flex",
                        alignItems: "center",
                        listStyleType: "none",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <li style={{ margin: "0 10px" }}>
                        <button
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color: currentPage === 1 ? "#ccc" : "#1E45E1",
                            cursor: currentPage === 1 ? "not-allowed" : "pointer",
                            borderRadius: "50%",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                        </button>
                      </li>

                      <li
                        style={{
                          margin: "0 10px",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        {currentPage} of {totalPages}
                      </li>

                      <li style={{ margin: "0 10px" }}>
                        <button
                          style={{
                            padding: "5px",
                            textDecoration: "none",
                            color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                            borderRadius: "50%",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          <ArrowRight2
                            size="16"
                            color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                          />
                        </button>
                      </li>
                    </ul>
                  </nav>

                )}

        </>
      )}

      {showForm && (
        <CustomerForm
          show={showForm}
          handleClose={handleFormClose}
          // onSubmit={handleFormSubmit}
          initialData={selectedCustomer}
        // modalType={modalType}
        />
      )}

      {/* Delete  Modal */}
      <Modal
        show={showDeleteModal}
        onHide={cancelDelete}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
           className="w-100 text-center"
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              
              fontWeight: 600,
              color: "#222222",
              
            }}
          >
            Delete walk-in
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
        className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            
            marginTop: "-10px",
          }}
        >
          Are you sure you want to delete this walk-in?
        </Modal.Body>

        <Modal.Footer
        className="d-flex justify-content-center"
          style={{
            
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
           className="me-2"
           style={{
            width: "100%",
            maxWidth: 160,
            height: 52,
            borderRadius: 8,
            padding: "12px 20px",
            background: "#fff",
            color: "#1E45E1",
            border: "1px solid #1E45E1",
            fontWeight: 600,
            fontFamily: "Gilroy",
            fontSize: "14px",
          }}
            onClick={cancelDelete}
          >
            Cancel
          </Button>
          <Button
             style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={confirmDelete}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                closeButton={false}
                toastStyle={{
                    backgroundColor: "#EBF5FF",
                    color: "#222222",
                    borderRadius: "60px",
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    fontSize: "16px"
                }}
            /> */}
    </>
  );
}
UserlistWalkin.propTypes = {
  customerrolePermission: PropTypes.func.isRequired,
  filterInput: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  filteredUsers: PropTypes.func.isRequired,
  filterStatus: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  setResetPage: PropTypes.func.isRequired,
  walkinDateRange: PropTypes.func.isRequired,
};

export default UserlistWalkin;

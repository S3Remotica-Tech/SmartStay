/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import Addbtn from "../Assets/Images/New_images/add-circle.png"
import Delete from "../Assets/Images/New_images/trash.png";
import Edit from "../Assets/Images/edit_blue.svg";
import { ArrowLeft2, ArrowRight2,ArrowUp2, ArrowDown2, } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CheckOutForm from "./UserListCheckoutForm";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { MdError } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  Table,
  Button,
  Modal,
  
} from "react-bootstrap";
import PropTypes from "prop-types";
import './UserlistCheckout.css';

function CheckOut(props) {




  const state = useSelector((state) => state);
  const dispatch = useDispatch();


  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [checkOutCustomer, setCheckOutCustomer] = useState([]);
  const [checkOutPermissionError, setcheckOutPermissionError] = useState("");
  const [checkOutEditPermissionError, setcheckOutEditPermissionError] = useState("");
  const [checkOutDeletePermissionError, setcheckOutDeletePermissionError] = useState("");
  const [checkoutLoader,setCheckOutLoader] = useState(true)
  const [cofirmForm,setConfirmForm] = useState(false)
  


  

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[6]?.per_view === 1
    ) {
      setcheckOutPermissionError("");
    } else {
      setcheckOutPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {

    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[6]?.per_edit === 1
    ) {
      setcheckOutEditPermissionError("");
    } else {
      setcheckOutEditPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {

    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[6]?.per_delete === 1
    ) {
      setcheckOutDeletePermissionError("");
    } else {
      setcheckOutDeletePermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    if(state.login.selectedHostel_Id){
    setCheckOutLoader(true)
    dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
    }
  }, [state.login.selectedHostel_Id]);


 useEffect(() => {
  if(state.login.selectedHostel_Id){
       dispatch({ type: 'AVAILABLECHECKOUTCUSTOMER', payload: { hostel_id: state.login.selectedHostel_Id } })
  }
     
   }, [state.login.selectedHostel_Id])

    useEffect(() => {
        if (state.UsersList.GetCheckOutCustomerStatusCode === 200) {
          setCheckOutLoader(false)
         setCheckOutCustomer(state.UsersList.CheckOutCustomerList);
          setTimeout(() => {
            dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
          }, 1000);
        }
      }, [state.UsersList.GetCheckOutCustomerStatusCode]);




      
  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {
      
      checkoutcloseModal()
      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" })
      }, 1000)
    }

  }, [state.UsersList.statusCodeAddConfirmCheckout])

 


   useEffect(() => {
      if (state.UsersList?.checkoutcustomeEmpty === 201) {
        setCheckOutLoader(false)
        setCheckOutCustomer([])
       
        setTimeout(() => {
          dispatch({ type: 'REMOVE_CLEAR_CHECKOUT_CUSTOMER_LIST_ERROR' })
        }, 2000)
      }
  
    }, [state.UsersList?.checkoutcustomeEmpty])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveDotsId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      state.UsersList.addCheckoutCustomerStatusCode === 200 ||
      state.UsersList.deleteCheckoutCustomerStatusCode === 200
    ) {
      
      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setcheckoutForm(false);
      setModalType(null);
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CHECKOUT_CUSTOMER" });
      }, 3000);

      setTimeout(() => {
        dispatch({ type: "CLEAR _DELETE_CHECK_OUT_CUSTOMER" });
      }, 3000);
    }
  }, [
    state.UsersList.addCheckoutCustomerStatusCode,
    state.UsersList.deleteCheckoutCustomerStatusCode,
  ]);
  const popupRef = useRef(null);

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers =
  props.search || props.filterStatus || props.checkoutDateRange?.length === 2
    ? props.filteredUsers?.slice(indexOfFirstCustomer, indexOfLastCustomer)
    : checkOutCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(
    (props.search || props.filterStatus ? props.filteredUsers?.length : checkOutCustomer?.length) / itemsPerPage
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1)
  };
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

 useEffect(() => {
    if (props.resetPage) {
      setCurrentPage(1);
      props.setResetPage(false); 
    }
  }, [props.resetPage]);
  
  const [checkOutEdit, setCheckOutEdit] = useState("");
  const [checkouteditaction, setCheckoutEditAction] = useState(false)
  const [checkOutconfirm, setCheckOutConfirm] = useState("");
  const [deleteCheckOutCustomer, setDeleteCheckOutCustomer] = useState("");
  const [checkoutaction, setCheckoutAction] = useState(false)
  const [conformEdit,setConformEdit] = useState(false)

  const handleEdit = (checkout) => {
      setActiveDotsId(null);
    setcheckoutForm(true);
    setCheckOutEdit(checkout);
    setCheckoutEditAction(true)
    setCheckoutAction(false)
  };
  const handleConformEdit = ()=>{
     setConfirmForm(true);
setConformEdit(true)
  }

  const handleConfirmCheckout = () => {

    setActiveDotsId(null);
    setConfirmForm(true);
    setCheckoutAction(true)
    setCheckoutEditAction(false)
    setConformEdit(false)
  }
  const handleCloseConformForm=()=>{
    setConfirmForm(false); 
  }

  const handleDelete = (checkout) => {
    setActiveDotsId(null);
    setDeleteCheckOutCustomer(checkout);
    setModalType("delete");
  };

  const confirmDelete = () => {
    if (deleteCheckOutCustomer.ID) {
      dispatch({
        type: "DELETECHECKOUTCUSTOMER",
        payload: { user_id: deleteCheckOutCustomer.ID },
      });
    }
  };

  const handleModalClose = () => {
    setModalType(null);
  };



  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
   
  const toggleMoreOptions = (id, checkout, event) => {
    setCheckOutConfirm(checkout)
    if (activeDotsId === id) {
      setActiveDotsId(null);
    } else {
      setActiveDotsId(id);
    }



    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = (top + height / 2) - 15;
  

    const popupLeft = left - (checkOutconfirm.isActive === 0 || checkOutconfirm.isActive === '0' ? 250 : 290);
    

    setPopupPosition({ top: popupTop, left: popupLeft });


    setTimeout(() => {
      if (popupRef.current) {
        const popupWidth = popupRef.current.offsetWidth;
        const popupLeft = left - popupWidth + 0; 
        setPopupPosition({ top: popupTop, left: popupLeft });
      }
    }, 0);



  };

 

 
  



  const [checkoutForm, setcheckoutForm] = useState(false);
  

  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  

  
  return (

    <>
    
    <div>
    {checkoutLoader &&
        <div
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            bottom: 0,
            left: '200px',
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
        </div>
      }
      { checkOutPermissionError? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              
            }}
          >
            
            <img
              src={Emptystate}
              alt="Empty State"
              style={{ maxWidth: "100%", height: "auto" }}
            />

           
            {checkOutPermissionError && (
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
                <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{checkOutPermissionError}</span>
              </div>
            )}
          </div>
        </>
      ) :

        <div  >
          <div>
            {sortedData?.length > 0 ?  (
             <div
             className="p-0 booking-table-userlist  booking-table me-4"
             style={{ paddingBottom: "20px",marginLeft:"-14px" }}
           >
                <div
                         
                         className='show-scrolls'
                         style={{
                          
                           height: sortedData?.length >= 8 || sortedData?.length >= 8 ? "350px" : "auto",
                           overflow: "auto",
                           borderTop: "1px solid #E8E8E8",
                           marginBottom: 20,
                           marginTop: "20px",
                           paddingRight:0,
                           paddingLeft:0
                           
                         }}
                       >
                  <Table
                    responsive="md"
                   
                    style={{
                      fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                      top: 0,
                      zIndex: 1,
                      borderRadius:0
                    }}
                  >
                    <thead
                      style={{
                        fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                        top: 0,
                        zIndex: 1
                      }}
                    >
                      <tr>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            
                            paddingLeft:"20px"
                          }}
                        >
                                                    <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                                                                               <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                                                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'asc')} style={{ cursor: "pointer" }} />
                                                                                                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'desc')} style={{ cursor: "pointer" }} />
                                                                                                                              </div>
                                                                                                                               Name</div>
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            whiteSpace:"nowrap"
                          }}
                        >
                                                    <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                                                                               <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                                                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Phone", 'asc')} style={{ cursor: "pointer" }} />
                                                                                                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Phone", 'desc')} style={{ cursor: "pointer" }} />
                                                                                                                              </div>
                                                                                                                               Mobile No</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                                                     <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                                                                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                                                                                 <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'asc')} style={{ cursor: "pointer" }} />
                                                                                                                                 <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'desc')} style={{ cursor: "pointer" }} />
                                                                                                                               </div>
                                                                                                                                Floor</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                                                     <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                                                                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                                                                                 <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("room_name", 'asc')} style={{ cursor: "pointer" }} />
                                                                                                                                 <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("room_name", 'desc')} style={{ cursor: "pointer" }} />
                                                                                                                               </div>
                                                                                                                                Room</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                                                     <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                                                                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                                                                                 <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("bed_name", 'asc')} style={{ cursor: "pointer" }} />
                                                                                                                                 <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("bed_name", 'desc')} style={{ cursor: "pointer" }} />
                                                                                                                               </div>
                                                                                                                                Bed</div>
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            whiteSpace:"nowrap"
                          }}
                        >
                                                     <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                                                                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                                                                                 <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("CheckoutDate", 'asc')} style={{ cursor: "pointer" }} />
                                                                                                                                 <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("CheckoutDate", 'desc')} style={{ cursor: "pointer" }} />
                                                                                                                               </div>
                                                                                                                                Check-Out Date</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                                                     <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                                                                                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                                                                                 <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("isActive", 'asc')} style={{ cursor: "pointer" }} />
                                                                                                                                 <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("isActive", 'desc')} style={{ cursor: "pointer" }} />
                                                                                                                               </div>
                                                                                                                                Status</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                             paddingBottom:12
                          }}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData && sortedData.length > 0 && sortedData.map((checkout) => {
                       

                        return (
                          <tr key={checkout.ID} className="customer-row">

                            <td style={{verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"}}>
                              <div className="d-flex align-items-center">
                                <span
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                    color: "#222222",
                                    paddingLeft: "4px",
                                    textAlign: "start",
                                    verticalAlign: "middle"
                                  }}
                                  className=" customer-name ps-4 ps-sm-2 ps-md-3 ps-lg-4 "
                                >
                                  {checkout.Name}
                                </span>
                              </div>
                            </td>


                            <td
                               style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                color: "#000000",
                                textAlign: "start",
                                verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                            >
                              +
                              {checkout &&
                                String(checkout.Phone).slice(
                                  0,
                                  String(checkout.Phone).length - 10
                                )}{" "}
                              {checkout && String(checkout.Phone).slice(-10)}
                            </td>

                            <td
                              style={{
                                padding: "10px",
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  display: "inline-block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                                }}
                              >
                                {checkout.floor_name}
                              </span>
                            </td>

                            <td
                              style={{
                                padding: "10px",
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "11px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  display: "inline-block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  verticalAlign: "middle"
                                }}
                              >
                                {checkout.room_name}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  display: "inline-block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  verticalAlign: "middle"
                                }}
                              >
                                {checkout.bed_name}
                              </span>
                            </td>
                            <td
                              style={{
                                padding: "10px",
                                border: "none",
                                textAlign: "start",
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "13px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  display: "inline-block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  verticalAlign: "middle"
                                }}
                              >
                                {moment(checkout.CheckoutDate, "YYYY-MM-DD").format("DD MMM YYYY")}
                              </span>
                            </td>
                           
                            <td style={{
                              padding: "10px",
                              border: "none",
                              textAlign: "start",
                              fontSize: "13px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              verticalAlign: "middle",borderBottom: "1px solid #E8E8E8",
                              whiteSpace: "nowrap", color: checkout.BalanceDue === 0 ? "green" : "red"
                            }}
                                className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              {checkout.isActive === 0 ? <span style={{ backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Completed</span> : <span
                                style={{ cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000', borderRadius: '14px', padding: "8px 12px" }}>Pending</span>}</td>


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
                                  position: "relative",
                                                                     backgroundColor: activeDotsId === checkout.ID   ? "#E7F1FF" : "white",
                                }}
                                onClick={(e) => toggleMoreOptions(checkout.ID, checkout, e)}
                                                           >
                                <PiDotsThreeOutlineVerticalFill
                                  style={{ height: 20, width: 20 }}
                                />

                                {activeDotsId === checkout.ID && (
                                  <div
                                    ref={popupRef}
                                    style={{
                                      cursor: "pointer",
                                      backgroundColor: "#F9F9F9",
                                      position: "fixed",
                                      top:   popupPosition.top,
                                      left:  popupPosition.left,
                                      
                                      width:checkout.isActive === 0 ? 100:200,
                                      border: "1px solid #F9F9F9",
                                      borderRadius: 12,
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      padding: 15,
                                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                      zIndex: 10,
                                      
                                      marginRight: "20px",
                                    }}
                                  >

                                  

{checkout.isActive !== 0 && (
  <div
    className="d-flex align-items-center"
    onClick={() => {
      if (!checkOutEditPermissionError) {
        handleConfirmCheckout(checkout);
      }
    }}
  >
    <img
      src={Addbtn}
      style={{
        height: 16,
        width: 16,
        marginRight: "8px",
      }}
      alt="checkout icon"
    />
    <label
      style={{
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "Gilroy",
        cursor: checkOutEditPermissionError ? "not-allowed" : "pointer",
      }}
    >
      Confirm Check-Out
    </label>
  </div>
  
)}


                                    <div
  className="mb-2 mt-2 d-flex align-items-center"
 
  onClick={() => {
  if (!checkOutEditPermissionError) {
    if (checkout.isActive === 1) {
      handleEdit(checkout);
    } else {
      handleConformEdit(checkout);
    }
  }
}}

  style={{
    cursor: checkOutEditPermissionError ? "not-allowed" : "pointer",
    pointerEvents: checkOutEditPermissionError ? "none" : "auto",
    opacity: checkOutEditPermissionError ? 0.5 : 1,
  }}
>
  <img
    src={Edit}
    style={{ height: 16, width: 16, marginRight: "8px" }}
    alt="Edit icon"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "Gilroy",
      color: "#222222",
      cursor: checkOutEditPermissionError ? "not-allowed" : "pointer",
    }}
  >
    Edit
  </label>
</div>


                                    <div
                                      className="d-flex align-items-center"
                                      onClick={() => {
                                        if (!checkOutDeletePermissionError) {
                                          handleDelete(checkout);
                                        }
                                      }}
                                      style={{
                                        cursor: checkOutDeletePermissionError
                                          ? "not-allowed"
                                          : "pointer",
                                        pointerEvents: checkOutDeletePermissionError
                                          ? "none"
                                          : "auto",
                                        opacity: checkOutDeletePermissionError ? 0.5 : 1,
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
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          color: "#FF0000",
                                          cursor: checkOutEditPermissionError
                                          ? "not-allowed"
                                          : "pointer",
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
                    </tbody>
                  </Table>
                </div>
                {((props.search || props.filterStatus) ? props.filteredUsers?.length : checkOutCustomer?.length) >= 5 && (

                

                  <nav
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      padding: "10px",
                      position: "fixed",
                      bottom: "10px",
                      right: "10px",
                      backgroundColor: "#fff",
                      borderRadius: "5px",
                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                      zIndex: 1000,
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

              </div>
              
            ) : ( !checkoutLoader && currentCustomers?.length === 0 && (
              <div style={{ marginTop: 30, height: "60vh" }}>
                <div style={{ textAlign: "center" }}>
                  {" "}
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
                  No checkout List available{" "}
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
                  There are no checkout List added.{" "}
                </div>

              </div>
            ))}
          </div>
        </div>

      }
      {(checkoutForm || cofirmForm) && (
  <CheckOutForm
    show={checkoutForm}
    item={checkOutCustomer}
    handleClose={checkoutcloseModal}
    currentItem={checkOutEdit}
    data={checkOutconfirm}
    checkouteditaction={checkouteditaction}
    checkoutaction={checkoutaction}
    cofirmForm={cofirmForm}
    setConfirmForm={setConfirmForm}
    handleCloseConformForm={handleCloseConformForm}
    conformEdit = {conformEdit}
  />
)}

   
      <Modal
        show={modalType === "delete"}
        onHide={handleModalClose}
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
            Delete Check-out
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
          Are you sure you want to delete this check-out?
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
            onClick={handleModalClose}
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
    </div>
    </>
  );
}

CheckOut.propTypes = {
  customerrolePermission: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  filterInput: PropTypes.func.isRequired,
  filteredUsers: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,

  filterStatus: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  checkoutDateRange: PropTypes.func.isRequired,
  setResetPage: PropTypes.func.isRequired,

};

export default CheckOut;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
// import Addbtn from "../../Assets/Images/New_images/add-circle.png"
// import { Edit, Trash } from "iconsax-react";
// import { ArrowUp2, ArrowDown2, } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import CheckOutForm from "./UserListCheckoutForm";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import CustomerProfile from "./CheckoutProfile";
import { checkoutCustomerProfile } from "../../Redux/Action/smartStayAction";
import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import './UserlistCheckout.css';
import PaginationList from "../../Components/PaginationList";
import DueCustomerConfirmCheckout from "./DueCustomerConfirmCheckout";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import { useNavigate } from "react-router-dom";

function CheckOut() {


 const navigate = useNavigate();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();



  // useEffect(() => {
  //   if (state.login.selectedHostel_Id && !calledOnceRef.current) {
  //     calledOnceRef.current = true;
  //     // setWalkingLoader(true);
  //     dispatch({
  //       type: "USERLIST",
  //       payload: { hostel_id: state.login.selectedHostel_Id, type: 'checkout' },
  //     });

  //   }
  // }, [state.login.selectedHostel_Id]);
  // const [activeDotsId, setActiveDotsId] = useState(null);
  // const [modalType, setModalType] = useState(null);
  

  const [checkOutCustomer, setCheckOutCustomer] = useState([]);
  // const [checkOutPermissionError, setcheckOutPermissionError] = useState("");
  // const [checkOutEditPermissionError, setcheckOutEditPermissionError] = useState("");
  // const [checkOutDeletePermissionError, setcheckOutDeletePermissionError] = useState("");
  const [checkoutLoader, setCheckOutLoader] = useState(false)
  const [CheckoutProfile, setCheckoutProfile] = useState(false)
  const [checkouttableshow, setcheckoutTableShow] = useState(true);
  const [checkoutWithoutPay,setCheckoutWithoutPay] =useState("")



// const canReadCheckout = useHasPermission("Checkout", "canRead")
// const canWriteCheckout = useHasPermission("Checkout", "canWrite")
//  const canUpdateCheckout = useHasPermission("Checkout", "canUpdate")
//   const canDeleteCheckout = useHasPermission("Checkout", "canDelete")

const {
        // canWriteModule: canWriteCheckout,
        canReadModule: canReadCheckout,
        // canUpdateModule: canUpdateCheckout,
        // canDeleteModule: canDeleteCheckout,
      } = useHasPermission("Checkout");

 useEffect(() => {
     if (!canReadCheckout) {
         setCheckOutLoader(false)
     } else {
         setCheckOutLoader(true)
     }
   }, [canReadCheckout]);



  const handleCustomerProfilePage = (checkout) => {
            setCheckoutWithoutPay(checkout)
    navigate(`/tenant/checkout/details/${checkout.customerId}`)
    setcheckoutTableShow(false)
    dispatch(checkoutCustomerProfile(false))
        dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: checkout.customerId } });
 
  }









  useEffect(() => {
    if (state.login.selectedHostel_Id) {
          dispatch({ type: "CHECKOUTCUSTOMERLIST",payload: { hostelId: state.login.selectedHostel_Id } });
            setCheckOutLoader(true)
    }
  }, [state.login.selectedHostel_Id]);


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'AVAILABLECHECKOUTCUSTOMER', payload: { hostel_id: state.login.selectedHostel_Id } })
    }

  }, [state.login.selectedHostel_Id])



  useEffect(() => {
    if (state.UsersList.GetCheckOutCustomerStatusCode === 200) {
      setCheckOutLoader(false)
      setCheckOutCustomer(state.UsersList.CheckOutCustomerList?.checkoutCustomers);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
      }, 10);
    }
  }, [state.UsersList.GetCheckOutCustomerStatusCode]);


useEffect(()=>{
setCheckOutLoader(false)
},[state.UsersList.CheckOutCustomerList])


  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {

      checkoutcloseModal()
      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostelId: state.login.selectedHostel_Id } });
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

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (popupRef.current && !popupRef.current.contains(event.target)) {
  //       setActiveDotsId(null);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  useEffect(() => {
    if (
      state.UsersList.addCheckoutCustomerStatusCode === 201 ||
      state.UsersList.deleteCheckoutCustomerStatusCode === 200
    ) {

      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostelId: state.login.selectedHostel_Id } });
      setcheckoutForm(false);
      // setModalType(null);
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
  // const popupRef = useRef(null);

  // const indexOfLastCustomer = currentPage * itemsPerPage;
  // const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  // const currentCustomers =
  //   props.search || props.filterStatus || props.checkoutDateRange?.length === 2
  //     ? props.filteredUsers?.slice(indexOfFirstCustomer, indexOfLastCustomer)
  //     : checkOutCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);
  // const totalPages = Math.ceil(
  //   (props.search || props.filterStatus ? props.filteredUsers?.length : checkOutCustomer?.length) / itemsPerPage
  // );
  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };
  // const handleItemsPerPageChange = (selectedOption) => {
  //   setItemsPerPage(Number(selectedOption.value));
  //   setCurrentPage(1);
  // };




  // const pageOptions = [
  //   { value: 10, label: "10" },
  //   { value: 50, label: "50" },
  //   { value: 100, label: "100" },
  // ];
  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // const sortedData = React.useMemo(() => {
  //   if (!sortConfig.key) return currentCustomers;

  //   const sorted = [...currentCustomers].sort((a, b) => {
  //     const valueA = a[sortConfig.key];
  //     const valueB = b[sortConfig.key];


  //     if (!isNaN(valueA) && !isNaN(valueB)) {
  //       return sortConfig.direction === 'asc'
  //         ? valueA - valueB
  //         : valueB - valueA;
  //     }

  //     if (typeof valueA === 'string' && typeof valueB === 'string') {
  //       return sortConfig.direction === 'asc'
  //         ? valueA.localeCompare(valueB)
  //         : valueB.localeCompare(valueA);
  //     }

  //     return 0;
  //   });

  //   return sorted;
  // }, [currentCustomers, sortConfig]);

  // const currentCustomers = React.useMemo(() => {
  //   const useFiltered =
  //     props.search ||
  //     props.filterStatus ||
  //     (props.checkoutDateRange?.length === 2);

  //   if (useFiltered) {
  //     return props.filteredUsers || [];
  //   }

  //   return checkOutCustomer || [];
  // }, [
  //   props.search,
  //   props.filterStatus,
  //   props.checkoutDateRange,
  //   props.filteredUsers,

  // ]);

  
 const sortedData = React.useMemo(() => {
    return Array.isArray(checkOutCustomer) ? checkOutCustomer : [];
  }, [checkOutCustomer]);

  // const handleSort = (key, direction) => {
  //   setSortConfig({ key, direction });
  // };

  // useEffect(() => {
  //   if (props.resetPage) {
  //     setCurrentPage(1);
  //     props.setResetPage(false);
  //   }
  // }, [props.resetPage]);

  // const [checkOutEdit, setCheckOutEdit] = useState("");
  // const [checkouteditaction, setCheckoutEditAction] = useState(false)
  // const [checkOutconfirm, setCheckOutConfirm] = useState("");
  // const [deleteCheckOutCustomer, setDeleteCheckOutCustomer] = useState("");
  // const [checkoutaction, setCheckoutAction] = useState(false)
  // const [conformEdit, setConformEdit] = useState(false)
  const [DueCustomerShow, setDueCustomerShow] = useState(false)
  // const [CheckOutDetails, setCheckOutDetails] = useState("");


  // const handleEdit = (checkout) => {
  //   setActiveDotsId(null);
  //   setcheckoutForm(true);
  //   setConfirmForm(false);
  //   setCheckOutEdit(checkout);
  //   setCheckoutEditAction(true)
  //   setCheckoutAction(false)
  //   setCheckOutDetails('')
  // };

  // const handleConformEdit = () => {
  //   setConfirmForm(true);
  //   setConformEdit(true)
  // }




  // const handleConfirmCheckout = (checkout) => {
  //   if (checkout.customerId) {
  //     dispatch({
  //       type: "GETCONFIRMCHECKOUTCUSTOMER",
  //       payload: { id: checkout.customerId, hostel_id: checkout.Hostel_Id },
  //     });
  //   }
  //   setCheckOutDetails(checkout)
  // }






  // useEffect(() => {
  //   if (state.UsersList.statusCodegetConfirmCheckout) {
  //     const validInvoices = state?.UsersList?.GetconfirmcheckoutBillDetails?.filter((invoice) => invoice.balance > 0);
  //     const deduction_details = state?.UsersList?.nonRefundable_details?.filter((deduction) => deduction.amount > 0);
  //     const hasBalance =
  //       Array.isArray(validInvoices) &&
  //       validInvoices.some((invoice) => invoice.balance > 0);
  //     let totaldueamount = 0;
  //     if (validInvoices && hasBalance) {
  //       totaldueamount = validInvoices.reduce(
  //         (total, invoice) => total + invoice.balance,
  //         0
  //       );
  //     }

  //     setDueAmountDetails(totaldueamount)
  //     const advanceAmount = state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount


  //     setDueCustomerShow(true)


  //     // if (totaldueamount > 0) {
  //     //   setDueCustomerShow(true)
  //     //   setConfirmForm(false);
  //     // } else {
  //     //   setActiveDotsId(null);
  //     //   setConfirmForm(true);
  //     //   setCheckoutAction(true)
  //     //   setCheckoutEditAction(false)
  //     //   setConformEdit(false)
  //     //   setDueCustomerShow(false)
  //     // }
  //   }
  //   setTimeout(() => {
  //     dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
  //   }, 500);

  // }, [state.UsersList.statusCodegetConfirmCheckout, CheckOutDetails]);


  useEffect(() => {
    if (state.UsersList.statusCodegetConfirmCheckout ) {
      setDueCustomerShow(true);

    }

    setTimeout(() => {
      dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
    }, 500);
  }, [state.UsersList.statusCodegetConfirmCheckout]);




  useEffect(() => {
    if (state.UsersList.statusCodeForDueCustomer === 200) {
      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostelId: state.login.selectedHostel_Id } });
      setDueCustomerShow(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
      }, 500);
    }

  }, [state.UsersList.statusCodeForDueCustomer])



  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {
      setDueCustomerShow(false)

      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostelId: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" })
      }, 1000)
    }

  }, [state.UsersList.statusCodeAddConfirmCheckout])


  const handleCloseDuePopup = () => {
    setDueCustomerShow(false)
  }


  // const handleCloseConformForm = () => {
  //   setConfirmForm(false);
  // }

  // const handleDelete = (checkout) => {
  //   setActiveDotsId(null);
  //   setDeleteCheckOutCustomer(checkout);
  //   setModalType("delete");
  // };

  // const confirmDelete = () => {
  //   if (deleteCheckOutCustomer.ID) {
  //     dispatch({
  //       type: "DELETECHECKOUTCUSTOMER",
  //       payload: { user_id: deleteCheckOutCustomer.ID },
  //     });
  //   }
  // };

  // const handleModalClose = () => {
  //   setModalType(null);
  // };



  // const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  // const toggleMoreOptions = (id, checkout, event) => {
  //   setCheckOutConfirm(checkout)
  //   if (activeDotsId === id) {
  //     setActiveDotsId(null);
  //   } else {
  //     setActiveDotsId(id);
  //   }



  //   const { top, left, height } = event.target.getBoundingClientRect();
  //   const popupTop = (top + height / 2) - 45;


  //   const popupLeft = left - (checkOutconfirm.isActive === 0 || checkOutconfirm.isActive === '0' ? 250 : 290);


  //   setPopupPosition({ top: popupTop, left: popupLeft });


  //   setTimeout(() => {
  //     if (popupRef.current) {
  //       const popupWidth = popupRef.current.offsetWidth;
  //       const popupLeft = left - popupWidth + 0;
  //       setPopupPosition({ top: popupTop, left: popupLeft });
  //     }
  //   }, 0);



  // };








  const [checkoutForm, setcheckoutForm] = useState(false);



  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  const handleCloseCheckoutProfile = () => {
    setCheckoutProfile(false)
  }


  return (

    <>
      {checkouttableshow &&
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
            {!canReadCheckout ? (
              <>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 90

                  }}
                >

                  <img
                    src={Emptystate}
                    alt="Empty State"

                  />


                  
                    <ErrorMessage message={['You do not have access to view Checkout']} type="warning" />
                 
                </div>
              </>
            ) :

              <div  >
                <div>
                  {sortedData?.length > 0 ? (
                    <div
                      className='show-scrolls'
                     style={{
                  overflow: "auto",
                  marginBottom: 20,
                  marginTop: "0px",
                  paddingRight: 0,
                  paddingLeft: 0,

                }}
                    >
                      <div

                        className='show-scrolls me-2'
                        style={{
                          borderTop: "1px solid #E8E8E8",
                          marginTop: "20px",
                          paddingRight: 0,
                          paddingLeft: 0

                        }}
                      >
                        <Table
                          responsive="md"

                          style={{
                            fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                            top: 0,
                            zIndex: 1,
                            borderRadius: 0
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
                                                                   color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  {/* <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'desc')} style={{ cursor: "pointer" }} />
                                  </div> */}
                                  Name</div>
                              </th>

                              <th
                                style={{
                                  textAlign: "start",
                                 
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  {/* <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Phone", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Phone", 'desc')} style={{ cursor: "pointer" }} />
                                  </div> */}
                                  Mobile No</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                 
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  {/* <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("floor_name", 'desc')} style={{ cursor: "pointer" }} />
                                  </div> */}
                                  Floor</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                  
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  {/* <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("room_name", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("room_name", 'desc')} style={{ cursor: "pointer" }} />
                                  </div> */}
                                  Room</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                 
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  {/* <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("bed_name", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("bed_name", 'desc')} style={{ cursor: "pointer" }} />
                                  </div> */}
                                  Bed</div>
                              </th>

                              <th
                                style={{
                                  textAlign: "start",
                                 
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                  whiteSpace: "nowrap"
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  {/* <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("CheckoutDate", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("CheckoutDate", 'desc')} style={{ cursor: "pointer" }} />
                                  </div> */}
                                  Check-Out Date</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  {/* <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("isActive", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("isActive", 'desc')} style={{ cursor: "pointer" }} />
                                  </div> */}
                                  Status</div>
                              </th>
                             
                            </tr>
                          </thead>
          
                          <tbody>
                            <PaginationList>
                              {sortedData && sortedData.length > 0 &&
                                sortedData.map((checkout) => (
                                  <tr key={checkout.customerId} className="customer-row">
                                    <td
                                      onClick={() => handleCustomerProfilePage(checkout)}
                                      style={{
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                    >
                                      <div className="d-flex align-items-center">
                                        <span
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            color: "#1E45E1",
                                           
                                            textAlign: "start",
                                            verticalAlign: "middle",
                                            cursor: "pointer",
                                          }}
                                          className="customer-name "
                                        >
                                          {checkout.firstName}
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
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                      className="p-0"
                                    >
                                      +
                                      {checkout &&
                                        checkout.countryCode}
                                      {" "}
                                      {checkout.mobile}
                                    </td>

                                    <td
                                      style={{
                                      
                                        border: "none",
                                        textAlign: "start",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        whiteSpace: "nowrap",
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                      className="p-0"
                                    >
                                     
                                        {checkout.floorName || "_"}
                                     
                                    </td>

                                    <td
                                      style={{
                                       
                                        border: "none",
                                        textAlign: "start",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        whiteSpace: "nowrap",
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                      className="p-0"
                                    >
                                     
                                        {checkout.roomName || "_"}
                                     
                                    </td>

                                    <td
                                      style={{
                                       
                                        border: "none",
                                        textAlign: "start",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        whiteSpace: "nowrap",
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                      className="p-0"
                                    >
                                    
                                        {checkout.bedName || "_"}
                                     
                                    </td>

                                    <td className="p-0"
                                      style={{
                                        // padding: "10px",
                                        border: "none",
                                        textAlign: "start",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        whiteSpace: "nowrap",
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                      
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
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {checkout.checkoutDate || "N/A"}
                                      </span>
                                    </td>

                                    <td
                                      style={{
                                        // padding: "10px",
                                        border: "none",
                                        textAlign: "start",
                                        fontSize: "13px",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        whiteSpace: "nowrap",
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                      className="p-0"
                                    >
                                      <span
                                        style={{
                                          backgroundColor: "pink",
                                          padding: 6,
                                          borderRadius: 10,
                                        }}
                                      >
                                        {checkout.currentStatus || '-'}
                                      </span>
                                    </td>

                                  
                                  </tr>
                                ))
                              }
                            </PaginationList>
                          </tbody>


                        </Table>
                      </div>
                    
                    </div>

                  ) : (!checkoutLoader && checkOutCustomer?.length === 0 && (
                    <div style={{ marginTop: 30,  }} className="animated-text">
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
                          fontSize: 18,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        No Checkout Tenant available{" "}
                      </div>
                      <div
                        className="pb-1"
                        style={{
                          textAlign: "center",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          fontSize: 14,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        There are no checkout tenant added{" "}
                      </div>

                    </div>
                  ))}
                </div>
              </div>

            }
            {(checkoutForm) && (
              <CheckOutForm
                show={checkoutForm}
                item={checkOutCustomer}
                handleClose={checkoutcloseModal}
                
              />
            )}


            

          </div>
        </>
      }

      {
        DueCustomerShow && <DueCustomerConfirmCheckout show={DueCustomerShow}  handleClose={handleCloseDuePopup} />
      }

 {
          CheckoutProfile && <CustomerProfile CheckoutProfile ={CheckoutProfile} setcheckoutTableShow= {setcheckoutTableShow} handleCloseCheckoutProfile={handleCloseCheckoutProfile} setCheckoutProfile={setCheckoutProfile} checkoutWithoutPay={checkoutWithoutPay}/>
        }


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
  customerCheckoutPermission: PropTypes.func.isRequired,
  filterStatus: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  checkoutDateRange: PropTypes.func.isRequired,
  setResetPage: PropTypes.func.isRequired,

};

export default CheckOut;

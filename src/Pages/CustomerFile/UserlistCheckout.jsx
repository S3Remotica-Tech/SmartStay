/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
// import Addbtn from "../../Assets/Images/New_images/add-circle.png"
// import { Edit, Trash } from "iconsax-react";
import { ArrowUp2, ArrowDown2, } from "iconsax-react";
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

function CheckOut(props) {


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
  const [activeDotsId, setActiveDotsId] = useState(null);
  // const [modalType, setModalType] = useState(null);
  

  const [checkOutCustomer, setCheckOutCustomer] = useState([]);
  const [checkOutPermissionError, setcheckOutPermissionError] = useState("");
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
        canWriteModule: canWriteCheckout,
        canReadModule: canReadCheckout,
        // canUpdateModule: canUpdateCheckout,
        canDeleteModule: canDeleteCheckout,
      } = useHasPermission("Checkout");

 

  const handleCustomerProfilePage = (checkout) => {
        // props?.handleCheckoutOverview(false)
    setCheckoutWithoutPay(checkout)
    // setCheckoutProfile(true)
    navigate(`/tenant/checkout/details/${checkout.customerId}`)
    setcheckoutTableShow(false)
    dispatch(checkoutCustomerProfile(false))
    // dispatch({
    //   type: "CHECKOUTPROFILEDETAILS",
    //   payload: { hostel_id: state.login.selectedHostel_Id, id: checkout.customerId },
    // });
    dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: checkout.customerId } });
    // props.setUserList(false)
    // props?.show()

    // props?.handleCheckoutOverview(false)
  }


  // useEffect(() => {
  //   const userType = props?.customerrolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setcheckOutPermissionError("");
  //       // setcheckOutEditPermissionError("Permission Denied");
  //       // setcheckOutDeletePermissionError("Permission Denied");

  //     } else if (state?.login?.planStatus === 1) {
  //       setcheckOutPermissionError("");
  //       // setcheckOutEditPermissionError("");
  //       // setcheckOutDeletePermissionError("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state?.login?.selectedHostel_Id, props.customerrolePermission])

  // useEffect(() => {
  //   const checkoutPermission = props.customerrolePermission[0]?.role_permissions?.find(
  //     (perm) => perm.permission_name === "Bookings"
  //   );

  //   const isOwner = props.customerrolePermission[0]?.user_details?.user_type === "staff";
  //   const planActive = state?.login?.planStatus === 1;

  //   if (!checkoutPermission || !isOwner) return;


  //   if (checkoutPermission.per_view === 1 && planActive) {
  //     setcheckOutPermissionError("");
  //   } else {
  //     setcheckOutPermissionError("Permission Denied");
  //   }





  //   // if (checkoutPermission.per_edit === 1 && planActive) {
  //   //   setcheckOutEditPermissionError("");
  //   // } else {
  //   //   setcheckOutEditPermissionError("Permission Denied");
  //   // }

  //   // if (checkoutPermission.per_delete === 1 && planActive) {
  //   //   setcheckOutDeletePermissionError("");
  //   // } else {
  //   //   setcheckOutDeletePermissionError("Permission Denied");
  //   // }
  // }, [props.customerrolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);



  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setCheckOutLoader(true)
      dispatch({ type: "CHECKOUTCUSTOMERLIST",payload: { hostelId: state.login.selectedHostel_Id } });
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
      setCheckOutCustomer(state.UsersList.CheckOutCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
      }, 10);
    }
  }, [state.UsersList.GetCheckOutCustomerStatusCode]);





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
  const popupRef = useRef(null);

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

  const currentCustomers = React.useMemo(() => {
    const useFiltered =
      props.search ||
      props.filterStatus ||
      (props.checkoutDateRange?.length === 2);

    if (useFiltered) {
      return props.filteredUsers || [];
    }

    return checkOutCustomer || [];
  }, [
    props.search,
    props.filterStatus,
    props.checkoutDateRange,
    props.filteredUsers,

  ]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentCustomers;

    const sorted = [...currentCustomers].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
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

  // useEffect(() => {
  //   if (props.resetPage) {
  //     setCurrentPage(1);
  //     props.setResetPage(false);
  //   }
  // }, [props.resetPage]);

  // const [checkOutEdit, setCheckOutEdit] = useState("");
  // const [checkouteditaction, setCheckoutEditAction] = useState(false)
  const [checkOutconfirm, setCheckOutConfirm] = useState("");
  // const [deleteCheckOutCustomer, setDeleteCheckOutCustomer] = useState("");
  // const [checkoutaction, setCheckoutAction] = useState(false)
  // const [conformEdit, setConformEdit] = useState(false)
  const [DueCustomerShow, setDueCustomerShow] = useState(false)
  const [CheckOutDetails, setCheckOutDetails] = useState("");


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




  const handleConfirmCheckout = (checkout) => {
    if (checkout.customerId) {
      dispatch({
        type: "GETCONFIRMCHECKOUTCUSTOMER",
        payload: { id: checkout.customerId, hostel_id: checkout.Hostel_Id },
      });
    }
    setCheckOutDetails(checkout)
  }






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
    if (state.UsersList.statusCodegetConfirmCheckout && CheckOutDetails) {
      setDueCustomerShow(true);

    }

    setTimeout(() => {
      dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
    }, 500);
  }, [state.UsersList.statusCodegetConfirmCheckout, CheckOutDetails]);




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



  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const toggleMoreOptions = (id, checkout, event) => {
    setCheckOutConfirm(checkout)
    if (activeDotsId === id) {
      setActiveDotsId(null);
    } else {
      setActiveDotsId(id);
    }



    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = (top + height / 2) - 45;


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
                      className="p-0 booking-table-userlist  booking-table me-4"
                      style={{ paddingBottom: "20px", marginLeft: "-14px" }}
                    >
                      <div

                        className='show-scrolls'
                        style={{

                          height: sortedData?.length >= 5 || sortedData?.length >= 5 ? "430px" : "auto",
                          overflow: "auto",
                          borderTop: "1px solid #E8E8E8",
                          marginBottom: 20,
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
                                  padding: "10px",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",

                                  paddingLeft: "20px"
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
                                  whiteSpace: "nowrap"
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
                                  whiteSpace: "nowrap"
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
                              {/* <th
                                style={{
                                  textAlign: "start",
                                  padding: "10px",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  background: "#E7F1FF",
                                  border: "none",
                                  paddingBottom: 12
                                }}
                              >
                                Action
                              </th> */}
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
                                            paddingLeft: "4px",
                                            textAlign: "start",
                                            verticalAlign: "middle",
                                            cursor: "pointer",
                                          }}
                                          className="customer-name ps-4 ps-sm-2 ps-md-3 ps-lg-4"
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
                                      className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                                    >
                                      +
                                      {checkout &&
                                        checkout.countryCode}
                                      {" "}
                                      {checkout.mobile}
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
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
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
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {checkout.floorName || "_"}
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
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
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
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {checkout.roomName || "_"}
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
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
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
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {checkout.bedName || "_"}
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
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
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
                                          verticalAlign: "middle",
                                        }}
                                      >
                                        {checkout.checkoutDate || "N/A"}
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
                                        verticalAlign: "middle",
                                        borderBottom: "1px solid #E8E8E8",
                                      }}
                                      className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                                    >
                                      <span
                                        style={{
                                          backgroundColor: "pink",
                                          padding: 8,
                                          borderRadius: 10,
                                        }}
                                      >
                                        {checkout.currentStatus || '-'}
                                      </span>
                                    </td>

                                    {/* <td style={{ borderBottom: "1px solid #E8E8E8" }}>
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
                                          backgroundColor: activeDotsId === checkout.customerId ? "#E7F1FF" : "white",
                                        }}
                                        onClick={(e) => toggleMoreOptions(checkout.customerId, checkout, e)}
                                      >
                                        <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                                        {activeDotsId === checkout.customerId && (
                                          <div
                                            ref={popupRef}
                                            style={{
                                              position: "fixed",
                                              top: popupPosition.top,
                                              left: popupPosition.left - 20,
                                              width: 200,
                                              backgroundColor: "#F9F9F9",
                                              border: "1px solid #F9F9F9",
                                              borderRadius: 12,
                                              display: "flex",
                                              flexDirection: "column",
                                              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                              padding: 10,
                                              zIndex: 10,
                                            }}
                                          >
                                            {checkout.isActive !== 0 && (
                                              <div
                                                className="d-flex align-items-center"
                                                onClick={() => {
                                                  if (canWriteCheckout) {
                                                    handleConfirmCheckout(checkout);
                                                  }
                                                }}
                                                style={{
                                                  cursor: !canWriteCheckout ? "not-allowed" : "pointer",
                                                  opacity: !canWriteCheckout ? 0.5 : 1,
                                                  padding: "6px 8px",
                                                  borderRadius: 6,
                                                  transition: "background-color 0.2s ease",
                                                }}
                                                onMouseEnter={(e) => {
                                                
                                                    e.currentTarget.style.backgroundColor = "#FFF3F3";
                                                  
                                                }}
                                                onMouseLeave={(e) => {
                                                  e.currentTarget.style.backgroundColor = "transparent";
                                                }}
                                              >
                                                <img
                                                  src={Addbtn}
                                                  alt="checkout icon"
                                                  style={{ height: 16, width: 16, marginRight: 8 }}
                                                />
                                                <label
                                                  style={{
                                                    fontSize: 14,
                                                    fontWeight: 600,
                                                    fontFamily: "Gilroy, sans-serif",
                                                    color: !canWriteCheckout ? "#A9A9A9" : "#222222",
                                                    cursor:  !canWriteCheckout ? "not-allowed" : "pointer",
                                                  }}
                                                >
                                                  Confirm Check-Out
                                                </label>
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </td> */}
                                  </tr>
                                ))
                              }
                            </PaginationList>
                          </tbody>


                        </Table>
                      </div>
                    
                    </div>

                  ) : (!checkoutLoader && currentCustomers?.length === 0 && (
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
                // currentItem={checkOutEdit}
                data={checkOutconfirm}
              // checkouteditaction={checkouteditaction}
              // checkoutaction={checkoutaction}
              // cofirmForm={cofirmForm}
              // setConfirmForm={setConfirmForm}
              // handleCloseConformForm={handleCloseConformForm}
              // conformEdit={conformEdit}
              />
            )}


            {/* <Modal
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
        </Modal> */}














          </div>
        </>
      }

      {
        DueCustomerShow && <DueCustomerConfirmCheckout show={DueCustomerShow} data={CheckOutDetails} handleClose={handleCloseDuePopup} />
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

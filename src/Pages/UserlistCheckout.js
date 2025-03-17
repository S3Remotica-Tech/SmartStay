/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";
import Addbtn from "../Assets/Images/New_images/add-circle.png"
import Delete from "../Assets/Images/New_images/trash.png";
import Edit from "../Assets/Images/edit_blue.svg";
// import { Modal, Pagination, Form, Card } from "react-bootstrap";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
// import Flatpickr from "react-flatpickr";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import CheckOutForm from "./UserListCheckoutForm";
import Emptystate from "../Assets/Images/Empty-State.jpg";
// import Image from "react-bootstrap/Image";
import { MdError } from "react-icons/md";
// import minus from "../Assets/Images/New_images/minus-square.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  Table,
  Button,
  Modal,
  
} from "react-bootstrap";
import PropTypes from "prop-types";


function CheckOut(props) {




  const state = useSelector((state) => state);
  const dispatch = useDispatch();


  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 10;
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [checkOutCustomer, setCheckOutCustomer] = useState([]);
  const [checkOutPermissionError, setcheckOutPermissionError] = useState("");
  const [checkOutEditPermissionError, setcheckOutEditPermissionError] = useState("");
  const [checkOutDeletePermissionError, setcheckOutDeletePermissionError] = useState("");
  const [checkoutLoader,setCheckOutLoader] = useState(true)


  

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
    setCheckOutLoader(true)
    dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
  }, [state.login.selectedHostel_Id]);


 useEffect(() => {
       dispatch({ type: 'AVAILABLECHECKOUTCUSTOMER', payload: { hostel_id: state.login.selectedHostel_Id } })
     
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

    console.log("state.UsersList?.checkoutcustomeEmpty",state.UsersList?.checkoutcustomeEmpty)
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

  // Pagination logic
  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  // const currentCustomers = props.filteredUsers?.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const currentCustomers = props.filterInput.length > 0 ? props.filteredUsers :checkOutCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);

  // const totalPages = Math.ceil(props.filteredUsers?.length / itemsPerPage);
  const totalPages = Math.ceil(
    (props.search ? props.filteredUsers?.length : checkOutCustomer?.length) / itemsPerPage
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1)
  };


  const [checkOutEdit, setCheckOutEdit] = useState("");
  const [checkouteditaction, setCheckoutEditAction] = useState(false)
  const [checkOutconfirm, setCheckOutConfirm] = useState("");
  const [deleteCheckOutCustomer, setDeleteCheckOutCustomer] = useState("");
  const [checkoutaction, setCheckoutAction] = useState(false)

  const handleEdit = (checkout) => {
    setActiveDotsId(null);
    setcheckoutForm(true);
    setCheckOutEdit(checkout);
    setCheckoutEditAction(true)
    setCheckoutAction(false)
  };

  const handleConfirmCheckout = () => {
    setActiveDotsId(null);
    setcheckoutForm(true);
    // setCheckOutConfirm(checkout)
    setCheckoutAction(true)
    setCheckoutEditAction(false)
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
    // const popupLeft = left - 220;

    const popupLeft = left - (checkOutconfirm.isActive === 0 || checkOutconfirm.isActive === '0' ? 250 : 290);
    

    setPopupPosition({ top: popupTop, left: popupLeft });


    setTimeout(() => {
      if (popupRef.current) {
        const popupWidth = popupRef.current.offsetWidth;
        const popupLeft = left - popupWidth + 0; // fine-tune +40 as needed
        setPopupPosition({ top: popupTop, left: popupLeft });
      }
    }, 0);



  };

  // const handleDotsClick = (id, checkout) => {
  //   setActiveDotsId((prevId) => (prevId === id ? null : id));
  //   setCheckOutConfirm(checkout)
  // };

  // const handleCalendarClick = () => {
  //   if (datePickerRef.current) {
  //     datePickerRef.current.setFocus();
  //   }
  // };

  // const handleCustomerChange = (event) => {
  //   setSelectedCustomer(event.target.getAttribute("data-value"));
  // };


  //edit form
  // const initialDate = new Date();
  // const formatDate = (date) => {
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}-${month}-${year}`;
  // };


 
  



  const [checkoutForm, setcheckoutForm] = useState(false);
  // const [checkoutconfirmForm, setcheckoutConfirmForm] = useState(false);

  // const checkOutForm = () => {
  //   setcheckoutForm(!checkoutForm);
  // };

  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  // const checkOutConfirmForm = () => {
  //   setcheckoutConfirmForm(!checkoutconfirmForm);
  // };

  // const checkoutConfirmcloseModal = () => {
  //   setcheckoutConfirmForm(false);
  // };

  // const paginate = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  
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

        <div className="p-10" style={{ marginLeft: "-20px" }}>
          <div>
            {currentCustomers?.length > 0 ?  (
              <div
                className="p-10 booking-table-userlist"
                style={{ paddingBottom: "20px" }}
              >
                <div
                  style={{
                    // height: "400px",
                    height: currentCustomers.length >= 6 ? "380px" : "auto",
                    overflowY: currentCustomers.length >= 6 ? "auto" : "visible",
                    borderRadius: "24px",
                    border: "1px solid #DCDCDC",
                    // borderBottom:"none"
                  }}
                >
                  <Table
                    responsive="md"
                    className="Table_Design"
                    style={{ border: "1px solid #DCDCDC", borderBottom: "1px solid transparent", borderEndStartRadius: 0, borderEndEndRadius: 0 }}
                  >
                    <thead
                      style={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <tr>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            borderTopLeftRadius: 24,
                            paddingLeft:"20px"
                          }}
                        >
                          Name
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Mobile No
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Floor
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Room
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Bed
                        </th>

                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Check-out Date
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          Status
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            borderTopRightRadius: "24px",
                          }}
                        ></th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentCustomers && currentCustomers.length > 0 && currentCustomers.map((checkout) => {
                        //  let Dated = new Date(customer.joining_date);

                        //  let day = Dated.getDate();
                        //  let month = Dated.getMonth() + 1;
                        //  let year = Dated.getFullYear();
                        // let formattedDate = `${year}/${month}/${day}`;

                        // let Dated = new Date(checkout.CheckoutDate);

                        // let day = Dated.getDate();
                        // let month = Dated.getMonth(); 
                        // Get the zero-indexed month
                        // let year = Dated.getFullYear();

                        // Array of month names abbreviated to the first 3 letters
                        // const monthNames = [
                        //   "Jan",
                        //   "Feb",
                        //   "Mar",
                        //   "Apr",
                        //   "May",
                        //   "Jun",
                        //   "Jul",
                        //   "Aug",
                        //   "Sep",
                        //   "Oct",
                        //   "Nov",
                        //   "Dec",
                        // ];

                        // Get the month abbreviation
                        // let formattedMonth = monthNames[month];

                        // Format the date as YYYY Mon DD
                        // let formattedDate = `${year} ${formattedMonth} ${day}`;


                        // let createDated = new Date(checkout.createdat);

                        // let day1 = createDated.getDate();
                        // let month1 = createDated.getMonth() + 1;
                        // let year1 = createDated.getFullYear();

                        // const monthNamesformate = [
                        //   "Jan",
                        //   "Feb",
                        //   "Mar",
                        //   "Apr",
                        //   "May",
                        //   "Jun",
                        //   "Jul",
                        //   "Aug",
                        //   "Sep",
                        //   "Oct",
                        //   "Nov",
                        //   "Dec",
                        // ];
                        // let formattedMonthjj = monthNamesformate[month1];
                        // let formattedDatecreate = `${year1} ${formattedMonthjj} ${day1}`;

                        return (
                          <tr key={checkout.ID} className="customer-row">

                            <td style={{verticalAlign: "middle"}}>
                              <div className="d-flex align-items-center">
                                {/* <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" /> */}
                                <span
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                    color: "#222222",
                                    paddingLeft: "4px",
                                    textAlign: "start",
                                    verticalAlign: "middle"
                                  }}
                                  className="ms-2 customer-name"
                                >
                                  {checkout.Name}
                                </span>
                              </div>
                            </td>


                            <td
                               style={{
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                color: "#000000",
                                textAlign: "start",
                                verticalAlign: "middle",
                              }}
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
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle"
                              }}
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "14px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                  display: "inline-block",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  verticalAlign: "middle"
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
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle"
                              }}
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "14px",
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
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle"
                              }}
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "14px",
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
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle"
                              }}
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "14px",
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
                            {/* <td
                        style={{
                          padding: "10px",
                          border: "none",
                          textAlign: "start",
                          fontSize: "16px",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <span
                          style={{
                            padding: "3px 10px",
                            borderRadius: "60px",
                            backgroundColor: "#EBEBEB",
                            textAlign: "start",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            display: "inline-block",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {checkout.formattedDate}
                        </span>
                      </td> */}
                            <td style={{
                              padding: "10px",
                              border: "none",
                              textAlign: "start",
                              fontSize: "16px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              verticalAlign: "middle",
                              whiteSpace: "nowrap", color: checkout.BalanceDue === 0 ? "green" : "red"
                            }}>
                              {checkout.isActive === 0 ? <span style={{ backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Completed</span> : <span
                                style={{ cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000', borderRadius: '14px', padding: "8px 12px" }}>Pending</span>}</td>


                            <td>
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
                                  // zIndex:
                                  //   activeDotsId === checkout.ID ? 1000 : "auto",
                                    backgroundColor: activeDotsId === checkout.ID   ? "#E7F1FF" : "white",
                                }}
                                onClick={(e) => toggleMoreOptions(checkout.ID, checkout, e)}
                              // onClick={() => handleDotsClick(checkout.id , checkout)}
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
                                      // width: 200,
                                      width:checkout.isActive === 0 ? 100:200,
                                      border: "1px solid #F9F9F9",
                                      borderRadius: 12,
                                      display: "flex",
                                      flexDirection: "column",
                                      justifyContent: "center",
                                      padding: 15,
                                      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                      zIndex: 10,
                                      // marginTop: "140px",
                                      marginRight: "20px",
                                    }}
                                  >

                                    {/* <div className="d-flex align-items-center"
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
                                          // color: "#FF0000",
                                          cursor: checkOutEditPermissionError
                                          ? "not-allowed"
                                          : "pointer",
                                        }}
                                      >
                                        Confirm Check-Out
                                      </label>
                                    </div> */}

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

{
  checkout.isActive !== 0 && (
    <div
    className="mb-2 mt-2 d-flex align-items-center"
    onClick={() => {
      if (!checkOutEditPermissionError) {
        handleEdit(checkout);
      }
    }}
    style={{
      cursor: checkOutEditPermissionError
        ? "not-allowed"
        : "pointer",
      pointerEvents: checkOutEditPermissionError
        ? "none"
        : "auto",
      opacity: checkOutEditPermissionError ? 0.5 : 1,
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
        fontWeight: 600,
        fontFamily: "Gilroy",
        color: "#222222",
        cursor: checkOutEditPermissionError
        ? "not-allowed"
        : "pointer",
      }}
    >
      Edit
    </label>
  </div>
  )
}
                                   

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
                {(props.search ? props.filteredUsers?.length : checkOutCustomer?.length) >= 5 && (

                

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


        // (
        //   <div className="">
        //     {currentCustomers.length > 0 ? (
        //       <div className="row mt-3 row-gap-3">
        //         {currentCustomers.map((checkout, index) => (
        //           <div
        //             key={index}
        //             className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
        //           >
        //             <Card
        //               className=" h-100 border p-3"
        //               style={{
        //                 borderColor: "#E6E6E6",
        //                 borderWidth: "1px",
        //                 borderRadius: "16px",
        //                 position: "relative",
        //               }}
        //             >
        //               <div className="d-flex align-items-center">
        //                 <Image
        //                   src={
        //                     checkout.profile &&
        //                     checkout.profile !== "0" &&
        //                     checkout.profile.trim() !== ""
        //                       ? checkout.profile
        //                       : People
        //                   }
        //                   roundedCircle
        //                   style={{ height: "60px", width: "60px" }}
        //                   alt="profile"
        //                 />

        //                 {/* <img src={Room} alt="Room Image" /> */}
        //                 <div style={{ marginLeft: "10px" }}>
        //                   <p
        //                     className="mb-0 font-weight-bold"
        //                     style={{
        //                       fontFamily: "Gilroy",
        //                       fontSize: "16px",
        //                       fontWeight: "600",
        //                       color: "#222222",
        //                     }}
        //                   >
        //                     {checkout.HostelName}
        //                   </p>
        //                   <p
        //                     className="mb-0 mt-2"
        //                     style={{
        //                       fontFamily: "Gilroy",
        //                       fontSize: "14px",
        //                       fontWeight: "500",
        //                       color: "black",
        //                       borderRadius: "60px",
        //                       backgroundColor: "#FFEFCF",
        //                       textAlign: "center",
        //                       width: "110px",
        //                       border: "1px solid #FFEFCF",
        //                     }}
        //                   >
        //                     Paying Guest
        //                   </p>
        //                 </div>

        //                 <img
        //                   src={More}
        //                   alt="More Icon"
        //                   className="ml-auto border p-2"
        //                   style={{
        //                     borderRadius: "60px",
        //                     color: "#E6E6E6",
        //                     borderWidth: "1px",
        //                     marginLeft: "auto",
        //                     cursor: "pointer",
        //                   }}
        //                   onClick={() => toggleMoreOptions(index,checkout)}
        //                 />

        //                 {activeDotsId === index && (
        //                   <div
        //                     style={{
        //                       cursor: "pointer",
        //                       backgroundColor: "#EBEBEB",
        //                       position: "absolute",
        //                       right: 0,
        //                       width: 200,
        //                       border: "1px solid #EBEBEB",
        //                       borderRadius: 12,
        //                       display: "flex",
        //                       flexDirection: "column",
        //                       justifyContent: "center",
        //                       padding: 15,
        //                       boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        //                       zIndex: 10,
        //                       marginTop: "140px",
        //                       marginRight: "20px",
        //                     }}
        //                   >

        //         <div  className="d-flex align-items-center"
        //          onClick={() => {
        //           if (!checkOutEditPermissionError) {
        //             handleConfirmCheckout(checkout);
        //           }
        //         }}
        //       >
        //                       <img
        //                         src={Addbtn}
        //                         style={{
        //                           height: 16,
        //                           width: 16,
        //                           marginRight: "8px",
        //                         }}
        //                         alt="checkout icon"
        //                       />
        //                       <label
        //                         style={{
        //                           fontSize: 14,
        //                           fontWeight: 600,
        //                           fontFamily: "Gilroy",
        //                           // color: "#FF0000",
        //                         }}
        //                       >
        //                         Confirm Check-Out
        //                       </label>
        //                     </div>

        //                     <div  className="d-flex align-items-center mt-2" >
        //                       <img
        //                         src={Addbtn}
        //                         style={{
        //                           height: 16,
        //                           width: 16,
        //                           marginRight: "8px",
        //                         }}
        //                         alt="checkout icon"
        //                       />
        //                       <label
        //                         style={{
        //                           fontSize: 14,
        //                           fontWeight: 600,
        //                           fontFamily: "Gilroy",
        //                           // color: "#FF0000",
        //                         }}
        //                       >
        //                         Reassign bed
        //                       </label>
        //                     </div>

        //                     <div
        //                       className="mb-2 mt-2 d-flex align-items-center"
        //                       onClick={() => {
        //                         if (!checkOutEditPermissionError) {
        //                           handleEdit(checkout);
        //                         }
        //                       }}
        //                       style={{
        //                         cursor: checkOutEditPermissionError
        //                           ? "not-allowed"
        //                           : "pointer",
        //                         pointerEvents: checkOutEditPermissionError
        //                           ? "none"
        //                           : "auto",
        //                         opacity: checkOutEditPermissionError ? 0.5 : 1,
        //                       }}
        //                     >
        //                       <img
        //                         src={Edit}
        //                         style={{
        //                           height: 16,
        //                           width: 16,
        //                           marginRight: "8px",
        //                         }}
        //                         alt="Edit icon"
        //                       />
        //                       <label
        //                         style={{
        //                           fontSize: 14,
        //                           fontWeight: 600,
        //                           fontFamily: "Gilroy",
        //                           color: "#222222",
        //                         }}
        //                       >
        //                         Edit
        //                       </label>
        //                     </div>

        //                     <div
        //                       className="d-flex align-items-center"
        //                       onClick={() => {
        //                         if (!checkOutDeletePermissionError) {
        //                           handleDelete(checkout);
        //                         }
        //                       }}
        //                       style={{
        //                         cursor: checkOutDeletePermissionError
        //                           ? "not-allowed"
        //                           : "pointer",
        //                         pointerEvents: checkOutDeletePermissionError
        //                           ? "none"
        //                           : "auto",
        //                         opacity: checkOutDeletePermissionError ? 0.5 : 1,
        //                       }}
        //                     >
        //                       <img
        //                         src={Delete}
        //                         style={{
        //                           height: 16,
        //                           width: 16,
        //                           marginRight: "8px",
        //                         }}
        //                         alt="Delete icon"
        //                       />
        //                       <label
        //                         style={{
        //                           fontSize: 14,
        //                           fontWeight: 600,
        //                           fontFamily: "Gilroy",
        //                           color: "#FF0000",
        //                         }}
        //                       >
        //                         Delete
        //                       </label>
        //                     </div>


        //                   </div>
        //                 )}
        //               </div>

        //               <hr style={{ border: "1px solid #E7E7E7" }} />


        //               <div className="d-flex justify-content-between align-items-center mb-1 mt-1 flex-wrap">
        //                 <div className="pb-1" style={{ lineHeight: 1 }}>
        //                   <div className="pb-1">
        //                     <label
        //                       style={{
        //                         color: "#939393",
        //                         fontSize: 12,
        //                         fontWeight: 500,
        //                         fontFamily: "Gilroy",
        //                       }}
        //                     >
        //                       Customer
        //                     </label>
        //                   </div>

        //                   <div>
        //                     <label
        //                       style={{
        //                         fontSize: "14px",
        //                         fontWeight: "600",
        //                         color: "Black",
        //                         marginRight: "20px",
        //                         lineHeight: "1",
        //                       }}
        //                     >
        //                       <Image
        //                         src={
        //                           checkout.user_profile &&
        //                           checkout.user_profile !== "0" &&
        //                           checkout.user_profile.trim() !== ""
        //                             ? checkout.user_profile
        //                             : People
        //                         }
        //                         roundedCircle
        //                         style={{
        //                           height: "30px",
        //                           width: "30px",
        //                           marginRight: "5px",
        //                         }}
        //                       />

        //                       {checkout.Name}
        //                     </label>
        //                   </div>
        //                 </div>

        //                 <div className="pb-1" style={{ lineHeight: 1 }}>
        //                   <div className="">
        //                     <label
        //                       style={{
        //                         color: "#939393",
        //                         fontSize: 12,
        //                         fontWeight: 500,
        //                         fontFamily: "Gilroy",
        //                       }}
        //                     >
        //                       Check-out Date
        //                     </label>
        //                   </div>
        //                   <div className="text-center">
        //                     <label
        //                       style={{
        //                         fontSize: "14px",
        //                         fontWeight: "600",
        //                         color: "Black",
        //                         marginRight: "68px",
        //                         lineHeight: "1",
        //                         fontFamily: "Gilroy",
        //                       }}
        //                     >
        //                       {moment(checkout.CheckoutDate, "YYYY-MM-DD").format(
        //                         "DD MMM YYYY"
        //                       )}
        //                     </label>
        //                   </div>
        //                 </div>

        //                 <div className="pb-1" style={{ lineHeight: 1 }}>
        //                   <div className="">
        //                     <label
        //                       style={{
        //                         color: "#939393",
        //                         fontSize: 12,
        //                         fontWeight: 500,
        //                         fontFamily: "Gilroy",
        //                       }}
        //                     >
        //                       Notice Days
        //                     </label>
        //                   </div>
        //                   <div>
        //                     <label
        //                       style={{
        //                         fontSize: "14px",
        //                         fontWeight: "600",
        //                         color: "Black",
        //                         marginRight: "16px",
        //                         lineHeight: "1",
        //                         fontFamily: "Gilroy",
        //                       }}
        //                     >
        //                       {checkout.notice_period}
        //                     </label>
        //                   </div>
        //                 </div>
        //               </div>

        //               <div>
        //                 <p
        //                   style={{
        //                     fontSize: "12px",
        //                     fontWeight: "500",
        //                     color: "#4B4B4B",
        //                     fontFamily: "Gilroy",
        //                   }}
        //                 >
        //                   Comment
        //                 </p>
        //               </div>

        //               <div style={{ marginTop: "-10px" }}>
        //                 <p
        //                   style={{
        //                     fontSize: "14px",
        //                     fontWeight: "600",
        //                     color: "#222222",
        //                     fontFamily: "Gilroy",
        //                   }}
        //                 >
        //                   {checkout.checkout_comment}
        //                 </p>
        //               </div>
        //             </Card>
        //           </div>
        //         ))}
        //       </div>
        //     ) : (
        //       <div
        //         className="d-flex align-items-center justify-content-center "
        //         style={{ width: "100%", height: 350, margin: "0px auto" }}
        //       >
        //         <div>
        //           <div className="no-data-container">
        //             <Image src={Emptystate} alt="No Data" />
        //             <div
        //               className="pb-1"
        //               style={{
        //                 textAlign: "center",
        //                 fontWeight: 600,
        //                 fontFamily: "Gilroy",
        //                 fontSize: 20,
        //                 color: "rgba(75, 75, 75, 1)",
        //                 paddingTop: "10px",
        //               }}
        //             >
        //               No Check-out available
        //             </div>
        //             <div
        //               className="pb-1"
        //               style={{
        //                 textAlign: "center",
        //                 fontWeight: 500,
        //                 fontFamily: "Gilroy",
        //                 fontSize: 20,
        //                 color: "rgba(75, 75, 75, 1)",
        //               }}
        //             >
        //               There are no Check-out added.
        //             </div>
        //           </div>
        //           <div style={{ textAlign: "center" }}>
        //             <Button
        //               disabled={props.customerCheckoutPermission}
        //               onClick={checkOutForm}
        //               style={{
        //                 fontSize: 16,
        //                 backgroundColor: "#1E45E1",
        //                 color: "white",
        //                 height: 56,
        //                 fontWeight: 600,
        //                 borderRadius: 12,
        //                 width: 200,
        //                 padding: "18px 20px",
        //                 fontFamily: "Montserrat",
        //                 marginTop: "20px",
        //               }}
        //             >
        //               + Add Check-out
        //             </Button>
        //           </div>
        //         </div>
        //         <div></div>
        //       </div>
        //     )}

        //     {currentCustomers.length > 0 && (
        //       <Pagination className="mt-4 d-flex justify-content-end align-items-center">
        //         <Pagination.Prev
        //           style={{ visibility: "visible" }}
        //           onClick={() => paginate(currentPage - 1)}
        //           disabled={currentPage === 1}
        //         />
        //         {/* <span style={{fontSize:8, color:"#1E45E1"}}>Previous</span> */}
        //         {renderPagination()}
        //         {/* <span style={{fontSize:8, color:"#1E45E1"}}>Next</span> */}
        //         <Pagination.Next
        //           style={{ visibility: "visible" }}
        //           onClick={() => paginate(currentPage + 1)}
        //           disabled={currentPage === totalPages}
        //         />
        //       </Pagination>
        //     )}

        // <Modal
        //   show={modalType === "delete"}
        //   onHide={handleModalClose}
        //   centered
        //   backdrop="static"
        //   style={{
        //     width: 388,
        //     height: 250,
        //     marginLeft: "500px",
        //     marginTop: "200px",
        //   }}
        // >
        //   <Modal.Header style={{ borderBottom: "none" }}>
        //     <Modal.Title
        //       style={{
        //         fontSize: "18px",
        //         fontFamily: "Gilroy",
        //         textAlign: "center",
        //         fontWeight: 600,
        //         color: "#222222",
        //         flex: 1,
        //       }}
        //     >
        //       Delete Check-out
        //     </Modal.Title>
        //   </Modal.Header>

        //   <Modal.Body
        //     style={{
        //       fontSize: 14,
        //       fontWeight: 500,
        //       fontFamily: "Gilroy",
        //       color: "#646464",
        //       textAlign: "center",
        //       marginTop: "-20px",
        //     }}
        //   >
        //     Are you sure you want to delete this check-out?
        //   </Modal.Body>

        //   <Modal.Footer
        //     style={{
        //       justifyContent: "center",
        //       borderTop: "none",
        //       marginTop: "-10px",
        //     }}
        //   >
        //     <Button
        //       style={{
        //         width: 160,
        //         height: 52,
        //         borderRadius: 8,
        //         padding: "12px 20px",
        //         background: "#fff",
        //         color: "#1E45E1",
        //         border: "1px solid #1E45E1",
        //         fontWeight: 600,
        //         fontFamily: "Gilroy",
        //         fontSize: "14px",
        //         marginRight: 10,
        //       }}
        //       onClick={handleModalClose}
        //     >
        //       Cancel
        //     </Button>
        //     <Button
        //       style={{
        //         width: 160,
        //         height: 52,
        //         borderRadius: 8,
        //         padding: "12px 20px",
        //         background: "#1E45E1",
        //         color: "#FFFFFF",
        //         fontWeight: 600,
        //         fontFamily: "Gilroy",
        //         fontSize: "14px",
        //       }}
        //       onClick={confirmDelete}
        //     >
        //       Delete
        //     </Button>
        //   </Modal.Footer>
        // </Modal>

        // {checkoutForm && (
        //   <CheckOutForm
        //     show={checkoutForm}
        //     // confirmcheckoutform = {checkoutconfirmForm}
        //     // handlecloseform = {checkoutConfirmcloseModal}
        //     handleClose={checkoutcloseModal}
        //     currentItem={checkOutEdit}
        //     data={checkOutconfirm}
        //     checkouteditaction={checkouteditaction}
        //     checkoutaction={checkoutaction}
        //   />
        // )}
        //   </div>
        // )
      }
      {checkoutForm && (
        <CheckOutForm
          show={checkoutForm}
          // confirmcheckoutform = {checkoutconfirmForm}
          // handlecloseform = {checkoutConfirmcloseModal}
          item={checkOutCustomer}
          handleClose={checkoutcloseModal}
          currentItem={checkOutEdit}
          data={checkOutconfirm}
          checkouteditaction={checkouteditaction}
          checkoutaction={checkoutaction}
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

};

export default CheckOut;

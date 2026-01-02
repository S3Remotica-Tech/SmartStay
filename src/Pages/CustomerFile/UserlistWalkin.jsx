/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal, Button } from "react-bootstrap";
import "./UserlistWalkin.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Trash } from "iconsax-react";
// import CustomerForm from "./UserlistWalkinForm";
// import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
// import { MdError } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";;
import PropTypes from "prop-types";
// import moment from "moment";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
// import { ArrowUp2, ArrowDown2, } from "iconsax-react";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import Addbook from "../../Assets/Images/New_images/calendar-tick.svg";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Addbooking from "./Addbookingform";
import UserlistForm from "./UserlistForm";

function UserlistWalkin() {
  const state = useSelector((state) => state);
  const [tenantDetails, setTenantDetails] = useState("");
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [showFormCheckIn, setShowFormCheckIn] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dotsButton, setDotsButton] = useState(null);
  // const [checkinNew, setCheckInNew] = useState("");
  // const [walkInEditPermissionError, setWalkInEditPermissionError] =    useState("");
  // const [walkInDeletePermissionError, setWalkInDeletePermissionError] = useState("");
  const [formLoading, setFormLoading] = useState(false)


  //   const canReadWalkin = useHasPermission("Walk in", "canRead")
  // const canWriteWalkin = useHasPermission("Walk in", "canWrite")
  //   const canUpdateWalkin = useHasPermission("Walk in", "canUpdate")
  //   const canDeleteWalkin = useHasPermission("Walk in", "canDelete")



  const {
    canWriteModule: canWriteWalkin,
    canReadModule: canReadWalkin,
    // canUpdateModule: canUpdateWalkin,
    canDeleteModule: canDeleteWalkin,
  } = useHasPermission("Walk in");




  // useEffect(() => {
  //   const userType = props.customerrolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setWalkInPermissionError("");
  //       setWalkInEditPermissionError("Permission Denied");
  //       setWalkInDeletePermissionError("Permission Denied");

  //     } else if (state?.login?.planStatus === 1) {
  //       setWalkInPermissionError("");
  //       setWalkInEditPermissionError("");
  //       setWalkInDeletePermissionError("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state?.login?.selectedHostel_Id, props.customerrolePermission])

  // useEffect(() => {
  //   const WalkinPermission = props.customerrolePermission[0]?.role_permissions?.find(
  //     (perm) => perm.permission_name === "Walk In"
  //   );

  //   const isOwner = props.customerrolePermission[0]?.user_details?.user_type === "staff";
  //   const planActive = state?.login?.planStatus === 1;

  //   if (!WalkinPermission || !isOwner) return;


  //   if (WalkinPermission.per_view === 1 && planActive) {
  //     setWalkInPermissionError("");
  //   } else {
  //     setWalkInPermissionError("Permission Denied");
  //   }





  //   if (WalkinPermission.per_edit === 1 && planActive) {
  //     setWalkInEditPermissionError("");
  //   } else {
  //     setWalkInEditPermissionError("Permission Denied");
  //   }

  //   if (WalkinPermission.per_delete === 1 && planActive) {
  //     setWalkInDeletePermissionError("");
  //   } else {
  //     setWalkInDeletePermissionError("Permission Denied");
  //   }
  // }, [props.customerrolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);

  const popupRef = useRef(null);

  // const [showDeleteModal, setShowDeleteModal] = useState(false);
  // const [customerToDelete, setCustomerToDelete] = useState(null);

  const [walkInCustomer, setWalkInCustomer] = useState([]);
  const [walkinLoader, setWalkingLoader] = useState(false);

  const [deleteShow, setDeleteShow] = useState(false);



  const calledOnceRef = useRef(false);

  useEffect(() => {
    if (state.login.selectedHostel_Id && !calledOnceRef.current) {
      calledOnceRef.current = true;
      setWalkingLoader(true);
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id, type: 'Inactive' },
      });

    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.UserListStatusCode) {
      setWalkingLoader(false);
      setWalkInCustomer(state.UsersList?.Users.listCustomers);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 100);
    }
  }, [state.UsersList?.UserListStatusCode]);

  useEffect(() => {
    if (state.UsersList.NoDataWalkInCustomerStatusCode === 201) {
      setWalkingLoader(false);
      setWalkInCustomer([]);

      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE" });
      }, 2000);
    }
  }, [state.UsersList.NoDataWalkInCustomerStatusCode]);

  useEffect(() => {
    if (state.UsersList.deleteWalkInCustomerStatusCode === 200) {
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id, type: 'Inactive' },
      });
      // setShowDeleteModal(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_WALK_IN_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.deleteWalkInCustomerStatusCode]);


  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleDotsClick = (id, event) => {
    if (dotsButton === id) {
      setDotsButton(null);
    } else {
      setDotsButton(id);
    }

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  // const handleDelete = (customer) => {
  //   setCustomerToDelete(customer);
  //   setShowDeleteModal(true);
  //   setDotsButton(null);
  // };

  // const confirmDelete = () => {
  //   if (customerToDelete.id) {
  //     dispatch({
  //       type: "DELETEWALKINCUSTOMER",
  //       payload: { id: customerToDelete.id },
  //     });
  //   }
  // };

  // const cancelDelete = () => {
  //   setShowDeleteModal(false);
  //   setCustomerToDelete(null);
  // };

  const handleBooking = (customer) => {
    setDotsButton(null);
    setSelectedCustomer(customer);
    setShowForm(true);
  };



  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCustomer(null);
  };

 const handleCheckIn = (data) => {
    setShowFormCheckIn(true)
    setTenantDetails(data)
    // setCheckInNew(false)
  }


  // const handleCheckInNew = (data) => {
  //   setShowFormCheckIn(true)
  //   setTenantDetails(data)
  //   setCheckInNew(true)
  // }

  const handleCloseCheckInForm = () => {
    setShowFormCheckIn(false)
  }





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







  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // const sortedData = React.useMemo(() => {
  //   if (!sortConfig.key) return walkInCustomer;

  //   const sorted = [...walkInCustomer].sort((a, b) => {
  //     const valueA = a[sortConfig.key];
  //     const valueB = b[sortConfig.key];

  //     if (!isNaN(valueA) && !isNaN(valueB)) {
  //       return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
  //     }

  //     if (typeof valueA === "string" && typeof valueB === "string") {
  //       return sortConfig.direction === "asc"
  //         ? valueA.localeCompare(valueB)
  //         : valueB.localeCompare(valueA);
  //     }

  //     return 0;
  //   });

  //   return sorted;
  // }, [walkInCustomer, sortConfig]);


  // const handleSort = (key, direction) => {
  //   setSortConfig({ key, direction });
  // };

  const sortedData = React.useMemo(() => {
      return Array.isArray(walkInCustomer) ? walkInCustomer : [];
    }, [walkInCustomer]);

  const handleDeleteShow = (user) => {
    setDeleteShow(true);
    setDeleteDetails({ room: user.Rooms, bed: user.Bed, user: user });
  };
  const handleCloseDelete = () => {
    setDeleteShow(false);
  };


  const [deleteDetails, setDeleteDetails] = useState({ room: null, bed: null });


  useEffect(() => {
    if (state.UsersList?.deleteCustomerSuccessStatusCode === 204) {
      setFormLoading(false)
      setDeleteShow(false);
      dispatch({ type: "USERLIST", payload: { hostel_id: state.login.selectedHostel_Id, type: 'Inactive' } });

      setDeleteDetails({ room: null, bed: null, user: null });

      setTimeout(() => {
        dispatch({ type: "REMOVE_DELETE_CUSTOMER" });
      }, 100);
    }
  }, [state.UsersList?.deleteCustomerSuccessStatusCode]);

  const handleDeleteCustomer = () => {
    if (deleteDetails?.user?.customerId) {
      dispatch({
        type: "DELETECUSTOMER",
        payload: { customerId: deleteDetails?.user?.customerId, hostelId: state.login.selectedHostel_Id },
      });
    }
    setFormLoading(true)
  };


  useEffect(() => {
    if (
      state.UsersList?.UserListStatusCode === 200
    ) {
      setShowForm(false)



      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_WALK_IN_CUSTOMER" });
      }, 1000);

    }
  }, [state.UsersList?.UserListStatusCode]);


  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {

      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id, type: 'Inactive' },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
        dispatch({ type: 'REMOVE_STATUS_CODE_FOR_CREATE_CUSTOMER_SAVE_INFO' })
      }, 2000);
    }
  }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);


  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setShowForm(false);
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id, type: 'Inactive' },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (state.UsersList.statusCodeForCheckInCustomer === 201) {
      setShowFormCheckIn(false)
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id, type: 'Inactive' },
      });

      setTimeout(() => {
        dispatch({ type: 'CLEAR_STATUS_CODES_CHECK_IN' })
      }, 2000)
    }

  }, [state.UsersList.statusCodeForCheckInCustomer])

  return (
    <>
      {!canReadWalkin ? (
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


            <ErrorMessage message={['You do not have access to view Walk In ']} type="warning" />

          </div>
        </>
      ) : (
        <>
          <div >
            {walkinLoader ? (
              <div
                style={{
                  position: "fixed",
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
            ) : (
              <div className='show-scrolls' style={{
                overflow: "auto",
                marginBottom: 20,
                marginTop: "0px",
                paddingRight: 0,
                paddingLeft: 0,

              }}>

                {sortedData.length > 0 && (
                  <div
                    className="me-2"
                    style={{ marginLeft: "0px" }}
                  >
                    <div
                      className="show-scrolls"
                      style={{
                        marginTop: "20px",
                      }}
                    >
                      <Table responsive="md">
                        <thead
                          style={{
                            fontFamily: "Gilroy",
                            backgroundColor: "rgba(231, 241, 255, 1)",
                            color: "rgba(34, 34, 34, 1)",
                            fontSize: 14,
                            fontStyle: "normal",
                            fontWeight: 500,
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                            borderRadius: 0
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                verticalAlign: "middle",
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: 500,width:"25%"
                                // padding: 10, 
                              }}
                            >
                              {" "}
                              <div className="d-flex gap-1 align-items-center justify-content-start">
                                {" "}
                                {/* <div
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "2px",
                                }}
                              >
                                <ArrowUp2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() =>
                                    handleSort("first_name", "asc")
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() =>
                                    handleSort("first_name", "desc")
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </div>{" "} */}
                                Name
                              </div>{" "}
                            </th>

                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: 500,
                                whiteSpace: "nowrap",width:"25%"
                              }}
                            >
                              <div className="d-flex gap-1 align-items-center justify-content-start">

                                Email ID{" "}
                              </div>
                            </th>

                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: 500,
                                whiteSpace: "nowrap",width:"25%"
                              }}
                            >
                              <div className="d-flex gap-1 align-items-center justify-content-start">

                                Mobile No{" "}
                              </div>
                            </th>



                            <th
                              style={{
                                textAlign: "center",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 12,
                                fontStyle: "normal",
                                fontWeight: 500,width:"25%"
                                // paddingBottom: 10
                              }}
                            >
                              Action
                            </th>
                          </tr>
                        </thead>



                        <tbody>
                          <PaginationList>
                            {sortedData && sortedData.length > 0 && (
                              sortedData.map((v) => (
                                <tr key={v.customerId}>
                                  <td className="ps-2 pt-0 pe-0 pb-0"
                                    style={{
                                      border: "none",
                                      // padding: "10px",
                                      textAlign: "start",
                                      verticalAlign: "middle",
                                      paddingLeft: "23px",
                                      borderBottom: "1px solid #E8E8E8",
                                    }}

                                  >

                                    <span
                                      style={{
                                        fontSize: 13,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      {v.fullName}
                                    </span>
                                  </td>

                                  <td className="ps-2"
                                    style={{
                                      fontSize: 13,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                       textAlign: "start",
                                      verticalAlign: "middle",
                                      borderBottom: "1px solid #E8E8E8",
                                    }}

                                  >
                                    {v.emailId || "N/A"}
                                  </td>

                                  <td
                                    style={{
                                      textAlign: "start",
                                      verticalAlign: "middle",
                                      fontSize: 13,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                      borderBottom: "1px solid #E8E8E8",
                                    }}
                                    className="ps-2"
                                  >
                                    +
                                    {v &&
                                      v.countryCode}
                                    {" "}
                                    {v.mobile}
                                  </td>



                                  <td style={{ borderBottom: "1px solid #E8E8E8" }} >
                                    <div
                                      style={{
                                        cursor: "pointer",
                                        // height: 40,
                                        // width: 40,
                                        // borderRadius: "50%",
                                        // border: "1px solid #EFEFEF",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                        // borderBottom: "1px solid #E8E8E8",
                                        // backgroundColor:
                                        //   dotsButton === v.customerId ? "#E7F1FF" : "white",
                                      }}
                                      onClick={(e) => handleDotsClick(v.customerId, e)}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        style={{
                                          height: 20, width: 20,
                                          transform: "rotate(90deg)",
                                          color:
                                            dotsButton === v.customerId
                                              ? "#1E45E1"
                                              : "#6B7280",
                                        }}
                                      />
                                      {dotsButton === v.customerId && (
                                        <div
                                          ref={popupRef}
                                          style={{
                                            cursor: "pointer",
                                            backgroundColor: "#F9F9F9",
                                            position: "fixed",
                                            top: popupPosition.top - 15,
                                            left: popupPosition.left - 10,
                                            width: 140,
                                            border: "1px solid #EBEBEB",
                                            borderRadius: 10,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                            zIndex: 10,
                                          }}
                                        >
                                          {/* Edit Option */}
                                          <div
                                            className="d-flex align-items-center gap-2"
                                            onClick={() => {
                                              if (canWriteWalkin) {
                                                handleCheckIn(v);
                                              }
                                            }}
                                            style={{
                                              cursor: !canWriteWalkin ? "not-allowed" : "pointer",
                                              opacity: !canWriteWalkin ? 0.5 : 1,
                                              padding: "6px 8px",
                                              borderRadius: 6,
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#F0F4FF";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                          >
                                            <img
                                              src={addcircle}
                                              alt="Assign Bed"
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: !canWriteWalkin ? "grayscale(100%)" : "none",
                                              }}
                                            />

                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: !canWriteWalkin ? "#A9A9A9" : "#222222",
                                                cursor: !canWriteWalkin ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Check-In
                                            </label>
                                          </div>

 {/* <div
                                            className="d-flex align-items-center gap-2"
                                            onClick={() => {
                                              if (canWriteWalkin) {
                                                // handleCheckInNew(v);
                                              }
                                            }}
                                            style={{
                                              cursor: !canWriteWalkin ? "not-allowed" : "pointer",
                                              opacity: !canWriteWalkin ? 0.5 : 1,
                                              padding: "6px 8px",
                                              borderRadius: 6,
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#F0F4FF";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                          >
                                            <img
                                              src={addcircle}
                                              alt="Assign Bed"
                                              style={{
                                                height: 16,
                                                width: 16,
                                                filter: !canWriteWalkin ? "grayscale(100%)" : "none",
                                              }}
                                            />

                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: !canWriteWalkin ? "#A9A9A9" : "#222222",
                                                cursor: !canWriteWalkin ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Check-In-new
                                            </label>
                                          </div> */}

                                          <div
                                            className="d-flex align-items-center gap-2"
                                            onClick={() => {
                                              if (canWriteWalkin) {
                                                handleBooking(v);
                                              }
                                            }}
                                            style={{
                                              cursor: !canWriteWalkin ? "not-allowed" : "pointer",
                                              opacity: !canWriteWalkin ? 0.5 : 1,
                                              padding: "6px 8px",
                                              borderRadius: 6,
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#FFF3F3";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                          >

                                            <img
                                              src={Addbook}
                                              alt="Addbook"
                                              style={{
                                                width: 16,
                                                height: 16,
                                                filter: !canWriteWalkin ? "grayscale(100%)" : "none",
                                                cursor: !canWriteWalkin ? "not-allowed" : "pointer",
                                              }}
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: !canWriteWalkin ? "#A9A9A9" : "#1E45E1",
                                                cursor: !canWriteWalkin ? "not-allowed" : "pointer",
                                              }}
                                            >
                                              Add booking
                                            </label>
                                          </div>

                                          <div

                                            className="d-flex align-items-center gap-2"
                                            style={{
                                              backgroundColor: "#F9F9F9",
                                              cursor: !canDeleteWalkin ? "not-allowed" : "pointer",
                                              opacity: !canDeleteWalkin ? 0.6 : 1,
                                              padding: "8px 12px",
                                              borderRadius: 6,
                                              transition: "background 0.2s ease-in-out",
                                            }}
                                            onClick={() => {
                                              if (canDeleteWalkin) {
                                                handleDeleteShow(v);
                                              }
                                            }}
                                            onMouseEnter={(e) => {
                                              e.currentTarget.style.backgroundColor = "#FFF3F3";

                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "#F9F9F9";
                                            }}
                                          >

                                            <Trash
                                              size="16"
                                              color={!canDeleteWalkin ? "#A9A9A9" : "red"}
                                            />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: !canDeleteWalkin ? "#888888" : "#FF0000",
                                                cursor: !canDeleteWalkin ? "not-allowed" : "pointer",
                                                margin: 0,
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
                              ))
                            )}
                          </PaginationList>
                        </tbody>


                      </Table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!walkinLoader && walkInCustomer?.length === 0 && (
              <div style={{ marginTop: 30, }} className="animated-text">
                <div style={{ textAlign: "center" }}>
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
                  No Walk-in available
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
                  There are no Walk-in added.
                </div>
              </div>
            )}
          </div>

        </>
      )}

      {showForm && (

        <Addbooking add_bookingshow={showForm}
          handleCloseAddBooking={handleFormClose}
          userDetail={selectedCustomer}
        />

        // <CustomerForm
        //   show={showForm}
        //   handleClose={handleFormClose}
        //   initialData={selectedCustomer}
        // />
      )}


      {
        showFormCheckIn && <UserlistForm EditObj={tenantDetails}
          showAssignMenu={showFormCheckIn}
          setShowAssignMenu={handleCloseCheckInForm} />
      }


      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
        backdrop="static"
        centered
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header
          style={{
            borderBottom: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "12px 16px",
          }}
        >
          <h5
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              fontWeight: 600,
              color: "#222222",
              margin: 0,
              textAlign: "center",
            }}
          >
            Delete Customer?
          </h5>
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
          Are you sure you want to delete this Customer?
        </Modal.Body>
        {formLoading && <div
          style={{
            position: 'absolute',
            top: 70,
            right: 0,
            bottom: 0,
            left: 0,
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
        </div>}

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none", marginTop: "-10px" }}
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
            onClick={handleCloseDelete}
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
            onClick={handleDeleteCustomer}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>






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

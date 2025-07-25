/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Table, Modal, Button } from "react-bootstrap";
import "./UserlistWalkin.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Edit,Trash } from "iconsax-react";
import CustomerForm from "./UserlistWalkinForm";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import "react-toastify/dist/ReactToastify.css";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { MdError } from "react-icons/md";
import { ArrowUp2, ArrowDown2 } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
function UserlistWalkin(props) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dotsButton, setDotsButton] = useState(null);
  const [walkInPermissionError, setWalkInPermissionError] = useState("");
  const [walkInEditPermissionError, setWalkInEditPermissionError] =
    useState("");
  const [walkInDeletePermissionError, setWalkInDeletePermissionError] =
    useState("");



    useEffect(() => {
           const isAdmin = props.customerrolePermission[0]?.user_details?.user_type === "admin";
           if (isAdmin) {
          if (state?.login?.planStatus === 0) {
            setWalkInPermissionError("");
            setWalkInEditPermissionError("Permission Denied");
            setWalkInDeletePermissionError("Permission Denied");
      
          } else if (state?.login?.planStatus === 1) {
            setWalkInPermissionError("");
            setWalkInEditPermissionError("");
            setWalkInDeletePermissionError("");
          }
        }
      
        }, [state?.login?.planStatus, state?.login?.selectedHostel_Id,props.customerrolePermission])

 useEffect(() => {
          const WalkinPermission = props.customerrolePermission[0]?.role_permissions?.find(
            (perm) => perm.permission_name === "Walk In"
          );
        
          const isOwner = props.customerrolePermission[0]?.user_details?.user_type === "staff";
          const planActive = state?.login?.planStatus === 1;
         
          if (!WalkinPermission || !isOwner) return;
        
          
          if (WalkinPermission.per_view === 1 && planActive) {
            setWalkInPermissionError("");
          } else {
            setWalkInPermissionError("Permission Denied");
          }
        
          
          
        
         
          if (WalkinPermission.per_edit === 1 && planActive) {
            setWalkInEditPermissionError("");
          } else {
            setWalkInEditPermissionError("Permission Denied");
          }
        
          if (WalkinPermission.per_delete === 1 && planActive) {
            setWalkInDeletePermissionError("");
          } else {
            setWalkInDeletePermissionError("Permission Denied");
          }
        }, [props.customerrolePermission, state?.login?.planStatus,state?.login?.selectedHostel_Id]);

  const popupRef = useRef(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState(null);

  const [walkInCustomer, setWalkInCustomer] = useState([]);
  const [walkinLoader, setWalkingLoader] = useState(false);


  
  
 
  const calledOnceRef = useRef(false);

useEffect(() => {
  if (state.login.selectedHostel_Id && !calledOnceRef.current) {
    calledOnceRef.current = true;
    setWalkingLoader(true);
    dispatch({
      type: "WALKINCUSTOMERLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }
}, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList.getWalkInStatusCode === 200) {
      setWalkingLoader(false);
      setWalkInCustomer(state.UsersList.WalkInCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 1000);
    }
  }, [state.UsersList.getWalkInStatusCode]);

  useEffect(() => {
    if (state.UsersList.NoDataWalkInCustomerStatusCode === 201) {
      setWalkingLoader(false);
      setWalkInCustomer([]);

      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE" });
      }, 2000);
    }
  }, [state.UsersList.NoDataWalkInCustomerStatusCode]);

  

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

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastCustomer = currentPage * itemsPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - itemsPerPage;
  const currentCustomers =
    props.search || props.filterStatus || props.walkinDateRange?.length === 2
      ? props.filteredUsers?.slice(indexOfFirstCustomer, indexOfLastCustomer)
      : walkInCustomer?.slice(indexOfFirstCustomer, indexOfLastCustomer);
  const totalPages = Math.ceil(
    (props.search || props.filterStatus
      ? props.filteredUsers?.length
      : walkInCustomer?.length) / itemsPerPage
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

 const handleItemsPerPageChange = (selectedOption) => {
    setItemsPerPage(Number(selectedOption.value));
    setCurrentPage(1);
  };

const pageOptions = [
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

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

  
  useEffect(() => {
      if (
        state.UsersList.addWalkInCustomerStatusCode === 200
      ) {
      setShowForm(false)
        dispatch({
          type: "WALKINCUSTOMERLIST",
          payload: { hostel_id: state.login.selectedHostel_Id },
        });
  
  
        setTimeout(() => {
          dispatch({ type: "CLEAR_ADD_WALK_IN_CUSTOMER" });
        }, 1000);
  
      }
    }, [
      state.UsersList.addWalkInCustomerStatusCode
  
    ]);

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
              marginTop:90
            }}
          >
            <img
              src={Emptystate}
              alt="Empty State"
              
            />

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
            ) : (
              sortedData.length > 0 && (
                <div
                  className="p-10 booking-table-userlist  booking-table me-4"
                  style={{ paddingBottom: "20px", marginLeft: "0px" }}
                >
                  <div
                    className="show-scrolls"
                    style={{
                      height:
                        sortedData.length >= 5 || sortedData.length >= 5
                          ? "430px"
                          : "auto",
                      overflow: "auto",
                      marginBottom: 20,
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
                              fontWeight: 500,
                              padding: 10
                            }}
                          >
                            {" "}
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              {" "}
                              <div
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
                              </div>{" "}
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
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              <div
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
                                  onClick={() => handleSort("email_Id", "asc")}
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("email_Id", "desc")}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>{" "}
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
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              <div
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
                                    handleSort("mobile_Number", "asc")
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() =>
                                    handleSort("mobile_Number", "desc")
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </div>{" "}
                              Mobile No{" "}
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
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              <div
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
                                    handleSort("walk_In_Date", "asc")
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() =>
                                    handleSort("walk_In_Date", "desc")
                                  }
                                  style={{ cursor: "pointer" }}
                                />
                              </div>{" "}
                              Walk-In Date
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
                            }}
                          >
                            <div className="d-flex gap-1 align-items-center justify-content-start">
                              <div
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
                                  onClick={() => handleSort("comments", "asc")}
                                  style={{ cursor: "pointer" }}
                                />
                                <ArrowDown2
                                  size="10"
                                  variant="Bold"
                                  color="#1E45E1"
                                  onClick={() => handleSort("comments", "desc")}
                                  style={{ cursor: "pointer" }}
                                />
                              </div>{" "}
                              Address{" "}
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
                              paddingBottom: 10
                            }}
                          >
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {sortedData && sortedData.length > 0 && (
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
                                      paddingLeft: "23px",
                                      borderBottom: "1px solid #E8E8E8",
                                    }}
                                    className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                                  >
                                    <div>
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
                                      borderBottom: "1px solid #E8E8E8",
                                    }}
                                    className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                                  >
                                    {v.email_Id || "N/A"}
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
                                    className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                                  >
                                    +
                                    {v &&
                                      String(v.mobile_Number).slice(
                                        0,
                                        String(v.mobile_Number).length - 10
                                      )}{" "}
                                    {v && String(v.mobile_Number).slice(-10)}
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
                                      {moment(v.walk_In_Date).format(
                                        "D MMMM YYYY"
                                      )}
                                    </span>
                                  </td>

                                  <td
                                    style={{
                                      fontSize: 13,
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                      textAlign: "start",
                                      verticalAlign: "middle",
                                      borderBottom: "1px solid #E8E8E8",
                                    }}
                                    className="ps-4 ps-sm-2 ps-md-3 ps-lg-4"
                                  >
                                    {(v.comments || v.area || v.landmark || v.city || v.state || v.pin_code)
                                      ? (
                                        <>
                                          {(v.comments || v.area || v.landmark) && (
                                            <>
                                              {v.comments && `${v.comments} , `}

                                              {v.area && `${v.area} `}

                                              {v.landmark || ""}
                                              <br />
                                            </>
                                          )}
                                          {v.city || ""} {v.state || ""} {(v.pin_code && `- ${v.pin_code}`) || ""}

                                        </>
                                      )
                                      : "N/A"}

                                  </td>


                                  <td
                                    style={{
                                      borderBottom: "1px solid #E8E8E8",
                                    }}
                                  >
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
                                        borderBottom: "1px solid #E8E8E8",
                                        backgroundColor:
                                          dotsButton === v.id
                                            ? "#E7F1FF"
                                            : "white",
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
                                            top: popupPosition.top - 15,
                                            left: popupPosition.left-10,
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
                                          <div
                                            className="d-flex align-items-center"
                                            onClick={() => {
                                              if (!walkInEditPermissionError) {
                                                handleEdit(v);
                                              }
                                              
                                            }}
                                            style={{
                                              cursor: walkInEditPermissionError ? "not-allowed" : "pointer",
                                             
                                              opacity: walkInEditPermissionError ? 0.5 : 1,
                                              padding: "6px 8px",
                                              borderRadius: 6,
                                            }}
                                            onMouseEnter={(e) => {
                                              if (!walkInEditPermissionError) e.currentTarget.style.backgroundColor = "#F0F4FF";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                          >
                                             <Edit size="16" color={walkInEditPermissionError ? "#A9A9A9" : "#1E45E1"} style={{marginRight: 8}}/>
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                color: walkInEditPermissionError ? "#A9A9A9" : "#222222",
                      cursor: walkInEditPermissionError ? "not-allowed" : "pointer",
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
                                              cursor: walkInDeletePermissionError ? "not-allowed" : "pointer",
                                             
                                              opacity: walkInDeletePermissionError ? 0.5 : 1,
                                              padding: "6px 8px",
                                              borderRadius: 6,
                                            }}
                                            onMouseEnter={(e) => {
                                              if (!walkInDeletePermissionError) e.currentTarget.style.backgroundColor = "#FFF3F3";
                                            }}
                                            onMouseLeave={(e) => {
                                              e.currentTarget.style.backgroundColor = "transparent";
                                            }}
                                          >
                                           <Trash
                                                                                                                             size="16"
                                                                                                                             color={walkInDeletePermissionError ? "#A9A9A9" : "red"}
                                                                                                                       style={{marginRight: 8}}    />
                                            <label
                                              style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy, sans-serif",
                                                 color: walkInDeletePermissionError ? "#A9A9A9" : "#FF0000",
                      cursor: walkInDeletePermissionError ? "not-allowed" : "pointer",
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
                        )}
                      </tbody>
                    </Table>
                  </div>
                </div>
              )
            )}

            {!walkinLoader && currentCustomers?.length === 0 && (
              <div style={{ marginTop: 30 }} className="animated-text">
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
          {(props.search || props.filterStatus
            ? props.filteredUsers?.length
            : walkInCustomer?.length) > 10 && (
              <nav
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "end",
                  padding: "10px",
                  position: "fixed",
                  bottom: "0px",
                  right: "0px",
                  left:0,
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  zIndex: 1000,
                }}
              >
             <div>
                    <Select
                      options={pageOptions}
                      value={
                        itemsPerPage
                          ? { value: itemsPerPage, label: `${itemsPerPage}` }
                          : null
                      }
                      onChange={handleItemsPerPageChange}
                      classNamePrefix="custom"
                      menuPlacement="auto"
                      noOptionsMessage={() => "No options"}
                      styles={{
                        control: (base) => ({
                          ...base,
                          height: "40px",
                          padding: "0 5px",
                          border: "1px solid #1E45E1",
                          borderRadius: "5px",
                          fontSize: "14px",
                          color: "#1E45E1",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "Gilroy",
                          boxShadow: "0 0 0 1px #1E45E1",
                          width: 100,
                        }),
                        menu: (base) => ({
                          ...base,
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          fontFamily: "Gilroy",
                        }),
                        menuList: (base) => ({
                          ...base,
                          maxHeight: "200px",
                          overflowY: "auto",
                          padding: 0,
                        }),
                        placeholder: (base) => ({
                          ...base,
                          color: "#555",
                        }),
                        dropdownIndicator: (base) => ({
                          ...base,
                          color: "#1E45E1",
                          cursor: "pointer",
                        }),
                        indicatorSeparator: () => ({
                          display: "none",
                        }),
                        option: (base, state) => ({
                          ...base,
                          backgroundColor: state.isFocused ? "#1E45E1" : "white",
                          color: state.isFocused ? "#fff" : "#000",
                          cursor: "pointer",
                        }),
                      }}
                    />
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
                      <ArrowLeft2
                        size="16"
                        color={currentPage === 1 ? "#ccc" : "#1E45E1"}
                      />
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
                        cursor:
                          currentPage === totalPages ? "not-allowed" : "pointer",
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
          initialData={selectedCustomer}
        />
      )}

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

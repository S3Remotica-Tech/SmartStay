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
      setWalkInCustomer(state.UsersList?.Users?.listCustomers);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 100);
    }
  }, [state.UsersList?.UserListStatusCode]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setWalkingLoader(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])






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

          <div className="flex flex-col items-center justify-center mt-24">
            <img
              src={Emptystate}
              alt="Empty State"
            />

            <ErrorMessage
              message={['You do not have access to view Walk In']}
              type="warning"
            />
          </div>
        </>
      ) : (
        <>
          <div>
            {walkinLoader ? (

              <div className="font-gilroy fixed inset-y-0 right-0 left-48 flex items-center justify-center bg-transparent opacity-75 z-10">
                <div className="h-10 w-10 rounded-full border-4 border-r-transparent border-t-blue-700 animate-spin"></div>
              </div>
            ) : (
              <div className="show-scrolls overflow-auto mb-5 mt-3 px-0">

                {sortedData.length > 0 && (
                  <div>
                    <div
                      className="show-scrolls relative p-2"
                    >
                      <Table responsive="md"
                        className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium sticky top-0 z-10 ">
                        <thead className="bg-blue-100 text-gray-400 font-gilroy text-sm font-medium sticky top-0 z-1">
                          <tr>
                            <th>Name</th>
                            <th>Email ID </th>
                            <th>Mobile No</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody className="text-start">
                          <PaginationList>
                            {sortedData && sortedData.length > 0 && (
                              sortedData.map((v) => (
                                <tr key={v.customerId} className="font-gilroy border-b border-[#E8E8E8]">

                                  <td className="align-middle">
                                    <span className="text-sm font-medium font-gilroy">
                                      {v.fullName}
                                    </span>
                                  </td>

                                  <td className="pl-2 text-start align-middle text-sm font-medium font-gilroy border-b border-gray-200">
                                    {v.emailId || "N/A"}
                                  </td>

                                  <td className="pl-2 text-start align-middle text-sm font-medium font-gilroy border-b border-gray-200">
                                    +
                                    {v && v.countryCode}{" "}
                                    {v.mobile}
                                  </td>

                                  <td className="border-b border-gray-200">
                                    <div
                                      className="relative flex justify-start items-center cursor-pointer"
                                      onClick={(e) => handleDotsClick(v.customerId, e)}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        className={`h-5 w-5 rotate-90 ${dotsButton === v.customerId ? "text-blue-700" : "text-gray-500"
                                          }`}
                                      />

                                      {dotsButton === v.customerId && (
                                        <div
                                          ref={popupRef}
                                          className="fixed flex flex-col justify-center w-36 bg-gray-50 border border-gray-200 rounded-lg shadow-md z-10"
                                          style={{
                                            top: popupPosition.top - 15,
                                            left: popupPosition.left - 10,
                                          }}
                                        >

                                          <div
                                            onClick={() => canWriteWalkin && handleCheckIn(v)}
                                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors duration-200 ${canWriteWalkin
                                              ? "cursor-pointer hover:bg-blue-50"
                                              : "cursor-not-allowed opacity-50"
                                              }`}
                                          >
                                            <img
                                              src={addcircle}
                                              alt="Assign Bed"
                                              className={`w-4 h-4 ${!canWriteWalkin && "grayscale"}`}
                                            />
                                            <label
                                              className={`text-sm font-medium ${canWriteWalkin ? "text-gray-900" : "text-gray-400"
                                                }`}
                                            >
                                              Check-In
                                            </label>
                                          </div>

                                          <div
                                            onClick={() => canWriteWalkin && handleBooking(v)}
                                            className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors duration-200 ${canWriteWalkin
                                              ? "cursor-pointer hover:bg-red-50"
                                              : "cursor-not-allowed opacity-50"
                                              }`}
                                          >
                                            <img
                                              src={Addbook}
                                              alt="Add Book"
                                              className={`w-4 h-4 ${!canWriteWalkin && "grayscale"}`}
                                            />
                                            <label
                                              className={`text-sm font-medium ${canWriteWalkin ? "text-blue-700" : "text-gray-400"
                                                }`}
                                            >
                                              Add Booking
                                            </label>
                                          </div>

                                          <div
                                            onClick={() => canDeleteWalkin && handleDeleteShow(v)}
                                            className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors duration-200 ${canDeleteWalkin
                                              ? "cursor-pointer hover:bg-red-50"
                                              : "cursor-not-allowed opacity-60"
                                              } bg-gray-50`}
                                          >
                                            <Trash
                                              size={16}
                                              color={!canDeleteWalkin ? "#A9A9A9" : "red"}
                                            />
                                            <label
                                              className={`text-sm font-medium ${canDeleteWalkin ? "text-red-600" : "text-gray-400"
                                                }`}
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
              <div className="animated-text flex justify-center mt-24">
                <div className="text-center">
                  <img src={Emptystate} alt="emptystate" className="mx-auto" />

                  <div className="pb-1 font-semibold text-gray-700 text-lg font-sans">
                    No Walk-in available
                  </div>

                  <div className="pb-1 font-medium text-gray-700 text-sm font-sans">
                    There are no Walk-in added.
                  </div>
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
            Delete Tenant?
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
          Are you sure you want to delete this Tenant?
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
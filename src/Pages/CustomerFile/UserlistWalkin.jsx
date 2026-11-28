/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import "./UserlistWalkin.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Trash } from "iconsax-react";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import PaginationList from "../../Components/PaginationList";

import { useHasPermission } from "../../Utils/Permission";
import Addbook from "../../Assets/Images/New_images/calendar-tick.svg";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Addbooking from "./Addbookingform";

import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import DirectCheckin from "./DirectCheckin";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function UserlistWalkin() {
  const state = useSelector((state) => state);
  const [tenantDetails, setTenantDetails] = useState("");
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false);

  const [showFormCheckInNew, setShowFormCheckInNew] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [dotsButton, setDotsButton] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const {
    canReadModule: canReadWalkin,

    canDeleteModule: canDeleteWalkin,
  } = useHasPermission("Walk in");

  const { canWriteModule: canWriteTenant } = useHasPermission("Customers");

  const { canWriteModule: canWriteBooking } = useHasPermission("Booking");

  const popupRef = useRef(null);

  const [walkInCustomer, setWalkInCustomer] = useState([]);
  const [walkinLoader, setWalkingLoader] = useState(false);

  const [deleteShow, setDeleteShow] = useState(false);


  const previousTenantRequestRef = useRef("");
  useEffect(() => {
    const hostelId = state?.login?.selectedHostel_Id;
    if (!hostelId) return;
    const requestKey = JSON.stringify({
      hostelId: hostelId,
      purpose: "WALK_IN",
    });
    if (previousTenantRequestRef.current === requestKey) return;
    previousTenantRequestRef.current = requestKey;
    setWalkingLoader(true);
    dispatch({
      type: "TENANT_LIST_SAGA",
      payload: {
        hostelId: hostelId,
        purpose: "WALK_IN",
      },
    });
  }, [state?.login?.selectedHostel_Id]);


  useEffect(() => {
    if (state.UsersList?.TenantList) {
      setWalkingLoader(false);
      setWalkInCustomer(state.UsersList?.TenantList);
      dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
    }
  }, [state.UsersList?.TenantList]);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setWalkingLoader(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

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
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
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

  const handleBooking = (customer) => {
    setDotsButton(null);
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedCustomer(null);
  };

  // const handleCheckIn = (data) => {
  //   setShowFormCheckIn(true);
  //   setTenantDetails(data);
  //   // setCheckInNew(false)
  // };

  const handleCheckInNew = (data) => {
    setShowFormCheckInNew(true);
    setTenantDetails(data);
  };

  // const handleCloseCheckInForm = () => {
  //   setShowFormCheckIn(false);
  // };

  const handleCloseCheckInFormNew = () => {
    setShowFormCheckInNew(false);
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

  // const walkInCustomer = React.useMemo(() => {
  //   return Array.isArray(walkInCustomer) ? walkInCustomer : [];
  // }, [walkInCustomer]);

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
      setDeleteLoading(false);
      setDeleteShow(false);
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

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
        payload: {
          customerId: deleteDetails?.user?.customerId,
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }
    setDeleteLoading(true);
  };

  useEffect(() => {
    if (state.UsersList?.tenantListGetSuccessCode === 200) {
      setShowForm(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_TENANT_LIST_REDUCER" });
      }, 1000);
    }
  }, [state.UsersList?.tenantListGetSuccessCode]);

  useEffect(() => {
    if (
      state.UsersList?.statusCodeForAddUser === 201 ||
      state.UsersList?.statusCodeForAddCustomerSaveInfo === 201
    ) {
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
        dispatch({ type: "REMOVE_STATUS_CODE_FOR_CREATE_CUSTOMER_SAVE_INFO" });
      }, 2000);
    }
  }, [
    state.UsersList?.statusCodeForAddUser,
    state.UsersList?.statusCodeForAddCustomerSaveInfo,
  ]);

  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      setShowForm(false);
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);

  useEffect(() => {
    if (state.UsersList.statusCodeForCheckInCustomer === 201) {
      // setShowFormCheckIn(false);
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES_CHECK_IN" });
      }, 2000);
    }
  }, [state.UsersList.statusCodeForCheckInCustomer]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForDirectCheckInCustomer === 201) {
      setShowFormCheckInNew(false);
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "WALK_IN",
        },
      });

      dispatch({ type: "REMOVE_DIRECT_CHECK_IN_REDUCER" });
    }
  }, [state.UsersList?.statusCodeForDirectCheckInCustomer]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = Array.isArray(walkInCustomer)
    ? walkInCustomer.slice(startIndex, endIndex)
    : [];

  return (
    <>
      {!canReadWalkin ? (
        <>
          <PermissionDeniedMessage />
        </>
      ) : (
        <>
          <div>
            {walkinLoader && (
              <div className="font-gilroy fixed inset-0 right-0 left-48 flex items-center justify-center bg-transparent opacity-75 z-10">
                <div className="h-10 w-10 rounded-full border-4 border-r-transparent border-t-blue-700 animate-spin"></div>
              </div>
            )}

            <div className="px-0">
              <div className={`flex justify-end mr-2 `}>
                <PaginationList
                  totalItems={walkInCustomer.length}
                  itemsPerPage={pageSize}
                  currentPage={page}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(size) => setPageSize(size)}
                />
              </div>

              {paginatedData.length > 0 && (
                <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-[12px]">
                  <div
                    id="tableContainer"
                    // ref={tableContainerRef}
                    className="overflow-auto relative  h-[calc(100vh-140px)] show-scrolls"
                  >
                    <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                      <thead className="sticky top-0 z-40">
                        <tr>
                          <th className={`${TABLE_HEADER_CELL} text-left`}>Name</th>
                          <th className={`${TABLE_HEADER_CELL} text-left`}>Email ID </th>
                          <th className={`${TABLE_HEADER_CELL} text-left`}>Mobile No</th>
                          <th className={`${TABLE_HEADER_CELL} text-center sticky right-0 z-[2] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)]`}>Action</th>
                        </tr>
                      </thead>

                      <tbody className="text-start">
                        {paginatedData.map((v) => (
                          <tr
                            key={v.customerId}
                          >
                            <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                              <div className="relative group flex items-center gap-[13px] max-w-[240px]">
                                <div className="w-[30px] h-[30px] rounded-full bg-slate-200 text-[#44536A] flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                                  {(v.fullName || "")
                                    .trim()
                                    .split(/\s+/)
                                    .slice(0, 2)
                                    .map((w) => w[0])
                                    .join("")
                                    .toUpperCase() || "-"}
                                </div>
                                <span className="block truncate font-semibold">
                                  {v.fullName}
                                </span>

                                <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-50 bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                                  {v.fullName}
                                </div>
                              </div>
                            </td>

                            <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                              <div className="relative group max-w-[240px]">
                                <span className="block truncate">
                                  {v.emailId || "N/A"}
                                </span>

                                <div className="absolute left-0 top-full mt-1 hidden group-hover:block z-50 bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-lg">
                                  {v.emailId || "N/A"}
                                </div>
                              </div>
                            </td>
                            <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                              {v && v.mobile}
                            </td>

                            <td className={`${TABLE_BODY_CELL} sticky right-0 z-[1] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] bg-white text-[#111928] text-center`}>
                              <div data-testid={`userlist-walkin-dots-click-action-${v.customerId}`}
                                className={`relative inline-flex items-center justify-center w-[34px] h-[34px] rounded-[12px] border-[1px] cursor-pointer ${dotsButton === v.customerId
                                  ? "border-[#1E45E1] bg-[#EFF6FF]"
                                  : "border-[#E2E8F0] bg-white hover:bg-[#F1F5FF]"
                                  }`}
                                onClick={(e) =>
                                  handleDotsClick(v.customerId, e)
                                }
                              >
                                <PiDotsThreeOutlineVerticalFill
                                  className={`h-4 w-4 rotate-90 ${dotsButton === v.customerId
                                    ? "text-[#1E45E1]"
                                    : "text-[#4A5565]"
                                    }`}
                                />

                                {dotsButton === v.customerId && (
                                  createPortal(
                                  <div
                                    ref={popupRef}
                                    className="font-gilroy fixed flex flex-col justify-center w-36 bg-gray-50 border border-gray-200 rounded-lg shadow-md z-[1000]"
                                    style={{
                                      top: popupPosition.top - 15,
                                      left: popupPosition.left - 10,
                                    }}
                                  >
                                    {/* <div
                                      onClick={() =>
                                        canWriteTenant && handleCheckIn(v)
                                      }
                                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors duration-200 ${
                                        canWriteTenant
                                          ? "cursor-pointer hover:bg-blue-50"
                                          : "cursor-not-allowed opacity-50"
                                      }`}
                                    >
                                      <img
                                        src={addcircle}
                                        alt="Assign Bed"
                                        className={`w-4 h-4 ${!canWriteTenant && "grayscale"}`}
                                      />
                                      <label
                                        className={`text-sm font-medium ${
                                          canWriteTenant
                                            ? "text-gray-900 cursor-pointer"
                                            : "text-gray-400 cursor-not-allowed"
                                        }`}
                                      >
                                        Check-In
                                      </label>
                                    </div> */}

                                    {/* {isDev && ( */}
                                    <div data-testid={`userlist-walkin-check-in-action-${v.customerId}`}
                                      onClick={() =>
                                        canWriteTenant && handleCheckInNew(v)
                                      }
                                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors duration-200 ${canWriteTenant
                                        ? "cursor-pointer hover:bg-blue-50"
                                        : "cursor-not-allowed opacity-50"
                                        }`}
                                    >
                                      <img
                                        src={addcircle}
                                        alt="Assign Bed"
                                        className={`w-4 h-4 ${!canWriteTenant && "grayscale"}`}
                                      />
                                      <label
                                        className={`text-sm font-medium ${canWriteTenant
                                          ? "text-gray-900 cursor-pointer"
                                          : "text-gray-400 cursor-not-allowed"
                                          }`}
                                      >
                                        Check-In
                                      </label>
                                    </div>
                                    {/* )} */}

                                    <div data-testid={`userlist-walkin-add-booking-action-${v.customerId}`}
                                      onClick={() =>
                                        canWriteBooking && handleBooking(v)
                                      }
                                      className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-colors duration-200 ${canWriteBooking
                                        ? "cursor-pointer hover:bg-red-50"
                                        : "cursor-not-allowed opacity-50"
                                        }`}
                                    >
                                      <img
                                        src={Addbook}
                                        alt="Add Book"
                                        className={`w-4 h-4 ${!canWriteBooking && "grayscale"}`}
                                      />
                                      <label
                                        className={`text-sm font-medium ${canWriteBooking
                                          ? "text-blue-700 cursor-pointer"
                                          : "text-gray-400 cursor-not-allowed"
                                          }`}
                                      >
                                        Add Booking
                                      </label>
                                    </div>

                                    <div data-testid={`userlist-walkin-delete-action-${v.customerId}`}
                                      onClick={() =>
                                        canDeleteWalkin && handleDeleteShow(v)
                                      }
                                      className={`flex items-center gap-2 px-2 py-2 rounded-md transition-colors duration-200 ${canDeleteWalkin
                                        ? "cursor-pointer hover:bg-red-50"
                                        : "cursor-not-allowed opacity-60"
                                        } bg-gray-50`}
                                    >
                                      <Trash
                                        size={16}
                                        color={
                                          !canDeleteWalkin ? "#A9A9A9" : "red"
                                        }
                                      />
                                      <label
                                        className={`text-sm font-medium ${canDeleteWalkin
                                          ? "text-red-600 cursor-pointer"
                                          : "text-gray-400 cursor-not-allowed"
                                          }`}
                                      >
                                        Delete
                                      </label>
                                    </div>
                                  </div>,
                                  document.body,
                                )
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {!walkinLoader && walkInCustomer?.length === 0 && (
              <NoDataMessage label="Walk-In" />
            )}
          </div>
        </>
      )}

      {showForm && (
        <Addbooking
          add_bookingshow={showForm}
          handleCloseAddBooking={handleFormClose}
          userDetail={selectedCustomer}
        />
      )}

      {/* {showFormCheckIn && (
        <UserlistForm
          EditObj={tenantDetails}
          showAssignMenu={showFormCheckIn}
          setShowAssignMenu={handleCloseCheckInForm}
        />
      )} */}

      {showFormCheckInNew && (
        <DirectCheckin
          tenantDetails={tenantDetails}
          show={showFormCheckInNew}
          handleClose={handleCloseCheckInFormNew}
        />
      )}

      <Modal data-testid="userlist-walkin-delete-tenant-are-you-modal"
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

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none", marginTop: "-10px" }}
        >
          <Button data-testid="userlist-walkin-cancel-btn"
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
          <Button data-testid="userlist-walkin-delete-customer-btn"
            className={`
   !w-full 
    !max-w-[160px] 
    !h-[52px] 
    !rounded-[8px] 
    !px-[20px] 
    !py-[12px]  
    !bg-[#1E45E1] 
    !text-white 
    !font-semibold 
    !font-gilroy 
    !text-[14px]
    ${deleteLoading ? "!opacity-70 !cursor-not-allowed" : ""}
  `}
            onClick={handleDeleteCustomer}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
UserlistWalkin.propTypes = {
  // customerrolePermission: PropTypes.func.isRequired,
  // filterInput: PropTypes.func.isRequired,
  // search: PropTypes.func.isRequired,
  // filteredUsers: PropTypes.func.isRequired,
  // filterStatus: PropTypes.func.isRequired,
  // resetPage: PropTypes.func.isRequired,
  // setResetPage: PropTypes.func.isRequired,
  // walkinDateRange: PropTypes.func.isRequired,
};

export default UserlistWalkin;

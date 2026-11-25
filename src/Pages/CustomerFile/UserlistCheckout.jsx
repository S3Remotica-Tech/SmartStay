/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-loading-skeleton/dist/skeleton.css";

import { useDispatch, useSelector } from "react-redux";
import CheckOutForm from "./UserListCheckoutForm";

import CustomerProfile from "./CheckoutProfile";
import { checkoutCustomerProfile } from "../../Redux/Action/LoginAction";

import PropTypes from "prop-types";
import "./UserlistCheckout.css";
import PaginationList from "../../Components/PaginationList";
import DueCustomerConfirmCheckout from "./DueCustomerConfirmCheckout";

import { useHasPermission } from "../../Utils/Permission";
import { useNavigate } from "react-router-dom";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function CheckOut() {
  const navigate = useNavigate();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [checkOutCustomer, setCheckOutCustomer] = useState([]);
  const [checkoutLoader, setCheckOutLoader] = useState(false);
  const [CheckoutProfile, setCheckoutProfile] = useState(false);
  const [checkouttableshow, setcheckoutTableShow] = useState(true);
  const [checkoutWithoutPay, setCheckoutWithoutPay] = useState("");

  const {
    // canWriteModule: canWriteCheckout,
    canReadModule: canReadCheckout,
    // canUpdateModule: canUpdateCheckout,
    // canDeleteModule: canDeleteCheckout,
  } = useHasPermission("Checkout");

  useEffect(() => {
    if (!canReadCheckout) {
      setCheckOutLoader(false);
    }
  }, [canReadCheckout]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setCheckOutLoader(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  const handleCustomerProfilePage = (checkout) => {
    setCheckoutWithoutPay(checkout);
    navigate(`/tenant/checkout/details/${checkout.customerId}`);
    setcheckoutTableShow(false);
    dispatch(checkoutCustomerProfile(false));
    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: checkout.customerId },
    });
  };

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     dispatch({
  //       type: "CHECKOUTCUSTOMERLIST",
  //       payload: { hostelId: state.login.selectedHostel_Id },
  //     });
  //     setCheckOutLoader(true);
  //   }
  // }, [state.login.selectedHostel_Id]);


  const previousCheckoutRequestRef = useRef(null);

  useEffect(() => {
    const hostelId = state.login?.selectedHostel_Id;

    if (!hostelId) return;

    const payload = { hostelId };

    const requestKey = JSON.stringify(payload);

    if (previousCheckoutRequestRef.current === requestKey) return;

    previousCheckoutRequestRef.current = requestKey;

    setCheckOutLoader(true);

    dispatch({
      type: "CHECKOUTCUSTOMERLIST",
      payload: payload,
    });
  }, [state.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "AVAILABLECHECKOUTCUSTOMER",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList.GetCheckOutCustomerStatusCode === 200) {
      setCheckOutLoader(false);
      setCheckOutCustomer(
        state.UsersList.CheckOutCustomerList?.checkoutCustomers,
      );
      setTimeout(() => {
        dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
      }, 10);
    }
  }, [state.UsersList.GetCheckOutCustomerStatusCode]);

  useEffect(() => {
    setCheckOutLoader(false);
  }, [state.UsersList.CheckOutCustomerList]);

  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {
      checkoutcloseModal();
      dispatch({
        type: "CHECKOUTCUSTOMERLIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.statusCodeAddConfirmCheckout]);

  useEffect(() => {
    if (state.UsersList?.checkoutcustomeEmpty === 201) {
      setCheckOutLoader(false);
      setCheckOutCustomer([]);

      setTimeout(() => {
        dispatch({ type: "REMOVE_CLEAR_CHECKOUT_CUSTOMER_LIST_ERROR" });
      }, 2000);
    }
  }, [state.UsersList?.checkoutcustomeEmpty]);

  useEffect(() => {
    if (
      state.UsersList.addCheckoutCustomerStatusCode === 201 ||
      state.UsersList.deleteCheckoutCustomerStatusCode === 200
    ) {
      dispatch({
        type: "CHECKOUTCUSTOMERLIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setcheckoutForm(false);
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

  const sortedData = React.useMemo(() => {
    return Array.isArray(checkOutCustomer) ? checkOutCustomer : [];
  }, [checkOutCustomer]);

  const [DueCustomerShow, setDueCustomerShow] = useState(false);

  useEffect(() => {
    if (state.UsersList.statusCodegetConfirmCheckout) {
      setDueCustomerShow(true);
    }

    setTimeout(() => {
      dispatch({ type: "CLEAR_GET_CONFIRM_CHECK_OUT_CUSTOMER" });
    }, 500);
  }, [state.UsersList.statusCodegetConfirmCheckout]);

  useEffect(() => {
    if (state.UsersList.statusCodeForDueCustomer === 200) {
      dispatch({
        type: "CHECKOUTCUSTOMERLIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setDueCustomerShow(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForDueCustomer]);

  useEffect(() => {
    if (state.UsersList.statusCodeAddConfirmCheckout === 200) {
      setDueCustomerShow(false);

      dispatch({
        type: "CHECKOUTCUSTOMERLIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_CONFIRM_CHECK_OUT_CUSTOMER" });
      }, 1000);
    }
  }, [state.UsersList.statusCodeAddConfirmCheckout]);

  const handleCloseDuePopup = () => {
    setDueCustomerShow(false);
  };

  const [checkoutForm, setcheckoutForm] = useState(false);

  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  const handleCloseCheckoutProfile = () => {
    setCheckoutProfile(false);
  };

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

  const paginatedData = sortedData.slice(startIndex, endIndex);
  return (
    <>
      {checkouttableshow && (
        <>
          <div>
            {checkoutLoader && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {!canReadCheckout ? (
              <>
                <PermissionDeniedMessage />
              </>
            ) : (
              <div>
                {sortedData?.length > 0 ? (
                  <>
                    <div className={`flex justify-end mr-2 `}>
                      <PaginationList
                        totalItems={sortedData.length}
                        itemsPerPage={pageSize}
                        currentPage={page}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(size) => setPageSize(size)}
                      />
                    </div>

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
                              <th className={`${TABLE_HEADER_CELL} text-left`}>
                                Mobile No
                              </th>
                              <th className={`${TABLE_HEADER_CELL} text-left`}>
                                Floor
                              </th>
                              <th className={`${TABLE_HEADER_CELL} text-left`}>Room</th>
                              <th className={`${TABLE_HEADER_CELL} text-left`}>Bed</th>
                              <th className={`${TABLE_HEADER_CELL} text-left`}>Check-Out Date</th>
                              <th className={`${TABLE_HEADER_CELL} text-left`}>Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            {paginatedData.map((checkout) => (
                              <tr
                                key={checkout.customerId}
                              >
                                <td
                                  onClick={() =>
                                    handleCustomerProfilePage(checkout)
                                  }
                                  className={`${TABLE_BODY_CELL} text-left cursor-pointer`}
                                >
                                  <div className="flex items-center gap-[13px]">
                                    <div className="w-[30px] h-[30px] rounded-full bg-slate-200 text-[#44536A] flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                                      {(checkout.fullName || "")
                                        .trim()
                                        .split(" ")
                                        .filter(Boolean)
                                        .slice(0, 2)
                                        .map((w) => w[0])
                                        .join("")
                                        .toUpperCase() || "-"}
                                    </div>
                                    <span className="block max-w-[180px] truncate font-semibold text-[#111928] hover:underline">
                                      {checkout.fullName}
                                    </span>
                                  </div>
                                </td>

                                <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                                  +{checkout?.countryCode} {checkout.mobile}
                                </td>

                                <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                                  {checkout.floorName || "_"}
                                </td>

                                <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                                  {checkout.roomName || "_"}
                                </td>

                                <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                                  {checkout.bedName || "_"}
                                </td>

                                <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                                  {checkout.checkoutDate || "N/A"}
                                </td>

                                <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                                  <span className="inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] whitespace-nowrap bg-[rgba(255,189,189,0.4)]">
                                    <span className="w-[6px] h-[6px] rounded-full bg-[#EF4444]" />
                                    {checkout.currentStatus || "-"}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                ) : (
                  !checkoutLoader &&
                  checkOutCustomer?.length === 0 && (
                    <NoDataMessage label="Checkout" />
                  )
                )}
              </div>
            )}
            {checkoutForm && (
              <CheckOutForm
                show={checkoutForm}
                item={checkOutCustomer}
                handleClose={checkoutcloseModal}
              />
            )}
          </div>
        </>
      )}

      {DueCustomerShow && (
        <DueCustomerConfirmCheckout
          show={DueCustomerShow}
          handleClose={handleCloseDuePopup}
        />
      )}

      {CheckoutProfile && (
        <CustomerProfile
          CheckoutProfile={CheckoutProfile}
          setcheckoutTableShow={setcheckoutTableShow}
          handleCloseCheckoutProfile={handleCloseCheckoutProfile}
          setCheckoutProfile={setCheckoutProfile}
          checkoutWithoutPay={checkoutWithoutPay}
        />
      )}
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

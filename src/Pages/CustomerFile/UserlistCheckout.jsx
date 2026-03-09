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
import { checkoutCustomerProfile } from "../../Redux/Action/LoginAction";
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
  const [checkoutWithoutPay, setCheckoutWithoutPay] = useState("")



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
    }
  }, [canReadCheckout]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setCheckOutLoader(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])

  const handleCustomerProfilePage = (checkout) => {
    setCheckoutWithoutPay(checkout)
    navigate(`/tenant/checkout/details/${checkout.customerId}`)
    setcheckoutTableShow(false)
    dispatch(checkoutCustomerProfile(false))
    dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: checkout.customerId } });

  }









  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostelId: state.login.selectedHostel_Id } });
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


  useEffect(() => {
    setCheckOutLoader(false)
  }, [state.UsersList.CheckOutCustomerList])


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
    if (state.UsersList.statusCodegetConfirmCheckout) {
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

            {checkoutLoader && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
              </div>
            )}
            {!canReadCheckout ? (
              <>
                <div className="flex flex-col items-center justify-center mt-24">

                  <img
                    src={Emptystate}
                    alt="Empty State"

                  />
                  <ErrorMessage message={['You do not have access to view Checkout']} type="warning" />

                </div>
              </>
            ) :

              <div>
                <div>
                  {sortedData?.length > 0 ? (
                    <div>
                      <div className="show-scrolls relative p-2 font-gilroy">
                        <Table
                          responsive="md"
                          className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium sticky top-0 z-10 ">

                          <thead className="bg-blue-100 text-gray-400 font-gilroy text-sm font-medium sticky top-0 z-1">
                            <tr>
                              <th>
                                <div className="flex items-center justify-start gap-1">
                                  Name
                                </div>
                              </th>

                              <th>
                                <div className="flex items-center justify-start gap-1">
                                  Mobile No
                                </div>
                              </th>

                              <th>
                                <div className="flex items-center justify-start gap-1">
                                  Floor
                                </div>
                              </th>

                              <th>
                                <div className="flex items-center justify-start gap-1">
                                  Room
                                </div>
                              </th>

                              <th>
                                <div className="flex items-center justify-start gap-1">
                                  Bed
                                </div>
                              </th>

                              <th>
                                <div className="flex items-center justify-start gap-1">
                                  Check-Out Date
                                </div>
                              </th>

                              <th>
                                <div className="flex items-center justify-start gap-1">
                                  Status
                                </div>
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            <PaginationList>
                              {sortedData && sortedData.length > 0 &&
                                sortedData.map((checkout) => (
                                  <tr key={checkout.customerId} className="font-gilroy border-b border-[#E8E8E8]">
                                    <td
                                      onClick={() => handleCustomerProfilePage(checkout)}
                                      className="align-middle border-b border-[#E8E8E8]"
                                    >

                                      <div className="flex items-center">
                                        <span
                                          className="text-sm font-semibold font-gilroy text-[#1E45E1] text-start align-middle cursor-pointer customer-name"
                                        >
                                          {checkout.firstName}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="p-0 text-sm font-medium font-gilroy text-black text-start align-middle border-b border-gray-300">
                                      +{checkout?.countryCode} {checkout.mobile}
                                    </td>

                                    <td className="p-0 text-sm font-semibold font-gilroy text-start align-middle whitespace-nowrap border-b border-gray-300">
                                      {checkout.floorName || "_"}
                                    </td>

                                    <td className="pl-4 text-start text-sm font-semibold font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap">
                                      {checkout.roomName || "_"}
                                    </td>

                                    <td className="pl-4 text-start text-sm font-semibold font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap">
                                      {checkout.bedName || "_"}
                                    </td>

                                    <td className="p-0 text-start text-sm font-medium font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap">
                                      <span className="inline-block px-2.5 py-1.5 rounded-full bg-gray-200 overflow-hidden text-ellipsis whitespace-nowrap align-middle">
                                        {checkout.checkoutDate || "N/A"}
                                      </span>
                                    </td>

                                    <td className="p-0 text-start text-sm font-semibold font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap">
                                      <span className="inline-block px-2 py-1 rounded bg-pink-300">
                                        {checkout.currentStatus || "-"}
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

                    <div className="min-h-[85vh] flex justify-center items-center animated-text">
                      <div>
                        <div className="text-center">
                          <img src={Emptystate} alt="emptystate" />
                        </div>

                        <div className="pb-1 text-center font-semibold font-gilroy text-lg text-[rgba(75,75,75,1)]">
                          No Checkout Tenant available
                        </div>

                        <div className="pb-1 text-center font-medium font-gilroy text-sm text-[rgba(75,75,75,1)]">
                          There are no checkout tenant added
                        </div>
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
        DueCustomerShow && <DueCustomerConfirmCheckout show={DueCustomerShow} handleClose={handleCloseDuePopup} />
      }

      {
        CheckoutProfile && <CustomerProfile CheckoutProfile={CheckoutProfile} setcheckoutTableShow={setcheckoutTableShow} handleCloseCheckoutProfile={handleCloseCheckoutProfile} setCheckoutProfile={setCheckoutProfile} checkoutWithoutPay={checkoutWithoutPay} />
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

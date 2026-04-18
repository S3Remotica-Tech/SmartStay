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




  const [checkOutCustomer, setCheckOutCustomer] = useState([]);
  const [checkoutLoader, setCheckOutLoader] = useState(false)
  const [CheckoutProfile, setCheckoutProfile] = useState(false)
  const [checkouttableshow, setcheckoutTableShow] = useState(true);
  const [checkoutWithoutPay, setCheckoutWithoutPay] = useState("")




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



  useEffect(() => {
    if (
      state.UsersList.addCheckoutCustomerStatusCode === 201 ||
      state.UsersList.deleteCheckoutCustomerStatusCode === 200
    ) {

      dispatch({ type: "CHECKOUTCUSTOMERLIST", payload: { hostelId: state.login.selectedHostel_Id } });
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

 
  const [DueCustomerShow, setDueCustomerShow] = useState(false)
  

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


  








  const [checkoutForm, setcheckoutForm] = useState(false);



  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  const handleCloseCheckoutProfile = () => {
    setCheckoutProfile(false)
  }

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10
  );

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
                {sortedData?.length > 0 ? (
                  <>
                    <div className={`flex justify-end mr-2 ${sortedData.length > 10 ? "-mt-8 mb-3" : "mt-0 mb-3"}`}>
                      <PaginationList
                        totalItems={sortedData.length}
                        itemsPerPage={pageSize}
                        currentPage={page}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(size) => setPageSize(size)}
                      />
                    </div>

                    <div className="relative h-[calc(100vh-165px)] flex flex-col">
                      <div className="flex-1 overflow-y-scroll overflow-x-auto show-scroll">
                        <table className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium">
                          <thead className="bg-blue-100 sticky top-0 z-20">
                            <tr className="h-9">
                              <th className="w-[230px] px-2">Name</th>
                              <th className="w-[230px] px-2"><div className="-ml-1">Mobile No</div></th>
                              <th className="w-[230px] px-2"><div className="-ml-2">Floor</div></th>
                              <th className="w-[230px] px-2">Room</th>
                              <th className="w-[230px] px-2">Bed</th>
                              <th className="w-[230px] px-2">Check-Out Date</th>
                              <th className="w-[230px] px-2">Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            {paginatedData.map((checkout) => (
                              <tr
                                key={checkout.customerId}
                                className="text-sm font-gilroy border-b border-[#E8E8E8] h-10"
                              >
                                <td
                                  onClick={() => handleCustomerProfilePage(checkout)}
                                  className="w-[230px] px-2 py-1 whitespace-nowrap"
                                >
                                  <span
                                    className="block max-w-32 truncate whitespace-nowrap text-sm font-semibold text-blue-700 cursor-pointer underline"
                                  >
                                    {checkout.fullName}
                                  </span>
                                </td>

                                <td className="w-[230px] py-1 whitespace-nowrap">
                                  +{checkout?.countryCode} {checkout.mobile}
                                </td>

                                <td className="w-[230px] py-1 whitespace-nowrap">
                                  {checkout.floorName || "_"}
                                </td>

                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  {checkout.roomName || "_"}
                                </td>

                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  {checkout.bedName || "_"}
                                </td>

                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <span className="inline-block  rounded-full  overflow-hidden text-ellipsis whitespace-nowrap align-middle text-[#1E45E1]">
                                    {checkout.checkoutDate || "N/A"}
                                  </span>
                                </td>

                                <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                                  <span className="inline-block px-2 py-1 rounded-md bg-red-100 text-red-600">
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

                ) : (!checkoutLoader && checkOutCustomer?.length === 0 && (

                  <div className="animated-text flex items-center justify-center h-[75vh]">
                    <div>
                      <div className="text-center 2xl:mt-24">
                        <img src={Emptystate} alt="emptystate" />
                      </div>

                      <div className="pb-1 mt-1 text-center font-gilroy font-semibold text-lg text-gray-700">
                        No Checkout Tenant available
                      </div>

                      <div className="text-center font-gilroy font-medium text-sm text-gray-700">
                        There are no checkout tenant added
                      </div>
                    </div>
                  </div>
                ))}
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

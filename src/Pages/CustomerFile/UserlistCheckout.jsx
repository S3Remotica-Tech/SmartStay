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
                      <div className="show-scrolls relative p-2 font-gilroy mt-3">
                        {/* <Table
                          responsive="md"
                          className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium sticky top-0 z-10 ">

                          <thead className="bg-blue-100 text-gray-400 font-gilroy text-sm font-medium sticky top-0 z-1"> */}

                        <Table responsive="md"
                          className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium sticky top-0 z-10 ">
                          <thead className="bg-blue-100 text-gray-400 font-gilroy text-sm font-medium sticky top-0 z-1">
                            <tr>
                              <th>Name</th>
                              <th><div className="-ml-1">Mobile No</div></th>
                              <th><div className="-ml-2">Floor</div></th>
                              <th>Room</th>
                              <th>Bed</th>
                              <th>Check-Out Date</th>
                              <th>Status</th>
                            </tr>
                          </thead>

                          <tbody>
                            <PaginationList>
                              {sortedData && sortedData.length > 0 &&
                                sortedData.map((checkout) => (
                                  <tr key={checkout.customerId} className="font-gilroy border-b border-[#E8E8E8]">
                                    <td
                                      onClick={() => handleCustomerProfilePage(checkout)}
                                      className="text-start align-middle font-medium whitespace-nowrap"
                                    >
                                      <div className="flex items-center">
                                        <span 
                                          className="block max-w-32 truncate whitespace-nowrap text-sm font-semibold font-gilroy text-blue-700 cursor-pointer underline"
                                        >
                                          {checkout.fullName}
                                        </span>
                                      </div>
                                    </td>

                                    <td className="p-0 text-sm font-medium font-gilroy align-middle border-b border-gray-300 text-[#1E45E1]">
                                      +{checkout?.countryCode} {checkout.mobile}
                                    </td>

                                    <td className="p-0 text-sm font-medium font-gilroy align-middle whitespace-nowrap border-b border-gray-300 text-[#1E45E1]">
                                      {checkout.floorName || "_"}
                                    </td>

                                    <td className="pl-4 text-start text-sm font-medium font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap text-[#1E45E1]">
                                      {checkout.roomName || "_"}
                                    </td>

                                    <td className="pl-4 text-start text-sm font-medium font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap text-[#1E45E1]">
                                      {checkout.bedName || "_"}
                                    </td>

                                    <td className="p-0 text-start text-sm font-medium font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap">
                                      <span className="ml-1 inline-block px-2.5 py-1.5 rounded-full bg-gray-200 overflow-hidden text-ellipsis whitespace-nowrap align-middle text-[#1E45E1]">
                                        {checkout.checkoutDate || "N/A"}
                                      </span>
                                    </td>

                                    <td className="p-0 text-start text-sm font-medium font-gilroy align-middle border-b border-[#E8E8E8] whitespace-nowrap">
                                      <span className="inline-block px-2 py-1 rounded bg-pink-300 text-[#1E45E1]">
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

                    <div className="animated-text flex items-center justify-center h-[75vh] 2xl:mt-52">
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

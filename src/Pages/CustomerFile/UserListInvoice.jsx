
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import { useNavigate } from "react-router-dom";
import PaginationList from "../../Components/PaginationList";
import {
  Edit,
  DiscountCircle,
  DocumentDownload,
  ReceiptEdit,
  MoneySend, Trash
} from "iconsax-react";
import { IoMdMore } from "react-icons/io";
import RecordPayment from "../Bills/RecordPayment";
import RefundAmount from "../Bills/RefundAmount";
import UnPaidInvoice from "../Bills/UnPaidInvoice";
import DiscountInvoice from "../PDF/DiscountInvoice";





function UserListInvoice(props) {
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showform, setShowform] = useState(false);
  const popupRef = useRef(null);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedUserId, setSelectedUserId] = useState("")
  const [invoiceList, setInvoiceList] = useState('')
  const CustomerOverView = state?.UsersList?.customerdetails

  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice
  } = useHasPermission("Bills");



  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoiceResponseList);
  }, [state.UsersList.customerdetails.invoiceResponseList]);

console.log("invoiceFilterddata",invoiceFilterddata)

  const handleShowDots = (item, event) => {
    if (activeId === item.invoiceId) {
      setActiveId(null);
    } else {
      setActiveId(item.invoiceId);
    }
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;
    setPopupPosition({ top: popupTop, left: popupLeft });
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveId(null);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const handleAddBill = () => {

    navigate('/create-bill', { state: { id: CustomerOverView?.customerId } });
    dispatch({ type: 'USERROOMAVAILABLETRUE' });
  };


  const isValidSubscription = state.UsersList?.hotelDetailsinPg?.isSubscriptionActive
  const isExportAllow = isValidSubscription && canReadInvoice


  const handleInvoicepdf = (rowData) => {
    console.log("rowData", rowData)
    if (rowData.invoiceId) {
      dispatch({
        type: "INVOICEPDF",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: rowData.invoiceId,
        },
      });
      setLoading(true);

    }
  };

  useEffect(() => {
    if (state.InvoiceList?.statusCodeForPDf === 200) {
      const pdfUrl = state.InvoiceList?.invoicePDF;
      if (!pdfUrl) return;

      window.open(pdfUrl, "_blank");
      dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
    }

  }, [state.InvoiceList?.statusCodeForPDf]);


  const handleRecordPayment = (item) => {
    console.log("item *******", item)
    setShowform(true)
    setSelectedUserId(CustomerOverView?.customerId)
    setInvoiceList({
      balanceDue: item?.dueAmount,
      invoiceId: item?.invoiceId,
      invoiceDate: item?.invoiceGeneratedDate
    })


  }

  const handleCloseForm = () => {
    setShowform(false)
  }


  const [showDiscountInvoice, setShowDiscountInvoice] = useState(false);
  const [discountDetails, setDiscountDetails] = useState('')
  const [payapleform, setPayableForm] = useState(false)
  const [refundDetails, setRefundDetails] = useState('')
  const [showUnpaidModal, setShowUnpaidModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);


  const handleEdit = (data) => {
    navigate('/create-bill', {
      state: {
        billData: data,
      },
    })

  };






  const handleMakeDiscount = (item) => {
    setDiscountDetails(CustomerOverView)
    setShowDiscountInvoice(true)


    dispatch({
      type: 'GETPARTICULARBILLSDETAILS', payload: {
        hostelId: CustomerOverView?.hostelId,
        invoiceId: item?.invoiceId
      }
    })
  }

  const handleCloseFormDiscount = () => {
    setShowDiscountInvoice(false)
  }

  const handleRefundAmount = (details) => {
    setRefundDetails(details)
    setPayableForm(true)

  }
  const handleCloseRefundAmount = () => {
    setPayableForm(false)
  }

  const handleUnpaid = (item) => {
    setSelectedInvoice(item);
    setShowUnpaidModal(true);
  };


  const handleCloseUnPaid = () => {
    setShowUnpaidModal(false);
  }







  useEffect(() => {
    if (state.InvoiceList.createRefundStatusCode === 200) {
      setPayableForm(false)
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_CREATE_REFUND' })
      }, 100)
    }

  }, [state.InvoiceList.createRefundStatusCode])


  useEffect(() => {
    if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {
      setShowDiscountInvoice(false)
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_INVOICE_DISCOUNT_REDUCER' })
      })
    }

  }, [state.InvoiceList?.makeInvoiceDiscountStatus])

  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {

      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_RECORD_PAYMENT" });
      }, 300);
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);


  useEffect(() => {
    if (state.InvoiceList.manualInvoiceUnpaidStatusCode === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: CustomerOverView?.customerId } });

      dispatch({ type: "REMOVE_MANUAL_BILL_UPDATE_UNPAID_REDUCER" });
    }

  }, [state.InvoiceList.manualInvoiceUnpaidStatusCode])

  const handleNavigatePDF = (item) => {

    if (item) {
      dispatch({ type: 'GETPARTICULARBILLSDETAILS', payload: { hostelId: CustomerOverView?.hostelId, invoiceId: item.invoiceId } })
      navigate(`/invoice/details/${item.invoiceId}`, {
        replace: false,
        state: {
          rowData: item, ts: Date.now(),
          isTenantWay: true
        },
      });

    }
  }
  return (
    <>

      {showUnpaidModal && (
        <UnPaidInvoice show={showUnpaidModal} handleClose={handleCloseUnPaid} selectedInvoice={selectedInvoice} />
      )}



      {
        showDiscountInvoice && <DiscountInvoice show={showDiscountInvoice} handleClose={handleCloseFormDiscount} discountDetails={discountDetails} />
      }

      {showform && (
        <RecordPayment show={showform} handleClose={handleCloseForm}
          selectedUserId={selectedUserId}
          invoiceList={invoiceList}
        />

      )}
      {
        payapleform && <RefundAmount show={payapleform} handleClose={handleCloseRefundAmount} refundDetails={refundDetails} />
      }



      <div className="flex justify-end w-full lg:-mt-[65px] ">
        {state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" && (
          <Button
            onClick={handleAddBill}
            disabled={props.customerAdd || !canWriteInvoice}
            className="!font-gilroy text-sm text-white !font-semibold rounded-md px-4 w-36 whitespace-nowrap !bg-[#1E45E1]"
          >
            + Create Bill
          </Button>
        )}
      </div>

      <div className="mt-10">
        {

          !canReadInvoice ?
            <div className="flex flex-col items-center justify-center min-h-1/2" >

              <ErrorMessage message={['You do not have access to view Bill']} type="warning" />

            </div>

            :


            invoiceFilterddata?.length > 0 ? (
              <div className="mx-3 bg-white shadow-md  overflow-x-auto max-h-[420px] overflow-y-auto rounded">

                <table className="min-w-[900px] w-full border-collapse">

                  <thead className="bg-[#E7F1FF] sticky top-0 z-30">
                    <tr className="text-left">

                      <th className="sticky left-0 z-40 bg-[#E7F1FF] px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                        INVOICE NUMBER
                      </th>

                      <th className="sticky left-[125px] z-30 bg-[#E7F1FF] px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                        INVOICE TYPE
                      </th>

                      <th className="px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                        INVOICE DATE
                      </th>

                      <th className="px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                        DUE DATE
                      </th>

                      <th className="px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                        AMOUNT
                      </th>

                      <th className="px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                        DUE
                      </th>

                      <th className="px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                        STATUS
                      </th>
                      {state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" && (
                        <th className="px-3 py-2 text-[13px] font-bold text-gray-500 whitespace-nowrap font-gilroy">
                          ACTION
                        </th>
                      )}
                    </tr>
                  </thead>

                  <tbody className="text-[14px] font-medium font-gilroy">

                    {/* <PaginationList> */}
                      {invoiceFilterddata?.map((view) => {
                        return (
                          <tr key={view.invoiceId} className="border-b border-[#F1F5FF]">

                            <td className="sticky whitespace-nowrap left-0 bg-white z-20 px-3 py-2 text-[13px] text-[#1E45E1] hover:underline cursor-pointer" onClick={() => handleNavigatePDF(view)} >
                              {view.invoiceNumber}
                            </td>


                            <td className="sticky left-[125px] bg-white z-20 px-3 py-2 text-[13px] whitespace-nowrap">
                              {view.invoiceType}_
                              <span className="text-[8px] whitespace-nowrap">{view.invoiceMode}</span>
                            </td>

                            <td className="px-3 py-2 text-[13px] whitespace-nowrap">
                              {view?.invoiceGeneratedDate}
                            </td>

                            <td className="px-3 py-2 text-[13px] whitespace-nowrap">
                              {view?.dueDate}
                            </td>

                            <td className="px-3 py-2 text-[13px] whitespace-nowrap">
                              {view?.totalAmount}
                            </td>

                            <td className="px-3 py-2 text-[13px] whitespace-nowrap">
                              ₹{view.dueAmount}
                            </td>


                            <td className="px-3 py-2" >

                              {(view?.paymentStatus === "Pending" ||
                                view.paymentStatus === "Partial Payment") && (
                                  <span className="bg-[#FFD9D9] whitespace-nowrap text-[#7A1C1C] rounded-[13px] px-3 py-[4px] leading-none font-gilroy text-[13px]">
                                    {view?.paymentStatus}
                                  </span>
                                )}


                              {view?.paymentStatus === "Paid" && (
                                <span className="cursor-pointer whitespace-nowrap bg-[#D9FFD9] text-[#065F46] rounded-[14px] px-3 py-[4px] leading-none font-gilroy text-[13px]">
                                  {view?.paymentStatus}
                                </span>
                              )}

                              {(view?.paymentStatus === "Refunded" ||
                                view?.paymentStatus === "Partially Refunded") && (
                                  <span className="bg-[#FFF3CD] whitespace-nowrap text-[#8B8000] rounded-[14px] px-3 py-[4px] leading-none font-gilroy text-[13px]">
                                    {view?.paymentStatus}
                                  </span>
                                )}


                              {view?.paymentStatus === "Pending Refund" && (
                                <span className="bg-[#FFE6B3] whitespace-nowrap text-[#B45309] rounded-[14px] px-3 py-[4px] leading-none font-gilroy text-[13px]">
                                  {view?.paymentStatus}
                                </span>
                              )}


                              {view?.paymentStatus === "Cancelled" && (
                                <span className="bg-[#FFE6B3] whitespace-nowrap text-[#7C2D12] rounded-[14px] px-3 py-[4px] leading-none font-gilroy text-[13px]">
                                  Cancelled
                                </span>
                              )}

                            </td>
                            {state.UsersList.customerdetails?.customerCurrentStatus !== "VACATED" && (
                              <td className="text-left align-middle border-b border-[#E8E8E8] px-3">
                                <div className="flex flex-wrap gap-2 py-2">
                                  <div
                                    className={`flex justify-center items-center relative cursor-pointer  
        ${activeId === view.id ? "z-[1000]" : ""}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleShowDots(view, e);
                                    }}
                                  >

                                    <IoMdMore className="text-xl text-[#222222]" />

                                    {activeId === view.invoiceId && (
                                      <div
                                        ref={popupRef}
                                        className="fixed w-[170px] bg-[#F9F9F9] rounded-[10px] z-[3000] shadow border whitespace-nowrap"
                                        style={{
                                          top: popupPosition.top,
                                          left: popupPosition.left - 50,
                                        }}
                                      >

                                        <div className="flex flex-col p-1 gap-1">
                                          {(view.invoiceMode === "RECURRING" &&
                                            view?.paymentStatus === "Pending") && (
                                              <button
                                                onClick={() => canUpdateInvoice && handleEdit(view)}
                                                disabled={!canUpdateInvoice}
                                                className={`flex items-center gap-2 px-3 py-2 
        ${canUpdateInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                              >
                                                <Edit size="16" color="#1E45E1" />
                                                Edit
                                              </button>
                                            )}
                                          {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}

                                          {(view.invoiceMode === "MANUAL" &&
                                            view?.paymentStatus === "Paid" &&
                                            view.invoiceType === "Rent") && (
                                              <button
                                                disabled={!canWriteInvoice}
                                                onClick={() => canWriteInvoice && handleUnpaid(view)}
                                                className={`flex items-center gap-2 w-full px-3 py-2 text-left 
        ${canWriteInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                                              >
                                                <Edit size="16" color="#1E45E1" />
                                                Unpaid
                                              </button>
                                            )}
                                          {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}

                                          {(view?.totalAmount > 0 &&
                                            view?.paymentStatus === "Pending" &&
                                            !view?.isDiscounted &&
                                            (view?.invoiceType === "Rent" ||
                                              view?.invoiceType === "Settlement")) && (
                                              <button
                                                disabled={!canWriteInvoice}
                                                onClick={() => canWriteInvoice && handleMakeDiscount(view)}
                                                className={`flex items-center gap-2 w-full px-3 py-2 text-left  
        ${canWriteInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                                              >
                                                <DiscountCircle size="16" color="#ec400c" />
                                                Make Discount
                                              </button>
                                            )}

                                          {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}
                                          <button
                                            onClick={() => isExportAllow && handleInvoicepdf(view)}
                                            disabled={!isExportAllow}
                                            className={`flex items-center gap-2 px-3 py-2   
      ${isExportAllow ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                          >
                                            <DocumentDownload size="16" color="#1E45E1" />
                                            Download
                                          </button>
                                          {/* 
                                          <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}

                                          {(
                                            view?.totalAmount > 0 &&
                                            view?.paymentStatus !== "Cancelled" &&
                                            view?.paymentStatus !== "Paid") && (
                                              <button onClick={() => {
                                                if (canWriteInvoice) {
                                                  handleRecordPayment(view);
                                                }
                                              }}
                                                disabled={!canWriteInvoice}
                                                className={`flex items-center gap-2 px-3 py-2 
        ${canWriteInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                              >
                                                <ReceiptEdit size="16" color="#1E45E1" />
                                                Record Payment
                                              </button>
                                            )}

                                          {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}
                                          {(view?.totalAmount < 0 &&
                                            view?.paymentStatus !== "Refund" &&
                                            view?.paymentStatus !== "Cancelled") && (
                                              <button onClick={() => canWriteInvoice && handleRefundAmount(view)}
                                                disabled={!canWriteInvoice}
                                                className={`flex items-center gap-2 px-3 py-2 
        ${canWriteInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                              >
                                                <MoneySend size="16" color="#1E45E1" />
                                                Refund Amount
                                              </button>
                                            )}




                                          {(view?.paymentStatus !== "Cancelled" &&
                                            view?.paymentStatus !== "Paid") && (
                                              <button disabled

                                                className={`flex items-center gap-2 cursor-not-allowed w-full px-3 py-2 text-sm rounded-b-[10px]
      ${canDeleteInvoice
                                                    ? "hover:bg-[#FFF0F0] text-red-500 "
                                                    : "opacity-50 cursor-not-allowed text-[#ccc]"
                                                  }`}
                                              >
                                                <Trash size="16" />
                                                Delete
                                              </button>
                                            )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </td>
                            )}
                          </tr>
                        )
                      })
                      }
                    {/* </PaginationList> */}

                    {invoiceFilterddata?.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-red-500 py-4">
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>




              </div>
            ) :

              <div className="mt-2.5 flex justify-center">
                <div>
                  <div className="text-center">
                    <img src={Emptystate} alt="emptystate" />
                  </div>

                  <div className="pb-1 text-center font-semibold text-[16px] text-[#4B4B4B] font-gilroy">
                    No Bills available
                  </div>
                  <div className="pb-1 text-center font-medium text-[14px] text-[#4B4B4B] font-gilroy">
                    There are no Bills added.
                  </div>
                </div>
              </div>
        }
      </div>





    </>
  );
}
UserListInvoice.propTypes = {
  handleEditItem: PropTypes.func,
  handleDeleteItem: PropTypes.func,
  customerEdit: PropTypes.func,
  customerDelete: PropTypes.func,
  handleAddItem: PropTypes.func,
  id: PropTypes.func,
  customerAdd: PropTypes.func,
};

export default UserListInvoice;
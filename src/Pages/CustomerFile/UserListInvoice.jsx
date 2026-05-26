/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import { useNavigate } from "react-router-dom";
import PaginationList from "../../Components/PaginationList";
import {
  Edit,
  DiscountCircle,
  DocumentDownload,
  ReceiptEdit,
  MoneySend,
  Trash,
} from "iconsax-react";
import { IoMdMore } from "react-icons/io";
import RecordPayment from "../Bills/RecordPayment";
import RefundAmount from "../Bills/RefundAmount";
import UnPaidInvoice from "../Bills/UnPaidInvoice";
import DiscountInvoice from "../PDF/DiscountInvoice";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";

function UserListInvoice(props) {
  const state = useSelector((state) => state);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showform, setShowform] = useState(false);
  const popupRef = useRef(null);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [selectedUserId, setSelectedUserId] = useState("");
  const [invoiceList, setInvoiceList] = useState("");
  const CustomerOverView = state?.UsersList?.customerdetails;

  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");

  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoiceResponseList);
  }, [state.UsersList.customerdetails.invoiceResponseList]);

  // console.log("invoiceFilterddata", invoiceFilterddata);

  const handleShowDots = (item, event) => {
    if (activeId === item.invoiceId) {
      setActiveId(null);
      return;
    }

    setActiveId(item.invoiceId);

    const rect = event.currentTarget.getBoundingClientRect();

    const popupHeight = 180;
    const spaceBelow = window.innerHeight - rect.bottom;

    const isBottom = spaceBelow < popupHeight;

    setPopupPosition({
      top: isBottom ? rect.top - popupHeight : rect.bottom,
      left: rect.left - 120,
    });
  };
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActiveId(null);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAddBill = () => {
    navigate("/create-bill", { state: { id: CustomerOverView?.customerId } });
    dispatch({ type: "USERROOMAVAILABLETRUE" });
  };

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;
  const isExportAllow = isValidSubscription && canReadInvoice;

  const handleInvoicepdf = (rowData) => {
    // console.log("rowData", rowData);
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
    // console.log("item *******", item);
    setShowform(true);
    setSelectedUserId(CustomerOverView?.customerId);
    setInvoiceList({
      balanceDue: item?.dueAmount,
      invoiceId: item?.invoiceId,
      invoiceDate: item?.invoiceGeneratedDate,
    });
  };

  const handleCloseForm = () => {
    setShowform(false);
  };

  const [showDiscountInvoice, setShowDiscountInvoice] = useState(false);
  const [discountDetails, setDiscountDetails] = useState("");
  const [payapleform, setPayableForm] = useState(false);
  const [refundDetails, setRefundDetails] = useState("");
  const [showUnpaidModal, setShowUnpaidModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const handleEdit = (data) => {
    navigate("/create-bill", {
      state: {
        billData: data,
      },
    });
    dispatch({ type: "USERROOMAVAILABLETRUE" });
  };

  const handleMakeDiscount = (item) => {
    setDiscountDetails(CustomerOverView);
    setShowDiscountInvoice(true);

    dispatch({
      type: "GETPARTICULARBILLSDETAILS",
      payload: {
        hostelId: CustomerOverView?.hostelId,
        invoiceId: item?.invoiceId,
      },
    });
  };

  const handleCloseFormDiscount = () => {
    setShowDiscountInvoice(false);
  };

  const handleRefundAmount = (details) => {
    setRefundDetails(details);
    setPayableForm(true);
  };
  const handleCloseRefundAmount = () => {
    setPayableForm(false);
  };

  const handleUnpaid = (item) => {
    setSelectedInvoice(item);
    setShowUnpaidModal(true);
  };

  const handleCloseUnPaid = () => {
    setShowUnpaidModal(false);
  };

  useEffect(() => {
    if (state.InvoiceList.createRefundStatusCode === 200) {
      setPayableForm(false);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_CREATE_REFUND" });
      }, 100);
    }
  }, [state.InvoiceList.createRefundStatusCode]);

  useEffect(() => {
    if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {
      setShowDiscountInvoice(false);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_INVOICE_DISCOUNT_REDUCER" });
      });
    }
  }, [state.InvoiceList?.makeInvoiceDiscountStatus]);

  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_RECORD_PAYMENT" });
      }, 300);
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceUnpaidStatusCode === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: CustomerOverView?.customerId },
      });

      dispatch({ type: "REMOVE_MANUAL_BILL_UPDATE_UNPAID_REDUCER" });
    }
  }, [state.InvoiceList.manualInvoiceUnpaidStatusCode]);

  const handleNavigatePDF = (item) => {
    if (item) {
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: CustomerOverView?.hostelId,
          invoiceId: item.invoiceId,
        },
      });
      navigate(`/invoice/details/${item.invoiceId}`, {
        replace: false,
        state: {
          rowData: item,
          ts: Date.now(),
          isTenantWay: true,
        },
      });
    }
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

  // const paginatedData = sortedData.slice(startIndex, endIndex);
  const paginatedData = invoiceFilterddata?.slice(startIndex, endIndex);

  const isDisabledButton =
    !canWriteInvoice ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
      "CANCELLED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus ===
      "SETTLEMENT_GENERATED";

  return (
    <>
      {showUnpaidModal && (
        <UnPaidInvoice
          show={showUnpaidModal}
          handleClose={handleCloseUnPaid}
          selectedInvoice={selectedInvoice}
        />
      )}

      {showDiscountInvoice && (
        <DiscountInvoice
          show={showDiscountInvoice}
          handleClose={handleCloseFormDiscount}
          discountDetails={discountDetails}
        />
      )}

      {showform && (
        <RecordPayment
          show={showform}
          handleClose={handleCloseForm}
          selectedUserId={selectedUserId}
          invoiceList={invoiceList}
        />
      )}
      {payapleform && (
        <RefundAmount
          show={payapleform}
          handleClose={handleCloseRefundAmount}
          refundDetails={refundDetails}
        />
      )}

      <div className="flex justify-end w-full lg:-mt-[65px] ">
        <Button
          onClick={handleAddBill}
          disabled={isDisabledButton}
          className="!font-gilroy text-sm text-white !font-semibold disabled:cursor-not-allowed rounded-md px-4 w-36 whitespace-nowrap !bg-[#1E45E1]"
        >
          + Create Bill
        </Button>
      </div>

      <div className="">
        {!canReadInvoice ? (
          <>
            <PermissionDeniedMessage isHeightChanged={true} />
          </>
        ) : invoiceFilterddata?.length > 0 ? (
          <>
            <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-4 ">
              <div
                id="tableContainer"
                // ref={tableContainerRef}
                className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
              >
                <table className=" w-full font-gilroy">
                  <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                    <tr className="h-9">
                      <th className="w-[230px] px-2 whitespace-nowrap">
                        Invoice number
                      </th>

                      <th className="w-[230px] px-2 whitespace-nowrap">
                        Invoice type
                      </th>

                      <th className="w-[230px] px-2 whitespace-nowrap">
                        Invoice date
                      </th>

                      <th className="w-[230px] px-2 whitespace-nowrap">
                        Due date
                      </th>

                      <th className="w-[230px] px-2">Amount</th>

                      <th className="w-[230px] px-2">Due</th>

                      <th className="w-[230px] px-2">Status</th>

                      {state.UsersList.customerdetails
                        ?.customerCurrentStatus !== "VACATED" && (
                        <th className="w-[230px] px-2">Action</th>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData?.map((view) => {
                      return (
                        <tr
                          key={view.invoiceId}
                          className="text-sm font-gilroy border-b border-[#E8E8E8] h-10 hover:bg-gray-100"
                        >
                          <td
                            className="w-[230px] py-1 px-2 whitespace-nowrap text-[#1E45E1] hover:underline cursor-pointer"
                            onClick={() => handleNavigatePDF(view)}
                          >
                            {view.invoiceNumber}
                          </td>

                          <td className="w-[230px] py-1 px-2 relative">
                            <div className="flex items-center gap-2 group w-fit">
                              <span className="truncate max-w-[150px]">
                                {view.invoiceType}
                              </span>

                              {view.invoiceMode === "Manual" &&
                                view.invoiceType === "Rent" && (
                                  <ReceiptEdit
                                    size="14"
                                    className="text-gray-500"
                                  />
                                )}

                              <span
                                className="absolute hidden group-hover:block top-full left-0 mt-1
      bg-gray-700 text-white text-xs rounded px-2 py-1 whitespace-nowrap 
      z-50 pointer-events-none"
                              >
                                {view.invoiceMode}
                              </span>
                            </div>
                          </td>

                          <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                            {view?.invoiceGeneratedDate}
                          </td>

                          <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                            {view?.dueDate}
                          </td>

                          <td className="w-[230px] py-1 px-2">
                            {view?.totalAmount}
                          </td>

                          <td className="w-[230px] py-1 px-2">
                            ₹{view.dueAmount}
                          </td>

                          <td className="w-[230px] py-1 px-2 whitespace-nowrap">
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

                          {state.UsersList.customerdetails
                            ?.customerCurrentStatus !== "VACATED" && (
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
                                      className="fixed z-[9999] w-[170px] bg-[#F9F9F9] rounded-[10px] border"
                                      style={{
                                        top: popupPosition.top,
                                        left: popupPosition.left - 50,
                                      }}
                                    >
                                      <div className="flex flex-col gap-1 divide-y divide-gray-300">
                                        {view?.paymentStatus === "Pending" &&
                                          view?.invoiceType === "Rent" &&
                                          (view?.invoiceMode === "RECURRING" ||
                                            view?.invoiceMode ===
                                              "AUTOMATIC") && (
                                            <button
                                              onClick={() =>
                                                canUpdateInvoice &&
                                                handleEdit(view)
                                              }
                                              disabled={!canUpdateInvoice}
                                              className={`flex items-center gap-2 px-3 py-2 
      ${
        canUpdateInvoice
          ? "cursor-pointer hover:bg-[#EDF2FF]"
          : "cursor-not-allowed opacity-50"
      }`}
                                            >
                                              <Edit size="16" color="#1E45E1" />
                                              Edit
                                            </button>
                                          )}
                                        {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}

                                        {view.invoiceMode === "MANUAL" &&
                                          view?.paymentStatus === "Paid" &&
                                          view.invoiceType === "Rent" && (
                                            <button
                                              disabled={!canWriteInvoice}
                                              onClick={() =>
                                                canWriteInvoice &&
                                                handleUnpaid(view)
                                              }
                                              className={`flex items-center gap-2 w-full px-3 py-2 text-left 
        ${canWriteInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                                            >
                                              <Edit size="16" color="#1E45E1" />
                                              Unpaid
                                            </button>
                                          )}
                                        {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}

                                        {view?.totalAmount > 0 &&
                                          view?.paymentStatus === "Pending" &&
                                          !view?.isDiscounted &&
                                          (view?.invoiceType === "Rent" ||
                                            view?.invoiceType ===
                                              "Settlement" ||
                                            view?.invoiceType ===
                                              "Reassign Rent") && (
                                            <button
                                              disabled={!canWriteInvoice}
                                              onClick={() =>
                                                canWriteInvoice &&
                                                handleMakeDiscount(view)
                                              }
                                              className={`flex items-center gap-2 w-full px-3 py-2 text-left  
        ${canWriteInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                                            >
                                              <DiscountCircle
                                                size="16"
                                                color="#ec400c"
                                              />
                                              Make Discount
                                            </button>
                                          )}

                                        <button
                                          onClick={() =>
                                            isExportAllow &&
                                            handleInvoicepdf(view)
                                          }
                                          disabled={!isExportAllow}
                                          className={`flex items-center gap-2 px-3 py-2   
      ${isExportAllow ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                        >
                                          <DocumentDownload
                                            size="16"
                                            color="#1E45E1"
                                          />
                                          Download
                                        </button>
                                        {/* 
                                          <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}

                                        {view?.totalAmount > 0 &&
                                          view?.paymentStatus !== "Cancelled" &&
                                          view?.paymentStatus !== "Paid" && (
                                            <button
                                              onClick={() => {
                                                if (canWriteInvoice) {
                                                  handleRecordPayment(view);
                                                }
                                              }}
                                              disabled={!canWriteInvoice}
                                              className={`flex items-center gap-2 px-3 py-2 
        ${canWriteInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                            >
                                              <ReceiptEdit
                                                size="16"
                                                color="#1E45E1"
                                              />
                                              Record Payment
                                            </button>
                                          )}

                                        {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}
                                        {view?.totalAmount < 0 &&
                                          view?.paymentStatus !== "Refunded" &&
                                          view?.paymentStatus !==
                                            "Cancelled" && (
                                            <button
                                              onClick={() =>
                                                canWriteInvoice &&
                                                handleRefundAmount(view)
                                              }
                                              disabled={!canWriteInvoice}
                                              className={`flex items-center gap-2 px-3 py-2 
        ${canWriteInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                            >
                                              <MoneySend
                                                size="16"
                                                color="#1E45E1"
                                              />
                                              Refund Amount
                                            </button>
                                          )}

                                        {view?.paymentStatus !== "Cancelled" &&
                                          view?.paymentStatus !== "Paid" && (
                                            <button
                                              disabled
                                              className={`flex items-center gap-2 cursor-not-allowed w-full px-3 py-2 text-sm rounded-b-[10px]
      ${
        canDeleteInvoice
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
                      );
                    })}

                    {paginatedData?.length === 0 && (
                      <tr>
                        <td
                          colSpan="7"
                          className="text-center text-red-500 py-4"
                        >
                          No data found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end shrink-0 bg-white mt-3.5 2xl:mt-2">
              <PaginationList
                totalItems={invoiceFilterddata.length}
                itemsPerPage={pageSize}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(size) => setPageSize(size)}
              />
            </div>
          </>
        ) : (
          <NoDataMessage label="Invoice" isHeightChanged={true} />
        )}
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

/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
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
import DeleteBill from "../Bills/DeleteBill"

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function UserListInvoice() {
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
  } = useHasPermission("Invoice");

  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoiceResponseList);
  }, [state.UsersList.customerdetails.invoiceResponseList]);

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
    navigate("/create-invoice", {
      state: { id: CustomerOverView?.customerId, isDisabledOverview: true },
    });
    dispatch({ type: "USERROOMAVAILABLETRUE" });
  };

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;
  const isExportAllow = isValidSubscription && canReadInvoice;

  const handleInvoicepdf = (rowData) => {
    if (rowData.invoiceId) {
      dispatch({
        type: "INVOICEPDF",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: rowData.invoiceId,
        },
      });
      // setLoading(true);
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
    navigate("/create-invoice", {
      state: {
        billData: data,
      },
    });
    dispatch({ type: "USERROOMAVAILABLETRUE" });
  };

  const handleMakeDiscount = (item) => {
    setDiscountDetails(item);
    setShowDiscountInvoice(true);
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
  const [showdeleteform, setShowDeleteform] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleDeleteInvoice = (details) => {
    setShowDeleteform(true)
    setDeleteId(details?.invoiceId)
  }
  const handleCloseDeleteInvoice = () => {
    setShowDeleteform(false)
  }


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
      dispatch({
        type: "ALL_BILLS_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
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
      <DeleteBill
        show={showdeleteform}
        onCancel={handleCloseDeleteInvoice}
        billId={deleteId}
      />
      <div className="flex justify-end w-full lg:-mt-[65px] ">
        <Button data-testid="user-list-invoice-create-bill-btn"
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
            <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-4">
              <div
                id="tableContainer"
                // ref={tableContainerRef}
                className="overflow-auto relative  h-[calc(100vh-140px)] show-scrolls"
              >
                <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                  <thead className="sticky top-0 z-40">
                    <tr>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Invoice number
                      </th>

                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Invoice type
                      </th>

                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Invoice date
                      </th>

                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Due date
                      </th>

                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Amount</th>

                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Due</th>

                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Status</th>

                      {state.UsersList.customerdetails
                        ?.customerCurrentStatus !== "VACATED" && (
                          <th className={`${TABLE_HEADER_CELL} text-left w-[230px] sticky right-0 z-[2] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)]`}>Action</th>
                        )}
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData?.map((view) => {
                      return (
                        <tr
                          key={view.invoiceId}
                          className="hover:bg-gray-100"
                        >
                          <td data-testid={`user-list-invoice-navigate-pdf-action-${view.invoiceId}`}
                            className={`${TABLE_BODY_CELL} w-[230px] text-[#1E45E1] hover:underline cursor-pointer`}
                            onClick={() => handleNavigatePDF(view)}
                          >
                            {view.invoiceNumber}
                          </td>

                          <td className={`${TABLE_BODY_CELL} w-[230px] relative text-[#111928]`}>
                            <div className="flex items-center gap-2 group w-fit">
                              <span className="truncate max-w-[150px]">
                                {view.invoiceType}
                              </span>

                              {view.invoiceMode === "Manual" &&
                                view.invoiceType === "Rent" && (
                                  <ReceiptEdit
                                    size="14"
                                    className="text-[#314158]"
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

                          <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                            {view?.invoiceDate}
                          </td>

                          <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                            {view?.dueDate}
                          </td>

                          <td className={`${TABLE_BODY_CELL} w-[230px] relative align-middle text-[#111928]`}>
                            <div className="relative inline-block">
                              <span className="leading-5">
                                ₹ {view?.totalAmount}
                              </span>

                              {(view.isDiscounted ||
                                view.isInvoicesApplied) && (
                                  <div className=" flex flex-col text-[10px] text-[#314158] leading-3 min-w-max h-4">
                                    {view.isDiscounted && (
                                      <span>
                                        Discount Applied : ₹
                                        <span className="text-[11px] font-semibold">
                                          {Number(
                                            view?.discountAmount || 0,
                                          ).toLocaleString("en-IN")}
                                        </span>
                                      </span>
                                    )}

                                    {view.isInvoicesApplied && (
                                      <span className="">
                                        Adjusted Amount : ₹
                                        <span className="text-[11px] font-semibold">
                                          {Number(
                                            view?.invoicesApplied
                                              ?.amountApplied || 0,
                                          ).toLocaleString("en-IN")}
                                        </span>
                                      </span>
                                    )}
                                  </div>
                                )}
                            </div>
                          </td>

                          <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                            ₹{view.dueAmount}
                          </td>

                          <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                            {(view?.paymentStatus === "Pending" ||
                              view.paymentStatus === "Partial Payment") && (
                                <span className={`inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] whitespace-nowrap ${view?.paymentStatus === "Partial Payment" ? "bg-[rgba(255,237,202,0.6)]" : "bg-[rgba(255,189,189,0.4)]"}`}>
                                  <span className={`w-[6px] h-[6px] rounded-full ${view?.paymentStatus === "Partial Payment" ? "bg-[#F59E0B]" : "bg-[#EF4444]"}`} />
                                  {view?.paymentStatus}
                                </span>
                              )}

                            {view?.paymentStatus === "Paid" && (
                              <span className="inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] whitespace-nowrap bg-[rgba(179,229,187,0.3)] cursor-pointer">
                                <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E]" />
                                {view?.paymentStatus}
                              </span>
                            )}

                            {(view?.paymentStatus === "Refunded" ||
                              view?.paymentStatus === "Partially Refunded") && (
                                <span className="inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] whitespace-nowrap bg-[#E7F1FF]">
                                  <span className="w-[6px] h-[6px] rounded-full bg-[#3B82F6]" />
                                  {view?.paymentStatus}
                                </span>
                              )}

                            {view?.paymentStatus === "Pending Refund" && (
                              <span className="inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] whitespace-nowrap bg-[rgba(255,237,202,0.6)]">
                                <span className="w-[6px] h-[6px] rounded-full bg-[#F59E0B]" />
                                {view?.paymentStatus}
                              </span>
                            )}

                            {view?.paymentStatus === "Cancelled" && (
                              <span className="inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] whitespace-nowrap bg-[#E5E7EB]">
                                <span className="w-[6px] h-[6px] rounded-full bg-[#6B7280]" />
                                Cancelled
                              </span>
                            )}
                          </td>

                          {state.UsersList.customerdetails
                            ?.customerCurrentStatus !== "VACATED" && (
                              <td className={`${TABLE_BODY_CELL} text-left align-middle sticky right-0 z-[1] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] bg-white text-[#111928]`}>
                                <div className="flex flex-wrap gap-2 py-2">
                                  <div data-testid={`user-list-invoice-action-${view.invoiceId}`}
                                    className={`flex justify-center items-center relative cursor-pointer  
        ${activeId === view.id ? "z-[1000]" : ""}`}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleShowDots(view, e);
                                    }}
                                  >
                                    <IoMdMore className="text-xl text-[#111928]" />

                                    {activeId === view.invoiceId && (
                                      createPortal(
                                        <div
                                          ref={popupRef}
                                          className="font-gilroy fixed z-[9999] w-[170px] bg-[#F9F9F9] rounded-[10px] border"
                                          style={{
                                            top: popupPosition.top,
                                            left: popupPosition.left - 50,
                                          }}
                                        >
                                          <div className="flex flex-col gap-1 divide-y divide-gray-300 shrink-0">
                                            {view?.canEdit && (
                                              <button data-testid={`user-list-invoice-edit-btn-${view.invoiceId}`}
                                                onClick={() =>
                                                  canUpdateInvoice &&
                                                  handleEdit(view)
                                                }
                                                // disabled
                                                disabled={!canUpdateInvoice}
                                                className={`flex items-center gap-2 px-3 py-2   disabled:bg-gray-200 disabled:opacity-70 disabled:cursor-not-allowed
      ${canUpdateInvoice
                                                    ? "cursor-pointer hover:bg-[#EDF2FF]"
                                                    : "cursor-not-allowed opacity-50"
                                                  }`}
                                              >
                                                <Edit size="16" color="#1E45E1" />
                                                Edit
                                              </button>
                                            )}

                                            {view.canUnpaid && (
                                              <button data-testid={`user-list-invoice-unpaid-btn-${view.invoiceId}`}
                                                disabled={!canUpdateInvoice}
                                                onClick={() =>
                                                  canUpdateInvoice &&
                                                  handleUnpaid(view)
                                                }
                                                className={`flex items-center gap-2 w-full px-3 py-2 text-left 
        ${canUpdateInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
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
                                                <button data-testid={`user-list-invoice-make-discount-btn-${view.invoiceId}`}
                                                  disabled={!canUpdateInvoice}
                                                  onClick={() =>
                                                    canUpdateInvoice &&
                                                    handleMakeDiscount(view)
                                                  }
                                                  className={`flex items-center whitespace-nowrap gap-2 w-full px-3 py-2 text-left  
        ${canUpdateInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                                                >
                                                  <DiscountCircle
                                                    size="16"
                                                    color="#ec400c"
                                                  />
                                                  Make Discount
                                                </button>
                                              )}

                                            <button data-testid={`user-list-invoice-download-btn-${view.invoiceId}`}
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
                                                <button data-testid={`user-list-invoice-record-payment-btn-${view.invoiceId}`}
                                                  onClick={() => {
                                                    if (canWriteInvoice) {
                                                      handleRecordPayment(view);
                                                    }
                                                  }}
                                                  disabled={!canWriteInvoice}
                                                  className={`flex items-center shrink-0 whitespace-nowrap gap-2 px-3 py-2 
        ${canWriteInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                                                >
                                                  <ReceiptEdit
                                                    size="16"
                                                    color="#1E45E1" className="shrink-0"
                                                  />
                                                  Record Payment
                                                </button>
                                              )}

                                            {/* <div className="bg-gray-200 h-[1px] w-full rounded"></div> */}
                                            {view?.totalAmount < 0 &&
                                              view?.paymentStatus !== "Refunded" &&
                                              view?.paymentStatus !==
                                              "Cancelled" && (
                                                <button data-testid={`user-list-invoice-refund-amount-btn-${view.invoiceId}`}
                                                  onClick={() =>
                                                    canWriteInvoice &&
                                                    handleRefundAmount(view)
                                                  }
                                                  disabled={!canWriteInvoice}
                                                  className={`flex items-center whitespace-nowrap gap-2 px-3 py-2 
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
                                                <button data-testid={`user-list-invoice-delete-btn-${view.invoiceId}`} onClick={() => handleDeleteInvoice(view)}

                                                  className={`flex items-center gap-2 cursor-pointer w-full px-3 py-2 text-sm rounded-b-[10px]
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
                                        </div>,
                                        document.body,
                                      )
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
                          className={`${TABLE_BODY_CELL} text-center text-red-500`}
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
          <div className="mt-5">
            <NoDataMessage label="Invoice" isHeightChanged={true} />
          </div>
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

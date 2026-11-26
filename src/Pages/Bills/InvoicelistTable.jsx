/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

import Delete from "../../Assets/Images/Delete_red.png";
import Assign from "../../Assets/Images/MoneyAdd-Linear-32px.png";
import Download from "../../Assets/Images/New_images/download.png";
import PropTypes from "prop-types";
import WriteOffForm from "../../Pages/Bills/InvoiceWriteOff";
import { useHasPermission } from "../../Utils/Permission";
import { useDispatch, useSelector } from "react-redux";
import RefundAmount from "../Bills/RefundAmount";
import { useNavigate } from "react-router-dom";
import UnPaidInvoice from "./UnPaidInvoice";
import { DiscountCircle, ReceiptEdit } from "iconsax-react";
import DiscountInvoice from "../PDF/DiscountInvoice";
import { Edit, Link21 } from "iconsax-react";
import ApplyBookingModal from "../Bookings/ApplyInvoices";
import ApplyAdvance from "./ApplyAdvance";
import ApplyRetainerToInvoice from "./ApplyRetainerToInvoice";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

// Row background lives on the cells so the sticky Action column stays opaque.
const ROW_BG = "bg-white group-hover:bg-[#F8F9FF]";

// Status badge — soft background + dot, same as the Consolidated table.
const STATUS_BADGE = {
  Pending: { bg: "bg-[rgba(255,189,189,0.4)]", dot: "bg-[#EF4444]" },
  "Partial Payment": { bg: "bg-[rgba(255,237,202,0.6)]", dot: "bg-[#F59E0B]" },
  Paid: { bg: "bg-[rgba(179,229,187,0.3)]", dot: "bg-[#22C55E]" },
  Refunded: { bg: "bg-[#E7F1FF]", dot: "bg-[#3B82F6]" },
  "Partially Refunded": { bg: "bg-[#E7F1FF]", dot: "bg-[#3B82F6]" },
  "Pending Refund": { bg: "bg-[rgba(255,237,202,0.6)]", dot: "bg-[#F59E0B]" },
  Cancelled: { bg: "bg-[#E5E7EB]", dot: "bg-[#6B7280]" },
};

function StatusBadge({ status }) {
  const style = STATUS_BADGE[status] || STATUS_BADGE.Pending;
  return (
    <span
      className={`inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] ${style.bg}`}
    >
      <span className={`w-[6px] h-[6px] rounded-full ${style.dot}`} />
      {status}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

const InvoiceTable = (props) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDots, setShowDots] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [applyInvoice, setApplyInvoice] = useState(false);
  const [applyAdvance, setApplyAdvance] = useState(false);
  const [applyRetainer, setApplyRetainer] = useState(false);
  const [WriteoffForm, setWriteOffForm] = useState(false);
  const [payapleform, setPayableForm] = useState(false);
  const [refundDetails, setRefundDetails] = useState("");
  const [applyRetainerDetails, setApplyRetainerDetails] = useState("");
  const popupRef = useRef(null);
  const [navigation, setNavigation] = useState(false);
  const [showUnpaidModal, setShowUnpaidModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [showDiscountInvoice, setShowDiscountInvoice] = useState(false);
  const [discountDetails, setDiscountDetails] = useState("");
  const [showAbove, setShowAbove] = useState(false);
  const [advanceDetails, setAdvanceDetails] = useState("");

  // const invoiceFilters = state.InvoiceList.invoiceFilters;

  const [label, setLabel] = useState("");
  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Invoice");




  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;
  const isExportAllow = isValidSubscription && canReadInvoice;

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;
      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

  const handleShowDots = (event) => {
    setShowDots(!showDots);

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleShowform = (props) => {
    props.OnHandleshowform(props);
    setShowDots(false);
  };

  const handleEdit = (props) => {
    props.OnHandleshowEditform(props.item);
    setShowDots(false);
  };

  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item);
    setShowDots(false);
  };

  const handleBillDelete = (props) => {
    props.OnHandleshowDeleteform(props);
    setShowDots(false);
  };

  // const handleWriteOffFrom = () => {
  //   setWriteOffForm(true);
  //   setPayableForm(false);
  // };
  const handleCloseWriteOffForm = () => {
    setWriteOffForm(false);
  };
  const handleRefundAmount = (details) => {
    setShowDots(false);
    setRefundDetails(details.item);
    setPayableForm(true);
  };
  const handleCloseRefundAmount = () => {
    setPayableForm(false);
  };

  useEffect(() => {
    if (state.InvoiceList.createRefundStatusCode === 200) {
      setPayableForm(false);
      // dispatch({
      //   type: "INVOICESLISTFILTER",
      //   payload: { hostelId: state.login.selectedHostel_Id },
      // });

      dispatch({ type: "REMOVE_CREATE_REFUND" });
    }
  }, [state.InvoiceList.createRefundStatusCode]);

  useEffect(() => {
    if (!showDots) return undefined;
    const close = () => setShowDots(false);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [showDots]);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleNavigatePDF = (item) => {
    if (item) {
      // dispatch({
      //   type: "GETPARTICULARBILLSDETAILS",
      //   payload: { hostelId: item.hostelId, invoiceId: item.invoiceId },
      // });

      // const previousFilters = state.InvoiceList.invoiceFilters || {};

      // const filters = {
      //   startDate: previousFilters.startDate,
      //   endDate: previousFilters.endDate,
      //   type: previousFilters.type,
      //   createdBy: previousFilters.createdBy,
      //   createdByLabels: previousFilters.createdByLabels,
      //   modes: previousFilters.modes,
      //   paymentStatus: previousFilters.paymentStatus || [],
      //   search: previousFilters.search,
      //   size: previousFilters?.size,
      //   page: previousFilters?.page,
      // };

      // dispatch({
      //   type: "ALL_BILLS_LIST_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     filters: filters,
      //   },
      // });

      navigate(`/invoice/details/${item.invoiceId}`, {
        replace: false,
        state: {
          rowData: item,
          ts: Date.now(),
        },
      });
    }
  };

  const handleNavigateTenantProfile = (view) => {
    if (view) {
      setNavigation(true);

      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: view.customerId },
      });
    }
  };

  useEffect(() => {
    if (state.UsersList?.CustomerdetailsgetStatuscode === 200 && navigation) {
      const customerId = state.UsersList?.customerdetails?.customerId;

      const isVacated =
        state.UsersList?.customerdetails?.customerCurrentStatus === "VACATED";

      if (isVacated) {
        navigate(`/tenant/checkout/details/${customerId}`, {
          state: { isBillWay: true },
        });
      } else {
        navigate(`/tenant/details/${customerId}`, {
          state: {
            customerId,
            IsOverView: true,
            totriggerBillTap: false,
            isBillWay: true,
          },
        });
      }

      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 500);
    }
  }, [state.UsersList?.CustomerdetailsgetStatuscode, navigation]);

  // const handleApplyInvoices = (item) => {
  //   setApplyInvoice(true);
  //   setAdvanceDetails(item);
  //   setShowDots(false);
  // };
  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
  };

  const handleBookingApplyRedeem = (item) => {
    setApplyAdvance(true);
    setAdvanceDetails(item);
    setShowDots(false);
    setLabel("Advance");
  };

  const handleCloseBookingApplyRedeem = () => {
    setApplyAdvance(false);
  };

  const handleAdjustWithRetainer = (item) => {
    setApplyRetainer(true);
    setShowDots(false);
    setApplyRetainerDetails(item);
  };

  const handleCloseAdjustWithRetainer = () => {
    setApplyRetainer(false);
  };

  const handleUnpaid = (item) => {
    setShowDots(false);
    setSelectedInvoice(item);
    setShowUnpaidModal(true);
  };

  const handleMakeDiscount = (item) => {
    setDiscountDetails(item);
    setShowDiscountInvoice(true);
    setShowDots(false);
  };
  const handleCloseFormDiscount = () => {
    setShowDiscountInvoice(false);
  };

  const handleCloseUnPaid = () => {
    setShowUnpaidModal(false);
  };

  useEffect(() => {
    if (state.InvoiceList?.makeInvoiceDiscountStatus === 200) {
      setShowDiscountInvoice(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_INVOICE_DISCOUNT_REDUCER" });
      });
    }
  }, [state.InvoiceList?.makeInvoiceDiscountStatus]);

  return (
    <>
      <tr key={props.item.invoiceId} className="group">
        <td
          className={`${TABLE_BODY_CELL} ${ROW_BG} text-left font-semibold text-[#1E45E1] cursor-pointer`}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              handleNavigatePDF(props.item);
              setNavigation(false);
            }}
            className="Invoice_Name hover:underline"
          >
            {props.item?.invoiceNumber === null ||
              props.item?.invoiceNumber === ""
              ? "0.00"
              : props.item?.invoiceNumber}
          </div>
        </td>

        <td className={`${TABLE_BODY_CELL} ${ROW_BG} relative text-left text-[#111928]`}>
          <div
            className="flex items-center gap-[13px] cursor-pointer w-fit group/name"
            onClick={(e) => {
              e.stopPropagation();
              handleNavigateTenantProfile(props.item);
            }}
          >
            {props.item?.profilePic ? (
              <img
                src={props.item.profilePic}
                alt="profile"
                className="w-[30px] h-[30px] rounded-full object-cover flex-shrink-0"
              />
            ) : (
              <div className="w-[30px] h-[30px] rounded-full bg-slate-200 text-[#44536A] flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                {props.item?.initials || "-"}
              </div>
            )}

            <span className="truncate max-w-[160px] font-semibold text-[#111928] hover:underline">
              {props.item?.fullName}
            </span>
            <span
              className="absolute hidden group-hover/name:block left-[200px] mt-1
      bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap
      z-50"
            >
              {props.item?.fullName}
            </span>
          </div>
        </td>

        <td className={`${TABLE_BODY_CELL} ${ROW_BG} relative text-left text-[#111928]`}>
          <div className="flex items-center gap-2 group/type w-fit">
            <span className="truncate max-w-[150px] font-medium text-[#111928]">
              {props.item.invoiceType}
            </span>

            {props.item.invoiceMode === "Manual" && (
              <ReceiptEdit size="14" className="text-[#314158]" />
            )}

            <span
              className="absolute hidden group-hover/type:block left-0 top-full -mt-2
      bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap
      z-50"
            >
              {props.item.invoiceMode}
            </span>
          </div>
        </td>

        <td className={`${TABLE_BODY_CELL} ${ROW_BG} text-left text-[#314158]`}>
          {props.item?.invoiceDate}
        </td>

        <td className={`${TABLE_BODY_CELL} ${ROW_BG} text-left text-[#314158]`}>
          {props.item?.dueDate}
        </td>

        <td className={`${TABLE_BODY_CELL} ${ROW_BG} text-right text-[#111928]`}>
          <div className="flex flex-col items-end">
            <span className="font-medium text-[#111928]">
              ₹{Number(props.item?.invoiceAmount || 0).toLocaleString("en-IN")}
            </span>

            {props.item.isDiscounted && (
              <span className="text-[12px] leading-[16px] text-[#62748E]">
                Discount ₹
                {Number(props.item?.discountAmount || 0).toLocaleString("en-IN")}
              </span>
            )}

            {props.item.isInvoicesApplied && (
              <span className="text-[12px] leading-[16px] text-[#62748E]">
                Adjusted ₹
                {Number(
                  props.item?.invoicesApplied?.amountApplied || 0,
                ).toLocaleString("en-IN")}
              </span>
            )}
          </div>
        </td>

        <td className={`${TABLE_BODY_CELL} ${ROW_BG} text-right font-bold text-[#111928]`}>
          ₹{Number(props.item?.dueAmount || 0).toLocaleString("en-IN")}
        </td>

        <td className={`${TABLE_BODY_CELL} ${ROW_BG} text-left text-[#111928]`}>
          <div className="flex items-center gap-2">
            {STATUS_BADGE[props.item?.paymentStatus] && (
              <StatusBadge status={props.item.paymentStatus} />
            )}
            {/* {props.item?.isCancelled && <StatusBadge status="Cancelled" />} */}
          </div>
        </td>

        <td
          className={`${TABLE_BODY_CELL} ${ROW_BG} sticky right-0 z-[1] text-center border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] text-[#111928]`}
        >
          <div className="w-full flex justify-center">
            <div className={`cursor-pointer flex justify-center items-center relative w-[34px] h-[34px] rounded-[12px] border-[1px] ${showDots ? "border-[#1E45E1] bg-[#EFF6FF]" : "border-[#E2E8F0] bg-white hover:bg-[#F1F5FF]"}`}>
              <PiDotsThreeOutlineVerticalFill
                className={`h-4 w-4 rotate-90 ${showDots ? "text-[#1E45E1]" : "text-[#4A5565]"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowDots(e);
                  setNavigation(false);
                }}
              />

              {showDots && createPortal(
                <div
                  ref={popupRef}
                  className="fixed max-w-[250px] bg-[#F9F9F9] border border-[#EBEBEB] rounded-[10px] flex flex-col z-[3000] font-gilroy shadow-[0px_8px_24px_rgba(0,0,0,0.12)]"
                  style={{
                    top: Math.max(
                      8,
                      showAbove
                        ? popupPosition.top -
                        (popupRef.current?.offsetHeight || 100) -
                        20
                        : popupPosition.top - 35,
                    ),
                    left: Math.max(8, popupPosition.left),
                  }}
                >
                  {props.item.canEdit && (
                    <button
                      type="button"
                      onClick={() => canUpdateInvoice && handleEdit(props)}
                      disabled={!canUpdateInvoice}
                      // disabled
                      className={`w-full disabled:bg-gray-200 disabled:opacity-70  disabled:cursor-not-allowed
                        flex items-center gap-2 px-3 py-2 rounded-t-[10px] border-b border-[#EBEBEB]
    ${canUpdateInvoice
                          ? "cursor-pointer hover:bg-[#EDF2FF]"
                          : "cursor-not-allowed opacity-50"
                        }`}
                    >
                      <Edit
                        size="16"
                        color={canUpdateInvoice ? "#1E45E1" : "#A9A9A9"}
                        variant="Linear"
                      />

                      <span className="text-sm font-medium text-[#222] disabled:text-[#A9A9A9] ">
                        Edit
                      </span>
                    </button>
                  )}

                  {props.item.canRedeem ? (
                    <button
                      disabled={!canUpdateInvoice}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleBookingApplyRedeem(props.item);
                      }}
                      className={`flex items-center whitespace-nowrap gap-2 px-3 py-2 border-b border-[#EBEBEB] rounded-[10px] transition-all duration-150
    ${!canUpdateInvoice
                          ? "cursor-not-allowed opacity-50 bg-gray-100"
                          : "cursor-pointer hover:bg-[#EDF2FF]"
                        }`}
                    >
                      <Link21
                        className="flex-shrink-0"
                        color={!canUpdateInvoice ? "#A9A9A9" : "#1E45E1"}
                        size="16"
                      />

                      <span
                        className={`text-sm font-medium ${!canUpdateInvoice
                          ? "text-[#A9A9A9]"
                          : "text-[#222222]"
                          }`}
                      >
                        Apply to Invoices
                      </span>
                    </button>
                  ) : (
                    <>
                      {/* <button
                        disabled={
                          !canUpdateInvoice || !props.item?.canApplyFromAdvance
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyInvoices(props.item);
                        }}
                        className={`flex items-center whitespace-nowrap gap-2 px-3 py-2 border-b border-[#EBEBEB] rounded-[10px] transition-all duration-150
    ${
      !canUpdateInvoice || !props.item?.canApplyFromAdvance
        ? "cursor-not-allowed opacity-50 bg-gray-100"
        : "cursor-pointer hover:bg-[#EDF2FF]"
    }`}
                      >
                        <Link21
                          className="flex-shrink-0"
                          color={
                            !canUpdateInvoice ||
                            !props.item?.canApplyFromAdvance
                              ? "#A9A9A9"
                              : "#1E45E1"
                          }
                          size="16"
                        />

                        <span
                          className={`text-sm font-medium ${
                            !canUpdateInvoice ||
                            !props.item?.canApplyFromAdvance
                              ? "text-[#A9A9A9]"
                              : "text-[#222222]"
                          }`}
                        >
                          Adjust with Advance
                        </span>
                      </button> */}

                      <button
                        disabled={
                          !canUpdateInvoice || !props.item?.canApplyFromAdvance
                        }
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAdjustWithRetainer(props.item);
                        }}
                        className={`flex items-center whitespace-nowrap gap-2 px-3 py-2 border-b border-[#EBEBEB] rounded-[10px] transition-all duration-150
    ${!canUpdateInvoice || !props.item?.canApplyFromAdvance
                            ? "cursor-not-allowed opacity-50 bg-gray-100"
                            : "cursor-pointer hover:bg-[#EDF2FF]"
                          }`}
                      >
                        <Link21
                          className="flex-shrink-0"
                          color={
                            !canUpdateInvoice ||
                              !props.item?.canApplyFromAdvance
                              ? "#A9A9A9"
                              : "#1E45E1"
                          }
                          size="16"
                        />

                        <span
                          className={`text-sm font-medium ${!canUpdateInvoice ||
                            !props.item?.canApplyFromAdvance
                            ? "text-[#A9A9A9]"
                            : "text-[#222222]"
                            }`}
                        >
                          Adjust with Retainer
                        </span>
                      </button>
                    </>
                  )}

                  {/* <button
                    disabled={!canUpdateInvoice || !props.item.canRedeem}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyInvoices(props.item);
                    }}
                    className={`flex items-center whitespace-nowrap gap-2 px-3 py-2 border-b border-[#EBEBEB] rounded-[10px] transition-all duration-150
    ${
      !canUpdateInvoice || !props.item.canRedeem
        ? "cursor-not-allowed opacity-50 bg-gray-100"
        : "cursor-pointer hover:bg-[#EDF2FF]"
    }`}
                  >
                    <Link21
                      className="flex-shrink-0"
                      color={
                        !canUpdateInvoice || !props.item.canRedeem
                          ? "#A9A9A9"
                          : "#1E45E1"
                      }
                      size="16"
                    />

                    <span
                      className={`text-sm font-medium ${
                        !canUpdateInvoice || !props.item.canRedeem
                          ? "text-[#A9A9A9]"
                          : "text-[#222222]"
                      }`}
                    >
                      {props.item?.canApplyFromAdvance
                        ? "Adjust with Advance"
                        : "Apply to Invoice"}
                    </span>
                  </button> */}

                  {props.item.canUnpaid && (
                    <button
                      disabled={!canUpdateInvoice}
                      onClick={() =>
                        canUpdateInvoice && handleUnpaid(props.item)
                      }
                      className={`flex items-center gap-2 w-full px-3 py-2 text-left border-b border-[#EBEBEB]
        ${canUpdateInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                    >
                      <Edit
                        size="16"
                        color={canUpdateInvoice ? "#1E45E1" : "#A9A9A9"}
                        variant="Linear"
                      />
                      <span className="text-sm font-medium text-[#222]">
                        Unpaid
                      </span>
                    </button>
                  )}

                  {props.item?.invoiceAmount > 0 &&
                    props.item?.paymentStatus === "Pending" &&
                    !props.item?.isDiscounted &&
                    (props.item?.invoiceType === "Rent" ||
                      props.item?.invoiceType === "Settlement" ||
                      props.item?.invoiceType === "Reassign-Rent") && (
                      <button
                        disabled={!canUpdateInvoice}
                        onClick={() =>
                          canUpdateInvoice && handleMakeDiscount(props.item)
                        }
                        className={`flex items-center gap-2 w-full px-3 py-2 text-left border-b border-[#EBEBEB]
        ${canUpdateInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                      >
                        <DiscountCircle size="16" color="#ec400c" />
                        <span className="text-sm font-medium text-[#222]">
                          Make Discount
                        </span>
                      </button>
                    )}

                  <div
                    onClick={() =>
                      isExportAllow && handleInvoicepdf(props.item)
                    }
                    className={`flex items-center gap-2 px-3 py-2 border-b border-[#EBEBEB]
      ${isExportAllow ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                  >
                    <img src={Download} alt="Download" className="h-4 w-4" />
                    <span className="text-sm font-medium text-[#222]">
                      Download
                    </span>
                  </div>

                  {props.item.dueAmount !== 0 &&
                    props.item?.invoiceAmount > 0 &&
                    props.item?.paymentStatus !== "Cancelled" &&
                    props.item?.paymentStatus !== "Paid" && (
                      <div
                        onClick={() => canWriteInvoice && handleShowform(props)}
                        className={`flex items-center gap-2 px-3 py-2 border-b border-[#EBEBEB]
        ${canWriteInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                      >
                        <img
                          src={Assign}
                          alt="Record"
                          className={`h-4 w-4 ${!canWriteInvoice && "grayscale"}`}
                        />
                        <span className="text-sm font-medium text-[#222]">
                          Record Payment
                        </span>
                      </div>
                    )}

                  {props.item?.invoiceAmount < 0 &&
                    props.item?.paymentStatus !== "Refunded" &&
                    props.item?.paymentStatus !== "Cancelled" && (
                      <div
                        onClick={() =>
                          canWriteInvoice && handleRefundAmount(props)
                        }
                        className={`flex items-center gap-2 px-3 py-2 border-b border-[#EBEBEB]
        ${canWriteInvoice ? "cursor-pointer hover:bg-[#EDF2FF]" : "cursor-not-allowed opacity-50"}`}
                      >
                        <img
                          src={Assign}
                          alt="Refund"
                          className={`h-4 w-4 ${!canWriteInvoice && "grayscale"}`}
                        />
                        <span className="text-sm font-medium text-[#222]">
                          Refund Amount
                        </span>
                      </div>
                    )}

                  {props.item?.paymentStatus !== "Cancelled" &&
                    props.item?.paymentStatus !== "Paid" && (
                      <div
                        onClick={() =>
                          canDeleteInvoice && handleBillDelete(props)
                        }
                        className={`flex items-center gap-2 px-3 py-2 rounded-b-[10px] border-b border-[#EBEBEB]
        ${canDeleteInvoice ? "cursor-pointer hover:bg-[#FFF0F0]" : "cursor-not-allowed opacity-50"}`}
                      >
                        <img
                          src={Delete}
                          alt="Delete"
                          className={`h-4 w-4 ${!canDeleteInvoice && "grayscale"}`}
                        />
                        <span className="text-sm font-medium text-[#FF0000]">
                          Delete
                        </span>
                      </div>
                    )}
                </div>,
                document.body,
              )}
            </div>
          </div>
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>
      </tr>

      {applyRetainer && (
        <ApplyRetainerToInvoice
          show={applyRetainer}
          handleClose={handleCloseAdjustWithRetainer}
          retainerDetails={applyRetainerDetails}
        />
      )}

      {showDiscountInvoice && (
        <DiscountInvoice
          show={showDiscountInvoice}
          handleClose={handleCloseFormDiscount}
          discountDetails={discountDetails}
        />
      )}

      {applyAdvance && (
        <ApplyBookingModal
          show={applyAdvance}
          handleClose={handleCloseBookingApplyRedeem}
          advanceDetails={advanceDetails}
          label={label}
        />
      )}

      {applyInvoice && (
        <ApplyAdvance
          label={""}
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
          advanceDetails={advanceDetails}
        />
      )}

      {WriteoffForm && (
        <WriteOffForm
          WriteoffForm={WriteoffForm}
          handleCloseWriteOffForm={handleCloseWriteOffForm}
          handleCloseRefundAmount={handleCloseRefundAmount}
        />
      )}

      {payapleform && (
        <RefundAmount
          show={payapleform}
          handleClose={handleCloseRefundAmount}
          refundDetails={refundDetails}
        />
      )}

      {showUnpaidModal && (
        <UnPaidInvoice
          show={showUnpaidModal}
          handleClose={handleCloseUnPaid}
          selectedInvoice={selectedInvoice}
        />
      )}
    </>
  );
};
InvoiceTable.propTypes = {
  item: PropTypes.func.isRequired,
  billEditPermission: PropTypes.func.isRequired,
  billAddPermission: PropTypes.func.isRequired,
  OnHandleshowform: PropTypes.func.isRequired,
  billDeletePermission: PropTypes.func.isRequired,
  OnHandleshowEditform: PropTypes.func.isRequired,
  OnHandleshowDeleteform: PropTypes.func.isRequired,
  OnHandleshowInvoicePdf: PropTypes.func.isRequired,
  DisplayInvoice: PropTypes.func.isRequired,
};
export default InvoiceTable;

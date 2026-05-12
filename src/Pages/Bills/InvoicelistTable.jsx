/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
// import Edit from "../../Assets/Images/Edit-blue.png";
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

const InvoiceTable = (props) => {
  const { item, selectedRows, handleRowSelect } = props;
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDots, setShowDots] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [applyInvoice, setApplyInvoice] = useState(false);
  const [WriteoffForm, setWriteOffForm] = useState(false);
  const [payapleform, setPayableForm] = useState(false);
  const [refundDetails, setRefundDetails] = useState("");
  const popupRef = useRef(null);
  const [showUnpaidModal, setShowUnpaidModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showDiscountInvoice, setShowDiscountInvoice] = useState(false);
  const [discountDetails, setDiscountDetails] = useState("");
  const [showAbove, setShowAbove] = useState(false);
  const [advanceDetails, setAdvanceDetails] = useState("");
  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
  } = useHasPermission("Bills");

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

  const handleWriteOffFrom = () => {
    setWriteOffForm(true);
    setPayableForm(false);
  };
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
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_CREATE_REFUND" });
      }, 100);
    }
  }, [state.InvoiceList.createRefundStatusCode]);

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
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: { hostelId: item.hostelId, invoiceId: item.invoiceId },
      });
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
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: view.customerId },
      });
      navigate(`/tenant/details/${view.customerId}`, {
        state: {
          customerId: view.customerId,
          IsOverView: true,
          totriggerBillTap: false,
          isBillWay: true,
        },
      });
    }
  };

  const handleApplyInvoices = (item) => {
    setApplyInvoice(true);
    setAdvanceDetails(item);
    setShowDots(false);
  };
  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
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

    dispatch({
      type: "GETPARTICULARBILLSDETAILS",
      payload: {
        hostelId: item?.hostelId,
        invoiceId: item?.invoiceId,
      },
    });
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
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_INVOICE_DISCOUNT_REDUCER" });
      });
    }
  }, [state.InvoiceList?.makeInvoiceDiscountStatus]);

  return (
    <>
      <tr
        key={props.item.invoiceId}
        className={`text-sm font-gilroy border-b border-[#E8E8E8] hover:bg-gray-50
   `}
      >
        <td
          className={`px-4 py-1   w-[80px]    ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle"
          }`}
        >
          <div className="flex items-center justify-end">
            <input
              type="checkbox"
              className="rounded cursor-pointer"
              checked={selectedRows.includes(item.invoiceId)}
              onClick={(e) => e.stopPropagation()}
              onChange={() => handleRowSelect(item.invoiceId)}
            />
          </div>
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>
        <td
          className={`w-[230px]    px-2 py-1 whitespace-nowrap text-[#1E45E1] font-semibold cursor-pointer
             ${
               props.item.isDiscounted || props.item.isInvoicesApplied
                 ? ""
                 : "align-middle "
             }`}
        >
          <div
            onClick={() => handleNavigatePDF(props.item)}
            className="Invoice_Name"
          >
            {props.item?.invoiceNumber === null ||
            props.item?.invoiceNumber === ""
              ? "0.00"
              : props.item?.invoiceNumber}
          </div>
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>

        <td
          className={`w-[250px]  px-2 py-1 relative ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle "
          }`}
        >
          <div
            className={`flex items-center gap-2 cursor-pointer w-fit group `}
            onClick={() => handleNavigateTenantProfile(props.item)}
          >
            {props.item?.profilePic ? (
              <img
                src={props.item.profilePic}
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-[#44536A]">
                {props.item?.initials || "-"}
              </div>
            )}

            <div className="truncate w-[120px] text-[#1E45E1] hover:underline  ">
              {props.item?.fullName}
            </div>
            <span
              className="absolute hidden group-hover:block left-full left-[140px] mt-1
      bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap 
      z-50"
            >
              {props.item?.fullName}
            </span>
          </div>
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>

        <td
          className={`w-[230px]    px-2 py-1 relative  ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle "
          }`}
        >
          <div className="flex items-center gap-2 group w-fit">
            <span className="truncate max-w-[150px]">
              {props.item.invoiceType}
            </span>

            {props.item.invoiceMode === "Manual" &&
              props.item.invoiceType === "Rent" && (
                <ReceiptEdit size="14" className="text-gray-500" />
              )}

            <span
              className="absolute hidden group-hover:block left-full left-0 mt-1
      bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap 
      z-50 "
            >
              {props.item.invoiceMode}
            </span>
          </div>
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>

        <td
          className={`w-[230px]    px-2 py-1 whitespace-nowrap  ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle"
          }`}
        >
          {props.item?.invoiceDate}
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>

        <td
          className={`w-[230px] px-2 py-1 whitespace-nowrap  ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle"
          }`}
        >
          {props.item?.dueDate}{" "}
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>

        <td
          className={`w-[230px] px-2 py-1 relative align-middle whitespace-nowrap ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle "
          }`}
        >
          <div className="relative inline-block">
            <span className="leading-5">
              ₹{Number(props.item?.invoiceAmount || 0).toLocaleString("en-IN")}
            </span>

            {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
              <div className=" flex flex-col text-[10px] text-[#64748B] leading-3 min-w-max h-4">
                {props.item.isDiscounted && (
                  <span>
                    Discount Applied : ₹
                    <span className="text-[11px] font-semibold">
                      {Number(props.item?.discountAmount || 0).toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </span>
                )}

                {props.item.isInvoicesApplied && (
                  <span className="">
                    Adjusted Amount : ₹
                    <span className="text-[11px] font-semibold">
                      {Number(
                        props.item?.invoicesApplied?.amountApplied || 0,
                      ).toLocaleString("en-IN")}
                    </span>
                  </span>
                )}
              </div>
            )}
          </div>
        </td>

        <td
          className={`w-[230px]  px-2 py-1 whitespace-nowrap  ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle "
          }`}
        >
          ₹{Number(props.item?.dueAmount || 0).toLocaleString("en-IN")}
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>

        <td
          className={`w-[270px] px-2 py-1 whitespace-nowrap overflow-hidden  ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle "
          }`}
        >
          {(props.item?.paymentStatus === "Pending" ||
            props.item?.paymentStatus === "Partial Payment") && (
            <span className="inline-flex items-center gap-2 bg-[#FFD9D9] rounded-[13px] px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              {props.item?.paymentStatus}
            </span>
          )}

          {props.item?.paymentStatus === "Paid" && (
            <span className="inline-flex items-center gap-2 cursor-pointer bg-green-100 rounded-[14px] px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-green-600"></span>
              {props.item?.paymentStatus}
            </span>
          )}

          {(props.item?.paymentStatus === "Refunded" ||
            props.item?.paymentStatus === "Partially Refunded") && (
            <span className="inline-flex items-center gap-2 bg-[#FFF3CD] rounded-[14px] px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              {props.item?.paymentStatus}
            </span>
          )}

          {props.item?.paymentStatus === "Pending Refund" && (
            <span className="inline-flex items-center gap-2 bg-[#FFE6B3] rounded-[14px] px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-orange-500"></span>
              {props.item?.paymentStatus}
            </span>
          )}

          {props.item?.isCancelled && (
            <span className="inline-flex items-center gap-2 bg-[#FFE6B3] rounded-[14px] px-3 py-1 text-xs">
              <span className="w-2 h-2 rounded-full bg-gray-500"></span>
              Cancelled
            </span>
          )}
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>

        <td
          className={`w-[230px] py-1   px-2  ${
            props.item.isDiscounted || props.item.isInvoicesApplied
              ? ""
              : "align-middle "
          }`}
        >
          <div className="w-full flex justify-start">
            <div className="cursor-pointer flex justify-center items-center relative">
              <PiDotsThreeOutlineVerticalFill
                className={`h-5 w-5 rotate-90 ${showDots ? "text-[#1E45E1]" : "text-gray-500"}`}
                onClick={(e) => handleShowDots(e)}
              />

              {showDots && (
                <div
                  ref={popupRef}
                  className="fixed w-[170px] bg-[#F9F9F9] border border-[#EBEBEB] rounded-[10px] flex flex-col z-[3000]"
                  style={{
                    top: showAbove
                      ? popupPosition.top -
                        (popupRef.current?.offsetHeight || 100) -
                        20
                      : popupPosition.top - 35,
                    left: popupPosition.left,
                  }}
                >
                  {props.item.canEdit && (
                    <div
                      onClick={() => canUpdateInvoice && handleEdit(props)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-t-[10px] border-b border-[#EBEBEB]
      ${
        canUpdateInvoice
          ? "cursor-pointer hover:bg-[#EDF2FF]"
          : "cursor-not-allowed opacity-50"
      }`}
                    >
                      <Edit
                        size="16"
                        color={canUpdateInvoice ? "#1E45E1" : "#A9A9A9"}
                        variant="Linear"
                      />

                      <span className="text-sm font-medium text-[#222]">
                        Edit
                      </span>
                    </div>
                  )}

                  <button
                    disabled={!canUpdateInvoice || !props.item.canRedeem}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApplyInvoices(props.item);
                    }}
                    className={`flex items-center gap-2 px-3 py-2 border-b border-[#EBEBEB] rounded-[10px] transition-all duration-150
      ${
        !canUpdateInvoice || !props.item.canRedeem
          ? "cursor-not-allowed opacity-50 bg-gray-100"
          : "cursor-pointer hover:bg-[#EDF2FF]"
      }`}
                  >
                    <Link21
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
                      Apply Invoices
                    </span>
                  </button>

                  {props.item.invoiceMode === "Manual" &&
                    props.item?.paymentStatus === "Paid" &&
                    props.item.invoiceType === "Rent" && (
                      <button
                        disabled={!canWriteInvoice}
                        onClick={() =>
                          canWriteInvoice && handleUnpaid(props.item)
                        }
                        className={`flex items-center gap-2 w-full px-3 py-2 text-left border-b border-[#EBEBEB]
        ${canWriteInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
                      >
                        <Edit
                          size="16"
                          color={canWriteInvoice ? "#1E45E1" : "#A9A9A9"}
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
                        disabled={!canWriteInvoice}
                        onClick={() =>
                          canWriteInvoice && handleMakeDiscount(props.item)
                        }
                        className={`flex items-center gap-2 w-full px-3 py-2 text-left border-b border-[#EBEBEB]
        ${canWriteInvoice ? "hover:bg-[#EDF2FF] cursor-pointer" : "cursor-not-allowed opacity-50"}`}
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
                </div>
              )}
            </div>
          </div>
          {(props.item.isDiscounted || props.item.isInvoicesApplied) && (
            <div className="h-4"></div>
          )}
        </td>
      </tr>

      {showDiscountInvoice && (
        <DiscountInvoice
          show={showDiscountInvoice}
          handleClose={handleCloseFormDiscount}
          discountDetails={discountDetails}
        />
      )}
      {applyInvoice && (
        <ApplyAdvance
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

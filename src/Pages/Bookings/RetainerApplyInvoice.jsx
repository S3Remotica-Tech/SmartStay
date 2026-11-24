/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ArrowRight } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  fieldClass,
} from "../../Utils/FieldStyles";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function RetainerApplyInvoice({ show, handleClose, advanceDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [applyAmountForInvoice, setApplyAmountForInvoice] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [showRetainerBreakdown, setShowRetainerBreakdown] = useState(false);

  useEffect(() => {
    setShowRetainerBreakdown(false);
  }, []);

  const handleApplyAmountChange = (index, value) => {
    dispatch({ type: "REMOVE_ERROR_APPLY_INVOICE" });
    setError("");

    const invoice = initializeDetails.listInvoices[index];
    const invoiceId = invoice.invoiceId;

    if (value === "") {
      const updated = applyAmountForInvoice.filter(
        (item) => item.invoiceId !== invoiceId,
      );
      setApplyAmountForInvoice(updated);
      return;
    }

    if (!/^\d+$/.test(value)) {
      setError("Only numbers are allowed");
      return;
    }
    let amount = Number(value);
    if (amount > Number(invoice.pendingAmount)) {
      setError("Cannot exceed invoice balance");
      amount = Number(invoice.pendingAmount);
    }
    const otherApplied = applyAmountForInvoice.reduce(
      (sum, item) =>
        item.invoiceId !== invoiceId ? sum + Number(item.amount || 0) : sum,
      0,
    );

    if (amount + Number(otherApplied) > bookingAmount) {
      setError("Total exceeds retainer  amount");
      amount = bookingAmount - otherApplied;
    }

    let updated = [...applyAmountForInvoice];

    const existingIndex = updated.findIndex(
      (item) => item.invoiceId === invoiceId,
    );

    if (existingIndex > -1) {
      updated[existingIndex] = {
        invoiceId: invoiceId,
        amount: amount,
      };
    } else {
      updated.push({
        invoiceId: invoiceId,
        amount: amount,
      });
    }

    setApplyAmountForInvoice(
      updated.filter((item) => item.invoiceId && item.amount >= 0),
    );
  };

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    dispatch({
      type: "REDEEM_ADVANCE_INITIALIZE_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        advanceInvoiceId: advanceDetails?.invoiceId,
      },
    });
  }, [state.login.selectedHostel_Id]);

  const initializeDetails = state?.Booking?.initializeRedeem;

  const bookingAmount = Number(
    initializeDetails?.advanceInfo?.advanceBalanceAmount || 0,
  );

  const totalApplied = applyAmountForInvoice.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );
  const remainingBalance = bookingAmount - totalApplied;

  const handleApplySubmit = () => {
    dispatch({ type: "REMOVE_ERROR_APPLY_INVOICE" });

    let validationError = "";

    if (totalApplied === 0) {
      validationError = "Please enter at least one amount";
    } else if (totalApplied > bookingAmount) {
      validationError = "Applied amount exceeds booking amount";
    }

    setError(validationError);

    if (validationError) return;

    dispatch({
      type: "APPLY_INVOICE_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        invoiceId: advanceDetails?.invoiceId,
        listItems: applyAmountForInvoice,
      },
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (state?.Booking?.applyinvoiceSuccessCode === 201) {
      setFormLoading(false);
      handleClose();
    }
  }, [state?.Booking?.applyinvoiceSuccessCode]);

  useEffect(() => {
    return () => {
      setError("");
      dispatch({ type: "REMOVE_ERROR_APPLY_INVOICE" });
    };
  }, []);

  useEffect(() => {
    if (state?.Booking?.applyRedeemError || state.createAccount?.networkError) {
      setFormLoading(false);
      dispatch({ type: "CLEAR_NETWORK_ERROR" });
    }
  }, [state?.Booking?.applyRedeemError, state.createAccount?.networkError]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/40 px-3 md:px-8">
      <div
        className="
    bg-white
    w-full
    max-w-[850px]
    h-[98vh]
    max-h-[700px]
    rounded-xl
    shadow-lg
    font-gilroy
    animate-fadeIn
    relative
    flex
    flex-col
  "
      >
        <div className="flex justify-between items-center p-3 border-b shrink-0">
          <h5 className="font-semibold text-lg text-black">
            Apply Retainer to Invoice
          </h5>

          <button
            onClick={handleClose}
            className="text-red-500 text-lg font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-3 flex-1 overflow-y-auto show-scrolls">
          <div className="bg-[#F7F8FCA8] p-4 rounded-xl mb-5">
            <div className="flex justify-between items-start">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-full bg-[#E2E8F0] flex items-center justify-center font-semibold text-gray-700">
                  {initializeDetails?.customerInfo?.profilePic ? (
                    <img
                      src={initializeDetails.customerInfo.profilePic}
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    initializeDetails?.customerInfo?.initials || "NA"
                  )}
                </div>

                <div>
                  <div className="font-semibold text-lg">
                    {initializeDetails?.customerInfo?.fullName}
                  </div>

                  <div className="flex gap-2 mt-1">
                    <span className="bg-[#FFF3D6] px-3 py-1 rounded-full text-[10px]">
                      {initializeDetails?.customerInfo?.floorName}
                    </span>

                    <span className="bg-[#FFE4DD] px-3 py-1 rounded-full text-[10px]">
                      {initializeDetails?.customerInfo?.roomName} -
                      {initializeDetails?.customerInfo?.bedName}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-gray-500">
                  Retainer Amount of{" "}
                  <span className=" text-[#007AFF]">
                    {initializeDetails?.advanceInfo?.advanceInvoiceNumber}
                  </span>
                </div>

                <div className="text-1xl font-semibold">
                  ₹ {bookingAmount?.toLocaleString()}
                </div>

                {/* <button
                  onClick={() =>
                    setShowRetainerBreakdown(!showRetainerBreakdown)
                  }
                  className={`mt-2 flex items-center gap-1 rounded-md px-3 py-1.5 text-xs font-medium transition
    ${
      showRetainerBreakdown
        ? "bg-[#EEF4FF] text-[#1E45E1]"
        : "bg-[#0D1B8E] text-white"
    }`}
                >
                  {showRetainerBreakdown
                    ? "View Breakdown"
                    : "View Total Retainer Amount"}

                  <ArrowRight2
                    size={12}
                    className={`transition-transform ${
                      showRetainerBreakdown ? "-rotate-90" : ""
                    }`}
                  />
                </button> */}
              </div>
            </div>

            {showRetainerBreakdown && (
              <div className="mt-3 bg-white border border-[#E5E7EB] rounded-lg overflow-hidden">
                <div className="grid grid-cols-5">
                  {[
                    {
                      title: "Advance",
                      amount:
                        initializeDetails?.advanceInfo?.advanceAmount || 0,
                    },
                    {
                      title: "Rent",
                      amount: initializeDetails?.advanceInfo?.rentAmount || 0,
                    },
                    {
                      title: "EB",
                      amount: initializeDetails?.advanceInfo?.ebAmount || 0,
                    },
                    {
                      title: "Booking",
                      amount:
                        initializeDetails?.advanceInfo?.bookingAmount || 0,
                    },
                    {
                      title: "General",
                      amount:
                        initializeDetails?.advanceInfo?.generalAmount || 0,
                    },
                  ].map((item, index) => (
                    <div key={index} className={"px-4 py-3"}>
                      <p className="text-[12px] text-[#667085] mb-2">
                        {item.title}
                      </p>

                      <p className="text-[16px] font-semibold text-[#1F2937]">
                        ₹ {Number(item.amount).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="overflow-y-auto show-scrolls max-h-[400px]">
            <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="overflow-auto h-fit">
                <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>INV NO</th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>
                        TYPE
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>DUE DATE</th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>DUE AMOUNT</th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>
                        AMOUNT TO APPLY
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {initializeDetails?.listInvoices?.length > 0 ? (
                      initializeDetails.listInvoices.map((item, index) => (
                        <tr key={index}>
                          <td className={`${TABLE_BODY_CELL} text-blue-600 cursor-pointer font-semibold`}>
                            {item.invoiceNumber}
                          </td>
                          <td className={`${TABLE_BODY_CELL} font-semibold`}>
                            {item.invoiceType}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-gray-500`}>
                            {item.dueDate}
                          </td>

                          <td className={`${TABLE_BODY_CELL} font-semibold`}>
                            ₹{item.pendingAmount}
                          </td>

                          <td className={`${TABLE_BODY_CELL} font-semibold`}>
                            <input
                              onWheel={(e) => e.target.blur()}
                              type="number"
                              value={
                                applyAmountForInvoice.find(
                                  (i) => i.invoiceId === item.invoiceId,
                                )?.amount || ""
                              }
                              onChange={(e) =>
                                handleApplyAmountChange(index, e.target.value)
                              }
                              placeholder="₹ 0.00"
                              className={fieldClass(!!error)}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className={`${TABLE_BODY_CELL} text-center text-red-600 py-5`}
                        >
                          No pending invoices found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            {error && (
              <div className="mb-3">
                <ErrorMessage className="mt-[6px]" message={error} type="error" />
              </div>
            )}
            {state?.Booking?.applyRedeemError && (
              <div className="mb-3">
                <ErrorMessage className="mt-[6px]"
                  message={state?.Booking?.applyRedeemError}
                  type="error"
                />
              </div>
            )}
            <div className="mt-6 flex justify-end">
              <div className="bg-gray-100 px-4 py-3 rounded-lg">
                <div className="flex justify-between text-sm text-gray-500 mb-2 gap-6">
                  <span>Amount Applied</span>
                  <span className="font-semibold text-black">
                    ₹ {totalApplied?.toFixed(2)}{" "}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 gap-6">
                  <span>Available Balance</span>
                  <span className="font-semibold text-black">
                    ₹ {remainingBalance?.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 bg-gray-100 rounded-md text-sm"
            >
              Cancel
            </button>

            <button
              disabled={formLoading}
              onClick={handleApplySubmit}
              className="bg-[#1E45E1] flex items-center justify-center gap-2 text-white px-4 py-2 rounded-md text-sm disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {formLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Applying...
                </>
              ) : (
                <>
                  Apply
                  <ArrowRight size="14" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
RetainerApplyInvoice.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  advanceDetails: PropTypes.shape({
    invoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

export default RetainerApplyInvoice;

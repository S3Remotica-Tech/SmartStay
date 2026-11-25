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

function ApplyAdvance({ show, handleClose, advanceDetails, label }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [applyAmountForInvoice, setApplyAmountForInvoice] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const handleApplyAmountChange = (value) => {
    dispatch({ type: "REMOVE_ERROR_APPLY_INVOICE" });
    setError("");

    const invoice = initializeDetails?.currentInvoiceInfo;
    const invoiceId = invoice?.invoiceId;

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
    if (amount > Number(invoice?.pendingAmount)) {
      setError("Cannot exceed invoice balance");
      amount = Number(invoice?.pendingAmount);
    }
    const otherApplied = applyAmountForInvoice.reduce(
      (sum, item) =>
        item.invoiceId !== invoiceId ? sum + Number(item.amount || 0) : sum,
      0,
    );

    if (amount + Number(otherApplied) > bookingAmount) {
      setError("Total exceeds booking amount");
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
      type: "APPLY_ADVANCE_INVOICE_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        invoiceId: advanceDetails?.invoiceId,
        type: label === "booking" ? "Credit" : "",
      },
    });
  }, [state.login.selectedHostel_Id]);

  const initializeDetails = state?.Booking?.advanceInitialize;

  const bookingAmount = Number(
    initializeDetails?.advanceInfo?.availableBalance || 0,
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
        invoiceId: initializeDetails?.advanceInfo?.invoiceId,
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
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-y-2 right-2 w-full max-w-4xl bg-white rounded-xl shadow-xl flex flex-col font-gilroy">
        <div className="flex justify-between items-center p-3 border-b">
          <h5 className="font-semibold text-lg text-black capitalize">
            Apply {label} to Invoice
          </h5>

          <button
            onClick={handleClose}
            className="text-red-500 text-lg font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-3">
          <div className="flex justify-between items-center bg-[#F7F8FCA8] p-3 rounded mb-4">
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-[#E2E8F0]  flex items-center justify-center text-gray-700 font-semibold">
                {initializeDetails?.customerInfo?.profilePic ? (
                  <img
                    src={initializeDetails.customerInfo.profilePic}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  initializeDetails?.customerInfo?.initials || "NA"
                )}
              </div>

              <div>
                <div className="font-medium text-lg text-gray-800 mb-1">
                  {initializeDetails?.customerInfo?.fullName}
                </div>

                <div className="text-xs flex items-center gap-2">
                  <span className="bg-yellow-100 text-[12px] px-3 py-1.5 rounded-md text-black">
                    {initializeDetails?.customerInfo?.floorName}
                  </span>

                  <span className="text-gray-400">|</span>

                  <span className="bg-[#FFE0D9] text-[12px] px-3 py-1.5 rounded-md text-black">
                    {initializeDetails?.customerInfo?.roomName} -{" "}
                    {initializeDetails?.customerInfo?.bedName}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-sm text-gray-400">
                {initializeDetails?.advanceInfo?.invoiceType === "BOOKING"
                  ? "Booking"
                  : "Advance"}{" "}
                Amount
              </div>
              <div className="font-semibold text-lg">
                ₹ {bookingAmount ?? 0}
              </div>
              <div className="font-semibold text-blue-600 text-sm">
                {initializeDetails?.advanceInfo?.invoiceNumber}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto mx-2 my-2 show-scrolls max-h-[500px]">
            <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="overflow-auto h-fit">
                <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                  <thead className="sticky top-0 z-10">
                    <tr>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>
                        TYPE
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>INV NO</th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>DUE DATE</th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>INVOICE AMOUNT</th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>INVOICE BALANCE</th>
                      <th className={`${TABLE_HEADER_CELL} text-left`}>
                        AMOUNT TO APPLY
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {initializeDetails?.currentInvoiceInfo ? (
                      <tr
                        key={initializeDetails?.currentInvoiceInfo?.invoiceId}
                      >
                        <td className={`${TABLE_BODY_CELL} font-semibold text-[#111928]`}>
                          {initializeDetails?.currentInvoiceInfo?.invoiceType}
                        </td>

                        <td className={`${TABLE_BODY_CELL} text-[#1E45E1] cursor-pointer font-semibold`}>
                          {initializeDetails?.currentInvoiceInfo?.invoiceNumber}
                        </td>

                        <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                          {initializeDetails?.currentInvoiceInfo?.dueDate}
                        </td>

                        <td className={`${TABLE_BODY_CELL} font-semibold text-[#111928]`}>
                          ₹{initializeDetails?.currentInvoiceInfo?.totalAmount}
                        </td>

                        <td className={`${TABLE_BODY_CELL} font-semibold text-[#111928]`}>
                          ₹
                          {initializeDetails?.currentInvoiceInfo?.pendingAmount}
                        </td>

                        <td className={`${TABLE_BODY_CELL} font-semibold text-[#111928]`}>
                          <input
                            type="number"
                            value={
                              applyAmountForInvoice.find(
                                (i) =>
                                  i.invoiceId ===
                                  initializeDetails?.currentInvoiceInfo
                                    ?.invoiceId,
                              )?.amount || ""
                            }
                            onChange={(e) =>
                              handleApplyAmountChange(e.target.value)
                            }
                            placeholder="₹ 0.00"
                            className={fieldClass(!!error)}
                          />
                        </td>
                      </tr>
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
                    ₹ {totalApplied.toFixed(2)}{" "}
                  </span>
                </div>

                <div className="flex justify-between text-sm text-gray-500 gap-6">
                  <span>Available Balance</span>
                  <span className="font-semibold text-black">
                    ₹ {remainingBalance.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="m-6 flex justify-end gap-3">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-100 rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={formLoading}
            onClick={handleApplySubmit}
            className="flex min-w-[110px] items-center justify-center gap-2 rounded-lg bg-[#1E45E1] px-4 py-2 font-gilroy text-[16px] font-normal text-white transition hover:bg-[#1838c4] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {formLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Applying...
              </>
            ) : (
              <>
                Apply
                <ArrowRight size={14} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
ApplyAdvance.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  advanceDetails: PropTypes.shape({
    invoiceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,

  label: PropTypes.string.isRequired,
};

export default ApplyAdvance;

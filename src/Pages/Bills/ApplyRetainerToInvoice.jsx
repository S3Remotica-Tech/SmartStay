/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { ArrowRight } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";

function ApplyRetainerToInvoice({ show, handleClose, retainerDetails, label }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [applyAmountForInvoice, setApplyAmountForInvoice] = useState([]);
  const [formLoading, setFormLoading] = useState(false);
  const [selectedInvoices, setSelectedInvoices] = useState([]);

  const handleApplyAmountChange = (invoiceId, value) => {
    dispatch({ type: "REMOVE_ERROR_APPLY_INVOICE" });
    setError("");

    const invoice = initializeDetails?.advanceInfo?.find(
      (item) => item.invoiceId === invoiceId,
    );

    if (!invoice) return;

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

    if (amount > Number(invoice.availableBalance)) {
      setError("Cannot exceed invoice balance");
      amount = Number(invoice.availableBalance);
    }

    const otherApplied = applyAmountForInvoice.reduce(
      (sum, item) =>
        item.invoiceId !== invoiceId ? sum + Number(item.amount || 0) : sum,
      0,
    );

    if (amount + otherApplied > retainerAmount) {
      setError("Total exceeds invoice amount");
      amount = retainerAmount - otherApplied;
    }

    const updated = [...applyAmountForInvoice];
    const existingIndex = updated.findIndex(
      (item) => item.invoiceId === invoiceId,
    );

    if (existingIndex > -1) {
      updated[existingIndex] = {
        invoiceId,
        amount,
      };
    } else {
      updated.push({
        invoiceId,
        amount,
      });
    }

    setApplyAmountForInvoice(
      updated.filter((item) => item.invoiceId && item.amount >= 0),
    );
  };

  console.log("applyAmountForInvoice", applyAmountForInvoice);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    dispatch({
      type: "GET_RETAINER_INVOICE_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        invoiceId: retainerDetails?.invoiceId,
        // type: label === "booking" ? "Credit" : "",
      },
    });
  }, [state.login.selectedHostel_Id]);

  const initializeDetails = state?.Booking?.getRetainerInvoice;

  const retainerAmount = Number(
    initializeDetails?.currentInvoiceInfo?.pendingAmount || 0,
  );

  const totalApplied = applyAmountForInvoice?.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const selectedRetainerBalance = initializeDetails?.advanceInfo?.reduce(
    (sum, item) =>
      selectedInvoices.includes(item.invoiceId)
        ? sum + Number(item.availableBalance || 0)
        : sum,
    0,
  );

  const remainingBalance = selectedRetainerBalance - totalApplied;

  const handleCheckboxChange = (invoiceId) => {
    setSelectedInvoices((prev) => {
      if (prev.includes(invoiceId)) {
        setApplyAmountForInvoice((old) =>
          old.filter((item) => item.invoiceId !== invoiceId),
        );
        return prev.filter((id) => id !== invoiceId);
      }

      return [...prev, invoiceId];
    });
  };

  const handleApplySubmit = () => {
    dispatch({ type: "REMOVE_ERROR_APPLY_INVOICE" });

    let validationError = "";

    if (totalApplied === 0) {
      validationError = "Please enter at least one amount";
    } else if (totalApplied > retainerAmount) {
      validationError = "Applied amount exceeds booking amount";
    }

    setError(validationError);

    if (validationError) return;

    dispatch({
      type: "APPLY_RETAINER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        invoiceId: initializeDetails?.currentInvoiceInfo?.invoiceId,
        appliedAmount: "",
        redeemedOn: "",
        comments: "",
        retainersBreakup: applyAmountForInvoice,
      },
    });
    setFormLoading(true);
  };

  useEffect(() => {
    if (state?.Booking?.applyRetainerSuccessCode === 200) {
      setFormLoading(false);
      handleClose();
    }
  }, [state?.Booking?.applyRetainerSuccessCode]);

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

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-y-2 right-2 w-full max-w-5xl bg-white rounded-xl shadow-xl flex flex-col font-gilroy">
        <div className="flex justify-between items-center p-3 border-b">
          <h5 className="font-semibold text-lg text-black capitalize">
            Adjust with Retainer Invoice
          </h5>

          <button
            onClick={handleClose}
            className="text-red-500 text-lg font-bold hover:scale-110 transition"
          >
            ✕
          </button>
        </div>

        <div className="p-3 flex-1 overflow-y-auto mx-2 my-2 show-scrolls max-h-[500px]">
          <div className="flex justify-between items-center bg-[#F7F8FCA8] p-3 rounded mb-2">
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
              <div className="text-sm text-gray-400 capitalize">
                {initializeDetails?.currentInvoiceInfo?.invoiceType.toLowerCase()}{" "}
                Amount
              </div>
              <div className="font-semibold text-lg">
                ₹ {initializeDetails?.currentInvoiceInfo?.pendingAmount ?? 0}
              </div>
              <div className="font-semibold text-blue-600 text-sm">
                {initializeDetails?.currentInvoiceInfo?.invoiceNumber}
              </div>
            </div>
          </div>
          <div className="px-3 py-3 ">
            <div>
              <label className="text-sm text-[#222222] font-semibold">
                Retainer Invoices
              </label>
            </div>

            <div className="text-sm text-[#4B4B4B]">
              Select retainer Balance to adjust with Bills
            </div>
          </div>

          <div className="">
            <div className="bg-white rounded-xl border border-[#E8E8E8]">
              <div className=" h-fit">
                <table className="w-full text-sm">
                  <thead className="bg-[#F9FAFB] text-gray-500 text-xs uppercase whitespace-nowrap rounded-tl-xl rounded-tr-xl ">
                    <tr className="rounded-tl-xl rounded-tr-xl">
                      <th className="text-left px-4 py-2"></th>
                      <th className="text-left px-4 py-2 rounded-tl-xl rounded-tr-xl">
                        RETAINER TYPE
                      </th>
                      <th className="text-left px-4 py-2">INV NO</th>
                      <th className="text-left px-4 py-2">DUE DATE</th>
                      <th className="text-left px-4 py-2">RETAINER AMOUNT</th>
                      <th className="text-left px-4 py-2">INVOICE BALANCE</th>
                      <th className="text-left px-4 py-2 rounded-tl-xl rounded-tr-xl">
                        AMOUNT TO APPLY
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {initializeDetails?.advanceInfo?.length > 0 ? (
                      initializeDetails.advanceInfo.map((item) => (
                        <tr
                          key={item.invoiceId}
                          className={`border-t whitespace-nowrap transition-opacity ${
                            !selectedInvoices.includes(item.invoiceId)
                              ? "opacity-50"
                              : "opacity-100"
                          }`}
                        >
                          <td className="px-4 py-2 font-semibold">
                            <input
                              className="rounded-md accent-blue-800 cursor-pointer"
                              type="checkbox"
                              checked={selectedInvoices.includes(
                                item.invoiceId,
                              )}
                              onChange={() =>
                                handleCheckboxChange(item.invoiceId)
                              }
                            />
                          </td>
                          <td className="px-4 py-2 font-semibold">
                            {item.invoiceType}
                          </td>

                          <td className="text-blue-700 cursor-pointer px-4 py-2 font-semibold">
                            {item.invoiceNumber}
                          </td>

                          <td className="px-4 py-2 text-gray-500">
                            {item.dueDate}
                          </td>

                          <td className="font-semibold px-4 py-2">
                            ₹{item.invoiceAmount}
                          </td>

                          <td className="px-4 py-2 font-semibold">
                            ₹{item.availableBalance}
                          </td>

                          <td className="px-4 py-2 font-semibold">
                            <input
                              onWheel={(e) => e.target.blur()}
                              type="number"
                              disabled={
                                !selectedInvoices.includes(item.invoiceId)
                              }
                              value={
                                applyAmountForInvoice.find(
                                  (i) => i.invoiceId === item.invoiceId,
                                )?.amount || ""
                              }
                              onChange={(e) =>
                                handleApplyAmountChange(
                                  item.invoiceId,
                                  e.target.value,
                                )
                              }
                              placeholder="₹ 0.00"
                              className={`w-full h-[34px] text-sm rounded-md border px-2 outline-none font-medium ${
                                !selectedInvoices.includes(item.invoiceId)
                                  ? "bg-gray-100 cursor-not-allowed"
                                  : "bg-white"
                              }`}
                            />
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={6}
                          className="text-center text-red-600 py-5"
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
                <ErrorMessage message={error} type="error" />
              </div>
            )}
            {state?.Booking?.applyRedeemError && (
              <div className="mb-3">
                <ErrorMessage
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
ApplyRetainerToInvoice.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
};

export default ApplyRetainerToInvoice;

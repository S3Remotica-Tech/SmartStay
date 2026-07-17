/* eslint-disable react-hooks/exhaustive-deps */
import { CloseCircle, DocumentText } from "iconsax-react";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import Select from "react-select";
import { Add } from "iconsax-react";

function DiscountInvoice({ show, handleClose, editData = null, isEdit }) {
  const state = useSelector((state) => state);
  // console.log("EDIT DATA", editData);
  const [discountInput, setDiscountInput] = useState("");
  const [discountInputError, setDiscountInputError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const pdfDetails = state.InvoiceList?.particularBillsDetails;
  const [discountType, setDiscountType] = useState("amount");
  const [selectedReason, setSelectedReason] = useState(null);
  const [customReason, setCustomReason] = useState("");
  const [noChangesError, setNoChangesError] = useState("");

  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);

  const handleDiscountChange = (e) => {
    const value = e.target.value;

    dispatch({ type: "CLEAR_NETWORK_ERROR" });
    dispatch({ type: "RMOVE_INVOICE_DISCOUNT_REDUCER_ERROR" });

    setDiscountInputError("");
    setNoChangesError("");

    if (value === "") {
      setDiscountInput("");
      setDiscountAmount(0);
      setDiscountPercent(0);
      return;
    }

    const numValue = parseFloat(value);

    setDiscountInput(numValue);

    if (baseAmount === 0) return;

    if (discountType === "percent") {
      setDiscountPercent(numValue);
      setDiscountAmount((numValue / 100) * baseAmount);
    } else {
      setDiscountAmount(numValue);
      setDiscountPercent((numValue / baseAmount) * 100);
    }
  };

  const handleTypeChange = (type) => {
    if (type === discountType) return;

    setDiscountType(type);

    if (type === "percent") {
      const percent = discountPercent || 0;
      setDiscountInput(Number(percent.toFixed(2)));
    } else {
      const amount = discountAmount || 0;
      setDiscountInput(Number(amount.toFixed(2)));
    }
  };

  const parseDate = (dateStr) => {
    if (!dateStr) return null;

    const parts = dateStr.split("/");
    if (parts.length !== 3) return null;

    const [day, month, year] = parts.map(Number);
    return new Date(year, month - 1, day);
  };
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDateObj = parseDate(pdfDetails?.dueDate);

  let overdueDays = 0;

  if (dueDateObj) {
    dueDateObj.setHours(0, 0, 0, 0);

    const diffTime = today - dueDateObj;
    overdueDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  // const Amount =
  // pdfDetails?.invoiceInfo?.subTotal ||
  // pdfDetails?.invoiceInfo?.totalAmount

  const Amount = pdfDetails?.invoiceInfo?.invoiceItems?.reduce(
    (sum, item) => sum + item.amount,
    0,
  );

  const baseAmount = Amount;

  const total = parseFloat(Amount) || 0;
  const discount = parseFloat(discountInput) || 0;
  const calculatedDiscount =
    discountType === "percent"
      ? (total * discountPercent) / 100
      : discountAmount;

  const payableAmount = total - calculatedDiscount;
  const displayPercent =
    discountPercent < 1
      ? discountPercent.toFixed(2)
      : Math.round(discountPercent);

  const reasonOptions = [
    { value: "loyalty", label: "Loyalty Discount" },
    { value: "promo", label: "Promotional Offer" },
    { value: "service", label: "Service Issue" },
    { value: "partial", label: "Partial Stay" },
    { value: "approval", label: "Special Approval" },
    { value: "other", label: "Other" },
  ];

  useEffect(() => {
    if (
      state.InvoiceList?.makeDiscountError ||
      state.InvoiceList?.editDiscountError
    ) {
      setFormLoading(false);
    }
  }, [
    state.InvoiceList?.makeDiscountError,
    state.InvoiceList?.editDiscountError,
  ]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    return () => {
      setDiscountInputError("");
      setReasonError("");
      dispatch({ type: "CLEAR_NETWORK_ERROR" });
      dispatch({ type: "REMOVE_EDIT_INVOICE_DISCOUNT_REDUCER_ERROR" });
      dispatch({ type: "RMOVE_INVOICE_DISCOUNT_REDUCER_ERROR" });
    };
  }, []);

  useEffect(() => {
    if (editData && pdfDetails?.invoiceInfo?.isDiscounted) {
      setDiscountInput(
        discountType === "amount"
          ? editData?.discountAmount
          : editData?.discountPercentage,
      );
      const matched = reasonOptions.find(
        (r) => r.label === editData?.discountReason,
      );
      setDiscountAmount(editData?.discountAmount);
      setDiscountPercent(editData?.discountPercentage);
      if (matched) {
        setSelectedReason(matched);
        setCustomReason("");
      } else {
        setSelectedReason({ value: "other", label: "Other" });
        setCustomReason(editData?.discountReason || "");
      }
    }
  }, [editData]);

  useEffect(() => {
    if (!show) {
      setDiscountInput("");
      setSelectedReason(null);
      setCustomReason("");
      setDiscountType("amount");
    }
  }, [show]);

  const handleApplyInvoices = () => {
    dispatch({ type: "CLEAR_NETWORK_ERROR" });

    dispatch({ type: "REMOVE_EDIT_INVOICE_DISCOUNT_REDUCER_ERROR" });
    dispatch({ type: "RMOVE_INVOICE_DISCOUNT_REDUCER_ERROR" });

    let hasError = false;

    const finalReason =
      selectedReason?.value === "other" ? customReason : selectedReason?.label;

    const discountValue = parseFloat(discountInput) || 0;
    const total = parseFloat(pdfDetails?.invoiceInfo?.totalAmount) || 0;

    setDiscountInputError("");
    setReasonError("");
    setNoChangesError("");

    if (!discountInput) {
      setDiscountInputError("Please Enter Discount");
      hasError = true;
    }

    if (!finalReason) {
      setReasonError("Please select or enter reason");
      hasError = true;
    }

    if (discountType === "percent" && discountValue > 100) {
      setDiscountInputError("Percentage cannot exceed 100");
      hasError = true;
    }

    if (discountType === "amount" && discountValue > Amount) {
      setDiscountInputError("Discount cannot exceed invoice amount");
      hasError = true;
    }

    if (hasError) return;

    // if (isEdit) {
    //     const oldDiscount =
    //         editData?.discountAmount || editData?.discountPercentage || 0;

    //     const oldReason = editData?.discountReason;

    //     if (
    //         discountValue === oldDiscount &&
    //         finalReason === oldReason
    //     ) {
    //         setNoChangesError("No Changes Detected");
    //         return;
    //     }
    // }

    let payload = {
      hostelId: state.login?.selectedHostel_Id,
      invoiceId: pdfDetails?.invoiceId,
      reason: finalReason,
    };

    if (discountType === "amount") {
      payload.discountAmount = discountValue;
    } else {
      payload.discountPercentage = discountValue;
    }

    if (isEdit) {
      dispatch({
        type: "EDIT_INVOICE_DISCOUNT",
        payload,
      });
    } else {
      dispatch({
        type: "INVOICE_DISCOUNT_SAGA",
        payload,
      });
    }

    setFormLoading(true);
  };

  useEffect(() => {
    const status = editData
      ? state.InvoiceList?.editInvoiceDiscountStatus
      : state.InvoiceList?.makeInvoiceDiscountStatus;

    if (status === 200) {
      setFormLoading(false);
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      handleClose();

      dispatch({ type: "REMOVE_INVOICE_DISCOUNT_REDUCER" });
      dispatch({ type: "REMOVE_EDIT_INVOICE_DISCOUNT_REDUCER" });
    }
  }, [
    state.InvoiceList?.makeInvoiceDiscountStatus,
    state.InvoiceList?.editInvoiceDiscountStatus,
  ]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-4xl bg-white rounded-xl shadow-xl flex flex-col font-gilroy">
        <div className="flex justify-between items-center px-4 pt-4 py-2 ">
          <h2 className="text-lg font-semibold text-gray-800">
            {pdfDetails?.invoiceInfo?.isDiscounted
              ? "Edit Discount Invoice"
              : "Discount Invoice"}
          </h2>

          <button onClick={handleClose} className="text-red-500 text-xl">
            <CloseCircle />
          </button>
        </div>

        <div className="flex justify-between items-center bg-[#F7F8FCA8] mx-4 px-2 py-2.5 rounded mb-2">
          <div className="flex gap-3">
            {pdfDetails?.customerInfo?.profilePic ? (
              <img
                src={pdfDetails?.customerInfo?.profilePic}
                alt="image"
                className="h-14 w-14 rounded-full"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-gray-700">
                {pdfDetails?.customerInfo?.initials}
              </div>
            )}

            <div>
              <div className="font-medium text-lg text-gray-800 mb-1">
                {pdfDetails?.customerInfo?.fullName}
              </div>
              <div className="text-xs">
                <span className="bg-yellow-100 text-[10px] text-gray-900 px-3 py-1.5 rounded-md">
                  {pdfDetails?.stayInfo?.floorName}
                </span>
                &nbsp; | &nbsp;
                <span className="bg-[#FFE0D9] text-[10px] text-[#222222] px-[14px] py-[6px] rounded-[10px]">
                  {pdfDetails?.stayInfo?.roomName}-{" "}
                  {pdfDetails?.stayInfo?.bedName}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-[14px] text-[#4B4B4B] font-semibold mb-1 ">
              Amount
            </div>
            <div className="flex items-center gap-2 font-semibold">
              <div>
                <label className="text-[#222222] text-[18px] font-semibold">
                  ₹ {Amount}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mx-2 my-2 show-scrolls max-h-[500px]">
          <div className="px-4 py-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-8 gap-4">
              <div className="mb-2 col-span-1 sm:col-span-2 md:col-span-4">
                <label className="block mb-1 text-sm font-medium text-[#4B4B4B]">
                  Reason for Discount <span className="text-red-500">*</span>
                </label>

                {selectedReason?.value === "other" ? (
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={customReason}
                      onChange={(e) => {
                        const value = e.target.value;

                        if (/^[A-Za-z\s]*$/.test(value)) {
                          setCustomReason(value);
                          setReasonError("");
                          setNoChangesError("");
                        }
                      }}
                      placeholder="Enter custom reason"
                      className="w-full border border-[#D9D9D9] rounded-md px-3 py-2.5 pr-10 text-sm outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        setSelectedReason(null);
                        setCustomReason("");
                        setReasonError("");
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
                    >
                      <Add size={18} className="rotate-45 " />
                    </button>
                  </div>
                ) : (
                  <Select
                    options={reasonOptions}
                    value={selectedReason}
                    onChange={(option) => {
                      setSelectedReason(option);
                      setReasonError("");
                      setNoChangesError("");
                      if (option?.value !== "other") {
                        setCustomReason("");
                      }
                    }}
                    styles={{
                      control: (base) => ({
                        ...base,
                        height: "45px",
                        border: "1px solid #D9D9D9",
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: "#222222",
                        fontFamily: "Gilroy",
                        boxShadow: "none",
                      }),
                      option: (base, state) => ({
                        ...base,
                        cursor: "pointer",
                        fontFamily: "Gilroy",
                        backgroundColor:
                          state.data.value === "other"
                            ? "#E7F1FF"
                            : state.isFocused
                              ? "#f0f0f0"
                              : "white",

                        fontWeight: state.data.value === "other" ? 600 : 400,
                        color:
                          state.data.value === "other" ? "#1E45E1" : "#000",
                      }),
                      placeholder: (base) => ({
                        ...base,
                        color: "#555",
                        fontWeight: 400,
                      }),
                      singleValue: (base) => ({
                        ...base,
                        fontWeight: 600,
                        color: "#222222",
                        fontFamily: "Gilroy",
                      }),
                      indicatorSeparator: () => ({ display: "none" }),
                      menuList: (base) => ({
                        ...base,
                        maxHeight: "150px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                        msOverflowStyle: "auto",
                      }),
                    }}
                    placeholder="Select Reason"
                    className="text-sm  rounded-md"
                  />
                )}
              </div>
            </div>
            {reasonError && (
              <div className="mb-2">
                <ErrorMessage message={reasonError} type="error" />
              </div>
            )}
            <p className="text-sm font-semibold mb-2 text-[#222222]">
              For Invoice
            </p>

            <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-gray-500 text-xs font-medium">
                  <tr>
                    <th className="text-left px-3 py-2">INVOICE OF</th>
                    <th className="text-left px-3 py-2"> INVOICE DATE</th>
                    <th className="text-left px-3 py-2">AMOUNT</th>
                    <th className="text-left px-3 py-2 ">OVERDUE ON</th>
                    <th className="text-left px-3 py-2 captitialize">
                      {discountType === "amount"
                        ? "AMOUNT TO APPLY (DISCOUNT)"
                        : "PERCENTAGE TO APPLY (DISCOUNT)"}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-t">
                    <td className="px-3 py-2 text-blue-600 font-semibold">
                      {pdfDetails?.invoiceNumber}
                    </td>
                    <td className="px-3 py-2 text-gray-500">
                      {pdfDetails?.invoiceDate}
                    </td>

                    <td className="px-3 py-2 font-semibold">₹ {Amount}</td>
                    <td className="px-3 py-2 text-gray-500">
                      <div>{pdfDetails?.dueDate}</div>
                      {overdueDays > 0 && (
                        <span className="text-[#FF9500] text-xs">
                          Overdue by {overdueDays} day
                          {overdueDays > 1 ? "s" : ""}
                        </span>
                      )}
                    </td>

                    <td className="px-3 py-2">
                      <div className="flex items-center border rounded-md overflow-hidden w-full">
                        <input
                          type="number"
                          value={discountInput}
                          onChange={handleDiscountChange}
                          placeholder={
                            discountType === "percent" ? "Enter %" : "₹ 0.00"
                          }
                          className="w-full px-2 py-2.5 text-sm outline-none"
                        />

                        <div className="flex border-r rounded bg-[#E7F1FF] py-1 px-2">
                          <button
                            type="button"
                            onClick={() => handleTypeChange("amount")}
                            className={`px-3 py-1 text-sm rounded ${
                              discountType === "amount"
                                ? "bg-[#1E45E1] text-white"
                                : "bg-[#E7F1FF]"
                            }`}
                          >
                            ₹
                          </button>

                          <button
                            type="button"
                            onClick={() => handleTypeChange("percent")}
                            className={`px-3 text-sm rounded ${
                              discountType === "percent"
                                ? "bg-[#1E45E1] text-white"
                                : "bg-[#E7F1FF]"
                            }`}
                          >
                            %
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {discountInputError && (
              <ErrorMessage message={discountInputError} type="error" />
            )}

            {(editData
              ? state.InvoiceList?.editDiscountError
              : state.InvoiceList?.makeDiscountError) && (
              <ErrorMessage
                message={
                  editData
                    ? state.InvoiceList?.editDiscountError
                    : state.InvoiceList?.makeDiscountError
                }
                type="error"
              />
            )}
          </div>

          <div className="flex justify-end h-fit w-full  px-10 whitespace-nowrap">
            <div className="bg-gray-50 p-4 rounded-lg w-full max-w-sm text-sm grid grid-cols-2 gap-y-2">
              <span className="text-[#4B4B4B] break-words">
                Invoice Amount ({pdfDetails?.invoiceNumber})
              </span>

              <span className="font-semibold text-right whitespace-nowrap">
                ₹ {Amount}
              </span>

              <span className="text-[#4B4B4B] break-words">
                Discount Applied
              </span>
              <span className="font-semibold text-right whitespace-nowrap">
                {discountType === "amount" ? "₹ " : ""}
                {calculatedDiscount ? Math.round(calculatedDiscount) : 0}
                {discountType === "percent" && `(${displayPercent}%)`}
              </span>

              <span className="text-[#4B4B4B] break-words font-medium">
                Total Payable
              </span>

              <span className="font-semibold text-right whitespace-nowrap">
                ₹ {Math.round(payableAmount)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center px-5 py-3 border-t">
          <div>
            {noChangesError && (
              <ErrorMessage message={noChangesError} type="error" />
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-sm border rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={formLoading}
              onClick={handleApplyInvoices}
              className="flex min-w-[120px] items-center justify-center rounded-lg bg-[#1E45E1] px-4 py-2 font-gilroy text-[16px] font-normal text-white transition hover:bg-[#1838c4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {formLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscountInvoice;

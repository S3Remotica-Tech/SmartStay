/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

import {
  ArrowLeft2,
  Calendar,
  DocumentUpload,
  CloseCircle,
  ArrowDown2,
  Add,
  Bank,
  Wallet2,
  ArrowRight,
} from "iconsax-react";
import Select, { components } from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "40px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled
      ? "#F3F4F6"
      : state.hasValue
        ? "#FFF"
        : "#fff",
    opacity: state.isDisabled ? 0.7 : 1,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 500,
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#6B7280",
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 14,
      padding: "6px 12px",
      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#fff",
      color: "#111827",
      cursor: "pointer",

      whiteSpace: "nowrap",
      overflow: "visible",

      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #1E45E1",
        fontWeight: 500,
      }),
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "300px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isDisabled ? "#D1D5DB" : "#6B7280",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

const Option = (props) => {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {data.icon}
          <div>
            <label className="text-xs font-medium  text-[#222222]">
              {data.label}
            </label>
            {data.subLabel && (
              <label className="text-xs text-[#6B7280]">{data.subLabel}</label>
            )}
          </div>
        </div>
        {/* <span className="text-xs text-[#1E45E1] bg-[#E1EFFE] px-2 py-1 rounded">
          {data.type}
        </span> */}
      </div>
    </components.Option>
  );
};

const SingleValue = (props) => {
  const { data } = props;

  return (
    <components.SingleValue {...props}>
      <div className="flex items-center gap-2">
        {data.icon}
        <span>{data.label}</span>
      </div>
    </components.SingleValue>
  );
};

const DropdownIndicator = (props) => (
  <components.DropdownIndicator {...props}>
    <ArrowDown2 size={16} color="#6B7280" />
  </components.DropdownIndicator>
);

const GroupHeading = (props) => (
  <components.GroupHeading {...props}>
    <div className="px-2 py-1 text-xs font-medium text-[#6B7280]">
      {props.data.label}
    </div>
  </components.GroupHeading>
);

function ExpenseSettlement({ show, handleClose, selectedExpenseId }) {
  if (!show) return null;
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const expenseOverView = state.ExpenseList?.expenseOverview;

 
  const [paidAmount, setPaidAmount] = useState("");
  const [paidDate, setPaidDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [description, setDescription] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [vendorError, setVendorError] = useState("");
  const [paidAmountError, setPaidAmountError] = useState("");
  const [paidDateError, setPaidDateError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
  const [error, setError] = useState("");
  const paidAmountRef = useRef(null);
  const paidDateRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const [attachments, setAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState({
    name: "",
    index: "",
  });
  const [hoveredImage, setHoveredImage] = useState(null);
  const fileInputRef = useRef(null);
  const parseDate = (dateString) => {
    if (!dateString) return null;

    const [day, month, year] = dateString.split("/");

    return new Date(year, month - 1, day);
  };

  const transactionDate = parseDate(expenseOverView?.transactionDate);
  const initializaExpense = state.ExpenseList.getInitializeExpenseList;

  

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "INITIALIZEEXPENSESLIST",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, [state.login.selectedHostel_Id]);

  const finalOutstanding = expenseOverView?.balanceAmount - paidAmount;

  const paymentOptions = [
    {
      label: "Bank Accounts",
      options:
        initializaExpense?.banks?.map((bank) => ({
          value: bank.bankId,
          label: bank.bankName,
          holderName: bank.holderName,
          type: "Bank",
          icon: <Bank size={18} color="#1E45E1" />,
        })) || [],
    },
  ];

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaidAmountChange = (e) => {
    setPaidAmount(e.target.value);
    setPaidAmountError("");
  };

  const handleSetAmount = () => {
    const dueAmount = expenseOverView?.balanceAmount || 0;

    setPaidAmount(dueAmount);
    setPaidAmountError("");
  };

  const handleDateChange = (date) => {
    setPaidDate(date);
    setPaidDateError("");
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentMethodError("");
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const validateForm = () => {
    let isValid = true;
    setPaidAmountError("");
    setPaidDateError("");
    setPaymentMethodError("");
    setError("");

    if (!paidAmount || Number(paidAmount) <= 0) {
      setPaidAmountError("Please enter Paid Amount");
      paidAmountRef.current?.focus();
      isValid = false;
    }
    if (Number(paidAmount) > Number(expenseOverView?.balanceAmount)) {
      setPaidAmountError("Paid Amount cannot exceed Outstanding Amount.");
      isValid = false;
    }

    if (!paidDate) {
      setPaidDateError("Please select Paid Date");
      paidDateRef.current?.setFocus?.();
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodError("Please select Payment Method");
      paymentMethodRef.current?.focus();
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_EXPENSE_SETTLEMENT_ERROR" });
    if (!validateForm()) return;
    // setError("");
    const formattedDate = paidDate ? moment(paidDate).format("DD-MM-YYYY") : "";

    dispatch({
      type: "EXPENSE_SETTLEMENT_PAYMENT_SAGA",
      payload: {
        expenseId: selectedExpenseId,
        images: attachments.map((item) => item.file),
        payLoads: {
          paymentDate: formattedDate,
          bankId: paymentMethod?.value || "",
          paymentMethod: paymentMethod?.type || paymentMethod?.label || "",
          transactionId: transactionId,
          notes: description,
          paidAmount: paidAmount,
        },
      },
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (state.UsersList.settlementExpensePaymentSuccessCode === 200) {
      dispatch({
        type: "EXPENSE_OVERVIEW_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          expenseId: selectedExpenseId,
        },
      });

      setFormLoading(false);

      setPaidAmountError("");
      setPaidDateError("");
      setPaymentMethodError("");
      setError("");
      handleClose();
      setTimeout(() => {
        dispatch({ type: "REMOVE_EXPENSE_SETTLEMENT_PAYMENT_REDUCER" });
      }, 100);
    }
  }, [state.UsersList.settlementExpensePaymentSuccessCode]);

  useEffect(() => {
    return () => {
      setPaidAmountError("");
      setPaidDateError("");
      setPaymentMethodError("");
      // setError("");
      dispatch({ type: "REMOVE_EXPENSE_SETTLEMENT_ERROR" });
    };
  }, []);

  useEffect(() => {
    if (state.UsersList.expenseSettleError) {
      setFormLoading(false);
    }
  }, [state.UsersList.expenseSettleError]);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[40]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-[600px] bg-white rounded-lg shadow-xl z-50 flex flex-col font-gilroy border border-gray-50"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
          rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Expense Settle Payment
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>
        <div className="flex-1 show-scrolls overflow-y-auto ">
          <div className="grid grid-cols-1  mt-1 px-4 py-2">
            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Title <span className="text-red-600 text-[20px]">*</span>
              </label>
              <div className="relative">
                <input
                  disabled
                  type="text"
                  value={expenseOverView?.title}
                  // placeholder="Enter "
                  readOnly
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy disabled:bg-gray-50 ${
                    expenseOverView?.title ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />
              </div>
            </div>

            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1 flex justify-between">
                <span>
                  {" "}
                  Paid Amount (INR){" "}
                  <span className="text-red-500 text-[20px]">*</span>
                </span>
                <p className="mt-1 text-right text-xs text-gray-600 mb-0">
                  Due Amount{" "}
                  <span className="font-semibold  text-base text-[#E27625]">
                    ₹ {expenseOverView?.balanceAmount}
                  </span>
                </p>
              </label>
              <div className="relative">
                <input
                  type="number"
                  ref={paidAmountRef}
                  value={paidAmount}
                  placeholder="Enter Amount"
                  onChange={handlePaidAmountChange}
                  onWheel={(e) => e.target.blur()}
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    paidAmount ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />
                <button
                  onClick={handleSetAmount}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600"
                >
                  Set
                </button>
              </div>

              {paidAmountError && (
                <ErrorMessage message={paidAmountError} type="error" />
              )}
            </div>

            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Balance payable If (Outstanding){" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>
              <input
                type="text"
                value={finalOutstanding}
                readOnly
                className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700"
              />
            </div>

            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Paid Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  // ref={paidDateRef}
                  selected={paidDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  customInput={<input ref={paidDateRef} />}
                  minDate={transactionDate}
                  maxDate={new Date()}
                  className={`w-full h-[50px] rounded-[8px] border px-3 pr-10 text-[15px]
                  ${
                    paidDateError ? "border-red-500" : "border-[#D9D9D9]"
                  } focus:outline-none`}
                />

                <Calendar
                  size="20"
                  color="#1E45E1"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              {paidDateError && (
                <ErrorMessage message={paidDateError} type="error" />
              )}
            </div>

            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Payment method{" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>
              <Select
                value={paymentMethod}
                ref={paymentMethodRef}
                onChange={(selected) => {
                  setPaymentMethod(selected);
                  setPaymentMethodError("");
                }}
                options={paymentOptions}
                placeholder="Select Payment Method"
                styles={CustomStyles}
                isSearchable={false}
                components={{
                  Option,
                  SingleValue,
                  DropdownIndicator,
                  GroupHeading,
                  IndicatorSeparator: () => null,
                }}
              />

              {paymentMethodError && (
                <ErrorMessage message={paymentMethodError} type="error" />
              )}
            </div>

            <div className="mb-2 relative">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Transaction ID
              </label>
              <input
                type="text"
                placeholder="Enter Transaction ID"
                value={transactionId}
                onChange={handleTransactionIdChange}
                className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                  transactionId ? "font-semibold" : "font-medium"
                } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
              />
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />
            {attachments?.length === 0 && (
              <div className="mb-2">
                <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                  Attachments/Proofs (If any)
                </label>

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="mb-3 flex flex-row gap-4 items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 py-6 cursor-pointer hover:bg-gray-100"
                >
                  <div className="rounded-md bg-blue-100 px-1 py-1">
                    <DocumentUpload size={20} color="#1E45E1" />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#222222] mb-1">
                      <span className="text-[#1E45E1]">Choose Image to</span>{" "}
                      Upload
                    </p>

                    <p className="text-xs text-gray-500">
                      JPG / JPEG / PNG Format
                    </p>
                  </div>
                </div>

                {previewImage && (
                  <div className="flex items-center justify-center">
                    <div className="bg-[#FAFAFB] w-full rounded-md flex items-center justify-center">
                      <div
                        className="relative px-4 py-2 group"
                        onMouseEnter={() => setHoveredImage(previewImage)}
                        onMouseLeave={() => setHoveredImage(null)}
                      >
                        <img
                          src={previewImage}
                          alt="preview"
                          className="w-[350px] h-auto rounded-md object-fit"
                        />

                        <div
                          className={`absolute bottom-0 left-[21px]  right-[21px] overflow-hidden rounded-b-md transition-all duration-300 ${
                            hoveredImage === previewImage ? "h-[50px]" : "h-0"
                          }`}
                        >
                          <div className="h-[50px] bg-white/40 flex items-center justify-between px-3">
                            <p className="text-white text-sm truncate max-w-[170px]">
                              {selectedImageName?.name}
                            </p>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setPreviewImage(null);
                                handleRemoveFile(selectedImageName?.index);
                              }}
                              className="bg-white rounded-md p-1"
                            >
                              <Add
                                size={20}
                                color="#FF0000"
                                className="rotate-45"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {attachments?.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mt-3">
                {attachments.map((item, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg w-full"
                  >
                    <img
                      src={item.preview}
                      alt="preview"
                      className="h-[100px]  w-[200px] object-cover cursor-pointer rounded-lg"
                      onClick={() => {
                        setSelectedImageName({
                          name: item.file.name,
                          index: index,
                        });
                        setPreviewImage(item.preview);
                      }}
                    />

                    {/* <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-[#FFF2F2] rounded-full p-1 shadow"
                    >
                      <Add size={16} color="#FF0000" className="rotate-45" />
                    </button> */}

                    {/* <div className="p-1">
                      <p className="text-[10px] truncate">{item.file.name}</p>
                    </div> */}
                  </div>
                ))}
              </div>
            )}
            {attachments?.length > 0 && (
              <div
                className="flex justify-end my-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <label className="text-sm text-[#007AFF] cursor-pointer font-semibold">
                  + Add more Files
                </label>
              </div>
            )}
            <div className="mb-2 mt-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Description
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Enter the Notes/Description for this invoice "
                className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                  description ? "font-semibold" : "font-medium"
                } border border-[#D9D9D9] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-0`}
              />
            </div>

            <div className="rounded-xl bg-[#2633A0] p-4 text-white">
              <p className="text-xs font-medium opacity-70">SUMMARY</p>

              <p className="mt-1 text-2xl font-bold">
                ₹ {Number(paidAmount || 0)}
              </p>

              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">Applied Amount</span>
                  <span>₹ {paidAmount}</span>
                </div>

                <div className="flex justify-between">
                  <span className="opacity-80">
                    Balance Amount (Outstanding)
                  </span>
                  <span
                    className={
                      finalOutstanding > 0
                        ? "text-yellow-300"
                        : "text-green-300"
                    }
                  >
                    ₹ {finalOutstanding}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {state.UsersList.expenseSettleError && (
          <ErrorMessage
            message={state.UsersList.expenseSettleError}
            type="error"
          />
        )}
        <div className="flex justify-end gap-4 my-4 mr-4">
          <button
            onClick={handleClose}
            type="button"
            className="text-[#4B4B4B] text-sm font-medium"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={formLoading}
            onClick={handleSubmit}
            className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${
              formLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {formLoading ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              </>
            ) : (
              <span>Save</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ExpenseSettlement;

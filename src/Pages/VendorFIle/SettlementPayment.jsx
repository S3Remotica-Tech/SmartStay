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

const vendorOptions = [
  { value: "grow-aqua-services", label: "Grow Aqua Services" },
  { value: "vinayaka-electricals", label: "Vinayaka Electricals" },
  { value: "abc-traders", label: "ABC Traders" },
];

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

const paymentOptions = [
  {
    label: "Bank Accounts",
    options: [
      {
        value: "sbi",
        label: "SBI Bank",
        type: "Bank",
        icon: <Bank size={18} color="#1E45E1" />,
      },
    ],
  },
  {
    label: "Linked Payment Methods",
    options: [
      {
        value: "gpay",
        label: "Google Pay",
        type: "UPI",
        icon: <Wallet2 size={18} color="#1E45E1" />,
      },
      {
        value: "phonepe",
        label: "PhonePe",
        type: "UPI",
        icon: <Wallet2 size={18} color="#1E45E1" />,
      },
    ],
  },
];
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
        <span className="text-xs text-[#1E45E1] bg-[#E1EFFE] px-2 py-1 rounded">
          {data.type}
        </span>
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

function SettlementPayment({ show, handleClose }) {
  if (!show) return null;

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [paidAmount, setPaidAmount] = useState("");
  const [paidDate, setPaidDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [description, setDescription] = useState("");

  const [vendorError, setVendorError] = useState("");
  const [paidAmountError, setPaidAmountError] = useState("");
  const [paidDateError, setPaidDateError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");

  const [attachments, setAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);

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

  const handleVendorChange = (selected) => {
    setSelectedVendor(selected);
    setVendorError("");
  };

  const handlePaidAmountChange = (e) => {
    setPaidAmount(e.target.value);
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

    if (!selectedVendor) {
      setVendorError("Vendor is required");
      isValid = false;
    }

    if (!paidAmount) {
      setPaidAmountError("Paid amount is required");
      isValid = false;
    }

    if (!purchaseDate) {
      setPurchaseDateError("Paid date is required");
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodError("Payment method is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = {
      selectedVendor,
      paidAmount,
      purchaseDate,
      paymentMethod,
      transactionId,
      description,
    };

    console.log(payload);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[60]" onClick={handleClose} />

      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div
          className="bg-white rounded-xl shadow-xl w-full max-w-[700px] max-h-[90vh] show-scrolls overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-50 flex items-center  justify-between gap-4 border-b border-[#E5E7EB] bg-white px-4 py-3">
            <h1 className="text-[20px] font-semibold text-[#222222] mb-0">
              Settle Payment
            </h1>
            <Add
              size={24}
              color="#FF0000"
              onClick={handleClose}
              className="cursor-pointer rotate-45"
            />
          </div>

          <div className="grid grid-cols-1  mt-1 px-4 py-2">
            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Vendor/Business Name{" "}
                <span className="text-red-600 text-[20px]">*</span>
              </label>
              <div className="relative">
                <Select
                  value={selectedVendor}
                  onChange={handleVendorChange}
                  options={vendorOptions}
                  placeholder="Select Vendor"
                  className="text-sm"
                  styles={CustomStyles}
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 mb-1">
                Note : Max 50 Characters
              </p>

              {vendorError && (
                <ErrorMessage message={vendorError} type="error" />
              )}
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
                    ₹ 2,000.00
                  </span>
                </p>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={paidAmount}
                  onChange={handlePaidAmountChange}
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    paidAmount ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />
                <button className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
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
                value="₹0.00"
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
                  selected={paidDate}
                  onChange={handleDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
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
            </div>

            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Payment method{" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>
              <Select
                value={paymentMethod}
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
                <p className="mt-1 text-xs text-red-500">
                  {paymentMethodError}
                </p>
              )}
            </div>

            {/* Transaction ID */}
            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Transaction ID
              </label>
              <input
                type="text"
                value={transactionId}
                onChange={handleTransactionIdChange}
                className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                  transactionId ? "font-semibold" : "font-medium"
                } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
              />
            </div>

            {/* Attachments */}
            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Attachments/Proofs (If any)
              </label>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png"
                className="hidden"
                onChange={handleFileChange}
              />

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
            </div>

            {attachments.length > 0 && (
              <div className="grid grid-cols-4 gap-3 mt-3">
                {attachments.map((item, index) => (
                  <div
                    key={index}
                    className="relative border rounded-lg overflow-hidden"
                  >
                    <img
                      src={item.preview}
                      alt="preview"
                      className="h-24 w-full object-cover cursor-pointer"
                      onClick={() => setPreviewImage(item.preview)}
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                    >
                      <Add size={16} color="#FF0000" className="rotate-45" />
                    </button>

                    <div className="p-1">
                      <p className="text-[10px] truncate">{item.file.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {previewImage && (
              <div
                className="fixed inset-0 bg-black/70 z-[999] flex items-center justify-center"
                onClick={() => setPreviewImage(null)}
              >
                <div className="relative max-w-4xl max-h-[90vh] p-4">
                  <img
                    src={previewImage}
                    alt="preview"
                    className="max-h-[85vh] rounded-lg"
                  />

                  <button
                    onClick={() => setPreviewImage(null)}
                    className="absolute top-2 right-2 bg-white rounded-full p-1"
                  >
                    <Add size={24} color="#FF0000" className="rotate-45" />
                  </button>
                </div>
              </div>
            )}
            <div className="mb-2">
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
                } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-0`}
              />
            </div>

            <div className="rounded-xl bg-[#2633A0] p-4 text-white">
              <p className="text-xs font-medium opacity-70">SUMMARY</p>
              <p className="mt-1 text-2xl font-bold">₹ 2,000.00</p>
              <div className="mt-3 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="opacity-80">Paid Amount</span>
                  <span>₹ 2,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-80">
                    Balance Amount (Outstanding)
                  </span>
                  <span>- ₹ 0.00</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 my-10 mr-4">
            <button
              onClick={handleClose}
              type="button"
              className="text-[#4B4B4B] text-sm font-medium"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              type="submit"
              className="bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center gap-1 "
            >
              Settle Payment <ArrowRight size="14" color="#FFFFFF" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SettlementPayment;

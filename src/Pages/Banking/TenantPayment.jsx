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

function TenantPayment({ show, handleClose }) {
  if (!show) return null;
  const [tenant, setTenant] = useState(null);
  const [tenantError, setTenantError] = useState("");

  const [amountReceived, setAmountReceived] = useState(4500);
  const [amountReceivedError, setAmountReceivedError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentDateError, setPaymentDateError] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [description, setDescription] = useState("");

  const [paymentMethodError, setPaymentMethodError] = useState("");

  const [attachments, setAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState({
    name: "",
    index: "",
  });
  const [hoveredImage, setHoveredImage] = useState(null);
  const fileInputRef = useRef(null);

  const [invoiceDetails, setInvoiceDetails] = useState([
    {
      id: 1,
      type: "Rental",
      invoiceNo: "#INV-987",
      dueDate: "11 Dec 2025",
      invoiceDue: 4500,
      amountToApply: 4500,
    },
    {
      id: 2,
      type: "Advance",
      invoiceNo: "#ADV-287",
      dueDate: "12 Dec 2025",
      invoiceDue: 5000,
      amountToApply: "",
    },
  ]);

  const handleAmountApplyChange = (index, value) => {
    const updatedList = [...invoiceDetails];

    updatedList[index].amountToApply = value;

    setInvoiceDetails(updatedList);
  };

  const amountUsedForPayments = invoiceDetails.reduce(
    (sum, item) => sum + (Number(item.amountToApply) || 0),
    0,
  );

  const balance = amountReceived - amountUsedForPayments;

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  const handleTenantChange = (selected) => {
    setTenant(selected);
    setTenantError("");
  };

  const handleAmountReceivedChange = (e) => {
    setAmountReceived(e.target.value);
    setAmountReceivedError("");
  };

  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
    setPaymentDateError("");
  };

  const handleRemoveFile = (index) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePaymentMethodChange = (selected) => {
    setPaymentMethod(selected);
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

    if (!tenant) {
      setTenantError("Tenant is required");
      isValid = false;
    }

    if (!amountReceived) {
      setAmountReceivedError("Amount Received is required");
      isValid = false;
    }

    if (!paymentDate) {
      setPaymentDateError("Date is required");
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodError("Payment Method is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[40]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-fit bg-white rounded-lg shadow-xl z-50 flex flex-col"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
          rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Tenant Payment
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>
        <div className="flex-1 show-scrolls overflow-y-auto">
          <div className="grid grid-cols-1 mx-3">
            <div className="mb-1">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Tenant <span className="text-red-600 text-[20px]">*</span>
              </label>
              <div className="relative">
                <Select
                  value={tenant}
                  onChange={handleTenantChange}
                  //   options={}
                  placeholder="Select Tenant"
                  className="text-sm"
                  styles={CustomStyles}
                />
              </div>

              {tenantError && (
                <ErrorMessage message={tenantError} type="error" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mx-3 ">
            <div className="mb-1">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1 flex justify-between">
                <span>
                  Amount Received (INR){" "}
                  <span className="text-red-500 text-[20px]">*</span>
                </span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={amountReceived}
                  onChange={handleAmountReceivedChange}
                  placeholder="Enter Amount"
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    amountReceived ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />

                {amountReceivedError && (
                  <ErrorMessage message={amountReceivedError} type="error" />
                )}
              </div>
            </div>
            <div className="mb-1">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  selected={paymentDate}
                  onChange={handlePaymentDateChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  className="w-full h-[50px] rounded-[8px] border border-[#D9D9D9] px-3 pr-10 focus:outline-none"
                />

                <Calendar
                  size="20"
                  color="#1E45E1"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              {paymentDateError && (
                <ErrorMessage message={paymentDateError} type="error" />
              )}
            </div>

            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Payment method{" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>
              <Select
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
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

            <div className="mb-2 relative">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Transaction ID{" "}
                <span className="text-transparent select-none text-[20px]">
                  *
                </span>
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
          </div>
          <div className="grid grid-cols-1 mx-3">
            <div className="mb-1">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Notes
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={handleDescriptionChange}
                placeholder="Describe the notes... "
                className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                  description ? "font-semibold" : "font-medium"
                } border border-[#D9D9D9] rounded-[8px] px-3 py-2 focus:outline-none focus:ring-0`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 mx-3">
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
              <div
                className="flex justify-end my-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <label className="text-sm text-[#007AFF] cursor-pointer font-semibold">
                  + Add more Files
                </label>
              </div>
            </div>

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
          </div>

          <div className="grid grid-cols-1 mx-3">
            <label className="text-[#222222] text-[16px] font-semibold mb-2">
              Invoice Details
            </label>
            <div className="border border-[#E5E7EB] rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F9FAFB] border-b border-[#E5E7EB] ">
                    <th className="text-left px-4 py-2 text-[11px] font-semibold text-[#6B7280]">
                      TYPE
                    </th>
                    <th className="text-left px-4 py-2 text-[11px] font-semibold  text-[#6B7280]">
                      INV NO
                    </th>
                    <th className="text-left px-4 py-2 text-[11px] font-semibold  text-[#6B7280]">
                      DUE DATE
                    </th>
                    <th className="text-left px-4 py-2 text-[11px] font-semibold  text-[#6B7280]">
                      INVOICE DUE
                    </th>
                    <th className="text-left px-4 py-2 text-[11px] font-semibold  text-[#6B7280]">
                      AMOUNT TO APPLY
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {invoiceDetails.map((item, index) => (
                    <tr key={item.id} className="border-b border-[#E5E7EB]">
                      <td className="px-4 py-2.5 text-sm font-medium text-[#222222]">
                        {item.type}
                      </td>

                      <td className="px-4 py-2.5">
                        <span className="text-[#1E45E1] text-sm font-medium">
                          {item.invoiceNo}
                        </span>
                      </td>

                      <td className="px-4 py-2.5 text-sm text-[#6B7280]">
                        {item.dueDate}
                      </td>

                      <td className="px-4 py-2.5 text-sm font-semibold text-[#222222]">
                        ₹ {item.invoiceDue.toLocaleString()}
                      </td>

                      <td className="px-4 py-2.5">
                        <input
                          type="number"
                          value={item.amountToApply}
                          onChange={(e) =>
                            handleAmountApplyChange(index, e.target.value)
                          }
                          className="w-[140px] h-[38px] border border-[#D9D9D9] rounded-md px-3 text-sm font-medium focus:outline-none focus:border-[#1E45E1]"
                          placeholder="₹ 0.00"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-end mt-4 mx-3">
            <div className="w-[330px] bg-[#F8F8F8] rounded-md p-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#555]">Amount Received</span>
                <span className="font-semibold">
                  ₹ {amountReceived.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#555]">Amount used for Payments</span>
                <span className="font-semibold">
                  ₹ {amountUsedForPayments.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#555]">Balance</span>
                <span
                  className={`font-semibold ${
                    balance < 0 ? "text-red-500" : "text-[#222222]"
                  }`}
                >
                  ₹ {balance.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 m-3">
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
            Save <ArrowRight size="14" color="#FFFFFF" />
          </button>
        </div>
      </div>
    </>
  );
}

export default TenantPayment;

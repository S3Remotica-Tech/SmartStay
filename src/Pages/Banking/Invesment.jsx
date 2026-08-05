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
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { Wallet3, Card } from "iconsax-react";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "50px",
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
    maxHeight: "200px",
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

// const paymentOptions = [
//   {
//     label: "Bank Accounts",
//     options: [
//       {
//         value: "sbi",
//         label: "SBI Bank",
//         type: "Bank",
//         icon: <Bank size={18} color="#1E45E1" />,
//       },
//     ],
//   },
//   {
//     label: "Linked Payment Methods",
//     options: [
//       {
//         value: "gpay",
//         label: "Google Pay",
//         type: "UPI",
//         icon: <Wallet2 size={18} color="#1E45E1" />,
//       },
//       {
//         value: "phonepe",
//         label: "PhonePe",
//         type: "UPI",
//         icon: <Wallet2 size={18} color="#1E45E1" />,
//       },
//     ],
//   },
// ];

const Option = (props) => {
  const { data } = props;

  return (
    <components.Option {...props}>
      <div className="flex items-center justify-between py-1">
        <div className="flex items-center gap-3">
          <div
            className={`w-9 h-9 rounded-full ${data?.type === "BANK" ? "bg-blue-100" : "bg-green-100"} flex items-center justify-center`}
          >
            {data.icon}
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold text-[#222222]">
              {data.label}
            </span>

            {data.subLabel && (
              <span className="text-xs text-[#6B7280]">{data.subLabel}</span>
            )}
          </div>
        </div>

        <span
          className={`px-2 py-1 rounded-full text-[10px] font-semibold ${
            data.type === "BANK"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
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
        <div className="w-7 h-7 rounded-md bg-[#EEF4FF] flex items-center justify-center">
          {data.icon}
        </div>

        <div className="flex flex-col">
          <span className="text-sm font-medium">{data.label}</span>
          <span className="text-xs text-[#6B7280]">{data.type}</span>
        </div>
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

function Invesment({ show, handleClose, bankDetails }) {
  if (!show) return null;

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [investment, setInvestment] = useState("");
  const [investmentError, setInvestmentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const [paymentDate, setPaymentDate] = useState(null);
  const [paymentDateError, setPaymentDateError] = useState("");

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [paymentMethodError, setPaymentMethodError] = useState("");

  const [transactionId, setTransactionId] = useState("");
  const [transactionIdError, setTransactionIdError] = useState("");

  const [description, setDescription] = useState("");

  const handleInvestmentChange = (e) => {
    setInvestment(e.target.value);
    setInvestmentError("");
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
    setPaymentDateError("");
  };

  const handlePaymentMethodChange = (selected) => {
    setPaymentMethod(selected);
    setPaymentMethodError("");
  };

  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
    setTransactionIdError("");
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const paymentOptions =
    state?.bankingDetails?.newBankingList?.banks?.map((bank) => ({
      value: bank.bankId,
      label: bank.displayName,
      subLabel:
        bank.accountType === "BANK"
          ? `${bank.bankName} `
          : `${bank.cashAccountType} `,
      type: bank.accountType,
      icon:
        bank.accountType === "BANK" ? (
          <Bank color="#1E45E1" size="16" />
        ) : (
          <Wallet2 color="#038C3D" size="16" />
        ),
      data: bank,
    })) || [];

  useEffect(() => {
    if (bankDetails && paymentOptions.length) {
      const selected = paymentOptions.find(
        (option) => option.value === bankDetails,
      );

      setPaymentMethod(selected || null);
    }
  }, [bankDetails, paymentOptions]);

  console.log("bankDetails", bankDetails);

  const validateForm = () => {
    let isValid = true;

    // if (!investment) {
    //   setInvestmentError("Please Enter Investment Name");
    //   isValid = false;
    // }

    if (!amount) {
      setAmountError("Please Enter Amount");
      isValid = false;
    }

    if (!paymentDate) {
      setPaymentDateError("Plese Select Date");
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodError("Please Select Payment Method");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    if (state.login?.selectedHostel_Id) {
      dispatch({
        type: "ADD_MONEY_SAGA",
        payload: {
          hostelId: state.login?.selectedHostel_Id,
          bankId: paymentMethod?.value,
          paymentMethodId: "",
          description: description,
          transactionDate: paymentDate
            ? dayjs(paymentDate).format("YYYY-MM-DD")
            : null,
          amount: Number(amount),
          transactionId: transactionId,
          investorName: investment,
        },
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "BANKING_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state?.bankingDetails?.addMoneySuccess === 200) {
      setLoading(false);
      handleClose();
    }
  }, [state?.bankingDetails?.addMoneySuccess]);

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
            Investment
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
                Investment
              </label>
              <div className="relative">
                <input
                  value={investment}
                  onChange={handleInvestmentChange}
                  type="number"
                  placeholder="Enter Investor Name"
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    investment ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                  onWheel={(e) => e.target.blur()}
                />
              </div>

              {/* {investmentError && (
                <ErrorMessage message={investmentError} type="error" />
              )} */}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mx-3 ">
            <div className="mb-1">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1 ">
                Amount (INR) <span className="text-red-500 text-[20px]">*</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  onWheel={(e) => e.target.blur()}
                  value={amount}
                  onChange={handleAmountChange}
                  placeholder="Enter Amount"
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    amount ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />
                {amountError && (
                  <ErrorMessage message={amountError} type="error" />
                )}
              </div>
            </div>
            <div className="mb-1">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Date <span className="text-red-500 text-[20px]">*</span>
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
          </div>

          <div className="grid grid-cols-2 mx-3 gap-2">
            <div className="mb-2">
              <label className="text-[13px] text-[#222222] font-gilroy font-medium mb-1">
                Payment method{" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>
              <Select
                isDisabled={bankDetails}
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
                <ErrorMessage message={paymentMethodError} type="error" />
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
            type="button"
            disabled={loading}
            className={`px-6 py-2 rounded-[8px] text-sm font-medium flex items-center gap-2 transition-colors ${
              loading
                ? "bg-[#1E45E1]/80 cursor-not-allowed"
                : "bg-[#1E45E1] hover:bg-[#1738BB]"
            } text-white`}
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              <>
                Save
                <ArrowRight size="14" color="#FFFFFF" />
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default Invesment;

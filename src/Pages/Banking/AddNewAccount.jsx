/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";
import { Add, InfoCircle, Verify, Bank, Wallet } from "iconsax-react";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import CreditCardGlobal from "./AddMethod/CreditCardGlobal";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "40px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
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
    fontWeight: 600,
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
    maxHeight: "100px",
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

function AddNewAccount({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);
  const [accountMode, setAccountMode] = useState("BANK");

  const [bankDisplayName, setBankDisplayName] = useState("");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branchName, setBranchName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [accountType, setAccountType] = useState(null);
  const [bankOpeningBalance, setBankOpeningBalance] = useState("");
  const [bankDescription, setBankDescription] = useState("");

  const [cashDisplayName, setCashDisplayName] = useState("");
  const [cashType, setCashType] = useState(null);
  const [responsiblePerson, setResponsiblePerson] = useState(null);
  const [cashOpeningBalance, setCashOpeningBalance] = useState("");
  const [cashDescription, setCashDescription] = useState("");

  const [bankDisplayNameError, setBankDisplayNameError] = useState("");
  const [bankNameError, setBankNameError] = useState("");
  const [holderNameError, setHolderNameError] = useState("");
  const [accountNumberError, setAccountNumberError] = useState("");
  const [branchNameError, setBranchNameError] = useState("");
  const [ifscCodeError, setIfscCodeError] = useState("");
  const [accountTypeError, setAccountTypeError] = useState("");
  const [bankOpeningBalanceError, setBankOpeningBalanceError] = useState("");

  // console.log("bankDisplayNameError", bankDisplayNameError);

  const [cashDisplayNameError, setCashDisplayNameError] = useState("");
  const [cashTypeError, setCashTypeError] = useState("");
  const [responsiblePersonError, setResponsiblePersonError] = useState("");
  const [cashOpeningBalanceError, setCashOpeningBalanceError] = useState("");

  const bankDisplayNameRef = useRef(null);
  const bankNameRef = useRef(null);
  const holderNameRef = useRef(null);
  const accountNumberRef = useRef(null);
  const branchNameRef = useRef(null);
  const ifscCodeRef = useRef(null);
  const accountTypeRef = useRef(null);
  const bankOpeningBalanceRef = useRef(null);

  const cashDisplayNameRef = useRef(null);
  const cashTypeRef = useRef(null);
  const responsiblePersonRef = useRef(null);
  const cashOpeningBalanceRef = useRef(null);

  const accountTypeOptions = [
    { label: "Savings", value: "Savings" },
    { label: "Current", value: "Current" },
  ];

  const cashOptions = [
    { label: "Petty Cash", value: "Petty Cash" },
    { label: "Office Cash", value: "Office Cash" },
  ];

  const userOptions =
    state.bankingDetails?.responsiblepersonList?.map((item) => ({
      label: `${item.firstName} ${item.lastName || ""}`.trim(),
      value: item.userId,
      roleId: item.roleId,
    })) || [];

  //  Bank
  const handleBankDisplayName = (e) => {
    const value = e.target.value;
    // console.log("value.length", value.length);
    setBankDisplayName(value);
    if (value.length > 30) {
      setBankDisplayNameError("Maximum 30 characters allowed");
    } else {
      setBankDisplayNameError("");
    }
  };

  const handleBankName = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");

    setBankName(value);
    setBankNameError("");
  };

  const handleHolderName = (e) => {
    const value = e.target.value.replace(/[^A-Za-z\s]/g, "");

    setHolderName(value);
    setHolderNameError("");
  };

  const handleAccountNumber = (e) => {
    let value = e.target.value;
    value = value.replace(/\s+/g, "");

    if (!/^\d*$/.test(value)) {
      return;
    }

    if (value.length > 18) {
      return;
    }

    setAccountNumber(value);

    if (value.length > 0 && /^0+$/.test(value)) {
      setAccountNumberError("Account Number cannot be all zeros");
      return;
    }

    if (value.length > 0 && (value.length < 9 || value.length > 18)) {
      setAccountNumberError("Account Number must be 9–18 digits");
    } else {
      setAccountNumberError("");
    }
  };

  const handleBranchName = (e) => {
    const value = e.target.value.replace(/[^A-Za-z0-9\s]/g, "");

    setBranchName(value);
    setBranchNameError("");
  };

  const handleIfscCode = (e) => {
    const value = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 11);

    setIfscCode(value);
    setIfscCodeError("");
  };

  const handleAccountType = (selected) => {
    console.log("accountType", selected);
    setAccountType(selected);
    setAccountTypeError("");
  };

  const handleBankOpeningBalance = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    setBankOpeningBalance(value);
    setBankOpeningBalanceError("");
  };

  const handleBankDescription = (e) => {
    setBankDescription(e.target.value);
  };

  //  Cash
  const handleCashDisplayName = (e) => {
    const value = e.target.value;
    setCashDisplayName(value);

    if (value.length > 30) {
      setCashDisplayNameError("Maximum 30 characters allowed");
    } else {
      setCashDisplayNameError("");
    }
  };

  const handleCashType = (selected) => {
    setCashType(selected);
    setCashTypeError("");
  };

  const handleResponsiblePerson = (selected) => {
    setResponsiblePerson(selected);
    setResponsiblePersonError("");
  };

  const handleCashOpeningBalance = (e) => {
    const value = e.target.value
      .replace(/[^0-9.]/g, "")
      .replace(/(\..*)\./g, "$1");

    setCashOpeningBalance(value);
    setCashOpeningBalanceError("");
  };

  const handleCashDescription = (e) => {
    setCashDescription(e.target.value);
  };

  const validateBank = () => {
    let isValid = true;
    let firstErrorRef = null;

    setBankDisplayNameError("");
    setBankNameError("");
    setHolderNameError("");
    setAccountNumberError("");
    setBranchNameError("");
    setIfscCodeError("");
    setAccountTypeError("");
    setBankOpeningBalanceError("");
    const setFirstError = (ref) => {
      if (!firstErrorRef) firstErrorRef = ref;

      isValid = false;
    };

    if (!bankDisplayName.trim()) {
      setBankDisplayNameError("Please Enter Account Name");
      setFirstError(bankDisplayNameRef);
    } else if (bankDisplayName.trim().length > 30) {
      setBankDisplayNameError("Maximum 30 characters allowed");
      setFirstError(bankDisplayNameRef);
    }

    if (!bankName.trim()) {
      setBankNameError("Please Enter Bank Name");
      setFirstError(bankNameRef);
    }

    if (!holderName.trim()) {
      setHolderNameError("Please Enter Holder Name");
      setFirstError(holderNameRef);
    }

    // if (!accountNumber.trim()) {
    //   setAccountNumberError("Please Enter Account Number");
    //   setFirstError(accountNumberRef);
    // }
    if (accountNumber && /^0+$/.test(accountNumber)) {
      setAccountNumberError("Account Number cannot be all zeros");
      setFirstError(accountNumberRef);
    }

    if (
      (accountNumber && accountNumber.length < 9) ||
      accountNumber.length > 18
    ) {
      setAccountNumberError("Account Number must be 9–18 digits");
      setFirstError(accountNumberRef);
    }

    // if (!branchName.trim()) {
    //   setBranchNameError("Please Enter Branch Name");
    //   setFirstError(branchNameRef);
    // }

    // if (!ifscCode.trim()) {
    //   setIfscCodeError("Please Enter IFSC Code");

    //   setFirstError(ifscCodeRef);
    // }

    // if (!accountType?.value) {
    //   setAccountTypeError("Please Select Account Type");
    //   setFirstError(accountTypeRef);
    // }

    if (
      bankOpeningBalance !== "" &&
      !/^(0|[1-9]\d*)(\.\d+)?$/.test(bankOpeningBalance)
    ) {
      setBankOpeningBalanceError("Please enter a valid opening balance");
      setFirstError(bankOpeningBalanceRef);
    }
    if (firstErrorRef?.current) {
      firstErrorRef.current.focus();
      firstErrorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return isValid;
  };

  const handleSubmitBank = () => {
    dispatch({ type: "REMOVE_CREATE_BANKING_ERROR" });
    dispatch({ type: "REMOVE_ADD_BANKING_ERROR" });
    if (!validateBank()) return;
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "ADD_BANKING_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,

          holderName: holderName,
          bankName: bankName,
          displayName: bankDisplayName,
          branchName: branchName,
          accountNo: accountNumber,
          ifscCode: ifscCode,
          description: bankDescription,
          isDefault: true,
          accountType: accountMode,
          bankAccountType: accountType?.value || accountType,
          openingBalance: Number(bankOpeningBalance),
          cashAccountType: "",
          responsiblePerson: "",
        },
      });
      setFormLoading(true);
    }
  };

  const validateCash = () => {
    let isValid = true;
    let firstErrorRef = null;

    setCashDisplayNameError("");
    setCashTypeError("");
    setResponsiblePersonError("");
    setCashOpeningBalanceError("");

    const setFirstError = (ref) => {
      if (!firstErrorRef) firstErrorRef = ref;
      isValid = false;
    };

    if (!cashDisplayName.trim()) {
      setCashDisplayNameError("Please Enter Account Name");
      setFirstError(cashDisplayNameRef);
    } else if (cashDisplayName.trim().length > 30) {
      setCashDisplayNameError("Maximum 30 characters allowed");
      setFirstError(cashDisplayNameRef);
    }

    if (!cashType) {
      setCashTypeError("Please Select Cash Type");
      setFirstError(cashTypeRef);
    }

    // if (!responsiblePerson) {
    //   setResponsiblePersonError("Please Select Responsible Person");
    //   setFirstError(responsiblePersonRef);
    // }

    // if (!cashOpeningBalance) {
    //   setCashOpeningBalanceError("Please Enter Opening Balance");
    //   setFirstError(cashOpeningBalanceRef);
    // } else if (Number(cashOpeningBalance) === 0) {
    //   setCashOpeningBalanceError("Opening Balance cannot be zero");
    //   setFirstError(cashOpeningBalanceRef);
    // }
    if (
      cashOpeningBalance !== "" &&
      !/^(0|[1-9]\d*)(\.\d+)?$/.test(cashOpeningBalance)
    ) {
      setCashOpeningBalanceError("Please enter a valid opening balance");
      setFirstError(cashOpeningBalanceRef);
    }

    if (firstErrorRef?.current) {
      firstErrorRef.current.focus();
      firstErrorRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }

    return isValid;
  };

  const handleSubmitCash = () => {
    dispatch({ type: "REMOVE_CREATE_BANKING_ERROR" });
    dispatch({ type: "REMOVE_ADD_BANKING_ERROR" });
    if (!validateCash()) return;
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "ADD_BANKING_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,

          // holderName: holderName,
          // bankName: bankName,
          displayName: cashDisplayName,
          // branchName: branchName,
          // accountNo: accountNumber,
          // ifscCode: ifscCode,
          description: cashDescription,
          isDefault: true,
          accountType: accountMode,
          // bankAccountType: accountType?.value || accountType,
          openingBalance: Number(cashOpeningBalance),
          cashAccountType: cashType?.value || cashType,
          responsiblePerson: responsiblePerson?.value || responsiblePerson,
        },
      });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.bankingDetails.createBankingError) {
      setFormLoading(false);
    }
  }, [state.bankingDetails.createBankingError]);

  useEffect(() => {
    return () => {
      dispatch({ type: "REMOVE_ADD_BANKING_ERROR" });
    };
  }, []);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "RESPONSIBLE_PERSON_LIST_SAGA",
        payload: state.login.selectedHostel_Id,
      });
    }
  }, []);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForCreateBanking === 201) {
      setFormLoading(false);

      handleClose();
    }
  }, [state.bankingDetails.statusCodeForCreateBanking]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForEditBanking === 200) {
      setFormLoading(false);
      handleClose();
    }
  }, [state.bankingDetails.statusCodeForEditBanking]);

  useEffect(() => {
    if (
      state.createAccount?.networkError ||
      state.bankingDetails.bankingCreateError
    ) {
      setFormLoading(false);

      dispatch({ type: "CLEAR_NETWORK_ERROR" });
    }
  }, [
    state.createAccount?.networkError,
    state.bankingDetails.bankingCreateError,
  ]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  if (!show) return null;

  return (
    <>
      {" "}
      <div className="fixed inset-0 bg-black/40 z-[40]" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-[620px] bg-white rounded-lg shadow-xl z-50 flex flex-col font-gilroy
         border border-gray-50"
      >
        {" "}
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
                rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            Add New Account
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-2 show-scrolls">
          <label className="text-[13px] font-medium text-[#222]">
            Select Type
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div className="flex gap-14 mt-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={accountMode === "BANK"}
                onChange={() => setAccountMode("BANK")}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-[15px]">Bank Account</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={accountMode === "CASH"}
                onChange={() => setAccountMode("CASH")}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-[15px]">Cash Account</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                checked={accountMode === "CREDIT"}
                onChange={() => setAccountMode("CREDIT")}
                className="h-4 w-4 accent-blue-600"
              />

              <span className="text-[15px]">Credit Card </span>
            </label>
          </div>

          {accountMode === "BANK" && (
            <>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-5">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Name / Display Name{" "}
                      <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        ref={bankDisplayNameRef}
                        value={bankDisplayName}
                        onChange={handleBankDisplayName}
                        placeholder="Enter Account Name"
                        maxLength={30}
                        className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 pr-32 text-[14px] focus:border-blue-500 outline-none"
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 pointer-events-none">
                        Max 30 Characters
                      </span>
                    </div>
                    {bankDisplayNameError && (
                      <ErrorMessage
                        message={bankDisplayNameError}
                        type="error"
                      />
                    )}
                    <div className="text-xs text-[#505F76] my-2">
                      This will reflect on Card Title, put a name as for your
                      better understanding <br />( E.g : AXIS BANK - Owner Acc )
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Bank Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      ref={bankNameRef}
                      value={bankName}
                      onChange={handleBankName}
                      placeholder="Enter Bank Name"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />

                    {bankNameError && (
                      <ErrorMessage message={bankNameError} type="error" />
                    )}
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Acc Holder Name <span className="text-red-500">*</span>
                    </label>

                    <input
                      type="text"
                      ref={holderNameRef}
                      value={holderName}
                      onChange={handleHolderName}
                      placeholder="Enter Holder Name"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                    {holderNameError && (
                      <ErrorMessage message={holderNameError} type="error" />
                    )}
                  </div>
                </div>
              </div>

              <div className="">
                <div className="grid grid-cols-2 gap-5 my-2">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Number
                    </label>

                    <input
                      type="number"
                      ref={accountNumberRef}
                      value={accountNumber}
                      onChange={handleAccountNumber}
                      onWheel={(e) => e.target.blur()}
                      placeholder="Enter Account Number"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                    {accountNumberError && (
                      <ErrorMessage message={accountNumberError} type="error" />
                    )}
                  </div>
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Bank Branch Name
                    </label>

                    <input
                      type="text"
                      ref={branchNameRef}
                      value={branchName}
                      onChange={handleBranchName}
                      placeholder="Enter Branch Name"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                    {branchNameError && (
                      <ErrorMessage message={branchNameError} type="error" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5 my-2">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      IFSC Code
                    </label>

                    <input
                      type="text"
                      ref={ifscCodeRef}
                      value={ifscCode}
                      onChange={handleIfscCode}
                      placeholder="Enter IFSC Code"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 uppercase text-[14px] focus:border-blue-500 outline-none"
                    />
                    {ifscCodeError && (
                      <ErrorMessage message={ifscCodeError} type="error" />
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Type
                    </label>

                    <Select
                      value={accountType}
                      ref={accountTypeRef}
                      onChange={handleAccountType}
                      options={accountTypeOptions}
                      placeholder="Select Account Type"
                      styles={CustomStyles}
                    />
                    {accountTypeError && (
                      <ErrorMessage message={accountTypeError} type="error" />
                    )}
                  </div>
                </div>
                <div className="rounded-md bg-[#F3F9FF] px-4 py-3">
                  <div className="flex items-center gap-2 text-[#1E45E1]">
                    <InfoCircle size="18" variant="Bold" />
                    <span className="text-[14px] font-medium">
                      Why do we need these details?
                    </span>
                  </div>
                  <div className="mt-2 space-y-2 pl-7 text-[12px] leading-4 text-[#4B78D1]">
                    <p>
                      Your bank details are only used to display payment
                      information on tenant invoices and receipts, helping
                      tenants transfer rent directly to your account.
                    </p>

                    <p>
                      SmartStay does not access, verify, or perform transactions
                      from your bank account.
                    </p>
                  </div>
                </div>
                <div className="my-2">
                  <label className="block text-[14px] font-medium text-[#222] mb-2">
                    Current Opening Balance{" "}
                  </label>

                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]">
                      ₹
                    </span>

                    <input
                      type="number"
                      ref={bankOpeningBalanceRef}
                      value={bankOpeningBalance}
                      onChange={handleBankOpeningBalance}
                      onWheel={(e) => e.target.blur()}
                      placeholder="0.00"
                      className="w-full h-11 rounded-lg border border-[#D9D9D9] pl-9 pr-4 text-[14px] focus:border-blue-500 outline-none"
                    />
                  </div>
                  {bankOpeningBalanceError && (
                    <ErrorMessage
                      message={bankOpeningBalanceError}
                      type="error"
                    />
                  )}
                  <div className="text-xs text-[#505F76] my-2">
                    Note: This amount sets your current opening balance.
                    Double-check this figure, as an incorrect balance will
                    miscalculate the final total.
                  </div>
                </div>

                <div className="my-2">
                  <label className="block text-[14px] font-medium text-[#222] mb-2">
                    Description / Remarks
                  </label>

                  <textarea
                    rows={5}
                    value={bankDescription}
                    onChange={handleBankDescription}
                    placeholder="Write here..."
                    className="w-full rounded-lg border border-[#D9D9D9] p-4 resize-none text-[14px] focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="rounded-lg bg-[#39358F] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-h-[120px] flex-1 flex-col justify-between py-1">
                      <div>
                        <Verify size="22" variant="Bold" color="#BFC5FF" />

                        <p className="my-1 text-[15px] font-semibold text-white">
                          Card preview
                        </p>

                        <p className="my-1 max-w-[150px] text-[11px] leading-4 text-[#D9DBFF]">
                          This is a sample Card for
                          <br />
                          Smartstay Banking list
                        </p>
                      </div>
                    </div>

                    <div className="w-[58%] rounded-lg bg-white p-3 shadow-sm">
                      <div className="flex items-start gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF]">
                          <Bank size="16" variant="Bold" color="#5363C8" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-[#333333] mb-0">
                            {bankName || "Canara Bank"}
                          </p>

                          <p className="text-[10px] text-[#8A8A8A]">
                            {accountType?.value || "Bank Account"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-0 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[16px] font-semibold text-[#333333]">
                            ₹{bankOpeningBalance || "00.00"}
                          </span>
                          <span>Balance</span>
                        </div>
                        <InfoCircle
                          size="14"
                          variant="Outline"
                          color="#9CA3AF"
                        />
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        <span className="rounded-md bg-[#FFF5E5] px-2 py-1 text-[9px] font-medium text-[#B87900]">
                          {branchName || "Branch Name"}
                        </span>

                        <span className="rounded-md bg-[#EEF2FF] px-2 py-1 text-[9px] font-medium text-[#5363C8]">
                          UPI: imman@sbi
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {state.bankingDetails.bankingCreateError && (
                <div className="flex content-center mt-1 mb-1">
                  <ErrorMessage
                    message={state.bankingDetails.bankingCreateError}
                    type="error"
                  />
                </div>
              )}
              <div className="flex justify-end gap-4 my-2 mr-4">
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
                  onClick={handleSubmitBank}
                  className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${formLoading ? "opacity-70 cursor-not-allowed" : ""
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
                    <span>Create</span>
                  )}
                </button>
              </div>
            </>
          )}

          {accountMode === "CASH" && (
            <>
              <div className="mt-4 space-y-4">
                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Account Name / Display Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={cashDisplayName}
                        onChange={handleCashDisplayName}
                        ref={cashDisplayNameRef}
                        placeholder="Enter Account Name"
                        maxLength={30}
                        className="w-full h-11 rounded-lg border border-[#D9D9D9] px-4 text-[14px] outline-none focus:border-[#2F54EB]"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-gray-400 pointer-events-none">
                        Max 30 Characters
                      </span>
                    </div>

                    {cashDisplayNameError && (
                      <ErrorMessage
                        message={cashDisplayNameError}
                        type="error"
                      />
                    )}
                    <div className="text-xs text-[#505F76] my-2">
                      This will reflect on Card Title, put a name as for your
                      better understanding <br />( E.g : AXIS BANK - Owner Acc )
                    </div>
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Cash Account Type <span className="text-red-500">*</span>
                    </label>

                    <Select
                      value={cashType}
                      onChange={handleCashType}
                      options={cashOptions}
                      placeholder="Select Cash Type"
                      styles={CustomStyles}
                      ref={cashTypeRef}
                    />
                    {cashTypeError && (
                      <ErrorMessage message={cashTypeError} type="error" />
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Responsible Person
                    </label>

                    <Select
                      value={responsiblePerson}
                      onChange={handleResponsiblePerson}
                      options={userOptions}
                      placeholder="Select Responsible Person"
                      styles={CustomStyles}
                      ref={responsiblePersonRef}
                    />
                    {responsiblePersonError && (
                      <ErrorMessage
                        message={responsiblePersonError}
                        type="error"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-[14px] font-medium text-[#222] mb-2">
                      Current Opening Balance (Cash){" "}
                    </label>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                        ₹
                      </span>

                      <input
                        type="number"
                        value={cashOpeningBalance}
                        ref={cashOpeningBalanceRef}
                        onChange={handleCashOpeningBalance}
                        onWheel={(e) => e.target.blur()}
                        placeholder="0.00"
                        className="w-full h-11 rounded-lg border border-[#D9D9D9] pl-9 pr-4 text-[14px] outline-none focus:border-[#2F54EB]"
                      />
                    </div>
                    {cashOpeningBalanceError && (
                      <ErrorMessage
                        message={cashOpeningBalanceError}
                        type="error"
                      />
                    )}
                    <div className="text-xs text-[#505F76] my-1">
                      Important: This amount sets your current opening balance.
                      Double-check this figure, as an incorrect balance will
                      miscalculate the final total.
                    </div>
                  </div>
                </div>

                <div className="my-2">
                  <label className="block text-[14px] font-medium text-[#222] mb-2">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={cashDescription}
                    onChange={handleCashDescription}
                    placeholder="Write here..."
                    className="w-full rounded-lg border border-[#D9D9D9] p-4 text-[14px] resize-none outline-none focus:border-[#2F54EB]"
                  />
                </div>
                <div className="rounded-lg bg-[#39358F] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex min-h-[120px] flex-1 flex-col justify-between py-1">
                      <div>
                        <Verify size="22" variant="Bold" color="#BFC5FF" />

                        <p className="my-1 text-[15px] font-semibold text-white">
                          Card preview
                        </p>

                        <p className="my-1 max-w-[150px] text-[11px] leading-4 text-[#D9DBFF]">
                          This is a sample Card for
                          <br />
                          Smartstay Banking list
                        </p>
                      </div>
                    </div>

                    <div className="w-[58%] rounded-lg bg-white p-3 shadow-sm">
                      <div className="flex items-start gap-2">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100">
                          <Wallet size="16" variant="Bold" color="#038C3D" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[13px] font-semibold text-[#333333] mb-0">
                            {cashType?.value || ""}
                          </p>

                          <p className="text-[10px] text-[#8A8A8A]">
                            {"Cash Account"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-0 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="text-[16px] font-semibold text-[#333333]">
                            ₹{cashOpeningBalance || "00.00"}
                          </span>
                          <span>Balance</span>
                        </div>
                        <InfoCircle
                          size="14"
                          variant="Outline"
                          color="#9CA3AF"
                        />
                      </div>

                      <div className="mt-1 flex items-center gap-2">
                        {responsiblePerson && (
                          <span className="rounded-md bg-[#FFF5E5] px-2 py-1 text-[9px] font-medium text-[#B87900]">
                            {responsiblePerson?.label || ""}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {state.bankingDetails.bankingCreateError && (
                <div className="flex content-center mt-1 mb-1">
                  <ErrorMessage
                    message={state.bankingDetails.bankingCreateError}
                    type="error"
                  />
                </div>
              )}
              <div className="flex justify-end gap-4 my-2 mr-4">
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
                  onClick={handleSubmitCash}
                  className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${formLoading ? "opacity-70 cursor-not-allowed" : ""
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
                    <span>Create</span>
                  )}
                </button>
              </div>
            </>
          )}



          {accountMode === "CREDIT" && (
            <CreditCardGlobal handleClose={handleClose} />
          )}
        </div>
      </div>
    </>
  );
}
AddNewAccount.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default AddNewAccount;

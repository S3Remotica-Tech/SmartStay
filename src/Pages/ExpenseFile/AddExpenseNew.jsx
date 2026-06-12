/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle, Add, More } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Warning2 } from "iconsax-react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "45px",
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

const CustomStylesCode = {
  control: (base, state) => ({
    ...base,
    minHeight: "40px",
    height: "35px",
    // border: "1px solid #D9D9D9",
    border: "none",

    // borderTopLeftRadius: "8px",
    // borderBottomLeftRadius: "8px",
    // borderTopRightRadius: "0",
    // borderBottomRightRadius: "0",

    fontSize: "15px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: "#FFF",
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

const indianStates = [
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
  {
    value: "Andaman and Nicobar Islands",
    label: "Andaman and Nicobar Islands",
  },
  { value: "Chandigarh", label: "Chandigarh" },
  {
    value: "Dadra and Nagar Haveli and Daman and Diu",
    label: "Dadra and Nagar Haveli and Daman and Diu",
  },
  { value: "Delhi", label: "Delhi" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Puducherry", label: "Puducherry" },
];

const paidThroughOptions = [
  {
    value: "sbi",
    label: "SBI Bank (Navaur Branch)",
  },
  {
    value: "hdfc",
    label: "HDFC Bank",
  },
];

const paymentMethodOptions = [
  {
    value: "gpay",
    label: "Gpay UPI",
  },
  {
    value: "cash",
    label: "Cash",
  },
  {
    value: "bank_transfer",
    label: "Bank Transfer",
  },
];

const unitOptions = [
  { value: "Nos", label: "Nos" },
  { value: "Packet", label: "Packet" },
  { value: "Kg", label: "Kg" },
  { value: "Litre", label: "Litre" },
];
function AddExpenseNew() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [expenseTitle, setExpenseTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [purchaseDate, setPurchaseDate] = useState(null);
  const [purchaseDateError, setPurchaseDateError] = useState("");
  const [linkVendor, setLinkVendor] = useState(true);
  const [paidThrough, setPaidThrough] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [description, setDescription] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [expenseTitleError, setExpenseTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [amountError, setAmountError] = useState("");
  const [discountType, setDiscountType] = useState("amount");
  const [vendor, setVendor] = useState(null);
  const [vendorError, setVendorError] = useState("");

  const [paymentStatus, setPaymentStatus] = useState("Fully Paid");
  const [paymentStatusError, setPaymentStatusError] = useState("");

  const [paidAmount, setPaidAmount] = useState("");
  const [paidAmountError, setPaidAmountError] = useState("");

  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceAmountError, setBalanceAmountError] = useState("");

  const [expenseItems, setExpenseItems] = useState([
    {
      itemName: "LED Tube Light",
      quantity: 10,
      unit: { value: "Nos", label: "Nos" },
      price: 150,
      amount: 1500,
    },
  ]);

  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paidThroughError, setPaidThroughError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");

  const { isBankingWayTrigger, currentItem } = location?.state;

  const expenseTitleRef = useRef(null);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const amountRef = useRef(null);
  const expenseDateRef = useRef(null);
  const paidThroughRef = useRef(null);
  const paymentMethodRef = useRef(null);

  const handleVendorChange = (selected) => {
    setVendor(selected);

    if (selected) {
      setVendorError("");
    }
  };

  const handlePaidAmountChange = (e) => {
    const value = e.target.value;

    setPaidAmount(value);

    if (!value.trim()) {
      setPaidAmountError("Paid amount is required");
    } else {
      setPaidAmountError("");
    }
  };

  const handleBalanceAmountChange = (e) => {
    const value = e.target.value;

    setBalanceAmount(value);

    if (!value.trim()) {
      setBalanceAmountError("Balance amount is required");
    } else {
      setBalanceAmountError("");
    }
  };

  const handleClose = () => {
    if (isBankingWayTrigger) {
      navigate(`/banking/new/${state.login.selectedHostel_Id}`);
    } else {
      navigate(`/expense/new/${state.login.selectedHostel_Id}`);
    }
  };

  const handleExpenseTitle = (e) => {
    setExpenseTitle(e.target.value);
    setExpenseTitleError("");
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
    setAmountError("");
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setCategoryError("");
  };

  const handleSubCategory = (e) => {
    setSubCategory(e.target.value);
    setSubCategoryError("");
  };

  const handleDescription = (e) => {
    setDescription(e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...expenseItems];

    updated[index][field] = value;

    const qty = Number(updated[index].quantity || 0);
    const price = Number(updated[index].price || 0);

    updated[index].amount = qty * price;

    setExpenseItems(updated);
  };

  const addNewRow = () => {
    setExpenseItems([
      ...expenseItems,
      {
        itemName: "",
        quantity: "",
        unit: null,
        price: "",
        amount: 0,
      },
    ]);
  };

  const removeRow = (index) => {
    setExpenseItems(expenseItems.filter((_, i) => i !== index));
  };

  const subTotal = expenseItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const taxAmount = (subTotal * Number(tax || 0)) / 100;
  const discountAmount =
    discountType === "percent"
      ? (subTotal * Number(discount || 0)) / 100
      : Number(discount || 0);
  //   const discountAmount = (subTotal * Number(discount || 0)) / 100;

  const totalAmount = subTotal + taxAmount - discountAmount;

  const validate = () => {
    let isValid = true;

    if (!expenseTitle.trim()) {
      setExpenseTitleError("Please Enter Expense Title ");
      isValid = false;
    }

    if (!category) {
      setCategoryError("Please Select Category");
      isValid = false;
    }

    if (!subCategory) {
      setSubCategoryError("Please Select Sub Category ");
      isValid = false;
    }

    if (!amount) {
      setAmountError("Please Enter Amount ");
      isValid = false;
    }

    if (!purchaseDate) {
      setPurchaseDateError("Please Select Expense Date ");
      isValid = false;
    }

    // if (!paidThrough) {
    //   setPaidThroughError("Select Paid Through");
    //   isValid = false;
    // }

    if (!vendor) {
      setVendorError("Please select a vendor");
      isValid = false;
    }

    if (!paymentStatus) {
      setPaymentStatusError("Please select payment status");
      isValid = false;
    }

    if (!paidAmount.trim()) {
      setPaidAmountError("Paid amount is required");
      isValid = false;
    }

    if (!balanceAmount.trim()) {
      setBalanceAmountError("Balance amount is required");
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodError("Select Payment Method");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = {
      expenseTitle,
      category,
      subCategory,
      amount,
      purchaseDate,
      linkVendor,
      paidThrough,
      paymentMethod,
      description,
    };

    console.log(payload);
  };
  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div className="block relative font-gilroy ">
      <div className="relative w-full  bg-white ">
        <div className="flex items-center justify-between  p-2">
          <h2 className="text-[18px] text-[#222222] font-gilroy font-semibold">
            {currentItem ? "Edit Expense" : "Add Expense"}
          </h2>

          <button
            onClick={handleClose}
            className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 items-center px-2 py-1 font-gilroy "
          >
            <Add
              size="24"
              color="#FF0000"
              className="cursor-pointer rotate-45"
            />{" "}
            Close
          </button>
        </div>
        <div className="max-h-[600px] overflow-y-scroll pt-2 mt-2 mr-3 show-scrolls">
          <h5 className="flex items-center text-[18px] font-semibold text-[#222222]">
            <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
            Expense Details
          </h5>

          <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-4">
            <div className="col-span-8">
              <label className="block mb-2 text-[13px] font-medium text-[#222]">
                Expense Title{" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>

              <input
                type="text"
                value={expenseTitle}
                onChange={handleExpenseTitle}
                placeholder="Enter Expense Name"
                className={`w-full h-[48px] px-3 rounded-lg border ${
                  expenseTitleError ? "border-red-500" : "border-[#D9D9D9]"
                } outline-none`}
              />

              {expenseTitleError && (
                <ErrorMessage message={expenseTitleError} type="error" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
            <div className="col-span-4">
              <label className="block mb-2 text-[13px] font-medium">
                Category <span className="text-red-500 text-[20px]">*</span>
              </label>

              <div ref={categoryRef}>
                <Select
                  value={category}
                  onChange={handleCategory}
                  //   options={categoryOptions}
                  placeholder="Select"
                  styles={CustomStyles}
                />
              </div>

              {categoryError && (
                <ErrorMessage message={categoryError} type="error" />
              )}
            </div>
            <div className="lg:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Sub Category <span className="text-red-500 text-[20px]">*</span>
              </label>

              <Select
                // options={vendorCategoryOptions}
                value={subCategory}
                onChange={handleSubCategory}
                placeholder="Select"
                classNamePrefix="custom"
                styles={CustomStyles}
              />
              {subCategoryError && (
                <ErrorMessage message={subCategoryError} type="error" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-12 gap-x-4 gap-y-3">
            <div className="lg:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Total Amount (INR)
                  <span className="text-red-500 text-[20px]">*</span>
                </label>

                <input
                  value={amount}
                  onChange={handleAmount}
                  type="text"
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
            <div className="lg:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Purchase Date
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <div className="relative">
                <DatePicker
                  selected={purchaseDate}
                  onChange={(date) => {
                    setPurchaseDate(date);
                    setPurchaseDateError("");
                  }}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select Date"
                  className={`w-full h-[50px] rounded-[8px] border px-3 pr-10 text-[15px]
      ${
        purchaseDateError ? "border-red-500" : "border-[#D9D9D9]"
      } focus:outline-none`}
                />

                <Calendar
                  size="20"
                  color="#1E45E1"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>

              {purchaseDateError && (
                <ErrorMessage message={purchaseDateError} type="error" />
              )}
            </div>
          </div>
          <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-4">
            <div className="col-span-8 flex items-center justify-between">
              <div className="">
                <label className="block mb-2 text-[13px] text-[#222222] font-medium">
                  Link this Expense to a Vendor?
                </label>
              </div>

              <div className="flex justify-center">
                <div className="flex bg-[#F3F4F6] rounded-lg p-1">
                  <button
                    type="button"
                    onClick={() => setLinkVendor(false)}
                    className={`px-6 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                      !linkVendor
                        ? "bg-[#1E45E1] text-white shadow-sm"
                        : "text-[#4B4B4B]"
                    }`}
                  >
                    No
                  </button>

                  <button
                    type="button"
                    onClick={() => setLinkVendor(true)}
                    className={`px-6 py-1.5 rounded-md text-[13px] font-medium transition-all ${
                      linkVendor
                        ? "bg-[#1E45E1] text-white shadow-sm"
                        : "text-[#4B4B4B]"
                    }`}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
            <div className="col-span-8 mt-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-medium">
                Paid Through
                <span className="text-red-500 ml-1">*</span>
              </label>

              <Select
                value={paidThrough}
                onChange={(selected) => {
                  setPaidThrough(selected);
                  setPaidThroughError("");
                }}
                options={paidThroughOptions}
                placeholder="Select"
                styles={CustomStyles}
              />

              {paidThroughError && (
                <ErrorMessage message={paidThroughError} type="error" />
              )}
            </div>
          </div> */}
          {linkVendor && (
            <div className="mb-2">
              <div className="grid grid-cols-12 gap-x-4 gap-y-3 mb-2">
                <div className="lg:col-span-8">
                  <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                    Vendor
                    <span className="text-red-600 text-[20px]">*</span>
                  </label>

                  <Select
                    // options={vendorCategoryOptions}
                    value={vendor}
                    onChange={handleVendorChange}
                    placeholder="Select"
                    classNamePrefix="custom"
                    styles={CustomStyles}
                  />
                  {vendorError && (
                    <ErrorMessage message={vendorError} type="error" />
                  )}
                </div>
              </div>

              <div className="mb-2">
                <label className="text-[13px] font-medium text-[#1A1C21]">
                  Payment Status <span className="text-red-500">*</span>
                </label>

                <div className="flex gap-6 mt-3">
                  {["Fully Paid", "Partially Paid", "Credit/Pending"].map(
                    (item) => (
                      <label
                        key={item}
                        className="flex items-center gap-2 text-[13px] text-[#4B5563]"
                      >
                        <input
                          type="radio"
                          name="paymentType"
                          value={item}
                          checked={paymentStatus === item}
                          onChange={(e) => {
                            setPaymentStatus(e.target.value);
                            setPaymentStatusError("");
                          }}
                          className="accent-blue-600"
                        />
                        {item}
                      </label>
                    ),
                  )}
                </div>

                {paymentStatusError && (
                  <ErrorMessage message={paymentStatusError} type="error" />
                )}
              </div>
              <div className="grid grid-cols-12 gap-x-4 gap-y-3">
                <div className="lg:col-span-4">
                  <div>
                    <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                      Paid Amount (INR){" "}
                      <span className="text-red-500 text-[20px]">*</span>
                    </label>

                    <input
                      type="text"
                      value={paidAmount}
                      onChange={handlePaidAmountChange}
                      placeholder="Enter Paid Amount"
                      className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                        paidAmount ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                    />

                    {paidAmountError && (
                      <ErrorMessage message={paidAmountError} type="error" />
                    )}
                  </div>
                </div>
                <div className="lg:col-span-4">
                  <div>
                    <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                      Balance Amount (Outstanding){" "}
                      <span className="text-transparent select-none text-[20px]">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      value={balanceAmount}
                      onChange={handleBalanceAmountChange}
                      placeholder="Enter Balance Amount"
                      className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                        balanceAmount ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                    />

                    {balanceAmountError && (
                      <ErrorMessage message={balanceAmountError} type="error" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div>
            <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
              <div className="col-span-8">
                <label className="block mb-2 text-[13px] text-[#222222] font-medium">
                  Payment Method
                  <span className="text-red-500 ml-1">*</span>
                </label>

                <Select
                  value={paymentMethod}
                  onChange={(selected) => {
                    setPaymentMethod(selected);
                    setPaymentMethodError("");
                  }}
                  options={paymentMethodOptions}
                  placeholder="Select Payment Method"
                  styles={CustomStyles}
                />

                {paymentMethodError && (
                  <ErrorMessage message={paymentMethodError} type="error" />
                )}
              </div>
            </div>
            <div className="grid grid-cols-12 gap-x-4 gap-y-3 mt-2">
              <div className="col-span-8">
                <label className="block mb-2 text-[13px] text-[#222222] font-medium">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={handleDescription}
                  rows={4}
                  placeholder="Ex : Wifi Bill Paid for May"
                  className="w-full rounded-lg border border-[#D9D9D9] px-3 py-3 text-[14px] text-[#4B4B4B] resize-none focus:outline-none focus:border-[#1E45E1]"
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h5 className="flex items-center text-[18px] font-semibold text-[#222222] mb-1">
              <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
              Expense Items
            </h5>

            <p className="text-xs text-[#6B7280] mb-4">
              Select Retainer Balance to adjust with Bills
            </p>

            <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
              <div
                id="tableContainer"
                className="overflow-auto relative  rounded-xl show-scrolls"
              >
                <table className=" w-full font-gilroy ">
                  <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
                    <tr className="bg-[#F9FAFB] text-left text-xs text-[#6B7280] rounded-xl">
                      <th className="p-2 border border-[#F9FAFB] rounded-t-lg">
                        ITEM DETAILS
                      </th>
                      <th className="p-2 w-[100px] border border-[#F9FAFB]">
                        QUANTITY
                      </th>
                      <th className="p-2 w-[140px] border border-[#F9FAFB]">
                        UNIT
                      </th>
                      <th className="p-2 w-[140px] border border-[#F9FAFB]">
                        PER UNIT PRICE
                      </th>
                      <th className="p-2 w-[140px] border border-[#F9FAFB]">
                        AMOUNT
                      </th>
                      <th className="p-2 w-[80px] text-center border border-[#F9FAFB] rounded-r-lg">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {expenseItems.map((item, index) => (
                      <tr key={index} className="border border-[#F9FAFB]">
                        <td className="p-2  border border-[#F9FAFB]">
                          <input
                            value={item.itemName}
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "itemName",
                                e.target.value,
                              )
                            }
                            placeholder="Enter Item Name"
                            className="w-full  outline-none text-sm rounded-md"
                          />
                        </td>

                        <td className="p-2 border border-[#F9FAFB]">
                          <input
                            type="number"
                            value={item.quantity}
                            placeholder="Enter "
                            onChange={(e) =>
                              handleItemChange(
                                index,
                                "quantity",
                                e.target.value,
                              )
                            }
                            className="w-full  outline-none text-sm rounded-md"
                          />
                        </td>

                        <td className="p-2">
                          <Select
                            value={item.unit}
                            options={unitOptions}
                            styles={CustomStylesCode}
                            menuPlacement="bottom"
                            placeholder="Select"
                            onChange={(selected) =>
                              handleItemChange(index, "unit", selected)
                            }
                          />
                        </td>

                        <td className="p-2 border border-[#F9FAFB]">
                          <input
                            type="number"
                            value={item.price}
                            placeholder="₹0.00"
                            onChange={(e) =>
                              handleItemChange(index, "price", e.target.value)
                            }
                            className="w-full  outline-none text-sm rounded-md"
                          />
                        </td>

                        <td className="p-2 text-sm font-medium border border-[#F9FAFB]">
                          ₹ {item.amount.toLocaleString("en-IN")}
                        </td>

                        <td className="p-2 text-center ">
                          <button onClick={() => removeRow(index)}>
                            <Add
                              size="18"
                              color="#EF4444"
                              className="cursor-pointer rotate-45"
                            />
                          </button>
                          <button>
                            <More
                              color="#28303F"
                              size="16"
                              variant="Outline"
                              className="cursor-pointer rotate-90"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="flex justify-between">
              <div>
                <button
                  onClick={addNewRow}
                  className="mt-4 bg-[#EEF2FF] text-[#1E45E1] w-fit  whitespace-nowrap
               text-sm font-medium px-4 py-2 rounded-lg"
                >
                  + Add New Row
                </button>
              </div>
              <div className="w-full">
                <div className="flex justify-end  mt-6 me-6 ">
                  <div className="w-[320px] space-y-3 p-4 rounded-md  bg-[#FAFAFA] ">
                    <div className="flex justify-between">
                      <span className="text-sm">Sub Total</span>
                      <span>₹ {subTotal.toLocaleString("en-IN")}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tax Optional</span>

                      <input
                        type="number"
                        value={tax}
                        onChange={(e) => setTax(e.target.value)}
                        className="w-[100px] h-[36px] border border-[#D9D9D9] outline-none text-sm rounded-md px-2"
                      />
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#222222]">
                          Discount
                        </span>

                        <div className="flex border border-[#D9D9D9] rounded-md overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setDiscountType("amount")}
                            className={`px-3 py-1 text-sm font-medium transition-all ${
                              discountType === "amount"
                                ? "bg-[#1E45E1] text-[#FFFFFF] border-[#1E45E1]"
                                : "bg-[#EAEEFF] text-[#222222] border-[#EAEEFF]"
                            }`}
                          >
                            ₹
                          </button>

                          <button
                            type="button"
                            onClick={() => setDiscountType("percent")}
                            className={`px-3 py-1 text-sm font-medium border-l  transition-all ${
                              discountType === "percent"
                                ? "bg-[#1E45E1] text-[#FFFFFF] border-[#1E45E1]"
                                : "bg-[#EAEEFF] text-[#222222] border-[#EAEEFF]"
                            }`}
                          >
                            %
                          </button>
                        </div>
                      </div>

                      <input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        placeholder={
                          discountType === "amount" ? "Amount" : "Percentage"
                        }
                        className="w-[100px] h-[36px] border border-[#D9D9D9] outline-none text-sm rounded-md px-2"
                      />
                    </div>

                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span className="text-sm">TOTAL RETAINER AMOUNT</span>

                      <span className="text-sm">
                        ₹ {totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
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
              className="bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium"
            >
              Save & Alocate
            </button>
          </div>

          {formLoading && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
              <div className="w-[40px] h-[40px] rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AddExpenseNew.propTypes = {
  show: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
};

export default AddExpenseNew;

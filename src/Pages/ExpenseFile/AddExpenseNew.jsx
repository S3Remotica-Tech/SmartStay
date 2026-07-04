/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle, Add, More, DocumentUpload } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { Warning2 } from "iconsax-react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "iconsax-react";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "50px",
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
    fontFamily: "Gilroy",
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
      fontFamily: "Gilroy",
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

function AddExpenseNew() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isBankingWayTrigger = location.state?.isBankingWayTrigger ?? false;
  const currentItem = location?.state?.currentItem;
  const isVendorOverViewWay = location.state?.isVendorOverViewWay;
  const selectedVendorId = location.state?.selectedVendorId;

  console.log("selectedVendorId", selectedVendorId);

  const [errors, setErrors] = useState({
    totalAmount: "",
    paidAmount: "",
    balanceAmount: "",
    tax: "",
    discount: "",
  });
  const [expenseItemErrors, setExpenseItemErrors] = useState([]);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [paidThroughError, setPaidThroughError] = useState("");
  const [paymentMethodError, setPaymentMethodError] = useState("");
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
  const [vendor, setVendor] = useState("");
  const [vendorError, setVendorError] = useState("");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");
  const [paymentStatusError, setPaymentStatusError] = useState("");
  const [creditPeriod, setCreditPeriod] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [paidAmountError, setPaidAmountError] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedImageName, setSelectedImageName] = useState({
    name: "",
    index: "",
  });

  console.log("vendor", vendor);

  const expenseTitleRef = useRef(null);
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);
  const amountRef = useRef(null);
  const purchaseDateRef = useRef(null);
  const vendorRef = useRef(null);
  const paymentStatusRef = useRef(null);
  const paidAmountRef = useRef(null);
  const paymentMethodRef = useRef(null);

  // console.log("amount", amount);

  const [hoveredImage, setHoveredImage] = useState(null);
  const fileInputRef = useRef(null);
  const [balanceAmount, setBalanceAmount] = useState("");
  const [balanceAmountError, setBalanceAmountError] = useState("");
  const balanceAmountFor = Number(amount || 0) - Number(paidAmount || 0);

  // console.log("attachments", attachments);

  useEffect(() => {
    const balance = Number(amount || 0) - Number(paidAmount || 0);
    setBalanceAmount(balance);
  }, [amount, paidAmount]);

  const isAvailablePaid =
    paymentStatus === "Full" || paymentStatus === "Partial";

  // const vendorOptions =
  //   state.ComplianceList?.VendorList?.map((vendor) => ({
  //     value: vendor.id,
  //     label: vendor.fullName,
  //     vendor,
  //   })) || []
  //

  const vendorOptions =
    state.ExpenseList.getInitializeExpenseList?.vendor?.map((vendor) => ({
      value: vendor.id,
      label: vendor?.vendorName,
    })) || [];

  const disabledVendorOptions = vendorOptions?.map((option) => ({
    ...option,
    isDisabled: selectedVendorId && option.value !== Number(selectedVendorId),
  }));

  // console.log("vendorOptions", vendorOptions.length);

  // const unitOptions =
  //   state.ExpenseList?.unitList?.map((exp) => ({
  //     value: exp.id,
  //     label: exp.unitName,
  //   })) || [];

  const unitOptions = [
    { value: "Nos", label: "Nos" },
    { value: "Kg", label: "Kg" },
    { value: "Litre", label: "Litre" },
    { value: "Packet", label: "Packet" },
    { value: "Box", label: "Box" },
    { value: "Bottle", label: "Bottle" },
    { value: "Can", label: "Can" },
    { value: "Bundle", label: "Bundle" },
    { value: "Meter", label: "Meter" },
    { value: "Piece", label: "Piece" },
    { value: "Set", label: "Set" },
    { value: "Day", label: "Day" },
    { value: "Month", label: "Month" },
    { value: "Hour Wage", label: "Hour Wage" },
  ];

  const defaultExpenseItem = {
    itemName: "",
    quantity: "",
    unit: null,
    price: "",
    amount: 0,
  };
  const [expenseItems, setExpenseItems] = useState([defaultExpenseItem]);

  const handleFileChange = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setAttachments((prev) => [...prev, ...newFiles]);

    e.target.value = "";
  };

  const handleRemoveFile = (index) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTransactionIdChange = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setTransactionId(e.target.value);
  };

  const handleCreditPeriodChange = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    let value = e.target.value.replace(/\D/g, "");

    setCreditPeriod(value);
  };

  const handleVendorChange = (selected) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setVendor(selected);

    if (selected) {
      setVendorError("");
    }
  };

  const handlePaidAmountChange = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    const value = e.target.value;

    setPaidAmount(value);

    if (!value.trim()) {
      setPaidAmountError("Paid amount is required");
    } else {
      setPaidAmountError("");
    }
    setErrors((prev) => ({
      ...prev,
      paidAmount: "",
    }));
  };

  const handleBalanceAmountChange = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    const value = e.target.value;

    setBalanceAmount(value);

    if (!value.trim()) {
      setBalanceAmountError("Balance amount is required");
    } else {
      setBalanceAmountError("");
    }
    setErrors((prev) => ({
      ...prev,
      balanceAmount: "",
    }));
  };

  const handleClose = () => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    if (isBankingWayTrigger) {
      navigate(`/banking/new/${state.login.selectedHostel_Id}`);
    } else if (isVendorOverViewWay) {
      navigate(`/vendor/${state.login.selectedHostel_Id}`, {
        state: {
          navigateToVendorOverviewSelectedVendorId: selectedVendorId,
        },
      });
    } else {
      navigate(`/expense/${state.login.selectedHostel_Id}`);
    }
  };

  // const handleClose = () => {
  //   dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
  //   window.history.back();
  // };

  const handleExpenseTitle = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setExpenseTitle(e.target.value);
    setExpenseTitleError("");
  };

  const handleAmount = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setAmount(e.target.value);
    setAmountError("");
  };

  const handleCategory = (selectedOption) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setCategory(selectedOption?.value || "");
    setCategoryError("");
  };

  const handleSubCategory = (selectedOption) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setSubCategory(selectedOption?.value || "");
    setSubCategoryError("");
  };

  const handleDescription = (e) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setDescription(e.target.value);
  };

  const handleItemChange = (index, field, value) => {
    setErrors((prev) => ({
      ...prev,
      totalAmount: "",
    }));
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    const updated = [...expenseItems];

    updated[index][field] = value;

    const qty = Number(updated[index].quantity || 0);
    const price = Number(updated[index].price || 0);

    updated[index].amount = qty * price;

    setExpenseItems(updated);
    setExpenseItemErrors((prev) => {
      const errors = [...prev];
      if (!errors[index]) errors[index] = {};
      delete errors[index][field];
      return errors;
    });
  };

  const addNewRow = () => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
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

    setErrors({
      totalAmount: "",
      paidAmount: "",
      balanceAmount: "",
      tax: "",
      discount: "",
    });
  };

  const removeRow = (index) => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    setExpenseItems(expenseItems.filter((_, i) => i !== index));
  };

  const subTotal = expenseItems.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0,
  );

  const taxAmount = (subTotal * Number(tax || 0)) / 100;
  // console.log("taxAmount", taxAmount);
  const discountAmount =
    discountType === "percent"
      ? (subTotal * Number(discount || 0)) / 100
      : Number(discount || 0);
  //   const discountAmount = (subTotal * Number(discount || 0)) / 100;

  const totalAmount = subTotal + taxAmount - discountAmount;

  const validate = () => {
    setPaymentMethodError("");
    setPaidAmountError("");
    setSubCategoryError("");
    setPaymentStatusError("");
    setVendorError("");
    setExpenseTitleError("");
    setCategoryError("");
    setAmountError("");
    setPurchaseDateError("");
    setExpenseItemErrors("");

    let isValid = true;
    let firstErrorRef = null;

    const totalAmount = Number(amount || 0);
    const paid = Number(paidAmount || 0);

    const setFirstError = (ref) => {
      if (!firstErrorRef) firstErrorRef = ref;

      isValid = false;
    };

    if (!expenseTitle.trim()) {
      setExpenseTitleError("Please Enter Expense Title");
      setFirstError(expenseTitleRef);
    }

    if (!category) {
      setCategoryError("Please Select Category");
      setFirstError(categoryRef);
    }

    const selectedCat =
      state.ExpenseList?.getInitializeExpenseList?.listExpenses?.find(
        (cat) => cat.categoryId === category,
      );

    const categoryHasSubCategory =
      (selectedCat?.subCategories?.length || 0) > 0;

    if (categoryHasSubCategory && !subCategory) {
      setSubCategoryError("Please Select Sub Category");
      setFirstError(subCategoryRef);
    }

    if (!amount) {
      setAmountError("Please Enter Amount");
      setFirstError(amountRef);
    }

    if (!purchaseDate) {
      setPurchaseDateError("Please Select Purchase Date");
      setFirstError(purchaseDateRef);
    }

    if (linkVendor && !vendor) {
      setVendorError("Please Select Vendor");
      setFirstError(vendorRef);
    }

    if (linkVendor && !paymentStatus) {
      setPaymentStatusError("Please Select Payment Status");
      setFirstError(paymentStatusRef);
    }

    if (isAvailablePaid) {
      if (!paidAmount) {
        setPaidAmountError("Please Enter Paid Amount");
        setFirstError(paidAmountRef);
      } else {
        if (paymentStatus === "Full" && paid !== totalAmount) {
          setPaidAmountError("Paid Amount must be equal to Total Amount");
          setFirstError(paidAmountRef);
        }

        if (paymentStatus === "Partial") {
          if (paid >= totalAmount) {
            setPaidAmountError(
              "Paid Amount must be less than Total Amount for Partial payment",
            );
            setFirstError(paidAmountRef);
          }
        }

        if (paid > totalAmount) {
          setPaidAmountError("Paid Amount cannot be greater than Total Amount");
          setFirstError(paidAmountRef);
        }
      }
    }

    if (paymentStatus !== "Pending" && !paymentMethod?.value) {
      setPaymentMethodError("Please Select Payment Method");
      setFirstError(paymentMethodRef);
    }

    if (expenseItems.length === 0) {
      setExpenseItemErrors([
        {
          itemName: "Enter item details",
          quantity: "Enter quantity",
          unit: "Select unit",
          price: "Enter amount",
        },
      ]);
      isValid = false;
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

  // console.log("paymentMethod", paymentMethod);

  const handleSubmit = () => {
    dispatch({ type: "REMOVE_BANK_INSUFFICIANT_FUND_ERROR" });
    if (!validate()) return;
    console.log("executed");
    setPaymentMethodError("");
    setPaidAmountError("");
    setSubCategoryError("");
    setPaymentStatusError("");
    setVendorError("");
    setExpenseTitleError("");
    setCategoryError("");
    setAmountError("");
    setPurchaseDateError("");
    setExpenseItemErrors("");
    setErrors({
      totalAmount: "",
      paidAmount: "",
      balanceAmount: "",
      tax: "",
      discount: "",
    });
    const total = Number(amount || 0);
    const paid = Number(paidAmount || 0);
    const balance = total - paid;

    const itemsTotal = expenseItems?.reduce(
      (sum, item) => sum + Number(item.amount || 0),
      0,
    );

    if (taxAmount && taxAmount < 0) {
      setErrors((prev) => ({
        ...prev,
        tax: "Tax cannot be negative.",
      }));
      return;
    }

    if (discountAmount && discountAmount < 0) {
      setErrors((prev) => ({
        ...prev,
        discount: "Discount cannot be negative.",
      }));
      return;
    }

    if (discountAmount > total) {
      setErrors((prev) => ({
        ...prev,
        discount: "Discount cannot exceed total amount.",
      }));
      return;
    }
    // if (itemsTotal > total) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     totalAmount: "Expense items total cannot exceed Total Amount",
    //   }));
    //   return;
    // }

    if (Number(totalAmount.toFixed(2)) !== Number(total.toFixed(2))) {
      setErrors((prev) => ({
        ...prev,
        totalAmount: "Total Retainer Amount must be equal to the total Amount",
      }));
      return;
    }

    if (paid > total) {
      setErrors((prev) => ({
        ...prev,
        paidAmount: "Paid amount cannot exceed total amount",
      }));
      return;
    }

    if (balance < 0) {
      setErrors((prev) => ({
        ...prev,
        balanceAmount: "Balance amount cannot be negative",
      }));
      return;
    }

    const formattedDate = moment(purchaseDate).format("DD-MM-YYYY");

    dispatch({
      type: "ADDEXPENSE",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        images: attachments?.map((item) => item.file),

        expense: {
          categoryId: Number(category || 0),
          subCategory: Number(subCategory || 0),
          purchaseDate: formattedDate,
          count: expenseItems?.length,
          totalAmount: Number(amount),
          bankId: paymentMethod?.value,
          description: description.trim(),
          title: expenseTitle.trim(),

          isVendorExpense: linkVendor,
          vendorId: linkVendor
            ? Number(vendor?.value || vendor?.vendorId || 0)
            : 0,

          paymentStatus,
          paidAmount: Number(paidAmount || 0),
          balanceAmount: Number(balanceAmount || 0),

          paymentMethod: paymentMethod?.value || "",
          note: "",
          transactionId: transactionId || "",

          tax: Number(tax || 0),
          discount: Number(discount || 0),
          creditPeriod: creditPeriod || 0,

          expenseItems: expenseItems?.map((item) => ({
            item: item.itemName.trim(),
            quantity: Number(item.quantity || 0),
            unit: item.unit?.label || "",
            unitPrice: Number(item.price || 0),
            totalAmount: Number(item.amount || 0),
          })),
        },
      },
    });

    setFormLoading(true);
  };

  useEffect(() => {
    if (state.ExpenseList.insufficiantFundError) {
      setFormLoading(false);
    }
  }, [state.ExpenseList.insufficiantFundError]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "INITIALIZEEXPENSESLIST",
        payload: state.login.selectedHostel_Id,
      });
      // dispatch({
      //   type: "VENDORLIST",
      //   payload: { hostelId: state.login.selectedHostel_Id },
      // });
      // dispatch({ type: "UNITS_LIST_SAGA" });
    }
  }, [state.login.selectedHostel_Id]);

  const hasShownToast = useRef(false);

  useEffect(() => {
    if (state.ExpenseList?.getInitializeExpenseStatusCode === 200) {
      const expenses =
        state.ExpenseList?.getInitializeExpenseList?.listExpenses || [];
      if (expenses?.length === 0 && !hasShownToast.current) {
        toast.error(
          "Please add a Category option in Settings, accessible after adding an expense",
          {
            style: {
              fontFamily: "Gilroy, sans-serif",
            },
          },
        );
        hasShownToast.current = true;
      }

      if (selectedVendorId) {
        const selectedVendor =
          state.ExpenseList.getInitializeExpenseList?.vendor?.find(
            (option) => option.value === Number(selectedVendorId),
          );

        setVendor(selectedVendor || null);
      }

      setTimeout(() => {
        dispatch({ type: "REMOVE_INITIALIZE_EXPENSES_LIST" });
      }, 2000);
    }
  }, [state.ExpenseList?.getInitializeExpenseStatusCode]);

  useEffect(() => {
    if (state.ExpenseList?.getInitializeExpenseStatusCode === 200) {
      if (selectedVendorId) {
        const selectedVendor = vendorOptions?.find(
          (option) => option.value === Number(selectedVendorId),
        );

        setVendor(selectedVendor || null);
      }
    }
  }, [state.ExpenseList?.getInitializeExpenseStatusCode]);

  useEffect(() => {
    if (
      state.ExpenseList.StatusCodeForAddExpenseSuccess === 201 ||
      state.ExpenseList.StatusCodeForUpdateExpenseSuccess === 200
    ) {
      setFormLoading(false);

      if (isVendorOverViewWay) {
        navigate(`/vendor/${state.login.selectedHostel_Id}`, {
          state: {
            navigateToVendorOverviewSelectedVendorId: selectedVendorId,
          },
        });
      } else {
        navigate(`/expense/${state.login.selectedHostel_Id}`);
      }
    }
  }, [
    state.ExpenseList.StatusCodeForAddExpenseSuccess,

    state.ExpenseList.StatusCodeForUpdateExpenseSuccess,
  ]);

  // useEffect(() => {
  //   if (category) {
  //     const selectedCat =
  //       state.ExpenseList?.getInitializeExpenseList?.listExpenses?.find(
  //         (cat) => cat.categoryId === category,
  //       );

  //     setSubCategoryList(
  //       selectedCat?.subCategories?.map((sub) => ({
  //         value: sub.subCategoryId,
  //         label: sub.subCategoryName,
  //       })) || [],
  //     );
  //     const categoryHasSubCategory = selectedCat?.subCategories?.length > 0;
  //     console.log("categoryHasSubCategory", categoryHasSubCategory);

  //     if (categoryHasSubCategory && !subCategory) {
  //       setSubCategoryError("Please Select SubCategory");
  //     } else {
  //       setSubCategoryError("");
  //     }

  //     // setSubCategory("");
  //   }
  // }, [category]);

  useEffect(() => {
    if (!category) return;

    const selectedCat =
      state.ExpenseList?.getInitializeExpenseList?.listExpenses?.find(
        (cat) => cat.categoryId === category,
      );

    const list =
      selectedCat?.subCategories?.map((sub) => ({
        value: sub.subCategoryId,
        label: sub.subCategoryName,
      })) || [];

    setSubCategoryList(list);
    setSubCategory("");

    if (list.length > 0) {
      setSubCategoryError("Please Select Sub Category");
    } else {
      setSubCategoryError("");
    }
  }, [category, state.ExpenseList?.getInitializeExpenseList?.listExpenses]);

  const expenseOptions =
    state.ExpenseList?.getInitializeExpenseList?.listExpenses?.map((item) => ({
      value: item.categoryId,
      label: item.categoryName,
    })) || [];

  const paymentOptions = Array.isArray(
    state.ExpenseList?.getInitializeExpenseList?.banks,
  )
    ? state.ExpenseList.getInitializeExpenseList.banks.map((item) => {
        const typeLabelMap = {
          bank: "Bank",
          upi: "UPI",
          card: "Card",
          cash: "Cash",
        };
        return {
          value: item.bankId,
          label: `${item.holderName} - ${item.bankName || typeLabelMap[item.type]}`,
          type: item.type,
        };
      })
    : [];

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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
            <div className="col-span-1 xl:col-span-8">
              <label className="block mb-2 text-[13px] font-medium text-[#222]">
                Expense Title{" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>

              <input
                type="text"
                ref={expenseTitleRef}
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-4">
              <label className="block mb-2 text-[13px] font-medium">
                Category <span className="text-red-500 text-[20px]">*</span>
              </label>

              <div ref={categoryRef}>
                <Select
                  value={
                    category
                      ? expenseOptions?.find((opt) => opt.value === category) ||
                        null
                      : null
                  }
                  onChange={handleCategory}
                  options={expenseOptions}
                  placeholder="Select"
                  styles={CustomStyles}
                />
              </div>

              {categoryError && (
                <ErrorMessage message={categoryError} type="error" />
              )}
            </div>
            <div className="col-span-1 xl:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Sub Category{" "}
                {subCategoryList.length > 0 ? (
                  <span className="text-red-600 inline-block text-xl">*</span>
                ) : (
                  <span style={{ visibility: "hidden", fontSize: 20 }}>*</span>
                )}
              </label>

              <Select
                options={subCategoryList}
                value={
                  subCategory
                    ? subCategoryList?.find(
                        (opt) => opt.value === subCategory,
                      ) || null
                    : null
                }
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

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-4">
              <div>
                <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                  Total Amount (INR)
                  <span className="text-red-500 text-[20px]">*</span>
                </label>

                <input
                  ref={amountRef}
                  value={amount}
                  onChange={handleAmount}
                  type="number"
                  placeholder="Enter Amount"
                  onWheel={(e) => e.target.blur()}
                  className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                    amount ? "font-semibold" : "font-medium"
                  } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                />

                {amountError && (
                  <ErrorMessage message={amountError} type="error" />
                )}
              </div>
            </div>
            <div className="col-span-1 xl:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Purchase Date
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <div className="relative">
                <DatePicker
                  ref={purchaseDateRef}
                  selected={purchaseDate}
                  onChange={(date) => {
                    setPurchaseDate(date);
                    setPurchaseDateError("");
                  }}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
            <div className="col-span-1 xl:col-span-8 flex items-center justify-between">
              <div className="">
                <label className="block mb-2 text-[13px] text-[#222222] font-medium">
                  Link this Expense to a Vendor?
                </label>
              </div>

              <div className="flex justify-center">
                <div className="flex bg-[#F3F4F6] rounded-lg p-1">
                  <button
                    disabled={selectedVendorId}
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

          {linkVendor && (
            <>
              <div className="mb-2">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
                  <div className="col-span-1 xl:col-span-8 ">
                    <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                      Vendor
                      <span className="text-red-600 text-[20px]">*</span>
                    </label>

                    <Select
                      options={disabledVendorOptions}
                      value={vendor}
                      ref={vendorRef}
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

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-4 ">
                  <div className="col-span-1 xl:col-span-8">
                    <label className="text-[13px] font-medium text-[#1A1C21]">
                      Payment Status{" "}
                      <span className="text-red-500 text-[20px]">*</span>
                    </label>

                    <div className="flex gap-6 mt-3">
                      {["Full", "Partial", "Pending"].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2 text-[13px] text-[#4B5563]"
                        >
                          <input
                            ref={paymentStatusRef}
                            type="radio"
                            name="paymentType"
                            value={item}
                            checked={paymentStatus === item}
                            onChange={(e) => {
                              setPaymentStatus(e.target.value);
                              setPaymentStatusError("");
                            }}
                            className="accent-blue-600 cursor-pointer"
                          />
                          {item}
                        </label>
                      ))}
                    </div>

                    {paymentStatusError && (
                      <ErrorMessage message={paymentStatusError} type="error" />
                    )}
                  </div>
                </div>
                {isAvailablePaid && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
                    <div className="col-span-1 xl:col-span-4">
                      <div>
                        <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                          Paid Amount (INR){" "}
                          <span className="text-red-500 text-[20px]">*</span>
                        </label>

                        <input
                          type="number"
                          ref={paidAmountRef}
                          value={paidAmount}
                          onChange={handlePaidAmountChange}
                          onWheel={(e) => e.target.blur()}
                          placeholder="Enter Paid Amount"
                          className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                            paidAmount ? "font-semibold" : "font-medium"
                          } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                        />

                        {paidAmountError && (
                          <ErrorMessage
                            message={paidAmountError}
                            type="error"
                          />
                        )}

                        {errors.paidAmount && (
                          <ErrorMessage
                            message={errors.paidAmount}
                            type="error"
                          />
                        )}
                      </div>
                    </div>
                    <div className="col-span-1 xl:col-span-4">
                      <div>
                        <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                          Balance Amount (Outstanding){" "}
                          <span className="text-transparent select-none text-[20px]">
                            *
                          </span>
                        </label>

                        <input
                          disabled
                          type="number"
                          value={balanceAmount}
                          readOnly
                          onWheel={(e) => e.target.blur()}
                          // onChange={handleBalanceAmountChange}
                          placeholder="Enter Balance Amount"
                          className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                            balanceAmount ? "font-semibold" : "font-medium"
                          } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 disabled:bg-gray-50 focus:outline-none focus:ring-0`}
                        />

                        {/* {balanceAmountError && (
                        <ErrorMessage
                          message={balanceAmountError}
                          type="error"
                        />
                      )}
                      {errors.balanceAmount && (
                        <ErrorMessage
                          message={errors.balanceAmount}
                          type="error"
                        />
                      )} */}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {paymentStatus === "Pending" && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
                  <div className="col-span-1 xl:col-span-8">
                    <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                      Credit Period (for this expense only)
                    </label>

                    <input
                      type="number"
                      value={creditPeriod}
                      onChange={handleCreditPeriodChange}
                      placeholder="Enter Credit Period"
                      onWheel={(e) => e.target.blur()}
                      className={`w-full text-[15px] text-[#4B4B4B] font-gilroy ${
                        creditPeriod ? "font-semibold" : "font-medium"
                      } border border-[#D9D9D9] h-[50px] rounded-[8px] px-3 focus:outline-none focus:ring-0`}
                    />
                  </div>
                </div>
              )}
            </>
          )}
          <div className="">
            {paymentStatus !== "Pending" && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2 ">
                  <div className="col-span-1 xl:col-span-8  ">
                    <label className="block mb-2 text-[13px] text-[#222222] font-medium">
                      Payment Method
                      <span className="text-red-500 ml-1 text-[20px] ">*</span>
                    </label>

                    <Select
                      ref={paymentMethodRef}
                      value={paymentMethod}
                      onChange={(selected) => {
                        setPaymentMethod(selected);
                        setPaymentMethodError("");
                      }}
                      options={paymentOptions}
                      placeholder="Select Payment Method"
                      styles={CustomStyles}
                    />

                    {paymentMethodError && (
                      <ErrorMessage message={paymentMethodError} type="error" />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
                  <div className="col-span-1 xl:col-span-8 ">
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
                </div>
              </>
            )}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
              <div className="col-span-1 xl:col-span-8">
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
                          <span className="text-[#1E45E1]">
                            Choose Image to
                          </span>{" "}
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
                                hoveredImage === previewImage
                                  ? "h-[50px]"
                                  : "h-0"
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
                          className="h-[100px]  w-full object-cover cursor-pointer rounded-lg"
                          onClick={() => {
                            setSelectedImageName({
                              name: item.file.name,
                              index: index,
                            });
                            setPreviewImage(item.preview);
                          }}
                        />
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
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-2 mb-2">
              <div className="col-span-1 xl:col-span-8">
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
                className="overflow-auto relative h-auto rounded-xl show-scrolls"
              >
                <table className=" w-full font-gilroy ">
                  <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
                    <tr className="bg-[#F9FAFB] text-left text-xs text-[#6B7280] rounded-xl">
                      <th className="p-2 border border-[#F9FAFB] rounded-t-lg">
                        ITEM DETAILS{" "}
                        <span className="text-red-500 ml-1">*</span>
                      </th>
                      <th className="p-2 w-[100px] border border-[#F9FAFB]">
                        QUANTITY <span className="text-red-500 ml-1">*</span>
                      </th>
                      <th className="p-2 w-[140px] border border-[#F9FAFB]">
                        UNIT <span className="text-red-500 ml-1">*</span>
                      </th>
                      <th className="p-2 w-[140px] border border-[#F9FAFB]">
                        PER UNIT PRICE{" "}
                        <span className="text-red-500 ml-1">*</span>
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
                    {expenseItems.length > 0 ? (
                      expenseItems.map((item, index) => (
                        <React.Fragment key={index}>
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
                                onWheel={(e) => e.target.blur()}
                                className="w-full  outline-none text-sm rounded-md"
                              />
                            </td>

                            <td className="p-2">
                              <Select
                                value={item.unit}
                                options={unitOptions}
                                styles={{
                                  ...CustomStylesCode,
                                  menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                  }),
                                }}
                                menuPortalTarget={document.body}
                                menuPosition="fixed"
                                menuPlacement="auto"
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
                                  handleItemChange(
                                    index,
                                    "price",
                                    e.target.value,
                                  )
                                }
                                onWheel={(e) => e.target.blur()}
                                className="w-full  outline-none text-sm rounded-md "
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
                          {(expenseItemErrors[index]?.itemName ||
                            expenseItemErrors[index]?.quantity ||
                            expenseItemErrors[index]?.unit ||
                            expenseItemErrors[index]?.price) && (
                            <tr className="">
                              <td className=" pb-2 text-xs  whitespace-nowrap ">
                                <ErrorMessage
                                  message={expenseItemErrors[index]?.itemName}
                                  type="error"
                                />
                              </td>

                              <td className=" pb-2 text-xs text-red-500 whitespace-nowrap w-[200px] ">
                                <ErrorMessage
                                  message={expenseItemErrors[index]?.quantity}
                                  type="error"
                                />
                              </td>

                              <td className="pb-2 text-xs text-red-500 whitespace-nowrap">
                                <ErrorMessage
                                  message={expenseItemErrors[index]?.unit}
                                  type="error"
                                />
                              </td>

                              <td className=" pb-2 text-xs text-red-500 whitespace-nowrap">
                                <ErrorMessage
                                  message={expenseItemErrors[index]?.price}
                                  type="error"
                                />
                              </td>

                              <td></td>
                              <td></td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-10 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <h3 className="text-[16px] font-semibold text-[#101828] font-gilroy">
                              No Data Found!
                            </h3>
                            <p className="mt-1 text-sm text-[#4A5565] font-gilroy">
                              No expense items added yet
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {errors.totalAmount && (
              <ErrorMessage message={errors.totalAmount} type="error" />
            )}
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

                    <div className="flex justify-between items-start">
                      <div className="w-full">
                        <span className="text-sm">Tax (Optional)</span>
                      </div>

                      <div className="w-full flex flex-col items-end">
                        <input
                          onWheel={(e) => e.target.blur()}
                          type="number"
                          value={tax}
                          onChange={(e) => {
                            setErrors((prev) => ({
                              ...prev,
                              tax: "",
                            }));
                            setTax(e.target.value);
                          }}
                          className="w-[100px] h-[36px] border border-[#D9D9D9] outline-none text-sm rounded-md px-2"
                        />
                      </div>
                    </div>
                    {errors.tax && (
                      <div className="w-full mt-1">
                        <ErrorMessage message={errors.tax} type="error" />
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#222222]">
                          Discount
                        </span>

                        <div className="flex border border-[#D9D9D9] rounded-md overflow-hidden">
                          <button
                            type="button"
                            onClick={() => {
                              setDiscountType("amount");
                            }}
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
                      <div className="flex flex-col items-end">
                        <input
                          onWheel={(e) => e.target.blur()}
                          type="number"
                          value={discount}
                          onChange={(e) => {
                            setErrors((prev) => ({
                              ...prev,
                              discount: "",
                            }));
                            setDiscount(e.target.value);
                          }}
                          placeholder={
                            discountType === "amount" ? "Amount" : "Percentage"
                          }
                          className="w-[100px] h-[36px] border border-[#D9D9D9] outline-none text-sm rounded-md px-2"
                        />
                      </div>
                    </div>

                    {errors.discount && (
                      <ErrorMessage message={errors.discount} type="error" />
                    )}
                    <div className="border-t pt-3 flex justify-between font-semibold">
                      <span className="text-sm">TOTAL AMOUNT</span>

                      <span className="text-sm">
                        ₹ {totalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {state.ExpenseList?.insufficiantFundError && (
            <div className="flex items-center justify-center  mb-2 mt-2">
              <ErrorMessage
                message={state.ExpenseList?.insufficiantFundError}
                type="error"
              />
            </div>
          )}
          <div className="flex justify-end gap-4 my-10 mr-4">
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
};

export default AddExpenseNew;

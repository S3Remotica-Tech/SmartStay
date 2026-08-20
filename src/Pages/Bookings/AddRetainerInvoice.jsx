/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Modal from "react-bootstrap/Modal";
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import Image from "react-bootstrap/Image";
import Plus from "../../Assets/Images/New_images/addplus-circle.svg";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { InputGroup, FormControl } from "react-bootstrap";
import { CloseCircle, Add, ArrowRight } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { components } from "react-select";
import { useNavigate, useLocation } from "react-router-dom";
import UserAdditionalContact from "../CustomerFile/UserAdditionalContact";
import { NavigateToBack } from "../../Redux/Action/BookingAction";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import NoData from "../../Assets/v2Images/NoData.svg";
import "react-datepicker/dist/react-datepicker.css";
import {
  SearchNormal,
  Setting3,
  Filter,
  More,
  ArrowDown,
  AddCircle,
  Chart21,
  Calendar,
} from "iconsax-react";
import CreatableSelect from "react-select/creatable";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "45px",
    border: "1px solid #D9D9D9",
    fontSize: "15px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",
    borderRadius: "8px 0 0 8px",
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
      fontFamily: "Gilroy",
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
    minHeight: "50px",
    height: "45px",
    border: "1px solid #D9D9D9",
    fontSize: "15px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",
    borderRadius: "8px",
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
      fontFamily: "Gilroy",
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

const CustomStylesWithoutBorder = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "45px",
    // border: "1px solid #D9D9D9",
    border: "none",
    fontSize: "15px",
    fontFamily: "Gilroy",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",
    // borderRadius: "8px 0 0 8px",
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
      fontFamily: "Gilroy",
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

function AddRetainerInvoice() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchLoading, setSearchLoading] = useState(false);

  const { isTenantOverviewWay, customerId } = location.state || {};

 

  const [amountErrmsg, setAmountErrmsg] = useState("");
  const customerRef = useRef(null);
  const guardianRef = useRef(null);
  const invoiceDateRef = useRef(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [additionalForm, setAdditionalForm] = useState(false);
  const itemNameRef = useRef(null);
  const retainertypeRef = useRef(null);
  const amountRef = useRef(null);
  const paymentMethodRef = useRef(null);
  const [search, setSearch] = useState("");
  const [expenseItem, setExpenseItem] = useState({
    itemName: "",
    retainertype: null,
    amount: "",
  });

  const [expenseItemError, setExpenseItemError] = useState({
    itemName: "",
    retainertype: "",
    amount: "",
  });

  const [customername, setCustomerName] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [invoiceDate, setInvoiceDate] = useState(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [receivedAccount, setReceivedAccount] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [description, setDescription] = useState("");
  const [customerErrmsg, setCustomerErrmsg] = useState("");
  const [guardianErrmsg, setGuardianErrmsg] = useState("");
  const [invoiceDateErrmsg, setInvoiceDateErrmsg] = useState("");
  const [receivedAccountErrmsg, setReceivedAccountErrmsg] = useState("");
  const [paymentMethodErrmsg, setPaymentMethodErrmsg] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [errors, setErrors] = useState({
    totalAmount: "",
  });
  const handleTransactionIdChange = (e) => {
    setTransactionId(e.target.value);
  };
  // const handleSearch = () => {
  //   if (!state.login.selectedHostel_Id || search.trim() === "") return;
  // };

  const handleClose = () => {
    // if (isTenantOverviewWay) {
    //   navigate(`/retainer-invoice/${state.login.selectedHostel_Id}`);
    // } else {
    //   navigate(`/retainer-invoice/${state.login.selectedHostel_Id}`);
    // }
    navigate(-1);
    dispatch(NavigateToBack(true));
  };

  useEffect(() => {
    if (customerId) {
      setCustomerName(customerId);
    }
  }, [customerId]);

  const retainerTypeOptions = [
    { value: "amount_holding", label: "Advance" },
    // { value: "security_deposit", label: "Security Deposit" },
    { value: "eb_holding", label: "EB" },
  ];

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    dispatch({
      type: "CUSTOMER_LIST_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        purpose: "ADVANCE_HOLDING",
      },
    });
  }, [state.login.selectedHostel_Id]);

  const customerOptions =
    state.UsersList?.CustomerList?.customersLists?.map((u) => ({
      value: u.customerId,
      label: u.fullName,
    })) || [];

  const handleCustomerName = (selectedOption) => {
    dispatch({
      type: "REMOVE_CREATE_RETAINER_ADD_ERROR",
    });
    setCustomerName(selectedOption?.value || "");

    if (!selectedOption) {
      setCustomerErrmsg("Please Select Tenant");
    } else {
      setCustomerErrmsg("");
    }
    setGuardianName("");
  };

  const selectedCustomer = state.UsersList?.CustomerList?.customersLists?.find(
    (c) => c.customerId === customername,
  );

  const selectedGuardian = selectedCustomer?.guardiansList?.find(
    (g) => g.guardianId === guardianName,
  );

  const joiningDate = selectedCustomer?.joiningDate
    ? dayjs(selectedCustomer.joiningDate, "DD/MM/YYYY").toDate()
    : null;
  const GuardianOptions =
    selectedCustomer?.guardiansList?.map((g) => ({
      value: g.guardianId,
      label: g.guardianName,
    })) || [];

  const handleGuardianName = (selectedOption) => {
    dispatch({
      type: "REMOVE_CREATE_RETAINER_ADD_ERROR",
    });
    setGuardianName(selectedOption?.value || "");

    if (!selectedOption) {
      setGuardianErrmsg("Please Select Received From");
    } else {
      setGuardianErrmsg("");
    }
  };

  const handleItemChange = (field, value) => {
    setExpenseItem((prev) => ({
      ...prev,
      [field]: value,
    }));

    setExpenseItemError((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const subTotal = Number(expenseItem.amount || 0);

  const accountOptions =
    state.UsersList?.CustomerList?.listBanks?.map((bank) => ({
      value: bank.bankId,
      label: bank.bankName,
    })) || [];

  const handleAddGuardian = () => {
    setAdditionalForm(true);
  };

  const handleCloseAdditionalForm = () => {
    setAdditionalForm(false);
  };

  const CustomNoOptionsMessage = (props) => {
    return (
      <components.NoOptionsMessage {...props}>
        <div className="flex flex-row items-center justify-center ">
          <img src={NoData} alt="No Guardian" className="w-20 h-20 mb-3" />
          <div className="">
            <p className="text-sm font-semibold text-[#1F2633] mb-1">
              No Parents / Guardian Details are there!
            </p>

            <p className="text-xs text-[#4A5565] mt-1 text-center mb-1">
              Add Parents/Guardian details of the tenant for Emergency purposes
            </p>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleAddGuardian();
                }}
                className="mt-2 flex items-center justify-center gap-1 rounded-md bg-[#1E45E1] px-4 py-2 text-white text-xs font-medium hover:bg-[#1738BB]"
              >
                Add New <ArrowRight size="14" />
              </button>
            </div>
          </div>
        </div>
      </components.NoOptionsMessage>
    );
  };

  const handlePaymentMethod = (selectedOption) => {
    dispatch({
      type: "REMOVE_CREATE_RETAINER_ADD_ERROR",
    });
    setPaymentMethod(selectedOption);

    if (!selectedOption) {
      setPaymentMethodErrmsg("Please Select Payment Method");
    } else {
      setPaymentMethodErrmsg("");
    }
  };

  // const handleReceivedAccount = (selectedOption) => {
  //   setReceivedAccount(selectedOption);

  //   if (!selectedOption) {
  //     setReceivedAccountErrmsg("Please Select Payment Method");
  //   } else {
  //     setReceivedAccountErrmsg("");
  //   }
  // };

  const handleInvoiceDate = (date) => {
    dispatch({
      type: "REMOVE_CREATE_RETAINER_ADD_ERROR",
    });
    setInvoiceDate(date);

    if (!date) {
      setInvoiceDateErrmsg("Please Select Invoice Date");
    } else {
      setInvoiceDateErrmsg("");
    }
  };

  const handleReferenceChange = (e) => {
    dispatch({
      type: "REMOVE_CREATE_RETAINER_ADD_ERROR",
    });
    setReferenceNumber(e.target.value);

    if (!e.target.value.trim()) {
      setReferenceNumberErrmsg("Please Enter Reference Number");
    } else {
      setReferenceNumberErrmsg("");
    }
  };

  const handleSaveAndGenerate = () => {
    dispatch({
      type: "REMOVE_CREATE_RETAINER_ADD_ERROR",
    });
    if (!validateForm()) return;

    // const payload = {
    //   hostelId: state.login.selectedHostel_Id,
    //   customerId: customername,
    //   relationId: guardianName,
    //   paymentDate: invoiceDate ? dayjs(invoiceDate).format("DD-MM-YYYY") : null,
    //   relationName: inputValue,
    //   invoiceType: expenseItem.retainertype?.value,
    //   amount: Number(expenseItem.amount || 0),
    //   bankId: paymentMethod?.value,
    //   referenceNumber: transactionId,
    //   // description: expenseItem.itemName,
    //   //          notes: description,
    // };

    const payload = {
      hostelId: state.login.selectedHostel_Id,
      customerId: customername,
      paymentDate: invoiceDate ? dayjs(invoiceDate).format("DD-MM-YYYY") : null,
      invoiceType: expenseItem.retainertype?.value,
      amount: Number(expenseItem.amount || 0),
      bankId: paymentMethod?.value,
      referenceNumber: transactionId,
      detailedDescription: description,
      description: expenseItem?.itemName,
    };

    const isExisting = GuardianOptions?.some(
      (opt) => opt.value === guardianName,
    );

    if (isExisting) {
      payload.relationId = guardianName;
    } else {
      payload.relationName = guardianName;
    }

    dispatch({
      type: "CREATE_RETAINER_SAGA",
      payload,
    });
    setSaveLoading(true);
  };

  useEffect(() => {
    if (state.UsersList.createRetainerInvoiceStatusCode === 201) {
      setSaveLoading(false);
      dispatch(NavigateToBack(true));
      // navigate(`/retainer-invoice/${state.login.selectedHostel_Id}`);
      navigate(-1);

     
    }
  }, [state.UsersList.createRetainerInvoiceStatusCode]);

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerCoatact === 200) {
      setAdditionalForm(false);
      dispatch({
        type: "CUSTOMER_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "ADVANCE_HOLDING",
        },
      });
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);

  useEffect(() => {
    if (!state.UsersList.createRetainerError) return;

    setSaveLoading(false);

    dispatch({
      type: "REMOVE_CREATE_RETAINER_ADD_ERROR",
    });
  }, [state.UsersList.createRetainerError]);

  const validateForm = () => {
    let isValid = true;
    let firstErrorRef = null;

    const setFirstError = (ref) => {
      if (!firstErrorRef) {
        firstErrorRef = ref;
      }
      isValid = false;
    };

    setCustomerErrmsg("");
    setGuardianErrmsg("");
    setInvoiceDateErrmsg("");
    setReceivedAccountErrmsg("");
    setPaymentMethodErrmsg("");

    setExpenseItemError({
      itemName: "",
      retainertype: "",
      amount: "",
    });

    if (!customername) {
      setCustomerErrmsg("Please Select Tenant");
      setFirstError(customerRef);
    }
    const receivedFrom = guardianName || inputValue.trim();

    if (!receivedFrom) {
      setGuardianErrmsg("Please Select Received From");
      setFirstError(guardianRef);
    }

    if (!invoiceDate) {
      setInvoiceDateErrmsg("Please Select Invoice Date");
      setFirstError(invoiceDateRef);
    }

    // if (!expenseItem.itemName?.trim()) {
    //   setExpenseItemError((prev) => ({
    //     ...prev,
    //     itemName: "Enter Item Name",
    //   }));
    //   setFirstError(itemNameRef);
    // }

    if (!expenseItem.retainertype) {
      setExpenseItemError((prev) => ({
        ...prev,
        retainertype: "Select Retainer Type",
      }));
      setFirstError(retainertypeRef);
    }

    if (!expenseItem.amount || Number(expenseItem.amount) <= 0) {
      setExpenseItemError((prev) => ({
        ...prev,
        amount: "Enter Valid Amount",
      }));
      setFirstError(amountRef);
    }

    if (!paymentMethod) {
      setPaymentMethodErrmsg("Please Select Payment Method");
      setFirstError(paymentMethodRef);
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

 

  return (
    <div className="block relative font-gilroy ">
      <div className="relative w-full  bg-white  flex flex-col ">
        <div className="flex items-center justify-between  p-2 sticky top-0  bg-white">
          <h2 className="text-[18px] text-[#222222] font-gilroy font-semibold">
            New Retainer Invoice
          </h2>

          <button
            onClick={handleClose}
            className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 
              items-center px-2 py-1 font-gilroy "
          >
            <Add
              size="24"
              color="#FF0000"
              className="cursor-pointer rotate-45"
            />{" "}
            Close
          </button>
        </div>
        <div className="flex-1 overflow-y-auto mx-2 my-2 show-scrolls max-h-[500px]">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-10">
              <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                Tenant Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <div
                  className="flex items-center rounded-lg  bg-white shadow-sm 
                  transition-all"
                >
                  <div className="flex-1">
                    <Select
                      isDisabled={customerId}
                      ref={customerRef}
                      placeholder="Select/Search Tenant"
                      classNamePrefix="custom"
                      styles={CustomStyles}
                      options={customerOptions}
                      onChange={handleCustomerName}
                      value={
                        customerOptions.find(
                          (opt) => opt.value === customername,
                        ) || null
                      }
                    />
                  </div>

                  <button
                    type="button"
                    className={`h-[48px] w-14 flex items-center justify-center rounded-r-lg bg-[#1E45E1] transition-colors ${
                      searchLoading
                        ? "cursor-not-allowed opacity-80"
                        : "hover:bg-[#1738BB]"
                    }`}
                  >
                    {searchLoading ? (
                      <div className="w-4 h-4 border-2 border-white  border-t-transparent  animate-spin" />
                    ) : (
                      <SearchNormal size="20" color="#FFF" />
                    )}
                  </button>
                </div>
                {customerErrmsg && (
                  <ErrorMessage message={customerErrmsg} type="error" />
                )}
                {/* <p className="mt-2 mb-0 text-xs text-[#6B7280] leading-5">
                  Search existing tenants in the Property Flow ecosystem to
                  auto-fill tenant details.
                </p> */}
              </div>
            </div>
          </div>
          {selectedCustomer && (
            <div className="grid grid-cols-12 gap-4 my-2 font-gilroy">
              <div className="col-span-12 md:col-span-10">
                <div className="bg-[#F8F9FC] rounded-xl px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-start gap-5">
                  <div className="flex items-start gap-3">
                    {selectedCustomer?.profilePic ? (
                      <img
                        src={selectedCustomer.profilePic}
                        alt={selectedCustomer.fullName}
                        className="w-11 h-11 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-[#1E45E1] text-white flex items-center justify-center text-sm font-semibold uppercase">
                        {selectedCustomer?.initials ||
                          selectedCustomer?.fullName?.charAt(0)}
                      </div>
                    )}

                    <div>
                      <h3 className="text-[14px] font-semibold text-[#222222]">
                        {selectedCustomer?.fullName}
                      </h3>

                      <p className="mt-1 text-[11px] text-[#6B7280]">
                        {selectedCustomer?.stayInfo?.floorName || "-"} |{" "}
                        {selectedCustomer?.stayInfo?.roomName || "--"} |{" "}
                        {selectedCustomer?.stayInfo?.bedName || "--"}
                      </p>
                    </div>
                  </div>

                  <div className="min-w-[500px]">
                    <div className="flex items-center gap-1 mb-1">
                      <p className="text-[12px] font-semibold text-[#222222] mb-0">
                        Billed to
                      </p>
                    </div>
                    {selectedCustomer?.addressInfo?.houseNo && (
                      <p className="text-[12px] text-[#555] mb-0">
                        {selectedCustomer?.addressInfo?.houseNo},
                      </p>
                    )}
                    <div className="flex gap-1 ">
                      {selectedCustomer?.addressInfo?.street && (
                        <p className="text-[12px] text-[#555] mb-0 capitalize">
                          {selectedCustomer.addressInfo.street},
                        </p>
                      )}

                      {selectedCustomer?.addressInfo?.landmark && (
                        <p className="text-[12px] text-[#555] mb-0 capitalize">
                          {selectedCustomer.addressInfo.landmark},
                        </p>
                      )}
                    </div>
                    <div className="flex gap-1 ">
                      {selectedCustomer?.addressInfo?.city && (
                        <p className="text-[12px] text-[#555] mb-0 capitalize">
                          {selectedCustomer.addressInfo.city} ,
                        </p>
                      )}
                      {selectedCustomer?.addressInfo?.pincode !== 0 && (
                        <p className="text-[12px] text-[#555] mb-0">
                          {selectedCustomer.addressInfo.pincode || "-"},
                        </p>
                      )}
                    </div>

                    {selectedCustomer?.addressInfo?.state && (
                      <p className="text-[12px] text-[#555] mb-0 capitalize">
                        {selectedCustomer.addressInfo.state}
                      </p>
                    )}

                    <p className="mt-1 text-[12px] text-[#555] mb-0">
                      + {selectedCustomer?.country} {selectedCustomer?.mobile}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-5">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Received from{" "}
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <CreatableSelect
                isDisabled={!selectedCustomer}
                ref={guardianRef}
                placeholder="Enter / Select Respective Person"
                classNamePrefix="custom"
                styles={CustomStylesCode}
                options={GuardianOptions}
                value={
                  GuardianOptions.find((opt) => opt.value === guardianName) ||
                  (guardianName
                    ? { label: guardianName, value: guardianName }
                    : null)
                }
                inputValue={inputValue}
                onInputChange={(value, { action }) => {
                  if (action === "input-change") {
                    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");

                    setInputValue(filteredValue);
                    setGuardianName(filteredValue);
                    setGuardianErrmsg("");
                  }
                }}
                onChange={(option) => {
                  setGuardianName(option?.value || "");
                  setInputValue("");
                  setGuardianErrmsg("");
                }}
                onCreateOption={(value) => {
                  setInputValue("");
                  setGuardianName(value);
                  setGuardianErrmsg("");
                }}
              />

              {guardianErrmsg && (
                <ErrorMessage message={guardianErrmsg} type="error" />
              )}
            </div>
            <div className="col-span-1 xl:col-span-5">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Invoice Date
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <div className="relative" ref={invoiceDateRef}>
                <DatePicker
                  selected={invoiceDate}
                  onChange={handleInvoiceDate}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  minDate={joiningDate}
                  placeholderText="Select Date"
                  className="w-full h-[50px] rounded-[8px] border px-3 pr-10 text-[15px] border-[#D9D9D9] focus:outline-none"
                />
                <Calendar
                  size="20"
                  color="#1E45E1"
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
              </div>
              {invoiceDateErrmsg && (
                <ErrorMessage message={invoiceDateErrmsg} type="error" />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2 flex items-stretch">
            <div className="col-span-1 md:col-span-10">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium my-2 mx-2">
                Description{" "}
              </label>
              <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                <div className="overflow-auto relative h-[200px]  rounded-xl show-scrolls">
                  <table className=" w-full font-gilroy ">
                    <thead className="bg-[#F9FAFB] text-[#6B7280] text-xs">
                      <tr className="bg-[#F9FAFB] text-left text-xs text-[#6B7280] rounded-xl">
                        <th className="p-2 border border-[#F9FAFB] rounded-t-lg">
                          ITEM DETAILS{" "}
                        </th>
                        <th className="p-2 w-[140px] border border-[#F9FAFB]">
                          RETAINER TYPE
                        </th>
                        <th className="p-2 w-[140px] border border-[#F9FAFB]">
                          AMOUNT
                        </th>
                        {/* <th className="p-2 w-[80px] text-center border border-[#F9FAFB] rounded-r-lg">
                          ACTION
                        </th> */}
                      </tr>
                    </thead>

                    <tbody>
                      <tr className="border border-[#F9FAFB]">
                        <td className="p-2 border border-[#F9FAFB]">
                          <input
                            ref={itemNameRef}
                            value={expenseItem.itemName}
                            onChange={(e) =>
                              handleItemChange("itemName", e.target.value)
                            }
                            placeholder="Enter Description"
                            className="w-full outline-none text-sm rounded-md"
                          />
                        </td>

                        <td className="p-2 border border-[#F9FAFB]">
                          <Select
                            ref={retainertypeRef}
                            value={expenseItem.retainertype}
                            options={retainerTypeOptions}
                            styles={{
                              ...CustomStylesWithoutBorder,
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
                              handleItemChange("retainertype", selected)
                            }
                          />
                        </td>

                        <td className="p-2 border border-[#F9FAFB]">
                          <input
                            ref={amountRef}
                            type="number"
                            value={expenseItem.amount}
                            onChange={(e) =>
                              handleItemChange("amount", e.target.value)
                            }
                            placeholder="0"
                            onWheel={(e) => e.target.blur()}
                            className="w-full outline-none text-sm rounded-md"
                          />
                        </td>

                        {/* <td className="p-2 text-center ">
                          <button>
                            <More
                              color="#28303F"
                              size="16"
                              variant="Outline"
                              className="cursor-pointer rotate-90"
                            />
                          </button>
                        </td> */}
                      </tr>

                      {(expenseItemError.itemName ||
                        expenseItemError.retainertype ||
                        expenseItemError.amount) && (
                        <tr>
                          <td className="pb-2">
                            <ErrorMessage
                              message={expenseItemError.itemName}
                              type="error"
                            />
                          </td>

                          <td className="pb-2">
                            <ErrorMessage
                              message={expenseItemError.retainertype}
                              type="error"
                            />
                          </td>

                          <td className="pb-2">
                            <ErrorMessage
                              message={expenseItemError.amount}
                              type="error"
                            />
                          </td>

                          <td></td>
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
                <div className="w-full">
                  <div className="flex justify-end  m-4 ">
                    <div className="w-[325px] space-y-3 p-4 rounded-md  bg-[#F2F4F6] ">
                      <div className="flex justify-between">
                        <span className="text-sm font-semibold text-[#505F76]">
                          TOTAL AMOUNT
                        </span>
                        <span className="text-sm font-bold text-[#191C1E]">
                          ₹ {subTotal.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2 flex items-stretch">
            <div className="col-span-1 md:col-span-5">
              <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                Payment Method <span className="text-red-500">*</span>
              </label>

              <Select
                ref={paymentMethodRef}
                placeholder="Select Payment Method"
                classNamePrefix="custom"
                styles={CustomStylesCode}
                value={paymentMethod}
                options={accountOptions}
                onChange={handlePaymentMethod}
              />
              {paymentMethodErrmsg && (
                <ErrorMessage message={paymentMethodErrmsg} type="error" />
              )}
            </div>

            <div className="col-span-1 md:col-span-5">
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-2 flex items-stretch">
            <div className="col-span-1 md:col-span-10">
              <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                Description / Notes
              </label>

              <textarea
                rows={4}
                placeholder="Enter Description"
                className="w-full rounded-[8px] border border-[#D9D9D9] px-3 py-3 text-[15px] font-medium text-[#4B4B4B] outline-none resize-none focus:ring-0 focus:border-[#1E45E1]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center  border-t border-[#E8E8E8]">
          <p className="text-[13px] text-[#6B7280]">
            Note: Each Description will generate as Separate Invoices.
          </p>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 rounded-lg border border-[#D9D9D9] text-[#4B4B4B] text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSaveAndGenerate}
              disabled={saveLoading}
              className={`px-6 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
                saveLoading
                  ? "bg-[#1E45E1]/80 cursor-not-allowed"
                  : "bg-[#1E45E1] hover:bg-[#1738BB]"
              } text-white`}
            >
              {saveLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                "Save & Generate"
              )}
            </button>
          </div>
        </div>
      </div>
      {additionalForm && (
        <UserAdditionalContact
          show={additionalForm}
          handleClose={handleCloseAdditionalForm}
          customerId={selectedCustomer?.customerId}
        />
      )}
    </div>
  );
}

export default AddRetainerInvoice;

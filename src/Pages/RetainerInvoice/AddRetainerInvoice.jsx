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
import { CloseCircle, Add } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
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

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
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
function AddRetainerInvoice() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchLoading, setSearchLoading] = useState(false);
  const customerAddError = state.UsersList.customerAddError;

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
  const [errors, setErrors] = useState({
    totalAmount: ""
  });


  const handleSearch = () => {
    if (!state.login.selectedHostel_Id || search.trim() === "") return;

    // dispatch({
    //   type: "TENANT_SEARCH_LIST_SAGA",
    //   payload: {
    //     hostelId: state.login.selectedHostel_Id,
    //     search,
    //   },
    // });
    setSearchLoading(true);
  };

  const handleClose = () => {
    navigate(`/retainer-invoice/${state.login.selectedHostel_Id}`);
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

  const retainerTypeOptions = [
    { value: "advance", label: "Advance" },
    { value: "security_deposit", label: "Security Deposit" },
    { value: "booking", label: "Booking Amount" },
  ];

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    dispatch({
      type: "CUSTOMER_LIST_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        purpose: "ADVANCE_HOLDING"
      },
    });
  }, [state.login.selectedHostel_Id]);

  const customerOptions =
    state.UsersList?.CustomerList?.customersLists?.map((u) => ({
      value: u.customerId,
      label: u.fullName,
    })) || [];

  const handleCustomerName = (selectedOption) => {
    setCustomerName(selectedOption?.value || "");
    // setAllFieldErrmsg("");
    if (!selectedOption) {
      setCustomerErrmsg("Please Select Tenant");
    } else {
      setCustomerErrmsg("");
    }
  };

  console.log("customername", customername);

  const selectedCustomer = state.UsersList?.CustomerList?.customersLists?.find(
    (c) => c.customerId === customername
  );

  const selectedGuardian = selectedCustomer?.guardiansList?.find(
    (g) => g.guardianId === guardianName
  );

  console.log("selectedGuardian", selectedGuardian);

  const GuardianOptions =
    selectedCustomer?.guardiansList?.map((g) => ({
      value: g.guardianId,
      label: g.guardianName,
    })) || [];

  const handleGuardianName = (selectedOption) => {
    setGuardianName(selectedOption?.value || "");
    // setAllFieldErrmsg("");
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

  const paymentMethodOptions = [
    { value: "cash", label: "Cash" },
    { value: "upi", label: "UPI" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "cheque", label: "Cheque" },
    { value: "card", label: "Card" },
  ];

  const handlePaymentMethod = (selectedOption) => {
    setPaymentMethod(selectedOption);

    if (!selectedOption) {
      setPaymentMethodErrmsg("Please Select Payment Method");
    } else {
      setPaymentMethodErrmsg("");
    }
  };

  const handleReceivedAccount = (selectedOption) => {
    setReceivedAccount(selectedOption);

    if (!selectedOption) {
      setReceivedAccountErrmsg("Please Select Received Account");
    } else {
      setReceivedAccountErrmsg("");
    }
  };

  const handleInvoiceDate = (date) => {
    setInvoiceDate(date);

    if (!date) {
      setInvoiceDateErrmsg("Please Select Invoice Date");
    } else {
      setInvoiceDateErrmsg("");
    }
  };

  const handleReferenceChange = (e) => {
    setReferenceNumber(e.target.value);

    if (!e.target.value.trim()) {
      setReferenceNumberErrmsg("Please Enter Reference Number");
    } else {
      setReferenceNumberErrmsg("");
    }
  };

  const handleSaveAndGenerate = () => {
    const payload = {
      hostelId: state.login.selectedHostel_Id,
      customerId: customername,
      guardianId: guardianName,
      relationName: selectedGuardian?.relationShip,
      invoiceDate: invoiceDate
        ? invoiceDate.toISOString().split("T")[0]
        : null,
      referenceNumber: referenceNumber,
      invoiceType: "advance_holding",
      amount: Number(expenseItem.amount || 0),

      description: expenseItem.itemName,
      retainerType: expenseItem.retainertype?.value,

      bankId: receivedAccount?.value,
      paymentMethod: paymentMethod?.value,
      notes: description,
    };

    console.log("Payload :", payload);

    if (!validateForm()) return;

    dispatch({
      type: "CUSTOMER_LIST_ADD",
      payload,
    });

  };

  useEffect(() => {
    if (state.UsersList.customerAddStatusCode === 201) {
      dispatch({
        type: "REMOVE_CUSTOMER_ADD",
      });

      navigate(`/retainer-invoice/${state.login.selectedHostel_Id}`);
    }
  }, [state.UsersList.customerAddStatusCode]);

  useEffect(() => {
    if (customerAddError) {
      console.log(customerAddError);
    }
  }, [customerAddError]);

  useEffect(() => {
    if (!customerAddError) return;

    switch (customerAddError) {
      case "Relation name required":
        setGuardianErrmsg(customerAddError);
        break;

      case "Invoice date required":
        setInvoiceDateErrmsg(customerAddError);
        break;

      case "Payment method required":
        setPaymentMethodErrmsg(customerAddError);
        break;

      default:
        toast.error(customerAddError);
        break;
    }

    dispatch({
      type: "REMOVE_CUSTOMER_ADD_ERROR",
    });
  }, [customerAddError]);

  const validateForm = () => {
    let isValid = true;

    setCustomerErrmsg("");
    setGuardianErrmsg("");
    setInvoiceDateErrmsg("");
    setReceivedAccountErrmsg("");
    setPaymentMethodErrmsg("");

    if (!customername) {
      setCustomerErrmsg("Please Select Tenant");
      isValid = false;
    }

    if (!guardianName) {
      setGuardianErrmsg("Please Select Received From");
      isValid = false;
    }

    if (!invoiceDate) {
      setInvoiceDateErrmsg("Please Select Invoice Date");
      isValid = false;
    }

    if (!receivedAccount) {
      setReceivedAccountErrmsg("Please Select Received Account");
      isValid = false;
    }

    if (!paymentMethod) {
      setPaymentMethodErrmsg("Please Select Payment Method");
      isValid = false;
    }

    return isValid;
  };

  return (
    <div className="block relative font-gilroy ">
      {console.log("dfdj", JSON.stringify(state.UsersList.CustomerList.customersLists))}
      <div className="relative w-full  bg-white  ">
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
        <div className="max-h-[570px] overflow-y-scroll pt-2 mt-2 mr-3 show-scrolls">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-9">
              <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                Tenant Name <span className="text-red-500">*</span>
              </label>

              <div className="relative">
                <div className="flex items-centerounded-lg  bg-white shadow-sm focus-within:border-[#1E45E1] focus-within:ring-2 focus-within:ring-[#1E45E1]/10 transition-all">
                  <div className="flex-1">
                    <Select
                      placeholder="Add or Search Tenant"
                      classNamePrefix="custom"
                      styles={CustomStyles}
                      options={customerOptions}
                      onChange={handleCustomerName}
                      value={
                        customerOptions.find((opt) => opt.value === customername) ||
                        null
                      }
                    />

                  </div>

                  <button
                    type="button"
                    onClick={!searchLoading ? handleSearch : undefined}
                    disabled={searchLoading}
                    className={`h-[48px] w-14 flex items-center justify-center rounded-r-lg bg-[#1E45E1] transition-colors ${searchLoading
                      ? "cursor-not-allowed opacity-80"
                      : "hover:bg-[#1738BB]"
                      }`}
                  >
                    {searchLoading ? (
                      <div className="w-4 h-4 border-2 border-white rounded-lg border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <SearchNormal size="20" color="#FFF" />
                    )}
                  </button>
                </div>
                {customerErrmsg && (
                  <ErrorMessage
                    message={customerErrmsg}
                    type="error"
                  />
                )}
                <p className="mt-2 text-xs text-[#6B7280] leading-5">
                  Search existing tenants in the Property Flow ecosystem to
                  auto-fill tenant details.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-4 mb-2">
            <div className="col-span-1 xl:col-span-9">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Received from{" "}
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <Select
                placeholder="Enter/Select Respective Person"
                classNamePrefix="custom"
                styles={CustomStyles}
                options={GuardianOptions}
                onChange={handleGuardianName}
                value={
                  GuardianOptions.find((opt) => opt.value === guardianName) ||
                  null
                }

              />
              {guardianErrmsg && (
                <ErrorMessage
                  message={guardianErrmsg}
                  type="error"
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-2 flex items-stretch">
            <div className="col-span-1 md:col-span-4">
              <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
                Invoice Date
                <span className="text-red-600 text-[20px]">*</span>
              </label>

              <div className="relative">
                <DatePicker
                  selected={invoiceDate}
                  onChange={handleInvoiceDate}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
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
                <ErrorMessage
                  message={invoiceDateErrmsg}
                  type="error"
                />
              )}
            </div>
            <div className="col-span-1 md:col-span-4 mt-1">
              <label className="font-[Gilroy] text-[14px] font-medium text-[#222]">
                Reference Number
              </label>

              <input
                type="text"
                placeholder="Enter Reference Number"
                value={referenceNumber}
                onChange={handleReferenceChange}
                className="w-full h-[48px] px-[10px] py-[12px] text-[16px] text-[#4B4B4B] font-[Gilroy] font-medium border border-[#D9D9D9] rounded-[8px] outline-none focus:ring-0 mt-2"
              />
            </div>
          </div>

          <div className="mt-8">
            <label className="block mb-2 text-[13px] text-[#222222] font-gilroy font-medium">
              Description{" "}
            </label>
            <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
              <div
                id="tableContainer"
                className="overflow-auto relative h-[200px]  rounded-xl show-scrolls"
              >
                <table className=" w-full font-gilroy ">
                  <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
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
                      <th className="p-2 w-[80px] text-center border border-[#F9FAFB] rounded-r-lg">
                        ACTION
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border border-[#F9FAFB]">
                      <td className="p-2 border border-[#F9FAFB]">
                        <input
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
                          value={expenseItem.retainertype}
                          options={retainerTypeOptions}
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
                            handleItemChange("retainertype", selected)
                          }
                        />
                      </td>

                      <td className="p-2 border border-[#F9FAFB]">
                        <input
                          type="number"
                          value={expenseItem.amount}
                          onChange={(e) =>
                            handleItemChange("amount", e.target.value)
                          }
                          placeholder="0"
                          className="w-full outline-none text-sm rounded-md"
                        />
                      </td>

                      <td className="p-2 text-center ">
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
                <div className="flex justify-end  mt-6 me-6 ">
                  <div className="w-[320px] space-y-3 p-4 rounded-md  bg-[#FAFAFA] ">
                    <div className="flex justify-between">
                      <span className="text-sm">TOTAL RETAINER AMOUNT</span>
                      <span>₹ {subTotal.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div>
              <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                Received Account <span className="text-red-500">*</span>
              </label>

              <Select
                placeholder="Select Received Account"
                classNamePrefix="custom"
                styles={CustomStyles}
                value={receivedAccount}
                options={accountOptions}
                onChange={handleReceivedAccount}
              />
              {receivedAccountErrmsg && (
                <ErrorMessage
                  message={receivedAccountErrmsg}
                  type="error"
                />
              )}
            </div>

            <div>
              <label className="block mb-2 text-[13px] font-medium text-[#222222]">
                Payment Method <span className="text-red-500">*</span>
              </label>

              <Select
                placeholder="Select Payment Method"
                classNamePrefix="custom"
                styles={CustomStyles}
                value={paymentMethod}
                options={paymentMethodOptions}
                onChange={handlePaymentMethod}
              />
              {paymentMethodErrmsg && (
                <ErrorMessage
                  message={paymentMethodErrmsg}
                  type="error"
                />
              )}
            </div>
          </div>

          <div className="mt-5">
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

          <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-[#E8E8E8] pt-5">
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
                className="px-6 py-2 rounded-lg bg-[#1E45E1] text-white text-sm font-medium hover:bg-[#1738BB]"
              >
                Save & Generate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddRetainerInvoice;
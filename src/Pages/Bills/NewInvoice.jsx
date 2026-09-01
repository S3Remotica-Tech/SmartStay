/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";

import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import { DatePicker } from "antd";

import "flatpickr/dist/themes/material_blue.css";
import "react-datepicker/dist/react-datepicker.css";

import dayjs from "dayjs";
import ErrorMessage from "../../Components/ErrorMessage";
import { useNavigate, useLocation } from "react-router-dom";
import { CloseCircle, Add } from "iconsax-react";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "Gilroy",
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
    fontFamily: "Gilroy",
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
const CustomStylesTable = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "45px",
    border: "none",
    boxShadow: "none",
    background: "transparent",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "Gilroy",
    fontWeight: 500,

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
    fontFamily: "Gilroy",
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
function NewInvoice() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const location = useLocation();
  const { id, billData, isDisabledOverview } = location.state || {};

  const [formLoading, setFormLoading] = useState(false);

  const [customername, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [invoicedate, setInvoiceDate] = useState(null);
  const [termsAndConditions, setTermsAndConditions] = useState("");
  const [newRows, setNewRows] = useState([
    {
      itemType: "",
      amount: "0",
      description: "",
      isFromApi: false,
    },
  ]);
  const [customererrmsg, setCustomerErrmsg] = useState("");
  const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [allfielderrmsg, setAllFieldErrmsg] = useState("");
  const [rowErrors, setRowErrors] = useState([]);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const invoiceRef = useRef(null);
  const dueRef = useRef(null);
  const joiningDate = selectedCustomer?.joiningDate;
  const CustomerOverView = state?.UsersList?.customerdetails;
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("%");

  console.log("newRows", newRows);

  const [tableErrmsg, setTableErrmsg] = useState("");

  const subTotal = newRows.reduce((total, row) => {
    return total + Number(row.amount || row.rate || 0);
  }, 0);

  const discountAmount =
    discountType === "%"
      ? (subTotal * Number(discount || 0)) / 100
      : Number(discount || 0);

  const totalAmount = subTotal - discountAmount;

  const customerOptions =
    state.UsersList?.TenantList?.customersLists?.map((u) => ({
      value: u.customerId,
      label: u.fullName,
      details: u,
    })) || [];

  const handleInvoiceChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  useEffect(() => {
    if (billData) {
      dispatch({
        type: "GETINITIALIZEEDITRECURRING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: billData?.invoiceId,
        },
      });
    }
  }, [billData]);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    maxDate: new Date(),
    minDate: null,
  };

  const handleCustomerName = (selectedOption) => {
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    setCustomerName(selectedOption?.value || "");
    setSelectedCustomer(selectedOption?.details);
    setAllFieldErrmsg("");
    if (!selectedOption) {
      setCustomerErrmsg("Please Select Name");
    } else {
      setCustomerErrmsg("");
    }
    setStartDate("");
    setEndDate("");
  };

  const handleBackBill = () => {
    dispatch({ type: "REMOVE_MANUAL_INVOICE_ERROR" });
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    setFormLoading(false);
    setCustomerName("");
    setInvoiceNumber("");
    setStartDate("");
    setEndDate("");
    setInvoiceDate("");
    setCustomerErrmsg("");
    setInvoiceDateErrmsg("");
    setAllFieldErrmsg("");
    setTableErrmsg("");
    setNewRows([]);
    if (state.UsersList.userRoomfor) {
      navigate(`/tenant/details/${customername}`, {
        state: {
          totriggerBillTap: true,
        },
      });
    } else {
      navigate(`/invoice/${state.login.selectedHostel_Id}`);
    }
  };

  const handleInvoiceDate = (selectedDate) => {
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    setAllFieldErrmsg("");

    if (!selectedDate) {
      setInvoiceDate(null);
      setInvoiceDateErrmsg("Please Select Date");
      return;
    }

    setInvoiceDate(selectedDate);
    setInvoiceDateErrmsg("");
  };

  const handleNewRowChange = (index, field, value) => {
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    dispatch({ type: "REMOVE_MANUAL_INVOICE_ERROR" });
    setNewRows((prevRows) =>
      prevRows.map((row, i) =>
        i === index ? { ...row, [field]: value } : row,
      ),
    );
    setAllFieldErrmsg("");
    setTableErrmsg("");
  };

  const isApiEBPresent = newRows.some(
    (row) => row.isFromApi && row.itemType === "EB",
  );

  const handleDeleteNewRow = (index) => {
    dispatch({ type: "REMOVE_MANUAL_INVOICE_ERROR" });
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    setNewRows((prevRows) => {
      const updatedRows = prevRows.filter((_, i) => i !== index);

      return updatedRows;
    });

    setAllFieldErrmsg("");
    setTableErrmsg("");
  };

  const handleCreateBill = () => {
    let hasError = false;
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });

    if (!customername) {
      setCustomerErrmsg("Please Select Tenant");
      hasError = true;
    } else {
      setCustomerErrmsg("");
    }

    if (!invoicedate) {
      setInvoiceDateErrmsg("Please Select Invoice Date");
      hasError = true;
    } else {
      setInvoiceDateErrmsg("");
    }

    if (!Array.isArray(newRows) || newRows.length === 0) {
      setTableErrmsg("Please add at least one item before generating the bill");
      hasError = true;
    }

    const errors = newRows.map((row) => {
      return {
        itemType: !row.itemType?.trim() ? "Please Select or Search Item" : "",
        amount:
          !row.amount || row.amount === "0" || isNaN(Number(row.amount))
            ? "Please Enter Amount"
            : "",
      };
    });

    const hasRowError = errors.some((err) => err.itemType || err.amount);

    if (hasRowError) {
      setRowErrors(errors);
      hasError = true;
    } else {
      setRowErrors([]);
    }

    if (joiningDate) {
      const formattedJoiningDate = dayjs(joiningDate, "DD/MM/YYYY").format(
        "YYYY-MM-DD",
      );

      const formattedInvoiceDate = dayjs(invoicedate).format("YYYY-MM-DD");

      if (dayjs(formattedInvoiceDate).isBefore(formattedJoiningDate, "day")) {
        setInvoiceDateErrmsg("Before join date not allowed");
        hasError = true;
      }
    }

    if (hasError) {
      return;
    }

    const formatinvoicedate = dayjs(invoicedate).format("DD-MM-YYYY");
    dispatch({
      type: "MANUAL-INVOICE-ADD",
      payload: {
        customerId: customername,
        invoiceDate: formatinvoicedate,
        invoiceNumber: invoicenumber,
        total_amount: totalAmount,
        items: newRows.map((row) => ({
          invoiceItem: row.itemType,
          amount: parseFloat(row.amount) || 0,
        })),
      },
    });

    setFormLoading(true);
  };

  const handleEditBill = () => {
    dispatch({ type: "REMOVE_MANUAL_INVOICE_ERROR" });
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    let hasError = false;
    setCustomerErrmsg("");
    setInvoicenumberErrmsg("");
    setInvoiceDateErrmsg("");
    setAllFieldErrmsg("");

    if (!Array.isArray(newRows) || newRows.length === 0) {
      setTableErrmsg("Please add at least one item before generating the bill");
      hasError = true;
    }

    const errors = newRows.map((row) => {
      return {
        itemType: !row.itemType?.trim() ? "Please Select or Search Item" : "",
        amount:
          !row.amount || row.amount === "0" || isNaN(Number(row.amount))
            ? "Please Enter Amount"
            : "",
      };
    });

    const hasRowError = errors.some((err) => err.itemType || err.amount);

    if (hasRowError) {
      setRowErrors(errors);
      hasError = true;
    } else {
      setRowErrors([]);
    }

    if (hasError) {
      return;
    }

    if (billData?.invoiceId) {
      setFormLoading(true);
      dispatch({
        type: "MANUAL-INVOICE-EDIT",
        hostelId: state.login.selectedHostel_Id,
        invoiceId: billData?.invoiceId,
        payload: newRows?.map((row) => ({
          type: row.itemType,
          amount: parseFloat(row.amount),
        })),
      });

      setCustomerErrmsg("");
      setInvoiceDateErrmsg("");
      setAllFieldErrmsg("");
    }
  };

  const handleAddNewRow = () => {
    const hasAdvance = newRows.some((row) => row.itemType === "advance");

    if (hasAdvance) {
      return;
    }
    setNewRows((prev) => [
      ...prev,
      {
        itemType: "",
        amount: "0",
        description: "",
        isFromApi: false,
      },
    ]);
    setRowErrors([]);
  };

  useEffect(() => {
    if (id || billData?.customerId) {
      const selectedCustomer = state.UsersList.TenantList.customersLists?.find(
        (u) => u.customerId === (id || billData?.customerId),
      );

      if (selectedCustomer) {
        setCustomerName(selectedCustomer.customerId);
      }
    }
  }, [id, state.UsersList?.TenantList?.customersLists, billData]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (!billData) return;
    setCustomerName(billData.customerId || CustomerOverView?.customerId || id);
    setInvoiceNumber(billData.invoiceNumber);
    setInvoiceDate(
      dayjs(
        billData.invoiceDate || billData?.invoiceGeneratedDate,
        "DD/MM/YYYY",
      ),
    );

    if (
      Array.isArray(state.InvoiceList?.getInitializeRecurring?.invoiceItems)
    ) {
      const formattedRows =
        state.InvoiceList.getInitializeRecurring.invoiceItems.map((item) => ({
          itemType: item.description || "",
          amount: String(item.amount || ""),
          isFromApi: true,
          isRent: item.description === "Rent",
        }));

      // setOriginalRows(formattedRows);
      setNewRows(formattedRows);
    } else {
      // setOrigisnalRows([]);
      setNewRows([]);
    }
  }, [billData, state.InvoiceList?.getInitializeRecurring?.invoiceItems]);

  useEffect(() => {
    if (
      state.InvoiceList.recurringEditError ||
      state.InvoiceList.unableAddInvoiceDetailsError
    ) {
      setFormLoading(false);
    }
  }, [
    state.InvoiceList.recurringEditError,
    state.InvoiceList.unableAddInvoiceDetailsError,
  ]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          purpose: "ADVANCE_HOLDING",
        },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (
      state.InvoiceList.manualInvoiceAddStatusCode === 201 ||
      state.InvoiceList.manualInvoiceEditStatusCode === 200
    ) {
      setFormLoading(false);
      setCustomerName("");
      setInvoiceNumber("");
      setStartDate("");
      setEndDate("");
      setInvoiceDate("");
      //   setTotalAmount("");
      if (state.UsersList.userRoomfor) {
        navigate(`/tenant/details/${id}`, {
          state: {
            totriggerBillTap: true,
          },
        });
      } else {
        navigate(`/invoice/${state.login.selectedHostel_Id}`);
      }
      setNewRows([]);

      if (id) {
        dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: id } });
      }

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
      }, 300);
    }
  }, [
    state.InvoiceList.manualInvoiceAddStatusCode,
    state.InvoiceList.manualInvoiceEditStatusCode,
  ]);

  const optionsone = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    minDate: null,
  };

  useEffect(() => {
    if (startRef.current) {
      startRef.current.flatpickr.set(options);
    }
    if (endRef.current) {
      endRef.current.flatpickr.set(options);
    }
    if (invoiceRef.current) {
      invoiceRef.current.flatpickr.set(options);
    }
    if (dueRef.current) {
      dueRef.current.flatpickr.set(optionsone);
    }
  }, [startdate, enddate, invoicedate]);

  const getItemOptions = (currentIndex) => {
    const options = [];

    const advanceAlreadySelected = newRows.some(
      (row, index) => index !== currentIndex && row.itemType === "advance",
    );

    if (advanceAlreadySelected) {
      return [];
    }

    const roomRentAlreadySelected = newRows.some(
      (row, index) => index !== currentIndex && row.itemType === "RoomRent",
    );

    const ebAlreadySelected = newRows.some(
      (row, index) => index !== currentIndex && row.itemType === "EB",
    );

    if (!billData && !roomRentAlreadySelected) {
      options.push({
        value: "RoomRent",
        label: "Room Rent",
      });
    }

    options.push({
      value: "advance",
      label: "Advance",
    });

    if (!isApiEBPresent && !ebAlreadySelected) {
      options.push({
        value: "EB",
        label: "EB",
      });
    }

    options.push({
      value: "Other",
      label: "Other",
    });

    return options;
  };

  useEffect(() => {
    const advanceIndex = newRows.findIndex((row) => row.itemType === "advance");

    if (advanceIndex === -1 || newRows.length === 1) {
      return;
    }

    setNewRows((prev) => {
      const advanceRow = prev.find((row) => row.itemType === "advance");

      return advanceRow ? [advanceRow] : prev;
    });
  }, [newRows]);

  return (
    <div className=" relative font-gilroy flex flex-col">
      <div
        className="sticky top-0 left-0 z-[1000] w-full h-[40px] bg-white px-[5px] py-1 flex items-start
       justify-between whitespace-nowrap"
      >
        <div className=" flex items-center gap-2 font-medium text-[18px] font-gilroy">
          {billData ? "Edit Invoice" : "New Invoice"}
        </div>

        <button
          onClick={handleBackBill}
          className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 
                      items-center px-2 py-1 font-gilroy "
        >
          <Add size="24" color="#FF0000" className="cursor-pointer rotate-45" />{" "}
          Close
        </button>
      </div>
      <div className="show-scrolls flex-1 overflow-y-auto max-h-[550px]">
        <div className="grid grid-cols-10  gap-4 mt-2 flex items-stretch ">
          <div className="col-span-8">
            <div className="mb-3">
              <label className="font-[Gilroy] text-[12px] font-medium text-[#222]">
                Select Tenant{" "}
                <span className="text-red-500 text-[20px]">*</span>
              </label>

              <Select
                options={customerOptions}
                onChange={handleCustomerName}
                value={
                  customerOptions.find((opt) => opt.value === customername) ||
                  null
                }
                isDisabled={billData || isDisabledOverview}
                placeholder="Select Customer"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No customers available"}
                styles={CustomStyles}
              />

              {customererrmsg.trim() !== "" && (
                <ErrorMessage message={customererrmsg} type="error" />
              )}
            </div>
          </div>
        </div>

        {selectedCustomer && (
          <div className="grid grid-cols-10 gap-4 my-2 font-gilroy">
            <div className="col-span-12 md:col-span-8">
              <div className="bg-[#F8F9FC] rounded-xl px-4 py-4 flex flex-col md:flex-row md:justify-between md:items-start gap-5">
                <div className="flex items-start gap-3">
                  {selectedCustomer?.profilePic ? (
                    <img
                      src={selectedCustomer.profilePic}
                      alt={selectedCustomer.fullName}
                      className="w-11 h-11 rounded-full object-cover border border-gray-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-11 h-11 rounded-full bg-[#1E45E1] text-white flex flex-shrink-0 items-center justify-center text-sm font-semibold uppercase">
                      {selectedCustomer?.initials ||
                        selectedCustomer?.fullName?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-[14px] font-semibold text-[#222222]">
                      {selectedCustomer?.fullName}
                    </h3>

                    <p className="mt-1 text-[11px] text-[#6B7280]">
                      {selectedCustomer?.stayInfo?.floorName || "floor"} |{" "}
                      {selectedCustomer?.stayInfo?.roomName || "room"} |{" "}
                      {selectedCustomer?.stayInfo?.bedName || "bed"}
                    </p>
                  </div>
                </div>

                <div className="min-w-[500px]">
                  <div className="flex items-center gap-1 mb-1">
                    <p className="text-[12px] font-semibold text-[#222222] mb-0">
                      Billed to
                    </p>
                  </div>
                  <p className="text-[12px] text-[#555] mb-0">
                    {selectedCustomer?.addressInfo?.houseNo || "Address"},
                  </p>
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
                        {selectedCustomer.addressInfo.city || "City"} ,
                      </p>
                    )}
                    {selectedCustomer?.addressInfo?.pincode !== 0 && (
                      <p className="text-[12px] text-[#555] mb-0">
                        {selectedCustomer?.addressInfo?.pincode || "pincode"},
                      </p>
                    )}
                  </div>

                  {selectedCustomer?.addressInfo?.state && (
                    <p className="text-[12px] text-[#555] mb-0 capitalize">
                      {selectedCustomer.addressInfo.state || "State"}
                    </p>
                  )}

                  <p className="mt-1 text-[12px] text-[#555] mb-0">
                    + {selectedCustomer?.country || "country"}{" "}
                    {selectedCustomer?.mobile || "mobile No"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
          <div className="col-span-4">
            <label className="font-[Gilroy] text-[12px] font-medium text-[#222]">
              Invoice Number{" "}
              <span className="text-transparent select-none text-[20px]">
                *
              </span>
            </label>

            <input
              disabled={billData}
              type="text"
              placeholder="Enter Invoice Number"
              value={invoicenumber || ""}
              onChange={handleInvoiceChange}
              className="w-full h-[48px] px-[10px] py-[12px] text-[14px] text-[#4B4B4B] font-[Gilroy] font-medium border border-[#D9D9D9] rounded-[8px] outline-none focus:ring-0"
            />

            {invoicenumbererrmsg.trim() !== "" && (
              <ErrorMessage message={invoicenumbererrmsg} type="error" />
            )}
          </div>
          <div className="col-span-4">
            <label className="font-[Gilroy] text-[12px] font-medium text-[#222]">
              Invoice Date <span className="text-red-500 text-[20px]">*</span>
            </label>

            <div className="relative w-full datepicker-wrapper">
              <DatePicker
                disabled={billData}
                className="w-full h-[48px] cursor-pointer font-[Gilroy] text-sm"
                format="DD/MM/YYYY"
                placeholder="DD/MM/YYYY"
                value={invoicedate ? dayjs(invoicedate) : null}
                onChange={(date) => handleInvoiceDate(date)}
                disabledDate={(current) =>
                  current &&
                  (current < dayjs(joiningDate, "DD/MM/YYYY").startOf("day") ||
                    current > dayjs().endOf("day"))
                }
              />
            </div>

            {invoicedateerrmsg.trim() !== "" && (
              <ErrorMessage message={invoicedateerrmsg} type="error" />
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-10 gap-4 w-full">
          <div className="col-span-1 md:col-span-8 min-w-0">
            <div className="mt-3  w-full border border-[#DCDCDC] rounded-[8px] overflow-hidden font-gilroy">
              <table className="   table-fixed border-collapse">
                <thead>
                  <tr className="bg-[#F7F7F7] border">
                    <th className="w-[27%] px-3 py-2 text-left text-[12px] font-medium text-[#737373] uppercase">
                      Item Details
                    </th>

                    <th className="w-[14%] px-2 py-2 text-left text-[12px] font-medium text-[#737373] uppercase">
                      Amount
                    </th>

                    <th className="w-[11%] px-2 py-2 text-center text-[12px] font-medium text-[#737373] uppercase">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="max-h-[300px] overflow-y-auto">
                  {newRows?.map((u, index) => (
                    <React.Fragment key={index}>
                      <tr className="border-b border-[#EEEEEE] text-[14px]">
                        <td className="px-1 py-1">
                          {u.itemType === "Other" ? (
                            <div className="flex items-center gap-1">
                              <input
                                type="text"
                                autoFocus
                                value={u.itemType || ""}
                                onChange={(e) => {
                                  handleNewRowChange(
                                    index,
                                    "itemType",
                                    e.target.value,
                                  );

                                  setRowErrors((prev) => {
                                    const updated = [...prev];

                                    if (updated[index]) {
                                      updated[index].itemType = "";
                                    }

                                    return updated;
                                  });
                                }}
                                placeholder="Enter Item Name"
                                className="
          w-full
          h-[45px]
          px-1
          text-[14px]
          border-0
          outline-none
          bg-transparent
          placeholder:text-[#A5A5A5]
        "
                              />

                              <button
                                type="button"
                                onClick={() => {
                                  handleNewRowChange(index, "itemType", "");
                                }}
                                className="text-[#999999] text-[12px]"
                              >
                                <Add color="#ff0000" className="rotate-45" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center gap-1">
                                <div className="flex-1">
                                  <Select
                                    value={
                                      u.itemType
                                        ? {
                                            value: u.itemType,
                                            label:
                                              u.itemType === "RoomRent"
                                                ? "Room Rent"
                                                : u.itemType === "EB"
                                                  ? "EB"
                                                  : u.itemType === "advance"
                                                    ? "Advance"
                                                    : "Other",
                                          }
                                        : null
                                    }
                                    onChange={(selected) => {
                                      const value = selected?.value || "";

                                      handleNewRowChange(
                                        index,
                                        "itemType",
                                        value,
                                      );

                                      setRowErrors((prev) => {
                                        const updated = [...prev];

                                        if (updated[index]) {
                                          updated[index].itemType = "";
                                        }

                                        return updated;
                                      });
                                    }}
                                    placeholder="Select or Search the Item"
                                    options={getItemOptions(index)}
                                    isSearchable
                                    isDisabled={u.isFromApi}
                                    classNamePrefix="custom"
                                    menuPlacement="auto"
                                    menuPortalTarget={document.body}
                                    styles={CustomStylesTable}
                                  />

                                  {["RoomRent", "advance", "EB"].includes(
                                    u.itemType,
                                  ) && (
                                    <input
                                      type="text"
                                      value={u.description || ""}
                                      onChange={(e) =>
                                        handleNewRowChange(
                                          index,
                                          "description",
                                          e.target.value,
                                        )
                                      }
                                      placeholder="Add a description to your item"
                                      className="
            w-full
            h-[28px]
            px-2 py-4 rounded
            text-[12px]
            text-[#0A0A0A80]
            border-0
            outline-none
            bg-[#F9F9F9] font-semibold
            placeholder:text-[#0A0A0A80]
          "
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          )}
                        </td>

                        <td className="px-1 py-1 border-l border-[#EEEEEE]">
                          <input
                            type="number"
                            onWheel={(e) => e.target.blur()}
                            value={u.rate !== "0" ? u.rate : ""}
                            placeholder="₹ 0"
                            onChange={(e) => {
                              const value = e.target.value;

                              if (/^-?\d*\.?\d*$/.test(value)) {
                                handleNewRowChange(index, "amount", value);
                              }

                              setRowErrors((prev) => {
                                const updated = [...prev];

                                if (updated[index]) {
                                  updated[index].amount = "";
                                }

                                return updated;
                              });
                            }}
                            className="
                      w-full
                      h-[30px]
                      px-1
                      text-[14px]
                      border-0
                      outline-none
                      bg-transparent
                    "
                          />
                        </td>

                        <td className="px-1 py-1 border-l border-[#EEEEEE]">
                          <div className="flex items-center justify-center gap-2">
                            <CloseCircle
                              onClick={() =>
                                !u.isFromApi && handleDeleteNewRow(index)
                              }
                              size="18"
                              className={
                                u.isFromApi
                                  ? "text-gray-400 cursor-not-allowed opacity-40"
                                  : "text-red-500 cursor-pointer"
                              }
                            />
                          </div>
                        </td>
                      </tr>

                      {(rowErrors[index]?.itemType ||
                        rowErrors[index]?.amount) && (
                        <tr className="border-b border-[#EEEEEE]">
                          <td className="px-3 pb-2">
                            {rowErrors[index]?.itemType && (
                              <ErrorMessage
                                message={rowErrors[index].itemType}
                                type="error"
                              />
                            )}
                          </td>

                          <td colSpan={2} className="px-3 pb-2">
                            {rowErrors[index]?.amount && (
                              <ErrorMessage
                                message={rowErrors[index].amount}
                                type="error"
                              />
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 mt-2 gap-4">
          <div className="col-span-4">
            <button
              type="button"
              onClick={handleAddNewRow}
              className="
        inline-flex
        items-center
        gap-1.5
        
        px-2.5
        py-2
        rounded-[4px]
        bg-[#EAEEFF]
        text-[#1E45E1]
        text-[14px]
        font-medium
        hover:bg-[#E3E9FF]
        transition-colors
      "
            >
              <Add size="12" color="#315BEA" />
              Add New Row
            </button>
          </div>

          <div className="col-span-4">
            <div className="w-full  overflow-hidden rounded-[4px]">
              <div className="flex items-center justify-between px-3 py-1.5 bg-[#FAFAFA]">
                <span className="text-[12px] text-[#4B4B4B]">Sub Total</span>

                <span className="text-[14px]  font-semibold  text-[#1E1E1E]">
                  {" "}
                  ₹{" "}
                  {subTotal.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between px-3 py-2 bg-[#FAFAFA]">
                <span className="text-[12px] text-[#4B4B4B]">Discount</span>

                <div className="flex items-center gap-1">
                  <div className="flex shrink-0 overflow-hidden rounded border border-[#DCDCDC]">
                    <button
                      type="button"
                      onClick={() => setDiscountType("₹")}
                      className={`
        px-2.5
        py-1
        text-[10px]
        ${
          discountType === "₹"
            ? "bg-[#315BEA] text-white"
            : "bg-[#EEF2FF] text-[#315BEA]"
        }
      `}
                    >
                      ₹
                    </button>

                    <button
                      type="button"
                      onClick={() => setDiscountType("%")}
                      className={`
        px-2.5
        py-1
        text-[10px]
        ${
          discountType === "%"
            ? "bg-[#315BEA] text-white"
            : "bg-[#EEF2FF] text-[#315BEA]"
        }
      `}
                    >
                      %
                    </button>
                  </div>
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (discountType === "%" && Number(value) > 100) {
                        value = "100";
                      }

                      setDiscount(value);
                    }}
                    placeholder="0"
                    className="
      w-[55px]
      h-[26px]
      px-1
      text-[12px]
      text-right font-semibold
      border border-[#DCDCDC]
      rounded-[3px]
      outline-none
      bg-white
    "
                  />
                </div>
              </div>

              <div className="flex items-center justify-between px-3 py-2.5 bg-[#F2F4F6]">
                <span className="text-[14px] font-bold text-[#505F76]">
                  TOTAL AMOUNT
                </span>

                <span className="text-[16px] font-bold text-[#1E1E1E]">
                  ₹{" "}
                  {Number(totalAmount || 0).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 mt-2 gap-4">
          <div className="col-span-1 md:col-span-8 min-w-0">
            <label className="block mb-1.5 text-[12px] font-medium text-[#444444]">
              Terms & Conditions
            </label>

            <textarea
              value={termsAndConditions}
              onChange={(e) => setTermsAndConditions(e.target.value)}
              rows={4}
              placeholder="Enter the terms & conditions for this invoice"
              className="
      w-full
 
      resize-none
      rounded-[5px]
      border
      border-[#DCDCDC]
      px-2
      py-2
      text-[14px]
      text-[#333333]
      outline-none
      placeholder:text-[#A5A5A5]
      focus:border-[#B8C4E8]
    "
            />
          </div>
        </div>

        <div>
          {allfielderrmsg.trim() !== "" && (
            <ErrorMessage message={allfielderrmsg} type="error" />
          )}
          {tableErrmsg.trim() !== "" && (
            <ErrorMessage message={tableErrmsg} type="error" />
          )}
          {state.InvoiceList.unableAddInvoiceDetailsError && (
            <ErrorMessage
              message={state.InvoiceList.unableAddInvoiceDetailsError}
              type="error"
            />
          )}

          {state.InvoiceList.recurringEditError && (
            <div className="flex justify-center my-1">
              <ErrorMessage
                message={state.InvoiceList.recurringEditError}
                type="error"
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="m-0 text-[14px] text-[#505F76]">
          Note: Each Description will generates as Separate Invoices.
        </p>

        <div className="flex items-center gap-5">
          <button
            onClick={handleBackBill}
            type="button"
            className="
        text-[10px]
        text-[#333333]
        hover:text-black text-[16px] font-[Gilroy] 
      "
          >
            Cancel
          </button>

          <button
            disabled={formLoading}
            onClick={billData ? handleEditBill : handleCreateBill}
            className="w-fit  bg-[#1E45E1] text-white px-5 font-medium h-[40px] 
                    rounded-[8px] text-[16px] font-[Gilroy] 
                     disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!cursor-not-allowed disabled:!opacity-70"
          >
            {billData ? "Save Changes" : "Save & Generate"}
          </button>
        </div>
      </div>

      {formLoading && (
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-75 z-10">
          <div className="w-[40px] h-[40px] border-t-4 border-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}

export default NewInvoice;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FormControl } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import { DatePicker } from "antd";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
import "react-datepicker/dist/react-datepicker.css";
import leftarrow from "../../Assets/Images/arrow-left.png";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import ErrorMessage from "../../Components/ErrorMessage";
// import Closebtn from "../../Assets/Images/CloseCircle.png";
import { useNavigate, useLocation } from "react-router-dom";
import { CloseCircle } from "iconsax-react";

function CreateBill() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const location = useLocation();
  const { id, billData } = location.state || {};

  const [formLoading, setFormLoading] = useState(false);

  const [dropdownValue, setDropdownValue] = useState("");
  // const [selectedUserId, setSelectedUserId] = useState("");
  const [customername, setCustomerName] = useState("");
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [invoicedate, setInvoiceDate] = useState(null);
  // const [invoiceduedate, setInvoiceDueDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");
  const [newRows, setNewRows] = useState([]);
  const [customererrmsg, setCustomerErrmsg] = useState("");
  const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  // const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
  const [allfielderrmsg, setAllFieldErrmsg] = useState("");
  // const [amenityArray, setamenityArray] = useState([]);

  const startRef = useRef(null);
  const endRef = useRef(null);
  const invoiceRef = useRef(null);
  const dueRef = useRef(null);

  // const calendarRef = useRef(null);;
  const [tableErrmsg, setTableErrmsg] = useState("");

  const [hostelId, setHostelId] = useState("");

  const [selectedTypes, setSelectedTypes] = useState([]);

  // const [unableAddInvoiceDetailsError, setUnableAddInvoiceDetailsError] = useState("")

  useEffect(() => {
    if (id || billData?.customerId) {
      const selectedCustomer = state.UsersList.TenantList.find(
        (u) => u.customerId === (id || billData?.customerId),
      );

      // console.log("selectedCustomer", selectedCustomer);

      if (selectedCustomer) {
        setCustomerName(selectedCustomer.customerId);
      }
    }
  }, [id, state.UsersList?.TenantList, billData]);

  const customerOptions =
    state.UsersList?.TenantList?.map((u) => ({
      value: u.customerId,
      label: u.fullName,
    })) || [];

  const handleInvoiceChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostelId(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);
  useEffect(() => {
    if (hostelId) {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [hostelId]);

  // console.log("billData", billData);
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

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (customername) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: customername },
      });
    }
  }, [customername]);

  // console.log("customername", customername);

  useEffect(() => {
    if (!billData) {
      const SelectedCustomerRoomRent =
        state.UsersList?.customerdetails?.hostelInfo?.monthlyRent;

      if (SelectedCustomerRoomRent) {
        setNewRows((prevRows) => {
          const roomRentIndex = prevRows.findIndex(
            (row) => row.am_name === "Room Rent",
          );

          if (roomRentIndex !== -1) {
            const updatedRows = [...prevRows];
            updatedRows[roomRentIndex].amount =
              SelectedCustomerRoomRent.toString();
            return updatedRows;
          } else {
            return [
              ...prevRows,
              {
                am_name: "Room Rent",
                amount: SelectedCustomerRoomRent.toString(),
              },
            ];
          }
        });

        setSelectedTypes((prev) => {
          const updated = prev.includes("RoomRent")
            ? prev
            : [...prev, "RoomRent"];
          return updated;
        });

        // console.log("selectedTypes", selectedTypes)

        setTimeout(() => {
          dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
        }, 500);
      }
    }
  }, [
    state.UsersList?.customerdetails?.hostelInfo?.monthlyRent,
    customername,
    state.UsersList?.CustomerdetailsgetStatuscode,
  ]);

  useEffect(() => {
    if (!customername) {
      setSelectedTypes([]);
      setNewRows([]);
    }
  }, [customername]);

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    maxDate: new Date(),
    minDate: null,
  };

  const handleCustomerName = (selectedOption) => {
    setCustomerName(selectedOption?.value || "");
    setAllFieldErrmsg("");
    if (!selectedOption) {
      setCustomerErrmsg("Please Select Name");
    } else {
      setCustomerErrmsg("");
    }
    setStartDate("");
    setEndDate("");
    setTotalAmount("");
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
    // setInvoiceDueDate("");
    setTotalAmount("");
    setCustomerErrmsg("");
    setInvoiceDateErrmsg("");
    // setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");
    setTableErrmsg("");
    // setamenityArray([]);
    setNewRows([]);
    setDropdownValue("");
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

  // const formatDateForPayloadmanualinvoice = (date) => {
  //     return dayjs(date).format("YYYY-MM-DD");
  // };

  const handleInvoiceDate = (selectedDate) => {
    setAllFieldErrmsg("");

    if (!selectedDate) {
      setInvoiceDate(null);
      setInvoiceDateErrmsg("Please Select Date");
      return;
    }

    setInvoiceDate(selectedDate);
    setInvoiceDateErrmsg("");
  };

  const CustomStartDateInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={value || "DD/MM/YYYY"}
          readOnly
          ref={ref}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        />
        <img
          src={Calendars}
          style={{
            height: 24,
            width: 24,
            marginLeft: 10,
            cursor: "pointer",
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          alt="Calendar"
          onClick={onClick}
        />
      </div>
    );
  });
  CustomStartDateInput.displayName = "CustomStartDateInput";

  const CustomEndDateInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={value || "DD/MM/YYYY"}
          readOnly
          ref={ref}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        />
        <img
          src={Calendars}
          style={{
            height: 24,
            width: 24,
            marginLeft: 10,
            cursor: "pointer",
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          alt="Calendar"
          onClick={onClick}
        />
      </div>
    );
  });

  CustomEndDateInput.displayName = "CustomEndDateInput";

  const CustomInvoiceDateInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={value || "DD/MM/YYYY"}
          readOnly
          ref={ref}
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
            backgroundColor: "#fff",
            cursor: "pointer",
          }}
        />
        <img
          src={Calendars}
          style={{
            height: 24,
            width: 24,
            marginLeft: 10,
            cursor: "pointer",
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
          }}
          alt="Calendar"
          onClick={onClick}
        />
      </div>
    );
  });
  CustomInvoiceDateInput.displayName = "CustomInvoiceDateInput";
  const CustomInvoiceDueDateInput = React.forwardRef(
    ({ value, onClick }, ref) => {
      return (
        <div
          className="date-input-container w-100"
          onClick={onClick}
          style={{ position: "relative" }}
        >
          <FormControl
            type="text"
            className="date_input"
            value={value || "DD/MM/YYYY"}
            readOnly
            ref={ref}
            style={{
              border: "1px solid #D9D9D9",
              borderRadius: 8,
              padding: 9,
              fontSize: 14,
              fontFamily: "Gilroy",
              fontWeight: value ? 600 : 500,
              width: "100%",
              height: 50,
              boxSizing: "border-box",
              boxShadow: "none",
              backgroundColor: "#fff",
              cursor: "pointer",
            }}
          />
          <img
            src={Calendars}
            style={{
              height: 24,
              width: 24,
              marginLeft: 10,
              cursor: "pointer",
              position: "absolute",
              right: 10,
              top: "50%",
              transform: "translateY(-50%)",
            }}
            alt="Calendar"
            onClick={onClick}
          />
        </div>
      );
    },
  );

  CustomInvoiceDueDateInput.displayName = "CustomInvoiceDueDateInput";

  const handleNewRowChange = (index, field, value) => {
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
    (row) => row.isFromApi && row.am_name === "EB",
  );

  const handleRowTypeSelect = (type) => {
    dispatch({ type: "REMOVE_MANUAL_INVOICE_ERROR" });
    let newRow = {
      am_name: "",
      amount: "0",
      isFromApi: false,
    };

    if (type === "RoomRent") {
      newRow.am_name = "Room Rent";
    } else if (type === "EB") {
      newRow.am_name = "EB";
    }

    setNewRows((prev) => [...prev, newRow]);

    if (type !== "Other" && !selectedTypes.includes(type)) {
      setSelectedTypes((prev) => [...prev, type]);
    }

    setAllFieldErrmsg("");
    setTableErrmsg("");

    setDropdownValue("");
  };

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const deletedRow = prevRows[index];
      const updatedRows = prevRows.filter((_, i) => i !== index);

      if (deletedRow.am_name === "Room Rent") {
        setSelectedTypes((prevTypes) =>
          prevTypes.filter((type) => type !== "RoomRent"),
        );
      } else if (deletedRow.am_name === "EB") {
        setSelectedTypes((prevTypes) =>
          prevTypes.filter((type) => type !== "EB"),
        );
      }

      return updatedRows;
    });

    setAllFieldErrmsg("");
    setTableErrmsg("");
  };

  useEffect(() => {
    const types = [];
    newRows.forEach((row) => {
      if (row.am_name === "Room Rent") types.push("RoomRent");
      else if (row.am_name === "EB") types.push("EB");
    });
    setSelectedTypes(types);
  }, []);

  const handleCreateBill = () => {
    let hasError = false;
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

    // if (!invoiceduedate) {
    //     setInvoiceDueDateErrmsg("Please Select Due Date");
    //     hasError = true;
    // } else {
    //     setInvoiceDueDateErrmsg("");
    // }

    if (!Array.isArray(newRows) || newRows.length === 0) {
      setTableErrmsg(
        "Please Add At Least One Item Row Before Generating The Bill",
      );
      hasError = true;
    } else if (
      newRows.some(
        (row) =>
          !row.am_name?.trim() ||
          row.amount === "" ||
          row.amount === null ||
          row.amount === undefined ||
          isNaN(row.amount) ||
          parseFloat(row.amount) <= 0,
      )
    ) {
      setTableErrmsg(
        "Please Fill All Details & Amount > 0 Before Generating The Bill",
      );
      hasError = true;
    } else {
      setTableErrmsg("");
    }

    const selectedUser =
      state.UsersList?.customerdetails?.hostelInfo?.joiningDate;

    // console.log("selectedUser", selectedUser);
    if (selectedUser) {
      const formattedJoiningDate = dayjs(selectedUser, "DD/MM/YYYY").format(
        "YYYY-MM-DD",
      );

      const formattedInvoiceDate = dayjs(invoicedate).format("YYYY-MM-DD");
      // const formattedDueDate = dayjs(invoiceduedate).format("YYYY-MM-DD");

      if (dayjs(formattedInvoiceDate).isBefore(formattedJoiningDate, "day")) {
        setInvoiceDateErrmsg("Before join date not allowed");
        hasError = true;
      }

      // if (dayjs(formattedDueDate).isBefore(formattedJoiningDate, "day")) {
      //     setInvoiceDueDateErrmsg("Before join date not allowed");
      //     hasError = true;
      // }

      // if (dayjs(formattedDueDate).isBefore(formattedInvoiceDate, "day")) {
      //     setInvoiceDueDateErrmsg("Due date cannot be before invoice date");
      //     hasError = true;
      // }
    }

    if (hasError) {
      return;
    }

    const formatinvoicedate = dayjs(invoicedate).format("DD-MM-YYYY");
    // const formatduedate = dayjs(invoiceduedate).format("DD-MM-YYYY");

    dispatch({
      type: "MANUAL-INVOICE-ADD",
      payload: {
        customerId: customername,
        invoiceDate: formatinvoicedate,
        // dueDate: formatduedate,
        invoiceNumber: invoicenumber,
        total_amount: totalAmount,
        items: newRows.map((row) => ({
          invoiceItem: row.am_name,
          amount: parseFloat(row.amount) || 0,
        })),
      },
    });

    setFormLoading(true);
  };

  // console.log("billData", billData)
  const [originalRows, setOriginalRows] = useState([]);

  // const getChangedRows = () => {
  //   return newRows.filter((row, index) => {
  //     const original = originalRows[index];

  //     if (!original) return true;

  //     return (
  //       row.am_name !== original.am_name ||
  //       Number(row.amount) !== Number(original.amount)
  //     );
  //   });
  // };
  const CustomerOverView = state?.UsersList?.customerdetails;

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
    setTotalAmount(billData.baseAmount);

    if (
      Array.isArray(state.InvoiceList?.getInitializeRecurring?.invoiceItems)
    ) {
      const formattedRows =
        state.InvoiceList.getInitializeRecurring.invoiceItems.map((item) => ({
          am_name: item.description || "",
          amount: String(item.amount || ""),
          isFromApi: true,
          isRent: item.description === "Rent",
        }));

      setOriginalRows(formattedRows);
      setNewRows(formattedRows);
    } else {
      setOriginalRows([]);
      setNewRows([]);
    }
  }, [billData, state.InvoiceList?.getInitializeRecurring?.invoiceItems]);

  const handleEditBill = () => {
    dispatch({ type: "REMOVE_MANUAL_INVOICE_ERROR" });
    let hasError = false;
    setCustomerErrmsg("");
    setInvoicenumberErrmsg("");
    setInvoiceDateErrmsg("");
    // setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");

    if (!Array.isArray(newRows) || newRows.length === 0) {
      setTableErrmsg(
        "Please Add At Least One Item Row Before Generating The Bill",
      );
      hasError = true;
    } else if (
      newRows.some(
        (row) =>
          !row.am_name?.trim() ||
          row.amount === "" ||
          row.amount === null ||
          row.amount === undefined ||
          isNaN(row.amount) ||
          parseFloat(row.amount) <= 0,
      )
    ) {
      setTableErrmsg(
        "Please Fill All Details & Amount > 0 Before Generating The Bill",
      );
      hasError = true;
    } else {
      setTableErrmsg("");
    }

    if (hasError) {
      return;
    }
    // const changedRows = getChangedRows();

    // if (changedRows.length === 0) {
    //   setTableErrmsg("No changes detected to update");
    //   return;
    // }
    if (billData?.invoiceId) {
      setFormLoading(true);
      dispatch({
        type: "MANUAL-INVOICE-EDIT",
        hostelId: state.login.selectedHostel_Id,
        invoiceId: billData?.invoiceId,
        payload: newRows?.map((row) => ({
          type: row.am_name,
          amount: parseFloat(row.amount),
        })),
      });

      setCustomerErrmsg("");
      setInvoiceDateErrmsg("");
      setAllFieldErrmsg("");
    }
  };

  console.log("newRows", newRows);

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
    if (hostelId) {
      dispatch({
        type: "TENANT_LIST_SAGA",
        payload: {
          hostelId: hostelId,
          purpose: "BILL",
        },
      });
    }
  }, [hostelId]);

  useEffect(() => {
    if (
      state.InvoiceList.manualInvoiceAddStatusCode === 201 ||
      state.InvoiceList.manualInvoiceEditStatusCode === 200
    ) {
      // setShowManualInvoice(false)
      setFormLoading(false);
      // setShowRecurringBillForm(false);
      // setReceiptFormShow(false);
      // setShowAllBill(true);
      setCustomerName("");
      setInvoiceNumber("");
      setStartDate("");
      setEndDate("");
      setInvoiceDate("");
      // setInvoiceDueDate("");
      setTotalAmount("");
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
      // dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

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

  useEffect(() => {
    if (newRows) {
      const allRows = newRows
        .map((detail) => ({
          am_name: detail.am_name,
          amount: Number(detail.amount),
        }))
        .filter((detail) => detail.am_name && detail.amount);

      // setamenityArray(allRows);

      const Total_amout = allRows.reduce(
        (sum, item) => sum + parseFloat(item.amount || 0),
        0,
      );

      setTotalAmount(Total_amout);
    }
  }, [newRows]);

  // const EXCLUDED_STATUSES = ["Booked", "Settlement Generated"];

  // console.log("state", state.UsersList.TenantList);

  return (
    <div className="mt-4 pl-[5px] relative">
      <div className="sticky top-0 left-0 z-[1000] w-full h-[50px] bg-white px-[5px] py-[5px] flex items-start justify-start whitespace-nowrap">
        <div className="fixed flex items-center gap-2">
          <img
            src={leftarrow}
            alt="leftarrow"
            className="w-5 h-5 cursor-pointer"
            onClick={handleBackBill}
          />

          <span className="font-medium text-[18px] font-['Gilroy'] pl-2">
            {billData ? "Edit Bill" : "New Bill"}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-10  gap-4 mt-2 flex items-stretch">
        <div className="col-span-4">
          <div className="mb-3">
            <label className="font-[Gilroy] text-[14px] font-medium text-[#222]">
              Customer <span className="text-red-500 text-[20px]">*</span>
            </label>

            <Select
              options={customerOptions}
              onChange={handleCustomerName}
              value={
                customerOptions.find((opt) => opt.value === customername) ||
                null
              }
              isDisabled={billData}
              placeholder="Select Customer"
              classNamePrefix="custom"
              menuPlacement="auto"
              noOptionsMessage={() => "No customers available"}
              styles={{
                control: (base) => ({
                  ...base,
                  padding: "3px 5px",
                  border: "1px solid #D9D9D9",
                  borderRadius: "8px",
                  fontSize: "16px",
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  fontWeight: customername ? 600 : 500,
                  boxShadow: "none",
                }),
                menu: (base) => ({
                  ...base,
                  backgroundColor: "#f8f9fa",
                  border: "1px solid #ced4da",
                }),
                menuList: (base) => ({
                  ...base,
                  backgroundColor: "#f8f9fa",
                  maxHeight: "120px",
                  padding: 0,
                  overflowY: "auto",
                  fontFamily: "Gilroy",
                }),
                placeholder: (base) => ({
                  ...base,
                  color: "#555",
                }),
                dropdownIndicator: (base) => ({
                  ...base,
                  color: "#555",
                  cursor: "pointer",
                }),
                indicatorSeparator: () => ({
                  display: "none",
                }),
                option: (base, state) => ({
                  ...base,
                  cursor: "pointer",
                  backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                  color: "#000",
                }),
              }}
            />

            {customererrmsg.trim() !== "" && (
              <ErrorMessage message={customererrmsg} type="error" />
            )}
          </div>
        </div>

        <div className="col-span-4">
          <div className="mb-1 mt-1">
            <label className="font-[Gilroy] text-[14px] font-medium text-[#222]">
              Invoice Number
            </label>

            <input
              disabled={billData}
              type="text"
              placeholder="Enter Invoice Number"
              value={invoicenumber || ""}
              onChange={handleInvoiceChange}
              className="w-full h-[48px] px-[10px] py-[12px] text-[16px] text-[#4B4B4B] font-[Gilroy] font-medium border border-[#D9D9D9] rounded-[8px] outline-none focus:ring-0"
            />

            {invoicenumbererrmsg.trim() !== "" && (
              <ErrorMessage message={invoicenumbererrmsg} type="error" />
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4 mb-2 flex items-stretch">
        <div className="col-span-1 md:col-span-4">
          <p className="mt-1 mb-1 text-[14px] text-[#222] font-[Gilroy] font-medium">
            Invoice Date <span className="text-red-500 text-[20px]">*</span>
          </p>

          <div className="relative w-full datepicker-wrapper">
            <DatePicker
              disabled={billData}
              className="w-full h-[48px] cursor-pointer font-[Gilroy]"
              format="DD/MM/YYYY"
              placeholder="DD/MM/YYYY"
              value={invoicedate ? dayjs(invoicedate) : null}
              onChange={(date) => handleInvoiceDate(date)}
              getPopupContainer={(triggerNode) =>
                triggerNode.closest(".datepicker-wrapper")
              }
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
              dropdownAlign={{
                points: ["tl", "bl"],
                offset: [0, 4],
              }}
              popupStyle={{
                marginRight: 0,
                minWidth: "auto",
              }}
            />
          </div>

          {invoicedateerrmsg.trim() !== "" && (
            <ErrorMessage message={invoicedateerrmsg} type="error" />
          )}
        </div>

        <div className="col-span-1 md:col-span-4">
          <p className="mt-3 mb-1 text-[14px] text-[#222] font-[Gilroy] font-medium">
            Select Type{" "}
            {/* <span className="text-red-500 text-[20px] hidden">*</span> */}
          </p>
          <Select
            value={
              dropdownValue
                ? { value: dropdownValue, label: dropdownValue }
                : null
            }
            onChange={(selected) => handleRowTypeSelect(selected?.value)}
            placeholder="Select Item Type"
            options={[
              ...(!billData && !selectedTypes.includes("RoomRent")
                ? [{ value: "RoomRent", label: "Room Rent" }]
                : []),

              ...(!isApiEBPresent && !selectedTypes.includes("EB")
                ? [{ value: "EB", label: "EB" }]
                : []),

              { value: "Other", label: "Other" },
            ]}
            isSearchable={false}
            classNamePrefix="custom"
            styles={{
              control: (base, state) => ({
                ...base,
                border: "1px solid #D9D9D9",
                borderRadius: "8px",
                padding: "4px 6px",
                fontSize: "16px",
                fontFamily: "Gilroy",
                fontWeight: 500,
                color: "#4B4B4B",
                boxShadow: "none",
                cursor: "pointer",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
                fontFamily: "Gilroy",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                color: "#000",
                cursor: "pointer",
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
            }}
          />

          {tableErrmsg.trim() !== "" && (
            <ErrorMessage message={tableErrmsg} type="error" />
          )}
        </div>
      </div>

      {Array.isArray(newRows) && newRows.length > 0 && (
        <>
          <div className="mt-3 w-[80%] border border-[#DCDCDC] rounded-[10px] overflow-hidden font-gilroy">
            <div className="bg-[#E7F1FF]">
              <div className="grid grid-cols-10 text-[14px] text-[#939393] font-[Gilroy] font-medium">
                <div className="col-span-1 text-center py-2">S.No</div>
                <div className="col-span-5 py-2">Description</div>
                <div className="col-span-3 py-2">Total Amount</div>
                <div className="col-span-1 py-2">Action</div>
              </div>
            </div>

            <div className="max-h-[300px] overflow-y-auto">
              {newRows.map((u, index) => (
                <div
                  key={index}
                  className="grid grid-cols-10 items-center border-t"
                >
                  <div className="col-span-1 text-center py-2">{index + 1}</div>

                  <div className="col-span-5 px-2 my-2">
                    <input
                      type="text"
                      disabled={u.isFromApi}
                      // disabled={u.isRent}
                      value={u.am_name}
                      onChange={(e) =>
                        handleNewRowChange(index, "am_name", e.target.value)
                      }
                      placeholder="Enter Description"
                      className="w-full border border-[#D9D9D9] rounded px-2 py-1 font-[Gilroy] outline-none"
                    />
                  </div>

                  <div className="col-span-3 px-2">
                    <input
                      type="text"
                      // onKeyDown={(e) => {
                      //   if (e.key === "." || e.key === "e" || e.key === "-") {
                      //     e.preventDefault();
                      //   }
                      // }}
                      // disabled={u.isFromApi && u.am_name !== "EB"}
                      disabled={u.isRent}
                      value={u.amount !== "0" ? u.amount : ""}
                      placeholder="Please Enter Amount"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*\.?\d*$/.test(value)) {
                          handleNewRowChange(index, "amount", value);
                        }
                      }}
                      className="w-full border border-[#D9D9D9] rounded px-2 py-1 font-[Gilroy] outline-none"
                    />
                  </div>

                  <div className="col-span-1 flex justify-center">
                    <CloseCircle
                      onClick={() => !u.isFromApi && handleDeleteNewRow(index)}
                      size="24"
                      className={`${
                        u.isFromApi
                          ? "text-gray-400 cursor-not-allowed opacity-40"
                          : "text-red-500 cursor-pointer"
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-12 mt-3">
            <div className="col-span-2 md:col-span-4 md:col-start-8">
              <h5 className="font-[Gilroy] font-medium  text-gray-600">
                Total Amount :
                <span className="font-semibold text-black  ">
                  {" "}
                  ₹{totalAmount}
                </span>
              </h5>
            </div>
          </div>
        </>
      )}

      <div>
        {allfielderrmsg.trim() !== "" && (
          <ErrorMessage message={allfielderrmsg} type="error" />
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

      {formLoading && (
        <div className="absolute top-[80%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-75 z-10">
          <div className="w-[40px] h-[40px] border-t-4 border-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="grid grid-cols-12 mt-1">
        <div className="col-span-2 md:col-span-4 md:col-start-8">
          <button
            disabled={formLoading}
            onClick={billData ? handleEditBill : handleCreateBill}
            className="w-fit  bg-[#1E45E1] text-white px-5 font-medium h-[40px] 
                    rounded-[8px] text-[16px] font-[Gilroy] 
                     disabled:!bg-gray-300 disabled:!text-gray-500 disabled:!cursor-not-allowed disabled:!opacity-70"
          >
            {billData ? "Save Changes" : "Create Bill"}
          </button>
        </div>
      </div>

      <div className="mb-3"></div>
    </div>
  );
}

CreateBill.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default CreateBill;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FormControl } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import User from "../Assets/Images/New_images/profile-picture.png";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import "sweetalert2/dist/sweetalert2.min.css";
import LoaderComponent from "./LoaderComponent";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import "../Pages/Invoices.css";
import InvoiceTable from "./InvoicelistTable";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Calendars from "../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import BillPdfModal from "../Pages/BillPdfModal";
import "react-toastify/dist/ReactToastify.css";
import Closebtn from "../Assets/Images/CloseCircle.png";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RecurringBill from "../Pages/RecurringBills";
import RecurringBillList from "../Pages/RecurringBillList";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import Filters from "../Assets/Images/Filters.svg";
import Receipt from "./Receipt";
import AddReceiptForm from "./AddReceipt";
import ReceiptPdfCard from "./ReceiptPdfModal";
import leftarrow from "../Assets/Images/arrow-left.png"
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { DatePicker } from "antd";
import dayjs from "dayjs";








const InvoicePage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [recurLoader, setRecurLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState("");
  const [bankking, setBanking] = useState("");
  // const d = new Date();
  const [invoiceList, setInvoiceList] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    hostel_Name: "",
    hostel_Id: "",
    FloorNo: "",
    RoomNo: "",
    date: "",
    // total_amount: '',
    paymentType: "",
    amount: "",
    balanceDue: "",
    dueDate: "",
    payableAmount: "",
    InvoiceId: "",
    invoice_type: "",
    transaction: "",
  });

  const [showLoader, setShowLoader] = useState(false);
  const [statusfilter, setStatusfilter] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [paymodeerrormsg, setPaymodeErrmsg] = useState("");
  const [amounterrormsg, setAmountErrmsg] = useState("");
  const [dateerrmsg, setDateErrmsg] = useState("");
  const [totalErrormsg, setTotalErrmsg] = useState("");
  const [customername, setCustomerName] = useState("");
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [invoicedate, setInvoiceDate] = useState(null);
  const [invoiceduedate, setInvoiceDueDate] = useState(null);
  const [formatinvoicedate, setFormatInvoiceDate] = useState(null);
  const [formatduedate, setFormatDueDate] = useState(null);
  const [totalAmount, setTotalAmount] = useState("");
  const [bills, setBills] = useState([]);
  const [newRows, setNewRows] = useState([])
  const [customererrmsg, setCustomerErrmsg] = useState("");
  const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
  const [startdateerrmsg, setStartdateErrmsg] = useState("");
  const [enddateerrmsg, setEnddateErrmsg] = useState("");
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
  const [allfielderrmsg, setAllFieldErrmsg] = useState("");
  const [amenityArray, setamenityArray] = useState([]);
  const [recurringbills, setRecurringBills] = useState([]);
  const [account, setAccount] = useState("");
  const [accountError, setAccountError] = useState("");
  const startRef = useRef(null);
  const endRef = useRef(null);
  const invoiceRef = useRef(null);
  const dueRef = useRef(null);
  const [showmanualinvoice, setShowManualInvoice] = useState(false);
  const [showRecurringBillForm, setShowRecurringBillForm] = useState(false);
  const [receiptformShow, setReceiptFormShow] = useState(false);
  const [showAllBill, setShowAllBill] = useState(true);
  const [billrolePermission, setBillRolePermission] = useState("");
  const [billpermissionError, setBillPermissionError] = useState("");
  const [billAddPermission, setBillAddPermission] = useState("");
  const [billDeletePermission, setBillDeletePermission] = useState("");
  const [billEditPermission, setBillEditPermission] = useState("");
  const [recuringbillAddPermission, setRecuringBillAddPermission] =
    useState("");
  const [recurringPermission, setRecurringPermission] = useState("");
  const [receiptPermission, setReceiptPermission] = useState("");
  const [receiptaddPermission, setReceiptAddPermission] = useState("");
  const [showform, setShowform] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);;
  const [tableErrmsg, setTableErrmsg] = useState("");
  const [value, setValue] = React.useState("1");
  const [DownloadInvoice, setDownloadInvoice] = useState(false);
  const [DownloadReceipt, setDownloadReceipt] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showPdfReceiptModal, setShowPdfReceiptModal] = useState(false);
  const [rowData, setRowData] = useState("");
  const [showdeleteform, setShowDeleteform] = useState(false);
  const [billMode, setBillMode] = useState("New Bill");
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [search, setSearch] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let serialNumber = 1;

  const [hostelId, setHostelId] = useState("");
  const [receiptdata, setReceiptData] = useState([]);
  const [receiptLoader, setReceiptLoader] = useState(false);
  const [originalBillsFilter, setOriginalBillsFilter] = useState([]);
  const [originalBillsFilterReceipt, setOriginalBillsFilterReceipt] = useState(
    []
  );
  const [originalBills, setOriginalBills] = useState([]);
  const [originalRecuiring, setOriginalRecuiring] = useState([]);
  const [originalReceipt, setOriginalReceipt] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [dateRange, setDateRange] = useState([null, null]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
const [startDate, endDate] = dateRange;

  useEffect(() => {
    // setLoading(true); 
    if (state.login.selectedHostel_Id) {
      setHostelId(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);
  useEffect(() => {
    // setLoading(true);
    if (hostelId) {
      setLoading(true)
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });
    }
  }, [hostelId]);

  useEffect(() => {
    if (state.InvoiceList.ManualInvoicesgetstatuscode === 200) {
      setBills(state.InvoiceList.ManualInvoices);
      setOriginalBillsFilter(state.InvoiceList.ManualInvoices)
      setOriginalBills(state.InvoiceList.ManualInvoices)
      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.ManualInvoicesgetstatuscode]);

  useEffect(() => {
    if (state.InvoiceList.BillsErrorstatusCode === 201) {

      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "REMOVE_NODATA_BILL_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.BillsErrorstatusCode]);

  useEffect(() => {
    if (state.InvoiceList.NodataRecurringStatusCode === 201) {

      setTimeout(() => {
        setRecurLoader(false);
        dispatch({ type: "CLEAR_NODATA_RECURRINGBILLS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.NodataRecurringStatusCode]);

 


  useEffect(() => {
    if (state.InvoiceList.NodataReceiptStatusCode === 201) {

      setTimeout(() => {
        setReceiptLoader(false);
        dispatch({ type: "CLEAR_NODATA_RECEIPTS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.NodataReceiptStatusCode]);

  const handleManualShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding bill information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShowAllBill(false);
    setShowManualInvoice(true);
    setBillMode("New Bill");
    setIsEditing(false);
    setInvoiceDetails(null);
  };

  const handleRecurrBillShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding Recurring bill information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShowAllBill(false);
    setShowRecurringBillForm(true);
  };

  const handleReceiptShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding receipt information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShowAllBill(false);
    setReceiptFormShow(true);
    dispatch({ type: "GET_REFERENCE_ID" });
  };

  // const handleAccount = (e) => {
  //   setAccount(e.target.value);
  //   setAccountError("");
  //   // setIsChangedError("");
  // };
  const handleAccount = (selectedOption) => {
    setAccount(selectedOption?.value || "");
    setAccountError("");
    dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  };

  const handleTransaction = (selectedOption) => {
    setInvoiceList({ ...invoiceList, transaction: selectedOption });
    setAccountError("");
    setPaymodeErrmsg("");
    setAccount("");
  };



  const handleInvoiceDetail = (item) => {
    // setSelectedItems(item);

    if (item.User_Id) {
      const originalDate = new Date(item.Date);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      const newDate = `${year}-${month}-${day}`;

      if (
        (item.EbAmount === 0 || item.EbAmount === undefined) &&
        item.invoice_type === 1 &&
        item.AmnitiesAmount === 0
      ) {
        dispatch({
          type: "INVOICEPDF",
          payload: {
            Date: newDate,
            User_Id: item.User_Id,
            id: item.id,
            hostel_Id: item.Hostel_Id,
            invoice_type: item.invoice_type,
          },
        });
      } else if (item.invoice_type === 2) {
        dispatch({
          type: "INVOICEPDF",
          payload: {
            User_Id: item.User_Id,
            id: item.id,
            hostel_Id: item.Hostel_Id,
            invoice_type: item.invoice_type,
          },
        });
      } else {
        dispatch({
          type: "INVOICEPDF",
          payload: {
            Date: newDate,
            User_Id: item.User_Id,
            id: item.id,
          },
        });
      }

      setShowLoader(true);
    }
  };

  const handleReceiptDetail = (item) => {
    if (item.User_Id) {

      dispatch({
        type: "RECEIPTPDF",
        payload: {
          id: item.id,
        },
      });

      setShowLoader(true);
    }
  };







 
  useEffect(() => {
    if (originalBillsFilter.length === 0 && bills.length > 0) {
      setOriginalBillsFilter(bills);
    }
  }, [bills]);

  // const handleStatusFilter = (event) => {
  //   const searchTerm = event.target.value;
  //   setStatusfilter(searchTerm);
  //    };
  const handleStatusFilter = (event) => {
    const selected = event.target.value;
    setStatusfilter(selected);
  
    // Clear date range if not 'date'
    if (selected !== "date") {
      setDateRange([null, null]);
    }
  };

// useEffect(()=>{
//   if (statusfilter === "All") {
//     setBills(originalBillsFilter);
//   } else {
//     const filteredItems = originalBillsFilter.filter((user) =>
//         user.status?.trim().toLowerCase() === statusfilter.trim().toLowerCase()
//     );


//     setBills(filteredItems);
//   }


//   setCurrentPage(1);

// },[statusfilter])

useEffect(() => {
  let filtered = originalBillsFilter;

  if (statusfilter === "All") {
    filtered = originalBillsFilter;
  } else if (statusfilter === "Paid" || statusfilter === "Unpaid") {
    filtered = filtered.filter(
      (user) =>
        user.status?.trim().toLowerCase() === statusfilter.trim().toLowerCase()
    );
  } else if (statusfilter === "date" && startDate && endDate) {
    filtered = filtered.filter((user) => {
      const invoiceDate = new Date(user.Date); // or user.invoiceDate
      return (
        invoiceDate >= startDate &&
        invoiceDate <= endDate
      );
    });
  }

  setBills(filtered);
  setCurrentPage(1)
}, [statusfilter, startDate, endDate, originalBillsFilter]);



  const [statusFilterReceipt, setStatusFilterReceipt] = useState("");
  const handleStatusFilterReceipt = (event) => {
    const searchTerm = event.target.value;
    setStatusFilterReceipt(searchTerm);
     };
  

  useEffect(() => {
    if (statusFilterReceipt !== "date") {
      setReceiptDateRange([]);
      if (statusFilterReceipt === "All") {
        setReceiptData(originalBillsFilterReceipt);
      } else {
        const filteredItemsReceipt = originalBillsFilterReceipt.filter((user) =>
          user.payment_mode.toLowerCase().includes(statusFilterReceipt.toLowerCase())
        );
        setReceiptData(filteredItemsReceipt);
        setCurrentReceiptPage(1)
      }
    }
  }, [statusFilterReceipt]);
  
  const [receiptDateRange, setReceiptDateRange] = useState([]);
  const handleDateRangeChangeReceipt = (dates) => {
    setReceiptDateRange(dates);
  
    // If cleared or not fully selected
    if (!dates || dates.length !== 2) {
      setStatusFilterReceipt("All");
      setReceiptData(originalBillsFilterReceipt);
      return;
    }
  
    const [start, end] = dates;
  
    const filtered = originalBillsFilterReceipt.filter((item) => {
      const itemDate = dayjs(item.payment_date);
      return (
        itemDate.isSame(start, 'day') ||
        itemDate.isSame(end, 'day') ||
        (itemDate.isAfter(start) && itemDate.isBefore(end))
      );
    });
  
    setReceiptData(filtered);
    setCurrentReceiptPage(1)
  };
  
  
  useEffect(() => {
    if (statusFilterReceipt !== "date") {
      setReceiptDateRange([]);
    }
  }, [statusFilterReceipt]);
  useEffect(() => {
    if (statusFilterReceipt === "All") {
      setReceiptData(originalBillsFilterReceipt);
      setReceiptDateRange([]);
      
    }
  }, [statusFilterReceipt]);
  
  
  useEffect(() => {
    if (originalBillsFilterReceipt.length === 0 && receiptdata.length > 0) {
      setOriginalBillsFilterReceipt(receiptdata);
    }
  }, [receiptdata]);




  const formatDateForPayload = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split("T")[0];
  };


  const handleAmount = (e) => {
    const inputValue = e.target.value.trim();
  
    if (!inputValue) {
      setAmountErrmsg("Please Enter Amount");
  
      setInvoiceList((prevState) => ({
        ...prevState,
        payableAmount: "",
        balanceDue: prevState.amount - prevState.paidAmount,
      }));
      return;
    } else {
      setAmountErrmsg("");
    }
 
    const payableAmount = parseFloat(inputValue);
    if (isNaN(payableAmount)) {
      setAmountErrmsg("Invalid amount entered");
      return;
    }
  
    setInvoiceList((prevState) => {
      const totalAmount = parseFloat(prevState.amount) || 0;
      const paidAmount = parseFloat(prevState.paidAmount) || 0;
  
      const newPaidAmount = paidAmount + payableAmount;
      const newBalanceDue = totalAmount - newPaidAmount;
  
      
      if (newPaidAmount > totalAmount) {
        setAmountErrmsg("Payable Amount Cannot Exceed Due Amount");
        return prevState; 
      }
  
      return {
        ...prevState,
        payableAmount,
        balanceDue: newBalanceDue >= 0 ? newBalanceDue : prevState.balanceDue,
      };
    });
  };
  
  
  

  const [editvalue, setEditvalue] = useState("");
  const [receiptedit, setReceiptEdit] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(false);

  const handleEditReceipt = (item) => {
    setShowAllBill(false);
    setReceiptFormShow(true);
    setEditvalue(item);
    setReceiptEdit(true);
  };

  const handleEdit = (props) => {

    setShowManualInvoice(true);
    setShowAllBill(false);
    setBillMode("Edit Bill");
    setIsEditing(true);
    setInvoiceDetails(null);
    setTimeout(() => {
      setInvoiceDetails(props);
    }, 0);

  };



  useEffect(() => {
    // if (invoiceDetails ) {

    if (invoiceDetails?.ID) {
      setCustomerName(invoiceDetails?.ID);
    }

    setInvoiceNumber(invoiceDetails?.Invoices);

    if (invoiceDetails?.DueDate) {
      const parsedDate = new Date(invoiceDetails.DueDate);
      if (!isNaN(parsedDate.getTime())) {
        setInvoiceDueDate(parsedDate);
      }
    }

    if (invoiceDetails?.Date) {
      const parsedDate = new Date(invoiceDetails.Date);
      if (!isNaN(parsedDate.getTime())) {
        setInvoiceDate(parsedDate);
      }
    }

    if (invoiceDetails?.start_date) {
      const parsedDate = new Date(invoiceDetails.start_date);
      if (!isNaN(parsedDate.getTime())) {
        setStartDate(parsedDate);
      }
    }

    if (invoiceDetails?.end_date) {
      const parsedDate = new Date(invoiceDetails.end_date);
      if (!isNaN(parsedDate.getTime())) {
        setEndDate(parsedDate);
      }
    }

    setTotalAmount(invoiceDetails?.Amount);

    let newRows = [];

    const existingAmenities = invoiceDetails?.amenity || [];

    const doesAmenityExist = (name) =>
      existingAmenities.some((item) => item.am_name === name);

    if (invoiceDetails?.RoomRent && !doesAmenityExist("Room Rent")) {
      newRows.push({
        "S.No": newRows.length + 1,
        am_name: "Room Rent",
        amount: invoiceDetails.RoomRent,
      });
    }

    if (invoiceDetails?.advance_amount && !doesAmenityExist("Advance Amount")) {
      newRows.push({
        "S.No": newRows.length + 1,
        am_name: "Advance Amount",
        amount: invoiceDetails.advance_amount,
      });
    }

    if (invoiceDetails?.EbAmount && !doesAmenityExist("EB Amount")) {
      newRows.push({
        "S.No": newRows.length + 1,
        am_name: "EB Amount",
        amount: invoiceDetails.EbAmount,
      });
    }

    if (invoiceDetails?.amenity && invoiceDetails.amenity.length > 0) {
      newRows = [
        ...newRows,
        ...invoiceDetails.amenity.map((item, index) => ({
          "S.No": newRows.length + index + 1,
          am_name: item.am_name,
          amount: item.amount,
        })),
      ];
    }

    // if (newRows.length === 0) {
    //   newRows = [{ "S.No": 1, am_name: "Room Rent", amount: 0 }];
    // }

    setNewRows(newRows);
    const types = [];
    newRows.forEach((row) => {
      if (row.am_name === "Room Rent") types.push("RoomRent");
      if (row.am_name === "EB") types.push("EB");
    });
    setSelectedTypes(types);
    // }
  }, [invoiceDetails]);



  const handleBillDelete = (props) => {
    setShowDeleteform(true);
    setDeleteId(props.item.id);
  };

  const handleBillDeleted = () => {
    dispatch({
      type: "MANUAL-INVOICE-DELETE",
      payload: {
        id: deleteId,
      },
    });
    setShowDeleteform(false);
  };

  const handleEditBill = () => {
    let isValid = true;
    let hasError = false;
  
    // Reset all error messages
    setCustomerErrmsg("");
    setInvoicenumberErrmsg("");
    setStartdateErrmsg("");
    setEnddateErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");
  
    // Validate Customer
    if (!customername) {
      setCustomerErrmsg("Customer is Required");
      isValid = false;
    }
  
    // Validate Invoice Number
    if (!invoicenumber) {
      setInvoicenumberErrmsg("Invoice Number is Required");
      isValid = false;
    }
  
    // Validate Start & End Date only if NOT advance invoice
    if (invoiceDetails?.action !== "advance") {
      if (!startdate) {
        setStartdateErrmsg("Start Date is Required");
        isValid = false;
      }
      if (!enddate) {
        setEnddateErrmsg("End Date is Required");
        isValid = false;
      }
    }
  
    // Validate Invoice Date
    if (!invoicedate) {
      setInvoiceDateErrmsg("Invoice Date is Required");
      isValid = false;
    }
  
    // Validate Due Date
    if (!invoiceduedate) {
      setInvoiceDueDateErrmsg("Due Date is Required");
      isValid = false;
    }
    if (!Array.isArray(newRows) || newRows.length === 0) {
      setTableErrmsg("Please Add At Least One Item Row Before Generating The Bill");
      hasError = true;
    } else if (
      newRows.some(
        (row) =>
          !row.am_name?.trim() ||
          row.amount === "" ||
          row.amount === null ||
          row.amount === undefined ||
          isNaN(row.amount) ||
          parseFloat(row.amount) <= 0
      )
    ) {
      setTableErrmsg("Please Fill All Details & Amount > 0 Before Generating The Bill");
      hasError = true;
    } else {
      setTableErrmsg("");
    }
  
    if (hasError) {
      return;
    }
    // Global required field check again
    let isValiding = true;
    if (
      !customername ||
      !invoicenumber ||
      !invoicedate ||
      !invoiceduedate ||
      (invoiceDetails?.action !== "advance" && (!startdate || !enddate))
    ) {
      setAllFieldErrmsg("Please Fill Out All Required Fields");
      isValiding = false;
    }
  
    // Format functions
    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };
  
    // Check if any value has changed
    const isChanged = (() => {
      const userChanged = Number(invoiceDetails?.hos_user_id) !== Number(customername);
      const startDateChanged = formatDate(invoiceDetails?.start_date) !== formatDate(startdate);
      const endDateChanged = formatDate(invoiceDetails?.end_date) !== formatDate(enddate);
      const invoiceChanged = String(invoiceDetails?.Invoices) !== String(invoicenumber);
      const invoiceDateChanged = formatDate(invoiceDetails?.Date) !== formatDate(invoicedate);
      const dueDateChanged = formatDate(invoiceDetails?.DueDate) !== formatDate(invoiceduedate);
      const rowsCountChanged = newRows.length !== invoiceDetails?.amenity?.length;
  
      const amenitiesChanged = newRows.some((row, index) => {
        const originalRow = invoiceDetails?.amenity?.[index] || {};
        return row.am_name !== originalRow.am_name || row.amount !== originalRow.amount;
      });
  
      return (
        userChanged ||
        invoiceChanged ||
        invoiceDateChanged ||
        dueDateChanged ||
        (invoiceDetails?.action !== "advance" && (startDateChanged || endDateChanged)) ||
        rowsCountChanged ||
        amenitiesChanged
      );
    })();
  
    // If no changes
    if (!isChanged) {
      setAllFieldErrmsg("No Changes Detected");
      return;
    }
  
    // Final Save Condition
    if (isValid && isValiding && isChanged) {
      const formattedInvoiceDate = formatDate(invoicedate);
      const formattedDueDate = formatDate(invoiceduedate);
      const formattedStartDate = formatDate(startdate);
      const formattedEndDate = formatDate(enddate);
  
      dispatch({
        type: "MANUAL-INVOICE-EDIT",
        payload: {
          user_id: customername,
          date: formattedInvoiceDate,
          due_date: formattedDueDate,
          id: invoiceDetails.id,
          amenity: amenityArray.length > 0 ? amenityArray : [],
          start_date: invoiceDetails?.action === "advance" ? null : formattedStartDate,
          end_date: invoiceDetails?.action === "advance" ? null : formattedEndDate,
        },
      });
  
      // Reset Form State
      setShowManualInvoice(false);
      setShowRecurringBillForm(false);
      setReceiptFormShow(false);
      setShowAllBill(true);
      setCustomerName("");
      setInvoiceNumber("");
      setStartDate("");
      setEndDate("");
      setInvoiceDate("");
      setInvoiceDueDate("");
      setTotalAmount("");
      setNewRows([]);
      setCustomerErrmsg("");
      setStartdateErrmsg("");
      setInvoiceDateErrmsg("");
      setInvoiceDueDateErrmsg("");
      setAllFieldErrmsg("");
    }
  };
  

  const handleShowForm = (props) => {
    setShowform(true);
    setInvoiceValue(props.item);
  
     
    if (props.item.id !== undefined) {
      // setEditOption("Edit");
      const dateObject = new Date(props.item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(
        lastDayOfMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(lastDayOfMonth.getDate()).padStart(2, "0")}`;



      // setShowMenu(true);
      // setShowForm(true);
      let value = props.item.Name.split(" ");
      setSelectedUserId(props.item.User_Id);
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      setInvoiceList({
        id: props.item.id,
        firstName: value[0],
        lastName: value[1],
        phone: props.item.phoneNo,
        email: props.item.EmailID,
        hostel_Name: props.item.Hostel_Name,
        hostel_Id: props.item.Hostel_Id,
        FloorNo: props.item.Floor_Id,
        RoomNo: props.item.Room_No,
        date: formattedDate,
        // total_amount: Number(item.Amount)+Number(item.AmnitiesAmount)+Number(item.EbAmount),
        amount: props.item.Amount,
        paidAmount: props.item.PaidAmount,
        balanceDue: props.item.BalanceDue === 0 ? "00" : props.item.BalanceDue,
        dueDate: formattedDueDate,
        InvoiceId: props.item.Invoices,
        invoice_type: props.item.invoice_type,
      });
      // }
    } else {
      // setEditOption("Add");
      setSelectedUserId("");
      // setShowForm(true);
      // setUserClicked(true);
      // setShowMenu(true);
    }
  };

  console.log("props", invoiceList.balanceDue);
  const handleCloseForm = () => {
    // setEdit(!edit)
    setPaymodeErrmsg("")
    setAccountError("")
    setDateErrmsg("")
    setAmountErrmsg("")
    setShowform(false);
    setInvoiceList({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      hostel_Name: "",
      hostel_Id: "",
      FloorNo: "",
      RoomNo: "",
      amount: "",
      balanceDue: "",
      dueDate: "",
      // total_amount:'',
      transaction: "",
      paymentType: "",
    });
    setSelectedDate(null);
  };


  const handleCloseDeleteform = () => {
    setShowDeleteform(false);
  };

  const handleSaveInvoiceList = () => {
    const formatpaiddate = formatDateForPayload(selectedDate);

    if (!invoiceList.payableAmount) {
      setAmountErrmsg("Please Enter Amount");
    }

    if (!formatpaiddate) {
      setDateErrmsg("Please Select Date");
    } else {
      setDateErrmsg("");
    }

    if (!invoiceList.transaction || invoiceList.transaction === "select") {
      setPaymodeErrmsg("Please Select a Valid Transaction Type");
      return;
    }

    if (invoiceList.transaction === "Net Banking" && !account) {
      setAccountError("Please Choose Bank Account");
      return;
    }

    if (
      !invoiceList.payableAmount ||
      !formatpaiddate ||
      !invoiceList.transaction
    ) {
      // setTotalErrmsg("Please enter All field");
      setTimeout(() => {
        setTotalErrmsg("");
      }, 1000);
      return;
    }



    if (
      invoiceList.InvoiceId &&
      invoiceList.payableAmount &&
      invoiceList.transaction &&
      formatpaiddate
    ) {
      dispatch({
        type: "UPDATEINVOICEDETAILS",
        payload: {
          id: invoiceList.id,
          invoice_id: invoiceList.InvoiceId,
          invoice_type: 1,
          amount: invoiceList.payableAmount,
          balance_due: invoiceList.balanceDue,
          payment_by: invoiceList.transaction,
          payment_date: formatpaiddate,
          bank_id: account,
        },
      });

      setShowform(false);
      setSelectedDate(null);
      setAmountErrmsg("");
      setDateErrmsg("");
      setPaymodeErrmsg("");
    }
  };

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    // defaultDate: selectedDate,
    maxDate: new Date(),
    minDate: null,
  };


  // const handleAddColumn = () => {
  //   const newRow = {
  //     am_name: "",
  //     used_unit: "",
  //     per_unit_amount: "",
  //     total_amount: "",
  //     amount: "",
  //   };
  //   setNewRows([...newRows, newRow]);
  // };

  const handleCustomerName = (selectedOption) => {
    setCustomerName(selectedOption?.value || '');
    setAllFieldErrmsg("");
    if (!selectedOption) {
      setCustomerErrmsg("Please Select Name");
    } else {
      setCustomerErrmsg("");
    }
    setStartDate("");
    setEndDate("");;
    // setBillAmounts("");
    setTotalAmount("");
  };

  const handleBackBill = () => {
    setShowManualInvoice(false);
    setShowRecurringBillForm(false);
    setReceiptFormShow(false);
    setShowAllBill(true);
    setEditvalue("");
    setReceiptEdit(false);
    setCustomerName("");
    setInvoiceNumber("");
    setStartDate("");
    setEndDate("");
    setInvoiceDate("");
    setInvoiceDueDate("");
    // setBillAmounts("");
    setTotalAmount("");
    setCustomerErrmsg("");
    setStartdateErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");
    setTableErrmsg("");
    setEnddateErrmsg("");
    setamenityArray([]);
    setNewRows([]);
    setDropdownValue("")
  };

  const formatDateForPayloadmanualinvoice = (date) => {
    return dayjs(date).format("YYYY-MM-DD"); // Change format if needed
  };

 

  const handlestartDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setStartDate(date);

    if (!selectedDates) {
      setStartdateErrmsg("Please Select Date");
    } else {
      setStartdateErrmsg("");
    }

  };

  const handleEndDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setEndDate(date);
    if (!selectedDates) {
      setEnddateErrmsg("Please Select Date");
    } else {
      setEnddateErrmsg("");
    }

  };
 
  const handleInvoiceDate = (selectedDate) => {
    setAllFieldErrmsg("");
  
    if (!selectedDate) {
      setInvoiceDate(null);
      setInvoiceDateErrmsg("Please Select Date");
      return;
    }
  
    setInvoiceDate(selectedDate);
    setInvoiceDateErrmsg("");
    setEnddateErrmsg("");
    setStartdateErrmsg("");
  
    const formattedDate = formatDateForPayloadmanualinvoice(selectedDate);
    setFormatInvoiceDate(formattedDate);
  };
  
  

  // const handleInvoiceDate = (selectedDates) => {
  //   setAllFieldErrmsg("");
  //   const date = selectedDates;
  //   setInvoiceDate(date);
  //   if (!selectedDates) {
  //     setInvoiceDateErrmsg("Please Select Date");
  //   } else {
  //     setInvoiceDateErrmsg("");
  //     setEnddateErrmsg("");
  //     setStartdateErrmsg("");
  //   }

  //   const formattedDate = formatDateForPayloadmanualinvoice(date);
  //   setFormatInvoiceDate(formattedDate);
  // };

  const handleDueDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setInvoiceDueDate(date);
    if (!selectedDates) {
      setInvoiceDueDateErrmsg("Please Select Date");
    } else {
      setInvoiceDueDateErrmsg("");
    }

    const formattedDate = formatDateForPayloadmanualinvoice(date);
    setFormatDueDate(formattedDate);
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
          onClick={onClick} // Opens date picker when clicking the icon
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
          onClick={onClick} // Open date picker on icon click
        />
      </div>
    );
  });
  CustomInvoiceDateInput.displayName = "CustomInvoiceDateInput";
  const CustomInvoiceDueDateInput = React.forwardRef(({ value, onClick }, ref) => {
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
          onClick={onClick} // Open date picker when clicking the icon
        />
      </div>
    );
  });

  CustomInvoiceDueDateInput.displayName = "CustomInvoiceDueDateInput";



  // const handleNewRowChange = (index, field, value) => {
  //   setAllFieldErrmsg("");
  //   const updatedRows = [...newRows];
  //   updatedRows[index][field] = value;

  //   setNewRows(updatedRows);
  //   setTableErrmsg("")
  // };
  const handleNewRowChange = (index, field, value) => {
    setNewRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
    setAllFieldErrmsg("");
    setTableErrmsg("")
  };
  const [dropdownValue, setDropdownValue] = useState("");
  const handleRowTypeSelect = (type) => {
    let newRow = { am_name: "", amount: "0" };
  
    if (type === "RoomRent") {
      newRow.am_name = "Room Rent";
    } else if (type === "EB") {
      newRow.am_name = "EB";
    }
  
    setNewRows((prev) => [...prev, newRow]);
  
    // Add to selectedTypes only if not already added
    if (type !== "Other" && !selectedTypes.includes(type)) {
      setSelectedTypes((prev) => [...prev, type]);
    }
  
    // Clear error messages
    setAllFieldErrmsg("");
    setTableErrmsg("");
  
    // ✅ Reset dropdown cleanly using state
    setDropdownValue("");
  };
  
  
 
  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const deletedRow = prevRows[index];
      const updatedRows = prevRows.filter((_, i) => i !== index);
  
      // Remove RoomRent or EB from selectedTypes if that row was deleted
      if (deletedRow.am_name === "Room Rent") {
        setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "RoomRent"));
      } else if (deletedRow.am_name === "EB") {
        setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "EB"));
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

    // Check required fields and set error messages only if empty
    if (!customername) {
      setCustomerErrmsg("Please Select Customer");
      hasError = true;
    } else {
      setCustomerErrmsg(""); // Clear error when field is filled
    }

    if (!startdate) {
      setStartdateErrmsg("Please Select Start Date");
      hasError = true;
    } else {
      setStartdateErrmsg("");
    }

    if (!enddate) {
      setEnddateErrmsg("Please Select End Date");
      hasError = true;
    } else {
      setEnddateErrmsg("");
    }

    if (!invoicedate) {
      setInvoiceDateErrmsg("Please Select Invoice Date");
      hasError = true;
    } else {
      setInvoiceDateErrmsg("");
    }

    if (!invoiceduedate) {
      setInvoiceDueDateErrmsg("Please Select Due Date");
      hasError = true;
    } else {
      setInvoiceDueDateErrmsg("");
    }

    // Check if any row in the table is incomplete
    // if (newRows.some((row) => !row.am_name || !row.amount)) {
    //   setTableErrmsg(
    //     "Please fill all details in the table before generating the bill"
    //   );
    //   hasError = true;
    // } else {
    //   setTableErrmsg("");
    // }
    if (!Array.isArray(newRows) || newRows.length === 0) {
      setTableErrmsg("Please Add At Least One Item Row Before Generating The Bill");
      hasError = true;
    } else if (
      newRows.some(
        (row) =>
          !row.am_name?.trim() ||
          row.amount === "" ||
          row.amount === null ||
          row.amount === undefined ||
          isNaN(row.amount) ||
          parseFloat(row.amount) <= 0
      )
    ) {
      setTableErrmsg("Please Fill All Details & Amount > 0 Before Generating The Bill");
      hasError = true;
    } else {
      setTableErrmsg("");
    }
    

    // Stop execution if there are errors
    if (hasError) {
      return;
    }

    // Format dates
    const formattedStartDate = startdate ? dayjs(startdate).format("YYYY-MM-DD") : "";

    const formattedEndDate = enddate ? dayjs(enddate).format("YYYY-MM-DD") : "";
    
    // Dispatch only if all fields are filled
    dispatch({
      type: "MANUAL-INVOICE-ADD",
      payload: {
        user_id: customername,
        date: formatinvoicedate,
        due_date: formatduedate,
        // start_date: formattedStartDate,
        // end_date: formattedEndDate,
        start_date: invoiceDetails?.action === "advance" ? null : formattedStartDate,
    end_date: invoiceDetails?.action === "advance" ? null : formattedEndDate,
        invoice_id: invoicenumber,
        total_amount: totalAmount,
        amenity: amenityArray.length > 0 ? amenityArray : [],
      },
    });

    setShowManualInvoice(false);
    setShowRecurringBillForm(false);
    setReceiptFormShow(false);
    setShowAllBill(true);

    // Reset form fields
    setCustomerName("");
    setInvoiceNumber("");
    setStartDate("");
    setEndDate("");
    setInvoiceDate("");
    setInvoiceDueDate("");
    setTotalAmount("");
    // setBillAmounts([]);
    setNewRows([]);
  };

 

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = bills.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems =
    filterInput.length > 0
      ? bills
      : bills?.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bills.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  //recurring pagination
  const [currentRecurePage, setCurrentRecurePage] = useState(1);
  const [itemsPage, setItemsPage] = useState(10);
  const indexOfLastItemRecure = currentRecurePage * itemsPage;
  const indexOfFirstItemRecure = indexOfLastItemRecure - itemsPage;

  // const currentItem = recurringbills?.slice(
  //   indexOfFirstItemRecure,
  //   indexOfLastItemRecure
  // );
  const currentItem =
    filterInput.length > 0
      ? recurringbills
      : recurringbills?.slice(indexOfFirstItemRecure, indexOfLastItemRecure);

  const handlePageChangeRecure = (pageNumber) => {
    setCurrentRecurePage(pageNumber);
  };
  const handleItemsPerPage = (event) => {
    setItemsPage(Number(event.target.value));
    setCurrentRecurePage(1);
  };
  const totalPage = Math.ceil(recurringbills.length / itemsPage); //recurring pagination

  //Receipt pagination
  const [currentreceiptPage, setCurrentReceiptPage] = useState(1);
  const [itemsperPage, setItemsPERPage] = useState(10);
  const indexOfLastItemReceipt = currentreceiptPage * itemsperPage;
  const indexOfFirstItemReceipt = indexOfLastItemReceipt - itemsperPage;

  const currentReceiptData =
    filterInput.length > 0
      ? receiptdata
      : receiptdata?.slice(indexOfFirstItemReceipt, indexOfLastItemReceipt);

  const handlePageChangeReceipt = (pageNumber) => {
    setCurrentReceiptPage(pageNumber);
  };
  const handleItemsPerPageReceipt = (event) => {
    setItemsPERPage(Number(event.target.value));
    setCurrentReceiptPage(1);
  };
  const ReceipttotalPages = Math.ceil(receiptdata.length / itemsperPage); //Receipt pagination

  //  const renderPageNumbers = () => {
  //    const pageNumbers = [];
  //    for (let i = 1; i <= totalPages; i++) {
  //      pageNumbers.push(
  //        <li key={i} style={{ margin: "0 5px" }}>
  //          <button
  //            style={{
  //              padding: "5px 10px",
  //              color: i === currentPage ? "#007bff" : "#000",
  //              cursor: "pointer",
  //              border: i === currentPage ? "1px solid #ddd" : "none",
  //              backgroundColor:
  //                i === currentPage ? "transparent" : "transparent",
  //            }}
  //            onClick={() => handlePageChange(i)}
  //          >
  //            {i}
  //          </button>
  //        </li>
  //      );
  //    }
  //    return pageNumbers;
  //  };

  //  const renderPageNumber = () => {
  //    const pageNumbers = [];
  //    for (let i = 1; i <= totalPage; i++) {
  //      pageNumbers.push(
  //        <li key={i} style={{ margin: "0 5px" }}>
  //          <button
  //            style={{
  //              padding: "5px 10px",
  //              color: i === currentPage ? "#007bff" : "#000",
  //              cursor: "pointer",
  //              border: i === currentPage ? "1px solid #ddd" : "none",
  //              backgroundColor:
  //                i === currentPage ? "transparent" : "transparent",
  //            }}
  //            onClick={() => handlePageChange(i)}
  //          >
  //            {i}
  //          </button>
  //        </li>
  //      );
  //    }
  //    return pageNumbers;
  //  };

  const handleDeleteRecurringbills = (item) => {
    if (item) {
      dispatch({
        type: "DELETE-RECURRING-BILLS",
        payload: { id: item.recuire_id, user_id: item.user_id },
      });
    }
  };

  const handleChanges = (event, newValue) => {



    if (newValue === "1") {
      setLoading(true);
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });
    }

    if (newValue === "2") {
      setRecurLoader(true);
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: { hostel_id: hostelId },
      });
    }

    if (newValue === "3") {
      setReceiptLoader(true);
      dispatch({
        type: "RECEIPTSLIST",
        payload: { hostel_id: hostelId },
      });
    }


    setValue(newValue);
    setSearch(false);
    setFilterInput("");
    setDropdownVisible(false)
    setFilterStatus(false)
    setStatusFilterReceipt("")
    setStatusfilter("");
      setDateRange([]);        
      setStartDate(null);   
      setEndDate(null);
  };

  const handleDisplayInvoiceDownload = (isVisible, rowData) => {
    setDownloadInvoice(isVisible);
    setShowPdfModal(true);
    setRowData(rowData);
  };

  const handleDisplayReceiptDownload = (isVisible, rowData) => {
    setDownloadReceipt(isVisible);
    setShowPdfReceiptModal(true);
    setRowData(rowData);
  };

  const handleClosePdfReceipt = () => {
    setDownloadReceipt(false);
  };

  const handleClosePdfModal = () => {
    setDownloadInvoice(false);
  };

  useEffect(() => {
    // setLoading(true);
    if (hostelId) {
      dispatch({
        type: "BANKINGLIST",
        payload: { hostel_id: hostelId },
      });
    }
  }, [hostelId]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      setBanking(state.bankingDetails.bankingList.banks);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);



  useEffect(() => {
    if (state.InvoiceList.UpdateInvoiceStatusCode === 200) {
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });

      dispatch({
        type: "RECEIPTSLIST",
        payload: { hostel_id: hostelId },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_UPDATE_LIST" });
      }, 2000);
    }
  }, [state.InvoiceList.UpdateInvoiceStatusCode]);

  useEffect(() => {
    setBillRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_view === 1
    ) {
      setBillPermissionError("");
    } else {
      setLoading(false)
      setBillPermissionError("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_create === 1
    ) {
      setRecuringBillAddPermission("");
    } else {
      setRecuringBillAddPermission("Permission Denied");
      setLoading(false)
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_view === 1
    ) {
      setRecurringPermission("");
    } else {
      setRecurringPermission("Permission Denied");
      setLoading(false)
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_view === 1
    ) {
      setReceiptPermission("");
    } else {
      setReceiptPermission("Permission Denied");
      setLoading(false)
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_create === 1
    ) {
      setReceiptAddPermission("");
    } else {
      setReceiptAddPermission("Permission Denied");
    }
  }, [billrolePermission]);

  // useEffect(() => {
  //   if (
  //     billrolePermission[0]?.is_owner == 1 ||
  //     billrolePermission[0]?.role_permissions[10]?.per_delete == 1
  //   ) {
  //     setReceiptDeletePermission("");
  //   } else {
  //     setReceiptDeletePermission("Permission Denied");
  //   }
  // }, [billrolePermission]);

  useEffect(() => {
    if (hostelId) {
      dispatch({ type: "BANKINGLIST", payload: { hostel_id: hostelId } });
    }
  }, [hostelId]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_create === 1
    ) {
      setBillAddPermission("");
    } else {
      setBillAddPermission("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_delete === 1
    ) {
      setBillDeletePermission("");
    } else {
      setBillDeletePermission("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner === 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_edit === 1
    ) {
      setBillEditPermission("");
    } else {
      setBillEditPermission("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      state.InvoiceList.InvoiceListStatusCode === 200 ||
      state.InvoiceList.statusCodeForPDf === 200 ||
      state.InvoiceList.statusCodeForReceiptPDf === 200
    ) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_LIST" });
      }, 100);

      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
      }, 200);

      setTimeout(() => {
        dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
      }, 200);
    }
  }, [
    state.InvoiceList?.InvoiceListStatusCode,
    state.InvoiceList?.statusCodeForPDf,
    state.InvoiceList.statusCodeForReceiptPDf,
  ]);

  // useEffect(() => {
  //   dispatch({ type: "ALL-NOTIFICATION-LIST" });
  //   setNotification(state.login.Notification);
  // }, []);

  useEffect(() => {
    if (
      state.login.UpdateNotificationMessage !== null &&
      state.login.UpdateNotificationMessage !== ""
    ) {
      // dispatch({ type: "ALL-NOTIFICATION-LIST" });
      setTimeout(() => {
        dispatch({ type: "AFTER_UPDATE_NOTIFICATION", message: null });
        // newNotificationIDs = [];
      }, 100);
    }
  }, [state.login.UpdateNotificationMessage]);



  useEffect(() => {
    if (state.InvoiceList?.statusCodeForPDf === 200) {
      const pdfUrl = state.InvoiceList.invoicePDF;

      if (pdfUrl) {
        setShowLoader(false);

        // Pre-open the tab
        const pdfWindow = window.open("", "_blank");
        if (pdfWindow) {
          pdfWindow.location.href = pdfUrl; // Update URL to the PDF
          dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
          // setTimeout(() => dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" }), 100);
        }
      }
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  useEffect(() => {
    if (state.InvoiceList?.statusCodeForReceiptPDf === 200) {
      const pdfUrl = state.InvoiceList.ReceiptPDF;

      if (pdfUrl) {
        setShowLoader(false);

        // Pre-open the tab
        const pdfWindow = window.open("", "_blank");
        if (pdfWindow) {
          pdfWindow.location.href = pdfUrl; // Update URL to the PDF
          dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
        }

      }
    }
  }, [state.InvoiceList?.statusCodeForReceiptPDf]);

  // useEffect(() => {
  //   dispatch({
  //     type: "HOSTELDETAILLIST",
  //     payload: { hostel_Id: invoiceList.hostel_Id },
  //   });
  // }, [invoiceList.hostel_Id]);

  // useEffect(() => {
  //   dispatch({
  //     type: "ROOMDETAILS",
  //     payload: {
  //       hostel_Id: invoiceList.hostel_Id,
  //       floor_Id: invoiceList.FloorNo,
  //     },
  //   });
  // }, [invoiceList.FloorNo]);

  useEffect(() => {
    if (selectedUserId) {
      const filteredDetails = state.UsersList?.Users?.find(
        (item) => item.User_Id === selectedUserId
      );
      if (filteredDetails) {
        // setFilteredUserDetails([filteredDetails]);
        setInvoiceList({
          ...invoiceList,
          firstName: filteredDetails.Name.split(" ")[0] || "",
          lastName: filteredDetails.Name.split(" ")[1] || "",
          phone: filteredDetails.Phone || "",
          email: filteredDetails.Email || "",
          hostel_Name: filteredDetails.HostelName || "",
          hostel_Id: filteredDetails.Hostel_Id || "",
          FloorNo: filteredDetails.Floor || "",
          RoomNo: filteredDetails.Rooms || "",
        });
      }

    }

  }, [selectedUserId, state.UsersList?.Users, state.InvoiceList?.Invoice]);


  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  //  const handleDateChange = (e) => {
  //     const selectedDate = new Date(e.target.value);

  //     const year = selectedDate.getFullYear();
  //     const month = selectedDate.getMonth() + 1;
  //     const lastDayOfMonth = new Date(year, month, 0);
  //     const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
  //     const selectedMonth = selectedDate.getMonth();
  //     const roomRent = filteredUserDetails[0]?.RoomRent;
  //     const AlreadyPaidRoomRent = state.InvoiceList?.Invoice.filter(item => {
  //       const itemDate = new Date(item.Date);
  //       const itemMonth = itemDate.getMonth();
  //       return itemMonth === selectedMonth && item.User_Id === selectedUserId;
  //     });

  //     let totalPaidAmount = 0;
  //     AlreadyPaidRoomRent.forEach(item => {
  //       const paidAmount = parseFloat(item.Amount) || 0;
  //       totalPaidAmount += paidAmount;
  //     });

  //     const isRoomRentPaid = roomRent === totalPaidAmount;
  //     // setDisplayText(isRoomRentPaid);
  //     setIsSaveDisabled(isRoomRentPaid);

  //     setInvoiceList(prevState => ({
  //       ...prevState,
  //       date: e.target.value,
  //       dueDate: formattedDueDate,
  //     }));
  //   }

  useEffect(() => {
    if (hostelId) {
      dispatch({ type: "USERLIST", payload: { hostel_id: hostelId } });
    }
  }, [hostelId]);



  useEffect(() => {
    if (state.InvoiceList.manualInvoiceAddStatusCode === 200) {
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });
        setLoading(false);

        setBills(state.InvoiceList.ManualInvoices);
      }, 1000);
    }
  }, [
    state.InvoiceList.manualInvoiceAddStatusCode,
    state.InvoiceList.ManualInvoices,
  ]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
        setLoading(false);

        setBills(state.InvoiceList.ManualInvoices);
      }, 1000);
    }
  }, [
    state.InvoiceList.manualInvoiceEditStatusCode,
    state.InvoiceList.ManualInvoices,
  ]);
  useEffect(() => {
    if (state.InvoiceList.manualInvoiceDeleteStatusCode === 200) {
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE" });
        // setLoading(false);

        setBills(state.InvoiceList.ManualInvoices);
      }, 1000);
    }
  }, [
    state.InvoiceList.manualInvoiceDeleteStatusCode,
    state.InvoiceList.ManualInvoices,
  ]);

  useEffect(() => {
    if (state.InvoiceList?.InvoiceListStatusCode === 200) {
      setLoading(false);
      // dispatch({
      //   type: "MANUALINVOICESLIST",
      //   payload: { hostel_id: hostelId },
      // });
      setBills(state.InvoiceList.ManualInvoices);
      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_LIST" });
      }, 1000);
    }
  }, [state.InvoiceList?.InvoiceListStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.message !== "" && state.InvoiceList.message !== null) {
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });
      setBills(state.InvoiceList.ManualInvoices);
      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_UPDATE_LIST" });
      }, 100);
    }
  }, [state.InvoiceList]);

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
  }, [startdate, enddate, invoicedate, invoiceduedate]);

  useEffect(() => {
    if (customername && !invoiceDetails) {
      dispatch({
        type: "MANUAL-INVOICE-NUMBER-GET",
        payload: { user_id: customername },
      });
    }
  }, [customername]);

  useEffect(() => {
    if (state.InvoiceList.Manulainvoicenumberstatuscode === 200) {
      setInvoiceNumber(state.InvoiceList.ManualInvoiceNUmber.invoice_number);
      setTimeout(() => {
        dispatch({ type: "REMOVE_MANUAL_INVOICE_NUMBER_GET" });
      }, 100);
    }
  }, [
    state.InvoiceList.ManualInvoiceNUmber.invoice_number,
    state.InvoiceList.Manulainvoicenumberstatuscode,
  ]);

  // useEffect(() => {
  //   if (!dataFetched) {
  //     dispatch({
  //       type: 'GET-MANUAL-INVOICE-AMOUNTS',
  //       payload: {
  //         user_id: customername,
  //         start_date: formatstartdate,
  //         end_date: formatenddate
  //       }
  //     });

  //     if (state.InvoiceList.manualInvoiceStatusCode === 200) {
  //       const totalArray = state?.InvoiceList?.ManualInvoice?.total_array;

  //       if (totalArray) {
  //         setInvoiceTotalAmount(totalArray);
  //       }
  //       setDataFetched(true);
  //       setTimeout(() => {
  //         dispatch({ type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_AMOUNT_GET' });
  //       }, 1000);
  //     }
  //   }
  // }, [customername, formatstartdate, formatenddate, dataFetched, state.InvoiceList.manualInvoiceStatusCode , state.InvoiceList.ManualInvoice.total_array]);

  // useEffect(() => {
  //   if (invoicetotalamounts && invoicetotalamounts.length > 0) {
  //     setBillAmounts(invoicetotalamounts);
  //   }
  // }, [invoicetotalamounts]);

  useEffect(() => {
    //future purpose commenting this lines ==>

    //   if(billamounts && billamounts.length > 0){

    //   const  EbAmount = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 10);// EB Amount with id 10
    //   const  RoomRentItem = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 50); // Room Rent with id 50

    //   setEBAmount(EbAmount)
    //   setRentAmount(RoomRentItem)

    //   var  amenities = billamounts && billamounts.length > 0 && billamounts.filter(item => item.id != 10 && item.id != 50);

    //  const AmenityDetails = amenities.map(item => ({
    //     am_name: item.description,
    //     amount: item.amount
    //     }));

    //     setAmenityDetails(AmenityDetails)

    //     const allRows = newRows.map(detail => ({
    //       am_name: detail.am_name,
    //       amount: Number(detail.amount)
    //     })).filter(detail => detail.am_name && detail.amount);

    //     const amenityArray = AmenityDetails.map(detail => ({
    //       am_name: detail.am_name,
    //       amount: detail.amount
    //     })).filter(detail => detail.am_name && detail.amount);

    //     // Combine allRows and amenityArray
    //     const combinedRows = [...amenityArray, ...allRows];

    //     setamenityArray(combinedRows)

    //     const totalAmount = (
    //       parseFloat(EbAmount?.amount || 0) +         // Add EB Amount
    //       parseFloat(RoomRentItem?.amount || 0) +     // Add Room Rent
    //       combinedRows.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0) // Sum amounts from combinedRows
    //     );

    //     setTotalAmount(totalAmount);  // Set the total amount in the state

    //           }

    if (newRows) {
      const allRows = newRows
        .map((detail) => ({
          am_name: detail.am_name,
          amount: Number(detail.amount),
        }))
        .filter((detail) => detail.am_name && detail.amount);

      setamenityArray(allRows);

      const Total_amout = allRows.reduce(
        (sum, item) => sum + parseFloat(item.amount || 0),
        0
      );

      setTotalAmount(Total_amout);
    }
  }, [newRows]);

  useEffect(() => {

    if (hostelId) {
      setRecurLoader(true);
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: { hostel_id: hostelId },
      });
    }
  }, [hostelId]);

  useEffect(() => {
    if (state.InvoiceList.RecurringbillsgetStatuscode === 200) {
      setRecurringBills(state.InvoiceList.RecurringBills);
      setOriginalRecuiring(state.InvoiceList.RecurringBills)
      setRecurLoader(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.RecurringbillsgetStatuscode]);

  useEffect(() => {
    if (
      state.InvoiceList.RecurringBillAddStatusCode === 200 ||
      state.InvoiceList.deleterecurringbillsStatuscode
    ) {
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: { hostel_id: hostelId },
      });
      setRecurringBills(state.InvoiceList.RecurringBills);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_ADD" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECURRINGBILLS_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.InvoiceList.RecurringBillAddStatusCode,
    state.InvoiceList.deleterecurringbillsStatuscode,
  ]);

  

  useEffect(() => {
    if (value === "1") {
      const FilterUser = Array.isArray(bills)
        ? bills.filter((item) =>
          item.Name?.toLowerCase().includes(filterInput.toLowerCase())
        )
        : [];

      setBills(FilterUser);
    }

    if (value === "2") {
      const FilterUsertwo = Array.isArray(recurringbills)
        ? recurringbills.filter((item) =>
          item.user_name?.toLowerCase().includes(filterInput.toLowerCase())
        )
        : [];

      setRecurringBills(FilterUsertwo);
    }

    if (value === "3") {
      const FilterUserReceipt = Array.isArray(receiptdata)
        ? receiptdata.filter((item) =>
          item.Name?.toLowerCase().includes(filterInput.toLowerCase())
        )
        : [];

      setReceiptData(FilterUserReceipt);
    }
  }, [filterInput, value]);

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
    setDropdownVisible(e.target.value.length > 0);
    // setDropdownVisible(value.trim().length > 0); 
    setBills(originalBills);
    setRecurringBills(originalRecuiring);
    setReceiptData(originalReceipt);

  };

  const handleUserSelect = (user) => {
    setFilterInput(user.Name);
    setBills([user]);
    setDropdownVisible(false);
  };

  const handleCloseSearch = () => {
    setDropdownVisible(false); 
    setSearch(false);
    setFilterInput("");
    
    setBills(bills);
    setRecurringBills(originalRecuiring);
    setReceiptData(originalReceipt);
    dispatch({
      type: "MANUALINVOICESLIST",
      payload: { hostel_id: hostelId },
    });
  };

  // Set initial data when component mounts
  useEffect(() => {
    if (receiptdata?.length > 0 && originalReceipt?.length === 0) {
      setOriginalReceipt(receiptdata);
    }
  }, [receiptdata]);
  useEffect(() => {
    if (bills.length > 0 && originalBills.length === 0) {
      setOriginalBills(bills);
    }
  }, [bills]);

  useEffect(() => {
    if (recurringbills.length > 0 && originalRecuiring.length === 0) {
      setOriginalRecuiring(recurringbills);
    }
  }, [recurringbills]);
  const handleSearch = () => {
    setSearch(!search);
    // setFilterStatus(false);
  };

  const handleUserRecuire = (user) => {
    setFilterInput(user.user_name);
    setRecurringBills([user]);
    setDropdownVisible(false);
  };
  
 


  const handleUserReceipt = (user) => {
    setFilterInput(user.Name);
    setReceiptData([user]);
    setDropdownVisible(false);
  };

  // useEffect(() => {
  //    if (value === "1") {
  //      const FilterUser = Array.isArray(bills)
  //          ? bills.filter((item) =>
  //              item.Name.toLowerCase().includes(filterInput.toLowerCase())
  //            )
  //          : [];

  //      setBills(FilterUser);
  //  }

  //    if (value === "2") {
  //      const FilterUsertwo = Array.isArray(recurringbills) ? recurringbills?.filter((item) =>
  //       item.user_name.toLowerCase().includes(filterInput.toLowerCase())
  //        ) :[];
  //      setRecurringBills(FilterUsertwo);
  //    }

  //  }, [filterInput,value,]);

  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
  };

  //Receipt  
  useEffect(() => {

    if (hostelId) {
      setReceiptLoader(true);
      dispatch({
        type: "RECEIPTSLIST",
        payload: { hostel_id: hostelId },
      });
    }
  }, [hostelId]);

  useEffect(() => {
    if (state.InvoiceList.ReceiptlistgetStatuscode === 200) {
      setReceiptData(state.InvoiceList.ReceiptList);
      setOriginalBillsFilterReceipt(state.InvoiceList.ReceiptList)
      setOriginalReceipt(state.InvoiceList.ReceiptList)
      setReceiptLoader(false);
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: hostelId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.ReceiptlistgetStatuscode]);

  useEffect(() => {
    if (
      state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||
      state.InvoiceList.ReceiptDeletesuccessStatuscode === 200 ||
      state.InvoiceList.ReceiptEditsuccessStatuscode === 200
    ) {
      // setReceiptLoader(true);
      dispatch({
        type: "RECEIPTSLIST",
        payload: { hostel_id: hostelId },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_ADD" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_EDIT" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.InvoiceList.ReceiptAddsuccessStatuscode,
    state.InvoiceList.ReceiptDeletesuccessStatuscode,
    state.InvoiceList.ReceiptEditsuccessStatuscode,
  ]);


  return (
    <div>
      {showAllBill && (
        <>
         <div
  className="container-fluid sticky-top bg-white "
  style={{ zIndex: 1000, height: '70px',top:10,paddingLeft:7,paddingRight:6,backgroundColor:"#ffffff"}}
>
<div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
            <div className=" ms-3 " style={{
    marginTop: value === "1" || value === "3" ? "7px" : "11px",
  }}>
      <label style={{ fontSize: 18, color: "#000000", fontWeight: 600,fontFamily: "Gilroy" }}>Bills</label>
    </div>

            <div >
              {showLoader && <LoaderComponent />}
              {loading && <LoaderComponent />}
              <div  className="d-flex flex-wrap align-items-center gap-2" style={{marginTop:"-6px",paddingLeft:25}}>
                {search ? (
                  <>
                    <div className="position-relative" style={{ minWidth: 160,maxWidth:250, }}>
                     
                       
                        <div
                          className="input-group"
                          style={{ marginRight: 20, paddingTop: "25px" }}
                        >
                          <span className="input-group-text bg-white border-end-0">
                            <Image
                              src={searchteam}
                              style={{ height: 20, width: 20 }}
                            />
                          </span>
                          <input
                            type="text"
                            className="form-control border-start-0"
                            placeholder="Search"
                            style={{
                              boxShadow: "none",
                              outline: "none",
                              borderColor: "rgb(207,213,219)",
                              borderRight: "none",
                            }}
                            value={filterInput}
                            onChange={(e) => handlefilterInput(e)}
                          />
                          <span className="input-group-text bg-white border-start-0">
                            <img
                              src={closecircle}
                              alt="close"
                              onClick={handleCloseSearch}
                              style={{ height: 20, width: 20, cursor: "pointer" }}
                            />
                          </span>
                        </div>
                     

                      {value === "1" &&
                        isDropdownVisible &&
                        bills?.length > 0 && (
                          <div
                            style={{
                              border: "1px solid #d9d9d9 ",
                              position: "absolute",
                              top: 80,
                              left: 0,
                              zIndex: 1000,
                              padding: 10,
                              borderRadius: 8,
                              backgroundColor: "#fff",
                              width: "100%",
                            }}
                          >
                            {/* <ul
                              className="show-scroll p-0"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                minHeight: 50,
                                maxHeight: bills?.length > 1 ? "100px" : "auto",
                                overflowY: bills?.length > 3 ? "auto" : "hidden",
                                margin: "0",
                                listStyleType: "none",
                                boxSizing: "border-box",
                              }}
                            >
                              {bills?.map((user, index) => {
                                const imagedrop = user.profile || Profile;
                                return (
                                  <li
                                    key={index}
                                    className="list-group-item d-flex align-items-center"
                                    style={{
                                      cursor: "pointer",
                                      padding: "10px 5px",
                                      borderBottom:
                                        index !== bills?.length - 1
                                          ? "1px solid #eee"
                                          : "none",
                                    }}
                                    onClick={() => handleUserSelect(user)}
                                  >
                                    <Image
                                      src={imagedrop}
                                      alt={user.Name || "Default Profile"}
                                      roundedCircle
                                      style={{
                                        height: "30px",
                                        width: "30px",
                                        marginRight: "10px",
                                      }}
                                      onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Profile;
                                      }}
                                    />
                                    <span>{user.Name}</span>
                                  </li>
                                );
                              })}
                            </ul> */}
                             <ul
                                            className="show-scroll p-0"
                                            style={{
                                              listStyleType: "none",
                                              maxHeight: 174,
                                              minHeight:
                                              bills?.length > 1 ? "100px" : "auto",
                                              overflowY:
                                              bills?.length > 3 ? "auto" : "hidden",
                                              margin: 0,
                                            }}
                                          >
                                            {bills?.map((user, index) => (
                                              <li
                                                key={index}
                                                className="d-flex align-items-center"
                                                style={{
                                                  padding: "10px 5px",
                                                  cursor: "pointer",
                                                  borderBottom:
                                                    index !== bills?.length - 1
                                                      ? "1px solid #eee"
                                                      : "none",
                                                  backgroundColor:
                                                    hoveredIndex === index ? "#1E45E1" : "transparent",
                                                    color:
                                                    hoveredIndex === index ? "white" : "black",
                                                }}
                                                onClick={() => handleUserSelect(user)}
                                                onMouseEnter={() => setHoveredIndex(index)}
                                                onMouseLeave={() => setHoveredIndex(null)}
                                              >
                                                <Image
                                                  src={user.profile || Profile}
                                                  alt={user.Name}
                                                  roundedCircle
                                                  style={{
                                                    height: "30px",
                                                    width: "30px",
                                                    marginRight: "10px",
                                                  }}
                                                  onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = Profile;
                                                  }}
                                                />
                                                <span>{user.Name}</span>
                                              </li>
                                            ))}
                                          </ul>
                          </div>
                        )}
                      {value === "2" && isDropdownVisible && recurringbills?.length > 0 && (
                          <div
                          style={{
                            border: "1px solid #d9d9d9 ",
                            position: "absolute",
                            top: 80,
                            left: 0,
                            zIndex: 9999, // Increased zIndex
                            padding: 10,
                            borderRadius: 8,
                            backgroundColor: "#fff",
                            width: "100%",
                            pointerEvents: "auto", // Ensure clicks are registered
                          }}
                        >
                          <ul
                            className="show-scroll p-0"
                            style={{
                              backgroundColor: "#fff",
                              borderRadius: "4px",
                              minHeight: 50,
                              maxHeight: recurringbills?.length > 1 ? "174px" : "auto",
                              overflowY: recurringbills?.length > 1 ? "auto" : "hidden",
                              margin: "0",
                              listStyleType: "none",
                              boxSizing: "border-box",
                            }}
                          >
                            {recurringbills?.length === 0 ? (
                              <li style={{ padding: "10px" }}>No results found</li>
                            ) : (
                              recurringbills?.map((user, index) => (
                                <li
                                  key={index}
                                  className="list-group-item d-flex align-items-center"
                                  style={{
                                    cursor: "pointer",
                                    padding: "10px 5px",
                                    borderBottom: index !== recurringbills.length - 1 ? "1px solid #eee" : "none",
                                  }}
                                  onClick={(e) => {
                                    e.preventDefault(); 
                                    e.stopPropagation(); 
                                    console.log(`Clicked on: ${user.user_name}`); 
                                    handleUserRecuire(user);
                                  }}
                                >
                                  <Image
                                    src={user.profile || Profile}
                                    alt={user.user_name || "Default Profile"}
                                    roundedCircle
                                    style={{ height: "30px", width: "30px", marginRight: "10px" }}
                                    onError={(e) => {
                                      e.target.onerror = null;
                                      e.target.src = Profile;
                                    }}
                                  />
                                  <span>{user.user_name}</span>
                                </li>
                              ))
                            )}
                          </ul>
                        </div>
                        
                        )}

                      {value === "3" &&
                        isDropdownVisible &&
                        receiptdata?.length > 0 && (
                          <div
  style={{
    border: "1px solid #d9d9d9 ",
    position: "absolute",
    top: 80,
    left: 0,
    zIndex: 9999,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    width: "100%",
    pointerEvents: "auto",
  }}
>
  <ul
    className="show-scroll p-0"
    style={{
      backgroundColor: "#fff",
      borderRadius: "4px",
      minHeight: 50,
      maxHeight: receiptdata?.length > 1 ? "100px" : "auto",
      overflowY: receiptdata?.length > 3 ? "auto" : "hidden",
      margin: "0",
      listStyleType: "none",
      boxSizing: "border-box",
    }}
  >
    {receiptdata?.map((user, index) => {
      const imagedrop = user.profile || Profile;
      return (
        <li
          key={index}
          className="list-group-item d-flex align-items-center"
          style={{
            cursor: "pointer",
            padding: "10px 5px",
            borderBottom: index !== receiptdata?.length - 1 ? "1px solid #eee" : "none",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log(`Clicked on: ${user.Name}`); // Debug line
            handleUserReceipt(user);
          }}
        >
          <Image
            src={imagedrop}
            alt={user.Name || "Default Profile"}
            roundedCircle
            style={{
              height: "30px",
              width: "30px",
              marginRight: "10px",
            }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = Profile;
            }}
          />
          <span>{user.Name}</span>
        </li>
      );
    })}
  </ul>
</div>

                        )}
                    </div>
                  </>
                ) : (
                  <>
                    <div style={{ marginTop: 18 }}>
                      <Image
                        src={searchteam}
                        roundedCircle
                        style={{
                          height: "24px",
                          width: "24px",
                          cursor: "pointer"
                        }}
                        onClick={handleSearch}
                      />
                    </div>
                  </>
                )}

                {(value === "1" || value === "3") && (
                  <div >
                    <Image
                      src={Filters}
                      roundedCircle
                      style={{ height: "50px", width: "50px", marginTop: 18, cursor: "pointer" }}
                      onClick={handleFilterd}
                    />
                  </div>
                )}

                {value === "1" && filterStatus && (
                  <div
                    className="me-3"
                    style={{
                      border: "1px solid #D4D4D4",
                      borderRadius: 8,
                      width: search ? "120px" : "120px",
                      marginTop: "20px",
                    }}
                  >
                    <Form.Select
                      onChange={(e) => handleStatusFilter(e)}
                      value={statusfilter}
                      aria-label="Select Price Range"
                      className=""
                      id="statusselect"
                      style={{
                        color: "rgba(34, 34, 34, 1)",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        cursor: "pointer"
                      }}
                    >
                      <option value="All">All</option>
                      <option value="Unpaid">UnPaid</option>
                      <option value="Paid">Paid</option>
                      <option value="date">Date</option>
                    </Form.Select>
                 
                  </div>
                )}
{statusfilter === "date" && value === "1" && (
  <div className="mt-4">
    <RangePicker
  style={{ height: 40,cursor:"pointer" }}
  onChange={(dates) => {
    if (!dates || dates.length === 0) {
      setStatusfilter("");
      setDateRange([]);        
      setStartDate(null);   
      setEndDate(null); 
    } else {
      setDateRange(dates);
      setStartDate(dates[0]);
      setEndDate(dates[1]);
    }
  }}
  value={dateRange}
  format="YYYY-MM-DD"
  className="w-100"
/>

  </div>
)}

                {value === "3" && filterStatus && (
                  <div
                    className="me-3"
                    style={{
                      border: "1px solid #D4D4D4",
                      borderRadius: 8,
                      width: search ? "120px" : "120px",
                      marginTop: "20px",
                    }}
                  >
                    <Form.Select
                      onChange={(e) => handleStatusFilterReceipt(e)}
                      value={statusFilterReceipt}
                      aria-label="Select Price Range"
                      className=""
                      id="statusselect"
                      style={{
                        color: "rgba(34, 34, 34, 1)",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        cursor:"pointer"
                      }}
                    >
                      <option value="All">All</option>
                      <option value="Cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                      <option value="date">Date</option>
                    </Form.Select>
                  </div>
                )}

{statusFilterReceipt === "date" && value === "3" && (
  <div className="me-3 mt-3">
    <RangePicker
      value={receiptDateRange}
      format="YYYY-MM-DD"
      onChange={handleDateRangeChangeReceipt}
      style={{ height: "38px", borderRadius: 8,cursor:"pointer"}}
      allowClear
    />
  </div>
)}

                {/* <BsSearch class=" me-4" onClick={handleiconshow} /> 

<div className='me-3'>
<Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} onClick={handleFiltershow} />
</div> */}

                <div style={{paddingRight:18}} >
                  {value === "1" && (
                    <Button
                      disabled={billAddPermission}
                      onClick={handleManualShow}
                      
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "11px 33px",
                        marginTop: 12,
                        paddingLeft: 34,
                        whiteSpace: "nowrap",
                      }}
                    >
                      {" "}
                      + Create Bill
                    </Button>
                  )}
                  {value === "2" && (
                    <Button
                      disabled={recuringbillAddPermission}
                      onClick={handleRecurrBillShow}
                      // style={{
                      //   fontSize: 14,
                      //   backgroundColor: "#1E45E1",
                      //   color: "white",
                      //   height: 52,
                      //   fontWeight: 600,
                      //   borderRadius: 8,
                      //   width: 200,
                      //   padding: "12px, 16px, 12px, 16px",
                      //   color: "#FFF",
                      //   fontFamily: "Montserrat",
                      //   whiteSpace: "nowrap",
                      // }}
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "11px 25px",
                        paddingLeft: 25,
                        marginTop: 18,
                        whiteSpace: "nowrap",
                        // width: "170px",
                      }}
                    >
                      {" "}
                      + Recurring Bill
                    </Button>
                  )}

                  {value === "3" && (
                    <Button
                      disabled={receiptaddPermission}
                      onClick={handleReceiptShow}
                      // style={{
                      //   fontSize: 14,
                      //   backgroundColor: "#1E45E1",
                      //   color: "white",
                      //   height: 52,
                      //   fontWeight: 600,
                      //   borderRadius: 8,
                      //   width: 180,
                      //   padding: "12px, 16px, 12px, 16px",
                      //   color: "#FFF",
                      //   fontFamily: "Montserrat",
                      //   whiteSpace: "nowrap",
                      // }}
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "11px 18px",
                        paddingLeft: 18,
                        whiteSpace: "nowrap",
                        marginTop: 12,
                      }}
                    >
                      {" "}
                      + Create Receipt
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          </div>

          <TabContext value={value} >
          <div
             style={{
              position: "sticky",
              top:  69,
              right: 0,
              left: 0,
              zIndex: 1000,
              backgroundColor: search ? undefined : "#FFFFFF", 
              height: 60,
            }}
            >
              <Box
               sx={{ borderBottom: 0, borderColor: "divider" }}
                
              >
                <TabList
                
                  orientation={isSmallScreen ? "vertical" : "horizontal"}
                  onChange={handleChanges}
                  aria-label="lab API tabs example"
                  style={{ marginLeft: "14px",marginTop:"-5px" }}
                 
                  className="custom-tab-list d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
                >
                  <Tab
                    label="Bills"
                    value="1"
                    style={{
                      // marginTop: 0,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      color: "#4B4B4B",
                      lineHeight: "normal",
                      fontStyle: "normal",
                      fontWeight: 500,
                      textTransform: "none",
                    }}
                  />
                  <Tab
                    label="Recurring Bills"
                    value="2"
                    style={{
                      // marginTop: 0,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      color: "#4B4B4B",
                      lineHeight: "normal",
                      fontStyle: "normal",
                      fontWeight: 500,
                      textTransform: "none",
                    }}
                  />
                  <Tab
                    label="Receipt"
                    value="3"
                    style={{
                      // marginTop: 0,
                      fontSize: 16,
                      fontFamily: "Gilroy",
                      color: "#4B4B4B",
                      lineHeight: "normal",
                      fontStyle: "normal",
                      fontWeight: 500,
                      textTransform: "none",
                    }}
                  />
                </TabList>
              </Box>
            
</div>
            <TabPanel value="1">
              <>
                {billpermissionError ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        // height: "100vh",
                      }}
                    >
                      {/* Image */}
                      <img
                        src={Emptystate}
                        alt="Empty State"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />

                      {/* Permission Error */}
                      {billpermissionError && (
                        <div
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginTop: "1rem",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            fontSize:12
                          }}
                        >
                          <MdError size={20} />
                          <span>{billpermissionError}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    className=""
                    style={{ position: "relative", marginTop: "-5px" }}
                  >
                    <div className="texxttt">
                      <div style={{ flex: 1 }}>
          
                      </div>
                    </div>

         

                    {showdeleteform && (
                      <div>
                        <Modal
                          show={showdeleteform}
                          onHide={handleCloseDeleteform}
                          centered
                          backdrop="static"
                          dialogClassName="custom-delete-modal"
                        >
                          <Modal.Header style={{ borderBottom: "none" }}>
                            <Modal.Title
                            className="w-100 text-center"
                              style={{
                                fontSize: "18px",
                                fontFamily: "Gilroy",
                               
                                fontWeight: 600,
                                color: "#222222",
                                
                              }}
                            >
                              Delete Billing?
                            </Modal.Title>
                          </Modal.Header>

                          <Modal.Body
                          className="text-center"
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#646464",
                              
                              marginTop: "-10px",
                            }}
                          >
                            Are you sure you want to delete this Billing?
                          </Modal.Body>

                          <Modal.Footer
                          className="d-flex justify-content-center"
                            style={{
                              
                              borderTop: "none",
                              marginTop: "-10px",
                            }}
                          >
                            <Button
                            className="me-2"
                            style={{
                              width: "100%",
                              maxWidth: 160,
                              height: 52,
                              borderRadius: 8,
                              padding: "12px 20px",
                              background: "#fff",
                              color: "#1E45E1",
                              border: "1px solid #1E45E1",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                              fontSize: "14px",
                            }}
                              onClick={handleCloseDeleteform}
                            >
                              Cancel
                            </Button>
                            <Button
                              style={{
                                width: "100%",
                                maxWidth: 160,
                                height: 52,
                                borderRadius: 8,
                                padding: "12px 20px",
                                background: "#1E45E1",
                                color: "#FFFFFF",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                fontSize: "14px",
                              }}
                              onClick={handleBillDeleted}
                            >
                              Delete
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    )}

                    {showform && (
                      <div
                        className="modal show"
                        style={{
                          display: "block",
                          position: "initial",
                          fontFamily: "Gilroy,sans-serif",
                        }}
                      >
                        <Modal
                          show={showform}
                          onHide={handleCloseForm}
                          backdrop="static"
                          centered
                        >
                          <Modal.Dialog
                            style={{ maxWidth: 850, width: "600px" }}
                            className="m-0 p-0"
                          >
                            {/* <Modal.Header
                              closeButton
                              closeLabel="close-button"
                              style={{ border: "1px solid #E7E7E7" }}
                            >
                              <Modal.Title
                                style={{
                                  fontSize: 20,
                                  color: "#222222",
                                  fontFamily: "Gilroy,sans-serif",
                                  fontWeight: 600,
                                }}
                              >
                                {`Record payment `}
                                {invoiceValue?.Name && (
                                  <span>
                                    -
                                    <span style={{ color: "#1E45E1" }}>
                                      {" "}
                                      {invoiceValue.Name}
                                    </span>{" "}
                                  </span>
                                )}
                                {invoiceValue?.Invoices && (
                                  <span>
                                    -
                                    <span style={{ color: "#1E45E1" }}>
                                      {" "}
                                      {invoiceValue.Invoices}
                                    </span>{" "}
                                  </span>
                                )}
                              </Modal.Title>
                            </Modal.Header> */}


                            <Modal.Header
                              style={{ paddingTop: 40, position: "relative" }}
                            >
                              <div
                                style={{
                                  marginTop: -20,
                                  fontSize: 18,
                                  fontWeight: 600,
                                  fontFamily: "Gilroy", textAlign: "start",

                                }}
                              >
                                {`Record payment `}
                                {invoiceValue?.Name && (
                                  <span>
                                    -
                                    <span style={{ color: "#1E45E1" }}>
                                      {" "}
                                      {invoiceValue.Name}
                                    </span>{" "}
                                  </span>
                                )}
                                {invoiceValue?.Invoices && (
                                  <span>
                                    -
                                    <span style={{ color: "#1E45E1" }}>
                                      {" "}
                                      {invoiceValue.Invoices}
                                    </span>{" "}
                                  </span>
                                )}
                              </div>
                              <button
                                type="button"
                                className="close"
                                aria-label="Close"
                                onClick={handleCloseForm}
                                style={{
                                  position: "absolute",
                                  right: "10px",
                                  marginTop: -15,
                                  border: "1px solid black",
                                  background: "transparent",
                                  cursor: "pointer",
                                  padding: "0",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  width: "24px",
                                  height: "24px",
                                  borderRadius: "50%",
                                }}
                              >
                                <span
                                  aria-hidden="true"
                                  style={{
                                    fontSize: "30px",
                                    paddingBottom: "6px",
                                  }}
                                >
                                  &times;
                                </span>
                              </button>
                            </Modal.Header>

                            <Modal.Body>
                              <div className="row mt-2">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mt-1"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Due Amount
                                    </Form.Label>
                                    <Form.Control
                                      type="text"
                                      placeholder="Enter Amount"
                                      value={invoiceList.balanceDue}
                                      readOnly
                                    />
                                  </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mb-2"
                                    controlId="exampleForm.ControlInput3"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Paid Amount
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "20px",
                                        }}
                                      >
                                        *
                                      </span>
                                    </Form.Label>
                                    {/* <Form.Control
                                      type="text"
                                      placeholder="Enter Amount"
                                      value={invoiceList.payableAmount}
                                      onChange={(e) => {
                                        handleAmount(e);
                                      }}
                                    /> */}
 <Form.Control
  type="number"
  min="0"
  step="1"
  placeholder="Enter Amount"
  className="no-spinner"
  value={invoiceList.payableAmount || ""}
  onChange={(e) => handleAmount(e)}
  onKeyDown={(e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
  }}
/>



                                    {amounterrormsg.trim() !== "" && (
                                      <div>
                                        <p
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                            marginTop: "3px",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {amounterrormsg !== " " && (
                                            <MdError
                                              style={{
                                                fontSize: "15px",
                                                color: "red",
                                                marginBottom: "3px",
                                              }}
                                            />
                                          )}{" "}
                                          {amounterrormsg}
                                        </p>
                                      </div>
                                    )}
                                  </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mt-2"
                                    controlId="purchaseDate"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Paid Date
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "20px",
                                        }}
                                      >
                                        *
                                      </span>
                                    </Form.Label>
                                    <div
                                      style={{
                                        position: "relative",
                                        width: "100%",
                                      }}
                                    >
                                      {/* <DatePicker
                                        style={{ height: "40px" }}
                                        selected={selectedDate}
                                        onChange={(date) => {
                                          setDateErrmsg("");
                                          setAccountError("");
                                          setSelectedDate(date);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        maxDate={null}
                                        customInput={customDateInput({
                                          value: selectedDate
                                            ? selectedDate.toLocaleDateString(
                                              "en-GB"
                                            )
                                            : "",
                                        })}
                                      /> */}
                                       <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                        <DatePicker
                                          style={{ width: "100%", height: 48,cursor:"pointer" }}
                                          format="DD/MM/YYYY"
                                          placeholder="DD/MM/YYYY"
                                          value={selectedDate ? dayjs(selectedDate) : null}
                                          onChange={(date) => {
                                            setDateErrmsg("");
                                            setAccountError("");
                                            setSelectedDate(date ? date.toDate() : null);
                                          }}
                                          getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
                                        />
                                      </div>
                                    </div>
                                  </Form.Group>

                                  {/* <div style={{ position: 'relative' }}>
                    <label
                      htmlFor="date-input"
                      style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 7,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        color: "rgba(75, 75, 75, 1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                      onClick={() => {
                        if (calendarRef.current) {
                          calendarRef.current.flatpickr.open();
                        }
                      }}
                    >
                      {selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                      <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                    </label>
                    <Flatpickr
                      ref={calendarRef}
                      options={options}
                      placeholder="Select Date"
                      value={selectedDate}
                      onChange={handleDateChange}
                      style={{
                        padding: 10,
                        fontSize: 16,
                        width: "100%",
                        borderRadius: 8,
                        border: "1px solid #D9D9D9",
                        position: 'absolute',
                        top: 100,
                        left: 100,
                        zIndex: 1000,
                        display: "none"
                      }}
                    />
                  </div> */}

                                  {dateerrmsg.trim() !== "" && (
                                    <div>
                                      <p
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                          marginTop: "3px",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {dateerrmsg !== "" && (
                                          <MdError
                                            style={{
                                              fontSize: "15px",
                                              color: "red",
                                              marginBottom: "2px",
                                            }}
                                          />
                                        )}{" "}
                                        {dateerrmsg}
                                      </p>
                                    </div>
                                  )}
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput2"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "'Gilroy', sans-serif",
                                        fontWeight: 500,
                                        marginTop: 2,
                                      }}
                                    >
                                      Mode of Transaction
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "20px",
                                        }}
                                      >
                                        *
                                      </span>
                                    </Form.Label>
                                   

                                    <Select
                                      options={[
                                        { value: "Cash", label: "Cash" },
                                        { value: "Debit Card", label: "Debit Card" },
                                        { value: "Credit Card", label: "Credit Card" },
                                        { value: "UPI", label: "UPI" },
                                        { value: "Net Banking", label: "Banking" },
                                      ]}
                                      onChange={(selectedOption) => handleTransaction(selectedOption?.value)}
                                      value={
                                        invoiceList.transaction
                                          ? {
                                            value: invoiceList.transaction,
                                            label: invoiceList.transaction,
                                          }
                                          : null
                                      }
                                      placeholder="Please Select"
                                      classNamePrefix="custom"
                                      menuPlacement="auto"
                                      noOptionsMessage={() => "No options available"}
                                      styles={{
                                        control: (base) => ({
                                          ...base,
                                          height: "49px",
                                          border: "1px solid #D9D9D9",
                                          borderRadius: "8px",
                                          fontSize: "14px",
                                          color: "#4B4B4B",
                                          fontFamily: "Gilroy, sans-serif",
                                          fontWeight: 500,
                                          boxShadow: "none",
                                          marginTop: "6px",
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
                                          scrollbarWidth: "thin",
                                          overflowY: "auto",
                                        }),
                                        placeholder: (base) => ({
                                          ...base,
                                          color: "#555",
                                        }),
                                        dropdownIndicator: (base) => ({
                                          ...base,
                                          color: "#555",
                                        }),
                                        indicatorSeparator: () => ({
                                          display: "none",
                                        }),
                                      }}
                                    />


                                    {paymodeerrormsg.trim() !== "" && (
                                      <div>
                                        <p
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                            marginTop: "3px",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {paymodeerrormsg !== " " && (
                                            <MdError
                                              style={{
                                                fontSize: "15px",
                                                color: "red",
                                                marginBottom: "3px",
                                              }}
                                            />
                                          )}{" "}
                                          {paymodeerrormsg}
                                        </p>
                                      </div>
                                    )}
                                  </Form.Group>
                                </div>

                                {/* {modeOfPayment === "Net Banking" && ( */}
                                {invoiceList.transaction === "Net Banking" && (
                                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Account{" "}
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "20px",
                                        }}
                                      >
                                        {" "}
                                        *{" "}
                                      </span>
                                    </Form.Label>
                                   <Select
                                                   placeholder="Select Account"
                                                   options={
                                                    bankking?.length > 0
                                                       ? bankking.map((u) => ({
                                                           value: u.id,
                                                           label: u.bank_name,
                                                         }))
                                                       : []
                                                   }
                                                   value={
                                                     bankking.map((u) => ({
                                                       value: u.id,
                                                       label: u.bank_name,
                                                     })).find((opt) => opt.value === account) || null
                                                   }
                                                   onChange={handleAccount}
                                                   styles={{
                                                     control: (base) => ({
                                                       ...base,
                                                       height: "48px",
                                                       border: "1px solid #D9D9D9",
                                                       borderRadius: "8px",
                                                       fontSize: "16px",
                                                       color: "#4B4B4B",
                                                       fontFamily: "Gilroy",
                                                       fontWeight: 500,
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
                                                       scrollbarWidth: "thin",
                                                       overflowY: "auto",
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
                                                  //  isDisabled={currentItem}
                                                   noOptionsMessage={() =>
                                                    bankking?.length === 0
                                                       ? "No accounts available"
                                                       : "No match found"
                                                   }
                                                 />
                                  
                                    {accountError.trim() !== "" && (
                                      <div>
                                        <p
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                            marginTop: "3px",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {accountError !== " " && (
                                            <MdError
                                              style={{
                                                fontSize: "15px",
                                                color: "red",
                                              }}
                                            />
                                          )}{" "}
                                          {accountError}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                )}
                                {/* )} */}
                              </div>
                              {totalErrormsg.trim() !== "" && (
                                <div>
                                  <p
                                    style={{
                                      fontSize: "12px",
                                      color: "red",
                                      marginTop: "3px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {totalErrormsg !== " " && (
                                      <MdError
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                          
                                        }}
                                      />
                                    )}{" "}
                                    {totalErrormsg}
                                  </p>
                                </div>
                              )}
                            </Modal.Body>
                            <Modal.Footer style={{ border: "none" }}>
                              <Button
                                className="w-100"
                                style={{
                                  backgroundColor: "#1E45E1",
                                  fontWeight: 600,
                                  height: 50,
                                  borderRadius: 12,
                                  fontSize: 16,
                                  fontFamily: "Montserrat, sans-serif",
                                }}
                                onClick={handleSaveInvoiceList}
                              >
                                Record payment
                              </Button>
                            </Modal.Footer>
                          </Modal.Dialog>
                        </Modal>
                      </div>
                    )}

                    {/* {currentItems.length > 0 && */}
                    {/* <> */}

                    <Container fluid className="p-0">
                      <Row
                        className={` ${DownloadReceipt
                          ? "m-0 g-2 d-flex justify-content-between"
                          : "m-0 g-0"
                        }`}
                      >
                        <Col
                          lg={DownloadInvoice ? 4 : 12}
                          md={DownloadInvoice ? 4 : 12}
                          sm={DownloadInvoice ? 4 : 12}
                          xs={DownloadInvoice ? 4 : 12}
                        >
                          {DownloadInvoice ? (
                            <div
                              className="show-scroll p-2"
                              style={{ maxHeight: 500, overflowY: "auto" }}
                            >
                              {bills &&
                                bills.map((item) => (
                                  <>
                                    {/* <div className="" style={{}}>
                          <div className="d-flex  align-items-center justify-content-evenly w-100 "  >


                            <div >
                              <span ><img src={User} style={{ height: 40, width: 40, }} /></span>
                            </div>


                            <div className=''>

                              <div className="d-flex justify-content-between  align-items-center w-100 mb-2">

                                <div className="Invoice_Name" style={{ fontFamily: 'Gilroy', fontSize: '14px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer" }} onClick={() => handleDisplayInvoiceDownload(true, item)} >{item.Name}</div>
                                <div style={{ fontFamily: 'Gilroy', fontSize: '12px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600 }}>{item.Amount}</div>

                              </div>

                              <div className="d-flex justify-content-between gap-3 align-items-center w-100 mb-2 mt-2" style={{ backgroundColor: "" }}>

                                <div style={{ fontFamily: 'Gilroy', fontSize: '12px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600 }}>#{item.Invoices == null || item.Invoices == '' ? '0.00' : item.Invoices}</div>
                                <div className="" style={{ fontFamily: 'Gilroy', fontSize: '12px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600 }}>{moment(item.Date).format("DD MMM YYYY")}</div>

                              </div>

                              <div className='mb-2 mt-2'>
                                {item.BalanceDue === 0 ? <span style={{ fontSize: '10px',backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span> : <span

                                  style={{ cursor: 'pointer',fontSize: '10px', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000', borderRadius: '14px', padding: "8px 12px" }}>Unpaid</span>}
                              </div>

                            </div>

                          </div>
                        </div> */}
                                    <div className="" style={{}}>
                                      <div className="d-flex align-items-start justify-content-between w-100 p-2">
                                        <div>
                                          <span>
                                            <img
                                              src={
                                                item.user_profile &&
                                                  item.user_profile !== "0"
                                                  ? item.user_profile
                                                  : User
                                              }
                                              style={{ height: 40, width: 40 }}
                                              alt="User"
                                            />
                                          </span>
                                        </div>

                                        <div className="flex-grow-1 ms-2">
                                          <div className="d-flex justify-content-between align-items-center mb-2">
                                            <div
                                              className="Invoice_Name"
                                              style={{
                                                fontFamily: "Gilroy",
                                                fontSize: "14px",
                                                wordWrap: "break-word",
                                                color: "#222",
                                                fontStyle: "normal",
                                                lineHeight: "normal",
                                                fontWeight: 600,
                                                cursor: "pointer",
                                              }}
                                              onClick={() =>
                                                handleDisplayInvoiceDownload(
                                                  true,
                                                  item
                                                )
                                              }
                                            >
                                              {item.Name}
                                            </div>
                                            <div
                                              style={{
                                                fontFamily: "Gilroy",
                                                fontSize: "12px",
                                                wordWrap: "break-word",
                                                color: "#222",
                                                fontStyle: "normal",
                                                lineHeight: "normal",
                                                fontWeight: 600,
                                              }}
                                            >
                                              {item.Amount}
                                            </div>
                                          </div>

                                          <div className="d-flex justify-content-between gap-3 mb-2">
                                            <div
                                              style={{
                                                fontFamily: "Gilroy",
                                                fontSize: "12px",
                                                wordWrap: "break-word",
                                                color: "#222",
                                                fontStyle: "normal",
                                                lineHeight: "normal",
                                                fontWeight: 600,
                                              }}
                                            >
                                              {item.Invoices === null ||
                                                item.Invoices === ""
                                                ? "0.00"
                                                : item.Invoices}
                                            </div>
                                            <div
                                              style={{
                                                fontFamily: "Gilroy",
                                                fontSize: "12px",
                                                wordWrap: "break-word",
                                                color: "#222",
                                                fontStyle: "normal",
                                                lineHeight: "normal",
                                                fontWeight: 600,
                                              }}
                                            >
                                              {moment(item.Date).format(
                                                "DD MMM YYYY"
                                              )}
                                            </div>
                                          </div>

                                          <div className="mb-2">
                                            {item.BalanceDue === 0 ? (
                                              <span
                                                style={{
                                                  fontSize: "10px",
                                                  backgroundColor: "#D9FFD9",
                                                  color: "#000",
                                                  borderRadius: "14px",
                                                  fontFamily: "Gilroy",
                                                  padding: "8px 12px",
                                                }}
                                              >
                                                Paid
                                              </span>
                                            ) : (
                                              <span
                                                style={{
                                                  cursor: "pointer",
                                                  fontSize: "10px",
                                                  backgroundColor: "#FFD9D9",
                                                  fontFamily: "Gilroy",
                                                  color: "#000",
                                                  borderRadius: "14px",
                                                  padding: "8px 12px",
                                                }}
                                              >
                                                Unpaid
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <hr />
                                  </>
                                ))}
                            </div>
                          ) : (
                            <>
                              {currentItems && currentItems.length > 0 ? (
                                <div
                                  style={{
                                    // height: "400px",
                                    height:
                                      currentItems.length >= 6
                                        ? "370px"
                                        : "auto",
                                    overflowY:
                                      currentItems.length >= 6
                                        ? "auto"
                                        : "visible",

                                    borderRadius: "24px",
                                    border: "1px solid #DCDCDC",
                                    marginTop: "5px"
                                    // borderBottom:"none"
                                  }}
                                >
                                  <Table
                                    responsive="md"
                                    className="Table_Design"
                                    style={{
                                      border: "1px solid #DCDCDC",
                                      borderBottom: "1px solid transparent",
                                      borderEndStartRadius: 0,
                                      borderEndEndRadius: 0,
                                    }}
                                  >
                                    <thead
                                      style={{
                                        backgroundColor: "#E7F1FF",
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1,
                                      }}
                                    >
                                      <tr>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            paddingLeft: "20px",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            borderTopLeftRadius: 24,
                                          }}
                                        >
                                          Name
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Invoice Number
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Type
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "center",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Invoice Date
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "center",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Due Date
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Amount
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Due
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Status
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "center",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            borderTopRightRadius: 24,
                                          }}
                                        ></th>
                                      </tr>
                                    </thead>
                                    <tbody
                                      style={{
                                        fontSize: "10px",
                                        minHeight: "200px",
                                        position: "relative",
                                      }}
                                    >
                                      {
                                        currentItems.map((item) => (
                                          <InvoiceTable
                                            key={item.id}
                                            item={item}
                                            OnHandleshowform={handleShowForm}
                                            OnHandleshowEditform={handleEdit}
                                            OnHandleshowInvoicePdf={
                                              handleInvoiceDetail
                                            }
                                            OnHandleshowDeleteform={
                                              handleBillDelete
                                            }
                                            DisplayInvoice={
                                              handleDisplayInvoiceDownload
                                            }
                                            billAddPermission={
                                              billAddPermission
                                            }
                                            billEditPermission={
                                              billEditPermission
                                            }
                                            billDeletePermission={
                                              billDeletePermission
                                            }
                                          />
                                        ))}
                                    </tbody>
                                  </Table>
                                </div>
                              ) : (

                                !loading &&
                                currentItems &&
                                currentItems?.length === 0 && (

                                  <div>
                                    <div style={{ textAlign: "center" }}>
                                      {" "}
                                      <img src={Emptystate} alt="emptystate" />
                                    </div>
                                    <div
                                      className="pb-1"
                                      style={{
                                        textAlign: "center",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                        fontSize: 20,
                                        color: "rgba(75, 75, 75, 1)",
                                      }}
                                    >
                                      No bills available{" "}
                                    </div>
                                    <div
                                      className="pb-1"
                                      style={{
                                        textAlign: "center",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        fontSize: 16,
                                        color: "rgba(75, 75, 75, 1)",
                                      }}
                                    >
                                      There are no bills added{" "}
                                    </div>
                                  </div>
                                )
                              )}

                              {bills?.length >= 5 && (
                                <nav
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "end",
                                    padding: "10px",
                                    position: "fixed",
                                    bottom: "1px",
                                    right: "10px",
                                    backgroundColor: "#fff",
                                    borderRadius: "5px",
                                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                    zIndex: 1000,
                                  }}
                                >
                                  {/* Dropdown for Items Per Page */}
                                  <div>
                                    <select
                                      value={itemsPerPage}
                                      onChange={handleItemsPerPageChange}
                                      style={{
                                        padding: "5px",
                                        border: "1px solid #1E45E1",
                                        borderRadius: "5px",
                                        color: "#1E45E1",
                                        fontWeight: "bold",
                                        cursor: "pointer",
                                        outline: "none",
                                        boxShadow: "none",
                                      }}
                                    >
                                      <option value={5}>5</option>
                                      <option value={10}>10</option>
                                      <option value={50}>50</option>
                                      <option value={100}>100</option>
                                    </select>
                                  </div>

                                  {/* Pagination Controls */}
                                  <ul
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      listStyleType: "none",
                                      margin: 0,
                                      padding: 0,
                                    }}
                                  >
                                    {/* Previous Button */}
                                    <li style={{ margin: "0 10px" }}>
                                      <button
                                        style={{
                                          padding: "5px",
                                          textDecoration: "none",
                                          color:
                                            currentPage === 1
                                              ? "#ccc"
                                              : "#1E45E1",
                                          cursor:
                                            currentPage === 1
                                              ? "not-allowed"
                                              : "pointer",
                                          borderRadius: "50%",
                                          display: "inline-block",
                                          minWidth: "30px",
                                          textAlign: "center",
                                          backgroundColor: "transparent",
                                          border: "none",
                                        }}
                                        onClick={() =>
                                          handlePageChange(currentPage - 1)
                                        }
                                        disabled={currentPage === 1}
                                      >
                                        <ArrowLeft2
                                          size="16"
                                          color={
                                            currentPage === 1
                                              ? "#ccc"
                                              : "#1E45E1"
                                          }
                                        />
                                      </button>
                                    </li>

                                    {/* Current Page Indicator */}
                                    <li
                                      style={{
                                        margin: "0 10px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {currentPage} of {totalPages}
                                    </li>

                                    {/* Next Button */}
                                    <li style={{ margin: "0 10px" }}>
                                      <button
                                        style={{
                                          padding: "5px",
                                          textDecoration: "none",
                                          color:
                                            currentPage === totalPages
                                              ? "#ccc"
                                              : "#1E45E1",
                                          cursor:
                                            currentPage === totalPages
                                              ? "not-allowed"
                                              : "pointer",
                                          borderRadius: "50%",
                                          display: "inline-block",
                                          minWidth: "30px",
                                          textAlign: "center",
                                          backgroundColor: "transparent",
                                          border: "none",
                                        }}
                                        onClick={() =>
                                          handlePageChange(currentPage + 1)
                                        }
                                        disabled={currentPage === totalPages}
                                      >
                                        <ArrowRight2
                                          size="16"
                                          color={
                                            currentPage === totalPages
                                              ? "#ccc"
                                              : "#1E45E1"
                                          }
                                        />
                                      </button>
                                    </li>
                                  </ul>
                                </nav>
                              )}
                            </>
                          )}
                        </Col>

                        {DownloadInvoice && (
                          <>
                            {/* <Col lg={1} md={1} sm={12} xs={12} style={{ display: "flex", alignItems: "stretch", justifyContent: "end" }}>
                  <div
                    style={{
                      borderLeft: "1px solid rgba(225, 225, 225, 1)",
                      height: "100%",

                    }}
                  ></div>
                </Col> */}

                            <Col
                              lg={8}
                              md={8}
                              sm={12}
                              xs={12}
                              style={{
                                borderLeft: DownloadInvoice
                                  ? "1px solid #ccc"
                                  : "none",
                              }}
                            >
                              <BillPdfModal
                                show={showPdfModal}
                                handleClosed={handleClosePdfModal}
                                rowData={rowData}
                              />

                              {/* <label className=" m-5" onClick={handleBackClose}>Back</label> */}
                            </Col>
                          </>
                        )}
                      </Row>
                    </Container>

                    {/* </> */}
                    {/* } */}

                    {/* {!loading && currentItems.length === 0 && (
      <div  >
        <div>
          <div style={{ textAlign: "center" }}> <img src={Emptystate} alt="emptystate" /></div>
          <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No bills available </div>
          <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no bills added </div>

          <div style={{ textAlign: "center" }} className='mt-2'>
            <Button
              style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Record Payment</Button>
          </div>
        </div>

      </div>

    )} */}
                  </div>
                )}
              </>
            </TabPanel>

            <TabPanel value="2">
              {recurringPermission ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      // height: "100vh",
                    }}
                  >
                    {/* Image */}
                    <img
                      src={Emptystate}
                      alt="Empty State"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />

                    {/* Permission Error */}
                    {recurringPermission && (
                      <div
                        style={{
                          color: "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "1rem",
                          fontSize:12,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        <MdError size={20} />
                        <span>{recurringPermission}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {!recurLoader && currentItem.length === 0 && (
                    <div style={{ marginTop: 20 }}>
                      <div style={{ textAlign: "center" }}>
                        {" "}
                        <img src={Emptystate} alt="emptystate" />
                      </div>
                      <div
                        className="pb-1"
                        style={{
                          textAlign: "center",
                          fontWeight: 600,
                          fontFamily: "Gilroy",
                          fontSize: 20,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        No Recuring bills available{" "}
                      </div>
                      <div
                        className="pb-1"
                        style={{
                          textAlign: "center",
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          fontSize: 16,
                          color: "rgba(75, 75, 75, 1)",
                        }}
                      >
                        There are no bills added{" "}
                      </div>
                    </div>
                  )}



                  {!loading && recurLoader &&
                    <div
                      style={{
                        position: 'absolute',
                        top: 200,
                        right: 0,
                        bottom: 0,
                        left: 200,
                        display: 'flex',
                        height: "50vh",
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        opacity: 0.75,
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          borderTop: '4px solid #1E45E1',
                          borderRight: '4px solid transparent',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          animation: 'spin 1s linear infinite',
                        }}
                      ></div>
                    </div>

                  }

                  {currentItem && currentItem.length > 0 && (
                    <div
                      style={{
                        // height: "400px",
                        height: currentItem.length >= 6 ? "380px" : "auto",
                        overflowY: currentItem.length >= 6 ? "auto" : "visible",
                        borderRadius: "24px",
                        border: "1px solid #DCDCDC",
                        // borderBottom:"none"
                        marginTop:"3px"
                      }}
                    >
                      <Table
                        responsive="md"
                        className="Table_Design"
                        style={{
                          border: "1px solid #DCDCDC",
                          borderBottom: "1px solid transparent",
                          borderEndStartRadius: 0,
                          borderEndEndRadius: 0,
                        }}
                      >
                        <thead
                          style={{
                            backgroundColor: "#E7F1FF",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                textAlign: "start",
                                // verticalAlign:'middle',
                                paddingLeft: "20px",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontWeight: 500,
                                borderTopLeftRadius: 24,
                              }}
                            >
                              Name
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 500,
                              }}
                            >
                              Created
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 500,
                              }}
                            >
                              Due Date
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 500,
                              }}
                            >
                              Next Invoice Date
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 500,
                              }}
                            >
                              Amount
                            </th>

                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgb(147, 147, 147)",
                                fontSize: 14,
                                fontWeight: 500,
                                borderTopRightRadius: 24,
                              }}
                            ></th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "10px" }}>



                          {
                            currentItem &&
                            currentItem.length > 0 &&
                            currentItem.map((item) => (
                              <RecurringBillList
                                key={item.id}
                                item={item}
                                handleDeleteRecurringbills={
                                  handleDeleteRecurringbills
                                }
                                recuringbillAddPermission={
                                  recuringbillAddPermission
                                }
                                billrolePermission={billrolePermission}
                                OnHandleshowform={handleShowForm}
                              // OnHandleshowInvoicePdf={handleInvoiceDetail}
                              // DisplayInvoice={handleDisplayInvoiceDownload}
                              // RecuringInvoice={handleDisplayInvoiceDownload}
                              />
                            ))
                          }

                        </tbody>
                      </Table>
                    </div>
                  )}





                  {recurringbills && recurringbills.length >= 5 && (
                    <nav
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "10px",
                        position: "fixed",
                        bottom: "10px",
                        right: "10px",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                      }}
                    >
                      {/* Dropdown for Items Per Page */}
                      <div>
                        <select
                          value={itemsPage}
                          onChange={handleItemsPerPage}
                          style={{
                            padding: "5px",
                            border: "1px solid #1E45E1",
                            borderRadius: "5px",
                            color: "#1E45E1",
                            fontWeight: "bold",
                            cursor: "pointer",
                            outline: "none",
                            boxShadow: "none",
                          }}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>

                      {/* Pagination Controls */}
                      <ul
                        style={{
                          display: "flex",
                          alignItems: "center",
                          listStyleType: "none",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        {/* Previous Button */}
                        <li style={{ margin: "0 10px" }}>
                          <button
                            style={{
                              padding: "5px",
                              textDecoration: "none",
                              color:
                                currentRecurePage === 1 ? "#ccc" : "#1E45E1",
                              cursor:
                                currentRecurePage === 1
                                  ? "not-allowed"
                                  : "pointer",
                              borderRadius: "50%",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() =>
                              handlePageChangeRecure(currentRecurePage - 1)
                            }
                            disabled={currentRecurePage === 1}
                          >
                            <ArrowLeft2
                              size="16"
                              color={
                                currentRecurePage === 1 ? "#ccc" : "#1E45E1"
                              }
                            />
                          </button>
                        </li>

                        {/* Current Page Indicator */}
                        <li
                          style={{
                            margin: "0 10px",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {currentRecurePage} of {totalPage}
                        </li>

                        {/* Next Button */}
                        <li style={{ margin: "0 10px" }}>
                          <button
                            style={{
                              padding: "5px",
                              textDecoration: "none",
                              color:
                                currentRecurePage === totalPage
                                  ? "#ccc"
                                  : "#1E45E1",
                              cursor:
                                currentRecurePage === totalPage
                                  ? "not-allowed"
                                  : "pointer",
                              borderRadius: "50%",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() =>
                              handlePageChangeRecure(currentRecurePage + 1)
                            }
                            disabled={currentRecurePage === totalPage}
                          >
                            <ArrowRight2
                              size="16"
                              color={
                                currentRecurePage === totalPage
                                  ? "#ccc"
                                  : "#1E45E1"
                              }
                            />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}

                  {/* <div>
    <div>
      <div style={{ textAlign: "center" }}> <img src={Emptystate} alt="emptystate" /></div>
      <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No recurring bills available </div>
      <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no recurring bills added </div>

      <div style={{ textAlign: "center" }} className='mt-2'>
        <Button
          style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Record Payment</Button>
      </div>
    </div>

  </div> */}
                  {/* {DownloadInvoice && (
                          <>
            
                              <BillPdfModal
                                show={showPdfModal}
                                handleClosed={handleClosePdfModal}
                                rowData={rowData}
                              />
                          </>
                        )} */}
                </>
              )}
            </TabPanel>

            <TabPanel value="3">
              {receiptPermission ? (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      // height: "100vh",
                    }}
                  >
                    {/* Image */}
                    <img
                      src={Emptystate}
                      alt="Empty State"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />

                    {/* Permission Error */}
                    {receiptPermission && (
                      <div
                        style={{
                          color: "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "1rem",
                          fontSize:12,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        <MdError size={20} />
                        <span>{receiptPermission}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* 

                  {currentReceiptData && currentReceiptData.length > 0 && (
                    <div
                      style={{
                        // height: "400px",
                        height: currentReceiptData.length >= 6 ? "380px" : "auto",
                        overflowY: currentReceiptData.length >= 6 ? "auto" : "visible",
                        borderRadius: "24px",
                        border: "1px solid #DCDCDC",
                        // borderBottom:"none"
                      }}
                    >
                      <Table
                        responsive="md"
                        className="Table_Design"
                        style={{
                          border: "1px solid #DCDCDC",
                          borderBottom: "1px solid transparent",
                          borderEndStartRadius: 0,
                          borderEndEndRadius: 0,
                        }}
                      >
                        <thead
                          style={{
                            backgroundColor: "#E7F1FF",
                            position: "sticky",
                            top: 0,
                            zIndex: 1,
                          }}
                        >
                          <tr>
                            <th
                              style={{
                                textAlign: "start",
                                // verticalAlign:'middle',
                                paddingLeft: "20px",
                                fontFamily: "Gilroy",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontWeight: 600,
                                borderTopLeftRadius: 24,
                              }}
                            >
                              Name
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 600,
                              }}
                            >
                              Invoice Number
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 600,
                              }}
                            >
                              Reference_Id
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 600,
                              }}
                            >
                              Payment Mode
                            </th>
                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 600,
                              }}
                            >
                              Amount
                            </th>

                            <th
                              style={{
                                textAlign: "start",
                                fontFamily: "Gilroy",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontWeight: 600,
                                borderTopRightRadius: 24,
                              }}
                            ></th>
                          </tr>
                        </thead>
                        <tbody style={{ fontSize: "10px" }}>
                          {receiptLoader ?

                            <div
                              style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                left: '50%',
                                display: 'flex',
                                height: "50vh",
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: 'transparent',
                                opacity: 0.75,
                                zIndex: 10,
                              }}
                            >
                              <div
                                style={{
                                  borderTop: '4px solid #1E45E1',
                                  borderRight: '4px solid transparent',
                                  borderRadius: '50%',
                                  width: '40px',
                                  height: '40px',
                                  animation: 'spin 1s linear infinite',
                                }}
                              ></div>
                            </div>
                            : currentReceiptData &&
                            currentReceiptData.length > 0 &&
                            currentReceiptData.map((item) => (

                                <Receipt
                                  key={item.id}
                                  item={item}
                                 
                                  receiptaddPermission={
                                    receiptaddPermission
                                  }
                                  billrolePermission={billrolePermission}
                                  OnHandleshowform={handleShowForm}
                                 
                                />
                              ))}

                        </tbody>
                      </Table>
                    </div>
                  )}

                  {receiptdata.length > itemsPage && (
                    <nav
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "10px",
                        position: "fixed",
                        bottom: "10px",
                        right: "10px",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                        zIndex: 1000,
                      }}
                    >
                      <div>
                        <select
                          value={itemsPage}
                          onChange={handleItemsPerPage}
                          style={{
                            padding: "5px",
                            border: "1px solid #1E45E1",
                            borderRadius: "5px",
                            color: "#1E45E1",
                            fontWeight: "bold",
                            cursor: "pointer",
                            outline: "none",
                            boxShadow: "none",
                          }}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>

                      <ul
                        style={{
                          display: "flex",
                          alignItems: "center",
                          listStyleType: "none",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <li style={{ margin: "0 10px" }}>
                          <button
                            style={{
                              padding: "5px",
                              textDecoration: "none",
                              color:
                                currentRecurePage === 1 ? "#ccc" : "#1E45E1",
                              cursor:
                                currentRecurePage === 1
                                  ? "not-allowed"
                                  : "pointer",
                              borderRadius: "50%",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() =>
                              handlePageChangeRecure(currentRecurePage - 1)
                            }
                            disabled={currentRecurePage === 1}
                          >
                            <ArrowLeft2
                              size="16"
                              color={
                                currentRecurePage === 1 ? "#ccc" : "#1E45E1"
                              }
                            />
                          </button>
                        </li>

                        <li
                          style={{
                            margin: "0 10px",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {currentRecurePage} of {totalPage}
                        </li>

                        <li style={{ margin: "0 10px" }}>
                          <button
                            style={{
                              padding: "5px",
                              textDecoration: "none",
                              color:
                                currentRecurePage === totalPage
                                  ? "#ccc"
                                  : "#1E45E1",
                              cursor:
                                currentRecurePage === totalPage
                                  ? "not-allowed"
                                  : "pointer",
                              borderRadius: "50%",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() =>
                              handlePageChangeRecure(currentRecurePage + 1)
                            }
                            disabled={currentRecurePage === totalPage}
                          >
                            <ArrowRight2
                              size="16"
                              color={
                                currentRecurePage === totalPage
                                  ? "#ccc"
                                  : "#1E45E1"
                              }
                            />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )} */}

                  {!loading && receiptLoader &&
                    <div
                      style={{
                        position: 'absolute',
                        top: 200,
                        right: 0,
                        bottom: 0,
                        left: 200,
                        display: 'flex',
                        height: "50vh",
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        opacity: 0.75,
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          borderTop: '4px solid #1E45E1',
                          borderRight: '4px solid transparent',
                          borderRadius: '50%',
                          width: '40px',
                          height: '40px',
                          animation: 'spin 1s linear infinite',
                        }}
                      ></div>
                    </div>

                  }

                  <Container fluid className="p-0">
                    <Row
                      className={` ${DownloadReceipt
                          ? "m-0 g-2 d-flex justify-content-between"
                          : "m-0 g-0"
                        }`}
                    >
                      <Col
                        lg={DownloadReceipt ? 4 : 12}
                        md={DownloadReceipt ? 4 : 12}
                        sm={DownloadReceipt ? 4 : 12}
                        xs={DownloadReceipt ? 4 : 12}
                      >
                        {DownloadReceipt ? (
                          <div
                            className="show-scroll p-2"
                            style={{ maxHeight: "500px", overflowY: "auto" }}
                          >
                            {receiptdata &&
                              receiptdata.map((item) => (
                                <>
                                  <div className="" style={{}}>
                                    <div className="d-flex align-items-start justify-content-between w-100 p-2">
                                      <div>
                                        <span>
                                          <img
                                            src={
                                              item.user_profile &&
                                                item.user_profile !== "0"
                                                ? item.user_profile
                                                : User
                                            }
                                            style={{ height: 40, width: 40 }}
                                            alt="User"
                                          />
                                        </span>
                                      </div>

                                      <div className="flex-grow-1 ms-2">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                          <div
                                            className="Invoice_Name"
                                            style={{
                                              fontFamily: "Gilroy",
                                              fontSize: "14px",
                                              wordWrap: "break-word",
                                              color: "#222",
                                              fontStyle: "normal",
                                              lineHeight: "normal",
                                              fontWeight: 600,
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleDisplayInvoiceDownload(
                                                true,
                                                item
                                              )
                                            }
                                          >
                                            {item.Name}
                                          </div>
                                          <div
                                            style={{
                                              fontFamily: "Gilroy",
                                              fontSize: "12px",
                                              wordWrap: "break-word",
                                              color: "#222",
                                              fontStyle: "normal",
                                              lineHeight: "normal",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {item.Amount}
                                          </div>
                                        </div>

                                        <div className="d-flex justify-content-between gap-3 mb-2">
                                          <div
                                            style={{
                                              fontFamily: "Gilroy",
                                              fontSize: "12px",
                                              wordWrap: "break-word",
                                              color: "#222",
                                              fontStyle: "normal",
                                              lineHeight: "normal",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {item.Invoices === null ||
                                              item.Invoices === ""
                                              ? "0.00"
                                              : item.Invoices}
                                          </div>
                                          <div
                                            style={{
                                              fontFamily: "Gilroy",
                                              fontSize: "12px",
                                              wordWrap: "break-word",
                                              color: "#222",
                                              fontStyle: "normal",
                                              lineHeight: "normal",
                                              fontWeight: 600,
                                            }}
                                          >
                                            {moment(item.Date).format(
                                              "DD MMM YYYY"
                                            )}
                                          </div>
                                        </div>

                                        <div className="mb-2">
                                          {item.BalanceDue === 0 ? (
                                            <span
                                              style={{
                                                fontSize: "10px",
                                                backgroundColor: "#D9FFD9",
                                                color: "#000",
                                                borderRadius: "14px",
                                                fontFamily: "Gilroy",
                                                padding: "8px 12px",
                                              }}
                                            >
                                              Paid
                                            </span>
                                          ) : (
                                            <span
                                              style={{
                                                cursor: "pointer",
                                                fontSize: "10px",
                                                backgroundColor: "#FFD9D9",
                                                fontFamily: "Gilroy",
                                                color: "#000",
                                                borderRadius: "14px",
                                                padding: "8px 12px",
                                              }}
                                            >
                                              Unpaid
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>

                                  <hr />
                                </>
                              ))}
                          </div>
                        ) : (
                          <>
                            {currentReceiptData &&
                              currentReceiptData.length > 0 && (
                                <div
                                  style={{
                                    // height: "400px",
                                    height:
                                      currentReceiptData.length >= 6
                                        ? "380px"
                                        : "auto",
                                    overflowY:
                                      currentReceiptData.length >= 6
                                        ? "auto"
                                        : "visible",
                                    borderRadius: "24px",
                                    border: "1px solid #DCDCDC",
                                    // borderBottom:"none"
                                    // marginTop:"-15px"
                                  }}
                                >
                                  <Table
                                    responsive="md"
                                    className="Table_Design"
                                    style={{
                                      border: "1px solid #DCDCDC",
                                      borderBottom: "1px solid transparent",
                                      borderEndStartRadius: 0,
                                      borderEndEndRadius: 0,
                                    }}
                                  >
                                    <thead
                                      style={{
                                        backgroundColor: "#E7F1FF",
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 1,
                                      }}
                                    >
                                      <tr>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            // verticalAlign:'middle',
                                            paddingLeft: "20px",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            borderTopLeftRadius: 24,
                                          }}
                                        >
                                          Name
                                        </th>

                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Reference_Id
                                        </th>

                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Invoice Number
                                        </th>

                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Date
                                        </th>

                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Amount
                                        </th>
                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontStyle: "normal",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Payment Mode
                                        </th>

                                        <th
                                          style={{
                                            textAlign: "start",
                                            fontFamily: "Gilroy",
                                            color: "rgb(147, 147, 147)",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            borderTopRightRadius: 24,
                                          }}
                                        ></th>
                                      </tr>
                                    </thead>
                                    <tbody style={{ fontSize: "10px" }}>
                                      {
                                        currentReceiptData &&
                                        currentReceiptData.length > 0 &&
                                        currentReceiptData.map((item) => (
                                          <Receipt
                                            key={item.id}
                                            item={item}
                                            receiptaddPermission={
                                              receiptaddPermission
                                            }
                                            billrolePermission={
                                              billrolePermission
                                            }
                                            OnHandleshowform={handleShowForm}
                                            OnHandleshowInvoicePdf={
                                              handleReceiptDetail
                                            }
                                            onhandleEdit={handleEditReceipt}
                                            DisplayInvoice={
                                              handleDisplayReceiptDownload
                                            }
                                          />
                                        ))
                                      }
                                    </tbody>
                                  </Table>
                                </div>
                              )}

                            {receiptdata.length >= 5 && (
                              <nav
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "end",
                                  padding: "10px",
                                  position: "fixed",
                                  bottom: "10px",
                                  right: "10px",
                                  backgroundColor: "#fff",
                                  borderRadius: "5px",
                                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                  zIndex: 1000,
                                }}
                              >
                                <div>
                                  <select
                                    value={itemsperPage}
                                    onChange={handleItemsPerPageReceipt}
                                    style={{
                                      padding: "5px",
                                      border: "1px solid #1E45E1",
                                      borderRadius: "5px",
                                      color: "#1E45E1",
                                      fontWeight: "bold",
                                      cursor: "pointer",
                                      outline: "none",
                                      boxShadow: "none",
                                    }}
                                  >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                </div>

                                <ul
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    listStyleType: "none",
                                    margin: 0,
                                    padding: 0,
                                  }}
                                >
                                  <li style={{ margin: "0 10px" }}>
                                    <button
                                      style={{
                                        padding: "5px",
                                        textDecoration: "none",
                                        color:
                                          currentreceiptPage === 1
                                            ? "#ccc"
                                            : "#1E45E1",
                                        cursor:
                                          currentreceiptPage === 1
                                            ? "not-allowed"
                                            : "pointer",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                        minWidth: "30px",
                                        textAlign: "center",
                                        backgroundColor: "transparent",
                                        border: "none",
                                      }}
                                      onClick={() =>
                                        handlePageChangeReceipt(
                                          currentreceiptPage - 1
                                        )
                                      }
                                      disabled={currentreceiptPage === 1}
                                    >
                                      <ArrowLeft2
                                        size="16"
                                        color={
                                          currentreceiptPage === 1
                                            ? "#ccc"
                                            : "#1E45E1"
                                        }
                                      />
                                    </button>
                                  </li>

                                  <li
                                    style={{
                                      margin: "0 10px",
                                      fontSize: "14px",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {currentreceiptPage} of {ReceipttotalPages}
                                  </li>

                                  <li style={{ margin: "0 10px" }}>
                                    <button
                                      style={{
                                        padding: "5px",
                                        textDecoration: "none",
                                        color:
                                          currentreceiptPage ===
                                            ReceipttotalPages
                                            ? "#ccc"
                                            : "#1E45E1",
                                        cursor:
                                          currentreceiptPage ===
                                            ReceipttotalPages
                                            ? "not-allowed"
                                            : "pointer",
                                        borderRadius: "50%",
                                        display: "inline-block",
                                        minWidth: "30px",
                                        textAlign: "center",
                                        backgroundColor: "transparent",
                                        border: "none",
                                      }}
                                      onClick={() =>
                                        handlePageChangeReceipt(
                                          currentreceiptPage + 1
                                        )
                                      }
                                      disabled={
                                        currentreceiptPage === ReceipttotalPages
                                      }
                                    >
                                      <ArrowRight2
                                        size="16"
                                        color={
                                          currentreceiptPage ===
                                            ReceipttotalPages
                                            ? "#ccc"
                                            : "#1E45E1"
                                        }
                                      />
                                    </button>
                                  </li>
                                </ul>
                              </nav>
                            )}
                            {!receiptLoader && currentReceiptData &&
                              currentReceiptData?.length === 0 && (
                                <div style={{ marginTop: 20 }}>
                                  <div style={{ textAlign: "center" }}>
                                    {" "}
                                    <img src={Emptystate} alt="emptystate" />
                                  </div>
                                  <div
                                    className="pb-1"
                                    style={{
                                      textAlign: "center",
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",
                                      fontSize: 20,
                                      color: "rgba(75, 75, 75, 1)",
                                    }}
                                  >
                                    No Receipt available{" "}
                                  </div>
                                  <div
                                    className="pb-1"
                                    style={{
                                      textAlign: "center",
                                      fontWeight: 500,
                                      fontFamily: "Gilroy",
                                      fontSize: 16,
                                      color: "rgba(75, 75, 75, 1)",
                                    }}
                                  >
                                    There are no receipt added{" "}
                                  </div>
                                </div>
                              )}
                          </>
                        )}
                      </Col>

                      {DownloadReceipt && (
                        <>
                          {/* <Col lg={1} md={1} sm={12} xs={12} style={{ display: "flex", alignItems: "stretch", justifyContent: "end" }}>
                  <div
                    style={{
                      borderLeft: "1px solid rgba(225, 225, 225, 1)",
                      height: "100%",

                    }}
                  ></div>
                </Col> */}

                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            xs={12}
                            style={{
                              borderLeft: DownloadReceipt
                                ? "1px solid #ccc"
                                : "none",
                            }}
                          >
                            <ReceiptPdfCard
                              show={showPdfReceiptModal}
                              handleClosed={handleClosePdfReceipt}
                              rowData={rowData}
                            />

                            {/* <label className=" m-5" onClick={handleBackClose}>Back</label> */}
                          </Col>
                        </>
                      )}
                    </Row>
                  </Container>
                </>
              )}
            </TabPanel>
          </TabContext>
          </>
      )}

      {showmanualinvoice && (
        <div className="mt-4" style={{ paddingLeft: 25 }}>
          <div
                             className="container justify-content-start  d-flex align-items-start"
                             style={{ 
                               position: "sticky", 
             top: 0,
             left: 0,
             width: "100%",
             zIndex: 1000,
             backgroundColor: "#FFFFFF",
             height: "60px",
             padding: "10px 5px", 
                             }}
                           >
                             <div style={{position:"fixed"}}>
                             <img
                               src={leftarrow}
                               alt="leftarrow"
                               width={20}
                               height={20}
                               onClick={handleBackBill}
                               style={{ cursor: "pointer" }}
                             />
                             <span
                               style={{
                                 fontWeight: 500,
                                 fontSize: "18px",
                                 // marginLeft: 15,
                                 fontFamily: "Gilroy",
                                 paddingLeft:"10px"
                               }}
                             >
                               {billMode}
                             </span>{" "}
                             </div>
                           </div>

          <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
              <Form.Label
                style={{
                  fontFamily: "Gilroy",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#222",
                  fontStyle: "normal",
                  lineHeight: "normal",
                }}
              >
                Customer
              </Form.Label>
              {/* <Form.Select
                aria-label="Default select example"
                value={customername}
                onChange={handleCustomerName}
                disabled={isEditing}
                className="border"
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  lineHeight: "18.83px",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 38,
                  borderRadius: 8,
                }}
              >
                <option value="">Select Customer</option>
                {state.UsersList?.Users &&
                  state.UsersList?.Users?.length > 0 &&
                  state?.UsersList?.Users?.filter(
                    (u) =>
                      u.Bed !== "undefined" &&
                      u.Bed !== "0" &&
                      typeof u.Bed === "string" &&
                      u.Bed.trim() !== "" &&
                      u.Rooms !== "undefined" &&
                      u.Rooms !== "0" &&
                      typeof u.Rooms === "string" &&
                      u.Rooms.trim() !== ""
                  ).map((u) => (
                    <option value={u.ID} key={u.ID}>
                      {u.Name}
                    </option>
                  ))}
              </Form.Select> */}

              <Select
                options={
                  state.UsersList?.Users?.length > 0
                    ? state.UsersList.Users.filter(
                      (u) =>
                        u.Bed !== "undefined" &&
                        u.Bed !== "0" &&
                        typeof u.Bed === "string" &&
                        u.Bed.trim() !== "" &&
                        u.Rooms !== "undefined" &&
                        u.Rooms !== "0" &&
                        typeof u.Rooms === "string" &&
                        u.Rooms.trim() !== ""
                    ).map((u) => ({
                      value: u.ID,
                      label: u.Name,
                    }))
                    : []
                }
                onChange={handleCustomerName}
                value={
                  customername
                    ? {
                      value: customername,
                      label:
                        state.UsersList?.Users?.find((u) => u.ID === customername)?.Name ||
                        "Select Customer",
                    }
                    : null
                }
                isDisabled={isEditing}
                placeholder="Select Customer"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No customers available"}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "38px",
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
                    scrollbarWidth: "thin",
                    overflowY: "auto",
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
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "5px", fontFamily: "Gilroy",
                      fontWeight: 500, }}
                  >
                    {customererrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      />
                    )}{" "}
                    {customererrmsg}
                  </p>
                </div>
              )}
            </Form.Group>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
              <Form.Label
                style={{
                  fontFamily: "Gilroy",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "#222",
                  fontStyle: "normal",
                  lineHeight: "normal",
                }}
              >
                Invoice Number
              </Form.Label>
              <Form.Control
                style={{
                  padding: "10px",
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  lineHeight: "18.83px",
                  fontWeight: 500,
                }}
                type="text"
                placeholder="Enter Invoice Number"
                value={invoicenumber || ""}
                readOnly
              />
              {invoicenumbererrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                      fontWeight: 500, }}
                  >
                    {invoicenumbererrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "2px",
                          
                        }}
                      />
                    )}{" "}
                    {invoicenumbererrmsg}
                  </p>
                </div>
              )}
            </Form.Group>
          </div>
          {invoiceDetails?.action !== "advance" && (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">
      <p className="mt-1 mb-1" style={{
        fontSize: 14,
        color: "#222222",
        fontFamily: "Gilroy",
        fontWeight: 500,
      }}>
        Start Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
      </p>
      {/* <div style={{ position: "relative", width: "100%" }}>
        <DatePicker
          selected={startdate}
          onChange={(date) => handlestartDate(date)}
          dateFormat="dd/MM/yyyy"
          showMonthDropdown
          showYearDropdown
          scrollableYearDropdown
          yearDropdownItemNumber={100}
          popperPlacement="bottom-start"
          popperModifiers={[{ name: "offset", options: { offset: [0, -300] } }]}
          customInput={
            <CustomStartDateInput
              value={startdate ? startdate.toLocaleDateString("en-GB") : ""}
            />
          }
        />
      </div> */}
         <div
                                                  className="datepicker-wrapper"
                                                  style={{ position: "relative", width: "100%" }}
                                                >
                                                  <DatePicker
                                                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="DD/MM/YYYY"
                                                    value={startdate ? dayjs(startdate) : null}
                                                    onChange={(date) => handlestartDate(date)}
                                                    getPopupContainer={(triggerNode) =>
                                                      triggerNode.closest(".datepicker-wrapper")
                                                    }
                                                  />
                                                </div>
      {startdateerrmsg.trim() !== "" && (
        <div>
          <p style={{ fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                        fontWeight: 500, }}>
            <MdError
              style={{
                fontSize: "12px",
                color: "red",
                marginRight: "3px",
                marginBottom: "3px",
                
              }}
            />
            {startdateerrmsg}
          </p>
        </div>
      )}
    </div>

    <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
      <p className="mt-1 mb-1" style={{
        fontSize: 14,
        color: "#222222",
        fontFamily: "Gilroy",
        fontWeight: 500,
      }}>
        End Date <span style={{ color: "red", fontSize: "20px" }}>*</span>
      </p>
     
        
           <div
                                                  className="datepicker-wrapper"
                                                  style={{ position: "relative", width: "100%" }}
                                                >
                                                  <DatePicker
                                                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="DD/MM/YYYY"
                                                    value={enddate ? dayjs(enddate) : null}
                                                    onChange={(date) => handleEndDate(date)}
                                                    getPopupContainer={(triggerNode) =>
                                                      triggerNode.closest(".datepicker-wrapper")
                                                    }
                                                  />
                                                </div>
      
      {enddateerrmsg.trim() !== "" && (
        <div>
          <p style={{ fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                        fontWeight: 500, }}>
            <MdError
              style={{
                fontSize: "12px",
                color: "red",
                marginRight: "3px",
                marginBottom: "3px",
                
              }}
            />
            {enddateerrmsg}
          </p>
        </div>
      )}
    </div>
  </div>
)}




          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">

              <p className="mt-1 mb-1" style={{
                fontSize: 14,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}>Invoice Date{" "} <span style={{ color: "red", fontSize: "20px" }}>*</span></p>
              <div style={{ position: "relative", width: "100%" }}>
                {/* <DatePicker
                  selected={invoicedate}
                  onChange={(date) => handleInvoiceDate(date)}
                  dateFormat="dd/MM/yyyy"
                  showMonthDropdown
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    {
                      name: "offset",
                      options: {
                        offset: [0, -300],
                      },
                    },
                  ]}
                  customInput={<CustomInvoiceDateInput value={invoicedate ? invoicedate.toLocaleDateString("en-GB") : ""} />}
                /> */}
                 <DatePicker
                                                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="DD/MM/YYYY"
                                                    value={invoicedate ? dayjs(invoicedate) : null}
                                                    onChange={(date) => handleInvoiceDate(date)}
                                                    getPopupContainer={(triggerNode) =>
                                                      triggerNode.closest(".datepicker-wrapper")
                                                    }
                                                  />
              </div>

              {invoicedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                      fontWeight: 500, }}
                  >
                    {invoicedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
                         
                        }}
                      />
                    )}{" "}
                    {invoicedateerrmsg}
                  </p>
                </div>
              )}
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <p className="mt-1 mb-1" style={{
                fontSize: 14,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}>Due Date{" "} <span style={{ color: "red", fontSize: "20px" }}>*</span></p>
              <div style={{ position: "relative", width: "100%" }}>
                   <DatePicker
                                                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                                                    format="DD/MM/YYYY"
                                                    placeholder="DD/MM/YYYY"
                                                    value={invoiceduedate ? dayjs(invoiceduedate) : null}
                                                    onChange={(date) => handleDueDate(date)}
                                                    getPopupContainer={(triggerNode) =>
                                                      triggerNode.closest(".datepicker-wrapper")
                                                    }
                                                  />
              </div>


              {invoiceduedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                      fontWeight: 500, }}
                  >
                    {invoiceduedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "12px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
                          
                        }}
                      />
                    )}{" "}
                    {invoiceduedateerrmsg}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Table */}
          {Array.isArray(newRows) && newRows.length > 0 && (
          <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
            <Table className="ebtable mt-2" responsive>
              <thead
                style={{
                  backgroundColor: "#E7F1FF",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <tr>
                  <th className="text-center"
                    style={{
                      color: "rgb(147, 147, 147)",
                      fontSize: 14,
                      fontweight: 500,
                    }}
                  >
                    S.No
                  </th>
                  <th
                    style={{
                      color: "rgb(147, 147, 147)",
                      fontSize: 14,
                      fontweight: 500,
                    }}
                  >
                    Description
                  </th>
                  {/* <th>EB Unit </th>
              <th>Unit Price </th>
              <th>Actual Amount</th> */}
                  <th
                    style={{
                      color: "rgb(147, 147, 147)",
                      fontSize: 14,
                      fontweight: 500,
                    }}
                  >
                    Total Amount
                  </th>
                  <th
                    style={{
                      color: "rgb(147, 147, 147)",
                      fontSize: 14,
                      fontweight: 500,
                    }}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {newRows &&
                  newRows.length > 0 &&
                  newRows.map((u, index) => (
                    <tr key={`new-${index}`}>
                      <td
                        className="text-center"
                        style={{ fontFamily: "Gilroy" }}
                      >
                        {serialNumber++}
                      </td>
                      <td>
                        <div
                          className="col-lg-8 col-md-8 col-sm-4 col-xs-4"
                          style={{ alignItems: "center" }}
                        >
                          <Form.Control
                            type="text"
                            style={{ fontFamily: "Gilroy" }}
                            placeholder="Enter Description"
                            value={u.am_name}
                            onChange={(e) =>
                              handleNewRowChange(
                                index,
                                "am_name",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      </td>

                      <td
                        className="col-lg-3 col-md-3 col-sm-4 col-xs-4"
                        style={{ alignItems: "center" }}
                      >
                        {/* <Form.Control
                          type="text"
                          style={{ fontFamily: "Gilroy" }}
                          placeholder="Enter total amount"
                          value={u.amount}
                          onChange={(e) =>
                            handleNewRowChange(index, "amount", e.target.value)
                          }
                        /> */}
        <Form.Control
  type="text"
  placeholder="Enter Total Amount"
  value={u.amount}
  className={`${u.amount === "" ? "border-danger" : ""}`}
  onChange={(e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      handleNewRowChange(index, "amount", value);
    }
  }}
/>


                      </td>
                      <td style={{ alignItems: "center" }}>
                        <span
                          style={{
                            cursor: "pointer",
                            color: "red",
                            marginLeft: "10px",
                          }}
                          onClick={() => handleDeleteNewRow(index)}
                        >
                          <img
                            src={Closebtn}
                            height={15}
                            width={15}
                            alt="delete"
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          )}
        <div  className="col-lg-7 col-md-6 col-sm-12 col-xs-12 mt-2">
        <Form.Select
  className="border"
  style={{
    fontSize: 16,
    color: "#4B4B4B",
    fontFamily: "Gilroy",
    lineHeight: "18.83px",
    fontWeight: 500,
    boxShadow: "none",
    border: "1px solid #D9D9D9",
    height: 38,
    borderRadius: 8,
    cursor:"pointer"
  }}
  value={dropdownValue}
  onChange={(e) => handleRowTypeSelect(e.target.value)}
>
  <option value="" disabled>Select Item Type</option>
  {!selectedTypes.includes("RoomRent") && <option value="RoomRent">Room Rent</option>}
  {!selectedTypes.includes("EB") && <option value="EB">EB</option>}
  <option value="Other">Other</option>
</Form.Select>


 {tableErrmsg.trim() !== "" && (
              <div>
                <p
                  style={{ fontSize: "12px", color: "red", marginTop: "4px", textAlign: "center", fontFamily: "Gilroy",
                    fontWeight: 500, }}
                >
                  {tableErrmsg !== " " && (
                    <MdError
                      style={{
                        fontSize: "15px",
                        color: "red",
                        marginRight: "3px",
                        marginBottom: "3px",
                        
                      }}
                    />
                  )}{" "}
                  {tableErrmsg}
                </p>
              </div>
            )}
</div>
          {/* <div>
            <p
              style={{
                color: "#1E45E1",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Gilroy",
                width: "fit-content",
              }}
              onClick={handleAddColumn}
            >
              {" "}
              + Add new columns
            </p>
          </div> */}

          <div>
            {allfielderrmsg.trim() !== "" && (
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "10px",
                    fontFamily: "Gilroy",
                    textAlign: "center",
                    fontWeight: 500,
                  }}
                >
                  {allfielderrmsg !== " " && (
                    <MdError
                      style={{
                        fontSize: "15px",
                        color: "red",
                        fontFamily: "Gilroy",
                        marginRight: "5px",
                        marginBottom: "3px",
                      }}
                    />
                  )}{" "}
                  {allfielderrmsg}
                </p>
              </div>
            )}
          </div>
          <div>
            
          </div>

          <div style={{ float: "right", marginRight: "130px" }}>
          {Array.isArray(newRows) && newRows.length > 0 && (
            <h5 style={{ fontFamily: "Gilroy" }}>
              Total Amount ₹{totalAmount}
            </h5>
          )}
            <Button
              onClick={isEditing ? handleEditBill : handleCreateBill}
              className="w-100 mt-3 mb-5"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 500,
                height: 40,
                borderRadius: 8,
                fontSize: 16,
                fontFamily: "Gilroy",
                fontStyle: "normal",
                lineHeight: "normal",
              }}
            >
              {isEditing ? "Save Changes" : "Create Bill"}
            </Button>

            <div className="mb-3"></div>
          </div>
        </div>
      )}

      {showRecurringBillForm && (
        <>
          <RecurringBill hostelId={hostelId} onhandleback={handleBackBill} />
        </>
      )}

      {receiptformShow && (
        <>
          <AddReceiptForm
            onhandleback={handleBackBill}
            editvalue={editvalue}
            receiptedit={receiptedit}
          />
        </>
      )}
    </div>
  );
};
InvoicePage.propTypes = {
  item: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default InvoicePage;

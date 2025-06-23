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
import './Invoices.css';
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
import { CloseCircle, ArrowUp2, ArrowDown2, } from "iconsax-react";
import './BillPdfModal.css';
import AxiosConfig from "../WebService/AxiosConfig";
import Swal from 'sweetalert2';







const InvoicePage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { RangePicker } = DatePicker;
  const [recurLoader, setRecurLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState("");
  const [bankking, setBanking] = useState("");
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

    if (state.login.selectedHostel_Id) {
      setHostelId(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);
  useEffect(() => {
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


  const bankingOptions = Array.isArray(state.bankingDetails?.bankingList?.banks)
    ? state.bankingDetails.bankingList.banks.map((item) => {
      let label = "";
      if (item.type === "bank") label = "bank";
      else if (item.type === "upi") label = "upi";
      else if (item.type === "card") label = "Card";
      else if (item.type === "cash") label = "cash";

      return {
        value: item.id,
        label: `${item.benificiary_name} - ${label}`,
      };
    })
    : [];


  const combinedOptions = [...bankingOptions];



  const handleInvoiceDetail = (item) => {

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


    if (item.user_id) {

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


  const handleStatusFilter = (event) => {
    const selected = event.target.value;
    setStatusfilter(selected);


    if (selected !== "date") {
      setDateRange([null, null]);
    }
  };



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
        const invoiceDate = new Date(user.Date);
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
      const filteredItemsReceipt = originalBillsFilterReceipt.filter((user) => {
        const mode = user.paymentMode?.toLowerCase() || "";

        if (statusFilterReceipt === "Cash") return mode.endsWith("-cash");
        if (statusFilterReceipt === "UPI") return mode.endsWith("-upi");
        if (statusFilterReceipt === "Bank") return mode.endsWith("-bank");
        if (statusFilterReceipt === "Card") return mode.endsWith("-card");

        return false;
      });

      setReceiptData(filteredItemsReceipt);
      setCurrentReceiptPage(1);
    }
  }
}, [statusFilterReceipt]);



 

  const [receiptDateRange, setReceiptDateRange] = useState([]);
  const handleDateRangeChangeReceipt = (dates) => {
    setReceiptDateRange(dates);


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



    setNewRows(newRows);
    const types = [];
    newRows.forEach((row) => {
      if (row.am_name === "Room Rent") types.push("RoomRent");
      if (row.am_name === "EB") types.push("EB");
    });
    setSelectedTypes(types);

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


    setCustomerErrmsg("");
    setInvoicenumberErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");


    if (!customername) {
      setCustomerErrmsg("Customer is Required");
      isValid = false;
    }


    if (!invoicenumber) {
      setInvoicenumberErrmsg("Invoice Number is Required");
      isValid = false;
    }


    if (!invoicedate) {
      setInvoiceDateErrmsg("Invoice Date is Required");
      isValid = false;
    }


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

    let isValiding = true;
    if (
      !customername ||
      !invoicenumber ||
      !invoicedate ||
      !invoiceduedate

    ) {
      setAllFieldErrmsg("Please Fill Out All Required Fields");
      isValiding = false;
    }


    const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    };


    const isChanged = (() => {
      const userChanged = Number(invoiceDetails?.hos_user_id) !== Number(customername);
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
        rowsCountChanged ||
        amenitiesChanged
      );
    })();


    if (!isChanged) {
      setAllFieldErrmsg("No Changes Detected");
      return;
    }


    if (isValid && isValiding && isChanged) {
      const formattedInvoiceDate = formatDate(invoicedate);
      const formattedDueDate = formatDate(invoiceduedate);

      dispatch({
        type: "MANUAL-INVOICE-EDIT",
        payload: {
          user_id: customername,
          date: formattedInvoiceDate,
          due_date: formattedDueDate,
          id: invoiceDetails.id,
          amenity: amenityArray.length > 0 ? amenityArray : [],
        },
      });


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
      setInvoiceDateErrmsg("");
      setInvoiceDueDateErrmsg("");
      setAllFieldErrmsg("");
    }
  };


  const handleShowForm = (props) => {
    setShowform(true);
    setInvoiceValue(props.item);


    if (props.item.id !== undefined) {

      const dateObject = new Date(props.item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(
        lastDayOfMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(lastDayOfMonth.getDate()).padStart(2, "0")}`;




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
        amount: props.item.Amount,
        paidAmount: props.item.PaidAmount,
        balanceDue: props.item.BalanceDue === 0 ? "00" : props.item.BalanceDue,
        dueDate: formattedDueDate,
        InvoiceId: props.item.Invoices,
        invoice_type: props.item.invoice_type,
      });

    } else {
      setSelectedUserId("");
    }
  };

  const handleCloseForm = () => {

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
      setPaymodeErrmsg("Please Select Transaction Type");
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
    maxDate: new Date(),
    minDate: null,
  };




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
    setTotalAmount("");
    setCustomerErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");
    setTableErrmsg("");
    setamenityArray([]);
    setNewRows([]);
    setDropdownValue("")
  };

  const formatDateForPayloadmanualinvoice = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
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

    const formattedDate = formatDateForPayloadmanualinvoice(selectedDate);
    setFormatInvoiceDate(formattedDate);
  };





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
          onClick={onClick} />
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
          onClick={onClick}
        />
      </div>
    );
  });

  CustomInvoiceDueDateInput.displayName = "CustomInvoiceDueDateInput";




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


    if (!customername) {
      setCustomerErrmsg("Please Select Customer");
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

    if (!invoiceduedate) {
      setInvoiceDueDateErrmsg("Please Select Due Date");
      hasError = true;
    } else {
      setInvoiceDueDateErrmsg("");
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


    const formattedStartDate = startdate ? dayjs(startdate).format("YYYY-MM-DD") : "";

    const formattedEndDate = enddate ? dayjs(enddate).format("YYYY-MM-DD") : "";


    dispatch({
      type: "MANUAL-INVOICE-ADD",
      payload: {
        user_id: customername,
        date: formatinvoicedate,
        due_date: formatduedate,

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


    setCustomerName("");
    setInvoiceNumber("");
    setStartDate("");
    setEndDate("");
    setInvoiceDate("");
    setInvoiceDueDate("");
    setTotalAmount("");

    setNewRows([]);
  };



  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

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
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentItems;

    const sorted = [...currentItems].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];


      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfig.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentItems, sortConfig]);
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };


  const [currentRecurePage, setCurrentRecurePage] = useState(1);
  const [itemsPage, setItemsPage] = useState(10);
  const indexOfLastItemRecure = currentRecurePage * itemsPage;
  const indexOfFirstItemRecure = indexOfLastItemRecure - itemsPage;


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
  const [sortConfigRecure, setSortConfigRecure] = useState({ key: null, direction: null });

  const sortedDataRecure = React.useMemo(() => {
    if (!sortConfigRecure.key) return currentItem;

    const sorted = [...currentItem].sort((a, b) => {
      const valueA = a[sortConfigRecure.key];
      const valueB = b[sortConfigRecure.key];


      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfigRecure.direction === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfigRecure.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentItem, sortConfigRecure]);
  const handleSortRecure = (key, direction) => {
    setSortConfigRecure({ key, direction });
  };
  const totalPage = Math.ceil(recurringbills.length / itemsPage);

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


  const [sortConfigReceipt, setSortConfigReceipt] = useState({ key: null, direction: null });

  const sortedDataReceipt = React.useMemo(() => {
    if (!sortConfigReceipt.key) return currentReceiptData;

    const sorted = [...currentReceiptData].sort((a, b) => {
      const valueA = a[sortConfigReceipt.key];
      const valueB = b[sortConfigReceipt.key];


      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfigReceipt.direction === 'asc'
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return sortConfigReceipt.direction === 'asc'
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentReceiptData, sortConfigReceipt]);

  const handleSortReceipt = (key, direction) => {
    setSortConfigReceipt({ key, direction });
  };
  const handleItemsPerPageReceipt = (event) => {
    setItemsPERPage(Number(event.target.value));
    setCurrentReceiptPage(1);
  };
  const ReceipttotalPages = Math.ceil(receiptdata.length / itemsperPage);



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

    dispatch({ type: 'BILL_PDF_DETAILS', payload: { bill_id: rowData.id } })
  };


  const handleDisplayReceiptDownload = (isVisible, rowData) => {
    setDownloadReceipt(isVisible);
    setShowPdfReceiptModal(true);
    setRowData(rowData);
    dispatch({ type: "RECEIPTPDF_NEWCHANGES", id: rowData?.id })
  };
  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }

  }, [state.InvoiceList.statusCodeNewReceiptStatusCode])




  const handleClosePdfReceipt = () => {
    setDownloadReceipt(false);
  };

  const handleClosePdfModal = () => {
    setDownloadInvoice(false);
  };

  useEffect(() => {
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



  useEffect(() => {
    if (
      state.login.UpdateNotificationMessage !== null &&
      state.login.UpdateNotificationMessage !== ""
    ) {

      setTimeout(() => {
        dispatch({ type: "AFTER_UPDATE_NOTIFICATION", message: null });

      }, 100);
    }
  }, [state.login.UpdateNotificationMessage]);



  useEffect(() => {
    if (state.InvoiceList?.statusCodeForPDf === 200) {
      const pdfUrl = state.InvoiceList.invoicePDF;

      if (pdfUrl) {
        setShowLoader(false);


        const pdfWindow = window.open("", "_blank");
        if (pdfWindow) {
          pdfWindow.location.href = pdfUrl;
          dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
        }
      }
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  useEffect(() => {
    const sendWhatsAppMessage = async () => {

      if (state.InvoiceList?.statusCodeForReceiptPDf === 200) {

        const pdfUrl = state.InvoiceList.ReceiptPDF;
        const filename = pdfUrl?.split('/').pop();
        const triggeredBy = state.InvoiceList.triggeredBy;
        const isReceiptMessageEnabled = state.InvoiceList.whatsappSettings?.[2];

        if (pdfUrl) {
          setShowLoader(false);


          if (triggeredBy === "whatsapp") {
            if (isReceiptMessageEnabled === "true") {
              setLoading(true);

              const receiptData =
                state.InvoiceList.newReceiptchanges?.receipt ??
                state.InvoiceList.BillsPdfDetails;

              const userName = receiptData?.user_details?.name || '';
              let userPhone = receiptData?.user_details?.phone?.toString() || '';

              if (!userPhone.startsWith("+91")) {
                if (userPhone.startsWith("91")) {
                  userPhone = "+" + userPhone;
                } else {
                  userPhone = "+91" + userPhone;
                }
              }
              try {
                const response = await AxiosConfig.post("/send-whatsapp", {
                  to: userPhone,
                  templateName: "invoice_notification",
                  parameters: [userName, filename],
                });
                if (response.data.statusCode === 200) {
                  Swal.fire({
                    icon: 'success',
                    text: response.data.message,
                  });
                } else {
                  Swal.fire({
                    icon: 'warning',
                    text: "Unexpected response from server.",
                  });
                }
              } catch (error) {
                Swal.fire({
                  icon: 'error',
                  text: error.response?.data?.error || "Failed to send WhatsApp message",
                });
              } finally {
                setLoading(false);
              }

            } else {
              Swal.fire({
                icon: 'info',
                text: 'WhatsApp notification for Deposit Receipt is not enabled. Please enable it in Settings > Notifications.',
              });
            }
          } else {
            const pdfWindow = window.open("", "_blank");
            if (pdfWindow) {
              pdfWindow.location.href = pdfUrl;
            }
          }

          dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
          dispatch({ type: "CLEAR_TRIGGER_SOURCE" });
        }

      }
    };

    sendWhatsAppMessage();
  }, [state.InvoiceList?.statusCodeForReceiptPDf, state.InvoiceList.triggeredBy, state.InvoiceList.whatsappSettings]);

  useEffect(() => {
    if (selectedUserId) {
      const filteredDetails = state.UsersList?.Users?.find(
        (item) => item.User_Id === selectedUserId
      );
      if (filteredDetails) {

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

      }, 1000);
    }
  }, [state.InvoiceList.manualInvoiceAddStatusCode]);

  useEffect(() => {
    setBills(state.InvoiceList.ManualInvoices);
  }, [state.InvoiceList.ManualInvoices,])







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



  useEffect(() => {

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

    setBills(originalBills);
    setRecurringBills(originalRecuiring);
    setReceiptData(originalReceipt);

  };

  const handleUserSelect = (user) => {
    const searchItem = user.Name
    setFilterInput(user.Name);

    if (searchItem !== "") {
      const filteredItems =
        state.InvoiceList.ManualInvoices &&
        state.InvoiceList.ManualInvoices.filter(
          (user) =>
            user.Name &&
            user.Name.toLowerCase().includes(searchItem.toLowerCase())
        );
      setBills(filteredItems);

    } else {
      setBills(state.InvoiceList.ManualInvoices);
    }
    setCurrentPage(1);
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

  };

  const handleUserRecuire = (user) => {
    setFilterInput(user.user_name);
    const searchItem = user.user_name

    if (searchItem !== "") {
      const filteredItems =
        state.InvoiceList.RecurringBills &&
        state.InvoiceList.RecurringBills.filter(
          (user) =>
            user.user_name &&
            user.user_name.toLowerCase().includes(searchItem.toLowerCase())
        );
      setRecurringBills(filteredItems);

    } else {
      setRecurringBills(state.InvoiceList.RecurringBills);
    }
    setCurrentPage(1);

    setDropdownVisible(false);
  };




  const handleUserReceipt = (user) => {
    setFilterInput(user.Name);


    const searchItem = user.Name

    if (searchItem !== "") {
      const filteredItems =
        state.InvoiceList.ReceiptList &&
        state.InvoiceList.ReceiptList.filter(
          (user) =>
            user.Name &&
            user.Name.toLowerCase().includes(searchItem.toLowerCase())
        );
      setReceiptData(filteredItems);

    } else {
      setReceiptData(state.InvoiceList.ReceiptList);
    }
    setCurrentPage(1);

    setDropdownVisible(false);
  };



  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
  };


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


      handleBackBill()


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


  useEffect(() => {
    if (
      recurringbills.length > 0 &&
      currentItem.length === 0 &&
      currentRecurePage > 1
    ) {
      setCurrentRecurePage(currentRecurePage - 1);
    }
  }, [recurringbills])

  return (
    <div style={{ height: "100vh", overflowY: "auto", }}>
      {showAllBill && (
        <>
          <div
            className="container-fluid sticky-top bg-white "
            style={{ zIndex: 1000, height: 'auto', top: 10, paddingLeft: 8, paddingRight: 6, backgroundColor: "#ffffff" }}
          >
            <div className="d-flex justify-content-between align-items-center flex-wrap mt-2">
              <div className=" ms-3 " style={{
                marginTop: value === "1" || value === "3" ? "11px" : "15px",
              }}>
                <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Bills</label>
              </div>

              <div >
                {showLoader && <LoaderComponent />}
                {loading && <LoaderComponent />}
                <div className="d-flex flex-wrap align-items-center gap-2" style={{ marginTop: "-6px", paddingLeft: 25 }}>
                  {search ? (
                    <>
                      <div className="position-relative" style={{ minWidth: 160, maxWidth: 250, }}>


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
                              fontFamily: "Gilroy",
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
                                border: "1px solid #d9d9d9",
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
                              <ul
                                className="show-scroll p-0"
                                style={{
                                  listStyleType: "none",
                                  maxHeight: 174,
                                  minHeight: bills?.length > 1 ? "100px" : "auto",
                                  overflowY: bills?.length > 3 ? "auto" : "hidden",
                                  margin: 0,
                                }}
                              >
                                {bills
                                  ?.filter(
                                    (item, index, self) =>
                                      index === self.findIndex((t) => t.Name === item.Name)
                                  )
                                  .map((user, index) => (
                                    <li
                                      key={index}
                                      className="d-flex align-items-center me-1"
                                      style={{
                                        padding: "10px 5px",
                                        cursor: "pointer",
                                        fontFamily: "Gilroy",
                                        borderRadius: 8,
                                        borderBottom:
                                          index !== bills?.length - 1
                                            ? "1px solid #eee"
                                            : "none",
                                        backgroundColor:
                                          hoveredIndex === index ? "#1E45E1" : "transparent",
                                        color: hoveredIndex === index ? "white" : "black",
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
                                recurringbills
                                  ?.filter(
                                    (item, index, self) =>
                                      index === self.findIndex((t) => t.user_name === item.user_name)
                                  )
                                  .map((user, index) => (
                                    <li
                                      key={index}
                                      className="d-flex align-items-center me-1"
                                      style={{
                                        cursor: "pointer",
                                        fontFamily: "Gilroy",
                                        borderRadius: 8,
                                        padding: "10px 5px",
                                        borderBottom:
                                          index !== recurringbills.length - 1
                                            ? "1px solid #eee"
                                            : "none",
                                        backgroundColor:
                                          hoveredIndex === index ? "#1E45E1" : "transparent",
                                        color: hoveredIndex === index ? "white" : "black",
                                      }}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleUserRecuire(user);
                                      }}
                                      onMouseEnter={() => setHoveredIndex(index)}
                                      onMouseLeave={() => setHoveredIndex(null)}
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
                                {receiptdata
                                  ?.filter(
                                    (item, index, self) =>
                                      index === self.findIndex((t) => t.Name === item.Name)
                                  )
                                  .map((user, index) => {
                                    const imagedrop = user.profile || Profile;
                                    return (
                                      <li
                                        key={index}
                                        className="d-flex align-items-center me-1 "
                                        style={{
                                          cursor: "pointer",
                                          fontFamily: "Gilroy",
                                          borderRadius: 8,
                                          padding: "10px 5px",
                                          borderBottom:
                                            index !== receiptdata?.length - 1
                                              ? "1px solid #eee"
                                              : "none",
                                          backgroundColor:
                                            hoveredIndex === index ? "#1E45E1" : "transparent",
                                          color: hoveredIndex === index ? "white" : "black",
                                        }}
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleUserReceipt(user);
                                        }}
                                        onMouseEnter={() => setHoveredIndex(index)}
                                        onMouseLeave={() => setHoveredIndex(null)}
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
                        style={{ height: 40, cursor: "pointer" }}
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
                          cursor: "pointer"
                        }}
                      >
                        <option value="All">All</option>
  <option value="Cash">Cash</option>
  <option value="UPI">UPI</option>
  <option value="Bank">Bank</option>
  <option value="Card">Card</option>
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
                        style={{ height: "38px", borderRadius: 8, cursor: "pointer" }}
                        allowClear
                      />
                    </div>
                  )}



                  <div className="text-center" style={{ paddingRight: 18 }} >
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
                top: 70,
                right: 0,
                left: 0,
                zIndex: 1000,
                backgroundColor: search ? undefined : "#FFFFFF",
                height: "auto",
              }}
            >
              <Box
                sx={{ borderBottom: 0, borderColor: "divider" }}

              >
                <TabList

                  orientation={isSmallScreen ? "vertical" : "horizontal"}
                  onChange={handleChanges}
                  aria-label="lab API tabs example"
                  style={{ marginLeft: "14px", }}

                  className="custom-tab-list d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
                >
                  <Tab
                    label="Bills"
                    value="1"
                    style={{
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
                      }}
                    >

                      <img
                        src={Emptystate}
                        alt="Empty State"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />


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
                            fontSize: 12
                          }}
                        >
                          <MdError style={{ fontSize: 14 }} />
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

                            className="m-0 p-0"
                          >



                            <Modal.Header
                              style={{ paddingTop: 10, position: "relative" }}
                            >
                              <div
                                style={{
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

                              <CloseCircle size="24" color="#000" onClick={handleCloseForm}
                                style={{ cursor: 'pointer' }} />
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
                                                fontSize: "14px",
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

                                      <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                        <DatePicker
                                          style={{ width: "100%", height: 48, cursor: "pointer" }}
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
                                              fontSize: "14px",
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
                                      options={combinedOptions}
                                      onChange={(selectedOption) => handleTransaction(selectedOption?.value)}
                                      value={
                                        invoiceList.transaction
                                          ? combinedOptions.find(option => option.value === invoiceList.transaction)
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
                                        option: (base, state) => ({
                                          ...base,
                                          cursor: "pointer",
                                          backgroundColor: state.isFocused ? "lightblue" : "white",
                                          color: "#000",
                                        }),
                                        dropdownIndicator: (base) => ({
                                          ...base,
                                          color: "#555",
                                          cursor: "pointer"
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
                                                fontSize: "14px",
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
                                                fontSize: "14px",
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
                                          fontSize: "14px",
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



                    <Container fluid className="p-0 table-bills mt-2">
                      <Row
                        className={` ${DownloadReceipt
                          ? "m-0 g-2 d-flex justify-content-between"
                          : "m-0 g-0"
                          }`}
                      >
                        <Col
                          lg={DownloadInvoice ? 3 : 12}
                          md={DownloadInvoice ? 3 : 12}
                          sm={DownloadInvoice ? 12 : 12}
                          xs={DownloadInvoice ? 12 : 12}
                        >
                          {DownloadInvoice ? (
                            <div
                              className="show-scroll p-2"
                              style={{ maxHeight: 500, overflowY: "auto" }}
                            >
                              {bills &&
                                bills.map((item) => (
                                  <>

                                    <div
                                      className="mb-3 bg-white shadow-sm rounded"
                                      style={{ padding: "12px 16px" }}
                                    >
                                      <div className="d-flex align-items-start justify-content-between">
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

                                        <div className="flex-grow-1 ms-3">
                                          <div className="d-flex justify-content-between align-items-center mb-1">
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

                                  </>
                                ))}
                            </div>
                          ) : (
                            <>
                              {sortedData && sortedData.length > 0 ? (

                                <div
                                  className=" booking-table-userlist  booking-table   ms-2 me-4"
                                  style={{ paddingBottom: "20px", marginLeft: "-22px" }}
                                >
                                  <div

                                    className='show-scrolls'
                                    style={{

                                      height: sortedData?.length >= 5 || sortedData?.length >= 5 ? "360px" : "auto",
                                      overflow: "auto",
                                      borderTop: "1px solid #E8E8E8",
                                      marginBottom: 20,
                                      marginTop: "20px",
                                      paddingRight: 0,
                                      paddingLeft: 0

                                    }}
                                  >
                                    <Table
                                      responsive="md"

                                      style={{
                                        fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                        top: 0,
                                        zIndex: 1,
                                        borderRadius: 0
                                      }}
                                    >
                                      <thead style={{
                                        fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                        top: 0,
                                        zIndex: 1
                                      }}>
                                        <tr>
                                          <th
                                            style={{
                                              textAlign: "start",
                                              paddingLeft: "20px",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 14,
                                              fontWeight: 500,
                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Name</div>
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
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Invoices", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Invoices", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Invoice Number</div>
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
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("action", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("action", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Type</div>
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
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Date", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Date", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Invoice Date</div>
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
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("DueDate", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("DueDate", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Due Date</div>
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
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Amount", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Amount", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Amount</div>
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
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("BalanceDue", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("BalanceDue", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Due</div>
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
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("status", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("status", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Status</div>
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "center",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 14,
                                              fontWeight: 500,
                                            }}
                                          > Action</th>
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
                                          sortedData.map((item) => (
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


                                    <li
                                      style={{
                                        margin: "0 10px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      {currentPage} of {totalPages}
                                    </li>


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

                            <Col
                              lg={9}
                              md={9}
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


                            </Col>
                          </>
                        )}
                      </Row>
                    </Container>




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

                    }}
                  >

                    <img
                      src={Emptystate}
                      alt="Empty State"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />


                    {recurringPermission && (
                      <div
                        style={{
                          color: "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "1rem",
                          fontSize: 12,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        <MdError style={{ fontSize: 14 }} />
                        <span>{recurringPermission}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {!recurLoader && sortedDataRecure.length === 0 && (
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

                  {sortedDataRecure && sortedDataRecure.length > 0 && (
                    <div
                      className=" booking-table-userlist  booking-table ms-2 me-4 mt-4"
                      style={{ paddingBottom: "20px", marginLeft: "-22px" }}
                    >
                      <div

                        className='show-scrolls '
                        style={{

                          height: sortedDataRecure?.length >= 5 || sortedDataRecure?.length >= 5 ? "350px" : "auto",
                          overflow: "auto",
                          borderTop: "1px solid #E8E8E8",
                          marginBottom: 20,
                          marginTop: "20px",
                          paddingRight: 0,
                          paddingLeft: 0

                        }}
                      >
                        <Table

                          responsive="md"

                          style={{
                            fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                            top: 0,
                            zIndex: 1,
                            borderRadius: 0
                          }}
                        >
                          <thead style={{
                            fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                            top: 0,
                            zIndex: 1
                          }}>
                            <tr>
                              <th
                                style={{
                                  textAlign: "start",

                                  paddingLeft: "20px",
                                  fontFamily: "Gilroy",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: 12,
                                  fontWeight: 500,

                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("user_name", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("user_name", 'desc')} style={{ cursor: "pointer" }} />
                                  </div>
                                  Name</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                  fontFamily: "Gilroy",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: 12,
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap"
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("invoice_date", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("invoice_date", 'desc')} style={{ cursor: "pointer" }} />
                                  </div>
                                  Created</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                  fontFamily: "Gilroy",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: 12,
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap"
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("DueDate", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("DueDate", 'desc')} style={{ cursor: "pointer" }} />
                                  </div>
                                  Due Date</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                  fontFamily: "Gilroy",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: 12,
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                  whiteSpace: "nowrap"
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("next_invoice_date", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("next_invoice_date", 'desc')} style={{ cursor: "pointer" }} />
                                  </div>
                                  Next Invoice Date</div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                  fontFamily: "Gilroy",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: 12,
                                  fontStyle: "normal",
                                  fontWeight: 500,
                                }}
                              >
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                    <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("total_amount", 'asc')} style={{ cursor: "pointer" }} />
                                    <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortRecure("total_amount", 'desc')} style={{ cursor: "pointer" }} />
                                  </div>
                                  Amount</div>
                              </th>

                              <th
                                style={{
                                  textAlign: "center",
                                  fontFamily: "Gilroy",
                                  color: "rgb(147, 147, 147)",
                                  fontSize: 12,
                                  fontWeight: 500,
                                }}
                              > Action</th>
                            </tr>
                          </thead>
                          <tbody style={{ fontSize: "10px" }}>



                            {
                              sortedDataRecure &&
                              sortedDataRecure.length > 0 &&
                              sortedDataRecure.map((item) => (
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

                                />
                              ))
                            }

                          </tbody>
                        </Table>
                      </div>
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
                  )}


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

                    }}
                  >

                    <img
                      src={Emptystate}
                      alt="Empty State"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />


                    {receiptPermission && (
                      <div
                        style={{
                          color: "red",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          marginTop: "1rem",
                          fontSize: 12,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        <MdError style={{ fontSize: 14 }} />
                        <span>{receiptPermission}</span>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>


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

                  <Container fluid className="p-0 table-bills">
                    <Row
                      className={` ${DownloadReceipt
                        ? "m-0 g-2 d-flex justify-content-between"
                        : "m-0 g-0"
                        }`}
                    >
                      <Col
                        lg={DownloadReceipt ? 3 : 12}
                        md={DownloadReceipt ? 3 : 12}
                        sm={DownloadReceipt ? 12 : 12}
                        xs={DownloadReceipt ? 12 : 12}
                      >
                        {DownloadReceipt ? (
                          <div
                            className="show-scroll p-2"
                            style={{ maxHeight: "500px", overflowY: "auto" }}
                          >
                            {receiptdata &&
                              receiptdata.map((item) => (
                                <>
                                  <div
                                    className="mb-3 bg-white shadow-sm rounded"
                                    style={{ padding: "12px 16px" }}
                                  >
                                    <div className="d-flex align-items-start justify-content-between">
                                      <div>
                                        <img
                                          src={
                                            item.user_profile && item.user_profile !== "0"
                                              ? item.user_profile
                                              : User
                                          }
                                          alt="User"
                                          style={{
                                            height: 40,
                                            width: 40,

                                          }}
                                        />
                                      </div>

                                      <div className="flex-grow-1 ms-3">
                                        <div className="d-flex justify-content-between align-items-center mb-1">
                                          <div
                                            className="Invoice_Name"
                                            style={{
                                              fontFamily: "Gilroy",
                                              fontSize: "14px",
                                              fontWeight: 600,
                                              color: "#222",
                                              cursor: "pointer",
                                            }}
                                            onClick={() => handleDisplayInvoiceDownload(true, item)}
                                          >
                                            {item.Name || "Unnamed"}
                                          </div>
                                          <div
                                            style={{
                                              fontFamily: "Gilroy",
                                              fontSize: "14px",
                                              fontWeight: 600,
                                              color: "#222",
                                            }}
                                          >
                                            ₹ {item.amount_received?.toLocaleString("en-IN") || "0"}
                                          </div>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center">
                                          <div
                                            style={{
                                              fontFamily: "Gilroy",
                                              fontSize: "12px",
                                              fontWeight: 500,
                                              color: "#555",
                                            }}
                                          >
                                            {moment(item.payment_date).format("DD MMM YYYY")}
                                          </div>
                                          <span
                                            style={{
                                              fontSize: "10px",
                                              backgroundColor: "#D9FFD9",
                                              color: "#000",
                                              borderRadius: "14px",
                                              fontFamily: "Gilroy",
                                              padding: "4px 10px",
                                              height: "24px",
                                              lineHeight: "16px",
                                              display: "inline-flex",
                                              alignItems: "center",
                                            }}
                                          >
                                            Paid
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>



                                </>
                              ))}
                          </div>
                        ) : (
                          <>
                            {sortedDataReceipt &&
                              sortedDataReceipt.length > 0 && (
                                <div
                                  className=" booking-table-userlist  booking-table ms-2 me-4"
                                  style={{ paddingBottom: "20px", marginLeft: "-22px" }}
                                >
                                  <div

                                    className='show-scrolls'
                                    style={{

                                      height: sortedDataReceipt?.length >= 5 || sortedDataReceipt?.length >= 5 ? "330px" : "auto",
                                      overflow: "auto",
                                      borderTop: "1px solid #E8E8E8",
                                      marginBottom: 20,
                                      marginTop: "20px",
                                      paddingRight: 0,
                                      paddingLeft: 0

                                    }}
                                  >
                                    <Table
                                      responsive="md"

                                      style={{
                                        fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                        top: 0,
                                        zIndex: 1,
                                        borderRadius: 0
                                      }}
                                    >
                                      <thead style={{
                                        fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                        top: 0,
                                        zIndex: 1
                                      }}>
                                        <tr>
                                          <th
                                            style={{
                                              textAlign: "start",

                                              paddingLeft: "20px",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontWeight: 500,

                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("Name", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("Name", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Name</div>
                                          </th>

                                          <th
                                            style={{
                                              textAlign: "start",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              whiteSpace: "nowrap"
                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("reference_id", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("reference_id", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Reference_Id</div>
                                          </th>

                                          <th
                                            style={{
                                              textAlign: "start",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              whiteSpace: "nowrap"
                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("invoice_number", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("invoice_number", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Invoice Number</div>
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "start",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              whiteSpace: "nowrap"
                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("type", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("type", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Type</div>
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "start",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              whiteSpace: "nowrap"
                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("payment_date", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("payment_date", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Payment Date</div>
                                          </th>

                                          <th
                                            style={{
                                              textAlign: "start",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("amount_received", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("amount_received", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Amount</div>
                                          </th>
                                          <th
                                            style={{
                                              textAlign: "start",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontStyle: "normal",
                                              fontWeight: 500,
                                              whiteSpace: "nowrap"
                                            }}
                                          >
                                            <div className='d-flex gap-1 align-items-center justify-content-start'>
                                              <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("payment_mode", 'asc')} style={{ cursor: "pointer" }} />
                                                <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSortReceipt("payment_mode", 'desc')} style={{ cursor: "pointer" }} />
                                              </div>
                                              Payment Mode</div>
                                          </th>

                                          <th
                                            style={{
                                              textAlign: "center",
                                              fontFamily: "Gilroy",
                                              color: "rgb(147, 147, 147)",
                                              fontSize: 12,
                                              fontWeight: 500,

                                            }}
                                          >Action</th>
                                        </tr>
                                      </thead>
                                      <tbody style={{
                                        fontSize: "10px", minHeight: "200px",
                                        position: "relative",
                                      }}>
                                        {
                                          sortedDataReceipt &&
                                          sortedDataReceipt.length > 0 &&
                                          sortedDataReceipt.map((item) => (
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

                                              DisplayInvoice={handleDisplayReceiptDownload}
                                            />
                                          ))
                                        }
                                      </tbody>
                                    </Table>
                                  </div>
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


                          <Col
                            lg={9}
                            md={9}
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
            <div style={{ position: "fixed" }}>
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
                  fontFamily: "Gilroy",
                  paddingLeft: "10px"
                }}
              >
                {billMode}
              </span>{" "}
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12">
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
                Customer<span style={{ color: "red", fontSize: "20px" }}>*</span>
              </Form.Label>


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
                    fontFamily: "Gilroy"
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
                    style={{
                      fontSize: "12px", color: "red", marginTop: "5px", fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {customererrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "14px",
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
                    style={{
                      fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {invoicenumbererrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "14px",
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

          <div style={{ display: "flex", flexDirection: "row", height: "100px" }}>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">

              <p className="mt-1 mb-1" style={{
                fontSize: 14,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}>Invoice Date{" "} <span style={{ color: "red", fontSize: "20px" }}>*</span></p>
              <div style={{ position: "relative", width: "100%" }}>

                <DatePicker
                  style={{ width: "100%", height: 48, cursor: "pointer" }}
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
                    style={{
                      fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {invoicedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "14px",
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
                  style={{ width: "100%", height: 48, cursor: "pointer" }}
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
                    style={{
                      fontSize: "12px", color: "red", marginTop: "3px", fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {invoiceduedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "14px",
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


         {Array.isArray(newRows) && newRows.length > 0 && (
 <div style={{ width: "80%", borderRadius: "10px", border: "1px solid #DCDCDC" }}>

  <Table responsive className="m-0" style={{ tableLayout: "fixed" }}>
    <thead style={{ backgroundColor: "#E7F1FF" }}>
      <tr>
        <th className="text-center" style={{ width: "10%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy",borderTopLeftRadius:10 }}>
          S.No
        </th>
        <th style={{ width: "45%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy",whiteSpace:"nowrap" }}>
          Description
        </th>
        <th style={{ width: "30%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy",whiteSpace:"nowrap" }}>
          Total Amount
        </th>
        <th style={{ width: "15%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy",borderTopRightRadius:10 }}>
          Action
        </th>
      </tr>
    </thead>
  </Table>

  
  <div style={{ maxHeight: "150px", overflowY: "auto" }}>
    <Table responsive className="m-0" style={{ tableLayout: "fixed" }}>
      <tbody>
        {newRows.map((u, index) => (
          <tr key={index}>
            <td style={{ width: "10%" }} className="text-center">{index + 1}</td>
            <td style={{ width: "40%" }}>
              <Form.Control
                type="text"
                value={u.am_name}
                onChange={(e) => handleNewRowChange(index, "am_name", e.target.value)}
                placeholder="Enter Description"
              />
            </td>
            <td style={{ width: "30%" }}>
              <Form.Control
                type="text"
                value={u.amount}
                placeholder="0"
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    handleNewRowChange(index, "amount", value);
                  }
                }}
              />
            </td>
            <td style={{ width: "15%",paddingLeft:20 }}>
              <img
                src={Closebtn}
                onClick={() => handleDeleteNewRow(index)}
                style={{ cursor: "pointer" }}
                height={15}
                width={15}
                alt="delete"
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
</div>






          )}

          <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 mt-3">
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
                cursor: "pointer"
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
                  style={{
                    fontSize: "12px", color: "red", marginTop: "4px", textAlign: "left", fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {tableErrmsg !== " " && (
                    <MdError
                      style={{
                        fontSize: "14px",
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
                        fontSize: "14px",
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
              className="w-100 mt-3 mb-2"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 500,
                height: 40,
                borderRadius: 8,
                fontSize: 16,
                fontFamily: "Gilroy",
                fontStyle: "normal",
                lineHeight: "normal",
                marginTop: "20px"
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
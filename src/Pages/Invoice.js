import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { InputGroup, FormControl, Pagination } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import Image from "react-bootstrap/Image";
import { Table } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from "../Assets/Images/list-report.png";
import Edit from "../Assets/Images/edit.png";
import { Offcanvas, Form, Dropdown } from "react-bootstrap";
import Plus from "../Assets/Images/Create-button.png";
import Calendor from "../Assets/Images/calendar.png";
// import Profile from '../Assets/Images/Profile.jpg';
import Dots from "../Assets/Images/more.png";
import User from "../Assets/Images/New_images/profile-picture.png";

import NotificationIcon from "../Assets/Images/Notification.png";
import rectangle from "../Assets/Images/Admin_Profile.png";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import InvoiceDetail from "./InvoiceDetails";
import MessageModal from "./MessageModal";
import LoaderComponent from "./LoaderComponent";
import Sort from "../Assets/Images/sort.png";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import CryptoJS from "crypto-js";
import "../Pages/Invoices.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  fontSize,
  fontStyle,
  fontWeight,
  height,
  lineHeight,
  padding,
} from "@mui/system";
import InvoiceTable from "./InvoicelistTable";
import leftArrow from "../Assets/Images/New_images/left-arrow.png";
import rightarrow from "../Assets/Images/New_images/right-arrow.png";
import Notify from "../Assets/Images/New_images/notify.png";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import squre from "../Assets/Images/New_images/minus-square.png";
import Calendars from "../Assets/Images/New_images/calendar.png";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import BillPdfModal from "../Pages/BillPdfModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Closebtn from "../Assets/Images/CloseCircle.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import RecurringBill from "../Pages/RecurringBills";
import RecurringBillList from "../Pages/RecurringBillList";

import closecircle from "../Assets/Images/New_images/close-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import Filters from "../Assets/Images/Filters.svg";

import Receipt from "./Receipt";
import AddReceiptForm from "./AddReceipt";
import ReceiptPdfCard from "./ReceiptPdfModal";

const InvoicePage = () => {
  const state = useSelector((state) => state);
  console.log("state", state);
  const [editOption, setEditOption] = useState("");
  const dispatch = useDispatch();

  const [recurLoader, setRecurLoader] = useState(false);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [invoiceDetail, setInvoiceDetailss] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState("");
  const [file, setFile] = useState(null);
  const [bankking, setBanking] = useState("");
  const d = new Date();
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

  const [invoicePage, setInvoicePage] = useState("");
  const [showLoader, setShowLoader] = useState(false);
  const [selectedItems, setSelectedItems] = useState("");
  const [showDots, setShowDots] = useState("");
  const [notification, setNotification] = useState([]);
  const LoginId = localStorage.getItem("loginId");
  const [loginID, setLoginID] = useState("");
  const [filtericon, setFiltericon] = useState(false);
  const [statusfilter, setStatusfilter] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [searchicon, setSearchicon] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);
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
  const [formatstartdate, setFormatStartDate] = useState(null);
  const [formatenddate, setFormatEndDate] = useState(null);
  const [formatinvoicedate, setFormatInvoiceDate] = useState(null);
  const [formatduedate, setFormatDueDate] = useState(null);
  const [invoicetotalamounts, setInvoiceTotalAmount] = useState([]);
  const [billamounts, setBillAmounts] = useState([]);
  const [ebamount, setEBAmount] = useState("");
  const [rentamount, setRentAmount] = useState("");
  const [amenityDetail, setAmenityDetails] = useState([]);
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [bills, setBills] = useState([]);
  const [newRows, setNewRows] = useState([
    { "S.NO": 1, am_name: "", amount: "0" },
  ]);
  const [customererrmsg, setCustomerErrmsg] = useState("");
  const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
  const [startdateerrmsg, setStartdateErrmsg] = useState("");
  const [enddateerrmsg, setEnddateErrmsg] = useState("");
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
  const [allfielderrmsg, setAllFieldErrmsg] = useState("");
  const [dataFetched, setDataFetched] = useState(false);
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

  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [totalPaidAmount, setTotalPaidAmount] = useState("");
  const [paiddate, setPaidDate] = useState(null);
  const [paiddateerrormsg, setPaidDateErrmsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showform, setShowform] = useState(false);
  const [invoicefilterdata, setinvoiceFilterddata] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [availableOptions, setAvailableOptions] = useState(invoicetotalamounts);
  const [tableErrmsg, setTableErrmsg] = useState("");
  const [value, setValue] = React.useState("1");
  const [DownloadInvoice, setDownloadInvoice] = useState(false);
  const [DownloadReceipt, setDownloadReceipt] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [showPdfReceiptModal, setShowPdfReceiptModal] = useState(false);
  const [rowData, setRowData] = useState("");
  const [showeditform, setShowEditform] = useState(false);
  const [showdeleteform, setShowDeleteform] = useState(false);
  const [billMode, setBillMode] = useState("New Bill");
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  let serialNumber = 1;

  const [hostelId, setHostelId] = useState("");
  const [receiptdata, setReceiptData] = useState([]);
  const [receiptLoader, setReceiptLoader] = useState(false);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setHostelId(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "MANUALINVOICESLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  const handleManualShow = () => {
    setShowAllBill(false);
    setShowManualInvoice(true);
    setBillMode("New Bill");
    setIsEditing(false);
    setInvoiceDetails(null);
  };

  const handleRecurrBillShow = () => {
    setShowAllBill(false);
    setShowRecurringBillForm(true);
  };

  const handleReceiptShow = () => {
    setShowAllBill(false);
    setReceiptFormShow(true);
    dispatch({ type: "GET_REFERENCE_ID" });
  };

  const handleAccount = (e) => {
    setAccount(e.target.value);
    setAccountError("");
    // setIsChangedError("");
  };

  const handleTransaction = (e) => {
    setInvoiceList({ ...invoiceList, transaction: e.target.value });
    setAccountError("");
    setPaymodeErrmsg("");
    setAccount("");
  };

  const handleShowDots = () => {
    setShowDots(!showDots);
  };

  const handleInvoiceDetail = (item) => {
    setSelectedItems(item);

    if (item.User_Id) {
      const originalDate = new Date(item.Date);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      const newDate = `${year}-${month}-${day}`;

      if (
        (item.EbAmount == 0 || item.EbAmount == undefined) &&
        item.invoice_type == 1 &&
        item.AmnitiesAmount == 0
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
      const originalDate = new Date(item.Date);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
      const day = originalDate.getDate().toString().padStart(2, "0");
      const newDate = `${year}-${month}-${day}`;

      dispatch({
        type: "RECEIPTPDF",
        payload: {
          id: item.id,
        },
      });

      setShowLoader(true);
    }
  };

  let newNotificationIDs =
    state.login.Notification &&
    state.login.Notification?.length > 0 &&
    state.login.Notification.filter(
      (notification) => notification.status === 1
    ).map((notification) => notification.id);

  const newNotificationsCount = newNotificationIDs.length;

  const handleClosepopup = () => setShow(false);

  const handleShowpopup = () => {
    setShow(true);
    if (newNotificationIDs.length > 0 && newNotificationIDs != []) {
      setTimeout(() => {
        dispatch({
          type: "UPDATE-NOTIFICATION",
          payload: { id: newNotificationIDs },
        });
      }, 1000);
    }
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);

    const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
    const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;

    if (searchTerm !== "") {
      const filteredItems = state.InvoiceList.Invoice.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBills(
        filteredItems.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice)
      );
    } else {
      setBills(
        state.InvoiceList.Invoice.slice(
          indexOfFirstRowinvoice,
          indexOfLastRowinvoice
        )
      );
    }
  };

  const handleiconshow = () => {
    setSearchicon(!searchicon);
    setFiltericon(false);
  };

  const handleInvoiceback = (isVisible) => {
    setInvoiceDetailss(isVisible);
  };

  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];
    if (fileimgage) {
      setFile(fileimgage);
    }
  };

  const handlePhoneNo = (e) => {
    const result = e.target.value.replace(/\D/g, "");
    const phoneError = document.getElementById("phoneError");
    setInvoiceList({ ...invoiceList, phone: result });
    if (result.length < 10) {
      phoneError.textContent = "Please put 10 digit mobile number";
    } else {
      phoneError.textContent = "";
    }
  };

  const handleEmailID = (e) => {
    const emailID = e.target.value;
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailID)) {
      setInvoiceList({ ...invoiceList, email: emailID });
      emailError.textContent = "Invalid email format";
    } else {
      setInvoiceList({ ...invoiceList, email: emailID });
      emailError.textContent = "";
    }
  };

  const handleClose = () => {
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
      paymentType: "",
    });
    setShowMenu(false);
    setUserClicked(false);
    setShowForm(false);
  };

  const handleShow = (item) => {
    setInvoiceValue(item);
    if (item.id !== undefined) {
      setEditOption("Edit");
      const dateObject = new Date(item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(
        lastDayOfMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(lastDayOfMonth.getDate()).padStart(2, "0")}`;

      // const EditCheck = state.InvoiceList.Invoice.find(view => view.User_Id === item.User_Id && view.BalanceDue === 0 && view.Date.includes(`${year}-${month}`));
      const EditCheck = state.InvoiceList.Invoice.find((view) => {
        const viewDate = new Date(view.Date);
        return (
          view.User_Id === item.User_Id &&
          view.BalanceDue === 0 &&
          viewDate.getFullYear() === year &&
          viewDate.getMonth() === month - 1
        );
      });

      setShowMenu(true);
      setShowForm(true);
      let value = item.Name.split(" ");
      setSelectedUserId(item.User_Id);
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      setInvoiceList({
        id: item.id,
        firstName: value[0],
        lastName: value[1],
        phone: item.phoneNo,
        email: item.EmailID,
        hostel_Name: item.Hostel_Name,
        hostel_Id: item.Hostel_Id,
        FloorNo: item.Floor_Id,
        RoomNo: item.Room_No,
        date: formattedDate,
        // total_amount: Number(item.Amount)+Number(item.AmnitiesAmount)+Number(item.EbAmount),
        amount: item.Amount,
        paidAmount: item.PaidAmount,
        balanceDue: item.BalanceDue == 0 ? "00" : item.BalanceDue,
        dueDate: formattedDueDate,
        InvoiceId: item.Invoices,
        invoice_type: item.invoice_type,
      });
      // }
    } else {
      setEditOption("Add");
      setSelectedUserId("");
      setShowForm(true);
      setUserClicked(true);
      setShowMenu(true);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  const handlePageSelect = (eventKey) => {
    const selectedPage = parseInt(eventKey, 10);
    setCurrentPage(selectedPage);
  };

  const invoicerowsPerPage = 15;

  const handleHostelId = (e) => {
    const hostelName = state.UsersList?.hostelList.filter((item) => {
      return item.id == e.target.value;
    });
    const hosName = hostelName[0].Name;
    setInvoiceList({
      ...invoiceList,
      hostel_Name: hosName,
      hostel_Id: e.target.value,
      RoomNo: "",
      FloorNo: "",
    });
  };

  const handleFloor = (e) => {
    setInvoiceList({ ...invoiceList, FloorNo: e.target.value });
  };

  const handleFiltershow = () => {
    setFiltericon(!filtericon);
    setSearchicon(false);
  };

  const [originalBillsFilter, setOriginalBillsFilter] = useState([]);
  const [originalBillsFilterReceipt, setOriginalBillsFilterReceipt] = useState(
    []
  ); // Store original data

  useEffect(() => {
    if (originalBillsFilter.length === 0 && bills.length > 0) {
      setOriginalBillsFilter(bills);
    }
  }, [bills]);

  const handleStatusFilter = (event) => {
    const searchTerm = event.target.value;
    setStatusfilter(searchTerm);

    console.log("Selected Filter:", searchTerm);
    console.log("Original Bills:", originalBillsFilter);

    if (searchTerm === "All") {
      setBills(originalBillsFilter);
    } else {
      const filteredItems = originalBillsFilter.filter(
        (user) =>
          user.status?.trim().toLowerCase() === searchTerm.trim().toLowerCase()
      );

      console.log("Filtered Bills:", filteredItems);
      setBills(filteredItems);
    }

    // 🔥 Reset to first page after filtering
    setCurrentPage(1);
  };

  const [statusFilterReceipt, setStatusFilterReceipt] = useState("");

  const handleStatusFilterReceipt = (event) => {
    const searchTerm = event.target.value;
    setStatusFilterReceipt(searchTerm);
    if (searchTerm === "All") {
      setReceiptData(originalBillsFilterReceipt);
    } else {
      const filteredItemsReceipt = originalBillsFilterReceipt?.filter((user) =>
        user.payment_mode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setReceiptData(filteredItemsReceipt);
    }
  };
  useEffect(() => {
    if (originalBillsFilterReceipt.length === 0 && receiptdata.length > 0) {
      setOriginalBillsFilterReceipt(receiptdata);
    }
  }, [receiptdata]);
  const randomNumberInRange = (hostelName, min, max) => {
    const prefix = hostelName.slice(0, 4);
    const invoice =
      prefix + (Math.floor(Math.random() * (max - min + 1)) + min);
    return invoice;
  };

  const handleRooms = (e) => {
    setInvoiceList({ ...invoiceList, RoomNo: e.target.value });
  };

  const handleUserIdChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split("T")[0];
  };

  const handledatepaidDate = (dates) => {
    const date = dates;
    if (!dates) {
      setPaidDateErrmsg("Please Select Date");
    } else {
      setPaidDateErrmsg("");
    }

    const formatpaiddate = formatDateForPayload(date);
    setPaidDate(formatpaiddate);
  };

  const customDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };

  const handleAmount = (e) => {
    if (!e.target.value) {
      setAmountErrmsg("Please Enter Amount");
    } else {
      setAmountErrmsg("");
    }
    const AmountValue =
      e.target.value.trim() !== "" ? parseFloat(e.target.value) : "";
    const selectedDate = new Date(invoiceList.date);
    const selectedMonth = selectedDate.getMonth();
    const roomRent = filteredUserDetails[0]?.RoomRent;

    const AlreadyPaidRoomRent = state.InvoiceList?.Invoice.filter((item) => {
      const itemDate = new Date(item.Date);
      const itemMonth = itemDate.getMonth();
      return itemMonth === selectedMonth && item.User_Id === selectedUserId;
    });

    let totalPaidAmount = 0;
    AlreadyPaidRoomRent.forEach((item) => {
      const paidAmount = parseFloat(item.Amount) || 0;
      totalPaidAmount += paidAmount;
    });

    setTotalPaidAmount(totalPaidAmount);

    if (
      !isNaN(AmountValue) &&
      !isNaN(invoiceList.amount) &&
      !isNaN(invoiceList.paidAmount) &&
      !isNaN(invoiceList.balanceDue)
    ) {
      var total_amount = invoiceList.amount;
      var paid_amount = invoiceList.paidAmount;
      var payablAmount = AmountValue;
      var balance_due = invoiceList.balanceDue;

      var cal1 = paid_amount + payablAmount;

      var new_balance_due = total_amount - cal1;
      if (total_amount < cal1) {
        console.log("This is Not crt value");
      } else {
        setInvoiceList((prevState) => ({
          ...prevState,
          payableAmount: payablAmount,
          balanceDue: new_balance_due,
        }));
      }
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [editvalue, setEditvalue] = useState("");
  const [receiptedit, setReceiptEdit] = useState(false);
  const [invoiceDetails, setInvoiceDetails] = useState(false);
  const [originalInvoiceDetails, setOriginalInvoiceDetails] = useState(null);

  const handleEditReceipt = (item) => {
    setShowAllBill(false);
    setReceiptFormShow(true);
    setEditvalue(item);
    setReceiptEdit(true);
  };

  const handleEdit = (props) => {
    console.log("propsbill", props);

    setShowManualInvoice(true);
    setShowAllBill(false);
    setBillMode("Edit Bill");
    setIsEditing(true);
    setInvoiceDetails(null);
    setTimeout(() => {
      setInvoiceDetails(props);
    }, 0);
    if (props) {
      setOriginalInvoiceDetails(JSON.parse(JSON.stringify(props)));
    }
  };

  console.log("editdata", invoiceDetails);

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
        "S.NO": newRows.length + 1,
        am_name: "Room Rent",
        amount: invoiceDetails.RoomRent,
      });
    }

    if (invoiceDetails?.advance_amount && !doesAmenityExist("Advance Amount")) {
      newRows.push({
        "S.NO": newRows.length + 1,
        am_name: "Advance Amount",
        amount: invoiceDetails.advance_amount,
      });
    }

    if (invoiceDetails?.EbAmount && !doesAmenityExist("EB Amount")) {
      newRows.push({
        "S.NO": newRows.length + 1,
        am_name: "EB Amount",
        amount: invoiceDetails.EbAmount,
      });
    }

    if (invoiceDetails?.amenity && invoiceDetails.amenity.length > 0) {
      newRows = [
        ...newRows,
        ...invoiceDetails.amenity.map((item, index) => ({
          "S.NO": newRows.length + index + 1,
          am_name: item.am_name,
          amount: item.amount,
        })),
      ];
    }

    if (newRows.length === 0) {
      newRows = [{ "S.NO": 1, am_name: "Room Rent", amount: 0 }];
    }

    setNewRows(newRows);
    // }
  }, [invoiceDetails]);

  console.log("newRows", newRows);

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

    // Reset error messages
    setCustomerErrmsg("");
    setInvoicenumberErrmsg("");
    setStartdateErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");

    // Validate Customer
    if (!customername) {
      setCustomerErrmsg("Customer is required.");
      isValid = false;
    }

    // Validate Invoice Number
    if (!invoicenumber) {
      setInvoicenumberErrmsg("Invoice number is required.");
      isValid = false;
    }

    // Validate Start Date
    if (!startdate) {
      setStartdateErrmsg("Start date is required.");
      isValid = false;
    }
    if (!enddate) {
      setEnddateErrmsg("End date is required.");
      isValid = false;
    }

    // Validate Invoice Date
    if (!invoicedate) {
      setInvoiceDateErrmsg("Invoice date is required.");
      isValid = false;
    }

    // Validate Due Date
    if (!invoiceduedate) {
      setInvoiceDueDateErrmsg("Due date is required.");
      isValid = false;
    }

    // Check All Required Fields
    if (
      !customername ||
      !invoicenumber ||
      !startdate ||
      !invoicedate ||
      !invoiceduedate ||
      !enddate
    ) {
      setAllFieldErrmsg("Please fill out all required fields.");
      isValid = false;
    }

    const formatDateToStartdate = (startdate) => {
      if (!startdate) return "";
      const d = new Date(startdate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const formatDateTowenddate = (enddate) => {
      if (!enddate) return "";
      const d = new Date(enddate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const formatDateToInvoicedate = (invoicedate) => {
      if (!invoicedate) return "";
      const d = new Date(invoicedate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const formatDateToSInvoiceDuedate = (invoiceduedate) => {
      if (!invoiceduedate) return "";
      const d = new Date(invoiceduedate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const isChanged = (() => {
      const userChanged = Number(invoiceDetails?.hos_user_id) !== Number(customername);
      const startDateChanged = formatDateToStartdate(invoiceDetails?.start_date) !== formatDateToStartdate(startdate);
      const invoiceChanged = String(invoiceDetails?.Invoices) !== String(invoicenumber);
      const endDateChanged = formatDateTowenddate(invoiceDetails?.end_date) !== formatDateTowenddate(enddate);
      const invoiceDateChanged = formatDateToInvoicedate(invoiceDetails?.Date) !== formatDateToInvoicedate(invoicedate);
      const dueDateChanged = formatDateToSInvoiceDuedate(invoiceDetails?.DueDate) !== formatDateToSInvoiceDuedate(invoiceduedate);
    
      // **New Condition: Check if rows are added or removed**
      const rowsCountChanged = newRows.length !== invoiceDetails?.amenity?.length;
    
      // Check if any row content is changed
      const amenitiesChanged = newRows.some((row, index) => {
        const originalRow = invoiceDetails?.amenity?.[index] || {};
        return row.am_name !== originalRow.am_name || row.amount !== originalRow.amount;
      });
    
      return (
        userChanged ||
        startDateChanged ||
        invoiceChanged ||
        endDateChanged ||
        invoiceDateChanged ||
        dueDateChanged ||
        rowsCountChanged ||  // **Now detects added/deleted rows**
        amenitiesChanged
      );
    })();
    
    // const isDataChanged =
    // customername !== String(invoiceDetails?.hos_user_id) ||
    // invoicenumber !== invoiceDetails?.Invoices ||
    // startdate?.toISOString().split("T")[0] !== new Date(invoiceDetails?.start_date)?.toISOString().split("T")[0] ||
    // enddate?.toISOString().split("T")[0] !== new Date(invoiceDetails?.end_date)?.toISOString().split("T")[0] ||
    // invoicedate?.toISOString().split("T")[0] !== new Date(invoiceDetails?.Date)?.toISOString().split("T")[0] ||
    // invoiceduedate?.toISOString().split("T")[0] !== new Date(invoiceDetails?.DueDate)?.toISOString().split("T")[0] ||
    // newRows.some((row, index) => {
    //   const originalRow = invoiceDetails?.amenity?.[index];
    //   return row.am_name !== originalRow?.am_name || row.amount !== originalRow?.amount;
    // });

    if (!isChanged) {
      setAllFieldErrmsg("No changes detected.");
      isValid = false;
      return;
    }

    if (isValid && isChanged) {
      const dueDateObject = new Date(invoiceduedate);
      const formatduedate = `${dueDateObject.getFullYear()}-${String(
        dueDateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(dueDateObject.getDate()).padStart(2, "0")}`;

      const dateObject = new Date(invoicedate);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      const startDateObject = new Date(startdate);
      const formattedStartDate = `${startDateObject.getFullYear()}-${String(
        startDateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(startDateObject.getDate()).padStart(
        2,
        "0"
      )}`;

      const endDateObject = new Date(enddate);
      const formattedEndDate = `${endDateObject.getFullYear()}-${String(
        endDateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(endDateObject.getDate()).padStart(2, "0")}`;

      dispatch({
        type: "MANUAL-INVOICE-EDIT",
        payload: {
          user_id: customername,
          date: formattedDate,
          due_date: formatduedate,
          id: invoiceDetails.id,
          amenity: amenityArray.length > 0 ? amenityArray : [],
          start_date: formattedStartDate,
          end_date: formattedEndDate,
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
      setBillAmounts([]);
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
      setEditOption("Edit");
      const dateObject = new Date(props.item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(
        lastDayOfMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(lastDayOfMonth.getDate()).padStart(2, "0")}`;

      // const EditCheck = state.InvoiceList.Invoice.find(view => view.User_Id === item.User_Id && view.BalanceDue === 0 && view.Date.includes(`${year}-${month}`));
      const EditCheck = state.InvoiceList.Invoice.find((view) => {
        const viewDate = new Date(view.Date);
        return (
          view.User_Id === props.item.User_Id &&
          view.BalanceDue === 0 &&
          viewDate.getFullYear() === year &&
          viewDate.getMonth() === month - 1
        );
      });

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
        balanceDue: props.item.BalanceDue == 0 ? "00" : props.item.BalanceDue,
        dueDate: formattedDueDate,
        InvoiceId: props.item.Invoices,
        invoice_type: props.item.invoice_type,
      });
      // }
    } else {
      setEditOption("Add");
      setSelectedUserId("");
      // setShowForm(true);
      setUserClicked(true);
      // setShowMenu(true);
    }
  };
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

  const handleCloseEditForm = () => {
    setShowEditform(false);
  };

  const handleCloseDeleteform = () => {
    setShowDeleteform(false);
  };

  const handleSaveInvoiceList = () => {
    const formatpaiddate = formatDateForPayload(selectedDate);

    if (!invoiceList.payableAmount) {
      setAmountErrmsg("Please Enter Amount");
    }

    // if (!invoiceList.formatpaiddate) {
    //   setDateErrmsg("Please Select Date");
    // }
    // else{
    //   setDateErrmsg('')
    // }
    if (!formatpaiddate) {
      setDateErrmsg("Please Select Date");
    } else {
      setDateErrmsg("");
    }

    if (!invoiceList.transaction || invoiceList.transaction === "select") {
      setPaymodeErrmsg("Please select a valid Paymode Type");
      return;
    }
    
    if (invoiceList.transaction == "Net Banking" && !account) {
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

    const invoiceNo = randomNumberInRange(
      invoiceList.hostel_Name,
      1,
      new Date()
    );
    const CheckInvoiceNo = state.InvoiceList?.Invoice.some(
      (item) => item.User_Id === selectedUserId && item.Invoices !== undefined
    );

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

  const handleDateChange = (selectedDates) => {
    if (!selectedDates) {
      setDateErrmsg("Please Select Date");
    } else {
      setDateErrmsg("");
    }
    const date = selectedDates[0];
    setSelectedDate(date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const lastDayOfMonth = new Date(year, month, 0);
    const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(
      lastDayOfMonth.getMonth() + 1
    ).padStart(2, "0")}-${String(lastDayOfMonth.getDate()).padStart(2, "0")}`;
    const formattedDate = formatDateForPayload(date);
    setFormattedDate(formattedDate);
    setInvoiceList((prevState) => ({
      ...prevState,
      date: formattedDate,
      dueDate: formattedDueDate,
    }));
  };

  const handleAddColumn = () => {
    const newRow = {
      am_name: "",
      used_unit: "",
      per_unit_amount: "",
      total_amount: "",
      amount: "",
    };
    setNewRows([...newRows, newRow]);
  };

  const handleCustomerName = (e) => {
    setCustomerName(e.target.value);
    setAllFieldErrmsg("");
    if (!e.target.value) {
      setCustomerErrmsg("Please Select Name");
    } else {
      setCustomerErrmsg("");
    }
    setStartDate("");
    setEndDate("");
    setSelectedData("");
    setBillAmounts("");
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
    setSelectedData("");
    setAvailableOptions("");
    setBillAmounts("");
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
  };

  const formatDateForPayloadmanualinvoice = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split("T")[0];
  };

  // const handlestartDate = (selectedDates) => {
  //   setAllFieldErrmsg("");
  //   const date = selectedDates;
  //   setStartDate(date);

  //   if (!selectedDates) {
  //     setStartdateErrmsg("Please Select Date");
  //   } else {
  //     setStartdateErrmsg("");
  //     setEnddateErrmsg("");
  //   }

  //   const formattedDate = formatDateForPayloadmanualinvoice(date);
  //   setFormatStartDate(formattedDate);
  // };

  // const handleEndDate = (selectedDates) => {
  //   setAllFieldErrmsg("");
  //   const date = selectedDates;
  //   setEndDate(date);
  //   if (!selectedDates) {
  //     setEnddateErrmsg("Please Select Date");
  //   } else {
  //     setEnddateErrmsg("");
  //     setStartdateErrmsg("");
  //   }

  //   const formattedDate = formatDateForPayloadmanualinvoice(date);
  //   setFormatEndDate(formattedDate);
  // };

  const handlestartDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setStartDate(date);

    if (!selectedDates) {
      setStartdateErrmsg("Please Select Date");
    } else {
      setStartdateErrmsg("");
    }

    const formattedDate = formatDateForPayloadmanualinvoice(date);
    setFormatStartDate(formattedDate);
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

    const formattedDate = formatDateForPayloadmanualinvoice(date);
    setFormatEndDate(formattedDate);
  };

  const handleInvoiceDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setInvoiceDate(date);
    if (!selectedDates) {
      setInvoiceDateErrmsg("Please Select Date");
    } else {
      setInvoiceDateErrmsg("");
      setEnddateErrmsg("");
      setStartdateErrmsg("");
    }

    const formattedDate = formatDateForPayloadmanualinvoice(date);
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

  const customStartDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };

  const customEndDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };

  const customInvoiceDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };

  const customInvoiceDueDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };

  const handleNewRowChange = (index, field, value) => {
    setAllFieldErrmsg("");
    const updatedRows = [...newRows];
    updatedRows[index][field] = value;

    setNewRows(updatedRows);
  };

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const updatedRows = prevRows.filter((_, i) => i !== index);
      return updatedRows;
    });
  
    setAllFieldErrmsg("");
  }

  // const handleCreateBill = () => {
  //   const incompleteRows = newRows.some((row) => !row.am_name || !row.amount);
  //   if (incompleteRows) {
  //     setTableErrmsg(
  //       "Please fill all details in the table before generating the bill"
  //     );
  //     return;
  //   }

  //   if (!customername) {
  //     setCustomerErrmsg("Please Select Customer");
  //   }

  //   if (!customername && !invoicenumber) {
  //     setAllFieldErrmsg("Please Enter All Field");
  //     return;
  //   }

  //   // Format start_date
  //   const startDateObject = new Date(startdate);
  //   const formattedStartDate = `${startDateObject.getFullYear()}-${String(
  //     startDateObject.getMonth() + 1
  //   ).padStart(2, "0")}-${String(startDateObject.getDate()).padStart(2, "0")}`;

  //   // Format end_date
  //   const endDateObject = new Date(enddate);
  //   const formattedEndDate = `${endDateObject.getFullYear()}-${String(
  //     endDateObject.getMonth() + 1
  //   ).padStart(2, "0")}-${String(endDateObject.getDate()).padStart(2, "0")}`;

  //   if (customername && invoicenumber) {
  //     dispatch({
  //       type: "MANUAL-INVOICE-ADD",
  //       payload: {
  //         user_id: customername,
  //         date: formatinvoicedate,
  //         due_date: formatduedate,
  //         start_date: formattedStartDate,
  //         end_date: formattedEndDate,
  //         invoice_id: invoicenumber,
  //         room_rent: rentamount?.amount,
  //         eb_amount: ebamount?.amount || 0,
  //         total_amount: totalAmount,
  //         amenity: amenityArray.length > 0 ? amenityArray : [],
  //       },
  //     });
  //     setShowManualInvoice(false);
  //     setShowRecurringBillForm(false);
  //     setReceiptFormShow(false);
  //     setShowAllBill(true);
  //     setCustomerName("");
  //     setInvoiceNumber("");
  //     setStartDate("");
  //     setEndDate("");
  //     setInvoiceDate("");
  //     setInvoiceDueDate("");
  //     setSelectedData("");
  //     setAvailableOptions("");
  //     setTotalAmount("");
  //     setBillAmounts([]);
  //     setNewRows([]);

  //     setCustomerErrmsg("");
  //     setStartdateErrmsg("");
  //     setInvoiceDateErrmsg("");
  //     setInvoiceDueDateErrmsg("");
  //     setAllFieldErrmsg("");
  //   }

  //   // setShowManualInvoice(true)
  // };

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
    if (newRows.some((row) => !row.am_name || !row.amount)) {
      setTableErrmsg(
        "Please fill all details in the table before generating the bill"
      );
      hasError = true;
    } else {
      setTableErrmsg("");
    }

    // Stop execution if there are errors
    if (hasError) {
      return;
    }

    // Format dates
    const formattedStartDate = startdate
      ? `${startdate.getFullYear()}-${String(startdate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(startdate.getDate()).padStart(2, "0")}`
      : "";

    const formattedEndDate = enddate
      ? `${enddate.getFullYear()}-${String(enddate.getMonth() + 1).padStart(
          2,
          "0"
        )}-${String(enddate.getDate()).padStart(2, "0")}`
      : "";

    // Dispatch only if all fields are filled
    dispatch({
      type: "MANUAL-INVOICE-ADD",
      payload: {
        user_id: customername,
        date: formatinvoicedate,
        due_date: formatduedate,
        start_date: formattedStartDate,
        end_date: formattedEndDate,
        invoice_id: invoicenumber,
        room_rent: rentamount?.amount,
        eb_amount: ebamount?.amount || 0,
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
    setSelectedData("");
    setAvailableOptions("");
    setTotalAmount("");
    setBillAmounts([]);
    setNewRows([]);
  };

  const handleSelectChange = (e) => {
    const selectedDescription = e.target.value;
    const selectedOption = invoicetotalamounts.find(
      (opt) => opt.description === selectedDescription
    );

    if (selectedOption) {
      setBillAmounts([...billamounts, selectedOption]);
      setAvailableOptions(
        availableOptions.filter(
          (opt) => opt.description !== selectedDescription
        )
      );
    }
  };

  const handleAmountChange = (index, value) => {
    const updatedData = [...billamounts];
    updatedData[index] = { ...updatedData[index], amount: value };
    setBillAmounts(updatedData);
  };

  const handleDelete = (item) => {
    setBillAmounts(
      billamounts.filter((bill) => bill.description !== item.description)
    );
    setAvailableOptions([...availableOptions, item]);
  };

  //  const itemsPerPage = 5;
  // bills

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
    setValue(newValue);
    setSearch(false);
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
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "BANKINGLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.bankingDetails.statusCodeForGetBanking === 200) {
      setBanking(state.bankingDetails.bankingList.banks);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BANKING_LIST" });
      }, 200);
    }
  }, [state.bankingDetails.statusCodeForGetBanking]);

  console.log(
    "responseinvoiceupdate",
    state.InvoiceList.UpdateInvoiceStatusCode
  );

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
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_view == 1
    ) {
      setBillPermissionError("");
    } else {
      setLoading(false)
      setBillPermissionError("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_create == 1
    ) {
      setRecuringBillAddPermission("");
    } else {
      setRecuringBillAddPermission("Permission Denied");
      setLoading(false)
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_view == 1
    ) {
      setRecurringPermission("");
    } else {
      setRecurringPermission("Permission Denied");
      setLoading(false)
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_view == 1
    ) {
      setReceiptPermission("");
    } else {
      setReceiptPermission("Permission Denied");
      setLoading(false)
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[11]?.per_create == 1
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
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_create == 1
    ) {
      setBillAddPermission("");
    } else {
      setBillAddPermission("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_delete == 1
    ) {
      setBillDeletePermission("");
    } else {
      setBillDeletePermission("Permission Denied");
    }
  }, [billrolePermission]);

  useEffect(() => {
    if (
      billrolePermission[0]?.is_owner == 1 ||
      billrolePermission[0]?.role_permissions[10]?.per_edit == 1
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
      state.login.UpdateNotificationMessage != null &&
      state.login.UpdateNotificationMessage != ""
    ) {
      // dispatch({ type: "ALL-NOTIFICATION-LIST" });
      setTimeout(() => {
        dispatch({ type: "AFTER_UPDATE_NOTIFICATION", message: null });
        newNotificationIDs = [];
      }, 100);
    }
  }, [state.login.UpdateNotificationMessage]);

  // useEffect(() => {
  //   const pdfUrl = state.InvoiceList.invoicePDF;

  //   if (pdfUrl) {

  //     const pdfWindow = window.open(pdfUrl, "_blank");
  //     if (pdfWindow) {
  //       setShowLoader(false);
  //     } else {
  //       console.error("Failed to open the PDF.");
  //     }
  //   }
  // }, [state.InvoiceList.invoicePDF]);
  // useEffect(() => {
  //   if (state.InvoiceList?.statusCodeForPDf === 200) {
  //     const pdfUrl = state.InvoiceList.invoicePDF;

  //     if (pdfUrl) {

  //       const pdfWindow = window.open(pdfUrl, "_blank");
  //       if (pdfWindow) {
  //         setShowLoader(false);
  //         dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
  //       } else {
  //         console.error("Failed to open the PDF.");
  //       }
  //     }
  //   }
  // }, [state.InvoiceList?.statusCodeForPDf]);

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
        } else {
          console.error(
            "Failed to open the PDF. Popup blocker might be enabled."
          );
          // alert("Popup blocked. Please allow popups for this site to view the PDF.");
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
        } else {
          console.error(
            "Failed to open the PDF. Popup blocker might be enabled."
          );
          // alert("Popup blocked. Please allow popups for this site to view the PDF.");
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
        setFilteredUserDetails([filteredDetails]);
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
      } else {
        setFilteredUserDetails([]);
      }
    } else {
      setFilteredUserDetails([]);
    }
  }, [selectedUserId, state.UsersList?.Users, state.InvoiceList?.Invoice]);

  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoice_details);
  }, [state.UsersList.customerdetails.invoice_details]);

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
    if (state.InvoiceList.ManualInvoicesgetstatuscode === 200) {
      setBills(state.InvoiceList.ManualInvoices);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST" });
      }, 1000);
    }
  }, [state.InvoiceList.ManualInvoices]);

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
    if (state.InvoiceList?.InvoiceListStatusCode == 200) {
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
    if (state.InvoiceList.message != "" && state.InvoiceList.message != null) {
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

  useEffect(() => {
    if (invoicetotalamounts && invoicetotalamounts.length > 0) {
      setBillAmounts(invoicetotalamounts);
    }
  }, [invoicetotalamounts]);

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
    setRecurLoader(true);
    if (hostelId) {
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: { hostel_id: hostelId },
      });
    }
  }, [hostelId]);

  useEffect(() => {
    if (state.InvoiceList.RecurringbillsgetStatuscode === 200) {
      setRecurringBills(state.InvoiceList.RecurringBills);
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

  const [originalBills, setOriginalBills] = useState([]);
  const [originalRecuiring, setOriginalRecuiring] = useState([]);
  const [originalReceipt, setOriginalReceipt] = useState([]);

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

    if (value == 3) {
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
    setFilterInput(user.Name);
    setBills([user]);
    setDropdownVisible(false);
  };

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
    setBills(originalBills);
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
    setReceiptLoader(true);
    if (hostelId) {
      dispatch({
        type: "RECEIPTSLIST",
        payload: { hostel_id: hostelId },
      });
    }
  }, [hostelId]);

  useEffect(() => {
    if (state.InvoiceList.ReceiptlistgetStatuscode === 200) {
      setReceiptData(state.InvoiceList.ReceiptList);
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
      state.InvoiceList.ReceiptDeletesuccessStatuscode ||
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
        <div className="container">
          <div
            className="container"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: "60px",
              position: "sticky",
              top: 0,
              right: 0,
              left: 0,
              zIndex: 1000,
              backgroundColor: "#FFFFFF",
            }}
          >
            <p
              style={{
                marginTop: 26,
                fontSize: "18px",
                fontFamily: "Gilroy",
                fontWeight: 600,
                color: "#222",
              }}
            >
              Bills
            </p>

            <div>
              {showLoader && <LoaderComponent />}
              {loading && <LoaderComponent />}
              <div className="d-flex  justify-content-between align-items-center flex-wrap flex-md-nowrap">
                {search ? (
                  <>
                    <div style={{ position: "relative",  }}>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          // width: "100%",
                          marginTop: "0px",
                          marginBottom: "5px",
                        }}
                      >
                        {/* <Image
                          src={searchteam}
                          alt="Search"
                          style={{
                            position: "absolute",
                            left: "10px",
                            width: "24px",
                            height: "24px",
                            pointerEvents: "none",
                          }}
                        /> */}
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
                            aria-label="Search"
                            style={{
                              boxShadow: "none",
                              outline: "none",
                              borderColor: "rgb(207,213,219)",
                              borderRight: "none",
                              width: "250px" 
                            }}
                            value={filterInput}
                            onChange={(e) => handlefilterInput(e)}
                          />
                          <span className="input-group-text bg-white border-start-0">
                            <img
                              src={closecircle}
                              onClick={handleCloseSearch}
                              style={{ height: 20, width: 20,cursor:"pointer" }}
                            />
                          </span>
                        </div>
                      </div>

                      {value === "1" &&
                        isDropdownVisible &&
                        bills?.length > 0 && (
                          <div
                            style={{
                              border: "1px solid #d9d9d9 ",
                              position: "absolute",
                              top: 60,
                              left: 0,
                              zIndex: 1000,
                              padding: 10,
                              borderRadius: 8,
                              backgroundColor: "#fff",
                              width: "94%",
                            }}
                          >
                            <ul
                              className="show-scroll p-0"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                maxHeight: bills?.length > 1 ? "174px" : "auto",
                                minHeight: 100,
                                overflowY:
                                  bills?.length > 1 ? "auto" : "hidden",
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
                            </ul>
                          </div>
                        )}
                      {value === "2" &&
                        isDropdownVisible &&
                        recurringbills?.length > 0 && (
                          <div
                            style={{
                              border: "1px solid #d9d9d9 ",
                              position: "absolute",
                              top: 60,
                              left: 0,
                              zIndex: 1000,
                              padding: 10,
                              borderRadius: 8,
                              backgroundColor: "#fff",
                              width: "94%",
                            }}
                          >
                            <ul
                              className="show-scroll p-0"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                maxHeight:
                                  recurringbills?.length > 1 ? "174px" : "auto",
                                minHeight: 100,
                                overflowY:
                                  recurringbills?.length > 1
                                    ? "auto"
                                    : "hidden",
                                margin: "0",
                                listStyleType: "none",
                                boxSizing: "border-box",
                              }}
                            >
                              {recurringbills?.map((user, index) => {
                                const imagedrop = user.profile || Profile;
                                return (
                                  <li
                                    key={index}
                                    className="list-group-item d-flex align-items-center"
                                    style={{
                                      cursor: "pointer",
                                      padding: "10px 5px",
                                      borderBottom:
                                        index !== recurringbills?.length - 1
                                          ? "1px solid #eee"
                                          : "none",
                                    }}
                                    onClick={() => handleUserRecuire(user)}
                                  >
                                    <Image
                                      src={imagedrop}
                                      alt={user.user_name || "Default Profile"}
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
                                    <span>{user.user_name}</span>
                                  </li>
                                );
                              })}
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
                              top: 60,
                              left: 0,
                              zIndex: 1000,
                              padding: 10,
                              borderRadius: 8,
                              backgroundColor: "#fff",
                              width: "94%",
                            }}
                          >
                            <ul
                              className="show-scroll p-0"
                              style={{
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                                maxHeight:
                                  receiptdata?.length > 1 ? "174px" : "auto",
                                minHeight: 100,
                                overflowY:
                                  receiptdata?.length > 1 ? "auto" : "hidden",
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
                                      borderBottom:
                                        index !== receiptdata?.length - 1
                                          ? "1px solid #eee"
                                          : "none",
                                    }}
                                    onClick={() => handleUserReceipt(user)}
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
                    <div style={{ paddingRight: 15, marginTop: 18 }}>
                      <Image
                        src={searchteam}
                        roundedCircle
                        style={{
                          height: "24px",
                          width: "24px",
                          cursor:"pointer"
                        }}
                        onClick={handleSearch}
                      />
                    </div>
                  </>
                )}

                {(value === "1" || value === "3") && (
                  <div style={{ paddingRight: 15 }}>
                    <Image
                      src={Filters}
                      roundedCircle
                      style={{ height: "50px", width: "50px", marginTop: 18,cursor:"pointer" }}
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
                      width: search ? "180px" : "120px",
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
                        cursor:"pointer"
                      }}
                    >
                      <option value="All">All</option>
                      <option value="Unpaid">UnPaid</option>
                      <option value="Paid">Paid</option>
                    </Form.Select>
                  </div>
                )}

                {value === "3" && filterStatus && (
                  <div
                    className="me-3"
                    style={{
                      border: "1px solid #D4D4D4",
                      borderRadius: 8,
                      width: search ? "180px" : "120px",
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
                      }}
                    >
                      <option value="All">All</option>
                      <option value="Cash">Cash</option>
                      <option value="upi">UPI</option>
                      <option value="Credit Card">Credit Card</option>
                      <option value="Debit Card">Debit Card</option>
                    </Form.Select>
                  </div>
                )}
                {/* <BsSearch class=" me-4" onClick={handleiconshow} /> 

<div className='me-3'>
<Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} onClick={handleFiltershow} />
</div> */}

                <div>
                  {value == 1 && (
                    <Button
                      disabled={billAddPermission}
                      onClick={handleManualShow}
                      // style={{
                      //   fontSize: 14,
                      //   backgroundColor: "#1E45E1",
                      //   color: "white",
                      //   height: 52,
                      //   fontWeight: 600,
                      //   borderRadius: 8,
                      //   width: 152,
                      //   padding: "12px, 16px, 12px, 16px",
                      //   color: "#FFF",
                      //   fontFamily: "Montserrat",
                      // }}
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "11px 32px",
                        marginTop: 19,
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
                        padding: "11px 24px",
                        paddingLeft: 25,
                        marginTop: 19,
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
                        padding: "11px 17px",
                        paddingLeft: 18,
                        whiteSpace: "nowrap",
                        marginTop: 19,
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

          <TabContext value={value} className="container ">
            <div
            
            >
              <Box
                sx={{ borderBottom: 0, borderColor: "divider" }}
                className="container"
              >
                <TabList
                  orientation={isSmallScreen ? "vertical" : "horizontal"}
                  onChange={handleChanges}
                  aria-label="lab API tabs example"
                  style={{ marginLeft: "7px" }}
                  className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
                >
                  <Tab
                    label="Bills"
                    value="1"
                    style={{
                      marginTop: 0,
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
                      marginTop: 0,
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
                      marginTop: 0,
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
                        {/* <div className="headerone">

<div className="search-container">
<input type="text" placeholder="Search" className="search-input" />
<span className="search-icon"></span>
</div>
<div className="notification-container">





<div type="button" onClick={handleShowpopup}>
<img src={NotificationIcon} className="notification-icon" alt="notification icon" />
<span className="notification-dot"></span>
</div>


</div>
<div className="profile-container">
<img src={rectangle}  className="profile-image" />
</div>
</div> */}
                      </div>
                    </div>

                    {/* <div className='container d-flex justify-content-end align-items-center mr-3'>

<div>
  <InputGroup>
    <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
      <CiSearch style={{ fontSize: 20 }} />
    </InputGroup.Text>
    <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
      placeholder="Search..."
    />
  </InputGroup>
</div>
<div className="mr-3">
  <img src={Notify} alt="notification" />
</div>

<div className="mr-3">
  <Image src={Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
</div>
</div> */}

                    {showdeleteform && (
                      <div>
                        <Modal
                          show={showdeleteform}
                          onHide={handleCloseDeleteform}
                          centered
                          backdrop="static"
                          style={{
                            width: 388,
                            height: 250,
                            marginLeft: "500px",
                            marginTop: "200px",
                          }}
                        >
                          <Modal.Header style={{ borderBottom: "none" }}>
                            <Modal.Title
                              style={{
                                fontSize: "18px",
                                fontFamily: "Gilroy",
                                textAlign: "center",
                                fontWeight: 600,
                                color: "#222222",
                                flex: 1,
                              }}
                            >
                              Delete Billing?
                            </Modal.Title>
                          </Modal.Header>

                          <Modal.Body
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              color: "#646464",
                              textAlign: "center",
                              marginTop: "-20px",
                            }}
                          >
                            Are you sure you want to delete this Billing?
                          </Modal.Body>

                          <Modal.Footer
                            style={{
                              justifyContent: "center",
                              borderTop: "none",
                              marginTop: "-10px",
                            }}
                          >
                            <Button
                              style={{
                                width: 160,
                                height: 52,
                                borderRadius: 8,
                                padding: "12px 20px",
                                background: "#fff",
                                color: "#1E45E1",
                                border: "1px solid #1E45E1",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                fontSize: "14px",
                                marginRight: 10,
                              }}
                              onClick={handleCloseDeleteform}
                            >
                              Cancel
                            </Button>
                            <Button
                              style={{
                                width: 160,
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
                                                style={{ paddingTop:40, position: "relative" }}
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
                                    className="mb-3"
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
                                      placeholder="Enter amount"
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
                                      type="text"
                                      placeholder="Enter amount"
                                      value={invoiceList.payableAmount}
                                      onChange={(e) => {
                                        handleAmount(e);
                                      }}
                                    />
                                    {amounterrormsg.trim() !== "" && (
                                      <div>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            color: "red",
                                            marginTop: "3px",
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
                                    className="mb-2"
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
                                      <DatePicker
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
                                      />
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
                                          fontSize: "13px",
                                          color: "red",
                                          marginTop: "3px",
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
                                      Mode of transaction
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "20px",
                                        }}
                                      >
                                        *
                                      </span>
                                    </Form.Label>
                                    <Form.Select
                                      className="border"
                                      value={invoiceList.transaction}
                                      // value={editOption == 'Add' ? item.Name.split(' ')[0] : invoiceList.firstName}
                                      // onChange={(e) => { setInvoiceList({ ...invoiceList, transaction: e.target.value }) }}
                                      onChange={(e) => handleTransaction(e)}
                                      style={{
                                        fontSize: 14,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy, sans-serif",
                                        fontWeight: 500,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        height: 49,
                                        borderRadius: 8,
                                        marginTop: 6,
                                      }}
                                    >
                                      <option selected>select </option>
                                      <option value="Cash">Cash </option>
                                      <option value="Debit Card">
                                        Debit Card
                                      </option>
                                      <option value="Credit Card">
                                        Credit Card
                                      </option>
                                      <option value="UPI">UPI</option>
                                      <option value="Net Banking">
                                        Banking
                                      </option>
                                    </Form.Select>
                                    {paymodeerrormsg.trim() !== "" && (
                                      <div>
                                        <p
                                          style={{
                                            fontSize: "13px",
                                            color: "red",
                                            marginTop: "3px",
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
                                    <Form.Select
                                      aria-label="Default select example"
                                      placeholder="Select no. of floor"
                                      style={{
                                        fontSize: 16,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        height: 50,
                                        borderRadius: 8,
                                      }}
                                      id="form-selects"
                                      className="border"
                                      value={account}
                                      onChange={(e) => handleAccount(e)}
                                    >
                                      <option value="">Select Account</option>
                                      {bankking?.length > 0 ? (
                                        bankking.map((u) => (
                                          <option key={u.id} value={u.id}>
                                            {u.bank_name}
                                          </option>
                                        ))
                                      ) : (
                                        <option value="" disabled>
                                          No accounts available
                                        </option>
                                      )}
                                    </Form.Select>
                                    {accountError.trim() !== "" && (
                                      <div>
                                        <p
                                          style={{
                                            fontSize: "15px",
                                            color: "red",
                                            marginTop: "3px",
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
                                      fontSize: "15px",
                                      color: "red",
                                      marginTop: "3px",
                                    }}
                                  >
                                    {totalErrormsg !== " " && (
                                      <MdError
                                        style={{
                                          fontSize: "15px",
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
                        className={` ${
                          DownloadInvoice
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
                              style={{ maxHeight: 700, overflowY: "auto" }}
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
                                              {item.Invoices == null ||
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
                                    marginTop:"5px"
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
                                          Invoice number
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
                                      {loading
                                        ? // Display skeleton placeholders when loading is true
                                          Array.from({ length: 5 }).map(
                                            (_, index) => (
                                              <tr key={index}>
                                                <td>
                                                  <div className="d-flex">
                                                    <span className="i-circle">
                                                      <Skeleton
                                                        circle
                                                        width={24}
                                                        height={24}
                                                      />
                                                    </span>
                                                    <div>
                                                      <Skeleton width={80} />
                                                    </div>
                                                  </div>
                                                </td>
                                                <td>
                                                  <Skeleton width={100} />
                                                </td>
                                                <td>
                                                  <Skeleton width={100} />
                                                </td>
                                                <td>
                                                  <Skeleton width={50} />
                                                </td>
                                                <td>
                                                  <Skeleton width={50} />
                                                </td>
                                                <td>
                                                  <Skeleton width={100} />
                                                </td>
                                                <td>
                                                  <Skeleton width={100} />
                                                </td>
                                              </tr>
                                            )
                                          )
                                        : //   <div
                                          //   style={{
                                          //     position: 'absolute',
                                          //     inset: 0,
                                          //     display: 'flex',
                                          //     height: "50vh",
                                          //     alignItems: 'center',
                                          //     justifyContent: 'center',
                                          //     backgroundColor: 'transparent',
                                          //     opacity: 0.75,
                                          //     zIndex: 10,
                                          //   }}
                                          // >
                                          //   <div
                                          //     style={{
                                          //       borderTop: '4px solid #1E45E1',
                                          //       borderRight: '4px solid transparent',
                                          //       borderRadius: '50%',
                                          //       width: '40px',
                                          //       height: '40px',
                                          //       animation: 'spin 1s linear infinite',
                                          //     }}
                                          //   ></div>
                                          // </div>

                                          // Display table rows with actual data when loading is false
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
                                currentItems?.length == 0 && (
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
                  { !recurLoader && currentItem && currentItem.length === 0 && (
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

                


                    


                    {currentItem && currentItem.length > 0 && (
                      <div
                        style={{
                          // height: "400px",
                          height: currentItem.length >= 6 ? "380px" : "auto",
                          overflowY: currentItem.length >= 6 ? "auto" : "visible",
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

                          {!loading && receiptLoader ? (
                                        <LoaderComponent />
                                
                                      ) : (
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
                            )
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

                  <Container fluid className="p-0">
                    <Row
                      className={` ${
                        DownloadReceipt
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
                            style={{ maxHeight: 700, overflowY: "auto" }}
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
                                            {item.Invoices == null ||
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
                                      {!loading && receiptLoader ? (
                                        <LoaderComponent />
                                
                                      ) : (
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
                                      )}
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
        </div>
      )}

      {showmanualinvoice && (
        <div className="mt-4" style={{paddingLeft:25}}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <svg
              onClick={handleBackBill}
              style={{
                fontSize: "22px",
                // marginRight: "10px",
                cursor: "pointer",
              }}
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                fill="#000000"
                d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"
              ></path>
              <path
                fill="#000000"
                d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
              ></path>
            </svg>
            <p className="mt-1" style={{ fontFamily: "Gilroy" }}>
              {billMode}
            </p>
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
              <Form.Select
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
              </Form.Select>
              {customererrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "13px", color: "red", marginTop: "5px" }}
                  >
                    {customererrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
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
                placeholder="Enter invoice number"
                value={invoicenumber || ""}
                readOnly
              />
              {invoicenumbererrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "15px", color: "red", marginTop: "3px" }}
                  >
                    {invoicenumbererrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
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

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">
              <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Start Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    selected={startdate}
                    onChange={(date) => handlestartDate(date)}
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [0, -280],
                        },
                      },
                    ]}
                    dateFormat="dd/MM/yyyy"
                    // minDate={new Date()}

                    customInput={customStartDateInput({
                      value: startdate
                        ? startdate.toLocaleDateString("en-GB")
                        : "",
                    })}
                  />
                </div>
              </Form.Group>

              {startdateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "13px", color: "red", marginTop: "3px" }}
                  >
                    {startdateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
                        }}
                      />
                    )}{" "}
                    {startdateerrmsg}
                  </p>
                </div>
              )}
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  End Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    selected={enddate}
                    onChange={(date) => handleEndDate(date)}
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [0, -280],
                        },
                      },
                    ]}
                    dateFormat="dd/MM/yyyy"
                    // minDate={new Date()}

                    customInput={customEndDateInput({
                      value: enddate ? enddate.toLocaleDateString("en-GB") : "",
                    })}
                  />
                </div>
              </Form.Group>

              {enddateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "13px", color: "red", marginTop: "3px" }}
                  >
                    {enddateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
                        }}
                      />
                    )}{" "}
                    {enddateerrmsg}
                  </p>
                </div>
              )}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">
              <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Invoice Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    selected={invoicedate}
                    onChange={(date) => handleInvoiceDate(date)}
                    dateFormat="dd/MM/yyyy"
                    // minDate={new Date()}

                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [0, -300],
                        },
                      },
                    ]}
                    customInput={customInvoiceDateInput({
                      value: invoicedate
                        ? invoicedate.toLocaleDateString("en-GB")
                        : "",
                    })}
                  />
                </div>
              </Form.Group>

              {invoicedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "13px", color: "red", marginTop: "3px" }}
                  >
                    {invoicedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
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
              <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Due Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    selected={invoiceduedate}
                    onChange={(date) => handleDueDate(date)}
                    dateFormat="dd/MM/yyyy"
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: "offset",
                        options: {
                          offset: [0, -300],
                        },
                      },
                    ]}
                    minDate={null}
                    customInput={customInvoiceDueDateInput({
                      value: invoiceduedate
                        ? invoiceduedate.toLocaleDateString("en-GB")
                        : "",
                    })}
                  />
                </div>
              </Form.Group>

              {invoiceduedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "13px", color: "red", marginTop: "3px" }}
                  >
                    {invoiceduedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
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
                    S.NO
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
                            placeholder="Enter description"
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
                        <Form.Control
                          type="text"
                          style={{ fontFamily: "Gilroy" }}
                          placeholder="Enter total amount"
                          value={u.amount}
                          onChange={(e) =>
                            handleNewRowChange(index, "amount", e.target.value)
                          }
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

          <div>
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
          </div>

          <div>
            {allfielderrmsg.trim() !== "" && (
              <div>
                <p
                  style={{
                    fontSize: "15px",
                    color: "red",
                    marginTop: "3px",
                    fontFamily: "Gilroy",
                    textAlign:"center"
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
          {tableErrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "13px", color: "red", marginTop: "3px",textAlign:"center" }}
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

          <div style={{ float: "right", marginRight: "130px" }}>
            <h5 style={{ fontFamily: "Gilroy" }}>
              Total Amount ₹{totalAmount}
            </h5>
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

export default InvoicePage;

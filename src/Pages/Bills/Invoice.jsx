/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import { Modal, Button, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FormControl } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Table } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import LoaderComponent from "../OthersComponent/LoaderComponent";
import "../Bills/Invoices.css";
import InvoiceTable from "../Bills/InvoicelistTable";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import RecurringBill from "../../Pages/Recurring/RecurringBills";
import closecircle from "../../Assets/Images/New_images/close-circle.png";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import AddReceiptForm from "../Receipt/AddReceipt";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Filter } from "iconsax-react";
import '../OthersComponent/BillPdfModal.css';
import AxiosConfig from "../../WebService/AxiosConfig";
import Swal from 'sweetalert2';
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import { useNavigate } from "react-router-dom";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import BillsFilter from '../../Pages/Bills/BillsFilter'
import { FiSearch } from "react-icons/fi";
import RecordPayment from "./RecordPayment";


const InvoicePage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [invoiceValue, setInvoiceValue] = useState("");
  // const [initials, setInitials] = useState("");
  // const [formRecordLoading, setFormRecordLoading] = useState(false)
  // const dropdownRef = useRef(null);
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






  // const location = useLocation();

  // const isDuplicate = location.pathname.includes("/invoice/new/");


  // console.log("isDuplicate", isDuplicate, "location.pathname", location.pathname)






  // const [showSearchFilter, setShowSearchFilter] = useState(false);
  // const [hoveredInvoiceId, setHoveredInvoiceId] = useState(null);

  const [showLoader, setShowLoader] = useState(false);
  const [statusfilter, setStatusfilter] = useState("ALL");
  const [selectedUserId, setSelectedUserId] = useState("");
  // const [paymodeerrormsg, setPaymodeErrmsg] = useState("");
  // const [amounterrormsg, setAmountErrmsg] = useState("");
  // const [dateerrmsg, setDateErrmsg] = useState("");
  // const [totalErrormsg, setTotalErrmsg] = useState("");
  const [customername, setCustomerName] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [invoicedate, setInvoiceDate] = useState(null);
  const [invoiceduedate, setInvoiceDueDate] = useState(null);

  const [bills, setBills] = useState([]);

  // const [account, setAccount] = useState("");
  // const [accountError, setAccountError] = useState("");
  const startRef = useRef(null);
  const endRef = useRef(null);
  const invoiceRef = useRef(null);
  const dueRef = useRef(null);
  // const [showmanualinvoice, setShowManualInvoice] = useState(false);
  const [showRecurringBillForm, setShowRecurringBillForm] = useState(false);
  const [receiptformShow, setReceiptFormShow] = useState(false);
  const [showAllBill, setShowAllBill] = useState(true);

  const [showform, setShowform] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);;
  const [DownloadInvoice, setDownloadInvoice] = useState(false);
  const [showdeleteform, setShowDeleteform] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const [search, setSearch] = useState(false);
  const [hostelId, setHostelId] = useState("");
  const [chips, setChips] = useState([])

  const [originalBills, setOriginalBills] = useState([]);


  const {
    canWriteModule: canWriteInvoice,
    canReadModule: canReadInvoice,
  } = useHasPermission("Bills");






  useEffect(() => {
    if (!canReadInvoice) {
      setLoading(false);
    } 
  }, [canReadInvoice]);




  const [showBillsFilter, setShowBillsFilter] = useState(false);

  const handleShowFilterBills = () => {
    setShowBillsFilter(true)

    dispatch({
      type: "SET_INVOICE_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        type: [],
        createdBy: [],
        createdByLabels: [],
        modes: [],
        paymentStatus: [],
        search: "",
      },
    })

  }

  const handleCloseFilterBills = () => {
    setShowBillsFilter(false)

  }


  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];

  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);



  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);

  };








  useEffect(() => {

    if (state.login.selectedHostel_Id) {
      setHostelId(state.login.selectedHostel_Id);
    }
  }, [state.login.selectedHostel_Id]);



  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;

    dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })
    setLoading(true)


  }, [state.login.selectedHostel_Id]);




  useEffect(() => {
    if (state.InvoiceList.CustomerRecurringEnableDisableStatusCode === 200) {
      dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })
      setLoading(true)
      dispatch({ type: 'REMOVE_CUSTOMER_RECURRING_ENABLE_DISABLE' })


    }

  }, [state.InvoiceList.CustomerRecurringEnableDisableStatusCode])

  useEffect(() => {
    if (bills.length === 0) {
      setLoading(false);
    }

  }, [bills])



  useEffect(() => {
    if (state.InvoiceList.ManualInvoicesgetstatuscode === 200) {
      setBills(state.InvoiceList.ManualInvoices);
      // setOriginalBillsFilter(state.InvoiceList.ManualInvoices)
      setOriginalBills(state.InvoiceList.ManualInvoices)
      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.ManualInvoicesgetstatuscode]);


  useEffect(() => {
    if (state.InvoiceList.billsListStatusCode === 200) {
      setShowBillsFilter(false)
      setLoading(false);
      setBills(state.InvoiceList.billsList?.listInvoices);
      // setOriginalBillsFilter(state.InvoiceList.billsList?.listInvoices)
      setOriginalBills(state.InvoiceList.billsList?.listInvoices)
      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "REMOVE_INVOICES_LIST_FILTER" });

      }, 100);
    }
  }, [state.InvoiceList.billsListStatusCode]);


  useEffect(() => {
    setLoading(false);
    // setRecurLoader(false)

  }, [state.InvoiceList.ManualInvoices, state.InvoiceList.billsList?.listInvoices, state.InvoiceList.RecurringBills])


  const sortedData = React.useMemo(() => {
    return Array.isArray(bills) ? bills : [];
  }, [bills]);

  useEffect(() => {
    if (state.InvoiceList.BillsErrorstatusCode === 201) {

      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "REMOVE_NODATA_BILL_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.BillsErrorstatusCode]);






  const handleManualShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding bill information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShowAllBill(false);
    // setShowManualInvoice(true);
    // setBillMode("New Bill");
    // setIsEditing(false);
    // setInvoiceDetails(null);
    navigate('/create-bill')
    dispatch({ type: "USERROOMAVAILABLEFALSE" });
  };

  // const handleReceiptShow = () => {
  //   if (!state.login.selectedHostel_Id) {
  //     toast.error('Please add a hostel before adding receipt information.', {
  //       hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
  //     });
  //     return;
  //   }
  //   setShowAllBill(false);
  //   setReceiptFormShow(true);
  //   dispatch({ type: "GET_REFERENCE_ID" });
  // };


  // const handleAccount = (selectedOption) => {
  //   setAccount(selectedOption?.value || "");
  //   setAccountError("");
  //   dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
  // };

  // const handleTransaction = (selectedOption) => {
  //   setInvoiceList({ ...invoiceList, transaction: selectedOption });
  //   setAccountError("");
  //   setPaymodeErrmsg("");
  //   setAccount("");
  // };



  // const handleChange = (e) => {
  //   setTransactionId(e.target.value);
  // };




  const selectOptions = [
    { label: "All", value: "ALL" },
    ...(state.InvoiceList?.billsList?.filterOptions?.paymentStatus?.map(item => ({
      label: item.name,
      value: item.type
    })) || [])
  ];


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



  useEffect(() => {
    if (state.InvoiceList.pdfErrorStatusCode === 201) {
      setLoading(false)
      setShowLoader(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_PDF_ERROR" });
      }, 100);
    }
  }, [state.InvoiceList.pdfErrorStatusCode]);
  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false)
      setShowLoader(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

  // const handleReceiptDetail = (item) => {


  //   if (item.user_id) {

  //     dispatch({
  //       type: "RECEIPTPDF",
  //       payload: {
  //         id: item.id,
  //       },
  //     });

  //     setShowLoader(true);
  //   }
  // };




  const CustomStyles = {
    control: (base) => ({
      ...base,
      height: "auto",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "14px",
      color: "#4B4B4B",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",
      cursor: "pointer",
      outline: "none",
      "&:hover": {
        border: "1px solid #D9D9D9",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      maxHeight: "60px",
      overflowY: "auto",
      flexWrap: "wrap",
    }), multiValue: (base) => ({
      ...base,
      backgroundColor: "#FFF",
      borderRadius: "6px",
    }),

    multiValueLabel: (base) => ({
      ...base,
      fontSize: "12px",
      fontWeight: 600,
      color: "#000000",
    }),

    multiValueRemove: (base) => ({
      ...base,
      cursor: "pointer",
      borderRadius: 10,
      color: "#FF0000",
      ":hover": {
        color: "#FF0000",
      },
    }),

    menu: (base) => ({
      ...base,
      backgroundColor: "#f8f9fa",
      border: "1px solid #ced4da",
      fontFamily: "Gilroy, sans-serif", fontSize: "14px",
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: "#1E45E1",
      color: "#FFF",
      maxHeight: "120px",
      padding: 0,
      scrollbarWidth: "thin",
      overflowY: "auto",
      fontFamily: "Gilroy, sans-serif", fontSize: "14px",
    }),
    placeholder: (base) => ({
      ...base,
      color: "#555",
    }),
    option: (base, state) => ({
      ...base,
      cursor: "pointer",
      backgroundColor: state.isFocused ? "" : "white",
      color: state.isFocused ? "#FFF" : "#000000",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "#555",
      cursor: "pointer"
    }),
    indicatorSeparator: () => ({
      display: "none",
    }), clearIndicator: () => ({
      display: "none",
    }),
  }

  const handleStatusFilter = (selectedOption) => {
    dispatch({
      type: "SET_INVOICE_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        type: [],
        createdBy: [],
        createdByLabels: [],
        modes: [],
        paymentStatus: [],
        search: "",
      },
    })
    if (!selectedOption) {
      setStatusfilter(null);

      if (state.login?.selectedHostel_Id) {
        dispatch({
          type: "INVOICESLISTFILTER",
          payload: {
            hostelId: state.login.selectedHostel_Id,
          },
        });
      }
      return;
    }

    setStatusfilter(selectedOption);
    // console.log("selectedOption", selectedOption);

    if (!state.login?.selectedHostel_Id) return;


    if (selectedOption.value === "ALL") {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: {
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }

    else {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
            paymentStatus: [selectedOption.value],
            search: filterInput
          },
        },
      });
    }
  };













  // const [payableAmount, setPayableAmount] = useState("");
  // const [balance, setBalance] = useState(0);


  // const handleAmount = (e) => {
  //   setAmountErrmsg('')
  //   let value = e.target.value;

  //   if (value !== "") {
  //     let numValue = Number(value);
  //     if (numValue > (invoiceList.balanceDue || 0)) {
  //       numValue = invoiceList.balanceDue || 0;
  //     }
  //     value = numValue;
  //     setBalance((invoiceList.balanceDue || 0) - numValue);
  //   } else {

  //     setBalance(invoiceList.balanceDue || 0);
  //   }

  //   setPayableAmount(value);
  //   // setPayableAmountError("")
  //   dispatch({ type: 'CLEAR_PAYABLE_AMOUNT' })
  // };






  const [editvalue, setEditvalue] = useState("");
  const [receiptedit, setReceiptEdit] = useState(false);




  // const handleEditReceipt = (item) => {
  //   setShowAllBill(false);
  //   setReceiptFormShow(true);
  //   setEditvalue(item);
  //   setReceiptEdit(true);
  // };

  const handleEdit = (props) => {
    navigate('/create-bill', {
      state: {
        billData: props,
      },
    })
    setShowAllBill(false);

  };






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

  useEffect(() => {
    if (customername) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: customername } });
    }
  }, [customername])





  const handleShowForm = (props) => {
    setShowform(true);

    setInvoiceValue(props.item);

    if (props.item.invoiceId !== undefined) {

      const dateObject = new Date(props.item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(
        lastDayOfMonth.getMonth() + 1
      ).padStart(2, "0")}-${String(lastDayOfMonth.getDate()).padStart(2, "0")}`;

      setSelectedUserId(props.item.customerId);
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      setInvoiceList({
        id: props.item?.id,
        firstName: props.item?.firstName,
        lastName: props.item?.lastName,
        phone: props.item?.phoneNo,
        email: props.item?.EmailID,
        hostel_Name: props.item?.Hostel_Name,
        hostel_Id: props.item?.Hostel_Id,
        FloorNo: props?.item?.Floor_Id,
        RoomNo: props?.item?.Room_No,
        date: formattedDate,
        amount: props.item?.invoiceAmount,
        paidAmount: props.item?.paidAmount,
        balanceDue: props.item?.dueAmount === 0 ? "00" : props.item?.dueAmount,
        dueDate: formattedDueDate,
        InvoiceId: props.item?.invoiceId,
        invoice_type: props.item?.invoiceType,
      });

    } else {
      setSelectedUserId("");
    }
  }

  const handleCloseForm = () => {
    // setTransactionId('')
    // setPaymodeErrmsg("")
    // setAccountError("")
    // setDateErrmsg("")
    // setAmountErrmsg("")
    setShowform(false);
    // setBalance("")
    setSelectedDate(null);
    // setAmountErrmsg("");
    // setDateErrmsg("");
    // setPaymodeErrmsg("");
    // setPayableAmount("")

    dispatch({ type: 'CLEAR_PAYABLE_AMOUNT' })
    dispatch({ type: 'CLEAR_INVALID_DETAILS_ERROR' })
    dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
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
    // setSelectedDate(null);
  };


  const handleCloseDeleteform = () => {
    setShowDeleteform(false);
  };

  // const handleSaveInvoiceList = () => {
  //   const formatpaiddate = formatDateForPayload(selectedDate);
  //   const billDate = new Date(invoiceValue.Date);
  //   const paidDate = new Date(formatpaiddate);

  //   if (!payableAmount) {
  //     setAmountErrmsg("Please Enter Amount");
  //   } else {
  //     setAmountErrmsg("");
  //   }

  //   if (!formatpaiddate) {
  //     setDateErrmsg("Please Select Date");
  //   } else if (paidDate < billDate) {
  //     setDateErrmsg("Paid date should not be before Bill date");
  //     return;
  //   } else {
  //     setDateErrmsg("");
  //   }

  //   if (!invoiceList.transaction || invoiceList.transaction === "select") {
  //     setPaymodeErrmsg("Please Select Transaction Type");
  //     return;
  //   }

  //   if (invoiceList.transaction === "Net Banking" && !account) {
  //     setAccountError("Please Choose Bank Account");
  //     return;
  //   }

  //   if (
  //     !payableAmount ||
  //     !formatpaiddate ||
  //     !invoiceList.transaction
  //   ) {
  //     setTimeout(() => {
  //       setTotalErrmsg("");
  //     }, 1000);
  //     return;
  //   }



  //   if (
  //     invoiceList.InvoiceId &&
  //     payableAmount &&
  //     invoiceList.transaction &&
  //     formatpaiddate && hostelId
  //   ) {
  //     dispatch({
  //       type: "RECORD_PAYMENT",
  //       payload: {
  //         hostelId: hostelId,
  //         invoiceId: invoiceList.InvoiceId,
  //         data: {
  //           bankId: invoiceList.transaction,
  //           paymentDate: formatpaiddate,
  //           referenceId: transactionId,
  //           amount: payableAmount
  //         }
  //       },
  //     });




  //   }
  //   setFormRecordLoading(true)
  // };

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    maxDate: new Date(),
    minDate: null,
  };




  const handleBackBill = () => {
    dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })

    setShowRecurringBillForm(false);
    setReceiptFormShow(false);
    setShowAllBill(true);
    setEditvalue("");
    setReceiptEdit(false);
    setCustomerName("");
    setStartDate("");
    setEndDate("");
    setInvoiceDate("");
    setInvoiceDueDate("");
    // setNewRows([]);

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












  const handleDisplayInvoiceDownload = (isVisible) => {
    setDownloadInvoice(isVisible);
    setStatusfilter(false)
    setSearch(false)
    // setSelectedInvoiceId(rowData.invoiceId);
  };


  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }

  }, [state.InvoiceList.statusCodeNewReceiptStatusCode])


  useEffect(() => {
    if (hostelId) {
      dispatch({ type: "BANKINGLIST", payload: hostelId });
    }
  }, [hostelId]);

  // useEffect(() => {
  //   if (state.bankingDetails.statusCodeForGetBanking === 200) {
  //     // setBanking(state.bankingDetails.bankingList.banks);
  //     setTimeout(() => {
  //       dispatch({ type: "CLEAR_BANKING_LIST" });
  //     }, 200);
  //   }
  // }, [state.bankingDetails.statusCodeForGetBanking]);

  useEffect(() => {
    if (state.InvoiceList.payapleAmountError) {
      // setFormRecordLoading(false)
      // setFormLoading(false)
      setLoading(false)
      // setPayableAmountError(state.InvoiceList.payapleAmountError)

    }

  }, [state.InvoiceList.payapleAmountError])


  useEffect(() => {
    if (state.InvoiceList?.unableAddInvoiceDetailsError) {
      // setFormLoading(false)
      setLoading(false)
      // setUnableAddInvoiceDetailsError(state.InvoiceList.unableAddInvoiceDetailsError)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
      }, 3000)

    }

  }, [state.InvoiceList.unableAddInvoiceDetailsError])


  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
      // setPayableAmount("")
      // setBalance("")
      // setTransactionId('')
      setSelectedDate(null);
      // setFormRecordLoading(false)
      setShowform(false)
      dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })


      // dispatch({ type: "RECEIPTSLIST", payload: hostelId });

      setTimeout(() => {
        dispatch({ type: "CLEAR_RECORD_PAYMENT" });
      }, 300);
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);











  useEffect(() => {
    if (
      state.InvoiceList.InvoiceListStatusCode === 200 ||
      state.InvoiceList.statusCodeForPDf === 200 ||
      state.InvoiceList.statusCodeForReceiptPDf === 200
    ) {
      setLoading(false)
      setShowLoader(false);
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



  const sendWhatsAppMessage = async (type) => {
    const isInvoice = type === "invoice";

    const pdfUrl = isInvoice ? state.InvoiceList.invoicePDF : state.InvoiceList.ReceiptPDF;
    const statusCode = isInvoice ? state.InvoiceList?.statusCodeForPDf : state.InvoiceList?.statusCodeForReceiptPDf;
    const isWhatsAppEnabled = state.InvoiceList.whatsappSettings?.[isInvoice ? 1 : 2];
    const receiptData = isInvoice
      ? state.InvoiceList.BillsPdfDetails
      : state.InvoiceList.newReceiptchanges?.receipt ?? state.InvoiceList.BillsPdfDetails;

    if (statusCode === 200 && pdfUrl && state.InvoiceList.triggeredBy === "whatsapp") {
      setShowLoader(false);

      if (!isWhatsAppEnabled) {
        Swal.fire({
          icon: "info",
          text: `WhatsApp notification for ${isInvoice ? "Bills" : "Deposit Receipt"} is not enabled. Please enable it in Settings > Notifications.`,
        });
        return;
      }

      setLoading(true);

      try {
        const parsedUrl = new URL(pdfUrl);
        const filename = parsedUrl.pathname.slice(1);
        const userName = receiptData?.user_details?.name || '';
        let userPhone = receiptData?.user_details?.phone?.toString() || '';

        if (!userPhone.startsWith("+91")) {
          userPhone = userPhone.startsWith("91") ? "+" + userPhone : "+91" + userPhone;
        }

        const response = await AxiosConfig.post("/send-whatsapp", {
          to: userPhone,
          templateName: "invoice_notification",
          parameters: [userName, filename],
        });

        if (response.data.statusCode === 200) {
          Swal.fire({
            icon: "success",
            text: response.data.message,
          });
        } else {
          Swal.fire({
            icon: "warning",
            text: "Unexpected response from server.",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response?.data?.error || "Failed to send WhatsApp message",
        });
      } finally {
        setLoading(false);
      }

      dispatch({ type: isInvoice ? "CLEAR_INVOICE_PDF_STATUS_CODE" : "CLEAR_RECEIPT_PDF_STATUS_CODE" });
    } else if (statusCode === 200 && pdfUrl) {
      const pdfWindow = window.open("", "_blank");
      if (pdfWindow) {
        pdfWindow.location.href = pdfUrl;
      }
      dispatch({ type: isInvoice ? "CLEAR_INVOICE_PDF_STATUS_CODE" : "CLEAR_RECEIPT_PDF_STATUS_CODE" });
    }
  };



  useEffect(() => {
    sendWhatsAppMessage("invoice");
  }, [state.InvoiceList?.statusCodeForPDf, state.InvoiceList.triggeredBy, state.InvoiceList.whatsappSettings]);

  useEffect(() => {
    sendWhatsAppMessage("receipt");
  }, [state.InvoiceList?.statusCodeForReceiptPDf, state.InvoiceList.triggeredBy, state.InvoiceList.whatsappSettings]);

  useEffect(() => {
    if (selectedUserId) {
      const filteredDetails = state.UsersList?.Users?.listCustomers?.find(
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

  }, [selectedUserId, state.UsersList?.Users.listCustomers, state.InvoiceList?.Invoice]);


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
    if (state.InvoiceList.manualInvoiceAddStatusCode === 201) {
      navigate(`/invoice/${state.login.selectedHostel_Id}`)
      // setShowManualInvoice(false)
      // setFormLoading(false)
      setShowRecurringBillForm(false);
      setReceiptFormShow(false);
      setShowAllBill(true);
      setCustomerName("");
      // setInvoiceNumber("");
      setStartDate("");
      setEndDate("");
      setInvoiceDate("");
      setInvoiceDueDate("");
      // setTotalAmount("");

      // setNewRows([]);
      dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });

      }, 300);
    }
  }, [state.InvoiceList.manualInvoiceAddStatusCode]);

  useEffect(() => {
    setBills(state.InvoiceList.ManualInvoices);

  }, [state.InvoiceList.ManualInvoices,])







  useEffect(() => {
    if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
      // setShowManualInvoice(false)
      // setFormLoading(false)
      setShowRecurringBillForm(false);
      setReceiptFormShow(false);
      setShowAllBill(true);
      dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });

        setBills(state.InvoiceList.ManualInvoices);
      }, 100);
    }
  }, [
    state.InvoiceList.manualInvoiceEditStatusCode,
    state.InvoiceList.ManualInvoices,
  ]);
  useEffect(() => {
    if (state.InvoiceList.manualInvoiceDeleteStatusCode === 200) {
      dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE" });

        setBills(state.InvoiceList.ManualInvoices);
      }, 100);
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















  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };



  useEffect(() => {
    if (!state.login?.selectedHostel_Id) return;

    const delay = setTimeout(() => {
      const filters = {};
      if (filterInput && filterInput.trim().length > 0) {
        filters.search = filterInput.trim();
      }


      if (statusfilter && statusfilter.value !== "ALL") {
        filters.paymentStatus = [statusfilter.value];
      }

      dispatch({
        type: "INVOICESLISTFILTER",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: Object.keys(filters).length ? filters : undefined,
        },
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [
    filterInput,
    // statusfilter,              
    state.login?.selectedHostel_Id,
  ]);





  const handleCloseSearch = () => {

    setSearch(false);
    setFilterInput("");

    dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

  };



  useEffect(() => {
    if (bills?.length > 0 && originalBills?.length === 0) {
      setOriginalBills(bills);
    }
  }, [bills]);


  const handleSearch = () => {
    setSearch(!search);
    dispatch({
      type: "SET_INVOICE_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        type: [],
        createdBy: [],
        createdByLabels: [],
        modes: [],
        paymentStatus: [],
        search: "",
      },
    })

  };









  useEffect(() => {
    if (state.createAccount?.networkError) {
      // setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])




  useEffect(() => {
    const invoiceFilters = state.InvoiceList.invoiceFilters;
    const filterData = [];


    if (invoiceFilters?.paymentStatus?.length) {
      filterData.push({
        key: "payment-status",
        label: "Status is",
        type: "paymentStatus",
        value: invoiceFilters.paymentStatus.join(", "),
      });
    }


    if (invoiceFilters?.type?.length) {
      filterData.push({
        key: "type",
        label: "Type is",
        type: "type",
        value: invoiceFilters.type.join(", "),
      });
    }


    if (invoiceFilters?.modes?.length) {
      filterData.push({
        key: "modes",
        label: "Mode is",
        type: "modes",
        value: invoiceFilters.modes.join(", "),
      });
    }


    if (invoiceFilters?.createdByLabels?.length) {
      filterData.push({
        key: "created-by",
        label: "Created By",
        type: "createdBy",
        value: invoiceFilters.createdByLabels.join(", "),
      });
    }


    if (invoiceFilters?.startDate || invoiceFilters?.endDate) {
      filterData.push({
        key: "date-range",
        label: "Date Range is",
        type: "date",
        value:
          invoiceFilters.startDate && invoiceFilters.endDate
            ? `${invoiceFilters.startDate} - ${invoiceFilters.endDate}`
            : invoiceFilters.startDate || invoiceFilters.endDate,
      });
    }


    if (invoiceFilters?.search) {
      filterData.push({
        key: "search",
        label: "Tenant",
        type: "search",
        value: invoiceFilters.search,
      });
    }

    setChips(filterData);
  }, [state.InvoiceList.invoiceFilters]);


  useEffect(() => {
    return () => {

      dispatch({
        type: "SET_INVOICE_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          type: [],
          createdBy: [],
          createdByLabels: [],
          modes: [],
          paymentStatus: [],
          search: "",
        },
      });
    };
  }, [state.login.selectedHostel_Id]);

  const handleReset = () => {
    dispatch({
      type: "SET_INVOICE_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        type: [],
        createdBy: [],
        createdByLabels: [],
        modes: [],
        paymentStatus: [],
        search: "",
      },
    })


    dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })
  }


  const headerStyle = {
    textAlign: "start",
    fontFamily: "Gilroy",
    color: "rgb(147, 147, 147)",
    fontSize: 14,
    fontWeight: 500,
    lineHeight: "1.4",
    padding: 8,
    verticalAlign: "middle",
  };


  const labelStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "start",
    height: "100%",
    lineHeight: "1.4", marginTop: 5
  };



  return (
    <div className="sticky-top bg-white" >
      {
        showBillsFilter && <BillsFilter show={showBillsFilter} handleClose={handleCloseFilterBills} />
      }

      {showAllBill && (
        <Row className="p-0" style={{ width: "100%", }}>
          <Col className="p-0"
            lg={12}
            md={12}
            sm={12}
            xs={12}
          >
            <div
              className="ms-auto sticky-top bg-white"
              style={{
                zIndex: 0,
                height: 'auto',
                paddingBottom: 0,
                borderBottom: "none",
                boxShadow: "initial"
              }}
            >
              <div className="d-flex justify-content-between align-items- flex-wrap">
                <div className="ms-3" style={{
                  marginTop: 12,
                }}>
                  <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Bills</label>
                </div>


                {showLoader && <LoaderComponent />}
                {loading && <LoaderComponent />}
                <div className="d-flex flex-wrap align-items-center gap-2" style={{ paddingLeft: 25 }}>

                  <div className={` d-flex align-items-center`} >
                    {search ? (
                      <>
                        <div className="position-relative" style={{ minWidth: 160, maxWidth: 250, zIndex: 3000, position: "relative" }}>
                          <div
                            className="input-group p-0"
                            style={{ marginRight: 20, paddingTop: "25px", marginTop: 12 }}
                          >
                            <span className="input-group-text bg-white border-end-0" >
                              <Image
                                src={searchteam}
                                style={{
                                  height: 15, width: 15, cursor: canReadInvoice ? "pointer" : "not-allowed",
                                  opacity: canReadInvoice ? 1 : 0.4,
                                  pointerEvents: canReadInvoice ? "auto" : "none",
                                  transition: "opacity 0.3s ease"
                                }}
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
                                fontFamily: "Gilroy", padding: "8px 10px"
                              }}
                              value={filterInput}
                              onChange={(e) => handlefilterInput(e)}
                              disabled={!canReadInvoice}
                            />
                            <span className="input-group-text bg-white border-start-0">
                              <img
                                src={closecircle}
                                alt="close"
                                onClick={() => handleCloseSearch()}

                                style={{ height: 20, width: 20, cursor: "pointer" }}
                              />
                            </span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div style={{
                          marginTop: 12, backgroundColor: "", color: "", border: "1px solid #CBD5E1", borderRadius: "50%",
                          padding: "6px 8px", lineHeight: "normal", height: "fit-content"
                        }}>
                          <FiSearch
                            style={{
                              height: "20px",
                              width: "20px",
                              cursor: canReadInvoice ? "pointer" : "not-allowed",
                              opacity: canReadInvoice ? 1 : 0.4,
                              pointerEvents: canReadInvoice ? "auto" : "none",
                              transition: "opacity 0.3s ease"
                            }}
                            onClick={handleSearch}
                          />
                        </div>
                      </>
                    )}









                  </div>




                  <div className="text-center" style={{}} >

                    <Button className="d-flex justify-content-center"
                      disabled={!canWriteInvoice}
                      onClick={handleManualShow}
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: DownloadInvoice ? "16px" : "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: DownloadInvoice ? "6px 12px" : "8px 8px",
                        marginTop: DownloadInvoice ? 0 : 12,
                        whiteSpace: "nowrap",
                        minWidth: DownloadInvoice ? "50px" : "150px",
                        textAlign: "center",
                      }}
                    >
                      {DownloadInvoice ? "+ " : "+ Create Bill"}
                    </Button>




                  </div>
                </div>
                {/* </div> */}
              </div>
            </div>

            <div className="">

              <div

              >

                <div className="d-flex justify-content-start ms-3 pe-2 align-items-center mt-2">


                  <div className="d-flex gap-3 align-items-center">

                    <>
                      <div
                        className=""
                        style={{
                          border: "1px solid #D4D4D4",
                          borderRadius: 8,
                          width: 150,
                          zIndex: 9999,
                        }}
                      >
                        <Select
                          options={selectOptions}
                          styles={CustomStyles}
                          disabled={!canReadInvoice}
                          onChange={(e) => handleStatusFilter(e)}
                          value={selectOptions.find(
                            (opt) => opt.value === statusfilter
                          )}
                          aria-label="Select"
                          className=""
                          id="statusselect"


                        />



                      </div>



                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "center",
                          zIndex: 9999,
                        }}
                      >
                        <Select
                          options={monthOptions}
                          value={selectedMonth}
                          onChange={handleMonthChange}
                          classNamePrefix="custom"
                          menuPlacement="auto"
                          noOptionsMessage={() => "No options"}
                          styles={CustomStyles}

                        />





                      </div>

                      <div
                        className=" d-flex"
                        style={{
                          border: "1px solid #CBD5E1",
                          backgroundColor: "white",
                          borderRadius: "50%",
                          padding: 10, cursor: canReadInvoice ? "pointer" : "not-allowed",
                        }}
                        onClick={() => canReadInvoice && handleShowFilterBills()}
                      >
                        <Filter size={18} style={{
                          cursor: canReadInvoice ? "pointer" : "not-allowed",
                          opacity: canReadInvoice ? 1 : 0.4,
                          pointerEvents: canReadInvoice ? "auto" : "none",
                          transition: "opacity 0.3s ease"
                        }} />
                      </div>
                    </>


                  </div>
                </div>
              </div>

              <div

                className='show-scrolls'
                style={{

                  height: chips.length > 0 ? "500px" : "",
                  overflowY: chips.length > 0 ? "auto" : "none",
                  overflowX: "hidden",

                }}
              >

                {


                  chips.length > 0 && (
                    <div
                      className="me-3 ms-3 mt-3"
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 12,
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: "#F9FAFB",
                        border: "1px solid #E5E7EB",
                        fontFamily: "Gilroy, sans-serif",
                      }}
                    >
                      <div style={{
                        display: "flex",
                        gap: 8,
                        flex: 1,
                        flexWrap: "wrap",
                        overflowX: "hidden",
                        overflowY: "auto",
                        whiteSpace: "wrap",
                        minWidth: 0,


                      }}>
                        {chips.map((chip) => (
                          <div
                            key={chip.key}

                          >
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "6px 12px",
                                background: "#EEF2FF",
                                borderRadius: 999,
                                fontSize: 12,
                                fontWeight: 500,
                                color: "#1F2937",
                                border: "1px solid #E0E7FF", flexShrink: 0,
                              }}

                            >{chip.label} :
                              <span style={{

                                fontSize: 12,
                                fontWeight: 500,
                                color: "#16151C",
                              }}>{chip.value}</span></span>

                          </div>
                        ))}
                      </div>

                      <span
                        onClick={() => handleReset()}

                        style={{
                          color: "#1E45E1",
                          fontSize: 13,
                          fontWeight: 500,
                          cursor: "pointer",
                        }}
                      >
                        Reset
                      </span>
                    </div>
                  )

                }


                {!canReadInvoice ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 90
                      }}
                    >

                      <img
                        src={Emptystate}
                        alt="Empty State"

                      />



                      <ErrorMessage message={['You do not have access to view Invoice']} type="warning" />

                    </div>
                  </>
                ) : (
                  <div
                    className=""
                    style={{ position: "relative", }}
                  >




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
                            <Button disabled
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
                              {/* Delete */} Coming Soon
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </div>
                    )}

                    <div className={`p-0 table-bills  "mt-0" `}>
                      <Row
                        className={` 
                          "m-0 g-0"
                          }`}
                      >
                        <Col
                          lg={12}
                          md={12}
                          sm={12}
                          xs={12}
                        >

                          <>
                            {sortedData && sortedData.length > 0 ? (

                              <div
                                className=" ms-3"
                                style={{ overflowx: "hidden", }}
                              >
                                <div

                                  className='show-scrolls'
                                  style={{

                                    height: sortedData?.length >= 12 ? "500px" : "auto",
                                    overflowY: "auto",
                                    borderTop: "1px solid #E8E8E8",
                                    marginTop: "5px",
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
                                    className="mb-0"
                                  >
                                    <thead style={{
                                      fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                      top: 0,
                                      zIndex: 1,
                                    }}>
                                      <tr className="">
                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle}>

                                            Invoice Number</label>
                                        </th>
                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle}>

                                            Name</label>
                                        </th>

                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle}>

                                            Type</label>
                                        </th>
                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle}>
                                            Invoice Date</label>
                                        </th>
                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle}>
                                            Due Date</label>
                                        </th>
                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle}>
                                            Amount</label>
                                        </th>
                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle} >
                                            Due</label>
                                        </th>
                                        <th
                                          style={headerStyle}
                                        >
                                          <label style={labelStyle}>

                                            Status</label>
                                        </th>
                                        <th
                                          style={headerStyle}
                                        > <label style={labelStyle}>Action</label></th>
                                      </tr>
                                    </thead>

                                    <tbody style={{ fontSize: "10px", minHeight: "200px", position: "relative" }}>

                                      <PaginationList>
                                        {sortedData.map((item, index) => (
                                          <InvoiceTable
                                            key={item.id}
                                            item={item}
                                            index={index}
                                            OnHandleshowform={handleShowForm}
                                            OnHandleshowEditform={handleEdit}
                                            OnHandleshowInvoicePdf={handleInvoiceDetail}
                                            OnHandleshowDeleteform={handleBillDelete}
                                            DisplayInvoice={handleDisplayInvoiceDownload}
                                          />
                                        ))}
                                      </PaginationList>

                                    </tbody>


                                  </Table>



                                </div>

                              </div>
                            ) : (

                              !loading &&
                              sortedData &&
                              sortedData?.length === 0 && (

                                <div className="mt-2 flex justify-center">
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
                                      fontSize: 18,
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
                                      fontSize: 14,
                                      color: "rgba(75, 75, 75, 1)",
                                    }}
                                  >
                                    There are no bills added{" "}
                                  </div>
                                  </div>
                                </div>
                              )
                            )}


                          </>

                        </Col>


                      </Row>
                    </div>




                  </div>
                )}

              </div>


            </div>



          </Col>



        </Row>
      )}




      {state.InvoiceList.unableAddInvoiceDetailsError ?
        <div className="d-flex justify-content-center mt-5">

          <ErrorMessage message={state.InvoiceList.unableAddInvoiceDetailsError} type="error" />
        </div>
        : null}

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



      {showform && (
        <RecordPayment show={showform} handleClose={handleCloseForm} selectedUserId={selectedUserId} invoiceValue={invoiceValue} invoiceList={invoiceList} />

      )}
    </div>
  );
};
InvoicePage.propTypes = {
  item: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default withErrorBoundary(InvoicePage);
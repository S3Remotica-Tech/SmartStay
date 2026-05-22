/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FormControl } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import {
  Setting3,
  Buildings,
  SearchNormal1,
  ArrowDown2,
  ArrowDown,
  ArrowSwapVertical,
} from "iconsax-react";
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
import "../OthersComponent/BillPdfModal.css";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import { useNavigate } from "react-router-dom";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import BillsFilter from "../../Pages/Bills/BillsFilter";
import { FiSearch } from "react-icons/fi";
import RecordPayment from "./RecordPayment";
import { useLocation } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import Cell from "../../Assets/Images/New_images/Cell.svg";
import listview from "../../Assets/Images/New_images/listview-rectangle.svg";
import NoData from "../../Assets/v2Images/NoData.svg";
import DataSearch from "../../Assets/v2Images/DataSearch.svg";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";

const InvoicePage = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [invoiceList, setInvoiceList] = useState({
    balanceDue: "",
    invoiceId: "",
    invoiceDate: "",
  });
  const [showLoader, setShowLoader] = useState(false);
  const [statusfilter, setStatusfilter] = useState("ALL");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [customername, setCustomerName] = useState("");
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [invoicedate, setInvoiceDate] = useState(null);
  const [invoiceduedate, setInvoiceDueDate] = useState(null);

  const [bills, setBills] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const startRef = useRef(null);
  const endRef = useRef(null);
  const invoiceRef = useRef(null);
  const dueRef = useRef(null);
  const [showRecurringBillForm, setShowRecurringBillForm] = useState(false);
  const [receiptformShow, setReceiptFormShow] = useState(false);
  const [showAllBill, setShowAllBill] = useState(true);

  const [showform, setShowform] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [DownloadInvoice, setDownloadInvoice] = useState(false);
  const [showdeleteform, setShowDeleteform] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [filterInput, setFilterInput] = useState("");

  const [search, setSearch] = useState(false);
  const [hostelId, setHostelId] = useState("");
  const [chips, setChips] = useState([]);

  const isSearching = chips.length > 0 || filterInput?.trim() !== "";

  const [originalBills, setOriginalBills] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("List");

  const tableContainerRef = useRef(null);
  const listRef = useRef(null);
  const lastScrollLeftRef = useRef(0);

  const Options = [
    { key: "Invoice Number", label: "Invoice Number" },
    { key: "Name", label: "Name" },
    { key: "Type", label: "Type" },
    { key: "Invoice Date", label: "Invoice Date" },
    { key: "Due Date", label: "Due Date" },
    { key: "Amount", label: "Amount" },
    { key: "Due", label: "Due" },
    { key: "Status", label: "Status" },
    { key: "Action", label: "Action" },
    { key: "Floor Room", label: "Floor Room" },
    { key: "Bed", label: "Bed" },
    { key: "Joining Date", label: "Joining Date" },
    { key: "Contact Number", label: "Contact Number" },
    { key: "Email ID", label: "Email ID" },
  ];

  const [customizeItems, setCustomizeItems] = useState(Options);
  const allSelected = customizeItems.every((i) => i.checked);

  const ListOptions = [
    { key: "List View", label: "List", img: Setting3 },
    { key: "Room View", label: "Room", img: Buildings },
  ];

  useEffect(() => {
    const container = tableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const current = container.scrollLeft;
      if (current === 0) {
        setIsScrolling(false);
        lastScrollLeftRef.current = current;
        return;
      }

      if (Math.abs(current - lastScrollLeftRef.current) < 2) {
        return;
      }
      if (current > lastScrollLeftRef.current) {
        setIsScrolling(true);
      } else {
        setIsScrolling(true);
      }

      lastScrollLeftRef.current = current;
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.key });

    const style = {
      // transform: CSS.Transform.toString(transform),
      transform: transform ? CSS.Transform.toString(transform) : undefined,
      transition,
    };

    return (
      <label
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-3 text-sm cursor-pointer bg-white"
      >
        <span {...attributes} {...listeners}>
          <IoMdMenu className="text-[#28303F] text-xl cursor-grab" />
        </span>

        <input
          type="checkbox"
          defaultChecked={item.checked}
          className="w-4 h-4 accent-[#1E45E1] rounded"
          onChange={() => {
            setCustomizeItems((prev) =>
              prev.map((i) =>
                i.key === item.key ? { ...i, checked: !i.checked } : i,
              ),
            );
          }}
        />

        <span className="text-[#101828]">{item.label}</span>
      </label>
    );
  };

  const { canWriteModule: canWriteInvoice, canReadModule: canReadInvoice } =
    useHasPermission("Bills");

  useEffect(() => {
    if (!canReadInvoice) {
      setLoading(false);
    }
  }, [canReadInvoice]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  const [showBillsFilter, setShowBillsFilter] = useState(false);

  const handleShowFilterBills = () => {
    setShowBillsFilter(true);

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

  const handleCloseFilterBills = () => {
    setShowBillsFilter(false);
  };

  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];

  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (listRef.current && !listRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setPage(1);
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({ type: "BANKINGLIST", payload: state.login.selectedHostel_Id });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;

    dispatch({
      type: "INVOICESLISTFILTER",
      payload: { hostelId: state.login.selectedHostel_Id },
    });
    setLoading(false);
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.InvoiceList.CustomerRecurringEnableDisableStatusCode === 200) {
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: state.login?.selectedHostel_Id,
      });
      setLoading(true);
      dispatch({ type: "REMOVE_CUSTOMER_RECURRING_ENABLE_DISABLE" });
    }
  }, [state.InvoiceList.CustomerRecurringEnableDisableStatusCode]);

  useEffect(() => {
    if (bills.length === 0) {
      setLoading(false);
    }
  }, [bills]);

  useEffect(() => {
    if (state.InvoiceList.ManualInvoicesgetstatuscode === 200) {
      setBills(state.InvoiceList.ManualInvoices);
      // setOriginalBillsFilter(state.InvoiceList.ManualInvoices)
      setOriginalBills(state.InvoiceList.ManualInvoices);
      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.ManualInvoicesgetstatuscode]);

  useEffect(() => {
    if (state.InvoiceList.billsListStatusCode === 200) {
      setShowBillsFilter(false);
      setLoading(false);
      setBills(state.InvoiceList.billsList?.listInvoices);
      // setOriginalBillsFilter(state.InvoiceList.billsList?.listInvoices)
      setOriginalBills(state.InvoiceList.billsList?.listInvoices);
      setTimeout(() => {
        setLoading(false);
        dispatch({ type: "REMOVE_INVOICES_LIST_FILTER" });
      }, 100);
    }
  }, [state.InvoiceList.billsListStatusCode]);

  useEffect(() => {
    setLoading(false);
    // setRecurLoader(false)
  }, [
    state.InvoiceList.ManualInvoices,
    state.InvoiceList.billsList?.listInvoices,
    state.InvoiceList.RecurringBills,
  ]);

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
      toast.error("Please add a hostel before adding bill information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    setShowAllBill(false);
    // setShowManualInvoice(true);
    // setBillMode("New Bill");
    // setIsEditing(false);
    // setInvoiceDetails(null);
    navigate("/create-bill");
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
    ...(state.InvoiceList?.billsList?.filterOptions?.paymentStatus?.map(
      (item) => ({
        label: item.name,
        value: item.type,
      }),
    ) || []),
  ];

  const handleInvoiceDetail = (rowData) => {
    if (rowData.invoiceId) {
      dispatch({
        type: "INVOICEPDF",
        payload: {
          hostelId: rowData.hostelId,
          invoiceId: rowData.invoiceId,
        },
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (state.InvoiceList?.statusCodeForPDf === 200) {
      const pdfUrl = state.InvoiceList?.invoicePDF;
      if (!pdfUrl) return;
      setLoading(false);
      setShowLoader(false);
      window.open(pdfUrl, "_blank");
      dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  // useEffect(() => {
  //   if (!state.InvoiceList?.invoicePDF) return;
  //   if (pdfOpenedRef.current) return;

  //   pdfOpenedRef.current = true;
  //   setLoading(false);
  //   setShowLoader(false);
  //   window.open(state.InvoiceList.invoicePDF, "_blank");

  //   dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
  // }, [state.InvoiceList?.invoicePDF]);

  useEffect(() => {
    if (state.InvoiceList.pdfErrorMessage) {
      setLoading(false);
      setShowLoader(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_PDF_ERROR" });
      }, 100);
    }
  }, [state.InvoiceList.pdfErrorMessage]);
  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
      setShowLoader(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 100);
    }
  }, [state.createAccount?.networkError]);

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
    control: (base, state) => ({
      ...base,
      minHeight: "32px",
      height: "32px",
      width: "100%",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "12px",
      fontFamily: "Gilroy, sans-serif",
      fontWeight: 500,
      boxShadow: "none",

      cursor: state.isDisabled ? "not-allowed" : "pointer",
      backgroundColor: state.isDisabled
        ? "#F3F4F6"
        : state.hasValue
          ? "#F4F4F4"
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
        fontSize: 13,
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
      height: "32px",
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
    });
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
    } else {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          filters: {
            paymentStatus: [selectedOption.value],
            search: filterInput,
          },
        },
      });
    }
  };

  const [editvalue, setEditvalue] = useState("");
  const [receiptedit, setReceiptEdit] = useState(false);

  const handleEdit = (props) => {
    navigate("/create-bill", {
      state: {
        billData: props,
      },
    });
    setShowAllBill(false);
  };

  const isBillsForm = location.state?.isBillsForm || false;

  useEffect(() => {
    if (isBillsForm) {
      navigate("/create-bill");
    }
  }, [isBillsForm]);

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
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: customername },
      });
    }
  }, [customername]);

  const handleShowForm = (props) => {
    setShowform(true);
    // setInvoiceValue(props.item);
    if (props.item.invoiceId !== undefined) {
      setSelectedUserId(props.item.customerId);
      setInvoiceList({
        balanceDue: props.item?.dueAmount === 0 ? "00" : props.item?.dueAmount,
        invoiceId: props.item?.invoiceId,
        invoiceDate: props.item.invoiceDate,
      });
    } else {
      setSelectedUserId("");
    }
  };

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

    dispatch({ type: "CLEAR_PAYABLE_AMOUNT" });
    dispatch({ type: "CLEAR_INVALID_DETAILS_ERROR" });
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    setInvoiceList({
      balanceDue: "",
      invoiceId: "",
      invoiceDate: "",
    });
    // setSelectedDate(null);
  };

  const handleCloseDeleteform = () => {
    setShowDeleteform(false);
  };

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    maxDate: new Date(),
    minDate: null,
  };

  const handleBackBill = () => {
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });

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

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedData.map((item) => item.invoiceId);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };

  const CustomStartDateInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="date-input-container w-100 relative" onClick={onClick}>
        <FormControl
          type="text"
          value={value || "DD/MM/YYYY"}
          readOnly
          ref={ref}
          className={`date_input w-full h-[50px] border border-[#D9D9D9] rounded-lg p-[9px] text-sm font-gilroy ${
            value ? "font-semibold" : "font-medium"
          } bg-white cursor-pointer shadow-none box-border`}
        />
        <img
          src={Calendars}
          className="w-6 h-6 ml-2.5 right-2.5 cursor-pointer absolute top-1/2 -translate-y-1/2"
          alt="Calendar"
          onClick={onClick}
        />
      </div>
    );
  });
  CustomStartDateInput.displayName = "CustomStartDateInput";

  const CustomEndDateInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="date-input-container w-100 relative" onClick={onClick}>
        <FormControl
          type="text"
          value={value || "DD/MM/YYYY"}
          readOnly
          ref={ref}
          className={`date_input w-full h-12 border border-gray-300 rounded-lg p-2.5 text-sm font-gilroy ${
            value ? "font-semibold" : "font-medium"
          } bg-white cursor-pointer box-border shadow-none`}
        />
        <img
          src={Calendars}
          className="w-6 h-6 ml-2.5 right-2.5 cursor-pointer absolute top-1/2 -translate-y-1/2"
          alt="Calendar"
          onClick={onClick}
        />
      </div>
    );
  });

  CustomEndDateInput.displayName = "CustomEndDateInput";

  const CustomInvoiceDateInput = React.forwardRef(({ value, onClick }, ref) => {
    return (
      <div className="date-input-container w-100 relative" onClick={onClick}>
        <FormControl
          type="text"
          value={value || "DD/MM/YYYY"}
          readOnly
          ref={ref}
          className={`date_input w-full h-12 border border-gray-300 rounded-lg p-2.5 text-sm font-gilroy ${
            value ? "font-semibold" : "font-medium"
          } bg-white cursor-pointer box-border shadow-none`}
        />
        <img
          src={Calendars}
          className="w-6 h-6 ml-2.5 right-2.5 cursor-pointer absolute top-1/2 -translate-y-1/2"
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
        <div className="date-input-container w-100 relative" onClick={onClick}>
          <FormControl
            type="text"
            value={value || "DD/MM/YYYY"}
            readOnly
            ref={ref}
            className={`date_input w-full h-12 border border-gray-300 rounded-lg p-2.5 text-sm font-gilroy ${
              value ? "font-semibold" : "font-medium"
            } bg-white cursor-pointer box-border shadow-none`}
          />
          <img
            src={Calendars}
            className="w-6 h-6 ml-2.5 right-2.5 cursor-pointer absolute top-1/2 -translate-y-1/2"
            alt="Calendar"
            onClick={onClick}
          />
        </div>
      );
    },
  );

  CustomInvoiceDueDateInput.displayName = "CustomInvoiceDueDateInput";

  const handleDisplayInvoiceDownload = (isVisible) => {
    setDownloadInvoice(isVisible);
    setStatusfilter(false);
    setSearch(false);
    // setSelectedInvoiceId(rowData.invoiceId);
  };

  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }
  }, [state.InvoiceList.statusCodeNewReceiptStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceUnpaidStatusCode === 200) {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: {
          hostelId: state.login.selectedHostel_Id,
        },
      });

      dispatch({ type: "REMOVE_MANUAL_BILL_UPDATE_UNPAID_REDUCER" });
    }
  }, [state.InvoiceList.manualInvoiceUnpaidStatusCode]);

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
      setLoading(false);
      // setPayableAmountError(state.InvoiceList.payapleAmountError)
    }
  }, [state.InvoiceList.payapleAmountError]);

  useEffect(() => {
    if (state.InvoiceList?.unableAddInvoiceDetailsError) {
      // setFormLoading(false)
      setLoading(false);
      // setUnableAddInvoiceDetailsError(state.InvoiceList.unableAddInvoiceDetailsError)
      setTimeout(() => {
        dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
      }, 3000);
    }
  }, [state.InvoiceList.unableAddInvoiceDetailsError]);

  useEffect(() => {
    if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
      // setPayableAmount("")
      // setBalance("")
      // setTransactionId('')
      setSelectedDate(null);
      // setFormRecordLoading(false)
      setShowform(false);
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      // dispatch({ type: "RECEIPTSLIST", payload: hostelId });

      // setTimeout(() => {
      //   dispatch({ type: "CLEAR_RECORD_PAYMENT" });
      // }, 300);
    }
  }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);

  useEffect(() => {
    if (
      state.InvoiceList.InvoiceListStatusCode === 200 ||
      state.InvoiceList.statusCodeForPDf === 200 ||
      state.InvoiceList.statusCodeForReceiptPDf === 200
    ) {
      setLoading(false);
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

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceAddStatusCode === 201) {
      navigate(`/invoice/${state.login.selectedHostel_Id}`);
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
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });
      }, 300);
    }
  }, [state.InvoiceList.manualInvoiceAddStatusCode]);

  useEffect(() => {
    setBills(state.InvoiceList.ManualInvoices);
  }, [state.InvoiceList.ManualInvoices]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
      // setShowManualInvoice(false)
      // setFormLoading(false)
      setShowRecurringBillForm(false);
      setReceiptFormShow(false);
      setShowAllBill(true);
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

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
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

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
    if (state?.Booking?.applyinvoiceSuccessCode === 201) {
      dispatch({
        type: "INVOICESLISTFILTER",
        payload: { hostelId: state.login.selectedHostel_Id },
      });

      dispatch({ type: "REMOVE_APPLY_INVOICE_REDUCER" });
    }
  }, [state?.Booking?.applyinvoiceSuccessCode]);

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

    dispatch({
      type: "INVOICESLISTFILTER",
      payload: { hostelId: state.login.selectedHostel_Id },
    });
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
    });
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      // setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

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
    });

    dispatch({
      type: "INVOICESLISTFILTER",
      payload: { hostelId: state.login.selectedHostel_Id },
    });
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = sortedData.slice(startIndex, endIndex);

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const stats = [
    {
      label: "Total Outstanding Receivables",
      value: "0",
      icon: true,
      highlight: true,
    },
    {
      label: "Total Invoices",
      value: "0",
    },
    {
      label: "Collected This Month",
      value: "0",
    },
    {
      label: "Due Today",
      value: "0",
    },
    {
      label: "Overdue Amount",
      value: "0",
    },
  ];

  return (
    <div className="bg-white font-gilroy">
      {showAllBill && (
        <div className="w-full p-0">
          <div className="flex items-center justify-between sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px]">
            <div className="flex lg:justify-start justify-center items-center flex-wrap">
              <label className="text-lg text-black font-semibold font-gilroy">
                Invoice
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center">
                <div className="relative min-w-[180px] max-w-[260px]">
                  <div
                    className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
    ${
      canReadInvoice
        ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
        : "border-gray-200 opacity-60 cursor-not-allowed"
    }`}
                  >
                    <input
                      type="text"
                      className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF]"
                      placeholder="Search"
                      value={filterInput}
                      onChange={(e) => handlefilterInput(e)}
                      disabled={!canReadInvoice}
                    />
                    <SearchNormal1
                      size="18"
                      color={canReadInvoice ? "#6B7280" : "#A0A0A0"}
                      className="mr-2"
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button
                  disabled={!canWriteInvoice}
                  onClick={handleManualShow}
                  className="flex justify-center rounded-lg !font-gilroy text-white !bg-[#1E45E1] px-4 py-1 min-w-[95px] mr-2"
                >
                  {DownloadInvoice ? "+ " : "+ Create Invoice"}
                </Button>
              </div>
            </div>
          </div>
          {!canReadInvoice ? (
            <PermissionDeniedMessage />
          ) : (
            <>
              <div className="w-full my-2 bg-[#F9F9F9] rounded-xl px-4 sm:px-6 py-3 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 font-gilroy">
                {stats.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.highlight && (
                      <div className="w-10 h-10 rounded-full bg-[#FFEFE5] flex items-center justify-center text-[#F97316] font-semibold">
                        {item.icon && (
                          <ArrowDown
                            color="#FF9500"
                            size="18"
                            className="rotate-[310deg]"
                          />
                        )}
                      </div>
                    )}

                    <div>
                      <div className="text-xs text-[#6B7280] flex items-center gap-1 whitespace-nowrap">
                        {item.label}

                        <div className="relative group w-fit">
                          {item.label !== "Notice Period" && (
                            <Filter
                              size="14"
                              color="#9CA3AF"
                              className="cursor-pointer"
                            />
                          )}

                          <div
                            className="absolute left-1/2 -translate-x-1/2 mt-2 
              hidden group-hover:flex
              px-3 py-1.5 bg-[#4B5563] text-white text-xs rounded-md 
              items-center gap-1 whitespace-nowrap z-50"
                          >
                            <Filter size="14" color="#fff" />
                            Click to Filter
                          </div>
                        </div>
                      </div>

                      <div className="text-lg font-semibold text-[#111827]">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-50  bg-white h-[40px]">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="border border-gray-300 rounded-lg w-36 z-50">
                    <Select
                      options={selectOptions}
                      styles={CustomStyles}
                      disabled={!canReadInvoice}
                      onChange={(e) => handleStatusFilter(e)}
                      value={selectOptions.find(
                        (opt) => opt.value === statusfilter,
                      )}
                      id="statusselect"
                      menuPlacement="auto"
                      classNamePrefix="custom"
                    />
                  </div>

                  <div className="flex items-center gap-3 z-50">
                    <Select
                      isDisabled
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
                    className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
                    onClick={() => canReadInvoice && handleShowFilterBills()}
                  >
                    <Filter
                      size={18}
                      className={`transition-opacity duration-300 ${
                        canReadInvoice
                          ? "cursor-pointer opacity-100 pointer-events-auto"
                          : "cursor-not-allowed opacity-40 pointer-events-none"
                      }`}
                    />
                  </div>
                </div>

                <div className={` flex items-center justify-end gap-2 mr-2 `}>
                  <div className="relative">
                    <button
                      disabled
                      className="relative disabled:opacity-50 disabled:cursor-not-allowed  "
                    >
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsOpen(!isOpen);
                        }}
                        className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-1 bg-gray-100 w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {(() => {
                          const SelectedIcon = ListOptions.find(
                            (item) => item.key === view,
                          )?.img;
                          return SelectedIcon ? (
                            <SelectedIcon size="18" color="#4B4B4B" />
                          ) : null;
                        })()}

                        <span className="text-sm text-gray-700">{view}</span>

                        <ArrowDown2
                          size="16"
                          color="#4B4B4B"
                          className={`transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      {isOpen && (
                        <div
                          ref={listRef}
                          className="absolute mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-[9999]"
                        >
                          {ListOptions.map((item) => {
                            const Icon = item.img;

                            return (
                              <div
                                key={item.key}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setView(item.key);
                                  setIsOpen(false);
                                }}
                                className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                                  view === item.key
                                    ? "bg-[#F7FAFF] font-medium "
                                    : ""
                                }`}
                              >
                                <div
                                  className={`flex items-center gap-2 px-1 text-sm cursor-pointer hover:bg-gray-100 ${
                                    view === item.key
                                      ? "bg-[#F7FAFF] font-medium border-l-4 border-[#1E45E1] rounded-sm"
                                      : ""
                                  }`}
                                >
                                  <Icon size="16" color="#4B4B4B" />
                                  {item.label}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </button>

                    {isOpen && (
                      <div
                        ref={listRef}
                        className="absolute mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-md z-[9999]"
                      >
                        {ListOptions.map((item) => {
                          const Icon = item.img;

                          return (
                            <div
                              key={item.key}
                              onClick={(e) => {
                                e.stopPropagation();
                                setView(item.key);
                                setIsOpen(false);
                              }}
                              className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                                view === item.key
                                  ? "bg-[#F7FAFF] font-medium "
                                  : ""
                              }`}
                            >
                              <div
                                className={`flex items-center gap-2 px-1 text-sm cursor-pointer hover:bg-gray-100 ${
                                  view === item.key
                                    ? "bg-[#F7FAFF] font-medium border-l-4 border-[#1E45E1] rounded-sm"
                                    : ""
                                }`}
                              >
                                <Icon size="16" color="#4B4B4B" />
                                {item.label}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <div>
                    <Setting3
                      // onClick={() => setOpen(!open)}
                      className="cursor-not-allowed"
                      size="22"
                      color="#4B4B4B"
                    />
                  </div>

                  <div className="mr-2">
                    <PaginationList
                      totalItems={sortedData.length}
                      itemsPerPage={pageSize}
                      currentPage={page}
                      onPageChange={(p) => setPage(p)}
                      onPageSizeChange={(size) => setPageSize(size)}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`overflow-x-hidden ${chips.length > 0 ? "overflow-y-auto h-[32rem]" : "overflow-y-hidden h-auto"}`}
              >
                {chips.length > 0 && (
                  <div className="flex flex-wrap items-start gap-3 p-3 mx-3 mt-3 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex flex-wrap gap-2 flex-1">
                      {chips.map((chip) => (
                        <span
                          key={chip.key}
                          className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border border-blue-100 bg-blue-100 text-gray-800 flex-shrink-0"
                        >
                          {chip.label} :
                          <span className="text-gray-900">{chip.value}</span>
                        </span>
                      ))}
                    </div>
                    <span
                      className="text-blue-600 text-sm font-medium cursor-pointer"
                      onClick={handleReset}
                    >
                      Reset
                    </span>
                  </div>
                )}

                <div className="relative">
                  {sortedData && sortedData.length > 0 ? (
                    <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                      <div
                        id="tableContainer"
                        ref={tableContainerRef}
                        className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                      >
                        <table className=" w-full font-gilroy">
                          <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                            <tr className="h-9">
                              <th className="px-4 py-2.5 sticky left-0 z-50 bg-[#F9FAFB] w-[80px]">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="checkbox"
                                    className="rounded cursor-pointer"
                                    checked={
                                      selectedRows.length ===
                                        paginatedData.length &&
                                      paginatedData.length > 0
                                    }
                                    onChange={handleSelectAll}
                                  />
                                </div>
                              </th>
                              <th className="w-[230px] px-2 whitespace-nowrap ">
                                Invoice No
                              </th>
                              <th className="w-[250px] px-2">Name</th>

                              <th className="w-[230px] px-2">
                                <div className="flex items-center gap-1">
                                  TYPE
                                  <ArrowSwapVertical
                                    size="14"
                                    color="#000000"
                                  />
                                </div>
                              </th>

                              <th className="w-[230px] px-2 whitespace-nowrap">
                                INVOICE DATE
                              </th>

                              <th className="w-[230px] px-2 whitespace-nowrap">
                                <div className="flex items-center gap-1">
                                  DUE DATE
                                  <ArrowSwapVertical
                                    size="14"
                                    color="#000000"
                                  />
                                </div>
                              </th>

                              <th className="w-[230px] px-2">
                                <div className="flex items-center gap-1">
                                  AMOUNT
                                  <ArrowSwapVertical
                                    size="14"
                                    color="#000000"
                                  />
                                </div>
                              </th>

                              <th className="w-[230px] px-2">
                                <div className="flex items-center gap-1">
                                  DUE
                                  <ArrowSwapVertical
                                    size="14"
                                    color="#000000"
                                  />
                                </div>
                              </th>
                              <th className="w-[270px] px-2">Status</th>
                              <th className="w-[230px] px-2 ">Action</th>
                            </tr>
                          </thead>
                          <tbody className="relative">
                            {paginatedData.map((item, index) => (
                              <InvoiceTable
                                // key={item.id}
                                isScrolling={isScrolling}
                                key={item.invoiceId}
                                item={item}
                                index={index}
                                selectedRows={selectedRows}
                                handleRowSelect={handleRowSelect}
                                OnHandleshowform={handleShowForm}
                                OnHandleshowEditform={handleEdit}
                                OnHandleshowInvoicePdf={handleInvoiceDetail}
                                OnHandleshowDeleteform={handleBillDelete}
                                DisplayInvoice={handleDisplayInvoiceDownload}
                              />
                            ))}
                          </tbody>
                        </table>
                        {open && (
                          <>
                            <div
                              className="fixed inset-0 bg-black/20 z-50 "
                              onClick={() => setOpen(false)}
                            />

                            <div
                              className={`
        fixed top-[180px] right-10 h-fit w-[350px]
        bg-white z-50
        border-r border-[#E5E7EB]
        shadow-xl  rounded-xl border border-[#E5E7EB] shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
                            >
                              <div className="p-3 border-b">
                                <div className="flex items-center gap-2 justify-between mb-2">
                                  <div className="text-[16px] text-[#333333] font-semibold ">
                                    Customize Tabs{" "}
                                  </div>
                                  <div
                                    onClick={() => {
                                      const allSelected = customizeItems.every(
                                        (i) => i.checked,
                                      );

                                      setCustomizeItems((prev) =>
                                        prev.map((i) => ({
                                          ...i,
                                          checked: !allSelected,
                                        })),
                                      );
                                    }}
                                    className="text-[#338BFF] text-[13px] font-semibold flex items-center gap-1 cursor-pointer"
                                  >
                                    {" "}
                                    <TiTick className="text-[#338BFF] text-[13px] font-semibold cursor-pointer" />{" "}
                                    <span>
                                      {allSelected
                                        ? "Unselect all"
                                        : "Select all"}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                                  <SearchNormal1 size={16} color="#98A2B3" />
                                  <input
                                    placeholder="Search"
                                    className="w-full text-sm outline-none placeholder:text-[#98A2B3]"
                                  />
                                </div>
                              </div>

                              <DndContext
                                collisionDetection={closestCenter}
                                onDragEnd={(event) => {
                                  const { active, over } = event;

                                  if (active.id !== over?.id) {
                                    const oldIndex = customizeItems.findIndex(
                                      (i) => i.key === active.id,
                                    );
                                    const newIndex = customizeItems.findIndex(
                                      (i) => i.key === over.id,
                                    );

                                    setCustomizeItems(
                                      arrayMove(
                                        customizeItems,
                                        oldIndex,
                                        newIndex,
                                      ),
                                    );
                                  }
                                }}
                              >
                                <SortableContext
                                  items={customizeItems.map((i) => i.key)}
                                  strategy={verticalListSortingStrategy}
                                >
                                  <div className="max-h-[220px] overflow-y-auto px-3 py-2 space-y-2 show-scrolls">
                                    {customizeItems?.map((item) => (
                                      <SortableItem
                                        key={item.key}
                                        item={item}
                                      />
                                    ))}
                                  </div>
                                </SortableContext>
                              </DndContext>

                              <div className="p-3 border-t flex justify-end gap-2">
                                <button className="px-4 py-2 text-sm border rounded-lg text-[#344054]">
                                  Cancel
                                </button>
                                <button className="px-4 py-2 text-sm bg-[#1E45E1] text-white rounded-lg">
                                  Save
                                </button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ) : (
                    !loading &&
                    sortedData &&
                    sortedData.length === 0 && (
                      <div className="w-full my-2 h-[500px] border border-[#E5E7EB] rounded-2xl bg-white flex items-center justify-center">
                        <div className="flex flex-col items-center justify-center text-center">
                          <div>
                            {isSearching ? (
                              <img src={DataSearch} alt="img" />
                            ) : (
                              <img src={NoData} alt="img" />
                            )}
                          </div>

                          <h3 className="text-[20px] font-semibold text-[#101828] font-gilroy">
                            {isSearching
                              ? "No Search Results Found"
                              : "No Data Found !"}
                          </h3>

                          <p className="mt-1 text-sm text-[#4A5565] font-gilroy">
                            {isSearching
                              ? "Your Search didn’t match any projects"
                              : "No invoices were still generated Yet"}
                          </p>

                          <div className="flex">
                            {isSearching && (
                              <button
                                onClick={() => {
                                  setFilterInput("");
                                  setChips([]);
                                }}
                                className="flex justify-center rounded-lg !font-gilroy !text-[#4B4B4B]
              !bg-[#F9F9F9] px-4 py-1 min-w-[95px] mr-2 !border !border-[#E7E7E7]"
                              >
                                Clear Search
                              </button>
                            )}

                            <button
                              disabled={!canWriteInvoice}
                              onClick={handleManualShow}
                              className="flex justify-center rounded-lg !font-gilroy text-white !bg-[#1E45E1] px-4 py-1 min-w-[95px] mr-2"
                            >
                              + Create Invoice
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {showBillsFilter && (
        <BillsFilter
          show={showBillsFilter}
          handleClose={handleCloseFilterBills}
        />
      )}
      {(showLoader || loading) && <LoaderComponent />}

      {showdeleteform && (
        <Modal
          show={showdeleteform}
          onHide={handleCloseDeleteform}
          centered
          backdrop="static"
        >
          <Modal.Header className="!border-b-0 !flex !justify-center">
            <Modal.Title className="!text-center !text-lg !font-semibold !text-gray-800 !font-gilroy">
              Delete Billing?
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="!text-center !text-sm !text-gray-600 !-mt-2 !font-gilroy !px-3 !py-3">
            Are you sure you want to delete this Billing?
          </Modal.Body>

          <Modal.Footer className="!block !border-t-0 !p-2">
            <div className="!flex !flex-col sm:!flex-row !justify-center !gap-2 !w-full !-mt-2">
              <Button
                onClick={handleCloseDeleteform}
                className="!w-full sm:!w-auto sm:!min-w-[140px] !h-12 !rounded-lg !border !border-blue-600 !text-blue-600 !font-semibold !bg-transparent !font-gilroy"
              >
                Cancel
              </Button>

              <Button
                disabled
                onClick={handleBillDeleted}
                className="!w-full sm:!w-auto sm:!min-w-[140px] !h-12 !rounded-lg !bg-blue-600 !text-white !font-semibold !border-0 !font-gilroy"
              >
                Coming Soon
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      )}

      {state.InvoiceList.unableAddInvoiceDetailsError ? (
        <div className="flex justify-content-center mt-5">
          <ErrorMessage
            message={state.InvoiceList.unableAddInvoiceDetailsError}
            type="error"
          />
        </div>
      ) : null}

      {showRecurringBillForm && (
        <>
          <RecurringBill
            hostelId={state.login.selectedHostel_Id}
            onhandleback={handleBackBill}
          />
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
        <RecordPayment
          show={showform}
          handleClose={handleCloseForm}
          selectedUserId={selectedUserId}
          // invoiceValue={invoiceValue}
          invoiceList={invoiceList}
        />
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

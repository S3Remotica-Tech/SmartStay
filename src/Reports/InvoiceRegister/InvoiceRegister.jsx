/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Filter,
  Export,
  ArrowLeft,
  ArrowSwapVertical,
  Setting3,
  SearchNormal1,
  ArrowDown2,
} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ApiPagination from "../../Components/ApiPagination";
import InvoiceRegisterFilter from "./InvoiceRegisterFilter";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useHasPermission } from "../../Utils/Permission";
import NoDataMessage from "../../Utils/NoDataMessage";
import CustomTooltip from "../../Utils/CustomTooltip";
// Consolidated View = these two components. The shared Consolidated logic
// (API mapping, filters, columns, totals) is exported from the table file.
import ConsolidatedInvoiceTable, {
  DEFAULT_CONSOLIDATED_FILTERS,
  applyConsolidatedFilters,
  formatAmount,
  getCollectionSummary,
  getConsolidatedFilterChips,
  getConsolidatedHeader,
  getConsolidatedFloorOptions,
  getConsolidatedStatusOptions,
  normaliseConsolidatedBeds,
  buildConsolidatedColumns,
} from "./ConsolidatedInvoiceTable";
import ConsolidatedExportSettings from "./ConsolidatedExportSettings";

const NOT_IN_COLLECTION_SHEET = "Not part of collection sheet.";

// List / Consolidated view switch (dropdown rendered in viewSwitcher below).
const INVOICE_VIEW_MODES = {
  LIST: "list",
  CONSOLIDATED: "consolidated",
};

const VIEW_OPTIONS = [
  { value: INVOICE_VIEW_MODES.LIST, label: "List View" },
  { value: INVOICE_VIEW_MODES.CONSOLIDATED, label: "Consolidated View" },
];

// List View table cells — same look as ConsolidatedInvoiceTable's header/body cells.
const LIST_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const LIST_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function InvoiceRegister() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { RangePicker } = DatePicker;
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [register, setRegister] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [invoiceRegister, setInvoiceRegister] = useState("");
  const [chips, setChips] = useState([]);
  const tableRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const [hovered, setHovered] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const isSearching = chips?.length > 0;
  const [viewMode, setViewMode] = useState(INVOICE_VIEW_MODES.LIST);
  const isConsolidated = viewMode === INVOICE_VIEW_MODES.CONSOLIDATED;
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const viewMenuRef = useRef(null);
  // Consolidated View selected filters live in the reducer
  // (state.reports.consolidatedInvoiceFilters), like the List View's
  // invoiceRegisterFilters, so they survive leaving the page.
  const consolidatedFilters =
    state?.reports?.consolidatedInvoiceFilters || DEFAULT_CONSOLIDATED_FILTERS;
  const setConsolidatedFilters = (filters) =>
    dispatch({ type: "SET_CONSOLIDATED_INVOICE_FILTERS", payload: filters });
  const [showConsolidatedFilter, setShowConsolidatedFilter] = useState(false);
  // Held here so the export settings can start from the current view.
  const [includeAllTenants, setIncludeAllTenants] = useState(false);
  const [showExportSettings, setShowExportSettings] = useState(false);
  // Consolidated View API data (state.reports.getConsolidatedInvoice).
  const [consolidatedRegister, setConsolidatedRegister] = useState(null);
  const [consolidatedLoading, setConsolidatedLoading] = useState(false);
  // Consolidated View server pagination (1-based, response paginationData).
  // Kept apart from the List View's page/size.
  const [consolidatedPage, setConsolidatedPage] = useState(1);
  const [consolidatedSize, setConsolidatedSize] = useState(10);
  const consolidatedScopeKeyRef = useRef("");
  // Single bed list used by the table, stat cards, floor filter and export.
  const consolidatedBeds = useMemo(
    () => normaliseConsolidatedBeds(consolidatedRegister),
    [consolidatedRegister],
  );
  // Columns come from the API (tableColumns). The table saves Customize Tabs
  // itself and hands back the saved list (shown until the next fetch); the
  // export uses the same list.
  const [savedColumns, setSavedColumns] = useState(null);
  // Bumped after Customize Tabs save so the list is fetched again (like UserList).
  const [consolidatedRefreshKey, setConsolidatedRefreshKey] = useState(0);
  const handleConsolidatedColumnsSaved = (columns) => {
    setSavedColumns(columns);
    setConsolidatedRefreshKey((key) => key + 1);
  };
  const consolidatedColumns = useMemo(
    () =>
      savedColumns ||
      buildConsolidatedColumns(consolidatedRegister?.tableColumns),
    [savedColumns, consolidatedRegister],
  );

  const handleCloseFilterBills = () => {
    setInvoiceFilter(false);
  };

  const { canReadModule: canReadReports } = useHasPermission("Reports");

  const isValidSubscription =
    state?.UsersList?.hotelDetailsinPg?.isSubscriptionActive;

  const isExportAllow = isValidSubscription && canReadReports;

  useEffect(() => {
    if (state?.reports?.getInvoiceRegisterSuccess === 200) {
      setLoading(false);
      isInitialLoad.current = true;
      setInvoiceRegister(state?.reports?.getInvoiceRegister);
      setInvoiceFilter(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_REPORTS_INVOICE_REGISTER_REDUCER" });
      }, 100);
    }
  }, [state?.reports?.getInvoiceRegisterSuccess]);

  useEffect(() => {
    if (state?.reports?.getConsolidatedInvoiceSuccess === 200) {
      setConsolidatedLoading(false);
      setConsolidatedRegister(state?.reports?.getConsolidatedInvoice);
      setSavedColumns(null);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_REPORTS_CONSOLIDATED_INVOICE_REDUCER" });
      }, 100);
    }
  }, [state?.reports?.getConsolidatedInvoiceSuccess]);

  useEffect(() => {
    if (state?.reports?.getConsolidatedInvoiceError) {
      setConsolidatedLoading(false);
      dispatch({ type: "REMOVE_GET_REPORTS_CONSOLIDATED_INVOICE_ERROR" });
    }
  }, [state?.reports?.getConsolidatedInvoiceError]);

  useEffect(() => {
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSize((prev) => {
          const newSize = window.innerWidth >= 1440 ? 20 : 10;
          return prev !== newSize ? newSize : prev;
        });
      }, 300);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const el = tableRef?.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(el?.scrollLeft > 0);
    };

    el?.addEventListener("scroll", handleScroll);
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setRegister(false);
      }
    }

    if (register) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [register]);

  const stats = [
    {
      title: "Total Invoices",
      value: state?.reports?.getInvoiceRegister?.totalInvoices,
    },
    {
      title: "Total Amount",
      value: state?.reports?.getInvoiceRegister?.totalAmount,
      isCurrency: true,
      //  up: "12%"
    },
    {
      title: "Paid Amount",
      value: state?.reports?.getInvoiceRegister?.paidAmount,
      isCurrency: true,
      //  up: "8%",
      link: true,
    },
    {
      title: "Outstanding",
      value: state?.reports?.getInvoiceRegister?.outStandingAmount,
      isCurrency: true,
      // down: "5%",
      link: true,
    },
    {
      title: "Booking Amount",
      value: state?.reports?.getInvoiceRegister?.totalBookingAmount,
      isCurrency: true,
    },
    {
      title: "Refunded Booking Amount",
      value: state?.reports?.getInvoiceRegister?.refundAmount,
      isCurrency: true,
    },
    {
      title: "Cancelled Amount",
      value: state?.reports?.getInvoiceRegister?.cancelledAmount,
      isCurrency: true,
    },
  ];

  // Consolidated View stat cards use the API's invoiceHeader totals; if the
  // header is missing they are computed from the filtered rows instead.
  const consolidatedHeader = useMemo(
    () => getConsolidatedHeader(consolidatedRegister),
    [consolidatedRegister],
  );
  const consolidatedSummary = useMemo(
    () =>
      consolidatedHeader ||
      getCollectionSummary(
        applyConsolidatedFilters(
          consolidatedBeds,
          consolidatedFilters,
          selectedRange,
        ),
      ),
    [consolidatedHeader, consolidatedBeds, consolidatedFilters, selectedRange],
  );

  const consolidatedFloorOptions = useMemo(
    () => getConsolidatedFloorOptions(consolidatedRegister, consolidatedBeds),
    [consolidatedRegister, consolidatedBeds],
  );

  // Collection Status options from the API (filters.paymentStatus), like floors.
  const consolidatedStatusOptions = useMemo(
    () => getConsolidatedStatusOptions(consolidatedRegister),
    [consolidatedRegister],
  );

  const consolidatedChips = getConsolidatedFilterChips(
    consolidatedFilters,
    consolidatedStatusOptions,
  );
  const displayedChips = isConsolidated ? consolidatedChips : chips;

  const handleResetConsolidatedFilters = () => {
    setConsolidatedFilters(DEFAULT_CONSOLIDATED_FILTERS);
  };

  // Hostel changed -> reset the Consolidated filters. Skips the first run
  // (page open), so filters saved in the reducer survive coming back here.
  const prevHostelIdRef = useRef(null);
  useEffect(() => {
    const hostelId = state?.login?.selectedHostel_Id;
    if (prevHostelIdRef?.current !== null && prevHostelIdRef?.current !== hostelId) {
      setConsolidatedFilters(DEFAULT_CONSOLIDATED_FILTERS);
    }
    prevHostelIdRef.current = hostelId;
  }, [state?.login?.selectedHostel_Id]);

  // Period edits in the drawer go through the existing date range handler,
  // so the top RangePicker and List View data stay in sync.
  const handleApplyConsolidatedFilters = ({ filters, range }) => {
    setConsolidatedFilters(filters);
    setShowConsolidatedFilter(false);

    const [from, to] = range || [];
    const currentFrom = selectedRange?.from ? dayjs(selectedRange?.from) : null;
    const currentTo = selectedRange?.to ? dayjs(selectedRange?.to) : null;
    const periodChanged =
      from &&
      to &&
      (!currentFrom ||
        !currentTo ||
        !from?.isSame(currentFrom, "day") ||
        !to?.isSame(currentTo, "day"));

    if (periodChanged) {
      handleDateChange([from, to]);
    }
  };

  const consolidatedStats = [
    {
      title: "Total Invoices",
      value: consolidatedSummary?.totalInvoices,
    },
    {
      title: "Total Amount",
      value: formatAmount(consolidatedSummary?.totalAmount),
      isCurrency: true,
    },
    {
      title: "Paid Amount",
      value: formatAmount(consolidatedSummary?.paidAmount),
      isCurrency: true,
    },
    {
      title: "Outstanding",
      value: formatAmount(consolidatedSummary?.outstandingAmount),
      isCurrency: true,
    },
    {
      title: "Booking Amount",
      value: formatAmount(consolidatedSummary?.bookingAmount),
      isCurrency: true,
      tooltip: NOT_IN_COLLECTION_SHEET,
    },
    {
      title: "Refunded Booking Amount",
      value: formatAmount(consolidatedSummary?.refundedBookingAmount),
      isCurrency: true,
      tooltip: NOT_IN_COLLECTION_SHEET,
    },
    {
      title: "Cancelled Amount",
      value: formatAmount(consolidatedSummary?.cancelledAmount),
      isCurrency: true,
      tooltip: NOT_IN_COLLECTION_SHEET,
    },
  ];

  const displayedStats = isConsolidated ? consolidatedStats : stats;

  // View switch dropdown: close on outside click.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewMenuRef?.current && !viewMenuRef?.current?.contains(event?.target)) {
        setViewMenuOpen(false);
      }
    };
    if (viewMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [viewMenuOpen]);

  const handleSelectView = (option) => {
    setViewMenuOpen(false);
    if (option?.value !== viewMode) setViewMode(option?.value);
  };

  const selectedViewOption =
    VIEW_OPTIONS.find((option) => option?.value === viewMode) || VIEW_OPTIONS[0];

  const viewSwitcher = (
    <div ref={viewMenuRef} className="relative w-fit font-gilroy">
      <button
        type="button"
        onClick={() => setViewMenuOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={viewMenuOpen}
        className="w-fit h-[42px] flex items-center justify-between gap-[10px] px-[12px] bg-white border-[1px] border-[#F2F2F2] rounded-[5px] text-[14px] font-semibold text-[#1D293D]"
      >
        <span className="whitespace-nowrap">{selectedViewOption?.label}</span>
        <ArrowDown2
          size="16"
          color="#1D293D"
          className={`transition-transform duration-200 ${viewMenuOpen ? "rotate-180" : ""}`}
        />
      </button>

      {viewMenuOpen && (
        <ul
          role="listbox"
          className="absolute left-0 z-40 mt-1 w-max min-w-full bg-white rounded-2xl shadow-lg overflow-hidden border-[1px] border-[#E5E7EB] p-0 m-0 list-none"
        >
          {VIEW_OPTIONS.map((option, index) => (
            <li
              key={option?.value}
              role="option"
              aria-selected={option?.value === viewMode}
              onClick={() => handleSelectView(option)}
              onKeyDown={(e) => {
                if (e?.key === "Enter" || e?.key === " ") handleSelectView(option);
              }}
              tabIndex={0}
              className={`px-[16px] py-2 text-sm whitespace-nowrap cursor-pointer hover:bg-[#F1F5FF] ${option?.value === viewMode
                ? "text-[#1E45E1] font-semibold"
                : "text-[#222]"
                } ${index < VIEW_OPTIONS.length - 1 ? "border-b border-[#E5E7EB]" : ""}`}
            >
              {option?.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  const handleNavigateReports = () => {
    navigate(`/reports/${state?.login?.selectedHostel_Id}`);
    dispatch({
      type: "SET_INVOICE_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        invoiceTypes: [],
        invoiceTypeLabels: [],
        createdBy: [],
        createdByLabels: [],
        invoiceModes: [],
        invoiceModeLabels: [],
        paymentStatus: [],
        paymentStatusLabels: [],
        search: "",
        minPaidAmount: "",
        maxPaidAmount: "",
        minOutstandingAmount: "",
        maxOutstandingAmount: "",
        period: [],
        periodLabel: "",
      },
    });
  };

  const handleClickFilter = () => {
    setInvoiceFilter(true);
  };

  const handleNavigateBillsPdf = (row) => {
    dispatch({
      type: "GETPARTICULARBILLSDETAILS",
      payload: { hostelId: row?.hostelId, invoiceId: row?.invoiceId },
    });

    navigate(`/invoice/details/${row?.invoiceId}`, {
      state: {
        rowData: row,
        isReportsInvoiceRegisterWay: true,
      },
    });
  };

  // Status badge colours (soft bg + dot), same style as the Consolidated table.
  const statusColor = {
    Paid: { bg: "bg-[rgba(179,229,187,0.3)]", dot: "bg-[#22C55E]" },

    Pending: { bg: "bg-[rgba(255,189,189,0.4)]", dot: "bg-[#EF4444]" },
    "Partial Payment": { bg: "bg-[rgba(255,237,202,0.6)]", dot: "bg-[#F59E0B]" },

    Refunded: { bg: "bg-[#E7F1FF]", dot: "bg-[#3B82F6]" },
    "Partial Refund": { bg: "bg-[#E7F1FF]", dot: "bg-[#3B82F6]" },
    "Pending Refund": { bg: "bg-[rgba(255,237,202,0.6)]", dot: "bg-[#F59E0B]" },
    Cancelled: { bg: "bg-[#E5E7EB]", dot: "bg-[#6B7280]" },
  };

  const options = [
    { key: "sharing", label: "Sharing", checked: true },
    { key: "checkin", label: "Check-in Date", checked: true },
    { key: "checkout", label: "Checkout date", checked: true },
    { key: "stay", label: "Stay Duration", checked: false },
    { key: "room", label: "Room", checked: true },
    { key: "bed", label: "Bed", checked: false },
    { key: "status", label: "Status", checked: true },
    { key: "payment", label: "Last Payment", checked: true },
  ];
  const reportCards = [
    { title: "Receipt Register" },
    // { title: "Bank Transaction Register" },
    { title: "Tenant Register" },
    // { title: "Occupancy" },
    { title: "Expense Register" },
    // { title: "Vendor Ledger" },
    // { title: "Electricity Billing Register" },
    // { title: "Complaint Register" },
    // { title: "Request Register" },
    // { title: "Final Settlement" },
    //  { title: "Invoice Register" },
  ];

  const handleNavigateRegister = (item) => {
    setRegister(false);

    if (item?.title === "Tenant Register") {
      navigate(`/reports/tenant-register/${state?.login?.selectedHostel_Id}`);
    } else if (item?.title === "Receipt Register") {
      navigate(`/reports/receipt-register/${state?.login?.selectedHostel_Id}`);
    } else if (item?.title === "Bank Transaction Register") {
      navigate(
        `/reports/bank-transaction-register/${state?.login?.selectedHostel_Id}`,
      );
    } else if (item?.title === "Occupancy") {
      navigate(`/reports/occupancy-register/${state?.login?.selectedHostel_Id}`);
    } else if (item?.title === "Expense Register") {
      navigate(`/reports/expense-register/${state?.login?.selectedHostel_Id}`);
    } else if (item?.title === "Vendor Ledger") {
      navigate(`/reports/vendor-register/${state?.login?.selectedHostel_Id}`);
    } else if (item?.title === "Electricity Billing Register") {
      navigate(
        `/reports/electricity-billing-register/${state?.login?.selectedHostel_Id}`,
      );
    } else if (item?.title === "Complaint Register") {
      navigate(`/reports/complaint-register/${state?.login?.selectedHostel_Id}`);
    } else if (item?.title === "Request Register") {
      navigate(`/reports/request-register/${state?.login?.selectedHostel_Id}`);
    } else if (item?.title === "Final Settlement") {
      navigate(
        `/reports/final-settlement-register/${state?.login?.selectedHostel_Id}`,
      );
    } else if (item?.title === "Invoice Register") {
      navigate(`/reports/invoice-register/${state?.login?.selectedHostel_Id}`);
    }

    dispatch({
      type: "SET_INVOICE_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        invoiceTypes: [],
        invoiceTypeLabels: [],
        createdBy: [],
        createdByLabels: [],
        invoiceModes: [],
        invoiceModeLabels: [],
        paymentStatus: [],
        paymentStatusLabels: [],
        search: "",
        minPaidAmount: "",
        maxPaidAmount: "",
        minOutstandingAmount: "",
        maxOutstandingAmount: "",
        period: [],
        periodLabel: "",
      },
    });
  };

  useEffect(() => {
    const invoiceFilters = state?.reports?.invoiceRegisterFilters;
    const filterData = [];



    if (invoiceFilters?.paymentStatus?.length > 0) {
      filterData?.push({
        key: "payment-status",
        label: "Status is",
        type: "paymentStatus",
        value: invoiceFilters?.paymentStatusLabels?.join(", ") || "",
      });
    }

    if (invoiceFilters?.createdBy?.length) {
      filterData?.push({
        key: "collected",
        label: "Collected By is",
        type: "collected",
        value: invoiceFilters?.createdByLabels?.join(", ") || "",
      });
    }

    if (invoiceFilters?.invoiceTypes?.length) {
      filterData?.push({
        key: "type",
        label: "Type is",
        type: "type",
        value: invoiceFilters?.invoiceTypeLabels?.join(", ") || "",
      });
    }

    if (invoiceFilters?.invoiceModes?.length) {
      filterData?.push({
        key: "modes",
        label: "Mode is",
        type: "modes",
        value: invoiceFilters?.invoiceModeLabels?.join(", ") || "",
      });
    }

    const periodValue = Array.isArray(invoiceFilters?.period)
      ? invoiceFilters?.period?.join(", ")
      : invoiceFilters?.period;

    if (periodValue) {
      filterData?.push({
        key: "period",
        label: "Period is",
        type: "period",
        value: invoiceFilters?.periodLabel || periodValue,
      });
    }

    if (invoiceFilters?.startDate || invoiceFilters?.endDate) {
      filterData?.push({
        key: "date-range",
        label: "Date Range is",
        type: "date",
        value:
          invoiceFilters?.startDate && invoiceFilters?.endDate
            ? `${invoiceFilters?.startDate} - ${invoiceFilters?.endDate}`
            : invoiceFilters?.startDate || invoiceFilters?.endDate,
      });
    }

    if (invoiceFilters?.search) {
      filterData?.push({
        key: "search",
        label: "Tenant",
        type: "search",
        value: invoiceFilters?.search,
      });
    }

    if (invoiceFilters?.minPaidAmount) {
      filterData?.push({
        key: "minPaidAmount",
        label: "min-paid Amount",
        type: "minPaidAmount",
        value: `₹${invoiceFilters?.minPaidAmount}`,
      });
    }

    if (invoiceFilters?.maxPaidAmount) {
      filterData?.push({
        key: "maxPaidAmount",
        label: "max-paid Amount",
        type: "maxPaidAmount",
        value: `₹${invoiceFilters?.maxPaidAmount}`,
      });
    }

    if (invoiceFilters?.minOutstandingAmount) {
      filterData?.push({
        key: "minOutstandingAmount",
        label: "min-outstanding",
        type: "minOutstandingAmount",
        value: `₹${invoiceFilters?.minOutstandingAmount}`,
      });
    }

    if (invoiceFilters?.maxOutstandingAmount) {
      filterData?.push({
        key: "maxOutstandingAmount",
        label: "max-outstanding",
        type: "maxOutstandingAmount",
        value: `₹${invoiceFilters?.maxOutstandingAmount}`,
      });
    }

    setChips(filterData);
  }, [state?.reports?.invoiceRegisterFilters]);

  const handleReset = () => {
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    setSelectedRange({
      from: startOfMonth,
      to: endOfMonth,
    });
    dispatch({
      type: "SET_INVOICE_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        invoiceTypes: [],
        invoiceTypeLabels: [],
        createdBy: [],
        createdByLabels: [],
        invoiceModes: [],
        invoiceModeLabels: [],
        paymentStatus: [],
        paymentStatusLabels: [],
        search: "",
        minPaidAmount: "",
        maxPaidAmount: "",
        minOutstandingAmount: "",
        maxOutstandingAmount: "",
        period: [],
        periodLabel: "",
      },
    });
    dispatch({
      type: "GET_REPORTS_INVOICE_REGISTER_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        filters: {
          size: size,
          page: page,
        },
      },
    });
  };

  const apiStart = state?.reports?.getInvoiceRegister?.startDate;
  const apiEnd = state?.reports?.getInvoiceRegister?.endDate;

  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (!apiStart || !apiEnd || !isInitialLoad?.current) return;

    isInitialLoad.current = false;

    setSelectedRange({
      from: dayjs(apiStart, "DD/MM/YYYY").toDate(),
      to: dayjs(apiEnd, "DD/MM/YYYY").toDate(),
    });
  }, [apiStart, apiEnd]);

  useEffect(() => {
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    setSelectedRange({
      from: startOfMonth,
      to: endOfMonth,
    });
  }, []);

  const handleDateChange = (dates) => {
    if (!dates) {
      setSelectedRange(null);
      dispatch({
        type: "SET_INVOICE_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
        },
      });
      dispatch({
        type: "GET_REPORTS_INVOICE_REGISTER_SAGA",
        payload: {
          hostelId: state?.login?.selectedHostel_Id,
          filters: {
            size: size,
            page: page,
          },
        },
      });
      return;
    }

    const [from, to] = dates;

    setSelectedRange({
      from: from ? from?.toDate() : null,
      to: to ? to?.toDate() : null,
    });

    const invoiceFilters = state?.reports?.invoiceRegisterFilters;


    const filters = {
      startDate: from ? dayjs(from).format("DD-MM-YYYY") : undefined,
      endDate: to ? dayjs(to).format("DD-MM-YYYY") : undefined,
      size: size,
      page: 1,
      search: invoiceFilters?.search || undefined,

      paymentStatus: invoiceFilters?.paymentStatus?.length
        ? invoiceFilters?.paymentStatus
        : undefined,

      invoiceModes: invoiceFilters?.invoiceModes?.length
        ? invoiceFilters?.invoiceModes
        : undefined,

      invoiceTypes: invoiceFilters?.invoiceTypes?.length
        ? invoiceFilters?.invoiceTypes
        : undefined,

      createdBy: invoiceFilters?.createdBy?.length
        ? invoiceFilters?.createdBy
        : undefined,

      period: invoiceFilters?.period || "",

      minPaidAmount: invoiceFilters?.minPaidAmount || undefined,
      maxPaidAmount: invoiceFilters?.maxPaidAmount || undefined,

      minOutstandingAmount: invoiceFilters?.minOutstandingAmount || undefined,
      maxOutstandingAmount: invoiceFilters?.maxOutstandingAmount || undefined,
    };

    dispatch({
      type: "GET_REPORTS_INVOICE_REGISTER_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        filters,
      },
    });

    dispatch({
      type: "SET_INVOICE_REGISTER_FILTERS",
      payload: filters,
    });
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_INVOICE_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          invoiceTypes: [],
          invoiceTypeLabels: [],
          createdBy: [],
          createdByLabels: [],
          invoiceModes: [],
          invoiceModeLabels: [],
          paymentStatus: [],
          paymentStatusLabels: [],
          search: "",
          minPaidAmount: "",
          maxPaidAmount: "",
          minOutstandingAmount: "",
          maxOutstandingAmount: "",
          period: [],
          periodLabel: "",
        },
      });
      // const filters = {
      //   size,
      //   page,
      // };

      // dispatch({
      //   type: "GET_REPORTS_INVOICE_REGISTER_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     filters,
      //   },
      // });
    };
  }, []);

  // useEffect(() => {
  //   setPage(0);
  // }, [state.reports?.invoiceRegisterFilters]);

  const startDate = useMemo(() => {
    return selectedRange?.from
      ? dayjs(selectedRange?.from).format("DD-MM-YYYY")
      : undefined;
  }, [selectedRange?.from]);

  const endDate = useMemo(() => {
    return selectedRange?.to
      ? dayjs(selectedRange?.to).format("DD-MM-YYYY")
      : undefined;
  }, [selectedRange?.to]);

  useEffect(() => {
    if (!state?.login?.selectedHostel_Id) return;
    const invoiceFilters = state?.reports?.invoiceRegisterFilters;

    const filters = {
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      search: invoiceFilters?.search || undefined,

      paymentStatus: invoiceFilters?.paymentStatus?.length
        ? invoiceFilters?.paymentStatus
        : undefined,

      invoiceModes: invoiceFilters?.invoiceModes?.length
        ? invoiceFilters?.invoiceModes
        : undefined,

      invoiceTypes: invoiceFilters?.invoiceTypes?.length
        ? invoiceFilters?.invoiceTypes
        : undefined,

      createdBy: invoiceFilters?.createdBy?.length
        ? invoiceFilters?.createdBy
        : undefined,

      period: invoiceFilters?.period || "",

      minPaidAmount: invoiceFilters?.minPaidAmount || undefined,
      maxPaidAmount: invoiceFilters?.maxPaidAmount || undefined,

      minOutstandingAmount: invoiceFilters?.minOutstandingAmount || undefined,
      maxOutstandingAmount: invoiceFilters?.maxOutstandingAmount || undefined,
    };
    if (startDate && endDate) {
      dispatch({
        type: "GET_REPORTS_INVOICE_REGISTER_SAGA",
        payload: {
          hostelId: state?.login?.selectedHostel_Id,
          filters,
        },
      });

      setLoading(true);
    }
  }, [state?.login?.selectedHostel_Id, size, page, startDate, endDate]);

  // Consolidated View: same trigger as the List call above, only while that view is open.
  useEffect(() => {
    if (!isConsolidated) return;
    if (!state?.login?.selectedHostel_Id) return;

    // A new scope (property, dates, filters, toggle, page size) starts again
    // at page 1; the page change re-runs this effect, so only one call is made.
    const scopeKey = JSON.stringify([
      state?.login?.selectedHostel_Id,
      startDate,
      endDate,
      consolidatedFilters,
      includeAllTenants,
      consolidatedSize,
    ]);
    const scopeChanged = consolidatedScopeKeyRef?.current !== scopeKey;
    consolidatedScopeKeyRef.current = scopeKey;
    if (scopeChanged && consolidatedPage !== 1) {
      setConsolidatedPage(1);
      return;
    }

    const filters = {
      startDate: startDate,
      endDate: endDate,
      search: consolidatedFilters?.search || undefined,
      // paymentStatus keys, same field as the download API payload.
      paymentStatus: consolidatedFilters?.statuses?.length
        ? consolidatedFilters?.statuses
        : undefined,
      floors: consolidatedFilters?.floors?.length
        ? consolidatedFilters?.floors
        : undefined,
      overdueOnly: consolidatedFilters?.overdueOnly || undefined,
      // Echoed back by the API; the toggle needs paid tenants and empty beds.
      includePaidInvoice: includeAllTenants,
      includeEmptyBeds: includeAllTenants,
      page: consolidatedPage,
      size: consolidatedSize,
    };
    if (startDate && endDate) {
      dispatch({
        type: "GET_REPORTS_CONSOLIDATED_INVOICE_SAGA",
        payload: {
          hostelId: state?.login?.selectedHostel_Id,
          filters,
        },
      });

      setConsolidatedLoading(true);
    }
  }, [
    isConsolidated,
    state?.login?.selectedHostel_Id,
    startDate,
    endDate,
    consolidatedFilters,
    includeAllTenants,
    consolidatedRefreshKey,
    consolidatedPage,
    consolidatedSize,
  ]);

  // Consolidated View pagination from the response's paginationData.
  const consolidatedPagination = consolidatedRegister?.paginationData;
  const consolidatedCurrentPage =
    Number(consolidatedPagination?.currentPage) || consolidatedPage;
  const consolidatedTotalPages = Number(consolidatedPagination?.totalPages) || 1;
  const consolidatedTotalRecords =
    Number(consolidatedPagination?.totalElements) || 0;

  const handleConsolidatedPageChange = (newPage) => {
    if (newPage === consolidatedPage) return;
    setConsolidatedPage(newPage);
  };

  const handleConsolidatedSizeChange = (sizeValue) => {
    setConsolidatedSize(sizeValue);
  };

  useEffect(() => {
    setPage(1);
  }, [
    state?.reports?.invoiceRegisterFilters?.search,
    state?.reports?.invoiceRegisterFilters?.paymentStatus,
    state?.reports?.invoiceRegisterFilters?.invoiceModes,
    state?.reports?.invoiceRegisterFilters?.invoiceTypes,
    state?.reports?.invoiceRegisterFilters?.createdBy,
    state?.reports?.invoiceRegisterFilters?.period,
    state?.reports?.invoiceRegisterFilters?.minPaidAmount,
    state?.reports?.invoiceRegisterFilters?.maxPaidAmount,
    state?.reports?.invoiceRegisterFilters?.minOutstandingAmount,
    state?.reports?.invoiceRegisterFilters?.maxOutstandingAmount,
  ]);

  const currentPage = state?.reports?.getInvoiceRegister?.currentPage ?? 1;

  const totalPages = state?.reports?.getInvoiceRegister?.totalPages ?? 1;

  const totalRecords = state?.reports?.getInvoiceRegister?.totalInvoices ?? 0;

  const handlePageChange = (newPage) => {
    if (page === newPage) {
      return;
    }

    setPage(newPage);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  useEffect(() => {
    if (state?.createAccount?.networkError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state?.createAccount?.networkError]);

  const handleDownload = () => {
    if (state?.login?.selectedHostel_Id) {
      const invoiceFilters = state?.reports?.invoiceRegisterFilters;
      dispatch({
        type: "REPORTS_INVOICE_REGISTER_PDFSAGA",
        payload: {
          hostelId: state?.login?.selectedHostel_Id,
          startDate: startDate,
          endDate: endDate,
          search: invoiceFilters?.search || undefined,

          paymentStatus: invoiceFilters?.paymentStatus?.length
            ? invoiceFilters?.paymentStatus
            : undefined,

          invoiceModes: invoiceFilters?.invoiceModes?.length
            ? invoiceFilters?.invoiceModes
            : undefined,

          invoiceTypes: invoiceFilters?.invoiceTypes?.length
            ? invoiceFilters?.invoiceTypes
            : undefined,

          createdBy: invoiceFilters?.createdBy?.length
            ? invoiceFilters?.createdBy
            : undefined,

          period: invoiceFilters?.period || "",

          minPaidAmount: invoiceFilters?.minPaidAmount || undefined,
          maxPaidAmount: invoiceFilters?.maxPaidAmount || undefined,

          minOutstandingAmount:
            invoiceFilters?.minOutstandingAmount || undefined,
          maxOutstandingAmount:
            invoiceFilters?.maxOutstandingAmount || undefined,
        },
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (state?.reports?.reportsInvoicePdfSuccess === 200) {
      const pdfUrl = state?.reports?.reportsInvoicePdf;
      setLoading(false);
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");

        dispatch({ type: "REMOVE_REPORTS_INVOICE_REGISTER_PDF_REDUCER" });
      }
    }
  }, [state?.reports?.reportsInvoicePdfSuccess]);

  useEffect(() => {
    if (state?.reports?.reportsPdfExportError) {
      setLoading(false);
      dispatch({ type: "REMOVE_REPORTS_PDF_EXPORT_ERROR" });
    }
  }, [state?.reports?.reportsPdfExportError]);

  return (
    // From md up the page is exactly one screen tall and never scrolls itself:
    // header, chips, stat cards and toolbar stay put and only the table body
    // scrolls (with its column headers stuck on top). On phones the page
    // scrolls normally and each table has its own 70vh scroll area.
    <div className="min-h-screen md:h-screen md:min-h-0 flex flex-col font-gilroy md:overflow-hidden">
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-0 md:left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
      {/* Title and toolbar sit side by side only from xl (1280px); below that
          the toolbar takes its own full-width row so it never wraps unevenly. */}
      <div className="shrink-0 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-[12px] xl:gap-4 py-[8px] xl:py-0 sticky top-0 right-0 left-0 z-40 bg-white min-h-[60px]">
        <div className="flex items-center gap-2 shrink-0">
          <ArrowLeft
            onClick={handleNavigateReports}
            size="20"
            color="#4A5565"
            className="cursor-pointer"
          />
          <div>
            <div
              className="flex items-center gap-2 relative w-fit"
              onClick={() => setRegister(!register)}
            >
              <h1 className="text-lg font-semibold my-0 text-[#222222]">
                Invoice Register
              </h1>
              <div className="rounded-none border-0">
                <ArrowDown2
                  size="18"
                  color="#1E45E1"
                  className={`cursor-pointer transition-transform duration-200 ${register ? "rotate-180" : ""
                    }`}
                />
                {register && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-40 mt-2 w-64 max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E7EB]"
                  >
                    {reportCards?.map((item, index) => {
                      const isFirst = index === 0;
                      const isLast = index === reportCards?.length - 1;

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            handleNavigateRegister(item);
                          }}
                          className={`
            px-4 py-2 text-sm text-[#222] cursor-pointer
            hover:bg-[#F1F5FF]
            ${isFirst ? "hover:rounded-t-2xl" : ""}
            ${isLast ? "hover:rounded-b-2xl" : ""}
            ${!isLast ? "border-b border-[#E5E7EB]" : ""}
          `}
                        >
                          {item?.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <label className="text-sm font-normal text-[#4A5565]">
              Reports / Invoice Register
            </label>
          </div>
        </div>

        {/* Every control is 36px tall and centred, so mixed heights
            (react-select in ApiPagination) can't push the row out of line. */}
        <div className="flex flex-wrap items-center gap-[10px] w-full xl:w-auto xl:justify-end">
          <div
            className="datepicker-wrapper h-[36px] w-full sm:w-[260px]"
            style={{ position: "relative" }}
          >
            <RangePicker
              allowClear={false}
              style={{
                width: "100%",
                height: "100%",
                cursor: "pointer",
                fontFamily: "Gilroy",
              }}
              format="DD/MM/YYYY"
              placeholder={["From date", "To date"]}
              value={
                selectedRange?.from && selectedRange?.to
                  ? [dayjs(selectedRange?.from), dayjs(selectedRange?.to)]
                  : null
              }
              onChange={handleDateChange}
              disabledDate={(current) => {
                if (current && current > dayjs().endOf("day")) {
                  return true;
                }
                return false;
              }}
              getPopupContainer={(triggerNode) =>
                triggerNode?.closest(".datepicker-wrapper")
              }
            />
          </div>

          <button
            onClick={
              isConsolidated
                ? () => setShowConsolidatedFilter(true)
                : handleClickFilter
            }
            className="h-[36px] flex items-center justify-center gap-2 px-4 border rounded-lg text-sm font-gilroy flex-1 sm:flex-none"
          >
            <Filter size="16" />
            Filter
          </button>
          <button
            onClick={() => {
              if (!isExportAllow) return;
              // List View keeps its direct export; Consolidated opens settings.
              if (isConsolidated) setShowExportSettings(true);
              else handleDownload();
            }}
            disabled={!isExportAllow}
            className={`h-[36px] flex items-center justify-center gap-2 px-4 rounded-lg text-sm font-gilroy flex-1 sm:flex-none
    ${!isExportAllow
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-[#1E45E1] text-white hover:bg-[#1639c5]"
              }`}
          >
            <Export size="16" />
            Export
          </button>
        </div>
      </div>

      {/* No py-0 here: Bootstrap's .py-0 is !important and would erase pb-[12px],
          leaving the table / empty-state card flush against the screen bottom. */}
      <div className="px-1 pb-[12px] bg-[#F9FAFB] rounded-lg flex flex-col md:flex-1 md:min-h-0">
        {displayedChips?.length > 0 && (
          <div className="shrink-0 mx-1 sm:mx-3 mt-3 flex items-start gap-3 p-3 rounded-[10px] bg-[#FFFFFF] border border-[#E5E7EB] font-[Gilroy,sans-serif]">
            <div className="flex flex-1 gap-2 flex-wrap overflow-y-auto min-w-0">
              {displayedChips?.map((chip) => (
                <div key={chip?.key}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] rounded-full text-[12px] font-medium text-[#1F2937] border border-[#E0E7FF] shrink-0">
                    {chip?.label} :
                    <span className="text-[12px] font-medium text-[#16151C]">
                      {chip?.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <span
              onClick={
                isConsolidated ? handleResetConsolidatedFilters : handleReset
              }
              className="text-[#1E45E1] text-[13px] font-medium cursor-pointer whitespace-nowrap"
            >
              Reset
            </span>
          </div>
        )}

        <div className="shrink-0 mt-3 ms-1 me-1 overflow-x-auto show-scrolls">
          <div className="flex gap-[12px] sm:gap-4 flex-nowrap">
            {displayedStats?.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 shadow-sm border border-[#E5E7EB] h-[104px] sm:h-[120px] min-w-[180px] sm:min-w-[250px] flex-shrink-0"
              >
                <div className="flex justify-between ">
                  {item?.tooltip ? (
                    <CustomTooltip
                      text={item?.tooltip}
                      direction="top-full"
                      usePortal={true}
                    >
                      <label className="text-sm font-semibold text-[#4A5565] cursor-help">
                        {item?.title}
                      </label>
                    </CustomTooltip>
                  ) : (
                    <label className="text-sm font-semibold text-[#4A5565]">
                      {item?.title}
                    </label>
                  )}
                  {item?.up && (
                    <span className="text-xs text-[#008236] bg-[#F0FDF4] h-fit rounded-lg px-2 py-1">
                      ↑ {item?.up}
                    </span>
                  )}
                  {item?.down && (
                    <span className="text-xs text-[#C10007] bg-[#FEF2F2] h-fit  rounded-lg px-2 py-1">
                      ↓ {item?.down}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <h2 className="text-xl sm:text-2xl font-semibold text-[#101828]">
                    {item?.isCurrency
                      ? `₹ ${item?.value ?? 0}`
                      : (item?.value ?? 0)}
                  </h2>
                </div>
                {item?.link && (
                  <p
                    className="text-xs text-[#155DFC] w-fit cursor-pointer"
                    onClick={handleClickFilter}
                  >
                    Click to filter
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
        {isConsolidated && (
          <ConsolidatedInvoiceTable
            viewSwitcher={viewSwitcher}
            // Shown in the table footer, next to "Grouped by …".
            pagination={
              consolidatedTotalRecords > 0 ? (
                <ApiPagination
                  currentPage={consolidatedCurrentPage}
                  totalPages={consolidatedTotalPages}
                  totalRecords={consolidatedTotalRecords}
                  onPageChange={handleConsolidatedPageChange}
                  onSizeChange={handleConsolidatedSizeChange}
                  size={consolidatedSize}
                  isTenantPagination={true}
                />
              ) : null
            }
            beds={consolidatedBeds}
            tableColumns={consolidatedColumns}
            onColumnsSaved={handleConsolidatedColumnsSaved}
            isLoading={consolidatedLoading}
            filters={consolidatedFilters}
            period={selectedRange}
            includeAllTenants={includeAllTenants}
            onIncludeAllTenantsChange={setIncludeAllTenants}
            showFilter={showConsolidatedFilter}
            onCloseFilter={() => setShowConsolidatedFilter(false)}
            onApplyFilters={handleApplyConsolidatedFilters}
            floorOptions={consolidatedFloorOptions}
            statusOptions={consolidatedStatusOptions}
          />
        )}

        {!isConsolidated && (
          <div className="shrink-0 mx-1 mt-3">{viewSwitcher}</div>
        )}

        {isConsolidated ? null : invoiceRegister?.invoiceList?.length > 0 ? (
          // UI matches ConsolidatedInvoiceTable (card, 50px header, 58px rows,
          // dot status badge). Data, handlers and sticky columns are unchanged.
          <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 mt-[12px] flex flex-col md:flex-1 md:min-h-0">
            <div
              ref={tableRef}
              className="overflow-auto relative max-h-[70vh] md:max-h-none md:flex-1 md:min-h-0 show-scrolls"
            >
              <table className="w-full min-w-max border-separate border-spacing-0">
                <thead className="sticky top-0 z-30">
                  <tr>
                    <th className={`${LIST_HEADER_CELL} sticky left-0 z-40 w-[48px] min-w-[48px] max-w-[48px] !px-[15px] text-left`}>
                      <Setting3
                        //   onClick={() => setOpen(!open)}
                        className="cursor-pointer"
                        size="18"
                        color="#6B7280"
                      />
                    </th>

                    <th className={`${LIST_HEADER_CELL} sticky left-[48px] z-40 w-[140px] min-w-[140px] max-w-[140px] text-left`}>
                      Invoice No
                    </th>

                    {/* Name is pinned only from md up; on phones the three
                        pinned columns would be wider than the screen. */}
                    <th className={`${LIST_HEADER_CELL} sticky md:left-[188px] z-30 md:z-40 w-[220px] min-w-[220px] max-w-[220px] text-left`}>
                      Name
                    </th>

                    <th className={`${LIST_HEADER_CELL} text-center`}>
                      <div className="flex justify-center items-center gap-1">
                        Type
                        <ArrowSwapVertical size="14" color="#6B7280" />
                      </div>
                    </th>

                    <th className={`${LIST_HEADER_CELL} text-center`}>
                      Invoice Date
                    </th>

                    <th className={`${LIST_HEADER_CELL} text-center`}>
                      Due Date
                    </th>

                    <th className={`${LIST_HEADER_CELL} text-right`}>
                      <div className="flex justify-end items-center gap-1">
                        Amount
                        <ArrowSwapVertical size="14" color="#6B7280" />
                      </div>
                    </th>

                    <th className={`${LIST_HEADER_CELL} text-right`}>
                      <div className="flex justify-end items-center gap-1">
                        Due
                        <ArrowSwapVertical size="14" color="#6B7280" />
                      </div>
                    </th>

                    <th className={`${LIST_HEADER_CELL} text-center`}>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {invoiceRegister?.invoiceList?.length > 0 ? (
                    invoiceRegister?.invoiceList?.map((row, i) => (
                      <tr key={i}>
                        <td className={`${LIST_BODY_CELL} sticky left-0 z-20 bg-white w-[48px] min-w-[48px] max-w-[48px] !px-[15px]`}></td>
                        <td
                          onClick={() => handleNavigateBillsPdf(row)}
                          className={`${LIST_BODY_CELL} cursor-pointer text-[#1E45E1] font-semibold truncate sticky left-[48px] z-20 bg-white w-[140px] min-w-[140px] max-w-[140px]`}
                          title={row?.invoiceNumber}
                        >
                          {row?.invoiceNumber}
                        </td>

                        <td className={`${LIST_BODY_CELL} md:sticky md:left-[188px] md:z-20 bg-white w-[220px] min-w-[220px] max-w-[220px]`}>
                          <div className="flex items-center gap-[13px] max-w-[188px] relative">
                            {row?.profilePic ? (
                              <img
                                src={row?.profilePic}
                                alt={row?.fullName}
                                className="w-[30px] h-[30px] rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-[30px] h-[30px] rounded-full bg-slate-200 text-[#44536A] flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                                {row?.initials}
                              </div>
                            )}

                            <span
                              onMouseEnter={(e) => {
                                const rect = e?.target?.getBoundingClientRect();
                                setPosition({
                                  top: rect?.top + rect?.height / 2,
                                  left: rect?.right - 20,
                                });
                                setHovered(i);
                              }}
                              onMouseLeave={() => setHovered(null)}
                              className="block w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-[#111928] cursor-pointer"
                            >
                              {row?.fullName}
                            </span>

                            {hovered === i && (
                              <div
                                style={{
                                  top: position?.top,
                                  left: position?.left,
                                }}
                                className="fixed -translate-y-1/2 z-[9999] bg-gray-200 text-gray-800  border-gray-200 text-xs px-3 py-1.5 rounded-md  whitespace-nowrap pointer-events-none"
                              >
                                {row?.fullName}
                              </div>
                            )}
                          </div>
                        </td>

                        <td
                          className={`${LIST_BODY_CELL} text-center font-medium text-[#111928] truncate ${isScrolled ? "bg-gray-100" : "bg-white"}`}
                          title={row?.invoiceType}
                        >
                          {row?.invoiceType}
                        </td>

                        <td
                          className={`${LIST_BODY_CELL} text-center text-[#314158] ${isScrolled ? "bg-gray-100" : "bg-white"}`}
                        >
                          {row?.invoiceDate}
                        </td>

                        <td
                          className={`${LIST_BODY_CELL} text-center text-[#314158] ${isScrolled ? "bg-gray-100" : "bg-white"}`}
                        >
                          {row?.dueDate}
                        </td>

                        <td
                          className={`${LIST_BODY_CELL} text-right font-medium text-[#111928] ${isScrolled ? "bg-gray-100" : "bg-white"}`}
                        >
                          ₹{row?.invoiceAmount}
                        </td>

                        <td
                          className={`${LIST_BODY_CELL} text-right font-bold text-[#111928] ${isScrolled ? "bg-gray-100" : "bg-white"}`}
                        >
                          ₹{row?.dueAmount}
                        </td>

                        <td
                          className={`${LIST_BODY_CELL} text-center ${isScrolled ? "bg-gray-100" : "bg-white"}`}
                        >
                          <span
                            className={`inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] ${(statusColor[row?.paymentStatus] || statusColor?.Pending)?.bg}`}
                          >
                            <span
                              className={`w-[6px] h-[6px] rounded-full ${(statusColor[row?.paymentStatus] || statusColor?.Pending)?.dot}`}
                            />
                            {row?.paymentStatus?.replace(/_/g, " ")}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="py-10 text-center text-sm text-red-800 font-semibold"
                      >
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination under the table, like the Consolidated View footer. */}
            <div className="shrink-0 flex flex-wrap items-center justify-between gap-x-[16px] gap-y-[8px] px-[12px] sm:px-[20px] py-[12px] border-t border-[#E2E8F0] bg-white text-[13px] sm:text-[14px] leading-[20px] text-[#62748E]">
              <span>
                Showing {invoiceRegister?.invoiceList?.length} of {totalRecords}{" "}
                invoices
              </span>
              <ApiPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalRecords={totalRecords}
                onPageChange={handlePageChange}
                onSizeChange={handleSizeChange}
                size={size}
                isTenantPagination={true}
              />
            </div>

            {open && (
              <>
                <div
                  className="fixed inset-0 bg-black/20 z-40 "
                  onClick={() => setOpen(false)}
                />

                <div
                  className={`
        fixed top-[250px] left-[250px] h-fit w-[280px]
        bg-white z-50
        border-r border-[#E5E7EB]
        shadow-xl  rounded-xl border border-[#E5E7EB] shadow-xl
        transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
                >
                  <div className="p-3 border-b">
                    <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                      <SearchNormal1 size={16} color="#98A2B3" />
                      <input
                        placeholder="Search"
                        className="w-full text-sm outline-none placeholder:text-[#98A2B3]"
                      />
                    </div>
                  </div>

                  <div className="max-h-[220px] overflow-y-auto px-3 py-2 space-y-2 show-scrolls">
                    {options?.map((item) => (
                      <label
                        key={item?.key}
                        className="flex items-center gap-3 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={item?.checked}
                          className="w-4 h-4 accent-[#1E45E1] rounded"
                        />
                        <span className="text-[#101828]">{item?.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="p-3 border-t flex gap-2">
                    <button className="flex-1 py-2 text-sm border rounded-lg text-[#344054]">
                      Reset
                    </button>
                    <button className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg">
                      Apply Filters
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          // Fills the space left on screen (md+) and scrolls if that's shorter
          // than the message, so the empty state is never cut off.
          <div className="mt-2 md:flex-1 md:min-h-0 md:overflow-y-auto show-scrolls [&>div]:h-full">
            <NoDataMessage
              label="Invoice"
              isSearching={isSearching}
              isClearSearch={false}
              isHeightChanged={true}
            />
          </div>
        )}
        {invoiceFilter && (
          <InvoiceRegisterFilter
            show={invoiceFilter}
            handleClose={handleCloseFilterBills}
            size={size}
            page={page}
            startDate={startDate}
            endDate={endDate}
          />
        )}
        {isConsolidated && (
          <ConsolidatedExportSettings
            show={showExportSettings}
            onClose={() => setShowExportSettings(false)}
            // Preview closed -> fetch the table again (isPaginated: true).
            onPreviewClosed={() => setConsolidatedRefreshKey((key) => key + 1)}
            scope={{
              filters: consolidatedFilters,
              period: selectedRange,
              includeAllTenants,
            }}
          />
        )}
      </div>
    </div>
  );
}
export default withErrorBoundary(InvoiceRegister);

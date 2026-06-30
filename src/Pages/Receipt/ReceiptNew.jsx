/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ReceiptList from "../../Pages/Receipt/ReceiptList";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "flatpickr/dist/themes/material_blue.css";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import AddReceiptForm from "../Receipt/AddReceipt";
import { toast } from "react-toastify";
import {
  CloseCircle,
  SearchNormal1,
  Setting3,
  Filter,
  ArrowDown,
} from "iconsax-react";
import "../OthersComponent/BillPdfModal.css";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import { FiSearch } from "react-icons/fi";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import ApiPagination from "../../Components/ApiPagination";
import Select from "react-select";
import { DndContext, closestCenter } from "@dnd-kit/core";
import Delete from "../../Assets/Images/Delete_red.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Download from "../../Assets/Images/New_images/download.png";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ReceiptFilter from "./ReceiptFilter";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "32px",
    height: "32px",
    width: "100%",
    border: `1px solid ${state.hasValue ? "#1E45E1" : "#D1D5DB"}`,
    borderRadius: "8px",
    fontSize: "12px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    cursor: "pointer",
    backgroundColor: state.hasValue ? "#1E45E1" : "#fff",

    "&:hover": {
      borderColor: state.hasValue ? "#1E45E1" : "#D1D5DB",
    },
  }),

  singleValue: (base) => ({
    ...base,
    color: "#FFF",
    fontWeight: 500,
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 13,
      padding: "6px 12px",
      // margin: "2px 10px",
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

  dropdownIndicator: (base) => ({
    ...base,
    padding: "4px",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function ReceiptNew() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const pdfOpenedRef = useRef(false);
  const navigate = useNavigate();
  const [receiptformShow, setReceiptFormShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [receiptData, setReceiptData] = useState();
  const [receiptLoader, setReceiptLoader] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [open, setOpen] = useState(false);
  const [editvalue, setEditvalue] = useState("");
  const [receiptedit, setReceiptEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [receiptFilter, setReceiptFilter] = useState(false);
  const [chips, setChips] = useState([]);
  const tableContainerRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  const listRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const isSearching = chips.length > 0 || searchQuery?.trim() !== "";
  const [receiptType, setReceiptType] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteitem, setDeleteItem] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const popupRef = useRef(null);
  const {
    canWriteModule: canWriteReceipt,
    canReadModule: canReadReceipt,
    canDeleteModule: canDeleteReceipt,
    canUpdateModule: canUpdateReceipt,
  } = useHasPermission("Receipt");

  const receiptTypeOptions = [
    { value: "Booking", label: "Booking" },
    { value: "Advance", label: "Advance" },
    { value: "Rent", label: "Rent" },
  ];

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;

  const isExportAllow = isValidSubscription && canReadReceipt;

  const handleDelete = () => {
    if (deleteitem) {
      dispatch({
        type: "DELETE_RECEIPT",
        payload: {
          hostelId: state.login?.selectedHostel_Id,
          receiptId: deleteitem.transactionId,
        },
      });
      setDeleteLoading(true);
    }
  };

  useEffect(() => {
    if (state.InvoiceList?.receiptDeleteError) {
      setDeleteLoading(false);
      setDeleteShow(false);
      dispatch({ type: "REMOVE_DELETE_RECEIPT_ERROR" });
    }
  }, [state.InvoiceList?.receiptDeleteError]);

  const handleDeleteForm = (item) => {
    setDeleteShow(true);
    setDeleteItem(item);
  };

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;

      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideAccount);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, []);

  useEffect(() => {
    if (!canReadReceipt) {
      setReceiptLoader(false);
    }
  }, [canReadReceipt]);

  useEffect(() => {
    setReceiptLoader(true);
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setReceiptLoader(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  //   useEffect(() => {
  //     if (state.InvoiceList.updateTenantRecurringStatusCode) {
  //       dispatch({
  //         type: "RECURRING-BILLS-LIST",
  //         payload: state.login?.selectedHostel_Id,
  //       });

  //       setTimeout(() => {
  //         dispatch({ type: "REMOVE_UPDATE_TENANT_RECURRING" });
  //       }, 100);
  //     }
  //   }, [state.InvoiceList.updateTenantRecurringStatusCode]);

  const handleReceiptShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding receipt information.", {
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
  };
  const handleResetCustomize = () => {
    setCustomizeItems([...initialCustomizeItems]);
    setError("");
  };

  const handleSave = () => {
    setError("");
    const hasSelected = customizeItems.some((item) => item.selected);
    if (!hasSelected) {
      setError("Please select at least one column");
      return;
    }
    const payload = customizeItems.map((item, index) => ({
      fieldName: item.key,
      isSelected: item.selected,
      order: index + 1,
    }));

    if (payload) {
      dispatch({
        type: "CUSTOMIZE_RECEIPT_COLUMNS_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customize: payload,
        },
      });
      setCustomizeLoading(true);
    }
  };

  //   useEffect(() => {
  //     if (state.ComplianceList?.updateCustomizationSuccess === 200) {
  //       dispatch({
  //         type: "VENDORLIST",
  //         payload: {
  //           hostelId: state.login.selectedHostel_Id,
  //           page: page,
  //           size: size,
  //         },
  //       });
  //       setOpen(false);
  //       setCustomizeLoading(false);

  //       setTimeout(() => {
  //         dispatch({ type: "REMOVE_CUSTOMIZE_VENDOR_REDUCER" });
  //       }, 100);
  //     }
  //   }, [state.ComplianceList?.updateCustomizationSuccess]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setReceiptLoader(true);
      dispatch({
        type: "CUSTOMIZE_RECEIPTS_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          keyword: debouncedSearch,
          size: size,
          page: debouncedSearch || receiptType ? 1 : page,
          period: "",
          bankIds: [],
          invoiceType: receiptType,
          collectedBy: [],
          minAmount: "",
          maxAmount: "",
        },
      });
      dispatch({
        type: "SET_RECEIPT_FILTERS",
        payload: {
          search: debouncedSearch,
          type: receiptType,
        },
      });
    }
  }, [state.login.selectedHostel_Id, page, size, debouncedSearch, receiptType]);

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_RECEIPT_FILTERS",
        payload: {
          type: "",
          collectedBy: [],
          collectedBYLabels: [],
          modes: [],
          period: "",
          search: "",
          minAmount: "",
          maxAmount: "",
          paymentLabels: [],
        },
      });
      setReceiptLoader(true);

      setChips([]);
      setSearchQuery("");
      setReceiptType("");
    };
  }, []);

  const handleReset = () => {
    dispatch({
      type: "SET_RECEIPT_FILTERS",
      payload: {
        type: "",
        collectedBy: [],
        collectedBYLabels: [],
        modes: [],
        period: "",
        search: "",
        minAmount: "",
        maxAmount: "",
        paymentLabels: [],
      },
    });
    dispatch({
      type: "CUSTOMIZE_RECEIPTS_LIST_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        size: size,
        page: page,
      },
    });
    setReceiptLoader(true);

    setChips([]);
    setSearchQuery("");
    setReceiptType("");
  };

  useEffect(() => {
    const receiptFilters = state.InvoiceList?.receiptFilters;
    console.log("receiptFilters", receiptFilters);

    const filterData = [];

    if (receiptFilters?.search) {
      filterData.push({
        key: "search",
        label: "Tenant",
        type: "search",
        value: receiptFilters.search,
      });
    }

    if (receiptFilters?.type) {
      filterData.push({
        key: "invoiceType",
        label: "Type",
        type: "invoiceType",
        value: receiptFilters.type,
      });
    }

    if (receiptFilters?.modes?.length) {
      filterData.push({
        key: "paymentMode",
        label: "Payment Mode",
        type: "paymentMode",
        value: receiptFilters.modes,
      });
    }

    if (receiptFilters?.collectedBy?.length) {
      filterData.push({
        key: "collectedBy",
        label: "Collected By",
        type: "collectedBy",
        value:
          receiptFilters.collectedBYLabels?.join(", ") ||
          receiptFilters.collectedBy.join(", "),
      });
    }

    if (receiptFilters?.period) {
      filterData.push({
        key: "period",
        label: "Period",
        type: "period",
        value: receiptFilters.period,
      });
    }

    if (receiptFilters?.minAmount || receiptFilters?.maxAmount) {
      filterData.push({
        key: "amount",
        label: "Amount",
        type: "amount",
        value: `₹${receiptFilters.minAmount || 0} - ₹${receiptFilters.maxAmount || "∞"}`,
      });
    }

    setChips(filterData);
  }, [state.InvoiceList?.receiptFilters]);

  useEffect(() => {
    if (state.InvoiceList.pdfErrorMessage) {
      setPdfLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_PDF_ERROR" });
      }, 100);
    }
  }, [state.InvoiceList.pdfErrorMessage]);
  useEffect(() => {
    if (state.createAccount?.networkError) {
      setPdfLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 100);
    }
  }, [state.createAccount?.networkError]);

  const handleReceiptDetail = (item) => {
    if (item.transactionId) {
      dispatch({
        type: "RECEIPTPDF",
        payload: {
          transactionId: item.transactionId,
          hostelId: state.login?.selectedHostel_Id,
        },
      });

      setPdfLoading(true);
    }
  };

  useEffect(() => {
    if (state.InvoiceList.statusCodeForReceiptPDf === 200) {
      if (!state.InvoiceList.ReceiptPDF) return;
      // if (pdfOpenedRef.current) return;
      // pdfOpenedRef.current = true;
      setPdfLoading(false);
      window.open(state.InvoiceList.ReceiptPDF, "_blank");

      dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
    }
  }, [state.InvoiceList.statusCodeForReceiptPDf]);

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };
  const handleEditReceipt = (item) => {
    setReceiptFormShow(true);
    setEditvalue(item);
    setReceiptEdit(true);
  };

  const handleBackBill = () => {
    dispatch({ type: "CLEAR_UNABLE_ADD_INVOICE_DETAILS" });
    setReceiptFormShow(false);

    setEditvalue("");
    setReceiptEdit(false);
  };

  const handleDisplayReceiptDownload = () => {
    setSearch(false);
  };

  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }
  }, [state.InvoiceList.statusCodeNewReceiptStatusCode]);

  const handleSearch = () => {
    setSearch(!search);
    dispatch({
      type: "SET_RECEIPT_FILTERS",
      payload: {
        type: "",
        collectedBy: [],
        collectedBYLabels: [],
        modes: [],
        period: "",
        search: "",
        minAmount: "",
        maxAmount: "",
        paymentLabels: [],
      },
    });
  };

  // console.log("state", state);

  const stats = [
    {
      title: "Total Receipts",
      value: state.InvoiceList?.getCustomizeReceiptList?.totalReceipt,
      icon: true,
      highlight: true,
    },
    {
      title: "Total Amount",
      value: `₹ ${state.InvoiceList?.getCustomizeReceiptList?.totalAmount}`,
    },
    {
      title: "Collected Amount",
      value: `₹ ${state.InvoiceList?.getCustomizeReceiptList?.paidAmount}`,
    },
    {
      title: "Refunded Amount",
      value: `₹ ${state.InvoiceList?.getCustomizeReceiptList?.refundAmount}`,
    },
  ];

  useEffect(() => {
    if (state.InvoiceList.getReceiptSucessStatus === 200) {
      setReceiptData(state.InvoiceList?.getCustomizeReceiptList);
      setReceiptLoader(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_CUSTOMIZE_RECEIPTS_LIST_REDUCER" });
      }, 100);
    }
  }, [state.InvoiceList.getReceiptSucessStatus]);

  const filterOptionsData = useSelector(
    (state) => state.InvoiceList?.getCustomizeReceiptList?.filterOptions,
  );

  const typeOptions = [
    {
      label: "All",
      value: "",
    },
    ...(filterOptionsData?.invoiceType?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || []),
  ];

  useEffect(() => {
    setReceiptLoader(false);
  }, [state.InvoiceList.getCustomizeReceiptList]);

  useEffect(() => {
    if (
      state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||
      state.InvoiceList.ReceiptDeletesuccessStatuscode === 204 ||
      state.InvoiceList.ReceiptEditsuccessStatuscode === 200
    ) {
      handleBackBill();

      dispatch({
        type: "CUSTOMIZE_RECEIPTS_LIST_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          size: size,
          page: page,
        },
      });
      setReceiptLoader(true);

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
    return () => {
      dispatch({
        type: "SET_RECEIPT_FILTERS",
        payload: {
          type: "",
          collectedBy: [],
          collectedBYLabels: [],
          modes: [],
          period: "",
          search: "",
          minAmount: "",
          maxAmount: "",
          paymentLabels: [],
        },
      });
    };
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.login?.selectedHostel_Id) {
      setPage(1);
      setSearchQuery("");
      setReceiptType("");
    }
  }, [state.login.selectedHostel_Id]);

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

  const currentPage = receiptData?.currentPage ?? 1;

  const totalPages = receiptData?.totalPages ?? 1;

  const totalRecords = receiptData?.totalReceipt ?? 0;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

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

  //   const filteredCustomizeItems = customizeItems.filter((item) =>
  //     item.fieldName.toLowerCase().includes(searchText.toLowerCase()),
  //   );

  //   const selectedColumns = (customizeItems || []).filter((col) => col.selected);

  //   const allSelected =
  //     Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);

  const statusStyles = {
    "Fully Settled": {
      bg: "#EFFFF2",
      text: "#038C3D",
    },
    "Partially Paid": {
      bg: "#FFF4E5",
      text: "#F79009",
    },
    "Not Paid": {
      bg: "#FEE4E2",
      text: "#D92D20",
    },
    "No Transaction": {
      bg: "#F2F4F7",
      text: "#667085",
    },
  };
  const headerKeyMap = {
    "Receipt No": "receiptNo",
    "Full Name": "name",
    "Reference Id": "referenceId",
    "Invoice Number": "invoiceNo",
    " Payment Date": "date",
    Type: "type",
    "Payment Mode": "paymentMode",
    Amount: "amount",
  };

  //   const formattedData = (filteredData?.vendors || []).map((row) => {
  //     const obj = {};

  //     (filteredData?.tableHeaders || []).forEach((header, index) => {
  //       const key = headerKeyMap[header];
  //       const value = row[index];

  //       if (key) {
  //         obj[key] = value ?? "-";
  //       }
  //     });

  //     const apiData = row[row.length - 1];

  //     obj.apiCall = {
  //       vendorId: apiData?.vendorId || null,
  //       status: apiData?.status || null,
  //     };

  //     return obj;
  //   });

  // console.log("formattedData", formattedData);

  const formattedData =
    receiptData?.listReceipts?.map((item) => ({
      transactionId: item.transactionId,
      customerId: item.customerId,
      profilePic: item.profilePic,
      initials: item.initials,
      receiptNo: item.transactionNumber || "-",
      name: item.fullName || "-",
      referenceId: item.referenceNumber || "-",
      invoiceNo: item.invoiceNumber || "-",
      date: item.paidAt || "-",
      type: item.invoiceType || "-",
      paymentMode: item.bankName || "-",
      amount: item.paidAmount || 0,
    })) || [];

  const selectedColumns = [
    { key: "receiptNo", fieldName: "Receipt No" },
    { key: "name", fieldName: "Full Name" },
    { key: "referenceId", fieldName: "Reference Id" },
    { key: "invoiceNo", fieldName: "Invoice Number" },
    { key: "date", fieldName: "Payment Date" },
    { key: "type", fieldName: "Type" },
    { key: "paymentMode", fieldName: "Payment Mode" },
    { key: "amount", fieldName: "Amount" },
  ];

  const columnStyles = {
    "Receipt No": "px-4 whitespace-nowrap",
    "Full Name": "px-4 whitespace-nowrap",
    "Reference Id": "px-4 whitespace-nowrap",
    "Invoice Number": "px-4 whitespace-nowrap",
    " Payment Date": "px-4 whitespace-nowrap",
    Type: "px-4 whitespace-nowrap",
    "Payment Mode": "px-4 whitespace-nowrap",
    Amount: "px-4 whitespace-nowrap",
  };
  const handleClickFilter = () => {
    setReceiptFilter(true);
  };

  const handleCloseFilterBills = () => {
    setReceiptFilter(false);
  };

  const handleShowDots = (id, event) => {
    setActiveRow((prev) => (prev === id ? null : id));
    setSearch(false);

    const rect = event.currentTarget.getBoundingClientRect();

    const popupHeight = 120;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < popupHeight) {
      setShowAbove(true);
    } else {
      setShowAbove(false);
    }

    setPopupPosition({
      top: rect.bottom,
      left: rect.left,
    });
  };

  //   useEffect(() => {
  //     const cols = filteredData?.columnList || [];

  //     const formatted = cols.map((col) => ({
  //       ...col,
  //       key: col.fieldName,
  //       selected: col.selected,
  //     }));

  //     setCustomizeItems(formatted);
  //     setInitialCustomizeItems(formatted);
  //   }, [filteredData?.columnList]);

  const handleReceiptClick = (item) => {
    // console.log("callledffffffffff");
    if (item?.transactionId && state.login.selectedHostel_Id) {
      dispatch({
        type: "RECEIPTPDF_NEWCHANGES",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          transactionId: item.transactionId,
        },
      });
      navigate(`/receipts/details/${item.transactionId}`, {
        state: {
          rowData: item,
        },
      });
    }
  };

  const handleNavigateTenantProfile = (view) => {
    if (view) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: view.customerId },
      });
      navigate(`/tenant/details/${view.customerId}`, {
        state: {
          customerId: view.customerId,
          IsOverView: true,
          totriggerBillTap: false,
          isReceiptWay: true,
        },
      });
    }
  };

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="sticky top-0 z-10 bg-white p-2 flex justify-between items-center flex-wrap  font-gilroy min-h-[60px] sm:min-h-[60px]">
          <div>
            <label className="text-[18px] font-semibold font-gilroy text-black">
              Receipt
            </label>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="relative min-w-[180px] max-w-[260px]">
              <div
                className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
        ${
          canReadReceipt
            ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
            : "border-gray-200 opacity-60 cursor-not-allowed"
        }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  disabled={!canReadReceipt}
                  className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] "
                />
                <SearchNormal1
                  size="18"
                  color={canReadReceipt ? "#6B7280" : "#A0A0A0"}
                  className="mr-2"
                />
              </div>
            </div>
          </div>
        </div>

        {!canReadReceipt ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <div>
            <div className="w-full my-2 bg-[#F9F9F9] rounded-xl px-6 py-4 flex items-center gap-24 font-gilroy ">
              {stats?.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {item.highlight && (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      {item.icon && (
                        <ArrowDown
                          color="#16A34A"
                          size={18}
                          className="rotate-[310deg]"
                        />
                      )}
                    </div>
                  )}

                  <div>
                    <div className="text-xs text-[#6B7280] flex items-center gap-1">
                      {item.title}
                    </div>

                    <div className="text-lg font-semibold text-[#111827]">
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative flex flex-col flex-1 min-h-0">
              {receiptLoader && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent z-[9999]">
                  <div className="w-[40px] h-[40px] rounded-full border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent animate-spin" />
                </div>
              )}

              {pdfLoading && (
                <div className="fixed inset-0 flex items-center justify-center  bg-transparent opacity-75 z-10">
                  <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-40  bg-white h-[40px]">
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className={`border border-gray-300 rounded-lg w-36 ${
                      receiptType ? "bg-gray-100 text-gray-700" : "bg-white"
                    }`}
                  >
                    <Select
                      styles={CustomStyles}
                      isDisabled={!canReadReceipt}
                      menuPlacement="auto"
                      classNamePrefix="custom"
                      id="statusselect"
                      options={typeOptions}
                      value={
                        typeOptions.find(
                          (option) => option.value === receiptType,
                        ) || null
                      }
                      placeholder="Select  Type"
                      onChange={(option) => setReceiptType(option?.value || "")}
                    />
                  </div>

                  <div
                    className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
                  >
                    <Filter
                      size={16}
                      onClick={(e) => {
                        if (canReadReceipt) {
                          e.stopPropagation();
                          handleClickFilter();
                        }
                      }}
                      className={`transition-opacity duration-300 ${
                        canReadReceipt
                          ? "cursor-pointer opacity-100 pointer-events-auto"
                          : "cursor-not-allowed opacity-40 pointer-events-none"
                      }`}
                    />
                  </div>
                </div>

                <div className={` flex items-center justify-end gap-2 mr-2 `}>
                  <div>
                    <Setting3
                      // onClick={() => {
                      //   setOpen(!open);
                      // }}
                      className="cursor-pointer"
                      size="22"
                      color="#4B4B4B"
                    />
                  </div>

                  {formattedData?.length > 0 && (
                    <ApiPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      totalRecords={totalRecords}
                      onPageChange={handlePageChange}
                      onSizeChange={handleSizeChange}
                      isTenantPagination={true}
                      size={size}
                    />
                  )}
                </div>
              </div>

              {chips?.length > 0 && (
                <div className="flex flex-wrap items-start gap-3 p-3 mx-3 mt-3 mb-3 rounded-lg bg-gray-50 border border-gray-200">
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

              {formattedData?.length > 0 ? (
                <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                  <div
                    id="tableContainer"
                    ref={tableContainerRef}
                    className="overflow-auto relative h-[calc(100vh-140px)] rounded-xl show-scrolls"
                  >
                    <table className=" w-full font-gilroy ">
                      <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
                        <tr className="h-9">
                          {selectedColumns?.map((col, index) => {
                            let stickyClass = "";

                            if (index === 0) {
                              stickyClass =
                                "sticky left-[0px] z-40 bg-[#F9FAFB] w-[80px]";
                            }

                            return (
                              <th
                                key={col.key}
                                className={`px-4 py-2.5 uppercase whitespace-nowrap text-start ${stickyClass}`}
                              >
                                {col.fieldName}
                              </th>
                            );
                          })}

                          <th className="px-4 py-2.5 uppercase sticky right-0 z-20 bg-[#F9FAFB] text-center">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(formattedData) &&
                          formattedData?.length > 0 &&
                          formattedData?.map((user, index) => {
                            return (
                              <tr
                                onClick={(e) => {
                                  e.stopPropagation();
                                }}
                                key={index}
                                className="text-sm font-gilroy border-b border-[#E8E8E8]  
                                        cursor-pointer group  hover:!bg-gray-50 !h-10"
                              >
                                {selectedColumns?.map((col, index) => {
                                  const baseClass = ` 
    ${columnStyles[col.fieldName] || "px-4"}
    hover:!bg-gray-50 group-hover:!bg-gray-50 whitespace-nowrap text-[14px]
  `;

                                  let stickyClass = "";

                                  if (index === 0) {
                                    stickyClass = `sticky left-[0px] z-20 w-[80px] ${
                                      isScrolling ? "!bg-white" : "!bg-white"
                                    }`;
                                  }

                                  const finalClass = `${baseClass} ${stickyClass}`;

                                  let value;

                                  switch (col.key) {
                                    case "receiptNo":
                                      value = (
                                        <span
                                          className="text-[#1E45E1] cursor-pointer font-semibold hover:underline"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleReceiptClick(user);
                                          }}
                                        >
                                          {user.receiptNo || "-"}
                                        </span>
                                      );
                                      break;

                                    case "name":
                                      value = (
                                        <div
                                          className="flex items-center gap-2 cursor-pointer py-1"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleNavigateTenantProfile(user);
                                          }}
                                        >
                                          {user?.profilePic ? (
                                            <img
                                              src={user.profilePic}
                                              alt="profile"
                                              className="w-6 h-6 rounded-full object-cover flex-shrink-0"
                                            />
                                          ) : (
                                            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-[10px] flex-shrink-0">
                                              {user?.initials || "-"}
                                            </div>
                                          )}

                                          <span className="truncate max-w-[120px] leading-5 text-[#1E45E1] cursor-pointer font-semibold hover:underline">
                                            {user.name || "-"}
                                          </span>
                                        </div>
                                      );
                                      break;

                                    case "referenceId":
                                      value = user.referenceId || "-";
                                      break;

                                    case "invoiceNo":
                                      value = user.invoiceNo || "-";
                                      break;

                                    case "date":
                                      value = user.date || "-";
                                      break;

                                    case "type":
                                      value = user.type || "-";
                                      break;

                                    case "paymentMode":
                                      value = user.paymentMode || "-";
                                      break;

                                    case "amount":
                                      value = user.amount || 0;
                                      break;

                                    default:
                                      value = user[col.key] ?? "-";
                                  }

                                  return (
                                    <td
                                      key={col.key}
                                      className={`${finalClass} align-middle py-1`}
                                    >
                                      {value}
                                    </td>
                                  );
                                })}

                                <td
                                  className={`${
                                    isScrolling ? "!bg-white" : "bg-white"
                                  } px-4  sticky right-0 !z-20 hover:!bg-gray-50 group-hover:!bg-gray-50 text-[#111928]`}
                                >
                                  {" "}
                                  <div
                                    className="relative flex cursor-pointer items-center justify-center"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleShowDots(user.transactionId, e);
                                    }}
                                  >
                                    <PiDotsThreeOutlineVerticalFill
                                      className={`h-5 w-5 rotate-90 ${
                                        activeRow === user.transactionId
                                          ? "text-[#1E45E1]"
                                          : "text-gray-500"
                                      }`}
                                    />

                                    {activeRow === user.transactionId && (
                                      <div
                                        ref={popupRef}
                                        className="fixed z-[9999] w-fit rounded-[10px] border border-[#EBEBEB] bg-[#F9F9F9] p-2 shadow-md"
                                        style={{
                                          top: showAbove
                                            ? popupPosition.top -
                                              (popupRef.current?.offsetHeight ||
                                                120) -
                                              10
                                            : popupPosition.top + 5,
                                          left: popupPosition.left - 180,
                                        }}
                                      >
                                        <div className="flex flex-col gap-1">
                                          <button
                                            type="button"
                                            disabled={!canDeleteReceipt}
                                            onClick={() =>
                                              handleDeleteForm(user)
                                            }
                                            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${
                                              canDeleteReceipt
                                                ? "cursor-pointer hover:bg-[#FFF0F0]"
                                                : "cursor-not-allowed opacity-50"
                                            }`}
                                          >
                                            <img
                                              src={Delete}
                                              alt="Delete"
                                              className="h-4 w-4"
                                            />
                                            <span className="font-gilroy text-[14px] font-medium text-[#FF0000]">
                                              Delete
                                            </span>
                                          </button>

                                          <button
                                            type="button"
                                            disabled={!isExportAllow}
                                            onClick={() =>
                                              handleReceiptDetail(user)
                                            }
                                            className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left transition-colors ${
                                              isExportAllow
                                                ? "cursor-pointer hover:bg-[#EDF2FF]"
                                                : "cursor-not-allowed opacity-50"
                                            }`}
                                          >
                                            <img
                                              src={Download}
                                              alt="Download"
                                              className="h-4 w-4"
                                            />
                                            <span className="font-gilroy text-[14px] font-medium text-[#222222]">
                                              Download
                                            </span>
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
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
                        <div className="relative font-gilroy">
                          <div className="p-3 border-b ">
                            <div className="flex items-center gap-2 justify-between mb-2">
                              <div className="text-[16px] text-[#333333] font-semibold ">
                                Customize Tabs{" "}
                              </div>
                              <div
                                onClick={() => {
                                  setCustomizeItems((prev) =>
                                    prev.map((i) => ({
                                      ...i,
                                      selected: !allSelected,
                                    })),
                                  );

                                  setError("");
                                }}
                                className="text-[#338BFF] text-[13px] font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                {" "}
                                <TiTick className="text-[#338BFF] text-[13px] font-semibold cursor-pointer" />{" "}
                                <span>
                                  {allSelected ? "Unselect all" : "Select all"}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                              <SearchNormal1 size={16} color="#98A2B3" />
                              <input
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                                placeholder="Search"
                                className="w-full text-sm outline-none placeholder:text-[#98A2B3]"
                              />
                            </div>
                          </div>

                          <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={(event) => {
                              const { active, over } = event;
                              if (!over) return;
                              if (active.id !== over?.id) {
                                const oldIndex = customizeItems.findIndex(
                                  (i) => i.key === active.id,
                                );
                                const newIndex = customizeItems.findIndex(
                                  (i) => i.key === over.id,
                                );

                                setCustomizeItems(
                                  arrayMove(customizeItems, oldIndex, newIndex),
                                );
                              }
                            }}
                          >
                            <SortableContext
                              items={customizeItems.map((i) => i.key)}
                              strategy={verticalListSortingStrategy}
                            >
                              <div className="max-h-[220px] overflow-y-auto px-3 py-2 space-y-2 show-scrolls">
                                {filteredCustomizeItems.length === 0 ? (
                                  <div className="text-sm text-gray-400 text-center py-3">
                                    No results found
                                  </div>
                                ) : (
                                  filteredCustomizeItems.map((item) => (
                                    <SortableItem key={item.key} item={item} />
                                  ))
                                )}
                              </div>
                            </SortableContext>
                          </DndContext>
                        </div>
                        {error && (
                          <div className="flex justify-center my-2">
                            <ErrorMessage message={error} type="warning" />
                          </div>
                        )}

                        <div className="p-3 border-t flex gap-2">
                          <button
                            onClick={handleResetCustomize}
                            className="flex-1 py-2 text-sm border rounded-lg text-[#344054]  font-gilroy"
                          >
                            Reset
                          </button>
                          <button
                            onClick={handleSave}
                            disabled={customizeLoading}
                            className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg disabled:opacity-70  font-gilroy"
                          >
                            {customizeLoading ? (
                              <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Saving...
                              </div>
                            ) : (
                              "Save"
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <NoDataMessage
                  label="Receipt"
                  isSearching={isSearching}
                  isClearSearch={true}
                  handleClear={() => {
                    setSearchQuery("");
                    setDebouncedSearch("");
                    handleReset();
                    setReceiptType("");
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {receiptFilter && (
        <ReceiptFilter
          show={receiptFilter}
          handleClose={handleCloseFilterBills}
          size={size}
        />
      )}

      {deleteShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
            <div className="px-6 pt-6">
              <h2 className="text-center text-[18px] font-gilroy font-semibold text-[#222222]">
                Delete Receipt?
              </h2>
            </div>

            <div className="px-6 py-4">
              <p className="text-center text-[14px] font-gilroy font-medium text-[#646464] mb-1">
                Are you sure you want to delete this Receipt?
              </p>
            </div>

            <div className="flex justify-center gap-4 px-6 pb-6">
              <button
                type="button"
                onClick={handleCloseDelete}
                className="w-full max-w-[160px] h-[52px] rounded-lg border border-[#1E45E1] bg-white text-[#1E45E1] font-semibold font-gilroy text-[14px] transition hover:bg-[#F5F8FF]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleteLoading}
                className={`w-full max-w-[160px] h-[52px] rounded-lg bg-[#1E45E1] text-white font-semibold font-gilroy text-[14px] flex items-center justify-center gap-2 transition ${
                  deleteLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#1738C8]"
                }`}
              >
                {deleteLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ReceiptNew;

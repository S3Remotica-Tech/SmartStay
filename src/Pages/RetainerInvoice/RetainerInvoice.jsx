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
  AddCircle,
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
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import ReceiptFilter from "./ReceiptFilter";

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
    cursor: "pointer",
    backgroundColor: state.hasValue ? "#F4F4F4" : "#fff",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#333",
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

function RetainerInvoice() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const pdfOpenedRef = useRef(false);
  const navigate = useNavigate();
  const [receiptformShow, setReceiptFormShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [receiptLoader, setReceiptLoader] = useState(false);
  const [filterInput, setFilterInput] = useState("");

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
  const [receiptType, setReceiptType] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);

  const { canWriteModule: canWriteInvoice, canReadModule: canReadInvoice } =
    useHasPermission("Bills");

  const receiptTypeOptions = [
    { value: "Booking", label: "Booking" },
    { value: "Advance", label: "Advance" },
    { value: "Rent", label: "Rent" },
  ];
  const stats = [
    {
      label: "Total Retainer Amount",
      value: "0",
      icon: true,
      highlight: true,
    },
    {
      label: "Booking",
      value: "0",
    },
    {
      label: "Advance ",
      value: "0",
    },
    {
      label: "Rent ",
      value: "0",
    },
    {
      label: "EB",
      value: "0",
    },
    {
      label: "General",
      value: "0",
    },
  ];

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  useEffect(() => {
    if (!canReadInvoice) {
      setReceiptLoader(false);
    }
  }, [canReadInvoice]);
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
      //   dispatch({
      //     type: "RECEIPTSLIST",
      //     payload: state.login.selectedHostel_Id,
      //   });
      dispatch({
        type: "SET_RECEIPT_FILTERS",
        payload: {
          search: searchQuery,
        },
      });
    }
  }, [state.login.selectedHostel_Id, page, size, debouncedSearch]);

  const handleReset = () => {
    dispatch({
      type: "SET_RECEIPT_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        type: [],
        collectedBY: [],
        collectedBYLabels: [],
        modes: [],
        period: [],
        search: "",
        amountrange: "",
      },
    });
    dispatch({
      type: "RECEIPTSLIST",
      payload: state.login.selectedHostel_Id,
    });

    setChips([]);
    setSearchQuery("");
  };

  //   useEffect(() => {
  //     const vendorFilters = state.ComplianceList?.vendorFilters;

  //     // console.log("vendorFilters", vendorFilters);

  //     const filterData = [];

  //     if (vendorFilters?.search) {
  //       filterData.push({
  //         key: "search",
  //         label: "Vendor",
  //         type: "search",
  //         value: vendorFilters.search,
  //       });
  //     }

  //     if (vendorFilters?.paymentStatusLabel) {
  //       filterData.push({
  //         key: "paymentStatus",
  //         label: "Payment Status",
  //         type: "paymentStatus",
  //         value: vendorFilters.paymentStatusLabel,
  //       });
  //     }

  //     if (vendorFilters?.categoryName) {
  //       filterData.push({
  //         key: "category",
  //         label: "Category",
  //         type: "category",
  //         value: vendorFilters.categoryName,
  //       });
  //     }

  //     setChips(filterData);
  //   }, [state.ComplianceList?.vendorFilters]);

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
    if (state.InvoiceList.ReceiptlistgetStatuscode === 200) {
      setReceiptData(state.InvoiceList.ReceiptList);
      setReceiptLoader(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.ReceiptlistgetStatuscode]);

  useEffect(() => {
    setReceiptLoader(false);
  }, [state.InvoiceList.ReceiptList]);

  useEffect(() => {
    if (
      state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||
      state.InvoiceList.ReceiptDeletesuccessStatuscode === 204 ||
      state.InvoiceList.ReceiptEditsuccessStatuscode === 200
    ) {
      handleBackBill();

      dispatch({
        type: "RECEIPTSLIST",
        payload: state.login.selectedHostel_Id,
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

  useEffect(() => {
    if (state.login?.selectedHostel_Id) {
      setPage(1);
      setSearchQuery("");
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

  //   const [page, setPage] = useState(1);
  //   const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

  //   useEffect(() => {
  //     const handleResize = () => {
  //       if (window.innerWidth >= 1440) {
  //         setPageSize(20);
  //       } else {
  //         setPageSize(10);
  //       }
  //       setPage(1);
  //     };

  //     window.addEventListener("resize", handleResize);
  //     return () => window.removeEventListener("resize", handleResize);
  //   }, []);

  //   const startIndex = (page - 1) * pageSize;
  //   const endIndex = startIndex + pageSize;

  //   const paginatedData = receiptData?.slice(startIndex, endIndex);

  const currentPage = receiptData?.currentPage ?? 1;

  const totalPages = receiptData?.totalPages ?? 1;

  const totalRecords = receiptData?.totalVendors ?? 0;

  // useEffect(() => {
  //   setPage(1);
  // }, [state.ComplianceList?.vendorFilters]);

  const handlePageChange = (page) => {
    setPage(page);
    // console.log("setPage", page);
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

  const formattedData = [];

  const columnStyles = {
    "Invoice No": "px-4 whitespace-nowrap",
    "Full Name": "px-4 whitespace-nowrap",
    Type: "px-4 whitespace-nowrap",
    "Invoice Date": "px-4 whitespace-nowrap",
    "Due Date": "px-4 whitespace-nowrap",
    Amount: "px-4 whitespace-nowrap",
    Due: "px-4 whitespace-nowrap",
    Status: "px-4 whitespace-nowrap",
  };

  const headerKeyMap = {
    "Invoice No": "invoiceNo",
    "Full Name": "name",
    Type: "type",
    "Invoice Date": "invoiceDate",
    "Due date": "dueDate",
    Amount: "amount",
    Due: "due",
    Status: "status",
  };

  const selectedColumns = [
    { key: "invoiceNo", fieldName: "Invoice No" },
    { key: "name", fieldName: "Full Name" },
    { key: "type", fieldName: "Type" },
    { key: "invoiceDate", fieldName: "Invoice Date" },
    { key: "dueDate", fieldName: "Due Date" },
    { key: "amount", fieldName: "Amount" },
    { key: "due", fieldName: "Due" },
    { key: "status", fieldName: "Status" },
  ];

  const handleClickFilter = () => {
    setReceiptFilter(true);
  };

  const handleCloseFilterBills = () => {
    setReceiptFilter(false);
  };

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding invoice information.", {
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

    navigate(`/add-retainer/${state.login.selectedHostel_Id}`);
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

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="sticky top-0 z-10 bg-white p-2 flex justify-between items-center flex-wrap  font-gilroy min-h-[60px] sm:min-h-[60px]">
          <div>
            <label className="text-[18px] font-semibold font-gilroy text-black">
              Retainer Invoices
            </label>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-2">
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
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  disabled={!canReadInvoice}
                  className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] "
                />
                <SearchNormal1
                  size="18"
                  color={canReadInvoice ? "#6B7280" : "#A0A0A0"}
                  className="mr-2"
                />
              </div>
            </div>
            <div>
              <button
                disabled={!canWriteInvoice}
                onClick={handleShow}
                className="bg-[#1E45E1] hover:bg-[#1E45E1] text-white text-[14px] font-semibold
             rounded-md px-4 py-2  whitespace-nowrap font-gilroy
             disabled:opacity-50 disabled:cursor-not-allowed  flex items-center gap-2"
              >
                <AddCircle color="#FFFFFF" size="16" /> Retainer
              </button>
            </div>
          </div>
        </div>

        {!canReadInvoice ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <>
            <div className="w-full my-2 bg-[#F9F9F9] rounded-xl px-4 sm:px-6 py-3 flex flex-wrap items-center gap-12 sm:gap-6 md:gap-10 font-gilroy">
              {stats.map((item, index) => (
                <div key={index} className="flex items-center gap-12">
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
                      isDisabled={!canReadInvoice}
                      menuPlacement="auto"
                      classNamePrefix="custom"
                      id="statusselect"
                      options={receiptTypeOptions}
                      value={
                        receiptTypeOptions.find(
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
                      onClick={() => {
                        if (canReadInvoice) {
                          setReceiptFilter(true);
                        }
                      }}
                      className={`transition-opacity duration-300 ${
                        canReadInvoice
                          ? "cursor-pointer opacity-100 pointer-events-auto"
                          : "cursor-not-allowed opacity-40 pointer-events-none"
                      }`}
                    />
                  </div>
                </div>

                <div className={` flex items-center justify-end gap-2 mr-2 `}>
                  <div>
                    <Setting3
                      onClick={() => {
                        setOpen(!open);
                      }}
                      className="cursor-pointer"
                      size="22"
                      color="#4B4B4B"
                    />
                  </div>

                  {receiptData?.length > 0 && (
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

              {/* {formattedData?.length > 0 ? ( */}
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
                          //  else if (index === 1) {
                          //   stickyClass =
                          //     "sticky left-[80px] z-40 bg-[#F9FAFB]";
                          // }

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
                                setShowOverview(true);
                                setSelectedVendorId(user.apiCall.vendorId);
                              }}
                              key={index}
                              className="text-sm font-gilroy border-b border-[#E8E8E8] h-10 
                                        cursor-pointer group  hover:!bg-gray-50"
                            >
                              {selectedColumns?.map((col, index) => {
                                const baseClass = `
      ${columnStyles[col.fieldName] || "px-4"}
      hover:!bg-gray-50 group-hover:!bg-gray-50 whitespace-nowrap text-[14px]
    `;

                                let stickyClass = "";

                                if (index === 0) {
                                  stickyClass = `sticky left-[0px] z-20  w-[80px] ${
                                    isScrolling ? "!bg-white" : "!bg-white"
                                  }`;
                                }

                                const finalClass = `${baseClass} ${stickyClass}`;

                                switch (col.fieldName) {
                                  case "Profile Pic":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`px-4 ${finalClass}`}
                                      >
                                        {typeof user?.profilePic === "string" &&
                                        user.profilePic.startsWith("http") ? (
                                          <img
                                            src={user.profilePic}
                                            className="w-8 h-8 rounded-full"
                                            alt="profile"
                                          />
                                        ) : (
                                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                                            {typeof user?.profilePic ===
                                            "string"
                                              ? user.profilePic
                                              : "NA"}
                                          </div>
                                        )}
                                      </td>
                                    );

                                  case "Full Name":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        <div className="relative group w-[100px] ">
                                          <span className="block w-full truncate text-sm text-[#111928] ">
                                            {user.fullName}
                                          </span>

                                          <div
                                            className="absolute left-full ml-2 top-1/2 -translate-y-1/2
            hidden group-hover:!block
           bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap
            z-[9999] pointer-events-none"
                                          >
                                            {user?.fullName}
                                          </div>
                                        </div>
                                      </td>
                                    );

                                  case "Payment Status":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        <span
                                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-0.5 text-xs text-[#222222]"
                                          style={{
                                            backgroundColor:
                                              statusStyles[user.paymentStatus]
                                                ?.bg || "#EEE",
                                          }}
                                        >
                                          <span
                                            className="h-2 w-2 rounded-full"
                                            style={{
                                              backgroundColor:
                                                statusStyles[user.paymentStatus]
                                                  ?.text || "#333",
                                            }}
                                          ></span>

                                          {user.paymentStatus}
                                        </span>
                                      </td>
                                    );

                                  case "Joining Date":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} truncate text-[#6B7280] font-medium`}
                                      >
                                        {user.joiningDate}
                                      </td>
                                    );

                                  case "Mobile No":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {user.mobile}
                                      </td>
                                    );

                                  case "Email ID":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {user.email}
                                      </td>
                                    );

                                  case "Vendor Code":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.vendorCode}
                                      </td>
                                    );

                                  case "Vendor Category":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.vendorCategoryName}
                                      </td>
                                    );
                                  case "Credit Limit":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.creditLimit}
                                      </td>
                                    );
                                  case "Credit Period":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.creditPeriod}
                                      </td>
                                    );
                                  case "Outstanding":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.outstanding}
                                      </td>
                                    );
                                  case "Last Transaction":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.lastTransaction}
                                      </td>
                                    );
                                  case "Address":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {getAddress(user)}
                                      </td>
                                    );
                                  default:
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {typeof user[
                                          headerKeyMap[col.fieldName]
                                        ] === "object"
                                          ? "-"
                                          : (user[
                                              headerKeyMap[col.fieldName]
                                            ] ?? "-")}
                                      </td>
                                    );
                                }
                              })}

                              <td
                                className={`${
                                  isScrolling ? "!bg-white" : "bg-white"
                                } px-4 py-1 sticky right-0 !z-20 hover:!bg-gray-50 group-hover:!bg-gray-50 text-[#111928]`}
                              >
                                {" "}
                                <div
                                  className="relative mt-1 flex cursor-pointer items-center justify-center"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShowDots(user.apiCall.vendorId, e);
                                  }}
                                >
                                  <PiDotsThreeOutlineVerticalFill
                                    className={`h-5 w-5 rotate-90 ${
                                      activeRow === user.apiCall.vendorId
                                        ? "text-[#1E45E1]"
                                        : "text-gray-500"
                                    }`}
                                  />

                                  {activeRow === user.apiCall.vendorId && (
                                    <div
                                      ref={popupRef}
                                      className="rounded-[10px] border border-[#EBEBEB] bg-[#F9F9F9] p-2 w-fit shadow-md z-[9999]"
                                      style={{
                                        top: showAbove
                                          ? popupPosition.top -
                                            (popupRef.current?.offsetHeight ||
                                              120) -
                                            10
                                          : popupPosition.top + 5,
                                        left: popupPosition.left - 150,
                                        position: "fixed",
                                      }}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveRow(null);
                                          if (canUpdateVendor) {
                                            handleEditVendor(user);
                                          }
                                        }}
                                        disabled={!canUpdateVendor}
                                        className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md
          ${
            canUpdateVendor
              ? "text-[#1E45E1] hover:bg-blue-100"
              : "text-gray-400 cursor-not-allowed"
          }`}
                                      >
                                        <Edit2
                                          size="16"
                                          color={
                                            canUpdateVendor
                                              ? "#1E45E1"
                                              : "#9CA3AF"
                                          }
                                        />
                                        Edit
                                      </button>

                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setActiveRow(null);
                                          if (canDeleteVendor) {
                                            handleDeleteVendor(user);
                                          }
                                        }}
                                        disabled={!canDeleteVendor}
                                        className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md
          ${
            canDeleteVendor
              ? "text-red-600 hover:bg-red-100"
              : "text-gray-400 cursor-not-allowed"
          }`}
                                      >
                                        <Trash
                                          size="16"
                                          color={
                                            canDeleteVendor
                                              ? "#FF0000"
                                              : "#9CA3AF"
                                          }
                                        />
                                        Delete
                                      </button>
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
              {/* ) : (
                <NoDataMessage
                  label="Receipt"
                  isSearching={isSearching}
                  isClearSearch={true}
                  handleClear={() => {
                    setSearchQuery("");
                    setCategoryFilter("");
                    setPaymentStatus("");
                    handleReset();
                  }}
                />
              )} */}
            </div>
          </>
        )}
      </div>

      {receiptFilter && (
        <ReceiptFilter
          show={receiptFilter}
          handleClose={handleCloseFilterBills}
        />
      )}
    </>
  );
}

export default RetainerInvoice;

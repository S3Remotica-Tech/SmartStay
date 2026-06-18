/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { FormControl, InputGroup, Table, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import AddExpenses from "./AddExpenses";
import ExpensesListTable from "./ExpensesListTable";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Filters from "../../Assets/Images/Filters.svg";
import Image from "react-bootstrap/Image";
import { useMediaQuery, useTheme } from "@mui/material";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import DeleteExpense from "./DeleteExpense";
import {
  CloseCircle,
  SearchNormal1,
  ArrowDown,
  Filter,
  Setting3,
  ArrowDown2,
  Chart21,
  Edit,
  Trash,
  Document,
} from "iconsax-react";
import ExpenseOverview from "./ExpenseOverview";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { TiTick } from "react-icons/ti";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import SettlementPayment from "../VendorFIle/SettlementPayment";
import ExpenseSettlement from "./ExpenseSettlement";

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

const stats = [
  {
    label: "Total Expense Amount",
    value: "0",
    icon: true,
    highlight: true,
  },
  {
    label: "Paid",
    value: "0",
  },
  {
    label: "Unpaid(Credit)",
    value: "0",
  },
  {
    label: "Partially paid ",
    value: "0",
  },
];

function Expenses() {
  const location = useLocation();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const navigate = useNavigate();
  const { RangePicker } = DatePicker;
  const [getData, setGetData] = useState([]);
  const selectedPriceRange = "All";
  const [showModal, setShowModal] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [showTagAsset, setshowTagAsset] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [assetValue, setAssetValue] = useState("");
  const [vendorValue, setVendorValue] = useState("");
  const [modeValue, setModeValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [ExcelFilterminAmount, setExcelFilterMinAmount] = useState(0);
  const [ExcelFiltermaxAmount, setExcelFilterMaxAmount] = useState(0);
  const [ExcelFilterPaymentmode, setExcelFilterPaymentmode] = useState("");
  const [ExcelFiltercategoryValue, setExcelFilterCategoryValue] = useState("");
  const [ExcelFilterDates, setExcelFilterDates] = useState([]);
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [dates, setDates] = useState([]);
  const [pickerKey, setPickerKey] = useState(0);
  const [filterInput, setFilterInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const tableContainerRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  const listRef = useRef(null);
  const tableRef = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [customizeItems, setCustomizeItems] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeRow, setActiveRow] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [showExpenseDelete, setShowExpenseDelete] = useState(false);
  const [deleteExpenseRowData, setDeleteExpenseRowData] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [statusfilter, setStatusFilter] = useState("ALL");
  const popupRef = useRef(null);
  const monthOptions = [];
  const selectOptions = [{ value: "ALL", label: "All" }];
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [showSettlementForm, setShowSettlementForm] = useState(false);
  const [showDots, setShowDots] = useState(null);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  const handleStatusFilter = (selected) => {
    setStatusFilter(selected?.value || "");
  };

  const handleShowSettlement = () => {
    setShowSettlementForm(true);
    // setShowOverview(false);
  };

  const handleCloseSettlement = () => {
    setShowSettlementForm(false);
  };

  const {
    canWriteModule: canWriteExpense,
    canReadModule: canReadExpense,
    canUpdateModule: canUpdateExpense,
    canDeleteModule: canDeleteExpense,
  } = useHasPermission("Expense");

  useEffect(() => {
    if (!canReadExpense) {
      setLoading(false);
    }
  }, [canReadExpense]);

  const isExpenseForm = location.state?.isExpenseForm || false;

  const handleShowDots = (event, id) => {
    setShowDots((prev) => (prev === id ? null : id));
    // console.log(id);
    const rect = event.currentTarget?.getBoundingClientRect();

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
  // console.log(showDots, "showDots");
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
    // const payload = customizeItems.map((item, index) => ({
    //   fieldName: item.key,
    //   isSelected: item.selected,
    //   order: index + 1,
    // }));

    // if (payload) {
    //   dispatch({
    //     type: "CUSTOMIZE_TENANT_COLUMNS_SAGA",
    //     payload: {
    //       hostelId: state.login.selectedHostel_Id,
    //       customize: payload,
    //     },
    //   });
    //   setCustomizeLoading(true);
    // }
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

  useEffect(() => {
    setShowModal(isExpenseForm);
  }, [isExpenseForm]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportExpence === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_EXPENSE_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportExpence, dispatch]);

  const handleClickOutside = (event) => {
    if (
      showFilter &&
      filterRef.current &&
      !filterRef.current.contains(event.target)
    ) {
      setShowFilter(false);
    }

    if (
      showDots &&
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      !showTagAsset &&
      !showDeletePopup
    ) {
      setShowDots(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter, showDots, showTagAsset, showDeletePopup]);

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding expense information.", {
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

    navigate(`/add-expense/${state.login.selectedHostel_Id}`, {
      state: {
        currentItem: currentItem,
      },
    });
  };

  const handleAmountValueChange = (e) => {
    setSelectedValue(null);
    const value = e.target.getAttribute("value");
    setAmountValue(value);
    setShowFilter(false);
    const amountRange = value;
    const [minAmount, maxAmount] = amountRange.split("-").map(Number);
    // setMinAmount(minAmount);
    // setMaxAmount(maxAmount);
    setExcelFilterMinAmount(minAmount);
    setExcelFilterMaxAmount(maxAmount);
    setShowAmount(false);
  };

  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "ASSETLIST",
        payload: state.login.selectedHostel_Id,
      });
      // dispatch({
      //   type: "EXPENCES-CATEGORY-LIST",
      //   payload: state.login.selectedHostel_Id
      // });
      dispatch({
        type: "VENDORLIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "EXPENSELIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  const { getExpenseStatusCode } = state.ExpenseList;

  useEffect(() => {
    if (getExpenseStatusCode === 200) {
      setLoading(false);
      setGetData(state.ExpenseList.expenseList);

      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPENSE_SATUS_CODE" });
      }, 4000);
    }
  }, [getExpenseStatusCode, state.ExpenseList.expenseList]);

  useEffect(() => {
    setLoading(false);
  }, [state.ExpenseList.expenseList]);

  useEffect(() => {
    if (
      state.ExpenseList.StatusCodeForAddExpenseSuccess === 201 ||
      state.ExpenseList.deleteExpenseStatusCode === 204 ||
      state.ExpenseList.StatusCodeForUpdateExpenseSuccess === 200
    ) {
      dispatch({
        type: "EXPENSELIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      setShowModal(false);
      setShowExpenseDelete(false);
      setDeleteLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_EXPENSE" });
        dispatch({ type: "CLEAR_ADD_EXPENSE_SATUS_CODE" });
        dispatch({ type: "REMOVE_UPDATE_EXPENSE_REDUCER" });
      }, 200);
    }
  }, [
    state.ExpenseList.StatusCodeForAddExpenseSuccess,
    state.ExpenseList.deleteExpenseStatusCode,
    state.login.selectedHostel_Id,
    state.ExpenseList.StatusCodeForUpdateExpenseSuccess,
  ]);

  const filterByPriceRange = (data) => {
    switch (selectedPriceRange) {
      case "0-100":
        return data.filter((item) => item.price <= 100);
      case "100-500":
        return data.filter((item) => item.price > 100 && item.price <= 500);
      case "500-1000":
        return data.filter((item) => item.price > 500 && item.price <= 1000);
      case "1000+":
        return data.filter((item) => item.price > 1000);
      case "All":
        return data;
      default:
        return data;
    }
  };

  const handleFilterByPrice = () => {
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    if (getData.length === 0) {
      setLoading(false);
    }
  }, [getData]);

  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // const filteredData = React.useMemo(
  //   () => filterByPriceRange(getData) || [],
  //   [getData],
  // );

  // const sortedData = React.useMemo(() => {
  //   return Array.isArray(filteredData) ? filteredData : [];
  // }, [filteredData]);

  const handleDeleteExpense = (id) => {
    if (!id) return;
    setShowExpenseDelete(true);
    setDeleteExpenseRowData(id);
  };

  const handleCloseForDeleteExpense = () => {
    setShowExpenseDelete(false);
  };

  const ConfirmDeleteExpense = () => {
    if (deleteExpenseRowData) {
      dispatch({
        type: "DELETEEXPENSE",
        payload: {
          expenseId: deleteExpenseRowData,
          hostelId: state.login.selectedHostel_Id,
        },
      });
      setDeleteLoading(true);
    }
  };

  const [showCategory, setShowCategory] = useState(false);
  const [showPaymentMode, setShowPaymentMode] = useState(false);
  const [showAmount, setShowAmount] = useState(false);

  const handleCatogoryChange = (e) => {
    setSelectedValue(null);
    setCategoryValue(e.target.getAttribute("value"));
    setExcelFilterCategoryValue(e.target.getAttribute("value"));
    setShowFilter(false);
    setShowCategory(false);
  };

  const handleModeValueChange = (e) => {
    setSelectedValue(null);
    setModeValue(e.target.getAttribute("value"));
    setExcelFilterPaymentmode(e.target.getAttribute("value"));
    setShowFilter(false);
    setShowPaymentMode(false);
  };
  const handleExpenseAll = (event) => {
    const value = event.target.getAttribute("value");
    setSelectedValue(value);
    setShowFilter(false);
  };

  const [showFilterExpense, setShowFilterExpense] = useState(false);

  const handleShowSearch = () => {
    setShowFilterExpense(!showFilterExpense);
  };

  const handleCloseSearch = () => {
    setShowFilterExpense(false);
    setGetData(state.ExpenseList.expenseList);
    setSearchQuery("");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const [showDropDown, setShowDropDown] = useState(false);

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
    if (searchItem !== "") {
      const filteredItems =
        state.ExpenseList.expenseList &&
        state.ExpenseList.expenseList.filter(
          (user) =>
            user.category_Name &&
            user.category_Name.toLowerCase().includes(searchItem.toLowerCase()),
        );

      setGetData(filteredItems);
      setShowDropDown(true);
    } else {
      setGetData(state.ExpenseList.expenseList);
    }
    // setCurrentPage(1);
  };

  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem !== "") {
      const filteredItems =
        state.ExpenseList.expenseList &&
        state.ExpenseList.expenseList.filter(
          (user) =>
            user.category_Name &&
            user.category_Name.toLowerCase().includes(searchItem.toLowerCase()),
        );

      setGetData(filteredItems);
      setShowDropDown(true);
    } else {
      setGetData(state.ExpenseList.expenseList);
    }
    // setCurrentPage(1);
    setShowDropDown(false);
  };

  const handleDateChange = (selectedDates) => {
    if (!selectedDates || selectedDates.length !== 2) {
      setDates([]);
      setExcelFilterDates([]);
      setSelectedValue("All");
      setCategoryValue("");
      setModeValue("");
      setAmountValue("");
      // setMinAmount("");
      // setMaxAmount("");
      setAssetValue("");
      setVendorValue("");
      setPickerKey((prevKey) => prevKey + 1);
      // setCurrentPage(1);

      dispatch({
        type: "EXPENSELIST",
        payload: { hostelId: state.login.selectedHostel_Id },
      });
      return;
    }

    const newStartDate = dayjs(selectedDates[0]).startOf("day");
    const newEndDate = dayjs(selectedDates[1]).endOf("day");
    setDates([newStartDate, newEndDate]);
    setExcelFilterDates([newStartDate, newEndDate]);
    // setCurrentPage(1);
  };

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;

    const payload = { hostelId: state.login.selectedHostel_Id };
    if (dates.length === 2) {
      payload.start_date = dates[0].format("YYYY-MM-DD");
      payload.end_date = dates[1].format("YYYY-MM-DD");
    }
    dispatch({ type: "EXPENSELIST", payload });
  }, [dates, state.login.selectedHostel_Id]);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;

    const payload = { hostelId: state.login.selectedHostel_Id };

    if (selectedValue === "All") {
      dispatch({ type: "EXPENSELIST", payload });
    } else if (categoryValue) {
      payload.category = categoryValue;
      dispatch({ type: "EXPENSELIST", payload });
    } else if (modeValue) {
      payload.payment_mode = modeValue;
      dispatch({ type: "EXPENSELIST", payload });
    } else if (amountValue) {
      const [minAmount, maxAmount] = amountValue.split("-").map(Number);
      payload.min_amount = minAmount;
      payload.max_amount = maxAmount;
      dispatch({ type: "EXPENSELIST", payload });
    } else if (assetValue) {
      payload.asset_id = assetValue;
      dispatch({ type: "EXPENSELIST", payload });
    } else if (vendorValue) {
      payload.vendor_id = vendorValue;
      dispatch({ type: "EXPENSELIST", payload });
    }
  }, [
    selectedValue,
    categoryValue,
    modeValue,
    amountValue,
    assetValue,
    vendorValue,
  ]);

  useEffect(() => {
    if (state.ExpenseList.getExpenseStatusCode === 200) {
      setGetData(state.ExpenseList.expenseList || []);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPENSE_SATUS_CODE" });
      }, 1000);
    }
  }, [state.ExpenseList.getExpenseStatusCode, state.ExpenseList.expenseList]);

  useEffect(() => {
    if (state.ExpenseList.nodataGetExpenseStatusCode === 201) {
      setGetData([]);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOEXPENSEdATA" });
      }, 1000);
    }
  }, [state.ExpenseList.nodataGetExpenseStatusCode]);

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

  const paginatedData = getData?.slice(startIndex, endIndex);

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  const filteredCustomizeItems = customizeItems.filter((item) =>
    item.fieldName.toLowerCase().includes(searchText.toLowerCase()),
  );

  //   const selectedColumns = (customizeItems || []).filter((col) => col.selected);
  const allSelected =
    Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);

  const statusStyles = {
    "Checked In": {
      bg: "#EFFFF2",
      text: "#038C3D",
    },
    Booked: {
      bg: "#E7F1FFB2",
      text: "#1E45E1",
    },
    "Notice Period": {
      bg: "#FFF4E5",
      text: "#F79009",
    },
    "Settlement Generated": {
      bg: "#FEE4E2",
      text: "#D92D20",
    },
  };

  const selectedColumns = [
    { key: "expenseId", fieldName: "Expense No" },
    { key: "title", fieldName: "TITLE" },
    { key: "date", fieldName: "date & Time" },
    { key: "category", fieldName: "Category" },
    { key: "subcategory", fieldName: "SUB Category" },
    { key: "vendor", fieldName: "Vendor" },
    { key: "status", fieldName: "Status" },
    { key: "paymentMode", fieldName: "Payment Mode" },
    { key: "totalAmount", fieldName: "Total amount" },
    { key: "paidAmount", fieldName: "Paid amount" },
    { key: "balanceAmount", fieldName: "Balance amount" },
  ];

  const headerKeyMap = {
    "Expense No": "referenceNumber",
    TITLE: "title",
    "date & Time": "transactionDate",
    Category: "categoryName",
    "SUB Category": "subCategoryName",
    Vendor: "vendor",
    Status: "paymentStatus",
    "Payment Mode": "bankName",
    "Total amount": "totalAmount",
    "Paid amount": "paidAmount",
    "Balance amount": "balanceAmount",
  };

  //   const formattedData = (userListDetail?.tenants || []).map((row) => {
  //     const obj = {};

  //     (userListDetail?.tableHeaders || []).forEach((header, index) => {
  //       const key = headerKeyMap[header];
  //       const value = row[index];

  //       if (key) {
  //         obj[key] = value ?? "-";
  //       }
  //     });

  //     const apiData = row[row.length - 1];

  //     obj.apiCall = {
  //       customerId: apiData?.customerId || null,
  //       status: apiData?.status || null,
  //     };

  //     return obj;
  //   });

  //   useEffect(() => {
  //     const cols = state?.UsersList?.Users?.columnList || [];

  //     const formatted = cols.map((col) => ({
  //       ...col,
  //       key: col.fieldName,
  //       selected: col.selected,
  //     }));

  //     setCustomizeItems(formatted);
  //     setInitialCustomizeItems(formatted);
  //   }, [state?.UsersList?.Users?.columnList]);

  const formattedData = getData?.map((item) => {
    const row = {};

    selectedColumns.forEach((column) => {
      const key = headerKeyMap[column];
      row[column] = item[key] ?? "-";
    });

    return row;
  });

  const columnStyles = {
    "Vendor ID": "px-4 whitespace-nowrap",
    "Vendor Name": "px-4 whitespace-nowrap",
    Category: "px-4 whitespace-nowrap",
    "Mobile No": "px-4 whitespace-nowrap",
    Address: "px-4 whitespace-nowrap",
    Status: "px-4 whitespace-nowrap",
    Outstanding: "px-4 whitespace-nowrap",
    "Last Transaction": "px-4 whitespace-nowrap",
  };

  const SortableItem = ({ item }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: item.key });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <label
        ref={setNodeRef}
        style={style}
        className="flex items-center gap-3 text-sm cursor-pointer bg-white"
      >
        <span
          {...attributes}
          {...listeners}
          onClick={(e) => e.stopPropagation()}
        >
          <IoMdMenu className="text-[#28303F] text-xl cursor-grab" />
        </span>

        <input
          type="checkbox"
          checked={item.selected}
          className="w-4 h-4 accent-[#1E45E1] rounded"
          onChange={() => {
            setCustomizeItems((prev = []) =>
              prev.map((i) =>
                i.key === item.key ? { ...i, selected: !i.selected } : i,
              ),
            );
          }}
        />

        <span className="text-[#101828] text-base">{item.fieldName}</span>
      </label>
    );
  };

  const handleEditExpense = (item) => {
    if (item) {
      navigate(`/add-expense/${state.login.selectedHostel_Id}`, {
        state: {
          currentItem: item,
        },
      });
    }
  };

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="flex items-center justify-between sticky top-0 bg-white z-20  min-h-[60px] sm:min-h-[60px]">
          <div className="col-span-12 md:col-auto flex flex-wrap items-center">
            <label className="text-lg text-black font-semibold font-gilroy">
              Expenses
            </label>
          </div>

          <div className="col-span-12 md:col flex flex-wrap gap-1 md:justify-end items-center">
            <div
              className={`flex items-center rounded-xl border px-3 py-1.5 !bg-white  transition
                                 ${
                                   canReadExpense
                                     ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
                                     : "border-gray-200 opacity-60 cursor-not-allowed"
                                 }`}
            >
              <input
                type="text"
                className="w-full !bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF]  disabled:cursor-not-allowed"
                placeholder="Search"
                value={filterInput}
                onChange={(e) => handlefilterInput(e)}
                disabled={canReadExpense}
              />

              <SearchNormal1
                size="18"
                color={canReadExpense ? "#6B7280" : "#A0A0A0"}
                className="mr-2"
              />
            </div>

            <div className="mr-1">
              <button
                disabled={!canWriteExpense}
                onClick={handleShow}
                className="bg-[#1E45E1] hover:bg-[#1E45E1] text-white text-[14px] font-semibold
             rounded-md px-4 py-2  whitespace-nowrap font-gilroy
             disabled:opacity-50 disabled:cursor-not-allowed "
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>

        {!canReadExpense ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <div className="relative">
            <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-40  bg-white h-[40px]">
              <div className="flex flex-wrap items-center gap-3">
                <div
                  className={`border border-gray-300 rounded-lg w-36 ${
                    statusfilter ? "bg-gray-100 text-gray-700" : "bg-white"
                  }`}
                >
                  <Select
                    options={selectOptions}
                    styles={CustomStyles}
                    isDisabled={!canReadExpense}
                    menuPlacement="auto"
                    classNamePrefix="custom"
                    onChange={(e) => handleStatusFilter(e)}
                    value={
                      selectOptions.find((opt) => opt.value === statusfilter) ||
                      null
                    }
                    id="statusselect"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Select
                    isDisabled={!canReadExpense}
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
                >
                  <Filter
                    size={16}
                    onClick={() => {
                      if (canReadExpense) {
                        setIsFilterOpen(true);
                      }
                    }}
                    className={`transition-opacity duration-300 ${
                      canReadExpense
                        ? "cursor-pointer opacity-100 pointer-events-auto"
                        : "cursor-not-allowed opacity-40 pointer-events-none"
                    }`}
                  />
                </div>

                <button
                  onClick={() => setShowOverview(true)}
                  className="cursor-pointer"
                >
                  <PiDotsThreeOutlineVerticalFill size={20} />
                </button>
              </div>

              <div className={` flex items-center justify-end gap-2 mr-2 `}>
                <div>
                  <Setting3
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer"
                    size="22"
                    color="#4B4B4B"
                  />
                </div>

                {/* {filteredData?.length > 0 && (
                  <ApiPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRecords={totalRecords}
                    onPageChange={handlePageChange}
                    onSizeChange={handleSizeChange}
                    isTenantPagination={true}
                    size={size}
                  />
                )} */}
              </div>
            </div>

            <div
              className="w-full my-2 bg-[#F9F9F9] rounded-xl px-4 sm:px-6 py-3 
            flex flex-wrap items-center gap-12 sm:gap-12 md:gap-12 font-gilroy"
            >
              {stats.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {item.highlight && (
                    <div
                      className="w-10 h-10 rounded-full bg-[#F3E4D0] flex items-center justify-center 
                    text-[#FF9500] font-semibold"
                    >
                      {item.icon && (
                        <Chart21
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

            {getData?.length > 0 ? (
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
                      {Array.isArray(getData) &&
                        getData?.length > 0 &&
                        getData?.map((user, index) => {
                          return (
                            <tr
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowOverview(true);
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

                                  case "Status":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        <span
                                          className="inline-flex items-center gap-2 rounded-lg px-2 py-0.5 text-xs"
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
                                          />
                                          {user.paymentStatus}
                                        </span>
                                      </td>
                                    );
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        <span
                                          className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-0.5 text-xs text-[#222222]"
                                          style={{
                                            backgroundColor:
                                              statusStyles[user.status]?.bg ||
                                              "#EEE",
                                          }}
                                        >
                                          <span
                                            className="h-2 w-2 rounded-full"
                                            style={{
                                              backgroundColor:
                                                statusStyles[user.status]
                                                  ?.text || "#333",
                                            }}
                                          ></span>

                                          {user.status}
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

                                  case "Floor":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {user.floorName}
                                      </td>
                                    );

                                  case "Room":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.roomName}
                                      </td>
                                    );

                                  case "Bed":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.bedName}
                                      </td>
                                    );
                                  case "Email ID":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.emailId}
                                      </td>
                                    );
                                  case "Booking Date":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.bookingDate}
                                      </td>
                                    );
                                  case "Monthly Rent":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.monthlyRent}
                                      </td>
                                    );
                                  case "Advance":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.advanceAmount}
                                      </td>
                                    );
                                  case "Booking Amount":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.bookingAmount}
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
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleShowDots(e, user.expenseId);
                                  }}
                                >
                                  <PiDotsThreeOutlineVerticalFill
                                    className={`h-5 w-5 rotate-90
                                         ${String(showDots) === String(user.expenseId) ? "text-blue-600" : "text-gray-500"}`}
                                  />

                                  {String(showDots) ===
                                    String(user.expenseId) && (
                                    <>
                                      <div
                                        ref={popupRef}
                                        className={`fixed flex flex-col items-start cursor-pointer
                                   bg-gray-50 w-40 border border-gray-200 rounded-lg translate-x-10
                                   
                                 `}
                                        style={{
                                          top: showAbove
                                            ? popupPosition.top -
                                              (popupRef.current?.offsetHeight ||
                                                100) -
                                              5
                                            : popupPosition.top - 9,
                                          left: popupPosition.left - 250,
                                        }}
                                      >
                                        <div
                                          onClick={() => {
                                            if (canWriteExpense) {
                                              // handleShowTagAsset();
                                            }
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#EDF2FF";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#F9F9F9";
                                          }}
                                          className={`flex justify-start items-center gap-2 w-full py-2 px-2 rounded-t-lg
                                 ${!canWriteExpense ? "cursor-not-allowed opacity-50" : "cursor-pointer opacity-100"}
                               `}
                                        >
                                          <Document
                                            size="16"
                                            color={"#1E45E1"}
                                          />
                                          <label
                                            className={`text-sm font-semibold font-gilroy text-gray-800
                                 ${!canWriteExpense ? "cursor-not-allowed" : "cursor-pointer"}
                               `}
                                          >
                                            Tag Asset
                                          </label>
                                        </div>

                                        <div className="h-px bg-gray-100 m-0" />
                                        <div
                                          className={`flex justify-start items-center gap-2 w-full py-2 px-2 ${
                                            !canUpdateExpense
                                              ? "cursor-not-allowed opacity-50"
                                              : "cursor-pointer opacity-100"
                                          }`}
                                          onClick={() => {
                                            if (canUpdateExpense) {
                                              handleEditExpense(user);
                                            }
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#EDF2FF";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#F9F9F9";
                                          }}
                                        >
                                          <Edit size="16" color={"#1E45E1"} />
                                          <label
                                            className={`text-sm font-semibold font-gilroy text-gray-800 ${
                                              !canUpdateExpense
                                                ? "cursor-not-allowed"
                                                : "cursor-pointer"
                                            }`}
                                          >
                                            Edit
                                          </label>
                                        </div>

                                        <div className="h-px bg-gray-100 m-0" />

                                        <div
                                          className={`flex items-center justify-start gap-2 w-full px-2 py-2 rounded-b-lg
                                 ${!canDeleteExpense ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
                               `}
                                          onClick={() => {
                                            if (canDeleteExpense) {
                                              handleDeleteExpense(
                                                user.expenseId,
                                              );
                                            }
                                          }}
                                          onMouseEnter={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#FFF0F0";
                                          }}
                                          onMouseLeave={(e) => {
                                            e.currentTarget.style.backgroundColor =
                                              "#F9F9F9";
                                          }}
                                        >
                                          <Trash size="16" color={"red"} />
                                          <label
                                            className={`text-sm font-semibold font-gilroy  ${
                                              !canUpdateExpense
                                                ? "cursor-not-allowed text-gray-800"
                                                : "cursor-pointer text-red-600"
                                            }`}
                                          >
                                            Delete
                                          </label>
                                        </div>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
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
              </div>
            ) : (
              <div className="my-2">
                <NoDataMessage label="Expense" />
              </div>
            )}
          </div>
        )}
      </div>

      {loading && (
        <div className="absolute top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-r-4 border-blue-700 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {showModal && (
        <AddExpenses
          hostelId={allPageHostel_Id}
          show={showModal}
          currentItem={currentItem}
          setShowModal={setShowModal}
        />
      )}

      {showExpenseDelete && (
        <DeleteExpense
          show={showExpenseDelete}
          handleClose={handleCloseForDeleteExpense}
          deleteExpenseRowData={deleteExpenseRowData}
        />
      )}

      {showOverview && (
        <ExpenseOverview
          show={showOverview}
          onClose={() => setShowOverview(false)}
          handleShowSettlement={handleShowSettlement}
        />
      )}
      {showSettlementForm && (
        <ExpenseSettlement
          show={showSettlementForm}
          handleClose={handleCloseSettlement}
        />
      )}
    </>
  );
}

export default withErrorBoundary(Expenses);

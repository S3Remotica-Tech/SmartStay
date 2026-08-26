/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import DeleteExpense from "./DeleteExpense";
import ApiPagination from "../../Components/ApiPagination";
import { IoMdMenu } from "react-icons/io";
import {
  SearchNormal1,
  Filter,
  Setting3,
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
import ExpenseSettlement from "./ExpenseSettlement";
import PropTypes from "prop-types";

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

function Expenses() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const navigate = useNavigate();

  const [getData, setGetData] = useState([]);

  const [showFilter, setShowFilter] = useState(false);

  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);

  const tableContainerRef = useRef(null);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const lastScrollLeftRef = useRef(0);

  const [searchText, setSearchText] = useState("");
  const [customizeItems, setCustomizeItems] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [showExpenseDelete, setShowExpenseDelete] = useState(false);
  const [deleteExpenseRowData, setDeleteExpenseRowData] = useState("");

  const [open, setOpen] = useState(false);

  const popupRef = useRef(null);

  const [showOverview, setShowOverview] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState("");

  const [showSettlementForm, setShowSettlementForm] = useState(false);
  const [showDots, setShowDots] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [chips, setChips] = useState([]);
  const isSearching = chips.length > 0 || searchQuery?.trim() !== "";

  const [categoryFilter, setCategoryFilter] = useState("");
  const stats = [
    {
      label: "Total Expenses",
      value: getData?.totalExpenses ?? 0,
      icon: true,
      highlight: true,
    },
    {
      label: "Total Expense Amount",
      value: getData?.expenseSummary?.totalExpenseAmount ?? 0,
    },
    {
      label: "Paid",
      value: getData?.expenseSummary?.totalPaidAmount ?? 0,
    },
    {
      label: "Unpaid (Credit)",
      value: getData?.expenseSummary?.totalUnPaidAmount ?? 0,
    },
    {
      label: "Partially Paid",
      value: getData?.expenseSummary?.totalPartialPaidAmount ?? 0,
    },
  ];

  const categoryOptions =
    getData?.filterOptions?.category?.map((item) => ({
      value: item.type,
      label: item.name,
    })) || [];

  const handleShowSettlement = () => {
    setShowSettlementForm(true);
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

  // const isExpenseForm = location.state?.isExpenseForm || false;

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

  const handleShowDots = (event, id) => {
    setShowDots((prev) => (prev === id ? null : id));

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
        type: "EXPENSE_CUSTOMIZE_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customize: payload,
        },
      });
      setCustomizeLoading(true);
    }
  };

  useEffect(() => {
    if (state.ExpenseList?.customizeExpenseSuccessCode === 200) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });
      setOpen(false);
      setCustomizeLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_EXPENSE_CUSTOMIZE_REDUCER" });
      }, 100);
    }
  }, [state.ExpenseList?.customizeExpenseSuccessCode]);

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
      !popupRef.current.contains(event.target)
    ) {
      setShowDots(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFilter, showDots]);

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
        currentItem: "",
      },
    });
  };

  const handleCategoryFilter = (selected) => {
    setCategoryFilter(selected?.value || "");

    dispatch({
      type: "SET_EXPENSE_FILTERS",
      payload: {
        categoryName: selected.label,
      },
    });
  };

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: page,
          size: size,
          categoryId: categoryFilter,
          name: debouncedSearch,
        },
      });
      setLoading(true);
      dispatch({
        type: "SET_EXPENSE_FILTERS",
        payload: {
          search: searchQuery,
          categoryId: categoryFilter,
        },
      });
    }
  }, [
    state.login.selectedHostel_Id,
    page,
    size,
    categoryFilter,
    debouncedSearch,
  ]);

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_EXPENSE_FILTERS",
        payload: {
          search: "",
          categoryName: "",
          categoryId: "",
        },
      });

      setSearchQuery("");
      setCategoryFilter("");
    };
  }, []);

  const handleReset = () => {
    dispatch({
      type: "SET_EXPENSE_FILTERS",
      payload: {
        search: "",
        categoryName: "",
        categoryId: "",
      },
    });
    dispatch({
      type: "EXPENSELIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        page: page,
        size: size,
      },
    });

    setChips([]);
    setSearchQuery("");
    setCategoryFilter("");
  };

  useEffect(() => {
    const expenseFilters = state.ExpenseList?.expenseFilters;

    const filterData = [];

    if (expenseFilters?.search) {
      filterData.push({
        key: "search",
        label: "Expense Title",
        type: "search",
        value: expenseFilters.search,
      });
    }

    if (expenseFilters?.categoryName) {
      filterData.push({
        key: "category",
        label: "Category",
        type: "category",
        value: expenseFilters.categoryName,
      });
    }

    setChips(filterData);
  }, [state.ExpenseList?.expenseFilters]);

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
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });

      setShowExpenseDelete(false);

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

  useEffect(() => {
    if (getData?.expenses?.length === 0) {
      setLoading(false);
    }
  }, [getData]);

  const handleDeleteExpense = (id) => {
    if (!id) return;
    setShowExpenseDelete(true);
    setDeleteExpenseRowData(id);
  };

  const handleCloseForDeleteExpense = () => {
    setShowExpenseDelete(false);
  };

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchQuery]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

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

  const filteredCustomizeItems = customizeItems.filter((item) =>
    item.fieldName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const selectedColumns = (customizeItems || []).filter((col) => col.selected);
  const allSelected =
    Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);

  const statusStyles = {
    Full: {
      bg: "#EFFFF2",
      text: "#038C3D",
    },

    Partial: {
      bg: "#FFF4E5",
      text: "#F79009",
    },
    Pending: {
      bg: "#FEE4E2",
      text: "#D92D20",
    },
  };

  const headerKeyMap = {
    "Expense No": "referenceNumber",
    Title: "title",
    Date: "transactionDate",
    Category: "categoryName",
    "Sub Category": "subCategoryName",
    Vendor: "vendor",
    Status: "paymentStatus",
    "Payment Mode": "bankName",
    "Total Amount": "totalAmount",
    "Paid Amount": "paidAmount",
    "Balance Amount": "balanceAmount",
    "Actual Total": "actualTotal",
  };

  const formattedData = (getData?.expenses || []).map((row) => {
    const obj = {};

    (getData?.tableHeaders || []).forEach((header, index) => {
      const key = headerKeyMap[header];
      const value = row[index];

      if (key) {
        obj[key] = value ?? "-";
      }
    });

    const apiData = row[row.length - 1];

    obj.apiCall = {
      expenseId: apiData?.expenseId || null,
      status: apiData?.status || null,
    };

    return obj;
  });

  useEffect(() => {
    const cols = getData?.columnList || [];

    const formatted = cols.map((col) => ({
      ...col,
      key: col.fieldName,
      selected: col.selected,
    }));

    setCustomizeItems(formatted);
    setInitialCustomizeItems(formatted);
  }, [getData?.columnList]);

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
  SortableItem.propTypes = {
    item: PropTypes.shape({
      key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      selected: PropTypes.bool.isRequired,
      fieldName: PropTypes.string.isRequired,
    }).isRequired,
  };

  const currentPage = getData?.currentPage ?? 1;

  const totalPages = getData?.totalPages ?? 1;

  const totalRecords = getData?.totalExpenses ?? 0;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
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
                placeholder="Search by Title"
                value={searchQuery}
                onChange={handleInputChange}
                disabled={!canReadExpense}
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
                <div className={`border border-gray-300 rounded-lg w-36 `}>
                  <Select
                    options={categoryOptions}
                    styles={CustomStyles}
                    isDisabled={!canReadExpense}
                    menuPlacement="auto"
                    classNamePrefix="custom"
                    onChange={handleCategoryFilter}
                    value={
                      categoryOptions.find(
                        (opt) => opt.value === categoryFilter,
                      ) || null
                    }
                    id="statusselect"
                  />
                </div>

                {/* <div className="flex items-center gap-3">
                  <Select
                    isDisabled={canReadExpense}
                    options={monthOptions}
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    classNamePrefix="custom"
                    menuPlacement="auto"
                    noOptionsMessage={() => "No options"}
                    styles={CustomStyles}
                  />
                </div> */}

                <div
                  className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
                >
                  <Filter
                    size={16}
                    onClick={() => {
                      if (canReadExpense) {
                        // setIsFilterOpen(true);
                      }
                    }}
                    className={`transition-opacity duration-300 ${
                      canReadExpense
                        ? "cursor-pointer opacity-100 pointer-events-auto"
                        : "cursor-not-allowed opacity-40 pointer-events-none"
                    }`}
                  />
                </div>
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

            <div
              className="w-full my-2 bg-[#F9F9F9] rounded-xl px-4 sm:px-6 py-3 
            flex flex-wrap items-center justify-between font-gilroy"
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
                      ₹ {item.value}
                    </div>
                  </div>
                </div>
              ))}
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
                                setShowOverview(true);
                                setSelectedExpenseId(user.apiCall.expenseId);
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
                                  case "Expense No":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        <div className="relative group w-[100px] ">
                                          <span className="block w-full truncate text-sm text-[#111928] ">
                                            {user.referenceNumber}
                                          </span>

                                          <div
                                            className="absolute left-full ml-2 top-1/2 -translate-y-1/2
        hidden group-hover:!block
       bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap
        z-[9999] pointer-events-none"
                                          >
                                            {user?.referenceNumber}
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

                                  case "Date":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} truncate text-[#6B7280] font-medium`}
                                      >
                                        {user.transactionDate}
                                      </td>
                                    );

                                  case "Title":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {user.title}
                                      </td>
                                    );

                                  case "Category":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {user.categoryName}
                                      </td>
                                    );
                                  case "Sub Category'":
                                    return (
                                      <td key={col.key} className={finalClass}>
                                        {user.subCategoryName}
                                      </td>
                                    );

                                  case "Vendor":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.vendor}
                                      </td>
                                    );

                                  case "Payment Mode":
                                    return (
                                      <td
                                        key={col.key}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.bankName}
                                      </td>
                                    );
                                  case "Total Amount":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.totalAmount}
                                      </td>
                                    );
                                  case "Paid Amount":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.paidAmount}
                                      </td>
                                    );
                                  case "Balance Amount":
                                    return (
                                      <td
                                        key={col.fieldName}
                                        className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                      >
                                        {user.balanceAmount}
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
                                    handleShowDots(e, user.apiCall?.expenseId);
                                  }}
                                >
                                  <PiDotsThreeOutlineVerticalFill
                                    className={`h-5 w-5 rotate-90
                                         ${String(showDots) === String(user.apiCall?.expenseId) ? "text-blue-600" : "text-gray-500"}`}
                                  />

                                  {String(showDots) ===
                                    String(user.apiCall?.expenseId) && (
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
                                              : "cursor-not-allowed opacity-100"
                                          }`}
                                          onClick={() => {
                                            if (canUpdateExpense) {
                                              // handleEditExpense(user);
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
                                                : "cursor-not-allowed"
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
                                                user.apiCall.expenseId,
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
                <NoDataMessage
                  label="Expense"
                  isSearching={isSearching}
                  isClearSearch={true}
                  handleClear={() => {
                    setSearchQuery("");
                    setCategoryFilter("");
                    handleReset();
                  }}
                />
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
          selectedExpenseId={selectedExpenseId}
        />
      )}
      {showSettlementForm && (
        <ExpenseSettlement
          show={showSettlementForm}
          handleClose={handleCloseSettlement}
          selectedExpenseId={selectedExpenseId}
        />
      )}
    </>
  );
}

export default withErrorBoundary(Expenses);

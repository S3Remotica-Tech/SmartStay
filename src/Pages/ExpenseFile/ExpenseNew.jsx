/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { FormControl, InputGroup, Table, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import AddExpenses from "./AddExpenses";
import ExpensesListTable from "./ExpensesListTable";
import "react-datepicker/dist/react-datepicker.css";
import "./Expenses.css";
import ListGroup from "react-bootstrap/ListGroup";
import "react-toastify/dist/ReactToastify.css";
import { CloseCircle, SearchNormal1, Setting3 } from "iconsax-react";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
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
function Expenses({ allPageHostel_Id }) {
  const location = useLocation();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const filterRef = useRef(null);
  const { RangePicker } = DatePicker;
  const [getData, setGetData] = useState([]);
  const selectedPriceRange = "All";
  const [showModal, setShowModal] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
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

  const [showExpenseDelete, setShowExpenseDelete] = useState(false);
  const [deleteExpenseRowData, setDeleteExpenseRowData] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const {
    canWriteModule: canWriteExpense,
    canReadModule: canReadExpense,
    // canUpdateModule: canUpdateElectricity,
    // canDeleteModule: canDeleteElectricity,
  } = useHasPermission("Expense");

  useEffect(() => {
    if (!canReadExpense) {
      setLoading(false);
    }
  }, [canReadExpense]);

  const isExpenseForm = location.state?.isExpenseForm || false;

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

  const handleClickOutside = (event) => {
    if (filterRef.current && !filterRef.current.contains(event.target)) {
      setShowFilter(false);
    }
  };

  useEffect(() => {
    if (showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showFilter]);

  useEffect(() => {
    if (state.UsersList?.exportExpenceDetails?.response?.fileUrl) {
      setExcelDownload(
        state.UsersList?.exportExpenceDetails?.response?.fileUrl,
      );
    }
  }, [state.UsersList?.exportExpenceDetails?.response?.fileUrl]);

  const handleExpenceExcel = () => {
    if (ExcelFilterminAmount && ExcelFiltermaxAmount) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses",
          hostel_id: state.login.selectedHostel_Id,
          min_amount: Number(ExcelFilterminAmount) || 0,
          max_amount: Number(ExcelFiltermaxAmount) || 0,
        },
      });
      setExcelFilterMinAmount("");
      setExcelFilterMaxAmount("");
      setExcelFilterPaymentmode("");
      setExcelFilterCategoryValue("");
      setExcelFilterDates([]);
    } else if (ExcelFilterDates.length === 2) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses",
          hostel_id: state.login.selectedHostel_Id,
          start_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
          end_date: ExcelFilterDates[1]?.format("YYYY-MM-DD"),
        },
      });
      setExcelFilterMinAmount("");
      setExcelFilterMaxAmount("");
      setExcelFilterPaymentmode("");
      setExcelFilterCategoryValue("");
      setExcelFilterDates([]);
    } else if (ExcelFiltercategoryValue) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses",
          hostel_id: state.login.selectedHostel_Id,
          category: Number(ExcelFiltercategoryValue),
        },
      });
      setExcelFilterMinAmount("");
      setExcelFilterMaxAmount("");
      setExcelFilterPaymentmode("");
      setExcelFilterCategoryValue("");
      setExcelFilterDates([]);
    } else if (ExcelFilterPaymentmode) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses",
          hostel_id: state.login.selectedHostel_Id,
          payment_mode: Number(ExcelFilterPaymentmode),
        },
      });
      setExcelFilterMinAmount("");
      setExcelFilterMaxAmount("");
      setExcelFilterPaymentmode("");
      setExcelFilterCategoryValue("");
      setExcelFilterDates([]);
    } else {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: { type: "expenses", hostel_id: state.login.selectedHostel_Id },
      });
    }

    setIsDownloadTriggered(true);
  };

  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();
      setTimeout(() => {
        setExcelDownload("");
        setIsDownloadTriggered(false);
      }, 500);
    }
  }, [excelDownload, isDownloadTriggered]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportExpence === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_EXPENSE_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportExpence, dispatch]);

  useEffect(() => {
    if (dates.length === 2) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          start_date: dates[0].format("YYYY-MM-DD"),
          end_date: dates[1].format("YYYY-MM-DD"),
          hostelId: state.login.selectedHostel_Id,
        },
      });
    }
  }, [dates, state.login.selectedHostel_Id]);

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

    setCurrentItem("");
    setShowModal(true);
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

  const filteredData = React.useMemo(
    () => filterByPriceRange(getData) || [],
    [getData],
  );
  const sortedData = React.useMemo(() => {
    return Array.isArray(filteredData) ? filteredData : [];
  }, [filteredData]);

  const handleEditExpen = (item) => {
    setShowModal(true);
    setCurrentItem(item);
  };

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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="w-full p-0">
          <div className="flex items-center justify-between sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px]">
            <div className="col-span-12 md:col-auto flex flex-wrap items-center">
              <label className="text-lg text-black font-semibold font-gilroy">
                Expenses
              </label>

              <RangePicker
                key={pickerKey}
                className={`range-picker-with-left-arrow h-10 w-64 ml-2 mt-1 pl-7 font-gilroy transition-opacity duration-300 ease-in-out
  ${
    canReadExpense
      ? "cursor-pointer opacity-100 pointer-events-auto"
      : "cursor-not-allowed opacity-40 pointer-events-none"
  }
`}
                onChange={handleDateChange}
                value={dates.length === 2 ? [dates[0], dates[1]] : null}
                format="DD-MM-YYYY"
                placeholder={["Start Date", "End Date"]}
              />
            </div>

            <div className="col-span-12 md:col flex flex-wrap gap-1 md:justify-end items-center">
              <div className=" mt-1">
                <Image
                  src={Filters}
                  className={`h-12 w-12 transition-opacity duration-300 ease-in-out
      ${
        canReadExpense
          ? "cursor-pointer opacity-100 pointer-events-auto"
          : "cursor-not-allowed opacity-40 pointer-events-none"
      }`}
                  onClick={handleFilterByPrice}
                />
              </div>

              {showFilter && (
                <div className="relative">
                  <ListGroup
                    ref={filterRef}
                    className="filter-dropdown absolute top-6 right-0 cursor-pointer bg-white z-10 font-gilroy"
                  >
                    <ListGroup.Item value="All" onClick={handleExpenseAll}>
                      All
                    </ListGroup.Item>

                    <ListGroup.Item
                      active={showCategory}
                      onMouseEnter={() => setShowCategory(true)}
                      onMouseLeave={() => setShowCategory(false)}
                    >
                      Category
                      {showCategory && (
                        <ListGroup
                          className="absolute right-[200px] top-0 rounded-lg max-h-52 overflow-y-auto z-20 border border-gray-300 bg-white shadow-md box-border"
                          value={categoryValue}
                          onClick={handleCatogoryChange}
                        >
                          {state.Settings.Expences.data &&
                            state.Settings.Expences.data.map((view) => (
                              <ListGroup.Item
                                className="sub_item"
                                key={view.category_Id}
                                value={view.category_Id}
                              >
                                {view.category_Name}
                              </ListGroup.Item>
                            ))}
                        </ListGroup>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item
                      active={showPaymentMode}
                      onMouseEnter={() => setShowPaymentMode(true)}
                      onMouseLeave={() => setShowPaymentMode(false)}
                    >
                      Payment Mode
                      {showPaymentMode && (
                        <ListGroup
                          className="absolute right-[200px] top-0 rounded-lg max-h-52 overflow-y-auto z-20"
                          value={modeValue}
                          onClick={handleModeValueChange}
                        >
                          {state.ExpenseList.expenseList &&
                            state.ExpenseList.paymentModeList?.map((view) => (
                              <ListGroup.Item
                                className="sub_item"
                                key={view.id}
                                value={view.payment_mode}
                              >
                                {view.paymentModeName}
                              </ListGroup.Item>
                            ))}
                        </ListGroup>
                      )}
                    </ListGroup.Item>

                    <ListGroup.Item
                      active={showAmount}
                      onMouseEnter={() => setShowAmount(true)}
                      onMouseLeave={() => setShowAmount(false)}
                    >
                      Amount
                      {showAmount && (
                        <ListGroup
                          className="absolute right-[200px] top-0 rounded-lg max-h-52 overflow-y-auto z-20"
                          value={amountValue}
                          onClick={handleAmountValueChange}
                        >
                          <ListGroup.Item className="sub_item" value="0-1000">
                            0-1000
                          </ListGroup.Item>
                          <ListGroup.Item
                            className="sub_item"
                            value="1000-5000"
                          >
                            1000-5000
                          </ListGroup.Item>
                          <ListGroup.Item
                            className="sub_item"
                            value="5000-10000"
                          >
                            5000-10000
                          </ListGroup.Item>
                          <ListGroup.Item className="sub_item" value="10000">
                            10000 Above
                          </ListGroup.Item>
                        </ListGroup>
                      )}
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              )}

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

              <div className=" cursor-pointer">
                <img
                  src={excelimg}
                  alt="excel"
                  width={38}
                  height={38}
                  className={`
    transition-opacity duration-300 
    ${canReadExpense ? "cursor-pointer opacity-100 pointer-events-auto" : "cursor-not-allowed opacity-40 pointer-events-none"}
  `}
                  onClick={handleExpenceExcel}
                />
              </div>

              <div className="mr-1">
                <Button
                  disabled={!canWriteExpense || state?.login?.planStatus === 0}
                  onClick={handleShow}
                  className="!font-gilroy text-[14px] !bg-[#1E45E1] text-white !font-semibold rounded-lg p-2 w-[146px] whitespace-nowrap"
                >
                  {" "}
                  + Expense
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end  gap-2  items-center ">
          <div>
            <Setting3
              // onClick={() => setOpen(!open)}
              className="cursor-not-allowed"
              size="22"
              color="#4B4B4B"
            />
          </div>
          <div>
            <PaginationList
              totalItems={sortedData.length}
              itemsPerPage={pageSize}
              currentPage={page}
              onPageChange={(p) => setPage(p)}
              onPageSizeChange={(size) => setPageSize(size)}
            />
          </div>
        </div>

        {!canReadExpense ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <div className="relative">
            {sortedData && sortedData.length > 0 ? (
              <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                <div
                  id="tableContainer"
                  // ref={tableContainerRef}
                  className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                >
                  <table className=" w-full font-gilroy">
                    <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                      <tr className="h-9">
                        <th className="px-4 text-left w-[70px]">Date</th>
                        <th className="px-2 text-left w-[70px]">Category</th>
                        <th className="px-2 text-left w-[90px] whitespace-nowrap">
                          Sub Category
                        </th>
                        <th className="px-2 text-left min-w-[80px]">
                          Description
                        </th>
                        <th className="px-2 text-left min-w-[60px] whitespace-nowrap">
                          Unit Count
                        </th>
                        <th className="px-2 text-left min-w-[90px] whitespace-nowrap">
                          Per Unit Price
                        </th>
                        <th className="px-2 text-left min-w-[90px] whitespace-nowrap">
                          Total Amount
                        </th>
                        <th className="px-2 text-left min-w-[90px] whitespace-nowrap">
                          Mode of Payment
                        </th>
                        <th className="px-2 text-left min-w-[70px] whitespace-nowrap">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedData?.map((item) => (
                        <ExpensesListTable
                          key={item.id}
                          item={item}
                          OnEditExpense={handleEditExpen}
                          handleDelete={handleDeleteExpense}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              !loading &&
              (!filteredData || filteredData.length === 0) && (
                <div className="my-2">
                  <NoDataMessage label="Expense" />
                </div>
              )
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

      {showExpenseDelete && <DeleteExpense  show={showExpenseDelete} handleClose={handleCloseForDeleteExpense} deleteExpenseRowData={deleteExpenseRowData}  />}
    </>
  );
}
Expenses.propTypes = {
  allPageHostel_Id: PropTypes.func.isRequired,
};

export default withErrorBoundary(Expenses);

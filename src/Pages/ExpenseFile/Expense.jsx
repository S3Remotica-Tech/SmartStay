
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
import { CloseCircle, SearchNormal1 } from "iconsax-react";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import { MdError } from "react-icons/md";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Filters from "../../Assets/Images/Filters.svg";
import Image from 'react-bootstrap/Image';
import { ArrowUp2, ArrowDown2 } from 'iconsax-react';
import { useMediaQuery, useTheme } from '@mui/material'
import Select from "react-select";
function Expenses({ allPageHostel_Id }) {
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
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [ExcelFilterminAmount, setExcelFilterMinAmount] = useState(0);
  const [ExcelFiltermaxAmount, setExcelFilterMaxAmount] = useState(0);
  const [ExcelFilterPaymentmode, setExcelFilterPaymentmode] = useState('')
  const [ExcelFiltercategoryValue, setExcelFilterCategoryValue] = useState("");
  const [ExcelFilterDates, setExcelFilterDates] = useState([])
  const [expencerolePermission, setExpenceRolePermission] = useState("");

  const [expencepermissionError, setExpencePermissionError] = useState("");
  const [expenceAddPermission, setExpenceAddPermission] = useState("");
  const [expenceDeletePermission, setExpenceDeletePermission] = useState("");
  const [expenceEditPermission, setExpenceEditPermission] = useState("");
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);


const pageOptions = [
    { value: 10, label: "10" },
  { value: 50, label: "50" },
  { value: 100, label: "100" },
];









  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

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
        state.UsersList?.exportExpenceDetails?.response?.fileUrl
      );
    }
  }, [state.UsersList?.exportExpenceDetails?.response?.fileUrl]);



  const handleExpenceExcel = () => {

    if (ExcelFilterminAmount && ExcelFiltermaxAmount) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses", hostel_id: state.login.selectedHostel_Id,
          min_amount: Number(ExcelFilterminAmount) || 0, max_amount: Number(ExcelFiltermaxAmount) || 0,
        }
      })
      setExcelFilterMinAmount('')
      setExcelFilterMaxAmount('')
      setExcelFilterPaymentmode('')
      setExcelFilterCategoryValue('')
      setExcelFilterDates([])
    }

    else if (ExcelFilterDates.length === 2) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses", hostel_id: state.login.selectedHostel_Id,
          start_date: ExcelFilterDates[0]?.format("YYYY-MM-DD"),
          end_date: ExcelFilterDates[1]?.format("YYYY-MM-DD")
        }
      })
      setExcelFilterMinAmount('')
      setExcelFilterMaxAmount('')
      setExcelFilterPaymentmode('')
      setExcelFilterCategoryValue('')
      setExcelFilterDates([])
    }

    else if (ExcelFiltercategoryValue) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses", hostel_id: state.login.selectedHostel_Id,
          category: Number(ExcelFiltercategoryValue)
        }
      })
      setExcelFilterMinAmount('')
      setExcelFilterMaxAmount('')
      setExcelFilterPaymentmode('')
      setExcelFilterCategoryValue('')
      setExcelFilterDates([])
    }

    else if (ExcelFilterPaymentmode) {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: {
          type: "expenses", hostel_id: state.login.selectedHostel_Id,
          payment_mode: Number(ExcelFilterPaymentmode)
        }
      })
      setExcelFilterMinAmount('')
      setExcelFilterMaxAmount('')
      setExcelFilterPaymentmode('')
      setExcelFilterCategoryValue('')
      setExcelFilterDates([])
    }

    else {
      dispatch({
        type: "EXPORTEXPENCESDETAILS",
        payload: { type: "expenses", hostel_id: state.login.selectedHostel_Id }
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
    setExpenceRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner === 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_view === 1
    ) {
      setExpencePermissionError("");
    } else {
      setExpencePermissionError("Permission Denied");
    }
  }, [expencerolePermission]);

  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner === 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_create === 1
    ) {
      setExpenceAddPermission("");
    } else {
      setExpenceAddPermission("Permission Denied");
    }
  }, [expencerolePermission]);

  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner === 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_delete === 1
    ) {
      setExpenceDeletePermission("");
    } else {
      setExpenceDeletePermission("Permission Denied");
    }
  }, [expencerolePermission]);
  useEffect(() => {
    if (
      expencerolePermission[0]?.is_owner === 1 ||
      expencerolePermission[0]?.role_permissions[14]?.per_edit === 1
    ) {
      setExpenceEditPermission("");
    } else {
      setExpenceEditPermission("Permission Denied");
    }
  }, [expencerolePermission]);

  const [dates, setDates] = useState([]);


  const [pickerKey, setPickerKey] = useState(0);

  useEffect(() => {
    if (dates.length === 2) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          start_date: dates[0].format("YYYY-MM-DD"),
          end_date: dates[1].format("YYYY-MM-DD"),
          hostel_id: state.login.selectedHostel_Id,
        },
      });
    } else if (dates?.length === 0 && state.login.selectedHostel_Id) {
      dispatch({
        type: "EXPENSELIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [dates, state.login.selectedHostel_Id, dispatch]);

  useEffect(() => {
    if (selectedValue === "All") {
      dispatch({
        type: "EXPENSELIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setCategoryValue("");
      setAssetValue("");
      setVendorValue("");
      setModeValue("");
      setSelectedValue("");
      setDates("");
      setAmountValue("");
      setMinAmount("");
      setMaxAmount("");
    } else if (categoryValue) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          category: categoryValue,
          hostel_id: state.login.selectedHostel_Id,
        },
      });
      setCategoryValue("");
      setAssetValue("");
      setVendorValue("");
      setModeValue("");
      setSelectedValue("");
      setDates("");
      setAmountValue("");
      setMinAmount("");
      setMaxAmount("");
    } else if (assetValue) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          asset_id: assetValue,
          hostel_id: state.login.selectedHostel_Id,
        },
      });
      setCategoryValue("");
      setAssetValue("");
      setVendorValue("");
      setModeValue("");
      setSelectedValue("");
      setDates("");
      setAmountValue("");
      setMinAmount("");
      setMaxAmount("");
    } else if (vendorValue) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          vendor_id: vendorValue,
          hostel_id: state.login.selectedHostel_Id,
        },
      });
      setCategoryValue("");
      setAssetValue("");
      setVendorValue("");
      setModeValue("");
      setSelectedValue("");
      setDates("");
      setAmountValue("");
      setMinAmount("");
      setMaxAmount("");
    } else if (modeValue) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          payment_mode: modeValue,
          hostel_id: state.login.selectedHostel_Id,
        },
      });
      setCategoryValue("");
      setAssetValue("");
      setVendorValue("");
      setModeValue("");
      setSelectedValue("");
      setDates("");
      setAmountValue("");
      setMinAmount("");
      setMaxAmount("");
    }

    else if (minAmount || maxAmount) {
      dispatch({
        type: "EXPENSELIST",
        payload: {
          min_amount: minAmount,
          max_amount: maxAmount,
          hostel_id: state.login.selectedHostel_Id,
        },
      });
      setCategoryValue("");
      setAssetValue("");
      setVendorValue("");
      setModeValue("");
      setSelectedValue("");
      setDates("");
      setAmountValue("");
      setMinAmount("");
      setMaxAmount("");
    }
  }, [
    selectedValue,
    categoryValue,
    assetValue,
    vendorValue,
    modeValue,
    dates,
    minAmount,
    maxAmount,
    dispatch,
    state.login.selectedHostel_Id,
  ]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "BANKINGLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id, dispatch]);

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
    if (
      !Array.isArray(state.bankingDetails.bankingList.banks) ||
      state.bankingDetails.bankingList.banks.length === 0
    ) {
      toast.error(
        "Please add bank details before adding expense information.",
        {
          autoClose: 1500,
          style: {
            color: "#000",
            borderBottom: "5px solid red",
            fontFamily: "Gilroy",
          },
        }
      );
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
    setMinAmount(minAmount);
    setMaxAmount(maxAmount);
    setExcelFilterMinAmount(minAmount)
    setExcelFilterMaxAmount(maxAmount)
    setShowAmount(false);
  };




  const [currentItem, setCurrentItem] = useState("");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "ASSETLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "EXPENCES-CATEGORY-LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "VENDORLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      dispatch({
        type: "EXPENSELIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id, dispatch]);

  const { getExpenseStatusCode } = state.ExpenseList;


  useEffect(() => {
    if (getExpenseStatusCode === 200) {
      setLoading(false);
      setGetData(state.ExpenseList.expenseList);

      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPENSE_SATUS_CODE" });
      }, 4000);
    }
  }, [getExpenseStatusCode, dispatch, state.ExpenseList.expenseList]);


  useEffect(() => {
    if (state.ExpenseList.nodataGetExpenseStatusCode === 201) {
      setGetData([]);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOEXPENSEdATA" });
      }, 200);
    }
  }, [state.ExpenseList.nodataGetExpenseStatusCode, dispatch]);

  useEffect(() => {
    if (
      state.ExpenseList.StatusCodeForAddExpenseSuccess === 200 ||
      state.ExpenseList.deleteExpenseStatusCode === 200
    ) {
      dispatch({
        type: "EXPENSELIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setShowModal(false);
      setShowExpenseDelete(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_EXPENSE" });
      }, 2000);
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_EXPENSE_SATUS_CODE" });
      }, 2000);
    }
  },
    [
      state.ExpenseList.StatusCodeForAddExpenseSuccess,
      state.ExpenseList.deleteExpenseStatusCode,
      dispatch,
      state.login.selectedHostel_Id,
    ]
  );

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



  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const filteredData = React.useMemo(
    () => filterByPriceRange(getData) || [],
    [getData]
  );

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      const slicedItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
      const pages = Math.ceil(filteredData.length / itemsPerPage);

      setCurrentItems(slicedItems);
      setTotalPages(pages);
    } else {
      setCurrentItems([]);
      setTotalPages(0);
    }
  }, [filteredData, indexOfFirstItem, indexOfLastItem, itemsPerPage]);

  const [currentItems, setCurrentItems] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      const slicedItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
      const pages = Math.ceil(filteredData.length / itemsPerPage);

      setCurrentItems(slicedItems);
      setTotalPages(pages);
    } else {
      setCurrentItems([]);
      setTotalPages(0);
    }
  }, [filteredData, indexOfFirstItem, indexOfLastItem, itemsPerPage]);

  const handleItemsPerPageChange = (selectedOption) => {
  setItemsPerPage(Number(selectedOption.value));
  setCurrentPage(1);
};


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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


  const handleEditExpen = (item) => {
    setShowModal(true);
    setCurrentItem(item);
  };

  const [showExpenseDelete, setShowExpenseDelete] = useState(false);
  const [deleteExpenseRowData, setDeleteExpenseRowData] = useState("");

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
          id: deleteExpenseRowData,
        },
      });
      setCurrentPage(1);
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
    setExcelFilterPaymentmode(e.target.getAttribute("value"))
    setShowFilter(false);
    setShowPaymentMode(false);
  };
  const handleExpenseAll = (event) => {
    const value = event.target.getAttribute("value");
    setSelectedValue(value);
    setShowFilter(false);
  };

  const skeletonStyle = {
    backgroundColor: "#dcdcdc",
    borderRadius: "10px",
    height: "20px",
    marginBottom: "10px",
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
            user.category_Name.toLowerCase().includes(searchItem.toLowerCase())
        );

      setGetData(filteredItems);
      setShowDropDown(true);
    } else {
      setGetData(state.ExpenseList.expenseList);
    }
    setCurrentPage(1);
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
            user.category_Name.toLowerCase().includes(searchItem.toLowerCase())
        );

      setGetData(filteredItems);
      setShowDropDown(true);
    } else {
      setGetData(state.ExpenseList.expenseList);
    }
    setCurrentPage(1);
    setShowDropDown(false);
  };

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


  const handleDateChange = (selectedDates) => {
    if (!selectedDates || selectedDates.length !== 2) {
      setDates([]);
      setExcelFilterDates([])
      setSelectedValue("All");
      setCategoryValue("");
      setModeValue("");
      setAmountValue("");
      setMinAmount("");
      setMaxAmount("");
      setAssetValue("");
      setVendorValue("");
      setPickerKey((prevKey) => prevKey + 1);
      setCurrentPage(1);

      dispatch({
        type: "EXPENSELIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      return;
    }

    const newStartDate = dayjs(selectedDates[0]).startOf("day");
    const newEndDate = dayjs(selectedDates[1]).endOf("day");
    setDates([newStartDate, newEndDate]);
    setExcelFilterDates([newStartDate, newEndDate])
    setCurrentPage(1);
  };

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;

    const payload = { hostel_id: state.login.selectedHostel_Id };
    if (dates.length === 2) {
      payload.start_date = dates[0].format("YYYY-MM-DD");
      payload.end_date = dates[1].format("YYYY-MM-DD");
    }
    dispatch({ type: "EXPENSELIST", payload });
  }, [dates, state.login.selectedHostel_Id, dispatch]);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;

    const payload = { hostel_id: state.login.selectedHostel_Id };

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
  }, [selectedValue, categoryValue, modeValue, amountValue, assetValue, vendorValue, state.login.selectedHostel_Id, dispatch]);

  useEffect(() => {
    if (state.ExpenseList.getExpenseStatusCode === 200) {
      setGetData(state.ExpenseList.expenseList || []);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPENSE_SATUS_CODE" });
      }, 1000);
    }
  }, [state.ExpenseList.getExpenseStatusCode, state.ExpenseList.expenseList, dispatch]);


  useEffect(() => {
    if (state.ExpenseList.nodataGetExpenseStatusCode === 201) {
      setGetData([]);
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOEXPENSEdATA" });
      }, 1000);
    }
  }, [state.ExpenseList.nodataGetExpenseStatusCode, dispatch]);


  return (
    <>
      {expencepermissionError ? (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: "100vh",
            }}
          >

            <img
              src={EmptyState}
              alt="Empty State"

            />


            {expencepermissionError && (
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
                <span style={{
                  fontSize: "12px",
                  color: "red",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}>{expencepermissionError}</span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div style={{ width: "100%" }}>
          <div className="container" style={{ paddingTop: 12 }}>
            <div
              className="d-flex justify-content-between align-items-center flex-wrap"
              style={{
                position: "sticky",

                backgroundColor: "white",
                zIndex: 10,
              }}
            >
              <div

                className="col-12 col-md-auto d-flex flex-wrap align-items-center"
                style={{ marginTop: 13, marginLeft: 11 }}
              >
                <label
                  style={{
                    fontSize: 18,
                    color: "#000000",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                  }}
                >
                  Expenses
                </label>

                <RangePicker
                  className="range-picker-with-left-arrow"
                  key={pickerKey}
                  style={{
                    height: 40,
                    width: 250,
                    marginLeft: 7,
                    marginTop: 5,
                    cursor: "pointer",
                    paddingLeft: 30,
                    fontFamily: "Gilroy"
                  }}
                  onChange={handleDateChange}
                  value={dates.length === 2 ? [dates[0], dates[1]] : null}
                  format="DD-MM-YYYY"
                  placeholder={["Start Date", "End Date"]}
                />

              </div>


              <div className="col-12 col-md d-flex flex-wrap justify-content-md-end align-items-center">

                {!showFilterExpense && (
                  <div onClick={handleShowSearch}
                    style={{ paddingRight: 16 }}
                  >
                    <SearchNormal1
                      color="#222"
                      style={{
                        height: "24px",
                        width: "24px",
                        cursor: "pointer",
                        fontFamily: "Gilroy",
                        marginTop: 8,
                      }}
                    />
                  </div>
                )}

                <div className='me-3' style={{ cursor: "pointer", marginTop: 5 }}>
                  <Image
                    src={Filters}
                    style={{ height: "50px", width: "50px", }}
                    onClick={handleFilterByPrice}
                  />
                </div>
                {showFilter && (
                  <div style={{ position: "relative" }}>
                    <ListGroup className="filter-dropdown"
                      ref={filterRef}
                      style={{
                        position: "absolute",
                        top: 25,
                        right: 0,
                        fontFamily: "Gilroy",
                        cursor: "pointer",
                        background: "white",
                        zIndex: 10,
                      }}
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
                            className="show-scrolls-Expense submenu"
                            style={{
                              position: "absolute",
                              right: 200,
                              top: 0,
                              borderRadius: "8px",
                              maxHeight: "200px",
                              overflowY: "auto",
                              zIndex: 20,
                              border: "1px solid #ccc",
                              backgroundColor: "#fff",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              boxSizing: "content-box",
                            }}
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
                            className="show-scrolls-Expense"

                            style={{
                              position: "absolute",
                              right: 200,
                              top: 0,
                              borderRadius: "8px",
                              maxHeight: "200px",
                              overflowY: "auto",
                              zIndex: 20,
                              border: "1px solid #ccc",
                              backgroundColor: "#fff",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              boxSizing: "content-box",

                            }}
                            value={modeValue}
                            onClick={handleModeValueChange}
                          >
                            {state.ExpenseList.expenseList &&
                              state.ExpenseList.paymentModeList.map((view) => (
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
                            className="show-scroll-category"
                            style={{
                              position: "absolute",
                              right: 200,
                              top: 0,
                              borderRadius: "8px",
                              maxHeight: "200px",
                              overflowY: "auto",
                              zIndex: 20,
                            }}
                            value={amountValue}
                            onClick={handleAmountValueChange}
                          >
                            <ListGroup.Item
                              className="sub_item"
                              value="0-1000"
                            >
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
                            <ListGroup.Item
                              className="sub_item"
                              value="10000"
                            >
                              10000 Above
                            </ListGroup.Item>
                          </ListGroup>
                        )}
                      </ListGroup.Item>
                    </ListGroup>
                  </div>
                )}

                {showFilterExpense && (
                  <div className="me-3 " style={{ position: "relative", width: isSmallScreen && showFilterExpense ? '150px' : '240px' }}>
                    <InputGroup
                      style={{
                        display: "flex",
                        flexWrap: "nowrap",
                        width: "100%",
                        marginTop: 10,
                      }}
                    >

                      <FormControl
                        className="search-input"
                        size="lg"
                        value={searchQuery}
                        onChange={handleInputChange}
                        style={{
                          width: 235,
                          boxShadow: "none",
                          borderColor: "lightgray",
                          borderRight: "none",
                          fontSize: 15,
                          fontWeight: 500,
                          color: "#222",
                          fontFamily: "Gilroy",

                        }}
                        placeholder="Search..."
                      />
                      <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                        <CloseCircle
                          size="24"
                          color="#222"
                          style={{ cursor: "pointer" }}
                          onClick={handleCloseSearch}
                        />
                      </InputGroup.Text>
                    </InputGroup>

                    {getData?.length > 0 &&
                      searchQuery !== "" &&
                      showDropDown && (
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
                          }}
                        >
                          <ul
                            className="show-scroll"
                            style={{
                              width: 215,
                              backgroundColor: "#fff",
                              maxHeight: "174px",
                              minHeight: getData?.length > 1 ? "100px" : "auto",
                              overflowY:
                                getData?.length > 2 ? "auto" : "hidden",
                              padding: "5px 10px",
                              margin: "0",
                              listStyleType: "none",

                              borderRadius: 8,
                              boxSizing: "border-box",
                            }}
                          >
                            {getData.map((user, index) => (
                              <li
                                key={index}
                                onClick={() => {
                                  handleDropDown(user.category_Name);
                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                  borderBottom: "1px solid #dcdcdc",
                                  fontSize: "14px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  backgroundColor:
                                    hoveredIndex === index
                                      ? "#1E45E1"
                                      : "transparent",
                                  color:
                                    hoveredIndex === index
                                      ? "white"
                                      : "black",

                                }}
                              >
                                {user.category_Name}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                  </div>
                )}

                <div
                  className="me-3"
                  style={{ cursor: "pointer", marginTop: 5 }}
                >
                  <img
                    src={excelimg}
                    alt="excel"
                    width={38}
                    height={38}
                    onClick={handleExpenceExcel}
                  />
                </div>

                <div className="me-2" style={{ marginTop: 7, paddingRight: 4 }}>
                  <Button
                    disabled={expenceAddPermission}
                    onClick={handleShow}

                    style={{
                      fontFamily: "Gilroy",
                      fontSize: "14px",
                      backgroundColor: "#1E45E1",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "8px",
                      width: 146,
                      height: 45,
                      textAlign: "center"
                    }}
                  >
                    {" "}
                    + Expense
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {searchQuery && (
            <div
              className="container mb-4"
              style={{ marginTop: "20px", fontWeight: 600, fontSize: 16 }}
            >
              {getData.length > 0 ? (
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 16,
                    color: "rgba(100, 100, 100, 1)",
                  }}
                >
                  {getData.length} result{getData.length > 1 ? "s" : ""} found
                  for{" "}
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      fontSize: 16,
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    &quot;${searchQuery}&quot;
                  </span>
                </span>
              ) : (
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 16,
                    color: "rgba(100, 100, 100, 1)",
                  }}
                >
                  No results found for{" "}
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      fontSize: 16,
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    &quot;${searchQuery}&quot;
                  </span>
                </span>
              )}
            </div>
          )}

          {loading && (
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                left: "200px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "transparent",
                opacity: 0.75,
                zIndex: 10,
              }}
            >
              <div
                style={{
                  borderTop: "4px solid #1E45E1",
                  borderRight: "4px solid transparent",
                  borderRadius: "50%",
                  width: "40px",
                  height: "40px",
                  animation: "spin 1s linear infinite",
                }}
              ></div>
            </div>
          )}


          {sortedData && sortedData.length > 0 && (


            <div
              className="p-0 booking-table-userlist  booking-table ms-2 me-4"
              style={{ paddingBottom: "20px", marginLeft: "-22px" }}
            >
              <div

                className='show-scrolls'

                style={{

                  height: currentItems.length >= 8 || sortedData.length >= 8 ? "480px" : "auto",
                  overflow: "auto",
                  marginBottom: 20,
                  marginTop: "20px"

                }}>

                <Table
                  responsive="md"
                >

                  <thead style={{
                    fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                    top: 0,
                    zIndex: 1
                  }}>
                    <tr>
                      <th style={{ verticalAlign: "middle", textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}> <div className='d-flex gap-1 align-items-center justify-content-start'> <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_date", 'asc')} style={{ cursor: "pointer" }} />
                        <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_date", 'desc')} style={{ cursor: "pointer" }} />
                      </div> Date </div>  </th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }} > <div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("category_Name", 'asc')} style={{ cursor: "pointer" }} />
                        <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("category_Name", 'desc')} style={{ cursor: "pointer" }} />
                      </div> Category </div></th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}> <div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("description", 'asc')} style={{ cursor: "pointer" }} />
                        <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("description", 'desc')} style={{ cursor: "pointer" }} />
                      </div> Description </div> </th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("unit_count", 'asc')} style={{ cursor: "pointer" }} />
                        <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("unit_count", 'desc')} style={{ cursor: "pointer" }} />
                      </div> Unit Count </div></th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("unit_amount", 'asc')} style={{ cursor: "pointer" }} />
                        <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("unit_amount", 'desc')} style={{ cursor: "pointer" }} />
                      </div>  Per Unit Price </div></th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_amount", 'asc')} style={{ cursor: "pointer" }} />
                        <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("purchase_amount", 'desc')} style={{ cursor: "pointer" }} />
                      </div> Total Amount </div></th>

                      <th style={{ textAlign: "start", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}><div className='d-flex gap-1 align-items-center justify-content-start'><div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                        <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("payment_mode", 'asc')} style={{ cursor: "pointer" }} />
                        <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("payment_mode", 'desc')} style={{ cursor: "pointer" }} />
                      </div>  Mode of Payment </div></th>

                      <th style={{ textAlign: "middle", fontFamily: "Gilroy", color: "rgb(147, 147, 147)", fontSize: 12, fontStyle: "normal", fontWeight: 500, whiteSpace: "nowrap" }}>Action</th>
                    </tr>
                  </thead>


                  <tbody>
                    {
                      loading ? (
                        <>
                          <tr>
                            <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                            <td><div style={{ ...skeletonStyle, width: '100%' }}></div></td>
                          </tr>
                        </>
                      )



                        : (
                          sortedData && sortedData.length > 0 && (
                            <>
                              {sortedData.map((item) => (
                                <ExpensesListTable key={item.id} item={item} OnEditExpense={handleEditExpen} handleDelete={handleDeleteExpense}
                                  expenceEditPermission={expenceEditPermission}
                                  expenceDeletePermission={expenceDeletePermission}
                                />
                              ))}
                            </>
                          )

                        )
                    }
                  </tbody>


                </Table>
              </div>
            </div>

          )}











          {!loading && currentItems && currentItems.length === 0 && (
            <div
              className="d-flex align-items-center justify-content-center animated-text mt-5"
              style={{ width: "100%", height: 350, margin: "0px auto" }}
            >
              <div>
                <div className="d-flex  justify-content-center">
                  <img
                    src={EmptyState}
                    style={{ height: 240, width: 240 }}
                    alt="Empty state"
                  />
                </div>
                <div
                  className="pb-1 "
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 18,
                    color: "rgba(75, 75, 75, 1)",
                  }}
                >
                  No expenses available
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
                  There are no expenses available.
                </div>

              </div>
              <div></div>
            </div>
          )}


          {filteredData.length > 10 && (
            <nav
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
                padding: "10px",
                position: "fixed",
                bottom: "0px",
                right: "0px",
                left:0,
                backgroundColor:"#fff",
                borderRadius: "5px",
                zIndex: 1000,
              }}
            >


              <div>
                <Select
                  options={pageOptions}
                  value={
                    itemsPerPage
                      ? { value: itemsPerPage, label: `${itemsPerPage}` }
                      : null
                  }
                  onChange={handleItemsPerPageChange}
                  placeholder="Items per page"
                  classNamePrefix="custom"
                   menuPlacement="auto"
                    noOptionsMessage={() => "No options"}
                  styles={{
                    control: (base) => ({
                      ...base,
                      height: "40px",
                      padding: "0 5px",
                      border: "1px solid #1E45E1",
                      borderRadius: "5px",
                      fontSize: "14px",
                      color: "#1E45E1",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "Gilroy",
                      boxShadow: "0 0 0 1px #1E45E1",
                       width:90,
                    }),
                    menu: (base) => ({
                      ...base,
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #ced4da",
                      fontFamily: "Gilroy",
                    }),
                    menuList: (base) => ({
                      ...base,
                      maxHeight: "200px",
                      overflowY: "auto",
                      padding: 0,
                    }),
                    placeholder: (base) => ({
                      ...base,
                      color: "#555",
                    }),
                    dropdownIndicator: (base) => ({
                      ...base,
                      color: "#1E45E1",
                      cursor: "pointer",
                    }),
                    indicatorSeparator: () => ({
                      display: "none",
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isFocused ? "#1E45E1" : "white",
                      color: state.isFocused ? "#fff" : "#000",
                      cursor: "pointer",
                    }),
                  }}
                />

              </div>


              <ul className="selectoption"
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
                      color: currentPage === 1 ? "#ccc" : "#1E45E1",
                      cursor: currentPage === 1 ? "not-allowed" : "pointer",
                      borderRadius: "50%",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ArrowLeft2
                      size="16"
                      color={currentPage === 1 ? "#ccc" : "#1E45E1"}
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
                      color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                      cursor:
                        currentPage === totalPages ? "not-allowed" : "pointer",
                      borderRadius: "50%",
                      display: "inline-block",
                      minWidth: "30px",
                      textAlign: "center",
                      backgroundColor: "transparent",
                      border: "none",
                    }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ArrowRight2
                      size="16"
                      color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                    />
                  </button>
                </li>
              </ul>
            </nav>
          )}
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

      <Modal
        show={showExpenseDelete}
        onHide={handleCloseForDeleteExpense}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header
          style={{
            borderBottom: "none",
          }}
        >
          <Modal.Title
            className="w-100 text-center"
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Delete expense?
          </Modal.Title>

        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            marginTop: "-10px",
          }}
        >
          Are you sure you want to delete this expense?
        </Modal.Body>

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none", marginTop: "-10px" }}
        >
          <Button
            className="me-2"
            onClick={handleCloseForDeleteExpense}
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
            onClick={ConfirmDeleteExpense}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
Expenses.propTypes = {
  allPageHostel_Id: PropTypes.func.isRequired,
};

export default Expenses;
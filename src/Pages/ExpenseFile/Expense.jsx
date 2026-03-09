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
import { CloseCircle, SearchNormal1 } from "iconsax-react";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
// import { MdError } from "react-icons/md";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Filters from "../../Assets/Images/Filters.svg";
import Image from 'react-bootstrap/Image';
// import { ArrowUp2, ArrowDown2 } from 'iconsax-react';
import { useMediaQuery, useTheme } from '@mui/material'
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";



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
  const [ExcelFilterminAmount, setExcelFilterMinAmount] = useState(0);
  const [ExcelFiltermaxAmount, setExcelFilterMaxAmount] = useState(0);
  const [ExcelFilterPaymentmode, setExcelFilterPaymentmode] = useState('')
  const [ExcelFiltercategoryValue, setExcelFilterCategoryValue] = useState("");
  const [ExcelFilterDates, setExcelFilterDates] = useState([])
  const [excelDownload, setExcelDownload] = useState("");
  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);
  const [dates, setDates] = useState([]);
  const [pickerKey, setPickerKey] = useState(0);

  const [loading, setLoading] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);




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


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])



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

  // useEffect(() => {
  //   setExpenceRolePermission(state.createAccount.accountList);
  // }, [state.createAccount.accountList]);


  // useEffect(() => {
  //   const userType = expencerolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setExpencePermissionError("");
  //       setExpenceAddPermission("Permission Denied");
  //       setExpenceEditPermission("Permission Denied");
  //       setExpenceDeletePermission("Permission Denied");

  //     } else if (state?.login?.planStatus === 1) {
  //       setExpencePermissionError("");
  //       setExpenceAddPermission("");
  //       setExpenceEditPermission("");
  //       setExpenceDeletePermission("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state?.login?.selectedHostel_Id, expencerolePermission])





  // useEffect(() => {
  //   const expensePermission = expencerolePermission[0]?.role_permissions?.find(
  //     (perm) => perm.permission_name === "Expenses"
  //   );


  //   const isOwner = expencerolePermission[0]?.user_details?.user_type === "staff";
  //   const planActive = state?.login?.planStatus === 1;

  //   if (!expensePermission || !isOwner) return;


  //   if (expensePermission.per_view === 1 && planActive) {
  //     setExpencePermissionError("");
  //   } else {

  //     setExpencePermissionError("Permission Denied");
  //   }


  //   if (expensePermission.per_create === 1 && planActive) {
  //     setExpenceAddPermission("");
  //   } else {
  //     setExpenceAddPermission("Permission Denied");
  //   }


  //   if (expensePermission.per_edit === 1 && planActive) {
  //     setExpenceEditPermission("");
  //   } else {
  //     setExpenceEditPermission("Permission Denied");
  //   }

  //   if (expensePermission.per_delete === 1 && planActive) {
  //     setExpenceDeletePermission("");
  //   } else {
  //     setExpenceDeletePermission("Permission Denied");
  //   }
  // }, [expencerolePermission, state?.login?.planStatus, state.login?.selectedHostel_Id]);





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
      state.ExpenseList.deleteExpenseStatusCode === 200
    ) {
      dispatch({
        type: "EXPENSELIST",
        payload: { hostelId: state.login.selectedHostel_Id },
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

  useEffect(() => {
    if (getData.length === 0) {
      setLoading(false)
    }

  }, [getData])

  // const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage, setItemsPerPage] = useState(10);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;


  const filteredData = React.useMemo(
    () => filterByPriceRange(getData) || [],
    [getData]
  );
  const sortedData = React.useMemo(() => {
    return Array.isArray(filteredData) ? filteredData : [];
  }, [filteredData]);


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
      // setCurrentPage(1);
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
            user.category_Name.toLowerCase().includes(searchItem.toLowerCase())
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
      setExcelFilterDates([])
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
    setExcelFilterDates([newStartDate, newEndDate])
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
  }, [selectedValue, categoryValue, modeValue, amountValue, assetValue, vendorValue]);

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



  return (
    <>

      <div>
        <div className="sticky-top bg-white">
          <div className="sticky top-0 flex flex-wrap justify-between items-center bg-white z-10">
            <div className="col-span-12 md:col-auto flex flex-wrap items-center">

              <label className="text-lg text-black font-semibold font-gilroy">
                Expenses
              </label>

              <RangePicker
                key={pickerKey}
                className={`range-picker-with-left-arrow h-10 w-64 ml-2 mt-1 pl-7 font-gilroy transition-opacity duration-300 ease-in-out
  ${canReadExpense
                    ? "cursor-pointer opacity-100 pointer-events-auto"
                    : "cursor-not-allowed opacity-40 pointer-events-none"}
`}

                onChange={handleDateChange}
                value={dates.length === 2 ? [dates[0], dates[1]] : null}
                format="DD-MM-YYYY"
                placeholder={["Start Date", "End Date"]}
              />

            </div>

            <div className="col-span-12 md:col flex flex-wrap md:justify-end items-center">
              {!showFilterExpense && (
                <div onClick={() => canReadExpense && handleShowSearch()}
                  className="pr-4"
                >

                  <SearchNormal1
                    color="#222"
                    className={`
    h-6 w-6  font-gilroy transition-opacity duration-300 ease-in-out
    ${canReadExpense
                        ? "cursor-pointer opacity-100 pointer-events-auto"
                        : "cursor-not-allowed opacity-40 pointer-events-none"}
  `}
                  />

                </div>
              )}

              <div className="mr-3 mt-1">
                <Image
                  src={Filters}
                  className={`h-12 w-12 transition-opacity duration-300 ease-in-out
      ${canReadExpense
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
                <div
                  className={`mr-3 relative ${isSmallScreen && showFilterExpense ? "w-[150px]" : "w-[240px]"}`}
                >
                  <InputGroup className="flex flex-nowrap w-full mt-2 h-[40px]">
                    <FormControl
                      value={searchQuery}
                      onChange={handleInputChange}
                      className="w-[235px] shadow-none border border-light-gray border-r-0 text-[15px] font-medium text-[#222] font-filroy"
                      placeholder="Search..."
                    />
                    <InputGroup.Text style={{ backgroundColor: "#ffffff" }}>
                      <CloseCircle
                        size="24"
                        color="#222"
                        className="cursor-pointer"
                        onClick={handleCloseSearch}
                      />
                    </InputGroup.Text>
                  </InputGroup>

                  {getData?.length > 0 &&
                    searchQuery !== "" &&
                    showDropDown && (
                      <div className="absolute top-15 left-0 z-[1000] p-2.5 rounded-lg border border-gray-300 bg-white" >
                        <ul
                          className={`
    w-[215px] bg-white max-h-[174px] rounded-lg box-border p-[5px_10px] m-0 list-none
    ${getData?.length > 1 ? "min-h-[100px]" : "min-h-auto"}
    ${getData?.length > 2 ? "overflow-y-auto" : "overflow-y-hidden"}
  `}
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

              <div className="mr-3 cursor-pointer">
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

        {searchQuery && (
          <div className="container mt-5 mb-4 font-gilroy font-semibold text-base"

          >
            {getData.length > 0 ? (
              <span className="text-center font-gilroy font-semibold text-base text-gray-600">
                {getData.length} result{getData.length > 1 ? "s" : ""} found
                for{" "}
                <span className="text-center font-gilroy font-semibold text-base text-gray-600">
                  &quot;${searchQuery}&quot;
                </span>
              </span>
            ) : (
              <span className="text-center font-gilroy font-semibold text-base text-gray-600">
                No results found for{" "}
                <span className="text-center font-gilroy font-semibold text-base text-gray-600">
                  &quot;${searchQuery}&quot;
                </span>
              </span>
            )}
          </div>
        )}

        {loading && (
          <div className="absolute top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 border-t-4 border-r-4 border-blue-700 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}


        {!canReadExpense ? (
          <>
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <img
                src={EmptyState}
                alt="Empty State"

              />
              <ErrorMessage message={['You do not have access to view Expense']} type="warning" />
            </div>
          </>
        ) :

          sortedData && sortedData.length > 0 ? (


            <div>
              <div className="show-scrolls m-2 mt-5 mb-5 relative font-gilroy
              overflow-y-auto max-h-[32rem] border-t border-gray-200 mt-1 pr-0 pl-0
              ">

                <Table
                  responsive="md"
                  className="mb-0 table-auto w-full text-sm text-gray-800"
                >

                  <thead className="bg-blue-100 sticky top-0 z-10 text-gray-800 font-medium text-sm">
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Unit Count</th>
                      <th>Per Unit Price</th>
                      <th>Total Amount</th>
                      <th>Mode of Payment</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>
                    <PaginationList

                    >
                      {sortedData?.map((item) => (
                        <ExpensesListTable
                          key={item.id}
                          item={item}
                          OnEditExpense={handleEditExpen}
                          handleDelete={handleDeleteExpense}
                        />
                      ))}
                    </PaginationList>
                  </tbody>
                </Table>
              </div>
            </div>



          )

            :


            !loading && (!filteredData || filteredData.length === 0) && canReadExpense ? (
              <div className="flex items-center justify-center w-full animated-text"
              >
                <div>
                  <div className="flex justify-center">
                    <img
                      src={EmptyState}
                      className="mt-24"
                      alt="Empty state"
                    />
                  </div>
                  <div className="pb-1 text-center font-semibold text-[18px] text-[#4B4B4B] font-gilroy">
                    No expenses available
                  </div>
                  <div className="pb-1 text-center font-medium text-[14px] text-[#4B4B4B] font-gilroy">
                    There are no expenses available.
                  </div>
                </div>
              </div>
            )
              :
              null
        }

      </div>


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

        <Modal.Header className="border-b-0">
          <Modal.Title className="w-full text-center !text-[18px] font-semibold !font-gilroy">
            Delete expense?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center text-[14px] font-medium font-gilroy -mt-2.5">
          Are you sure you want to delete this expense?
        </Modal.Body>

        <Modal.Footer className="flex justify-center !border-t-0 -mt-2.5 gap-2">
          <Button
            onClick={handleCloseForDeleteExpense}
            className="w-full max-w-[160px] h-[52px] rounded-lg px-5 py-3 bg-white text-[#1E45E1] !border !border-[#1E45E1] font-semibold font-gilroy text-[14px] me-2"
          >
            Cancel
          </Button>

          <Button
            disabled
            onClick={ConfirmDeleteExpense}
            className="w-full max-w-[160px] h-[52px] rounded-lg px-5 py-3 !bg-[#1E45E1] text-white !font-semibold !font-gilroy !text-[14px] disabled:opacity-50"
          >
            {/* Delete */} Coming Soon
          </Button>
        </Modal.Footer>

      </Modal>
    </>
  );
}
Expenses.propTypes = {
  allPageHostel_Id: PropTypes.func.isRequired,
};

export default withErrorBoundary(Expenses);
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from "react";
import {
  Filter,
  Export,
  ArrowLeft,
  ArrowSwapVertical,
  // Setting3,
  // SearchNormal1,
  ArrowDown2,
} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ExpenseFilter from "./ExpenseFilter";
import ApiPagination from "../../Components/ApiPagination";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useHasPermission } from "../../Utils/Permission";
import NoDataMessage from "../../Utils/NoDataMessage";

function ExpenseRegister() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { RangePicker } = DatePicker;
  // const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [register, setRegister] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [expenseRegister, setExpenseRegister] = useState("");
  const [chips, setChips] = useState([]);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const [categoryTooltip, setCategoryTooltip] = useState(null);
  const [descriptionTooltip, setDescriptionTooltip] = useState(null);
  const [collectedTooltip, setCollectedTooltip] = useState(null);
  const isSearching = chips.length > 0;
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const { canReadModule: canReadReports } = useHasPermission("Reports");

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;

  const isExportAllow = isValidSubscription && canReadReports;

  useEffect(() => {
    if (state.reports.getExpenseRegisterSuccess === 200) {
      isInitialLoad.current = true;
      setLoading(false);
      setExpenseRegister(state?.reports?.getExpenseRegister);
      setInvoiceFilter(false);

      dispatch({ type: "REMOVE_GET_REPORTS_EXPENSE_REGISTER_REDUCER" });
    }
  }, [state.reports.getExpenseRegisterSuccess]);

  const handleCloseFilterBills = () => {
    setInvoiceFilter(false);
  };

  const handleReset = () => {
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    setSelectedRange({
      from: startOfMonth,
      to: endOfMonth,
    });

    dispatch({
      type: "SET_EXPENSE_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        category: [],
        period: undefined,
        paymentMode: [],
        paidTo: [],
        createdBy: [],
        createdByLabels: [],
        categoryLabel: [],
        subCategory: [],
        subCategoryLabel: [],
        vendorId: "",
        vendorName: "",
        paymentStatus: "",
      },
    });
    dispatch({
      type: "GET_REPORTS_EXPENSE_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: {
          size: size,
          page: page,
        },
      },
    });
  };

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(el.scrollLeft > 0);
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
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

  const stats = [
    {
      title: "Total Expenses",
      value: state?.reports?.getExpenseRegister?.summary?.totalExpenses,
      // up: "12%"
    },
    {
      title: "Total Expense Amount",
      value: state?.reports?.getExpenseRegister?.summary?.totalAmount,
      isCurrency: true,
    },
  ];

  const handleNavigateReports = () => {
    navigate(`/reports/${state.login.selectedHostel_Id}`);
    dispatch({
      type: "SET_EXPENSE_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        category: [],
        period: undefined,
        paymentMode: [],
        paidTo: [],
        createdBy: [],
        createdByLabels: [],
        categoryLabel: [],
        subCategory: [],
        subCategoryLabel: [],
        vendorId: "",
        vendorName: "",
        paymentStatus: "",
      },
    });
  };

  const handleClickFilter = () => {
    setInvoiceFilter(true);
  };

  // const options = [
  //   { key: "sharing", label: "Sharing", checked: true },
  //   { key: "checkin", label: "Check-in Date", checked: true },
  //   { key: "checkout", label: "Checkout date", checked: true },
  //   { key: "stay", label: "Stay Duration", checked: false },
  //   { key: "room", label: "Room", checked: true },
  //   { key: "bed", label: "Bed", checked: false },
  //   { key: "status", label: "Status", checked: true },
  //   { key: "payment", label: "Last Payment", checked: true },
  // ];
  const reportCards = [
    { title: "Invoice Register" },
    { title: "Receipt Register" },
    { title: "Bank Transaction Register" },
    { title: "Tenant Register" },
    { title: "Occupancy" },
    // { title: "Expense Register" },
    { title: "Vendor Ledger" },
    { title: "Electricity Billing Register" },
    { title: "Complaint Register" },
    { title: "Request Register" },
    { title: "Final Settlement" },
  ];

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
  const isInitialLoad = useRef(true);
  const apiStart = state?.reports?.getExpenseRegister?.summary?.startDate;
  const apiEnd = state?.reports?.getExpenseRegister?.summary?.endDate;

  useEffect(() => {
    if (!apiStart || !apiEnd || !isInitialLoad.current) return;

    isInitialLoad.current = false;

    setSelectedRange({
      from: dayjs(apiStart, "DD/MM/YYYY").toDate(),
      to: dayjs(apiEnd, "DD/MM/YYYY").toDate(),
    });
  }, [apiStart, apiEnd]);

  const handleDateChange = (dates) => {
    if (!dates) {
      setSelectedRange(null);
      dispatch({
        type: "SET_EXPENSE_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          category: [],
          period: undefined,
          paymentMode: [],
          paidTo: [],
          createdBy: [],
          createdByLabels: [],
          categoryLabel: [],
          subCategory: [],
          subCategoryLabel: [],
          vendorId: "",
          vendorName: "",
          paymentStatus: "",
        },
      });
      dispatch({
        type: "GET_REPORTS_EXPENSE_REGISTER_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
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
      from: from ? from.toDate() : null,
      to: to ? to.toDate() : null,
    });

    const expenseFilters = state.reports?.expenseRegisterFilters;
    const filters = {
      startDate: from ? dayjs(from).format("DD-MM-YYYY") : undefined,
      endDate: to ? dayjs(to).format("DD-MM-YYYY") : undefined,
      size: size,
      page: 1,
      category: expenseFilters?.category,
      subCategory: expenseFilters?.subCategory,
      paymentMode: expenseFilters?.paymentMode,
      createdBy: expenseFilters?.createdBy,
      period: expenseFilters?.period,
      vendorId: expenseFilters?.vendorId,
      vendorName: expenseFilters?.vendorName,
      paymentStatus: expenseFilters?.paymentStatus,
    };

    dispatch({
      type: "GET_REPORTS_EXPENSE_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: filters,
      },
    });

    dispatch({
      type: "SET_EXPENSE_REGISTER_FILTERS",
      payload: filters,
    });
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_EXPENSE_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          category: [],
          period: undefined,
          paymentMode: [],
          paidTo: [],
          createdBy: [],
          createdByLabels: [],
          categoryLabel: [],
          subCategory: [],
          subCategoryLabel: [],
          vendorId: "",
          vendorName: "",
          paymentStatus: "",
        },
      });

      // const filters = {
      //   size: size,
      //   page: page,
      // };
      // dispatch({
      //   type: "GET_REPORTS_EXPENSE_REGISTER_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     filters: filters,
      //   },
      // });
    };
  }, []);

  const startDate = selectedRange?.from
    ? dayjs(selectedRange.from).format("DD-MM-YYYY")
    : undefined;

  const endDate = selectedRange?.to
    ? dayjs(selectedRange.to).format("DD-MM-YYYY")
    : undefined;

  useEffect(() => {
    if (!state.login?.selectedHostel_Id) return;
    const expenseFilters = state.reports?.expenseRegisterFilters;
    const filters = {
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      category: expenseFilters?.category,
      subCategory: expenseFilters?.subCategory,
      paymentMode: expenseFilters?.paymentMode,
      createdBy: expenseFilters?.createdBy,
      period: expenseFilters?.period,
      vendorId: expenseFilters?.vendorId,
      vendorName: expenseFilters?.vendorName,
      paymentStatus: expenseFilters?.paymentStatus,
    };
    dispatch({
      type: "GET_REPORTS_EXPENSE_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: filters,
      },
    });
    setLoading(true);
  }, [size, page, state.login?.selectedHostel_Id]);

  const handleNavigateRegister = (item) => {
    setRegister(false);

    if (item?.title === "Tenant Register") {
      navigate(`/reports/tenant-register/${state.login?.selectedHostel_Id}`);
    } else if (item?.title === "Receipt Register") {
      navigate(`/reports/receipt-register/${state.login?.selectedHostel_Id}`);
    } else if (item?.title === "Bank Transaction Register") {
      navigate(
        `/reports/bank-transaction-register/${state.login?.selectedHostel_Id}`,
      );
    } else if (item?.title === "Occupancy") {
      navigate(`/reports/occupancy-register/${state.login?.selectedHostel_Id}`);
    } else if (item?.title === "Expense Register") {
      navigate(`/reports/expense-register/${state.login?.selectedHostel_Id}`);
    } else if (item?.title === "Vendor Ledger") {
      navigate(`/reports/vendor-register/${state.login?.selectedHostel_Id}`);
    } else if (item?.title === "Electricity Billing Register") {
      navigate(
        `/reports/electricity-billing-register/${state.login?.selectedHostel_Id}`,
      );
    } else if (item?.title === "Complaint Register") {
      navigate(`/reports/complaint-register/${state.login?.selectedHostel_Id}`);
    } else if (item?.title === "Request Register") {
      navigate(`/reports/request-register/${state.login?.selectedHostel_Id}`);
    } else if (item?.title === "Final Settlement") {
      navigate(
        `/reports/final-settlement-register/${state.login?.selectedHostel_Id}`,
      );
    } else if (item?.title === "Invoice Register") {
      navigate(`/reports/invoice-register/${state.login?.selectedHostel_Id}`);
    }
    dispatch({
      type: "SET_EXPENSE_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        category: [],
        period: undefined,
        paymentMode: [],
        paidTo: [],
        createdBy: [],
        createdByLabels: [],
        categoryLabel: [],
        subCategory: [],
        subCategoryLabel: [],
        vendorId: "",
        vendorName: "",
        paymentStatus: "",
      },
    });
  };

  const currentPage = state?.reports?.getExpenseRegister?.currentPage ?? 1;

  const totalPages = state?.reports?.getExpenseRegister?.totalPages ?? 1;

  const totalRecords = state?.reports?.getExpenseRegister?.totalRecords ?? 0;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  useEffect(() => {
    const invoiceFilters = state.reports.expenseRegisterFilters;
    const filterData = [];

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

    if (invoiceFilters?.categoryLabel?.length) {
      filterData.push({
        key: "category",
        label: "Category  is",
        type: "category",
        value: invoiceFilters.categoryLabel.join(", "),
      });
    }

    if (invoiceFilters?.subCategoryLabel?.length) {
      filterData.push({
        key: "SubCategory",
        label: "SubCategory  is",
        type: "subCategoryLabel",
        value: invoiceFilters.subCategoryLabel.join(", "),
      });
    }

    if (invoiceFilters?.createdByLabels?.length) {
      filterData.push({
        key: "collected",
        label: "Collected By  is",
        type: "collected",
        value: invoiceFilters.createdByLabels.join(", "),
      });
    }

    if (invoiceFilters?.period?.length) {
      filterData.push({
        key: "period",
        label: "Period  is",
        type: "period",
        value: invoiceFilters?.period,
      });
    }
    if (invoiceFilters?.vendorName) {
      filterData.push({
        key: "vendor",
        label: "Vendor  is",
        type: "vendor",
        value: invoiceFilters?.vendorName,
      });
    }
    if (invoiceFilters?.paymentStatus) {
      filterData.push({
        key: "paymentStatus",
        label: "Payment Status  is",
        type: "paymentStatus",
        value: invoiceFilters?.paymentStatus,
      });
    }

    if (invoiceFilters?.paymentMode?.length) {
      filterData.push({
        key: "payment",
        label: "PaymentMode  is",
        type: "payment",
        value: invoiceFilters.paymentMode.join(", "),
      });
    }
    setChips(filterData);
  }, [state.reports.expenseRegisterFilters]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const handleDownload = () => {
    if (state.login.selectedHostel_Id) {
      const expenseFilters = state.reports?.expenseRegisterFilters;
      dispatch({
        type: "REPORTS_EXPENSE_REGISTER_PDFSAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          startDate: startDate,
          endDate: endDate,
          category: expenseFilters?.category,
          subCategory: expenseFilters?.subCategory,
          paymentMode: expenseFilters?.paymentMode,
          createdBy: expenseFilters?.createdBy,
          period: expenseFilters?.period,
          vendorId: expenseFilters?.vendorId,
          vendorName: expenseFilters?.vendorName,
          paymentStatus: expenseFilters?.paymentStatus,
        },
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (state?.reports?.reportsExpensePdfSuccess === 200) {
      const pdfUrl = state?.reports?.reportsExpensePdf;
      setLoading(false);
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");

        dispatch({ type: "REMOVE_REPORTS_EXPENSE_REGISTER_PDF_REDUCER" });
      }
    }
  }, [state?.reports?.reportsExpensePdfSuccess]);

  useEffect(() => {
    if (state?.reports?.reportsPdfExportError) {
      setLoading(false);
      dispatch({ type: "REMOVE_REPORTS_PDF_EXPORT_ERROR" });
    }
  }, [state?.reports?.reportsPdfExportError]);

  return (
    <div className="h-screen flex flex-col font-gilroy p-2">
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 right-0 left-0 z-40 bg-white">
        <div className="flex items-center gap-2">
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
                Expense Register
              </h1>
              <div className="rounded-none border-0">
                <ArrowDown2
                  size="18"
                  color="#1E45E1"
                  className={`cursor-pointer transition-transform duration-200 ${
                    register ? "rotate-180" : ""
                  }`}
                />
                {register && (
                  <div
                    ref={dropdownRef}
                    className="absolute z-[90] mt-2 w-64 bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E7EB]"
                  >
                    {reportCards.map((item, index) => {
                      const isFirst = index === 0;
                      const isLast = index === reportCards.length - 1;

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
                          {item.title}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            <label className="text-sm font-normal text-[#4A5565]">
              Reports / Expense Register
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-stretch">
          <div className="datepicker-wrapper" style={{ position: "relative" }}>
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
                  ? [dayjs(selectedRange.from), dayjs(selectedRange.to)]
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
                triggerNode.closest(".datepicker-wrapper")
              }
            />
          </div>

          <button
            onClick={handleClickFilter}
            className="h-[36px] flex items-center gap-2 px-4 border rounded-lg text-sm font-gilroy"
          >
            <Filter size="16" />
            Filter
          </button>

          {expenseRegister?.expenseLists?.length > 0 && (
            <ApiPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalRecords={totalRecords}
              onPageChange={handlePageChange}
              onSizeChange={handleSizeChange}
              size={size}
              isTenantPagination={true}
            />
          )}
          <button
            onClick={() => isExportAllow && handleDownload()}
            disabled={!isExportAllow}
            className={`h-[36px] flex items-center gap-2 px-4 rounded-lg text-sm font-gilroy
                                ${
                                  !isExportAllow
                                    ? "bg-gray-400 cursor-not-allowed text-white"
                                    : "bg-[#1E45E1] text-white hover:bg-[#1639c5]"
                                }`}
          >
            <Export size="16" />
            Export
          </button>
        </div>
      </div>

      <div className="px-1 pb-[10px] bg-[#F9FAFB] rounded-lg h-fit   flex flex-col ">
        {chips.length > 0 && (
          <div className="me-3 ms-3 mt-3 flex items-start gap-3 p-3 rounded-[10px] bg-[#FFFFFF] border border-[#E5E7EB] font-[Gilroy,sans-serif]">
            <div className="flex flex-1 gap-2 flex-wrap overflow-y-auto min-w-0">
              {chips.map((chip) => (
                <div key={chip.key}>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EEF2FF] rounded-full text-[12px] font-medium text-[#1F2937] border border-[#E0E7FF] shrink-0">
                    {chip.label} :
                    <span className="text-[12px] font-medium text-[#16151C]">
                      {chip.value}
                    </span>
                  </span>
                </div>
              ))}
            </div>

            <span
              onClick={handleReset}
              className="text-[#1E45E1] text-[13px] font-medium cursor-pointer whitespace-nowrap"
            >
              Reset
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-3 ms-1 me-1 ">
          {stats.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-3 shadow-sm border border-[#E5E7EB] h-[130px]"
            >
              <div className="flex justify-between ">
                <label className="text-sm font-semibold text-[#4A5565]">
                  {item.title}
                </label>
                {item.up && (
                  <span className="text-xs text-[#008236] bg-[#F0FDF4] h-fit rounded-lg px-2 py-1">
                    ↑ {item.up}
                  </span>
                )}
                {item.down && (
                  <span className="text-xs text-[#C10007] bg-[#FEF2F2] h-fit  rounded-lg px-2 py-1">
                    ↓ {item.down}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <h2 className="text-2xl font-semibold text-[#101828]">
                  {item.isCurrency ? `₹ ${item.value ?? 0}` : (item.value ?? 0)}
                </h2>
              </div>
            </div>
          ))}
        </div>
        {expenseRegister?.expenseLists?.length > 0 ? (
          <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
            <div
              ref={tableRef}
              className=" overflow-y-auto relative  h-[calc(100vh-200px)] rounded-xl show-scrolls "
            >
              <table className="w-full  text-[12px] font-gilroy">
                <thead className="bg-[#F9FAFB] text-[#6B7280] sticky top-0 z-30 rounded-tl-xl  rounded-tr-xl">
                  <tr className="border-b border-[#E8E8E8]">
                    <th className="px-4 py-2.5 text-left font-semibold  uppercase whitespace-nowrap sticky left-0 z-40 bg-[#F9FAFB] w-[40px] rounded-tl-xl">
                      {/* <Setting3
                        // onClick={() => setOpen(!open)}
                        className="cursor-pointer"
                        size="18"
                        color="#4B4B4B"
                      /> */}
                      Expense No
                    </th>

                    <th className="px-4 py-2.5 text-left font-semibold  sticky left-[42px] z-30 bg-[#F9FAFB] w-[140px] uppercase">
                      date
                    </th>

                    <th className="px-4 py-2.5 text-left font-semibold sticky left-[150px] z-30 bg-[#F9FAFB] w-[200px]  uppercase">
                      Category
                    </th>
                    <th className="px-4 py-2.5 text-left font-semibold sticky left-[150px] z-30 bg-[#F9FAFB] w-[200px]  uppercase whitespace-nowrap">
                      Sub Category
                    </th>
                    <th className="px-4 py-2.5 text-center font-semibold uppercase whitespace-nowrap">
                      Expense Title
                    </th>
                    <th className="px-4 py-2.5 text-center font-semibold uppercase whitespace-nowrap">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-center font-semibold uppercase whitespace-nowrap">
                      Payment mode
                    </th>
                    <th className="px-4 py-2.5 text-center font-semibold uppercase whitespace-nowrap">
                      Total Amount
                    </th>
                    <th className="px-4 py-2.5 text-center font-semibold uppercase whitespace-nowrap">
                      Paid Amount
                    </th>
                    <th className="px-4 py-2.5 text-center font-semibold uppercase whitespace-nowrap">
                      Balance Amount
                    </th>

                    <th className="px-4 py-2.5 text-center font-semibold uppercase">
                      Description
                    </th>
                    {/* <th className="px-4 py-2.5 text-center font-semibold  uppercase w-[230px] whitespace-nowrap">
                      <div className="flex justify-center items-center gap-1">
                        unit count
                        <ArrowSwapVertical size="16" color="#4B4B4B" />
                      </div>
                    </th> */}

                    <th className="px-4 py-2.5 text-center font-semibold  uppercase w-[250px] whitespace-nowrap">
                      <div className="flex justify-center items-center gap-1">
                        Assigned Asset
                      </div>
                    </th>

                    <th className="px-4 py-2.5 text-center font-semibold uppercase w-[200px]">
                      <div className="flex justify-center items-center gap-1">
                        Vendor
                        <ArrowSwapVertical size="16" color="#4B4B4B" />
                      </div>
                    </th>
                    <th className="px-4 py-2.5 text-center font-semibold  uppercase w-[250px] rounded-tr-xl whitespace-nowrap">
                      Debited from
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {expenseRegister?.expenseLists?.length > 0 ? (
                    expenseRegister?.expenseLists?.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b last:border-none  transition"
                      >
                        <td className="px-4 py-2.5 sticky left-0 z-20 bg-white w-[40px] text-[#1E45E1] font-semibold truncate whitespace-nowrap">
                          {row.expenseNumber}
                        </td>
                        <td
                          className="px-4 py-2.5 text-[#1E45E1] font-semibold truncate whitespace-nowrap sticky
                       left-[42px] z-20 bg-white w-[140px]"
                          title={row.date}
                        >
                          {row.date}
                        </td>

                        <td className="px-4 py-2.5 sticky left-[150px] z-20 bg-white min-w-0 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              onMouseEnter={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                setPosition({
                                  top: rect.top + rect.height / 2,
                                  left: rect.right + 10,
                                });
                                setCategoryTooltip(i);
                              }}
                              onMouseLeave={() => setCategoryTooltip(null)}
                              className="truncate whitespace-nowrap font-semibold text-[#111928]"
                            >
                              {row.expenseCategory}

                              {categoryTooltip === i && (
                                <div
                                  style={{
                                    top: position.top,
                                    left: position.left,
                                  }}
                                  className="fixed -translate-y-1/2 z-[9999] bg-gray-200 text-gray-800  border-gray-200 text-xs px-3 py-1.5 rounded-md max-w-[220px] whitespace-normal break-words pointer-events-none"
                                >
                                  {row.expenseCategory}
                                </div>
                              )}
                            </span>
                          </div>
                        </td>

                        <td className="px-4 py-2.5 text-[#6B7280] min-w-0 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              onMouseEnter={(e) => {
                                const rect =
                                  e.currentTarget.getBoundingClientRect();
                                setPosition({
                                  top: rect.top + rect.height / 2,
                                  left: rect.right + 10,
                                });
                                setCategoryTooltip(`sub-${i}`);
                              }}
                              onMouseLeave={() => setCategoryTooltip(null)}
                              className="truncate whitespace-nowrap"
                            >
                              {row.expenseSubCategory || "-"}

                              {categoryTooltip === `sub-${i}` &&
                                row.expenseSubCategory && (
                                  <div
                                    style={{
                                      top: position.top,
                                      left: position.left,
                                    }}
                                    className="fixed -translate-y-1/2 z-[9999] bg-gray-200 text-gray-800 border-gray-200 text-xs px-3 py-1.5 rounded-md max-w-[220px] whitespace-normal break-words pointer-events-none"
                                  >
                                    {row.expenseSubCategory}
                                  </div>
                                )}
                            </span>
                          </div>
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] font-medium transition-colors whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.expenseTitle || "-"}
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center font-medium transition-colors whitespace-nowrap ${
                            isScrolled ? "bg-gray-100" : "bg-white"
                          }`}
                        >
                          <span
                            className="inline-flex items-center justify-center rounded-full px-3 py-1  font-medium"
                            style={{
                              backgroundColor:
                                statusStyles[row.status]?.bg || "#F3F4F6",
                              color:
                                statusStyles[row.status]?.text || "#6B7280",
                            }}
                          >
                            {row.status || "-"}
                          </span>
                        </td>
                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] font-medium transition-colors whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.paymentMode || "-"}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] font-medium transition-colors whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.amount || "-"}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] font-medium transition-colors whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.paidAmount || "-"}
                        </td>
                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] font-medium transition-colors whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.balanceAmount || "-"}
                        </td>

                        <td
                          onMouseEnter={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setPosition({
                              top: rect.top + rect.height / 2,
                              left: rect.right,
                            });
                            setDescriptionTooltip(i);
                          }}
                          onMouseLeave={() => setDescriptionTooltip(null)}
                          className={`px-4 py-2.5 text-center text-[#6B7280]
    min-w-0 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap
    transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          <span className="cursor-pointer">
                            {row.description || "-"}

                            {descriptionTooltip === i && (
                              <div
                                style={{
                                  top: position.top,
                                  left: position.left,
                                }}
                                className="fixed -translate-y-1/2 z-[9999] bg-gray-200 text-gray-800  border-gray-200 text-xs px-3 py-1.5 rounded-md max-w-[220px] whitespace-normal break-words pointer-events-none"
                              >
                                {row.description || "-"}
                              </div>
                            )}
                          </span>
                        </td>

                        {/* <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] font-medium transition-colors whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          ₹{row.amount || 0}
                        </td> */}
                        <td
                          className={`px-4 py-2.5 text-center font-semibold text-[#222222] transition-colors min-w-0 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.assetsName || "-"}
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center font-semibold text-[#222222] transition-colors whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.vendorName || "-"}
                        </td>

                        <td
                          onMouseEnter={(e) => {
                            const rect =
                              e.currentTarget.getBoundingClientRect();
                            setPosition({
                              top: rect.top + rect.height / 2,
                              left: rect.right,
                            });
                            setCollectedTooltip(i);
                          }}
                          onMouseLeave={() => setCollectedTooltip(null)}
                          className={`px-4 py-2.5 text-center font-semibold text-[#222222] transition-colors min-w-0 max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.account || "-"}

                          {collectedTooltip === i && (
                            <div
                              style={{
                                top: position.top - 30,
                                left: position - 100,
                              }}
                              className="fixed -translate-y-1/2 z-[9999] 
     bg-gray-200 text-gray-800  border-gray-200
      text-xs px-3 py-1.5 rounded-md 
          whitespace-normal break-words pointer-events-none max-w-[220px]"
                            >
                              {row.account}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={9}
                        className="py-10 text-center text-sm text-gray-600 font-medium"
                      >
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* {open && (
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
                    {options.map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center gap-3 text-sm cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          defaultChecked={item.checked}
                          className="w-4 h-4 accent-[#1E45E1] rounded"
                        />
                        <span className="text-[#101828]">{item.label}</span>
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
            )} */}
          </div>
        ) : (
          <div className="my-2">
            <NoDataMessage
              label="Expense"
              isSearching={isSearching}
              isClearSearch={false}
            />
          </div>
        )}

        {invoiceFilter && (
          <ExpenseFilter
            show={invoiceFilter}
            handleClose={handleCloseFilterBills}
            size={size}
            page={page}
            startDate={startDate}
            endDate={endDate}
          />
        )}
      </div>
    </div>
  );
}
export default withErrorBoundary(ExpenseRegister);

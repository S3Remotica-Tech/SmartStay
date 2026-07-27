/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import {
  Filter,
  Export,
  ArrowLeft,
  ArrowSwapVertical,
  Setting3,
  SearchNormal1,
  ArrowDown2,
  ProfileCircle,
} from "iconsax-react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import TenantsFilter from "./TenantsFilter";
import ApiPagination from "../../Components/ApiPagination";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useHasPermission } from "../../Utils/Permission";
import NoDataMessage from "../../Utils/NoDataMessage";

function TenantsRegister() {
  const navigate = useNavigate();
  const state = useSelector((state) => state);
  const { RangePicker } = DatePicker;
  const [open, setOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [register, setRegister] = useState(false);
  const [invoiceFilter, setInvoiceFilter] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const [tenantRegister, setTenantRegister] = useState("");
  const [chips, setChips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const tableRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [customerTooltip, setCustomerTooltip] = useState(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const isSearching = chips.length > 0;

  const { canReadModule: canReadReports } = useHasPermission("Reports");

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;

  const isExportAllow = isValidSubscription && canReadReports;

  useEffect(() => {
    if (state.reports.getTenantRegisterSuccess === 200) {
      isInitialLoad.current = true;
      setLoading(false);
      setTenantRegister(state?.reports?.getTenantRegister);
      setInvoiceFilter(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_REPORTS_TENANT_REGISTER_REDUCER" });
      }, 100);
    }
  }, [state.reports.getTenantRegisterSuccess]);

  const handleCloseFilterBills = () => {
    setInvoiceFilter(false);
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

  const stats = [
    { title: "Total Tenants", value: tenantRegister?.summary?.totalTenants },
    {
      title: "Active Tenants",
      value: tenantRegister?.summary?.activeTenants?.count,
      // up: `${tenantRegister?.summary?.activeTenants?.trend} %`,
      link: true,
    },
    {
      title: "Notice Period",
      value: tenantRegister?.summary?.noticePeriod?.count,
      //  up: `${tenantRegister?.summary?.noticePeriod?.trend} %`,
      link: true,
    },
    {
      title: "Check out(MTD)",
      value: tenantRegister?.summary?.checkoutMTD?.count,
      //  down: `${tenantRegister?.summary?.checkoutMTD?.trend} %`,
      link: true,
    },
    {
      title: "Inactive",
      value: tenantRegister?.summary?.inactive?.count,
      // down: `${tenantRegister?.summary?.inactive?.trend} %`,
      link: true,
    },
    { title: "Booked Tenants", value: tenantRegister?.summary?.booked?.count },
    //  up: `${tenantRegister?.summary?.noticePeriod?.trend} %`,
  ];

  const handleReset = () => {
    const startOfMonth = dayjs().startOf("month").toDate();
    const endOfMonth = dayjs().endOf("month").toDate();

    setSelectedRange({
      from: startOfMonth,
      to: endOfMonth,
    });

    dispatch({
      type: "SET_TENANT_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        period: [],
        search: "",
        tenantStatus: [],
        floor: [],
        room: [],
        size: "",
        page: "",
        floorId: [],
        roomId: [],
        sharingType: "",
        sharingTypeLabel: "",
        tenantStatusLabel: [],
      },
    });
    dispatch({
      type: "GET_REPORTS_TENANT_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: {
          size: size,
          page: page,
        },
      },
    });
  };

  const handleNavigateReports = () => {
    navigate(`/reports/${state.login.selectedHostel_Id}`);
    dispatch({
      type: "SET_TENANT_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        period: [],
        search: "",
        tenantStatus: [],
        floor: [],
        room: [],
        size: "",
        page: "",
        floorId: [],
        roomId: [],
        sharingType: "",
        sharingTypeLabel: "",
        tenantStatusLabel: [],
      },
    });
  };

  const handleClickFilter = () => {
    setInvoiceFilter(true);
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
    { title: "Invoice Register" },
    { title: "Receipt Register" },
    { title: "Bank Transaction Register" },
    // { title: "Tenant Register" },
    { title: "Occupancy" },
    { title: "Expense Register" },
    { title: "Vendor Ledger" },
    { title: "Electricity Billing Register" },
    { title: "Complaint Register" },
    { title: "Request Register" },
    { title: "Final Settlement" },
  ];

  const apiStart = state?.reports?.getTenantRegister?.dateRange?.from;
  const apiEnd = state?.reports?.getTenantRegister?.dateRange?.to;

  const isInitialLoad = useRef(true);

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
        type: "SET_TENANT_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
        },
      });
      dispatch({
        type: "GET_REPORTS_TENANT_REGISTER_SAGA",
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

    const savedFilters = state.reports?.tenantRegisterFilters;

    const filters = {
      startDate: from ? dayjs(from).format("DD-MM-YYYY") : undefined,
      endDate: to ? dayjs(to).format("DD-MM-YYYY") : undefined,
      size: size,
      page: 1,
      status: savedFilters?.tenantStatus,
      period: savedFilters?.period,
      floor: savedFilters?.floorId,
      room: savedFilters?.roomId,
      search: savedFilters?.search,
      sharingType: savedFilters?.sharingType,
    };

    dispatch({
      type: "GET_REPORTS_TENANT_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: filters,
      },
    });

    dispatch({
      type: "SET_TENANT_REGISTER_FILTERS",
      payload: filters,
    });
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_TENANT_REGISTER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          period: [],
          search: "",
          tenantStatus: [],
          floor: [],
          room: [],
          size: "",
          page: "",
          floorId: [],
          roomId: [],
          sharingType: "",
          sharingTypeLabel: "",
          tenantStatusLabel: [],
        },
      });

      // const filters = {
      //   size: size,
      //   page: page,
      // };

      // dispatch({
      //   type: "GET_REPORTS_TENANT_REGISTER_SAGA",
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
    const savedFilters = state.reports?.tenantRegisterFilters;

    const filters = {
      startDate: startDate,
      endDate: endDate,
      size: size,
      page: page,
      status: savedFilters?.tenantStatus,
      period: savedFilters?.period,
      floor: savedFilters?.floorId,
      room: savedFilters?.roomId,
      search: savedFilters?.search,
      sharingType: savedFilters?.sharingType,
    };

    dispatch({
      type: "GET_REPORTS_TENANT_REGISTER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        filters: filters,
      },
    });
    setLoading(true);
  }, [size, page, state.login?.selectedHostel_Id]);

  const handleDownload = () => {
    if (state.login.selectedHostel_Id && startDate && endDate) {
      const savedFilters = state.reports?.tenantRegisterFilters;
      dispatch({
        type: "REPORTS_TENANT_REGISTER_PDFSAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          startDate: startDate,
          endDate: endDate,
          period: savedFilters?.period,
        },
      });
      setLoading(true);
    }
  };

  useEffect(() => {
    if (state?.reports?.reportsTenantsPdfSuccess === 200) {
      const pdfUrl = state?.reports?.reportsTenantsPdf;
      setLoading(false);
      if (pdfUrl) {
        window.open(pdfUrl, "_blank");
        //  window.location.href = pdfUrl;
        // const url = window.URL.createObjectURL(new Blob([pdfUrl]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'file.pdf');
        // document.body.appendChild(link);
        // link.click();
        dispatch({ type: "REMOVE_REPORTS_TENANT_REGISTER_PDF_REDUCER" });
      }
    }
  }, [state?.reports?.reportsTenantsPdf]);

  useEffect(() => {
    if (state?.reports?.reportsPdfExportError) {
      setLoading(false);
      dispatch({ type: "REMOVE_REPORTS_PDF_EXPORT_ERROR" });
    }
  }, [state?.reports?.reportsPdfExportError]);

  // useEffect(() => {
  //   if (state?.reports?.reportsTenantsPdfSuccess === 200) {

  //     const pdfUrl = state?.reports?.reportsTenantsPdf;
  //     setLoading(false);

  //     if (pdfUrl) {
  //       fetch(pdfUrl)
  //         .then(res => res.blob())
  //         .then(blob => {
  //           const url = window.URL.createObjectURL(blob);
  //           const link = document.createElement("a");
  //           link.href = url;
  //           link.download = "file.pdf";
  //           document.body.appendChild(link);
  //           link.click();
  //           document.body.removeChild(link);
  //           window.URL.revokeObjectURL(url);
  //         });

  //       dispatch({ type: 'REMOVE_REPORTS_TENANT_REGISTER_PDF_REDUCER' });
  //     }
  //   }
  // }, [state?.reports?.reportsTenantsPdf]);

  // useEffect(() => {
  //   setPage(0);
  // }, [state.reports?.tenantRegisterFilters]);

  useEffect(() => {
    const filters = state.reports?.tenantRegisterFilters;
    const filterData = [];

    if (filters?.startDate || filters?.endDate) {
      filterData.push({
        key: "date-range",
        label: "Date",
        type: "date",
        value:
          filters.startDate && filters.endDate
            ? `${filters.startDate} - ${filters.endDate}`
            : filters.startDate || filters.endDate,
      });
    }

    if (filters?.period?.length) {
      filterData.push({
        key: "period",
        label: "Period",
        type: "single",
        value: filters.period,
      });
    }
    if (filters?.sharingTypeLabel?.length) {
      filterData.push({
        key: "sharingType",
        label: "Sharing Type",
        type: "sharingType",
        value: filters.sharingTypeLabel,
      });
    }

    if (filters?.search?.trim()) {
      filterData.push({
        key: "search",
        label: "Search",
        type: "text",
        value: filters.search,
      });
    }

    if (filters?.tenantStatusLabel?.length) {
      filters.tenantStatusLabel.forEach((status) => {
        filterData.push({
          key: "tenantStatus",
          label: "Status",
          type: "multi",
          value: status.label || status,
        });
      });
    }

    if (filters?.floor?.length) {
      filters.floor.forEach((floor) => {
        filterData.push({
          key: "floor",
          label: "Floor",
          type: "multi",
          value: floor.label || floor,
        });
      });
    }

    if (filters?.room?.length) {
      filters.room.forEach((room) => {
        filterData.push({
          key: "room",
          label: "Room",
          type: "multi",
          value: room.label || room,
        });
      });
    }

    setChips(filterData);
  }, [state.reports.tenantRegisterFilters]);

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
      type: "SET_TENANT_REGISTER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        period: [],
        search: "",
        tenantStatus: [],
        floor: [],
        room: [],
        size: "",
        page: "",
        floorId: [],
        roomId: [],
        sharingType: "",
        sharingTypeLabel: "",
        tenantStatusLabel: [],
      },
    });
  };

  const currentPage = state?.reports?.getTenantRegister?.currentPage ?? 1;

  const totalPages = state?.reports?.getTenantRegister?.totalPages ?? 1;

  const totalRecords = state?.reports?.getTenantRegister?.totalItems ?? 0;

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

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
    if (state.createAccount?.networkError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div className="h-screen flex flex-col font-gilroy p-2">
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-[200px] flex items-center justify-center bg-transparent opacity-75 z-10">
          <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sticky top-0 right-0 left-0 z-40 bg-white ">
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
                Tenant Register
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
                    className="absolute z-40  mt-2 w-64 bg-white rounded-2xl shadow-lg overflow-hidden border border-[#E5E7EB]"
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
              Reports / Tenant Register
            </label>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 items-stretch">
          <div className="datepicker-wrapper" style={{ position: "relative" }}>
            <RangePicker
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
          {tenantRegister?.tenants?.length > 0 && (
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

      <div className="px-1 pb-[20px] bg-[#F9FAFB] rounded-lg h-fit py-0 flex flex-col ">
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

        <div className="mt-3 ms-1 me-1 overflow-x-auto ">
          <div className="flex gap-4 min-w-max">
            {stats.map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-3 shadow-sm border border-[#E5E7EB] 
                   h-[100px] min-w-[200px] flex-shrink-0"
              >
                <div className="flex justify-between">
                  <label className="text-sm font-semibold text-[#4A5565] whitespace-nowrap">
                    {item.title}
                  </label>

                  {item.up && (
                    <span className="text-xs text-[#008236] bg-[#F0FDF4] h-fit rounded-lg px-2 py-1">
                      ↑ {item.up}
                    </span>
                  )}

                  {item.down && (
                    <span className="text-xs text-[#C10007] bg-[#FEF2F2] h-fit rounded-lg px-2 py-1">
                      ↓ {item.down}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 mt-2">
                  <h2 className="text-2xl font-semibold text-[#101828]">
                    {item.value ?? ""}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </div>
        {tenantRegister?.tenants?.length > 0 ? (
          <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
            <div
              ref={tableRef}
              className=" overflow-y-auto relative  h-[calc(100vh-200px)] rounded-xl show-scrolls "
            >
              <table className="w-full  text-[12px] font-gilroy">
                <thead className="bg-[#F9FAFB] text-[#6B7280] sticky top-0 z-30 rounded-tl-xl  rounded-tr-xl">
                  <tr className="border-b border-[#E8E8E8]">
                    <th className="px-4 py-2.5 text-left font-semibold sticky left-0 z-30 bg-[#F9FAFB] w-[40px] rounded-tl-xl">
                      <Setting3
                        // onClick={() => setOpen(!open)}
                        className="cursor-pointer"
                        size="18"
                        color="#4B4B4B"
                      />
                    </th>

                    {/* <th className="px-4 py-2.5 text-left font-semibold  sticky left-[42px] z-30 bg-[#F9FAFB] w-[140px] uppercase">
                                        Tenant ID
                                    </th> */}

                    <th className="px-4 py-2.5 text-left font-semibold sticky left-[40px] z-30 bg-[#F9FAFB] w-[200px]  uppercase">
                      NAME
                    </th>

                    <th className="px-4 py-2.5 text-center font-semibold uppercase  bg-[#F9FAFB] whitespace-nowrap">
                      Mobile No
                    </th>

                    <th className="px-4 py-2.5 text-center font-semibold  uppercase">
                      <div className="flex justify-center items-center gap-1">
                        Sharing
                        <ArrowSwapVertical size="16" color="#4B4B4B" />
                      </div>
                    </th>

                    <th className="px-4 py-2.5 text-center font-semibold  uppercase w-[200px] whitespace-nowrap">
                      <div className="flex justify-center items-center gap-1">
                        Checkin date
                      </div>
                    </th>

                    <th className="px-4 py-2.5 text-center font-semibold uppercase w-[250px] whitespace-nowrap">
                      <div className="flex justify-center items-center gap-1">
                        Checkout date
                        <ArrowSwapVertical size="16" color="#4B4B4B" />
                      </div>
                    </th>

                    <th className="px-4 py-2.5 text-center font-semibold  uppercase w-[200px] rounded-tr-xl whitespace-nowrap">
                      Stay Duration
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tenantRegister?.tenants?.length > 0 ? (
                    tenantRegister?.tenants?.map((row, i) => (
                      <tr
                        key={row.tenantId}
                        className="border-b last:border-none  transition"
                      >
                        <td className="px-4 py-2.5 sticky left-0 z-20 bg-white w-[40px]"></td>

                        <td className="px-4 py-2.5 sticky left-[40px] z-20 bg-white max-w-[200px] ">
                          <div className="flex items-center gap-2 max-w-[200px]">
                            {row.profilePic ? (
                              <img
                                src={row.profilePic}
                                alt={row.fullName}
                                className="w-7 h-7 rounded-full object-cover flex-shrink-0"
                              />
                            ) : (
                              <div className="w-7 h-7 rounded-full bg-slate-200 text-[#44536A] flex-shrink-0 flex items-center justify-center text-xs font-semibold">
                                {row.initials}
                              </div>
                            )}
                            <span
                              onMouseEnter={(e) => {
                                const rect = e.target.getBoundingClientRect();
                                setPosition({
                                  top: rect.top + rect.height / 2,
                                  left: rect.right,
                                });
                                setCustomerTooltip(i);
                              }}
                              onMouseLeave={() => setCustomerTooltip(null)}
                              className="block w-full overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-[#111928] cursor-pointer"
                            >
                              {row.name}
                              {customerTooltip === i && (
                                <div
                                  style={{
                                    top: position.top,
                                    left: position.left,
                                  }}
                                  className="fixed -translate-y-1/2 z-[9999]  bg-gray-200 text-gray-800  border-gray-200 text-xs px-3 py-1.5 rounded-md  max-w-[220px] whitespace-normal break-words pointer-events-none"
                                >
                                  {row.name}
                                </div>
                              )}
                            </span>
                          </div>
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] whitespace-nowrap transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}`}
                        >
                          {row.mobileNo}
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] whitespace-nowrap transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.sharing || "-"}
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] whitespace-nowrap transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.checkInDate || "-"}
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] whitespace-nowrap transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.checkOutDate || "-"}
                        </td>

                        <td
                          className={`px-4 py-2.5 text-center text-[#6B7280] whitespace-nowrap transition-colors
    ${isScrolled ? "bg-gray-100" : "bg-white"}
  `}
                        >
                          {row.stayDuration || "-"}
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
            )}
          </div>
        ) : (
          <div className="my-2">
            <NoDataMessage
              label="Tenant"
              isSearching={isSearching}
              isClearSearch={false}
            />
          </div>
        )}

        {invoiceFilter && (
          <TenantsFilter
            show={invoiceFilter}
            handleClose={handleCloseFilterBills}
            startDate={startDate}
            endDate={endDate}
            size={size}
            page={page}
          />
        )}
      </div>
    </div>
  );
}
export default withErrorBoundary(TenantsRegister);

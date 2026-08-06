/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import BookingInvoice from "../Bookings/BookingInvoice";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { toast } from "react-toastify";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ApplyBookingModal from "./ApplyInvoices";
import ComingSoon from "../../Utils/ComingSoon";
import { useNavigate, } from "react-router-dom";
import { TiTick } from "react-icons/ti";
import { IoMdMenu } from "react-icons/io";
import {
  Filter,
  Export,
  ArrowLeft,
  ArrowUp2,
  ArrowSwapVertical,
  Setting3,
  SearchNormal1,
  Buildings,
  ArrowDown2,
  ArrowDown,
  CloseCircle,
  Document,
  Link21,
  AddCircle,
} from "iconsax-react";
import ApiPagination from "../../Components/ApiPagination";
import BookingsFilter from "./BookingsFilter";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoData from "../../Assets/v2Images/NoData.svg";
import DataSearch from "../../Assets/v2Images/DataSearch.svg";
import NoDataMessage from "../../Utils/NoDataMessage";
import RetainerApplyInvoice from "./RetainerApplyInvoice";

function Booking() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [chips, setChips] = useState([]);

  

  const [showBookingPdf, setShowBookingPdf] = useState(false);
  const [search, setSearch] = useState(false);
  const [bookingList, setBookingList] = useState([]);
  const [statusfilter, setStatusfilter] = useState("");
  const [showBillsFilter, setShowBillsFilter] = useState(false);
  const [applyInvoice, setApplyInvoice] = useState(false);
  const [applyInvoiceRetainer, setApplyInvoiceRetainer] = useState(false);
  const [filterInput, setFilterInput] = useState("");
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);
  const selectOptions = [{ label: "All", value: "ALL" }];
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const tableContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const lastScrollLeftRef = useRef(0);
  const listRef = useRef(null);
  const tableRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [showDots, setShowDots] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [advanceDetails, setAdvanceDetails] = useState("");
  const popupRef = useRef(null);
  const isSearching = chips.length > 0 || filterInput?.trim() !== "";

  const { canUpdateModule: canUpdateInvoice, canReadModule: canReadInvoice } =
    useHasPermission("Bills");

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (!canReadInvoice) {
      setLoading(false);
    }
  }, [canReadInvoice]);

  const sortedData = [];

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
    setShowBookingPdf(false);
  }, []);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    setPage(1);
    dispatch({
      type: "GET_BOOKING_LIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        page: page,
        size: size,
      },
    });
    setLoading(true);
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state?.Booking?.statusCodeGetBooking) {
      setBookingList(state?.Booking?.tenantBookingList);
      setLoading(false);
      dispatch({ type: "CLEAR_BOOKING_LIST" });
    }
  }, [state?.Booking?.statusCodeGetBooking]);

  const handleSearch = () => {
    setSearch(!search);
  };

  const filteredCustomizeItems = customizeItems.filter((item) =>
    item.fieldName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "previous_month", label: "Previous Month" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0]);

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };

  useEffect(() => {
    if (!open) {
      setError("");
      setCustomizeItems([...initialCustomizeItems]);
    }
  }, [open, initialCustomizeItems]);

  const handleResetCustomize = () => {
    setCustomizeItems([...initialCustomizeItems]);
    setError("");
  };

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

      cursor: state.isDisabled ? "not-allowed" : "pointer",
      backgroundColor: state.isDisabled
        ? "#F3F4F6"
        : state.hasValue
          ? "#F4F4F4"
          : "#fff",
      opacity: state.isDisabled ? 0.7 : 1,
    }),

    singleValue: (base, state) => ({
      ...base,
      color: state.isDisabled ? "#9CA3AF" : "#333",
      fontWeight: 500,
    }),

    placeholder: (base, state) => ({
      ...base,
      color: state.isDisabled ? "#9CA3AF" : "#6B7280",
    }),

    option: (base, state) => {
      const isSelected = state.isSelected;

      return {
        ...base,
        position: "relative",
        fontSize: 13,
        padding: "6px 12px",
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

    dropdownIndicator: (base, state) => ({
      ...base,
      padding: "4px",
      color: state.isDisabled ? "#D1D5DB" : "#6B7280",
      cursor: state.isDisabled ? "not-allowed" : "pointer",
    }),

    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  useEffect(() => {
    const cols = state?.Booking?.tenantBookingList?.columnList || [];

    const formatted = cols.map((col) => ({
      ...col,
      key: col.fieldName,
      selected: col.selected,
    }));

    setCustomizeItems(formatted);
    setInitialCustomizeItems(formatted);
  }, [state?.Booking?.tenantBookingList?.columnList]);

  const selectedColumns = (customizeItems || []).filter((col) => col.selected);
  const allSelected =
    Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);

  const headerKeyMap = {
    "Profile Pic": "profilePic",
    "Inv No": "invNo",
    "Booking Date": "bookingDate",
    "Tenant Name": "tenantName",
    "Mobile No": "mobile",
    "Joining Date": "joiningDate",
    "Floor Name": "floorName",
    "Room Name": "roomName",
    "Bed Name": "bedName",
    Amount: "amount",
    "Available Amount": "availableAmount",
    Status: "status",
  };

  const formattedData = (
    state?.Booking?.tenantBookingList?.bookingsList || []
  ).map((row) => {
    const obj = {};

    (state?.Booking?.tenantBookingList?.tableHeaders || []).forEach(
      (header, index) => {
        const key = headerKeyMap[header];
        const value = row[index];

        if (key) {
          obj[key] = value ?? "-";
        }
      },
    );

    const apiData = row[row.length - 1];

    // console.log("apiData", apiData);

    obj.apiCall = {
      invoiceId: apiData?.invoiceId || null,
      canApply: apiData?.canApply || null,
      availableAmount: apiData?.availableAmount || 0,
      customerId: apiData?.customerId,
    };

    // obj.status = apiData?.status || "-";
    return obj;
  });

  const columnStyles = {
    "Profile Pic": "px-4 whitespace-nowrap",
    "Inv No": "px-4 whitespace-nowrap",
    "Booking Date": "px-4 whitespace-nowrap",
    "Tenant Name": "px-4 whitespace-nowrap",
    "Joining Date": "px-4 whitespace-nowrap",
    "Mobile No": "px-4 whitespace-nowrap",
    "Floor Name": "px-4",
    "Room Name": "px-4",
    "Bed Name": "px-4",
    Amount: "px-4",
    status: "px-4",
    "Available Amount": "px-4 whitespace-nowrap",
  };

  const handleStatusFilter = (selectedOption) => {
    setStatusfilter(selectedOption);
  };

  const handleShowFilterBills = () => {
    setShowBillsFilter(true);
  };

  const handleCloseFilterBills = () => {
    setShowBillsFilter(false);
  };

  const handleApplyInvoices = (item) => {
    setApplyInvoice(true);
    setAdvanceDetails(item);
    setShowDots("");
  };
  const handleCloseApplyInvoices = () => {
    setApplyInvoice(false);
  };

  const handleApplyInvoicesRetainer = (item) => {
    setApplyInvoiceRetainer(true);
    setAdvanceDetails(item);
  };

  const handleCloseApplyInvoicesRetainer = () => {
    setApplyInvoiceRetainer(false);
  };

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  const isComingSoon = true;

  const tableData = [];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(tableData.map((item) => item.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleRowSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;
      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

  const handleShowDots = (event, index) => {
    setShowDots((prev) => (prev === index ? null : index));

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
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
        type: "CUSTOMIZE_COLUMNS_BOOKING_SAGA",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customize: payload,
        },
      });
      setCustomizeLoading(true);
    }
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

  const currentPage = bookingList?.currentPage ?? 1;

  const totalPages = bookingList?.totalPage ?? 1;

  const totalRecords = bookingList?.totalBookings ?? 0;

  // useEffect(() => {
  //   setPage(1);
  // }, [state.reports?.tenantFilters]);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!state.login.selectedHostel_Id) return;
    dispatch({
      type: "GET_BOOKING_LIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        name: filterInput || "",
        page: page,
        size: size,
        // period: selectedMonth?.value,
      },
    });
    dispatch({
      type: "SET_BOOKING_FILTERS",
      payload: {
        search: filterInput,
      },
    });

    setLoading(true);
  }, [page, size, filterInput]);

  const handleReset = () => {
    dispatch({
      type: "SET_BOOKING_FILTERS",
      payload: {
        period: [],
        search: "",
        floor: [],
        room: [],
        minPaidAmount: "",
        maxPaidAmount: "",
        paymentMode: [],
      },
    });
    dispatch({
      type: "GET_BOOKING_LIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        page: page,
        size: size,
      },
    });

    setChips([]);
    setFilterInput("");
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_BOOKING_FILTERS",
        payload: {
          period: [],
          search: "",
          floor: [],
          room: [],
          minPaidAmount: "",
          maxPaidAmount: "",
          paymentMode: [],
        },
      });
    };
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    setPage(0);
  }, [state.Booking?.bookingFilters]);

  useEffect(() => {
    const filters = state.Booking?.bookingFilters;
    const filterData = [];

    if (filters?.period?.length) {
      filterData.push({
        key: "period",
        label: "Period",
        type: "single",
        value: filters.period,
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

    if (filters?.minPaidAmount) {
      filterData.push({
        key: "minPaidAmount",
        label: "Min Paid",
        type: "text",
        value: `₹ ${filters.minPaidAmount}`,
      });
    }

    if (filters?.maxPaidAmount) {
      filterData.push({
        key: "maxPaidAmount",
        label: "Max Paid",
        type: "text",
        value: `₹ ${filters.maxPaidAmount}`,
      });
    }

    if (filters?.paymentMode?.length) {
      filterData.push({
        key: "paymentMode",
        label: "Payment Mode",
        type: "single",
        value: filters.paymentMode,
      });
    }

    setChips(filterData);
  }, [state.Booking?.bookingFilters]);
  useEffect(() => {
    if (state?.Booking?.applyinvoiceSuccessCode === 201) {
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });

      dispatch({ type: "REMOVE_APPLY_INVOICE_REDUCER" });
    }
  }, [state?.Booking?.applyinvoiceSuccessCode]);

  useEffect(() => {
    if (state.Booking?.successBookingCustomizeColumns === 200) {
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          page: page,
          size: size,
        },
      });
      setOpen(false);
      setCustomizeLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_CUSTOMIZE_COLUMNS_BOOKING_REDUCER" });
      }, 100);
    }
  }, [state.Booking?.successBookingCustomizeColumns]);

  // console.log("state.Booking", state.Booking?.successBookingCustomizeColumns);
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
  const handleNavigatePdf = (invoiceId) => {
    if (invoiceId) {
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: invoiceId,
        },
      });
      navigate(`/retainer-invoice/details/${invoiceId}`, {
        state: {
          rowData: invoiceId,
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
          isBookingWay: true,
        },
      });
    }
  };
  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
      dispatch({ type: "CLEAR_NETWORK_ERROR" });
    }
  }, [state.createAccount?.networkError]);

  const statusStyles = {
    Redeemed: {
      bg: "#EFFFF2",
      text: "#038C3D",
    },

    "Partially Redeemed": {
      bg: "#FFF4E5",
      text: "#F59E0B",
    },
  };

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
      label: "Advance",
      value: "0",
    },
    {
      label: "Rent",
      value: "0",
    },
    {
      label: "EB",
      value: "0",
    },
    {
      label: "General",
      value: "0",
      icon: false,
    },
  ];

  return (
    <div className="relative bg-white font-gilroy  mr-2 ">
      <div className="sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <label className="text-lg text-black font-semibold font-gilroy">
          Retainer Invoice
        </label>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[200px] max-w-[260px] z-[3000]">
            <div className="flex items-center h-10 border border-[#CFD5DB] rounded-xl bg-white">
              <input
                type="text"
                placeholder="Search"
                value={filterInput}
                onChange={handlefilterInput}
                // disabled
                className="flex-1 h-full px-2 text-sm font-gilroy
                     outline-none border-none focus:ring-0  rounded-xl"
              />
              <span className="px-2 flex items-center">
                <SearchNormal1
                  className={`h-5 w-5 transition-opacity duration-300 text-gray-500
              ${
                canReadInvoice
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-40 pointer-events-none"
              }`}
                />
              </span>
            </div>
          </div>
          <div>
            <button
              disabled={!canUpdateInvoice}
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
        <PermissionDeniedMessage />
      ) : (
        <>
          <div className="w-full my-2 bg-[#F9F9F9] rounded-xl px-4 sm:px-6 py-3 flex flex-wrap items-center gap-4 sm:gap-6 md:gap-10 font-gilroy">
            {stats.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
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

          <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-50  bg-white h-[50px]">
            <div className="flex flex-wrap items-center gap-3">
              {/* <div className="w-[150px]">
              <Select
                menuPlacement="auto"
                isDisabled={isComingSoon}
                options={selectOptions}
                styles={CustomStyles}
                disabled={!canReadInvoice}
                onChange={(e) => handleStatusFilter(e)}
                value={statusfilter}
                aria-label="Select"
                id="statusselect"
              />
            </div> */}

              <Select
                menuPlacement="auto"
                isDisabled={isComingSoon}
                options={monthOptions}
                value={selectedMonth}
                onChange={handleMonthChange}
                styles={CustomStyles}
                classNamePrefix="custom"
                noOptionsMessage={() => "No options"}
              />

              <button
                onClick={() => canReadInvoice && handleShowFilterBills()}
                disabled={!canReadInvoice}
                className={`border border-slate-300 rounded-full p-2
            ${canReadInvoice ? "cursor-not-allowed" : "opacity-40 cursor-not-allowed"}`}
              >
                <Filter size={18} />
              </button>
            </div>

            <div className="flex  items-center gap-3">
              <Setting3
                onClick={() => setOpen(!open)}
                className="cursor-pointer"
                size="22"
                color="#4B4B4B"
              />

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
          <div className="">
            <div>
              <div>
                {chips.length > 0 && (
                  <div className="px-3 py-3 bg-[#F9FAFB] rounded-lg h-fit py-0 flex flex-col my-2 ">
                    <div className=" p-3 flex items-start gap-3 rounded-[10px] bg-[#FFFFFF] border border-[#E5E7EB] font-[Gilroy,sans-serif]">
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
                  </div>
                )}
                {formattedData?.length > 0 ? (
                  <div className="bg-white  rounded-xl shadow-sm border border-[#E8E8E8] ">
                    <div
                      id="tableContainer"
                      ref={tableContainerRef}
                      className="overflow-auto relative h-[calc(100vh-140px)] rounded-xl show-scrolls"
                    >
                      <table className="w-full  font-gilroy">
                        <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                          <tr className="h-9">
                            {/* <th className="px-4 py-2.5 sticky left-0 z-30 bg-[#F9FAFB] w-[80px]">
                          <input
                            disabled
                            type="checkbox"
                            checked={
                              selectedRows.length === tableData.length &&
                              tableData.length > 0
                            }
                            onChange={handleSelectAll}
                          />
                        </th> */}

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

                            <th className=" px-2 sticky right-0 z-50 bg-[#F9FAFB] text-center">
                              Action
                            </th>
                          </tr>
                        </thead>

                        <tbody>
                          {formattedData?.length > 0 ? (
                            formattedData?.map((item, index) => (
                              <tr
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavigatePdf(item?.apiCall?.invoiceId);
                                }}
                                key={item?.apiCall?.invoiceId}
                                className="text-xs font-gilroy border-b border-[#E8E8E8] h-10 
                                    cursor-pointer group  hover:!bg-gray-50"
                              >
                                {/* <td className="px-4 py-2.5 sticky left-0 hover:!bg-gray-50 group-hover:!bg-gray-50 z-40 w-[80px]">
                              <input
                                disabled
                                type="checkbox"
                                // checked={selectedRows.includes(item.id)}
                                // onChange={() => handleRowSelect(item.id)}
                              />
                            </td> */}

                                {selectedColumns?.map((col, index) => {
                                  const baseClass = `
  ${columnStyles[col.fieldName] || "px-4"}
  hover:!bg-gray-50 group-hover:!bg-gray-50 whitespace-nowrap text-[14px]
`;

                                  let stickyClass = "";

                                  if (index === 0) {
                                    stickyClass = `sticky left-[0px] z-30  w-[80px] ${
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
                                          {typeof item?.profilePic ===
                                            "string" &&
                                          item.profilePic.startsWith("http") ? (
                                            <img
                                              src={item.profilePic}
                                              className="w-8 h-8 rounded-full"
                                              alt="profile"
                                            />
                                          ) : (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                                              {typeof item?.profilePic ===
                                              "string"
                                                ? item.profilePic
                                                : "NA"}
                                            </div>
                                          )}
                                        </td>
                                      );

                                    case "Tenant Name":
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          <div
                                            className="relative group w-[100px] "
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleNavigateTenantProfile(
                                                item?.apiCall,
                                              );
                                            }}
                                          >
                                            <span className="block w-full truncate text-sm text-[#1E45E1] font-semibold ">
                                              {item.tenantName}
                                            </span>

                                            <div
                                              className="absolute left-full ml-2 top-1/2 -translate-y-1/2
        hidden group-hover:!block
       bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap
        z-[9999] pointer-events-none"
                                            >
                                              {item?.tenantName}
                                            </div>
                                          </div>
                                        </td>
                                      );

                                    case "Inv No":
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          <div className="relative group w-[100px] ">
                                            <span className="block w-full truncate text-sm text-[#1E45E1] font-semibold ">
                                              {item.invNo}
                                            </span>
                                          </div>
                                        </td>
                                      );

                                    case "Booking Date":
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          <div className="relative group w-[100px] ">
                                            <span className="block w-full truncate text-sm text-[#111928] ">
                                              {item.bookingDate}
                                            </span>
                                          </div>
                                        </td>
                                      );

                                    case "Joining Date":
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          <div className="relative group w-[100px] ">
                                            <span className="block w-full truncate text-sm text-[#111928] ">
                                              {item.joiningDate}
                                            </span>
                                          </div>
                                        </td>
                                      );

                                    case "Mobile No":
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          {item.mobile}
                                        </td>
                                      );

                                    case "Floor Name":
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          {item.floorName}
                                        </td>
                                      );

                                    case "Room Name":
                                      return (
                                        <td
                                          key={col.key}
                                          className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                        >
                                          {item.roomName}
                                        </td>
                                      );

                                    case "Bed Name":
                                      return (
                                        <td
                                          key={col.key}
                                          className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                        >
                                          {item.bedName}
                                        </td>
                                      );
                                    case "Amount":
                                      return (
                                        <td
                                          key={col.fieldName}
                                          className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                        >
                                          {item.amount}
                                        </td>
                                      );
                                    case "Status":
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          <span
                                            className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-0.5 text-xs text-[#222222]"
                                            style={{
                                              backgroundColor:
                                                statusStyles[item.status]?.bg ||
                                                "#EEE",
                                            }}
                                          >
                                            <span
                                              className="h-2 w-2 rounded-full"
                                              style={{
                                                backgroundColor:
                                                  statusStyles[item.status]
                                                    ?.text || "#333",
                                              }}
                                            ></span>

                                            {item.status}
                                          </span>
                                        </td>
                                      );

                                    case "Available Amount":
                                      return (
                                        <td
                                          key={col.key}
                                          className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                        >
                                          {item.availableAmount}
                                        </td>
                                      );

                                    default:
                                      return (
                                        <td
                                          key={col.key}
                                          className={finalClass}
                                        >
                                          {typeof item[
                                            headerKeyMap[col.fieldName]
                                          ] === "object"
                                            ? "-"
                                            : (item[
                                                headerKeyMap[col.fieldName]
                                              ] ?? "-")}
                                        </td>
                                      );
                                  }
                                })}

                                <td
                                  className={`${
                                    isScrolling ? "!bg-white" : "bg-white"
                                  } px-4 py-1 sticky right-0 !z-30 hover:!bg-gray-50 group-hover:!bg-gray-50 text-[#111928]`}
                                >
                                  <div className="cursor-pointer flex justify-center items-center relative  align-middle ">
                                    <PiDotsThreeOutlineVerticalFill
                                      className={`h-5 w-5 rotate-90 ${showDots === index ? "text-[#1E45E1]" : "text-gray-500"}`}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleShowDots(e, index);
                                      }}
                                    />
                                    {showDots === index && (
                                      <div
                                        ref={popupRef}
                                        className="  rounded-[10px] border  border-[#EBEBEB] bg-[#F9F9F9] px-2  max-w-[200px] shadow-md z-[9999]"
                                        style={{
                                          top: showAbove
                                            ? popupPosition.top -
                                              (popupRef.current?.offsetHeight ||
                                                120) -
                                              10
                                            : popupPosition.top + 5,
                                          left: popupPosition.left - 40,
                                          position: "fixed",
                                          zIndex: 1000,
                                        }}
                                      >
                                        <button
                                          disabled={
                                            !canUpdateInvoice ||
                                            !item.apiCall?.canApply
                                          }
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleApplyInvoices(item?.apiCall);
                                          }}
                                          className={`flex items-center gap-2 px-3 py-2  my-2 border-b border-[#EBEBEB] rounded-[10px] transition-all duration-150
      ${
        !canUpdateInvoice || !item.apiCall?.canApply
          ? "cursor-not-allowed opacity-50 bg-gray-100"
          : "cursor-pointer hover:bg-[#EDF2FF]"
      }`}
                                        >
                                          <Link21
                                            color={
                                              !canUpdateInvoice ||
                                              !item.apiCall?.canApply
                                                ? "#A9A9A9"
                                                : "#1E45E1"
                                            }
                                            size="16"
                                          />

                                          <span
                                            className={`text-sm font-medium ${
                                              !canUpdateInvoice ||
                                              !item.apiCall?.canApply
                                                ? "text-[#A9A9A9]"
                                                : "text-[#222222]"
                                            }`}
                                          >
                                            Apply Invoices
                                          </span>
                                        </button>
                                        <button
                                          disabled={
                                            !canUpdateInvoice ||
                                            !item.apiCall?.canApply
                                          }
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleApplyInvoicesRetainer(
                                              item?.apiCall,
                                            );
                                          }}
                                          className={`flex items-center gap-2 my-2 px-3 py-2 border-b border-[#EBEBEB] rounded-[10px] transition-all duration-150
      ${
        !canUpdateInvoice || !item.apiCall?.canApply
          ? "cursor-not-allowed opacity-50 bg-gray-100"
          : "cursor-pointer hover:bg-[#EDF2FF]"
      }`}
                                        >
                                          <Link21
                                            color={
                                              !canUpdateInvoice ||
                                              !item.apiCall?.canApply
                                                ? "#A9A9A9"
                                                : "#1E45E1"
                                            }
                                            size="16"
                                          />

                                          <span
                                            className={`text-sm font-medium ${
                                              !canUpdateInvoice ||
                                              !item.apiCall?.canApply
                                                ? "text-[#A9A9A9]"
                                                : "text-[#222222]"
                                            }`}
                                          >
                                            Apply to Invoices
                                          </span>
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td
                                colSpan={12}
                                className="text-center align-middle  h-40 text-sm text-red-800 font-semibold"
                              >
                                No Data Found
                              </td>
                            </tr>
                          )}
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
                            <div className="relative">
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
                                      {allSelected
                                        ? "Unselect all"
                                        : "Select all"}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2 px-3 py-2 border rounded-lg">
                                  <SearchNormal1 size={16} color="#98A2B3" />
                                  <input
                                    value={searchText}
                                    onChange={(e) =>
                                      setSearchText(e.target.value)
                                    }
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
                                      arrayMove(
                                        customizeItems,
                                        oldIndex,
                                        newIndex,
                                      ),
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
                                        <SortableItem
                                          key={item.key}
                                          item={item}
                                        />
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
                                className="flex-1 py-2 text-sm border rounded-lg text-[#344054]"
                              >
                                Reset
                              </button>
                              <button
                                onClick={handleSave}
                                disabled={customizeLoading}
                                className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg disabled:opacity-70"
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
                  <NoDataMessage
                    label="Bookings"
                    isSearching={isSearching}
                    isClearSearch={true}
                    handleClear={() => {
                      setFilterInput("");
                    }}
                  />
                )}
              </div>
              {showBookingPdf && (
                <div className="col-span-8 border-l border-gray-300">
                  <BookingInvoice />
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {loading && (
        <div className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-75">
          <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent"></div>
        </div>
      )}
      {applyInvoice && (
        <ApplyBookingModal
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
          advanceDetails={advanceDetails}
        />
      )}

      {applyInvoiceRetainer && (
        <RetainerApplyInvoice
          show={applyInvoiceRetainer}
          handleClose={handleCloseApplyInvoicesRetainer}
          advanceDetails={advanceDetails}
        />
      )}

      {showBillsFilter && (
        <BookingsFilter
          show={showBillsFilter}
          handleClose={handleCloseFilterBills}
          size={size}
        />
      )}
    </div>
  );
}

export default Booking;

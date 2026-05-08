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
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ApplyBookingModal from "./ApplyInvoices";
import ComingSoon from "../../Utils/ComingSoon";
import { useNavigate } from "react-router-dom";
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
} from "iconsax-react";
import ApiPagination from "../../Components/ApiPagination";
import BookingsFilter from "./BookingsFilter";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

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
  const {
    canWriteModule: canWriteBooking,
    canReadModule: canReadBooking,
    // canUpdateModule: canUpdateInvoice,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Booking");

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 1000);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (!canReadBooking) {
      setLoading(false);
    }
  }, [canReadBooking]);

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
    const cols =
      // state?.UsersList?.Users?.columnList ||
      [];

    const formatted = cols.map((col) => ({
      ...col,
      key: col.fieldName,
      selected: col.selected,
    }));

    setCustomizeItems(formatted);
    setInitialCustomizeItems(formatted);
  }, [state?.UsersList?.Users?.columnList]);

  const selectedColumns = (customizeItems || []).filter((col) => col.selected);
  const allSelected =
    Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);

  const headerKeyMap = {
    "Profile Pic": "profilePic",
    "Full Name": "fullName",
    Status: "status",
    "Joining Date": "joiningDate",
    "Mobile No": "mobile",
    Floor: "floorName",
    Room: "roomName",
    Bed: "bedName",
    "Email ID": "emailId",
    "Booking Date": "bookingDate",
    "Monthly Rent": "monthlyRent",
    Advance: "advanceAmount",
    "Booking Amount": "bookingAmount",
  };

  // const formattedData = (userListDetail?.tenants || []).map((row) => {
  //   const obj = {};

  //   (userListDetail?.tableHeaders || []).forEach((header, index) => {
  //     const key = headerKeyMap[header];
  //     const value = row[index];

  //     if (key) {
  //       obj[key] = value ?? "-";
  //     }
  //   });

  //   const apiData = row[row.length - 1];

  //   obj.apiCall = {
  //     customerId: apiData?.customerId || null,
  //     status: apiData?.status || null,
  //   };

  //   return obj;
  // });

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
  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  const isComingSoon =
    import.meta.env.MODE === "production" || import.meta.env.MODE === "qa";

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
      // dispatch({
      //   type: "CUSTOMIZE_TENANT_COLUMNS_SAGA",
      //   payload: {
      //     hostelId: state.login.selectedHostel_Id,
      //     customize: payload,
      //   },
      // });
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

  const totalRecords = bookingList?.totalNoOfInvoices ?? 0;

  useEffect(() => {
    setPage(1);
  }, [state.reports?.tenantFilters]);

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
    const statusValue = statusfilter === "ALL" ? "" : statusfilter;

    if (!state.login.selectedHostel_Id) return;
    dispatch({
      type: "GET_BOOKING_LIST",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        // name: debouncedInput || "",
        // type: statusValue,
        page: page,
        size: size,
        // period: selectedMonth?.value,
      },
    });

    setLoading(true);

    // const filters = {
    //   status: statusfilter ? [statusfilter] : [],
    //   search: debouncedInput?.trim() || "",
    //   period: selectedMonth?.value ? selectedMonth?.value : "",
    //   periodLabel: selectedMonth?.label ? selectedMonth?.label : "",
    // };

    // dispatch({
    //   type: "SET_TENANT_TABLE_FILTERS",
    //   payload: filters,
    // });
  }, [page, size]);

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

  const handleNavigatePdf = (invoiceId) => {
    if (invoiceId) {
      dispatch({
        type: "GETPARTICULARBILLSDETAILS",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          invoiceId: invoiceId,
        },
      });
      navigate(`/booking/details/${invoiceId}`, {
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

  console.log("state", state);

  return (
    <div className=" bg-white font-gilroy  mr-2 ">
      {loading && (
        <div className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center -translate-x-1/2 -translate-y-1/2 bg-transparent opacity-75">
          <div className="h-10 w-10 animate-spin rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent"></div>
        </div>
      )}
      <div className="">
        <div className="sticky top-0 bg-white z-50  min-h-[60px] sm:min-h-[60px] flex flex-wrap items-center justify-between gap-2 shrink-0">
          <label className="text-lg text-black font-semibold font-gilroy">
            Booking
          </label>

          <div className="flex items-center gap-2">
            <div className="relative min-w-[200px] max-w-[260px] z-[3000]">
              <div className="flex items-center h-10 border border-[#CFD5DB] rounded-xl bg-white">
                <input
                  type="text"
                  placeholder="Search"
                  value={filterInput}
                  onChange={handlefilterInput}
                  disabled={isComingSoon}
                  className="flex-1 h-full px-2 text-sm font-gilroy
                     outline-none border-none focus:ring-0  rounded-xl"
                />
                <span className="px-2 flex items-center">
                  <SearchNormal1
                    className={`h-5 w-5 transition-opacity duration-300 text-gray-500
              ${
                canReadBooking
                  ? "cursor-pointer opacity-100"
                  : "cursor-not-allowed opacity-40 pointer-events-none"
              }`}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-50  bg-white h-[50px]">
          <div className="flex flex-wrap items-center gap-3">
            {/* <div className="w-[150px]">
              <Select
                menuPlacement="auto"
                isDisabled={isComingSoon}
                options={selectOptions}
                styles={CustomStyles}
                disabled={!canReadBooking}
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
              onClick={() => canReadBooking && handleShowFilterBills()}
              disabled={!canReadBooking}
              className={`border border-slate-300 rounded-full p-2
            ${canReadBooking ? "" : "opacity-40 cursor-not-allowed"}`}
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

            {bookingList?.advanceInvoiceList?.length > 0 && (
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
      </div>

      <div className="">
        {!canReadBooking ? (
          <div className="h-full flex flex-col items-center justify-center">
            <img src={EmptyState} alt="Empty" className="max-w-full h-auto" />
            <ErrorMessage
              message={["You do not have access to view Booking"]}
              type="warning"
            />
          </div>
        ) : (
          <div>
            <div>
              {isComingSoon ? (
                <ComingSoon />
              ) : (
                <div className="bg-white  rounded-xl shadow-sm border border-[#E8E8E8] ">
                  <div
                    id="tableContainer"
                    ref={tableContainerRef}
                    className="overflow-auto relative h-[calc(100vh-140px)] rounded-xl show-scrolls"
                  >
                    <table className="w-full  font-gilroy">
                      <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                        <tr className="h-9">
                          <th className="px-4 py-2.5 sticky left-0 z-30 bg-[#F9FAFB] w-[80px]">
                            <input
                              disabled
                              type="checkbox"
                              checked={
                                selectedRows.length === tableData.length &&
                                tableData.length > 0
                              }
                              onChange={handleSelectAll}
                            />
                          </th>

                          <th className=" px-2">INV NO</th>
                          <th className=" px-2">Booking date</th>
                          <th className=" px-2">Tenant NamE</th>
                          <th className=" px-2">Mobile No</th>
                          <th className=" px-2">Floor</th>
                          <th className=" px-2">Room</th>
                          <th className=" px-2">Bed</th>
                          <th className=" px-2">Amount</th>
                          <th className="px-2">Status</th>
                          <th className=" px-2 sticky right-0 z-50 bg-[#F9FAFB] text-center">
                            Action
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {bookingList?.advanceInvoiceList?.length > 0 ? (
                          bookingList?.advanceInvoiceList?.map(
                            (item, index) => (
                              <tr
                                onClick={() =>
                                  handleNavigatePdf(item.invoiceId)
                                }
                                key={item.invoiceId}
                                className="text-xs font-gilroy border-b border-[#E8E8E8] h-10 
                                    cursor-pointer group  hover:!bg-gray-50"
                              >
                                <td className="px-4 py-2.5 sticky left-0 hover:!bg-gray-50 group-hover:!bg-gray-50 z-40 w-[80px]">
                                  <input
                                    disabled
                                    type="checkbox"
                                    checked={selectedRows.includes(item.id)}
                                    onChange={() => handleRowSelect(item.id)}
                                  />
                                </td>

                                <td className="w-[230px] px-2 py-2.5 text-[#1E45E1] font-semibold hover:underline">
                                  {item.invoiceNumber}
                                </td>
                                <td className="w-[250px] px-2 py-2.5 text-[#222222] text-center">
                                  {item.bookingDate || "-"}
                                </td>
                                <td className="w-[230px] px-2 py-2.5 text-gray-900 font-semibold">
                                  <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#E2E8F0] flex items-center justify-center text-gray-700 font-semibold shrink-0">
                                      {item?.profilePic ? (
                                        <img
                                          src={item.profilePic}
                                          alt="profile"
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        item?.initials || "NA"
                                      )}
                                    </div>

                                    <div
                                      className="text-sm font-semibold text-[#1E45E1] hover:underline whitespace-nowrap"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleNavigateTenantProfile(item);
                                      }}
                                    >
                                      {item.fullName}
                                    </div>
                                  </div>
                                </td>
                                <td className="w-[230px] px-2 py-2.5 text-gray-900 font-semibold">
                                  {item.mobileNumber}
                                </td>
                                <td className="w-[230px] px-2 py-2.5">
                                  {item.floorName}
                                </td>
                                <td className="w-[230px] px-2 py-2.5">
                                  {item.roomName}
                                </td>
                                <td className="w-[230px] px-2 py-2.5">
                                  {item.bedName}
                                </td>
                                <td className="w-[230px] px-2 py-2.5">
                                  ₹ {item.availableAmount}
                                </td>

                                <td className="w-[270px] px-2 py-2.5">
                                  <span
                                    className={`px-2 py-1 text-xs inline-flex items-center gap-2 
                                      whitespace-nowrap rounded-lg bg-green-100 text-black `}
                                  >
                                    <span className="h-2 w-2 rounded-full bg-green-600 "></span>
                                    Paid
                                  </span>
                                </td>

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
                                        className="fixed w-[170px] bg-[#F9F9F9] border border-[#EBEBEB] rounded-[10px] flex flex-col z-[9999]]"
                                        style={{
                                          top: showAbove
                                            ? popupPosition.top -
                                              (popupRef.current?.offsetHeight ||
                                                100) -
                                              20
                                            : popupPosition.top,
                                          left: popupPosition.left,
                                        }}
                                      >
                                        <button
                                          disabled={!canWriteBooking}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleApplyInvoices(item);
                                          }}
                                          className={`flex items-center gap-2 px-3 py-2 border-b border-[#EBEBEB] rounded-[10px]
    ${
      !canWriteBooking
        ? "cursor-not-allowed opacity-50 bg-gray-100"
        : "cursor-pointer hover:bg-[#EDF2FF]"
    }`}
                                        >
                                          <Link21
                                            color={`${canWriteBooking ? "#1E45E1" : "#A9A9A9"}`}
                                            size="16"
                                          />
                                          <span
                                            className={` text-sm font-medium text-[#222] ${
                                              !canWriteBooking
                                                ? "cursor-not-allowed opacity-50 bg-gray-100"
                                                : "cursor-pointer hover:bg-[#EDF2FF]"
                                            }`}
                                          >
                                            Apply Invoices
                                          </span>
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ),
                          )
                        ) : (
                          <tr>
                            <td
                              colSpan={12}
                              className="text-center align-middle h-40 text-sm text-red-800 font-semibold"
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
                            {customizeLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-transparent z-[9999]">
                                <div className="w-[40px] h-[40px] rounded-full border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent animate-spin" />
                              </div>
                            )}
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
                              className="flex-1 py-2 text-sm bg-[#1E45E1] text-white rounded-lg"
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
            {showBookingPdf && (
              <div className="col-span-8 border-l border-gray-300">
                <BookingInvoice />
              </div>
            )}
          </div>
        )}
      </div>

      {applyInvoice && (
        <ApplyBookingModal
          show={applyInvoice}
          handleClose={handleCloseApplyInvoices}
          advanceDetails={advanceDetails}
        />
      )}

      {showBillsFilter && (
        <BookingsFilter
          show={showBillsFilter}
          handleClose={handleCloseFilterBills}
        />
      )}
    </div>
  );
}

export default Booking;

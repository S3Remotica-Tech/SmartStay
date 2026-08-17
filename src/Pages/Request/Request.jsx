/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import { TiTick } from "react-icons/ti";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  CloseCircle,
  SearchNormal1,
  ArrowDown,
  Filter,
  Setting3,
  ArrowDown2,
  Chart21,
  Edit2,
  Trash,
  TickCircle,
  MinusCirlce,
} from "iconsax-react";
import { toast } from "react-toastify";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { useLocation } from "react-router-dom";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useNavigate } from "react-router-dom";
import ApiPagination from "../../Components/ApiPagination";
import Approve from "./Approve";
import Deny from "./Deny";
import BedChangeRequestOverview from "./BedChangeRequestOverview";
import { triggerPG } from "../../Redux/Action/LoginAction";

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

function Request() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("current");
  const [loading, setLoading] = useState(false);
  const [statusfilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [chips, setChips] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [showAssignAmenity, setShowAssignAmenity] = useState(false);
  const [showDeny, setShowDeny] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  // const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [showBedChangeOverview, setShowBedChangeOverview] = useState(false);
  const popupRef = useRef(null);

  const tableContainerRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  const listRef = useRef(null);
  const {
    canWriteModule: canWriteComplaints,
    canReadModule: canReadComplaints,
    canDeleteModule: canDeleteComplaints,
    canUpdateModule: canUpdateComplaints,
  } = useHasPermission("Complaints");

  const handleCloseAssignAmenity = () => {
    setShowAssignAmenity(false);
  };

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
  };

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding vendor information.", {
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

  const handleShowDots = (id, event) => {
    setActiveRow((prev) => (prev === id ? null : id));
    // setSearch(false);

    const rect = event.currentTarget.getBoundingClientRect();

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

  const customizeItems = [
    { fieldName: "Request Type", selected: true },
    { fieldName: "Description", selected: true },
    { fieldName: "Raised On", selected: true },
    { fieldName: "Raised By", selected: true },
    { fieldName: "Status", selected: true },
    { fieldName: "Stay Area", selected: true },
  ];

  const filteredCustomizeItems = customizeItems.filter((item) =>
    item.fieldName.toLowerCase().includes(searchText.toLowerCase()),
  );

  const selectedColumns = (customizeItems || []).filter((col) => col.selected);

  const allSelected =
    Array.isArray(customizeItems) && customizeItems.every((i) => i.selected);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (popupRef.current) {
      const popupHeight = popupRef.current.offsetHeight;
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - popupPosition.top;

      setShowAbove(spaceBelow < popupHeight + 20);
    }
  }, [popupPosition]);

  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideAccount);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, []);

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

  const statusStyles = {
    New: {
      bg: "#EFF8FF",
      text: "#0096FF",
    },
    "Not Assigned": {
      bg: "#E7F1FFB2",
      text: "#1E45E1",
    },
    "Re-opened": {
      bg: "#FFEDCA99",
      text: "#FF9900",
    },
  };

  const headerKeyMap = {
    "Request Type": "requestType",
    Description: "description",
    "Raised by": "raisedBy",
    Status: "status",
    "Raised on": "raisedOn",
    Room: "room",
    Floor: "floor",
    Bed: "bed",
    "Stay Area": "stayArea",
  };

  const columnStyles = {
    "Request Type": "px-4 whitespace-nowrap",
    Description: "px-4 whitespace-nowrap",
    "Raised by": "px-4 whitespace-nowrap",
    Status: "px-4 whitespace-nowrap",
    "Raised on": "px-4 whitespace-nowrap",
    room: "px-4 whitespace-nowrap",
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

  const data = [
    {
      requestType: "Bed Change",
      description: "change to bed",
      raisedBy: "Mathu",
      status: "New",
      raisedOn: "12/08/2026",
      room: "A-101",
      floor: "Second Floor",
      bed: "B1",
    },
    {
      requestType: "Amenity",
      description: "Assign to amenity",
      raisedBy: "Prem",
      status: "Not Assigned",
      raisedOn: "12/08/2026",
      room: "A-101",
      floor: "Second Floor",
      bed: "B2",
    },
    {
      requestType: "Amenity",
      description: "Assign to amenity",
      raisedBy: "Prem",
      status: "Re-opened",
      raisedOn: "12/08/2026",
      room: "A-101",
      floor: "Second Floor",
      bed: "B2",
    },
  ];

  const formattedData = data;

  // console.log("formattedData", formattedData);

  const stats = [
    {
      label: "New Requests",
      value: 0,
      highlight: true,
      icon: true,
    },
    {
      label: "Active / In Use",
      value: `₹ 0`,
    },
    {
      label: "In Progress",
      value: `₹ 0`,
    },
  ];

  const handleApprove = () => {
    setShowAssignAmenity(true);
    setActiveRow(null);
  };

  const handleDeny = () => {
    setShowDeny(true);
    setActiveRow(null);
  };

  const handleCloseDeny = () => {
    setShowDeny(false);
  };

  const handleBedChangeOverview = () => {
    setShowBedChangeOverview(true);
  };

  const handleCloseBedChangeOverview = () => {
    setShowBedChangeOverview(false);
  };

  const handleCheckAvailability = () => {
    //  dispatch({
    //   type: "CUSTOMERDETAILS",
    //   payload: { customerId: customer?.tenetId },
    // });
    navigate(`/change-bed/${state.login?.selectedHostel_Id}`);
    dispatch(triggerPG(true));
  };

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="sticky top-0 z-10 bg-white p-2 flex justify-between items-center flex-wrap  font-gilroy min-h-[60px] sm:min-h-[60px]">
          <div>
            <label className="text-[18px] font-semibold font-gilroy text-black">
              Request
            </label>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="relative min-w-[180px] max-w-[260px]">
              <div
                className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
      ${
        canReadComplaints
          ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
          : "border-gray-200 opacity-60 cursor-not-allowed"
      }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  disabled={!canReadComplaints}
                  className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] "
                />
                <SearchNormal1
                  size="18"
                  color={canReadComplaints ? "#6B7280" : "#A0A0A0"}
                  className="mr-2"
                />
              </div>
            </div>

            <div>
              <button
                disabled={!canWriteComplaints}
                onClick={handleShow}
                className="bg-[#1E45E1] hover:bg-[#1E45E1] text-white text-[14px] font-semibold
               rounded-md px-4 py-2  whitespace-nowrap font-gilroy
               disabled:opacity-50 disabled:cursor-not-allowed "
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {!canReadComplaints ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <div className="relative flex flex-col flex-1 min-h-0">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-transparent z-[9999]">
                <div className="w-[40px] h-[40px] rounded-full border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent animate-spin" />
              </div>
            )}

            {/* {chips?.length > 0 && (
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
          )} */}

            <div
              className="w-full my-2 bg-[#F9F9F9] rounded-xl px-4 sm:px-6 py-3 
                        flex flex-wrap items-center gap-12 sm:gap-12 md:gap-12 font-gilroy"
            >
              {stats.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  {item.highlight && (
                    <div className="w-10 h-10 rounded-full bg-[#F3E4D0] flex items-center justify-center text-[#FF9500] font-semibold">
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
                      {item.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex ">
                <button
                  onClick={() => setActiveTab("current")}
                  className={`px-6 py-3 text-sm font-medium transition-all ${
                    activeTab === "current"
                      ? "border-b-2 border-[#1E45E1] text-[#1E45E1]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Current
                </button>

                <button
                  onClick={() => setActiveTab("completed")}
                  className={`px-6 py-3 text-sm font-medium transition-all ${
                    activeTab === "completed"
                      ? "border-b-2 border-[#1E45E1] text-[#1E45E1]"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Completed
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-40  bg-white h-[40px]">
                <div className="flex flex-wrap items-center gap-3">
                  <div
                    className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
                  >
                    <Filter
                      size={16}
                      onClick={() => {
                        if (canReadComplaints) {
                          setIsFilterOpen(true);
                        }
                      }}
                      className={`transition-opacity duration-300 ${
                        canReadComplaints
                          ? "cursor-pointer opacity-100 pointer-events-auto"
                          : "cursor-not-allowed opacity-40 pointer-events-none"
                      }`}
                    />
                  </div>
                  <div
                    className={`border border-gray-300 rounded-lg w-36 ${
                      statusfilter ? "bg-gray-100 text-gray-700" : "bg-white"
                    }`}
                  >
                    <Select
                      styles={CustomStyles}
                      isDisabled={!canReadComplaints}
                      menuPlacement="auto"
                      classNamePrefix="custom"
                      id="statusselect"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <Select
                      //   options={paymentStatusOptions}
                      isDisabled={!canReadComplaints}
                      classNamePrefix="custom"
                      menuPlacement="auto"
                      noOptionsMessage={() => "No options"}
                      styles={CustomStyles}
                      id="statusselect"
                    />
                  </div>
                </div>

                <div
                  className={` flex items-center justify-end gap-2 mx-3 mr-2 `}
                >
                  <div>
                    <Setting3
                      onClick={() => setOpen(!open)}
                      className="cursor-pointer"
                      size="22"
                      color="#4B4B4B"
                    />
                  </div>

                  {/* {formattedData?.length > 0 && (
                // <ApiPagination
                //   currentPage={currentPage}
                //   totalPages={totalPages}
                //   totalRecords={totalRecords}
                //   onPageChange={handlePageChange}
                //   onSizeChange={handleSizeChange}
                //   isTenantPagination={true}
                //   size={size}
                // />
              )} */}
                </div>
              </div>
            </div>
            <div className="mt-4">
              {activeTab === "current" && (
                <div>
                  {formattedData?.length > 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3">
                      <div
                        id="tableContainer"
                        ref={tableContainerRef}
                        className="overflow-auto relative h-[calc(100vh-140px)] rounded-xl show-scrolls"
                      >
                        <table className="w-full font-gilroy">
                          <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
                            <tr className="h-9">
                              <th className="sticky left-0 z-40 bg-[#F9FAFB] px-4 py-2.5 text-start uppercase whitespace-nowrap">
                                Request Type
                              </th>
                              <th className="px-4 py-2.5 text-start uppercase whitespace-nowrap">
                                Description
                              </th>
                              <th className="px-4 py-2.5 text-start uppercase whitespace-nowrap">
                                Raised By
                              </th>
                              <th className="px-4 py-2.5 text-start uppercase">
                                Status
                              </th>
                              <th className="px-4 py-2.5 text-start uppercase whitespace-nowrap">
                                Raised On
                              </th>
                              <th className="px-4 py-2.5 text-start uppercase whitespace-nowrap">
                                Stay Area
                              </th>
                              <th className="sticky right-0 z-20 bg-[#F9FAFB] px-4 py-2.5 text-center uppercase">
                                Action
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {data.map((user, index) => (
                              <tr
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (user.requestType === "Bed Change") {
                                    handleBedChangeOverview();
                                  }
                                }}
                                key={index}
                                className="text-sm border-b border-[#E8E8E8] h-10 cursor-pointer group hover:bg-gray-50 "
                              >
                                <td
                                  className={`sticky left-0 px-4   hover:!bg-gray-50 group-hover:!bg-gray-50  ${
                                    isScrolling ? "!bg-white" : "!bg-white"
                                  }`}
                                >
                                  <div className="relative group w-[120px]">
                                    <span className="block truncate whitespace-nowrap ">
                                      {user.requestType}
                                    </span>

                                    <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 hidden group-hover:block bg-gray-500 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-50">
                                      {user.requestType}
                                    </div>
                                  </div>
                                </td>

                                <td className="px-4 whitespace-nowrap">
                                  {user.description}
                                </td>

                                <td className="px-4">
                                  <div className="flex items-center gap-3">
                                    {user.profilePic ? (
                                      <img
                                        src={user.profilePic}
                                        alt={user.raisedBy}
                                        className="w-8 h-8 rounded-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-8 h-8 rounded-full bg-[#E8E8E8] text-[#344054] flex items-center justify-center text-xs font-semibold">
                                        {user.raisedBy
                                          ?.split(" ")
                                          .map((name) => name[0])
                                          .join("")
                                          .toUpperCase()}
                                      </div>
                                    )}

                                    <span className="truncate">
                                      {user.raisedBy}
                                    </span>
                                  </div>
                                </td>
                                <td className="px-4">
                                  <span
                                    className="inline-flex items-center gap-2 rounded-lg px-2 py-0.5 text-xs whitespace-nowrap"
                                    style={{
                                      backgroundColor:
                                        statusStyles[user.status]?.bg || "#EEE",
                                    }}
                                  >
                                    <span
                                      className="h-2 w-2 rounded-full whitespace-nowrap"
                                      style={{
                                        backgroundColor:
                                          statusStyles[user.status]?.text ||
                                          "#333",
                                      }}
                                    />
                                    {user.status}
                                  </span>
                                </td>

                                <td className="px-4">{user.raisedOn}</td>

                                <td className="px-4">
                                  <div className="text-[#111928] text-sm whitespace-nowrap">
                                    {user.floor}
                                  </div>

                                  <span className="text-[#64748B] text-xs whitespace-nowrap">
                                    {user.room} - {user.bed}
                                  </span>
                                </td>

                                <td
                                  className={`sticky  left-0 z-20  hover:!bg-gray-50 group-hover:!bg-gray-50  right-0 px-4 text-center ${
                                    isScrolling ? "!bg-white" : "bg-white"
                                  }`}
                                >
                                  <PiDotsThreeOutlineVerticalFill
                                    className="h-5 w-5 rotate-90 cursor-pointer mx-auto"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleShowDots(index, e);
                                    }}
                                  />

                                  {activeRow === index && (
                                    <div
                                      ref={popupRef}
                                      className="rounded-[10px] border border-[#EBEBEB] bg-[#F9F9F9] p-2 w-fit shadow-md z-[9999] "
                                      style={{
                                        top: showAbove
                                          ? popupPosition.top -
                                            (popupRef.current?.offsetHeight ||
                                              120) -
                                            10
                                          : popupPosition.top + 5,
                                        left: popupPosition.left - 250,
                                        position: "fixed",
                                      }}
                                    >
                                      {user.requestType === "Amenity" && (
                                        <>
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleApprove();
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-green-50 text-[#16A34A]"
                                          >
                                            <TickCircle
                                              size="18"
                                              color="#16A34A"
                                            />
                                            Approve
                                          </button>

                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              handleDeny();
                                            }}
                                            className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-[#EF4444]"
                                          >
                                            <MinusCirlce
                                              size="18"
                                              color="#EF4444"
                                            />
                                            Deny
                                          </button>
                                        </>
                                      )}

                                      {user.requestType === "Bed Change" && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveRow(null);
                                            handleCheckAvailability();
                                          }}
                                          className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-blue-50 text-[#1E45E1]"
                                        >
                                          <SearchNormal1
                                            size="18"
                                            color="#1E45E1"
                                          />
                                          Check Availability
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <NoDataMessage
                      label="Vendor"
                      isSearching={isSearching}
                      isClearSearch={true}
                      handleClear={() => {
                        setSearchQuery("");
                        setCategoryFilter("");
                        setPaymentStatus("");
                        handleReset();
                      }}
                    />
                  )}
                </div>
              )}

              {activeTab === "completed" && (
                <div>
                  <p>Completed Content</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {showAssignAmenity && (
        <Approve
          show={showAssignAmenity}
          handleClose={handleCloseAssignAmenity}
        />
      )}

      {showDeny && <Deny show={showDeny} handleClose={handleCloseDeny} />}

      {showBedChangeOverview && (
        <BedChangeRequestOverview
          show={showBedChangeOverview}
          handleClose={handleCloseBedChangeOverview}
        />
      )}
    </>
  );
}

export default Request;

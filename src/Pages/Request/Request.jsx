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
  const [activeTab, setActiveTab] = useState("new");
  const [loading, setLoading] = useState(false);
  const [statusfilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [chips, setChips] = useState([]);
  const [activeRow, setActiveRow] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [showAbove, setShowAbove] = useState(false);
  const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
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
    "Fully Settled": {
      bg: "#EFFFF2",
      text: "#038C3D",
    },
    "Partially Paid": {
      bg: "#FFF4E5",
      text: "#F79009",
    },
    "Not Paid": {
      bg: "#FEE4E2",
      text: "#D92D20",
    },
    "No Transaction": {
      bg: "#F2F4F7",
      text: "#667085",
    },
  };
  const headerKeyMap = {
    "Request Type": "requestType",
    Description: "description",
    "Raised by": "raisedBy",
    Status: "status",
    "Raised on": "raisedOn",
    ROOM: "room",
  };

  const columnStyles = {
    "Request Type": "px-4 whitespace-nowrap",
    Description: "px-4 whitespace-nowrap",
    "Raised by": "px-4 whitespace-nowrap",
    Status: "px-4 whitespace-nowrap",
    "Raised on": "px-4 whitespace-nowrap",
    ROOM: "px-4 whitespace-nowrap",
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
      requestType: "Maintenance",
      description: "Fan not working",
      raisedBy: "John",
      status: "New",
      raisedOn: "12/08/2026",
      room: "A-101",
    },
  ];
  const formattedData = data?.map((item) => {
    const row = {};

    Object.entries(headerKeyMap).forEach(([header, key]) => {
      row[header] = item[key] ?? "-";
    });

    return row;
  });
  return (
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

          <div className="flex items-center justify-between">
            <div className="flex ">
              <button
                onClick={() => setActiveTab("new")}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === "new"
                    ? "border-b-2 border-[#1E45E1] text-[#1E45E1]"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                New
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
            {activeTab === "new" && (
              <div>
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
                          {Array.isArray(formattedData) &&
                            formattedData?.length > 0 &&
                            formattedData?.map((user, index) => {
                              return (
                                <tr
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    //   setShowOverview(true);
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
                                            {typeof user?.profilePic ===
                                              "string" &&
                                            user.profilePic.startsWith(
                                              "http",
                                            ) ? (
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
                                          <td
                                            key={col.key}
                                            className={finalClass}
                                          >
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

                                      case "Payment Status":
                                        return (
                                          <td
                                            key={col.key}
                                            className={finalClass}
                                          >
                                            <span
                                              className="inline-flex items-center gap-2 whitespace-nowrap rounded-lg px-2 py-0.5 text-xs text-[#222222]"
                                              style={{
                                                backgroundColor:
                                                  statusStyles[
                                                    user.paymentStatus
                                                  ]?.bg || "#EEE",
                                              }}
                                            >
                                              <span
                                                className="h-2 w-2 rounded-full"
                                                style={{
                                                  backgroundColor:
                                                    statusStyles[
                                                      user.paymentStatus
                                                    ]?.text || "#333",
                                                }}
                                              ></span>

                                              {user.paymentStatus}
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
                                          <td
                                            key={col.key}
                                            className={finalClass}
                                          >
                                            {user.mobile}
                                          </td>
                                        );

                                      case "Email ID":
                                        return (
                                          <td
                                            key={col.key}
                                            className={finalClass}
                                          >
                                            {user.email}
                                          </td>
                                        );

                                      case "Vendor Code":
                                        return (
                                          <td
                                            key={col.key}
                                            className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                          >
                                            {user.vendorCode}
                                          </td>
                                        );

                                      case "Vendor Category":
                                        return (
                                          <td
                                            key={col.key}
                                            className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                          >
                                            {user.vendorCategoryName}
                                          </td>
                                        );
                                      case "Credit Limit":
                                        return (
                                          <td
                                            key={col.fieldName}
                                            className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                          >
                                            {user.creditLimit}
                                          </td>
                                        );
                                      case "Credit Period":
                                        return (
                                          <td
                                            key={col.fieldName}
                                            className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                          >
                                            {user.creditPeriod}
                                          </td>
                                        );
                                      case "Outstanding":
                                        return (
                                          <td
                                            key={col.fieldName}
                                            className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                          >
                                            {user.outstanding}
                                          </td>
                                        );
                                      case "Last Transaction":
                                        return (
                                          <td
                                            key={col.fieldName}
                                            className={`${finalClass} overflow-hidden text-ellipsis text-[#111928]`}
                                          >
                                            {user.lastTransaction}
                                          </td>
                                        );
                                      case "Address":
                                        return (
                                          <td
                                            key={col.key}
                                            className={finalClass}
                                          >
                                            {getAddress(user)}
                                          </td>
                                        );
                                      default:
                                        return (
                                          <td
                                            key={col.key}
                                            className={finalClass}
                                          >
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
                                      className="relative mt-1 flex cursor-pointer items-center justify-center"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleShowDots(index, e);
                                      }}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        className={`h-5 w-5 rotate-90 ${
                                          activeRow === index
                                            ? "text-[#1E45E1]"
                                            : "text-gray-500"
                                        }`}
                                      />

                                      {activeRow === index && (
                                        <div
                                          ref={popupRef}
                                          className="rounded-[10px] border border-[#EBEBEB] bg-[#F9F9F9] p-2 w-fit shadow-md z-[9999]"
                                          style={{
                                            top: showAbove
                                              ? popupPosition.top -
                                                (popupRef.current
                                                  ?.offsetHeight || 120) -
                                                10
                                              : popupPosition.top + 5,
                                            left: popupPosition.left - 150,
                                            position: "fixed",
                                          }}
                                        >
                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveRow(null);
                                              if (canUpdateComplaints) {
                                                // handleEditVendor(user);
                                              }
                                            }}
                                            disabled={!canUpdateComplaints}
                                            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md
        ${
          canUpdateComplaints
            ? "text-[#1E45E1] hover:bg-blue-100"
            : "text-gray-400 cursor-not-allowed"
        }`}
                                          >
                                            <Edit2
                                              size="16"
                                              color={
                                                canUpdateComplaints
                                                  ? "#1E45E1"
                                                  : "#9CA3AF"
                                              }
                                            />
                                            Edit
                                          </button>

                                          <button
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              setActiveRow(null);
                                              if (canDeleteComplaints) {
                                                // handleDeleteVendor(user);
                                              }
                                            }}
                                            disabled={!canDeleteComplaints}
                                            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded-md
        ${
          canDeleteComplaints
            ? "text-red-600 hover:bg-red-100"
            : "text-gray-400 cursor-not-allowed"
        }`}
                                          >
                                            <Trash
                                              size="16"
                                              color={
                                                canDeleteComplaints
                                                  ? "#FF0000"
                                                  : "#9CA3AF"
                                              }
                                            />
                                            Delete
                                          </button>
                                        </div>
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
                {/* Completed Tab Content */}
                <p>Completed Content</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Request;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import ReceiptList from "../../Pages/Receipt/ReceiptList";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "flatpickr/dist/themes/material_blue.css";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import AddReceiptForm from "../Receipt/AddReceipt";
import { toast } from "react-toastify";
import {
  CloseCircle,
  SearchNormal1,
  Setting3,
  Filter,
  ArrowDown,
  AddCircle,
} from "iconsax-react";
import "../OthersComponent/BillPdfModal.css";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import { FiSearch } from "react-icons/fi";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import ApiPagination from "../../Components/ApiPagination";
import Select from "react-select";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
// import ReceiptFilter from "./ReceiptFilter";

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
    cursor: "pointer",
    backgroundColor: state.hasValue ? "#F4F4F4" : "#fff",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#333",
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

function RetainerInvoice() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const pdfOpenedRef = useRef(false);
  const navigate = useNavigate();
  const [receiptformShow, setReceiptFormShow] = useState(false);
  const [search, setSearch] = useState(false);
  const [receiptData, setReceiptData] = useState([]);
  const [receiptLoader, setReceiptLoader] = useState(false);
  const [filterInput, setFilterInput] = useState("");

  const [open, setOpen] = useState(false);
  const [editvalue, setEditvalue] = useState("");
  const [receiptedit, setReceiptEdit] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [receiptFilter, setReceiptFilter] = useState(false);
  const [chips, setChips] = useState([]);
  const tableContainerRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  const listRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const isSearching = chips.length > 0 || searchQuery?.trim() !== "";
  const [receiptType, setReceiptType] = useState(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [customizeItems, setCustomizeItems] = useState([]);
  const [error, setError] = useState("");
  const [customizeLoading, setCustomizeLoading] = useState(false);
  const [initialCustomizeItems, setInitialCustomizeItems] = useState([]);

  const { canWriteModule: canWriteInvoice, canReadModule: canReadInvoice } =
    useHasPermission("Bills");

  const receiptTypeOptions = [
    { value: "Booking", label: "Booking" },
    { value: "Advance", label: "Advance" },
    { value: "Rent", label: "Rent" },
  ];

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

  // console.log("formattedData", formattedData);

  const formattedData = [];

  const columnStyles = {};

  const headerKeyMap = {};

  const selectedColumns = [
    { key: "invoiceNo", fieldName: "Invoice No" },
    { key: "name", fieldName: "Full Name" },
    { key: "type", fieldName: "Type" },
    { key: "invoiceDate", fieldName: "Invoice Date" },
    { key: "dueDate", fieldName: "Due Date" },
    { key: "amount", fieldName: "Amount" },
    { key: "due", fieldName: "Due" },
    { key: "status", fieldName: "Status" },
  ];

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

  return (
    <>
      <div className="bg-white font-gilroy">
        <div className="sticky top-0 z-10 bg-white p-2 flex justify-between items-center flex-wrap  font-gilroy min-h-[60px] sm:min-h-[60px]">
          <div>
            <label className="text-[18px] font-semibold font-gilroy text-black">
              Retainer Invoices
            </label>
          </div>

          <div className="flex justify-between items-center flex-wrap gap-2">
            <div className="relative min-w-[180px] max-w-[260px]">
              <div
                className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
        ${
          canReadInvoice
            ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
            : "border-gray-200 opacity-60 cursor-not-allowed"
        }`}
              >
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  disabled={!canReadInvoice}
                  className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] "
                />
                <SearchNormal1
                  size="18"
                  color={canReadInvoice ? "#6B7280" : "#A0A0A0"}
                  className="mr-2"
                />
              </div>
            </div>
            <div>
              <button
                disabled={!canWriteInvoice}
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
          <>
            <PermissionDeniedMessage />
          </>
        ) : (
          <>
            <div className="relative flex flex-col flex-1 min-h-0">
              <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                <div
                  id="tableContainer"
                  ref={tableContainerRef}
                  className="overflow-auto relative h-[calc(100vh-140px)] rounded-xl show-scrolls"
                >
                  <table className=" w-full font-gilroy ">
                    <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs">
                      <tr className="h-9">
                        <th className="px-4 py-2.5 uppercase sticky right-0 z-20 bg-[#F9FAFB] text-center">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default RetainerInvoice;

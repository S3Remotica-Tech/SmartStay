/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import Select from "react-select";
// import { TiTick } from "react-icons/ti";
// import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
  // CloseCircle,
  SearchNormal1,
  // ArrowDown,
  Filter,
  // Setting3,
  ArrowDown2,
  ArrowUp2,
  // DirectSend,
  ExportSquare,
} from "iconsax-react";

// import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
// import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import ApiPagination from "../../Components/ApiPagination";

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
    cursor: "not-allowed",
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

function VendorExpenseHistory() {
  const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  const vendorExpenseList =
    state.ComplianceList?.vendorOverviewExpenseList?.expenses || [];

  const [openExpense, setOpenExpense] = useState(null);

  // console.log("vendorExpenseList", vendorExpenseList);

  const monthOptions = [
    { value: "this_month", label: "This Month" },
    { value: "last_month", label: "Last Month" },
    { value: "last_3_months", label: "Last 3 Months" },
    { value: "last_6_months", label: "Last 6 Months" },
    { value: "this_year", label: "This Year" },
  ];
  const selectOptions = [{ value: "ALL", label: "All" }];
  const [statusfilter, setStatusFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedMonth, setSelectedMonth] = useState();

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };
  const handleToggleExpense = (id) => {
    setOpenExpense((prev) => (prev === id ? null : id));
  };

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);

    // setCurrentPage(1);
  };
  const {
    // canWriteModule: canWriteExpense,
    canReadModule: canReadExpense,
    // canUpdateModule: canUpdateElectricity,
    // canDeleteModule: canDeleteElectricity,
  } = useHasPermission("Expense");

  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const tableContainerRef = useRef(null);
  const lastScrollLeftRef = useRef(0);
  // const listRef = useRef(null);
  const currentPage =
    state.ComplianceList?.vendorOverviewExpenseList?.currentPage ?? 1;

  const totalPages =
    state.ComplianceList?.vendorOverviewExpenseList?.totalPages ?? 1;

  const totalRecords =
    state.ComplianceList?.vendorOverviewExpenseList?.totalExpenses ?? 0;

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

  // useEffect(() => {
  //   setPage(1);
  // }, [state.ComplianceList?.vendorFilters]);

  const handlePageChange = (page) => {
    setPage(page);
    // console.log("setPage", page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };

  // useEffect(() => {
  //   const container = tableContainerRef.current;
  //   if (!container) return;

  //   const handleScroll = () => {
  //     const current = container.scrollLeft;
  //     if (current === 0) {
  //       setIsScrolling(false);
  //       lastScrollLeftRef.current = current;
  //       return;
  //     }

  //     if (Math.abs(current - lastScrollLeftRef.current) < 2) {
  //       return;
  //     }
  //     if (current > lastScrollLeftRef.current) {
  //       setIsScrolling(true);
  //     } else {
  //       setIsScrolling(true);
  //     }

  //     lastScrollLeftRef.current = current;
  //   };

  //   container.addEventListener("scroll", handleScroll);

  //   return () => {
  //     container.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  return (
    <div className="px-4 bg-white">
      <div className="flex flex-wrap items-center justify-between  bg-white min-h-[60px] sticky top-0 z-[50]">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`border border-gray-300 rounded-lg w-36 ${
              statusfilter ? "bg-gray-100 text-gray-700" : "bg-white"
            }`}
          >
            <Select
              options={selectOptions}
              styles={CustomStyles}
              isDisabled={canReadExpense}
              menuPlacement="auto"
              classNamePrefix="custom"
              // onChange={(e) => handleStatusFilter(e)}
              value={
                selectOptions.find((opt) => opt.value === statusfilter) || null
              }
              id="statusselect"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select
              isDisabled={canReadExpense}
              options={monthOptions}
              value={selectedMonth}
              onChange={handleMonthChange}
              classNamePrefix="custom"
              menuPlacement="auto"
              noOptionsMessage={() => "No options"}
              styles={CustomStyles}
            />
          </div>

          <div
            className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
          >
            <Filter
              size={16}
              onClick={() => {
                if (canReadExpense) {
                  setIsFilterOpen(true);
                }
              }}
              className={`transition-opacity duration-300 ${
                canReadExpense
                  ? "cursor-not-allowed opacity-100 pointer-events-auto"
                  : "cursor-not-allowed opacity-40 pointer-events-none"
              }`}
            />
          </div>
        </div>

        <div className={` flex items-center justify-end gap-2 mr-2 `}>
          <div className="relative min-w-[180px] max-w-[260px]">
            <div
              className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
                ${
                  canReadExpense
                    ? "border-[#CFD5DB] focus-within:border-[#1E45E1 cursor-not-allowed]"
                    : "border-gray-200 opacity-60 cursor-not-allowed"
                }`}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                disabled={canReadExpense}
                className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] cursor-not-allowed "
              />
              <SearchNormal1
                size="18"
                color={canReadExpense ? "#6B7280" : "#A0A0A0"}
                className="mr-2"
              />
            </div>
          </div>
          {vendorExpenseList?.length > 0 && (
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

      {vendorExpenseList?.length > 0 ? (
        <div className="bg-white    rounded-xl  mx-1 my-3 ">
          <div
            id="tableContainer"
            ref={tableContainerRef}
            className="overflow-auto relative h-[300px]   show-scrolls"
          >
            <table className=" w-full font-gilroy ">
              <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
                <tr>
                  <th className="px-4 py-2.5 text-left text-xs text-[#666] whitespace-nowrap">
                    EXpense ID
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                    DATE
                  </th>

                  <th className="px-4 py-2.5 text-left text-xs text-[#666] whitespace-nowrap">
                    Expense Title
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                    Amount
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-[#666]  whitespace-nowrap">
                    Balance (if)
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                    STATUS
                  </th>
                  <th className="px-4 py-2.5 text-left text-xs text-[#666]">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {vendorExpenseList.map((expense) => (
                  <React.Fragment key={expense.expenseId}>
                    <tr className="border-t whitespace-nowrap">
                      <td className="px-4 py-2.5 text-sm text-[#1E45E1] flex items-center gap-2">
                        {expense.referenceNumber}
                        <ExportSquare size="14" />
                      </td>

                      <td className="px-4 py-2.5 text-sm">
                        {expense.transactionDate}
                      </td>

                      <td className="px-4 py-2.5 text-sm">{expense.title}</td>

                      <td className="px-4 py-2.5 text-sm">
                        ₹ {expense.totalAmount}
                      </td>

                      <td className="px-4 py-2.5 text-sm">
                        ₹ {expense.balanceAmount}
                      </td>

                      <td className="px-4 py-2.5">
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px]
              ${
                expense.balanceAmount === 0
                  ? "bg-[#E8F8EC] text-[#00A32E]"
                  : "bg-[#FFF7E6] text-[#FA8C16]"
              }`}
                        >
                          <span
                            className={`h-2 w-2 rounded-full ${
                              expense.balanceAmount === 0
                                ? "bg-[#00A32E]"
                                : "bg-[#FA8C16]"
                            }`}
                          />
                          {expense.paymentStatus}
                        </span>
                      </td>

                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => handleToggleExpense(expense.expenseId)}
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F3F4F6]"
                        >
                          {openExpense === expense.expenseId ? (
                            <ArrowUp2 size={14} color="#1E45E1" />
                          ) : (
                            <ArrowDown2 size={14} color="#6B7280" />
                          )}
                        </button>
                      </td>
                    </tr>

                    {openExpense === expense.expenseId && (
                      <tr>
                        <td colSpan={7} className="p-0 bg-[#FAFAFA]">
                          <table className="w-full">
                            <thead className="bg-[#F5F5F5]">
                              <tr>
                                <th className="px-4 py-2 text-left text-[11px]">
                                  ITEM DETAILS
                                </th>
                                <th className="px-4 py-2 text-left text-[11px]">
                                  QUANTITY
                                </th>
                                <th className="px-4 py-2 text-left text-[11px]">
                                  UNIT
                                </th>
                                <th className="px-4 py-2 text-left text-[11px]">
                                  PER UNIT PRICE
                                </th>
                                <th className="px-4 py-2 text-right text-[11px]">
                                  AMOUNT
                                </th>
                              </tr>
                            </thead>

                            <tbody>
                              {expense.expenseItems.map((item) => (
                                <tr key={item.id} className="border-t">
                                  <td className="px-4 py-2  text-[11px]">
                                    {item.item}
                                  </td>

                                  <td className="px-4 py-2  text-[11px]">
                                    {item.quantity}
                                  </td>

                                  <td className="px-4 py-2  text-[11px]">
                                    {item.unit}
                                  </td>

                                  <td className="px-4 py-2  text-[11px]">
                                    ₹ {item.unitPrice.toFixed(2)}
                                  </td>

                                  <td className="px-4 py-2  text-[11px] text-right">
                                    ₹ {item.totalAmount.toFixed(2)}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="">
          <NoDataMessage
            label="Vendor Expense History"
            isHeightChanged={true}
          />
        </div>
      )}
    </div>
  );
}

export default VendorExpenseHistory;

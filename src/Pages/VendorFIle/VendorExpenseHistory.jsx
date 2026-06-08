/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  ArrowUp2,
  DirectSend,
  ExportSquare,
} from "iconsax-react";

import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";

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

function VendorExpenseHistory() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [openExpense, setOpenExpense] = useState(null);
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
    canWriteModule: canWriteExpense,
    canReadModule: canReadExpense,
    // canUpdateModule: canUpdateElectricity,
    // canDeleteModule: canDeleteElectricity,
  } = useHasPermission("Expense");

  const expenses = [
    {
      expenseId: "EXP-1045",
      date: "03 June 2026",
      title: "Electrical Repair",
      amount: "₹ 5,000.00",
      balance: "₹ 0.00",
      status: "Paid",
      items: [
        {
          itemName: "Tubelight (LED)",
          quantity: 20,
          unit: "Nos",
          unitPrice: "₹150.00",
          amount: "₹3,000",
        },
        {
          itemName: "Electrical Wire Roll (90m)",
          quantity: 2,
          unit: "Nos",
          unitPrice: "₹1,750",
          amount: "₹3,500",
        },
        {
          itemName: "Modular Switches",
          quantity: 20,
          unit: "Nos",
          unitPrice: "₹80.00",
          amount: "₹1,600",
        },
      ],
    },
    {
      expenseId: "EXP-1047",
      date: "31 May 2026",
      title: "Wiring Replacement",
      amount: "₹ 50,000.00",
      balance: "₹ 0.00",
      status: "Paid",
      items: [],
    },
  ];
  return (
    <div className="my-2">
      <div className="flex flex-wrap items-center justify-between !sticky !top-[60px] z-40  bg-white h-[40px]">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`border border-gray-300 rounded-lg w-36 ${
              statusfilter ? "bg-gray-100 text-gray-700" : "bg-white"
            }`}
          >
            <Select
              options={selectOptions}
              styles={CustomStyles}
              isDisabled={!canReadExpense}
              menuPlacement="auto"
              classNamePrefix="custom"
              onChange={(e) => handleStatusFilter(e)}
              value={
                selectOptions.find((opt) => opt.value === statusfilter) || null
              }
              id="statusselect"
            />
          </div>

          <div className="flex items-center gap-3">
            <Select
              isDisabled={!canReadExpense}
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
                  ? "cursor-pointer opacity-100 pointer-events-auto"
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
                    ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
                    : "border-gray-200 opacity-60 cursor-not-allowed"
                }`}
            >
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleInputChange}
                disabled={!canReadExpense}
                className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] "
              />
              <SearchNormal1
                size="18"
                color={canReadExpense ? "#6B7280" : "#A0A0A0"}
                className="mr-2"
              />
            </div>
          </div>
          {/* {filteredData?.length > 0 && (
                          <ApiPagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            totalRecords={totalRecords}
                            onPageChange={handlePageChange}
                            onSizeChange={handleSizeChange}
                            isTenantPagination={true}
                            size={size}
                          />
                        )} */}
        </div>
      </div>
      <div className="bg-white    rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
        <div
          id="tableContainer"
          //   ref={tableContainerRef}
          className="overflow-auto relative h-[calc(100vh-250px)] rounded-xl show-scrolls"
        >
          <table className=" w-full font-gilroy ">
            <thead className="bg-[#F9FAFB] sticky top-0 z-30 text-[#6B7280] text-xs uppercase">
              <tr>
                <th className="px-4 py-3 text-left text-xs text-[#666] whitespace-nowrap">
                  EXpense ID
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  DATE
                </th>

                <th className="px-4 py-3 text-left text-xs text-[#666] whitespace-nowrap">
                  Expense Title
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  Amount
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]  whitespace-nowrap">
                  Balance (if)
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  STATUS
                </th>
                <th className="px-4 py-3 text-left text-xs text-[#666]">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {expenses.map((expense) => (
                <React.Fragment key={expense.expenseId}>
                  <tr className="border-t whitespace-nowrap">
                    <td className="px-4 py-3 text-sm text-[#1E45E1] flex items-center gap-2">
                      {expense.expenseId} <ExportSquare size="14" />
                    </td>
                    <td className="px-4 py-3 text-sm">{expense.date}</td>

                    <td className="px-4 py-3 text-sm">{expense.title}</td>

                    <td className="px-4 py-3 text-sm">{expense.amount}</td>

                    <td className="px-4 py-3 text-sm">{expense.balance}</td>

                    <td className="px-4 py-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#E8F8EC] px-2 py-1 text-[11px] text-[#00A32E]">
                        <span className="h-2 w-2 rounded-full bg-[#00A32E]" />
                        {expense.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
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
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                ITEM DETAILS
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                QUANTITY
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                UNIT
                              </th>
                              <th className="px-4 py-3 text-left text-[11px] text-[#6B7280]">
                                PER UNIT PRICE
                              </th>
                              <th className="px-4 py-3 text-right text-[11px] text-[#6B7280]">
                                AMOUNT
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {expense.items.map((item, index) => (
                              <tr key={index} className="border-t">
                                <td className="px-4 py-3">{item.itemName}</td>

                                <td className="px-4 py-3">{item.quantity}</td>

                                <td className="px-4 py-3">{item.unit}</td>

                                <td className="px-4 py-3">{item.unitPrice}</td>

                                <td className="px-4 py-3 text-right">
                                  {item.amount}
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
    </div>
  );
}

export default VendorExpenseHistory;

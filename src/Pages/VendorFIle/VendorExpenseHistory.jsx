/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import Select from "react-select";
import {
  SearchNormal1,
  Filter,
  ArrowDown2,
  ArrowUp2,
  ExportSquare,
} from "iconsax-react";
import { useHasPermission } from "../../Utils/Permission";
import NoDataMessage from "../../Utils/NoDataMessage";
import ApiPagination from "../../Components/ApiPagination";
import PropTypes from "prop-types";
import { CustomStyles } from "../../Utils/SelectStyles";
import VendorExpenseFilter from "./VendorExpenseFilter";


export const EMPTY_VENDOR_EXPENSE_FILTERS = {
  search: "",
  startDate: "",
  endDate: "",
  paymentStatus: "",
  paymentStatusLabel: "",
  categoryId: "",
  categoryName: "",
  minAmount: "",
  maxAmount: "",
};


function VendorExpenseHistory({ selectedVendorId }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const vendorExpenseList =
    state.ComplianceList?.vendorOverviewExpenseList?.expenses || [];
  const [statusfilter, setStatusfilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [openExpense, setOpenExpense] = useState(null);
  const [categoryfilter, setCategoryfilter] = useState("ALL");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [chips, setChips] = useState([]);
  const expenseFilters = state.ComplianceList?.vendorExpenseFilters;


  const PAYMENT_STATUS_STYLES = {
    paid: {
      label: "Paid",
      badge: "bg-[#E8F8EC] text-[#00A32E]",
      dot: "bg-[#00A32E]",
    },
    partial: {
      label: "Partially Paid",
      badge: "bg-[#FFF7E6] text-[#FA8C16]",
      dot: "bg-[#FA8C16]",
    },
    pending: {
      label: "Pending",
      badge: "bg-[#FDECEC] text-[#E5484D]",
      dot: "bg-[#E5484D]",
    },
  };

  const getStatusStyle = (status) => {
    const s = String(status || "").toLowerCase();
    if (s === "full" || s.startsWith("paid")) return PAYMENT_STATUS_STYLES.paid;
    if (s.includes("partial")) return PAYMENT_STATUS_STYLES.partial;
    if (s.includes("pending")) return PAYMENT_STATUS_STYLES.pending;
    return {
      label: status || "-",
      badge: "bg-[#F3F4F6] text-[#6B7280]",
      dot: "bg-[#6B7280]",
    };
  };
  const selectOptions = [
    { value: "ALL", label: "All" },
    ...(state.ComplianceList?.vendorOverviewExpenseList?.filterOptions?.status || []).map(
      (item) => ({
        value: item.type,
        label: item.name,
      })
    ),
  ];

  const categoryOptions = [
    { value: "ALL", label: "All" },
    ...(state.ComplianceList?.vendorOverviewExpenseList?.filterOptions?.category || []).map(
      (item) => ({
        value: item.type,
        label: item.name,
      })
    ),
  ];

  const { canReadModule: canReadExpense } = useHasPermission("Expense");

  const [size, setSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const [page, setPage] = useState(1);
  const tableContainerRef = useRef(null);
  const previousVendorExpenseRequestRef = useRef(null);

  const isAll = (opt) => !opt || opt.value === "ALL";
  const handleStatusFilter = (selectedOption) => {
    setPage(1);
    const selectedStatus = selectedOption?.value || "ALL";
    setStatusfilter(selectedStatus);
    dispatch({
      type: "SET_VENDOR_EXPENSE_FILTERS",
      payload: {
        paymentStatus: isAll(selectedOption) ? "" : selectedOption.value,
        paymentStatusLabel: isAll(selectedOption) ? "" : selectedOption.label,
      },
    });

  };


  const handleCategoryFilter = (selectedOption) => {
    setPage(1);
    setCategoryfilter(selectedOption?.value || "ALL");
    dispatch({
      type: "SET_VENDOR_EXPENSE_FILTERS",
      payload: {
        categoryId: isAll(selectedOption) ? "" : selectedOption.value,
        categoryName: isAll(selectedOption) ? "" : selectedOption.label,
      },
    });
  };


  const handleToggleExpense = (id) => {
    setOpenExpense((prev) => (prev === id ? null : id));
  };

  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
    dispatch({
      type: "SET_VENDOR_EXPENSE_FILTERS",
      payload: { search: e.target.value },
    });
  };


  // const lastScrollLeftRef = useRef(0);
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

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_VENDOR_EXPENSE_FILTERS",
        payload: { ...EMPTY_VENDOR_EXPENSE_FILTERS },
      });
      setChips([]);
    };
  }, []);

  useEffect(() => {
    if (state.ComplianceList.vendorOverviewExpenseListStatus === 200) {

      setIsFilterOpen(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_VENDOR_OVERVIEW_EXPENSE_LIST" });
      }, 100);
    }
  }, [state.ComplianceList.vendorOverviewExpenseListStatus]);

  useEffect(() => {
    const f = expenseFilters;
    const filterData = [];

    if (f?.search)
      filterData.push({ key: "search", label: "Search", value: f.search });

    if (f?.startDate && f?.endDate)
      filterData.push({
        key: "date",
        label: "Date",
        value: `${f.startDate} to ${f.endDate}`,
      });

    if (f?.paymentStatusLabel)
      filterData.push({
        key: "paymentStatus",
        label: "Payment Status",
        value: f.paymentStatusLabel,
      });

    if (f?.categoryName)
      filterData.push({
        key: "category",
        label: "Category",
        value: f.categoryName,
      });

    if (f?.minAmount !== "" && f?.minAmount !== null)
      filterData.push({ key: "minAmount", label: "Min", value: f.minAmount });

    if (f?.maxAmount !== "" && f?.maxAmount !== null)
      filterData.push({ key: "maxAmount", label: "Max", value: f.maxAmount });

    setChips(filterData);
  }, [expenseFilters]);


  const handleReset = () => {
    setSearchQuery("");
    setStatusfilter("");
    setCategoryfilter("")


    dispatch({
      type: "SET_VENDOR_EXPENSE_FILTERS",
      payload: { ...EMPTY_VENDOR_EXPENSE_FILTERS },
    });
    dispatch({
      type: "VENDOR_OVERVIEW_EXPENSE_SAGA",
      payload: {
        vendorId: selectedVendorId,
        ...EMPTY_VENDOR_EXPENSE_FILTERS,
        page: 1,
        size,
      },
    });

  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  const handleSizeChange = (sizeValue) => {
    setSize(sizeValue);
  };
  useEffect(() => {
    setPage(1);
  }, [searchQuery]);



  useEffect(() => {
    if (!selectedVendorId) return;
    const timeout = setTimeout(() => {
      const payload = {
        vendorId: selectedVendorId,
        page,
        size,
        search: searchQuery || expenseFilters?.search || "",
        paymentStatus: statusfilter === "ALL" ? "" : statusfilter,
        categoryId: categoryfilter === "ALL" ? "" : categoryfilter,
        startDate: expenseFilters?.startDate || "",
        endDate: expenseFilters?.endDate || "",
        minAmount: expenseFilters?.minAmount ?? "",
        maxAmount: expenseFilters?.maxAmount ?? "",
      };

      const requestKey = JSON.stringify(payload);
      if (previousVendorExpenseRequestRef.current === requestKey) return;
      previousVendorExpenseRequestRef.current = requestKey;
      dispatch({
        type: "VENDOR_OVERVIEW_EXPENSE_SAGA",
        payload,
      });
    }, 500);
    return () => clearTimeout(timeout);
  }, [page, size, selectedVendorId, searchQuery, statusfilter, categoryfilter]);




  return (
    <div className="px-4 bg-white">
      <div className="flex flex-wrap items-center justify-between  bg-white min-h-[60px] sticky top-0 z-[50]">
        <div className="flex flex-wrap items-center gap-3">
          <div className="border border-gray-300 rounded-lg w-36">
            <Select
              options={selectOptions}
              styles={CustomStyles}
              isDisabled={!canReadExpense}
              menuPlacement="auto"
              classNamePrefix="custom"
              onChange={handleStatusFilter}
              value={
                selectOptions.find((opt) => opt.value === statusfilter) || selectOptions[0]
              }
              id="statusselect"
            />
          </div>

          <div className="border border-gray-300 rounded-lg w-36">
            <Select
              options={categoryOptions}
              styles={CustomStyles}
              isDisabled={!canReadExpense}
              menuPlacement="auto"
              classNamePrefix="custom"
              onChange={handleCategoryFilter}
              value={
                categoryOptions.find((opt) => opt.value === categoryfilter) ||
                categoryOptions[0]
              }
              id="categoryselect"
            />
          </div>

          <div onClick={() => {
            if (canReadExpense) {
              setIsFilterOpen(true);
            }
          }}
            className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
          >
            <Filter
              size={16}

              className={`transition-opacity duration-300 ${!canReadExpense
                ? "cursor-not-allowed opacity-100 pointer-events-auto"
                : "cursor-pointer opacity-40 "
                }`}
            />

            <VendorExpenseFilter
              show={isFilterOpen}
              handleClose={() => setIsFilterOpen(false)}
              size={size}
              selectedVendorId={selectedVendorId}
            />
          </div>
        </div>

        <div className={` flex items-center justify-end gap-2 mr-2 `}>
          <div className="relative min-w-[180px] max-w-[260px]">
            <div
              className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
                ${canReadExpense
                  ? "border-[#CFD5DB] focus-within:border-[#1E45E1 cursor-not-allowed]"
                  : "border-gray-200 opacity-60 cursor-not-allowed"
                }`}
            >
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={handleInputChange}
                disabled={!canReadExpense}
                className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] cursor-pointer "
              />
              <SearchNormal1
                size="18"
                color={!canReadExpense ? "#6B7280" : "#A0A0A0"}
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

      {chips?.length > 0 && (
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
      )}

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
                  <th className="px-4 py-2.5 text-left text-xs text-[#666] whitespace-nowrap">
                    Category
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
                {vendorExpenseList?.map((expense) => (
                  <React.Fragment key={expense.expenseId}>
                    <tr className="border-t whitespace-nowrap">
                      <td className="px-4 py-2.5 text-sm text-[#1E45E1] flex items-center gap-2">
                        {expense.referenceNumber}
                        <ExportSquare size="14" />
                      </td>

                      <td className="px-4 py-2.5 text-sm">
                        {expense.transactionDate}
                      </td>

                      <td className="px-4 py-2.5 text-sm">
                        {expense.title || "-"}
                      </td>
                      <td className="px-4 py-2.5 text-sm">
                        {expense.categoryName || "-"}
                      </td>

                      <td className="px-4 py-2.5 text-sm">
                        ₹ {expense.totalAmount}
                      </td>

                      <td className="px-4 py-2.5 text-sm">
                        ₹ {expense.balanceAmount}
                      </td>

                      <td className="px-4 py-2.5">
                        {(() => {
                          const st = getStatusStyle(expense.paymentStatus);
                          return (
                            <span
                              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] whitespace-nowrap ${st.badge}`}
                            >
                              <span className={`h-2 w-2 rounded-full ${st.dot}`} />
                              {st.label}
                            </span>
                          );
                        })()}
                      </td>

                      <td className="px-4 py-2.5">
                        <button
                          onClick={() => handleToggleExpense(expense?.expenseId)}
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

                    {openExpense === expense?.expenseId && (
                      <tr >
                        <td colSpan={8} className="p-0 bg-[#FAFAFA]">
                          {expense?.expenseItems?.length > 0 ? (
                            <table className="w-full">
                              <thead className="bg-[#F5F5F5]">
                                <tr>
                                  <th className="px-4 py-2 text-left text-[11px]">ITEM DETAILS</th>
                                  <th className="px-4 py-2 text-left text-[11px]">QUANTITY</th>
                                  <th className="px-4 py-2 text-left text-[11px]">UNIT</th>
                                  <th className="px-4 py-2 text-left text-[11px]">PER UNIT PRICE</th>
                                  <th className="px-4 py-2 text-right text-[11px]">AMOUNT</th>
                                </tr>
                              </thead>

                              <tbody>
                                {expense.expenseItems.map((item) => (
                                  <tr key={item.id} className="border-t">
                                    <td className="px-4 py-2 text-[11px]">{item.item || "-"}</td>
                                    <td className="px-4 py-2 text-[11px]">{item.quantity}</td>
                                    <td className="px-4 py-2 text-[11px]">{item.unit || "-"}</td>
                                    <td className="px-4 py-2 text-[11px]">
                                      ₹ {Number(item.unitPrice || 0).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-2 text-[11px] text-right">
                                      ₹ {Number(item.totalAmount || 0).toFixed(2)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div className="flex items-center justify-center py-6 text-[12px] text-[#6B7280] font-gilroy">
                              No item details available
                            </div>
                          )}
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
VendorExpenseHistory.propTypes = {
  selectedVendorId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default VendorExpenseHistory;

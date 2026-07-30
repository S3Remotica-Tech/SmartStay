/* eslint-disable react-hooks/exhaustive-deps */
import Filters from "../../Assets/Images/Filters.svg";
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { ArrowDown2, Bank, Edit, Location, Trash } from "iconsax-react";
import { CloseCircle, Filter } from "iconsax-react";
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from "../../Components/ErrorMessage";
import { useLocation } from "react-router-dom";
import { Setting3, SearchNormal1 } from "iconsax-react";
import NoDataMessage from "../../Utils/NoDataMessage";
import { useHasPermission } from "../../Utils/Permission";
import Select from "react-select";

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

function BankingLedger() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const monthOptions = [];
  const selectOptions = [{ value: "ALL", label: "All" }];
  const [statusfilter, setStatusfilter] = useState("");

  const [selectedMonth, setSelectedMonth] = useState();
  const [transactionFilterddata, settransactionFilterddata] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const {
    canWriteModule: canWriteBanking,
    canReadModule: canReadBanking,
    canUpdateModule: canUpdateBanking,
    canDeleteModule: canDeleteBanking,
  } = useHasPermission("Banking");
  const handleStatusFilter = (selected) => {
    setStatusFilter(selected?.value || "");
  };

  const handleMonthChange = (selectedOption) => {
    setSelectedMonth(selectedOption);
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setPageSize(20);
      } else {
        setPageSize(10);
      }
      setPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedTransactions = transactionFilterddata?.slice(
    startIndex,
    endIndex,
  );
  return (
    <div className="px-4 py-4 h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 flex-shrink-0">
        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`border border-gray-300 rounded-lg w-36 ${
              statusfilter ? "bg-gray-100 text-gray-700" : "bg-white"
            }`}
          >
            <Select
              options={selectOptions}
              styles={CustomStyles}
              isDisabled={!canReadBanking}
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
              isDisabled={!canReadBanking}
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
                if (canReadBanking) {
                  setIsFilterOpen(true);
                }
              }}
              className={`transition-opacity duration-300 ${
                canReadBanking
                  ? "cursor-pointer opacity-100 pointer-events-auto"
                  : "cursor-not-allowed opacity-40 pointer-events-none"
              }`}
            />
          </div>
        </div>
        <div className="flex  items-center gap-2">
          <div className="relative flex items-center w-full cursor-pointer">
            <div
              className={`flex items-center rounded-xl border px-3 py-1.5 bg-white transition
              ${
                canReadBanking
                  ? "border-[#CFD5DB] focus-within:border-[#1E45E1]"
                  : "border-gray-200 opacity-60 cursor-not-allowed"
              }`}
            >
              <input
                disabled
                // disabled={!canReadBanking}
                type="text"
                className="w-full  bg-white text-sm font-gilroy outline-none placeholder:text-[#9CA3AF] disabled:cursor-not-allowed"
                placeholder="Search"
                aria-label="Search"
                // value={filterInput}
                // onChange={(e) => handlefilterInput(e)}
              />
              <SearchNormal1
                size="18"
                color={canReadBanking ? "#6B7280" : "#A0A0A0"}
                className="mr-2"
              />
            </div>
          </div>
          <div>
            <Setting3
              // onClick={() => setOpen(!open)}
              className="cursor-not-allowed"
              size="22"
              color="#4B4B4B"
            />
          </div>
          <PaginationList
            totalItems={transactionFilterddata.length}
            itemsPerPage={pageSize}
            currentPage={page}
            onPageChange={(p) => setPage(p)}
            onPageSizeChange={(size) => setPageSize(size)}
          />
        </div>
      </div>

      <div className="relative flex-1 overflow-y-auto pr-2 space-y-4 show-scrolls">
        {/* {transactionFilterddata?.length > 0 ? ( */}
        <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
          <div
            id="tableContainer"
            // ref={tableContainerRef}
            className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
          >
            <table className=" w-full font-gilroy">
              <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                <tr className="h-9">
                  <th className="w-[230px] px-2 whitespace-nowrap">
                    date & Time
                  </th>
                  <th className="w-[230px] px-2 whitespace-nowrap">Type</th>
                  <th className="w-[230px] px-2 whitespace-nowrap">
                    Account / Method
                  </th>
                  <th className="w-[230px] px-2 whitespace-nowrap">
                    Reference
                  </th>
                  <th className="w-[230px] px-2 whitespace-nowrap">
                    Transaction ID
                  </th>
                  <th className="w-[230px] px-2 whitespace-nowrap">
                    Description
                  </th>
                  <th className="w-[230px] px-2 whitespace-nowrap">Amount</th>
                  <th className="w-[230px] px-2 ">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedTransactions?.map((user) => (
                  <tr
                    key={user.id}
                    className="text-sm font-gilroy border-b border-[#E8E8E8] h-10"
                  >
                    <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                      {user.accountHolder}
                    </td>
                    <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                      {user.createdAt}
                    </td>
                    <td className="w-[230px] px-2 py-1">{user.amount}</td>
                    <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                      {user.source}
                    </td>
                    <td className="w-[230px] px-2 py-1 whitespace-nowrap">
                      {user.type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* ) : (
          <div>
            {transactionFilterddata.length === 0 && canReadBanking && (
              <NoDataMessage label="Transaction" />
            )}

         
          </div>
        )} */}
      </div>
    </div>
  );
}

export default BankingLedger;

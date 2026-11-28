/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { ArrowUp, ArrowDown, ArrowSwapVertical } from "iconsax-react";
import { Filter } from "iconsax-react";

import NoDataMessage from "../../Utils/NoDataMessage";
import { useHasPermission } from "../../Utils/Permission";
import Select from "react-select";
import ApiPagination from "../../Components/ApiPagination";
import LedgerFilter from "./LedgerFilter";

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

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function BankingLedger() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const OverviewDetails = state?.bankingDetails?.OverviewBankDetails;
  const [transactionFilterddata, setTransactionFilterddata] = useState([]);
  const [period, setPeriod] = useState("ALL");
  const [source, setSource] = useState(null);
  const [chips, setChips] = useState([]);
  const [loader, setLoader] = useState(true);

  const handlePeriodChange = (selected) => {
    setPeriod(selected);
    setPageTransaction(1);
  };

  const handleSourceChange = (selected) => {
    setSource(selected);
    setPageTransaction(1);
  };
  const [pageTransaction, setPageTransaction] = useState(1);
  const [sizeTransaction, setSizeTransaction] = useState(
    window.innerWidth >= 1440 ? 20 : 10,
  );

  const {
    // canWriteModule: canWriteBanking,
    canReadModule: canReadBanking,
    // canUpdateModule: canUpdateBanking,
    // canDeleteModule: canDeleteBanking,
  } = useHasPermission("Banking");

  const handleCloseFilter = () => {
    setIsFilterOpen(false);
  };

  // const handleStatusFilter = (selected) => {
  //   setStatusFilter(selected?.value || "");
  // };

  // const handleMonthChange = (selectedOption) => {
  //   setSelectedMonth(selectedOption);
  // };

  const filterOptionsData = useSelector(
    (state) => state.bankingDetails?.getBankingLedgerList?.filterOptions,
  );

  const periodOptions =
    filterOptionsData?.dateFilter
      ?.filter((item) => item.type !== "CUSTOM")
      ?.map((item) => ({
        label: item.name,
        value: item.type,
      })) || [];

  const sourceOptions =
    filterOptionsData?.source?.map((item) => ({
      label: item.name,
      value: item.type,
    })) || [];
  // ////////////////////////////////////////////////////////////

  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     const bankFilterReducer = state.bankingDetails?.ledgerFilter;
  //     dispatch({
  //       type: "GET_BANKING_LEDGER_SAGA",
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         bankId: OverviewDetails?.bankId,
  //         page: pageTransaction,
  //         size: sizeTransaction,
  //         dateFilter: period?.value || bankFilterReducer?.period,
  //         source: source?.value || bankFilterReducer?.source,
  //         fromDate: bankFilterReducer?.startDate,
  //         toDate: bankFilterReducer?.endDate,
  //       },
  //     });
  //     setLoader(true);

  //     const ledgerFilter = {
  //       period: period?.value,
  //       source: source?.value,
  //       periodLabel: period?.label || "",
  //       sourceLabel: source?.label || "",
  //     };

  //     dispatch({
  //       type: "SET_BANK_LEDGER_FILTERS",
  //       payload: ledgerFilter,
  //     });
  //   }
  // }, [
  //   state.login.selectedHostel_Id,
  //   pageTransaction,
  //   sizeTransaction,
  //   period,
  //   source,
  // ]);




  const previousLedgerRequestRef = useRef(null);

  useEffect(() => {
    const hostelId = state.login?.selectedHostel_Id;

    if (!hostelId) return;

    const bankFilterReducer = state.bankingDetails?.ledgerFilter;

    const payload = {
      hostelId,
      bankId: OverviewDetails?.bankId,
      page: pageTransaction,
      size: sizeTransaction,
      dateFilter: period?.value || bankFilterReducer?.period,
      source: source?.value || bankFilterReducer?.source,
      fromDate: bankFilterReducer?.startDate,
      toDate: bankFilterReducer?.endDate,
    };

    const requestKey = JSON.stringify(payload);

    if (previousLedgerRequestRef.current === requestKey) return;

    previousLedgerRequestRef.current = requestKey;

    setLoader(true);

    dispatch({
      type: "GET_BANKING_LEDGER_SAGA",
      payload,
    });

    const ledgerFilter = {
      period: period?.value,
      source: source?.value,
      periodLabel: period?.label || "",
      sourceLabel: source?.label || "",
    };

    dispatch({
      type: "SET_BANK_LEDGER_FILTERS",
      payload: ledgerFilter,
    });
  }, [
    state.login?.selectedHostel_Id,
    OverviewDetails?.bankId,
    pageTransaction,
    sizeTransaction,
    period,
    source,

  ]);

  useEffect(() => {
    return () => {
      dispatch({
        type: "SET_BANK_LEDGER_FILTERS",
        payload: {
          startDate: undefined,
          endDate: undefined,
          period: "",
          periodLabel: "",
          source: "",
          sourceLabel: "",
          search: "",
          size: "",
          page: "",
        },
      });

      setChips([]);
      setPeriod("");
      setSource("");
    };
  }, []);

  const handleReset = () => {
    dispatch({
      type: "SET_BANK_LEDGER_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        period: "",
        periodLabel: "",
        source: "",
        sourceLabel: "",
        search: "",
        size: "",
        page: "",
      },
    });
    dispatch({
      type: "GET_BANKING_LEDGER_SAGA",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        bankId: OverviewDetails?.bankId,
        page: pageTransaction,
        size: sizeTransaction,
      },
    });

    setChips([]);
    setPeriod("ALL");
    setSource("");
  };



  useEffect(() => {
    const bankFilter = state.bankingDetails?.ledgerFilter;

    const filterData = [];

    if (bankFilter?.search) {
      filterData.push({
        key: "search",
        label: "Search",
        type: "search",
        value: bankFilter.search,
      });
    }

    if (bankFilter?.period) {
      filterData.push({
        key: "period",
        label: "Period",
        type: "period",
        value: bankFilter?.periodLabel,
      });
    }

    if (bankFilter?.source) {
      filterData.push({
        key: "source",
        label: "Source",
        type: "source",
        value: bankFilter?.sourceLabel,
      });
    }

    if (bankFilter?.startDate && bankFilter?.endDate) {
      filterData.push({
        key: "date",
        label: "Date",
        type: "date",
        value: `${bankFilter.startDate} - ${bankFilter.endDate}`,
      });
    } else if (bankFilter?.startDate) {
      filterData.push({
        key: "startDate",
        label: "From",
        type: "date",
        value: bankFilter.startDate,
      });
    } else if (bankFilter?.endDate) {
      filterData.push({
        key: "endDate",
        label: "To",
        type: "date",
        value: bankFilter.endDate,
      });
    }

    setChips(filterData);
  }, [state.bankingDetails?.ledgerFilter]);

  useEffect(() => {
    let timeout;

    const handleResize = () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        setSizeTransaction((prev) => {
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
    if (state.bankingDetails?.getBankingLedgerList) {
      setTransactionFilterddata(
        state.bankingDetails?.getBankingLedgerList || [],
      );
      setLoader(false);
      dispatch({ type: "REMOVE_GET_BANKING_LEDGER_REDUCER" });
    }
  }, [state.bankingDetails.getBankingLedgerListSuccessStatus, state.bankingDetails?.getBankingLedgerList?.transactions]);

  useEffect(() => {
    if (state.bankingDetails.allTransactionError) {
      setLoader(false);
      dispatch({ type: "REMOVE_ALL_TRANSACTION_ERROR" })
    }

  }, [state.bankingDetails.allTransactionError])

  const currentPageTransaction =
    state.bankingDetails?.getBankingLedgerList?.currentPage ?? 1;

  const totalPagesTransaction =
    state.bankingDetails?.getBankingLedgerList?.totalPages ?? 1;

  const totalRecordsTransaction =
    state.bankingDetails?.getBankingLedgerList?.totalRecords ?? 0;

  const handlePageChangeTransaction = (page) => {
    setPageTransaction(page);
  };

  const handleSizeChangeTransaction = (sizeValue) => {
    setSizeTransaction(sizeValue);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center gap-2 min-h-[60px]">
        <div className="flex flex-wrap items-center gap-3">
          <div className={`border border-gray-300 rounded-lg w-36 `}>
            <div data-testid="banking-ledger-period-select" className="contents"><Select
              isDisabled={!canReadBanking}
              styles={CustomStyles}
              placeholder="Select Period"
              options={periodOptions}
              value={periodOptions.find((option) => option.value === period)}
              onChange={handlePeriodChange}
            /></div>
          </div>

          <div className="flex items-center gap-3">
            <div data-testid="banking-ledger-source-select" className="contents"><Select
              isDisabled={!canReadBanking}
              styles={CustomStyles}
              placeholder="Select Source"
              options={sourceOptions}
              value={source}
              onChange={handleSourceChange}
            /></div>
          </div>

          <div
            className={`flex items-center justify-center border border-gray-300 rounded-full p-2 bg-white`}
          >
            <Filter data-testid="banking-ledger-icon"
              size={16}
              onClick={() => {
                if (canReadBanking) {
                  setIsFilterOpen(true);
                }
              }}
              className={`transition-opacity duration-300 ${canReadBanking
                ? "cursor-pointer opacity-100 pointer-events-auto"
                : "cursor-not-allowed opacity-40 pointer-events-none"
                }`}
            />
          </div>
        </div>
        <div className="flex  items-center gap-2">
          {transactionFilterddata?.transactions?.length > 0 && (
            <ApiPagination
              currentPage={currentPageTransaction}
              totalPages={totalPagesTransaction}
              totalRecords={totalRecordsTransaction}
              onPageChange={handlePageChangeTransaction}
              onSizeChange={handleSizeChangeTransaction}
              isTenantPagination={true}
              size={sizeTransaction}
            />
          )}
        </div>
      </div>

      {chips?.length > 0 && (
        <div className="flex flex-wrap items-start gap-3 p-3 my-3 rounded-lg bg-gray-50 border border-gray-200">
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
          <span data-testid="banking-ledger-reset-action"
            className="text-blue-600 text-sm font-medium cursor-pointer"
            onClick={handleReset}
          >
            Reset
          </span>
        </div>
      )}

      <div className="relative ">
        {transactionFilterddata?.transactions?.length > 0 ? (
          <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-[12px]">
            <div
              id="tableContainer"
              className="overflow-x-auto overflow-y-auto h-[calc(100vh-140px)] show-scrolls"
            >
              <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                <thead className="sticky top-0 z-30">
                  <tr>
                    <th className={`${TABLE_HEADER_CELL} text-left sticky left-0 z-40 w-[180px] min-w-[180px] max-w-[180px]`}>
                      date & Time
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left sticky left-[180px] z-40 w-[200px] min-w-[200px] max-w-[200px]`}>
                      Type
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                      Account / Method
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Description</th>
                    <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                      Source / Beneficiary
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Amount</th>
                    {/* <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                      Running Balance
                    </th> */}
                    <th className={`${TABLE_HEADER_CELL} text-left sticky right-0 z-40 w-[80px] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)]`}>
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {transactionFilterddata?.transactions?.map((user, index) => (
                    <tr
                      key={index}
                    >
                      <td className={`${TABLE_BODY_CELL} sticky left-0 z-20 bg-white w-[180px] min-w-[180px] max-w-[180px] text-[#314158]`}>
                        {user.createdAt}
                      </td>
                      <td className={`${TABLE_BODY_CELL} sticky left-[180px] z-20 bg-white text-[#111928] w-[200px] min-w-[200px] max-w-[200px]`}>
                        <div className="flex items-center gap-2 capitalize">
                          {user.source === "SELF_TRANSFER" ? (
                            <>
                              <ArrowSwapVertical
                                size={16}
                                color={`${user.type === "CREDIT" ? "#16A34A" : "#DC2626"}`}
                              />
                              <span className="capitalize"> {user.source === "SELF_TRANSFER" ? "Self Transfer" : user.source}</span>
                            </>
                          ) : user.type === "CREDIT" ? (
                            <>
                              <ArrowUp size={16} color="#16A34A" />
                              <span className="capitalize">{user.source?.replaceAll("_", " ").toLowerCase()}</span>
                            </>
                          ) : user.type === "DEBIT" ? (
                            <>
                              <ArrowDown
                                size={16}
                                color="#DC2626"
                              />
                              <span className="capitalize">{user.source?.replaceAll("_", " ").toLowerCase()}</span>
                            </>
                          ) : (
                            <span className="capitalize">{user.source?.replaceAll("_", " ").toLowerCase()}</span>
                          )}
                        </div>
                      </td>
                      <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                        {`${user?.accountType === 'CASH'
                          ? `${user?.accountType} / ${user?.displayName}`
                          : `${[user?.accountType, user?.paymentMethod, user?.displayName].filter(Boolean).join(' / ')}`
                          }`}
                        {/* {user.cashAccountType || user?.bankName} */}
                        {/* <span className="text-xs">{user.displayName}</span> */}
                        {/* {user?.source} */}
                      </td>
                      <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                        {user.description || "-"}
                      </td>
                      <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                        {user.displayName}
                      </td>
                      <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                        {user.transactionAmount}
                      </td>
                      {/* <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                        {user.accountBalance}
                      </td> */}
                      <td className={`${TABLE_BODY_CELL} sticky right-0 z-20 bg-white w-[80px] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] text-[#111928]`}>
                        <PiDotsThreeOutlineVerticalFill className="h-5 w-5" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div>
            {transactionFilterddata.transactions?.length === 0 &&
              canReadBanking && (
                <div className="my-2">
                  {" "}
                  <NoDataMessage label="Transaction" />{" "}
                </div>
              )}

            {loader && (
              <div className="fixed inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                <div className="w-10 h-10 rounded-full border-t-4 border-[#1E45E1] border-r-4 border-r-transparent animate-spin"></div>
              </div>
            )}
          </div>
        )}
      </div>

      {isFilterOpen && (
        <LedgerFilter
          show={isFilterOpen}
          handleClose={handleCloseFilter}
          size={sizeTransaction}
          page={pageTransaction}
        />
      )}
    </div>
  );
}

export default BankingLedger;

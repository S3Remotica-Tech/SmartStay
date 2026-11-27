/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import "flatpickr/dist/themes/material_blue.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import RecurringBillList from "../../Pages/Recurring/RecurringBillList";
import closecircle from "../../Assets/Images/New_images/close-circle.png";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import "../OthersComponent/BillPdfModal.css";
import PaginationList from "../../Components/PaginationList";
import { useHasPermission } from "../../Utils/Permission";
import { FiSearch } from "react-icons/fi";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import ComingSoon from "../../Utils/ComingSoon";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

function RecurringBills() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [recurLoader, setRecurLoader] = useState(false);
  const [loading, setLoading] = useState(false);

  const [recurringbills, setRecurringBills] = useState([]);

  const [search, setSearch] = useState(false);
  const [originalRecuiring, setOriginalRecuiring] = useState([]);
  const [checkedRows, setCheckedRows] = useState({});
  const [filterInput, setFilterInput] = useState("");
  const [activeStay, setActiveStay] = useState("long_stay");

  const { canReadModule: canReadRecurring } =
    useHasPermission("Recurring bills");

  useEffect(() => {
    if (!canReadRecurring) {
      setRecurLoader(false);
    }
  }, [canReadRecurring]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setRecurLoader(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  const handleClick = (stayType) => {
    setActiveStay(stayType);
  };

  useEffect(() => {
    const initialState = {};
    recurringbills?.forEach((item) => {
      initialState[item.customerId] = item.currentStatus === true;
    });
    setCheckedRows(initialState);
  }, [recurringbills]);

  const handleToggle = (id) => {
    if (!id) return;

    const updatedValue = !checkedRows[id];
    const stringValue = updatedValue ? "true" : "false";

    setCheckedRows((prev) => ({
      ...prev,
      [id]: updatedValue,
    }));

    dispatch({
      type: "UPDATE_TENANT_RECURRING",
      payload: {
        status: stringValue,
        hostelId: state.login.selectedHostel_Id,
        customerId: id,
      },
    });
  };

  useEffect(() => {
    if (state.InvoiceList.updateTenantRecurringStatusCode) {
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: state.login?.selectedHostel_Id,
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_UPDATE_TENANT_RECURRING" });
      }, 100);
    }
  }, [state.InvoiceList.updateTenantRecurringStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.CustomerRecurringEnableDisableStatusCode === 200) {
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: state.login?.selectedHostel_Id,
      });
      setLoading(true);
      dispatch({ type: "REMOVE_CUSTOMER_RECURRING_ENABLE_DISABLE" });
    }
  }, [state.InvoiceList.CustomerRecurringEnableDisableStatusCode]);

  useEffect(() => {
    setLoading(false);
    setRecurLoader(false);
  }, [state.InvoiceList.RecurringBills]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setLoading(false);
      // setShowLoader(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  // const [dropdownValue, setDropdownValue] = useState("");

  const handleDeleteRecurringbills = (item) => {
    if (item) {
      dispatch({
        type: "DELETE-RECURRING-BILLS",
        payload: { id: item.recuire_id, user_id: item.user_id },
      });
    }
  };

  // useEffect(() => {
  //   if (state.login?.selectedHostel_Id) {
  //     setRecurLoader(true);
  //     dispatch({
  //       type: "RECURRING-BILLS-LIST",
  //       payload: state.login?.selectedHostel_Id,
  //     });
  //   }
  // }, [state.login?.selectedHostel_Id, activeStay]);

  const previousRecurringRequestRef = useRef(null);

  useEffect(() => {
    const hostelId = state.login?.selectedHostel_Id;

    if (!hostelId) return;

    // const payload = hostelId;

    const requestKey = JSON.stringify({
      hostelId,
      activeStay,
    });

    if (previousRecurringRequestRef.current === requestKey) return;

    previousRecurringRequestRef.current = requestKey;

    setRecurLoader(true);

    dispatch({
      type: "RECURRING-BILLS-LIST",
      payload: hostelId,
    });
  }, [state.login?.selectedHostel_Id, activeStay]);

  useEffect(() => {
    if (state.InvoiceList?.RecurringbillsgetStatuscode === 200) {
      setRecurLoader(false);
      setRecurringBills(state.InvoiceList.RecurringBills?.customers);
      setOriginalRecuiring(state.InvoiceList.RecurringBills);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_LIST" });
      }, 100);
    }
  }, [state.InvoiceList.RecurringbillsgetStatuscode]);

  useEffect(() => {
    if (
      state.InvoiceList.RecurringBillAddStatusCode === 200 ||
      state.InvoiceList.deleterecurringbillsStatuscode
    ) {
      dispatch({
        type: "RECURRING-BILLS-LIST",
        payload: state.login?.selectedHostel_Id,
      });
      setRecurringBills(state.InvoiceList.RecurringBills);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_ADD" });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECURRINGBILLS_STATUS_CODE" });
      }, 1000);
    }
  }, [
    state.InvoiceList.RecurringBillAddStatusCode,
    state.InvoiceList.deleterecurringbillsStatuscode,
  ]);

  useEffect(() => {
    if (recurringbills?.length > 0 && originalRecuiring?.length === 0) {
      setOriginalRecuiring(recurringbills);
    }
  }, [recurringbills]);

  const handleSearch = () => {
    setSearch(!search);
    dispatch({
      type: "SET_INVOICE_FILTERS",
      payload: {
        startDate: undefined,
        endDate: undefined,
        type: [],
        createdBy: [],
        createdByLabels: [],
        modes: [],
        paymentStatus: [],
        search: "",
      },
    });
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      // setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target)

  //     ) {
  //       setDropdownVisible(false);

  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
  };

  const handlefilterInput = (e) => {
    setFilterInput(e.target.value);
  };

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);

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

  const paginatedData = recurringbills.slice(startIndex, endIndex);

  return (
    <div className="relative bg-white">
      <div className="sticky top-0 z-50 bg-white flex justify-between items-center flex-wrap flex-nowrap min-h-[60px] shrink-0">
        <div className="flex lg:justify-start justify-center items-center flex-wrap">
          <label className="text-lg text-black font-semibold font-gilroy">
            Recurring
          </label>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-2 mt-2 mb-1">
          <div className="flex items-center ">
            {search ? (
              <>
                <div className="relative min-w-[160px] max-w-[250px] z-[3000]">
                  <div className="input-group p-0 mr-5">
                    <span className="input-group-text bg-white">
                      <img
                        src={searchteam}
                        alt="search"
                        className="h-5 w-5 transition-opacity duration-300 cursor-pointer opacity-100 pointer-events-auto"
                      />
                    </span>
                    <input data-testid="recurring-bills-handlefilter-input"
                      type="text"
                      className="form-control border-start-0 border border-l-0 border-r-0 border-[#CFD5DB] shadow-none outline-none px-2.5 py-2 font-gilroy"
                      placeholder="Search"
                      value={filterInput}
                      onChange={(e) => handlefilterInput(e)}
                      disabled
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <img data-testid="recurring-bills-close-search-img"
                        src={closecircle}
                        alt="close"
                        onClick={() => handleCloseSearch()}
                        className="h-5 w-5 cursor-pointer"
                      />
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="mt-2 border border-[#CBD5E1] rounded-full px-2 py-1.5 leading-normal h-fit">
                  <FiSearch data-testid="recurring-bills-search-icon"
                    className="h-6 w-5 transition-opacity duration-300 cursor-pointer opacity-100 pointer-events-auto"
                    onClick={handleSearch}
                  />
                </div>
              </>
            )}
          </div>

          <div className="mt-0 mr-2 cursor-pointer">
            <img
              src={excelimg}
              alt="excel"
              width={38}
              height={38}
              className={`transition-opacity duration-300 ${canReadRecurring
                ? "cursor-pointer opacity-100 pointer-events-auto"
                : "cursor-not-allowed opacity-40 pointer-events-none"
                }`}

            //    onClick={() => { if (canReadRecurring) handleAssetsExcel() }}
            />
          </div>
        </div>
      </div>

      {!canReadRecurring ? (
        <>
          <PermissionDeniedMessage />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mt-1 mb-0  sticky top-[60px] z-40">
            <div className="flex items-center gap-3">
              <button data-testid="recurring-bills-long-stay-btn"
                onClick={() => handleClick("long_stay")}
                className={`px-[25px] py-2 rounded-[20px] text-[12px] font-semibold font-gilroy ${activeStay === "long_stay"
                  ? "bg-[#1E45E1] text-white border border-[#1E45E1]"
                  : "bg-white text-[#1E1E1E] border border-[#D6D6D6]"
                  }`}
              >
                Long Stay
              </button>

              <button data-testid="recurring-bills-short-stay-btn"
                onClick={() => handleClick("short_stay")}
                className={`px-[25px] py-2 rounded-[20px] text-[12px] font-semibold font-gilroy ${activeStay === "short_stay"
                  ? "bg-[#1E45E1] text-white border border-[#1E45E1]"
                  : "bg-white text-[#1E1E1E] border border-[#D6D6D6]"
                  }`}
              >
                Short Stay
              </button>
            </div>

            <div className="mr-2">
              <PaginationList
                totalItems={recurringbills.length}
                itemsPerPage={pageSize}
                currentPage={page}
                onPageChange={(p) => setPage(p)}
                onPageSizeChange={(size) => setPageSize(size)}
              />
            </div>
          </div>

          {!recurLoader &&
            (!recurringbills || recurringbills.length === 0) &&
            activeStay === "long_stay" ? (
            <div className="my-2">
              <NoDataMessage label="Long Stay" />
            </div>
          ) : !recurLoader && activeStay === "short_stay" ? (
            <div className="h-[calc(100vh-100px)] flex justify-center items-start -translate-y-10 overflow-hidden">
              <ComingSoon />
            </div>
          ) : (
            ""
          )}

          {!loading && recurLoader && (
            <div className="fixed inset-0 flex items-center justify-center h-screen bg-transparent opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
            </div>
          )}

          {recurringbills &&
            recurringbills.length > 0 &&
            activeStay === "long_stay" && (
              <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-[12px]">
                <div
                  id="tableContainer"
                  // ref={tableContainerRef}
                  className="overflow-auto relative  h-[calc(100vh-140px)] show-scrolls"
                >
                  <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                    <thead className="sticky top-0 z-40">
                      <tr>
                        <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Name</th>

                        <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                          Last Invoice number
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                          Last Invoice Date
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                          Next Invoice Date
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Amount</th>
                        {/* <th
                      >
                       Recurring
                      </th> */}
                        <th className={`${TABLE_HEADER_CELL} text-left w-[230px] sticky right-0 z-[2] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)]`}>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedData.map((item) => (
                        <RecurringBillList
                          key={item.customerId}
                          item={item}
                          checked={checkedRows[item.customerId] ?? false}
                          onToggle={() => handleToggle(item.customerId)}
                          handleDeleteRecurringbills={
                            handleDeleteRecurringbills
                          }
                        // OnHandleshowform={handleShowForm}
                        />
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </>
      )}
    </div>
  );
}

export default RecurringBills;

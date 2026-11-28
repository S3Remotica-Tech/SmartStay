/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationList from "../../Components/PaginationList";
import { useSelector } from "react-redux";

import { useHasPermission } from "../../Utils/Permission";

import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function TransactionHistory() {
  const state = useSelector((state) => state);
  // const dispatch = useDispatch();

  const CustomerOverView = state.UsersList?.customerdetails?.transactionList;

  const {
    // canWriteModule: canWriteTenant,
    canReadModule: canReadTenant,
    // canUpdateModule: canUpdateTenant,
    // canDeleteModule: canDeleteTenant,
  } = useHasPermission("Customers");

  function formatDate(dateString) {
    if (!dateString) return "";

    const [day, month, year] = dateString.split("/");

    const date = new Date(`${year}-${month}-${day}`);

    const formattedDay = String(date.getDate()).padStart(2, "0");
    const formattedMonth = date.toLocaleString("en-US", { month: "short" });
    const formattedYear = date.getFullYear();

    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
  }

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

  const paginatedData = CustomerOverView?.slice(startIndex, endIndex);

  return (
    <div>
      {!canReadTenant ? (
        <>
          <PermissionDeniedMessage isHeightChanged={true} />
        </>
      ) : (
        <div>
          {CustomerOverView?.length === 0 ? (
            <NoDataMessage label="Transaction" isHeightChanged={true} />
          ) : (
            <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-4">
              <div
                id="tableContainer"
                // ref={tableContainerRef}
                className="overflow-auto relative  h-[calc(100vh-140px)] show-scrolls"
              >
                <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                  <thead className="sticky top-0 z-40">
                    <tr>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Date</th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Bill name
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Amount paid
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Receipt / ref.no
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Received by
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Payment mode
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData?.map((row, i) => (
                      <tr
                        key={i}
                      >
                        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                          {formatDate(row.transactionDate)}
                        </td>
                        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                          {row.billName}
                        </td>
                        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                          {row.amountPaid}
                        </td>
                        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                          {row?.transactionReferenceNumber || ""}
                          {row?.transactionReferenceNumber && row?.referenceNumber ? " / " : ""}
                          {row?.referenceNumber || ""}
                        </td>
                        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                          {row.paidTo}
                        </td>
                        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                          {row.bankName} - {row.paymentMode}
                        </td>
                        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
                          <span className="inline-flex items-center gap-[6px] h-[22px] px-[9px] rounded-[20px] text-[12px] leading-[16px] font-medium text-[#222] whitespace-nowrap bg-[rgba(179,229,187,0.3)]">
                            <span className="w-[6px] h-[6px] rounded-full bg-[#22C55E]" />
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mr-2 mt-3.5 shrink-0 bg-white">
                <PaginationList
                  totalItems={CustomerOverView.length}
                  itemsPerPage={pageSize}
                  currentPage={page}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(size) => setPageSize(size)}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TransactionHistory;

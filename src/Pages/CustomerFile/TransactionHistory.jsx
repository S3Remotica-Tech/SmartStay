/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationList from "../../Components/PaginationList";
import { useSelector } from "react-redux";

import { useHasPermission } from "../../Utils/Permission";

import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";

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
            <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-4 ">
              <div
                id="tableContainer"
                // ref={tableContainerRef}
                className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
              >
                <table className=" w-full font-gilroy">
                  <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                    <tr className="h-9">
                      <th className="w-[230px] px-2 py-1">Date</th>
                      <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                        Bill name
                      </th>
                      <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                        Amount paid
                      </th>
                      <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                        Receipt / ref.no
                      </th>
                      <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                        Received by
                      </th>
                      <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                        Payment mode
                      </th>
                      <th className="w-[230px] px-2 py-1">Status</th>
                    </tr>
                  </thead>

                  <tbody>
                    {paginatedData?.map((row, i) => (
                      <tr
                        key={i}
                        className="text-sm font-gilroy border-b border-[#E8E8E8] h-10"
                      >
                        <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                          {formatDate(row.transactionDate)}
                        </td>
                        <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                          {row.billName}
                        </td>
                        <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                          {row.amountPaid}
                        </td>
                        <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                          {row.referenceNumber || "-"}
                        </td>
                        <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                          {row.paidTo}
                        </td>
                        <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                          {row.paymentMode}
                        </td>
                        <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                          <span className="bg-[#D9FFD9] text-[#1D760E] rounded-[14px] px-2 py-1">
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

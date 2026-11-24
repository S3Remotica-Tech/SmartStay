/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { useHasPermission } from "../../Utils/Permission";
import PaginationList from "../../Components/PaginationList";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function UserEb(props) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  const [tenantReadingList, setTenantreadingList] = useState([]);

  const { canReadModule: canReadElectricity } = useHasPermission("Electricity");

  useEffect(() => {
    if (state.login?.selectedHostel_Id && props?.id) {
      dispatch({
        type: "GETPARTICULARCUSTOMERREADING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customerId: props?.id,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (state.UsersList.getParticularCustomerReadingStatus === 200) {
      setTenantreadingList(state.UsersList?.getParticularCustomerReadingList);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_PARTICULAR_CUSTOMER_READING" });
      }, 100);
    }
  }, [state.UsersList.getParticularCustomerReadingStatus]);

  const formattedTenantReadings = (
    tenantReadingList?.electricityHistory || []
  ).map((item) => {
    const [, month, year] = item.startDate.split("/");

    const billingMonth = new Date(`${year}-${month}-01`).toLocaleString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      },
    );

    const formatDate = (dateStr) => {
      const [d, m, y] = dateStr.split("/").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    };

    return {
      billingMonth,
      from: formatDate(item.startDate),
      to: formatDate(item.endDate),
      floor: item.floorName || tenantReadingList.floorName,
      room: item.roomName || tenantReadingList.roomName,
      bed: item.bedName || tenantReadingList.bedName,
      totalUnits: item.consumption || 0,
      amount: item.amount || 0,
      profilePic: tenantReadingList.profilePic || null,
      tenantName:
        `${tenantReadingList.firstName || ""} ${tenantReadingList.lastName || ""}`.trim(),
    };
  });

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

  // const startIndex = (page - 1) * pageSize;
  // const endIndex = startIndex + pageSize;

  // const paginatedData = formattedTenantReadings.slice(startIndex, endIndex);

  return (
    <>
      <div className="mt-2">
        <div className="mt-2 pb-5">
          {!canReadElectricity ? (
            <>
              <PermissionDeniedMessage isHeightChanged={true} />
            </>
          ) : formattedTenantReadings?.length > 0 ? (
            <div className="relative flex flex-col h-[calc(100vh-245px)]">
              <div className="flex-1 overflow-y-scroll overflow-x-auto show-scroll pb-0 font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)]">
                <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                  <thead className="sticky top-0 z-20">
                    <tr>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Billing month
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>From</th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>To</th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Floor</th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Room</th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Bed</th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>
                        Total units
                      </th>
                      <th className={`${TABLE_HEADER_CELL} text-left w-[230px]`}>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formattedTenantReadings?.map((row, i) => (
                      <tr
                        key={i}
                        className="align-middle"
                      >
                        <td className={TABLE_BODY_CELL}>
                          <div
                            className="max-w-[150px] truncate"
                            title={row.billingMonth}
                          >
                            {row.billingMonth}
                          </div>
                        </td>

                        <td className={TABLE_BODY_CELL}>{row.from}</td>

                        <td className={TABLE_BODY_CELL}>{row.to}</td>

                        <td className={TABLE_BODY_CELL}>
                          <div
                            className="max-w-[120px] truncate"
                            title={row.floor}
                          >
                            {row.floor}
                          </div>
                        </td>

                        <td className={TABLE_BODY_CELL}>
                          <div
                            className="max-w-[120px] truncate"
                            title={row.room}
                          >
                            {row.room}
                          </div>
                        </td>

                        <td className={TABLE_BODY_CELL}>
                          <div
                            className="max-w-[120px] truncate"
                            title={row.bed}
                          >
                            {row.bed}
                          </div>
                        </td>

                        <td className={TABLE_BODY_CELL}>{row.totalUnits}</td>

                        <td className={TABLE_BODY_CELL}>{row.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mr-2 mt-3.5">
                <PaginationList
                  totalItems={formattedTenantReadings.length}
                  itemsPerPage={pageSize}
                  currentPage={page}
                  onPageChange={(p) => setPage(p)}
                  onPageSizeChange={(size) => setPageSize(size)}
                />
              </div>
            </div>
          ) : (
            <NoDataMessage label="Electricity" isHeightChanged={true} />
          )}
        </div>
      </div>
    </>
  );
}

UserEb.propTypes = {
  handleEditRoomItem: PropTypes.func.isRequired,
  handleDeleteRoomItem: PropTypes.func.isRequired,
  handleDeleteRoomReading: PropTypes.func.isRequired,
  handleEditHostelItem: PropTypes.func.isRequired,
  handleDeleteHostelItem: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};
export default UserEb;

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import React, { useEffect, useState, useRef } from "react";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from "/src/Assets/Images/New_images/building1.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { BiDotsVerticalRounded } from "react-icons/bi";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import NoDataMessage from "../../Utils/NoDataMessage";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";


const EBRoomOverview = ({ onBack, room }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("room");
  const [roomReadingList, setRoomReadingList] = useState();
  const [tenantReadingList, setTenantreadingList] = useState();
  const [tableLoading, setTableLoading] = useState(false);

  const previousRoomRequestRef = useRef(null);

  useEffect(() => {
    if (!room?.hostelId || !room?.roomId) return;

    const payload = {
      hostelId: room.hostelId,
      roomId: room.roomId,
    };

    const requestKey = JSON.stringify(payload);

    if (previousRoomRequestRef.current === requestKey) return;

    previousRoomRequestRef.current = requestKey;

    setTableLoading(true);

    dispatch({
      type: "GETPARTICULARROOMREADING",
      payload,
    });
  }, [room?.hostelId, room?.roomId]);

  useEffect(() => {
    if (state.UsersList.getparticularRoomReadingStatus === 200) {
      setTableLoading(false);
      setRoomReadingList(
        state.UsersList?.getParticularRoomReadingList?.readings,
      );
      setTenantreadingList(
        state.UsersList?.getParticularRoomReadingList?.customers,
      );
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_PARTICULAR_ROOM_READING" });
      }, 100);
    }
  }, [state.UsersList.getparticularRoomReadingStatus]);

  const formattedReadings = roomReadingList?.map((item) => {
    const [, month, year] = item.entryDate.split("/").map(Number);

    const billingMonth = new Date(year, month - 1, 1).toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });

    const formatDate = (dateStr) => {
      const [d, m, y] = dateStr.split("/").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    };

    const formatReadingDate = (dateStr) => {
      if (!dateStr) return "-";
      const [day, month, year] = dateStr.split("/").map(Number);
      return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    };

    return {
      billingMonth: billingMonth,
      readingDate: formatReadingDate(item.entryDate),
      from: formatDate(item.startDate),
      to: formatDate(item.endDate),
      reading: item.reading,
      totalUnits: item.consumption,
      amount: item.amount,
    };
  });

  const formattedTenantReadings = tenantReadingList?.map((item) => {
    const formatDate = (dateStr) => {
      const [d, m, y] = dateStr.split("/").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    };

    const getBillingMonth = (dateStr) => {
      if (!dateStr) return "-";

      const parts = dateStr.split("/");
      if (parts.length !== 3) return "-";

      const [day, month, year] = parts.map(Number);
      if (!day || !month || !year) return "-";

      return new Date(year, month - 1, 1).toLocaleString("en-US", {
        month: "short",
        year: "numeric",
      });
    };

    return {
      fullName: item.fullName,
      profilePic: item.profilePic,
      billingMonth: getBillingMonth(item.startDate),
      from: formatDate(item.startDate),
      to: formatDate(item.endDate),
      bed: item.bedName,
      totalUnits: item.totalUnits,
      amount: item.totalAmount,
      initials: item.initials,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1440) {
        setRoomPageSize(20);
        setTenantPageSize(20);
      } else {
        setRoomPageSize(10);
        setTenantPageSize(10);
      }

      setRoomPage(1);
      setTenantPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [roomPage, setRoomPage] = useState(1);
  const [roomPageSize, setRoomPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10,
  );

  const [tenantPage, setTenantPage] = useState(1);
  const [tenantPageSize, setTenantPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10,
  );

  const roomStart = (roomPage - 1) * roomPageSize;
  const roomEnd = roomStart + roomPageSize;

  const tenantStart = (tenantPage - 1) * tenantPageSize;
  const tenantEnd = tenantStart + tenantPageSize;

  const paginatedData = (formattedReadings || []).slice(roomStart, roomEnd);
  const paginatedTenantData = (formattedTenantReadings || []).slice(
    tenantStart,
    tenantEnd,
  );

  return (
    <>
      <div>
        <div className="mb-2 px-2">
          <div className="flex items-center sticky top-1 z-[1000] bg-white p-3 h-15 -ml-3.5">
            <img
              src={leftarrow}
              alt="leftarrow"
              width={20}
              height={20}
              onClick={onBack}
              className="cursor-pointer"
            />
            <span className="font-gilroy font-semibold text-lg pl-2">
              Room Overview
            </span>
          </div>

          <div className="mt-3 rounded-xl sticky top-0 z-10 bg-white border border-gray-300 p-2 mb-3">
            <div>
              <div className="flex items-center mb-1 md:mb-0">
                <div className="ml-2 pt-2">
                  <p className="font-semibold font-gilroy text-lg mb-1">
                    {room.roomName}
                  </p>
                  <div className="flex justify-start items-center gap-2">
                    <img
                      src={building}
                      height="14"
                      width="14"
                      alt="Ground Floor"
                    />
                    <div className="text-[#4B4B4B] text-sm">
                      {room.floorName}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-3 mx-2">
          <div className="flex">
            <div
              onClick={() => setActiveTab("room")}
              className={`
    font-gilroy text-base 
    ${activeTab === "room" ? "text-black font-semibold border-b-2 border-blue-700" : "text-gray-600 font-normal border-b-2 border-transparent"} 
    cursor-pointer mr-6 pb-1.5
  `}
            >
              Reading
            </div>
            <div
              onClick={() => setActiveTab("customer")}
              className={`
    font-gilroy text-base 
    ${activeTab === "customer" ? "text-black font-semibold border-b-2 border-blue-700" : "text-gray-600 font-normal border-b-2 border-transparent"} 
    cursor-pointer pb-1.5
  `}
            >
              Occupants
            </div>
          </div>

          <div className="ml-auto flex gap-3 p-1.5 mr-2 bg-white rounded shadow-[0_2px_2px_rgba(0,0,0,0.2)]">
            <FiFilter size={20} className="cursor-pointer" />
          </div>
        </div>

        {activeTab === "room" &&
          (roomReadingList?.length === 0 ? (
            <NoDataMessage label="Room reading" />
          ) : (
            <>
              <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-[12px]">
                <div
                  id="tableContainer"
                  // ref={tableContainerRef}
                  className="overflow-auto relative  h-[calc(100vh-140px)] show-scrolls"
                >
                  <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                    <thead className="sticky top-0 z-40">
                      <tr>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>
                          Billing month
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>
                          Reading date
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>From</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>To</th>
                        <th className={`${TABLE_HEADER_CELL} text-right`}>Reading</th>
                        <th className={`${TABLE_HEADER_CELL} text-right`}>
                          Total units
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-right`}>Amount</th>
                        <th className={`${TABLE_HEADER_CELL} text-center sticky right-0 z-[2] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)]`}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData?.map((row, i) => (
                        <tr
                          key={i}
                        >
                          <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                            {row.billingMonth}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                            {row.readingDate}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                            {row.from}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                            {row.to}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#111928] text-right`}>{row.reading}</td>
                          <td className={`${TABLE_BODY_CELL} text-[#111928] text-right`}>
                            {row.totalUnits}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#111928] text-right`}>₹{row.amount}</td>
                          <td className={`${TABLE_BODY_CELL} sticky right-0 z-[1] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] bg-white text-[#111928] text-center`}>
                            <span className="inline-flex items-center justify-center w-[34px] h-[34px] rounded-[12px] border-[1px] border-[#E2E8F0] bg-white">
                              <BiDotsVerticalRounded className="text-base text-[#4A5565] rotate-[90deg]" />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {tableLoading && (
                  <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
                    <div className="w-[40px] h-[40px] rounded-full border-t-[4px] border-t-blue-700 border-r-[4px] border-r-transparent animate-spin"></div>
                  </div>
                )}

                <div className="sticky bottom-0 flex justify-end bg-white py-2 pr-2">
                  <div className="w-fit mr-2">
                    <PaginationList
                      totalItems={(formattedReadings || []).length}
                      itemsPerPage={roomPageSize}
                      currentPage={roomPage}
                      onPageChange={(p) => setRoomPage(p)}
                      onPageSizeChange={(size) => setRoomPageSize(size)}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}

        {activeTab === "customer" &&
          (tenantReadingList?.length === 0 ? (
            <NoDataMessage label={"Tenant reading"} />
          ) : (
            <>
              <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden mx-1 my-[12px]">
                <div
                  id="tableContainer"
                  // ref={tableContainerRef}
                  className="overflow-auto relative  h-[calc(100vh-140px)] show-scrolls"
                >
                  <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                    <thead className="sticky top-0 z-40">
                      <tr>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>
                          <div className="pl-1"> Name</div>
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>Billing Month</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>From</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>To</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>Bed</th>
                        <th className={`${TABLE_HEADER_CELL} text-right`}>Total Units</th>
                        <th className={`${TABLE_HEADER_CELL} text-right`}>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedTenantData?.map((row, i) => (
                        <tr
                          key={i}
                        >
                          <td className={`${TABLE_BODY_CELL} text-[#111928]`}>
                            <div className="flex items-center gap-[13px] max-w-[200px]">
                            {row.profilePic ? (
                              <img
                                src={row.profilePic}
                                alt=""
                                className="w-[30px] h-[30px] rounded-full flex-shrink-0"
                              />
                            ) : (
                              <div className="w-[30px] h-[30px] rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                {row?.initials || "-"}
                              </div>
                            )}

                            <div className="relative group min-w-0">
                              <div className="truncate whitespace-nowrap overflow-hidden cursor-default">
                                {row.fullName}
                              </div>

                              <div className="absolute left-0 top-full  z-50 hidden group-hover:block max-w-xs rounded-md bg-gray-500 px-3 py-2 text-xs text-white shadow-lg break-words whitespace-normal">
                                {row.fullName}
                              </div>
                            </div>
                            </div>
                          </td>

                          <td className={`${TABLE_BODY_CELL} text-[#314158]`}>
                            {row.billingMonth}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#314158]`}>{row.from}</td>
                          <td className={`${TABLE_BODY_CELL} text-[#314158]`}>{row.to}</td>
                          <td className={`${TABLE_BODY_CELL} overflow-hidden text-ellipsis text-[#111928]`}>
                            {row.bed}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#111928] text-right`}>
                            {row.totalUnits}
                          </td>
                          <td className={`${TABLE_BODY_CELL} text-[#111928] text-right`}>₹{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="sticky bottom-0 flex justify-end bg-white py-2 pr-2">
                  <PaginationList
                    totalItems={(formattedTenantReadings || []).length}
                    itemsPerPage={tenantPageSize}
                    currentPage={tenantPage}
                    onPageChange={(p) => setTenantPage(p)}
                    onPageSizeChange={(size) => setTenantPageSize(size)}
                  />
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

EBRoomOverview.propTypes = {
  onBack: PropTypes.func.isRequired,
  room: PropTypes.func.isRequired,
};
export default withErrorBoundary(EBRoomOverview);

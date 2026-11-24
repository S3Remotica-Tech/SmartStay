/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from "react";
import leftarrow from "../../Assets/Images/arrow-left.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import verify from "../../Assets/Images/New_images/verify.svg";
import Bed from "../../Assets/Images/New_images/Bed.svg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { Buildings, Building3 } from "iconsax-react";
import NoDataMessage from "../../Utils/NoDataMessage";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";


const EBTenantOverview = ({ tenant, onBack }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("customer");

  const [tenantReadingList, setTenantreadingList] = useState([]);

  const previousCustomerRequestRef = useRef(null);

  useEffect(() => {
    const hostelId = state.login?.selectedHostel_Id;
    const customerId = tenant?.customerId;
    if (!hostelId || !customerId) return;
    const payload = {
      hostelId,
      customerId,
    };
    const requestKey = JSON.stringify(payload);
    if (previousCustomerRequestRef.current === requestKey) return;
    previousCustomerRequestRef.current = requestKey;
    dispatch({
      type: "GETPARTICULARCUSTOMERREADING",
      payload,
    });
  }, [tenant?.customerId, state.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList.getParticularCustomerReadingStatus === 200) {
      setTenantreadingList(state.UsersList?.getParticularCustomerReadingList);
      setTimeout(() => {
        dispatch({ type: "REMOVE_GET_PARTICULAR_CUSTOMER_READING" });
      }, 100);
    }
  }, [state.UsersList.getParticularCustomerReadingStatus]);

  const billingData = [];

  const formattedTenantReadings = (
    tenantReadingList?.electricityHistory || []
  ).map((item) => {
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

    const formatDate = (dateStr) => {
      const [d, m, y] = dateStr.split("/").map(Number);
      return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    };

    return {
      billingMonth: getBillingMonth(item.startDate),
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

  const [customerPage, setCustomerPage] = useState(1);
  const [customerPageSize, setCustomerPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10,
  );

  const [roomPage, setRoomPage] = useState(1);
  const [roomPageSize, setRoomPageSize] = useState(
    window.innerWidth >= 1440 ? 20 : 10,
  );

  useEffect(() => {
    const handleResize = () => {
      const size = window.innerWidth >= 1440 ? 20 : 10;

      setCustomerPageSize(size);
      setRoomPageSize(size);

      setCustomerPage(1);
      setRoomPage(1);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setCustomerPage(1);
    setRoomPage(1);
  }, [activeTab]);

  const data = formattedTenantReadings || [];
  const PreviousReadingdata = billingData || [];

  const customerStart = (customerPage - 1) * customerPageSize;
  const customerEnd = customerStart + customerPageSize;
  const paginatedCustomerData = data.slice(customerStart, customerEnd);

  const roomStart = (roomPage - 1) * roomPageSize;
  const roomEnd = roomStart + roomPageSize;
  const paginatedRoomData = PreviousReadingdata.slice(roomStart, roomEnd);

  return (
    <>
      <div>
        <div className="mb-4 mx-2">
          <div className="flex items-center -ml-11 sticky top-1 z-[1000] bg-white px-5 py-3 h-[60px]">
            <img
              src={leftarrow}
              alt="leftarrow"
              width={20}
              height={20}
              onClick={onBack}
              className="cursor-pointer"
            />
            <span className="font-semibold text-[18px] font-gilroy pl-2.5">
              EB Bill Overview
            </span>
          </div>

          <div className="bg-white rounded-[15px] p-2 border border-gray-200">
            <div className="flex items-center gap-2 p-1">
              {tenant?.profilePic ? (
                <img
                  src={tenant.profilePic}
                  alt="Profile"
                  className="w-20 h-20 rounded-full ml-3 object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full font-gilroy ml-3 bg-gray-200 flex items-center justify-center text-2xl font-semibold text-[#44536A]">
                  {tenant?.initials || "-"}
                </div>
              )}

              <div>
                <p className="mb-1 text-[17px] font-semibold font-gilroy flex gap-1">
                  {tenant?.fullName}
                  <img
                    src={verify}
                    alt="verify"
                    className="-mt-1 inline-block"
                  />
                </p>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <Buildings size="16" color="#1E45E1" />
                    <span className="text-black font-semibold text-[14px] font-gilroy">
                      {tenant.floorName}
                    </span>
                  </div>

                  <span className="text-black font-semibold text-[14px] font-gilroy ml-1 flex gap-1 items-center">
                    <Building3 size="16" color="#1E45E1" />
                    {tenant.roomName}
                  </span>

                  <span className="text-black font-semibold text-[14px] font-gilroy ml-1">
                    <img
                      src={Bed}
                      height="14"
                      width="14"
                      alt="Bed"
                      className="mr-1.5 -mt-1 inline-block"
                    />
                    {tenant.bedName}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center mb-3 mx-2">
          <div className="flex -mt-2.5">
            <div
              onClick={() => setActiveTab("customer")}
              className={`text-[17px] font-gilroy cursor-pointer mr-6 pb-1.5 
            ${activeTab === "customer" ? "text-black font-semibold border-b-2 border-[#1E45E1]" : "text-[#4B4B4B] font-normal border-b-2 border-transparent"}`}
            >
              Current Reading
            </div>

            <div
              onClick={() => setActiveTab("room")}
              className={`text-[16px] font-gilroy cursor-pointer pb-1.5 
            ${activeTab === "room" ? "text-black font-semibold border-b-2 border-[#1E45E1]" : "text-[#4B4B4B] font-normal border-b-2 border-transparent"}`}
            >
              Previous Reading
            </div>
          </div>

          <div className="ml-auto flex gap-3 mr-2 p-1 bg-white rounded shadow-sm">
            <FiFilter size={20} className="cursor-pointer" />
          </div>
        </div>

        {activeTab === "room" &&
          (billingData?.length === 0 ? (
            <NoDataMessage label={"Room reading"} />
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
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          BILLING MONTH
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          FROM
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          TO
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          FLOOR
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          ROOM
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          BED
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          TOTAL UNITS
                        </th>
                        <th className={`${TABLE_HEADER_CELL} text-left font-gilroy text-black font-bold`}>
                          AMOUNT
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[14px] text-gray-800 font-gilroy">
                      {paginatedRoomData?.map((row, i) => (
                        <tr
                          key={i} className="text-left"
                        >
                          <td className={TABLE_BODY_CELL}>{row.billingMonth}</td>
                          <td className={TABLE_BODY_CELL}>{row.from}</td>
                          <td className={TABLE_BODY_CELL}>{row.to}</td>
                          <td className={TABLE_BODY_CELL}>{row.floor}</td>
                          <td className={TABLE_BODY_CELL}>{row.room}</td>
                          <td className={TABLE_BODY_CELL}>{row.bed}</td>
                          <td className={TABLE_BODY_CELL}>{row.units}</td>
                          <td className={TABLE_BODY_CELL}>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end w-full pr-2 shrink-0 bg-white">
                  <div className="w-fit">
                    <PaginationList
                      // totalItems={PreviousReadingdata.length}
                      // itemsPerPage={pageSize}
                      // currentPage={page}
                      // onPageChange={(p) => setPage(p)}
                      // onPageSizeChange={(size) => setPageSize(size)}
                      totalItems={PreviousReadingdata.length}
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
          (formattedTenantReadings?.length === 0 ? (
            <NoDataMessage label={"No reading"} />
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
                        <th className={`${TABLE_HEADER_CELL} text-left`}>From</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>To</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>Floor</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>Room</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>Bed</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>Total units</th>
                        <th className={`${TABLE_HEADER_CELL} text-left`}>Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedCustomerData?.map((row, i) => (
                        <tr key={i}>
                          <td className={TABLE_BODY_CELL}>
                            {row.billingMonth}
                          </td>
                          <td className={TABLE_BODY_CELL}>
                            {row.from}
                          </td>
                          <td className={TABLE_BODY_CELL}>
                            {row.to}
                          </td>

                          <td className={`${TABLE_BODY_CELL} align-middle`}>
                            <div className="truncate whitespace-nowrap overflow-hidden w-[120px]">
                              {row.floor}
                            </div>
                          </td>

                          <td className={TABLE_BODY_CELL}>
                            {row.room}
                          </td>
                          <td className={TABLE_BODY_CELL}>
                            {row.bed}
                          </td>
                          <td className={TABLE_BODY_CELL}>{row.totalUnits}</td>
                          <td className={TABLE_BODY_CELL}>{row.amount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end w-full pr-2 shrink-0 bg-white">
                  <div className="w-fit">
                    <PaginationList
                      // totalItems={data.length}
                      // itemsPerPage={pageSize}
                      // currentPage={page}
                      // onPageChange={(p) => setPage(p)}
                      // onPageSizeChange={(size) => setPageSize(size)}
                      totalItems={data.length}
                      itemsPerPage={customerPageSize}
                      currentPage={customerPage}
                      onPageChange={(p) => setCustomerPage(p)}
                      onPageSizeChange={(size) => setCustomerPageSize(size)}
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
};

EBTenantOverview.propTypes = {
  onBack: PropTypes.func.isRequired,
  tenant: PropTypes.func.isRequired,
};
export default withErrorBoundary(EBTenantOverview);

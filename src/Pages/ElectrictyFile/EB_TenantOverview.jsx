/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from "/src/Assets/Images/New_images/building1.svg";
import Profile from "../../Assets/Images/Profile.jpg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import verify from "../../Assets/Images/New_images/verify.svg";
import Bed from "../../Assets/Images/New_images/Bed.svg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import { Buildings, Building3 } from "iconsax-react";

const EBTenantOverview = ({ tenant, onBack }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("customer");
  // const [loading, setLoading] = useState(false);

  const [tenantReadingList, setTenantreadingList] = useState([]);

  // console.log("tenant called", tenant);

  useEffect(() => {
    if (state.login?.selectedHostel_Id && tenant?.customerId) {
      dispatch({
        type: "GETPARTICULARCUSTOMERREADING",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          customerId: tenant.customerId,
        },
      });
      // setLoading(true)
    }
  }, [tenant?.customerId, state.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList.getParticularCustomerReadingStatus === 200) {
      // setLoading(false)
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
            <div className="flex justify-center text-center mt-6 animated-text">
              <div className="2xl:mt-20">
                <img src={emptyimg} width={200} height={200} alt="emptystate" />

                <div className="pb-1 mt-2 font-semibold font-gilroy text-[18px] text-[#4B4B4B]">
                  No Room Reading
                </div>

                <div className="pb-1 font-medium font-gilroy text-[14px] text-[#4B4B4B]">
                  There are no Room Reading available.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                <div
                  id="tableContainer"
                  // ref={tableContainerRef}
                  className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                >
                  <table className=" w-full font-gilroy">
                    <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                      <tr className="h-9">
                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                          BILLING MONTH
                        </th>
                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                          FROM
                        </th>
                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                          TO
                        </th>
                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                          FLOOR
                        </th>
                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                          ROOM
                        </th>
                        <th className="font-gilroy text-black font-bold text-[14px] px-4 py-2">
                          BED
                        </th>
                        <th className="font-gilroy text-black font-bold text-[14px] px-4 py-2">
                          TOTAL UNITS
                        </th>
                        <th className="font-gilroy text-black font-bold text-[14px] px-4 py-2">
                          AMOUNT
                        </th>
                      </tr>
                    </thead>

                    <tbody className="text-[14px] text-gray-800 font-gilroy">
                      {paginatedRoomData?.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-gray-300 text-left"
                        >
                          <td className="px-2 py-1">{row.billingMonth}</td>
                          <td className="px-2 py-1">{row.from}</td>
                          <td className="px-2 py-1">{row.to}</td>
                          <td className="px-2 py-1">{row.floor}</td>
                          <td className="px-2 py-1">{row.room}</td>
                          <td className="px-2 py-1">{row.bed}</td>
                          <td className="px-2 py-1">{row.units}</td>
                          <td className="px-2 py-1">{row.amount}</td>
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
            <div className="flex justify-center text-center mt-6 animated-text">
              <div className="2xl:mt-20">
                <img src={emptyimg} width={200} height={200} alt="emptystate" />

                <div className="pb-1 mt-2 font-semibold font-gilroy text-[18px] text-[#4B4B4B]">
                  No Reading
                </div>

                <div className="pb-1 font-medium font-gilroy text-[14px] text-[#4B4B4B]">
                  There are no reading available.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-3 ">
                <div
                  id="tableContainer"
                  // ref={tableContainerRef}
                  className="overflow-auto relative  h-[calc(100vh-140px)]  rounded-xl show-scrolls"
                >
                  <table className=" w-full font-gilroy">
                    <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                      <tr className="h-9">
                        <th className="px-2 whitespace-nowrap">
                          Billing month
                        </th>
                        <th className="px-2">From</th>
                        <th className="px-2">To</th>
                        <th className="px-2">Floor</th>
                        <th className="px-2">Room</th>
                        <th className="px-2">Bed</th>
                        <th className="px-2 whitespace-nowrap">Total units</th>
                        <th className="px-2">Amount</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedCustomerData?.map((row, i) => (
                        <tr key={i} className="border-b border-[#E8E8E8] h-10">
                          <td className="px-2 py-1 whitespace-nowrap">
                            {row.billingMonth}
                          </td>
                          <td className="px-2 py-1 whitespace-nowrap">
                            {row.from}
                          </td>
                          <td className="px-2 py-1 whitespace-nowrap">
                            {row.to}
                          </td>

                          <td className="px-2 py-1 align-middle">
                            <div className="truncate whitespace-nowrap overflow-hidden w-[120px]">
                              {row.floor}
                            </div>
                          </td>

                          <td className="px-2 py-1 whitespace-nowrap">
                            {row.room}
                          </td>
                          <td className="px-2 py-1 whitespace-nowrap">
                            {row.bed}
                          </td>
                          <td className="px-2 py-1">{row.totalUnits}</td>
                          <td className="px-2 py-1">{row.amount}</td>
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

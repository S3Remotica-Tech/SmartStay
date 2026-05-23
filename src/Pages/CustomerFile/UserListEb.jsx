/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from 'iconsax-react';
import PropTypes from "prop-types";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
// import Select from "react-select";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import PaginationList from "../../Components/PaginationList";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";

function UserEb(props) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();

  // const [EbrowsPerPage, setEbrowsPerPage] = useState(4);
  // const [EbcurrentPage, setEbCurrentPage] = useState(1);
  // const [EbFilterddata, setEbFilterddata] = useState([]);
  const [tenantReadingList, setTenantreadingList] = useState([]);
  // const indexOfLastRowEb = EbcurrentPage * EbrowsPerPage;
  // const indexOfFirstRowEb = indexOfLastRowEb - EbrowsPerPage;

  // const [selectedHostel, setSelectedHostel] = useState("");

  // const handleEbPageChange = (EbpageNumber) => {
  //   setEbCurrentPage(EbpageNumber);

  // }

  // const ebOptions = [
  //   { value: 4, label: "4" },
  //   { value: 10, label: "10" },
  //   { value: 50, label: "50" },
  //   { value: 100, label: "100" },
  // ];

  // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  // const canReadElectricity = useHasPermission("Electricity", "canRead")
  //   const canWriteElectricity = useHasPermission("Electricity", "canWrite");
  //   const canUpdateElectricity = useHasPermission("Electricity", "canUpdate");
  //   const canDeleteElectricity = useHasPermission("Electricity", "canDelete");

  const {
    // canWriteModule: canWriteElectricity,
    canReadModule: canReadElectricity,
    // canUpdateModule: canUpdateElectricity,
    // canDeleteModule: canDeleteElectricity,
  } = useHasPermission("Electricity");

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
      // setLoading(false)
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

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const paginatedData = formattedTenantReadings.slice(startIndex, endIndex);

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
              <div className="flex-1 overflow-y-scroll overflow-x-auto show-scroll pb-0 ">
                <table className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium">
                  <thead className="bg-blue-100 sticky top-0 z-20">
                    <tr className="h-9">
                      <th className="w-[230px] px-2 whitespace-nowrap">
                        Billing month
                      </th>
                      <th className="w-[230px] px-2">From</th>
                      <th className="w-[230px] px-2">To</th>
                      <th className="w-[230px] px-2">Floor</th>
                      <th className="w-[230px] px-2">Room</th>
                      <th className="w-[230px] px-2">Bed</th>
                      <th className="w-[230px] px-2 whitespace-nowrap">
                        Total units
                      </th>
                      <th className="w-[230px] px-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formattedTenantReadings?.map((row, i) => (
                      <tr className="text-sm font-gilroy border-b border-[#E8E8E8] h-10 align-middle">
                        <td className="py-1 px-2">
                          <div
                            className="max-w-[150px] truncate"
                            title={row.billingMonth}
                          >
                            {row.billingMonth}
                          </div>
                        </td>

                        <td className="py-1 px-2">{row.from}</td>

                        <td className="py-1 px-2">{row.to}</td>

                        <td className="py-1 px-2">
                          <div
                            className="max-w-[120px] truncate"
                            title={row.floor}
                          >
                            {row.floor}
                          </div>
                        </td>

                        <td className="py-1 px-2">
                          <div
                            className="max-w-[120px] truncate"
                            title={row.room}
                          >
                            {row.room}
                          </div>
                        </td>

                        <td className="py-1 px-2">
                          <div
                            className="max-w-[120px] truncate"
                            title={row.bed}
                          >
                            {row.bed}
                          </div>
                        </td>

                        <td className="py-1 px-2">{row.totalUnits}</td>

                        <td className="py-1 px-2">{row.amount}</td>
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
            <div className="mt-4 flex justify-center">
              <div className="flex flex-col items-center justify-center">
                <div className="2xl:mt-24 text-center">
                  <img src={Emptystate} alt="emptystate" />
                </div>

                <div className="pb-1 text-center font-bold font-gilroy text-[16px] text-[#4B4B4B]">
                  No Electricity available
                </div>
                <div className="pb-1 text-center font-medium font-gilroy text-[14px] text-[#4B4B4B]">
                  There are no Electricity added.
                </div>
              </div>
            </div>
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

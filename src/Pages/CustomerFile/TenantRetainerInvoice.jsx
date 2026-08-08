/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// import LoaderComponent from "../LoaderComponent";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationList from "../../Components/PaginationList";
import { useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import { useNavigate } from "react-router-dom";
import NoDataMessage from "../../Utils/NoDataMessage";
import {
  Filter,
  Export,
  ArrowLeft,
  ArrowUp2,
  ArrowSwapVertical,
  Setting3,
  SearchNormal1,
  Buildings,
  ArrowDown2,
  ArrowDown,
  CloseCircle,
  Document,
  Link21,
  AddCircle,
} from "iconsax-react";
import { toast } from "react-toastify";
import ComingSoon from "../../Utils/ComingSoon";
import FormComingSoon from "../../Utils/FormComingSoon";

function TenantRetainerInvoice() {
  const state = useSelector((state) => state);
  const CustomerOverView = state.UsersList?.customerdetails?.transactionList;

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(window.innerWidth >= 1440 ? 20 : 10);
  const navigate = useNavigate();

  const { canUpdateModule: canUpdateInvoice, canReadModule: canReadInvoice } =
    useHasPermission("Bills");

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
  const stats = [
    {
      label: "Booking",
      value: "0",
      isFilter: true,
    },
    {
      label: "Advance",
      value: "0",
    },
    {
      label: "Rent",
      value: "0",
      isFilter: true,
    },
    {
      label: "EB",
      value: "0",
    },
    {
      label: "General",
      value: "0",
      icon: false,
    },
    {
      label: "Total Retainer Available",
      value: "0",
      icon: true,
      highlight: true,
    },
  ];

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding invoice information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }

    navigate(`/add-retainer/${state.login.selectedHostel_Id}`, {
      state: {
        isTenantOverviewWay: true,
        customerId: state?.UsersList?.customerdetails?.customerId,
      },
    });
  };

  // console.log("CustomerOverView", CustomerOverView);
  const isComingSoon =
    import.meta.env.MODE === "production" || import.meta.env.MODE === "qa";

  return (
    <div className="my-6">
      <div className="flex justify-end w-full lg:-mt-[65px] mb-6 ">
        <button
          disabled={!canUpdateInvoice || isComingSoon}
          onClick={handleShow}
          className="bg-[#1E45E1] hover:bg-[#1E45E1] text-white text-[14px] font-semibold
                              rounded-md px-4 py-2  whitespace-nowrap font-gilroy
                              disabled:opacity-50 disabled:cursor-not-allowed  flex items-center gap-2"
        >
          <AddCircle color="#FFFFFF" size="16" /> Retainer
        </button>
      </div>
      {!canReadInvoice ? (
        <>
          <PermissionDeniedMessage isHeightChanged={true} />
        </>
      ) : (
        <div>
          {isComingSoon ? (
            // <NoDataMessage label="Retainer" isHeightChanged={true} />

            <FormComingSoon />
          ) : (
            <div>
              <div
                className="w-full my-6 bg-[#F9F9F9] rounded-xl px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between
               gap-4 sm:gap-6 md:gap-10 font-gilroy"
              >
                {stats.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.highlight && (
                      <div className="w-10 h-10 rounded-full bg-[#FAFFF6] flex items-center justify-center text-[#F97316] font-semibold">
                        {item.icon && (
                          <ArrowDown
                            color="#038C3D"
                            size="18"
                            className="rotate-[210deg]"
                          />
                        )}
                      </div>
                    )}

                    <div>
                      <div className="text-xs text-[#6B7280] flex items-center gap-1 whitespace-nowrap">
                        {item.label}

                        <div className="relative group w-fit">
                          {item.isFilter && (
                            <Filter
                              size="14"
                              color="#9CA3AF"
                              className="cursor-pointer"
                            />
                          )}

                          <div
                            className="absolute left-1/2 -translate-x-1/2 mt-2 
                                    hidden group-hover:flex
                                    px-3 py-1.5 bg-[#4B5563] text-white text-xs rounded-md 
                                    items-center gap-1 whitespace-nowrap z-50"
                          >
                            <Filter size="14" color="#fff" />
                            Click to Filter
                          </div>
                        </div>
                      </div>

                      <div className="text-lg font-semibold text-[#111827]">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-white   rounded-xl shadow-sm border border-[#E8E8E8] mx-1 my-4 ">
                <div
                  id="tableContainer"
                  // ref={tableContainerRef}
                  className="overflow-auto relative  max-h-[500px]  rounded-xl show-scrolls"
                >
                  <table className=" w-full font-gilroy">
                    <thead className="bg-[#F9FAFB] sticky top-0 z-40 text-[#6B7280] text-xs uppercase">
                      <tr className="h-9">
                        <th className="w-[230px] px-2 py-1">Date</th>
                        <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                          Inv No
                        </th>
                        <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                          Bill Type
                        </th>
                        <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                          Amount
                        </th>
                        <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                          Available balance
                        </th>
                        <th className="w-[230px] px-2 py-1 whitespace-nowrap">
                          Payment mode
                        </th>
                        <th className="w-[230px] px-2 py-1">Status</th>
                        <th className="w-[230px] px-2 py-1">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginatedData?.map((row, i) => (
                        <tr
                          key={i}
                          className="text-sm font-gilroy border-b border-[#E8E8E8] h-10"
                        >
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap"></td>
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap"></td>
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap"></td>
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap"></td>
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap"></td>
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap"></td>
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap">
                            <span className="bg-[#D9FFD9] text-[#1D760E] rounded-[14px] px-2 py-1"></span>
                          </td>
                          <td className="w-[230px] py-1 px-2 whitespace-nowrap"></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mr-2 mt-3.5 shrink-0 bg-white">
                  <PaginationList
                    totalItems={CustomerOverView?.length}
                    itemsPerPage={pageSize}
                    currentPage={page}
                    onPageChange={(p) => setPage(p)}
                    onPageSizeChange={(size) => setPageSize(size)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TenantRetainerInvoice;

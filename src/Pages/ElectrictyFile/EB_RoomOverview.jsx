/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from '/src/Assets/Images/New_images/building1.svg';
import Ellipse1 from "../../Assets/Images/Profile.jpg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import { Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { BiDotsVerticalRounded } from "react-icons/bi";
import withErrorBoundary from "../../Hoc/WithErrorBountry";


const EBRoomOverview = ({ onBack, room }) => {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("room");
    const [roomReadingList, setRoomReadingList] = useState();
    const [tenantReadingList, setTenantreadingList] = useState()
    const [tableLoading, setTableLoading] = useState(false)



    useEffect(() => {
        if (room.hostelId && room.roomId) {
            dispatch({ type: 'GETPARTICULARROOMREADING', payload: { hostelId: room.hostelId, roomId: room.roomId } })
            setTableLoading(true)
        }
    }, [])

    useEffect(() => {
        if (state.UsersList.getparticularRoomReadingStatus === 200) {
            setTableLoading(false)
            setRoomReadingList(state.UsersList?.getParticularRoomReadingList?.readings)
            setTenantreadingList(state.UsersList?.getParticularRoomReadingList?.customers)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_PARTICULAR_ROOM_READING' })
            }, 100)

        }

    }, [state.UsersList.getparticularRoomReadingStatus])


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
            initials: item.initials
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
        window.innerWidth >= 1440 ? 20 : 10
    );

    const [tenantPage, setTenantPage] = useState(1);
    const [tenantPageSize, setTenantPageSize] = useState(
        window.innerWidth >= 1440 ? 20 : 10
    );

    const roomStart = (roomPage - 1) * roomPageSize;
    const roomEnd = roomStart + roomPageSize;

    const tenantStart = (tenantPage - 1) * tenantPageSize;
    const tenantEnd = tenantStart + tenantPageSize;

    const paginatedData = (formattedReadings || []).slice(roomStart, roomEnd);
    const paginatedTenantData = (formattedTenantReadings || []).slice(tenantStart, tenantEnd);

    return (
        <>
            <div>
                <div className="mb-2 px-2">

                    <div
                        className="flex items-center sticky top-1 z-[1000] bg-white p-3 h-15 -ml-3.5">
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
                                        <img src={building} height="14" width="14" alt="Ground Floor" />
                                        <div className="text-[#4B4B4B] text-sm" >{room.floorName}</div>
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

                {activeTab === "room" && (
                    roomReadingList?.length === 0 ? (
                        <div className="flex justify-center text-center mt-9 animated-text">
                            <div className="2xl:mt-20">
                                <img src={emptyimg} width={240} height={240} alt="emptystate" className="mb-2" />
                                <div className="pb-1 text-center font-gilroy font-semibold text-lg text-[#4B4B4B]">
                                    No Room Reading
                                </div>
                                <div className="pb-1 text-center font-gilroy font-medium text-sm text-[#4B4B4B]"
                                >
                                    There are no Room Reading available.
                                </div>
                            </div>
                        </div>
                    ) : (

                        <>
                            <div className="relative flex flex-col h-[calc(100vh-225px)]">
                                <div className="flex-1 overflow-y-scroll overflow-x-auto show-scroll">
                                    <table className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium">
                                        <thead className="bg-blue-100 sticky top-0 z-20">
                                            <tr className="h-9">
                                                <th className="w-[230px] px-2 whitespace-nowrap">Billing month</th>
                                                <th className="w-[230px] px-2 whitespace-nowrap">Reading date</th>
                                                <th className="w-[230px] px-2">From</th>
                                                <th className="w-[230px] px-2">To</th>
                                                <th className="w-[230px] px-2">Reading</th>
                                                <th className="w-[230px] px-2 whitespace-nowrap">Total units</th>
                                                <th className="w-[230px] px-2">Amount</th>
                                                <th className="w-[230px] px-2">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedData?.map((row, i) => (
                                                <tr key={i} className="text-sm font-gilroy border-b border-[#E8E8E8] h-10">

                                                    <td className="w-[230px] py-1 px-2 whitespace-nowrap">{row.billingMonth}</td>
                                                    <td className="w-[230px] py-1 px-2 whitespace-nowrap">{row.readingDate}</td>
                                                    <td className="w-[230px] py-1 px-2 whitespace-nowrap">{row.from}</td>
                                                    <td className="w-[230px] py-1 px-2 whitespace-nowrap">{row.to}</td>
                                                    <td className="w-[230px] py-1 px-2">{row.reading}</td>
                                                    <td className="w-[230px] py-1 px-2">{row.totalUnits}</td>
                                                    <td className="w-[230px] py-1 px-2">{row.amount}</td>
                                                    <td className="w-[230px] py-1 px-2">
                                                        <BiDotsVerticalRounded className="text-2xl text-gray-600 cursor-pointer rotate-[90deg]" />
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
                    )
                )}

                {activeTab === "customer" && (
                    tenantReadingList?.length === 0 ? (
                        <div className="flex justify-center text-center mt-9 animated-text">
                            <div className="2xl:mt-20">
                                <img src={emptyimg} width={240} height={240} alt="emptystate" className="mb-2" />
                                <div className="pb-1 text-center font-gilroy font-semibold text-lg text-[#4B4B4B]">
                                    No tenant reading
                                </div>
                                <div className="pb-1 text-center font-gilroy font-medium text-sm text-[#4B4B4B]">
                                    There are no tenant reading available.
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
                             <div className="relative flex flex-col h-[calc(100vh-225px)]">
                                <div className="flex-1 overflow-x-auto show-scroll mb-2 pb-2">
                                    <table className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium">
                                        <thead className="bg-blue-100 sticky top-0 z-20">
                                            <tr className="h-9">
                                                <th className="w-[230px] px-2"><div className="pl-1"> Name</div></th>
                                                <th className="w-[230px] px-2">
                                                    Billing Month
                                                </th>
                                                <th className="w-[230px] px-2">
                                                    From
                                                </th>
                                                <th className="w-[230px] px-2">
                                                    To
                                                </th>
                                                <th className="w-[230px] px-2">
                                                    Bed
                                                </th>
                                                <th className="w-[230px] px-2">
                                                    Total Units
                                                </th>
                                                <th className="w-[230px] px-2">
                                                    Amount
                                                </th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paginatedTenantData?.map((row, i) => (
                                                <tr key={i} className="text-sm font-gilroy border-b border-[#E8E8E8] h-10">

                                                    <td className="p-1 px-1 flex items-center gap-2 max-w-[100px]">
                                                        {
                                                            row.profilePic ?
                                                                <img src={row.profilePic} alt="" className="mr-2 w-8 h-8 flex-shrink-0" />
                                                                :
                                                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                                                                    {row?.initials || "-"}
                                                                </div>
                                                        }

                                                        <div className="truncate whitespace-nowrap overflow-hidden">
                                                            {row.fullName}
                                                        </div>
                                                    </td>

                                                    <td className="w-[230px] px-2 py-1">{row.billingMonth}</td>
                                                    <td className="w-[230px] px-2 py-1">{row.from}</td>
                                                    <td className="w-[230px] px-2 py-1">{row.to}</td>
                                                    <td className="whitespace-nowrap overflow-hidden text-ellipsis">{row.bed}</td>
                                                    <td className="w-[230px] px-2 py-1">{row.totalUnits}</td>
                                                    <td className="w-[230px] px-2 py-1">{row.amount}</td>

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
                    )
                )}
            </div>
        </>
    );
};

EBRoomOverview.propTypes = {
    onBack: PropTypes.func.isRequired,
    room: PropTypes.func.isRequired,
};
export default withErrorBoundary(EBRoomOverview);

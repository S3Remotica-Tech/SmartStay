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


    return (
        <>
            <div>
                <div className="mb-2 px-3">

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

                    <div className="mt-3 rounded-xl sticky top-0 z-10 bg-white border border-gray-300 p-2.5 mb-3">
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

                <div className="flex items-center mb-3 mx-4">
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
                        <div className="flex justify-center text-center mt-9">
                            <div>
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
                        <div
                            className="table-responsive mx-2 show-scroll max-h-[310px] lg:max-h-[310px] md:max-h-[250px] overflow-y-auto border-t border-[#E8E8E8] mb-5 mt-2 px-0"
                        >
                            <Table bordered={false}
                                className="min-w-full border-collapse sticky top-0 z-1 font-gilroy text-[14px] font-medium text-[#222222] not-italic rounded-none"
                            >
                                <thead className="bg-blue-100 sticky top-0 z-10 text-gray-800 font-medium text-sm"
                                >
                                    <tr>
                                        <th>
                                            BILLING MONTH
                                        </th>
                                        <th >
                                            READING DATE
                                        </th>
                                        <th>
                                            FROM
                                        </th>
                                        <th>
                                            TO
                                        </th>
                                        <th>
                                            READING
                                        </th>
                                        <th>
                                            TOTAL UNITS
                                        </th>
                                        <th>
                                            AMOUNT
                                        </th>

                                        <th>
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm text-black">
                                    <PaginationList>
                                        {formattedReadings?.map((row, i) => (
                                            <tr key={i} className="border-b border-gray-300 h-10 m-2 text-black font-gilroy text-sm align-middle">

                                                <td>{row.billingMonth}</td>
                                                <td>{row.readingDate}</td>
                                                <td>{row.from}</td>
                                                <td>{row.to}</td>
                                                <td>{row.reading}</td>
                                                <td>{row.totalUnits}</td>
                                                <td>{row.amount}</td>
                                                <td>
                                                    <BiDotsVerticalRounded className="text-black text-[19px] cursor-pointer rotate-[90deg]" />
                                                </td>
                                            </tr>
                                        ))}
                                    </PaginationList>
                                </tbody>
                            </Table>

                            {tableLoading && (
                                <div className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
                                    <div className="w-[40px] h-[40px] rounded-full border-t-[4px] border-t-blue-700 border-r-[4px] border-r-transparent animate-spin"></div>
                                </div>
                            )}

                        </div>
                    )
                )}

                {activeTab === "customer" && (
                    tenantReadingList?.length === 0 ? (
                        <div className="flex justify-center text-center mt-9">
                            <div>
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
                        <div className="table-responsive mx-2 show-scrolls overflow-y-auto border-t border-[#E8E8E8] mb-5 mt-2 px-0 max-h-[310px] lg:max-h-[310px] md:max-h-[230px]"
                        >
                            <Table bordered={false}
                                className="min-w-full border-collapse sticky top-0 z-1 font-gilroy text-[14px] font-medium text-[#222222] not-italic rounded-none">
                                <thead className="bg-blue-100 sticky top-0 z-10 text-gray-800 font-medium text-sm">
                                    <tr>
                                        <th><div className="pl-1"> NAME</div></th>
                                        <th>
                                            BILLING MONTH
                                        </th>
                                        <th>
                                            FROM
                                        </th>
                                        <th>
                                            TO
                                        </th>
                                        <th >
                                            BED
                                        </th>
                                        <th>
                                            TOTAL UNITS
                                        </th>
                                        <th>
                                            AMOUNT
                                        </th>


                                    </tr>
                                </thead>
                                <tbody className="text-sm text-black">
                                    <PaginationList>
                                        {formattedTenantReadings?.map((row, i) => (
                                            <tr key={i} className="border-b border-gray-300 h-10 m-2 text-black font-gilroy text-sm align-middle">

                                                <td className="p-1 d-flex align-items-center gap-2 ml-1">
                                                    {
                                                        formattedTenantReadings.profilePic ?
                                                            <img src={formattedTenantReadings.profilePic ? formattedTenantReadings.profilePic : Ellipse1} alt="" className="mr-3 w-11 h-11" />
                                                            :
                                                            <div
                                                               className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-sm font-semibold font-gilroy"> {row?.initials || "-"}
                                                            </div>
                                                    }
                                                    {row.fullName}
                                                </td>

                                              <td>{row.billingMonth}</td>
                                              <td>{row.from}</td>
                                              <td>{row.to}</td>
                                              <td>{row.bed}</td>
                                              <td>{row.totalUnits}</td>
                                              <td>{row.amount}</td>

                                            </tr>
                                        ))}
                                    </PaginationList>
                                </tbody>
                            </Table>
                        </div>
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

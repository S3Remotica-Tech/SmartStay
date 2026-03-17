

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from '/src/Assets/Images/New_images/building1.svg';
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

const EBTenantOverview = ({ tenant, onBack }) => {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("customer");
    // const [loading, setLoading] = useState(false);

    const [tenantReadingList, setTenantreadingList] = useState([])

    // console.log("tenant called", tenant)

    useEffect(() => {
        if (state.login?.selectedHostel_Id && tenant?.customerId) {
            dispatch({
                type: 'GETPARTICULARCUSTOMERREADING',
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    customerId: tenant.customerId
                }
            })
            // setLoading(true)
        }

    }, [tenant?.customerId, state.login?.selectedHostel_Id])


    useEffect(() => {
        if (state.UsersList.getParticularCustomerReadingStatus === 200) {
            // setLoading(false)
            setTenantreadingList(state.UsersList?.getParticularCustomerReadingList)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_PARTICULAR_CUSTOMER_READING' })
            }, 100)

        }

    }, [state.UsersList.getParticularCustomerReadingStatus])



    const billingData = [];

    const formattedTenantReadings = (tenantReadingList?.electricityHistory || []).map((item) => {


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
            tenantName: `${tenantReadingList.firstName || ""} ${tenantReadingList.lastName || ""}`.trim(),
        };
    });









    return (
        <>
            <div>

                <div className="mb-4 mx-4">
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

                    <div className="bg-white rounded-[15px] border border-gray-200">

                        <div className="flex items-center gap-3 p-1">

                            <img
                                src={tenant?.profilePic || Profile}
                                alt="Profile"
                                className="w-20 h-20 rounded-full ml-3"
                            />

                            <div>
                                <p className="mb-1 text-[17px] font-semibold font-gilroy">
                                    {tenant?.fullName}
                                    <img
                                        src={verify}
                                        alt="verify"
                                        className="-mt-1 inline-block"
                                    />
                                </p>

                                <div className="flex items-center gap-4">

                                    <div className="flex items-center gap-1.5">
                                        <img src={building} height="14" width="14" alt="Floor" />
                                        <span className="text-black font-semibold text-[14px] font-gilroy">
                                            {tenant.floorName}
                                        </span>
                                    </div>

                                    <span className="text-black font-semibold text-[14px] font-gilroy ml-1">
                                        <img
                                            src={Bed}
                                            height="14"
                                            width="14"
                                            alt="Bed"
                                            className="mr-1.5 -mt-1 inline-block"
                                        />
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


                <div className="flex items-center mb-3 mx-4">

                    <div className="flex ml-[2px] -mt-2.5">
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

                {activeTab === "room" && (
                    billingData?.length === 0 ? (

                        <div className="flex justify-center text-center mt-6">

                            <div>
                                <img
                                    src={emptyimg}
                                    width={200}
                                    height={200}
                                    alt="emptystate"
                                />

                                <div className="pb-1 mt-2 font-semibold font-gilroy text-[18px] text-[#4B4B4B]">
                                    No Room Reading
                                </div>

                                <div className="pb-1 font-medium font-gilroy text-[14px] text-[#4B4B4B]">
                                    There are no Room Reading available.
                                </div>
                            </div>

                        </div>
                    ) : (
                       <div className="mx-6 bg-white shadow-md max-h-[350px] lg:max-h-[350px] md:max-h-[230px] overflow-y-auto show-scroll border-t border-gray-200">

                            <table className="w-full border-collapse">

                                <thead className="bg-blue-100 sticky top-0 z-10 font-gilroy">

                                    <tr className="text-left">
                                        
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
                                    <PaginationList>
                                        {billingData?.map((row, i) => (
                                            <tr key={i} className="border-b border-gray-300 text-left">
                                                
                                               <td className="px-4 py-2">
                                                    {row.billingMonth}
                                                </td>
                                               <td className="px-4 py-2">
                                                    {row.from}
                                                </td>
                                               <td className="px-4 py-2">
                                                    {row.to}
                                                </td>
                                               <td className="px-4 py-2">
                                                    {row.floor}
                                                </td>
                                               <td className="px-4 py-2">
                                                    {row.room}
                                                </td>
                                               <td className="px-4 py-2">
                                                    {row.bed}
                                                </td>
                                               <td className="px-4 py-2">
                                                    {row.units}
                                                </td>
                                               <td className="px-4 py-2">
                                                    {row.amount}
                                                </td>

                                            </tr>
                                        ))}
                                    </PaginationList>
                                </tbody>

                            </table>

                        </div>
                    )
                )}

                {activeTab === "customer" && (
                    formattedTenantReadings?.length === 0 ? (

                        <div className="flex justify-center text-center mt-6">

                            <div>
                                <img
                                    src={emptyimg}
                                    width={200}
                                    height={200}
                                    alt="emptystate"
                                />

                                <div className="pb-1 mt-2 font-semibold font-gilroy text-[18px] text-[#4B4B4B]">
                                    No Reading
                                </div>

                                <div className="pb-1 font-medium font-gilroy text-[14px] text-[#4B4B4B]">
                                    There are no reading available.
                                </div>
                            </div>

                        </div>
                    ) : (

                        <div className="mx-6 bg-white shadow-md max-h-[350px] lg:max-h-[350px] md:max-h-[230px] overflow-y-auto show-scroll border-t border-gray-200">

                            <table className="w-full border-collapse">

                                <thead className="bg-blue-100 sticky top-0 z-10 font-gilroy">

                                    <tr className="text-left">
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
                                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                                            BED
                                        </th>
                                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                                            TOTAL UNITS
                                        </th>
                                        <th className="font-gilroy text-black font-bold text-[13px] px-4 py-2">
                                            AMOUNT
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="text-[14px] text-gray-800 font-gilroy">
                                    <PaginationList>
                                        {formattedTenantReadings?.map((row, i) => (
                                            <tr key={i} className="border-b border-gray-300">

                                                <td className="px-4 py-2">{row.billingMonth}</td>
                                                <td className="px-4 py-2">{row.from}</td>
                                                <td className="px-4 py-2">{row.to}</td>
                                                <td className="px-4 py-2">{row.floor}</td>
                                                <td className="px-4 py-2">{row.room}</td>
                                                <td className="px-4 py-2">{row.bed}</td>
                                                <td className="px-4 py-2">{row.totalUnits}</td>
                                                <td className="px-4 py-2">{row.amount}</td>

                                            </tr>
                                        ))}
                                    </PaginationList>
                                </tbody>

                            </table>

                        </div>
                    )
                )}
            </div>
        </>
    );
};

EBTenantOverview.propTypes = {
    onBack: PropTypes.func.isRequired,
    tenant: PropTypes.func.isRequired
};
export default withErrorBoundary(EBTenantOverview);

/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// import LoaderComponent from "../LoaderComponent";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationList from "../../Components/PaginationList";
import { useSelector } from "react-redux";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import emptyimg from "../../Assets/Images/New_images/empty_image.png";


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
    const [pageSize, setPageSize] = useState(
        window.innerWidth >= 1440 ? 20 : 10
    ); useEffect(() => {
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
        <div>{
            !canReadTenant ? (

                <div className="flex flex-col items-center justify-center min-h-[45vh]">
                    <ErrorMessage message={['You do not have access to view Transaction']} type="warning" />

                </div>
            )

                :
                <div>

                    {CustomerOverView?.length === 0 ? (
                        <div className="mt-2 flex justify-center">
                            <div className="2xl:mt-24 text-center">
                                <img src={emptyimg} alt="emptystate" />
                                <div className="pb-1 text-center font-semibold font-gilroy text-[18px] text-[#4B4B4B]">
                                    No Transaction available
                                </div>

                                <div className="pb-1 text-center font-medium font-gilroy text-[14px] text-[#4B4B4B]">
                                    There are no transaction available
                                </div>

                            </div>
                        </div>
                    ) : (

                        <div className="relative flex flex-col h-[calc(100vh-250px)]">
                            <div className="flex-1 overflow-y-scroll overflow-x-auto show-scroll pb-4">
                                <table className="min-w-full border-collapse w-full font-gilroy text-gray-900 text-sm font-medium">

                                    <thead className="bg-blue-100 sticky top-0 z-20">
                                        <tr className="h-9">
                                            <th className="w-[230px] px-2 py-1">Date</th>
                                            <th className="w-[230px] px-2 py-1 whitespace-nowrap">Bill name</th>
                                            <th className="w-[230px] px-2 py-1 whitespace-nowrap">Amount paid</th>
                                            <th className="w-[230px] px-2 py-1 whitespace-nowrap">Receipt / ref.no</th>
                                            <th className="w-[230px] px-2 py-1 whitespace-nowrap">Received by</th>
                                            <th className="w-[230px] px-2 py-1 whitespace-nowrap">Payment mode</th>
                                            <th className="w-[230px] px-2 py-1">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {paginatedData?.map((row, i) => (
                                            <tr key={i} className="text-sm font-gilroy border-b border-[#E8E8E8] h-10">
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
        }</div>
    )
}

export default TransactionHistory
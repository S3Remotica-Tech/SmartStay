/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
// import LoaderComponent from "../LoaderComponent";
import { Table } from "react-bootstrap";
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
                            <div>
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
                        <div className="mx-3 bg-white shadow-md max-h-[420px] overflow-y-auto mt-1.5">
                            <Table bordered={false} className="align-middle mb-0">
                                <thead className="bg-[rgba(231,241,255,1)] sticky top-0 z-2">
                                    <tr className="text-cenr">
                                        <th className="font-gilroy text-gray-500 font-bold text-[12px] whitespace-nowrap">DATE</th>
                                        <th className="font-gilroy text-gray-500 font-bold text-[12px] whitespace-nowrap">BILL NAME</th>
                                        <th className="font-gilroy text-gray-500 font-bold text-[12px] whitespace-nowrap">AMOUNT PAID</th>
                                        <th className="font-gilroy text-gray-500 font-bold text-[12px] whitespace-nowrap">RECEIPT / REF.NO</th>
                                        <th className="font-gilroy text-gray-500 font-bold text-[12px] whitespace-nowrap">RECEIVED BY</th>
                                        <th className="font-gilroy text-gray-500 font-bold text-[12px] whitespace-nowrap">PAYMENT MODE</th>
                                        <th className="font-gilroy text-gray-500 font-bold text-[12px] whitespace-nowrap">STATUS</th>
                                    </tr>

                                </thead>
                                <tbody className="text-xs align-middle font-gilroy">
                                    <PaginationList>

                                        {CustomerOverView?.map((row, i) => {
                                            // const isLast = i === CustomerOverView.length - 1;
                                            return (
                                                 <tr
                                                    key={i}
                                                    className="p-2 border-b border-[#F9FAFF] text-ceer font-gilroy text-[14px] font-medium"
                                                > 
                                                    <td className="p- text-[13px] font-medium text-gray-400 font-gilroy">
                                                        {formatDate(row.transactionDate)}
                                                    </td>
                                                    <td className="text-[14px] font-medium text-gray-400 font-gilroy">
                                                        {row.billName}
                                                    </td>
                                                   <td className="text-[14px] font-medium text-gray-400 font-gilroy">
                                                        {row.amountPaid}
                                                    </td>
                                                   <td className="text-[14px] font-medium text-gray-400 font-gilroy">
                                                        {row.referenceNumber || "-"}
                                                    </td>
                                                   <td className="text-[14px] font-medium text-gray-400 font-gilroy">
                                                        {row.paidTo}
                                                    </td>
                                                   <td className="text-[14px] font-medium text-gray-400 font-gilroy">
                                                        {row.paymentMode}
                                                    </td>
                                                    <td>
                                                        <span className="bg-[#D9FFD9] text-[#1D760E] rounded-[14px] font-gilroy px-2 py-1">
                                                            {row.status}
                                                        </span>
                                                    </td>
                                                </tr>

                                            );
                                        })}
                                    </PaginationList>
                                </tbody>
                            </Table>










                        </div>
                    )}








                </div>
        }</div>
    )
}

export default TransactionHistory
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationList from "../../Components/PaginationList";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import emptyimg from "../../Assets/Images/New_images/empty_image.png";


function TransactionHistory() {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();




    const CustomerOverView = state.UsersList?.customerdetails?.transactionList;



    const {
        canWriteModule: canWriteTenant,
        canReadModule: canReadTenant,
        canUpdateModule: canUpdateTenant,
        canDeleteModule: canDeleteTenant,
    } = useHasPermission("Customers");


    console.log("CustomerOverView", CustomerOverView.length)


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

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        marginTop: 100
                    }}
                >


                    <ErrorMessage message={['You do not have access to view Transaction']} type="warning" />

                </div>
            )

                :
                <div>



                    {CustomerOverView?.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <img src={emptyimg} width={240} height={240} alt="emptystate" />
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                                There are no transaction history available.
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive ms-4 mt-3"
                            style={{
                                background: "#fff",
                                borderRadius: 12,
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                                maxHeight: "420px",
                                overflowY: "auto",
                                position: "relative",
                                 border: "1px solid #F9FAFF",

                            }}
                        >
                            <Table bordered={false} className="align-middle mb-0 ">
                                <thead
                                    style={{
                                        backgroundColor: "rgba(231, 241, 255, 1)",
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 2,
                                        borderRadius: 12,
                                    }}
                                >
                                    <tr className="text-uppercase" style={{ textAlign: "center" }}>
                                        <th style={{ borderTopLeftRadius: 12, fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            DATE
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            BILL NAME
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>AMOUNT PAID</th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>RECEIPT / REF.NO</th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>RECEIVED BY</th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>PAYMENT MODE</th>
                                        <th style={{ borderTopRightRadius: 10, fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>STATUS</th>



                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>

                                        {CustomerOverView?.map((row, i) => {
                                            const isLast = i === CustomerOverView.length - 1;
                                            return (
                                                <tr key={i} style={{
                                                    borderBottom: "1px solid #F9FAFF", textAlign: "center", fontFamily: "Gilroy", fontSize: 14, fontWeight: 600, padding: "12px 16px",

                                                }}>
                                                    <td style={{
                                                        borderTopLeftRadius: i === 0 ? 12 : 0,
                                                        borderBottomLeftRadius: isLast ? 12 : 0, fontSize: 14, fontWeight: 600, color: "#6B7280", padding: "12px 16px"
                                                    }}>{formatDate(row.transactionDate)}</td>
                                                    <td
                                                        style={{ color: "#111928", fontWeight: 600, padding: "12px 16px" }}

                                                    >
                                                        {row.billName}
                                                    </td>
                                                    <td style={{ color: "#111928", padding: "12px 16px" }}>{row.amountPaid}</td>
                                                    <td style={{ color: "#1E45E1", padding: "12px 16px" }}>
                                                        {row.referenceNumber || "-"}
                                                    </td>
                                                    <td style={{ color: "#111928", padding: "12px 16px" }}>{row.paidTo}</td>
                                                    <td style={{ color: "#111928", padding: "12px 16px" }}>{row.paymentMode}</td>
                                                    <td style={{ borderBottomRightRadius: isLast ? 12 : 0 }}><span
                                                        style={{
                                                            backgroundColor: "#D9FFD9",
                                                            color: "#1D760E",
                                                            borderRadius: "14px",
                                                            fontFamily: "Gilroy",
                                                            padding: "8px 12px",
                                                        }}
                                                    >
                                                        {row.status}
                                                    </span></td>


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
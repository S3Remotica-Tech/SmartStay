/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationList from "../../Components/PaginationList";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';



function TransactionHistory() {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();




 const CustomerOverView = state.UsersList.customerdetails;



    const {
        canWriteModule: canWriteTenant,
        canReadModule: canReadTenant,
        canUpdateModule: canUpdateTenant,
        canDeleteModule: canDeleteTenant,
    } = useHasPermission("Customers");








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



                    {/* {roomReadingList?.length === 0 && !loading ? (
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <img src={emptyimg} width={240} height={240} alt="emptystate" />
                                                       <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                                There are no transaction available.
                            </div>
                        </div>
                    ) : ( */}
                        <div className="table-responsive ms-4 mt-5"
                            style={{
                                background: "#fff",
                                // borderRadius: 12,
                                boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                                maxHeight: "420px",
                                overflowY: "auto",
                                position: "relative"
                            }}
                        >
                            <Table bordered={false} className="align-middle mb-0 ">
                                <thead
                                    style={{
                                        backgroundColor: "rgba(231, 241, 255, 1)",
                                        position: "sticky",
                                        top: 0,
                                        zIndex: 2,
                                        borderTopLeftRadius: 12,
                                    }}
                                >
                                    <tr className="text-uppercase">
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
                                        <th style={{  borderTopRightRadius: 10,fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>STATUS</th>
                                      

                                       
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>
                                        <tr>
                                            <td colSpan="12" style={{ fontFamily: "Gilroy", color: "red", fontWeight: 600, fontSize: 14, padding: "12px 16px" , textAlign:"center"}}>There are no transaction available.</td>
                                        </tr>
                                        {/* {roomReadingList?.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" }}>
                                                <td style={{ fontSize: 15, fontWeight: 600, paddingLeft: "40px" }}>{row.floorName}</td>
                                                <td
                                                    style={{ color: canReadElectricity ? "#1E45E1" : "#DBDBDB", cursor: "pointer", fontWeight: 600, paddingLeft: "40px" }}
                                                    onClick={() => canReadElectricity && handleRoomDetailsPage(row)}
                                                >
                                                    {row.roomName}
                                                </td>
                                                <td style={{ paddingLeft: "40px" }}>{row.noOfTenants}</td>
                                                <td style={{ paddingLeft: "40px" }}>
                                                    {row.entryDate !== "N/A"
                                                        ? new Date(row.entryDate.split("/").reverse().join("-")).toLocaleString("en-US", { month: "short" })
                                                        : "N/A"}
                                                </td>
                                                <td style={{ paddingLeft: "40px" }}>{row.previousReading}</td>
                                                <td style={{ paddingLeft: "40px" }}>{row.currentReading}</td>
                                                <td style={{ paddingLeft: "40px" }}>{row.consumption}</td>
                                                <td style={{ paddingLeft: "30px" }}>{row.totalPrice || '0'}</td>
                                                {
                                                    !isEbBased &&
                                                    <td style={{ paddingLeft: "40px", cursor: canWriteElectricity ? "pointer" : "not-allowed" }}>
                                                        <img
                                                            src={Group}
                                                            alt="action"
                                                            style={{
                                                                filter: canWriteElectricity ? "none" : "grayscale(100%) brightness(60%)",
                                                                opacity: canWriteElectricity ? 1 : 0.6,
                                                                cursor: canWriteElectricity ? "pointer" : "not-allowed"
                                                            }}
                                                            onClick={() => canWriteElectricity && handleActionClick(row)}
                                                        />
                                                    </td>
                                                }
                                            </tr>
                                        ))} */}
                                    </PaginationList>
                                </tbody>
                            </Table>



                            {/* {loading &&
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '70%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'transparent',
                                        opacity: 0.75,
                                        zIndex: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            borderTop: '4px solid #1E45E1',
                                            borderRight: '4px solid transparent',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            animation: 'spin 1s linear infinite',
                                        }}
                                    ></div>
                                </div>
                            }
 */}










                        </div>
                    {/* )} */}








                </div>
        }</div>
    )
}

export default TransactionHistory
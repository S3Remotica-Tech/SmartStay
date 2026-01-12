/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import {  Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import "flatpickr/dist/themes/material_blue.css";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import ReceiptPdfCard from "../PDF/ReceiptPdfModal";
import '../OthersComponent/BillPdfModal.css';
import { useLocation } from "react-router-dom";

function ReceiptPdfDetails() {

    const location = useLocation();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    // const navigate = useNavigate();


    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [rowDatas, setRowDatas] = useState('')
    const invoiceRefs = useRef({});


    const { rowData } = location.state || {};


    useEffect(() => {
        setSelectedInvoiceId(rowData.transactionId)
    }, [rowData])

    // console.log("rowData",rowData)

    const handleDisplayInvoiceDownload = (item) => {
        // console.log("itemmmmm", item)
        setRowDatas(item)
        setSelectedInvoiceId(item.transactionId)
        if (item?.transactionId && state.login.selectedHostel_Id) {

            dispatch({ type: "RECEIPTPDF_NEWCHANGES", payload: { hostelId: state.login.selectedHostel_Id, transactionId: item.transactionId } })
        }
    };

    // console.log("state", state.InvoiceList)

    useEffect(() => {
        if (rowData?.transactionId) {
            setSelectedInvoiceId(rowData.transactionId);

            setTimeout(() => {
                invoiceRefs.current[rowData.transactionId]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 100);
        }
    }, [rowData]);


    return (
        <Row className="p-0" style={{ width: "100%", }}>
            <Col className="p-0"
                lg={4}
                md={4}
                sm={12}
                xs={12}
            >

                <div
                    className="container sticky-top bg-white"
                    style={{
                        zIndex: 0,
                        height: 'auto',
                        // margin: (DownloadInvoice) ? 0 : 3,
                        paddingBottom: 0,
                        borderBottom: "1px solid #E5E7EB",
                        boxShadow: "initial"
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <div className="" style={{
                            marginTop: 12,
                        }}>
                            <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Receipt</label>
                        </div>

                    </div>
                </div>
                <div
                    className="show-scroll p-2 mt-2"
                    style={{ height: "90vh", overflowY: "auto" }}
                >
                    {state.InvoiceList.ReceiptList &&
                        state.InvoiceList.ReceiptList?.map((item) => (
                            <>
                                <div key={item.transactionId}  ref={(el) => (invoiceRefs.current[item.transactionId] = el)}
                                    className="mb-3  shadow-sm rounded"
                                    style={{
                                        padding: "12px 12px", cursor: "pointer",

                                        backgroundColor: String(selectedInvoiceId) === String(item.transactionId) ? "#E8EDFF" : "#FFFFFF"
                                    }}
                                >
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            {
                                                item.profilePic && item.profilePic !== "0" ? (
                                                    <img
                                                        src={item.profilePic}
                                                        alt="User"
                                                        style={{
                                                            height: 40,
                                                            width: 40,
                                                            borderRadius: "50%",
                                                            objectFit: "cover",
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            height: 40,
                                                            width: 40,
                                                            borderRadius: "50%",
                                                             backgroundColor: "#E2E8F0",
                          color: "#44536A",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            // color: "white",
                                                            fontWeight: 600,
                                                            fontSize: 14,
                                                            textTransform: "uppercase",
                                                        }}
                                                    >
                                                        {item.initials}
                                                    </div>
                                                )
                                            }

                                        </div>

                                        <div className="flex-grow-1 ms-2">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <div
                                                    className="Invoice_Name d-flex flex-wrap"
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color: "#222",
                                                        cursor: "pointer",
                                                    }}
                                                    onClick={() => {
                                                        setSelectedInvoiceId(item.transactionId);
                                                        handleDisplayInvoiceDownload(item)
                                                    }}
                                                >
                                                    {item.fullName || "Unnamed"}
                                                </div>
                                                <div
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "14px",
                                                        fontWeight: 600,
                                                        color: "#222",
                                                    }}
                                                >
                                                    ₹ {item.paidAmount || "0"}
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center">
                                                <div
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "12px",
                                                        fontWeight: 500,
                                                        color: "#555",
                                                    }}
                                                >
                                                    {item?.paidAt}
                                                </div>
                                                <span
                                                    style={{
                                                        fontSize: "10px",
                                                        backgroundColor: "#D9FFD9",
                                                        color: "#000",
                                                        borderRadius: "14px",
                                                        fontFamily: "Gilroy",
                                                        padding: "4px 10px",
                                                        height: "24px",
                                                        lineHeight: "16px",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {item?.paymentStatus === "PAID" ? "Paid" : "Unpaid"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                            </>
                        ))}
                </div>




            </Col>

            <Col className="p-0 m-0"
                lg={8}
                md={8}
                sm={8}
                xs={8}
            >
                <ReceiptPdfCard
                    // show={showPdfModal}
                    // handleClosed={handleClosePdfModal}
                    rowData={rowData || rowDatas}
                />


            </Col>



        </Row>
    )
}

export default ReceiptPdfDetails
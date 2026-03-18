/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import "flatpickr/dist/themes/material_blue.css";
import BillPdfModal from "../PDF/BillPdfModal";
import BillPDFModalNew from "../PDF/BillPDFModalNew"
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import '../OthersComponent/BillPdfModal.css';
import { useLocation, useNavigate } from "react-router-dom";


function BillsPdfDetails() {

    const location = useLocation();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [hoveredInvoiceId, setHoveredInvoiceId] = useState(null);
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [rowDatas, setRowDatas] = useState('')
    const invoiceRefs = useRef({});


    const { rowData, isReportsInvoiceRegisterWay } = location.state || {};




    useEffect(() => {
        if (rowData?.invoiceId) {
            setSelectedInvoiceId(rowData?.invoiceId)
        }


    }, [rowData])

    const handleDisplayInvoicePDF = (item) => {
        setRowDatas(item)
        setSelectedInvoiceId(item?.invoiceId)
        navigate(`/invoice/details/${item?.invoiceId}`, {
            replace: false,
            state: { ts: Date.now() }
        });
        if (item) {
            dispatch({
                type: 'GETPARTICULARBILLSDETAILS', payload: {
                    hostelId: item.hostelId,
                    invoiceId: item.invoiceId
                }
            })

        }
    };



    useEffect(() => {
        if (rowData?.invoiceId) {

            setSelectedInvoiceId(rowData.invoiceId);

            setTimeout(() => {
                invoiceRefs.current[rowData.invoiceId]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            }, 100);
        }
    }, [rowData]);


    useEffect(() => {
        if (isReportsInvoiceRegisterWay) {
            dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

        }

    }, [isReportsInvoiceRegisterWay])


    return (
        <Row className="p-0" style={{
            height: "100vh",
            overflow: "hidden",
        }}>
            <Col className="p-0"
                lg={4}
                md={4}
                sm={12}
                xs={12}
                style={{
                    height: "100vh",
                    overflow: "hidden",
                    borderRight: "1px solid #E5E7EB",
                }}
            >

                <div
                    className="container sticky-top bg-white"
                    style={{
                        zIndex: 0,
                        height: 'auto',
                        // margin: (DownloadInvoice) ? 0 : 3,
                        paddingBottom: 0,
                        borderBottom: "1px solid #E5E7EB",
                        boxShadow: "initial", overflow: "hidden"
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <div className="" style={{
                            marginTop: 15,
                        }}>
                            <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Bills</label>
                        </div>

                    </div>
                </div>
                <div
                    className="show-scroll p-2 mt-2"
                    style={{
                        height: "calc(100vh - 60px)", // header height
                        overflowY: "auto",
                    }}
                // style={{ height: "90vh", overflowY: "auto" }}
                >
                    {state.InvoiceList.billsList?.listInvoices &&
                        state.InvoiceList.billsList?.listInvoices?.map((item) => (
                            <>

                                <div key={item.invoiceId} ref={(el) => (invoiceRefs.current[item.invoiceId] = el)}
                                    className="mb-3  shadow-sm rounded"
                                    style={{
                                        padding: "12px 16px", cursor: "pointer",
                                        backgroundColor: String(selectedInvoiceId) === String(item.invoiceId) ? "#E8EDFF" : "#FFFFFF", transition: "all 0.25s ease-in-out",
                                    }}
                                >
                                    <div className="d-flex align-items-start justify-content-between">
                                        <div>
                                            <span>
                                                {
                                                    item?.profilePic && item?.profilePic !== "0" ? (
                                                        <img
                                                            src={item?.profilePic}
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
                                                                fontWeight: 600,
                                                                fontSize: 14,
                                                                textTransform: "uppercase",
                                                                fontFamily: "Gilroy",
                                                            }}
                                                        >
                                                            {item?.initials}
                                                        </div>
                                                    )
                                                }
                                            </span>
                                        </div>

                                        <div className="flex-grow-1 ms-3 cursor-pointer"
                                            // onMouseEnter={() => setHoveredInvoiceId(item.invoiceId)}
                                            // onMouseLeave={() => setHoveredInvoiceId(null)}
                                            onClick={() => {
                                                setSelectedInvoiceId(item.invoiceId);
                                                handleDisplayInvoicePDF(item);
                                            }}>
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <div
                                                    // className="Invoice_Name"
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "14px",
                                                        wordWrap: "break-word",
                                                        color: "#1E45E1",
                                                        // textDecoration: "underline",
                                                        fontStyle: "normal",
                                                        lineHeight: "normal",
                                                        fontWeight: 600,
                                                        cursor: "pointer",
                                                    }}

                                                >
                                                    {item.fullName}
                                                </div>
                                                <div
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "16px",
                                                        wordWrap: "break-word",
                                                        color: "#222",
                                                        fontStyle: "normal",
                                                        lineHeight: "normal",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    ₹ {item.baseAmount}
                                                </div>
                                            </div>

                                            <div className="d-flex justify-content-between gap-3 mb-2">
                                                <div
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "12px",
                                                        wordWrap: "break-word",
                                                        color: "#222",
                                                        fontStyle: "normal",
                                                        lineHeight: "normal",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {item.invoiceNumber === null ||
                                                        item.invoiceNumber === ""
                                                        ? "0.00"
                                                        : item.invoiceNumber}
                                                </div>
                                                <div
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "12px",
                                                        wordWrap: "break-word",
                                                        color: "#222",
                                                        fontStyle: "normal",
                                                        lineHeight: "normal",
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    {item.invoiceDate}
                                                </div>
                                            </div>

                                            <div className="mb-2">

                                                {(item?.paymentStatus === "Pending" ||
                                                    item?.paymentStatus === "Partial Payment") && (
                                                        <span
                                                            style={{
                                                                backgroundColor: "#FFD9D9",
                                                                color: "#000",
                                                                borderRadius: "12px",
                                                                fontFamily: "Gilroy",
                                                                padding: "8px 10px", fontSize: 12
                                                            }}
                                                        >
                                                            {item?.paymentStatus}
                                                        </span>
                                                    )}


                                                {item?.paymentStatus === "Paid" && (
                                                    <span
                                                        style={{
                                                            cursor: "pointer",
                                                            backgroundColor: "#D9FFD9",
                                                            fontFamily: "Gilroy",
                                                            color: "#000",
                                                            borderRadius: "14px",
                                                            padding: "8px 12px", fontSize: 12
                                                        }}
                                                    >
                                                        {item?.paymentStatus}
                                                    </span>
                                                )}


                                                {(item?.paymentStatus === "Refunded" || item?.paymentStatus === "Partially Refunded") && (
                                                    <span
                                                        style={{
                                                            backgroundColor: "#FFF3CD",
                                                            color: "#8B8000",
                                                            borderRadius: "14px",
                                                            fontFamily: "Gilroy",
                                                            padding: "8px 12px", fontSize: 12
                                                        }}
                                                    >
                                                        {item?.paymentStatus}
                                                    </span>
                                                )}


                                                {item?.paymentStatus === "Pending Refund" && (
                                                    <span
                                                        style={{
                                                            backgroundColor: "#FFE6B3",
                                                            color: "#b45309",
                                                            borderRadius: "14px",
                                                            fontFamily: "Gilroy",
                                                            padding: "8px 12px", fontSize: 12
                                                        }}
                                                    >
                                                        {item?.paymentStatus}
                                                    </span>
                                                )}
                                                {item?.isCancelled && (
                                                    <span
                                                        style={{
                                                            backgroundColor: "#FFE6B3",
                                                            color: "#b45309",
                                                            borderRadius: "14px",
                                                            fontFamily: "Gilroy",
                                                            padding: "8px 12px", fontSize: 12
                                                        }}
                                                    >
                                                        Cancelled
                                                    </span>
                                                )
                                                }
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
                style={{
                    height: "100vh",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100vh",
                        overflowY: "auto",
                    }}
                >
                    {/* <BillPdfModal rowData={rowData || rowDatas} isReportsInvoiceRegisterWay={isReportsInvoiceRegisterWay} /> */}
                     <BillPDFModalNew rowData={rowData || rowDatas} isReportsInvoiceRegisterWay={isReportsInvoiceRegisterWay} />
                </div>


            </Col>



        </Row>
    )
}

export default BillsPdfDetails
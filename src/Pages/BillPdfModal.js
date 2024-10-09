import React, { useState, useRef, useEffect } from "react";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import "../Pages/Invoices.css";
import moment from 'moment';
import DownLoad from '../Assets/Images/New_images/searchss.png'
import Share from '../Assets/Images/New_images/share-07.png'
import Close from '../Assets/Images/New_images/circlie.png'
import Logo from '../Assets/Images/Logo-Icon.png'
import { ImportCurve, CloseCircle, Call, Location, ArrowCircleLeft2, ArrowLeft } from 'iconsax-react';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";





const InvoiceCard = ({ rowData, handleClosed }) => {
    const invoiceData = {
        payment: {
            bank: 'Rimberio Bank',
            accountName: 'Alfredo Torres',
            accountNo: '0123 4567 8901',
            dueDate: '23 June 2023',
        },
    };




    console.log("rowData", rowData)
    const [isVisible, setIsVisible] = useState(true);
    const cardRef = useRef(null);

    useEffect(() => {
        setIsVisible(true)
    }, [rowData])


    //     const handleDownload = async () => {
    //   const element = cardRef.current;
    //   const canvas = await html2canvas(element);
    //   const imageData = canvas.toDataURL("image/png");
    //   const pdf = new jsPDF({
    //     orientation: "portrait", 
    //     unit: "px", 
    //     format: [canvas.width, canvas.height]
    //   });
    //   pdf.addImage(imageData, "PNG", 0, 0);
    //   pdf.save("invoice.pdf");
    // };


    const handleDownload = async () => {
        const element = cardRef.current;
        const canvas = await html2canvas(element, { scale: 2 });
        const imageData = canvas.toDataURL("image/png");

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [canvas.width / 2, canvas.height / 2]
        });

        pdf.addImage(imageData, "PNG", 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save("invoice.pdf");
    };








    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: "Invoice",
                    text: "Here is your invoice.",
                    url: window.location.href,
                });
            } catch (err) {
                console.error("Error sharing", err);
            }
        } else {
            alert("Web Share API not supported in this browser.");
        }
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    const handleBackInvoice = () => {
        handleClosed()
    }


    // if (!isVisible) return null;
    return (
        <div >
            <div className="d-flex justify-content-between align-items-center ps-3">


                <div className="d-flex align-items-center justify-content-between gap-3 ">
                    <div onClick={handleBackInvoice}>
                        <ArrowLeft
                            size="25"
                            color="#545454"
                        />
                    </div>
                    <div>


                        <div className="mb-3">
                            {rowData.BalanceDue === 0 ? <span style={{ fontSize: '10px', backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span> : <span
                                style={{ fontSize: '10px', cursor: 'pointer', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000', borderRadius: '14px', padding: "8px 12px" }}>Unpaid</span>}
                        </div>
                        <div className="mb-2 mt-2">
                            <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{moment(rowData.Date).format('DD MMM YYYY')}</label> - <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>#{rowData.Invoices == null || rowData.Invoices == '' ? '0.00' : rowData.Invoices}</label>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="gap-2 d-flex">
                        {/* <ImportCurve
 size="32"
 color="#FF8A65"
/>


<CloseCircle
 size="32"
 color="#FF8A65"
/> */}
                        <img src={DownLoad} alt="Download Invoice" style={{ height: 20, width: 20 }} onClick={handleDownload} />
                        <img src={Share} alt="Share Invoice" style={{ height: 20, width: 20 }} onClick={handleShare} />
                        <img src={Close} alt="Close Invoice" style={{ height: 20, width: 20 }} onClick={handleClose} />
                    </div>
                </div>

            </div>
            <hr />

            <div style={{ maxHeight: 500, overflowY: "auto" }} className="show-scroll">

                {isVisible &&
                    <Card ref={cardRef} className="m-2 " style={{ maxWidth: "100%", backgroundColor: "", borderRadius: 24, border: "1px solid rgba(225, 225, 225, 1)" }}>
                        <Card.Body className="my-4 p-3"
                            style={{
                                // maxHeight: 500, overflowY: "auto",
                                padding: "20px"

                            }}
                        >
                            <div className="d-flex justify-content-between ps-4 pe-4 pt-3">
                                <div className="d-flex gap-2">
                                    <div>
                                        <img src={rowData.hostel_profile ? rowData.hostel_profile : Logo} style={{ height: 40, width: 40, }} />
                                    </div>
                                    <div>

                                    
                                    <div>
                                        <label style={{ fontSize: 20, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{rowData.Hostel_Name}</label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Meet All Your Needs</label>
                                    </div>
                                    </div>
                                </div>
                                <div>
                                    <label style={{ fontSize: 30, letterSpacing: 1, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>INVOICE</label>
                                </div>
                            </div>


                            <div className="d-flex justify-content-between pt-5 ps-4 pe-4">
                                <div>


                                    <div >
                                        <label style={{ fontSize: 16, fontWeight: 700, color: "#000000", fontFamily: "Gilroy" }}>Invoice To:</label>
                                    </div>
                                    <div>
                                        <label style={{ fontSize: 15, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>{rowData.Name}</label>
                                    </div>
                                    <div className="" style={{ width: 100 }}>
                                        <label style={{ wordBreak: "break-word", whiteSpace: "normal", fontSize: 15, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{rowData.UserAddress}</label>
                                    </div>


                                </div>
                                <div>
                                    <div className="d-flex justify-content-between gap-2">
                                        <div>
                                            <label style={{ fontSize: 16, fontWeight: 700, color: "#000000", fontFamily: "Gilroy" }}>Invoice #</label>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 15, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{rowData.Invoices ? rowData.Invoices : '0.00'}</label>
                                        </div>

                                    </div>
                                    <div className="d-flex justify-content-between gap-5">
                                        <div>
                                            <label style={{ fontSize: 16, fontWeight: 800, color: "#000000", fontFamily: "Gilroy" }}>Date</label>
                                        </div>
                                        <div>
                                            <label style={{ fontSize: 15, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{moment(rowData.Date).format('DD/MM/YYYY')}</label>
                                        </div>

                                    </div>

                                </div>
                            </div>


                            <Table className="mt-5 mb-1 ps-3 pe-3" style={{}}>
                                <thead>
                                    <tr>
                                        <th style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>Description</th>

                                        <th style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr >
                                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>
                                            {rowData.invoice_type == 1 ? "Room rent" : " Advance amount"}
                                            </td>
                                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>{rowData.RoomRent}</td>
                                    </tr>
                                    <tr >
                                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>
                                        EbAmount
                                            </td>
                                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>{rowData.EbAmount}</td>
                                    </tr>
                                    <tr >
                                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>
                                        Amenity
                                            </td>
                                        <td style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy", textAlign: "center" }}>{rowData.Amnities_deduction_Amount}</td>
                                    </tr>

                                </tbody>
                            </Table>
                            <div className="d-flex justify-content-end pe-5">
                                <div style={{ textAlign: 'right' }} className="" >
                                    <div className="pb-2  d-flex justify-content-between gap-3" >
                                        <div>
                                            <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Subtotal: </label>

                                        </div>
                                        <div>
                                            <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>₹{rowData.Amount}</label>
                                        </div>

                                    </div>
                                    <div className="pb-2  d-flex justify-content-between">
                                        <div>
                                            <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Tax (0%): </label>

                                        </div>
                                        <div>
                                            <label style={{ fontSize: 16, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>₹0.00</label>
                                        </div>
                                    </div>
                                    <hr style={{ color: "#000" }} />
                                    <div className="pb-2  d-flex justify-content-between">

                                        <h5 style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Total:</h5> <span style={{ fontSize: 18, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>₹{rowData.Amount}</span>
                                    </div>

                                </div>
                            </div>

                            <div className="mt-4 ps-4 pe-4">
                                <h6 style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }} >PAYMENT METHOD</h6>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>{invoiceData.payment.bank}</label>
                                </div>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Account Name: {invoiceData.payment.accountName}</label>
                                </div>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Account No: {invoiceData.payment.accountNo}</label>
                                </div>
                                <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, color: "#000000", fontFamily: "Gilroy" }}>Pay by: {invoiceData.payment.dueDate}</label>
                                </div>
                            </div>


                            <div className="d-flex justify-content-around mt-5 text-center ps-4 pe-4">
                                <div>
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Thank you for your business!</label>
                                </div>
                                <div>
                                    <hr style={{ border: "2px solid #dbaa16", width: 200 }} />
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#000000", fontFamily: "Gilroy" }}>Authorized Signed</label>
                                </div>

                            </div>









                        </Card.Body>
                        <div style={{ backgroundColor: "#dbaa16", borderBottomRightRadius: 24, borderBottomLeftRadius: 24 }} className="d-flex p-3 justify-content-center gap-3" >
                            <div className="d-flex gap-2">
                                <div>
                                    <Call
                                        size="20"
                                        color="#FFF"
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#fff", fontFamily: "Gilroy" }}>1234578589</label>
                                </div>

                            </div>

                            <div className="d-flex gap-2">
                                <div>
                                    <Location
                                        size="20"
                                        color="#FFF"
                                    />
                                </div>

                                <div>
                                    <label style={{ fontSize: 16, fontWeight: 600, color: "#fff", fontFamily: "Gilroy" }}>123,Any where Street, Any City</label>
                                </div>
                            </div>
                        </div>
                    </Card>
                }
            </div>
        </div>
    );
};

export default InvoiceCard;

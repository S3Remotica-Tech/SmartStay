import React, { useState } from "react";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from '/src/Assets/Images/New_images/building1.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import { Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";


const EBRoomOverview = ({ onBack }) => {


 const [activeTab, setActiveTab] = useState("customer");


    const billingData = [
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: 300,
            amount: "₹1,000",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: 220,
            amount: "₹2,200",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
    ];


    return (
        <>
            <div>
                <div className="mb-5  mx-4">

                    <div
                        className="d-flex align-items-center"
                        style={{
                            position: "sticky",
                            top: 4,
                            zIndex: 1000,
                            backgroundColor: "#fff",
                            padding: "12px 20px",
                            height: "60px",
                        }}
                    >
                        <img
                            src={leftarrow}
                            alt="leftarrow"
                            width={20}
                            height={20}
                            onClick={onBack}
                            style={{ cursor: "pointer" }}
                        />
                        <span
                            style={{
                                fontWeight: 600,
                                fontSize: "18px",
                                fontFamily: "Gilroy",
                                paddingLeft: "10px",
                            }}
                        >
                            Room Overview
                        </span>
                    </div>

                    <div className="card mt-3" style={{
                        borderRadius: "15px",
                        position: "sticky",
                        top: "0",
                        zIndex: 10,
                        background: "white"
                    }}>
                        <div className="card-body">

                            <div className="d-flex align-items-center mb-3 mb-md-0">


                                <div style={{ marginLeft: 10 }}>
                                    <p
                                        className="card-title mb-0"
                                        style={{
                                            fontSize: "17px",
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                        }}
                                    >
                                        Room No 004
                                    </p>
                                    <div className="d-flex justify-content-start align-items-center" style={{ gap: 6, marginTop: 4 }}>
                                        <img src={building} height="14" width="14" alt="Ground Floor" />
                                        <div style={{ color: "#4B4B4B", fontSize: 14 }}>Ground Floor</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center mb-3 mx-4">
                    <div
                        className="d-flex"
                        style={{ marginLeft: "2px", marginTop: "-10px" }}
                    >
                        <div
                            onClick={() => setActiveTab("customer")}
                            style={{
                                fontSize: 17,
                                fontFamily: "Gilroy",
                                color: activeTab === "customer" ? "black" : "#4B4B4B",
                                fontWeight: activeTab === "customer" ? "600" : "normal",
                                cursor: "pointer",
                                marginRight: 24,
                                paddingBottom: 6,
                                borderBottom:
                                    activeTab === "customer"
                                        ? "2px solid #1E45E1"
                                        : "2px solid transparent",
                            }}
                        >
                            Reading
                        </div>
                        <div
                            onClick={() => setActiveTab("room")}
                            style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                color: activeTab === "room" ? "black" : "#4B4B4B",
                                fontWeight: activeTab === "room" ? "600" : "normal",
                                cursor: "pointer",
                                paddingBottom: 6,
                                borderBottom:
                                    activeTab === "room"
                                        ? "2px solid #1E45E1"
                                        : "2px solid transparent",
                            }}
                        >
                            Occupants
                        </div>
                    </div>

                    <div
                        className="ms-auto d-flex gap-3 me-2 p-1"
                        style={{
                            backgroundColor: "white",
                            borderRadius: 5,
                            padding: 6,
                            boxShadow: "0px 2px 2px rgba(0,0,0,0.2)",
                        }}
                    >
                        <FiFilter size={20} style={{ cursor: "pointer" }} />
                    </div>
                </div>

                {activeTab === "customer" && (
                    <div
                        className="table-responsive mx-4"
                        style={{
                            background: "#fff",
                            borderRadius: 12,
                            boxShadow: "0px 4px 8px rgba(0,0,0,0.05)",
                            maxHeight: "420px",
                            overflowY: "auto",
                        }}
                    >
                        <Table bordered={false} className="align-middle mb-0">
                            <thead
                                style={{
                                    backgroundColor: "rgba(231, 241, 255, 1)",
                                    position: "sticky",
                                    top: 0,
                                    zIndex: 2,
                                }}
                            >
                                <tr className="text-uppercase">
                                    <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                        BILLING MONTH
                                    </th>
                                    <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                        FROM
                                    </th>
                                    <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                        TO
                                    </th>
                                    <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                        TOTAL UNITS
                                    </th>
                                    <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                        AMOUNT
                                    </th>

                                    <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                        ACTION
                                    </th>
                                </tr>
                            </thead>
                            <tbody style={{ fontSize: 14, color: "#000" }}>
                                <PaginationList>
                                    {billingData.map((row, i) => (
                                        <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" }}>

                                            <td style={{ paddingLeft: "40px" }}>{row.billingMonth}</td>
                                            <td style={{ paddingLeft: "10px" }}>{row.from}</td>
                                            <td style={{ paddingLeft: "10px" }}>{row.to}</td>
                                            <td style={{ paddingLeft: "40px" }}>{row.totalUnits}</td>
                                            <td style={{ paddingLeft: "25px" }}>{row.amount}</td>
                                            <td style={{ paddingLeft: "40px" }}>{row.action}</td>
                                        </tr>
                                    ))}
                                </PaginationList>
                            </tbody>
                        </Table>
                    </div>
                )}

                {activeTab === "room" && (
                    <div className="mt-3" style={{ fontFamily: "Gilroy", fontSize: 16, color: "gray" }}>
                        Occupants data will appear here...
                    </div>
                )}
            </div>
        </>
    );
};

EBRoomOverview.propTypes = {
  onBack: PropTypes.func.isRequired,
};
export default EBRoomOverview;

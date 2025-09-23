/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from '/src/Assets/Images/New_images/building1.svg';
import Ellipse1 from "../../Assets/Images/New_images/Ellipse 1.svg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import { Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";



const EBRoomOverview = ({ onBack,matchedRoomDetails }) => {


    const [activeTab, setActiveTab] = useState("customer");
    // const [loading, setLoading] = useState(false);

    console.log("matchedRoomDetails",matchedRoomDetails)


    const billingData = [
        {
            pic: Ellipse1,
            name: "Surya",
            bed: "Bed No 01",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: 300,
            amount: "₹1,000",
            action: "⋮",
        },
        {
            name: "Rajesh",
            bed: "Bed No 02",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: 220,
            amount: "₹2,200",
            action: "⋮",
        },
        {
            name: "Ramesh",
            bed: "Bed No 03",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            name: "Xavier",
            bed: "Bed No 04",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            name: "Britto",
            bed: "Bed No 05",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            name: "Alex",
            bed: "Bed No 01",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            name: "Surya",
            bed: "Bed No 01",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            name: "Supriya",
            bed: "Bed No 02",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            name: "Karthick",
            bed: "Bed No 03",
            billingMonth: "Aug 2025",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            action: "⋮",
        },
        {
            name: "Priya",
            bed: "Bed No 03",
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
            {/* {loading && <LoaderComponent />} */}
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
                    billingData.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <img src={emptyimg} width={240} height={240} alt="emptystate" />
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                                No Room Reading
                            </div>
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                                There are no Room Reading available.
                            </div>
                        </div>
                    ) : (
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
                                     {Array.isArray(matchedRoomDetails) &&
  matchedRoomDetails.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" }}>

                                                <td style={{ paddingLeft: "40px" }}>  {new Date(row.date).toLocaleDateString("en-US", {
    month: "short", 
    year: "numeric",
  })}
</td>
                                                <td style={{ paddingLeft: "10px" }}>{row.from}</td>
                                                <td style={{ paddingLeft: "10px" }}>{row.to}</td>
                                                <td style={{ paddingLeft: "40px" }}>{row.total_reading}</td>
                                                <td style={{ paddingLeft: "25px" }}>{row.total_amount}</td>
                                                <td style={{ paddingLeft: "40px" }}>{row.action}</td>
                                            </tr>
                                        ))}
                                    </PaginationList>
                                </tbody>
                            </Table>
                        </div>
                    )
                )}

                {activeTab === "room" && (
                    billingData.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <img src={emptyimg} width={240} height={240} alt="emptystate" />
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                                No Transaction
                            </div>
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                                There are no Transaction available.
                            </div>
                        </div>
                    ) : (
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
                                            NAME
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            BILLING MONTH
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            FROM
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            TO
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                            BED
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            TOTAL UNITS
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            AMOUNT
                                        </th>


                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>
                                        {billingData.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" }}>
                                               
                                                <td style={{ paddingLeft: "10px", fontWeight: 600, color: "black" }}>
                                                    <img src={Ellipse1} alt="" style={{ marginRight: "12px" }} />
                                                    {row.name}
                                                </td>

                                                <td style={{ paddingLeft: "40px" }}>{row.billingMonth}</td>
                                                <td style={{ paddingLeft: "10px" }}>{row.from}</td>
                                                <td style={{ paddingLeft: "10px" }}>{row.to}</td>
                                                <td style={{ paddingLeft: "10px" }}>{row.bed}</td>
                                                <td style={{ paddingLeft: "40px", fontWeight: 600, color: "black" }}>{row.totalUnits}</td>
                                                <td style={{ paddingLeft: "25px", fontWeight: 600, color: "black" }}>{row.amount}</td>

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
    matchedRoomDetails:PropTypes.func.isRequired,
};
export default EBRoomOverview;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from '/src/Assets/Images/New_images/building1.svg';
import Ellipse1 from "../../Assets/Images/New_images/Ellipse 1.svg";
import verify from "../../Assets/Images/New_images/verify.svg";
import Bed from "../../Assets/Images/New_images/Bed.svg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import { Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";



const EBTenantOverview = ({ onBack }) => {


    const [activeTab, setActiveTab] = useState("customer");
    // const [loading, setLoading] = useState(false);


    const billingData = [
        {
            pic: Ellipse1,
            name: "Surya",
            bed: "Bed No 01",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            floor: "Ground Floor",
            amount: "₹1,000",
            room: "Room 001",
            units: 300,
        },
        {
            name: "Rajesh",
            floor: "Ground Floor",
            bed: "Bed No 02",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: 220,
            amount: "₹2,200",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Ramesh",
            bed: "Bed No 03",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Xavier",
            bed: "Bed No 04",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Britto",
            bed: "Bed No 05",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Alex",
            bed: "Bed No 01",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Surya",
            bed: "Bed No 01",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Supriya",
            bed: "Bed No 02",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Karthick",
            bed: "Bed No 03",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,
        },
        {
            floor: "Ground Floor",
            name: "Priya",
            bed: "Bed No 03",
            billingMonth: "1 sep",
            from: "02 Jul",
            to: "23 Aug",
            totalUnits: "---",
            amount: "₹0.00",
            room: "Room 001",
            units: 300,

        },
    ];

    const [roomData] = useState({
        pic: Ellipse1,
        roomNo: "004",
        floor: "Ground Floor",
        bedNo: "01",
        name: "ARUN"
    });


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
                            EB Bill Overview
                        </span>
                    </div>

                    <div className="card mt-3" style={{
                        borderRadius: "15px",
                        position: "sticky",
                        top: "0",
                        zIndex: 10,
                        background: "white"
                    }}>


                        <div
                            className="card-body d-flex align-items-center"
                            style={{ gap: "12px" }}
                        >
                            <img
                                src={roomData.pic}
                                alt="Profile"
                                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                            />

                            <div>

                                <p
                                    className="mb-1"
                                    style={{
                                        fontSize: "17px",
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                    }}
                                >
                                    {roomData.name}
                                    <img src={verify} alt="verify" style={{ marginTop: "-5px" }}></img>
                                </p>

                                <div className="d-flex align-items-center" style={{ gap: "16px" }}>

                                    <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                                        <img src={building} height="14" width="14" alt="Floor" />
                                        <span style={{ color: "Black", fontWeight: 600, fontSize: "14px" }}>
                                            {roomData.floor}
                                        </span>
                                    </div>

                                    <span style={{ fontSize: "14px", fontWeight: 600, color: "black", }}>
                                        Room No {roomData.roomNo}
                                    </span>

                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "black",
                                            marginLeft: 5,
                                        }}
                                    >
                                        <img
                                            src={Bed}
                                            height="14"
                                            width="14"
                                            style={{ marginRight: 6, marginTop: "-4px" }}
                                            alt="Bed"
                                        />
                                        Bed No {roomData.bedNo}
                                    </span>

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
                            Current Reading
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
                            Previous Reading
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
                                            FLOOR
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            ROOM
                                        </th>

                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                            BED
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                            TOTAL UNITS
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                            AMOUNT
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>
                                        {billingData.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" }}>

                                                <td style={{ paddingLeft: "40px" }}>{row.billingMonth}</td>
                                                <td style={{ paddingLeft: "10px" }}>{row.from}</td>
                                                <td style={{ paddingLeft: "5px" }}>{row.to}</td>
                                                <td style={{ paddingLeft: "10px", fontWeight: 600, color: "black" }}>{row.floor}</td>
                                                <td style={{ paddingLeft: "10px", fontWeight: 600, color: "black" }}>{row.room}</td>
                                                <td style={{ paddingLeft: "10px", fontWeight: 600, color: "black" }}>{row.bed}</td>
                                                <td style={{ paddingLeft: "40px", fontWeight: 600, color: "black" }}>{row.units}</td>
                                                <td style={{ paddingLeft: "25px", fontWeight: 600, color: "black" }}>{row.amount}</td>



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
                                            BILLING MONTH
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            FROM
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            TO
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            FLOOR
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            ROOM
                                        </th>

                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                            BED
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                            TOTAL UNITS
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, padding: "12px 16px" }}>
                                            AMOUNT
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>
                                        {billingData.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px" }}>

                                                <td style={{ paddingLeft: "40px" }}>{row.billingMonth}</td>
                                                <td style={{ paddingLeft: "10px" }}>{row.from}</td>
                                                <td style={{ paddingLeft: "5px" }}>{row.to}</td>
                                                <td style={{ paddingLeft: "10px", fontWeight: 600, color: "black" }}>{row.floor}</td>
                                                <td style={{ paddingLeft: "10px", fontWeight: 600, color: "black" }}>{row.room}</td>
                                                <td style={{ paddingLeft: "10px", fontWeight: 600, color: "black" }}>{row.bed}</td>
                                                <td style={{ paddingLeft: "40px", fontWeight: 600, color: "black" }}>{row.units}</td>
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

EBTenantOverview.propTypes = {
    onBack: PropTypes.func.isRequired,
};
export default EBTenantOverview;

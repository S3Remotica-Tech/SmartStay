

/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from '/src/Assets/Images/New_images/building1.svg';
import Profile from "../../Assets/Images/Profile.jpg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import { Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
// import { BiDotsVerticalRounded } from "react-icons/bi";
import verify from "../../Assets/Images/New_images/verify.svg";
import Bed from "../../Assets/Images/New_images/Bed.svg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";

const EBTenantOverview = ({ tenant, onBack }) => {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("customer");
    // const [loading, setLoading] = useState(false);

    const [tenantReadingList, setTenantreadingList] = useState([])

    // console.log("tenant called", tenant)

    useEffect(() => {
        if (state.login?.selectedHostel_Id && tenant?.customerId) {
            dispatch({
                type: 'GETPARTICULARCUSTOMERREADING',
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    customerId: tenant.customerId
                }
            })
            // setLoading(true)
        }

    }, [tenant?.customerId, state.login?.selectedHostel_Id])


    useEffect(() => {
        if (state.UsersList.getParticularCustomerReadingStatus === 200) {
            // setLoading(false)
            setTenantreadingList(state.UsersList?.getParticularCustomerReadingList)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_PARTICULAR_CUSTOMER_READING' })
            }, 100)

        }

    }, [state.UsersList.getParticularCustomerReadingStatus])



    const billingData = [];

    const formattedTenantReadings = (tenantReadingList?.electricityHistory || []).map((item) => {


        const getBillingMonth = (dateStr) => {
            if (!dateStr) return "-";

            const parts = dateStr.split("/");
            if (parts.length !== 3) return "-";

            const [day, month, year] = parts.map(Number);
            if (!day || !month || !year) return "-";

            return new Date(year, month - 1, 1).toLocaleString("en-US", {
                month: "short",
                year: "numeric",
            });
        };


        const formatDate = (dateStr) => {
            const [d, m, y] = dateStr.split("/").map(Number);
            return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
            });
        };

        return {
            billingMonth: getBillingMonth(item.startDate),
            from: formatDate(item.startDate),
            to: formatDate(item.endDate),
            floor: item.floorName || tenantReadingList.floorName,
            room: item.roomName || tenantReadingList.roomName,
            bed: item.bedName || tenantReadingList.bedName,
            totalUnits: item.consumption || 0,
            amount: item.amount || 0,
            profilePic: tenantReadingList.profilePic || null,
            tenantName: `${tenantReadingList.firstName || ""} ${tenantReadingList.lastName || ""}`.trim(),
        };
    });









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
                                src={tenant?.profilePic || Profile}
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
                                    {tenant?.fullName}
                                    <img src={verify} alt="verify" style={{ marginTop: "-5px" }}></img>
                                </p>

                                <div className="d-flex align-items-center" style={{ gap: "16px" }}>

                                    <div className="d-flex align-items-center" style={{ gap: "6px" }}>
                                        <img src={building} height="14" width="14" alt="Floor" />
                                        <span style={{ color: "Black", fontWeight: 600, fontSize: "14px", fontFamily: "Gilroy" }}>
                                            {tenant.floorName}
                                        </span>
                                    </div>

                                    <span style={{ fontSize: "14px", fontWeight: 600, color: "black", marginLeft: 5, fontFamily: "Gilroy" }}>

                                        <img
                                            src={Bed}
                                            height="14"
                                            width="14"
                                            style={{ marginRight: 6, marginTop: "-4px" }}
                                            alt="Bed"
                                        />
                                        {tenant.roomName}
                                    </span>

                                    <span
                                        style={{
                                            fontSize: "14px",
                                            fontWeight: 600,
                                            color: "black",
                                            marginLeft: 5, fontFamily: "Gilroy"
                                        }}
                                    >
                                        <img
                                            src={Bed}
                                            height="14"
                                            width="14"
                                            style={{ marginRight: 6, marginTop: "-4px" }}
                                            alt="Bed"
                                        />
                                        {tenant.bedName}
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

                {activeTab === "room" && (
                    billingData?.length === 0 ? (
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
                            className="table-responsive mx-4 show-scrolls"
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
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            BILLING MONTH
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            FROM
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            TO
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            FLOOR
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            ROOM
                                        </th>

                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, }}>
                                            BED
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, }}>
                                            TOTAL UNITS
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, }}>
                                            AMOUNT
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>
                                        {billingData?.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "" }}>

                                                <td style={{ fontWeight: 600, color: "black" }}>{row.billingMonth}</td>
                                                <td style={{ fontWeight: 600, color: "black" }}>{row.from}</td>
                                                <td style={{ fontWeight: 600, color: "black" }}>{row.to}</td>
                                                <td style={{ fontWeight: 600, color: "black" }}>{row.floor}</td>
                                                <td style={{ fontWeight: 600, color: "black" }}>{row.room}</td>
                                                <td style={{ fontWeight: 600, color: "black" }}>{row.bed}</td>
                                                <td style={{ fontWeight: 600, color: "black" }}>{row.units}</td>
                                                <td style={{ fontWeight: 600, color: "black" }}>{row.amount}</td>



                                            </tr>
                                        ))}
                                    </PaginationList>
                                </tbody>
                            </Table>
                        </div>
                    )
                )}

                {activeTab === "customer" && (
                    formattedTenantReadings?.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <img src={emptyimg} width={240} height={240} alt="emptystate" />
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                                No Reading
                            </div>
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                                There are no reading available.
                            </div>
                        </div>
                    ) : (
                        <div
                            className="table-responsive mx-4 show-scrolls"
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
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            BILLING MONTH
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            FROM
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            TO
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            FLOOR
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            ROOM
                                        </th>

                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            BED
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            TOTAL UNITS
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            AMOUNT
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>
                                        {formattedTenantReadings?.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "", fontFamily: "Gilroy" }}>

                                                <td style={{}}>{row.billingMonth}</td>
                                                <td style={{}}>{row.from}</td>
                                                <td style={{}}>{row.to}</td>
                                                <td style={{}}>{row.floor}</td>
                                                <td style={{}}>{row.room}</td>
                                                <td style={{}}>{row.bed}</td>
                                                <td style={{}}>{row.totalUnits}</td>
                                                <td style={{}}>{row.amount}</td>



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
    tenant: PropTypes.func.isRequired
};
export default withErrorBoundary(EBTenantOverview);

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import leftarrow from "../../Assets/Images/arrow-left.png";
import building from '/src/Assets/Images/New_images/building1.svg';
import Ellipse1 from "../../Assets/Images/Profile.jpg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import { Table } from "react-bootstrap";
import PaginationList from "../../Components/PaginationList";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { BiDotsVerticalRounded } from "react-icons/bi";
import withErrorBoundary from "../../Hoc/WithErrorBountry";


const EBRoomOverview = ({ onBack, room }) => {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [activeTab, setActiveTab] = useState("room");
    const [roomReadingList, setRoomReadingList] = useState();
    const [tenantReadingList, setTenantreadingList] = useState()
    const [tableLoading, setTableLoading] = useState(false)



    useEffect(() => {
        if (room.hostelId && room.roomId) {
            dispatch({ type: 'GETPARTICULARROOMREADING', payload: { hostelId: room.hostelId, roomId: room.roomId } })
            setTableLoading(true)
        }
    }, [])

    useEffect(() => {
        if (state.UsersList.getparticularRoomReadingStatus === 200) {
            setTableLoading(false)
            setRoomReadingList(state.UsersList?.getParticularRoomReadingList?.readings)
            setTenantreadingList(state.UsersList?.getParticularRoomReadingList?.customers)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_PARTICULAR_ROOM_READING' })
            }, 100)

        }

    }, [state.UsersList.getparticularRoomReadingStatus])




    const formattedReadings = roomReadingList?.map((item) => {
         const [, month, year] = item.entryDate.split("/").map(Number);

        const billingMonth = new Date(year, month - 1, 1).toLocaleString("en-US", {
            month: "short",
            year: "numeric",
        });

        const formatDate = (dateStr) => {
            const [d, m, y] = dateStr.split("/").map(Number);
            return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
            });
        };

        const formatReadingDate = (dateStr) => {
            if (!dateStr) return "-";
            const [day, month, year] = dateStr.split("/").map(Number);
            return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
            });
        };


        return {
            billingMonth: billingMonth,
            readingDate: formatReadingDate(item.entryDate),
            from: formatDate(item.startDate),
            to: formatDate(item.endDate),
            reading: item.reading,
            totalUnits: item.consumption,
            amount: item.amount,
        };
    });








    const formattedTenantReadings = tenantReadingList?.map((item) => {
       

        const formatDate = (dateStr) => {
            const [d, m, y] = dateStr.split("/").map(Number);
            return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
            });
        };

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


        return {
            fullName: item.fullName,
            profilePic: item.profilePic,
            billingMonth: getBillingMonth(item.startDate),
            from: formatDate(item.startDate),
            to: formatDate(item.endDate),
            bed: item.bedName,
            totalUnits: item.totalUnits,
            amount: item.totalAmount,
            initials: item.initials
        };
    });




    return (
        <>

            <div>
                <div className="mb-2 px-4">

                    <div
                        className="d-flex align-items-center"
                        style={{
                            position: "sticky",
                            top: 4,
                            zIndex: 1000,
                            backgroundColor: "#fff",
                            padding: "12px 5px",
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
                                        {room.roomName}
                                    </p>
                                    <div className="d-flex justify-content-start align-items-center" style={{ gap: 6, marginTop: 4 }}>
                                        <img src={building} height="14" width="14" alt="Ground Floor" />
                                        <div style={{ color: "#4B4B4B", fontSize: 14 }}>{room.floorName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center mb-3 mx-4">
                    <div
                        className="d-flex"
                        style={{ marginLeft: "2px", }}
                    >
                        <div
                            onClick={() => setActiveTab("room")}
                            style={{
                                fontSize: 17,
                                fontFamily: "Gilroy",
                                color: activeTab === "room" ? "black" : "#4B4B4B",
                                fontWeight: activeTab === "room" ? "600" : "normal",
                                cursor: "pointer",
                                marginRight: 24,
                                paddingBottom: 6,
                                borderBottom:
                                    activeTab === "room"
                                        ? "2px solid #1E45E1"
                                        : "2px solid transparent",
                            }}
                        >
                            Reading
                        </div>
                        <div
                            onClick={() => setActiveTab("customer")}
                            style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                color: activeTab === "customer" ? "black" : "#4B4B4B",
                                fontWeight: activeTab === "customer" ? "600" : "normal",
                                cursor: "pointer",
                                paddingBottom: 6,
                                borderBottom:
                                    activeTab === "customer"
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

                {activeTab === "room" && (
                    roomReadingList?.length === 0 ? (
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
                                position: "relative"
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
                                    <tr className="text-uppercase" style={{ textAlign: "center" }}>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            BILLING MONTH
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            READING DATE
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            FROM
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            TO
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            READING
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            TOTAL UNITS
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            AMOUNT
                                        </th>

                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            ACTION
                                        </th>
                                    </tr>
                                </thead>
                                <tbody style={{ fontSize: 14, color: "#000" }}>
                                    <PaginationList>
                                        {formattedReadings?.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", fontFamily: "Gilroy", textAlign: "center" }}>

                                                <td className="p-0" style={{}}>{row.billingMonth}</td>
                                                <td style={{}}>{row.readingDate}</td>
                                                <td style={{}}>{row.from}</td>
                                                <td style={{}}>{row.to}</td>
                                                <td style={{}}>{row.reading}</td>
                                                <td style={{}}>{row.totalUnits}</td>
                                                <td style={{}}>{row.amount}</td>
                                                <td style={{}}>
                                                    <BiDotsVerticalRounded style={{ color: '#000', fontSize: 19, cursor: "pointer", transform: "rotate(90deg)" }} />
                                                </td>
                                            </tr>
                                        ))}
                                    </PaginationList>
                                </tbody>
                            </Table>

                            {tableLoading &&
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
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
                        </div>
                    )
                )}

                {activeTab === "customer" && (
                    tenantReadingList?.length === 0 ? (
                        <div style={{ textAlign: "center", marginTop: 40 }}>
                            <img src={emptyimg} width={240} height={240} alt="emptystate" />
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                                No tenant reading
                            </div>
                            <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                                There are no tenant reading available.
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
                                    <tr className="text-uppercase" style={{ textAlign: "center" }}>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            NAME
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            BILLING MONTH
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            FROM
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, }}>
                                            TO
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 14, }}>
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

                                                <td className="p-1 d-flex  align-items-center gap-2 ms-4" style={{ fontWeight: 600, color: "black", textAlign: "start" }}>
                                                    {
                                                        formattedTenantReadings.profilePic ?
                                                            <img src={formattedTenantReadings.profilePic ? formattedTenantReadings.profilePic : Ellipse1} alt="" style={{ marginRight: "12px", height: 45, width: 45 }} />
                                                            :
                                                            <div
                                                                style={{
                                                                    height: 35,
                                                                    width: 35,
                                                                    borderRadius: "50%",
                                                                    backgroundColor: "#1E45E1",
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    fontSize: 13,
                                                                    fontWeight: "600",
                                                                    color: "white", fontFamily: "Gilroy"
                                                                }}
                                                            >
                                                                {row?.initials || "-"}
                                                            </div>
                                                    }
                                                    {row.fullName}
                                                </td>

                                                <td className="p-0" style={{ textAlign: "center" }}>{row.billingMonth}</td>
                                                <td className="p-0" style={{ textAlign: "center" }}>{row.from}</td>
                                                <td className="p-0" style={{ textAlign: "center" }}>{row.to}</td>
                                                <td className="p-0" style={{ textAlign: "center" }}>{row.bed}</td>
                                                <td className="p-0" style={{ textAlign: "center" }}>{row.totalUnits}</td>
                                                <td className="p-0" style={{ textAlign: "center" }}>{row.amount}</td>

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
    room: PropTypes.func.isRequired,

};
export default withErrorBoundary(EBRoomOverview);

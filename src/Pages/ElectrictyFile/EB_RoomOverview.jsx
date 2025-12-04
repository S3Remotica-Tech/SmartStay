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

console.log("room",room)


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

    console.log("roomReadingList*****", roomReadingList)


    const formattedReadings = roomReadingList?.map((item) => {
        const [day, month, year] = item.entryDate.split("/");
        const billingMonth = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
            month: "long",
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
            amount: item.consumption * item.unitPrice,
        };
    });








    const formattedTenantReadings = tenantReadingList?.map((item) => {
        const [day, month, year] = item.startDate.split("/");
        const billingMonth = new Date(`${year}-${month}-01`).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
        });

        const formatDate = (dateStr) => {
            const [d, m, y] = dateStr.split("/").map(Number);
            return new Date(y, m - 1, d).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
            });
        };



        return {
            fullName: item.fullName,
            profilePic: item.profilePic,
            billingMonth,
            from: formatDate(item.startDate),
            to: formatDate(item.endDate),
            bed: item.bedName,
            totalUnits: item.totalUnits,
            amount: item.totalAmount
        };
    });




    return (
        <>

            <div>
                <div className="mb-5 px-4">

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
                        style={{ marginLeft: "2px", marginTop: "-10px" }}
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
                            className="table-responsive mx-4"
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
                                    <tr className="text-uppercase" style={{textAlign:"center"}}>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            BILLING MONTH
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            READING DATE
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            FROM
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            TO
                                        </th>
                                        <th style={{ fontFamily: "Gilroy", color: "gray", fontWeight: 600, fontSize: 13, padding: "12px 16px" }}>
                                            READING
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
                                        {formattedReadings?.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px", fontFamily: "Gilroy", textAlign:"center" }}>

                                                <td style={{padding: "12px 16px" }}>{row.billingMonth}</td>
                                                <td style={{ padding: "12px 16px" }}>{row.readingDate}</td>
                                                <td style={{ padding: "12px 16px" }}>{row.from}</td>
                                                <td style={{ padding: "12px 16px" }}>{row.to}</td>
                                                 <td style={{ padding: "12px 16px" }}>{row.reading}</td>
                                                <td style={{ padding: "12px 16px" }}>{row.totalUnits}</td>
                                                <td style={{ padding: "12px 16px" }}>{row.amount}</td>
                                                <td style={{ padding: "12px 16px" }}>
                                                    <BiDotsVerticalRounded style={{ color: '#000', fontSize: 19, cursor: "pointer" }} />
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
                                    <tr className="text-uppercase" style={{textAlign:"center"}}>
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
                                        {formattedTenantReadings?.map((row, i) => (
                                            <tr key={i} style={{ borderBottom: "1px solid #ddd", height: "50px", fontFamily: "Gilroy" }}>

                                                <td style={{ padding: "12px 16px", fontWeight: 600, color: "black", textAlign:"start"  }}>
                                                    <img src={formattedTenantReadings.profilePic ? formattedTenantReadings.profilePic : Ellipse1} alt="" style={{ marginRight: "12px", height: 45, width: 45 }} />
                                                    {row.fullName}
                                                </td>

                                                <td style={{ padding: "12px 16px" ,textAlign:"center" }}>{row.billingMonth}</td>
                                                <td style={{ padding: "12px 16px",textAlign:"center"  }}>{row.from}</td>
                                                <td style={{padding: "12px 16px" ,textAlign:"center" }}>{row.to}</td>
                                                <td style={{ padding: "12px 16px",textAlign:"center" }}>{row.bed}</td>
                                                <td style={{ padding: "12px 16px" ,textAlign:"center" }}>{row.totalUnits}</td>
                                                <td style={{ padding: "12px 16px" ,textAlign:"center" }}>{row.amount}</td>

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

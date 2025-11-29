import Offcanvas from "react-bootstrap/Offcanvas";
import { ThreeDots } from "react-bootstrap-icons";
import { NotificationBing, CloseCircle, Chart21 } from 'iconsax-react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";



export default function Notification({ show, handleClose }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [notification, setNotification] = useState('')




    useEffect(() => {
        if (state.login.notificationStatus === 200) {
            setNotification(state.login?.Notification)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ALL_NOTIFICATION_STATUS' })
            }, 100)

        }

    }, [state.login.notificationStatus])



    console.log("notification", notification)

    function getDateLabel(dateStr) {
        const [day, month, year] = dateStr.split("/").map(Number);
        const date = new Date(year, month - 1, day);

        const today = new Date();
        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

        const isYesterday =
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear();

        if (isToday) return "Today";
        if (isYesterday) return "Yesterday";


        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return `${day} ${monthNames[month - 1]} ${year}`;
    }



    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            backdrop={true}
            style={{
                width: 350,
                fontFamily: "Gilroy",
                borderLeft: "1px solid #E5E7EB",
            }}
        >

            <Offcanvas.Header className="gap-0  d-flex ">
                <div className="d-flex align-items-center gap-2">
                    <div
                        style={{
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                            background: "#1E45E1",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontWeight: 600,
                            color: "#1e293b",
                        }}
                    >
                        <NotificationBing
                            size="24"
                            color="#FFFFFF" />
                    </div>

                    <div>
                        <div style={{ fontSize: 22, fontWeight: 600, color: "#1F2633" }}>Notifications</div>
                        <div style={{ fontSize: 13, color: "#3C3C4399", fontWeight: 400 }}>
                            {state.login?.Notification?.unreadCount} unread notifications
                        </div>
                    </div>
                </div>


                <CloseCircle size="24" color="#FF0000" onClick={handleClose} style={{ cursor: "pointer" }} />
            </Offcanvas.Header>
            <hr className="m-0" style={{ border: "1px solid #ccc" }} />
            <Offcanvas.Body style={{ fontFamily: "Gilroy", padding: 0 }}>

                {notification?.listOfNotifications?.length > 0 ? notification?.listOfNotifications?.map((item) => {
                    return (
                        <div key={item.notificationId}>

                            <div className="ps-3"
                                style={{
                                    color: "#4B4B4B",
                                    fontSize: 12,
                                    fontWeight: 600,
                                    margin: "5px 0",
                                }}
                            >
                                {getDateLabel(item?.requestedAt)}
                            </div>
                            <div style={{ backgroundColor: item.isRead ? "#FFF" : "#EDF3FF", }}>
                                <div
                                    style={{
                                        display: "flex",
                                        gap: 12,
                                        padding: "12px 14px",
                                        borderRadius: 10,

                                    }}
                                >
                                    <div
                                        style={{
                                            width: 38,
                                            height: 38,
                                            borderRadius: "50%",
                                            background: "#E2E8F0",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 600,
                                            color: "#73839B",
                                        }}
                                    >
                                        {item.requestedUser ? item.requestedUser : <Chart21
                                            size="18"
                                            color="#73839B"
                                        />}
                                    </div>


                                    <div style={{ flex: 1 }}>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 6,
                                                marginBottom: 4,
                                            }}
                                        >
                                            <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>
                                                {item.notificationTitle}
                                            </div>
                                            <div style={{ fontSize: 12 }}>2m</div>
                                            <ThreeDots size={20} />
                                        </div>

                                        <div style={{ fontSize: 13, color: "#374151" }}>
                                            {item.notificationDescription}
                                        </div>
                                        {
                                            item.isRead ?   <hr className="mt-3 mb-1" style={{ border: "1px solid #ccc" }} />
                                            :
                                            ""
                                        }
                                       

                                        {/* <div style={{ display: "flex", gap: 8, marginTop: 10 }}>

                                    </div> */}

                                        {/* <button
                                        style={{
                                            marginTop: 10,
                                            background: "#1E45E1",
                                            border: "none",
                                            padding: "6px 16px",
                                            borderRadius: 6,
                                            color: "white",
                                            fontSize: 13,
                                            cursor: "pointer",
                                        }}
                                    >
                                        Review
                                    </button> */}
                                    </div>
                                </div>

                            </div>

                            {/* <div
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    padding: "14px 0",
                                    borderBottom: "1px solid #E5E7EB",
                                }}
                            >
                                <div
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: "50%",
                                        background: "#E2E8F0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 600,
                                    }}
                                >
                                    PR
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            marginBottom: 4,
                                        }}
                                    >
                                        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>
                                            Payment received: ₹7,500
                                        </div>
                                        <div style={{ fontSize: 12 }}>02h</div>
                                        <ThreeDots size={20} />
                                    </div>

                                    <div style={{ fontSize: 13, color: "#374151" }}>
                                        ₹8000 received via UPI on 03 July 2025. Receipt generated.
                                    </div>
                                </div>
                            </div>


                            <div
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    padding: "14px 0",
                                    borderBottom: "1px solid #E5E7EB",
                                }}
                            >
                                <div
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: "50%",
                                        background: "#E2E8F0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 600,
                                    }}
                                >
                                    RD
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            marginBottom: 4,
                                        }}
                                    >
                                        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>
                                            New Tenant Added – Rahul D
                                        </div>
                                        <div style={{ fontSize: 12 }}>04h</div>
                                        <ThreeDots size={20} />
                                    </div>

                                    <div style={{ fontSize: 13, color: "#374151" }}>
                                        Tenant added to Ground Floor, Room 102.
                                    </div>
                                </div>
                            </div>


                            <div
                                style={{
                                    color: "#6B7280",
                                    fontSize: 13,
                                    fontWeight: 600,
                                    margin: "10px 0",
                                }}
                            >
                                Yesterday
                            </div>


                            <div
                                style={{
                                    display: "flex",
                                    gap: 12,
                                    padding: "14px 0",
                                    borderBottom: "1px solid #E5E7EB",
                                }}
                            >
                                <div
                                    style={{
                                        width: 38,
                                        height: 38,
                                        borderRadius: "50%",
                                        background: "#E2E8F0",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 600,
                                    }}
                                >
                                    SJ
                                </div>

                                <div style={{ flex: 1 }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 6,
                                            marginBottom: 4,
                                        }}
                                    >
                                        <div style={{ flex: 1, fontSize: 15, fontWeight: 600 }}>
                                            Complaint Resolved by Admin
                                        </div>
                                        <div style={{ fontSize: 12 }}>Yesterday</div>
                                        <ThreeDots size={20} />
                                    </div>

                                    <div style={{ fontSize: 13, color: "#374151" }}>
                                        Issue resolved: “Fan not working” in Room 303.
                                    </div>
                                </div>
                            </div> */}
                        </div>

                    );
                })
                    :
                    <div
                        style={{
                            textAlign: "center",
                            marginTop: 60,
                            color: "#6B7280",
                            fontSize: 15,
                            fontWeight: 500,
                        }}
                    >
                        No notifications available
                    </div>


                }
            </Offcanvas.Body>
        </Offcanvas>
    );
}

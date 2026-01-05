/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ThreeDots } from "react-bootstrap-icons";
import { NotificationBing, CloseCircle, Chart21 } from 'iconsax-react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Smartstay from "../Assets/Images/New_images/LogoSmart.svg";
import ComplaintsView from "../Pages/Compliants/ComplaintsView"
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";







function Notification({ show, handleClose }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [notification, setNotification] = useState('')
    const [showComplaint, setShowComplaint] = useState(false);

    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({ type: 'ALLNOTIFICATION', payload: state.login.selectedHostel_Id })
        }
    }, [state.login.selectedHostel_Id])





    useEffect(() => {
        if (state.login.notificationStatus === 200) {
            setNotification(state.login?.Notification)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ALL_NOTIFICATION_STATUS' })
            }, 100)

        }

    }, [state.login.notificationStatus])




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


    const handleNavigateComplaintsView = (complaintId) => {
        setShowComplaint(true)
        if(complaintId){
                    dispatch({ type: 'COMPLAINTSVIEWUPDATES', payload: { hostelId: state.login.selectedHostel_Id, complaintsId: complaintId } })
        }

    }

    const handleCloseComplaintsView = () => {
        setShowComplaint(false)
    }


    const handleNavigateAmenitiesView = (customer) => {
        setShowComplaint(false)
        handleClose()
        dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: customer?.userId } });
        navigate(`/tenant/details/${customer.userId}`, {
            state: {
                customerId: customer?.userId,
                hostelId: state.login?.selectedHostel_Id,
                name: customer?.fullName, IsOverView: true,
                scrollTo: "amenities"
            },
        });


    }

    return (
        <>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end"
                backdrop="static"
                style={{
                    width: 350,
                    fontFamily: "Gilroy",
                    borderLeft: "1px solid #E5E7EB", borderRadius: 10
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
                            <div style={{ fontSize: 20, fontWeight: 600, color: "#1F2633" }}>Notifications</div>
                            <div style={{ fontSize: 13, color: "#3C3C4399", fontWeight: 400 }}>
                                {state.login?.Notification?.unreadCount || "0"} unread notifications
                            </div>
                        </div>
                    </div>


                    <CloseCircle size="24" color="#FF0000" onClick={handleClose} style={{ cursor: "pointer" }} />
                </Offcanvas.Header>
                <hr className="m-0" style={{ border: "1px solid #ccc" }} />
                <Offcanvas.Body style={{ fontFamily: "Gilroy", padding: 0, marginBottom: 0 }}>

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
                                            {item.initials ? item.initials : <Chart21
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
                                                <div style={{ flex: 1, fontSize: 14, fontWeight: 600 }}>
                                                    {item.notificationTitle}
                                                </div>
                                                <div style={{ fontSize: 12 }}>2m</div>
                                                <ThreeDots size={20} />
                                            </div>

                                            <div style={{ fontSize: 12, color: "#374151" }}>
                                                {item.notificationDescription}
                                            </div>
                                            {
                                                item.isRead ? <hr className="mt-3 mb-1" style={{ border: "1px solid #ccc" }} />
                                                    :
                                                    ""
                                            }



                                            {
                                                item.typeCode === 4 ?
                                                    <button onClick={()=>handleNavigateComplaintsView(item.requestId)}
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
                                                    </button>
                                                    :

                                                    item.typeCode === 1 ?
                                                        <button onClick={() => handleNavigateAmenitiesView(item)}
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
                                                            Amenities
                                                        </button>


                                                        :

                                                        item.typeCode === 2 ?

                                                            <button
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
                                                                Change Bed
                                                            </button>

                                                            :


                                                            // item.typeCode === 3 ?

                                                            //     <button
                                                            //         style={{
                                                            //             marginTop: 10,
                                                            //             background: "#1E45E1",
                                                            //             border: "none",
                                                            //             padding: "6px 16px",
                                                            //             borderRadius: 6,
                                                            //             color: "white",
                                                            //             fontSize: 13,
                                                            //             cursor: "pointer",
                                                            //         }}
                                                            //     >
                                                            //         Checkout
                                                            //     </button>
                                                            //     :
                                                                item.typeCode === 5 ?

                                                                    <button
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
                                                                        Maintenance
                                                                    </button>

                                                                    // :
                                                                    // item.typeCode === 6 ?   
                                                                    //     <button
                                                                    //         style={{
                                                                    //             marginTop: 10,
                                                                    //             background: "#1E45E1",
                                                                    //             border: "none",
                                                                    //             padding: "6px 16px",
                                                                    //             borderRadius: 6,
                                                                    //             color: "white",
                                                                    //             fontSize: 13,
                                                                    //             cursor: "pointer",
                                                                    //         }}
                                                                    //     >
                                                                    //         Missing checkout
                                                                    //     </button>
                                                                        : 
                                                                        
                                                                    //    item.typeCode === 7 ?

                                                                    // // <button
                                                                    // //     style={{
                                                                    // //         marginTop: 10,
                                                                    // //         background: "#1E45E1",
                                                                    // //         border: "none",
                                                                    // //         padding: "6px 16px",
                                                                    // //         borderRadius: 6,
                                                                    // //         color: "white",
                                                                    // //         fontSize: 13,
                                                                    // //         cursor: "pointer",
                                                                    // //     }}
                                                                    // // >
                                                                    // //    Recurring
                                                                    // // </button> 
                                                                        
                                                                    //   :  
                                                                        
                                                                        
                                                                        
                                                                        ""}

                                        </div>
                                    </div>

                                </div>


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


                <div
                    style={{
                        padding: "12px 16px",
                        borderTop: "1px solid #E5E7EB",
                        background: "#FFFFFF",
                        position: "sticky",
                        bottom: 0,
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        fontFamily: "Gilroy", borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                    }}
                >
                    <div style={{ fontSize: 12, color: "#6B7280" }}>
                        <img
                            src={Smartstay}
                            alt="smartstay"
                            style={{ height: 19, width: 105 }}
                            className="Title"

                        />
                    </div>

                    <label style={{ color: "#222222", fontSize: 13, }}>v 2.0</label>
                </div>



            </Offcanvas>

            {
                showComplaint && <ComplaintsView show={showComplaint} handleClose={handleCloseComplaintsView} />
            }

        </>
    );
}
Notification.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
 };

export default  Notification;
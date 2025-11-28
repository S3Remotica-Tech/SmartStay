import Offcanvas from "react-bootstrap/Offcanvas";
import { ThreeDots } from "react-bootstrap-icons";
import { NotificationBing, CloseCircle} from 'iconsax-react'

export default function Notification({ show, handleClose }) {
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

            <Offcanvas.Header  className="gap-0">
                <div>
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
                </div>
                <div>
                    <div style={{ fontSize: 22, fontWeight: 600, color: "#1F2633" }}>Notifications</div>
                    <div style={{ fontSize: 13, color: "#3C3C4399", fontWeight: 400 }}>
                        3 unread notifications
                    </div>
                </div>

                <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
            </Offcanvas.Header>

            <Offcanvas.Body style={{ padding: 20, fontFamily: "Gilroy" }}>


                <div
                    style={{
                        color: "#4B4B4B",
                        fontSize: 12,
                        fontWeight: 600,
                        margin: "10px 0",
                    }}
                >
                    Today
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
                            color: "#73839B",
                        }}
                    >
                        AB
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
                                Ashwin Bose raised a New Complaint
                            </div>
                            <div style={{ fontSize: 12 }}>2m</div>
                            <ThreeDots size={20} />
                        </div>

                        <div style={{ fontSize: 13, color: "#374151" }}>
                            Water leakage in Room 12 - Plumbing.
                        </div>

                        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>

                        </div>

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
                            Review
                        </button>
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
                </div>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

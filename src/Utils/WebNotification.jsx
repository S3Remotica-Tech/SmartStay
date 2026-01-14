import { useEffect, useState } from "react";
import { CloseCircle } from "iconsax-react";

const WebNotification = ({ title, message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {

        setVisible(true);

        const audio = new Audio("/notification.mp3");
        audio.volume = 0.2;
        audio.play().catch(() => { });

    }, []);

    const audio = new Audio("/notification.mp3");

    return (
        <div
            style={{
                display: "flex",
                gap: 12,
                padding: 12,
                width: 360,
                backgroundColor: "rgba(245, 248, 255, 0.95)",
                borderRadius: 12,
                boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                fontFamily: "Gilroy",
                backdropFilter: "blur(10px)",
                transform: visible ? "translateX(0)" : "translateX(120%)",
                opacity: visible ? 1 : 0,
                transition: "all 0.4s ease-out",
                position: "relative",
            }}
        >
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {title}
                </div>

                <div
                    style={{
                        fontSize: 13,
                        color: "#555",
                        marginTop: 4,
                    }}
                >
                    {message}
                </div>

            </div>
            {/* <div
                onClick={onClose}
                style={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    cursor: "pointer",
                }}
            >
                <CloseCircle size="20" color="#999" variant="Bold" />
            </div> */}
        </div>
    );
};

export default WebNotification;

import Offcanvas from "react-bootstrap/Offcanvas";
import { ArrowCircleRight } from "iconsax-react";
import { MessageText, TagUser } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { TiLeaf } from "react-icons/ti";
import { RiMessage2Fill } from "react-icons/ri";
import '../CustomerFile/UserList.css';


function Complaints({ show, handleClose, complaintsDetails, trigger }) {

    // console.log("complaintsDetails", complaintsDetails)


    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (complaintsDetails?.complaintId) {
            dispatch({ type: 'COMPLAINTSVIEW', payload: complaintsDetails?.complaintId })
        }
    }, [complaintsDetails?.complaintId])

    const StepItem = ({ children, isLast, type }) => {


        const getIcon = () => {
            switch (type) {
                case "Complaint Resolved":
                    return {
                        bg: "#16A34A",
                        icon: <IoCheckmarkDoneOutline color="#fff" size={20} />
                    };
                case "Work Completed":
                    return {
                        bg: "#E0FFE1",
                        icon: <FaCheck color="#16A34A" size={20} />
                    };

                case "Complaint In Progress":
                    return {
                        bg: "#FFF2DE",
                        icon: <TiLeaf color="#F59E0B" size={20} />
                    };

                case "Complaint Assigned":
                    return {
                        bg: "#E2E8F0",
                        icon: <TagUser
                            size="20"
                            color="#73839B"
                        />
                    };

                case "Complaint Raised":

                    return {
                        bg: "#E2E8F0",
                        icon: <RiMessage2Fill color="#73839B" size={20} />
                    };
            }
        };

        const { bg, icon } = getIcon();



// console.log("state ",state.ComplianceList.complaintsView)








        return (
            <Row className="mb-3">

                <Col xs="auto" className="d-flex flex-column align-items-center">
                    <div
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: bg,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: 14,
                        }}
                    >
                        {icon}
                    </div>

                    {!isLast && (
                        <div
                            style={{
                                width: 2,
                                flex: 1,
                                background: "#D1D5DB",
                                marginTop: 4,
                            }}
                        ></div>
                    )}
                </Col>

                {/* CONTENT */}
                <Col style={{ paddingBottom: 20 }}>
                    {children}
                </Col>
            </Row>
        );
    };




    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            backdrop="static"
            style={{
                width: 355,
                borderLeft: "1px solid #E5E7EB",
                fontFamily: "Gilroy", right: trigger ? 0 : "358px",
                position: "fixed",
                borderRadius: 10
            }}
        >

            <Offcanvas.Header className="gap-0 d-flex justify-content-between">
                <div className="d-flex align-items-center gap-3">
                    {/* <div
                        style={{
                            width: 46,
                            height: 46,
                            borderRadius: "50%",
                            background: "#1E45E1",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MessageText size={24} color="#FFF" />
                    </div> */}

                    <div>
                        <div style={{ fontSize: 20, fontWeight: 600, color: "#1F2633" }}>
                            History & Comments
                        </div>
                        <div style={{ fontSize: 13, color: "#1E45E1", fontWeight: 600 }}>
                            Complaint Id -
                        </div>
                    </div>
                </div>

                <ArrowCircleRight
                    size="26"
                    color="#28303F"
                    onClick={handleClose}
                    style={{ cursor: "pointer" }}
                />
            </Offcanvas.Header>

            <hr className="m-0" style={{ border: "1px solid #ccc" }} />

            {/* BODY */}
            <Offcanvas.Body
                style={{ padding: "15px", overflowY: "auto", maxHeight: "90vh" }}
            >


                <div className="d-flex  align_items-center gap-2"
                    style={{
                        padding: 15,
                        borderRadius: 10,
                        // border: "1px solid #E5E7EB",
                        marginBottom: 10,
                    }}
                >
                    <div>

                        {complaintsDetails?.customerProfile &&
                            complaintsDetails?.customerProfile !== "0" ? (
                            <Image
                                src={complaintsDetails.customerProfile}
                                roundedCircle
                                style={{ height: 50, width: 50 }}
                                alt="image"
                            />
                        ) : (
                            <div
                                style={{
                                    height: 50,
                                    width: 50,
                                    borderRadius: "50%",
                                    backgroundColor: "#1E45E1",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    color: "white", fontFamily: "Gilroy"
                                }}
                            >
                                {complaintsDetails?.initials || "-"}
                            </div>
                        )}

                    </div>


                    <div>



                        <textarea
                            placeholder="Add New comment..."
                            style={{
                                width: "100%",
                                borderRadius: 6,
                                padding: 10,
                                border: "1px solid #DCDCDC",
                                outline: "none",
                                resize: "none",
                                fontSize: 14,
                            }}
                            rows={3}
                        ></textarea>

                        <button
                            style={{
                                marginTop: 10,
                                background: "#1E45E1",
                                border: "none",
                                padding: "8px 18px",
                                borderRadius: 8,
                                color: "white",
                                fontSize: 14,
                                cursor: "pointer",
                                fontWeight: 500,
                            }}
                        >
                            Add Comment
                        </button>
                    </div>
                </div>



                <div style={{ marginTop: 10 }}>


                    <StepItem type="Complaint Resolved">
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#222222" }}>Complaint Resolved</div>
                        <div style={{ fontSize: 14, color: "#1E293B", marginTop: 4 }}>
                            Tenant confirmed the complaint is resolved
                        </div>
                        <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                            Added at: 25 Oct 2025, 1:00 PM
                        </div>
                    </StepItem>

                    <StepItem type="Work Completed">
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#222222" }}>Work Completed.</div>
                        <div style={{ fontSize: 14, color: "#1E293B", marginTop: 4 }}>
                            Staff marked complaint as "Completed".
                        </div>
                        <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                            Added at: 25 Oct 2025, 12:30 PM
                        </div>
                    </StepItem>

                    <StepItem type="Complaint In Progress">
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#222222" }}>Complaint In Progress</div>
                        <div style={{ fontSize: 14, color: "#1E293B", marginTop: 4 }}>
                            Staff marked complaint as "In Progress"
                        </div>
                        <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                            Added at: 24 Oct 2025, 11:00 AM
                        </div>


                        <Row className="mt-2 align-items-center g-1">
                            <Col xs="auto" className="p-0">
                                <Image
                                    src="https://ui-avatars.com/api/?name=Malar"
                                    roundedCircle
                                    width={37}
                                    height={37}
                                    style={{ fontFamily: "Gilroy" }}
                                />
                            </Col>
                            <Col className="p-0" style={{ padding: 0 }}>
                                <div className="d-flex align-items-center gap-2 p-0">
                                    <div style={{ fontSize: 12, fontWeight: 600, color: "#3E3E3E" }}>Malar - Admin</div>
                                    <div style={{ fontSize: 12, color: "#3E3E3E", fontWeight: 400 }}>added a Comment</div>

                                </div>

                            </Col>
                        </Row>

                        <div
                            style={{
                                border: "1px solid #D1D5DB",
                                borderRadius: 8,
                                padding: 14,
                                marginTop: 10,
                                background: "#FFF",
                                fontSize: 12,
                                height: 60,
                                fontWeight: 400, color: "#222222"
                            }}
                        >
                            Complaint will Resolve by Tomorrow
                        </div>
                    </StepItem>


                    <StepItem type="Complaint Assigned">
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#222222" }}>Complaint Assigned</div>
                        <div style={{ fontSize: 14, color: "#1E293B", marginTop: 4 }}>
                            Complaint assigned to Maintenance Staff – Rajesh.
                        </div>
                        <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                            Added at: 24 Oct 2025, 10:00 AM
                        </div>
                    </StepItem>


                    <StepItem isLast={true} type="Complaint Raised">
                        <div style={{ fontWeight: 600, fontSize: 15, color: "#222222" }}>Complaint Raised – Plumbing</div>
                        <div style={{ fontSize: 14, color: "#1E293B", marginTop: 4 }}>
                            Water leaking continuously near bathroom
                        </div>
                        <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                            Added at: 23 Oct 2025, 5:00 PM
                        </div>
                    </StepItem>

                </div>



            </Offcanvas.Body>
        </Offcanvas>
    );
}
export default Complaints;
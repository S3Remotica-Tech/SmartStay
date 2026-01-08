/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { ArrowCircleRight } from "iconsax-react";
import { TagUser } from "iconsax-react";
import { useEffect, useState } from "react";
import {
    useDispatch,
    useSelector
} from "react-redux";
import { Row, Col, Image } from "react-bootstrap";
import { FaCheck } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { TiLeaf } from "react-icons/ti";
import { RiMessage2Fill } from "react-icons/ri";
import '../CustomerFile/UserList.css';
import PropTypes from "prop-types";
import ErrorMessage from '../../Components/ErrorMessage';



function Complaints({ show, handleClose, complaintsDetails, trigger }) {

    console.log("complaintsDetails", complaintsDetails)


    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [comments, setComments] = useState("");
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentsError, setCommentsError] = useState("");

    useEffect(() => {
        if (complaintsDetails?.complaintId) {
            dispatch({ type: 'COMPLAINTSVIEWUPDATES', payload: { hostelId: state.login.selectedHostel_Id, complaintsId: complaintsDetails?.complaintId } })
        }
    }, [complaintsDetails?.complaintId])



    const StepItem = ({ children, isLast, type }) => {


        const getIcon = () => {
            switch (type) {
                case "Complaint Resolved":
                    return {
                        bg: "#16A34A",
                        icon: <IoCheckmarkDoneOutline color="#fff" size={20} />,
                    };

                case "Work Completed":
                    return {
                        bg: "#E0FFE1",
                        icon: <FaCheck color="#16A34A" size={20} />,
                    };

                case "Complaint In Progress":
                    return {
                        bg: "#FFF2DE",
                        icon: <TiLeaf color="#F59E0B" size={20} />,
                    };

                case "Complaint Assigned":
                    return {
                        bg: "#E2E8F0",
                        icon: <TagUser size={20} color="#73839B" />,
                    };

                case "Complaint Raised":
                    return {
                        bg: "#E2E8F0",
                        icon: <RiMessage2Fill color="#73839B" size={20} />,
                    };

                default:
                    return {
                        bg: "#E2E8F0",
                        icon: <RiMessage2Fill color="#73839B" size={20} />,
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


                <Col style={{ paddingBottom: 20 }}>
                    {children}
                </Col>
            </Row>
        );
    };

    const getStepType = (update) => {
        const text = update?.toLowerCase();

        if (text?.includes("resolved")) return "Complaint Resolved";
        if (text?.includes("completed")) return "Work Completed";
        if (text?.includes("progress")) return "Complaint In Progress";
        if (text?.includes("assigned")) return "Complaint Assigned";
        if (text?.includes("raised")) return "Complaint Raised";

        return "Complaint Raised";
    };


    const handleAddComment = () => {

        if (!comments || !comments.trim()) {
            setCommentsError("Please enter a comment");
            return;
        }

        setCommentsError("");
        if (comments && state.ComplianceList?.ComplianceUpdates?.complaintId) {
            dispatch({
                type: "Add_COMPLIANCE_COMMENT",
                payload: {
                    complaintId: state.ComplianceList?.ComplianceUpdates?.complaintId,
                    data: { message: comments }
                },
            });
            setCommentsLoading(true)
        }
    };


    useEffect(() => {
        if (state.ComplianceList.statusCodeForAddComplianceComment === 201) {
            setCommentsLoading(false)
            setComments('')
            dispatch({ type: 'COMPLAINTSVIEWUPDATES', payload: { hostelId: state.login.selectedHostel_Id, complaintsId: complaintsDetails?.complaintId } })

            setTimeout(() => {
                dispatch({ type: "CLEAR_COMPLIANCE_ADD_COMMENT" });

            }, 1000)
        }
    }, [state.ComplianceList.statusCodeForAddComplianceComment]);




    console.log("state.ComplianceList.statusCodeForAddComplianceComment", state.ComplianceList.statusCodeForAddComplianceComment)





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


                    <div>
                        <div style={{ fontSize: 20, fontWeight: 600, color: "#1F2633" }}>
                            History & Comments
                        </div>
                        {/* <div style={{ fontSize: 13, color: "#1E45E1", fontWeight: 600 }}>
                            Complaint Id - {state.ComplianceList?.ComplianceUpdates?.complaintId}
                        </div> */}
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

                        {state.createAccount?.accountList?.profilePic &&
                            state.createAccount?.accountList.profilePic !== "0" ? (
                            <Image
                                src={state.createAccount?.accountList.profilePic}
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
                                    backgroundColor: "#E2E8F0",
                                    color: "#44536A",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: 20,
                                    fontWeight: "600",
                                    fontFamily: "Gilroy"
                                }}
                            >
                                {state.createAccount?.accountList?.initial || "-"}
                            </div>
                        )}

                    </div>


                    <div>



                        <textarea
                            placeholder="Add New comment..."
                            value={comments}
                            onChange={(e) => {
                                setComments(e.target.value);
                                setCommentsError("");
                            }}
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
                        {commentsError && (
                            <div >
                                <ErrorMessage message={commentsError} type="error" />

                            </div>
                        )}
                        <button
                            onClick={handleAddComment}
                            disabled={commentsLoading}
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
                            {commentsLoading ? "Adding..." : "Add Comment"}
                        </button>
                    </div>
                </div>





                <div style={{ marginTop: 10 }}>
                    {state.ComplianceList?.ComplianceUpdates?.complaintUpdates?.map((item, index, arr) => (
                        <StepItem
                            key={index}
                            type={getStepType(item.update)}
                            isLast={index === arr.length - 1}
                        >

                            <div style={{ fontWeight: 600, fontSize: 15, color: "#222222" }}>
                                {item.update}
                            </div>


                            <div style={{ fontSize: 14, color: "#1E293B", marginTop: 4 }}>
                                {item.description}
                            </div>


                            <div style={{ fontSize: 12, color: "#475569", marginTop: 4 }}>
                                Added at: {item.updatedAt}, {item.updatedTime}
                            </div>


                            {Array.isArray(item.comments) && item?.comments?.length > 0 && (
                                <>
                                    {item?.comments.map((comment, i) => (
                                        <div key={i} style={{
                                            marginBottom: 14,
                                            paddingBottom: 10,
                                            borderBottom:
                                                i !== item.comments.length - 1
                                                    ? "1px dashed #E5E7EB"
                                                    : "none",
                                        }}>
                                            <Row className="mt-2 align-items-center g-1">
                                                <Col xs="auto" className="p-0">
                                                    {comment.profilePic ? (
                                                        <Image
                                                            src={comment.profilePic}
                                                            roundedCircle
                                                            width={37}
                                                            height={37}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: 37,
                                                                height: 37,
                                                                borderRadius: "50%",
                                                                backgroundColor: "#E2E8F0",
                                                                color: "#44536A",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {comment.initials || "-"}
                                                        </div>
                                                    )}
                                                </Col>

                                                <Col className="ps-2 d-flex gap-2">
                                                    <div style={{ fontSize: 12, fontWeight: 600 }}>
                                                        {comment.commentedBy}
                                                    </div>

                                                    <div style={{ fontSize: 12, color: "#3E3E3E", fontWeight: 400 }}>added a Comment</div>

                                                </Col>
                                            </Row>

                                            <div
                                                style={{
                                                    border: "1px solid #D1D5DB",
                                                    borderRadius: 8,
                                                    padding: 14,
                                                    marginTop: 8,
                                                    background: "#FFF",
                                                    fontSize: 12,
                                                }}
                                            >
                                                {comment.comment}
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </StepItem>
                    ))}
                </div>


            </Offcanvas.Body>
        </Offcanvas>
    );
}
Complaints.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    complaintsDetails: PropTypes.shape({
        complaintId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        customerProfile: PropTypes.string,
        initials: PropTypes.string,
    }).isRequired,


    children: PropTypes.node,


    isLast: PropTypes.bool,
    type: PropTypes.string,
};

export default Complaints;
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




 



    return (
        <Offcanvas
            show={show}
            onHide={handleClose}
            placement="end"
            // backdrop="static"
            className="!w-[355px] !border-l !border-[#E5E7EB] !font-gilroy fixed rounded-[10px]"
            style={{ right: trigger ? 0 : '358px' }}
        >

            <Offcanvas.Header className="flex justify-between gap-0">
                <div className="flex items-center gap-3">

                    <div>
                        <div className="text-lg font-semibold text-gray-900">
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
                    className="cursor-pointer"
                />
            </Offcanvas.Header>
            <hr className="m-0 border border-gray-300" />
            <Offcanvas.Body className="p-4 overflow-y-auto max-h-screen">
                <div className="flex  gap-2 rounded-md mb-2">

                    <div>

                        {state.createAccount?.accountList?.profilePic &&
                            state.createAccount?.accountList.profilePic !== "0" ? (
                            <Image
                                src={state.createAccount?.accountList.profilePic}
                                roundedCircle
                                className="h-12 w-12"
                                alt="image"
                            />
                        ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-base font-semibold font-gilroy">
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
                            }} className="w-full rounded-md p-2.5 border border-gray-300 outline-none resize-none text-sm"
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
                            className="mt-2 bg-blue-700 text-white border-none px-4 py-2 rounded-md text-sm font-medium cursor-pointer">
                            {commentsLoading ? "Adding..." : "Add Comment"}
                        </button>
                    </div>
                </div>





                <div className="mt-2">
                    {state.ComplianceList?.ComplianceUpdates?.complaintUpdates?.map((item, index, arr) => (
                        <StepItem
                            key={index}
                            type={getStepType(item.update)}
                            isLast={index === arr.length - 1}
                        >

                            <div className="font-semibold text-base text-gray-900">
                                {item.update}
                            </div>


                            <div className="text-sm text-slate-900 mt-1">
                                {item.description}
                            </div>


                            <div className="text-xs text-slate-600 mt-1">
                                Added at: {item.updatedAt}, {item.updatedTime}
                            </div>


                            {Array.isArray(item.comments) && item?.comments?.length > 0 && (
                                <>
                                    {item?.comments.map((comment, i) => (
                                        <div key={i}
                                            className={`mb-3 pb-2.5 ${i !== item.comments.length - 1 ? 'border-b border-dashed border-gray-300' : ''}`}
                                        >
                                           
                                            <div className="flex items-center gap-1 mt-2">

                                                <div className="flex-shrink-0">
                                                    {comment.profilePic ? (
                                                        <img
                                                            src={comment.profilePic}
                                                            alt="profile"
                                                            className="rounded-full w-9 h-9 object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-semibold">
                                                            {comment.initials || "-"}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex gap-2 ps-2 items-center">
                                                    <div className="text-xs font-semibold">
                                                        {comment.commentedBy}
                                                    </div>
                                                    <div className="text-xs text-gray-700 font-normal">
                                                        added a Comment
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="border border-gray-300 rounded-md p-3 mt-2 bg-white text-xs">
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
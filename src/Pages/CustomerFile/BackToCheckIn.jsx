/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
// import Profileimage from "../../Assets/Images/New_images/profile-picture.png";
import ErrorMessage from "../../Components/ErrorMessage";
import { JoininDatecustomer } from "../../Redux/Action/smartStayAction";
import PropTypes from "prop-types";


function BackToCheckIn({ show, handleClose, checkInDetails, pgDetails }) {
    const dispatch = useDispatch();

    const state = useSelector((state) => state);

    // console.log("checkInDetails", checkInDetails, "pgDetails", pgDetails)


    const [activeTab, setActiveTab] = useState("LONG");
    const [reason, setReason] = useState("");
    const [reasonError, setReasonError] = useState("");
    const [recheckInDate, setRecheckInDate] = useState(null);
    const [recheckinDateError, setRecheckinDateError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const reasonRef = useRef(null);
    const dateRef = useRef(null);

    const handleRecheckin = (e) => {
        setReason(e.target.value);
        setReasonError("");
    };

    const handleJoiningDateChange = (date) => {
        setRecheckinDateError("");
        setRecheckInDate(date ? date.toDate() : null);
        dispatch(JoininDatecustomer(date ? date.toDate() : null));
    };


    useEffect(() => {
        if (checkInDetails?.customerId || checkInDetails?.tenetId) {
            dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: checkInDetails?.customerId || checkInDetails?.tenetId } });
        }
    }, [checkInDetails?.customerId, checkInDetails?.tenetId])





    const noticeDate = state.UsersList.customerdetails?.checkoutInfo?.noticeDate;


    const noticeDayjs = noticeDate
        ? dayjs(noticeDate, "DD/MM/YYYY")
        : null;




        console.log("pgDetails",pgDetails, "checkInDetails",checkInDetails)



    const handleSaveBacktoCheckin = () => {
        let isValid = true;


        setReasonError("");
        setRecheckinDateError("");


        if (!reason || reason.trim() === "") {
            setReasonError("Please enter a reason (comments)");
            isValid = false;
        }

        if (!recheckInDate) {
            setRecheckinDateError("Please select  Re-Check-In Date");
            isValid = false;
        }

        if (!isValid) return;




        dispatch({
            type: 'CANCELCHECKOUT',
            payload: {
                customerId: checkInDetails?.customerId || checkInDetails?.tenetId,
                hostelId: state.login.selectedHostel_Id,
                // roomId: checkInDetails?.roomId,
                bedId: Number(checkInDetails?.bedId) || Number(pgDetails?.bedId),
                reCheckInDate: dayjs(recheckInDate).format("DD-MM-YYYY"),
                reason: reason.trim(),
            }
        })
        setFormLoading(true);
    }



    useEffect(() => {
        if (state.UsersList.cancelCheckoutStatusCode === 200) {
            setFormLoading(false);

        }

    }, [state.UsersList.cancelCheckoutStatusCode])
    useEffect(() => {
        if (state.UsersList?.cancelCheckoutError) {
            setFormLoading(false);
        }

    }, [state.UsersList?.cancelCheckoutError])


    const imgsrc =
        checkInDetails?.profilePic && checkInDetails?.profilePic.trim() !== ""
            ? checkInDetails.profilePic
            : checkInDetails?.profilePic && checkInDetails.profilePic.trim() !== ""
                ? checkInDetails.profilePic
                : null;






    return (
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
            <Modal.Dialog
                style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }}
                className="m-0 p-0"
            >
                <Modal.Body>
                    <Modal.Header
                        className="pt-0 border-0"
                        style={{ position: "relative" }}
                    >
                        <div
                            style={{
                                fontSize: 20,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                            }}
                        >
                            Cancel Check-Out
                        </div>

                        <CloseCircle
                            size="24"
                            color="#000"
                            onClick={handleClose}
                            style={{ cursor: "pointer" }}
                        />
                    </Modal.Header>


                    <div className="d-flex align-items-center gap-3 mb-3 ms-3">
                        {
                            imgsrc ? (
                                <img
                                    src={imgsrc}
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="35"
                                    height="35"
                                />
                            ) : (
                                <div
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: "50%",
                                        backgroundColor: "#E2E8F0",
                                        color: "#44536A",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: 600,
                                        fontSize: 16,
                                        fontFamily: "Gilroy"
                                    }}
                                >
                                    {checkInDetails?.initials || checkInDetails?.tenantInitials}

                                </div>
                            )
                        }

                        <div>
                            <p
                                className="mb-1"
                                style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px", fontFamily: "Gilroy" }}
                            >
                                {checkInDetails?.fullName || checkInDetails?.tenantFullName}
                            </p>
                            <div className="d-flex gap-2">
                                <span
                                    style={{
                                        backgroundColor: "#FFF3CD",
                                        color: "#856404",
                                        fontSize: "12px",
                                        padding: "2px 8px",
                                        borderRadius: "12px",
                                        fontWeight: 500,
                                        fontFamily: "Gilroy"
                                    }}
                                >
                                    {pgDetails?.floorName || checkInDetails?.floorName}
                                </span>
                                <span
                                    style={{
                                        backgroundColor: "#F8D7DA",
                                        color: "#721C24",
                                        fontSize: "12px",
                                        padding: "2px 8px",
                                        borderRadius: "12px",
                                        fontWeight: 500, fontFamily: "Gilroy"
                                    }}
                                >
                                    {pgDetails?.roomName || checkInDetails?.roomName} - {pgDetails?.bedName || checkInDetails?.bedName}
                                </span>
                            </div>
                        </div>
                    </div>


                    <div
                        style={{
                            backgroundColor: "#F7F9FF",
                            borderRadius: 10,
                            width: "100%",
                        }}
                        className="mt-1 p-1"
                    >
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "space-between",
                                width: "100%",
                            }}
                        >
                            <button
                                onClick={() => setActiveTab("LONG")}
                                style={{
                                    flex: 1,
                                    padding: "10px 0",
                                    backgroundColor: activeTab === "LONG" ? "#1E45E1" : "#F7F9FF",
                                    color: activeTab === "LONG" ? "white" : "black",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontWeight: "600",
                                    fontFamily: "Gilroy",
                                }}
                            >
                                Long Stay
                            </button>
                            <button
                                onClick={() => setActiveTab("SHORT")}
                                style={{
                                    flex: 1,
                                    padding: "10px 0",
                                    backgroundColor: activeTab === "SHORT" ? "#1E45E1" : "#F7F9FF",
                                    color: activeTab === "SHORT" ? "white" : "black",
                                    border: "none",
                                    borderRadius: "5px",
                                    fontWeight: "600",
                                    fontFamily: "Gilroy",
                                }}
                            >
                                Short Stay
                            </button>
                        </div>
                    </div>


                    {activeTab === "LONG" ? (
                        <>
                            <div
                                style={{ maxHeight: "320px", overflowY: "scroll" }}
                                className="show-scroll p-2 mt-2 me-1"
                            >

                                <div className="col-lg-12 col-md-12 col-sm-12 mb-2">
                                    <Form.Group>
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                fontWeight: 500,
                                                fontFamily: "Gilroy",
                                            }}
                                        >
                                            Reason (Comments){" "}
                                            <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                        </Form.Label>
                                        <FormControl
                                            ref={reasonRef}
                                            type="text"
                                            placeholder="Enter Comments"
                                            value={reason}
                                            onChange={handleRecheckin}
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>
                                    {reasonError && <ErrorMessage message={reasonError} type="error" />}
                                </div>


                                <div className="datepicker-wrapper relative z-10">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                            paddingTop: "6px",
                                        }}
                                    >
                                        Re Check-In Date{" "}
                                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                                    </Form.Label>

                                    <DatePicker
                                        ref={dateRef}
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            cursor: "pointer",
                                            fontFamily: "Gilroy",
                                        }}
                                        disabledDate={(current) => {
                                            if (!current) return false;

                                            const today = dayjs().endOf("day");

                                            if (noticeDayjs && current.isBefore(noticeDayjs.startOf("day"))) {
                                                return true;
                                            }
                                            if (current.isAfter(today)) {
                                                return true;
                                            }

                                            return false;
                                        }}
                                        format="DD/MM/YYYY"
                                        placeholder="DD/MM/YYYY"
                                        value={recheckInDate ? dayjs(recheckInDate) : null}
                                        onChange={handleJoiningDateChange}
                                    />

                                    {recheckinDateError && (
                                        <ErrorMessage message={recheckinDateError} type="error" />
                                    )}
                                </div>
                            </div>

                            {state.UsersList?.cancelCheckoutError && <div className="d-flex justify-content-center">
                                <ErrorMessage message={state.UsersList?.cancelCheckoutError} type="error" />
                            </div>
                            }

                            {/* Loader */}
                            {formLoading && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 100,
                                        right: 0,
                                        bottom: 0,
                                        left: 0,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        opacity: 0.75,
                                        zIndex: 10,
                                    }}
                                >
                                    <div
                                        style={{
                                            borderTop: "4px solid #1E45E1",
                                            borderRight: "4px solid transparent",
                                            borderRadius: "50%",
                                            width: "40px",
                                            height: "40px",
                                            animation: "spin 1s linear infinite",
                                        }}
                                    ></div>
                                </div>
                            )}

                            {/* Buttons */}
                            <div
                                style={{
                                    display: "flex",
                                    gap: "16px",
                                    alignItems: "center",
                                    marginTop: 10,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <button
                                    type="button"
                                    style={{
                                        background: "transparent",
                                        border: "none",
                                        color: "#333",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Montserrat",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleClose}
                                >
                                    Cancel
                                </button>

                                <button disabled={formLoading}
                                    type="button"
                                    style={{
                                        backgroundColor: "#1E45E1",
                                        color: "#fff",
                                        fontWeight: 600,
                                        height: 40,
                                        borderRadius: 8,
                                        fontSize: 14,
                                        fontFamily: "Montserrat",
                                        padding: "0 24px",
                                        border: "none",
                                        cursor: "pointer",
                                    }}
                                    onClick={handleSaveBacktoCheckin}
                                >
                                    Check-In
                                </button>
                            </div>
                        </>
                    ) : (
                        // Short Stay Tab
                        <div
                            style={{
                                height: "400px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                backgroundColor: "#f2f6fc",
                                borderRadius: "10px",
                                marginTop: "20px",
                                marginRight: "0",
                                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                                border: "1px dashed #b0c4de",
                            }}
                        >
                            <div style={{ textAlign: "center" }}>
                                <img
                                    src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                                    alt="Coming Soon"
                                    width="80"
                                    height="80"
                                    style={{ marginBottom: "15px", opacity: 0.7 }}
                                />
                                <p
                                    style={{
                                        color: "#7a7a7a",
                                        fontSize: "14px",
                                        fontFamily: "Gilroy",
                                    }}
                                >
                                    Coming Soon. Stay tuned!
                                </p>
                            </div>
                        </div>
                    )}
                </Modal.Body>
            </Modal.Dialog>
        </Modal>
    );
}
BackToCheckIn.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,

    checkInDetails: PropTypes.shape({
        customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        tenetId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

        profilePic: PropTypes.string,
        initials: PropTypes.string,
        tenantInitials: PropTypes.string,

        fullName: PropTypes.string,
        tenantFullName: PropTypes.string,
        floorName: PropTypes.string,
        roomName: PropTypes.string,
        bedName: PropTypes.string,
    }).isRequired,

    pgDetails: PropTypes.shape({
        bedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        floorName: PropTypes.string,
        roomName: PropTypes.string,
        bedName: PropTypes.string,
    }).isRequired,
};

export default BackToCheckIn;

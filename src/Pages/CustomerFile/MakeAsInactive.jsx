import React, { useEffect, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserList.css";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
// import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from '../../Components/ErrorMessage'




function MakeAsInactive({ show, handleCloseInActive, inActiveDetails, currentItem }) {


    const state = useSelector((state) => state);


    dayjs.extend(isBetween);
    const dispatch = useDispatch();
    const [formLoading, setFormLoading] = useState(false)
    const [inActiveDate, setInActiveDate] = useState(null)
    const [inActiveComments, setInActiveComments] = useState("")
    const [isActiveDateError, setIsACtiveDateError] = useState("")



    const handleInActiveReason = (e) => {
        setInActiveComments(e.target.value)

    }




    const SubmitInActiveForm = () => {
        if (!inActiveDate) {
            setIsACtiveDateError(" Please Select Inactive Date");
            return;
        }

        const incrementDateAndFormat = (date) => {
            const newDate = new Date(date);

            const day = String(newDate.getDate()).padStart(2, "0");
            const month = String(newDate.getMonth() + 1).padStart(2, "0");
            const year = newDate.getFullYear();

            return `${day}-${month}-${year}`;
        };

        const formattedDate = inActiveDate
            ? incrementDateAndFormat(inActiveDate)
            : "";

        setIsACtiveDateError("");
        if (formattedDate) {
            dispatch({
                type: "BOOKINGACTIVE",
                payload: {
                    cancelDate: formattedDate,
                    reason: inActiveComments,
                    customerId: inActiveDetails?.customerId || inActiveDetails?.tenetId,
                    bankId: state.UsersList?.initializeCancelBookingList?.listBanks[0].bankId
                },
            });
            setFormLoading(true);
        }

    };

    useEffect(() => {
        if (state.Booking.StatusCodeInactiveCode === 200) {
            setFormLoading(false);
            handleCloseInActive()
        }

    }, [state.Booking.StatusCodeInactiveCode])

    useEffect(() => {
        if (state.Booking.bookingMakeAsError || state.createAccount?.networkError) {
            setFormLoading(false);
        }

    }, [state.Booking.bookingMakeAsError , state.createAccount?.networkError])


    useEffect(() => {
        if (!inActiveDetails) return;
        if (inActiveDetails.customerId || inActiveDetails?.tenetId ) {
            dispatch({
                type: 'INITIALIZECANCELBOOKING',
                payload: inActiveDetails.customerId || inActiveDetails?.tenetId 
            });
        }
    }, [inActiveDetails]);



    const CustomerOverView = state.UsersList.customerdetails;


    useEffect(() => {
        if (inActiveDetails?.customerId || inActiveDetails?.tenetId ) {
            dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: inActiveDetails.customerId || inActiveDetails?.tenetId  } });

        }
    }, [inActiveDetails]);



    return (
        <Modal show={show} onHide={handleCloseInActive} centered backdrop="static"   >

            <Modal.Header style={{ border: "none" }} className="ps-4 pe-4 pb-2 pt-4">
                <div>
                    <Modal.Title style={{
                        fontSize: 20,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                    }}>Tenant Inactive?</Modal.Title>

                    <label style={{
                        fontSize: 14,
                        color: "#646464",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                    }}>Are you sure you want to inactive this tenant?</label>
                </div>

                <CloseCircle size="24" color="#000" onClick={handleCloseInActive} style={{ cursor: "pointer" }} />
            </Modal.Header>
            <div className="d-flex align-items-center gap-3 mb-3 ms-3">



                {inActiveDetails.profilePic || inActiveDetails?.profilePic &&
                    (inActiveDetails.profilePic !== "0" || inActiveDetails?.profilePic !== "0") ? (
                    <Image
                        src={inActiveDetails.profilePic || inActiveDetails?.profilePic}
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
                        {inActiveDetails?.initials || inActiveDetails?.tenantInitials || "-"}
                    </div>
                )}
                <div >
                    <div>
                        <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px", fontFamily: "Gilroy" }}>
                            {inActiveDetails.fullName} {inActiveDetails?.tenantFullName}
                        </p>

                    </div>


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
                            {currentItem?.floorName || inActiveDetails?.floorName}
                        </span>
                        <span
                            style={{
                                backgroundColor: "#F8D7DA",
                                color: "#721C24",
                                fontSize: "12px",
                                padding: "2px 8px",
                                borderRadius: "12px",
                                fontWeight: 500,
                                fontFamily: "Gilroy"
                            }}
                        >
                            {currentItem?.roomName || inActiveDetails?.roomName} - {currentItem?.bedName || inActiveDetails?.bedName}
                        </span>
                    </div>

                </div>



            </div>



            <Modal.Body className="ps-4 pe-4 pb-4 pt-0">


                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2" controlId="joiningDate">
                        <Form.Label
                            style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                            }}
                        >
                            Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>

                        <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>

                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: 48,
                                    cursor: "pointer",
                                    fontFamily: "Gilroy",
                                }}
                                format="DD/MM/YYYY"
                                placeholder="DD/MM/YYYY"
                                value={inActiveDate ? dayjs(inActiveDate, "DD/MM/YYYY") : null}
                                onChange={(date) => {
                                    setInActiveDate(date);
                                    setIsACtiveDateError("");
                                }}
                                getPopupContainer={() => document.body}
                                disabledDate={(current) => {
                                    const bookedDate = dayjs(CustomerOverView?.bookingInfo?.bookingDate, "DD/MM/YYYY");
                                    return (
                                        current.isBefore(bookedDate, "day") ||
                                        current.isAfter(dayjs(), "day")
                                    );
                                }}
                            />


                        </div>
                    </Form.Group>
                    {isActiveDateError && (
                        <ErrorMessage message={isActiveDateError} type="error" />
                    )}
                </div>

                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <Form.Group className="mb-3">
                        <Form.Label style={{
                            fontSize: 14,
                            color: "#222222",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                        }}>Reason (Comments)</Form.Label>
                        <Form.Control
                            style={{
                                fontSize: 16,
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                fontWeight: inActiveComments ? 600 : 500,
                                boxShadow: "none",
                                border: "1px solid #D9D9D9",
                                height: 50,
                                borderRadius: 8,
                            }}
                            as="textarea"
                            rows={5}
                            placeholder="Enter reason here"
                            value={inActiveComments}
                            onChange={(e) => handleInActiveReason(e)}
                        />
                    </Form.Group>
                </div>


                {state.Booking.bookingMakeAsError && (
                    <div className="d-flex justify-content-center mb-2">
                        <ErrorMessage message={state.Booking.bookingMakeAsError} type="error" />
                    </div>
                )}



                <Modal.Footer style={{ border: "none", padding: 0 }}>
                    <div className="d-flex  w-100 gap-3">


                        <Button
                            onClick={handleCloseInActive}
                            className="w-100"
                            style={{
                                backgroundColor: "#fff",
                                border: "1px solid #D2D2D2",
                                color: "#4B4B4B",
                                fontWeight: 600,
                                borderRadius: 10,
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                padding: "8px 40px"
                            }}
                        >
                            Cancel
                        </Button>

                        <Button  disabled={formLoading}
                            onClick={SubmitInActiveForm}
                            className="w-100"
                            style={{
                                backgroundColor: "#1E45E1",
                                fontWeight: 600,
                                borderRadius: 10,
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                padding: "8px 40px"
                            }}
                        >
                            Confirm
                        </Button>
                    </div>

                </Modal.Footer>
            </Modal.Body>
            {formLoading && <div
                style={{
                    position: 'absolute',
                    top: 100,
                    right: 0,
                    bottom: 0,
                    left: 0,
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
            </div>}

        </Modal>
    )
}
MakeAsInactive.propTypes = {
    show: PropTypes.func.isRequired,
    handleCloseInActive: PropTypes.func.isRequired,
    inActiveDetails: PropTypes.shape({
        profilePic: PropTypes.string,
        firstName: PropTypes.string,
        bookedAt: PropTypes.string,
    }).isRequired,

}

export default MakeAsInactive
import React, { useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserList.css";
import { Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch} from "react-redux";
// import Swal from "sweetalert2";
// import Image from "react-bootstrap/Image";
// import UserlistForm from "./UserlistForm";
// import UserListRoomDetail from "./UserListRoomDetail";
import Modal from "react-bootstrap/Modal";
// import Emptystate from "../../Assets/Images/Empty-State.jpg";
// import closecircle from "../../Assets/Images/New_images/close-circle.png";
// import Box from "@mui/material/Box";
// import TabList from "@mui/lab/TabList";
// import excelimg from "../../Assets/Images/New_images/excel_blue.png";
// import CustomerReAssign from "./CustomerReAssign";
// import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2, Trash } from "iconsax-react";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
// import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
// import TabPanel from "@mui/lab/TabPanel";
// import TabContext from "@mui/lab/TabContext";
// import Tab from "@mui/material/Tab";
// import UserlistBookings from "./UserlistBookings";
// import UserlistCheckout from "./UserlistCheckout";
// import UserlistWalkin from "./UserlistWalkin";
// import Addbooking from "./Addbookingform";
// import CheckOutForm from "./UserListCheckoutForm";
// import UserlistWalkinForm from "./UserlistWalkinForm";
// import Edit from "../../Assets/Images/Edit-blue.png";
// import addcircle from "../../Assets/Images/New_images/add-circle.png";
// import searchteam from "../../Assets/Images/New_images/Search Team.png";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import { MdError } from "react-icons/md";
// import CustomerCheckout from "./CustomerCheckout";
import "react-datepicker/dist/react-datepicker.css";
// import { toast } from "react-toastify";
// import Closebtn from "../../Assets/Images/CloseCircle.png";
// import Calendars from "../../Assets/Images/New_images/calendar.png";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
// import moment from 'moment';
// import Filters from "../../Assets/Images/Filters.svg";
import isBetween from "dayjs/plugin/isBetween";
// import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
// import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
// import leftarrow from "../../Assets/Images/arrow-left.png";
// import Select from "react-select";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from '../../Components/ErrorMessage'




function MakeAsInactive({ show, handleCloseInActive, inActiveDetails }) {


    // const state = useSelector((state) => state);


    // const { RangePicker } = DatePicker;
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
            newDate.setDate(newDate.getDate() + 1);
            return newDate.toISOString().split("T")[0];
        };
        const formattedDate = inActiveDate
            ? incrementDateAndFormat(inActiveDate)
            : "";

        setIsACtiveDateError("");
        if (formattedDate) {
            dispatch({
                type: "BOOKINGACTIVE",
                payload: {  Inactive_date: formattedDate, Inactive_Reason: inActiveComments },
            });
        }
        setFormLoading(true)
    }




    return (
        <Modal show={show} onHide={handleCloseInActive} centered backdrop="static"   >

            <Modal.Header style={{ border: "none" }} className="ps-4 pe-4 pb-2 pt-4">
                <div>
                    <Modal.Title style={{
                        fontSize: 20,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                    }}>Tenant Inactive ?</Modal.Title>

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

                <img
                    src={
                        typeof inActiveDetails.profilePic === "string" && inActiveDetails.profilePic.trim()
                            ? inActiveDetails.profilePic
                            : inActiveDetails.profilePic instanceof File
                                ? URL.createObjectURL(inActiveDetails.profilePic)
                                : Profile
                    }
                    alt="Profile"
                    className="rounded-circle"
                    width="35"
                    height="35"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Profile;
                    }}
                />
                <div>
                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px", fontFamily:"Gilroy" }}>
                        {inActiveDetails.firstName}
                    </p>

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
                                value={inActiveDate ? dayjs(inActiveDate) : null}
                                onChange={(date) => {
                                    setInActiveDate(date ? date.toDate() : null);
                                    setIsACtiveDateError("");
                                }}
                                getPopupContainer={() => document.body}
                                disabledDate={(current) => {
                                    if (!inActiveDetails?.bookedAt) return true;
                                    return (
                                        current.isBefore(dayjs(inActiveDetails?.bookedAt), "day") ||
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
                                fontWeight: 500,
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

                        <Button
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
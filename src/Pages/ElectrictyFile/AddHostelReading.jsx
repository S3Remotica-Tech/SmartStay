/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import LoaderComponent from "../LoaderComponent";
import { Table } from "react-bootstrap";
import { Modal, Offcanvas, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiFilter } from "react-icons/fi";
import searchteam from "../../Assets/Images/New_images/Search Team.png";
import arrowSwap from "../../Assets/Images/New_images/arrow-swap.svg";
import Group from "../../Assets/Images/New_images/Group.svg";
import { CloseCircle, ArrowUp2, ArrowDown2 } from "iconsax-react";
import electricity from "../../Assets/Images/New_images/electricity.svg";
import building from '/src/Assets/Images/New_images/building1.svg';
import PaginationList from "../../Components/PaginationList";
import EB_RoomOverview from "./EB_RoomOverview";
import Ellipse1 from "../../Assets/Images/New_images/Ellipse 1.svg";
import emptyimg from "../../Assets/Images/New_images/empty_image.png";
import EB_TenantOverview from "./EB_TenantOverview";
// import ClipPathGroup from "../../Assets/Images/New_images/ClipPathGroup.svg";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { MdError } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../Components/ErrorMessage'




function AddHostelReading({ show, handleClose, selectedRowDetails, roomReadingList }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [readingError, setReadingError] = useState("");
    const [dateError, setDateError] = useState("");
    const [currentReading, setCurrentReading] = useState("");
    const [readingDate, setReadingDate] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleCurrentReadingChange = (e) => {
        dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setCurrentReading(value);
            setReadingError('')
        }
    };

    const handleReadingDateChange = (date) => {
        dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
        setReadingDate(date ? date : null);
        setDateError('')
    };


    const handleSubmit = () => {
 dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
        let hasError = false;

        if (!currentReading) {
            setReadingError("Please enter  reading");
            hasError = true;
        } else {
            setReadingError("");
        }

        if (!readingDate) {
            setDateError("Please select reading date");
            hasError = true;
        } else {
            setDateError("");
        }

        if (hasError) return;
        const formattedDate = readingDate ? dayjs(readingDate).format("DD-MM-YYYY") : "";
        if (currentReading) {
            dispatch({
                type: 'ADDROOMREADING',
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    reading: Number(currentReading),
                    readingDate: formattedDate,
                }
            })
            setLoading(true)

        }


    };



    useEffect(() => {
        if (state.UsersList?.addRoomReadingStatusCode === 201) {
            setLoading(false)
        }

    }, [state.UsersList?.addRoomReadingStatusCode])

    useEffect(() => {
        if (state.UsersList?.roomReadingError) {
            setLoading(false)
        }

    }, [state.UsersList?.roomReadingError])


   


    return (
        <div>   <Modal show={show} onHide={handleClose} centered backdrop="static">

            <Modal.Header className="d-flex justify-content-between align-items-center" style={{ borderBottom: "none" }}>
                <Modal.Title
                    style={{
                        fontFamily: 'Gilroy, sans-serif',
                        fontWeight: 600,
                        fontStyle: 'normal',
                        fontSize: '20px',
                    }}>
                    Add Hostel Reading
                </Modal.Title>

                <CloseCircle
                    size={26}
                    color="black"
                    style={{ cursor: "pointer" }}
                    onClick={handleClose}
                />
            </Modal.Header>
            <Modal.Body className="border pt-1">




              



                {state.UsersList?.roomReadingError && (
                    <ErrorMessage message={state.UsersList?.roomReadingError} type="error" />
                )}

                <Form.Group className="mt-0">

                    <Form.Label
                        style={{
                            fontFamily: 'Gilroy',
                            fontWeight: 500,
                            fontStyle: 'normal',
                            fontSize: '14px',
                            lineHeight: '100%',
                            letterSpacing: '0',
                            marginBottom: 0,
                            padding: 0
                        }}
                    >
                        Reading Date {" "}  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>

                    <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%", marginTop: 6 }}
                    >

                        <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                            <DatePicker
                                style={{
                                    width: "100%",
                                    height: 48,
                                    cursor: "pointer",
                                    fontFamily: "Gilroy",
                                }}
                                format="DD/MM/YYYY"
                                placeholder="DD/MM/YYYY"
                                value={readingDate ? dayjs(readingDate) : null}
                                onChange={handleReadingDateChange}
                                getPopupContainer={() => document.body}
                                disabledDate={(current) => current && current > dayjs()}
                            />
                        </div>



                    </div>

                    {dateError && (
                        <ErrorMessage message={dateError} type="error" />

                    )}


                </Form.Group>

                <Form.Group className="mt-2">
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            marginBottom: 5
                        }}
                    >
                        <Form.Label
                            style={{
                                fontFamily: 'Gilroy',
                                fontWeight: 500,
                                fontStyle: 'normal',
                                fontSize: '14px',
                                lineHeight: '100%',
                                letterSpacing: '0',
                                marginBottom: 0,
                                padding: 0
                            }}
                        >
                            Reading  {" "}  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                        </Form.Label>

                        <span
                            style={{
                                fontFamily: 'Gilroy',
                                fontWeight: 400,
                                fontStyle: 'normal',
                                fontSize: '14px',
                                lineHeight: '100%',
                                letterSpacing: '0',
                                color: "gray"
                            }}
                        >
                            Last Reading : {" "}
                            <span style={{ color: '#1E45E1', fontFamily: "Gilroy" }}>
                                {state.UsersList?.getRoomReadingList?.lastReading}
                            </span>
                        </span>
                    </div>

                    <Form.Control
                        style={{ marginTop: 10, fontSize: 14, fontWeight: currentReading ? 600 : 500, padding: "12px 14px", fontFamily: "Gilroy" }}
                        type="number"
                        placeholder="Enter Reading"

                        value={currentReading}
                        onChange={handleCurrentReadingChange}
                    />


                    {readingError && (
                        <ErrorMessage message={readingError} type="error" />

                    )}






                </Form.Group>





            </Modal.Body>
            {loading &&
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
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
                </div>
            }
            <Modal.Footer style={{ border: 'none' }}>
                <Button style={{ backgroundColor: "transparent", border: "none", color: "black", fontFamily: "Gilroy" }} onClick={handleClose}>
                    Cancel
                </Button>
                <Button style={{ backgroundColor: "#1E45E1", width: '130px', fontFamily: "Gilroy" }} onClick={handleSubmit}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal></div>
    )
}

export default AddHostelReading
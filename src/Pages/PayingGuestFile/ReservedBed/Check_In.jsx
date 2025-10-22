
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { MdError } from "react-icons/md";
import {
    Modal,
    Form,
    Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/AssetFile/addAsset.css";
import { CloseCircle, Trash } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import addcircle from "../../../Assets/Images/New_images/add-circle.png";
import ErrorMessage from '../../../Components/ErrorMessage'
import Profileimage from "../../../Assets/Images/New_images/profile-picture.png";

function CheckIn({
    show,
    handleClose,
    currentItem
}) {



    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const bookingDateRef = useRef("");

    const [joiningDate, setJoiningDate] = useState(null);
    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState([]);
    const [customer_name, setCustomerName] = useState("")
    const [bookingDate, setBookingDate] = useState("")
    const [bookingAmount, setBookingAmount] = useState("")
    const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
    const [RoomRent, setRoomRent] = useState("");
    const [AdvanceAmount, setAdvanceAmount] = useState("");
    const [advanceAmountError, setAdvanceAmountError] = useState("");
    const [roomrentError, setRoomRentError] = useState("");
    const [formLoading, setFormLoading] = useState(false);


    useEffect(() => {
        if (currentItem?.newTenantCustomerId) {
            dispatch({ type: 'BOOKEDDETAILS', payload: { hostelId: state.login.selectedHostel_Id, customerId: currentItem?.newTenantCustomerId } })
        }

    }, [])


    useEffect(() => {
        if (state.UsersList?.bookedDetails) {
            const bookedDateString = state.UsersList.bookedDetails?.bookedDate;

            setBookingDate(bookedDateString ? dayjs(bookedDateString, "DD/MM/YYYY") : null);
            setBookingAmount(state.UsersList.bookedDetails?.bookingAmount);
            setRoomRent(state.UsersList.bookedDetails?.rent)
        }
    }, [state.UsersList?.bookedDetails]);



    const handleRoomRent = (e) => {
        const newAmount = e.target.value;
        if (!/^\d*$/.test(newAmount)) {
            return;
        }
        setRoomRent(newAmount);
        setRoomRentError("");
    };

    const handleAdvanceAmount = (e) => {
        const advanceAmount = e.target.value;
        if (!/^\d*$/.test(advanceAmount)) {
            return;
        }
        setAdvanceAmount(advanceAmount);
        setAdvanceAmountError("");
    };


    const customStyles = {
        control: (base) => ({
            ...base,
            height: "48px",
            border: "1px solid #D9D9D9",
            borderRadius: "8px",
            fontSize: "16px",
            color: "#4B4B4B",
            fontFamily: "Gilroy",
            fontWeight: 500,
            boxShadow: "none",
            backgroundColor: "#EFF2FF"

        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            fontFamily: "Gilroy",
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            maxHeight: "120px",
            padding: 0,
            scrollbarWidth: "thin",
            overflowY: "auto",
            fontFamily: "Gilroy",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#555",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#555",
            display: "inline-block",
            fill: "currentColor",
            lineHeight: 1,
            stroke: "currentColor",
            strokeWidth: 0,
            cursor: "pointer"
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused ? "#f0f0f0" : "white",
            color: "#000",
        }),
    };




    const [stay_typename, setStayTypeName] = useState("")
    const [stay_typenameErrmsg, setStayTypeNameErrMsg] = useState("")

    const stayTypes = [
        { value: "SHORT", label: "Short Stay" },
        { value: "LONG", label: "Long Stay" },
    ];

    const longStayOnly = stayTypes.filter((s) => s.value === "LONG");


    const handleStayTypeChange = (selectedOption) => {
        setStayTypeName(selectedOption?.value || '');
        if (!selectedOption) {
            setStayTypeNameErrMsg("Please Select Staytype");
        } else {
            setStayTypeNameErrMsg("");
        }
    };



    const formatOptions = () => {
        return state.UsersList?.Users
            ?.filter(user => user.customerId === currentItem.newTenantCustomerId)
            .map(user => ({
                value: user.customerId,
                label: (
                    <div className="d-flex align-items-center">
                        <span>{user.firstName}</span>
                    </div>
                ),
            }));
    };






    const reasonOptions = [
        { value: "maintenance", label: "Maintenance" },
        { value: "others", label: "Others" },
    ];


    const handleAddField = () => {
        setFields([...fields, { reason_name: "", amount: "", showInput: false }]);

        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    };





    const handleInputChange = (index, field, value) => {
        const updatedFields = [...fields];
        const updatedErrors = [...errors];

        if (field === "reason" || field === "customReason") {
            const cleanedValue = value.replace(/[^A-Za-z ]/g, "");

            if (field === "reason") {
                if (cleanedValue.toLowerCase() === "others") {
                    updatedFields[index].showInput = true;
                    updatedFields[index].reason_name = "others";
                    updatedFields[index].customReason = "";
                } else {
                    updatedFields[index].showInput = false;
                    updatedFields[index].reason = cleanedValue;
                    updatedFields[index].reason_name = cleanedValue;
                    updatedFields[index].customReason = "";
                }
            } else if (field === "customReason") {
                updatedFields[index].customReason = cleanedValue;
            }

            if (updatedErrors[index]) updatedErrors[index].reason = "";
        } else if (field === "amount") {
            const numericValue = value.replace(/[^0-9]/g, "");
            updatedFields[index].amount = numericValue;
            if (updatedErrors[index]) updatedErrors[index].amount = "";
        }

        setFields(updatedFields);
        setErrors(updatedErrors);
    };



    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);

        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    };



    const handleCheckin = async () => {

        let hasReasonAmountError = false;
        let newErrors = [];
        let hasError = false;

        if (!stay_typename) {
            setStayTypeNameErrMsg("Please Select Staytype")
            hasError = true;
        }

        if (!joiningDate) {
            setJoingDateErrmsg("Please Select Joining Date")
            hasError = true;
        }

        if (!AdvanceAmount) {
            setAdvanceAmountError("Please Enter Advance Amount")
            hasError = true;
        }


        if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
            setRoomRentError("Please Enter Rental Amount");
            hasError = true;
        }
        if (Number(RoomRent) <= 0) {
            setRoomRentError("Please Enter Valid Rental Amount");
            hasError = true;
        }

        if (
            AdvanceAmount === "" ||
            AdvanceAmount === null ||
            AdvanceAmount === undefined
        ) {
            setAdvanceAmountError("Please Enter Advance Amount");
            hasError = true;
        }
        if (Number(AdvanceAmount) <= 0) {
            setAdvanceAmountError("Please Enter Valid Advance Amount");
            hasError = true;
        }

        setErrors(newErrors)

        if (!RoomRent && RoomRent !== 0) {
            setRoomRentError("Please Enter Rental Amount");
            hasError = true;
        }
        if (RoomRent <= 0) {
            setRoomRentError("Please Enter Valid Rental Amount");
            hasError = true;
        }
        if (!AdvanceAmount && AdvanceAmount !== 0) {
            setAdvanceAmountError("Please Enter Advance Amount");
            hasError = true;
        }

        if (AdvanceAmount <= 0) {
            setAdvanceAmountError("Please Enter  Advance Amount");
            hasError = true;
        }

        if (hasError) {
            return;
        }


        const incrementDateAndFormat = (date) => {
            const newDate = new Date(date);

            const day = String(newDate.getDate()).padStart(2, "0");
            const month = String(newDate.getMonth() + 1).padStart(2, "0");
            const year = newDate.getFullYear();

            return `${day}-${month}-${year}`;
        };


        const formattedDate = joiningDate
            ? incrementDateAndFormat(joiningDate)
            : "";





        setErrors(newErrors)

        const formattedReasons = fields.map((item) => {
            let reason_name = "";

            if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
                reason_name = item.customReason || item["custom Reason"] || "";
            } else {
                reason_name = item.reason || item.reason_name || "";
            }

            const error = { reason: "", amount: "" };
            if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
                error.amount = "Please enter amount";
                hasReasonAmountError = true;
            }


            if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
                error.reason = "Please enter reason";
                hasReasonAmountError = true;
            }

            newErrors.push(error);
            return {
                type: reason_name,
                amount: item.amount || "",
            };
        });

        if (hasReasonAmountError) return;



        if (
            formattedDate && stay_typename &&
            Number(AdvanceAmount) > 0 &&
            Number(RoomRent) > 0 && state.UsersList?.bookedDetails?.canCheckIn
        ) {
            dispatch({
                type: 'BOOKINGTOCHECKIN',
                payload: {
                    customerId: currentItem?.newTenantCustomerId,
                    bookingId: state.UsersList?.bookedDetails?.bookingId,
                    joiningDate: formattedDate,
                    advanceAmount: Number(AdvanceAmount),
                    rentalAmount: Number(RoomRent),
                    stayType: stay_typename,
                    deductions: formattedReasons?.map(item => ({
                        type: item.type,
                        amount: Number(item.amount),
                    })),
                    isAdvanceIncludedInBooking: true
                }
            });
            setFormLoading(true)
        }



    };


    useEffect(() => {
        if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
            setFormLoading(false)
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
            handleClose();
        }
    }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);

    useEffect(() => {
        if (state.UsersList?.bookingToCheckinStatusCode === 200) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_BOOKING_TO_CHECKIN' })
            }, 100)
        }

    }, [state.UsersList?.bookingToCheckinStatusCode])


    useEffect(() => {
        if (state.UsersList.bedError) {
            setFormLoading(false)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR_BOOKED' })
            }, 1000)
        }

    }, [state.UsersList.bedError])


    return (
        <>



            <div
                className="modal show"
                style={{
                    display: "block",
                    position: "initial",
                    fontFamily: "Gilroy,sans-serif",
                }}
            >
                <Modal show={show} onHide={handleClose} centered
                    backdrop="static" dialogClassName="custom-modals-style"
                >
                    <Modal.Dialog
                        style={{ maxWidth: "100%", width: "100%", borderRadius: 16 }}
                        className="m-0 p-0"
                    >
                        <Modal.Header className="pb-0"
                            style={{ border: "none" }}
                        >

                            <div className="d-flex justify-content-between w-100" style={{ padding: "5px  10px 5px 5px" }}>
                                <div>
                                    <div>
                                        <Modal.Title
                                            style={{
                                                fontSize: 18,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Check-In Tenant
                                        </Modal.Title>
                                    </div>
                                    {/* <div className="d-flex align-items-center gap-3 mt-1">
                                        <label style={{
                                            fontSize: 14,
                                            color: "#1E45E1",   
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>  {currentItem?.floorName} </label> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>|</span>
                                        <label style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}> {currentItem?.roomName} </label> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>|</span> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>{currentItem?.bedName}</span>
                                    </div> */}
                                </div>


                            </div>




                            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scrolls pt-0 mt-1 me-3">

                            <div className="d-flex align-items-center gap-3 mb-3 ms-3">

                                <img
                                    src={
                                        typeof currentItem?.newTenantProfilePic === "string" && currentItem?.newTenantProfilePic.trim()
                                            ? currentItem?.newTenantProfilePic
                                            : currentItem?.newTenantProfilePic instanceof File
                                                ? URL.createObjectURL(currentItem?.newTenantProfilePic)
                                                : Profileimage
                                    }
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="45"
                                    height="45"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Profileimage;
                                    }}
                                />
                                <div>
                                    <div>
                                        <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px", fontFamily: "Gilroy" }}>
                                            {currentItem.newTenantFullName}
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
                                            {currentItem?.floorName}
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
                                            {currentItem?.roomName} - {currentItem?.bedName}
                                        </span>
                                    </div>

                                </div>



                            </div>



                            <div className="row mt-1">

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                            Booking Date
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {bookingDate ? dayjs(bookingDate).format("DD/MM/YYYY") : ""}
                                        </label>
                                    </div>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <div>
                                        <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                            Booking Amount
                                        </label>
                                    </div>
                                    <div>
                                        <label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {bookingAmount}
                                        </label>
                                    </div>
                                </div>

                                <hr
                                    style={{
                                        border: "none",
                                        height: "1px",
                                        backgroundColor: "#D9D9D9",
                                        margin: "8px 0",
                                        padding: 0,
                                    }}
                                />

                                {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Select Tenant {" "}
                                            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                        </Form.Label>
                                        <Select
                                            styles={customStyles}
                                            value={formatOptions()?.[0] || null}
                                            isDisabled
                                            options={formatOptions()}
                                            placeholder="Select a Tenant"
                                            classNamePrefix="custom"
                                            menuPlacement="auto"
                                        />
                                    </Form.Group>


                                </div> */}

                                {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group className="mb-2" controlId="purchaseDate">
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Booking Date {" "}
                                            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                        </Form.Label>

                                        <Form.Control

                                            value={bookingDate ? bookingDate.format("DD/MM/YYYY") : ""}
                                            type="text"
                                            placeholder="Booking Date"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                                backgroundColor: "#EFF2FF"
                                            }}
                                        />


                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Booking Amount
                                            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                        </Form.Label>
                                        <Form.Control
                                            value={bookingAmount}
                                            type="text"
                                            placeholder="Booking Amount"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                                backgroundColor: "#EFF2FF"
                                            }}
                                        />
                                    </Form.Group>
                                </div> */}

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Stay Type {" "}
                                            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                        </Form.Label>
                                        <Select
                                            options={longStayOnly}
                                            onChange={handleStayTypeChange}
                                            placeholder="Select a Type"
                                            classNamePrefix="custom"
                                            menuPlacement="auto"
                                            styles={{
                                                control: (base) => ({
                                                    ...base,
                                                    height: "50px",
                                                    border: "1px solid #D9D9D9",
                                                    borderRadius: "8px",
                                                    fontSize: "16px",
                                                    color: "#4B4B4B",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                    boxShadow: "none",
                                                }),
                                                menu: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#f8f9fa",
                                                    border: "1px solid #ced4da",
                                                    fontFamily: "Gilroy",
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    backgroundColor: "#f8f9fa",
                                                    maxHeight: "120px",
                                                    padding: 0,
                                                    scrollbarWidth: "thin",
                                                    overflowY: "auto",
                                                    fontFamily: "Gilroy",
                                                }),
                                                placeholder: (base) => ({
                                                    ...base,
                                                    color: "#9aa0a6",
                                                }),
                                                dropdownIndicator: (base) => ({
                                                    ...base,
                                                    color: "#555",
                                                    display: "inline-block",
                                                    fill: "currentColor",
                                                    lineHeight: 1,
                                                    stroke: "currentColor",
                                                    strokeWidth: 0,
                                                    cursor: "pointer",
                                                }),
                                                indicatorSeparator: () => ({
                                                    display: "none",
                                                }),
                                                option: (base, state) => ({
                                                    ...base,
                                                    cursor: state.isDisabled ? "not-allowed" : "pointer",
                                                    backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                                    color: state.isDisabled ? "#aaa" : "#000",
                                                }),
                                            }}
                                        />

                                    </Form.Group>

                                    {stay_typenameErrmsg.trim() !== "" && (
                                        <ErrorMessage message={stay_typenameErrmsg} type="error" />
                                    )}

                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Rental Amount
                                            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                        </Form.Label>
                                        <Form.Control
                                            value={RoomRent}
                                            onChange={handleRoomRent}
                                            type="text"
                                            placeholder="Enter Rental Amount"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: RoomRent ? 600 : 500,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>
                                    {roomrentError && (
                                        <ErrorMessage message={roomrentError} type="error" />
                                    )}
                                </div>



                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Advance Amount
                                            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                        </Form.Label>
                                        <Form.Control
                                            value={AdvanceAmount}
                                            onChange={handleAdvanceAmount}
                                            type="text"
                                            placeholder="Enter Advance Amount"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: AdvanceAmount ? 600 : 500,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>

                                    {advanceAmountError && (
                                        <ErrorMessage message={advanceAmountError} type="error" />
                                    )}
                                </div>

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
                                            Joining Date   <span style={{ color: 'red', fontSize: '20px' }}>*</span>
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
                                                value={joiningDate ? dayjs(joiningDate) : null}
                                                onChange={(date) => {
                                                    setJoiningDate(date);
                                                    setJoingDateErrmsg("");
                                                }}
                                                getPopupContainer={() => document.body}


                                                disabledDate={(current) => {
                                                    if (!current) return false;

                                                    const bookedAtDayjs = bookingDate
                                                        ? dayjs(bookingDate, "DD/MM/YYYY")
                                                        : null;

                                                    return (
                                                        (bookedAtDayjs && current.isBefore(bookedAtDayjs.startOf("day"))) ||
                                                        current.isAfter(dayjs().endOf("day"))
                                                    );
                                                }}

                                            />
                                        </div>
                                    </Form.Group>
                                    {joiningDateErrmsg.trim() !== "" && (
                                        <ErrorMessage message={joiningDateErrmsg} type="error" />
                                    )}
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12">

                                    <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-1 mb-2">

                                        <div className="d-flex justify-content-between align-items-center p-2">
                                            <div>
                                                <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                                            </div>
                                            <div>
                                                <Button
                                                    onClick={handleAddField}
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "14px",
                                                        backgroundColor: "#1E45E1",
                                                        color: "white",
                                                        fontWeight: 600,
                                                        borderRadius: "10px",
                                                        padding: "6px 15px",
                                                        marginBottom: "10px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                    }}
                                                >
                                                    <img
                                                        src={addcircle}
                                                        alt="Assign Bed"
                                                        style={{
                                                            height: 16,
                                                            width: 16,
                                                            filter: "brightness(0) invert(1)",
                                                        }}
                                                    />
                                                    Add
                                                </Button>

                                            </div>
                                        </div>


                                        {fields.map((item, index) => {
                                            const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");

                                            const filteredOptions = reasonOptions.map((opt) => {
                                                if (opt.value === "maintenance") {
                                                    return {
                                                        ...opt,
                                                        isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                                                    };
                                                }
                                                return opt;
                                            });

                                            return (
                                                <div className="row px-4 mb-3" key={index}>
                                                    <div className="col-md-6">


                                                        {!item.showInput ? (
                                                            <Select
                                                                options={filteredOptions}
                                                                value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                                                onChange={(selectedOption) => {
                                                                    const selectedValue = selectedOption.value;

                                                                    if (selectedValue === "others") {
                                                                        handleInputChange(index, "reason", "others");
                                                                    } else {
                                                                        handleInputChange(index, "reason", selectedValue);
                                                                    }
                                                                }}
                                                                isDisabled={item.reason === "maintenance"}
                                                                menuPlacement="auto"
                                                                styles={{
                                                                    control: (base) => ({
                                                                        ...base,
                                                                        height: "50px",
                                                                        border: "1px solid #D9D9D9",
                                                                        borderRadius: "8px",
                                                                        fontSize: "16px",
                                                                        color: "#4B4B4B",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                        boxShadow: "none",
                                                                    }),
                                                                    menu: (base) => ({
                                                                        ...base,
                                                                        backgroundColor: "#f8f9fa",
                                                                        border: "1px solid #ced4da",
                                                                        fontFamily: "Gilroy",
                                                                    }),
                                                                    menuList: (base) => ({
                                                                        ...base,
                                                                        backgroundColor: "#f8f9fa",
                                                                        maxHeight: "120px",
                                                                        padding: 0,
                                                                        scrollbarWidth: "thin",
                                                                        overflowY: "auto",
                                                                        fontFamily: "Gilroy",
                                                                    }),
                                                                    placeholder: (base) => ({
                                                                        ...base,
                                                                        color: "#555",
                                                                    }),
                                                                    dropdownIndicator: (base) => ({
                                                                        ...base,
                                                                        color: "#555",
                                                                        display: "inline-block",
                                                                        fill: "currentColor",
                                                                        lineHeight: 1,
                                                                        stroke: "currentColor",
                                                                        strokeWidth: 0,
                                                                        cursor: "pointer",
                                                                    }),
                                                                    indicatorSeparator: () => ({
                                                                        display: "none",
                                                                    }),
                                                                    option: (base, state) => ({
                                                                        ...base,
                                                                        cursor: state.isDisabled ? "not-allowed" : "pointer",
                                                                        backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                                                        color: state.isDisabled ? "#aaa" : "#000",
                                                                    }),
                                                                }}
                                                            />
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter custom reason"
                                                                    value={item.customReason}
                                                                    onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
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
                                                            </>
                                                        )}
                                                        {errors[index]?.reason && (
                                                            <ErrorMessage message={errors[index]?.reason} type="error" />
                                                        )}
                                                    </div>


                                                    <div className="col-md-5">

                                                        <input
                                                            type="text"
                                                            placeholder="Enter amount"
                                                            value={item.amount}
                                                            onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                                            className="form-control"
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
                                                        {errors[index]?.amount && (
                                                            <ErrorMessage message={errors[index]?.amount} type="error" />
                                                        )}
                                                    </div>


                                                    <div className="col-md-1 d-flex justify-content-center align-items-center p-0">

                                                        <Trash
                                                            size="20"
                                                            color="red"
                                                            variant="Bold"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleRemoveField(index)}
                                                        />

                                                    </div>
                                                </div>
                                            );
                                        })}




                                    </div>
                                </div>

                            </div>
                        </Modal.Body>

                        {formLoading &&
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


                        {state.UsersList.bedError ?
                            <ErrorMessage message={state.UsersList.bedError} type="error" />

                            : null}


                        <Modal.Footer style={{ border: "none", paddingTop: 0 }}>
                            <div className="d-flex justify-content-end gap-3">


                                <Button
                                    onClick={handleClose}
                                    className="w-100 mt-1"
                                    style={{
                                        backgroundColor: "#fff",
                                        border: "none",
                                        color: "#1E45E1",
                                        fontWeight: 600,
                                        borderRadius: 12,
                                        fontSize: 16,
                                        fontFamily: "Gilroy",
                                        padding: "8px 40px"
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button
                                    disabled={state.UsersList.bedError}
                                    className="w-100 mt-1"
                                    style={{
                                        backgroundColor: "#1E45E1",
                                        fontWeight: 600,
                                        borderRadius: 12,
                                        fontSize: 16,
                                        fontFamily: "Gilroy",
                                        padding: "8px 30px"
                                    }}
                                    onClick={handleCheckin}
                                >
                                    Checkin
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>

        </>
    )
}
CheckIn.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,
    currentItem: PropTypes.func.isRequired,

}
export default CheckIn;

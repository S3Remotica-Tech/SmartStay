/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import { JoininDatecustomer } from "../../Redux/Action/smartStayAction";
import { Trash } from 'iconsax-react';
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Profileimage from "../../Assets/Images/New_images/profile-picture.png";
import ErrorMessage from '../../Components/ErrorMessage'
import customParseFormat from "dayjs/plugin/customParseFormat";
function BookedCheckIn({ BookingAssignForm, handleClose, bookingDetails }) {



    console.log("bookingDetails", bookingDetails)


    //  valdation => joing date enale, before booking darte not allowed

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    // const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("LONG");
    const [formLoading, setFormLoading] = useState(false)
    // const [floor_name, setFloorName] = useState("")
    //   const [room_name, setRoomName] = useState("")
    //   const [bed_name, setBedName] = useState("")
    const calendarRef = useRef(null);
    const [dateError, setDateError] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    dayjs.extend(customParseFormat);
    const [fields, setFields] = useState([]);
    const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
    const [AdvanceAmount, setAdvanceAmount] = useState("");
    const [advanceAmountError, setAdvanceAmountError] = useState("");
    const [RoomRent, setRoomRent] = useState("");
    const [roomrentError, setRoomRentError] = useState("");
    const [errors, setErrors] = useState('')
    const [bookingAmount, setBookingAmount] = useState('')

    const reasonOptions = [
        { value: "maintenance", label: "Maintenance" },
        { value: "others", label: "Others" },
    ];




    const options = {
        dateFormat: "Y/m/d",
        maxDate: null,
        minDate: new Date(),
    };



    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.flatpickr.set(options);
        }
    }, [selectedDate]);





    const handleAdvanceAmount = (e) => {
        const advanceAmount = e.target.value;
        if (!/^\d*$/.test(advanceAmount)) {
            return;
        }
        setAdvanceAmount(advanceAmount);
        setAdvanceAmountError("");
    };


    const handleRoomRent = (e) => {
        const newAmount = e.target.value;
        if (!/^\d*$/.test(newAmount)) {
            return;
        }
        setRoomRent(newAmount);
        setRoomRentError("");
    };







    const handleAddField = () => {
        setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
    };

    // const handleInputChange = (index, field, value) => {
    //     const updatedFields = [...fields];
    //     const updatedErrors = [...errors];

    //     if (field === "reason") {
    //         if (value === "others") {
    //             updatedFields[index].showInput = true;
    //             updatedFields[index].reason_name = "others";
    //             updatedFields[index].customReason = "";
    //         } else {
    //             updatedFields[index].showInput = false;
    //             updatedFields[index].reason = value;
    //             updatedFields[index].reason_name = value;
    //             updatedFields[index].customReason = "";
    //         }


    //         if (updatedErrors[index]) updatedErrors[index].reason = "";
    //     } else if (field === "customReason") {
    //         updatedFields[index].customReason = value;
    //         if (updatedErrors[index]) updatedErrors[index].reason = "";
    //     } else if (field === "amount") {


    //         const numericValue = value.replace(/[^0-9]/g, "");
    //         updatedFields[index].amount = numericValue;
    //         if (updatedErrors[index]) updatedErrors[index].amount = "";

    //     }

    //     setFields(updatedFields);
    //     setErrors(updatedErrors);
    // };

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
    };


    const handleSaveBooking = async () => {

        let hasError = false;
        setRoomRentError("");
        setAdvanceAmountError("");
        let newErrors = [];
        let hasReasonAmountError = false;

        if (!selectedDate) {
            setJoingDateErrmsg("Please Select Joining Date");
            hasError = true;

        }

        if (!RoomRent) {
            setRoomRentError("Please Enter Rental Amount");
            hasError = true;
        } else if (Number(RoomRent) <= 0) {
            setRoomRentError("Please Enter Valid Rental Amount");
            hasError = true;
        }

        if (!AdvanceAmount) {
            setAdvanceAmountError("Please Enter Advance Amount");
            hasError = true;
        } else if (Number(AdvanceAmount) <= 0) {
            setAdvanceAmountError("Please Enter Valid Advance Amount");
            hasError = true;
        }




        if (hasError) return;

        const incrementDateAndFormat = (date) => {
            const newDate = new Date(date);

            const day = String(newDate.getDate()).padStart(2, "0");
            const month = String(newDate.getMonth() + 1).padStart(2, "0");
            const year = newDate.getFullYear();

            return `${day}-${month}-${year}`;
        };

        const formattedDate = selectedDate
            ? incrementDateAndFormat(selectedDate)
            : "";


        console.log("formattedDate", formattedDate)



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

            Number(AdvanceAmount) > 0 &&
            Number(RoomRent) > 0 && state.UsersList?.bookedDetails?.canCheckIn
        ) {

            dispatch({
                type: 'BOOKINGTOCHECKIN',
                payload: {
                    customerId: bookingDetails?.customerId,
                    bookingId: state.UsersList?.bookedDetails?.bookingId,
                    joiningDate: formattedDate,
                    advanceAmount: Number(AdvanceAmount),
                    rentalAmount: Number(RoomRent),
                    stayType: activeTab,
                    deductions: formattedReasons?.map(item => ({
                        type: item.type,
                        amount: Number(item.amount),
                    })),
                    isAdvanceIncludedInBooking: true
                }
            });




        }
        setFormLoading(true)

    };





    useEffect(() => {
        if (bookingDetails?.customerId) {
            dispatch({ type: 'BOOKEDDETAILS', payload: { hostelId: state.login.selectedHostel_Id, customerId: bookingDetails?.customerId } })
        }

    }, [bookingDetails])

    useEffect(() => {
        if (state.UsersList?.bookedDetails || bookingDetails) {
            setBookingAmount(state.UsersList.bookedDetails?.bookingAmount)
            setRoomRent(state.UsersList.bookedDetails?.rent)
        }

    }, [state.UsersList?.bookedDetails, bookingDetails])

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
        }

    }, [state.UsersList.bedError])


    return (
        <Modal
            show={BookingAssignForm}
            onHide={handleClose}
            backdrop="static"
            centered
        >
            <Modal.Dialog
                style={{
                    maxWidth: 950,
                    paddingRight: "10px",
                    borderRadius: "30px",
                }}
                className="m-0 p-0"
            >
                <Modal.Body >
                    <div>

                        <div >
                            <Modal.Header className="pt-0"
                                style={{ position: "relative", marginTop: "", border: "none" }}
                            >
                                <div
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 600,
                                        fontFamily: "Gilroy",
                                    }}
                                >
                                    Tenant Check-In
                                </div>

                                <CloseCircle
                                    size="24"
                                    color="#000"
                                    onClick={handleClose}
                                    style={{ cursor: "pointer" }}
                                />
                            </Modal.Header>
                            <div className="d-flex align-items-center gap-3 mb-3 ms-3">

                                <img
                                    src={
                                        typeof bookingDetails?.profilePic === "string" && bookingDetails?.profilePic.trim()
                                            ? bookingDetails?.profilePic
                                            : bookingDetails?.profilePic instanceof File
                                                ? URL.createObjectURL(bookingDetails?.profilePic)
                                                : Profileimage
                                    }
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="35"
                                    height="35"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = Profileimage;
                                    }}
                                />
                                <div>
                                    <div>
                                        <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px", fontFamily: "Gilroy" }}>
                                            {bookingDetails?.firstName}{bookingDetails?.lastName}
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
                                            {bookingDetails?.floorName}
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
                                            {bookingDetails?.roomName} - {bookingDetails?.bedName}
                                        </span>
                                    </div>

                                </div>



                            </div>


                            <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, width: "100%" }} className="mt-1 p-1">
                                <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", width: "100%" }}>
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
                                            fontFamily: "Gilroy"
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
                                            fontFamily: "Gilroy"
                                        }}
                                    >
                                        Short Stay
                                    </button>
                                </div>

                            </div>

                            {activeTab === "LONG" ? <>
                                <div style={{ maxHeight: "300px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                                    <div className="row d-flex align-items-center">




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
                                                    {state.UsersList.bookedDetails?.bookedDate}
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


                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                            <Form.Group controlId="purchaseDate">
                                                <Form.Label
                                                    style={{
                                                        fontSize: 14,
                                                        color: "#222222",
                                                        fontFamily: "Gilroy",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    Joining Date{" "}  <span style={{ color: "red", fontSize: "20px" }}> *</span>

                                                </Form.Label>

                                                <div
                                                    className="datepicker-wrapper"
                                                    style={{ position: "relative", width: "100%" }}
                                                >
                                                    <DatePicker
                                                        style={{
                                                            width: "100%",
                                                            height: 48,
                                                            cursor: "pointer",
                                                            fontFamily: "Gilroy",
                                                            
                                                        }}
                                                        format="DD/MM/YYYY"
                                                                                                               value={selectedDate ? dayjs(selectedDate) : null}
                                                        onChange={(date) => {
                                                            setDateError("");
                                                            setSelectedDate(date);
                                                            setJoingDateErrmsg('')

                                                            dispatch(JoininDatecustomer(date ? date.toDate() : null));
                                                        }}

                                                        disabledDate={(current) => {
                                                            if (!current) return false;

                                                            const bookedAtDayjs = state.UsersList?.bookedDetails?.bookedDate
                                                                ? dayjs(state.UsersList?.bookedDetails?.bookedDate, "DD/MM/YYYY")
                                                                : null;

                                                            return (
                                                                (bookedAtDayjs && current.isBefore(bookedAtDayjs.startOf("day"))) ||    
                                                                current.isAfter(dayjs().endOf("day"))
                                                            );
                                                        }}


                                                    />
                                                </div>
                                            </Form.Group>

                                            {dateError && (
                                                <ErrorMessage message={dateError} type="error" />
                                            )}

                                            {joiningDateErrmsg.trim() !== "" && (
                                                <ErrorMessage message={joiningDateErrmsg} type="error" />
                                            )}
                                        </div>




                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <Form.Group>
                                                <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                                    Advance Amount
                                                    <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                                </Form.Label>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Enter Amount"
                                                    value={AdvanceAmount}
                                                    onChange={handleAdvanceAmount}
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





                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                            <Form.Group>
                                                <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                                    Rental Amount
                                                    <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                                </Form.Label>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Enter Amount"
                                                    value={RoomRent}
                                                    onChange={handleRoomRent}
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



                                    </div>

                                    <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-3 mb-3">

                                        <div className="d-flex justify-content-between align-items-center p-4">
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

                                {state.UsersList.bedError &&
                                    <div className="d-flex justify-content-center">
                                        <ErrorMessage message={state.UsersList.bedError} type="error" />

                                    </div>
                                }

                                <Button
                                    className="w-100"
                                    disabled={state.UsersList.bedError}
                                    style={{
                                        backgroundColor: "#1E45E1",
                                        fontWeight: 600,
                                        height: 50,
                                        borderRadius: 12,
                                        fontSize: 16,
                                        fontFamily: "Montserrat",
                                        marginTop: 10,
                                    }}
                                    onClick={handleSaveBooking}
                                >
                                    Assign Bed
                                </Button>
                            </>

                                :



                                activeTab === "SHORT" && (
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

                                            <p style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Gilroy" }}>Coming Soon. Stay tuned!</p>
                                        </div>
                                    </div>

                                )



                            }






                        </div>
                        {/* )} */}













                    </div>
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





            </Modal.Dialog>
        </Modal>

    )
}
BookedCheckIn.propTypes = {
    BookingAssignForm: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    bookingDetails: PropTypes.func.isRequired,
}
export default BookedCheckIn
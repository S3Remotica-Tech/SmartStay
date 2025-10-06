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

function BackToCheckIn({ show, handleClose }) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState("LONG");
    const [floorError, setfloorError] = useState("");
    const [roomError, setRoomError] = useState("");
    const [bedError, setBedError] = useState("");
      const [recheckInDate, setRecheckInDate] = useState("");
    const [advanceAmountError, setAdvanceAmountError] = useState("");
    const [roomrentError, setRoomRentError] = useState("");
    const [formLoading, setFormLoading] = useState(false)
    const [RoomRent, setRoomRent] = useState("");
    const [reason, setReason] = useState("");
    const [Floor, setFloor] = useState("");
    const [Rooms, setRooms] = useState("");
    const [Bed, setBed] = useState("");
    const [selectedDate, setSelectedDate] = useState(null);
    const [recheckinbedname, setRecheckinbedName] = useState("")
    const calendarRef = useRef(null);
    const [dateError, setDateError] = useState("");
    const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
    const [AdvanceAmount, setAdvanceAmount] = useState("");
    const [fields, setFields] = useState([]);
    const reasonRef = useRef(null);
    const dateRef = useRef(null);
     const [recheckinDateError, setRecheckinDateError] = useState("")
      const [reasonError, setReasonError] = useState("")
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

const handleRecheckin = (e) => {
    setReason(e.target.value)
    setReasonError("")
  }


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


    const reasonOptions = [
        { value: "maintenance", label: "Maintenance" },
        { value: "others", label: "Others" },
    ];



    const handleAddField = () => {
        setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
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


    const handleJoiningDateChange = (date) => {
        setDateError("");
        setSelectedDate(date ? date.toDate() : null);
        setJoingDateErrmsg('')
        dispatch(JoininDatecustomer(date ? date.toDate() : null));
    }




    return (
        <Modal
            show={show}
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
                                    Back to Check-In
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
                                    src={Profileimage}
                                    // src={
                                    //   props.EditObj && props.EditObj?.profile && props.EditObj?.profile !== ""
                                    //     ? typeof props.EditObj?.profile === "string"
                                    //       ? props.EditObj?.profile.startsWith("/9j/")
                                    //         ? `data:image/jpeg;base64,${props.EditObj?.profile}`
                                    //         : props.EditObj?.profile
                                    //       : URL.createObjectURL(props.EditObj?.profile)
                                    //     : Profileimage
                                    // }
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="35"
                                    height="35"
                                />
                                <div>
                                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                                        {/* {props.EditObj?.Name} */}
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
                                            }}
                                        >
                                            {/* {bookingFlooorId} */}
                                        </span>
                                        <span
                                            style={{
                                                backgroundColor: "#F8D7DA",
                                                color: "#721C24",
                                                fontSize: "12px",
                                                padding: "2px 8px",
                                                borderRadius: "12px",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {/* {bookingRoomId} - {bookingBedId} */}
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
                                <div style={{ maxHeight: "320px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                                    <div className="row d-flex align-items-center">
                                        {/* <div className="col-12">
                                            <Form.Label
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy",
                                                    paddingTop: "6px",
                                                }}
                                            >
                                                Floor  {" "}
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </Form.Label>

                                            <Select
                                                isDisabled={true}
                                                //   value={
                                                //     selectedFloor
                                                //       ? { value: selectedFloor.floor_id, label: selectedFloor.floor_name }
                                                //       : null
                                                //   }
                                                onChange={(option) => setFloor(option?.value || "")}
                                                options={state.UsersList?.hosteldetailslist?.map((option) => ({
                                                    value: option.floor_id,
                                                    label: option.floor_name,
                                                }))}
                                                placeholder="Select a Floor"
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
                                                        cursor: "pointer",
                                                        backgroundColor: state.isFocused ? "#dd2525ff" : "white",
                                                        color: "#000",
                                                    }),
                                                }}
                                            />

                                            {floorError && (
                                                <ErrorMessage message={floorError} type="error" />
                                            )}
                                        </div>

                                        <div className="col-12 mb-1">
                                            <Form.Label
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy",
                                                }}
                                            >
                                                Room {" "}
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </Form.Label>

                                            <Select
                                                isDisabled={true}
                                                options={
                                                    state.PgList?.roomsList?.map((item) => ({
                                                        value: item.id,
                                                        label: item.name,
                                                    })) || []
                                                }
                                                onChange={(selectedOption) => handleRooms(selectedOption?.value)}
                                                // value={
                                                //     selectedRoom
                                                //         ? { value: selectedRoom.id, label: selectedRoom.name }
                                                //         : null
                                                // }
                                                placeholder="Select a Room"
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
                                                        cursor: "pointer",
                                                        backgroundColor: state.isFocused ? "#f0f0f0" : "white",
                                                        color: "#000",
                                                    }),
                                                }}
                                            />

                                            {roomError && (
                                                <ErrorMessage message={roomError} type="error" />
                                            )}
                                        </div>




                                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                                            <Form.Label
                                                style={{
                                                    fontSize: 14,
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy",
                                                }}
                                            >
                                                Bed {" "}
                                                <span style={{ color: "red", fontSize: "20px" }}>
                                                    {" "}
                                                    *{" "}
                                                </span>
                                            </Form.Label>
                                            <FormControl
                                                type="text"
                                                id="form-controls"
                                                placeholder="6542310"
                                                value={recheckinbedname}
                                                isDisabled
                                                style={{
                                                    fontSize: 16,
                                                    color: "#4B4B4B",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                    boxShadow: "none",
                                                    border: "1px solid #D9D9D9",
                                                    height: 50,
                                                    borderRadius: 8,
                                                    backgroundColor: "#f8f9fa",
                                                }}
                                            />



                                        </div> */}



                                        {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                                            <Form.Group controlId="purchaseDate">
                                                <Form.Label
                                                    style={{
                                                        fontSize: 14,
                                                        color: "#222222",
                                                        fontFamily: "Gilroy",
                                                        fontWeight: 500,
                                                    }}
                                                >
                                                    Joining Date{" "}
                                                    <span style={{ color: "red", fontSize: "20px" }}>
                                                        *
                                                    </span>
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
                                                            fontFamily: "Gilroy"
                                                        }}
                                                        format="DD/MM/YYYY"
                                                        disabled
                                                        placeholder="DD/MM/YYYY"
                                                        value={selectedDate ? dayjs(selectedDate) : null}
                                                        onChange={(date) => {
                                                            setDateError("");
                                                            setSelectedDate(date ? date.toDate() : null);
                                                            setJoingDateErrmsg('')

                                                            dispatch(JoininDatecustomer(date ? date.toDate() : null));
                                                        }}
                                                        getPopupContainer={(triggerNode) =>
                                                            triggerNode.closest(".show-scroll") || document.body
                                                        }
                                                        disabledDate={(current) => current && current > dayjs().endOf("day")}
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

                                        <div className="row align-items-end ms-1 me-1" style={{ paddingRight: 5, paddingLeft: 0 }}>


                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                                                <Form.Group>
                                                    <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                                        Advance Amount
                                                        <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                                    </Form.Label>
                                                    <FormControl
                                                        disabled
                                                        type="text"
                                                        placeholder="Enter Amount"
                                                        value={AdvanceAmount}
                                                        // onChange={handleAdvanceAmount}
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
                                                {advanceAmountError && (
                                                    <ErrorMessage message={advanceAmountError} type="error" />
                                                )}
                                            </div>


                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                                                <Form.Group>
                                                    <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                                        Rental Amount
                                                        <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                                    </Form.Label>
                                                    <FormControl
                                                        disabled
                                                        type="text"
                                                        placeholder="Enter Amount"
                                                        value={RoomRent}
                                                        onChange={handleRoomRent}
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
                                                {roomrentError && (
                                                    <ErrorMessage message={roomrentError} type="error" />
                                                )}
                                            </div>




                                        </div> */}


                                    </div>

                                    {/* <div style={{
                                        backgroundColor: "#F7F9FF",
                                        borderRadius: 10,
                                        paddingBottom: 5,
                                        pointerEvents: "none",
                                        opacity: 0.6,
                                    }} className="mt-3 mb-3">

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


                                                    <div className="col-md-5 position-relative">
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
                                                                paddingRight: 35,
                                                            }}
                                                        />


                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveField(index)}
                                                            style={{
                                                                position: "absolute",
                                                                right: 10,
                                                                top: "10%",
                                                                transform: "translateY(-50%)",
                                                                background: "#F0F0F0",
                                                                border: "1px solid #C1C1C1",
                                                                borderRadius: "50%",
                                                                width: 20,
                                                                height: 20,
                                                                padding: 0,
                                                                fontSize: 12,
                                                                lineHeight: 1,
                                                                textAlign: "center",
                                                                color: "#333",
                                                            }}
                                                        >
                                                            ×
                                                        </button>


                                                        {errors[index]?.amount && (
                                                            <ErrorMessage message={errors[index]?.amount} type="error" />
                                                        )}
                                                    </div>




                                                </div>
                                            );
                                        })}




                                    </div> */}



                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                        <Form.Group>
                                            <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                                Reason(Comments) {" "}
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
                                        {reasonError && (
                                            <ErrorMessage message={reasonError} type="error" />
                                        )}
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
                                            Re Check-In Date {" "}
                                            <span style={{ color: "red", fontSize: "20px" }}>
                                                *
                                            </span>
                                        </Form.Label>

                                        {/* <DatePicker
                           ref={dateRef}
                            style={{
                              width: "100%",
                              height: 48,
                              cursor: "pointer",
                              fontFamily: "Gilroy"
                            }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            value={recheckInDate ? dayjs(recheckInDate) : null}
                            onChange={(date) => {
                            
                              setRecheckInDate(date ? date.toDate() : null);
                              setRecheckinDateError("")
                            }}
                            getPopupContainer={(triggerNode) =>
                              triggerNode.closest(".datepicker-wrapper") || document.body
                            }
                            dropdownClassName="custom-datepicker-popup"
                            disabledDate={(current) => current && current > dayjs().endOf("day")}
                          /> */}

                                        <DatePicker
                                            ref={dateRef}
                                            style={{
                                                width: "100%",
                                                height: 48,
                                                cursor: "pointer",
                                                fontFamily: "Gilroy"
                                            }}
                                            format="DD/MM/YYYY"
                                            placeholder="DD/MM/YYYY"
                                            value={recheckInDate ? dayjs(recheckInDate) : null}
                                            onChange={(date) => {
                                                setRecheckInDate(date ? date.toDate() : null);
                                                setRecheckinDateError("");
                                            }}
                                            getPopupContainer={(triggerNode) =>
                                                triggerNode.closest(".datepicker-wrapper") || document.body
                                            }
                                            dropdownClassName="custom-datepicker-popup"
                                            disabledDate={(current) => {
                                                if (!RequestDate) {
                                                    return current && current > dayjs().endOf("day");
                                                }
                                                return current && current < dayjs(RequestDate).startOf("day");
                                            }}
                                        />


                                        {recheckinDateError && (
                                            <ErrorMessage message={recheckinDateError} type="error" />
                                        )}
                                    </div>





                                </div>



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


                                <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: 10, justifyContent: "flex-end" }}>
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

                                    <button
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
                                        // onClick={handleSaveBacktoCheckin}
                                    >
                                        Check-In
                                    </button>
                                </div>

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

export default BackToCheckIn
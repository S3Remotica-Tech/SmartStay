
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
// import { JoininDatecustomer } from "../../Redux/Action/smartStayAction";

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
        const matchedBed = state.PgList.roomCount[0].bed_details.find(
            (item) => item.id === currentItem?.bed?.id
        );

        if (matchedBed) {
            setRoomRent(matchedBed.bed_amount);
        }
    }, [state.PgList, currentItem]);

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

    const [customer, setCustomer] = useState([])


    useEffect(() => {

        const Hostel_Id = currentItem?.room.Hostel_Id;
        const Floor_Id = currentItem?.room.Floor_Id;
        const Bed_Id = currentItem?.bed.id;
        const Room_Id = currentItem?.room.Room_Id;


        if (Hostel_Id && Floor_Id && Bed_Id && Room_Id) {
            dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostel_id: Hostel_Id } });
            dispatch({ type: 'OCCUPIEDCUSTOMER', payload: { hostel_id: Hostel_Id, floor_id: Floor_Id, room_id: Room_Id, bed: Bed_Id } })

        }
    }, [currentItem])


    useEffect(() => {
        if (state.PgList.OccupiedCustomerGetStatusCode === 200) {
            setFormLoading(false)
            setCustomer(state.PgList.OccupiedCustomer)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_OCCUPED_CUSTOMER_STATUSCODE' })
            }, 2000)
        }


    }, [state.PgList.OccupiedCustomerGetStatusCode])


    const [customer_details, setCustomerDetails] = useState({})
    const [stay_typename, setStayTypeName] = useState("")
    const [stay_typenameErrmsg, setStayTypeNameErrMsg] = useState("")

    const stayTypes = [
        { value: "short_stay", label: "Short Stay" },
        { value: "long_stay", label: "Long Stay" },
        { value: "day_stay", label: "Day Stay" },
    ];

    const longStayOnly = stayTypes.filter((s) => s.value === "long_stay");


    const handleStayTypeChange = (selectedOption) => {
        setStayTypeName(selectedOption?.value || '');
        if (!selectedOption) {
            setStayTypeNameErrMsg("Please Select Staytype");
        } else {
            setStayTypeNameErrMsg("");
        }
    };

    useEffect(() => {
        if (customer.length > 0) {
            const selectedUser = state?.UsersList?.Users.find(item => item.User_Id === customer[0]?.User_Id)
            console.log("selecteduser", selectedUser);
            setCustomerDetails(selectedUser)
            setBookingAmount(Number(selectedUser.booking_amount))

            if (selectedUser?.booking_booking_date) {
                const dateObj = new Date(selectedUser?.booking_booking_date);
                const day = String(dateObj.getDate()).padStart(2, '0');
                const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                const year = dateObj.getFullYear();
                const formattedBookingDate = `${day}/${month}/${year}`;

                bookingDateRef.current = formattedBookingDate;
                setBookingDate(formattedBookingDate);
            }
            setCustomerName(selectedUser.ID)
        }
    }, [customer, state.PgList.OccupiedCustomerGetStatusCode])


    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
        }
        setFormLoading(false)
    }, [state.login.selectedHostel_Id]);


    const formatOptions = () => {
        return state.UsersList?.Users?.map((user) => ({
            value: user.ID,
            label: (
                <div className="d-flex align-items-center">
                    <span>{user.Name}</span>
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

        if (field === "reason") {
            if (value === "others") {
                updatedFields[index].showInput = true;
                updatedFields[index].reason_name = "others";
                updatedFields[index].customReason = "";
            } else {
                updatedFields[index].showInput = false;
                updatedFields[index].reason = value;
                updatedFields[index].reason_name = value;
                updatedFields[index].customReason = "";
            }


            if (updatedErrors[index]) updatedErrors[index].reason = "";
        } else if (field === "customReason") {
            updatedFields[index].customReason = value;
            if (updatedErrors[index]) updatedErrors[index].reason = "";
        }
        // else if (field === "amount") {
        //     updatedFields[index].amount = value;


        //     if (updatedErrors[index]) updatedErrors[index].amount = "";
        // }
        else if (field === "amount") {
            // allow only digits
            if (/^\d*$/.test(value)) {
                updatedFields[index].amount = value;
                if (updatedErrors[index]) updatedErrors[index].amount = "";
            }
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

        if (!stay_typename) {
            setStayTypeNameErrMsg("Please Select Staytype")
        }

        if (!joiningDate) {
            setJoingDateErrmsg("Please Select Joining Date")
        }

        if (!AdvanceAmount) {
            setAdvanceAmountError("Please Enter Advance Amount")
        }


        if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
            setRoomRentError("Please Enter Rental Amount");
            return;
        }
        if (Number(RoomRent) <= 0) {
            setRoomRentError("Please Enter Valid Rental Amount");
            return;
        }

        if (
            AdvanceAmount === "" ||
            AdvanceAmount === null ||
            AdvanceAmount === undefined
        ) {
            setAdvanceAmountError("Please Enter Advance Amount");
            return;
        }
        if (Number(AdvanceAmount) <= 0) {
            setAdvanceAmountError("Please Enter Valid Advance Amount");
            return;
        }

        setErrors(newErrors)

        if (!RoomRent && RoomRent !== 0) {
            setRoomRentError("Please Enter Rental Amount");
            return;
        }
        if (RoomRent <= 0) {
            setRoomRentError("Please Enter Valid Rental Amount");
            return;
        }
        if (!AdvanceAmount && AdvanceAmount !== 0) {
            setAdvanceAmountError("Please Enter Advance Amount");
            return;
        }

        if (AdvanceAmount <= 0) {
            setAdvanceAmountError("Please Enter Valid Advance Amount");
            return;
        }




        const incrementDateAndFormat = (date) => {
            const newDate = new Date(date);
            newDate.setDate(newDate.getDate() + 1);
            return newDate.toISOString().split("T")[0];
        };


        const formattedDate = joiningDate
            ? incrementDateAndFormat(joiningDate)
            : "";


        const invoiceDateObj = new Date(formattedDate);
        const dueDays = Number(state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth) || 0;

        const dueDateObj = new Date(invoiceDateObj);
        dueDateObj.setDate(dueDateObj.getDate() + dueDays);

        const formattedAdvanceDueDate = dueDateObj.toLocaleDateString("en-CA");





        const fullName = customer_details?.Name?.trim() || "";

        const [FirstName, ...lastNameParts] = fullName.split(" ");

        const LastName = lastNameParts.join(" ") || "";


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
                reason_name,
                amount: item.amount || "",
                showInput: !!item.showInput
            };
        });


        if (hasReasonAmountError) return;


        console.log("apitriggerd", hasReasonAmountError, AdvanceAmount, RoomRent);

        if (
            customer_name && formattedDate && stay_typename &&
            Number(AdvanceAmount) > 0 &&
            Number(RoomRent) > 0
        ) {

            dispatch({
                type: "ADDUSER",
                payload: {
                    profile: customer_details.profile,
                    firstname: FirstName || "",
                    LastName: LastName || "",
                    Phone: customer_details.Phone,
                    Email: customer_details.Email,
                    Address: customer_details.Address,
                    area: customer_details.area,
                    landmark: customer_details.landmark,
                    city: customer_details.city,
                    pincode: customer_details.pincode,
                    state: customer_details.state,
                    AadharNo: customer_details.AadharNo,
                    PancardNo: customer_details.PancardNo,
                    licence: customer_details.licence,
                    HostelName: customer_details.HostelName,

                    hostel_Id: state.login.selectedHostel_Id,
                    Floor: currentItem?.room?.Floor_Id,
                    Rooms: currentItem?.room?.Room_Id,
                    Bed: currentItem?.bed?.id,

                    joining_date: formattedDate,
                    AdvanceAmount: AdvanceAmount,
                    RoomRent: RoomRent,
                    isadvance: 1,
                    invoice_date: formattedDate,
                    due_date: formattedAdvanceDueDate,
                    reasons: formattedReasons,
                    stay_type: stay_typename,
                    booking_id: customer_details.booking_id,
                    booking_date: bookingDate,
                    booking_amount: bookingAmount,
                    ID: customer_name

                },
            });
        }
        dispatch({ type: "INVOICELIST" });
        setFormLoading(true)
    };


    useEffect(() => {
        if (state.UsersList?.statusCodeForAddUser === 200) {
            setFormLoading(false)
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
            handleClose();
        }
    }, [state.UsersList?.statusCodeForAddUser]);



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
                    backdrop="static"
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
                                    <div className="d-flex align-items-center gap-3 mt-1">
                                        <label style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>Room No {currentItem?.room.Room_Name} </label> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>|</span> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}> Bed {currentItem?.bed.bed_no}</span>
                                    </div>
                                </div>


                            </div>




                            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scrolls pt-0 mt-1 me-3">
                            <div className="row mt-1">


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
                                            Select Tenant {" "}
                                            <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                                        </Form.Label>
                                        <Select
                                            styles={customStyles}
                                            value={formatOptions().find(
                                                (opt) => opt.value === customer_name
                                            )}
                                            isDisabled
                                            //   onChange={handleCustomerChange}
                                            options={formatOptions()}
                                            placeholder="Select a Tenant"
                                            classNamePrefix="custom"
                                            menuPlacement="auto"


                                        />
                                    </Form.Group>


                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                                            value={bookingDate}
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
                                </div>

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
                                            styles={customStyles}
                                            options={longStayOnly}
                                            onChange={handleStayTypeChange}
                                            placeholder="Select a Type"
                                            classNamePrefix="custom"
                                            menuPlacement="auto"
                                        />

                                    </Form.Group>

                                    {stay_typenameErrmsg.trim() !== "" && (
                                        <div>
                                            <p style={{ fontSize: '15px', color: 'red' }}>
                                                {stay_typenameErrmsg !== " " && <MdError style={{ color: 'red', marginRight: "5px", fontSize: "14px" }} />}<span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{stay_typenameErrmsg}</span>
                                            </p>
                                        </div>
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
                                                fontWeight: 600,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>
                                    {roomrentError && (
                                        <div style={{ color: "red" }}>
                                            <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                                            <label
                                                className="mb-0"
                                                style={{
                                                    color: "red",
                                                    fontSize: "12px",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {roomrentError}
                                            </label>
                                        </div>
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
                                            placeholder="Enter   Advance Amount"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>

                                    {advanceAmountError && (
                                        <div style={{ color: "red" }}>
                                            <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                                            <label
                                                className="mb-0"
                                                style={{
                                                    color: "red",
                                                    fontSize: "12px",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {advanceAmountError}
                                            </label>
                                        </div>
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
                                                    setJoiningDate(date ? date.toDate() : null);
                                                    setJoingDateErrmsg('')
                                                    // dispatch(JoininDatecustomer(date ? date.toDate() : null));
                                                }}
                                                getPopupContainer={() => document.body}
                                                disabledDate={(current) => current && current > dayjs().endOf("day")}
                                            />
                                        </div>
                                    </Form.Group>
                                    {joiningDateErrmsg.trim() !== "" && (
                                        <div className="d-flex align-items-center">
                                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                                                {joiningDateErrmsg}
                                            </label>
                                        </div>
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
                                                            <div className="d-flex align-items-center mt-1">
                                                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                                                <label
                                                                    className="mb-0"
                                                                    style={{
                                                                        color: "red",
                                                                        fontSize: "12px",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {errors[index]?.reason}
                                                                </label>
                                                            </div>
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
                                                            <div className="d-flex align-items-center mt-1">
                                                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                                                <label
                                                                    className="mb-0"
                                                                    style={{
                                                                        color: "red",
                                                                        fontSize: "12px",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {errors[index]?.amount}
                                                                </label>
                                                            </div>
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

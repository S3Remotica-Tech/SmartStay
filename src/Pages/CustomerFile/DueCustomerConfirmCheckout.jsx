/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect , useRef} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";

import Image from "react-bootstrap/Image";

import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import { FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { CloseCircle, DocumentDownload } from "iconsax-react";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import { Trash } from 'iconsax-react';
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import { FaCheck } from "react-icons/fa";

function DueCustomerConfirmCheckout({ show, handleClose, data, dueAmountDetails }) {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [checked, setChecked] = useState(false);

    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState([]);
    const [modeOfPayment, setModeOfPayment] = useState("");
    const [comments, setComments] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    const [uploadFile, setUploadFile] = useState(null);
    const [rightOffNote, setRightOffNote] = useState("")
    const [checkoUtDateError, setCheckOutDateError] = useState("");
    const [ReturnAmount, setReturnAmount] = useState('')
    const [modeOfPaymentError, setModeOfPaymentError] = useState("")
    const [formLoading, setFormLoading] = useState(false)
    const checkOutDateRef = useRef(null);
const modeOfPaymentRef = useRef(null);

const reasonRefs = useRef([]);
const amountRefs = useRef([]);



    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
        }
    }, []);
    const reasonOptions = [
        { value: "DueAmount", label: "Due Amount" },
        { value: "maintenance", label: "Maintenance" },
        { value: "others", label: "Others" },
    ];



    const advanceAmount = state?.UsersList?.GetconfirmcheckoutUserDetails?.advance_amount

    useEffect(() => {
        if (fields || advanceAmount) {
            const totalDeductions = fields.reduce((acc, item) => acc + Number(item.amount || 0), 0);
            const returnAmount = Number(advanceAmount || 0) - totalDeductions;
            setReturnAmount(returnAmount)
        }
    }, [fields, advanceAmount])



    


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
        }
    };


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
        } else if (field === "amount") {
            updatedFields[index].amount = value;


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


    const handleModeOfPaymentChange = (e) => {
        setModeOfPaymentError("")
        setModeOfPayment(e.target.value);
    };

    const handleCommentsChange = (event) => {
        setComments(event.target.value);

    };


    const handleToggle = () => {
        setChecked((prev) => !prev);

    };



    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({ type: "BANKINGLIST", payload: { hostel_id: state.login.selectedHostel_Id } });
        }
    }, []);


    useEffect(() => {
        if (dueAmountDetails >= 0) {
            setFields([
                { reason_name: "DueAmount", amount: dueAmountDetails, showInput: false },
            ]);
        }
    }, [dueAmountDetails]);



    const handleConfirmCheckout = () => {

        let hasReasonAmountError = false;
        let newErrors = [];
        let hasError = false;
        if (!checkOutDate) {
            setCheckOutDateError("Please select a checkout Date");
            checkOutDateRef.current?.focus();
            hasError = true;
        }



        if (ReturnAmount >= 0 && !modeOfPayment) {
            setModeOfPaymentError("Please Select Mode Of Payment");
            if (!hasError) {
        modeOfPaymentRef.current?.focus(); 
        hasError = true;
    }
        }





        if (hasError) {
            return;
        }

        const formattedCheckOutDate = moment(
            typeof checkOutDate === 'string'
                ? checkOutDate
                : moment(checkOutDate).format("YYYY-MM-DD"),
            "YYYY-MM-DD"
        );


        const formattedRequestDate = moment(data.req_date, 'YYYY-MM-DD');

        if (formattedCheckOutDate.isBefore(formattedRequestDate, 'day')) {
            setCheckOutDateError("Before Request Date not allowed");
            return;
        }



        if (data?.ID) {




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
                    amount: item.amount?.toString() || "",
                    showInput: !!item.showInput
                };
            });

            setErrors(newErrors)

            if (hasReasonAmountError) return;
            const formattedDate = typeof checkOutDate === 'string'
                ? checkOutDate
                : moment(checkOutDate).format("YYYY-MM-DD")

            setCheckOutDateError("");




            {
                ReturnAmount >= 0 ?
                    <>
                        if (checkOutDate && modeOfPayment) {
                            dispatch({
                                type: "ADDCONFIRMCHECKOUTCUSTOMER",
                                payload: {
                                    checkout_date: formattedDate,
                                    id: data?.ID,
                                    hostel_id: data?.Hostel_Id,
                                    comments: comments,
                                    advance_return: ReturnAmount,
                                    reinburse: 1,
                                    reasons: formattedReasons,
                                    payment_id: modeOfPayment,
                                },
                            })
                        }
                    </>
                    :

                    dispatch({
                        type: "CONFIRMCHECKOUTDUECUSTOMER",
                        payload: {
                            checkout_date: formattedDate,
                            id: data?.ID,
                            hostel_id: data?.Hostel_Id,
                            advance_return: ReturnAmount,
                            reinburse: 1,
                            reasons: formattedReasons,
                            formal_checkout: checked,
                            reason_note: rightOffNote,
                            profile: uploadFile,

                        },
                    });



            }
            setFormLoading(true)

        }
    };





    useEffect(() => {
        if (data) {
            setCheckOutDate(data?.CheckoutDate)
        }

    }, [data])

    useEffect(() => {
        if (state.UsersList.statusCodeForDueCustomer === 200 || state.UsersList.statusCodeAddConfirmCheckout === 200) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: "REMOVE_CONFIRM_CHECKOUT_DUE_CUSTOMER" });
            }, 500);
        }

    }, [state.UsersList.statusCodeForDueCustomer, state.UsersList.statusCodeAddConfirmCheckout])


    useEffect(() => {
        if (state.createAccount?.networkError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])



    return (
        <div>   <Modal show={show} onHide={handleClose} centered backdrop="static" dialogClassName="custom-modals-style"
        >
            <Modal.Dialog
                style={{
                    paddingRight: "10px",
                    borderRadius: "30px",

                }}
                className="m-0 p-0"

            >
                <Modal.Header className="d-flex justify-content-between align-items-center">
                    <Modal.Title
                        style={{
                            fontWeight: "600",
                            fontSize: "18px",
                            fontFamily: "Gilroy",
                        }}
                    >
                        Confirm Check-Out
                    </Modal.Title>
                    <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />


                </Modal.Header>

                <Modal.Body style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll pt-2 mt-2 me-3">
                    <div >
                        <div className="row row-gap-2 d-flex align-items-center">

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="d-flex gap-3 align-items-center">
                                    <Image
                                        src={
                                            data?.user_profile !== undefined &&
                                                data?.user_profile !== null &&
                                                data?.user_profile !== '' &&
                                                data?.user_profile !== '0'
                                                ? data.user_profile
                                                : Profile2
                                        }

                                        roundedCircle
                                        style={{ height: 55, width: 55, cursor: "pointer" }}
                                    />
                                    <div>
                                        <label style={{
                                            fontSize: 20,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 600,
                                        }}>{data?.Name}</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Form.Group className="mb-2">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Current Floor{" "}

                                    </Form.Label>
                                    <FormControl
                                        id="form-controls"
                                        placeholder="Enter Name"
                                        type="text"

                                        value={data?.Floor}
                                        style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            boxShadow: "none",
                                            border: "1px solid #E7F1FF",
                                            height: 50,
                                            borderRadius: 8,
                                            backgroundColor: "#E7F1FF",
                                        }}
                                    />
                                </Form.Group>
                            </div>

                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                <Form.Group className="mb-2">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Current Bed{" "}
                                    </Form.Label>
                                    <FormControl
                                        id="form-controls"
                                        placeholder="Enter name"
                                        type="text"

                                        value={data?.bed_name}
                                        style={{
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            boxShadow: "none",
                                            border: "1px solid #E7F1FF",
                                            height: 50,
                                            borderRadius: 8,
                                            backgroundColor: "#E7F1FF",
                                        }}
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
                                        Check-Out Date{" "}
                                        <span style={{ color: "red", fontSize: "20px" }}>*</span>
                                    </Form.Label>



                                    <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%", }}>
                                        <DatePicker
                                        ref={checkOutDateRef}
                                            style={{
                                                width: "100%", height: 48, cursor: "pointer",
                                                backgroundColor: "#FFF",
                                                color: "#000",
                                                fontFamily: "Gilroy"
                                            }}
                                            format="DD/MM/YYYY"
                                            placeholder="DD/MM/YYYY"
                                            value={checkOutDate ? dayjs(checkOutDate) : null}
                                            onChange={(date) => {
                                                setCheckOutDate(date ? date.toDate() : null);
                                                setCheckOutDateError("");
                                            }}
                                            getPopupContainer={() => document.body}

                                        />
                                    </div>
                                </Form.Group>
                                {checkoUtDateError && (
                                    <div
                                        className="d-flex align-items-center p-1"
                                        style={{ marginTop: "-6px" }}>
                                        <MdError
                                            style={{
                                                color: "red",
                                                marginRight: "5px",
                                                fontSize: "12px",
                                            }}
                                        />
                                        <label
                                            className="mb-0"
                                            style={{
                                                color: "red",
                                                fontSize: "12px",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            {checkoUtDateError}
                                        </label>
                                    </div>
                                )}
                            </div>


                            <div className="col-lg-6 col-md-6 col-sm-12 colxs-12 mt-2">
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <label
                                        htmlFor="Advance"
                                        style={{
                                            fontSize: 14,
                                            color: "rgba(75, 75, 75, 1)",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Total Advance
                                    </label>


                                </div>

                                <input
                                    type="text"
                                    name="Advance"
                                    id="Advance"

                                    value={advanceAmount}
                                    className="form-control mt-2"
                                    placeholder="Add Advance Amount"
                                    required
                                    style={{
                                        height: "50px",
                                        borderRadius: "8px",
                                        fontSize: 16,
                                        color: "#4b4b4b",
                                        fontFamily: "Gilroy",
                                        fontWeight: 600,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                    }}
                                />
                            </div>




                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <h6 style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>Advance Deduction</h6>
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
                                                            isDisabled={item.reason === "maintenance" || item?.reason_name === "DueAmount"}
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

                                                    {index !== 0 && (
                                                        <Trash
                                                            size="20"
                                                            color="red"
                                                            variant="Bold"
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleRemoveField(index)}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}




                                </div>
                            </div>





                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="d-flex justify-content-between">
                                    <div>
                                        <label
                                            htmlFor="amount"
                                            className="form-label"
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            ReturnAmount
                                        </label>
                                    </div>
                                    <div>
                                        <div style={{ fontFamily: "Gilroy", color: "#FF0000", fontSize: 14 }}>{ReturnAmount >= 0 ? "" : "Pending"}</div>
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    id="amount"
                                    name="amount"
                                    value={ReturnAmount}
                                    placeholder="Enter Return Amount"
                                    className="form-control"
                                    readOnly


                                    style={{
                                        height: "50px",
                                        borderRadius: "8px",
                                        fontSize: 16,
                                        color: ReturnAmount >= 0 ? "#00A32E" : "#FF0000",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                    }}
                                />
                            </div>
                            {ReturnAmount >= 0 && (<>
                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-1"
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
                                            Mode of Transaction{" "}
                                            <span
                                                style={{
                                                    color: "#FF0000",
                                                    display: modeOfPayment ? "none" : "inline-block",
                                                }}
                                            >
                                                *
                                            </span>
                                        </Form.Label>
                                        <Form.Select
                                         ref={modeOfPaymentRef}
                                            aria-label="Default select example"
                                            value={modeOfPayment}
                                            onChange={handleModeOfPaymentChange}
                                            className=""
                                            id="vendor-select"
                                            style={{
                                                fontSize: 16,
                                                color: "rgba(75, 75, 75, 1)",
                                                fontFamily: "Gilroy",
                                                fontWeight: modeOfPayment ? 600 : 500,
                                                cursor: "pointer"
                                            }}
                                        >

                                            <option value="">Select Mode Of Payment</option>
                                            {Array.isArray(state.bankingDetails?.bankingList?.banks) &&
                                                state.bankingDetails?.bankingList?.banks.map((item) => {
                                                    let label = "";
                                                    if (item.type === "bank") label = 'Bank';
                                                    else if (item.type === "upi") label = "UPI";
                                                    else if (item.type === "card") label = "Card";
                                                    else if (item.type === "cash") label = "Cash";

                                                    return (
                                                        <option key={item.id} value={item.id}>
                                                            {`${item.benificiary_name} - ${label}`}
                                                        </option>
                                                    );
                                                })}

                                        </Form.Select>


                                    </Form.Group>
                                    {modeOfPaymentError && (
                                        <div
                                            className="d-flex justify-content-start align-items-start"
                                            style={{ color: "red", marginTop: 5, }}
                                        >
                                            <MdError style={{ fontSize: "14px", marginRight: "6px", marginTop: "1px" }} />
                                            <span
                                                style={{
                                                    fontSize: "12px",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                {modeOfPaymentError}
                                            </span>
                                        </div>
                                    )}

                                </div>


                                <div className="col-lg-12 col-md-12 col-sm-12 colxs-12">
                                    <label
                                        htmlFor="comments"
                                        className="mt-2"
                                        style={{
                                            fontSize: 14,
                                            color: "rgba(75, 75, 75, 1)",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Comments
                                    </label>
                                    <input
                                        type="text"
                                        name="comments"
                                        id="comments"
                                        value={comments}
                                        onChange={handleCommentsChange}
                                        className="form-control mt-2"
                                        placeholder="Add Comments"
                                        required
                                        style={{
                                            height: "50px",

                                            borderRadius: "8px",
                                            fontSize: 16,
                                            color: comments ? "#222" : "#4b4b4b",
                                            fontFamily: "Gilroy",
                                            fontWeight: comments ? 600 : 500,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                        }}
                                    />
                                </div>
                            </>
                            )}
                            {
                                ReturnAmount < 0 &&
                                <>
                                    <div className="d-flex justify-content-between col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        <div>
                                            <label style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}>Tenant Left Without Formal Checkout ?</label>
                                        </div>
                                        <div className="custom-toggle-wrapper"
                                            onClick={handleToggle}
                                        >
                                            <span className={`custom-toggle-label ${checked ? "active" : ""}`}>
                                                {checked ? "On" : "Off"}
                                            </span>
                                            <div className={`custom-toggle-switch ${checked ? "on" : "off"}`}>
                                                <div className="custom-toggle-thumb">
                                                    {checked && <FaCheck size={10} color="#1E1E1E" />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>



                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                        {checked && (
                                            <div className="">
                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: "#222222",
                                                        fontFamily: "Gilroy",
                                                        fontWeight: 500,
                                                        marginBottom: 5,
                                                    }}
                                                >
                                                    Reason/Right-off Note
                                                </label>
                                                <textarea
                                                    rows={3}
                                                    placeholder="Enter reason here..."
                                                    className="form-control mb-3"
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: 14,
                                                        borderRadius: 10,
                                                        border: "1px solid #D9D9D9",
                                                        resize: "none",
                                                    }}
                                                    value={rightOffNote}
                                                    onChange={(e) => setRightOffNote(e.target.value)}
                                                />



                                                <label
                                                    style={{
                                                        fontSize: 14,
                                                        color: "#222222",
                                                        fontFamily: "Gilroy",
                                                        fontWeight: 500,
                                                        marginBottom: 5,
                                                    }}
                                                >
                                                    Attachments/Proofs (If any)
                                                </label>

                                                <div className="row ms-1 me-1">

                                                    <div className="col-md-12" style={{
                                                        border: "1px dashed #D9D9D9",
                                                        padding: 20,
                                                        borderRadius: 10,
                                                        textAlign: "center",
                                                        backgroundColor: "#FAFAFA",
                                                    }}>
                                                        <div className="row">

                                                            <div className="col-md-6 d-flex align-items-center justify-content-center">
                                                                {uploadFile ? (
                                                                    uploadFile.type.startsWith("image/") ? (
                                                                        <img
                                                                            src={URL.createObjectURL(uploadFile)}
                                                                            alt="Preview"
                                                                            style={{
                                                                                width: "100%",
                                                                                maxWidth: "200px",
                                                                                height: "auto",
                                                                                borderRadius: 8,
                                                                            }}
                                                                        />
                                                                    ) : (
                                                                        <div
                                                                            style={{
                                                                                fontSize: 14,
                                                                                fontFamily: "Gilroy",
                                                                                color: "#333",
                                                                                fontWeight: 500,
                                                                                gap: 4,
                                                                            }}
                                                                        >
                                                                            <DocumentDownload size="24" color="#1E45E1" /> {uploadFile.name}
                                                                        </div>
                                                                    )
                                                                ) : (
                                                                    <div
                                                                        className="text-center"
                                                                        style={{
                                                                            backgroundColor: "#1E45E10D",
                                                                            borderRadius: 6,
                                                                            display: "flex",
                                                                            alignItems: "center",
                                                                            justifyContent: "center",
                                                                        }}
                                                                    >
                                                                        <div>
                                                                            <div
                                                                                style={{
                                                                                    backgroundColor: "#EAF0FF",
                                                                                    borderRadius: "50%",
                                                                                    padding: 10,
                                                                                    display: "flex",
                                                                                    alignItems: "center",
                                                                                    justifyContent: "center",
                                                                                    margin: "0 auto",
                                                                                }}
                                                                            >
                                                                                <DocumentDownload size="24" color="#1E45E1" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </div>


                                                            <div className="col-md-6 d-flex align-items-center justify-content-center" >
                                                                <div >
                                                                    <label
                                                                        htmlFor="upload"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            fontFamily: "Gilroy",
                                                                            color: "#1E45E1",
                                                                            fontWeight: 600,
                                                                        }}
                                                                    >
                                                                        Choose file
                                                                    </label>{" "}  <span style={{ color: "#16151C", fontFamily: "Gilroy", }}>to Upload</span>

                                                                    <div style={{ fontSize: 12, color: "#A0A0A0", fontFamily: "Gilroy" }}>
                                                                        <span style={{ fontWeight: 500 }}>JPG PNG PDF Format</span> <span style={{ fontWeight: 300 }}>(600px*300px)</span>
                                                                    </div>
                                                                    <input type="file" id="upload" hidden onChange={handleFileChange} />
                                                                </div>
                                                            </div>
                                                        </div>


                                                    </div>



                                                </div>
                                            </div>
                                        )}


                                    </div>
                                </>
                            }

                        </div>



                    </div>


                </Modal.Body>

                {state.createAccount?.networkError ?
                    <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                        <MdError style={{ color: "red", marginRight: '5px', fontSize: 14 }} />
                        <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                    </div>
                    : null}

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
                    </div>}
                <Modal.Footer
                    className="d-flex align-items-center justify-content-center"
                    style={{ border: "none" }}
                >

                    <Button
                        className="mt-0"
                        disabled={!checked && ReturnAmount < 0}
                        style={{
                            borderRadius: "8px",
                            fontFamily: "Gilroy",
                            fontWeight: "600",
                            fontSize: "14px",
                            padding: "16px 24px",
                            width: "100%",
                            backgroundColor: "#1E45E1",
                        }}
                        onClick={handleConfirmCheckout}
                    >


                        Confirm Check-Out

                    </Button>

                </Modal.Footer>

            </Modal.Dialog>

        </Modal></div>
    )
}
DueCustomerConfirmCheckout.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
    dueAmountDetails: PropTypes.func.isRequired,


};
export default DueCustomerConfirmCheckout
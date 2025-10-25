/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { CloseCircle } from "iconsax-react";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import { Trash } from 'iconsax-react';
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import arrowTot from "../../Assets/Images/New_images/direction-down 01.png";

import { Tooltip } from "bootstrap";
import ErrorMessage from '../../Components/ErrorMessage'


function FinalSettlement({ show, handleClose, data, customerID }) {
    console.log("data",data)


    const state = useSelector((state) => state);
    const dispatch = useDispatch();


    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState([]);

    const [ReturnAmount, setReturnAmount] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [finalSettlementList, setFinalSettlementList] = useState([])


    console.log("STATE", state)



    useEffect(() => {
        if (data?.customerId) {
            dispatch({ type: "GETFINALSETTLEMENT", payload: data?.customerId });
            setFormLoading(true)
        }
    }, [data])


    useEffect(() => {
        if (state.InvoiceList.finalSettlementGetStatusCode === 200) {
            setFormLoading(false)
            setFinalSettlementList(state.InvoiceList.finalSettlementDetails)
            setTimeout(() => {
                dispatch({ type: "REMOVE_GET_FINAL_SETTLEMENT" });
            }, [])
        }
    }, [state.InvoiceList.finalSettlementGetStatusCode])



    useEffect(() => {
        if (state.UsersList.StatusCodeForDateUpdate === 200) {
            dispatch({ type: "CLEAR_CHEKOUT_DATE_CHANGE" })
        }
    }, [state.UsersList.StatusCodeForDateUpdate])
    useEffect(() => {
            if (state.UsersList?.finalError) {
                 setFormLoading(false)
            }
    
        }, [state.UsersList?.finalError])



    const reasonOptions = [
        { value: "DueAmount", label: "Due Amount" },
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
        const fieldData = updatedFields[index] || {};

        if (field === "reason_name") {
            fieldData.reason = value;
            fieldData.reason_name = value;
            fieldData.showInput = value === "others";
            if (value !== "others") fieldData.customReason = "";
            if (updatedErrors[index]) {
                updatedErrors[index].reason = "";
            }
        }

        if (field === "customReason") {
            fieldData.customReason = value;
            if (updatedErrors[index]) {
                updatedErrors[index].reason = "";
            }
        }
        if (field === "amount") {

            if (/^\d*$/.test(value)) {
                fieldData.amount = value;
                if (updatedErrors[index]) {
                    updatedErrors[index].amount = "";
                }
            }
        }

        updatedFields[index] = fieldData;
        setFields(updatedFields);
        setErrors(updatedErrors);
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);

        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    };

    useEffect(() => {
        if (state.UsersList.conformChekoutError) {
            setFormLoading(false)

        }
    }, [state.UsersList.conformChekoutError])
    const quillRef = useRef(null);

    useEffect(() => {
        return () => {
            if (quillRef.current) {
                const editor = quillRef.current.getEditor?.();
                if (editor) {
                    editor.off("selection-change");
                    editor.off("text-change");
                }
            }
        };
    }, []);


    const handleClickInvoiceNo = () => {
        console.log("INV654 clicked");
    };




    useEffect(() => {
        if (state.UsersList.statusCodeForDueCustomer === 200 || state.UsersList.statusCodeAddConfirmCheckout === 200) {
            setFormLoading(false)
            handleClose()
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            })
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


    useEffect(() => {

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
        [...tooltipTriggerList].forEach(
            (tooltipTriggerEl) =>
                new Tooltip(tooltipTriggerEl, {
                    customClass: "white-tooltip",
                })
        );
    }, []);
    useEffect(() => {

        const style = document.createElement("style");
        style.innerHTML = `
    .white-tooltip .tooltip-inner {
      background-color: white !important;
      color: black !important;
      border: 1px solid #ddd;
      font-size: 0.8rem;
    }
    .white-tooltip .tooltip-arrow::before {
      border-top-color: white !important;
    }
  `;
        document.head.appendChild(style);
    }, []);


    useEffect(() => {
        if (finalSettlementList?.settlementInfo) {
            const { isRefundable, amountTobePaid } = finalSettlementList.settlementInfo;

            const allDeductions = fields || [];
            const totalDeductions = allDeductions.reduce(
                (sum, item) => sum + (Number(item.amount) || 0),
                0
            );

            let finalAmount = 0;

            if (amountTobePaid < 0) {
                finalAmount = isRefundable
                    ? amountTobePaid + totalDeductions
                    : amountTobePaid - totalDeductions;
            } else {

                finalAmount = isRefundable
                    ? amountTobePaid - totalDeductions
                    : amountTobePaid + totalDeductions;
            }

            setReturnAmount(finalAmount);
        }
    }, [finalSettlementList?.settlementInfo, fields]);






    useEffect(() => {
        if (finalSettlementList?.customerInfo?.listDeductions?.length > 0) {
            const mappedFields = finalSettlementList.customerInfo.listDeductions.map(item => ({
                reason_name: item.type || "Deduction",
                amount: item.amount || "",
                showInput: item.type === "others" ? true : false,
                customReason: item.type === "others" ? item.type : "",
                isSystemGenerated: item.type === "DueAmount",
            }));
            setFields(mappedFields);
        }
    }, [finalSettlementList]);


    const apiDeductions = finalSettlementList?.customerInfo?.listDeductions || [];
    const totalApiDeductions = apiDeductions.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
    );

    const totalUserDeductions = fields?.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
    );
console.log("fields",fields)
    const totalDeductions = totalApiDeductions + totalUserDeductions;

const handleClickGenerate = ()=>{
 const Finalsettelmenntdata = fields
  .filter(f => f.reason_name && f.amount)
  .map(f => ({ item: f.reason_name, amount: Number(f.amount) }))

    if(data.customerId || data.currentTenantCustomerId){
 dispatch({
                type: "FINALSETTLEMENT",
                payload: { customerId:data.customerId || data.currentTenantCustomerId,
                    data : Finalsettelmenntdata
 
                 },
            })
    }
    
}
useEffect(()=>{
    if(state.UsersList.statusCodeForFinalSettlement === 201){
         setFormLoading(false)
            handleClose()
         dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            })
            setTimeout(() => {
                dispatch({ type: "CLEAR_FINAL_GENERATE" });
            }, 500);

    }
},[state.UsersList.statusCodeForFinalSettlement])


    return (
        <div>
            <Modal show={show} onHide={handleClose} dialogClassName="checkout-modal" size="lg" centered backdrop="static">
                <Modal.Body className="p-0">
                    <div className="d-flex" style={{ height: "90vh" }}>

                        <div className="p-4 border-end rounded" style={{ flex: "0 0 35%", background: "#f9f9f9" }}>
                            <div className="d-flex align-items-center">

                                <img
                                    src={
                                        finalSettlementList?.customerInfo?.profilePic &&
                                            finalSettlementList?.customerInfo?.profilePic !== "0"
                                            ? finalSettlementList.customerInfo.profilePic
                                            : Profile2
                                    }

                                    style={{ height: 55, width: 55, cursor: "pointer" }}
                                    alt="profile"
                                    className="rounded-circle me-3"
                                />

                                <div>
                                    <p style={{ fontSize: "1.25rem", fontFamily: "Gilroy", fontWeight: 600 }} className="mb-0">{finalSettlementList?.customerInfo?.fullName}</p>
                                    <div className="d-flex mb-2">

                                        <span
                                            className="badge rounded-pill text-dark me-2"
                                            style={{
                                                fontSize: "0.75rem",
                                                fontFamily: "Gilroy",
                                                fontWeight: 400,
                                                backgroundColor: "#FFEFCF"
                                            }}
                                        >
                                            {data?.floorName}
                                        </span>
                                        <span className="badge rounded-pill bg-danger-subtle text-dark" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>

                                            {data?.roomName} - {data?.bedName}
                                        </span>
                                    </div>


                                </div>


                            </div>



                            <hr />

                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Joined Date</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>

                                    {finalSettlementList?.customerInfo?.joiningDate}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Req Checkout Date</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>
                                    {finalSettlementList?.stayInfo?.noticeDate}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Total Advance Amount</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>
                                    ₹{finalSettlementList?.customerInfo?.advanceAmount}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Monthly Rent</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>₹  {finalSettlementList?.customerInfo?.rentAmount}

                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Checkout Date</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}> {finalSettlementList?.stayInfo?.checkoutDate}

                                </span>
                            </div>
                            <div className="mt-2" style={{ textAlign: "center", backgroundColor: "#FFF7F7" }}>
                                {ReturnAmount < 0 && <span style={{ color: "red", fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400, textAlign: "center" }}>Pending</span>}
                            </div>

                        </div>


                        <div className="container-fluid p-2 overflow-auto">

                            <div
                                className="d-flex justify-content-between align-items-center"
                                style={{
                                    position: "sticky",
                                    top: 0,
                                    backgroundColor: "#fff",
                                    zIndex: 1050,
                                    padding: "10px 15px",

                                }}
                            >
                                <p className="mb-0" style={{ fontSize: "1.5rem", fontFamily: "Gilroy", fontWeight: 600 }}>Final Settlement</p>
                                <CloseCircle
                                    size="24"
                                    color="#000"
                                    onClick={handleClose}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                            <div style={{ maxHeight: "70vh", overflowY: "auto", padding: "10px" }}>


                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group className="mt-4">
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
                                                Current Reading
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
                                                Last Reading:
                                                <span style={{ color: '#1E45E1' }}>
                                                    {/* {state.UsersList?.finalsettleLastrent?.LastReading} */}
                                                </span>
                                            </span>
                                        </div>


                                        <InputGroup style={{ marginTop: 10 }}>
                                            <Form.Control
                                                type="number"
                                                placeholder="471.55"
                                                style={{ fontSize: 14, fontWeight: 600, padding: "12px 14px" }}
                                            />
                                            <InputGroup.Text

                                            >
                                                <Form.Check
                                                    type="checkbox"
                                                    id="confirmReading"
                                                    style={{ margin: 0 }}
                                                >
                                                    <Form.Check.Input
                                                        type="checkbox"

                                                        style={{
                                                        }}
                                                    />
                                                </Form.Check>

                                            </InputGroup.Text>
                                        </InputGroup>


                                    </Form.Group>
                                </div>





                                <div className="p-3  rounded mt-3" style={{ backgroundColor: "#E7F1FF", borderRadius: 10 }}>


                                    <div className="d-flex justify-content-between align-items-center p-2">
                                        <div>
                                            <p style={{ fontFamily: "Gilroy", fontWeight: 600, fontSize: "1rem" }}>Deductions</p>
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
                                        const filteredOptions = (() => {
                                            let options = [...reasonOptions];


                                            if (item.reason_name && !options.some(opt => opt.value === item.reason_name)) {
                                                options.push({
                                                    value: item.reason_name,
                                                    label: item.reason_name.charAt(0).toUpperCase() + item.reason_name.slice(1)
                                                });
                                            }


                                            const isMaintenanceSelected = fields.some(field => field.reason === "maintenance");
                                            return options.map(opt => ({
                                                ...opt,
                                                isDisabled: opt.value === "maintenance" && isMaintenanceSelected && item.reason !== "maintenance"
                                            }));
                                        })();


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
                                                                    handleInputChange(index, "reason_name", "others");
                                                                } else {
                                                                    handleInputChange(index, "reason_name", selectedValue);
                                                                }
                                                            }}
                                                            isDisabled={item.reason_name === "maintenance" || item?.reason_name === "DueAmount"}
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

                                                    {(!item.isSystemGenerated || item.reason_name !== "DueAmount") && (
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

                                <div className="mt-2 mb-2">

                                    <div className="mb-2">
                                        <div >
                                            <p style={{
                                                fontSize: 14,
                                                color: "black",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}>Invoices Pending</p>
                                            <div className="table-responsive border border-gray rounded p-2">
                                                <table className="table table-sm align-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th className="pb-2" style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}>Invoice No</th>
                                                            <th className="pb-2" style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}>Type</th>
                                                            <th className="pb-2 text-end" style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }} >Invoice Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {Array.isArray(finalSettlementList?.unpaidInvoices) && finalSettlementList?.unpaidInvoices.map((user) => (
                                                            <tr key={user.invoiceid}>
                                                                <td
                                                                    className="fw-normal text-decoration-underline text-primary mt-4"
                                                                    onClick={handleClickInvoiceNo}
                                                                    style={{
                                                                        fontFamily: "Gilroy",
                                                                        fontSize: "14px",
                                                                        paddingTop: "1rem"
                                                                    }}
                                                                >
                                                                    {user.invoiceNumber}
                                                                </td>
                                                                <td
                                                                    className="fw-normal"
                                                                    style={{
                                                                        fontFamily: "Gilroy",
                                                                        fontSize: "14px",
                                                                        color: "black",
                                                                        paddingTop: "1rem"
                                                                    }}
                                                                >
                                                                    {user.type}
                                                                </td>
                                                                <td
                                                                    className="text-end"
                                                                    style={{
                                                                        fontFamily: "Gilroy",
                                                                        fontSize: "14px",
                                                                        color: "black",
                                                                        fontWeight: 500,
                                                                        paddingTop: "1rem"
                                                                    }}
                                                                >
                                                                    ₹{user.payableAmount}
                                                                </td>
                                                            </tr>
                                                        ))}


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Refundable Rent */}
                                    <div className="mt-3">
                                        <div>
                                            <p
                                                style={{
                                                    fontSize: 14,
                                                    color: "black",
                                                    fontFamily: "Gilroy",
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Refundable Rent
                                            </p>

                                            <div className="table-responsive border border-gray rounded p-2 shadow-sm">
                                                <table className="table table-sm align-middle mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    fontSize: 14,
                                                                    color: "black",
                                                                    fontFamily: "Gilroy",
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                Description
                                                            </th>
                                                            <th
                                                                className="text-end"
                                                                style={{
                                                                    fontSize: 14,
                                                                    color: "black",
                                                                    fontFamily: "Gilroy",
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                Amount
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>
                                                       <tr>
                                                            <td
                                                                className="fw-normal"
                                                                style={{
                                                                    fontFamily: "Gilroy",
                                                                    fontSize: "14px",
                                                                    color: "black",
                                                                    paddingTop: "1rem",
                                                                }}
                                                            >
                                                                Last Rent Paid (30 Days)
                                                            </td>
                                                            <td
                                                                className="text-end"
                                                                style={{
                                                                    fontFamily: "Gilroy",
                                                                    fontSize: "14px",
                                                                    color: "black",
                                                                }}
                                                            >
                                                                ₹{finalSettlementList?.currentMonthRentInfo?.currentRentPaid || 0}
                                                            </td>
                                                        </tr>

                                                        {/* Actual Stay Days */}
                                                        <tr>
                                                            <td
                                                                className="fw-normal"
                                                                style={{
                                                                    fontFamily: "Gilroy",
                                                                    fontSize: "14px",
                                                                    color: "black",
                                                                    paddingTop: "1rem",
                                                                }}
                                                            >
                                                                Actual Stay Days (
                                                                {finalSettlementList?.currentMonthRentInfo?.stayDays} days × ₹
                                                                {(
                                                                    (finalSettlementList?.currentMonthRentInfo?.currentMonthRent || 0) / 30
                                                                ).toFixed(0)}
                                                                )
                                                            </td>
                                                            <td
                                                                className="text-end"
                                                                style={{
                                                                    fontFamily: "Gilroy",
                                                                    fontSize: "14px",
                                                                    color: "black",
                                                                }}
                                                            >
                                                                ₹ {finalSettlementList?.currentMonthRentInfo?.currentPayableRent}

                                                            </td>
                                                        </tr>



                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Total Refund</p>
                                    <span
                                        style={{ color: "blue", cursor: "pointer", fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400, marginTop: "-18px" }}
                                        onClick={() => setShowBreakdown(!showBreakdown)}
                                    >

                                        View Breakdown <img
                                            src={arrowTot}
                                            alt="arrow"
                                            style={{
                                                transition: "transform 0.3s ease",
                                                transform: showBreakdown ? "rotate(180deg)" : "rotate(0deg)",
                                            }}
                                        />
                                    </span>
                                </div>


                                {showBreakdown && (
                                    <div className="p-3 rounded mb-3">
                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 600 }}>
                                                Final Settlement
                                            </p>
                                            {/* <p style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 600 }}>
                                                ₹{" "}
                                                {finalSettlementList?.settlementInfo?.amountTobePaid?.toLocaleString("en-IN", {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </p> */}
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                                Total Deductions
                                            </p>
                                            <p
                                                style={{
                                                    fontFamily: "Gilroy",
                                                    fontSize: "0.875rem",
                                                    fontWeight: 400,
                                                    color: "red",
                                                }}
                                            >
                                                - ₹{" "}
                                                {totalDeductions}
                                            </p>
                                        </div>

                                        <div className="d-flex justify-content-between">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                                Refundable Rent
                                            </p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                                ₹{" "}
                                                {finalSettlementList?.settlementInfo?.payableRent}
                                            </p>
                                        </div>

                                        {/* {finalSettlementList?.settlementInfo?.isRefundable && ( */}
                                        <div className="d-flex justify-content-between mb-1">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                                Refundable Advance
                                            </p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                                ₹{" "}
                                                {finalSettlementList?.customerInfo?.advancePaidAmount}
                                            </p>
                                        </div>
                                        {/* )} */}
                                    </div>

                                )}

                                <div className="col-lg-12 col-md-12 col-sm-12 colxs-12 ">


                                    <input
                                        type="text"
                                        name="Advance"
                                        id="Advance"
                                        value={ReturnAmount}
                                        className="form-control mt-1"
                                        placeholder="Add Advance Amount"
                                        required
                                        style={{
                                            height: "50px",
                                            borderRadius: "8px",
                                            fontSize: 16,
                                            color: ReturnAmount > 0 ? "green" : "red",
                                            fontFamily: "Gilroy",
                                            fontWeight: 600,
                                            boxShadow: "none",
                                            border: "1px solid #D9D9D9",
                                        }}
                                    />
                                </div>

{state.UsersList?.finalError && (
                    <ErrorMessage message={state.UsersList?.finalError} type="error" />
                )}

                                <div className="text-end mt-4">
                                    <Button variant="" className="me-2" onClick={handleClose} style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        // disabled={activeTab !== "writeoff" && ReturnAmount < 0}
                                        style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400, backgroundColor: "#1E45E1" }}
                                    onClick={handleClickGenerate}
                                    >Generate</Button>
                                </div>
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
                    </div>}


            </Modal>
        </div>
    )
}
FinalSettlement.propTypes = {
    show: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
    customerID: PropTypes.func.isRequired,
};
export default FinalSettlement;
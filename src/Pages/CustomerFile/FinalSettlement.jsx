/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { CloseCircle, ArrowDown2, ArrowUp2 } from "iconsax-react";
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import { Trash } from 'iconsax-react';
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
import arrowTot from "../../Assets/Images/New_images/direction-down 01.png";
import { Tooltip } from "bootstrap";
import ErrorMessage from '../../Components/ErrorMessage'
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Edit2 } from "iconsax-react";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
function FinalSettlement({ show, handleClose, data, pgDetails }) {



    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const datePickerRef = useRef(null);
    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState([]);

    const [ReturnAmount, setReturnAmount] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [finalSettlementList, setFinalSettlementList] = useState()

    const [showDetails, setShowDetails] = useState(false);


    const [isEditingDate, setIsEditingDate] = useState(false);
    const [checkoutDate, setCheckoutDate] = useState(dayjs())




    useEffect(() => {
        if (!data?.customerId && !data?.tenetId) return;

        const payload = {
            customerId: data?.customerId || data?.tenetId,
        };

        if (checkoutDate) {
            payload.leavingDate = checkoutDate?.format("DD-MM-YYYY");
        }

        dispatch({ type: "GETFINALSETTLEMENT", payload });
        setFormLoading(true);
    }, [data, checkoutDate]);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isEditingDate &&
                datePickerRef.current &&
                !datePickerRef.current.contains(event.target)
            ) {
                setIsEditingDate(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isEditingDate]);



    //     useEffect(() => {
    //   if (data?.customerId || data?.tenetId) {
    //     dispatch({
    //       type: "GETFINALSETTLEMENT",
    //       payload: {
    //         customerId: data?.customerId || data?.tenetId,
    //       },
    //     });
    //     setFormLoading(true);
    //   }
    // }, [data]);



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

            let numericValue = value.replace(/[^0-9]/g, "");

            if (numericValue.startsWith("0")) {
                numericValue = numericValue.replace(/^0+/, "");
            }


            if (numericValue === "") {
                numericValue = "";
            }

            updatedFields[index].amount = numericValue;

            if (updatedErrors[index]) updatedErrors[index].amount = "";
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

            const apiDeductions = finalSettlementList?.customerInfo?.listDeductions || [];
            const apiMap = new Map(
                apiDeductions.map(item => [item.type?.toLowerCase(), Number(item.amount) || 0])
            );

            // const totalApiDeductions = apiDeductions.reduce(
            //     (sum, item) => sum + (Number(item.amount) || 0),
            //     0
            // );

            const totalUserDeductions = (fields || []).reduce((sum, item) => {
                const reasonName = item.reason_name?.toLowerCase();
                const userAmount = Number(item.amount) || 0;
                const apiAmount = apiMap.get(reasonName);


                if (item.isSystemGenerated) return sum;


                if (item.customReason && item.customReason.trim() !== "") {
                    return sum + userAmount;
                }


                if (apiAmount !== undefined) {
                    return sum + userAmount;
                }


                return sum + userAmount;
            }, 0);

            // const totalDeductions = totalApiDeductions + totalUserDeductions;


            let finalAmount = 0;
            if (amountTobePaid < 0) {
                finalAmount = isRefundable
                    ? amountTobePaid + totalUserDeductions
                    : amountTobePaid - totalUserDeductions;
            } else {
                finalAmount = isRefundable
                    ? amountTobePaid - totalUserDeductions
                    : amountTobePaid + totalUserDeductions;
            }

            setReturnAmount(finalAmount);
        }
    }, [finalSettlementList, fields]);



    const apiDeductions = finalSettlementList?.customerInfo?.listDeductions || [];
    const totalApiDeductions = apiDeductions.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
    );





    useEffect(() => {
        if (finalSettlementList?.customerInfo?.listDeductions?.length > 0) {
            const mappedFields = finalSettlementList.customerInfo.listDeductions.map(item => ({
                reason_name: item.type,
                amount: item.amount || "",
                showInput: true,
                customReason: item.type,
                isSystemGenerated: true,
            }));
            setFields(mappedFields);
        }
    }, [finalSettlementList]);


    const apiMap = new Map(
        apiDeductions.map(item => [item.type?.toLowerCase(), Number(item.amount) || 0])
    );

    const totalUserDeductions = (fields || []).reduce((sum, item) => {
        if (item.isSystemGenerated) return sum;

        const reasonName = item.reason_name?.toLowerCase();
        const userAmount = Number(item.amount) || 0;
        const apiAmount = apiMap.get(reasonName);


        if (apiAmount !== undefined) {
            return sum + userAmount;
        }

        return sum + userAmount;
    }, 0);


    const totalDeductions = totalApiDeductions + totalUserDeductions;








    const handleClickGenerate = () => {
        const apiDeductions = finalSettlementList?.customerInfo?.listDeductions || [];

        const apiMap = new Map(
            apiDeductions.map(item => [item.type?.toLowerCase(), Number(item.amount) || 0])
        );

        const Finalsettelmenntdata = fields
            .filter(f => f.reason_name && f.amount)
            .map(f => {
                const reason = f.reason_name.toLowerCase();
                const userAmount = Number(f.amount) || 0;

                if (f.isSystemGenerated === true) {
                    return null;
                }


                if (f.reason_name.toLowerCase() === "others" && f.customReason?.trim()) {
                    return {
                        item: f.customReason.trim(),
                        amount: userAmount
                    };
                }


                if (!apiMap.has(reason)) {
                    return { item: f.reason_name, amount: userAmount };
                }


                if (f.isSystemGenerated === false) {
                    return { item: f.reason_name, amount: userAmount };
                }

                return null;
            })
            .filter(Boolean);



        if (data?.customerId || data?.tenetId) {
            dispatch({
                type: "FINALSETTLEMENT",
                payload: {
                    customerId: data?.customerId || data?.tenetId,
                    data: Finalsettelmenntdata
                },
            });
            setFormLoading(true);
        }
    };









    useEffect(() => {
        if (state.UsersList.statusCodeForFinalSettlement === 201) {
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
    }, [state.UsersList.statusCodeForFinalSettlement])

    useEffect(() => {
        if (state.InvoiceList.finalSettlementError) {
            setFormLoading(false)
        }
    }, [state.InvoiceList.finalSettlementError])


    return (
        <div>
            <Modal show={show} onHide={handleClose} dialogClassName="checkout-modal" size="lg" centered backdrop="static">
                <Modal.Body className="p-0">
                    <div className="d-flex" style={{ height: "90vh" }}>

                        <div className="p-4 border-end rounded" style={{ flex: "0 0 40%", background: "#f9f9f9" }}>
                            <div className="d-flex align-items-center gap-3">
                                {
                                    finalSettlementList?.customerInfo?.profilePic ?


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
                                        :
                                        <div
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderRadius: "50%",
                                                background: "#1E45E1",
                                                color: "white",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontWeight: "600px",
                                                fontSize: 16, fontFamily: "Gilroy"
                                            }}
                                        >
                                            {finalSettlementList?.customerInfo?.initials}
                                        </div>
                                }
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
                                            {pgDetails?.floorName || data?.floorName}
                                        </span>
                                        <span className="badge rounded-pill bg-danger-subtle text-dark" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>

                                            {pgDetails?.roomName || data?.roomName} - {pgDetails?.bedName || data?.bedName}
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
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Advance Amount</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>
                                    ₹{finalSettlementList?.customerInfo?.advanceAmount}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Booking Amount</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>
                                    ₹{finalSettlementList?.customerInfo?.bookingAmount}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Advance Paid</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>
                                    ₹{finalSettlementList?.customerInfo?.advancePaidAmount}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>Monthly Rent</span>
                                <span style={{ fontSize: "1rem", fontFamily: "Gilroy", fontWeight: 600 }}>₹  {finalSettlementList?.customerInfo?.rentAmount}

                                </span>
                            </div>
                            <div className="d-flex justify-content-between mb-3 align-items-center">
                                <span style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>
                                    Actual Checkout Date
                                </span>

                                {!isEditingDate ? (
                                    <span
                                        style={{
                                            fontSize: "1rem",
                                            fontFamily: "Gilroy",
                                            fontWeight: 600,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 8,
                                        }}
                                    >
                                        {finalSettlementList?.stayInfo?.actualCheckoutDate
                                            ? finalSettlementList?.stayInfo?.actualCheckoutDate
                                            : checkoutDate?.format("DD/MM/YYYY")}

                                        <Edit2
                                            size={16}
                                            color="#555"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => setIsEditingDate(true)}
                                        />
                                    </span>
                                ) : null}
                            </div>
                            {isEditingDate && (
                                <div ref={datePickerRef}
                                    className="datepicker-wrapper"
                                    style={{ position: "relative", width: "100%", marginTop: 1 }}
                                >
                                    <DatePicker
                                        value={checkoutDate}
                                        allowClear={false}
                                        style={{
                                            width: "100%",
                                            height: 48,
                                            cursor: "pointer",
                                            fontFamily: "Gilroy",
                                        }}
                                        format="DD/MM/YYYY"
                                        placeholder="DD/MM/YYYY"
                                        disabledDate={(current) =>
                                            current && current > dayjs().endOf("day")
                                        }
                                        onChange={(date) => {
                                            setCheckoutDate(date);
                                            setIsEditingDate(false);
                                        }}
                                        getPopupContainer={(triggerNode) =>
                                            triggerNode.closest(".datepicker-wrapper")
                                        }
                                    />
                                </div>
                            )}

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
                                                                    backgroundColor: state.isFocused
                                                                        ? "#E7F1FF"
                                                                        : state.isDisabled
                                                                            ? "#f0f0f0"
                                                                            : "#fff",
                                                                    color: state.isDisabled ? "#aaa" : "#000",
                                                                }),
                                                            }}
                                                        />
                                                    ) : (
                                                        <>
                                                            <input disabled={item.isSystemGenerated}
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
                                                        disabled={
                                                            apiDeductions.some(
                                                                (apiItem) => apiItem.type?.toLowerCase() === item.reason_name?.toLowerCase()
                                                            ) && item.isSystemGenerated}
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

                                                    {(!item.isSystemGenerated) && (
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
                                    {
                                        finalSettlementList?.unpaidInvoices.length > 0 &&

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
                                    }


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


                                            <div className="card shadow-sm rounded">
                                                <div className="card-body p-3">


                                                    <div className="d-flex justify-content-between mb-2">
                                                        <span
                                                            style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            Description
                                                        </span>

                                                        <span
                                                            style={{
                                                                fontSize: 14,
                                                                color: "black",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            Amount
                                                        </span>
                                                    </div>
                                                    <hr />


                                                    <div className="d-flex justify-content-between py-2">
                                                        <span
                                                            style={{
                                                                fontFamily: "Gilroy",
                                                                fontSize: 14,
                                                                color: "black",
                                                            }}
                                                        >
                                                            Last Rent Paid (30 Days)
                                                        </span>

                                                        <span
                                                            style={{
                                                                fontFamily: "Gilroy",
                                                                fontSize: 14,
                                                                color: "black",
                                                            }}
                                                        >
                                                            ₹{finalSettlementList?.currentMonthRentInfo?.currentRentPaid || 0}
                                                        </span>
                                                    </div>

                                                    <div className="d-flex justify-content-between gap-2 py-2 align-items-start">


                                                        <div
                                                            style={{
                                                                fontFamily: "Gilroy",
                                                                fontSize: 14,
                                                                color: "black",
                                                                cursor: "pointer",
                                                                userSelect: "none"
                                                            }}
                                                            onClick={() => setShowDetails(!showDetails)}
                                                        >
                                                            Actual Stay Days (
                                                            {(() => {
                                                                const d = finalSettlementList?.currentMonthRentInfo?.stayDays ?? 0;
                                                                return `${d} ${d === 1 ? "day" : "days"}`;
                                                            })()}

                                                            {/* × ₹
                                                            {Number(finalSettlementList?.currentMonthRentInfo?.rentPerDay || 0)} */}
                                                            )


                                                            <span style={{ marginLeft: 6 }} >
                                                                {showDetails ? (
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: "#E7F1FF",
                                                                            borderRadius: 5,
                                                                            padding: 4,


                                                                        }}
                                                                    >
                                                                        <ArrowUp2 size="16" color="#1E45E1" />
                                                                    </span>
                                                                ) : (
                                                                    <span
                                                                        style={{
                                                                            backgroundColor: "#E7F1FF",
                                                                            borderRadius: 5,
                                                                            padding: 4,

                                                                        }}
                                                                    >
                                                                        <ArrowDown2 size="16" color="#1E45E1" />
                                                                    </span>
                                                                )}
                                                            </span>
                                                            {showDetails &&
                                                                finalSettlementList?.currentMonthRentInfo?.rentLists?.map((item, index) => (
                                                                    <div key={index} className="px-1 mt-2 col-md-12">

                                                                        <div style={{ backgroundColor: "" }}
                                                                            className="row py-1"

                                                                        >


                                                                            <div className="col-3 d-flex text-start" style={{
                                                                                fontFamily: "Gilroy",
                                                                                fontSize: 10,
                                                                                color: "#1E45E1",
                                                                            }}>
                                                                                {item.floorName}
                                                                            </div>


                                                                            <div className="col-3 text-start d-flex " style={{
                                                                                fontFamily: "Gilroy",
                                                                                fontSize: 10,
                                                                                color: "#1E45E1",
                                                                            }}>
                                                                                {item.roomName} - {item.bedName}
                                                                            </div>

                                                                            <div className="col-6 text-start " style={{ whiteSpace: "nowrap" }}>
                                                                                ({item.noOfDays} {item.noOfDays === 1 ? "day" : "days"} = {item.rent})

                                                                            </div>

                                                                        </div>

                                                                    </div>
                                                                ))
                                                            }


                                                        </div>


                                                        <div
                                                            style={{
                                                                fontFamily: "Gilroy",
                                                                fontSize: 14,
                                                                color: "black",
                                                            }}
                                                        >
                                                            ₹{finalSettlementList?.currentMonthRentInfo?.currentPayableRent}
                                                        </div>
                                                    </div>





                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                </div>

                                <div className="d-flex justify-content-between align-items-center mt-3">
                                    <p style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>{ReturnAmount > 0 ? "Outstanding Amount Payable" : "Refund Payable to Tenant"}</p>
                                    <span
                                        style={{ color: "#1E45E1", cursor: "pointer", fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400, marginTop: "-18px" }}
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
                                                {finalSettlementList?.settlementInfo?.refundableRent}
                                            </p>
                                        </div>


                                        <div className="d-flex justify-content-between mb-1">
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                                Refundable Advance
                                            </p>
                                            <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                                ₹{" "}
                                                {finalSettlementList?.settlementInfo?.refundableAvance}
                                            </p>
                                        </div>

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
                                        disabled={formLoading}
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
    customerID: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    pgDetails: PropTypes.shape({
        floorName: PropTypes.string,
        roomName: PropTypes.string,
        bedName: PropTypes.string,
    }).isRequired,
}
export default FinalSettlement;
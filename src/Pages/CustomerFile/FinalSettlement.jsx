/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, } from "react-bootstrap";
import "flatpickr/dist/flatpickr.css";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types";
import { ArrowDown2, ArrowUp2, ArrowLeft } from "iconsax-react";
// import addcircle from "../../Assets/Images/New_images/add-circle.png";
import { Trash } from 'iconsax-react';
import Profile2 from "../../Assets/Images/New_images/profile-picture.png";
// import arrowTot from "../../Assets/Images/New_images/direction-down 01.png";
import { Tooltip } from "bootstrap";
import ErrorMessage from '../../Components/ErrorMessage'
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { Edit, AddCircle, Verify } from "iconsax-react";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation, useNavigate } from "react-router-dom";
import AddRoomReading from "../ElectrictyFile/AddRoomReading";


dayjs.extend(customParseFormat);
function FinalSettlement() {

    const location = useLocation();
    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const datePickerRef = useRef(null);
    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState([]);

    const [ReturnAmount, setReturnAmount] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const [showBreakdown, setShowBreakdown] = useState(false);
    const [finalSettlementList, setFinalSettlementList] = useState()
    const [showWallet, setShowWallet] = useState(false);

    const [showDetails, setShowDetails] = useState(false);

    const [showInvoices, setShowInvoices] = React.useState(false);
    const [showRentDetails, setShowRentDetails] = React.useState(false);
    const [showEbMissed, setShowEbMissed] = useState(false);
    const [showOtherCharges, setShowOtherCharges] = useState(false);

    const [showRoomReading, setShowRoomReading] = useState(false);
    const [showDeductions, setShowDeductions] = useState(false);

    const [isEditingDate, setIsEditingDate] = useState(false);
    const [checkoutDate, setCheckoutDate] = useState(dayjs())
    const [selectedRowDetails, setSelectedRowDetails] = useState('')
    const { data, pgDetails, isPGWay } = location.state || {};


    const handleRoomReading = (item) => {
        setShowRoomReading(true)
        setSelectedRowDetails(item)
    }

    const handleCloseRoomReading = () => {
        dispatch({ type: 'REMOVE_ROOM_READING_ERROR' })
        setShowRoomReading(false)
    }

    console.log("data", data)

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
        setShowDeductions(true)
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

            let numericValue = value.replace(/[^0-9.]/g, "");

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

        if (updatedErrors[index]) {
            if (field === "reason_name" || field === "customReason") {
                updatedErrors[index].reason = "";
            }
            if (field === "amount") {
                updatedErrors[index].amount = "";
            }
        }
    };

    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);
        const updatedErrors = [...errors];
        updatedErrors.splice(index, 1);
        setErrors(updatedErrors);
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



    const handleClose = () => {
        if (pgDetails || isPGWay) {
            navigate(`/paying-guest/${state.login.selectedHostel_Id}`)
        } else {
            navigate(`/tenant/${state.login.selectedHostel_Id}`)
        }


    }


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





    const selectedUser = state.UsersList.Users.listCustomers?.find(item => item.customerId === data?.customerId || data?.tenetId);

    const validateFields = () => {
        let isValid = true;
        const newErrors = fields.map((item) => {
            let errorObj = {};


            if (!item.reason_name) {
                errorObj.reason = "Please select a reason";
                isValid = false;
            }


            if (item.reason_name === "others" && !item.customReason?.trim()) {
                errorObj.reason = "Please enter custom reason";
                isValid = false;
            }


            if (!item.amount) {
                errorObj.amount = "Please enter amount";
                isValid = false;
            }

            return errorObj;
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleClickGenerate = () => {
        if (!validateFields()) return;
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
            setTimeout(() => {
                dispatch({ type: 'REMOVE_FINAL_SETTLMENT_ERROR' })
            }, 100)
        }
    }, [state.InvoiceList.finalSettlementError])

    useEffect(() => {
        if (state.UsersList?.addRoomReadingStatusCode === 201 || state.UsersList?.addRoomReadingStatusCode === 200) {
            setShowRoomReading(false)

            if (!data?.customerId && !data?.tenetId) return;
            const payload = {
                customerId: data?.customerId || data?.tenetId,
            };

            if (checkoutDate) {
                payload.leavingDate = checkoutDate?.format("DD-MM-YYYY");
            }

            dispatch({ type: "GETFINALSETTLEMENT", payload });
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ADD_ROOM_READING' })
            }, 100)

        }

    }, [state.UsersList?.addRoomReadingStatusCode])


    const isNonHostel = !finalSettlementList?.ebInfo?.isHostelReading;

    const missedEbList = finalSettlementList?.ebInfo?.missedEb || [];
    const pendingEbList = finalSettlementList?.ebInfo?.pendingEb || [];

    const showNoEbMessage =
        isNonHostel &&
        missedEbList.length === 0 &&
        pendingEbList.length === 0;


const UnpaidInvoices =
  Array.isArray(finalSettlementList?.unpaidInvoiceInfo?.listUnpaidInvoices)
    ? finalSettlementList.unpaidInvoiceInfo?.listUnpaidInvoices
    : Array.isArray(finalSettlementList?.unpaidInvoices)
    ? finalSettlementList.unpaidInvoices
    : [];





    return (
        <div className="h-screen overflow-y-hidden ">


            <div className="mb-3 sticky bg-white z-0 h-[50px] px-3 py-2.5 ">
                <div className="flex items-center gap-3">

                    <ArrowLeft
                        onClick={handleClose}
                        size="26"
                        color="#4A5565"
                        className="cursor-pointer"
                    />

                    <div>
                        <label className="block text-[20px] font-semibold text-[#222222] font-gilroy">
                            Final Settlement
                        </label>
                        <p className="text-sm font-semibold text-[#4A5565] font-gilroy">
                            Tenants / Final Settlement
                        </p>
                    </div>

                </div>
            </div>

            <div className="flex flex-row gap-3 h-[calc(100vh-50px)] bg-[#f9f9f9] p-2.5 w-full flex-nowrap ">

                <div
                    className="flex-[0_0_30%] bg-white rounded-lg p-4  "


                >
                    <div className="flex items-center gap-3 mb-1 font-gilroy">
                        {finalSettlementList?.customerInfo?.profilePic ? (
                            <img
                                src={
                                    finalSettlementList?.customerInfo?.profilePic !== "0"
                                        ? finalSettlementList.customerInfo.profilePic
                                        : Profile2
                                }
                                alt="profile"
                                className="h-[55px] w-[55px] rounded-full cursor-pointer"
                            />
                        ) : (
                            <div className="h-[50px] w-[50px] rounded-full bg-slate-200 text-[#44536A] flex items-center justify-center text-base font-semibold">
                                {finalSettlementList?.customerInfo?.initials}
                            </div>
                        )}

                        <div>
                            <div className="flex items-center gap-2">
                                <label className="text-[20px] font-semibold text-[#222222] mb-0">
                                    {finalSettlementList?.customerInfo?.fullName}
                                </label>

                                <Verify size="20" color="#1E45E1" variant="Bold" />
                            </div>

                            <label className="text-sm font-normal text-[#4B4B4B]">
                                Mobile : +{finalSettlementList?.customerInfo?.countryCode}{" "}
                                {finalSettlementList?.customerInfo?.mobile}
                            </label>
                        </div>
                    </div>


                    <div className="flex justify-between mb-2 w-full gap-2 font-gilroy">
                        <span className="w-full rounded-full bg-[#FFEFCF] p-2 text-xs font-normal text-gray-900 text-center">
                            {pgDetails?.floorName || data?.floorName || data?.hostelInfo?.floorName || selectedUser?.floorName}
                        </span>

                        <span className="w-full rounded-full bg-red-100 p-2 text-xs font-normal text-gray-900 text-center">
                            {pgDetails?.roomName || data?.roomName || data?.hostelInfo?.roomName || selectedUser?.roomName} - {pgDetails?.bedName || data?.bedName || data?.hostelInfo?.bedName || selectedUser?.bedName}
                        </span>
                    </div>


                    <hr className="border-t border-[#DFDFDF] my-2" />


                    <div className="flex justify-between mb-3 font-gilroy">
                        <span className="text-sm font-normal text-gray-700">
                            Joined Date
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            {finalSettlementList?.customerInfo?.joiningDate}
                        </span>
                    </div>

                    <div className="flex justify-between mb-3 font-gilroy">
                        <span className="text-sm font-normal text-gray-700">
                            Req Checkout Date
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            {finalSettlementList?.stayInfo?.noticeDate}
                        </span>
                    </div>

                    <div className="flex justify-between mb-3 font-gilroy">
                        <span className="text-sm font-normal text-gray-700">
                            Advance Amount
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            ₹{finalSettlementList?.customerInfo?.advanceAmount}
                        </span>
                    </div>

                    <div className="flex justify-between mb-3 font-gilroy">
                        <span className="text-sm font-normal text-gray-700">
                            Booking Amount
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            ₹{finalSettlementList?.customerInfo?.bookingAmount}
                        </span>
                    </div>

                    <div className="flex justify-between mb-3 font-gilroy">
                        <span className="text-sm font-normal text-gray-700">
                            Advance Paid
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            ₹{finalSettlementList?.customerInfo?.advancePaidAmount}
                        </span>
                    </div>

                    <div className="flex justify-between mb-3 font-gilroy">
                        <span className="text-sm font-normal text-gray-700">
                            Monthly Rent
                        </span>
                        <span className="text-base font-semibold text-gray-900">
                            ₹ {finalSettlementList?.customerInfo?.rentAmount}
                        </span>
                    </div>





                    <div className="flex justify-between items-center mb-3 font-gilroy">
                        <span className="text-sm font-normal">
                            Actual Checkout Date
                        </span>

                        {!isEditingDate && (
                            <span className="flex items-center gap-2 text-base font-semibold">
                                {finalSettlementList?.stayInfo?.actualCheckoutDate
                                    ? finalSettlementList?.stayInfo?.actualCheckoutDate
                                    : checkoutDate?.format("DD/MM/YYYY")}

                                <Edit
                                    size={16}
                                    color="#1E45E1"
                                    className="cursor-pointer"
                                    onClick={() => setIsEditingDate(true)}
                                />
                            </span>
                        )}
                    </div>

                    {isEditingDate && (
                        <div
                            ref={datePickerRef}
                            className="relative w-full mt-1"
                        >
                            <DatePicker
                                value={checkoutDate}
                                allowClear={false}
                                className="w-full h-12 cursor-pointer font-gilroy"
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
                                    triggerNode.closest(".relative")
                                }
                            />
                        </div>
                    )}





                    <hr className="border-t border-[#DFDFDF] my-2" />

                    <div
                        className={`mt-2 p-1 text-center rounded-lg ${ReturnAmount > 0 ? "bg-[#FFF7F7]" : "bg-[#F0FFE0]"
                            }`}
                    >
                        <span
                            className={`text-sm font-normal font-gilroy ${ReturnAmount > 0 ? "text-red-600" : "text-[#038C3D]"
                                }`}
                        >
                            {ReturnAmount > 0 ? "Pending" : "Refund"}
                        </span>
                    </div>


                </div>



                <div className="flex-1 bg-white rounded-lg p-3.5 relative h-[calc(100vh-50px)] overflow-hidden">

                    <div className="max-h-[calc(100vh-150px)] overflow-y-auto overflow-x-hidden show-scrolls">

                        <div className="me-1" >

{/* unpaid invoice */}

                            <div
                                className="mb-2"
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 8,
                                    backgroundColor: "#fff",
                                    fontFamily: "Gilroy",
                                }}
                            >

                                <div

                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "10px 14px",

                                    }}
                                >

                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span
                                            style={{
                                                borderRadius: 5,
                                                padding: 4,
                                                display: "flex", cursor: "pointer",
                                            }}
                                        >
                                            {showInvoices ? (
                                                <ArrowUp2 size="16" color="#1E45E1" onClick={() => setShowInvoices(false)} />
                                            ) : (
                                                <ArrowDown2 size="16" color="#1E45E1" onClick={() => setShowInvoices(true)} />
                                            )}
                                        </span>

                                        <span className="text-sm font-semibold text-[#111827]">
                                            Unpaid Invoices
                                        </span>
                                    </div>

                                    <span style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
                                        ₹{
                                            UnpaidInvoices?.reduce(
                                                (sum, inv) => sum + Number(inv.payableAmount || 0),
                                                0
                                            ) || 0
                                        }
                                    </span>
                                </div>


                                {showInvoices && (
                                    <hr style={{ margin: 0, borderColor: "#DFDFDF" }} />
                                )}

                                <div
                                    style={{
                                        maxHeight: showInvoices ? "500px" : "0",
                                        overflow: "hidden",
                                        transition: "max-height 0.3s ease",
                                    }}
                                >
                                    {showInvoices && (
                                        <div style={{ padding: "8px 10px" }}>
                                            <div className="table-responsive border border-gray rounded">
                                                <table className="table table-sm align-middle mb-0" style={{ fontFamily: "Gilroy", }}>
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                className="px-2 py-2 text-start"
                                                                style={{
                                                                    fontSize: 14,
                                                                    color: "#00092F",
                                                                    fontFamily: "Gilroy",
                                                                    fontWeight: 600,
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                Invoice No
                                                            </th>

                                                            <th
                                                                className="px-2 py-2 text-start"
                                                                style={{
                                                                    fontSize: 14,
                                                                    color: "#00092F",
                                                                    fontFamily: "Gilroy",
                                                                    fontWeight: 600,
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                Type
                                                            </th>

                                                            <th
                                                                className="px-2 py-2 text-end"
                                                                style={{
                                                                    fontSize: 14,
                                                                    color: "#00092F",
                                                                    fontFamily: "Gilroy",
                                                                    fontWeight: 600,
                                                                    verticalAlign: "middle",
                                                                }}
                                                            >
                                                                Invoice Amount
                                                            </th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {Array.isArray(UnpaidInvoices) && UnpaidInvoices?.length > 0 ? (
                                                            UnpaidInvoices.map((user) => (
                                                                <tr key={user.invoiceNumber}>
                                                                    <td
                                                                        className=" text-decoration-underline px-2 py-2"

                                                                        style={{
                                                                            fontFamily: "Gilroy",
                                                                            fontSize: "14px",
                                                                            // paddingTop: "1rem", 
                                                                            color: "#1E45E1", fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {user.invoiceNumber}
                                                                    </td>
                                                                    <td
                                                                        className=" px-2 py-2"
                                                                        style={{
                                                                            fontFamily: "Gilroy",
                                                                            fontSize: "14px",
                                                                            color: "#1E1E1E", fontWeight: 400
                                                                            // paddingTop: "1rem"
                                                                        }}
                                                                    >
                                                                        {user.type}
                                                                    </td>
                                                                    <td
                                                                        className="text-end px-2 py-2"
                                                                        style={{
                                                                            fontFamily: "Gilroy",
                                                                            fontSize: "14px",
                                                                            color: "#1E1E1E",
                                                                            fontWeight: 500,

                                                                            // paddingTop: "1rem"
                                                                        }}
                                                                    >
                                                                        ₹{user.payableAmount}
                                                                    </td>
                                                                </tr>
                                                            ))

                                                        )
                                                            :
                                                            (
                                                                <tr>
                                                                    <td colSpan={3} className="text-center px-2 py-2" style={{ color: "#6B7280", fontSize: 14 }}>
                                                                        No pending invoices
                                                                    </td>
                                                                </tr>
                                                            )

                                                        }
                                                        <tr style={{ backgroundColor: "#F9F9F9" }}>
                                                            <td colSpan={2} className=" text-start px-2 py-2" style={{ fontSize: 14, color: "#1E1E1E" }}>
                                                                Total
                                                            </td>
                                                            <td className=" text-end px-2 py-2" style={{ fontSize: 14, color: "#1E1E1E" }}>
                                                                ₹{
                                                                    UnpaidInvoices?.reduce(
                                                                        (sum, inv) => sum + Number(inv.payableAmount || 0),
                                                                        0
                                                                    ) || 0
                                                                }
                                                            </td>
                                                        </tr>


                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )}
                                </div>

                            </div>



                            <div
                                className="mb-2"
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 8,
                                    backgroundColor: "#fff",
                                    fontFamily: "Gilroy",
                                }}
                            >

                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px 14px",

                                }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span
                                            style={{
                                                borderRadius: 5,
                                                padding: 4,
                                                display: "flex", cursor: "pointer",
                                            }}
                                        >
                                            {showRentDetails ? (
                                                <ArrowUp2 size="16" color="#1E45E1" onClick={() => setShowRentDetails(false)} />
                                            ) : (
                                                <ArrowDown2 size="16" color="#1E45E1" onClick={() => setShowRentDetails(true)} />
                                            )}
                                        </span>

                                        <span
                                            className="text-sm font-semibold text-[#111827]"
                                        >
                                            Refundable Rent
                                        </span>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: 16,
                                            color: "black",
                                            fontFamily: "Gilroy",
                                            fontWeight: 600,
                                        }}
                                    >
                                        ₹{finalSettlementList?.currentMonthRentInfo?.currentMonthPayableAmount}
                                    </span>
                                </div>

                                {
                                    showRentDetails &&
                                    <hr className="m-0" style={{ border: "1px solid #DFDFDF" }} />
                                }
                                {
                                    showRentDetails &&
                                    <div style={{ padding: "8px 10px" }}>

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

                                        <div className="d-flex justify-content-between  align-items-start">

                                            <div className="d-flex gap-3">
                                                <div
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: 14,
                                                        color: "black",
                                                        cursor: "pointer",
                                                        userSelect: "none"
                                                    }}

                                                >
                                                    Actual Stay Days (Rent) (
                                                    {(() => {
                                                        const d = finalSettlementList?.currentMonthRentInfo?.stayDays ?? 0;
                                                        return `${d} ${d === 1 ? "day" : "days"}`;
                                                    })()}

                                                    )
                                                </div>

                                                <div className="d-flex" style={{}} onClick={() => setShowDetails(!showDetails)} >
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
                                                </div>



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

                                        {showDetails &&
                                            finalSettlementList?.currentMonthRentInfo?.rentLists?.map((item, index) => (
                                                <div key={index} style={{ marginTop: 8 }}>


                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            justifyContent: "space-between",
                                                            alignItems: "center",
                                                            fontFamily: "Gilroy",
                                                            fontSize: 12,
                                                            color: "#1E45E1",
                                                            width: "100%",
                                                            backgroundColor: "#F9F9F9", padding: 10, borderRadius: 8
                                                        }}
                                                    >

                                                        <div style={{ whiteSpace: "nowrap" }}>
                                                            {item.floorName} | {item.roomName} - {item.bedName}
                                                        </div>


                                                        <div style={{ whiteSpace: "nowrap", color: "#222" }}>
                                                            ({item.noOfDays} {item.noOfDays === 1 ? "day" : "days"} × {item.rentPerDay} = {item.totalRent})
                                                        </div>
                                                    </div>


                                                    {index !== finalSettlementList.currentMonthRentInfo.rentLists.length - 1 && (
                                                        <div
                                                            style={{
                                                                borderBottom: "1px dashed #CBD5E1",
                                                                marginTop: 6,
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            ))}



                                        {
                                            finalSettlementList?.currentMonthRentInfo?.otherItemAmount > 0 &&
                                            <>


                                                <div className="d-flex justify-content-between align-items-start mt-2">

                                                    <div className="d-flex gap-3">
                                                        <div
                                                            style={{
                                                                fontFamily: "Gilroy",
                                                                fontSize: 14,
                                                                color: "black",
                                                                cursor: "pointer",
                                                                userSelect: "none"
                                                            }}
                                                        >
                                                            Other Charges

                                                        </div>

                                                        <div
                                                            className="d-flex"
                                                            onClick={() => setShowOtherCharges(!showOtherCharges)}
                                                        >
                                                            <span
                                                                style={{
                                                                    backgroundColor: "#E7F1FF",
                                                                    borderRadius: 5,
                                                                    padding: 4,
                                                                }}
                                                            >
                                                                {showOtherCharges ? (
                                                                    <ArrowUp2 size="16" color="#1E45E1" />
                                                                ) : (
                                                                    <ArrowDown2 size="16" color="#1E45E1" />
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div
                                                        style={{
                                                            fontFamily: "Gilroy",
                                                            fontSize: 14,
                                                            color: "black",
                                                        }}
                                                    >
                                                        {finalSettlementList?.currentMonthRentInfo?.otherItemAmount ? (
                                                            <>₹{finalSettlementList.currentMonthRentInfo.otherItemAmount}</>
                                                        ) : null}
                                                    </div>
                                                </div>

                                                {showOtherCharges &&
                                                    finalSettlementList?.currentMonthRentInfo?.currentMonthOtherItems?.map((item, index) => (
                                                        <div key={index} style={{ marginTop: 8 }}>
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-between",
                                                                    alignItems: "center",
                                                                    fontFamily: "Gilroy",
                                                                    fontSize: 12,
                                                                    color: "#1E45E1",
                                                                    width: "100%",
                                                                    backgroundColor: "#F9F9F9",
                                                                    padding: 10,
                                                                    borderRadius: 8
                                                                }}
                                                            >
                                                                <div style={{ whiteSpace: "nowrap" }}>
                                                                    {item.item}
                                                                </div>

                                                                <div style={{ whiteSpace: "nowrap", color: "#222" }}>
                                                                    ₹{item.amount}
                                                                </div>
                                                            </div>

                                                            {index !== finalSettlementList?.otherChargesInfo?.chargeLists?.length - 1 && (
                                                                <div
                                                                    style={{
                                                                        borderBottom: "1px dashed #CBD5E1",
                                                                        marginTop: 6,
                                                                    }}
                                                                />
                                                            )}
                                                        </div>
                                                    ))}


                                            </>
                                        }




                                    </div>
                                }
                            </div>



                            {/* Missed EB */}

                            <div
                                className="mb-2"
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 10,
                                    backgroundColor: "#fff",
                                    fontFamily: "Gilroy",
                                }}
                            >

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "12px 16px",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ cursor: "pointer" }}>
                                            {showEbMissed ? (
                                                <ArrowUp2 size="16" color="#1E45E1" onClick={() => setShowEbMissed(false)} />
                                            ) : (
                                                <ArrowDown2 size="16" color="#1E45E1" onClick={() => setShowEbMissed(true)} />
                                            )}
                                        </span>

                                        <span className="text-sm font-semibold text-[#111827]">
                                            Electricity Bill
                                        </span>
                                    </div>

                                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                                        ₹{finalSettlementList?.ebInfo?.pendingEbAmount}
                                    </span>
                                </div>

                                {showEbMissed && (
                                    <hr className="m-0" style={{ border: "1px solid #DFDFDF" }} />
                                )}


                                {showEbMissed && (
                                    <>

                                        <div className="px-4 py-3"
                                        >


                                            {
                                                !finalSettlementList?.ebInfo?.isHostelReading &&
                                                finalSettlementList?.ebInfo?.missedEb.length > 0 &&
                                                <>
                                                    <label className="text-sm font-semibold text-[#222222] font-gilroy mb-2">Missed Electricity </label>
                                                    <hr className="m-0 mb-2" style={{ border: "1px solid #DFDFDF" }} />
                                                </>
                                            }

                                            {!finalSettlementList?.ebInfo?.isHostelReading &&
                                                finalSettlementList?.ebInfo?.missedEb?.map((item, index) => (
                                                    <div key={index} style={{ marginBottom: 14 }}>


                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                fontSize: 13,
                                                                // fontWeight: 600,
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 8,
                                                                }}
                                                            >
                                                                <span className="text-[#2A2A2A] text-sm font-medium">{item.floorName || "Floor Name"}</span>


                                                                <span
                                                                    style={{
                                                                        width: 1,
                                                                        height: 14,
                                                                        backgroundColor: "#D9D9D9",
                                                                        display: "inline-block",
                                                                    }}
                                                                />

                                                                <span className="text-[#2A2A2A] text-sm font-medium">{item.roomName || "Room Name"} - {item.bedName || "Bed Name"}</span>


                                                                <span className="px-2 py-1 rounded-lg text-xs font-medium" style={{ color: "#AA6805", fontWeight: 600, fontSize: 12, backgroundColor: "#FFF5EE" }}> {item.fromDate} - {item.toDate}</span>
                                                            </div>




                                                            <div className="d-flex gap-1 align-items-center" style={{ cursor: "pointer" }} onClick={() => handleRoomReading(item)}>
                                                                <AddCircle
                                                                    size="18"
                                                                    color="#1E45E1" variant="Bold" style={{ cursor: "pointer" }}
                                                                />
                                                                <label style={{ fontSize: 13, color: "#222222", fontWeight: 500, cursor: "pointer" }}> Add</label>


                                                            </div>
                                                        </div>
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",

                                                            }}
                                                        >


                                                        </div>



                                                    </div>
                                                ))}


                                            {
                                                !finalSettlementList?.ebInfo?.isHostelReading &&
                                                finalSettlementList?.ebInfo?.pendingEb.length > 0 &&
                                                <>
                                                    <label className="text-sm font-semibold text-[#222222] font-gilroy pb-1">Pending Invoices  </label>
                                                    <hr className="m-0 mb-2" style={{ border: "1px solid #DFDFDF" }} />
                                                </>
                                            }

                                            {!finalSettlementList?.ebInfo?.isHostelReading &&
                                                finalSettlementList?.ebInfo?.pendingEb?.map((item, index) => (
                                                    <div key={index} style={{ marginBottom: 14 }}>

                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                justifyContent: "space-between",
                                                                alignItems: "center",
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    alignItems: "center",
                                                                    gap: 8,
                                                                }}
                                                            >
                                                                <span className="text-[#2A2A2A] text-sm font-medium">{item.floorName || "Floor Name"}</span>


                                                                <span
                                                                    style={{
                                                                        width: 1,
                                                                        height: 14,
                                                                        backgroundColor: "#D9D9D9",
                                                                        display: "inline-block",
                                                                    }}
                                                                />

                                                                <span className="text-[#2A2A2A] text-sm font-medium">{item.roomName || "Room Name"} - {item.bedName || "Bed Name"}</span>


                                                                <span className="px-2 py-1 rounded-lg text-xs font-medium" style={{ color: "#1447E6", fontWeight: 600, fontSize: 12, backgroundColor: "#F0F6FF" }}> {item.fromDate} - {item.toDate}</span>
                                                            </div>




                                                            <div className="d-flex gap-1 align-items-center" style={{ cursor: "pointer" }}>
                                                                <span style={{ whiteSpace: "nowrap" }}>
                                                                    ({item.units} Units) &nbsp; ₹{item.amount}
                                                                </span>

                                                            </div>
                                                        </div>


                                                    </div>
                                                ))}



                                            {showNoEbMessage && (
                                                <div
                                                    style={{
                                                        padding: "12px",
                                                        textAlign: "center",
                                                        fontSize: 13,
                                                        fontWeight: 500,
                                                        color: "#AA6805",
                                                        backgroundColor: "#FFF5EE",

                                                    }}
                                                >
                                                    EB reading not calculated yet
                                                </div>
                                            )}


                                        </div>
                                    </>
                                )}


                            </div>

                            <div className="mb-2 rounded-[10px] border border-[#E5E7EB] bg-white font-gilroy">

                                <div className="flex items-center justify-between px-3 py-2.5">


                                    <div className="flex items-center gap-2">
                                        <span
                                            className="cursor-pointer"
                                            onClick={() => setShowWallet(!showWallet)}
                                        >
                                            {showWallet ? (
                                                <ArrowUp2 size="16" color="#1E45E1" />
                                            ) : (
                                                <ArrowDown2 size="16" color="#1E45E1" />
                                            )}
                                        </span>

                                        <span className="text-sm font-semibold text-[#111827]">
                                            Wallet
                                        </span>
                                    </div>


                                    <div
                                        className={`flex items-center gap-2 rounded-lg  ${finalSettlementList?.walletInfo?.walletAmount < 0
                                            ? "text-red-50"
                                            : "text-green-50"
                                            }`}
                                    >
                                        <span className=
                                            {`text-sm font-medium ${finalSettlementList?.walletInfo?.walletAmount < 0
                                                ? "text-red-600"
                                                : "text-green-600"
                                                }`}>₹</span>
                                        <span
                                            className={`text-base font-semibold ${finalSettlementList?.walletInfo?.walletAmount < 0
                                                ? "text-red-600"
                                                : "text-green-600"
                                                }`}
                                        >
                                            {finalSettlementList?.walletInfo?.walletAmount}
                                        </span>
                                    </div>

                                </div>

                                {showWallet && (
                                    <hr className="m-0" style={{ border: "1px solid #DFDFDF" }} />
                                )}



                                {showWallet && (
                                    <div className=" rounded-xl  shadow-sm">

                                        {finalSettlementList?.walletInfo?.transactions?.length > 0 ? (
                                            finalSettlementList.walletInfo.transactions.map((txn, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center justify-between px-3 py-3 border-b last:border-b-0  transition"
                                                >

                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-[#111827]">
                                                            {txn.source}
                                                        </span>


                                                    </div>


                                                    <div className="flex items-center gap-2">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold
                ${txn.amount < 0
                                                                    ? " text-red-600"
                                                                    : " text-green-600"
                                                                }
              `}
                                                        >
                                                            ₹{txn.amount}
                                                        </span>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="px-4 py-6 text-center text-sm text-gray-400">
                                                No wallet transactions available
                                            </div>
                                        )}
                                    </div>
                                )}


                            </div>



                            <div
                                className="mt-3"
                                style={{
                                    border: "1px solid #E5E7EB",
                                    borderRadius: 8,
                                    // backgroundColor: "#E7F1FF",
                                    fontFamily: "Gilroy",
                                }}
                            >


                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "10px 14px",
                                    cursor: "pointer",
                                }}
                                >
                                    <div className="d-flex align-items-center gap-2"  >
                                        <span
                                            style={{
                                                // backgroundColor: "#E7F1FF",
                                                borderRadius: 5,
                                                padding: 4,
                                                display: "flex",
                                            }}
                                        >
                                            {showDeductions ? (
                                                <ArrowUp2 size="16" color="#1E45E1" onClick={() => setShowDeductions(false)} />
                                            ) : (
                                                <ArrowDown2 size="16" color="#1E45E1" onClick={() => setShowDeductions(true)} />
                                            )}
                                        </span>

                                        <span
                                            className="text-sm font-semibold text-[#111827]"
                                        >
                                            Deductions
                                        </span>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center" style={{ cursor: "pointer" }} onClick={handleAddField}>
                                        <AddCircle
                                            size="18"
                                            color="#1E45E1" variant="Bold" style={{ cursor: "pointer" }}
                                        />
                                        <label style={{ fontSize: 13, color: "#222222", fontWeight: 500, cursor: "pointer" }}> Add</label>


                                    </div>
                                </div>

                                {showDeductions && (
                                    <hr className="m-0" style={{ border: "1px solid #DFDFDF" }} />
                                )}
                                {showDeductions && (
                                    <div style={{ padding: "8px 10px" }} >

                                        {fields.length === 0 && (
                                            <div
                                                style={{
                                                    padding: "14px",
                                                    textAlign: "center",
                                                    fontSize: 13,
                                                    fontWeight: 500,
                                                    color: "#6B7280",
                                                    backgroundColor: "#F9FAFB",
                                                    borderRadius: 6,
                                                    margin: "8px 12px",
                                                }}
                                            >
                                                No deductions available
                                            </div>
                                        )}
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
                                                                menuPlacement="bottom"
                                                                menuPosition="fixed"
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
                                )}


                            </div>



                            <div className="mx-3 my-3 flex items-center justify-between">
                                <p className="text-sm font-medium font-gilroy text-slate-600">
                                    {ReturnAmount > 0
                                        ? "Outstanding Amount Payable"
                                        : "Refund Payable to Tenant"}
                                </p>

                                <span
                                    className="
      flex items-center gap-1.5
      text-[#1E45E1] cursor-pointer
      text-sm font-normal font-gilroy
      whitespace-nowrap
    "
                                    onClick={() => setShowBreakdown(!showBreakdown)}
                                >
                                    View Breakdown
                                    {showBreakdown ? (
                                        <ArrowUp2 size="16" color="#1E45E1" />
                                    ) : (
                                        <ArrowDown2 size="16" color="#1E45E1" />
                                    )}
                                </span>
                            </div>


                            {showBreakdown && (<>
                                <div className="rounded px-3 pt-1 font-gilroy space-y-1">


                                    <div className="flex justify-between">
                                        <p className="text-base font-semibold text-gray-900">
                                            Final Settlement
                                        </p>
                                    </div>


                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">
                                           {finalSettlementList?.settlementInfo?.label} 
                                                                                  </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            ₹ {finalSettlementList?.settlementInfo?.payableAmount}
                                                                                       
                                             {/* {finalSettlementList?.settlementInfo?.refundableRent} */}
                                        </p>
                                    </div>


                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">
                                            Refundable Advance
                                        </p>
                                        <p className="text-sm font-medium text-gray-900">
                                            ₹ {finalSettlementList?.settlementInfo?.refundableAdvance}
                                        </p>
                                    </div>


                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">
                                            Total Deductions
                                        </p>
                                        <p className="text-sm font-medium text-red-600">
                                            - ₹ {totalDeductions}
                                        </p>
                                    </div>


                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">
                                            Electricity
                                        </p>
                                        <p className="text-sm font-medium text-red-600">
                                            ₹ {finalSettlementList?.settlementInfo?.electricityAmount}
                                        </p>
                                    </div>


                                    <div className="flex justify-between">
                                        <p className="text-sm text-gray-600">
                                            Unpaid Invoices
                                        </p>
                                        <p className="text-sm font-medium text-red-600">
                                            ₹ {finalSettlementList?.settlementInfo?.unpaidInvoiceAmount}
                                        </p>
                                    </div>


                                    {/*
    <div className="flex justify-between">
      <p className="text-sm text-gray-600">
        Refundable Wallet Amount
      </p>
      <p className="text-sm font-medium text-green-600">
        ₹ {finalSettlementList?.walletInfo?.walletAmount}
      </p>
    </div>
    */}
                                </div>


                                <div className="col-lg-12 col-md-12 col-sm-12 colxs-12 mb-10">


                                    <input
                                        type="text"
                                        name="Advance"
                                        id="Advance"
                                        value={ReturnAmount}
                                        placeholder="Amount"
                                        required
                                        className={`mt-1 h-[50px] w-full rounded-[8px] border border-[#D9D9D9]
    px-3 text-[16px] font-semibold font-gilroy shadow-none outline-none
    focus:border-[#1E45E1] focus:ring-0
    ${ReturnAmount > 0
                                                ? "text-green-600"
                                                : ReturnAmount < 0
                                                    ? "text-red-600"
                                                    : "text-gray-700"
                                            }
  `}
                                    />

                                </div>

                            </>
                            )}





                            {state.UsersList?.finalError && (
                                <ErrorMessage message={state.UsersList?.finalError} type="error" />
                            )}


                        </div>


                    </div>

                    <div
                        className="
    absolute bottom-0 left-0 w-full
    mt-0 mb-2 p-2
    flex justify-between items-center
    bg-white
    shadow-[0px_-4px_12px_rgba(0,0,0,0.08)]
    font-gilroy h-fit
  "
                    >

                        <div className="my-3 h-fit">
                            <div className="text-sm font-normal text-[#4B4B4B]">
                                {ReturnAmount > 0
                                    ? "Outstanding Amount Payable"
                                    : "Total Refund Payable"}
                            </div>

                            <div
                                className={`text-[22px] font-semibold ${ReturnAmount > 0
                                    ? "text-green-600"
                                    : ReturnAmount < 0
                                        ? "text-red-600"
                                        : "text-gray-700"
                                    }`}
                            >
                                ₹ {ReturnAmount}
                            </div>

                        </div>


                        <div className="flex items-center gap-3 h-fit">
                            <Button
                                variant=""
                                onClick={handleClose}
                                className="text-base font-normal font-gilroy"
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={formLoading}
                                onClick={handleClickGenerate}
                                className="
        bg-[#1E45E1] text-white
        text-base font-normal font-gilroy
       
        
      "
                            >
                                Generate Bill
                            </Button>
                        </div>
                    </div>

                </div>

            </div>

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




            {
                showRoomReading && <AddRoomReading show={showRoomReading} handleClose={handleCloseRoomReading} selectedRowDetails={selectedRowDetails} finalSettlementWay={true} />
            }


        </div>
    )
}
FinalSettlement.propTypes = {
    // show: PropTypes.func.isRequired,
    // handleClose: PropTypes.func.isRequired,
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
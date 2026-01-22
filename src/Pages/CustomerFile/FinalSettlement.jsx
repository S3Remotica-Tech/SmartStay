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

    const [showDetails, setShowDetails] = useState(false);

    const [showInvoices, setShowInvoices] = React.useState(false);
    const [showRentDetails, setShowRentDetails] = React.useState(false);
    const [showEbMissed, setShowEbMissed] = useState(false);
    const [showRoomReading, setShowRoomReading] = useState(false);
    const [showDeductions, setShowDeductions] = useState(false);

    const [isEditingDate, setIsEditingDate] = useState(false);
    const [checkoutDate, setCheckoutDate] = useState(dayjs())
    const [selectedRowDetails, setSelectedRowDetails] = useState('')
    const { data, pgDetails } = location.state || {};

    // const ebBreakup = [
    //     {
    //         floorName: "Ground Floor",
    //         roomBed: "G 005 - B 03",
    //         units: 27,
    //     },
    //     {
    //         floorName: "First Floor",
    //         roomBed: "F 002 - B 01",
    //         units: 23,
    //     },
    // ];



    const handleRoomReading = (item) => {
        setShowRoomReading(true)
        setSelectedRowDetails(item)
    }

    const handleCloseRoomReading = () => {
        setShowRoomReading(false)
    }


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



    const handleClose = () => {
        if (pgDetails) {
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
            setTimeout(() => {
                dispatch({ type: 'REMOVE_FINAL_SETTLMENT_ERROR' })
            }, 100)
        }
    }, [state.InvoiceList.finalSettlementError])

    useEffect(() => {
        if (state.UsersList?.addRoomReadingStatusCode === 201 || state.UsersList?.addRoomReadingStatusCode === 200 || state.UsersList?.editHostelStatusCode === 200) {
            setShowRoomReading(false)
        }

    }, [state.UsersList?.addRoomReadingStatusCode, state.UsersList?.editHostelStatusCode])


    const isNonHostel = !finalSettlementList?.ebInfo?.isHostelReading;

    const missedEbList = finalSettlementList?.ebInfo?.missedEb || [];
    const pendingEbList = finalSettlementList?.ebInfo?.pendingEb || [];

    const showNoEbMessage =
        isNonHostel &&
        missedEbList.length === 0 &&
        pendingEbList.length === 0;










    return (
        <div style={{ height: "100vh", overflow: "hidden" }}>
            {
                showRoomReading && <AddRoomReading show={showRoomReading} handleClose={handleCloseRoomReading} selectedRowDetails={selectedRowDetails} finalSettlementWay={true}/>
            }
            <div
                className="mb-3"
                style={{
                    position: "sticky",
                    // top: 0,
                    backgroundColor: "#fff",
                    zIndex: 0,
                    height: 50,
                    padding: "10px 12px",
                }}
            >
                <div className="d-flex gap-3 align-items-center">
                    <div>
                        <ArrowLeft onClick={() => handleClose()}
                            size="26"
                            color="#4A5565" style={{ cursor: "pointer" }}
                        />
                    </div>
                    <div>
                        <label className="mb-0" style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600, color: "#222222" }}>Final Settlement</label>
                        <p className="mb-2" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600, color: "#4A5565" }}>Tenants / Final Settlement</p>

                    </div>
                </div>
            </div>
            <div className=""
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "12px",
                    height: "calc(100vh - 50px)",
                    backgroundColor: "#f9f9f9",
                    padding: 10,
                    width: "100%",
                    flexWrap: "nowrap"
                }}>
                {/* left */}
                <div style={{
                    flex: "0 0 30%",
                    background: "#FFFFFF",
                    borderRadius: 8,
                    padding: 16,
                    height: "100%"
                }}>
                    <div className="d-flex align-items-center gap-3 mb-1">
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
                                        backgroundColor: "#E2E8F0",
                                        color: "#44536A",
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
                            <div className="d-flex gap-2">
                                <label style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600, color: "#222222" }}
                                    className="mb-0">
                                    {finalSettlementList?.customerInfo?.fullName} </label>
                                <div>
                                    <Verify
                                        size="20"
                                        color="#1E45E1"
                                        variant="Bold"
                                    />
                                </div>




                            </div>
                            <div>
                                <label style={{ fontSize: 14, color: "#4B4B4B", fontWeight: 400, fontFamily: "Gilroy" }}>Mobile : +{finalSettlementList?.customerInfo?.countryCode} {finalSettlementList?.customerInfo?.mobile}</label>
                            </div>
                        </div>

                    </div>

                    <div className="d-flex justify-content-between mb-2 w-100" style={{ backgroundColor: "" }}>

                        <span
                            className="badge rounded-pill text-dark me-2 w-100 p-2"
                            style={{
                                fontSize: "0.75rem",
                                fontFamily: "Gilroy",
                                fontWeight: 400,
                                backgroundColor: "#FFEFCF"
                            }}
                        >
                            {pgDetails?.floorName || data?.floorName}
                        </span>
                        <span className="badge rounded-pill bg-danger-subtle text-dark w-100 p-2" style={{ fontSize: "0.75rem", fontFamily: "Gilroy", fontWeight: 400 }}>

                            {pgDetails?.roomName || data?.roomName} - {pgDetails?.bedName || data?.bedName}
                        </span>
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

                                <Edit
                                    size={16}
                                    color="#1E45E1"
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
                    <hr className="" style={{ border: "1px solid #DFDFDF" }} />
                    <div className="mt-2 p-1" style={{ textAlign: "center", backgroundColor: ReturnAmount > 0 ? "#FFF7F7" : "#F0FFE0", borderRadius: 8 }}>
                        <span style={{ color: ReturnAmount > 0 ? "red" : "#038C3D", fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400, textAlign: "center" }}>{ReturnAmount > 0 ? "Pending" : "Refund"}</span>
                    </div>

                </div>

                {/* right */}

                <div style={{
                    flex: "1 1 auto",
                    background: "#FFF",
                    borderRadius: 8,
                    padding: 14, position: "relative",
                    height: "calc(100vh - 50px)",

                }}>


                    <div className="show-scrolls" style={{
                        maxHeight: "calc(100vh - 150px)",
                        overflowX: "hidden",
                        overflowY: "auto"

                    }}>

                        <div className="me-1" >

                            {/* unpaid invoices */}

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

                                        <span style={{
                                            fontSize: 14,
                                            color: "black",
                                            fontWeight: 600,
                                        }}>
                                            Unpaid Invoices
                                        </span>
                                    </div>

                                    <span style={{ fontSize: 16, fontWeight: 600, color: "#111827" }}>
                                        ₹{
                                            finalSettlementList?.unpaidInvoices?.reduce(
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

                                                        {Array.isArray(finalSettlementList?.unpaidInvoices) && finalSettlementList.unpaidInvoices.length > 0 ? (
                                                            finalSettlementList?.unpaidInvoices.map((user) => (
                                                                <tr key={user.invoiceid}>
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
                                                                    finalSettlementList?.unpaidInvoices?.reduce(
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


                            {/* Refundable Rent */}
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
                                            style={{
                                                fontSize: 14,
                                                color: "black",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                            }}
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
                                        ₹{finalSettlementList?.currentMonthRentInfo?.currentPayableRent}
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
                                                            ({item.noOfDays} {item.noOfDays === 1 ? "day" : "days"} × {item.rent})
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
                                {/* Header */}
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

                                        <span style={{ fontSize: 14, fontWeight: 600 }}>
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

                                        <div style={{ padding: "12px 16px" }}>


                                            {
                                                !finalSettlementList?.ebInfo?.isHostelReading &&
                                                finalSettlementList?.ebInfo?.missedEb.length > 0 &&
                                                <>
                                                    <label className="text-sm font-semibold text-[#222222] font-gilroy mb-2">Missed Electricity :</label>
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
                                                    <label className="text-sm font-semibold text-[#222222] font-gilroy pb-1">Pending Invoices : </label>
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
                                            style={{
                                                fontSize: 14,
                                                color: "black",
                                                fontWeight: 600,
                                            }}
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
                                )}


                            </div>



                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <p style={{ fontSize: "0.875rem", fontFamily: "Gilroy", fontWeight: 400 }}>{ReturnAmount > 0 ? "Outstanding Amount Payable" : "Refund Payable to Tenant"}</p>
                                <span
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        color: "#1E45E1",
                                        cursor: "pointer",
                                        fontSize: "0.875rem",
                                        fontFamily: "Gilroy",
                                        fontWeight: 400,
                                        whiteSpace: "nowrap",
                                    }}
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

                            {showBreakdown && (
                                <div className="rounded pt-0 ps-3 pe-3">
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 600 }}>
                                            Final Settlement
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
                                            {finalSettlementList?.settlementInfo?.refundableAdvance}
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
                                            Electricity
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: "Gilroy",
                                                fontSize: "0.875rem",
                                                fontWeight: 400,
                                                color: "red",
                                            }}
                                        >
                                            ₹{" " + finalSettlementList?.settlementInfo?.electricityAmount}
                                            {/* {totalDeductions} */}
                                        </p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p style={{ fontFamily: "Gilroy", fontSize: "0.875rem", fontWeight: 400 }}>
                                            Unpaid Invoices
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: "Gilroy",
                                                fontSize: "0.875rem",
                                                fontWeight: 400,
                                                color: "red",
                                            }}
                                        >
                                            ₹{" " + finalSettlementList?.settlementInfo?.unpaidInvoiceAmount}
                                            {/* {totalDeductions} */}
                                        </p>
                                    </div>
                                </div>

                            )}

                            <div className="col-lg-12 col-md-12 col-sm-12 colxs-12 mb-3">


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


                        </div>


                    </div>

                    <div
                        className="d-flex justify-content-between mt-4 mb-2  p-3"
                        style={{
                            fontFamily: "Gilroy",
                            boxShadow: "0px -4px 12px rgba(0, 0, 0, 0.08)",
                            backgroundColor: "#fff",
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                        }}
                    >
                        <div className="d-block">
                            <div style={{ fontSize: 14, color: "#4B4B4B", fontWeight: 400 }}>
                                {ReturnAmount > 0 ? "Outstanding Amount Payable" : "Total Refund Payable"}
                            </div>
                            <div style={{ fontSize: 22, color: "#222222", fontWeight: 600 }}>
                                ₹ {ReturnAmount}
                            </div>
                        </div>

                        <div>
                            <Button
                                variant=""
                                className="me-2"
                                onClick={handleClose}
                                style={{ fontFamily: "Gilroy", fontSize: "1rem", fontWeight: 400 }}
                            >
                                Cancel
                            </Button>

                            <Button
                                disabled={formLoading}
                                style={{
                                    fontFamily: "Gilroy",
                                    fontSize: "1rem",
                                    fontWeight: 400,
                                    backgroundColor: "#1E45E1",
                                }}
                                onClick={handleClickGenerate}
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
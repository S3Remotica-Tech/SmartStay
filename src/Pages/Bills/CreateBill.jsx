/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FormControl } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import { DatePicker } from "antd";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
import "react-datepicker/dist/react-datepicker.css";
import leftarrow from "../../Assets/Images/arrow-left.png"
import PropTypes from "prop-types";
import dayjs from "dayjs";
import ErrorMessage from '../../Components/ErrorMessage'
import Closebtn from "../../Assets/Images/CloseCircle.png";
import { useNavigate, useLocation } from "react-router-dom";





function CreateBill() {

    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const location = useLocation();
    const { id, billData } = location.state || {};

    console.log("billData", billData,)
    const [formLoading, setFormLoading] = useState(false)
    //    const [invoiceList, setInvoiceList] = useState({
    //     firstName: "",
    //     lastName: "",
    //     phone: "",
    //     email: "",
    //     hostel_Name: "",
    //     hostel_Id: "",
    //     FloorNo: "",
    //     RoomNo: "",
    //     date: "",
    //     paymentType: "",
    //     amount: "",
    //     balanceDue: "",
    //     dueDate: "",
    //     payableAmount: "",
    //     InvoiceId: "",
    //     invoice_type: "",
    //     transaction: "",
    // });
    const [dropdownValue, setDropdownValue] = useState("");
    // const [selectedUserId, setSelectedUserId] = useState("");
    const [customername, setCustomerName] = useState("");
    const [invoicenumber, setInvoiceNumber] = useState("");
    const [startdate, setStartDate] = useState(null);
    const [enddate, setEndDate] = useState(null);
    const [invoicedate, setInvoiceDate] = useState(null);
    const [invoiceduedate, setInvoiceDueDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState("");
    const [newRows, setNewRows] = useState([])
    const [customererrmsg, setCustomerErrmsg] = useState("");
    const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
    const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
    const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
    const [allfielderrmsg, setAllFieldErrmsg] = useState("");
    // const [amenityArray, setamenityArray] = useState([]);

    const startRef = useRef(null);
    const endRef = useRef(null);
    const invoiceRef = useRef(null);
    const dueRef = useRef(null);

    // const calendarRef = useRef(null);;
    const [tableErrmsg, setTableErrmsg] = useState("");



    const [hostelId, setHostelId] = useState("");

    const [selectedTypes, setSelectedTypes] = useState([]);

    // const [unableAddInvoiceDetailsError, setUnableAddInvoiceDetailsError] = useState("")


    useEffect(() => {
        if (id && state.UsersList?.Users?.listCustomers?.length > 0) {
            const selectedCustomer = state.UsersList.Users.listCustomers.find(
                (u) => u.customerId === id
            );
            if (selectedCustomer) {
                setCustomerName(selectedCustomer.customerId);
            }
        }
    }, [id, state.UsersList?.Users.listCustomers]);



    const handleInvoiceChange = (e) => {
        setInvoiceNumber(e.target.value);
    };

    useEffect(() => {

        if (state.login.selectedHostel_Id) {
            setHostelId(state.login.selectedHostel_Id);
        }
    }, [state.login.selectedHostel_Id]);
    useEffect(() => {
        if (hostelId) {
            dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })


        }
    }, [hostelId]);



    useEffect(() => {
        if (billData) {
            dispatch({
                type: 'GETINITIALIZEEDITRECURRING', payload: {
                    hostelId: state.login.selectedHostel_Id,
                    invoiceId: billData?.invoiceId
                }
            })
        }

    }, [billData])


    console.log("state", state.InvoiceList.getInitializeRecurring)













    // useEffect(() => {
    //     if (state.InvoiceList.NodataReceiptStatusCode === 201) {

    //         setTimeout(() => {
    //             // setReceiptLoader(false);
    //             dispatch({ type: "CLEAR_NODATA_RECEIPTS_LIST" });
    //         }, 100);
    //     }
    // }, [state.InvoiceList.NodataReceiptStatusCode]);




    // const bankingOptions = Array.isArray(state.bankingDetails?.bankingList?.listBanks)
    //     ? state.bankingDetails?.bankingList?.listBanks.map((item) => {
    //         let label = "";
    //         if (item.accountType === "BANK") label = "BANK";
    //         else if (item.accountType === "UPI") label = "UPI";
    //         else if (item.accountType === "CARD") label = "CARD";
    //         else if (item.accountType === "CASH") label = "CASH";

    //         return {
    //             value: item?.bankingId,
    //             label: `${item?.accountHolderName} - ${label}`,
    //         };
    //     })
    //     : [];


    // const combinedOptions = [...bankingOptions];




    // useEffect(() => {
    //     if (state.InvoiceList.pdfErrorStatusCode === 201) {
    //         setLoading(false)
    //         setShowLoader(false);
    //         setTimeout(() => {
    //             dispatch({ type: "REMOVE_PDF_ERROR" });
    //         }, 100);
    //     }
    // }, [state.InvoiceList.pdfErrorStatusCode]);


    useEffect(() => {
        if (state.createAccount?.networkError) {
            // setLoading(false)
            setFormLoading(false)
            // setShowLoader(false);
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])









    useEffect(() => {
        if (customername) {
            dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: customername } });
        }
    }, [customername])




    useEffect(() => {
        if (!billData) {


            const SelectedCustomerRoomRent =
                state.UsersList?.customerdetails?.hostelInfo?.monthlyRent;

            if (SelectedCustomerRoomRent) {
                setNewRows((prevRows) => {
                    const roomRentIndex = prevRows.findIndex(
                        (row) => row.am_name === "Room Rent"
                    );

                    if (roomRentIndex !== -1) {
                        const updatedRows = [...prevRows];
                        updatedRows[roomRentIndex].amount =
                            SelectedCustomerRoomRent.toString();
                        return updatedRows;
                    } else {
                        return [
                            ...prevRows,
                            { am_name: "Room Rent", amount: SelectedCustomerRoomRent.toString() },
                        ];
                    }
                });

                setSelectedTypes((prev) => {
                    const updated = prev.includes("RoomRent")
                        ? prev
                        : [...prev, "RoomRent"];
                    return updated;
                });


                // console.log("selectedTypes", selectedTypes)

                setTimeout(() => {
                    dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
                }, 500);
            }
        }
    }, [
        state.UsersList?.customerdetails?.hostelInfo?.monthlyRent,
        customername,
        state.UsersList?.CustomerdetailsgetStatuscode,
    ]);

    useEffect(() => {
        if (!customername) {
            setSelectedTypes([]);
            setNewRows([]);
        }
    }, [customername]);





    const options = {
        dateFormat: "d/m/Y",
        defaultDate: null,
        maxDate: new Date(),
        minDate: null,
    };




    const handleCustomerName = (selectedOption) => {

        setCustomerName(selectedOption?.value || '');
        setAllFieldErrmsg("");
        if (!selectedOption) {
            setCustomerErrmsg("Please Select Name");
        } else {
            setCustomerErrmsg("");
        }
        setStartDate("");
        setEndDate("");;
        setTotalAmount("");
    };

    const handleBackBill = () => {
        dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
        setFormLoading(false)
        // setShowManualInvoice(false);
        // setShowRecurringBillForm(false);
        // setReceiptFormShow(false);
        // setShowAllBill(true);
        // setEditvalue("");
        // setReceiptEdit(false);
        setCustomerName("");
        setInvoiceNumber("");
        setStartDate("");
        setEndDate("");
        setInvoiceDate("");
        setInvoiceDueDate("");
        setTotalAmount("");
        setCustomerErrmsg("");
        setInvoiceDateErrmsg("");
        setInvoiceDueDateErrmsg("");
        setAllFieldErrmsg("");
        setTableErrmsg("");
        // setamenityArray([]);
        setNewRows([]);
        setDropdownValue("")
        if (state.UsersList.userRoomfor) {
            navigate(`/tenant/details/${customername}`, {
                state: {
                    totriggerBillTap: true
                }
            })
        } else {
            navigate(`/invoice/${state.login.selectedHostel_Id}`)
        }

    };




    // const formatDateForPayloadmanualinvoice = (date) => {
    //     return dayjs(date).format("YYYY-MM-DD");
    // };





    const handleInvoiceDate = (selectedDate) => {
        setAllFieldErrmsg("");

        if (!selectedDate) {
            setInvoiceDate(null);
            setInvoiceDateErrmsg("Please Select Date");
            return;
        }

        setInvoiceDate(selectedDate);
        setInvoiceDateErrmsg("");

        // const formattedDate = formatDateForPayloadmanualinvoice(selectedDate);
        // setFormatInvoiceDate(formattedDate);
    };





    const handleDueDate = (selectedDates) => {
        setAllFieldErrmsg("");
        const date = selectedDates;
        setInvoiceDueDate(date);
        if (!selectedDates) {
            setInvoiceDueDateErrmsg("Please Select Date");
        } else {
            setInvoiceDueDateErrmsg("");
        }

        // const formattedDate = formatDateForPayloadmanualinvoice(date);
        // setFormatDueDate(formattedDate);
    };





    const CustomStartDateInput = React.forwardRef(({ value, onClick }, ref) => {
        return (
            <div
                className="date-input-container w-100"
                onClick={onClick}
                style={{ position: "relative" }}
            >
                <FormControl
                    type="text"
                    className="date_input"
                    value={value || "DD/MM/YYYY"}
                    readOnly
                    ref={ref}
                    style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 9,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: value ? 600 : 500,
                        width: "100%",
                        height: 50,
                        boxSizing: "border-box",
                        boxShadow: "none",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                    }}
                />
                <img
                    src={Calendars}
                    style={{
                        height: 24,
                        width: 24,
                        marginLeft: 10,
                        cursor: "pointer",
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="Calendar"
                    onClick={onClick}
                />
            </div>
        );
    });
    CustomStartDateInput.displayName = "CustomStartDateInput";

    const CustomEndDateInput = React.forwardRef(({ value, onClick }, ref) => {
        return (
            <div
                className="date-input-container w-100"
                onClick={onClick}
                style={{ position: "relative" }}
            >
                <FormControl
                    type="text"
                    className="date_input"
                    value={value || "DD/MM/YYYY"}
                    readOnly
                    ref={ref}
                    style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 9,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: value ? 600 : 500,
                        width: "100%",
                        height: 50,
                        boxSizing: "border-box",
                        boxShadow: "none",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                    }}
                />
                <img
                    src={Calendars}
                    style={{
                        height: 24,
                        width: 24,
                        marginLeft: 10,
                        cursor: "pointer",
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="Calendar"
                    onClick={onClick} />
            </div>
        );
    });

    CustomEndDateInput.displayName = "CustomEndDateInput";

    const CustomInvoiceDateInput = React.forwardRef(({ value, onClick }, ref) => {
        return (
            <div
                className="date-input-container w-100"
                onClick={onClick}
                style={{ position: "relative" }}
            >
                <FormControl
                    type="text"
                    className="date_input"
                    value={value || "DD/MM/YYYY"}
                    readOnly
                    ref={ref}
                    style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 9,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: value ? 600 : 500,
                        width: "100%",
                        height: 50,
                        boxSizing: "border-box",
                        boxShadow: "none",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                    }}
                />
                <img
                    src={Calendars}
                    style={{
                        height: 24,
                        width: 24,
                        marginLeft: 10,
                        cursor: "pointer",
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="Calendar"
                    onClick={onClick}
                />
            </div>
        );
    });
    CustomInvoiceDateInput.displayName = "CustomInvoiceDateInput";
    const CustomInvoiceDueDateInput = React.forwardRef(({ value, onClick }, ref) => {
        return (
            <div
                className="date-input-container w-100"
                onClick={onClick}
                style={{ position: "relative" }}
            >
                <FormControl
                    type="text"
                    className="date_input"
                    value={value || "DD/MM/YYYY"}
                    readOnly
                    ref={ref}
                    style={{
                        border: "1px solid #D9D9D9",
                        borderRadius: 8,
                        padding: 9,
                        fontSize: 14,
                        fontFamily: "Gilroy",
                        fontWeight: value ? 600 : 500,
                        width: "100%",
                        height: 50,
                        boxSizing: "border-box",
                        boxShadow: "none",
                        backgroundColor: "#fff",
                        cursor: "pointer",
                    }}
                />
                <img
                    src={Calendars}
                    style={{
                        height: 24,
                        width: 24,
                        marginLeft: 10,
                        cursor: "pointer",
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                    }}
                    alt="Calendar"
                    onClick={onClick}
                />
            </div>
        );
    });

    CustomInvoiceDueDateInput.displayName = "CustomInvoiceDueDateInput";




    const handleNewRowChange = (index, field, value) => {
        setNewRows((prevRows) =>
            prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
        );
        setAllFieldErrmsg("");
        setTableErrmsg("")
    };

    const handleRowTypeSelect = (type) => {
        let newRow = { am_name: "", amount: "0" };

        if (type === "RoomRent") {
            newRow.am_name = "Room Rent";
        } else if (type === "EB") {
            newRow.am_name = "EB";
        }

        setNewRows((prev) => [...prev, newRow]);


        if (type !== "Other" && !selectedTypes.includes(type)) {
            setSelectedTypes((prev) => [...prev, type]);
        }


        setAllFieldErrmsg("");
        setTableErrmsg("");


        setDropdownValue("");
    };



    const handleDeleteNewRow = (index) => {
        setNewRows((prevRows) => {
            const deletedRow = prevRows[index];
            const updatedRows = prevRows.filter((_, i) => i !== index);


            if (deletedRow.am_name === "Room Rent") {
                setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "RoomRent"));
            } else if (deletedRow.am_name === "EB") {
                setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "EB"));
            }

            return updatedRows;
        });

        setAllFieldErrmsg("");
        setTableErrmsg("");
    };

    useEffect(() => {
        const types = [];
        newRows.forEach((row) => {
            if (row.am_name === "Room Rent") types.push("RoomRent");
            else if (row.am_name === "EB") types.push("EB");
        });
        setSelectedTypes(types);
    }, []);




    const handleCreateBill = () => {
        let hasError = false;
        dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })

        if (!customername) {
            setCustomerErrmsg("Please Select Tenant");
            hasError = true;
        } else {
            setCustomerErrmsg("");
        }



        if (!invoicedate) {
            setInvoiceDateErrmsg("Please Select Invoice Date");
            hasError = true;
        } else {
            setInvoiceDateErrmsg("");
        }

        if (!invoiceduedate) {
            setInvoiceDueDateErrmsg("Please Select Due Date");
            hasError = true;
        } else {
            setInvoiceDueDateErrmsg("");
        }


        if (!Array.isArray(newRows) || newRows.length === 0) {
            setTableErrmsg("Please Add At Least One Item Row Before Generating The Bill");
            hasError = true;
        } else if (
            newRows.some(
                (row) =>
                    !row.am_name?.trim() ||
                    row.amount === "" ||
                    row.amount === null ||
                    row.amount === undefined ||
                    isNaN(row.amount) ||
                    parseFloat(row.amount) <= 0
            )
        ) {
            setTableErrmsg("Please Fill All Details & Amount > 0 Before Generating The Bill");
            hasError = true;
        } else {
            setTableErrmsg("");
        }

        const selectedUser = state.UsersList.Users.listCustomers?.find(item => item.customerId === customername);


        if (selectedUser) {
            const joiningDate = dayjs(selectedUser.actualJoining).format("YYYY-MM-DD");
            const formattedInvoiceDate = dayjs(invoicedate).format("YYYY-MM-DD");
            const formattedDueDate = dayjs(invoiceduedate).format("YYYY-MM-DD");


            if (dayjs(formattedInvoiceDate).isBefore(joiningDate)) {
                setInvoiceDateErrmsg("Before join date not allowed");
                hasError = true;
            }


            if (dayjs(formattedDueDate).isBefore(joiningDate)) {
                setInvoiceDueDateErrmsg("Before join date not allowed");
                hasError = true;
            }


            if (dayjs(formattedDueDate).isBefore(formattedInvoiceDate)) {
                setInvoiceDueDateErrmsg("Due date cannot be before invoice date");
                hasError = true;
            }
        }

        if (hasError) {
            return;
        }

        const formatinvoicedate = dayjs(invoicedate).format("DD-MM-YYYY");
        const formatduedate = dayjs(invoiceduedate).format("DD-MM-YYYY");
        // const rentAmount = newRows
        //     .filter((row) => row.am_name?.toLowerCase() === "room rent")
        //     .reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

        // const ebAmount = newRows
        //     .filter((row) => row.am_name?.toLowerCase() === "eb")
        //     .reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

        // const amenityAmount = newRows
        //     .filter(
        //         (row) =>
        //             row.am_name?.toLowerCase() !== "room rent" &&
        //             row.am_name?.toLowerCase() !== "eb"
        //     )
        //     .reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

        dispatch({
            type: "MANUAL-INVOICE-ADD",
            payload: {
                customerId: customername,
                invoiceDate: formatinvoicedate,
                dueDate: formatduedate,
                invoiceNumber: invoicenumber,
                total_amount: totalAmount,
                items: newRows.map((row) => ({
                    invoiceItem: row.am_name,
                    amount: parseFloat(row.amount) || 0,
                })),
            },
        });

        setFormLoading(true)




    };

    console.log("billData", billData)

    useEffect(() => {
        if (!billData) return;
        setCustomerName(billData.customerId);
        setInvoiceNumber(billData.invoiceNumber);
        setInvoiceDate(dayjs(billData.invoiceDate, "DD/MM/YYYY"));
        setInvoiceDueDate(dayjs(billData.dueDate, "DD/MM/YYYY"));
        setTotalAmount(billData.baseAmount);


        if (Array.isArray(state.InvoiceList?.getInitializeRecurring?.invoiceItems)) {
            setNewRows(
                state.InvoiceList?.getInitializeRecurring?.invoiceItems?.map((item) => ({
                    am_name: item.description || "",
                    amount: item.amount || "",
                }))
            );
        } else {
            setNewRows([]);
        }
    }, [billData, state.InvoiceList?.getInitializeRecurring?.invoiceItems]);


    const handleEditBill = () => {
        let hasError = false;
        setCustomerErrmsg("");
        setInvoicenumberErrmsg("");
        setInvoiceDateErrmsg("");
        setInvoiceDueDateErrmsg("");
        setAllFieldErrmsg("");

        if (!Array.isArray(newRows) || newRows.length === 0) {
            setTableErrmsg("Please Add At Least One Item Row Before Generating The Bill");
            hasError = true;
        } else if (
            newRows.some(
                (row) =>
                    !row.am_name?.trim() ||
                    row.amount === "" ||
                    row.amount === null ||
                    row.amount === undefined ||
                    isNaN(row.amount) ||
                    parseFloat(row.amount) <= 0
            )
        ) {
            setTableErrmsg("Please Fill All Details & Amount > 0 Before Generating The Bill");
            hasError = true;
        } else {
            setTableErrmsg("");
        }



        if (hasError) {
            return;
        }

        if (newRows.length > 0 && billData?.invoiceId) {
            setFormLoading(true)
            dispatch({
                type: "MANUAL-INVOICE-EDIT",
                hostelId: state.login.selectedHostel_Id,
                invoiceId: billData?.invoiceId,
                payload: newRows.map((row) => ({
                    type: row.am_name,
                    amount: parseFloat(row.amount) || 0,
                })),
            });





            setCustomerName("");
            setInvoiceNumber("");
            setStartDate("");
            setEndDate("");
            setInvoiceDate("");
            setInvoiceDueDate("");
            setTotalAmount("");
            setNewRows([]);
            setCustomerErrmsg("");
            setInvoiceDateErrmsg("");
            setInvoiceDueDateErrmsg("");
            setAllFieldErrmsg("");
        }
    };












    useEffect(() => {
        if (state.InvoiceList.recurringEditError) {
            setFormLoading(false)

        }

    }, [state.InvoiceList.recurringEditError])









    useEffect(() => {
        if (hostelId) {
            dispatch({ type: "USERLIST", payload: { hostel_id: hostelId } });
        }
    }, [hostelId]);



    useEffect(() => {
        if (state.InvoiceList.manualInvoiceAddStatusCode === 201 || state.InvoiceList.manualInvoiceEditStatusCode === 200) {
            // setShowManualInvoice(false)
            setFormLoading(false)
            // setShowRecurringBillForm(false);
            // setReceiptFormShow(false);
            // setShowAllBill(true);
            setCustomerName("");
            setInvoiceNumber("");
            setStartDate("");
            setEndDate("");
            setInvoiceDate("");
            setInvoiceDueDate("");
            setTotalAmount("");
            if (state.UsersList.userRoomfor) {
                navigate(`/tenant/details/${id}`, {
                    state: {
                        totriggerBillTap: true
                    }
                })
            } else {
                navigate(`/invoice/${state.login.selectedHostel_Id}`)
            }
            setNewRows([]);
            dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })


            if (id) {
                dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: id } });
            }
            // setLoading(false);

            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });
                // setLoading(false);

            }, 300);
        }
    }, [state.InvoiceList.manualInvoiceAddStatusCode, state.InvoiceList.manualInvoiceEditStatusCode]);




    const optionsone = {
        dateFormat: "d/m/Y",
        defaultDate: null,
        minDate: null,
    };

    useEffect(() => {
        if (startRef.current) {
            startRef.current.flatpickr.set(options);
        }
        if (endRef.current) {
            endRef.current.flatpickr.set(options);
        }
        if (invoiceRef.current) {
            invoiceRef.current.flatpickr.set(options);
        }
        if (dueRef.current) {
            dueRef.current.flatpickr.set(optionsone);
        }
    }, [startdate, enddate, invoicedate, invoiceduedate]);





    useEffect(() => {

        if (newRows) {
            const allRows = newRows
                .map((detail) => ({
                    am_name: detail.am_name,
                    amount: Number(detail.amount),
                }))
                .filter((detail) => detail.am_name && detail.amount);

            // setamenityArray(allRows);

            const Total_amout = allRows.reduce(
                (sum, item) => sum + parseFloat(item.amount || 0),
                0
            );

            setTotalAmount(Total_amout);
        }
    }, [newRows]);










    const EXCLUDED_STATUSES = ["Booked", "Settlement Generated"];






    return (
        <div className="mt-4" style={{ paddingLeft: 5, position: "relative" }}>
            <div
                className="container justify-content-start  d-flex align-items-start"
                style={{
                    position: "sticky",
                    top: 0,
                    left: 0,
                    width: "100%",
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: "60px",
                    padding: "10px 5px",
                }}
            >
                <div style={{ position: "fixed" }}>
                    <img
                        src={leftarrow}
                        alt="leftarrow"
                        width={20}
                        height={20}
                        onClick={handleBackBill}
                        style={{ cursor: "pointer" }}
                    />
                    <span
                        style={{
                            fontWeight: 500,
                            fontSize: "18px",
                            fontFamily: "Gilroy",
                            paddingLeft: "10px"
                        }}
                    >
                        {billData ? "Edit Bill" : "New Bill"}
                    </span>{" "}
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label
                            style={{
                                fontFamily: "Gilroy",
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#222",
                                fontStyle: "normal",
                                lineHeight: "normal",
                            }}
                        >
                            Customer <span style={{ color: "red", fontSize: "20px" }}>*</span>
                        </Form.Label>


                        <Select
                            options={
                                state.UsersList?.Users?.listCustomers?.length > 0
                                    ? state.UsersList.Users.listCustomers.filter((u) => {
                                            if (EXCLUDED_STATUSES.includes(u.currentStatus)) {
                                                return false;
                                            }
                                            const validBed =
                                                u.bedId !== "undefined" &&
                                                u.bedId !== "0" &&
                                                typeof u.bedId === "string" &&
                                                u.bedId.trim() !== "";

                                            const validRoom =
                                                u.roomId !== "undefined" &&
                                                u.roomId !== "0" &&
                                                typeof u.roomId === "string" &&
                                                u.roomId.trim() !== "";

                                            if (id) {
                                                return validBed && validRoom && u.customerId === id;
                                            }

                                            return validBed && validRoom;
                                        })
                                        .map((u) => ({
                                            value: u.customerId,
                                            label: u.fullName,
                                        }))
                                    : []
                            }
                            onChange={handleCustomerName}
                            value={
                                customername
                                    ? {
                                        value: customername,
                                        label:
                                            state.UsersList?.Users?.listCustomers?.find(
                                                (u) => u.customerId === customername
                                            )?.firstName || "Select Customer",
                                    }
                                    : null
                            }
                            isDisabled={billData}
                            placeholder="Select Customer"
                            classNamePrefix="custom"
                            menuPlacement="auto"
                            noOptionsMessage={() => "No customers available"}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    padding: "3px 5px",
                                    border: "1px solid #D9D9D9",
                                    borderRadius: "8px",
                                    fontSize: "16px",
                                    color: "#4B4B4B",
                                    fontFamily: "Gilroy",
                                    fontWeight: customername ? 600 : 500,
                                    boxShadow: "none",
                                }),
                                menu: (base) => ({
                                    ...base,
                                    backgroundColor: "#f8f9fa",
                                    border: "1px solid #ced4da",
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



                        {customererrmsg.trim() !== "" && (
                            <ErrorMessage message={customererrmsg} type="error" />
                        )}
                    </Form.Group>
                </div>

                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <Form.Group className="mb-1 mt-1" controlId="exampleForm.ControlInput1">
                        <Form.Label
                            style={{
                                fontFamily: "Gilroy",
                                fontSize: 14,
                                fontWeight: 500,
                                color: "#222",
                                fontStyle: "normal",
                                lineHeight: "normal",
                            }}
                        >
                            Invoice Number
                        </Form.Label>
                        <Form.Control disabled={billData}
                            style={{
                                padding: "12px 10px",
                                fontSize: 16,
                                color: "#4B4B4B",
                                fontFamily: "Gilroy",
                                lineHeight: "18.83px",
                                fontWeight: 500,
                                height: 48
                            }}
                            type="text"
                            placeholder="Enter Invoice Number"
                            value={invoicenumber || ""}
                            onChange={handleInvoiceChange}
                        />
                        {invoicenumbererrmsg.trim() !== "" && (
                            <ErrorMessage message={invoicenumbererrmsg} type="error" />
                        )}

                    </Form.Group>
                </div>
            </div>

            <div className="mb-4" style={{ display: "flex", flexDirection: "row", height: "100px" }}>
                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">

                    <p className="mt-1 mb-1" style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                    }}>Invoice Date{" "} <span style={{ color: "red", fontSize: "20px" }}>*</span></p>
                    <div style={{ position: "relative", width: "100%" }} className="datepicker-wrapper">

                        <div
                            className="datepicker-wrapper"
                            style={{
                                position: "relative",
                                width: "100%",
                            }}
                        >
                            <DatePicker disabled={billData}
                                style={{
                                    width: "100%",
                                    height: 48,
                                    cursor: "pointer",
                                    fontFamily: "Gilroy",
                                }}
                                format="DD/MM/YYYY"
                                placeholder="DD/MM/YYYY"
                                value={invoicedate ? dayjs(invoicedate) : null}
                                onChange={(date) => handleInvoiceDate(date)}
                                getPopupContainer={(triggerNode) => triggerNode.closest(".datepicker-wrapper")}
                                disabledDate={(current) =>
                                    current && current > dayjs().endOf("day")
                                }
                                dropdownAlign={{
                                    points: ["tl", "bl"],
                                    offset: [0, 4],
                                }}
                                popupStyle={{
                                    marginRight: 0,
                                    minWidth: "auto",
                                }}
                            />
                        </div>


                    </div>

                    {invoicedateerrmsg.trim() !== "" && (
                        <ErrorMessage message={invoicedateerrmsg} type="error" />
                    )}
                </div>

                <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
                    <p className="mt-1 mb-1" style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                    }}>Due Date{" "} <span style={{ color: "red", fontSize: "20px" }}>*</span></p>
                    <div style={{ position: "relative", width: "100%" }}>


                        <DatePicker disabled={billData}
                            style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy",
                            }}
                            format="DD/MM/YYYY"
                            placeholder="DD/MM/YYYY"
                            value={invoiceduedate ? dayjs(invoiceduedate) : null}
                            onChange={(date) => handleDueDate(date)}
                            getPopupContainer={(triggerNode) => triggerNode.closest(".datepicker-wrapper")}

                            dropdownAlign={{
                                points: ["tl", "bl"],
                                offset: [0, 4],
                            }}
                            popupStyle={{
                                marginRight: 0,
                                minWidth: "auto",
                            }}
                        />
                    </div>


                    {invoiceduedateerrmsg.trim() !== "" && (
                        <ErrorMessage message={invoiceduedateerrmsg} type="error" />
                    )}
                </div>
            </div>

            <div className="col-lg-5 col-md-3 col-sm-12 col-xs-12 mt-3">
                <Form.Select
                    className="border"
                    style={{
                        fontSize: 16,
                        color: "#4B4B4B",
                        fontFamily: "Gilroy",
                        lineHeight: "18.83px",
                        fontWeight: 500,
                        boxShadow: "none",
                        border: "1px solid #D9D9D9",
                        padding: "12px 10px ",
                        borderRadius: 8,
                        cursor: "pointer"
                    }}
                    value={dropdownValue}
                    onChange={(e) => handleRowTypeSelect(e.target.value)}
                >
                    <option value="" disabled>Select Item Type</option>
                    {!billData && !selectedTypes.includes("RoomRent") && <option value="RoomRent">Room Rent</option>}
                    {!selectedTypes.includes("EB") && <option value="EB">EB</option>}
                    <option value="Other">Other</option>
                </Form.Select>


                {tableErrmsg.trim() !== "" && (
                    <ErrorMessage message={tableErrmsg} type="error" />
                )}
            </div>

            {Array.isArray(newRows) && newRows.length > 0 && (<>
                <div className="mt-3" style={{ width: "80%", borderRadius: "10px", border: "1px solid #DCDCDC" }}>

                    <Table responsive className="m-0" style={{ tableLayout: "fixed" }}>
                        <thead style={{ backgroundColor: "#E7F1FF" }}>
                            <tr>
                                <th className="text-center" style={{ width: "10%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", borderTopLeftRadius: 10 }}>
                                    S.No
                                </th>
                                <th style={{ width: "45%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", whiteSpace: "nowrap" }}>
                                    Description
                                </th>
                                <th style={{ width: "30%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", whiteSpace: "nowrap" }}>
                                    Total Amount
                                </th>
                                <th style={{ width: "15%", color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", borderTopRightRadius: 10 }}>
                                    Action
                                </th>
                            </tr>
                        </thead>
                    </Table>


                    <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                        <Table responsive className="m-0" style={{ tableLayout: "fixed" }}>
                            <tbody>
                                {newRows.map((u, index) => (
                                    <tr key={index}>
                                        <td style={{ width: "10%" }} className="text-center">{index + 1}</td>
                                        <td style={{ width: "40%" }}>
                                            <Form.Control
                                                type="text"
                                                style={{ fontFamily: "Gilroy" }}
                                                disabled={u.am_name === "Rent"}
                                                value={u.am_name}
                                                onChange={(e) => handleNewRowChange(index, "am_name", e.target.value)}
                                                placeholder="Enter Description"
                                            />
                                        </td>
                                        <td style={{ width: "30%" }}>
                                            <Form.Control
                                                type="text"
                                                style={{ fontFamily: "Gilroy" }}
                                                 disabled={u.am_name === "Rent"}
                                                value={u.amount !== "0" ? u.amount : ""}
                                                placeholder="Please Enter Amount"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                        handleNewRowChange(index, "amount", value);
                                                    }
                                                }}
                                            />
                                        </td>
                                        <td style={{ width: "15%", paddingLeft: 20 }}>
                                            <img
                                                src={Closebtn}
                                                onClick={() => u.am_name !== "Rent" && handleDeleteNewRow(index)}
                                                style={{
                                                    cursor: u.am_name === "Rent" ? "not-allowed" : "pointer",
                                                    opacity: u.am_name === "Rent" ? 0.4 : 1,
                                                }}
                                                height={15}
                                                width={15}
                                                alt="delete"
                                            />

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>



                </div>


                <div className="row mt-3">
                    <div className="col-md-6 offset-md-6">
                        {Array.isArray(newRows) && newRows.length > 0 && (
                            <h5 style={{ fontFamily: "Gilroy" }}>
                                Total Amount ₹{totalAmount}
                            </h5>
                        )}
                    </div>
                </div>
               



            </>


            )}




            <div>
                {allfielderrmsg.trim() !== "" && (
                    <ErrorMessage message={allfielderrmsg} type="error" />
                )}

                {
                    state.InvoiceList.unableAddInvoiceDetailsError &&
                    <ErrorMessage message={state.InvoiceList.unableAddInvoiceDetailsError} type="error" />
                }
                {state.InvoiceList.recurringEditError ?
                    <div className="d-flex justify-content-center mt-1 mb-1">
                        <ErrorMessage message={state.InvoiceList.recurringEditError} type="error" /></div>
                    : null}
            </div>



            {formLoading && <div
                style={{
                    position: 'absolute',
                    top: '80%',
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





            <div style={{ float: "right", marginRight: "130px" }}>

                <Button
                    onClick={billData ? handleEditBill : handleCreateBill}
                    className="w-100 mt-3 mb-2"
                    style={{
                        backgroundColor: "#1E45E1",
                        fontWeight: 500,
                        height: 40,
                        borderRadius: 8,
                        fontSize: 16,
                        fontFamily: "Gilroy",
                        fontStyle: "normal",
                        lineHeight: "normal",
                        marginTop: "20px"
                    }}
                >
                    {billData ? "Save Changes" : "Create Bill"}

                </Button>

                <div className="mb-3"></div>
            </div>

        </div>
    )
}

CreateBill.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

export default CreateBill
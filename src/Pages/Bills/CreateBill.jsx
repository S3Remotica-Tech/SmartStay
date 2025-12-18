/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect, useRef } from "react";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { FormControl } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Table } from "react-bootstrap";
import { Form } from "react-bootstrap";
import User from "../../Assets/Images/New_images/profile-picture.png";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
import { DatePicker } from "antd";
import Calendars from "../../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import "react-datepicker/dist/react-datepicker.css";
import leftarrow from "../../Assets/Images/arrow-left.png"
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import AxiosConfig from "../../WebService/AxiosConfig";
import Swal from 'sweetalert2';
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import Closebtn from "../../Assets/Images/CloseCircle.png";
import { useNavigate, useLocation } from "react-router-dom";





function CreateBill() {

    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const location = useLocation();
    const { id } = location.state || {};



    const { RangePicker } = DatePicker;
    const [recurLoader, setRecurLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invoiceValue, setInvoiceValue] = useState("");
    const [bankking, setBanking] = useState("");
    const [formLoading, setFormLoading] = useState(false)
    const [formRecordLoading, setFormRecordLoading] = useState(false)
    const [invoiceList, setInvoiceList] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        hostel_Name: "",
        hostel_Id: "",
        FloorNo: "",
        RoomNo: "",
        date: "",
        paymentType: "",
        amount: "",
        balanceDue: "",
        dueDate: "",
        payableAmount: "",
        InvoiceId: "",
        invoice_type: "",
        transaction: "",
    });
    const [showSearchFilter, setShowSearchFilter] = useState(false);
    const [hoveredInvoiceId, setHoveredInvoiceId] = useState(null);

    const [showLoader, setShowLoader] = useState(false);
    const [statusfilter, setStatusfilter] = useState("");
    const [selectedUserId, setSelectedUserId] = useState("");
    const [paymodeerrormsg, setPaymodeErrmsg] = useState("");
    const [amounterrormsg, setAmountErrmsg] = useState("");
    const [dateerrmsg, setDateErrmsg] = useState("");
    const [totalErrormsg, setTotalErrmsg] = useState("");
    const [customername, setCustomerName] = useState("");
    const [invoicenumber, setInvoiceNumber] = useState("");
    const [startdate, setStartDate] = useState(null);
    const [enddate, setEndDate] = useState(null);
    const [invoicedate, setInvoiceDate] = useState(null);
    const [invoiceduedate, setInvoiceDueDate] = useState(null);
    const [formatinvoicedate, setFormatInvoiceDate] = useState(null);
    const [formatduedate, setFormatDueDate] = useState(null);
    const [totalAmount, setTotalAmount] = useState("");
    const [bills, setBills] = useState([]);
    const [newRows, setNewRows] = useState([])
    const [customererrmsg, setCustomerErrmsg] = useState("");
    const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
    const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
    const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
    const [allfielderrmsg, setAllFieldErrmsg] = useState("");
    const [amenityArray, setamenityArray] = useState([]);
    const [recurringbills, setRecurringBills] = useState([]);
    const [account, setAccount] = useState("");
    const [accountError, setAccountError] = useState("");
    const startRef = useRef(null);
    const endRef = useRef(null);
    const invoiceRef = useRef(null);
    const dueRef = useRef(null);
    const [showmanualinvoice, setShowManualInvoice] = useState(false);
    const [showRecurringBillForm, setShowRecurringBillForm] = useState(false);
    const [receiptformShow, setReceiptFormShow] = useState(false);
    const [showAllBill, setShowAllBill] = useState(true);
    const [billrolePermission, setBillRolePermission] = useState("");
    const [billpermissionError, setBillPermissionError] = useState("");
    const [billAddPermission, setBillAddPermission] = useState("");
    const [billDeletePermission, setBillDeletePermission] = useState("");
    const [billEditPermission, setBillEditPermission] = useState("");
    const [recuringbillAddPermission, setRecuringBillAddPermission] = useState("");
    const [recurringPermission, setRecurringPermission] = useState("");
    const [receiptPermission, setReceiptPermission] = useState("");
    const [receiptaddPermission, setReceiptAddPermission] = useState("");
    const [showform, setShowform] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const calendarRef = useRef(null);;
    const [tableErrmsg, setTableErrmsg] = useState("");
    const [value, setValue] = React.useState("1");
    const [DownloadInvoice, setDownloadInvoice] = useState(false);
    const [DownloadReceipt, setDownloadReceipt] = useState(false);
    const [showPdfModal, setShowPdfModal] = useState(false);
    const [showPdfReceiptModal, setShowPdfReceiptModal] = useState(false);
    const [rowData, setRowData] = useState("");
    const [showdeleteform, setShowDeleteform] = useState(false);
    const [billMode, setBillMode] = useState("New Bill");
    const [isEditing, setIsEditing] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [filterInput, setFilterInput] = useState("");
    const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [search, setSearch] = useState(false);
    const [filterStatus, setFilterStatus] = useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));


    const [hostelId, setHostelId] = useState("");
    const [receiptdata, setReceiptData] = useState([]);
    const [receiptLoader, setReceiptLoader] = useState(false);
    const [originalBillsFilter, setOriginalBillsFilter] = useState([]);
    const [originalBillsFilterReceipt, setOriginalBillsFilterReceipt] = useState(
        []
    );
    const [originalBills, setOriginalBills] = useState([]);
    const [originalRecuiring, setOriginalRecuiring] = useState([]);
    const [originalReceipt, setOriginalReceipt] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [dateRange, setDateRange] = useState([null, null]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [startDate, endDate] = dateRange;
    const [checkedRows, setCheckedRows] = useState({});
    // const [manualInvoiceNumberError, setManualInvoiceNumberError] = useState("")
    const [unableAddInvoiceDetailsError, setUnableAddInvoiceDetailsError] = useState("")
    const [name, setName] = useState("")
    const [floor_name, setFloorName] = useState("")
    const [room_name, setRoomName] = useState("")
    const [bed_name, setBedName] = useState("")
    const [profile_pic, setProfilePic] = useState(null)
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const [selectedTransactionId, setSelectedTransactionId] = useState(null);
    const [activeStay, setActiveStay] = useState("long_stay");


    // const canReadInvoice = useHasPermission("Bills", "canRead")
    // const canWriteInvoice = useHasPermission("Bills", "canWrite")
    // const canUpdateInvoice = useHasPermission("Bills", "canUpdate")
    // const canDeleteInvoice = useHasPermission("Bills", "canDelete")


    const {
        canWriteModule: canWriteInvoice,
        canReadModule: canReadInvoice,
        canUpdateModule: canUpdateInvoice,
        canDeleteModule: canDeleteInvoice,
    } = useHasPermission("Bills");









    // const canReadRecurring = useHasPermission("Recurring bills", "canRead")
    // const canWriteRecurring = useHasPermission("Recurring bills", "canWrite")


    const {
        canWriteModule: canWriteRecurring,
        canReadModule: canReadRecurring,
        // canUpdateModule: canUpdateInvoice,
        // canDeleteModule: canDeleteInvoice,
    } = useHasPermission("Recurring bills");





    // const canReadReceipt = useHasPermission("Receipt", "canRead")
    // const canWriteReceipt = useHasPermission("Receipt", "canWrite")


    const {
        canWriteModule: canWriteReceipt,
        canReadModule: canReadReceipt,
        // canUpdateModule: canUpdateInvoice,
        // canDeleteModule: canDeleteInvoice,
    } = useHasPermission("Receipt");




    useEffect(() => {
        if (id && state.UsersList?.Users?.length > 0) {
            const selectedCustomer = state.UsersList.Users.find(
                (u) => u.customerId === id
            );
            if (selectedCustomer) {
                setCustomerName(selectedCustomer.customerId);
            }
        }
    }, [id, state.UsersList?.Users]);



    const handleInvoiceChange = (e) => {
        setInvoiceNumber(e.target.value);
    };

    useEffect(() => {
        if (!canReadInvoice) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [canReadInvoice]);


    const handleClick = (stayType) => {
        setActiveStay(stayType);
    };





    useEffect(() => {
        if (recurringbills?.length > 0) {
            const initialChecked = {};
            recurringbills.forEach(item => {
                initialChecked[item.customerId] = item.Bill_Enable === 1;
            });
            setCheckedRows(initialChecked);
        }
    }, [recurringbills]);












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
        if (state.InvoiceList.NodataReceiptStatusCode === 201) {

            setTimeout(() => {
                setReceiptLoader(false);
                dispatch({ type: "CLEAR_NODATA_RECEIPTS_LIST" });
            }, 100);
        }
    }, [state.InvoiceList.NodataReceiptStatusCode]);

    //   const handleManualShow = () => {
    //     if (!state.login.selectedHostel_Id) {
    //       toast.error('Please add a hostel before adding bill information.', {
    //         hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
    //       });
    //       return;
    //     }
    //     setShowAllBill(false);
    //     setShowManualInvoice(true);
    //     setBillMode("New Bill");
    //     setIsEditing(false);
    //     setInvoiceDetails(null);
    //   };

    //   const handleReceiptShow = () => {
    //     if (!state.login.selectedHostel_Id) {
    //       toast.error('Please add a hostel before adding receipt information.', {
    //         hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
    //       });
    //       return;
    //     }
    //     setShowAllBill(false);
    //     setReceiptFormShow(true);
    //     dispatch({ type: "GET_REFERENCE_ID" });
    //   };


    //   const handleAccount = (selectedOption) => {
    //     setAccount(selectedOption?.value || "");
    //     setAccountError("");
    //     dispatch({ type: "CLEAR_EXPENCE_NETBANKIG" });
    //   };

    //   const handleTransaction = (selectedOption) => {
    //     setInvoiceList({ ...invoiceList, transaction: selectedOption });
    //     setAccountError("");
    //     setPaymodeErrmsg("");
    //     setAccount("");
    //   };


    const bankingOptions = Array.isArray(state.bankingDetails?.bankingList?.listBanks)
        ? state.bankingDetails?.bankingList?.listBanks.map((item) => {
            let label = "";
            if (item.accountType === "BANK") label = "BANK";
            else if (item.accountType === "UPI") label = "UPI";
            else if (item.accountType === "CARD") label = "CARD";
            else if (item.accountType === "CASH") label = "CASH";

            return {
                value: item?.bankingId,
                label: `${item?.accountHolderName} - ${label}`,
            };
        })
        : [];


    const combinedOptions = [...bankingOptions];



    //   const handleInvoiceDetail = (item) => {

    //     if (item.User_Id) {
    //       const originalDate = new Date(item.Date);
    //       const year = originalDate.getFullYear();
    //       const month = (originalDate.getMonth() + 1).toString().padStart(2, "0");
    //       const day = originalDate.getDate().toString().padStart(2, "0");
    //       const newDate = `${year}-${month}-${day}`;

    //       if (
    //         (item.EbAmount === 0 || item.EbAmount === undefined) &&
    //         item.invoice_type === 1 &&
    //         item.AmnitiesAmount === 0
    //       ) {
    //         dispatch({
    //           type: "INVOICEPDF",
    //           payload: {
    //             Date: newDate,
    //             User_Id: item.User_Id,
    //             id: item.id,
    //             hostel_Id: item.Hostel_Id,
    //             invoice_type: item.invoice_type,
    //           },
    //         });
    //       } else if (item.invoice_type === 2) {
    //         dispatch({
    //           type: "INVOICEPDF",
    //           payload: {
    //             User_Id: item.User_Id,
    //             id: item.id,
    //             hostel_Id: item.Hostel_Id,
    //             invoice_type: item.invoice_type,
    //           },
    //         });
    //       } else {
    //         dispatch({
    //           type: "INVOICEPDF",
    //           payload: {
    //             Date: newDate,
    //             User_Id: item.User_Id,
    //             id: item.id,
    //           },
    //         });
    //       }

    //       setShowLoader(true);
    //     }
    //   };



    useEffect(() => {
        if (state.InvoiceList.pdfErrorStatusCode === 201) {
            setLoading(false)
            setShowLoader(false);
            setTimeout(() => {
                dispatch({ type: "REMOVE_PDF_ERROR" });
            }, 100);
        }
    }, [state.InvoiceList.pdfErrorStatusCode]);
    useEffect(() => {
        if (state.createAccount?.networkError) {
            setLoading(false)
            setFormLoading(false)
            setShowLoader(false);
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])










    useEffect(() => {
        if (originalBillsFilter.length === 0 && bills.length > 0) {
            setOriginalBillsFilter(bills);
        }
    }, [bills]);


    const handleStatusFilter = (event) => {
        const selected = event.target.value;
        setStatusfilter(selected);


        if (selected !== "date") {
            setDateRange([null, null]);
        }
    };



    useEffect(() => {
        let filtered = originalBillsFilter;

        if (statusfilter === "All") {
            filtered = originalBillsFilter;
        } else if (statusfilter === "Paid" || statusfilter === "Unpaid") {
            filtered = filtered.filter(
                (user) =>
                    user.status?.trim().toLowerCase() === statusfilter.trim().toLowerCase()
            );
        }
        else if (statusfilter === "date" && startDate && endDate) {
            filtered = filtered.filter((user) => {
                const invoiceDate = new Date(user.Date);

                const invoiceOnlyDate = new Date(invoiceDate.setHours(0, 0, 0, 0));
                const startOnlyDate = new Date(startDate).setHours(0, 0, 0, 0);
                const endOnlyDate = new Date(endDate).setHours(0, 0, 0, 0);

                return (
                    invoiceOnlyDate >= startOnlyDate &&
                    invoiceOnlyDate <= endOnlyDate
                );
            });
        }


        setBills(filtered);
        // setCurrentPage(1)
    }, [statusfilter, startDate, endDate, originalBillsFilter]);



    const [statusFilterReceipt, setStatusFilterReceipt] = useState("");
    const handleStatusFilterReceipt = (event) => {
        const searchTerm = event.target.value;
        setStatusFilterReceipt(searchTerm);
    };

    useEffect(() => {
        if (statusFilterReceipt !== "date") {
            setReceiptDateRange([]);

            if (statusFilterReceipt === "All") {
                setReceiptData(originalBillsFilterReceipt);
            } else {
                const filteredItemsReceipt = originalBillsFilterReceipt.filter((user) => {
                    const mode = user.paymentMode?.toLowerCase() || "";

                    if (statusFilterReceipt === "Cash") return mode.endsWith("-cash");
                    if (statusFilterReceipt === "UPI") return mode.endsWith("-upi");
                    if (statusFilterReceipt === "Bank") return mode.endsWith("-bank");
                    if (statusFilterReceipt === "Card") return mode.endsWith("-card");

                    return false;
                });

                setReceiptData(filteredItemsReceipt);
                // setCurrentReceiptPage(1);
            }
        }
    }, [statusFilterReceipt]);





    const [receiptDateRange, setReceiptDateRange] = useState([]);
    const handleDateRangeChangeReceipt = (dates) => {
        setReceiptDateRange(dates);


        if (!dates || dates.length !== 2) {
            setStatusFilterReceipt("All");
            setReceiptData(originalBillsFilterReceipt);
            return;
        }

        const [start, end] = dates;

        const filtered = originalBillsFilterReceipt.filter((item) => {
            const itemDate = dayjs(item.payment_date);
            return (
                itemDate.isSame(start, 'day') ||
                itemDate.isSame(end, 'day') ||
                (itemDate.isAfter(start) && itemDate.isBefore(end))
            );
        });

        setReceiptData(filtered);
        // setCurrentReceiptPage(1)
    };


    useEffect(() => {
        if (statusFilterReceipt !== "date") {
            setReceiptDateRange([]);
        }
    }, [statusFilterReceipt]);
    useEffect(() => {
        if (statusFilterReceipt === "All") {
            setReceiptData(originalBillsFilterReceipt);
            setReceiptDateRange([]);

        }
    }, [statusFilterReceipt]);


    useEffect(() => {
        if (originalBillsFilterReceipt.length === 0 && receiptdata.length > 0) {
            setOriginalBillsFilterReceipt(receiptdata);
        }
    }, [receiptdata]);




    const formatDateForPayload = (date) => {
        if (!date) return null;
        const offset = date.getTimezoneOffset();
        date.setMinutes(date.getMinutes() - offset);
        return date.toISOString().split("T")[0];
    };


    const [payableAmount, setPayableAmount] = useState("");
    const [balance, setBalance] = useState(0);


    const handleAmount = (e) => {
        let value = e.target.value;

        if (value !== "") {
            let numValue = Number(value);
            if (numValue > (invoiceList.balanceDue || 0)) {
                numValue = invoiceList.balanceDue || 0;
            }
            value = numValue;
            setBalance((invoiceList.balanceDue || 0) - numValue);
        } else {

            setBalance(invoiceList.balanceDue || 0);
        }

        setPayableAmount(value);
        setPayableAmountError("")
        dispatch({ type: 'CLEAR_PAYABLE_AMOUNT' })
    };






    const [editvalue, setEditvalue] = useState("");
    const [receiptedit, setReceiptEdit] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState(false);
    const [totalAmountPayable, setTotalAmountPayable] = useState(0);
    const [nonRefundableAmount, setNonRefundableAmount] = useState(0);
    const [refundableAmount, setRefundableAmount] = useState(0);
    const [payableamountError, setPayableAmountError] = useState("")




    const handleEditReceipt = (item) => {
        setShowAllBill(false);
        setReceiptFormShow(true);
        setEditvalue(item);
        setReceiptEdit(true);
    };

    const handleEdit = (props) => {

        setShowManualInvoice(true);
        setShowAllBill(false);
        setBillMode("Edit Bill");
        setIsEditing(true);
        setInvoiceDetails(null);
        setTimeout(() => {
            setInvoiceDetails(props);
        }, 0);

    };



    useEffect(() => {

        if (invoiceDetails?.ID) {
            setCustomerName(invoiceDetails?.ID);
        }


        if (invoiceDetails?.DueDate) {
            const parsedDate = new Date(invoiceDetails.DueDate);
            if (!isNaN(parsedDate.getTime())) {
                setInvoiceDueDate(parsedDate);
            }
        }

        if (invoiceDetails?.Date) {
            const parsedDate = new Date(invoiceDetails.Date);
            if (!isNaN(parsedDate.getTime())) {
                setInvoiceDate(parsedDate);
            }
        }

        if (invoiceDetails?.start_date) {
            const parsedDate = new Date(invoiceDetails.start_date);
            if (!isNaN(parsedDate.getTime())) {
                setStartDate(parsedDate);
            }
        }

        if (invoiceDetails?.end_date) {
            const parsedDate = new Date(invoiceDetails.end_date);
            if (!isNaN(parsedDate.getTime())) {
                setEndDate(parsedDate);
            }
        }

        setTotalAmount(invoiceDetails?.Amount);

        let newRows = [];

        const existingAmenities = invoiceDetails?.amenity || [];

        const doesAmenityExist = (name) =>
            existingAmenities.some((item) => item.am_name === name);

        if (invoiceDetails?.RoomRent && !doesAmenityExist("Room Rent")) {
            newRows.push({
                "S.No": newRows.length + 1,
                am_name: "Room Rent",
                amount: invoiceDetails.RoomRent,
            });
        }

        if (invoiceDetails?.advance_amount && !doesAmenityExist("Advance Amount")) {
            newRows.push({
                "S.No": newRows.length + 1,
                am_name: "Advance Amount",
                amount: invoiceDetails.advance_amount,
            });
        }

        if (invoiceDetails?.EbAmount && !doesAmenityExist("EB Amount")) {
            newRows.push({
                "S.No": newRows.length + 1,
                am_name: "EB Amount",
                amount: invoiceDetails.EbAmount,
            });
        }

        if (invoiceDetails?.amenity && invoiceDetails.amenity.length > 0) {
            newRows = [
                ...newRows,
                ...invoiceDetails.amenity.map((item, index) => ({
                    "S.No": newRows.length + index + 1,
                    am_name: item.am_name,
                    amount: item.amount,
                })),
            ];
        }



        setNewRows(newRows);
        const types = [];
        newRows.forEach((row) => {
            if (row.am_name === "Room Rent") types.push("RoomRent");
            if (row.am_name === "EB") types.push("EB");
        });
        setSelectedTypes(types);






    }, [invoiceDetails,]);


    useEffect(() => {
        const refundableNames = ["Advance Amount", "EB Amount", "Room Rent", "Advance", "EB", "Room Rent"];
        let total = 0;
        let nonRefundable = 0;

        newRows.forEach((item) => {
            const amt = parseFloat(item.amount) || 0;

            if (refundableNames.includes(item.am_name)) {
                total += amt;
            }
            if (!refundableNames.includes(item.am_name)) {
                nonRefundable += amt;
            }
        });

        setTotalAmountPayable(total);
        setNonRefundableAmount(nonRefundable);
        setRefundableAmount(total - nonRefundable);
    }, [newRows]);




    // const handleBillDelete = (props) => {
    //     setShowDeleteform(true);
    //     setDeleteId(props.item.id);
    // };

    // const handleBillDeleted = () => {
    //     dispatch({
    //         type: "MANUAL-INVOICE-DELETE",
    //         payload: {
    //             id: deleteId,
    //         },
    //     });
    //     setShowDeleteform(false);
    // };

    useEffect(() => {
        if (customername) {
            dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: customername } });
        }
    }, [customername])


    // console.log("selectedTypes", selectedTypes);

    useEffect(() => {
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
                // console.log("prev selectedTypes:", prev);
                const updated = prev.includes("RoomRent")
                    ? prev
                    : [...prev, "RoomRent"];
                // console.log("updated selectedTypes:", updated);
                return updated;
            });


            // console.log("selectedTypes", selectedTypes)

            setTimeout(() => {
                dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
            }, 500);
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


    // useEffect(() => {
    //     console.log("selectedTypes updated:", selectedTypes);
    // }, [selectedTypes]);


    // const handleShowForm = (props) => {
    //     setShowform(true);
    //     setInvoiceValue(props.item);

    //     if (props.item.invoiceId !== undefined) {

    //         const dateObject = new Date(props.item.Date);
    //         const year = dateObject.getFullYear();
    //         const month = dateObject.getMonth() + 1;
    //         const day = dateObject.getDate();

    //         const lastDayOfMonth = new Date(year, month, 0);
    //         const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(
    //             lastDayOfMonth.getMonth() + 1
    //         ).padStart(2, "0")}-${String(lastDayOfMonth.getDate()).padStart(2, "0")}`;

    //         // let value = props.item.Name.split(" ");
    //         setSelectedUserId(props.item.customerId);
    //         const userDetails = state?.UsersList?.Users.filter((u) => u.customerId === props?.item?.customerId)

    //         setName(props.item?.fullName)
    //         setFloorName(userDetails[0]?.floorName)
    //         setRoomName(userDetails[0]?.roomName)
    //         setBedName(userDetails[0]?.bedName)
    //         setProfilePic(userDetails[0]?.profilePic)

    //         const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
    //             day
    //         ).padStart(2, "0")}`;
    //         setInvoiceList({
    //             id: props.item?.id,
    //             firstName: props.item?.firstName,
    //             lastName: props.item?.lastName,
    //             phone: props.item?.phoneNo,
    //             email: props.item?.EmailID,
    //             hostel_Name: props.item?.Hostel_Name,
    //             hostel_Id: props.item?.Hostel_Id,
    //             FloorNo: props?.item?.Floor_Id,
    //             RoomNo: props?.item?.Room_No,
    //             date: formattedDate,
    //             amount: props.item?.invoiceAmount,
    //             paidAmount: props.item?.paidAmount,
    //             balanceDue: props.item?.dueAmount === 0 ? "00" : props.item?.dueAmount,
    //             dueDate: formattedDueDate,
    //             InvoiceId: props.item?.invoiceId,
    //             invoice_type: props.item?.invoiceType,
    //         });

    //     } else {
    //         setSelectedUserId("");
    //     }
    // }

    // const handleCloseForm = () => {

    //     setPaymodeErrmsg("")
    //     setAccountError("")
    //     setDateErrmsg("")
    //     setAmountErrmsg("")
    //     setShowform(false);
    //     setBalance("")
    //     setSelectedDate(null);
    //     setAmountErrmsg("");
    //     setDateErrmsg("");
    //     setPaymodeErrmsg("");
    //     setPayableAmount("")
    //     setPayableAmountError("")
    //     // setManualInvoiceNumberError("")
    //     setUnableAddInvoiceDetailsError("")
    //     dispatch({ type: 'CLEAR_PAYABLE_AMOUNT' })
    //     dispatch({ type: 'CLEAR_INVALID_DETAILS_ERROR' })
    //     dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
    //     setInvoiceList({
    //         firstName: "",
    //         lastName: "",
    //         phone: "",
    //         email: "",
    //         hostel_Name: "",
    //         hostel_Id: "",
    //         FloorNo: "",
    //         RoomNo: "",
    //         amount: "",
    //         balanceDue: "",
    //         dueDate: "",
    //         transaction: "",
    //         paymentType: "",
    //     });
    //     // setSelectedDate(null);
    // };


    // const handleCloseDeleteform = () => {
    //     setShowDeleteform(false);
    // };


    // const handleSaveInvoiceList = () => {
    //     const formatpaiddate = formatDateForPayload(selectedDate);
    //     const billDate = new Date(invoiceValue.Date);
    //     const paidDate = new Date(formatpaiddate);

    //     if (!payableAmount) {
    //         setAmountErrmsg("Please Enter Amount");
    //     }

    //     if (!formatpaiddate) {
    //         setDateErrmsg("Please Select Date");
    //     } else if (paidDate < billDate) {
    //         setDateErrmsg("Paid date should not be before Bill date");
    //         return;
    //     } else {
    //         setDateErrmsg("");
    //     }

    //     if (!invoiceList.transaction || invoiceList.transaction === "select") {
    //         setPaymodeErrmsg("Please Select Transaction Type");
    //         return;
    //     }

    //     if (invoiceList.transaction === "Net Banking" && !account) {
    //         setAccountError("Please Choose Bank Account");
    //         return;
    //     }

    //     if (
    //         !payableAmount ||
    //         !formatpaiddate ||
    //         !invoiceList.transaction
    //     ) {
    //         setTimeout(() => {
    //             setTotalErrmsg("");
    //         }, 1000);
    //         return;
    //     }



    //     if (
    //         invoiceList.InvoiceId &&
    //         payableAmount &&
    //         invoiceList.transaction &&
    //         formatpaiddate && hostelId
    //     ) {
    //         dispatch({
    //             type: "RECORD_PAYMENT",
    //             payload: {
    //                 hostelId: hostelId,
    //                 invoiceId: invoiceList.InvoiceId,
    //                 data: {
    //                     bankId: invoiceList.transaction,
    //                     paymentDate: formatpaiddate,
    //                     referenceId: "",
    //                     amount: payableAmount
    //                 }
    //             },
    //         });




    //     }
    //     setFormRecordLoading(true)
    // };

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
        setShowManualInvoice(false);
        setShowRecurringBillForm(false);
        setReceiptFormShow(false);
        setShowAllBill(true);
        setEditvalue("");
        setReceiptEdit(false);
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
        setamenityArray([]);
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

    //  useEffect(() => {
    //     if (state.UsersList.userRoomfor) {
    //       // setIsEditing(true);
    //       setRoomDetail(false);

    //       // dispatch({ type: "USERROOMAVAILABLEFALSE" });
    //     }
    //   }, [state.UsersList.userRoomfor]);


    const formatDateForPayloadmanualinvoice = (date) => {
        return dayjs(date).format("YYYY-MM-DD");
    };





    const handleInvoiceDate = (selectedDate) => {
        setAllFieldErrmsg("");

        if (!selectedDate) {
            setInvoiceDate(null);
            setInvoiceDateErrmsg("Please Select Date");
            return;
        }

        setInvoiceDate(selectedDate);
        setInvoiceDateErrmsg("");

        const formattedDate = formatDateForPayloadmanualinvoice(selectedDate);
        setFormatInvoiceDate(formattedDate);
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

        const formattedDate = formatDateForPayloadmanualinvoice(date);
        setFormatDueDate(formattedDate);
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
    const [dropdownValue, setDropdownValue] = useState("");
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

        const selectedUser = state.UsersList.Users.find(item => item.customerId === customername);


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
        const rentAmount = newRows
            .filter((row) => row.am_name?.toLowerCase() === "room rent")
            .reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

        const ebAmount = newRows
            .filter((row) => row.am_name?.toLowerCase() === "eb")
            .reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

        const amenityAmount = newRows
            .filter(
                (row) =>
                    row.am_name?.toLowerCase() !== "room rent" &&
                    row.am_name?.toLowerCase() !== "eb"
            )
            .reduce((sum, row) => sum + parseFloat(row.amount || 0), 0);

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

    const handleEditBill = () => {
        let isValid = true;
        let hasError = false;


        setCustomerErrmsg("");
        setInvoicenumberErrmsg("");
        setInvoiceDateErrmsg("");
        setInvoiceDueDateErrmsg("");
        setAllFieldErrmsg("");


        if (!customername) {
            setCustomerErrmsg("Please Select Tenant");
            isValid = false;
        }


        if (!invoicenumber) {
            setInvoicenumberErrmsg("Please Enter Invoice Number");
            isValid = false;
        }


        if (!invoicedate) {
            setInvoiceDateErrmsg("Please Select Invoice Date");
            isValid = false;
        }


        if (!invoiceduedate) {
            setInvoiceDueDateErrmsg("Please Select Due Date");
            isValid = false;
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


        const selectedUser = state.UsersList.Users.find(item => item.customerId === customername);



        if (selectedUser) {
            const joiningDate = dayjs(selectedUser.user_join_date).format("YYYY-MM-DD");
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

        let isValiding = true;
        if (
            !customername ||
            !invoicenumber ||
            !invoicedate ||
            !invoiceduedate

        ) {
            setAllFieldErrmsg("Please Fill Out All Required Fields");
            isValiding = false;
        }


        const formatDate = (date) => {
            if (!date) return "";
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        };


        const isChanged = (() => {
            const userChanged = Number(invoiceDetails?.hos_user_id) !== Number(customername);
            const invoiceChanged = String(invoiceDetails?.Invoices) !== String(invoicenumber);
            const invoiceDateChanged = formatDate(invoiceDetails?.Date) !== formatDate(invoicedate);
            const dueDateChanged = formatDate(invoiceDetails?.DueDate) !== formatDate(invoiceduedate);
            const rowsCountChanged = newRows.length !== invoiceDetails?.amenity?.length;

            const amenitiesChanged = newRows.some((row, index) => {
                const originalRow = invoiceDetails?.amenity?.[index] || {};
                return row.am_name !== originalRow.am_name || row.amount !== originalRow.amount;
            });

            return (
                userChanged ||
                invoiceChanged ||
                invoiceDateChanged ||
                dueDateChanged ||
                rowsCountChanged ||
                amenitiesChanged
            );
        })();


        if (!isChanged) {
            setAllFieldErrmsg("No Changes Detected");
            return;
        }


        if (isValid && isValiding && isChanged) {
            const formattedInvoiceDate = formatDate(invoicedate);
            const formattedDueDate = formatDate(invoiceduedate);
            setFormLoading(true)
            dispatch({
                type: "MANUAL-INVOICE-EDIT",
                payload: {
                    user_id: customername,
                    date: formattedInvoiceDate,
                    due_date: formattedDueDate,
                    id: invoiceDetails.id,
                    amenity: amenityArray.length > 0 ? amenityArray : [],
                },
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

    // const pageSizeOptions = [
    //   { value: 10, label: "10" },
    //   { value: 50, label: "50" },
    //   { value: 100, label: "100" },
    // ];

    // const [currentPage, setCurrentPage] = useState(1);
    // const [itemsPerPage, setItemsPerPage] = useState(10);
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // const currentItems =
    //   filterInput.length > 0
    //     ? bills
    //     : bills?.slice(indexOfFirstItem, indexOfLastItem);

    // const totalPages = Math.ceil(bills.length / itemsPerPage);
    // const handlePageChange = (pageNumber) => {
    //   setCurrentPage(pageNumber);
    // };

    // const handleItemsPerPageChange = (selectedOption) => {
    //   if (selectedOption) {
    //     setItemsPerPage(Number(selectedOption.value));
    //     setCurrentPage(1);
    //   }
    // };

    // const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    // const sortedData = React.useMemo(() => {
    //   if (!sortConfig.key) return currentItems;

    //   const sorted = [...currentItems].sort((a, b) => {
    //     const valueA = a[sortConfig.key];
    //     const valueB = b[sortConfig.key];


    //     if (!isNaN(valueA) && !isNaN(valueB)) {
    //       return sortConfig.direction === 'asc'
    //         ? valueA - valueB
    //         : valueB - valueA;
    //     }

    //     if (typeof valueA === 'string' && typeof valueB === 'string') {
    //       return sortConfig.direction === 'asc'
    //         ? valueA.localeCompare(valueB)
    //         : valueB.localeCompare(valueA);
    //     }

    //     return 0;
    //   });

    //   return sorted;
    // }, [currentItems, sortConfig]);
    // const handleSort = (key, direction) => {
    //   setSortConfig({ key, direction });
    // };

    const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return bills;

        return [...bills].sort((a, b) => {
            const valueA = a[sortConfig.key];
            const valueB = b[sortConfig.key];

            if (!isNaN(valueA) && !isNaN(valueB)) {
                return sortConfig.direction === "asc" ? valueA - valueB : valueB - valueA;
            }

            if (typeof valueA === "string" && typeof valueB === "string") {
                return sortConfig.direction === "asc"
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            return 0;
        });
    }, [bills, sortConfig]);

    const handleSort = (key, direction) => {
        setSortConfig({ key, direction });
    };



    // const [currentRecurePage, setCurrentRecurePage] = useState(1);
    // const [itemsPage, setItemsPage] = useState(10);
    // const indexOfLastItemRecure = currentRecurePage * itemsPage;
    // const indexOfFirstItemRecure = indexOfLastItemRecure - itemsPage;


    // const currentItem =
    //   filterInput.length > 0
    //     ? recurringbills
    //     : recurringbills?.slice(indexOfFirstItemRecure, indexOfLastItemRecure);

    // // const filteredBills = recurringbills.filter(
    // //   (bill) => bill.stay_type === (activeStay)
    // // );

    // // const currentItem =
    // //   filterInput.length > 0
    // //     ? filteredBills
    // //     : filteredBills.slice(indexOfFirstItemRecure, indexOfLastItemRecure);







    // const handlePageChangeRecure = (pageNumber) => {
    //   setCurrentRecurePage(pageNumber);
    // };
    // const handleItemsPerPage = (selectedOption) => {
    //   setItemsPage(Number(selectedOption.value));
    //   setCurrentRecurePage(1);
    // };




    // const [sortConfigRecure, setSortConfigRecure] = useState({ key: null, direction: null });

    // const sortedDataRecure = React.useMemo(() => {
    //   if (!sortConfigRecure.key) return currentItem;

    //   const sorted = [...currentItem].sort((a, b) => {
    //     const valueA = a[sortConfigRecure.key];
    //     const valueB = b[sortConfigRecure.key];


    //     if (!isNaN(valueA) && !isNaN(valueB)) {
    //       return sortConfigRecure.direction === 'asc'
    //         ? valueA - valueB
    //         : valueB - valueA;
    //     }

    //     if (typeof valueA === 'string' && typeof valueB === 'string') {
    //       return sortConfigRecure.direction === 'asc'
    //         ? valueA.localeCompare(valueB)
    //         : valueB.localeCompare(valueA);
    //     }

    //     return 0;
    //   });

    //   return sorted;
    // }, [currentItem, sortConfigRecure]);

    const [sortConfigRecure, setSortConfigRecure] = useState({ key: null, direction: null });

    const sortedDataRecure = React.useMemo(() => {
        // If no sorting key, just return the full data
        if (!sortConfigRecure.key) return recurringbills;

        // Sort the full recurringbills array
        return [...recurringbills].sort((a, b) => {
            const valueA = a[sortConfigRecure.key];
            const valueB = b[sortConfigRecure.key];

            // Numeric sorting
            if (!isNaN(valueA) && !isNaN(valueB)) {
                return sortConfigRecure.direction === 'asc' ? valueA - valueB : valueB - valueA;
            }

            // String sorting
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortConfigRecure.direction === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            return 0;
        });
    }, [recurringbills, sortConfigRecure]);

    const handleSortRecure = (key, direction) => {
        setSortConfigRecure({ key, direction });
    };

    // const totalPage = Math.ceil(recurringbills.length / itemsPage);


    // const [currentreceiptPage, setCurrentReceiptPage] = useState(1);
    // const [itemsperPage, setItemsPERPage] = useState(10);
    // const indexOfLastItemReceipt = currentreceiptPage * itemsperPage;
    // const indexOfFirstItemReceipt = indexOfLastItemReceipt - itemsperPage;

    // const currentReceiptData =
    //   filterInput.length > 0
    //     ? receiptdata
    //     : receiptdata?.slice(indexOfFirstItemReceipt, indexOfLastItemReceipt);

    // const handlePageChangeReceipt = (pageNumber) => {
    //   setCurrentReceiptPage(pageNumber);
    // };


    // const [sortConfigReceipt, setSortConfigReceipt] = useState({ key: null, direction: null });

    // const sortedDataReceipt = React.useMemo(() => {
    //   if (!sortConfigReceipt.key) return currentReceiptData;

    //   const sorted = [...currentReceiptData].sort((a, b) => {
    //     const valueA = a[sortConfigReceipt.key];
    //     const valueB = b[sortConfigReceipt.key];


    //     if (!isNaN(valueA) && !isNaN(valueB)) {
    //       return sortConfigReceipt.direction === 'asc'
    //         ? valueA - valueB
    //         : valueB - valueA;
    //     }

    //     if (typeof valueA === 'string' && typeof valueB === 'string') {
    //       return sortConfigReceipt.direction === 'asc'
    //         ? valueA.localeCompare(valueB)
    //         : valueB.localeCompare(valueA);
    //     }

    //     return 0;
    //   });

    //   return sorted;
    // }, [currentReceiptData, sortConfigReceipt]);


    // const handleItemsPerPageReceipt = (selectedOption) => {
    //   setItemsPERPage(Number(selectedOption.value));
    //   setCurrentReceiptPage(1);
    // };
    // const receiptPageOptions = [
    //   { value: 10, label: "10" },
    //   { value: 50, label: "50" },
    //   { value: 100, label: "100" },
    // ];

    // const ReceipttotalPages = Math.ceil(receiptdata.length / itemsperPage);

    //   const handleSortReceipt = (key, direction) => {
    //   setSortConfigReceipt({ key, direction });
    // };

    const [sortConfigReceipt, setSortConfigReceipt] = useState({ key: null, direction: null });

    const sortedDataReceipt = React.useMemo(() => {
        if (!sortConfigReceipt.key) return receiptdata;

        return [...receiptdata].sort((a, b) => {
            const valueA = a[sortConfigReceipt.key];
            const valueB = b[sortConfigReceipt.key];

            if (!isNaN(valueA) && !isNaN(valueB)) {
                return sortConfigReceipt.direction === 'asc' ? valueA - valueB : valueB - valueA;
            }

            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return sortConfigReceipt.direction === 'asc'
                    ? valueA.localeCompare(valueB)
                    : valueB.localeCompare(valueA);
            }

            return 0;
        });
    }, [receiptdata, sortConfigReceipt]);

    const handleSortReceipt = (key, direction) => {
        setSortConfigReceipt({ key, direction });
    };



    const handleDeleteRecurringbills = (item) => {
        if (item) {
            dispatch({
                type: "DELETE-RECURRING-BILLS",
                payload: { id: item.recuire_id, user_id: item.user_id },
            });
        }
    };





    const handleDisplayInvoiceDownload = (isVisible, rowData) => {
        setDownloadInvoice(isVisible);
        setShowPdfModal(true);
        setRowData(rowData);
        setSelectedInvoiceId(rowData.invoiceId);
        if (rowData) {
            dispatch({ type: 'GETPARTICULARBILLSDETAILS', payload: { hostelId: rowData.hostelId, invoiceId: rowData.invoiceId } })

        }
        // dispatch({ type: 'BILL_PDF_DETAILS', payload: { bill_id: rowData.id } })
    };


    const handleDisplayReceiptDownload = (isVisible, rowData) => {
        setDownloadReceipt(isVisible);
        setShowPdfReceiptModal(true);
        setRowData(rowData);
        setSelectedTransactionId(rowData?.transactionId);
        if (rowData?.transactionId && state.login.selectedHostel_Id) {

            dispatch({ type: "RECEIPTPDF_NEWCHANGES", payload: { hostelId: state.login.selectedHostel_Id, transactionId: rowData.transactionId } })
        }

    };

    useEffect(() => {
        if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
            setTimeout(() => {
                dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
            }, 500);
        }

    }, [state.InvoiceList.statusCodeNewReceiptStatusCode])




    const handleClosePdfReceipt = () => {
        setDownloadReceipt(false);
    };

    const handleClosePdfModal = () => {
        setDownloadInvoice(false);
    };

    // useEffect(() => {
    //     if (hostelId) {
    //         dispatch({ type: "BANKINGLIST", payload: hostelId });
    //     }
    // }, [hostelId]);

    // useEffect(() => {
    //     if (state.bankingDetails.statusCodeForGetBanking === 200) {
    //         setBanking(state.bankingDetails.bankingList.banks);
    //         setTimeout(() => {
    //             dispatch({ type: "CLEAR_BANKING_LIST" });
    //         }, 200);
    //     }
    // }, [state.bankingDetails.statusCodeForGetBanking]);

    useEffect(() => {
        if (state.InvoiceList.payapleAmountError) {
            setFormRecordLoading(false)
            setFormLoading(false)
            setLoading(false)
            setPayableAmountError(state.InvoiceList.payapleAmountError)

        }

    }, [state.InvoiceList.payapleAmountError])

    // useEffect(() => {
    //   if (state.InvoiceList.ManualInvoiceNumberError) {
    //     setFormLoading(false)
    //     setLoading(false)
    //     setManualInvoiceNumberError(state.InvoiceList.ManualInvoiceNumberError)

    //   }

    // }, [state.InvoiceList.ManualInvoiceNumberError])

    useEffect(() => {
        if (state.InvoiceList?.unableAddInvoiceDetailsError) {
            setFormLoading(false)
            setLoading(false)
            setUnableAddInvoiceDetailsError(state.InvoiceList.unableAddInvoiceDetailsError)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
            }, 3000)

        }

    }, [state.InvoiceList.unableAddInvoiceDetailsError])


    useEffect(() => {
        if (state.InvoiceList.RecordPaymentUpdateStatusCode === 200) {
            setPayableAmount("")
            setBalance("")
            setSelectedDate(null);
            setFormRecordLoading(false)
            setShowform(false)
                 dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })


            dispatch({ type: "RECEIPTSLIST", payload: hostelId });

            setTimeout(() => {
                dispatch({ type: "CLEAR_RECORD_PAYMENT" });
            }, 300);
        }
    }, [state.InvoiceList.RecordPaymentUpdateStatusCode]);

    useEffect(() => {
        setBillRolePermission(state.createAccount.accountList);
    }, [state.createAccount.accountList]);


    useEffect(() => {
        const userType = billrolePermission[0]?.user_details?.user_type;
        const isAdmin = userType === "admin" || userType === "agent";
        if (isAdmin) {
            if (state?.login?.planStatus === 0) {

                setBillPermissionError("");
                setBillAddPermission("Permission Denied");
                setBillEditPermission("Permission Denied");
                setBillDeletePermission("Permission Denied");

                setRecurringPermission("");
                setRecuringBillAddPermission("Permission Denied");

                setReceiptPermission("");
                setReceiptAddPermission("Permission Denied");


            } else if (state?.login?.planStatus === 1) {
                setBillPermissionError("");
                setBillAddPermission("");
                setBillEditPermission("");
                setBillDeletePermission("");
                setRecuringBillAddPermission("");
                setRecurringPermission("");
                setReceiptPermission("");
                setReceiptAddPermission("");
            }
        }

    }, [state?.login?.planStatus, state.login?.selectedHostel_Id, billrolePermission])










    // useEffect(() => {
    //   if (hostelId) {
    //       dispatch({ type: "BANKINGLIST", payload: hostelId  });
    //   }
    // }, [hostelId]);



    useEffect(() => {
        if (
            state.InvoiceList.InvoiceListStatusCode === 200 ||
            state.InvoiceList.statusCodeForPDf === 200 ||
            state.InvoiceList.statusCodeForReceiptPDf === 200
        ) {
            setLoading(false)
            setShowLoader(false);
            setTimeout(() => {
                dispatch({ type: "CLEAR_INVOICE_LIST" });
            }, 100);

            setTimeout(() => {
                dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
            }, 200);

            setTimeout(() => {
                dispatch({ type: "CLEAR_RECEIPT_PDF_STATUS_CODE" });
            }, 200);
        }
    }, [
        state.InvoiceList?.InvoiceListStatusCode,
        state.InvoiceList?.statusCodeForPDf,
        state.InvoiceList.statusCodeForReceiptPDf,
    ]);



    useEffect(() => {
        if (
            state.login.UpdateNotificationMessage !== null &&
            state.login.UpdateNotificationMessage !== ""
        ) {

            setTimeout(() => {
                dispatch({ type: "AFTER_UPDATE_NOTIFICATION", message: null });

            }, 100);
        }
    }, [state.login.UpdateNotificationMessage]);



    const sendWhatsAppMessage = async (type) => {
        const isInvoice = type === "invoice";

        const pdfUrl = isInvoice ? state.InvoiceList.invoicePDF : state.InvoiceList.ReceiptPDF;
        const statusCode = isInvoice ? state.InvoiceList?.statusCodeForPDf : state.InvoiceList?.statusCodeForReceiptPDf;
        const isWhatsAppEnabled = state.InvoiceList.whatsappSettings?.[isInvoice ? 1 : 2];
        const receiptData = isInvoice
            ? state.InvoiceList.BillsPdfDetails
            : state.InvoiceList.newReceiptchanges?.receipt ?? state.InvoiceList.BillsPdfDetails;

        if (statusCode === 200 && pdfUrl && state.InvoiceList.triggeredBy === "whatsapp") {
            setShowLoader(false);

            if (!isWhatsAppEnabled) {
                Swal.fire({
                    icon: "info",
                    text: `WhatsApp notification for ${isInvoice ? "Bills" : "Deposit Receipt"} is not enabled. Please enable it in Settings > Notifications.`,
                });
                return;
            }

            setLoading(true);

            try {
                const parsedUrl = new URL(pdfUrl);
                const filename = parsedUrl.pathname.slice(1);
                const userName = receiptData?.user_details?.name || '';
                let userPhone = receiptData?.user_details?.phone?.toString() || '';

                if (!userPhone.startsWith("+91")) {
                    userPhone = userPhone.startsWith("91") ? "+" + userPhone : "+91" + userPhone;
                }

                const response = await AxiosConfig.post("/send-whatsapp", {
                    to: userPhone,
                    templateName: "invoice_notification",
                    parameters: [userName, filename],
                });

                if (response.data.statusCode === 200) {
                    Swal.fire({
                        icon: "success",
                        text: response.data.message,
                    });
                } else {
                    Swal.fire({
                        icon: "warning",
                        text: "Unexpected response from server.",
                    });
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    text: error.response?.data?.error || "Failed to send WhatsApp message",
                });
            } finally {
                setLoading(false);
            }

            dispatch({ type: isInvoice ? "CLEAR_INVOICE_PDF_STATUS_CODE" : "CLEAR_RECEIPT_PDF_STATUS_CODE" });
        } else if (statusCode === 200 && pdfUrl) {
            const pdfWindow = window.open("", "_blank");
            if (pdfWindow) {
                pdfWindow.location.href = pdfUrl;
            }
            dispatch({ type: isInvoice ? "CLEAR_INVOICE_PDF_STATUS_CODE" : "CLEAR_RECEIPT_PDF_STATUS_CODE" });
        }
    };



    useEffect(() => {
        sendWhatsAppMessage("invoice");
    }, [state.InvoiceList?.statusCodeForPDf, state.InvoiceList.triggeredBy, state.InvoiceList.whatsappSettings]);

    useEffect(() => {
        sendWhatsAppMessage("receipt");
    }, [state.InvoiceList?.statusCodeForReceiptPDf, state.InvoiceList.triggeredBy, state.InvoiceList.whatsappSettings]);

    useEffect(() => {
        if (selectedUserId) {
            const filteredDetails = state.UsersList?.Users?.find(
                (item) => item.User_Id === selectedUserId
            );
            if (filteredDetails) {

                setInvoiceList({
                    ...invoiceList,
                    firstName: filteredDetails.Name.split(" ")[0] || "",
                    lastName: filteredDetails.Name.split(" ")[1] || "",
                    phone: filteredDetails.Phone || "",
                    email: filteredDetails.Email || "",
                    hostel_Name: filteredDetails.HostelName || "",
                    hostel_Id: filteredDetails.Hostel_Id || "",
                    FloorNo: filteredDetails.Floor || "",
                    RoomNo: filteredDetails.Rooms || "",
                });
            }

        }

    }, [selectedUserId, state.UsersList?.Users, state.InvoiceList?.Invoice]);


    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.flatpickr.set(options);

        }
    }, [selectedDate]);



    useEffect(() => {
        if (hostelId) {
            dispatch({ type: "USERLIST", payload: { hostel_id: hostelId } });
        }
    }, [hostelId]);



    useEffect(() => {
        if (state.InvoiceList.manualInvoiceAddStatusCode === 201) {
            setShowManualInvoice(false)
            setFormLoading(false)
            setShowRecurringBillForm(false);
            setReceiptFormShow(false);
            setShowAllBill(true);
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
            setLoading(false);

            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });
                setLoading(false);

            }, 300);
        }
    }, [state.InvoiceList.manualInvoiceAddStatusCode]);

    useEffect(() => {
        setBills(state.InvoiceList.ManualInvoices);
    }, [state.InvoiceList.ManualInvoices,])







    useEffect(() => {
        if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
            setShowManualInvoice(false)
            setFormLoading(false)
            setShowRecurringBillForm(false);
            setReceiptFormShow(false);
            setShowAllBill(true);
                 dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

            setLoading(false);

            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
                setLoading(false);

                setBills(state.InvoiceList.ManualInvoices);
            }, 100);
        }
    }, [
        state.InvoiceList.manualInvoiceEditStatusCode,
        state.InvoiceList.ManualInvoices,
    ]);
    useEffect(() => {
        if (state.InvoiceList.manualInvoiceDeleteStatusCode === 200) {
                dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

            setLoading(false);

            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE" });

                setBills(state.InvoiceList.ManualInvoices);
            }, 100);
        }
    }, [
        state.InvoiceList.manualInvoiceDeleteStatusCode,
        state.InvoiceList.ManualInvoices,
    ]);

    useEffect(() => {
        if (state.InvoiceList?.InvoiceListStatusCode === 200) {
            setLoading(false);

            setBills(state.InvoiceList.ManualInvoices);
            setTimeout(() => {
                dispatch({ type: "CLEAR_INVOICE_LIST" });
            }, 1000);
        }
    }, [state.InvoiceList?.InvoiceListStatusCode]);

    useEffect(() => {
        if (state.InvoiceList.message !== "" && state.InvoiceList.message !== null) {
               dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })

            setBills(state.InvoiceList.ManualInvoices);
            setTimeout(() => {
                dispatch({ type: "CLEAR_INVOICE_UPDATE_LIST" });
            }, 100);
        }
    }, [state.InvoiceList]);

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

            setamenityArray(allRows);

            const Total_amout = allRows.reduce(
                (sum, item) => sum + parseFloat(item.amount || 0),
                0
            );

            setTotalAmount(Total_amout);
        }
    }, [newRows]);

    // useEffect(() => {

    //     if (hostelId) {
    //         setRecurLoader(true);
    //        dispatch({ type: "RECURRING-BILLS-LIST", payload:state.login?.selectedHostel_Id })
    //     }
    // }, [hostelId, activeStay]);

    useEffect(() => {
        if (state.InvoiceList.RecurringbillsgetStatuscode === 200) {
            setRecurringBills(state.InvoiceList.RecurringBills);
            setOriginalRecuiring(state.InvoiceList.RecurringBills)
            setRecurLoader(false);
            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_LIST" });
            }, 100);
        }
    }, [state.InvoiceList.RecurringbillsgetStatuscode]);

    useEffect(() => {
        if (
            state.InvoiceList.RecurringBillAddStatusCode === 200 ||
            state.InvoiceList.deleterecurringbillsStatuscode
        ) {
            dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })
            setRecurringBills(state.InvoiceList.RecurringBills);

            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_RECURRING_BILLS_ADD" });
            }, 1000);

            setTimeout(() => {
                dispatch({ type: "CLEAR_DELETE_RECURRINGBILLS_STATUS_CODE" });
            }, 1000);
        }
    }, [
        state.InvoiceList.RecurringBillAddStatusCode,
        state.InvoiceList.deleterecurringbillsStatuscode,
    ]);



    // useEffect(() => {
    //     if (value === "1") {
    //         const FilterUser = Array.isArray(bills)
    //             ? bills.filter((item) =>
    //                 item.Name?.toLowerCase().includes(filterInput.toLowerCase())
    //             )
    //             : [];

    //         setBills(FilterUser);
    //     }

    //     if (value === "2") {
    //         const FilterUsertwo = Array.isArray(recurringbills)
    //             ? recurringbills.filter((item) =>
    //                 item.user_name?.toLowerCase().includes(filterInput.toLowerCase())
    //             )
    //             : [];

    //         setRecurringBills(FilterUsertwo);
    //     }

    //     if (value === "3") {
    //         const FilterUserReceipt = Array.isArray(receiptdata)
    //             ? receiptdata.filter((item) =>
    //                 item.Name?.toLowerCase().includes(filterInput.toLowerCase())
    //             )
    //             : [];

    //         setReceiptData(FilterUserReceipt);
    //     }
    // }, [filterInput, value]);

    // const handlefilterInput = (e) => {
    //     setFilterInput(e.target.value);
    //     setDropdownVisible(e.target.value.length > 0);

    //     setBills(originalBills);
    //     setRecurringBills(originalRecuiring);
    //     setReceiptData(originalReceipt);

    // };

    // const handleUserSelect = (user) => {
    //     const searchItem = user.Name
    //     setFilterInput(user.Name);

    //     if (searchItem !== "") {
    //         const filteredItems =
    //             state.InvoiceList.ManualInvoices &&
    //             state.InvoiceList.ManualInvoices.filter(
    //                 (user) =>
    //                     user.Name &&
    //                     user.Name.toLowerCase().includes(searchItem.toLowerCase())
    //             );
    //         setBills(filteredItems);

    //     } else {
    //         setBills(state.InvoiceList.ManualInvoices);
    //     }
    //     // setCurrentPage(1);
    //     setDropdownVisible(false);
    // };






    // const handleCloseSearch = () => {
    //     setDropdownVisible(false);
    //     setSearch(false);
    //     setFilterInput("");

    //     setBills(bills);
    //     setRecurringBills(originalRecuiring);
    //     setReceiptData(originalReceipt);
    //     dispatch({ type: "MANUALINVOICESLIST", payload: hostelId })
    // };


    // useEffect(() => {
    //     if (receiptdata?.length > 0 && originalReceipt?.length === 0) {
    //         setOriginalReceipt(receiptdata);
    //     }
    // }, [receiptdata]);
    // useEffect(() => {
    //     if (bills.length > 0 && originalBills.length === 0) {
    //         setOriginalBills(bills);
    //     }
    // }, [bills]);

    // useEffect(() => {
    //     if (recurringbills.length > 0 && originalRecuiring.length === 0) {
    //         setOriginalRecuiring(recurringbills);
    //     }
    // }, [recurringbills]);
    // const handleSearch = () => {
    //     setSearch(!search);

    // };

    // const handleUserRecuire = (user) => {
    //     setFilterInput(user.user_name);
    //     const searchItem = user.user_name

    //     if (searchItem !== "") {
    //         const filteredItems =
    //             state.InvoiceList.RecurringBills &&
    //             state.InvoiceList.RecurringBills.filter(
    //                 (user) =>
    //                     user.user_name &&
    //                     user.user_name.toLowerCase().includes(searchItem.toLowerCase())
    //             );
    //         setRecurringBills(filteredItems);

    //     } else {
    //         setRecurringBills(state.InvoiceList.RecurringBills);
    //     }
    //     // setCurrentPage(1);

    //     setDropdownVisible(false);
    // };




    // const handleUserReceipt = (user) => {
    //     setFilterInput(user.Name);


    //     const searchItem = user.Name

    //     if (searchItem !== "") {
    //         const filteredItems =
    //             state.InvoiceList.ReceiptList &&
    //             state.InvoiceList.ReceiptList.filter(
    //                 (user) =>
    //                     user.Name &&
    //                     user.Name.toLowerCase().includes(searchItem.toLowerCase())
    //             );
    //         setReceiptData(filteredItems);

    //     } else {
    //         setReceiptData(state.InvoiceList.ReceiptList);
    //     }
    //     // setCurrentPage(1);

    //     setDropdownVisible(false);
    // };



    // const handleFilterd = () => {
    //     setFilterStatus(!filterStatus);
    //     setBills(originalBillsFilter)
    //     setReceiptData(originalBillsFilterReceipt);
    // };

    useEffect(() => {
        if (!filterStatus) {
            setStatusfilter("All");
            setDateRange([null, null]);
            setStatusFilterReceipt("All");
            setReceiptDateRange([]);
        }
    }, [filterStatus]);


    // useEffect(() => {

    //     if (hostelId) {
    //         setReceiptLoader(true);
    //         dispatch({ type: "RECEIPTSLIST", payload: hostelId });
    //     }
    // }, [hostelId]);

    // useEffect(() => {
    //     if (state.InvoiceList.ReceiptlistgetStatuscode === 200) {
    //         setReceiptData(state.InvoiceList.ReceiptList);
    //         setOriginalBillsFilterReceipt(state.InvoiceList.ReceiptList)
    //         setOriginalReceipt(state.InvoiceList.ReceiptList)
    //         setReceiptLoader(false);
    //         dispatch({ type: "MANUALINVOICESLIST", payload: hostelId })
    //         setTimeout(() => {
    //             dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_LIST" });
    //         }, 100);
    //     }
    // }, [state.InvoiceList.ReceiptlistgetStatuscode]);

    // useEffect(() => {
    //     if (
    //         state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||
    //         state.InvoiceList.ReceiptDeletesuccessStatuscode === 200 ||
    //         state.InvoiceList.ReceiptEditsuccessStatuscode === 200
    //     ) {
    //         handleBackBill()

    //         dispatch({ type: "RECEIPTSLIST", payload: hostelId });

    //         setTimeout(() => {
    //             dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_ADD" });
    //         }, 1000);

    //         setTimeout(() => {
    //             dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_EDIT" });
    //         }, 1000);

    //         setTimeout(() => {
    //             dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
    //         }, 1000);
    //     }
    // }, [
    //     state.InvoiceList.ReceiptAddsuccessStatuscode,
    //     state.InvoiceList.ReceiptDeletesuccessStatuscode,
    //     state.InvoiceList.ReceiptEditsuccessStatuscode,
    // ]);






    const EXCLUDED_STATUSES = ["Booked", "Settlement Generated"];






    return (
        <div className="mt-4" style={{ paddingLeft: 25, position: "relative" }}>
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
                        {billMode}
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
                                state.UsersList?.Users?.length > 0
                                    ? state.UsersList.Users
                                        .filter((u) => {
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
                                            state.UsersList?.Users?.find(
                                                (u) => u.customerId === customername
                                            )?.firstName || "Select Customer",
                                    }
                                    : null
                            }
                            isDisabled={Boolean(id)}
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
                        <Form.Control
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
                            <DatePicker
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


                        <DatePicker
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
                    {!selectedTypes.includes("RoomRent") && <option value="RoomRent">Room Rent</option>}
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
                                                value={u.am_name}
                                                onChange={(e) => handleNewRowChange(index, "am_name", e.target.value)}
                                                placeholder="Enter Description"
                                            />
                                        </td>
                                        <td style={{ width: "30%" }}>
                                            <Form.Control
                                                type="text"
                                                style={{ fontFamily: "Gilroy" }}
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
                                                onClick={() => handleDeleteNewRow(index)}
                                                style={{ cursor: "pointer" }}
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

                {
                    invoiceDetails?.action === "advance" ?
                        <div className="row mt-3">
                            <div className="col-md-6 offset-md-5">
                                <div className=" ">

                                    <div className="row">
                                        <div className="col-lg-6">
                                            <label className="" style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500, color: "#222" }} >
                                                Payable Amount:
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label className="" style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500, color: "#222" }}>
                                                Rs.{totalAmountPayable}
                                            </label>
                                        </div>
                                    </div>

                                    <div className="row mt-1">
                                        <div className="col-lg-6">
                                            <label style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500, color: "#222" }}>
                                                Non Refundable:
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500, color: "#222" }}>
                                                Rs. {nonRefundableAmount}
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row mt-1">
                                        <div className="col-lg-6">
                                            <label style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500, color: "#222" }}>
                                                Refundable Amount:
                                            </label>
                                        </div>
                                        <div className="col-lg-6">
                                            <label style={{ fontFamily: "Gilroy", fontSize: 16, fontWeight: 500, color: "#222" }}>
                                                Rs.{refundableAmount}
                                            </label>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                        :
                        <div className="row mt-3">
                            <div className="col-md-6 offset-md-6">
                                {Array.isArray(newRows) && newRows.length > 0 && (
                                    <h5 style={{ fontFamily: "Gilroy" }}>
                                        Total Amount ₹{totalAmount}
                                    </h5>
                                )}
                            </div>
                        </div>
                }



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
                {/* {state.createAccount?.networkError ?
                             <div className="d-flex justify-content-center mt-1 mb-1">
                              <ErrorMessage message={state.createAccount?.networkError} type="error"/></div>
                              : null} */}
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
                    onClick={isEditing ? handleEditBill : handleCreateBill}
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
                    {isEditing ? "Save Changes" : "Create Bill"}
                </Button>

                <div className="mb-3"></div>
            </div>

        </div>
    )
}

export default CreateBill
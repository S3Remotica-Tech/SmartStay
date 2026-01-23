/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReceiptList from "../../Pages/Receipt/ReceiptList";
import { Container, Row, Col, InputGroup, Table, Button, FormControl, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch, useSelector } from "react-redux";
import "sweetalert2/dist/sweetalert2.min.css";
import "../Bills/Invoices.css";
// import Calendars from "../../Assets/Images/New_images/calendar.png";
import "flatpickr/dist/themes/material_blue.css";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { useTheme } from "@mui/material/styles";
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import AddReceiptForm from "../Receipt/AddReceipt";
import { toast } from "react-toastify";
// import { DatePicker } from "antd";
// import dayjs from "dayjs";
import { CloseCircle, } from "iconsax-react";
import '../OthersComponent/BillPdfModal.css';
// import AxiosConfig from "../../WebService/AxiosConfig";
// import Swal from 'sweetalert2';
import PaginationList from "../../Components/PaginationList";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
// import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import excelimg from "../../Assets/Images/New_images/excel_blue.png";

function Receipt() {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const [recurLoader, setRecurLoader] = useState(false);
    //    const [initials, setInitials] = useState("");
    // const [formRecordLoading, setFormRecordLoading] = useState(false)
    // const dropdownRef = useRef(null);
    // const [invoiceList, setInvoiceList] = useState({
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






    // const location = useLocation();

    // const isDuplicate = location.pathname.includes("/invoice/new/");


    // console.log("isDuplicate", isDuplicate, "location.pathname", location.pathname)


    // const [showLoader, setShowLoader] = useState(false);
    // const [statusfilter, setStatusfilter] = useState("");
    // const [selectedUserId, setSelectedUserId] = useState("");
    // const [paymodeerrormsg, setPaymodeErrmsg] = useState("");
    // const [amounterrormsg, setAmountErrmsg] = useState("");
    // const [dateerrmsg, setDateErrmsg] = useState("");
    // const [totalErrormsg, setTotalErrmsg] = useState("");
    // const [customername, setCustomerName] = useState("");
    // const [invoicenumber, setInvoiceNumber] = useState("");
    // const [startdate, setStartDate] = useState(null);
    // const [enddate, setEndDate] = useState(null);
    // const [invoicedate, setInvoiceDate] = useState(null);
    // const [invoiceduedate, setInvoiceDueDate] = useState(null);
    // const [formatinvoicedate, setFormatInvoiceDate] = useState(null);
    // const [formatduedate, setFormatDueDate] = useState(null);
    // const [totalAmount, setTotalAmount] = useState("");
    // const [bills, setBills] = useState([]);
    // const [newRows, setNewRows] = useState([])
    // const [customererrmsg, setCustomerErrmsg] = useState("");
    // const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
    // const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
    // const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
    // const [allfielderrmsg, setAllFieldErrmsg] = useState("");
    // const [amenityArray, setamenityArray] = useState([]);
    // const [recurringbills, setRecurringBills] = useState([]);
    // const [account, setAccount] = useState("");
    // const [accountError, setAccountError] = useState("");
    // const startRef = useRef(null);
    // const endRef = useRef(null);
    // const invoiceRef = useRef(null);
    // const dueRef = useRef(null);
    // const [showmanualinvoice, setShowManualInvoice] = useState(false);
    // const [showRecurringBillForm, setShowRecurringBillForm] = useState(false);
    const [receiptformShow, setReceiptFormShow] = useState(false);
    // const [showAllBill, setShowAllBill] = useState(true);
    // const [billrolePermission, setBillRolePermission] = useState("");
    // const [billpermissionError, setBillPermissionError] = useState("");
    // const [billAddPermission, setBillAddPermission] = useState("");
    // const [billDeletePermission, setBillDeletePermission] = useState("");
    // const [billEditPermission, setBillEditPermission] = useState("");
    // const [recuringbillAddPermission, setRecuringBillAddPermission] = useState("");
    // const [recurringPermission, setRecurringPermission] = useState("");
    // const [receiptPermission, setReceiptPermission] = useState("");
    // const [receiptaddPermission, setReceiptAddPermission] = useState("");
    // const [showform, setShowform] = useState(false);
    // const [selectedDate, setSelectedDate] = useState(null);
    // const calendarRef = useRef(null);;
    // const [tableErrmsg, setTableErrmsg] = useState("");
    // const [value, setValue] = React.useState("1");
    // const [DownloadInvoice, setDownloadInvoice] = useState(false);
    // const [DownloadReceipt, setDownloadReceipt] = useState(false);
    // const [showPdfModal, setShowPdfModal] = useState(false);
    // const [showPdfReceiptModal, setShowPdfReceiptModal] = useState(false);
    // const [rowData, setRowData] = useState("");
    // const [showdeleteform, setShowDeleteform] = useState(false);
    // const [billMode, setBillMode] = useState("New Bill");
    // const [isEditing, setIsEditing] = useState(false);
    // const [deleteId, setDeleteId] = useState("");
    // const [filterInput, setFilterInput] = useState("");
    // const [isDropdownVisible, setDropdownVisible] = useState(false);
    const [search, setSearch] = useState(false);
    // const [filterStatus, setFilterStatus] = useState(false);
    // const theme = useTheme();
    // const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));



    // const [transactionId, setTransactionId] = useState("");
    // const [hostelId, setHostelId] = useState("");
    // const [chips, setChips] = useState([])
    const [receiptdata, setReceiptData] = useState([]);
    const [receiptLoader, setReceiptLoader] = useState(false);
  
   


    const {
        canWriteModule: canWriteReceipt,
        canReadModule: canReadReceipt,
    } = useHasPermission("Receipt");


 useEffect(() => {
    if (!canReadReceipt) {
      setReceiptLoader(false);
    } 
  }, [canReadReceipt]);



    useEffect(() => {
        if (state.InvoiceList.updateTenantRecurringStatusCode) {

            dispatch({ type: "RECURRING-BILLS-LIST", payload: state.login?.selectedHostel_Id })

            setTimeout(() => {
                dispatch({ type: 'REMOVE_UPDATE_TENANT_RECURRING' })
            }, 100)
        }

    }, [state.InvoiceList.updateTenantRecurringStatusCode])


 

   

    // useEffect(() => {
    //     if (state.InvoiceList.BillsErrorstatusCode === 201) {

    //         setTimeout(() => {
    //             setLoading(false);
    //             dispatch({ type: "REMOVE_NODATA_BILL_LIST" });
    //         }, 100);
    //     }
    // }, [state.InvoiceList.BillsErrorstatusCode]);



    const handleReceiptShow = () => {
        if (!state.login.selectedHostel_Id) {
            toast.error('Please add a hostel before adding receipt information.', {
                hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
            });
            return;
        }
        // setShowAllBill(false);
        // setReceiptFormShow(true);
        // dispatch({ type: "GET_REFERENCE_ID" });
    };


  

    useEffect(() => {
        if (state.InvoiceList.pdfErrorStatusCode === 201) {
                       setTimeout(() => {
                dispatch({ type: "REMOVE_PDF_ERROR" });
            }, 100);
        }
    }, [state.InvoiceList.pdfErrorStatusCode]);
    useEffect(() => {
        if (state.createAccount?.networkError) {
            // setLoading(false)
            // setShowLoader(false);
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])

    const handleReceiptDetail = (item) => {


        if (item.user_id) {

            dispatch({
                type: "RECEIPTPDF",
                payload: {
                    id: item.id,
                },
            });

            // setShowLoader(true);
        }
    };




    // const CustomStyles = {
    //     control: (base) => ({
    //         ...base,
    //         height: "auto",
    //         border: "1px solid #D9D9D9",
    //         borderRadius: "8px",
    //         fontSize: "14px",
    //         color: "#4B4B4B",
    //         fontFamily: "Gilroy, sans-serif",
    //         fontWeight: 500,
    //         boxShadow: "none",
    //         cursor: "pointer",
    //         outline: "none",
    //         "&:hover": {
    //             border: "1px solid #D9D9D9",
    //         },
    //     }),
    //     valueContainer: (base) => ({
    //         ...base,
    //         maxHeight: "60px",
    //         overflowY: "auto",
    //         flexWrap: "wrap",
    //     }), multiValue: (base) => ({
    //         ...base,
    //         backgroundColor: "#FFF",
    //         borderRadius: "6px",
    //     }),

    //     multiValueLabel: (base) => ({
    //         ...base,
    //         fontSize: "12px",
    //         fontWeight: 600,
    //         color: "#000000",
    //     }),

    //     multiValueRemove: (base) => ({
    //         ...base,
    //         cursor: "pointer",
    //         borderRadius: 10,
    //         color: "#FF0000",
    //         ":hover": {
    //             color: "#FF0000",
    //         },
    //     }),

    //     menu: (base) => ({
    //         ...base,
    //         backgroundColor: "#f8f9fa",
    //         border: "1px solid #ced4da",
    //         fontFamily: "Gilroy, sans-serif", fontSize: "14px",
    //     }),
    //     menuList: (base) => ({
    //         ...base,
    //         backgroundColor: "#1E45E1",
    //         color: "#FFF",
    //         maxHeight: "120px",
    //         padding: 0,
    //         scrollbarWidth: "thin",
    //         overflowY: "auto",
    //         fontFamily: "Gilroy, sans-serif", fontSize: "14px",
    //     }),
    //     placeholder: (base) => ({
    //         ...base,
    //         color: "#555",
    //     }),
    //     option: (base, state) => ({
    //         ...base,
    //         cursor: "pointer",
    //         backgroundColor: state.isFocused ? "" : "white",
    //         color: state.isFocused ? "#FFF" : "#000000",
    //     }),
    //     dropdownIndicator: (base) => ({
    //         ...base,
    //         color: "#555",
    //         cursor: "pointer"
    //     }),
    //     indicatorSeparator: () => ({
    //         display: "none",
    //     }), clearIndicator: () => ({
    //         display: "none",
    //     }),
    // }

    // const handleStatusFilter = (selectedOption) => {
    //     dispatch({
    //         type: "SET_INVOICE_FILTERS",
    //         payload: {
    //             startDate: undefined,
    //             endDate: undefined,
    //             type: [],
    //             createdBy: [],
    //             createdByLabels: [],
    //             modes: [],
    //             paymentStatus: [],
    //             search: "",
    //         },
    //     })
    //     if (!selectedOption) {
    //         setStatusfilter(null);

    //         if (state.login?.selectedHostel_Id) {
    //             dispatch({
    //                 type: "INVOICESLISTFILTER",
    //                 payload: {
    //                     hostelId: state.login.selectedHostel_Id,
    //                 },
    //             });
    //         }
    //         return;
    //     }

    //     setStatusfilter(selectedOption);
    //     // console.log("selectedOption", selectedOption);

    //     if (!state.login?.selectedHostel_Id) return;


    //     if (selectedOption.value === "ALL") {
    //         dispatch({
    //             type: "INVOICESLISTFILTER",
    //             payload: {
    //                 hostelId: state.login.selectedHostel_Id,
    //             },
    //         });
    //     }

    //     else {
    //         dispatch({
    //             type: "INVOICESLISTFILTER",
    //             payload: {
    //                 hostelId: state.login.selectedHostel_Id,
    //                 filters: {
    //                     paymentStatus: [selectedOption.value],
    //                     search: filterInput
    //                 },
    //             },
    //         });
    //     }
    // };





    // const [statusFilterReceipt, setStatusFilterReceipt] = useState("");
    // const handleStatusFilterReceipt = (event) => {
    //     const searchTerm = event.target.value;
    //     setStatusFilterReceipt(searchTerm);
    // };

    // useEffect(() => {
    //     if (statusFilterReceipt !== "date") {
    //         setReceiptDateRange([]);

    //         if (statusFilterReceipt === "All") {
    //             setReceiptData(originalBillsFilterReceipt);
    //         } else {
    //             const filteredItemsReceipt = originalBillsFilterReceipt.filter((user) => {
    //                 const mode = user.paymentMode?.toLowerCase() || "";

    //                 if (statusFilterReceipt === "Cash") return mode.endsWith("-cash");
    //                 if (statusFilterReceipt === "UPI") return mode.endsWith("-upi");
    //                 if (statusFilterReceipt === "Bank") return mode.endsWith("-bank");
    //                 if (statusFilterReceipt === "Card") return mode.endsWith("-card");

    //                 return false;
    //             });

    //             setReceiptData(filteredItemsReceipt);
    //             // setCurrentReceiptPage(1);
    //         }
    //     }
    // }, [statusFilterReceipt]);





    // const [receiptDateRange, setReceiptDateRange] = useState([]);
    // const handleDateRangeChangeReceipt = (dates) => {
    //     setReceiptDateRange(dates);


    //     if (!dates || dates.length !== 2) {
    //         setStatusFilterReceipt("All");
    //         setReceiptData(originalBillsFilterReceipt);
    //         return;
    //     }

    //     const [start, end] = dates;

    //     const filtered = originalBillsFilterReceipt.filter((item) => {
    //         const itemDate = dayjs(item.payment_date);
    //         return (
    //             itemDate.isSame(start, 'day') ||
    //             itemDate.isSame(end, 'day') ||
    //             (itemDate.isAfter(start) && itemDate.isBefore(end))
    //         );
    //     });

    //     setReceiptData(filtered);
    //     // setCurrentReceiptPage(1)
    // };


    // useEffect(() => {
    //     if (statusFilterReceipt !== "date") {
    //         setReceiptDateRange([]);
    //     }
    // }, [statusFilterReceipt]);
    // useEffect(() => {
    //     if (statusFilterReceipt === "All") {
    //         setReceiptData(originalBillsFilterReceipt);
    //         setReceiptDateRange([]);

    //     }
    // }, [statusFilterReceipt]);


    // useEffect(() => {
    //     if (originalBillsFilterReceipt.length === 0 && receiptdata.length > 0) {
    //         setOriginalBillsFilterReceipt(receiptdata);
    //     }
    // }, [receiptdata]);




    // const formatDateForPayload = (date) => {
    //     if (!date) return null;
    //     const offset = date.getTimezoneOffset();
    //     const localDate = new Date(date.getTime() - offset * 60 * 1000);

    //     const day = String(localDate.getDate()).padStart(2, "0");
    //     const month = String(localDate.getMonth() + 1).padStart(2, "0");
    //     const year = localDate.getFullYear();

    //     return `${day}-${month}-${year}`;
    // };


    // const [payableAmount, setPayableAmount] = useState("");
    // const [balance, setBalance] = useState(0);


    // const handleAmount = (e) => {
    //     setAmountErrmsg('')
    //     let value = e.target.value;

    //     if (value !== "") {
    //         let numValue = Number(value);
    //         if (numValue > (invoiceList.balanceDue || 0)) {
    //             numValue = invoiceList.balanceDue || 0;
    //         }
    //         value = numValue;
    //         setBalance((invoiceList.balanceDue || 0) - numValue);
    //     } else {

    //         setBalance(invoiceList.balanceDue || 0);
    //     }

    //     setPayableAmount(value);
    //     setPayableAmountError("")
    //     dispatch({ type: 'CLEAR_PAYABLE_AMOUNT' })
    // };






    const [editvalue, setEditvalue] = useState("");
    const [receiptedit, setReceiptEdit] = useState(false);
        // const [payableamountError, setPayableAmountError] = useState("")




    const handleEditReceipt = (item) => {
        // setShowAllBill(false);
        setReceiptFormShow(true);
        setEditvalue(item);
        setReceiptEdit(true);
    };

  
   



   

    



    const handleBackBill = () => {
        dispatch({ type: 'CLEAR_UNABLE_ADD_INVOICE_DETAILS' })
        // setFormLoading(false)
        // setShowManualInvoice(false);
        // setShowRecurringBillForm(false);
        setReceiptFormShow(false);
        // setShowAllBill(true);
        setEditvalue("");
        setReceiptEdit(false);
        // setCustomerName("");
        // setInvoiceNumber("");
        // setStartDate("");
        // setEndDate("");
        // setInvoiceDate("");
        // setInvoiceDueDate("");
          };









    // const CustomStartDateInput = React.forwardRef(({ value, onClick }, ref) => {
    //     return (
    //         <div
    //             className="date-input-container w-100"
    //             onClick={onClick}
    //             style={{ position: "relative" }}
    //         >
    //             <FormControl
    //                 type="text"
    //                 className="date_input"
    //                 value={value || "DD/MM/YYYY"}
    //                 readOnly
    //                 ref={ref}
    //                 style={{
    //                     border: "1px solid #D9D9D9",
    //                     borderRadius: 8,
    //                     padding: 9,
    //                     fontSize: 14,
    //                     fontFamily: "Gilroy",
    //                     fontWeight: value ? 600 : 500,
    //                     width: "100%",
    //                     height: 50,
    //                     boxSizing: "border-box",
    //                     boxShadow: "none",
    //                     backgroundColor: "#fff",
    //                     cursor: "pointer",
    //                 }}
    //             />
    //             <img
    //                 src={Calendars}
    //                 style={{
    //                     height: 24,
    //                     width: 24,
    //                     marginLeft: 10,
    //                     cursor: "pointer",
    //                     position: "absolute",
    //                     right: 10,
    //                     top: "50%",
    //                     transform: "translateY(-50%)",
    //                 }}
    //                 alt="Calendar"
    //                 onClick={onClick}
    //             />
    //         </div>
    //     );
    // });
    // CustomStartDateInput.displayName = "CustomStartDateInput";

    // const CustomEndDateInput = React.forwardRef(({ value, onClick }, ref) => {
    //     return (
    //         <div
    //             className="date-input-container w-100"
    //             onClick={onClick}
    //             style={{ position: "relative" }}
    //         >
    //             <FormControl
    //                 type="text"
    //                 className="date_input"
    //                 value={value || "DD/MM/YYYY"}
    //                 readOnly
    //                 ref={ref}
    //                 style={{
    //                     border: "1px solid #D9D9D9",
    //                     borderRadius: 8,
    //                     padding: 9,
    //                     fontSize: 14,
    //                     fontFamily: "Gilroy",
    //                     fontWeight: value ? 600 : 500,
    //                     width: "100%",
    //                     height: 50,
    //                     boxSizing: "border-box",
    //                     boxShadow: "none",
    //                     backgroundColor: "#fff",
    //                     cursor: "pointer",
    //                 }}
    //             />
    //             <img
    //                 src={Calendars}
    //                 style={{
    //                     height: 24,
    //                     width: 24,
    //                     marginLeft: 10,
    //                     cursor: "pointer",
    //                     position: "absolute",
    //                     right: 10,
    //                     top: "50%",
    //                     transform: "translateY(-50%)",
    //                 }}
    //                 alt="Calendar"
    //                 onClick={onClick} />
    //         </div>
    //     );
    // });

    // CustomEndDateInput.displayName = "CustomEndDateInput";

    // const CustomInvoiceDateInput = React.forwardRef(({ value, onClick }, ref) => {
    //     return (
    //         <div
    //             className="date-input-container w-100"
    //             onClick={onClick}
    //             style={{ position: "relative" }}
    //         >
    //             <FormControl
    //                 type="text"
    //                 className="date_input"
    //                 value={value || "DD/MM/YYYY"}
    //                 readOnly
    //                 ref={ref}
    //                 style={{
    //                     border: "1px solid #D9D9D9",
    //                     borderRadius: 8,
    //                     padding: 9,
    //                     fontSize: 14,
    //                     fontFamily: "Gilroy",
    //                     fontWeight: value ? 600 : 500,
    //                     width: "100%",
    //                     height: 50,
    //                     boxSizing: "border-box",
    //                     boxShadow: "none",
    //                     backgroundColor: "#fff",
    //                     cursor: "pointer",
    //                 }}
    //             />
    //             <img
    //                 src={Calendars}
    //                 style={{
    //                     height: 24,
    //                     width: 24,
    //                     marginLeft: 10,
    //                     cursor: "pointer",
    //                     position: "absolute",
    //                     right: 10,
    //                     top: "50%",
    //                     transform: "translateY(-50%)",
    //                 }}
    //                 alt="Calendar"
    //                 onClick={onClick}
    //             />
    //         </div>
    //     );
    // });
    // CustomInvoiceDateInput.displayName = "CustomInvoiceDateInput";
    // const CustomInvoiceDueDateInput = React.forwardRef(({ value, onClick }, ref) => {
    //     return (
    //         <div
    //             className="date-input-container w-100"
    //             onClick={onClick}
    //             style={{ position: "relative" }}
    //         >
    //             <FormControl
    //                 type="text"
    //                 className="date_input"
    //                 value={value || "DD/MM/YYYY"}
    //                 readOnly
    //                 ref={ref}
    //                 style={{
    //                     border: "1px solid #D9D9D9",
    //                     borderRadius: 8,
    //                     padding: 9,
    //                     fontSize: 14,
    //                     fontFamily: "Gilroy",
    //                     fontWeight: value ? 600 : 500,
    //                     width: "100%",
    //                     height: 50,
    //                     boxSizing: "border-box",
    //                     boxShadow: "none",
    //                     backgroundColor: "#fff",
    //                     cursor: "pointer",
    //                 }}
    //             />
    //             <img
    //                 src={Calendars}
    //                 style={{
    //                     height: 24,
    //                     width: 24,
    //                     marginLeft: 10,
    //                     cursor: "pointer",
    //                     position: "absolute",
    //                     right: 10,
    //                     top: "50%",
    //                     transform: "translateY(-50%)",
    //                 }}
    //                 alt="Calendar"
    //                 onClick={onClick}
    //             />
    //         </div>
    //     );
    // });

    // CustomInvoiceDueDateInput.displayName = "CustomInvoiceDueDateInput";





    


   


    const sortedDataReceipt = React.useMemo(() => {
        return Array.isArray(receiptdata) ? receiptdata : [];
    }, [receiptdata]);


   




    const handleDisplayReceiptDownload = (
               ) => {
       
        setSearch(false)
           };

    useEffect(() => {
        if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
            setTimeout(() => {
                dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
            }, 500);
        }

    }, [state.InvoiceList.statusCodeNewReceiptStatusCode])



    const handleSearch = () => {
        setSearch(!search);
        dispatch({
            type: "SET_INVOICE_FILTERS",
            payload: {
                startDate: undefined,
                endDate: undefined,
                type: [],
                createdBy: [],
                createdByLabels: [],
                modes: [],
                paymentStatus: [],
                search: "",
            },
        })

    };


    useEffect(() => {

        if (state.login.selectedHostel_Id) {
            setReceiptLoader(true);
            dispatch({ type: "RECEIPTSLIST", payload: state.login.selectedHostel_Id });
        }
    }, [state.login.selectedHostel_Id]);

    useEffect(() => {
        if (state.InvoiceList.ReceiptlistgetStatuscode === 200) {
            setReceiptData(state.InvoiceList.ReceiptList);
                        setReceiptLoader(false);
            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_LIST" });
            }, 100);
        }
    }, [state.InvoiceList.ReceiptlistgetStatuscode]);


    useEffect(() => {
        setReceiptLoader(false);
    }, [state.InvoiceList.ReceiptList])








    useEffect(() => {
        if (
            state.InvoiceList.ReceiptAddsuccessStatuscode === 200 ||
            state.InvoiceList.ReceiptDeletesuccessStatuscode === 204 ||
            state.InvoiceList.ReceiptEditsuccessStatuscode === 200
        ) {
            handleBackBill()

            dispatch({ type: "RECEIPTSLIST", payload: state.login.selectedHostel_Id });

            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_ADD" });
            }, 1000);

            setTimeout(() => {
                dispatch({ type: "REMOVE_STATUS_CODE_RECEIPTS_EDIT" });
            }, 1000);

            setTimeout(() => {
                dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
            }, 1000);
        }
    }, [
        state.InvoiceList.ReceiptAddsuccessStatuscode,
        state.InvoiceList.ReceiptDeletesuccessStatuscode,
        state.InvoiceList.ReceiptEditsuccessStatuscode,
    ]);





    useEffect(() => {
        if (state.createAccount?.networkError) {
            // setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])




    // useEffect(() => {
    //     const invoiceFilters = state.InvoiceList.invoiceFilters;
    //     const filterData = [];


    //     if (invoiceFilters?.paymentStatus?.length) {
    //         filterData.push({
    //             key: "payment-status",
    //             label: "Status is",
    //             type: "paymentStatus",
    //             value: invoiceFilters.paymentStatus.join(", "),
    //         });
    //     }


    //     if (invoiceFilters?.type?.length) {
    //         filterData.push({
    //             key: "type",
    //             label: "Type is",
    //             type: "type",
    //             value: invoiceFilters.type.join(", "),
    //         });
    //     }


    //     if (invoiceFilters?.modes?.length) {
    //         filterData.push({
    //             key: "modes",
    //             label: "Mode is",
    //             type: "modes",
    //             value: invoiceFilters.modes.join(", "),
    //         });
    //     }


    //     if (invoiceFilters?.createdByLabels?.length) {
    //         filterData.push({
    //             key: "created-by",
    //             label: "Created By",
    //             type: "createdBy",
    //             value: invoiceFilters.createdByLabels.join(", "),
    //         });
    //     }


    //     if (invoiceFilters?.startDate || invoiceFilters?.endDate) {
    //         filterData.push({
    //             key: "date-range",
    //             label: "Date Range is",
    //             type: "date",
    //             value:
    //                 invoiceFilters.startDate && invoiceFilters.endDate
    //                     ? `${invoiceFilters.startDate} - ${invoiceFilters.endDate}`
    //                     : invoiceFilters.startDate || invoiceFilters.endDate,
    //         });
    //     }


    //     if (invoiceFilters?.search) {
    //         filterData.push({
    //             key: "search",
    //             label: "Tenant",
    //             type: "search",
    //             value: invoiceFilters.search,
    //         });
    //     }

    //     setChips(filterData);
    // }, [state.InvoiceList.invoiceFilters]);


    useEffect(() => {
        return () => {

            dispatch({
                type: "SET_INVOICE_FILTERS",
                payload: {
                    startDate: undefined,
                    endDate: undefined,
                    type: [],
                    createdBy: [],
                    createdByLabels: [],
                    modes: [],
                    paymentStatus: [],
                    search: "",
                },
            });
        };
    }, [state.login.selectedHostel_Id]);

    // const handleReset = () => {
    //     dispatch({
    //         type: "SET_INVOICE_FILTERS",
    //         payload: {
    //             startDate: undefined,
    //             endDate: undefined,
    //             type: [],
    //             createdBy: [],
    //             createdByLabels: [],
    //             modes: [],
    //             paymentStatus: [],
    //             search: "",
    //         },
    //     })


    //     dispatch({ type: 'INVOICESLISTFILTER', payload: { hostelId: state.login.selectedHostel_Id } })
    // }


    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (
    //             dropdownRef.current &&
    //             !dropdownRef.current.contains(event.target)

    //         ) {
    //             setDropdownVisible(false);

    //         }
    //     };

    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, []);





    return (
        <div className="sticky-top bg-white" style={{ position: "relative", overflow: "hidden" }}>


            {!canReadReceipt ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: 90

                        }}
                    >
                        <img
                            src={Emptystate}
                            alt="Empty State"

                        />
                        <ErrorMessage message={['You do not have access to view Receipt']} type="warning" />

                    </div>
                </>
            ) : (
                <>


                    {receiptLoader &&
                        <div
                            style={{
                                position: 'absolute',
                                top: 200,
                                right: 0,
                                bottom: 0,
                                left: 200,
                                display: 'flex',
                                height: "50vh",
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

                    <Container fluid className="p-0 ">
                        <Row
                            className={` "m-0 g-0"
                                }`}
                        >
                            <Col
                                lg={12}
                                md={12}
                                sm={12}
                                xs={12}
                            >
                                <div className="sticky-top bg-white d-flex justify-content-between align-items-center  flex-wrap h-auto"
                                    style={{
                                        position: 'sticky',
                                        backgroundColor: 'white',
                                        zIndex: 10, borderBottom: "none",
                                        boxShadow: "initial"

                                    }}
                                >
                                    <div style={{ marginTop: 0 }}>
                                        <label style={{ fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>
                                            Receipt</label>
                                    </div>

                                    <div className=" d-flex justify-content-between gap-2 align-items-center flex-wrap p-2">



                                        <div style={{
                                            backgroundColor: "", color: "", border: "1px solid #CBD5E1", borderRadius: "50%",
                                            padding: "6px 8px", lineHeight: "normal", height: "fit-content"
                                        }}>
                                            <FiSearch
                                                style={{
                                                    height: "20px",
                                                    width: "20px",
                                                    cursor: canReadReceipt ? "pointer" : "not-allowed",
                                                    opacity: canReadReceipt ? 1 : 0.4,
                                                    pointerEvents: canReadReceipt ? "auto" : "none",
                                                    transition: "opacity 0.3s ease"
                                                }}
                                                onClick={handleSearch}
                                            />
                                        </div>

                                        {
                                            search &&

                                            <div className='  flex flex-wrap ' style={{
                                                position: 'relative', cursor: "pointer", marginTop: 0
                                            }}>
                                                <InputGroup
                                                    style={{
                                                        maxWidth: "100%",
                                                        flexWrap: 'nowrap', fontFamily: "Gilroy"
                                                    }}
                                                >

                                                    <FormControl size="lg"
                                                        //    value={searchQuery}
                                                        //    onChange={handleInputChange}

                                                        style={{
                                                            width: "100%",
                                                            maxWidth: "235px",
                                                            boxShadow: "none",
                                                            borderColor: "lightgray", fontFamily: "Gilroy",
                                                            borderRight: "none", fontSize: 15, fontWeight: 500, color: "#222",
                                                        }}
                                                        placeholder="Search..."
                                                    />
                                                    <InputGroup.Text style={{ backgroundColor: "#ffffff", cursor: "pointer" }}>
                                                        <CloseCircle size="24" color="#222"
                                                        //    onClick={handleCloseSearch}
                                                        />
                                                    </InputGroup.Text>
                                                </InputGroup>



                                            </div>

                                        }


                                        <div className='me-2' style={{ marginTop: 0, cursor: "pointer" }}>
                                            <img src={excelimg} alt='excel' width={38} height={38}

                                                style={{
                                                    cursor: canReadReceipt ? "pointer" : "not-allowed",
                                                    opacity: canReadReceipt ? 1 : 0.4,
                                                    pointerEvents: canReadReceipt ? "auto" : "none",
                                                    transition: "opacity 0.3s ease"
                                                }}
                                            //    onClick={() => { if (canReadReceipt) handleAssetsExcel() }}
                                            />
                                        </div>


                                        <Button
                                            disabled={!canWriteReceipt}
                                            onClick={handleReceiptShow}

                                            style={{
                                                fontFamily: "Gilroy",
                                                fontSize: "14px",
                                                backgroundColor: "#1E45E1",
                                                color: "white",
                                                fontWeight: 600,
                                                borderRadius: "8px",
                                                padding: "8px 8px",
                                                marginTop: 0,
                                                whiteSpace: "nowrap",
                                                minWidth: "150px",
                                                textAlign: "center",
                                            }}
                                        >
                                            {" "} + Create Receipt
                                        </Button>
                                    </div>
                                </div>








                                {sortedDataReceipt &&
                                    sortedDataReceipt.length > 0 && (
                                        <div
                                            className=" booking-table-userlist  booking-table ms-2 me-4"
                                            style={{ paddingBottom: "20px", marginLeft: "-22px" }}
                                        >
                                            <div

                                                className='show-scrolls'
                                                style={{

                                                    height: sortedDataReceipt?.length >= 5 || sortedDataReceipt?.length >= 5 ? "450px" : "auto",
                                                    overflow: "auto",
                                                    borderTop: "1px solid #E8E8E8",
                                                    marginBottom: 20,
                                                    marginTop: "20px",
                                                    paddingRight: 0,
                                                    paddingLeft: 0

                                                }}
                                            >
                                                <Table
                                                    responsive="md"

                                                    style={{
                                                        fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                                        top: 0,
                                                        zIndex: 1,
                                                        borderRadius: 0
                                                    }}
                                                >
                                                    <thead style={{
                                                        fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                                                        top: 0,
                                                        zIndex: 1
                                                    }}>
                                                        <tr>
                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    whiteSpace: "nowrap"
                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>

                                                                    Receipt No</div>
                                                            </th>

                                                            <th
                                                                style={{
                                                                    textAlign: "start",

                                                                    paddingLeft: "20px",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontWeight: 500,

                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>

                                                                    Name</div>
                                                            </th>

                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    whiteSpace: "nowrap"
                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                    Reference_Id</div>
                                                            </th>

                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    whiteSpace: "nowrap"
                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>

                                                                    Invoice Number</div>
                                                            </th>
                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    whiteSpace: "nowrap"
                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>

                                                                    Type</div>
                                                            </th>
                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    whiteSpace: "nowrap"
                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>

                                                                    Payment Date</div>
                                                            </th>

                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                    Amount</div>
                                                            </th>
                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontStyle: "normal",
                                                                    fontWeight: 500,
                                                                    whiteSpace: "nowrap"
                                                                }}
                                                            >
                                                                <div className='d-flex gap-1 align-items-center justify-content-start'>

                                                                    Payment Mode</div>
                                                            </th>

                                                            <th
                                                                style={{
                                                                    textAlign: "start",
                                                                    fontFamily: "Gilroy",
                                                                    color: "rgb(147, 147, 147)",
                                                                    fontSize: 12,
                                                                    fontWeight: 500,

                                                                }}
                                                            >Action</th>
                                                        </tr>
                                                    </thead>


                                                    <tbody style={{ fontSize: "10px", minHeight: "200px", position: "relative" }}>
                                                        <PaginationList pageSizeOptions={[{ value: 10, label: "10" }, { value: 50, label: "50" }, { value: 100, label: "100" }]}>
                                                            {sortedDataReceipt.map((item) => (
                                                                <ReceiptList
                                                                    key={item.id}
                                                                    item={item}
                                                                    // receiptaddPermission={receiptaddPermission}
                                                                    // billrolePermission={billrolePermission}
                                                                    // OnHandleshowform={handleShowForm}
                                                                    OnHandleshowInvoicePdf={handleReceiptDetail}
                                                                    onhandleEdit={handleEditReceipt}
                                                                    DisplayInvoice={handleDisplayReceiptDownload}

                                                                />
                                                            ))}
                                                        </PaginationList>
                                                    </tbody>

                                                </Table>
                                            </div>
                                        </div>
                                    )}


                                {!receiptLoader && sortedDataReceipt &&
                                    sortedDataReceipt?.length === 0 && (
                                        <div className="mt-2 flex justify-center">
                                  <div>
                                            <div style={{ textAlign: "center" }}>
                                                {" "}
                                                <img src={Emptystate} alt="emptystate" />
                                            </div>
                                            <div
                                                className="pb-1"
                                                style={{
                                                    textAlign: "center",
                                                    fontWeight: 600,
                                                    fontFamily: "Gilroy",
                                                    fontSize: 18,
                                                    color: "rgba(75, 75, 75, 1)",
                                                }}
                                            >
                                                No Receipt available{" "}
                                            </div>
                                            <div
                                                className="pb-1"
                                                style={{
                                                    textAlign: "center",
                                                    fontWeight: 500,
                                                    fontFamily: "Gilroy",
                                                    fontSize: 14,
                                                    color: "rgba(75, 75, 75, 1)",
                                                }}
                                            >
                                                There are no receipt added{" "}
                                            </div>
                                            </div>
                                        </div>
                                    )}


                            </Col>


                        </Row>
                        {receiptformShow && (
                            <>
                                <AddReceiptForm
                                    onhandleback={handleBackBill}
                                    editvalue={editvalue}
                                    receiptedit={receiptedit}
                                />
                            </>
                        )}
                    </Container>
                </>
            )}
        </div>
    )
}

export default Receipt
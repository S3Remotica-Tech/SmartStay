
import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { InputGroup, FormControl, Pagination } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import Image from 'react-bootstrap/Image';
import { Table } from 'react-bootstrap';
import { BsSearch } from "react-icons/bs";
import { IoFilterOutline } from "react-icons/io5";
import List from '../Assets/Images/list-report.png';
import Edit from '../Assets/Images/edit.png';
import { Offcanvas, Form, Dropdown } from 'react-bootstrap';
import Plus from '../Assets/Images/Create-button.png';
import Calendor from '../Assets/Images/calendar.png';
// import Profile from '../Assets/Images/Profile.jpg';
import Dots from '../Assets/Images/more.png';
import User from '../Assets/Images/New_images/profile-picture.png';
import NotificationIcon from '../Assets/Images/Notification.png'
import rectangle from '../Assets/Images/Rectangle 2.png'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import InvoiceDetail from './InvoiceDetails';
import MessageModal from './MessageModal';
import LoaderComponent from './LoaderComponent';
import Sort from "../Assets/Images/sort.png";
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import CryptoJS from "crypto-js";
import "../Pages/Invoices.css"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { fontSize, fontStyle, fontWeight, lineHeight, padding } from '@mui/system';
import InvoiceTable from './InvoicelistTable';
import leftArrow from '../Assets/Images/New_images/left-arrow.png'
import rightarrow from '../Assets/Images/New_images/right-arrow.png'
import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import squre from '../Assets/Images/New_images/minus-square.png';
import Calendars from '../Assets/Images/New_images/calendar.png'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';
import { MdError } from "react-icons/md";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Emptystate from '../Assets/Images/Empty-State.jpg'
import BillPdfModal from '../Pages/BillPdfModal'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Closebtn from '../Assets/Images/CloseCircle-Linear-32px.png';
import RecurringBill from '../Pages/RecurringBills';

const InvoicePage = () => {


  const state = useSelector(state => state)
  const [editOption, setEditOption] = useState('')
  const dispatch = useDispatch()
  console.log("state", state);

  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   setLoading(true)
  //   dispatch({ type: 'INVOICELIST' })
  // }, [])

  useEffect(() => {
    // setLoading(true)
    dispatch({ type: 'MANUAL-INVOICES-LIST' })
    console.log("MAnual");
    
    setBills(state.InvoiceList.ManualInvoices);
  }, [])




  const customStyle = {
    fontFamily: 'Gilroy',
    color: "#939393",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "normal",
    fontStyle: "normal",
    padding: 10
  };

  const Tablebodystyle = {
    // marginTop:'10px',
    paddingTop: '17px',
    fontFamily: 'Gilroy, sans-serif',
    color: "#000",
    fontSize: "14px",
    fontWeight: 500,
    fontStyle: 'normal',
    lineHeight: 'normal'
  }


  const customCheckboxStyle = {
    appearance: 'none',
    width: '20px',
    height: '20px',
    backgroundColor: '#fff',
    border: '2px solid #DCDCDC',
    borderRadius: '4px',
    display: 'inline-block',
    position: 'relative',
  };
  //offcanvas style
  const bottomBorderStyle = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "",
    paddingLeft: "2px"
  };

  const bottomBorderStyles = {
    border: 'none',
    borderBottom: '1px solid #ced4da',
    borderRadius: '0',
    boxShadow: 'none',
    fontWeight: 'bold',
    fontSize: "11px",
    marginTop: "3px",
    backgroundColor: "#F8F9FA",
    paddingLeft: "3px",
    borderRadius: "2px"
  };
  const [data, setData] = useState([]);
  //offcanvas variable
  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isUserClicked, setUserClicked] = useState(true);
  const [invoiceDetail, setInvoiceDetails] = useState(false)
  const [invoiceValue, setInvoiceValue] = useState("")

  const [paymodeerrormsg, setPaymodeErrmsg] = useState('');
  const [amounterrormsg, setAmountErrmsg] = useState('');
  const [dateerrmsg, setDateErrmsg] = useState('')
  const [totalErrormsg, setTotalErrmsg] = useState('')
  const [showmanualinvoice, setShowManualInvoice] = useState(false);
  const [showRecurringBillForm, setShowRecurringBillForm] = useState(false)
  const [showAllBill, setShowAllBill] = useState(true)

  const handleManualShow = () => {
    setShowAllBill(false)
    setShowManualInvoice(true)
  }

  const handleRecurrBillShow = () => {
    setShowAllBill(false)
    setShowRecurringBillForm(true)

  }
  

  const [file, setFile] = useState(null)
  const d = new Date();
  const [invoiceList, setInvoiceList] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    hostel_Name: '',
    hostel_Id: '',
    FloorNo: '',
    RoomNo: '',
    date: '',
    // total_amount: '',
    paymentType: '',
    amount: '',
    balanceDue: '',
    dueDate: '',
    payableAmount: '',
    InvoiceId: '',
    invoice_type: '',
    transaction: ''
  })

  // console.log("invoiceList", invoiceList);

  const [invoicePage, setInvoicePage] = useState('')
  const [showLoader, setShowLoader] = useState(false)
  const [selectedItems, setSelectedItems] = useState('')

  const [showDots, setShowDots] = useState('')

  const handleShowDots = () => {
    setShowDots(!showDots)
  }


  const handleInvoiceDetail = (item) => {
    console.log("printinvoice", item);
    setSelectedItems(item);

    if (item.User_Id) {
      // Parse the date and format it as 'YYYY-MM-DD'
      const originalDate = new Date(item.Date);
      const year = originalDate.getFullYear();
      const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
      const day = originalDate.getDate().toString().padStart(2, '0');
      const newDate = `${year}-${month}-${day}`;

      if ((item.EbAmount == 0 || item.EbAmount == undefined) && item.invoice_type == 1 && item.AmnitiesAmount == 0) {
        dispatch({
          type: 'INVOICEPDF',
          payload: {
            Date: newDate,
            User_Id: item.User_Id,
            id: item.id,
            hostel_Id: item.Hostel_Id,
            invoice_type: item.invoice_type
          }
        });
      } else if (item.invoice_type === 2) {
        dispatch({
          type: 'INVOICEPDF',
          payload: {
            User_Id: item.User_Id,
            id: item.id,
            hostel_Id: item.Hostel_Id,
            invoice_type: item.invoice_type
          }
        });
      } else {
        dispatch({
          type: 'INVOICEPDF',
          payload: {
            Date: newDate,
            User_Id: item.User_Id,
            id: item.id
          }
        });
      }

      setShowLoader(true);
    }
  }

  // const payload = item.invoice_type === 2 
  //     ? { User_Id: item.User_Id, id: item.id, hostel_Id: item.Hostel_Id, invoice_type: item.invoice_type }
  //     : { Date: newDate, User_Id: item.User_Id, id: item.id };  
  // dispatch({ type: 'INVOICEPDF', payload });


  // setShowLoader(true);




  // const handleInvoiceDetail = (item) => {
  //   setSelectedItems(item)
  //   if (item.User_Id) {
  //     const originalDate = new Date(item.Date);
  //     originalDate.setDate(originalDate.getDate());
  //     const year = originalDate.getFullYear();
  //     const month = (originalDate.getMonth() + 1).toString().padStart(2, '0');
  //     const day = originalDate.getDate().toString().padStart(2, '0');
  //     const newDate = `${year}-${month}-${day}`;
  //     if(item.invoice_type === 2){
  //       dispatch({ type: 'INVOICEPDF', payload: {  User_Id: item.User_Id, id: item.id,hostel_Id:item.Hostel_Id,invoice_type:item.invoice_type } });
  //     }
  //     else{
  //       dispatch({ type: 'INVOICEPDF', payload: { Date:newDate, User_Id: item.User_Id, id: item.id} });

  //     }
  //     // dispatch({ type: 'INVOICEPDF', payload: {  User_Id: item.User_Id, id: item.id,hostel_Id:item.Hostel_Id,invoice_type:item.invoice_type } });
  //     // setShowLoader(true);
  //   }
  // };


  useEffect(() => {
    if (state.InvoiceList.InvoiceListStatusCode === 200 || state.InvoiceList.statusCodeForPDf === 200) {
      // dispatch({ type: 'INVOICELIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_LIST' });
      }, 100);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_PDF_STATUS_CODE' });
      }, 200);
    }
  }, [state.InvoiceList?.InvoiceListStatusCode, state.InvoiceList?.statusCodeForPDf]);




  const [notification, setNotification] = useState([]);
  console.log("notification", notification);

  useEffect(() => {
    dispatch({ type: 'ALL-NOTIFICATION-LIST' })
    setNotification(state.login.Notification)
  }, [])



  let newNotificationIDs = state.login.Notification && state.login.Notification?.length > 0 && state.login.Notification.filter(notification => notification.status === 1).map(notification => notification.id);


  const newNotificationsCount = newNotificationIDs.length;
  console.log("id", newNotificationIDs);


  const handleClosepopup = () => setShow(false);

  const handleShowpopup = () => {
    setShow(true);
    if (newNotificationIDs.length > 0 && newNotificationIDs != []) {
      setTimeout(() => {
        dispatch({ type: 'UPDATE-NOTIFICATION', payload: { id: newNotificationIDs } });
      }, 1000)
    }

    // dispatch({ type: 'ALL-NOTIFICATION-LIST' })
  }


  useEffect(() => {
    if (state.login.UpdateNotificationMessage != null && state.login.UpdateNotificationMessage != '') {
      dispatch({ type: 'ALL-NOTIFICATION-LIST' })
      setTimeout(() => {
        dispatch({ type: 'AFTER_UPDATE_NOTIFICATION', message: null })
        newNotificationIDs = []
      }, 100);
    }
  }, [state.login.UpdateNotificationMessage])

 


  useEffect(() => {
    const toTriggerPDF = state.InvoiceList?.toTriggerPDF;
    if (toTriggerPDF) {

      setTimeout(() => {
        let pdfWindow;
        const InvoicePDf = state.InvoiceList?.Invoice &&
          state.InvoiceList.Invoice.filter(view => view.User_Id == selectedItems.User_Id && view.id == selectedItems.id);
        console.log("InvoicePDf[0]?.invoicePDF", InvoicePDf[0])
        console.log("////////////////////////////////////////")
        if (InvoicePDf[0]?.invoicePDF) {
          pdfWindow = window.open(InvoicePDf[0]?.invoicePDF, '_blank');
          if (pdfWindow) {
            setShowLoader(false);
          }
        } else {
          // setShowLoader(true);
        }
      }, 0);
    } else {
      console.log("to trigger pdf is false so pdf not working");
    }
  }, [state.InvoiceList?.Invoice, state.InvoiceList?.toTriggerPDF]);




  const handleInvoiceback = (isVisible) => {
    setInvoiceDetails(isVisible)
  }



  // useEffect(() => {
  //   dispatch({ type: 'HOSTELLIST' })
  // }, [])


  const LoginId = localStorage.getItem("loginId")

  const [loginID, setLoginID] = useState('')








  // useEffect(() => {
  //     dispatch({ type: 'INVOICELIST' })
  //     setData(state.InvoiceList.Invoice)
  //       }, [state.InvoiceList.Invoice])

  console.log("invoice list", state);




  // const itemsPerPage = 7;
  // const [currentPage, setCurrentPage] = useState(1);




  // 








  const [filtericon, setFiltericon] = useState(false)

  const [statusfilter, setStatusfilter] = useState('')

  const handleImageChange = (event) => {
    const fileimgage = event.target.files[0];
    if (fileimgage) {
      setFile(fileimgage);
    }
  };

  const handlePhoneNo = (e) => {
    const result = e.target.value.replace(/\D/g, '');
    const phoneError = document.getElementById("phoneError");
    setInvoiceList({ ...invoiceList, phone: result })
    if (result.length < 10) {
      phoneError.textContent = "Please put 10 digit mobile number";
    }
    else {
      phoneError.textContent = "";
    }
  }

  const handleEmailID = (e) => {
    const emailID = e.target.value;
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailPattern.test(emailID)) {
      setInvoiceList({ ...invoiceList, email: emailID });
      emailError.textContent = "Invalid email format";
    } else {
      setInvoiceList({ ...invoiceList, email: emailID });
      emailError.textContent = "";
    }

  }

  // pagination
  const handleNextClick = () => {
    setCurrentPage((prevPage) => prevPage === totalPages ? prevPage : prevPage + 1);
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => prevPage === 1 ? prevPage : prevPage - 1);
  };


  const handleMenuClick = () => {
    setShowForm(true);
    setUserClicked(true);
  };



  const handleClose = () => {
    setInvoiceList({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      hostel_Name: '',
      hostel_Id: '',
      FloorNo: '',
      RoomNo: '',
      amount: '',
      balanceDue: '',
      dueDate: '',
      // total_amount:'',
      paymentType: ''
    })
    setShowMenu(false);
    setUserClicked(false);
    setShowForm(false);
  };




  const handleShow = (item) => {
    setInvoiceValue(item);
    if (item.id !== undefined) {
      setEditOption('Edit');
      const dateObject = new Date(item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;

      // const EditCheck = state.InvoiceList.Invoice.find(view => view.User_Id === item.User_Id && view.BalanceDue === 0 && view.Date.includes(`${year}-${month}`));
      const EditCheck = state.InvoiceList.Invoice.find(view => {
        const viewDate = new Date(view.Date);
        return (
          view.User_Id === item.User_Id &&
          view.BalanceDue === 0 &&
          viewDate.getFullYear() === year &&
          viewDate.getMonth() === month - 1
        );
      });


      setShowMenu(true);
      setShowForm(true);
      let value = item.Name.split(" ");
      setSelectedUserId(item.User_Id);
      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setInvoiceList({
        id: item.id,
        firstName: value[0],
        lastName: value[1],
        phone: item.phoneNo,
        email: item.EmailID,
        hostel_Name: item.Hostel_Name,
        hostel_Id: item.Hostel_Id,
        FloorNo: item.Floor_Id,
        RoomNo: item.Room_No,
        date: formattedDate,
        // total_amount: Number(item.Amount)+Number(item.AmnitiesAmount)+Number(item.EbAmount),
        amount: item.Amount,
        paidAmount: item.PaidAmount,
        balanceDue: item.BalanceDue == 0 ? '00' : item.BalanceDue,
        dueDate: formattedDueDate,
        InvoiceId: item.Invoices,
        invoice_type: item.invoice_type
      });
      // }
    } else {
      setEditOption('Add');
      setSelectedUserId('');
      setShowForm(true);
      setUserClicked(true);
      setShowMenu(true);
    }
  };


  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (let page = 1; page <= totalPages; page++) {
      pageNumbers.push(page);
    }

    return pageNumbers;
  };

  const handlePageSelect = (eventKey) => {
    const selectedPage = parseInt(eventKey, 10);
    setCurrentPage(selectedPage);
  };

  const [searchItem, setSearchItem] = useState('')
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm)
    if (searchItem != '') {
      const filteredItems = state.InvoiceList.Invoice.filter((user) =>
        user.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice))
    }
    else {
      setData(state.InvoiceList.Invoice)
    }
  }

  const [searchicon, setSearchicon] = useState(false);

  const handleiconshow = () => {
    setSearchicon(!searchicon)
    setFiltericon(false)
  }
  useEffect(() => {
    dispatch({ type: 'HOSTELDETAILLIST', payload: { hostel_Id: invoiceList.hostel_Id } });
  }, [invoiceList.hostel_Id])
  const handleHostelId = (e) => {
    const hostelName = state.UsersList?.hostelList.filter((item) => {
      return item.id == e.target.value
    })
    const hosName = hostelName[0].Name
    setInvoiceList({ ...invoiceList, hostel_Name: hosName, hostel_Id: e.target.value, RoomNo: '', FloorNo: '' })


  }

  const handleFloor = (e) => {
    setInvoiceList({ ...invoiceList, FloorNo: e.target.value })

  }
  useEffect(() => {
    dispatch({ type: 'ROOMDETAILS', payload: { hostel_Id: invoiceList.hostel_Id, floor_Id: invoiceList.FloorNo } })
  }, [invoiceList.FloorNo])

  const handleRooms = (e) => {
    setInvoiceList({ ...invoiceList, RoomNo: e.target.value })

  }


  // const [updatemessage, setUpdatemessage] = useState('')

  // useEffect(() => {
  //   setUpdatemessage(state.InvoiceList.message)
  // }, [state.InvoiceList.message])









  const handleFiltershow = () => {
    setFiltericon(!filtericon)
    setSearchicon(false)
  }

  const handleStatusFilter = (e) => {
    const searchTerm = e.target.value;
    setStatusfilter(searchTerm)
    if (searchTerm == "ALL") {
      setData(state.InvoiceList.Invoice.slice(indexOfFirstRow, indexOfLastRow))
    }
    else {
      const filteredItems = state.InvoiceList.Invoice.filter((user) =>
        user.Status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setData(filteredItems);
    }
  }

  const randomNumberInRange = (hostelName, min, max) => {
    const prefix = hostelName.slice(0, 4)
    const invoice = prefix + (Math.floor(Math.random()
      * (max - min + 1)) + min);
    return invoice
  };





  const userIds = state.UsersList?.Users?.filter(item => item.User_Id !== '');


  const [selectedUserId, setSelectedUserId] = useState('')
  const [filteredUserDetails, setFilteredUserDetails] = useState([]);


  const handleUserIdChange = (e) => {
    setSelectedUserId(e.target.value);

  };




  useEffect(() => {
    if (selectedUserId) {
      const filteredDetails = state.UsersList?.Users.find(item => item.User_Id === selectedUserId);
      if (filteredDetails) {
        setFilteredUserDetails([filteredDetails]);
        setInvoiceList({
          ...invoiceList,
          firstName: filteredDetails.Name.split(' ')[0] || '',
          lastName: filteredDetails.Name.split(' ')[1] || '',
          phone: filteredDetails.Phone || '',
          email: filteredDetails.Email || '',
          hostel_Name: filteredDetails.HostelName || '',
          hostel_Id: filteredDetails.Hostel_Id || '',
          FloorNo: filteredDetails.Floor || '',
          RoomNo: filteredDetails.Rooms || '',
          // dueDate: new Date(d.getFullYear(), d.getMonth() + 1, 0)
        });
      } else {
        setFilteredUserDetails([]);
      }
    } else {
      setFilteredUserDetails([]);
    }
  }, [selectedUserId, state.UsersList?.Users, state.InvoiceList?.Invoice]);

  // const [displayText, setDisplayText] = useState(false)
  const [isSaveDisabled, setIsSaveDisabled] = useState(false)
  const [totalPaidAmount, setTotalPaidAmount] = useState('')







  const handleAmount = (e) => {

    if (!e.target.value) {
      setAmountErrmsg("Please Enter Amount");
    } else {
      setAmountErrmsg("");
    }
    const AmountValue = e.target.value.trim() !== "" ? parseFloat(e.target.value) : "";
    console.log("AmountValue", AmountValue);
    const selectedDate = new Date(invoiceList.date);
    const selectedMonth = selectedDate.getMonth();
    const roomRent = filteredUserDetails[0]?.RoomRent;
    console.log("roomRent", roomRent);

    const AlreadyPaidRoomRent = state.InvoiceList?.Invoice.filter(item => {
      const itemDate = new Date(item.Date);
      const itemMonth = itemDate.getMonth();
      return itemMonth === selectedMonth && item.User_Id === selectedUserId;
    });



    let totalPaidAmount = 0;
    AlreadyPaidRoomRent.forEach(item => {
      const paidAmount = parseFloat(item.Amount) || 0;
      totalPaidAmount += paidAmount;
    });


    setTotalPaidAmount(totalPaidAmount)

    if (!isNaN(AmountValue) && !isNaN(invoiceList.amount) && !isNaN(invoiceList.paidAmount) && !isNaN(invoiceList.balanceDue)) {

      var total_amount = invoiceList.amount; // Total Amount values
      var paid_amount = invoiceList.paidAmount; // Already Paid Amount
      var payablAmount = AmountValue; // New Amount
      var balance_due = invoiceList.balanceDue; // Balance Amount

      // Calculate the new total paid amount
      var cal1 = paid_amount + payablAmount;

      // Calculate the new balance due
      var new_balance_due = total_amount - cal1;
      // Validate the new amount to ensure it does not exceed the remaining balance
      if (total_amount < cal1) {
        console.log("This is Not crt value");
      } else {
        // Update the invoice list with the new payable amount and balance due
        setInvoiceList(prevState => ({
          ...prevState,
          payableAmount: payablAmount,
          balanceDue: new_balance_due,
        }));
      }
    }
  };

  const [showModal, setShowModal] = useState(false);


  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [showform, setShowform] = useState(false);

  const handleShowForm = (props) => {
    // console.log("currentitems", currentItems);
    console.log("state.InvoiceList.Invoice", state.InvoiceList.Invoice);
    setShowform(true);
    console.log("editclickvalue", props.item);
    setInvoiceValue(props.item);
    if (props.item.id !== undefined) {
      setEditOption('Edit');
      const dateObject = new Date(props.item.Date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();

      const lastDayOfMonth = new Date(year, month, 0);
      const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;

      // const EditCheck = state.InvoiceList.Invoice.find(view => view.User_Id === item.User_Id && view.BalanceDue === 0 && view.Date.includes(`${year}-${month}`));
      const EditCheck = state.InvoiceList.Invoice.find(view => {
        const viewDate = new Date(view.Date);
        return (
          view.User_Id === props.item.User_Id &&
          view.BalanceDue === 0 &&
          viewDate.getFullYear() === year &&
          viewDate.getMonth() === month - 1
        );
      });


      // setShowMenu(true);
      // setShowForm(true);
      let value = props.item.Name.split(" ");
      setSelectedUserId(props.item.User_Id);
      const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      setInvoiceList({
        id: props.item.id,
        firstName: value[0],
        lastName: value[1],
        phone: props.item.phoneNo,
        email: props.item.EmailID,
        hostel_Name: props.item.Hostel_Name,
        hostel_Id: props.item.Hostel_Id,
        FloorNo: props.item.Floor_Id,
        RoomNo: props.item.Room_No,
        date: formattedDate,
        // total_amount: Number(item.Amount)+Number(item.AmnitiesAmount)+Number(item.EbAmount),
        amount: props.item.Amount,
        paidAmount: props.item.PaidAmount,
        balanceDue: props.item.BalanceDue == 0 ? '00' : props.item.BalanceDue,
        dueDate: formattedDueDate,
        InvoiceId: props.item.Invoices,
        invoice_type: props.item.invoice_type
      });
      // }
    } else {
      setEditOption('Add');
      setSelectedUserId('');
      // setShowForm(true);
      setUserClicked(true);
      // setShowMenu(true);
    }
  }
  const handleCloseForm = () => {
    // setEdit(!edit)
    setShowform(false);
    setInvoiceList({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      hostel_Name: '',
      hostel_Id: '',
      FloorNo: '',
      RoomNo: '',
      amount: '',
      balanceDue: '',
      dueDate: '',
      // total_amount:'',
      transaction: '',
      paymentType: ''
    })

  }

  // const [transaction , setTransaction] =  useState ('')


  const handleSaveInvoiceList = () => {

    if (!invoiceList.payableAmount) {
      setAmountErrmsg('Please Enter Amount')
      return;
    }

    if (!invoiceList.transaction) {
      setPaymodeErrmsg('Please select Paymode Type')
      setTimeout(() => {
        setPaymodeErrmsg('')
      }, 3000)
      return;
    }

    if (!invoiceList.payableAmount || !formattedDate || !invoiceList.transaction) {
      setTotalErrmsg('Please enter All field')
      setTimeout(() => {
        setTotalErrmsg('')
      }, 2000)
      return;
    }

    const invoiceNo = randomNumberInRange(invoiceList.hostel_Name, 1, new Date())
    const CheckInvoiceNo = state.InvoiceList?.Invoice.some(item =>
      item.User_Id === selectedUserId && item.Invoices !== undefined
    );

    if (invoiceList.InvoiceId && invoiceList.payableAmount && invoiceList.transaction && formattedDate) {
      dispatch({
        type: 'UPDATEINVOICEDETAILS',
        payload: {
          id: invoiceList.id,
          invoice_id: invoiceList.InvoiceId,
          invoice_type: invoiceList.invoice_type,
          amount: invoiceList.payableAmount,
          balance_due: invoiceList.balanceDue,
          payment_by: invoiceList.transaction,
          payment_date: formattedDate
        }
      });

      setShowform(false);
    }
  }





  // const totalPages = Math.ceil(data.length / itemsPerPage);
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


 

  useEffect(() => {
    setinvoiceFilterddata(state.UsersList.customerdetails.invoice_details)
  }, [state.UsersList.customerdetails.invoice_details])




  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);


  console.log("selectedDate", selectedDate)



  const options = {
    dateFormat: 'd/m/Y',
    defaultDate: null,
    // defaultDate: selectedDate,
    maxDate: new Date(),
    minDate: null,
  };


  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate])

  const formatDateForPayload = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split('T')[0];
  };


  const [formattedDate, setFormattedDate] = useState('')
  console.log("formattedDate", formattedDate);


  const handleDateChange = (selectedDates) => {
    if (!selectedDates) {
      setDateErrmsg("Please Select Date");
    } else {
      setDateErrmsg("");
    }
    const date = selectedDates[0];
    setSelectedDate(date);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const lastDayOfMonth = new Date(year, month, 0);
    const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
    const formattedDate = formatDateForPayload(date);
    setFormattedDate(formattedDate)
    console.log("formattedDueDate ", formattedDate, formattedDueDate)
    setInvoiceList(prevState => ({
      ...prevState,
      date: formattedDate,
      dueDate: formattedDueDate,
    }));
  };



  //  const handleDateChange = (e) => {
  //     const selectedDate = new Date(e.target.value);

  //     const year = selectedDate.getFullYear();
  //     const month = selectedDate.getMonth() + 1;
  //     const lastDayOfMonth = new Date(year, month, 0);
  //     const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
  //     const selectedMonth = selectedDate.getMonth();
  //     const roomRent = filteredUserDetails[0]?.RoomRent;
  //     const AlreadyPaidRoomRent = state.InvoiceList?.Invoice.filter(item => {
  //       const itemDate = new Date(item.Date);
  //       const itemMonth = itemDate.getMonth();
  //       return itemMonth === selectedMonth && item.User_Id === selectedUserId;
  //     });

  //     let totalPaidAmount = 0;
  //     AlreadyPaidRoomRent.forEach(item => {
  //       const paidAmount = parseFloat(item.Amount) || 0;
  //       totalPaidAmount += paidAmount;
  //     });

  //     const isRoomRentPaid = roomRent === totalPaidAmount;
  //     // setDisplayText(isRoomRentPaid);
  //     setIsSaveDisabled(isRoomRentPaid);

  //     setInvoiceList(prevState => ({
  //       ...prevState,
  //       date: e.target.value,
  //       dueDate: formattedDueDate,
  //     }));
  //   }


  useEffect(()=> {
    dispatch({type: "USERLIST"})
  },[])

  const [customername , setCustomerName] =  useState ('');
  const [invoicenumber , setInvoiceNumber] =  useState ('');
  const [startdate , setStartDate] =  useState (null);
  const [enddate , setEndDate] =  useState (null);
  const [invoicedate , setInvoiceDate] =  useState (null);
  const [invoiceduedate , setInvoiceDueDate] =  useState (null);

  const [formatstartdate, setFormatStartDate] = useState(null)
  const [formatenddate, setFormatEndDate] = useState(null)
  const [formatinvoicedate, setFormatInvoiceDate] = useState(null)
  
  
  const [formatduedate, setFormatDueDate] = useState(null)
  console.log("formatinvoicedate",formatduedate);

  const [invoicetotalamounts,setInvoiceTotalAmount] = useState([])
  const [billamounts, setBillAmounts] = useState([])
  console.log("billamounts",billamounts);
  console.log("invoicetotalamounts",invoicetotalamounts);

  
const [ebamount, setEBAmount] = useState('')
const [rentamount , setRentAmount] = useState('')
const [amenityDetail , setAmenityDetails] = useState([])
console.log("amenityDetail",amenityDetail);

const [totalAmount , setTotalAmount] = useState('')

const [selectedData, setSelectedData] = useState([]);
console.log("selectedData",selectedData)

  const startRef = useRef(null);
  const endRef = useRef(null);
  const invoiceRef = useRef(null);
  const dueRef = useRef(null);


  const [bills , setBills] = useState([])
  console.log("bills",bills);
  const [availableOptions, setAvailableOptions] = useState(invoicetotalamounts);
  

  const [newRows, setNewRows] = useState([]);

const handleAddColumn = () => {
  const newRow = {
    description: '',
    used_unit: '',
    per_unit_amount: '',
    total_amount: '',
    amount: ''
  };
  setNewRows([...newRows, newRow]);
};

console.log("newRows",newRows);


    const [customererrmsg , setCustomerErrmsg] = useState('')
    const [invoicenumbererrmsg , setInvoicenumberErrmsg] = useState('')
    const [startdateerrmsg , setStartdateErrmsg] = useState('')
    const [enddateerrmsg , setEnddateErrmsg] = useState('')
    const [invoicedateerrmsg , setInvoiceDateErrmsg] = useState('')
    const [invoiceduedateerrmsg , setInvoiceDueDateErrmsg] = useState('')
    const [allfielderrmsg , setAllFieldErrmsg] = useState('')
  // useEffect(()=> {
  //  dispatch({type:'MANUAL-INVOICES-LIST'})
  //  },[])

  useEffect(() => {
    if (state.InvoiceList.ManualInvoicesgetstatuscode === 200 && !loading) {
     
      setBills(state.InvoiceList.ManualInvoices);
      setLoading(true); 
      console.log("MAnual invoice get status code");
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_LIST' });
        setLoading(false); 
      }, 1000);
    }
  }, [state.InvoiceList.ManualInvoices]); 
  
  useEffect(() => {
    if (state.InvoiceList.manualInvoiceAddStatusCode === 200 && !loading) {
  
      
      dispatch({ type: 'MANUAL-INVOICES-LIST' });
      console.log("MAnual invoice add status code");
      setBills(state.InvoiceList.ManualInvoices);
      setLoading(true); 
  
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD' });
        setLoading(false); 
      }, 1000);
    }
  }, [state.InvoiceList.manualInvoiceAddStatusCode]); // Add `loading` to the dependency array
  


  useEffect(() => {
    console.log("invoice added executed");
    if (state.InvoiceList?.InvoiceListStatusCode == 200) {
     
      dispatch({type:'MANUAL-INVOICES-LIST'})
      console.log("MAnual invoice status code");
      setBills(state.InvoiceList.ManualInvoices)
      // setLoading(true);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_LIST' });
      }, 1000);
    }
  }, [state.InvoiceList?.InvoiceListStatusCode])







  // console.log("InvoiceList", state.InvoiceList);
 

  useEffect(() => {
    console.log("statuscode", state.InvoiceList.message);
    if (state.InvoiceList.message != "" && state.InvoiceList.message != null) {
      console.log("statuscode_number", state.InvoiceList.UpdateInvoiceStatusCode);
      dispatch({type:'MANUAL-INVOICES-LIST'})
      console.log("MAnual invoice update status code");
      setBills(state.InvoiceList.ManualInvoices)
      // setLoading(true)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_UPDATE_LIST' });
      }, 100);


    }
  }, [state.InvoiceList])

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
      dueRef.current.flatpickr.set(options);
    }
}, [startdate, enddate , invoicedate, invoiceduedate ])


  const handleCustomerName = (e) => {
    setCustomerName(e.target.value)
    if(!e.target.value){
      setCustomerErrmsg("Please Select Name")
    }
    else{
      setCustomerErrmsg('')
    }
    setStartDate('');
    setEndDate('');
    setSelectedData('');
    // setAvailableOptions('');
    setBillAmounts('')
    setTotalAmount('')
  }




  const handleBackBill = () => {
    setShowManualInvoice(false)
    setShowRecurringBillForm(false)
setShowAllBill(true)
    setCustomerName('');
    setInvoiceNumber('');
    setStartDate('');
    setEndDate('');
    setInvoiceDate('');
    setInvoiceDueDate('');
    setSelectedData('');
    setAvailableOptions('');
    setBillAmounts('')
    setTotalAmount('')
    
  }
  

  useEffect(() => {
    if (customername) {
      dispatch({ type: 'MANUAL-INVOICE-NUMBER-GET', payload: { user_id: customername } });
    }
  }, [customername]); 
  
 
  useEffect(() => {
    if (state.InvoiceList.Manulainvoicenumberstatuscode === 200) {

      setInvoiceNumber(state.InvoiceList.ManualInvoiceNUmber.invoice_number);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_MANUAL_INVOICE_NUMBER_GET' });
      }, 100);
    }
  }, [state.InvoiceList.ManualInvoiceNUmber.invoice_number, state.InvoiceList.Manulainvoicenumberstatuscode]); 
  
  


  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    if (!dataFetched) {
      dispatch({
        type: 'GET-MANUAL-INVOICE-AMOUNTS',
        payload: {
          user_id: customername,
          start_date: formatstartdate,
          end_date: formatenddate
        }
      });

    

      if (state.InvoiceList.manualInvoiceStatusCode === 200) {
        const totalArray = state?.InvoiceList?.ManualInvoice?.total_array;
        
        if (totalArray) {
          setInvoiceTotalAmount(totalArray); 
        }
        setDataFetched(true); 
        setTimeout(() => {
          dispatch({ type: 'REMOVE_STATUS_CODE_MANUAL_INVOICE_AMOUNT_GET' });
        }, 1000);
      }
    }
  }, [customername, formatstartdate, formatenddate, dataFetched, state.InvoiceList.manualInvoiceStatusCode , state.InvoiceList.ManualInvoice.total_array]);

    


  const formatDateForPayloadmanualinvoice = (date) => {
    if (!date) return null;
    const offset = date.getTimezoneOffset();
    date.setMinutes(date.getMinutes() - offset);
    return date.toISOString().split('T')[0]; 
  };


  const handlestartDate = (selectedDates) => {
        const date = selectedDates[0];
        setStartDate(date);

           if(!selectedDates){
            setStartdateErrmsg("Please Select Date")
           }
           else{
            setStartdateErrmsg('')
           }
       
       const formattedDate = formatDateForPayloadmanualinvoice(date);    
       setFormatStartDate(formattedDate)

  }

  const handleEndDate = (selectedDates) => {
       const date = selectedDates[0];
       setEndDate(date);
       if(!selectedDates){
        setEnddateErrmsg("Please Select Date")
       }
       else{
        setEnddateErrmsg('')
       }

      const formattedDate = formatDateForPayloadmanualinvoice(date);
      setFormatEndDate(formattedDate)
  }

  const handleInvoiceDate = (selectedDates) => {
       const date = selectedDates[0];
       setInvoiceDate(date);
       if(!selectedDates){
        setInvoiceDateErrmsg("Please Select Date")
       }
       else{
        setInvoiceDateErrmsg('')
       }

       const formattedDate = formatDateForPayloadmanualinvoice(date);
       setFormatInvoiceDate(formattedDate)
  }


  const handleDueDate = (selectedDates) => {
        const date = selectedDates[0];
        setInvoiceDueDate(date);
        if(!selectedDates){
          setInvoiceDueDateErrmsg("Please Select Date")
         }
         else{
          setInvoiceDueDateErrmsg('')
         }

        const formattedDate = formatDateForPayloadmanualinvoice(date);
        setFormatDueDate(formattedDate)
  }

  
  

 


           useEffect(() => {
                 if (invoicetotalamounts && invoicetotalamounts.length > 0) {
                 setBillAmounts(invoicetotalamounts);
                 } 
                 else {
                 console.error("No data from API or empty array");
                      }
       }, [invoicetotalamounts]);

 




         const handleSelectChange = (e) => {
               const selectedDescription = e.target.value;  
               const selectedOption = invoicetotalamounts.find(opt => opt.description === selectedDescription);
  
               if (selectedOption) {
                 setBillAmounts([...billamounts, selectedOption]);
                 setAvailableOptions(availableOptions.filter(opt => opt.description !== selectedDescription));
                   }
              };
  



         const handleAmountChange = (index, value) => {
              const updatedData = [...billamounts];
              updatedData[index] = { ...updatedData[index], amount: value }; 
              setBillAmounts(updatedData);                                  
              };



          const handleDelete = (item) => {
             setBillAmounts(billamounts.filter(bill => bill.description !== item.description));
             setAvailableOptions([...availableOptions, item]);
              };



       useEffect(()=> {

          if(billamounts && billamounts.length > 0){
              console.log("billamounts",billamounts);
    
          const  EbAmount = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 10);// EB Amount with id 10 
          const  RoomRentItem = billamounts && billamounts.length > 0 && billamounts.find(item => item.id == 50); // Room Rent with id 50
           console.log("RoomRentItem",RoomRentItem);
  
  
          setEBAmount(EbAmount)
          setRentAmount(RoomRentItem)

          var  amenities = billamounts && billamounts.length > 0 && billamounts.filter(item => item.id != 10 && item.id != 50);
          console.log("amenities",amenities);

         const AmenityDetails = amenities.map(item => ({
            am_name: item.description,   
            amount: item.amount
            }));
            setAmenityDetails(AmenityDetails)
  


         const  totalAmount = (
            parseFloat(EbAmount?.amount || 0) +
            parseFloat(RoomRentItem?.amount || 0) +
            AmenityDetails.reduce((sum, amenity) => sum + parseFloat(amenity.amount || 0), 0) );
            setTotalAmount(totalAmount)

                  }

    },[billamounts])


       const handleNewRowChange = (index, field, value) => {
           const updatedRows = [...newRows];
           updatedRows[index][field] = value;
            setNewRows(updatedRows);
           };


       const handleDeleteNewRow = (index) => {
             const updatedRows = newRows.filter((_, i) => i !== index);
             setNewRows(updatedRows);
            };







      const handleCreateBill = () => {

           const allRows = [...billamounts, ...newRows];

           const amenityArray = amenityDetail.map(detail => ({
              am_name: detail.am_name,
              amount: detail.amount
               })).filter(detail => detail.am_name && detail.amount);

               if(!customername){
                setCustomerErrmsg('Please Select  Customer')
                return;
               }
               if(!invoicenumber){
                  setInvoicenumberErrmsg("Please Update customer name")
                  return;
                }
               

               if(!startdate){
                setStartdateErrmsg('Please Select  Date')
                return;
               }

               if(!enddate){
                setEnddateErrmsg('Please Select  Date')
                return;
               }

               if(!formatinvoicedate){
                setInvoiceDateErrmsg('Please Select  Date')
                return;
               }

               if(!formatduedate){
                setInvoiceDueDateErrmsg('Please Select  Date')
                return;
               }
               if(!customername || !invoicenumber || !startdate || !enddate || !formatinvoicedate || !formatduedate){
                setAllFieldErrmsg('Please Enter All Field')
                setTimeout(()=> {
                  setAllFieldErrmsg('')
                },2000)
                return;
               }

              
               if(customername && invoicenumber && formatstartdate && formatenddate && formatinvoicedate && formatduedate){
                dispatch({
                  type: 'MANUAL-INVOICE-ADD',
                  payload: { user_id: customername, date: formatinvoicedate , due_date :formatduedate ,
                  invoice_id: invoicenumber, room_rent : rentamount?.amount , eb_amount :ebamount?.amount || 0, total_amount : totalAmount , 
                  amenity: amenityArray.length > 0 ? amenityArray : []
                  }
                  });
               }

            setShowManualInvoice(true)
            setCustomerName('');
            setInvoiceNumber('');
            setStartDate('');
            setEndDate('');
            setInvoiceDate('')
            setInvoiceDueDate('')
            setSelectedData('')
            setAvailableOptions('');
            setTotalAmount('')
            setBillAmounts([]);
            setNewRows([]);
            }




            const invoicerowsPerPage = 15;
            const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
            const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);
          
            const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
            const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
            const currentRowinvoice = bills?.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice);
          
          
          
          
            const handleInvoicePageChange = (InvoicepageNumber) => {
              setinvoicecurrentPage(InvoicepageNumber);
            };
          
            const totalPagesinvoice = Math.ceil(bills?.length / invoicerowsPerPage);
            console.log("invoicedetails", bills);
          
          
            const renderPageNumbersInvoice = () => {
              const pageNumbersInvoice = [];
              let startPageInvoice = invoicecurrentPage - 1;
              let endPageInvoice = invoicecurrentPage + 1;
          
              if (invoicecurrentPage === 1) {
                startPageInvoice = 1;
                endPageInvoice = 3;
              }
          
              if (invoicecurrentPage === totalPagesinvoice) {
                startPageInvoice = totalPagesinvoice - 2;
                endPageInvoice = totalPagesinvoice;
              }
          
              if (invoicecurrentPage === 2) {
                startPageInvoice = 1;
                endPageInvoice = 3;
              }
          
              if (invoicecurrentPage === totalPagesinvoice - 1) {
                startPageInvoice = totalPagesinvoice - 2;
                endPageInvoice = totalPagesinvoice;
              }
          
              for (let i = startPageInvoice; i <= endPageInvoice; i++) {
                if (i > 0 && i <= totalPagesinvoice) {
                  pageNumbersInvoice.push(
                    <li key={i} style={{ margin: '0 5px' }}>
                      <button
                        style={{
                          padding: '5px 10px',
                          textDecoration: 'none',
                          color: i === invoicecurrentPage ? '#007bff' : '#000000',
                          cursor: 'pointer',
                          borderRadius: '5px',
                          display: 'inline-block',
                          minWidth: '30px',
                          textAlign: 'center',
                          backgroundColor: i === invoicecurrentPage ? 'transparent' : 'transparent',
                          border: i === invoicecurrentPage ? '1px solid #ddd' : 'none'
                        }}
                        onClick={() => handleInvoicePageChange(i)}
                      >
                        {i}
                      </button>
                    </li>
                  );
                }
              }
          
              return pageNumbersInvoice;
            };


  const rowsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = bills.slice(indexOfFirstRow, indexOfLastRow);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(bills.length / rowsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = currentPage - 1;
    let endPage = currentPage + 1;

    if (currentPage === 1) {
      startPage = 1;
      endPage = 3;
    }

    if (currentPage === totalPages) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }

    if (currentPage === 2) {
      startPage = 1;
      endPage = 3;
    }

    if (currentPage === totalPages - 1) {
      startPage = totalPages - 2;
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(
          <li key={i} style={{ margin: '0 5px' }}>
            <button
              style={{
                padding: '5px 10px',
                textDecoration: 'none',
                color: i === currentPage ? '#007bff' : '#000000',
                cursor: 'pointer',
                borderRadius: '5px',
                display: 'inline-block',
                minWidth: '30px',
                textAlign: 'center',
                backgroundColor: i === currentPage ? 'transparent' : 'transparent',
                border: i === currentPage ? '1px solid #ddd' : 'none'
              }}
              onClick={() => handlePageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbers;
  };

  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = bills.slice(indexOfFirstItem, indexOfLastItem);




  const [value, setValue] = React.useState('1');


  const handleChanges = (event, newValue) => {
    setValue(newValue);
    console.log("newValue", newValue)


  }

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [DownloadInvoice, setDownloadInvoice] = useState(false)

  const [showPdfModal, setShowPdfModal] = useState(false)
  const [rowData, setRowData] = useState('')

  const handleDisplayInvoiceDownload = (isVisible, rowData) => {
    setDownloadInvoice(isVisible)
    setShowPdfModal(true)
    setRowData(rowData)
    // console.log("rowData",rowData)
  }

  const handleBackClose = () => {
    setDownloadInvoice(false)
  }

  const handleClosePdfModal = () => {
    // setShowPdfModal(false)
    setDownloadInvoice(false)
  }



  return (
    <>
{showAllBill && 
<div>
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className='container ms-3 me-3'>


<p style={{ fontSize: "23px", fontFamily: 'Gilroy', fontWeight: 600, color: '#222' }}>Bills</p>


<div >


  {showLoader && <LoaderComponent />}

  <div style={{ display: 'flex', flexDirection: 'row' }}>

    {
      searchicon &&
      <>
        <input
          type="text"
          value={searchItem}
          onChange={(e) => handleInputChange(e)}
          placeholder='Search By Name'
          class="form-control ps-4 pe-1 mt-4  searchinput"
          style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}

        />
      </>
    }
    <BsSearch class=" me-4 mt-4" onClick={handleiconshow} />
    {
      filtericon &&
      <>
        <Form.Select aria-label="Default select example" value={statusfilter} onChange={(e) => handleStatusFilter(e)}
          id="vendor-select" className='ps-3 mt-3'
          style={{ marginRight: '20px', fontFamily: "Gilroy", fontSize: "16px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #dcdcdc", height: "35px" }}
        >

          <option id="vendor-select" selected value="ALL"> ALL</option>
          <option id="vendor-select" value="Success">Success</option>
          <option id="vendor-select" value="Pending">Pending</option>

        </Form.Select>
      </>
    }
    <div className='me-3 mt-3'>
      <Image src={Sort} roundedCircle style={{ height: "30px", width: "30px" }} onClick={handleFiltershow} />
    </div>
    <div className='me-4'>
      {value == 1 ?
        <Button
          onClick={handleManualShow}
          style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Record Payment
        </Button>
        :
        <Button
          onClick={handleRecurrBillShow}
          style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Record Payment
        </Button>


      }
    </div>
  </div>
</div>
</div>

<TabContext value={value}>
<div >
  <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
    <TabList orientation={isSmallScreen ? 'vertical' : 'horizontal'} onChange={handleChanges} aria-label="lab API tabs example" style={{ marginLeft: '20px' }} className='d-flex flex-column flex-xs-column flex-sm-column flex-lg-row'>
      <Tab label="Bills" value="1" style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
      <Tab label="Recurring Bills" value="2" style={{ fontSize: 16, fontFamily: "Gilroy", color: '#4B4B4B', lineHeight: 'normal', fontStyle: 'normal', fontWeight: 500, textTransform: 'none' }} />
    </TabList>
  </Box>
</div>

<TabPanel value="1">
  <>

    <div class='' style={{ marginTop: "20px", position: "relative" }} >

      <div className='texxttt'>
        <div style={{ flex: 1 }}>
          {/* <div className="headerone">

<div className="search-container">
<input type="text" placeholder="Search" className="search-input" />
<span className="search-icon"></span>
</div>
<div className="notification-container">


  


<div type="button" onClick={handleShowpopup}>
<img src={NotificationIcon} className="notification-icon" alt="notification icon" />
<span className="notification-dot"></span>
</div>


</div>
<div className="profile-container">
<img src={rectangle}  className="profile-image" />
</div>
</div> */}
        </div>
      </div>

      {/* <div className='container d-flex justify-content-end align-items-center mr-3'>

  <div>
    <InputGroup>
      <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
        <CiSearch style={{ fontSize: 20 }} />
      </InputGroup.Text>
      <FormControl size="lg" style={{ boxShadow: "none", borderColor: "lightgray", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "gray", fontWeight: 600 } }}
        placeholder="Search..."
      />
    </InputGroup>
  </div>
  <div className="mr-3">
    <img src={Notify} alt="notification" />
  </div>

  <div className="mr-3">
    <Image src={Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
  </div>
</div> */}










      {showform &&
        <div
          className="modal show"
          style={{
            display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={showform} onHide={handleCloseForm} backdrop="static"
            centered>
            <Modal.Dialog style={{ maxWidth: 850, width: '600px' }} className='m-0 p-0'>
              <Modal.Header closeButton closeLabel="close-button" style={{ border: "1px solid #E7E7E7" }}>
                <Modal.Title style={{ fontSize: 20, color: "#222222", fontFamily: "Gilroy,sans-serif", fontWeight: 600 }}>Record payment</Modal.Title>
              </Modal.Header>

              <Modal.Body>


                <div className='row mt-4'>



                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Label
                      >
                        Due Amount
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter amount"
                        value={invoiceList.balanceDue}
                        readOnly
                      />
                    </Form.Group>
                  </div>




                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                      <Form.Label
                      >
                        Paid Amount
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter amount"
                        value={invoiceList.payableAmount}
                        onChange={(e) => { handleAmount(e) }}

                      />
                      {amounterrormsg.trim() !== "" && (
                        <div>
                          <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                            {amounterrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {amounterrormsg}
                          </p>
                        </div>
                      )}
                    </Form.Group>
                  </div>


                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500 }}>Paid Date</Form.Label>

                    {/* <div className="rectangle-group">
                    <div className="frame-child1" />
                    <input
                      className="frame-input"
                      placeholder="DD-MM-YYYY"
                      type="date"
                      value={invoiceList.date}
                      onChange={(e) => { handleDateChange(e) }}
                    />
                    <img
                      className="vuesaxlinearcalendar-icon"
                      alt=""
                      src={Calendor}
                    />
                  </div> */}


                    <div style={{ position: 'relative' }}>
                      <label
                        htmlFor="date-input"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                          padding: 7,
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "rgba(75, 75, 75, 1)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        onClick={() => {
                          if (calendarRef.current) {
                            calendarRef.current.flatpickr.open();
                          }
                        }}
                      >
                        {selectedDate instanceof Date && !isNaN(selectedDate) ? selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                        <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                      </label>
                      <Flatpickr
                        ref={calendarRef}
                        options={options}
                        placeholder="Select Date"
                        value={selectedDate}
                        onChange={handleDateChange}
                        style={{
                          padding: 10,
                          fontSize: 16,
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #D9D9D9",
                          position: 'absolute',
                          top: 100,
                          left: 100,
                          zIndex: 1000,
                          display: "none"
                        }}
                      />
                    </div>

                    {dateerrmsg.trim() !== "" && (
                      <div>
                        <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                          {dateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {dateerrmsg}
                        </p>
                      </div>
                    )}

                  </div>


                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                      <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "'Gilroy', sans-serif", fontWeight: 500 }}>
                        Mode of transaction
                      </Form.Label>
                      <Form.Select
                        className='border'

                        value={invoiceList.transaction}
                        // value={editOption == 'Add' ? item.Name.split(' ')[0] : invoiceList.firstName}
                        onChange={(e) => { setInvoiceList({ ...invoiceList, transaction: e.target.value }) }}
                        style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy, sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 40, borderRadius: 8 }}
                      >
                        <option selected>select </option>
                        <option value="Cash">Cash </option>
                        <option value="Debit Card">Debit Card</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="UPI">UPI</option>
                      </Form.Select>
                      {paymodeerrormsg.trim() !== "" && (
                        <div>
                          <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                            {paymodeerrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {paymodeerrormsg}
                          </p>
                        </div>
                      )}
                    </Form.Group>
                  </div>

                </div>
                {totalErrormsg.trim() !== "" && (
                  <div>
                    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
                      {totalErrormsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {totalErrormsg}
                    </p>
                  </div>
                )}
              </Modal.Body>
              <Modal.Footer style={{ border: "none" }}>
                <Button className='w-100' style={{ backgroundColor: "#1E45E1", fontWeight: 600, height: 50, borderRadius: 12, fontSize: 16, fontFamily: "Montserrat, sans-serif" }}
                  onClick={handleSaveInvoiceList}

                >
                  Record payment
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      }


      {/* {currentItems.length > 0 && */}
        {/* <> */}

          <Container fluid className='p-0'>
            <Row className={` ${DownloadInvoice ? 'm-0 g-2 d-flex justify-content-between' : 'm-0 g-0'}`}>

              <Col lg={DownloadInvoice ? 4 : 12} md={DownloadInvoice ? 4 : 12} sm={DownloadInvoice ? 4 : 12} xs={DownloadInvoice ? 4 : 12}>


                {
                  DownloadInvoice ?

                    <div className='show-scroll p-2' style={{ maxHeight: 700, overflowY: "auto" }}>

                      {bills.map((item) => (

                        <>
                          {/* <div className="" style={{}}>
                            <div className="d-flex  align-items-center justify-content-evenly w-100 "  >


                              <div >
                                <span ><img src={User} style={{ height: 40, width: 40, }} /></span>
                              </div>


                              <div className=''>

                                <div className="d-flex justify-content-between  align-items-center w-100 mb-2">

                                  <div className="Invoice_Name" style={{ fontFamily: 'Gilroy', fontSize: '14px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600, cursor: "pointer" }} onClick={() => handleDisplayInvoiceDownload(true, item)} >{item.Name}</div>
                                  <div style={{ fontFamily: 'Gilroy', fontSize: '12px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600 }}>{item.Amount}</div>

                                </div>

                                <div className="d-flex justify-content-between gap-3 align-items-center w-100 mb-2 mt-2" style={{ backgroundColor: "" }}>

                                  <div style={{ fontFamily: 'Gilroy', fontSize: '12px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600 }}>#{item.Invoices == null || item.Invoices == '' ? '0.00' : item.Invoices}</div>
                                  <div className="" style={{ fontFamily: 'Gilroy', fontSize: '12px', wordWrap: 'break-word', color: "#222", fontStyle: 'normal', lineHeight: 'normal', fontWeight: 600 }}>{moment(item.Date).format("DD MMM YYYY")}</div>

                                </div>

                                <div className='mb-2 mt-2'>
                                  {item.BalanceDue === 0 ? <span style={{ fontSize: '10px',backgroundColor: '#D9FFD9', color: '#000', borderRadius: '14px', fontFamily: 'Gilroy', padding: "8px 12px" }}>Paid</span> : <span

                                    style={{ cursor: 'pointer',fontSize: '10px', backgroundColor: '#FFD9D9', fontFamily: 'Gilroy', color: '#000', borderRadius: '14px', padding: "8px 12px" }}>Unpaid</span>}
                                </div>

                              </div>

                            </div>
                          </div> */}
                          <div className="" style={{}}>
                            <div className="d-flex align-items-start justify-content-between w-100 p-2">


                              <div>
                                <span>
                                  <img src={ item.user_profile && item.user_profile !== "0"
                                ? item.user_profile
                                : User} style={{ height: 40, width: 40 }} alt="User" />
                                </span>
                              </div>


                              <div className="flex-grow-1 ms-2">
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                  <div
                                    className="Invoice_Name"
                                    style={{
                                      fontFamily: 'Gilroy',
                                      fontSize: '14px',
                                      wordWrap: 'break-word',
                                      color: "#222",
                                      fontStyle: 'normal',
                                      lineHeight: 'normal',
                                      fontWeight: 600,
                                      cursor: "pointer"
                                    }}
                                    onClick={() => handleDisplayInvoiceDownload(true, item)}
                                  >
                                    {item.Name}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'Gilroy',
                                      fontSize: '12px',
                                      wordWrap: 'break-word',
                                      color: "#222",
                                      fontStyle: 'normal',
                                      lineHeight: 'normal',
                                      fontWeight: 600
                                    }}
                                  >
                                    {item.Amount}
                                  </div>
                                </div>

                                <div className="d-flex justify-content-between gap-3 mb-2">
                                  <div
                                    style={{
                                      fontFamily: 'Gilroy',
                                      fontSize: '12px',
                                      wordWrap: 'break-word',
                                      color: "#222",
                                      fontStyle: 'normal',
                                      lineHeight: 'normal',
                                      fontWeight: 600
                                    }}
                                  >
                                    {item.Invoices == null || item.Invoices === '' ? '0.00' : item.Invoices}
                                  </div>
                                  <div
                                    style={{
                                      fontFamily: 'Gilroy',
                                      fontSize: '12px',
                                      wordWrap: 'break-word',
                                      color: "#222",
                                      fontStyle: 'normal',
                                      lineHeight: 'normal',
                                      fontWeight: 600
                                    }}
                                  >
                                    {moment(item.Date).format("DD MMM YYYY")}
                                  </div>
                                </div>

                                <div className='mb-2'>
                                  {item.BalanceDue === 0 ? (
                                    <span style={{
                                      fontSize: '10px',
                                      backgroundColor: '#D9FFD9',
                                      color: '#000',
                                      borderRadius: '14px',
                                      fontFamily: 'Gilroy',
                                      padding: "8px 12px"
                                    }}>
                                      Paid
                                    </span>
                                  ) : (
                                    <span style={{
                                      cursor: 'pointer',
                                      fontSize: '10px',
                                      backgroundColor: '#FFD9D9',
                                      fontFamily: 'Gilroy',
                                      color: '#000',
                                      borderRadius: '14px',
                                      padding: "8px 12px"
                                    }}>
                                      Unpaid
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>

                          <hr />

                        </>
                      ))
                      }
                    </div>
                    :
                    <>

{state?.InvoiceList?.ManualInvoices && state?.InvoiceList?.ManualInvoices.length === 0 && !loading &&
                  <div>
                  <div style={{ textAlign: "center"}}> <img src={Emptystate} alt="emptystate" /></div> 
                  <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No bills available </div>
                  <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no bills added </div>
              
               <div style={{ textAlign: "center"}}>
                           <Button
                            //  onClick={handleShow}
                             style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Record Payment</Button>
                         </div>
             </div>    
                  }
                   {currentItems && currentItems.length > 0 && (
                      <Table
                        responsive="md"
                        className='Table_Design'
                        style={{
                          height: "auto",
                          overflow: "visible",
                          tableLayout: "auto",
                          borderRadius: "24px",
                          border: "1px solid #DCDCDC",

                        }}
                      >
                        <thead style={{ backgroundColor: "#E7F1FF" }}>

                          <tr>
                            <th style={{
                              textAlign: "center",
                              fontFamily: "Gilroy",
                              color: "rgba(34, 34, 34, 1)",
                              fontSize: 14,
                              fontWeight: 600,
                              borderTopLeftRadius: 24
                            }}>Name</th>
                            <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Invoice number</th>
                            <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Created</th>
                            <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Due Date</th>
                            <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Amount</th>
                            <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Due</th>
                            <th style={{ textAlign: "center", fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 600 }}>Status</th>
                            <th style={{
                              textAlign: "center",
                              fontFamily: "Gilroy",
                              color: "rgba(34, 34, 34, 1)",
                              fontSize: 14,
                              fontWeight: 600,
                              borderTopRightRadius: 24
                            }}></th>
                          </tr>


                        </thead>
                        <tbody style={{ fontSize: "10px" }}>
  {loading ? (
    // Display skeleton placeholders when loading is true
    Array.from({ length: 5 }).map((_, index) => (
      <tr key={index}>
        <td>
          <div className="d-flex">
            <span className="i-circle">
              <Skeleton circle width={24} height={24} style={{ padding: "10px", border: "none" }} />
            </span>
            <div>
              <Skeleton width={80} style={{ padding: "5px", border: "none" }} />
            </div>
          </div>
        </td>
        <td style={{ padding: "10px", border: "none" }}>
          <Skeleton width={100} />
        </td>
        <td style={{ padding: "10px", border: "none" }}>
          <Skeleton width={100} />
        </td>
        <td style={{ padding: "10px", border: "none" }}>
          <Skeleton width={50} />
        </td>
        <td style={{ padding: "10px", border: "none" }}>
          <Skeleton width={50} />
        </td>
        <td style={{ padding: "10px", border: "none" }}>
          <Skeleton width={100} />
        </td>
        <td style={{ padding: "10px", border: "none" }}>
          <Skeleton width={100} />
        </td>
      </tr>
    ))
  ) :
    // Display table rows with actual data when loading is false
    currentItems.map((item) => (
      <InvoiceTable
        key={item.id}
        item={item}
        OnHandleshowform={handleShowForm}
        OnHandleshowInvoicePdf={handleInvoiceDetail}
        DisplayInvoice={handleDisplayInvoiceDownload}
      />
    ))
  }
</tbody>

                      </Table>
)}


                      {currentItems.length > 0 && (
                        <nav>
                          <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
                            <li style={{ margin: '0 5px' }}>
                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: currentPage === 1 ? '#ccc' : '#007bff',
                                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                              >

                                <ArrowLeft2 size="16" color="#1E45E1" />
                              </button>


                            </li>
                            {currentPage > 3 && (
                              <li style={{ margin: '0 5px' }}>
                                <button
                                  style={{
                                    padding: '5px 10px',
                                    textDecoration: 'none',
                                    color: 'white',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    minWidth: '30px',
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    border: "none"
                                  }}
                                  onClick={() => handlePageChange(1)}
                                >
                                  1
                                </button>
                              </li>
                            )}
                            {currentPage > 3 && <span>...</span>}
                            {renderPageNumbers()}
                            {currentPage < totalPages - 2 && <span>...</span>}
                            {currentPage < totalPages - 2 && (
                              <li style={{ margin: '0 5px' }}>
                                <button
                                  style={{
                                    padding: '5px 10px',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    borderRadius: '5px',
                                    display: 'inline-block',
                                    minWidth: '30px',
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    border: "none"
                                  }}
                                  onClick={() => handlePageChange(totalPages)}
                                >
                                  {totalPages}
                                </button>
                              </li>
                            )}
                            <li style={{ margin: '0 5px' }}>

                              <button
                                style={{
                                  padding: '5px 10px',
                                  textDecoration: 'none',
                                  color: currentPage === totalPages ? '#ccc' : '#007bff',
                                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                                  borderRadius: '5px',
                                  display: 'inline-block',
                                  minWidth: '30px',
                                  textAlign: 'center',
                                  backgroundColor: 'transparent',
                                  border: "none"
                                }}
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                              >

                                <ArrowRight2 size="16" color="#1E45E1" />
                              </button>
                            </li>
                          </ul>
                        </nav>
                      )}
                    </>

                }








              </Col>


              {DownloadInvoice && (
                <>
                  {/* <Col lg={1} md={1} sm={12} xs={12} style={{ display: "flex", alignItems: "stretch", justifyContent: "end" }}>
                    <div
                      style={{
                        borderLeft: "1px solid rgba(225, 225, 225, 1)",
                        height: "100%",

                      }}
                    ></div>
                  </Col> */}


                <Col lg={8} md={8} sm={12} xs={12} style={{
                  borderLeft: DownloadInvoice ? '1px solid #ccc' : 'none',
                }}>

                    <BillPdfModal show={showPdfModal} handleClosed={handleClosePdfModal} rowData={rowData} />

                    {/* <label className=" m-5" onClick={handleBackClose}>Back</label> */}
                  </Col>
                </>
              )}
            </Row>
          </Container>







        {/* </> */}
      {/* } */}









      {/* {!loading && currentItems.length === 0 && (
        <div  >
          <div>
            <div style={{ textAlign: "center" }}> <img src={Emptystate} alt="emptystate" /></div>
            <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No bills available </div>
            <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no bills added </div>

            <div style={{ textAlign: "center" }} className='mt-2'>
              <Button
                style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Record Payment</Button>
            </div>
          </div>

        </div>

      )} */}


    </div>


  </>
</TabPanel>

<TabPanel value="2">


  <div  >
    <div>
      <div style={{ textAlign: "center" }}> <img src={Emptystate} alt="emptystate" /></div>
      <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No recurring bills available </div>
      <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are no recurring bills added </div>

      <div style={{ textAlign: "center" }} className='mt-2'>
        <Button
          style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 200, padding: "18px, 20px, 18px, 20px", color: '#FFF', fontFamily: 'Montserrat' }}> + Record Payment</Button>
      </div>
    </div>

  </div>
</TabPanel>

</TabContext>
</div>
}


{showmanualinvoice && 

<div className='container ms-5 me-5'>

  <div style={{display:'flex',flexDirection:'row'}}>
  {/* <MdOutlineKeyboardDoubleArrowLeft onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}}  /> */}
  <svg onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg>
  <p className='mt-1'>New Bill</p>
  </div>

  <div className='col-lg-7 col-md-6 col-sm-12 col-xs-12'>
  <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
    <Form.Label 
      style={{ 
        fontFamily: 'Gilroy', 
        fontSize: 14, 
        fontWeight: 500, 
        color: "#222", 
        fontStyle: 'normal', 
        lineHeight: 'normal' 
      }}>
      Customer
    </Form.Label>
    <Form.Select 
      aria-label="Default select example" 
      value={customername} 
      onChange={handleCustomerName} 
      className='border' 
      style={{ 
        fontSize: 16, 
        color: "#4B4B4B", 
        fontFamily: "Gilroy", 
        lineHeight: '18.83px', 
        fontWeight: 500, 
        boxShadow: "none", 
        border: "1px solid #D9D9D9", 
        height: 38, 
        borderRadius: 8 
      }}>
        <option value=''>Select Customer</option>
         {state.UsersList?.Users.filter(u => u.Bed !== 'undefined' && u.Bed !== '0' && u.Bed.trim() !== '' && u.Rooms !== 'undefined' && u.Rooms !== '0' && u.Rooms.trim() !== '') 
          .map((u) => (
          <option  value={u.ID}>{u.Name}</option>
    ))
}
    </Form.Select>
    {customererrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {customererrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {customererrmsg}
    </p>
  </div>
)}
  </Form.Group>
</div>



              <div className='col-lg-3 col-md-4 col-sm-12 col-xs-12'>
        <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
          <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }} >Invoice Number</Form.Label>
          <Form.Control
            style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", lineHeight: '18.83px', fontWeight: 500 }}
            type="text"
            placeholder="Enter invoice number"
            value={invoicenumber || ''} 
          />
                   {invoicenumbererrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {invoicenumbererrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoicenumbererrmsg}
    </p>
  </div>
)}
    
        </Form.Group>
      </div>

      <div style={{display:'flex',flexDirection:'row'}}>
      <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12 me-4'>
                    <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Start Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                    <div style={{ position: 'relative' }}>
                      <label
                        htmlFor="date-input"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                          padding: 7,
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#222222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Ensure space between text and icon
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          if (startRef.current) {
                            startRef.current.flatpickr.open();
                          }
                        }}
                      >
                        {startdate ? startdate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                        <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                      </label>
                      <Flatpickr
                        ref={startRef}
                        options={options}
                        value={startdate}
                        onChange={handlestartDate}
                        style={{
                          padding: 10,
                          fontSize: 16,
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #D9D9D9",
                          position: 'absolute',
                          top: 100,
                          left: 100,
                          zIndex: 1000,
                          display: "none"
                        }}
                      />
                    </div>
                    {startdateerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {startdateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {startdateerrmsg}
    </p>
  </div>
)}
    
                  </div>

                  <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
                    <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>End Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                    <div style={{ position: 'relative' }}>
                      <label
                        htmlFor="date-input"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                          padding: 7,
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#222222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Ensure space between text and icon
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          if (endRef.current) {
                            endRef.current.flatpickr.open();
                          }
                        }}
                      >
                        {enddate ? enddate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                        <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                      </label>
                      <Flatpickr
                        ref={endRef}
                        options={options}
                        value={enddate}
                        onChange={handleEndDate}
                        style={{
                          padding: 10,
                          fontSize: 16,
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #D9D9D9",
                          position: 'absolute',
                          top: 100,
                          left: 100,
                          zIndex: 1000,
                          display: "none"
                        }}
                      />
                    </div>

                    {enddateerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {enddateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {enddateerrmsg}
    </p>
  </div>
)}
                  </div>
                  </div>


<div style={{display:'flex',flexDirection:'row'}}>
      <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12 me-4'>
                    <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Invoice Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                    <div style={{ position: 'relative' }}>
                      <label
                        htmlFor="date-input"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                          padding: 7,
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#222222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between", // Ensure space between text and icon
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          if (invoiceRef.current) {
                            invoiceRef.current.flatpickr.open();
                          }
                        }}
                      >
                        {invoicedate ? invoicedate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                        <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                      </label>
                      <Flatpickr
                        ref={invoiceRef}
                        options={options}
                        value={invoicedate}
                        onChange={handleInvoiceDate}
                        style={{
                          padding: 10,
                          fontSize: 16,
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #D9D9D9",
                          position: 'absolute',
                          top: 100,
                          left: 100,
                          zIndex: 1000,
                          display: "none"
                        }}
                      />
                    </div>
                    {invoicedateerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {invoicedateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoicedateerrmsg}
    </p>
  </div>
)}
    
                  </div>

                   <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
                    <Form.Label style={{ fontSize: 14, color: "#222", fontFamily: "'Gilroy'", fontWeight: 500, fontStyle: 'normal', lineHeight: 'normal' }}>Due Date</Form.Label><span style={{ color: 'red', fontSize: '20px' }}>*</span>

                    <div style={{ position: 'relative' }}>
                      <label
                        htmlFor="date-input"
                        style={{
                          border: "1px solid #D9D9D9",
                          borderRadius: 8,
                          padding: 7,
                          fontSize: 14,
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          color: "#222222",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          cursor: "pointer"
                        }}
                        onClick={() => {
                          if (dueRef.current) {
                            dueRef.current.flatpickr.open();
                          }
                        }}
                      >
                        {invoiceduedate ? invoiceduedate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                        <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                      </label>
                      <Flatpickr
                        ref={dueRef}
                        options={options}
                        value={invoiceduedate}
                        onChange={handleDueDate}
                        style={{
                          padding: 10,
                          fontSize: 16,
                          width: "100%",
                          borderRadius: 8,
                          border: "1px solid #D9D9D9",
                          position: 'absolute',
                          top: 100,
                          left: 100,
                          zIndex: 1000,
                          display: "none"
                        }}
                      />
                    </div>
                    {invoiceduedateerrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {invoiceduedateerrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {invoiceduedateerrmsg}
    </p>
  </div>
)}
    
                  </div> 
                  {allfielderrmsg.trim() !== "" && (
  <div>
    <p style={{ fontSize: '15px', color: 'red', marginTop: '3px' }}>
      {allfielderrmsg !== " " && <MdError style={{ fontSize: '15px', color: 'red' }} />} {allfielderrmsg}
    </p>
  </div>
)}
                  </div>


         

      

      {/* Table */}
      <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
        <Table className="ebtable mt-2" responsive>

          <thead style={{ backgroundColor: "#E7F1FF" }}>
            <tr>
              <th>Description</th>
              <th>EB Unit </th>
              <th>Unit Price </th>
              <th>Actual Amount</th>
              <th>Total Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

{billamounts && billamounts.length > 0 && billamounts.map((u, index) => (
<tr key={index}>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{paddingTop:'35px',paddingLeft:'10px'}}>
<p>{u.description}</p>
</div>
</td>
<td style={{paddingTop:'35px',paddingLeft:'10px'}}>{u.used_unit ? u.used_unit : '-' }</td>
<td style={{paddingTop:'35px',paddingLeft:'10px'}}>{u.per_unit_amount != null && u.per_unit_amount != '' && u.per_unit_amount != undefined ? u.per_unit_amount : '-' }</td>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
<Form.Group controlId={`actualAmount-${index}`}>
<Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}></Form.Label>
<Form.Control
style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}
type="text"
placeholder="Enter actual amount"
value={u.total_amount ?? 0}  // using nullish coalescing for safer default value
// onChange={(e) => handleActualAmountChange(index, e.target.value)} 
/>
</Form.Group>
</div>
</td>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
<Form.Group controlId={`amount-${index}`}>
<Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}></Form.Label>
<Form.Control
style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}
type="text"
placeholder="Enter total amount"
value={u.amount !== undefined ? Math.floor(u.amount) : 0} 
onChange={(e) => handleAmountChange(index, e.target.value)} 
/>
</Form.Group>
</div>
</td>

<td style={{ paddingTop: '35px' }}>
<span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDelete(u)}>
<img src={Closebtn} height={15} width={15} alt="delete" />
</span>
</td>
</tr>
))}


{newRows && newRows.length > 0 && newRows.map((u, index) => (
    <tr key={`new-${index}`}>
      <td>
        <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{alignItems:'center'}}>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={u.description}
            onChange={(e) => handleNewRowChange(index, 'description', e.target.value)}
          />
        </div>
      </td>
      <td style={{alignItems:'center'}}>
        <Form.Control
          type="text"
          placeholder="EB Unit"
          value={u.used_unit}
          onChange={(e) => handleNewRowChange(index, 'used_unit', e.target.value)}
        />
      </td>
      <td style={{alignItems:'center'}}>
        <Form.Control
          type="text"
          placeholder="Unit Price"
          value={u.per_unit_amount}
          onChange={(e) => handleNewRowChange(index, 'per_unit_amount', e.target.value)}
        />
      </td>
      <td style={{alignItems:'center'}}>
        <Form.Control
          type="text"
          placeholder="Enter actual amount"
          value={u.total_amount}
          onChange={(e) => handleNewRowChange(index, 'total_amount', e.target.value)}
        />
      </td>
      <td style={{alignItems:'center'}}>
        <Form.Control
          type="text"
          placeholder="Enter total amount"
          value={u.amount}
          onChange={(e) => handleNewRowChange(index, 'amount', e.target.value)}
        />
      </td>
      <td style={{alignItems:'center'}}>
        <span style={{cursor: 'pointer', color: 'red', marginLeft: '10px'}} onClick={() => handleDeleteNewRow(index)}>
          <img src={Closebtn} height={15} width={15} alt="delete" />
        </span>
      </td>
    </tr>
  ))}

{/* {selectedData && selectedData.length > 0 && selectedData.map((u, index) => (
<tr key={index}>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12' style={{paddingTop:'35px',paddingLeft:'10px'}}>
<p>{u.description}</p>
</div>
</td>
<td style={{paddingTop:'35px',paddingLeft:'10px'}}>{u.used_unit ? u.used_unit : '-' }</td>
<td style={{paddingTop:'35px',paddingLeft:'10px'}}>{u.per_unit_amount != null && u.per_unit_amount != '' && u.per_unit_amount != undefined ? u.per_unit_amount : '-' }</td>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
<Form.Group controlId={`actualAmount-${index}`}>
<Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}></Form.Label>
<Form.Control
style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}
type="text"
placeholder="Enter actual amount"
value={u.total_amount ?? 0}  // using nullish coalescing for safer default value
// onChange={(e) => handleActualAmountChange(index, e.target.value)} 
/>
</Form.Group>
</div>
</td>
<td>
<div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
<Form.Group controlId={`amount-${index}`}>
<Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222" }}></Form.Label>
<Form.Control
style={{ padding: '10px', fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500 }}
type="text"
placeholder="Enter total amount"
value={u.amount !== undefined ? Math.floor(u.amount) : 0} 
onChange={(e) => handleAmountChange(index, e.target.value)} 
/>
</Form.Group>
</div>
</td>

<td style={{ paddingTop: '35px' }}>
<span style={{ cursor: 'pointer', color: 'red', marginLeft: '10px' }} onClick={() => handleDeletebilldata(u)}>
<img src={Closebtn} height={15} width={15} alt="delete" />
</span>
</td>
</tr>
))} */}


  <tr>

  <div className='col-lg-12 col-md-5 col-sm-12 col-xs-12 mt-1'>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
        <Form.Label style={{ fontFamily: 'Gilroy', fontSize: 14, fontWeight: 500, color: "#222", fontStyle: 'normal', lineHeight: 'normal' }}>
        
        </Form.Label>
        <Form.Select aria-label="Default select example" onChange={handleSelectChange} className='border'>
  <option value=''>Select</option>
  {availableOptions && availableOptions.length > 0 && availableOptions.map((option, index) => (
    <option key={index} value={option.description}>
      {option.description}
    </option>
  ))}
</Form.Select>


      </Form.Group>

    </div>
    </tr>
</tbody>
       
        </Table>
      </div>

      <div><p style={{color:'#1E45E1',fontSize:'14px',fontWeight:600}} onClick={handleAddColumn}> + Add new column</p></div>

      <div style={{ float: 'right', marginRight: '130px' }}>
        <h5>Total Amount ₹{totalAmount}</h5>
        <Button onClick={handleCreateBill} className='w-80 mt-3' style={{ backgroundColor: "#1E45E1", fontWeight: 500, height: 40, borderRadius: 12, fontSize: 16, fontFamily: "Gilroy", fontStyle: 'normal', lineHeight: 'normal' }} >
          Create Bill
        </Button>
      </div>
    </div>
  
}
{
  showRecurringBillForm && <>
  
 {/* <h5>Recurring bill</h5> */}
 <div style={{display:'flex',flexDirection:'row',marginLeft:'60px'}} >
  <svg onClick={handleBackBill}  style={{ fontSize: '22px' ,marginRight:'10px'}} xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none"><path fill="#000000" d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"></path><path fill="#000000" d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"></path></svg>
  <p className='mt-1'>New Bill</p>
  </div>
  <RecurringBill/>

 </>

}


    </>
  );
};

export default InvoicePage;

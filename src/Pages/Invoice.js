
import React, { useState, useEffect ,useRef} from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import {  InputGroup,FormControl, Pagination } from 'react-bootstrap';
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
import User from '../Assets/Images/Ellipse 1.png';
import NotificationIcon from '../Assets/Images/Notification.png'
import rectangle from '../Assets/Images/Rectangle 2.png'
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import InvoiceDetail from './InvoiceDetails';
import MessageModal from './MessageModal';
import LoaderComponent from './LoaderComponent';
import Sort from "../Assets/Images/sort.png"
import CryptoJS from "crypto-js";
import "../Pages/Invoices.css"
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { fontSize, fontStyle, fontWeight, lineHeight, padding } from '@mui/system';
import InvoiceTable from './InvoicelistTable';
import leftArrow from '../Assets/Images/New_images/left-arrow.png'
import rightarrow from '../Assets/Images/New_images/right-arrow.png'
import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';

import squre from '../Assets/Images/New_images/minus-square.png';

import Calendars from '../Assets/Images/New_images/calendar.png'
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';



const InvoicePage = () => {


  const state = useSelector(state => state)
  const [editOption, setEditOption] = useState('')
  const dispatch = useDispatch()
  console.log("state", state);

  const [show, setShow] = useState(false);




  const customStyle = {
    fontFamily: 'Gilroy',
    color: "#939393",
    fontSize: "14px",
    fontWeight: 500,
    lineHeight: "normal",
    fontStyle:"normal",
    padding:10
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
    console.log("printinvoice" , item);
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
    if (state.InvoiceList.statusCodeForPDf === 200) {
      dispatch({ type: 'INVOICELIST' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_LIST' });
      }, 100);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_PDF_STATUS_CODE' });
      }, 200);
    }
  }, [state.InvoiceList?.statusCodeForPDf]);


  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    dispatch({ type: 'INVOICELIST' })
  }, [])

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
    //  dispatch({ type: 'INVOICELIST' })
    if (state.InvoiceList?.InvoiceListStatusCode == 200) {
      console.log("invoice added executed");
      
      setData(state.InvoiceList.Invoice)
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_LIST' });
      }, 1000);
    }
  }, [state.InvoiceList?.InvoiceListStatusCode])







  console.log("InvoiceList", state.InvoiceList);
  console.log("DATA", data)

  useEffect(() => {
    console.log("statuscode", state.InvoiceList.message);
    if (state.InvoiceList.message != "" && state.InvoiceList.message != null) {
      console.log("statuscode_number", state.InvoiceList.UpdateInvoiceStatusCode);
      dispatch({ type: 'INVOICELIST' })
      setData(state.InvoiceList.Invoice)
      setLoading(true)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_INVOICE_UPDATE_LIST' });
      }, 100);


    }
  }, [state.InvoiceList])


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




  const itemsPerPage = 7;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);


  const totalPages = Math.ceil(data.length / itemsPerPage);

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
      setData(filteredItems.slice(indexOfFirstItem, indexOfLastItem))
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
      setData(state.InvoiceList.Invoice.slice(indexOfFirstItem, indexOfLastItem))
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
    console.log("currentitems", currentItems);
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

    const invoiceNo = randomNumberInRange(invoiceList.hostel_Name, 1, new Date())
    const CheckInvoiceNo = state.InvoiceList?.Invoice.some(item =>
      item.User_Id === selectedUserId && item.Invoices !== undefined
    );

    if (invoiceList.InvoiceId && invoiceList.payableAmount && invoiceList.transaction) {
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

      setTimeout(() => {
        Swal.fire({
          icon: "success",
          title: "Update Successfully",
          confirmButtonText: "ok"
        });
      }, 300);
      setShowform(false);

      // setShowMenu(false);
      // setShowForm(false);
    }


    else {
      Swal.fire({
        icon: "warning",
        title: 'Please Enter All Field',
        confirmButtonText: "ok"
      }).then((result) => {
        if (result.isConfirmed) {
        }
      });
    }


  }


  const invoicerowsPerPage = 3;
  const [invoicecurrentPage, setinvoicecurrentPage] = useState(1);
  const [invoiceFilterddata, setinvoiceFilterddata] = useState([]);



  const indexOfLastRowinvoice = invoicecurrentPage * invoicerowsPerPage;
  const indexOfFirstRowinvoice = indexOfLastRowinvoice - invoicerowsPerPage;
  const currentRowinvoice = data?.slice(indexOfFirstRowinvoice, indexOfLastRowinvoice);




  const handleInvoicePageChange = (InvoicepageNumber) => {
    setinvoicecurrentPage(InvoicepageNumber);
  };

  const totalPagesinvoice = Math.ceil(data?.length / invoicerowsPerPage);

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
  useEffect(()=>{
    setinvoiceFilterddata(state.UsersList.customerdetails.invoice_details)
  },[state.UsersList.customerdetails.invoice_details])




  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);


console.log("selectedDate",selectedDate)



  const options = {
      dateFormat: 'd/m/Y',
      defaultDate: selectedDate || new Date(),
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


    const handleDateChange = (selectedDates) => {
    const date = selectedDates[0];
  setSelectedDate(date); 

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const lastDayOfMonth = new Date(year, month, 0);
  const formattedDueDate = `${lastDayOfMonth.getFullYear()}-${String(lastDayOfMonth.getMonth() + 1).padStart(2, '0')}-${String(lastDayOfMonth.getDate()).padStart(2, '0')}`;
 const formattedDate = formatDateForPayload(date);
 setFormattedDate(formattedDate)
  console.log("formattedDueDate ",formattedDate,formattedDueDate )
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







  return (
    <>


      {invoiceDetail ?
        <>

          <InvoiceDetail sendInvoiceDetail={invoicePage} handleInvoiceback={handleInvoiceback} />
        </> : <>
          <div class=' ps-5 pe-5' style={{ marginTop: "20px", position: "relative" }} >

            <div className='texxttt'>
              <div style={{ flex: 1 }}>

              </div>
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>


              <p style={{ fontSize: "23px", fontFamily: 'Gilroy', fontWeight: 600, color: '#222' }}>Invoice</p>


              <div >


                {showLoader && <LoaderComponent />}
                {/* {
                    searchicon &&
                    <>
                      <input
                        type="text"
                        value={searchItem}
                        onChange={(e) => handleInputChange(e)}
                        placeholder='Search By Name'
                        class="form-control ps-4 pe-1   searchinput"
                        style={{ marginRight: '20px', backgroundColor: "white", fontSize: "12px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "#2E75EA" }}

                      />
                    </>
                  }
                  <BsSearch class=" me-4" onClick={handleiconshow} /> */}
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  {
                    filtericon &&
                    <>
                     <Form.Select aria-label="Default select example" value={statusfilter} onChange={(e) => handleStatusFilter(e)} 
                      id="vendor-select" className='ps-3'
                      style={{ marginRight: '20px',fontFamily:"Gilroy", fontSize: "16px", fontWeight: "700", width: "150px", borderRadius: "10px", padding: "2px", border: "1px Solid #dcdcdc", height: "35px" }}
                      >
                      
                        <option  id="vendor-select"  selected value="ALL"> ALL</option>
                        <option   id="vendor-select" value="Success">Success</option>
                        <option  id="vendor-select" value="Pending">Pending</option>
                     
                      </Form.Select>
                    </>
                  }
                  <img class=" me-4" onClick={handleFiltershow} src={Sort} />
                </div>
              </div>
            </div>

            <Offcanvas placement="end" show={show} onHide={handleClosepopup} style={{ width: "69vh" }}>
              <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >Notification</Offcanvas.Title>
              <Offcanvas.Body style={{ maxHeight: 'calc(100vh - 35px)', overflowY: 'auto' }}>
                <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
                  <div class="p-1 bd-highlight user-menu">
                    <div>
                      {newNotificationsCount > 0 && <p style={{ marginTop: '10px' }}><span style={{ backgroundColor: '#DBE1FB', padding: '8px 12px', color: '#222222', borderRadius: '14px', fontWeight: 500 }}>{newNotificationsCount} new notifications</span></p>}
                    </div>
                    <div className='container' style={{ marginTop: "30px" }}>
                      <>
                        <div className='row mb-3'>
                          {state.login.Notification && state.login.Notification?.length > 0 && state.login.Notification.map((val) => (
                            <div key={val.id} className='border-bottom' style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row', justifyContent: "space-between" }}>
                              <p style={{ color: val.status === 1 ? 'black' : '#939393', width: '75%' }}>{val.message}</p>
                              {val.status === 1 && <div style={{ width: '10px', height: '10px', backgroundColor: 'blue', borderRadius: '50%', marginTop: '5px' }}>
                              </div>}


                            </div>
                          ))}

                        </div>
                      </>


                    </div>
                  </div>
                </div>

              </Offcanvas.Body>
            </Offcanvas>



            <Offcanvas placement="end" show={showMenu} onHide={handleClose} style={{ width: "69vh" }}>
              <Offcanvas.Title style={{ background: "#2F74EB", color: "white", paddingLeft: "20px", height: "35px", fontSize: "16px", paddingTop: "5px" }} >{editOption == 'Add' ? "Add Invoice" : "Edit Invoice"}</Offcanvas.Title>
              <Offcanvas.Body>
                <div class="d-flex flex-row bd-highlight mb-3  item" style={{ marginTop: "-20px", fontSize: "15px" }}>
                  <div class="p-1 bd-highlight user-menu">
                    <ul className={isUserClicked ? 'active' : ''} onClick={handleMenuClick}>
                      User Details
                    </ul>
                  </div>
                </div>
                {showForm && (
                  <Form>
                    <p style={{ textAlign: 'center', marginTop: '-25px', marginBottom: 2 }}>Upload Profile</p>
                    <div className="d-flex justify-content-center" style={{ position: 'relative' }}>
                      {file ? <>
                        <img src={URL.createObjectURL(file)} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                      </> :
                        <img src={Profile} alt='user1' style={{ width: '80px', marginBottom: '-15px' }} />
                      }
                      <label htmlFor="imageInput" className=''>
                        <img src={Plus} style={{ color: 'blue', position: 'absolute', bottom: '-5px', left: '48%', height: 20, width: 20 }} />
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        id="imageInput"
                        onChange={handleImageChange}
                        style={{ display: "none" }} />
                    </div>
                    <div className='container' style={{ marginTop: "30px" }}>
                      {/* {displayText && (
                        <div className="row mb-3">
                          <div className="col-lg-12">
                            <label style={{ color: "red", fontSize: "14px", fontWeight: 700 }}>This user has already paid the room rent.</label>
                          </div>
                        </div>
                      )} */}

                      <div className="row mb-3">
                        <div className='col-lg-12 col-12 col-md-12'>
                          <Form.Label style={{ fontSize: "12px", marginRight: 10 }}>User ID:</Form.Label>
                          <Form.Label
                            disabled={editOption == 'edit'}
                          >{invoiceValue.User_Id}</Form.Label>
                          {/* <Form.Select aria-label="Default select example" style={bottomBorderStyles}
                            // value={selectedUserId}
                            value={invoiceValue.User_Id}
                            disabled={editOption == 'edit'}
                            onChange={handleUserIdChange} >
                            <option>Select User Id</option>
                            {
                              userIds && userIds.map((item) => {
                                return (
                                  <>
                                    <option value={item.id}>{item.User_Id}</option>
                                  </>
                                )
                              })
                            }
                          </Form.Select> */}

                        </div>
                      </div>

                      {/* {filteredUserDetails.length > 0 && filteredUserDetails.map((item) => ( */}
                      <>
                        <div className='row'>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>First Name</Form.Label>
                              <FormControl
                                type="text"
                                value={invoiceList.firstName}
                                // value={editOption == 'Add' ? item.Name.split(' ')[0] : invoiceList.firstName}
                                onChange={(e) => { setInvoiceList({ ...invoiceList, firstName: e.target.value }) }}
                                style={bottomBorderStyle}
                                disabled
                              />
                            </Form.Group>
                          </div>
                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Last Name</Form.Label>
                              <FormControl
                                type="text"
                                disabled
                                value={invoiceList.lastName}
                                // value={editOption == 'Add' ? item.Name.split(' ')[1] : invoiceList.lastName}
                                onChange={(e) => { setInvoiceList({ ...invoiceList, lastName: e.target.value }) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>
                          </div>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Phone Number</Form.Label>
                              <FormControl
                                type="text"
                                disabled
                                value={invoiceList.phone}
                                // value={editOption == 'Add' ? item.Phone : invoiceList.phone}
                                onChange={(e) => { handlePhoneNo(e) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>
                            <p id='phoneError' style={{ color: 'red', fontSize: 14 }}></p>
                          </div>
                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Email ID</Form.Label>
                              <FormControl
                                type="email"
                                disabled
                                value={invoiceList.email}
                                // value={editOption == 'Add' ? item.Email : invoiceList.email}
                                onChange={(e) => { handleEmailID(e) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>
                            <p id='emailError' style={{ color: 'red', fontSize: 14 }}></p>
                          </div>

                        </div>
                        <div className='row mb-3'>
                          <div className='col-lg-12'>
                            <Form.Label style={{ fontSize: "12px" }}>User PG</Form.Label>
                            <Form.Select aria-label="Default select example"
                              style={bottomBorderStyles}
                              disabled
                              value={invoiceList.hostel_Id}
                            // value={editOption == 'Add' ? item.HostelName : invoiceList.hostel_Id} onChange={(e) => handleHostelId(e)} 
                            >
                              <option>Select hostel</option>
                              <option selected>{invoiceList.hostel_Id}</option>

                              {/* {editOption == 'Add' ?

                                <option selected>{item.HostelName}</option>

                                :
                                state.UsersList?.hostelList?.map((item) => {
                                  return (
                                    <>
                                      <option value={item.id}>{item.Name}</option>
                                    </>
                                  )
                                })

                              } */}

                            </Form.Select>

                          </div>
                        </div>
                        <div className='row mb-3'>
                          <div className='col-lg-6'>
                            <Form.Label style={{ fontSize: "12px" }}>User Floor</Form.Label>
                            <Form.Select aria-label="Default select example"
                              style={bottomBorderStyles}
                              disabled
                              value={invoiceList.FloorNo}
                            // value={editOption == 'Add' ? item.Floor : invoiceList.FloorNo} onChange={(e) => handleFloor(e)}
                            >
                              <option>Selected Floor</option>
                              <option selected>{invoiceList.FloorNo}</option>
                              {/* {editOption == 'Add' ?

                                <option selected>{item.Floor}</option>
                                :
                                state.UsersList?.hosteldetailslist
                                  ?.filter((item, index, array) => array.findIndex(i => i.Floor_Id === item.Floor_Id) === index)
                                  .map((u) => (
                                    <option key={u.Floor_Id}>{u.Floor_Id}</option>
                                  ))
                              } */}
                            </Form.Select>

                          </div>
                          <div className='col-lg-6'>
                            <Form.Label style={{ fontSize: '12px' }}>User Room</Form.Label>
                            <Form.Select
                              aria-label='Default select example'
                              style={bottomBorderStyles}
                              disabled
                              value={invoiceList.RoomNo}
                              // value={editOption == 'Add' ? item.Rooms : invoiceList.RoomNo}
                              onChange={(e) => handleRooms(e)}
                            >
                              <option>Selected Room</option>
                              <option selected>{invoiceList.RoomNo}</option>
                              {/* {editOption == 'Add' ?

                                <option selected>{item.Rooms}</option>
                                :
                                state.UsersList?.roomdetails
                                  ?.filter((item, index, self) => self.findIndex((i) => i.Room_Id === item.Room_Id) === index)
                                  .map((item) => (
                                    <option key={item.Room_Id}>{item.Room_Id}</option>
                                  ))} */}
                            </Form.Select>

                          </div>
                        </div>
                        <div className='row'>
                          <div className='col-lg-6 col-12 col-md-12' >
                            <Form.Label style={{ fontSize: "12px" }}>Select Date</Form.Label>
                            <FormControl
                              className='position-sticky'
                              type="date"
                              value={invoiceList.date}
                              onChange={(e) => { handleDateChange(e) }}
                              style={bottomBorderStyle}
                            // disabled={displayText}
                            />
                          </div>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Amount</Form.Label>
                              <FormControl
                                type="text"
                                value={invoiceList.amount}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>


                          </div>

                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}> Payable Amount</Form.Label>
                              <p style={{ fontSize: "10px" }}>Already you have paid <b>RS.{invoiceList.paidAmount == 0 ? '0' : invoiceList.paidAmount}</b></p>
                              <FormControl
                                type="text"
                                value={invoiceList.payableAmount}
                                onChange={(e) => { handleAmount(e) }}
                                style={bottomBorderStyle}
                              />
                            </Form.Group>

                          </div>
                          <div className='col-lg-6'>
                            <Form.Group className="mb-3">
                              <Form.Label style={{ fontSize: "12px" }}>Balance Due</Form.Label>
                              <h1 style={{ fontSize: "12px", backgroundColor: "#F6F7FB", padding: 15 }}>{invoiceList.balanceDue}</h1>
                            </Form.Group>
                          </div>
                        </div>


                      </>
                      {/* ))} */}

                    </div>

                    <div class="d-flex justify-content-end" style={{ marginTop: "30px" }} >

                      <Button variant="white" size="sm" onClick={handleClose}>
                        Cancel
                      </Button>
                      <Button variant={isSaveDisabled ? "outline-secondary" : "outline-primary"} size="sm" style={{ backgroundColor: isSaveDisabled && "gray", color: isSaveDisabled && "white", borderRadius: "20vh", width: "80px" }}
                        // onClick={handleSaveInvoiceList}
                        disabled={isSaveDisabled}
                      >
                        {editOption === 'Add' ? "Save" : "Update"}
                      </Button>
                    </div>
                  </Form>
                )}
              </Offcanvas.Body>
            </Offcanvas>



            {/* <MessageModal show={displayText} handleClose={toggleDisplayText} /> */}



            {showform &&
              <div
                className="modal show"
                style={{
                  display: 'block', position: 'initial', fontFamily: "Gilroy,sans-serif",
                }}
              >
                <Modal
                  show={showform} onHide={handleCloseForm}
                  centered>
                  <Modal.Dialog style={{ maxWidth: 850, width: '700px' }} className='m-0 p-0'>
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
                                            {selectedDate instanceof Date && !isNaN(selectedDate) ?  selectedDate.toLocaleDateString('en-GB') : 'DD/MM/YYYY'}
                                            <img src={Calendars} style={{ height: 24, width: 24, marginLeft: 10 }} alt="Calendar" />
                                        </label>
                                        <Flatpickr
                                            ref={calendarRef}
                                            options={options}
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
                              style={{ fontSize: 14, color: "#4B4B4B", fontFamily: "Gilroy, sans-serif", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                            >
                              <option  selected>select </option>
                              <option value="Cash">Cash </option>
                              <option value="Debit Card">Debit Card</option>
                              <option value="Credit Card">Credit Card</option>
                              <option value="UPI">UPI</option>
                            </Form.Select>
                          </Form.Group>
                        </div>

                      </div>
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

            <Table className="ebtable mt-3" responsive >
              <thead  style={{backgroundColor:"#E7F1FF"}}>
                <tr >
                <th style={{ textAlign: "center", padding: "10px" }}>
                  <img src={squre} height={20} width={20} />
                </th>
                  <th style={customStyle}>Name</th>
                  <th style={customStyle}>Invoice number</th>
                  <th style={customStyle}>Created</th>
                  <th style={customStyle}>Due Date</th>
                  <th style={customStyle}>Amount</th>
                  <th style={customStyle}>Due</th>
                  <th style={customStyle}>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "10px" }}>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td style={{ padding: "10px", border: "none" }}><Skeleton width={80} /></td>
                      {/* <td><Skeleton width={120} /></td> */}
                      <td>
                        <div className="d-flex">
                          <span className="i-circle" >
                            <Skeleton circle width={24} height={24} style={{ padding: "10px", border: "none" }} />
                          </span>
                          <div >
                            {/* <Skeleton width={80} /><br /> */}
                            <Skeleton width={80} style={{ padding: "5px", border: "none" }}/>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: "10px", border: "none" }}><Skeleton width={100} /></td>
                      <td style={{ padding: "10px", border: "none" }}><Skeleton width={100} /></td>
                      <td style={{ padding: "10px", border: "none" }}><Skeleton width={50} /></td>
                      <td style={{ padding: "10px", border: "none" }}><Skeleton width={50} /></td>
                      <td style={{ padding: "10px", border: "none" }}><Skeleton width={100} /></td>
                      <td style={{ padding: "10px", border: "none" }}><Skeleton width={100} /></td>
                    </tr>
                  ))
                ) : (
                  currentItems.map((item) => (
                    <InvoiceTable item={item}   OnHandleshowform = {handleShowForm} OnHandleshowInvoicePdf={handleInvoiceDetail}/>
                 

                  ))
                )}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center" style={{ width: "100%" }}>
              {currentItems.length === 0 && !loading && <h5 style={{ fontSize: 12, color: "red" }}>No Data Found</h5>}
            </div>


            <nav>
           <ul style={{ display: 'flex', alignItems: 'center', listStyleType: 'none', padding: 0, justifyContent: 'end' }}>
             <li style={{ margin: '0 5px' }}>
               <button
                 style={{
                   padding: '5px 10px',
                   textDecoration: 'none',
                   color: invoicecurrentPage === 1 ? '#ccc' : '#007bff',
                   cursor: invoicecurrentPage === 1 ? 'not-allowed' : 'pointer',
                   borderRadius: '5px',
                   display: 'inline-block',
                   minWidth: '30px',
                   textAlign: 'center',
                   backgroundColor: 'transparent',
                   border: "none"
                 }}
                 onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
                 disabled={invoicecurrentPage === 1}
               >
                 <img src={leftArrow} width="10" height="10" alt="Previous" />
               </button>
               <span
                 onClick={() => handleInvoicePageChange(invoicecurrentPage - 1)}
                 style={{
                   marginTop: '20px',
                   cursor: invoicecurrentPage === 1 ? 'not-allowed' : 'pointer',
                   color: invoicecurrentPage === 1 ? '#ccc' : '#007bff'
                 }}
               >
                 Previous
               </span>
             </li>
             {invoicecurrentPage > 3 && (
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
                   onClick={() => handleInvoicePageChange(1)}
                 >
                   1
                 </button>
               </li>
             )}
             {invoicecurrentPage > 3 && <span>...</span>}
             {renderPageNumbersInvoice()}
             {invoicecurrentPage < totalPagesinvoice - 2 && <span>...</span>}
             {invoicecurrentPage < totalPagesinvoice - 2 && (
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
                   onClick={() => handleInvoicePageChange(totalPagesinvoice)}
                 >
                   {totalPagesinvoice}
                 </button>
               </li>
             )}
             <li style={{ margin: '0 5px' }}>
               <span
                 onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
                 style={{
                   marginTop: '20px',
                   cursor: invoicecurrentPage === totalPagesinvoice ? 'not-allowed' : 'pointer',
                   color: invoicecurrentPage === totalPagesinvoice ? '#ccc' : '#007bff'
                 }}
               >
                 Next
               </span>
               <button
                 style={{
                   padding: '5px 10px',
                   textDecoration: 'none',
                   color: invoicecurrentPage === invoicecurrentPage ? '#ccc' : '#007bff',
                   cursor: invoicecurrentPage === invoicecurrentPage ? 'not-allowed' : 'pointer',
                   borderRadius: '5px',
                   display: 'inline-block',
                   minWidth: '30px',
                   textAlign: 'center',
                   backgroundColor: 'transparent',
                   border: "none"
                 }}
                 onClick={() => handleInvoicePageChange(invoicecurrentPage + 1)}
                 disabled={invoicecurrentPage === totalPagesinvoice}
               >
                 <img src={rightarrow} width="10" height="10" alt="Next" />
               </button>
             </li>
           </ul>
         </nav>
             

            {/* <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>

              <div></div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div onClick={handlePreviousClick} disabled={currentPage === 1} style={{ border: "none", fontSize: "10px", marginTop: "10px", cursor: 'pointer' }}>
                  Previous
                </div>
                <span class="i-circle" style={{ width: '50px', fontSize: "10px", borderColor: "none", backgroundColor: '#0D6EFD' }}> {currentPage} </span>
                <div onClick={handleNextClick} disabled={currentPage === 10} style={{ fontSize: "10px", border: "none", marginTop: "10px", cursor: 'pointer' }}>
                  Next
                </div>
              </div>
            </div> */}




          </div>

        </>

      }





    </>
  );
};

export default InvoicePage;

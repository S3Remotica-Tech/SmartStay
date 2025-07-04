/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "./UserList.css";
import { Table, Button, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Image from "react-bootstrap/Image";
import UserlistForm from "./UserlistForm";
import UserListRoomDetail from "./UserListRoomDetail";
import Modal from "react-bootstrap/Modal";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import Box from "@mui/material/Box";
import TabList from "@mui/lab/TabList";
import excelimg from "../Assets/Images/New_images/excel_blue.png";
import CustomerReAssign from "./CustomerReAssign";
import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from "iconsax-react";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import TabPanel from "@mui/lab/TabPanel";
import TabContext from "@mui/lab/TabContext";
import Tab from "@mui/material/Tab";
import UserlistBookings from "./UserlistBookings";
import UserlistCheckout from "./UserlistCheckout";
import UserlistWalkin from "./UserlistWalkin";
import Addbooking from "./Addbookingform";
import CheckOutForm from "./UserListCheckoutForm";
import UserlistWalkinForm from "./UserlistWalkinForm";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import addcircle from "../Assets/Images/New_images/add-circle.png";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdError } from "react-icons/md";
import CustomerCheckout from "./CustomerCheckout";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Closebtn from "../Assets/Images/CloseCircle.png";
import Calendars from "../Assets/Images/New_images/calendar.png";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import moment from 'moment';
import Filters from "../Assets/Images/Filters.svg";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import leftarrow from "../Assets/Images/arrow-left.png";

function UserList(props) {
  const state = useSelector((state) => state);
  const { RangePicker } = DatePicker;
  dayjs.extend(isBetween);
  const dispatch = useDispatch();
  const popupRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [filterInput, setFilterInput] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [value, setValue] = React.useState("1");
  const [customerrolePermission, setCustomerRolePermission] = useState("");
  const [customerpermissionError, setCustomerPermissionError] = useState("");
  const [customerAddPermission, setCustomerAddPermission] = useState("");
  const [customerDeletePermission, setCustomerDeletePermission] =
    useState(false);
  const [customerEditPermission, setCustomerEditPermission] = useState("");
  const [customerBookingAddPermission, setCustomerBookingAddPermission] =
    useState("");
  const [customerWalkInAddPermission, setCustomerWalkInAddPermission] =
    useState("");
  const [customerCheckoutPermission, setCustomerCheckoutAddPermission] =
    useState("");
  const [excelDownload, setExcelDownload] = useState("");
  const [excelDownloadBooking, setExcelDownloadBooking] = useState("");
  const [excelDownloadChecout, setExcelDownloadCheckout] = useState("");
  const [excelDownloadCheckIn, setExcelDownloadChecIn] = useState("");
  const [customerReassign, setCustomerReAssign] = useState(false);
  const [customerCheckoutpage, setCustomerCheckoutpage] = useState(false);
  const [reAssignDetail, setReasignDetail] = useState("");
  const [uniqueostel_Id, setUniqostel_Id] = useState("");
  const [customercheckoutdata, setCustomerCheckoutData] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);

  const [customername, setCustomerName] = useState("");
  const [invoicenumber, setInvoiceNumber] = useState("");
  const [invoicedate, setInvoiceDate] = useState(null);
  const [invoiceduedate, setInvoiceDueDate] = useState(null);
  const [customererrmsg, setCustomerErrmsg] = useState("");
  const [billLoading, setBillLoading] =  useState(false);

  const [totalAmount, setTotalAmount] = useState("");
  const [newRows, setNewRows] = useState([]);
  const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
  const [invoicedateerrmsg, setInvoiceDateErrmsg] = useState("");
  const [invoiceduedateerrmsg, setInvoiceDueDateErrmsg] = useState("");
  const [allfielderrmsg, setAllFieldErrmsg] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentView, setCurrentView] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [deleteDetails, setDeleteDetails] = useState({ room: null, bed: null });
  const [isroomReading, setIsRoomReading] = useState(false);
  const [ishostelReading, setIsHostelReading] = useState(false);
  const [isReading, setIsReading] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [reading, setReading] = useState("");
  const [readingError, setReadingError] = useState("");
  const [formError, setFormError] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [isreader, setIsReader] = useState("");
  const [checkoutaddform, setAddCheckoutForm] = useState(true);

  const [hos_Name, setHos_Name] = useState("");

  const [hostelDelete, setHostelDelete] = useState(false);
  const [roomDelete, setRoomDelete] = useState(false);
  const [amenityArray, setamenityArray] = useState([]);
  const [formatinvoicedate, setFormatInvoiceDate] = useState(null);
  const [formatduedate, setFormatDueDate] = useState(null);
  const [id, setId] = useState("");
  const [tableErrmsg, setTableErrmsg] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [billsAddshow, setBillsAddShow] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [filterStatus, setFilterStatus] = useState(false);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      if (value === "1") {
        setLoading(true)
        dispatch({
          type: "USERLIST",
          payload: { hostel_id: state.login.selectedHostel_Id },
        });
      } if (value === "2") {
        dispatch({
          type: "GET_BOOKING_LIST",
          payload: { hostel_id: state.login.selectedHostel_Id },
        });
      } else if (value === "3") {
        dispatch({
          type: "CHECKOUTCUSTOMERLIST",
          payload: { hostel_id: state.login.selectedHostel_Id },
        });
      } else if (value === "4") {
        dispatch({
          type: "WALKINCUSTOMERLIST",
          payload: { hostel_id: state.login.selectedHostel_Id },
        });
      }
    }
  }, [value, state.login.selectedHostel_Id]);

  useEffect(() => {
    if (id && !billsAddshow) {
      dispatch({
        type: "MANUAL-INVOICE-NUMBER-GET",
        payload: { user_id: id },
      });
    }
  }, [id, billsAddshow]);
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

  useEffect(() => {
    if (state.InvoiceList.Manulainvoicenumberstatuscode === 200) {
      setInvoiceNumber(state.InvoiceList.ManualInvoiceNUmber.invoice_number);
      setTimeout(() => {
        dispatch({ type: "REMOVE_MANUAL_INVOICE_NUMBER_GET" });
      }, 100);
    }
  }, [
    state.InvoiceList.ManualInvoiceNUmber.invoice_number,
    state.InvoiceList.Manulainvoicenumberstatuscode,
  ]);

  const handleEditItem = (details) => {
    setBillsAddShow(true);
    setCurrentView(null);
    setTimeout(() => {
      setCurrentView(details);
    }, 0);
  };

  useEffect(() => {
    if (isAddMode && !currentView && !billsAddshow) {
      setCustomerName(id);
    }
  }, [isAddMode, billsAddshow]);
  const handleAddItems = () => {
    setIsAddMode(true);
    setBillsAddShow(true);
    setCustomerName(id);
  };
  const handleDeleteItem = (detail) => {
    setDeleteId(detail);
  };

  const handleEditRoomReading = (value) => {
    setIsReader(value);
  };

  useEffect(() => {
    if (isreader) {
      const matchingFloor = state?.UsersList?.hosteldetailslist?.find(
        (item) => item.floor_name === isreader.floor_name
      );

      if (matchingFloor) {
        setFloor(matchingFloor.floor_id);
      }

      const matchingRoom = state?.UsersList?.roomdetails?.find(
        (item) => String(item.Room_Id) === String(isreader.Room_Id)
      );

      if (matchingRoom) {
        setRooms(matchingRoom.Room_Id);
      }

      setReading(isreader.unit);

      if (isreader.reading_date) {
        const parsedDate = new Date(isreader.reading_date);
        if (!isNaN(parsedDate.getTime())) {
          setSelectedDate(parsedDate);
        }
      }
    }
  }, [
    isreader,
    state?.UsersList?.hosteldetailslist,
    state?.UsersList?.roomdetails,
  ]);

  const handleEditHostelReading = (users) => {
    setIsReading(users);
  };

  const handleNewRowChange = (index, field, value) => {
    setNewRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
    setAllFieldErrmsg("");
    setTableErrmsg("");
  };

  const handleDeleteBilling = () => {
    dispatch({
      type: "MANUAL-INVOICE-DELETE",
      payload: {
        id: deleteId,
      },
    });
    setIsDeleting(false);
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
      setCustomerErrmsg("Customer is Required");
      isValid = false;
    }

    if (!invoicenumber) {
      setInvoicenumberErrmsg("Invoice Number is Required");
      isValid = false;
    }

    if (!invoicedate) {
      setInvoiceDateErrmsg("Invoice Date is Required");
      isValid = false;
    }

    if (!invoiceduedate) {
      setInvoiceDueDateErrmsg("Due Date is Required");
      isValid = false;
    }
    if (!Array.isArray(newRows) || newRows.length === 0) {
      setTableErrmsg(
        "Please Add At Least One Item Row Before Generating The Bill"
      );
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
      setTableErrmsg(
        "Please Fill All Details & Amount > 0 Before Generating The Bill"
      );
      hasError = true;
    } else {
      setTableErrmsg("");
    }


      const selectedUser = state.UsersList.Users.find(item => item.ID === customername);

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
    }

    if (hasError || !isValid) return;

    if (!customername || !invoicenumber || !invoicedate || !invoiceduedate) {
      setAllFieldErrmsg("Please Fill Out All Required Fields");
      isValid = false;
    }

    const formatDateToInvoicedate = (invoicedate) => {
      if (!invoicedate) return "";
      const d = new Date(invoicedate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const formatDateToSInvoiceDuedate = (invoiceduedate) => {
      if (!invoiceduedate) return "";
      const d = new Date(invoiceduedate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const isChanged = (() => {
      const userChanged =
        Number(currentView.hos_user_id) !== Number(customername);

      const invoiceChanged =
        String(currentView.Invoices) !== String(invoicenumber);

      const invoiceDateChanged =
        formatDateToInvoicedate(currentView.Date) !==
        formatDateToInvoicedate(invoicedate);
      const dueDateChanged =
        formatDateToSInvoiceDuedate(currentView.DueDate) !==
        formatDateToSInvoiceDuedate(invoiceduedate);

      const amenitiesChanged =
        newRows?.length !== currentView.amenity?.length ||
        newRows.some((row, index) => {
          const originalRow = currentView.amenity?.[index] || {};
          return (
            row.am_name !== originalRow.am_name ||
            row.amount !== originalRow.amount
          );
        });

      return (
        userChanged ||
        invoiceChanged ||
        invoiceDateChanged ||
        dueDateChanged ||
        amenitiesChanged
      );
    })();

    if (!isChanged) {
      setAllFieldErrmsg("No Changes Detected");
      isValid = false;
    }

    if (isValid && isChanged) {
      const dueDateObject = new Date(invoiceduedate);
      const formatduedate = `${dueDateObject.getFullYear()}-${String(
        dueDateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(dueDateObject.getDate()).padStart(2, "0")}`;

      const dateObject = new Date(invoicedate);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth() + 1;
      const day = dateObject.getDate();
      const formattedDate = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;

      dispatch({
        type: "MANUAL-INVOICE-EDIT",
        payload: {
          user_id: customername,
          date: formattedDate,
          due_date: formatduedate,
          id: currentView.id,
          amenity: newRows,
        },
      });

       setBillLoading(true)
      setCustomerName("");
      setInvoiceNumber("");

      setInvoiceDate("");
      setInvoiceDueDate("");

      setTotalAmount("");
      setNewRows([]);

      setCustomerErrmsg("");

      setInvoiceDateErrmsg("");
      setInvoiceDueDateErrmsg("");
      setAllFieldErrmsg("");
    }
    dispatch({ type: "UPDATE_USERSLIST_TRUE" });
  };

  const handleCreateBill = () => {
    let hasError = false;

    if (!customername) {
      setCustomerErrmsg("Please Select Customer");
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
      setTableErrmsg(
        "Please Add At Least One Item Row Before Generating The Bill"
      );
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
      setTableErrmsg(
        "Please Fill All Details & Amount > 0 Before Generating The Bill"
      );
      hasError = true;
    } else {
      setTableErrmsg("");
    }


    const selectedUser = state.UsersList.Users.find(item => item.ID === customername);

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
    }






    if (hasError) {
      return;
    }

    dispatch({
      type: "MANUAL-INVOICE-ADD",
      payload: {
        user_id: customername,
        date: formatinvoicedate,
        due_date: formatduedate,

        invoice_id: invoicenumber,
        total_amount: totalAmount,
        amenity: amenityArray.length > 0 ? amenityArray : [],
      },
    });
     setBillLoading(true)

    setCustomerName("");
    setInvoiceNumber("");

    setInvoiceDate("");
    setInvoiceDueDate("");
    setTotalAmount("");
    setNewRows([]);
  };
  useEffect(() => {
    if (!billsAddshow && id) {
      const customeraId = state.UsersList?.Users?.find((u) => u.ID === id);

      if (customeraId) {
        setCustomerName(customeraId.Name);
      }
    }
  }, [billsAddshow]);

  const handleCustomerName = (e) => {
    setCustomerName(e.target.value);
    setAllFieldErrmsg("");
    if (!e.target.value) {
      setCustomerErrmsg("Please Select Name");
    } else {
      setCustomerErrmsg("");
    }

    setTotalAmount("");
  };

  const formatDateForPayloadmanualinvoice = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };

  const handleInvoiceDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setInvoiceDate(date);
    if (!selectedDates) {
      setInvoiceDateErrmsg("Please Select Date");
    } else {
      setInvoiceDateErrmsg("");
    }
    const formattedDate = formatDateForPayloadmanualinvoice(date);
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

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const deletedRow = prevRows[index];
      const updatedRows = prevRows.filter((_, i) => i !== index);

      const name = deletedRow.am_name?.toLowerCase().replace(/\s/g, "");
      if (name === "roomrent") {
        setSelectedTypes((prevTypes) =>
          prevTypes.filter((type) => type !== "RoomRent")
        );
      } else if (name === "eb") {
        setSelectedTypes((prevTypes) =>
          prevTypes.filter((type) => type !== "EB")
        );
      }

      return updatedRows;
    });

    setAllFieldErrmsg("");
    setTableErrmsg("");
  };

  const handleCloseDeleteroom = () => {
    setRoomDelete(false);
  };
  const handleCloseDeleteHostel = () => {
    setHostelDelete(false);
  };

  const handleBackBill = () => {
    setIsAddMode(false);
    setIsEditing(false);
    setDropdownValue("");
    setSelectedTypes("");
    setRoomDetail(true);
    setCustomerName("");
    setInvoiceNumber("");
    setInvoiceDate("");
    setInvoiceDueDate("");

    setTotalAmount("");
    setCustomerErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");
    setNewRows("");
    setTableErrmsg("");
    dispatch({ type: "UPDATE_USERSLIST_TRUE" });
    dispatch({ type: "REMOVE_MANUAL_INVOICE_NUMBER_GET" });
  };

  useEffect(() => {
    if (currentView && billsAddshow) {
      setCustomerName(currentView.hos_user_id);
      setInvoiceNumber(currentView.Invoices);
      if (currentView.DueDate) {
        const parsedDate = new Date(currentView.DueDate);
        if (!isNaN(parsedDate.getTime())) {
          setInvoiceDueDate(parsedDate);
        }
      }

      if (currentView.Date) {
        const parsedDate = new Date(currentView.Date);
        if (!isNaN(parsedDate.getTime())) {
          setInvoiceDate(parsedDate);
        }
      }

      setTotalAmount(currentView.Amount);


      if (currentView.amenity && Array.isArray(currentView.amenity)) {
        setNewRows(currentView.amenity);

        const types = [];
        currentView.amenity.forEach((item) => {
          const name = item.am_name?.toLowerCase().replace(/\s/g, "");
          if (name === "roomrent") types.push("RoomRent");
          if (name === "eb") types.push("EB");
        });

        setSelectedTypes(types);
      }
    }
  }, [currentView]);

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

  useEffect(() => {
    if (isReading) {
      setHos_Name(isReading.HostelName);
      setReading(isReading.unit);
      setSelectedDate(new Date(isReading.reading_date));
    }
  }, [isReading]);

  useEffect(() => {
    setUniqostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);



  const [userListDetail, setUserListDetail] = useState([]);


  useEffect(() => {
    if (state.UsersList?.UserListStatusCode === 200) {

      setUserListDetail(state.UsersList.Users);
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);
    }
  }, [state.UsersList?.UserListStatusCode]);

  useEffect(() => {
    if (state.UsersList.userRoomfor) {
      setIsEditing(true);
      setRoomDetail(false);

      dispatch({ type: "USERROOMAVAILABLEFALSE" });
    }
  }, [state.UsersList.userRoomfor]);

  useEffect(() => {
    if (!isEditing) {
      dispatch({ type: "UPDATE_USERSLIST_TRUE" });
    }
  }, [isEditing]);

  useEffect(() => {
    if (state.UsersList.userProfilebill) {

      setIsDeleting(true);
      setRoomDetail(true);
      dispatch({ type: "USERPROFILEBILLFALSE" });
    }
  }, [state.UsersList.userProfilebill]);


  useEffect(() => {
    if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
      setBillLoading(false)
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });

      setLoading(false);
     setIsEditing(false);
      setRoomDetail(true);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
      }, 1000);
    }
  }, [state.InvoiceList.manualInvoiceEditStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceAddStatusCode === 200) {
         setBillLoading(false)
      handleBackBill();
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { user_id: id },
      });

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_ADD" });
      }, 1000);
    }
  }, [
    state.InvoiceList.manualInvoiceAddStatusCode,
    state.InvoiceList.ManualInvoices,
  ]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceDeleteStatusCode === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });
      setLoading(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_DELETE" });
      }, 1000);
    }
  }, [
    state.InvoiceList.manualInvoiceDeleteStatusCode,
    state.InvoiceList.ManualInvoices,
  ]);

  useEffect(() => {
    if (state.UsersList.userReading) {
      setIsRoomReading(true);
      setRoomDetail(true);
      dispatch({ type: "USERREADINGFALSE" });
    }
  }, [state.UsersList.userReading]);

  useEffect(() => {
    if (state.UsersList.userHostelRead) {
      setIsHostelReading(true);
      setRoomDetail(true);
      dispatch({ type: "USERHOSTELREADINGFALSE" });
    }
  }, [state.UsersList.userHostelRead]);

  useEffect(() => {
    if (state.UsersList.userReadingdelete) {
      setRoomDelete(true);
      dispatch({ type: "USERREADING_DELETEFALSE" });
    }
  }, [state.UsersList.userReadingdelete]);

  useEffect(() => {
    if (state.UsersList.userHosteldelete) {
      setHostelDelete(true);
      dispatch({ type: "USERHOSTEL_READING_DELETEFALSE" });
    }
  }, [state.UsersList.userHosteldelete]);

  const handleCloseHostel = () => {
    setIsHostelReading(false);
    setRoomDetail(true);
    setReading("");
    setSelectedDate("");
    setDateError("");
    setReadingError("");
    setFormError("");
    setDateError("");
  };

  const handleCloseRoom = () => {
    setIsRoomReading(false);
    setRoomDetail(true);
    setFormError("");
  };

  const handleRoom = (e) => {
    setRooms(e.target.value);
    setRoomError("");
    setFormError("");
  };
  const handleFloor = (e) => {
    setFloor(e.target.value);
    setRooms("");
    setfloorError("");
    setFormError("");
  };
  const handleReadingChange = (e) => {
    setReading(e.target.value);
    setReadingError("");
    setFormError("");
    dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY" });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    dispatch({ type: "CLEAR_ERROR_EDIT_ELECTRICITY" });
    setDateError("");
    setFormError("");
  };

  const handleCustomerReAssign = (reuser) => {
    setReasignDetail(reuser);
    setCustomerReAssign(true);
  };
  const handleCustomerCheckout = (item) => {
    setCustomerCheckoutpage(true);
    setCustomerCheckoutData(item);
  };

  useEffect(() => {
    setCustomerRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner === 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_view === 1
    ) {
      setCustomerPermissionError("");
    } else {
      setCustomerPermissionError("Permission Denied");
    }
  }, [customerrolePermission]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner === 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_create === 1
    ) {
      setCustomerAddPermission("");
    } else {
      setCustomerAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);
  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner === 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_edit === 1
    ) {
      setCustomerEditPermission("");
    } else {
      setCustomerEditPermission("Permission Denied");
    }
  }, [customerrolePermission]);
  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner === 1 ||
      customerrolePermission[0]?.role_permissions[4]?.per_delete === 1
    ) {
      setCustomerDeletePermission(false);
    } else {
      setCustomerDeletePermission(true);
    }
  }, [customerrolePermission]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner === 1 ||
      customerrolePermission[0]?.role_permissions[5]?.per_create === 1
    ) {
      setCustomerBookingAddPermission("");
    } else {
      setCustomerBookingAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);

  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner === 1 ||
      customerrolePermission[0]?.role_permissions[7]?.per_create === 1
    ) {
      setCustomerWalkInAddPermission("");
    } else {
      setCustomerWalkInAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);
  useEffect(() => {
    if (
      customerrolePermission[0]?.is_owner === 1 ||
      customerrolePermission[0]?.role_permissions[6]?.per_create === 1
    ) {
      setCustomerCheckoutAddPermission("");
    } else {
      setCustomerCheckoutAddPermission("Permission Denied");
    }
  }, [customerrolePermission]);

  const [checkOutCustomer, setCheckOutCustomer] = useState([]);

  const [walkingCustomer, setWalkingCustomer] = useState([]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "WALKINCUSTOMERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.getWalkInStatusCode === 200) {
      setWalkingCustomer(state.UsersList.WalkInCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.getWalkInStatusCode]);

  useEffect(() => {
    if (state.UsersList?.NoDataWalkInCustomerStatusCode === 201) {
      setWalkingCustomer([]);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.NoDataWalkInCustomerStatusCode]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "CHECKOUTCUSTOMERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList.GetCheckOutCustomerStatusCode === 200) {
      setCheckOutCustomer(state.UsersList.CheckOutCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
      }, 2000);
    }
  }, [state.UsersList.GetCheckOutCustomerStatusCode]);

  const [customerBooking, setCustomerBooking] = useState("");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });


    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.Booking.statusCodeGetBooking === 200) {
      setCustomerBooking(state.Booking.CustomerBookingList.bookings);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_LIST" });
      }, 2000);
    }
  }, [state.Booking.statusCodeGetBooking]);



  useEffect(() => {
    if (value === "1") {
      const FilterUser = Array.isArray(userListDetail)
        ? userListDetail.filter((item) =>
          item.Name.toLowerCase().includes(filterInput.toLowerCase())
        )
        : [];

      setFilteredUsers(FilterUser);
    }

    if (value === "2") {
      const FilterUsertwo = Array.isArray(customerBooking)
        ? customerBooking.filter((item) => {
          const fullName = `${item.first_name || ""} ${item.last_name || ""
            }`.toLowerCase();
          return fullName.includes(filterInput.toLowerCase());
        })
        : [];

      setFilteredUsers(FilterUsertwo);
    }

    if (value === "3") {
      const FilterUsertwo = Array.isArray(checkOutCustomer)
        ? checkOutCustomer?.filter((item) => {
          return item.Name.toLowerCase().includes(filterInput?.toLowerCase());
        })
        : [];

      setFilteredUsers(FilterUsertwo);
    }
    if (value === "4") {
      const FilterUsertwo = Array.isArray(walkingCustomer)
        ? walkingCustomer?.filter((item) => {
          return item.first_name
            ?.toLowerCase()
            .includes(filterInput?.toLowerCase() || "");
        })
        : [];

      setFilteredUsers(FilterUsertwo);
    }
  }, [
    filterInput,
    state.UsersList?.Users,
    state.UsersList?.UserListStatusCode,
    value,
    state?.Booking?.CustomerBookingList?.bookings,
    state.Booking.statusCodeGetBooking,
    state.UsersList?.WalkInCustomerList,
    state.UsersList?.getWalkInStatusCode,
    state.UsersList.GetCheckOutCustomerStatusCode,
    state.UsersList.CheckOutCustomerList,
  ]);

  const handlefilterInput = (e) => {
    const searchValue = e.target.value.toLowerCase().trim();
    setFilterInput(searchValue);

    if (searchValue.length > 0) {
      const filtered = filteredUsers.filter((user) => {
        const fullName = [user?.first_name, user?.last_name]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        const name = user?.Name?.toLowerCase() || "";

        return name.startsWith(searchValue) || fullName.startsWith(searchValue);
      });

      setFilteredUsers(filtered);
      setDropdownVisible(true);
      setCurrentPage(1);
    } else {
      setFilteredUsers(filteredUsers);
      setDropdownVisible(false);
    }
  };


  const handleUserSelect = (user) => {
    if (value === "1") {
      setFilterInput(user?.Name || "");
    } else if (value === "2") {
      setFilterInput(
        [user?.first_name, user?.last_name].filter(Boolean).join(" ")
      );
    } else if (value === "3") {
      setFilterInput(user?.Name || "");
    } else if (value === "4") {
      setFilterInput(user?.first_name || "");
    }

    setFilteredUsers([]);
    setDropdownVisible(false);
  };



  const handleCloseSearch = () => {
    setSearch(false);
    setFilterInput("");
    setDropdownVisible(false);
  };
  useEffect(() => {
    if (state.InvoiceList.statusCodeForPDf === 200) {
      dispatch({ type: "INVOICELIST" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_LIST" });
      }, 100);
      setTimeout(() => {
        dispatch({ type: "CLEAR_INVOICE_PDF_STATUS_CODE" });
      }, 200);
    }
  }, [state.InvoiceList?.statusCodeForPDf]);

  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [edit, setEdit] = useState("");
  const [EditObj, setEditObj] = useState("");
  const [addBasicDetail, setAddBasicDetail] = useState("");
  const [activeRow, setActiveRow] = useState(null);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (id, event) => {
    if (activeRow === id) {
      setActiveRow(null);
    } else {
      setActiveRow(id);
    }
    setSearch(false);

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  useEffect(() => {
    const handleClickOutsideAccount = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveRow(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideAccount);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideAccount);
    };
  }, []);


  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(false);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = React.useMemo(() => {
    const source = (search || filterStatus) ? filteredUsers : userListDetail;
    return source?.slice(indexOfFirstItem, indexOfLastItem);
  }, [search, filterStatus, filteredUsers, userListDetail, indexOfFirstItem, indexOfLastItem]);

  const totalItems = (search || filterStatus) ? filteredUsers?.length : userListDetail?.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentItems;

    const sorted = [...currentItems].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentItems, sortConfig]);

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleMenuClick = () => {
    setShowForm(true);
  };

  const handleShow = (u) => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding customer information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    handleMenuClick();
    setShowMenu(true);
    setAddCheckoutForm(false);
    setAddBasicDetail(true);
    setEditObj(u);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setSearch(false);
    setExcelDownload("");
    setExcelDownloadBooking("");
    setExcelDownloadChecIn("");
    setExcelDownloadCheckout("");
    setIsDownloadTriggered(false);
    setFilterInput("");
    setFilterStatus("");
  };

  useEffect(() => {
    if (state.UsersList?.NoUserListStatusCode === 201) {
      setLoading(false)
      setUserDetails([]);
      setFilteredUsers([]);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_USER_LIST" });
      }, 2000);
    }
  }, [state.UsersList?.NoUserListStatusCode]);

  const [roomDetail, setRoomDetail] = useState(false);
  const [userList, setUserList] = useState(true);

  const [hostelName, sethosName] = useState("");
  const [customerUser_Id, setcustomerUser_Id] = useState("");
  const [advanceForm, setAdvanceForm] = useState(false);

  const handleRoomDetailsPage = (userData) => {
    setHostelIds(userData.Hostel_Id);

    setId(userData.ID);
    sethosName(userData.HostelName);
    setcustomerUser_Id(userData.User_Id);
    setRoomDetail(true);
    setUserList(false);
    dispatch({ type: "UPDATE_USERSLIST_FALSE" });
  };
  const handleShowAddBed = (u) => {
    setEdit("Edit");
    handleMenuClick();
    setShowMenu(true);
    setAdvanceForm(false);
    setAddCheckoutForm(false);
    setAddBasicDetail(false);
    setEditObj(u);
  };

  const [hostelIds, setHostelIds] = useState("");

  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const users = Array.isArray(userListDetail) ? userListDetail : [];

    const ParticularUserDetails = users.filter((item) => {
      return item.User_Id === customerUser_Id;
    });

    setUserDetails(ParticularUserDetails);
  }, [customerUser_Id, state.UsersList?.Users, state.InvoiceList?.Invoice]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: uniqueostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
      }, 2000);
    }
  }, [state.UsersList?.statusCodeForAddUser]);






  const handleBack = () => {
    setUserList(true);
    setRoomDetail(false);
  };

  const handleShowSearch = () => {
    setSearch(!search);
  };
  const handleFilterd = () => {
    setFilterStatus(!filterStatus);
  };
  const [checkInDateRange, setCheckInDateRange] = useState([]);
  const [bookingDateRange, setBookingDateRange] = useState([]);
  const [checkoutDateRange, setCheckoutDateRange] = useState([]);
  const [walkinDateRange, setWalkinDateRange] = useState([]);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(isSameOrBefore);
  const [resetPage, setResetPage] = useState(false);


  const handleDateRangeChangeBooking = (dates) => {
    setBookingDateRange(dates);

    if (!dates || dates.length !== 2) {
      setFilterStatus(false);
      setFilteredUsers(customerBooking);
      return;
    }

    const [start, end] = dates;

    const filtered = customerBooking?.filter((item) => {
      const itemDate = dayjs(item.createdat);
      return (
        itemDate.isSameOrAfter(start, "day") &&
        itemDate.isSameOrBefore(end, "day")
      );
    });

    setFilteredUsers(filtered);
    setFilterStatus(true);
    setResetPage(true);
  };



  const handleDateRangeChangeCheckIn = (dates) => {
    setCheckInDateRange(dates);

    if (!dates || dates.length !== 2) {
      setFilterStatus(false);
      setCurrentPage(1);
      return;
    }

    const [start, end] = dates;

    const filtered = userListDetail?.filter((item) => {
      if (!item.joining_Date || item.joining_Date === "0000-00-00") return false;

      const itemDate = dayjs(item.joining_Date);
      return (
        itemDate.isValid() &&
        itemDate.isSameOrAfter(start, "day") &&
        itemDate.isSameOrBefore(end, "day")
      );
    });

    setFilteredUsers(filtered);
    setFilterStatus(true);
    setCurrentPage(1);
  };





  const [statusFilterCheckout, setStatusFilterCheckout] = useState("");

  const handleStatusFilterCheckout = (event) => {
    const searchTerm = event.target.value;
    setStatusFilterCheckout(searchTerm);

    if (searchTerm !== "date") {
      setCheckoutDateRange(null);
    }

    if (searchTerm === "All") {
      setFilteredUsers(checkOutCustomer);
      setFilterStatus(true);
    } else if (searchTerm === "0" || searchTerm === "1") {
      const filtered = checkOutCustomer?.filter(
        (item) => item.isActive?.toString() === searchTerm
      );
      setFilteredUsers(filtered);
      setFilterStatus(true);
    } else if (searchTerm === "date") {
      setFilterStatus(true);
    }
  };

  useEffect(() => {
    if (!filterStatus) {
      setStatusFilterCheckout("All");
      setCheckoutDateRange(null);
    }
  }, [filterStatus]);

  const handleDateRangeChangeCheckout = (dates) => {
    setCheckoutDateRange(dates);

    if (!dates || dates.length !== 2) {
      setStatusFilterCheckout("All");
      setFilteredUsers(checkOutCustomer);
      setFilterStatus(false);
      return;
    }

    const [start, end] = dates;
    const filtered = checkOutCustomer?.filter((item) => {
      const itemDate = dayjs(item.CheckoutDate);
      return (
        itemDate.isSameOrAfter(start, "day") &&
        itemDate.isSameOrBefore(end, "day")
      );
    });

    setFilteredUsers(filtered);
    setFilterStatus(true);
    setResetPage(true);
  };

  const handleDateRangeChangeWalkin = (dates) => {
    setWalkinDateRange(dates);

    if (!dates || dates.length !== 2) {
      setFilterStatus(false);
      setFilteredUsers(walkingCustomer);
      return;
    }

    const [start, end] = dates;

    const filtered = walkingCustomer?.filter((item) => {
      const itemDate = dayjs(item.walk_In_Date);
      return (
        itemDate.isSameOrAfter(start, "day") &&
        itemDate.isSameOrBefore(end, "day")
      );
    });

    setFilteredUsers(filtered);
    setFilterStatus(true);
    setResetPage(true);
  };

  useEffect(() => {
    if (id) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      dispatch({ type: "AMENITESHISTORY", payload: { user_id: id } });
    }
  }, [id]);

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  const handleDeleteShow = (user) => {
    setDeleteShow(true);
    setDeleteDetails({ room: user.Rooms, bed: user.Bed, user: user });
  };

  useEffect(() => {
    if (state.UsersList?.deleteCustomerSuccessStatusCode === 200) {
      setDeleteShow(false);
      dispatch({ type: "USERLIST", payload: { hostel_id: uniqueostel_Id } });

      setDeleteDetails({ room: null, bed: null, user: null });

      setTimeout(() => {
        dispatch({ type: "REMOVE_DELETE_CUSTOMER" });
      }, 100);
    }
  }, [state.UsersList?.deleteCustomerSuccessStatusCode]);

  const handleDeleteCustomer = () => {
    if (deleteDetails?.user.ID) {
      dispatch({
        type: "DELETECUSTOMER",
        payload: { id: deleteDetails?.user.ID },
      });
    }
  };

  const handleDeleteBill = () => {
    setIsDeleting(false);
  };

  const uniqueAmenities = [];
  const seenNames = new Set();

  if (state.UsersList?.amnetieshistory) {
    state.UsersList.amnetieshistory.forEach((amenity) => {
      if (!seenNames.has(amenity.Amnities_Name)) {
        seenNames.add(amenity.Amnities_Name);
        uniqueAmenities.push(amenity);
      }
    });
  }

  useEffect(() => {
    dispatch({ type: "AMENITESNAMES" });
  }, []);

  const amenities = state.UsersList?.amnetieshistory;

  if (amenities) {
    amenities.forEach((amenity) => {
      if (!seenNames.has(amenity.Amnities_Name)) {
        seenNames.add(amenity.Amnities_Name);
        uniqueAmenities.push(amenity);
      }
    });
  }

  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser === 200) {
      setTimeout(() => {
        dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });
        dispatch({ type: "AMENITESHISTORY", payload: { user_id: id } });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDUSER_AMNETIES" });
      }, 1000);
    }
  }, [state.UsersList.statusCustomerAddUser]);

  const OnShowTableForCustomer = (isVisible) => {
    setUserList(isVisible);
    setRoomDetail(false);
  };

  const [showOtpValidation, setShowOtpValidation] = useState(false);
  const [showValidate, setShowValidate] = useState(true);
  const [aadhaarNo, setAdhaarNo] = useState("");

  const handleAdhaarChange = (e) => {
    setAdhaarNo(e.target.value);
  };

  const handleValidateAadhaar = () => {
    if (!aadhaarNo || !/^\d+$/.test(aadhaarNo)) {
      Swal.fire({
        icon: "warning",
        title: "Please enter a valid aadhaar no.",
      });
      return;
    }
    if (aadhaarNo) {
      dispatch({
        type: "KYCVALIDATE",
        payload: { user_id: id, aadhar_number: aadhaarNo },
      });
    }
  };

  useEffect(() => {
    if (state.UsersList.kycValidateSendOtpSuccess === 200) {
      setShowOtpValidation(true);
      setShowValidate(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_KYC_VALIDATE_SATUS_CODE" });
      }, 2000);
    }
  }, [state.UsersList.kycValidateSendOtpSuccess]);

  const [kycOtpValue, setKycOtpValue] = useState("");

  const handleKycOtpChange = (e) => {
    setKycOtpValue(e.target.value);
  };
  const [showbookingForm, setShowbookingForm] = useState(false);
  const toggleForm = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding booking information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    setShowbookingForm(!showbookingForm);
  };
  const closeModal = () => {
    setShowbookingForm(false);
  };
  const [checkoutForm, setcheckoutForm] = useState(false);
  const checkOutForm = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding checkout information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    setcheckoutForm(!checkoutForm);
  };
  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };

  const [walkInForm, setWalkinForm] = useState(false);
  const walkinForm = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error("Please add a hostel before adding walking information.", {
        hideProgressBar: true,
        autoClose: 1500,
        style: {
          color: "#000",
          borderBottom: "5px solid red",
          fontFamily: "Gilroy",
        },
      });
      return;
    }
    setWalkinForm(true);
  };
  const walkinFormcloseModal = () => {
    setWalkinForm(false);
  };

  useEffect(() => {
    if (state.UsersList.addWalkInCustomerStatusCode === 200) {
      setWalkinForm(false);
    }
  }, [state.UsersList.addWalkInCustomerStatusCode]);

  useEffect(() => {
    if (state.UsersList.addCheckoutCustomerStatusCode === 200) {
      setcheckoutForm(false);
    }
  }, [state.UsersList.addCheckoutCustomerStatusCode]);

  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false);

  useEffect(() => {
    if (state.UsersList?.exportDetails?.response?.fileUrl) {
      setExcelDownload(state.UsersList?.exportDetails?.response?.fileUrl);
    }
  }, [state.UsersList?.exportDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportBookingDetails?.response?.fileUrl) {
      setExcelDownloadBooking(
        state.UsersList?.exportBookingDetails?.response?.fileUrl
      );
    }
  }, [state.UsersList?.exportBookingDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportCheckoutDetails?.response?.fileUrl) {
      setExcelDownloadCheckout(
        state.UsersList?.exportCheckoutDetails?.response?.fileUrl
      );
    }
  }, [state.UsersList?.exportCheckoutDetails?.response?.fileUrl]);

  useEffect(() => {
    if (state.UsersList?.exportWalkinDetails?.response?.fileUrl) {
      setExcelDownloadChecIn(
        state.UsersList?.exportWalkinDetails?.response?.fileUrl
      );
    }
  }, [state.UsersList?.exportWalkinDetails?.response?.fileUrl]);

  const handleCustomerExcel = () => {
    if (value === "1") {
      dispatch({
        type: "EXPORTDETAILS",
        payload: {
          type: "customers",
          hostel_id: uniqueostel_Id,
        },
      });
      setIsDownloadTriggered(true);
    }
  };

  const handleBookingExcel = () => {
    if (value === "2") {
      dispatch({
        type: "EXPORTBOOKINGDETAILS",
        payload: { type: "booking", hostel_id: uniqueostel_Id },
      });
      setIsDownloadTriggered(true);
    }
  };

  const handlecheckoutExcel = () => {
    if (value === "3") {
      dispatch({
        type: "EXPORTCHECKOUTDETAILS",
        payload: { type: "checkout", hostel_id: uniqueostel_Id },
      });
      setIsDownloadTriggered(true);
    }
  };

  const handlewalkinExcel = () => {
    if (value === "4") {
      dispatch({
        type: "EXPORTWALKINGDETAILS",
        payload: { type: "walkin", hostel_id: uniqueostel_Id },
      });
      setIsDownloadTriggered(true);
    }
  };
  useEffect(() => {
    if (excelDownload && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownload;
      link.download = "smartstay_file.xlsx";
      link.click();
      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownload, isDownloadTriggered]);

  useEffect(() => {
    if (excelDownloadBooking && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownloadBooking;
      link.download = "smartstay_file.xlsx";
      link.click();

      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownloadBooking("");
      }, 500);
    }
  }, [excelDownloadBooking, isDownloadTriggered]);

  useEffect(() => {
    if (excelDownloadChecout && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownloadChecout;
      link.download = "smartstay_file.xlsx";
      link.click();

      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownloadChecout, isDownloadTriggered]);

  useEffect(() => {
    if (excelDownloadCheckIn && isDownloadTriggered) {
      const link = document.createElement("a");
      link.href = excelDownloadCheckIn;
      link.download = "smartstay_file.xlsx";
      link.click();

      setTimeout(() => {
        setIsDownloadTriggered(false);
        setExcelDownload("");
      }, 500);
    }
  }, [excelDownloadCheckIn, isDownloadTriggered]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportDetails === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportDetails]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportWalkin === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_WALKIN_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportWalkin]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportBooking === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_BOOKING_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportBooking]);

  useEffect(() => {
    if (state.UsersList?.statusCodeForExportCheckout === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_EXPORT_CHECKOUT_DETAILS" });
      }, 200);
    }
  }, [state.UsersList?.statusCodeForExportCheckout]);



  const customInvoiceDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };

  const customInvoiceDueDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };
  const customDateInput = (props) => {
    return (
      <div
        className="date-input-container w-100"
        onClick={props.onClick}
        style={{ position: "relative" }}
      >
        <FormControl
          type="text"
          className="date_input"
          value={props.value || "DD/MM/YYYY"}
          readOnly
          style={{
            border: "1px solid #D9D9D9",
            borderRadius: 8,
            padding: 9,
            fontSize: 14,
            fontFamily: "Gilroy",
            fontWeight: props.value ? 600 : 500,
            width: "100%",
            height: 50,
            boxSizing: "border-box",
            boxShadow: "none",
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
          onClick={props.onClick}
        />
      </div>
    );
  };
  const buttonStyle = {
    fontFamily: "Gilroy",
    fontSize: "14px",
    backgroundColor: "#1E45E1",
    color: "white",
    fontWeight: 600,
    borderRadius: "8px",
    padding: "12px",
    marginBottom: "10px",
    maxHeight: 45,
    width: "146px",
    whiteSpace: "nowrap",
  };

  useEffect(() => {
      if (state.createAccount?.networkError) {
        setBillLoading(false)
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        }, 3000)
      }
  
    }, [state.createAccount?.networkError])

  return (
    <div>
      <Addbooking
        show={showbookingForm}
        handleClose={closeModal}
        setShowbookingForm={setShowbookingForm}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
      />

      <CheckOutForm
        show={checkoutForm}
        handleClose={checkoutcloseModal}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
        setAddCheckoutForm={setAddCheckoutForm}
        checkoutaddform={checkoutaddform}
      />

      <UserlistWalkinForm
        show={walkInForm}
        handleClose={walkinFormcloseModal}
        customerrolePermission={customerrolePermission}
        uniqueostel_Id={uniqueostel_Id}
        setUniqostel_Id={setUniqostel_Id}
      />

      {userList && (
        <div className="container p-0">
          <div className="header-container">
            <div
              className="d-flex justify-content-between align-items-center flex-wrap"
              style={{ marginTop: 14 }}
            >
              <div className="d-flex justify-content-lg-start justify-content-center align-items-center flex-wrap ms-lg-4">
                <label
                  style={{
                    fontSize: 18,
                    color: "#000000",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    marginTop: -15,
                  }}
                >
                  Customers
                </label>
              </div>

              <div className="d-flex flex-wrap align-items-center gap-2">
                {search ? (
                  <div
                    style={{
                      position: "relative",
                      width: isSmallScreen && search ? "150px" : "240px",
                    }}
                    className="search-box"
                  >
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">
                        <Image
                          src={searchteam}
                          alt="search"
                          style={{ height: 20, width: 20, cursor: "pointer" }}
                        />
                      </span>
                      <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search"
                        value={filterInput}
                        onChange={(e) => handlefilterInput(e)}
                        style={{ boxShadow: "none", borderRight: "none" }}
                      />
                      <span className="input-group-text bg-white border-start-0">
                        <img
                          src={closecircle}
                          alt="close"
                          style={{ height: 20, width: 20, cursor: "pointer" }}
                          onClick={handleCloseSearch}
                        />
                      </span>
                    </div>

                    {isDropdownVisible && filteredUsers?.length > 0 && (
                      <div
                        style={{
                          border: "1px solid #d9d9d9",
                          position: "absolute",
                          top: 48,
                          left: 0,
                          zIndex: 1000,
                          padding: 10,
                          borderRadius: 8,
                          backgroundColor: "#fff",
                          width: "100%",
                        }}
                      >
                        <ul
                          className="show-scroll p-0"
                          style={{
                            backgroundColor: "#fff",
                            maxHeight: "174px",
                            minHeight:
                              filteredUsers?.length > 1 ? "100px" : "auto",
                            overflowY:
                              filteredUsers?.length > 3 ? "auto" : "hidden",
                            margin: 0,
                            listStyleType: "none",
                            borderRadius: 8,
                            boxSizing: "border-box",
                          }}
                        >
                          {filteredUsers?.map((user, index) => {
                            const imagedrop = user.profile || Profile;
                            return (
                              <li
                                key={index}
                                className="d-flex align-items-center hover-bg"
                                style={{
                                  cursor: "pointer",
                                  padding: "8px",
                                  borderBottom:
                                    index !== filteredUsers.length - 1
                                      ? "1px solid #eee"
                                      : "none",
                                  minWidth: 0,
                                  transition: "background-color 0.2s ease",
                                }}
                                onClick={() => handleUserSelect(user)}
                              >
                                <Image
                                  src={imagedrop}
                                  alt={user.Name || "Default Profile"}
                                  roundedCircle
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    marginRight: "10px",
                                    flexShrink: 0,
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = Profile;
                                  }}
                                />
                                <div
                                  className="text-truncate"
                                  style={{ maxWidth: "100%" }}
                                >
                                  <span
                                    style={{
                                      fontSize: "14px",
                                      wordBreak: "break-word",
                                    }}
                                  >
                                    {value === "1"
                                      ? user.Name
                                      : value === "2"
                                        ? [user?.first_name, user?.last_name]
                                          .filter(Boolean)
                                          .join(" ")
                                        : value === "3"
                                          ? user.Name
                                          : value === "4"
                                            ? user.first_name
                                            : ""}
                                  </span>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Image
                    src={searchteam}
                    alt="search"
                    className="me-2"
                    style={{ height: "24px", width: "24px", cursor: "pointer" }}
                    onClick={handleShowSearch}
                  />
                )}
                {(value === "1" || value === "2" || value === "3" || value === "4") && (
                  <div>
                    <Image
                      src={Filters}
                      roundedCircle
                      style={{
                        height: "50px",
                        width: "50px",
                        cursor: "pointer",
                      }}
                      onClick={handleFilterd}
                    />
                  </div>
                )}

                {value === "1" && filterStatus && (
                  <div style={{ width: 240 }}>
                    <RangePicker
                      value={checkInDateRange}
                      onChange={handleDateRangeChangeCheckIn}
                      format="DD/MM/YYYY"
                      style={{ width: "100%", cursor: "pointer", fontFamily: "Gilroy" }}
                    />
                  </div>
                )}



                {value === "2" && filterStatus && (
                  <div style={{ width: 240 }}>
                    <RangePicker
                      value={bookingDateRange}
                      onChange={handleDateRangeChangeBooking}
                      format="DD/MM/YYYY"
                      style={{ width: "100%", cursor: "pointer", fontFamily: "Gilroy" }}
                    />
                  </div>
                )}

                {value === "3" && filterStatus && (
                  <div
                    className="me-3"
                    style={{
                      border: "1px solid #D4D4D4",
                      borderRadius: 8,
                      width: search ? "150px" : "130px",
                    }}
                  >
                    <Form.Select
                      onChange={(e) => handleStatusFilterCheckout(e)}
                      value={statusFilterCheckout}
                      aria-label="Select Price Range"
                      className=""
                      id="statusselect"
                      style={{
                        color: "rgba(34, 34, 34, 1)",
                        fontSize: 15,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      <option value="All">All</option>
                      <option value="1">Pending</option>
                      <option value="0">Completed</option>
                      <option value="date">Date</option>
                    </Form.Select>
                  </div>
                )}

                {value === "3" && statusFilterCheckout === "date" && (
                  <div>
                    <RangePicker
                      value={checkoutDateRange}
                      format="DD-MM-YYYY"
                      onChange={handleDateRangeChangeCheckout}
                      style={{
                        height: "38px",
                        borderRadius: 8,
                        cursor: "pointer",
                        fontFamily: "Gilroy"
                      }}
                      allowClear
                    />
                  </div>
                )}

                {value === "4" && filterStatus && (
                  <div style={{ width: 240 }}>
                    <RangePicker
                      value={walkinDateRange}
                      onChange={handleDateRangeChangeWalkin}
                      format="DD/MM/YYYY"
                      style={{ width: "100%", cursor: "pointer", fontFamily: "Gilroy" }}
                    />
                  </div>
                )}

                <div style={{ marginTop: 1 }}>
                  {value === "1" && (
                    <img
                      src={excelimg}
                      alt="excel"
                      width={38}
                      height={38}
                      style={{ cursor: "pointer" }}
                      onClick={handleCustomerExcel}
                    />
                  )}
                  {value === "2" && (
                    <img
                      src={excelimg}
                      alt="excel"
                      width={38}
                      height={38}
                      style={{ cursor: "pointer" }}
                      onClick={handleBookingExcel}
                    />
                  )}
                  {value === "3" && (
                    <img
                      src={excelimg}
                      alt="excel"
                      width={38}
                      height={38}
                      style={{ cursor: "pointer" }}
                      onClick={handlecheckoutExcel}
                    />
                  )}
                  {value === "4" && (
                    <img
                      src={excelimg}
                      alt="excel"
                      width={38}
                      height={38}
                      style={{ cursor: "pointer" }}
                      onClick={handlewalkinExcel}
                    />
                  )}
                </div>

                <div className="mt-2 me-lg-4 text-center">
                  {value === "1" && (
                    <Button
                      disabled={customerAddPermission}
                      onClick={handleShow}
                      style={buttonStyle}
                    >
                      + Customer
                    </Button>
                  )}
                  {value === "2" && (
                    <Button
                      disabled={customerBookingAddPermission}
                      onClick={toggleForm}
                      style={buttonStyle}
                    >
                      + Bookings
                    </Button>
                  )}
                  {value === "3" && (
                    <Button
                      disabled={customerCheckoutPermission}
                      onClick={checkOutForm}
                      style={buttonStyle}
                    >
                      + Check-Out
                    </Button>
                  )}
                  {value === "4" && (
                    <Button
                      disabled={customerWalkInAddPermission}
                      onClick={walkinForm}
                      style={buttonStyle}
                    >
                      + Walk-In
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {filterInput && (
            <div
              className="container ms-4 mb-4"
              style={{ marginTop: "20px", fontWeight: 600, fontSize: 16 }}
            >
              {filteredUsers.length > 0 ? (
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 16,
                    color: "rgba(100, 100, 100, 1)",
                  }}
                >
                  {filteredUsers.length} result
                  {filteredUsers.length > 1 ? "s" : ""} found for{" "}
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      fontSize: 16,
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    &quot;{filterInput}&quot;
                  </span>
                </span>
              ) : (
                <span
                  style={{
                    textAlign: "center",
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontSize: 16,
                    color: "rgba(100, 100, 100, 1)",
                  }}
                >
                  No results found for{" "}
                  <span
                    style={{
                      textAlign: "center",
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                      fontSize: 16,
                      color: "rgba(34, 34, 34, 1)",
                    }}
                  >
                    &quot;{filterInput}&quot;
                  </span>
                </span>
              )}
            </div>
          )}
          <div
            className=""
            style={{
              paddingLeft: "27px",
              fontFamily: "Gilroy",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            <TabContext value={value} style={{ marginLeft: "-10px" }}>
              <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                <TabList
                  orientation={isSmallScreen ? "vertical" : "horizontal"}
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
                >
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "1" ? "#222222" : "#4B4B4B",
                    }}
                    label="Check-In"
                    value="1"
                  />
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "2" ? "#222222" : "#4B4B4B",
                    }}
                    label="Bookings"
                    value="2"
                  />
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "3" ? "#222222" : "#4B4B4B",
                    }}
                    label="Check-out"
                    value="3"
                  />
                  <Tab
                    className="tab-label"
                    style={{
                      textTransform: "capitalize",
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      color: value === "4" ? "#222222" : "#4B4B4B",
                    }}
                    label="Walk-in"
                    value="4"
                  />
                </TabList>
              </Box>

              <TabPanel value="1">
                {loading && (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: "200px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "transparent",
                      opacity: 0.75,
                      zIndex: 10,
                    }}
                  >
                    <div
                      style={{
                        borderTop: "4px solid #1E45E1",
                        borderRight: "4px solid transparent",
                        borderRadius: "50%",
                        width: "40px",
                        height: "40px",
                        animation: "spin 1s linear infinite",
                      }}
                    ></div>
                  </div>
                )}
{customerpermissionError ? (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      marginTop:90
    }}
  >
    <img
      src={Emptystate}
      alt="Empty State"
      
    />
    <div
      style={{
        color: "red",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginTop: "1rem",
      }}
    >
      <MdError  />
      <span  style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}>{customerpermissionError}</span>
    </div>
  </div>
) : !loading && Array.isArray(currentItems) && currentItems.length === 0 ? (
  <div style={{ marginTop: 30 }} className="animated-text">
    <div style={{ textAlign: "center" }}>
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
      No Customers available
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
      There are no Customer added.
    </div>
  </div>
) : null}

                  <>
                    {!customerpermissionError && sortedData && sortedData.length > 0 && 
                      <div
                        className=" booking-table-userlist  booking-table  me-4"
                        style={{ paddingBottom: "20px", marginLeft: "-14px" }}
                      >
                        <div
                          className="show-scrolls"
                          style={{
                            height:
                              sortedData?.length >= 5 || sortedData?.length >= 5
                                ? "350px"
                                : "auto",
                            overflow: "auto",
                            borderTop: "1px solid #E8E8E8",
                            marginBottom: 20,
                            marginTop: "20px",
                            paddingRight: 0,
                            paddingLeft: 0,
                          }}
                        >
                          <Table
                            responsive="md"
                            style={{
                              fontFamily: "Gilroy",
                              color: "rgba(34, 34, 34, 1)",
                              fontSize: 14,
                              fontStyle: "normal",
                              fontWeight: 500,
                              position: "sticky",
                              top: 0,
                              zIndex: 1,
                              borderRadius: 0,
                            }}
                          >
                            <thead
                              style={{
                                fontFamily: "Gilroy",
                                backgroundColor: "rgba(231, 241, 255, 1)",
                                color: "rgba(34, 34, 34, 1)",
                                fontSize: 14,
                                fontStyle: "normal",
                                fontWeight: 500,
                                position: "sticky",
                                top: 0,
                                zIndex: 1,
                              }}
                            >
                              <tr>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    paddingLeft: "20px",
                                  }}
                                >
                                  <div className="d-flex gap-1 align-items-center justify-content-start">
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                      }}
                                    >
                                      <ArrowUp2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("Name", "asc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                      <ArrowDown2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("Name", "desc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                    Name
                                  </div>
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <div className="d-flex gap-1 align-items-center justify-content-start">
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                      }}
                                    >
                                      <ArrowUp2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("user_join_date", "asc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                      <ArrowDown2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("user_join_date", "desc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                    Joining Date
                                  </div>
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <div className="d-flex gap-1 align-items-center justify-content-start">
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                      }}
                                    >
                                      <ArrowUp2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("Email", "asc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                      <ArrowDown2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("Email", "desc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                    Email ID
                                  </div>
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  <div className="d-flex gap-1 align-items-center justify-content-start">
                                    <div
                                      style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "2px",
                                      }}
                                    >
                                      <ArrowUp2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("Phone", "asc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                      <ArrowDown2
                                        size="10"
                                        variant="Bold"
                                        color="#1E45E1"
                                        onClick={() =>
                                          handleSort("Phone", "desc")
                                        }
                                        style={{ cursor: "pointer" }}
                                      />
                                    </div>
                                    Mobile No
                                  </div>
                                </th>

                              <th
                                style={{
                                  textAlign: "start",
                                  padding: "10px",
                                  color: "#939393",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                <div className="d-flex gap-1 align-items-center justify-content-start">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "2px",
                                    }}
                                  >
                                    <ArrowUp2
                                      size="10"
                                      variant="Bold"
                                      color="#1E45E1"
                                      onClick={() =>
                                        handleSort("Rooms", "asc")
                                      }
                                      style={{ cursor: "pointer" }}
                                    />
                                    <ArrowDown2
                                      size="10"
                                      variant="Bold"
                                      color="#1E45E1"
                                      onClick={() =>
                                        handleSort("Rooms", "desc")
                                      }
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                  Room
                                </div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                  padding: "10px",
                                  color: "#939393",
                                  fontSize: "12px",
                                  fontWeight: 500,
                                  fontFamily: "Gilroy",
                                }}
                              >
                                <div className="d-flex gap-1 align-items-center justify-content-start">
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "2px",
                                    }}
                                  >
                                    <ArrowUp2
                                      size="10"
                                      variant="Bold"
                                      color="#1E45E1"
                                      onClick={() => handleSort("Bed", "asc")}
                                      style={{ cursor: "pointer" }}
                                    />
                                    <ArrowDown2
                                      size="10"
                                      variant="Bold"
                                      color="#1E45E1"
                                      onClick={() =>
                                        handleSort("Bed", "desc")
                                      }
                                      style={{ cursor: "pointer" }}
                                    />
                                  </div>
                                  Bed
                                </div>
                              </th>
                              <th
                                style={{
                                  textAlign: "start",
                                  fontFamily: "Gilroy",
                                  color: "#939393",
                                  fontSize: 12,
                                  fontWeight: 500,
                                  paddingBottom: 12
                                }}
                              >
                                Action

                              </th>
                            </tr>
                          </thead>
                          <tbody style={{ textAlign: "center" }}>
                            {sortedData && sortedData.length > 0 && (
                              <>
                                {sortedData.map((user) => {
                                  return (
                                    <tr
                                      key={user.ID}
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        textAlign: "center",
                                      }}
                                    >

                                      <td
                                        style={{
                                          border: "none",
                                          padding: "10px",
                                          textAlign: "start",
                                          paddingLeft: "20px",
                                          verticalAlign: "middle",
                                          borderBottom: "1px solid #E8E8E8",
                                        }}
                                        className="ps-0 ps-sm-0 ps-md-3 ps-lg-3"
                                      >
                                        <span
                                          className="Customer_Name_Hover  ps-lg-3"
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            color: "#1E45E1",
                                            cursor: "pointer",
                                            marginTop: 10,
                                            paddingLeft: 10,
                                            whiteSpace: "nowrap",
                                          }}
                                          onClick={() =>
                                            handleRoomDetailsPage(user)
                                          }
                                        >
                                          {user.Name}
                                        </span>
                                      </td>

                                      <td className="ps-0 ps-sm-0 ps-md-3 ps-lg-3"
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          verticalAlign: "middle",
                                          borderBottom: "1px solid #E8E8E8",
                                        }}
                                      >
                                        {user?.user_join_date && user.user_join_date !== "0000-00-00" ? (
                                          <span
                                            style={{
                                              padding: "3px 10px",
                                              borderRadius: "60px",
                                              backgroundColor: "#EBEBEB",
                                              textAlign: "center",
                                              fontSize: "11px",
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                              display: "inline-block",
                                            }}
                                          >
                                            {moment(user.user_join_date).format("D MMMM YYYY")}
                                          </span>
                                        )
                                          :
                                          '-'}

                                      </td>

                                      <td
                                        style={{
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          paddingTop: 15,
                                          paddingLeft: 20,
                                          verticalAlign: "middle",
                                          borderBottom: "1px solid #E8E8E8",
                                        }}
                                        className="ps-0 ps-sm-0 ps-md-3 ps-lg-3"
                                      >
                                        <div className="ps-2">
                                          {user.Email}
                                        </div>

                                      </td>
                                      <td
                                        style={{
                                          paddingTop: 15,
                                          paddingLeft: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,
                                          whiteSpace: "nowrap",
                                          verticalAlign: "middle",
                                          borderBottom: "1px solid #E8E8E8",
                                        }}
                                        className="ps-0 ps-sm-0 ps-md-3 ps-lg-4"
                                      >
                                        +
                                        {user &&
                                          String(user.Phone)?.slice(
                                            0,
                                            String(user.Phone).length - 10
                                          )}{" "}
                                        {user &&
                                          String(user.Phone)?.slice(-10)}
                                      </td>

                                      <td
                                        style={{
                                          paddingTop: 15,
                                          paddingLeft: 20,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          verticalAlign: "middle",
                                          borderBottom: "1px solid #E8E8E8",
                                        }}
                                        className="ps-0 ps-sm-0 ps-md-3 ps-lg-4"
                                      >
                                        {" "}
                                        {!user.Rooms ? "-" : user.Rooms}
                                      </td>

                                      <td
                                        className="ps-4 ps-sm-2 ps-md-3 ps-lg-4 "
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          cursor: "pointer",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,
                                          verticalAlign: "middle",
                                          borderBottom: "1px solid #E8E8E8",
                                        }}
                                      >
                                        {!user.Bed ? "-" : user.Bed}
                                      </td>
                                      <td
                                        style={{
                                          paddingTop: 12,
                                          border: "none",
                                          borderBottom: "1px solid #E8E8E8",
                                        }}
                                      >

                                        <div
                                          style={{
                                            cursor: "pointer",
                                            height: 40,
                                            width: 40,
                                            borderRadius: 100,
                                            border: "1px solid #EFEFEF",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            position: "relative",
                                            backgroundColor:
                                              activeRow === user.ID
                                                ? "#E7F1FF"
                                                : "white",
                                          }}
                                          onClick={(e) =>
                                            handleShowDots(user.ID, e)
                                          }
                                        >
                                          <PiDotsThreeOutlineVerticalFill
                                            style={{ height: 20, width: 20 }}
                                          />
                                          {activeRow === user.ID && (
                                            <div
                                              ref={popupRef}
                                              style={{
                                                position: "fixed",
                                                top: popupPosition.top - 25,
                                                left: popupPosition.left,
                                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                                width: 140,
                                                backgroundColor: "#F9F9F9",
                                                border: "1px solid #EBEBEB",
                                                borderRadius: "10px",
                                                zIndex: 1000,
                                              }}
                                            >
                                              <div>
                                                {!user.Bed && (
                                                  <div
                                                    className="d-flex align-items-center gap-2"
                                                    onClick={() => {
                                                      if (!customerAddPermission) {
                                                        handleShowAddBed(user);
                                                      }
                                                    }}
                                                    style={{
                                                      padding: "8px 12px",
                                                      width: "100%",
                                                      borderRadius: 6,
                                                      backgroundColor: "#F9F9F9",
                                                      cursor: customerAddPermission ? "not-allowed" : "pointer",
                                                      opacity: customerAddPermission ? 0.6 : 1,
                                                      pointerEvents: customerAddPermission ? "none" : "auto",
                                                      transition: "background 0.2s ease-in-out",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      if (!customerAddPermission) {
                                                        e.currentTarget.style.backgroundColor = "#FFF3F3";
                                                      }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor = "#F9F9F9";
                                                    }}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      alt="Assign Bed"
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                        filter: customerAddPermission ? "grayscale(100%)" : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily: "Gilroy, sans-serif",
                                                        color: customerAddPermission ? "#888888" : "#222222",
                                                        cursor: customerAddPermission ? "not-allowed" : "pointer",
                                                      }}
                                                    >
                                                      Assign Bed
                                                    </label>
                                                  </div>

                                                )}

                                                {user.Bed && (
                                                  <div
                                                    className="d-flex align-items-center gap-2"
                                                    onClick={() => handleCustomerCheckout(user)}
                                                    style={{
                                                      backgroundColor: "#F9F9F9",
                                                      cursor: customerAddPermission ? "not-allowed" : "pointer",
                                                      opacity: customerAddPermission ? 0.6 : 1,
                                                      padding: "8px 12px",
                                                      borderRadius: 6,
                                                      transition: "background 0.2s ease-in-out",
                                                      pointerEvents: customerAddPermission ? "none" : "auto",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      if (!customerAddPermission) {
                                                        e.currentTarget.style.backgroundColor = "#F0FFF4";
                                                      }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor = "#F9F9F9";
                                                    }}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      alt="Check-Out"
                                                      style={{
                                                        width: 16,
                                                        height: 16,
                                                        filter: customerAddPermission ? "grayscale(100%)" : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily: "Gilroy, sans-serif",
                                                        color: customerAddPermission ? "#888888" : "#222222",
                                                        cursor: customerAddPermission ? "not-allowed" : "pointer",
                                                        margin: 0,
                                                      }}
                                                    >
                                                      Check-Out
                                                    </label>
                                                  </div>

                                                )}
                                                <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />
                                                {user.Bed && (
                                                  <div
                                                    className="d-flex align-items-center gap-2"
                                                    onClick={() => { handleCustomerReAssign(user); }}

                                                    style={{
                                                      backgroundColor: "#F9F9F9",
                                                      cursor: customerAddPermission ? "not-allowed" : "pointer",
                                                      opacity: customerAddPermission ? 0.6 : 1,
                                                      padding: "8px 12px",
                                                      borderRadius: 6,
                                                      transition: "background 0.2s ease-in-out",
                                                    }}
                                                    onMouseEnter={(e) => {
                                                      if (!customerAddPermission) {
                                                        e.currentTarget.style.backgroundColor = "#FFFBEF";
                                                      }
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor = "#F9F9F9";
                                                    }}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      alt="Re-Assign"
                                                      style={{
                                                        width: 16,
                                                        height: 16,
                                                        filter: customerAddPermission ? "grayscale(100%)" : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily: "Gilroy, sans-serif",
                                                        color: customerAddPermission ? "#888888" : "#222222",
                                                        cursor: customerAddPermission ? "not-allowed" : "pointer",
                                                        margin: 0,
                                                      }}
                                                    >
                                                      Re Assign
                                                    </label>
                                                  </div>

                                                )}
                                                <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />


                                                <div
                                                  className="d-flex align-items-center gap-2"
                                                  style={{
                                                    backgroundColor: "#F9F9F9",
                                                    cursor: customerEditPermission ? "not-allowed" : "pointer",
                                                    opacity: customerEditPermission ? 0.6 : 1,
                                                    padding: "8px 12px",
                                                    borderRadius: 6,
                                                    transition: "background 0.2s ease-in-out",
                                                  }}
                                                  onClick={() => {
                                                    if (!customerEditPermission) {
                                                      handleRoomDetailsPage(user);
                                                    }
                                                  }}
                                                  onMouseEnter={(e) => {
                                                    if (!customerEditPermission) {
                                                      e.currentTarget.style.backgroundColor = "#F0F4FF";
                                                    }
                                                  }}
                                                  onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                                                  }}
                                                >
                                                  <img
                                                    src={Edit}
                                                    alt="Edit"
                                                    style={{
                                                      width: 16,
                                                      height: 16,
                                                      filter: customerEditPermission ? "grayscale(100%)" : "none",
                                                    }}
                                                  />
                                                  <label
                                                    style={{
                                                      fontSize: 14,
                                                      fontWeight: 500,
                                                      fontFamily: "Gilroy, sans-serif",
                                                      color: customerEditPermission ? "#888888" : "#1E45E1",
                                                      cursor: customerEditPermission ? "not-allowed" : "pointer",
                                                      margin: 0,
                                                    }}
                                                  >
                                                    Edit
                                                  </label>
                                                </div>


                                                <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />
                                                <div
                                                  className="d-flex align-items-center gap-2"
                                                  style={{
                                                    backgroundColor: "#F9F9F9",
                                                    cursor: customerDeletePermission ? "not-allowed" : "pointer",
                                                    opacity: customerDeletePermission ? 0.6 : 1,
                                                    padding: "8px 12px",
                                                    borderRadius: 6,
                                                    transition: "background 0.2s ease-in-out",
                                                  }}
                                                  onClick={() => {
                                                    if (!customerDeletePermission) {
                                                      handleDeleteShow(user);
                                                    }
                                                  }}
                                                  onMouseEnter={(e) => {
                                                    if (!customerDeletePermission) {
                                                      e.currentTarget.style.backgroundColor = "#FFF3F3";
                                                    }
                                                  }}
                                                  onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = "#F9F9F9";
                                                  }}
                                                >
                                                  <img
                                                    src={Delete}
                                                    alt="Delete Icon"
                                                    style={{ width: 16, height: 16 }}
                                                  />
                                                  <label
                                                    style={{
                                                      fontSize: 14,
                                                      fontWeight: 500,
                                                      fontFamily: "Gilroy, sans-serif",
                                                      color: customerDeletePermission ? "#888888" : "#FF0000",
                                                      cursor: customerDeletePermission ? "not-allowed" : "pointer",
                                                      margin: 0,
                                                    }}
                                                  >
                                                    Delete
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>

                                      </td>
                                    </tr>
                                  );
                                })}
                              </>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </div>
                  }
                </>



                 {
  !customerpermissionError &&
  (
    (search || filterStatus ? filteredUsers?.length : userListDetail?.length) >= 5
  ) && (

                    <nav
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "10px",
                        position: "fixed",
                        bottom: "0",
                        right: "0",
                        backgroundColor: "white",
                        zIndex: "1000",
                      }}
                    >
                      <div>
                        <select
                          value={itemsPerPage}
                          onChange={handleItemsPerPageChange}
                          style={{
                            padding: "5px",
                            border: "1px solid #1E45E1",
                            borderRadius: "5px",
                            color: "#1E45E1",
                            fontWeight: "bold",
                            cursor: "pointer",
                            outline: "none",
                            boxShadow: "none",
                          }}
                        >
                          <option value={5}>5</option>
                          <option value={10}>10</option>
                          <option value={50}>50</option>
                          <option value={100}>100</option>
                        </select>
                      </div>

                      <ul
                        style={{
                          display: "flex",
                          alignItems: "center",
                          listStyleType: "none",
                          margin: 0,
                          padding: 0,
                        }}
                      >
                        <li style={{ margin: "0 10px" }}>
                          <button
                            style={{
                              padding: "5px",
                              textDecoration: "none",
                              color: currentPage === 1 ? "#ccc" : "#1E45E1",
                              cursor:
                                currentPage === 1 ? "not-allowed" : "pointer",
                              borderRadius: "50%",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                          >
                            <ArrowLeft2
                              size="16"
                              color={currentPage === 1 ? "#ccc" : "#1E45E1"}
                            />
                          </button>
                        </li>

                        <li
                          style={{
                            margin: "0 10px",
                            fontSize: "14px",
                            fontWeight: "bold",
                          }}
                        >
                          {currentPage} of {totalPages}
                        </li>

                        <li style={{ margin: "0 10px" }}>
                          <button
                            style={{
                              padding: "5px",
                              textDecoration: "none",
                              color:
                                currentPage === totalPages ? "#ccc" : "#1E45E1",
                              cursor:
                                currentPage === totalPages
                                  ? "not-allowed"
                                  : "pointer",
                              borderRadius: "50%",
                              display: "inline-block",
                              minWidth: "30px",
                              textAlign: "center",
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                          >
                            <ArrowRight2
                              size="16"
                              color={
                                currentPage === totalPages ? "#ccc" : "#1E45E1"
                              }
                            />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )


                }

                {customerReassign === true ? (
                  <CustomerReAssign
                    customerReassign={customerReassign}
                    setCustomerReAssign={setCustomerReAssign}
                    reAssignDetail={reAssignDetail}
                  />
                ) : null}

                {customerCheckoutpage === true ? (
                  <CustomerCheckout
                    customerCheckoutpage={customerCheckoutpage}
                    setCustomerCheckoutpage={setCustomerCheckoutpage}
                    uniqueostel_Id={uniqueostel_Id}
                    data={customercheckoutdata}
                  />
                ) : null}
              </TabPanel>
              <TabPanel value="2">
                <UserlistBookings
                  id={props.id}
                  setFilteredUsers={setFilteredUsers}
                  filteredUsers={filteredUsers}
                  currentItems={currentItems}
                  showbookingForm={showbookingForm}
                  toggleForm={toggleForm}
                  customerBookingAddPermission={customerBookingAddPermission}
                  customerrolePermission={customerrolePermission}
                  uniqueostel_Id={uniqueostel_Id}
                  setUniqostel_Id={setUniqostel_Id}
                  filterInput={filterInput}
                  search={search}
                  filterStatus={filterStatus}
                  bookingDateRange={bookingDateRange}
                  resetPage={resetPage}
                  setResetPage={setResetPage}
                />
              </TabPanel>
              <TabPanel value="3">
                <UserlistCheckout
                  id={props.id}
                  customerrolePermission={customerrolePermission}
                  customerCheckoutPermission={customerCheckoutPermission}
                  uniqueostel_Id={uniqueostel_Id}
                  setUniqostel_Id={setUniqostel_Id}
                  filteredUsers={filteredUsers}
                  filterInput={filterInput}
                  setAddCheckoutForm={setAddCheckoutForm}
                  checkoutaddform={checkoutaddform}
                  search={search}
                  checkoutDateRange={checkoutDateRange}
                  filterStatus={filterStatus}
                  resetPage={resetPage}
                  setResetPage={setResetPage}
                />
              </TabPanel>
              <TabPanel value="4">
                <UserlistWalkin
                  id={props.id}
                  customerrolePermission={customerrolePermission}
                  customerWalkInAddPermission={customerWalkInAddPermission}
                  uniqueostel_Id={uniqueostel_Id}
                  setUniqostel_Id={setUniqostel_Id}
                  filteredUsers={filteredUsers}
                  filterInput={filterInput}
                  search={search}
                  walkinDateRange={walkinDateRange}
                  filterStatus={filterStatus}
                  resetPage={resetPage}
                  setResetPage={setResetPage}
                />
              </TabPanel>
            </TabContext>
          </div>
        </div>
      )}

      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
        backdrop="static"
        centered
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header
          style={{
            borderBottom: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            padding: "12px 16px",
          }}
        >
          <h5
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              fontWeight: 600,
              color: "#222222",
              margin: 0,
              textAlign: "center",
            }}
          >
            Delete Customer?
          </h5>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",
            marginTop: "-10px",
          }}
        >
          Are you sure you want to delete this Customer?
        </Modal.Body>

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none", marginTop: "-10px" }}
        >
          <Button
            className="me-2"
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#1E45E1",
              color: "#FFFFFF",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleDeleteCustomer}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {roomDetail === true ? (
        <UserListRoomDetail
          onEditItem={handleEditItem}
          onAddItem={handleAddItems}
          onDeleteItem={handleDeleteItem}
          onEditRoomItem={handleEditRoomReading}
          onEditHostelItem={handleEditHostelReading}
          showMenu={showMenu}
          displayDetail={addBasicDetail}
          setShowMenu={setShowMenu}
          handleShow={handleShow}
          edit={edit}
          setEdit={setEdit}
          EditObj={EditObj}
          setEditObj={setEditObj}
          handleMenuClick={handleMenuClick}
          setShowForm={setShowForm}
          showForm={showForm}
          handleShowAddBed={handleShowAddBed}
          roomDetail={roomDetail}
          setRoomDetail={setRoomDetail}
          userList={userList}
          setUserList={setUserList}
          OnShowTable={OnShowTableForCustomer}
          userDetails={userDetails}
          handleBack={handleBack}
          id={id}
          aadhaarNo={aadhaarNo}
          handleValidateAadhaar={handleValidateAadhaar}
          showOtpValidation={showOtpValidation}
          kycOtpValue={kycOtpValue}
          handleKycOtpChange={handleKycOtpChange}
          showValidate={showValidate}
          hostelName={hostelName}
          customerUser_Id={customerUser_Id}
          hostelIds={hostelIds}
          handleAdhaarChange={handleAdhaarChange}
          customerEditPermission={customerEditPermission}
          uniqueostel_Id={uniqueostel_Id}
          setUniqostel_Id={setUniqostel_Id}
        />
      ) : null}

      {isroomReading && (
        <>
          <Modal
            show={isroomReading}
            onHide={() => handleCloseRoom()}
            backdrop="static"
            centered
          >
            <Modal.Header
              style={{ marginBottom: "10px", position: "relative" }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                }}
              >
                Edit Reading
              </div>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleCloseRoom}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "16px",
                  border: "1px solid black",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "30px",
                    paddingBottom: "6px",
                  }}
                >
                  &times;
                </span>
              </button>
            </Modal.Header>
            <Modal.Body>
              <div className="row ">
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Floor{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="border"

                    value={Floor}
                    onChange={(e) => handleFloor(e)}
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
                  >
                    <option
                      style={{ fontSize: 14, fontWeight: 600 }}
                      selected
                      value=""
                    >
                      Select Floor
                    </option>
                    {state?.UsersList?.hosteldetailslist &&
                      state?.UsersList?.hosteldetailslist.map((item) => (
                        <>
                          <option key={item.floor_id} value={item.floor_id}>
                            {item.floor_name}
                          </option>
                        </>
                      ))}
                  </Form.Select>
                  {floorError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {floorError}
                      </span>
                    </div>
                  )}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Label
                    style={{
                      fontSize: 14,
                      color: "#222222",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    Room{" "}
                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    className="border"

                    value={Rooms}
                    onChange={(e) => handleRoom(e)}
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
                  >
                    <option>Select a Room</option>
                    {state.UsersList?.roomdetails &&
                      state.UsersList?.roomdetails.map((item) => (
                        <>
                          <option key={item.Room_Id} value={item.Room_Id}>
                            {item.Room_Name}
                          </option>
                        </>
                      ))}
                  </Form.Select>
                  {roomError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      {roomError}
                    </div>
                  )}
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Reading{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {" "}
                        *{" "}
                      </span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      placeholder="6542310"
                      value={reading}
                      onChange={(e) => handleReadingChange(e)}
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
                  </Form.Group>
                  {readingError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {readingError}
                      </span>
                    </div>
                  )}
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
                      Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <DatePicker
                        style={{ cursor: "pointer" }}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={null}
                        customInput={customDateInput({
                          value: selectedDate
                            ? selectedDate.toLocaleDateString("en-GB")
                            : "",
                        })}
                      />
                    </div>
                  </Form.Group>
                  {dateError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      {dateError}
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
            {formError && (
              <div style={{ color: "red" }}>
                <MdError />
                <span
                  style={{
                    fontSize: "12px",
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {formError}
                </span>
              </div>
            )}
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                style={{
                  backgroundColor: "#1E45E1",
                  fontWeight: 600,
                  height: 50,
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: "Montserrat, sans-serif",
                  marginTop: 10,
                }}
                disabled={!!formError}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {ishostelReading && (
        <>
          <Modal
            show={ishostelReading}
            onHide={() => handleCloseHostel()}
            backdrop="static"
            centered
          >
            <Modal.Header
              style={{ marginBottom: "10px", position: "relative" }}
            >
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                }}
              >
                Hostel Reading
              </div>
              <button
                type="button"
                className="close"
                aria-label="Close"
                onClick={handleCloseHostel}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "16px",
                  border: "1px solid black",
                  background: "transparent",
                  cursor: "pointer",
                  padding: "0",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontSize: "30px",
                    paddingBottom: "6px",
                  }}
                >
                  &times;
                </span>
              </button>
            </Modal.Header>
            <Modal.Body>
              <div className="row ">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      HostelName{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {" "}
                        *{" "}
                      </span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      placeholder="6542310"
                      value={hos_Name}
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
                  </Form.Group>


                </div>

                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      Reading{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>
                        {" "}
                        *{" "}
                      </span>
                    </Form.Label>
                    <FormControl
                      type="text"
                      id="form-controls"
                      placeholder="6542310"
                      value={reading}
                      onChange={(e) => handleReadingChange(e)}
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
                  </Form.Group>
                  {readingError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {" "}
                        {readingError}
                      </span>
                    </div>
                  )}
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
                      Date{" "}
                      <span style={{ color: "red", fontSize: "20px" }}>*</span>
                    </Form.Label>
                    <div style={{ position: "relative", width: "100%" }}>
                      <DatePicker
                        style={{ cursor: "pointer" }}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={null}
                        customInput={customDateInput({
                          value: selectedDate
                            ? selectedDate.toLocaleDateString("en-GB")
                            : "",
                        })}
                      />
                    </div>
                  </Form.Group>
                  {dateError && (
                    <div style={{ color: "red" }}>
                      <MdError />
                      <span
                        style={{
                          fontSize: "12px",
                          color: "red",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        {dateError}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Modal.Body>
            {formError && (
              <div style={{ color: "red" }}>
                <MdError />
                <span
                  style={{
                    fontSize: "12px",
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {formError}
                </span>
              </div>
            )}
            <Modal.Footer className="d-flex justify-content-center">
              <Button
                className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                style={{
                  backgroundColor: "#1E45E1",
                  fontWeight: 600,
                  height: 50,
                  borderRadius: 12,
                  fontSize: 16,
                  fontFamily: "Montserrat, sans-serif",
                  marginTop: 10,
                }}

              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {roomDelete && (
        <>
          <Modal
            show={roomDelete}
            onHide={handleCloseDeleteroom}
            centered
            backdrop="static"
            style={{
              width: 388,
              height: 250,
              marginLeft: "500px",
              marginTop: "200px",
            }}
          >
            <Modal.Header style={{ borderBottom: "none" }}>
              <Modal.Title
                style={{
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#222222",
                  flex: 1,
                }}
              >
                Delete RoomReading?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Gilroy",
                color: "#646464",
                textAlign: "center",
                marginTop: "-20px",
              }}
            >
              Are you sure you want to delete this RoomReading?
            </Modal.Body>

            <Modal.Footer
              style={{
                justifyContent: "center",
                borderTop: "none",
                marginTop: "-10px",
              }}
            >
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#fff",
                  color: "#1E45E1",
                  border: "1px solid #1E45E1",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  marginRight: 10,
                }}
                onClick={handleCloseDeleteroom}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#1E45E1",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {hostelDelete && (
        <>
          <Modal
            show={hostelDelete}
            onHide={handleCloseDeleteHostel}
            centered
            backdrop="static"
            style={{
              width: 388,
              height: 250,
              marginLeft: "500px",
              marginTop: "200px",
            }}
          >
            <Modal.Header style={{ borderBottom: "none" }}>
              <Modal.Title
                style={{
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#222222",
                  flex: 1,
                }}
              >
                Delete HostelReading?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Gilroy",
                color: "#646464",
                textAlign: "center",
                marginTop: "-20px",
              }}
            >
              Are you sure you want to delete this HostelReading?
            </Modal.Body>

            <Modal.Footer
              style={{
                justifyContent: "center",
                borderTop: "none",
                marginTop: "-10px",
              }}
            >
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#fff",
                  color: "#1E45E1",
                  border: "1px solid #1E45E1",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  marginRight: 10,
                }}
                onClick={handleCloseDeleteHostel}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#1E45E1",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                }}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {isEditing && (
        <div
          className="mt-4 "
          style={{ paddingLeft: 25, height: "90vh", overflowY: "auto" , position:"relative"}}
        >
          <div
            className="d-flex align-items-center"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1000,
              backgroundColor: "#fff",
              padding: "12px 20px",
              height: "60px",
            }}
          >
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
                fontWeight: 600,
                fontSize: "18px",
                fontFamily: "Gilroy",
                paddingLeft: "10px",
              }}
            >
              {isAddMode ? "New Bill" : "Edit Bill"}
            </span>
          </div>

          <div className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
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
                Customer
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={customername}
                onChange={handleCustomerName}
                disabled
                className="border"
                style={{
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  lineHeight: "18.83px",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 38,
                  borderRadius: 8,
                  backgroundColor: "#E7F1FF",
                }}
              >
                <option value="">Select Customer</option>
                {state.UsersList?.Users &&
                  state.UsersList?.Users?.length > 0 &&
                  state?.UsersList?.Users?.filter(
                    (u) =>
                      u.Bed !== "undefined" &&
                      u.Bed !== "0" &&
                      typeof u.Bed === "string" &&
                      u.Bed.trim() !== "" &&
                      u.Rooms !== "undefined" &&
                      u.Rooms !== "0" &&
                      typeof u.Rooms === "string" &&
                      u.Rooms.trim() !== ""
                  ).map((u) => (
                    <option value={u.ID} key={u.ID}>
                      {u.Name}
                    </option>
                  ))}
              </Form.Select>
              {customererrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "3px",
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    }}
                  >
                    {customererrmsg !== " " && (
                      <MdError style={{ fontSize: "15px", color: "red" }} />
                    )}{" "}
                    {customererrmsg}
                  </p>
                </div>
              )}
            </Form.Group>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-12 col-xs-12">
            <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
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
                  padding: "10px",
                  fontSize: 16,
                  color: "#4B4B4B",
                  fontFamily: "Gilroy",
                  lineHeight: "18.83px",
                  fontWeight: 500,
                  backgroundColor: "#E7F1FF",
                }}
                type="text"
                placeholder="Enter invoice number"
                value={invoicenumber || ""}
                readOnly
              />
              {invoicenumbererrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "3px",
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    }}
                  >
                    {invoicenumbererrmsg !== " " && (
                      <MdError style={{ fontSize: "15px", color: "red" }} />
                    )}{" "}
                    {invoicenumbererrmsg}
                  </p>
                </div>
              )}
            </Form.Group>
          </div>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12 me-4">
              <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Invoice Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div
                  className="datepicker-wrapper"
                  style={{ position: "relative", width: "100%" }}
                >
                  <DatePicker
                    style={{ width: "100%", height: 48, cursor: "pointer" ,fontFamily: "Gilroy"}}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={invoicedate ? dayjs(invoicedate) : null}
                    onChange={(date) =>
                      handleInvoiceDate(date ? date.toDate() : null)
                    }
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                    dateFormat="dd/MM/yyyy"

                    popperPlacement="top-start"
                    popperClassName="custom-datepicker"
                    appendTo={document.body}
                    popperModifiers={[
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                      {
                        name: "flip",
                        options: {
                          fallbackPlacements: [],
                        },
                      },
                      {
                        name: "offset",
                        options: {
                          offset: [0, -13],
                        },
                      },
                    ]}
                    customInput={customInvoiceDateInput({
                      value: invoicedate
                        ? invoicedate.toLocaleDateString("en-GB")
                        : "",
                    })}
                  />
                </div>
              </Form.Group>

              {invoicedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "3px",
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    }}
                  >
                    {invoicedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
                        }}
                      />
                    )}{" "}
                    {invoicedateerrmsg}
                  </p>
                </div>
              )}
            </div>

            <div className="col-lg-3 col-md-3 col-sm-6 col-xs-12">
              <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Due Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div
                  className="datepicker-wrapper"
                  style={{ position: "relative", width: "100%" }}
                >
                  <DatePicker

                    style={{ width: "100%", height: 48, cursor: "pointer" ,fontFamily: "Gilroy"}}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={invoiceduedate ? dayjs(invoiceduedate) : null}
                    onChange={(date) =>
                      handleDueDate(date ? date.toDate() : null)
                    }
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                    dateFormat="dd/MM/yyyy"
                    popperPlacement="top-start"
                    popperClassName="custom-datepicker"
                    appendTo={document.body}
                    popperModifiers={[
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                      {
                        name: "flip",
                        options: {
                          fallbackPlacements: [],
                        },
                      },
                      {
                        name: "offset",
                        options: {
                          offset: [0, -13],
                        },
                      },
                    ]}
                    minDate={null}
                    customInput={customInvoiceDueDateInput({
                      value: invoiceduedate
                        ? invoiceduedate.toLocaleDateString("en-GB")
                        : "",
                    })}
                  />
                </div>
              </Form.Group>

              {invoiceduedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "red",
                      marginTop: "3px",
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                    }}
                  >
                    {invoiceduedateerrmsg !== " " && (
                      <MdError
                        style={{
                          fontSize: "15px",
                          color: "red",
                          marginRight: "3px",
                          marginBottom: "3px",
                        }}
                      />
                    )}{" "}
                    {invoiceduedateerrmsg}
                  </p>
                </div>
              )}
            </div>
          </div>

          {allfielderrmsg.trim() !== "" && (
            <div>
              <p
                style={{
                  fontSize: "12px",
                  color: "red",
                  marginTop: "10px",
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  fontWeight: 500,
                }}
              >
                {allfielderrmsg !== " " && (
                  <MdError
                    style={{
                      fontSize: "15px",
                      color: "red",
                      fontFamily: "Gilroy",
                      marginRight: "5px",
                      marginBottom: "3px",
                    }}
                  />
                )}{" "}
                {allfielderrmsg}
              </p>
            </div>
          )}


        {Array.isArray(newRows) && newRows.length > 0 && (
                   <div className="mt-1" style={{ width: "80%", borderRadius: "10px", border: "1px solid #DCDCDC" }}>
       
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
                                   value={u.amount}
                                   placeholder="Enter Amount"
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
       
       
       
       
       
       
                 )}
       


          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mt-2">
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
                height: 38,
                borderRadius: 8,
                cursor: "pointer",
              }}
              value={dropdownValue}
              onChange={(e) => handleRowTypeSelect(e.target.value)}
            >
              <option value="" disabled>
                Select Item Type
              </option>
              {!selectedTypes.includes("RoomRent") && (
                <option value="RoomRent">Room Rent</option>
              )}
              {!selectedTypes.includes("EB") && <option value="EB">EB</option>}
              <option value="Other">Other</option>
            </Form.Select>

            {tableErrmsg.trim() !== "" && (
              <div>
                <p
                  style={{
                    fontSize: "12px",
                    color: "red",
                    marginTop: "5px",
                    textAlign: "center",
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  {tableErrmsg !== " " && (
                    <MdError
                      style={{
                        fontSize: "15px",
                        color: "red",
                        marginRight: "3px",
                        marginBottom: "3px",
                      }}
                    />
                  )}{" "}
                  {tableErrmsg}
                </p>
              </div>
            )}
          </div>

   {state.createAccount?.networkError ?
            <div className='d-flex  align-items-center justify-content-center mt-4 mb-2'>
              <MdError style={{ color: "red", marginRight: '5px' }} />
              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
            </div>
            : null}




  {billLoading && <div
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
          <div style={{ float: "right", marginRight: "130px", fontFamily:"Gilroy" }}>
            {Array.isArray(newRows) && newRows.length > 0 && (
              <h5 >Total Amount ₹{totalAmount}</h5>
            )}
            <Button
              onClick={isAddMode ? handleCreateBill : handleEditBill}
              className="w-80 mt-3"
              style={{
                backgroundColor: "#1E45E1",
                fontWeight: 500,
                height: 40,
                borderRadius: 12,
                fontSize: 16,
                fontFamily: "Gilroy",
                fontStyle: "normal",
                lineHeight: "normal",
              }}
            >
              {isAddMode ? "CreateBill" : "SaveChanges"}
            </Button>

            <div className="mb-3"></div>
          </div>
        </div>
      )}

      {isDeleting && (
        <>
          <Modal
            show={isDeleting}
            onHide={handleDeleteBill}
            centered
            backdrop="static"
            style={{
              width: 388,
              height: 250,
              marginLeft: "500px",
              marginTop: "200px",
            }}
          >
            <Modal.Header style={{ borderBottom: "none" }}>
              <Modal.Title
                style={{
                  fontSize: "18px",
                  fontFamily: "Gilroy",
                  textAlign: "center",
                  fontWeight: 600,
                  color: "#222222",
                  flex: 1,
                }}
              >
                Delete Bill?
              </Modal.Title>
            </Modal.Header>

            <Modal.Body
              style={{
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "Gilroy",
                color: "#646464",
                textAlign: "center",
                marginTop: "-20px",
              }}
            >
              Are you sure you want to delete this Bill-details?
            </Modal.Body>

            <Modal.Footer
              style={{
                justifyContent: "center",
                borderTop: "none",
                marginTop: "-10px",
              }}
            >
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#fff",
                  color: "#1E45E1",
                  border: "1px solid #1E45E1",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                  marginRight: 10,
                }}
                onClick={handleDeleteBill}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: 160,
                  height: 52,
                  borderRadius: 8,
                  padding: "12px 20px",
                  background: "#1E45E1",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: "14px",
                }}
                onClick={handleDeleteBilling}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {(advanceForm || showMenu) && (
        <UserlistForm
          setShowMenu={setShowMenu}
          advanceForm={advanceForm}
          showMenu={showMenu}
          displayDetail={addBasicDetail}
          setAdvanceForm={setAdvanceForm}
          handleShow={handleShow}
          edit={edit}
          setEdit={setEdit}
          EditObj={EditObj}
          setEditObj={setEditObj}
          handleMenuClick={handleMenuClick}
          setShowForm={setShowForm}
          showForm={showForm}
          handleShowAddBed={handleShowAddBed}
          roomDetail={roomDetail}
          setRoomDetail={setRoomDetail}
          userList={userList}
          setUserList={setUserList}
          OnShowTable={OnShowTableForCustomer}
          uniqueostel_Id={uniqueostel_Id}
          setUniqostel_Id={setUniqostel_Id}
        />
      )}
    </div>
  );
}

UserList.propTypes = {
  id: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default UserList;

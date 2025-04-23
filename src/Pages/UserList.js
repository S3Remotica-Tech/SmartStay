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
import { ArrowLeft2, ArrowRight2,ArrowUp2, ArrowDown2, } from "iconsax-react";
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
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import Closebtn from "../Assets/Images/CloseCircle.png";
import Calendars from "../Assets/Images/New_images/calendar.png";
import PropTypes from "prop-types";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import Filters from "../Assets/Images/Filters.svg";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

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
  // const [currentItems, setCurrentItem] = useState([])
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
  const [startdate, setStartDate] = useState(null);
  const [enddate, setEndDate] = useState(null);
  const [invoicedate, setInvoiceDate] = useState(null);
  const [invoiceduedate, setInvoiceDueDate] = useState(null);
  const [customererrmsg, setCustomerErrmsg] = useState("");

  const [totalAmount, setTotalAmount] = useState("");
  const [newRows, setNewRows] = useState([]);
  const [invoicenumbererrmsg, setInvoicenumberErrmsg] = useState("");
  const [startdateerrmsg, setStartdateErrmsg] = useState("");
  const [enddateerrmsg, setEnddateErrmsg] = useState("");
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
  const [billsAddshow,setBillsAddShow] = useState(false)
  const [isAddMode, setIsAddMode] = useState(false);
   const [filterStatus, setFilterStatus] = useState(false);


  useEffect(() => {
    if (id && !billsAddshow) {
      dispatch({
        type: "MANUAL-INVOICE-NUMBER-GET",
        payload: { user_id: id},
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
  
    // Clear error messages
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
    setBillsAddShow(true)
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
      

      // setRooms(isreader.Room_Id)
      // setSelectedHostel(isreader.HostelName)

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
  // const handleNewRowChange = (index, field, value) => {
  //   setNewRows((prevRows) =>
  //     prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
  //   );
  //   setAllFieldErrmsg("");
  //   setTableErrmsg("")
  // };

  const handleNewRowChange = (index, field, value) => {
    setNewRows((prevRows) =>
      prevRows.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
    setAllFieldErrmsg("");
    setTableErrmsg("")
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
  

    // Reset error messages
    setCustomerErrmsg("");
    setInvoicenumberErrmsg("");
    setStartdateErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");

    // Validate Customer
    if (!customername) {
      setCustomerErrmsg("Customer is Required");
      isValid = false;
    }

    // Validate Invoice Number
    if (!invoicenumber) {
      setInvoicenumberErrmsg("Invoice Number is Required");
      isValid = false;
    }

    // Validate Start Date
    if (!startdate) {
      setStartdateErrmsg("Start Date is Required");
      isValid = false;
    }
    if (!enddate) {
      setEnddateErrmsg("End Date is Required");
      isValid = false;
    }

    // Validate Invoice Date
    if (!invoicedate) {
      setInvoiceDateErrmsg("Invoice Date is Required");
      isValid = false;
    }

    // Validate Due Date
    if (!invoiceduedate) {
      setInvoiceDueDateErrmsg("Due Date is Required");
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
  
    if (hasError) {
      return;
    }

    // Check All Required Fields
    if (
      !customername ||
      !invoicenumber ||
      !startdate ||
      !invoicedate ||
      !invoiceduedate ||
      !enddate
    ) {
      setAllFieldErrmsg("Please Fill Out All Required Fields");
      isValid = false;
    }

    const formatDateToStartdate = (startdate) => {
      if (!startdate) return "";
      const d = new Date(startdate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

    const formatDateTowenddate = (enddate) => {
      if (!enddate) return "";
      const d = new Date(enddate);
      return (
        d.getFullYear() +
        "-" +
        String(d.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(d.getDate()).padStart(2, "0")
      );
    };

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
      const startDateChanged =
        formatDateToStartdate(currentView.start_date) !==
        formatDateToStartdate(startdate);
      const invoiceChanged =
        String(currentView.Invoices) !== String(invoicenumber);
      const endDateChanged =
        formatDateTowenddate(currentView.end_date) !==
        formatDateTowenddate(enddate);
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
        startDateChanged ||
        invoiceChanged ||
        endDateChanged ||
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

      const startDateObject = new Date(startdate);
      const formattedStartDate = `${startDateObject.getFullYear()}-${String(
        startDateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(startDateObject.getDate()).padStart(
        2,
        "0"
      )}`;

      const endDateObject = new Date(enddate);
      const formattedEndDate = `${endDateObject.getFullYear()}-${String(
        endDateObject.getMonth() + 1
      ).padStart(2, "0")}-${String(endDateObject.getDate()).padStart(2, "0")}`;

      dispatch({
        type: "MANUAL-INVOICE-EDIT",
        payload: {
          user_id: customername,
          date: formattedDate,
          due_date: formatduedate,
          id: currentView.id,
          amenity: newRows,
          start_date: formattedStartDate,
          end_date: formattedEndDate,
        },
      });

      setIsEditing(false);
      setRoomDetail(true);
      setCustomerName("");
      setInvoiceNumber("");
      setStartDate("");
      setEndDate("");
      setInvoiceDate("");
      setInvoiceDueDate("");

      setTotalAmount("");
      setNewRows([]);

      setCustomerErrmsg("");
      setStartdateErrmsg("");
      setInvoiceDateErrmsg("");
      setInvoiceDueDateErrmsg("");
      setAllFieldErrmsg("");
    }
    dispatch({ type: "UPDATE_USERSLIST_TRUE" });
  };

  // const handleAddColumn = () => {
  //   const newRow = {
  //     am_name: "",
  //     used_unit: "",
  //     per_unit_amount: "",
  //     total_amount: "",
  //     amount: "",
  //   };
  //   setNewRows([...newRows, newRow]);
  //   setAllFieldErrmsg("");
  // };

  const handleCreateBill = () => {

      let hasError = false;
  
      // Check required fields and set error messages only if empty
      if (!customername) {
        setCustomerErrmsg("Please Select Customer");
        hasError = true;
      } else {
        setCustomerErrmsg(""); // Clear error when field is filled
      }
  
      if (!startdate) {
        setStartdateErrmsg("Please Select Start Date");
        hasError = true;
      } else {
        setStartdateErrmsg("");
      }
  
      if (!enddate) {
        setEnddateErrmsg("Please Select End Date");
        hasError = true;
      } else {
        setEnddateErrmsg("");
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
  
      // Check if any row in the table is incomplete
      // if (newRows.some((row) => !row.am_name || !row.amount)) {
       
      //   hasError = true;
      // } else {
      //   setTableErrmsg("");
      // }

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
  
      // Format dates
      const formattedStartDate = startdate ? dayjs(startdate).format("YYYY-MM-DD") : "";
  
      const formattedEndDate = enddate ? dayjs(enddate).format("YYYY-MM-DD") : "";
      dispatch({
        type: "MANUAL-INVOICE-ADD",
        payload: {
          user_id: customername,
          date: formatinvoicedate,
          due_date: formatduedate,
          // start_date: formattedStartDate,
          // end_date: formattedEndDate,
          start_date: formattedStartDate,
      end_date:formattedEndDate,
          invoice_id: invoicenumber,
          total_amount: totalAmount,
          amenity: amenityArray.length > 0 ? amenityArray : [],
        },
      });
  
      // Reset form fields
      setCustomerName("");
      setInvoiceNumber("");
      setStartDate("");
      setEndDate("");
      setInvoiceDate("");
      setInvoiceDueDate("");
      setTotalAmount("");
      // setBillAmounts([]);
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
    setStartDate("");
    setEndDate("");
    setTotalAmount("");
  };


  const handlestartDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setStartDate(date);

    if (!selectedDates) {
      setStartdateErrmsg("Please Select Date");
    } else {
      setStartdateErrmsg("");
      setEnddateErrmsg("");
    }
  };

  const handleEndDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setEndDate(date);
    if (!selectedDates) {
      setEnddateErrmsg("Please Select Date");
    } else {
      setEnddateErrmsg("");
      setStartdateErrmsg("");
    }
   
  };
   const formatDateForPayloadmanualinvoice = (date) => {
      return dayjs(date).format("YYYY-MM-DD"); // Change format if needed
    };

  const handleInvoiceDate = (selectedDates) => {
    setAllFieldErrmsg("");
    const date = selectedDates;
    setInvoiceDate(date);
    if (!selectedDates) {
      setInvoiceDateErrmsg("Please Select Date");
    } else {
      setInvoiceDateErrmsg("");
      setEnddateErrmsg("");
      setStartdateErrmsg("");
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

  // const handleDeleteNewRow = (index) => {
  //   setNewRows((prevRows) => {
  //     const updatedRows = prevRows.filter((_, i) => i !== index);
  //     return updatedRows;
  //   });

  //   setAllFieldErrmsg("");
  // };
  // const handleDeleteNewRow = (index) => {
  //   setNewRows((prevRows) => {
  //     const deletedRow = prevRows[index];
  //     const updatedRows = prevRows.filter((_, i) => i !== index);
  
  //     // Remove RoomRent or EB from selectedTypes if that row was deleted
  //     if (deletedRow.am_name === "Room Rent") {
  //       setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "RoomRent"));
  //     } else if (deletedRow.am_name === "EB") {
  //       setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "EB"));
  //     }
  
  //     return updatedRows;
  //   });
  
  //   setAllFieldErrmsg("");
  //   setTableErrmsg("");
  // };

  const handleDeleteNewRow = (index) => {
    setNewRows((prevRows) => {
      const deletedRow = prevRows[index];
      const updatedRows = prevRows.filter((_, i) => i !== index);
  
      const name = deletedRow.am_name?.toLowerCase().replace(/\s/g, "");
      if (name === "roomrent") {
        setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "RoomRent"));
      } else if (name === "eb") {
        setSelectedTypes((prevTypes) => prevTypes.filter((type) => type !== "EB"));
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
setDropdownValue("")
setSelectedTypes("")
    setRoomDetail(true);
    setCustomerName("");
    setInvoiceNumber("");
    setStartDate("");
    setEndDate("");
    setInvoiceDate("");
    setInvoiceDueDate("");

    setTotalAmount("");
    setCustomerErrmsg("");
    setStartdateErrmsg("");
    setInvoiceDateErrmsg("");
    setInvoiceDueDateErrmsg("");
    setAllFieldErrmsg("");
    setNewRows("")
    setTableErrmsg("")
    setEnddateErrmsg("")
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
        const parsedDate = new Date(currentView.Date); // Convert to Date object
        if (!isNaN(parsedDate.getTime())) {
          // Check if it's a valid date
          setInvoiceDate(parsedDate); // Set the date object in state
        } 
       
      }
      if (currentView.start_date) {
        const parsedDate = new Date(currentView.start_date); // Convert to Date object
        if (!isNaN(parsedDate.getTime())) {
          // Check if it's a valid date
          setStartDate(parsedDate); // Set the date object in state
        } 
       
      }
      if (currentView.end_date) {
        const parsedDate = new Date(currentView.end_date); // Convert to Date object
        if (!isNaN(parsedDate.getTime())) {
          // Check if it's a valid date
          setEndDate(parsedDate); // Set the date object in state
        } 
      
      }

      setTotalAmount(currentView.Amount);

      // setNewRows(currentView.amenity);
      // if (currentView.amenity && Array.isArray(currentView.amenity)) {
      //   setNewRows(currentView.amenity);
      
      //   const types = [];
      //   currentView.amenity.forEach((item) => {
      //     if (item.am_name === "Room Rent") types.push("RoomRent");
      //     if (item.am_name === "EB") types.push("EB");
      //   });
      
      //   setSelectedTypes(types);
      // }
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

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  //  useEffect(() => {
  //     if (uniqueostel_Id && Floor) {
  //       dispatch({
  //         type: "ROOMDETAILS",
  //         payload: { hostel_Id: uniqueostel_Id, floor_Id: Floor },
  //       });
  //     }
  //   }, [Floor]);

  const [userListDetail, setUserListDetail] = useState("");
 

  useEffect(() => {
    if (state.UsersList?.UserListStatusCode === 200) {
      setLoading(false);
      setUserListDetail(state.UsersList.Users);
      // setFilteredUsers(state.UsersList.Users);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);
    }
  }, [state.UsersList?.UserListStatusCode]);
  useEffect(() => {
    if (state.UsersList.userRoomfor) {
      // setIsEditing(true);
      // props.setRoomDetail(false)
      setIsEditing(true);
      setRoomDetail(false);

      dispatch({ type: "USERROOMAVAILABLEFALSE" });
    }
  }, [state.UsersList.userRoomfor]);

  useEffect(() => {
    if (!isEditing) {
      // Update UsersList component state to true when isEditing is false
      dispatch({ type: "UPDATE_USERSLIST_TRUE" });
    }
  }, [isEditing]);

  useEffect(() => {
    if (state.UsersList.userProfilebill) {
      // setIsEditing(true);
      // props.setRoomDetail(false)
      setIsDeleting(true);
      setRoomDetail(true);
      dispatch({ type: "USERPROFILEBILLFALSE" });
    }
  }, [state.UsersList.userProfilebill]);
  // useEffect(() => {
  //   if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
  //     dispatch({
  //       type: "MANUALINVOICESLIST",
  //       payload: { hostel_id: uniqueostel_Id },
  //     });
  //     setLoading(false);
  //     setIsEditing(false)

  //     setTimeout(() => {
  //       dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
  //       setLoading(false);

  //     }, 1000);
  //   }
  // }, [
  //   state.InvoiceList.manualInvoiceEditStatusCode,
  //   state.InvoiceList.ManualInvoices,
  // ]);

  useEffect(() => {
    if (state.InvoiceList.manualInvoiceEditStatusCode === 200) {
      // dispatch({
      //   type: "MANUALINVOICESLIST",
      //   payload: { hostel_id: uniqueostel_Id },
      // });
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: id } });

      setLoading(false);
      setIsEditing(false);

      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_MANUAL_INVOICE_EDIT" });
      }, 1000);
    }
  }, [state.InvoiceList.manualInvoiceEditStatusCode]);

  useEffect(() => {
      if (state.InvoiceList.manualInvoiceAddStatusCode === 200) {
        handleBackBill()
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
        // setLoading(false);
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
    // setEditId("")
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
    // setLoading(true)
    dispatch({
      type: "WALKINCUSTOMERLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList?.getWalkInStatusCode === 200) {
      // setLoading(false)
      setWalkingCustomer(state.UsersList.WalkInCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.getWalkInStatusCode]);

  useEffect(() => {
    if (state.UsersList?.NoDataWalkInCustomerStatusCode === 201) {
      setWalkingCustomer([]);
      // setLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_WALK_IN_CUSTOMER_LIST_STATUS_CODE" });
      }, 200);
    }
  }, [state.UsersList?.NoDataWalkInCustomerStatusCode]);

  useEffect(() => {
    // setLoading(true)
    dispatch({
      type: "CHECKOUTCUSTOMERLIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state.UsersList.GetCheckOutCustomerStatusCode === 200) {
      // setLoading(false)
      setCheckOutCustomer(state.UsersList.CheckOutCustomerList);
      setTimeout(() => {
        dispatch({ type: "CLEAR_CHECKOUT_CUSTOMER_LIST" });
      }, 2000);
    }
  }, [state.UsersList.GetCheckOutCustomerStatusCode]);

  const [customerBooking, setCustomerBooking] = useState("");

  useEffect(() => {
    dispatch({
      type: "GET_BOOKING_LIST",
      payload: { hostel_id: state.login.selectedHostel_Id },
    });
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
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    } else if (value === "2") {
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
  }, [value]);

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
            const fullName = `${item.first_name || ""} ${
              item.last_name || ""
            }`.toLowerCase();
            return fullName.includes(filterInput.toLowerCase());
          })
        : []; // Return empty array if not an array

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
    const searchValue = e.target.value.toLowerCase().trim(); // Trim spaces
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
      setCurrentPage(1); // Reset to first page
    } else {
      setFilteredUsers(filteredUsers); // Reset when input is cleared
      setDropdownVisible(false);
    }
  };

  // const handlefilterInput = (e) => {
  //   setFilterInput(e.target.value);
  //   setDropdownVisible(e.target.value?.length > 0);
  // };
  const handleUserSelect = (user) => {
    if (value === "1") {
      setFilterInput(user?.Name || "");
    } else if (value === "2") {
      setFilterInput(
        [user?.first_name, user?.last_name].filter(Boolean).join(" ")
      ); // Ensures last name is optional
    } else if (value === "3") {
      setFilterInput(user?.Name || "");
    } else if (value === "4") {
      setFilterInput(user?.first_name || "");
    }

    setFilteredUsers([]);
    setDropdownVisible(false);
  };

  // const handleUserSelect = (user) => {
  //   if (value === "1") {
  //     setFilterInput(user.Name);
  //   } else if (value === "2") {
  //     setFilterInput(user.first_name);
  //   }

  //   setFilteredUsers([]);
  //   setDropdownVisible(false);
  // };

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
  const currentItems =
    filterInput.length > 0
      ? filteredUsers
      : userListDetail?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(
    (search ? filteredUsers?.length : userListDetail?.length) / itemsPerPage
  );
   const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
    
      const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return currentItems;
    
        const sorted = [...currentItems].sort((a, b) => {
          const valueA = a[sortConfig.key];
          const valueB = b[sortConfig.key];
    
    
          if (!isNaN(valueA) && !isNaN(valueB)) {
            return sortConfig.direction === 'asc'
              ? valueA - valueB
              : valueB - valueA;
          }
    
          if (typeof valueA === 'string' && typeof valueB === 'string') {
            return sortConfig.direction === 'asc'
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
          toast.error('Please add a hostel before adding customer information.', {
            hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
          });
          return;
        }
    handleMenuClick();
    setShowMenu(true);
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
    setFilterStatus("")
  };

  useEffect(() => {
    if (state.UsersList?.NoUserListStatusCode === 201) {
      setUserDetails([]);
      setFilteredUsers([]);
      // setLoading(false)
      setTimeout(() => {
        dispatch({ type: "CLEAR_NO_USER_LIST" });
      }, 2000);
    }
  }, [state.UsersList?.NoUserListStatusCode]);

  const [roomDetail, setRoomDetail] = useState(false);
  const [userList, setUserList] = useState(true);
  
  const [hostelName, sethosName] = useState("");
  const [customerUser_Id, setcustomerUser_Id] = useState("");
  

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
    setAddBasicDetail(false);
    setEditObj(u);;
  };

  
 
 

  const [hostelIds, setHostelIds] = useState("");

  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const users = Array.isArray(userListDetail) ? userListDetail : [];

    // Filter Particular User Details
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
  }, [
    state.UsersList?.statusCodeForAddUser,
    
  ]);
  
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
  const [bookingDateRange, setBookingDateRange] = useState([]);
  const [checkoutDateRange,setCheckoutDateRange] = useState([])
  const [walkinDateRange,setWalkinDateRange] = useState([])
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
      return itemDate.isSameOrAfter(start, 'day') && itemDate.isSameOrBefore(end, 'day');
    });
  
    setFilteredUsers(filtered);
    setFilterStatus(true);
    setResetPage(true)
  };
    const [statusFilterCheckout, setStatusFilterCheckout] = useState("");
 
    const handleStatusFilterCheckout = (event) => {
      const searchTerm = event.target.value;
      setStatusFilterCheckout(searchTerm);
    
      // Clear previously selected date range when switching away from "Date"
      if (searchTerm !== "date") {
        setCheckoutDateRange(null);  // This will also hide the picker in UI
      }
    
      if (searchTerm === "All") {
        setFilteredUsers(checkOutCustomer);
        setFilterStatus(true);
      } else if (searchTerm === "0" || searchTerm === "1") {
        const filtered = checkOutCustomer?.filter(item => item.isActive?.toString() === searchTerm);
        setFilteredUsers(filtered);
        setFilterStatus(true);
      } else if (searchTerm === "date") {
        setFilterStatus(true); 
      }
    };
    
  
  
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
        return itemDate.isSameOrAfter(start, 'day') && itemDate.isSameOrBefore(end, 'day');
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
      return itemDate.isSameOrAfter(start, 'day') && itemDate.isSameOrBefore(end, 'day');
    });
  
    setFilteredUsers(filtered);
    setFilterStatus(true);
    setResetPage(true)
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
          toast.error('Please add a hostel before adding booking information.', {
            hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
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
          toast.error('Please add a hostel before adding checkout information.', {
            hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
          });
          return;
        }
    setcheckoutForm(!checkoutForm);
  };
  const checkoutcloseModal = () => {
    setcheckoutForm(false);
  };
  // walkin from

  const [walkInForm, setWalkinForm] = useState(false);
  const walkinForm = () => {
      if (!state.login.selectedHostel_Id) {
          toast.error('Please add a hostel before adding walking information.', {
            hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
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

  const [isDownloadTriggered, setIsDownloadTriggered] = useState(false); // To control downloads

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

      // Reset states after download
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

      // Reset states after download
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

      // Reset states after download
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

  const customStartDateInput = (props) => {
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

  const customEndDateInput = (props) => {
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
          // disabled={edit}
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
    whiteSpace: "nowrap"
  };
  

  return (
    // <div style={{ padding: 10, marginLeft: 20 }}>
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
          <div className="d-flex justify-content-between align-items-center flex-wrap" style={{marginTop:14}}> 
  <div className="d-flex justify-content-lg-start justify-content-center align-items-center flex-wrap ms-lg-4">
    <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy", marginTop:-15 }}>
      Customers
    </label>
  </div>

  <div className="d-flex flex-wrap align-items-center gap-2">
    {/* Search Box */}
    {search ? (
        <div style={{ position: "relative", width: isSmallScreen && search ? '150px' : '240px', }} className="search-box">
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
              style={{ boxShadow: "none", borderRight: "none", }}
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

          {/* Dropdown */}
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
                  minHeight: filteredUsers?.length > 1 ? "100px" : "auto",
                  overflowY: filteredUsers?.length > 3 ? "auto" : "hidden",
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
                      borderBottom: index !== filteredUsers.length - 1 ? "1px solid #eee" : "none",
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
                    <div className="text-truncate" style={{ maxWidth: "100%" }}>
                      <span style={{ fontSize: "14px", wordBreak: "break-word" }}>
                        {value === "1"
                          ? user.Name
                          : value === "2"
                          ? [user?.first_name, user?.last_name].filter(Boolean).join(" ")
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
      {(value === "2" || value === "3" || value === "4") && (
                  <div >
                    <Image
                      src={Filters}
                      roundedCircle
                      style={{ height: "50px", width: "50px", cursor: "pointer" }}
                      onClick={handleFilterd}
                    />
                  </div>
                )}

    {value === "2" && filterStatus && (
      <div style={{ width: 240 }}>
        <RangePicker
          value={bookingDateRange}
          onChange={handleDateRangeChangeBooking}
          format="DD/MM/YYYY"
          style={{ width: "100%",cursor:"pointer" }}
        />
      </div>
    )}

{value === "3" && filterStatus && (
                        <div
                          className="me-3"
                          style={{
                            border: "1px solid #D4D4D4",
                            borderRadius: 8,
                            width: search ? "120px" : "120px",
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
          format="YYYY-MM-DD"
          onChange={handleDateRangeChangeCheckout}
          style={{ height: "38px", borderRadius: 8,cursor:"pointer" }}
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
          style={{ width: "100%",cursor:"pointer" }}
        />
      </div>
    )}

    {/* Excel Buttons */}
    <div style={{marginTop:1}}>
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

    {/* Action Buttons */}
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
            className="pl-4"
            style={{
              paddingLeft: "7px",
              fontFamily: "Gilroy",
              fontSize: 16,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            <TabContext value={value}>
              <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                <TabList
                  orientation={isSmallScreen ? "vertical" : "horizontal"}
                  // value={value}
                  onChange={handleChange}
                  // indicatorColor="primary"
                  // textColor=""
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
                {customerpermissionError && customerpermissionError ? (
                  <>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        // height: "100vh",
                      }}
                    >
                      {/* Image */}
                      <img
                        src={Emptystate}
                        alt="Empty State"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />

                      {/* Permission Error */}
                      {customerpermissionError && (
                        <div
                          style={{
                            color: "red",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            marginTop: "1rem",
                          }}
                        >
                          <MdError size={20} />
                          <span>{customerpermissionError}</span>
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                 
                    <>
                     {sortedData && sortedData.length > 0 && (
                       <div
                       className=" booking-table-userlist  booking-table"
                       style={{ paddingBottom: "20px",marginLeft:"-22px" }}
                     >
                        <div
                         
                          className='show-scrolls'
                          style={{
                           
                            height: sortedData?.length >= 5 || sortedData?.length >= 5 ? "350px" : "auto",
                            overflow: "auto",
                            borderTop: "1px solid #E8E8E8",
                            marginBottom: 20,
                            marginTop: "20px",
                            paddingRight:0,
                            paddingLeft:0
                            //  borderBottom:"1px solid #DCDCDC"
                          }}
                        >
                          <Table
                            responsive="md"
                            // className="Table_Design"
                            style={{
                              fontFamily: "Gilroy", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                              top: 0,
                              zIndex: 1,
                              borderRadius:0
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
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    // borderTopLeftRadius: 24,
                                    paddingLeft: "20px",
                                   
                                  }}
                                >
                                 <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'asc')} style={{ cursor: "pointer" }} />
                                                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Name", 'desc')} style={{ cursor: "pointer" }} />
                                                                           </div>
                                                                            Name</div>
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    whiteSpace:"nowrap"
                                  }}
                                >
                                  <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                             <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("HostelName", 'asc')} style={{ cursor: "pointer" }} />
                                                                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("HostelName", 'desc')} style={{ cursor: "pointer" }} />
                                                                            </div>
                                                                             Paying Guest</div>
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    whiteSpace:"nowrap"
                                  }}
                                >
                                 <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Email", 'asc')} style={{ cursor: "pointer" }} />
                                                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Email", 'desc')} style={{ cursor: "pointer" }} />
                                                                           </div>
                                                                            Email ID</div>
                                </th>
                                <th
                                  style={{
                                    textAlign: "start",
                                    padding: "10px",
                                    color: "#939393",
                                    fontSize: "12px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    whiteSpace:"nowrap"
                                  }}
                                >
                                 <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Phone", 'asc')} style={{ cursor: "pointer" }} />
                                                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Phone", 'desc')} style={{ cursor: "pointer" }} />
                                                                           </div>
                                                                            Mobile No</div>
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
                                <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Rooms", 'asc')} style={{ cursor: "pointer" }} />
                                                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Rooms", 'desc')} style={{ cursor: "pointer" }} />
                                                                           </div>
                                                                            Room</div>
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
                                 <div className='d-flex gap-1 align-items-center justify-content-start'>
                                                                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                                                                             <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Bed", 'asc')} style={{ cursor: "pointer" }} />
                                                                             <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("Bed", 'desc')} style={{ cursor: "pointer" }} />
                                                                           </div>
                                                                            Bed</div>
                                </th>
                                <th
                                  style={{
                                    textAlign: "center",
                                    fontFamily: "Gilroy",
                                    color: "rgba(34, 34, 34, 1)",
                                    fontSize: 12,
                                    fontWeight: 500,
                                    // borderTopRightRadius: 24,
                                  }}
                                >
                                  Action
                                  {/* <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
          <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
        </div> */}
                                </th>
                              </tr>
                            </thead>
                            <tbody style={{ textAlign: "center" }}>
                            {   sortedData && sortedData.length > 0 && (
                              <>
                              {
                                
                                sortedData.map((user) => {
                                  return (
                                    <tr
                                      key={user.ID}
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: 600,
                                        textAlign: "center",
                                        // marginTop: 10,
                                      }}
                                    >
                                      {/* <td
                                          style={{
                                            padding: "10px",
                                            border: "none",
                                          }}
                                        >
                                          <img
                                            src={squre}
                                            height={20}
                                            width={20}
                                            style={{ marginTop: 10 }}
                                          />
                                        </td> */}
                                      <td
                                        style={{
                                          border: "none",
                                          padding: "10px",
                                          textAlign: "start",
                                          paddingLeft: "20px",
                                          verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                                        }}
                                      >
                                       
                                        <span
                                          className="Customer_Name_Hover"
                                          style={{
                                            fontSize: "13px",
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            color: "#1E45E1",
                                            cursor: "pointer",
                                            marginTop: 10,
                                          }}
                                          onClick={() =>
                                            handleRoomDetailsPage(user)
                                          }
                                        >
                                          {user.Name}
                                        </span>
                                      </td>

                                      <td
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,
                                          verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                                        }}
                                      >
                                        <span
                                          style={{
                                            paddingTop: "3px",
                                            paddingLeft: "10px",
                                            paddingRight: "10px",
                                            paddingBottom: "3px",
                                            borderRadius: "60px",
                                            backgroundColor: "#FFEFCF",
                                            textAlign: "start",
                                            fontSize: "11px",
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                          }}
                                        >
                                          {user.HostelName}
                                        </span>
                                      </td>
                                      <td
                                        style={{
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          paddingTop: 15,
                                          verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                                        }}
                                      >
                                        {user.Email}
                                      </td>
                                      <td
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,
                                          whiteSpace: "nowrap",
                                          verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                                        }}
                                      >
                                        +
                                        {user &&
                                          String(user.Phone)?.slice(
                                            0,
                                            String(user.Phone).length - 10
                                          )}{" "}
                                        {user && String(user.Phone)?.slice(-10)}
                                      </td>

                                      <td
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                                        }}
                                      >
                                        {" "}
                                        {!user.Rooms ? "-" : user.Rooms}
                                      </td>

                                      <td
                                        // className={user.Bed === 0 ? 'assign-bed' : ''}
                                        // onClick={user.Bed === 0 ? () => handleShowAddBed(user) : null}
                                        style={{
                                          paddingTop: 15,
                                          border: "none",
                                          cursor: "pointer",
                                          textAlign: "start",
                                          fontSize: "13px",
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          marginTop: 10,
                                          verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                                        }}
                                      >
                                        {!user.Bed ? "-" : user.Bed}
                                      </td>
                                      <td
                                        style={{
                                          paddingTop: 12,
                                          border: "none",borderBottom: "1px solid #E8E8E8"
                                        }}
                                      >
                                        {/* <MoreCircle  variant="Outline"  size="40" color="#dcdcdc" style={{transform:"rotate(90deg)"}}/>  */}

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
                                            // zIndex:
                                            //   activeRow === user.ID
                                            //     ? 1000
                                            //     : "auto",
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
                                                top: popupPosition.top -25,
                                                left: popupPosition.left,
                                                // right: 70,

                                                width: "163px",
                                                backgroundColor: "#F9F9F9",
                                                border: "1px solid #EBEBEB",
                                                borderRadius: "10px",
                                                zIndex: 1000,
                                                padding: "10px",
                                                display: "flex",
                                                justifyContent: "start",
                                                alignItems: "center",
                                              }}
                                            >
                                              <div
                                                style={{
                                                  // backgroundColor: "#fff",
                                                }}
                                                className=""
                                              >
                                                {!user.Bed && (
                                                  <div
                                                    className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                    onClick={() => {
                                                      if (
                                                        !customerAddPermission
                                                      ) {
                                                        handleShowAddBed(user);
                                                      }
                                                    }}
                                                    style={{
                                                      // backgroundColor: "#fff",
                                                      cursor:
                                                        customerAddPermission
                                                          ? "not-allowed"
                                                          : "pointer",
                                                      opacity:
                                                        customerAddPermission
                                                          ? 0.6
                                                          : 1,
                                                    }}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      alt="addcircle"
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                        filter:
                                                          customerAddPermission
                                                            ? "grayscale(100%)"
                                                            : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily:
                                                          "Gilroy, sans-serif",
                                                        color:
                                                          customerAddPermission
                                                            ? "#888888"
                                                            : "#222222",
                                                        cursor:
                                                          customerAddPermission
                                                            ? "not-allowed"
                                                            : "pointer",
                                                      }}
                                                    >
                                                      Assign Bed
                                                    </label>
                                                  </div>
                                                )}

                                                {user.Bed && (
                                                  <div
                                                    className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                    // onClick={() => {
                                                    //   if (!customerAddPermission) {
                                                    //     handleShowAddBed(user);
                                                    //   }
                                                    // }}
                                                    onClick={() =>
                                                      handleCustomerCheckout(
                                                        user
                                                      )
                                                    }
                                                    style={{
                                                      backgroundColor: "#F9F9F9",
                                                      cursor:
                                                        customerAddPermission
                                                          ? "not-allowed"
                                                          : "pointer",
                                                      opacity:
                                                        customerAddPermission
                                                          ? 0.6
                                                          : 1,
                                                    }}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      alt="addcircle"
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                        filter:
                                                          customerAddPermission
                                                            ? "grayscale(100%)"
                                                            : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily:
                                                          "Gilroy, sans-serif",
                                                        color:
                                                          customerAddPermission
                                                            ? "#888888"
                                                            : "#222222",
                                                        cursor:
                                                          customerAddPermission
                                                            ? "not-allowed"
                                                            : "pointer",
                                                      }}
                                                    >
                                                      Check-Out
                                                    </label>
                                                  </div>
                                                )}
                                                {user.Bed && (
                                                  <div
                                                    className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                    // onClick={() => {
                                                    //   if (!customerAddPermission) {
                                                    //     handleShowAddBed(user);
                                                    //   }
                                                    // }}
                                                    onClick={() =>
                                                      handleCustomerReAssign(
                                                        user
                                                      )
                                                    }
                                                    style={{
                                                      backgroundColor: "#F9F9F9",
                                                      cursor:
                                                        customerAddPermission
                                                          ? "not-allowed"
                                                          : "pointer",
                                                      opacity:
                                                        customerAddPermission
                                                          ? 0.6
                                                          : 1,
                                                    }}
                                                  >
                                                    <img
                                                      src={addcircle}
                                                      alt="addcircle"
                                                      style={{
                                                        height: 16,
                                                        width: 16,
                                                        filter:
                                                          customerAddPermission
                                                            ? "grayscale(100%)"
                                                            : "none",
                                                      }}
                                                    />
                                                    <label
                                                      style={{
                                                        fontSize: 14,
                                                        fontWeight: 500,
                                                        fontFamily:
                                                          "Gilroy, sans-serif",
                                                        color:
                                                          customerAddPermission
                                                            ? "#888888"
                                                            : "#222222",
                                                        cursor:
                                                          customerAddPermission
                                                            ? "not-allowed"
                                                            : "pointer",
                                                      }}
                                                    >
                                                      Re Assign
                                                    </label>
                                                  </div>
                                                )}

                                                <div
                                                  className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                  style={{
                                                    backgroundColor: "#F9F9F9",
                                                    cursor:
                                                      customerEditPermission
                                                        ? "not-allowed"
                                                        : "pointer",
                                                    opacity:
                                                      customerEditPermission
                                                        ? 0.6
                                                        : 1,
                                                  }}
                                                  onClick={() => {
                                                    if (
                                                      !customerEditPermission
                                                    ) {
                                                      handleRoomDetailsPage(
                                                        user
                                                      );
                                                    }
                                                  }}
                                                >
                                                  <img
                                                    src={Edit}
                                                    alt="edit"
                                                    style={{
                                                      height: 16,
                                                      width: 16,
                                                      filter:
                                                        customerEditPermission
                                                          ? "grayscale(100%)"
                                                          : "none",
                                                    }}
                                                  />
                                                  <label
                                                    style={{
                                                      fontSize: 14,
                                                      fontWeight: 500,
                                                      fontFamily:
                                                        "Gilroy, sans-serif",
                                                      color:
                                                        customerEditPermission
                                                          ? "#888888"
                                                          : "#222222",
                                                      cursor:
                                                        customerEditPermission
                                                          ? "not-allowed"
                                                          : "pointer",
                                                    }}
                                                  >
                                                    Edit
                                                  </label>
                                                </div>

                                                {/* <div className='mb-3 d-flex justify-content-start align-items-center gap-2'
                                onClick={() => { handleShowform(props) }}
                                style={{ backgroundColor: "#fff" }}
                            >
                                <img src={Assign} style={{ height: 16, width: 16 }} /> <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy,sans-serif", color: "#222222", cursor: 'pointer' }} >Record Payment</label>

                            </div> */}

                                                <div
                                                  className={
                                                    "mb-2 d-flex justify-content-start align-items-center gap-2"
                                                  }
                                                  style={{
                                                    backgroundColor: "#F9F9F9",
                                                    cursor:
                                                      customerDeletePermission
                                                        ? "not-allowed"
                                                        : "pointer",
                                                    opacity:
                                                      customerDeletePermission
                                                        ? 0.6
                                                        : 1,
                                                  }}
                                                  onClick={() =>
                                                    !customerDeletePermission
                                                      ? handleDeleteShow(user)
                                                      : null
                                                  }
                                                >
                                                  <img
                                                    src={Delete}
                                                    style={{
                                                      height: 16,
                                                      width: 16,
                                                    }}
                                                    alt="Delete Icon"
                                                  />{" "}
                                                  <label
                                                    style={{
                                                      fontSize: 14,
                                                      fontWeight: 500,
                                                      fontFamily:
                                                        "Gilroy, sans-serif",
                                                      cursor: "pointer",
                                                      color:
                                                        customerDeletePermission
                                                          ? "#888888"
                                                          : "#FF0000",
                                                    }}
                                                  >
                                                    Delete
                                                  </label>
                                                </div>
                                              </div>
                                            </div>
                                          )}
                                        </div>

                                        {/* <img src={dottt} style={{ height: 40, width: 40 }} /> */}
                                      </td>
                                    </tr>
                                  );
                                })
                              }
                            
                              </>
                            )}
                            </tbody>
                          </Table>
                        </div>
                        </div>
                      )}
                  
                  </>
                )}

                {!loading && userListDetail && userListDetail?.length === 0 && (
                  <div style={{ marginTop: 30 }}>
                    <div style={{ textAlign: "center" }}>
                      <img src={Emptystate} alt="emptystate" />
                    </div>
                    <div
                      className="pb-1"
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: 20,
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
                        fontSize: 16,
                        color: "rgba(75, 75, 75, 1)",
                      }}
                    >
                      There are no Customer added.
                    </div>
                  </div>
                )}

                {
                  (search ? filteredUsers?.length : userListDetail?.length) >=
                    5 && (
                    // <nav
                    //   style={{
                    //     display: "flex",
                    //     alignItems: "center",
                    //     justifyContent: "end",
                    //     padding: "10px",
                    //     position: "fixed",
                    //     bottom: "10px",
                    //     right: "10px",
                    //     boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", 
                    //     borderRadius: "5px", 
                    //   }}
                    // >
                 
                    //   {/* Dropdown for Items Per Page */}
                    //   <div>
                    //     <select
                    //       value={itemsPerPage}
                    //       onChange={handleItemsPerPageChange}
                    //       style={{
                    //         padding: "5px",
                    //         border: "1px solid #1E45E1",
                    //         borderRadius: "5px",
                    //         color: "#1E45E1",
                    //         fontWeight: "bold",
                    //         cursor: "pointer",
                    //         outline: "none",
                    //         boxShadow: "none",
                    //       }}
                    //     >
                    //       <option value={5}>5</option>
                    //       <option value={10}>10</option>
                    //       <option value={50}>50</option>
                    //       <option value={100}>100</option>
                    //     </select>
                    //   </div>

                    //   {/* Pagination Controls */}
                    //   <ul
                    //     style={{
                    //       display: "flex",
                    //       alignItems: "center",
                    //       listStyleType: "none",
                    //       margin: 0,
                    //       padding: 0,
                    //     }}
                    //   >
                    //     {/* Previous Button */}
                    //     <li style={{ margin: "0 10px" }}>
                    //       <button
                    //         style={{
                    //           padding: "5px",
                    //           textDecoration: "none",
                    //           color: currentPage === 1 ? "#ccc" : "#1E45E1",
                    //           cursor:
                    //             currentPage === 1 ? "not-allowed" : "pointer",
                    //           borderRadius: "50%",
                    //           display: "inline-block",
                    //           minWidth: "30px",
                    //           textAlign: "center",
                    //           backgroundColor: "transparent",
                    //           border: "none",
                    //         }}
                    //         onClick={() => handlePageChange(currentPage - 1)}
                    //         disabled={currentPage === 1}
                    //       >
                    //         <ArrowLeft2
                    //           size="16"
                    //           color={currentPage === 1 ? "#ccc" : "#1E45E1"}
                    //         />
                    //       </button>
                    //     </li>

                    //     {/* Current Page Indicator */}
                    //     <li
                    //       style={{
                    //         margin: "0 10px",
                    //         fontSize: "14px",
                    //         fontWeight: "bold",
                    //       }}
                    //     >
                    //       {currentPage} of {totalPages}
                    //     </li>

                    //     {/* Next Button */}
                    //     <li style={{ margin: "0 10px" }}>
                    //       <button
                    //         style={{
                    //           padding: "5px",
                    //           textDecoration: "none",
                    //           color:
                    //             currentPage === totalPages ? "#ccc" : "#1E45E1",
                    //           cursor:
                    //             currentPage === totalPages
                    //               ? "not-allowed"
                    //               : "pointer",
                    //           borderRadius: "50%",
                    //           display: "inline-block",
                    //           minWidth: "30px",
                    //           textAlign: "center",
                    //           backgroundColor: "transparent",
                    //           border: "none",
                    //         }}
                    //         onClick={() => handlePageChange(currentPage + 1)}
                    //         disabled={currentPage === totalPages}
                    //       >
                    //         <ArrowRight2
                    //           size="16"
                    //           color={
                    //             currentPage === totalPages ? "#ccc" : "#1E45E1"
                    //           }
                    //         />
                    //       </button>
                    //     </li>
                    //   </ul>
                    // </nav>
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
                                        {/* Dropdown for Items Per Page */}
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
                    
                                        {/* Pagination Controls */}
                                        <ul
                                          style={{
                                            display: "flex",
                                            alignItems: "center",
                                            listStyleType: "none",
                                            margin: 0,
                                            padding: 0,
                                          }}
                                        >
                                          {/* Previous Button */}
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
                    
                                          {/* Current Page Indicator */}
                                          <li
                                            style={{
                                              margin: "0 10px",
                                              fontSize: "14px",
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {currentPage} of {totalPages}
                                          </li>
                    
                                          {/* Next Button */}
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

                  // )
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
                  filterStatus = {filterStatus}
                  bookingDateRange = {bookingDateRange}
                  resetPage = {resetPage}
                  setResetPage ={setResetPage}
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
                  // loader={loading}
                  search={search}
                  checkoutDateRange={checkoutDateRange}
                  filterStatus = {filterStatus}
                  resetPage = {resetPage}
                  setResetPage ={setResetPage}
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
                  walkinDateRange = {walkinDateRange}
                  filterStatus = {filterStatus}
                  resetPage = {resetPage}
                  setResetPage ={setResetPage}
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
          // handleEdit={handleEdit}
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
          // selectAmneties={selectAmneties}
          // handleselect={handleselect}
          hostelName={hostelName}
          // createby={createby}
          // statusShow={statusShow}
          customerUser_Id={customerUser_Id}
          hostelIds={hostelIds}
          // statusAmni={statusAmni}
          // handleStatusAmnities={handleStatusAmnities}
          // handleAddUserAmnities={handleAddUserAmnities}
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
                    // disabled={
                    //   // unitAmount &&
                    //   // unitAmount?.length === 0 &&
                    //   selectedHostel != ""
                    // }
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
                    // disabled={
                    //   // unitAmount &&
                    //   // unitAmount?.length === 0 &&
                    //   selectedHostel != ""
                    // }
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
                      style={{cursor:"pointer"}}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={null}
                        // disabled={edit}
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
                // onClick={handleSaveChanges}
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
            {/* <Modal.Header closeButton className="text-center">
            <Modal.Title style={{ fontSize: 18,fontFamily:"Gilroy",fontWeight:600 }} className="text-center">
              Add a Reading
            </Modal.Title>
          </Modal.Header> */}

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
                      //   onChange={(e) => handleReadingChange(e)}
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

                  {/* {readingError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {readingError}
                  </div>
                )} */}
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
                  {/* {readingError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {readingError}
                </div>
              )} */}
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
                      style={{cursor:"pointer"}}
                        selected={selectedDate}
                        onChange={handleDateChange}
                        dateFormat="dd/MM/yyyy"
                        minDate={null}
                        // disabled={edit}
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
                // onClick={handleSaveEb}
                // disabled={!!formError}
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
                // onClick={handleDeleteRoom}
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
                // onClick={handleDeletehostel}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {isEditing && (
        <div className="mt-4" style={{ paddingLeft: 25 }}>
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
              padding: "10px 20px",
            }}
          >
            <div style={{ position: "fixed", marginLeft: "-20px" }}>
              <svg
                onClick={handleBackBill}
                style={{ fontSize: "22px" }}
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  fill="#000000"
                  d="M9.57 18.82c-.19 0-.38-.07-.53-.22l-6.07-6.07a.754.754 0 010-1.06L9.04 5.4c.29-.29.77-.29 1.06 0 .29.29.29.77 0 1.06L4.56 12l5.54 5.54c.29.29.29.77 0 1.06-.14.15-.34.22-.53.22z"
                ></path>
                <path
                  fill="#000000"
                  d="M20.5 12.75H3.67c-.41 0-.75-.34-.75-.75s.34-.75.75-.75H20.5c.41 0 .75.34.75.75s-.34.75-.75.75z"
                ></path>
              </svg>
              <span
                style={{
                  fontWeight: 600,
                  fontSize: "18px",
                  marginLeft: 5,
                  fontFamily: "Gilroy",
                }}
              >
               {/* Edit Bill */}
               {isAddMode ? "New Bill" : "Edit Bill"}
              </span>{" "}
            </div>
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
                // disabled={billsAddshow}
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
                    style={{ fontSize: "12px", color: "red", marginTop: "3px",fontWeight:500,fontFamily:"Gilroy" }}
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
                    style={{ fontSize: "12px", color: "red", marginTop: "3px",fontWeight:500,fontFamily:"Gilroy" }}
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
                  Start Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                   style={{ width: "100%", height: 48,cursor:"pointer" }}
                   format="DD/MM/YYYY"
                   placeholder="DD/MM/YYYY"
                   value={startdate ? dayjs(startdate) : null}
                   onChange={(date) => handlestartDate(date ? date.toDate() : null)}
                   getPopupContainer={(triggerNode) =>
                    triggerNode.closest(".datepicker-wrapper")
                  }
                    popperPlacement="top-start"
                     popperClassName="custom-datepicker"
                     appendTo= {document.body} 
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
                    dateFormat="dd/MM/yyyy"
                    // minDate={new Date()}

                    customInput={customStartDateInput({
                      value: startdate
                        ? startdate.toLocaleDateString("en-GB")
                        : "",
                    })}
                  />
                </div>
              </Form.Group>

              {startdateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "3px",fontWeight:500,fontFamily:"Gilroy" }}
                  >
                    {startdateerrmsg !== " " && (
                      <MdError style={{ fontSize: "15px", color: "red" }} />
                    )}{" "}
                    {startdateerrmsg}
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
                  End Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    // selected={enddate}
                    // onChange={(date) => handleEndDate(date)}
                    style={{ width: "100%", height: 48,cursor:"pointer" }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={enddate ? dayjs(enddate) : null}
                    onChange={(date) => handleEndDate(date ? date.toDate() : null)}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                    popperPlacement="top-start"
                     popperClassName="custom-datepicker"
                     appendTo= {document.body} 
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
                    dateFormat="dd/MM/yyyy"
                    // minDate={new Date()}

                    customInput={customEndDateInput({
                      value: enddate ? enddate.toLocaleDateString("en-GB") : "",
                    })}
                  />
                </div>
              </Form.Group>

              {enddateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "3px",fontWeight:500,fontFamily:"Gilroy" }}
                  >
                    {enddateerrmsg !== " " && (
                      <MdError style={{ fontSize: "15px", color: "red" }} />
                    )}{" "}
                    {enddateerrmsg}
                  </p>
                </div>
              )}
            </div>
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
                <div className="datepicker-wrapper"  style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                  style={{ width: "100%", height: 48,cursor:"pointer" }}
                  format="DD/MM/YYYY"
                  placeholder="DD/MM/YYYY"
                  value={invoicedate ? dayjs(invoicedate) : null}
                    // onChange={(date) => handleInvoiceDate(date)}
                    onChange={(date) => handleInvoiceDate(date ? date.toDate() : null)}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                    dateFormat="dd/MM/yyyy"
                    // minDate={new Date()}

                    popperPlacement="top-start"
                     popperClassName="custom-datepicker"
                     appendTo= {document.body} 
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
                    style={{ fontSize: "12px", color: "red", marginTop: "3px",fontWeight:500,fontFamily:"Gilroy" }}
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
                <div className="datepicker-wrapper"  style={{ position: "relative", width: "100%" }}>
                  <DatePicker
                    // selected={invoiceduedate}
                    // onChange={(date) => handleDueDate(date)}
                    style={{ width: "100%", height: 48,cursor:"pointer"}}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={invoiceduedate ? dayjs(invoiceduedate) : null}
                      // onChange={(date) => handleInvoiceDate(date)}
                      onChange={(date) => handleDueDate(date ? date.toDate() : null)}
                      getPopupContainer={(triggerNode) =>
                        triggerNode.closest(".datepicker-wrapper")
                      }
                    dateFormat="dd/MM/yyyy"
                    popperPlacement="top-start"
                    popperClassName="custom-datepicker"
                    appendTo= {document.body} 
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

              {/* {invoiceduedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "3px",fontWeight:500,fontFamily:"Gilroy" }}
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
              )} */}
              {invoiceduedateerrmsg.trim() !== "" && (
                <div>
                  <p
                    style={{ fontSize: "12px", color: "red", marginTop: "3px",fontWeight:500,fontFamily:"Gilroy" }}
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

          {/* Table */}
    
{Array.isArray(newRows) && newRows.length > 0 && (
  <div className="col-lg-11 col-md-11 col-sm-12 col-xs-12">
    <Table className="ebtable mt-2" responsive>
      <thead
        style={{
          backgroundColor: "#E7F1FF",
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <tr>
          <th>S.NO</th>
          <th>Description</th>
          <th>Total Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {newRows.map((u, index) => (
          <tr key={`new-${index}`}>
            <td>{index + 1}</td>
            <td>
              <div
                className="col-lg-8 col-md-8 col-sm-4 col-xs-4"
                style={{ alignItems: "center" }}
              >
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={u.am_name}
                  onChange={(e) =>
                    handleNewRowChange(index, "am_name", e.target.value)
                  }
                />
              </div>
            </td>
            <td
              className="col-lg-3 col-md-3 col-sm-4 col-xs-4"
              style={{ alignItems: "center" }}
            >
              <Form.Control
                type="text"
                placeholder="Enter total amount"
                value={u.amount}
                // onChange={(e) =>
                //   handleNewRowChange(index, "amount", e.target.value)
                // }
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*\.?\d*$/.test(value)) {
                    handleNewRowChange(index, "amount", value);
                  }
                }}
              />
            </td>
            <td style={{ alignItems: "center" }}>
              <span
                style={{
                  cursor: "pointer",
                  color: "red",
                  marginLeft: "10px",
                }}
                onClick={() => handleDeleteNewRow(index)}
              >
                <img src={Closebtn} height={15} width={15} alt="delete" />
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)}


          {/* <div>
            <p
              style={{
                color: "#1E45E1",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
              onClick={handleAddColumn}
            >
              {" "}
              + Add new column
            </p>
          </div>
          <div className="mb-2">
  <Form.Select
    onChange={(e) => handleRowTypeSelect(e.target.value)}
    defaultValue=""
  >
    <option value="" disabled>Select Item Type</option>
    <option value="RoomRent">Room Rent</option>
    <option value="EB">EB</option>
    <option value="Other">Other</option>
  </Form.Select>
</div> */}
      <div  className="col-lg-7 col-md-6 col-sm-12 col-xs-12">
        
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
         cursor:"pointer"
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
                   <div >
                     <p
                       style={{ fontSize: "12px", color: "red", marginTop: "5px", textAlign: "center",fontWeight:500,fontFamily:"Gilroy" }}
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

          <div style={{ float: "right", marginRight: "130px" }}>
          {Array.isArray(newRows) && newRows.length > 0 && (
            <h5>Total Amount ₹{totalAmount}</h5>
          )}
            <Button
              // onClick={handleEditBill}
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
              Save Changes
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

      {showMenu === true ? (
        <UserlistForm
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
          // handleEdit={handleEdit}
          handleShowAddBed={handleShowAddBed}
          roomDetail={roomDetail}
          setRoomDetail={setRoomDetail}
          userList={userList}
          setUserList={setUserList}
          OnShowTable={OnShowTableForCustomer}
          uniqueostel_Id={uniqueostel_Id}
          setUniqostel_Id={setUniqostel_Id}
        />
      ) : null}
    </div>
  );
}

UserList.propTypes = {
  id: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default UserList;

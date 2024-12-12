import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Image,
  Modal,
  Pagination,
  Form,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "./Userlistbooking.css";
import minus from "../Assets/Images/New_images/minus-square.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from "../Assets/Images/New_images/trash.png";
import Edit from "../Assets/Images/New_images/edit.png";
import Calendars from "../Assets/Images/New_images/calendar.png";
import { CloseCircle } from "iconsax-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingModal from "./Addbookingform";
import AssignBooking from "./Assignbooking";
import { FaCheckCircle } from "react-icons/fa";
import check from "../Assets/Images/add-circle.png";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { useDispatch, useSelector } from "react-redux";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import { be } from "date-fns/locale";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Booking(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("stateBooking", state);
  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [amount, setAmount] = useState("");
  const [comments, setComments] = useState("");
  const [paying, setPaying] = useState("");
  console.log("paying", paying);
  const [floor, setFloor] = useState("");
  const [room, setRoom] = useState("");
  const [bed, setBed] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [endMeterError, setendMeterError] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setamountError] = useState("");
  const [formError, setFormError] = useState("");
  const [HostelName, setHostelName] = useState("");
  const [validated, setValidated] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [formEdit, setFormEdit] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [HostelIds, setHostelIds] = useState("");
  console.log("HostelIds", HostelIds);
  const [FloorIds, setFloorIds] = useState("");
  const [bedIds, setBedIds] = useState("");
  const [id, setId] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editMode, seteditMode] = useState(false);
  const [assignBooking, setAssignBooking] = useState("");
  const [Phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [Address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [Email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailIdError, setemailIdError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [Editbed, seteditBed] = useState("");
  const [Bednum, setBednum] = useState("");
  const [validPhoneError, setvalidPhoneError] = useState("");
  const [validEmailError, setvalidEmailError] = useState("");
  const [bookingPermissionError, setBookingPermissionError] = useState("");
  const [bookingEditPermissionError, setBookingEditPermissionError] = useState("");
  const [bookingDeletePermissionError, setBookingDeletePermissionError] = useState("");
  console.log("userlisthostelid",props.uniqueostel_Id);
  // const HostelID = props.allhost_id 
  const [initialStateAssign, setInitialStateAssign] = useState({
    firstName: "",
    lastName: "",
    paying: "",
    floor: "",
    room: "",
    bed: "",
    amount: "",
    comments: "",
    joiningDate: "",
    Phone: "",
    countryCode: "",
    Address: "",
    Email: "",
  });


  useEffect(() => {
    console.log("===customerrolePermission[0]", props.customerrolePermission);
    if (
      props.customerrolePermission[0]?.is_owner == 1 ||
      props.customerrolePermission[0]?.role_permissions[5]?.per_view == 1
    ) {
      setBookingPermissionError("");
    } else {
      setBookingPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);


  useEffect(() => {
    console.log("===rolePermission", props.customerrolePermission[0]);
  
    if (
      props.customerrolePermission[0]?.is_owner == 1 ||
      props.customerrolePermission[0]?.role_permissions[5]?.per_edit == 1
    ) {
      setBookingEditPermissionError("");
    } else {
      setBookingEditPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    console.log("===rolePermission", props.customerrolePermission[0]);
  
    if (
      props.customerrolePermission[0]?.is_owner == 1 ||
      props.customerrolePermission[0]?.role_permissions[5]?.per_delete == 1
    ) {
      setBookingDeletePermissionError("");
    } else {
      setBookingDeletePermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  const MobileNumber = `${countryCode}${Phone}`;





  const handleEdit = (item) => {
    alert ('hiii')
    dispatch({
      type: "BOOKINGBEDDETAILS",
      payload: {
        hostel_id: HostelIds,
        floor_id: FloorIds,
        room_id: roomId,
        joining_date: joiningDate,
      },
    });
    console.log("editted",setFormEdit);
    setFormEdit(true);
    if (item && item.id) {
      setFirstName(item.first_name || "");
      setLastName(item.last_name || "");
      // setJoiningDate(item.joining_date || "")
      const formattedJoiningDate = item.joining_date
        ? new Date(item.joining_date)
        : null;
        console.log("itemEdit...///", formattedJoiningDate);
      setJoiningDate(formattedJoiningDate);
      
      setAmount(item.amount || "");
      setPaying(item.hostel_name || "");
      setFloor(item.floor_name || "");
      setRoom(item.room_name || "");
      setBed(item.bed_name || "");
      setComments(item.comments || "");
      setHostelIds(item.hostel_id || "");
      setFloorIds(item.floor_id || "");
      setRoomId(item.room_id || "");
      setBedIds(item.bed_id || "");
      setId(item.id || "");
      const phoneNumber = String(item.phone_number || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);
      setCountryCode(countryCode);
      setPhone(mobileNumber);
      setEmail(item.email_id || "");
      setAddress(item.address || "");
      setBednum(item);
      seteditBed("editbeddet");

      setInitialStateAssign({
        firstName: item.first_name || "",
        lastName: item.last_name || "",
        floor: item.floor_id || "",
        room: item.room_id || "",
        bed: item.bed_id || "",
        Phone: item.phone_number || "",
        Email: item.email_id || "",
        Address: item.address || "",
        joiningDate: formattedJoiningDate || "",
        amount: item.amount || "",
        paying: item.hostel_id || "",
        comments: item.comments || "",
      });

      seteditMode(true);
      // setRoomId(item[0].room_id || "");
    }
  };

  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: HostelIds },
    });
  }, [HostelIds]);

  useEffect(() => {
    if (HostelIds && FloorIds) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: HostelIds, floor_Id: FloorIds },
      });
    }
  }, [FloorIds]);
  useEffect(() => {
    dispatch({
      type: "BOOKINGBEDDETAILS",
      payload: {
        hostel_id: HostelIds,
        floor_id: FloorIds,
        room_id: roomId,
        joining_date: joiningDate,
      },
    });
  }, [roomId]);

  const calendarRef = useRef(null);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setfirstNameError("");
    setFormError("");
  };
  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);
    const hasUpperCase = /[A-Z]/.test(emailValue);
    const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");
    } else if (hasUpperCase) {
      setEmailErrorMessage("Email should be in lowercase *");
      setEmailError("Invalid Email Id *");
    } else if (!isValidEmail) {
      setEmailErrorMessage("");
      setEmailError("Invalid Email Id *");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
      setvalidEmailError("")
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setFormError("");
  };

  const handleDate = (selectedDates) => {
    if (selectedDates.length > 0) {
      const localDate = new Date(
        selectedDates[0].getTime() -
          selectedDates[0].getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setJoiningDate(localDate);
      setDateError("");
      setFormError("");
    }
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
    setamountError("");
    setFormError("");
  };

  const handlePayingguest = (e) => {
    const selectedHostelId = e.target.value;

    const selectedHostel =
      state.UsersList.hostelList &&
      state.UsersList.hostelList.filter((item) => item.id == e.target.value);
    setHostelIds(selectedHostelId);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    if (selectedHostelId === "Select a PG") {
      setHostelIdError("Please select a valid PG");
    } else {
      setHostelIdError("");
    }
   
    setHostelIdError("");
    setFormError("");
    setFloorIds("");
    setRoomId("");
    setBedIds("");
    setAmount(0);
  };
  const handleFloor = (e) => {
    setFloorIds(e.target.value);
    setfloorError("");
    setAmount(0);
    setFormError("");
  };

  const handleRoom = (e) => {
    setRoomId(e.target.value);
    setRoomError("");
    setAmount(0);
    setFormError("");
  };
  useEffect(() => {
    if (state.Booking.bookingError) {
      setPhoneError(state.Booking.bookingError);
    }
  }, [state.Booking.bookingError]);


  const handleBed = (e) => {
    setBedIds(e.target.value);

    const Bedfilter =
      state?.UsersList?.roomdetails &&
      state.UsersList.roomdetails.filter(
        (u) =>
          u.Hostel_Id == HostelIds &&
          u.Floor_Id == FloorIds &&
          u.Room_Id == roomId
      );
    console.log("Bedfilter", Bedfilter);

    const Roomamountfilter =
      Bedfilter &&
      Bedfilter.length > 0 &&
      Bedfilter[0].bed_details.filter((amount) => amount.id == e.target.value);
    console.log("Roomamountfilter123", Roomamountfilter);
    console.log("initialStateAssign123", initialStateAssign);

    if (Roomamountfilter?.length != 0) {
      const selectedRoomRent = Roomamountfilter[0]?.bed_amount;

      if (editMode && e.target.value == initialStateAssign.bed) {
        setAmount(initialStateAssign.amount);
        console.log("initialStateAssign.amount", initialStateAssign.amount);
      } else {
        setAmount(selectedRoomRent);
      }
      console.log("Roomamountfilter", selectedRoomRent);
    }

    console.log("e.target.valuebed", e.target.value);
    if (e.target.value === "Selected a Bed" && e.target.value === "") {
      setBedError("Please select a valid Bed");
    } else {
      setBedError("");
    }
    setBedError("");
    setFormError("");
  };
  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
    const pattern = /^\d{1,10}$/;
    const isValidMobileNo = pattern.test(e.target.value);

    if (isValidMobileNo && e.target.value.length === 10) {
      setPhoneError("");
    } else {
      setPhoneError("Invalid mobile number *");
    }
    setPhoneErrorMessage("");
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    setFormError("");
    setvalidPhoneError("")
  };

  const handleComments = (e) => {
    setComments(e.target.value);
    setFormError("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setAddressError("");
    setFormError("");
  };

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };
  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      (value === "Select a PG" && value === "") ||
      (value === "Select a floor" && value === "") ||
      (value === "Select a room" && value === "") ||
      (value === "Select a bed" && value === "")
    ) {
      switch (fieldName) {
        case "firstName":
          setfirstNameError("FirstName ID is required");
          break;
        case "joiningDate":
          setDateError("joiningDate ID is required");
          break;
        case "amount":
          setamountError("Amount is required");
          break;
        case "paying":
          setHostelIdError("Hostel ID is required");
          break;
        case "floor":
          setfloorError("Floor is required");
          break;
        case "room":
          setRoomError("Room is required");
          break;
        case "bed":
          setBedError("Bed is required");
          break;
        case "Address":
          setAddressError("Address is required");
          break;
        case "Email":
          setEmailError("Email is required");
          break;

        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "firstName":
          setfirstNameError("");
          break;
        case "joiningDate":
          setDateError("");
          break;
        case "amount":
          setamountError("");
          break;
        case "paying":
          setHostelIdError("");
          break;
        case "floor":
          setfloorError("");
          break;
        case "room":
          setRoomError("");
          break;
        case "bed":
          setBedError("");
          break;
        case "Address":
          setAddressError("");
          break;
        case "Email":
          setEmailError("");
          break;

        default:
          break;
      }
      return true;
    }
  };
  // const MobileNumber = `${countryCode}${Phone}`;
  const handleSubmit = () => {
    const isFirstnameValid = validateAssignField(firstName, "firstName");
    const isjoiningDateValid = validateAssignField(joiningDate, "joiningDate");
    const isamountValid = validateAssignField(amount, "amount");

    const isHostelValid = validateAssignField(HostelIds, "paying");
    const isFloorvalid = validateAssignField(FloorIds, "floor");
    const isRoomValid = validateAssignField(roomId, "room");
    const isbedvalid = validateAssignField(bedIds, "bed");

    if ((HostelIds === "Select a PG" && HostelIds === "") || !isHostelValid) {
      setHostelIdError("Please select a valid Hostel");
      return;
    } else {
      setfloorError("");
    }
    if ((FloorIds === "Select a floor" && FloorIds === "") || !isFloorvalid) {
      setfloorError("Please select a valid Floor");
      return;
    } else {
      setfloorError("");
    }

    if ((roomId === "Select a room" && roomId === "") || !isRoomValid) {
      setRoomError("Please select a valid Room");
      return;
    } else {
      setRoomError("");
    }
    if ((bedIds === "Select a bed" && bedIds === "") || !isbedvalid) {
      setBedError("Please select a valid Room");
      return;
    } else {
      setBedError("");
    }

    if (
      !isFirstnameValid ||
      !isjoiningDateValid ||
      !isamountValid ||
      !isHostelValid ||
      !isFloorvalid ||
      !isRoomValid ||
      !isbedvalid
    ) {
      return;
    }
    console.log("FloorIds:", FloorIds);
    console.log("initialStateAssign.floor:", initialStateAssign.floor);
    console.log("RoomId:", roomId);
    console.log("initialStateAssign.room:", initialStateAssign.room);
    console.log("BedIds:", bedIds);
    console.log("initialStateAssign.bed:", initialStateAssign.bed);
    console.log("JoiningDate:", joiningDate);
    console.log(
      "initialStateAssign.joiningDate:",
      initialStateAssign.joiningDate
    );
    console.log("Amount:", amount);
    console.log("initialStateAssign.amount:", initialStateAssign.amount);
    console.log("FirstName:", firstName);
    console.log("initialStateAssign.firstName:", initialStateAssign.firstName);
    console.log("LastName:", lastName);
    console.log("initialStateAssign.lastName:", initialStateAssign.lastName);
    console.log("Comments:", comments);
    console.log("initialStateAssign.comments:", initialStateAssign.comments);

    console.log("Address:", Address);
    console.log("initialStateAssign.Address:", initialStateAssign.Address);
    console.log("Email:", Email);
    console.log("initialStateAssign.Email:", initialStateAssign.Email);
    console.log("Phone:", Phone);
    console.log("initialStateAssign.Phone:", initialStateAssign.Phone);

    console.log("Phone:", countryCode);
    console.log("initialStateAssign.Phone:", initialStateAssign.countryCode);

    const isValidDate = (date) => {
      return !isNaN(Date.parse(date));
    };
    const isChangedBed =
      (isNaN(FloorIds)
        ? String(FloorIds).toLowerCase() !==
          String(initialStateAssign.floor).toLowerCase()
        : Number(FloorIds) !== Number(initialStateAssign.floor)) ||
      (isNaN(roomId)
        ? String(roomId).toLowerCase() !==
          String(initialStateAssign.room).toLowerCase()
        : Number(roomId) !== Number(initialStateAssign.room)) ||
      (isNaN(bedIds)
        ? String(bedIds).toLowerCase() !==
          String(initialStateAssign.bed).toLowerCase()
        : Number(bedIds) !== Number(initialStateAssign.bed)) ||
      (isValidDate(joiningDate) && isValidDate(initialStateAssign.joiningDate)
        ? new Date(joiningDate).toISOString().split("T")[0] !==
          new Date(initialStateAssign.joiningDate).toISOString().split("T")[0]
        : joiningDate !== initialStateAssign.joiningDate) ||
      Number(amount) !== Number(initialStateAssign.amount) ||
      String(firstName) !== String(initialStateAssign.firstName) ||
      String(Address) !== String(initialStateAssign.Address) ||
      String(Email) !== String(initialStateAssign.Email) ||
      Number(countryCode + Phone) !== Number(initialStateAssign.Phone) ||
      String(lastName) !== String(initialStateAssign.lastName) ||
      String(comments) !== String(initialStateAssign.comments);

    if (!isChangedBed) {
      setFormError("No changes detected.");
      return;
    } else {
      setFormError("");
    }
    // let formattedDate = null;
    // try {
    //   formattedDate = new Date(joiningDate).toISOString().split("T")[0];
    // } catch (error) {
    //   setDateError("date is required.");
    //   console.error(error);
    //   return;
    // }
    let formattedDate = null;
try {
  let date = new Date(joiningDate);
  date.setDate(date.getDate() + 1); // Add 1 day
  formattedDate = date.toISOString().split("T")[0];
} catch (error) {
  setDateError("Date is required.");
  console.error(error);
  return;
}
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");

    dispatch({
      type: "ADD_BOOKING",
      payload: {
        first_name: firstName,
        last_name: lastName,
        joining_date: formattedDate,
        amount: amount,
        hostel_id: HostelIds,
        floor_id: FloorIds,
        room_id: roomId,
        bed_id: bedIds,
        comments: comments,
        phone_number: normalizedPhoneNumber,
        email_id: Email,
        address: Address,
        id: id,
      },
    });
  
  };

  console.log("stateghjhsjdhjs", state);

  

  const handleDotsClick = (id) => {
    setActiveDotsId((prevId) => (prevId === id ? null : id));
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero for day if needed
    return `${year}-${month}-${day}`;
  };

  const handleCloseForm = () => {
    setFormEdit(false);
    setFormError("");
    setBedError("");
    setPhone("");
    setPhoneError("");
    setAddress("");
    setAddressError("");
    setfirstNameError("");
    setfloorError("");
    setHostelIdError("");
    setDateError("");
    setRoomError("");
    setamountError("");
    setvalidPhoneError("")
    setvalidEmailError("")

  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    setModalType("add");
  };
  const handleShowbook = () => {
    setModalType("add");

    setSelectedCustomer(null);
  };

  const handleDelete = (item) => {
    setDeleteId(item.id);
    setDeleteShow(true);
  };

  const handleDeleteBooking = () => {
    dispatch({
      type: "DELETE_BOOKING_CUSTOMER",
      payload: {
        id: deleteId,
      },
    });
  };
  const handleCheckin = (item) => {
    setModalType(true);
    setAssignBooking(item);
    console.log("id12345", item);
  };

  const handleSave = (updatedCustomer) => {
    if (modalType === "edit" || modalType === "checkin") {
      setCustomers((prevCustomers) =>
        prevCustomers.map((c) =>
          c.id === updatedCustomer.id ? updatedCustomer : c
        )
      );
      const message =
        modalType === "edit"
          ? "Saved changes successfully!"
          : "Check-in assigned successfully!";
      showToast(message);
    } else if (modalType === "add") {
      setCustomers((prevCustomers) => [updatedCustomer, ...prevCustomers]);
      showToast("Booking added successfully!");
    }
    handleModalClose();
  };

  const showToast = (successMessage) => {
    toast.success(successMessage, {});
  };

  const handleModalClose = () => {
    setModalType(null);
    setSelectedCustomer(null);
  };

  const confirmDelete = () => {
    if (selectedCustomer) {
      setCustomers((prevCustomers) =>
        prevCustomers.filter((c) => c.id !== selectedCustomer.id)
      );
      toast.success(` booking deleted successfully!`, {});
    }
    handleModalClose();
  };
  
  useEffect(() => {
    dispatch({ type: "GET_BOOKING_LIST" });
  }, []);
  useEffect(() => {
    setCustomers(state.Booking.CustomerBookingList.bookings);
  }, state.Booking.CustomerBookingList.bookings);
  console.log("customer///////", props.filteredUsers);

  useEffect(()=>{
    if(state?.Booking?.bookingPhoneError){
      // setvalidPhoneError(state?.Booking?.bookingPhoneError)
      setTimeout(()=>{
       
        dispatch({type:"CLEAR_PHONE_ERROR"})
      },2000)

    }
  },[state?.Booking?.bookingPhoneError])

  useEffect(()=>{
    if(state?.Booking?.bookingEmailError){
      // setvalidEmailError(state?.Booking?.bookingEmailError)
      setTimeout(()=>{
        dispatch({type:"CLEAR_EMAIL_ERROR"})
      },2000)
      
    }
  },[state?.Booking?.bookingEmailError])
 

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setActiveDotsId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (state?.Booking?.statusCodeForDeleteBooking === 200) {
      handleCloseDelete();
      dispatch({ type: "GET_BOOKING_LIST" });
    
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForDeleteBooking]);
  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      dispatch({type:"CLEAR_EMAIL_ERROR"})
      dispatch({type:"CLEAR_PHONE_ERROR"})
      handleCloseForm()

      dispatch({ type: "GET_BOOKING_LIST" });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);
 

  const popupRef = useRef(null);
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 7;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.filteredUsers?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(props.filteredUsers?.length / itemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} style={{ margin: "0 5px" }}>
          <button
            style={{
              padding: "5px 10px",
              color: i === currentPage ? "#007bff" : "#000",
              cursor: "pointer",
              border: i === currentPage ? "1px solid #ddd" : "none",
              backgroundColor:
                i === currentPage ? "transparent" : "transparent",
            }}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };


  const customDateInput = (props) => {
    return (
      <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
        <FormControl
          type="text"
          className='date_input'
          value={props.value || 'DD/MM/YYYY'}
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
            boxShadow: "none"
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
            transform: 'translateY(-50%)'
          }}
          alt="Calendar"
          onClick={props.onClick}
        />
      </div>
    );
  };

  return (
    <>
   {
    bookingPermissionError ? (
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
            {bookingPermissionError && (
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
                <span>{bookingPermissionError}</span>
              </div>
            )}
          </div></>
    ):
    <div className="p-10" style={{ marginLeft: "-20px" }}>
        <div>
          {currentItems?.length > 0 ? (
            <div
              className="p-10 booking-table-userlist"
              style={{ paddingBottom: "20px" }}
            >
              <Table
                className="Table_Design"
                responsive="md"
                style={{
                  height: "auto",
                  overflow: "visible",
                  tableLayout: "auto",
                  borderRadius: "24px",
                  border: "1px solid #DCDCDC",
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        textAlign: "center",
                        padding: "10px",
                        background: "#E7F1FF",
                        border: "none",
                        borderTopLeftRadius: "24px",
                      }}
                    >
                      <img
                        src={minus}
                        height={20}
                        width={20}
                        alt="minus icon"
                      />
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#4B4B4B",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        background: "#E7F1FF",
                        border: "none",
                      }}
                    >
                      Name
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#4B4B4B",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        background: "#E7F1FF",
                        border: "none",
                      }}
                    >
                      Email ID
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#4B4B4B",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        background: "#E7F1FF",
                        border: "none",
                      }}
                    >
                      Mobile No
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#4B4B4B",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        background: "#E7F1FF",
                        border: "none",
                      }}
                    >
                      Booking Date
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#4B4B4B",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        background: "#E7F1FF",
                        border: "none",
                      }}
                    >
                      Joining Date
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#4B4B4B",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        background: "#E7F1FF",
                        border: "none",
                      }}
                    >
                      Amount
                    </th>
                    <th
                      style={{
                        textAlign: "start",
                        padding: "10px",
                        color: "#4B4B4B",
                        fontSize: "14px",
                        fontWeight: 500,
                        fontFamily: "Gilroy",
                        background: "#E7F1FF",
                        border: "none",
                        borderTopRightRadius: "24px",
                      }}
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems?.map((customer) => {
                    //  let Dated = new Date(customer.joining_date);
                    //  console.log("Dated..?", Dated);

                    //  let day = Dated.getDate();
                    //  let month = Dated.getMonth() + 1;
                    //  let year = Dated.getFullYear();
                    // let formattedDate = `${year}/${month}/${day}`;

                    let Dated = new Date(customer.joining_date);
                    console.log("Dated..?", Dated);

                    let day = Dated.getDate();
                    let month = Dated.getMonth(); // Get the zero-indexed month
                    let year = Dated.getFullYear();

                    // Array of month names abbreviated to the first 3 letters
                    const monthNames = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ];

                    // Get the month abbreviation
                    let formattedMonth = monthNames[month];

                    // Format the date as YYYY Mon DD
                    let formattedDate = `${year} ${formattedMonth} ${day}`;

                    console.log("Formatted Date:", formattedDate);

                    let createDated = new Date(customer.createdat);
                    console.log("Dated..?", Dated);

                    let day1 = createDated.getDate();
                    let month1 = createDated.getMonth() + 1;
                    let year1 = createDated.getFullYear();

                    const monthNamesformate = [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ];
                    let formattedMonthjj = monthNamesformate[month1];
                    let formattedDatecreate = `${year1} ${formattedMonthjj} ${day1}`;

                    return (
                      <tr key={customer.id} className="customer-row">
                        <td
                          style={{
                            textAlign: "center",
                            padding: "10px",
                            border: "none",
                          }}
                        >
                          <img
                            src={minus}
                            height={20}
                            width={20}
                            alt="minus icon"
                          />
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            {/* <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" /> */}
                            <span
                              style={{
                                fontSize: "16px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: "#222222",
                                paddingLeft: "4px",
                              }}
                              className="ms-2 customer-name"
                            >
                              {customer.first_name} {customer.last_name}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{
                            fontSize: "16px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            color: "#000000",
                            textAlign: "start",
                          }}
                        >
                          {/* {customer.email_id} */}
                          {customer.email_id ? customer.email_id : "N/A"}
                        </td>
                        {/* <td
                        style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          fontFamily: 'Gilroy',
                          color: '#000000',
                          textAlign: 'start',
                        }}
                      >
                       
                        {customer.phone_number}
                      </td> */}

                        <td
                          style={{
                            textAlign: "start",
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#000000",
                            fontFamily: "Gilroy",
                            whiteSpace: "nowrap",
                          }}
                        >
                          +
                          {customer &&
                            String(customer.phone_number).slice(
                              0,
                              String(customer.phone_number).length - 10
                            )}{" "}
                          {customer && String(customer.phone_number).slice(-10)}
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            border: "none",
                            textAlign: "start",
                            fontSize: "16px",
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: "60px",
                              backgroundColor: "#EBEBEB",
                              textAlign: "start",
                              fontSize: "14px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              display: "inline-block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formattedDatecreate}
                          </span>
                        </td>

                        <td
                          style={{
                            padding: "10px",
                            border: "none",
                            textAlign: "start",
                            fontSize: "16px",
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: "60px",
                              backgroundColor: "#EBEBEB",
                              textAlign: "start",
                              fontSize: "14px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              display: "inline-block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formattedDate}
                          </span>
                        </td>
                        <td
                          style={{
                            padding: "10px",
                            border: "none",
                            textAlign: "start",
                            fontSize: "16px",
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <span
                            style={{
                              padding: "3px 10px",
                              borderRadius: "60px",
                              backgroundColor: "#EBEBEB",
                              textAlign: "start",
                              fontSize: "14px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              display: "inline-block",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {customer.amount}
                          </span>
                        </td>

                        <td>
                          <div
                            style={{
                              cursor: "pointer",
                              height: 40,
                              width: 40,
                              borderRadius: "50%",
                              border: "1px solid #EFEFEF",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              position: "relative",
                              zIndex:
                                activeDotsId === customer.id ? 1000 : "auto",
                            }}
                            onClick={() => handleDotsClick(customer.id)}
                          >
                            <PiDotsThreeOutlineVerticalFill
                              style={{ height: 20, width: 20 }}
                            />

                            {activeDotsId === customer.id && (
                              <div
                                ref={popupRef}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#F9F9F9",
                                  position: "absolute",
                                  right: 0,
                                  top: 50,
                                  width: 163,
                                  height: 92,
                                  border: "1px solid #EBEBEB",
                                  borderRadius: 10,
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "center",
                                  padding: 15,
                                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                }}
                              >
                               <div
  className="mb-2 d-flex align-items-center"
  onClick={() => {
    if (!props.customerBookingAddPermission) {
      handleCheckin(customer);
    }
  }}
  style={{
    cursor: props.customerBookingAddPermission ? "not-allowed" : "pointer",
    pointerEvents: props.customerBookingAddPermission ? "none" : "auto",
    opacity: props.customerBookingAddPermission ? 0.5 : 1,
  }}
>
  <img
    src={check}
    style={{
      height: 16,
      width: 16,
      marginRight: "8px",
    }}
    alt="Checkin icon"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy",
      color: "#222222",
    }}
  >
    Check In
  </label>
</div>

<div
  className="mb-2 d-flex align-items-center"
  onClick={() => {
    if (bookingEditPermissionError) {
      handleEdit(customer);
    }
  }}
  style={{
    cursor:bookingEditPermissionError ? "not-allowed" : "pointer",
    pointerEvents:bookingEditPermissionError ? "none" : "auto",
    opacity:bookingEditPermissionError ? 0.5 : 1,
  }}
>
  <img
    src={Edit}
    style={{
      height: 16,
      width: 16,
      marginRight: "8px",
    }}
    alt="Edit icon"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy",
      color: "#222222",
    }}
  >
    Edit
  </label>
</div>

<div
  className="d-flex align-items-center"
  onClick={() => {
    if (!bookingDeletePermissionError) {
      handleDelete(customer);
    }
  }}
  style={{
    cursor:bookingDeletePermissionError ? "not-allowed" : "pointer",
    pointerEvents:bookingDeletePermissionError ? "none" : "auto",
    opacity:bookingDeletePermissionError ? 0.5 : 1,
  }}
>
  <img
    src={Delete}
    style={{
      height: 16,
      width: 16,
      marginRight: "8px",
    }}
    alt="Delete icon"
  />
  <label
    style={{
      fontSize: 14,
      fontWeight: 500,
      fontFamily: "Gilroy",
      color: "#FF0000",
    }}
  >
    Delete
  </label>
</div>

                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              {currentItems?.length > 0 && (
                <nav>
                  <ul
                    style={{
                      display: "flex",
                      alignItems: "center",
                      listStyleType: "none",
                      padding: 0,
                      justifyContent: "end",
                    }}
                  >
                    <li style={{ margin: "0 5px" }}>
                      <button
                        style={{
                          padding: "5px 10px",
                          textDecoration: "none",
                          color: currentPage === 1 ? "#ccc" : "#007bff",
                          cursor: currentPage === 1 ? "not-allowed" : "pointer",
                          borderRadius: "5px",
                          display: "inline-block",
                          minWidth: "30px",
                          textAlign: "center",
                          backgroundColor: "transparent",
                          border: "none",
                        }}
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <ArrowLeft2 size="16" color="#1E45E1" />
                      </button>
                    </li>
                    {currentPage > 3 && (
                      <li style={{ margin: "0 5px" }}>
                        <button
                          style={{
                            padding: "5px 10px",
                            textDecoration: "none",
                            color: "white",
                            cursor: "pointer",
                            borderRadius: "5px",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
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
                      <li style={{ margin: "0 5px" }}>
                        <button
                          style={{
                            padding: "5px 10px",
                            textDecoration: "none",
                            cursor: "pointer",
                            borderRadius: "5px",
                            display: "inline-block",
                            minWidth: "30px",
                            textAlign: "center",
                            backgroundColor: "transparent",
                            border: "none",
                          }}
                          onClick={() => handlePageChange(totalPages)}
                        >
                          {totalPages}
                        </button>
                      </li>
                    )}
                    <li style={{ margin: "0 5px" }}>
                      <button
                        style={{
                          padding: "5px 10px",
                          textDecoration: "none",
                          color:
                            currentPage === totalPages ? "#ccc" : "#007bff",
                          cursor:
                            currentPage === totalPages
                              ? "not-allowed"
                              : "pointer",
                          borderRadius: "5px",
                          display: "inline-block",
                          minWidth: "30px",
                          textAlign: "center",
                          backgroundColor: "transparent",
                          border: "none",
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
            </div>
          ) : (
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
                  fontSize: 20,
                  color: "rgba(75, 75, 75, 1)",
                }}
              >
                No Bookings available{" "}
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
                There are no Bookings added.{" "}
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                  onClick={props.toggleForm}
                  disabled={props.customerBookingAddPermission}
                  style={{
                    fontSize: 16,
                    backgroundColor: "#1E45E1",
                    color: "white",
                    height: 59,
                    fontWeight: 600,
                    borderRadius: 12,
                    width: 190,
                    padding: "18px, 20px, 18px, 20px",
                    color: "#FFF",
                    fontFamily: "Montserrat",
                  }}
                >
                  {" "}
                  + Add Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
   }
      

      {/* Booking Modal (Add/Edit) */}
      <BookingModal
        show={modalType === "edit" || modalType === "add"}
        handleClose={handleModalClose}
        mode={modalType} // 'edit' or 'add'
        customer={selectedCustomer}
        handleSave={handleSave}
        setFormEdit={setFormEdit}
        formEdit = {formEdit}
        HostelID = {props.uniqueostel_Id}
      />

      <AssignBooking
        modalType={modalType}
        setModalType={setModalType}
        handleClose={handleModalClose}
        mode={modalType}
        customer={selectedCustomer}
        handleSave={handleSave}
        setAssignBooking={setAssignBooking}
        assignBooking={assignBooking}
      />

      <Modal
        show={formEdit}
        onHide={handleCloseForm}
        centered
        backdrop="static"
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title style={{fontSize:18,fontFamily:"Gilroy",fontWeight:600}}>Edit Booking</Modal.Title>
          <CloseCircle
            size="32"
            color="#222222"
            onClick={handleCloseForm}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <Form.Group controlId="formFirstName" className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  First Name <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                  }}
                  value={firstName}
                  className={formErrors.firstName ? "is-invalid" : ""}
                  onChange={(e) => handleFirstName(e)}
                />
              </Form.Group>
              {firstNameError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {firstNameError}
                </div>
              )}
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Last Name<span
                            style={{ color: "transparent", fontSize: "20px" }}
                          >
                            {" "}
                            *{" "}
                          </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                  }}
                  value={lastName}
                  isInvalid={!!formErrors.lastName}
                  onChange={(e) => handleLastName(e)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Mobile number{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>

                <InputGroup>
                  <Form.Select
                    value={countryCode}
                    id="vendor-select-pg"
                    onChange={handleCountryCodeChange}
                    style={{
                      border: "1px solid #D9D9D9",

                      borderRadius: "8px 0 0 8px",
                      height: 50,
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: countryCode ? 600 : 500,
                      boxShadow: "none",
                      backgroundColor: "#fff",
                      maxWidth: 90,
                      paddingRight: 10,
                    }}
                  >
                    {state.UsersList?.countrycode?.country_codes?.map(
                      (item) => {
                        return (
                          console.log("item.country_flag", item.country_flag),
                          (
                            <>
                              <option value={item.country_code}>
                                +{item.country_code}
                              </option>
                            </>
                          )
                        );
                      }
                    )}
                  </Form.Select>
                  <Form.Control
                    value={Phone}
                    onChange={handlePhone}
                    type="text"
                    placeholder="9876543210"
                    maxLength={10}
                    style={{
                      fontSize: 16,
                      color: "#4B4B4B",
                      fontFamily: "Gilroy",
                      fontWeight: Phone ? 600 : 500,
                      boxShadow: "none",
                      borderLeft: "unset",
                      borderRight: "1px solid #D9D9D9",
                      borderTop: "1px solid #D9D9D9",
                      borderBottom: "1px solid #D9D9D9",
                      height: 50,
                      borderRadius: "0 8px 8px 0",
                    }}
                  />
                </InputGroup>
                <p
                  id="MobileNumberError"
                  style={{ color: "red", fontSize: 11, marginTop: 5 }}
                ></p>
                {phoneError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {phoneError}
                  </div>
                )}
                {phonenumError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {phonenumError}
                  </div>
                )}
                {phoneErrorMessage && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    {phoneErrorMessage}
                  </div>
                )}
                 {state?.Booking?.bookingPhoneError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {state?.Booking?.bookingPhoneError}
                </div>
              )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName" className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Email <span
                            style={{ color: "transparent", fontSize: "20px" }}
                          >
                            {" "}
                            *{" "}
                          </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                  }}
                  value={Email}
                  isInvalid={!!formErrors.lastName}
                  onChange={(e) => handleEmail(e)}
                />
              </Form.Group>
              {emailError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {emailError}
                </div>
              )}
              {emailIdError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {emailIdError}
                </div>
              )}
              {emailErrorMessage && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {emailErrorMessage}
                </div>
              )}
               {state?.Booking?.bookingEmailError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {state?.Booking?.bookingEmailError}
                </div>
              )}
            </Col>
          </Row>
          <Row>
          <Col md={6}>
  <Form.Group className="mb-2" controlId="purchaseDate">
    <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
      Joining_Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
    </Form.Label>
    <div style={{ position: 'relative', width: "100%" }}>
      <DatePicker
        selected={joiningDate instanceof Date ? joiningDate : null}
        onChange={(date) => {
          setDateError('');
          setJoiningDate(date);
        }}
        dateFormat="dd/MM/yyyy"
        minDate={null} 
        // disabled={edit}
        customInput={customDateInput({
          value: joiningDate instanceof Date ? joiningDate.toLocaleDateString('en-GB') : '',
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
</Col>
            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Amount{" "}
                  <span
                    style={{
                      color: "red",
                      fontSize: "20px",
                    }}
                  >
                    {" "}
                    *{" "}
                  </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => handleAmount(e)}
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
              {amountError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {amountError}
                </div>
              )}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-2" controlId="formPaying">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Paying Guest <span style={{ color: "#FF0000" }}>*</span>
                </Form.Label>
                {/* <Form.Select
        aria-label="Paying Guest"
        value={paying}
        isInvalid={!!formErrors.paying}
         className='' id="vendor-select"
        onChange={(e) => handlePayingguest(e)}
        style={{ fontSize: 14, color: "rgba(75, 75, 75, 1)", fontFamily: "Gilroy" }}
      >
        <option value="">Select a PG</option>
        <option value="UPI/BHIM">Paying guest 1</option>
        <option value="CASH">Paying guest 2</option>
        <option value="Net Banking">Paying guest 3</option>
      </Form.Select> */}

                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  value={HostelIds}
                  onChange={(e) => handlePayingguest(e)}
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    lineHeight: "18.83px",
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
                    Select a PG
                  </option>
                  {state.UsersList?.hostelList &&
                    state.UsersList?.hostelList.map((item) => (
                      <>
                        <option key={item.id} value={item.id}>
                          {item.Name}
                        </option>
                      </>
                    ))}
                </Form.Select>
              </Form.Group>
              {hostelIdError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {hostelIdError}
                </div>
              )}
            </Col>
            <Col>
              <Form.Group className="mb-2" controlId="formFloor">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Floor <span style={{ color: "#FF0000" }}>*</span>
                </Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  value={FloorIds}
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
              </Form.Group>
              {floorError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {floorError}
                </div>
              )}
            </Col>
          </Row>

          <Row>
            <Col>
              <Form.Group className="mb-2" controlId="formRoom">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Room <span style={{ color: "#FF0000" }}>*</span>
                </Form.Label>

                <Form.Select
                  aria-label="Default select example"
                  className="border"
                  value={roomId}
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
              </Form.Group>
              {roomError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {roomError}
                </div>
              )}
            </Col>
            <Col>
              <Form.Group className="mb-2" controlId="formBed">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Bed <span style={{ color: "#FF0000" }}>*</span>
                </Form.Label>

                <Form.Select
                  aria-label="Default select example"
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
                  value={bedIds}
                  className="border"
                  placeholder="Select a bed"
                  id="form-selects"
                  onChange={(e) => handleBed(e)}
                >
                  <option value="" selected>
                    Selected Bed
                  </option>

                  {/* {props.edit === "Edit" &&
    Bednum &&
    Bednum.Bed &&
    Bednum.Bed !== "undefined" &&  Bednum.Bed !== "" &&  Bednum.Bed !== "null" &&  Bednum.Bed !== "0" && (
      <option value={Bednum.Bed} selected>
        {Bednum.Bed}
      </option>
    )} */}
     {Editbed == "editbeddet" &&
                                        Bednum &&
                                        Bednum.bed_id && (
                                          <option
                                            value={Bednum.bed_id}
                                            selected
                                          >
                                            {Bednum.bed_name}
                                          </option>
                                        )}

                  {state.Booking?.availableBedBooking?.bed_details &&
                    state.Booking?.availableBedBooking?.bed_details
                      .filter(
                        (item) =>
                          item.bed_no !== "0" &&
                          item.bed_no !== "undefined" &&
                          item.bed_no !== "" &&
                          item.bed_no !== "null"
                      )
                      .map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.bed_no}
                        </option>
                      ))}
                </Form.Select>
              </Form.Group>
              {bedError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  {bedError}
                </div>
              )}
            </Col>
          </Row>
          <Col md={12}>
            <Form.Group controlId="formFirstName" className="mb-3">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Address{" "}
                <span style={{ color: "red", fontSize: "20px" }}> * </span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Address"
                style={{
                  fontSize: 14,
                  color: "rgba(75, 75, 75, 1)",
                  fontFamily: "Gilroy",
                  height: "50px",
                }}
                value={Address}
                className={formErrors.firstName ? "is-invalid" : ""}
                onChange={(e) => handleAddress(e)}
              />
            </Form.Group>
            {addressError && (
              <div style={{ color: "red" }}>
                <MdError />
                {addressError}
              </div>
            )}
          </Col>

          <Form.Group controlId="formComments" className="mb-3">
            <Form.Label
              style={{
                fontSize: 14,
                color: "#222222",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              Comments
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter comments"
              value={comments}
              onChange={(e) => handleComments(e)}
              style={{
                fontSize: 14,
                color: "rgba(75, 75, 75, 1)",
                fontFamily: "Gilroy",
              }}
            />
          </Form.Group>
          {formError && (
            <div style={{ color: "red" }}>
              <MdError />
              {formError}
            </div>
          )}
          <Modal.Footer>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              style={{
                borderRadius: 12,
                padding: "12px",
                border: "1px solid rgba(36, 0, 255, 1)",
                backgroundColor: "#1E45E1",
                color: "#fff",
                fontSize: 16,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
              onClick={handleSubmit}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal.Body>
        {/* </Form> */}
      </Modal>

      {/* Delete Modal */}
      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
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
            Delete Check-out?
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
          Are you sure you want to delete this check-out?
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
            onClick={handleCloseDelete}
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
            onClick={handleDeleteBooking}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Booking;

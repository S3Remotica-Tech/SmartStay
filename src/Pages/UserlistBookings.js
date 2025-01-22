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
import imageCompression from 'browser-image-compression';
import Plus from '../Assets/Images/New_images/addplus-circle.svg'
import Profile2 from '../Assets/Images/New_images/profile-picture.png'

function Booking(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch()
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
  const [HostelIds, setHostelIds] = useState("")
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
  const [bookingDeletePermissionError, setBookingDeletePermissionError] = useState("")
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
    setHostelIds(props.uniqueostel_Id);
  }, [props.uniqueostel_Id]);
  useEffect(() => {
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
    setFormEdit(true);
    if (item && item.id) {
      setFirstName(item.first_name || "");
      setLastName(item.last_name || "");
      setJoiningDate(item.joining_date || "")
      const formattedJoiningDate = item.joining_date
        ? new Date(item.joining_date)
        : null;
      setJoiningDate(formattedJoiningDate);
      setFile(item.profile || "");
      setAmount(item.amount || "");
      setHostelIds(item.hostel_id || "");
      setId(item.id || "");
      const phoneNumber = String(item.phone_number || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);
      setCountryCode(countryCode);
      setPhone(mobileNumber);
      setEmail(item.email_id || "");
      setAddress(item.address || "");
      setInitialStateAssign({
        firstName: item.first_name || "",
        lastName: item.last_name || "",
        Phone: item.phone_number || "",
        Email: item.email_id || "",
        Address: item.address || "",
        joiningDate: formattedJoiningDate || "",
        amount: item.amount || "",
        paying: item.hostel_id || "",
        file: item.profile || "",
      });

      seteditMode(true);
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

    const Roomamountfilter =
      Bedfilter &&
      Bedfilter.length > 0 &&
      Bedfilter[0].bed_details.filter((amount) => amount.id == e.target.value);

    if (Roomamountfilter?.length != 0) {
      const selectedRoomRent = Roomamountfilter[0]?.bed_amount;

      if (editMode && e.target.value == initialStateAssign.bed) {
        setAmount(initialStateAssign.amount);
      } else {
        setAmount(selectedRoomRent);
      }
    }

    if (e.target.value === "Selected a Bed" && e.target.value === "") {
      setBedError("Please select a valid Bed");
    } else {
      setBedError("");
    }
    setBedError("");
    setFormError("");
  };
  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };
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
      value === "Select a PG"
      // (value === "Select a floor" && value === "") ||
      // (value === "Select a room" && value === "") ||
      // (value === "Select a bed" && value === "")
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
        // case "floor":
        //   setfloorError("Floor is required");
        //   break;
        // case "room":
        //   setRoomError("Room is required");
        //   break;
        // case "bed":
        //   setBedError("Bed is required");
        //   break;
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
        // case "floor":
        //   setfloorError("");
        //   break;
        // case "room":
        //   setRoomError("");
        //   break;
        // case "bed":
        //   setBedError("");
        //   break;
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
  const handleSubmit = () => {
    const isFirstnameValid = validateAssignField(firstName, "firstName");
    const isjoiningDateValid = validateAssignField(joiningDate, "joiningDate");
    const isamountValid = validateAssignField(amount, "amount");
    const isphoneValid = validateAssignField(Phone, "Phone");
    const isHostelValid = validateAssignField(HostelIds, "paying");
    const isaddressValid = validateAssignField(Address, "Address");

    if (
      !isFirstnameValid ||
      !isjoiningDateValid ||
      !isamountValid ||
      !isphoneValid ||
      !isaddressValid ||
      !isHostelValid
    ) {
      return;
    }



    // Check for 'file' object and print details
    if (file instanceof File || file instanceof Blob) {

    } else {
      console.log("ProfileImage Value:", JSON.stringify(file, null, 2));
    }



    // Check if any values have changed
    const isValidDate = (date) => !isNaN(Date.parse(date));

    const isChangedBed =
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
      ((file instanceof File || file instanceof Blob) &&
        file.name !== initialStateAssign.file?.name) || // Correct file comparison
      file !== initialStateAssign.file;

    if (!isChangedBed) {
      setFormError("No changes detected.");
      return;
    } else {
      setFormError("");
    }

    // Format the date correctly
    let formattedDate = null;
    try {
      let date = new Date(joiningDate);
      date.setDate(date.getDate() + 1); // Add 1 day to fix timezone issues
      formattedDate = date.toISOString().split("T")[0];
    } catch (error) {
      setDateError("Date is required.");
      console.error(error);
      return;
    }

    // Normalize phone number
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");

    // Dispatch action
    dispatch({
      type: "ADD_BOOKING",
      payload: {
        f_name: firstName,
        l_name: lastName,
        joining_date: formattedDate,
        amount: amount,
        hostel_id: HostelIds,
        mob_no: normalizedPhoneNumber,
        email_id: Email,
        address: Address,
        profile: file,
        id: id,
      },
    });

    // Reset form state
    setFormEdit(false);
  };

  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleDotsClick = (id,event) => {
    setActiveDotsId((prevId) => (prevId === id ? null : id));

    const { top, left, width, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });


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
    dispatch({ type: "GET_BOOKING_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });
  }, []);
  useEffect(() => {
    setCustomers(state.Booking.CustomerBookingList.bookings);
  }, state.Booking.CustomerBookingList.bookings);

  useEffect(() => {
    if (state?.Booking?.bookingPhoneError) {
      // setvalidPhoneError(state?.Booking?.bookingPhoneError)
      setTimeout(() => {

        dispatch({ type: "CLEAR_PHONE_ERROR" })
      }, 2000)

    }
  }, [state?.Booking?.bookingPhoneError])

  useEffect(() => {
    if (state?.Booking?.bookingEmailError) {
      // setvalidEmailError(state?.Booking?.bookingEmailError)
      setTimeout(() => {
        dispatch({ type: "CLEAR_EMAIL_ERROR" })
      }, 2000)

    }
  }, [state?.Booking?.bookingEmailError])


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
      dispatch({ type: "GET_BOOKING_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForDeleteBooking]);
  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      dispatch({ type: "CLEAR_EMAIL_ERROR" })
      dispatch({ type: "CLEAR_PHONE_ERROR" })
      handleCloseForm()

      dispatch({ type: "GET_BOOKING_LIST", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBooking]);



  const [file, setFile] = useState(null);



  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 800,
        useWebWorker: true
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setFile(compressedFile);
      } catch (error) {
        console.error('Image compression error:', error);
      }
    }
  };

  const popupRef = useRef(null);
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // const itemsPerPage = 7;
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = props.filteredUsers?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
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
                  <MdError />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{bookingPermissionError}</span>
                </div>
              )}
            </div></>
        ) :
          <div className="p-10" style={{ marginLeft: "-20px" }}>
            <div>
              {currentItems?.length > 0 ? (
                <div
                  className="p-10 booking-table-userlist"
                  style={{ paddingBottom: "20px" }}
                >
                  <div
                    style={{
                      // height: "400px",
                      height: currentItems.length >= 6 ? "380px" : "auto",
                      overflowY: currentItems.length >= 6 ? "auto" : "visible",
                      borderRadius: "24px",
                      border: "1px solid #DCDCDC",
                      // borderBottom:"none"
                    }}>

                    <Table
                      className="Table_Design"
                      responsive="md"
                      style={{ border: "1px solid #DCDCDC", borderBottom: "1px solid transparent", borderEndStartRadius: 0, borderEndEndRadius: 0 }}
                    >
                      <thead
                        style={{
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
                              color: "#4B4B4B",
                              fontSize: "14px",
                              fontWeight: 500,
                              fontFamily: "Gilroy",
                              background: "#E7F1FF",
                              border: "none",
                              borderTopLeftRadius: 24,
                              paddingLeft: "20px"
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

                          let Dated = new Date(customer.joining_date);
                          let day = Dated.getDate();
                          let month = Dated.getMonth();
                          let year = Dated.getFullYear();

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

                          let formattedMonth = monthNames[month];

                          let formattedDate = `${year} ${formattedMonth} ${day}`;


                          let createDated = new Date(customer.createdat);

                          let day1 = createDated.getDate();
                          let month1 = createDated.getMonth();
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

                              <td style={{verticalAlign: "middle"}}>
                                <div className="d-flex align-items-center">
                                  {/* <Image src={customer.avatar} roundedCircle height={40} width={40} alt="avatar" /> */}
                                  <span
                                    style={{
                                      fontSize: "16px",
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",
                                      color: "#222222",
                                      paddingLeft: "4px",
                                      textAlign: "start",
                                      
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
                                  verticalAlign: "middle"
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
                                  verticalAlign: "middle"
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
                                  verticalAlign: "middle"
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
                                    verticalAlign: "middle"
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
                                  verticalAlign: "middle"
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
                                    verticalAlign: "middle"
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
                                  verticalAlign: "middle",
                                  verticalAlign: "middle"
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
                                    verticalAlign: "middle"
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
                                    zIndex:activeDotsId === customer.id ? 1000 : "auto",
                                      backgroundColor: activeDotsId === customer.id   ? "#E7F1FF" : "white",
                                  }}
                                  onClick={(e) => handleDotsClick(customer.id,e)}
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
                                        position: "fixed",
                                        top: currentItems.length >= 6 ?  popupPosition.top : "auto",
                                        left: currentItems.length >= 6 ? popupPosition.left :  popupPosition.left - 10,
                                        
                                        // top: popupPosition.top,
                                        // left: popupPosition.left,
                                        // right: 0,
                                        // top: 50,
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
                                        // onClick={() => {
                                        //   if (bookingEditPermissionError) {
                                        //     handleEdit(customer);
                                        //   }
                                        // }}
                                        onClick={() => handleEdit(customer)}
                                        style={{
                                          cursor: bookingEditPermissionError ? "not-allowed" : "pointer",
                                          pointerEvents: bookingEditPermissionError ? "none" : "auto",
                                          opacity: bookingEditPermissionError ? 0.5 : 1,
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
                                          cursor: bookingDeletePermissionError ? "not-allowed" : "pointer",
                                          pointerEvents: bookingDeletePermissionError ? "none" : "auto",
                                          opacity: bookingDeletePermissionError ? 0.5 : 1,
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
                  </div>

                  {currentItems?.length > 0 && (
                    //  <nav
                    //                       style={{
                    //                         display: "flex",
                    //                         alignItems: "center",
                    //                         justifyContent: "end", 
                    //                         padding: "10px",

                    //                       }}
                    //                     >

                    //                       <div>
                    //                         <select
                    //                           value={itemsPerPage}
                    //                           onChange={handleItemsPerPageChange}
                    //                           style={{
                    //                             padding: "5px",
                    //                             border: "1px solid #1E45E1",
                    //                             borderRadius: "5px",
                    //                             color: "#1E45E1",
                    //                             fontWeight: "bold",
                    //                             cursor: "pointer",
                    //                             outline: "none",
                    //                             boxShadow: "none",

                    //                           }}
                    //                         >
                    //                            <option value={5}>5</option>
                    //                           <option value={10}>10</option>
                    //                           <option value={50}>50</option>
                    //                           <option value={100}>100</option>
                    //                         </select>
                    //                       </div>


                    //                       <ul
                    //                         style={{
                    //                           display: "flex",
                    //                           alignItems: "center",
                    //                           listStyleType: "none",
                    //                           margin: 0,
                    //                           padding: 0,
                    //                         }}
                    //                       >

                    //                         <li style={{ margin: "0 10px" }}>
                    //                           <button
                    //                             style={{
                    //                               padding: "5px",
                    //                               textDecoration: "none",
                    //                               color: currentPage === 1 ? "#ccc" : "#1E45E1",
                    //                               cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    //                               borderRadius: "50%",
                    //                               display: "inline-block",
                    //                               minWidth: "30px",
                    //                               textAlign: "center",
                    //                               backgroundColor: "transparent",
                    //                               border: "none",
                    //                             }}
                    //                             onClick={() => handlePageChange(currentPage - 1)}
                    //                             disabled={currentPage === 1}
                    //                           >
                    //                             <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                    //                           </button>
                    //                         </li>


                    //                         <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                    //                           {currentPage} of {totalPages}
                    //                         </li>


                    //                         <li style={{ margin: "0 10px" }}>
                    //                           <button
                    //                             style={{
                    //                               padding: "5px",
                    //                               textDecoration: "none",
                    //                               color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                    //                               cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    //                               borderRadius: "50%",
                    //                               display: "inline-block",
                    //                               minWidth: "30px",
                    //                               textAlign: "center",
                    //                               backgroundColor: "transparent",
                    //                               border: "none",
                    //                             }}
                    //                             onClick={() => handlePageChange(currentPage + 1)}
                    //                             disabled={currentPage === totalPages}
                    //                           >
                    //                             <ArrowRight2
                    //                               size="16"
                    //                               color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                    //                             />
                    //                           </button>
                    //                         </li>
                    //                       </ul>
                    //                     </nav>

                    <nav
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end", // Align dropdown and pagination
                        padding: "10px",
                        // borderTop: "1px solid #ddd",
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
                              cursor: currentPage === 1 ? "not-allowed" : "pointer",
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
                            <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                          </button>
                        </li>

                        {/* Current Page Indicator */}
                        <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                          {currentPage} of {totalPages}
                        </li>

                        {/* Next Button */}
                        <li style={{ margin: "0 10px" }}>
                          <button
                            style={{
                              padding: "5px",
                              textDecoration: "none",
                              color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
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
                              color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                            />
                          </button>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              ) : (
                <div style={{ marginTop: 30 }}>
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
        formEdit={formEdit}
        HostelID={props.uniqueostel_Id}
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
        HostelID={props.uniqueostel_Id}
      />

      <Modal
        show={formEdit}
        onHide={handleCloseForm}
        centered
        backdrop="static"
      >
        <Modal.Header className="d-flex justify-content-between">
          <Modal.Title style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}>Edit Booking</Modal.Title>
          <CloseCircle
            size="32"
            color="#222222"
            onClick={handleCloseForm}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>
          <div className='d-flex align-items-center'>

            <div className="" style={{ height: 100, width: 100, position: "relative" }}>
              <Image
                src={
                  file && (file === "0" || file === 0) // Check if file is "0" or number 0
                    ? Profile2
                    : file instanceof File || file instanceof Blob
                      ? URL.createObjectURL(file)
                      : file || Profile2 // Fallback to file or Profile2
                }
                roundedCircle
                style={{ height: 100, width: 100 }}
              />



              <label htmlFor="imageInput" className='' >
                <Image src={Plus} roundedCircle style={{ height: 20, width: 20, position: "absolute", top: 90, left: 80, transform: 'translate(-50%, -50%)' }} />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  id="imageInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }} />
              </label>

            </div>
            <div className='ps-3'>
              <div>
                <label style={{ fontSize: 16, fontWeight: 500, color: "#222222", fontFamily: "Gilroy" }}>Profile Photo</label>
              </div>
              <div>
                <label style={{ fontSize: 14, fontWeight: 500, color: "#4B4B4B", fontFamily: "Gilroy" }}>Max size of image 10MB</label>
              </div>
            </div>
          </div>
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
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{firstNameError}</span>
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
                    // onChange={handleCountryCodeChange}
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
                    <option>+{countryCode}</option>
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
                    <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{phoneError}</span>
                  </div>
                )}
                {phonenumError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{phonenumError}</span>
                  </div>
                )}
                {phoneErrorMessage && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{phoneErrorMessage}</span>
                  </div>
                )}
                {state?.Booking?.bookingPhoneError && (
                  <div style={{ color: "red" }}>
                    <MdError />
                    <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{state?.Booking?.bookingPhoneError}</span>
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
                  Email address <span
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
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{emailError}</span>
                </div>
              )}
              {emailIdError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {emailIdError}</span>
                </div>
              )}
              {emailErrorMessage && (
                <div style={{ color: "red" }}>
                  <MdError />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>  {emailErrorMessage}</span>
                </div>
              )}
              {state?.Booking?.bookingEmailError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {state?.Booking?.bookingEmailError}</span>
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
                Address
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
                <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {addressError}</span>
              </div>
            )}
          </Col>
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
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{dateError}</span>
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
                  Booking Amount{" "}
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
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{amountError}</span>
                </div>
              )}
            </Col>
          </Row>
          {/* <Row>
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
          </Row> */}

          {/* <Row>
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
          </Row> */}
          {/* <Col md={12}>
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
          </Col> */}

          {/* <Form.Group controlId="formComments" className="mb-3">
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
          )} */}


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
            Delete Booking?
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
          Are you sure you want to delete this Booking?
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

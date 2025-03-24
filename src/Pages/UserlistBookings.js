/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Image,
  Modal,
  Form,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import "./Userlistbooking.css";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from "../Assets/Images/New_images/trash.png";
import Edit from "../Assets/Images/New_images/edit.png";
import { CloseCircle } from "iconsax-react";
import "react-toastify/dist/ReactToastify.css";
import BookingModal from "./Addbookingform";
import AssignBooking from "./Assignbooking";
import check from "../Assets/Images/add-circle.png";
import { ArrowLeft2, ArrowRight2 } from "iconsax-react";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { useDispatch, useSelector } from "react-redux";
import "flatpickr/dist/themes/material_blue.css";
import { MdError } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import imageCompression from "browser-image-compression";
import Plus from "../Assets/Images/New_images/addplus-circle.svg";
import Profile2 from "../Assets/Images/New_images/profile-picture.png";
import moment from "moment";
import PropTypes from "prop-types";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

function Booking(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [activeDotsId, setActiveDotsId] = useState(null);
  const [modalType, setModalType] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [amount, setAmount] = useState("");
  const [firstNameError, setfirstNameError] = useState("");
  const [dateError, setDateError] = useState("");
  const [amountError, setamountError] = useState("");
  const [formError, setFormError] = useState("");
  const [formEdit, setFormEdit] = useState(false);
  const [HostelIds, setHostelIds] = useState("");
  const [id, setId] = useState("");
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [assignBooking, setAssignBooking] = useState("");
  const [Phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [Address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  const [Email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [bookingPermissionError, setBookingPermissionError] = useState("");
  const [bookingEditPermissionError, setBookingEditPermissionError] =
    useState("");
  const [bookingDeletePermissionError, setBookingDeletePermissionError] =
    useState("");
    const [loader,setLoader] = useState(false)
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
  const [customerBooking,setCustomerBooking] = useState([])

  useEffect(() => {
    if(state.login.selectedHostel_Id){
      setLoader(true)
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
   
  }, [state.login.selectedHostel_Id]);
  useEffect(() => {
    if (state.Booking.statusCodeGetBooking === 200) {
      setLoader(false)
      setCustomerBooking(state.Booking.CustomerBookingList.bookings);
      setTimeout(() => {
        dispatch({ type: "CLEAR_BOOKING_LIST" });
      }, 2000);
    }
  }, [state.Booking.statusCodeGetBooking]);

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[5]?.per_view === 1
    ) {
      setBookingPermissionError("");
    } else {
      setBookingPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[5]?.per_edit === 1
    ) {
      setBookingEditPermissionError("");
    } else {
      setBookingEditPermissionError("Permission Denied");
    }
  }, [props.customerrolePermission]);

  useEffect(() => {
    if (
      props.customerrolePermission[0]?.is_owner === 1 ||
      props.customerrolePermission[0]?.role_permissions[5]?.per_delete === 1
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
      setJoiningDate(item.joining_date || "");
      // const formattedJoiningDate = item.joining_date
      //   ? new Date(item.joining_date)
      //   : null;
      // setJoiningDate(formattedJoiningDate);
      setJoiningDate(
        item.joining_date ? moment(item.joining_date).toDate("") : null
      );
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
        joiningDate: item.joining_date || "",
        amount: item.amount || "",
        paying: item.hostel_id || "",
        file: item.profile || "",
      });

    
    }
  };

  // useEffect(() => {
  //   dispatch({ type: "HOSTELLIST" });
  // }, []);

 
 

  const handleFirstName = (e) => {
const value = e.target.value;
const pattern = /^[a-zA-Z\s]*$/;
if (!pattern.test(value)) {
  return;
}
    setFirstName(value);
    setfirstNameError("");
    setFormError("");
  };
  const handleEmail = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);

    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);
    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");

    } else if (!isValidEmail) {
      setEmailErrorMessage("");
      setEmailError("Invalid Email ID");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };
  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setLastName(value);
    setFormError("");
  };

 
  const handleAmount = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return; 
    }
    setAmount(newAmount);
    setamountError("");
    setFormError("");
  };

  
  
  useEffect(() => {
    if (state.Booking.bookingError) {
      setPhoneError(state.Booking.bookingError);
    }
  }, [state.Booking.bookingError]);

  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, ""); 
    setPhone(input);
  
    if (input.length === 0) {
      setPhoneError(""); 
    } else if (input.length < 10) {
      setPhoneError("Invalid Mobile Number");
    } else if (input.length === 10) {
      setPhoneError(""); 
    }
  
    setPhoneErrorMessage("");
    setFormError("")
    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };
  // const handlePhone = (e) => {
  //   const input = e.target.value.replace(/\D/g, ""); 
  //   setPhone(input);
  
  //   const isValidMobileNo = /^\d{10}$/.test(input);
  
  //   if (isValidMobileNo) {
  //     setPhoneError("");
  //   } else {
  //     setPhoneError("Invalid mobile number *");
  //   }
  
  //   setPhoneErrorMessage("");
  //   setFormError("");
  //   dispatch({ type: "CLEAR_PHONE_ERROR" });
  // };
 
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
          setfirstNameError("First Name is Required");
          break;
        case "joiningDate":
          setDateError("Joining Date ID is Required");
          break;
        case "amount":
          setamountError("Amount is Required");
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
          setAddressError("Address is Required");
          break;
        case "Email":
          setEmailError("Email is Required");
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
    let hasError = false;
    const isFirstnameValid = validateAssignField(firstName, "firstName");
    const isjoiningDateValid = validateAssignField(joiningDate, "joiningDate");
    const isamountValid = validateAssignField(amount, "amount");
    const isphoneValid = validateAssignField(Phone, "Phone");
    const isHostelValid = validateAssignField(HostelIds, "paying");
    const isaddressValid = validateAssignField(Address, "Address");



    
    if (!Phone) {
      setPhoneError("Mobile Number is Required");
      hasError = true;
    }
    else if (Phone.length !== 10) {
      setPhoneError("Please Enter Valid Mobile Number");
      hasError = true;
    } else {
      setPhoneError(""); 
    }

    if (Email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(Email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter a Valid Email ID");
        hasError = true;
      } else {
        setEmailError("");
      }
    } else {
      setEmailError(""); 
    }
    
    if (hasError) return;

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
      setFormError("No Changes Detected");
      return;
    } else {
      setFormError("");
    }

    // Format the date correctly
    const formattedDate = moment(joiningDate).format("YYYY-MM-DD");

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

  const handleDotsClick = (id, event) => {
    setActiveDotsId((prevId) => (prevId === id ? null : id));

    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 200;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleCloseForm = () => {
    setFormEdit(false);
    setFormError("");
    setPhone("");
    setPhoneError("");
    setAddress("");
    setAddressError("");
    setfirstNameError("");
    setDateError("");
    setamountError("");
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





  const handleModalClose = () => {
    setModalType(null);
    setSelectedCustomer(null);
  };

  

 

  useEffect(() => {
    if (state?.Booking?.bookingPhoneError) {
      // setvalidPhoneError(state?.Booking?.bookingPhoneError)
      setTimeout(() => {
        dispatch({ type: "CLEAR_PHONE_ERROR" });
      }, 2000);
    }
  }, [state?.Booking?.bookingPhoneError]);

  useEffect(() => {
    if (state?.Booking?.bookingEmailError) {
      // setvalidEmailError(state?.Booking?.bookingEmailError)
      setTimeout(() => {
        dispatch({ type: "CLEAR_EMAIL_ERROR" });
      }, 2000);
    }
  }, [state?.Booking?.bookingEmailError]);

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
      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForDeleteBooking]);
  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {
      dispatch({ type: "CLEAR_EMAIL_ERROR" });
      dispatch({ type: "CLEAR_PHONE_ERROR" });
      handleCloseForm();

      dispatch({
        type: "GET_BOOKING_LIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
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
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(fileImage, options);
        setFile(compressedFile);
      } 
      catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  const popupRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);

  // const itemsPerPage = 7;
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = props.filteredUsers?.slice(
  //   indexOfFirstItem,
  //   indexOfLastItem
  // );
  // const currentItems =
  // props.filterInput.length > 0
  //   ? props.filteredUsers
  //   : customerBooking?.slice(indexOfFirstItem, indexOfLastItem);
  const currentItems =
  props.search || props.filterStatus || props.bookingDateRange?.length === 2
    ? props.filteredUsers?.slice(indexOfFirstItem, indexOfLastItem)
    : customerBooking?.slice(indexOfFirstItem, indexOfLastItem);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1)
  };
  useEffect(() => {
    if (props.resetPage) {
      setCurrentPage(1);
      props.setResetPage(false); 
    }
  }, [props.resetPage]);

  // const totalPages = Math.ceil(customerBooking?.length / itemsPerPage);
  const totalPages = Math.ceil(
    (props.search || props.filterStatus ? props.filteredUsers?.length : customerBooking?.length) / itemsPerPage
  );



  return (
    <>
      {bookingPermissionError ? (
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
                <span
                  style={{
                    fontSize: "12px",
                    color: "red",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {bookingPermissionError}
                </span>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="p-10" style={{ marginLeft: "-20px" }}>
          <div>
          {loader ? (
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
) : currentItems?.length > 0 ? (
 
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
                    borderRight: "1px solid transparent",
                    // borderBottom:"none"
                  }}
                >
                  <Table
                    className="Table_Design"
                    responsive="md"
                    style={{
                      border: "1px solid #DCDCDC",
                      borderBottom: "1px solid transparent",
                      borderEndStartRadius: 0,
                     
                      borderEndEndRadius: 0,
                    }}
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
                            color: "rgb(147, 147, 147)",
                            fontSize: "14px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            borderTopLeftRadius: 24,
                            paddingLeft: "20px",
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
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
                            color: "rgb(147, 147, 147)",
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
                            color: "rgb(147, 147, 147)",
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
                            color: "rgb(147, 147, 147)",
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
                            color: "rgb(147, 147, 147)",
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
                            color: "rgb(147, 147, 147)",
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

                        let formattedDate = `${day} ${formattedMonth} ${year}`;

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
                        let formattedDatecreate = `${day1} ${formattedMonthjj} ${year1}`;

                        return (
                          <tr key={customer.id} className="customer-row">
                            <td style={{ verticalAlign: "middle" }}>
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
                                  {customer.first_name} {customer.last_name ? customer.last_name : ""}
                                  {/* {`${customer.first_name || ""} ${customer.last_name || ""}`.trim() || ""} */}

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
                                verticalAlign: "middle",
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
                                fontSize: "16px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                color: "#000000",
                                textAlign: "start",
                                verticalAlign: "middle",
                              }}
                            >
                              +
                              {customer &&
                                String(customer.phone_number).slice(
                                  0,
                                  String(customer.phone_number).length - 10
                                )}{" "}
                              {customer &&
                                String(customer.phone_number).slice(-10)}
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
                                  verticalAlign: "middle",
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
                                verticalAlign: "middle",
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
                                  verticalAlign: "middle",
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
                                  verticalAlign: "middle",
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
                                  // zIndex:
                                  //   activeDotsId === customer.id
                                  //     ? 1000
                                  //     : "auto",
                                  backgroundColor:
                                    activeDotsId === customer.id
                                      ? "#E7F1FF"
                                      : "white",
                                }}
                                onClick={(e) => handleDotsClick(customer.id, e)}
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
                                      top:
                                        currentItems.length >= 1
                                          ? popupPosition.top
                                          : "auto",
                                      left:
                                        currentItems.length >= 1
                                          ? popupPosition.left
                                          : popupPosition.left - 10,

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
                                      boxShadow:
                                        "0px 4px 6px rgba(0, 0, 0, 0.1)",
                                    }}
                                  >
                                    <div
                                      className="mb-2 d-flex align-items-center"
                                      onClick={() => {
                                        if (
                                          !props.customerBookingAddPermission
                                        ) {
                                          handleCheckin(customer);
                                        }
                                      }}
                                      style={{
                                        cursor:
                                          props.customerBookingAddPermission
                                            ? "not-allowed"
                                            : "pointer",
                                        pointerEvents:
                                          props.customerBookingAddPermission
                                            ? "none"
                                            : "auto",
                                        opacity:
                                          props.customerBookingAddPermission
                                            ? 0.5
                                            : 1,
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
                                          cursor: "pointer"
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
                                        cursor: bookingEditPermissionError
                                          ? "not-allowed"
                                          : "pointer",
                                        pointerEvents:
                                          bookingEditPermissionError
                                            ? "none"
                                            : "auto",
                                        opacity: bookingEditPermissionError
                                          ? 0.5
                                          : 1,
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
                                          cursor: "pointer"
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
                                        cursor: bookingDeletePermissionError
                                          ? "not-allowed"
                                          : "pointer",
                                        pointerEvents:
                                          bookingDeletePermissionError
                                            ? "none"
                                            : "auto",
                                        opacity: bookingDeletePermissionError
                                          ? 0.5
                                          : 1,
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
                                          cursor: "pointer"
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

               
              </div>
) : (
  
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
      No Bookings available
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
      There are no Bookings added.
    </div>
  </div>
)}


{((props.search || props.filterStatus) ? props.filteredUsers?.length : customerBooking?.length) >= 5 && (
                

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
                )}
          </div>
        </div>
      )}

      {/* Booking Modal (Add/Edit) */}
      <BookingModal
        show={modalType === "edit" || modalType === "add"}
        handleClose={handleModalClose}
        mode={modalType} // 'edit' or 'add'
        customer={selectedCustomer}
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
          <Modal.Title
            style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}
          >
            Edit Booking
          </Modal.Title>
          <CloseCircle
            size="32"
            color="#222222"
            onClick={handleCloseForm}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <div
              className=""
              style={{ height: 100, width: 100, position: "relative" }}
            >
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

              <label htmlFor="imageInput" className="">
                <Image
                  src={Plus}
                  roundedCircle
                  style={{
                    height: 20,
                    width: 20,
                    position: "absolute",
                    top: 90,
                    left: 80,
                    transform: "translate(-50%, -50%)",
                  }}
                />
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  id="imageInput"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>
            <div className="ps-3">
              <div>
                <label
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    color: "#222222",
                    fontFamily: "Gilroy",
                  }}
                >
                  Profile Photo
                </label>
              </div>
              <div>
                <label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                  }}
                >
                  Max size of image 10MB
                </label>
              </div>
            </div>
          </div>
          <Row className="">
            <Col md={6}>
              <Form.Group controlId="formFirstName">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  First Name{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter First Name"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                  }}
                  value={firstName}
                  // className={formErrors.firstName ? "is-invalid" : ""}
                  onChange={(e) => handleFirstName(e)}
                />
              </Form.Group>
              {firstNameError && (

                <div style={{ color: "red" }}>
                  <MdError style={{ marginRight: "5px", fontSize: 13 }} />
                  <span style={{ fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{firstNameError}</span>
                </div>
              )}
            </Col>
            
             <Col md={6} className="">
                          <Form.Group controlId="formLastName" >
                            <Form.Label
                              style={{
                                fontSize: 14,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              Last Name{" "}
                            
                            </Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter Last Name"
                              style={{
                                fontSize: 14,
                                color: "rgba(75, 75, 75, 1)",
                                fontFamily: "Gilroy",
                                height: "50px",
                                marginTop:5
                              }}
                              value={lastName}
                              // isInvalid={!!formErrors.lastName}
                              onChange={(e) => handleLastName(e)}
                            />
                          </Form.Group>
                        </Col>
          </Row>

          <Row className="mb-0">
            <Col md={6} className="mb-0">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Mobile Number{" "}
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
                  style={{ color: "red", fontSize: 11, }}
                ></p>
                {phoneError && (

                  <div style={{ color: "red", marginTop: "-15px" }}>
                    <MdError style={{ marginRight: "5px", fontSize: 13 }} />
                    <span style={{ fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{phoneError}</span>
                  </div>

                )}
               
                {phoneErrorMessage && (
                  <div style={{ color: "red", marginTop: "-10px" }}>
                    <MdError style={{ marginRight: "5px", fontSize: 13 }} />
                    <span style={{ fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{phoneErrorMessage}</span>
                  </div>
                )}
                {state?.Booking?.bookingPhoneError && (
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
                      {state?.Booking?.bookingPhoneError}
                    </span>
                  </div>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="formLastName" className="mb-0">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Email ID{" "}

                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  style={{
                    fontSize: 14,
                    color: "rgba(75, 75, 75, 1)",
                    fontFamily: "Gilroy",
                    height: "50px",
                    marginTop: 6
                  }}
                  value={Email}
                  // isInvalid={!!formErrors.lastName}
                  onChange={(e) => handleEmail(e)}
                />
              </Form.Group>
              {emailError && (
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
                    {emailError}
                  </span>
                </div>
              )}
            
              {emailErrorMessage && (
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
                    {emailErrorMessage}
                  </span>
                </div>
              )}
              {state?.Booking?.bookingEmailError && (
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
                    {state?.Booking?.bookingEmailError}
                  </span>
                </div>
              )}
            </Col>
          </Row>
          <Col md={12} className="mb-0">
            <Form.Group controlId="formFirstName" className="mb-0">
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
                // className={formErrors.firstName ? "is-invalid" : ""}
                onChange={(e) => handleAddress(e)}
              />
            </Form.Group>
            {addressError && (

              <div style={{ color: "red", marginTop: "-7px" }}>
                <MdError style={{ marginRight: "5px", fontSize: 13 }} />
                <span style={{ fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{addressError}</span>
              </div>
            )}
          </Col>
          <Row>
            <Col md={6}>
            <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Joining Date{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  {/* <span style={{ color: 'red', fontSize: '20px' }}>*</span> */}
                </Form.Label>
               
                 <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                  <DatePicker
                    style={{ width: "100%", height: 48 }}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={joiningDate ? dayjs(joiningDate) : null}
                    onChange={(date) => {
                      setDateError("");
                      setFormError("");
                      setJoiningDate(date ? date.toDate() : null);
                    }}
                    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
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
            </Col>
            <Col md={6}className="mb-3">
              <Form.Group >
                <Form.Label
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Booking Amount{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                  
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
                <MdError style={{ marginRight: "5px", fontSize: 13 }} />
                <span style={{ fontSize: 13, fontFamily: "Gilroy", fontWeight: 500 }}>{amountError}</span>
              </div>
              )}
            </Col>
          </Row>


          {formError && (
            <div className="d-flex align-items-center justify-content-center" style={{ color: "red" }}>
              <MdError style={{fontSize:"14px",marginRight:"5px"}}/>
              <span style={{fontSize:"14px"}}>{formError}</span>
            </div>
          )}
          <Modal.Footer style={{borderTop:"none"}}>
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
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
          className="w-100 text-center"
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",
              
              fontWeight: 600,
              color: "#222222",
              
            }}
          >
            Delete Booking?
          </Modal.Title>
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
          Are you sure you want to delete this Booking?
        </Modal.Body>

        <Modal.Footer
        className="d-flex justify-content-center"
          style={{
           
            borderTop: "none",
            marginTop: "-10px",
          }}
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
            onClick={handleDeleteBooking}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
Booking.propTypes = {
  customerrolePermission: PropTypes.func.isRequired,
  uniqueostel_Id: PropTypes.func.isRequired,
  filterInput: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  customerBookingAddPermission: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  filteredUsers: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  filterStatus: PropTypes.func.isRequired,
  bookingDateRange: PropTypes.func.isRequired,
  resetPage: PropTypes.func.isRequired,
  setResetPage: PropTypes.func.isRequired,
};
export default Booking;

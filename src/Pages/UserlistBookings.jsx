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
import { CloseCircle, ArrowUp2, ArrowDown2, } from "iconsax-react";
import Select from "react-select";

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
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("")
  const [state_name, setStateName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
    const [Email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [bookingPermissionError, setBookingPermissionError] = useState("");
  const [bookingEditPermissionError, setBookingEditPermissionError] =
    useState("");
  const [bookingDeletePermissionError, setBookingDeletePermissionError] =
    useState("");
  const [loader, setLoader] = useState(false)
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
    house_no: '',
    street: '',
    city: '',
    pincode: '',
    landmark: '',
    state: '',
  });


  const indianStates = [
    { value: "Andhra Pradesh", label: "Andhra Pradesh" },
    { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
    { value: "Assam", label: "Assam" },
    { value: "Bihar", label: "Bihar" },
    { value: "Chhattisgarh", label: "Chhattisgarh" },
    { value: "Goa", label: "Goa" },
    { value: "Gujarat", label: "Gujarat" },
    { value: "Haryana", label: "Haryana" },
    { value: "Himachal Pradesh", label: "Himachal Pradesh" },
    { value: "Jharkhand", label: "Jharkhand" },
    { value: "Karnataka", label: "Karnataka" },
    { value: "Kerala", label: "Kerala" },
    { value: "Madhya Pradesh", label: "Madhya Pradesh" },
    { value: "Maharashtra", label: "Maharashtra" },
    { value: "Manipur", label: "Manipur" },
    { value: "Meghalaya", label: "Meghalaya" },
    { value: "Mizoram", label: "Mizoram" },
    { value: "Nagaland", label: "Nagaland" },
    { value: "Odisha", label: "Odisha" },
    { value: "Punjab", label: "Punjab" },
    { value: "Rajasthan", label: "Rajasthan" },
    { value: "Sikkim", label: "Sikkim" },
    { value: "Tamil Nadu", label: "Tamil Nadu" },
    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
    { value: "Chandigarh", label: "Chandigarh" },
    { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
  ];

  useEffect(() => {
    setHostelIds(props.uniqueostel_Id);
  }, [props.uniqueostel_Id]);
  const [customerBooking, setCustomerBooking] = useState([])

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
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
            setHouseNo(item.address || '');
      setStreet(item.area || '');
      setLandmark(item.landmark || '')
      setPincode(item.pin_code || '');
      setCity(item.city || '');
      setStateName(item.state || '')

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
        house_no: item.address || '',
        street: item.area || '',
        city: item.city || '',
        pincode: item.pin_code || '',
        landmark: item.landmark || '',
        state: item.state || '',
      });


    }
  };

  




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
 

  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("")
    setFormError("");
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");
    setFormError("");
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
    setFormError("");
  }

  

  const handlePinCodeChange = (e) => {
    const value = e.target.value;
    if (!/^\d{0,6}$/.test(value)) {
      return;
    }

    setPincode(value);
    if (value.length > 0 && value.length < 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
    } else {
      setPincodeError("");
      setFormError("");
    }

   
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setCityError("");
    setFormError("");
  }

  

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };
  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Select a PG"
      
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
                case "City":
          setCityError("Please Enter City");
          break;
        case "Pincode":
          setPincodeError("Please Enter Pincode");
          break;
        case "Statename":
          setStateNameError("Please Select State");
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
            case "City":
          setCityError("");
          break;
        case "Pincode":
          setPincodeError("");
          break;
        case "Statename":
          setStateNameError("");
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
       const isCityValid = validateAssignField(city, "City");
    const isPincodeValid = validateAssignField(pincode, "Pincode");
    const isStatenameValid = validateAssignField(state_name, "Statename");



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
      !isHostelValid ||
      !isCityValid ||
      !isPincodeValid ||
      !isStatenameValid
    ) {
      return;
    }



    
    const isValidDate = (date) => !isNaN(Date.parse(date));

    const normalize = (value) => {
      const val = (value ?? "").toString().trim().toLowerCase();
      return val === "null" || val === "undefined" ? "" : val;
    };


    const isChangedBed =
      (isValidDate(joiningDate) && isValidDate(initialStateAssign.joiningDate)
        ? new Date(joiningDate).toISOString().split("T")[0] !==
        new Date(initialStateAssign.joiningDate).toISOString().split("T")[0]
        : joiningDate !== initialStateAssign.joiningDate) ||
      Number(amount) !== Number(initialStateAssign.amount) ||
      String(firstName) !== String(initialStateAssign.firstName) ||
            String(Email) !== String(initialStateAssign.Email) ||
      Number(countryCode + Phone) !== Number(initialStateAssign.Phone) ||
      String(lastName) !== String(initialStateAssign.lastName) ||
      ((file instanceof File || file instanceof Blob) &&
        file.name !== initialStateAssign.file?.name) || 
      file !== initialStateAssign.file ||
      String(pincode).trim() !== String(initialStateAssign.pincode || "").trim() ||

      normalize(house_no) !== normalize(initialStateAssign.house_no) ||
      normalize(street) !== normalize(initialStateAssign.street) ||
      normalize(landmark) !== normalize(initialStateAssign.landmark) ||
      city !== initialStateAssign.city ||
      state_name !== initialStateAssign.state;

    if (!isChangedBed) {
      setFormError("No Changes Detected");
      return;
    } else {
      setFormError("");
    }

    
    const formattedDate = moment(joiningDate).format("YYYY-MM-DD");

    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");

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
        address: house_no,
        area: street,
        landmark: landmark,
        city: city,
        pin_code: pincode,
        state: state_name,
        profile: file,
        id: id,
      },

    });


   
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
    setHouseNo("")
    setStreet("")
    setCity("")
    setLandmark("")
    setPincode("")
    setStateName("")
    setFormEdit(false);
    setFormError("");
    setPhone("");
    setPhoneError("");
        setfirstNameError("");
    setDateError("");
    setamountError("");
    setStateNameError("");
    setPincodeError("");
    setCityError("");
    setLandmarkError("");
    setStreetError("");
    setHouse_NoError("");
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
           setTimeout(() => {
        dispatch({ type: "CLEAR_PHONE_ERROR" });
      }, 2000);
    }
  }, [state?.Booking?.bookingPhoneError]);

  useEffect(() => {
    if (state?.Booking?.bookingEmailError) {
     
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

    const [itemsPerPage, setItemsPerPage] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems =
    props.search || props.filterStatus || props.bookingDateRange?.length === 2
      ? props.filteredUsers?.slice(indexOfFirstItem, indexOfLastItem)
      : customerBooking?.slice(indexOfFirstItem, indexOfLastItem);


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

  
  const totalPages = Math.ceil(
    (props.search || props.filterStatus ? props.filteredUsers?.length : customerBooking?.length) / itemsPerPage
  );

  useEffect(() => {
    if (
      customerBooking.length > 0 &&
      currentItems.length === 0 &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }
  }, [customerBooking])



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
                         }}
          >
           
            <img
              src={Emptystate}
              alt="Empty State"
              style={{ maxWidth: "100%", height: "auto" }}
            />

            
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
) : sortedData?.length > 0 ? (
 
  <div
                className="p-10 booking-table-userlist  booking-table me-4"
                style={{ paddingBottom: "20px" , marginLeft: "5px" }}
              >
                <div

                  className='show-scrolls'
                  style={{

                    height: sortedData?.length >= 8 || sortedData?.length >= 8 ? "350px" : "auto",
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
                    <thead
                      style={{
                        fontFamily: "Gilroy", backgroundColor: "rgba(231, 241, 255, 1)", color: "rgba(34, 34, 34, 1)", fontSize: 14, fontStyle: "normal", fontWeight: 500, position: "sticky",
                        top: 0,
                        zIndex: 1
                      }}
                    >
                      <tr>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                                                       paddingLeft: "20px",
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("first_name", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("first_name", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Name</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            whiteSpace: "nowrap"
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("email_id", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("email_id", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Email ID</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            whiteSpace: "nowrap"
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("phone_number", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("phone_number", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Mobile No</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            whiteSpace: "nowrap"
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("createdat", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("createdat", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Booking Date</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            whiteSpace: "nowrap"
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("joining_date", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("joining_date", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Joining Date</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                          }}
                        >
                          <div className='d-flex gap-1 align-items-center justify-content-start'>
                            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }} >
                              <ArrowUp2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("amount", 'asc')} style={{ cursor: "pointer" }} />
                              <ArrowDown2 size="10" variant="Bold" color="#1E45E1" onClick={() => handleSort("amount", 'desc')} style={{ cursor: "pointer" }} />
                            </div>
                            Amount</div>
                        </th>
                        <th
                          style={{
                            textAlign: "start",
                            padding: "10px",
                            color: "rgb(147, 147, 147)",
                            fontSize: "12px",
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            background: "#E7F1FF",
                            border: "none",
                            paddingBottom:12}}
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedData?.map((customer) => {
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
                            <td style={{    border: "none",
                                            padding: "10px",
                                            textAlign: "start",
                                            paddingLeft: "20px",
                                            verticalAlign: "middle",
                                            borderBottom: "1px solid #E8E8E8",}}>
             
                                <span
                                  style={{
                                 fontSize: "13px",
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              color: "#1E45E1",
                                              cursor: "pointer",
                                              marginTop: 10,
                                                                                           whiteSpace: "nowrap",
                                  
                                  }}
                                  className="customer-name ps-0 ps-sm-0 ps-md-3 ps-lg-3"
                                >
                                  {customer.first_name} {customer.last_name ? customer.last_name : ""}
                                 

                                </span>
                            
                            </td>
                            <td
                              style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                color: "#000000",
                                textAlign: "start",
                                paddingLeft:20,
                                verticalAlign: "middle",borderBottom: "1px solid #E8E8E8"
                              }}
                                className="ps-4 ps-sm-2 ps-md-3 ps-lg-4 "
                            >
                              
                              {customer.email_id ? customer.email_id : "N/A"}
                            </td>
                            

                            <td
                              style={{
                                fontSize: "13px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                                color: "#000000",
                                textAlign: "start",
                                verticalAlign: "middle", borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-4 "
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
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle", borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "11px",
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
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle", borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "11px",
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
                                fontSize: "13px",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                whiteSpace: "nowrap",
                                verticalAlign: "middle", borderBottom: "1px solid #E8E8E8"
                              }}
                               className="ps-4 ps-sm-2 ps-md-3 ps-lg-3"
                            >
                              <span
                                style={{
                                  padding: "3px 10px",
                                  borderRadius: "60px",
                                  backgroundColor: "#EBEBEB",
                                  textAlign: "start",
                                  fontSize: "13px",
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

                            <td style={{ borderBottom: "1px solid #E8E8E8" }}>
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
            )}
          </div>
        </div>
      )}

     
      <BookingModal
        show={modalType === "edit" || modalType === "add"}
        handleClose={handleModalClose}
        mode={modalType} 
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
            size="24"
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
                  file && (file === "0" || file === 0) 
                    ? Profile2
                    : file instanceof File || file instanceof Blob
                      ? URL.createObjectURL(file)
                      : file || Profile2 
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
                    marginTop: 5
                  }}
                  value={lastName}
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
          <Col md={12}>

            <Form.Group className="">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Flat , House no , Building , Company , Apartment {" "}
              </Form.Label>
              <FormControl
                type="text"
                id="form-controls"
                placeholder="Enter House No"
                value={house_no}
                onChange={(e) => handleHouseNo(e)}
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
            {house_noError && (
              <div style={{ color: "red" }}>
                <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
              </div>
            )}

          </Col>

          <Row>
            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Area , Street , Sector , Village{" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter Street"
                  value={street}
                  onChange={(e) => handleStreetName(e)}
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
              {streetError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
                </div>
              )}
            </Col>

            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Landmark{" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="E.g , near appollo hospital"
                  value={landmark}
                  onChange={(e) => handleLandmark(e)}
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
              {landmarkError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontFamily: "Gilroy", fontSize: '13px', marginRight: "5px", marginBottom: "1px" }} />
                  <span style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
                </div>
              )}
            </Col>
          </Row>


          <Row>
            <Col md={6}>
              <Form.Group
                className=""
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Pincode
                  <span style={{ color: "red", fontSize: "20px" }}>*</span>
                </Form.Label>
                <Form.Control
                  value={pincode}
                  onChange={(e) => handlePinCodeChange(e)}
                  type="tel"
                  maxLength={6}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="Enter Pincode"
                  style={{
                    fontSize: 16,
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: pincode ? 600 : 500,
                    boxShadow: "none",
                    border: "1px solid #D9D9D9",
                    height: 50,
                    borderRadius: 8,
                  }}
                />
                {pincodeError && (
                  <div className="d-flex align-items-center p-1 mb-2">
                    <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                    <label
                      className="mb-0"
                      style={{
                        color: "red",
                        fontSize: "12px",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                      }}
                    >
                      {pincodeError}
                    </label>
                  </div>
                )}


              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Town/City{" "}
                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="Enter City"
                  value={city}
                  onChange={(e) => handleCity(e)}
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
              {cityError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: '13px', marginRight: "5px" }} />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                </div>
              )}
            </Col>
          </Row>






          <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
            <Form.Group className="" controlId="exampleForm.ControlInput5">
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
                State
                <span style={{ color: "red", fontSize: "20px" }}>*</span>
              </Form.Label>

              <Select
                options={indianStates}
                onChange={(selectedOption) => {
                  setStateName(selectedOption?.value);
                }}
                value={
                  state_name ? { value: state_name, label: state_name } : null
                }
                placeholder="Select State"
                classNamePrefix="custom"
                menuPlacement="auto"
                noOptionsMessage={() => "No state available"}
                styles={{
                  control: (base) => ({
                    ...base,
                    height: "50px",
                    border: "1px solid #D9D9D9",
                    borderRadius: "8px",
                    fontSize: "16px",
                    color: "#4B4B4B",
                    fontFamily: "Gilroy",
                    fontWeight: state_name ? 600 : 500,
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
            </Form.Group>
            {!state_name && state_nameError && (
              <div style={{ color: "red" }}>
                <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                <span style={{ fontSize: "12px", color: "red", fontFamily: "Gilroy", fontWeight: 500 }}>
                  {state_nameError}
                </span>
              </div>
            )}

          </div>

       
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
                 
                </Form.Label>

                <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                  <DatePicker
                    style={{ width: "100%", height: 48, cursor: "pointer" }}
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
            <Col md={6} className="mb-3">
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
              <MdError style={{ fontSize: "14px", marginRight: "5px" }} />
              <span style={{ fontSize: "14px" }}>{formError}</span>
            </div>
          )}

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
              marginTop: 20
            }}
            onClick={handleSubmit}
          >
            Save Changes
          </Button>

        </Modal.Body>
       
      </Modal>

     
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

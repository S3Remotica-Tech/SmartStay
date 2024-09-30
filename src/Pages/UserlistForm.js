import {
  Button,
  Offcanvas,
  Form,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import moment from "moment";
import React, { useState, useEffect, useCallback } from "react";
import "../Pages/UserList.css";
// import Plus from '../Assets/Images/Create-button.png';
// import Profile from '../Assets/Images/Profile.jpg';
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import { InputGroup, Pagination } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "rsuite/esm/Modal/ModalDialog";
import Plus from "../Assets/Images/New_images/add-circle.png";
import Profile2 from "../Assets/Images/New_images/profile-picture.png";
import imageCompression from "browser-image-compression";
import Image from "react-bootstrap/Image";
import User from "../Assets/Images/Ellipse 1.png";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import {
  Autobrightness,
  Call,
  Sms,
  House,
  Buildings,
  ArrowLeft2,
  ArrowRight2,
  MoreCircle,
} from "iconsax-react";
import Select from "react-select";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";

function UserlistForm(props) {
  const bottomBorderStyle = {
    border: "none",
    borderBottom: "1px solid #ced4da",
    borderRadius: "0",
    boxShadow: "none",
    fontWeight: "bold",
    fontSize: "12px",
  };

  const bottomBorderStyles = {
    border: "none",
    borderBottom: "1px solid #ced4da",
    borderRadius: "0",
    boxShadow: "none",
    fontWeight: "bold",
    fontSize: "12px",
    padding: "3px",
  };

  console.log("props for UserListform", props);

  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [hostel_Id, setHostel_Id] = useState("");
  const [HostelName, setHostelName] = useState("");
  console.log("HostelName", HostelName);
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [Bed, setBed] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  const [BalanceDue, setBalanceDue] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [paid_advance, setPaidAdvance] = useState("");
  const [paid_rent, setPaidrent] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [isActive, setIsActive] = useState("");
  const [AadharNo, setAadharNo] = useState("");
  const [PancardNo, setPancardNo] = useState("");
  const [licence, setLicence] = useState("");
  const [bedArray, setBedArray] = useState("");
  const [Arrayset, setArrayset] = useState([]);
  const [Bednum, setBednum] = useState(null);
  const [romnum, setRoomnum] = useState("");
  const [createdat, setCreatedAt] = useState("");
  const [payableamount, setPayableamount] = useState("");
  const [countryCode, setCountryCode] = useState("91");
  console.log("countryCode", countryCode);

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("state", state);

  const [profilePicture, setProfilePicture] = useState("");
  const [filteredProfile, setFilteredProfile] = useState(null);

  console.log("state for userList form", state);

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
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  useEffect(() => {
    dispatch({ type: "HOSTELDETAILLIST", payload: { hostel_Id: hostel_Id } });
  }, [hostel_Id]);
  console.log("hostel_Id", hostel_Id);

  useEffect(() => {
    if (hostel_Id && Floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: hostel_Id, floor_Id: Floor },
      });
    }
  }, [Floor]);
  useEffect(() => {
    const Roomdetail = state.UsersList.Users.filter((item) => {
      return item.Hostel_Id == hostel_Id && item.Floor == Floor;
    });

    setRoomnum(Roomdetail);
  }, [state.UsersList.Users]);

  const handleFirstName = (e) => {
    setFirstname(e.target.value);
    setFirstnameError("");
  };
  const [firstnameError, setFirstnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [emailIdError, setemailIdError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");

  useEffect(() => {
    setphonenumError(state.UsersList.phoneError);
  }, [state.UsersList.phoneError]);

  useEffect(() => {
    setemailIdError(state.UsersList.emailError);
  }, [state.UsersList.emailError]);

  const validateField = (value, fieldName) => {
    if (!value || value.trim() === "") {
      switch (fieldName) {
        case "First Name":
          setFirstnameError("First Name is required");
          break;
        case "Phone Number":
          setPhoneError("Phone Number is required");
          break;
        case "Email":
          setEmailError("Email is required");
          break;
        case "Address":
          setAddressError("Address is required");
          break;
        case "Hostel ID":
          setHostelIdError("Hostel ID is required");
          break;
        default:
          break;
      }
      return false;
    }
    return true;
  };

  // const validateField = (value, fieldName) => {
  //   if (!value || value.trim() === '') {
  //     // Show inline error for first name
  //     if (fieldName === 'First Name') {
  //       setFirstnameError('First Name is required');
  //     }
  //     return false;
  //   } else {
  //     // Clear the error if field is valid
  //     if (fieldName === 'First Name') {
  //       setFirstnameError('');
  //     }
  //   }
  //   return true;
  // };
  const handleLastName = (e) => {
    setLastname(e.target.value);
  };

  const handlePaidadvance = (e) => {
    setPaidAdvance(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: "COUNTRYLIST" });
  }, []);
  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    const joinDate = moment(currentDate).format("YYYY-MM-DD");
    console.log("joindate", joinDate);
    const currentMonth = moment(currentDate).month() + 1;
    const currentYear = moment(currentDate).year();
    const createdAtMonth = moment(joinDate).month() + 1;
    const createdAtYear = moment(joinDate).year();

    if (currentMonth === createdAtMonth && currentYear === createdAtYear) {
      var dueDate = moment(joinDate).endOf("month").format("YYYY-MM-DD");
      var invoiceDate = moment(joinDate).format("YYYY-MM-DD");
    } else {
      var dueDate = moment(currentDate).endOf("month").format("YYYY-MM-DD");
      var invoiceDate = moment(currentDate)
        .startOf("month")
        .format("YYYY-MM-DD");
    }
    console.log("due_date", dueDate);
    console.log("invoiceDate", invoiceDate);

    const formattedJoinDate = moment(invoiceDate).format("YYYY-MM-DD");
    const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");
    const numberOfDays =
      moment(formattedDueDate).diff(moment(formattedJoinDate), "days") + 1;
    console.log("numberOfDays", numberOfDays);

    const totalDaysInCurrentMonth = moment(currentDate).daysInMonth();
    console.log("Total days in current month:", totalDaysInCurrentMonth);

    const oneday_amount = RoomRent / totalDaysInCurrentMonth;
    console.log("oneday_amount", oneday_amount);

    const payableamount = oneday_amount * numberOfDays;
    const This_month_payableamount = Math.round(payableamount);
    setPayableamount(This_month_payableamount);

    console.log("This_month_payableamount", This_month_payableamount);
  }, [RoomRent]);

  const handlePaidrent = (e) => {
    const value = e.target.value;
    if (value <= payableamount) {
      setPaidrent(e.target.value);
    }
  };

  // const handlePhone = (e) => {
  //   setPhone(e.target.value)
  //   const pattern = new RegExp(/^\d{1,10}$/);
  //   const isValidMobileNo = pattern.test(e.target.value)
  //   if (isValidMobileNo && e.target.value.length === 10) {
  //     document.getElementById('MobileNumberError').innerHTML = ''
  //   }
  //   else {
  //     document.getElementById('MobileNumberError').innerHTML = 'Invalid mobile number *'
  //   }
  // }

  // const handlePhone = (e) => {
  //   setPhone(e.target.value);
  //   const pattern = new RegExp(/^\d{1,10}$/);
  //   const isValidMobileNo = pattern.test(e.target.value);
  //   const errorElement = document.getElementById('MobileNumberError');

  //   if (errorElement) {
  //     if (isValidMobileNo && e.target.value.length === 10) {
  //       errorElement.innerHTML = '';
  //     } else {
  //       errorElement.innerHTML = 'Invalid mobile number *';
  //     }
  //   }
  // }
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
  };

  // const handleEmail = (e) => {
  //   setEmail(e.target.value)
  //   const email = e.target.value
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   const isValidEmail = emailRegex.test(email);
  //   if (isValidEmail) {
  //     document.getElementById('emailIDError').innerHTML = ''
  //   }
  //   else {
  //     document.getElementById('emailIDError').innerHTML = 'Invalid Email Id *'
  //   }
  // }
  // const handleEmail = (e) => {
  //   setEmail(e.target.value);
  //   const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  //   const isValidEmail = emailRegex.test(e.target.value);

  //   if (isValidEmail) {
  //     setEmailError('');
  //   } else {
  //     setEmailError('Invalid Email Id *');
  //   }
  // };

  // const handleEmail = (e) => {
  //   const emailValue = e.target.value;
  //   setEmail(emailValue);

  //   // Updated regex to allow only lowercase letters, numbers, and periods before the @
  //   const hasUpperCase = /[A-Z]/.test(emailValue);
  //   const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  //   // Check if the input email matches the regex
  //   const isValidEmail = emailRegex.test(emailValue);

  //   if (hasUpperCase) {
  //     setEmailErrorMessage('Email should be in lowercase *');
  //     setEmailError('Invalid Email Id *');
  //   } else if (!isValidEmail) {
  //     setEmailErrorMessage('');
  //     setEmailError('Invalid Email Id *');
  //   } else {
  //     setEmailError('');
  //     setEmailErrorMessage('');
  //   }

  //   // Assuming you want to clear email error regardless of the current input state
  //   dispatch({ type: 'CLEAR_EMAIL_ERROR' });
  // };
  const handleEmail = (e) => {
    const emailValue = e.target.value;
    setEmail(emailValue);

    // Updated regex to allow only lowercase letters, numbers, and periods before the @
    const hasUpperCase = /[A-Z]/.test(emailValue);
    const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Check if the input email matches the regex
    const isValidEmail = emailRegex.test(emailValue);

    // If email field is empty, reset the error messages
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
    }

    // Clear email error on input change
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  // const handleEmail = (e) => {
  //   setEmail(e.target.value);

  //   // Updated regex to allow only lowercase letters, numbers, and periods before the @
  //   const hasUpperCase = /[A-Z]/.test(email);
  //   const emailRegex = /^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,}$/;

  //   // Check if the input email matches the regex
  //   const isValidEmail = emailRegex.test(e.target.value);
  //   if (hasUpperCase) {
  //     setEmailErrorMessage('Email should be in lowercase *');
  //   }
  //   if (isValidEmail) {
  //     setEmailError('');
  //     setEmailErrorMessage('')
  //   } else {
  //     setEmailError('Invalid Email Id *');
  //   }

  //   dispatch({ type: 'CLEAR_EMAIL_ERROR' })
  // };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    setAddressError("");
  };

  const handleIsActiveUser = (e) => {
    setIsActive(e.target.value);
  };

  const handleHostelId = (e) => {
    const selectedHostelId = e.target.value;
    // handleInputChange()
    const selectedHostel =
      state.UsersList.hostelList &&
      state.UsersList.hostelList.filter((item) => item.id == e.target.value);
    setHostel_Id(selectedHostelId);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    if (selectedHostelId === "Select a PG") {
      setHostelIdError("Please select a valid PG");
    } else {
      setHostelIdError("");
    }
    setFloor("");
    setRooms("");
    setBed("");
    setHostelIdError("");
  };

  // const handleHostelId = (e) => {

  //   const selectedHostelId = e.target.value;
  //   const selectedHostel = state.UsersList.hostelList && state.UsersList.hostelList.filter(item => item.id == e.target.value);
  //   setHostel_Id(selectedHostelId);
  //   setHostelName(selectedHostel ? selectedHostel[0]?.Name : '');
  //   console.log("selectedHostelId", selectedHostelId)
  //   console.log("selectedHostel", selectedHostel);

  //   setFloor("")
  //   setRooms("")
  //   setBed("")
  //   setHostelIdError('');
  // }
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");

  const validateAssignField = (value, fieldName) => {
    // If the value is a string, trim it, otherwise check for non-empty or valid number
    const isValueEmpty = (typeof value === "string" && value.trim() === "") || value === 'undefined' || value === 'null' || value === '0';
  
    if (isValueEmpty) {
      switch (fieldName) {
        case "Floor":
          setfloorError("Floor is required");
          break;
        case "Room":
          setRoomError("Room is required");
          break;
        case "Bed":
          setBedError("Bed is required");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Advance Amount is required");
          break;
        case "RoomRent":
          setRoomRentError("Room Rent is required");
          break;
        default:
          break;
      }
      return false;
    }
  
    // Clear errors if the value is valid
    switch (fieldName) {
      case "Floor":
        setfloorError("");
        break;
      case "Room":
        setRoomError("");
        break;
      case "Bed":
        setBedError("");
        break;
      case "AdvanceAmount":
        setAdvanceAmountError("");
        break;
      case "RoomRent":
        setRoomRentError("");
        break;
      default:
        break;
    }
  
    return true;
  };
  
  const handleFloor = (e) => {
    setFloor(e.target.value);
    setRooms("");
    setBed("");
    setfloorError("");
  };
  const handleRooms = (e) => {
    setRooms(e.target.value);
    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: {
        hostel_id: hostel_Id,
        floor_id: Floor,
        room_id: e.target.value,
      },
    });
    setRoomError("");
  };

  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    setRoomRent(roomRentValue);
    setRoomRentError("");
  };

  const handleBed = (e) => {
    setBed(e.target.value);
    setBedError("");
  };

  const handlePaymentType = (e) => {
    setPaymentType(e.target.value);
  };

  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
  };

  const handleAadharNo = (e) => {
    setAadharNo(e.target.value);
  };
  const handlePancardNo = (e) => {
    setPancardNo(e.target.value);
  };
  const handlelicence = (e) => {
    setLicence(e.target.value);
  };

  const handleClose = () => {
    setFirstname("");
    setLastname("");
    setAddress("");
    setAadharNo("");
    setPancardNo("");
    setLicence("");
    setPhone("");
    setEmail("");
    setHostel_Id("");
    setFloor("");
    setRooms("");
    setBed("");
    setAdvanceAmount("");
    setRoomRent("");
    setPaymentType("");
    setBalanceDue("");
    setPaidAdvance("");
    setPaidrent("");
    setPayableamount("");
    props.setShowMenu(false);
    props.setUserClicked(false);
    props.setShowForm(false);
    props.OnShowTable(true);
    // props.setShowMenu(true)
    if (props.edit === "Edit") {
      props.OnShowTable(true);
      // props.setRoomDetail(true)
      console.log("edit close button called...1");
    } else {
      // props.setUserList(true);
      props.setRoomDetail(false);
      console.log("add close button called...2");
    }
  };

  const [reports, setReports] = useState([
    {
      id: 1,
      CustomerName: "mathu",
      contactPerson: "Chitra",
      Email: "abc@gmail.com",
      Mobile: 1234587685,
      Address: "North strret chennai, Gst:GST501",
      openingBalance: 2500,
    },
    {
      id: 2,
      CustomerName: "Jasvika",
      contactPerson: "Chitra",
      Email: "abc@gmail.com",
      Mobile: 1234587685,
      Address: "North strret chennai, Gst:GST501",
      openingBalance: 2500,
    },
  ]);
  console.log("props#########", props);

  useEffect(() => {
    if (props.EditObj && props.EditObj.ID) {
      console.log("props.EditObj", props.EditObj);
      props.setEdit("Edit");
      setBednum(props.EditObj);
      setId(props.EditObj.ID);
      if (props.EditObj.profile == 0) setFile(null);
      else {
        setFile(props.EditObj.profile);
      }
      // setFile(props.EditObj.profile)
      let value = props.EditObj.Name.split(" ");
      console.log("value,,,", value);
      setFirstname(value[0]);
      setLastname(value[1]);
      setAddress(props.EditObj.Address);
      setAadharNo(props.EditObj.AadharNo);
      setPancardNo(props.EditObj.PancardNo);
      setLicence(props.EditObj.licence);
      setPhone(props.EditObj.Phone);
      setEmail(props.EditObj.Email);
      setHostelName(props.EditObj.HostelName);
      setHostel_Id(props.EditObj.Hostel_Id);
      setFloor(props.EditObj.Floor);
      setRooms(props.EditObj.Rooms);
      setBed(props.EditObj.Bed);
      setAdvanceAmount(props.EditObj.AdvanceAmount);
      setRoomRent(props.EditObj.RoomRent);
      setPaymentType(props.EditObj.PaymentType);
      setBalanceDue(props.EditObj.BalanceDue);
      setPaidAdvance(props.EditObj.paid_advance);
      console.log("props.EditObj.paid_advance", props.EditObj.paid_advance);
      setPaidrent(props.EditObj.paid_rent);
      // setCreatedAt(props.EditObj.createdAt)
      // setIsActive(props.EditObj.isActive)
    } else {
      props.setEdit("Add");
    }
  }, []);

  //  const MobileNumber = `${countryCode}${Phone}`
  const MobileNumber = `${countryCode}${Phone}`;

  const handleSaveUserlist = () => {
    console.log("check");

    if (!validateField(firstname, "First Name")) return;
    if (!validateField(Phone, "Phone Number")) return;

    if (!validateField(Address, "Address")) return;
    if (!validateField(hostel_Id, "Hostel ID")) return;

    if (hostel_Id === "Select a PG" || hostelIdError) {
      setHostelIdError("Please select a valid PG");
      return; // Prevent save
    }

    if (phoneError === "Invalid mobile number *") {
      setPhoneErrorMessage("Please enter a valid 10-digit phone number");
      return;
    } else {
      setPhoneErrorMessage(""); // Clear the error if validation passes
    }
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);
    const capitalizedLastname = capitalizeFirstLetter(lastname);

    // Prepare payload
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
    const payload = {
      profile: file,
      firstname: capitalizedFirstname,
      lastname: capitalizedLastname,
      Phone: MobileNumber,
      Email: Email,
      Address: Address,
      AadharNo: AadharNo,
      PancardNo: PancardNo,
      licence: licence,
      HostelName: HostelName,
      hostel_Id: hostel_Id,
      Floor: Floor,
      Rooms: Rooms,
      Bed: Bed,
      AdvanceAmount: AdvanceAmount,
      RoomRent: RoomRent,
      BalanceDue: BalanceDue,
      PaymentType: PaymentType,
      paid_advance: paid_advance,
      paid_rent: paid_rent,
      payable_rent: payableamount,
    };

    if (props.edit === "Edit") {
      payload.ID = id;
    }

    dispatch({
      type: "ADDUSER",
      payload: payload,
    });

    props.AfterEditHostels(hostel_Id);
    props.AfterEditFloors(Floor);
    props.AfterEditRoomses(Rooms);
    props.AfterEditBeds(Bed);
  };

  const handleSaveUserlistAddUser = () => {
    if (!validateAssignField(Floor, "Floor")) return;
    if (!validateAssignField(Rooms, "Room")) return;
    if (!validateAssignField(Bed, "Bed")) return;
    if (!validateAssignField(AdvanceAmount, "AdvanceAmount")) return;
    if (!validateAssignField(RoomRent, "RoomRent")) return;

    if (Number(RoomRent) <= 0) {
      setRoomRentError("Room Rent must be greater than 0");
      return;
    } else {
      setRoomRentError("");
    }

    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Advance Amount must be greater than 0");
      return;
    } else {
      setAdvanceAmountError("");
    }

    if (Floor && Rooms && Bed) {
      dispatch({
        type: "ADDUSER",
        payload: {
          profile: file,
          firstname: firstname,
          lastname: lastname,
          Phone: Phone,
          Email: Email,
          Address: Address,
          AadharNo: AadharNo,
          PancardNo: PancardNo,
          licence: licence,
          HostelName: HostelName,
          hostel_Id: hostel_Id,
          Floor: Floor,
          Rooms: Rooms,
          Bed: Bed,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          BalanceDue: BalanceDue,
          PaymentType: PaymentType,
          paid_advance: paid_advance,
          paid_rent: paid_rent,
          payable_rent: payableamount,
          // isActive:isActive,
          ID: props.edit === "Edit" ? id : "",
        },
      });
      props.AfterEditHostels(hostel_Id);
      props.AfterEditFloors(Floor);
      props.AfterEditRoomses(Rooms);
      props.AfterEditBeds(Bed);
      handleClose();
    }
    dispatch({ type: "INVOICELIST" });
  };
  console.log(
    "state.UsersList?.statusCodeForAddUser",
    state.UsersList.statusCodeForAddUser
  );

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      if (props.edit === "Edit") {
        // props.setUserList(false);
        props.setRoomDetail(true);
        props.OnShowTable(true);
        console.log("edit close button called...1");
      } else {
        // props.setUserList(true);
        props.setRoomDetail(false);
        console.log("add close button called...2");
      }
      handleClose();
    }
  }, [state.UsersList?.statusCodeForAddUser]);

  console.log("props.displayDetail", props.displayDetail);
  const countries = [
    {
      value: "IN",
      label: (
        <>
          <img
            src="https://www.worldometers.info/img/flags/in-flag.gif"
            alt="India Flag"
            style={{ height: "20px", width: "20px", marginRight: "5px" }}
          />{" "}
        </>
      ),
    },
  ];

  return (
    <div>
      <Modal
        show={props.showMenu}
        onHide={handleClose}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 950,
            paddingRight: "10px",
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body>
            <div className="d-flex align-items-center">
              {props.displayDetail ? (
                <div>
                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      {props.edit === "Edit"
                        ? "Edit Customer"
                        : "Add an customer"}
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleClose}
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

                  <div className="d-flex align-items-center">
                    <div
                      className=""
                      style={{ height: 100, width: 100, position: "relative" }}
                    >
                      <Image
                        src={
                          file
                            ? typeof file == "string"
                              ? file
                              : URL.createObjectURL(file)
                            : Profile
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

                  <div className="row mt-4">
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
                          First Name{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>
                        <FormControl
                          id="form-controls"
                          placeholder="Enter name"
                          type="text"
                          value={firstname}
                          onChange={(e) => handleFirstName(e)}
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
                      {firstnameError && (
                        <div style={{ color: "red" }}>
                          {" "}
                          <MdError style={{ width: 20, height: 20 }} />
                          {firstnameError}
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
                          Last Name
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          placeholder="Enter name"
                          value={lastname}
                          onChange={(e) => handleLastName(e)}
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

                    <Form.Group
                      className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
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
                        Mobile number{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
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
                              console.log("itemImage", item);

                              return (
                                console.log(
                                  "item.country_flag",
                                  item.country_flag
                                ),
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
                    </Form.Group>
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
                          Email Id
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          placeholder="Enter email address"
                          value={Email}
                          onChange={(e) => handleEmail(e)}
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
                      </Form.Group>
                    </div>

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
                          Address
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          value={Address}
                          placeholder="Enter address"
                          onChange={(e) => handleAddress(e)}
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
                        {addressError && (
                          <div style={{ color: "red" }}>
                            <MdError />
                            {addressError}
                          </div>
                        )}
                      </Form.Group>
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Paying Guest
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        className="border"
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
                        value={hostel_Id}
                        onChange={(e) => handleHostelId(e)}
                      >
                        <option>Select a PG</option>
                        {state.UsersList?.hostelList?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.Name}
                          </option>
                        ))}
                      </Form.Select>
                      {hostelIdError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {hostelIdError}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    className=" col-lg-12 col-md-12 col-sm-12 col-xs-12"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 600,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      marginTop: 20,
                    }}
                    onClick={handleSaveUserlist}
                  >
                    Add an Customer
                  </Button>
                </div>
              ) : (
                <div className="container">
                  <div className="row mb-3"></div>

                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Assign bed
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleClose}
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

                  <div className="row mb-3">
                    <div className="col-12">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Floor{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        placeholder="Select no. of floor"
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
                        id="form-selects"
                        className="border"
                        value={Floor}
                        onChange={(e) => handleFloor(e)}
                      >
                        <option>Selected Floor</option>
                        {state.UsersList?.hosteldetailslist?.map((u) => (
                          <option key={u.floor_id}>{u.floor_id}</option>
                        ))}
                      </Form.Select>
                      {floorError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {floorError}
                        </div>
                      )}
                    </div>

                    <div className="col-12 mt-1">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Room{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        placeholder="Select no. of rooms"
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
                        value={Rooms}
                        className="border"
                        id="form-selects"
                        onChange={(e) => handleRooms(e)}
                      >
                        <option>Selected Room</option>

                        {state.UsersList?.roomdetails &&
                          state.UsersList.roomdetails.map((item) => (
                            <option key={item.Room_Id}>{item.Room_Id}</option>
                          ))}
                      </Form.Select>
                      {roomError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {roomError}
                        </div>
                      )}
                    </div>

                    <div className="col-12 mt-3 mb-3">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        Bed{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      {/* <Form.Select
                        aria-label='Default select example'
                        style={{ fontSize: 16, color: "#4B4B4B", fontFamily: "Gilroy", fontWeight: 500, boxShadow: "none", border: "1px solid #D9D9D9", height: 50, borderRadius: 8 }}
                        value={Bed}
                        className='border'
                        placeholder='Select a bed'
                        id="form-selects"
                        onChange={(e) => handleBed(e)}
                      >
                        <option>Selected Bed</option>
                        {props.edit === 'Edit' && Bednum && Bednum.Bed && (
                          <option value={Bednum.Bed} selected>{Bednum.Bed}</option>
                        )}
                        {state.UsersList?.bednumberdetails?.bed_details && state.UsersList?.bednumberdetails?.bed_details.map((item) => (
                          <option key={item.bed_no} value={item.bed_no}>{item.bed_no}</option>
                        ))}
                      </Form.Select> */}

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
  value={Bed}
  className="border"
  placeholder="Select a bed"
  id="form-selects"
  onChange={(e) => handleBed(e)}
>
  <option>Select a Bed</option>

  {props.edit === "Edit" &&
    Bednum &&
    Bednum.Bed &&
    Bednum.Bed !== "undefined" &&  Bednum.Bed !== "" &&  Bednum.Bed !== "null" &&  Bednum.Bed !== "0" && (
      <option value={Bednum.Bed} selected>
        {Bednum.Bed}
      </option>
    )}

  {state.UsersList?.bednumberdetails?.bed_details &&
    state.UsersList?.bednumberdetails?.bed_details
      .filter(item => item.bed_no !== "0" && item.bed_no !== "undefined" && item.bed_no !== "" && item.bed_no !== "null")
      .map((item) => (
        <option key={item.bed_no} value={item.bed_no}>
          {item.bed_no}
        </option>
      ))}
</Form.Select>


                      {bedError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {bedError}
                        </div>
                      )}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <Form.Group className="">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Advance Amount{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          placeholder="Enter amount"
                          value={AdvanceAmount}
                          onChange={(e) => handleAdvanceAmount(e)}
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
                      {advanceAmountError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {advanceAmountError}
                        </div>
                      )}
                    </div>

                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Rental Amount{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          placeholder="Enter amount"
                          value={RoomRent}
                          onChange={(e) => handleRoomRent(e)}
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
                      {roomrentError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                          {roomrentError}
                        </div>
                      )}
                    </div>
                  </div>

                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 600,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Montserrat",
                    }}
                    onClick={handleSaveUserlistAddUser}
                  >
                    Assign Bed
                  </Button>
                </div>
              )}
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
export default UserlistForm;

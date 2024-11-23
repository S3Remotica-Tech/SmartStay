import React, { useState, useEffect, useCallback, useRef } from "react";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import leftarrow from "../Assets/Images/arrow-left.png";
import Image from "react-bootstrap/Image";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import dots from "../Assets/Images/New_images/Group 14.png";
import Calendars from "../Assets/Images/New_images/calendar.png";
import Flatpickr from "react-flatpickr";
import verify from "../Assets/Images/verify.png";
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
import Group from "../Assets/Images/Group.png";
import { useDispatch, useSelector } from "react-redux";
import Money from "../Assets/Images/New_images/Money.png";
import {
  Button,
  Offcanvas,
  Form,
  FormControl,
  InputGroup,
  Pagination,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
// import Modal from 'react-bootstrap/Modal';
import Plus from "../Assets/Images/New_images/add-circle.png";
import imageCompression from "browser-image-compression";
import moment from "moment";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserEb from "./UserListEb";
import UserListInvoice from "./UserListInvoice";
import UserListAmenities from "./UserListAmenities";
import UserListCompliants from "./UserListCompliants";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdError } from "react-icons/md";
import { Room } from "@material-ui/icons";
import { style } from "@mui/system";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function UserListRoomDetail(props) {
  const state = useSelector((state) => state);
  console.log("state...",state)
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const initialvalue = useRef();
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [hostel_Id, setHostel_Id] = useState("");
  const [HostelName, setHostelName] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [RoomId, setRoomId] = useState("");
  const [Bed, setBed] = useState("");
  const [BedId, setBedId] = useState("");
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
  const [Bednum, setBednum] = useState("");
  console.log("Bednum", Bednum);
  const [payableamount, setPayableamount] = useState("");
  const [formshow, setFormShow] = useState(false);
  const [customerdetailShow, setcustomerdetailShow] = useState(false);
  const [customerAsignBed, setcustomerAsignBed] = useState(false);
  const [Editbed, seteditBed] = useState("");
  const [value, setValue] = React.useState("1");
  const [countryCode, setCountryCode] = useState("");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [editMode , seteditMode] = useState(false)
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const handleChanges = (event, newValue) => {
    setValue(newValue);
    setFormShow(false);
  };
  const options = {
    dateFormat: "Y/m/d",
    maxDate: null, 
    minDate:null, 
  };
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

  const handleDate = (selectedDates) => {
    if (selectedDates.length > 0) {
      const localDate = new Date(
        selectedDates[0].getTime() -
          selectedDates[0].getTimezoneOffset() * 60000
      )
        .toISOString()
        .split("T")[0];

      setSelectedDate(localDate);
      setDateError("");
      setFormError("");
    }
  };

  const handleShowEditBed = (item) => {
    console.log("itemitem", item);

    if (item[0].ID) {
      if (item) {
        dispatch({
          type: "HOSTELDETAILLIST",
          payload: { hostel_Id: item[0].Hostel_Id },
        });
        dispatch({
          type: "ROOMDETAILS",
          payload: { hostel_Id: item[0].Hostel_Id, floor_Id: item[0].Floor },
        });
        dispatch({
          type: "BEDNUMBERDETAILS",
          payload: {
            hostel_id: item[0].Hostel_Id,
            floor_id: item[0].Floor,
            room_id: item[0].Rooms,
          },
        });
      }
      setBednum(item);
      seteditBed("editbeddet");
      setcustomerAsignBed(true);
      setcustomerdetailShow(false);
      setFormShow(true);
      setId(item[0].ID);

      if (item[0].profile === 0) {
        setFile(null);
      } else {
        setFile(item[0].profile);
      }

      if (item[0].Name) {
        let value = item[0].Name.split(" ");
        setFirstname(value[0]);
        setLastname(value[1]);
      } else {
        setFirstname("");
        setLastname("");
      }
      console.log("roomrentupdated",item);
      

      setAddress(item[0].Address || "");
      setAadharNo(item[0].AadharNo || "");
      setPancardNo(item[0].PancardNo || "");
      setLicence(item[0].licence || "");
      setPhone(item[0].Phone || "");
      setEmail(item[0].Email || "");
      setHostelName(item[0].HostelName || "");
      setHostel_Id(item[0].Hostel_Id || "");
      setFloor(item[0].Floor || "");
      setRooms(item[0].Rooms || "");
      setBed(item[0].Bed || "");
      setRoomId(item[0].room_id || "");
      setBedId(item[0].hstl_Bed || "");
     
      const isValidDate = item[0].user_join_date && item[0].user_join_date !== "0000-00-00";
      const parsedDate = isValidDate ? new Date(item[0].user_join_date) : null;

      if (parsedDate && !isNaN(parsedDate.getTime())) {
          setSelectedDate(parsedDate);
      } else {
          console.warn("Invalid date format for user_join_date");
          setSelectedDate(""); 
      }
      // setSelectedDate(item[0].user_join_date ? new Date(item[0].user_join_date) : "");
      setAdvanceAmount(item[0].AdvanceAmount || "");
      setRoomRent(item[0].RoomRent || "");
      setPaymentType(item[0].PaymentType || "");
      setBalanceDue(item[0].BalanceDue || "");
      setPaidAdvance(item[0].paid_advance || "");
      setPaidrent(item[0].paid_rent || "");

      setInitialStateAssign({
        Floor: item[0].Floor || "",
        Rooms: item[0].room_id || "",
        Bed: item[0].hstl_Bed || "",
        selectedDate: item[0].user_join_date || "",
        AdvanceAmount: item[0].AdvanceAmount || "",
        RoomRent: item[0].RoomRent || "",
      });
      seteditMode(true);
    }
  };

  const MobileNumber = `${countryCode}${Phone}`;
  const handleEditUser = (item) => {
    console.log("item...", item);
    if (item[0].ID) {
      if (item) {
        dispatch({
          type: "HOSTELDETAILLIST",
          payload: { hostel_Id: item[0].Hostel_Id },
        });
        dispatch({
          type: "ROOMDETAILS",
          payload: { hostel_Id: item[0].Hostel_Id, floor_Id: item[0].Floor },
        });
        dispatch({
          type: "BEDNUMBERDETAILS",
          payload: {
            hostel_id: item[0].Hostel_Id,
            floor_id: item[0].Floor,
            room_id: item[0].Rooms,
          },
        });
      }
      const phoneNumber = String(item[0].Phone || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);
      setBednum(item);
      seteditBed("editbeddet");
      setcustomerAsignBed(false);
      setcustomerdetailShow(true);
      setFormShow(true);

      setId(item[0].ID);
      setFile(item[0].profile === "0" ? null : item[0].profile);

      let value = item[0].Name ? item[0].Name.split(" ") : ["", ""];
      setFirstname(value[0].trim());
      setLastname(value[1] ? value[1].trim() : "");

      setAddress(item[0].Address || "");
      setAadharNo(item[0].AadharNo || "");
      setPancardNo(item[0].PancardNo || "");
      setLicence(item[0].licence || "");
      setPhone(mobileNumber);
      setCountryCode(countryCode);
      setEmail(item[0].Email || "");
      setHostelName(item[0].HostelName || "");
      setHostel_Id(item[0].Hostel_Id || "");
      setFloor(item[0].Floor || "");
      setRooms(item[0].Rooms || "");
      setBed(item[0].Bed || "");
      setRoomId(item[0].room_id || "");
      setBedId(item[0].hstl_Bed || "");
      setSelectedDate(item[0].user_join_date || "");
      setAdvanceAmount(item[0].AdvanceAmount || "");
      setRoomRent(item[0].RoomRent || "");
      setPaymentType(item[0].PaymentType || "");
      setBalanceDue(item[0].BalanceDue || "");
      setPaidAdvance(item[0].paid_advance || "");
      setPaidrent(item[0].paid_rent || "");

      setInitialState({
        firstname: value[0].trim(),
        lastname: value[1] ? value[1].trim() : "",
        Phone: item[0].Phone || "",
        Email: item[0].Email || "",
        Address: item[0].Address || "",
        hostel_Id: item[0].Hostel_Id || "",
       
        file: item[0].profile === "0" ? null : item[0].profile || null,
      });
    }
  };

  useEffect(() => {
    if (hostel_Id && Floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: hostel_Id, floor_Id: Floor },
      });
    }
  }, [Floor]);

  const handleFirstName = (e) => {
    setFirstname(e.target.value);
    setFirstnameError("");
    setFormError("");
   
  };
  const handleLastName = (e) => {
    setLastname(e.target.value);
    setFormError("");
    
  };

  useEffect(() => {
    const currentDate = moment().format("YYYY-MM-DD");
    const joinDate = moment(currentDate).format("YYYY-MM-DD");
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

    const formattedJoinDate = moment(invoiceDate).format("YYYY-MM-DD");
    const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");
    const numberOfDays =
      moment(formattedDueDate).diff(moment(formattedJoinDate), "days") + 1;

    const totalDaysInCurrentMonth = moment(currentDate).daysInMonth();

    const oneday_amount = RoomRent / totalDaysInCurrentMonth;

    const payableamount = oneday_amount * numberOfDays;
    const This_month_payableamount = Math.round(payableamount);
    setPayableamount(This_month_payableamount);
  }, [RoomRent]);

  const handlePaidrent = (e) => {
    const value = e.target.value;
    if (value <= payableamount) {
      setPaidrent(e.target.value);
    }
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
    setFormError("");
    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
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

      setFormError("");
    }

    // Clear email error on input change
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };


  const handleAddress = (e) => {
    // handleInputChange()
    setAddress(e.target.value);
    setAddressError("");
    setFormError("");
  };

  const handleIsActiveUser = (e) => {
    setIsActive(e.target.value);
  };

  const handleImageChange = async (event) => {
    // handleInputChange()

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
    if (props.id) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id } });
    }
  }, [props.id]);

  useEffect(() => {
    dispatch({ type: "HOSTELDETAILLIST", payload: { hostel_Id: hostel_Id } });
  }, [hostel_Id]);
  console.log(
    "state.UsersList?.bednumberdetails?.bed_details",
    state.UsersList?.bednumberdetails?.bed_details
  );

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
    setFormError("");
    setRoomId("");
    setBedId("");
  };
  const handleFloor = (e) => {
    setFloor(e.target.value);

    if (e.target.value === "Selected Floor") {
      setfloorError("Please select a valid floor");
    } else {
      setfloorError("");
    }
    // handleInputChange()
    setRooms("");
    setBed("");
    setfloorError("");
    setFormError("");
    setRoomId("");
    setBedId("");
    setRoomRent(0)
  };

  useEffect(() => {
    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: { hostel_id: hostel_Id, floor_id: Floor, room_id: RoomId },
    });
  }, [Rooms]);

  const handleRooms = (e) => {
    setRoomId(e.target.value);
    console.log("e.target.value", e.target.value);

    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: {
        hostel_id: hostel_Id,
        floor_id: Floor,
        room_id: e.target.value,
      },
    });
    if (e.target.value === "Selected Room") {
      setRoomError("Please select a valid Room");
    } else {
      setRoomError("");
    }
    setBed("");
    setRoomError("");
    setFormError("");
    setBedId("");
    setRoomRent(0)
    // handleInputChange()
  };

  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    // handleInputChange()
    setRoomRent(roomRentValue);
    setRoomRentError("");
    setFormError("");
  };

  const handleBed = (e) => {
    // handleInputChange()
    setBedId(e.target.value);

    const Bedfilter =state?.UsersList?.roomdetails && 
    state.UsersList.roomdetails.filter ((u)=>  u.Hostel_Id == hostel_Id && u.Floor_Id == Floor  && u.Room_Id == RoomId )
    
    const Roomamountfilter = Bedfilter && 
    Bedfilter.length > 0 && Bedfilter[0].bed_details.filter (amount => amount.id == e.target.value)
    
     
  if (Roomamountfilter.length != 0) {
    const selectedRoomRent = Roomamountfilter[0].bed_amount;

    if (editMode && e.target.value === initialStateAssign.Bed) {
      setRoomRent(initialStateAssign.RoomRent); // Set the initial RoomRent
    } else {
      setRoomRent(selectedRoomRent); // Set new RoomRent if bed changes
    }
    console.log("Roomamountfilter", selectedRoomRent);
  }

    console.log("e.target.valuebed", e.target.value);
    if (e.target.value === "Selected a Bed") {
      setBedError("Please select a valid Bed");
    } else {
      setBedError("");
    }
    setBedError("");
    setFormError("");
    setRoomRentError("")
  };

  const handlePaymentType = (e) => {
    setPaymentType(e.target.value);
  };

  const handleAdvanceAmount = (e) => {
    // handleInputChange()
    const advanceAmount = e.target.value;
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
    setFormError("");
  };

  // useEffect(() => {
  //   if (props.userDetails && props.userDetails.ID) {
  //     seteditBed("editbeddet");
  //     setId(props.userDetails.ID);
  //     if (props.userDetails.profile == 0) setFile(null);
  //     else {
  //       setFile(props.userDetails.profile);
  //     }
  //     let value = props.userDetails.Name.split(" ");
  //     setFirstname(value[0]);
  //     setLastname(value[1]);
  //     setAddress(props.userDetails.Address);
  //     setAadharNo(props.userDetails.AadharNo);
  //     setPancardNo(props.userDetails.PancardNo);
  //     setLicence(props.userDetails.licence);
  //     setPhone(props.userDetails.Phone);
  //     setEmail(props.userDetails.Email);
  //     setHostelName(props.userDetails.HostelName);
  //     setHostel_Id(props.userDetails.Hostel_Id);
  //     setFloor(props.userDetails.Floor);
  //     setRooms(props.userDetails.Rooms);
  //     setBed(props.userDetails.Bed);
  //     setAdvanceAmount(props.userDetails.AdvanceAmount);
  //     setRoomRent(props.userDetails.RoomRent);
  //     setPaymentType(props.userDetails.PaymentType);
  //     setBalanceDue(props.userDetails.BalanceDue);
  //     setPaidAdvance(props.userDetails.paid_advance);
  //     setPaidrent(props.userDetails.paid_rent);
  //   } else {
  //     props.setEdit("Add");
  //   }
  // }, [props.userDetails]);

  const handleCloseEditcustomer = () => {
    setFormShow(false);
    setFormError("");
    setfloorError("");
    setRoomError("");
    setBedError("");
    setAdvanceAmountError("");
    setRoomRentError("");
    setHostelIdError("");
    setFirstnameError("");
    setEmailError("");
    setAddressError("");
    setPhoneError("");
    setDateError('')
    
  };

  const [firstnameError, setFirstnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [emailIdError, setemailIdError] = useState("");

  const validateField = (value, fieldName) => {
    // Ensure value is a string before using trim
    const stringValue = String(value).trim();

    if (!stringValue) {
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

  const handleSaveUserlist = () => {
    if (!validateField(firstname, "First Name")) return;
    if (!validateField(Phone, "Phone Number")) return;
    if (!validateField(Address, "Address")) return;
    if (!validateField(hostel_Id, "Hostel ID")) return;

    if (hostel_Id === "Select a PG" || hostelIdError) {
      setHostelIdError("Please select a valid PG"); // Set the error message if not already set
      return;
    }
    if (phoneError === "Invalid mobile number *") {
      setPhoneErrorMessage("Please enter a valid 10-digit phone number");
      return;
    } else {
      setPhoneErrorMessage("");
    }
    const isChanged = !(
      firstname === initialState.firstname &&
      lastname === initialState.lastname &&
      Number(countryCode + Phone) === Number(initialState.Phone) &&
      Email === initialState.Email &&
      Address === initialState.Address &&
      String(hostel_Id) === String(initialState.hostel_Id) &&
      file === initialState.file
    );
    if (!isChanged) {
      setFormError("No changes detected.");
      return;
    } else {
      setFormError("");
    }
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);
    const capitalizedLastname = capitalizeFirstLetter(lastname);
    const normalizedPhoneNumber = MobileNumber.replace(/\s+/g, "");
    const payload = {
      profile: file,
      firstname: capitalizedFirstname,
      lastname: capitalizedLastname,
      Phone: normalizedPhoneNumber,
      Email: Email,
      Address: Address,
      AadharNo: AadharNo,
      PancardNo: PancardNo,
      licence: licence,
      HostelName: HostelName,
      hostel_Id: hostel_Id,
      Floor: Floor,
      Rooms: RoomId,
      Bed: BedId,
      joining_date: selectedDate,
      AdvanceAmount: AdvanceAmount,
      RoomRent: RoomRent,
      BalanceDue: BalanceDue,
      PaymentType: PaymentType,
      paid_advance: paid_advance,
      paid_rent: paid_rent,
      payable_rent: payableamount,
      ID: id,
    };
    dispatch({
      type: "ADDUSER",
      payload: payload,
    });

    props.AfterEditHostels(hostel_Id);
    props.AfterEditFloors(Floor);
    props.AfterEditRoomses(Rooms);
    props.AfterEditBeds(Bed);

    setFormShow(false);
  };

  const [initialState, setInitialState] = useState({
    firstname: "",
    lastname: "",
    Phone: "",
    Email: "",
    Address: "",
    hostel_Id: "",
    countryCode: "",
    file: null,
  });

  const [initialStateAssign, setInitialStateAssign] = useState({
    Floor: "",
    Rooms: "",
    Bed: "",
    selectedDate: "",
    AdvanceAmount: "",
    RoomRent: "",
  });

  
  const validateAssignField = (value, fieldName) => {
    // If the value is a string, trim it, otherwise check for non-empty or valid number
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === "undefined" ||
      value === "null" ||
      value === "0";

    if (isValueEmpty) {
      switch (fieldName) {
        case "Floor":
          setfloorError("Floor is required");
          break;
        case "RoomId":
          setRoomError("Room is required");
          break;
        case "BedId":
          setBedError("Bed is required");
          break;
        case "selectedDate":
          setDateError("date is required");
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
      case "RoomId":
        setRoomError("");
        break;
      case "BedId":
        setBedError("");
        break;
      case "selectedDate":
        setDateError("");
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

  const handleSaveUserlistAddUser = () => {
    // Validate fields first
    if (!validateAssignField(Floor, "Floor"));
    if (!validateAssignField(RoomId, "RoomId"));
    if (!validateAssignField(BedId, "BedId"));
    if (!validateAssignField(AdvanceAmount, "AdvanceAmount"));
    if (!validateAssignField(RoomRent, "RoomRent"));
    
    // Validate date separately for clarity
    const isValidDate = (date) => !isNaN(Date.parse(date));

    if (!isValidDate(selectedDate)) {
      setDateError("Joining Date is required.");
      return;
    } else {
      setDateError("");
    }

    // Check if room rent is valid
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Room Rent must be greater than 0");
      return;
    } else {
      setRoomRentError("");
    }

    // Check if advance amount is valid
    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Advance Amount must be greater than 0");
      return;
    } else {
      setAdvanceAmountError("");
    }

    // Floor, Room, and Bed validation checks
    if (Floor === "Selected Floor") {
      setfloorError("Please select a valid PG");
      return;
    }

    if (RoomId === "Selected Room") {
      setRoomError("Please select a valid PG");
      return;
    }

    if (BedId === "Select a Bed") {
      setBedError("Please select a valid PG");
      return;
    }

    // Format the date
    let formattedDate = null;
    try {
      formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    } catch (error) {
      setDateError("Invalid date format.");
      console.error(error);
      return; // Ensure invalid date stops execution
    }

    // Detect any changes
    const isChangedBed = 
      (String(Floor).toLowerCase() !== String(initialStateAssign.Floor).toLowerCase()) ||
      (String(RoomId).toLowerCase() !== String(initialStateAssign.Rooms).toLowerCase()) ||
      (String(BedId).toLowerCase() !== String(initialStateAssign.Bed).toLowerCase()) ||
      (formattedDate !== new Date(initialStateAssign.selectedDate).toISOString().split("T")[0]) ||
      Number(AdvanceAmount) !== Number(initialStateAssign.AdvanceAmount) ||
      Number(RoomRent) !== Number(initialStateAssign.RoomRent);

    if (!isChangedBed) {
      setFormError("No changes detected.");
      return;
    } else {
      setFormError("");
    }

    // Dispatch if validation passed
    dispatch({
      type: "ADDUSER",
      payload: {
        profile: file,
        firstname,
        lastname,
        Phone,
        Email,
        Address,
        AadharNo,
        PancardNo,
        licence,
        HostelName,
        hostel_Id,
        Floor,
        Rooms: RoomId,
        Bed: BedId,
        joining_date: formattedDate,
        AdvanceAmount,
        RoomRent,
        BalanceDue,
        PaymentType,
        paid_advance,
        paid_rent,
        payable_rent: payableamount,
        ID: id,
      },
    });

    // Trigger post-edit actions
    props.AfterEditHostels(hostel_Id);
    props.AfterEditFloors(Floor);
    props.AfterEditRoomses(Rooms);
    props.AfterEditBeds(Bed);

    setFormShow(false);
    dispatch({ type: "INVOICELIST" });
};


 

  useEffect(() => {
    if (state.UsersList.CustomerdetailsgetStatuscode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_DETAILS" });
      }, 1000);
    }
  }, [state.UsersList.CustomerdetailsgetStatuscode]);
 
  useEffect(()=>{
    if(state.UsersList.statusCodeForAddUser === 200){
   
dispatch({type:"USERLIST"})
setTimeout(() => {
  dispatch({ type: "CLEAR_STATUS_CODES" });
}, 100);
    }
  },[state.UsersList.statusCodeForAddUser,state.UsersList.Users])
  console.log(" props.userDetails", props.userDetails)


  const customDateInput = (props) => {
    return (
        <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
            <FormControl
                type="text"
                className='date_input'
                value={props.value || 'DD/MM/YYYY'}
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
                    boxShadow: "none"
                }}
            />
            <img 
                src={Calendars} 
                style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }} 
                alt="Calendar" 
                onClick={props.onClick} 
            />
        </div>
    );
};
console.log("props.roomDetail12344",props.userDetails )

  return (
    <>
      {props.roomDetail && (
        <>
          {props.userDetails &&
            props.userDetails.map((item, index) => {
              const imageUrl = item.profile || Profile;
              return (
                <div
                  key={item.ID}
                  className="container"
                  style={{ marginLeft: "-20px" }}
                >
                  <div style={{ marginLeft: 25, paddingBottom: 20 }}>
                    <img
                      src={leftarrow}
                      width={20}
                      height={20}
                      onClick={props.handleBack}
                      style={{ cursor: "pointer" }}
                    />
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "18px",
                        marginLeft: 15,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Cutomer Profile
                    </span>{" "}
                  </div>
                  <div className="card" style={{ borderRadius: "24px" }}>
                    <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between">
                      <div className="d-flex align-items-center mb-3 mb-md-0">
                        <Image
                          src={imageUrl}
                          alt={item.Name || "Default Profile"}
                          roundedCircle
                          style={{
                            height: "80px",
                            width: "80px",
                            marginRight: "10px",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Profile;
                          }}
                        />
                        <div style={{ marginLeft: 10 }}>
                          <span
                            className="card-title mb-0"
                            style={{
                              fontSize: "20px",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}
                          >
                            {item.Name}
                            <img
                              src={verify}
                              width={17}
                              height={17}
                              style={{ marginTop: "-3px" }}
                            />
                          </span>
                          <p style={{ marginTop: 10 }}>
                            <span
                              style={{
                                backgroundColor: "#FFE0D9",
                                borderRadius: "10px",
                                padding: "5px 10px",
                                fontSize: "14px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                              }}
                            >
                              Room: {item.Rooms || "N/A"} - Bed:{" "}
                              {item.Bed || "N/A"}
                            </span>

                            <span
                              style={{
                                backgroundColor: "#FFEFCF",
                                borderRadius: "10px",
                                padding: "5px 10px",
                                marginLeft: 10,
                                fontSize: "14px",
                                fontWeight: 500,
                                fontFamily: "Gilroy",
                              }}
                            >
                              Floor:{" "}
                              {item.Floor &&
                              item.Floor !== "undefined" &&
                              item.Floor !== 0 &&
                              item.Floor !== "null"
                                ? item.Floor
                                : "N/A"}
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* <div  onClick={() => handleShowEditBed(props.userDetails)}>
                        <img src={dots} width={40} height={40} />
                      </div> */}
                      <div
  onClick={() => {
    if (!props.customerEditPermission) {
      handleShowEditBed(props.userDetails);
    }
  }}
  style={{
    cursor: props.customerEditPermission ? "not-allowed" : "pointer",
    opacity: props.customerEditPermission ? 0.6 : 1,
  }}
>
  <img
    src={dots}
    width={40}
    height={40}
    style={{
      filter: props.customerEditPermission ? "grayscale(100%)" : "none",
    }}
  />
</div>

                    </div>
                  </div>

                  <TabContext value={value}>
                    <div>
                      <Box sx={{ borderBottom: 0, borderColor: "divider" }}>
                        <TabList
                          orientation={
                            isSmallScreen ? "vertical" : "horizontal"
                          }
                          onChange={handleChanges}
                          aria-label="lab API tabs example"
                          style={{ marginLeft: "20px" }}
                          className="d-flex flex-column flex-xs-column flex-sm-column flex-lg-row"
                        >
                          <Tab
                            label="Overview"
                            value="1"
                            style={{
                              fontSize: 16,
                              fontFamily: "Gilroy",
                              color: value === "1" ? "#222222" : "#4B4B4B",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              fontWeight: 500,
                              textTransform: "none",
                            }}
                          />
                          <Tab
                            label="EB Reading"
                            value="2"
                            style={{
                              fontSize: 16,
                              fontFamily: "Gilroy",
                              color: value === "2" ? "#222222" : "#4B4B4B",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              fontWeight: 500,
                              textTransform: "none",
                            }}
                          />
                          <Tab
                            label="Bill"
                            value="3"
                            style={{
                              fontSize: 16,
                              fontFamily: "Gilroy",
                              color: value === "3" ? "#222222" : "#4B4B4B",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              fontWeight: 500,
                              textTransform: "none",
                            }}
                          />
                          <Tab
                            label="Compliants"
                            value="4"
                            style={{
                              fontSize: 16,
                              fontFamily: "Gilroy",
                              color: value === "4" ? "#222222" : "#4B4B4B",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              fontWeight: 500,
                              textTransform: "none",
                            }}
                          />
                          <Tab
                            label="Amenities"
                            value="5"
                            style={{
                              fontSize: 16,
                              fontFamily: "Gilroy",
                              color: value === "5" ? "#222222" : "#4B4B4B",
                              lineHeight: "normal",
                              fontStyle: "normal",
                              fontWeight: 500,
                              textTransform: "none",
                            }}
                          />
                        </TabList>
                      </Box>
                    </div>
                    <TabPanel value="1" className="px-0">
                      <>
                        <div className="mt-3 d-flex flex-column flex-md-row justify-content-end">
                          <div
                            className="col-md-6 mb-3 mb-md-0"
                            style={{ marginLeft: "-23px" }}
                          >
                            <div
                              className="card"
                              style={{ borderRadius: "20px", padding: "20px" }}
                            >
                              <div
                                className="card-header d-flex justify-content-between align-items-center"
                                style={{ backgroundColor: "transparent" }}
                              >
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy",
                                  }}
                                >
                                  Basic Information
                                </div>
                                <div
  style={{
    cursor: props.customerEditPermission ? "not-allowed" : "pointer",
    opacity: props.customerEditPermission ? 0.6 : 1,
  }}
>
  <div
    onClick={() => {
      if (!props.customerEditPermission) {
        handleEditUser(props.userDetails);
      }
    }}
    style={{
      cursor: props.customerEditPermission ? "not-allowed" : "pointer",
      height: 40,
      width: 40,
      borderRadius: 100,
      border: "1px solid #EFEFEF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      zIndex: 1000,
      backgroundColor: props.customerEditPermission ? "#F5F5F5" : "#FFF",
    }}
  >
    <PiDotsThreeOutlineVerticalFill
      style={{
        height: 20,
        width: 20,
        color: props.customerEditPermission ? "#CCCCCC" : "#000",
      }}
    />
  </div>
</div>

                              </div>

                              <div className="card-body">
                                <div className="row">
                                  <div className="col-sm-6">
                                    <p
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Paying Guest
                                    </p>
                                    <p>
                                      <Buildings size="16" color="#1E45E1" />
                                      <span
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                          marginLeft: 5,
                                        }}
                                      >
                                        {item.HostelName}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-sm-6 text-md-right">
                                    <p
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Room/Bed
                                    </p>
                                    <p
  onClick={() => {
    if (!props.customerEditPermission) {
      handleShowEditBed(props.userDetails);
    }
  }}
  style={{
    cursor: props.customerEditPermission ? "not-allowed" : "pointer",
    opacity: props.customerEditPermission ? 0.6 : 1,
  }}
>
  <img
    src={Group}
    style={{
      cursor: props.customerEditPermission ? "not-allowed" : "pointer",
      filter: props.customerEditPermission ? "grayscale(100%)" : "none",
    }}
  />
  <span
    style={{
      marginLeft: 5,
      fontSize: 14,
      fontWeight: 600,
      fontFamily: "Gilroy",
      cursor: props.customerEditPermission ? "not-allowed" : "pointer",
      color: props.customerEditPermission ? "#888888" : "#000000",
    }}
  >
    {item.Rooms ? item.Rooms : "N/A"} - {item.Bed ? item.Bed : "N/A"}
  </span>
</p>

                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-sm-6">
                                    <p
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Email
                                    </p>
                                    <p>
                                      <Sms size="16" color="#1E45E1" />
                                      <span
                                        style={{
                                          marginLeft: 5,
                                          fontSize: 14,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        {item.Email}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="col-sm-6 text-md-right">
                                    <p
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Mobile no.
                                    </p>
                                    <p>
                                      <Call size="16" color="#1E45E1" />
                                      <span
                                        style={{
                                          marginLeft: 5,
                                          fontSize: 14,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        +
                                        {item &&
                                          String(item.Phone).slice(
                                            0,
                                            String(item.Phone).length - 10
                                          )}{" "}
                                        {item && String(item.Phone).slice(-10)}
                                      </span>
                                    </p>
                                  </div>
                                </div>

                                <div className="row">
                                  <div className="col-sm-6">
                                    <p
                                      style={{
                                        fontSize: 12,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Address
                                    </p>
                                    <p>
                                      <House size="16" color="#1E45E1" />
                                      <span
                                        style={{
                                          marginLeft: 5,
                                          fontSize: 14,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        {item.Address}
                                      </span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-6 mb-3 mb-md-0" style={{paddingLeft:20}}>
                            { props.userDetails.length ===
                              0 ||  props.userDetails === "" ? (
                              <div
                                className="card"
                                style={{
                                  borderRadius: "20px",
                                  padding: "20px",
                                }}
                              >
                                <div
                                  className="card-header d-flex justify-content-between align-items-center"
                                  style={{ backgroundColor: "transparent" }}
                                >
                                  <div
                                    style={{
                                      fontSize: 16,
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",
                                    }}
                                  >
                                    Detailed Information
                                  </div>
                                </div>
                                <div className="card-body">
                                  <div className="row mb-3">
                                    <div className="col-sm-4">
                                      <strong
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Advance Amount
                                      </strong>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        <img src={Money} /> ₹
                                        {props.userDetails[0].AdvanceAmount}
                                      </p>
                                    </div>
                                    <div className="col-sm-4">
                                      <strong
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Rent Amount
                                      </strong>
                                      <p
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        <img src={Money} /> ₹
                                        {props.userDetails[0].RoomRent}/m
                                      </p>
                                    </div>
                                  </div>

                                  <div className="row mb-3">
                                    <div className="col-sm-12">
                                      <strong
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Amenities
                                      </strong>
                                      <div className="d-flex flex-wrap mt-2">
                                        {props.userDetails[0]?.amentites?.map(
                                          (amenity) => (
                                            <div
                                              key={amenity.Amnities_Name}
                                              style={{
                                                backgroundColor: "#E0ECFF",
                                                borderRadius: "10px",
                                                padding: "2px 12px",
                                                fontSize: "14px",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                margin: "10px",
                                              }}
                                            >
                                              {amenity.Amnities_Name}
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              state.UsersList?.customerdetails?.data?.map(
                                (g) => (
                                  <div
                                    key={g.id}
                                    className="card"
                                    style={{
                                      borderRadius: "20px",
                                      padding: "20px",
                                    }}
                                  >
                                    <div
                                      className="card-header d-flex justify-content-between align-items-center"
                                      style={{ backgroundColor: "transparent" }}
                                    >
                                      <div
                                        style={{
                                          fontSize: 16,
                                          fontWeight: 600,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Detailed Information
                                      </div>
                                    </div>
                                    <div className="card-body">
                                      <div className="row mb-3">
                                        <div className="col-sm-4">
                                          <strong
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            Advance Amount
                                          </strong>
                                          <p
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            <img src={Money} /> ₹
                                            { props.userDetails[0].AdvanceAmount}
                                          </p>
                                        </div>
                                        <div className="col-sm-4">
                                          <strong
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            Rent Amount
                                          </strong>
                                          <p
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            <img src={Money} /> ₹{ props.userDetails[0].RoomRent}/m
                                          </p>
                                        </div>
                                      </div>

                                      <div className="row mb-3">
                                        <div className="col-sm-12">
                                          <strong
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            Amenities
                                          </strong>
                                          <div className="d-flex flex-wrap mt-2">
                                            {g?.amentites?.map((p) => (
                                              <div
                                                key={p.Amnities_Name}
                                                style={{
                                                  backgroundColor: "#E0ECFF",
                                                  borderRadius: "10px",
                                                  padding: "2px 12px",
                                                  fontSize: "14px",
                                                  fontFamily: "Gilroy",
                                                  fontWeight: 500,
                                                  margin: "10px",
                                                }}
                                              >
                                                {p.Amnities_Name}
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )
                            )}
                          </div>

                        </div>

                        <div
                          className="card col-lg-6 col-md-6 mb-3 "
                          style={{
                            borderRadius: "20px",
                            padding: "20px",
                            marginTop: 30,
                            
                          
                          }}
                        >
                          <div
                            className="card-header d-flex justify-content-between align-items-center"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <div
                              style={{
                                fontSize: 16,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                              }}
                            >
                              KYC details
                            </div>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-lg-8 col-md-8 col-sm-12">
                                <Form.Group className="mb-3">
                                  <Form.Label
                                    style={{
                                      fontSize: 14,
                                      color: "#222222",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    Aadhaar Number
                                  </Form.Label>
                                  <FormControl
                                    id="form-controls"
                                    placeholder="987654321012"
                                    type="text"
                                    value={props.aadhaarNo}
                                    maxLength={12}
                                    onChange={props.handleAdhaarChange}
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

                              {props.showOtpValidation && (
                                <>
                                  <div className="col-lg-3 col-md-6 col-sm-12">
                                    <Form.Group className="mb-3">
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        OTP
                                      </Form.Label>
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="****"
                                        value={props.kycOtpValue}
                                        onChange={props.handleKycOtpChange}
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
                                    <span
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Didn’t receive OTP?{" "}
                                      <a
                                        href="#"
                                        style={{
                                          textDecoration: "none",
                                          fontSize: 14,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                        onClick={() =>
                                          props.handleValidateAadhaar(item.id)
                                        }
                                      >
                                        Resend
                                      </a>
                                    </span>
                                  </div>
                                </>
                              )}

                              {props.showValidate && (
                                <div
                                  className="mt-2"
                                  style={{ marginBottom: 20 }}
                                >
                                  <Button
                                    style={{
                                      fontFamily: "Montserrat",
                                      fontSize: 16,
                                      backgroundColor: "#1E45E1",
                                      color: "white",
                                      height: 52,
                                      letterSpacing: 1,
                                      borderRadius: 12,
                                      width: "fit-content",
                                    }}
                                    onClick={() =>
                                      props.handleValidateAadhaar(item.id)
                                    }
                                  >
                                    Validate Aadhaar
                                  </Button>
                                </div>
                              )}

                              {props.showOtpValidation && (
                                <div style={{ marginBottom: 20 }}>
                                  <Button
                                    style={{
                                      fontFamily: "Montserrat",
                                      fontSize: 16,
                                      backgroundColor: "#1E45E1",
                                      color: "white",
                                      height: 52,
                                      letterSpacing: 1,
                                      borderRadius: 12,
                                      width: 152,
                                    }}
                                    onClick={() =>
                                      props.handleVerifyOtp(item.id)
                                    }
                                  >
                                    Save Changes
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    </TabPanel>

                    <Modal
                      show={formshow}
                      onHide={handleCloseEditcustomer}
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
                            {customerdetailShow ? (
                              <div>
                                <Modal.Header
                                  style={{
                                    marginBottom: "30px",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 20,
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",
                                    }}
                                  >
                                    Edit Customer
                                    {/* {props.edit === 'Edit' ? "Edit Customer" : "Add an customer"} */}
                                  </div>
                                  <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={handleCloseEditcustomer}
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
                                    style={{
                                      height: 100,
                                      width: 100,
                                      position: "relative",
                                    }}
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
                                        <MdError
                                          style={{ width: 20, height: 20 }}
                                        />
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
                                        Last Name <span style={{ color: "transparent", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
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

                                  <div
                                    className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
                                    controlId="exampleForm.ControlInput1"
                                  >
                                    <Form.Group>
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Mobile number{" "}
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
                                                    <option
                                                      value={item.country_code}
                                                    >
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
                                        style={{
                                          color: "red",
                                          fontSize: 11,
                                          marginTop: 5,
                                        }}
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
                                        Email Id <span style={{ color: "transparent", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                                      </Form.Label>
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter email address"
                                        value={Email}
                                        onChange={(e) => handleEmail(e)}
                                        // style={bottomBorderStyle}
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
                                        Address{" "}
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
                                        value={Address}
                                        placeholder="Enter address"
                                        onChange={(e) => handleAddress(e)}
                                        // style={bottomBorderStyle}
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
                                    {addressError && (
                                      <div style={{ color: "red" }}>
                                        <MdError />
                                        {addressError}
                                      </div>
                                    )}
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
                                      Paying Guest{" "}
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
                                    <Form.Select
                                      aria-label="Default select example"
                                      className="border"
                                      // style={{ backgroundColor: "#f8f9fa", padding: 10, border: "none", boxShadow: "none", width: "100%", fontSize: 12, fontWeight: 700, textTransform: "capitalize" }}
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
                                      {state.UsersList?.hostelList?.map(
                                        (item) => (
                                          <option key={item.id} value={item.id}>
                                            {item.Name}
                                          </option>
                                        )
                                      )}
                                    </Form.Select>
                                    {hostelIdError && (
                                      <div style={{ color: "red" }}>
                                        <MdError />
                                        {hostelIdError}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                {formError && (
                                  <div style={{ color: "red" }}>
                                    <MdError />
                                    {formError}
                                  </div>
                                )}
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
                                  {/* {props.edit === 'Edit' ? "Edit Customer" : "Add an customer"} */}
                                  Edit Customer
                                </Button>
                              </div>
                            ) : (
                              ""
                            )}

                            {customerAsignBed && customerAsignBed ? (
                              <div className="container">
                                <div className="row mb-3"></div>

                                <Modal.Header
                                  style={{
                                    marginBottom: "30px",
                                    position: "relative",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontSize: 20,
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",
                                    }}
                                  >
                                    Edit Assign bed
                                  </div>
                                  <button
                                    type="button"
                                    className="close"
                                    aria-label="Close"
                                    onClick={handleCloseEditcustomer}
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
                                      {state.UsersList?.hosteldetailslist?.map(
                                        (u) => (
                                          <option
                                            key={u.floor_id}
                                            value={u.floor_id}
                                          >
                                            {u.floor_name}
                                          </option>
                                        )
                                      )}
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
                                      Room
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
                                      value={RoomId}
                                      className="border"
                                      id="form-selects"
                                      onChange={(e) => handleRooms(e)}
                                    >
                                      <option>Selected Room</option>
                                      {/* } */}

                                      {state.UsersList?.roomdetails &&
                                        state.UsersList.roomdetails.map(
                                          (item) => (
                                            <option
                                              key={item.Room_Id}
                                              value={item.Room_Id}
                                            >
                                              {item.Room_Name}
                                            </option>
                                          )
                                        )}
                                    </Form.Select>
                                    {roomError && (
                                      <div style={{ color: "red" }}>
                                        <MdError />
                                        {roomError}
                                      </div>
                                    )}
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Bed
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
                                      value={BedId}
                                      className="border"
                                      placeholder="Select a bed"
                                      id="form-selects"
                                      onChange={(e) => handleBed(e)}
                                    >
                                      <option>Select a Bed</option>

                                      {Editbed == "editbeddet" &&
                                        Bednum &&
                                        Bednum[0]?.Bed && (
                                          <option
                                            value={Bednum[0].hstl_Bed}
                                            selected
                                          >
                                            {Bednum[0].Bed}
                                          </option>
                                        )}

                                      {state.UsersList?.bednumberdetails
                                        ?.bed_details?.length > 0 &&
                                        state.UsersList.bednumberdetails.bed_details.map(
                                          (item) =>
                                            item.bed_no &&
                                            !item.bed_no !== "undefined" &&
                                            item.bed_no !== "0" &&
                                            item.bed_no !== "" &&
                                            item.bed_no !== null && (
                                              <option
                                                key={item.id}
                                                value={item.id}
                                              >
                                                {item.bed_no}
                                              </option>
                                            )
                                        )}
                                    </Form.Select>

                                    {bedError && (
                                      <div style={{ color: "red" }}>
                                        <MdError />
                                        {bedError}
                                      </div>
                                    )}
                                  </div>

                                  <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12'>
            <Form.Group className="mb-2" controlId="purchaseDate">
                <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                    Joining date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                </Form.Label>
                <div style={{ position: 'relative', width: "100%" }}>
                <DatePicker
    selected={selectedDate}
    onChange={(date) => {
        setDateError('');
        setSelectedDate(date);
    }}
    dateFormat="yyyy/MM/dd"
    minDate={null}
    maxDate={null} 
    customInput={customDateInput({
        value: selectedDate instanceof Date && !isNaN(selectedDate.getTime())
            ? selectedDate.toLocaleDateString('en-GB')
            : '', 
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
                                {formError && (
                                  <div style={{ color: "red" }}>
                                    <MdError />
                                    {formError}
                                  </div>
                                )}
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
                                  Edit Assign Bed
                                </Button>
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </Modal.Body>

                        <Modal.Footer style={{ border: "none" }}></Modal.Footer>
                      </Modal.Dialog>
                    </Modal>

                    <TabPanel value="2">
                      <UserEb id={props.id} />{" "}
                    </TabPanel>
                    <TabPanel value="3">
                      <UserListInvoice id={props.id} />
                    </TabPanel>

                    <TabPanel value="4">
                      <UserListCompliants id={props.id} />
                    </TabPanel>
                    <TabPanel value="5">
                      <UserListAmenities
                        id={props.id}
                        setcustomerUser_Id={props.setcustomerUser_Id}
                        customerUser_Id={props.customerUser_Id}
                        setHostelIds={props.setHostelIds}
                        hostelIds={props.hostelIds}
                        hostelName={props.hostelName}
                        sethosName={props.sethosName}
                        statusAmni={props.statusAmni}
                      />
                    </TabPanel>
                  </TabContext>
                </div>
              );
            })}
        </>
      )}
    </>
  );
}
export default UserListRoomDetail;

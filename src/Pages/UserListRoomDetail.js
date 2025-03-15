/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import leftarrow from "../Assets/Images/arrow-left.png";
import Image from "react-bootstrap/Image";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Calendars from "../Assets/Images/New_images/calendar.png";
import verify from "../Assets/Images/verify.png";
import "./UserList.css";
import {Call,Sms,House,Buildings,} from "iconsax-react";
import Group from "../Assets/Images/Group.png";
import { useDispatch, useSelector } from "react-redux";
import Money from "../Assets/Images/New_images/Money.png";
import Carousel from "react-bootstrap/Carousel";
import {
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
// import Modal from 'react-bootstrap/Modal';
import Plus from "../Assets/Images/New_images/add-circle.png";
import imageCompression from "browser-image-compression";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import UserEb from "./UserListEb";
import UserListInvoice from "./UserListInvoice";
import UserListAmenities from "./UserListAmenities";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { MdError } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import editliner from "../Assets/Images/Edit-blue.png";
import upload from "../Assets/Images/New_images/upload.png";
import UserListKyc from "./UserListKyc";
import UserAdditionalContact from "./UserAdditionalContact";
import trash from "../Assets/Images/New_images/trash.png";
import docDown from "../Assets/Images/New_images/doc_download.png";
import PropTypes from "prop-types";
import Select from "react-select";

function UserListRoomDetail(props) {
  
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
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
  const [BedId, setBedId] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  const [BalanceDue, setBalanceDue] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [paid_advance, setPaidAdvance] = useState("");
  const [paid_rent, setPaidrent] = useState("");
  const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [AadharNo, setAadharNo] = useState("");
  const [PancardNo, setPancardNo] = useState("");
  const [licence, setLicence] = useState("");
  const [Bednum, setBednum] = useState("");
  const [formshow, setFormShow] = useState(false);
  const [customerdetailShow, setcustomerdetailShow] = useState(false);
  const [customerAsignBed, setcustomerAsignBed] = useState(false);
  const [Editbed, seteditBed] = useState("");
  const [value, setValue] = useState("1");
  const [countryCode, setCountryCode] = useState("91");
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [formError, setFormError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [dateError, setDateError] = useState("");
  const [editMode, seteditMode] = useState(false);
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
  const [kycdetailsForm, setKycDetailForm] = useState(false);
  const [additionalForm, setAdditionalForm] = useState(false);
  const [kycuserDetails, setkycuserDetails] = useState("");
  const [contactEdit, setContactEdit] = useState("");
  const [editAdditional, setEditAdditional] = useState(false);
  const [deleteAdditional, setDeleteAdditional] = useState(false);

  useEffect(() => {
    dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });
  }, [props]);

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerAllDetails === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ALL_DETAILS" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerAllDetails]);

  useEffect(() => {
    
    if (state.UsersList.isUsersListTrue === 3 && value !== "3") {
      setValue("3");
    } else if (state.UsersList.isUsersListTrue !== 3 && value !== "1") {
      setValue("1");
    }
  }, [state.UsersList.isUsersListTrue]);
  


  const handleEditItem = (item) =>{
    
    props.onEditItem(item)
  }
  const handleDeleteItem = (items) =>{
    props.onDeleteItem(items)
  }
  const handleEditRoomItem = (item) => {
    props.onEditRoomItem(item)
  }
  const handleEditHostelItem = (item) => {
    props.onEditHostelItem (item)
  }

 const handleDeleteHostelItem = (user) => {
  
  props.onDeleteHostelItem(user)
 }

 const handleDeleteRoomItem = (user) => {
  props.onDeleteRoomItem(user)
 }

  const handleContactEdit = (u) => {
    setEditAdditional(true);
    setContactEdit(u);
    setAdditionalForm(true);
  };
  const handleKycdetailsForm = (item) => {
    setkycuserDetails(item);
    setKycDetailForm(true);
  };
  const handleAdditionalForm = () => {
    setEditAdditional(false);
    setAdditionalForm(true);
  };

  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };

  const handleChanges = (event, newValue) => {
    setValue(newValue);
    setFormShow(false);
  
  };
  // useEffect(() => {
  //   if (value === "1") {
  //     dispatch({ type: 'UPDATE_USERSLIST_FALSE' });
  //   }
  // }, [value]);
  
  const options = {
    dateFormat: "Y/m/d",
    maxDate: null,
    minDate: null,
  };
  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);

   const [activeRow, setActiveRow] = useState(null);

 
  const handleShowEditBed = (item) => {
    
    if (item[0].ID) {
      if (activeRow === item[0].ID) {
        setActiveRow(null);
      } else {
        setActiveRow(item[0].ID);
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
      setRoomId(item[0].room_id || "");
      setBedId(item[0].hstl_Bed || "");

      const isValidDate =
        item[0].user_join_date && item[0].user_join_date !== "0000-00-00";
      const parsedDate = isValidDate ? new Date(item[0].user_join_date) : null;

      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      } else {
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
    if (item[0].ID) {
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
        payload: { hostel_Id: state.login.selectedHostel_Id, floor_Id: Floor },
      });
    }
  }, [Floor]);

  const handleFirstName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstname(value);
    setFirstnameError("");
    setFormError("");
  };
  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setLastname(value);
    setFormError("");
  };

  // useEffect(() => {
  //   const currentDate = moment().format("YYYY-MM-DD");
  //   const joinDate = moment(currentDate).format("YYYY-MM-DD");
  //   const currentMonth = moment(currentDate).month() + 1;
  //   const currentYear = moment(currentDate).year();
  //   const createdAtMonth = moment(joinDate).month() + 1;
  //   const createdAtYear = moment(joinDate).year();

  //   if (currentMonth === createdAtMonth && currentYear === createdAtYear) {
  //     var dueDate = moment(joinDate).endOf("month").format("YYYY-MM-DD");
  //     var invoiceDate = moment(joinDate).format("YYYY-MM-DD");
  //   } else {
  //     var dueDate = moment(currentDate).endOf("month").format("YYYY-MM-DD");
  //     var invoiceDate = moment(currentDate)
  //       .startOf("month")
  //       .format("YYYY-MM-DD");
  //   }

  //   const formattedJoinDate = moment(invoiceDate).format("YYYY-MM-DD");
  //   const formattedDueDate = moment(dueDate).format("YYYY-MM-DD");
  //   const numberOfDays =
  //     moment(formattedDueDate).diff(moment(formattedJoinDate), "days") + 1;

  //   const totalDaysInCurrentMonth = moment(currentDate).daysInMonth();

  //   const oneday_amount = RoomRent / totalDaysInCurrentMonth;

  //   const payableamount = oneday_amount * numberOfDays;
  //   const This_month_payableamount = Math.round(payableamount);
  //   setPayableamount(This_month_payableamount);
  // }, [RoomRent]);

 
  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, ""); 
    setPhone(input);
  
    if (input.length === 0) {
      setPhoneError(""); 
    } else if (input.length < 10) {
      setPhoneError("Invalid mobile number *");
    } else if (input.length === 10) {
      setPhoneError(""); 
    }
  
    setPhoneErrorMessage("");
    setFormError("")
    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
   useEffect(() => {
    setEmailErrorMessage(state.UsersList.emailError);
    }, [state.UsersList.emailError]);
  const handleEmail = (e) => {
    const emailValue = e.target.value.toLowerCase();
    setEmail(emailValue);

    
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
    const isValidEmail = emailRegex.test(emailValue);

    if (!emailValue) {
      setEmailError("");
      setEmailErrorMessage("");
    }  else if (!isValidEmail) {
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

 
  const aadharInputRef = useRef(null);
  const otherDocInputRef = useRef(null);
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
      dispatch({ type: "CONTACTALLDETAILS", payload: { user_id: props.id } });
    }
  }, [props.id]);

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: state.login.selectedHostel_Id },
    });
  }, [hostel_Id]);



  useEffect(() => {
    const selectedHostel =
    state.UsersList.hostelListNewDetails.data &&
    state.UsersList.hostelListNewDetails.data.filter(
        (item) => item.id === state.login.selectedHostel_Id
      );
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    setHostel_Id(state.login.selectedHostel_Id);
  }, []);

  // const handleHostelId = (e) => {
  //   const selectedHostelId = e.target.value;
  //   // handleInputChange()
  //   const selectedHostel =
  //     state.UsersList.hostelList &&
  //     state.UsersList.hostelList.filter((item) => item.id == e.target.value);
  //   setHostel_Id(selectedHostelId);
  //   setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
  //   if (selectedHostelId === "Select a PG") {
  //     setHostelIdError("Please select a valid PG");
  //   } else {
  //     setHostelIdError("");
  //   }
  //   setFloor("");
  //   setRooms("");
  //   setBed("");
  //   setHostelIdError("");
  //   setFormError("");
  //   setRoomId("");
  //   setBedId("");
  // };
  // const handleFloor = (selectedOption) => {
  //   setFloor(selectedOption?.value || '');

  //   if (selectedOption === "Selected Floor") {
  //     setfloorError("Please select a valid floor");
  //   } else {
  //     setfloorError("");
  //   }
  //   // handleInputChange()
  //   setRooms("");
  //   setfloorError("");
  //   setFormError("");
  //   setRoomId("");
  //   setBedId("");
  //   setRoomRent(0);
  // };
  const handleFloor = (selectedOption) => {
    if (selectedOption) {
      setFloor(selectedOption.value); // correctly set value
      setfloorError("");
    } else {
      setFloor("");
      setfloorError("Please select a valid floor");
    }
  
    // Reset dependent fields
    setRooms("");
    setRoomId("");
    setBedId("");
    setRoomRent(0);
    setFormError("");
  };
  

  useEffect(() => {
    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: {
        hostel_id: state.login.selectedHostel_Id,
        floor_id: Floor,
        room_id: RoomId,
      },
    });
  }, [Rooms]);

  const handleRooms = (selectedOption) => {
    const roomIdValue = selectedOption?.value || "";
    setRoomId(roomIdValue);

    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: {
        hostel_id: hostel_Id,
        floor_id: Floor,
        room_id: roomIdValue,
      },
    });
    if (roomIdValue === "Selected Room") {
      setRoomError("Please select a valid Room");
    } else {
      setRoomError("");
    }
    setRoomError("");
    setFormError("");
    setBedId("");
    setRoomRent(0);
    // handleInputChange()
  };

  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    if (!/^\d*$/.test(roomRentValue)) {
      return; 
    }
    // handleInputChange()
    setRoomRent(roomRentValue);
    setRoomRentError("");
    setFormError("");
  };

  console.log("BedId",BedId)
  const handleBed = (e) => {
    const selectedBedId = e.target.value;
    setBedId(selectedBedId);
  
    const Bedfilter = state?.UsersList?.roomdetails?.filter(
      (u) =>
        String(u.Hostel_Id) === String(hostel_Id) &&
        String(u.Floor_Id) === String(Floor) &&
        String(u.Room_Id) === String(RoomId)
    );
  
    const Roomamountfilter =
      Bedfilter?.[0]?.bed_details?.filter(
        (amount) => String(amount.id) === String(selectedBedId)
      ) ?? [];
  
    if (Roomamountfilter.length > 0) {
      const selectedRoomRent = Roomamountfilter[0]?.bed_amount;
  
      if (editMode && String(selectedBedId) === String(initialStateAssign.Bed)) {
        setRoomRent(initialStateAssign.RoomRent);
      } else {
        setRoomRent(selectedRoomRent);
      }
    } else {
      // Optional: if no rent found, clear or reset rent
      setRoomRent('');
    }
  
    if (selectedBedId === "Select a Bed") {
      setBedError("Please select a valid Bed");
    } else {
      setBedError("");
    }
  
    setFormError("");
    setRoomRentError("");
  };
  
  
  const bedOptions = [
    { value: '', label: 'Select a Bed' },
    ...(Editbed === "editbeddet" && Bednum?.[0]?.Bed
      ? [{ value: Bednum[0].hstl_Bed, label: Bednum[0].Bed }]
      : []),
    ...(state.UsersList?.bednumberdetails?.bed_details
      ?.filter((item) => item.bed_no && item.bed_no !== "0" && item.bed_no !== "undefined")
      .map((item) => ({
        value: item.id,
        label: item.bed_no,
      })) || []),
  ];
 

  

  const handleAdvanceAmount = (e) => {
    // handleInputChange()
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return; 
    }
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
    setFormError("");
  };

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
    setDateError("");
    setActiveRow(null)
    setEmailErrorMessage("")
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const [firstnameError, setFirstnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");

  const validateField = (value, fieldName) => {
    // Ensure value is a string before using trim
    const stringValue = String(value).trim();
  
    // Special case: Skip validation for Email if value is N/A or similar
    if (
      fieldName === "Email" &&
      ["n/a", "na"].includes(stringValue.toLowerCase())
    ) {
      setEmailError(""); // No error for N/A email
      return true;
    }
  
    if (!stringValue) {
      switch (fieldName) {
        case "First Name":
          setFirstnameError("First Name is Required");
          break;
        case "Phone Number":
          setPhoneError("Phone Number is Required");
          break;
        case "Email":
          setEmailError("Email is Required");
          break;
        case "Address":
          setAddressError("Address is Required");
          break;
        case "Hostel ID":
          setHostelIdError("Hostel ID is Required");
          break;
        default:
          break;
      }
      return false;
    }
  
    return true;
  };
  

  const handleSaveUserlist = () => {
    let hasError = false;
    if (!validateField(firstname, "First Name")) return;
    if (!validateField(Phone, "Phone Number")) return;
    if (!validateField(Address, "Address")) return;
    if (!validateField(hostel_Id, "Hostel ID")) return;

    if (hostel_Id === "Select a PG" || hostelIdError) {
      setHostelIdError("Please select a valid PG"); 
      return;
    }
    if (Phone.length !== 10) {
      setPhoneError("Please Enter Valid Mobile Number");
      hasError = true;
    } else {
      setPhoneError("");
      setPhoneErrorMessage("");
    }
  
    if (Email && !["n/a", "na"].includes(Email.toLowerCase().trim())) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(Email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter Valid Email ID");
        hasError = true;
      } else {
        setEmailError("");
      }
    } else {
      setEmailError(""); // Don't show error if Email is empty or "N/A"
    }
    

    if (hasError) return;
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
      setFormError("No Changes Detected");
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
      ID: id,
    };
    dispatch({
      type: "ADDUSER",
      payload: payload,
    });

   

    // setFormShow(false);
  };
  const [generateForm,seGenerateForm]= useState(false)
const handlegenerateForm = ()=>{
  seGenerateForm(true)
}


const handleCloseGenerateFormShow =()=>{
  seGenerateForm(false)
}
const handleGenerateAdvance=()=>{
  dispatch({ type: "ADVANCEGENERATE", payload: { user_id: props.id } });
}


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
          setfloorError("Floor is Required");
          break;
        case "RoomId":
          setRoomError("Room is Required");
          break;
        case "BedId":
          setBedError("Bed is Required");
          break;
        case "selectedDate":
          setDateError("date is Required");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Advance Amount is Required");
          break;
        case "RoomRent":
          setRoomRentError("Room Rent is Required");
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
      setDateError("Joining Date is Required");
      return;
    } else {
      setDateError("");
    }

    // Check if room rent is valid
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter Valid Rent Amount");
      return;
    } else {
      setRoomRentError("");
    }

    // Check if advance amount is valid
    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
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

    if (BedId === "" || BedId === "Select a Bed") {
      setBedError("Please select a valid Bed");
      return; 
    }

    // Format the date
    let formattedDate = null;
    try {
      formattedDate = new Date(selectedDate).toISOString().split("T")[0];
    } 
    catch (errors) {  
      console.log("errors",errors)
      setDateError("Invalid date format.");
      return;
  }
  

    // Detect any changes
    const isChangedBed =
      String(Floor).toLowerCase() !==
        String(initialStateAssign.Floor).toLowerCase() ||
      String(RoomId).toLowerCase() !==
        String(initialStateAssign.Rooms).toLowerCase() ||
      String(BedId).toLowerCase() !==
        String(initialStateAssign.Bed).toLowerCase() ||
      formattedDate !==
        new Date(initialStateAssign.selectedDate).toISOString().split("T")[0] ||
      Number(AdvanceAmount) !== Number(initialStateAssign.AdvanceAmount) ||
      Number(RoomRent) !== Number(initialStateAssign.RoomRent);

    if (!isChangedBed) {
      setFormError("No Changes Detected");
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
        ID: id,
      },
    });
    // Trigger post-edit actions
 

    setFormShow(false);
    dispatch({ type: "INVOICELIST" });
  };

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerCoatact === 200) {
      dispatch({ type: "CONTACTALLDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_CUSTOMER_ADD_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerCoatact]);

  useEffect(() => {
    if (state.UsersList.statusCodeForAddUser === 200) {
      handleCloseEditcustomer()
      dispatch({ type: "USERLIST", payload: { hostel_id: hostel_Id } });
      dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });

      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForAddUser, state.UsersList.Users]);
const [advanceDetail,setAdvanceDetail] = useState("")
  useEffect(()=>{
if(state.UsersList.customerdetails.data){
setAdvanceDetail(state.UsersList.customerdetails.data)
}
  },[state.UsersList.customerdetails.data])

  
  
  
  // const handleButtonClick = async () => {
  //   const pdfUrl = advanceDetail[0]?.doc1;

  //   if (pdfUrl) {
  //     console.log("PDF URL", pdfUrl);

  //     const pdfWindow = window.open(pdfUrl, "_blank");
  //     if (pdfWindow) {
  //       console.log("PDF opened successfully.");
  //       // setShowLoader(false);
  //     } else {
  //       console.error("Failed to open the PDF.");
  //     }
  //   }
  // };
  
  

  
  
  

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


const [uploadError,setUploadError]= useState("")

useEffect(()=>{
  setUploadError(state.UsersList.adharuploadfileError)
},[state.UsersList.adharuploadfileError])
  
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      if (type === "doc1") {
        dispatch({
          type: "UPLOADDOCUMENT",
          payload: {
            user_id: props.id,
            type,
            file1: file,
          },
        });
      } else if (type === "doc2") {
        // setOtherFile(file.name);
        dispatch({
          type: "UPLOADOTHERDOCUMENT",
          payload: {
            user_id: props.id,
            type,
            file1: file,
          },
        });
      }
    }
  };

  // const handleUploadClick = (ref) => {
  //   ref.current.click(); 
  //   setUploadError("")
  //   dispatch({type:"CLEAR_ADHAR_UPLOAD_ERROR"})
    
  // };
  const handleUploadClick = (ref) => {
    if (ref?.current) {
      ref.current.click();
    }
    setUploadError(""); 
    dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR" });
  }
  useEffect(()=>{
    if(state.UsersList.statuscodeForAdharFileError === 201){
      setUploadError(state.UsersList.adharuploadfileError)
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE" });
      }, 100);
    }
  },[state.UsersList.statuscodeForAdharFileError])
  const handleOtherUploadClick = (ref) => {
    ref.current.click(); 
  };

  useEffect(()=>{
    if(state.UsersList.statusCodeForUploadDocument === 200){
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id}});
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPLOAD_DOCUMENT" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR" });
      }, 500);
    }
      },[state.UsersList.statusCodeForUploadDocument])

    


      useEffect(()=>{
        if(state.UsersList.statusCodeForOtherDocu === 200){
          dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id}});
          setTimeout(() => {
            dispatch({ type: "CLEAR_UPLOAD_OTHER_DOCUMENT" });
          }, 100);
        }
          },[state.UsersList.statusCodeForOtherDocu])
  // const handleUploadClick = (ref) => {
  //   ref.current.click(); // Trigger the hidden file input
  // };


  const [contactDeleteId, setContactDeleteId] = useState("");
  const handleContactDelete = (v) => {
    setDeleteAdditional(true);
    setContactDeleteId(v.id);
  };
  const handleCloseDelete = () => {
    setDeleteAdditional(false);
  };

  const handleDeleteContact = () => {
    dispatch({ type: "CONTACTDELETE", payload: { id: contactDeleteId } });
  };

  useEffect(() => {
    if (state.UsersList.statusCodeDeleteContact === 200) {
      handleCloseDelete();
      dispatch({ type: "CONTACTALLDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_CONTACT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeDeleteContact]);

useEffect (()=>{
if(state.UsersList.statusCodeForGenerateAdvance === 200){
  handleCloseGenerateFormShow ()
  dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id } });
  dispatch({ type: "USERLIST", payload: { hostel_id: hostel_Id } });
  setTimeout(() => {
    dispatch({ type: "REMOVE_GENERATE_ADVANCE" });
  }, 500);
}
},[state.UsersList.statusCodeForGenerateAdvance ])
  return (
    <>
      {props.roomDetail && (
        <>
          {props.userDetails &&
            props.userDetails.map((item) => {
              const imageUrl = item.profile || Profile;
              return (
                <div
                  key={item.ID}
                  className="container mt-2"
                  // style={{ marginLeft: "-20px" }}
                >
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
                    <div style={{position:"fixed"}}>
                    <img
                      src={leftarrow}
                      alt="leftarrow"
                      width={20}
                      height={20}
                      onClick={props.handleBack}
                      style={{ cursor: "pointer" }}
                    />
                    <span
                      style={{
                        fontWeight: 600,
                        fontSize: "18px",
                        // marginLeft: 15,
                        fontFamily: "Gilroy",
                        paddingLeft:"10px"
                      }}
                    >
                      Customer Profile
                    </span>{" "}
                    </div>
                  </div>
                  <div className="card mt-3" style={{ borderRadius: "24px",marginLeft:'20px' }}>
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
                            {/* <img
                              src={verify}
                              width={17}
                              height={17}
                              style={{ marginTop: "-3px" }}
                            /> */}
                          </span>
                          {/* <p style={{ marginTop: 10 }}>
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
                          </p> */}
                          <p
                            style={{ marginTop: 8 ,cursor:"pointer"}}
                            onClick={() => {
                              handleKycdetailsForm(item);
                            }}
                          >
                            KYC Verified
                            <img
                              src={verify}
                              alt="verify"
                              width={17}
                              height={17}
                              style={{ marginTop: "-3px" }}
                            />
                          </p>
                        </div>
                      </div>

                      {/* <div  onClick={() => handleShowEditBed(props.userDetails)}>
                        <img src={dots} width={40} height={40} />
                      </div> */}


{/* 
 cursor: props.customerEditPermission
 opacity: props.customerEditPermission ? 0.6 : 1, */}

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
                                                       zIndex:
                                                         activeRow === item.ID
                                                           ? 1000
                                                           : "auto",
                                                       backgroundColor:
                                                         activeRow === item.ID
                                                           ? "#E7F1FF"
                                                           : "white",
                                                     }}
                                                     onClick={() => {
                                                      if (!props.customerEditPermission) {
                                                        handleShowEditBed(props.userDetails);
                                                      }
                                                    }}
                                                   >
                                                     <PiDotsThreeOutlineVerticalFill
                                                       style={{ height: 20, width: 20 }}
                                                     />
                                                       </div>

                      {/* <div
                        onClick={() => {
                          if (!props.customerEditPermission) {
                            handleShowEditBed(props.userDetails);
                          }
                        }}
                        style={{
                          cursor: props.customerEditPermission
                            ? "not-allowed"
                            : "pointer",
                          opacity: props.customerEditPermission ? 0.6 : 1,
                          zIndex:
                                              activeRow === item.ID
                                                ? 1000
                                                : "auto",
                          backgroundColor:
                                  activeRow === item.ID
                                                ? "#E7F1FF"
                                                : "white",
                        }}
                      >
                        <img
                          src={dots}
                          alt="dots"
                          width={40}
                          height={40}
                          style={{
                            filter: props.customerEditPermission
                              ? "grayscale(100%)"
                              : "none",
                          }}
                        />
                      </div> */}
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
                          {/* <Tab
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
                          /> */}
                          <Tab
                            label="Amenities"
                            value="4"
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
                        <div className="roomdetailscard">
                          <div style={{ flex: 1 }}>
                            {/* <div className="mt-3 d-flex flex-column flex-md-row justify-content-end"> */}
                            <div className="col-md-12 mb-3 mb-md-0">
                              <div
                                className="card"
                                style={{
                                  borderRadius: "20px",
                                  padding: "20px",
                                  marginLeft:'20px'
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
                                    Basic Information
                                  </div>
                                  <div
                                    style={{
                                      cursor: props.customerEditPermission
                                        ? "not-allowed"
                                        : "pointer",
                                      opacity: props.customerEditPermission
                                        ? 0.6
                                        : 1,
                                    }}
                                  >
                                    <div
                                      onClick={() => {
                                        if (!props.customerEditPermission) {
                                          handleEditUser(props.userDetails);
                                        }
                                      }}
                                      style={{
                                        cursor: props.customerEditPermission
                                          ? "not-allowed"
                                          : "pointer",
                                        height: 40,
                                        width: 40,
                                        borderRadius: 100,
                                        border: "1px solid #EFEFEF",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                        zIndex: 1000,
                                        backgroundColor:
                                          props.customerEditPermission
                                            ? "#F5F5F5"
                                            : "#FFF",
                                      }}
                                    >
                                      <PiDotsThreeOutlineVerticalFill
                                        style={{
                                          height: 20,
                                          width: 20,
                                          color: props.customerEditPermission
                                            ? "#CCCCCC"
                                            : "#000",
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="card-body">
                                  <div className="row">
                                    <div className="col-sm-4 d-flex flex-column align-items-start">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Floor
                                      </p>
                                      <p style={{ marginTop: "-10px" }}>
                                        <Buildings size="16" color="#1E45E1" />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            marginLeft: 5,
                                          }}
                                        >
                                          {/* {item.HostelName} */}{" "}
                                          {item.Floor &&
                                          item.Floor !== "undefined" &&
                                          item.Floor !== 0 &&
                                          item.Floor !== "null"
                                            ? item.Floor
                                            : "N/A"}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-sm-4 d-flex flex-column align-items-center">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Room
                                      </p>
                                      <p
                                        onClick={() => {
                                          if (!props.customerEditPermission) {
                                            handleShowEditBed(
                                              props.userDetails
                                            );
                                          }
                                        }}
                                        style={{
                                          cursor: props.customerEditPermission
                                            ? "not-allowed"
                                            : "pointer",
                                          opacity: props.customerEditPermission
                                            ? 0.6
                                            : 1,
                                          marginTop: "-10px",
                                        }}
                                      >
                                        <img
                                          src={Group}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission
                                              ? "grayscale(100%)"
                                              : "none",
                                          }}
                                        />
                                        <span
                                          style={{
                                            marginLeft: 5,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            marginTop: "-10px",
                                            cursor: props.customerEditPermission
                                              ? "not-allowed"
                                              : "pointer",
                                            color: props.customerEditPermission
                                              ? "#888888"
                                              : "#000000",
                                          }}
                                        >
                                          {item.Rooms ? item.Rooms : "N/A"}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-sm-4 d-flex flex-column align-items-end">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Bed
                                      </p>
                                      <p
                                        onClick={() => {
                                          if (!props.customerEditPermission) {
                                            handleShowEditBed(
                                              props.userDetails
                                            );
                                          }
                                        }}
                                        style={{
                                          cursor: props.customerEditPermission
                                            ? "not-allowed"
                                            : "pointer",
                                          opacity: props.customerEditPermission
                                            ? 0.6
                                            : 1,
                                          marginTop: "-10px",
                                        }}
                                      >
                                        <img
                                          src={Group}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission
                                              ? "grayscale(100%)"
                                              : "none",
                                          }}
                                        />
                                        <span
                                          style={{
                                            marginLeft: 5,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            cursor: props.customerEditPermission
                                              ? "not-allowed"
                                              : "pointer",
                                            color: props.customerEditPermission
                                              ? "#888888"
                                              : "#000000",
                                          }}
                                        >
                                          {item.Bed ? item.Bed : "N/A"}
                                        </span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-sm-4 d-flex flex-column align-items-start">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Email ID
                                      </p>
                                      <p style={{ marginTop: "-10px" }}>
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
                                    <div
                                      className="col-sm-4 d-flex flex-column align-items-center"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Mobile No
                                      </p>
                                      <p style={{ marginTop: "-10px" }}>
                                        <Call size="16" color="#1E45E1" />
                                        <span
                                          style={{
                                            marginLeft: 5,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            whiteSpace: "nowrap",
                                          }}
                                        >
                                          +
                                          {item &&
                                            String(item.Phone).slice(
                                              0,
                                              String(item.Phone).length - 10
                                            )}{" "}
                                          {item &&
                                            String(item.Phone).slice(-10)}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-sm-4 d-flex flex-column align-items-end">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        RoomRent
                                      </p>
                                      <p style={{ marginTop: "-10px" }}>
                                        {/* <Call size="16" color="#1E45E1" /> */}
                                        <img
                                          src={Money}
                                          alt="money"
                                          width={16}
                                          height={16}
                                        />
                                        <span
                                          style={{
                                            marginLeft: 5,
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                          }}
                                        >
                                          ₹ {props.userDetails[0].RoomRent}
                                        </span>
                                      </p>
                                    </div>
                                  </div>

                                  <div className="row">
                                    <div className="col-sm-12">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Address
                                      </p>
                                      <p style={{ marginTop: "-10px" }}>
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
                             <div className="col-lg-12 col-md-12">
                            <div
                              className="card"
                              style={{
                                borderRadius: "20px",
                                padding: "30px",
                                marginTop: 30,
                                marginLeft:'20px',
                                
                              }}
                            >
                              {/* Header */}
                              <div
                                className="card-header d-flex justify-content-between align-items-center"
                                style={{
                                  backgroundColor: "transparent",
                                  display: "flex",
                                  alignItems: "center",
                                  borderBottom: "1px solid #e0e0e0",
                                  marginBottom: "15px",
                                 
                                }}
                              >
                                <div
                                  style={{
                                    fontSize: 16,
                                    fontWeight: 600,
                                    fontFamily: "Gilroy, sans-serif",
                                    lineHeight: "40px",
                                  }}
                                >
                                  Document details
                                </div>
                              </div>

                              {/* Upload Section */}
                              <div
                                className="row"
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                {/* Aadhar Card */}
                                <div className="col-6 text-start">
      <label
        style={{
          display: "block",
          fontSize: 14,
          fontWeight: 500,
          marginBottom: "10px",
        }}
      >
        Aadhar Card
      </label>
      <button
        className="btn"
        style={{
          borderRadius: "10px",
          padding: "10px 20px",
          fontSize: "14px",
          border: "1px solid #D9D9D9",
        }}
        onClick={() => handleUploadClick(aadharInputRef)}
      >
        <img
          src={upload}
          alt="upload"
          width={20}
          height={20}
          style={{ marginRight: "8px" }}
        />
        Upload Document
      </button>
       <input
         type="file"
         ref={aadharInputRef}
         style={{ display: "none" }}
         onChange={(e) => handleFileChange(e, "doc1")}
         
      />  
      {/* <img src={docDown} style={{width:20,height:20}}/> */}
      {/* {advanceDetail && advanceDetail[0]?.doc1 && (
  <img src={docDown} style={{ width: 20, height: 20, marginLeft: "10px" }} />
)} */}
{advanceDetail[0]?.doc1 && (
  <a href={advanceDetail[0]?.doc1} target="_blank" rel="noopener noreferrer">
    <img src={docDown} alt="docdown" style={{ width: 20, height: 20, marginLeft: "10px" }} />
  </a>
)}
  
     {uploadError && (
                               <div style={{ color: "red" }}>
                                 <MdError />
                                <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{uploadError}</span> 
                               </div>
                             )}
    </div>

                                {/* Other Document */}
                                <div className="col-6 text-start">
                                  <label
                                    style={{
                                      display: "block",
                                      fontSize: 14,
                                      fontWeight: 500,
                                      marginBottom: "10px",
                                    }}
                                  >
                                    Other Document
                                  </label>
                                  <button
                                    className="btn "
                                    style={{
                                      borderRadius: "10px",
                                      padding: "10px 20px",
                                      fontSize: "14px",
                                      border: "1px solid #D9D9D9",
                                    }}
                                    // onClick={handleOtherDocument}
                                    onClick={() => handleOtherUploadClick(otherDocInputRef)}
                                  >
                                    <img
                                      src={upload}
                                      alt="upload"
                                      width={20}
                                      height={20}
                                      style={{ marginRight: "8px" }}
                                    />
                                    Upload Document
                                  </button>
                                  <input
                                    type="file"
                                    ref={otherDocInputRef}
                                    style={{ display: "none" }}
                                    // onChange={(e) =>
                                    //   handleOtherDocUploadClick(e, "doc2")
                                    // }
                                    onChange={(e) => handleFileChange(e, "doc2")}
                                  />  
                                  {/* <img src={docDown} style={{width:20,height:20}}/> */}
                                  {/* {advanceDetail && advanceDetail[0]?.doc2 && (
  <img src={docDown} style={{ width: 20, height: 20, marginLeft: "10px" }} />
)} */}


{advanceDetail && advanceDetail[0]?.doc2 && (
  <img
    src={docDown}
    style={{ width: 20, height: 20, marginLeft: "10px", cursor: "pointer" }}
    alt="Download Document"
    onClick={() => window.open(advanceDetail[0]?.doc2, "_blank")}
  />
)}
                                  
                                </div>
                              </div>
                            </div>
                            </div>
                          </div>

                          {/* </div> */}
                          <div style={{ flex: 1 }}>
                            <div>
                              <div
                                className="col-md-12 col-lg-12 mb-3 mb-md-0"
                                style={{ paddingLeft: 20, paddingRight: 20 }}
                              >
                               
                                    <div
                                      // key={}
                                      className="card"
                                      style={{
                                        borderRadius: "20px",
                                        padding: "10px",
                                      }}
                                    >
                                      <div
                                        className="card-header d-flex justify-content-between align-items-center"
                                        style={{
                                          backgroundColor: "transparent",
                                          display: "flex",
                                          alignItems: "center",
                                        }}
                                      >
                                        <div
                                          style={{
                                            fontSize: 16,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            lineHeight: "40px",
                                          }}
                                        >
                                          Advance Detail
                                        </div>
                                        {/* <img
                                          src={editliner}
                                          alt="Edit Icon"
                                          width={20}
                                          height={20}
                                        /> */}
                                      </div>

                                      <div className="card-body">

                                      {
  props.userDetails[0]?.AdvanceAmount > 0 
    ? <div className="row mb-3">
    {/* Advance Amount */}
    <div className="col-sm-4 d-flex flex-column align-items-start">
      <div
        style={{
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "Gilroy",
        }}
      >
        Advance Amount
      </div>
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          fontFamily: "Gilroy",
        }}
      >
        <img
          src={Money}
          alt="Money Icon"
        />{" "}
        ₹
        {
          props.userDetails[0]
            ?.AdvanceAmount
        }
      </p>
    </div>

    {/* Bill Status - Generate */}
    {!advanceDetail[0]?.inv_id &&
    <div className="col-sm-4 d-flex flex-column align-items-center">
      {/* <strong
        style={{
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "Gilroy",
        }}
      >
        Bill Status
      </strong> */}
     
      <Button
      style={{
        width: 102,
        height: 31,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Gilroy",
        fontSize: 14,
        fontWeight: 500,
        backgroundColor: "#1E45E1",
        color: "#fff",
        borderRadius: "5px",
        marginTop: "10px",
      }}
      onClick={handlegenerateForm}
    >
      Generate
    </Button>
   
     
    </div>
}
    {/* Bill Status - Paid */}
    <div className="col-sm-4 d-flex flex-column align-items-end">
      <strong
        style={{
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "Gilroy",
          textAlign:"start",paddingRight:15
        }}
      >
        Bill Status
      </strong>
      <p
        style={{
          backgroundColor: "#D9FFD9",
          padding: "2px 12px",
          borderRadius: "10px",
          display: "inline-block",
          fontFamily: "Gilroy",
          fontSize: "14px",
          fontWeight: "500",
          marginTop: "5px",
        }}
      >
         {state.UsersList?.customerdetails.data &&
      state.UsersList?.customerdetails.data.map((item) => (
        <>
          {item.status}
            </>
              ))}
        {/* Paid */}
      </p>
    </div>
  </div> 
    : <div style={{fontSize:18,fontFamily:"Gilroy",fontWeight:600,textAlign:"center"}}>In this User Not Assigned</div>
}
                                        
                                      </div>

                                    </div>
                                
                              </div>

                              <div
                                className="col-md-12 col-lg-12 mb-md-0"
                                style={{
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  marginTop: 30,
                                }}
                              >
                                <div
                                  className="card"
                                  style={{
                                    borderRadius: "20px",
                                    padding: "20px",
                                  }}
                                >
                                  <div
                                    className="card-header d-flex justify-content-between align-items-center"
                                    style={{
                                      backgroundColor: "transparent",
                                      borderBottom: "1px solid #e0e0e0",
                                      marginBottom: "15px",
                                    }}
                                  >
                                    <div
                                      className="fw-semibold"
                                      style={{
                                        fontSize: 16,
                                        lineHeight: "40px",
                                      }}
                                    >
                                      Additional Contact
                                    </div>
                                    <button
                                      className="btn btn-link fw-medium text-decoration-none"
                                      style={{ fontSize: 14 }}
                                      onClick={handleAdditionalForm}
                                    >
                                      + Add Contact
                                    </button>
                                  </div>

                                  <div className="card-body">
                                    {state?.UsersList?.customerAllDetails
                                      ?.contact_details?.length > 0 ? (
                                      state.UsersList.customerAllDetails
                                        .contact_details.length > 1 ? (
                                        <Carousel interval={null} indicators>
                                          {state.UsersList.customerAllDetails.contact_details.map(
                                            (v, index) => (
                                              <Carousel.Item key={index}>
                                                <div>
                                                  <p>
                                                    Contact Info{" "}
                                                    <img
                                                      src={editliner}
                                                      alt="Edit Icon"
                                                      width={15}
                                                      height={15}
                                                      onClick={() =>
                                                        handleContactEdit(v)
                                                      }
                                                    />
                                                    <img
                                                      src={trash}
                                                      alt="Trash Icon"
                                                      width={15}
                                                      height={15}
                                                      className="ms-2"
                                                      onClick={() =>
                                                        handleContactDelete(v)
                                                      }
                                                    />
                                                  </p>

                                                  <div className="row mb-3">
                                                    <div className="col-sm-4">
                                                      <p className="mb-1 small fw-medium">
                                                        Contact Name
                                                      </p>
                                                      <p className="mb-0 fw-semibold">
                                                        {v.user_name}
                                                      </p>
                                                    </div>
                                                    <div className="col-sm-4 text-center">
                                                      <p className="mb-1 small fw-medium">
                                                        Mobile No
                                                      </p>
                                                      <p className="mb-0 fw-semibold">
                                                        +
                                                        {v &&
                                                          String(
                                                            v.mob_no
                                                          ).slice(
                                                            0,
                                                            String(v.mob_no)
                                                              .length - 10
                                                          )}{" "}
                                                        {v &&
                                                          String(
                                                            v.mob_no
                                                          ).slice(-10)}
                                                      </p>
                                                    </div>
                                                    <div className="col-sm-4 text-end">
                                                      <p className="mb-1 small fw-medium">
                                                        Guardian
                                                      </p>
                                                      <p className="mb-0 fw-semibold">
                                                        {v.guardian}
                                                      </p>
                                                    </div>
                                                  </div>

                                                  <div className="row">
                                                    <div className="col-sm-12">
                                                      <p className="mb-1 small fw-medium">
                                                        Address
                                                      </p>
                                                      <p className="mb-0 fw-semibold">
                                                        {v.address}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </div>
                                              </Carousel.Item>
                                            )
                                          )}
                                        </Carousel>
                                      ) : (
                                        <div>
                                          {state.UsersList.customerAllDetails.contact_details.map(
                                            (v, index) => (
                                              <div key={index}>
                                                <p>
                                                  Contact Info{" "}
                                                  <img
                                                    src={editliner}
                                                    alt="Edit Icon"
                                                    width={15}
                                                    height={15}
                                                    onClick={() =>
                                                      handleContactEdit(v)
                                                    }
                                                  />
                                                  <img
                                                    src={trash}
                                                    alt="Trash Icon"
                                                    width={15}
                                                    height={15}
                                                    className="ms-2"
                                                    onClick={() =>
                                                      handleContactDelete(v)
                                                    }
                                                  />
                                                </p>

                                                <div className="row mb-3">
                                                  <div className="col-sm-4">
                                                    <p className="mb-1 small fw-medium">
                                                      Contact Name
                                                    </p>
                                                    <p className="mb-0 fw-semibold">
                                                      {v.user_name}
                                                    </p>
                                                  </div>
                                                  <div className="col-sm-4 text-center">
                                                    <p className="mb-1 small fw-medium">
                                                      Mobile no
                                                    </p>
                                                    <p className="mb-0 fw-semibold">
                                                      +
                                                      {v &&
                                                        String(v.mob_no).slice(
                                                          0,
                                                          String(v.mob_no)
                                                            .length - 10
                                                        )}{" "}
                                                      {v &&
                                                        String(v.mob_no).slice(
                                                          -10
                                                        )}
                                                    </p>
                                                  </div>
                                                  <div className="col-sm-4 text-end">
                                                    <p className="mb-1 small fw-medium">
                                                      Guardian
                                                    </p>
                                                    <p className="mb-0 fw-semibold">
                                                      {v.guardian}
                                                    </p>
                                                  </div>
                                                </div>

                                                <div className="row">
                                                  <div className="col-sm-12">
                                                    <p className="mb-1 small fw-medium">
                                                      Address
                                                    </p>
                                                    <p className="mb-0 fw-semibold">
                                                      {v.address}
                                                    </p>
                                                  </div>
                                                </div>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )
                                    ) : (
                                      <div style={{fontSize:18,fontFamily:"Gilroy",fontWeight:600,textAlign:"center"}}>No data Found</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {kycdetailsForm === true ? (
                          <UserListKyc
                            kycdetailsForm={kycdetailsForm}
                            setKycDetailForm={setKycDetailForm}
                            kycuserDetails={kycuserDetails}
                          />
                        ) : null}
                        {additionalForm === true ? (
                          <UserAdditionalContact
                            additionalForm={additionalForm}
                            setAdditionalForm={setAdditionalForm}
                            id={props.id}
                            contactEdit={contactEdit}
                            editAdditional={editAdditional}
                            setEditAdditional={setEditAdditional}
                          />
                        ) : null}
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
                          maxWidth: 666,
                          paddingRight: "10px",
                          borderRadius: "30px",
                        }}
                        className="m-0 p-0"
                      >
                        <Modal.Body style={{marginTop:-30}}>
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
                                      marginTop:8
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
                                      top: "28px",
                                      border: "1px solid black",
                                      background: "transparent",
                                      cursor: "pointer",
                                      padding: "0",
                                      display: "flex",
                                      justifyContent: "center",
                                      alignItems: "center",
                                      width: "28px",
                                      height: "28px",
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
                                          ? typeof file === "string"
                                            ? file
                                            : URL.createObjectURL(file)
                                          : Profile
                                      }
                                      alt="filee"
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
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12  mb-2">
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
                                        placeholder="Enter First Name"
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
                                      <div style={{ marginTop:"-15px",color: "red" }}>
                                        {" "}
                                        <MdError style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500,marginRight:"5px" }} />
                                        <span
                                          style={{
                                            fontSize: "13px",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {firstnameError}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                                    <Form.Group className="mb-3">
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
                                      <FormControl
                                        type="text"
                                        id="form-controls"
                                        placeholder="Enter Last Name"
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
                                          marginTop:6
                                        }}
                                      />
                                    </Form.Group>
                                  </div>

                                  <div
                                    className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2"
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
                                        Mobile Number{" "}
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
                                         

                                          <option> +{countryCode}</option>
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
                                        <div style={{ marginTop:"-15px",color: "red" }}>
                                          <MdError style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500,marginRight:"5px" }}/>
                                          <span
                                            style={{
                                              fontSize: "13px",
                                              color: "red",
                                              fontFamily: "Gilroy",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {phoneError}
                                          </span>
                                         
                                        </div>
                                      )}
                                     
                                      {phoneErrorMessage && (
                                        <div style={{ marginTop:"-15px",color: "red" }}>
                                          <MdError style={{ fontSize: '12px', fontFamily: "Gilroy", fontWeight: 500,marginRight:"5px" }}/>
                                          <span
                                            style={{
                                              fontSize: "12px",
                                              color: "red",
                                              fontFamily: "Gilroy",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {phoneErrorMessage}
                                          </span>
                                        </div>
                                      )}
                                    </Form.Group>
                                  </div>
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3">
                                    <Form.Group className="mb-3">
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
                                          marginTop:6
                                        }}
                                      />

                                      {emailError && (
                                        <div style={{ color: "red" }}>
                                          <MdError style={{marginRight:"5px",fontSize:"12px"}}/>
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
                                          <MdError style={{marginRight:"5px",fontSize:"12px"}}/>
                                          <span
                                            style={{
                                              fontSize: "12px",
                                              color: "red",
                                              fontFamily: "Gilroy",
                                              fontWeight: 500,
                                            }}
                                          >
                                            {emailErrorMessage}
                                          </span>
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
                                        {/* <span
                                          style={{
                                            color: "red",
                                            fontSize: "20px",
                                          }}
                                        >
                                          {" "}
                                          *{" "}
                                        </span> */}
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

                                  {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                                  </div> */}
                                </div>
                                {formError && (
                                  <div className="d-flex align-items-center justify-content-center" style={{ color: "red" }}>
                                    <MdError style={{marginRight:"5px"}}/>
                                    <span
                                      style={{
                                        fontSize: "14px",
                                        color: "red",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {formError}
                                    </span>
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
                                    {/* <Form.Select
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
                                    </Form.Select> */}
                                  

                                  <Select
  options={
    state.UsersList?.hosteldetailslist?.map((u) => ({
      value: u.floor_id,
      label: u.floor_name,
    })) || []
  }
  onChange={handleFloor}
  value={
    state.UsersList?.hosteldetailslist
      ?.map((u) => ({
        value: u.floor_id,
        label: u.floor_name,
      }))
      .find((option) => String(option.value) === String(Floor)) || null
  }
  placeholder="Select no. of floor"
  classNamePrefix="custom"
  menuPlacement="auto"
  styles={{
    control: (base) => ({
      ...base,
      height: "50px",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "16px",
      color: "#4B4B4B",
      fontFamily: "Gilroy",
      fontWeight: 500,
      boxShadow: "none",
      paddingLeft: "10px",
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
      display: "inline-block",
      fill: "currentColor",
      lineHeight: 1,
      stroke: "currentColor",
      strokeWidth: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  }}
/>





                                    
                                    {floorError && (
                                      <div style={{ color: "red" }}>
                                        <MdError style={{fontSize:"13px",marginRight:"5px",marginBottom:"2px"}}/>
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
                                    {/* <Form.Select
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
                                    </Form.Select> */}
                                    <Select
  options={
    state.UsersList?.roomdetails?.map((item) => ({
      value: item.Room_Id,
      label: item.Room_Name,
    })) || []
  }
  onChange={handleRooms}
  value={
    state.UsersList?.roomdetails?.find((option) => option.Room_Id === RoomId)
      ? {
          value: RoomId,
          label: state.UsersList.roomdetails.find(
            (option) => option.Room_Id === RoomId
          )?.Room_Name,
        }
      : null
  }
  placeholder="Select a Room"
  classNamePrefix="custom"
  menuPlacement="auto"
  styles={{
    control: (base) => ({
      ...base,
      height: "50px",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "16px",
      color: "#4B4B4B",
      fontFamily: "Gilroy",
      fontWeight: 500,
      boxShadow: "none",
      paddingLeft: "10px",
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
      display: "inline-block",
      fill: "currentColor",
      lineHeight: 1,
      stroke: "currentColor",
      strokeWidth: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  }}
/>

                                    {roomError && (
                                      <div style={{ color: "red" }}>
                                        <MdError style={{fontSize:"13px",marginRight:"5px",marginBottom:"2px"}}/>
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {roomError}
                                        </span>
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
                                    {/* <Form.Select
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

                                      {Editbed === "editbeddet" &&
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
                                    </Form.Select> */}
                                  
                                  <Select
  options={bedOptions}
  value={bedOptions.find((opt) => opt.value === BedId)}
  onChange={(selectedOption) => handleBed({ target: { value: selectedOption.value } })}
  
  placeholder="Select a Bed"
  classNamePrefix="custom"
  menuPlacement="auto"
  styles={{
    control: (base) => ({
      ...base,
      height: "50px",
      border: "1px solid #D9D9D9",
      borderRadius: "8px",
      fontSize: "16px",
      color: "#4B4B4B",
      fontFamily: "Gilroy",
      fontWeight: 500,
      boxShadow: "none",
      paddingLeft: "10px",
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
      display: "inline-block",
      fill: "currentColor",
      lineHeight: 1,
      stroke: "currentColor",
      strokeWidth: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  }}
/>






                                    {bedError && (
                                      <div style={{ color: "red" }}>
                                        <MdError style={{fontSize:"13px",marginRight:"5px",marginBottom:"2px"}}/>
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {bedError}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group
                                      className="mb-2"
                                    >
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          color: "#222222",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        Joining Date{" "}
                                        <span
                                          style={{
                                            color: "red",
                                            fontSize: "20px",
                                          }}
                                        >
                                          *
                                        </span>
                                      </Form.Label>
                                      <div
                                        style={{
                                          position: "relative",
                                          width: "100%",
                                        }}
                                      >
                                        <DatePicker
                                          selected={selectedDate}
                                          onChange={(date) => {
                                            setDateError("");
                                            setSelectedDate(date);
                                          }}
                                          dateFormat="yyyy/MM/dd"
                                          minDate={null}
                                          maxDate={null}
                                          customInput={customDateInput({
                                            value:
                                              selectedDate instanceof Date &&
                                              !isNaN(selectedDate.getTime())
                                                ? selectedDate.toLocaleDateString(
                                                    "en-GB"
                                                  )
                                                : "",
                                          })}
                                        />
                                      </div>
                                    </Form.Group>

                                    {dateError && (
                                      <div style={{ color: "red",marginTop:"-7px" }}>
                                        <MdError style={{fontSize:"13px",marginRight:"5px",marginBottom:"2px"}}/>
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
                                        <MdError style={{fontSize:"13px",marginRight:"5px",marginBottom:"2px"}}/>
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {advanceAmountError}
                                        </span>
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
                                      <div style={{ color: "red",marginTop:"-15px" }}>
                                        <MdError style={{fontSize:"13px",marginRight:"5px",marginBottom:"2px"}}/>
                                        <span
                                          style={{
                                            fontSize: "12px",
                                            color: "red",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          {roomrentError}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                               {formError && (
                                                        <div className="" style={{ color: "red",paddingBottom:"8px",textAlign:"center"}}>
                                                          <MdError style={{fontSize: '14px',marginRight:"6px" }}/>
                                                          <span style={{ fontSize: '14px', fontFamily: "Gilroy", fontWeight: 500}}>{formError}</span>
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
                                    marginTop:"10px !importent"
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
                    <Modal
                      show={deleteAdditional}
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
                          Delete Contact?
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
                        Are you sure you want to Delete Contact?
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
                          onClick={handleDeleteContact}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Modal
        show={generateForm}
        onHide={handleCloseGenerateFormShow}
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
            Bill Generate?
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
          Are you sure you want to  this Generate Bill?
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
            onClick={handleCloseGenerateFormShow}
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
            onClick={handleGenerateAdvance}
          >
            Generate
          </Button>
        </Modal.Footer>
      </Modal>
                    <TabPanel value="2">
                      {/* <UserEb id={props.id} />{" "} */}
                      <UserEb id={props.id} handleEditRoomItem={handleEditRoomItem} handleEditHostelItem={handleEditHostelItem}
                      handleDeleteHostelItem={handleDeleteHostelItem}
                      handleDeleteRoomItem={handleDeleteRoomItem}
                      />
                    </TabPanel>
                    <TabPanel value="3">
                      <UserListInvoice id={props.id} handleEditItem={handleEditItem} handleDeleteItem={handleDeleteItem} />
                    </TabPanel>

                    {/* <TabPanel value="4">
                      <UserListCompliants id={props.id} />
                    </TabPanel> */}
                    <TabPanel value="4">
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


UserListRoomDetail.propTypes = {
  onEditItem: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
  customerEditPermission: PropTypes.func.isRequired,
  userDetails: PropTypes.func.isRequired,
  hostelIds: PropTypes.func.isRequired,

  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  setHostelIds: PropTypes.func.isRequired,
  hostelName: PropTypes.func.isRequired,
  sethosName: PropTypes.func.isRequired,
  statusAmni: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  roomDetail: PropTypes.func.isRequired,

  onEditRoomItem: PropTypes.func.isRequired,
  onEditHostelItem: PropTypes.func.isRequired,
  onDeleteHostelItem: PropTypes.func.isRequired,
  onDeleteRoomItem: PropTypes.func.isRequired,
  setcustomerUser_Id: PropTypes.func.isRequired,
  customerUser_Id: PropTypes.func.isRequired,
};
export default UserListRoomDetail;

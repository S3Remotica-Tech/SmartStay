import {
  Button,
  Offcanvas,
  Form,
  FormControl,
  FormSelect,
} from "react-bootstrap";
import moment from "moment";
import React, { useState, useEffect, useCallback, useRef } from "react";
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
import Calendars from "../Assets/Images/New_images/calendar.png";
import Flatpickr from "react-flatpickr";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
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

  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [Phone, setPhone] = useState("");
  const [hostel_Id, setHostel_Id] = useState("");
  const [HostelName, setHostelName] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [Bed, setBed] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  console.log("RoomRent", RoomRent);

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
  const [selectedDate, setSelectedDate] = useState(null);
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [emailIdError, setemailIdError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");


  console.log("selectedDate", selectedDate);

  const handleCountryCodeChange = (e) => {
    setCountryCode(e.target.value);
  };

  const state = useSelector((state) => state);
  console.log("state...", state);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);

  const [profilePicture, setProfilePicture] = useState("");
  const [filteredProfile, setFilteredProfile] = useState(null);
  const [dateError, setDateError] = useState("");

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

  const options = {
    dateFormat: "Y/m/d",
    maxDate: null, 
    minDate: new Date(),
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
    }
  }, [selectedDate]);
  const handleDate = (selectedDates) => {
    setSelectedDate(selectedDates[0]);
    setDateError("");
  };

  useEffect(() => {
    dispatch({ type: "HOSTELDETAILLIST", payload: { hostel_Id: state.login.selectedHostel_Id } });
  }, [hostel_Id]);

  useEffect(() => {
    if (hostel_Id && Floor) {
      dispatch({
        type: "ROOMDETAILS",
        payload: { hostel_Id: state.login.selectedHostel_Id, floor_Id: Floor },
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

  useEffect(() => {
    setphonenumError(state.UsersList.phoneError);
  }, [state.UsersList.phoneError]);

  useEffect(() => {
    setemailIdError(state.UsersList.emailError);
  }, [state.UsersList.emailError]);


  const validateField = (value, fieldName) => {
    const trimmedValue = String(value).trim(); // Ensure value is a string and trim it
    if (!trimmedValue) {
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
  //   if (!value || value.trim() === "") {
  //     switch (fieldName) {
  //       case "First Name":
  //         setFirstnameError("First Name is required");
  //         break;
  //       case "Phone Number":
  //         setPhoneError("Phone Number is required");
  //         break;
  //       case "Email":
  //         setEmailError("Email is required");
  //         break;
  //       case "Address":
  //         setAddressError("Address is required");
  //         break;
  //       case "Hostel ID":
  //         setHostelIdError("Hostel ID is required");
  //         break;
  //       default:
  //         break;
  //     }
  //     return false;
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
    dispatch({ type: "CLEAR_PHONE_ERROR" });
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
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
    setAddressError("");
  };

  const handleIsActiveUser = (e) => {
    setIsActive(e.target.value);
  };

  useEffect(()=>{
    const selectedHostel=  state.UsersList.hostelList &&
    state.UsersList.hostelList.filter((item) => item.id == state.login.selectedHostel_Id);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    setHostel_Id(state.login.selectedHostel_Id);
  },[])
  console.log("selectedHostel",hostel_Id)

  // const handleHostelId = (e) => {
  //   const selectedHostelId = e.target.value;
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
  // };


  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Selected Floor" ||
      value === "Selected Room" ||
      value === "Selected Bed"
    ) {
      switch (fieldName) {
        case "Floor":
          setfloorError("Floor is required");
          break;
        case "Rooms":
          setRoomError("Room is required");
          break;
        case "Bed":
          setBedError("Bed is required");
          break;
        case "selectedDate":
          setDateError("selectedDate is required");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Reading is required");
          break;
        case "RoomRent":
          setRoomRentError("Reading is required");
          break;
        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "Floor":
          setfloorError("");
          break;
        case "Rooms":
          setRoomError("");
          break;
        case "Bed":
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
    }
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
        hostel_id: state.login.selectedHostel_Id,
        floor_id: Floor,
        room_id: e.target.value,
      },
    });
    setRoomRent("");
    setRoomError("");
  };

  console.log(
    "state.UsersList.roomdetails[0].bed_details",
    state.UsersList.roomdetails
  );

  const handleBed = (e) => {
    setBed(e.target.value);
    console.log("e", e.target.value);

    const Bedfilter =
      state?.UsersList?.roomdetails &&
      state.UsersList.roomdetails.filter(
        (u) =>
          u.Hostel_Id == hostel_Id && u.Floor_Id == Floor && u.Room_Id == Rooms
      );

    const Roomamountfilter =
      Bedfilter &&
      Bedfilter.length > 0 &&
      Bedfilter[0].bed_details.filter((amount) => amount.id == e.target.value);

    if (Roomamountfilter.length != 0) {
      setRoomRent(Roomamountfilter[0].bed_amount);
      console.log("Roomamountfilter", Roomamountfilter[0].bed_amount);
    }

    setBedError("");
    setRoomRentError("");
  };
  

  //  useEffect (()=>{

  //   const Bedfilter =state?.UsersList?.roomdetails && state.UsersList.roomdetails.filter ((u)=>  u.Hostel_Id == hostel_Id && u.Floor_Id == Floor  && u.Room_Id == Rooms  )

  //   const Roomamountfilter = Bedfilter&& Bedfilter.length > 0 && Bedfilter[0].bed_details.filter (amount => amount.id == Bed)

  //   if (Roomamountfilter.length !=0) {
  //     console.log("Roomamountfilter",Roomamountfilter);
  //   }
  //   setRoomRent(Roomamountfilter)
  //  },[hostel_Id,Floor,Rooms, Bed])

  const handleRoomRent = (e) => {
    const value = e.target.value;
    setRoomRent(e.target.value);
    console.log("roomrentvalue", value);
    setRoomRentError("");
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
    // setHostel_Id("");
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
    if (props.edit === "Edit") {
      props.OnShowTable(true);
    } else {
      // props.setUserList(true);
      props.setRoomDetail(false);
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

  useEffect(() => {
    if (props.EditObj && props.EditObj.ID) {
      props.setEdit("Edit");
      setBednum(props.EditObj);
      setId(props.EditObj.ID);
      if (props.EditObj.profile == 0) setFile(null);
      else {
        setFile(props.EditObj.profile);
      }

      let value = props.EditObj.Name.split(" ");
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
      // setFloor(props.EditObj.Floor);
      setRooms(props.EditObj.Rooms);
      // setBed(props.EditObj.Bed);
      // setAdvanceAmount(props.EditObj.AdvanceAmount);
      // setRoomRent(props.EditObj.RoomRent);
      setPaymentType(props.EditObj.PaymentType);
      setBalanceDue(props.EditObj.BalanceDue);
      setPaidAdvance(props.EditObj.paid_advance);
      // setPaidrent(props.EditObj.paid_rent);
    } else {
      props.setEdit("Add");
    }
  }, []);

  const MobileNumber = `${countryCode}${Phone}`;

  const handleSaveUserlist = () => {
    if (!validateField(firstname, "First Name"));
    if (!validateField(Phone, "Phone Number"));

    if (!validateField(Address, "Address"));
    if (!validateField(hostel_Id, "Hostel ID"));

    if (hostel_Id === "Select a PG" || hostelIdError) {
      setHostelIdError("Please select a valid PG");
      // return;
    }

    if (phoneError === "Invalid mobile number *") {
      setPhoneErrorMessage("Please enter a valid 10-digit phone number");
      // return;
    } else {
      setPhoneErrorMessage("");
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
      Phone: MobileNumber,
      Email: Email,
      Address: Address,
      AadharNo: AadharNo,
      PancardNo: PancardNo,
      licence: licence,
      HostelName: HostelName,
      hostel_Id:hostel_Id,
      Floor: Floor,
      Rooms: Rooms,
      Bed: Bed,
      joining_date: selectedDate,
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
    if (!validateAssignField(Floor, "Floor"));
    if (!validateAssignField(Rooms, "Rooms"));
    if (!validateAssignField(Bed, "Bed"));
    if (!validateAssignField(selectedDate, "selectedDate"));
    if (!validateAssignField(AdvanceAmount, "AdvanceAmount"));
    if (!validateAssignField(RoomRent, "RoomRent"));

    if (Floor === "Selected Floor" || floorError) {
      setfloorError("Please select a valid PG");
      return;
    }
    if (Rooms === "Selected Room" || roomError) {
      setRoomError("Please select a valid PG");
      return;
    }
    if (Bed === "Selected Bed" || bedError) {
      setBedError("Please select a valid PG");
      return;

     
    }
    if (RoomRent <= 0) {
      setRoomRentError("Room Rent must be greater than 0");
      return;
    }
    if (AdvanceAmount <= 0) {
      setAdvanceAmountError("Advance Amount must be greater than 0");
      return;
    }
    if (Floor && Rooms && Bed && selectedDate && AdvanceAmount && RoomRent) {
      const incrementDateAndFormat = (date) => {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + 1);

        return newDate.toISOString().split("T")[0];
      };
      const formattedDate = selectedDate
        ? incrementDateAndFormat(selectedDate)
        : "";

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
          joining_date: formattedDate,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          BalanceDue: BalanceDue,
          PaymentType: PaymentType,
          paid_advance: paid_advance,
          paid_rent: paid_rent,
          payable_rent: payableamount,
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

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      if (props.edit === "Edit") {
        props.setRoomDetail(true);
        props.OnShowTable(true);
      } else {
        props.setRoomDetail(false);
      }
      handleClose();
    }
  }, [state.UsersList?.statusCodeForAddUser]);

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
                          <MdError  />
                         <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {firstnameError}</span>
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
                          Last Name{" "} 
                          <span
                            style={{ color: "transparent", fontSize: "20px" }}
                          >
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
                         <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {phoneError}</span>
                        </div>
                      )}
                      {phonenumError && (
                        <div style={{ color: "red" }}>
                          <MdError />
                         <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {phonenumError}</span>
                        </div>
                      )}
                      {phoneErrorMessage && (
                        <div style={{ color: "red" }}>
                          <MdError />
                        <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>  {phoneErrorMessage}</span>
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
                          Email Id{" "} 
                          <span
                            style={{ color: "transparent", fontSize: "20px" }}
                          >
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
                           <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {emailError}</span>
                          </div>
                        )}
                        {emailIdError && (
                          <div style={{ color: "red" }}>
                            <MdError />
                           <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{emailIdError}</span> 
                          </div>
                        )}
                        {emailErrorMessage && (
                          <div style={{ color: "red" }}>
                            <MdError />
                           <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{emailErrorMessage}</span> 
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
                           <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{addressError}</span> 
                          </div>
                        )}
                      </Form.Group>
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
                    </div> */}
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
                        Floor
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
                          <option key={u.floor_id} value={u.floor_id}>
                            {u.floor_name}
                          </option>
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
                            <option key={item.Room_Id} value={item.Room_Id}>
                              {item.Room_Name}
                            </option>
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
                        <option value="" selected>
                          Selected Bed
                        </option>

                        {props.edit === "Edit" &&
                          Bednum &&
                          Bednum.Bed &&
                          Bednum.Bed !== "undefined" &&
                          Bednum.Bed !== "" &&
                          Bednum.Bed !== "null" &&
                          Bednum.Bed !== "0" && (
                            <option value={Bednum.Bed} selected>
                              {Bednum.Bed}
                            </option>
                          )}

                        {state.UsersList?.bednumberdetails?.bed_details &&
                          state.UsersList?.bednumberdetails?.bed_details
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
                        dateFormat="dd/MM/yyyy"
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
                          Advance Amount
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
                          Rental Amount
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

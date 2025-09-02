/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../../Assets/Images/New_images/add-circle.png";
import Image from "react-bootstrap/Image";
import Profile from "../../Assets/Images/New_images/profile-picture.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import { JoininDatecustomer } from "../../Redux/Action/smartStayAction";
import { Trash } from 'iconsax-react';
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Flipbackward from "../../Assets/Images/flip-backward.png";
import FlipbackwardBlue from "../../Assets/Images/flip-backwardblue.png";
import Store_Icon from "../../Assets/Images/store_icon.png";
import Profileimage from "../../Assets/Images/New_images/profile-picture.png";
import { RiShoppingBag3Line } from "react-icons/ri";




function UserlistForm(props) {
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
  const [BalanceDue, setBalanceDue] = useState("");
  const [PaymentType, setPaymentType] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  const [paid_advance, setPaidAdvance] = useState("");
  const [paid_rent, setPaidrent] = useState("");
  const [Email, setEmail] = useState("");
  const [AadharNo, setAadharNo] = useState("");
  const [PancardNo, setPancardNo] = useState("");
  const [licence, setLicence] = useState("");
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state_name, setStateName] = useState("");
  const [payableamount, setPayableamount] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phonenumError, setphonenumError] = useState("");
  const [emailIdError, setemailIdError] = useState("");
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
  const [formLoading, setFormLoading] = useState(false)

  const [loading, setLoading] = useState(false)
  const countryCode = "91";
  const [errors, setErrors] = useState([]);
  const [reason, setReason] = useState("");
  const [recheckInDate, setRecheckInDate] = useState("");
  const [activeTab, setActiveTab] = useState("long");
  const [floor_name, setFloorName] = useState("")
  const [room_name, setRoomName] = useState("")
  const [bed_name, setBedName] = useState("")
  const firstnameRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);






  const [fields, setFields] = useState([]);





  const indianStates = [
    { value: "Tamil Nadu", label: "Tamil Nadu" },
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

    { value: "Telangana", label: "Telangana" },
    { value: "Tripura", label: "Tripura" },
    { value: "Uttar Pradesh", label: "Uttar Pradesh" },
    { value: "Uttarakhand", label: "Uttarakhand" },
    { value: "West Bengal", label: "West Bengal" },
    {
      value: "Andaman and Nicobar Islands",
      label: "Andaman and Nicobar Islands",
    },
    { value: "Chandigarh", label: "Chandigarh" },
    {
      value: "Dadra and Nagar Haveli and Daman and Diu",
      label: "Dadra and Nagar Haveli and Daman and Diu",
    },
    { value: "Delhi", label: "Delhi" },
    { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
    { value: "Ladakh", label: "Ladakh" },
    { value: "Lakshadweep", label: "Lakshadweep" },
    { value: "Puducherry", label: "Puducherry" },
  ];

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [dateError, setDateError] = useState("");

  const handleImageChange = async (event) => {
    const fileImage = event.target.files[0];
    if (fileImage) {
      setFile(fileImage)
    }
  };


  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
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









  console.log("state", state)


  // useEffect(() => {
  //   dispatch({
  //     type: "HOSTELDETAILLIST",
  //     payload: { hostel_Id: state.login.selectedHostel_Id },
  //   });
  // }, [hostel_Id]);

  useEffect(() => {
    if (Floor) {
      dispatch({ type: 'GETALLROOMSLIST', payload: { floor_Id: Floor } })
    }
  }, [Floor]);


  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_ALL_ROOMS_STATUS_CODE' })
      }, 100)
    }

  }, [state?.PgList?.getAllRoomSuccessStatus])

  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ALL_FLOOR_LIST' })
      }, 500)
    }

  }, [state.UsersList.floorListStatusCode])

  const handleFirstName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstname(value);
    setFirstnameError("");
  };

  useEffect(() => {
    if (state.UsersList.phoneError) {
      setFormLoading(false)
      setLoading(false)
      setphonenumError(state.UsersList.phoneError);
    }
  }, [state.UsersList.phoneError]);

  useEffect(() => {
    if (state.UsersList.emailError) {
      setFormLoading(false)
      setLoading(false)
      setemailIdError(state.UsersList.emailError);
    }
  }, [state.UsersList.emailError]);




  const handleLastName = (e) => {
    const value = e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;

    if (!pattern.test(value)) {
      return;
    }
    setLastname(value);
  };

  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setPhone(input);

    if (input.length === 0) {
      setPhoneError("");
    } else if (input.length < 10) {
      setPhoneError("Please Enter Valid Mobile Number");
    } else if (input.length === 10) {
      setPhoneError("");
    }

    setPhoneErrorMessage("");
    setphonenumError("")
    dispatch({ type: "CLEAR_PHONE_ERROR" });
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
      setEmailError("Please Enter  Valid Email Id");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    setemailIdError("")
  };

  useEffect(() => {
    const selectedHostel =
      state.UsersList.hostelList &&
      state.UsersList.hostelList?.filter(
        (item) => item.id === state.login.selectedHostel_Id
      );
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    setHostel_Id(state.login.selectedHostel_Id);
  }, []);



  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Selected Floor" ||
      value === "Selected Room" ||
      value === "Selected Bed"
    ) {
      switch (fieldName) {
        case "Floor":
          setfloorError("Please Select Floor");
          break;
        case "Rooms":
          setRoomError("Please Select Room");
          break;
        case "Bed":
          setBedError("Please Select Bed");
          break;
        case "selectedDate":
          setDateError("Please Select Joining Date");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Please Enter Advance Amount");
          break;
        case "RoomRent":
          setRoomRentError("Please Enter Rental Amount");
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
        case "Houseno":
          setHouse_NoError("");
          break;
        case "Street":
          setStreetError("");
          break;
        case "Landmark":
          setLandmarkError("");
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
        default:
          break;
      }
      return true;
    }
  };

  const handleFloor = (selectedOption) => {
    setFloor(selectedOption?.value || "");
    setRooms("");
    setBed("");
    setRoomRent("");
    setfloorError("");
  };

  const handleRooms = (selectedValue) => {
    console.log("selectedValue", selectedValue)
    setRooms(selectedValue);
    if (selectedValue) {
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: selectedValue }
      });
    }

    // dispatch({
    //   type: "BEDNUMBERDETAILS",
    //   payload: {
    //     hostel_id: state.login.selectedHostel_Id,
    //     floor_id: Floor,
    //     room_id: selectedValue,
    //   },
    // });

    setRoomRent("");
    setRoomError("");
  };

  const handleBed = (selectedOption) => {
    const selectedBedId = selectedOption?.value || "";
    setBed(selectedBedId);

    const Bedfilter = state?.UsersList?.roomdetails?.filter(
      (u) =>
        String(u.Hostel_Id) === String(hostel_Id) &&
        String(u.Floor_Id) === String(Floor) &&
        String(u.Room_Id) === String(Rooms)
    );

    const Roomamountfilter =
      Bedfilter?.[0]?.bed_details?.filter(
        (amount) => String(amount.id) === String(selectedBedId)
      ) ?? [];

    if (Roomamountfilter.length > 0) {
      setRoomRent(Roomamountfilter[0]?.bed_amount);
    }

    setBedError("");
    setRoomRentError("");
  };

  const handleRoomRent = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setRoomRent(newAmount);
    setRoomRentError("");
  };

  const handleAdvanceAmount = (e) => {
    const advanceAmount = e.target.value;
    if (!/^\d*$/.test(advanceAmount)) {
      return;
    }
    setAdvanceAmount(advanceAmount);
    setAdvanceAmountError("");
  };

  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("");
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");
  };

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
  };

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
    }
  };

  const handleCity = (e) => {

    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
    }
  };

  const [advanceDate, setAdvanceDate] = useState(null);
  const [advanceDueDate, setAdvanceDueDate] = useState(null);
  const [advanceDateError, setAdvanceDateError] = useState("");
  const [advanceDueDateError, setAdvanceDueDateError] = useState("");

  const handleClose = () => {
    setFirstname("");
    setLastname("");
    setAadharNo("");
    setPancardNo("");
    setLicence("");
    setPhone("");
    setEmail("");
    setHouseNo("");
    setStreet("");
    setCity("");
    setLandmark("");
    setPincode("");
    setStateName("");
    setStateNameError("");
    setPincodeError("");
    setCityError("");
    setLandmarkError("");
    setStreetError("");
    setHouse_NoError("");
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
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    if (props?.setShowMenu) props.setShowMenu(false);
    if (props?.setShowForm) props.setShowForm(false);
    if (props?.OnShowTable) props.OnShowTable(true);
    if (props?.edit === "Edit") {
      if (props?.OnShowTable) props.OnShowTable(true);
    } else {
      if (props?.setRoomDetail) props.setRoomDetail(false);
    }
  };


  const handleCloseAssign = () => {
dispatch({ type:'REMOVE_BED_AVAILABLE_ERROR'})
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    if (props?.setShowAssignMenu) props.setShowAssignMenu(false);
    if (props?.setShowForm) props.setShowForm(false);
    if (props?.OnShowTable) props.OnShowTable(true);
    if (props.edit === "Edit") {
      if (props?.OnShowTable) props.OnShowTable(true);
    } else {
      if (props?.setRoomDetail) props.setRoomDetail(false);
    }
  }


  console.log("props tenant", props)

  useEffect(() => {
    if (props.EditObj && props.EditObj.customerId) {
      props.setEdit("Edit");
      setId(props.EditObj.customerId);
      if (props.EditObj.profilePic === 0) setFile(null);
      else {
        setFile(props.EditObj.profilePic);
      }

      // let value = props.EditObj.Name.split(" ");
      setFirstname(props.EditObj?.firstName);
      setLastname("");
      setHouseNo(props.EditObj.Address);
      setStreet(props.EditObj.area);
      setLandmark(props.EditObj.landmark);
      setCity(props.EditObj.city);
      setPincode(props.EditObj.pincode);
      setStateName(props.EditObj.state);
      setAadharNo(props.EditObj.AadharNo);
      setPancardNo(props.EditObj.PancardNo);
      setLicence(props.EditObj.licence);
      setPhone(props.EditObj.Phone);
      setEmail(props.EditObj.Email);
      setHostelName(props.EditObj.HostelName);
      setHostel_Id(props.EditObj.Hostel_Id);
      setRooms(props.EditObj.Rooms);
      setPaymentType(props.EditObj.PaymentType);
      setBalanceDue(props.EditObj.BalanceDue);
      setPaidAdvance(props.EditObj.paid_advance);
    } else {
      // props?.setEdit("Add");
      if (typeof props.setEdit === "function") {
        props.setEdit("Add");
      }
    }
  }, [props.EditObj]);




  const MobileNumber = `${Phone}`;

  const validateField = (value, fieldName, ref, setError, focusedRef) => {
    const trimmedValue = String(value).trim();
    if (!trimmedValue) {
      switch (fieldName) {
        case "First Name":
          setError("Please Enter First Name");
          break;
        case "Phone Number":
          setError("Please Enter Phone Number");
          break;
        case "Email":
          setError("Please Enter Email Id");
          break;
        case "Hostel ID":
          setError("Please Select PG");
          break;

        default:
          break;
      }

      if (!focusedRef.current && ref?.current) {
        ref.current.focus();
        focusedRef.current = true;
      }
      return false;
    }

    setError("");
    return true;
  };






  const handleSaveUserlistAddUser = async () => {

    let hasReasonAmountError = false;
    let newErrors = [];


    if (!validateAssignField(Floor, "Floor"));
    if (!validateAssignField(Rooms, "Rooms"));
    if (!validateAssignField(Bed, "Bed"));
    if (!validateAssignField(selectedDate, "selectedDate"));
    if (!validateAssignField(AdvanceAmount, "AdvanceAmount"));
    if (!validateAssignField(RoomRent, "RoomRent"));

    if (Floor === "Selected Floor" || floorError) {
      setfloorError("Please Select a Valid PG");
      return;
    }
    if (Rooms === "Selected Room" || roomError) {
      setRoomError("Please Select a Valid PG");
      return;
    }
    if (Bed === "Selected Bed" || bedError) {
      setBedError("Please Select a Valid PG");
      return;
    }

    if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
      setRoomRentError("Please Enter Rental Amount");
      return;
    }
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      return;
    }

    if (
      AdvanceAmount === "" ||
      AdvanceAmount === null ||
      AdvanceAmount === undefined
    ) {
      setAdvanceAmountError("Please Enter Advance Amount");
      return;
    }
    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
      return;
    }
    const formattedReasons = fields.map((item) => {
      let reason_name = "";

      if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
        reason_name = item.customReason || item["custom Reason"] || "";
      } else {
        reason_name = item.reason || item.reason_name || "";
      }

      const error = { reason: "", amount: "" };
      if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
        error.amount = "Please enter amount";
        hasReasonAmountError = true;
      }


      if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
        error.reason = "Please enter reason";
        hasReasonAmountError = true;
      }

      newErrors.push(error);
      return {
        reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput
      };
    });

    setErrors(newErrors)

    if (hasReasonAmountError) return;

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);

      const day = String(newDate.getDate()).padStart(2, "0");
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const year = newDate.getFullYear();

      return `${day}-${month}-${year}`;
    };

    const formattedDate = selectedDate
      ? incrementDateAndFormat(selectedDate)
      : "";


    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);

    const capitalizedLastname = capitalizeFirstLetter(lastname);



    const invoiceDateObj = new Date(formattedDate);

    const dueDateObj = new Date(invoiceDateObj);
    dueDateObj.setDate(dueDateObj.getDate() + (state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth || 0));

    // const formattedAdvanceDueDate = dueDateObj.toISOString().split("T")[0];

    if (
      Floor !== "Selected Floor" &&
      Rooms !== "Selected Room" &&
      Bed !== "Selected Bed" &&
      Floor && Rooms && Bed &&
      selectedDate &&
      Number(AdvanceAmount) > 0 &&
      Number(RoomRent) > 0
    ) {
      dispatch({
        type: 'CHECKIN',
        payload: {
          customerId: id,
          hostelId: state.login?.selectedHostel_Id,
          floorId: Floor,
          bedId: Bed,
          roomId: Rooms,
          joiningDate: formattedDate,
          advanceAmount: AdvanceAmount,
          rentalAmount: RoomRent

        }
      })
      setFormLoading(true)


      // dispatch({
      //   type: "CHECKIN",
      //   payload: {
      //     profile: file,
      //     firstName: capitalizedFirstname,
      //     lastName: capitalizedLastname,
      //     mobile: Phone,
      //     mailId: Email,
      //     houseNo: house_no,
      //     street: street,
      //     landmark: landmark,
      //     city: city,
      //     pincode: pincode,
      //     state: state_name,
      //     hostelId: hostel_Id,
      //     floorId: Floor,
      //     roomId: Rooms,
      //     bedId: Bed,
      //     joiningDate: formattedDate,

      //     AdvanceAmount: AdvanceAmount,
      //     RoomRent: RoomRent,
      //     reasons: formattedReasons,
      //     stay_type: activeTab === "long" ? "long_stay" : "short_stay",
      //     isadvance: 1,
      //     invoice_date: formattedDate,
      //     due_date: formattedAdvanceDueDate,
      //   },
      // });

    }

    // dispatch({ type: "INVOICELIST" });
  };



  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostel_id: state.login.selectedHostel_Id } });
    }
  }, [state.login.selectedHostel_Id]);



  const handleSaveBookingAdvance = async () => {

    let hasReasonAmountError = false;
    let newErrors = [];



    if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
      setRoomRentError("Please Enter Rental Amount");
      return;
    }
    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      return;
    }

    if (
      AdvanceAmount === "" ||
      AdvanceAmount === null ||
      AdvanceAmount === undefined
    ) {
      setAdvanceAmountError("Please Enter Advance Amount");
      return;
    }
    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
      return;
    }

    setErrors(newErrors)




    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate());
      return newDate.toISOString().split("T")[0];
    };


    // const formattedDate = selectedDate
    //   ? incrementDateAndFormat(selectedDate)
    //   : "";
    // const invoiceDateObj = new Date(formattedDate);
    const formattedDate = selectedDate
      ? incrementDateAndFormat(selectedDate)
      : "";
    const invoiceDateObj = new Date(formattedDate);
    const dueDateObj = new Date(invoiceDateObj);
    dueDateObj.setDate(dueDateObj.getDate() + (state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth || 0));

    const formattedAdvanceDueDate = dueDateObj.toISOString().split("T")[0];

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);

    const capitalizedLastname = capitalizeFirstLetter(lastname);


    setErrors(newErrors)

    const formattedReasons = fields.map((item) => {
      let reason_name = "";

      if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
        reason_name = item.customReason || item["custom Reason"] || "";
      } else {
        reason_name = item.reason || item.reason_name || "";
      }

      const error = { reason: "", amount: "" };
      if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
        error.amount = "Please enter amount";
        hasReasonAmountError = true;
      }


      if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
        error.reason = "Please enter reason";
        hasReasonAmountError = true;
      }

      newErrors.push(error);
      return {
        reason_name,
        amount: item.amount || "",
        showInput: !!item.showInput
      };
    });


    if (hasReasonAmountError) return;


    console.log("apitriggerd", hasReasonAmountError, AdvanceAmount, RoomRent);

    if (

      Number(AdvanceAmount) > 0 &&
      Number(RoomRent) > 0
    ) {



      dispatch({
        type: "ADDUSER",
        payload: {
          profile: file,
          firstname: capitalizedFirstname,
          LastName: capitalizedLastname,
          Phone: Phone,
          Email: Email,
          Address: house_no,
          area: street,
          landmark: landmark,
          city: city,
          pincode: pincode,
          state: state_name,
          AadharNo: AadharNo,
          PancardNo: PancardNo,
          licence: licence,
          HostelName: HostelName,
          hostel_Id: hostel_Id,
          Floor: Floor,
          Rooms: props.EditObj.booking_room_id,
          Bed: props.EditObj.booking_bed_id,
          joining_date: formattedDate,
          AdvanceAmount: AdvanceAmount,
          RoomRent: RoomRent,
          BalanceDue: BalanceDue,
          PaymentType: PaymentType,
          paid_advance: paid_advance,
          paid_rent: paid_rent,
          payable_rent: payableamount,
          isadvance: 1,
          invoice_date: formattedDate,
          due_date: formattedAdvanceDueDate,
          ID: props.EditObj.ID,
          reasons: formattedReasons,
          stay_type: activeTab === "long" ? "long_stay" : "short_stay",
          booking_id: props.EditObj.booking_id,
          booking_date: bookingDate,
          booking_amount: props.EditObj.booking_amount

        },
      });
    }
    setFormLoading(true)
    dispatch({ type: "INVOICELIST" });
  };


  console.log("Rooms", Rooms)





  // const handleSaveUserlistAddUserButon = () => {

  //   let hasReasonAmountError = false;
  //   let newErrors = [];


  //   if (!validateAssignField(Floor, "Floor"));
  //   if (!validateAssignField(Rooms, "Rooms"));
  //   if (!validateAssignField(Bed, "Bed"));
  //   if (!validateAssignField(selectedDate, "selectedDate"));
  //   if (!validateAssignField(AdvanceAmount, "AdvanceAmount"));
  //   if (!validateAssignField(RoomRent, "RoomRent"));

  //   if (Floor === "Selected Floor" || floorError) {
  //     setfloorError("Please Select a Valid PG");
  //     return;
  //   }
  //   if (Rooms === "Selected Room" || roomError) {
  //     setRoomError("Please Select a Valid PG");
  //     return;
  //   }
  //   if (Bed === "Selected Bed" || bedError) {
  //     setBedError("Please Select a Valid PG");
  //     return;
  //   }
  //   if (!RoomRent && RoomRent !== 0) {
  //     setRoomRentError("Please Enter Rental Amount");
  //     return;
  //   }
  //   if (RoomRent <= 0) {
  //     setRoomRentError("Please Enter Valid Rental Amount");
  //     return;
  //   }
  //   if (!AdvanceAmount && AdvanceAmount !== 0) {
  //     setAdvanceAmountError("Please Enter Advance Amount");
  //     return;
  //   }

  //   if (AdvanceAmount <= 0) {
  //     setAdvanceAmountError("Please Enter Valid Advance Amount");
  //     return;
  //   }





  //   if (Floor && Rooms && Bed && selectedDate && AdvanceAmount && RoomRent) {
  //     const incrementDateAndFormat = (date) => {
  //       const newDate = new Date(date);
  //       newDate.setDate(newDate.getDate() + 1);

  //       return newDate.toISOString().split("T")[0];
  //     };
  //     const formattedDate = selectedDate
  //       ? incrementDateAndFormat(selectedDate)
  //       : "";


  //     const formattedReasons = fields.map((item) => {
  //       let reason_name = "";

  //       if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
  //         reason_name = item.customReason || item["custom Reason"] || "";
  //       } else {
  //         reason_name = item.reason || item.reason_name || "";
  //       }

  //       const error = { reason: "", amount: "" };
  //       if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
  //         error.amount = "Please enter amount";
  //         hasReasonAmountError = true;
  //       }


  //       if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
  //         error.reason = "Please enter reason";
  //         hasReasonAmountError = true;
  //       }

  //       newErrors.push(error);
  //       return {
  //         reason_name,
  //         amount: item.amount || "",
  //         showInput: !!item.showInput
  //       };
  //     });

  //     setErrors(newErrors)

  //     if (hasReasonAmountError) return;




  //     dispatch({
  //       type: "ADDUSER",
  //       payload: {
  //         profile: file,
  //         firstname: firstname,
  //         lastname: lastname,
  //         Phone: Phone,
  //         Email: Email,
  //         Address: house_no,
  //         area: street,
  //         landmark: landmark,
  //         city: city,
  //         pincode: pincode,
  //         state: state_name,
  //         AadharNo: AadharNo,
  //         PancardNo: PancardNo,
  //         licence: licence,
  //         HostelName: HostelName,
  //         hostel_Id: hostel_Id,
  //         Floor: Floor,
  //         Rooms: Rooms,
  //         Bed: Bed,
  //         joining_date: formattedDate,
  //         AdvanceAmount: AdvanceAmount,
  //         RoomRent: RoomRent,
  //         BalanceDue: BalanceDue,
  //         PaymentType: PaymentType,
  //         paid_advance: paid_advance,
  //         paid_rent: paid_rent,
  //         payable_rent: payableamount,
  //         isadvance: 0,
  //         ID: props.edit === "Edit" ? id : "",
  //         reasons: formattedReasons,
  //         stay_type: activeTab === "long" ? "long_stay" : "short_stay"
  //       },
  //     });
  //     setLoading(true)


  //   }
  //   dispatch({ type: "INVOICELIST" });
  // };









  //   const handleSaveAdvance = () => {
  //     let hasError = false;
  //     let hasReasonAmountError = false;
  //     let newErrors = [];


  //     if (!advanceDate) {
  //       setAdvanceDateError("Please Select Invoice Date");
  //       hasError = true;
  //     } else {
  //       setAdvanceDateError("");
  //     }

  //     if (!advanceDueDate) {
  //       setAdvanceDueDateError("Please Select Due Date");
  //       hasError = true;
  //     } else {
  //       setAdvanceDueDateError("");
  //     }




  //     if (advanceDate && advanceDueDate && props.EditObj.User_Id) {
  //       const selectedUser = state.UsersList.Users.find(
  //         item => item.User_Id === props.EditObj.User_Id
  //       );

  //       if (selectedUser) {
  //         const CreateDate = dayjs(state.login.joiningDate).startOf('day');


  //         const InvoiceDate = dayjs(advanceDate).startOf('day');

  //         const DueDate = dayjs(advanceDueDate).startOf('day');
  //         const Today = dayjs().startOf('day');


  //         if (InvoiceDate.isBefore(CreateDate)) {

  //           setAdvanceDateError("Before joining date not allowed");
  //           hasError = true;
  //         } else if (InvoiceDate.isAfter(Today)) {
  //           setAdvanceDateError("Invoice date cannot be a future date");
  //           hasError = true;
  //         }


  //         if (DueDate.isBefore(InvoiceDate)) {
  //           setAdvanceDueDateError("Due date cannot be before invoice date");
  //           hasError = true;
  //         }
  //       }
  //     }




  //     if (hasError) {
  //       return;
  //     }

  //     const incrementDateAndFormat = (date) => {
  //       const newDate = new Date(date);
  //       newDate.setDate(newDate.getDate() + 1);
  //       return newDate.toISOString().split("T")[0];
  //     };


  //     const formattedDate = selectedDate
  //       ? incrementDateAndFormat(selectedDate)
  //       : "";
  //     const formattedAdvanceDate = incrementDateAndFormat(advanceDate);
  //     const formattedAdvanceDateDue = incrementDateAndFormat(advanceDueDate);

  //   const capitalizeFirstLetter = (str) => {
  //       return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  //     };

  //     const capitalizedFirstname = capitalizeFirstLetter(firstname);

  //     const capitalizedLastname = capitalizeFirstLetter(lastname);
  //     const formattedReasons = fields.map((item) => {
  //       let reason_name = "";

  //       if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
  //         reason_name = item.customReason || item["custom Reason"] || "";
  //       } else {
  //         reason_name = item.reason || item.reason_name || "";
  //       }

  //       const error = { reason: "", amount: "" };
  //       if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
  //         error.amount = "Please enter amount";
  //         hasReasonAmountError = true;
  //       }


  //       if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
  //         error.reason = "Please enter reason";
  //         hasReasonAmountError = true;
  //       }

  //       newErrors.push(error);
  //       return {
  //         reason_name,
  //         amount: item.amount || "",
  //         showInput: !!item.showInput
  //       };
  //     });

  //     setErrors(newErrors)

  //     if (hasReasonAmountError) return;


  //    dispatch({
  //   type: "ADDUSER",
  //   payload: {
  //     profile: file,
  //     firstname: capitalizedFirstname,  
  //     LastName: capitalizedLastname,
  //     Phone: Phone,
  //     Email: Email,
  //     Address: house_no,
  //     area: street,
  //     landmark: landmark,
  //     city: city,
  //     pincode: pincode,
  //     state: state_name,
  //     AadharNo: AadharNo,
  //     PancardNo: PancardNo,
  //     licence: licence,
  //     HostelName: HostelName,
  //     hostel_Id: hostel_Id,
  //     Floor: Floor,
  //     Rooms: Rooms,
  //     Bed: Bed,
  //     joining_date: formattedDate,
  //     AdvanceAmount: AdvanceAmount,
  //     RoomRent: RoomRent,
  //     BalanceDue: BalanceDue,
  //     PaymentType: PaymentType,
  //     paid_advance: paid_advance,
  //     paid_rent: paid_rent,
  //     payable_rent: payableamount,
  //     isadvance: 1,
  //     invoice_date: formattedAdvanceDate,
  //     due_date: formattedAdvanceDateDue,
  //     ID: props.edit === "Edit" ? id : "",
  //     reasons: formattedReasons,
  //     stay_type: activeTab === "long" ? "long_stay" : "short_stay",

  //   },
  // });

  //     setLoading(true)

  //     dispatch({ type: "INVOICELIST" });
  //   };

  const [bookingDate, setBookingDate] = useState("")
  const [bookingAmount, setBookingAmount] = useState("")
  const [bookingFlooorId, setBookingFloorId] = useState("")
  const [bookingRoomId, setBookingRoomId] = useState("")
  const [bookingBedId, setBookingBedId] = useState("")


  console.log("state", state)

  const bookingDateRef = useRef("");

  useEffect(() => {
    if (props.BookingAssignForm) {
      console.log("props", props.EditObj);


      setId(props.EditObj.ID);
      if (props.EditObj.profile === 0) setFile(null);
      else {
        setFile(props.EditObj.profile);
      }


      if (props.EditObj?.Name) {
        const value = props.EditObj.Name.trim().split(" ");
        setFirstname(value[0] || "");
        setLastname(value[1] || "");
      } else {
        setFirstname("");
        setLastname("");
      }
      setHouseNo(props.EditObj.Address);
      setStreet(props.EditObj.area);
      setLandmark(props.EditObj.landmark);
      setCity(props.EditObj.city);
      setPincode(props.EditObj.pincode);
      setStateName(props.EditObj.state);
      setAadharNo(props.EditObj.AadharNo);
      setPancardNo(props.EditObj.PancardNo);
      setLicence(props.EditObj.licence);
      setPhone(props.EditObj.Phone);
      setEmail(props.EditObj.Email);
      setHostelName(props.EditObj.HostelName);
      setHostel_Id(props.EditObj.Hostel_Id);
      setRooms(props.EditObj.booking_room_id);
      setBed(props.EditObj.booking_bed_id)
      setPaymentType(props.EditObj.PaymentType);
      setBalanceDue(props.EditObj.BalanceDue);
      setPaidAdvance(props.EditObj.paid_advance);
      setFloor(props.EditObj.booking_floor_id)
      setSelectedDate(props.EditObj.booking_joining_date)
      setBookingFloorId(props.EditObj.Booking_FloorName)
      setBookingRoomId(props.EditObj.booking_room_id)
      setBookingBedId(props.EditObj.booking_bed_id)
      setFloorName(props?.EditObj?.Booking_FloorName)
      setRoomName(props?.EditObj?.Booking_Rooms)
      setBedName(props?.EditObj?.Booking_Bed)
      setBookingAmount(props.EditObj.booking_amount)

      const Bedfilter = state?.UsersList?.roomdetails?.filter(
        (u) =>
          String(u.Hostel_Id) === String(props?.EditObj?.Hostel_Id) &&
          String(u.Floor_Id) === String(props?.EditObj?.booking_floor_id) &&
          String(u.Room_Id) === String(props?.EditObj?.booking_room_id)
      );

      const Roomamountfilter =
        Bedfilter?.[0]?.bed_details?.filter(
          (amount) => String(amount.id) === String(props?.EditObj?.booking_bed_id)
        ) ?? [];

      if (Roomamountfilter.length > 0) {
        setRoomRent(Roomamountfilter[0]?.bed_amount);
      }

      // setBookingDate(props.EditObj.booking_booking_date)
      //  if (props.EditObj?.booking_booking_date) {
      //       const dateObj = new Date(props.EditObj.booking_booking_date);
      //       const day = String(dateObj.getDate()).padStart(2, '0');
      //       const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      //       const year = dateObj.getFullYear();
      //       const formattedBookingDate = `${day}/${month}/${year}`;

      //       bookingDateRef.current = formattedBookingDate; 
      //       setBookingDate(formattedBookingDate); 
      //     }

      if (props.EditObj?.booking_booking_date) {
        const dateObj = new Date(props.EditObj.booking_booking_date);

        // Convert directly into dayjs object
        const bookingDayjs = dayjs(dateObj);

        bookingDateRef.current = bookingDayjs;
        setBookingDate(bookingDayjs);  // store as dayjs, not string
      }


    }

  }, [props.BookingAssignForm]);
  const disabledJoiningDate = (current) => {
    if (!bookingDate) return false;

    return (
      current.isBefore(bookingDate, "day") ||
      current.isAfter(dayjs(), "day")
    );
  };

  useEffect(() => {
    if (props.BookingAssignForm) {
      dispatch({
        type: "BEDNUMBERDETAILS",
        payload: {
          hostel_id: props?.EditObj?.Hostel_Id,
          floor_id: props?.EditObj?.booking_floor_id,
          room_id: props?.EditObj?.booking_room_id,
        },


      });
      const Bedfilter = state?.UsersList?.roomdetails?.filter(
        (u) =>
          String(u.Hostel_Id) === String(props?.EditObj?.Hostel_Id) &&
          String(u.Floor_Id) === String(props?.EditObj?.booking_floor_id) &&
          String(u.Room_Id) === String(props?.EditObj?.booking_room_id)
      );
      const Roomamountfilter =
        Bedfilter?.[0]?.bed_details?.filter(
          (amount) => String(amount.id) === String(props?.EditObj?.booking_bed_id)
        ) ?? [];

      if (Roomamountfilter.length > 0) {
        setRoomRent(Roomamountfilter[0]?.bed_amount);
      }
    }
  }, [props.BookingAssignForm, state?.UsersList?.roomdetails]);


  //  const handleSaveBookingCancel = () => {

  //     let hasReasonAmountError = false;
  //     let newErrors = [];


  //     if (!RoomRent && RoomRent !== 0) {
  //       setRoomRentError("Please Enter Rental Amount");
  //       return;
  //     }
  //     if (RoomRent <= 0) {
  //       setRoomRentError("Please Enter Valid Rental Amount");
  //       return;
  //     }
  //     if (!AdvanceAmount && AdvanceAmount !== 0) {
  //       setAdvanceAmountError("Please Enter Advance Amount");
  //       return;
  //     }

  //     if (AdvanceAmount <= 0) {
  //       setAdvanceAmountError("Please Enter Valid Advance Amount");
  //       return;
  //     }





  //     if (AdvanceAmount && RoomRent) {
  //       const incrementDateAndFormat = (date) => {
  //         const newDate = new Date(date);
  //         newDate.setDate(newDate.getDate() + 1);

  //         return newDate.toISOString().split("T")[0];
  //       };
  //       const formattedDate = selectedDate
  //         ? incrementDateAndFormat(selectedDate)
  //         : "";


  //       const formattedReasons = fields.map((item) => {
  //         let reason_name = "";

  //         if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
  //           reason_name = item.customReason || item["custom Reason"] || "";
  //         } else {
  //           reason_name = item.reason || item.reason_name || "";
  //         }

  //         const error = { reason: "", amount: "" };
  //         if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
  //           error.amount = "Please enter amount";
  //           hasReasonAmountError = true;
  //         }


  //         if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
  //           error.reason = "Please enter reason";
  //           hasReasonAmountError = true;
  //         }

  //         newErrors.push(error);
  //         return {
  //           reason_name,
  //           amount: item.amount || "",
  //           showInput: !!item.showInput
  //         };
  //       });

  //       setErrors(newErrors)

  //       if (hasReasonAmountError) return;
  //       const formatDate = (dateString) => {
  //   if (!dateString) return "";
  //   const date = new Date(dateString);
  //   const day = String(date.getDate()).padStart(2, "0");
  //   const month = String(date.getMonth() + 1).padStart(2, "0");
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // };

  // const formattedBookingDate = formatDate(bookingDate);


  //       dispatch({
  //         type: "ADDUSER",
  //         payload: {
  //           profile: file,
  //           firstname: firstname,
  //           lastname: lastname,
  //           Phone: Phone,
  //           Email: Email,
  //           Address: house_no,
  //           area: street,
  //           landmark: landmark,
  //           city: city,
  //           pincode: pincode,
  //           state: state_name,
  //           AadharNo: AadharNo,
  //           PancardNo: PancardNo,
  //           licence: licence,
  //           HostelName: HostelName,
  //           hostel_Id: hostel_Id,
  //           Floor: bookingFlooorId,
  //           Rooms: bookingRoomId,
  //           Bed: bookingBedId,
  //           joining_date: formattedDate,
  //           AdvanceAmount: AdvanceAmount,
  //           RoomRent: RoomRent,
  //           BalanceDue: BalanceDue,
  //           PaymentType: PaymentType,
  //           paid_advance: paid_advance,
  //           paid_rent: paid_rent,
  //           payable_rent: payableamount,
  //           ID: props.EditObj.ID,
  //           reasons: formattedReasons,
  //           stay_type: activeTab === "long" ? "long_stay" : "short_stay",
  //            booking_Id:props.EditObj.booking_id,
  //     booking_date:formattedBookingDate,
  //     booking_amount:bookingAmount
  //         },
  //       });
  //       setLoading(true)


  //     }
  //     dispatch({ type: "INVOICELIST" });
  //   };


  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
      setFormLoading(false)
      setLoading(false)
      if (props?.setShowMenu) props.setShowMenu(false);
    if (props?.setShowForm) props.setShowForm(false);
    if (props?.OnShowTable) props.OnShowTable(true);
      // handleClose();
      // handleCloseAdvanceForm();
      // handleCloseAssign()
      // handleCloseAssignBooking()
      if (props.edit === "Edit") {
        if (props?.setRoomDetail) props.setRoomDetail(true);
        if (props?.OnShowTable) props.OnShowTable(true);
      } else {
        if (props?.setRoomDetail) props.setRoomDetail(false);
      }

    }
  }, [state.UsersList?.statusCodeForAddUser, state.UsersList?.statusCodeForAddCustomerSaveInfo]);

  const handleCloseAdvanceForm = () => {
    if (props.setAdvanceForm) props.setAdvanceForm(false);
    setAdvanceDate("");
    setAdvanceDueDate("");

  };

  useEffect(() => {
    if (state.createAccount?.networkError || state.UsersList?.bedAvailableError) {
      setFormLoading(false)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
        dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError, state.UsersList?.bedAvailableError])















  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];



  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...fields];
    const updatedErrors = [...errors];

    if (field === "reason") {
      if (value === "others") {
        updatedFields[index].showInput = true;
        updatedFields[index].reason_name = "others";
        updatedFields[index].customReason = "";
      } else {
        updatedFields[index].showInput = false;
        updatedFields[index].reason = value;
        updatedFields[index].reason_name = value;
        updatedFields[index].customReason = "";
      }


      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "customReason") {
      updatedFields[index].customReason = value;
      if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {

      // Allow only numbers
      const numericValue = value.replace(/[^0-9]/g, "");
      updatedFields[index].amount = numericValue;
      if (updatedErrors[index]) updatedErrors[index].amount = "";

      // updatedFields[index].amount = value;
      // if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setFields(updatedFields);
    setErrors(updatedErrors);
  };


  const [step, setStep] = useState(1);



  const handleNext = () => {
    let hasError = false;
    const focusedRef = { current: false };
    if (!validateField(firstname, "First Name", firstnameRef, setFirstnameError, focusedRef)) hasError = true;
    if (!validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)) hasError = true;
    if (Phone && Phone.length !== 10) {
      setPhoneError("Please Enter Valid Mobile Number");
      if (!focusedRef.current && phoneRef?.current) {
        phoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else if (Phone) {
      setPhoneError("");
      setPhoneErrorMessage("");
    }

    if (Email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(Email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter Valid Email ID");
        if (!focusedRef.current) {
          focusedRef.current = true;
        }
        hasError = true;
      }
      else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
    if (hasError) {
      return
    }
    setStep(2);

  };



  const handlePrevious = () => {
    setStep(1);
  };



  const handleSaveUserlist = () => {
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });

    let hasError = false;
    const focusedRef = { current: false };

    if (!validateField(firstname, "First Name", firstnameRef, setFirstnameError, focusedRef)) hasError = true;
    if (!validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)) hasError = true;



    if (Phone && Phone.length !== 10) {
      setPhoneError("Please Enter Valid Mobile Number");
      if (!focusedRef.current && phoneRef?.current) {
        phoneRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    } else if (Phone) {
      setPhoneError("");
      setPhoneErrorMessage("");
    }

    if (pincode && pincode.length !== 6) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");
      if (!focusedRef.current && pincodeRef?.current) {
        pincodeRef.current.focus();
        focusedRef.current = true;
      }
      hasError = true;
    }

    if (Email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(Email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter Valid Email ID");
        if (!focusedRef.current) {
          focusedRef.current = true;
        }
        hasError = true;
      }
      else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }

    if (hasError) return;

    console.log("hasError", hasError)

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);
    const capitalizedLastname = capitalizeFirstLetter(lastname);

    const basicAndAddressPayload = {
      profilePic: file,
      hostelId: state.login.selectedHostel_Id,
      customerInfo: {
        firstName: capitalizedFirstname,
        lastName: capitalizedLastname,
        mobileNumber: MobileNumber,
        emailId: Email,
        type: 1,
        address: {
          houseNo: house_no,
          street: street,
          landmark: landmark,
          city: city,
          pincode: pincode,
          state: state_name,
        },


      }
    };


    const basicPayload = {
      profilePic: file,
      hostelId: state.login.selectedHostel_Id,
      payloads: {
        firstName: capitalizedFirstname,
        lastName: capitalizedLastname,
        mobile: MobileNumber,
        emailId: Email,


      }
    };

    console.log("basicPayload", basicPayload)


    const hasAddress =
      house_no?.trim() ||
      street?.trim() ||
      landmark?.trim() ||
      city?.trim() ||
      pincode?.trim() ||
      state_name?.trim();

    if (hasAddress) {
      dispatch({ type: "ADDUSER", payload: basicAndAddressPayload });
      setFormLoading(true)
    } else {
      dispatch({ type: 'CREATECUSTOMERSAVEINFO', payload: basicPayload })
      setFormLoading(true)
    }

  };


  // const handleCreateCustomer = () => {



  //   let hasError = false;
  //   const focusedRef = { current: false };



  //   if (pincode && pincode.length !== 6) {
  //     setPincodeError("Pin Code Must Be Exactly 6 Digits");
  //     if (!focusedRef.current && pincodeRef?.current) {
  //       pincodeRef.current.focus();
  //       focusedRef.current = true;
  //     }
  //     hasError = true;
  //   }



  //   if (hasError) return;
  //   const capitalizeFirstLetter = (str) => {
  //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  //   };

  //   const capitalizedFirstname = capitalizeFirstLetter(firstname);
  //   const capitalizedLastname = capitalizeFirstLetter(lastname);



  // };


  const handleCloseAssignBooking = () => {
    // props.setBookingAssignForm(false)

    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    if (props?.setBookingAssignForm) props.setBookingAssignForm(false);
    if (props?.setShowForm) props.setShowForm(false);
    if (props?.OnShowTable) props.OnShowTable(true);
    if (props.edit === "Edit") {
      if (props?.OnShowTable) props.OnShowTable(true);
    } else {
      if (props?.setRoomDetail) props.setRoomDetail(false);
    }
  }
  const handleCloseBacktoCheckin = () => {
    if (props?.setBacktoCheckInForm) props.setBacktoCheckInForm(false);
    if (props?.handleCloseBed) props.handleCloseBed();
  }

  console.log("props?.EditObj", props?.EditObj)

  const [recheckinbedname, setRecheckinbedName] = useState("")
  const [RequestDate, setRequestDate] = useState(null)

  useEffect(() => {
    if (props?.bactocheckinForm) {

      setId(props?.EditObj?.ID || props?.customer_details?.ID);
      if (props?.EditObj?.profile === 0 || props?.customer_details?.profile === 0) setFile(null);
      else {
        setFile(props?.EditObj?.profile || props?.customer_details?.profile);
      }


      if (props?.EditObj?.Name || props?.customer_details?.Name) {
        const value = props?.EditObj?.Name.trim().split(" ") || props?.customer_details?.Name.trim().split(" ")
        setFirstname(value[0] || "");
        setLastname(value[1] || "");
      } else {
        setFirstname("");
        setLastname("");
      }
      setHouseNo(props?.EditObj?.Address?.trim() || props?.customer_details?.Name?.trim());
      setStreet(props?.EditObj?.area?.trim() || props?.customer_details?.area?.trim());
      setLandmark(props?.EditObj?.landmark?.trim() || props?.customer_details?.landmark?.trim());
      setCity(props?.EditObj?.city?.trim() || props?.customer_details?.city?.trim());
      setPincode(props.EditObj?.pincode || props?.customer_details?.pincode);
      setStateName(props.EditObj?.state || props?.customer_details?.state);
      setAadharNo(props.EditObj?.AadharNo || props?.customer_details?.AadharNo);
      setPancardNo(props.EditObj?.PancardNo || props?.customer_details?.PancardNo);
      setLicence(props.EditObj?.licence || props?.customer_details?.licence);
      setPhone(props.EditObj?.Phone || props?.customer_details?.Phone);
      setEmail(props.EditObj?.Email || props?.customer_details?.Email);
      setHostelName(props.EditObj?.HostelName || props?.customer_details?.HostelName);
      setRecheckinbedName(props?.EditObj?.Bed || props?.customer_details?.Bed)

      setHostel_Id(props.EditObj?.Hostel_Id || props?.customer_details?.Hostel_Id);
      setRooms(props?.EditObj?.hstl_Rooms || props?.customer_details?.hstl_Rooms);
      setBed(props?.EditObj?.hstl_Bed || props?.customer_details?.hstl_Bed)
      setPaymentType(props.EditObj?.PaymentType || props?.customer_details?.PaymentType);

      setBalanceDue(props.EditObj?.BalanceDue || props?.customer_details?.BalanceDue);
      setPaidAdvance(props.EditObj?.paid_advance || props?.customer_details?.paid_advance);
      setFloor(props.EditObj?.Floor || props?.customer_details?.Floor)
      setSelectedDate(props.EditObj?.joining_Date || props?.customer_details?.joining_Date)

      setBookingFloorId(props.EditObj?.floor_name || props?.customer_details?.floor_name)
      setBookingRoomId(props.EditObj?.Room_Id || props?.customer_details?.Room_Id)
      setBookingBedId(props.EditObj?.Bed || props?.customer_details?.Bed)
      setBookingAmount(props.EditObj?.pending_advance || props?.customer_details?.pending_advance)
      setAdvanceAmount(props.EditObj?.AdvanceAmount || props?.customer_details?.AdvanceAmount)
      setRoomRent(props.EditObj?.RoomRent || props?.customer_details?.RoomRent)
      setBookingDate(props.EditObj?.booking_booking_date || props?.customer_details?.booking_booking_date)
      if (props.EditObj?.req_date || props.customer_details?.req_date) {
        setRequestDate(dayjs(props.EditObj?.req_date || props.customer_details?.req_date));
      }
    }
    //   if ( (props?.EditObj && Array.isArray(props.EditObj?.reasonData)) ||
    //   (props?.customer_details && Array.isArray(props?.customer_details?.reasonData))) {

    //   const formattedFields = props.EditObj?.reasonData.map((entry) => {
    //     const isCustom = String(entry.reason) !== "maintenance";

    //     return {
    //       reason_name: entry.reason,
    //       amount: entry.amount || "",
    //       showInput: isCustom,
    //       customReason: isCustom ? entry.reason : "",
    //       id: entry.id || ""
    //     };
    //   });

    //   setFields(formattedFields);
    // }

    const reasonData =
      Array.isArray(props?.EditObj?.reasonData) && props.EditObj.reasonData.length > 0
        ? props.EditObj.reasonData
        : Array.isArray(props?.customer_details?.reasonData)
          ? props.customer_details.reasonData
          : [];

    if (reasonData.length > 0) {
      const formattedFields = reasonData.map((entry) => {
        const isCustom = String(entry.reason) !== "maintenance";

        return {
          reason_name: entry.reason,
          amount: entry.amount || "",
          showInput: isCustom,
          customReason: isCustom ? entry.reason : "",
          id: entry.id || ""
        };
      });

      setFields(formattedFields);
    }

  }, [props.bactocheckinForm, props?.customer_details, props.recheckin])

  console.log("bed", Bed);


  const selectedFloor = React.useMemo(() => {
    const list = state.UsersList?.hosteldetailslist;
    if (!list) return null;

    if (Floor) {

      return list.find((option) => String(option.floor_id) === String(Floor)) || null;
      // } else if (props.EditObj?.floor_name || props?.customer_details?.floor_name) {
      //   return list.find(
      //     (option) => option.floor_name?.toLowerCase() === props.EditObj.floor_name?.toLowerCase()
      //   ) || null;
      // }
    } else if (props.EditObj?.floor_name || props?.customer_details?.floor_name) {
      const floorName =
        props.EditObj?.floor_name || props?.customer_details?.floor_name;

      return (
        list.find(
          (option) =>
            option.floor_name?.toLowerCase() === floorName?.toLowerCase()
        ) || null
      );
    }
    return null;
  }, [Floor, props.EditObj?.floor_name, state.UsersList?.hosteldetailslist, props?.customer_details]);




  // const selectedRoom = React.useMemo(() => {
  //   const list = state.UsersList?.roomdetails;
  //   if (!list) return null;

  //   if (Rooms) {
  //     return list.find(
  //       (option) => String(option.Room_Id) === String(Rooms)
  //     ) || null;
  //   } else if (props.EditObj?.Rooms) {
  //     return list.find(
  //       (option) =>
  //         String(option.Room_Id) === String(props.EditObj.Rooms)
  //     ) || null;
  //   }
  //   return null;
  // }, [Rooms, props.EditObj?.Rooms, state.UsersList?.roomdetails  , props?.customer_details]);



  const selectedRoom = React.useMemo(() => {
    const list = state.UsersList?.roomdetails;
    if (!list) return null;

    // Prefer customer_details if available
    // if (props.customer_details?.Rooms) {
    //   return list.find(
    //     (option) => String(option.Room_Id) === String(props.customer_details.Rooms)
    //   ) || null;
    // }

    // Then check Rooms from state
    if (Rooms) {
      return list.find(
        (option) => String(option.Room_Id) === String(Rooms)
      ) || null;
    }

    // Finally check EditObj
    if (props.EditObj?.Rooms) {
      return list.find(
        (option) => String(option.Room_Id) === String(props.EditObj.Rooms)
      ) || null;
    }

    return null;
  }, [
    Rooms,
    props.EditObj?.Rooms,
    props.customer_details?.Rooms,
    state.UsersList?.roomdetails
  ]);


  // let bedOptions =
  //   state.UsersList?.bednumberdetails?.bed_details?.filter(
  //     (item) =>
  //       item.bed_no !== "0" &&
  //       item.bed_no !== "undefined" &&
  //       item.bed_no !== "" &&
  //       item.bed_no !== "null"
  //   ) || [];

  // const selectedBedName =
  //   bedOptions.find((item) => item.id === Bed)?.bed_no || props.EditObj?.Bed || "";

  // if (Bed && !bedOptions.some((b) => b.id === Bed)) {
  //   bedOptions = [
  //     ...bedOptions,
  //     { id: Bed, bed_no: selectedBedName }
  //   ];
  // }




  // let bedOptions =
  //   state.UsersList?.bednumberdetails?.bed_details?.filter(
  //     (item) =>
  //       item.bed_no !== "0" &&
  //       item.bed_no !== "undefined" &&
  //       item.bed_no !== "" &&
  //       item.bed_no !== "null"
  //   ) || [];


  // const bedId =
  //   props.EditObj?.hstl_Bed ||          
  //   props.customer_details?.hstl_Bed || 
  //   Bed;                                


  //   useEffect(() => {
  //   setBed(
  //     props.EditObj?.hstl_Bed ??
  //     props.customer_details?.hstl_Bed ??
  //     Bed
  //   );
  // }, [props.EditObj?.hstl_Bed, props.customer_details?.hstl_Bed, Bed]);
  // const selectedBedName =
  //   bedOptions.find((item) => String(item.id) === String(bedId))?.bed_no || "";

  // if (bedId && !bedOptions.some((b) => String(b.id) === String(bedId))) {
  //   bedOptions = [...bedOptions, { id: bedId, bed_no: selectedBedName }];
  // }


  const handleRecheckin = (e) => {
    setReason(e.target.value)
    setReasonError("")
  }
  const [recheckinDateError, setRecheckinDateError] = useState("")
  const [reasonError, setReasonError] = useState("")
  const reasonRef = useRef(null);
  const dateRef = useRef(null);

  const handleSaveBacktoCheckin = () => {
    if (!reason) {
      setReasonError("Please Enter Reason");
      reasonRef.current?.focus();
      return;
    }
    if (!recheckInDate) {
      setRecheckinDateError("Please Select Date");
      dateRef.current?.focus();
      return;
    }
    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);
      const year = newDate.getFullYear();
      const month = String(newDate.getMonth() + 1).padStart(2, "0");
      const day = String(newDate.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const formattedDate = recheckInDate
      ? incrementDateAndFormat(recheckInDate) + "T00:00:00"
      : "";


    dispatch({ type: "BACKTOCHECKIN", payload: { userId: id, RecheckIn_Reason: reason, RecheckIn_Date: formattedDate } });
    setFormLoading(true)
  }

  useEffect(() => {
    if (state.UsersList?.StatusCodeBacktoCheckin === 200) {
      setFormLoading(false)
      handleCloseBacktoCheckin()
      dispatch({
        type: "USERLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_BACK_TO_CHECKIN_USER" });
      }, 500);

    }
  }, [state.UsersList?.StatusCodeBacktoCheckin]);



  return (
    <div>

      {/* Tenant Check-In  UNASSIGN -CHECKIN*/}
      <Modal
        show={props.showAssignMenu}
        onHide={handleCloseAssign}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 950,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body >
            <div>

              <div >
                <Modal.Header className="pt-0"
                  style={{ position: "relative", marginTop: "", border: "none" }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Tenant Check-In
                  </div>

                  <CloseCircle
                    size="24"
                    color="#000"
                    onClick={handleCloseAssign}
                    style={{ cursor: "pointer" }}
                  />
                </Modal.Header>
                <div className="d-flex align-items-center gap-3 mb-3 ms-3">

                  <img
                    src={
                      typeof file === "string" && file.trim()
                        ? file
                        : file instanceof File
                          ? URL.createObjectURL(file)
                          : Profileimage
                    }
                    alt="Profile"
                    className="rounded-circle"
                    width="35"
                    height="35"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = Profileimage;
                    }}
                  />
                  <div>
                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px", fontFamily: "Gilroy" }}>
                      {firstname} {lastname}
                    </p>

                  </div>
                </div>


                <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, width: "100%" }} className="mt-1 p-1">
                  <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", width: "100%" }}>
                    <button
                      onClick={() => setActiveTab("long")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "long" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "long" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Long Stay
                    </button>
                    <button
                      onClick={() => setActiveTab("short")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "short" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "short" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Short Stay
                    </button>
                  </div>

                </div>

                {activeTab === "long" ? <>
                  <div style={{ maxHeight: "300px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                    <div className="row d-flex align-items-center">
                      <div className="col-12">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            paddingTop: "6px",
                          }}
                        >
                          Floor  {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.UsersList.floorList?.map((u) => ({
                              value: u.id,
                              label: u.name,
                            })) || []
                          }
                          onChange={handleFloor}
                          value={
                            state.UsersList.floorList?.find(
                              (option) => option.id === Floor
                            )
                              ? {
                                value: Floor,
                                label: state.UsersList.floorList.find(
                                  (option) => option.id === Floor
                                )?.name,
                              }
                              : null
                          }
                          placeholder="Select a Floor"
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
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
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

                        {floorError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {floorError}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="col-12 mb-1">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Room {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.PgList?.roomsList?.map((item) => ({
                              value: item.id,
                              label: item.name,
                            })) || []
                          }
                          onChange={(selectedOption) =>
                            handleRooms(selectedOption?.value)
                          }
                          value={
                            state.PgList?.roomsList?.find(
                              (option) => option.id === Rooms
                            )
                              ? {
                                value: Rooms,
                                label: state.PgList?.roomsList.find(
                                  (option) => option.id === Rooms
                                )?.name,
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
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
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

                        {roomError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {roomError}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Bed {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.PgList?.bedList?.[Rooms] 
                              ? state.PgList.bedList[Rooms]
                                .filter(
                                  (item) =>
                                    item.bedName !== "0" &&
                                    item.bedName !== "undefined" &&
                                    item.bedName !== "" &&
                                    item.bedName !== "null"
                                )
                                .map((item) => ({
                                  value: item.id,
                                  label: item.bedName,
                                }))
                              : []
                          }
                          onChange={handleBed}
                          value={
                            state.PgList?.bedList?.[Rooms] 
                              ? (() => {
                                const selected = state.PgList.bedList[Rooms].find(
                                  (option) => option.id === Bed
                                );
                                return selected
                                  ? { value: selected.id, label: selected.bedName }
                                  : null;
                              })()
                              : null
                          }
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
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
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

                        {state.UsersList.bedAvailableError ?
                          <div className='d-flex  align-items-center  mt-1 mb-1'>
                            <MdError style={{ color: "red", marginRight: '5px', fontSize: "13px", }} />
                            <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>Bed unavailable for this date</label>
                          </div>
                          : null}


                        {bedError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {bedError}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Group controlId="purchaseDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Joining Date{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </Form.Label>

                          <div
                            className="datepicker-wrapper"
                            style={{ position: "relative", width: "100%" }}
                          >
                            <DatePicker
                              style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy"
                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={selectedDate ? dayjs(selectedDate) : null}
                              onChange={(date) => {
                                setDateError("");
                                setSelectedDate(date ? date.toDate() : null);
                                setJoingDateErrmsg('')

                                dispatch(JoininDatecustomer(date ? date.toDate() : null));
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
                              disabledDate={(current) => current && current > dayjs().endOf("day")}
                            />
                          </div>
                        </Form.Group>

                        {dateError && (
                          <div style={{ color: "red", marginTop: "-px" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {dateError}
                            </label>
                          </div>
                        )}

                        {joiningDateErrmsg.trim() !== "" && (
                          <div className="d-flex align-items-center">
                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                              {joiningDateErrmsg}
                            </label>
                          </div>
                        )}
                      </div>




                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group>
                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                            Advance Amount
                            <span style={{ color: "red", fontSize: "20px" }}> *</span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            placeholder="Enter Amount"
                            value={AdvanceAmount}
                            onChange={handleAdvanceAmount}
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
                            <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {advanceAmountError}
                            </label>
                          </div>
                        )}
                      </div>





                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group>
                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                            Rental Amount
                            <span style={{ color: "red", fontSize: "20px" }}> *</span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            placeholder="Enter Amount"
                            value={RoomRent}
                            onChange={handleRoomRent}
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
                            <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {roomrentError}
                            </label>
                          </div>
                        )}
                      </div>





                    </div>

                    <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-3 mb-3">

                      <div className="d-flex justify-content-between align-items-center p-4">
                        <div>
                          <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                        </div>
                        <div>
                          <Button
                            onClick={handleAddField}
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "14px",
                              backgroundColor: "#1E45E1",
                              color: "white",
                              fontWeight: 600,
                              borderRadius: "10px",
                              padding: "6px 15px",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <img
                              src={addcircle}
                              alt="Assign Bed"
                              style={{
                                height: 16,
                                width: 16,
                                filter: "brightness(0) invert(1)",
                              }}
                            />
                            Add
                          </Button>

                        </div>
                      </div>


                      {fields.map((item, index) => {
                        const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");

                        const filteredOptions = reasonOptions.map((opt) => {
                          if (opt.value === "maintenance") {
                            return {
                              ...opt,
                              isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                            };
                          }
                          return opt;
                        });

                        return (
                          <div className="row px-4 mb-3" key={index}>
                            <div className="col-md-6">


                              {!item.showInput ? (
                                <Select
                                  options={filteredOptions}
                                  value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                  onChange={(selectedOption) => {
                                    const selectedValue = selectedOption.value;

                                    if (selectedValue === "others") {
                                      handleInputChange(index, "reason", "others");
                                    } else {
                                      handleInputChange(index, "reason", selectedValue);
                                    }
                                  }}
                                  isDisabled={item.reason === "maintenance"}
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
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      border: "1px solid #ced4da",
                                      fontFamily: "Gilroy",
                                    }),
                                    menuList: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      maxHeight: "120px",
                                      padding: 0,
                                      scrollbarWidth: "thin",
                                      overflowY: "auto",
                                      fontFamily: "Gilroy",
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
                                      cursor: "pointer",
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                    option: (base, state) => ({
                                      ...base,
                                      cursor: state.isDisabled ? "not-allowed" : "pointer",
                                      backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                      color: state.isDisabled ? "#aaa" : "#000",
                                    }),
                                  }}
                                />
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom reason"
                                    value={item.customReason}
                                    onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
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
                                </>
                              )}
                              {errors[index]?.reason && (
                                <div className="d-flex align-items-center mt-1">
                                  <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {errors[index]?.reason}
                                  </label>
                                </div>
                              )}
                            </div>


                            <div className="col-md-5">

                              <input
                                type="text"
                                placeholder="Enter amount"
                                value={item.amount}
                                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                className="form-control"
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
                              {errors[index]?.amount && (
                                <div className="d-flex align-items-center mt-1">
                                  <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {errors[index]?.amount}
                                  </label>
                                </div>
                              )}
                            </div>


                            <div className="col-md-1 d-flex justify-content-center align-items-center p-0">

                              <Trash
                                size="20"
                                color="red"
                                variant="Bold"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemoveField(index)}
                              />

                            </div>
                          </div>
                        );
                      })}




                    </div>









                  </div>

                  {state.createAccount?.networkError ?
                    <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                    </div>
                    : null}



                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 600,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      marginTop: 10,
                    }}
                    onClick={handleSaveUserlistAddUser}
                  >
                    Assign Bed
                  </Button>
                </>

                  :



                  activeTab === "short" && (
                    <div
                      style={{
                        height: "400px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f2f6fc",
                        borderRadius: "10px",
                        marginTop: "20px",
                        marginRight: "0",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        border: "1px dashed #b0c4de",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                          alt="Coming Soon"
                          width="80"
                          height="80"
                          style={{ marginBottom: "15px", opacity: 0.7 }}
                        />

                        <p style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Gilroy" }}>Coming Soon. Stay tuned!</p>
                      </div>
                    </div>

                  )



                }






              </div>
              {/* )} */}













            </div>
          </Modal.Body>


          {formLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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


          {loading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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


        </Modal.Dialog>
      </Modal>





{/* Tenant Check-In   BOOKED -CHECK-IN*/}

      <Modal
        show={props.BookingAssignForm}
        onHide={handleCloseAssignBooking}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 950,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body >
            <div>

              <div >
                <Modal.Header className="pt-0"
                  style={{ position: "relative", marginTop: "", border: "none" }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Tenant Check-In
                  </div>

                  <CloseCircle
                    size="24"
                    color="#000"
                    onClick={handleCloseAssignBooking}
                    style={{ cursor: "pointer" }}
                  />
                </Modal.Header>
                <div className="d-flex align-items-center gap-3 mb-3 ms-3">

                  <img
                    src={
                      typeof file === "string" && file.trim()
                        ? file
                        : file instanceof File
                          ? URL.createObjectURL(file)
                          : Profileimage
                    }
                    alt="Profile"
                    className="rounded-circle"
                    width="35"
                    height="35"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = Profileimage; // Fallback if loading fails
                    }}
                  />
                  <div>
                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                      {firstname} {lastname}
                    </p>

                  </div>
                </div>


                <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, width: "100%" }} className="mt-1 p-1">
                  <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", width: "100%" }}>
                    <button
                      onClick={() => setActiveTab("long")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "long" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "long" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Long Stay
                    </button>
                    <button
                      onClick={() => setActiveTab("short")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "short" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "short" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Short Stay
                    </button>
                  </div>

                </div>

                {activeTab === "long" ? <>
                  <div style={{ maxHeight: "300px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                    <div className="row d-flex align-items-center">
                      <div className="col-12">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            paddingTop: "6px",
                          }}
                        >
                          Floor  {" "}

                        </Form.Label>

                        <FormControl
                          type="text"
                          placeholder="Enter Amount"
                          value={floor_name}
                          disabled
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor: "#EFF2FF"
                          }}
                        />


                      </div>

                      <div className="col-12 mb-1">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Room {" "}

                        </Form.Label>

                        <FormControl
                          type="text"
                          disabled
                          placeholder="Enter Amount"
                          value={room_name}
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor: "#EFF2FF"
                          }}
                        />




                      </div>




                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Bed {" "}

                        </Form.Label>


                        <FormControl
                          type="text"
                          disabled
                          placeholder="Enter Amount"
                          value={bed_name}

                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor: "#EFF2FF"
                          }}
                        />


                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group>
                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                            Booking Amount
                            <span style={{ color: "red", fontSize: "20px" }}> *</span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            placeholder="Enter Amount"
                            value={bookingAmount}
                            // onChange={handleAdvanceAmount}
                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                              backgroundColor: "#EFF2FF"
                            }}
                          />
                        </Form.Group>
                        {advanceAmountError && (
                          <div style={{ color: "red" }}>
                            <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {advanceAmountError}
                            </label>
                          </div>
                        )}
                      </div>



                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group>
                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                            Booking Date

                          </Form.Label>
                          <FormControl
                            disabled
                            type="text"
                            placeholder="Enter Amount"
                            // value={bookingDate}
                            value={bookingDate ? bookingDate.format("DD/MM/YYYY") : ""}
                            style={{
                              fontSize: 16,
                              color: "#4B4B4B",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                              backgroundColor: "#EFF2FF"
                            }}
                          />
                        </Form.Group>

                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Group controlId="purchaseDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Joining Date{" "}

                          </Form.Label>

                          <div
                            className="datepicker-wrapper"
                            style={{ position: "relative", width: "100%" }}
                          >
                            <DatePicker
                              // disabled
                              style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy",

                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={selectedDate ? dayjs(selectedDate) : null}
                              onChange={(date) => {
                                setDateError("");
                                setSelectedDate(date ? date.toDate() : null);
                                setJoingDateErrmsg('')

                                dispatch(JoininDatecustomer(date ? date.toDate() : null));
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
                              disabledDate={disabledJoiningDate}

                            />
                          </div>
                        </Form.Group>

                        {dateError && (
                          <div style={{ color: "red", marginTop: "-px" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {dateError}
                            </label>
                          </div>
                        )}

                        {joiningDateErrmsg.trim() !== "" && (
                          <div className="d-flex align-items-center">
                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                              {joiningDateErrmsg}
                            </label>
                          </div>
                        )}
                      </div>




                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group>
                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                            Advance Amount
                            <span style={{ color: "red", fontSize: "20px" }}> *</span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            placeholder="Enter Amount"
                            value={AdvanceAmount}
                            onChange={handleAdvanceAmount}
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
                            <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {advanceAmountError}
                            </label>
                          </div>
                        )}
                      </div>





                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group>
                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                            Rental Amount
                            <span style={{ color: "red", fontSize: "20px" }}> *</span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            placeholder="Enter Amount"
                            value={RoomRent}
                            onChange={handleRoomRent}
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
                            <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {roomrentError}
                            </label>
                          </div>
                        )}
                      </div>





                    </div>

                    <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-3 mb-3">

                      <div className="d-flex justify-content-between align-items-center p-4">
                        <div>
                          <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                        </div>
                        <div>
                          <Button
                            onClick={handleAddField}
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "14px",
                              backgroundColor: "#1E45E1",
                              color: "white",
                              fontWeight: 600,
                              borderRadius: "10px",
                              padding: "6px 15px",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <img
                              src={addcircle}
                              alt="Assign Bed"
                              style={{
                                height: 16,
                                width: 16,
                                filter: "brightness(0) invert(1)",
                              }}
                            />
                            Add
                          </Button>

                        </div>
                      </div>


                      {fields.map((item, index) => {
                        const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");

                        const filteredOptions = reasonOptions.map((opt) => {
                          if (opt.value === "maintenance") {
                            return {
                              ...opt,
                              isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                            };
                          }
                          return opt;
                        });

                        return (
                          <div className="row px-4 mb-3" key={index}>
                            <div className="col-md-6">


                              {!item.showInput ? (
                                <Select
                                  options={filteredOptions}
                                  value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                  onChange={(selectedOption) => {
                                    const selectedValue = selectedOption.value;

                                    if (selectedValue === "others") {
                                      handleInputChange(index, "reason", "others");
                                    } else {
                                      handleInputChange(index, "reason", selectedValue);
                                    }
                                  }}
                                  isDisabled={item.reason === "maintenance"}
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
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      border: "1px solid #ced4da",
                                      fontFamily: "Gilroy",
                                    }),
                                    menuList: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      maxHeight: "120px",
                                      padding: 0,
                                      scrollbarWidth: "thin",
                                      overflowY: "auto",
                                      fontFamily: "Gilroy",
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
                                      cursor: "pointer",
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                    option: (base, state) => ({
                                      ...base,
                                      cursor: state.isDisabled ? "not-allowed" : "pointer",
                                      backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                      color: state.isDisabled ? "#aaa" : "#000",
                                    }),
                                  }}
                                />
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom reason"
                                    value={item.customReason}
                                    onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
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
                                </>
                              )}
                              {errors[index]?.reason && (
                                <div className="d-flex align-items-center mt-1">
                                  <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {errors[index]?.reason}
                                  </label>
                                </div>
                              )}
                            </div>


                            <div className="col-md-5">

                              <input
                                type="text"
                                placeholder="Enter amount"
                                value={item.amount}
                                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                className="form-control"
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
                              {errors[index]?.amount && (
                                <div className="d-flex align-items-center mt-1">
                                  <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {errors[index]?.amount}
                                  </label>
                                </div>
                              )}
                            </div>


                            <div className="col-md-1 d-flex justify-content-center align-items-center p-0">


                              <Trash
                                size="20"
                                color="red"
                                variant="Bold"
                                style={{ cursor: "pointer" }}
                                onClick={() => handleRemoveField(index)}
                              />

                            </div>
                          </div>
                        );
                      })}




                    </div>









                  </div>

                  {state.createAccount?.networkError ?
                    <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                    </div>
                    : null}

                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 600,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      marginTop: 10,
                    }}
                    onClick={handleSaveBookingAdvance}
                  >
                    Assign Bed
                  </Button>
                </>

                  :



                  activeTab === "short" && (
                    <div
                      style={{
                        height: "400px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f2f6fc",
                        borderRadius: "10px",
                        marginTop: "20px",
                        marginRight: "0",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        border: "1px dashed #b0c4de",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                          alt="Coming Soon"
                          width="80"
                          height="80"
                          style={{ marginBottom: "15px", opacity: 0.7 }}
                        />

                        <p style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Gilroy" }}>Coming Soon. Stay tuned!</p>
                      </div>
                    </div>

                  )



                }






              </div>
              {/* )} */}













            </div>
          </Modal.Body>


          {formLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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


          {loading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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


        </Modal.Dialog>
      </Modal>



{/* Add New Customer */}

      <Modal
        show={props.showMenu}
        onHide={handleClose}
        backdrop="static"
        dialogClassName="custom-modal custom-modal-width"
      >
        <Modal.Dialog
          style={{
            maxWidth: 800,
            paddingRight: "10px",
            borderRadius: "30px",
            marginTop: '-40px',
            marginBottom: '100px'
          }}
          className="m-0 p-0"
        >
          <Modal.Body className="p-0 " >
            <div style={{ overflowY: "auto", }} className="d-flex justify-content-center  p-2">
              {/* Sidebar */}
              <div
                className="p-4"
                style={{
                  width: '250px',
                  minWidth: '240px',
                  backgroundColor: '#f4f8ff',
                  borderTopLeftRadius: '20px',
                  borderBottomLeftRadius: '20px',
                }}
              >
                <h5 className="mb-4" style={{ fontFamily: "Gilroy" }}>Add New Customer</h5>
                {/* Step 1 */}
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: step === 1 ? "#1E45E1" : "#ffffff",
                      border: "1px solid #1E45E1",
                    }}
                  >
                    {step === 1 ?
                      <img
                        src={Store_Icon}
                        alt="storeicon"
                        height={15}
                        width={15}
                      />
                      :
                      <RiShoppingBag3Line
                        style={{ color: "#1E45E1" }}
                      />}
                  </div>
                  <span className="ms-2" style={{ fontFamily: "Gilroy", fontSize: "14px" }}>
                    Step 1
                    <br />
                    <small>Basic Details</small>
                  </span>
                </div>

                {/* Step 2 */}
                <div className="d-flex align-items-center mb-4">
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center"
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundColor: step === 2 ? "#1E45E1" : "#ffffff",
                      border: "1px solid #1E45E1",
                    }}
                  >
                    <img
                      src={step === 2 ? Flipbackward : FlipbackwardBlue}
                      alt="Flipbackwardicon"
                      height={15}
                      width={15}
                    />
                  </div>
                  <span className="ms-2" style={{ fontFamily: "Gilroy", fontSize: "14px" }}>
                    Step 2
                    <br />
                    <small>Address Details</small>
                  </span>
                </div>


              </div>

              <div
                className="flex-grow-1 position-relative"
                style={{
                  backgroundColor: '#fff',
                  borderTopRightRadius: '20px',
                  borderBottomRightRadius: '20px',
                  overflowY: 'auto',
                  padding: '15px',
                }}
              >
                <div
                  className="d-flex justify-content-between align-items-start px-2 py-1"
                  style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #eee',
                  }}
                >
                  <h5 style={{ fontFamily: 'Gilroy', fontWeight: 600 }}>
                    {step === 1 ? "Basic Details" : "Address Details"}
                  </h5>
                  <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: 'pointer' }} />
                </div>
                <div className="show-scrolls ms-2 mt-1" style={{ overflowY: 'auto', maxHeight: "440px", overflowX: 'hidden', backgroundColor: "" }}>

                  <div className="m-2">
                    {step === 1 && (
                      <>
                        <div className="row">
                          <div className="d-flex flex-column">

                            <div className="d-flex align-items-center mt-1">
                              <div
                                className=""
                                style={{ height: 100, width: 100, position: "relative" }}
                              >
                                <Image
                                  src={
                                    file
                                      ? typeof file === "string"
                                        ? file
                                        : URL.createObjectURL(file)
                                      : Profile
                                  }
                                  roundedCircle
                                  style={{ height: 100, width: 100, cursor: "pointer" }}
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
                                      cursor: "pointer"
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
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 ">
                                <Form.Group className="mb-1">
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
                                    placeholder="Enter First Name"
                                    type="text"
                                    ref={firstnameRef}
                                    value={firstname}
                                    onChange={(e) => handleFirstName(e)}
                                    style={{
                                      fontSize: 16,
                                      color: "#4B4B4B",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      boxShadow: "none",
                                      border: "1px solid #D9D9D9",
                                      height: 40,
                                      borderRadius: 8,
                                    }}
                                  />
                                </Form.Group>
                                {firstnameError && (
                                  <div style={{ color: "red", marginTop: "-5px" }}>
                                    {" "}
                                    <MdError
                                      style={{
                                        color: "red",
                                        marginRight: "5px",
                                        fontSize: "13px",
                                        marginBottom: "2px",
                                      }}
                                    />
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        marginRight: "3px"
                                      }}
                                    >
                                      {" "}
                                      {firstnameError}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group className="mb-1">
                                  <Form.Label
                                    style={{
                                      marginTop: "10px",
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
                                      height: 40,
                                      borderRadius: 8,
                                    }}
                                  />
                                </Form.Group>
                              </div>

                              <Form.Group
                                className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1"
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
                                  Mobile Number{" "}
                                  <span style={{ color: "red", fontSize: "20px" }}>
                                    {" "}
                                    *{" "}
                                  </span>
                                </Form.Label>

                                <InputGroup>
                                  <Form.Select
                                    value={countryCode}
                                    id="vendor-select-pg"
                                    style={{
                                      border: "1px solid #D9D9D9",

                                      borderRadius: "8px 0 0 8px",
                                      height: 40,
                                      fontSize: 16,
                                      color: "#4B4B4B",
                                      fontFamily: "Gilroy",
                                      fontWeight: countryCode ? 600 : 500,
                                      boxShadow: "none",
                                      backgroundColor: "#fff",
                                      maxWidth: 90,
                                      paddingRight: 10,
                                      cursor: "pointer"
                                    }}
                                  >
                                    <option>{countryCode}</option>
                                  </Form.Select>
                                  <Form.Control
                                    value={Phone}
                                    ref={phoneRef}
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
                                      height: 40,
                                      borderRadius: "0 8px 8px 0",
                                    }}
                                  />
                                </InputGroup>
                                <p
                                  id="MobileNumberError"
                                  style={{
                                    color: "red",
                                    fontSize: 11,
                                    marginTop: "-15px",
                                  }}
                                ></p>
                                {phoneError && (
                                  <div style={{ color: "red" }}>
                                    <MdError
                                      style={{
                                        color: "red",
                                        marginRight: "5px",
                                        fontSize: "13px",
                                        marginBottom: "2px",
                                      }}
                                    />
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        marginRight: "3px"
                                      }}
                                    >
                                      {" "}
                                      {phoneError}
                                    </span>
                                  </div>
                                )}
                                {phonenumError && (
                                  <div style={{ color: "red" }}>
                                    <MdError
                                      style={{
                                        color: "red",
                                        marginRight: "5px",
                                        fontSize: "13px",
                                        marginBottom: "2px",
                                      }}
                                    />
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {" "}
                                      {phonenumError}
                                    </span>
                                  </div>
                                )}
                                {phoneErrorMessage && (
                                  <div style={{ color: "red" }}>
                                    <MdError
                                      style={{
                                        color: "red",
                                        marginRight: "5px",
                                        fontSize: "13px",
                                        marginBottom: "2px",
                                      }}
                                    />
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        color: "red",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {" "}
                                      {phoneErrorMessage}
                                    </span>
                                  </div>
                                )}
                              </Form.Group>
                              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <Form.Group className="mb-1">
                                  <Form.Label
                                    style={{
                                      fontSize: 14,
                                      color: "#222222",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      marginTop: "10px",
                                    }}
                                  >
                                    Email ID{" "}
                                  </Form.Label>
                                  <FormControl
                                    type="text"
                                    id="form-controls"
                                    placeholder="Enter Email ID"
                                    value={Email}
                                    onChange={(e) => handleEmail(e)}
                                    style={{
                                      fontSize: 16,
                                      color: "#4B4B4B",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      boxShadow: "none",
                                      border: "1px solid #D9D9D9",
                                      height: 40,
                                      borderRadius: 8,
                                    }}
                                  />
                                  {emailError && (
                                    <div style={{ color: "red" }}>
                                      <MdError style={{
                                        color: "red",
                                        marginRight: "5px",
                                        fontSize: "13px",
                                        marginBottom: "2px",
                                      }} />
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {" "}
                                        {emailError}
                                      </span>
                                    </div>
                                  )}
                                  {emailIdError && (
                                    <div style={{ color: "red" }}>
                                      <MdError style={{
                                        color: "red",
                                        marginRight: "5px",
                                        fontSize: "13px",
                                        marginBottom: "2px",
                                      }} />
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {emailIdError}
                                      </span>
                                    </div>
                                  )}
                                  {emailErrorMessage && (
                                    <div style={{ color: "red" }}>
                                      <MdError style={{
                                        color: "red",
                                        marginRight: "5px",
                                        fontSize: "13px",
                                        marginBottom: "2px",
                                      }} />
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
                            </div>

                          </div>
                          {state.createAccount?.networkError ?
                            <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                              <MdError style={{ color: "red", marginRight: '5px' }} />
                              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                            </div>
                            : null}
                        </div>

                        <div className="d-flex justify-content-end mt-3">
                          <Button style={{
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
                          }} onClick={handleSaveUserlist}>Save Info</Button>
                          <Button style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "white",
                            color: "#1E45E1",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "10px",
                            maxHeight: 45,
                            width: "146px",
                            whiteSpace: "nowrap", marginLeft: 10, marginRight: 10
                          }} onClick={handleNext}>Next</Button>

                        </div>
                      </>
                    )}



                    {step === 2 && (
                      <>
                        <div className="row mt-2">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
                            <Form.Group className="">
                              <Form.Label
                                style={{
                                  fontSize: 14,
                                  color: "#222222",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                }}
                              >
                                Flat , House no , Building , Company , Apartment{" "}
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {house_noError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{
                                    fontFamily: "Gilroy",
                                    fontSize: "13px",
                                    marginRight: "5px",
                                    marginBottom: "1px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {house_noError}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {streetError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{
                                    fontFamily: "Gilroy",
                                    fontSize: "13px",
                                    marginRight: "5px",
                                    marginBottom: "1px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {streetError}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {landmarkError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{
                                    fontFamily: "Gilroy",
                                    fontSize: "13px",
                                    marginRight: "5px",
                                    marginBottom: "1px",
                                  }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {landmarkError}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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

                              </Form.Label>
                              <Form.Control
                                value={pincode}
                                ref={pincodeRef}
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
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />

                              {pincodeError && (
                                <div className="d-flex align-items-start gap-1 mb-2" style={{ marginTop: "5px" }}>
                                  <MdError
                                    style={{
                                      color: "red",
                                      fontSize: "13px",
                                      marginTop: "1px",
                                    }}
                                  />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                      lineHeight: "16px",
                                    }}
                                  >
                                    {pincodeError}
                                  </label>
                                </div>
                              )}

                            </Form.Group>
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-1">
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

                              </Form.Label>
                              <FormControl
                                type="text"
                                id="form-controls"
                                placeholder="Enter City"
                                value={city}
                                ref={cityRef}
                                onChange={(e) => handleCity(e)}
                                style={{
                                  fontSize: 16,
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 40,
                                  borderRadius: 8,
                                }}
                              />
                            </Form.Group>
                            {cityError && (
                              <div style={{ color: "red" }}>
                                <MdError
                                  style={{ fontSize: "13px", marginRight: "5px", marginBottom: "1px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {cityError}{" "}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlInput5"
                            >
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

                              </Form.Label>

                              <Select
                                options={indianStates}
                                ref={stateRef}
                                onChange={(selectedOption) => {
                                  setStateName(selectedOption?.value);
                                }}
                                onInputChange={(inputValue, { action }) => {
                                  if (action === "input-change") {
                                    const lettersOnly = inputValue.replace(
                                      /[^a-zA-Z\s]/g,
                                      ""
                                    );
                                    return lettersOnly;
                                  }
                                  return inputValue;
                                }}
                                value={
                                  state_name
                                    ? { value: state_name, label: state_name }
                                    : null
                                }
                                placeholder="Select State"
                                classNamePrefix="custom"
                                menuPlacement="auto"
                                noOptionsMessage={() => "No state available"}
                                styles={{
                                  control: (base) => ({
                                    ...base,
                                    height: "40px",
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
                                    fontFamily: "Gilroy",
                                  }),
                                  menuList: (base) => ({
                                    ...base,
                                    backgroundColor: "#f8f9fa",
                                    maxHeight: "120px",
                                    padding: 0,
                                    scrollbarWidth: "thin",
                                    overflowY: "auto",
                                    fontFamily: "Gilroy",
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
                                    backgroundColor: state.isFocused
                                      ? "#f0f0f0"
                                      : "white",
                                    color: "#000",
                                  }),
                                }}
                              />
                            </Form.Group>

                            {!state_name && state_nameError && (
                              <div style={{ color: "red", marginTop: "-16px" }}>
                                <MdError
                                  style={{ fontSize: "13px", marginRight: "5px", marginBottom: "1px" }}
                                />
                                <span
                                  style={{
                                    fontSize: "12px",
                                    color: "red",
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                  }}
                                >
                                  {state_nameError}
                                </span>
                              </div>
                            )}
                          </div>



                          {state.createAccount?.networkError ?
                            <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                              <MdError style={{ color: "red", marginRight: '5px' }} />
                              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                            </div>
                            : null}

                        </div>
                        {phonenumError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginBottom: "2px" }}
                            />
                            <span
                              style={{
                                fontSize: "12px",
                                color: "red",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                marginRight: "3px"
                              }}
                            >
                              {" "}
                              {phonenumError}
                            </span>
                          </div>
                        )}
                        {emailIdError && (
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
                              {emailIdError}
                            </span>
                          </div>
                        )}
                        <div className="d-flex justify-content-end mt-3">
                          <Button style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "white",
                            color: "#1E45E1",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "12px",
                            marginBottom: "10px",
                            maxHeight: 45,
                            width: "146px",
                            whiteSpace: "nowrap",
                          }} onClick={handlePrevious}>Previous</Button>
                          <Button style={{
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
                            whiteSpace: "nowrap", marginLeft: 10, marginRight: 10
                          }} onClick={handleSaveUserlist}>Create Customer</Button>

                        </div>
                      </>
                    )}




                  </div>
                </div>
              </div>
            </div>
          </Modal.Body>
          {formLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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

        </Modal.Dialog>
      </Modal>

{/* advanceForm */}

      <Modal
        show={props.advanceForm}
        onHide={handleCloseAdvanceForm}
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

          <Modal.Header style={{ position: "relative" }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                fontFamily: "Gilroy",
              }}
            >
              Generate Advance
            </div>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleCloseAdvanceForm}
              style={{ cursor: "pointer" }}
            />
          </Modal.Header>
          <Modal.Body style={{ paddingTop: 2 }}>
            <div className="d-flex align-items-center">
              <div className="container">



                <div className="row mb-3">
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2" controlId="checkoutDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Invoice Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>

                      <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={advanceDate ? dayjs(advanceDate) : null}
                          onChange={(date) => {
                            setAdvanceDateError("");
                            setAdvanceDate(date ? date.toDate() : null);
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".datepicker-wrapper")
                          }
                          dropdownClassName="custom-datepicker-popup"
                          disabledDate={(current) => current && current > dayjs().endOf("day")}
                        />
                      </div>
                    </Form.Group>
                    {advanceDateError && (
                      <div style={{ color: "red", marginTop: "-7px" }}>
                        <MdError
                          style={{ fontSize: "13px", marginRight: "5px" }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {advanceDateError}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group className="mb-2" controlId="checkoutDate">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Due Date{" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>

                      <div
                        className="datepicker-wrapper"
                        style={{ position: "relative", width: "100%" }}
                      >
                        <DatePicker
                          style={{
                            width: "100%",
                            height: 48,
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }}
                          format="DD/MM/YYYY"
                          placeholder="DD/MM/YYYY"
                          value={advanceDueDate ? dayjs(advanceDueDate) : null}
                          onChange={(date) => {
                            setAdvanceDueDateError("");
                            setAdvanceDueDate(date ? date.toDate() : null);
                          }}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.closest(".datepicker-wrapper")
                          }
                          dropdownClassName="custom-datepicker-popup"
                        />
                      </div>
                    </Form.Group>
                    {advanceDueDateError && (
                      <div style={{ color: "red", marginTop: "-7px" }}>
                        <MdError
                          style={{ fontSize: "13px", marginRight: "5px" }}
                        />
                        <span
                          style={{
                            fontSize: "12px",
                            color: "red",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {advanceDueDateError}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="row col-md-12 col-lg-12">
                  <div className="col-md-6 col-lg-6">
                    <Button
                      variant="secondary"
                      className="w-100"
                      style={{
                        height: 45,
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 500,
                        fontFamily: "Montserrat",
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                    // onClick={handleSaveUserlistAddUserButon}
                    //                          onClick={() => {
                    //   if (props.BookingAssignForm) {
                    //     handleSaveBookingCancel();
                    //   } else {
                    //     handleSaveUserlistAddUserButon();
                    //   }
                    // }}
                    >
                      Cancel
                    </Button>
                  </div>

                  <div className="col-md-6 col-lg-6 mb-2">
                    <Button
                      variant="primary"
                      className="w-100"
                      style={{
                        backgroundColor: "#1E45E1",
                        height: 45,
                        borderRadius: 12,
                        fontSize: 15,
                        fontWeight: 600,
                        fontFamily: "Montserrat",
                        paddingLeft: 25,
                        paddingRight: 25,
                      }}
                    // onClick={handleSaveAdvance}
                    //                       onClick={() => {
                    //   if (props.BookingAssignForm) {
                    //     handleSaveBookingAdvance();
                    //   } else {
                    //     handleSaveAdvance();
                    //   }
                    // }}
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>

            </div>
          </Modal.Body>
          {loading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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


        </Modal.Dialog>
      </Modal>


{/* BACK TO CHECK IN */}

      <Modal
        show={props.bactocheckinForm}
        onHide={handleCloseBacktoCheckin}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 950,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body >
            <div>

              <div >
                <Modal.Header className="pt-0"
                  style={{ position: "relative", marginTop: "", border: "none" }}
                >
                  <div
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      fontFamily: "Gilroy",
                    }}
                  >
                    Back to Check-In
                  </div>

                  <CloseCircle
                    size="24"
                    color="#000"
                    onClick={handleCloseBacktoCheckin}
                    style={{ cursor: "pointer" }}
                  />
                </Modal.Header>


                <div className="d-flex align-items-center gap-3 mb-3 ms-3">
                  <img
                    src={Profileimage}
                    alt="Profile"
                    className="rounded-circle"
                    width="35"
                    height="35"
                  />
                  <div>
                    <p className="mb-1" style={{ fontWeight: 600, fontSize: "15px", marginBottom: "6px" }}>
                      {props.EditObj?.Name}
                    </p>
                    <div className="d-flex gap-2">
                      <span
                        style={{
                          backgroundColor: "#FFF3CD",
                          color: "#856404",
                          fontSize: "12px",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {bookingFlooorId}
                      </span>
                      <span
                        style={{
                          backgroundColor: "#F8D7DA",
                          color: "#721C24",
                          fontSize: "12px",
                          padding: "2px 8px",
                          borderRadius: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {bookingRoomId} - {bookingBedId}
                      </span>
                    </div>
                  </div>
                </div>


                <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, width: "100%" }} className="mt-1 p-1">
                  <div style={{ display: "flex", gap: "10px", justifyContent: "space-between", width: "100%" }}>
                    <button
                      onClick={() => setActiveTab("long")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "long" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "long" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Long Stay
                    </button>
                    <button
                      onClick={() => setActiveTab("short")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "short" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "short" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Short Stay
                    </button>
                  </div>

                </div>

                {activeTab === "long" ? <>
                  <div style={{ maxHeight: "320px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                    <div className="row d-flex align-items-center">
                      <div className="col-12">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            paddingTop: "6px",
                          }}
                        >
                          Floor  {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          isDisabled={true}
                          value={
                            selectedFloor
                              ? { value: selectedFloor.floor_id, label: selectedFloor.floor_name }
                              : null
                          }
                          onChange={(option) => setFloor(option?.value || "")}
                          options={state.UsersList?.hosteldetailslist?.map((option) => ({
                            value: option.floor_id,
                            label: option.floor_name,
                          }))}
                          placeholder="Select a Floor"
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
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
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
                              cursor: "pointer",
                            }),
                            indicatorSeparator: () => ({
                              display: "none",
                            }),
                            option: (base, state) => ({
                              ...base,
                              cursor: "pointer",
                              backgroundColor: state.isFocused ? "#dd2525ff" : "white",
                              color: "#000",
                            }),
                          }}
                        />

                        {floorError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {floorError}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="col-12 mb-1">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Room {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          isDisabled={true}
                          options={
                            state.PgList?.roomsList?.map((item) => ({
                              value: item.id,
                              label: item.name,
                            })) || []
                          }
                          onChange={(selectedOption) => handleRooms(selectedOption?.value)}
                          value={
                            selectedRoom
                              ? { value: selectedRoom.id, label: selectedRoom.name }
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
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
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

                        {roomError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {roomError}
                            </label>
                          </div>
                        )}
                      </div>

                      {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Group>
                          <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                            Booking Amount
                            <span style={{ color: "red", fontSize: "20px" }}> *</span>
                          </Form.Label>
                          <FormControl
                            type="text"
                            placeholder="Enter Amount"
value={bookingAmount}
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

                      </div> */}


                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Label
                          style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                          }}
                        >
                          Bed {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>
                        <FormControl
                          type="text"
                          id="form-controls"
                          placeholder="6542310"
                          value={recheckinbedname}
                          isDisabled
                          style={{
                            fontSize: 16,
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                            border: "1px solid #D9D9D9",
                            height: 50,
                            borderRadius: 8,
                            backgroundColor: "#f8f9fa",
                          }}
                        />

                        {/* <Select
   isDisabled={true}
  options={bedOptions.map((item) => ({
    value: item.id,
    label: item.bed_no
  }))}
  onChange={handleBed}
  value={
    bedId
      ? { value: bedId, label: selectedBedName }
      : null
  }
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
                            }),
                            menu: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              border: "1px solid #ced4da",
                              fontFamily: "Gilroy",
                            }),
                            menuList: (base) => ({
                              ...base,
                              backgroundColor: "#f8f9fa",
                              maxHeight: "120px",
                              padding: 0,
                              scrollbarWidth: "thin",
                              overflowY: "auto",
                              fontFamily: "Gilroy",
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
                        /> */}


                      </div>

                      {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Group controlId="bookingDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Booking Date{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </Form.Label>

                          <div
                            className="datepicker-wrapper"
                            style={{ position: "relative", width: "100%" }}
                          >
                            <DatePicker
                              style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy"
                              }}
                              format="DD/MM/YYYY"
                              placeholder="DD/MM/YYYY"
                              value={bookingDate ? dayjs(bookingDate) : null}
                              onChange={(date) => {
                                setDateError("");
                                setBookingDate(date ? date.toDate() : null);
                                dispatch(JoininDatecustomer(date ? date.toDate() : null));
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
                              disabledDate={(current) => current && current > dayjs().endOf("day")}
                              suffixIcon={null} // Removes calendar icon
                            />
                          </div>
                        </Form.Group>

                        {dateError && (
                          <div className="d-flex align-items-center mt-1">
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px", color: "red" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {dateError}
                            </label>
                          </div>
                        )}
                      </div> */}




                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                        <Form.Group controlId="purchaseDate">
                          <Form.Label
                            style={{
                              fontSize: 14,
                              color: "#222222",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            Joining Date{" "}
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
                          </Form.Label>

                          <div
                            className="datepicker-wrapper"
                            style={{ position: "relative", width: "100%" }}
                          >
                            <DatePicker
                              style={{
                                width: "100%",
                                height: 48,
                                cursor: "pointer",
                                fontFamily: "Gilroy"
                              }}
                              format="DD/MM/YYYY"
                              disabled
                              placeholder="DD/MM/YYYY"
                              value={selectedDate ? dayjs(selectedDate) : null}
                              onChange={(date) => {
                                setDateError("");
                                setSelectedDate(date ? date.toDate() : null);
                                setJoingDateErrmsg('')

                                dispatch(JoininDatecustomer(date ? date.toDate() : null));
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
                              disabledDate={(current) => current && current > dayjs().endOf("day")}
                            />
                          </div>
                        </Form.Group>

                        {dateError && (
                          <div style={{ color: "red", marginTop: "-px" }}>
                            <MdError
                              style={{ fontSize: "13px", marginRight: "5px" }}
                            />
                            <label
                              className="mb-0"
                              style={{
                                color: "red",
                                fontSize: "12px",
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                              }}
                            >
                              {dateError}
                            </label>
                          </div>
                        )}

                        {joiningDateErrmsg.trim() !== "" && (
                          <div className="d-flex align-items-center">
                            <MdError style={{ color: "red", marginRight: "5px", fontSize: "13px", marginBottom: "2px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                              {joiningDateErrmsg}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="row align-items-end ms-1 me-1" style={{ paddingRight: 5, paddingLeft: 0 }}>


                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                          <Form.Group>
                            <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                              Advance Amount
                              <span style={{ color: "red", fontSize: "20px" }}> *</span>
                            </Form.Label>
                            <FormControl
                              disabled
                              type="text"
                              placeholder="Enter Amount"
                              value={AdvanceAmount}
                              // onChange={handleAdvanceAmount}
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
                              <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                              <label
                                className="mb-0"
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                }}
                              >
                                {advanceAmountError}
                              </label>
                            </div>
                          )}
                        </div>


                        <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                          <Form.Group>
                            <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                              Rental Amount
                              <span style={{ color: "red", fontSize: "20px" }}> *</span>
                            </Form.Label>
                            <FormControl
                              disabled
                              type="text"
                              placeholder="Enter Amount"
                              value={RoomRent}
                              onChange={handleRoomRent}
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
                            <div className="d-flex align-items-center justify-content-start" style={{ color: "red" }}>
                              <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                              <label
                                className="mb-0"
                                style={{
                                  color: "red",
                                  fontSize: "12px",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                }}
                              >
                                {roomrentError}
                              </label>
                            </div>
                          )}
                        </div>




                      </div>


                    </div>

                    <div style={{
                      backgroundColor: "#F7F9FF",
                      borderRadius: 10,
                      paddingBottom: 5,
                      pointerEvents: "none", // blocks all clicks inside
                      opacity: 0.6, // visual effect for disabled
                    }} className="mt-3 mb-3">

                      <div className="d-flex justify-content-between align-items-center p-4">
                        <div>
                          <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                        </div>
                        <div>
                          <Button
                            onClick={handleAddField}
                            style={{
                              fontFamily: "Gilroy",
                              fontSize: "14px",
                              backgroundColor: "#1E45E1",
                              color: "white",
                              fontWeight: 600,
                              borderRadius: "10px",
                              padding: "6px 15px",
                              marginBottom: "10px",
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <img
                              src={addcircle}
                              alt="Assign Bed"
                              style={{
                                height: 16,
                                width: 16,
                                filter: "brightness(0) invert(1)",
                              }}
                            />
                            Add
                          </Button>

                        </div>
                      </div>


                      {fields.map((item, index) => {
                        const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");

                        const filteredOptions = reasonOptions.map((opt) => {
                          if (opt.value === "maintenance") {
                            return {
                              ...opt,
                              isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                            };
                          }
                          return opt;
                        });

                        return (
                          <div className="row px-4 mb-3" key={index}>
                            <div className="col-md-6">


                              {!item.showInput ? (
                                <Select
                                  options={filteredOptions}
                                  value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                  onChange={(selectedOption) => {
                                    const selectedValue = selectedOption.value;

                                    if (selectedValue === "others") {
                                      handleInputChange(index, "reason", "others");
                                    } else {
                                      handleInputChange(index, "reason", selectedValue);
                                    }
                                  }}
                                  isDisabled={item.reason === "maintenance"}
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
                                    }),
                                    menu: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      border: "1px solid #ced4da",
                                      fontFamily: "Gilroy",
                                    }),
                                    menuList: (base) => ({
                                      ...base,
                                      backgroundColor: "#f8f9fa",
                                      maxHeight: "120px",
                                      padding: 0,
                                      scrollbarWidth: "thin",
                                      overflowY: "auto",
                                      fontFamily: "Gilroy",
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
                                      cursor: "pointer",
                                    }),
                                    indicatorSeparator: () => ({
                                      display: "none",
                                    }),
                                    option: (base, state) => ({
                                      ...base,
                                      cursor: state.isDisabled ? "not-allowed" : "pointer",
                                      backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                      color: state.isDisabled ? "#aaa" : "#000",
                                    }),
                                  }}
                                />
                              ) : (
                                <>
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter custom reason"
                                    value={item.customReason}
                                    onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
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
                                </>
                              )}
                              {errors[index]?.reason && (
                                <div className="d-flex align-items-center mt-1">
                                  <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {errors[index]?.reason}
                                  </label>
                                </div>
                              )}
                            </div>


                            <div className="col-md-5 position-relative">
                              <input
                                type="text"
                                placeholder="Enter amount"
                                value={item.amount}
                                onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                className="form-control"
                                style={{
                                  fontSize: 16,
                                  color: "#4B4B4B",
                                  fontFamily: "Gilroy",
                                  fontWeight: 500,
                                  boxShadow: "none",
                                  border: "1px solid #D9D9D9",
                                  height: 50,
                                  borderRadius: 8,
                                  paddingRight: 35,
                                }}
                              />


                              <button
                                type="button"
                                onClick={() => handleRemoveField(index)}
                                style={{
                                  position: "absolute",
                                  right: 10,
                                  top: "10%",
                                  transform: "translateY(-50%)",
                                  background: "#F0F0F0",
                                  border: "1px solid #C1C1C1",
                                  borderRadius: "50%",
                                  width: 20,
                                  height: 20,
                                  padding: 0,
                                  fontSize: 12,
                                  lineHeight: 1,
                                  textAlign: "center",
                                  color: "#333",
                                }}
                              >
                                ×
                              </button>


                              {errors[index]?.amount && (
                                <div className="d-flex align-items-center mt-1">
                                  <MdError
                                    style={{ color: "red", marginRight: "5px", fontSize: "14px" }}
                                  />
                                  <label
                                    className="mb-0"
                                    style={{
                                      color: "red",
                                      fontSize: "12px",
                                      fontFamily: "Gilroy",
                                      fontWeight: 500,
                                    }}
                                  >
                                    {errors[index]?.amount}
                                  </label>
                                </div>
                              )}
                            </div>




                          </div>
                        );
                      })}




                    </div>



                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                      <Form.Group>
                        <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                          Reason(Comments) {" "}
                          <span style={{ color: "red", fontSize: "20px" }}> *</span>
                        </Form.Label>
                        <FormControl
                          ref={reasonRef}
                          type="text"
                          placeholder="Enter Comments"
                          value={reason}
                          onChange={handleRecheckin}
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
                      {reasonError && (
                        <div style={{ color: "red" }} >
                          <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                          <label
                            className="mb-0"
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            {reasonError}
                          </label>
                        </div>
                      )}
                    </div>



                    <div className="datepicker-wrapper relative z-10">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          paddingTop: "6px",
                        }}
                      >
                        Re Check-In Date {" "}
                        <span style={{ color: "red", fontSize: "20px" }}>
                          *
                        </span>
                      </Form.Label>

                      {/* <DatePicker
                       ref={dateRef}
                        style={{
                          width: "100%",
                          height: 48,
                          cursor: "pointer",
                          fontFamily: "Gilroy"
                        }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={recheckInDate ? dayjs(recheckInDate) : null}
                        onChange={(date) => {
                        
                          setRecheckInDate(date ? date.toDate() : null);
                          setRecheckinDateError("")
                        }}
                        getPopupContainer={(triggerNode) =>
                          triggerNode.closest(".datepicker-wrapper") || document.body
                        }
                        dropdownClassName="custom-datepicker-popup"
                        disabledDate={(current) => current && current > dayjs().endOf("day")}
                      /> */}

                      <DatePicker
                        ref={dateRef}
                        style={{
                          width: "100%",
                          height: 48,
                          cursor: "pointer",
                          fontFamily: "Gilroy"
                        }}
                        format="DD/MM/YYYY"
                        placeholder="DD/MM/YYYY"
                        value={recheckInDate ? dayjs(recheckInDate) : null}
                        onChange={(date) => {
                          setRecheckInDate(date ? date.toDate() : null);
                          setRecheckinDateError("");
                        }}
                        getPopupContainer={(triggerNode) =>
                          triggerNode.closest(".datepicker-wrapper") || document.body
                        }
                        dropdownClassName="custom-datepicker-popup"
                        disabledDate={(current) => {
                          if (!RequestDate) {
                            return current && current > dayjs().endOf("day");
                          }
                          return current && current < dayjs(RequestDate).startOf("day");
                        }}
                      />


                      {recheckinDateError && (
                        <div style={{ color: "red" }} >
                          <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                          <label
                            className="mb-0"
                            style={{
                              color: "red",
                              fontSize: "12px",
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                            }}
                          >
                            {recheckinDateError}
                          </label>
                        </div>
                      )}
                    </div>





                  </div>

                  {state.createAccount?.networkError ?
                    <div className='d-flex  align-items-center justify-content-center mt-1 mb-1'>
                      <MdError style={{ color: "red", marginRight: '5px' }} />
                      <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                    </div>
                    : null}


                  {formLoading && <div
                    style={{
                      position: 'absolute',
                      top: 100,
                      right: 0,
                      bottom: 0,
                      left: 0,
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


                  <div style={{ display: "flex", gap: "16px", alignItems: "center", marginTop: 10, justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#333",
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Montserrat",
                        cursor: "pointer",
                      }}
                      onClick={handleCloseBacktoCheckin}
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      style={{
                        backgroundColor: "#1E45E1",
                        color: "#fff",
                        fontWeight: 600,
                        height: 40,
                        borderRadius: 8,
                        fontSize: 14,
                        fontFamily: "Montserrat",
                        padding: "0 24px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={handleSaveBacktoCheckin}
                    >
                      Check-In
                    </button>
                  </div>

                </>

                  :



                  activeTab === "short" && (
                    <div
                      style={{
                        height: "400px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f2f6fc",
                        borderRadius: "10px",
                        marginTop: "20px",
                        marginRight: "0",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                        border: "1px dashed #b0c4de",
                      }}
                    >
                      <div style={{ textAlign: "center" }}>
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/4076/4076549.png"
                          alt="Coming Soon"
                          width="80"
                          height="80"
                          style={{ marginBottom: "15px", opacity: 0.7 }}
                        />

                        <p style={{ color: "#7a7a7a", fontSize: "14px", fontFamily: "Gilroy" }}>Coming Soon. Stay tuned!</p>
                      </div>
                    </div>

                  )



                }






              </div>

            </div>
          </Modal.Body>


          {formLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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


          {loading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
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


        </Modal.Dialog>
      </Modal>


    </div>
  );
}

UserlistForm.propTypes = {
  EditObj: PropTypes.func.isRequired,
  setRoomDetail: PropTypes.func.isRequired,
  setUserClicked: PropTypes.func.isRequired,
  setShowMenu: PropTypes.func.isRequired,
  setShowForm: PropTypes.func.isRequired,
  OnShowTable: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  AfterEditFloors: PropTypes.func.isRequired,
  AfterEditRoomses: PropTypes.func.isRequired,
  AfterEditBeds: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
  displayDetail: PropTypes.func.isRequired,
  showMenu: PropTypes.func.isRequired,
  advanceForm: PropTypes.func.isRequired,
  setAdvanceForm: PropTypes.func.isRequired,
  setShowAssignMenu: PropTypes.func.isRequired,
  showAssignMenu: PropTypes.func.isRequired,
  bactocheckinForm: PropTypes.func.isRequired,
  setBacktoCheckInForm: PropTypes.func.isRequired,
  BookingAssignForm: PropTypes.func.isRequired,
  setBookingAssignForm: PropTypes.func.isRequired,
  customer_details: PropTypes.func.isRequired,
  recheckin: PropTypes.func.isRequired,
  handleCloseBed: PropTypes.func.isRequired,
};
export default UserlistForm;
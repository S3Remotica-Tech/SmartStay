/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "../Pages/UserList.css";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../Assets/Images/New_images/add-circle.png";
import imageCompression from "browser-image-compression";
import Image from "react-bootstrap/Image";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";

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
  const [hostelIdError, setHostelIdError] = useState("");
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


  const firstnameRef = useRef(null);
  const phoneRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);








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

  useEffect(() => {
    dispatch({
      type: "HOSTELDETAILLIST",
      payload: { hostel_Id: state.login.selectedHostel_Id },
    });
  }, [hostel_Id]);

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
      setPhoneError("Invalid Mobile Number");
    } else if (input.length === 10) {
      setPhoneError("");
    }

    setPhoneErrorMessage("");
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
      setEmailError("Invalid Email Id");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  useEffect(() => {
    const selectedHostel =
      state.UsersList.hostelListNewDetails.data &&
      state.UsersList.hostelListNewDetails.data?.filter(
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
          setfloorError("Floor is Required");
          break;
        case "Rooms":
          setRoomError("Room is Required");
          break;
        case "Bed":
          setBedError("Bed is Required");
          break;
        case "selectedDate":
          setDateError("Joning Date is Required");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Advance Amount is Required");
          break;
        case "RoomRent":
          setRoomRentError("Rental Amount is Required");
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
    setfloorError("");
  };

  const handleRooms = (selectedValue) => {
    setRooms(selectedValue);

    dispatch({
      type: "BEDNUMBERDETAILS",
      payload: {
        hostel_id: state.login.selectedHostel_Id,
        floor_id: Floor,
        room_id: selectedValue,
      },
    });

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
    setJoingDateErrmsg("")
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
    props.setShowMenu(false);
    props.setShowForm(false);
    props.OnShowTable(true);
    if (props.edit === "Edit") {
      props.OnShowTable(true);
    } else {
      props.setRoomDetail(false);
    }
  };

    
    

  useEffect(() => {
    if (props.EditObj && props.EditObj.ID) {
      props.setEdit("Edit");
      setId(props.EditObj.ID);
      if (props.EditObj.profile === 0) setFile(null);
      else {
        setFile(props.EditObj.profile);
      }

      let value = props.EditObj.Name.split(" ");
      setFirstname(value[0]);
      setLastname(value[1]);
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
      props.setEdit("Add");
    }
  }, []);

  const MobileNumber = `${countryCode}${Phone}`;

  const validateField = (value, fieldName, ref, setError, focusedRef) => {
    const trimmedValue = String(value).trim();
    if (!trimmedValue) {
      switch (fieldName) {
        case "First Name":
          setError("First Name is Required");
          break;
        case "Phone Number":
          setError("Phone Number is Required");
          break;
        case "Email":
          setError("Email is Required");
          break;
        case "Hostel ID":
          setError("Please select a Valid PG");
          break;
        case "City":
          setError("Please Enter City");
          break;
        case "Pincode":
          setError("Please Enter Pincode");
          break;
        case "Statename":
          setError("Please Select State");
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




  const handleSaveUserlist = () => {
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    let hasError = false;
    const focusedRef = { current: false };

    if (!validateField(firstname, "First Name", firstnameRef, setFirstnameError, focusedRef)) hasError = true;
    if (!validateField(Phone, "Phone Number", phoneRef, setPhoneError, focusedRef)) hasError = true;
    if (!validateField(pincode, "Pincode", pincodeRef, setPincodeError, focusedRef)) hasError = true;
    if (!validateField(city, "City", cityRef, setCityError, focusedRef)) hasError = true;
    if (!validateField(state_name, "Statename", stateRef, setStateNameError, focusedRef)) hasError = true;

    if (hostel_Id === "Select a PG" || hostelIdError) {
      setHostelIdError("Please select a Valid PG");
      hasError = true;
    }
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
    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const capitalizedFirstname = capitalizeFirstLetter(firstname);
    const capitalizedLastname = capitalizeFirstLetter(lastname);
    const payload = {
      profile: file,
      firstname: capitalizedFirstname,
      lastname: capitalizedLastname,
      Phone: MobileNumber,
      Email: Email,
      AadharNo: AadharNo,
      PancardNo: PancardNo,
      licence: licence,
      HostelName: HostelName,
      hostel_Id: hostel_Id,
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
      Address: house_no,
      area: street,
      landmark: landmark,
      city: city,
      pincode: pincode,
      state: state_name,
    };

    if (props.edit === "Edit") {
      payload.ID = id;
    }

    dispatch({
      type: "ADDUSER",
      payload: payload,
    });
    setFormLoading(true)
  };

  const handleAdvaceShowForm = () => {
    props.setShowMenu(false);
    props.setAdvanceForm(true);
  };

  useEffect(() => { }, [props.showMenu]);

  const handleSaveUserlistAddUser = async () => {
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
      setRoomRentError("Rental Amount is Required");
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
      setAdvanceAmountError("Advance Amount is Required");
      return;
    }
    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
      return;
    }


       if (selectedDate && props.EditObj.User_Id) {
      const selectedUser = state.UsersList.Users.find(item => item.User_Id === props.EditObj.User_Id);
      if (selectedUser) {
        const CreateDate = new Date(selectedUser.createdAt);
        const AssignDate = new Date(selectedDate);
        const CreaeteDateOnly = new Date(CreateDate.toDateString());
        const AssignDateOnly = new Date(AssignDate.toDateString());
        if (AssignDateOnly < CreaeteDateOnly) {
          setJoingDateErrmsg('Before Create Date Not Allowed');
         return
        } else {
          setJoingDateErrmsg('');
        }
      }
    }

    if (
      Floor !== "Selected Floor" &&
      Rooms !== "Selected Room" &&
      Bed !== "Selected Bed" &&
      selectedDate &&
      Number(AdvanceAmount) > 0 &&
      Number(RoomRent) > 0
    ) {
      handleAdvaceShowForm();
    }
    dispatch({ type: "INVOICELIST" });
  };

  const handleSaveUserlistAddUserButon = () => {
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
    if (!RoomRent && RoomRent !== 0) {
      setRoomRentError("Rental Amount is Required");
      return;
    }
    if (RoomRent <= 0) {
      setRoomRentError("Please Enter Valid Rental Amount");
      return;
    }
    if (!AdvanceAmount && AdvanceAmount !== 0) {
      setAdvanceAmountError("Advance Amount is Required");
      return;
    }

    if (AdvanceAmount <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
      return;
    }

       if (selectedDate && props.EditObj.User_Id) {
      const selectedUser = state.UsersList.Users.find(item => item.User_Id === props.EditObj.User_Id);
      if (selectedUser) {
        const CreateDate = new Date(selectedUser.createdAt);
        const AssignDate = new Date(selectedDate);
        const CreaeteDateOnly = new Date(CreateDate.toDateString());
        const AssignDateOnly = new Date(AssignDate.toDateString());
        if (AssignDateOnly <= CreaeteDateOnly) {
          setJoingDateErrmsg('Before Create Date Not Allowed');
         return
        } else {
          setJoingDateErrmsg('');
        }
      }
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
          isadvance: 0,
          ID: props.edit === "Edit" ? id : "",
        },
      });
      setLoading(true)


    }
    dispatch({ type: "INVOICELIST" });
  };

  const handleSaveAdvance = () => {
    let hasError = false;

    if (!advanceDate) {
      setAdvanceDateError("Invoice Date is required.");
      hasError = true;
    } else {
      setAdvanceDateError("");
    }

    if (!advanceDueDate) {
      setAdvanceDueDateError("Due Date is required.");
      hasError = true;
    } else {
      setAdvanceDueDateError("");
    }
           
    

      if (advanceDate && advanceDueDate && props.EditObj.User_Id) {
  const selectedUser = state.UsersList.Users.find(item => item.User_Id === props.EditObj.User_Id);

  if (selectedUser) {
    const CreateDate = dayjs(selectedUser.createdAt).startOf('day');
    const InvoiceDate = dayjs(advanceDate).startOf('day');
    const DueDate = dayjs(advanceDueDate).startOf('day');

    if (InvoiceDate.isBefore(CreateDate)) {
      setAdvanceDateError("Before Join Date Not Allowed");
      hasError = true;
    }

    if (DueDate.isBefore(CreateDate)) {
      setAdvanceDueDateError("Before Join Date Not Allowed");
      hasError = true;
    }
  }
}



    if (hasError) {
      return;
    }

    const incrementDateAndFormat = (date) => {
      const newDate = new Date(date);
      newDate.setDate(newDate.getDate() + 1);
      return newDate.toISOString().split("T")[0];
    };

    const formattedDate = selectedDate
      ? incrementDateAndFormat(selectedDate)
      : "";
    const formattedAdvanceDate = incrementDateAndFormat(advanceDate);
    const formattedAdvanceDateDue = incrementDateAndFormat(advanceDueDate);

    dispatch({
      type: "ADDUSER",
      payload: {
        profile: file,
        firstname: firstname,
        lastname: lastname,
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
        isadvance: 1,
        invoice_date: formattedAdvanceDate,
        due_date: formattedAdvanceDateDue,
        ID: props.edit === "Edit" ? id : "",
      },
    });
    setLoading(true)

    dispatch({ type: "INVOICELIST" });
  };

  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 200) {
      setFormLoading(false)
      setLoading(false)
      if (props.edit === "Edit") {
        props.setRoomDetail(true);
        props.OnShowTable(true);
      } else {
        props.setRoomDetail(false);
      }
      handleClose();
      handleCloseAdvanceForm();
    }
  }, [state.UsersList?.statusCodeForAddUser]);

  const handleCloseAdvanceForm = () => {
    props.setAdvanceForm(false);
    setAdvanceDate("");
    setAdvanceDueDate("");

  };

useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])





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
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body >
            <div className="d-flex align-items-center">
              {props.displayDetail ? (
                <div >
                  <Modal.Header style={{ position: "relative", paddingTop: 5 }}>
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        textAlign: "start",
                      }}
                    >
                      {props.edit === "Edit" ? "Edit Customer" : "Add Customer"}
                    </div>

                    <CloseCircle
                      size="24"
                      color="#000"
                      onClick={handleClose}
                      style={{ cursor: "pointer" }}
                    />
                  </Modal.Header>
                  <div style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-3">
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
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
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
                              height: 50,
                              borderRadius: 8,
                            }}
                          />
                        </Form.Group>
                        {firstnameError && (
                          <div style={{ color: "red", marginTop: "-15px" }}>
                            {" "}
                            <MdError
                              style={{ fontSize: "13px",  marginBottom: "2px" }}
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
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                              height: 50,
                              borderRadius: 8,
                            }}
                          />
                        </Form.Group>
                      </div>

                      <Form.Group
                        className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1"
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
                              height: 50,
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
                            marginTop: "-15px",
                          }}
                        ></p>
                        {phoneError && (
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
                              {phoneError}
                            </span>
                          </div>
                        )}
                        {phonenumError && (
                          <div style={{ color: "red" }}>
                            <MdError
                              style={{ marginRight: "4px", fontSize: "13px" }}
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
                              style={{ marginRight: "4px", fontSize: "13px" }}
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
                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                              height: 50,
                              borderRadius: 8,
                            }}
                          />
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
                                {" "}
                                {emailError}
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
                                {emailErrorMessage}
                              </span>
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
                              height: 50,
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

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
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

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
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

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
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
                            <span style={{ color: "red", fontSize: "20px" }}>
                              *
                            </span>
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
                              height: 50,
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

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
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
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
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
                              height: 50,
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
                            <span style={{ color: "red", fontSize: "20px" }}>
                              {" "}
                              *{" "}
                            </span>
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
                      marginTop: 20,
                    }}
                    onClick={handleSaveUserlist}
                  >
                    Add Customer
                  </Button>
                </div>
              ) : (
                <div className="">
                  <Modal.Header
                    style={{ position: "relative", marginTop: "-20px" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Assign Bed
                    </div>

                    <CloseCircle
                      size="24"
                      color="#000"
                      onClick={handleClose}
                      style={{ cursor: "pointer" }}
                    />
                  </Modal.Header>
                  <div style={{ maxHeight: "400px", overflowY: "scroll" }} className="show-scroll p-2 mt-3 me-3">
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
                          Floor
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.UsersList?.hosteldetailslist?.map((u) => ({
                              value: u.floor_id,
                              label: u.floor_name,
                            })) || []
                          }
                          onChange={handleFloor}
                          value={
                            state.UsersList?.hosteldetailslist?.find(
                              (option) => option.floor_id === Floor
                            )
                              ? {
                                value: Floor,
                                label: state.UsersList.hosteldetailslist.find(
                                  (option) => option.floor_id === Floor
                                )?.floor_name,
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
                          Room{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.UsersList?.roomdetails?.map((item) => ({
                              value: item.Room_Id,
                              label: item.Room_Name,
                            })) || []
                          }
                          onChange={(selectedOption) =>
                            handleRooms(selectedOption?.value)
                          }
                          value={
                            state.UsersList?.roomdetails?.find(
                              (option) => option.Room_Id === Rooms
                            )
                              ? {
                                value: Rooms,
                                label: state.UsersList.roomdetails.find(
                                  (option) => option.Room_Id === Rooms
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
                          Bed{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          options={
                            state.UsersList?.bednumberdetails?.bed_details
                              ?.filter(
                                (item) =>
                                  item.bed_no !== "0" &&
                                  item.bed_no !== "undefined" &&
                                  item.bed_no !== "" &&
                                  item.bed_no !== "null"
                              )
                              ?.map((item) => ({
                                value: item.id,
                                label: item.bed_no,
                              })) || []
                          }
                          onChange={handleBed}
                          value={
                            state.UsersList?.bednumberdetails?.bed_details?.find(
                              (option) => option.id === Bed
                            )
                              ? {
                                value: Bed,
                                label:
                                  state.UsersList.bednumberdetails.bed_details.find(
                                    (option) => option.id === Bed
                                  )?.bed_no,
                              }
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
                              }}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
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
                            placeholder="Enter Amount"
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
                              {advanceAmountError}
                            </label>
                          </div>
                        )}
                      </div>

                      <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <Form.Group className="mb-1">
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
                            placeholder="Enter Amount"
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
                          <div
                            className="d-flex align-items-center justify-content-start"
                            style={{ color: "red" }}
                          >
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
                              {roomrentError}
                            </label>
                          </div>
                        )}
                      </div>
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
                </div>
              )}
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
          <Modal.Body style={{ marginTop: -30 }}>
            <div className="d-flex align-items-center">
              <div className="container">
                <div className="row mb-3"></div>

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
                  <div className="col-md-6 col-lg-6 mb-2">
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
                      onClick={handleSaveUserlistAddUserButon}
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
                      onClick={handleSaveAdvance}
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

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
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
};
export default UserlistForm;

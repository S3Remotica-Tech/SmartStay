/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Form,FormControl,} from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "../Pages/UserList.css";
import { useDispatch, useSelector } from "react-redux";
import { InputGroup} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../Assets/Images/New_images/add-circle.png";
import imageCompression from "browser-image-compression";
import Image from "react-bootstrap/Image";
import Profile from "../Assets/Images/New_images/profile-picture.png";
// import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "react-toastify/dist/ReactToastify.css";
import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import {CloseCircle} from "iconsax-react";



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
  // const [Address, setAddress] = useState("");
  const [Email, setEmail] = useState("");
  const [AadharNo, setAadharNo] = useState("");
  const [PancardNo, setPancardNo] = useState("");
  const [licence, setLicence] = useState("");
   const [house_no, setHouseNo] = useState("");
    const [street, setStreet] = useState("");
    const [landmark, setLandmark] = useState("");
    const [pincode, setPincode] = useState("");
    const [city, setCity] = useState("")
    const [state_name, setStateName] = useState("");
  // const [romnum, setRoomnum] = useState("");
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
  // const [addressError, setAddressError] = useState("");
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

  const countryCode = '91';


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

  // const handleCountryCodeChange = (e) => {
  //   setCountryCode(e.target.value);
  // };

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
  // const handleDate = (selectedDates) => {
  //   setSelectedDate(selectedDates[0]);
  //   setDateError("");
  // };

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
  // useEffect(() => {
  //   const Roomdetail = state.UsersList.Users.filter((item) => {
  //     return item.Hostel_Id == hostel_Id && item.Floor == Floor;
  //   });

  //   setRoomnum(Roomdetail);
  // }, [state.UsersList.Users]);

  const handleFirstName = (e) => {
const value = e.target.value
    const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
    setFirstname(value);
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
          setFirstnameError("First Name is Required");
          break;
        case "Phone Number":
          setPhoneError("Phone Number is Required");
          break;
        case "Email":
          setEmailError("Email is Required");
          break;
        // case "Address":
        //   setAddressError("Address is Required");
        //   break;
        case "Hostel ID":
          setHostelIdError("Hostel ID is Required");
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
    const value =  e.target.value;
    const pattern = /^[a-zA-Z\s]*$/;

    // Don't update value if user types anything other than letters or space
    if (!pattern.test(value)) {
      return;
    }
    setLastname(value);
  };

  // const handlePaidadvance = (e) => {
  //   setPaidAdvance(e.target.value);
  // };

  // useEffect(() => {
  //   dispatch({ type: "COUNTRYLIST" });
  // }, []);

  // const handlePaidrent = (e) => {
  //   const value = e.target.value;
  //   if (value <= payableamount) {
  //     setPaidrent(e.target.value);
  //   }
  // };

  // const handlePhone = (e) => {
  //   setPhone(e.target.value);
  //   const pattern = /^\d{1,10}$/;
  //   const isValidMobileNo = pattern.test(e.target.value);

  //   if (isValidMobileNo && e.target.value.length === 10) {
  //     setPhoneError("");
  //   } else {
  //     setPhoneError("Invalid mobile number *");
  //   }
  
  //   dispatch({ type: "CLEAR_PHONE_ERROR" });
  //   setPhoneErrorMessage("");
  // };
  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, ""); 
    setPhone(input);
  
    if (input.length === 0) {
      setPhoneError(""); 
    } else if (input.length < 10) {
      setPhoneError("Invalid Nobile Number");
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
      setEmailError("Invalid Email Id *");
    } else {
      setEmailError("");
      setEmailErrorMessage("");
    }
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  // const handleAddress = (e) => {
  //   setAddress(e.target.value);
  //   setAddressError("");
  // };

  // const handleIsActiveUser = (e) => {
  //   setIsActive(e.target.value);
  // };

  useEffect(() => {
    const selectedHostel = state.UsersList.hostelListNewDetails.data &&
      state.UsersList.hostelListNewDetails.data?.filter((item) => item.id === state.login.selectedHostel_Id);
    setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
    setHostel_Id(state.login.selectedHostel_Id);
  }, [])

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

  // const handleFloor = (e) => {
  //   setFloor(e.target.value);
  //   setRooms("");
  //   setBed("");
  //   setfloorError("");
  // };
  const handleFloor = (selectedOption) => {
    setFloor(selectedOption?.value || '');
    setRooms("");
    setBed("");
    setfloorError("");
  };
  // const handleRooms = (e) => {
  //   setRooms(e.target.value);
  //   dispatch({
  //     type: "BEDNUMBERDETAILS",
  //     payload: {
  //       hostel_id: state.login.selectedHostel_Id,
  //       floor_id: Floor,
  //       room_id: e.target.value,
  //     },
  //   });
  //   setRoomRent("");
  //   setRoomError("");
  // };
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
  const selectedBedId = selectedOption?.value || '';
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

  

  //  useEffect (()=>{

  //   const Bedfilter =state?.UsersList?.roomdetails && state.UsersList.roomdetails.filter ((u)=>  u.Hostel_Id == hostel_Id && u.Floor_Id == Floor  && u.Room_Id == Rooms  )

  //   const Roomamountfilter = Bedfilter&& Bedfilter.length > 0 && Bedfilter[0].bed_details.filter (amount => amount.id == Bed)

  //   if (Roomamountfilter.length !=0) {
  //   }
  //   setRoomRent(Roomamountfilter)
  //  },[hostel_Id,Floor,Rooms, Bed])

  const handleRoomRent = (e) => {
    // const value = e.target.value;
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return; 
    }
    setRoomRent(newAmount);
    setRoomRentError("");
  };

  // const handlePaymentType = (e) => {
  //   setPaymentType(e.target.value);
  // };

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
    setHouse_NoError("")
    // setFormError("");
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");

    
    // setFormError("");
  }

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
    // setFormError("");
  }

  // const handlePincode = (e) => {
  //   setPincode(e.target.value);
  //   setPincodeError("");
  //   // setFormError("");
  // }

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
  
    // setGeneralError("");
    // setIsChangedError("");
  };

  const handleCity = (e) => {
    setCity(e.target.value);
    setCityError("");
    // setFormError("");
  }

  // const handleStateChange = (e) => {
  //   setStateName(e.target.value);
  //   setStateNameError("");
  //   // setFormError("");
  // }

  // const handleAadharNo = (e) => {
  //   setAadharNo(e.target.value);
  // };
  // const handlePancardNo = (e) => {
  //   setPancardNo(e.target.value);
  // };
  // const handlelicence = (e) => {
  //   setLicence(e.target.value);
  // };

  const handleClose = () => {
    setFirstname("");
    setLastname("");
    // setAddress("");
    setAadharNo("");
    setPancardNo("");
    setLicence("");
    setPhone("");
    setEmail("");
    setHouseNo("")
    setStreet("")
    setCity("")
    setLandmark("")
    setPincode("")
    setStateName("")
    setStateNameError("");
    setPincodeError("");
    setCityError("");
    setLandmarkError("");
    setStreetError("");
    setHouse_NoError("");
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
    // setPhoneErrorMessage("");
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    props.setShowMenu(false);
    props.setShowForm(false);
    props.OnShowTable(true);
    if (props.edit === "Edit") {
      props.OnShowTable(true);
    } else {
      // props.setUserList(true);
      props.setRoomDetail(false);
    }
  };


  useEffect(() => {
    if (props.EditObj && props.EditObj.ID) {
      props.setEdit("Edit");
      // setBednum(props.EditObj);
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
    let hasError = false;
    if (!validateField(firstname, "First Name"));
    if (!validateField(Phone, "Phone Number"));
 
    // if (!validateField(Address, "Address"));
    if (!validateField(hostel_Id, "Hostel ID"));
    // if (!validateField(house_no, "Houseno"));
    // if (!validateField(street, "Street"));
    // if (!validateField(landmark, "Landmark"));
    if (!validateField(city, "City"));
    if (!validateField(pincode, "Pincode"));
    if (!validateField(state_name, "Statename"));

    if (hostel_Id === "Select a PG" || hostelIdError) {
      setHostelIdError("Please select a Valid PG");
      // return;
    }
    if (!Phone) {
      setPhoneError("Mobile Number is Required");
      hasError = true;
    }

    if (Phone.length !== 10) {
      setPhoneError("Please Enter Valid Mobile Number");
      hasError = true;
    } else {
      setPhoneError("");
      setPhoneErrorMessage("");
    }
  
    if (Email) {
      const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
      const isValidEmail = emailRegex.test(Email.toLowerCase());
      if (!isValidEmail) {
        setEmailError("Please Enter Valid Email ID");
        hasError = true;
      } else {
        setEmailError("");
      }
    } else {
      setEmailError(""); // No error shown if email is empty
    }

    // Final check — block saving if any error
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
      Address:house_no ,
      area : street,
      landmark : landmark,
      city : city,
      pincode : pincode,
      state:state_name,
    };

    if (props.edit === "Edit") {
      payload.ID = id;
    }

    dispatch({
      type: "ADDUSER",
      payload: payload,
    });

  
  };

  const handleSaveUserlistAddUser = () => {
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
          Address:house_no ,
          area : street,
          landmark : landmark,
          city : city,
          pincode : pincode,
          state:state_name,
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

 


  // const customDateInput = (props) => {
  //   return (
  //     <div className="date-input-container w-100" onClick={props.onClick} style={{ position: "relative" }}>
  //       <FormControl
  //         type="text"
  //         className='date_input'
  //         value={props.value || 'DD/MM/YYYY'}
  //         readOnly
  //         style={{
  //           border: "1px solid #D9D9D9",
  //           borderRadius: 8,
  //           padding: 9,
  //           fontSize: 14,
  //           fontFamily: "Gilroy",
  //           fontWeight: props.value ? 600 : 500,
  //           width: "100%",
  //           height: 50,
  //           boxSizing: "border-box",
  //           boxShadow: "none"
  //         }}
  //       />
  //       <img
  //         src={Calendars}
  //         style={{ height: 24, width: 24, marginLeft: 10, cursor: "pointer", position: "absolute", right: 10, top: "50%", transform: 'translateY(-50%)' }}
  //         alt="Calendar"
  //         onClick={props.onClick}
  //       />
  //     </div>
  //   );
  // };

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
          <Modal.Body>
            <div className="d-flex align-items-center">
              {props.displayDetail ? (
                <div>
                  <Modal.Header
                    style={{  position: "relative",paddingTop:5 }}
                  >
                    <div
                      style={{
                        fontSize: 18,
                        fontWeight: 600,
                        fontFamily: "Gilroy", textAlign: "start",

                      }}
                    >
                      {props.edit === "Edit"
                        ? "Edit Customer"
                        : "Add Customer"}
                    </div>
                    {/* <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleClose}
                      style={{
                        position: "absolute",
                        right: "10px",
                        marginTop: -15,
                        border: "1px solid black",
                        background: "transparent",
                        cursor: "pointer",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "25px",
                        height: "25px",
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
                    </button> */}
                    <CloseCircle size="24" color="#000" onClick={handleClose} 
            style={{ cursor: 'pointer' }}/>
                  </Modal.Header>

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
                          <MdError style={{fontSize: '13px',marginRight:"4px"}} />
                          <span style={{fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {firstnameError}</span>
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
                          {/* <span
                            style={{ color: "transparent", fontSize: "20px" }}
                          >
                            {" "}
                            *{" "}
                          </span> */}
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
                          {/* {state.UsersList?.countrycode?.country_codes?.map(
                            (item) => {
                              return (
                             
                                (
                                  <>
                                    <option value={countryCode}>
                                      +{item.country_code}
                                    </option>
                                  </>
                                )
                              );
                            }
                          )} */}
                          <option>{countryCode}</option>
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
                        style={{ color: "red", fontSize: 11, marginTop: "-15px" }}
                      ></p>
                      {phoneError && (
                        <div style={{ color: "red" }}>
                          <MdError style={{marginRight:"4px",fontSize: '13px',}}/>
                          <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {phoneError}</span>
                        </div>
                      )}
                      {phonenumError && (
                        <div style={{ color: "red" }}>
                          <MdError style={{marginRight:"4px",fontSize: '13px',}}/>
                          <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}> {phonenumError}</span>
                        </div>
                      )}
                      {phoneErrorMessage && (
                        <div style={{ color: "red" }}>
                          <MdError style={{marginRight:"4px",fontSize: '13px',}}/>
                          <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>  {phoneErrorMessage}</span>
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
                          {/* <span
                            style={{ color: "transparent", fontSize: "20px" }}
                          >
                            {" "}
                            *{" "}
                          </span> */}
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
                                   <div style={{ color: "red"}}>
                                     <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                     <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{house_noError}</span>
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
                                   <div style={{ color: "red"}}>
                                     <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                     <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{streetError}</span>
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
                                   <div style={{ color: "red"}}>
                                     <MdError style={{fontFamily: "Gilroy",fontSize: '13px',marginRight:"5px",marginBottom:"1px"}} />
                                     <span style={{ fontSize: '12px',  fontFamily: "Gilroy", fontWeight: 500 }}>{landmarkError}</span>
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
                                     <MdError style={{fontSize: '13px',marginRight:"5px"}} />
                                     <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{cityError} </span>
                                   </div>
                                 )}
                               </div>
                   
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
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
                                  <span style={{ color: "red", fontSize: "20px" }}> * </span>
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
                   


                    {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
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
                          placeholder="Enter Address"
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
                            <MdError style={{marginRight:"5px",fontSize:"12px"}}/>
                            <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{addressError}</span>
                          </div>
                        )}
                      </Form.Group>
                    </div> */}

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
                    style={{ position: "relative",marginTop:"-20px" }}
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
                    {/* <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleClose}
                      style={{
                        position: "absolute",
                        right: "10px",
                        // top: "16px",
                        border: "1px solid black",
                        background: "transparent",
                        cursor: "pointer",
                        padding: "0",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "25px",
                        height: "25px",
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
                    </button> */}
                    <CloseCircle size="24" color="#000" onClick={handleClose} 
            style={{ cursor: 'pointer' }}/>
                  </Modal.Header>

                  <div className="row">
                    <div className="col-12">
                      <Form.Label
                        style={{
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                          paddingTop:"6px"
                        }}
                      >
                        Floor
                        <span style={{ color: "red", fontSize: "20px" }}>
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
                        {state.UsersList?.hosteldetailslist?.map((u) => (
                          <option key={u.floor_id} value={u.floor_id}>
                            {u.floor_name}
                          </option>
                        ))}
                      </Form.Select> */}
                   


  <Select
    options={
      state.UsersList?.hosteldetailslist?.map((u) => ({
        value: u.floor_id,
        label: u.floor_name,
      })) || []
    }
    onChange= {handleFloor}
    value={
      state.UsersList?.hosteldetailslist?.find((option) => option.floor_id === Floor)
        ? { value: Floor, label: state.UsersList.hosteldetailslist.find((option) => option.floor_id === Floor)?.floor_name }
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
        cursor:"pointer"
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
  />


                      {floorError && (
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
                      </Form.Select> */}
                    
  <Select
    options={
      state.UsersList?.roomdetails?.map((item) => ({
        value: item.Room_Id,
        label: item.Room_Name,
      })) || []
    }
    onChange={(selectedOption) => handleRooms(selectedOption?.value)}
    value={
      state.UsersList?.roomdetails?.find((option) => option.Room_Id === Rooms)
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
        cursor:"pointer"
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
  />


                      {roomError && (
                        <div style={{ color: "red" }}>
                          <MdError style={{ fontSize: "13px", marginRight: "5px" }}/>
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
                      </Form.Select> */}

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
            label: state.UsersList.bednumberdetails.bed_details.find(
              (option) => option.id === Bed
            )?.bed_no,
          }
        : null
    }
    placeholder="Select a Bed"
    classNamePrefix="custom" // Prefix for custom styles
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
        maxHeight: "120px", // Scrollable dropdown
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
        cursor:"pointer"
      }),
      indicatorSeparator: () => ({
        display: "none",
      }),
    }}
  />


                      {bedError && (
                        <div style={{ color: "red" }}>
                          <MdError style={{ fontSize: "13px", marginRight: "5px" }}/>
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

                    <div className='col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2'>
                      <Form.Group controlId="purchaseDate">
                        <Form.Label style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>
                          Joining Date <span style={{ color: 'red', fontSize: '20px' }}>*</span>
                        </Form.Label>
           
    <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
  <DatePicker
    style={{ width: "100%", height: 48,cursor:"pointer" }}
    format="DD/MM/YYYY"
    placeholder="DD/MM/YYYY"
    value={selectedDate ? dayjs(selectedDate) : null}
    onChange={(date) => {
      setDateError('');
      setSelectedDate(date ? date.toDate() : null);
    }}
    getPopupContainer={(triggerNode) => triggerNode.closest('.datepicker-wrapper')}
   
  />
</div>
                      </Form.Group>

                      {dateError && (
                        <div style={{ color: "red",marginTop:"-px" }}>
                          <MdError  style={{ fontSize: "13px", marginRight: "5px" }}/>
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
                          <MdError  style={{ fontSize: "13px", marginRight: "5px" }}/>
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
                        <div className="d-flex align-items-center justify-content-start" style={{ color: "red" }}>
                          <MdError  style={{ fontSize: "13px", marginRight: "5px"}}/>
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

                  <Button
                    className="w-100"
                    style={{
                      backgroundColor: "#1E45E1",
                      fontWeight: 600,
                      height: 50,
                      borderRadius: 12,
                      fontSize: 16,
                      fontFamily: "Montserrat",
                      marginTop:10
                    }}
                    onClick={handleSaveUserlistAddUser}
                  >
                    Assign Bed
                  </Button>
                </div>
              )}
            </div>
          </Modal.Body>

          {/* <Modal.Footer style={{ border: "none" }}></Modal.Footer> */}
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
};
export default UserlistForm;

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, FormControl } from "react-bootstrap";
import React, { useState, useEffect, useRef } from "react";
import "./UserList.css";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
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
import Profileimage from "../../Assets/Images/New_images/profile-picture.png";
import ErrorMessage from '../../Components/ErrorMessage'




function UserlistForm(props) {
  const [id, setId] = useState("");
  const [file, setFile] = useState(null);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [recheckinbedname, setRecheckinbedName] = useState("")
  // const [Phone, setPhone] = useState("");
  // const [hostel_Id, setHostel_Id] = useState("");
  // const [HostelName, setHostelName] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [Bed, setBed] = useState("");
  const [RoomRent, setRoomRent] = useState("");
  // const [BalanceDue, setBalanceDue] = useState("");
  // const [PaymentType, setPaymentType] = useState("");
  const [AdvanceAmount, setAdvanceAmount] = useState("");
  // const [paid_advance, setPaidAdvance] = useState("");
  // const [paid_rent, setPaidrent] = useState("");
  // const [Email, setEmail] = useState("");
  // const [AadharNo, setAadharNo] = useState("");
  // const [PancardNo, setPancardNo] = useState("");
  // const [licence, setLicence] = useState("");
  // const [house_no, setHouseNo] = useState("");
  // const [street, setStreet] = useState("");
  // const [landmark, setLandmark] = useState("");
  // const [pincode, setPincode] = useState("");
  // const [city, setCity] = useState("");
  // const [state_name, setStateName] = useState("");
  // const [payableamount, setPayableamount] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [floorError, setfloorError] = useState("");
  const [roomError, setRoomError] = useState("");
  const [bedError, setBedError] = useState("");
  const [advanceAmountError, setAdvanceAmountError] = useState("");
  const [roomrentError, setRoomRentError] = useState("");

  // const [phonenumError, setphonenumError] = useState("");
  // const [emailIdError, setemailIdError] = useState("");
  // const [house_noError, setHouse_NoError] = useState("");
  // const [streetError, setStreetError] = useState("");
  // const [landmarkError, setLandmarkError] = useState("");
  // const [pincodeError, setPincodeError] = useState("");
  // const [cityError, setCityError] = useState("");
  // const [state_nameError, setStateNameError] = useState("");
  // const [emailErrorMessage, setEmailErrorMessage] = useState("");
  // const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
  const [formLoading, setFormLoading] = useState(false)

  const [loading, setLoading] = useState(false)
  // const countryCode = "91";
  const [errors, setErrors] = useState([]);
  const [reason, setReason] = useState("");
  const [recheckInDate, setRecheckInDate] = useState("");
  const [activeTab, setActiveTab] = useState("LONG");
  // const [floor_name, setFloorName] = useState("")
  // const [room_name, setRoomName] = useState("")
  // const [bed_name, setBedName] = useState("")
  // const firstnameRef = useRef(null);
  // const phoneRef = useRef(null);
  // const cityRef = useRef(null);
  // const pincodeRef = useRef(null);
  // const stateRef = useRef(null);


  const [availableBed, setAvailableBed] = useState('')
  const [bedWarning, setBedWarning] = useState('')


  const [fields, setFields] = useState([]);





  // const indianStates = [
  //   { value: "Tamil Nadu", label: "Tamil Nadu" },
  //   { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  //   { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  //   { value: "Assam", label: "Assam" },
  //   { value: "Bihar", label: "Bihar" },
  //   { value: "Chhattisgarh", label: "Chhattisgarh" },
  //   { value: "Goa", label: "Goa" },
  //   { value: "Gujarat", label: "Gujarat" },
  //   { value: "Haryana", label: "Haryana" },
  //   { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  //   { value: "Jharkhand", label: "Jharkhand" },
  //   { value: "Karnataka", label: "Karnataka" },
  //   { value: "Kerala", label: "Kerala" },
  //   { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  //   { value: "Maharashtra", label: "Maharashtra" },
  //   { value: "Manipur", label: "Manipur" },
  //   { value: "Meghalaya", label: "Meghalaya" },
  //   { value: "Mizoram", label: "Mizoram" },
  //   { value: "Nagaland", label: "Nagaland" },
  //   { value: "Odisha", label: "Odisha" },
  //   { value: "Punjab", label: "Punjab" },
  //   { value: "Rajasthan", label: "Rajasthan" },
  //   { value: "Sikkim", label: "Sikkim" },

  //   { value: "Telangana", label: "Telangana" },
  //   { value: "Tripura", label: "Tripura" },
  //   { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  //   { value: "Uttarakhand", label: "Uttarakhand" },
  //   { value: "West Bengal", label: "West Bengal" },
  //   {
  //     value: "Andaman and Nicobar Islands",
  //     label: "Andaman and Nicobar Islands",
  //   },
  //   { value: "Chandigarh", label: "Chandigarh" },
  //   {
  //     value: "Dadra and Nagar Haveli and Daman and Diu",
  //     label: "Dadra and Nagar Haveli and Daman and Diu",
  //   },
  //   { value: "Delhi", label: "Delhi" },
  //   { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  //   { value: "Ladakh", label: "Ladakh" },
  //   { value: "Lakshadweep", label: "Lakshadweep" },
  //   { value: "Puducherry", label: "Puducherry" },
  // ];

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const calendarRef = useRef(null);
  const [dateError, setDateError] = useState("");

  // const handleImageChange = async (event) => {
  //   const fileImage = event.target.files[0];
  //   if (fileImage) {
  //     setFile(fileImage)
  //   }
  // };


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




  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'ALLFLOORLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

    }
  }, []);

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

  // const handleFirstName = (e) => {
  //   const value = e.target.value;
  //   const pattern = /^[a-zA-Z\s]*$/;
  //   if (!pattern.test(value)) {
  //     return;
  //   }
  //   setFirstname(value);
  //   setFirstnameError("");
  // };

  // useEffect(() => {
  //   if (state.UsersList.phoneError) {
  //     setFormLoading(false)
  //     setLoading(false)
  //     setphonenumError(state.UsersList.phoneError);
  //   }
  // }, [state.UsersList.phoneError]);

  // useEffect(() => {
  //   if (state.UsersList.emailError) {
  //     setFormLoading(false)
  //     setLoading(false)
  //     setemailIdError(state.UsersList.emailError);
  //   }
  // }, [state.UsersList.emailError]);




  // const handleLastName = (e) => {
  //   const value = e.target.value;
  //   const pattern = /^[a-zA-Z\s]*$/;

  //   if (!pattern.test(value)) {
  //     return;
  //   }
  //   setLastname(value);
  // };

  // const handlePhone = (e) => {
  //   const input = e.target.value.replace(/\D/g, "");
  //   setPhone(input);

  //   if (input.length === 0) {
  //     setPhoneError("");
  //   } else if (input.length < 10) {
  //     setPhoneError("Please Enter Valid Mobile Number");
  //   } else if (input.length === 10) {
  //     setPhoneError("");
  //   }

  //   setPhoneErrorMessage("");
  //   setphonenumError("")
  //   dispatch({ type: "CLEAR_PHONE_ERROR" });
  // };

  // const handleEmail = (e) => {
  //   const emailValue = e.target.value.toLowerCase();
  //   setEmail(emailValue);

  //   const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.(com|org|net|in)$/;
  //   const isValidEmail = emailRegex.test(emailValue);
  //   if (!emailValue) {
  //     setEmailError("");
  //     setEmailErrorMessage("");
  //   } else if (!isValidEmail) {
  //     setEmailErrorMessage("");
  //     setEmailError("Please Enter  Valid Email Id");
  //   } else {
  //     setEmailError("");
  //     setEmailErrorMessage("");
  //   }
  //   dispatch({ type: "CLEAR_EMAIL_ERROR" });
  //   setemailIdError("")
  // };

  // useEffect(() => {
  //   const selectedHostel =
  //     state.UsersList.hostelList &&
  //     state.UsersList.hostelList?.filter(
  //       (item) => item.id === state.login.selectedHostel_Id
  //     );
  //   setHostelName(selectedHostel ? selectedHostel[0]?.Name : "");
  //   setHostel_Id(state.login.selectedHostel_Id);
  // }, []);



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
    setRooms(selectedValue);


    setRoomRent("");
    setRoomError("");
  };

 
  useEffect(() => {
      if (Rooms) {
        const filteredBed = state.UsersList?.availableBedList?.listBeds?.filter((view) => {
          return view.floorId === Floor && view.roomId === Rooms
        });
        setAvailableBed(filteredBed)
      }
  
    }, [Rooms, selectedDate,  state.UsersList?.availableBedList?.listBeds])

 


  const handleBed = (selectedOption) => {
    dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
    setBedWarning("");
    const selectedBedId = selectedOption?.value || "";
    setBed(selectedBedId);

    const selectedBed = state.UsersList?.availableBedList?.listBeds?.find(
      (bed) => String(bed.bedId) === String(selectedBedId)
    );

    if (selectedBed) {
      setRoomRent(selectedBed.rentAmount)
      if (selectedBed.showWarning) {
        setBedWarning(selectedBed.warningMessage);
      } else {
        setBedWarning("");
      }

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

  // const handleHouseNo = (e) => {
  //   setHouseNo(e.target.value);
  //   setHouse_NoError("");
  // };

  // const handleStreetName = (e) => {
  //   setStreet(e.target.value);
  //   setStreetError("");
  // };

  // const handleLandmark = (e) => {
  //   setLandmark(e.target.value);
  //   setLandmarkError("");
  // };

  // const handlePinCodeChange = (e) => {
  //   const value = e.target.value;
  //   if (!/^\d{0,6}$/.test(value)) {
  //     return;
  //   }

  //   setPincode(value);
  //   if (value.length > 0 && value.length < 6) {
  //     setPincodeError("Pin Code Must Be Exactly 6 Digits");
  //   } else {
  //     setPincodeError("");
  //   }
  // };

  // const handleCity = (e) => {

  //   const value = e.target.value;
  //   const regex = /^[a-zA-Z\s]*$/;
  //   if (regex.test(value)) {
  //     setCity(value);
  //     setCityError("");
  //   }
  // };

  const [advanceDate, setAdvanceDate] = useState(null);
  const [advanceDueDate, setAdvanceDueDate] = useState(null);
  const [advanceDateError, setAdvanceDateError] = useState("");
  const [advanceDueDateError, setAdvanceDueDateError] = useState("");

  // const handleClose = () => {
  //   setFirstname("");
  //   setLastname("");
  //   setAadharNo("");
  //   setPancardNo("");
  //   setLicence("");
  //   setPhone("");
  //   setEmail("");
  //   setHouseNo("");
  //   setStreet("");
  //   setCity("");
  //   setLandmark("");
  //   setPincode("");
  //   setStateName("");
  //   setStateNameError("");
  //   setPincodeError("");
  //   setCityError("");
  //   setLandmarkError("");
  //   setStreetError("");
  //   setHouse_NoError("");
  //   setFloor("");
  //   setRooms("");
  //   setBed("");
  //   setAdvanceAmount("");
  //   setRoomRent("");
  //   setPaymentType("");
  //   setBalanceDue("");
  //   setPaidAdvance("");
  //   setPaidrent("");
  //   setPayableamount("");
  //   dispatch({ type: "CLEAR_PHONE_ERROR" });
  //   dispatch({ type: "CLEAR_EMAIL_ERROR" });
  //   dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
  //   if (props?.setShowForm) props.setShowForm(false);
  //   if (props?.OnShowTable) props.OnShowTable(true);
  //   if (props?.edit === "Edit") {
  //     if (props?.OnShowTable) props.OnShowTable(true);
  //   } else {
  //     if (props?.setRoomDetail) props.setRoomDetail(false);
  //   }
  // };


  const handleCloseAssign = () => {
    dispatch({ type: 'REMOVE_BED_AVAILABLE_ERROR' })
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


  useEffect(() => {
    if (props.EditObj && props.EditObj.customerId) {
      // props?.setEdit("Edit");
      setId(props.EditObj.customerId);
      if (props.EditObj.profilePic === 0) setFile(null);
      else {
        setFile(props.EditObj.profilePic);
      }

      // let value = props.EditObj.Name.split(" ");
      setFirstname(props.EditObj?.firstName);
      setLastname("");
      // setHouseNo(props.EditObj.Address);
      // setStreet(props.EditObj.area);
      // setLandmark(props.EditObj.landmark);
      // setCity(props.EditObj.city);
      // setPincode(props.EditObj.pincode);
      // setStateName(props.EditObj.state);
      // setAadharNo(props.EditObj.AadharNo);
      // setPancardNo(props.EditObj.PancardNo);
      // setLicence(props.EditObj.licence);
      // setPhone(props.EditObj.Phone);
      // setEmail(props.EditObj.Email);
      // setHostelName(props.EditObj.HostelName);
      // setHostel_Id(props.EditObj.Hostel_Id);
      setRooms(props.EditObj.Rooms);
      // setPaymentType(props.EditObj.PaymentType);
      // setBalanceDue(props.EditObj.BalanceDue);
      // setPaidAdvance(props.EditObj.paid_advance);
    } else {
      // props?.setEdit("Add");
      if (typeof props.setEdit === "function") {
        props.setEdit("Add");
      }
    }
  }, [props.EditObj]);




  // const MobileNumber = `${Phone}`;

  // const validateField = (value, fieldName, ref, setError, focusedRef) => {
  //   const trimmedValue = String(value).trim();
  //   if (!trimmedValue) {
  //     switch (fieldName) {
  //       case "First Name":
  //         setError("Please Enter First Name");
  //         break;
  //       case "Phone Number":
  //         setError("Please Enter Phone Number");
  //         break;
  //       case "Email":
  //         setError("Please Enter Email Id");
  //         break;
  //       case "Hostel ID":
  //         setError("Please Select PG");
  //         break;

  //       default:
  //         break;
  //     }

  //     if (!focusedRef.current && ref?.current) {
  //       ref.current.focus();
  //       focusedRef.current = true;
  //     }
  //     return false;
  //   }

  //   setError("");
  //   return true;
  // };






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
        type: reason_name,
        amount: item.amount || "",
        // showInput: !!item.showInput
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


    // const capitalizeFirstLetter = (str) => {
    //   return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    // };

    // const capitalizedFirstname = capitalizeFirstLetter(firstname);

    // const capitalizedLastname = capitalizeFirstLetter(lastname);



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
          rentalAmount: RoomRent,
          stayType: activeTab,
          deductions: formattedReasons

        }
      })
      setFormLoading(true)



    }


  };


  


  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      // dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostel_id: state.login.selectedHostel_Id } });
      // dispatch({
      //   type: "BEDNUMBERDETAILS", payload: { hostelId: state.login.selectedHostel_Id }
      // });
    }
  }, [state.login.selectedHostel_Id]);



  // const handleSaveBookingAdvance = async () => {

  //   let hasReasonAmountError = false;
  //   let newErrors = [];



  //   if (RoomRent === "" || RoomRent === null || RoomRent === undefined) {
  //     setRoomRentError("Please Enter Rental Amount");
  //     return;
  //   }
  //   if (Number(RoomRent) <= 0) {
  //     setRoomRentError("Please Enter Valid Rental Amount");
  //     return;
  //   }

  //   if (
  //     AdvanceAmount === "" ||
  //     AdvanceAmount === null ||
  //     AdvanceAmount === undefined
  //   ) {
  //     setAdvanceAmountError("Please Enter Advance Amount");
  //     return;
  //   }
  //   if (Number(AdvanceAmount) <= 0) {
  //     setAdvanceAmountError("Please Enter Valid Advance Amount");
  //     return;
  //   }

  //   setErrors(newErrors)




  //   const incrementDateAndFormat = (date) => {
  //     const newDate = new Date(date);
  //     newDate.setDate(newDate.getDate());
  //     return newDate.toISOString().split("T")[0];
  //   };


  //   // const formattedDate = selectedDate
  //   //   ? incrementDateAndFormat(selectedDate)
  //   //   : "";
  //   // const invoiceDateObj = new Date(formattedDate);
  //   const formattedDate = selectedDate
  //     ? incrementDateAndFormat(selectedDate)
  //     : "";
  //   const invoiceDateObj = new Date(formattedDate);
  //   const dueDateObj = new Date(invoiceDateObj);
  //   dueDateObj.setDate(dueDateObj.getDate() + (state?.Settings?.SettingsBillsGetRecurring?.dueDateOfMonth || 0));

  //   const formattedAdvanceDueDate = dueDateObj.toISOString().split("T")[0];

  //   const capitalizeFirstLetter = (str) => {
  //     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  //   };

  //   const capitalizedFirstname = capitalizeFirstLetter(firstname);

  //   const capitalizedLastname = capitalizeFirstLetter(lastname);


  //   setErrors(newErrors)

  //   const formattedReasons = fields.map((item) => {
  //     let reason_name = "";

  //     if (item.reason?.toLowerCase() === "others" || item.reason_name?.toLowerCase() === "others") {
  //       reason_name = item.customReason || item["custom Reason"] || "";
  //     } else {
  //       reason_name = item.reason || item.reason_name || "";
  //     }

  //     const error = { reason: "", amount: "" };
  //     if (reason_name && (!item.amount || item.amount.toString().trim() === "")) {
  //       error.amount = "Please enter amount";
  //       hasReasonAmountError = true;
  //     }


  //     if ((!reason_name || reason_name.toString().trim() === "") && item.amount) {
  //       error.reason = "Please enter reason";
  //       hasReasonAmountError = true;
  //     }

  //     newErrors.push(error);
  //     return {
  //       reason_name,
  //       amount: item.amount || "",
  //       showInput: !!item.showInput
  //     };
  //   });


  //   if (hasReasonAmountError) return;

  //   if (

  //     Number(AdvanceAmount) > 0 &&
  //     Number(RoomRent) > 0
  //   ) {



  //     dispatch({
  //       type: "ADDUSER",
  //       payload: {
  //         profile: file,
  //         firstname: capitalizedFirstname,
  //         LastName: capitalizedLastname,
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
  //         Rooms: props.EditObj.booking_room_id,
  //         Bed: props.EditObj.booking_bed_id,
  //         joining_date: formattedDate,
  //         AdvanceAmount: AdvanceAmount,
  //         RoomRent: RoomRent,
  //         BalanceDue: BalanceDue,
  //         PaymentType: PaymentType,
  //         paid_advance: paid_advance,
  //         paid_rent: paid_rent,
  //         payable_rent: payableamount,
  //         isadvance: 1,
  //         invoice_date: formattedDate,
  //         due_date: formattedAdvanceDueDate,
  //         ID: props.EditObj.ID,
  //         reasons: formattedReasons,
  //         stay_type: activeTab === "LONG" ? "LONG" : "SHORT",
  //         booking_id: props.EditObj.booking_id,
  //         booking_date: bookingDate,
  //         booking_amount: props.EditObj.booking_amount

  //       },
  //     });
  //   }
  //   setFormLoading(true)
  //   dispatch({ type: "INVOICELIST" });
  // };







  // const [bookingDate, setBookingDate] = useState("")
  // const [bookingAmount, setBookingAmount] = useState("")
  const [bookingFlooorId, setBookingFloorId] = useState("")
  const [bookingRoomId, setBookingRoomId] = useState("")
  const [bookingBedId, setBookingBedId] = useState("")


 

  // const bookingDateRef = useRef("");

  useEffect(() => {
    if (props.BookingAssignForm) {
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
      // setHouseNo(props.EditObj.Address);
      // setStreet(props.EditObj.area);
      // setLandmark(props.EditObj.landmark);
      // setCity(props.EditObj.city);
      // setPincode(props.EditObj.pincode);
      // setStateName(props.EditObj.state);
      // setAadharNo(props.EditObj.AadharNo);
      // setPancardNo(props.EditObj.PancardNo);
      // setLicence(props.EditObj.licence);
      // setPhone(props.EditObj.Phone);
      // setEmail(props.EditObj.Email);
      // setHostelName(props.EditObj.HostelName);
      // setHostel_Id(props.EditObj.Hostel_Id);
      setRooms(props.EditObj.booking_room_id);
      setBed(props.EditObj.booking_bed_id)
      // setPaymentType(props.EditObj.PaymentType);
      // setBalanceDue(props.EditObj.BalanceDue);
      // setPaidAdvance(props.EditObj.paid_advance);
      setFloor(props.EditObj.booking_floor_id)
      setSelectedDate(props.EditObj.booking_joining_date)
      setBookingFloorId(props.EditObj.Booking_FloorName)
      setBookingRoomId(props.EditObj.booking_room_id)
      setBookingBedId(props.EditObj.booking_bed_id)
      // setFloorName(props?.EditObj?.Booking_FloorName)
      // setRoomName(props?.EditObj?.Booking_Rooms)
      // setBedName(props?.EditObj?.Booking_Bed)
      // setBookingAmount(props.EditObj.booking_amount)
      setFile(props.EditObj.profile)


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

      // if (props.EditObj?.booking_booking_date) {
      //   const dateObj = new Date(props.EditObj.booking_booking_date);

      //   const bookingDayjs = dayjs(dateObj);

      //   bookingDateRef.current = bookingDayjs;
      //   setBookingDate(bookingDayjs);
      // }


    }

  }, [props.BookingAssignForm]);
  // const disabledJoiningDate = (current) => {
  //   if (!bookingDate) return false;

  //   return (
  //     current.isBefore(bookingDate, "day") ||
  //     current.isAfter(dayjs(), "day")
  //   );
  // };







  useEffect(() => {
    if (state.UsersList?.statusCodeForAddUser === 201 || state.UsersList?.statusCodeForAddCustomerSaveInfo === 201) {
      setFormLoading(false)
      setLoading(false)
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

    if (field === "reason" || field === "customReason") {
         const cleanedValue = value.replace(/[^A-Za-z ]/g, "");

        if (field === "reason") {
            if (cleanedValue.toLowerCase() === "others") {
                updatedFields[index].showInput = true;
                updatedFields[index].reason_name = "others";
                updatedFields[index].customReason = "";
            } else {
                updatedFields[index].showInput = false;
                updatedFields[index].reason = cleanedValue;
                updatedFields[index].reason_name = cleanedValue;
                updatedFields[index].customReason = "";
            }
        } else if (field === "customReason") {
            updatedFields[index].customReason = cleanedValue;
        }

        if (updatedErrors[index]) updatedErrors[index].reason = "";
    } else if (field === "amount") {
            const numericValue = value.replace(/[^0-9]/g, "");
        updatedFields[index].amount = numericValue;

        if (updatedErrors[index]) updatedErrors[index].amount = "";
    }

    setFields(updatedFields);
    setErrors(updatedErrors);
};


  const handleJoiningDateChange = (date) => {
    setDateError("");
    setSelectedDate(date ? date.toDate() : null);
    setJoingDateErrmsg('')
    dispatch(JoininDatecustomer(date ? date.toDate() : null));
  }

  useEffect(() => {
  if (!selectedDate) {
    setSelectedDate(dayjs());
  }
}, []);


 useEffect(()=>{
    if(selectedDate){
      const formatDate = (date) => {
      if (!date) return "";
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, "0");
      const month = String(d.getMonth() + 1).padStart(2, "0");
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    };

    const joiningDateForFormatted = formatDate(selectedDate);
      dispatch({ type: 'AVAILBALEBEDDETAILS', payload:{ hostelId: state.login.selectedHostel_Id, joiningDate: joiningDateForFormatted}})
    }

  },[selectedDate])

 
  const handleCloseBacktoCheckin = () => {
    if (props?.setBacktoCheckInForm) props.setBacktoCheckInForm(false);
    if (props?.handleCloseBed) props.handleCloseBed();
  }




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
      // setHouseNo(props?.EditObj?.Address?.trim() || props?.customer_details?.Name?.trim());
      // setStreet(props?.EditObj?.area?.trim() || props?.customer_details?.area?.trim());
      // setLandmark(props?.EditObj?.landmark?.trim() || props?.customer_details?.landmark?.trim());
      // setCity(props?.EditObj?.city?.trim() || props?.customer_details?.city?.trim());
      // setPincode(props.EditObj?.pincode || props?.customer_details?.pincode);
      // setStateName(props.EditObj?.state || props?.customer_details?.state);
      // setAadharNo(props.EditObj?.AadharNo || props?.customer_details?.AadharNo);
      // setPancardNo(props.EditObj?.PancardNo || props?.customer_details?.PancardNo);
      // setLicence(props.EditObj?.licence || props?.customer_details?.licence);
      // setPhone(props.EditObj?.Phone || props?.customer_details?.Phone);
      // setEmail(props.EditObj?.Email || props?.customer_details?.Email);
      // setHostelName(props.EditObj?.HostelName || props?.customer_details?.HostelName);
      setRecheckinbedName(props?.EditObj?.Bed || props?.customer_details?.Bed)

      // setHostel_Id(props.EditObj?.Hostel_Id || props?.customer_details?.Hostel_Id);
      setRooms(props?.EditObj?.hstl_Rooms || props?.customer_details?.hstl_Rooms);
      setBed(props?.EditObj?.hstl_Bed || props?.customer_details?.hstl_Bed)
      // setPaymentType(props.EditObj?.PaymentType || props?.customer_details?.PaymentType);

      // setBalanceDue(props.EditObj?.BalanceDue || props?.customer_details?.BalanceDue);
      // setPaidAdvance(props.EditObj?.paid_advance || props?.customer_details?.paid_advance);
      setFloor(props.EditObj?.Floor || props?.customer_details?.Floor)
      setSelectedDate(props.EditObj?.joining_Date || props?.customer_details?.joining_Date)

      setBookingFloorId(props.EditObj?.floor_name || props?.customer_details?.floor_name)
      setBookingRoomId(props.EditObj?.Room_Id || props?.customer_details?.Room_Id)
      setBookingBedId(props.EditObj?.Bed || props?.customer_details?.Bed)
      // setBookingAmount(props.EditObj?.pending_advance || props?.customer_details?.pending_advance)
      setAdvanceAmount(props.EditObj?.AdvanceAmount || props?.customer_details?.AdvanceAmount)
      setRoomRent(props.EditObj?.RoomRent || props?.customer_details?.RoomRent)
      // setBookingDate(props.EditObj?.booking_booking_date || props?.customer_details?.booking_booking_date)
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




  const handleRecheckin = (e) => {
    setReason(e.target.value)
    setReasonError("")
  }
  const [recheckinDateError, setRecheckinDateError] = useState("")
  const [reasonError, setReasonError] = useState("")
  const reasonRef = useRef(null);
  const dateRef = useRef(null);

  // const handleSaveBacktoCheckin = () => {
  //   if (!reason) {
  //     setReasonError("Please Enter Reason");
  //     reasonRef.current?.focus();
  //     return;
  //   }
  //   if (!recheckInDate) {
  //     setRecheckinDateError("Please Select Date");
  //     dateRef.current?.focus();
  //     return;
  //   }
  //   const incrementDateAndFormat = (date) => {
  //     const newDate = new Date(date);
  //     const year = newDate.getFullYear();
  //     const month = String(newDate.getMonth() + 1).padStart(2, "0");
  //     const day = String(newDate.getDate()).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   };

  //   const formattedDate = recheckInDate
  //     ? incrementDateAndFormat(recheckInDate) + "T00:00:00"
  //     : "";


  //   dispatch({ type: "BACKTOCHECKIN", payload: { userId: id, RecheckIn_Reason: reason, RecheckIn_Date: formattedDate } });
  //   setFormLoading(true)
  // }

  const handleSaveBacktoCheckin = () => {
    setRecheckinDateError("");
 
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

      <Modal
        show={props.showAssignMenu}
        onHide={handleCloseAssign}
        backdrop="static"
        centered
        dialogClassName="custom-modals-style"
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
                      onClick={() => setActiveTab("LONG")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "LONG" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "LONG" ? "white" : "black",
                        border: "none",
                        borderRadius: "5px",
                        fontWeight: "600",
                        fontFamily: "Gilroy"
                      }}
                    >
                      Long Stay
                    </button>
                    <button
                      onClick={() => setActiveTab("SHORT")}
                      style={{
                        flex: 1,
                        padding: "10px 0",
                        backgroundColor: activeTab === "SHORT" ? "#1E45E1" : "#F7F9FF",
                        color: activeTab === "SHORT" ? "white" : "black",
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

                {activeTab === "LONG" ? <>
                  <div style={{ maxHeight: "300px", overflowY: "scroll" }} className="show-scroll p-2 mt-2 me-1">
                    <div className="row d-flex align-items-center">

                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
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
                              onChange={(date) => handleJoiningDateChange(date)}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.closest(".show-scroll") || document.body
                              }
                              disabledDate={(current) => current && current > dayjs().endOf("day")}
                            />
                          </div>
                        </Form.Group>

                        {dateError && (
                          <ErrorMessage message={dateError} type="error"/>
                        )}

                        {joiningDateErrmsg.trim() !== "" && (
                          <ErrorMessage message={joiningDateErrmsg} type="error"/>
                        )}
                      </div>

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
                        isDisabled={!selectedDate}
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
                              color: "#9aa0a6",
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
                         <ErrorMessage message={floorError} type="error"/>
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
                          Room {" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
                        </Form.Label>

                        <Select
                          isDisabled={!selectedDate}
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
                              color: "#9aa0a6",
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
                          <ErrorMessage message={roomError} type="error"/>
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
                          isDisabled={!selectedDate}
                          options={
                            availableBed
                              ? availableBed
                                .filter(
                                  (item) => item &&
                                    item?.bedName !== "0" &&
                                    item?.bedName !== "undefined" &&
                                    item?.bedName !== "" &&
                                    item?.bedName !== "null"
                                )
                                .map((item) => ({
                                  value: item?.bedId,
                                  label: item?.bedName,
                                }))
                              : []
                          }
                          onChange={handleBed}
                          value={
                            availableBed
                              ? (() => {
                                const selected = availableBed?.find(
                                  (option) => option?.bedId === Bed
                                );
                                return selected
                                  ? { value: selected.bedId, label: selected.bedName }
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
                              color: "#9aa0a6",
                              fontWeight:500
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

                        {state.UsersList?.bedAvailableError ?
                           <ErrorMessage message={state.UsersList?.bedAvailableError} type="error"/>
                          : null}
                        {bedWarning ?
                          <ErrorMessage message={bedWarning} type="error"/>
                          : null}

                        {bedError && (
                          <ErrorMessage message={bedError} type="error"/>
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
                              fontWeight: AdvanceAmount ? 600 : 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                            }}
                          />
                        </Form.Group>
                        {advanceAmountError && (
                         <ErrorMessage message={advanceAmountError} type="error"/>
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
                              fontWeight:RoomRent? 600 : 500,
                              boxShadow: "none",
                              border: "1px solid #D9D9D9",
                              height: 50,
                              borderRadius: 8,
                            }}
                          />
                        </Form.Group>
                        {roomrentError && (
                           <ErrorMessage message={roomrentError} type="error"/>
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
                                <ErrorMessage message={errors[index]?.reason} type="error"/>
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
                               <ErrorMessage message={errors[index]?.amount} type="error"/>
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



                  activeTab === "SHORT" && (
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
                     <ErrorMessage message={advanceDateError} type="error"/>
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
                      <ErrorMessage message={advanceDueDateError} type="error"/>
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


       

    </div>
  );
}

UserlistForm.propTypes = {
  EditObj: PropTypes.func.isRequired,
  setRoomDetail: PropTypes.func.isRequired,
  setUserClicked: PropTypes.func.isRequired,
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
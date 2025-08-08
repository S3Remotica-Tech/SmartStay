/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import Profiles from "../../Assets/Images/New_images/profile-picture.png";
import leftarrow from "../../Assets/Images/arrow-left.png";
import Image from "react-bootstrap/Image";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "./UserList.css";
import { Call, Sms, House, Buildings, Profile } from "iconsax-react";
import Group from "../../Assets/Images/Group.png";
import { useDispatch, useSelector } from "react-redux";

import Carousel from "react-bootstrap/Carousel";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Plus from "../../Assets/Images/New_images/add-circle.png";
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
import "react-datepicker/dist/react-datepicker.css";
import upload from "../../Assets/Images/New_images/upload.png";
import UserListKyc from "./UserListKyc";
import UserAdditionalContact from "./UserAdditionalContact";
import { Edit, Trash } from "iconsax-react";
import docDown from "../../Assets/Images/New_images/doc_download.png";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import { RightOutlined } from '@ant-design/icons';
import timehalf from "../../Assets/Images/New_images/time-half past.png";
import html2canvas from "html2canvas";
import adhar from "../../Assets/Images/New_images/aadharimg.png"
import EditImage from "../../Assets/Images/New_images/edit.png"
import addcircle from "../../Assets/Images/New_images/add-circle.png";
import Landamrkimage from "../../Assets/Images/landmark.png";
import Areaimage from "../../Assets/Images/area_icon.png";
import PincodeImage from "../../Assets/Images/pin.png";
import CityImage from "../../Assets/Images/buildings.png";
import Floorimage from "../../Assets/Images/floor_icon.png";
import RoomImage from "../../Assets/Images/room_icon.png";
import LinkImage from "../../Assets/Images/home-link.png";
import whiteaddcircle from "../../Assets/Images/white_add-circle.png";
import MoneyImage from "../../Assets/Images/Money.png";
import EyeIcon from "../../Assets/Images/eye.png";
import Stayhistory from "../../Assets/Images/stay_history.png";
import EditBasicDetails from "./EditBasicDetails";
import EditAddressDetails from "./EditAddressDetails";
import EditStayDetails from "./EditStayDetails";
import StayHistory from "./StayHistory";






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
  const [house_no, setHouseNo] = useState("");
  const [street, setStreet] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state_name, setStateName] = useState("");
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
  const [house_noError, setHouse_NoError] = useState("");
  const [streetError, setStreetError] = useState("");
  const [landmarkError, setLandmarkError] = useState("");
  const [pincodeError, setPincodeError] = useState("");
  const [cityError, setCityError] = useState("");
  const [state_nameError, setStateNameError] = useState("");
  const [kycdetailsForm, setKycDetailForm] = useState(false);
  const [additionalForm, setAdditionalForm] = useState(false);
  const [contactEdit, setContactEdit] = useState("");
  const [editAdditional, setEditAdditional] = useState(false);
  const [deleteAdditional, setDeleteAdditional] = useState(false);
  const [advanceDate, setAdvanceDate] = useState("");
  const [advanceDueDate, setAdvanceDueDate] = useState("");
  const [advanceDateError, setAdvanceDateError] = useState("");
  const [advanceDueDateError, setAdvanceDueDateError] = useState("");
  const [customerDetails, setCustomerDetails] = useState([])
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState('');
  const [generateFormAdvance, setGenerateFormAdvance] = useState(false)
  const [errors, setErrors] = useState([]);
  const [editBasicDetailsShow, setEditBasicDetailsShow] = useState(false)
  const [editAddressDetailsShow, setEditAddressDetailsShow] = useState(false)
  const [editStayDetailsShow, setEditStayDetailsShow] = useState(false)
  const [stayDetailsShow, setStayDetailsShow] = useState(false)
  const [fields, setFields] = useState([]);



  const reasonOptions = [
    { value: "maintenance", label: "Maintenance" },
    { value: "others", label: "Others" },
  ];
 

  


  const [formLoading, setFormLoading] = useState(false)

  const [loading, setLoading] = useState(false)

  const handleOpenAdvance = () => {
    setGenerateFormAdvance(true)
  }
  const handleCloseGenerateAdvance = () => {
    setGenerateFormAdvance(false)
    setAdvanceDate("")
    setAdvanceDueDate("")
  }


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

  useEffect(() => {
    if (state.UsersList?.UserListStatusCode === 200) {
      handleCloseGenerateAdvance()

      const ParticularUserDetails = state.UsersList.Users.filter((item) => {
        return item.User_Id === props.customerUser_Id;
      });


      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_USER" });
      }, 1000);

      setCustomerDetails(ParticularUserDetails)

    }
  }, [state.UsersList?.UserListStatusCode])


  useEffect(() => {
    const ParticularUserDetails = state.UsersList.Users.filter((item) => {
      return item.User_Id === props.customerUser_Id;
    });

    setTimeout(() => {
      dispatch({ type: "REMOVE_STATUS_CODE_USER" });
    }, 1000);

    setCustomerDetails(ParticularUserDetails)

  }, []);



  useEffect(() => {
    dispatch({ type: 'KYCCUSTOMERDETAILS', payload: { customer_id: props.id } })
  }, [])
  useEffect(()=>{
 
      const sanitize = (value) => {
        return value === null ||
          value === undefined ||
          value === "null" ||
          value === "undefined"
          ? ""
          : value;
      };

      const phoneNumber = String(props.userData[0]?.Phone || "");
      const countryCode = phoneNumber.slice(0, phoneNumber.length - 10);
      const mobileNumber = phoneNumber.slice(-10);
      setBednum(props.userData);
      seteditBed("editbeddet");
      setcustomerAsignBed(false);
     

      setId(props.userData[0]?.ID);
      setFile(props.userData[0]?.profile === "0" ? null : props.userData[0]?.profile);

      let value = props.userData[0]?.Name ? props.userData[0]?.Name.split(" ") : ["", ""];
      setFirstname(value[0]?.trim());
      setLastname(value[1] ? value[1].trim() : "");

      setAddress(props.userData[0]?.Address || "");
      setAadharNo(props.userData[0]?.AadharNo || "");
      setPancardNo(props.userData[0]?.PancardNo || "");
      setLicence(props.userData[0]?.licence || "");
      setPhone(mobileNumber);
      setCountryCode(countryCode);
      setEmail(props.userData[0]?.Email || "");
      setHostelName(props.userData[0]?.HostelName || "");
      setHostel_Id(props.userData[0]?.Hostel_Id || "");
      setFloor(props.userData[0]?.Floor || "");
      setRooms(props.userData[0]?.Rooms || "");
      setRoomId(props.userData[0]?.room_id || "");
      setBedId(props.userData[0]?.hstl_Bed || "");
      setSelectedDate(props.userData[0]?.user_join_date || "");
      setAdvanceAmount(props.userData[0]?.AdvanceAmount || "");
      setRoomRent(props.userData[0]?.RoomRent || "");
      setPaymentType(props.userData[0]?.PaymentType || "");
      setBalanceDue(props.userData[0]?.BalanceDue || "");
      setPaidAdvance(props.userData[0]?.paid_advance || "");
      setPaidrent(props.userData[0]?.paid_rent || "");

      setHouseNo(sanitize(props.userData[0]?.Address));
      setStreet(sanitize(props.userData[0]?.area));
      setLandmark(sanitize(props.userData[0]?.landmark));
      setCity(sanitize(props.userData[0]?.city));
      setPincode(sanitize(props.userData[0]?.pincode));
      setStateName(sanitize(props.userData[0]?.state));

    
    

},[])

const [setProfile,setProfilepic] = useState(false)

  useEffect(() => {
    if (state.UsersList.statusCodeForCustomerDetails === 200) {
  
    setProfilepic(true)
    setFile(state.UsersList?.KycCustomerDetails?.pic)

      setTimeout(() => {
        dispatch({ type: "REMOVEKYC_CUSTOMER_DETAILS" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForCustomerDetails]);

  

  useEffect(()=>{
if(setProfile && file && props.userData?.ID && props.userData?.Name && props.userData?.Phone ){
  
    
     
      let value = props.userData.Name ? props.userData?.Name.split(" ") : ["", ""];
      setFirstname(value[0]?.trim());
      setLastname(value[1] ? value[1].trim() : "");
      
      const phoneNumber = String(props.userData?.Phone || "");
     
      const mobileNumber = phoneNumber.slice(-10);


      const payload = {
      profile: file,
      firstname: value[0]?.trim(),
      lastname: value[1] ? value[1].trim() : "",
      Phone: mobileNumber,
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
      Rooms: RoomId,
      Bed: BedId,
      joining_date: selectedDate,
      AdvanceAmount: AdvanceAmount,
      RoomRent: RoomRent,
      BalanceDue: BalanceDue,
      PaymentType: PaymentType,
      paid_advance: paid_advance,
      paid_rent: paid_rent,
      ID: props.userData?.ID,

    };

 dispatch({
      type: "ADDUSER",
      payload: payload
 })}
 
  },[setProfile , props.userData])
  useEffect(() => {
  const base64Pic = state.UsersList?.KycCustomerDetails?.pic;

  if (
    base64Pic &&
    base64Pic !== "null" &&
    base64Pic !== undefined &&
    base64Pic !== null
  ) {
    setFile(`data:image/jpeg;base64,${base64Pic}`);
   
  }
}, [state.UsersList?.KycCustomerDetails?.pic]);
  useEffect(() => {
    if (state.UsersList.statusCodeforverifyKYC === 200) {
      dispatch({ type: 'KYCCUSTOMERDETAILS', payload: { customer_id: props.id } })
     
      
      setTimeout(() => {
        dispatch({ type: "REMOVE_KYC_VERIFY_NEW" });
      }, 100);
    }
  }, [state.UsersList.statusCodeforverifyKYC]);

  useEffect(() => {
    if (state.UsersList.KYCStatusCode === 201) {
      setTimeout(() => {
        dispatch({ type: "REMOVE_KYC_NOT_ADDED" });
      }, 100);
    }
  }, [state.UsersList.KYCStatusCode]);


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

  const handleEditItem = (item) => {
    props.onEditItem(item);
  };
  const handleAddItem = (item) => {
    props.onAddItem(item);
  };
  const handleDeleteItem = (items) => {
    props.onDeleteItem(items);
  };
  const handleEditRoomItem = (item) => {
    props.onEditRoomItem(item);
  };
  const handleEditHostelItem = (item) => {
    props.onEditHostelItem(item);
  };

  const handleDeleteHostelItem = (user) => {
    props.onDeleteHostelItem(user);
  };

  const handleDeleteRoomItem = (user) => {
    props.onDeleteRoomItem(user);
  };

  const handleContactEdit = (u) => {
    setEditAdditional(true);
    setContactEdit(u);
    setAdditionalForm(true);
  };


  const handleKYCSubmit = () => {

    dispatch({ type: 'KYCVERIFYINGNEW', payload: { customer_id: props.id } })

  }

  const handleAdditionalForm = () => {
    setEditAdditional(false);
    setAdditionalForm(true);
  };



  const handleChanges = (event, newValue) => {
    setValue(newValue);
    setFormShow(false);
    setKycDetailForm(false);
  };

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
  const [initialReasonFields, setInitialReasonFields] = useState([]);


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
      setPincode(item[0].pincode);
      setStreet(item[0].area);
      setLandmark(item[0].landmark);
      setCity(item[0].city);
      setStateName(item[0].state);

      const isValidDate =
        item[0].user_join_date && item[0].user_join_date !== "0000-00-00";
      const parsedDate = isValidDate ? new Date(item[0].user_join_date) : null;

      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setSelectedDate(parsedDate);
      } else {
        setSelectedDate("");
      }
      setAdvanceAmount(item[0].AdvanceAmount || "");
      setRoomRent(item[0].RoomRent || "");
      setPaymentType(item[0].PaymentType || "");
      setBalanceDue(item[0].BalanceDue || "");
      setPaidAdvance(item[0].paid_advance || "");
      setPaidrent(item[0].paid_rent || "");


      if (item[0]?.reasonData && Array.isArray(item[0].reasonData)) {
        const formattedFields = item[0]?.reasonData?.map((entry) => {
          const isCustom = String(entry.reason) !== "maintenance";

          return {
            reason_name: entry.reason,
            amount: entry.amount || "",
            showInput: isCustom,
            customReason: isCustom ? entry.reason : "",
          };
        });


        setFields(formattedFields);

      }




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






  




  useEffect(() => {
    if (Bednum) {
      if (Bednum[0]?.reasonData && Array.isArray(Bednum[0].reasonData)) {
        const formattedFields = Bednum[0]?.reasonData?.map((entry) => {
          const isCustom = String(entry.reason) !== "maintenance";

          return {
            reason_name: entry.reason,
            amount: entry.amount || "",
            showInput: isCustom,
            customReason: isCustom ? entry.reason : "",
          };
        });

        setInitialReasonFields(JSON.parse(JSON.stringify(formattedFields)));

      }
    }
  }, [Bednum]);











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

  const handlePhone = (e) => {
    const input = e.target.value.replace(/\D/g, "");
    setPhone(input);

    if (input.length === 0) {
      setPhoneError("");
    } else if (input.length < 10) {
      setPhoneError("Invalid mobile number");
    } else if (input.length === 10) {
      setPhoneError("");
    }

    setPhoneErrorMessage("");
    setFormError("");
    dispatch({ type: "CLEAR_PHONE_ERROR" });
  };

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [phoneErrorMessage, setPhoneErrorMessage] = useState("");
  useEffect(() => {
    if (state.UsersList.emailError) {
      setFormLoading(false)
      setLoading(false)
      setEmailErrorMessage(state.UsersList.emailError);
    }

  }, [state.UsersList.emailError]);
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

      setFormError("");
    }

    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const handleHouseNo = (e) => {
    setHouseNo(e.target.value);
    setHouse_NoError("");
    setFormError("");
  };

  const handleStreetName = (e) => {
    setStreet(e.target.value);
    setStreetError("");

    setFormError("");
  };

  const handleLandmark = (e) => {
    setLandmark(e.target.value);
    setLandmarkError("");
    setFormError("");
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
    setFormError("")
  };

  const handleCity = (e) => {

    const value = e.target.value;
    const regex = /^[a-zA-Z\s]*$/;
    if (regex.test(value)) {
      setCity(value);
      setCityError("");
      setFormError("");
    }
  };

  const aadharInputRef = useRef(null);
  const otherDocInputRef = useRef(null);
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

  const handleFloor = (selectedOption) => {
    if (selectedOption) {
      setFloor(selectedOption.value);
      setfloorError("");
    } else {
      setFloor("");
      setfloorError("Please select a valid floor");
    }

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
  };

  const handleRoomRent = (e) => {
    const roomRentValue = e.target.value;
    if (!/^\d*$/.test(roomRentValue)) {
      return;
    }
    setRoomRent(roomRentValue);
    setRoomRentError("");
    setFormError("");
  };


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

      if (
        editMode &&
        String(selectedBedId) === String(initialStateAssign.Bed)
      ) {
        setRoomRent(initialStateAssign.RoomRent);
      } else {
        setRoomRent(selectedRoomRent);
      }
    } else {
      setRoomRent("");
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
    { value: "", label: "Select a Bed" },
    ...(Editbed === "editbeddet" && Bednum?.[0]?.Bed
      ? [{ value: Bednum[0].hstl_Bed, label: Bednum[0].Bed }]
      : []),
    ...(state.UsersList?.bednumberdetails?.bed_details
      ?.filter(
        (item) =>
          item.bed_no && item.bed_no !== "0" && item.bed_no !== "undefined"
      )
      .map((item) => ({
        value: item.id,
        label: item.bed_no,
      })) || []),
  ];

  const handleAdvanceAmount = (e) => {
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
    setPhoneError("");
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
    setDateError("");
    setActiveRow(null);
    setEmailErrorMessage("");
    setJoingDateErrmsg("")
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
  };

  const [firstnameError, setFirstnameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [hostelIdError, setHostelIdError] = useState("");


  const firstnameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const hostelRef = useRef(null);
  const cityRef = useRef(null);
  const pincodeRef = useRef(null);
  const stateRef = useRef(null);
  const nochangeRef = useRef(null)


  const validateField = (value, fieldName, focusedRef, ref) => {
    const stringValue = String(value).trim();

    if (
      fieldName === "Email" &&
      ["n/a", "na"].includes(stringValue.toLowerCase())
    ) {
      setEmailError("");
      return true;
    }

    if (!stringValue) {

      switch (fieldName) {
        case "First Name":
          setFirstnameError("Please Enter First Name");
          break;
        case "Phone Number":
          setPhoneError("Please Enter  Phone Number");
          break;
        case "Email":
          setEmailError("Please Enter Email");
          break;
        case "Hostel ID":
          setHostelIdError("Please Select Hostel ID");
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


    switch (fieldName) {
      case "First Name":
        setFirstnameError("");
        break;
      case "Phone Number":
        setPhoneError("");
        break;
      case "Email":
        setEmailError("");
        break;
      case "Hostel ID":
        setHostelIdError("");
        break;

      default:
        break;
    }

    return true;
  };
  





  const handleSaveUserlist = () => {
    dispatch({ type: "CLEAR_EMAIL_ERROR" });
    dispatch({ type: "CLEAR_PHONE_ERROR" });
    const focusedRef = { current: false };
    const normalize = (value) =>
      value === null ||
        value === undefined ||
        value === "null" ||
        value === "undefined"
        ? ""
        : String(value).trim();

    const isChanged =
      firstname !== initialState.firstname ||
      lastname !== initialState.lastname ||
      Number(countryCode + Phone) !== Number(initialState.Phone) ||
      Email !== initialState.Email ||
      String(hostel_Id) !== String(initialState.hostel_Id) ||
      file !== initialState.file ||
      normalize(house_no) !== normalize(initialState.house_no ?? "") ||
      normalize(street) !== normalize(initialState.street ?? "") ||
      normalize(landmark) !== normalize(initialState.landmark ?? "") ||
      city !== initialState.city ||
      String(pincode || "").trim() !==
      String(initialState.pincode || "").trim() ||
      state_name !== initialState.state;

    let hasError = false;

    if (!validateField(firstname, "First Name", focusedRef, firstnameRef)) return;
    if (!validateField(Phone, "Phone Number", focusedRef, phoneRef)) return;
    if (!validateField(hostel_Id, "Hostel ID", focusedRef, hostelRef)) return;


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


    const cleanedPincode = String(pincode || "").trim();


    if (cleanedPincode && cleanedPincode !== "0" && !/^\d{6}$/.test(cleanedPincode)) {
      setPincodeError("Pin Code Must Be Exactly 6 Digits");

      if (!focusedRef.current && pincodeRef?.current) {
        pincodeRef.current.focus();
        focusedRef.current = true;
      }

      hasError = true;
    } else {
      setPincodeError("");
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
      setEmailError("");
    }

    if (hasError) return;

    if (!isChanged) {
      setFormError("No Changes Detected");


      setTimeout(() => {
        if (nochangeRef.current) {
          nochangeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          nochangeRef.current.focus();
        }
      }, 100);

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
    setFormLoading(true)
  };

  const [generateForm, seGenerateForm] = useState(false);
  const handlegenerateForm = () => {
    seGenerateForm(true);
  };


  useEffect(() => {
    if (state.UsersList.phoneError) {
      setFormLoading(false)
      setLoading(false)
      setPhoneError(state.UsersList.phoneError);
    }
  }, [state.UsersList.phoneError]);

  const handleCloseGenerateFormShow = () => {
    seGenerateForm(false);
    setAdvanceDateError("");
    setAdvanceDueDateError("");
    setAdvanceDate("");
    setAdvanceDueDate("");
  };
  const handleGenerateAdvance = () => {
    let hasError = false;

    if (!advanceDate) {
      setAdvanceDateError("Please Select Invoice Date");
      hasError = true;
    } else {
      setAdvanceDateError("");
    }

    if (!advanceDueDate) {
      setAdvanceDueDateError("Please Select Due Date");
      hasError = true;
    } else {
      setAdvanceDueDateError("");
    }


    if (advanceDate && advanceDueDate && advanceDetail[0]?.joining_Date) {
      const joiningDate = dayjs(advanceDetail[0].joining_Date).startOf("day");
      const invoiceDate = dayjs(advanceDate).startOf("day");
      const dueDate = dayjs(advanceDueDate).startOf("day");

      if (invoiceDate.isBefore(joiningDate)) {
        setAdvanceDateError("Before Join Date Not Allowed");
        hasError = true;
      }

      if (dueDate.isBefore(invoiceDate)) {
        setAdvanceDueDateError("Due Date after Invoice Date only");
        hasError = true;
      }
    }
    if (hasError) {
      return;
    }
    const formattedInvoiceDate = formatDate(advanceDate);
    const formattedDueDate = formatDate(advanceDueDate);

    dispatch({
      type: "ADVANCEGENERATE",
      payload: {
        user_id: props.id,
        invoice_date: formattedInvoiceDate,
        due_date: formattedDueDate,
      },
    });
  };
  const formatDate = (dateObj) => {
    const date = new Date(dateObj);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const initialState = {
  firstname: "",
  lastname: "",
  Phone: "",
  Email: "",
  Address: "",
  house_no: "",
  street: "",
  city: "",
  landmark: "",
  state: "",
  pincode: "",
  hostel_Id: "",
  countryCode: "",
  file: null,
};


 
  const [initialStateAssign, setInitialStateAssign] = useState({
    Floor: "",
    Rooms: "",
    Bed: "",
    selectedDate: "",
    AdvanceAmount: "",
    RoomRent: "",
  });

  const validateAssignField = (value, fieldName) => {
    const isValueEmpty =
      (typeof value === "string" && value.trim() === "") ||
      value === "undefined" ||
      value === "null" ||
      value === "0";

    if (isValueEmpty) {
      switch (fieldName) {
        case "Floor":
          setfloorError("Please Select Floor");
          break;
        case "RoomId":
          setRoomError("Please Select Room ");
          break;
        case "BedId":
          setBedError("Please Select Bed ");
          break;
        case "selectedDate":
          setDateError("Please Select Date");
          break;
        case "AdvanceAmount":
          setAdvanceAmountError("Please Enter Advance Amount");
          break;
        case "RoomRent":
          setRoomRentError("Please Enter Room Rent");
          break;
        default:
          break;
      }
      return false;
    }

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
    if (!validateAssignField(Floor, "Floor"));
    if (!validateAssignField(RoomId, "RoomId"));
    if (!validateAssignField(BedId, "BedId"));
    if (!validateAssignField(AdvanceAmount, "AdvanceAmount"));
    if (!validateAssignField(RoomRent, "RoomRent"));

    const isValidDate = (date) => !isNaN(Date.parse(date));

    if (!isValidDate(selectedDate)) {
      setDateError("Please Select Joining Date");
      return;
    } else {
      setDateError("");
    }


    if (Number(RoomRent) <= 0) {
      setRoomRentError("Please Enter Valid Rent Amount");
      return;
    } else {
      setRoomRentError("");
    }

    if (Number(AdvanceAmount) <= 0) {
      setAdvanceAmountError("Please Enter Valid Advance Amount");
      return;
    } else {
      setAdvanceAmountError("");
    }

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

    const formattedDate = selectedDate
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : null;

    if (!formattedDate) {
      setDateError("Invalid date format.");
      return;
    }

    const initialFormattedDate = dayjs(initialStateAssign.selectedDate).format(
      "YYYY-MM-DD"
    );

    const isChangedBed =
      String(Floor).toLowerCase() !==
      String(initialStateAssign.Floor).toLowerCase() ||
      String(RoomId).toLowerCase() !==
      String(initialStateAssign.Rooms).toLowerCase() ||
      String(BedId).toLowerCase() !==
      String(initialStateAssign.Bed).toLowerCase() ||
      formattedDate !== initialFormattedDate ||
      Number(AdvanceAmount) !== Number(initialStateAssign.AdvanceAmount) ||
      Number(RoomRent) !== Number(initialStateAssign.RoomRent);



    const normalizeFields = (arr) =>
      arr.map(({ reason_name, amount, customReason, showInput }) => ({
        reason_name,
        amount: String(amount).trim(),
        customReason,
        showInput,
      }));

    const isReasonChanged =
      JSON.stringify(normalizeFields(fields)) !==
      JSON.stringify(normalizeFields(initialReasonFields));


    if (!isChangedBed && !isReasonChanged) {
      setFormError("No Changes Detected");
      return;
    } else {
      setFormError("");
    }

    handleOpenAdvance()


    setLoading(true)
    setFormShow(false);
    dispatch({ type: "INVOICELIST" });
  };


  const handleSaveButton = () => {

    let hasReasonAmountError = false;
    let newErrors = [];


    const formattedDate = selectedDate
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : null;


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


    dispatch({
      type: "ADDUSER",
      payload: {
        profile: file,
        firstname,
        lastname,
        Phone,
        Email,
        Address,
        area: street,
        landmark,
        city,
        pincode,
        state: state_name,
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
        isadvance: 1,
        invoice_date: formattedDate,
        due_date: formattedDate,
        reasons: formattedReasons
      },
    });
  }




  const handleCancelButton = () => {

    let hasReasonAmountError = false;
    let newErrors = [];


    const formattedDate = selectedDate
      ? dayjs(selectedDate).format("YYYY-MM-DD")
      : null;


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


    dispatch({
      type: "ADDUSER",
      payload: {
        profile: file,
        firstname,
        lastname,
        Phone,
        Email,
        Address,
        area: street,
        landmark,
        city,
        pincode,
        state: state_name,
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

        reasons: formattedReasons
      },
    });
  }

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
      dispatch({ type: "USERLIST", payload: { hostel_id: hostel_Id } });
      dispatch({ type: "CUSTOMERALLDETAILS", payload: { user_id: props.id } });
      setFormLoading(false)
      setLoading(false)

      handleCloseEditcustomer();



      setTimeout(() => {
        dispatch({ type: "CLEAR_STATUS_CODES" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForAddUser, state.UsersList.Users]);
  const [advanceDetail, setAdvanceDetail] = useState("");
  useEffect(() => {
    if (state.UsersList.customerdetails.data) {
      setAdvanceDetail(state.UsersList.customerdetails.data);
    }
  }, [state.UsersList.customerdetails.data]);



  const [uploadError, setUploadError] = useState("");

  useEffect(() => {
    setUploadError(state.UsersList.adharuploadfileError);
  }, [state.UsersList.adharuploadfileError]);

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

  const handleUploadClick = (ref) => {
    if (ref?.current) {
      ref.current.click();
    }
    setUploadError("");
    dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR" });
  };
  useEffect(() => {
    if (state.UsersList.statuscodeForAdharFileError === 201) {
      setUploadError(state.UsersList.adharuploadfileError);
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE" });
      }, 100);
    }
  }, [state.UsersList.statuscodeForAdharFileError]);
  const handleOtherUploadClick = (ref) => {
    ref.current.click();
  };

  useEffect(() => {
    if (state.UsersList.statusCodeForUploadDocument === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPLOAD_DOCUMENT" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR_STATUSCODE" });
        dispatch({ type: "CLEAR_ADHAR_UPLOAD_ERROR" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForUploadDocument]);

  useEffect(() => {
    if (state.UsersList.statusCodeForOtherDocu === 200) {
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_UPLOAD_OTHER_DOCUMENT" });
      }, 100);
    }
  }, [state.UsersList.statusCodeForOtherDocu]);

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

  useEffect(() => {
    if (state.UsersList.statusCodeForGenerateAdvance === 200) {
      handleCloseGenerateFormShow();
      dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id } });
      dispatch({ type: "USERLIST", payload: { hostel_id: hostel_Id } });
      setTimeout(() => {
        dispatch({ type: "REMOVE_GENERATE_ADVANCE" });
      }, 500);
    }
  }, [state.UsersList.statusCodeForGenerateAdvance]);

  const handleDownloadKYC = async () => {
    const kycCard = document.getElementById("kyc-download-card");
    if (!kycCard) return;



    await new Promise((res) => setTimeout(res, 300));

    html2canvas(kycCard).then((canvas) => {
      const link = document.createElement("a");
      link.download = "kyc_details.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
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


  const handleAddField = () => {
    setFields([...fields, { reason_name: "", amount: "", showInput: false }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedFields = [...fields];

    if (field === "reason") {
      if (value === "others") {
        updatedFields[index].showInput = true;
        updatedFields[index].reason_name = "others";
        updatedFields[index].customReason = "";
      } else {
        updatedFields[index].showInput = false;
        updatedFields[index].reason = value;
        updatedFields[index].customReason = "";
      }
    } else if (field === "customReason") {
      updatedFields[index].customReason = value;
    } else {
      updatedFields[index][field] = value;
    }

    setFields(updatedFields);
    setFormError("")
  };


  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };
  const [basicDetails,setBasicDetails] = useState("")




  const handleEditBasicDetails = (item) => {
   
    setBasicDetails(item)

    setEditBasicDetailsShow(true)
    setCountryCode("91")

  };
  const handleCloseBasicDetails = () => {
    setEditBasicDetailsShow(false)
  }
const [addressDetails,setAddressDetails] = useState("")
  const handleEditAddressDetailsShow = (item) => {
    setEditAddressDetailsShow(true)
    setAddressDetails(item)

  };
  const handleCloseAddressDetails = () => {
    setEditAddressDetailsShow(false)
  }
const [stayDetais,setStayDetails] = useState("")

  const handleEditStayDetails = (item) => {
    setEditStayDetailsShow(true)
    setStayDetails(item)

  };
  const handleCloseStayDetails = () => {
    setEditStayDetailsShow(false)
  }

  const handleShowStayHistory = () => {
    setStayDetailsShow(true)
  }
  const handleCloseStayHistory = () => {
    setStayDetailsShow(false)
  }
 const [imagePreview, setImagePreview] = useState(null);
  const [isHovered, setIsHovered] = useState(false);


  
const handleImageUpload = async (event) => {
  const fileImage = event.target.files[0];
  if (!fileImage) return;

  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 800,
    useWebWorker: true,
  };

  try {
    const compressedFile = await imageCompression(fileImage, options);
    const previewURL = URL.createObjectURL(compressedFile);
    setImagePreview(previewURL);

    
    let value = props.userData.Name ? props.userData?.Name.split(" ") : ["", ""];
    setFirstname(value[0]?.trim());
    setLastname(value[1] ? value[1].trim() : "");

    const phoneNumber = String(props.userData?.Phone || "");
    const mobileNumber = phoneNumber.slice(-10);

    const payload = {
      profile: compressedFile, 
      firstname: value[0]?.trim(),
      lastname: value[1] ? value[1].trim() : "",
      Phone: mobileNumber,
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
      Rooms: RoomId,
      Bed: BedId,
      joining_date: selectedDate,
      AdvanceAmount: AdvanceAmount,
      RoomRent: RoomRent,
      BalanceDue: BalanceDue,
      PaymentType: PaymentType,
      paid_advance: paid_advance,
      paid_rent: paid_rent,
      ID: props.userData?.ID,
    };

    dispatch({
      type: "ADDUSER",
      payload: payload,
    });
  } catch (error) {
    console.error("Image compression error:", error);
  }
};


  return (

    <>
      {props.roomDetail && (
        <>
          {customerDetails &&
            customerDetails.map((item) => {
      
 const isNotBase64 = item.profile && !item.profile.startsWith("data:image");
  const imageUrl = imagePreview
    ? imagePreview
    : item.profile && item.profile !== "null"
    ? item.profile
    : Profiles;
              return (
                <div
                  key={item.ID}
                  className="container mt-2"
                  style={{
                    marginLeft: "-20px",
                    height: "90vh",
                    overflowY: "auto",
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{
                      position: "sticky",
                      top: 0,
                      zIndex: 1000,
                      backgroundColor: "#fff",
                      padding: "12px 20px",
                      height: "60px",
                    }}
                  >
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
                        fontFamily: "Gilroy",
                        paddingLeft: "10px",
                      }}
                    >
                      Customer Profile
                    </span>
                  </div>

                  <div
                    className="card mt-3"
                    style={{ borderRadius: "24px", marginLeft: "20px" }}
                  >
                    <div className="card-body d-flex flex-column flex-md-row align-items-center justify-content-between">
                      <div className="d-flex align-items-center mb-3 mb-md-0">


{/* <div
      style={{
        position: "relative",
        width: "80px",
        height: "80px",
        marginRight: "10px",
      }}
    >
      <img
        src={imageUrl}
        alt={item.Name || "Default Profile"}
        style={{
          height: "80px",
          width: "80px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Profiles;
        }}
      />

      {isNotBase64 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: 1,
            transition: "opacity 0.3s",
            cursor: "pointer",
            background: "rgba(0,0,0,0.3)",
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={EditImage}
              alt="Edit"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div> */}
      <div
      style={{
        position: "relative",
        width: "80px",
        height: "80px",
        marginRight: "10px",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={imageUrl}
        alt={item.Name || "Default Profile"}
        style={{
          height: "80px",
          width: "80px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = Profiles;
        }}
      />

      {isNotBase64 && isHovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "rgba(0,0,0,0.3)",
            cursor: "pointer",
          }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: "6px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={EditImage}
              alt="Edit"
              style={{ width: "20px", height: "20px" }}
            />
          </div>
        </div>
      )}

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageUpload}
      />
    </div>



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
                          </span>


                          {state.UsersList?.KycCustomerDetails?.message === "KYC Completed" &&
                            <>
                              <Button
                                disabled={props.customerAddPermission}
                                type="primary"
                                style={{
                                  borderRadius: "20px",
                                  backgroundColor: "#1848f1",
                                  border: "none",
                                  padding: "0 16px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "14px",

                                }}
                              >
                                KYC Verified
                              </Button>
                            </>
                          }


                          {state.UsersList?.KycCustomerDetails?.message === "KYC Pending" &&
                            <>
                              <Button
                                style={{
                                  borderRadius: "20px",
                                  backgroundColor: "#f59e0b",
                                  border: "none",
                                  padding: "0 16px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "14px",
                                  color: "#fff",
                                }}

                              >
                                <img src={timehalf} alt="time" style={{ width: "16px", marginRight: 8 }} />
                                Pending
                              </Button>
                              <p
                                style={{
                                  fontSize: 14,
                                  fontWeight: 400,
                                  fontFamily: "Gilroy",
                                  marginTop: 4,
                                }}
                              >
                                Last Attempt: 03 June, 2025 – 04:22 PM
                              </p>
                            </>
                          }

                          {
                            state.UsersList?.KycCustomerDetails?.message === "KYC ID not found for this customer" &&
                            <>
                              <Button
                                disabled={props.customerAddPermission}
                                type="primary"
                                style={{
                                  borderRadius: "20px",
                                  backgroundColor: "#1848f1",
                                  border: "none",
                                  padding: "0 16px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "14px",
                                  fontFamily: "Gilroy",
                                }}
                                onClick={handleKYCSubmit}
                              >
                                Verify KYC <RightOutlined style={{ fontSize: "12px", marginLeft: 6, fontFamily: "Gilroy", }} />
                              </Button>
                              <p
                                style={{
                                  fontSize: 14,
                                  fontWeight: 400,
                                  fontFamily: "Gilroy",
                                  marginTop: 4,
                                }}
                              >
                                Verify your Customer KYC Details via DigiLocker.
                              </p>
                            </>
                          }

                   {/* chekout logic  */}
                      {/* <Button
                                disabled={props.customerAddPermission}
                                type="primary"
                                style={{
                                  borderRadius: "20px",
                                  backgroundColor: "rgba(255, 209, 209, 0.26)",
                                  border: "none",
                                  padding: "0 16px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "14px",
                                  fontFamily: "Gilroy",
                                  color:'rgba(255, 0, 0, 1)'
                                }}
                              >
                               <div style={{height:5 , width:5 , backgroundColor:'rgba(255, 0, 0, 1)', borderRadius:'50%', marginRight: 6}}></div> Checked out 
                              </Button>
                          
                            <p   style={{
                                  fontSize: 14,
                                  fontWeight: 400,
                                  fontFamily: "Gilroy",
                                  marginTop: 4,
                                }}>Very disciplined tenant, paid on time and maintained the room well.</p> */}
                          

                        </div>
                      </div>

                      {/* chekout logic  */}
                      {/* <div>
                           <Button
                                disabled={props.customerAddPermission}
                                type="primary"
                                style={{
                                  borderRadius: "20px",
                                  backgroundColor: "#1848f1",
                                  border: "none",
                                  padding: "0 16px",
                                  height: "32px",
                                  display: "flex",
                                  alignItems: "center",
                                  fontSize: "14px",
                                  fontFamily: "Gilroy",
                                }}
                              >
                             <img  src={Reload} alt="recheckin" className="me-1"/>   Re Check-In
                              </Button>
                      </div> */}

                      <div
                        style={{
                          cursor: props.customerEditPermission && !customerDetails[0]?.Bed
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
                          zIndex: activeRow === item.ID ? 1000 : "auto",
                          backgroundColor:
                            activeRow === item.ID ? "#E7F1FF" : "white",
                        }}
                        onClick={() => {
                          if (!props.customerEditPermission && customerDetails[0]?.Bed) {
                            handleShowEditBed(customerDetails);
                          }
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
                    <TabPanel value="1" className="px-0 mt-2">
                      <>
                        <div className="roomdetailscard">
                          <div style={{ flex: 1 }}>
                            <div className="col-md-12 mb-3 mb-md-0">
                              <div
                                className="card"
                                style={{
                                  borderRadius: "20px",
                                  padding: "10px",
                                  marginLeft: "20px",
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
                                    Basic Details
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
                                          handleEditBasicDetails(customerDetails);
                                        }
                                      }}
                                      style={{
                                        cursor: props.customerEditPermission
                                          ? "not-allowed"
                                          : "pointer",
                                        height: 40,
                                        width: 40,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                        zIndex: 1000,
                                 
                                      }}
                                    >
                                      <img
                                      src={EditImage}
                                      alt="editimage"
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
                                  {/* <div className="row">
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
                                          {" "}
                                          {item.floor_name &&
                                            item.floor_name !== "undefined" &&
                                            item.floor_name !== 0 &&
                                            item.floor_name !== "null"
                                            ? item.floor_name
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
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
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
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            color: props.customerEditPermission || !item?.Bed
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
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
                                            );
                                          }
                                        }}
                                        style={{
                                          cursor: props.customerEditPermission || !item?.Bed
                                            ? "not-allowed"
                                            : "pointer",
                                          opacity: props.customerEditPermission || !item?.Bed
                                            ? 0.6
                                            : 1,
                                          marginTop: "-10px",
                                        }}
                                      >
                                        <img
                                          src={Group}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                  </div> */}

                               {(() => {
  const fullName = item?.Name || '';
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || '-';
  const lastName = nameParts.slice(1).join(' ') || '-';

  return (
    <div className="row">
      <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            fontFamily: "Gilroy",
          }}
        >
          First Name
        </p>
        <div
          style={{
            display: "flex",
            marginTop: "-10px",
            gap: "6px",
            width: "100%",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "Gilroy",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              minWidth: 0,
              marginTop: -3,
            }}
          >
            {firstName}
          </span>
        </div>
      </div>

      <div
        className="col-sm-4 col-lg-6 d-flex flex-column align-items-center"
        style={{ whiteSpace: "nowrap" }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            fontFamily: "Gilroy",
          }}
        >
          Last Name
        </p>
        <p style={{ marginTop: "-10px",   fontSize: 14,
              fontWeight: 600,
              fontFamily: "Gilroy",
              wordBreak: "break-word",
              overflowWrap: "break-word",
              minWidth: 0,marginRight:15 }}>
          {lastName}
        </p>
      </div>
    </div>
  );
})()}


                                  <div className="row">
                                    <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Email ID
                                      </p>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginTop: "-10px",
                                          gap: "6px",
                                          width: "100%",
                                        }}
                                      >
                                        <Sms size="16" color="#1E45E1" style={{ flexShrink: 0 }} />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            minWidth: 0,
                                            marginTop: -3
                                          }}
                                        >
                                          {item.Email}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="col-sm-4 col-lg-6 d-flex flex-column align-items-center"
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
                                      <p style={{ marginTop: "-10px" , marginLeft:60}}>
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
                                    {/* <div className="col-sm-4 d-flex flex-column align-items-end">
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
                                          ₹ {customerDetails[0].RoomRent}
                                        </span>
                                      </p>
                                    </div> */}
                                  </div>

                                  {/* <div className="row">
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

                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-end",
                                          gap: "10px",
                                          marginTop: "-8px",
                                        }}
                                      >
                                        <House
                                          size="18"
                                          color="#1E45E1"
                                          style={{ marginBottom: "2px" }}
                                        />



                                        {(
                                          customerDetails[0]?.Address ||
                                          customerDetails[0]?.area ||
                                          customerDetails[0]?.landmark ||
                                          (customerDetails[0]?.city && customerDetails[0].city !== "undefined" && customerDetails[0].city !== "null" && customerDetails[0].city !== 0) ||
                                          customerDetails[0]?.pincode ||
                                          (customerDetails[0]?.state && customerDetails[0].state !== "undefined" && customerDetails[0].state !== "null" && customerDetails[0].state !== 0)
                                        ) ? (
                                          <div
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              lineHeight: "1.5em",
                                            }}
                                          >
                                            {(customerDetails[0]?.Address || customerDetails[0]?.area) && (
                                              <>
                                                {customerDetails[0]?.Address ? `${customerDetails[0].Address}, ` : ""}
                                                {customerDetails[0]?.area ?? ""}
                                                <br />
                                              </>
                                            )}

                                            {(customerDetails[0]?.landmark ||
                                              customerDetails[0]?.city ||
                                              customerDetails[0]?.pincode ||
                                              customerDetails[0]?.state) && (
                                                <>
                                                  {customerDetails[0]?.landmark ? `${customerDetails[0].landmark}, ` : ""}

                                                  {(customerDetails[0]?.city &&
                                                    customerDetails[0].city !== "undefined" &&
                                                    customerDetails[0].city !== "null" &&
                                                    customerDetails[0].city !== 0) ? `${customerDetails[0].city}, ` : ""}

                                                  {customerDetails[0]?.pincode ? `${customerDetails[0].pincode} - ` : ""}

                                                  {(customerDetails[0]?.state &&
                                                    customerDetails[0].state !== "undefined" &&
                                                    customerDetails[0].state !== "null" &&
                                                    customerDetails[0].state !== 0) ? customerDetails[0].state : ""}
                                                </>
                                              )}
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              lineHeight: "1.5em",
                                            }}
                                          >
                                            No address found
                                          </div>
                                        )}




                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>

                             <div className="col-md-12 mb-3 mb-md-0 mt-3">
                              <div
                                className="card"
                                style={{
                                  borderRadius: "20px",
                                  padding: "5px 10px",
                                  marginLeft: "20px",
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
                                    Address Details
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
                                          handleEditAddressDetailsShow(customerDetails);
                                        }
                                      }}
                                      style={{
                                        cursor: props.customerEditPermission
                                          ? "not-allowed"
                                          : "pointer",
                                        height: 40,
                                        width: 40,
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                        zIndex: 1000,
                                    
                                      }}
                                    >
                                      <img
                                      src={EditImage}
                                      alt="editimage"
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
                                  {/* <div className="row">
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
                                          {" "}
                                          {item.floor_name &&
                                            item.floor_name !== "undefined" &&
                                            item.floor_name !== 0 &&
                                            item.floor_name !== "null"
                                            ? item.floor_name
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
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
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
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            color: props.customerEditPermission || !item?.Bed
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
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
                                            );
                                          }
                                        }}
                                        style={{
                                          cursor: props.customerEditPermission || !item?.Bed
                                            ? "not-allowed"
                                            : "pointer",
                                          opacity: props.customerEditPermission || !item?.Bed
                                            ? 0.6
                                            : 1,
                                          marginTop: "-10px",
                                        }}
                                      >
                                        <img
                                          src={Group}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                  </div> */}

                                  <div className="row">
 <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                      
                                       House No / Apartment
                                      </p>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginTop: "-10px",
                                          gap: "6px",
                                          width: "100%",
                                        }}
                                      >
                                          <House
                                          size="18"
                                          color="#1E45E1"
                                          style={{ marginBottom: "2px" }}
                                        />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            minWidth: 0,
                                            marginTop: -3
                                          }}
                                        >
                                          {item.Address}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="col-sm-4 col-lg-6 d-flex flex-column align-items-center"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Street / Area
                                      </p>
                                       <div
                                        style={{
                                          display: "flex",
                                          marginTop: "-10px",
                                          gap: "6px",
                                          width: "100%",
                                          paddingLeft:75
                                        }}
                                      >
                                          <img src={Areaimage}
                                          alt="Areaimage"
                                          size="18"
                                          color="#1E45E1"
                                          style={{ marginBottom: "2px" }}
                                        />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            minWidth: 0,
                                            marginTop: -3
                                          }}
                                        >
                                          {item.area}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="row mt-3">
                                    <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                       Landmark
                                      </p>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginTop: "-10px",
                                          gap: "6px",
                                          width: "100%",
                                        }}
                                      >
                                        <img src={Landamrkimage} alt="Landamrkimage" size="16" color="#1E45E1" style={{ flexShrink: 0 }} />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            minWidth: 0,
                                            marginTop: -3
                                          }}
                                        >
                                          {item.landmark}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="col-sm-4 col-lg-6 d-flex flex-column align-items-center"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginRight:24
                                        }}
                                      >
                                        Pincode
                                      </p>
                                      <p style={{ marginTop: "-10px", marginRight:15 }}>
                                        <img src={PincodeImage} alt="PincodeImage"  size="16" color="#1E45E1" />
                                         <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            minWidth: 0,
                                            marginTop: -3,
                                              marginLeft:5
                                          }}
                                        >
                                          {item.pincode}
                                        </span>
                                      </p>
                                    </div>
                                    {/* <div className="col-sm-4 d-flex flex-column align-items-end">
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
                                          ₹ {customerDetails[0].RoomRent}
                                        </span>
                                      </p>
                                    </div> */}
                                  </div>

                                    <div className="row">
                                    <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                       City
                                      </p>
                                      <div
                                        style={{
                                          display: "flex",
                                          marginTop: "-10px",
                                          gap: "6px",
                                          width: "100%",
                                        }}
                                      >
                                        <img src={CityImage} alt="CityImage" size="16" color="#1E45E1" style={{ flexShrink: 0 }} />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            minWidth: 0,
                                            marginTop: -3,
                                            
                                          }}
                                        >
                                          {item.city}
                                        </span>
                                      </div>
                                    </div>
                                    <div
                                      className="col-sm-4 col-lg-6 d-flex flex-column align-items-center"
                                      style={{ whiteSpace: "nowrap" }}
                                    >
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                           marginRight:40
                                        }}
                                      >
                                        State
                                      </p>
                                      <p style={{ marginTop: "-10px" , marginLeft:15 }}>
                                        <img src={CityImage} alt="CityImage" size="16" color="#1E45E1" />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            wordBreak: "break-word",
                                            overflowWrap: "break-word",
                                            minWidth: 0,
                                            marginTop: -3,
                                            marginLeft:5
                                          }}
                                        >
                                          {item.state}
                                        </span>
                                      </p>
                                    </div>
                                    {/* <div className="col-sm-4 d-flex flex-column align-items-end">
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
                                          ₹ {customerDetails[0].RoomRent}
                                        </span>
                                      </p>
                                    </div> */}
                                  </div>

                                  {/* <div className="row">
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

                                      <div
                                        style={{
                                          display: "flex",
                                          alignItems: "flex-end",
                                          gap: "10px",
                                          marginTop: "-8px",
                                        }}
                                      >
                                        <House
                                          size="18"
                                          color="#1E45E1"
                                          style={{ marginBottom: "2px" }}
                                        />



                                        {(
                                          customerDetails[0]?.Address ||
                                          customerDetails[0]?.area ||
                                          customerDetails[0]?.landmark ||
                                          (customerDetails[0]?.city && customerDetails[0].city !== "undefined" && customerDetails[0].city !== "null" && customerDetails[0].city !== 0) ||
                                          customerDetails[0]?.pincode ||
                                          (customerDetails[0]?.state && customerDetails[0].state !== "undefined" && customerDetails[0].state !== "null" && customerDetails[0].state !== 0)
                                        ) ? (
                                          <div
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              lineHeight: "1.5em",
                                            }}
                                          >
                                            {(customerDetails[0]?.Address || customerDetails[0]?.area) && (
                                              <>
                                                {customerDetails[0]?.Address ? `${customerDetails[0].Address}, ` : ""}
                                                {customerDetails[0]?.area ?? ""}
                                                <br />
                                              </>
                                            )}

                                            {(customerDetails[0]?.landmark ||
                                              customerDetails[0]?.city ||
                                              customerDetails[0]?.pincode ||
                                              customerDetails[0]?.state) && (
                                                <>
                                                  {customerDetails[0]?.landmark ? `${customerDetails[0].landmark}, ` : ""}

                                                  {(customerDetails[0]?.city &&
                                                    customerDetails[0].city !== "undefined" &&
                                                    customerDetails[0].city !== "null" &&
                                                    customerDetails[0].city !== 0) ? `${customerDetails[0].city}, ` : ""}

                                                  {customerDetails[0]?.pincode ? `${customerDetails[0].pincode} - ` : ""}

                                                  {(customerDetails[0]?.state &&
                                                    customerDetails[0].state !== "undefined" &&
                                                    customerDetails[0].state !== "null" &&
                                                    customerDetails[0].state !== 0) ? customerDetails[0].state : ""}
                                                </>
                                              )}
                                          </div>
                                        ) : (
                                          <div
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              lineHeight: "1.5em",
                                            }}
                                          >
                                            No address found
                                          </div>
                                        )}




                                      </div>
                                    </div>
                                  </div> */}
                                </div>
                              </div>
                            </div>

                            <div className="col-lg-12 col-md-12">
                              <div
                                className="card"
                                style={{
                                  borderRadius: "20px",
                                  padding: "20px",
                                  marginTop: 30,
                                  marginLeft: "20px",
                                }}
                              >
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
                                    Document Details
                                  </div>
                                </div>

                                <div
                                  className="row"
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <div className="col-6 text-start">
                                    <label
                                      style={{
                                        display: "block",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        marginBottom: "10px",
                                        fontFamily: "Gilroy"
                                      }}
                                    >
                                      Aadhar Card
                                    </label>


                                    <button
                                      className="btn"
                                      disabled={props.customerAddPermission}
                                      style={{
                                        borderRadius: "10px",
                                        padding: "10px 20px",
                                        fontSize: "14px",
                                        border: "1px solid #D9D9D9",
                                        fontFamily: "Gilroy"
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


                                    {state.UsersList?.KycCustomerDetails?.pic && (
                                      <div >
                                        <img
                                          src={docDown}
                                          alt="Download Aadhar"
                                          onClick={handleDownloadKYC}
                                          style={{ width: 20, height: 20, cursor: "pointer", marginLeft: 200, marginTop: "-70px" }}
                                        />
                                      </div>
                                    )}







                                    <div
                                      id="kyc-download-card"
                                      style={{
                                        position: "absolute",
                                        top: "-9999px",
                                        left: "-9999px",
                                        borderRadius: 10,
                                        padding: 20,
                                        width: 320,
                                        textAlign: "center",

                                        fontFamily: "Gilroy",
                                      }}
                                    >

                                      <h6 style={{ fontWeight: 600, fontSize: 15, color: "black", marginBottom: 20, fontFamily: "Gilroy" }}>
                                        KYC Details
                                      </h6>

                                      <div style={{ marginBottom: 15 }}>
                                        <img
                                          src={`data:image/jpeg;base64,${state.UsersList?.KycCustomerDetails?.pic}`}
                                          alt="KYC"
                                          style={{
                                            height: 120,
                                            width: 120,
                                            borderRadius: "25%",
                                            border: "3px solid #f0f0f0",
                                          }}
                                        />
                                      </div>

                                      <h5 style={{ fontWeight: "bold", fontSize: 18, marginBottom: 20, color: "#222" }}>
                                        {`${state.UsersList?.KycCustomerDetails?.name || '****'}`}
                                      </h5>

                                      <div className="d-flex align-items-start" style={{ justifyContent: "center" }}>
                                        <i className="bi bi-geo-alt" style={{ fontSize: 18, color: "#3D5AFE", marginRight: 10 }}></i>

                                        <p style={{ fontSize: 14, color: "#4B4B4B", maxWidth: 220, textAlign: "left" }}>
                                          Adress<br />
                                          <span> {state.UsersList?.KycCustomerDetails?.address || 'No address provided'}</span>
                                        </p>
                                      </div>


                                      <div className="d-flex align-items-start" style={{ justifyContent: "center", marginLeft: "-105px" }}>
                                        <img src={adhar} alt="authar" style={{ fontSize: 18, color: "#3D5AFE", marginRight: 10 }}></img>

                                        <p style={{ fontSize: 14, color: "#4B4B4B", maxWidth: 220, textAlign: "left" }}>
                                          Aadhar Number<br />
                                          <span> {state.UsersList?.KycCustomerDetails?.aadhaarNumber}</span>
                                        </p>
                                      </div>
                                    </div>











                                    {advanceDetail[0]?.doc1 && (
                                      <a
                                        href={advanceDetail[0]?.doc1}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        <img
                                          src={docDown}
                                          alt="docdown"
                                          style={{
                                            width: 20,
                                            height: 20,
                                            marginLeft: "10px",
                                          }}
                                        />
                                      </a>
                                    )}


                                    {uploadError && (
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
                                          {uploadError}
                                        </span>
                                      </div>
                                    )}
                                  </div>



                                  <div className="col-6 text-start">
                                    <label
                                      style={{
                                        display: "block",
                                        fontSize: 14,
                                        fontWeight: 500,
                                        marginBottom: "10px",
                                        fontFamily: "Gilroy",
                                      }}
                                    >
                                      Other Document
                                    </label>
                                    <button
                                      className="btn "
                                      disabled={props.customerAddPermission}
                                      style={{
                                        borderRadius: "10px",
                                        padding: "10px 20px",
                                        fontSize: "14px",
                                        fontFamily: "Gilroy",
                                        border: "1px solid #D9D9D9",
                                      }}
                                      onClick={() =>
                                        handleOtherUploadClick(otherDocInputRef)
                                      }
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
                                      onChange={(e) =>
                                        handleFileChange(e, "doc2")
                                      }
                                    />

                                    {advanceDetail &&
                                      advanceDetail[0]?.doc2 && (
                                        <img
                                          src={docDown}
                                          style={{
                                            width: 20,
                                            height: 20,
                                            marginLeft: "10px",
                                            cursor: "pointer",
                                          }}
                                          alt="Download Document"
                                          onClick={() =>
                                            window.open(
                                              advanceDetail[0]?.doc2,
                                              "_blank"
                                            )
                                          }
                                        />
                                      )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div style={{ flex: 1 }}>
                            <div>
                              <div  className="d-flex flex-column col-md-12 col-lg-12 mb-md-0"
                                style={{
                                  paddingLeft: 20,
                                  paddingRight: 20,
                                  
                                }}>
                                  <div
                                  className="card"
                                  style={{
                                    borderRadius: "20px",
                                    padding: "15px",
                                  }}
                                >
                                  <div
                                    className="card-header d-flex flex-column justify-content-between "
                                    style={{
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <div style={{display:'flex', flexDirection:'row' , justifyContent:'space-between'}}>
                  <div
                                    style={{
                                      fontSize: 16,
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",

                                    }}
                                  >
                                    Stay details
                                  </div>


                                  <div className="d-flex flex-row">
                                    <div   style={{
                                      cursor: props.customerEditPermission
                                        ? "not-allowed"
                                        : "pointer",
                                      opacity: props.customerEditPermission
                                        ? 0.6
                                        : 1,
                                    }}>
                                      <img src={Stayhistory} alt="stayhistoryicon"
                                       onClick={() => {
                                        if (!props.customerEditPermission) {
                                          handleShowStayHistory(customerDetails);
                                        }
                                      }}
                                       style={{cursor: props.customerEditPermission
                                          ? "not-allowed"
                                          : "pointer",}}/>
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
                                          handleEditStayDetails(customerDetails);
                                        }
                                      }}
                                      style={{
                                        cursor: props.customerEditPermission
                                          ? "not-allowed"
                                          : "pointer",
                                        height: 30,
                                        width: 30,
                                      
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        position: "relative",
                                        zIndex: 1000,
                                     
                                      }}
                                    >
                                      <img
                                      src={EditImage}
                                      alt="EditImage"
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
                                 </div>
                                 <hr/>


                                  <div className="row">
                                    <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
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
                                        <img src={Floorimage} alt="Floorimage" size="16" color="#1E45E1" />
                                        <span
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            marginLeft: 5,
                                          }}
                                        >
                                          {" "}
                                          {item.floor_name &&
                                            item.floor_name !== "undefined" &&
                                            item.floor_name !== 0 &&
                                            item.floor_name !== "null"
                                            ? item.floor_name
                                            : "N/A"}
                                        </span>
                                      </p>
                                    </div>
                                    <div className="col-sm-4 col-lg-6  d-flex flex-column align-items-center">
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
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
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
                                          src={RoomImage}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            color: props.customerEditPermission || !item?.Bed
                                              ? "#888888"
                                              : "#000000",
                                          }}
                                        >
                                          {item.Rooms ? item.Rooms : "N/A"}
                                        </span>
                                      </p>
                                    </div>
                                  
                                  </div> 

                                  <div className="row">
                                      <div className="col-sm-4 col-lg-6  d-flex flex-column ">
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
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
                                            );
                                          }
                                        }}
                                        style={{
                                          cursor: props.customerEditPermission || !item?.Bed
                                            ? "not-allowed"
                                            : "pointer",
                                          opacity: props.customerEditPermission || !item?.Bed
                                            ? 0.6
                                            : 1,
                                          marginTop: "-10px",
                                        }}
                                      >
                                        <img
                                          src={Group}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                     <div className="col-sm-4 col-lg-6  d-flex flex-column align-items-center">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginLeft:29
                                        }}
                                      >
                                        Joined Date
                                      </p>
                                      <p
                                        onClick={() => {
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
                                            );
                                          }
                                        }}
                                        style={{
                                          cursor: props.customerEditPermission || !item?.Bed
                                            ? "not-allowed"
                                            : "pointer",
                                          opacity: props.customerEditPermission || !item?.Bed
                                            ? 0.6
                                            : 1,
                                          marginTop: "-10px",
                                          marginLeft:50
                                        }}
                                      >
                                        <img
                                          src={LinkImage}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                        {item.user_join_date
    ? new Date(item.user_join_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A"}
                                        </span>
                                      </p>
                                    </div>

                            {/* checkout date  */}
                                     {/* <div className="col-sm-4 col-lg-6  d-flex flex-column align-items-center">
                                      <p
                                        style={{
                                          fontSize: 12,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                          marginLeft:29
                                        }}
                                      >
                                        Checkout Date
                                      </p>
                                      <p
                                        onClick={() => {
                                          if (!props.customerEditPermission && item?.Bed) {
                                            handleShowEditBed(
                                              customerDetails
                                            );
                                          }
                                        }}
                                        style={{
                                          cursor: props.customerEditPermission || !item?.Bed
                                            ? "not-allowed"
                                            : "pointer",
                                          opacity: props.customerEditPermission || !item?.Bed
                                            ? 0.6
                                            : 1,
                                          marginTop: "-10px",
                                          marginLeft:50
                                        }}
                                      >
                                        <img
                                          src={LinkImage}
                                          alt="group"
                                          style={{
                                            cursor: props.customerEditPermission || !item?.Bed
                                              ? "not-allowed"
                                              : "pointer",
                                            filter: props.customerEditPermission || !item?.Bed
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
                                        {item.user_join_date
    ? new Date(item.user_join_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A"}
                                        </span>
                                      </p>
                                    </div> */}


                                    </div>


                        <p style={{
                                      fontSize: 16,
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",

                                    }}>Financial details</p>
                              
                              <div
                                className="col-md-12 col-lg-12 mb-3 mb-md-0"
                              
                              >
                                <div
                                  className="card"
                                  style={{
                                    borderRadius: "10px",
                                    backgroundColor:'rgba(247, 249, 255, 1)'
                                   
                                  }}
                                >
                                

                                  <div className="card-body">
                                    {customerDetails[0]?.AdvanceAmount > 0 ? (
                                      <div>
                                      <div className="row mb-3">
                                        <div className="col-sm-4 col-lg-4 d-flex flex-column align-items-start">
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
                                            <img src={MoneyImage} alt="Money Icon"  height={14} width={14} className="me-1"/>{" "}
                                            ₹
                                            {
                                              customerDetails[0]
                                                ?.AdvanceAmount
                                            }
                                          </p>
                                        </div>

                                       <div className="col-lg-4">

                                        </div>

                                          <div className="col-sm-4 col-lg-4 d-flex flex-column align-items-center">
                                            <Button
                                              disabled={props.customerAddPermission}
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
                                             
                                                borderRadius: "10px",
                                                marginTop: "10px",
                                              }}
                                              onClick={handlegenerateForm}
                                            >
                                            <img src={!advanceDetail[0]?.inv_id ? whiteaddcircle : EyeIcon}alt="plusicon" className="me-1"/> {!advanceDetail[0]?.inv_id ? "Generate" : "Invoice"} 
                                            </Button>
                                          </div>

</div>
                                        <div className="row mb-3">
                                         <div className="col-sm-4 d-flex flex-column align-items-start">
                                          <div
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            Invoice Date
                                          </div>
                                          <p
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            {advanceDetail[0]?.Date
                                              ? new Date(
                                                advanceDetail[0].Date
                                              ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })
                                              : "-"}
                                          </p>
                                        </div>

                                        <div className="col-sm-4 d-flex flex-column align-items-start">
                                          <div
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            Due Date
                                          </div>
                                          <p
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            {advanceDetail[0]?.DueDate
                                              ? new Date(
                                                advanceDetail[0].DueDate
                                              ).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                              })
                                              : "-"}
                                          </p>
                                        </div>

                                        <div className="col-sm-4 d-flex flex-column align-items-start">
                                          <strong
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                              textAlign: "start",
                                              paddingRight: 15,
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
                                            {state.UsersList?.customerdetails.data?.map(
                                              (item) => (
                                                <>{item.status}</>
                                              )
                                            )}
                                          </p>
                                        </div>
                                      </div>

                                      
                                       </div>
                                      
                                    ) : (
                                      <div
                                        style={{
                                          fontSize: 18,
                                          fontFamily: "Gilroy",
                                          fontWeight: 600,
                                          textAlign: "center",
                                        }}
                                      >
                                        In this User Not Assigned
                                      </div>
                                    )}
                                  </div>

                                   
                                </div>
                              </div>
                               <div className="row  mt-2 ms-2">
                                         <div className="col-sm-4 d-flex flex-column align-items-start">
                                          <div
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            Monthly Rent
                                          </div>
                                          <p
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              color:'rgba(30, 69, 225, 1)',
                                              paddingTop:7
                                            }}
                                          >
                                            ₹
                                           {
                                              customerDetails[0]
                                                ?.RoomRent
                                            }
                                          </p>
                                        </div>

                                        <div className="col-sm-4 d-flex flex-column align-items-start">
                                          <div
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                            }}
                                          >
                                            Maintenance
                                          </div>
                                          <p
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              paddingTop:7
                                            }}
                                          >
                                             {/* ₹
                                           {
                                              customerDetails[0]
                                                ?.AdvanceAmount
                                            } */}
                                          </p>
                                        </div>

                                        <div className="col-sm-4 d-flex flex-column align-items-start">
                                          <strong
                                            style={{
                                              fontSize: 12,
                                              fontWeight: 500,
                                              fontFamily: "Gilroy",
                                              textAlign: "start",
                                              paddingRight: 15,
                                              
                                            }}
                                          >
                                           Document Fee
                                          </strong>
                                           <p
                                            style={{
                                              fontSize: 14,
                                              fontWeight: 600,
                                              fontFamily: "Gilroy",
                                              paddingTop:7
                                            }}
                                          >
                                            {/* ₹
                                           {
                                              customerDetails[0]
                                                ?.AdvanceAmount
                                            } */}
                                          </p>
                                        </div>
                                      </div>
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
                                    }}
                                  >
                                    <div
                                      className="fw-semibold"
                                      style={{
                                        fontSize: 16,
                                        lineHeight: "40px",
                                        fontFamily: "Gilroy"
                                      }}
                                    >
                                      Additional Contact
                                    </div>
                                    <button
                                      disabled={props.customerAddPermission}
                                      className="btn btn-link fw-medium text-decoration-none"
                                      style={{ fontSize: 14, fontFamily: "Gilroy" }}
                                      onClick={handleAdditionalForm}
                                    >
                                      + Add Contact
                                    </button>
                                  </div>

                                  <div className="card-body" style={{ fontFamily: "Gilroy" }}>
                                    {state?.UsersList?.customerAllDetails
                                      ?.contact_details?.length > 0 ? (
                                      state.UsersList.customerAllDetails
                                        .contact_details.length > 1 ? (
                                        <Carousel interval={null} indicators className="custom-carousel">
                                          {state.UsersList.customerAllDetails.contact_details.map(
                                            (v, index) => (
                                              <Carousel.Item key={index}>
                                                <div>
                                                  <label className="mb-3" style={{ fontSize: 14, fontFamily: "Gilroy" }}>
                                                    Contact Info{" "}
                                                    {/* <img
                                                      src={editliner}
                                                      alt="Edit Icon"
                                                      width={15}
                                                      style={{ cursor: "pointer" }}
                                                      height={15}
                                                      onClick={() =>
                                                        handleContactEdit(v)
                                                      }
                                                    /> */}
                                                    <Edit size="16" color={props.customerEditPermission ? "#A9A9A9" : "#1E45E1"} onClick={() => {
                                                      if (!props.customerEditPermission) {
                                                        handleContactEdit(v);
                                                      }
                                                    }} />


                                                    <Trash size="16" color={props.customerDeletePermission ? "#A9A9A9" : "red"}


                                                      onClick={() => {
                                                        if (!props.customerDeletePermission) {
                                                          handleContactDelete(v);
                                                        }
                                                      }}
                                                      style={{ cursor: props.customerDeletePermission ? "not-allowed" : "pointer", }} onMouseEnter={(e) => {
                                                        if (!props.customerDeletePermission) e.currentTarget.style.backgroundColor = "#FFF3F3";
                                                      }}
                                                      onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = "transparent";
                                                      }} />
                                                  </label>

                                                  <div className="row mb-3 g-4">
                                                    <div className="col-sm-4">
                                                      <p className="mb-1 small fw-medium">
                                                        Contact Name
                                                      </p>
                                                      <span className="d-flex gap-2">
                                                        <Profile
                                                          size="20"
                                                          color="#1E45E1"
                                                        />
                                                        <p className="mb-0 fw-semibold" style={{ fontFamily: "Gilroy", fontSize: 15 }}>
                                                          {v.user_name}
                                                        </p>
                                                      </span>
                                                    </div>
                                                    <div className="col-sm-4 text-start">
                                                      <p className="mb-1 small fw-medium">
                                                        Mobile No
                                                      </p>
                                                      <span className="d-flex align-items-center gap-2 ">
                                                        <Call size="20" color="#1E45E1" />
                                                        <p className="mb-0 fw-semibold text-start" style={{ fontFamily: "Gilroy", fontSize: 14 }}>
                                                          +
                                                          {v && String(v.mob_no).slice(0, String(v.mob_no).length - 10)}{" "}
                                                          {v && String(v.mob_no).slice(-10)}
                                                        </p>
                                                      </span>

                                                    </div>
                                                    <div className="col-sm-4 text-center">
                                                      <p className="mb-1 small fw-medium text-start">
                                                        Guardian
                                                      </p>
                                                      <span className="d-flex gap-2 text-center">
                                                        <Profile
                                                          size="20"
                                                          color="#1E45E1"
                                                        />
                                                        <p className="mb-0 fw-semibold text-center ">
                                                          {v.guardian}
                                                        </p>
                                                      </span>
                                                    </div>
                                                  </div>

                                                  <div className="row " style={{ backgroundColor: "", width: "100%" }}>
                                                    <div className="col-sm-12 col-lg-12 col-md-12 text-start" style={{ width: "100%" }}>
                                                      <p className="mb-1 small fw-medium">
                                                        Address
                                                      </p>
                                                      <span className="d-flex gap-2" style={{ width: 100 }}>
                                                        <Buildings
                                                          size="20"
                                                          color="#1E45E1"
                                                        />
                                                        <p className="mb-0 fw-semibold text-start" style={{
                                                          width: 400,
                                                          whiteSpace: "nowrap",
                                                          overflow: "hidden",
                                                          textOverflow: "ellipsis",
                                                        }}
                                                          title={`${v.address}, ${v.area},${v.landmark}, ${v.city}, ${v.state} - ${v.pin_code}`}>
                                                          {(v.address || "")}
                                                          {v.area ? ", " + v.area : ""}
                                                          {v.landmark ? ", " + v.landmark : ""}
                                                          {v.city ? ", " + v.city : ""}
                                                          {v.state ? ", " + v.state : ""}
                                                          {v.pin_code ? " - " + v.pin_code : ""}
                                                        </p>
                                                      </span>
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
                                                <p className="mb-3">
                                                  Contact Info{" "}
                                                  <Edit size="16" color={props.customerEditPermission ? "#A9A9A9" : "#1E45E1"} style={{ cursor: "pointer" }} onClick={() => {
                                                    if (!props.customerEditPermission) {
                                                      handleContactEdit(v);
                                                    }
                                                  }} />

                                                  <Trash size="16" color={props.customerDeletePermission ? "#A9A9A9" : "red"}


                                                    onClick={() => {
                                                      if (!props.customerDeletePermission) {
                                                        handleContactDelete(v);
                                                      }
                                                    }}
                                                    style={{ cursor: props.customerDeletePermission ? "not-allowed" : "pointer", marginLeft: 10 }} onMouseEnter={(e) => {
                                                      if (!props.customerDeletePermission) e.currentTarget.style.backgroundColor = "#FFF3F3";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                      e.currentTarget.style.backgroundColor = "transparent";
                                                    }} />
                                                </p>

                                                <div className="row mb-3 g-8">
                                                  <div className="col-sm-4">
                                                    <p className="mb-1 small fw-medium">
                                                      Contact Name
                                                    </p>
                                                    <span className="d-flex gap-2">
                                                      <Profile
                                                        size="20"
                                                        color="#1E45E1"
                                                      />
                                                      <p className="mb-0 fw-semibold" style={{ fontFamily: "Gilroy", fontSize: 15 }}>
                                                        {v.user_name}
                                                      </p>
                                                    </span>
                                                  </div>

                                                  <div
                                                    className="col-sm-4 d-flex flex-column align-items-center"
                                                    style={{ whiteSpace: "nowrap" }}
                                                  >
                                                    <p className="mb-1 small fw-medium">Mobile No</p>
                                                    <p className="mb-0 d-flex align-items-center">
                                                      <Call size="20" color="#1E45E1" />
                                                      <span
                                                        style={{
                                                          marginLeft: 5,
                                                          fontSize: 14,
                                                          fontWeight: 600,
                                                          fontFamily: "Gilroy",
                                                          whiteSpace: "nowrap",
                                                        }}
                                                      >
                                                        +{v && String(v.mob_no).slice(0, String(v.mob_no).length - 10)}{" "}
                                                        {v && String(v.mob_no).slice(-10)}
                                                      </span>
                                                    </p>
                                                  </div>

                                                  <div
                                                    className="col-sm-4 d-flex flex-column align-items-center"
                                                    style={{ whiteSpace: "nowrap" }}
                                                  >
                                                    <p className="mb-1 small fw-medium">Guardian</p>
                                                    <p className="mb-0 d-flex align-items-center" style={{ marginLeft: "-5px" }}>
                                                      <Profile size="20" color="#1E45E1" />
                                                      <span
                                                        style={{
                                                          marginLeft: 5,
                                                          fontSize: 14,
                                                          fontWeight: 600,
                                                          fontFamily: "Gilroy",
                                                          whiteSpace: "nowrap",
                                                        }}
                                                      >
                                                        {v.guardian}
                                                      </span>
                                                    </p>
                                                  </div>

                                                </div>

                                                <div className="row">
                                                  <div className="col-sm-12 col-lg-12 col-md-12 text-start" style={{ width: "100%" }}>
                                                    <p className="mb-1 small fw-medium">Address</p>
                                                    <span className="d-flex gap-2" style={{ width: "100%" }}>
                                                      <Buildings size="20" color="#1E45E1" />
                                                      <p
                                                        className="mb-0 fw-semibold text-start"
                                                        style={{ width: "100%", wordBreak: "break-word" }}
                                                      >
                                                        {(v.address || "")}
                                                        {v.area ? " " + v.area : ""}
                                                        {v.landmark ? ", " + v.landmark : ""}
                                                        {v.city ? ", " + v.city : ""}
                                                        {v.state ? ", " + v.state : ""}
                                                        {v.pin_code ? " - " + v.pin_code : ""}
                                                      </p>
                                                    </span>
                                                  </div>
                                                </div>

                                              </div>
                                            )
                                          )}
                                        </div>
                                      )
                                    ) : (
                                      <div
                                        style={{
                                          fontSize: 18,
                                          fontFamily: "Gilroy",
                                          fontWeight: 600,
                                          textAlign: "center",
                                        }}
                                      >
                                        No data Found
                                      </div>
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
                        <Modal.Body>
                          <div className="d-flex align-items-center">
                            {customerdetailShow ? (
                              <div>
                                <Modal.Header
                                  style={{
                                    position: "relative",
                                    paddingTop: "3px",
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
                                  </div>

                                  <CloseCircle
                                    size="24"
                                    color="#000"
                                    onClick={handleCloseEditcustomer}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Modal.Header>
                                <div style={{ maxHeight: "380px", overflowY: "scroll" }} className="show-scroll p-2 mt-3 me-3">

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
                                            : Profiles
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
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-2">
                                      <Form.Group className="">
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          First Name {" "}
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
                                          ref={firstnameRef}
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
                                        <div
                                          style={{
                                            marginTop: "",
                                            color: "red",
                                          }}
                                        >
                                          {" "}
                                          <MdError
                                            style={{
                                              fontSize: "12px",
                                              fontFamily: "Gilroy",
                                              fontWeight: 500,
                                              marginRight: "5px",
                                            }}
                                          />
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
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 ">
                                      <Form.Group className="">
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Last Name {" "}
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
                                            marginTop: 6,
                                          }}
                                        />
                                      </Form.Group>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-1">
                                      <Form.Group>
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Mobile Number {" "}
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
                                            ref={phoneRef}
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
                                          <div
                                            style={{
                                              marginTop: "-15px",
                                              color: "red",
                                            }}
                                          >
                                            <MdError
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                marginRight: "5px",
                                              }}
                                            />
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
                                          <div
                                            style={{
                                              marginTop: "-15px",
                                              color: "red",
                                            }}
                                          >
                                            <MdError
                                              style={{
                                                fontSize: "12px",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                                marginRight: "5px",
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
                                              {phoneErrorMessage}
                                            </span>
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
                                          Email ID {" "}
                                        </Form.Label>
                                        <FormControl
                                          type="text"
                                          id="form-controls"
                                          placeholder="Enter email address"
                                          value={Email}
                                          ref={emailRef}
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
                                            marginTop: 6,
                                          }}
                                        />

                                        {emailError && (
                                          <div style={{ color: "red" }}>
                                            <MdError
                                              style={{
                                                marginRight: "5px",
                                                fontSize: "12px",
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
                                              {emailError}
                                            </span>
                                          </div>
                                        )}

                                        {emailErrorMessage && (
                                          <div style={{ color: "red" }}>
                                            <MdError
                                              style={{
                                                marginRight: "5px",
                                                fontSize: "12px",
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
                                          Flat , House no , Building , Company ,
                                          Apartment{" "}
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

                                    <div className="col-lg-6 col-md-6S col-sm-12 col-xs-12 mb-1">
                                      <Form.Group className="">
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Landmark {" "}
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
                                        className="mb-3"
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
                                          Pincode {" "}

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
                                          <div className="d-flex align-items-center p-1 mb-2">
                                            <MdError
                                              style={{
                                                color: "red",
                                                marginRight: "5px",
                                                fontSize: "13px",
                                                marginBottom: "2px",
                                              }}
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
                                          Town/City {" "}

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
                                            style={{
                                              fontSize: "13px",
                                              marginRight: "5px",
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
                                            setFormError("")
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
                                              ? {
                                                value: state_name,
                                                label: state_name,
                                              }
                                              : null
                                          }
                                          placeholder="Select State"
                                          classNamePrefix="custom"
                                          menuPlacement="auto"
                                          noOptionsMessage={() =>
                                            "No state available"
                                          }
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
                                              backgroundColor: state.isFocused
                                                ? "#f0f0f0"
                                                : "white",
                                              color: "#000",
                                            }),
                                          }}
                                        />
                                      </Form.Group>
                                      {!state_name && state_nameError && (
                                        <div style={{ color: "red" }}>
                                          <MdError
                                            style={{
                                              fontSize: "13px",
                                              marginRight: "5px",
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
                                            {state_nameError}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  {formError && (
                                    <div
                                      className="d-flex align-items-center justify-content-center"
                                      ref={nochangeRef} style={{ color: "red" }}
                                    >
                                      <MdError style={{ marginRight: "5px" }} />
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "red",
                                          fontFamily: "Gilroy",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {formError}
                                      </span>
                                    </div>
                                  )}
                                </div>

                                {state?.createAccount?.networkError ?
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
                                  Edit Customer
                                </Button>
                              </div>
                            ) : (
                              ""
                            )}

                            {customerAsignBed && customerAsignBed ? (
                              <div className="container">
                                <div className="row "></div>

                                <Modal.Header
                                  style={{
                                    position: "relative",
                                    paddingTop: "-0px",
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

                                  <CloseCircle
                                    size="24"
                                    color="#000"
                                    onClick={handleCloseEditcustomer}
                                    style={{ cursor: "pointer" }}
                                  />
                                </Modal.Header>
                                <div style={{ maxHeight: "380px", overflowY: "scroll" }} className="show-scroll pt-1 me-1 mt-2 mb-1 ">
                                  <div className="row mb-3 me-1">
                                    <div className="col-12">
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Floor {" "}
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

                                      <Select
                                        options={
                                          state.UsersList?.hosteldetailslist?.map(
                                            (u) => ({
                                              value: u.floor_id,
                                              label: u.floor_name,
                                            })
                                          ) || []
                                        }
                                        onChange={handleFloor}
                                        value={
                                          state.UsersList?.hosteldetailslist
                                            ?.map((u) => ({
                                              value: u.floor_id,
                                              label: u.floor_name,
                                            }))
                                            .find(
                                              (option) =>
                                                String(option.value) ===
                                                String(Floor)
                                            ) || null
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
                                            paddingLeft: "10px",
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
                                            style={{
                                              fontSize: "13px",
                                              marginRight: "5px",
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
                                            {floorError}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="col-12 mt-1">
                                      <div className="mb-2">
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 500,
                                            fontFamily: "Gilroy",
                                          }}
                                        >
                                          Room {" "}
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

                                        <Select
                                          options={
                                            state.UsersList?.roomdetails?.map(
                                              (item) => ({
                                                value: item.Room_Id,
                                                label: item.Room_Name,
                                              })
                                            ) || []
                                          }
                                          onChange={handleRooms}
                                          value={
                                            state.UsersList?.roomdetails?.find(
                                              (option) => option.Room_Id === RoomId
                                            )
                                              ? {
                                                value: RoomId,
                                                label:
                                                  state.UsersList.roomdetails.find(
                                                    (option) =>
                                                      option.Room_Id === RoomId
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
                                              style={{
                                                fontSize: "13px",
                                                marginRight: "5px",
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
                                              {roomError}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      <Form.Label
                                        style={{
                                          fontSize: 14,
                                          fontWeight: 500,
                                          fontFamily: "Gilroy",
                                        }}
                                      >
                                        Bed {" "}
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

                                      <Select
                                        options={bedOptions}
                                        value={bedOptions.find(
                                          (opt) => opt.value === BedId
                                        )}
                                        onChange={(selectedOption) =>
                                          handleBed({
                                            target: {
                                              value: selectedOption.value,
                                            },
                                          })
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
                                            paddingLeft: "10px",
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
                                            style={{
                                              fontSize: "13px",
                                              marginRight: "5px",
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
                                            {bedError}
                                          </span>
                                        </div>
                                      )}
                                    </div>

                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      <Form.Group className="mb-2">
                                        <Form.Label
                                          style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                          }}
                                        >
                                          Joining Date {" "}
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
                                          className="datepicker-wrapper"
                                          style={{
                                            position: "relative",
                                            width: "100%",
                                          }}
                                        >
                                          <DatePicker
                                            style={{
                                              width: "100%",
                                              height: 48,
                                              cursor: "pointer",
                                              fontFamily: "Gilroy",
                                            }}
                                            format="DD/MM/YYYY"
                                            placeholder="DD/MM/YYYY"
                                            value={
                                              selectedDate
                                                ? dayjs(selectedDate)
                                                : null
                                            }
                                            onChange={(date) => {
                                              setDateError("");
                                              setFormError("");
                                              setJoingDateErrmsg('');
                                              setSelectedDate(
                                                date ? date.toDate() : null
                                              );
                                            }}
                                            getPopupContainer={(triggerNode) =>
                                              triggerNode.closest(
                                                ".datepicker-wrapper"
                                              )
                                            }
                                            disabledDate={(current) => current && current > dayjs().endOf("day")}
                                          />
                                        </div>
                                      </Form.Group>

                                      {dateError && (
                                        <div
                                          style={{
                                            color: "red",
                                            marginTop: "-7px",
                                          }}
                                        >
                                          <MdError
                                            style={{
                                              fontSize: "13px",
                                              marginRight: "5px",
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
                                            {dateError}
                                          </span>
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
                                          Advance Amount {" "}
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
                                            style={{
                                              fontSize: "13px",
                                              marginRight: "5px",
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
                                          Rental Amount {" "}
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
                                          style={{
                                            color: "red",
                                            marginTop: "-15px",
                                          }}
                                        >
                                          <MdError
                                            style={{
                                              fontSize: "13px",
                                              marginRight: "5px",
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
                                            {roomrentError}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <fieldset disabled>

                                    <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5, }} className="mt-3 mb-3 me-2">

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
                                                    disabled={item.customReason === "maintenance"}
                                                    value={item.customReason || ""}
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


                                            <div className="col-md-4">

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


                                            <div className="col-md-2 d-flex justify-content-center align-items-center">

                                              {index !== 0 && (
                                                <Trash
                                                  size="20"
                                                  color="red"
                                                  variant="Bold"
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() => handleRemoveField(index)}
                                                />
                                              )}
                                            </div>
                                          </div>
                                        );
                                      })}




                                    </div>
                                  </fieldset>


                                </div>




                                {state.createAccount?.networkError ?
                                  <div className='d-flex  align-items-center justify-content-center mt-1 mb-2'>
                                    <MdError style={{ color: "red", marginRight: '5px' }} />
                                    <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                                  </div>
                                  : null}

                                {formError && (
                                  <div
                                    className=""
                                    style={{
                                      color: "red",
                                      paddingBottom: "8px",
                                      textAlign: "center",
                                    }}
                                  >
                                    <MdError
                                      style={{
                                        fontSize: "14px",
                                        marginRight: "6px",
                                      }}
                                    />
                                    <span
                                      style={{
                                        fontSize: "12px",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {formError}
                                    </span>
                                  </div>
                                )}
                                <Button
                                  className="w-100"
                                  disabled
                                  style={{
                                    backgroundColor: "#1E45E1",
                                    fontWeight: 600,
                                    height: 50,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Montserrat",
                                    marginTop: "15px !importent",
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
                                  onClick={handleCloseGenerateFormShow}
                                  style={{ cursor: "pointer" }}
                                />
                              </Modal.Header>

                              <div className="row mb-3">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mb-2"
                                    controlId="checkoutDate"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Invoice Date {" "}
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
                                      className="datepicker-wrapper"
                                      style={{
                                        position: "relative",
                                        width: "100%",
                                      }}
                                    >
                                      <DatePicker
                                        style={{
                                          width: "100%",
                                          height: 48,
                                          cursor: "pointer",
                                        }}
                                        format="DD/MM/YYYY"
                                        placeholder="DD/MM/YYYY"
                                        value={
                                          advanceDate
                                            ? dayjs(advanceDate)
                                            : null
                                        }
                                        onChange={(date) => {
                                          setAdvanceDateError("");
                                          setAdvanceDate(
                                            date ? date.toDate() : null
                                          );
                                        }}
                                        getPopupContainer={(triggerNode) =>
                                          triggerNode.closest(
                                            ".datepicker-wrapper"
                                          )
                                        }
                                        dropdownClassName="custom-datepicker-popup"
                                        disabledDate={(current) => current && current > dayjs().endOf("day")}
                                      />
                                    </div>
                                  </Form.Group>
                                  {advanceDateError && (
                                    <div
                                      style={{
                                        color: "red",
                                        marginTop: "-7px",
                                      }}
                                    >
                                      <MdError
                                        style={{
                                          fontSize: "13px",
                                          marginRight: "5px",
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
                                        {advanceDateError}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mb-2"
                                    controlId="checkoutDate"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Due Date {" "}
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
                                      className="datepicker-wrapper"
                                      style={{
                                        position: "relative",
                                        width: "100%",
                                      }}
                                    >
                                      <DatePicker
                                        style={{
                                          width: "100%",
                                          height: 48,
                                          cursor: "pointer",
                                        }}
                                        format="DD/MM/YYYY"
                                        placeholder="DD/MM/YYYY"
                                        value={
                                          advanceDueDate
                                            ? dayjs(advanceDueDate)
                                            : null
                                        }
                                        onChange={(date) => {
                                          setAdvanceDueDateError("");
                                          setAdvanceDueDate(
                                            date ? date.toDate() : null
                                          );
                                        }}
                                        getPopupContainer={(triggerNode) =>
                                          triggerNode.closest(
                                            ".datepicker-wrapper"
                                          )
                                        }
                                        dropdownClassName="custom-datepicker-popup"
                                      />
                                    </div>
                                  </Form.Group>
                                  {advanceDueDateError && (
                                    <div
                                      style={{
                                        color: "red",
                                        marginTop: "-7px",
                                      }}
                                    >
                                      <MdError
                                        style={{
                                          fontSize: "13px",
                                          marginRight: "5px",
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
                                        {advanceDueDateError}
                                      </span>
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
                                onClick={handleGenerateAdvance}
                              >
                                Generate Advance
                              </Button>
                            </div>

                          </div>
                        </Modal.Body>


                      </Modal.Dialog>
                    </Modal>




                    <Modal
                      show={generateFormAdvance}
                      onHide={handleCloseGenerateAdvance}
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
                                  onClick={handleCloseGenerateAdvance}
                                  style={{ cursor: "pointer" }}
                                />
                              </Modal.Header>

                              <div className="row mb-3">
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mb-2"
                                    controlId="checkoutDate"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Invoice Date {" "}
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
                                      className="datepicker-wrapper"
                                      style={{
                                        position: "relative",
                                        width: "100%",
                                      }}
                                    >
                                      <DatePicker
                                        style={{
                                          width: "100%",
                                          height: 48,
                                          cursor: "pointer",
                                        }}
                                        format="DD/MM/YYYY"
                                        placeholder="DD/MM/YYYY"
                                        value={
                                          advanceDate
                                            ? dayjs(advanceDate)
                                            : null
                                        }
                                        onChange={(date) => {
                                          setAdvanceDateError("");
                                          setAdvanceDate(
                                            date ? date.toDate() : null
                                          );
                                        }}
                                        getPopupContainer={(triggerNode) =>
                                          triggerNode.closest(
                                            ".datepicker-wrapper"
                                          )
                                        }
                                        dropdownClassName="custom-datepicker-popup"
                                        disabledDate={(current) => current && current > dayjs().endOf("day")}
                                      />
                                    </div>
                                  </Form.Group>
                                  {advanceDateError && (
                                    <div
                                      style={{
                                        color: "red",
                                        marginTop: "-7px",
                                      }}
                                    >
                                      <MdError
                                        style={{
                                          fontSize: "13px",
                                          marginRight: "5px",
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
                                        {advanceDateError}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                  <Form.Group
                                    className="mb-2"
                                    controlId="checkoutDate"
                                  >
                                    <Form.Label
                                      style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                      }}
                                    >
                                      Due Date {" "}
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
                                      className="datepicker-wrapper"
                                      style={{
                                        position: "relative",
                                        width: "100%",
                                      }}
                                    >
                                      <DatePicker
                                        style={{
                                          width: "100%",
                                          height: 48,
                                          cursor: "pointer",
                                        }}
                                        format="DD/MM/YYYY"
                                        placeholder="DD/MM/YYYY"
                                        value={
                                          advanceDueDate
                                            ? dayjs(advanceDueDate)
                                            : null
                                        }
                                        onChange={(date) => {
                                          setAdvanceDueDateError("");
                                          setAdvanceDueDate(
                                            date ? date.toDate() : null
                                          );
                                        }}
                                        getPopupContainer={(triggerNode) =>
                                          triggerNode.closest(
                                            ".datepicker-wrapper"
                                          )
                                        }
                                        dropdownClassName="custom-datepicker-popup"
                                      />
                                    </div>
                                  </Form.Group>
                                  {advanceDueDateError && (
                                    <div
                                      style={{
                                        color: "red",
                                        marginTop: "-7px",
                                      }}
                                    >
                                      <MdError
                                        style={{
                                          fontSize: "13px",
                                          marginRight: "5px",
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
                                        {advanceDueDateError}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* <Button
                                className="w-100"
                                style={{
                                  backgroundColor: "#1E45E1",
                                  fontWeight: 600,
                                  height: 50,
                                  borderRadius: 12,
                                  fontSize: 16,
                                  fontFamily: "Montserrat",
                                }}
                                onClick={handleSaveButton}
                              >
                                save
                              </Button> */}
                              <div className="d-flex gap-2">
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
                                  onClick={handleCancelButton}
                                >
                                  Cancel
                                </Button>

                                <Button
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

                                  disabled={advanceDetail[0]?.inv_id}
                                  onClick={handleSaveButton}
                                >
                                  Save
                                </Button>
                              </div>

                            </div>

                          </div>
                        </Modal.Body>


                      </Modal.Dialog>
                    </Modal>
                    <TabPanel value="2">
                      <UserEb
                        id={props.id}
                        handleEditRoomItem={handleEditRoomItem}
                        handleEditHostelItem={handleEditHostelItem}
                        handleDeleteHostelItem={handleDeleteHostelItem}
                        handleDeleteRoomItem={handleDeleteRoomItem}

                      />
                    </TabPanel>
                    <TabPanel value="3">
                      <UserListInvoice
                        id={props.id}
                        handleEditItem={handleEditItem}
                        handleDeleteItem={handleDeleteItem}
                        handleAddItem={handleAddItem}
                        customerAdd={props.customerAddPermission}
                        customerEdit={props.customerEditPermission}
                        customerDelete={props.customerDeletePermission}
                      />
                    </TabPanel>

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
                        customerAdd={props.customerAddPermission}
                        customerEdit={props.customerEditPermission}
                        customerDelete={props.customerDeletePermission}
                      />
                    </TabPanel>
                  </TabContext>







                  {/* New conversion Ui  */}



                  {
                    editBasicDetailsShow && <EditBasicDetails show={editBasicDetailsShow} handleClose={handleCloseBasicDetails} basicDetails={basicDetails}/>
                  }

                  {
                    editAddressDetailsShow && <EditAddressDetails show={editAddressDetailsShow} handleClose={handleCloseAddressDetails} addressDetails={addressDetails}/>
                  }

                  {
                    editStayDetailsShow && <EditStayDetails show={editStayDetailsShow} handleClose={handleCloseStayDetails} stayDetais = {stayDetais}/>
                  }


                  {
                    stayDetailsShow && <StayHistory show={stayDetailsShow} handleClose={handleCloseStayHistory} />
                  }

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
  customerAddPermission: PropTypes.func.isRequired,
  customerDeletePermission: PropTypes.func.isRequired,
  onEditRoomItem: PropTypes.func.isRequired,
  onEditHostelItem: PropTypes.func.isRequired,
  onDeleteHostelItem: PropTypes.func.isRequired,
  onDeleteRoomItem: PropTypes.func.isRequired,
  setcustomerUser_Id: PropTypes.func.isRequired,
  customerUser_Id: PropTypes.func.isRequired,
  onAddItem: PropTypes.func.isRequired,
   userData: PropTypes.func.isRequired,
};
export default UserListRoomDetail;
